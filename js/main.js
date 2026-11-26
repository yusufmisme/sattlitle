/* ---------- 1. Config ---------- */

// Satellite tiles: EOX Sentinel-2 cloudless (10 m/pixel, global, free for non-commercial use w/ attribution).
// Swap in another source here (Esri World Imagery, NASA GIBS, USGS NAIP...) -- check each one's terms.
const SAT_URL  = "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2021_3857/default/g/{z}/{y}/{x}.jpg";
const SAT_ATTR = 'Sentinel-2 cloudless by <a href="https://s2maps.eu">EOX</a> (contains modified Copernicus Sentinel data 2021)';

// Low-detail guess map with NO labels so it doesn't give answers away.
const GUESS_URL  = "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=__CARTO_API_KEY__";
const GUESS_ATTR = '&copy; OpenStreetMap contributors &copy; CARTO';

const ROUNDS = 5;

const TRANSLATIONS = {
  en: {
    language: "Language", round: "Round", of: "of", score: "Score",
    placePin: "Place a pin to guess", guess: "Guess", nextRound: "Next round", finalScore: "See final score",
    yourGuess: "Your guess", answer: "Answer", points: "+{points} points",
    distance: "{distance} km away", finalAlert: "Final score: {score} / {max}",
    city: "City", population: "Population", country: "Country", guessDistance: "Guess distance",
    locationsTitle: "Locations and guesses", returnMenu: "Return to menu", unknown: "Unknown",
    landingSubtitle: "Explore the world, one guess at a time.", acknowledgements: "Acknowledgements",
    worldCitiesCredit: "World cities data: SimpleMaps",
    usCitiesCredit: "U.S. cities data: Miserlou (bundled, not currently used in gameplay)",
    satelliteCredit: "Satellite imagery: Sentinel-2 cloudless by EOX; contains modified Copernicus Sentinel data 2021",
    cartoCredit: "Guess and results maps: CARTO basemaps; © OpenStreetMap contributors",
    regionTypeLabel: "Play area", continentLabel: "Continent",
    continentPlaceholder: "Choose a continent", continentSelectLabel: "Choose a continent", countryLabel: "Country",
    countryPlaceholder: "Choose a country", scale: "Map scale", default: "Default", worldDefault: "World (Default)",
    superSmall: "Super small", small: "Small", medium: "Medium", play: "Play", menu: "Menu",
    loadingCountries: "Loading countries…", loadingLocations: "Loading cities…",
    countriesLoaded: "Choose a country to play.", continentsLoaded: "Choose a continent to play.", selectContinent: "Choose a continent first.", countryReady: "{count} cities available.",
    fewLocations: "Only {count} rounds are available at this difficulty; all eligible cities will be used.",
    countryLoadError: "Could not load the country list. Check the site data files.",
    continentLoadError: "Could not load the continent list. Check the site data files.",
    locationsLoadError: "Could not load this country's cities.",
    selectCountry: "Choose a country first.", noLocations: "No valid cities are available for this country.",
    invalidData: "The selected location data is invalid. Check its coordinates.",
    difficulty: "Difficulty", superEasy: "Super Easy", easy: "Easy", mediumDifficulty: "Medium", hard: "Hard",
    difficultyHint: "Super Easy uses the 50 most populous cities in World or Continent play. Easy uses the top 0.5% and Medium the top 5%; either widens to 20% if it gives fewer than 5 cities. Hard uses all. World and Continent selection weights are 30% lower for China and 15% lower for India.",
    difficultyUnavailable: "Not enough cities at this difficulty. Try a lower difficulty."
  },
  uk: {
    language: "Мова", round: "Раунд", of: "з", score: "Рахунок",
    placePin: "Поставте позначку, щоб вгадати", guess: "Вгадати", nextRound: "Наступний раунд", finalScore: "Підсумковий рахунок",
    yourGuess: "Ваш варіант", answer: "Відповідь", points: "+{points} балів",
    distance: "{distance} км до відповіді", finalAlert: "Підсумковий рахунок: {score} / {max}",
    city: "Місто", population: "Населення", country: "Країна", guessDistance: "Відстань до відповіді",
    locationsTitle: "Міста та здогадки", returnMenu: "До меню", unknown: "Невідомо",
    landingSubtitle: "Досліджуйте світ — один здогад за раз.", acknowledgements: "Подяки",
    worldCitiesCredit: "Дані про міста світу: SimpleMaps",
    usCitiesCredit: "Дані про міста США: Miserlou (у проєкті, але поки не використовуються у грі)",
    satelliteCredit: "Супутникові знімки: Sentinel-2 cloudless від EOX; містять змінені дані Copernicus Sentinel за 2021 рік",
    cartoCredit: "Карти для гри й результатів: CARTO; © учасники OpenStreetMap",
    countryLabel: "Країна",
    countryPlaceholder: "Виберіть країну", scale: "Масштаб карти", default: "За замовчуванням", worldDefault: "Світ (за замовчуванням)",
    superSmall: "Дуже малий", small: "Малий", medium: "Середній", play: "Грати", menu: "Меню",
    loadingCountries: "Завантаження країн…", loadingLocations: "Завантаження міст…",
    countriesLoaded: "Виберіть країну для гри.", countryReady: "Доступно міст: {count}.",
    fewLocations: "Для цієї складності доступно лише {count} раундів; будуть використані всі відповідні міста.",
    countryLoadError: "Не вдалося завантажити список країн. Перевірте файли даних сайту.",
    locationsLoadError: "Не вдалося завантажити міста цієї країни.",
    selectCountry: "Спочатку виберіть країну.", noLocations: "Для цієї країни немає коректних міст.",
    invalidData: "Дані локацій некоректні. Перевірте координати.",
    difficulty: "Складність", superEasy: "Дуже легка", easy: "Легка", mediumDifficulty: "Середня", hard: "Важка",
    difficultyHint: "Дуже легкий рівень використовує 50 найбільш населених міст у режимі світу або континенту. Легкий — 0,5%, середній — 5%; якщо міст менше 5, вибір розширюється до 20%. Важкий використовує всі міста. У режимах світу й континенту вагу вибору міст Китаю зменшено на 30%, а Індії — на 15%.",
    difficultyUnavailable: "Для цього рівня недостатньо міст. Спробуйте легший рівень."
  },
  ru: {
    language: "Язык", round: "Раунд", of: "из", score: "Счёт",
    placePin: "Поставьте метку, чтобы сделать прогноз", guess: "Ответить", nextRound: "Следующий раунд", finalScore: "Итоговый счёт",
    yourGuess: "Ваш вариант", answer: "Ответ", points: "+{points} очков",
    distance: "{distance} км до ответа", finalAlert: "Итоговый счёт: {score} / {max}",
    city: "Город", population: "Население", country: "Страна", guessDistance: "Расстояние до ответа",
    locationsTitle: "Города и предположения", returnMenu: "В меню", unknown: "Неизвестно",
    landingSubtitle: "Исследуйте мир — один ответ за раз.", acknowledgements: "Благодарности",
    worldCitiesCredit: "Данные о городах мира: SimpleMaps",
    usCitiesCredit: "Данные о городах США: Miserlou (в проекте, но пока не используются в игре)",
    satelliteCredit: "Спутниковые снимки: Sentinel-2 cloudless от EOX; содержат изменённые данные Copernicus Sentinel за 2021 год",
    cartoCredit: "Карты для игры и результатов: CARTO; © участники OpenStreetMap",
    countryLabel: "Страна",
    countryPlaceholder: "Выберите страну", scale: "Масштаб карты", default: "По умолчанию", worldDefault: "Мир (по умолчанию)",
    superSmall: "Очень маленький", small: "Маленький", medium: "Средний", play: "Играть", menu: "Меню",
    loadingCountries: "Загрузка стран…", loadingLocations: "Загрузка городов…",
    countriesLoaded: "Выберите страну для игры.", countryReady: "Доступно городов: {count}.",
    fewLocations: "Для этой сложности доступно только {count} раундов; будут использованы все подходящие города.",
    countryLoadError: "Не удалось загрузить список стран. Проверьте файлы данных сайта.",
    locationsLoadError: "Не удалось загрузить города этой страны.",
    selectCountry: "Сначала выберите страну.", noLocations: "Для этой страны нет корректных городов.",
    invalidData: "Данные локаций некорректны. Проверьте координаты.",
    difficulty: "Сложность", superEasy: "Очень лёгкая", easy: "Лёгкая", mediumDifficulty: "Средняя", hard: "Сложная",
    difficultyHint: "Очень лёгкий уровень использует 50 самых населённых городов в режиме мира или континента. Лёгкий — 0,5%, средний — 5%; если городов меньше 5, выбор расширяется до 20%. Сложный использует все города. В режимах мира и континента вес выбора городов Китая снижен на 30%, Индии — на 15%.",
    difficultyUnavailable: "Для этого уровня недостаточно городов. Попробуйте уровень полегче."
  },
  fr: {
    language: "Langue", round: "Manche", of: "sur", score: "Score",
    placePin: "Placez un repère pour deviner", guess: "Deviner", nextRound: "Manche suivante", finalScore: "Voir le score final",
    yourGuess: "Votre proposition", answer: "Réponse", points: "+{points} points",
    distance: "à {distance} km", finalAlert: "Score final : {score} / {max}",
    city: "Ville", population: "Population", country: "Pays", guessDistance: "Distance de la réponse",
    locationsTitle: "Lieux et propositions", returnMenu: "Retour au menu", unknown: "Inconnu",
    landingSubtitle: "Explorez le monde, une réponse à la fois.", acknowledgements: "Remerciements",
    worldCitiesCredit: "Données mondiales des villes : SimpleMaps",
    usCitiesCredit: "Données des villes américaines : Miserlou (incluses, mais non utilisées dans le jeu)",
    satelliteCredit: "Imagerie satellite : Sentinel-2 cloudless par EOX ; contient des données Copernicus Sentinel modifiées de 2021",
    cartoCredit: "Cartes de jeu et de résultats : fonds CARTO ; © contributeurs OpenStreetMap",
    countryLabel: "Pays",
    countryPlaceholder: "Choisir un pays", scale: "Échelle de la carte", default: "Par défaut", worldDefault: "Monde (par défaut)",
    superSmall: "Très petite", small: "Petite", medium: "Moyenne", play: "Jouer", menu: "Menu",
    loadingCountries: "Chargement des pays…", loadingLocations: "Chargement des villes…",
    countriesLoaded: "Choisissez un pays pour jouer.", countryReady: "{count} villes disponibles.",
    fewLocations: "Seulement {count} manches sont disponibles à cette difficulté ; toutes les villes admissibles seront utilisées.",
    countryLoadError: "Impossible de charger la liste des pays. Vérifiez les fichiers de données.",
    locationsLoadError: "Impossible de charger les villes de ce pays.",
    selectCountry: "Choisissez d’abord un pays.", noLocations: "Aucune ville valide pour ce pays.",
    invalidData: "Les données de lieux sont invalides. Vérifiez les coordonnées.",
    difficulty: "Difficulté", superEasy: "Très facile", easy: "Facile", mediumDifficulty: "Moyenne", hard: "Difficile",
    difficultyHint: "Très facile utilise les 50 villes les plus peuplées pour le monde ou un continent. Facile utilise 0,5 % et Moyen 5 % ; s’il y a moins de 5 villes, le choix passe à 20 %. Difficile utilise toutes les villes. En monde et continent, le poids des villes chinoises est réduit de 30 % et celui des villes indiennes de 15 %.",
    difficultyUnavailable: "Pas assez de villes pour cette difficulté. Essayez un niveau plus facile."
  },
  de: {
    language: "Sprache", round: "Runde", of: "von", score: "Punktzahl",
    placePin: "Setze eine Markierung, um zu raten", guess: "Tipp abgeben", nextRound: "Nächste Runde", finalScore: "Endstand anzeigen",
    yourGuess: "Dein Tipp", answer: "Antwort", points: "+{points} Punkte",
    distance: "{distance} km entfernt", finalAlert: "Endstand: {score} / {max}",
    city: "Stadt", population: "Einwohnerzahl", country: "Land", guessDistance: "Entfernung zur Antwort",
    locationsTitle: "Orte und Tipps", returnMenu: "Zurück zum Menü", unknown: "Unbekannt",
    landingSubtitle: "Entdecke die Welt, Runde für Runde.", acknowledgements: "Danksagungen",
    worldCitiesCredit: "Weltdaten zu Städten: SimpleMaps",
    usCitiesCredit: "US-Stadtdaten: Miserlou (enthalten, aber derzeit nicht im Spiel verwendet)",
    satelliteCredit: "Satellitenbilder: Sentinel-2 cloudless von EOX; enthält veränderte Copernicus-Sentinel-Daten von 2021",
    cartoCredit: "Karten für Spiel und Ergebnisse: CARTO-Grundkarten; © OpenStreetMap-Mitwirkende",
    countryLabel: "Land",
    countryPlaceholder: "Land auswählen", scale: "Kartenmaßstab", default: "Standard", worldDefault: "Welt (Standard)",
    superSmall: "Sehr klein", small: "Klein", medium: "Mittel", play: "Spielen", menu: "Menü",
    loadingCountries: "Länder werden geladen…", loadingLocations: "Städte werden geladen…",
    countriesLoaded: "Wähle ein Land zum Spielen.", countryReady: "{count} Städte verfügbar.",
    fewLocations: "Bei diesem Schwierigkeitsgrad sind nur {count} Runden verfügbar; alle passenden Städte werden verwendet.",
    countryLoadError: "Länderliste konnte nicht geladen werden. Prüfe die Datendateien.",
    locationsLoadError: "Städte für dieses Land konnten nicht geladen werden.",
    selectCountry: "Wähle zuerst ein Land.", noLocations: "Für dieses Land sind keine gültigen Städte verfügbar.",
    invalidData: "Die Standortdaten sind ungültig. Prüfe die Koordinaten.",
    difficulty: "Schwierigkeit", superEasy: "Sehr einfach", easy: "Einfach", mediumDifficulty: "Mittel", hard: "Schwer",
    difficultyHint: "Sehr einfach verwendet die 50 bevölkerungsreichsten Städte weltweit oder auf einem Kontinent. Einfach verwendet 0,5 %, Mittel 5 %; bei weniger als 5 Städten wird auf 20 % erweitert. Schwer verwendet alle Städte. Im Welt- und Kontinentalmodus wird das Auswahlgewicht chinesischer Städte um 30 % und indischer Städte um 15 % verringert.",
    difficultyUnavailable: "Zu wenige Städte für diesen Schwierigkeitsgrad. Wähle einen leichteren."
  },
  es: {
    language: "Idioma", round: "Ronda", of: "de", score: "Puntuación",
    placePin: "Coloca un marcador para adivinar", guess: "Adivinar", nextRound: "Siguiente ronda", finalScore: "Ver puntuación final",
    yourGuess: "Tu apuesta", answer: "Respuesta", points: "+{points} puntos",
    distance: "a {distance} km", finalAlert: "Puntuación final: {score} / {max}",
    city: "Ciudad", population: "Población", country: "País", guessDistance: "Distancia de la respuesta",
    locationsTitle: "Lugares y apuestas", returnMenu: "Volver al menú", unknown: "Desconocido",
    landingSubtitle: "Explora el mundo, una respuesta a la vez.", acknowledgements: "Agradecimientos",
    worldCitiesCredit: "Datos de ciudades del mundo: SimpleMaps",
    usCitiesCredit: "Datos de ciudades de EE. UU.: Miserlou (incluidos, pero no se usan actualmente)",
    satelliteCredit: "Imágenes satelitales: Sentinel-2 cloudless de EOX; contiene datos modificados de Copernicus Sentinel de 2021",
    cartoCredit: "Mapas del juego y resultados: mapas base de CARTO; © colaboradores de OpenStreetMap",
    countryLabel: "País",
    countryPlaceholder: "Elige un país", scale: "Escala del mapa", default: "Predeterminado", worldDefault: "Mundo (predeterminado)",
    superSmall: "Muy pequeña", small: "Pequeña", medium: "Mediana", play: "Jugar", menu: "Menú",
    loadingCountries: "Cargando países…", loadingLocations: "Cargando ciudades…",
    countriesLoaded: "Elige un país para jugar.", countryReady: "{count} ciudades disponibles.",
    fewLocations: "Con esta dificultad solo hay {count} rondas; se usarán todas las ciudades válidas.",
    countryLoadError: "No se pudo cargar la lista de países. Comprueba los archivos de datos.",
    locationsLoadError: "No se pudieron cargar las ciudades de este país.",
    selectCountry: "Elige un país primero.", noLocations: "No hay ciudades válidas para este país.",
    invalidData: "Los datos de ubicación no son válidos. Comprueba las coordenadas.",
    difficulty: "Dificultad", superEasy: "Muy fácil", easy: "Fácil", mediumDifficulty: "Media", hard: "Difícil",
    difficultyHint: "Muy fácil usa las 50 ciudades más pobladas del mundo o de un continente. Fácil usa el 0,5 % y Media el 5 %; si hay menos de 5, se amplía al 20 %. Difícil usa todas las ciudades. En Mundo y Continente, el peso de selección de las ciudades chinas se reduce un 30 % y el de las indias un 15 %.",
    difficultyUnavailable: "No hay suficientes ciudades para esta dificultad. Prueba una más fácil."
  },
  ar: {
    language: "اللغة", round: "جولة", of: "من", score: "النتيجة",
    placePin: "ضع دبوسًا للتخمين", guess: "خمّن", nextRound: "الجولة التالية", finalScore: "عرض النتيجة النهائية",
    yourGuess: "تخمينك", answer: "الإجابة", points: "+{points} نقطة",
    distance: "على بُعد {distance} كم", finalAlert: "النتيجة النهائية: {score} / {max}",
    city: "المدينة", population: "عدد السكان", country: "الدولة", guessDistance: "المسافة عن الإجابة",
    locationsTitle: "المواقع والتخمينات", returnMenu: "العودة إلى القائمة", unknown: "غير معروف",
    landingSubtitle: "استكشف العالم، تخمينًا بعد تخمين.", acknowledgements: "شكر وتقدير",
    worldCitiesCredit: "بيانات مدن العالم: SimpleMaps",
    usCitiesCredit: "بيانات مدن الولايات المتحدة: Miserlou (مضمّنة ولكنها غير مستخدمة حاليًا في اللعبة)",
    satelliteCredit: "صور الأقمار الصناعية: Sentinel-2 cloudless من EOX؛ تتضمن بيانات Copernicus Sentinel معدّلة لعام 2021",
    cartoCredit: "خرائط اللعبة والنتائج: خرائط CARTO؛ © مساهمو OpenStreetMap",
    countryLabel: "الدولة",
    countryPlaceholder: "اختر دولة", scale: "مقياس الخريطة", default: "افتراضي", worldDefault: "العالم (افتراضي)",
    superSmall: "صغير جدًا", small: "صغير", medium: "متوسط", play: "العب", menu: "القائمة",
    loadingCountries: "جارٍ تحميل الدول…", loadingLocations: "جارٍ تحميل المدن…",
    countriesLoaded: "اختر دولة للعب.", countryReady: "{count} مدينة متاحة.",
    fewLocations: "يتوفر {count} جولات فقط لهذه الصعوبة، وستُستخدم جميع المدن المناسبة.",
    countryLoadError: "تعذر تحميل قائمة الدول. تحقق من ملفات بيانات الموقع.",
    locationsLoadError: "تعذر تحميل مدن هذه الدولة.",
    selectCountry: "اختر دولة أولًا.", noLocations: "لا توجد مدن صالحة لهذه الدولة.",
    invalidData: "بيانات المواقع غير صالحة. تحقق من الإحداثيات.",
    difficulty: "الصعوبة", superEasy: "سهل جدًا", easy: "سهل", mediumDifficulty: "متوسط", hard: "صعب",
    difficultyHint: "السهل جدًا يستخدم أكثر 50 مدينة سكانًا في وضع العالم أو القارة. السهل يستخدم 0.5٪ والمتوسط 5٪؛ وإذا كان العدد أقل من 5، يتوسع الاختيار إلى 20٪. الصعب يستخدم جميع المدن. في وضعي العالم والقارة، ينخفض وزن اختيار المدن الصينية 30٪ والهندية 15٪.",
    difficultyUnavailable: "لا توجد مدن كافية لهذا المستوى. جرّب مستوى أسهل."
  },
  zh: {
    language: "语言", round: "第", of: "回合，共", score: "得分",
    placePin: "在地图上放置标记进行猜测", guess: "猜测", nextRound: "下一轮", finalScore: "查看最终得分",
    yourGuess: "你的猜测", answer: "答案", points: "+{points} 分",
    distance: "相距 {distance} 公里", finalAlert: "最终得分：{score} / {max}",
    city: "城市", population: "人口", country: "国家", guessDistance: "猜测距离",
    locationsTitle: "地点与猜测", returnMenu: "返回菜单", unknown: "未知",
    landingSubtitle: "探索世界，每次猜测都是一次旅程。", acknowledgements: "鸣谢",
    worldCitiesCredit: "世界城市数据：SimpleMaps",
    usCitiesCredit: "美国城市数据：Miserlou（已收录，但目前未在游戏中使用）",
    satelliteCredit: "卫星影像：由 EOX 提供的 Sentinel-2 cloudless；包含修改后的 2021 年 Copernicus Sentinel 数据",
    cartoCredit: "游戏和结果地图：CARTO 底图；© OpenStreetMap 贡献者",
    countryLabel: "国家",
    countryPlaceholder: "选择国家", scale: "地图范围", default: "默认", worldDefault: "世界（默认）",
    superSmall: "超小", small: "小", medium: "中", play: "开始游戏", menu: "菜单",
    loadingCountries: "正在加载国家…", loadingLocations: "正在加载城市…",
    countriesLoaded: "选择一个国家开始游戏。", countryReady: "有 {count} 个城市可用。",
    fewLocations: "此难度仅有 {count} 个回合，将使用所有符合条件的城市。",
    countryLoadError: "无法加载国家列表，请检查网站数据文件。",
    locationsLoadError: "无法加载该国的城市。",
    selectCountry: "请先选择一个国家。", noLocations: "该国没有有效城市。",
    invalidData: "地点数据无效，请检查坐标。",
    difficulty: "难度", superEasy: "超简单", easy: "简单", mediumDifficulty: "中等", hard: "困难",
    difficultyHint: "超简单在世界或洲级模式中使用人口最多的 50 个城市。简单使用前 0.5%，中等使用前 5%；若不足 5 个城市，则扩大到前 20%。困难使用全部城市。在世界和洲级模式中，中国城市的抽取权重降低 30%，印度城市降低 15%。",
    difficultyUnavailable: "此难度下城市数量不足，请尝试较低难度。"
  }
};
const LOCALES = { en: "en", uk: "uk-UA", ru: "ru-RU", fr: "fr-FR", de: "de-DE", es: "es-ES", ar: "ar", zh: "zh-CN" };
const DATA_BASE_URL = new URL("../data/", document.currentScript.src);
const COUNTRY_CATALOG_URL = new URL("countries.json", DATA_BASE_URL);
const REGION_DATA_URL = new URL("continents.json", DATA_BASE_URL);
const WORLD_DATA_URL = new URL("world.json", DATA_BASE_URL);

