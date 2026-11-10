import json

with open('catalog.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

catalog_str = "const DEFAULT_CATALOG = " + json.dumps(items, ensure_ascii=False, indent=2) + ";\n"

# replace "let catalog = [];" with DEFAULT_CATALOG
target = "let catalog = [];"
replacement = catalog_str + "let catalog = [...DEFAULT_CATALOG];"

if target in app_js:
    new_app_js = app_js.replace(target, replacement, 1)
    # Also update loadCatalog to fall back to DEFAULT_CATALOG
    old_load = """  // If no cache, try loading catalog.json or fallback
  if (!catalog || catalog.length === 0) {
    try {
      const res = await fetch('catalog.json');
      if (res.ok) {
        catalog = await res.json();
        localStorage.setItem('snack_catalog_cache', JSON.stringify(catalog));
      }
    } catch (e) {
      console.warn('catalog.json fetch failed, will load embedded fallback', e);
    }
  }"""

    new_load = """  // If no cache, fall back to embedded DEFAULT_CATALOG and try background sync
  if (!catalog || catalog.length === 0) {
    catalog = [...DEFAULT_CATALOG];
    localStorage.setItem('snack_catalog_cache', JSON.stringify(catalog));
  }"""
    new_app_js = new_app_js.replace(old_load, new_load, 1)

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(new_app_js)
    print("Embedded DEFAULT_CATALOG into app.js successfully!")
else:
    print("Target not found in app.js")
