# 01 — Audit report

**Site:** Naadu Nalam — https://naadunalam.fastfilings.in/
**Audited:** 16 November 2026, desktop 1440×900, tablet 768×1024, mobile 390×844
**Method:** saved HTML of 142 URLs, parsed with a stdlib DOM extractor; live rendering and interaction in a real Chromium browser; screenshots captured per page and viewport.

---

## 1. Technical stack (verified)

| Layer | What is running | Evidence |
|---|---|---|
| CMS | WordPress (REST API open at `/wp-json/`) | `<link rel="https://api.w.org/">`, `wp-sitemap.xml` |
| Theme | **Hello Elementor** (bare theme, all layout in Elementor) | `/wp-content/themes/hello-elementor/` |
| Page builder | **Elementor 4.3.6 + Elementor Pro** | `elementor/css/post-*.css`, container ids `nn-hero`, `nn-cats`, `nnprice` |
| Commerce | **WooCommerce** (products, variations, cart, checkout, COD) | WooCommerce CSS/JS bundles, `/product/`, `/product-category/`, `/cart/` |
| Marketplace | **Dokan Lite + Dokan Pro** | `/store/<vendor>/`, `/store-listing/`, `/dashboard/`, vendor registration |
| Shop layout | **ShopBuilder Pro** (`rtsb-*` classes) | product grid, AJAX live search, wishlist, quick view, filters |
| Extras | Contact Form 7 6.2.5, Woo Product Variation Gallery, Variation Swatches | form markup, plugin folders |
| Hosting | Hostinger, LiteSpeed, HTTP/3, LiteSpeed Cache | response headers `platform: hostinger`, `X-LiteSpeed-Cache: hit` |
| Fonts | **self-hosted woff2** in `/wp-content/uploads/nn-fonts/` | 29 `@font-face` rules, no Google Fonts request |
| Images | WordPress uploads, WebP + JPEG, many `-WxH` derivatives | manifest, `data/pages.json` |

No analytics, no tag manager, no pixel, no chat widget and **no payment gateway** were found in the page source. The only third-party-looking assets are Font Awesome icon fonts bundled by Elementor.

---

## 2. Information architecture as published

**Header (two tiers on desktop, 177 px tall):**

1. Announcement strip — "Welcome to Naadu Nalam Organic Store", "Call us: +91 9092114630", four social icons (all `href="#"`).
2. Main bar — logo, full-width product search, "Flat ₹50 delivery / Across Tamil Nadu", wishlist icon, cart icon with count, account icon.
3. Nav row — HOME · SHOP · ABOUT US · CONTACT US · WISHLIST · OTHERS ▾

**"Others" dropdown (in DOM, opens in the mobile drawer, not reproducible on desktop hover):**
COLLABORATORS (with 5 nested storefront-style pages) · EVENTS · CALENDAR · RESEARCH ARTICLES · BLOG

**Footer (4 columns + legal bar, 284 px desktop):**
- Brand: logo, "fresh and organic", "Good Food, Brighter Tomorrow"
- Quick Links: About Us, Blog, Contact Us, Wishlist, Vendor Login
- Customer Support: Shipping Policy, Returns & Refund, Terms & Conditions, Privacy Policy, Store Listing
- Newsletter: "Get organic updates, offers and stories from our farmers." + email field
- Follow Us: Facebook, X, Instagram, LinkedIn (all `#`) + "Cash on Delivery" badge
- Legal line: "© 2026 Naadu Nalam. All rights reserved." + "Good Food · Healthy People · Sustainable Tomorrow"

**Page types in use:** marketing page (Elementor), WooCommerce shop/archive, product detail, blog index + single post, vendor storefront, vendor listing, account/login/register, cart, checkout, wishlist, policy page, empty-state page (events, calendar, research articles, newsletter).

---

## 3. Homepage — section order (measured at 1440)

