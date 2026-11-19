# 02 — Page and route inventory

Every route found, what it is, its status, and what Phase 2 should do with it.
Recommendation key: **IMPLEMENT** (build in the redesign) · **MERGE** (fold into another page) · **KEEP AS-IS CONTENT** (copy carries over, layout does not) · **OWNER DECISION** · **DROP** (no unique content, or dead).

---

## 1. Master route table

### Marketing pages

| Route | Type | Status | H1 | Recommendation |
|---|---|---|---|---|
| `/` | Home / marketplace landing | live, 200 | Naturally Grown Food, Straight From Local Sellers | **IMPLEMENT** — needs full redesign, content consolidation |
| `/shop/` | Product listing (all 82) | live, 200 | Shop All Organic Products | **IMPLEMENT** — filters + grid + pagination |
| `/about-us/` | Brand story | live, 200 | About Naadu Nalam | **IMPLEMENT** (merge with "How Ordering Works" copy) |
| `/services/` | "How Ordering Works" (title in `<title>` is "How Ordering Works") | live, 200 | Services That Bring Goodness Closer to You | **MERGE** into About / a "How it works" block |
| `/contact/` | Contact + CF7 form | live, 200 | Contact Us | **IMPLEMENT** |
| `/testimonials/` | Reviews hub, no reviews yet | live, 200 | What Our Customers Say | **DROP or OWNER DECISION** — an empty review page creates a trust problem |
| `/collaborators/` | Partner hub, empty | live, 200 | Collaborators | **OWNER DECISION** |
| `/collaborators/tst-music-dance-academy/` | Collaborator detail, placeholder | live, 200 | TST Music & Dance Academy | **OWNER DECISION** — 5 near-identical placeholders |
| `/collaborators/tst-event-mgt/` | as above | live, 200 | TST Event Mgt | same |
| `/collaborators/ignite-our-tharas-kids-kondaatam/` | as above | live, 200 | Ignite Our Tharas Kids Kondaatam | same |
| `/collaborators/queen-bees-math-tutoring/` | as above | live, 200 | Queen Bee's Math Tutoring | same |
| `/collaborators/bharathanaatiyam/` | as above | live, 200 | Bharathanaatiyam | same |
| `/events/` | Events listing, empty state | live, 200 | Events | **MERGE** into a single "Events & calendar" block or drop |
| `/calendar/` | 12-month calendar, all empty | live, 200 | Calendar | **MERGE** with Events |
| `/research-articles/` | Editorial hub, empty | live, 200 | Research Articles | **DROP or OWNER DECISION** |
| `/blog/` | Blog index, 8 posts, 2 pages | live, 200 | Blog | **IMPLEMENT** (light: index + post template) |
| `/blog/page/2/` | Blog pagination | live, 200 | Blog | implicit |
| `/many-sellers-one-basket/` | Blog post | live, 200 | Many Sellers, One Basket… | content preserved |
| `/cold-pressed-vs-refined-oils/` | Blog post | live, 200 | Cold-Pressed vs Refined… | content preserved |
| `/choosing-your-honey/` | Blog post | live, 200 | Forest Multi-Floral or Tulsi Infused… | content preserved |
| `/red-rice-or-sona-masoori/` | Blog post | live, 200 | Red Rice or Sona Masoori… | content preserved |
| `/ragi-flour-millet-kitchens/` | Blog post | live, 200 | Ragi Flour… | content preserved |
| `/cooking-country-vegetables/` | Blog post | live, 200 | Drumstick, Snake Gourd and Cluster Beans… | content preserved |
| `/whole-spices-ground-at-home/` | Blog post | live, 200 | Whole Spices, Ground at Home… | content preserved |
| `/seasonal-picks-fruit-stalls/` | Blog post | live, 200 | Seasonal Picks: What the Fruit Stalls Have Right Now | content preserved |

### Catalogue

