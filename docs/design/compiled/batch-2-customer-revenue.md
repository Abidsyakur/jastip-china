---
title: "BATCH 2: CUSTOMER REVENUE"
tags: [compiled, pen-dev]
tanggal: 2026-09-21
---
# BATCH 2: CUSTOMER REVENUE

Gabungan 9 file customer revenue screens untuk pen.dev

---



========================================
# FILE: 01-beranda.md
========================================

# Screen 01: Beranda (Homepage)

## Tujuan
Menampilkan grid produk sebagai elemen utama (BUKAN SaaS landing page). Customer langsung lihat produk yang dijual, bisa add to cart, atau explore kategori.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”            â”‚
â”‚  â”‚                  â”‚  â”‚          â”‚  â”‚          â”‚            â”‚
â”‚  â”‚                  â”‚  â”‚ Produk 2 â”‚  â”‚ Produk 3 â”‚            â”‚
â”‚  â”‚  PRODUK UNGGULAN â”‚  â”‚          â”‚  â”‚          â”‚            â”‚
â”‚  â”‚  (2x2 size)      â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜            â”‚
â”‚  â”‚                  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”            â”‚
â”‚  â”‚  Rp 282.000      â”‚  â”‚          â”‚  â”‚          â”‚            â”‚
â”‚  â”‚  [Ready Stock]   â”‚  â”‚ Produk 4 â”‚  â”‚ Produk 5 â”‚            â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚          â”‚  â”‚          â”‚            â”‚
â”‚                         â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜            â”‚
â”‚                                                                â”‚
â”‚  â”€â”€â”€â”€ cloud pattern border (5% opacity) â”€â”€â”€â”€                 â”‚
â”‚                                                                â”‚
â”‚  Kategori: [Tas] [Sepatu] [Aksesoris] [Elektronik] [Fashion]â”‚
â”‚                                                                â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]    [Jastip China] [ðŸ›’]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚  é²œè´§ç›´è¾¾                  â”‚ â† brush script tagline
â”‚  Barang China, sampai     â”‚
â”‚  pintu rumah               â”‚
â”‚                            â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                      â”‚ â”‚
â”‚  â”‚   PRODUK UNGGULAN    â”‚ â”‚ â† full width, 2x height
â”‚  â”‚   (full width, 2x)   â”‚ â”‚
â”‚  â”‚                      â”‚ â”‚
â”‚  â”‚   Rp 282.000         â”‚ â”‚
â”‚  â”‚   [Ready Stock]      â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ Produk 2              â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ Produk 3              â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚ â† bottom nav
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
- **Responsive:** Mobile â†’ hamburger left, logo center, cart right
- **State:**
  - Logged out: "Login" text link (Chinese Red)
  - Logged in: Avatar circle 36x36px + dropdown
  - Cart badge: show if count > 0

### Section 2: Hero Banner (Minimal, NOT SaaS)

- **Purpose:** Brand tagline + set Chinese aesthetic tone (BUKAN marketing CTA)
- **Content:**
  - Tagline Chinese: "é²œè´§ç›´è¾¾" (Ma Shan Zheng, 32px, Chinese Red)
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
- **Content:** SVG cloud pattern (ç¥¥äº‘), opacity 5%, Chinese Red or Gold
- **Layout:** Full width, height 20px, margin 0
- **Mobile:** Same, height 16px
- **ANTI-PATTERN:** NO busy pattern, NO large decorative image

### Section 5: Kategori Quick Access

- **Purpose:** Quick filter by category
- **Content:** 5 buttons (Tas, Sepatu, Aksesoris, Elektronik, Fashion)
- **Layout (Desktop):** Horizontal row, center, 12px gap
- **Layout (Mobile):** Horizontal scroll, snap, 8px gap
- **Component:** Ghost button variant, padding 8px 16px
- **Behavior:** Click â†’ navigate to `/katalog?kategori=[nama]`
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
- Duration: max 2 seconds (skeleton â†’ real content fade 200ms)

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
- Click anywhere on card â†’ navigate to `/produk/[id]`
- Cursor: pointer
- Hover: border #C8102E, shadow subtle (200ms ease-out)
- NO scale transform

### Kategori Button Click
- Click â†’ navigate to `/katalog?kategori=Tas`
- Active state: background rgba(200,16,46,0.1)

### Cart Icon Click
- Click â†’ navigate to `/keranjang`
- Badge count: from API, update via Context

### Search Icon Click
- Desktop: expand search bar inline (width 0 â†’ 240px, 300ms)
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

1. âŒ NO hero banner besar dengan "BELANJA PRODUK CHINA" + gradient + CTA button
2. âŒ NO "OUR PRODUCTS" / "PRODUK KAMI" label ALL-CAPS di atas grid
3. âŒ NO "â†’" di tombol "Lihat Semua Produk"
4. âŒ NO grid seragam semua card ukuran sama
5. âŒ NO shadow di setiap card default (border only, shadow on hover)
6. âŒ NO "Trusted by" logo strip
7. âŒ NO feature cards with icons (Cepat, Aman, Murah)
8. âŒ NO counter animation on numbers
9. âŒ NO fade-in-up on scroll for grid section
10. âŒ NO "01/02/03" decorative numbers

---

## Copy (Realistic Content)

### Tagline
```
é²œè´§ç›´è¾¾
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

Copyright: Â© 2024 Jastip China. All rights reserved.
```



========================================
# FILE: 02-katalog.md
========================================

# Screen 02: Katalog (Catalog Page)

## Tujuan
Customer browse produk dengan filter kategori, sort, dan pagination. Grid seragam (no unggulan).

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚          â”‚  â”‚ Sort: [Terbaru â–¼]     View: [â–¦]            â”‚ â”‚
â”‚  â”‚  FILTER  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚          â”‚  â”‚                                              â”‚ â”‚
â”‚  â”‚ Kategori â”‚  â”‚  â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”             â”‚ â”‚
â”‚  â”‚ â˜ Tas    â”‚  â”‚  â”‚ P1 â”‚ â”‚ P2 â”‚ â”‚ P3 â”‚ â”‚ P4 â”‚             â”‚ â”‚
â”‚  â”‚ â˜ Sepatu â”‚  â”‚  â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜             â”‚ â”‚
â”‚  â”‚ â˜ Akses  â”‚  â”‚  â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”             â”‚ â”‚
â”‚  â”‚          â”‚  â”‚  â”‚ P5 â”‚ â”‚ P6 â”‚ â”‚ P7 â”‚ â”‚ P8 â”‚             â”‚ â”‚
â”‚  â”‚ Harga    â”‚  â”‚  â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜             â”‚ â”‚
â”‚  â”‚ [slider] â”‚  â”‚                                              â”‚ â”‚
â”‚  â”‚          â”‚  â”‚  [â† Prev]  1 2 3  [Next â†’]                â”‚ â”‚
â”‚  â”‚ Stok     â”‚  â”‚                                              â”‚ â”‚
â”‚  â”‚ â˜ Ready â”‚  â”‚                                              â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Katalog       [Filter] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Sort: Terbaru â–¼]          â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚   P1    â”‚  â”‚   P2    â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚   P3    â”‚  â”‚   P4    â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Load Lainnya]            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Bottom Sheet Filter saat tombol Filter ditekan):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  â”â”â” (drag handle)        â”‚
â”‚                      [X]  â”‚
â”‚  Filter                   â”‚
â”‚                           â”‚
â”‚  Kategori                 â”‚
â”‚  â˜ Tas  â˜ Sepatu          â”‚
â”‚  â˜ Aksesoris              â”‚
â”‚                           â”‚
â”‚  Rentang Harga            â”‚
â”‚  [slider]                 â”‚
â”‚                           â”‚
â”‚  Status Stok              â”‚
â”‚  â˜ Ready Stock only      â”‚
â”‚                           â”‚
â”‚  [Reset]      [Terapkan]  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- **Same as Beranda**, but "Katalog" menu is active
- Mobile: back button (â†) replaces hamburger, title "Katalog" center

### Section 2: Filter Sidebar (Desktop)
- **Purpose:** Filter produk by kategori, harga, stok
- **Layout:** Left sidebar, 256px width, sticky
- **Content:**
  - **Kategori:** Checkbox list (Tas, Sepatu, Aksesoris, Elektronik, Fashion)
  - **Harga:** Range slider (min-max, Rp 30.000 - Rp 300.000)
  - **Stok:** Checkbox "Ready Stock only"
- **Components:** Checkbox, Range Slider (custom)
- **Behavior:**
  - Filter change â†’ update URL query â†’ fetch new data (replace, not append)
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
- **Behavior:** Sort change â†’ update URL query â†’ fetch new data

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
- **Behavior:** Click page â†’ update URL `?page=X` â†’ fetch + scroll to top

