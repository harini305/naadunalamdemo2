# 08 — Issues, gaps and questions for the owner

Nothing here has been "fixed". Each item is evidence from the live site on 16 Nov 2026, with the decision that Phase 2 needs before it can proceed.

---

## A. Broken things (verified)

| # | Issue | Where | Evidence | Consequence |
|---|---|---|---|---|
| A1 | **Spices category is empty but promoted heavily** | `/product-category/spices/` | "No products were found matching your selection."; homepage "Featured Category — Whole Spices… Eighteen varieties listed… Starting at ₹40 [Shop Spices]" links straight to it | The strongest merchandising claim on the homepage leads to a dead end. Either load the spice products into that category or remove the section |
| A2 | **Desktop "Others" dropdown does not open** | header, ≥1024 px | `ul.sub-menu` computed `display:none`, `aria-hidden="true"`; hover and click both failed; opens fine in the mobile drawer | Collaborators, Events, Calendar, Research Articles and Blog are unreachable from desktop nav |
| A3 | **"Visit Store" path mismatch** | product pages | link is `/store/naadunalam/` (works); `/store/naadu-nalam/` (the obvious slug) is **404** | any rebuilt route must use the real slug or redirect |
| A4 | **No favicon** | sitewide | `/favicon.ico` → 404, no `<link rel="icon">` | browser tab shows a generic icon |
| A5 | **`/sitemap.xml` 404** | sitewide | only `/wp-sitemap.xml` exists | search engines and auditors that expect `/sitemap.xml` fail |
| A6 | **`/newsletter/` is an empty page** | `/newsletter/` | the page body renders only the word "Newsletter" | dead route in the sitemap |
| A8 | **Store directory count is wrong** | `/store-listing/` | "Total stores showing: 3" but only 2 stores render | trust/QA issue |
| A9 | **Placeholder vendor phone numbers** | `/store-listing/` | 8123456456, 9176482135 | reads as test data on a live page |
| A10 | **All social links are `#`** | header + footer, 8 instances | `elementor-social-icon … href="#"` | users cannot follow the brand; footer icons are dead |
| A11 | **Search dropdown button clipped** | header search suggestions | "ADD TO CART" renders as "ADD TO CAR" | visual bug on the primary search path |
| A12 | **Category pages share one H1** | all 13 `/product-category/*` | H1 "Shop All Organic Products" everywhere; category name only in breadcrumb/title | SEO/keyword loss and confusing page identity |
| A13 | **Category pill row clips at 768 px** | home, tablet | "Millets …" pill cut at the right edge | horizontal clipping at the most common tablet width |
| A14 | **Empty-state pages in the sitemap** | Testimonials, Collaborators (+5), Events, Calendar, Research Articles | all say "coming soon" / "nothing scheduled" / "no research yet" | indexed thin pages |
| A15 | **Map is a name query, not a pin** | `/contact/` | `maps.google.com?q=Naadu Nalam, Chennai, Tamil Nadu 600001` — the map centres on a generic Chennai area (Poonamallee/ Kattupakkam) with no shop marker | customers get a misleading location; needs a real address/pin from the owner |
| A16 | **Two incompatible product image styles in one grid** | category and shop grids | roughly half the thumbnails are studio photos of filled bags/bowls, the other half are flat printed-label graphics named `*-pdf.jpg` (e.g. Kalanamak, Kallundai Samba, Karuppu Kavuni, Kudavaazhai) | the grid looks inconsistent and the label graphics lose detail at 300 px |

## B. Data and content inconsistencies