| Route | Type | Status | Recommendation |
|---|---|---|---|
| `/product-category/rice-grains/` | Category, 17 products | live, 200 | **IMPLEMENT** (one category template, real H1) |
| `/product-category/aval-flakes/` | Category, 17 | live, 200 | IMPLEMENT |
| `/product-category/paruppu-pulses/` | Category, 12 | live, 200 | IMPLEMENT |
| `/product-category/siruthaniyam/` | Category (Millets), 7 | live, 200 | IMPLEMENT |
| `/product-category/health-mixes/` | Category, 9 | live, 200 | IMPLEMENT |
| `/product-category/oil-vinegers/` | Category (Ghee & Oil), 5 | live, 200 | IMPLEMENT |
| `/product-category/masala-podi/` | Category, 5 | live, 200 | IMPLEMENT |
| `/product-category/natural-sweeteners/` | Category, 4 | live, 200 | IMPLEMENT |
| `/product-category/other-rice/` | Category, 3 | live, 200 | IMPLEMENT |
| `/product-category/herbal-wellness/` | Category, 2 | live, 200 | IMPLEMENT |
| `/product-category/honey/` | Category, 1 | live, 200 | IMPLEMENT (or merge into Natural Sweeteners) |
| `/product-category/spices/` | Category, **0 products** | live, 200 but empty | **BROKEN** — linked from homepage "Shop Spices" + "Eighteen varieties"; fix data or remove the section |
| `/product-category/personal-care/` | Category, 2 | live, 200 | IMPLEMENT |
| `/product/<82 slugs>/` | Product detail | live, 200 | **IMPLEMENT** (one template) — see `data/products.csv` |

### Commerce / account

| Route | Type | Status | Recommendation |
|---|---|---|---|
| `/cart/` | Cart | live, 200 | OWNER DECISION (depends on whether Phase 2 keeps a live cart) |
| `/checkout/` | WooCommerce checkout, COD only | live, 200 | OWNER DECISION |
| `/wishlist/` | Wishlist (ShopBuilder) | live, 200 | OWNER DECISION |
| `/my-account/` | Login + register (customer / vendor) | live, 200 | OWNER DECISION |
| `/vendor-login/` | Vendor login + application form | live, 200 | **IMPLEMENT** if the marketplace story is kept |
| `/store-listing/` | Vendor directory ("3 stores", 2 shown) | live, 200 | **IMPLEMENT** or DROP |
| `/store/naadunalam/` | Vendor storefront (12 products) | live, 200 | **IMPLEMENT** if marketplace is kept |
| `/store/thaayanbu/` | Vendor storefront | live, 200 | OWNER DECISION (empty-looking category rail) |
| `/dashboard/` | Dokan vendor dashboard | 302 → login | not part of the public site |

### Legal / utility

| Route | Status | Recommendation |
|---|---|---|
| `/shipping-policy/` | live, 200 | **IMPLEMENT** (real content, dated 25/08/2026) |
| `/refund-policy/` | live, 200 | IMPLEMENT |
| `/terms/` | live, 200 | IMPLEMENT |
| `/privacy-policy/` | live, 200 | IMPLEMENT |
| `/newsletter/` | live, 200 but **empty** (only the word "Newsletter") | **DROP** |
| `/brand/naadu-nalam/` | live, 200, no products | **DROP** |
| `/tag/<8 tags>/` | Tag archives, 1–2 posts each | **DROP** (no SEO value at this size) |
| `/category/<4 blog cats>/` | Blog category archives | **DROP** or keep as blog filter |
| `/wp-sitemap.xml` | sitemap index | technical |
| `/sitemap.xml` | **404** | none |
| `/favicon.ico` | **404** | add one in Phase 2 |
| `/store/naadu-nalam/` | **404** (wrong slug) | redirect target if vendor pages kept |

---

## 2. Page detail — homepage

**URL** `/` · **Purpose** marketplace landing · **Template** Elementor page 614 · **H1** "Naturally Grown Food, Straight From Local Sellers"

**Sections in order**
1. Header (announcement bar, logo/search/icons bar, nav row)
2. Hero — left "Popular Categories" card list (7 categories + "Support Local Farmers"), right H1, Tamil-free paragraph, "Shop the Marketplace" + "Explore Categories", farmer cut-out photograph; pale mint background with a faint leaf pattern
3. Trust bar — 4 items (₹50 delivery / Sourced close to home / Every seller has a storefront / Clear, upfront pricing)
4. Promo tiles ×3 — "Naturally Sweet" (from ₹98), "Kitchen Essentials" (from ₹275), "Pantry Staples" (from ₹165)
5. Popular Categories — 7 image cards + "View All Categories"
6. Fresh Picks from Our Sellers — category sidebar (11, with counts) + 8 product cards + "Browse all categories"
7. Collections Built Around Real Cooking — 4 tiles (Cold-Pressed Oils, Lentils & Pulses, Other Rice, Personal Care) — **last two tiles have no image**
8. Many Sellers. One Basket. — dark green block, 3 points, "Become a Seller" + "Browse the Marketplace"
9. Featured Category — Whole Spices (claims 18 varieties, from ₹40) → links to the **empty** spices category
10. Why Naadu Nalam — 4 icon cards
11. Closing CTA — "Discover products that feel closer to home"
12. Footer

