const PIN_CHECK_URL = "https://script.google.com/macros/s/AKfycbyR0Mjnf8-VhnvEYCdc-i0sqjvxj8Kdw8Kxjc3BdrNvckL0baNvkt3cBtWvhAanC_s/exec";

/**
 * Заказ Снеков — PWA / Mobile Web App
 * Multi-Supplier ordering system for beer stores and bars.
 * Supports:
 *  - 🍺 Снеки и закуски (325 items)
 *  - 🧻 Расходники и тара (43 items)
 *  - 🎪 Ярмарка (15 items)
 *  - 🥔 Пивные закуски / Pringles (15 items)
 *  - Automatic dynamic supplier reading from Google Sheets
 *  - Independent carts, export, and WhatsApp summaries per supplier
 */

const DEFAULT_CATALOG = [
  {
    "id": "item_001",
    "name": "ВЕДРО ЮБИЛЕЙНЫЕ МАНГАЛ КЕБАБ 0,9кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_002",
    "name": "ВЕДРО ЮБИЛЕЙНЫЕ САЛО С ГОРЧИЦЕЙ 0,9кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_003",
    "name": "ВЕДРО ЮБИЛЕЙНЫЕ ТОМ ЯМ 0,9кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_004",
    "name": "ВЕДРО ЮБИЛЕЙНЫЕ ЧЁРНЫЙ ТРЮФЕЛЬ 0,9кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_005",
    "name": "ВЕДРО ЮБИЛЕЙНЫЕ ЧЕСНОК 0,9кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_006",
    "name": "Гренки Бро (КАЛЬМАР НА СМОКЕРЕ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_007",
    "name": "Гренки Бро (МЕКСИКАНСКОЕ БУРРИТО) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_008",
    "name": "Гренки Бро (ПИЦЦА 4 СЫРА) 1 кг",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_009",
    "name": "Гренки Бро (ТАЙСКИЙ ПЕРЕЦ) 1 кг",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_010",
    "name": "Гренки Бро (ТЕРИЯКИ ЧИКЕН) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_011",
    "name": "Гренки пшеничные Лутовские (БАВАРСКИЕ КОЛБАСКИ) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_012",
    "name": "Гренки пшеничные Лутовские (ВЕТЧИНА-СЫР) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_013",
    "name": "Гренки пшеничные Лутовские (ГРИБЫ СМЕТАНА) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_014",
    "name": "Гренки пшеничные Лутовские (КАРАМЕЛИЗОВАННЫЙ ЛУК) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_015",
    "name": "Гренки пшеничные Лутовские (КЕТЧУП) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_016",
    "name": "Гренки пшеничные Лутовские (КОПЧЕНЫЙ ЛОСОСЬ) 1кг",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_017",
    "name": "Гренки пшеничные Лутовские (КРАБ) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_018",
    "name": "Гренки пшеничные Лутовские (КРАСНАЯ ИКРА) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_019",
    "name": "Гренки пшеничные Лутовские (КРЫЛЫШКИ БАРБЕКЮ) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_020",
    "name": "Гренки пшеничные Лутовские (КУРИЦА В БРУСНИЧ.СОУСЕ) 1кг",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_021",
    "name": "Гренки пшеничные Лутовские (МАРИНОВАННЫЕ ОГУРЦЫ) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_022",
    "name": "Гренки пшеничные Лутовские (ПИЦЦА) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_023",
    "name": "Гренки пшеничные Лутовские (САЛО-ГОРЧИЦА) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_024",
    "name": "Гренки пшеничные Лутовские (СЕМГА) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_025",
    "name": "Гренки пшеничные Лутовские (СМЕТАНА-ЛУК) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_026",
    "name": "Гренки пшеничные Лутовские (СЫР-ЧЕСНОК) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_027",
    "name": "Гренки пшеничные Лутовские (СЫР) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_028",
    "name": "Гренки пшеничные Лутовские (ТАЙСКИЙ ПЕРЕЦ) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_029",
    "name": "Гренки пшеничные Лутовские (ТОМАТ-ЗЕЛЕНЬ) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_030",
    "name": "Гренки пшеничные Лутовские (УТКА ПО ПЕКИНСКИ) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_031",
    "name": "Гренки пшеничные Лутовские (Фо Бо) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_032",
    "name": "Гренки пшеничные Лутовские (ШАШЛЫК) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_033",
    "name": "Гренки пшеничные Лутовские (ШКВАРКИ) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_034",
    "name": "Гренки ржаные Лутовские (БЕКОН) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_035",
    "name": "Гренки ржаные Лутовские (ПАПРИКА С ЧЕСНОКОМ) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_036",
    "name": "Гренки ржаные Лутовские (ТЕЛЯТИНА НА ГРИЛЕ) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_037",
    "name": "Гренки ржаные Лутовские (ХОЛОДЕЦ-ХРЕН) 1кг",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_038",
    "name": "Гренки ржаные Лутовские (ЧЕСНОК) 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_039",
    "name": "Гренки СНАПСЫ \"Аджика\" 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_040",
    "name": "Гренки СНАПСЫ \"Бекон\" 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_041",
    "name": "Гренки СНАПСЫ \"Соль\" 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_042",
    "name": "Гренки СНАПСЫ \"Тайский перец\" 1 кг",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_043",
    "name": "Гренки СНАПСЫ \"ТОМАТ-БАЗИЛИК\" 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_044",
    "name": "Гренки СНАПСЫ \"Хрен\" 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_045",
    "name": "Гренки СНАПСЫ \"Чеснок\" 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_046",
    "name": "Гренки СНАПСЫ пшенич.\"КРАСНАЯ ИКРА\" 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_047",
    "name": "Гренки СНАПСЫ пшенич.\"МАРИНОВ.ОГУРЦЫ\" 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_048",
    "name": "Гренки СНАПСЫ пшенич.\"РАКИ-УКРОП\" 1 кг",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_049",
    "name": "Сухари \"АДЖИКА\" 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_050",
    "name": "Сухари \"БУЖЕНИНА\" 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_051",
    "name": "Сухари \"СЫР\" 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_052",
    "name": "Сухари \"ХОЛОДЕЦ-ХРЕН\" 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_053",
    "name": "Сухари \"ЧЕСНОК\" 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_054",
    "name": "Сухари \"ШАШЛЫК\" 1кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_055",
    "name": "Сухари Демидовские (БАРАНИНА С ЧЕСНОКОМ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_056",
    "name": "Сухари Демидовские (БЕКОН) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_057",
    "name": "Сухари Демидовские (КОРОЛЕВСКИЙ КРАБ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_058",
    "name": "Сухари Демидовские (ЛУК-ШАЛОТ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_059",
    "name": "Сухари Демидовские (МЕКСИКАНСКИЕ ПРЯНОСТИ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_060",
    "name": "Сухари Демидовские (ОСТРАЯ АДЖИКА) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_061",
    "name": "Сухари Демидовские (РЁБРЫШКИ ГРИЛЬ) 1кг",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_062",
    "name": "Сухари Демидовские (ТАЙСКИЙ ПЕРЕЦ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_063",
    "name": "Сухари Демидовские (ХАЛАПЕНЬО С ОГУРЧИКОМ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_064",
    "name": "Сухари Демидовские (ХОЛОДЕЦ С ХРЕНОМ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_065",
    "name": "Сухари Демидовские (ЧЕСНОК С КОПЧЕНЫМ ШПИКОМ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_066",
    "name": "Сухари Житницкие багет (ВАРЕНЫЕ РАКИ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_067",
    "name": "Сухари Житницкие багет (ГРИБЫ СО СМЕТАНОЙ) 1 кг",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_068",
    "name": "Сухари Житницкие багет (КОПЧЕНЫЙ СЫР) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_069",
    "name": "Сухари Житницкие багет (КРАСНАЯ ИКРА) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_070",
    "name": "Сухари Житницкие багет (ОХОТНИЧЬИ КОЛБАСКИ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_071",
    "name": "Сухари Житницкие багет (С ЧЕСНОЧКОМ) 1 кг, шт",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_072",
    "name": "Сухари Житницкие багет (СМЕТАНА-ЗЕЛЕНЬ) 1 кг",
    "category": "Гренки Весовые",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_073",
    "name": "Копчёные БОЧОНКИ 0,5 кг",
    "category": "Сырные Сухие",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_074",
    "name": "Шарики БЕКОН 0.5кг (продукт белково-жировой)",
    "category": "Сырные Сухие",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_075",
    "name": "Шарики МИКС 0.5кг (продукт белково-жировой), шт",
    "category": "Сырные Сухие",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_076",
    "name": "Шарики ОРИГИНАЛЬНЫЕ 0.5кг (продукт белково-жировой), шт",
    "category": "Сырные Сухие",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_077",
    "name": "Шарики ПАРМЕЗАН 0.5кг CHEE CORN (продукт белково-жировой), шт",
    "category": "Сырные Сухие",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_078",
    "name": "Шарики ТАЙСКИЙ ПЕРЕЦ 0.5кг (продукт белково-жировой)",
    "category": "Сырные Сухие",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_079",
    "name": "Гренки Сурские АДЖИКА 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_080",
    "name": "Гренки Сурские БАВАРСКИЕ 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_081",
    "name": "Гренки Сурские БУЖЕНИНА 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_082",
    "name": "Гренки Сурские КРАБ 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_083",
    "name": "Гренки Сурские КРАСНАЯ ИКРА 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_084",
    "name": "Гренки Сурские КРЫЛЫШКИ БАФФАЛО 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_085",
    "name": "Гренки Сурские СМЕТАНА-ЛУК 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_086",
    "name": "Гренки Сурские СЫР 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_087",
    "name": "Гренки Сурские ТАЙСКИЙ ПЕРЧИК 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_088",
    "name": "Гренки Сурские ТЕЛЯТИНА 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_089",
    "name": "Гренки Сурские ТОМАТ 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_090",
    "name": "Гренки Сурские ХОЛОДЕЦ-ГОРЧИЦА 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_091",
    "name": "Гренки Сурские ЧЕСНОК 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_092",
    "name": "Гренки Сурские ЧЕСНОК-ЗЕЛЕНЬ 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_093",
    "name": "Гренки Сурские ШАШЛЫК 100гр., шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 3.0,
    "unit": "шт",
    "display_step": "кратность 3 шт"
  },
  {
    "id": "item_094",
    "name": "Картошка \"Bruto\" РОЗОВЫЙ ПЕРЕЦ 120 гр*17шт.",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_095",
    "name": "Картошка \"Bruto\" С ПЕРЦЕМ 120 гр*17шт.",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_096",
    "name": "Картошка \"Bruto\" С ПЕРЦЕМ 60 гр*12шт.",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_097",
    "name": "Картошка \"Bruto\" С СОЛЬЮ 60 гр*12шт., кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_098",
    "name": "КОРНЕЛЛИ кукурузные сухари ВАССАБИ 80гр*12, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_099",
    "name": "КОРНЕЛЛИ кукурузные сухари КОПЧЕНАЯ КОЛБАСКА 80гр*12, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_100",
    "name": "КОРНЕЛЛИ кукурузные сухари РАК УКРОП 80гр*12, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_101",
    "name": "КОРНЕЛЛИ кукурузные сухари СЫР ПРОВАНСКИЕ 80гр*12, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_102",
    "name": "КОРНЕЛЛИ кукурузные сухари ТАЙСКИЙ ПЕРЕЦ 80гр*12, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_103",
    "name": "КОРНЕЛЛИ кукурузные сухари УТКА БРУСНИКА 80гр*12, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_104",
    "name": "Морская капуста КИМЧИ 5гр, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 4.0,
    "unit": "шт",
    "display_step": "кратность 4 шт"
  },
  {
    "id": "item_105",
    "name": "Морская капуста КРАБ 5гр, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 4.0,
    "unit": "шт",
    "display_step": "кратность 4 шт"
  },
  {
    "id": "item_106",
    "name": "Морская капуста ТОКИ ПОКИ 5гр, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 4.0,
    "unit": "шт",
    "display_step": "кратность 4 шт"
  },
  {
    "id": "item_107",
    "name": "Семечки от\"МАРТИНА\"100г*50 отборные (КРАСНАЯ КОРОБКА) 100гр, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_108",
    "name": "Семечки от\"МАРТИНА\"100г*50 с солью (СИНЯЯ КОРОБКА) 100гр, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_109",
    "name": "Семечки от\"МАРТИНА\"150гр*32шт БЕКОН ПОЛОСАТЫЕ 150гр, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_110",
    "name": "Семечки от\"МАРТИНА\"150гр*32шт ПОЛОСАТЫЕ 150гр, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_111",
    "name": "Чипсы Бингре \"БЕКОН\" 40гр*24, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_112",
    "name": "Чипсы Бингре \"ВАСАБИ\" 40гр*24, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_113",
    "name": "Чипсы Бингре \"ЗЯКИ-ЗЯКИ\" 50гр*24, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_114",
    "name": "Чипсы Бингре \"КАЛЬМАР\" 50гр*24, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_115",
    "name": "Чипсы Бингре \"КРАБ ЧИПСЫ\" 50гр*24, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_116",
    "name": "Чипсы Бингре \"КРЕВЕТКА\" 50гр*24, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_117",
    "name": "Чипсы Бингре \"ЛУКОВЫЕ КОЛЬЦА\" 50гр*24, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_118",
    "name": "Чипсы Бингре \"МОРСКАЯ КАПУСТА\" 40гр*24, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_119",
    "name": "Чипсы Бингре \"ОСТРЫЙ ДЖАМПОНГ\" 40гр*24, кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_120",
    "name": "Чипсы Bruto \"БЕКОН\" 120 гр. 1*18 шт., кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_121",
    "name": "Чипсы Bruto \"СМЕТАНА ЗЕЛЕНЬ\" 120 гр. 1*18 шт., кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_122",
    "name": "Чипсы Bruto (рифлёные) \"РЁБРЫШКИ БАРБЕКЮ\" 120 гр. 1*18 шт., кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_123",
    "name": "Арахис в глазури Сильвер ЧЕТЫРЕ СЫРА 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_124",
    "name": "Арахис в хруст.корочке ФомаЛукич БАРБЕКЮ 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_125",
    "name": "Арахис в хруст.корочке ФомаЛукич БЕКОН 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_126",
    "name": "Арахис в хруст.корочке ФомаЛукич ВАСАБИ 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_127",
    "name": "Арахис в хруст.корочке ФомаЛукич КРЕВЕТКА 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_128",
    "name": "Арахис в хруст.корочке ФомаЛукич МЕКСИКАНСКИЙ СОУС 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_129",
    "name": "Арахис в хруст.корочке ФомаЛукич МИКС 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_130",
    "name": "Арахис в хруст.корочке ФомаЛукич СМЕТАНА-ЛУК 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_131",
    "name": "Арахис в хруст.корочке ФомаЛукич СЫР 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_132",
    "name": "Арахис в хруст.корочке ФомаЛукич ШАШЛЫК 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_133",
    "name": "Арахис ж/с СОЛЬ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_134",
    "name": "Арахис ж/с ХРУСТЯЩИЙ КОПЧЕНЫЙ 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_135",
    "name": "Арахис ж/с ХРУСТЯЩИЙ СО ВКУСОМ ВАСАБИ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_136",
    "name": "Арахис ж/с ХРУСТЯЩИЙ СО ВКУСОМ КИМЧИ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_137",
    "name": "Арахис ж/с ХРУСТЯЩИЙ СО ВКУСОМ КОПЧЕНЫЙ МИКС 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_138",
    "name": "Арахис ж/с ХРУСТЯЩИЙ СО ВКУСОМ ЛОБСТЕР 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_139",
    "name": "Арахис ж/с ХРУСТЯЩИЙ СО ВКУСОМ СЫР 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_140",
    "name": "Арахис ж/с ХРУСТЯЩИЙ СО ВКУСОМ ТОМ ЯМ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_141",
    "name": "Арахис ж/с ХРУСТЯЩИЙ СО ВКУСОМ ХОЛОДЕЦ ХРЕН 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_142",
    "name": "Арахис ж/с ХРУСТЯЩИЙ СО ВКУСОМ ЧЕСНОК 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_143",
    "name": "Арахис ж/с ХРУСТЯЩИЙ СО ВКУСОМ ШАШЛЫК 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_144",
    "name": "Арахис ж/с ХРУСТЯЩИЙ СОЛЬ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_145",
    "name": "Арахис жс АДЖИКА ОСТРАЯ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_146",
    "name": "Арахис жс БАРБЕКЮ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_147",
    "name": "Арахис жс БЕКОН 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_148",
    "name": "Арахис жс ВАСАБИ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_149",
    "name": "Арахис жс ГРИБЫ-СМЕТАНА 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_150",
    "name": "Арахис жс КРАСНАЯ ИКРА 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_151",
    "name": "Арахис жс КРЕВЕТКА 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_152",
    "name": "Арахис жс ЛОСОСЬ 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_153",
    "name": "Арахис жс МАЛОСОЛЬНЫЕ ОГУРЧИКИ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_154",
    "name": "Арахис жс МЕКСИКАНСКИЙ СОУС 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_155",
    "name": "Арахис жс РАК С УКРОПОМ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_156",
    "name": "Арахис жс САЛЯМИ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_157",
    "name": "Арахис жс СЕМГА-СЫР 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_158",
    "name": "Арахис жс СМЕТАНА-ЗЕЛЕНЬ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_159",
    "name": "Арахис жс СЫР 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_160",
    "name": "Арахис жс СЫР-ЧЕСНОК 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_161",
    "name": "Арахис жс ТАЙСКИЙ ПЕРЕЦ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_162",
    "name": "Арахис жс ХОЛОДЕЦ ХРЕН 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_163",
    "name": "Арахис жс ШАШЛЫК 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_164",
    "name": "Арахис Averton в глазури АЗИАТСКИЙ МИКС 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_165",
    "name": "Арахис Averton в глазури БАРБЕКЮ 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_166",
    "name": "Арахис Averton в глазури ВАСАБИ 1кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_167",
    "name": "Арахис Averton в глазури КИМЧИ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_168",
    "name": "Арахис Averton в глазури КРЕВЕТКА 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_169",
    "name": "Арахис Averton в глазури МИКС 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_170",
    "name": "Арахис Averton в глазури МОРСКОЙ КОКТЕЙЛЬ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_171",
    "name": "Арахис Averton в глазури ТАЙСКИЙ ПЕРЕЦ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_172",
    "name": "Арахис Averton в глазури ТОМ ЯМ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_173",
    "name": "Кешью жс 1 кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_174",
    "name": "Кешью с розмарином 1 кг",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_175",
    "name": "КУКУРУЗА жареная со вкусом БАРБЕКЮ 0.5 кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_176",
    "name": "КУКУРУЗА жареная со вкусом СОЛЬ 0.5 кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_177",
    "name": "КУКУРУЗА жареная со вкусом СЫР 0.5 кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_178",
    "name": "Миндаль жс 1 кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_179",
    "name": "Миндаль КОПЧЕНЫЙ 1 кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_180",
    "name": "Ореховая смесь (кешью, миндаль, арахис) 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_181",
    "name": "Фисташка КОПЧЕНАЯ 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_182",
    "name": "Фисташки (КЕРМАН) 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_183",
    "name": "Фисташки со вкусом \"ВАСАБИ\" 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_184",
    "name": "Фисташки со вкусом \"ТАБАСКО\" 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_185",
    "name": "Фисташки со вкусом \"ЧИЛИ\" 1кг, шт",
    "category": "Орехи",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_186",
    "name": "Чипсы из лаваша \"АДЖИКА\" 1 кг",
    "category": "Начос и лавашики",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_187",
    "name": "Чипсы из лаваша \"СМЕТАНА-ЛУК\" 1 кг",
    "category": "Начос и лавашики",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_188",
    "name": "Чипсы из лаваша \"ХОЛОДЕЦ ХРЕН\" 1 кг",
    "category": "Начос и лавашики",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_189",
    "name": "Чипсы из лаваша \"ШАШЛЫК\" 1 кг",
    "category": "Начос и лавашики",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_190",
    "name": "Чипсы кукурузные \"Начос\" \"БАРБЕКЮ\" 0,5 кг, шт",
    "category": "Начос и лавашики",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "набор",
    "display_step": "кратность 1 набор"
  },
  {
    "id": "item_191",
    "name": "Чипсы кукурузные \"Начос\" \"БЕКОН\" 0,5 кг, шт",
    "category": "Начос и лавашики",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "набор",
    "display_step": "кратность 1 набор"
  },
  {
    "id": "item_192",
    "name": "Чипсы кукурузные \"Начос\" \"ИТАЛЬЯНСКАЯ ПИЦЦА\" 0,5 кг, шт",
    "category": "Начос и лавашики",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "набор",
    "display_step": "кратность 1 набор"
  },
  {
    "id": "item_193",
    "name": "Чипсы кукурузные \"Начос\" \"ОРИГИНАЛЬНЫЕ\" 0,5 кг, шт",
    "category": "Начос и лавашики",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "набор",
    "display_step": "кратность 1 набор"
  },
  {
    "id": "item_194",
    "name": "Чипсы кукурузные \"Начос\" \"СМЕТАНА-ЛУК\" 0,5 кг, шт",
    "category": "Начос и лавашики",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "набор",
    "display_step": "кратность 1 набор"
  },
  {
    "id": "item_195",
    "name": "Чипсы кукурузные \"Начос\" \"СЫР\" 0,5 кг, шт",
    "category": "Начос и лавашики",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "набор",
    "display_step": "кратность 1 набор"
  },
  {
    "id": "item_196",
    "name": "Чипсы кукурузные \"Начос\" \"ТАЙСКИЙ ПЕРЕЦ\" 0,5 кг, шт",
    "category": "Начос и лавашики",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "набор",
    "display_step": "кратность 1 набор"
  },
  {
    "id": "item_197",
    "name": "Соус \"Сливочно-чесночный\" 80гр. Базилио",
    "category": "Соусы",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_198",
    "name": "Соус \"Блю Чиз\" 90 гр., шт",
    "category": "Соусы",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_199",
    "name": "Соус \"Гуакамоле\" 90 гр., шт",
    "category": "Соусы",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_200",
    "name": "Соус \"Острый Сальса\" 90 гр., шт",
    "category": "Соусы",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_201",
    "name": "Соус \"Сырный\" 90гр., шт",
    "category": "Соусы",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_202",
    "name": "Соус \"Трюфельный\" 90 гр., шт",
    "category": "Соусы",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_203",
    "name": "Анчоус 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_204",
    "name": "Вкусовые пяточки Карри 0,5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_205",
    "name": "Вкусовые пяточки Сыр и чили 0,5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_206",
    "name": "Вкусовые пяточки Териаки 0,5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_207",
    "name": "Вкусовые пяточки Томаты с базиликом 0,5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_208",
    "name": "Желтый полосатик 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_209",
    "name": "Икра ВОБЛЫ 0.5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_210",
    "name": "Икра КОЛБАСКИ 500гр, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_211",
    "name": "Икра МИНТАЯ 500гр, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_212",
    "name": "Икра СЕЛЬДИ 500гр, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_213",
    "name": "Икра СУДАКА 500гр",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_214",
    "name": "Икра ФОРЕЛИ 0.5кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_215",
    "name": "Императорский полосатик 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_216",
    "name": "КАЛЬМАР КУСОЧКИ сол.суш (ЭКСТРА) 1КГ",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_217",
    "name": "Кальмар ПОЛУКОЛЬЦА 1 кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_218",
    "name": "Кальмар полукольца СО ВКУСОМ МЯСА КРАБА 1кг , шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_219",
    "name": "Кальмар рваный ПО-ШАНХАЙСКИ 1 кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_220",
    "name": "КАЛЬМАР соломка (ЯПОНСКИЙ ДЕЛИКАТЕС) 1кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_221",
    "name": "Кальмар СТРУЖКА 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_222",
    "name": "Кальмар СТРУЖКА ПО-ШАНХАЙСКИ 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_223",
    "name": "Кальмар стружка со вкусом краба 1кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_224",
    "name": "Кальмар ХОТ-ТЕЙСТ 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_225",
    "name": "Камбала Филе 0,5 кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_226",
    "name": "Камбалка деликатесная 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_227",
    "name": "Камбалка СОЛОМКА с/с 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_228",
    "name": "Креветка (Солено-сушеная ) 0,5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_229",
    "name": "Креветка азиатская ХОТ СПЕЙСИ 0.5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_230",
    "name": "ЛАКЕДРА сол.суш 1кг , шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_231",
    "name": "МИНТАЙ стружка с перцем 1кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_232",
    "name": "Морской ЛИЗУН (АСТРАХАНКИНА) 1кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_233",
    "name": "Мясо КРАБА (Астраханкина) 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_234",
    "name": "Мясо КРАБА Экстра (РОНГ-ЧЕНГ) 1КГ",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_235",
    "name": "Палочки ГОРБУШИ (Солено-сушеная) 0,5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_236",
    "name": "ПАЛОЧКИ КЕТЫ натур. 1 кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_237",
    "name": "Палочки КИЖУЧ 1 кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_238",
    "name": "Палочки СОМА 0.5 кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_239",
    "name": "Палочки ФОРЕЛИ 500гр, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_240",
    "name": "Палочки ЩУКИ 0.5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_241",
    "name": "Паутинка ВОБЛЫ 0.5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_242",
    "name": "Паутинка ТУНЦА с перцем 1 кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_243",
    "name": "Паутинка ФОРЕЛИ 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_244",
    "name": "ПЯТОЧКИ КАЛЬМАРА кусочки сушеные 1 кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_245",
    "name": "Слайсы из филе КИЖУЧ 0,5кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_246",
    "name": "Слайсы Карпа 0,5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_247",
    "name": "Слайсы Кеты 0,5кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_248",
    "name": "Соломка Минтая (Лизун) 1кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_249",
    "name": "Соломка Таранка с перцем 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_250",
    "name": "Тунец с перцем (Астраханкина) 1 кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_251",
    "name": "Угорь солено-сушеный 1кг , шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_252",
    "name": "ФИЛЕ ТРЕСКИ с перцем/Рваный минтай с перцем 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_253",
    "name": "ФИЛЕ ТРЕСКИ/Рваный Минтай 1кг, шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_254",
    "name": "Чипсы \"ИКРЯНЫЕ\" солено-сушеные из морепродуктов 0,5кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_255",
    "name": "Чипсы СЁМГИ 1кг",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_256",
    "name": "Щечки СУДАКА вяленые 500гр , шт",
    "category": "Рыбные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_257",
    "name": "ДОНДУКОВСКИЙ БЕЛЫЕ ПРЯДИ 1 кг (продукт белково-жировой)",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_258",
    "name": "ДОНДУКОВСКИЙ ОХОТНИЧИЙ 1 кг (продукт белково-жировой)",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_259",
    "name": "ДОНДУКОВСКИЙ ПРЯДИ КОПЧ.1 кг (продукт белково-жировой)",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_260",
    "name": "Копчёный \"БОЧОНОК\" на ОЛЬХЕ 1кг",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_261",
    "name": "САНККИНО Балыковый КОПЧЕНЫЙ 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_262",
    "name": "САНККИНО Балыковый МОЛОЧНЫЙ 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_263",
    "name": "САНККИНО БОЧОНОК АДЖИКА 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_264",
    "name": "САНККИНО БОЧОНОК копченый 0,5 кг",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_265",
    "name": "САНККИНО БОЧОНОК КРАСНАЯ ИКРА 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_266",
    "name": "САНККИНО БОЧОНОК ПАПРИКА 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_267",
    "name": "САНККИНО БОЧОНОК УКРОП ЧЕСНОК 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_268",
    "name": "САНККИНО Коса копченый, кг",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_269",
    "name": "САНККИНО Коса МОЛОЧНАЯ, кг",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кг",
    "display_step": "кратность 1 кг"
  },
  {
    "id": "item_270",
    "name": "САНККИНО Спагетти КОПЧЕНЫЙ 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_271",
    "name": "САНККИНО Спагетти МОЛОЧНЫЙ 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_272",
    "name": "САНККИНО Спагетти ПАПРИКА 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_273",
    "name": "САНККИНО Спагетти УКРОП ЧЕСНОК 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_274",
    "name": "Сыр ЖАРЕНЫЙ Воздушный КРАСНАЯ ИКРА 0.5кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_275",
    "name": "Сыр жареный ХВОРОСТ 0.5кг (Вкусняшка)",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_276",
    "name": "ФЕРМЕРСКИЙ Балыковый КОПЧЕНЫЙ 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_277",
    "name": "ФЕРМЕРСКИЙ Балыковый МОЛОЧНЫЙ 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_278",
    "name": "ФЕРМЕРСКИЙ БОЧОНОК АДЖИКА 0,5 кг",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_279",
    "name": "ФЕРМЕРСКИЙ БОЧОНОК ПАПРИКА 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_280",
    "name": "ФЕРМЕРСКИЙ БОЧОНОК УКРОП ЧЕСНОК 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_281",
    "name": "ФЕРМЕРСКИЙ Коса КОПЧЕНЫЙ 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_282",
    "name": "ФЕРМЕРСКИЙ Коса МОЛОЧНАЯ 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_283",
    "name": "ФЕРМЕРСКИЙ Спагетти БЕКОН 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_284",
    "name": "ФЕРМЕРСКИЙ Спагетти КОПЧЕНЫЙ 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_285",
    "name": "ФЕРМЕРСКИЙ Спагетти КРАСНАЯ ИКРА 0,5 кг",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_286",
    "name": "ФЕРМЕРСКИЙ Спагетти МОЛОЧНЫЙ 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_287",
    "name": "ФЕРМЕРСКИЙ Спагетти ПАПРИКА 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_288",
    "name": "ФЕРМЕРСКИЙ Спагетти УКРОП ЧЕСНОК 0,5 кг, шт",
    "category": "Сыры",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_289",
    "name": "Кнуты АДЖИКА 0,5 кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_290",
    "name": "Кнуты БРУСНИЧНЫЕ 0,5 кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_291",
    "name": "Кнуты КЛАССИЧЕСКИЕ 0,5 кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_292",
    "name": "Колбаски с/к с БЕКОНОМ 0,5 кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_293",
    "name": "Колбаски с/к с ПЕРЦЕМ ЧИЛИ 0,5 кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_294",
    "name": "Колбаски с/к с СЫРОМ 0,5 кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_295",
    "name": "МЯСНЫЕ чипсы \"УТКА ПО ПЕКИНСКИ\" Орёл 0,5кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_296",
    "name": "МЯСНЫЕ чипсы ГОВЯДИНА Орёл 0.5 кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_297",
    "name": "МЯСНЫЕ чипсы ГУСЬ ПО БАВАРСКИ Орёл 0,5кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_298",
    "name": "МЯСНЫЕ чипсы ИНДЕЙКА Орёл 0,5кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_299",
    "name": "МЯСНЫЕ чипсы КУРИЦА Орёл 0,5кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_300",
    "name": "МЯСНЫЕ чипсы СВИНИНА (ЧИЛИ) Орёл 0,5кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_301",
    "name": "МЯСНЫЕ чипсы СВИНИНА Орёл 0,5кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_302",
    "name": "МЯСНЫЕ чипсы ЧЕРНЫЙ КАБАН Орёл 0,5кг",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_303",
    "name": "Чипсы мясные ИНДЕЙКА 500гр (Гриль)",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_304",
    "name": "Чипсы мясные КУРИЦА 500гр (Халапеньо)",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_305",
    "name": "Чипсы мясные КУРИЦА 500гр (ЧЕСНОК)",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_306",
    "name": "Чипсы мясные СВИНИНА 500гр (Гриль)",
    "category": "Мясные",
    "supplier": "snacks",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_307",
    "name": "Мясо Рыцарское баранина 50гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_308",
    "name": "Мясо Рыцарское говядина 50гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_309",
    "name": "Мясо Рыцарское заяц 50гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_310",
    "name": "Мясо Рыцарское индейка 50гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_311",
    "name": "Мясо Рыцарское кабан 50гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_312",
    "name": "Мясо Рыцарское конина 50гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_313",
    "name": "Мясо Рыцарское курица 50гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_314",
    "name": "Мясо Рыцарское курица ОСТРАЯ 50гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_315",
    "name": "Мясо Рыцарское оленина 50гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_316",
    "name": "Мясо Рыцарское утка 50гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_317",
    "name": "Свиные ушки ГОРЧИЦА 90 гр.",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_318",
    "name": "Свиные ушки КЛАССИКА 90 гр.",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_319",
    "name": "Свиные ушки ОСТРЫЕ 90 гр.",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_320",
    "name": "Свиные ушки ПАПРИКА 90 гр.",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_321",
    "name": "Свиные ушки ХОЛОДЕЦ-ХРЕН 90 гр.",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_322",
    "name": "Свиные ушки ЧЕСНОК 90 гр.",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_323",
    "name": "УХО целое КЛАССИКА 180гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_324",
    "name": "УХО целое ПЕРЕЦ 180гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_325",
    "name": "УХО целое ЧЕСНОК 180гр",
    "category": "Мясные ЗАВОД",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_326",
    "name": "Бумажные полотенца",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_327",
    "name": "Губка для посуды",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_328",
    "name": "ДИХЛОФОС (Чистый дом)",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_329",
    "name": "Ершик для унитаза",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_330",
    "name": "Жесткая щётка",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_331",
    "name": "Кассовая лента",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_332",
    "name": "Крафт пакеты на бутылку",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "уп",
    "display_step": "кратность 1 уп"
  },
  {
    "id": "item_333",
    "name": "крючки с широкой подложкой",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_334",
    "name": "Лента для весов (уп)",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "уп",
    "display_step": "кратность 1 уп"
  },
  {
    "id": "item_335",
    "name": "Маркер-краска белый",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_336",
    "name": "Маркер-краска черный",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_337",
    "name": "Металические Ценнико держатели",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_338",
    "name": "мыло жидкое",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_339",
    "name": "Нож для рыбы",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_340",
    "name": "ножницы большие",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_341",
    "name": "Освежитель воздуха",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_342",
    "name": "Пергамент рулон",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "рулон",
    "display_step": "кратность 1 рулон"
  },
  {
    "id": "item_343",
    "name": "Перчатки Латекс, синие",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_344",
    "name": "Перчатки целофан",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_345",
    "name": "Пластиковый ценникодержатель",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_346",
    "name": "Полотенца вафельные",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_347",
    "name": "пульвизатор 1-1.5 л",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_348",
    "name": "Ручка синяя",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_349",
    "name": "Салфетки влажные",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_350",
    "name": "Скотч двусторонний",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_351",
    "name": "Скотч прозрачный",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_352",
    "name": "Средство для пола, канистра 5 л.",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_353",
    "name": "Средство для стекла (Хелп)",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_354",
    "name": "Средство для туалета",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_355",
    "name": "Стаканы 0,5 (премиум)",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "уп",
    "display_step": "кратность 1 уп"
  },
  {
    "id": "item_356",
    "name": "Стаканы Дегустация",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_357",
    "name": "тряпка для стекол",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_358",
    "name": "Туалетная Бумага",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_359",
    "name": "Уксус УП.",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "уп",
    "display_step": "кратность 1 уп"
  },
  {
    "id": "item_360",
    "name": "Фасовачные пакеты 32/40 синие",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_361",
    "name": "Фейри",
    "category": "Расходники",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_362",
    "name": "ИП-30 (начос/большие креветки)",
    "category": "Контейнеры",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_363",
    "name": "КР-7 (лаваши)",
    "category": "Контейнеры",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_364",
    "name": "РК-19 (фисташки)",
    "category": "Контейнеры",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_365",
    "name": "РК-20 (сыр.шар)",
    "category": "Контейнеры",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_366",
    "name": "РКС-350 (мокрые) (ИПР)",
    "category": "Контейнеры",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_367",
    "name": "С крышкой (сухие) 350гр",
    "category": "Контейнеры",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_368",
    "name": "С крышкой (сухие) 500гр",
    "category": "Контейнеры",
    "supplier": "consumables",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_369",
    "name": "Ванголе",
    "category": "Заморозка",
    "supplier": "yarmarka",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_370",
    "name": "королевсие креветки 31/40",
    "category": "Заморозка",
    "supplier": "yarmarka",
    "step": 5.0,
    "unit": "кг",
    "display_step": "кратность 5 кг"
  },
  {
    "id": "item_371",
    "name": "Креветка Отчищеная",
    "category": "Заморозка",
    "supplier": "yarmarka",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_372",
    "name": "креветки 70/90",
    "category": "Заморозка",
    "supplier": "yarmarka",
    "step": 5.0,
    "unit": "кг",
    "display_step": "кратность 5 кг"
  },
  {
    "id": "item_373",
    "name": "Креветки Тигорвые",
    "category": "Заморозка",
    "supplier": "yarmarka",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_374",
    "name": "лангустины БГ",
    "category": "Заморозка",
    "supplier": "yarmarka",
    "step": 2.0,
    "unit": "кг",
    "display_step": "кратность 2 кг"
  },
  {
    "id": "item_375",
    "name": "Лангустины СГ",
    "category": "Заморозка",
    "supplier": "yarmarka",
    "step": 2.0,
    "unit": "кг",
    "display_step": "кратность 2 кг"
  },
  {
    "id": "item_376",
    "name": "МАГАДАН",
    "category": "Заморозка",
    "supplier": "yarmarka",
    "step": 5.0,
    "unit": "кг",
    "display_step": "кратность 5 кг"
  },
  {
    "id": "item_377",
    "name": "Мидии синие",
    "category": "Заморозка",
    "supplier": "yarmarka",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_378",
    "name": "Морской гребешок",
    "category": "Заморозка",
    "supplier": "yarmarka",
    "step": 0.5,
    "unit": "кг",
    "display_step": "кратность 0.5 кг"
  },
  {
    "id": "item_379",
    "name": "Жеват.резинка ЛавИз",
    "category": "Вкусняшки и прочее",
    "supplier": "yarmarka",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_380",
    "name": "Карты игральные классика (уп)",
    "category": "Вкусняшки и прочее",
    "supplier": "yarmarka",
    "step": 1.0,
    "unit": "уп",
    "display_step": "кратность 1 уп"
  },
  {
    "id": "item_381",
    "name": "Мармеладки клубничка",
    "category": "Вкусняшки и прочее",
    "supplier": "yarmarka",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_382",
    "name": "Мармеладки хот-дог",
    "category": "Вкусняшки и прочее",
    "supplier": "yarmarka",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_383",
    "name": "Чупа чупсы",
    "category": "Вкусняшки и прочее",
    "supplier": "yarmarka",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_мини_горячий_и_острый_hot_spicy_40_гр",
    "name": "МИНИ Принглс Горячий и Острый (Hot & Spicy), 40 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_мини_оригинальный_40_гр",
    "name": "МИНИ Принглс оригинальный, 40 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_мини_паприка_40_гр",
    "name": "МИНИ Принглс ПАПРИКА, 40 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_мини_техасский_соус_bbq_40_гр",
    "name": "МИНИ Принглс Техасский соус BBQ, 40 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_бекон_165_гр",
    "name": "Принглс БЕКОН, в упаковке 165 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_оригинальный_165_гр",
    "name": "Принглс Оригинальный, 165 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_паприка_165_гр",
    "name": "Принглс Паприка, 165 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_пицца_165_гр",
    "name": "Принглс Пицца, 165 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_с_ароматом_чили_и_лайма_chilli_lime_острая_серия_hot_160_гр",
    "name": "Принглс с ароматом ЧИЛИ И ЛАЙМА (CHILLI & LIME), Острая серия HOT, 160 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_сметана_и_лук_165_гр",
    "name": "Принглс Сметана и лук, 165 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_со_вкусом_канадского_сладко_копченого_барбекю_canadian_sweet_smoky_bbq_160_гр",
    "name": "Принглс со вкусом Канадского Сладко - Копченого Барбекю (Canadian SWEET & SMOKY BBQ), 160 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_соль_и_уксус_165_гр",
    "name": "Принглс СОЛЬ И УКСУС, в упаковке 165 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_сыр_и_лук_165_гр",
    "name": "Принглс Сыр и лук, 165 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_сыр_165_гр",
    "name": "Принглс Сыр, в упаковке 165 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_таинственный_вкус_mystery_flavor_165_гр",
    "name": "Принглс Таинственный вкус (Mystery Flavor), в упаковке 165 гр.",
    "brand": "Pringles",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_чипсы_бульба_chips_сметана_и_лук_75_гр",
    "name": "Чипсы Бульба chips Сметана и лук, 75 гр.",
    "brand": "Bulba",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_мегачипс_с_солью_100_гр",
    "name": "Мегачипс с солью, 100 гр.",
    "brand": "Mega Chips",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "pringles_чипсы_джаузи_со_вкусом_утки_52_гр",
    "name": "Чипсы Джаузи со вкусом утки, 52 гр.",
    "brand": "Джаузи",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  }
];