/* ---------- 2. Math ---------- */

function haversineKm(a, b) {
  const R = 6371, rad = d => d * Math.PI / 180;
  const dLat = rad(b[0] - a[0]), dLng = rad(b[1] - a[1]);
  const h = Math.sin(dLat/2)**2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
// Exponential score falloff keeps nearby guesses more valuable.
function scoreFor(km) { return Math.round(5000 * Math.exp(-km / 1492.7)); }

/* ---------- 3. Maps ---------- */

const view = L.map("view", { zoomControl: true, attributionControl: true }).setView([0, 0], 2);
L.tileLayer(SAT_URL, { attribution: SAT_ATTR, maxNativeZoom: 13, maxZoom: 13, minZoom: 9 }).addTo(view);

const guess = L.map("guess", {
  zoomControl: false,
  attributionControl: false,
  maxBounds: [[-85.051129, -180], [85.051129, 180]],
  maxBoundsViscosity: 1
}).setView([20, 0], 1);
L.tileLayer(GUESS_URL, { attribution: GUESS_ATTR, maxZoom: 6, minZoom: 1, subdomains: "abcd" }).addTo(guess);

const resultMap = L.map("resultMap", { attributionControl: true }).setView([20, 0], 2);
L.tileLayer(GUESS_URL, { attribution: GUESS_ATTR, maxZoom: 8, minZoom: 1, subdomains: "abcd" }).addTo(resultMap);

// Leaflet needs a nudge when its container changes size (minimap grows on hover).
const panel = document.getElementById("panel");
["mouseenter", "mouseleave", "focusin", "focusout", "transitionend"].forEach(ev =>
  panel.addEventListener(ev, () => setTimeout(() => guess.invalidateSize(), 160)));

/* ---------- 4. Game state ---------- */

let round = 0, total = 0, order = [], target = null, pin = null, pinMarker = null, resultLayers = [], roundResults = [];
let currentLanguage = "en", lastRoundPoints = 0, lastDistance = 0;
let countryCatalog = null, countryLocations = null, continentCatalog = null, continentLocations = null, worldLocations = null, regionStatusKey = "loadingCountries";
let regionStatusValues = {}, catalogRequest = 0, continentRequest = 0, locationsRequest = 0;
let countryCatalogFailed = false, continentCatalogFailed = false;
const $ = id => document.getElementById(id);

function formatNumber(value) { return new Intl.NumberFormat(LOCALES[currentLanguage]).format(value); }
function text(key, values = {}) {
  const value = TRANSLATIONS[currentLanguage][key] || TRANSLATIONS.en[key] || key;
  return value.replace(/\{(\w+)\}/g, (_, name) => values[name]);
}

function applyLanguage() {
  const isArabic = currentLanguage === "ar";
  document.documentElement.lang = LOCALES[currentLanguage];
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  $("languageLabel").textContent = text("language");
  $("landingSubtitle").textContent = text("landingSubtitle");
  $("acknowledgementsTitle").textContent = text("acknowledgements");
  const creditLinks = $("acknowledgements").querySelectorAll("a");
  creditLinks[0].textContent = text("worldCitiesCredit");
  creditLinks[1].textContent = text("usCitiesCredit");
  $("satelliteCredit").textContent = text("satelliteCredit");
  $("cartoCredit").textContent = text("cartoCredit");
  $("countryLabel").textContent = text("countryLabel");
  $("regionTypeLabelText").textContent = text("regionTypeLabel");
  $("worldOption").textContent = text("worldDefault");
  $("continentLabel").textContent = text("continentLabel");
  $("continentSelect").options[0].textContent = text("continentPlaceholder");
  $("countrySelect").options[0].textContent = text("countryPlaceholder");
  $("scaleLabel").textContent = text("scale");
  $("difficultyLabel").textContent = text("difficulty");
  $("difficultyHint").textContent = text("difficultyHint");
  $("superSmallLabel").textContent = text("superSmall");
  $("scaleDefault").textContent = text("default");
  $("smallLabel").textContent = text("small");
  $("mediumLabel").textContent = text("medium");
  $("easyLabel").textContent = text("easy");
  $("superEasyLabel").textContent = text("superEasy");
  $("difficultyDefault").textContent = text("default");
  $("mediumDifficultyLabel").textContent = text("mediumDifficulty");
  $("hardLabel").textContent = text("hard");
  $("finalLocationsTitle").textContent = text("locationsTitle");
  $("roundColumn").textContent = text("round");
  $("cityColumn").textContent = text("city");
  $("countryColumn").textContent = text("country");
  $("populationColumn").textContent = text("population");
  $("guessDistanceColumn").textContent = text("guessDistance");
  $("playButton").textContent = text("play");
  $("backToMenu").textContent = text("menu");
  $("regionStatus").textContent = text(regionStatusKey, regionStatusValues);
  $("roundLabel").textContent = text("round");
  $("ofLabel").textContent = text("of");
  $("scoreLabel").textContent = text("score");
  $("roundNum").textContent = formatNumber(round + 1);
  $("roundTotal").textContent = formatNumber(order.length || ROUNDS);
  $("total").textContent = formatNumber(total);
  $("confirm").textContent = pin ? text("guess") : text("placePin");
  $("confirm").disabled = !pin;

  if ($("result").classList.contains("show")) {
    if ($("result").classList.contains("final-summary")) renderFinalSummary();
    else {
      $("pts").textContent = text("points", { points: formatNumber(lastRoundPoints) });
      $("dist").textContent = text("distance", { distance: formatNumber(lastDistance) });
      updateLocationDetails(roundResults[round]);
    }
    $("next").textContent = $("result").classList.contains("final-summary")
      ? text("returnMenu")
      : round === order.length - 1 ? text("finalScore") : text("nextRound");
  }
}

function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function newGame(locations) {
  round = 0; total = 0;
  roundResults = [];
  $("result").classList.remove("final-summary");
  $("finalLocationList").hidden = true;
  order = shuffle([...locations]).slice(0, ROUNDS);
  $("roundTotal").textContent = formatNumber(order.length);
  startRound();
}

function getLocationMetadata(location) {
  return {
    city: location[4] || text("unknown"),
    country: location[5] || text("unknown"),
    population: location[2] > 0 ? formatNumber(location[2]) : text("unknown")
  };
}

function updateLocationDetails(result) {
  const details = $("locationDetails");
  details.replaceChildren();
  if (!result) return;
  const metadata = getLocationMetadata(result.location);
  [
    `${text("city")}: ${metadata.city}`,
    `${text("country")}: ${metadata.country}`,
    `${text("population")}: ${metadata.population}`
  ].forEach(value => {
    const item = document.createElement("div");
    item.textContent = value;
    details.append(item);
  });
}

function createMapTooltip(content) {
  const tooltip = document.createElement("span");
  tooltip.textContent = content;
  return tooltip;
}

function renderFinalSummary() {
  $("result").classList.add("final-summary");
  $("finalLocationList").hidden = false;
  $("locationDetails").replaceChildren();
  $("pts").textContent = text("finalAlert", {
    score: formatNumber(total),
    max: formatNumber(order.length * 5000)
  });
  $("dist").textContent = "";
  $("next").textContent = text("returnMenu");
  $("finalLocationRows").replaceChildren();

  resultLayers.forEach(layer => resultMap.removeLayer(layer));
  resultLayers = [];
  const bounds = [];
  roundResults.forEach((result, index) => {
    if (!result) return;
    const metadata = getLocationMetadata(result.location);
    const targetPoint = [result.location[0], result.location[1]];
    const guessPoint = result.guess;
    bounds.push(targetPoint, guessPoint);
    resultLayers.push(
      L.marker(guessPoint).addTo(resultMap).bindTooltip(
        createMapTooltip(`${text("yourGuess")} — ${text("distance", { distance: formatNumber(Math.round(result.km)) })}`)
      ),
      L.circleMarker(targetPoint, { radius: 8, color: "#5fd39a", fillOpacity: 1 }).addTo(resultMap).bindTooltip(
        createMapTooltip(`${metadata.city}, ${metadata.country}`)
      ),
      L.polyline([guessPoint, targetPoint], { color: "#f2b84b", dashArray: "6 6" }).addTo(resultMap)
    );

    const row = document.createElement("tr");
    [
      formatNumber(index + 1),
      metadata.city,
      metadata.country,
      metadata.population,
      text("distance", { distance: formatNumber(Math.round(result.km)) })
    ].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });
    $("finalLocationRows").append(row);
  });
  if (bounds.length) resultMap.fitBounds(L.latLngBounds(bounds).pad(0.25), { maxZoom: 7 });
  $("result").classList.add("show");
  resultMap.invalidateSize();
}

