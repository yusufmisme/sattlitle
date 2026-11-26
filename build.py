import csv
import json
import math
import os
from pathlib import Path
from urllib.parse import quote
import shutil


ROOT = Path(__file__).resolve().parent


def read_api_key():
    environment_key = os.environ.get("CARTO_API_KEY", "").strip()
    if environment_key:
        return environment_key

    env_file = ROOT / ".env"
    if not env_file.is_file():
        raise SystemExit("Missing .env file. Add CARTO_API_KEY=... before building.")

    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        name, separator, value = line.partition("=")
        if separator and name.strip() == "CARTO_API_KEY":
            value = value.strip().strip("\"'")
            if value:
                return value

    raise SystemExit("CARTO_API_KEY is missing or empty in .env.")


def build_country_data(output):
    source = ROOT / "places" / "World" / "worldcities.csv"
    if not source.is_file():
        raise SystemExit(f"Missing city dataset: {source.relative_to(ROOT)}")

    countries = {}
    with source.open(encoding="utf-8-sig", newline="") as csv_file:
        reader = csv.DictReader(csv_file)
        required_columns = {"city", "country", "iso3", "lat", "lng"}
        if not reader.fieldnames or not required_columns.issubset(reader.fieldnames):
            raise SystemExit("worldcities.csv must include country, iso3, lat, and lng columns.")

        for row in reader:
            name = (row.get("country") or "").strip()
            code = (row.get("iso3") or "").strip().upper()
            if not name or len(code) != 3 or not code.isascii() or not code.isalpha():
                continue

            try:
                latitude, longitude = float(row["lat"]), float(row["lng"])
            except (TypeError, ValueError):
                continue
            if not math.isfinite(latitude) or not math.isfinite(longitude):
                continue
            if not -90 <= latitude <= 90 or not -180 <= longitude <= 180:
                continue
            try:
                population = max(0, int(float(row.get("population") or 0)))
            except (TypeError, ValueError):
                population = 0
            city_name = (row.get("city") or "").strip()
            if not city_name:
                continue

            country = countries.setdefault(code, {"name": name, "locations": {}})
            if country["name"].casefold() != name.casefold():
                raise SystemExit(f"Conflicting country names for ISO3 code {code}.")
            coordinate = (latitude, longitude)
            previous = country["locations"].get(coordinate)
            if previous is None or population >= previous["population"]:
                country["locations"][coordinate] = {"population": population, "city": city_name}

    if not countries:
        raise SystemExit("No valid country locations found in worldcities.csv.")

    data_dir = output / "data"
    if data_dir.exists():
        shutil.rmtree(data_dir)
    country_dir = data_dir / "countries"
    country_dir.mkdir(parents=True, exist_ok=True)

    country_list = []
    world_locations = []
    continent_locations = {name: [] for name in ("Africa", "Asia", "Europe", "North America", "Oceania", "South America")}
    for code, country in sorted(countries.items(), key=lambda item: item[1]["name"].casefold()):
        locations = [
            [latitude, longitude, details["population"], code, details["city"], country["name"]]
            for (latitude, longitude), details in sorted(country["locations"].items())
        ]
        if not locations:
            continue
        country_list.append({
            "code": code,
            "name": country["name"],
            "locationCount": len(locations),
        })
        world_locations.extend(locations)
        # Assign each country to one continent using its city-coordinate centroid.
        # Explicit exceptions keep common transcontinental cases together.
        lat = sum(point[0] for point in locations) / len(locations)
        lng = sum(point[1] for point in locations) / len(locations)
        overrides = {
            "RUS": "Europe", "TUR": "Asia", "KAZ": "Asia", "EGY": "Africa",
            "CYP": "Asia", "GEO": "Asia", "ARM": "Asia", "AZE": "Asia",
            "IDN": "Asia", "SGP": "Asia", "BRN": "Asia", "TLS": "Asia",
            "PNG": "Oceania", "AUS": "Oceania", "NZL": "Oceania",
        }
        if code in overrides:
            continent = overrides[code]
        elif lat < -10 and lng < -30:
            continent = "South America"
        elif lng < -25:
            continent = "North America" if lat > 5 else "South America"
        elif 30 <= lng < 60 and lat > 10:
            continent = "Asia"
        elif lng < 60 and lat < 35 and lat > -40:
            continent = "Africa"
        elif lng < 30 and lat >= 35:
            continent = "Europe"
        elif lng < 170 and lat < -10:
            continent = "Oceania" if lng >= 110 else "Africa"
        elif lng >= 110 and lat < 0:
            continent = "Oceania"
        elif lng >= 110 and lat > 0:
            continent = "Asia"
        elif lng >= 60 and lng < 110 and lat > 0:
            continent = "Asia"
        elif lng >= 30 and lng < 60 and lat > 35:
            continent = "Asia"
        else:
            continent = "Africa"
        continent_locations[continent].extend(locations)
        country_file = country_dir / f"{code.lower()}.json"
        country_file.write_text(
            json.dumps({"locations": locations}, ensure_ascii=False, separators=(",", ":")),
            encoding="utf-8",
        )

    (data_dir / "countries.json").write_text(
        json.dumps({"countries": country_list}, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    (data_dir / "world.json").write_text(
        json.dumps({"locations": world_locations}, separators=(",", ":")), encoding="utf-8"
    )
    (data_dir / "continents.json").write_text(
        json.dumps({name: locations for name, locations in continent_locations.items()}, separators=(",", ":")),
        encoding="utf-8",
    )
    print(f"Prepared {len(country_list)} countries from worldcities.csv.")


def main():
    api_key = quote(read_api_key(), safe="")
    js_source = (ROOT / "js" / "main.js").read_text(encoding="utf-8")
    if "__CARTO_API_KEY__" not in js_source:
        raise SystemExit("API key placeholder not found in js/main.js.")

    output = ROOT / "dist"
    output.mkdir(exist_ok=True)
    shutil.copy2(ROOT / "index.html", output / "index.html")
    shutil.copytree(ROOT / "css", output / "css", dirs_exist_ok=True)
    shutil.copytree(ROOT / "js", output / "js", dirs_exist_ok=True)
    build_country_data(output)
    (output / "js" / "main.js").write_text(
        js_source.replace("__CARTO_API_KEY__", api_key),
        encoding="utf-8",
    )
    print("Built site in dist/.")


if __name__ == "__main__":
    main()
