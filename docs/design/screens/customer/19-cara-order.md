---
title: "Screen 19: Cara Order"
tags: [screen, customer, statis]
tanggal: 2026-09-21
---
# Screen 19: Cara Order

## Tujuan
Panduan 6 langkah order untuk customer baru. Edukasi alur transaksi end-to-end agar customer paham sebelum belanja. Ini satu-satunya halaman yang boleh pakai angka berurutan sebagai konten fungsional (bukan dekorasi).

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Cara Order                                                   │
│  Belanja barang China dalam 6 langkah gampang               │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │      1       │  │      2       │  │      3       │        │
│  │              │  │              │  │              │        │
│  │ Pilih produk │  │   Checkout   │  │   Transfer   │        │
│  │              │  │              │  │              │        │
│  │ Cari di      │  │ Tentuin      │  │ Transfer ke  │        │
│  │ katalog atau │  │ alamat +     │  │ rekening     │        │
│  │ ajukan PO... │  │ kurir...     │  │ kami...      │        │
│  │              │  │              │  │              │        │
│  │ [Lihat       │  │ [Ke          │  │              │        │
│  │  Katalog]    │  │  Keranjang]  │  │              │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │      4       │  │      5       │  │      6       │        │
│  │              │  │              │  │              │        │
│  │ Upload bukti │  │  Kami belikan│  │   Sampai di  │        │
│  │              │  │              │  │    rumahmu   │        │
│  │ Upload bukti │  │ Tim kami     │  │ Kurir antar  │        │
│  │ transfer,    │  │ belikan +    │  │ ke alamatmu. │        │
│  │ admin verif..│  │ kirim...     │  │ Lacak di...  │        │
│  │              │  │              │  │              │        │
│  │              │  │              │  │ [Lacak       │        │
│  │              │  │              │  │  Pesanan]    │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Masih bingung? Chat admin via WhatsApp                  │ │
│  │  [Chat WhatsApp]                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Cara Order         │
├──────────────────────────┤
│                            │
│ Cara Order                 │
│ Belanja barang China       │
│ dalam 6 langkah gampang    │
│                            │
│ ┌────────────────────────┐ │
│ │  1  Pilih produk       │ │
│ │     Cari di katalog    │ │
│ │     atau ajukan PO.    │ │
│ │     [Lihat Katalog]    │ │
│ ├────────────────────────┤ │
│ │  2  Checkout           │ │
│ │     Tentuin alamat +   │ │
│ │     kurir.             │ │
│ ├────────────────────────┤ │
│ │  3  Transfer           │ │
│ │     Transfer ke        │ │
│ │     rekening kami.     │ │
│ ├────────────────────────┤ │
│ │  4  Upload bukti       │ │
│ │     Upload bukti,      │ │
│ │     admin verifikasi.  │ │
│ ├────────────────────────┤ │
│ │  5  Kami belikan       │ │
│ │     Tim belikan +      │ │
│ │     kirim.             │ │
│ ├────────────────────────┤ │
│ │  6  Sampai di rumahmu  │ │
│ │     Lacak di halaman   │ │
│ │     lacak.             │ │
│ │     [Lacak Pesanan]    │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Masih bingung?         │ │
│ │ [Chat WhatsApp]        │ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- Standard nav, "Cara Order" active
- Mobile: back button, title "Cara Order"

### Section 2: Title + Subtitle
- **Title:** "Cara Order" (H1, Noto Serif SC 700, 32px desktop / 24px mobile)
- **Subtitle:** "Belanja barang China dalam 6 langkah gampang" (Inter 400, 16px, #6B5D52)

### Section 3: Steps Grid
- **Layout (Desktop):** 3-col grid, 2 rows (steps 1-3 top, 4-6 bottom), gap 24px
- **Layout (Tablet):** 2-col grid, 3 rows
- **Layout (Mobile):** Vertical list, 1 col, dividers between steps
- **Each step card:**
  ```
  Background: #FFFFFF
  Border: 1px solid #E8DCC8
  Radius: 12px
  Padding: 24px desktop / 16px mobile
  Content:
    - Step number (circle, 40x40px, background Chinese Red, white text, Noto Serif SC 700, 20px)
    - Title (Noto Serif SC 600, 18px)
    - Description (Inter 400, 14px, #6B5D52, 2-3 sentences)
    - Link (optional, steps 1, 2, 6 only): ghost link, Chinese Red
  ```

### Section 4: Help Box
- **Layout:** Card, full width, margin 48px top
- **Background:** #F7F3EC
- **Border-left:** 4px solid #7C9885 (jade, friendly tone)
- **Content:** "Masih bingung? Chat admin via WhatsApp" + "Chat WhatsApp" button

---

## States

### Loading
- Static page, renders instantly, no skeleton

### Error
- N/A (no API dependency)

---

## Interactions

### Step Links
- Step 1 "Lihat Katalog" → `/katalog`
- Step 2 "Ke Keranjang" → `/keranjang`
- Step 6 "Lacak Pesanan" → `/lacak`
- Other steps: no link (info only)

### Chat WhatsApp
- Click → wa.me link, new tab

---

## Edge Cases

### User Already Knows Flow
- Page is reference, not forced wizard
- No "Next/Prev" navigation, all steps visible at once

---

## WHAT NOT TO DO

1. ❌ NO "→" in buttons
2. ❌ NO "HOW TO ORDER" / "STEP BY STEP" ALL-CAPS eyebrow
3. ❌ NO animated step connector line with moving dot
4. ❌ NO auto-play video tutorial
5. ❌ NO "Start Shopping Now!" aggressive CTA at bottom
6. ❌ NO decorative 01/02/03 large background numbers (the small numbered circles ARE the content, keep them 40px, functional, not decorative wallpaper)
7. ❌ NO gradient background

---

## Copy

### Page Title (H1)
```
Cara Order
Belanja barang China dalam 6 langkah gampang
```

### Steps

```
1. Pilih produk
Cari di katalog ready stock, atau ajukan Custom PO kalau barangnya nggak ada di katalog. Tentuin varian + jumlah.
[Lihat Katalog]

2. Checkout
Masukin keranjang, terus checkout. Pilih alamat pengiriman + kurir domestik. Cek rincian biaya sebelum lanjut bayar.
[Ke Keranjang]

3. Transfer
Transfer total bayar ke rekening bank kami (BCA / Mandiri). Nominal harus pas sesuai invoice.

4. Upload bukti
Upload foto bukti transfer di halaman pembayaran. Admin verifikasi maksimal 1x24 jam. Tunggu notifikasi.

5. Kami belikan
Setelah pembayaran terverifikasi, tim kami belikan barang dari China, konsolidasi, terus kirim ke Indonesia.

6. Sampai di rumahmu
Kurir domestik antar ke alamatmu. Lacak status kapan aja pakai nomor invoice.
[Lacak Pesanan]
```

### Help Box
```
Masih bingung? Chat admin via WhatsApp
[Chat WhatsApp]
```
