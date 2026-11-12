const fs = require('fs');
const https = require('https');

// Load gs script
const gsCode = fs.readFileSync('scripts/apps-script/pringles_parser.gs', 'utf8');

// Mock Google Apps Script environment
let mockSheet = {
  data: [],
  clearContents() { this.data = []; },
  clearFormats() {},
  getRange(r, c, numR, numC) {
    return {
      setValues(vals) {
        for (let i = 0; i < vals.length; i++) {
          mockSheet.data[r - 1 + i] = vals[i];
        }
      },
      setFontWeight() {},
      setBackground() {},
      setFontColor() {},
      setFontFamily() {},
      setFontSize() {},
      setHorizontalAlignment() {},
      setVerticalAlignment() {},
      setBorder() {}
    };
  },
  setRowHeight() {},
  setFrozenRows() {},
  autoResizeColumn() {}
};

let mockSS = {
  getSheetByName(name) { return mockSheet; },
  insertSheet(name) { return mockSheet; },
  toast(msg) { console.log('TOAST:', msg); }
};

global.SpreadsheetApp = {
  getActiveSpreadsheet() { return mockSS; },
  getUi() {
    return {
      createMenu(title) {
        return {
          addItem(label, func) { return this; },
          addSeparator() { return this; },
          addToUi() {}
        };
      }
    };
  },
  BorderStyle: { SOLID: 'SOLID' }
};

global.Utilities = {
  formatDate(date, tz, fmt) {
    return '13.11 01:30';
  }
};

global.Logger = {
  log(msg) { console.log('LOGGER:', msg); }
};

// Fetch live html and test UrlFetchApp
https.get('https://xn--80adjicenawr3ax3h.xn--p1ai/products/category/chipsi', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Received HTML bytes:', data.length);
    global.UrlFetchApp = {
      fetch(url, options) {
        return {
          getResponseCode() { return res.statusCode; },
          getContentText(enc) { return data; }
        };
      }
    };

    // Execute script
    eval(gsCode);

    // Call checkPringlesStock
    checkPringlesStock();

    console.log('\nMock Sheet Rows Count:', mockSheet.data.length);
    console.log('Header Row (Row 1):', mockSheet.data[0]);
    console.log('Sample Data Row (Row 2):', mockSheet.data[1]);
    console.log('Last Data Row:', mockSheet.data[mockSheet.data.length - 1]);
    console.log('\nAll Parsed Items:');
    mockSheet.data.slice(1).forEach((row, i) => {
      console.log(` ${i + 1}. [${row[3]}] ${row[0]} | Поставщик: ${row[4]} | Обновлено: ${row[5]}`);
    });
  });
}).on('error', err => {
  console.error('Fetch error:', err);
});

