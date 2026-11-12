import json
import csv
import re
import html
import urllib.request
from datetime import datetime

# 1. Fetch live items from site
url = 'https://xn--80adjicenawr3ax3h.xn--p1ai/products/category/chipsi'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
content = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')

matches = re.findall(r'<p\s+class="product-link[^"]*"[^>]*>.*?<a[^>]+class="blue"[^>]*>(.*?)</a>', content, re.DOTALL)
pringles_names = []
seen = set()

for m in matches:
    clean = html.unescape(re.sub(r'<[^>]+>', '', m)).strip()
    clean = ' '.join(clean.split())
    # Убираем "в упаковке"
    clean = re.sub(r',\s*в\s+упаковке(?![a-zа-я0-9])', ',', clean, flags=re.IGNORECASE)
    clean = re.sub(r'\(\s*в\s+упаковке\s*\)', '', clean, flags=re.IGNORECASE)
    clean = re.sub(r'(?:^|\s)в\s+упаковке(?![a-zа-я0-9])', ' ', clean, flags=re.IGNORECASE)
    clean = re.sub(r'\s{2,}', ' ', clean)
    clean = re.sub(r'\s*,\s*,', ',', clean).strip()
    if not clean or clean in seen:
        continue
    lower = clean.lower()
    if 'принглс' in lower or 'pringles' in lower:
        if 'американск' in lower or '158' in lower:
            continue
        seen.add(clean)
        pringles_names.append(clean)

pringles_names.sort(key=lambda s: s.lower())
print(f"Discovered {len(pringles_names)} Pringles positions.")

# 2. Load existing catalog.json
with open('catalog.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

# Filter out any old Pringles if already present
non_pringles = [i for i in items if i.get('category') != 'Pringles']
start_idx = len(non_pringles) + 1

now_str = datetime.now().strftime('%d.%m %H:%M')

new_pringles_items = []
for idx, name in enumerate(pringles_names, start=start_idx):
    m_w = re.search(r'(\d+(?:[.,]\d+)?)\s*(?:г|гр|грамм|g)\b', name, re.I)
    w = (m_w.group(1).replace(',', '.') + ' г') if m_w else '165 г'
    item = {
        'id': f'item_{idx:03d}',
        'name': name,
        'category': 'Pringles',
        'brand': 'Pringles',
        'step': 1.0,
        'unit': 'шт',
        'display_step': 'кратность 1 шт',
        'supplier': 'snacks',
        'weight': w,
        'in_stock': True,
        'updated_at': now_str
    }
    new_pringles_items.append(item)

full_items = non_pringles + new_pringles_items

with open('catalog.json', 'w', encoding='utf-8') as f:
    json.dump(full_items, f, ensure_ascii=False, indent=2)

print(f"Updated catalog.json: total {len(full_items)} items ({len(new_pringles_items)} Pringles).")

# 3. Update cleaned_catalog.csv
csv_rows = []
with open('cleaned_catalog.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    for r in reader:
        if len(r) > 2 and r[2] != 'Pringles':
            csv_rows.append(r)

for item in new_pringles_items:
    csv_rows.append([
        item['id'],
        'Пивные закуски',
        item['category'],
        item['name'],
        str(item['step']),
        item['unit'],
        item['display_step']
    ])

with open('cleaned_catalog.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(csv_rows)

print(f"Updated cleaned_catalog.csv: total {len(csv_rows)} rows.")

