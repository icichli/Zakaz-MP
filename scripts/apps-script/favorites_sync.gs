/**
 * =======================================================================
 * 🍺 ЗАКАЗ СНЕКОВ — СИНХРОНИЗАЦИЯ ИЗБРАННОГО ПО 4 МАГАЗИНАМ
 * Магазины: Битца, Битца2, БП, Олимп
 * =======================================================================
 * 
 * ИНСТРУКЦИЯ ПО УСТАНОВКЕ:
 * 1. Откройте вашу Google Таблицу («БАЗА СНЕКИ»).
 * 2. В верхнем меню выберите: «Расширения» ➔ «Apps Script».
 * 3. Создайте новый скрипт (или вставьте этот код рядом с pringles_parser.gs).
 * 4. Нажмите «Развернуть» (Deploy) ➔ «Новое развертывание» (New deployment).
 * 5. Тип: «Веб-приложение» (Web app).
 * 6. Описание: «Синхронизация избранного магазинов».
 * 7. Выполнять от имени: «От моего имени» (Me).
 * 8. У кого есть доступ: «Все» (Anyone) — это позволит продавцам с телефонов
 *    сохранять избранное без необходимости авторизации в Google.
 * 9. Нажмите «Развернуть», разрешите доступ и скопируйте полученную ссылку веб-приложения:
 *    (вида: https://script.google.com/macros/s/.../exec).
 * 10. Вставьте эту ссылку в настройки веб-приложения «Заказ Снеков» (⚙️ ➔ Настройки).
 */

const SHEET_NAME_FAVORITES = 'Избранное';
const SHEET_NAME_CUSTOM_ITEMS = 'Добавлены пользователем';
const ALLOWED_STORES = ['Битца', 'Битца2', 'БП', 'Олимп'];

// 4-значные PIN-коды доступа к магазинам (задайте свои коды для торговых точек)
const STORE_PINS = {
  'bitca': '1111',
  'bitca2': '2222',
  'bp': '3333',
  'olimp': '4444',
  'Битца': '1111',
  'Битца2': '2222',
  'БП': '3333',
  'Олимп': '4444'
};

/**
 * Обработка проверки PIN-кода магазина
 * Возвращает { "ok": true } или { "ok": false, "error": "Неверный PIN-код" }
 */
function handlePinCheck(store, pin) {
  if (!store) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: 'Не указан магазин'
    })).setMimeType(ContentService.MimeType.JSON);
  }

  const expectedPin = STORE_PINS[store];
  if (!expectedPin) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: 'Магазин не найден'
    })).setMimeType(ContentService.MimeType.JSON);
  }

  if (String(pin).trim() === expectedPin) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: true
    })).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: 'Неверный PIN-код'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Получить или создать лист «Избранное» со стандартным форматированием
 */
function getOrCreateFavoritesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME_FAVORITES);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_FAVORITES);
    const headers = ['Магазин', 'ID товара', 'Наименование товара', 'Поставщик', 'Дата добавления'];
    sheet.appendRow(headers);
    
    // Форматирование заголовка
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#0f172a');
    headerRange.setFontColor('#f59e0b');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    
    // Автоматическая ширина колонок
    sheet.setColumnWidth(1, 120); // Магазин
    sheet.setColumnWidth(2, 120); // ID товара
    sheet.setColumnWidth(3, 320); // Наименование
    sheet.setColumnWidth(4, 140); // Поставщик
    sheet.setColumnWidth(5, 160); // Дата
  }
  return sheet;
}

/**
 * Получить или создать лист «Добавлены пользователем»
 */
function getOrCreateCustomItemsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME_CUSTOM_ITEMS);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_CUSTOM_ITEMS);
    const headers = ['ID товара', 'Наименование', 'Раздел', 'Фасовка', 'Поставщик', 'Магазин', 'Дата добавления'];
    sheet.appendRow(headers);

    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#0f172a');
    headerRange.setFontColor('#f59e0b');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);

    sheet.setColumnWidth(1, 160); // ID товара
    sheet.setColumnWidth(2, 320); // Наименование
    sheet.setColumnWidth(3, 160); // Раздел
    sheet.setColumnWidth(4, 110); // Фасовка
    sheet.setColumnWidth(5, 160); // Поставщик
    sheet.setColumnWidth(6, 110); // Магазин
    sheet.setColumnWidth(7, 160); // Дата добавления
  }
  return sheet;
}

