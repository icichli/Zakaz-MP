/**
 * =========================================================================================
 * 🥔 Google Apps Script: Автоматический парсер доступных позиций Pringles
 * =========================================================================================
 * Таблица: «БАЗА СНЕКИ»
 * Лист: «Pringles» (создается автоматически; остальные 15 вкладок таблицы НЕ затрагиваются)
 * Источник: https://пивныезакуски.рф/products/category/chipsi
 * Punycode URL: https://xn--80adjicenawr3ax3h.xn--p1ai/products/category/chipsi
 *
 * Логика:
 *  1. Загружает категорию «Чипсы» с сайта поставщика (Nethouse, без цен и без перехода в товары).
 *  2. Отбирает товары, содержащие "принглс" / "pringles".
 *  3. Отсекает американские позиции (158 г / "американск").
 *  4. Оставляет все остальные вкусы и фасовки (165 г, 40 г, 160 г и любые новинки).
 *  5. Если сайт недоступен или вернул ошибку — предыдущий список на листе НЕ затирается (защита).
 *  6. Перезаписывает лист «Pringles» актуальным списком, сортирует по алфавиту (А-Я).
 *  7. Каждая позиция привязывается к поставщику «Пивные закуски».
 * =========================================================================================
 */

const CONFIG = {
  SHEET_NAME: 'Pringles',
  SOURCE_URL: 'https://xn--80adjicenawr3ax3h.xn--p1ai/products/category/chipsi',
  BASE_DOMAIN: 'https://xn--80adjicenawr3ax3h.xn--p1ai',
  TIMEZONE: 'Europe/Moscow',
  HEADERS: ['Наименование', 'Бренд', 'Вид продукта', 'Фасовка', 'Поставщик', 'Обновлено', 'Фото'],
  DEFAULT_BRAND: 'Pringles',
  DEFAULT_CATEGORY: 'Чипсы',
  DEFAULT_SUPPLIER: 'Пивные закуски'
};

/**
 * Создание пользовательского меню при открытии Google Таблицы
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Парсер снеков')
    .addItem('Обновить наличие Pringles', 'checkPringlesStock')
    .addSeparator()
    .addItem('Настроить автообновление (каждые 30 мин)', 'setupPringlesTrigger')
    .addToUi();
}

/**
 * Основная рабочая функция парсера и обновления наличия Pringles.
 * Запускается вручную из меню или по триггеру времени каждые 15–30 минут.
 */
