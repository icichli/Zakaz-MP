import csv
import json

with open('catalog.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

with open('cleaned_catalog.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['ID', 'Категория', 'Бренд', 'Линейка/Тип', 'Вкус/Наименование', 'Ед. изм.', 'Шаг заказа', 'Название для поставщика'])
    for it in items:
        writer.writerow([it['id'], it['category'], it['brand'], it['subcat'], it['taste'], it['unit'], it['step'], it['official_name']])

print(f"Updated cleaned_catalog.csv with all {len(items)} items!")

