# 06 — Functionality and technical dependencies

Classification used below:
**Observed** = visible, not exercised · **Interaction tested** = clicked/typed, result seen · **Functionality verified** = behaviour confirmed end-to-end · **Partially verified** = one part confirmed, another unknown · **Unverified** = could not confirm, do not claim it works.

Everything below was tested against the live site on 16 Nov 2026 from an anonymous browser session.

---

## 1. Navigation

| Feature | Status | Detail |
|---|---|---|
| Desktop nav row (6 items) | **Functionality verified** | links resolve to `/`, `/shop/`, `/about-us/`, `/contact/`, `/wishlist/`, `#` |
| "Others" dropdown (Collaborators → 5 pages, Events, Calendar, Research Articles, Blog) | **Observed in DOM, not verified as usable** | `li.menu-item-2232 > ul.sub-menu` exists with `aria-hidden="true"` and computed `display:none`; neither real mouse hover (CDP `mouseMoved` over the item) nor a real click opened it at 1440. It **does** open in the mobile drawer. Treat desktop access to Collaborators / Events / Calendar / Research / Blog as **broken** until proven otherwise. |
| Mobile drawer (< 1024 px) | **Functionality verified** | hamburger 44×44 px at top right opens a full-height white panel: nav items, then "SHOP BY CATEGORY" list (12 categories), then "My account". Sub-items of "Others" are collapsed behind the caret. |
| Sticky header | **Not present** | `header` is `position: static`; it scrolls away (measured top = −1200 after scrolling 1200 px) |
| Breadcrumbs | **Verified** | product, category, blog, policy pages |
| Back-to-top | not present | |
| Anchor links ("Explore Categories", "#categories") | **Interaction tested** | jump to the category section on the same page |

---

## 2. Search

| Feature | Status | Detail |
|---|---|---|
| Header live search (ShopBuilder AJAX) | **Functionality verified** | typing "rice" produced a floating 2-column panel of product results: category label, name, price, pack, "ADD TO CART"; the panel overlays the hero |
| Result page `/?s=rice` | **Functionality verified** | "Search results for: rice" with 12 result cards on the first page |
| Search in filter rail (shop) | **Observed** | separate field, submits to the same archive |
| Bug | **Verified** | the "ADD TO CART" button in the dropdown clips to "ADD TO CAR" |

---

## 3. Catalogue browsing

| Feature | Status | Detail |
|---|---|---|
| Category checkbox filter (shop) | **Functionality verified** | selecting "Aval / Flakes (17)" navigated to `/shop/?product_cat=aval-flakes` and returned 12 cards on page 1 of 2 |
| Price range slider | **Observed** | dual-handle slider, ₹40–₹685 |
| Pack filter | **Observed** | 100 g / 250 g / 500 g / 1 kg / 500 ml counts |
| Sale / Regular filter | **Observed** | no product is currently on sale, so this filter returns nothing |
| Sort dropdown | **Observed** | Default, popularity, rating, latest, price low→high, price high→low |
| Pagination | **Verified** | 12 per page, 6 pages for 82 products |
| Quick View | **Observed** | button on every card; not opened |
| Compare | **Observed** | icon on cards; no compare page was found |
| Wishlist toggle on card | **Functionality verified** | clicking the heart on an aval product added it; `/wishlist/` then showed "1 item in your wishlist" with quantity control and add-to-cart, plus "Share wishlist / Copied / Clear all" |
| Empty category | **Verified** | `/product-category/spices/` → "No products were found matching your selection." |

---

## 4. Product page

| Feature | Status | Detail |
|---|---|---|
| Gallery + zoom | **Observed** | one image for most products, thumbnail rail, "Zoom" label |
| Quantity stepper | **Functionality verified** | `input.qty` number, min 1, max 100, step 1 |
| Add to cart (AJAX) | **Functionality verified** | click added the item without reloading; header count updated; a "View cart" affordance appeared |
| Sticky add-to-cart bar | **Observed** | appears when the main button scrolls out of view |
| Tabs (Description / Shipping / Additional information / Reviews / Vendor Info / More Products) | **Observed** | tab markup present; Additional information holds weight, dimensions, pack |
| Reviews | **Verified empty** | "There are no reviews yet." Comment/review form present |
| Vendor card ("Sold by Naadu Nalam / Visit Store") | **Verified link** | points to `/store/naadunalam/` (works); `/store/naadu-nalam/` (a plausible guess) is a 404 |
| Share buttons | **Observed** | no share target verified |

---

## 5. Cart and checkout

| Feature | Status | Detail |
|---|---|---|
| Cart page | **Functionality verified** | line item shows "Vendor: Naadu Nalam", quantity, line total, coupon field, "Continue Shopping", "Clear Cart" |
| Shipping | **Verified** | "Naadu Nalam Flat rate: ₹50.00 — Shipping to Tamil Nadu"; subtotal + shipping + total |
| Coupon | **Observed** | "Apply Coupon" field, no code known |
| Checkout | **Functionality verified (fields + method)** | URL stays `/checkout/`, H1 "Checkout"; billing fields (email, first/last name, country India, address 1/2, city, state, postcode, phone), order notes, order review table; **one payment method: `cod` (Cash on Delivery)**; order attribution hidden fields (WooCommerce) |
| Order placement | **Unverified** | deliberately not submitted (would create a real COD order) |
| Order confirmation / emails | **Unverified** | requires a real order |
| Payment gateway | **None** | no Razorpay/Stripe/PayU/UPI plugin asset detected |

