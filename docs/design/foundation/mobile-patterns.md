# Mobile Patterns - Jastip China

Pola UI spesifik mobile (bottom nav, bottom sheet, gestures, keyboards) yang tidak covered di responsive.md umum.

---

## 1. BOTTOM NAVIGATION (Mobile Only)

**Presence:** Only show on xs/sm (0-767px). Hidden on md+ (768px+).

### Layout
```
┌──────────────────────────────────────┐
│ [Home] [Catalog] [FAB +] [Cart] [Profile]│
│ flex-1   flex-1   56px    flex-1  flex-1 │
└──────────────────────────────────────┘
Height: 64px (including safe area padding)
Background: #FFFFFF
Border-top: 1px solid #E8DCC8
Position: fixed, bottom 0, left 0, right 0
Z-index: 10
Shadow: 0 -2px 8px rgba(44,24,16,0.08)
Padding-bottom: env(safe-area-inset-bottom) /* iPhone notch */
```

### Items

| Item | Icon | Label | Active Color | Inactive Color |
|------|------|-------|-------------|----------------|
| Home | house 24px | "Beranda" | #C8102E | #6B5D52 |
| Catalog | grid 24px | "Katalog" | #C8102E | #6B5D52 |
| FAB | plus 24px (white) | (none) | #C8102E bg | #C8102E bg |
| Cart | shopping-bag 24px | "Keranjang" | #C8102E | #6B5D52 |
| Profile | user 24px | "Profil" | #C8102E | #6B5D52 |

**Icon size:** 24x24px
**Label:** Inter 400, 10px
**Touch target:** full flex-1 area (min 44x44px)

### FAB (Floating Action Button)

```
Size: 56x56px circle
Background: #C8102E
Icon: white + 24x24px
Elevation: -8px from bar top (half outside bar)
Shadow: 0 4px 12px rgba(200,16,46,0.3)
Position: center, relative to bar
```

**Action:** Tap → navigate to `/permintaan-po` (Ajukan Custom PO)

### Cart Badge
```
Size: 18x18px circle
Background: #C8102E
Text: white, Inter 600, 10px
Position: top-right of Cart icon (-4px, -4px offset)
Show: only if cart has items (count > 0)
Max display: "99+" if > 99
```

### Page Body Padding
```
padding-bottom: 80px (64px nav + 16px gap)
```

---

## 2. BOTTOM SHEET (Mobile Modal Pattern)

**Usage:** Filter katalog, select options, image picker, confirm dialog (mobile alternative to modal).

### Structure
```
┌──────────────────────────┐
│        ━━━               │ (drag handle, 36x4px, #E8DCC8)
│                          │
│  [Title]          [X]   │
│                          │
│  Content                 │
│  (scrollable)            │
│                          │
│  [Action Button]        │ (optional, sticky bottom)
└──────────────────────────┘
```

### Dimensions
```
Width: 100vw
Max height: 80vh
Background: #FFFFFF
Radius: 20px top-left + top-right
Shadow: 0 -8px 24px rgba(44,24,16,0.16)
Position: fixed, bottom 0
Z-index: 40
```

### Backdrop
```
Background: rgba(0,0,0,0.4)
Blur: 4px
Z-index: 39
```

### Open Animation
```
1. Backdrop fade-in: 200ms ease-out
2. Sheet slide-up: 300ms ease-out
   - Initial: transform translateY(100%)
   - Final: transform translateY(0)
```

### Close Animation
```
1. Sheet slide-down: 200ms ease-in
2. Backdrop fade-out: 200ms ease-out (parallel)
```

### Gestures
- Swipe down (drag handle area): dismiss sheet
- Threshold: 25% height (if dragged < 25%, snap back)
- Tap backdrop: dismiss sheet

---

## 3. GESTURES

### Image Gallery Swipe (Detail Produk)

```
Swipe left: next image
Swipe right: previous image
Threshold: 30% width or 50px
Animation: 300ms ease-out (translate)
Haptic: light feedback on snap
```

**Dot Indicators:**
```
● ○ ○ ○ (max 5 dots, current = filled)
Position: bottom center, 8px from image bottom
Color: #FFFFFF (filled), rgba(255,255,255,0.4) (empty)
Size: 8x8px circle
```

### Pull to Refresh (Katalog, Riwayat Pesanan)

```
Pull threshold: 80px
Spinner: appears at 40px pull
Haptic: light at threshold
Release: triggers refresh
Animation: 300ms ease-out (snap back)
```

