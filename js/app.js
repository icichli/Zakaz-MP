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
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_097",
    "name": "Картошка \"Bruto\" С СОЛЬЮ 60 гр*12шт. , кор",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_098",
    "name": "КОРНЕЛЛИ кукурузные сухари ВАССАБИ 80гр*12, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_099",
    "name": "КОРНЕЛЛИ кукурузные сухари КОПЧЕНАЯ КОЛБАСКА 80гр*12, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "кор",
    "display_step": "кратность 1 кор"
  },
  {
    "id": "item_100",
    "name": "КОРНЕЛЛИ кукурузные сухари РАК УКРОП 80гр*12, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_101",
    "name": "КОРНЕЛЛИ кукурузные сухари СЫР ПРОВАНСКИЕ 80гр*12, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_102",
    "name": "КОРНЕЛЛИ кукурузные сухари ТАЙСКИЙ ПЕРЕЦ 80гр*12, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_103",
    "name": "КОРНЕЛЛИ кукурузные сухари УТКА БРУСНИКА 80гр*12, шт",
    "category": "Гренки Чипсы и снеки ЗАВОДСКИЕ",
    "supplier": "snacks",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
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
    "name": "Арахис Ж/С 1кг, шт",
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
    "name": "Соус  \"Сливочно-чесночный\" 80гр.\n Базилио",
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
    "name": "Соус \"Гаукомоле\" 90 гр., шт",
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
    "name": "САНККИНО Коса копченый , кг",
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
    "id": "item_384",
    "name": "МИНИ Принглс Горячий и Острый (Hot & Spicy), 40 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_385",
    "name": "МИНИ Принглс оригинальный, 40 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_386",
    "name": "МИНИ Принглс ПАПРИКА, 40 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_387",
    "name": "МИНИ Принглс Техасский соус BBQ, 40 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_388",
    "name": "Принглс БЕКОН, в упаковке 165 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_389",
    "name": "Принглс Оригинальный, 165 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_390",
    "name": "Принглс Паприка, 165 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_391",
    "name": "Принглс Пицца, 165 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_392",
    "name": "Принглс с ароматом ЧИЛИ И ЛАЙМА (CHILLI & LIME), Острая серия HOT, 160 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_393",
    "name": "Принглс Сметана и лук, 165 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_394",
    "name": "Принглс со вкусом Канадского Сладко - Копченого Барбекю (Canadian SWEET & SMOKY BBQ), 160 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_395",
    "name": "Принглс СОЛЬ И УКСУС, в упаковке 165 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_396",
    "name": "Принглс Сыр и лук, 165 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_397",
    "name": "Принглс Сыр, в упаковке 165 гр.",
    "category": "Pringles",
    "supplier": "pivnye_zakuski",
    "step": 1.0,
    "unit": "шт",
    "display_step": "кратность 1 шт"
  },
  {
    "id": "item_398",
    "name": "Принглс Таинственный вкус (Mystery Flavor), в упаковке 165 гр.",
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
    id: 'consumables',
    name: 'Расходники и тара',
    shortName: 'Расходники',
    icon: '🧻',
    categories: [
      'Расходники',
      'Контейнеры'
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
    id: 'pivnye_zakuski',
    name: 'Пивные закуски',
    shortName: 'Пивные закуски',
    icon: '🥔',
    categories: [
      'Pringles'
    ]
  }
];

const KNOWN_SUPPLIER_META = {
  'snacks': { name: 'Снеки и закуски', shortName: 'Снеки', icon: '🍺' },
  'consumables': { name: 'Расходники и тара', shortName: 'Расходники', icon: '🧻' },
  'yarmarka': { name: 'Ярмарка', shortName: 'Ярмарка', icon: '🎪' },
  'pivnye_zakuski': { name: 'Пивные закуски', shortName: 'Пивные закуски', icon: '🥔' }
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
  'manual': { label: 'Свободный ввод', icon: '✏️' }
};

// Application State
let catalog = [...DEFAULT_CATALOG];
let suppliers = [...DEFAULT_SUPPLIERS];
let activeSupplier = 'snacks';
let modalActiveSupplier = 'snacks';
let activeCategory = 'all';
let searchQuery = '';
let order = {}; // { itemId: quantity }
let manualItems = []; // [ { id, name, category, quantity, unit, step, supplier } ]