**Consequence for Phase 2:** there is no payment integration to preserve. COD plus a WooCommerce backend is the whole commerce stack. A static Next.js rebuild can reproduce browsing, cart and a COD checkout **only if it talks to a live backend** (WooCommerce REST/Store API, or a new backend). Otherwise Phase 2 is a catalogue + enquiry site. This is the single biggest scoping decision — see `09`.

---

## 6. Accounts and vendor flows

| Feature | Status | Detail |
|---|---|---|
| `/my-account/` | **Observed** | Login (username/email + password, "Remember me", lost password) and Register (email, first name, last name, **Shop Name**, **Shop URL** → `/store/…`, phone, "I am a customer / I am a vendor" radio) |
| `/vendor-login/` | **Observed** | Custom page: H1 "Sell on Naadu Nalam", vendor benefits, login form, and a separate "Apply to sell" form (name, email, phone, anti-spam field, shop name, shop URL) |
| `/dashboard/` | **302** | Redirects to login; Dokan vendor dashboard |
| Vendor storefront `/store/naadunalam/` | **Functionality verified** | H1 "Naadu Nalam", "Contact Seller", "Local seller on Naadu Nalam", tabs Products / Reviews, category rail, 12 products, 6 page pagination |
| Vendor storefront `/store/thaayanbu/` | **Observed** | Renders, but the category rail is empty and no products were listed |
| `/store-listing/` | **Verified inconsistency** | "Total stores showing: 3" but only 2 store cards (Naadu Nalam, Thaayanbu); phone numbers 8123456456 / 9176482135 look like placeholders |
| Vendor registration/approval emails | **Unverified** | not submitted |

---

## 7. Forms and messaging

| Form | System | Status | Fields |
|---|---|---|---|
| Contact | **Contact Form 7 6.2.5**, AJAX to `admin-ajax.php`, form id 143 | **Observed; submission unverified** (not submitted to avoid writing to the business inbox). Empty submit produced no visible validation message within 2.5 s (`data-status` stayed `init`). | `your-name`, `your-email`, `your-message`, `your-consent` checkbox, "Send message" |
| Footer newsletter | **Elementor Pro form** ("Footer Newsletter") | **Observed** | `form_fields[email]` + Subscribe. No action/mail provider visible in markup |
| Vendor application | Dokan registration form | **Observed** | see above |
| Product review | WooCommerce | **Observed** | rating, review text, name, email |
| Anti-spam | CF7 has **no reCAPTCHA / Turnstile** in markup; Dokan vendor form has an "Anti-spam" field | risk of spam | |
| WhatsApp | **Verified link** | `https://wa.me/919092114630` on the contact page ("Chat with us on WhatsApp") |

No live chat, no chatbot, no callback widget.

---

## 8. Third-party and embedded services

| Dependency | Present? | Detail |
|---|---|---|
| Google Maps | **Yes** (one embed) | `/contact/` lazy-loads `https://maps.google.com/maps?q=Naadu Nalam, Chennai, Tamil Nadu 600001, India&t=m&z=14&output=embed&iwloc=near` in a 858 × 420 iframe, below the fold; no API key visible, no pinned place |
| YouTube / Vimeo | **No** | no iframes or embeds found on any audited page |
| Instagram feed | **No** | only dead social icons |
| Google Analytics / Tag Manager / Meta Pixel | **No** | no scripts found |
| Razorpay / Stripe / PayU | **No** | COD only |
| Shipping API | **No** | flat rate |
| WhatsApp | yes | deep link only |
| Font Awesome | yes | bundled by Elementor |
| jQuery | yes | WordPress core |
| Elementor / ShopBuilder / Dokan / WooCommerce | yes | see stack table in `01` |

---

## 9. Technical dependencies that constrain a rebuild

1. **WordPress is the source of truth.** All 82 products, prices, stock, vendors and orders live in WooCommerce/Dokan. A new front end either consumes that (headless) or the catalogue is exported once and the client maintains a new system.
2. **Dokan Pro multi-vendor** powers seller storefronts, vendor registration and the split order model. Nothing in a static rebuild can replace it without a backend.
3. **COD-only checkout** means no payment provider contract to migrate.
4. **Elementor/ShopBuilder markup** (`.rtsb-*`, `.e-con`) has no value for a new front end — copy text and data, not markup.
5. **Self-hosted fonts** in `/wp-content/uploads/nn-fonts/` are licensed for the site's use; keep them local in Phase 2 (same five files are downloaded).
6. **Hosting:** Hostinger + LiteSpeed, HTTP/3, HSTS, CSP `upgrade-insecure-requests`. The public host is a `fastfilings.in` subdomain — confirm the real production domain before deploying anything.
7. **No backup of the site** exists in this workspace; only HTML snapshots and images. A database export would be needed for a true migration.
8. **No 404 page design** (`/this-page-does-not-exist-123/` returns the theme's generic 404), **no favicon**, `/sitemap.xml` 404 (only `wp-sitemap.xml`).
9. **Accessibility quick pass:** images have alt text on most product photos (many are empty `alt=""` on decorative ones); the icon-only header links rely on `aria-label="Wishlist"` (good) but the mobile menu toggle has no accessible name found; nav dropdown is keyboard-inaccessible; several 12–13 px labels are below comfortable size. No skip-link issue (Hello Elementor provides "Skip to content").