**Content to retain:** H1, hero paragraph, tagline, 4 trust points, the three promo price anchors (₹98 / ₹275 / ₹165), the marketplace explanation ("Naadu Nalam is a marketplace, not a single shop…"), "One Cart, One Checkout", the 11 category names with counts, the closing line.
**Content to drop/merge:** the third repetition of the category list, the spice claim (until the category has products), the eyebrow labels.
**Assets:** `nn-hero-cutout-clean-600.webp` (683×1024), 11 category thumbnails at 300×300, product photos.
**Metadata:** title "🐴 Naadu Nalam – Organic Marketplace | Farm Fresh Products Direct from Farmers" (emoji in title), **no meta description**, canonical OK.
**Risks:** the emoji in the title, the empty spice category link, the 5,498 px page length at 1440.

---

## 3. Page detail — shop and category template

**URL** `/shop/` and all `/product-category/*/`
**Structure:** filter rail (search, categories with counts, price range, pack, sale) · results line · sort · 4-col grid · pagination.
**Retain:** the filter set (category, price, pack), the 12-per-page grid, the sorting options, the card data (image, category, bilingual name, price, pack).
**Fix:** every category page must use the category name as H1, not "Shop All Organic Products"; add a one-to-two sentence category introduction; show the real product count; make the empty Spices category impossible.
**Responsive:** at 768 the filter rail moves above the grid; at 390 filters collapse into a drawer/accordion (verified visually: grid becomes 2 columns then 1).

---

## 4. Page detail — product template

**URL** `/product/<slug>/` (82)
**Structure:** breadcrumb · gallery (+zoom) · H1 · price + pack · rating · stock · SKU · short description · 4 chips · quantity · add to cart · share · vendor card · sticky buy bar · "Why Choose Naadu Nalam?" ×4 · "Goodness in Every Meal" · tabs (Description / Shipping / Additional information / Reviews / Vendor Info / More Products) · vendor products ×6 · related products ×4.
**Real data available for every product:** name (EN + TA), price, pack, SKU (e.g. NN-RIC-212), stock, weight (1.00 kg), dimensions (22 × 15 × 6 cm), short description (EN), full description (TA), category, vendor ("Naadu Nalam"), reviews (none yet).
**Retain:** all of the above factual fields, the bilingual description, the vendor attribution, the COD/delivery facts.
**Drop/merge:** the repeated "Why Choose Naadu Nalam?" block (identical on all 82 pages), the "Goodness in Every Meal" filler block, the empty Reviews tab if there are no reviews (show an honest empty state or omit), "More Products" + "Related Products" (one is enough).

---

## 5. Page detail — about

**URL** `/about-us/` · **H1** "About Naadu Nalam" · **Tamil line** "நம்ம மண்ணின் சுவை. நம்ம மக்களின் நலம்."
**Sections:** hero · "From Our Soil to Your Home" · "Why Naadu Nalam?" (Naturally Sourced / Traditional Varieties / Supporting Farmers / From Farm to Family) · "Our Product Philosophy" (6 groups with Tamil product names) · "More Than a Store" ("We are preserving a way of life") · "Our Promise" (NAMBIKKAI Trust / NALAM Well-being / MARABU Tradition) · closing Tamil + English CTA.
**Retain:** all of it — this is the brand's only real story page. **Merge in:** the 4-step "Explore / Choose / Order / Receive" and delivery facts currently stranded on `/services/`.

---

## 6. Page detail — services ("How Ordering Works")