function startRound() {
  target = order[round];
  pin = null;
  if (pinMarker) { guess.removeLayer(pinMarker); pinMarker = null; }
  const regionType = $("regionType").value;
  const regionLocations = selectedLocations();
  if (regionType !== "world" && regionLocations && regionLocations.length) {
    const regionBounds = L.latLngBounds(regionLocations.map(([lat, lng]) => [lat, lng]));
    guess.fitBounds(regionBounds, {
      padding: [12, 12],
      maxZoom: regionType === "country" ? 5 : 3,
      animate: false
    });
  } else {
    guess.setView([20, 0], 1);
  }

  // Lock the player to roughly a 1.2 deg box around the target so they can't scroll to a labeled area.
  const scaleZoom = { "super-small": 13, small: 12, medium: 11 };
  const scaleLimits = {
    "super-small": { minZoom: 13, maxZoom: 13, pad: 0.2 },
    small: { minZoom: 12, maxZoom: 13, pad: 0.35 },
    medium: { minZoom: 9, maxZoom: 13, pad: 0.6 }
  };
  const scale = $("scaleOptions").querySelector("input[name='scale']:checked").value;
  const limits = scaleLimits[scale];
  view.setMinZoom(limits.minZoom);
  view.setMaxZoom(limits.maxZoom);
  view.getContainer().classList.toggle("no-zoom-out", scale !== "medium");
  const pad = limits.pad;
  view.setMaxBounds([[target[0] - pad, target[1] - pad], [target[0] + pad, target[1] + pad]]);
  view.setView([target[0], target[1]], scaleZoom[scale], { animate: false });

  $("result").classList.remove("show");
  applyLanguage();
}

