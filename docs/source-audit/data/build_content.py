"""Builds docs/source-audit/data/site-content.json: cleaned main content per page (verbatim)."""
import json, re

pages = json.load(open('data/pages.json', encoding='utf-8'))
prods = json.load(open('data/products.json', encoding='utf-8'))
blog = json.load(open('data/blog-posts.json', encoding='utf-8'))

NOISE = re.compile(r"""^(
    Welcome to Naadu Nalam Organic Store.*|Follow us:|Facebook-f|X-twitter|Instagram|Linkedin-in|
    Naadu Nalam\s*fresh and organic|Naadu Nalamfresh and organic|All Categories.*|Search|Search for:|
    Flat ₹50 delivery.*|₹0\.00|0|Cart|Home|Shop|About Us|Contact Us|Wishlist|Others|Collaborators|
    TST Music & Dance Academy|TST Event Mgt|Ignite Our Tharas Kids Kondaatam|Queen Bee.s Math Tutoring|
    Bharathanaatiyam|Events|Calendar|Research Articles|Blog|Shop by category|All products|
    Traditional Rice \(பாரம்பரிய அரிசி வகைகள்\)|Aval / Flakes \(அவல் வகைகள்\)|Millets \(சிறுதானியங்கள்\)|
    Natural Sweeteners \(இயற்கை இனிப்புகள்\)|Ghee & Oil \(நெய் & எண்ணெய் வகைகள்\)|Health Mixes \(ஆரோக்கிய மாவுகள்\)|
    Personal Care \(உடல் பராமரிப்பு\)|My account|Call \+91 90921 14630|Quick Links|Customer Support|Newsletter|
    Subscribe|Cash on Delivery|© 2026 Naadu Nalam. All rights reserved.|Good Food|Healthy People|
    Sustainable Tomorrow|Item|Skip to content|ABOUT US|CONTACT US|WISHLIST|OTHERS|SHOP|HOME
)$""", re.X)

def clean_lines(lines, h1=None):
    """Trim the WP header and footer that some templates print inside the body."""
    start = 0
    if h1:
        want = re.sub(r'\s+', ' ', h1).strip()
        for i, l in enumerate(lines):
            if re.sub(r'\s+', ' ', l).strip() == want:
                start = i
                break
    seg = lines[start:]
    for i, l in enumerate(seg):
        if l.strip() in ('Quick Links', 'Naadu Nalam') and i > 3:
            seg = seg[:i]
            break
    out = [l for l in seg if not NOISE.match(l.strip())]
    dedup, prev = [], None
    for l in out:
        if l == prev:
            continue
        dedup.append(l); prev = l
    return dedup

data = {'site': {}, 'pages': {}, 'blog': {}, 'products': {}}

data['site'] = {
    'name': 'Naadu Nalam',
    'tagline': 'fresh and organic',
    'strap': 'Good Food, Brighter Tomorrow',
    'phone': '+91 90921 14630',
    'phone_link': 'tel:+919092114630',
    'email': 'hello@naadunalam.in',
    'address': 'Chennai, Tamil Nadu 600001, India',
    'hours': 'Monday to Saturday: 9:00 AM – 6:00 PM. Sunday: Closed.',
    'delivery': 'Flat ₹50 delivery across Tamil Nadu',
    'payment': 'Cash on Delivery only (verified at checkout)',
    'whatsapp': 'https://wa.me/919092114630 (linked from contact page with "Chat with us on WhatsApp")',
    'currency': 'INR (₹)',
}

skip = ('product-', 'tag-', 'category-')
for slug, v in pages.items():
    if slug.startswith(skip) and not slug.startswith('product-category-'):
        continue
    h1 = next((t for tag, t in v['headings'] if tag == 'h1'), None)
    data['pages'][slug] = {
        'url': v['url'], 'title': v['title'], 'meta_description': v['desc'],
        'headings': v['headings'], 'content': clean_lines(v['text'], h1),
    }

data['blog'] = blog
for slug, v in prods.items():
    data['products'][slug] = {
        'name': v['name'], 'price': v['price'], 'pack': v['pack'], 'sku': v['sku'],
        'stock': v['stock'], 'categories': v['categories'], 'weight': v['weight'],
        'dimensions': v['dims'], 'short_en': v['short'], 'description_ta': v['desc_ta'],
        'image': v['image'], 'url': v['url'], 'meta_description': v['meta_desc'],
    }

json.dump(data, open('data/site-content.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('pages', len(data['pages']), 'products', len(data['products']), 'blog', len(data['blog']))