| # | Section | Height | Background | Notes |
|---|---|---|---|---|
| 0 | Announcement + header + nav | 177 | #F3F8F4 / #1B5338 | two-tier header |
| 1 | Hero: "Popular Categories" card column + H1 + copy + 2 CTAs + farmer cut-out photo | 640 | #E6F1EA | first screen fills 100 vh incl. header |
| 2 | 4-up trust bar (₹50 delivery, sourced close to home, seller storefronts, upfront pricing) | 87 | #FFFFFF | thin white strip |
| 3 | 3 promo tiles (Natural Sweeteners from ₹98, Ghee & Oil from ₹275, Rice & Grains from ₹165) | 230 | cream/mint tints | "Shop Now" pills |
| 4 | Popular Categories — 7 cards + "View All Categories" | 503 | #F3F8F4 | same 7 categories as the hero card |
| 5 | Fresh Picks from Our Sellers — category sidebar (11 categories with counts) + 8-product grid + "Browse all categories" | 1131 | #FFFFFF | repeats category list a third time |
| 6 | Collections Built Around Real Cooking — 4 tiles (Oils, Pulses, Other Rice, Personal Care) | 645 | #F3F8F4 | all four tiles carry images (verified live; the full-page capture misses lazy-loaded ones) |
| 7 | Many Sellers. One Basket. — dark green split block with 3 points + 2 CTAs | 461 | #1B5338 | only inverted section |
| 8 | Featured Category — "Whole Spices, Straight From the Source", from ₹40 | 365 | white | CTA lands on an **empty category** |
| 9 | Why Naadu Nalam — 4 icon cards on white | 438 | white | |
| 10 | Closing CTA — "Discover products that feel closer to home" | 438 | #E6F1EA | |
| 11 | Footer | 284 | #1B5338 | |

Total document height 5,498 px. Section gaps are large (60–120 px) with several sections carrying their own inner padding, so the page reads long on a 1440×900 screen.

**Repetition to fix in Phase 2:** the category list appears **three times** (hero card, Popular Categories grid, Fresh Picks sidebar). Eyebrow labels appear above almost every section ("POPULAR CATEGORIES", "FROM OUR SELLERS", "SHOP BY NEED", "A MULTI-VENDOR MARKETPLACE", "WHY NAADU NALAM", "NAADU NALAM") in gold uppercase 11–12 px — the exact pattern Harini rejects.

---

## 4. Shop and catalogue

- `/shop/` — H1 "Shop All Organic Products" (no meta description), left filter rail (product search, category checkboxes with counts, price range slider, pack checkboxes, sale checkboxes, reset), "Showing 1–12 of 82 results", sort dropdown, 4-column card grid at 1440, pagination 1–6, 6 pages.
- Card anatomy: image (300×300 derivative of a 1024² photo), tiny category label, bilingual product name, price + pack, three icon actions (cart, wishlist, compare) and a "Quick View" overlay.
- **All 13 category pages reuse the same H1 "Shop All Organic Products"** — the category name only appears in `Shop by category`, the breadcrumb and the `<title>`. No category introduction copy exists on any of them (thin SEO).
- Category counts verified against products: Aval 17, Traditional Rice 17, Lentils & Pulses 12, Health Mixes 9, Millets 7, Ghee & Oil 5, Masala & Powders 5, Natural Sweeteners 4, Other Rice 3, Herbal & Wellness 2, Honey 1 = **82**.
- `/product-category/spices/` exists in the sitemap, is linked from the homepage "Shop Spices" CTA, and returns **"No products were found matching your selection."** The homepage also claims "Eighteen varieties listed... cumin, coriander, cardamom, cloves, mustard, fenugreek" and "Starting at ₹40".
- Product detail (`/product/<slug>/`): breadcrumb, gallery (single image on most, thumbnail rail), title, price + pack, rating line, stock, SKU, short description, 4 flag chips (100% Natural, Direct From Growers, Quality Checked, Cash on Delivery), quantity, Add to cart, share, "Sold by Naadu Nalam / Visit Store", a sticky add-to-cart bar on scroll, "Why Choose Naadu Nalam?" 4 cards, "Goodness in Every Meal" block, tabs (Description in Tamil / Shipping / Additional information / Reviews / Vendor Info / More Products), 6 vendor products, 4 related products.
- Price range across the catalogue: **₹40 – ₹685**. Every product is "100 in stock" except three (94, 98, 99) and one "In stock".
- **14 product images are shared by more than one product** (e.g. one aval photo used by three different aval SKUs). Not a licensing issue, but a merchandising one — customers cannot tell products apart in the grid.