guess.on("click", e => {
  pin = [e.latlng.lat, ((e.latlng.lng + 540) % 360) - 180]; // wrap longitude into [-180, 180]
  if (!pinMarker) pinMarker = L.marker(e.latlng).addTo(guess); else pinMarker.setLatLng(e.latlng);
  $("confirm").disabled = false;
  $("confirm").textContent = text("guess");
});

$("confirm").addEventListener("click", () => {
  if (!pin) return;
  const km = haversineKm(pin, target), pts = scoreFor(km);
  total += pts;
  lastRoundPoints = pts;
  lastDistance = Math.round(km);
  $("total").textContent = formatNumber(total);

  resultLayers.forEach(l => resultMap.removeLayer(l));
  resultLayers = [
    L.marker(pin).addTo(resultMap).bindTooltip(text("yourGuess"), { permanent: true }),
    L.circleMarker([target[0], target[1]], { radius: 8, color: "#5fd39a", fillOpacity: 1 }).addTo(resultMap).bindTooltip(text("answer"), { permanent: true }),
    L.polyline([pin, [target[0], target[1]]], { color: "#f2b84b", dashArray: "6 6" }).addTo(resultMap)
  ];
  roundResults[round] = { location: target, guess: pin, km, points: pts };
  $("pts").textContent = text("points", { points: formatNumber(pts) });
  $("dist").textContent = text("distance", { distance: formatNumber(lastDistance) });
  updateLocationDetails(roundResults[round]);
  $("next").textContent = round === order.length - 1 ? text("finalScore") : text("nextRound");
  $("result").classList.add("show");
  resultMap.invalidateSize();
  resultMap.fitBounds(L.latLngBounds([pin, [target[0], target[1]]]).pad(0.4), { maxZoom: 7 });
});