**URL** `/services/` · **H1** "Services That Bring Goodness Closer to You"
**Sections:** hero · "How We Serve You" (6 cards) · "Simple From Start to Finish" (Explore/Choose/Order/Receive) · "Something for Every Kitchen" (8 category blurbs) · "Why Choose Naadu Nalam?" (Traditional / Convenient / Trustworthy / Rooted in Our Land) · "Our Values" (NAMBIKKAI / NALAM / MARABU, duplicate of About) · "Your Convenience Matters" · help CTA.
**Recommendation:** merge the useful parts (how ordering works, delivery, COD) into About or a "How it works" strip on Home. The values block is duplicated from About.

---

## 7. Page detail — contact

**URL** `/contact/` · **H1** "Contact Us"
**Sections:** intro · "Get in touch" (address "Chennai, Tamil Nadu 600001, India", phone +91 90921 14630, hello@naadunalam.in, WhatsApp button, "Business hours Monday to Saturday: 9:00 AM – 6:00 PM, Sunday: Closed") · "Send a message" form (Your name, Email address, How can we help? = message, consent checkbox linking to the Privacy Policy) · "Our location" (one line of text + a lazy-loaded Google Maps embed, query-based, no street address).
**Form:** Contact Form 7 (form id 143), fields `your-name`, `your-email`, `your-message`, `your-consent`; AJAX `admin-ajax.php`; no reCAPTCHA/Turnstile in the markup.
**Gaps:** no physical street address — the map is a `maps.google.com?q=Naadu Nalam, Chennai, Tamil Nadu 600001` query embed, so it centres on a generic Chennai location rather than a pinned shop; it only loads when scrolled into view (the full-page capture shows it empty). WhatsApp button links to `https://wa.me/919092114630` (verified). The page is 1,986 px tall and the last block + footer do not fit one screen.

---

## 8. Page detail — blog index and post

**Index:** H1 "Blog", 6 cards (featured image 190×160-ish, title, author "Anuraga", date, excerpt, "Continue Reading"), pagination, right sidebar (Search, Categories, Recent Posts, Tags).
**Post:** H1, byline (Anuraga · date), body 250–280 words with 2–4 H2 subheads, "Tagged …", comment form, no images, no related posts.
**Dates:** 12 Aug, 4 Aug, 26 Jul, 15 Jul, 2 Jul, 20 Jun, 6 Jun, 22 May 2026.
**Recommendation:** keep a simple blog (index + post) or drop the section entirely; do not exceed 10 images if a blog is built (per brief).

---

## 9. Placeholder pages (no real content)

| Page | Actual state | Phase 2 |
|---|---|---|
| Testimonials | "This is a new marketplace, and no customer reviews have been published yet." | Don't ship an empty reviews page |
| Events | "Nothing is scheduled at the moment." | One combined "What's on" block if the owner has dates |
| Calendar | 12 months, "No entries yet" | Same |
| Research Articles | "We have not published any research yet." | Drop unless the owner is commissioning research |
| Collaborators + 5 details | "Collaborator information coming soon" ×6 | Drop from nav; keep 1 short sellers block if the marketplace story is kept |
| Newsletter | empty page | Drop route (keep the footer subscribe field) |

---

## 10. Shared components

| Component | Where it appears | Notes |
|---|---|---|
| Announcement bar | every page | phone + 4 dead social icons |
| Main header | every page | logo, search, delivery promise, wishlist/cart/account |
| Nav + "Others" dropdown | every page | dropdown broken on desktop hover |
| Mobile drawer | all pages < 1024 | logo row + search + hamburger; categories appended |
| Product card | home, shop, categories, vendor store, related/vendor blocks | 300×300 image, eyebrow category, name, price+pack, 3 icon actions, quick view |
| Category card | home | image + bilingual label |
| Trust/tick strip | home, cart empty state, product | icons + short claims |
| CTA band (dark green) | home, about, services, events, research | repeated "Shop now / Contact" pattern |
| Breadcrumb | product, category, blog, policies | "Home / …" |
| Footer | every page | 4 columns + legal bar, 284 px |
| Sticky add-to-cart | product | appears on scroll |
| Quick view / compare | shop | present in markup, not exercised |

---

## 11. Navigation recommendation for Phase 2

Current nav is 6 items + a dropdown that hides 5 real destinations. Proposed (owner to confirm):

**Home · Shop (with category filter) · About · Blog · Contact** — with Cart / Wishlist / Account / Vendor Login as header icons, and the four policies in the footer. Collaborators, Events, Calendar, Research and Testimonials only get a place in the nav once they have real content.