---

## 5. Editorial content

- `/blog/` — real blog, 8 posts, 6 per page, WP pagination `Page1 / Page2`, sidebar with categories (Kitchen Notes 3, Wellness 3, Sourcing & Sellers 1, Seasonal Picks 1), recent posts, tags.
- Posts are ~250–280 words each, dated 12 Aug 2026 back to 22 May 2026, author "Anuraga", each with a featured image on the listing but **no images inside the article body**.
- `/research-articles/` — placeholder page: "We have not published any research yet." It does surface 3 blog posts as substitutes.
- `/events/` — placeholder: "Nothing is scheduled at the moment."
- `/calendar/` — placeholder year grid (Jan–Dec with season labels, "No entries yet" ×12).
- `/collaborators/` — placeholder: "Collaborator information coming soon"; 5 collaborator detail pages exist (TST Music & Dance Academy, TST Event Mgt, Ignite Our Tharas Kids Kondaatam, Queen Bee's Math Tutoring, Bharathanaatiyam) each with "Details coming soon".
- `/testimonials/` — explicitly states no reviews are published yet and explains the review policy. **No testimonial text exists anywhere to preserve.**
- `/newsletter/` — exists as a page but renders only the word "Newsletter". Dead route.

---

## 6. Commerce journey (verified behaviour)

1. **Search** — header field does live AJAX suggestions: 2-column panel with category label, product name, price, pack and an "ADD TO CART" button per result. Verified with "rice". The button text clips to "ADD TO CAR" in the dropdown.
2. **Add to cart** — works via AJAX; header count and mini-cart update; no confirmation toast was visible in the test.
3. **Cart** — `/cart/` shows vendor name per line ("Vendor: Naadu Nalam"), quantity stepper, coupon field, order summary, **Flat rate ₹50 shipping** to Tamil Nadu, total.
4. **Checkout** — `/checkout/` is stock WooCommerce: billing fields, India state list, order notes, **one payment method: Cash on Delivery**, order review table.
5. **Wishlist** — heart toggles on product cards; persists in the session; `/wishlist/` lists the item with availability, quantity and add-to-cart, plus "Share wishlist / Copied / Clear all".
6. **Account** — `/my-account/` is a combined login + register form with a customer/vendor radio; vendor registration collects shop name and shop URL (`/store/<shop>`).
7. **Vendor login** — `/vendor-login/` is a custom Elementor page with a Dokan login and a full vendor application form (anti-spam field present).
8. **Vendor storefront** — `/store/naadunalam/` and `/store/thaayanbu/` render a Dokan store with contact-seller button, category sidebar, 12 products and tabs.
9. **Store listing** — `/store-listing/` says "Total stores showing: 3" but only **2** stores are listed (Naadu Nalam, Thaayanbu), with placeholder-looking phone numbers (8123456456, 9176482135).

---

## 7. Content and brand observations

- **Language:** every product name and every prominent heading is bilingual English + Tamil. Body copy is English. Tamil body text appears in the product Description tab and in two About-section lines.
- **Claims needing owner confirmation:** "100% Natural", "No Chemicals", "Chemical Free", "Always free from chemicals and pesticides", "Direct From Growers", "Quality Checked", "Trusted vendors". These read as marketing assertions, not verified certifications. No organic certification body, FSSAI licence number or GSTIN is published anywhere.
- **Social links:** all four (`#`) are dead. No real social profile URL exists anywhere on the site.
- **Missing metadata:** no meta description on **22 of 35** non-product pages (home, shop, about, services, contact, collaborators, all 4 policies, blog index, cart, checkout, my-account, store listing…) and on **all 13 product-category pages**. All 82 products do have one. No Open Graph tags anywhere, no structured data (no Product / Organization / Breadcrumb JSON-LD), no favicon. Canonicals are correct.
- **Year inconsistency:** footer says "© 2026", policies say "Last updated: 25/08/2026", blog posts are dated May–August 2026, logo asset `desc` says supplied 2026-09-22. Consistent with a 2026 build, not an error, but the *future* date relative to a real-world review should be confirmed with the owner.
- **Copy duplication:** the "Our Promise" block (NAMBIKKAI / NALAM / MARABU — Trust / Well-being / Tradition) appears on both About and Services; "Why Choose Naadu Nalam" appears on product pages in two different forms; the category list appears three times on the homepage.

---

## 8. Design system as it exists today

| Token | Value | Status |
|---|---|---|
| Heading font | **Fraunces** (serif), weights 400/500/600/700, `-0.6px` tracking on H1 | verified |
| Body / UI font | **Outfit** (geometric sans), 400/500/600/700 | verified |
| Tamil font | **Noto Sans Tamil** 400/500/600/700, wired as fallback inside the Fraunces/Outfit faces | verified |
| Body base | 16 px / 26.4 px, colour `#123D2A`, background `#FBFAF5` | verified computed style |
| H1 | 48 px / 56.6 px / 700 / `-0.6px` / `#1B5338` | verified |
| Section H2 | 21–22 px / 700 (small for a heading; page titles look like cards) | verified |
| Nav link | Outfit 15 px / 600 / uppercase / white on `#1B5338` | verified |
| Button | Outfit 14–15 px / 700, pill radius, white on `#0F804A`, 12/24 px padding | verified |
| Primary green | `#1B5338` | verified (dominant, 94 uses in CSS) |
| Action green | `#0F804A` / `#0B6B2B` | verified |
| Deep green text/dark block | `#123D2A` , `#0E4B26` | verified |
| Gold accent | `#F9B52C` (eyebrows `#9C6008` on light, `#F9B52C` on dark) | verified |
| Cream | `#FEF6E4` | verified |
| Mint surfaces | `#F3F8F4`, `#E8F7EC`, `#E6F1EA`, `#E3EDE6` | verified |
| Body text | `#1B1B1B` / `#123D2A`, muted `#666666` / `#53655D` | verified |
| Radius | 8–12 px cards, 999 px pills, 24 px hero panel | observed |
| Shadow | soft, low-opacity green-tinted | observed |
| Logo | raster official mark inside an SVG wrapper (384×372 WebP) | verified |
| Favicon | none (404) | verified |

Full detail in `05-brand-reference.md`.

---

## 9. What the rebuild has to carry over

1. All 82 products with their real names (English + Tamil), prices, packs, stock, SKUs, categories, short descriptions and descriptions.
2. The marketplace model: seller named on the product, one basket, one checkout, COD.
3. The 11 real categories and their counts.
4. Contact details, hours, delivery promise, ₹50 flat rate, 4 policies.
5. The logo and the photographic catalogue (originals are downloaded).
6. Blog: 8 existing posts, or a deliberate decision to launch a slimmer editorial section.
7. The bilingual naming convention.

## 10. What can be dropped or consolidated

Placeholder pages with no content (newsletter, research articles, calendar, events, collaborator detail pages, testimonials) — either build them properly or leave them out of the navigation. The three-times-repeated category list, the eyebrow labels on every section, the "Why Choose" blocks repeated on every product, and the 13 identical category templates are the main things making the site feel long and templated.
