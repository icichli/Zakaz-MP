import openpyxl

wb = openpyxl.load_workbook('full_spreadsheet.xlsx')

print(f"Total sheets: {len(wb.sheetnames)}\n")

for sheetname in wb.sheetnames:
    ws = wb[sheetname]
    non_empty_rows = []
    for row in ws.iter_rows(values_only=True):
        if any(cell is not None and str(cell).strip() != '' for cell in row):
            filtered = [str(c).strip() if c is not None else '' for c in row]
            # trim trailing empty cells
            while filtered and filtered[-1] == '':
                filtered.pop()
            non_empty_rows.append(filtered)
    
    print(f"=== Sheet: '{sheetname}' (Non-empty rows: {len(non_empty_rows)}) ===")
    for r in non_empty_rows[:6]:
        print("   ", r)
    if len(non_empty_rows) > 6:
        print("    ... and", len(non_empty_rows) - 6, "more rows")
    print()

