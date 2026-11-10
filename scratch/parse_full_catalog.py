import openpyxl
import re
import json

wb = openpyxl.load_workbook('full_spreadsheet.xlsx')

def clean_title(title):
    t = title.replace('`', '').strip()
    # remove trailing ', шт' or ', кг'
    t = re.sub(r'[,;\s]+(шт|кг)\.?$', '', t, flags=re.IGNORECASE).strip()
    return t

def extract_unit_and_step(title, sheetname):
    t_lower = title.lower()
    
    # Defaults by sheet
    if 'завод' in sheetname.lower() or 'соусы' in sheetname.lower():
        unit = 'шт'
        step = 1
    elif 'ведро' in t_lower:
        unit = 'ведро'
        step = 1
    elif '0.5кг' in t_lower or '0,5 кг' in t_lower or '0,5кг' in t_lower or '0.5 кг' in t_lower or '500гр' in t_lower or '500 гр' in t_lower:
        unit = 'кг'
        step = 0.5
    elif '100гр' in t_lower or '150гр' in t_lower or '90 гр' in t_lower or '90гр' in t_lower or '50гр' in t_lower or '180гр' in t_lower:
        unit = 'шт'
        step = 1
    elif '1кг' in t_lower or '1 кг' in t_lower:
        unit = 'кг'
        step = 1.0
    elif 'мясные' in sheetname.lower() or 'сырные' in sheetname.lower():
        unit = 'кг'
        step = 0.5
    else:
        unit = 'кг'
        step = 1.0

    return unit, step