### Section 5 (Mobile): Load More
- **Layout:** Center, margin top 32px
- **Content:** "Muat Lainnya" button (secondary, full width)
- **Behavior:** Click â†’ append new products to grid (infinite scroll alternative)

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
- Checkbox toggle â†’ update URL query â†’ fetch new data
- No debounce needed (user action explicit)
- Show loading state in grid area only

### Sort Change
- Dropdown select â†’ update URL query â†’ fetch new data
- Preserve current filters in URL

### Pagination
- Click page â†’ scroll to top of grid smoothly â†’ fetch new data
- URL: `/katalog?page=2&kategori=Tas&sort=price-asc`

### URL Synchronization
- All filter/sort/page state in URL (shareable, back-button friendly)
- Parse URL on mount â†’ initialize filter state

---

## Edge Cases

### Banyak Produk (>100)
- Desktop: pagination (12 per page)
- Mobile: load more + lazy load images
- Max page buttons shown: 5 (current Â± 2)

### Filter Kombinasi Tidak Ada Hasil
- Show empty state
- Suggest: "Coba hapus salah satu filter"

### Harga Range Invalid (min > max)
- Auto-swap values
- Or disable "Terapkan" button

---

## WHAT NOT TO DO

1. âŒ NO unggulan card in katalog (all regular, uniform grid)
2. âŒ NO "OUR PRODUCTS" / "KATALOG KAMI" label ALL-CAPS
3. âŒ NO "â†’" in pagination buttons
4. âŒ NO modal for filter (use bottom sheet on mobile, sidebar on desktop)
5. âŒ NO infinite scroll without "Load More" fallback (accessibility)
6. âŒ NO fade-in animation on every new card load
7. âŒ NO separate "Search" page (search integrated in katalog)

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



========================================
# FILE: 03-detail-produk.md
========================================

# Screen 03: Detail Produk

## Tujuan
Customer lihat detail produk, pilih varian, tentukan qty, add to cart atau beli langsung. **Ini adalah momen "berani" satu-satunya** yang boleh ada animasi transisi.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Home / Katalog / Tas / Tas Backpack Premium  (breadcrumb)   â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                          â”‚  â”‚ Tas Backpack Premium      â”‚ â”‚
â”‚  â”‚                          â”‚  â”‚                            â”‚ â”‚
â”‚  â”‚    MAIN IMAGE            â”‚  â”‚ Rp 282.000                â”‚ â”‚
â”‚  â”‚    (1:1, large)          â”‚  â”‚                            â”‚ â”‚
â”‚  â”‚                          â”‚  â”‚ [Ready Stock]              â”‚ â”‚
â”‚  â”‚                          â”‚  â”‚ Stok: 15 biji              â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚                            â”‚ â”‚
â”‚  â”‚ [thumb1] [thumb2] [thumb3]â”‚  â”‚ Varian:                   â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚ (â—‹) Hitam (stok 10)       â”‚ â”‚
â”‚                                â”‚ (â—‹) Coklat (stok 5)       â”‚ â”‚
â”‚                                â”‚                            â”‚ â”‚
â”‚                                â”‚ Jumlah:                   â”‚ â”‚
â”‚                                â”‚ [- 1 +]                    â”‚ â”‚
â”‚                                â”‚                            â”‚ â”‚
â”‚                                â”‚ Subtotal: Rp 282.000       â”‚ â”‚
â”‚                                â”‚                            â”‚ â”‚
â”‚                                â”‚ [+ Tambah ke Keranjang]    â”‚ â”‚
â”‚                                â”‚ [Beli Langsung]            â”‚ â”‚
â”‚                                â”‚                            â”‚ â”‚
â”‚                                â”‚ Estimasi sampai: 7-14 hari â”‚ â”‚
â”‚                                â”‚ Berat: 800g                â”‚ â”‚
â”‚                                â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Deskripsi Produk                                             â”‚
â”‚  Tas backpack bahan kulit sintetis premium. Kapasitas 20L,   â”‚
â”‚  cocok buat laptop 15 inch. Resisten air, strap kuat...     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Produk Terkait                                              â”‚
â”‚  [P1] [P2] [P3] [P4] [P5] â†’   (horizontal scroll)            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]                  [â™¡] [ðŸ›’]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚   â”‚                      â”‚ â”‚
â”‚   â”‚   MAIN IMAGE         â”‚ â”‚ (swipeable gallery)
â”‚   â”‚   (1:1, full width)  â”‚ â”‚
â”‚   â”‚                      â”‚ â”‚
â”‚   â”‚         â— â—‹ â—‹        â”‚ â”‚ (dot indicators)
â”‚   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚  Tas Backpack Premium      â”‚ â† H1
â”‚  Rp 282.000                â”‚ â† price (gold)
â”‚                            â”‚
â”‚  [Ready Stock]  Stok: 15   â”‚
â”‚                            â”‚
â”‚  Varian:                   â”‚
â”‚  (â—‹) Hitam (stok 10)       â”‚
â”‚  (â—‹) Coklat (stok 5)       â”‚
â”‚                            â”‚
â”‚  Jumlah: [- 1 +]           â”‚
â”‚                            â”‚
â”‚  Deskripsi                 â”‚
â”‚  Tas backpack bahan kulit  â”‚
â”‚  sintetis premium...       â”‚
â”‚  [Lihat Selengkapnya â–¼]    â”‚ (expandable)
â”‚                            â”‚
â”‚  Produk Terkait            â”‚
â”‚  [P1] [P2] [P3] [P4] â†’     â”‚ (horizontal scroll)
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[+ Keranjang] [Beli Langsung]â”‚ â† sticky CTA bar
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚ â† bottom nav (hidden if CTA bar)
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
  - Thumbnail click â†’ main image change (fade 200ms)
  - Swipe (mobile) â†’ next/prev image (300ms ease-out)
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
  - **Subtotal:** Calculated (harga Ã— qty)
  - **CTA:** "Tambah ke Keranjang" (secondary) + "Beli Langsung" (primary)
  - **Meta:** Estimasi sampai (7-14 hari), Berat (800g)

### Section 4: Deskripsi
- **Purpose:** Detailed product info
- **Layout:** Full width, margin top 48px
- **Content:** Text paragraph, bullet specs
- **Mobile:** Expandable ("Lihat Selengkapnya" â†’ expand, "Sembunyikan" â†’ collapse)
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

**Trigger:** User clicks card produk (from beranda/katalog) â†’ navigate to detail

**Animation:**
1. Card image slightly scale (1.0 â†’ 1.02, 200ms ease-out)
2. Page fade-out (200ms)
3. New page load: detail image fade-in + slight scale (0.98 â†’ 1.0, 400ms ease-out)
4. Content below: subtle slide-up (8px, 300ms, staggered 50ms)

**This is the ONLY allowed scroll/page animation.**

### Varian Selection
- Radio click â†’ update selected state (instant)
- Stok label update per varian (instant)
- Subtotal recalculate if qty > 1 (instant)

### Qty Stepper
- Button press: scale(0.95) snap, release scale(1.0) (100ms)
- Number change: instant
- Max: stok limit (button disabled if reached)
- Min: 1 (minus disabled if qty = 1)

### Add to Cart
- Button click â†’ API call
- Loading: spinner replace text (200ms min display)
- Success: toast "Tas Backpack Premium masuk keranjang" (5s)
- Cart badge count +1 (animate: scale 1.0 â†’ 1.2 â†’ 1.0, 300ms)

### Beli Langsung
- Button click â†’ if varian not selected, show tooltip
- If selected â†’ navigate to `/checkout?produk=[id]&varian=[id]&qty=[qty]` (skip cart)

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