// Standard / Fallback Suppliers Configuration
const DEFAULT_SUPPLIERS = [
  {
    id: 'snacks',
    name: 'Снеки и закуски',
    shortName: 'Снеки',
    icon: '🍺',
    categories: [
      'Гренки Весовые',
      'Сырные Сухие',
      'Гренки Чипсы и снеки ЗАВОДСКИЕ',
      'Орехи',
      'Начос и лавашики',
      'Соусы',
      'Рыбные',
      'Сыры',
      'Мясные',
      'Мясные ЗАВОД'
    ]
  },
  {
    id: 'pivnye_zakuski',
    name: 'Пивные закуски',
    shortName: 'Пивные закуски',
    icon: '🥔',
    categories: [
      'Pringles'
    ]
  },
  {
    id: 'yarmarka',
    name: 'Ярмарка',
    shortName: 'Ярмарка',
    icon: '🎪',
    categories: [
      'Заморозка',
      'Вкусняшки и прочее'
    ]
  },
  {
    id: 'consumables',
    name: 'Расходники и тара',
    shortName: 'Расходники',
    icon: '🧻',
    categories: [
      'Расходники',
      'Контейнеры'
    ]
  }
];

const SUPPLIER_DISPLAY_ORDER = ['snacks', 'pivnye_zakuski', 'yarmarka', 'consumables'];

function sortSuppliersList(list) {
  if (!Array.isArray(list)) return list;
  return [...list].sort((a, b) => {
    const idxA = SUPPLIER_DISPLAY_ORDER.indexOf(a.id);
    const idxB = SUPPLIER_DISPLAY_ORDER.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return 0;
  });
}

const KNOWN_SUPPLIER_META = {
  'snacks': { name: 'Снеки и закуски', shortName: 'Снеки', icon: '🍺' },
  'pivnye_zakuski': { name: 'Пивные закуски', shortName: 'Пивные закуски', icon: '🥔' },
  'yarmarka': { name: 'Ярмарка', shortName: 'Ярмарка', icon: '🎪' },
  'consumables': { name: 'Расходники и тара', shortName: 'Расходники', icon: '🧻' }
};

// Category metadata: labels and icons
const CATEGORY_META = {
  'all': { label: 'Все товары', icon: '📦' },
  'Гренки Весовые': { label: 'Гренки весовые', icon: '🥖' },
  'Сырные Сухие': { label: 'Сырные сухие', icon: '🧀' },
  'Гренки Чипсы и снеки ЗАВОДСКИЕ': { label: 'Снеки заводские', icon: '🏭' },
  'Орехи': { label: 'Орехи', icon: '🥜' },
  'Начос и лавашики': { label: 'Начос & лаваши', icon: '🌮' },
  'Соусы': { label: 'Соусы', icon: '🥫' },
  'Рыбные': { label: 'Рыбные снеки', icon: '🐟' },
  'Сыры': { label: 'Сыры', icon: '🧀' },
  'Мясные': { label: 'Мясные снеки', icon: '🥩' },
  'Мясные ЗАВОД': { label: 'Мясные завод', icon: '🍖' },
  'Расходники': { label: 'Расходники', icon: '🧻' },
  'Контейнеры': { label: 'Контейнеры', icon: '🥡' },
  'Заморозка': { label: 'Заморозка', icon: '❄️' },
  'Вкусняшки и прочее': { label: 'Вкусняшки', icon: '🍬' },
  'Pringles': { label: 'Pringles', icon: '🥔' },
  'Добавлены пользователем': { label: 'Добавлены пользователем', icon: '🆕' },
  'manual': { label: 'Свободный ввод', icon: '✏️' }
};

// Application State
let catalog = [...DEFAULT_CATALOG];
let suppliers = [...DEFAULT_SUPPLIERS];
let activeSupplier = 'snacks';
let modalActiveSupplier = 'snacks';
let activeCategory = 'all';
let activeBrandFilter = 'all';
let activeSortMode = 'series'; // 'series' | 'type' | 'fav_order' | 'alpha' | 'pack'
let searchQuery = '';
let order = {}; // { itemId: quantity }
let manualItems = []; // [ { id, name, category, quantity, unit, step, supplier } ]

// 4 Stores configuration & Multi-store favorites
const STORES = ['Битца', 'Битца2', 'БП', 'Олимп'];

const STORE_MAP = {
  bitca: { key: 'bitca', name: 'Битца', color: '#10b981', border: '#10b981', badgeClass: 'store-badge-bitca' },
  bitca2: { key: 'bitca2', name: 'Битца2', color: '#0ea5e9', border: '#0ea5e9', badgeClass: 'store-badge-bitca2' },
  bp: { key: 'bp', name: 'БП', color: '#f59e0b', border: '#f59e0b', badgeClass: 'store-badge-bp' },
  olimp: { key: 'olimp', name: 'Олимп', color: '#a855f7', border: '#a855f7', badgeClass: 'store-badge-olimp' }
};

const STORE_KEY_TO_NAME = {
  bitca: 'Битца',
  bitca2: 'Битца2',
  bp: 'БП',
  olimp: 'Олимп'
};

const STORE_NAME_TO_KEY = {
  'Битца': 'bitca',
  'Битца2': 'bitca2',
  'БП': 'bp',
  'Олимп': 'olimp'
};

let activeStore = 'Битца';
let pendingStoreKey = null;
let isCheckingPin = false;
let isAppInitialized = false;
let storeFavorites = {
  'Битца': new Set(),
  'Битца2': new Set(),
  'БП': new Set(),
  'Олимп': new Set()
};
let privateFavorites = new Set();
let favFilterMode = 'none'; // 'none' | 'store' | 'private'

const CATALOG_CACHE_KEY = 'snack_catalog_cache_v11';
const SUPPLIERS_CACHE_KEY = 'snack_suppliers_cache_v9';
const ORDER_STORAGE_KEY = 'snack_order_v8';
const MANUAL_STORAGE_KEY = 'snack_manual_items_v8';
const ACTIVE_SUPPLIER_KEY = 'snack_active_supplier_v8';
const SORT_MODE_STORAGE_KEY = 'snack_sort_mode_v1';

const SORT_MODES = [
  { id: 'series', label: 'По сериям', icon: '📚' },
  { id: 'type', label: 'По виду', icon: '🏷️' },
  { id: 'fav_order', label: 'Сначала ⭐ и 🛒', icon: '⭐' },
  { id: 'alpha', label: 'А → Я', icon: '🔤' },
  { id: 'pack', label: 'По фасовке', icon: '⚖️' }
];
const ACTIVE_STORE_KEY = 'snack_active_store_v1';
const STORE_FAVORITES_KEY = 'snack_store_favorites_v2';
const PRIVATE_FAVORITES_KEY = 'snack_private_favorites_v2';
const FAVORITES_STORAGE_KEY = 'snack_favorites_v1'; // legacy fallback
const CUSTOM_SHEET_KEY = 'snack_custom_sheet_url';
const APPS_SCRIPT_URL_KEY = 'snack_apps_script_url_v1';
const USER_ADDED_SHEET_NAME = 'Добавлены пользователем';
const USER_ADDED_CACHE_KEY = 'snack_user_added_cache_v1';
const USER_DELETED_CACHE_KEY = 'snack_user_deleted_cache_v1';
const PENDING_CUSTOM_TTL_MS = 10 * 60 * 1000;
let liveCustomItemsCache = null;

const DEFAULT_SHEET_XLSX_URL = 'https://docs.google.com/spreadsheets/d/1nqOd_F-H60hE8lwObZyBhLhAHFBidV0UKkqLVvl81Ro/export?format=xlsx';
const DEFAULT_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyR0Mjnf8-VhnvEYCdc-i0sqjvxj8Kdw8Kxjc3BdrNvckL0baNvkt3cBtWvhAanC_s/exec';

// SVG Icons helper
const ICONS = {
  trash: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  refresh: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
  copy: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  share: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
  excel: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="17"></line><line x1="16" y1="13" x2="8" y2="17"></line></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  minus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  starOutline: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  starFilled: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  starBlue: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#38bdf8" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  starSplit: `<svg width="18" height="18" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><defs><linearGradient id="splitStarGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="50%" stop-color="#f59e0b" /><stop offset="50%" stop-color="#38bdf8" /></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#splitStarGrad)" stroke="url(#splitStarGrad)" stroke-width="1.5"></polygon></svg>`
};

// Initialize Application
async function initApp() {
  loadSavedState();
  checkUrlHashConfig();
  await restoreFavoritesFromIndexedDB();
  await loadCatalog();
  setupEventListeners();
  renderStorePills();
  renderSupplierNav();
  updateFavBadge();
  renderCategoryTabs();
  renderSortBar();
  renderCatalog();
  updateOrderBar();

  // Background auto-sync on startup to load fresh photos and sheet favorites from Google Sheets
  syncFromGoogleSheets(false).catch(err => {
    console.warn('Initial Google Sheets sync notice:', err);
  });
  syncFavoritesFromAppsScript(false).catch(err => {
    console.warn('Initial Apps Script favorites sync notice:', err);
  });
}

// LocalStorage & IndexedDB helpers
function loadSavedState() {
  try {
    const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY) || localStorage.getItem('snack_order_v7') || localStorage.getItem('snack_order_v6') || localStorage.getItem('snack_order');
    if (savedOrder) order = JSON.parse(savedOrder);

    const savedManual = localStorage.getItem(MANUAL_STORAGE_KEY) || localStorage.getItem('snack_manual_items_v7') || localStorage.getItem('snack_manual_items_v6') || localStorage.getItem('snack_manual_items');
    if (savedManual) manualItems = JSON.parse(savedManual);

    const savedSupplier = localStorage.getItem(ACTIVE_SUPPLIER_KEY) || localStorage.getItem('snack_active_supplier_v7');
    if (savedSupplier) activeSupplier = savedSupplier;

    const savedSort = localStorage.getItem(SORT_MODE_STORAGE_KEY);
    if (savedSort && SORT_MODES.some(m => m.id === savedSort)) {
      activeSortMode = savedSort;
    }

    // Load active store (sessionStorage takes priority for PIN-authenticated session)
    const sessionStore = sessionStorage.getItem('active_store');
    const sessionStoreName = sessionStore ? (STORE_KEY_TO_NAME[sessionStore] || (STORES.includes(sessionStore) ? sessionStore : null)) : null;
    if (sessionStoreName && STORES.includes(sessionStoreName)) {
      activeStore = sessionStoreName;
    } else {
      const savedStore = localStorage.getItem(ACTIVE_STORE_KEY);
      if (savedStore && STORES.includes(savedStore)) {
        activeStore = savedStore;
      }
    }

    // Load store favorites
    const savedStoreFavs = localStorage.getItem(STORE_FAVORITES_KEY);
    if (savedStoreFavs) {
      const parsed = JSON.parse(savedStoreFavs);
      STORES.forEach(s => {
        if (Array.isArray(parsed[s])) {
          storeFavorites[s] = new Set(parsed[s]);
        }
      });
    } else {
      // Migrate legacy single favorites list into activeStore
      const savedLegacyFavs = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (savedLegacyFavs) {
        const arr = JSON.parse(savedLegacyFavs);
        if (Array.isArray(arr) && arr.length > 0) {
          storeFavorites[activeStore] = new Set(arr);
        }
      }
    }

    // Load private favorites
    const savedPrivateFavs = localStorage.getItem(PRIVATE_FAVORITES_KEY);
    if (savedPrivateFavs) {
      const arr = JSON.parse(savedPrivateFavs);
      if (Array.isArray(arr)) privateFavorites = new Set(arr);
    }
  } catch (e) {
    console.error('Failed to load localStorage', e);
  }
}

function saveFavorites() {
  try {
    const serializable = {};
    STORES.forEach(s => {
      serializable[s] = Array.from(storeFavorites[s] || []);
    });
    localStorage.setItem(STORE_FAVORITES_KEY, JSON.stringify(serializable));
    localStorage.setItem(PRIVATE_FAVORITES_KEY, JSON.stringify(Array.from(privateFavorites)));

    // Also save legacy key for backward compatibility
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(storeFavorites[activeStore] || [])));

    // Save to IndexedDB as secondary persistent layer
    saveFavoritesToIndexedDB(serializable, Array.from(privateFavorites));
  } catch (e) {
    console.error('Failed to save favorites to localStorage', e);
  }
}

// IndexedDB secondary storage (resists browser cache wipes)
function initIndexedDB() {
  return new Promise((resolve) => {
    if (!window.indexedDB) return resolve(null);
    try {
      const request = indexedDB.open('SnackOrdersDB', 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('backup')) {
          db.createObjectStore('backup');
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = () => resolve(null);
    } catch (err) {
      resolve(null);
    }
  });
}

async function saveFavoritesToIndexedDB(storesObj, privateArr) {
  try {
    const db = await initIndexedDB();
    if (!db) return;
    const tx = db.transaction('backup', 'readwrite');
    const store = tx.objectStore('backup');
    store.put(storesObj, 'storeFavorites');
    store.put(privateArr, 'privateFavorites');
  } catch (e) {
    console.warn('IDB write notice', e);
  }
}

async function restoreFavoritesFromIndexedDB() {
  try {
    const db = await initIndexedDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction('backup', 'readonly');
      const store = tx.objectStore('backup');
      const reqStores = store.get('storeFavorites');
      const reqPriv = store.get('privateFavorites');
      tx.oncomplete = () => {
        let restored = false;
        if (reqStores.result) {
          STORES.forEach(s => {
            if (Array.isArray(reqStores.result[s]) && reqStores.result[s].length > 0) {
              if (!storeFavorites[s] || storeFavorites[s].size === 0) {
                storeFavorites[s] = new Set(reqStores.result[s]);
                restored = true;
              }
            }
          });
        }
        if (reqPriv.result && Array.isArray(reqPriv.result) && privateFavorites.size === 0) {
          privateFavorites = new Set(reqPriv.result);
          restored = true;
        }
        if (restored) {
          saveFavorites();
        }
        resolve(restored);
      };
      tx.onerror = () => resolve(false);
    });
  } catch (e) {
    return false;
  }
}

// Background sync to Google Apps Script endpoint
async function syncFavoriteToAppsScript(store, item, isFav) {
  const url = localStorage.getItem(APPS_SCRIPT_URL_KEY) || DEFAULT_APPS_SCRIPT_URL;
  if (!url || !url.startsWith('http')) return;

  try {
    const payload = {
      action: 'toggleFavorite',
      store: store,
      itemId: item.id,
      itemName: item.name,
      supplier: item.supplier,
      isFavorite: isFav
    };
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn('Apps Script background sync notice:', err);
  }
}

// Synchronize live favorites directly from Google Apps Script Web App
async function syncFavoritesFromAppsScript(notify = false) {
  const url = localStorage.getItem(APPS_SCRIPT_URL_KEY) || DEFAULT_APPS_SCRIPT_URL;
  if (!url || !url.startsWith('http')) return;

  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    if (data && data.status === 'ok' && data.stores) {
      let imported = 0;
      STORES.forEach(s => {
        if (Array.isArray(data.stores[s])) {
          const idSet = new Set();
          data.stores[s].forEach(itemObj => {
            if (!itemObj) return;
            const targetId = String(itemObj.id || '').trim();
            const targetName = String(itemObj.name || '').trim();

            // 1. Primary match: permanent ID (item_XXX or pringles_...)
            let found = null;
            if (targetId) {
              found = catalog.find(c => c.id && c.id.toLowerCase() === targetId.toLowerCase());
            }

            // 2. Fallback match: exact product name
            if (!found && targetName) {
              const cleanTargetName = targetName.toLowerCase();
              found = catalog.find(c => c.name && c.name.trim().toLowerCase() === cleanTargetName);
            }

            if (found) {
              idSet.add(found.id);
            } else if (targetId) {
              idSet.add(targetId);
            }
          });
          if (idSet.size > 0 || (storeFavorites[s] && storeFavorites[s].size > 0)) {
            storeFavorites[s] = idSet;
            imported += idSet.size;
          }
        }
      });
      saveFavorites();
      renderStorePills();
      updateFavBadge();
      if (Array.isArray(data.customItems)) {
        reconcileLiveCustomItems(data.customItems);
      }
      if (notify && imported > 0) {
        showToast(`⭐ Избранное синхронизировано (${imported} поз.)`);
      }
    } else if (data && data.status === 'ok' && Array.isArray(data.customItems)) {
      reconcileLiveCustomItems(data.customItems);
    }
  } catch (err) {
    console.warn('Apps Script GET sync notice:', err);
  }
}

// ==========================================
// USER-ADDED ITEMS DATABASE SYNC HELPERS
// ==========================================

function loadPendingUserList(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    const fresh = parsed.filter(entry => entry && (!entry.ts || (now - entry.ts) < PENDING_CUSTOM_TTL_MS));
    if (fresh.length !== parsed.length) {
      localStorage.setItem(storageKey, JSON.stringify(fresh));
    }
    return fresh;
  } catch (e) {
    return [];
  }
}