$("next").addEventListener("click", () => {
  if ($("result").classList.contains("final-summary")) {
    $("game").classList.remove("active");
    $("landing").hidden = false;
    return;
  }
  if (round === order.length - 1) {
    renderFinalSummary();
    return;
  }
  round++;
  startRound();
});

$("regionType").addEventListener("change", updateRegionControls);
$("continentSelect").addEventListener("change", loadContinentLocations);
$("countrySelect").addEventListener("change", loadCountryLocations);

$("gameSetup").addEventListener("submit", event => {
  event.preventDefault();
  const mode = $("regionType").value;
  const allLocations = selectedLocations();
  if (!allLocations) {
    setRegionStatus(mode === "country" ? "selectCountry" : "selectContinent");
    return;
  }

  const locations = filterByDifficulty(allLocations);
  if (!locations || locations.length === 0) {
    setRegionStatus("difficultyUnavailable");
    return;
  }

  if (locations.length < ROUNDS) {
    setRegionStatus("fewLocations", { count: formatNumber(locations.length) });
  }

  $("landing").hidden = true;
  $("game").classList.add("active");
  const selectedRounds = mode === "country"
    ? shuffle(locations).slice(0, ROUNDS)
    : sampleRegionalLocations(locations, ROUNDS);
  newGame(selectedRounds);
  setTimeout(() => {
    view.invalidateSize();
    guess.invalidateSize();
    resultMap.invalidateSize();
  }, 0);
});

