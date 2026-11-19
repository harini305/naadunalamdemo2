# 09 — Phase 2 recommendations

Inputs for the rebuild. This is a plan, not an implementation — nothing below has been built.

---

## 1. Recommended site shape

A **multi-page Next.js App Router site of 6 top-level pages plus templates**, not a copy of the current 13 near-identical templates and 7 placeholder pages.

| # | Page | Route | Built from | Notes |
|---|---|---|---|---|
| 1 | Home | `/` | current home §2, curated | one hero, one category entry point, one product rail, marketplace story, closing CTA. Kill the repeated category list. |
| 2 | Shop | `/shop` | `/shop/` + all 13 categories | client-side category filter (11 real categories) + price + pack; server-rendered first page; 82 products |
| 3 | Product | `/product/[slug]` | 82 product pages | gallery, bilingual name, price/pack, stock, SKU, EN short description + TA description, vendor, add-to-cart/enquiry, delivery facts, honest empty reviews |
| 4 | About | `/about` | `/about-us/` + the useful half of `/services/` | story, product philosophy, values, "how ordering works" (Explore/Choose/Order/Receive), delivery + COD |
| 5 | Journal (optional) | `/journal` + `/journal/[slug]` | 8 blog posts | only if the owner keeps editorial; max 10 images across the blog per the brief |
| 6 | Contact | `/contact` | `/contact/` | details, hours, WhatsApp, form; add an address/map only if supplied |
| — | Legal | `/legal/[shipping|refunds|terms|privacy]` | 4 policy pages verbatim | keep the policy text exactly |
| — | Cart / checkout | `/cart`, `/checkout` | only if a backend exists | see §6 decision |

**Drop from navigation:** testimonials, collaborators (+5), events, calendar, research articles, newsletter, brand archive, tag archives, blog categories. Keep the routes only if the owner supplies content.

**Predicted structure:** Home ≈ 6–7 sections; Shop = header + filter + grid; Product = 1 screen of buy panel + 2 content blocks; About ≈ 5 sections; Contact = 1 screen + form. Every page ends with the last section + footer fitting one screen.

---

## 2. Typography — the two families

Constraints: exactly two families sitewide, both readable and non-decorative, and **one of them must carry Tamil**, because ~40 % of the visible text is Tamil. Neither current Latin face has Tamil glyphs.

**Recommendation (pending owner sign-off):**

- **Headings — Fraunces** (400/600/700, latin + latin-ext, self-hosted). Already integrated, warm serif that echoes the logo wordmark's voice, and gives the brand its "hand-designed" feel against a very plain sans body.
- **Body / UI / Tamil — one humanist sans with a Tamil subset.** Preference order: **Noto Sans Tamil** (already on the server, Tamil + Latin, four weights) or **Hind** / **Mukta Malar** (Latin + Tamil in one family). Used for body, nav, buttons, forms, cards, footer, prices and every Tamil string.

That is two families: Fraunces + one sans. No third face, no display font for the wordmark (the wordmark stays artwork), no italic display usage, no per-section overrides.

**Type scale** (responsive, controlled — one scale everywhere):

| Role | Desktop | Mobile | Weight |
|---|---|---|---|
| H1 (hero) | 56–64 px, 1.05–1.1 line height, −1 % tracking | 34–38 px | 700 serif |
| H2 (section) | 36–40 px | 26–28 px | 600–700 serif |
| H3 (card / block) | 20–22 px | 18 px | 600 serif or 700 sans for product names |
| Body | 17 px / 1.6 | 16 px / 1.6 | 400 sans |
| Small / meta | 14 px minimum | 14 px | 500 sans |
| Button / nav | 15 px | 15 px | 600 sans |

Nothing below 14 px except legal fine print at 13 px.

---

## 3. Palette

Carry forward only what is verified (`05` §3):

- **Deep green `#1B5338`** — headers, footer, primary buttons, dark blocks, headings.
- **Ink green `#123D2A`** — body text.
- **Warm off-white `#FBFAF5`** — page canvas.
- **Mint `#F3F8F4` / `#E6F1EA`** — alternating bands, cards.
- **Cream `#FEF6E4`** — one warm accent surface (promo blocks).
- **Gold `#F9B52C`** — small accents only (search button, active states, rating stars). Not for text on white (use `#9C6008` if text is needed).
- White `#FFFFFF`, hairlines `#D0D5D2`, muted text `#53655D`.

Drop: the eyebrow gold uppercase micro-labels, and the dark-gold `#9C6008` labels entirely if eyebrows are removed (recommended).

---

## 4. Mandatory redesign rules for Phase 2 (from the brief — non-negotiable)

**Typography**
1. Exactly two font families across the entire site (one heading, one for body/UI/nav/buttons/forms/cards/footer/legal), including the logo's voice. No third face for decoration, footer or special sections.
2. Same type scale on every page for equivalent components; no italics; no tiny text.

