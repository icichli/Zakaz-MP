import urllib.request
import re
import html

url = 'https://xn--80adjicenawr3ax3h.xn--p1ai/products/category/chipsi'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
content = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')

matches = re.findall(r'<p\s+class="product-link[^"]*"[^>]*>.*?<a[^>]+class="blue"[^>]*>(.*?)</a>', content, re.DOTALL)
print("Total found:", len(matches))
pringles = []
for i, m in enumerate(matches):
    clean = html.unescape(re.sub(r'<[^>]+>', '', m)).strip()
    clean = ' '.join(clean.split())
    # check if pringles
    is_pringles = 'принглс' in clean.lower() or 'pringles' in clean.lower()
    is_american = 'американск' in clean.lower() or '158' in clean.lower()
    if is_pringles:
        status = "EXCLUDE (American)" if is_american else "KEEP"
        print(f"[{status}] {clean}")
        if not is_american:
            pringles.append(clean)

print("\nFinal Pringles list count:", len(pringles))
for p in pringles:
    print(" -", p)

