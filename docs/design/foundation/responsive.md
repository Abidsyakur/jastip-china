# Responsive Design - Jastip China

Mobile-first approach. Setiap page harus dapat diakses dan fungsional di semua breakpoints.

---

## 1. BREAKPOINT STRATEGY

**Mobile-first:** Base styles untuk mobile, scale up dengan `min-width` media queries.

```css
/* Base: Mobile (0-639px) */
.component { /* mobile styles */ }

/* sm: 640px+ (mobile landscape) */
@media (min-width: 640px) { /* ... */ }

/* md: 768px+ (tablet) */
@media (min-width: 768px) { /* ... */ }

/* lg: 1024px+ (desktop) */
@media (min-width: 1024px) { /* ... */ }

/* xl: 1280px+ (desktop large) */
@media (min-width: 1280px) { /* ... */ }
```

| Breakpoint | Width | Device | Layout |
|------------|-------|--------|--------|
| xs | 0-639px | Mobile portrait | 1 column, bottom nav, hamburger |
| sm | 640-767px | Mobile landscape | 2 columns, bottom nav |
| md | 768-1023px | Tablet | 2-3 columns, top nav, no bottom nav |
| lg | 1024-1279px | Desktop small | 3-4 columns, top nav, full features |
| xl | 1280px+ | Desktop large | 4 columns, max-width container |

---

## 2. NAVIGATION RESPONSIVE

### Mobile (xs, sm: 0-767px)

**Header:**
```
Height: 56px
Layout: [☰] [Logo Center] [Cart Icon] [Avatar Icon]
Hamburger: 44x44px (left)
Logo: centered
Icons: 44x44px each (right)
```

**Menu:** Hamburger → drawer slides from left
- Drawer width: 280px
- Backdrop: rgba(0,0,0,0.4) + blur 4px
- Close: X 44x44px or tap backdrop

**Bottom Navigation:**
```
[Home] [Catalog] [FAB +] [Cart] [Profile]
Height: 64px
Fixed bottom 0
5 items equal flex
FAB: 56x56px elevated circle (Chinese Red)
```

**Cart Badge:** Top-right of cart icon, 18x18px circle

### Tablet (md: 768-1023px)

**Header:**
```
Height: 64px
Layout: [Logo Left] [Nav Menu Center] [Cart + Avatar Right]
Nav visible (no hamburger)
No bottom navigation
```

### Desktop (lg+: 1024px+)

**Header:**
```
Height: 64px
Layout: [Logo Left] [Nav Menu Center] [Search + Cart + Avatar Right]
Search: visible in header (not icon-only)
```

---

## 3. GRID RESPONSIVE

### Beranda Grid

**Mobile (xs):** 1 column
```
┌──────────┐
│ Unggulan │ (2x height, full width)
├──────────┤
│ Produk 1 │
├──────────┤
│ Produk 2 │
└──────────┘
```

**Mobile landscape (sm):** 2 columns
```
┌──────────┬──────────┐
│ Unggulan │          │ (2x height, span 2 cols)
│          │          │
│          ├──────────┤
│          │ Produk 2 │
├──────────┼──────────┤
│ Produk 3 │ Produk 4 │
└──────────┴──────────┘
```

Wait, simpler: unggulan span 2 cols AND 2 rows on sm.
```
┌─────────────┬──────────┐
│             │ Produk 2 │
│  Unggulan   ├──────────┤
│ (span 2x2)  │ Produk 3 │
│             ├──────────┤
│             │ Produk 4 │
├─────────────┴──────────┤
│ Produk 5   │ Produk 6 │
└────────────┴──────────┘
```

**Tablet (md):** 3 columns
```
┌────────┬────────┬────────┐
│        │        │ P2     │
│Unggulan│        ├────────┤
│(2x2)   │        │ P3     │
│        │        ├────────┤
│        │        │ P4     │
├────────┼────────┴────────┤
│ P5     │ P6     │ P7     │
└────────┴────────┴────────┘
```

