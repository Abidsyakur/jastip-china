---
title: "Screen 02: Katalog (Catalog Page)"
tags: [screen, customer, revenue]
tanggal: 2026-09-21
---
# Screen 02: Katalog (Catalog Page)

## Tujuan
Customer browse produk dengan filter kategori, sort, dan pagination. Grid seragam (no unggulan).

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────┐  ┌──────────────────────────────────────────┐ │
│  │          │  │ Sort: [Terbaru ▼]     View: [▦]            │ │
│  │  FILTER  │  ├──────────────────────────────────────────┤ │
│  │          │  │                                              │ │
│  │ Kategori │  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐             │ │
│  │ ☐ Tas    │  │  │ P1 │ │ P2 │ │ P3 │ │ P4 │             │ │
│  │ ☐ Sepatu │  │  └────┘ └────┘ └────┘ └────┘             │ │
│  │ ☐ Akses  │  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐             │ │
│  │          │  │  │ P5 │ │ P6 │ │ P7 │ │ P8 │             │ │
│  │ Harga    │  │  └────┘ └────┘ └────┘ └────┘             │ │
│  │ [slider] │  │                                              │ │
│  │          │  │  [← Prev]  1 2 3  [Next →]                │ │
│  │ Stok     │  │                                              │ │
│  │ ☐ Ready │  │                                              │ │
│  └──────────┘  └──────────────────────────────────────────┘ │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Katalog       [Filter] │
├──────────────────────────┤
│ [Sort: Terbaru ▼]          │
├──────────────────────────┤
│                            │
│ ┌─────────┐  ┌─────────┐ │
│ │   P1    │  │   P2    │ │
│ └─────────┘  └─────────┘ │
│ ┌─────────┐  ┌─────────┐ │
│ │   P3    │  │   P4    │ │
│ └─────────┘  └─────────┘ │
│                            │
│ [Load Lainnya]            │
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘

(Bottom Sheet Filter saat tombol Filter ditekan):
┌──────────────────────────┐
│  ━━━ (drag handle)        │
│                      [X]  │
│  Filter                   │
│                           │
│  Kategori                 │
│  ☐ Tas  ☐ Sepatu          │
│  ☐ Aksesoris              │
│                           │
│  Rentang Harga            │
│  [slider]                 │
│                           │
│  Status Stok              │
│  ☐ Ready Stock only      │
│                           │
│  [Reset]      [Terapkan]  │
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- **Same as Beranda**, but "Katalog" menu is active
- Mobile: back button (←) replaces hamburger, title "Katalog" center

### Section 2: Filter Sidebar (Desktop)
- **Purpose:** Filter produk by kategori, harga, stok
- **Layout:** Left sidebar, 256px width, sticky
- **Content:**
  - **Kategori:** Checkbox list (Tas, Sepatu, Aksesoris, Elektronik, Fashion)
  - **Harga:** Range slider (min-max, Rp 30.000 - Rp 300.000)
  - **Stok:** Checkbox "Ready Stock only"
- **Components:** Checkbox, Range Slider (custom)
- **Behavior:**
  - Filter change → update URL query → fetch new data (replace, not append)
  - Active filter count badge on mobile "Filter" button

### Section 2 (Mobile): Filter Bottom Sheet
- **Trigger:** "Filter" button in header right (with badge count)
- **Layout:** Bottom sheet (from mobile-patterns.md)
- **Content:** Same as desktop sidebar, stacked vertical
- **Close:** Swipe down, X button, or "Terapkan" button

### Section 3: Sort & View Toolbar
- **Purpose:** Sort results, toggle grid view
- **Layout:** Horizontal bar, 48px height, border-bottom 1px #E8DCC8
- **Content:**
  - Left: Sort dropdown (Terbaru, Harga Terendah, Harga Tertinggi, Popularitas)
  - Right (desktop): View toggle (grid 4-col / list)
  - Right (mobile): View toggle (2-col / 1-col)
