import json

with open('catalog.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

json_catalog_str = json.dumps(items, ensure_ascii=False, indent=2)

js_content = f"""/**
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

const DEFAULT_CATALOG = {json_catalog_str};

// Standard / Fallback Suppliers Configuration
const DEFAULT_SUPPLIERS = [
  {{
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
  }},
  {{
    id: 'consumables',
    name: 'Расходники и тара',
    shortName: 'Расходники',
    icon: '🧻',
    categories: [
      'Расходники',
      'Контейнеры'
    ]
  }},
  {{
    id: 'yarmarka',
    name: 'Ярмарка',
    shortName: 'Ярмарка',
    icon: '🎪',
    categories: [
      'Заморозка',
      'Вкусняшки и прочее'
    ]
  }},
  {{
    id: 'pivnye_zakuski',
    name: 'Пивные закуски',
    shortName: 'Пивные закуски',
    icon: '🥔',
    categories: [
      'Pringles'
    ]
  }}
];

const KNOWN_SUPPLIER_META = {{
  'snacks': {{ name: 'Снеки и закуски', shortName: 'Снеки', icon: '🍺' }},
  'consumables': {{ name: 'Расходники и тара', shortName: 'Расходники', icon: '🧻' }},
  'yarmarka': {{ name: 'Ярмарка', shortName: 'Ярмарка', icon: '🎪' }},
  'pivnye_zakuski': {{ name: 'Пивные закуски', shortName: 'Пивные закуски', icon: '🥔' }}
}};

// Category metadata: labels and icons
const CATEGORY_META = {{
  'all': {{ label: 'Все товары', icon: '📦' }},
  'Гренки Весовые': {{ label: 'Гренки весовые', icon: '🥖' }},
  'Сырные Сухие': {{ label: 'Сырные сухие', icon: '🧀' }},
  'Гренки Чипсы и снеки ЗАВОДСКИЕ': {{ label: 'Снеки заводские', icon: '🏭' }},
  'Орехи': {{ label: 'Орехи', icon: '🥜' }},
  'Начос и лавашики': {{ label: 'Начос & лаваши', icon: '🌮' }},
  'Соусы': {{ label: 'Соусы', icon: '🥫' }},
  'Рыбные': {{ label: 'Рыбные снеки', icon: '🐟' }},
  'Сыры': {{ label: 'Сыры', icon: '🧀' }},
  'Мясные': {{ label: 'Мясные снеки', icon: '🥩' }},
  'Мясные ЗАВОД': {{ label: 'Мясные завод', icon: '🍖' }},
  'Расходники': {{ label: 'Расходники', icon: '🧻' }},
  'Контейнеры': {{ label: 'Контейнеры', icon: '🥡' }},
  'Заморозка': {{ label: 'Заморозка', icon: '❄️' }},
  'Вкусняшки и прочее': {{ label: 'Вкусняшки', icon: '🍬' }},
  'Pringles': {{ label: 'Pringles', icon: '🥔' }},
  'manual': {{ label: 'Свободный ввод', icon: '✏️' }}
}};

// Application State
let catalog = [...DEFAULT_CATALOG];
let suppliers = [...DEFAULT_SUPPLIERS];
let activeSupplier = 'snacks';
let modalActiveSupplier = 'snacks';
let activeCategory = 'all';
let searchQuery = '';
let order = {{}}; // {{ itemId: quantity }}
let manualItems = []; // [ {{ id, name, category, quantity, unit, step, supplier }} ]

const CATALOG_CACHE_KEY = 'snack_catalog_cache_v7';
const SUPPLIERS_CACHE_KEY = 'snack_suppliers_cache_v7';
const ORDER_STORAGE_KEY = 'snack_order_v7';
const MANUAL_STORAGE_KEY = 'snack_manual_items_v7';
const ACTIVE_SUPPLIER_KEY = 'snack_active_supplier_v7';
const CUSTOM_SHEET_KEY = 'snack_custom_sheet_url';

const DEFAULT_SHEET_XLSX_URL = 'https://docs.google.com/spreadsheets/d/1nqOd_F-H60hE8lwObZyBhLhAHFBidV0UKkqLVvl81Ro/export?format=xlsx';

// SVG Icons helper
const ICONS = {{
  trash: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  refresh: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
  copy: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  share: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
  excel: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="17"></line><line x1="16" y1="13" x2="8" y2="17"></line></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  minus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
}};

// Initialize Application
async function initApp() {{
  loadSavedState();
  await loadCatalog();
  setupEventListeners();
  renderSupplierNav();
  renderCategoryTabs();
  renderCatalog();
  updateOrderBar();
}}

// LocalStorage helpers
function loadSavedState() {{
  try {{
    const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY) || localStorage.getItem('snack_order_v6') || localStorage.getItem('snack_order');
    if (savedOrder) order = JSON.parse(savedOrder);

    const savedManual = localStorage.getItem(MANUAL_STORAGE_KEY) || localStorage.getItem('snack_manual_items_v6') || localStorage.getItem('snack_manual_items');
    if (savedManual) manualItems = JSON.parse(savedManual);

    const savedSupplier = localStorage.getItem(ACTIVE_SUPPLIER_KEY);
    if (savedSupplier) activeSupplier = savedSupplier;
  }} catch (e) {{
    console.error('Failed to load localStorage', e);
  }}
}}

function saveState() {{
  try {{
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    localStorage.setItem(MANUAL_STORAGE_KEY, JSON.stringify(manualItems));
    localStorage.setItem(ACTIVE_SUPPLIER_KEY, activeSupplier);
  }} catch (e) {{
    console.error('Failed to save localStorage', e);
  }}
}}

// Load Catalog from cache or fallback to embedded DEFAULT_CATALOG
async function loadCatalog() {{
  const cachedCatalog = localStorage.getItem(CATALOG_CACHE_KEY);
  const cachedSuppliers = localStorage.getItem(SUPPLIERS_CACHE_KEY);

  if (cachedCatalog) {{
    try {{
      const parsed = JSON.parse(cachedCatalog);
      if (Array.isArray(parsed) && parsed.length >= 350 && parsed[0].supplier !== undefined) {{
        catalog = parsed;
        if (cachedSuppliers) {{
          suppliers = JSON.parse(cachedSuppliers);
        }}
        return;
      }}
    }} catch (e) {{
      console.warn('Cache parse error', e);
    }}
  }}

  catalog = [...DEFAULT_CATALOG];
  suppliers = [...DEFAULT_SUPPLIERS];
  localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(catalog));
  localStorage.setItem(SUPPLIERS_CACHE_KEY, JSON.stringify(suppliers));
}}

// Helper to get supplier metadata by ID
function getSupplierById(id) {{
  return suppliers.find(s => s.id === id) || KNOWN_SUPPLIER_META[id] || suppliers[0] || {{ id, name: id, shortName: id, icon: '📦' }};
}}

// Parse packaging / multiplicity information from cell value
function parsePackInfo(name, packStr, cat) {{
  const p = packStr !== undefined && packStr !== null ? String(packStr).trim() : '';
  const nameLower = name.toLowerCase();

  // 1. Bucket check: ведро Юбилейные -> 1 шт
  if (nameLower.includes('ведро')) {{
    return {{ step: 1.0, unit: 'шт', display: 'кратность 1 шт' }};
  }}

  // 2. 500 г -> 0.5 кг
  if (p === '500 г' || p === '500г') {{
    return {{ step: 0.5, unit: 'кг', display: 'кратность 0.5 кг' }};
  }}

  // 3. Weight in kg: 1 кг, 0,5 кг, 2 кг, 5 кг
  const mKg = p.match(/^([0-9]+(?:[,.][0-9]+)?)\\s*кг$/i);
  if (mKg) {{
    const val = parseFloat(mKg[1].replace(',', '.'));
    const valStr = Number.isInteger(val) ? val.toString() : val.toFixed(1);
    return {{ step: val, unit: 'кг', display: `кратность ${{valStr}} кг` }};
  }}

  // 4. Box / Package / Set / Roll
  const pLower = p.toLowerCase();
  if (pLower.includes('кор')) {{
    return {{ step: 1.0, unit: 'кор', display: 'кратность 1 кор' }};
  }}
  if (pLower.includes('набор')) {{
    return {{ step: 1.0, unit: 'набор', display: 'кратность 1 набор' }};
  }}
  if (pLower.includes('уп')) {{
    return {{ step: 1.0, unit: 'уп', display: 'кратность 1 уп' }};
  }}
  if (pLower.includes('рулон')) {{
    return {{ step: 1.0, unit: 'рулон', display: 'кратность 1 рулон' }};
  }}

  // 5. Pure numbers (e.g. 3, 3.0, 4, 4.0, 1, 1.0)
  if (p && !isNaN(Number(p.replace(',', '.')))) {{
    const num = parseFloat(p.replace(',', '.'));
    if (p === '0.5' || p === '0,5') {{
      return {{ step: 1.0, unit: 'уп', display: 'кратность 1 уп' }};
    }}
    const valStr = Number.isInteger(num) ? num.toString() : num.toFixed(1);
    return {{ step: num, unit: 'шт', display: `кратность ${{valStr}} шт` }};
  }}

  // 6. Grams in factory packs (e.g. 40 г, 60 г, 80 г, 160 г, 165 г) -> step 1 шт
  if (/\\b[0-9]+\\s*г\\b/i.test(p)) {{
    return {{ step: 1.0, unit: 'шт', display: 'кратность 1 шт' }};
  }}

  // 7. Fallback / 'Не указана' / sizes
  let unit = 'шт';
  if ((cat === 'Расходники' || cat === 'Контейнеры') && nameLower.includes('пакет')) {{
    unit = 'уп';
  }}
  return {{ step: 1.0, unit: unit, display: `кратность 1 ${{unit}}` }};
}}

// Transliterate Russian string to clean latin slug
function transliterate(text) {{
  const cyr = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const lat = ['a','b','v','g','d','e','yo','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','kh','ts','ch','sh','shch','','y','','e','yu','ya'];
  let res = '';
  const s = String(text || '').trim();
  for (let i = 0; i < s.length; i++) {{
    const ch = s[i];
    const low = ch.toLowerCase();
    const idx = cyr.indexOf(low);
    if (idx !== -1) {{
      res += lat[idx];
    }} else {{
      res += ch;
    }}
  }}
  return res.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '').toLowerCase() || 'custom';
}}

// Convert supplier name into clean unique ID
function slugify(text) {{
  if (!text) return 'snacks';
  const t = String(text).trim();
  const lower = t.toLowerCase();

  // Explicit mappings to our known base IDs
  if (lower === 'снеки' || lower === 'снеки и закуски' || lower === 'snacks') return 'snacks';
  if (lower === 'расходники' || lower === 'расходники и тара' || lower === 'consumables') return 'consumables';
  if (lower === 'ярмарка' || lower === 'yarmarka') return 'yarmarka';
  if (lower === 'пивные закуски' || lower === 'пивныезакуски' || lower === 'pivnye_zakuski') return 'pivnye_zakuski';

  return transliterate(t);
}}

function chooseSupplierIcon(name) {{
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
}}

// Synchronize from Google Sheets directly via XLSX export
async function syncFromGoogleSheets(notify = true) {{
  const btn = document.getElementById('btnSync');
  if (btn) btn.classList.add('syncing');

  const sheetUrl = localStorage.getItem(CUSTOM_SHEET_KEY) || DEFAULT_SHEET_XLSX_URL;

  try {{
    const res = await fetch(sheetUrl);
    if (!res.ok) throw new Error(`HTTP ${{res.status}}`);
    const arrayBuffer = await res.arrayBuffer();

    if (typeof XLSX === 'undefined') {{
      throw new Error('Библиотека XLSX не загружена');
    }}

    const wb = XLSX.read(arrayBuffer, {{ type: 'array' }});
    const parsedData = parseGoogleSheetWorkbook(wb);

    if (parsedData && parsedData.items && parsedData.items.length > 0) {{
      catalog = parsedData.items;
      if (parsedData.suppliers && parsedData.suppliers.length > 0) {{
        suppliers = parsedData.suppliers;
      }}
      localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(catalog));
      localStorage.setItem(SUPPLIERS_CACHE_KEY, JSON.stringify(suppliers));

      // Validate active supplier
      if (!suppliers.some(s => s.id === activeSupplier)) {{
        activeSupplier = suppliers[0].id;
      }}

      renderSupplierNav();
      renderCategoryTabs();
      renderCatalog();
      updateOrderBar();
      if (notify) showToast(`✅ Каталог обновлен: ${{parsedData.items.length}} позиций во всех вкладках!`);
    }} else {{
      throw new Error('Не удалось прочитать позиции из таблицы');
    }}
  }} catch (err) {{
    console.error('Sync error:', err);
    if (notify) showToast(`❌ Ошибка обновления таблицы: ${{err.message}}`, true);
  }} finally {{
    if (btn) btn.classList.remove('syncing');
  }}
}}

// Dynamic parser for multi-sheet Google Sheets workbook
function parseGoogleSheetWorkbook(wb) {{
  const items = [];
  let index = 1;

  // Default sheet to supplier mapping
  const sheetToSupplierMap = {{
    'Расходники': 'consumables',
    'Контейнеры': 'consumables',
    'Заморозка': 'yarmarka',
    'Вкусняшки и прочее': 'yarmarka',
    'Pringles': 'pivnye_zakuski'
  }};

  const dynamicSupplierLabels = {{
    'snacks': {{ name: 'Снеки и закуски', shortName: 'Снеки', icon: '🍺' }},
    'consumables': {{ name: 'Расходники и тара', shortName: 'Расходники', icon: '🧻' }},
    'yarmarka': {{ name: 'Ярмарка', shortName: 'Ярмарка', icon: '🎪' }},
    'pivnye_zakuski': {{ name: 'Пивные закуски', shortName: 'Пивные закуски', icon: '🥔' }}
  }};

  // 1. Check for dedicated 'Поставщики' sheet if user created one
  const supSheetName = wb.SheetNames.find(s => s.toLowerCase().includes('поставщик') || s.toLowerCase().includes('supplier'));
  if (supSheetName) {{
    const supWs = wb.Sheets[supSheetName];
    const supRows = XLSX.utils.sheet_to_json(supWs, {{ header: 1 }});
    if (supRows && supRows.length > 1) {{
      supRows.slice(1).forEach(r => {{
        if (r && r[0] && r[1]) {{
          const tab = String(r[0]).trim();
          const sup = String(r[1]).trim();
          sheetToSupplierMap[tab] = sup;
          const supId = slugify(sup);
          dynamicSupplierLabels[supId] = {{
            name: sup,
            shortName: sup,
            icon: chooseSupplierIcon(sup)
          }};
        }}
      }});
    }}
  }}

  let sheetNames = wb.SheetNames.filter(s => s !== 'Весь ассортимент' && s !== supSheetName);

  for (const sheetName of sheetNames) {{
    const ws = wb.Sheets[sheetName];
    if (!ws) continue;

    const rows = XLSX.utils.sheet_to_json(ws, {{ header: 1 }});
    if (!rows || rows.length < 2) continue;

    const header = rows[0] || [];
    let nameCol = -1;
    let packCol = -1;
    let supCol = -1;

    header.forEach((col, idx) => {{
      if (!col) return;
      const cLower = String(col).toLowerCase().trim();
      if (cLower.includes('наименование') || cLower.includes('название') || cLower.includes('товар')) {{
        nameCol = idx;
      }} else if (cLower.includes('фасовка') || cLower.includes('кратность')) {{
        packCol = idx;
      }} else if (cLower.includes('поставщик')) {{
        supCol = idx;
      }}
    }});

    if (nameCol === -1) nameCol = 0;
    if (packCol === -1) packCol = 3;

    for (let r = 1; r < rows.length; r++) {{
      const row = rows[r];
      if (!row || !Array.isArray(row)) continue;

      const rawName = row[nameCol];
      if (!rawName || !String(rawName).trim()) continue;

      const cleanName = String(rawName).trim();
      if (cleanName.toLowerCase() === 'наименование' || cleanName.toLowerCase() === 'название') continue;

      const rawPack = row[packCol];
      const packInfo = parsePackInfo(cleanName, rawPack, sheetName);

      // Determine supplier
      let supplierId = 'snacks';
      if (supCol !== -1 && row[supCol] && String(row[supCol]).trim()) {{
        const rawSupVal = String(row[supCol]).trim();
        supplierId = slugify(rawSupVal);
        if (!dynamicSupplierLabels[supplierId]) {{
          dynamicSupplierLabels[supplierId] = {{
            name: rawSupVal,
            shortName: rawSupVal,
            icon: chooseSupplierIcon(rawSupVal)
          }};
        }}
      }} else if (sheetToSupplierMap[sheetName]) {{
        const rawSupVal = sheetToSupplierMap[sheetName];
        supplierId = slugify(rawSupVal);
        if (!dynamicSupplierLabels[supplierId]) {{
          dynamicSupplierLabels[supplierId] = {{
            name: rawSupVal,
            shortName: rawSupVal,
            icon: chooseSupplierIcon(rawSupVal)
          }};
        }}
      }}

      items.push({{
        id: `item_${{String(index++).padStart(3, '0')}}`,
        name: cleanName,
        category: sheetName,
        supplier: supplierId,
        step: packInfo.step,
        unit: packInfo.unit,
        display_step: packInfo.display
      }});
    }}
  }}

  // Build dynamic suppliers array from discovered items
  const discoveredSupplierIds = [...new Set(items.map(i => i.supplier))];
  const dynamicSuppliers = [];

  discoveredSupplierIds.forEach(id => {{
    const meta = dynamicSupplierLabels[id] || KNOWN_SUPPLIER_META[id] || {{ name: id, shortName: id, icon: '📦' }};
    const categoriesForSup = [...new Set(items.filter(i => i.supplier === id).map(i => i.category))];

    dynamicSuppliers.push({{
      id,
      name: meta.name,
      shortName: meta.shortName,
      icon: meta.icon,
      categories: categoriesForSup
    }});
  }});

  return {{
    items,
    suppliers: dynamicSuppliers.length > 0 ? dynamicSuppliers : DEFAULT_SUPPLIERS
  }};
}}

// Top-Level Supplier Navigation Bar
function renderSupplierNav() {{
  const container = document.getElementById('supplierNav');
  if (!container) return;

  container.innerHTML = suppliers.map(sup => {{
    const totals = getOrderTotals(sup.id);
    const isActive = activeSupplier === sup.id ? 'active' : '';
    const hasItems = totals.count > 0 ? 'has-items' : '';

    return `
      <button class="supplier-tab ${{isActive}}" data-supplier="${{sup.id}}">
        <span>${{sup.icon}}</span>
        <span>${{escapeHtml(sup.shortName)}}</span>
        <span class="supplier-badge ${{hasItems}}" id="badge-sup-${{sup.id}}">${{totals.count}}</span>
      </button>
    `;
  }}).join('');

  container.querySelectorAll('.supplier-tab').forEach(btn => {{
    btn.addEventListener('click', () => {{
      const supId = btn.getAttribute('data-supplier');
      switchSupplier(supId);
    }});
  }});
}}

function switchSupplier(supId) {{
  activeSupplier = supId;
  saveState();
  activeCategory = 'all';
  renderSupplierNav();
  renderCategoryTabs();
  renderCatalog();
  updateOrderBar();
  window.scrollTo({{ top: 0, behavior: 'smooth' }});
}}

// Category Tabs Navigation (Scoped to Active Supplier)
function renderCategoryTabs() {{
  const container = document.getElementById('categoryNav');
  if (!container) return;

  const currentSup = getSupplierById(activeSupplier);
  const itemsInSup = catalog.filter(i => i.supplier === activeSupplier);
  const presentCategories = new Set(itemsInSup.map(i => i.category));

  const orderedCats = ['all'];

  if (currentSup && Array.isArray(currentSup.categories)) {{
    currentSup.categories.forEach(cat => {{
      if (presentCategories.has(cat)) orderedCats.push(cat);
    }});
  }}

  presentCategories.forEach(cat => {{
    if (!orderedCats.includes(cat)) orderedCats.push(cat);
  }});

  orderedCats.push('manual');

  container.innerHTML = orderedCats.map(cat => {{
    let count = 0;
    if (cat === 'all') {{
      count = itemsInSup.length;
    }} else if (cat === 'manual') {{
      count = manualItems.filter(m => (m.supplier || 'snacks') === activeSupplier).length;
    }} else {{
      count = itemsInSup.filter(i => i.category === cat).length;
    }}

    const meta = CATEGORY_META[cat] || {{ label: cat, icon: '🏷️' }};
    const isActive = activeCategory === cat ? 'active' : '';

    return `
      <button class="cat-tab ${{isActive}}" data-cat="${{cat}}">
        <span>${{meta.icon}}</span>
        <span>${{escapeHtml(meta.label)}}</span>
        <span class="cat-badge">${{count}}</span>
      </button>
    `;
  }}).join('');

  container.querySelectorAll('.cat-tab').forEach(btn => {{
    btn.addEventListener('click', () => {{
      activeCategory = btn.getAttribute('data-cat');
      renderCategoryTabs();
      renderCatalog();
      window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }});
  }});
}}

// Render Products Catalog List (Scoped to Active Supplier)
function renderCatalog() {{
  const container = document.getElementById('catalogContent');
  if (!container) return;

  if (activeCategory === 'manual') {{
    renderManualSection(container);
    return;
  }}

  const itemsInSup = catalog.filter(item => item.supplier === activeSupplier);

  let filtered = itemsInSup.filter(item => {{
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    let matchSearch = true;

    if (searchQuery.trim()) {{
      const q = searchQuery.toLowerCase().trim();
      const target = `${{item.name}} ${{item.category}}`.toLowerCase();
      matchSearch = target.includes(q);
    }}

    return matchCat && matchSearch;
  }});

  if (filtered.length === 0) {{
    // Check if query exists in another supplier
    let otherFoundHtml = '';
    if (searchQuery.trim()) {{
      const q = searchQuery.toLowerCase().trim();
      const otherMatches = catalog.filter(i => i.supplier !== activeSupplier && i.name.toLowerCase().includes(q));
      if (otherMatches.length > 0) {{
        const otherSupId = otherMatches[0].supplier;
        const otherSup = getSupplierById(otherSupId);
        otherFoundHtml = `
          <div style="margin-top: 14px; padding: 12px; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px;">
            <p style="margin: 0 0 8px; font-size: 0.88rem; color: #fde68a;">
              Найдено в поставщике <strong>${{escapeHtml(otherSup.name)}}</strong> (${{otherMatches.length}} поз.)
            </p>
            <button class="btn-action-primary" style="padding: 6px 14px; font-size: 0.85rem;" onclick="switchSupplier('${{otherSupId}}')">
              Перейти к ${{escapeHtml(otherSup.shortName)}} ➔
            </button>
          </div>
        `;
      }}
    }}

    container.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p>Ничего не найдено в разделе «${{escapeHtml(getSupplierById(activeSupplier).shortName)}}» по запросу "${{escapeHtml(searchQuery)}}"</p>
        ${{otherFoundHtml}}
        <button class="btn-action-secondary" style="margin: 12px auto; display: inline-flex;" onclick="resetSearch()">Сбросить поиск</button>
      </div>
    `;
    return;
  }}

  // Group by Category
  const groups = {{}};
  filtered.forEach(it => {{
    const cat = it.category || 'Прочее';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(it);
  }});

  let html = '';
  for (const [catName, items] of Object.entries(groups)) {{
    const meta = CATEGORY_META[catName] || {{ label: catName, icon: '🏷️' }};
    html += `
      <div class="section-group">
        <div class="section-header">
          <div class="section-title">
            <span>${{meta.icon}}</span>
            <span>${{escapeHtml(meta.label || catName)}}</span>
          </div>
          <span class="section-count">${{items.length}} поз.</span>
        </div>
        <div class="product-cards-list">
          ${{items.map(renderProductCard).join('')}}
        </div>
      </div>
    `;
  }}

  container.innerHTML = html;
  attachStepperEvents(container);
}}

// Single Product Card HTML
function renderProductCard(item) {{
  const currentQty = order[item.id] || 0;
  const hasOrder = currentQty > 0 ? 'has-order' : '';
  const qtyFormatted = formatQty(currentQty, item.unit);
  const activeClass = currentQty > 0 ? 'active' : '';

  return `
    <div class="product-card ${{hasOrder}}" data-id="${{item.id}}">
      <div class="product-info">
        <div class="product-title">${{highlightSearch(item.name, searchQuery)}}</div>
        <div class="product-meta">
          <span class="badge-step">${{escapeHtml(item.display_step || `кратность ${{item.step}} ${{item.unit}}`)}}</span>
        </div>
      </div>
      <div class="stepper-control">
        <button class="stepper-btn minus" data-action="minus" data-id="${{item.id}}" title="Уменьшить">−</button>
        <div class="stepper-value ${{activeClass}}" data-action="prompt" data-id="${{item.id}}" title="Нажмите, чтобы ввести число">
          ${{qtyFormatted}}
        </div>
        <button class="stepper-btn plus" data-action="plus" data-id="${{item.id}}" title="Добавить">+</button>
      </div>
    </div>
  `;
}}

// Stepper Events (+, -, prompt)
function attachStepperEvents(container) {{
  container.querySelectorAll('.stepper-btn').forEach(btn => {{
    btn.addEventListener('click', (e) => {{
      e.stopPropagation();
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      const item = catalog.find(i => i.id === id);
      if (!item) return;

      const step = Number(item.step) || 1.0;
      const current = order[id] || 0;

      if (action === 'plus') {{
        const next = Math.round((current + step) * 1000) / 1000;
        order[id] = next;
      }} else if (action === 'minus') {{
        const next = Math.round((current - step) * 1000) / 1000;
        if (next <= 0.0001) {{
          delete order[id];
        }} else {{
          order[id] = next;
        }}
      }}

      saveState();
      updateProductCard(id);
      renderSupplierNav();
      updateOrderBar();
    }});
  }});

  container.querySelectorAll('.stepper-value').forEach(div => {{
    div.addEventListener('click', (e) => {{
      e.stopPropagation();
      const id = div.getAttribute('data-id');
      const item = catalog.find(i => i.id === id);
      if (!item) return;

      openQuantityPrompt(item.name, order[id] || 0, item.unit, (newVal) => {{
        if (newVal <= 0) {{
          delete order[id];
        }} else {{
          order[id] = Math.round(newVal * 1000) / 1000;
        }}
        saveState();
        updateProductCard(id);
        renderSupplierNav();
        updateOrderBar();
      }});
    }});
  }});
}}

// Update single card DOM without full re-render
function updateProductCard(id) {{
  const card = document.querySelector(`.product-card[data-id="${{id}}"]`);
  if (!card) return;

  const item = catalog.find(i => i.id === id);
  if (!item) return;

  const currentQty = order[id] || 0;
  if (currentQty > 0) {{
    card.classList.add('has-order');
  }} else {{
    card.classList.remove('has-order');
  }}

  const valEl = card.querySelector('.stepper-value');
  if (valEl) {{
    valEl.textContent = formatQty(currentQty, item.unit);
    if (currentQty > 0) {{
      valEl.classList.add('active');
    }} else {{
      valEl.classList.remove('active');
    }}
  }}
}}

// Manual Items Form & List
function renderManualSection(container) {{
  const currentSup = getSupplierById(activeSupplier);
  const itemsInCurrentSup = manualItems.filter(m => (m.supplier || 'snacks') === activeSupplier);

  let manualListHtml = '';
  if (itemsInCurrentSup.length > 0) {{
    manualListHtml = `
      <div class="section-group" style="margin-top: 16px;">
        <div class="section-header">
          <div class="section-title">Добавлено вручную для «${{escapeHtml(currentSup.shortName)}}» (${{itemsInCurrentSup.length}})</div>
        </div>
        <div class="product-cards-list">
          ${{itemsInCurrentSup.map(item => `
            <div class="product-card has-order" data-id="${{item.id}}">
              <div class="product-info">
                <div class="product-title">${{escapeHtml(item.name)}}</div>
                <div class="product-meta">
                  <span class="badge-step">${{item.quantity}} ${{item.unit}}</span>
                </div>
              </div>
              <div class="stepper-control">
                <button class="stepper-btn minus" data-action="manual-minus" data-id="${{item.id}}">−</button>
                <div class="stepper-value active" data-action="manual-prompt" data-id="${{item.id}}">${{item.quantity}} ${{item.unit}}</div>
                <button class="stepper-btn plus" data-action="manual-plus" data-id="${{item.id}}">+</button>
                <button class="stepper-btn" style="color: #ef4444;" data-action="manual-del" data-id="${{item.id}}" title="Удалить">${{ICONS.trash}}</button>
              </div>
            </div>
          `).join('')}}
        </div>
      </div>
    `;
  }}

  container.innerHTML = `
    <div class="manual-card">
      <div class="manual-card-title">
        ✏️ Добавить позицию для «${{escapeHtml(currentSup.name)}}»
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
          ${{ICONS.plus}} Добавить в заказ ${{escapeHtml(currentSup.shortName)}}
        </button>
      </form>
    </div>
    ${{manualListHtml}}
  `;

  attachManualEvents(container);
}}

function handleManualSubmit(e) {{
  e.preventDefault();
  const name = document.getElementById('manualName').value.trim();
  const qty = parseFloat(document.getElementById('manualQty').value) || 1;
  const unit = document.getElementById('manualUnit').value;
  const cat = document.getElementById('manualCat').value.trim() || 'Свободный ввод';

  if (!name) return;

  const newItem = {{
    id: `manual_${{Date.now()}}`,
    name,
    category: cat,
    supplier: activeSupplier,
    quantity: qty,
    unit: unit,
    step: unit === 'кг' ? 0.5 : 1
  }};

  manualItems.push(newItem);
  saveState();
  showToast(`Добавлено: ${{name}} (${{qty}} ${{unit}})`);
  renderSupplierNav();
  renderCategoryTabs();
  renderCatalog();
  updateOrderBar();
}}

function attachManualEvents(container) {{
  container.querySelectorAll('[data-action^="manual-"]').forEach(el => {{
    el.addEventListener('click', () => {{
      const action = el.getAttribute('data-action');
      const id = el.getAttribute('data-id');
      const item = manualItems.find(i => i.id === id);
      if (!item) return;

      if (action === 'manual-plus') {{
        item.quantity = Math.round((item.quantity + item.step) * 10) / 10;
      }} else if (action === 'manual-minus') {{
        if (item.quantity <= item.step) {{
          manualItems = manualItems.filter(i => i.id !== id);
        }} else {{
          item.quantity = Math.round((item.quantity - item.step) * 10) / 10;
        }}
      }} else if (action === 'manual-del') {{
        manualItems = manualItems.filter(i => i.id !== id);
      }} else if (action === 'manual-prompt') {{
        openQuantityPrompt(item.name, item.quantity, item.unit, (newVal) => {{
          if (newVal <= 0) {{
            manualItems = manualItems.filter(i => i.id !== id);
          }} else {{
            item.quantity = newVal;
          }}
          saveState();
          renderCatalog();
          renderSupplierNav();
          updateOrderBar();
        }});
        return;
      }}

      saveState();
      renderCatalog();
      renderSupplierNav();
      updateOrderBar();
    }});
  }});
}}

// Format Quantity Helper
function formatQty(qty, unit) {{
  if (!qty || qty === 0) return '0';
  return `${{qty}} ${{unit}}`;
}}

// Calculate Total Order Statistics (Scoped to a Supplier or All)
function getOrderTotals(supplierId = activeSupplier) {{
  let count = 0;
  let totalKg = 0;
  let totalBuckets = 0;
  let totalPieces = 0;

  for (const [id, qty] of Object.entries(order)) {{
    if (qty > 0) {{
      const item = catalog.find(i => i.id === id);
      if (!item) continue;
      if (supplierId && item.supplier !== supplierId) continue;

      count++;
      if (item.unit === 'кг') {{
        totalKg += qty;
      }} else if (item.name.toLowerCase().includes('ведро')) {{
        totalBuckets += qty;
      }} else {{
        totalPieces += qty;
      }}
    }}
  }}

  manualItems.forEach(it => {{
    if (it.quantity > 0) {{
      if (supplierId && (it.supplier || 'snacks') !== supplierId) return;

      count++;
      if (it.unit === 'кг') {{
        totalKg += it.quantity;
      }} else if (it.name.toLowerCase().includes('ведро')) {{
        totalBuckets += it.quantity;
      }} else {{
        totalPieces += it.quantity;
      }}
    }}
  }});

  return {{
    count,
    totalKg: Math.round(totalKg * 100) / 100,
    totalBuckets: Math.round(totalBuckets * 100) / 100,
    totalPieces: Math.round(totalPieces * 100) / 100
  }};
}}

// Update Floating Order Bar
function updateOrderBar() {{
  const bar = document.getElementById('floatingOrderBar');
  const countEl = document.getElementById('orderBarCount');
  const totalEl = document.getElementById('orderBarTotal');
  if (!bar) return;

  const currentSup = getSupplierById(activeSupplier);
  const totals = getOrderTotals(activeSupplier);

  // Check if other suppliers also have active orders
  const otherActiveSups = suppliers
    .filter(s => s.id !== activeSupplier && getOrderTotals(s.id).count > 0);

  if (totals.count > 0 || otherActiveSups.length > 0) {{
    bar.classList.add('visible');

    if (totals.count > 0) {{
      countEl.textContent = `[${{currentSup.shortName}}]: ${{totals.count}} поз.`;

      const parts = [];
      if (totals.totalKg > 0) parts.push(`${{totals.totalKg}} кг`);
      if (totals.totalBuckets > 0) parts.push(`${{totals.totalBuckets}} ведер`);
      if (totals.totalPieces > 0) parts.push(`${{totals.totalPieces}} шт/кор`);

      let totalStr = parts.join(' • ') || `${{totals.count}} поз.`;
      if (otherActiveSups.length > 0) {{
        const otherStr = otherActiveSups.map(s => `${{s.icon}} ${{getOrderTotals(s.id).count}}`).join(' ');
        totalStr += ` | др: ${{otherStr}}`;
      }}
      totalEl.textContent = totalStr;
    }} else {{
      countEl.textContent = `В [${{currentSup.shortName}}] пусто`;
      const otherStr = otherActiveSups.map(s => `${{s.icon}} ${{s.shortName}}: ${{getOrderTotals(s.id).count}} поз.`).join(', ');
      totalEl.textContent = otherStr;
    }}
  }} else {{
    bar.classList.remove('visible');
  }}
}}

// Generate WhatsApp / Telegram Order Text for a Specific Supplier
function generateOrderText(supplierId = modalActiveSupplier) {{
  const sup = getSupplierById(supplierId);
  const totals = getOrderTotals(supplierId);
  const dateStr = new Date().toLocaleString('ru-RU', {{
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }});

  const grouped = {{}};

  for (const [id, qty] of Object.entries(order)) {{
    if (qty > 0) {{
      const it = catalog.find(i => i.id === id);
      if (!it || it.supplier !== supplierId) continue;
      const cat = it.category || 'Прочее';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({{
        name: it.name,
        qty: qty,
        unit: it.unit
      }});
    }}
  }}

  const supManual = manualItems.filter(m => (m.supplier || 'snacks') === supplierId);
  if (supManual.length > 0) {{
    const key = '✏️ Дополнительно (вручную)';
    grouped[key] = supManual.map(it => ({{
      name: it.name,
      qty: it.quantity,
      unit: it.unit
    }}));
  }}

  let text = `📦 ЗАКАЗ: ${{sup.name.toUpperCase()}}\\n`;
  text += `📅 Дата: ${{dateStr}}\\n`;
  text += `------------------------------------\\n\\n`;

  for (const [catName, items] of Object.entries(grouped)) {{
    const meta = CATEGORY_META[catName];
    const icon = meta ? meta.icon : '🔹';
    const title = meta ? meta.label : catName;
    text += `${{icon}} ${{title.toUpperCase()}}:\\n`;
    items.forEach(it => {{
      text += `• ${{it.name}} — ${{it.qty}} ${{it.unit}}\\n`;
    }});
    text += `\\n`;
  }}

  text += `------------------------------------\\n`;
  const parts = [];
  if (totals.totalKg > 0) parts.push(`Вес: ${{totals.totalKg}} кг`);
  if (totals.totalBuckets > 0) parts.push(`Ведра: ${{totals.totalBuckets}} шт`);
  if (totals.totalPieces > 0) parts.push(`Штучный: ${{totals.totalPieces}} шт/кор`);

  text += `📊 ИТОГО: ${{totals.count}} поз. | ${{parts.join(' | ')}}`;

  return text;
}}

// Open Order Drawer Modal with Supplier Switcher
function openOrderModal() {{
  const modal = document.getElementById('orderModal');
  if (!modal) return;

  // Open with active supplier initially
  modalActiveSupplier = activeSupplier;
  renderOrderModalContent();
  modal.classList.add('active');
}}

function closeOrderModal() {{
  const modal = document.getElementById('orderModal');
  if (modal) modal.classList.remove('active');
}}

function switchModalSupplier(supId) {{
  modalActiveSupplier = supId;
  renderOrderModalContent();
}}

// Render Content Inside Order Modal Drawer
function renderOrderModalContent() {{
  const body = document.getElementById('orderModalBody');
  if (!body) return;

  const currentSup = getSupplierById(modalActiveSupplier);
  const totals = getOrderTotals(modalActiveSupplier);

  // Supplier Switcher Tabs in Cart
  const supplierTabsHtml = `
    <div class="modal-supplier-nav">
      ${{suppliers.map(s => {{
        const sTotals = getOrderTotals(s.id);
        const isActive = s.id === modalActiveSupplier ? 'active' : '';
        const badgeClass = sTotals.count > 0 ? 'has-items' : '';
        return `
          <button class="modal-sup-tab ${{isActive}}" onclick="switchModalSupplier('${{s.id}}')">
            <span>${{s.icon}}</span>
            <span>${{escapeHtml(s.shortName)}}</span>
            <span class="badge ${{badgeClass}}">${{sTotals.count}}</span>
          </button>
        `;
      }}).join('')}}
    </div>
  `;

  if (totals.count === 0) {{
    body.innerHTML = `
      ${{supplierTabsHtml}}
      <div class="empty-state" style="padding: 24px 12px;">
        <p>В заказе для <strong>«${{escapeHtml(currentSup.name)}}»</strong> пока нет товаров.</p>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
          Выберите нужные позиции в каталоге или переключите поставщика вверху.
        </p>
      </div>
    `;
    return;
  }}

  let itemsHtml = '';
  for (const [id, qty] of Object.entries(order)) {{
    if (qty > 0) {{
      const it = catalog.find(i => i.id === id);
      if (!it || it.supplier !== modalActiveSupplier) continue;
      const meta = CATEGORY_META[it.category] || {{ label: it.category }};
      itemsHtml += `
        <div class="order-item-row" data-id="${{it.id}}">
          <div style="flex: 1; min-width: 0;">
            <div class="order-item-title">${{escapeHtml(it.name)}}</div>
            <div class="order-item-sub">${{escapeHtml(meta.label || it.category)}}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="order-item-qty">${{qty}} ${{it.unit}}</div>
            <button class="btn-icon danger" style="width: 32px; height: 32px;" onclick="removeOrderItem('${{it.id}}')" title="Убрать из заказа">
              ${{ICONS.trash}}
            </button>
          </div>
        </div>
      `;
    }}
  }}

  manualItems.filter(m => (m.supplier || 'snacks') === modalActiveSupplier).forEach(it => {{
    itemsHtml += `
      <div class="order-item-row" data-id="${{it.id}}">
        <div style="flex: 1; min-width: 0;">
          <div class="order-item-title">${{escapeHtml(it.name)}}</div>
          <div class="order-item-sub">Свободный ввод • ${{escapeHtml(it.category || '')}}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="order-item-qty">${{it.quantity}} ${{it.unit}}</div>
          <button class="btn-icon danger" style="width: 32px; height: 32px;" onclick="removeManualItem('${{it.id}}')" title="Убрать из заказа">
            ${{ICONS.trash}}
          </button>
        </div>
      </div>
    `;
  }});

  const previewText = generateOrderText(modalActiveSupplier);

  body.innerHTML = `
    ${{supplierTabsHtml}}

    <div style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <div style="font-size: 0.82rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">
          Товары [${{escapeHtml(currentSup.shortName)}}] (${{totals.count}}):
        </div>
        <button class="btn-text-danger" onclick="confirmResetCurrentSupplier()" style="font-size: 0.75rem; background: none; border: none; color: #ef4444; cursor: pointer;">
          Очистить ${{escapeHtml(currentSup.shortName)}}
        </button>
      </div>
      ${{itemsHtml}}
    </div>

    <div style="margin-top: 18px;">
      <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 6px; text-transform: uppercase; font-weight: 700;">
        Сообщение для поставщика «${{escapeHtml(currentSup.name)}}»:
      </div>
      <textarea id="orderTextPreview" class="form-control" style="height: 130px; font-family: monospace; font-size: 0.8rem; line-height: 1.4; resize: none;" readonly>${{escapeHtml(previewText)}}</textarea>
    </div>
  `;
}}

function removeOrderItem(id) {{
  delete order[id];
  saveState();
  renderOrderModalContent();
  renderSupplierNav();
  updateOrderBar();
  renderCatalog();
}}

function removeManualItem(id) {{
  manualItems = manualItems.filter(i => i.id !== id);
  saveState();
  renderOrderModalContent();
  renderSupplierNav();
  updateOrderBar();
  renderCatalog();
}}

// Copy order text for WhatsApp / Telegram
async function copyOrderToClipboard() {{
  const text = generateOrderText(modalActiveSupplier);
  const sup = getSupplierById(modalActiveSupplier);
  try {{
    if (navigator.clipboard && navigator.clipboard.writeText) {{
      await navigator.clipboard.writeText(text);
    }} else {{
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }}
    showToast(`📋 Заказ [${{sup.shortName}}] скопирован!`);
  }} catch (err) {{
    console.error('Copy failed', err);
    showToast('Не удалось скопировать, выделите текст в окне', true);
  }}
}}

// Share via Web Share API
async function shareOrder() {{
  const text = generateOrderText(modalActiveSupplier);
  const sup = getSupplierById(modalActiveSupplier);
  if (navigator.share) {{
    try {{
      await navigator.share({{
        title: `Заказ: ${{sup.name}}`,
        text: text
      }});
    }} catch (e) {{
      if (e.name !== 'AbortError') {{
        copyOrderToClipboard();
      }}
    }}
  }} else {{
    copyOrderToClipboard();
  }}
}}

// Download Excel (.xlsx) file via SheetJS
function downloadOrderExcel() {{
  if (typeof XLSX === 'undefined') {{
    showToast('Библиотека Excel еще загружается...', true);
    return;
  }}

  const sup = getSupplierById(modalActiveSupplier);
  const totals = getOrderTotals(modalActiveSupplier);
  if (totals.count === 0) {{
    showToast(`Заказ для «${{sup.shortName}}» пуст!`, true);
    return;
  }}

  const rows = [
    [`ЗАКАЗ: ${{sup.name.toUpperCase()}}`, '', '', '', ''],
    ['№', 'Категория', 'Наименование товара', 'Количество', 'Единица']
  ];

  let num = 1;
  for (const [id, qty] of Object.entries(order)) {{
    if (qty > 0) {{
      const it = catalog.find(i => i.id === id);
      if (!it || it.supplier !== modalActiveSupplier) continue;
      rows.push([
        num++,
        it.category || '',
        it.name,
        qty,
        it.unit
      ]);
    }}
  }}

  manualItems.filter(m => (m.supplier || 'snacks') === modalActiveSupplier).forEach(it => {{
    rows.push([
      num++,
      it.category || 'Вручную',
      it.name,
      it.quantity,
      it.unit
    ]);
  }});

  rows.push([]);
  rows.push(['', '', 'ИТОГО ПОЗИЦИЙ:', totals.count, '']);
  if (totals.totalKg > 0) rows.push(['', '', 'ОБЩИЙ ВЕС:', totals.totalKg, 'кг']);
  if (totals.totalBuckets > 0) rows.push(['', '', 'ВСЕГО ВЕДЕР:', totals.totalBuckets, 'шт']);
  if (totals.totalPieces > 0) rows.push(['', '', 'ШТУЧНЫЙ / КОР:', totals.totalPieces, 'шт/кор']);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  ws['!cols'] = [
    {{ wch: 5 }},
    {{ wch: 25 }},
    {{ wch: 55 }},
    {{ wch: 14 }},
    {{ wch: 10 }}
  ];

  XLSX.utils.book_append_sheet(wb, ws, `Заказ_${{sup.shortName}}`);

  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `Заказ_${{sup.shortName}}_${{today}}.xlsx`);
  showToast(`📥 Excel для «${{sup.shortName}}» скачан!`);
}}

// Reset current supplier order
function confirmResetCurrentSupplier() {{
  const sup = getSupplierById(modalActiveSupplier);
  openConfirmDialog(
    `Очистить заказ [${{sup.shortName}}]?`,
    `Все выбранные товары поставщика «${{sup.name}}» будут удалены из заказа. Заказы других поставщиков останутся нетронутыми.`,
    () => {{
      for (const id of Object.keys(order)) {{
        const it = catalog.find(i => i.id === id);
        if (it && it.supplier === modalActiveSupplier) {{
          delete order[id];
        }}
      }}
      manualItems = manualItems.filter(m => (m.supplier || 'snacks') !== modalActiveSupplier);
      saveState();
      renderOrderModalContent();
      renderSupplierNav();
      updateOrderBar();
      renderCatalog();
      showToast(`🗑️ Заказ [${{sup.shortName}}] очищен`);
    }}
  );
}}

// Reset entire order dialog
function confirmResetOrder() {{
  openConfirmDialog(
    'Очистить все заказы?',
    'Будут сброшены заказы ВСЕХ поставщиков (Снеки, Расходники, Ярмарка, Пивные закуски) и все добавленные вручную позиции.',
    () => {{
      order = {{}};
      manualItems = [];
      saveState();
      renderSupplierNav();
      renderCatalog();
      updateOrderBar();
      closeOrderModal();
      showToast('🗑️ Все заказы полностью очищены');
    }}
  );
}}

// Search Handler
function handleSearch(val) {{
  searchQuery = val;
  const clearBtn = document.getElementById('searchClear');
  if (clearBtn) {{
    clearBtn.style.display = val ? 'flex' : 'none';
  }}
  renderCatalog();
}}

function resetSearch() {{
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  handleSearch('');
}}

// Numeric Prompt Dialog Modal
let promptCallback = null;
function openQuantityPrompt(title, currentVal, unit, callback) {{
  promptCallback = callback;
  const overlay = document.getElementById('dialogOverlay');
  const dTitle = document.getElementById('dialogTitle');
  const dDesc = document.getElementById('dialogDesc');
  const dInput = document.getElementById('dialogInput');
  const dConfirm = document.getElementById('dialogConfirm');

  dTitle.textContent = 'Количество';
  dDesc.textContent = `${{title}} (${{unit}}):`;
  dInput.value = currentVal || '';
  dInput.style.display = 'block';
  dConfirm.className = 'btn-dialog confirm';
  dConfirm.textContent = 'Сохранить';

  overlay.classList.add('active');
  setTimeout(() => dInput.focus(), 100);
}}

function openConfirmDialog(title, desc, onConfirm) {{
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
}}

function closeDialog() {{
  const overlay = document.getElementById('dialogOverlay');
  if (overlay) overlay.classList.remove('active');
  promptCallback = null;
}}

function confirmDialogAction() {{
  const dInput = document.getElementById('dialogInput');
  if (promptCallback) {{
    if (dInput.style.display !== 'none') {{
      const val = parseFloat(dInput.value.replace(',', '.')) || 0;
      promptCallback(val);
    }} else {{
      promptCallback();
    }}
  }}
  closeDialog();
}}

// Settings Modal for Google Sheet URL
function openSettingsModal() {{
  const modal = document.getElementById('settingsModal');
  const input = document.getElementById('settingsSheetUrl');
  if (input) {{
    input.value = localStorage.getItem(CUSTOM_SHEET_KEY) || DEFAULT_SHEET_XLSX_URL;
  }}
  if (modal) modal.classList.add('active');
}}

function closeSettingsModal() {{
  const modal = document.getElementById('settingsModal');
  if (modal) modal.classList.remove('active');
}}

function saveSettings() {{
  const input = document.getElementById('settingsSheetUrl');
  if (input) {{
    const val = input.value.trim() || DEFAULT_SHEET_XLSX_URL;
    localStorage.setItem(CUSTOM_SHEET_KEY, val);
    showToast('Настройки сохранены');
    closeSettingsModal();
    syncFromGoogleSheets(true);
  }}
}}

// Toast Notifications
let toastTimer = null;
function showToast(msg, isError = false) {{
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.className = `toast show ${{isError ? 'error' : ''}}`;

  toastTimer = setTimeout(() => {{
    toast.className = 'toast';
  }}, 2800);
}}

// Scroll to top of catalog
function scrollToTop() {{
  window.scrollTo({{
    top: 0,
    behavior: 'smooth'
  }});
}}

// Escape HTML utility
function escapeHtml(str) {{
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}}

// Search highlight utility
function highlightSearch(text, query) {{
  if (!query || !query.trim()) return escapeHtml(text);
  const q = query.trim();
  const regex = new RegExp(`(${{escapeRegex(q)}})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark class="search-match">$1</mark>');
}}

function escapeRegex(str) {{
  return str.replace(/[.*+?^${{}}()|[\\]\\\\]/g, '\\\\$&');
}}

// Setup global event listeners
function setupEventListeners() {{
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {{
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  }}

  const searchClear = document.getElementById('searchClear');
  if (searchClear) {{
    searchClear.addEventListener('click', resetSearch);
  }}

  window.addEventListener('scroll', () => {{
    const btn = document.getElementById('btnScrollTop');
    if (!btn) return;
    if (window.scrollY > 400) {{
      btn.classList.add('visible');
    }} else {{
      btn.classList.remove('visible');
    }}
  }});

  const dInput = document.getElementById('dialogInput');
  if (dInput) {{
    dInput.addEventListener('keydown', (e) => {{
      if (e.key === 'Enter') {{
        e.preventDefault();
        confirmDialogAction();
      }} else if (e.key === 'Escape') {{
        closeDialog();
      }}
    }});
  }}
}}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
"""

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f'Successfully built js/app.js ({len(js_content)} bytes)')
