---
title: "Screen 03: Detail Produk"
tags: [screen, customer, revenue]
tanggal: 2026-09-21
---
# Screen 03: Detail Produk

## Tujuan
Customer lihat detail produk, pilih varian, tentukan qty, add to cart atau beli langsung. **Ini adalah momen "berani" satu-satunya** yang boleh ada animasi transisi.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│  Home / Katalog / Tas / Tas Backpack Premium  (breadcrumb)   │
│                                                                │
│  ┌──────────────────────────┐  ┌──────────────────────────┐ │
│  │                          │  │ Tas Backpack Premium      │ │
│  │                          │  │                            │ │
│  │    MAIN IMAGE            │  │ Rp 282.000                │ │
│  │    (1:1, large)          │  │                            │ │
│  │                          │  │ [Ready Stock]              │ │
│  │                          │  │ Stok: 15 biji              │ │
│  ├──────────────────────────┤  │                            │ │
│  │ [thumb1] [thumb2] [thumb3]│  │ Varian:                   │ │
│  └──────────────────────────┘  │ (○) Hitam (stok 10)       │ │
│                                │ (○) Coklat (stok 5)       │ │
│                                │                            │ │
│                                │ Jumlah:                   │ │
│                                │ [- 1 +]                    │ │
│                                │                            │ │
│                                │ Subtotal: Rp 282.000       │ │
│                                │                            │ │
│                                │ [+ Tambah ke Keranjang]    │ │
│                                │ [Beli Langsung]            │ │
│                                │                            │ │
│                                │ Estimasi sampai: 7-14 hari │ │
│                                │ Berat: 800g                │ │
│                                └──────────────────────────┘ │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│  Deskripsi Produk                                             │
│  Tas backpack bahan kulit sintetis premium. Kapasitas 20L,   │
│  cocok buat laptop 15 inch. Resisten air, strap kuat...     │
├───────────────────────────────────────────────────────────────┤
│  Produk Terkait                                              │
│  [P1] [P2] [P3] [P4] [P5] →   (horizontal scroll)            │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]                  [♡] [🛒]│
├──────────────────────────┤
│                            │
│   ┌──────────────────────┐ │
│   │                      │ │
│   │   MAIN IMAGE         │ │ (swipeable gallery)
│   │   (1:1, full width)  │ │
│   │                      │ │
│   │         ● ○ ○        │ │ (dot indicators)
│   └──────────────────────┘ │
│                            │
│  Tas Backpack Premium      │ ← H1
│  Rp 282.000                │ ← price (gold)
│                            │
│  [Ready Stock]  Stok: 15   │
│                            │
│  Varian:                   │
│  (○) Hitam (stok 10)       │
│  (○) Coklat (stok 5)       │
│                            │
│  Jumlah: [- 1 +]           │
│                            │
│  Deskripsi                 │
│  Tas backpack bahan kulit  │
│  sintetis premium...       │
│  [Lihat Selengkapnya ▼]    │ (expandable)
│                            │
│  Produk Terkait            │
│  [P1] [P2] [P3] [P4] →     │ (horizontal scroll)
│                            │
├──────────────────────────┤
│[+ Keranjang] [Beli Langsung]│ ← sticky CTA bar
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│ ← bottom nav (hidden if CTA bar)
└──────────────────────────┘
```

---

## Sections

### Section 1: Breadcrumb (Desktop only)
- **Purpose:** Navigation context
- **Content:** Home / Katalog / [Kategori] / [Nama Produk]
- **Layout:** Top, margin 16px 24px
- **Mobile:** Hidden (back button sufficient)

### Section 2: Image Gallery
- **Purpose:** Show product images, allow zoom/switch
- **Layout (Desktop):** Left column, 60% width
- **Layout (Mobile):** Full width, swipeable
- **Components:**
  - Main image: 1:1 aspect ratio, object-cover, radius 12px top
  - Thumbnail strip (desktop): below main, horizontal, 4-5 thumbnails
  - Dot indicators (mobile): below main, center
- **Interaction:**
  - Thumbnail click → main image change (fade 200ms)
  - Swipe (mobile) → next/prev image (300ms ease-out)
  - Pinch zoom (optional)
- **State:**
  - Active thumbnail: border 2px #C8102E
  - Inactive: border 1px #E8DCC8

### Section 3: Product Info (Sticky Desktop)
- **Purpose:** Buying decision info + actions
- **Layout (Desktop):** Right column, 40% width, position sticky top 80px
- **Content:**
  - **Nama Produk:** H1 (Noto Serif SC 700, 32px desktop / 24px mobile)
  - **Harga:** Rp 282.000 (Noto Serif SC 700, 28px, gold #D4AF37)
  - **Badge:** "Ready Stock" (gold bg, white text)
  - **Stok:** "Stok: 15 biji" (Inter 400, 14px, #6B5D52)
  - **Varian:** Radio group (Hitam, Coklat), with stok per varian
  - **Qty:** Stepper (- 1 +)
  - **Subtotal:** Calculated (harga × qty)
  - **CTA:** "Tambah ke Keranjang" (secondary) + "Beli Langsung" (primary)
  - **Meta:** Estimasi sampai (7-14 hari), Berat (800g)

### Section 4: Deskripsi
- **Purpose:** Detailed product info
- **Layout:** Full width, margin top 48px
- **Content:** Text paragraph, bullet specs
- **Mobile:** Expandable ("Lihat Selengkapnya" → expand, "Sembunyikan" → collapse)
- **Desktop:** Always expanded

### Section 5: Produk Terkait
- **Purpose:** Cross-sell, keep user engaged
- **Layout:** Horizontal scroll, margin top 48px
- **Content:** 5-10 produk from same kategori
- **Components:** Card Produk (Regular, compact size)
- **Mobile:** Horizontal scroll, snap, 140px width per card

### Section 6: Sticky CTA Bar (Mobile)
- **Purpose:** Always-accessible buy actions
- **Layout:** Fixed bottom, 64px height + safe area
- **Content:** "Tambah ke Keranjang" (secondary, flex-1) + "Beli Langsung" (primary, flex-1)
- **Behavior:** Replaces bottom nav on this page (hide bottom nav, show CTA bar)
- **Background:** #FFFFFF, border-top 1px #E8DCC8, shadow 0 -2px 8px rgba(0,0,0,0.08)

---

## States

### Loading State
- Image: skeleton shimmer (1:1 box)
- Info: skeleton lines (title, price, buttons)
- Use the "berani" transition: fade-in real content (400ms)

### Error State (Product Not Found)
- 404 page: "Produk nggak ketemu" (H1)
- "Mungkin udah dihapus atau stoknya habis." (description)
- CTA: "Kembali ke Katalog"

### Varian Not Selected
- "Beli Langsung" button disabled
- Tooltip: "Pilih varian dulu ya"
- Radio group: border 1px #9B4D50 (subtle error indicator)

### Stok Habis
- Harga: strikethrough
- Badge: "Stok Habis" (grey)
- Buttons: disabled, opacity 50%
- Text: "Produk lagi kosong. Coba lain kali."

---

## Interactions

### THE "Berani" Moment: Page Transition

**Trigger:** User clicks card produk (from beranda/katalog) → navigate to detail

**Animation:**
1. Card image slightly scale (1.0 → 1.02, 200ms ease-out)
2. Page fade-out (200ms)
3. New page load: detail image fade-in + slight scale (0.98 → 1.0, 400ms ease-out)
4. Content below: subtle slide-up (8px, 300ms, staggered 50ms)

**This is the ONLY allowed scroll/page animation.**

### Varian Selection
- Radio click → update selected state (instant)
- Stok label update per varian (instant)
- Subtotal recalculate if qty > 1 (instant)

### Qty Stepper
- Button press: scale(0.95) snap, release scale(1.0) (100ms)
- Number change: instant
- Max: stok limit (button disabled if reached)
- Min: 1 (minus disabled if qty = 1)

### Add to Cart
- Button click → API call
- Loading: spinner replace text (200ms min display)
- Success: toast "Tas Backpack Premium masuk keranjang" (5s)
- Cart badge count +1 (animate: scale 1.0 → 1.2 → 1.0, 300ms)

### Beli Langsung
- Button click → if varian not selected, show tooltip
- If selected → navigate to `/checkout?produk=[id]&varian=[id]&qty=[qty]` (skip cart)

---

## Edge Cases

### Multiple Varian (5+)
- Desktop: radio group vertical, scroll if > 5 (max height 200px)
- Mobile: same, scrollable

### No Varian
- Hide varian section
- Direct qty selection + CTA

### Harga Berubah (Snapshot)
- Harga displayed: current product price
- Note: "Harga final dihitung saat checkout" (helper text, 12px)

### Deskripsi Panjang
- Desktop: full text, max width 720px
- Mobile: expandable, max 3 lines collapsed

### Gambar Hanya 1
- Hide thumbnail strip (desktop) / dot indicators (mobile)

---

## WHAT NOT TO DO

1. ❌ NO "→" in CTA buttons
2. ❌ NO "OUR PRODUCTS" / "PRODUK TERKAIT" label ALL-CAPS
3. ❌ NO modal for varian selection (inline radio group)
4. ❌ NO image carousel auto-rotate
5. ❌ NO "Customers also bought" popup/modal
6. ❌ NO countdown timer "Flash Sale ends in 02:34:56"
7. ❌ NO review/rating section (MVP scope, backlog)
8. ❌ NO "Add to Wishlist" as primary button (it's secondary, icon only)

---

## Copy

### Page Title (H1)
```
[Nama Produk]
Example: Tas Backpack Premium Kulit Sintetis
```

### Price
```
Rp 282.000
```

### Badge
```
Ready Stock
```

### Varian
```
Varian:
(○) Hitam (stok 10)
(○) Coklat (stok 5)
```

### CTA Buttons
```
Tambah ke Keranjang
Beli Langsung
```

### Meta
```
Estimasi sampai: 7-14 hari setelah verifikasi
Berat: 800g
```

### Deskripsi (Expandable Mobile)
```
[Lihat Selengkapnya ▼]
[Sembunyikan ▲]
```

### Stok Habis
```
Stok Habis
Produk lagi kosong. Coba lain kali.
```

### Terkait
```
Produk Terkait
```

### Toast (Add to Cart Success)
```
{namaProduk} masuk keranjang
```

### Varian Not Selected Tooltip
```
Pilih varian dulu ya
```
