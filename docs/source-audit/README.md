# Naadu Nalam — Phase 1 source audit

**Source site:** https://naadunalam.fastfilings.in/
**Audit date:** 16 November 2026
**Phase:** 1 of 2 — research and documentation only. **No code, no redesign, no configuration change, no push, no deploy.**
**Workspace:** `D:\naadunalam2` (was empty before this audit; only `docs/source-audit/` was created)

---

## What this site is

Naadu Nalam is a **multi-vendor marketplace for traditional Tamil Nadu food and farm products** — native rice varieties, aval (flakes), millets, pulses, cold-pressed oils and ghee, natural sweeteners, health mixes, masala podi and personal care. Products are listed bilingually (English + Tamil). Independent sellers run their own storefronts on the marketplace and customers check out once.

It runs on **WordPress + WooCommerce + Dokan Pro (multi-vendor) + Elementor Pro + ShopBuilder Pro**, hosted on Hostinger/LiteSpeed at a `fastfilings.in` subdomain (looks like a staging or demo host rather than the live brand domain).

Business facts found on site (see `03-content-inventory.md` for sources):

| Field | Value |
|---|---|
| Brand name | Naadu Nalam ("fresh and organic") |
| Strap line | "Good Food, Brighter Tomorrow" |
| Phone | +91 90921 14630 |
| Email | hello@naadunalam.in |
| Base | Chennai, Tamil Nadu 600001, India |
| Hours | Mon–Sat 9:00 AM – 6:00 PM, Sunday closed |
| Delivery | Flat ₹50 per order, across Chennai & Tamil Nadu (non-perishables pan-India) |
| Payment | Cash on Delivery only (verified at checkout) |
| Currency | INR (₹) |
| Catalogue | 82 published products in 11 active categories (13 category pages exist) |

---

## Audit coverage

| Coverage | Count / status |
|---|---|
| URLs harvested from `wp-sitemap.xml` | 138 |
| Pages fetched and parsed (HTML) | 142 (138 sitemap routes + cart, checkout, vendor stores, search, policy extras) |
| Pages rendered in a real browser | 23 |
| Products parsed (name, price, pack, SKU, stock, bilingual description) | 82 / 82 |
| Product pages opened visually | 1 (Mappillai Samba Rice); product cards reviewed on shop + category grids |
| Product category pages | 13 fetched, 1 opened visually (Traditional Rice), filters tested on shop |
| Blog posts | 8 / 8 retrieved (thin content, ~250 words each, no body images) |
| Viewports tested | 1440 × 900, 768 × 1024, 390 × 844 |
| Screenshots captured | 71 full-page JPEGs at 1440 / 768 / 390 (see `screenshots/INDEX.md`) |
| Assets downloaded (originals) | 109 images + 5 font files, 24 MB |
| Interactive states tested | search suggestions, add-to-cart, cart, checkout fields, wishlist add + persistence, mobile menu, product tabs, form validation attempt |

**Fully inspected:** home, shop, all 13 product categories, about, services ("How Ordering Works"), contact, testimonials, collaborators + 5 collaborator pages, events, calendar, research articles, blog + 8 posts, store listing, 2 vendor storefronts, cart, checkout, wishlist, my-account, vendor-login, 4 policy pages, 8 tag archives, 4 blog category archives.

**Partially inspected:** individual product pages (all parsed from HTML; two opened visually), vendor dashboard (login wall), search results page (rendered, not counted in detail), 404 page (status only).

**Discovered but inaccessible / not verifiable:** `/dashboard/` (redirects to login), wishlist for a logged-out-of-cookies session (works once the browser session has an item), any order confirmation, payment gateway (there is none — COD only), email delivery from the contact form and newsletter (not submitted, to avoid writing to the business inbox).

**Broken:** `/store/naadu-nalam/` (404 — the product-page "Visit Store" link points at `/store/naadunalam/`, which works), `/favicon.ico` (404), `/newsletter/` (page exists but is empty apart from the title), `/sitemap.xml` (404 — only `wp-sitemap.xml` exists).

**Screenshot caveat:** full-page captures are stitched by the browser and can miss content that only loads on scroll (the contact map, some below-fold images). Where that mattered, the element was scrolled into view and re-checked individually — see `home-collections-1440.jpg` and `contact-location-1440.jpg` in `screenshots/`.

**Access limitations:** the desktop "Others" dropdown could not be opened with synthetic hover or click from the automation layer (it is an Elementor nav submenu, `aria-hidden="true"`); the submenu was verified to exist in the DOM and works in the mobile drawer. Contact form and newsletter submission were deliberately not executed.

---

## Files in this folder

| File | Contents |
|---|---|
| `README.md` | This index, coverage record and limitations |
| `01-audit-report.md` | Full audit findings: structure, hierarchy, page types, design system observations |
| `02-page-inventory.md` | Every route, classified, with section order and Phase-2 recommendation |
| `03-content-inventory.md` | Verbatim content reference per page, products, blog, policies, footer |
| `04-assets-manifest.csv` | All 109 downloaded assets: file, type, dimensions, size, use, source URL, issues |
| `05-brand-reference.md` | Typography, palette (verified hexes vs estimates), logo, shape and visual language |
| `06-functionality-and-dependencies.md` | Nav, search, filters, cart, checkout, vendor flows, forms, plugins, third-party deps |
| `07-responsive-observations.md` | Measured desktop/tablet/mobile behaviour with numbers |
| `08-issues-gaps-questions.md` | Inconsistencies, missing content, unverifiable claims, owner questions |
| `09-phase-2-recommendations.md` | Route plan, two-font decision inputs, palette, mandatory redesign rules |
| `screenshots/INDEX.md` | Screenshot list with page + viewport + measured page height |
| `data/site-content.json` | Structured verbatim content (pages, products, blog) for Phase 2 |
| `data/products.json` / `data/products.csv` | 82 products with price, pack, SKU, stock, categories, images |
| `data/blog-posts.json` | 8 blog posts with dates, excerpts and body text |
| `data/pages.json` | Raw per-page extract: metadata, headings, text lines, images |
| `data/html/` | Saved HTML of every fetched page (evidence, not for reuse) |
| `original-assets/` | Downloaded original images + `fonts/` (5 self-hosted woff2 files) |

---

## Hard gate

Phase 1 stops here. Nothing was built, installed, reconfigured, pushed or deployed. The only writes were inside `docs/source-audit/`.
