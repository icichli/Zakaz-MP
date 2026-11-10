import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import json
import csv

with open('catalog.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

# 1. Update cleaned_catalog.csv
with open('cleaned_catalog.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['ID', 'Вкладка/Категория', 'Раздел', 'Бренд / Производитель', 'Линейка / Подраздел', 'Вкус / Наименование', 'Ед. изм.', 'Шаг заказа', 'Название для поставщика'])
    for it in items:
        writer.writerow([
            it['id'],
            it['sheet'],
            it['category'],
            it['brand'],
            it['subcat'],
            it['taste'],
            it['unit'],
            it['step'],
            it['official_name']
        ])

# 2. Update cleaned_catalog.xlsx with tabs for each category + an 'ALL' summary tab
wb = openpyxl.Workbook()

# Setup sheets
sheets_data = {}
for it in items:
    s_name = it['sheet']
    if s_name not in sheets_data:
        sheets_data[s_name] = []
    sheets_data[s_name].append(it)

# First tab: ВСЕ ТОВАРЫ
ws_all = wb.active
ws_all.title = "ВСЕ ТОВАРЫ (322 поз)"

headers = ['ID', 'Вкладка/Категория', 'Бренд / Производитель', 'Линейка / Стиль', 'Вкус / Наименование', 'Ед. изм.', 'Шаг заказа', 'Название для поставщика']

header_fill = PatternFill(start_color="1E293B", end_color="1E293B", fill_type="solid")
header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
thin_border = Border(
    left=Side(style='thin', color='CBD5E1'),
    right=Side(style='thin', color='CBD5E1'),
    top=Side(style='thin', color='CBD5E1'),
    bottom=Side(style='thin', color='CBD5E1')
)
row_fill_even = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
row_fill_odd = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")

def format_sheet(ws, rows_items):
    ws.append(headers)
    for col_idx in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=col_idx)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)

    for row_idx, it in enumerate(rows_items, start=2):
        row_data = [
            it['id'],
            it['sheet'],
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

    for col in ws.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws.column_dimensions[col_letter].width = max(max_len + 4, 12)

    ws.freeze_panes = "A2"
    ws.auto_filter.ref = ws.dimensions

# Format ALL
format_sheet(ws_all, items)

# Format individual sheets
for sheetname, sheet_items in sheets_data.items():
    safe_name = sheetname[:30] # Excel limit is 31 chars
    ws_sub = wb.create_sheet(title=safe_name)
    format_sheet(ws_sub, sheet_items)

wb.save("cleaned_catalog.xlsx")
print("cleaned_catalog.xlsx and cleaned_catalog.csv created with all 322 items!")