**Desktop (lg):** 4 columns
```
┌──────┬──────┬──────┬──────┐
│      │ P2   │ P3   │ P4   │
│Ungg. │──────┼──────┼──────│
│(2x2) │ P5   │ P6   │ P7   │
│      │──────┼──────┼──────│
│      │ P8   │ P9   │ P10  │
└──────┴──────┴──────┴──────┘
```

**Desktop large (xl):** 4 columns, max-width 1280px container

---

### Katalog Grid

No unggulan in katalog (all regular cards).

| Breakpoint | Columns |
|------------|---------|
| xs (mobile) | 1 (portrait) or 2 (landscape) |
| sm | 2 |
| md (tablet) | 3 |
| lg (desktop) | 4 |
| xl | 4 (max-width container) |

**Filter Sidebar:**
- Desktop (lg+): sidebar left, 256px width
- Tablet/Mobile: bottom sheet (swipe up) or drawer

---

## 4. DETAIL PRODUK RESPONSIVE

### Desktop (lg+: 1024px+)

```
┌────────────────────┬──────────────────────┐
│                    │                      │
│  Image Gallery     │  Product Info        │
│  (60% width)       │  (40% width, sticky)  │
│                    │                      │
│  [Main Image]      │  Nama Produk         │
│  [Thumb1] [Thumb2] │  Rp 285.000          │
│                    │  Varian: [Hitam]     │
│                    │  Qty: [- 1 +]        │
│                    │  [Keranjang] [Beli]  │
│                    │                      │
├────────────────────┴──────────────────────┤
│  Deskripsi Produk                         │
│  Terkait: [P1] [P2] [P3] [P4] →           │
└───────────────────────────────────────────┘
```

### Mobile (xs-sm: 0-767px)

```
┌──────────────────┐
│ [Main Image]     │ (swipeable gallery)
│        ● ○ ○     │ (dot indicators)
├──────────────────┤
│ Nama Produk      │
│ Rp 285.000       │
│ Varian: [Hitam]  │
│ Qty: [- 1 +]     │
├──────────────────┤
│ Deskripsi        │
│ (expandable)     │
├──────────────────┤
│ Terkait          │
│ (horizontal scroll)│
├──────────────────┤
│ [Keranjang] [Beli]│ (fixed bottom, sticky)
└──────────────────┘
```

**Sticky CTA bar mobile:** Bottom fixed, 2 buttons side-by-side, above bottom nav.

---

## 5. CHECKOUT RESPONSIVE

### Desktop (lg+)

```
┌────────────────┬──────────────┐
│                │              │
│ Step 1: Alamat │ Order Summary│
│ Step 2: Kurir  │ (sticky)     │
│ Step 3: Confirm│              │
│                │ Total: ...   │
│ [Back] [Next]  │ [Bayar]      │
└────────────────┴──────────────┘
```

### Mobile

```
┌──────────────────┐
│ Step 1            │
│ Step 2            │ (stacked, 1 per screen)
│ Step 3            │
├──────────────────┤
│ Summary (collapsed)│
│ Total: Rp 350.000│
│ [Bayar Sekarang] │ (fixed bottom)
└──────────────────┘
```

- Each step full screen
- Progress indicator at top
- Summary accessible via expandable section
- CTA button fixed at bottom

---

## 6. ADMIN RESPONSIVE

### Desktop (lg+: 1024px+)

```
┌─────────┬────────────────────────┐
│ Sidebar │ Header                  │
│ (240px) ├────────────────────────┤
│         │ Content                 │
│         │ (table, form, etc.)    │
└─────────┴────────────────────────┘
```

### Tablet (md: 768-1023px)

- Sidebar: collapsible (default collapsed, 64px icon-only)
- Tap icon: expand to 240px overlay
- Content: full width

### Mobile (xs-sm: 0-767px)

- Sidebar: hidden (hamburger menu)
- Header: hamburger + page title + avatar
- Tables: horizontal scroll OR card layout
- Forms: single column

---

