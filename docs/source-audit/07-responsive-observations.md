# 07 — Responsive observations

Tested in a real Chromium browser at **1440 × 900**, **768 × 1024** and **390 × 844**, with full-page screenshots for 20 pages (`screenshots/`, indexed in `screenshots/INDEX.md`). Measurements below are read from the live DOM, not estimated.

---

## 1. Header behaviour (measured)

| Viewport | Header height | Rows | Nav | Search |
|---|---|---|---|---|
| 1440 | **177 px** | 3 (announcement 32 px, logo/search/utility 92 px, nav 52 px) | full row, uppercase | full-width field inside the header |
| 768 | **233 px** | 4 (announcement 34 px, logo + icons 84 px, search 60 px, hamburger bar 55 px) | hamburger only | full-width row |
| 390 | **70 px** | 1 compact bar (logo 44 px, search icon, cart, hamburger) | hamburger only | icon → opens search |

- Header is **not sticky** at any width (`position: static`): scrolling 1,200 px moves it fully out of view.
- The desktop header consumes **20 % of a 900 px viewport** before any content appears.
- At 768 the header takes **23 %** of the screen and pushes the hero down; the search field is full-bleed while the logo row is cramped.
- The mobile header relies on a 44 × 44 px hamburger; the drawer covers the full screen and repeats all navigation plus a 12-item "Shop by category" list.

## 2. Document heights

| Page | 1440 | 768 | 390 |
|---|---|---|---|
| Home | 5,498 | 8,264 | 11,100 |
| Shop | 2,487 | 5,943 | 4,221 |
| Category (rice) | 2,470 | 5,537 | 4,217 |
| Product | 3,427 | 4,779 | 4,723 |
| About | 4,899 | 6,352 | 7,953 |
| Services | 6,019 | 6,936 | 10,092 |
| Contact | 1,986 | 2,265 | 2,629 |
| Testimonials | 5,590 | 5,536 | 6,835 |
| Collaborators | 2,221 | 2,482 | 3,047 |
| Events | 2,119 | 2,307 | 2,767 |
| Calendar | 2,331 | 2,423 | 2,804 |
| Research | 2,448 | 2,812 | 3,539 |
| Blog | 2,604 | 4,180 | 5,378 |
| Blog post | 1,836 | 2,158 | 2,417 |
| Store listing | 975 | 1,502 | 1,877 |
| My account | 1,214 | 1,824 | 1,808 |
| Vendor login | 1,870 | 2,344 | 2,787 |
| Terms | 5,720 | 6,115 | 7,764 |
| Cart | 1,988 | 2,823 | 2,408 |
| Wishlist | 2,165 | 2,744 | 2,829 |

Home at 1440 = 5,498 px (≈ 6.1 screens). At 390 it is **11,100 px (≈ 13 screens)** — the same content, stacked, with the category rail, promo tiles and product grid all expanded.

## 3. Layout changes per breakpoint

**Home**
- 1440: hero is two columns (category card ~300 px + text/photo). Trust bar 4-up. Promo tiles 3-up. Categories 7-up grid (4 + 3). Fresh Picks = 240 px sidebar + 4-column product grid (2 rows). Collections 4-up. Marketplace split 50/50. Why block 4-up. CTA centred.
- 768: hero stacks — H1 first (wraps to 4 lines), copy, buttons, then the cut-out photo to the right of nothing (photo sits below the copy at ~45 % width), then **popular categories as horizontal pills that overflow the viewport** (the "Millets" pill is clipped at the right edge). Trust bar becomes 2 × 2. Promo tiles stack. Categories 3-up. Product grid becomes 2-up. Collections 2-up.
- 390: everything single column; product cards in the "Fresh Picks" block render **1 per row but keep the desktop card proportions**, making the section extremely tall (≈ 2,400 px for 8 products); the category sidebar becomes a horizontal list; the Collections tiles keep a 2-up shape and all four images load.

