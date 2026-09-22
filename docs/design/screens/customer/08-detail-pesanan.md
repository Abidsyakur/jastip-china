---
title: "Screen 08: Detail Pesanan (Lacak)"
tags: [screen, customer, revenue]
tanggal: 2026-09-21
---
# Screen 08: Detail Pesanan (Lacak)

## Tujuan
Customer lihat detail pesanan: item, alamat, biaya, status pipeline (lacak), info pengiriman, dan akses ke upload bukti / komplain.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│  Home / Riwayat / INV-20240120-I9J0K1L2  (breadcrumb)        │
│                                                                │
│  Pesanan INV-20240120-I9J0K1L2                               │
│  [Menunggu Pembayaran]                                       │
│  20 Jan 2024, 19:45 WIB                                      │
│                                                                │
│  ●━━━○━━━○━━━○━━━○                                           │
│  Bayar  Proses  Konsol  Lokal  Selesai                      │
│                                                                │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │ Item Pesanan             │  │ Info Pengiriman          │  │
│  │                          │  │                          │  │
│  │ ┌──┐ Tas Backpack        │  │ Penerima: Budi Santoso   │  │
│  │ │  │ Premium (Hitam)     │  │ No. Telp: 081234567890   │  │
│  │ └──┘ Rp 282.000 x1       │  │                          │  │
│  │      Subtotal: 282.000   │  │ Jl. Merdeka No. 123      │  │
│  │                          │  │ RT 01 RW 02              │  │
│  │ ┌──┐ Kaos Oversized      │  │ Bandung, Jawa Barat      │  │
│  │ │  │ (Size L Hitam)      │  │ 40123                    │  │
│  │ └──┘ Rp 35.250 x2        │  │                          │  │
│  │      Subtotal: 70.500    │  │ Kurir: JNE REG           │  │
│  │                          │  │ No. Resi: -              │  │
│  └──────────────────────────┘  │ Estimasi: -              │  │
│                                └──────────────────────────┘  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Rincian Biaya                                            │ │
│  │                                                          │ │
│  │ Subtotal Produk:        Rp 352.500                       │ │
│  │ Biaya Jasa Titip (10%): Rp 35.250                        │ │
│  │ Ongkir China:           Rp 150.000                       │ │
│  │ Ongkir Domestik:         Rp 25.000                        │ │
│  │ ─────────────────────────────────                        │ │
│  │ Total:                   Rp 562.750                       │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  [Upload Bukti Pembayaran]  [Ajukan Komplain]               │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Detail Pesanan      │
├──────────────────────────┤
│                            │
│ INV-20240120-I9J0K1L2     │
│ [Menunggu Pembayaran]      │
│ 20 Jan 2024, 19:45 WIB    │
│                            │
│ ●━━━○━━━○━━━○━━━○        │
│ Bayar Proses Kon Lok Selesai│
│                            │
│ ┌────────────────────────┐ │
│ │ Item Pesanan           │ │
│ │                        │ │
│ │ ┌──┐ Tas Backpack       │ │
│ │ │  │ Premium (Hitam)    │ │
│ │ └──┘ 282.000 x1         │ │
│ │                        │ │
│ │ ┌──┐ Kaos Oversized     │ │
│ │ │  │ (Size L Hitam)     │ │
│ │ └──┘ 35.250 x2          │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Info Pengiriman        │ │
│ │                        │ │
│ │ Penerima: Budi Santoso  │ │
│ │ 081234567890            │ │
│ │ Jl. Merdeka No. 123     │ │
│ │ Bandung, Jawa Barat     │ │
│ │ 40123                   │ │
│ │                        │ │
│ │ Kurir: JNE REG          │ │
│ │ No. Resi: -             │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Rincian Biaya          │ │
│ │                        │ │
│ │ Subtotal:    352.500   │ │
│ │ Jasa Titip:   35.250   │ │
│ │ Ongkir China: 150.000  │ │
│ │ Ongkir Domestik: 25.000│ │
│ │ ────────────────────── │ │
│ │ Total:       562.750   │ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│ [Upload Bukti]            │ ← sticky CTA (if menunggu bayar)
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘
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
  - Subtotal: harga × qty

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
  - MENUNGGU_PEMBAYARAN: "Upload Bukti Pembayaran" (primary) → `/pesanan/[id]/pembayaran`
  - SELESAI: "Ajukan Komplain" (secondary) → `/pesanan/[id]/komplain`
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
- Hover completed/active node → tooltip with timestamp
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

1. ❌ NO "→" in action buttons
2. ❌ NO "TRACK ORDER" label ALL-CAPS
3. ❌ NO auto-refresh status (let user pull to refresh)
4. ❌ NO live chat widget
5. ❌ NO "Reorder" button (MVP scope)
6. ❌ NO "Add review" section (backlog)
7. ❌ NO print invoice button (MVP scope)
8. ❌ NO share order to social media

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
────────────────────────────────
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
