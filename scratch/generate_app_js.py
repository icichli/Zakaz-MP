import json

with open('catalog.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

json_catalog_str = json.dumps(items, ensure_ascii=False, indent=2)

js_content = f"""/**
 * Заказ Снеков — PWA / Mobile Web App
 * Designed for beer snack orders, optimized for mobile devices.
 * Contains all 10 product categories (322 items) and live multi-sheet synchronization.
 */

const DEFAULT_CATALOG = {json_catalog_str};

let catalog = [...DEFAULT_CATALOG];
let order = {{}}; // {{ itemId: quantity }}
let manualItems = []; // [ {{ id, name, category, quantity, unit, step }} ]
let activeCategory = 'all';
let activeBrand = 'all';
let searchQuery = '';

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
  renderCategoryTabs();
  renderBrandChips();
  renderCatalog();
  updateOrderBar();
}}

// LocalStorage helpers
function loadSavedState() {{
  try {{
    const savedOrder = localStorage.getItem('snack_order');
    if (savedOrder) order = JSON.parse(savedOrder);
    
    const savedManual = localStorage.getItem('snack_manual_items');
    if (savedManual) manualItems = JSON.parse(savedManual);
  }} catch (e) {{
    console.error('Failed to load localStorage', e);
  }}
}}

function saveState() {{
  try {{
    localStorage.setItem('snack_order', JSON.stringify(order));
    localStorage.setItem('snack_manual_items', JSON.stringify(manualItems));
  }} catch (e) {{
    console.error('Failed to save localStorage', e);
  }}
}}

// Load Catalog from cache or fallback to embedded DEFAULT_CATALOG
async function loadCatalog() {{
  const cachedCatalog = localStorage.getItem('snack_catalog_cache');
  if (cachedCatalog) {{
    try {{
      const parsed = JSON.parse(cachedCatalog);
      if (Array.isArray(parsed) && parsed.length >= 50) {{
        catalog = parsed;
        return;
      }}
    }} catch (e) {{
      console.warn('Cache parse error', e);
    }}
  }}

  catalog = [...DEFAULT_CATALOG];
  localStorage.setItem('snack_catalog_cache', JSON.stringify(catalog));
}}

// Synchronize from Google Sheets directly via XLSX export (all 10 tabs!)
async function syncFromGoogleSheets(notify = true) {{
  const btn = document.getElementById('btnSync');
  if (btn) btn.classList.add('syncing');

  const sheetUrl = localStorage.getItem('snack_custom_sheet_url') || DEFAULT_SHEET_XLSX_URL;

  try {{
    const res = await fetch(sheetUrl);
    if (!res.ok) throw new Error(`HTTP ${{res.status}}`);
    const arrayBuffer = await res.arrayBuffer();

    if (typeof XLSX === 'undefined') {{
      throw new Error('Библиотека XLSX не загружена');
    }}

    const wb = XLSX.read(arrayBuffer, {{ type: 'array' }});
    const parsedItems = parseGoogleSheetWorkbook(wb);

    if (parsedItems && parsedItems.length > 0) {{
      catalog = parsedItems;
      localStorage.setItem('snack_catalog_cache', JSON.stringify(catalog));
      renderCategoryTabs();
      renderBrandChips();
      renderCatalog();
      if (notify) showToast(`✅ Каталог обновлен: ${{parsedItems.length}} позиций во всех вкладках!`);
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

// Parse all sheets in the Excel workbook
function parseGoogleSheetWorkbook(wb) {{
  const items = [];
  let index = 1;

  for (const sheetName of wb.SheetNames) {{
    const ws = wb.Sheets[sheetName];
    if (!ws) continue;

    // Convert sheet to array of rows
    const rows = XLSX.utils.sheet_to_json(ws, {{ header: 1 }});
    if (!rows || rows.length === 0) continue;

    for (const row of rows) {{
      if (!row || !Array.isArray(row)) continue;
      const non_empty = row.map(c => String(c || '').trim()).filter(Boolean);
      if (non_empty.length === 0) continue;

      let title = non_empty[0];
      if (non_empty.length > 1 && (non_empty[1].length > title.length || !title)) {{
        title = non_empty[1];
      }}

      if (!title || title.toLowerCase() === 'категория' || title.toLowerCase() === 'название') continue;

      const itemObj = parseRawItemFromSheet(title, sheetName, index++);
      if (itemObj) items.push(itemObj);
    }}
  }}

  return items;
}}

// Parse a single row item from any sheet
function parseRawItemFromSheet(rawTitle, sheetName, index) {{
  let item = rawTitle.replace(/[`"]/g, '').trim();
  item = item.replace(/[,;\\s]+(шт|кг)\\.?$/i, '').trim();
  if (!item) return null;

  const tLower = item.toLowerCase();
  let unit = 'кг';
  let step = 1.0;

  if (sheetName.toLowerCase().includes('завод') || sheetName.toLowerCase().includes('соусы')) {{
    unit = 'шт';
    step = 1;
  }} else if (tLower.includes('ведро')) {{
    unit = 'ведро';
    step = 1;
  }} else if (tLower.includes('0.5кг') || tLower.includes('0,5 кг') || tLower.includes('0,5кг') || tLower.includes('0.5 кг') || tLower.includes('500гр') || tLower.includes('500 гр')) {{
    unit = 'кг';
    step = 0.5;
  }} else if (tLower.includes('100гр') || tLower.includes('150гр') || tLower.includes('90 гр') || tLower.includes('90гр') || tLower.includes('50гр') || tLower.includes('180гр')) {{
    unit = 'шт';
    step = 1;
  }} else if (tLower.includes('1кг') || tLower.includes('1 кг')) {{
    unit = 'кг';
    step = 1.0;
  }} else if (sheetName.toLowerCase().includes('мясные') || sheetName.toLowerCase().includes('сырные')) {{
    unit = 'кг';
    step = 0.5;
  }}

  const catMap = {{
    'Гренки Весовые': 'Гренки',
    'Сырные Сухие': 'Сыры сухие',
    'Гренки Чипсы и снеки ЗАВОДСКИЕ': 'Снеки заводские',
    'Орехи': 'Орехи',
    'Начос и лавашики': 'Начос & Лаваши',
    'Соусы': 'Соусы',
    'Рыбные': 'Рыбные снеки',
    'Сыры': 'Сыры',
    'Мясные': 'Мясные снеки',
    'Мясные ЗАВОД': 'Мясные заводские'
  }};
  const category = catMap[sheetName] || sheetName;

  let brand = category;
  let subcat = '';
  let taste = item;

  const itemUpper = item.toUpperCase();

  if (sheetName === 'Гренки Весовые') {{
    if (itemUpper.includes('ВЕДРО ЮБИЛЕЙНЫЕ')) {{
      brand = 'Юбилейные';
      subcat = 'В ведрах (0.9 кг)';
      taste = item.replace(/ВЕДРО ЮБИЛЕЙНЫЕ/i, '').replace(/0[,.]9\\s*кг.*/i, '').trim();
    }} else if (itemUpper.includes('ЛУТОВСКИЕ')) {{
      brand = 'Лутовские';
      subcat = itemUpper.includes('ПШЕНИЧ') ? 'Пшеничные' : (itemUpper.includes('РЖАН') ? 'Ржаные' : 'Классика');
      const m = item.match(/\\((.*?)\\)/);
      taste = m ? m[1].trim() : item;
    }} else if (itemUpper.includes('БРО')) {{
      brand = 'Бро';
      subcat = 'Крафтовые';
      const m = item.match(/\\((.*?)\\)/);
      taste = m ? m[1].trim() : item;
    }} else if (itemUpper.includes('СНАПСЫ')) {{
      brand = 'СНАПСЫ';
      subcat = itemUpper.includes('ПШЕНИЧ') ? 'Пшеничные' : 'Ржаные';
      const m = item.match(/["«](.*?)["»]/) || item.match(/\\((.*?)\\)/);
      taste = m ? m[1].trim() : item;
    }} else if (itemUpper.includes('ДЕМИДОВСКИЕ')) {{
      brand = 'Демидовские';
      subcat = 'Сухарики';
      const m = item.match(/\\((.*?)\\)/);
      taste = m ? m[1].trim() : item;
    }} else if (itemUpper.includes('ЖИТНИЦКИЕ')) {{
      brand = 'Житницкие';
      subcat = 'Багет';
      const m = item.match(/\\((.*?)\\)/);
      taste = m ? m[1].trim() : item;
    }} else if (itemUpper.startsWith('СУХАРИ')) {{
      brand = 'Классика';
      subcat = 'Сухарики';
      const m = item.match(/["«](.*?)["»]/) || item.match(/\\((.*?)\\)/);
      taste = m ? m[1].trim() : item;
    }}
  }} else if (sheetName === 'Гренки Чипсы и снеки ЗАВОДСКИЕ') {{
    if (itemUpper.includes('СУРСКИЕ')) {{
      brand = 'Сурские';
      subcat = 'Гренки 100г';
    }} else if (itemUpper.includes('ЧИПСЫ')) {{
      brand = 'Чипсы';
    }}
  }} else if (sheetName === 'Орехи') {{
    if (itemUpper.includes('AVERTON')) {{
      brand = 'Averton';
      subcat = 'В глазури';
    }} else if (itemUpper.includes('ФОМАЛУКИЧ')) {{
      brand = 'ФомаЛукич';
      subcat = 'Хруст. корочка';
    }} else if (itemUpper.includes('ФИСТАШК')) {{
      brand = 'Фисташки';
    }} else if (itemUpper.includes('КЕШЬЮ')) {{
      brand = 'Кешью';
    }} else if (itemUpper.includes('МИНДАЛЬ')) {{
      brand = 'Миндаль';
    }} else if (itemUpper.includes('АРАХИС')) {{
      brand = 'Арахис';
    }}
  }} else if (sheetName === 'Рыбные') {{
    if (itemUpper.includes('КАЛЬМАР')) brand = 'Кальмар';
    else if (itemUpper.includes('ИКРА')) brand = 'Икра';
    else if (itemUpper.includes('АНЧОУС') || itemUpper.includes('ПОЛОСАТИК')) brand = 'Сушеная рыбка';
    else brand = 'Рыба';
  }} else if (sheetName === 'Сыры') {{
    if (itemUpper.includes('ДОНДУКОВСКИЙ')) brand = 'Дондуковский';
    else if (itemUpper.includes('САНККИНО')) brand = 'Санккино';
    else if (itemUpper.includes('ФЕРМЕРСКИЙ')) brand = 'Фермерский';
    else brand = 'Сыры';
  }} else if (sheetName === 'Мясные') {{
    if (itemUpper.includes('КНУТЫ')) brand = 'Кнуты';
    else if (itemUpper.includes('КОЛБАСКИ')) brand = 'Колбаски';
    else if (itemUpper.includes('ЧИПСЫ')) brand = 'Мясные чипсы';
    else brand = 'Мясные';
  }} else if (sheetName === 'Мясные ЗАВОД') {{
    if (itemUpper.includes('РЫЦАРСКОЕ')) brand = 'Мясо Рыцарское';
    else if (itemUpper.includes('УШКИ') || itemUpper.includes('УХО')) brand = 'Свиные ушки';
    else brand = 'Мясные (завод)';
  }}

  return {{
    id: `item_${{index}}`,
    sheet: sheetName,
    category,
    brand: brand || category,
    subcat,
    taste: taste || item,
    unit,
    step,
    official_name: item
  }};
}}

// Category Tabs Navigation
function renderCategoryTabs() {{
  const container = document.getElementById('categoryNav');
  if (!container) return;

  const categories = ['all', ...new Set(catalog.map(i => i.category))];
  categories.push('manual');

  const catIcons = {{
    'all': '📦',
    'Гренки': '🥖',
    'Сыры сухие': '🧀',
    'Снеки заводские': '🏭',
    'Орехи': '🥜',
    'Начос & Лаваши': '🌮',
    'Соусы': '🥫',
    'Рыбные снеки': '🐟',
    'Сыры': '🧀',
    'Мясные снеки': '🥩',
    'Мясные заводские': '🍖',
    'manual': '✏️'
  }};

  container.innerHTML = categories.map(cat => {{
    let count = 0;
    if (cat === 'all') {{
      count = catalog.length;
    }} else if (cat === 'manual') {{
      count = manualItems.length;
    }} else {{
      count = catalog.filter(i => i.category === cat).length;
    }}

    const icon = catIcons[cat] || '🏷️';
    const label = cat === 'all' ? 'Все товары' : (cat === 'manual' ? 'Свободный ввод' : cat);
    const isActive = activeCategory === cat ? 'active' : '';

    return `
      <button class="cat-tab ${{isActive}}" data-cat="${{cat}}">
        <span>${{icon}}</span>
        <span>${{escapeHtml(label)}}</span>
        <span class="cat-badge">${{count}}</span>
      </button>
    `;
  }}).join('');

  container.querySelectorAll('.cat-tab').forEach(btn => {{
    btn.addEventListener('click', () => {{
      activeCategory = btn.getAttribute('data-cat');
      activeBrand = 'all';
      renderCategoryTabs();
      renderBrandChips();
      renderCatalog();
    }});
  }});
}}

// Subcategory / Brand Chips
function renderBrandChips() {{
  const container = document.getElementById('brandChips');
  if (!container) return;

  if (activeCategory === 'manual') {{
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }}

  container.style.display = 'flex';
  const relevantItems = activeCategory === 'all' 
    ? catalog 
    : catalog.filter(i => i.category === activeCategory);

  const brands = ['all', ...new Set(relevantItems.map(i => i.brand).filter(Boolean))];

  if (brands.length <= 2) {{
    container.innerHTML = '';
    return;
  }}

  container.innerHTML = brands.map(b => {{
    const label = b === 'all' ? 'Все производители' : b;
    const isActive = activeBrand === b ? 'active' : '';
    return `<button class="chip ${{isActive}}" data-brand="${{b}}">${{escapeHtml(label)}}</button>`;
  }}).join('');

  container.querySelectorAll('.chip').forEach(btn => {{
    btn.addEventListener('click', () => {{
      activeBrand = btn.getAttribute('data-brand');
      renderBrandChips();
      renderCatalog();
    }});
  }});
}}

// Render Products Catalog List
function renderCatalog() {{
  const container = document.getElementById('catalogContent');
  if (!container) return;

  if (activeCategory === 'manual') {{
    renderManualSection(container);
    return;
  }}

  let filtered = catalog.filter(item => {{
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchBrand = activeBrand === 'all' || item.brand === activeBrand;
    let matchSearch = true;

    if (searchQuery.trim()) {{
      const q = searchQuery.toLowerCase().trim();
      const target = `${{item.official_name}} ${{item.taste}} ${{item.brand}} ${{item.subcat}} ${{item.category}}`.toLowerCase();
      matchSearch = target.includes(q);
    }}

    return matchCat && matchBrand && matchSearch;
  }});

  if (filtered.length === 0) {{
    container.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p>Ничего не найдено по запросу "${{escapeHtml(searchQuery)}}"</p>
        <button class="btn-action-secondary" style="margin: 12px auto; display: inline-flex;" onclick="resetSearch()">Сбросить поиск</button>
      </div>
    `;
    return;
  }}

  const groups = {{}};
  filtered.forEach(it => {{
    const key = it.brand ? `${{it.brand}} ${{it.subcat ? '• ' + it.subcat : ''}}` : it.category;
    if (!groups[key]) groups[key] = [];
    groups[key].push(it);
  }});

  let html = '';
  for (const [groupName, items] of Object.entries(groups)) {{
    html += `
      <div class="section-group">
        <div class="section-header">
          <div class="section-title">
            <span>${{escapeHtml(groupName)}}</span>
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
        <div class="product-title">${{highlightSearch(item.taste || item.official_name, searchQuery)}}</div>
        <div class="product-meta">
          <span class="badge-tag">${{escapeHtml(item.brand || item.category)}}</span>
          <span class="badge-step">шаг ${{item.step}} ${{item.unit}}</span>
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

// Manual Items Form & List
function renderManualSection(container) {{
  let manualListHtml = '';
  if (manualItems.length > 0) {{
    manualListHtml = `
      <div class="section-group" style="margin-top: 16px;">
        <div class="section-header">
          <div class="section-title">Добавленные вручную (${{manualItems.length}})</div>
        </div>
        <div class="product-cards-list">
          ${{manualItems.map(item => `
            <div class="product-card has-order" data-id="${{item.id}}">
              <div class="product-info">
                <div class="product-title">${{escapeHtml(item.name)}}</div>
                <div class="product-meta">
                  <span class="badge-tag">${{escapeHtml(item.category || 'Вручную')}}</span>
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
        ✏️ Добавить нестандартную или редкую позицию
      </div>
      <form id="formManual" class="manual-form-grid" onsubmit="handleManualSubmit(event)">
        <div class="form-group">
          <label>Наименование товара</label>
          <input type="text" id="manualName" class="form-control" placeholder="Например: Сыр чечил спагетти 1кг" required />
        </div>
        <div class="form-row">
          <div class="form-group" style="flex: 2;">
            <label>Количество</label>
            <input type="number" id="manualQty" class="form-control" step="0.1" min="0.1" value="1" required />
          </div>
          <div class="form-group" style="flex: 2;">
            <label>Ед. измерения</label>
            <select id="manualUnit" class="form-control">
              <option value="кг">кг</option>
              <option value="ведро">ведро</option>
              <option value="шт">шт</option>
              <option value="пачка">пачка</option>
              <option value="коробка">коробка</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Раздел / Производитель (необязательно)</label>
          <input type="text" id="manualCat" class="form-control" placeholder="Например: Мокрые снеки" />
        </div>
        <button type="submit" class="btn-add-manual">
          ${{ICONS.plus}} Добавить в заказ
        </button>
      </form>
    </div>
    ${{manualListHtml}}
  `;

  attachManualEvents(container);
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

      if (action === 'plus') {{
        const step = item.step || 1.0;
        const current = order[id] || 0;
        const next = Math.round((current + step) * 10) / 10;
        order[id] = next;
      }} else if (action === 'minus') {{
        const step = item.step || 1.0;
        const current = order[id] || 0;
        if (current <= step) {{
          delete order[id];
        }} else {{
          order[id] = Math.round((current - step) * 10) / 10;
        }}
      }}

      saveState();
      updateProductCard(id);
      updateOrderBar();
    }});
  }});

  container.querySelectorAll('.stepper-value').forEach(div => {{
    div.addEventListener('click', (e) => {{
      e.stopPropagation();
      const id = div.getAttribute('data-id');
      const item = catalog.find(i => i.id === id);
      if (!item) return;

      openQuantityPrompt(item.taste || item.official_name, order[id] || 0, item.unit, (newVal) => {{
        if (newVal <= 0) {{
          delete order[id];
        }} else {{
          order[id] = newVal;
        }}
        saveState();
        updateProductCard(id);
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

// Manual Items Handler
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
    quantity: qty,
    unit: unit,
    step: unit === 'кг' ? 0.5 : 1
  }};

  manualItems.push(newItem);
  saveState();
  showToast(`Добавлено: ${{name}} (${{qty}} ${{unit}})`);
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
          updateOrderBar();
        }});
        return;
      }}

      saveState();
      renderCatalog();
      updateOrderBar();
    }});
  }});
}}

// Format Quantity Helper
function formatQty(qty, unit) {{
  if (!qty || qty === 0) return '0';
  return `${{qty}} ${{unit}}`;
}}

// Calculate Total Order Statistics
function getOrderTotals() {{
  let count = 0;
  let totalKg = 0;
  let totalBuckets = 0;
  let totalPieces = 0;

  for (const [id, qty] of Object.entries(order)) {{
    if (qty > 0) {{
      count++;
      const item = catalog.find(i => i.id === id);
      if (item) {{
        if (item.unit === 'кг') {{
          totalKg += qty;
        }} else if (item.unit.includes('ведро')) {{
          totalBuckets += qty;
        }} else {{
          totalPieces += qty;
        }}
      }}
    }}
  }}

  manualItems.forEach(it => {{
    if (it.quantity > 0) {{
      count++;
      if (it.unit === 'кг') {{
        totalKg += it.quantity;
      }} else if (it.unit.includes('ведро')) {{
        totalBuckets += it.quantity;
      }} else {{
        totalPieces += it.quantity;
      }}
    }}
  }});

  return {{
    count,
    totalKg: Math.round(totalKg * 10) / 10,
    totalBuckets,
    totalPieces
  }};
}}

// Update Floating Order Bar
function updateOrderBar() {{
  const bar = document.getElementById('floatingOrderBar');
  const countEl = document.getElementById('orderBarCount');
  const totalEl = document.getElementById('orderBarTotal');
  if (!bar) return;

  const totals = getOrderTotals();

  if (totals.count > 0) {{
    bar.classList.add('visible');
    countEl.textContent = `В заказе: ${{totals.count}} поз.`;

    const parts = [];
    if (totals.totalKg > 0) parts.push(`${{totals.totalKg}} кг`);
    if (totals.totalBuckets > 0) parts.push(`${{totals.totalBuckets}} ведер`);
    if (totals.totalPieces > 0) parts.push(`${{totals.totalPieces}} шт`);

    totalEl.textContent = parts.join(' • ') || `${{totals.count}} поз.`;
  }} else {{
    bar.classList.remove('visible');
  }}
}}

// Generate Clean Text for WhatsApp / Telegram
function generateOrderText() {{
  const totals = getOrderTotals();
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
      if (!it) continue;
      const cat = it.category || 'Снеки';
      const brand = it.brand || 'Прочие';
      const key = `${{cat}} — ${{brand}}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push({{
        name: it.official_name || it.taste,
        qty: qty,
        unit: it.unit
      }});
    }}
  }}

  if (manualItems.length > 0) {{
    const key = '✏️ Дополнительно (вручную)';
    grouped[key] = manualItems.map(it => ({{
      name: it.name,
      qty: it.quantity,
      unit: it.unit
    }}));
  }}

  let text = `📦 ЗАКАЗ СНЕКОВ\\n`;
  text += `📅 Дата: ${{dateStr}}\\n`;
  text += `------------------------------------\\n\\n`;

  for (const [groupTitle, items] of Object.entries(grouped)) {{
    text += `🔹 ${{groupTitle.toUpperCase()}}:\\n`;
    items.forEach(it => {{
      text += `• ${{it.name}} — ${{it.qty}} ${{it.unit}}\\n`;
    }});
    text += `\\n`;
  }}

  text += `------------------------------------\\n`;
  const parts = [];
  if (totals.totalKg > 0) parts.push(`Вес: ${{totals.totalKg}} кг`);
  if (totals.totalBuckets > 0) parts.push(`Ведра: ${{totals.totalBuckets}} шт`);
  if (totals.totalPieces > 0) parts.push(`Штучный: ${{totals.totalPieces}} шт`);

  text += `📊 ИТОГО: ${{totals.count}} поз. | ${{parts.join(' | ')}}`;

  return text;
}}

// Open Order Drawer Modal
function openOrderModal() {{
  const modal = document.getElementById('orderModal');
  const body = document.getElementById('orderModalBody');
  if (!modal || !body) return;

  const totals = getOrderTotals();
  if (totals.count === 0) {{
    body.innerHTML = `<div class="empty-state"><p>Заказ пока пуст. Выберите нужные товары в каталоге.</p></div>`;
    modal.classList.add('active');
    return;
  }}

  let itemsHtml = '';
  for (const [id, qty] of Object.entries(order)) {{
    if (qty > 0) {{
      const it = catalog.find(i => i.id === id);
      if (!it) continue;
      itemsHtml += `
        <div class="order-item-row" data-id="${{it.id}}">
          <div style="flex: 1; min-width: 0;">
            <div class="order-item-title">${{escapeHtml(it.official_name || it.taste)}}</div>
            <div class="order-item-sub">${{escapeHtml(it.brand || '')}} • ${{escapeHtml(it.category || '')}}</div>
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

  manualItems.forEach(it => {{
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

  const previewText = generateOrderText();

  body.innerHTML = `
    <div style="margin-bottom: 16px;">
      <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; font-weight: 700;">
        Выбранные позиции (${{totals.count}}):
      </div>
      ${{itemsHtml}}
    </div>

    <div style="margin-top: 20px;">
      <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 6px; text-transform: uppercase; font-weight: 700;">
        Предпросмотр сообщения для отправки:
      </div>
      <textarea id="orderTextPreview" class="form-control" style="height: 140px; font-family: monospace; font-size: 0.8rem; line-height: 1.4; resize: none;" readonly>${{escapeHtml(previewText)}}</textarea>
    </div>
  `;

  modal.classList.add('active');
}}

function closeOrderModal() {{
  const modal = document.getElementById('orderModal');
  if (modal) modal.classList.remove('active');
}}

function removeOrderItem(id) {{
  delete order[id];
  saveState();
  openOrderModal();
  updateOrderBar();
  renderCatalog();
}}

function removeManualItem(id) {{
  manualItems = manualItems.filter(i => i.id !== id);
  saveState();
  openOrderModal();
  updateOrderBar();
  renderCatalog();
}}

// Copy order text for WhatsApp / Telegram
async function copyOrderToClipboard() {{
  const text = generateOrderText();
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
    showToast('📋 Заказ скопирован! Можно отправлять в чат');
  }} catch (err) {{
    console.error('Copy failed', err);
    showToast('Не удалось скопировать, выделите текст в окне', true);
  }}
}}

// Share via Web Share API
async function shareOrder() {{
  const text = generateOrderText();
  if (navigator.share) {{
    try {{
      await navigator.share({{
        title: 'Заказ снеков',
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

  const totals = getOrderTotals();
  if (totals.count === 0) {{
    showToast('Заказ пуст!', true);
    return;
  }}

  const rows = [
    ['№', 'Категория', 'Производитель / Бренд', 'Наименование товара', 'Количество', 'Единица']
  ];

  let num = 1;
  for (const [id, qty] of Object.entries(order)) {{
    if (qty > 0) {{
      const it = catalog.find(i => i.id === id);
      if (!it) continue;
      rows.push([
        num++,
        it.category || '',
        it.brand || '',
        it.official_name || it.taste,
        qty,
        it.unit
      ]);
    }}
  }}

  manualItems.forEach(it => {{
    rows.push([
      num++,
      it.category || 'Вручную',
      'Свободный ввод',
      it.name,
      it.quantity,
      it.unit
    ]);
  }});

  rows.push([]);
  rows.push(['', '', '', 'ИТОГО ПОЗИЦИЙ:', totals.count, '']);
  if (totals.totalKg > 0) rows.push(['', '', '', 'ОБЩИЙ ВЕС:', totals.totalKg, 'кг']);
  if (totals.totalBuckets > 0) rows.push(['', '', '', 'ВСЕГО ВЕДЕР:', totals.totalBuckets, 'шт']);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  ws['!cols'] = [
    {{ wch: 5 }},
    {{ wch: 18 }},
    {{ wch: 22 }},
    {{ wch: 45 }},
    {{ wch: 12 }},
    {{ wch: 10 }}
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Заказ");

  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `Заказ_снеков_${{today}}.xlsx`);
  showToast('📥 Файл Excel скачан!');
}}

// Reset entire order dialog
function confirmResetOrder() {{
  openConfirmDialog(
    'Очистить заказ?',
    'Все выбранные количества товаров и введенные вручную позиции будут сброшены.',
    () => {{
      order = {{}};
      manualItems = [];
      saveState();
      renderCatalog();
      updateOrderBar();
      closeOrderModal();
      showToast('🗑️ Заказ полностью очищен');
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
    input.value = localStorage.getItem('snack_custom_sheet_url') || DEFAULT_SHEET_XLSX_URL;
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
    localStorage.setItem('snack_custom_sheet_url', val);
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

// Utility: HTML Escaping
function escapeHtml(str) {{
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}}

// Utility: Search Highlighting
function highlightSearch(text, query) {{
  if (!query || !query.trim()) return escapeHtml(text);
  const q = query.trim().replace(/[.*+?^${{}}()|[\\]\\\\]/g, '\\\\$&');
  const regex = new RegExp(`(${{q}})`, 'gi');
  return escapeHtml(text).replace(regex, '<span style="color: #f59e0b; background: rgba(245, 158, 11, 0.2); border-radius: 3px; padding: 0 2px;">$1</span>');
}}

// Event Listeners setup
function setupEventListeners() {{
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {{
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  }}

  const searchClear = document.getElementById('searchClear');
  if (searchClear) {{
    searchClear.addEventListener('click', resetSearch);
  }}

  const dialogInput = document.getElementById('dialogInput');
  if (dialogInput) {{
    dialogInput.addEventListener('keydown', (e) => {{
      if (e.key === 'Enter') confirmDialogAction();
      if (e.key === 'Escape') closeDialog();
    }});
  }}
}}

// Register Service Worker for offline PWA
if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {{
  window.addEventListener('load', () => {{
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration skipped:', err));
  }});
}}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
"""

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Updated js/app.js successfully with all {len(items)} items and multi-sheet XLSX sync!")

