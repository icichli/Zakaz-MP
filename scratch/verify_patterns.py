import urllib.request
import re
import html

url = 'https://xn--80adjicenawr3ax3h.xn--p1ai/products/category/chipsi'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
c = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')

m1 = re.findall(r'<p\s+class="product-link[^"]*"[^>]*>.*?<a[^>]+class="blue"[^>]*>(.*?)</a>', c, re.DOTALL)
m2 = re.findall(r'<a\s+[^>]*href="[^"]*\/products\/\d+"[^>]*class="blue"[^>]*>(.*?)</a>', c, re.DOTALL)

print("m1 count:", len(m1))
print("m2 count:", len(m2))

# Verify filtering
def filter_pringles(matches):
    res = []
    seen = set()
    for m in matches:
        clean = html.unescape(re.sub(r'<[^>]+>', '', m)).strip()
        clean = ' '.join(clean.split())
        if not clean or clean in seen:
            continue
        seen.add(clean)
        lower = clean.lower()
        if 'принглс' in lower or 'pringles' in lower:
            if 'американск' in lower or '158' in lower:
                continue
            res.append(clean)
    return res

items = filter_pringles(m1)
print(f"Filtered Pringles ({len(items)}):")
for it in items:
    # extract weight
    m_w = re.search(r'(\d+(?:[.,]\d+)?)\s*(?:г|гр|грамм|g)\b', it, re.I)
    w = (m_w.group(1).replace(',', '.') + ' г') if m_w else 'Не указана'
    print(f"  {it}  -->  {w}")