function savePendingUserList(storageKey, list) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(list || []));
  } catch (e) {
    console.warn('Pending custom storage error:', e);
  }
}

function isCustomItemMarkedDeleted(item, deletedList) {
  if (!item || !Array.isArray(deletedList) || deletedList.length === 0) return false;
  const itemId = String(item.id || '').trim().toLowerCase();
  const itemName = String(item.name || '').replace(/\s+/g, ' ').trim().toLowerCase();
  return deletedList.some(d => {
    const dId = String(d.id || '').trim().toLowerCase();
    const dName = String(d.name || '').replace(/\s+/g, ' ').trim().toLowerCase();
    return (dId && itemId && dId === itemId) || (dName && itemName && dName === itemName);
  });
}

function buildUserAddedCatalogItem({ id, name, subcat, pack, supplier, store }) {
  const cleanName = String(name || '').replace(/\s+/g, ' ').replace(/\s+,/g, ',').trim();
  const supplierId = slugify(supplier || 'snacks');
  const packInfo = parsePackInfo(cleanName, pack || '1', USER_ADDED_SHEET_NAME);
  const finalId = String(id || '').trim() || `user_${transliterate(cleanName + '_' + supplierId)}`;
  return normalizeCatalogItem({
    id: finalId,
    name: cleanName,
    brand: '',
    productType: String(subcat || '').trim() || USER_ADDED_SHEET_NAME,
    category: USER_ADDED_SHEET_NAME,
    supplier: supplierId,
    step: packInfo.step,
    unit: packInfo.unit,
    display_step: packInfo.display,
    isUserAdded: true,
    addedByStore: String(store || '').trim()
  });
}

function mergePendingUserItemsIntoList(items) {
  const pendingAdded = loadPendingUserList(USER_ADDED_CACHE_KEY);
  const pendingDeleted = loadPendingUserList(USER_DELETED_CACHE_KEY);

  const filtered = (Array.isArray(items) ? items : []).filter(it => {
    const isUser = Boolean(it && (it.isUserAdded || it.category === USER_ADDED_SHEET_NAME));
    if (isUser && isCustomItemMarkedDeleted(it, pendingDeleted)) {
      return false;
    }
    return true;
  });

  for (const entry of pendingAdded) {
    if (!entry || !entry.name) continue;
    if (isCustomItemMarkedDeleted(entry, pendingDeleted)) continue;
    const entryNameNorm = String(entry.name).replace(/\s+/g, ' ').trim().toLowerCase();
    const entrySup = entry.supplier || 'snacks';
    const exists = filtered.some(it =>
      it &&
      ((it.id && entry.id && it.id === entry.id) ||
       (String(it.name || '').replace(/\s+/g, ' ').trim().toLowerCase() === entryNameNorm && it.supplier === entrySup))
    );
    if (!exists) {
      filtered.push(buildUserAddedCatalogItem({
        id: entry.id,
        name: entry.name,
        subcat: entry.subcat,
        pack: entry.pack,
        supplier: entry.supplier,
        store: entry.store
      }));
    }
  }
  return filtered;
}

function ensureUserAddedCategoryOnSuppliers() {
  if (!Array.isArray(suppliers)) return;
  suppliers.forEach(sup => {
    if (!Array.isArray(sup.categories)) sup.categories = [];
    const hasItems = catalog.some(it => it.supplier === sup.id && it.category === USER_ADDED_SHEET_NAME);
    if (hasItems && !sup.categories.includes(USER_ADDED_SHEET_NAME)) {
      sup.categories.push(USER_ADDED_SHEET_NAME);
    }
  });
}

function reconcileLiveCustomItems(serverItems) {
  if (!Array.isArray(serverItems)) return;
  liveCustomItemsCache = serverItems;

  let pendingAdded = loadPendingUserList(USER_ADDED_CACHE_KEY);
  let pendingDeleted = loadPendingUserList(USER_DELETED_CACHE_KEY);

  const serverConverted = serverItems
    .filter(rawIt => rawIt && String(rawIt.name || '').trim())
    .map(rawIt => buildUserAddedCatalogItem({
      id: rawIt.id,
      name: rawIt.name,
      subcat: rawIt.subcat,
      pack: rawIt.pack,
      supplier: rawIt.supplier,
      store: rawIt.store
    }))
    .filter(it => !isCustomItemMarkedDeleted(it, pendingDeleted));

  // Clear pendingAdded items already confirmed on server
  pendingAdded = pendingAdded.filter(p => {
    const pName = String(p.name || '').replace(/\s+/g, ' ').trim().toLowerCase();
    const pSup = slugify(p.supplier || 'snacks');
    return !serverConverted.some(s =>
      (s.id && p.id && s.id === p.id) ||
      (String(s.name || '').replace(/\s+/g, ' ').trim().toLowerCase() === pName && s.supplier === pSup)
    );
  });
  savePendingUserList(USER_ADDED_CACHE_KEY, pendingAdded);

  // Clear pendingDeleted items confirmed absent from server
  pendingDeleted = pendingDeleted.filter(d => {
    const dId = String(d.id || '').trim().toLowerCase();
    const dName = String(d.name || '').replace(/\s+/g, ' ').trim().toLowerCase();
    return serverItems.some(s => {
      const sId = String(s.id || '').trim().toLowerCase();
      const sName = String(s.name || '').replace(/\s+/g, ' ').trim().toLowerCase();
      return (dId && sId === dId) || (dName && sName === dName);
    });
  });
  savePendingUserList(USER_DELETED_CACHE_KEY, pendingDeleted);

  // Replace user-added items in catalog with authoritative server list + remaining pendingAdded
  const nonUserCatalog = catalog.filter(it => !(it && (it.isUserAdded || it.category === USER_ADDED_SHEET_NAME)));
  const mergedUserItems = [...serverConverted];
  for (const p of pendingAdded) {
    mergedUserItems.push(buildUserAddedCatalogItem(p));
  }

  catalog = processCatalogWithPeanutOptimization([...nonUserCatalog, ...mergedUserItems]);
  ensureUserAddedCategoryOnSuppliers();

  try {
    localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(catalog));
    localStorage.setItem(SUPPLIERS_CACHE_KEY, JSON.stringify(suppliers));
  } catch (e) {
    console.warn('Cache save notice:', e);
  }

  renderSupplierNav();
  updateFavBadge();
  renderCategoryTabs();
  renderCatalog();
  updateOrderBar();
}

async function syncCustomItemToAppsScript(action, payloadObj) {
  const url = localStorage.getItem(APPS_SCRIPT_URL_KEY) || DEFAULT_APPS_SCRIPT_URL;
  if (!url || !url.startsWith('http')) return false;

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action,
        ...payloadObj
      })
    });
    return true;
  } catch (err) {
    console.warn('Apps Script custom item sync notice:', err);
    return false;
  }
}

function findCatalogDuplicate(name, targetSupplierId) {
  const norm = String(name || '').replace(/\s+/g, ' ').trim().toLowerCase();
  if (!norm) return null;

  const matchesItem = (it) => {
    if (!it || !it.name) return false;
    const rawNorm = String(it.name).replace(/\s+/g, ' ').trim().toLowerCase();
    if (rawNorm === norm) return true;
    const cleanNorm = cleanOrderPositionName(it.name, it.category).replace(/\s+/g, ' ').trim().toLowerCase();
    return cleanNorm === norm;
  };

  return catalog.find(it => it.supplier === targetSupplierId && matchesItem(it)) ||
         catalog.find(it => matchesItem(it)) ||
         null;
}

// Store Selection & Header Display
function switchActiveStore(storeName) {
  if (!STORES.includes(storeName)) return;
  activeStore = storeName;
  localStorage.setItem(ACTIVE_STORE_KEY, storeName);
  renderStoreHeader();
  updateFavBadge();
  renderCategoryTabs();
  renderCatalog();
  showToast(`🏪 Магазин: ${storeName}`);
}

function renderStoreHeader() {
  const storeKey = STORE_NAME_TO_KEY[activeStore] || 'bitca';
  const storeInfo = STORE_MAP[storeKey] || STORE_MAP.bitca;

  const badge = document.getElementById('activeStoreBadge');
  const nameEl = document.getElementById('activeStoreName');
  const favBadge = document.getElementById('activeStoreFavBadge');

  if (badge) {
    badge.className = `active-store-badge ${storeInfo.badgeClass}`;
  }
  if (nameEl) {
    nameEl.textContent = storeInfo.name;
  }
  if (favBadge) {
    const count = storeFavorites[activeStore] ? storeFavorites[activeStore].size : 0;
    favBadge.textContent = `⭐ ${count}`;
    favBadge.title = `Избранное магазина ${storeInfo.name} (${count} поз.)`;
  }
}

function renderStorePills() {
  renderStoreHeader();
}

function selectStorePill(storeName) {
  if (favFilterMode === 'private') {
    favFilterMode = 'none';
  }
  switchActiveStore(storeName);
}

function selectPrivatePill() {
  if (favFilterMode === 'private') {
    favFilterMode = 'none';
    showToast(`Выход из личного избранного (показан магазин ${activeStore})`);
  } else {
    favFilterMode = 'private';
    showToast(`👤 Открыто личное избранное (${privateFavorites.size} поз.)`);
  }
  renderStoreHeader();
  updateFavBadge();
  renderCategoryTabs();
  renderCatalog();
}

// ==========================================
// STORE GATE & PIN VERIFICATION SYSTEM
// ==========================================

function checkActiveStoreSession() {
  const sessionStore = sessionStorage.getItem('active_store');
  if (sessionStore) {
    const storeName = STORE_KEY_TO_NAME[sessionStore] || (STORES.includes(sessionStore) ? sessionStore : null);
    if (storeName && STORES.includes(storeName)) {
      activeStore = storeName;
      hideStoreGateModal();
      return true;
    }
  }
  showStoreGateModal();
  return false;
}

function showStoreGateModal() {
  const modal = document.getElementById('storeGateModal');
  if (!modal) return;
  modal.classList.add('active');
  backToStoreSelection();
}

function hideStoreGateModal() {
  const modal = document.getElementById('storeGateModal');
  if (!modal) return;
  modal.classList.remove('active');
}

function selectGateStore(storeKey) {
  pendingStoreKey = storeKey;
  const storeInfo = STORE_MAP[storeKey] || STORE_MAP.bitca;

  const stepStores = document.getElementById('gateStepStores');
  const stepPin = document.getElementById('gateStepPin');
  if (stepStores) stepStores.style.display = 'none';
  if (stepPin) stepPin.style.display = 'block';

  const badge = document.getElementById('gateActiveBadge');
  const nameEl = document.getElementById('gateActiveStoreName');
  if (badge) {
    badge.className = `gate-active-badge ${storeInfo.badgeClass}`;
  }
  if (nameEl) {
    nameEl.textContent = storeInfo.name;
  }

  const pinInput = document.getElementById('gatePinInput');
  const errEl = document.getElementById('gatePinError');
  const loaderEl = document.getElementById('gatePinLoader');
  if (errEl) errEl.style.display = 'none';
  if (loaderEl) loaderEl.style.display = 'none';
  if (pinInput) {
    pinInput.disabled = false;
    pinInput.value = '';
    setTimeout(() => pinInput.focus(), 80);
  }
  const submitBtn = document.getElementById('btnGatePinSubmit');
  if (submitBtn) submitBtn.disabled = false;
  const backBtn = document.getElementById('btnGateBack');
  if (backBtn) backBtn.disabled = false;
}

function backToStoreSelection() {
  pendingStoreKey = null;
  const stepStores = document.getElementById('gateStepStores');
  const stepPin = document.getElementById('gateStepPin');
  if (stepStores) stepStores.style.display = 'block';
  if (stepPin) stepPin.style.display = 'none';

  const pinInput = document.getElementById('gatePinInput');
  const errEl = document.getElementById('gatePinError');
  const loaderEl = document.getElementById('gatePinLoader');
  if (errEl) errEl.style.display = 'none';
  if (loaderEl) loaderEl.style.display = 'none';
  if (pinInput) {
    pinInput.disabled = false;
    pinInput.value = '';
  }
  const submitBtn = document.getElementById('btnGatePinSubmit');
  if (submitBtn) submitBtn.disabled = false;
  const backBtn = document.getElementById('btnGateBack');
  if (backBtn) backBtn.disabled = false;
}

async function handleGatePinSubmit(e) {
  if (e) e.preventDefault();
  if (isCheckingPin || !pendingStoreKey) return;

  const pinInput = document.getElementById('gatePinInput');
  if (!pinInput) return;
  const pin = pinInput.value.replace(/\D/g, '').slice(0, 4);

  if (pin.length !== 4) {
    showGatePinError('Введите 4 цифры PIN-кода');
    return;
  }

  await verifyStorePin(pendingStoreKey, pin);
}

async function verifyStorePin(storeKey, pin) {
  if (isCheckingPin) return;
  isCheckingPin = true;

  const pinInput = document.getElementById('gatePinInput');
  const submitBtn = document.getElementById('btnGatePinSubmit');
  const backBtn = document.getElementById('btnGateBack');
  const loaderEl = document.getElementById('gatePinLoader');
  const errEl = document.getElementById('gatePinError');

  if (errEl) errEl.style.display = 'none';
  if (loaderEl) loaderEl.style.display = 'flex';
  if (pinInput) pinInput.disabled = true;
  if (submitBtn) submitBtn.disabled = true;
  if (backBtn) backBtn.disabled = true;

  try {
    let ok = false;
    let errorMessage = 'Неверный PIN-код';

    const activeUrl = (PIN_CHECK_URL && PIN_CHECK_URL.trim())
      ? PIN_CHECK_URL.trim()
      : (localStorage.getItem(APPS_SCRIPT_URL_KEY) || DEFAULT_APPS_SCRIPT_URL);

    if (!activeUrl) {
      throw new Error('Укажите URL скрипта в константе PIN_CHECK_URL');
    }

    const sep = activeUrl.includes('?') ? '&' : '?';
    const requestUrl = `${activeUrl}${sep}store=${encodeURIComponent(storeKey)}&pin=${encodeURIComponent(pin)}`;

    const res = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Ошибка сети: статус ${res.status}`);
    }

    const data = await res.json();

    if (data && data.ok === true) {
      ok = true;
    } else {
      ok = false;
      if (data && data.error) errorMessage = data.error;
    }

    if (ok) {
      // 1. Save store key to sessionStorage
      sessionStorage.setItem('active_store', storeKey);

      // 2. Set activeStore name
      const storeName = STORE_KEY_TO_NAME[storeKey] || storeKey;
      activeStore = storeName;
      localStorage.setItem(ACTIVE_STORE_KEY, storeName);

      // 3. Close modal gate
      hideStoreGateModal();
      showToast(`🏪 Магазин: ${storeName}`);

      // 4. Launch initialization or update UI
      if (!isAppInitialized) {
        isAppInitialized = true;
        await initApp();
      } else {
        renderStoreHeader();
        updateFavBadge();
        renderCategoryTabs();
        renderCatalog();
        syncFavoritesFromAppsScript(false).catch(() => { });
      }
    } else {
      showGatePinError(errorMessage);
      resetGatePinInput();
    }
  } catch (err) {
    showGatePinError(err.message || 'Ошибка сети при проверке PIN-кода');
    resetGatePinInput();
  } finally {
    isCheckingPin = false;
    if (loaderEl) loaderEl.style.display = 'none';
    if (pinInput) pinInput.disabled = false;
    if (submitBtn) submitBtn.disabled = false;
    if (backBtn) backBtn.disabled = false;
  }
}

function showGatePinError(msg) {
  const errEl = document.getElementById('gatePinError');
  const pinInput = document.getElementById('gatePinInput');
  if (errEl) {
    errEl.textContent = msg;
    errEl.style.display = 'block';
  }
  if (pinInput) {
    pinInput.classList.remove('shake');
    void pinInput.offsetWidth; // Trigger reflow for CSS animation
    pinInput.classList.add('shake');
  }
}

function resetGatePinInput() {
  const pinInput = document.getElementById('gatePinInput');
  if (pinInput) {
    pinInput.value = '';
    pinInput.disabled = false;
    setTimeout(() => {
      pinInput.focus();
    }, 60);
  }
}

function handleChangeStore() {
  sessionStorage.removeItem('active_store');
  showStoreGateModal();
}

function setupGateEventListeners() {
  const pinInput = document.getElementById('gatePinInput');
  if (pinInput) {
    pinInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (e.target.value.length === 4 && !isCheckingPin && pendingStoreKey) {
        verifyStorePin(pendingStoreKey, e.target.value);
      }
    });
  }

  // Prevent closing gate via Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const gate = document.getElementById('storeGateModal');
      if (gate && gate.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  }, true);
}

// Favorites checkers
function isItemStoreFav(id, store = activeStore) {
  return !!(storeFavorites[store] && storeFavorites[store].has(id));
}

function isItemPrivateFav(id) {
  return privateFavorites.has(id);
}

function isItemFavForFilter(id) {
  if (favFilterMode === 'store') return isItemStoreFav(id);
  if (favFilterMode === 'private') return isItemPrivateFav(id);
  return true;
}

// Pointer & Long-Press Handlers for Favorites
let favPressTimer = null;
let favGestureTriggered = false;
let favPendingCatalogRerender = false;
let favLastTriggeredAt = 0;
let favActiveBtnEl = null;
let favStartX = 0;
let favStartY = 0;

function clearFavPressTimer() {
  if (favPressTimer) {
    clearTimeout(favPressTimer);
    favPressTimer = null;
  }
  if (favActiveBtnEl) {
    favActiveBtnEl.classList.remove('is-pressing');
    favActiveBtnEl = null;
  }
}

function handleFavPointerDown(id, event) {
  // Only accept primary pointer (left mouse button or touch/pen)
  if (event.button !== undefined && event.button !== 0) return;
  // If a gesture has already triggered and finger is still held down, do not start another!
  if (favGestureTriggered) return;

  clearFavPressTimer();
  favPendingCatalogRerender = false;
  favStartX = event.clientX;
  favStartY = event.clientY;

  const btn = (event && event.currentTarget) || (event && event.target && event.target.closest('.btn-fav'));
  favActiveBtnEl = btn;
  if (btn) {
    btn.classList.add('is-pressing');
  }

  favPressTimer = setTimeout(() => {
    // Strictly prevent repeated execution within one continuous press
    if (favGestureTriggered) return;
    favGestureTriggered = true;
    favLastTriggeredAt = Date.now();

    const activeEl = favActiveBtnEl;
    if (activeEl) {
      activeEl.classList.remove('is-pressing');
      activeEl.classList.remove('is-triggered');
      void activeEl.offsetWidth; // trigger reflow for smooth animation
      activeEl.classList.add('is-triggered');
      setTimeout(() => {
        if (activeEl) activeEl.classList.remove('is-triggered');
      }, 500);
    }
    favActiveBtnEl = null;
    favPressTimer = null;

    if (navigator.vibrate) {
      try {
        // Clear double-buzz tactile feedback
        navigator.vibrate([45, 30, 45]);
      } catch (_) {
        try { navigator.vibrate(50); } catch (_) { }
      }
    }

    // Toggle private favorite once; defer DOM wipe until pointer is released
    togglePrivateFavorite(id, event, true);
  }, 420);
}

function handleFavPointerMove(event) {
  if (!favPressTimer) return;
  const diffX = Math.abs(event.clientX - favStartX);
  const diffY = Math.abs(event.clientY - favStartY);
  // Cancel long-press if finger moved beyond slop threshold (user scrolling)
  if (diffX > 14 || diffY > 14) {
    clearFavPressTimer();
  }
}

function handleFavPointerUp(id, event) {
  clearFavPressTimer();

  if (favGestureTriggered) {
    // Pointer released after long-press completed
    if (favPendingCatalogRerender) {
      favPendingCatalogRerender = false;
      setTimeout(() => {
        renderCategoryTabs();
        renderCatalog();
      }, 60);
    }
    // Keep gesture flag active briefly to swallow subsequent synthetic click
    setTimeout(() => {
      favGestureTriggered = false;
    }, 400);
  }
}

function handleFavPointerCancel(event) {
  clearFavPressTimer();
  if (favPendingCatalogRerender) {
    favPendingCatalogRerender = false;
    setTimeout(() => {
      renderCategoryTabs();
      renderCatalog();
    }, 60);
  }
  setTimeout(() => {
    favGestureTriggered = false;
  }, 400);
}

function handleFavClick(id, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  // Swallow click if long-press gesture just fired
  if (favGestureTriggered || (Date.now() - favLastTriggeredAt < 650)) {
    favGestureTriggered = false;
    return;
  }
  toggleStoreFavorite(id, event);
}

function handleFavContextMenu(id, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  // Swallow synthetic mobile context menu after long-press hold
  if (favGestureTriggered || (Date.now() - favLastTriggeredAt < 900)) {
    return;
  }
  // Desktop mouse right click toggles private favorite
  togglePrivateFavorite(id, event, false);
}

function toggleStoreFavorite(id, event) {
  if (event) event.stopPropagation();
  const item = catalog.find(i => i.id === id);
  if (!item) return;

  if (!storeFavorites[activeStore]) {
    storeFavorites[activeStore] = new Set();
  }

  const isFav = storeFavorites[activeStore].has(id);
  if (isFav) {
    storeFavorites[activeStore].delete(id);
    showToast(`Удалено из [${activeStore}]: ${item.name}`);
    syncFavoriteToAppsScript(activeStore, item, false);
  } else {
    storeFavorites[activeStore].add(id);
    showToast(`⭐ [${activeStore}] Добавлено в избранное: ${item.name}`);
    syncFavoriteToAppsScript(activeStore, item, true);
  }

  saveFavorites();
  renderStorePills();
  updateFavBadge();

  if (favFilterMode !== 'none') {
    renderCategoryTabs();
    renderCatalog();
  } else {
    updateCardFavState(id);
    renderCategoryTabs();
  }
}

function togglePrivateFavorite(id, event, deferRerender = false) {
  if (event) event.stopPropagation();
  const item = catalog.find(i => i.id === id);
  if (!item) return;

  const isFav = privateFavorites.has(id);
  if (isFav) {
    privateFavorites.delete(id);
    showToast(`👤 Удалено из личного: ${item.name}`);
  } else {
    privateFavorites.add(id);
    showToast(`👤 Добавлено в личное избранное: ${item.name}`);
  }

  saveFavorites();
  renderStorePills();
  updateFavBadge();

  if (favFilterMode !== 'none') {
    if (deferRerender) {
      favPendingCatalogRerender = true;
      updateCardFavState(id);
    } else {
      renderCategoryTabs();
      renderCatalog();
    }
  } else {
    updateCardFavState(id);
    renderCategoryTabs();
  }
}

// Backward compatible aliases
function toggleFavorite(id, event) {
  handleFavClick(id, event);
}

// Favorite Selection Modal Sheet Logic (Optional Settings Modal)
let currentFavModalItemId = null;

function openFavModal(id, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const item = catalog.find(i => i.id === id);
  if (!item) return;

  currentFavModalItemId = id;

  const modal = document.getElementById('favModal');
  const nameEl = document.getElementById('favModalItemName');
  const storeTitleEl = document.getElementById('favOptionStoreTitle');
  const checkStore = document.getElementById('favCheckStore');
  const checkPrivate = document.getElementById('favCheckPrivate');
  const cardStore = document.getElementById('favCardStore');
  const cardPrivate = document.getElementById('favCardPrivate');

  if (nameEl) nameEl.textContent = item.name;
  if (storeTitleEl) storeTitleEl.textContent = `Избранное магазина [${activeStore}]`;

  const isStore = isItemStoreFav(id);
  const isPrivate = isItemPrivateFav(id);

  if (checkStore) checkStore.checked = isStore;
  if (checkPrivate) checkPrivate.checked = isPrivate;

  if (cardStore) cardStore.classList.toggle('checked', isStore);
  if (cardPrivate) cardPrivate.classList.toggle('checked-private', isPrivate);

  if (modal) modal.classList.add('active');
}

function closeFavModal() {
  const modal = document.getElementById('favModal');
  if (modal) modal.classList.remove('active');
  currentFavModalItemId = null;
}

function toggleFavModalCheck(type) {
  if (!currentFavModalItemId) return;
  const item = catalog.find(i => i.id === currentFavModalItemId);
  if (!item) return;

  if (type === 'store') {
    toggleStoreFavorite(item.id);
  } else if (type === 'private') {
    togglePrivateFavorite(item.id);
  }

  const checkStore = document.getElementById('favCheckStore');
  const checkPrivate = document.getElementById('favCheckPrivate');
  const cardStore = document.getElementById('favCardStore');
  const cardPrivate = document.getElementById('favCardPrivate');

  const isStore = isItemStoreFav(item.id);
  const isPrivate = isItemPrivateFav(item.id);

  if (checkStore) checkStore.checked = isStore;
  if (checkPrivate) checkPrivate.checked = isPrivate;
  if (cardStore) cardStore.classList.toggle('checked', isStore);
  if (cardPrivate) cardPrivate.classList.toggle('checked-private', isPrivate);
}

function updateCardFavState(id) {
  const cards = document.querySelectorAll(`.product-card[data-id="${id}"]`);
  if (!cards || !cards.length) return;

  const isStore = isItemStoreFav(id);
  const isPrivate = isItemPrivateFav(id);

  cards.forEach(card => {
    const btn = card.querySelector('.btn-fav');
    if (!btn) return;

    btn.classList.remove('is-fav', 'is-private-fav', 'is-both-fav');

    if (isStore && isPrivate) {
      btn.classList.add('is-both-fav');
      btn.innerHTML = ICONS.starSplit;
      btn.title = `В избранном [${activeStore}] (золото) и в личном (синий). Клик: магазин, удержание: личное`;
      btn.setAttribute('aria-label', `В избранном ${activeStore} и в личном`);
    } else if (isStore) {
      btn.classList.add('is-fav');
      btn.innerHTML = ICONS.starFilled;
      btn.title = `В избранном магазина [${activeStore}]. Клик: убрать, удержание: в личное`;
      btn.setAttribute('aria-label', `В избранном ${activeStore}`);
    } else if (isPrivate) {
      btn.classList.add('is-private-fav');
      btn.innerHTML = ICONS.starBlue;
      btn.title = `В личном избранном. Клик: добавить в [${activeStore}], удержание: убрать из личного`;
      btn.setAttribute('aria-label', `В личном избранном`);
    } else {
      btn.innerHTML = ICONS.starOutline;
      btn.title = `Добавить в избранное. Клик: [${activeStore}], удержание: в личное`;
      btn.setAttribute('aria-label', `Добавить в избранное`);
    }
  });
}

function toggleFavoritesFilter(forceState) {
  if (typeof forceState === 'string') {
    favFilterMode = forceState;
  } else if (typeof forceState === 'boolean') {
    favFilterMode = forceState ? 'store' : 'none';
  } else {
    if (favFilterMode === 'none') {
      favFilterMode = 'store';
    } else if (favFilterMode === 'store' && privateFavorites.size > 0) {
      favFilterMode = 'private';
    } else {
      favFilterMode = 'none';
    }
  }
  updateFavBadge();
  renderCategoryTabs();
  renderCatalog();
}

function updateFavBadge() {
  const badge = document.getElementById('favFilterBadge');
  const btn = document.getElementById('btnFavFilter');
  if (!btn) return;

  const currentStoreSet = storeFavorites[activeStore] || new Set();
  const storeCount = catalog.filter(i => i.supplier === activeSupplier && currentStoreSet.has(i.id)).length;
  const privateCount = catalog.filter(i => i.supplier === activeSupplier && privateFavorites.has(i.id)).length;

  btn.classList.remove('active', 'active-store', 'active-private');

  if (favFilterMode === 'store') {
    btn.classList.add('active', 'active-store');
    btn.title = `Фильтр [${activeStore}] (${storeCount} поз.). Нажмите для отключения`;
    if (badge) {
      badge.textContent = storeCount;
      badge.style.display = storeCount > 0 ? 'inline-block' : 'none';
      badge.style.background = 'var(--accent-amber)';
      badge.style.color = '#0f172a';
    }
  } else if (favFilterMode === 'private') {
    btn.classList.add('active', 'active-private');
    btn.title = `Фильтр [Личное] (${privateCount} поз.). Нажмите для отключения`;
    if (badge) {
      badge.textContent = privateCount;
      badge.style.display = privateCount > 0 ? 'inline-block' : 'none';
      badge.style.background = '#38bdf8';
      badge.style.color = '#0f172a';
    }
  } else {
    btn.title = storeCount > 0
      ? `Показать только избранные [${activeStore}] (${storeCount} поз.)`
      : `Показать только избранные [${activeStore}] (пока нет в этом разделе)`;
    if (badge) {
      badge.textContent = storeCount;
      badge.style.display = storeCount > 0 ? 'inline-block' : 'none';
      badge.style.background = 'var(--accent-amber)';
      badge.style.color = '#0f172a';
    }
  }
}

// Export / Import / Backup Helpers
function exportFavoritesJson() {
  const backup = {
    version: 2,
    exportDate: new Date().toISOString(),
    stores: {},
    private: Array.from(privateFavorites)
  };
  STORES.forEach(s => {
    backup.stores[s] = Array.from(storeFavorites[s] || []);
  });

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `snack_favorites_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📥 Бэкап избранного сохранен!');
}

function copyFavoritesBackupText() {
  const backup = {
    version: 2,
    stores: {},
    private: Array.from(privateFavorites)
  };
  STORES.forEach(s => {
    backup.stores[s] = Array.from(storeFavorites[s] || []);
  });

  const text = JSON.stringify(backup);
  copyTextToClipboard(text).then((copied) => {
    if (copied) {
      showToast('📋 Код бэкапа скопирован в буфер!');
    } else {
      prompt('Скопируйте код бэкапа вручную:', text);
    }
  });
}

function promptImportFavoritesText() {
  const input = prompt('Вставьте код бэкапа избранного (JSON):');
  if (!input || !input.trim()) return;
  try {
    const parsed = JSON.parse(input.trim());
    applyImportedFavorites(parsed);
  } catch (err) {
    alert('Ошибка формата кода бэкапа: ' + err.message);
  }
}

function importFavoritesJsonFile(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      applyImportedFavorites(parsed);
    } catch (err) {
      alert('Ошибка чтения файла бэкапа: ' + err.message);
    } finally {
      event.target.value = '';
    }
  };
  reader.readAsText(file);
}

