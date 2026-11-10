import json

with open('catalog.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

sample_extras = [
    {'id': 'item_073', 'category': 'Мокрые снеки', 'brand': 'Рыбный край', 'subcat': 'Кальмар', 'taste': 'Кальмар стружка с перцем', 'unit': 'кг', 'step': 0.5, 'official_name': 'Кальмар стружка с перцем 1кг (фас. 0.5кг)'},
    {'id': 'item_074', 'category': 'Мокрые снеки', 'brand': 'Рыбный край', 'subcat': 'Кальмар', 'taste': 'Кальмар по-шанхайски', 'unit': 'кг', 'step': 0.5, 'official_name': 'Кальмар по-шанхайски 1кг (фас. 0.5кг)'},
    {'id': 'item_075', 'category': 'Мокрые снеки', 'brand': 'Мясной дом', 'subcat': 'Мясо с/в', 'taste': 'Чипсы из курицы классические', 'unit': 'кг', 'step': 0.5, 'official_name': 'Чипсы куриные с/в 1кг (фас. 0.5кг)'},
    {'id': 'item_076', 'category': 'Орехи', 'brand': 'Джаз', 'subcat': 'Арахис', 'taste': 'Арахис в глазури Васаби', 'unit': 'кг', 'step': 0.5, 'official_name': 'Арахис в глазури Васаби 1кг (фас. 0.5кг)'},
    {'id': 'item_077', 'category': 'Орехи', 'brand': 'Джаз', 'subcat': 'Арахис', 'taste': 'Арахис жареный соленый', 'unit': 'кг', 'step': 0.5, 'official_name': 'Арахис жареный соленый 1кг (фас. 0.5кг)'},
    {'id': 'item_078', 'category': 'Орехи', 'brand': 'Премиум', 'subcat': 'Фисташка', 'taste': 'Фисташка жареная соленая Иран', 'unit': 'кг', 'step': 0.5, 'official_name': 'Фисташка Иран соленая 1кг (фас. 0.5кг)'}
]

all_items = items + sample_extras

with open('catalog.json', 'w', encoding='utf-8') as f:
    json.dump(all_items, f, ensure_ascii=False, indent=2)

print(f"Total items in catalog.json: {len(all_items)}")