$("backToMenu").addEventListener("click", () => {
  $("game").classList.remove("active");
  $("landing").hidden = false;
});

$("languageSelect").addEventListener("change", event => {
  currentLanguage = event.target.value;
  applyLanguage();
});

function isValidCoordinate(point) {
  return Array.isArray(point) && [2, 3, 4, 6].includes(point.length)
    && Number.isFinite(point[0]) && point[0] >= -90 && point[0] <= 90
    && Number.isFinite(point[1]) && point[1] >= -180 && point[1] <= 180
    && (point.length === 2 || (Number.isFinite(point[2]) && point[2] >= 0))
    && (![4, 6].includes(point.length) || (typeof point[3] === "string" && /^[A-Z]{3}$/.test(point[3])))
    && (point.length !== 6 || (typeof point[4] === "string" && point[4].length > 0
      && typeof point[5] === "string" && point[5].length > 0));
}

function filterByDifficulty(locations) {
  const difficulty = $("difficultyOptions").querySelector("input[name='difficulty']:checked").value;
  const regionType = $("regionType").value;
  if (difficulty === "super-easy" && regionType !== "world" && regionType !== "continent") return null;
  if (difficulty === "hard") return locations;

  // Easier modes narrow the pool to more populated cities before random round selection.
  const ranked = locations
    .filter(point => Number.isFinite(point[2]) && point[2] > 0)
    .sort((a, b) => b[2] - a[2]);
  if (ranked.length === 0) return null;
  if (difficulty === "super-easy") return ranked.slice(0, 50);

  const fraction = difficulty === "easy" ? 0.005 : 0.05;
  let poolSize = Math.ceil(ranked.length * fraction);
  if (poolSize < ROUNDS) {
    poolSize = Math.ceil(ranked.length * 0.2);
  }
  return ranked.slice(0, poolSize);
}