function applyImportedFavorites(data) {
  if (!data) return;
  let importedCount = 0;

  const resolveFavId = (val) => {
    if (!val) return '';
    const clean = String(typeof val === 'object' ? (val.id || val.name || '') : val).trim();
    if (!clean) return '';
    // 1. Primary match: by constant ID
    const foundById = catalog.find(c => c.id && c.id.toLowerCase() === clean.toLowerCase());
    if (foundById) return foundById.id;
    // 2. Fallback match: by exact Name
    const foundByName = catalog.find(c => c.name && c.name.trim().toLowerCase() === clean.toLowerCase());
    if (foundByName) return foundByName.id;
    return clean;
  };

  if (data.stores) {
    STORES.forEach(s => {
      if (Array.isArray(data.stores[s])) {
        const idSet = new Set();
        data.stores[s].forEach(val => {
          const resolved = resolveFavId(val);
          if (resolved) idSet.add(resolved);
        });
        storeFavorites[s] = idSet;
        importedCount += idSet.size;
      }
    });
  } else if (Array.isArray(data)) {
    const idSet = new Set();
    data.forEach(val => {
      const resolved = resolveFavId(val);
      if (resolved) idSet.add(resolved);
    });
    storeFavorites[activeStore] = idSet;
    importedCount = idSet.size;
  }

  if (Array.isArray(data.private)) {
    const privSet = new Set();
    data.private.forEach(val => {
      const resolved = resolveFavId(val);
      if (resolved) privSet.add(resolved);
    });
    privateFavorites = privSet;
  }

  saveFavorites();
  renderStorePills();
  updateFavBadge();
  renderCategoryTabs();
  renderCatalog();
  showToast(`✅ Избранное успешно восстановлено (${importedCount} позиций)!`);
}

function shareStoreSetupLink() {
  const storeItems = Array.from(storeFavorites[activeStore] || []);
  const payload = {
    s: activeStore,
    f: storeItems
  };
  const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  const shareUrl = `${window.location.origin}${window.location.pathname}#fav_setup=${b64}`;

  copyTextToClipboard(shareUrl).then((copied) => {
    if (copied) {
      showToast(`🔗 Ссылка для точки [${activeStore}] скопирована! Отправьте её продавцам.`);
    } else {
      prompt(`Ссылка для настройки магазина [${activeStore}]:`, shareUrl);
    }
  });
}

function checkUrlHashConfig() {
  try {
    const hash = window.location.hash;
    if (!hash) return;

    if (hash.startsWith('#store=')) {
      const storeName = decodeURIComponent(hash.slice(7));
      if (STORES.includes(storeName)) {
        activeStore = storeName;
        localStorage.setItem(ACTIVE_STORE_KEY, storeName);
      }
    } else if (hash.startsWith('#fav_setup=')) {
      const raw = hash.slice(11);
      const jsonStr = decodeURIComponent(escape(atob(raw)));
      const obj = JSON.parse(jsonStr);
      if (obj && obj.s && STORES.includes(obj.s)) {
        activeStore = obj.s;
        localStorage.setItem(ACTIVE_STORE_KEY, obj.s);
        if (Array.isArray(obj.f)) {
          storeFavorites[obj.s] = new Set(obj.f);
          saveFavorites();
        }
        showToast(`✅ Настройки магазина [${obj.s}] успешно применены по ссылке!`);
      }
    }
  } catch (err) {
    console.warn('URL hash config parse error:', err);
  }
}

function saveState() {
  try {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    localStorage.setItem(MANUAL_STORAGE_KEY, JSON.stringify(manualItems));
    localStorage.setItem(ACTIVE_SUPPLIER_KEY, activeSupplier);
    localStorage.setItem(SORT_MODE_STORAGE_KEY, activeSortMode);
  } catch (e) {
    console.error('Failed to save localStorage', e);
  }
}

// Load Catalog from cache or fallback to embedded DEFAULT_CATALOG
async function loadCatalog() {
  // Never wipe or clear local caches - retain all offline and synced data
  const cachedCatalog = localStorage.getItem(CATALOG_CACHE_KEY) ||
    localStorage.getItem('snack_catalog_cache_v11') ||
    localStorage.getItem('snack_catalog_cache_v10') ||
    localStorage.getItem('snack_catalog_cache_v9') ||
    localStorage.getItem('snack_catalog_cache_v8') ||
    localStorage.getItem('snack_catalog_cache');

  const cachedSuppliers = localStorage.getItem(SUPPLIERS_CACHE_KEY) ||
    localStorage.getItem('snack_suppliers_cache_v9') ||
    localStorage.getItem('snack_suppliers_cache_v8') ||
    localStorage.getItem('snack_suppliers_cache');

  let validCache = false;
  if (cachedCatalog) {
    try {
      const parsed = JSON.parse(cachedCatalog);
      if (Array.isArray(parsed) && parsed.length >= 350 && parsed[0].supplier !== undefined) {
        catalog = parsed;
        if (cachedSuppliers) {
          suppliers = sortSuppliersList(JSON.parse(cachedSuppliers));
        }
        validCache = true;
      }
    } catch (e) {
      console.warn('Cache parse error', e);
    }
  }

  if (validCache) {
    catalog = processCatalogWithPeanutOptimization(mergePendingUserItemsIntoList(catalog).map(normalizeCatalogItem));
  } else {
    catalog = processCatalogWithPeanutOptimization(mergePendingUserItemsIntoList(DEFAULT_CATALOG).map(normalizeCatalogItem));
    suppliers = [...DEFAULT_SUPPLIERS];
  }

  // Merge any order items that point to merged alias IDs
  if (Array.isArray(catalog) && typeof order === 'object' && order !== null) {
    for (const it of catalog) {
      if (it.aliases && Array.isArray(it.aliases)) {
        for (const aId of it.aliases) {
          if (order[aId]) {
            order[it.id] = (order[it.id] || 0) + order[aId];
            delete order[aId];
          }
        }
      }
    }
  }
}

// Strip placeholder brand values ("Без бренда", "-", etc.)
function cleanBrandValue(val) {
  const s = String(val || '').trim();
  if (!s) return '';
  const l = s.toLowerCase();
  if (l === 'без бренда' || l === 'без_бренда' || l === 'нет' || l === '-' || l === '—' || l === 'none' || l === 'n/a') {
    return '';
  }
  return s;
}

// Infer product type ("Вид продукта") when sheet column is absent or empty
function detectProductType(name, category = '') {
  const n = String(name || '').toLowerCase();
  const c = String(category || '').toLowerCase();
  if (c === 'соусы' || n.startsWith('соус')) return 'Соус';
  if (c === 'расходники') return 'Расходники';
  if (c === 'контейнеры') return 'Контейнеры';
  if (c === 'сырные сухие') {
    if (n.includes('бочон')) return 'Сырные бочонки';
    if (n.includes('шарик')) return 'Сырные шарики';
  }
  if (c === 'сыры' || n.includes('санккино') || n.includes('фермерский') || n.includes('дондуковский')) {
    if (n.includes('жарен')) return 'Сыр жареный';
    return 'Сыр';
  }
  if (c === 'орехи') {
    if (n.includes('ореховая смесь')) return 'Ореховая смесь';
    if (n.includes('арахис')) return 'Арахис';
    if (n.includes('фисташ')) return 'Фисташки';
    if (n.includes('кешью')) return 'Кешью';
    if (n.includes('миндал')) return 'Миндаль';
    if (n.includes('кукуруз')) return 'Кукуруза жареная';
  }
  if (c === 'начос и лавашики') {
    if (n.includes('лаваш')) return 'Чипсы из лаваша';
    if (n.includes('начос')) return 'Начос';
  }
  if (c === 'мясные' || c === 'мясные завод') {
    if (n.includes('чипсы')) return 'Мясные чипсы';
    if (n.includes('кнут')) return 'Кнуты';
    if (n.includes('колбаск')) return 'Колбаски';
    if (n.includes('ушк') || n.includes('ухо')) return 'Свиные ушки';
    if (n.includes('мясо')) return 'Мясо сушеное';
  }
  if (c === 'рыбные') {
    if (n.includes('кальмар') || n.includes('мясо краба') || n.includes('вкусовые пяточки')) return 'Кальмар';
    if (n.includes('икрян')) return 'Икряные чипсы';
    if (n.includes('икра')) return 'Икра';
    if (n.includes('палочк')) return 'Рыбные палочки';
    if (n.includes('паутинк')) return 'Паутинка';
    if (n.includes('слайс')) return 'Слайсы';
    if (n.includes('камбал')) return 'Камбала';
    if (n.includes('кревет')) return 'Креветка';
    if (n.includes('краб')) return 'Краб';
    if (n.includes('минта') || n.includes('лизун') || n.includes('треск')) return 'Минтай';
    if (n.includes('тунец') || n.includes('тунца')) return 'Тунец';
    if (n.includes('полосатик')) return 'Полосатик';
    if (n.includes('анчоус')) return 'Анчоус';
    if (n.includes('лакедр')) return 'Лакедра';
    if (n.includes('угор')) return 'Угорь';
    if (n.includes('таранк')) return 'Таранка';
    if (n.includes('сёмг') || n.includes('семг')) return 'Семга';
    if (n.includes('судак')) return 'Судак';
  }
  if (n.includes('корнелли') || n.includes('сухари')) {
    return n.includes('кукуруз') ? 'Сухари кукурузные' : 'Сухари';
  }
  if (n.includes('гренки') || n.includes('ведро юбилейные')) return 'Гренки';
  if (n.includes('семечки')) return 'Семечки';
  if (n.includes('чипсы') || n.includes('картошка') || n.includes('pringles') || n.includes('принглс')) return 'Чипсы';
  if (n.includes('морская капуста')) return 'Морская капуста';
  return category || '';
}

// Normalize catalog item names, brands, productType, and boxed snack units
function normalizeCatalogItem(it) {
  if (!it || typeof it !== 'object') return it;
  let cleanName = String(it.name || '').replace(/\s+/g, ' ').replace(/\s+,/g, ',').trim();
  cleanName = cleanName.replace(/Гаукомоле/gi, 'Гуакамоле');
  const cleanBrand = cleanBrandValue(it.brand) || detectBrandFromName(cleanName);
  const lowerClean = cleanName.toLowerCase();
  let productType = String(it.productType || '').trim() || detectProductType(cleanName, it.category);
  if (String(it.category || '').toLowerCase() === 'рыбные') {
    if (lowerClean.includes('мясо краба') || lowerClean.includes('вкусовые пяточки') || lowerClean.includes('пяточки кальмара')) {
      productType = 'Кальмар';
    } else if (!/^икра\s+/i.test(lowerClean) && (lowerClean.includes('лизун') || lowerClean.includes('минта') || lowerClean.includes('треск'))) {
      productType = 'Минтай';
    }
  }

  let step = it.step;
  let unit = it.unit;
  let displayStep = it.display_step;
  const nameLower = cleanName.toLowerCase();
  if (
    !it.isUserAdded &&
    it.category !== USER_ADDED_SHEET_NAME &&
    it.supplier === 'snacks' &&
    unit === 'шт' &&
    (Number(step) === 1 || !step) &&
    (/,\s*кор(?:\s|$)/i.test(nameLower) || /\*\s*\d+\s*(?:шт\.?)?(?:\s|,|$)/i.test(nameLower))
  ) {
    step = 1.0;
    unit = 'кор';
    displayStep = 'кратность 1 кор';
  }

  return {
    ...it,
    name: cleanName,
    brand: cleanBrand,
    productType,
    step,
    unit,
    display_step: displayStep
  };
}

// Helper to get supplier metadata by ID
function getSupplierById(id) {
  return suppliers.find(s => s.id === id) || KNOWN_SUPPLIER_META[id] || suppliers[0] || { id, name: id, shortName: id, icon: '📦' };
}

// Parse packaging / multiplicity information from cell value
function parsePackInfo(name, packStr, cat) {
  const p = packStr !== undefined && packStr !== null ? String(packStr).trim() : '';
  const nameLower = name.toLowerCase();

  // 1. Bucket check: ведро Юбилейные -> 1 шт
  if (cat !== USER_ADDED_SHEET_NAME && nameLower.includes('ведро')) {
    return { step: 1.0, unit: 'шт', display: 'кратность 1 шт' };
  }

  // 2. 500 г -> 0.5 кг
  if (p === '500 г' || p === '500г') {
    return { step: 0.5, unit: 'кг', display: 'кратность 0.5 кг' };
  }

  // 3. Weight in kg: 1 кг, 0,5 кг, 2 кг, 5 кг
  const mKg = p.match(/^([0-9]+(?:[,.][0-9]+)?)\s*кг$/i);
  if (mKg) {
    const val = parseFloat(mKg[1].replace(',', '.'));
    const valStr = Number.isInteger(val) ? val.toString() : val.toFixed(1);
    return { step: val, unit: 'кг', display: `кратность ${valStr} кг` };
  }

  // 4. Box / Package / Set / Roll
  const pLower = p.toLowerCase();
  if (pLower.includes('кор')) {
    return { step: 1.0, unit: 'кор', display: 'кратность 1 кор' };
  }
  if (pLower.includes('набор')) {
    return { step: 1.0, unit: 'набор', display: 'кратность 1 набор' };
  }
  if (pLower.includes('уп')) {
    return { step: 1.0, unit: 'уп', display: 'кратность 1 уп' };
  }
  if (pLower.includes('рулон')) {
    return { step: 1.0, unit: 'рулон', display: 'кратность 1 рулон' };
  }
  if (pLower.includes('ведро')) {
    return { step: 1.0, unit: 'ведро', display: 'кратность 1 ведро' };
  }

  // 5. Pure numbers (e.g. 3, 3.0, 4, 4.0, 1, 1.0)
  if (p && !isNaN(Number(p.replace(',', '.')))) {
    const num = parseFloat(p.replace(',', '.'));
    if (p === '0.5' || p === '0,5') {
      return { step: 1.0, unit: 'уп', display: 'кратность 1 уп' };
    }
    const valStr = Number.isInteger(num) ? num.toString() : num.toFixed(1);
    return { step: num, unit: 'шт', display: `кратность ${valStr} шт` };
  }

  // 5b. Boxed snacks indicated in name (e.g. "*12шт", "*17шт", "*24, кор", ", кор")
  if (/,\s*кор(?:\s|$)/i.test(nameLower) || /\*\s*\d+\s*(?:шт\.?)?(?:\s|,|$)/i.test(nameLower)) {
    return { step: 1.0, unit: 'кор', display: 'кратность 1 кор' };
  }

  // 6. Grams in factory packs (e.g. 40 г, 60 г, 80 г, 160 г, 165 г) -> step 1 шт
  if (/\b[0-9]+\s*г\b/i.test(p)) {
    return { step: 1.0, unit: 'шт', display: 'кратность 1 шт' };
  }

  // 7. Fallback / 'Не указана' / sizes
  let unit = 'шт';
  if ((cat === 'Расходники' || cat === 'Контейнеры') && nameLower.includes('пакет')) {
    unit = 'уп';
  }
  return { step: 1.0, unit: unit, display: `кратность 1 ${unit}` };
}

// Transliterate Russian string to clean latin slug
function transliterate(text) {
  const cyr = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const lat = ['a', 'b', 'v', 'g', 'd', 'e', 'yo', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'kh', 'ts', 'ch', 'sh', 'shch', '', 'y', '', 'e', 'yu', 'ya'];
  let res = '';
  const s = String(text || '').trim();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const low = ch.toLowerCase();
    const idx = cyr.indexOf(low);
    if (idx !== -1) {
      res += lat[idx];
    } else {
      res += ch;
    }
  }
  return res.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '').toLowerCase() || 'custom';
}

// Convert supplier name into clean unique ID
function slugify(text) {
  if (!text) return 'snacks';
  const t = String(text).trim();
  const lower = t.toLowerCase();

  // Explicit mappings to our known base IDs
  if (lower === 'снеки' || lower === 'снеки и закуски' || lower === 'snacks') return 'snacks';
  if (lower === 'расходники' || lower === 'расходники и тара' || lower === 'consumables') return 'consumables';
  if (lower === 'ярмарка' || lower === 'yarmarka') return 'yarmarka';
  if (lower === 'пивные закуски' || lower === 'пивныезакуски' || lower === 'pivnye_zakuski') return 'pivnye_zakuski';

  return transliterate(t);
}

function chooseSupplierIcon(name) {
  const l = String(name || '').toLowerCase();
  if (l.includes('pringles') || l.includes('чипс') || l.includes('пивные закуски')) return '🥔';
  if (l.includes('пив') || l.includes('пиво')) return '🍻';
  if (l.includes('рыб')) return '🐟';
  if (l.includes('мяс')) return '🥩';
  if (l.includes('расход') || l.includes('тара') || l.includes('контейнер')) return '🧻';
  if (l.includes('ярм')) return '🎪';
  if (l.includes('напит') || l.includes('лимонад') || l.includes('сок')) return '🥤';
  if (l.includes('кофе') || l.includes('чай')) return '☕';
  if (l.includes('слад') || l.includes('конфет') || l.includes('мармелад')) return '🍬';
  return '📦';
}

// Synchronize from Google Sheets directly via XLSX export
async function syncFromGoogleSheets(notify = true) {
  const btn = document.getElementById('btnSync');
  if (btn) btn.classList.add('syncing');

  const sheetUrl = localStorage.getItem(CUSTOM_SHEET_KEY) || DEFAULT_SHEET_XLSX_URL;

  try {
    const res = await fetch(sheetUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();

    if (typeof XLSX === 'undefined') {
      throw new Error('Библиотека XLSX не загружена');
    }

    const wb = XLSX.read(arrayBuffer, { type: 'array' });
    const parsedData = parseGoogleSheetWorkbook(wb);

    if (parsedData && parsedData.items && parsedData.items.length > 0) {
      catalog = processCatalogWithPeanutOptimization(mergePendingUserItemsIntoList(parsedData.items));
      if (parsedData.suppliers && parsedData.suppliers.length > 0) {
        suppliers = parsedData.suppliers;
      }
      localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(catalog));
      localStorage.setItem(SUPPLIERS_CACHE_KEY, JSON.stringify(suppliers));

      // Validate active supplier
      if (!suppliers.some(s => s.id === activeSupplier)) {
        activeSupplier = suppliers[0].id;
      }

      renderSupplierNav();
      updateFavBadge();
      renderCategoryTabs();
      renderCatalog();
      updateOrderBar();
      if (Array.isArray(liveCustomItemsCache)) {
        reconcileLiveCustomItems(liveCustomItemsCache);
      }
      // Also sync live favorites and user-added items from Apps Script Web App
      syncFavoritesFromAppsScript(false).catch(() => { });
      if (notify) showToast(`✅ Каталог обновлен: ${parsedData.items.length} позиций во всех вкладках!`);
    } else {
      throw new Error('Не удалось прочитать позиции из таблицы');
    }
  } catch (err) {
    console.error('Sync error:', err);
    if (notify) showToast(`❌ Ошибка обновления таблицы: ${err.message}`, true);
  } finally {
    if (btn) btn.classList.remove('syncing');
  }
}

// Safely extract URL string from cell value, handling hyperlinks, formulas and objects
function extractUrlValue(cell) {
  if (cell === null || cell === undefined) return '';
  if (typeof cell === 'string') return cell.trim();
  if (typeof cell === 'object') {
    if (cell.l && cell.l.Target) return String(cell.l.Target).trim();
    if (cell.v !== undefined && cell.v !== null) return String(cell.v).trim();
    if (cell.w !== undefined && cell.w !== null) return String(cell.w).trim();
  }
  return String(cell).trim();
}

// Detect chip brand from product name (Pringles, Bulba, Mega Chips, Джаузи)
function detectBrandFromName(name) {
  if (!name) return '';
  const lower = String(name).toLowerCase();
  if (lower.includes('бульба') || lower.includes('bulba')) return 'Bulba';
  if (lower.includes('мегачипс') || lower.includes('мега чипс') || lower.includes('mega chips')) return 'Mega Chips';
  if (lower.includes('джаузи') || lower.includes('gouyear') || lower.includes('jiaozi')) return 'Джаузи';
  if (lower.includes('принглс') || lower.includes('pringles')) return 'Pringles';
  return '';
}

// Generate deterministic stable ID for auto-parsed sheets (e.g. pringles_паприка_165_гр)
function generateDeterministicId(sheetName, productName) {
  const sheetSlug = String(sheetName || 'chips')
    .trim()
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '');

  let raw = String(productName || '').trim().toLowerCase();

  // Strip packaging noise like "в упаковке" or "(в упаковке)"
  raw = raw
    .replace(/,\s*в\s+упаковке(?![a-zа-я0-9])/gi, ',')
    .replace(/\(\s*в\s+упаковке\s*\)/gi, '')
    .replace(/(?:^|\s)в\s+упаковке(?![a-zа-я0-9])/gi, ' ');

  // Handle mini chips prefix: "мини принглс ..." -> "мини ..."
  raw = raw.replace(/^мини\s+(?:принглс|pringles)\s*/i, 'мини ');

  // Strip leading sheet name or brand (e.g. "принглс", "pringles", sheetSlug)
  const brandAliases = [sheetSlug, 'принглс', 'pringles'];
  for (const alias of brandAliases) {
    if (alias && raw.startsWith(alias)) {
      raw = raw.slice(alias.length).trim();
      break;
    }
  }

  // Convert all non-alphanumeric (cyrillic, latin, digits) characters to underscores
  const normName = raw
    .replace(/[^a-zа-я0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '');

  const finalId = `${sheetSlug}_${normName}`.replace(/_+/g, '_').toLowerCase();
  return finalId || `${sheetSlug}_item`;
}

// Check if a column in rows contains values starting with item_
function hasItemPrefixInRows(rows, colIdx) {
  if (colIdx < 0 || !Array.isArray(rows)) return false;
  for (let r = 1; r < Math.min(rows.length, 15); r++) {
    const val = String((rows[r] && rows[r][colIdx]) || '').trim();
    if (/^item_\d+/i.test(val)) return true;
  }
  return false;
}

