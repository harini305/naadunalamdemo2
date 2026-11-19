import json, re, os, csv, glob, collections
from PIL import Image

BASE = 'https://naadunalam.fastfilings.in/wp-content/uploads/'
pages = json.load(open('data/pages.json', encoding='utf-8'))
prods = json.load(open('data/products.json', encoding='utf-8'))

# map asset filename -> pages it appears on
usage = collections.defaultdict(set)
PAT = re.compile(r"https://naadunalam\.fastfilings\.in/wp-content/uploads/[^\"'\s,<>]+?\.(?:jpg|jpeg|png|webp|gif|svg)", re.I)
def orig(u):
    d, f = u.rsplit('/', 1)
    return d + '/' + re.sub(r'-\d+x\d+(\.\w+)$', r'\1', f)
for slug, v in pages.items():
    for im in v['images']:
        for k in ('src', 'data_src', 'srcset'):
            for m in PAT.findall(im.get(k) or ''):
                usage[os.path.basename(orig(m))].add(slug)
for slug, v in prods.items():
    for u in [v['image']] + v['gallery']:
        if u:
            usage[os.path.basename(orig(u))].add('product:' + slug)

# product image -> products
prod_by_img = collections.defaultdict(list)
for slug, v in prods.items():
    prod_by_img[os.path.basename(v['image'])].append(v['name'])

rows = []
for f in sorted(os.listdir('original-assets')):
    p = os.path.join('original-assets', f)
    if os.path.isdir(p):
        continue
    size = os.path.getsize(p)
    dims = ''
    if f.lower().endswith('.svg'):
        txt = open(p, encoding='utf-8', errors='replace').read()
        m = re.search(r'viewBox="([^"]+)"', txt)
        dims = 'svg ' + (m.group(1) if m else '')
        note = 'SVG wrapper containing an embedded 384x372 WebP raster; not true vector'
    else:
        try:
            im = Image.open(p); dims = f'{im.width}x{im.height}'
        except Exception as e:
            dims = 'ERR'
        note = ''
    where = sorted(usage.get(f, []))
    where = [w.replace('product:', 'product/') for w in where]
    kind = 'product photo' if f in prod_by_img else ('logo' if 'logo' in f else 'page / editorial photo')
    issues = []
    if size > 300 * 1024: issues.append('large file')
    if f.lower().endswith('.jpg') and 'pdf' in f: issues.append('converted from PDF, 640x640 only')
    if len(prod_by_img.get(f, [])) > 1: issues.append(f"reused by {len(prod_by_img[f])} products")
    if note: issues.append(note)
    rows.append({
        'filename': f,
        'type': kind,
        'dimensions': dims,
        'size_kb': round(size / 1024),
        'local_path': 'docs/source-audit/original-assets/' + f,
        'source_url': BASE + '2026/' + ('09/' if f.startswith(('Mappillai-Samba-Rice-pdf','Poongar','Kullakar','Karuppu-Kavuni-Rice-pdf','Kichadi-Samba-Aval.webp','naadu-nalam','Aval-Vagaigal','Mashroom')) else '08/') + f,
        'used_on': '; '.join(where[:6]) + (' …' if len(where) > 6 else ''),
        'products': '; '.join(prod_by_img.get(f, []))[:200],
        'issues': '; '.join(issues),
    })

with open('04-assets-manifest.csv', 'w', newline='', encoding='utf-8') as fh:
    w = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
    w.writeheader(); w.writerows(rows)
print(len(rows), 'assets in manifest')
print('total MB', round(sum(os.path.getsize(os.path.join('original-assets',f)) for f in os.listdir('original-assets'))/1048576,1))

# products csv
with open('data/products.csv', 'w', newline='', encoding='utf-8') as fh:
    w = csv.writer(fh)
    w.writerow(['name', 'price_inr', 'pack', 'category', 'sku', 'stock', 'weight', 'dimensions', 'image_file', 'image_url', 'url', 'short_description_en'])
    for slug, v in sorted(prods.items(), key=lambda kv: (kv[1]['categories'][0] if kv[1]['categories'] else '', kv[1]['name'])):
        w.writerow([v['name'], v['price'], v['pack'], ' / '.join(v['categories']), v['sku'], v['stock'], v['weight'], v['dims'],
                    os.path.basename(v['image'].rsplit('/', 1)[-1]), v['image'], v['url'], v['short']])
print('products csv written')