- **Behavior:** Sort change → update URL query → fetch new data

### Section 4: Grid Produk
- **Layout (Desktop):** 4 columns, gap 24px
- **Layout (Tablet):** 3 columns, gap 20px
- **Layout (Mobile portrait):** 2 columns, gap 16px
- **Layout (Mobile landscape):** 2-3 columns
- **Components:** Card Produk (Regular only, NO unggulan)
- **Spacing:** Margin top 16px (from toolbar)

### Section 5: Pagination (Desktop)
- **Layout:** Center, margin top 48px
- **Content:** Prev/Next buttons + page numbers
- **Style:**
  - Button: 40x40px, border 1px #E8DCC8, radius 8px
  - Active: background #C8102E, text white
  - Disabled: opacity 50%
- **Behavior:** Click page → update URL `?page=X` → fetch + scroll to top

### Section 5 (Mobile): Load More
- **Layout:** Center, margin top 32px
- **Content:** "Muat Lainnya" button (secondary, full width)
- **Behavior:** Click → append new products to grid (infinite scroll alternative)

### Section 6: Footer
- Same as Beranda

---

## States

### Loading State (Initial)
- Show 8-12 skeleton cards in grid
- Toolbar rendered (but sort/view disabled)
- Filter sidebar rendered (but inputs disabled)

### Loading State (Filter/Sort Change)
- Show skeleton only in grid area (not full page)
- Keep current filter/sidebar visible
- Overlay subtle opacity 0.6 on grid

### Empty State (No Results)
- Title: "Nggak ketemu produknya" (Noto Serif SC 500, 20px)
- Description: "Coba kata kunci lain, atau cek kategori." (Inter 400, 14px)
- CTA: "Reset Filter" button (secondary)
- Illustration: simple line icon (magnifying glass with X)

### Error State
- Same as Beranda error state, but in grid area

---

## Interactions

### Filter Change
- Checkbox toggle → update URL query → fetch new data
- No debounce needed (user action explicit)
- Show loading state in grid area only

### Sort Change
- Dropdown select → update URL query → fetch new data
- Preserve current filters in URL

### Pagination
- Click page → scroll to top of grid smoothly → fetch new data
- URL: `/katalog?page=2&kategori=Tas&sort=price-asc`

### URL Synchronization
- All filter/sort/page state in URL (shareable, back-button friendly)
- Parse URL on mount → initialize filter state

---

## Edge Cases

### Banyak Produk (>100)
- Desktop: pagination (12 per page)
- Mobile: load more + lazy load images
- Max page buttons shown: 5 (current ± 2)

### Filter Kombinasi Tidak Ada Hasil
- Show empty state
- Suggest: "Coba hapus salah satu filter"

### Harga Range Invalid (min > max)
- Auto-swap values
- Or disable "Terapkan" button

---

## WHAT NOT TO DO

1. ❌ NO unggulan card in katalog (all regular, uniform grid)
2. ❌ NO "OUR PRODUCTS" / "KATALOG KAMI" label ALL-CAPS
3. ❌ NO "→" in pagination buttons
4. ❌ NO modal for filter (use bottom sheet on mobile, sidebar on desktop)
5. ❌ NO infinite scroll without "Load More" fallback (accessibility)
6. ❌ NO fade-in animation on every new card load
7. ❌ NO separate "Search" page (search integrated in katalog)

---

## Copy

### Page Title (H1)
```
Katalog
```

### Sort Options
```
Terbaru
Harga Terendah
Harga Tertinggi
Popularitas
```

### Filter Labels
```
Kategori
Rentang Harga
Status Stok
Ready Stock only
```

### Empty State
```
Nggak ketemu produknya
Coba kata kunci lain, atau cek kategori.
[Reset Filter]
```

### Pagination
```
Sebelumnya
Selanjutnya
Halaman {X} dari {Y}
```

### Load More (Mobile)
```
Muat Lainnya
```