**Layout**
3. **Section gap = 32 px** between sections, every page (not 80–120 px).
4. **Hero = exactly 100 svh** including the header — no gap below it and no peek of the next section.
5. **Nav lands exactly at the top** of the target page/section, 0 px offset, nothing hidden under the header.
6. **Last section + footer fit one screen together** on every page: no half-cut section, no sliver of the previous section, no top clipping.
7. No empty or white space inside sections — fill with image, content or a taller/reflowed layout. Where a split section has a short column (FAQ heading vs accordion, contact details vs form), use a pinned panel matched to the other column's height.
8. Every section unique and image-rich; no single repeated structure, no walls of text.

**Visual**
9. Professional, human-designed. No eyebrow/kicker text ("Welcome to", "Ubud · Canggu · Bali", "Discover"), no 01/02/03 numbering, no decorative badges, no random symbols, no breadcrumbs.
10. No AI-looking template patterns; effects only where they earn their place.

**Content**
11. Concise pages; preserve every fact, price, pack, contact detail and policy; do not invent testimonials, FAQs, prices, posts or claims.
12. Blog (if built) uses no more than **10 images** total.

**Footer**
13. Compact, content-driven, 4 → 3 → 2→1 columns; no oversized padding, no duplicated link sets, no fixed footer; natural transition from the last section.

**Images / performance**
14. Original assets only — from `original-assets/`. No stock, no AI imagery, no demo photos. Images in a group share one size and aspect ratio.
15. Resize/compress locally, modern formats, lazy-load below the fold, responsive `sizes`, correct dimensions on every `<img>`.
16. Next.js must not use the Vercel Image Optimization quota: merge `images: { unoptimized: true }` into the existing `next.config` (merge, don't replace unrelated settings). Still ship compressed, correctly-sized files.

**Links / behaviour**
17. Buttons and links never leave the site. Book/Buy/Contact/Login all resolve internally; every footer link opens a real page.
18. Never push or deploy without explicit approval; show a localhost preview first.

**Stack for Phase 2:** Next.js (App Router) + JavaScript + React + GSAP + ScrollTrigger, responsive.

---

## 5. What to reuse from the audit data

| Need | Source |
|---|---|
| All product facts | `data/products.csv` / `data/products.json` |
| Product copy (EN short + TA long) | `data/products.json` (`short`, `desc_ta`) |
| Categories and counts | `data/products.csv` (category column) + `01` §4 |
| Page copy | `03-content-inventory.md`, `data/site-content.json` |
| Blog posts | `data/blog-posts.json` |
| Images | `original-assets/` (109 files) + `04-assets-manifest.csv` for what belongs where |
| Fonts | `original-assets/fonts/*.woff2` (Fraunces, Outfit, Noto Sans Tamil) |
| Colours / type scale | `05-brand-reference.md` |
| Facts that must appear | `03` §1 (contact, delivery, policies) |

Suggested asset hygiene before the build: convert the 640 px `*-pdf.jpg` product images up to a consistent 1000–1200 px square set, replace the 14 duplicated product photos with distinct ones (owner-supplied), and keep every grid image at a single 1:1 crop.

---

## 6. The one decision that changes the build

The original is a live WooCommerce/Dokan store with COD checkout. A Next.js front end can be built three ways:

| Option | What it means | Risk |
|---|---|---|
| **A. Headless over WooCommerce** | Next.js reads products via WooCommerce REST/Store API; cart and COD checkout post to the existing store | needs API keys, CORS, and the WordPress host kept alive; more backend work |
| **B. Catalogue + enquiry (recommended for a first pass unless the client insists on live selling)** | All 82 products, categories, prices and detail pages are static; "Order" goes to a WhatsApp/enquiry form; no cart | loses real checkout; must be stated to the owner |
| **C. Full new backend** | New commerce system with Dokan-style vendors | far beyond a frontend rebuild |

Phase 2 cannot silently pick one: with option B there is no `/cart` or `/checkout` to build, and with option A the cart/checkout must be reproduced faithfully. **Confirm with the owner before starting.**

---

## 7. Suggested build order (Phase 2, after approval)

1. Scaffold Next.js + GSAP; load exactly two fonts; lock the token file (colours, type scale, 32 px rhythm).
2. Shared shell: compact sticky header (one row), nav, compact footer, then verify "last section + footer fits one screen" on the simplest page.
3. Home (hero 100 svh → categories → products → marketplace → CTA).
4. Shop with filters + product card grid from `products.csv`.
5. Product template (one, then all 82).
6. About (merged with how-ordering-works) and Contact (with form).
7. Legal pages from the verbatim policy text.
8. Journal only if approved (≤ 10 images).
9. QA at 1440 / 768 / 390 against `qa-checklist`: gaps 32 px, hero exact, footer fit, two fonts, no eyebrow text, no overflow, links internal.
10. Localhost preview for approval — no push, no deploy until explicitly asked.
