# Screen 14: Detail Permintaan PO

## Tujuan
Customer lihat detail permintaan PO yang diajukan, termasuk penawaran harga dari admin (jika ada), dan aksi: setuju/tolak penawaran.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│  Home / Akun / Permintaan PO / PO-20240120-001  (breadcrumb) │
│                                                                │
│  Permintaan PO PO-20240120-001                                │
│  [Menunggu Penawaran]                                         │
│  20 Jan 2024, 19:45 WIB                                      │
│                                                                │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │  Detail Permintaan       │  │  Penawaran Admin          │  │
│  │                          │  │                          │  │
│  │  Link Produk:            │  │  Status:                  │  │
│  │  https://taobao.com/...  │  │  [Sudah Ditawarkan]      │  │
│  │  [Buka Link]             │  │                          │  │
│  │                          │  │  Harga per Unit:         │  │
│  │  Deskripsi:               │  │  Rp 450.000              │  │
│  │  Sepatu running brand X  │  │                          │  │
│  │  size 42 warna hitam...  │  │  Jumlah: 1               │  │
│  │                          │  │                          │  │
│  │  Foto Referensi:         │  │  Subtotal:               │  │
│  │  ┌──┐ ┌──┐ ┌──┐          │  │  Rp 450.000              │  │
│  │  │  │ │  │ │  │          │  │                          │  │
│  │  └──┘ └──┘ └──┘          │  │  Biaya Jasa Titip (10%): │  │
│  │                          │  │  Rp 45.000               │  │
│  │  Jumlah Diminta: 1       │  │                          │  │
│  │                          │  │  Estimasi Ongkir:        │  │
│  │  Catatan Kamu:            │  │  Rp 150.000              │  │
│  │  (jika ada)               │  │                          │  │
│  │                          │  │  ──────────────           │  │
│  │                          │  │  Total Estimasi:         │  │
│  │                          │  │  Rp 645.000              │  │
│  │                          │  │                          │  │
│  │                          │  │  Catatan Admin:           │  │
│  │                          │  │  Produk ini available,  │  │
│  │                          │  │  tapi pengiriman butuh  │  │
│  │                          │  │  2 minggu.               │  │
│  │                          │  │                          │  │
│  │                          │  │  [Setuju & Lanjut]       │  │
│  │                          │  │  [Tolak Penawaran]       │  │
│  │                          │  │                          │  │
│  └──────────────────────────┘  └──────────────────────────┘  │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Detail Permintaan   │
├──────────────────────────┤
│                            │
│ PO-20240120-001            │
│ [Menunggu Penawaran]       │
│ 20 Jan 2024, 19:45 WIB    │
│                            │
│ ┌────────────────────────┐ │
│ │ Detail Permintaan      │ │
│ │                        │ │
│ │ Link Produk:           │ │
│ │ https://taobao.com/... │ │
│ │ [Buka Link]            │ │
│ │                        │ │
│ │ Deskripsi:             │ │
│ │ Sepatu running brand X │ │
│ │ size 42 warna hitam... │ │
│ │                        │ │
│ │ Foto Referensi:        │ │
│ │ ┌──┐ ┌──┐ ┌──┐         │ │
│ │ └──┘ └──┘ └──┘         │ │
│ │                        │ │
│ │ Jumlah Diminta: 1      │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Penawaran Admin        │ │
│ │                        │ │
│ │ Status:                │ │
│ │ [Sudah Ditawarkan]     │ │
│ │                        │ │
│ │ Harga per Unit:        │ │
│ │ Rp 450.000             │ │
│ │                        │ │
│ │ Jumlah: 1              │ │
│ │ Subtotal: 450.000      │ │
│ │ Jasa Titip: 45.000     │ │
│ │ Estimasi Ongkir: 150K  │ │
│ │ ──────────────          │ │
│ │ Total Estimasi:        │ │
│ │ Rp 645.000             │ │
│ │                        │ │
│ │ Catatan Admin:         │ │
│ │ Produk available,      │ │
│ │ pengiriman butuh       │ │
│ │ 2 minggu.              │ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│ [Setuju] [Tolak]          │ ← sticky CTA (if ditawar)
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- Breadcrumb (desktop): Home / Akun / Permintaan PO / [PO-ID]
- Mobile: back button, title "Detail Permintaan"