// Dynamic parser for multi-sheet Google Sheets workbook
function parseGoogleSheetWorkbook(wb) {
  const items = [];

  // Default sheet to supplier mapping
  const sheetToSupplierMap = {
    'Расходники': 'consumables',
    'Контейнеры': 'consumables',
    'Заморозка': 'yarmarka',
    'Вкусняшки и прочее': 'yarmarka',
    'Pringles': 'pivnye_zakuski'
  };

  const dynamicSupplierLabels = {
    'snacks': { name: 'Снеки и закуски', shortName: 'Снеки', icon: '🍺' },
    'consumables': { name: 'Расходники и тара', shortName: 'Расходники', icon: '🧻' },
    'yarmarka': { name: 'Ярмарка', shortName: 'Ярмарка', icon: '🎪' },
    'pivnye_zakuski': { name: 'Пивные закуски', shortName: 'Пивные закуски', icon: '🥔' }
  };

  // 1. Check for dedicated 'Поставщики' sheet if user created one
  const supSheetName = wb.SheetNames.find(s => s.toLowerCase().includes('поставщик') || s.toLowerCase().includes('supplier'));
  if (supSheetName) {
    const supWs = wb.Sheets[supSheetName];
    const supRows = XLSX.utils.sheet_to_json(supWs, { header: 1, defval: '' });
    if (supRows && supRows.length > 1) {
      supRows.slice(1).forEach(r => {
        if (r && r[0] && r[1]) {
          const tab = String(r[0]).trim();
          const sup = String(r[1]).trim();
          sheetToSupplierMap[tab] = sup;
          const supId = slugify(sup);
          dynamicSupplierLabels[supId] = {
            name: sup,
            shortName: sup,
            icon: chooseSupplierIcon(sup)
          };
        }
      });
    }
  }

  // Determine if individual snack sheets are present
  const hasIndividualSnackSheets = wb.SheetNames.some(s => {
    const l = s.toLowerCase().trim();
    return l.includes('гренки') || l.includes('сыр') || l.includes('орех') || l.includes('рыб');
  });

  let sheetNames = wb.SheetNames.filter(s => {
    const l = s.toLowerCase().trim();
    if (s === supSheetName || l.includes('избран') || l.includes('favorite')) return false;
    if (l === 'весь ассортимент' || l.includes('весь ассортимент')) {
      // Exclude "Весь ассортимент" if 14 product sheets are already present (avoids duplicates)
      return !hasIndividualSnackSheets;
    }
    return true;
  });

  if (sheetNames.length === 0) {
    const allAssort = wb.SheetNames.find(s => s.toLowerCase().trim() === 'весь ассортимент' || s.toLowerCase().includes('ассортимент'));
    if (allAssort) {
      sheetNames = [allAssort];
    }
  }

  for (const sheetName of sheetNames) {
    const ws = wb.Sheets[sheetName];
    if (!ws) continue;

    const isAllAssortment = sheetName.toLowerCase().trim() === 'весь ассортимент' || sheetName.toLowerCase().includes('ассортимент');

    // Ensure range covers up to column H (col index 7) so columns E (4), F (5), G (6) are never cropped
    if (ws['!ref']) {
      try {
        const range = XLSX.utils.decode_range(ws['!ref']);
        if (range.e.c < 7) {
          range.e.c = 7;
          ws['!ref'] = XLSX.utils.encode_range(range);
        }
      } catch (e) {
        console.warn('Range expansion error', e);
      }
    }

    const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    if (!rows || rows.length < 2) continue;

    const header = rows[0] || [];
    let idCol = -1;
    let nameCol = -1;
    let brandCol = -1;
    let productTypeCol = -1;
    let packCol = -1;
    let supCol = -1;
    let photoCol = -1;
    let updatedCol = -1;
    let catCol = -1;
    let storeCol = -1;

    header.forEach((col, idx) => {
      if (col === undefined || col === null) return;
      const cStr = String(col).trim();
      const cLower = cStr.toLowerCase().replace(/\s+/g, ' ');
      if (cLower === 'id' || cLower === 'ид' || cLower === 'id товара' || cLower === 'id_товара' || cLower.startsWith('id ') || cLower === 'код' || cLower === 'артикул') {
        idCol = idx;
      } else if (cLower.includes('наименование') || cLower.includes('название') || cLower.includes('товар')) {
        nameCol = idx;
      } else if (cLower === 'бренд' || cLower === 'brand' || cLower.includes('бренд') || cLower.includes('brand')) {
        brandCol = idx;
      } else if (cLower === 'вид продукта' || cLower === 'вид' || cLower.includes('вид продукта') || cLower === 'подкатегория' || cLower === 'product_type') {
        productTypeCol = idx;
      } else if (cLower.includes('фасовка') || cLower.includes('кратность')) {
        packCol = idx;
      } else if (cLower.includes('поставщик')) {
        supCol = idx;
      } else if (cLower.includes('категория') || cLower.includes('раздел')) {
        catCol = idx;
      } else if (cLower.includes('магазин') || cLower === 'store' || cLower === 'точка') {
        storeCol = idx;
      } else if (
        cLower === 'фото' ||
        cLower === 'photo' ||
        cLower === 'image' ||
        cLower.includes('фото') ||
        cLower.includes('photo') ||
        cLower.includes('image') ||
        cLower.includes('изображен') ||
        cLower.includes('картинк') ||
        cLower.includes('img') ||
        cLower.includes('pic')
      ) {
        photoCol = idx;
      } else if (cLower.includes('обновлено') || cLower.includes('updated') || cLower.includes('дата')) {
        updatedCol = idx;
      }
    });

    const isUserAddedSheet = sheetName.toLowerCase().trim() === USER_ADDED_SHEET_NAME.toLowerCase();
    const isPringlesSheet = sheetName.toLowerCase().includes('pringles');
    const hasPhotoOrUpdate = (photoCol !== -1 || updatedCol !== -1);
    const hasItemPrefix = idCol !== -1 && hasItemPrefixInRows(rows, idCol);

    // Auto-parsed sheets (Pringles or other auto-parsed chip tabs without item_XXX column)
    const isAutoParsedSheet = !isUserAddedSheet && (isPringlesSheet || (hasPhotoOrUpdate && !hasItemPrefix));

    if (isAutoParsedSheet) {
      if (photoCol === -1) photoCol = 6; // Column G is index 6
      if (brandCol === -1) brandCol = 1; // Column B is index 1
      idCol = -1; // Never use item_XXX counter or column for auto-parsed sheets
      if (nameCol === -1) nameCol = 0;
      if (packCol === -1) packCol = 3;
    } else {
      // Regular product sheets and "Весь ассортимент"
      if (idCol === -1) {
        // Range up to col F (index 5) on "Весь ассортимент", up to col E (index 4) on product sheets
        idCol = isAllAssortment ? 5 : 4;
      }
      if (nameCol === -1) nameCol = 0;
      if (packCol === -1) packCol = 3;
    }

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || !Array.isArray(row)) continue;

      const rawName = row[nameCol];
      if (!rawName || !String(rawName).trim()) continue;

      const cleanName = String(rawName).replace(/\s+/g, ' ').replace(/\s+,/g, ',').trim();
      if (cleanName.toLowerCase() === 'наименование' || cleanName.toLowerCase() === 'название') continue;

      const rawPack = packCol !== -1 ? row[packCol] : '';
      const itemCat = isUserAddedSheet
        ? USER_ADDED_SHEET_NAME
        : ((isAllAssortment && catCol !== -1 && row[catCol]) ? String(row[catCol]).trim() : sheetName);
      const packInfo = parsePackInfo(cleanName, rawPack, itemCat);

      // Extract photo URL (handling column G, objects, hyperlinks, strings, and direct scan)
      let rawPhoto = '';
      if (photoCol !== -1 && row[photoCol] !== undefined && row[photoCol] !== null) {
        rawPhoto = extractUrlValue(row[photoCol]);
      }
      // Fallback for column G (index 6)
      if (!rawPhoto && row[6] !== undefined && row[6] !== null) {
        const candidate = extractUrlValue(row[6]);
        if (/^https?:\/\//i.test(candidate)) {
          rawPhoto = candidate;
        }
      }
      // Scan row for image URL if still empty on Pringles
      if (!rawPhoto && isPringlesSheet) {
        for (let c = 0; c < row.length; c++) {
          const candidate = extractUrlValue(row[c]);
          if (typeof candidate === 'string' && (candidate.includes('i.siteapi.org') || /^https?:\/\/.*\.(?:jpg|jpeg|png|webp|gif)/i.test(candidate))) {
            rawPhoto = candidate;
            break;
          }
        }
      }

      const cleanPhoto = rawPhoto ? String(rawPhoto).trim() : '';

      // Extract brand (Column B or detected from product name), ignoring placeholder values like "Без бренда"
      const rawBrand = (brandCol !== -1 && row[brandCol] !== undefined && row[brandCol] !== null)
        ? cleanBrandValue(row[brandCol])
        : '';
      let itemBrand = rawBrand || detectBrandFromName(cleanName);
      if (!itemBrand && isPringlesSheet) {
        itemBrand = 'Pringles';
      }

      // Extract product type ("Вид продукта" / "Раздел" for user-added) with automatic fallback
      const rawProductType = (productTypeCol !== -1 && row[productTypeCol] !== undefined && row[productTypeCol] !== null)
        ? String(row[productTypeCol]).trim()
        : (isUserAddedSheet && catCol !== -1 && row[catCol] !== undefined && row[catCol] !== null ? String(row[catCol]).trim() : '');
      const itemProductType = rawProductType || detectProductType(cleanName, itemCat);

      // Determine supplier
      let supplierId = 'snacks';
      if (supCol !== -1 && row[supCol] && String(row[supCol]).trim()) {
        const rawSupVal = String(row[supCol]).trim();
        supplierId = slugify(rawSupVal);
        if (!dynamicSupplierLabels[supplierId]) {
          dynamicSupplierLabels[supplierId] = {
            name: rawSupVal,
            shortName: rawSupVal,
            icon: chooseSupplierIcon(rawSupVal)
          };
        }
      } else if (sheetToSupplierMap[sheetName]) {
        const rawSupVal = sheetToSupplierMap[sheetName];
        supplierId = slugify(rawSupVal);
        if (!dynamicSupplierLabels[supplierId]) {
          dynamicSupplierLabels[supplierId] = {
            name: rawSupVal,
            shortName: rawSupVal,
            icon: chooseSupplierIcon(rawSupVal)
          };
        }
      }

      // Assign ID:
      // Auto-parsed sheets -> deterministic ID
      // Regular sheets -> read constant ID from column E/F
      let itemId = '';
      if (isAutoParsedSheet) {
        itemId = generateDeterministicId(sheetName, cleanName);
      } else {
        let rawId = (idCol !== -1 && row[idCol] !== undefined && row[idCol] !== null) ? String(row[idCol]).trim() : '';
        if (rawId) {
          if (/^item_\d+/i.test(rawId)) {
            itemId = rawId.toLowerCase();
          } else if (/^\d+$/.test(rawId)) {
            itemId = `item_${String(rawId).padStart(3, '0')}`;
          } else {
            itemId = rawId;
          }
        }
      }

      if (isUserAddedSheet && !itemId) {
        itemId = `user_${transliterate(cleanName + '_' + supplierId)}`;
      }
      const addedByStore = (isUserAddedSheet && storeCol !== -1 && row[storeCol] !== undefined && row[storeCol] !== null)
        ? String(row[storeCol]).trim()
        : '';

      items.push(normalizeCatalogItem({
        id: itemId, // empty string if cell was empty; will be assigned MAX + 1 in pass 2
        name: cleanName,
        brand: itemBrand,
        productType: itemProductType,
        category: itemCat,
        supplier: supplierId,
        step: packInfo.step,
        unit: packInfo.unit,
        display_step: packInfo.display,
        image: cleanPhoto,
        photo: cleanPhoto,
        imageUrl: cleanPhoto,
        'Фото': cleanPhoto,
        isUserAdded: isUserAddedSheet,
        addedByStore,
        _isAutoParsed: isAutoParsedSheet
      }));
    }
  }

  // Pass 2: Calculate maximum existing item_XXX number across all regular sheets
  let maxItemNum = 0;
  for (const it of items) {
    if (!it._isAutoParsed && it.id) {
      const match = it.id.match(/^item_(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > maxItemNum) {
          maxItemNum = num;
        }
      }
    }
  }

  // Fallback baseline from DEFAULT_CATALOG snacks items
  if (maxItemNum === 0) {
    for (const it of DEFAULT_CATALOG) {
      if (it.supplier !== 'pivnye_zakuski' && it.id) {
        const match = it.id.match(/^item_(\d+)$/i);
        if (match) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num) && num > maxItemNum) {
            maxItemNum = num;
          }
        }
      }
    }
  }

  // Assign temporary local IDs (MAX + 1) for newly added rows with temporarily empty ID
  // (Preserves exact permanent IDs for all existing rows without shifts)
  for (const it of items) {
    if (!it.id && !it._isAutoParsed && !it.isUserAdded) {
      maxItemNum++;
      it.id = `item_${String(maxItemNum).padStart(3, '0')}`;
    }
    delete it._isAutoParsed;
  }

  const mergedItems = mergePendingUserItemsIntoList(items);

  // Build dynamic suppliers array from discovered items
  const discoveredSupplierIds = [...new Set(mergedItems.map(i => i.supplier))];
  const dynamicSuppliers = [];

  discoveredSupplierIds.forEach(id => {
    const meta = dynamicSupplierLabels[id] || KNOWN_SUPPLIER_META[id] || { name: id, shortName: id, icon: '📦' };
    const categoriesForSup = [...new Set(mergedItems.filter(i => i.supplier === id).map(i => i.category))];

    dynamicSuppliers.push({
      id,
      name: meta.name,
      shortName: meta.shortName,
      icon: meta.icon,
      categories: categoriesForSup
    });
  });

  const orderedDynamicSuppliers = sortSuppliersList(dynamicSuppliers);

  // Discovered favorites sheet if present in Google Sheet
  const favSheetName = wb.SheetNames.find(s => {
    const lower = String(s).toLowerCase().trim();
    return lower === 'избранное' || lower.includes('избран') || lower === 'favorites';
  });

  if (favSheetName) {
    try {
      const favWs = wb.Sheets[favSheetName];
      const favRows = XLSX.utils.sheet_to_json(favWs, { header: 1, defval: '' });
      if (favRows && favRows.length > 1) {
        const header = (favRows[0] || []).map(h => String(h || '').trim().toLowerCase());
        const storeCol = header.findIndex(h => h.includes('магазин') || h.includes('store') || h.includes('точка'));
        let favIdCol = header.findIndex(h => h === 'id' || h === 'id товара' || h.includes('id товара') || h === 'ид товара' || h === 'ид' || h === 'код');
        let favNameCol = header.findIndex(h => h.includes('наименование') || h.includes('название') || (h.includes('товар') && !h.includes('id') && !h.includes('ид')));

        if (favIdCol === -1 && favNameCol === -1) {
          favIdCol = 1;
          favNameCol = 2;
        } else if (favIdCol === -1) {
          favIdCol = 1;
        } else if (favNameCol === -1) {
          favNameCol = 2;
        }

        const storeColMap = {};
        STORES.forEach(sName => {
          const idx = header.findIndex(h => h === sName.toLowerCase() || h.includes(sName.toLowerCase()));
          if (idx !== -1) storeColMap[sName] = idx;
        });

        const parsedFavs = {
          'Битца': new Set(),
          'Битца2': new Set(),
          'БП': new Set(),
          'Олимп': new Set()
        };

        if (storeCol !== -1 && (favIdCol !== -1 || favNameCol !== -1)) {
          for (let r = 1; r < favRows.length; r++) {
            const row = favRows[r];
            const storeVal = String(row[storeCol] || '').trim();
            const idVal = favIdCol !== -1 ? String(row[favIdCol] || '').trim() : '';
            const nameVal = favNameCol !== -1 ? String(row[favNameCol] || '').trim() : '';
            if (!storeVal || (!idVal && !nameVal)) continue;

            const matchedStore = STORES.find(s => s.toLowerCase() === storeVal.toLowerCase());
            if (matchedStore) {
              // Double protection:
              // 1. Primary: search by permanent ID (item_XXX or pringles_...)
              let matchedItem = null;
              if (idVal) {
                matchedItem = mergedItems.find(it => it.id && it.id.toLowerCase() === idVal.toLowerCase());
              }
              // 2. Fallback: search by exact product name
              if (!matchedItem && nameVal) {
                const targetName = nameVal.toLowerCase();
                matchedItem = mergedItems.find(it => it.name && it.name.trim().toLowerCase() === targetName);
              }
              if (matchedItem) {
                parsedFavs[matchedStore].add(matchedItem.id);
              }
            }
          }
        } else if (Object.keys(storeColMap).length > 0) {
          const nameColIdx = favNameCol !== -1 ? favNameCol : (favIdCol !== -1 ? favIdCol : 0);
          for (let r = 1; r < favRows.length; r++) {
            const row = favRows[r];
            const cellVal = String(row[nameColIdx] || '').trim();
            if (!cellVal) continue;

            // 1. Primary match by ID
            let matchedItem = mergedItems.find(it => it.id && it.id.toLowerCase() === cellVal.toLowerCase());
            // 2. Fallback match by exact Name
            if (!matchedItem) {
              const targetName = cellVal.toLowerCase();
              matchedItem = mergedItems.find(it => it.name && it.name.trim().toLowerCase() === targetName);
            }
            if (!matchedItem) continue;

            for (const [sName, colIdx] of Object.entries(storeColMap)) {
              const checkVal = String(row[colIdx] || '').trim().toLowerCase();
              if (checkVal && checkVal !== '0' && checkVal !== 'нет' && checkVal !== 'false' && checkVal !== '-') {
                parsedFavs[sName].add(matchedItem.id);
              }
            }
          }
        }

        let totalImported = 0;
        STORES.forEach(sName => {
          if (parsedFavs[sName].size > 0) {
            storeFavorites[sName] = parsedFavs[sName];
            totalImported += parsedFavs[sName].size;
          }
        });
        if (totalImported > 0) {
          saveFavorites();
        }
      }
    } catch (favErr) {
      console.warn('Favorites sheet parsing notice:', favErr);
    }
  }

  return {
    items: mergedItems,
    suppliers: orderedDynamicSuppliers.length > 0 ? orderedDynamicSuppliers : DEFAULT_SUPPLIERS
  };
}

// Top-Level Supplier Navigation Bar
function renderSupplierNav() {
  const container = document.getElementById('supplierNav');
  if (!container) return;

  container.innerHTML = suppliers.map(sup => {
    const totals = getOrderTotals(sup.id);
    const isActive = activeSupplier === sup.id ? 'active' : '';
    const hasItems = totals.count > 0 ? 'has-items' : '';

    return `
      <button class="supplier-tab ${isActive}" data-supplier="${sup.id}">
        <span>${sup.icon}</span>
        <span>${escapeHtml(sup.shortName)}</span>
        <span class="supplier-badge ${hasItems}" id="badge-sup-${sup.id}">${totals.count}</span>
      </button>
    `;
  }).join('');

  container.querySelectorAll('.supplier-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const supId = btn.getAttribute('data-supplier');
      switchSupplier(supId);
    });
  });
}

function switchSupplier(supId) {
  activeSupplier = supId;
  saveState();
  activeCategory = 'all';
  activeBrandFilter = 'all';
  renderSupplierNav();
  updateFavBadge();
  renderCategoryTabs();
  renderSortBar();
  renderCatalog();
  updateOrderBar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Category Tabs Navigation (Scoped to Active Supplier)
function renderCategoryTabs() {
  const container = document.getElementById('categoryNav');
  if (!container) return;

  const currentSup = getSupplierById(activeSupplier);
  const itemsInSup = catalog.filter(i => i.supplier === activeSupplier);
  const presentCategories = new Set(itemsInSup.map(i => i.category));

  const orderedCats = ['all'];

  if (currentSup && Array.isArray(currentSup.categories)) {
    currentSup.categories.forEach(cat => {
      if (cat !== USER_ADDED_SHEET_NAME && presentCategories.has(cat)) orderedCats.push(cat);
    });
  }

  presentCategories.forEach(cat => {
    if (cat !== USER_ADDED_SHEET_NAME && !orderedCats.includes(cat)) orderedCats.push(cat);
  });

  orderedCats.push(USER_ADDED_SHEET_NAME);
  orderedCats.push('manual');

  container.innerHTML = orderedCats.map(cat => {
    let count = 0;
    if (cat === 'all') {
      count = favFilterMode !== 'none'
        ? itemsInSup.filter(i => isItemFavForFilter(i.id)).length
        : itemsInSup.length;
    } else if (cat === 'manual') {
      count = manualItems.filter(m => (m.supplier || 'snacks') === activeSupplier).length;
    } else {
      count = favFilterMode !== 'none'
        ? itemsInSup.filter(i => i.category === cat && isItemFavForFilter(i.id)).length
        : itemsInSup.filter(i => i.category === cat).length;
    }

    const meta = CATEGORY_META[cat] || { label: cat, icon: '🏷️' };
    const isActive = activeCategory === cat ? 'active' : '';

    return `
      <button class="cat-tab ${isActive}" data-cat="${cat}">
        <span>${meta.icon}</span>
        <span>${escapeHtml(meta.label)}</span>
        <span class="cat-badge">${count}</span>
      </button>
    `;
  }).join('');

  container.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      switchCategory(btn.getAttribute('data-cat'));
    });
  });

  renderBrandChips();
}

function switchCategory(cat) {
  activeCategory = cat || 'all';
  activeBrandFilter = 'all';
  renderCategoryTabs();
  renderSortBar();
  renderCatalog();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Brand Filter Chips (e.g. for Pringles / Chips: Pringles, Bulba, Mega Chips, Джаузи)
function renderBrandChips() {
  const container = document.getElementById('subcatChips');
  if (!container) return;

  if (activeCategory === 'manual') {
    container.classList.remove('visible');
    container.innerHTML = '';
    return;
  }

  const itemsInSup = catalog.filter(i => i.supplier === activeSupplier);
  const categoryItems = activeCategory === 'all'
    ? itemsInSup
    : itemsInSup.filter(i => i.category === activeCategory);

  // Collect unique brands present in this section
  const brandCounts = {};
  categoryItems.forEach(it => {
    const b = cleanBrandValue(it.brand) || detectBrandFromName(it.name);
    if (b) {
      brandCounts[b] = (brandCounts[b] || 0) + 1;
    }
  });

  const presentBrands = Object.keys(brandCounts);

  // If there are less than 2 brands, hide chips
  if (presentBrands.length <= 1) {
    container.classList.remove('visible');
    container.innerHTML = '';
    return;
  }

  // Desired ordering: Pringles, Bulba, Mega Chips, Джаузи, then others
  const brandOrder = ['Pringles', 'Bulba', 'Mega Chips', 'Джаузи'];
  presentBrands.sort((a, b) => {
    const idxA = brandOrder.indexOf(a);
    const idxB = brandOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b, 'ru');
  });

  let totalCount = categoryItems.length;
  if (favFilterMode !== 'none') {
    totalCount = categoryItems.filter(i => isItemFavForFilter(i.id)).length;
  }

  const chipsHtml = [];
  chipsHtml.push(`
    <button type="button" class="chip ${activeBrandFilter === 'all' ? 'active' : ''}" onclick="selectBrandFilter('all')">
      <span>Все бренды</span>
      <span class="chip-count">(${totalCount})</span>
    </button>
  `);

  presentBrands.forEach(b => {
    let count = categoryItems.filter(i => ((cleanBrandValue(i.brand) || detectBrandFromName(i.name)) === b)).length;
    if (favFilterMode !== 'none') {
      count = categoryItems.filter(i => ((cleanBrandValue(i.brand) || detectBrandFromName(i.name)) === b) && isItemFavForFilter(i.id)).length;
    }
    const isActive = activeBrandFilter === b ? 'active' : '';
    chipsHtml.push(`
      <button type="button" class="chip ${isActive}" onclick="selectBrandFilter('${escapeHtml(b)}')">
        <span>${escapeHtml(b)}</span>
        <span class="chip-count">(${count})</span>
      </button>
    `);
  });

  container.innerHTML = chipsHtml.join('');
  container.classList.add('visible');
}

function selectBrandFilter(brand) {
  activeBrandFilter = brand;
  renderBrandChips();
  renderCatalog();
}

// Render Sort Mode Switcher Bar
function renderSortBar() {
  const container = document.getElementById('sortBar');
  if (!container) return;

  if (activeCategory === 'manual') {
    container.classList.remove('visible');
    container.innerHTML = '';
    return;
  }

  const chipsHtml = SORT_MODES.map(mode => {
    const isActive = activeSortMode === mode.id ? 'active' : '';
    return `
      <button type="button" class="sort-chip ${isActive}" onclick="setSortMode('${mode.id}')" aria-pressed="${activeSortMode === mode.id}">
        <span>${mode.icon}</span>
        <span>${escapeHtml(mode.label)}</span>
      </button>
    `;
  }).join('');

  container.innerHTML = `<span class="sort-bar-label">Вид:</span>${chipsHtml}`;
  container.classList.add('visible');
}

function setSortMode(modeId) {
  if (!SORT_MODES.some(m => m.id === modeId)) return;
  activeSortMode = modeId;
  saveState();
  renderSortBar();
  renderCatalog();
}

// Group label for "По виду продукта" mode (refines bread snacks, cheeses, and fish)
function getProductGroupType(item) {
  if (!item) return 'Прочее';
  const cat = item.category || '';
  const nameLower = String(item.name || '').toLowerCase();
  if (cat === 'Гренки Весовые') {
    if (nameLower.includes('ведро') || nameLower.includes('юбилейн')) return 'Гренки: Ведро Юбилейные';
    if (nameLower.includes('лутовск')) {
      return nameLower.includes('ржан') ? 'Гренки: Лутовские ржаные' : 'Гренки: Лутовские пшеничные';
    }
    if (nameLower.includes('бро')) return 'Гренки: Бро';
    if (nameLower.includes('снапс')) return 'Гренки: Снапсы';
    if (nameLower.includes('житницк')) return 'Сухари: Багет Житницкие';
    if (nameLower.includes('демидовск')) return 'Сухари: Демидовские';
    if (nameLower.startsWith('сухар')) return 'Сухари: Весовые';
    const brand = cleanBrandValue(item.brand);
    if (nameLower.includes('гренк')) return brand ? `Гренки: ${brand}` : 'Гренки: Прочие';
    if (nameLower.includes('сухар')) return brand ? `Сухари: ${brand}` : 'Сухари: Прочие';
  }
  if (cat === 'Гренки Чипсы и снеки ЗАВОДСКИЕ') {
    if (nameLower.includes('сурск')) return 'Гренки (Сурские)';
    if (nameLower.includes('корнелли')) return 'Сухари кукурузные (Корнелли)';
  }
  if (cat === 'Сыры') {
    if (nameLower.includes('жарен')) return 'Сыр жареный';
    if (nameLower.includes('дондуковск')) return 'Дондуковский';
    const form = nameLower.includes('спагетти') ? 'Спагетти'
      : nameLower.includes('бочонок') ? 'Бочонок'
      : nameLower.includes('балыков') ? 'Балыковый'
      : nameLower.includes('коса') ? 'Коса'
      : '';
    if (nameLower.includes('санккино')) return form ? `Санккино: ${form}` : 'Санккино';
    if (nameLower.includes('фермерск')) return form ? `Фермерский: ${form}` : 'Фермерский';
    const brand = cleanBrandValue(item.brand);
    if (brand) return form ? `${brand}: ${form}` : brand;
    return cleanOrderPositionName(item.name, cat) || 'Сыр';
  }
  if (cat === 'Орехи') {
    if (nameLower.includes('ореховая смесь')) return 'Ореховая смесь';
    if (nameLower.includes('арахис')) {
      if (item.isPeanutGlazed || nameLower.includes('глазур') || nameLower.includes('корочк')) {
        return 'Арахис: В глазури / корочке';
      }
      if (
        nameLower.includes('хруст') ||
        nameLower.includes('премиум') ||
        nameLower.includes('запеч') ||
        nameLower.includes('в соусе')
      ) {
        return 'Арахис: Хрустящий (Премиум)';
      }
      return 'Арахис: Жареный (мелкий)';
    }
  }
  if (cat === 'Рыбные' && !/^икра\s+/i.test(nameLower) && (nameLower.includes('минта') || nameLower.includes('треск') || nameLower.includes('лизун'))) {
    return 'Минтай';
  }
  return item.productType || detectProductType(item.name, cat) || cat || 'Прочее';
}

// Group label and ordering for "По фасовке" mode
function getPackBucket(item) {
  const unit = (item && item.unit) || 'шт';
  const step = Number(item && item.step) || 1;
  const nameLower = String((item && item.name) || '').toLowerCase();
  if (unit === 'кг') {
    if (Math.abs(step - 0.5) < 0.01) return { key: 'kg_05', label: 'Вес: кратность 0.5 кг', order: 1 };
    if (Math.abs(step - 1) < 0.01) return { key: 'kg_1', label: 'Вес: кратность 1 кг', order: 2 };
    return { key: `kg_${step}`, label: `Вес: кратность ${step} кг`, order: 3 };
  }
  if (unit === 'кор') return { key: 'kor', label: 'Коробки (1 кор)', order: 4 };
  if (unit === 'набор') return { key: 'set', label: 'Наборы (1 набор)', order: 5 };
  if (unit === 'уп') return { key: 'pack', label: 'Упаковки (1 уп)', order: 6 };
  if (unit === 'рулон') return { key: 'roll', label: 'Рулоны (1 рулон)', order: 7 };
  if (nameLower.includes('ведро')) return { key: 'bucket', label: 'Вёдра (1 шт)', order: 8 };
  if (step > 1) return { key: `sht_${step}`, label: `Штучный: кратность ${step} шт`, order: 10 };
  return { key: 'sht_1', label: 'Штучный (1 шт)', order: 9 };
}

function buildSubgroupAccordionHtml(subgroupId, title, list, hasSearch, renderCardFn) {
  let subOrderQty = 0;
  let subUnit = list[0]?.unit || 'кг';
  list.forEach(it => {
    const q = order[it.id] || 0;
    if (q > 0) {
      subOrderQty = Math.round((subOrderQty + q) * 1000) / 1000;
      subUnit = it.unit || subUnit;
    }
  });

  const isCollapsed = !hasSearch && collapsedSubgroups.has(subgroupId);
  const hasOrderClass = subOrderQty > 0 ? 'has-subgroup-order' : '';
  const orderBadgeHtml = subOrderQty > 0
    ? `<span class="subgroup-order-badge">В заказе: ${formatQty(subOrderQty, subUnit)}</span>`
    : '';

  return `
    <div class="subgroup-accordion ${isCollapsed ? 'is-collapsed' : ''} ${hasOrderClass}" data-subgroup-id="${escapeHtml(subgroupId)}">
      <button type="button" class="subgroup-toggle" onclick="toggleSubgroup('${escapeHtml(subgroupId)}', event)">
        <div class="subgroup-title-wrap">
          <span class="subgroup-chevron">▾</span>
          <span class="subgroup-name">${escapeHtml(title)}</span>
          <span class="subgroup-count">${list.length} поз.</span>
        </div>
        ${orderBadgeHtml}
      </button>
      <div class="subgroup-content product-cards-list">
        ${list.map(renderCardFn).join('')}
      </div>
    </div>
  `;
}

// Unified Alphabetical Sorting Key for All Catalog Positions Across All Sheets (Option 1)
const CATALOG_COLLATOR = new Intl.Collator('ru', { numeric: true, sensitivity: 'base' });

function getItemSortKey(item) {
  if (!item) return '';
  const rawName = typeof item === 'string' ? item : (item.name || '');
  const cat = (item && item.category) || '';

  // 1. Coated peanuts: guaranteed to group as "Арахис в глазури [Вкус]" regardless of supplier/brand
  if (item && (item.isPeanutGlazed || (item.peanutFlavor && cat === 'Орехи'))) {
    return `Арахис в глазури ${item.peanutFlavor || ''}`.trim();
  }
  const peanut = parsePeanutGlazed(rawName);
  if (peanut) {
    return `Арахис в глазури ${peanut.flavor}`.trim();
  }

  // 2. Technical specs for tare and consumables
  if (cat === 'Контейнеры' || cat === 'Расходники') {
    return cleanOrderPositionName(rawName, cat);
  }

  // 3. For any other positions: parse brand/series + flavor to keep families strictly adjacent
  const parsed = parseOrderPosition(rawName, cat);
  if (parsed.brand && parsed.flavor) {
    if (parsed.brand === 'Гренки Снапсы') {
      const grainOrder = /пшенич/i.test(rawName) ? '2' : '1';
      return `${parsed.brand} ${grainOrder} ${parsed.flavor}`.trim();
    }
    return `${parsed.brand} ${parsed.flavor}`.trim();
  }

  return (parsed.fullName || cleanOrderPositionName(rawName, cat) || rawName).trim();
}

function compareCatalogItems(a, b) {
  const keyA = getItemSortKey(a);
  const keyB = getItemSortKey(b);
  return CATALOG_COLLATOR.compare(keyA, keyB);
}


// Track collapsed/expanded state of category subgroups
const collapsedSubgroups = new Set();

function toggleSubgroup(subgroupId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (collapsedSubgroups.has(subgroupId)) {
    collapsedSubgroups.delete(subgroupId);
  } else {
    collapsedSubgroups.add(subgroupId);
  }
  const el = document.querySelector(`.subgroup-accordion[data-subgroup-id="${subgroupId}"]`);
  if (el) {
    el.classList.toggle('is-collapsed', collapsedSubgroups.has(subgroupId));
  }
}