## 7. TABLE RESPONSIVE

### Desktop

Standard table layout:
```
| Kolom 1 | Kolom 2 | Kolom 3 | Aksi |
|---------|---------|---------|------|
| Data    | Data    | Data    | ⋯   |
```

### Mobile

**Option A: Card layout (preferred for admin)**
```
┌──────────────────┐
│ Title: Data 1    │
│ Kolom 2: Data 2  │
│ Kolom 3: Data 3  │
│            [⋯]  │
└──────────────────┘
```

**Option B: Horizontal scroll (for dense data)**
```
← [Table with min-width 800px] →
```

---

## 8. FORM RESPONSIVE

### Desktop

- Labels: left-aligned, inline with input
- 2-column layout for short fields (nama + noWa)
- 1-column for long fields (alamat, deskripsi)

### Mobile

- Labels: top-aligned, above input
- All fields single column
- Inputs: full width
- Submit button: full width, fixed bottom or inline

---

## 9. IMAGE RESPONSIVE

### Product Images

| Context | Max Width | Aspect Ratio | Format |
|---------|-----------|--------------|--------|
| Grid card | 400x400 | 1:1 | WebP |
| Detail main | 800x800 | 1:1 | WebP |
| Thumbnail | 120x120 | 1:1 | WebP |
| Cart item | 80x80 | 1:1 | WebP |

**Loading:**
- Lazy load below fold
- Placeholder: skeleton shimmer
- `srcset` for responsive sizes

```html
<img
  src="/produk-400.webp"
  srcset="/produk-400.webp 400w, /produk-800.webp 800w"
  sizes="(max-width: 768px) 100vw, 400px"
  alt="Tas Backpack Premium"
  loading="lazy"
/>
```

---

## 10. TYPOGRAPHY RESPONSIVE

### Fluid Typography (clamp)

```css
h1 {
  font-size: clamp(32px, 5vw, 48px);
  line-height: clamp(40px, 6vw, 56px);
}
h2 {
  font-size: clamp(24px, 4vw, 32px);
  line-height: clamp(32px, 5vw, 40px);
}
h3 {
  font-size: clamp(20px, 3vw, 24px);
  line-height: clamp(28px, 4vw, 32px);
}
```

### Body Text

- Mobile: 16px (no scaling down — readability)
- Desktop: 16px (same, consistent)
- Small text: 14px (mobile), 14px (desktop)

**Rule:** Body text tidak pernah di bawah 14px (accessibility).

---

## 11. SPACING RESPONSIVE

| Token | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| Container H | 16px | 20px | 24px |
| Section gap | 32px | 40px | 48px |
| Grid gap | 16px | 20px | 24px |
| Card padding | 16px | 20px | 24px |

---

## 12. MODAL RESPONSIVE

### Desktop

- Width: 480px (max)
- Centered (horizontal + vertical)
- Backdrop blur

### Mobile

- Width: 90vw (max 480px)
- Bottom sheet style (slide from bottom)
- Swipe down to close

```
┌──────────────────┐
│      ━━━          │ (drag handle)
│                  │
│  Modal Content   │
│                  │
│  [Batal] [OK]    │
└──────────────────┘
```

---

## 13. RESPONSIVE CHECKLIST

### Per Page

- [ ] Mobile layout defined (xs)
- [ ] Tablet layout defined (md)
- [ ] Desktop layout defined (lg)
- [ ] Touch targets min 44x44px (mobile)
- [ ] No horizontal scroll (mobile)
- [ ] Images responsive (srcset, lazy load)
- [ ] Typography fluid (clamp) or breakpoint-based
- [ ] Grid adjusts columns per breakpoint
- [ ] Navigation adapts (hamburger → top nav)
- [ ] Bottom nav (mobile) or top nav (desktop)
- [ ] Forms stack vertically (mobile)
- [ ] Tables transform (card layout or scroll)
- [ ] Modal adapts (bottom sheet mobile)
- [ ] Sticky CTA bar (mobile, above bottom nav)
