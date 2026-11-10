import json

with open('catalog.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

print(f"Embedding {len(items)} items into js/app.js")

# Let's read app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# We need to replace DEFAULT_SHEET_CSV_URL with DEFAULT_SHEET_XLSX_URL
# and update syncFromGoogleSheets to parse XLSX workbook with all sheets
# and replace DEFAULT_CATALOG with the full 322 items