const CATALOG_CACHE_KEY = 'snack_catalog_cache_v8';
const SUPPLIERS_CACHE_KEY = 'snack_suppliers_cache_v8';
const ORDER_STORAGE_KEY = 'snack_order_v8';
const MANUAL_STORAGE_KEY = 'snack_manual_items_v8';
const ACTIVE_SUPPLIER_KEY = 'snack_active_supplier_v8';
const CUSTOM_SHEET_KEY = 'snack_custom_sheet_url';

const DEFAULT_SHEET_XLSX_URL = 'https://docs.google.com/spreadsheets/d/1nqOd_F-H60hE8lwObZyBhLhAHFBidV0UKkqLVvl81Ro/export?format=xlsx';

// SVG Icons helper
const ICONS = {
  trash: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  refresh: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
  copy: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  share: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
  excel: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="17"></line><line x1="16" y1="13" x2="8" y2="17"></line></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  minus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
};

// Initialize Application
async function initApp() {
  loadSavedState();
  await loadCatalog();
  setupEventListeners();
  renderSupplierNav();
  renderCategoryTabs();
  renderCatalog();
  updateOrderBar();

  // Background auto-sync on startup to load fresh photos directly from Google Sheets
  syncFromGoogleSheets(false).catch(err => {
    console.warn('Initial Google Sheets sync notice:', err);
  });
}

// LocalStorage helpers
function loadSavedState() {
  try {
    const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY) || localStorage.getItem('snack_order_v7') || localStorage.getItem('snack_order_v6') || localStorage.getItem('snack_order');
    if (savedOrder) order = JSON.parse(savedOrder);

    const savedManual = localStorage.getItem(MANUAL_STORAGE_KEY) || localStorage.getItem('snack_manual_items_v7') || localStorage.getItem('snack_manual_items_v6') || localStorage.getItem('snack_manual_items');
    if (savedManual) manualItems = JSON.parse(savedManual);

    const savedSupplier = localStorage.getItem(ACTIVE_SUPPLIER_KEY) || localStorage.getItem('snack_active_supplier_v7');
    if (savedSupplier) activeSupplier = savedSupplier;
  } catch (e) {
    console.error('Failed to load localStorage', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    localStorage.setItem(MANUAL_STORAGE_KEY, JSON.stringify(manualItems));
    localStorage.setItem(ACTIVE_SUPPLIER_KEY, activeSupplier);
  } catch (e) {
    console.error('Failed to save localStorage', e);
  }
}

