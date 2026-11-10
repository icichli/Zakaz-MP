import urllib.request
import re

url = 'https://docs.google.com/spreadsheets/d/1nqOd_F-H60hE8lwObZyBhLhAHFBidV0UKkqLVvl81Ro/htmlview'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
resp = urllib.request.urlopen(req)
html = resp.read().decode('utf-8', errors='ignore')

matches = re.findall(r'name:\s*"([^"]+)",\s*pageUrl:[^}]+gid:\s*"([0-9]+)"', html)
print("Found sheet items with GIDs:")
for name, gid in matches:
    print(f"'{name}': '{gid}'")
