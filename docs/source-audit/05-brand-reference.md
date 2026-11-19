# 05 — Brand reference

Everything here was read from the live site (computed styles, CSS, DOM, assets) on 16 Nov 2026. Each value is marked **verified** (read from the running site) or **estimate** (judged from screenshots where no value could be read).

---

## 1. Logo

| Item | Detail |
|---|---|
| File | `/wp-content/uploads/2026/09/naadu-nalam-logo-header.svg` (75 KB) — **an SVG wrapper around a base64 WebP raster, 384 × 372 px** (`original-assets/naadu-nalam-logo-embedded.png`) |
| Embedded description | "Official Naadu Nalam logo supplied by the owner 2026-09-22. Replaces the earlier vector trace." |
| Shape | circular emblem, slightly irregular hand-drawn edge |
| Contents | green leaves (top), yellow sun with birds (top right), brown soil layer, blue water layer (bottom), Tamil "நாடு" (top left), "Naadu Nalam" wordmark (bottom right), "Our Inclusive Well-Being" along the lower edge |
| Colours in the mark | deep green foliage, mid-green, golden yellow sun, warm brown soil, bright blue water, white background |
| Display sizes | 68 px tall in the desktop header, 56 px in the footer, ~56 px in the mobile drawer |
| Placement | header left (with the HTML "Naadu Nalam / fresh and organic" text beside it), footer left, some page heroes |
| Issues | no true vector; raster is only 384 px wide (soft at 2× DPR), no monochrome/light version, no favicon derived from it |

**Wordmark type:** the "Naadu Nalam" lettering inside the logo is baked into the raster. It is a warm serif with a slight calligraphic feel — not a font that can be reused. The site's heading face (Fraunces) is the closest available stylistic match **as a direction**, but it is not the same typeface. Treat the wordmark as artwork, never set it as live text.

---

## 2. Typography — what the original uses

Three families are loaded, all **self-hosted woff2** from `/wp-content/uploads/nn-fonts/` (no Google Fonts request):

| Family | Role | Weights loaded | Files |
|---|---|---|---|
| **Fraunces** (variable-ish serif) | all headings, eyebrow labels, some numbers | 400, 500, 600, 700 | `fraunces-latin.woff2` 36.6 KB, `fraunces-latin-ext.woff2` 33.6 KB |
| **Outfit** (geometric sans) | body copy, navigation, buttons, cards, forms, footer | 400, 500, 600, 700 | `outfit-latin.woff2` 32.3 KB, `outfit-latin-ext.woff2` 14.8 KB |
| **Noto Sans Tamil** | Tamil glyphs, wired in as a fallback face inside both Fraunces and Outfit rules | 400, 500, 600, 700 | `noto-sans-tamil.woff2` 50.5 KB |

All five files are downloaded to `original-assets/fonts/`. Font payload per page ≈ 400 KB (4 weights × 3 families).

### Measured type scale (verified, desktop 1440)

| Element | Family / weight | Size | Line height | Tracking | Notes |
|---|---|---|---|---|---|
| H1 (hero) | Fraunces 700 | 48 px | 56.64 px (1.18) | −0.6 px | `#1B5338` |
| Section H2 | Fraunces 700 | 36 px | 42.48 px | normal | "Popular Categories", "Fresh Picks…" |
| Smaller H2 inside cards/blocks | Fraunces 700 | 21 px | 24.78 px | normal | e.g. promo tile titles |
| H3 / card title | Outfit 700 | 15 px | 19.8 px | normal | product name |
| Eyebrow label | Fraunces 700 | 13 px | 15.34 px | +1.2 px | uppercase, `#9C6008` on light / `#F9B52C` on dark |
| Body paragraph (global) | Outfit 400 | 16 px | 26.4 px (1.65) | normal | `#123D2A` |
| Section intro | Outfit 400 | 15 px | 24 px | normal | `#53655D` |
| Price | Outfit 700 | 15 px | 24.75 px | normal | `#1B5338` |
| Navigation | Outfit 600 | 15 px | 22 px | normal | uppercase, white |
| Primary button | Outfit 600 | 15 px | 16.5 px | normal | white on green, radius 10 px, 20 px side padding, ~46 px tall |
| Footer link | Outfit 400 | 15 px | 22 px | normal | `#D0D5D2` |
| Small print / policy body | Outfit 400 | 13–14 px | 1.5 | — | some 12 px labels on cards (**too small**, flagged) |

### Two-font rule and the Tamil problem — **read before choosing fonts**

The redesign must use **exactly two font families**. This site cannot obey that naively, because roughly 40 % of the visible text is Tamil (every product name, every category name), and neither Fraunces nor Outfit contains Tamil glyphs — the original site solves this by loading a third face (Noto Sans Tamil) *inside* the two families' rules.

Phase 2 has three honest options, all two-family:

1. **Serif + Tamil-capable sans.** Headings in a serif (Fraunces is already integrated and matches the wordmark's warmth); body in one sans that ships both Latin and Tamil subsets — e.g. **Noto Sans / Noto Sans Tamil** (same family, two subsets), **Hind** (Latin + Tamil), or **Mukta Malar** (Latin + Tamil). One family, two script subsets.
2. **Serif + Noto Sans Tamil only.** Body Latin set in Noto Sans Tamil's Latin subset — acceptable at 15–16 px, but the Latin is less characterful than Outfit.
3. Keep Outfit for Latin and Noto for Tamil as before — that is **three** families and breaks the rule; only acceptable if the owner explicitly allows a documented script exception (recommend against).

Whichever is chosen, both faces must be **self-hosted** (the original already is), with `font-display: swap`, Latin + Latin-ext + Tamil subsets, and no third decorative face anywhere.

The logo wordmark must stay artwork; do not attempt to match it with a third display font.

---

## 3. Colour

Verified from the rendered page and from 590 occurrences of hex values across the Elementor CSS for posts 15 / 356 / 395 / 614.

### Core palette (verified)

| Token | Hex | Use | Evidence |
|---|---|---|---|
| Brand deep green | `#1B5338` | header/footer background, H1/H2, primary button, dark blocks | 94 occurrences in CSS; computed |
| Forest text green | `#123D2A` | body text on light, icons | computed body colour |
| Action green | `#0F804A` | CTA pills, links, hover fills | 51 occurrences |
| Deep action green | `#0B6B2B` | darker CTA/hover variant | 25 occurrences |
| Ink green | `#0E4B26` | small accents / dark text | 7 occurrences |
| Gold | `#F9B52C` | eyebrow labels on dark, search button, accents | 21 occurrences |
| Dark gold | `#9C6008` | eyebrow labels on light backgrounds | Elementor global `--e-global-color-nneyebrowlight` |
| Cream | `#FEF6E4` | warm tile backgrounds | 4 occurrences |
| Page background | `#FBFAF5` | body canvas | computed |
| Mint 50 | `#F3F8F4` | announcement bar, alternate sections | computed |
| Mint 100 | `#E6F1EA` | hero and closing CTA backgrounds | computed |
| Mint 200 | `#E8F7EC` | soft panels | 17 occurrences |
| Panel green tint | `#E3EDE6` | cards on mint | 16 occurrences |
| White | `#FFFFFF` | cards, sections | 187 occurrences |
| Body ink | `#1B1B1B` | card titles | |
| Muted grey-green | `#666666` / `#53655D` | secondary copy | |
| Border / hairline | `#D0D5D2` / `#ECECEC` | dividers, input borders | |
| Footer link grey | `#D0D5D2` | footer text | computed |
| Alert/price accent | `#E67F00` | occasional price/sale text | 4 occurrences |

### Colours present but *not* brand

- Purple/blue focus rings and default WooCommerce link colours inside the account, cart and checkout forms.
- Font Awesome icon fills inherited from Elementor defaults.
- The bright blue water and brown soil in the logo — part of the artwork, not used as UI colours anywhere.

There is no documented brand palette file (`theme.json`, Figma, brand guide) — the greens/gold above are the de-facto palette.

---

## 4. Shape, depth, texture and image language

| Aspect | What the site does | Keep / change |
|---|---|---|
| Radius | 10 px buttons, 8–12 px cards, 999 px pills (trust chips, category pills), 24 px hero panel | keep the soft rounded feel |
| Shadows | very soft, green-tinted, 0 6–18 px blur, low opacity | keep, but lighten on white |
| Borders | 1 px `#E3EDE6` / `#D0D5D2` hairlines | keep |
| Imagery | product photography on white/neutral backgrounds, 1:1 crop; lifestyle cut-out of a farmer with a produce basket; tinted gradient panels behind text | keep 1:1 product crops; avoid collage |
| Image treatment | no duotone, no heavy overlays; occasional pale mint panel behind a cut-out photo | keep restrained |
| Iconography | Font Awesome 5/6 solid, single-colour green, inside circular or rounded-square chips | replace with a consistent line/solid set, one weight |
| Motifs | leaf glyph used as a bullet in headings, faint leaf outlines in hero and section backgrounds, gold eyebrow rules | use sparingly; the eyebrows go away in Phase 2 |
| Personality | warm, agrarian, trustworthy, bilingual Tamil-first naming, unpretentious | preserve |

---

## 5. What "recognisably Naadu Nalam" means for Phase 2

1. Deep green + gold + cream, on a warm off-white canvas.
2. Tamil and English side by side — the Tamil name is not decoration, it is the product name.
3. Product photography on clean light backgrounds, square crops, no stock imagery.
4. The circular emblem with leaves/sun/soil/water, unchanged.
5. Calm, generous spacing; nothing neon, nothing gradient-heavy, no dark mode.