function updateSubgroupOrderBadge(accordion) {
  if (!accordion) return;
  const cards = accordion.querySelectorAll('.product-card[data-id]');
  let total = 0;
  let unit = 'кг';
  cards.forEach(card => {
    const id = card.getAttribute('data-id');
    const it = catalog.find(x => x.id === id);
    if (it && order[id]) {
      total = Math.round((total + order[id]) * 1000) / 1000;
      unit = it.unit || unit;
    }
  });

  const toggle = accordion.querySelector('.subgroup-toggle');
  let badgeEl = accordion.querySelector('.subgroup-order-badge');

  if (total > 0) {
    accordion.classList.add('has-subgroup-order');
    if (badgeEl) {
      badgeEl.textContent = `В заказе: ${formatQty(total, unit)}`;
      badgeEl.style.display = '';
    } else if (toggle) {
      const span = document.createElement('span');
      span.className = 'subgroup-order-badge';
      span.textContent = `В заказе: ${formatQty(total, unit)}`;
      toggle.appendChild(span);
    }
  } else {
    accordion.classList.remove('has-subgroup-order');
    if (badgeEl) {
      badgeEl.remove();
    }
  }
}

// Render Products Catalog List (Scoped to Active Supplier)
function renderCatalog() {
  const container = document.getElementById('catalogContent');
  if (!container) return;

  if (activeCategory === 'manual') {
    renderManualSection(container);
    return;
  }

  const itemsInSup = catalog.filter(item => item.supplier === activeSupplier);

  let filtered = itemsInSup.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    let matchSearch = true;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const brandStr = cleanBrandValue(item.brand) || detectBrandFromName(item.name) || '';
      const typeStr = item.productType || '';
      const target = `${item.name} ${item.category} ${brandStr} ${typeStr}`.toLowerCase();
      matchSearch = target.includes(q);
    }

    const matchFav = favFilterMode === 'none' || isItemFavForFilter(item.id);

    const itemBrand = cleanBrandValue(item.brand) || detectBrandFromName(item.name);
    const matchBrand = (activeBrandFilter === 'all') || (itemBrand === activeBrandFilter);

    return matchCat && matchSearch && matchFav && matchBrand;
  });

  if (filtered.length === 0) {
    if (favFilterMode === 'private') {
      container.innerHTML = `
        <div class="empty-state">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">👤</div>
          <p style="font-weight: 700; font-size: 1.05rem;">В вашем личном избранном пока пусто</p>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin: 6px auto 14px; max-width: 300px; line-height: 1.4;">
            Нажмите на звёздочку возле любого товара и отметьте <strong>«👤 Моё личное избранное»</strong>
          </p>
          <button class="btn-action-primary" style="margin: 0 auto; display: inline-flex; font-size: 0.85rem; padding: 8px 16px;" onclick="selectPrivatePill()">
            Вернуться в каталог магазина
          </button>
        </div>
      `;
      return;
    }

    if (favFilterMode !== 'none') {
      const supName = getSupplierById(activeSupplier).shortName;
      container.innerHTML = `
        <div class="empty-state">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">⭐</div>
          <p>В разделе «${escapeHtml(supName)}» нет товаров в избранном точки [${escapeHtml(activeStore)}]${activeCategory !== 'all' ? ' в этой категории' : ''}</p>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin: 6px auto 14px; max-width: 280px; line-height: 1.4;">
            Нажмите на звёздочку возле названия любого товара, чтобы закрепить его для магазина [${escapeHtml(activeStore)}]
          </p>
          <button class="btn-action-secondary" style="margin: 0 auto; display: inline-flex;" onclick="toggleFavoritesFilter('none')">
            Показать весь ассортимент
          </button>
        </div>
      `;
      return;
    }

    if (activeCategory === USER_ADDED_SHEET_NAME && !searchQuery.trim()) {
      container.innerHTML = `
        <div class="empty-state">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">🆕</div>
          <p style="font-weight: 700; font-size: 1rem;">В разделе «Добавлены пользователем» пока пусто</p>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin: 6px auto 14px; max-width: 300px; line-height: 1.4;">
            Добавьте позицию во вкладке <strong>«✏️ Свободный ввод»</strong> и отметьте галочку «Сохранить в базу для следующих заказов».
          </p>
          <button type="button" class="btn-action-primary" style="margin: 0 auto; display: inline-flex; font-size: 0.85rem; padding: 8px 16px;" onclick="switchCategory('manual')">
            ✏️ Перейти в Свободный ввод
          </button>
        </div>
      `;
      return;
    }

    // Check if query exists in another supplier
    let otherFoundHtml = '';
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const otherMatches = catalog.filter(i => i.supplier !== activeSupplier && i.name.toLowerCase().includes(q));
      if (otherMatches.length > 0) {
        const otherSupId = otherMatches[0].supplier;
        const otherSup = getSupplierById(otherSupId);
        otherFoundHtml = `
          <div style="margin-top: 14px; padding: 12px; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px;">
            <p style="margin: 0 0 8px; font-size: 0.88rem; color: #fde68a;">
              Найдено в поставщике <strong>${escapeHtml(otherSup.name)}</strong> (${otherMatches.length} поз.)
            </p>
            <button class="btn-action-primary" style="padding: 6px 14px; font-size: 0.85rem;" onclick="switchSupplier('${otherSupId}')">
              Перейти к ${escapeHtml(otherSup.shortName)} ➔
            </button>
          </div>
        `;
      }
    }

    container.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p>Ничего не найдено в разделе «${escapeHtml(getSupplierById(activeSupplier).shortName)}» по запросу "${escapeHtml(searchQuery)}"</p>
        ${otherFoundHtml}
        <button class="btn-action-secondary" style="margin: 12px auto; display: inline-flex;" onclick="resetSearch()">Сбросить поиск</button>
      </div>
    `;
    return;
  }

  let html = '';
  if (favFilterMode === 'private') {
    html += `
      <div class="private-mode-banner">
        <span>👤 Моё личное избранное (${filtered.length} поз.)</span>
        <button type="button" onclick="selectPrivatePill()" style="color: #38bdf8; font-size: 0.8rem; background: none; border: none; cursor: pointer; text-decoration: underline;">
          Все товары ✕
        </button>
      </div>
    `;
  }

  const hasSearch = searchQuery.trim().length > 0;
  const showCatBadge = activeCategory === 'all';

  if (activeSortMode === 'alpha') {
    const sorted = [...filtered].sort((a, b) => {
      const nameA = cleanOrderPositionName(a.name, a.category);
      const nameB = cleanOrderPositionName(b.name, b.category);
      return CATALOG_COLLATOR.compare(nameA, nameB);
    });
    const scopeLabel = activeCategory === 'all'
      ? 'Все товары (А → Я)'
      : ((CATEGORY_META[activeCategory]?.label || activeCategory) + ' (А → Я)');
    html += `
      <div class="section-group">
        <div class="section-header">
          <div class="section-title">
            <span>🔤</span>
            <span>${escapeHtml(scopeLabel)}</span>
          </div>
          <span class="section-count">${sorted.length} поз.</span>
        </div>
        <div class="product-cards-list">
          ${sorted.map(it => renderProductCard(it, null, showCatBadge)).join('')}
        </div>
      </div>
    `;
  } else if (activeSortMode === 'fav_order') {
    const inOrder = [];
    const inFav = [];
    const rest = [];
    filtered.forEach(it => {
      if ((order[it.id] || 0) > 0) inOrder.push(it);
      else if (isItemStoreFav(it.id) || isItemPrivateFav(it.id)) inFav.push(it);
      else rest.push(it);
    });
    const sortAlpha = (a, b) => CATALOG_COLLATOR.compare(
      cleanOrderPositionName(a.name, a.category),
      cleanOrderPositionName(b.name, b.category)
    );
    inOrder.sort((a, b) => {
      const aFav = (isItemStoreFav(a.id) || isItemPrivateFav(a.id)) ? 0 : 1;
      const bFav = (isItemStoreFav(b.id) || isItemPrivateFav(b.id)) ? 0 : 1;
      return aFav !== bFav ? aFav - bFav : sortAlpha(a, b);
    });
    inFav.sort(sortAlpha);
    rest.sort(sortAlpha);

    const sections = [
      { icon: '🛒', title: 'В заказе', items: inOrder },
      { icon: '⭐', title: `Избранное (${activeStore})`, items: inFav },
      { icon: '📦', title: 'Остальные товары', items: rest }
    ];
    sections.forEach(sec => {
      if (sec.items.length === 0) return;
      html += `
        <div class="section-group">
          <div class="section-header">
            <div class="section-title">
              <span>${sec.icon}</span>
              <span>${escapeHtml(sec.title)}</span>
            </div>
            <span class="section-count">${sec.items.length} поз.</span>
          </div>
          <div class="product-cards-list">
            ${sec.items.map(it => renderProductCard(it, null, showCatBadge)).join('')}
          </div>
        </div>
      `;
    });
  } else if (activeSortMode === 'pack') {
    const packMap = new Map();
    filtered.forEach(it => {
      const bucket = getPackBucket(it);
      if (!packMap.has(bucket.key)) {
        packMap.set(bucket.key, { ...bucket, items: [] });
      }
      packMap.get(bucket.key).items.push(it);
    });
    const buckets = Array.from(packMap.values()).sort((a, b) => a.order - b.order);
    buckets.forEach(bucket => {
      bucket.items.sort(compareCatalogItems);
      const subgroupId = 'pack_' + bucket.key;
      html += buildSubgroupAccordionHtml(
        subgroupId,
        bucket.label,
        bucket.items,
        hasSearch,
        it => renderProductCard(it, null, showCatBadge)
      );
    });
  } else {
    // Group by Category (for 'series' and 'type' modes)
    const groups = {};
    filtered.forEach(it => {
      const cat = it.category || 'Прочее';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(it);
    });

    for (const cat of Object.keys(groups)) {
      groups[cat].sort(compareCatalogItems);
    }

    for (const [catName, items] of Object.entries(groups)) {
      const meta = CATEGORY_META[catName] || { label: catName, icon: '🏷️' };
      let catBodyHtml = '';

      if (activeSortMode === 'type') {
        const typeMap = new Map();
        items.forEach(it => {
          const typeLabel = getProductGroupType(it);
          if (!typeMap.has(typeLabel)) typeMap.set(typeLabel, []);
          typeMap.get(typeLabel).push(it);
        });

        const typeGroups = [];
        const soloTypes = [];
        for (const [typeLabel, list] of typeMap) {
          list.sort(compareCatalogItems);
          if (list.length >= 2) {
            typeGroups.push({ typeLabel, list });
          } else {
            soloTypes.push(...list);
          }
        }
        typeGroups.sort((a, b) => CATALOG_COLLATOR.compare(a.typeLabel, b.typeLabel));
        soloTypes.sort(compareCatalogItems);

        if (typeGroups.length === 0) {
          catBodyHtml = `
            <div class="product-cards-list">
              ${soloTypes.map(it => renderProductCard(it, null)).join('')}
            </div>
          `;
        } else {
          typeGroups.forEach(({ typeLabel, list }) => {
            const subgroupId = 'type_' + catName.replace(/[^\w\u0400-\u04FF]/g, '_') + '_' + typeLabel.replace(/[^\w\u0400-\u04FF]/g, '_');
            const seriesSet = new Set(list.map(it => parseOrderPosition(it.name, catName).brand || ''));
            const singleSeries = seriesSet.size === 1 && !seriesSet.has('') ? Array.from(seriesSet)[0] : null;
            catBodyHtml += buildSubgroupAccordionHtml(
              subgroupId,
              typeLabel,
              list,
              hasSearch,
              it => renderProductCard(it, singleSeries)
            );
          });
          if (soloTypes.length > 0) {
            catBodyHtml += `
              <div class="product-cards-list standalone-list">
                ${soloTypes.map(it => renderProductCard(it, null)).join('')}
              </div>
            `;
          }
        }
      } else {
        // Default: 'series' — Group items inside category by series / brand
        const subgroupsMap = new Map();
        items.forEach(it => {
          const parsed = parseOrderPosition(it.name, catName);
          const grp = parsed.brand || '__standalone__';
          if (!subgroupsMap.has(grp)) {
            subgroupsMap.set(grp, []);
          }
          subgroupsMap.get(grp).push({
            item: it,
            parsed: parsed,
            flavor: parsed.flavor || parsed.fullName || it.name
          });
        });

        for (const [grpBrand, list] of subgroupsMap) {
          if (grpBrand === 'Гренки Снапсы') {
            list.sort((a, b) => compareCatalogItems(a.item, b.item));
          } else {
            list.sort((a, b) => CATALOG_COLLATOR.compare(a.flavor, b.flavor));
          }
        }

        const namedSubgroups = [];
        const standaloneItems = [];

        for (const [brand, list] of subgroupsMap) {
          const isRecognizedSeries = brand === 'Арахис в глазури' || brand.startsWith('Арахис ж/с') || brand.startsWith('Арахис Хрустящий') || brand.includes('Лутовские') || brand.includes('Санккино') || brand.includes('Фермерский');
          if (brand !== '__standalone__' && (list.length >= 2 || isRecognizedSeries)) {
            namedSubgroups.push({ brand, list });
          } else {
            standaloneItems.push(...list);
          }
        }

        namedSubgroups.sort((a, b) => CATALOG_COLLATOR.compare(a.brand, b.brand));
        standaloneItems.sort((a, b) => CATALOG_COLLATOR.compare(a.flavor, b.flavor));

        if (namedSubgroups.length === 0) {
          catBodyHtml = `
            <div class="product-cards-list">
              ${standaloneItems.map(e => renderProductCard(e.item, null)).join('')}
            </div>
          `;
        } else {
          namedSubgroups.forEach(({ brand, list }) => {
            const subgroupId = 'sub_' + catName.replace(/[^\w\u0400-\u04FF]/g, '_') + '_' + brand.replace(/[^\w\u0400-\u04FF]/g, '_');
            catBodyHtml += buildSubgroupAccordionHtml(
              subgroupId,
              brand,
              list.map(e => e.item),
              hasSearch,
              it => renderProductCard(it, brand)
            );
          });

          if (standaloneItems.length > 0) {
            catBodyHtml += `
              <div class="product-cards-list standalone-list">
                ${standaloneItems.map(e => renderProductCard(e.item, null)).join('')}
              </div>
            `;
          }
        }
      }

      html += `
        <div class="section-group">
          <div class="section-header">
            <div class="section-title">
              <span>${meta.icon}</span>
              <span>${escapeHtml(meta.label || catName)}</span>
            </div>
            <span class="section-count">${items.length} поз.</span>
          </div>
          ${catBodyHtml}
        </div>
      `;
    }
  }
  container.innerHTML = html;
  attachStepperEvents(container);
}

// Product Thumbnail Stub SVG Generator (Brand aware: Pringles, Bulba, Mega Chips, Джаузи)
function getProductThumbStub(brand) {
  const brandText = escapeHtml(brand || 'Чипсы');
  return `
    <div class="product-thumb-stub" title="Фото отсутствует">
      <svg class="thumb-stub-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2C9.5 2 7.5 3 7.5 4.5v15C7.5 21 9.5 22 12 22s4.5-1 4.5-2.5v-15C16.5 3 14.5 2 12 2z"></path>
        <ellipse cx="12" cy="4.5" rx="4.5" ry="2.5"></ellipse>
        <path d="M7.5 10c1.5.8 3.5 1 4.5 1s3-.2 4.5-1"></path>
        <circle cx="12" cy="14" r="1.5" fill="currentColor"></circle>
      </svg>
      <span class="thumb-stub-text">${brandText}</span>
    </div>
  `;
}

// Helper for extracting photo URL across all possible keys
function getProductImageUrl(item) {
  if (!item) return '';
  const url = item.image || item.photo || item['Фото'] || item.imageUrl || '';
  return typeof url === 'string' ? url.trim() : '';
}

// Helper for rendering product photo thumbnail (56x56 px, contain, rounded corners, referrerPolicy)
function renderProductThumbnail(item) {
  const imageUrl = getProductImageUrl(item);
  const brand = (item && item.brand) || detectBrandFromName(item && item.name) || 'Чипсы';
  const escapedName = escapeHtml(item && item.name ? item.name : brand);

  if (!imageUrl) {
    return `
      <div class="product-thumb has-stub" data-brand="${escapeHtml(brand)}" title="Фото отсутствует" style="width: 56px; height: 56px; min-width: 56px; flex-shrink: 0;">
        ${getProductThumbStub(brand)}
      </div>
    `;
  }

  return `
    <div class="product-thumb" data-brand="${escapeHtml(brand)}" onclick="toggleThumbZoom(this, event)" title="Нажмите для увеличения (280px)" style="width: 56px; height: 56px; min-width: 56px; flex-shrink: 0;">
      <img 
        src="${escapeHtml(imageUrl)}" 
        alt="${escapedName}" 
        class="product-thumb-img" 
        style="width: 56px; height: 56px; min-width: 56px; flex-shrink: 0; object-fit: contain;" 
        loading="lazy" 
        referrerpolicy="no-referrer" 
        referrerPolicy="no-referrer" 
        onerror="handleThumbError(this)" 
      />
    </div>
  `;
}

// Error handler for broken thumbnail images (replaces with SVG stub on real error, never hides prematurely)
function handleThumbError(img) {
  if (!img) return;
  img.onerror = null;
  const parent = img.closest('.product-thumb');
  if (parent) {
    const brand = parent.getAttribute('data-brand') || '';
    parent.classList.add('has-stub');
    parent.classList.remove('zoomed');
    parent.closest('.product-card')?.classList.remove('card-zoomed');
    parent.title = 'Фото отсутствует';
    parent.onclick = null;
    parent.innerHTML = getProductThumbStub(brand);
  }
}

// Open 280px Image Preview Modal on click
function openImagePreviewModal(src, title) {
  let modal = document.getElementById('imagePreviewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'imagePreviewModal';
    modal.className = 'image-preview-modal';
    modal.onclick = closeImagePreviewModal;
    modal.innerHTML = `
      <div class="image-preview-box" onclick="event.stopPropagation()">
        <img id="imagePreviewImg" class="image-preview-img" src="" alt="Чипсы" referrerpolicy="no-referrer" referrerPolicy="no-referrer" />
        <div id="imagePreviewTitle" class="image-preview-title"></div>
        <button class="image-preview-close" onclick="closeImagePreviewModal()" title="Закрыть">✕</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const imgEl = document.getElementById('imagePreviewImg');
  const titleEl = document.getElementById('imagePreviewTitle');
  if (imgEl) {
    imgEl.src = src;
    imgEl.alt = title || 'Чипсы';
    imgEl.setAttribute('referrerpolicy', 'no-referrer');
    imgEl.setAttribute('referrerPolicy', 'no-referrer');
  }
  if (titleEl) {
    titleEl.textContent = title || '';
  }
  modal.classList.add('active');
}

function closeImagePreviewModal() {
  const modal = document.getElementById('imagePreviewModal');
  if (modal) modal.classList.remove('active');
  document.querySelectorAll('.product-thumb.zoomed').forEach(t => {
    t.classList.remove('zoomed');
    t.closest('.product-card')?.classList.remove('card-zoomed');
  });
}

// Click/tap zoom toggle for 280px preview
function toggleThumbZoom(el, event) {
  if (event) {
    event.stopPropagation();
  }
  if (!el || el.classList.contains('has-stub')) return;

  const img = el.querySelector('.product-thumb-img');
  const src = img ? (img.getAttribute('src') || img.src) : '';
  const title = img ? (img.getAttribute('alt') || 'Чипсы') : 'Чипсы';

  if (!src) return;

  const isZoomed = el.classList.contains('zoomed');
  document.querySelectorAll('.product-thumb.zoomed').forEach(t => {
    t.classList.remove('zoomed');
    t.closest('.product-card')?.classList.remove('card-zoomed');
  });

  if (!isZoomed) {
    el.classList.add('zoomed');
    el.closest('.product-card')?.classList.add('card-zoomed');
    openImagePreviewModal(src, title);
  } else {
    closeImagePreviewModal();
  }
}

// Single Product Card HTML
function renderProductCard(item, subgroupBrand = null, showCategoryBadge = false) {
  const currentQty = order[item.id] || 0;
  const hasOrder = currentQty > 0 ? 'has-order' : '';
  const qtyFormatted = formatQty(currentQty, item.unit);
  const activeClass = currentQty > 0 ? 'active' : '';

  const isPringlesOrChips = item.category === 'Pringles' || item.supplier === 'pivnye_zakuski' || (item.name && /pringles|принглс|бульба|bulba|мегачипс|мега чипс|mega chips|джаузи|gouyear|jiaozi/i.test(item.name));
  const hasImage = Boolean(getProductImageUrl(item));
  const showThumb = isPringlesOrChips || hasImage;

  const thumbHtml = showThumb ? renderProductThumbnail(item) : '';

  const isUserAdded = Boolean(item.isUserAdded || item.category === USER_ADDED_SHEET_NAME);
  const itemBrand = cleanBrandValue(item.brand) || detectBrandFromName(item.name);
  const brandBadgeHtml = (!subgroupBrand && itemBrand) ? `<span class="badge-brand">${escapeHtml(itemBrand)}</span>` : '';
  const catMeta = showCategoryBadge ? (CATEGORY_META[item.category] || { label: item.category }) : null;
  const catBadgeHtml = catMeta ? `<span class="badge-cat-mini">${escapeHtml(catMeta.label)}</span>` : '';
  const userSubcatBadgeHtml = (isUserAdded && item.productType && item.productType !== USER_ADDED_SHEET_NAME)
    ? `<span class="badge-cat-mini">${escapeHtml(item.productType)}</span>`
    : '';
  const isSnapsy = /^Гренки\s+Снапсы/i.test(item.name || '');
  const grainBadgeHtml = isSnapsy
    ? (/пшенич/i.test(item.name)
        ? '<span class="badge-grain wheat">пшеничные</span>'
        : '<span class="badge-grain rye">ржаные</span>')
    : '';

  const isStore = isItemStoreFav(item.id);
  const isPrivate = isItemPrivateFav(item.id);
  let favClass = '';
  let favIcon = ICONS.starOutline;
  let favTitle = `Добавить в избранное [${escapeHtml(activeStore)}] (удержание: в личное)`;

  if (isStore && isPrivate) {
    favClass = 'is-both-fav';
    favIcon = ICONS.starSplit;
    favTitle = `В избранном [${escapeHtml(activeStore)}] (золото) и в личном (синий). Клик: магазин, удержание: личное`;
  } else if (isStore) {
    favClass = 'is-fav';
    favIcon = ICONS.starFilled;
    favTitle = `В избранном магазина [${escapeHtml(activeStore)}]. Клик: убрать, удержание: в личное`;
  } else if (isPrivate) {
    favClass = 'is-private-fav';
    favIcon = ICONS.starBlue;
    favTitle = `В личном избранном. Клик: добавить в [${escapeHtml(activeStore)}], удержание: убрать из личного`;
  } else {
    favTitle = `Добавить в избранное. Клик: [${escapeHtml(activeStore)}], удержание: в личное`;
  }

  return `
    <div class="product-card ${hasOrder}" data-id="${item.id}">
      ${thumbHtml}
      <div class="product-info">
        <div class="product-title-row">
          ${(() => {
            let titleText = item.name;
            if (subgroupBrand) {
              const parsed = parseOrderPosition(item.name, item.category);
              titleText = parsed.flavor || parsed.fullName || item.name;
            } else {
              titleText = cleanOrderPositionName(item.name, item.category);
            }
            return `<div class="product-title">${highlightSearch(titleText, searchQuery)}</div>`;
          })()}
          ${isUserAdded ? `
            <button type="button" class="btn-delete-custom"
              onclick="confirmDeleteCustomItem('${escapeHtml(item.id)}', event)"
              title="Удалить товар из базы" aria-label="Удалить из базы">
              ${ICONS.trash}
            </button>
          ` : ''}
          <button type="button" class="btn-fav ${favClass}"
            onclick="handleFavClick('${item.id}', event)"
            onpointerdown="handleFavPointerDown('${item.id}', event)"
            onpointerup="handleFavPointerUp('${item.id}', event)"
            onpointermove="handleFavPointerMove(event)"
            onpointercancel="handleFavPointerCancel(event)"
            oncontextmenu="handleFavContextMenu('${item.id}', event)"
            title="${favTitle}" aria-label="Избранное">
            ${favIcon}
          </button>
        </div>
        <div class="product-meta">
          ${catBadgeHtml}
          ${userSubcatBadgeHtml}
          ${brandBadgeHtml}
          ${grainBadgeHtml}
          <span class="badge-step">${escapeHtml(item.display_step || `кратность ${item.step} ${item.unit}`)}</span>
        </div>
      </div>
      <div class="stepper-control">
        <button class="stepper-btn minus" data-action="minus" data-id="${item.id}" title="Уменьшить">−</button>
        <div class="stepper-value ${activeClass}" data-action="prompt" data-id="${item.id}" title="Нажмите, чтобы ввести число">
          ${qtyFormatted}
        </div>
        <button class="stepper-btn plus" data-action="plus" data-id="${item.id}" title="Добавить">+</button>
      </div>
    </div>
  `;
}

// Stepper Events (+, -, prompt)
function attachStepperEvents(container) {
  container.querySelectorAll('.stepper-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      const item = catalog.find(i => i.id === id);
      if (!item) return;

      const step = Number(item.step) || 1.0;
      const current = order[id] || 0;

      if (action === 'plus') {
        const next = Math.round((current + step) * 1000) / 1000;
        order[id] = next;
      } else if (action === 'minus') {
        const next = Math.round((current - step) * 1000) / 1000;
        if (next <= 0.0001) {
          delete order[id];
        } else {
          order[id] = next;
        }
      }

      saveState();
      updateProductCard(id);
      renderSupplierNav();
      updateOrderBar();
    });
  });

  container.querySelectorAll('.stepper-value').forEach(div => {
    div.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = div.getAttribute('data-id');
      const item = catalog.find(i => i.id === id);
      if (!item) return;

      openQuantityPrompt(item.name, order[id] || 0, item.unit, (newVal) => {
        if (newVal <= 0) {
          delete order[id];
        } else {
          order[id] = Math.round(newVal * 1000) / 1000;
        }
        saveState();
        updateProductCard(id);
        renderSupplierNav();
        updateOrderBar();
      });
    });
  });
}

// Update single card DOM without full re-render
function updateProductCard(id) {
  const card = document.querySelector(`.product-card[data-id="${id}"]`);
  if (!card) return;

  const item = catalog.find(i => i.id === id);
  if (!item) return;

  const currentQty = order[id] || 0;
  if (currentQty > 0) {
    card.classList.add('has-order');
  } else {
    card.classList.remove('has-order');
  }

  const valEl = card.querySelector('.stepper-value');
  if (valEl) {
    valEl.textContent = formatQty(currentQty, item.unit);
    if (currentQty > 0) {
      valEl.classList.add('active');
    } else {
      valEl.classList.remove('active');
    }
  }

  const accordion = card.closest('.subgroup-accordion');
  if (accordion) {
    updateSubgroupOrderBadge(accordion);
  }
}