function checkPringlesStock() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Получаем или создаем строго отдельный лист 'Pringles' (другие 15 листов не трогаем!)
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    initSheetLayout(sheet);
  }

  // 2. HTTP-запрос к странице категории поставщика
  let html = '';
  try {
    const options = {
      method: 'get',
      muteHttpExceptions: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    };
    const response = UrlFetchApp.fetch(CONFIG.SOURCE_URL, options);
    const statusCode = response.getResponseCode();

    if (statusCode !== 200) {
      Logger.log('Внимание: сайт поставщика вернул HTTP код ' + statusCode + '. Текущий список сохранен без изменений.');
      notifyUser('Сайт поставщика вернул код ошибки ' + statusCode + '. Список Pringles не изменен.');
      return;
    }

    html = response.getContentText('UTF-8');
  } catch (err) {
    Logger.log('Сетевая ошибка при обращении к сайту поставщика: ' + err.toString());
    notifyUser('Ошибка сети при запросе к сайту поставщика. Текущий список Pringles сохранен.');
    return;
  }

  // Защита от пустой страницы или капчи
  if (!html || html.length < 500) {
    Logger.log('Внимание: получен слишком короткий или пустой HTML. Предыдущий список сохранен.');
    return;
  }

  // 3. Извлечение позиций товаров Pringles из разметки страницы категории
  const items = extractPringlesItems(html);

  // Защита: если найдено 0 позиций (например, сайт временно изменил структуру или выдал заглушку) — не затираем данные
  if (!items || items.length === 0) {
    Logger.log('Внимание: на странице не обнаружено позиций Pringles. Предыдущие строки сохранены.');
    notifyUser('Позиции Pringles на странице не обнаружены. Предыдущий список сохранен.');
    return;
  }

  // 4. Сортировка по алфавиту от А до Я
  items.sort(function(a, b) {
    return a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' });
  });

  // 5. Текущая дата и время синхронизации (Europe/Moscow, формат dd.MM HH:mm)
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, CONFIG.TIMEZONE, 'dd.MM HH:mm');

  // 6. Формирование строк таблицы (A1:G1)
  //  A: Наименование
  //  B: Бренд
  //  C: Вид продукта
  //  D: Фасовка
  //  E: Поставщик
  //  F: Обновлено
  //  G: Фото
  const rows = items.map(function(item) {
    return [
      item.name,                // A: точное название товара со страницы поставщика
      CONFIG.DEFAULT_BRAND,     // B: Pringles
      CONFIG.DEFAULT_CATEGORY,  // C: Чипсы
      item.weight,              // D: автоматически извлеченный вес (165 г, 40 г, 160 г и т.д.)
      CONFIG.DEFAULT_SUPPLIER,  // E: Пивные закуски
      formattedDate,            // F: дата и время (dd.MM HH:mm)
      item.imageUrl || ''       // G: URL фотографии товара (или пустая строка)
    ];
  });

  // 7. Полная перезапись листа Pringles
  // Очищаем старые данные
  sheet.clearContents();
  sheet.clearFormats();

  // Записываем шапку
  initSheetLayout(sheet);

  // Записываем новые строки
  if (rows.length > 0) {
    const dataRange = sheet.getRange(2, 1, rows.length, CONFIG.HEADERS.length);
    dataRange.setValues(rows);

    // Стилизация строк данных
    dataRange.setFontFamily('Arial');
    dataRange.setFontSize(10);
    dataRange.setVerticalAlignment('middle');

    // Выравнивание: Наименование влево, остальные колонки по центру
    sheet.getRange(2, 1, rows.length, 1).setHorizontalAlignment('left');
    sheet.getRange(2, 2, rows.length, CONFIG.HEADERS.length - 1).setHorizontalAlignment('center');

    // Границы ячеек для опрятного вида
    dataRange.setBorder(true, true, true, true, true, true, '#cbd5e1', SpreadsheetApp.BorderStyle.SOLID);
  }

  // Автоматический подбор ширины колонок
  for (let c = 1; c <= CONFIG.HEADERS.length; c++) {
    sheet.autoResizeColumn(c);
  }

  Logger.log('Успешно синхронизировано позиций Pringles: ' + rows.length);
  notifyUser('Наличие Pringles успешно обновлено: ' + rows.length + ' позиций в наличии.');
}

/**
 * Парсинг позиций Pringles из HTML страницы категории
 */
