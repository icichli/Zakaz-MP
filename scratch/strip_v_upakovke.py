import json
import csv
import re

def sanitize_name(name: str) -> str:
    s = re.sub(r',\s*в\s+упаковке(?![a-zа-я0-9])', ',', name, flags=re.IGNORECASE)
    s = re.sub(r'\(\s*в\s+упаковке\s*\)', '', s, flags=re.IGNORECASE)
    s = re.sub(r'(?:^|\s)в\s+упаковке(?![a-zа-я0-9])', ' ', s, flags=re.IGNORECASE)
    s = re.sub(r'\s{2,}', ' ', s)
    s = re.sub(r'\s*,\s*,', ',', s)
    return s.strip()

# Update catalog.json
with open('catalog.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

for item in items:
    if 'в упаковке' in item['name'].lower():
        old = item['name']
        item['name'] = sanitize_name(item['name'])
        print(f"catalog.json: '{old}' -> '{item['name']}'")

with open('catalog.json', 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)

# Update cleaned_catalog.csv
rows = []
with open('cleaned_catalog.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    for r in reader:
        if len(r) > 3 and 'в упаковке' in r[3].lower():
            old = r[3]
            r[3] = sanitize_name(r[3])
            print(f"cleaned_catalog.csv: '{old}' -> '{r[3]}'")
        rows.append(r)

with open('cleaned_catalog.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(rows)

print("Catalog files updated successfully!")