// Manual Items Form & List
function renderManualSection(container) {
  const currentSup = getSupplierById(activeSupplier);
  const itemsInCurrentSup = manualItems.filter(m => (m.supplier || 'snacks') === activeSupplier);

  let manualListHtml = '';
  if (itemsInCurrentSup.length > 0) {
    manualListHtml = `
      <div class="section-group" style="margin-top: 16px;">
        <div class="section-header">
          <div class="section-title">Добавлено вручную для «${escapeHtml(currentSup.shortName)}» (${itemsInCurrentSup.length})</div>
        </div>
        <div class="product-cards-list">
          ${itemsInCurrentSup.map(item => `
            <div class="product-card has-order" data-id="${item.id}">
              <div class="product-info">
                <div class="product-title">${escapeHtml(item.name)}</div>
                <div class="product-meta">
                  <span class="badge-step">${item.quantity} ${item.unit}</span>
                </div>
              </div>
              <div class="stepper-control">
                <button class="stepper-btn minus" data-action="manual-minus" data-id="${item.id}">−</button>
                <div class="stepper-value active" data-action="manual-prompt" data-id="${item.id}">${item.quantity} ${item.unit}</div>
                <button class="stepper-btn plus" data-action="manual-plus" data-id="${item.id}">+</button>
                <button class="stepper-btn" style="color: #ef4444;" data-action="manual-del" data-id="${item.id}" title="Удалить">${ICONS.trash}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="manual-card">
      <div class="manual-card-title">
        ✏️ Добавить позицию для «${escapeHtml(currentSup.name)}»
      </div>
      <form id="formManual" class="manual-form-grid" onsubmit="handleManualSubmit(event)">
        <div class="form-group">
          <label>Наименование товара</label>
          <input type="text" id="manualName" class="form-control" placeholder="Например: Пакеты фасовочные 500 шт" required />
        </div>
        <div class="form-row">
          <div class="form-group" style="flex: 2;">
            <label>Количество</label>
            <input type="number" id="manualQty" class="form-control" step="0.1" min="0.1" value="1" required />
          </div>
          <div class="form-group" style="flex: 2;">
            <label>Ед. измерения</label>
            <select id="manualUnit" class="form-control">
              <option value="шт">шт</option>
              <option value="уп">уп</option>
              <option value="кор">кор</option>
              <option value="кг">кг</option>
              <option value="ведро">ведро</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Раздел (необязательно)</label>
          <input type="text" id="manualCat" class="form-control" placeholder="Например: Свободный ввод" />
        </div>
        <label class="manual-save-checkbox">
          <input type="checkbox" id="manualSaveToBase" />
          <span class="manual-save-checkbox-text">
            <strong>Сохранить в базу для следующих заказов</strong>
            <small>Появится во вкладке «Добавлены пользователем» и в Google Таблице для всех точек</small>
          </span>
        </label>
        <button type="submit" class="btn-add-manual">
          ${ICONS.plus} Добавить в заказ ${escapeHtml(currentSup.shortName)}
        </button>
      </form>
    </div>
    ${manualListHtml}
  `;

  attachManualEvents(container);
}

function handleManualSubmit(e) {
  e.preventDefault();
  const nameEl = document.getElementById('manualName');
  const qtyEl = document.getElementById('manualQty');
  const unitEl = document.getElementById('manualUnit');
  const catEl = document.getElementById('manualCat');
  const saveCheckEl = document.getElementById('manualSaveToBase');

  const rawName = nameEl ? nameEl.value : '';
  const name = rawName.replace(/\s+/g, ' ').replace(/\s+,/g, ',').trim();
  const qty = parseFloat(qtyEl ? qtyEl.value : '1') || 1;
  const unit = unitEl ? unitEl.value : 'шт';
  const rawCat = catEl ? catEl.value.trim() : '';
  const saveToBase = Boolean(saveCheckEl && saveCheckEl.checked);

  if (!name) return;

  if (saveToBase) {
    const existing = findCatalogDuplicate(name, activeSupplier);
    if (existing) {
      const existingSup = getSupplierById(existing.supplier);
      if (existing.supplier === activeSupplier) {
        order[existing.id] = Math.round(((order[existing.id] || 0) + qty) * 1000) / 1000;
        saveState();
        if (nameEl) nameEl.value = '';
        if (catEl) catEl.value = '';
        if (qtyEl) qtyEl.value = '1';
        if (saveCheckEl) saveCheckEl.checked = false;

        const existingCatLabel = (CATEGORY_META[existing.category] && CATEGORY_META[existing.category].label) || existing.category;
        showToast(`ℹ️ «${existing.name}» уже есть в базе (${existingCatLabel}) — добавлено в заказ (${qty} ${existing.unit})`);
        renderSupplierNav();
        renderCategoryTabs();
        renderCatalog();
        updateOrderBar();
      } else {
        showToast(`⚠️ «${existing.name}» уже есть в базе у поставщика «${existingSup.shortName}»!`, true);
      }
      return;
    }

    const currentSup = getSupplierById(activeSupplier);
    const step = unit === 'кг' ? 0.5 : 1;
    const packStr = unit === 'кг' ? '0.5 кг' : (unit === 'шт' ? '1' : `1 ${unit}`);
    const newId = `user_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    const newCatalogItem = buildUserAddedCatalogItem({
      id: newId,
      name,
      subcat: rawCat,
      pack: packStr,
      supplier: activeSupplier,
      store: activeStore
    });
    // Guarantee exact standard step/unit chosen by user
    newCatalogItem.step = step;
    newCatalogItem.unit = unit;
    newCatalogItem.display_step = `кратность ${step} ${unit}`;

    catalog.push(newCatalogItem);
    ensureUserAddedCategoryOnSuppliers();

    const pendingAdded = loadPendingUserList(USER_ADDED_CACHE_KEY);
    pendingAdded.push({
      id: newId,
      name,
      subcat: rawCat,
      pack: packStr,
      supplier: activeSupplier,
      store: activeStore,
      ts: Date.now()
    });
    savePendingUserList(USER_ADDED_CACHE_KEY, pendingAdded);

    order[newId] = Math.round(((order[newId] || 0) + qty) * 1000) / 1000;
    saveState();
    try {
      localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(catalog));
      localStorage.setItem(SUPPLIERS_CACHE_KEY, JSON.stringify(suppliers));
    } catch (cacheErr) {
      console.warn('Catalog cache save notice:', cacheErr);
    }

    syncCustomItemToAppsScript('addCustomItem', {
      itemId: newId,
      itemName: name,
      subcat: rawCat,
      pack: packStr,
      supplier: currentSup.name || activeSupplier,
      store: activeStore
    });

    if (nameEl) nameEl.value = '';
    if (catEl) catEl.value = '';
    if (qtyEl) qtyEl.value = '1';
    if (saveCheckEl) saveCheckEl.checked = false;

    showToast(`✅ «${name}» сохранён в базу и добавлен в заказ (${qty} ${unit})`);
    renderSupplierNav();
    renderCategoryTabs();
    renderCatalog();
    updateOrderBar();
    return;
  }

  const cat = rawCat || 'Свободный ввод';
  const newItem = {
    id: `manual_${Date.now()}`,
    name,
    category: cat,
    supplier: activeSupplier,
    quantity: qty,
    unit: unit,
    step: unit === 'кг' ? 0.5 : 1
  };

  manualItems.push(newItem);
  saveState();
  showToast(`Добавлено: ${name} (${qty} ${unit})`);
  renderSupplierNav();
  renderCategoryTabs();
  renderCatalog();
  updateOrderBar();
}

function confirmDeleteCustomItem(itemId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const item = catalog.find(i => i.id === itemId);
  if (!item) return;

  openConfirmDialog(
    'Удалить из базы?',
    `Удалить товар «${item.name}» из вкладки «Добавлены пользователем» и Google Таблицы для всех магазинов?`,
    () => deleteCustomItemFromBase(item.id),
    'Удалить'
  );
}

function deleteCustomItemFromBase(itemId) {
  const item = catalog.find(i => i.id === itemId);
  if (!item) return;

  const sup = getSupplierById(item.supplier);
  catalog = catalog.filter(i => i.id !== itemId);

  if (order[itemId]) {
    delete order[itemId];
  }

  let favChanged = false;
  STORES.forEach(s => {
    if (storeFavorites[s] && storeFavorites[s].delete(itemId)) favChanged = true;
  });
  if (privateFavorites && privateFavorites.delete(itemId)) favChanged = true;
  if (favChanged) saveFavorites();

  const pendingAdded = loadPendingUserList(USER_ADDED_CACHE_KEY).filter(p => p.id !== itemId && String(p.name || '').trim().toLowerCase() !== item.name.trim().toLowerCase());
  savePendingUserList(USER_ADDED_CACHE_KEY, pendingAdded);

  const pendingDeleted = loadPendingUserList(USER_DELETED_CACHE_KEY);
  pendingDeleted.push({ id: item.id, name: item.name, ts: Date.now() });
  savePendingUserList(USER_DELETED_CACHE_KEY, pendingDeleted);

  if (Array.isArray(liveCustomItemsCache)) {
    liveCustomItemsCache = liveCustomItemsCache.filter(s => s && s.id !== item.id && String(s.name || '').trim().toLowerCase() !== item.name.trim().toLowerCase());
  }

  saveState();
  try {
    localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(catalog));
  } catch (e) {
    console.warn('Catalog cache save notice:', e);
  }

  syncCustomItemToAppsScript('deleteCustomItem', {
    itemId: item.id,
    itemName: item.name,
    supplier: sup.name || item.supplier
  });

  renderStorePills();
  updateFavBadge();
  renderSupplierNav();
  renderCategoryTabs();
  renderCatalog();
  updateOrderBar();
  showToast(`🗑️ «${item.name}» удалён из базы`);
}

function attachManualEvents(container) {
  container.querySelectorAll('[data-action^="manual-"]').forEach(el => {
    el.addEventListener('click', () => {
      const action = el.getAttribute('data-action');
      const id = el.getAttribute('data-id');
      const item = manualItems.find(i => i.id === id);
      if (!item) return;

      if (action === 'manual-plus') {
        item.quantity = Math.round((item.quantity + item.step) * 10) / 10;
      } else if (action === 'manual-minus') {
        if (item.quantity <= item.step) {
          manualItems = manualItems.filter(i => i.id !== id);
        } else {
          item.quantity = Math.round((item.quantity - item.step) * 10) / 10;
        }
      } else if (action === 'manual-del') {
        manualItems = manualItems.filter(i => i.id !== id);
      } else if (action === 'manual-prompt') {
        openQuantityPrompt(item.name, item.quantity, item.unit, (newVal) => {
          if (newVal <= 0) {
            manualItems = manualItems.filter(i => i.id !== id);
          } else {
            item.quantity = newVal;
          }
          saveState();
          renderCatalog();
          renderSupplierNav();
          updateOrderBar();
        });
        return;
      }

      saveState();
      renderCatalog();
      renderSupplierNav();
      updateOrderBar();
    });
  });
}

// Format Quantity Helper
function formatQty(qty, unit) {
  if (!qty || qty === 0) return '0';
  return `${qty} ${unit}`;
}

// Calculate Total Order Statistics (Scoped to a Supplier or All)
function getOrderTotals(supplierId = activeSupplier) {
  let count = 0;
  let totalKg = 0;
  let totalBuckets = 0;
  let totalPieces = 0;

  for (const [id, qty] of Object.entries(order)) {
    if (qty > 0) {
      const item = catalog.find(i => i.id === id);
      if (!item) continue;
      if (supplierId && item.supplier !== supplierId) continue;

      count++;
      if (item.unit === 'кг') {
        totalKg += qty;
      } else if (item.name.toLowerCase().includes('ведро')) {
        totalBuckets += qty;
      } else {
        totalPieces += qty;
      }
    }
  }

  manualItems.forEach(it => {
    if (it.quantity > 0) {
      if (supplierId && (it.supplier || 'snacks') !== supplierId) return;

      count++;
      if (it.unit === 'кг') {
        totalKg += it.quantity;
      } else if (it.name.toLowerCase().includes('ведро')) {
        totalBuckets += it.quantity;
      } else {
        totalPieces += it.quantity;
      }
    }
  });

  return {
    count,
    totalKg: Math.round(totalKg * 100) / 100,
    totalBuckets: Math.round(totalBuckets * 100) / 100,
    totalPieces: Math.round(totalPieces * 100) / 100
  };
}

// Update Floating Order Bar
function updateOrderBar() {
  const bar = document.getElementById('floatingOrderBar');
  const countEl = document.getElementById('orderBarCount');
  const totalEl = document.getElementById('orderBarTotal');
  if (!bar) return;

  const currentSup = getSupplierById(activeSupplier);
  const totals = getOrderTotals(activeSupplier);

  // Check if other suppliers also have active orders
  const otherActiveSups = suppliers
    .filter(s => s.id !== activeSupplier && getOrderTotals(s.id).count > 0);

  if (totals.count > 0 || otherActiveSups.length > 0) {
    bar.classList.add('visible');

    if (totals.count > 0) {
      countEl.textContent = `[${currentSup.shortName}]: ${totals.count} поз.`;

      const parts = [];
      if (totals.totalKg > 0) parts.push(`${totals.totalKg} кг`);
      if (totals.totalBuckets > 0) parts.push(`${totals.totalBuckets} ведер`);
      if (totals.totalPieces > 0) parts.push(`${totals.totalPieces} шт/кор`);

      let totalStr = parts.join(' • ') || `${totals.count} поз.`;
      if (otherActiveSups.length > 0) {
        const otherStr = otherActiveSups.map(s => `${s.icon} ${getOrderTotals(s.id).count}`).join(' ');
        totalStr += ` | др: ${otherStr}`;
      }
      totalEl.textContent = totalStr;
    } else {
      countEl.textContent = `В [${currentSup.shortName}] пусто`;
      const otherStr = otherActiveSups.map(s => `${s.icon} ${s.shortName}: ${getOrderTotals(s.id).count} поз.`).join(', ');
      totalEl.textContent = otherStr;
    }
  } else {
    bar.classList.remove('visible');
  }
}

// Acronyms and special words to preserve in uppercase
const ORDER_ACRONYMS = new Set(['БГ', 'СГ', 'ИП-30', 'КР-7', 'РК-19', 'РК-20', 'РКС-350', 'Ж/С', 'ЖС', 'BBQ', 'CHEE', 'CORN', 'ИПР']);
const ORDER_PREPOSITIONS = new Set(['и', 'в', 'во', 'с', 'со', 'на', 'по', 'под', 'из', 'от', 'к', 'ко', 'о', 'об', 'для', 'без']);