**Shop / category**
- 1440: filter rail fixed left (~280 px), 4-column grid, pagination right.
- 768: filter rail collapses to a stacked block above the grid, 2-column grid, pagination centred; document height jumps to 5,943 px (2.4× the desktop height for the same 12 products).
- 390: filters become a collapsed control, 1–2 column grid; product cards are full width with the icon-action row overlapping the card bottom.

**Product**
- 1440: 50/50 gallery + buy panel, tabs below, related products 4-up.
- 768: gallery full width, buy panel below, sticky bar still active, tabs stack.
- 390: gallery full width, title/price/CTA stacked, sticky bar covers the bottom ~72 px; the "Why Choose" cards become 1-up and add ~700 px.

**Contact**: two columns (details + form) at 1440; single column at 768/390 with the form after the details. The Google Maps embed sits in its own block and resizes with the column (420 px tall at 1440).

**Blog**: 1440 = content + right sidebar; 768/390 = single column, sidebar moves below the posts (adding ~1,000 px on mobile).

**Footer**: 284 px at 1440 (4 columns + legal bar), **437 px at 768** (2 × 2 columns), **610 px at 390** (single column, newsletter field full-width, legal bar stacked). The footer is 22 % of the mobile viewport height on a 2,629 px contact page.

## 4. Horizontal overflow

- No page-level horizontal scrollbar was detected at 1440 or 390 (`scrollWidth === clientWidth` on all 20 pages measured).
- **At 768 the "Popular Categories" pill row on the home page overflows its container** — pills run past the right edge and are clipped rather than wrapping or becoming a slider (visible in `home-tablet-top-768.jpg`).
- The live search dropdown at 1440 spans ~510 px and sits over the hero without clipping.
- The 82-product grid uses a fixed 12-per-page count at every width; no infinite scroll.

## 5. Typography and spacing changes

- H1 stays 48 px at 1440; at 768 it wraps to 4 lines at the same size; at 390 it drops to ~34 px (measured in the mobile screenshot, scale factor 6.09 — **estimate**).
- Body copy stays 15–16 px at all widths; small labels (card eyebrow, pack size) sit at 12–13 px on mobile, which is below a comfortable reading size.
- Section padding is reduced on mobile but stays generous (64–80 px), which is why mobile pages run 2–13 screens.
- Card corner radius, borders and shadows are consistent across breakpoints.

## 6. Mobile-specific content differences (verified)

- The hero's "Popular Categories" card list (left rail on desktop) becomes a horizontal pill strip below the copy.
- The desktop nav row disappears into the drawer, which also lists all 12 shop categories (desktop keeps them in a sidebar/card).
- The announcement bar drops the "Welcome to…" text at 768 and keeps only the phone number; at 390 the whole bar is hidden.
- The desktop utility text "Flat ₹50 delivery / Across Tamil Nadu" is hidden on mobile.
- Product grids lose the "Quick View"/"Compare" affordances on small cards (they remain in markup but are visually cramped).

## 7. What this means for Phase 2

1. A 177/233 px header is too tall: one row is enough, sticky, with search in an overlay.
2. Home must not be 13 screens on mobile — consolidate the category repetition and the promo/collection overlap.
3. Category pills must wrap or scroll in a real slider, never clip at 768.
4. Empty image tiles must never render (Collections tiles 3 and 4).
5. Product grids need a consistent aspect ratio and gap at every breakpoint, with icon actions not overlapping the card edge.
6. The footer must shrink to a compact block (target ≤ 3 rows at 1440, ≤ 5 at 390) and must never cut the last section.
7. Every page's last section + footer should fit one screen (desktop) — the current contact/about/services pages do not.

## 8. Limitations

- Only Chromium was tested (no Safari/iOS rendering check), so `100svh` behaviour, sticky-knock-on and `backdrop-filter` should be re-checked on a real iPhone during Phase 2.
- Hover-dependent states (dropdowns, card overlays) were exercised with CDP mouse events; the desktop "Others" dropdown did not open under either hover or click, so its desktop presentation is recorded as unverified rather than styled.
- No network throttling was applied; timings on a real 3G connection will be worse.