// Load Catalog from cache or fallback to embedded DEFAULT_CATALOG
async function loadCatalog() {
  // Clear stale v7 cache that didn't have photo fields
  localStorage.removeItem('snack_catalog_cache_v7');
  localStorage.removeItem('snack_suppliers_cache_v7');

  const cachedCatalog = localStorage.getItem(CATALOG_CACHE_KEY);
  const cachedSuppliers = localStorage.getItem(SUPPLIERS_CACHE_KEY);

  let validCache = false;
  if (cachedCatalog) {
    try {
      const parsed = JSON.parse(cachedCatalog);
      if (Array.isArray(parsed) && parsed.length >= 350 && parsed[0].supplier !== undefined) {
        catalog = parsed;
        if (cachedSuppliers) {
          suppliers = JSON.parse(cachedSuppliers);
        }
        validCache = true;
      }
    } catch (e) {
      console.warn('Cache parse error', e);
    }
  }

  if (!validCache) {
    catalog = [...DEFAULT_CATALOG];
    suppliers = [...DEFAULT_SUPPLIERS];
  }
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
  if (nameLower.includes('ведро')) {
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

  // 5. Pure numbers (e.g. 3, 3.0, 4, 4.0, 1, 1.0)
  if (p && !isNaN(Number(p.replace(',', '.')))) {
    const num = parseFloat(p.replace(',', '.'));
    if (p === '0.5' || p === '0,5') {
      return { step: 1.0, unit: 'уп', display: 'кратность 1 уп' };
    }
    const valStr = Number.isInteger(num) ? num.toString() : num.toFixed(1);
    return { step: num, unit: 'шт', display: `кратность ${valStr} шт` };
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
  const lat = ['a','b','v','g','d','e','yo','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','kh','ts','ch','sh','shch','','y','','e','yu','ya'];
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
      catalog = parsedData.items;
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
      renderCategoryTabs();
      renderCatalog();
      updateOrderBar();
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

// Dynamic parser for multi-sheet Google Sheets workbook
function parseGoogleSheetWorkbook(wb) {
  const items = [];
  let index = 1;

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

  let sheetNames = wb.SheetNames.filter(s => s !== 'Весь ассортимент' && s !== supSheetName);

  for (const sheetName of sheetNames) {
    const ws = wb.Sheets[sheetName];
    if (!ws) continue;

    // Ensure range covers up to column G (col index 6) so column G is never cropped
    if (ws['!ref']) {
      try {
        const range = XLSX.utils.decode_range(ws['!ref']);
        if (range.e.c < 6) {
          range.e.c = 6;
          ws['!ref'] = XLSX.utils.encode_range(range);
        }
      } catch (e) {
        console.warn('Range expansion error', e);
      }
    }

    const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    if (!rows || rows.length < 2) continue;

    const header = rows[0] || [];
    let nameCol = -1;
    let packCol = -1;
    let supCol = -1;
    let photoCol = -1;

    header.forEach((col, idx) => {
      if (col === undefined || col === null) return;
      const cStr = String(col).trim();
      const cLower = cStr.toLowerCase().replace(/\s+/g, ' ');
      if (cLower.includes('наименование') || cLower.includes('название') || cLower.includes('товар')) {
        nameCol = idx;
      } else if (cLower.includes('фасовка') || cLower.includes('кратность')) {
        packCol = idx;
      } else if (cLower.includes('поставщик')) {
        supCol = idx;
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
      }
    });

    if (nameCol === -1) nameCol = 0;
    if (packCol === -1) packCol = 3;
    if (photoCol === -1 && (sheetName === 'Pringles' || sheetName.toLowerCase().includes('pringles'))) {
      photoCol = 6; // Column G is index 6
    }

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || !Array.isArray(row)) continue;

      const rawName = row[nameCol];
      if (!rawName || !String(rawName).trim()) continue;

      const cleanName = String(rawName).trim();
      if (cleanName.toLowerCase() === 'наименование' || cleanName.toLowerCase() === 'название') continue;

      const rawPack = row[packCol];
      const packInfo = parsePackInfo(cleanName, rawPack, sheetName);

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
      if (!rawPhoto && (sheetName === 'Pringles' || sheetName.toLowerCase().includes('pringles'))) {
        for (let c = 0; c < row.length; c++) {
          const candidate = extractUrlValue(row[c]);
          if (typeof candidate === 'string' && (candidate.includes('i.siteapi.org') || /^https?:\/\/.*\.(?:jpg|jpeg|png|webp|gif)/i.test(candidate))) {
            rawPhoto = candidate;
            break;
          }
        }
      }

      const cleanPhoto = rawPhoto ? String(rawPhoto).trim() : '';

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

      items.push({
        id: `item_${String(index++).padStart(3, '0')}`,
        name: cleanName,
        category: sheetName,
        supplier: supplierId,
        step: packInfo.step,
        unit: packInfo.unit,
        display_step: packInfo.display,
        image: cleanPhoto,
        photo: cleanPhoto,
        imageUrl: cleanPhoto,
        'Фото': cleanPhoto
      });
    }
  }

  // Build dynamic suppliers array from discovered items
  const discoveredSupplierIds = [...new Set(items.map(i => i.supplier))];
  const dynamicSuppliers = [];

  discoveredSupplierIds.forEach(id => {
    const meta = dynamicSupplierLabels[id] || KNOWN_SUPPLIER_META[id] || { name: id, shortName: id, icon: '📦' };
    const categoriesForSup = [...new Set(items.filter(i => i.supplier === id).map(i => i.category))];

    dynamicSuppliers.push({
      id,
      name: meta.name,
      shortName: meta.shortName,
      icon: meta.icon,
      categories: categoriesForSup
    });
  });

  return {
    items,
    suppliers: dynamicSuppliers.length > 0 ? dynamicSuppliers : DEFAULT_SUPPLIERS
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
  renderSupplierNav();
  renderCategoryTabs();
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
      if (presentCategories.has(cat)) orderedCats.push(cat);
    });
  }

  presentCategories.forEach(cat => {
    if (!orderedCats.includes(cat)) orderedCats.push(cat);
  });

  orderedCats.push('manual');

  container.innerHTML = orderedCats.map(cat => {
    let count = 0;
    if (cat === 'all') {
      count = itemsInSup.length;
    } else if (cat === 'manual') {
      count = manualItems.filter(m => (m.supplier || 'snacks') === activeSupplier).length;
    } else {
      count = itemsInSup.filter(i => i.category === cat).length;
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
      activeCategory = btn.getAttribute('data-cat');
      renderCategoryTabs();
      renderCatalog();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
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
      const target = `${item.name} ${item.category}`.toLowerCase();
      matchSearch = target.includes(q);
    }

    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
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

  // Group by Category
  const groups = {};
  filtered.forEach(it => {
    const cat = it.category || 'Прочее';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(it);
  });

  let html = '';
  for (const [catName, items] of Object.entries(groups)) {
    const meta = CATEGORY_META[catName] || { label: catName, icon: '🏷️' };
    html += `
      <div class="section-group">
        <div class="section-header">
          <div class="section-title">
            <span>${meta.icon}</span>
            <span>${escapeHtml(meta.label || catName)}</span>
          </div>
          <span class="section-count">${items.length} поз.</span>
        </div>
        <div class="product-cards-list">
          ${items.map(renderProductCard).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
  attachStepperEvents(container);
}

// Product Thumbnail Stub SVG (Crisp Pringles Can & Chips Icon)
const PRINGLES_THUMB_STUB_SVG = `
  <div class="product-thumb-stub" title="Фото отсутствует">
    <svg class="thumb-stub-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2C9.5 2 7.5 3 7.5 4.5v15C7.5 21 9.5 22 12 22s4.5-1 4.5-2.5v-15C16.5 3 14.5 2 12 2z"></path>
      <ellipse cx="12" cy="4.5" rx="4.5" ry="2.5"></ellipse>
      <path d="M7.5 10c1.5.8 3.5 1 4.5 1s3-.2 4.5-1"></path>
      <circle cx="12" cy="14" r="1.5" fill="currentColor"></circle>
    </svg>
    <span class="thumb-stub-text">Pringles</span>
  </div>
`;

// Helper for extracting photo URL across all possible keys
function getProductImageUrl(item) {
  if (!item) return '';
  const url = item.image || item.photo || item['Фото'] || item.imageUrl || '';
  return typeof url === 'string' ? url.trim() : '';
}

// Helper for rendering product photo thumbnail (56x56 px, contain, rounded corners, referrerPolicy)
function renderProductThumbnail(item) {
  const imageUrl = getProductImageUrl(item);
  const escapedName = escapeHtml(item && item.name ? item.name : 'Pringles');

  if (!imageUrl) {
    return `
      <div class="product-thumb has-stub" title="Фото отсутствует" style="width: 56px; height: 56px; min-width: 56px; flex-shrink: 0;">
        ${PRINGLES_THUMB_STUB_SVG}
      </div>
    `;
  }

  return `
    <div class="product-thumb" onclick="toggleThumbZoom(this, event)" title="Нажмите для увеличения (280px)" style="width: 56px; height: 56px; min-width: 56px; flex-shrink: 0;">
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
    parent.classList.add('has-stub');
    parent.classList.remove('zoomed');
    parent.closest('.product-card')?.classList.remove('card-zoomed');
    parent.title = 'Фото отсутствует';
    parent.onclick = null;
    parent.innerHTML = PRINGLES_THUMB_STUB_SVG;
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
        <img id="imagePreviewImg" class="image-preview-img" src="" alt="Pringles" referrerpolicy="no-referrer" referrerPolicy="no-referrer" />
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
    imgEl.alt = title || 'Pringles';
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
  const title = img ? (img.getAttribute('alt') || 'Pringles') : 'Pringles';

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
function renderProductCard(item) {
  const currentQty = order[item.id] || 0;
  const hasOrder = currentQty > 0 ? 'has-order' : '';
  const qtyFormatted = formatQty(currentQty, item.unit);
  const activeClass = currentQty > 0 ? 'active' : '';

  const isPringles = item.category === 'Pringles' || item.supplier === 'pivnye_zakuski' || (item.name && /pringles|принглс/i.test(item.name));
  const hasImage = Boolean(getProductImageUrl(item));
  const showThumb = isPringles || hasImage;

  const thumbHtml = showThumb ? renderProductThumbnail(item) : '';

  return `
    <div class="product-card ${hasOrder}" data-id="${item.id}">
      ${thumbHtml}
      <div class="product-info">
        <div class="product-title">${highlightSearch(item.name, searchQuery)}</div>
        <div class="product-meta">
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
  const name = document.getElementById('manualName').value.trim();
  const qty = parseFloat(document.getElementById('manualQty').value) || 1;
  const unit = document.getElementById('manualUnit').value;
  const cat = document.getElementById('manualCat').value.trim() || 'Свободный ввод';

  if (!name) return;

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
        unit: it.unit
      });
    }
  }

  const supManual = manualItems.filter(m => (m.supplier || 'snacks') === supplierId);
  if (supManual.length > 0) {
    const key = '✏️ Дополнительно (вручную)';
    grouped[key] = supManual.map(it => ({
      name: it.name,
      qty: it.quantity,
      unit: it.unit
    }));
  }

  let text = `📦 ЗАКАЗ: ${sup.name.toUpperCase()}\n`;
  text += `📅 Дата: ${dateStr}\n`;
  text += `------------------------------------\n\n`;

  for (const [catName, items] of Object.entries(grouped)) {
    const meta = CATEGORY_META[catName];
    const icon = meta ? meta.icon : '🔹';
    const title = meta ? meta.label : catName;
    text += `${icon} ${title.toUpperCase()}:\n`;
    items.forEach(it => {
      text += `• ${it.name} — ${it.qty} ${it.unit}\n`;
    });
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
  for (const [id, qty] of Object.entries(order)) {
    if (qty > 0) {
      const it = catalog.find(i => i.id === id);
      if (!it || it.supplier !== modalActiveSupplier) continue;
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
    }
  }

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

// Copy order text for WhatsApp / Telegram
async function copyOrderToClipboard() {
  const text = generateOrderText(modalActiveSupplier);
  const sup = getSupplierById(modalActiveSupplier);
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    showToast(`📋 Заказ [${sup.shortName}] скопирован!`);
  } catch (err) {
    console.error('Copy failed', err);
    showToast('Не удалось скопировать, выделите текст в окне', true);
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
    [`ЗАКАЗ: ${sup.name.toUpperCase()}`, '', '', '', ''],
    ['№', 'Категория', 'Наименование товара', 'Количество', 'Единица']
  ];

  let num = 1;
  for (const [id, qty] of Object.entries(order)) {
    if (qty > 0) {
      const it = catalog.find(i => i.id === id);
      if (!it || it.supplier !== modalActiveSupplier) continue;
      rows.push([
        num++,
        it.category || '',
        it.name,
        qty,
        it.unit
      ]);
    }
  }

  manualItems.filter(m => (m.supplier || 'snacks') === modalActiveSupplier).forEach(it => {
    rows.push([
      num++,
      it.category || 'Вручную',
      it.name,
      it.quantity,
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
  XLSX.writeFile(wb, `Заказ_${sup.shortName}_${today}.xlsx`);
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
    'Будут сброшены заказы ВСЕХ поставщиков (Снеки, Расходники, Ярмарка, Пивные закуски) и все добавленные вручную позиции.',
    () => {
      order = {};
      manualItems = [];
      saveState();
      renderSupplierNav();
      renderCatalog();
      updateOrderBar();
      closeOrderModal();
      showToast('🗑️ Все заказы полностью очищены');
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

function openConfirmDialog(title, desc, onConfirm) {
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
  dConfirm.textContent = 'Очистить';

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
  if (input) {
    input.value = localStorage.getItem(CUSTOM_SHEET_KEY) || DEFAULT_SHEET_XLSX_URL;
  }
  if (modal) modal.classList.add('active');
}

function closeSettingsModal() {
  const modal = document.getElementById('settingsModal');
  if (modal) modal.classList.remove('active');
}

function saveSettings() {
  const input = document.getElementById('settingsSheetUrl');
  if (input) {
    const val = input.value.trim() || DEFAULT_SHEET_XLSX_URL;
    localStorage.setItem(CUSTOM_SHEET_KEY, val);
    showToast('Настройки сохранены');
    closeSettingsModal();
    syncFromGoogleSheets(true);
  }
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeImagePreviewModal();
    }
  });
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
