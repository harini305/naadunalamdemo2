import re,json,glob,os,html as H
def clean(s):
    s=re.sub(r'<[^>]+>',' ',s or ''); s=H.unescape(s); return re.sub(r'\s+',' ',s).strip()
def g(h,p,d=None,n=1):
    m=re.search(p,h,re.S)
    if not m: return d
    return m.group(n) if m.lastindex else m.group(0)
prods={}
for f in sorted(glob.glob('data/html/product-*.html')):
    slug=os.path.basename(f)[:-5]
    h=open(f,encoding='utf-8',errors='replace').read()
    name=g(h,r'<h1 class="product_title entry-title">(.*?)</h1>')
    if not name: continue
    pb=g(h,r'<p class="price">(.*?)</p>','')
    amt=re.search(r'<bdi>.*?</span>([\d,\.]+)</bdi>',pb,re.S)
    pack=re.search(r'<span class="nn-pack">(.*?)</span>',pb,re.S)
    raww=g(h,r'id="tab-description"[^>]*>(.*?)(?:<div class="woocommerce-Tabs-panel|</section>)','')
    raww=raww.replace('<h2>Description</h2>','')
    desc='\n'.join(x for x in (clean(p) for p in re.split(r'</(?:p|li|h[2-4])>',raww)) if x)
    bc=g(h,r'<nav class="woocommerce-breadcrumb.*?</nav>','')
    cats=[(u,clean(t)) for u,t in re.findall(r'<a href="([^"]+)">([^<]+)</a>',bc)]
    gal=re.findall(r'data-large_image="([^"]+)"',h)
    gal=[x for x in dict.fromkeys(gal) if not x.startswith('{{')]
    imgs=re.findall(r'(https://naadunalam\.fastfilings\.in/wp-content/uploads/[^"\'\s]+?\.(?:jpg|jpeg|png|webp))',h)
    wt=g(h,r'item--weight"[^>]*>\s*<th[^>]*>Weight</th><td[^>]*>(.*?)</td>')
    dim=g(h,r'item--dimensions"[^>]*>\s*<th[^>]*>Dimensions</th><td[^>]*>(.*?)</td>')
    packattr=g(h,r'item--attribute_pa_pack"[^>]*>\s*<th[^>]*>Pack</th><td[^>]*>(.*?)</td></tr>')
    prods[slug]={'name':clean(name),'price':amt.group(1) if amt else None,
      'pack':clean(pack.group(1)) if pack else clean(packattr),
      'sku':clean(g(h,r'class="sku-value">(.*?)</span>','')),
      'stock':clean(g(h,r'rtsb-stock-text">(.*?)</span>','')),
      'short':clean(g(h,r'woocommerce-product-details__short-description">(.*?)</div>','')),
      'categories':[c[1] for c in cats],'category_url':cats[0][0] if cats else None,
      'image':(gal[0] if gal else (imgs[0] if imgs else None)),
      'gallery':gal[:8],'weight':clean(wt),'dims':clean(dim),
      'desc_ta':desc,'url':'https://naadunalam.fastfilings.in/product/'+slug[len('product-'):]+'/',
      'meta_desc':clean(g(h,r'<meta name="description" content="([^"]*)"',''))}
json.dump(prods,open('data/products.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print('count',len(prods))
print('no desc',[k for k,v in prods.items() if not v['desc_ta']])
print('no img',[k for k,v in prods.items() if not v['image']])
print(json.dumps(prods['product-mappillai-samba'],ensure_ascii=False,indent=1)[:900])
