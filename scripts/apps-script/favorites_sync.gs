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
const ALLOWED_STORES = ['Битца', 'Битца2', 'БП', 'Олимп'];

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
 * GET запрос: возвращает список избранного по всем магазинам в формате JSON
 */
function doGet(e) {
  try {
    const sheet = getOrCreateFavoritesSheet();
    const data = sheet.getDataRange().getValues();
    
    const result = {
      status: 'ok',
      stores: {
        'Битца': [],
        'Битца2': [],
        'БП': [],
        'Олимп': []
      }
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