function setRegionStatus(key, values = {}) {
  regionStatusKey = key;
  regionStatusValues = values;
  $("regionStatus").textContent = text(key, values);
}

function selectedLocations() {
  if ($("regionType").value === "world") return worldLocations;
  if ($("regionType").value === "continent") return continentLocations;
  return countryLocations;
}

function sampleRegionalLocations(locations, count) {
  const remaining = [...locations];
  const selected = [];
  while (selected.length < count && remaining.length) {
    const weights = remaining.map(point => point[3] === "CHN" ? 0.7 : point[3] === "IND" ? 0.85 : 1);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let choice = Math.random() * totalWeight;
    let index = 0;
    while (index < weights.length - 1 && choice >= weights[index]) {
      choice -= weights[index];
      index++;
    }
    selected.push(remaining.splice(index, 1)[0]);
  }
  return selected;
}

function updateRegionControls() {
  const mode = $("regionType").value;
  $("superEasyOption").hidden = mode === "country";
  if (mode === "country" && $("difficultyOptions").querySelector("input[name='difficulty']:checked").value === "super-easy") {
    $("difficultyOptions").querySelector("input[name='difficulty'][value='medium']").checked = true;
  }
  $("continentLabel").hidden = mode !== "continent";
  $("continentSelect").hidden = mode !== "continent";
  $("countryLabel").hidden = mode !== "country";
  $("countrySelect").hidden = mode !== "country";
  $("countrySelect").required = mode === "country";
  $("continentSelect").required = mode === "continent";
  countryLocations = null;
  continentLocations = null;
  if (mode === "world") loadWorldLocations();
  else {
    $("playButton").disabled = true;
    if (mode === "continent" && $("continentSelect").value) loadContinentLocations();
    else if (mode === "country" && $("countrySelect").value) loadCountryLocations();
    else if (mode === "country") {
      setRegionStatus(countryCatalogFailed ? "countryLoadError" : $("countrySelect").disabled ? "loadingCountries" : "countriesLoaded");
    } else if (mode === "continent") {
      setRegionStatus(continentCatalogFailed ? "continentLoadError" : $("continentSelect").disabled ? "loadingCountries" : "continentsLoaded");
    }
  }
}

