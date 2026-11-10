import openpyxl
import re

wb = openpyxl.load_workbook('full_spreadsheet.xlsx')

def analyze_sheet(name):
    ws = wb[name]
    items = []
    for r in ws.iter_rows(values_only=True):
        non_empty = [str(c).strip() for c in r if c is not None and str(c).strip() != '']
        if non_empty:
            # Usually the item title is either first cell or second cell
            title = non_empty[0]
            if len(non_empty) > 1 and len(non_empty[1]) > len(title):
                title = non_empty[1]
            items.append(title)
    return items

total_items = 0
for sheet in wb.sheetnames:
    items = analyze_sheet(sheet)
    total_items += len(items)
    print(f"Sheet: '{sheet}' -> {len(items)} items")

print(f"\nTOTAL ALL SHEETS: {total_items} items")

