import openpyxl

wb = openpyxl.load_workbook('full_spreadsheet.xlsx')

for sheetname in wb.sheetnames:
    ws = wb[sheetname]
    rows = []
    for r in ws.iter_rows(values_only=True):
        non_empty = [str(c).strip() for c in r if c is not None and str(c).strip() != '']
        if non_empty:
            rows.append(non_empty)
    print(f"Sheet: {sheetname} ({len(rows)} items)")
    for row in rows[:5]:
        print("  ", row)
    print()

