const fs = require('fs');

// Mock browser globals
global.window = { scrollTo() {} };
global.document = {
  getElementById(id) {
    return {
      classList: { add() {}, remove() {} },
      addEventListener() {},
      querySelectorAll() { return []; },
      innerHTML: '',
      textContent: '',
      value: ''
    };
  },
  addEventListener() {},
  querySelector() { return null; }
};
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; }
};

// Load app.js
const vm = require('vm');
const appJs = fs.readFileSync('js/app.js', 'utf8');
vm.runInThisContext(appJs);

console.log('--- Test Web Integration ---');
console.log('Total catalog items in DEFAULT_CATALOG:', DEFAULT_CATALOG.length);

const pringlesItems = DEFAULT_CATALOG.filter(i => i.category === 'Pringles');
console.log('Pringles items in DEFAULT_CATALOG:', pringlesItems.length);
if (pringlesItems.length !== 15) {
  console.error('FAIL: Expected 15 Pringles items, got', pringlesItems.length);
  process.exit(1);
}

const snackSupplier = DEFAULT_SUPPLIERS.find(s => s.id === 'snacks');
console.log('Snack supplier name:', snackSupplier.name);
console.log('Snack supplier categories includes Pringles:', snackSupplier.categories.includes('Pringles'));

if (snackSupplier.name !== 'Пивные закуски') {
  console.error('FAIL: Expected supplier name "Пивные закуски", got', snackSupplier.name);
  process.exit(1);
}

// Test order logic
const testPringles = pringlesItems[0];
console.log('\nTesting order adding item:', testPringles.name);
order[testPringles.id] = 2; // order 2 cans

const totals = getOrderTotals('snacks');
console.log('Order totals for "snacks":', totals);
if (totals.count !== 1 || totals.totalPieces !== 2) {
  console.error('FAIL: getOrderTotals mismatch', totals);
  process.exit(1);
}

const orderText = generateOrderText('snacks');
console.log('\nGenerated Order Text preview:');
console.log(orderText);

if (!orderText.includes('ЗАКАЗ: ПИВНЫЕ ЗАКУСКИ') || !orderText.includes(testPringles.name)) {
  console.error('FAIL: Order text does not contain "ЗАКАЗ: ПИВНЫЕ ЗАКУСКИ" or product name');
  process.exit(1);
}

// Test parseGoogleSheetWorkbook with mock sheet Pringles
const mockWb = {
  SheetNames: ['Pringles'],
  Sheets: {
    'Pringles': {}
  }
};

global.XLSX = {
  utils: {
    sheet_to_json(ws, opts) {
      return [
        ['Наименование', 'Бренд', 'Вид продукта', 'Фасовка', 'Поставщик', 'Обновлено'],
        ['Принглс Паприка, 165 гр.', 'Pringles', 'Чипсы', '165 г', 'Пивные закуски', '13.11 02:00'],
        ['МИНИ Принглс ПАПРИКА, 40 гр.', 'Pringles', 'Чипсы', '40 г', 'Пивные закуски', '13.11 02:00']
      ];
    }
  }
};

const parsed = parseGoogleSheetWorkbook(mockWb);
console.log('\nParsed workbook result items count:', parsed.items.length);
const p1 = parsed.items[0];
console.log('Item 1:', p1);
if (p1.supplier !== 'snacks' || p1.category !== 'Pringles' || !p1.in_stock || p1.updated_at !== '13.11 02:00') {
  console.error('FAIL: parseGoogleSheetWorkbook item structure mismatch', p1);
  process.exit(1);
}

console.log('\nALL INTEGRATION TESTS PASSED PERFECTLY!');
