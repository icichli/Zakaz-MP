import csv
import re
import json

with open('test_sheet.csv', mode='r', encoding='utf-8') as f:
    reader = csv.reader(f)
    raw_rows = [r[1].strip() for r in reader if len(r) > 1 and r[1].strip()]

cleaned_items = []
for i, raw in enumerate(raw_rows):
    item = raw.replace('`', '').strip()
    
    # unit & step
    if '0,9' in item or '0.9' in item:
        unit = 'ведро'
        step = 1
    elif '0,5' in item or '0.5' in item:
        unit = 'кг'
        step = 0.5
    else:
        unit = 'кг'
        step = 1.0

    # Category and Brand parsing
    if 'ВЕДРО ЮБИЛЕЙНЫЕ' in item.upper():
        category = 'Гренки'
        brand = 'Юбилейные'
        subcat = 'В ведрах (0.9 кг)'
        taste = item.replace('ВЕДРО ЮБИЛЕЙНЫЕ', '').replace('0,9кг, шт', '').replace('0,9кг', '').strip()
    elif 'ЛУТОВСКИЕ' in item.upper():
        category = 'Гренки'
        brand = 'Лутовские'
        if 'пшенич' in item.lower():
            subcat = 'Пшеничные'
        elif 'ржан' in item.lower():
            subcat = 'Ржаные'
        else:
            subcat = 'Классические'
        m = re.search(r'\((.*?)\)', item)
        taste = m.group(1).strip() if m else item
    elif 'ГРЕНКИ БРО' in item.upper() or 'БРО (' in item.upper():
        category = 'Гренки'
        brand = 'Бро'
        subcat = 'Крафтовые гренки'
        m = re.search(r'\((.*?)\)', item)
        taste = m.group(1).strip() if m else item
    elif 'СНАПСЫ' in item.upper():
        category = 'Гренки'
        brand = 'СНАПСЫ'
        if 'пшенич' in item.lower():
            subcat = 'Пшеничные'
        else:
            subcat = 'Ржаные'
        m = re.search(r'["«](.*?)["»]', item)
        if not m:
            m = re.search(r'\((.*?)\)', item)
        taste = m.group(1).strip() if m else item
    elif 'ДЕМИДОВСКИЕ' in item.upper():
        category = 'Сухари'
        brand = 'Демидовские'
        subcat = 'Сухарики'
        m = re.search(r'\((.*?)\)', item)
        taste = m.group(1).strip() if m else item
    elif 'ЖИТНИЦКИЕ' in item.upper():
        category = 'Сухари'
        brand = 'Житницкие'
        subcat = 'Багет'
        m = re.search(r'\((.*?)\)', item)
        taste = m.group(1).strip() if m else item
    elif item.upper().startswith('СУХАРИ'):
        category = 'Сухари'
        brand = 'Классика'
        subcat = 'Сухарики'
        m = re.search(r'["«](.*?)["»]', item)
        taste = m.group(1).strip() if m else item
    else:
        category = 'Снеки'
        brand = 'Прочие'
        subcat = 'Разное'
        taste = item

    clean_official = item
    if clean_official.endswith(', шт'):
        clean_official = clean_official[:-4].strip()

    cleaned_items.append({
        'id': f'item_{i+1:03d}',
        'category': category,
        'brand': brand,
        'subcat': subcat,
        'taste': taste,
        'unit': unit,
        'step': step,
        'official_name': clean_official
    })

# check tastes
for it in cleaned_items:
    print(f"[{it['category']} | {it['brand']} - {it['subcat']}] {it['taste']} ({it['step']} {it['unit']}) -> {it['official_name']}")

# Save as clean CSV and JSON
with open('cleaned_catalog.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['ID', 'Категория', 'Бренд', 'Линейка/Тип', 'Вкус/Наименование', 'Ед. изм.', 'Шаг заказа', 'Название для поставщика'])
    for it in cleaned_items:
        writer.writerow([it['id'], it['category'], it['brand'], it['subcat'], it['taste'], it['unit'], it['step'], it['official_name']])

with open('catalog.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_items, f, ensure_ascii=False, indent=2)

print("\nFiles 'cleaned_catalog.csv' and 'catalog.json' generated successfully!")