1. âŒ NO "â†’" in CTA buttons
2. âŒ NO "OUR PRODUCTS" / "PRODUK TERKAIT" label ALL-CAPS
3. âŒ NO modal for varian selection (inline radio group)
4. âŒ NO image carousel auto-rotate
5. âŒ NO "Customers also bought" popup/modal
6. âŒ NO countdown timer "Flash Sale ends in 02:34:56"
7. âŒ NO review/rating section (MVP scope, backlog)
8. âŒ NO "Add to Wishlist" as primary button (it's secondary, icon only)

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
(â—‹) Hitam (stok 10)
(â—‹) Coklat (stok 5)
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
[Lihat Selengkapnya â–¼]
[Sembunyikan â–²]
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



========================================
# FILE: 04-keranjang.md
========================================

# Screen 04: Keranjang (Cart)

## Tujuan
Customer review items sebelum checkout, update qty, hapus item, lihat estimasi biaya.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Keranjang Belanja                                            â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                                    â”‚  â”‚ Ringkasan       â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”  Tas Backpack Premium       â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Varian: Hitam              â”‚  â”‚ Subtotal (2):    â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Rp 282.000                 â”‚  â”‚ Rp 317.250       â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”˜  [- 1 +]  [Hapus]          â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ Jasa Titip (10%):â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”  Kaos Oversized              â”‚  â”‚ Rp 31.725        â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Varian: Size L Hitam       â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Rp 35.250                  â”‚  â”‚ Ongkir Domestik: â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”˜  [- 1 +]  [Hapus]          â”‚  â”‚ (dihitung saat   â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚  checkout)      â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”  Dompet Kulit Asli          â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Varian: Coklat             â”‚  â”‚ Total Estimasi:  â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Rp 223.250                 â”‚  â”‚ Rp 349.000       â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”˜  [- 1 +]  [Hapus]          â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ [Checkout]       â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Keranjang            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ â”Œâ”€â”€â” Tas Backpack       â”‚ â”‚
â”‚ â”‚ â”‚  â”‚ Premium             â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”˜ Varian: Hitam      â”‚ â”‚
â”‚ â”‚       Rp 282.000         â”‚ â”‚
â”‚ â”‚       [- 1 +]    [Hapus] â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ â”Œâ”€â”€â” Kaos Oversized     â”‚ â”‚
â”‚ â”‚ â”‚  â”‚                     â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”˜ Varian: Size L      â”‚ â”‚
â”‚ â”‚       Rp 35.250          â”‚ â”‚
â”‚ â”‚       [- 1 +]    [Hapus] â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Subtotal: Rp 317.250      â”‚ â† sticky summary
â”‚ [Checkout]                â”‚ (fixed bottom)
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Empty State):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Keranjang            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚        [icon: empty cart]  â”‚
â”‚                            â”‚
â”‚   Keranjang masih kosong  â”‚
â”‚   Yuk lihat katalog,       â”‚
â”‚   siapa tau ada yang       â”‚
â”‚   menarik.                 â”‚
â”‚                            â”‚
â”‚   [Lihat Katalog]         â”‚
â”‚                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Same as other pages, but no active menu (or "Keranjang" active if it's a menu item)
- Mobile: back button (â†), title "Keranjang"

### Section 2: Page Title
- **Content:** "Keranjang Belanja" (H1, Noto Serif SC 700, 32px desktop / 24px mobile)
- **Layout:** Margin 32px top, 24px bottom

### Section 3: Item List (Left Column Desktop)
- **Purpose:** List cart items with controls
- **Layout (Desktop):** Left column, 60% width
- **Layout (Mobile):** Full width, stack vertical
- **Item Card:**
  ```
  Layout: horizontal (image left, info right)
  Image: 80x80px (mobile) / 100x100px (desktop), radius 8px, object-cover
  Info:
    - Nama (Noto Serif SC 500, 18px desktop / 16px mobile)
    - Varian (Inter 400, 14px, #6B5D52)
    - Harga satuan (Noto Serif SC 700, 16px, gold #B5941F for AA)
    - Qty stepper + Hapus button (right aligned)
  Padding: 16px
  Border: 1px solid #E8DCC8
  Radius: 12px
  Gap between items: 12px
  ```

### Section 4: Ringkasan Order (Right Column Desktop, Sticky)
- **Purpose:** Cost breakdown + checkout CTA
- **Layout (Desktop):** Right column, 40% width, sticky top 80px
- **Content:**
  - Subtotal produk (count Ã— price)
  - Biaya jasa titip (10% dari subtotal, min Rp 15.000)
  - Ongkir domestik (placeholder text, belum dihitung)
  - Total Estimasi (subtotal + jasa titip, ongkir TBD)
  - Checkout button (primary, full width)
- **Layout (Mobile):** Sticky bottom bar (not sidebar)

### Section 5: Empty State
- **Trigger:** Cart has 0 items
- **Content:**
  - Illustration: empty cart line icon (120x120px, #E8DCC8)
  - Title: "Keranjang masih kosong" (Noto Serif SC 500, 20px)
  - Desc: "Yuk lihat katalog, siapa tau ada yang menarik." (Inter 400, 14px)
  - CTA: "Lihat Katalog" (primary button)

---

## States

### Loading State
- Show skeleton item cards (3-4 placeholder)
- Skeleton summary box

### Error State
- Title: "Gagal memuat keranjang"
- Desc: "Coba refresh halaman, atau hubungi admin via WA."
- CTA: "Coba Lagi"

### Item Removed (Undo)
- Toast: "Tas Backpack dihapus dari keranjang" + "Undo" link (5s)
- If undo clicked: item restored, qty preserved

### Qty Update Failure
- Toast error: "Gagal update jumlah. Stok mungkin berubah."
- Revert qty to previous value
- Refresh cart data

---

## Interactions

### Qty Update
- Stepper button click â†’ API call (debounce 500ms)
- Optimistic update: UI change instant, API call background
- If fail: revert + toast error
- Max: stok limit (disable + button)

### Hapus Item
- Click "Hapus" â†’ confirm modal: "Hapus item ini dari keranjang?"
- Confirm â†’ API delete â†’ item removed (fade-out 200ms)
- Show undo toast (5s)

### Checkout
- Click "Checkout" â†’ navigate to `/checkout`
- If cart empty (edge): disable button, toast "Keranjang masih kosong"

### Sticky Summary (Mobile)
- Always visible at bottom
- Shows: subtotal + Checkout button
- Expandable: tap to see full breakdown (bottom sheet)

---

## Edge Cases

### Stok Berubah (Product now has less stock)
- On load: check each item vs current stok
- If qty > stok: badge "Stok berubah" on item
- Auto-adjust qty to stok limit
- Toast: "Stok Tas Backpack berubah jadi 10. Qty disesuaikan."

### Product Nonaktif (status NONAKTIF)
- Item card: opacity 60%
- Badge: "Produk tidak tersedia"
- Hapus button: still works
- Checkout: blocked if any item nonaktif, toast "Hapus produk tidak tersedia dulu"

### Varian Hapus
- If varian deleted: same as product nonaktif
- Badge: "Varian tidak tersedia"

### Harga Berubah
- Display current price (not snapshot)
- Toast on load: "Harga beberapa produk udah berubah" (if any diff)

### Very Long Item List (20+)
- Desktop: scroll within left column (max-height)
- Mobile: normal scroll, summary stays sticky

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in Checkout button
2. âŒ NO "PROCEED TO CHECKOUT" (too formal, use "Checkout")
3. âŒ NO modal for qty update (inline stepper)
4. âŒ NO auto-navigate to checkout on item add (let user decide)
5. âŒ NO "You might also like" section
6. âŒ NO forced login to view cart (allow guest cart, prompt login at checkout)
7. âŒ NO stale price (always show current, not cached)

---

## Copy

### Page Title (H1)
```
Keranjang Belanja
```

### Item Info
```
[namaProduk]
Varian: [namaVarian]
Rp [hargaSatuan]
```

### Actions
```
Hapus
```

### Summary
```
Ringkasan

Subtotal ([count]):
Rp [subtotal]

Jasa Titip (10%):
Rp [jasaTitip]

Ongkir Domestik:
(dihitung saat checkout)

Total Estimasi:
Rp [total]
```

### Checkout
```
Checkout
```

### Empty State
```
Keranjang masih kosong
Yuk lihat katalog, siapa tau ada yang menarik.
[Lihat Katalog]
```

### Undo Toast
```
{namaProduk} dihapus dari keranjang
Undo
```

### Stok Berubah
```
Stok {namaProduk} berubah jadi {stok}. Qty disesuaikan.
```



========================================
# FILE: 05-checkout.md
========================================

# Screen 05: Checkout

## Tujuan
Customer konfirmasi alamat, pilih kurir, review pesanan, dan submit ke API untuk buat pesanan + redirect ke upload bukti pembayaran.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Checkout                                                     â”‚
â”‚                                                                â”‚
â”‚  â—â”â”â”â—â”â”â”â—                                                    â”‚
â”‚  Alamat  Kurir  Konfirmasi                                   â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                                    â”‚  â”‚ Ringkasan Pesananâ”‚ â”‚
â”‚  â”‚  [Step 1: Alamat Pengiriman]       â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ â”Œâ”€â”€â” Produk 1   â”‚ â”‚
â”‚  â”‚  (â—‹) Jl. Merdeka No. 123          â”‚  â”‚ â””â”€â”€â”˜ Rp 282.000 â”‚ â”‚
â”‚  â”‚      Budi Santoso                  â”‚  â”‚     x1          â”‚ â”‚
â”‚  â”‚      Bandung, 40123                â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ â”Œâ”€â”€â” Produk 2   â”‚ â”‚
â”‚  â”‚  (â—‹) Jl. Sudirman No. 45          â”‚  â”‚ â””â”€â”€â”˜ Rp 35.250  â”‚ â”‚
â”‚  â”‚      Siti Nurhaliza                â”‚  â”‚     x2          â”‚ â”‚
â”‚  â”‚      Jakarta, 12190                â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ Subtotal: 3 itemsâ”‚
â”‚  â”‚  [ + Tambah Alamat Baru ]         â”‚  â”‚ Rp 352.500       â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚  [Selanjutnya: Pilih Kurir]       â”‚  â”‚ Jasa Titip:      â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ Rp 35.250       â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚ Ongkir: Rp 0    â”‚ â”‚
â”‚                                          â”‚                  â”‚ â”‚
â”‚                                          â”‚ Total: Rp 387.750â”‚ â”‚
â”‚                                          â”‚                  â”‚ â”‚
â”‚                                          â”‚ Metode Bayar:   â”‚ â”‚
â”‚                                          â”‚ Transfer Bank    â”‚ â”‚
â”‚                                          â”‚                  â”‚ â”‚
â”‚                                          â”‚ [Bayar Sekarang] â”‚ â”‚
â”‚                                          â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Checkout            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ â—â”â”â”â—â”â”â”â—                â”‚
â”‚ Alamat  Kurir  Konfirmasiâ”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Step 1: Alamat         â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ (â—‹) Jl. Merdeka 123    â”‚ â”‚
â”‚ â”‚     Budi Santoso        â”‚ â”‚
â”‚ â”‚     Bandung, 40123      â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ (â—‹) Jl. Sudirman 45    â”‚ â”‚
â”‚ â”‚     Siti Nurhaliza      â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ [+ Tambah Alamat Baru] â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Subtotal: Rp 352.500      â”‚
â”‚ Total: Rp 387.750         â”‚
â”‚ [Bayar Sekarang]          â”‚ â† sticky bottom (if last step)
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Mobile: each step full screen, no sidebar summary)
```

---

## Sections

### Section 1: Progress Stepper (Top)

```
â—â”â”â”â—â”â”â”â—
Alamat  Kurir  Konfirmasi
```

- **Purpose:** Show 3-step progress
- **Layout:** Center, margin 32px bottom
- **Component:** Status Pipeline (Horizontal) modified for steps
- **Nodes:**
  - Completed: filled gold #D4AF37 + check icon
  - Active: filled Chinese Red #C8102E
  - Pending: outline #E8DCC8
- **Labels below:** "Alamat", "Kurir", "Konfirmasi" (Inter 400, 12px)
- **Mobile:** Same, smaller (24x24px nodes)

### Section 2: Step Content (Left, Desktop)

**Step 1: Alamat Pengiriman**
- List radio alamat tersimpan
- Each: penerima, alamat, kota+kodepos
- "Tambah Alamat Baru" button (ghost, + icon)
- Click â†’ modal form (inline form fields)
- Continue: "Selanjutnya: Pilih Kurir" button (primary)

**Step 2: Pilih Kurir**
- Radio list kurir:
  - JNE REG - Rp 25.000 - Estimasi 3-5 hari
  - J&T - Rp 28.000 - Estimasi 2-4 hari
  - SiCepat - Rp 30.000 - Estimasi 2-3 hari
- Ongkir calculated based on beratTotalGram + provinsi
- Continue: "Selanjutnya: Konfirmasi" button
- Back: "Kembali" button (secondary)

**Step 3: Konfirmasi Pesanan**
- Review items (compact list)
- Review alamat (compact)
- Review kurir + estimasi
- Biaya breakdown final
- No edit here (go back to step to edit)

### Section 3: Ringkasan Pesanan (Right Sidebar, Desktop)
- **Purpose:** Sticky order summary + final CTA
- **Layout:** Right column, 320px, sticky top 80px
- **Content:**
  - Item list (compact: thumbnail + name + qty + price)
  - Subtotal
  - Jasa titip (10%)
  - Ongkir (updated per kurir selection)
  - Total
  - Metode pembayaran: "Transfer Bank" (fixed text, no choice for MVP)
  - "Bayar Sekarang" button (primary)
- **Mobile:** Sticky bottom bar (total + button)

---

## States

### Loading State
- Skeleton form fields, skeleton summary
- Disable stepper navigation

### Address Loading
- Skeleton radio items

### Kurir Loading
- Skeleton radio items
- Disable "Selanjutnya" button

### Submit Loading
- "Bayar Sekarang" button: spinner replace text
- Disable all inputs
- Min display 500ms

### Submit Success
- Redirect to `/pesanan/[id]/pembayaran` (new pesanan created)

### Submit Error (Stok berubah)
- Modal: "Stok produk berubah"
- List items with stok issue
- CTA: "Kembali ke Keranjang"

---

## Interactions

### Step Navigation
- "Selanjutnya" â†’ validate current step â†’ if valid, advance step
- "Kembali" â†’ previous step (preserve data)
- Click on completed step node â†’ jump back (if data valid)
- URL sync: `/checkout?step=1` (optional, for back-button)

### Alamat Selection
- Radio change â†’ update selected alamat
- "Tambah Alamat" â†’ modal form (label, penerima, noTelp, alamat, kota, provinsi, kodePos)
- Submit new alamat â†’ add to list, auto-select

### Kurir Selection
- Radio change â†’ update ongkir in summary (instant recalc)
- Show loading on ongkir text if calculating (rare, usually instant)

### Bayar Sekarang
- Validate: alamat selected, kurir selected
- API call: POST /api/pesanan
- On success: redirect to `/pesanan/[id]/pembayaran`
- On fail: toast error

---

## Edge Cases

### No Alamat
- Step 1: hide radio list
- Show: "Belum ada alamat. Tambah dulu ya." + form
- "Tambah Alamat Baru" mandatory

### Cart Empty (navigated directly to /checkout)
- Redirect to `/keranjang` with toast "Keranjang masih kosong"

### Item Stok Habis (during checkout)
- Block submit
- Modal: "Stok {produk} habis. Hapus dari keranjang dulu."
- CTA: "Kembali ke Keranjang"

### Weight Exceeds Limit
- (No real limit, but inform if heavy)
- "Total berat 5kg. Ongkir might mahal, yakin lanjut?"

### Ongkir Cannot Calculate (provinsi not recognized)
- Fallback: zona default (termahal)
- Note: "Ongkir estimasi untuk wilayahmu. Final dihitung admin."

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in step navigation buttons ("Selanjutnya", "Kembali")
2. âŒ NO "CONFIRM ORDER" (use "Bayar Sekarang")
3. âŒ NO accordion steps (use visible progress + single active step)
4. âŒ NO modal for checkout (use page layout)
5. âŒ NO "Special instructions" textarea (MVP scope)
6. âŒ NO multiple payment methods (MVP: manual transfer only)
7. âŒ NO coupon/promo code field (backlog)
8. âŒ NO guest checkout (require login - simpler for MVP)

---

## Copy

### Page Title (H1)
```
Checkout
```

### Progress Steps
```
Alamat
Kurir
Konfirmasi
```

### Step 1
```
Alamat Pengiriman

[Alamat Radio Items]

+ Tambah Alamat Baru

Selanjutnya: Pilih Kurir
```

### Step 2
```
Pilih Kurir

JNE REG - Rp 25.000 - Estimasi 3-5 hari
J&T - Rp 28.000 - Estimasi 2-4 hari
SiCepat - Rp 30.000 - Estimasi 2-3 hari

Kembali
Selanjutnya: Konfirmasi
```

### Step 3
```
Konfirmasi Pesanan

[Item list]
[Alamat compact]
[Kurir compact]

Kembali
```

### Summary
```
Ringkasan Pesanan

[Item list compact]

Subtotal (3 items):
Rp 352.500

Jasa Titip (10%):
Rp 35.250

Ongkir:
Rp 25.000

Total:
Rp 412.750

Metode Bayar:
Transfer Bank

[Bayar Sekarang]
```

### Address Form (Modal)
```
Tambah Alamat Baru

Label Alamat
[Nama penerima]
[No. telp]
[Alamat lengkap]
[Kota]
[Provinsi]
[Kode Pos]

[Batal] [Simpan]
```

### Error: Stok Berubah
```
Stok produk berubah

Maaf, stok produk ini berubah saat kamu checkout:
- Tas Backpack (sisa 5)

[Kembali ke Keranjang]
```



========================================
# FILE: 06-upload-bukti.md
========================================

# Screen 06: Upload Bukti Pembayaran

## Tujuan
Customer upload bukti transfer bank. Halaman tujuan setelah checkout, atau dari riwayat pesanan yang statusnya MENUNGGU_BUKTI.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Upload Bukti Pembayaran                                      â”‚
â”‚  No. Invoice: INV-20240120-I9J0K1L2                          â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚                          â”‚  â”‚ Total Bayar:             â”‚  â”‚
â”‚  â”‚  Transfer ke:            â”‚  â”‚ Rp 365.575               â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚  BCA                     â”‚  â”‚ Status:                   â”‚  â”‚
â”‚  â”‚  1234567890              â”‚  â”‚ [Menunggu Bukti]         â”‚  â”‚
â”‚  â”‚  PT Jastip China         â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚ Kedaluwarsa dalam:       â”‚  â”‚
â”‚  â”‚  [Salin]                 â”‚  â”‚ 23 jam 45 menit          â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚  Mandiri                 â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚  9876543210              â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚  PT Jastip China         â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚  [Salin]                 â”‚  â”‚                           â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚            [Drop bukti di sini]                         â”‚ â”‚
â”‚  â”‚            atau [Pilih File]                            â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Format: JPG, PNG, PDF                                   â”‚ â”‚
â”‚  â”‚  Maksimal: 5MB                                           â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  [Upload Bukti]                                               â”‚
â”‚                                                                â”‚
â”‚  Catatan: Pembayaran akan diverifikasi admin 1x24 jam.       â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Upload Bukti        â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ No. Invoice:               â”‚
â”‚ INV-20240120-I9J0K1L2     â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Total Bayar:           â”‚ â”‚
â”‚ â”‚ Rp 365.575             â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Status:                â”‚ â”‚
â”‚ â”‚ [Menunggu Bukti]       â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Kedaluwarsa:            â”‚ â”‚
â”‚ â”‚ 23 jam 45 menit        â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ Transfer ke:               â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ BCA                    â”‚ â”‚
â”‚ â”‚ 1234567890             â”‚ â”‚
â”‚ â”‚ PT Jastip China        â”‚ â”‚
â”‚ â”‚            [Salin]     â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Mandiri                â”‚ â”‚
â”‚ â”‚ 9876543210             â”‚ â”‚
â”‚ â”‚ PT Jastip China        â”‚ â”‚
â”‚ â”‚            [Salin]     â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚  [Drop bukti di sini]  â”‚ â”‚
â”‚ â”‚  atau [Pilih File]    â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚  JPG, PNG, PDF, 5MB   â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Upload Bukti]             â”‚
â”‚                            â”‚
â”‚ Pembayaran akan diverifikasiâ”‚
â”‚ admin 1x24 jam.           â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Mobile: back button, title "Upload Bukti"

### Section 2: Info Pesanan (Summary)
- **Layout (Desktop):** 2-column (rekening kiri, total+status kanan)
- **Layout (Mobile):** Stack vertical (total first, rekening below)
- **Content Right:**
  - Total Bayar (Noto Serif SC 700, 28px, gold)
  - Status badge: "Menunggu Bukti" (gold bg)
  - Countdown timer: "Kedaluwarsa dalam: 23 jam 45 menit"

### Section 3: Rekening Tujuan
- **Layout:** Card list, stack vertical
- **Each card:**
  - Bank name (Inter 600, 18px)
  - Account number (Inter 400, 16px, monospace)
  - Account holder (Inter 400, 14px, #6B5D52)
  - "Salin" button (ghost, copy icon)
- **Copy behavior:** Click "Salin" â†’ clipboard + tooltip "Tersalin!"

### Section 4: Upload Zone
- **Layout (Desktop):** Full width box, 200px height
- **Layout (Mobile):** Full width, 160px height
- **Style:**
  - Border: 2px dashed #E8DCC8
  - Background: #F7F3EC (subtle warm)
  - Radius: 12px
  - Center content: icon + text
- **Content:**
  - Icon: upload-cloud 48px, #6B5D52
  - Text: "Drop bukti di sini"
  - Link: "Pilih File" (Chinese Red, underlined)
  - Helper: "Format: JPG, PNG, PDF. Maksimal 5MB"
- **Interaction:**
  - Drag & drop: file enter â†’ border #C8102E, background rgba(200,16,46,0.05)
  - File selected: show preview thumbnail + file name + size
  - Click "Pilih File": trigger hidden `<input type="file">`

### Section 5: Upload Button
- **Component:** Button Primary, full width
- **Label:** "Upload Bukti"
- **State:**
  - Disabled (no file selected): opacity 50%
  - Loading (uploading): spinner + "Mengupload..."
  - Success: redirect to `/pesanan/[id]` with toast "Bukti terkirim, tunggu verifikasi"

### Section 6: Catatan
- **Content:** "Pembayaran akan diverifikasi admin dalam 1x24 jam."
- **Style:** Inter 400, 14px, #6B5D52, centered

---

## States

### Loading (Submitting)
- Button: spinner + "Mengupload..."
- Disable upload zone (no file change)
- Disable rekening salin

### Success
- Redirect to `/pesanan/[id]`
- Toast: "Bukti transfer terkirim. Tunggu verifikasi admin ya."

### Error (Upload Fail)
- Toast: "Gagal upload. Coba lagi, atau hubungi admin via WA."
- Clear file selection
- Re-enable upload zone

### Error (Wrong File Type)
- Instant validation on file select
- Toast: "Cuma bisa upload gambar (JPG, PNG) atau PDF"
- Clear file selection

### Error (File Too Large)
- Instant validation
- Toast: "Ukuran file kebanyakan. Maksimal 5MB."
- Clear file selection

### Already Uploaded (Status: MENUNGGU_VERIFIKASI)
- Hide upload zone
- Show: "Bukti udah dikirim, lagi dicek admin."
- Show: preview bukti (thumbnail)
- Show: timestamp upload

### Expired (Status: KADALUARSA)
- Hide upload zone
- Show: "Pembayaran kedaluwarsa. Pesanan dibatalkan."
- Show: "Buat pesanan baru" CTA â†’ `/katalog`

### Rejected (Status: DITOLAK)
- Show: "Bukti ditolak admin: {catatanAdmin}"
- Show: rejected bukti preview
- Show: upload zone (retry with new bukti)
- Status badge: "Ditolak" (red-muted)

---

## Interactions

### File Drag & Drop
- Dragenter: border â†’ #C8102E, bg â†’ rgba(200,16,46,0.05)
- Dragleave: revert to default
- Drop: file validation â†’ if OK, show preview

### File Select (Click)
- Click zone or "Pilih File" link â†’ trigger file input
- File selected â†’ validation â†’ if OK, show preview

### Salin Rekening
- Click "Salin" button â†’ clipboard API
- Tooltip: "Tersalin!" (fade in 100ms, fade out 200ms after 2s)

### Countdown Timer
- JS interval: update every minute
- Format: "X jam Y menit"
- Color: normal (#6B5D52), warning (< 2 jam: #9B4D50)
- At 0: show "Kedaluwarsa" + disable upload

### Upload Submit
- Button click â†’ get presigned URL from API â†’ upload to R2 â†’ submit bukti URL to API
- Or: simpler flow - upload file to API endpoint, API handles R2

---

## Edge Cases

### No Pembayaran Found
- Redirect to `/pesanan` with toast "Pesanan tidak ditemukan"

### Multiple Retries (previous DITOLAK)
- Show history of attempts (compact list)
- Each: timestamp, status, catatan admin (if rejected)
- Current upload zone active

### Network Slow
- Show progress bar (if possible) or spinner
- Don't timeout too fast (min 30s)

### File Preview
- Image: thumbnail 200x200px, object-contain
- PDF: PDF icon + filename
- Click thumbnail: fullscreen preview (modal)

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in Upload button
2. âŒ NO "SUBMIT PROOF" (use "Upload Bukti")
3. âŒ NO multiple rekening in one line (use card list)
4. âŒ NO auto-submit on file select (let user click Upload)
5. âŒ NO QR code payment (MVP: manual transfer only)
6. âŒ NO "Pay with e-wallet" option
7. âŒ NO countdown timer in red large (subtle, not pressure)
8. âŒ NO "Urgent!" or "Bayar sekarang atau batal!" aggressive copy

---

## Copy

### Page Title (H1)
```
Upload Bukti Pembayaran
```

### Invoice
```
No. Invoice: INV-20240120-I9J0K1L2
```

### Summary
```
Total Bayar:
Rp 365.575

Status:
[Menunggu Bukti]

Kedaluwarsa dalam:
23 jam 45 menit
```

### Rekening
```
Transfer ke:

BCA
1234567890
PT Jastip China
[Salin]

Mandiri
9876543210
PT Jastip China
[Salin]
```

### Upload Zone
```
[Drop bukti di sini]
atau [Pilih File]

Format: JPG, PNG, PDF
Maksimal: 5MB
```

### Upload Button
```
Upload Bukti
```

### Catatan
```
Pembayaran akan diverifikasi admin dalam 1x24 jam.
```

### Already Uploaded
```
Bukti udah dikirim, lagi dicek admin.
```

### Expired
```
Pembayaran kedaluwarsa. Pesanan dibatalkan.
[Buat Pesanan Baru]
```

### Rejected
```
Bukti ditolak admin: {catatanAdmin}

Upload ulang bukti transfer yang benar.
```

### Toast Success
```
Bukti transfer terkirim. Tunggu verifikasi admin ya.
```

### Toast Copy
```
Tersalin!
```

### Toast Error (File)
```
Cuma bisa upload gambar (JPG, PNG) atau PDF
Ukuran file kebanyakan. Maksimal 5MB.
```



========================================
# FILE: 07-riwayat-pesanan.md
========================================

# Screen 07: Riwayat Pesanan

## Tujuan
Customer lihat semua pesanan mereka, filter by status, akses detail/track/lacak.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Riwayat Pesanan                                             â”‚
â”‚                                                                â”‚
â”‚  [Semua] [Menunggu Bayar] [Diproses] [Dikirim] [Selesai]    â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ INV-20240120-I9J0K1L2              [Menunggu Pembayaran] â”‚ â”‚
â”‚  â”‚ 20 Jan 2024, 19:45 WIB              Rp 365.575            â”‚ â”‚
â”‚  â”‚ 1 item                                                   â”‚ â”‚
â”‚  â”‚                                          [Lihat Detail]  â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚ INV-20240118-E5F6G7H8              [Diproses Admin]      â”‚ â”‚
â”‚  â”‚ 18 Jan 2024, 10:15 WIB              Rp 644.280            â”‚ â”‚
â”‚  â”‚ 2 items                                                  â”‚ â”‚
â”‚  â”‚                                          [Lihat Detail]  â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚ INV-20240115-A1B2C3D4              [Selesai]             â”‚ â”‚
â”‚  â”‚ 15 Jan 2024, 14:30 WIB              Rp 562.750            â”‚ â”‚
â”‚  â”‚ 3 items                                                  â”‚ â”‚
â”‚  â”‚                                          [Lihat Detail]  â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  [Muat Lainnya]                                               â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Riwayat Pesanan     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Semua] [Bayar] [Proses]  â”‚ â† horizontal scroll filter
â”‚ [Kirim] [Selesai]         â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ INV-...I9J0K1L2        â”‚ â”‚
â”‚ â”‚ [Menunggu Pembayaran]   â”‚ â”‚
â”‚ â”‚ 20 Jan 2024             â”‚ â”‚
â”‚ â”‚ Rp 365.575 | 1 item     â”‚ â”‚
â”‚ â”‚         [Lihat Detail]  â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ INV-...E5F6G7H8        â”‚ â”‚
â”‚ â”‚ [Diproses Admin]        â”‚ â”‚
â”‚ â”‚ 18 Jan 2024             â”‚ â”‚
â”‚ â”‚ Rp 644.280 | 2 items    â”‚ â”‚
â”‚ â”‚         [Lihat Detail]  â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Muat Lainnya]            â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Empty State):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Riwayat Pesanan     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚      [icon: empty box]     â”‚
â”‚                            â”‚
â”‚   Belum ada pesanan        â”‚
â”‚   Saatnya belanja pertama  â”‚
â”‚   kamu!                    â”‚
â”‚                            â”‚
â”‚   [Mulai Belanja]         â”‚
â”‚                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Mobile: back button, title "Riwayat Pesanan"

### Section 2: Page Title
- "Riwayat Pesanan" (H1, Noto Serif SC 700, 32px / 24px mobile)

### Section 3: Filter Tabs
- **Layout (Desktop):** Horizontal row, left-aligned, 8px gap
- **Layout (Mobile):** Horizontal scroll, snap, 8px gap
- **Tabs:** Semua, Menunggu Bayar, Diproses, Dikirim, Selesai
- **Component:** Ghost button variant
- **Active state:** Background rgba(200,16,46,0.1), text Chinese Red, font-weight 600
- **Behavior:** Click â†’ filter list (client-side or API call with status param)

### Section 4: Pesanan List
- **Layout:** Vertical stack, 12px gap
- **Each item (Card):**
  ```
  Layout: horizontal (info left, action right)
  Padding: 16px (desktop) / 12px (mobile)
  Border: 1px solid #E8DCC8
  Radius: 12px
  Background: #FFFFFF
  Hover: border #C8102E, shadow subtle
  ```
- **Content per card:**
  - Row 1: No Invoice (Inter 600, 16px) + Status Badge (right aligned)
  - Row 2: Tanggal (Inter 400, 14px, #6B5D52) + Total (Noto Serif SC 700, 18px, gold #B5941F)
  - Row 3: Item count summary ("2 items") + "Lihat Detail" button (ghost, right)

### Section 5: Load More (Pagination)
- **Desktop:** "Muat Lainnya" button (secondary, center)
- **Mobile:** Same, or infinite scroll with sentinel
- **Behavior:** Click â†’ append new items, show skeleton loaders while fetching

### Section 6: Empty State
- **Trigger:** No pesanan at all, OR no pesanan in selected filter
- **Content:**
  - Illustration: empty box line icon (120x120px, #E8DCC8)
  - Title: "Belum ada pesanan" (Noto Serif SC 500, 20px)
  - Desc: "Saatnya belanja pertama kamu!" (Inter 400, 14px)
  - CTA: "Mulai Belanja" (primary) â†’ `/katalog`

---

## States

### Loading State
- Show 3-4 skeleton cards (shimmer)
- Filter tabs rendered but disabled

### Error State
- Title: "Gagal memuat pesanan"
- Desc: "Coba refresh halaman, atau hubungi admin via WA."
- CTA: "Coba Lagi"

### Filtered Empty (e.g., "Selesai" but no completed orders)
- Title: "Belum ada pesanan [status]"
- Desc: "Pesanan dengan status ini belum ada."
- No CTA (just switch filter)

---

## Interactions

### Filter Tab Click
- Click tab â†’ update active state
- Fetch pesanan with status filter (or client-side filter if cached)
- Show loading state in list area only

### Card Click / Lihat Detail
- Click anywhere on card â†’ navigate to `/pesanan/[id]`
- Cursor: pointer
- Hover: border #C8102E, shadow subtle

### Load More
- Click â†’ fetch next page
- Append to list (no replace)
- Show skeleton at bottom while loading
- Hide button if no more pages

### Pull to Refresh (Mobile)
- Pull down â†’ refetch list
- Spinner: Chinese Red, 24x24px

---

## Edge Cases

### Banyak Pesanan (50+)
- Pagination: 10 per page (desktop), load more (mobile)
- Lazy load images (item thumbnails if shown)

### Pesanan Dibatalkan
- Show with badge "Dibatalkan" (red-muted)
- Still visible in "Semua" filter, hidden from status filters

### Invoice Number Long
- Truncate on mobile: "INV-20240120-I9J0..." (expandable)
- Full on desktop

### Multiple Items Summary
- "1 item" vs "2 items" (plural)
- If > 3: "3+ items" or show first 2 names

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in "Lihat Detail" button
2. âŒ NO "ORDER HISTORY" label ALL-CAPS
3. âŒ NO table layout for mobile (use cards)
4. âŒ NO separate "Track" page (use detail pesanan with timeline)
5. âŒ NO auto-refresh (let user pull to refresh manually)
6. âŒ NO search in riwayat (filter by status is enough for MVP)

---

## Copy

### Page Title (H1)
```
Riwayat Pesanan
```

### Filter Tabs
```
Semua
Menunggu Bayar
Diproses
Dikirim
Selesai
```

### Card Content
```
INV-20240120-I9J0K1L2
[Status Badge]
20 Jan 2024, 19:45 WIB
Rp 365.575
1 item
Lihat Detail
```

### Load More
```
Muat Lainnya
```

### Empty State
```
Belum ada pesanan
Saatnya belanja pertama kamu!
[Mulai Belanja]
```

### Filtered Empty
```
Belum ada pesanan [status]
Pesanan dengan status ini belum ada.
```



========================================
# FILE: 08-detail-pesanan.md
========================================

# Screen 08: Detail Pesanan (Lacak)

## Tujuan
Customer lihat detail pesanan: item, alamat, biaya, status pipeline (lacak), info pengiriman, dan akses ke upload bukti / komplain.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Home / Riwayat / INV-20240120-I9J0K1L2  (breadcrumb)        â”‚
â”‚                                                                â”‚
â”‚  Pesanan INV-20240120-I9J0K1L2                               â”‚
â”‚  [Menunggu Pembayaran]                                       â”‚
â”‚  20 Jan 2024, 19:45 WIB                                      â”‚
â”‚                                                                â”‚
â”‚  â—â”â”â”â—‹â”â”â”â—‹â”â”â”â—‹â”â”â”â—‹                                           â”‚
â”‚  Bayar  Proses  Konsol  Lokal  Selesai                      â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Item Pesanan             â”‚  â”‚ Info Pengiriman          â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚ â”Œâ”€â”€â” Tas Backpack        â”‚  â”‚ Penerima: Budi Santoso   â”‚  â”‚
â”‚  â”‚ â”‚  â”‚ Premium (Hitam)     â”‚  â”‚ No. Telp: 081234567890   â”‚  â”‚
â”‚  â”‚ â””â”€â”€â”˜ Rp 282.000 x1       â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚      Subtotal: 282.000   â”‚  â”‚ Jl. Merdeka No. 123      â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚ RT 01 RW 02              â”‚  â”‚
â”‚  â”‚ â”Œâ”€â”€â” Kaos Oversized      â”‚  â”‚ Bandung, Jawa Barat      â”‚  â”‚
â”‚  â”‚ â”‚  â”‚ (Size L Hitam)      â”‚  â”‚ 40123                    â”‚  â”‚
â”‚  â”‚ â””â”€â”€â”˜ Rp 35.250 x2        â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚      Subtotal: 70.500    â”‚  â”‚ Kurir: JNE REG           â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚ No. Resi: -              â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚ Estimasi: -              â”‚  â”‚
â”‚                                â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ Rincian Biaya                                            â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚ Subtotal Produk:        Rp 352.500                       â”‚ â”‚
â”‚  â”‚ Biaya Jasa Titip (10%): Rp 35.250                        â”‚ â”‚
â”‚  â”‚ Ongkir China:           Rp 150.000                       â”‚ â”‚
â”‚  â”‚ Ongkir Domestik:         Rp 25.000                        â”‚ â”‚
â”‚  â”‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€                        â”‚ â”‚
â”‚  â”‚ Total:                   Rp 562.750                       â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  [Upload Bukti Pembayaran]  [Ajukan Komplain]               â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Detail Pesanan      â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ INV-20240120-I9J0K1L2     â”‚
â”‚ [Menunggu Pembayaran]      â”‚
â”‚ 20 Jan 2024, 19:45 WIB    â”‚
â”‚                            â”‚
â”‚ â—â”â”â”â—‹â”â”â”â—‹â”â”â”â—‹â”â”â”â—‹        â”‚
â”‚ Bayar Proses Kon Lok Selesaiâ”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Item Pesanan           â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â” Tas Backpack       â”‚ â”‚
â”‚ â”‚ â”‚  â”‚ Premium (Hitam)    â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”˜ 282.000 x1         â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â” Kaos Oversized     â”‚ â”‚
â”‚ â”‚ â”‚  â”‚ (Size L Hitam)     â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”˜ 35.250 x2          â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Info Pengiriman        â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Penerima: Budi Santoso  â”‚ â”‚
â”‚ â”‚ 081234567890            â”‚ â”‚
â”‚ â”‚ Jl. Merdeka No. 123     â”‚ â”‚
â”‚ â”‚ Bandung, Jawa Barat     â”‚ â”‚
â”‚ â”‚ 40123                   â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Kurir: JNE REG          â”‚ â”‚
â”‚ â”‚ No. Resi: -             â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Rincian Biaya          â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Subtotal:    352.500   â”‚ â”‚
â”‚ â”‚ Jasa Titip:   35.250   â”‚ â”‚
â”‚ â”‚ Ongkir China: 150.000  â”‚ â”‚
â”‚ â”‚ Ongkir Domestik: 25.000â”‚ â”‚
â”‚ â”‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ â”‚ â”‚
â”‚ â”‚ Total:       562.750   â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Upload Bukti]            â”‚ â† sticky CTA (if menunggu bayar)
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Breadcrumb (Desktop)
- Home / Riwayat / [Invoice]

### Section 2: Header Info
- Invoice number (H1, Noto Serif SC 700, 28px desktop / 20px mobile)
- Status badge (from components.md, 6 variants)
- Tanggal pesan (Inter 400, 14px, #6B5D52)

### Section 3: Status Pipeline (Timeline)
- **Layout (Desktop):** Horizontal, 5 nodes
- **Layout (Mobile):** Horizontal (smaller) or vertical if too tight
- **Nodes:**
  1. Bayar (MENUNGGU_PEMBAYARAN)
  2. Proses (DIPROSES_ADMIN)
  3. Konsol (DIKONSOLIDASI_KIRIM)
  4. Lokal (TIBA_KIRIM_LOKAL)
  5. Selesai (SELESAI)
- **Node state:**
  - Completed: filled gold #D4AF37 + check icon
  - Active (current): filled Chinese Red #C8102E
  - Pending: outline #E8DCC8
- **Labels:** "Bayar", "Proses", "Konsol", "Lokal", "Selesai" (Inter 400, 12px)
- **DIBATALKAN:** Show red-muted node at "Bayar" position, all others pending

### Section 4: Item Pesanan
- **Layout:** Card container, vertical item list
- **Each item:**
  - Thumbnail: 80x80px, radius 8px, object-cover
  - Nama (Noto Serif SC 500, 18px / 16px mobile)
  - Varian (Inter 400, 14px, #6B5D52)
  - Harga satuan (Noto Serif SC 700, 16px, gold #B5941F)
  - Qty: "x1" or "x2"
  - Subtotal: harga Ã— qty

### Section 5: Info Pengiriman
- **Layout:** Card container
- **Content:**
  - Penerima (Inter 500, 16px)
  - No. Telp
  - Alamat lengkap (multi-line)
  - Kurir (Inter 500, 16px)
  - No. Resi (or "-" if not yet assigned)
  - Estimasi tiba (or "-" if not yet)

### Section 6: Rincian Biaya
- **Layout:** Card container, breakdown table
- **Content:**
  - Subtotal Produk
  - Biaya Jasa Titip (label with %)
  - Ongkir China Gudang
  - Ongkir Domestik
  - Biaya Admin Payment (if > 0)
  - Divider line (1px #E8DCC8)
  - Total Akhir (Noto Serif SC 700, 20px, gold)
- **Style:** Label left, value right (Inter 500 for label, Inter 600 for value)

### Section 7: Action Buttons
- **Layout:** Horizontal row, 12px gap, margin top 32px
- **Buttons (conditional based on status):**
  - MENUNGGU_PEMBAYARAN: "Upload Bukti Pembayaran" (primary) â†’ `/pesanan/[id]/pembayaran`
  - SELESAI: "Ajukan Komplain" (secondary) â†’ `/pesanan/[id]/komplain`
  - DIBATALKAN: no buttons
  - Others: no action buttons
- **Mobile:** Sticky bottom bar if "Upload Bukti" available

---

## States

### Loading State
- Skeleton pipeline, skeleton item list, skeleton info card

### Not Found
- 404: "Pesanan nggak ketemu"
- CTA: "Kembali ke Riwayat"

### No Resi Yet
- Show "-" for no resi
- Estimasi: "Belum ada"

### Komplain Already Submitted
- If komplain exists: show "Komplain Diajukan" badge
- "Ajukan Komplain" button disabled or hidden
- Link: "Lihat Status Komplain"

---

## Interactions

### Pipeline Node Hover (Desktop)
- Hover completed/active node â†’ tooltip with timestamp
- Tooltip: "Diproses Admin: 19 Jan 2024, 14:00 WIB"

### Upload Bukti Click
- Navigate to `/pesanan/[id]/pembayaran`

### Ajukan Komplain Click
- Navigate to `/pesanan/[id]/komplain`

### Copy No Resi
- If resi available: tap to copy
- Tooltip: "No. resi tersalin!"

---

## Edge Cases

### DIBATALKAN
- Pipeline: red-muted node at current status, all others grey
- Info card: "Pesanan dibatalkan" note
- No action buttons
- Show reason if available (from status log)

### Multiple Items (10+)
- Show all items (no collapse)
- Scrollable card container (max-height 400px, scroll)

### Custom PO Pesanan
- Item: "Custom PO: [deskripsi singkat]"
- Link to original PO: "Lihat Permintaan PO"
- No product thumbnail (use generic icon)

### Biaya Modified by Admin
- Show original price + modified note
- "Biaya ongkir diupdate admin" (helper text)

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in action buttons
2. âŒ NO "TRACK ORDER" label ALL-CAPS
3. âŒ NO auto-refresh status (let user pull to refresh)
4. âŒ NO live chat widget
5. âŒ NO "Reorder" button (MVP scope)
6. âŒ NO "Add review" section (backlog)
7. âŒ NO print invoice button (MVP scope)
8. âŒ NO share order to social media

---

## Copy

### Page Title (H1)
```
Pesanan INV-20240120-I9J0K1L2
```

### Status + Date
```
[Status Badge]
20 Jan 2024, 19:45 WIB
```

### Pipeline Labels
```
Bayar
Proses
Konsol
Lokal
Selesai
```

### Item
```
Tas Backpack Premium
Varian: Hitam
Rp 282.000
x1
Subtotal: Rp 282.000
```

### Info Pengiriman
```
Info Pengiriman

Penerima: Budi Santoso
No. Telp: 081234567890

Jl. Merdeka No. 123
RT 01 RW 02
Bandung, Jawa Barat
40123

Kurir: JNE REG
No. Resi: -
Estimasi: -
```

### Biaya
```
Rincian Biaya

Subtotal Produk:        Rp 352.500
Biaya Jasa Titip (10%): Rp 35.250
Ongkir China Gudang:    Rp 150.000
Ongkir Domestik:        Rp 25.000
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Total:                  Rp 562.750
```

### Actions
```
Upload Bukti Pembayaran
Ajukan Komplain
```

### Dibatalkan
```
Pesanan dibatalkan
Alasan: {alasan dari status log, jika ada}
```

### Komplain Exists
```
Komplain Diajukan
Lihat Status Komplain
```



========================================
# FILE: 09-ajukan-po.md
========================================

# Screen 09: Ajukan Custom PO

## Tujuan
Customer ajukan permintaan produk off-catalog (tidak ada di katalog). Upload link referensi + spesifikasi + foto.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Ajukan Custom PO                                            â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Mau beli barang yang nggak ada di katalog?              â”‚ â”‚
â”‚  â”‚  Kirim link produk dari China, tim kami akan kasih       â”‚ â”‚
â”‚  â”‚  estimasi harga dalam 1-2 hari kerja.                   â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Form Permintaan                                         â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Link Produk Referensi *                                 â”‚ â”‚
â”‚  â”‚  [https://taobao.com/...]                                â”‚ â”‚
â”‚  â”‚  Contoh: link Taobao, 1688, atau AliExpress             â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Deskripsi Spesifikasi *                                 â”‚ â”‚
â”‚  â”‚  [                                                      ] â”‚ â”‚
â”‚  â”‚  [  Mau beli sepatu running brand X, size 42, warna    ] â”‚ â”‚
â”‚  â”‚  [  hitam. Beda sama yang di katalog, yang ini ada...  ] â”‚ â”‚
â”‚  â”‚  [                                                      ] â”‚ â”‚
â”‚  â”‚  Minimal 20 karakter                                     â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Foto Referensi (opsional, tapi disarankan)             â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”‚ â”‚
â”‚  â”‚  â”‚                                                    â”‚    â”‚ â”‚
â”‚  â”‚  â”‚  [Drop foto di sini] atau [Pilih File]          â”‚    â”‚ â”‚
â”‚  â”‚  â”‚  Maksimal 3 foto, JPG/PNG, 5MB each              â”‚    â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Jumlah Diminta *                                        â”‚ â”‚
â”‚  â”‚  [- 1 +]                                                 â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  [Kirim Permintaan]                                      â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Ajukan Custom PO    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Mau beli barang yang   â”‚ â”‚
â”‚ â”‚ nggak ada di katalog?  â”‚ â”‚
â”‚ â”‚ Kirim link produk,     â”‚ â”‚
â”‚ â”‚ tim kami kasih estimasiâ”‚ â”‚
â”‚ â”‚ 1-2 hari kerja.        â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ Link Produk Referensi *    â”‚
â”‚ [https://taobao.com/...]   â”‚
â”‚                            â”‚
â”‚ Deskripsi Spesifikasi *    â”‚
â”‚ [                          ] â”‚
â”‚ [  Mau beli sepatu...      ] â”‚
â”‚ [  running brand X...     ] â”‚
â”‚                            â”‚
â”‚ Foto Referensi             â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ [Drop/Pilih File]      â”‚ â”‚
â”‚ â”‚ Max 3, JPG/PNG, 5MB   â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ Jumlah Diminta *           â”‚
â”‚ [- 1 +]                    â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Kirim Permintaan]        â”‚ â† sticky CTA
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Mobile: back button, title "Ajukan Custom PO"

### Section 2: Page Title + Info Box
- **Title:** "Ajukan Custom PO" (H1)
- **Info Box:** 
  - Background: #F7F3EC
  - Border-left: 4px solid #C8102E
  - Padding: 16px
  - Text: "Mau beli barang yang nggak ada di katalog? Kirim link produk dari China, tim kami akan kasih estimasi harga dalam 1-2 hari kerja."

### Section 3: Form
- **Container:** Card, padding 24px desktop / 16px mobile
- **Fields:**
  1. **Link Produk Referensi** (required)
     - Input type: url
     - Placeholder: "https://taobao.com/..."
     - Helper: "Contoh: link Taobao, 1688, atau AliExpress"
  2. **Deskripsi Spesifikasi** (required, textarea)
     - Min length: 20 characters
     - Placeholder: "Mau beli sepatu running brand X, size 42, warna hitam..."
     - Helper: "Minimal 20 karakter. Jelaskan detail spesifikasi yang kamu mau."
  3. **Foto Referensi** (optional, multi-upload)
     - Max files: 3
     - Format: JPG, PNG
     - Max size: 5MB each
     - Upload zone: same style as upload-bukti.md
     - Preview: thumbnail grid (max 3, 80x80px each)
  4. **Jumlah Diminta** (required)
     - Stepper component
     - Min: 1, Max: 999

### Section 4: Submit Button
- **Component:** Button Primary, full width
- **Label:** "Kirim Permintaan"
- **Behavior:** Validate form â†’ submit â†’ redirect to `/permintaan-po/[id]`

---

## States

### Loading (Submitting)
- Button: spinner + "Mengirim..."
- Disable all inputs

### Validation Error
- Inline error messages per field
- Border: 2px #9B4D50
- Error text: 12px, #9B4D50

### Success
- Redirect to `/permintaan-po/[id]`
- Toast: "Permintaan PO terkirim. Tunggu review admin ya."

### File Upload Preview
- After file selected: thumbnail 80x80px in grid
- Remove button (X) on each thumbnail
- Upload progress bar (if multiple files)

### File Upload Error
- Toast: "Gagal upload foto. Coba lagi."
- Remove file from preview

---

## Interactions

### Form Validation
- Link: URL format check on blur
- Deskripsi: character count display (e.g., "25/20 minimal"), validate min on blur
- Foto: file validation on select (type, size)
- Jumlah: stepper validation (min 1)

### Submit
- Validate all fields
- If valid: API call (POST /api/permintaan-po)
- If photo: upload to R2 first, then submit URLs
- On success: redirect to detail PO page

---

## Edge Cases

### No Link, Only Description
- Link required: block submit
- Error: "Link produk wajib diisi"

### Too Many Photos (>3)
- Reject 4th file
- Toast: "Maksimal 3 foto"

### Very Long Description
- Max 1000 characters (textarea auto-resize, max 10 lines)
- Show character count: "500/1000"

### Jumlah Very Large (999+)
- Max 999
- If > 999: disable + button, toast "Maksimal 999 unit per PO"

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in submit button
2. âŒ NO "SUBMIT REQUEST" (use "Kirim Permintaan")
3. âŒ NO required login reminder (user already logged in to access this)
4. âŒ NO price estimate field (admin provides that)
5. âŒ NO shipping address field (filled later when approving offer)
6. âŒ NO "Similar products" suggestion
7. âŒ NO mandatory photo (optional, disarankan only)

---

## Copy

### Page Title (H1)
```
Ajukan Custom PO
```

### Info Box
```
Mau beli barang yang nggak ada di katalog?
Kirim link produk dari China, tim kami akan kasih estimasi harga dalam 1-2 hari kerja.
```

### Form Labels
```
Link Produk Referensi
Contoh: link Taobao, 1688, atau AliExpress

Deskripsi Spesifikasi
Minimal 20 karakter. Jelaskan detail spesifikasi yang kamu mau.

Foto Referensi
Opsional, tapi disarankan. Maksimal 3 foto, JPG/PNG, 5MB each.

Jumlah Diminta
```

### Submit Button
```
Kirim Permintaan
```

### Placeholders
```
https://taobao.com/...
Mau beli sepatu running brand X, size 42, warna hitam...
```

### Toast Success
```
Permintaan PO terkirim. Tunggu review admin ya.
```

### Validation Errors
```
Link produk wajib diisi
Link tidak valid, cek formatnya
Deskripsi minimal 20 karakter
Jumlah minimal 1
```

### File Upload Zone
```
[Drop foto di sini]
atau [Pilih File]
Maksimal 3 foto, JPG/PNG, 5MB each
```