**Spinner Style:**
- Color: #C8102E
- Size: 24x24px
- Text: "Memuat..." (Inter 400, 14px, #6B5D52)

### Long Press: NOT USED

**Reason:** Avoid hidden interactions. All actions visible via buttons.

---

## 4. MOBILE KEYBOARDS

### Input Types

| Field | Input Type | Keyboard |
|-------|------------|----------|
| Nomor WhatsApp | `type="tel"` | Numeric |
| Email | `type="email"` | Email (@ key) |
| Password | `type="password"` | Default |
| Harga | `inputmode="decimal"` | Numeric + decimal |
| Kode Pos | `inputmode="numeric"` | Numeric |
| Qty | `inputmode="numeric"` | Numeric |
| Search | `type="search"` | Default + search key |

### Auto-resize Textarea

```javascript
// Auto-resize behavior
textarea.style.height = 'auto';
textarea.style.height = `${textarea.scrollHeight}px`;
// Max height: 240px (10 lines), then scroll
```

### Form Scroll Behavior

- Keyboard open: scroll input to view (browser default usually OK)
- Submit button: above keyboard (sticky bottom, adjust for viewport)
- Form container: `scroll-padding-bottom: 300px` (space for keyboard)

---

## 5. MOBILE NAVIGATION PATTERNS

### Back Button

**Location:** Header left (replacing hamburger on inner pages)
**Behavior:** `history.back()` or navigate to logical parent
**Icon:** chevron-left 24x24px

```
┌────────────────────────────────────┐
│ [←]  Detail Produk                 │
└────────────────────────────────────┘
```

### Page Transition (Mobile)

```
- New page: slide-in from right (300ms ease-out)
- Old page: slide-out to left (300ms ease-out, slight fade)
- Back: reverse (new from left, old to right)
```

**Exception:** Detail produk transition (the "berani" moment — fade + scale, not slide).

### Drawer Menu (Hamburger)

```
Width: 280px
Background: #FFFFFF
Slide: from left, 300ms ease-out
Backdrop: rgba(0,0,0,0.4) + blur 4px
Close: X 44x44px or tap backdrop or swipe left
```

**Menu Content:**
```
┌──────────────────────┐
│ [X]                  │
│                      │
│ [Avatar]             │
│ Nama User            │
│ noWa                 │
│                      │
│ ─────────────────    │
│                      │
│ Beranda              │
│ Katalog              │
│ Cara Order           │
│ Lacak Pesanan        │
│ Ajukan PO            │
│                      │
│ ─────────────────    │
│                      │
│ Notifikasi    [3]    │
│ Profil               │
│ Logout               │
│                      │
└──────────────────────┘
```

---

## 6. STICKY CTA BAR (Mobile)

**Usage:** Detail produk, checkout, keranjang — pages with primary action.

### Detail Produk
```
┌──────────────────────────┬──────────────────────┐
│ [+ Keranjang]            │ [Beli Langsung]      │
│ secondary                │ primary              │
└──────────────────────────┴──────────────────────┘
Height: 64px + safe area
Position: fixed bottom, above bottom nav (if present) or standalone
Background: #FFFFFF
Border-top: 1px solid #E8DCC8
Z-index: 9 (below bottom nav z-10)
```

**If Bottom Nav present:** CTA bar replaces bottom nav on this page (hide bottom nav, show CTA bar).

### Checkout
```
┌──────────────────────────────────────────────────┐
│ Total: Rp 350.000                                 │
│ [Bayar Sekarang]                                 │
└──────────────────────────────────────────────────┘
Height: 80px + safe area
Position: fixed bottom
```

---

## 7. MOBILE-SPECIFIC COMPONENTS

### Filter Button (Katalog Mobile)

```
Position: header right (replacing search on scroll)
Icon: filter 24px
Badge: count of active filters (18x18px, #C8102E)
Tap: open bottom sheet with filters
```

### Sort Dropdown (Mobile)

```
Position: below header (sticky, 48px height)
Layout: [Sort: Terbaru ▼]  [View: ▦]
Tap sort: open bottom sheet with sort options
Tap view: toggle grid (2-col ↔ 1-col)
```

### Image Preview (Fullscreen)

```
Background: rgba(0,0,0,0.9)
Close: tap anywhere or X top-right
Pinch: zoom (optional)
Swipe: navigate images
```

---

## 8. MOBILE PERFORMANCE

### Image Optimization

```
Format: WebP (fallback JPEG)
Max dimension: 800x800px (retina = 1600x1600 source)
Compression: quality 80
Lazy load: below fold
Placeholder: skeleton shimmer (not generic spinner)
```

### List Virtualization

```
Katalog/riwayat with > 50 items:
- Implement react-window or similar
- Render only visible items + buffer
- Prevent DOM overload
```

### Font Loading

```
Inter: preload, font-display: swap
Noto Serif SC: preload critical weights only (500, 700)
Ma Shan Zheng: lazy load (only on pages that use it)
```

```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700&display=swap" />
```

---

## 9. MOBILE CHECKLIST

### Per Page

- [ ] Bottom nav present (xs/sm only)
- [ ] Sticky CTA bar (detail produk, checkout)
- [ ] Bottom sheet for filters/modals (mobile)
- [ ] Input types trigger correct keyboard
- [ ] Touch targets min 44x44px
- [ ] No horizontal scroll
- [ ] Images lazy loaded
- [ ] Font preloaded (Inter, Noto Serif SC)
- [ ] Safe area padding (iPhone notch)
- [ ] Pull to refresh (list pages)
- [ ] Swipe gestures (image gallery)
- [ ] Back button on inner pages
- [ ] Page transitions smooth
- [ ] No layout shift on load (skeleton loaders)