const KNOWN_ORDER_SERIES_PREFIXES = [
  // Гренки Весовые и Сухари
  [/^ВЕДРО ЮБИЛЕЙНЫЕ(?:\s+|$)/i, 'Ведро Юбилейные'],
  [/^Гренки\s+пшеничные\s+Лутовские(?:\s+|$)/i, 'Гренки пшеничные Лутовские'],
  [/^Гренки\s+ржаные\s+Лутовские(?:\s+|$)/i, 'Гренки ржаные Лутовские'],
  [/^Гренки\s+Бро(?:\s+|$)/i, 'Гренки Бро'],
  [/^Гренки\s+Снапсы(?:\s+пшенич\.?)?(?:\s+|(?=["«])|$)/i, 'Гренки Снапсы'],
  [/^Сухари\s+Демидовские(?:\s+|$)/i, 'Сухари Демидовские'],
  [/^Сухари\s+Житницкие(?:\s+багет)?(?:\s+|$)/i, 'Сухари Житницкие'],
  [/^Сухари(?=\s+["«])(?:\s+|$)/i, 'Сухари'],
  // Сырные Сухие и Сыры
  [/^Шарики(?=\s+(?:БЕКОН|МИКС|ОРИГИНАЛЬНЫЕ|ПАРМЕЗАН|ТАЙСКИЙ))(?:\s+|$)/i, 'Сырные шарики'],
  [/^САНККИНО\s+БОЧОНОК(?:\s+|$)/i, 'Санккино Бочонок'],
  [/^САНККИНО\s+Спагетти(?:\s+|$)/i, 'Санккино Спагетти'],
  [/^САНККИНО\s+Балыковый(?:\s+|$)/i, 'Санккино Балыковый'],
  [/^САНККИНО\s+Коса(?:\s+|$)/i, 'Санккино Коса'],
  [/^ФЕРМЕРСКИЙ\s+Спагетти(?:\s+|$)/i, 'Фермерский Спагетти'],
  [/^ФЕРМЕРСКИЙ\s+БОЧОНОК(?:\s+|$)/i, 'Фермерский Бочонок'],
  [/^ФЕРМЕРСКИЙ\s+Балыковый(?:\s+|$)/i, 'Фермерский Балыковый'],
  [/^ФЕРМЕРСКИЙ\s+Коса(?:\s+|$)/i, 'Фермерский Коса'],
  [/^ДОНДУКОВСКИЙ(?:\s+|$)/i, 'Дондуковский'],
  [/^Сыр\s+жареный(?:\s+|$)/i, 'Сыр жареный'],
  // Гренки, Чипсы и снеки ЗАВОДСКИЕ
  [/^Гренки\s+Сурские(?:\s+|$)/i, 'Гренки Сурские'],
  [/^Чипсы\s+Бингре(?:\s+|$)/i, 'Чипсы Бингре'],
  [/^Чипсы\s+Bruto(?:\s+\(рифлёные\))?(?:\s+|$)/i, 'Чипсы Bruto'],
  [/^Картошка\s+["«]?Bruto["»]?(?:\s+|$)/i, 'Картошка Bruto'],
  [/^КОРНЕЛЛИ\s+кукурузные\s+сухари(?:\s+|$)/i, 'Корнелли сухари'],
  [/^Морская\s+капуста(?:\s+|$)/i, 'Морская капуста'],
  [/^Семечки\s+от\s*["«]?МАРТИНА["»]?(?:\s*\d+\s*г(?:р)?\*\d+(?:\s*шт\.?)?)?(?:\s+|$)/i, 'Семечки От Мартина'],
  // Орехи, Начос, Соусы
  [/^Арахис в хруст\.корочке ФомаЛукич(?:\s+|$)/i, 'Арахис ФомаЛукич'],
  [/^Арахис ж\/?с\s+ХРУСТЯЩИЙ(?:\s+|$)/i, 'Арахис Хрустящий (Премиум)'],
  [/^Арахис\s+ж\/?с(?:\s+|$)/i, 'Арахис ж/с'],
  [/^КУКУРУЗА\s+жареная(?:\s+со\s+вкусом)?(?:\s+|$)/i, 'Кукуруза жареная'],
  [/^Фисташк[аи](?:\s+со\s+вкусом)?(?:\s+|$)/i, 'Фисташки'],
  [/^Кешью(?:\s+ж\/?с)?(?:\s+|$)/i, 'Кешью'],
  [/^Миндаль(?:\s+ж\/?с)?(?:\s+|$)/i, 'Миндаль'],
  [/^Чипсы\s+из\s+лаваша(?:\s+|$)/i, 'Чипсы из лаваша'],
  [/^Чипсы кукурузные\s+["«]?Начос["»]?(?:\s+|$)/i, 'Чипсы Начос'],
  [/^Соус(?:\s+|$)/i, 'Соус'],
  // Pringles
  [/^МИНИ\s+(?:Принглс|Pringles)(?:\s+|$)/i, 'МИНИ Принглс'],
  [/^(?:Принглс|Pringles)(?:\s+|$)/i, 'Принглс'],
  // Мясные и Мясные ЗАВОД
  [/^Кнуты(?:\s+|$)/i, 'Кнуты'],
  [/^Колбаски\s+с\/к(?:\s+|$)/i, 'Колбаски с/к'],
  [/^МЯСНЫЕ\s+чипсы(?:\s+|$)/i, 'Мясные чипсы Орёл'],
  [/^Чипсы\s+мясные(?:\s+|$)/i, 'Чипсы мясные'],
  [/^Мясо\s+Рыцарское(?:\s+|$)/i, 'Мясо Рыцарское'],
  [/^Свиные\s+ушки(?:\s+|$)/i, 'Свиные ушки'],
  [/^УХО\s+целое(?:\s+|$)/i, 'Ухо целое'],
  // Рыбные серии (остальные, включая Кальмар/Мясо краба/Пяточки и Минтай/Лизун, группируются через parseSimilarProductGroup)
  [/^Икра(?:\s+|$)/i, 'Икра'],
  [/^Палочки(?:\s+|$)/i, 'Рыбные палочки'],
  [/^Паутинка(?:\s+|$)/i, 'Паутинка'],
  [/^Слайсы(?:\s+|$)/i, 'Слайсы'],
  [/^Камбал[аик]+(?:\s+|$)/i, 'Камбала'],
  [/^Креветк[аи](?:\s+|$)/i, 'Креветки']
];

function cleanOrderCasingWord(w, isFirst = false, isSubpart = false) {
  if (!w) return '';
  const leadMatch = w.match(/^([("«]+)(.*)$/);
  if (leadMatch) {
    const prefix = leadMatch[1];
    const rest = leadMatch[2];
    if (!rest) return prefix;
    return prefix + cleanOrderCasingWord(rest, isFirst || prefix.includes('('), isSubpart);
  }
  const trailMatch = w.match(/^(.*?)([)"».,:;!?]+)$/);
  if (trailMatch && trailMatch[1]) {
    return cleanOrderCasingWord(trailMatch[1], isFirst, isSubpart) + trailMatch[2];
  }
  if (ORDER_ACRONYMS.has(w) || ORDER_ACRONYMS.has(w.toUpperCase())) {
    return w.toUpperCase();
  }
  if (w.includes('-')) {
    const parts = w.split('-');
    return parts.map((p, i) => cleanOrderCasingWord(p, isFirst && i === 0, i > 0)).join('-');
  }
  const lower = w.toLowerCase();
  if (isSubpart) {
    return lower;
  }
  if (ORDER_PREPOSITIONS.has(lower) && !isFirst) {
    return lower;
  }
  if (isFirst || w === w.toUpperCase()) {
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return w;
}

function formatOrderCleanText(s) {
  if (!s) return '';
  s = s.replace(/["«»]/g, '').trim().replace(/\s+/g, ' ');
  const words = s.split(' ');
  const out = words.map((w, i) => cleanOrderCasingWord(w, i === 0));
  return out.join(' ').replace(/\s+([,.:])/g, '$1');
}

function stripTrailingPackUnits(str, keepGrams = false) {
  let res = String(str || '').replace(/\s+/g, ' ').trim();
  for (let i = 0; i < 4; i++) {
    const prev = res;
    res = res.replace(/(?:\d+\s*)?\*\s*\d+\s*(?:шт\.?)?(?:[\s,]+(?:шт|кор))?$/i, '').trim();
    if (!keepGrams) {
      res = res.replace(/(?:^|[\s,\-–—]+|\.)(?:\d+[.,]\d+|\d+)\s*(?:кг|г|гр|мл|л)\.?(?:\s*,?\s*(?:шт|кор)\.?)?$/i, (m) => m.startsWith('.') ? '.' : '').trim();
    } else {
      res = res.replace(/(\d+)\s*гр\.?(?:\s*,?\s*(?:шт|кор)\.?)?$/i, '$1 г').trim();
    }
    res = res.replace(/[\s,]+(?:шт|кор|набор|уп|кг)\.?$/i, '').trim();
    if (res === prev) break;
  }
  return res;
}

function cleanOrderFlavor(s, cleanBase = '') {
  if (!s) return '';
  const keepGrams = cleanBase === 'Картошка Bruto' || cleanBase === 'Семечки От Мартина';
  s = stripTrailingPackUnits(s, keepGrams);
  s = s.replace(/^со\s+вкусом\s+/i, '');
  s = s.replace(/["«»]/g, '').trim().replace(/\s+/g, ' ');
  if (/^\([^()]+\)$/.test(s)) {
    s = s.slice(1, -1).trim();
  }
  if (cleanBase === 'Мясные чипсы Орёл') {
    s = s.replace(/(?:^|\s)Орёл(?=$|\s)/gi, ' ').trim();
  } else if (cleanBase === 'Чипсы мясные') {
    s = s.replace(/(?:^|\s)\d+\s*гр\.?(?=$|\s)/gi, ' ').trim();
  } else if (cleanBase === 'Соус') {
    s = s.replace(/(?:^|\s)\d+\s*гр\.?(?=$|\s)/gi, ' ').trim();
    s = s.replace(/гаукомоле/gi, 'гуакамоле');
  } else if (cleanBase === 'Сырные шарики' || cleanBase === 'Сыр жареный') {
    s = s.replace(/(?:^|\s)0[.,]5\s*кг(?=$|\s)/gi, ' ').trim();
  }
  s = stripTrailingPackUnits(s, keepGrams);
  if (/^\([^()]+\)$/.test(s)) {
    s = s.slice(1, -1).trim();
  }
  s = s.replace(/([а-яА-ЯёЁ]{3,})\/([а-яА-ЯёЁ]{3,})/g, '$1 / $2');
  s = s.replace(/\s+/g, ' ').trim();
  const words = s.split(' ').filter(Boolean);
  const out = words.map((w, i) => cleanOrderCasingWord(w, i === 0));
  return out.join(' ').replace(/\s+([,.:])/g, '$1');
}


// Universal Peanut Glaze Normalizer & Flavor Extractor
function parsePeanutGlazed(name) {
  let s = String(name || '').trim();
  s = s.replace(/(?:[\s,\-–—]+(?:\d+[.,]\d+|\d+)\s*(?:кг|г|гр|мл|л)\.?(?:\s*,?\s*шт\.?)?|[\s,\-–—]+шт\.?)$/i, '');
  s = s.replace(/["«»]/g, '').trim().replace(/\s+/g, ' ');

  const lower = s.toLowerCase();
  if (!lower.includes('арахис')) {
    return null;
  }

  // Explicitly exclude fried salted (ж/с, жс)
  if (lower.includes('ж/с') || lower.includes('жс')) {
    return null;
  }

  let isGlazed = false;
  let flavorPart = s;

  if (lower.includes('в глазури')) {
    isGlazed = true;
    flavorPart = s.replace(/^.*?в\s+глазури\s*/i, '');
  } else if (lower.includes('в хруст.корочке') || lower.includes('в хрустящей корочке') || lower.includes('в хруст. корочке')) {
    isGlazed = true;
    flavorPart = s.replace(/^.*?в\s+хруст(?:ящей|\.)\s*корочке\s*/i, '');
  }

  if (!isGlazed) {
    return null;
  }

  // Strip brand prefixes or suffixes (e.g. Averton, ФомаЛукич, Сильвер)
  flavorPart = flavorPart.replace(/(?:^|\s+)(?:Averton|ФомаЛукич|Сильвер)(?:\s+|$)/gi, ' ').trim();
  flavorPart = flavorPart.replace(/^со\s+вкусом\s+/i, '').trim();
  flavorPart = flavorPart.replace(/(?:[\s,\-–—]+(?:\d+[.,]\d+|\d+)\s*(?:кг|г|гр|мл|л)\.?(?:\s*,?\s*шт\.?)?|[\s,\-–—]+шт\.?)$/i, '').trim();

  // Clean casing of flavor words
  const words = flavorPart.split(' ').filter(Boolean);
  const cleanWords = words.map((w, i) => {
    const l = w.toLowerCase();
    if (i === 0) {
      return l.charAt(0).toUpperCase() + l.slice(1);
    }
    if (l.includes('-')) {
      const parts = l.split('-');
      return parts.map((p, idx) => idx === 0 ? (p.charAt(0).toUpperCase() + p.slice(1)) : p).join('-');
    }
    if (['с', 'и', 'в', 'на', 'со'].includes(l)) {
      return l;
    }
    return l;
  });

  const cleanFlavor = cleanWords.join(' ');
  if (!cleanFlavor) return null;

  return {
    brand: 'Арахис в глазури',
    flavor: cleanFlavor,
    normalizedName: `Арахис в глазури ${cleanFlavor}`
  };
}

// Dynamic catalog processor: normalizes peanut names and deduplicates identical flavors
function processCatalogWithPeanutOptimization(catalogItems) {
  if (!Array.isArray(catalogItems)) return catalogItems;
  const seenPeanutFlavors = new Map();
  const result = [];

  for (const it of catalogItems) {
    if (it && it.name && (it.category === 'Орехи' || (!it.category && it.name.toLowerCase().includes('арахис')))) {
      const peanutInfo = parsePeanutGlazed(it.name);
      if (peanutInfo) {
        const flavorKey = peanutInfo.flavor.toLowerCase();
        if (!seenPeanutFlavors.has(flavorKey)) {
          const updated = {
            ...it,
            name: peanutInfo.normalizedName,
            peanutFlavor: peanutInfo.flavor,
            isPeanutGlazed: true
          };
          seenPeanutFlavors.set(flavorKey, updated);
          result.push(updated);
        } else {
          // Merge duplicate flavor into existing item aliases
          const primary = seenPeanutFlavors.get(flavorKey);
          if (!primary.aliases) primary.aliases = [];
          primary.aliases.push(it.id);
        }
        continue;
      }
    }
    result.push(it);
  }

  return result;
}

// Unify similar products into shared groups regardless of word order or manufacturer
function parseSimilarProductGroup(s, category = '') {
  const lower = s.toLowerCase();
  const isFish = category === 'Рыбные' || !category;

  // 1. Squid & squid-based snacks in Рыбные ("Кальмар", "Мясо краба", "Пяточки кальмара", "Вкусовые пяточки")
  if (
    isFish && (
      lower.includes('кальмар') ||
      lower.includes('мясо краба') ||
      lower.includes('вкусовые пяточки')
    )
  ) {
    let rest = stripTrailingPackUnits(s, false);
    if (/^Кальмар\s+/i.test(rest)) {
      rest = rest.replace(/^Кальмар\s+/i, '').trim();
    } else if (/^ПЯТОЧКИ\s+КАЛЬМАРА\s+/i.test(rest)) {
      rest = 'Пяточки ' + rest.replace(/^ПЯТОЧКИ\s+КАЛЬМАРА\s+/i, '').trim();
    }
    const flavor = cleanOrderFlavor(rest, 'Кальмар');
    if (flavor) {
      return { brand: 'Кальмар', flavor: flavor, fullName: `Кальмар: ${flavor}` };
    }
  }

  // 2. Pollock & Cod ("Минтай", "Морской лизун", "Соломка Минтая (Лизун)", "Филе трески/Рваный минтай"), excluding "Икра минтая"
  if (isFish && !/^икра\s+/i.test(lower) && (lower.includes('минта') || lower.includes('лизун') || lower.includes('треск'))) {
    const flavor = cleanOrderFlavor(s, 'Минтай');
    if (flavor) {
      return { brand: 'Минтай', flavor: flavor, fullName: `Минтай: ${flavor}` };
    }
  }

  // 3. Polosatik ("Желтый полосатик", "Императорский полосатик", etc.)
  if (isFish && lower.includes('полосатик')) {
    const flavor = cleanOrderFlavor(s, 'Полосатик');
    if (flavor) {
      return { brand: 'Полосатик', flavor: flavor, fullName: `Полосатик: ${flavor}` };
    }
  }

  // 3b. Baked-in-sauce / Premium peanuts in Орехи -> "Арахис Хрустящий (Премиум)"
  if (
    (category === 'Орехи' || !category) &&
    lower.includes('арахис') &&
    !lower.includes('глазур') &&
    !lower.includes('корочк') &&
    (lower.includes('запеч') || lower.includes('в соусе') || (lower.includes('премиум') && !lower.includes('хруст')))
  ) {
    let rest = stripTrailingPackUnits(s, false).replace(/^Арахис(?:\s+ж\/?с)?\s+/i, '').trim();
    const flavor = cleanOrderFlavor(rest || s, 'Арахис Хрустящий (Премиум)');
    if (flavor) {
      return { brand: 'Арахис Хрустящий (Премиум)', flavor: flavor, fullName: `Арахис Хрустящий (Премиум): ${flavor}` };
    }
  }

  // 4. Fish chips ("Чипсы Икряные ...", "Чипсы Сёмги")
  if (category === 'Рыбные' && /^Чипсы(?:\s+|$)/i.test(lower)) {
    const flavor = cleanOrderFlavor(s, 'Рыбные чипсы');
    if (flavor) {
      return { brand: 'Рыбные чипсы', flavor: flavor, fullName: `Рыбные чипсы: ${flavor}` };
    }
  }

  return null;
}

function parseOrderPosition(rawName, category = '') {
  if (!rawName) {
    return { brand: null, flavor: '', fullName: '' };
  }
  let s = String(rawName).trim();

  if (category === USER_ADDED_SHEET_NAME) {
    const trimmed = s.replace(/\s+/g, ' ').trim();
    return { brand: null, flavor: trimmed, fullName: trimmed };
  }

  // 1. Preserve technical tare specs in Consumables & Containers (e.g. ИПР, 350гр, мокрые)
  if (category === 'Контейнеры' || category === 'Расходники') {
    s = s.replace(/[\s,\-–—]+шт\.?$/i, '').trim();
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return { brand: null, flavor: s, fullName: s };
  }

  // 1c. Direct match on "Арахис Ж/С" without flavor -> flavor is "Соль"
  if (/^Арахис\s+ж\/?с(?:\s+соль)?$/i.test(s.replace(/(?:[\s,\-–—]+(?:\d+[.,]\d+|\d+)\s*(?:кг|г|гр|мл|л)\.?(?:\s*,?\s*шт\.?)?|[\s,\-–—]+шт\.?)?$/i, '').trim())) {
    return { brand: 'Арахис ж/с', flavor: 'Соль', fullName: 'Арахис ж/с: Соль' };
  }

  // 1b. Dynamic Peanut in Glaze detection (without brands, unified under "Арахис в глазури")
  const peanutGlazed = parsePeanutGlazed(s);
  if (peanutGlazed) {
    return {
      brand: peanutGlazed.brand,
      flavor: peanutGlazed.flavor,
      fullName: `${peanutGlazed.brand}: ${peanutGlazed.flavor}`
    };
  }

  // 2. Snack cleanup: normalize whitespace, strip legal boilerplates, then match series before parens/quotes
  s = s.replace(/\s+/g, ' ').replace(/\s+,/g, ',').trim();
  s = s.replace(/\(продукт белково-жировой\)/gi, '');
  s = s.replace(/\(уп\)/gi, '');
  s = s.replace(/от"([^"]+)"/g, 'от $1');
  s = s.trim().replace(/\s+/g, ' ');

  // 2b. Unify similar items (e.g. crab meat / пяточки -> Кальмар, Лизун -> Минтай, Полосатик)
  const similarGroup = parseSimilarProductGroup(s, category);
  if (similarGroup) {
    return similarGroup;
  }

  // 3. Known series prefixes FIRST so quotes/parentheses inside series don't fracture them
  for (const [pattern, cleanBase] of KNOWN_ORDER_SERIES_PREFIXES) {
    const match = s.match(pattern);
    if (match) {
      const flavorRaw = s.slice(match[0].length).trim();
      let finalFlavorRaw = stripTrailingPackUnits(flavorRaw, cleanBase === 'Картошка Bruto' || cleanBase === 'Семечки От Мартина');
      if (!finalFlavorRaw) {
        if (cleanBase === 'Арахис ж/с') finalFlavorRaw = 'Соль';
        else if (cleanBase === 'Кешью') finalFlavorRaw = 'Ж/с';
        else if (cleanBase === 'Миндаль') finalFlavorRaw = 'Ж/с';
      }
      if (finalFlavorRaw) {
        let flavor = cleanOrderFlavor(finalFlavorRaw, cleanBase);
        if (cleanBase === 'Гренки Снапсы') {
          flavor = flavor.replace(/Маринов\.\s*огурцы/i, 'Маринов. огурцы');
        }
        return { brand: cleanBase, flavor: flavor, fullName: `${cleanBase}: ${flavor}` };
      }
    }
  }

  s = stripTrailingPackUnits(s, false);

  // 4. Flavor in parentheses at the end (skip Рыбные and descriptive lists like "(кешью, миндаль, арахис)")
  const mParen = s.match(/^(.*?)\s*\(([^)]+)\)$/);
  if (mParen && category !== 'Рыбные' && !mParen[2].includes(',')) {
    const base = formatOrderCleanText(mParen[1].trim());
    const flavor = cleanOrderFlavor(mParen[2].trim());
    return { brand: base, flavor: flavor, fullName: `${base}: ${flavor}` };
  }

  // 5. Flavor in quotes at the end: 'Гренки СНАПСЫ "ТОМАТ-БАЗИЛИК"' or 'Сухари "АДЖИКА"'
  const mQuote = s.match(/^(.*?)\s*["«]([^"»]+)["»]$/);
  if (mQuote) {
    const base = formatOrderCleanText(mQuote[1].trim());
    const flavor = cleanOrderFlavor(mQuote[2].trim());
    return { brand: base, flavor: flavor, fullName: `${base}: ${flavor}` };
  }

  // 6. Standalone clean name
  const cleanStandalone = formatOrderCleanText(s);
  return { brand: null, flavor: cleanStandalone, fullName: cleanStandalone };
}

// Clean redundant price-list suffixes for order text messages and Excel export
function cleanOrderPositionName(name, category = '') {
  return parseOrderPosition(name, category).fullName;
}

// Generate WhatsApp / Telegram Order Text for a Specific Supplier
function generateOrderText(supplierId = modalActiveSupplier) {
  const sup = getSupplierById(supplierId);
  const totals = getOrderTotals(supplierId);
  const dateStr = new Date().toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const grouped = {};

  for (const [id, qty] of Object.entries(order)) {
    if (qty > 0) {
      const it = catalog.find(i => i.id === id);
      if (!it || it.supplier !== supplierId) continue;
      const cat = it.category || 'Прочее';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({
        name: it.name,
        qty: qty,
        unit: it.unit,
        category: cat,
        parsed: parseOrderPosition(it.name, cat)
      });
    }
  }

  const supManual = manualItems.filter(m => (m.supplier || 'snacks') === supplierId);
  if (supManual.length > 0) {
    const key = '✏️ Дополнительно (вручную)';
    grouped[key] = supManual.map(it => ({
      name: it.name,
      qty: it.quantity,
      unit: it.unit,
      category: key,
      parsed: parseOrderPosition(it.name, key)
    }));
  }

  let text = `🏪 МАГАЗИН: ${activeStore.toUpperCase()}\n`;
  text += `📦 ЗАКАЗ: ${sup.name.toUpperCase()}\n`;
  text += `📅 Дата: ${dateStr}\n`;
  text += `------------------------------------\n\n`;

  for (const [catName, items] of Object.entries(grouped)) {
    const meta = CATEGORY_META[catName];
    const icon = meta ? meta.icon : '🔹';
    const title = meta ? meta.label : catName;
    text += `${icon} ${title.toUpperCase()}:\n`;

    // Group items by brand within category
    const brandGroups = new Map();
    items.forEach((it, idx) => {
      const brandKey = it.parsed.brand || `__standalone_${idx}`;
      if (!brandGroups.has(brandKey)) {
        brandGroups.set(brandKey, []);
      }
      brandGroups.get(brandKey).push(it);
    });

    // Sort items within category using unified key
    items.sort(compareCatalogItems);

    for (const [brandKey, bItems] of brandGroups.entries()) {
      // Sort flavors alphabetically within brand group
      bItems.sort((a, b) => CATALOG_COLLATOR.compare(a.parsed.flavor || '', b.parsed.flavor || ''));
      const isBrandGroup = !brandKey.startsWith('__standalone_') && bItems.length > 1;
      if (isBrandGroup) {
        text += `• ${brandKey}:\n`;
        bItems.forEach(it => {
          text += `   – ${it.parsed.flavor} — ${it.qty} ${it.unit}\n`;
        });
      } else {
        const it = bItems[0];
        text += `• ${it.parsed.fullName} — ${it.qty} ${it.unit}\n`;
      }
    }

    text += `\n`;
  }

  text += `------------------------------------\n`;
  const parts = [];
  if (totals.totalKg > 0) parts.push(`Вес: ${totals.totalKg} кг`);
  if (totals.totalBuckets > 0) parts.push(`Ведра: ${totals.totalBuckets} шт`);
  if (totals.totalPieces > 0) parts.push(`Штучный: ${totals.totalPieces} шт/кор`);

  text += `📊 ИТОГО: ${totals.count} поз. | ${parts.join(' | ')}`;

  return text;
}

// Open Order Drawer Modal with Supplier Switcher
function openOrderModal() {
  const modal = document.getElementById('orderModal');
  if (!modal) return;

  // Open with active supplier initially
  modalActiveSupplier = activeSupplier;
  renderOrderModalContent();
  modal.classList.add('active');
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  if (modal) modal.classList.remove('active');
}

function switchModalSupplier(supId) {
  modalActiveSupplier = supId;
  renderOrderModalContent();
}

// Render Content Inside Order Modal Drawer
function renderOrderModalContent() {
  const body = document.getElementById('orderModalBody');
  if (!body) return;

  const currentSup = getSupplierById(modalActiveSupplier);
  const totals = getOrderTotals(modalActiveSupplier);

  // Supplier Switcher Tabs in Cart
  const supplierTabsHtml = `
    <div class="modal-supplier-nav">
      ${suppliers.map(s => {
    const sTotals = getOrderTotals(s.id);
    const isActive = s.id === modalActiveSupplier ? 'active' : '';
    const badgeClass = sTotals.count > 0 ? 'has-items' : '';
    return `
          <button class="modal-sup-tab ${isActive}" onclick="switchModalSupplier('${s.id}')">
            <span>${s.icon}</span>
            <span>${escapeHtml(s.shortName)}</span>
            <span class="badge ${badgeClass}">${sTotals.count}</span>
          </button>
        `;
  }).join('')}
    </div>
  `;

  if (totals.count === 0) {
    body.innerHTML = `
      ${supplierTabsHtml}
      <div class="empty-state" style="padding: 24px 12px;">
        <p>В заказе для <strong>«${escapeHtml(currentSup.name)}»</strong> пока нет товаров.</p>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
          Выберите нужные позиции в каталоге или переключите поставщика вверху.
        </p>
      </div>
    `;
    return;
  }

  let itemsHtml = '';
  const modalCartItems = [];
  for (const [id, qty] of Object.entries(order)) {
    if (qty > 0) {
      const it = catalog.find(i => i.id === id);
      if (!it || it.supplier !== modalActiveSupplier) continue;
      modalCartItems.push({ it, qty });
    }
  }
  modalCartItems.sort((a, b) => compareCatalogItems(a.it, b.it));

  modalCartItems.forEach(({ it, qty }) => {
    const meta = CATEGORY_META[it.category] || { label: it.category };
    itemsHtml += `
        <div class="order-item-row" data-id="${it.id}">
          <div style="flex: 1; min-width: 0;">
            <div class="order-item-title">${escapeHtml(it.name)}</div>
            <div class="order-item-sub">${escapeHtml(meta.label || it.category)}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="order-item-qty">${qty} ${it.unit}</div>
            <button class="btn-icon danger" style="width: 32px; height: 32px;" onclick="removeOrderItem('${it.id}')" title="Убрать из заказа">
              ${ICONS.trash}
            </button>
          </div>
        </div>
      `;
  });

  manualItems.filter(m => (m.supplier || 'snacks') === modalActiveSupplier).forEach(it => {
    itemsHtml += `
      <div class="order-item-row" data-id="${it.id}">
        <div style="flex: 1; min-width: 0;">
          <div class="order-item-title">${escapeHtml(it.name)}</div>
          <div class="order-item-sub">Свободный ввод • ${escapeHtml(it.category || '')}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="order-item-qty">${it.quantity} ${it.unit}</div>
          <button class="btn-icon danger" style="width: 32px; height: 32px;" onclick="removeManualItem('${it.id}')" title="Убрать из заказа">
            ${ICONS.trash}
          </button>
        </div>
      </div>
    `;
  });

  const previewText = generateOrderText(modalActiveSupplier);

  body.innerHTML = `
    ${supplierTabsHtml}

    <div style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <div style="font-size: 0.82rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">
          Товары [${escapeHtml(currentSup.shortName)}] (${totals.count}):
        </div>
        <button class="btn-text-danger" onclick="confirmResetCurrentSupplier()" style="font-size: 0.75rem; background: none; border: none; color: #ef4444; cursor: pointer;">
          Очистить ${escapeHtml(currentSup.shortName)}
        </button>
      </div>
      ${itemsHtml}
    </div>

    <div style="margin-top: 18px;">
      <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 6px; text-transform: uppercase; font-weight: 700;">
        Сообщение для поставщика «${escapeHtml(currentSup.name)}»:
      </div>
      <textarea id="orderTextPreview" class="form-control" style="height: 130px; font-family: monospace; font-size: 0.8rem; line-height: 1.4; resize: none;" readonly>${escapeHtml(previewText)}</textarea>
    </div>
  `;
}

function removeOrderItem(id) {
  delete order[id];
  saveState();
  renderOrderModalContent();
  renderSupplierNav();
  updateOrderBar();
  renderCatalog();
}

function removeManualItem(id) {
  manualItems = manualItems.filter(i => i.id !== id);
  saveState();
  renderOrderModalContent();
  renderSupplierNav();
  updateOrderBar();
  renderCatalog();
}

// Universal iOS Safari / Android / Desktop Clipboard Copy Helper
async function copyTextToClipboard(text) {
  // 1. Try modern Clipboard API (works on HTTPS / localhost)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('navigator.clipboard.writeText rejected, attempting fallback:', err);
    }
  }

  // 2. Fallback using execCommand with iOS Safari range selection
  try {
    // If orderTextPreview exists in the active modal, use it directly (most reliable on iOS)
    const preview = document.getElementById('orderTextPreview');
    if (preview && preview.value === text) {
      preview.focus();
      preview.select();
      preview.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      if (ok) return true;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    // Essential attributes for iOS WebKit:
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '-9999px';
    textarea.style.fontSize = '16px'; // Prevents iOS Safari auto-zoom
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);

    const range = document.createRange();
    range.selectNodeContents(textarea);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const successful = document.execCommand('copy');
    if (selection) selection.removeAllRanges();
    document.body.removeChild(textarea);

    return !!successful;
  } catch (e) {
    console.error('execCommand fallback copy failed:', e);
    return false;
  }
}

// Copy order text for WhatsApp / Telegram
async function copyOrderToClipboard() {
  const text = generateOrderText(modalActiveSupplier);
  const sup = getSupplierById(modalActiveSupplier);
  const btn = document.getElementById('btnCopyOrder') || document.querySelector('.btn-action-primary');
  const label = btn ? btn.querySelector('.btn-copy-label') : null;

  const copied = await copyTextToClipboard(text);

  if (copied) {
    showToast(`📋 Заказ [${sup.shortName}] скопирован в буфер!`);

    // Tactile/visual feedback on button for mobile/iOS users
    if (btn) {
      btn.classList.add('copied');
      const originalText = label ? label.textContent : (btn.textContent || '');
      if (label) {
        label.textContent = '✓ Заказ скопирован в буфер!';
      }
      setTimeout(() => {
        btn.classList.remove('copied');
        if (label) label.textContent = originalText;
      }, 2500);
    }
  } else {
    // If all programmatic clipboard methods fail, focus and select textarea in drawer
    const preview = document.getElementById('orderTextPreview');
    if (preview) {
      preview.focus();
      preview.select();
      preview.setSelectionRange(0, preview.value.length);
      showToast('Текст заказа выделен — нажмите «Скопировать»', true);
    } else {
      showToast('Не удалось скопировать, выделите текст в окне', true);
    }
  }
}

// Share via Web Share API
async function shareOrder() {
  const text = generateOrderText(modalActiveSupplier);
  const sup = getSupplierById(modalActiveSupplier);
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Заказ: ${sup.name}`,
        text: text
      });
    } catch (e) {
      if (e.name !== 'AbortError') {
        copyOrderToClipboard();
      }
    }
  } else {
    copyOrderToClipboard();
  }
}

// Download Excel (.xlsx) file via SheetJS
function downloadOrderExcel() {
  if (typeof XLSX === 'undefined') {
    showToast('Библиотека Excel еще загружается...', true);
    return;
  }

  const sup = getSupplierById(modalActiveSupplier);
  const totals = getOrderTotals(modalActiveSupplier);
  if (totals.count === 0) {
    showToast(`Заказ для «${sup.shortName}» пуст!`, true);
    return;
  }

  const rows = [
    [`ЗАКАЗ [${activeStore}]: ${sup.name.toUpperCase()}`, '', '', '', ''],
    ['№', 'Категория', 'Наименование товара', 'Количество', 'Единица']
  ];

  const excelItems = [];
  for (const [id, qty] of Object.entries(order)) {
    if (qty > 0) {
      const it = catalog.find(i => i.id === id);
      if (!it || it.supplier !== modalActiveSupplier) continue;
      excelItems.push({
        category: it.category || '',
        name: cleanOrderPositionName(it.name, it.category),
        qty,
        unit: it.unit,
        rawItem: it
      });
    }
  }

  manualItems.filter(m => (m.supplier || 'snacks') === modalActiveSupplier).forEach(it => {
    excelItems.push({
      category: it.category || 'Вручную',
      name: cleanOrderPositionName(it.name, 'Вручную'),
      qty: it.quantity,
      unit: it.unit,
      rawItem: it
    });
  });

  excelItems.sort((a, b) => {
    const catComp = CATALOG_COLLATOR.compare(a.category, b.category);
    if (catComp !== 0) return catComp;
    return compareCatalogItems(a.rawItem, b.rawItem);
  });

  let num = 1;
  excelItems.forEach(it => {
    rows.push([
      num++,
      it.category,
      it.name,
      it.qty,
      it.unit
    ]);
  });

  rows.push([]);
  rows.push(['', '', 'ИТОГО ПОЗИЦИЙ:', totals.count, '']);
  if (totals.totalKg > 0) rows.push(['', '', 'ОБЩИЙ ВЕС:', totals.totalKg, 'кг']);
  if (totals.totalBuckets > 0) rows.push(['', '', 'ВСЕГО ВЕДЕР:', totals.totalBuckets, 'шт']);
  if (totals.totalPieces > 0) rows.push(['', '', 'ШТУЧНЫЙ / КОР:', totals.totalPieces, 'шт/кор']);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  ws['!cols'] = [
    { wch: 5 },
    { wch: 25 },
    { wch: 55 },
    { wch: 14 },
    { wch: 10 }
  ];

  XLSX.utils.book_append_sheet(wb, ws, `Заказ_${sup.shortName}`);

  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `Заказ_${activeStore}_${sup.shortName}_${today}.xlsx`);
  showToast(`📥 Excel для «${sup.shortName}» скачан!`);
}

// Reset current supplier order
function confirmResetCurrentSupplier() {
  const sup = getSupplierById(modalActiveSupplier);
  openConfirmDialog(
    `Очистить заказ [${sup.shortName}]?`,
    `Все выбранные товары поставщика «${sup.name}» будут удалены из заказа. Заказы других поставщиков останутся нетронутыми.`,
    () => {
      for (const id of Object.keys(order)) {
        const it = catalog.find(i => i.id === id);
        if (it && it.supplier === modalActiveSupplier) {
          delete order[id];
        }
      }
      manualItems = manualItems.filter(m => (m.supplier || 'snacks') !== modalActiveSupplier);
      saveState();
      renderOrderModalContent();
      renderSupplierNav();
      updateOrderBar();
      renderCatalog();
      showToast(`🗑️ Заказ [${sup.shortName}] очищен`);
    }
  );
}

// Reset entire order dialog
function confirmResetOrder() {
  openConfirmDialog(
    'Очистить все заказы?',
    'Будут сброшены заказы ВСЕХ поставщиков (Снеки, Расходники, Ярмарка, Пивные закуски) и все добавленные вручную позиции. Избранные товары останутся сохранёнными.',
    () => {
      order = {};
      manualItems = [];
      saveState();
      renderSupplierNav();
      renderCatalog();
      updateOrderBar();
      closeOrderModal();
      showToast('🗑️ Все заказы очищены (избранное сохранено)');
    }
  );
}

// Search Handler
function handleSearch(val) {
  searchQuery = val;
  const clearBtn = document.getElementById('searchClear');
  if (clearBtn) {
    clearBtn.style.display = val ? 'flex' : 'none';
  }
  renderCatalog();
}

function resetSearch() {
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  handleSearch('');
}

// Numeric Prompt Dialog Modal
let promptCallback = null;
function openQuantityPrompt(title, currentVal, unit, callback) {
  promptCallback = callback;
  const overlay = document.getElementById('dialogOverlay');
  const dTitle = document.getElementById('dialogTitle');
  const dDesc = document.getElementById('dialogDesc');
  const dInput = document.getElementById('dialogInput');
  const dConfirm = document.getElementById('dialogConfirm');

  dTitle.textContent = 'Количество';
  dDesc.textContent = `${title} (${unit}):`;
  dInput.value = currentVal || '';
  dInput.style.display = 'block';
  dConfirm.className = 'btn-dialog confirm';
  dConfirm.textContent = 'Сохранить';

  overlay.classList.add('active');
  setTimeout(() => dInput.focus(), 100);
}

function openConfirmDialog(title, desc, onConfirm, confirmLabel = 'Очистить') {
  promptCallback = onConfirm;
  const overlay = document.getElementById('dialogOverlay');
  const dTitle = document.getElementById('dialogTitle');
  const dDesc = document.getElementById('dialogDesc');
  const dInput = document.getElementById('dialogInput');
  const dConfirm = document.getElementById('dialogConfirm');

  dTitle.textContent = title;
  dDesc.textContent = desc;
  dInput.style.display = 'none';
  dConfirm.className = 'btn-dialog confirm-danger';
  dConfirm.textContent = confirmLabel || 'Очистить';

  overlay.classList.add('active');
}

function closeDialog() {
  const overlay = document.getElementById('dialogOverlay');
  if (overlay) overlay.classList.remove('active');
  promptCallback = null;
}

function confirmDialogAction() {
  const dInput = document.getElementById('dialogInput');
  if (promptCallback) {
    if (dInput.style.display !== 'none') {
      const val = parseFloat(dInput.value.replace(',', '.')) || 0;
      promptCallback(val);
    } else {
      promptCallback();
    }
  }
  closeDialog();
}

// Settings Modal for Google Sheet URL
function openSettingsModal() {
  const modal = document.getElementById('settingsModal');
  const input = document.getElementById('settingsSheetUrl');
  const scriptInput = document.getElementById('settingsAppsScriptUrl');
  if (input) {
    input.value = localStorage.getItem(CUSTOM_SHEET_KEY) || DEFAULT_SHEET_XLSX_URL;
  }
  if (scriptInput) {
    scriptInput.value = localStorage.getItem(APPS_SCRIPT_URL_KEY) || DEFAULT_APPS_SCRIPT_URL;
  }
  if (modal) modal.classList.add('active');
}

function closeSettingsModal() {
  const modal = document.getElementById('settingsModal');
  if (modal) modal.classList.remove('active');
}

function saveSettings() {
  const input = document.getElementById('settingsSheetUrl');
  const scriptInput = document.getElementById('settingsAppsScriptUrl');
  if (input) {
    const val = input.value.trim() || DEFAULT_SHEET_XLSX_URL;
    localStorage.setItem(CUSTOM_SHEET_KEY, val);
  }
  if (scriptInput) {
    const scriptVal = scriptInput.value.trim() || DEFAULT_APPS_SCRIPT_URL;
    localStorage.setItem(APPS_SCRIPT_URL_KEY, scriptVal);
  }
  showToast('Настройки сохранены');
  closeSettingsModal();
  syncFromGoogleSheets(true);
  syncFavoritesFromAppsScript(false);
}

// Toast Notifications
let toastTimer = null;
function showToast(msg, isError = false) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.className = `toast show ${isError ? 'error' : ''}`;

  toastTimer = setTimeout(() => {
    toast.className = 'toast';
  }, 2800);
}

// Scroll to top of catalog
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Escape HTML utility
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Search highlight utility
function highlightSearch(text, query) {
  if (!query || !query.trim()) return escapeHtml(text);
  const q = query.trim();
  const regex = new RegExp(`(${escapeRegex(q)})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark class="search-match">$1</mark>');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Setup global event listeners
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  }

  const searchClear = document.getElementById('searchClear');
  if (searchClear) {
    searchClear.addEventListener('click', resetSearch);
  }

  window.addEventListener('scroll', () => {
    const btn = document.getElementById('btnScrollTop');
    if (!btn) return;
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  const dInput = document.getElementById('dialogInput');
  if (dInput) {
    dInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        confirmDialogAction();
      } else if (e.key === 'Escape') {
        closeDialog();
      }
    });
  }

  // Close zoomed thumbnail or preview modal on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.product-thumb') && !e.target.closest('.image-preview-box')) {
      closeImagePreviewModal();
    }
  });

  // Close modals when clicking directly on backdrop
  document.querySelectorAll('.modal-overlay, .dialog-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        if (overlay.id === 'orderModal') closeOrderModal();
        else if (overlay.id === 'settingsModal') closeSettingsModal();
        else if (overlay.id === 'dialogOverlay') closeDialog();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeImagePreviewModal();
      closeOrderModal();
      closeSettingsModal();
      closeDialog();
    }
  });

  setupSheetGestures();
}

// Gesture: Swipe-to-dismiss for Order Drawer Bottom Sheet (Emil Kowalski gestures skill)
function setupSheetGestures() {
  const modal = document.getElementById('orderModal');
  if (!modal) return;
  const container = modal.querySelector('.modal-container');
  if (!container) return;

  let startY = 0;
  let currentY = 0;
  let startTime = 0;
  let isDragging = false;

  container.addEventListener('pointerdown', (e) => {
    // Never intercept drag gestures on the footer where action buttons reside
    if (e.target.closest('.modal-footer')) return;
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea')) return;

    const body = modal.querySelector('.modal-body');
    const isHeaderOrHandle = e.target.closest('.modal-drag-handle') || e.target.closest('.modal-header');
    const isBodyAtTop = body && body.scrollTop <= 0;

    if (!isHeaderOrHandle && !isBodyAtTop) return;

    startY = e.clientY;
    currentY = 0;
    startTime = Date.now();
    isDragging = true;
    container.style.transition = 'none'; // 1:1 direct tracking
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    if (deltaY > 0) {
      currentY = deltaY;
      container.style.transform = `translateY(${deltaY}px)`;
    } else {
      // Rubber-band resistance at top boundary
      const elastic = Math.pow(Math.abs(deltaY), 0.7);
      currentY = -elastic;
      container.style.transform = `translateY(${-elastic}px)`;
    }
  });

  const handlePointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    container.style.transition = ''; // restore CSS drawer curve

    const elapsedTime = Date.now() - startTime;
    const velocity = currentY / Math.max(elapsedTime, 1);

    // Dismiss on distance (>100px) or flick velocity (>0.4)
    if (currentY > 100 || velocity > 0.4) {
      closeOrderModal();
      setTimeout(() => {
        container.style.transform = '';
      }, 320);
    } else {
      container.style.transform = '';
    }
  };

  window.addEventListener('pointerup', handlePointerUp);
  window.addEventListener('pointercancel', handlePointerUp);
}

// Bootstrap application when DOM is ready
async function bootstrapApp() {
  // Enable :active pseudo-class state on iOS Safari
  document.addEventListener('touchstart', () => { }, { passive: true });
  setupGateEventListeners();
  const hasSession = checkActiveStoreSession();
  if (hasSession) {
    isAppInitialized = true;
    await initApp();
  }
}

document.addEventListener('DOMContentLoaded', bootstrapApp);