function extractPringlesItems(html) {
  const items = [];
  const seen = {};

  // Основной паттерн для Nethouse: карточки товаров с названиями в <p class="product-link..."><span class="-table-cell"><a ... class="blue">
  const regexPrimary = /<p\s+[^>]*class="[^"]*product-link[^"]*"[^>]*>[\s\S]*?<a[^>]+class="[^"]*blue[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  let lastMatchEnd = 0;

  while ((match = regexPrimary.exec(html)) !== null) {
    const cleanName = cleanProductTitle(match[1]);
    const matchIndex = match.index;
    const matchLength = match[0].length;

    if (!cleanName || seen[cleanName]) {
      lastMatchEnd = matchIndex + matchLength;
      continue;
    }

    if (isValidPringlesProduct(cleanName)) {
      seen[cleanName] = true;

      // Извлекаем href товара (например /products/12345)
      let productHref = '';
      const hrefMatch = /href=["']([^"']+)["']/i.exec(match[0]);
      if (hrefMatch && hrefMatch[1]) {
        productHref = hrefMatch[1].trim();
      }

      // Извлекаем URL фотографии карточки товара
      const imageUrl = findProductImage(html, matchIndex, matchLength, productHref, lastMatchEnd);

      items.push({
        name: cleanName,
        weight: extractWeightFromName(cleanName),
        imageUrl: imageUrl || ''
      });
    }

    lastMatchEnd = matchIndex + matchLength;
  }

  // Запасной паттерн (по ссылкам вида /products/\d+)
  if (items.length === 0) {
    const regexFallback = /<a\s+[^>]*href=["']([^"']*\/products\/\d+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let fbMatch;
    let fbLastEnd = 0;

    while ((fbMatch = regexFallback.exec(html)) !== null) {
      if (fbMatch[0].indexOf('blue') === -1) continue;
      const cleanName = cleanProductTitle(fbMatch[2]);
      const matchIndex = fbMatch.index;
      const matchLength = fbMatch[0].length;

      if (!cleanName || seen[cleanName]) {
        fbLastEnd = matchIndex + matchLength;
        continue;
      }

      if (isValidPringlesProduct(cleanName)) {
        seen[cleanName] = true;
        const productHref = fbMatch[1] ? fbMatch[1].trim() : '';
        const imageUrl = findProductImage(html, matchIndex, matchLength, productHref, fbLastEnd);

        items.push({
          name: cleanName,
          weight: extractWeightFromName(cleanName),
          imageUrl: imageUrl || ''
        });
      }

      fbLastEnd = matchIndex + matchLength;
    }
  }

  return items;
}

/**
 * Поиск тега <img>, относящегося к данной карточке товара
 */
function findProductImage(html, matchIndex, matchLength, productHref, lastMatchEnd) {
  // 1. Если известен href товара, ищем в блоке перед заголовком ссылку с таким же href и тегом <img>
  if (productHref) {
    const escapedHref = productHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const chunkStart = Math.max(lastMatchEnd, matchIndex - 3000);
    const chunkBefore = html.substring(chunkStart, matchIndex);

    // Паттерн: <a href="productHref"...>...<img...>
    const linkImgRegex = new RegExp('<a\\s+[^>]*href=["\']' + escapedHref + '["\'][^>]*>[\\s\\S]*?(<img\\b[^>]*>)[\\s\\S]*?<\\/a>', 'i');
    const linkImgMatch = linkImgRegex.exec(chunkBefore);
    if (linkImgMatch && linkImgMatch[1]) {
      const url = extractImageUrlFromTag(linkImgMatch[1]);
      if (url) return url;
    }
  }

  // 2. Ищем последний тег <img> перед заголовком товара в пределах текущей карточки
  const chunkStart = Math.max(lastMatchEnd, matchIndex - 3000);
  const chunkBefore = html.substring(chunkStart, matchIndex);
  const imgRegex = /<img\b[^>]*>/gi;
  let imgMatch;
  let lastImgTag = '';

  while ((imgMatch = imgRegex.exec(chunkBefore)) !== null) {
    lastImgTag = imgMatch[0];
  }

  if (lastImgTag) {
    const url = extractImageUrlFromTag(lastImgTag);
    if (url) return url;
  }

  // 3. Запасной поиск: тег <img> внутри самого заголовка/ссылки
  const matchChunk = html.substring(matchIndex, matchIndex + matchLength);
  const insideImgMatch = /<img\b[^>]*>/i.exec(matchChunk);
  if (insideImgMatch) {
    const url = extractImageUrlFromTag(insideImgMatch[0]);
    if (url) return url;
  }

  // 4. Запасной поиск: сразу после заголовка (в пределах 1500 символов)
  const chunkAfter = html.substring(matchIndex + matchLength, matchIndex + matchLength + 1500);
  const afterImgMatch = /<img\b[^>]*>/i.exec(chunkAfter);
  if (afterImgMatch) {
    const url = extractImageUrlFromTag(afterImgMatch[0]);
    if (url) return url;
  }

  return '';
}

/**
 * Извлечение URL фотографии из тега <img> с проверкой атрибутов
 * (data-src, data-original, src, игнорирование data:image)
 * и приведением относительных путей к полному виду с доменом
 */
function extractImageUrlFromTag(imgTag) {
  if (!imgTag) return '';

  const attrNames = ['data-src', 'data-original', 'src'];
  for (let i = 0; i < attrNames.length; i++) {
    const attr = attrNames[i];
    const regex = new RegExp('\\b' + attr + '\\s*=\\s*["\']([^"\']+)["\']', 'i');
    const match = regex.exec(imgTag);
    if (match && match[1]) {
      const val = match[1].trim();
      if (val && val.toLowerCase().indexOf('data:image') === -1) {
        return normalizeImageUrl(val);
      }
    }
  }

  return '';
}

/**
 * Нормализация URL изображения (добавление домена к относительным путям)
 */
function normalizeImageUrl(url) {
  if (!url) return '';
  const cleanUrl = String(url).trim();
  if (!cleanUrl || cleanUrl.toLowerCase().indexOf('data:image') !== -1) {
    return '';
  }

  // Протокол-относительные URL (//example.com/img.jpg)
  if (cleanUrl.indexOf('//') === 0) {
    return 'https:' + cleanUrl;
  }

  // Полные абсолютные URL (http:// или https://)
  if (/^https?:\/\//i.test(cleanUrl)) {
    return cleanUrl;
  }

  // Относительные пути
  const baseDomain = CONFIG.BASE_DOMAIN || 'https://xn--80adjicenawr3ax3h.xn--p1ai';
  if (cleanUrl.indexOf('/') === 0) {
    return baseDomain + cleanUrl;
  } else {
    return baseDomain + '/' + cleanUrl;
  }
}

/**
 * Проверка соответствия позиции условиям:
 *  - бренд Принглс / Pringles (без учета регистра)
 *  - исключение американских позиций (158 г / "американск")
 */
function isValidPringlesProduct(name) {
  if (!name) return false;
  const lower = name.toLowerCase();

  // 1. Обязательно содержит "принглс" или "pringles"
  const isPringles = lower.indexOf('принглс') !== -1 || lower.indexOf('pringles') !== -1;
  if (!isPringles) return false;

  // 2. Исключаем американские варианты 158 г
  const isAmerican = lower.indexOf('американск') !== -1 || lower.indexOf('158') !== -1;
  if (isAmerican) return false;

  return true;
}

/**
 * Автоматическое извлечение фасовки (веса) из названия товара
 * Примеры:
 *  "Принглс Сыр, 165 гр." -> "165 г"
 *  "МИНИ Принглс ПАПРИКА, 40 гр." -> "40 г"
 *  "Принглс со вкусом BBQ, 160 гр." -> "160 г"
 */
function extractWeightFromName(name) {
  if (!name) return 'Не указана';

  // Поиск граммов (г, гр, грамм, g). Не используем \b из-за кириллицы
  const matchGram = name.match(/(\d+(?:[.,]\d+)?)\s*(?:грамм|гр|г|g)(?![a-zа-я0-9])/i);
  if (matchGram) {
    const num = matchGram[1].replace(',', '.');
    return num + ' г';
  }

  // Поиск килограммов (кг, kg) если появится
  const matchKg = name.match(/(\d+(?:[.,]\d+)?)\s*(?:килограмм|кило|кг|kg)(?![a-zа-я0-9])/i);
  if (matchKg) {
    const num = matchKg[1].replace(',', '.');
    return num + ' кг';
  }

  return 'Не указана';
}

/**
 * Очистка названия от HTML-тегов, HTML-сущностей и лишних пробелов
 */
function cleanProductTitle(raw) {
  if (!raw) return '';
  let str = raw;

  // Декодируем HTML сущности (поддержка повторного декодирования &amp;amp;)
  for (let i = 0; i < 3; i++) {
    if (str.indexOf('&') === -1) break;
    str = decodeHtml(str);
  }

  // Удаляем теги и нормализуем пробелы
  str = str.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

  // Удаляем фразу "в упаковке" из названия товара для чистого отображения
  str = str
    .replace(/,\s*в\s+упаковке(?![a-zа-я0-9])/gi, ',')
    .replace(/\(\s*в\s+упаковке\s*\)/gi, '')
    .replace(/(?:^|\s)в\s+упаковке(?![a-zа-я0-9])/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*,\s*,/g, ',')
    .trim();

  return str;
}

function decodeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
}