/**
 * Прочитать все товары из листа «Добавлены пользователем»
 */
function readCustomItemsFromSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME_CUSTOM_ITEMS);
  if (!sheet) return [];

  const data = sheet.getDataRange().getValues();
  const items = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const id = String(row[0] || '').trim();
    const name = String(row[1] || '').trim();
    if (!name) continue;
    items.push({
      id: id,
      name: name,
      subcat: String(row[2] || '').trim(),
      pack: String(row[3] || '').trim(),
      supplier: String(row[4] || '').trim(),
      store: String(row[5] || '').trim(),
      createdAt: String(row[6] || '').trim()
    });
  }
  return items;
}

/**
 * GET запрос:
 * 1. Проверка PIN-кода магазина: ?store=bitca&pin=1111 -> { "ok": true }
 * 2. Получение списка добавленных пользователем товаров: ?action=getCustomItems
 * 3. Получение избранного и добавленных товаров: без параметров -> { status: "ok", stores: { ... }, customItems: [ ... ] }
 */
function doGet(e) {
  try {
    // Режим 1: Проверка PIN-кода магазина
    if (e && e.parameter && (e.parameter.pin !== undefined || e.parameter.store !== undefined)) {
      const storeParam = String(e.parameter.store || '').trim();
      const pinParam = String(e.parameter.pin || '').trim();
      return handlePinCheck(storeParam, pinParam);
    }

    // Режим 2: Только пользовательские товары
    if (e && e.parameter && e.parameter.action === 'getCustomItems') {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'ok',
        customItems: readCustomItemsFromSheet()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Режим 3: Получение избранного + пользовательских товаров
    const sheet = getOrCreateFavoritesSheet();
    const data = sheet.getDataRange().getValues();
    
    const result = {
      status: 'ok',
      stores: {
        'Битца': [],
        'Битца2': [],
        'БП': [],
        'Олимп': []
      },
      customItems: readCustomItemsFromSheet()
    };
    
    if (data.length > 1) {
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const store = String(row[0] || '').trim();
        const itemId = String(row[1] || '').trim();
        const itemName = String(row[2] || '').trim();
        
        if (store && (itemId || itemName)) {
          if (!result.stores[store]) {
            result.stores[store] = [];
          }
          result.stores[store].push({
            id: itemId,
            name: itemName,
            supplier: String(row[3] || '').trim()
          });
        }
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * POST запрос: добавление, удаление или массовое сохранение избранного
 */
function doPost(e) {
  try {
    const sheet = getOrCreateFavoritesSheet();
    let body = {};
    
    if (e && e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        body = e.parameter || {};
      }
    } else if (e && e.parameter) {
      body = e.parameter;
    }
    
    const action = body.action || 'toggleFavorite';
    const store = String(body.store || '').trim();
    const itemId = String(body.itemId || '').trim();
    const itemName = String(body.itemName || '').trim();
    const supplier = String(body.supplier || '').trim();
    const isFavorite = body.isFavorite === true || body.isFavorite === 'true';
    
    const data = sheet.getDataRange().getValues();
    const nowStr = Utilities.formatDate(new Date(), 'Europe/Moscow', 'dd.MM.yyyy HH:mm:ss');
    
    // Режим 1: Переключение одного товара (добавить / удалить)
    if (action === 'toggleFavorite') {
      if (!store) {
        throw new Error('Не указан магазин');
      }
      
      let foundRow = -1;
      for (let i = 1; i < data.length; i++) {
        const rowStore = String(data[i][0] || '').trim();
        const rowId = String(data[i][1] || '').trim();
        const rowName = String(data[i][2] || '').trim();
        
        if (rowStore === store) {
          if ((itemId && rowId === itemId) || (itemName && rowName === itemName)) {
            foundRow = i + 1; // 1-based index в Sheets
            break;
          }
        }
      }
      
      if (isFavorite) {
        if (foundRow === -1) {
          sheet.appendRow([store, itemId, itemName, supplier, nowStr]);
        } else {
          // Обновляем ID, наименование и дату для актуализации строки
          if (itemId) sheet.getRange(foundRow, 2).setValue(itemId);
          if (itemName) sheet.getRange(foundRow, 3).setValue(itemName);
          if (supplier) sheet.getRange(foundRow, 4).setValue(supplier);
          sheet.getRange(foundRow, 5).setValue(nowStr);
        }
      } else {
        if (foundRow !== -1) {
          sheet.deleteRow(foundRow);
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'ok',
        action: action,
        store: store,
        itemId: itemId,
        isFavorite: isFavorite
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Режим 2: Массовое сохранение избранного магазина (замена списка)
    if (action === 'setStoreFavorites' && store && Array.isArray(body.items)) {
      // Удаляем существующие строки этого магазина снизу вверх
      for (let i = data.length - 1; i >= 1; i--) {
        const rowStore = String(data[i][0] || '').trim();
        if (rowStore === store) {
          sheet.deleteRow(i + 1);
        }
      }
      
      // Добавляем новые
      const rowsToAdd = body.items.map(it => [
        store,
        it.id || '',
        it.name || '',
        it.supplier || '',
        nowStr
      ]);
      
      if (rowsToAdd.length > 0) {
        sheet.getRange(sheet.getLastRow() + 1, 1, rowsToAdd.length, 5).setValues(rowsToAdd);
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'ok',
        store: store,
        count: rowsToAdd.length
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Режим 3: Добавление товара в общую базу «Добавлены пользователем»
    if (action === 'addCustomItem') {
      const cleanName = String(body.itemName || '').replace(/\s+/g, ' ').trim();
      if (!cleanName) {
        throw new Error('Не указано наименование товара');
      }
      const subcat = String(body.subcat || '').trim();
      const pack = String(body.pack || '1').trim();
      const supName = supplier || 'Снеки и закуски';

      const customSheet = getOrCreateCustomItemsSheet();
      const customData = customSheet.getDataRange().getValues();
      const targetNorm = cleanName.toLowerCase();

      for (let i = 1; i < customData.length; i++) {
        const rowId = String(customData[i][0] || '').trim();
        const rowName = String(customData[i][1] || '').replace(/\s+/g, ' ').trim().toLowerCase();
        const rowSup = String(customData[i][4] || '').trim();
        if ((itemId && rowId === itemId) || (rowName === targetNorm && (!supName || !rowSup || rowSup.toLowerCase() === supName.toLowerCase()))) {
          return ContentService.createTextOutput(JSON.stringify({
            status: 'duplicate',
            action: action,
            itemId: rowId || itemId,
            message: 'Товар уже есть в базе'
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }

      const finalId = itemId || ('user_' + Date.now());
      customSheet.appendRow([finalId, cleanName, subcat, pack, supName, store, nowStr]);

      return ContentService.createTextOutput(JSON.stringify({
        status: 'ok',
        action: action,
        itemId: finalId,
        itemName: cleanName
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Режим 4: Удаление товара из листа «Добавлены пользователем»
    if (action === 'deleteCustomItem') {
      const customSheet = getOrCreateCustomItemsSheet();
      const customData = customSheet.getDataRange().getValues();
      const targetName = String(itemName || '').replace(/\s+/g, ' ').trim().toLowerCase();
      let deletedCount = 0;

      for (let i = customData.length - 1; i >= 1; i--) {
        const rowId = String(customData[i][0] || '').trim();
        const rowName = String(customData[i][1] || '').replace(/\s+/g, ' ').trim().toLowerCase();
        const rowSup = String(customData[i][4] || '').trim();

        const idMatch = itemId && rowId && rowId === itemId;
        const nameMatch = targetName && rowName === targetName && (!supplier || !rowSup || rowSup.toLowerCase() === supplier.toLowerCase());

        if (idMatch || nameMatch) {
          customSheet.deleteRow(i + 1);
          deletedCount++;
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: 'ok',
        action: action,
        deleted: deletedCount
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Неизвестное действие: ' + action
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