def parse_item(raw_title, sheetname, index):
    raw_title = raw_title.replace('`', '').strip()
    clean_off = clean_title(raw_title)
    unit, step = extract_unit_and_step(raw_title, sheetname)

    category = sheetname
    brand = ''
    subcat = ''
    taste = clean_off

    # Clean category name for UI tabs
    cat_map = {
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
    }
    category = cat_map.get(sheetname, sheetname)

    # Brand & Taste extraction
    if sheetname == 'Гренки Весовые':
        if 'ВЕДРО ЮБИЛЕЙНЫЕ' in raw_title.upper():
            brand = 'Юбилейные'
            subcat = 'В ведрах (0.9 кг)'
            taste = re.sub(r'ВЕДРО ЮБИЛЕЙНЫЕ\s*', '', raw_title, flags=re.I)
            taste = re.sub(r'0[,.]9\s*кг.*', '', taste, flags=re.I).strip()
        elif 'ЛУТОВСКИЕ' in raw_title.upper():
            brand = 'Лутовские'
            subcat = 'Пшеничные' if 'пшенич' in raw_title.lower() else ('Ржаные' if 'ржан' in raw_title.lower() else 'Классика')
            m = re.search(r'\((.*?)\)', raw_title)
            taste = m.group(1).strip() if m else raw_title
        elif 'БРО' in raw_title.upper():
            brand = 'Бро'
            subcat = 'Крафтовые'
            m = re.search(r'\((.*?)\)', raw_title)
            taste = m.group(1).strip() if m else raw_title
        elif 'СНАПСЫ' in raw_title.upper():
            brand = 'СНАПСЫ'
            subcat = 'Пшеничные' if 'пшенич' in raw_title.lower() else 'Ржаные'
            m = re.search(r'["«](.*?)["»]', raw_title) or re.search(r'\((.*?)\)', raw_title)
            taste = m.group(1).strip() if m else raw_title
        elif 'ДЕМИДОВСКИЕ' in raw_title.upper():
            brand = 'Демидовские'
            subcat = 'Сухарики'
            m = re.search(r'\((.*?)\)', raw_title)
            taste = m.group(1).strip() if m else raw_title
        elif 'ЖИТНИЦКИЕ' in raw_title.upper():
            brand = 'Житницкие'
            subcat = 'Багет'
            m = re.search(r'\((.*?)\)', raw_title)
            taste = m.group(1).strip() if m else raw_title
        elif raw_title.upper().startswith('СУХАРИ'):
            brand = 'Классика'
            subcat = 'Сухарики'
            m = re.search(r'["«](.*?)["»]', raw_title) or re.search(r'\((.*?)\)', raw_title)
            taste = m.group(1).strip() if m else raw_title

    elif sheetname == 'Сырные Сухие':
        brand = 'Сырные сухие'
        if 'CHEE CORN' in raw_title.upper():
            subcat = 'Chee Corn'
        else:
            subcat = 'Шарики / Бочонки'
        taste = clean_off

    elif sheetname == 'Гренки Чипсы и снеки ЗАВОДСКИЕ':
        if 'СУРСКИЕ' in raw_title.upper():
            brand = 'Сурские'
            subcat = 'Гренки 100г'
            taste = re.sub(r'Гренки Сурские\s*', '', raw_title, flags=re.I)
            taste = re.sub(r'100\s*гр.*', '', taste, flags=re.I).strip()
        elif 'ЧИПСЫ' in raw_title.upper():
            brand = 'Чипсы'
            subcat = 'Заводские'
            taste = clean_off
        else:
            brand = 'Заводские'
            subcat = 'Снеки'
            taste = clean_off

    elif sheetname == 'Орехи':
        if 'AVERTON' in raw_title.upper():
            brand = 'Averton'
            subcat = 'В глазури'
            taste = re.sub(r'Арахис Averton в глазури\s*', '', raw_title, flags=re.I)
            taste = re.sub(r'1\s*кг.*', '', taste, flags=re.I).strip()
        elif 'ФОМАЛУКИЧ' in raw_title.upper():
            brand = 'ФомаЛукич'
            subcat = 'В хруст. корочке'
            taste = re.sub(r'Арахис в хруст\.корочке ФомаЛукич\s*', '', raw_title, flags=re.I)
            taste = re.sub(r'1\s*кг.*', '', taste, flags=re.I).strip()
        elif 'ФИСТАШК' in raw_title.upper():
            brand = 'Фисташки'
            subcat = 'Орехи'
            taste = clean_off
        elif 'КЕШЬЮ' in raw_title.upper():
            brand = 'Кешью'
            subcat = 'Орехи'
            taste = clean_off
        elif 'МИНДАЛЬ' in raw_title.upper():
            brand = 'Миндаль'
            subcat = 'Орехи'
            taste = clean_off
        elif 'ФУНДУК' in raw_title.upper():
            brand = 'Фундук'
            subcat = 'Орехи'
            taste = clean_off
        elif 'АРАХИС' in raw_title.upper():
            brand = 'Арахис'
            subcat = 'Орехи'
            taste = clean_off
        else:
            brand = 'Орехи'
            taste = clean_off

    elif sheetname == 'Начос и лавашики':
        if 'НАЧОС' in raw_title.upper():
            brand = 'Начос'
            subcat = 'Кукурузные чипсы'
            m = re.findall(r'["«](.*?)["»]', raw_title)
            taste = m[-1] if m else clean_off
        else:
            brand = 'Лавашики'
            subcat = 'Снеки'
            taste = clean_off

    elif sheetname == 'Соусы':
        brand = 'Соусы порционные'
        subcat = '90г'
        taste = clean_off

    elif sheetname == 'Рыбные':
        if 'КАЛЬМАР' in raw_title.upper():
            brand = 'Кальмар'
            subcat = 'Рыбные снеки'
        elif 'ИКРА' in raw_title.upper():
            brand = 'Икра'
            subcat = 'Рыбные деликатесы'
        elif 'АНЧОУС' in raw_title.upper() or 'ПОЛОСАТИК' in raw_title.upper():
            brand = 'Сушеная рыбка'
            subcat = 'Рыбные снеки'
        else:
            brand = 'Рыба'
            subcat = 'Рыбные снеки'
        taste = clean_off

    elif sheetname == 'Сыры':
        if 'ДОНДУКОВСКИЙ' in raw_title.upper():
            brand = 'Дондуковский'
            subcat = 'Пряди / Косичка'
        elif 'САНККИНО' in raw_title.upper():
            brand = 'Санккино'
            subcat = 'Бочонок / Коса / Спагетти'
        elif 'ФЕРМЕРСКИЙ' in raw_title.upper():
            brand = 'Фермерский'
            subcat = 'Бочонок / Коса / Спагетти'
        else:
            brand = 'Сыры'
            subcat = 'Разное'
        taste = clean_off

    elif sheetname == 'Мясные':
        if 'КНУТЫ' in raw_title.upper():
            brand = 'Кнуты'
            subcat = 'Мясные кнуты'
        elif 'КОЛБАСКИ' in raw_title.upper():
            brand = 'Колбаски'
            subcat = 'Сырокопченые'
        elif 'МЯСНЫЕ ЧИПСЫ' in raw_title.upper() or 'ЧИПСЫ МЯСНЫЕ' in raw_title.upper():
            brand = 'Мясные чипсы'
            subcat = 'Чипсы'
        else:
            brand = 'Мясные'
            subcat = 'Снеки'
        taste = clean_off

    elif sheetname == 'Мясные ЗАВОД':
        if 'РЫЦАРСКОЕ' in raw_title.upper():
            brand = 'Мясо Рыцарское'
            subcat = '50г'
        elif 'УШКИ' in raw_title.upper() or 'УХО' in raw_title.upper():
            brand = 'Свиные ушки'
            subcat = 'Заводские'
        else:
            brand = 'Мясные'
            subcat = 'Завод'
        taste = clean_off

    return {
        'id': f'item_{index:03d}',
        'sheet': sheetname,
        'category': category,
        'brand': brand or category,
        'subcat': subcat,
        'taste': taste or clean_off,
        'unit': unit,
        'step': step,
        'official_name': clean_off
    }

# Process all sheets
all_catalog = []
index = 1

for sheet in wb.sheetnames:
    ws = wb[sheet]
    for r in ws.iter_rows(values_only=True):
        cells = [str(c).strip() for c in r if c is not None and str(c).strip() != '']
        if cells:
            title = cells[0]
            if len(cells) > 1 and (len(cells[1]) > len(title) or not title):
                title = cells[1]
            if title:
                item_obj = parse_item(title, sheet, index)
                all_catalog.append(item_obj)
                index += 1

print(f"Total parsed items: {len(all_catalog)}")
with open('catalog.json', 'w', encoding='utf-8') as f:
    json.dump(all_catalog, f, ensure_ascii=False, indent=2)

print("catalog.json updated with all 322 items!")

