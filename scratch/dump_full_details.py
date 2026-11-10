import openpyxl

wb = openpyxl.load_workbook('full_spreadsheet.xlsx')

for sheet in wb.sheetnames:
    print(f"==================== {sheet} ====================")
    ws = wb[sheet]
    count = 0
    for r in ws.iter_rows(values_only=True):
        cells = [str(c).strip() for c in r if c is not None and str(c).strip() != '']
        if cells:
            title = cells[0]
            if len(cells) > 1 and (len(cells[1]) > len(title) or not title):
                title = cells[1]
            print(f"[{count+1}] {title}")
            count += 1