| # | Issue | Detail |
|---|---|---|
| B1 | **Product naming is inconsistent** | `Honey (தேன்)` is the tulsi honey (slug `tulsi-infused-honey`, description mentions tulsi); its `<title>` becomes "Honey (தேன்) – Honey (தேன்)". `Kichadi Samba Rice` slug vs `Kichili Samba Rice` name. `Malamattu Ghee` vs `Mallamaattu Nei` (and image `Mallamaattu-Nei`). `Country Jaggery (நாட்டுச் சர்க்கரை)` — English says jaggery, Tamil says sugar, description says unrefined cane sugar. `Barley Rice (பார்லி அரிசி / வாற்கோதுமை)` mixes barley and wheat words. |
| B2 | **Image reuse across products** | 14 product photos are shared by 2–3 different SKUs (e.g. `Kichadi-Samba-Aval.webp` on Aathur Kichadi, Arubathaam Kuruvai and Kichadi Samba aval). Buyers cannot tell products apart in the grid. |
| B3 | **Stock looks like placeholder data** | 78 of 82 products are exactly "100 in stock"; three are 94/98/99; one is "In stock". |
| B4 | **Category counts on the homepage are slightly off** | homepage says Natural Sweeteners 5 (actual 4) and lists 11 categories totalling 83 (actual 82). |
| B5 | **Homepage price anchors are correct** | "Natural Sweeteners from ₹98", "Ghee & Oil from ₹275", "Rice & Grains from ₹165" — all match the real minimum prices. Keep them. |
| B6 | **"Whole Spices… eighteen varieties… from ₹40"** | the "from ₹40" matches the Masala & Powders category (min ₹40), not the empty Spices category. The eighteen-variety claim is unverifiable. |
| B7 | **Product image files converted from PDF** | several 640 × 640 JPEGs are named `…-pdf.jpg` (e.g. `Mappillai-Samba-Rice-pdf.jpg`) while the rest of the catalogue is 1024 × 1024 WebP. Mixed quality in one grid. |
| B8 | **Blog posts are thin** | 8 posts, 250–280 words each, no images inside the body, one author ("Anuraga"), all dated May–Aug 2026. |
| B9 | **Duplicate copy across pages** | the NAMBIKKAI / NALAM / MARABU values block appears on About and Services; "Why Choose Naadu Nalam" appears twice on product pages and again on Services; the category list appears three times on the homepage. |
| B10 | **No meta descriptions** | 22 of 35 non-product pages and 13/13 category pages; all 82 products have one. No OG tags, no structured data anywhere. |
| B11 | **Homepage `<title>` starts with a horse emoji** | "🐴 Naadu Nalam – Organic Marketplace \| Farm Fresh Products Direct from Farmers" — at odds with a food brand and inconsistent with every other page title. |

## C. Claims that need owner confirmation (do not repeat unverified)

- "100% Natural", "No Chemicals", "Chemical Free", "Always free from chemicals and pesticides", "Direct From Growers", "Quality Checked", "Trusted vendors", "Verified & transparent".
- No FSSAI licence, organic certification, GSTIN or company registration appears anywhere on the site.
- "Flat ₹50 delivery **across Tamil Nadu**" vs the shipping policy, which restricts fresh/frozen to Chennai + selected locations and promises pan-India only for non-perishables. The header claim is broader than the policy.

## D. Missing content (cannot be written by a designer)

1. **Testimonials / reviews** — none exist; the site says so. The redesign should not invent any.
2. **Real events and calendar dates** — none.
3. **Collaborator profiles** — names exist, descriptions do not.
4. **Research articles** — none.
5. **Team / founders, founding year, farm partners, certifications.**
6. **A street address and map coordinates** — only "Chennai, Tamil Nadu 600001".
7. **Social profile URLs** — none.
8. **FAQ answers** — no FAQ exists; useful ones (delivery area, COD, returns, pack sizes) could be written from the policies, but that is an owner decision.
9. **Real product photography for 14 duplicated images** and for the 640 px PDF-derived images.

## E. Questions for the owner (blocking or near-blocking)

1. **What is the production domain?** The audited site is on `naadunalam.fastfilings.in`. Is `naadunalam.in` live elsewhere? (The contact email uses `@naadunalam.in`.)
2. **Is the commerce to stay live in the rebuild?** The catalogue runs on WooCommerce + Dokan with COD only. Options: (a) headless front end over the existing WooCommerce backend (keeps cart, checkout, vendors, orders), (b) static catalogue + enquiry/WhatsApp ordering (no transactions), (c) full new backend (biggest scope). This decides the whole Phase 2 architecture.
3. **Do the 5 collaborator pages and the Events / Calendar / Research Articles sections have content coming?** If not, drop them from navigation rather than ship placeholders.
4. **The spices category:** should the 18 whole spices be created as products, or should the homepage section be removed?
5. **Which claims are legally supportable?** ("100% natural", "chemical free", "direct from growers", "quality checked".) Anything not supportable gets removed or reworded.
6. **Social media URLs** for Facebook / Instagram / X / LinkedIn (or remove the icons).
7. **Full postal address** and, if a map is wanted, the exact location.
8. **Blog:** keep, thin out, or drop? If kept, are more posts coming, and may the 8 existing posts be reused verbatim?
9. **Tamil in the redesign:** confirm that product names stay bilingual (recommended) and that Tamil body text is wanted on About/Contact, because this decides the second font (see `05` §2).
10. **Vendor onboarding:** should the public site keep vendor login/registration and the store directory, or is the marketplace story narrative-only for now?
11. **Are the current prices and pack sizes final?** They are used as the source of truth in `data/products.csv`.
12. **Who is "Anuraga"?** Author name on all blog posts — real byline or placeholder?
13. **Images:** do we have the right to reuse all 109 downloaded photos, and can the owner supply better originals for the 14 duplicated and 640 px PDF-derived images?
14. **Currency/tax:** prices show no GST line. Is GST included in the listed price?
