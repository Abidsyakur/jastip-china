---
title: "Screen 01: Beranda (Homepage)"
tags: [screen, customer, revenue]
tanggal: 2026-09-21
---
# Screen 01: Beranda (Homepage)

## Tujuan
Menampilkan grid produk sebagai elemen utama (BUKAN SaaS landing page). Customer langsung lihat produk yang dijual, bisa add to cart, atau explore kategori.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────┐  ┌──────────┐  ┌──────────┐            │
│  │                  │  │          │  │          │            │
│  │                  │  │ Produk 2 │  │ Produk 3 │            │
│  │  PRODUK UNGGULAN │  │          │  │          │            │
│  │  (2x2 size)      │  └──────────┘  └──────────┘            │
│  │                  │  ┌──────────┐  ┌──────────┐            │
│  │  Rp 282.000      │  │          │  │          │            │
│  │  [Ready Stock]   │  │ Produk 4 │  │ Produk 5 │            │
│  └──────────────────┘  │          │  │          │            │
│                         └──────────┘  └──────────┘            │
│                                                                │
│  ──── cloud pattern border (5% opacity) ────                 │
│                                                                │
│  Kategori: [Tas] [Sepatu] [Aksesoris] [Elektronik] [Fashion]│
│                                                                │
└───────────────────────────────────────────────────────────────┘
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [☰]    [Jastip China] [🛒]│
├──────────────────────────┤
│                            │
│  鲜货直达                  │ ← brush script tagline
│  Barang China, sampai     │
│  pintu rumah               │
│                            │
│  ┌──────────────────────┐ │
│  │                      │ │
│  │   PRODUK UNGGULAN    │ │ ← full width, 2x height
│  │   (full width, 2x)   │ │
│  │                      │ │
│  │   Rp 282.000         │ │
│  │   [Ready Stock]      │ │
│  └──────────────────────┘ │
│                            │
│  ┌──────────────────────┐ │
│  │ Produk 2              │ │
│  └──────────────────────┘ │
│  ┌──────────────────────┐ │
│  │ Produk 3              │ │
│  └──────────────────────┘ │
│                            │
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│ ← bottom nav
└──────────────────────────┘
```

---

## Sections

### Section 1: Header (Navigation Bar)

- **Purpose:** Brand identity + primary navigation + quick actions
- **Content:**
  - Logo: "Jastip China" (Noto Serif SC 700, 24px, Chinese Red)
  - Menu: Beranda (active), Katalog, Cara Order, Lacak Pesanan
  - Actions: Search icon, Cart icon (with badge count), Avatar/Login
- **Components:** Navigation Bar (Desktop) from components.md
- **Spacing:** Height 64px, padding 0 24px
- **Responsive:** Mobile → hamburger left, logo center, cart right
- **State:**
  - Logged out: "Login" text link (Chinese Red)
  - Logged in: Avatar circle 36x36px + dropdown
  - Cart badge: show if count > 0

### Section 2: Hero Banner (Minimal, NOT SaaS)

- **Purpose:** Brand tagline + set Chinese aesthetic tone (BUKAN marketing CTA)
- **Content:**
  - Tagline Chinese: "鲜货直达" (Ma Shan Zheng, 32px, Chinese Red)
  - Tagline ID: "Barang China, sampai pintu rumah" (Inter 400, 16px, #6B5D52)
- **Layout:** Center-left aligned, padding 48px 24px 32px
- **Background:** Plain #FAF8F3 (NO gradient, NO decorative image)
- **Mobile:** Same, padding 32px 16px 24px
- **ANTI-PATTERN:** NO "BELANJA SEKARANG" button, NO hero image, NO gradient

### Section 3: Grid Produk Utama

- **Purpose:** Show products immediately (e-commerce focus)
- **Content:** 6-8 produk (1-2 unggulan, 5-6 regular)
- **Data:** Produk unggulan = stok > 10 + harga menarik, diurutkan by popularity
- **Components:** Card Produk (Regular + Unggulan) from components.md
- **Layout (Desktop, 4 col):**
  ```
  Grid: CSS Grid, grid-template-columns: repeat(4, 1fr)
  Unggulan: grid-column: span 2, grid-row: span 2
  Gap: 24px
  ```
- **Layout (Tablet, 3 col):**
  ```
  grid-template-columns: repeat(3, 1fr)
  Unggulan: span 2, span 2
  Gap: 20px
  ```
- **Layout (Mobile, 1 col):**
  ```
  grid-template-columns: 1fr
  Unggulan: span 1 (full width), tetap 2x height
  Gap: 16px
  ```
- **Spacing:** Margin top 0 (directly after hero), margin bottom 48px

### Section 4: Cloud Pattern Divider

- **Purpose:** Subtle Chinese decorative element (separator)
- **Content:** SVG cloud pattern (祥云), opacity 5%, Chinese Red or Gold
- **Layout:** Full width, height 20px, margin 0
- **Mobile:** Same, height 16px
- **ANTI-PATTERN:** NO busy pattern, NO large decorative image

### Section 5: Kategori Quick Access

- **Purpose:** Quick filter by category
- **Content:** 5 buttons (Tas, Sepatu, Aksesoris, Elektronik, Fashion)
- **Layout (Desktop):** Horizontal row, center, 12px gap
- **Layout (Mobile):** Horizontal scroll, snap, 8px gap
- **Component:** Ghost button variant, padding 8px 16px
- **Behavior:** Click → navigate to `/katalog?kategori=[nama]`
- **Active state:** Background rgba(200,16,46,0.1), text Chinese Red

### Section 6: Footer

- **Purpose:** Brand info, navigation, contact
- **Content:** 4 columns (Logo+Desc, Navigasi, Bantuan, Kontak)
- **Background:** #2C1810 (ink dark)
- **Text color:** #FAF8F3 (cream)
- **Top border:** Cloud pattern (5% opacity, Gold)
- **Mobile:** Stack vertical, padding 32px 16px + 64px bottom (space for bottom nav)

---

## States

### Loading State
- Show 6-8 skeleton card loaders (shimmer animation)
- Unggulan skeleton: 2x size, same shimmer
- Header + footer rendered normally
- Duration: max 2 seconds (skeleton → real content fade 200ms)

### Error State
- Title: "Gagal memuat produk" (Noto Serif SC 500, 24px)
- Description: "Server lagi bermasalah. Coba refresh atau hubungi admin via WA." (Inter 400, 14px)
- CTA: "Coba Lagi" button (primary)
- Illustration: simple line icon (cloud with X)

### Empty State (No Products)
- Title: "Katalog masih kosong" (Noto Serif SC 500, 20px)
- Description: "Produk lagi disiapin. Coba cek lagi nanti ya." (Inter 400, 14px)
- No CTA (just wait)

---

## Interactions

### Card Produk Click
- Click anywhere on card → navigate to `/produk/[id]`
- Cursor: pointer
- Hover: border #C8102E, shadow subtle (200ms ease-out)
- NO scale transform

### Kategori Button Click
- Click → navigate to `/katalog?kategori=Tas`
- Active state: background rgba(200,16,46,0.1)

### Cart Icon Click
- Click → navigate to `/keranjang`
- Badge count: from API, update via Context

### Search Icon Click
- Desktop: expand search bar inline (width 0 → 240px, 300ms)
- Mobile: navigate to `/katalog` with search focus

---

## Edge Cases

### Nama Produk Panjang
- Max 2 lines, ellipsis "..." if overflow
- CSS: `line-clamp: 2`
- Example: "Tas Backpack Premium Kulit Sintetis Anti Air..." (truncated)

### Harga Jutaan
- Format: "Rp 1.250.000" (dot separator)
- Font: Noto Serif SC 700, 20px (regular) / 28px (unggulan)
- Color: Gold #D4AF37 (large) / #B5941F (small, for AA contrast)

### Stok Rendah
- Badge: "Stok Terbatas" if stok < 5
- Badge color: Chinese Red (urgent)
- Text: "Sisa 3 biji" below price (Inter 400, 12px, #9B4D50)

### Stok Habis
- Card opacity: 60%
- Badge: "Stok Habis" (grey background #6B5D52)
- No add to cart button (or disabled)
- Hover: no shadow, cursor: not-allowed

### Gambar Produk Hilang
- Fallback: placeholder image (simple line icon, bag shape)
- Background: #F7F3EC
- Text: "Gambar tidak tersedia" (12px, #6B5D52)

---

## WHAT NOT TO DO (Anti-Patterns for Beranda)

1. ❌ NO hero banner besar dengan "BELANJA PRODUK CHINA" + gradient + CTA button
2. ❌ NO "OUR PRODUCTS" / "PRODUK KAMI" label ALL-CAPS di atas grid
3. ❌ NO "→" di tombol "Lihat Semua Produk"
4. ❌ NO grid seragam semua card ukuran sama
5. ❌ NO shadow di setiap card default (border only, shadow on hover)
6. ❌ NO "Trusted by" logo strip
7. ❌ NO feature cards with icons (Cepat, Aman, Murah)
8. ❌ NO counter animation on numbers
9. ❌ NO fade-in-up on scroll for grid section
10. ❌ NO "01/02/03" decorative numbers

---

## Copy (Realistic Content)

### Tagline
```
鲜货直达
Barang China, sampai pintu rumah
```

### Kategori Buttons
```
Tas
Sepatu
Aksesoris
Elektronik
Fashion
```

### Footer
```
Logo: Jastip China
Tagline: Jastip China - jasa titip barang China terpercaya. Barang asli, harga bersahabat, sampai depan pintu rumah.

Navigasi:
- Beranda
- Katalog
- Cara Order
- Lacak Pesanan
- Ajukan PO

Bantuan:
- FAQ
- Kebijakan Privasi
- Syarat & Ketentuan
- Kebijakan Refund

Kontak:
- WhatsApp: 0812-0000-0000
- Email: hello@jastipchina.id
- Jam: Senin-Sabtu, 09:00-18:00 WIB

Copyright: © 2024 Jastip China. All rights reserved.
```