### Section 2: Header Info
- PO number (H1, Noto Serif SC 700, 24px desktop / 20px mobile)
- Status badge:
  - MENUNGGU_PENAWARAN: "Menunggu Penawaran" (gold)
  - SUDAH_DITAWAR: "Sudah Ditawarkan" (jade)
  - DITERIMA: "Diterima" (jade)
  - DITOLAK: "Ditolak" (red-muted)
  - KADALUWARSA: "Kadaluwarsa" (grey)
- Tanggal ajukan (Inter 400, 14px, #6B5D52)

### Section 3: Detail Permintaan (Left/Top)
- **Layout:** Card container
- **Content:**
  - **Link Produk:** URL display (truncated) + "Buka Link" button (ghost, opens new tab)
  - **Deskripsi:** Full text (read-only)
  - **Foto Referensi:** Thumbnail grid (max 3, 80x80px each, click → fullscreen)
  - **Jumlah Diminta:** Number display
  - **Catatan Kamu:** (if ada) optional field, user's note when submitting

### Section 4: Penawaran Admin (Right/Bottom)
- **Layout:** Card container
- **Conditional:** Only show content if status = SUDAH_DITAWAR or DITERIMA
- **Content:**
  - Status: "Sudah Ditawarkan"
  - Harga per Unit (Noto Serif SC 700, 24px, gold)
  - Jumlah (echo from permintaan)
  - Subtotal (harga × jumlah)
  - Biaya Jasa Titip (10% of subtotal, min Rp 15.000)
  - Estimasi Ongkir (from admin input)
  - Divider
  - Total Estimasi (Noto Serif SC 700, 28px, gold)
  - Catatan Admin (textarea display, read-only)
- **Actions (if SUDAH_DITAWAR):**
  - "Setuju & Lanjut ke Pembayaran" (Primary) → creates pesanan from PO
  - "Tolak Penawaran" (secondary, red-tinted) → sets status DITOLAK

### Section 5: Empty Penawaran (Status: MENUNGGU_PENAWARAN)
- **Content:** "Admin lagi review permintaanmu. Penawaran akan muncul di sini dalam 1-2 hari kerja."
- **Style:** Centered text, icon clock, #6B5D52

---

## States

### Loading
- Skeleton both cards

### MENUNGGU_PENAWARAN
- Penawaran card: empty state (waiting message)
- No action buttons

### SUDAH_DITAWAR
- Penawaran card: full content
- Action buttons: Setuju + Tolak
- Mobile: sticky CTA bar

### DITERIMA
- Penawaran card: full content (read-only)
- Link: "Lihat Pesanan INV-..." → `/pesanan/[id]`
- No action buttons

### DITOLAK
- Penawaran card: show rejected offer (strikethrough or greyed)
- Note: "Penawaran ditolak. Bisa ajukan PO baru kapan aja."
- CTA: "Ajukan PO Baru" → `/ajukan-po`

### KADALUWARSA
- Permintaan expired (no response from admin in 7 days)
- Note: "Permintaan kadaluwarsa. Admin belum sempat review. Bisa ajukan ulang."
- CTA: "Ajukan Ulang" → pre-fill form with old data

---

## Interactions

### Buka Link
- Click "Buka Link" → open URL in new tab (`target="_blank"`, `rel="noopener"`)

### Foto Fullscreen
- Click thumbnail → modal fullscreen image
- Swipe through if multiple

### Setuju & Lanjut
- Click "Setuju & Lanjut ke Pembayaran" → confirm modal
- Modal: "Setuju sama penawaran ini? Kamu akan dialihkan ke pembayaran."
- Confirm → API: POST /api/pesanan/from-po → creates pesanan + redirect `/pesanan/[id]/pembayaran`
- Loading: button spinner

### Tolak Penawaran
- Click "Tolak Penawaran" → confirm modal
- Modal: "Yakin tolak penawaran? Permintaan akan ditutup."
- Optional: reason textarea (optional, not required)
- Confirm → API update status DITOLAK → refresh page

### Lihat Pesanan (if DITERIMA)
- Link → navigate to `/pesanan/[id]`

---

## Edge Cases

### Link Tidak Valid (admin found)
- Admin can update link in penawaran with note
- Display updated link + "Link diperbarui admin"

### Harga Lebih Mahal dari Estimasi Customer
- (Customer doesn't set expected price, so no comparison)
- Admin note should explain pricing

### Foto Hilang (R2 expired URL)
- Fallback: placeholder "Foto tidak tersedia"
- Or: re-fetch from API (presigned URL refresh)

### Multiple Rounds of Negotiation (Backlog)
- MVP: single offer, accept or reject
- Backlog: counter-offer flow

---

## WHAT NOT TO DO

1. ❌ NO "→" in buttons
2. ❌ NO "VIEW OFFER" ALL-CAPS
3. ❌ NO "negotiate" or "counter-offer" flow (MVP: accept/reject only)
4. ❌ NO auto-refresh for penawaran (let user pull to refresh)
5. ❌ NO live chat with admin embedded
6. ❌ NO "Add to cart from PO" (PO converts to direct pesanan)
7. ❌ NO price comparison with catalog (PO is off-catalog by nature)

---

## Copy

### Page Title (H1)
```
Permintaan PO PO-20240120-001
```

### Detail Permintaan
```
Detail Permintaan

Link Produk:
https://taobao.com/...
[Buka Link]

Deskripsi:
Sepatu running brand X, size 42, warna hitam. Beda sama yang di katalog, yang ini ada teknologi sole baru.

Foto Referensi:
[thumb1] [thumb2] [thumb3]

Jumlah Diminta: 1

Catatan Kamu:
Kalau bisa dikirim cepat, tambah ongkir gapapa.
```

### Penawaran Admin
```
Penawaran Admin

Status:
[Sudah Ditawarkan]

Harga per Unit:
Rp 450.000

Jumlah: 1

Subtotal:
Rp 450.000

Biaya Jasa Titip (10%):
Rp 45.000

Estimasi Ongkir:
Rp 150.000

──────────────────
Total Estimasi:
Rp 645.000

Catatan Admin:
Produk ini available, tapi pengiriman butuh 2 minggu karena dari gudang beda kota.

[Setuju & Lanjut ke Pembayaran]
[Tolak Penawaran]
```

### Empty Penawaran
```
Admin lagi review permintaanmu.
Penawaran akan muncul di sini dalam 1-2 hari kerja.
```

### Ditolak
```
Penawaran ditolak.
Bisa ajukan PO baru kapan aja.
[Ajukan PO Baru]
```

### Kadaluwarsa
```
Permintaan kadaluwarsa.
Admin belum sempat review. Bisa ajukan ulang.
[Ajukan Ulang]
```

### Diterima
```
Penawaran diterima.
Lihat Pesanan INV-20240120-XXX
```

### Confirm Setuju
```
Setuju sama penawaran ini?
Kamu akan dialihkan ke pembayaran.

[Ya, Lanjut]  [Batal]
```

### Confirm Tolak
```
Yakin tolak penawaran?
Permintaan akan ditutup.

Alasan (opsional):
[                    ]

[Ya, Tolak]  [Batal]
```

### Toasts
```
Permintaan diterima. Lanjut ke pembayaran.
Permintaan ditolak.
```
