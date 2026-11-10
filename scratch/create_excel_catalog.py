import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import json

with open('catalog.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Каталог снеков"

headers = ['ID', 'Категория', 'Бренд / Производитель', 'Линейка / Стиль', 'Вкус / Наименование', 'Ед. изм.', 'Шаг заказа', 'Название для поставщика']
ws.append(headers)

# Styling header
header_fill = PatternFill(start_color="1E293B", end_color="1E293B", fill_type="solid")
header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
thin_border = Border(
    left=Side(style='thin', color='CBD5E1'),
    right=Side(style='thin', color='CBD5E1'),
    top=Side(style='thin', color='CBD5E1'),
    bottom=Side(style='thin', color='CBD5E1')
)

for col_idx in range(1, len(headers) + 1):
    cell = ws.cell(row=1, column=col_idx)
    cell.fill = header_fill
    cell.font = header_font
    cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)

row_fill_even = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
row_fill_odd = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")

for row_idx, it in enumerate(items, start=2):
    row_data = [
        it['id'],
        it['category'],
        it['brand'],
        it['subcat'],
        it['taste'],
        it['unit'],
        it['step'],
        it['official_name']
    ]
    ws.append(row_data)
    fill = row_fill_even if row_idx % 2 == 0 else row_fill_odd
    for col_idx in range(1, len(row_data) + 1):
        c = ws.cell(row=row_idx, column=col_idx)
        c.fill = fill
        c.border = thin_border
        c.font = Font(name="Calibri", size=10)
        if col_idx in [1, 6, 7]:
            c.alignment = Alignment(horizontal="center", vertical="center")
        else:
            c.alignment = Alignment(horizontal="left", vertical="center")

# Add some sample wet snacks & nuts rows at the end as examples for the user!
sample_extras = [
    ['item_073', 'Мокрые снеки', 'Рыбный край', 'Кальмар', 'Кальмар стружка с перцем', 'кг', 0.5, 'Кальмар стружка с перцем 1кг (фас. 0.5кг)'],
    ['item_074', 'Мокрые снеки', 'Рыбный край', 'Кальмар', 'Кальмар по-шанхайски', 'кг', 0.5, 'Кальмар по-шанхайски 1кг (фас. 0.5кг)'],
    ['item_075', 'Мокрые снеки', 'Мясной дом', 'Мясо сыровяленое', 'Чипсы из курицы классические', 'кг', 0.5, 'Чипсы куриные с/в 1кг'],
    ['item_076', 'Орехи', 'Джаз', 'Арахис', 'Арахис в глазури Васаби', 'кг', 0.5, 'Арахис в глазури Васаби 1кг'],
    ['item_077', 'Орехи', 'Джаз', 'Арахис', 'Арахис соленый дробленый', 'кг', 0.5, 'Арахис жареный соленый 1кг'],
    ['item_078', 'Орехи', 'Премиум', 'Фисташка', 'Фисташка жареная соленая Иран', 'кг', 0.5, 'Фисташка Иран соленая 1кг']
]

for row_idx, row_data in enumerate(sample_extras, start=len(items) + 2):
    ws.append(row_data)
    fill = PatternFill(start_color="FEF9C3", end_color="FEF9C3", fill_type="solid") # subtle yellow to show they are examples
    for col_idx in range(1, len(row_data) + 1):
        c = ws.cell(row=row_idx, column=col_idx)
        c.fill = fill
        c.border = thin_border
        c.font = Font(name="Calibri", size=10)
        if col_idx in [1, 6, 7]:
            c.alignment = Alignment(horizontal="center", vertical="center")
        else:
            c.alignment = Alignment(horizontal="left", vertical="center")

# Auto-adjust column widths
for col in ws.columns:
    max_len = max(len(str(cell.value or '')) for cell in col)
    col_letter = get_column_letter(col[0].column)
    ws.column_dimensions[col_letter].width = max(max_len + 4, 12)

ws.freeze_panes = "A2"
ws.auto_filter.ref = ws.dimensions

wb.save("cleaned_catalog.xlsx")
print("Saved cleaned_catalog.xlsx with sample categories!")