/**
 * Инициализация шапки листа 'Pringles'
 */
function initSheetLayout(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, CONFIG.HEADERS.length);
  headerRange.setValues([CONFIG.HEADERS]);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#1e293b'); // Темно-синий строгий фон
  headerRange.setFontColor('#ffffff');
  headerRange.setFontFamily('Arial');
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');
  sheet.setRowHeight(1, 30);
  sheet.setFrozenRows(1);
}

/**
 * Всплывающее уведомление в интерфейсе таблицы (только при ручном запуске)
 */
function notifyUser(message) {
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast(message, 'Парсер Pringles', 6);
  } catch (e) {
    // В автоматических триггерах UI недоступен
  }
}

/**
 * Вспомогательная функция для быстрой установки триггера времени (раз в 30 минут)
 * Запускается прямо из меню: «Парсер снеков -> Настроить автообновление»
 */
function setupPringlesTrigger() {
  const handlerName = 'checkPringlesStock';
  const triggers = ScriptApp.getProjectTriggers();
  
  // Удаляем старые триггеры этой функции во избежание дублирования
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === handlerName) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Создаем триггер каждые 30 минут
  ScriptApp.newTrigger(handlerName)
    .timeBased()
    .everyMinutes(30)
    .create();

  notifyUser('Автообновление Pringles каждые 30 минут успешно включено!');
}