async function loadWorldLocations() {
  $("playButton").disabled = true;
  setRegionStatus("loadingLocations");
  try {
    if (!worldLocations) {
      const response = await fetch(WORLD_DATA_URL);
      if (!response.ok) throw new Error(`World locations request failed: ${response.status}`);
      const data = await response.json();
      if (!data || !Array.isArray(data.locations) || !data.locations.every(isValidCoordinate)) throw new Error("Invalid world locations.");
      worldLocations = data.locations;
    }
    if ($("regionType").value === "world") {
      $("playButton").disabled = false;
      setRegionStatus("countryReady", { count: formatNumber(worldLocations.length) });
    }
  } catch (error) {
    console.error("Could not load world locations.", error);
    if ($("regionType").value === "world") {
      $("playButton").disabled = true;
      setRegionStatus("locationsLoadError");
    }
  }
}

async function loadContinentLocations() {
  const continent = $("continentSelect").value;
  continentLocations = null;
  if ($("regionType").value !== "continent") return;
  $("playButton").disabled = true;
  if (!continent) { setRegionStatus("continentsLoaded"); return; }
  setRegionStatus("loadingLocations");
  try {
    if (!continentCatalog) throw new Error("Continent catalog is not loaded.");
    const locations = continentCatalog[continent];
    if (!Array.isArray(locations) || !locations.every(isValidCoordinate)) throw new Error(`Invalid locations for ${continent}.`);
    if (!locations.length) { setRegionStatus("noLocations"); return; }
    continentLocations = locations;
    if ($("regionType").value === "continent") {
      $("playButton").disabled = false;
      setRegionStatus("countryReady", { count: formatNumber(locations.length) });
    }
  } catch (error) {
    console.error("Could not load continent locations.", error);
    if ($("regionType").value === "continent") {
      $("playButton").disabled = true;
      setRegionStatus("locationsLoadError");
    }
  }
}

async function loadCountryCatalog() {
  const request = ++catalogRequest;
  countryCatalogFailed = false;
  countryCatalog = null;
  countryLocations = null;
  $("countrySelect").disabled = true;
  $("playButton").disabled = true;
  $("countrySelect").replaceChildren(new Option(text("countryPlaceholder"), ""));
  if ($("regionType").value === "country") setRegionStatus("loadingCountries");

  try {
    const response = await fetch(COUNTRY_CATALOG_URL);
    if (request !== catalogRequest) return;
    if (!response.ok) throw new Error(`Country catalog request failed: ${response.status}`);

    const data = await response.json();
    if (!data || !Array.isArray(data.countries)
        || !data.countries.every(country =>
          country && typeof country.code === "string" && typeof country.name === "string"
          && Number.isInteger(country.locationCount) && country.locationCount > 0
        )) {
      throw new Error("Country catalog must contain country codes, names, and location counts.");
    }
    countryCatalog = data.countries;
    countryCatalog.forEach(country => {
      const option = document.createElement("option");
      option.value = country.code;
      option.textContent = country.name;
      $("countrySelect").append(option);
    });
    $("countrySelect").disabled = false;
    if ($("regionType").value === "country") setRegionStatus("countriesLoaded");
  } catch (error) {
    if (request !== catalogRequest) return;
    console.error("Could not load country catalog.", error);
    countryCatalogFailed = true;
    if ($("regionType").value === "country") setRegionStatus("countryLoadError");
  }
}

async function loadContinentCatalog() {
  const request = ++continentRequest;
  continentCatalogFailed = false;
  const select = $("continentSelect");
  select.disabled = true;
  select.replaceChildren(new Option(text("continentPlaceholder"), ""));

  try {
    const response = await fetch(REGION_DATA_URL);
    if (request !== continentRequest) return;
    if (!response.ok) throw new Error(`Continent catalog request failed: ${response.status}`);

    const data = await response.json();
    const entries = data && Object.entries(data);
    if (!entries || !entries.length
        || !entries.every(([name, locations]) => name && Array.isArray(locations) && locations.length > 0)) {
      throw new Error("Continent data must contain named continents with locations.");
    }

    continentCatalog = data;
    entries.forEach(([name]) => select.add(new Option(name, name)));
    select.disabled = false;
    if ($("regionType").value === "continent" && select.value) loadContinentLocations();
  } catch (error) {
    if (request !== continentRequest) return;
    console.error("Could not load continent catalog.", error);
    continentCatalogFailed = true;
    if ($("regionType").value === "continent") setRegionStatus("continentLoadError");
  }
}

async function loadCountryLocations() {
  const request = ++locationsRequest;
  const code = $("countrySelect").value;
  countryLocations = null;
  if ($("regionType").value !== "country") return;
  $("playButton").disabled = true;
  if (!code) {
    setRegionStatus("countriesLoaded");
    return;
  }

  setRegionStatus("loadingLocations");
  try {
    const url = new URL(`countries/${encodeURIComponent(code.toLowerCase())}.json`, DATA_BASE_URL);
    const response = await fetch(url);
    if (request !== locationsRequest) return;
    if (!response.ok) throw new Error(`Country locations request failed: ${response.status}`);

    const data = await response.json();
    if (!data || !Array.isArray(data.locations) || !data.locations.every(isValidCoordinate)) {
      throw new Error(`Location data for ${code} contains invalid coordinates.`);
    }
    if (data.locations.length === 0) {
      setRegionStatus("noLocations");
      return;
    }

    countryLocations = data.locations;
    if ($("regionType").value === "country") {
      $("playButton").disabled = false;
      setRegionStatus(
        countryLocations.length < ROUNDS ? "fewLocations" : "countryReady",
        { count: formatNumber(countryLocations.length) }
      );
    }
  } catch (error) {
    if (request !== locationsRequest) return;
    console.error("Could not load selected country locations.", error);
    if ($("regionType").value === "country") setRegionStatus("locationsLoadError");
  }
}

applyLanguage();
loadCountryCatalog();
loadContinentCatalog();
updateRegionControls();
