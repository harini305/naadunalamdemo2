"""Minimal DOM-ish HTML extractor using stdlib only. For Phase 1 audit evidence."""
import re, json, sys, html
from html.parser import HTMLParser

VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
BLOCK = {'p','div','section','article','header','footer','li','ul','ol','h1','h2','h3','h4','h5','h6','br','tr','table','figure','figcaption','blockquote','main','nav','form','aside','td','th','dt','dd'}

class Node:
    __slots__=('tag','attrs','children','parent')
    def __init__(self, tag, attrs=None, parent=None):
        self.tag=tag; self.attrs=dict(attrs or {}); self.children=[]; self.parent=parent
    def text(self):
        out=[]
        for c in self.children:
            out.append(c if isinstance(c,str) else c.text())
        return ''.join(out)

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root=Node('#root'); self.stack=[self.root]
    def handle_starttag(self, tag, attrs):
        n=Node(tag, attrs, self.stack[-1]); self.stack[-1].children.append(n)
        if tag not in VOID: self.stack.append(n)
    def handle_startendtag(self, tag, attrs):
        n=Node(tag, attrs, self.stack[-1]); self.stack[-1].children.append(n)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i].tag==tag:
                del self.stack[i:]
                return
    def handle_data(self, data):
        self.stack[-1].children.append(data)

def parse_file(path):
    p=P(); p.feed(open(path,encoding='utf-8',errors='replace').read()); return p.root

def walk(n):
    for c in n.children:
        if not isinstance(c,str):
            yield c
            yield from walk(c)

def find(n, pred):
    return [x for x in walk(n) if pred(x)]

def by_class(n, cls):
    return find(n, lambda x: cls in (x.attrs.get('class') or '').split())

def meta(root):
    out={}
    for m in find(root, lambda x:x.tag=='meta'):
        k=m.attrs.get('name') or m.attrs.get('property')
        if k and (m.attrs.get('content') is not None): out[k]=m.attrs['content']
    return out

def text_of(n):
    t=n.text()
    return re.sub(r'\s+',' ',t).strip()

def main_root(root):
    m=find(root, lambda x: x.tag=='main' and x.attrs.get('id')=='content')
    return m[0] if m else root

def lin_text(n):
    """Text with block-level line breaks, no script/style."""
    parts=[]
    def rec(x):
        if isinstance(x,str):
            parts.append(x); return
        if x.tag in ('script','style','noscript','svg'): return
        b = x.tag in BLOCK
        if b: parts.append('\n')
        for c in x.children: rec(c)
        if b: parts.append('\n')
    rec(n)
    t=''.join(parts)
    lines=[re.sub(r'[ \t\xa0]+',' ',l).strip() for l in t.split('\n')]
    return [l for l in lines if l]

def images(n):
    out=[]
    for img in find(n, lambda x:x.tag=='img'):
        a=img.attrs
        out.append({'src':a.get('src'),'data_src':a.get('data-src') or a.get('data-lazy-src'),
                    'srcset':(a.get('srcset') or '')[:300],'alt':a.get('alt'),'class':a.get('class'),
                    'w':a.get('width'),'h':a.get('height')})
    return out

def links(n):
    out=[]
    for a in find(n, lambda x:x.tag=='a' and x.attrs.get('href')):
        out.append((a.attrs['href'], text_of(a)[:80]))
    return out

def headings(n):
    out=[]
    for h in find(n, lambda x:re.fullmatch(r'h[1-6]',x.tag or '')):
        out.append((h.tag, text_of(h)))
    # elementor heading widgets exported as divs
    for d in by_class(n,'elementor-heading-title'):
        t=text_of(d)
        if t: out.append(('div.heading', t))
    return out

def blocks(n):
    """List of meaningful text lines for content inventory."""
    return lin_text(n)

if __name__=='__main__':
    root=parse_file(sys.argv[1])
    m=main_root(root)
    print(json.dumps({'meta':meta(root),'headings':headings(m),'images':images(m)},indent=1,ensure_ascii=False)[:6000])
    print('--- TEXT ---')
    for l in blocks(m)[:200]: print(l)
