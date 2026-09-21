# Screen 20: Ajukan Komplain

## Tujuan
Customer ajukan komplain untuk pesanan SELESAI. Form dedicated: pilih item (jika multi-item), alasan, deskripsi, foto wajib. SLA jelas.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│  Home / Riwayat / INV-... / Komplain  (breadcrumb)           │
│                                                                │
│  Ajukan Komplain                                              │
│  Pesanan INV-20240115-A1B2C3D4                                │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Info box                                                │ │
│  │  Komplain cuma bisa buat pesanan yang udah selesai.     │ │
│  │  Admin respon maksimal 2x24 jam hari kerja.              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Item yang Dikomplain *                                  │ │
│  │                                                          │ │
│  │  (○) Tas Backpack Premium (Hitam) — Rp 282.000 x1      │ │
│  │  (○) Kaos Oversized (Size L Hitam) — Rp 35.250 x2       │ │
│  │  (○) Semua item di pesanan ini                          │ │
│  │                                                          │ │
│  │  Alasan Komplain *                                       │ │
│  │  (○) Barang rusak                                        │ │
│  │  (○) Barang tidak sesuai deskripsi                       │ │
│  │  (○) Salah kirim (varian / jumlah)                       │ │
│  │  (○) Lainnya                                             │ │
│  │                                                          │ │
│  │  Deskripsi Masalah *                                     │ │
│  │  [                                                      ] │ │
│  │  [  Strap kanan tas putus pas barang sampai...        ] │ │
│  │  [                                                      ] │ │
│  │  Minimal 20 karakter                                     │ │
│  │                                                          │ │
│  │  Foto Bukti (wajib, min 1, max 5)                       │ │
│  │  ┌──────────────────────────────────────────────────┐    │ │
│  │  │                                                    │    │ │
│  │  │  [Drop foto di sini] atau [Pilih File]          │    │ │
│  │  │  JPG/PNG, max 5MB per foto                       │    │ │
│  │  └──────────────────────────────────────────────────┘    │ │
│  │  ┌──┐ ┌──┐                                               │ │
│  │  │  │ │  │  (preview uploaded)                           │ │
│  │  └──┘ └──┘                                               │ │
│  │                                                          │ │
│  │  [Kirim Komplain]                                        │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Ajukan Komplain    │
├──────────────────────────┤
│                            │
│ Ajukan Komplain            │
│ INV-20240115-A1B2C3D4     │
│                            │
│ ┌────────────────────────┐ │
│ │ Komplain cuma bisa     │ │
│ │ buat pesanan selesai.  │ │
│ │ Admin respon 2x24 jam. │ │
│ └────────────────────────┘ │
│                            │
│ Item yang Dikomplain *     │
│ (○) Tas Backpack (Hitam)   │
│ (○) Kaos Oversized (L)     │
│ (○) Semua item             │
│                            │
│ Alasan Komplain *          │
│ (○) Barang rusak           │
│ (○) Tidak sesuai deskripsi │
│ (○) Salah kirim            │
│ (○) Lainnya                │
│                            │
│ Deskripsi Masalah *        │
│ [                          ] │
│ [  Strap kanan putus...   ] │
│ [                          ] │
│ Min 20 karakter            │
│                            │
│ Foto Bukti (wajib)         │
│ ┌────────────────────────┐ │
│ │ [Drop/Pilih File]      │ │
│ │ JPG/PNG, 5MB max      │ │
│ └────────────────────────┘ │
│ ┌──┐ ┌──┐                 │
│ │  │ │  │                 │
│ └──┘ └──┘                 │
│                            │
├──────────────────────────┤
│ [Kirim Komplain]          │ ← sticky CTA
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘

(Success state):
┌──────────────────────────┐
│                            │
│        [icon: check]       │
│                            │
│   Komplain terkirim        │
│   Admin respon maksimal    │
│   2x24 jam hari kerja. Kamu│
│   bakal dikabarin via      │
│   notifikasi.              │
│                            │
│   [Lihat Riwayat]         │
│   [Kembali ke Beranda]    │
│                            │
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- Breadcrumb (desktop): Home / Riwayat / [Invoice] / Komplain
- Mobile: back button (→ `/pesanan/[id]`), title "Ajukan Komplain"

### Section 2: Title + Invoice
- "Ajukan Komplain" (H1)
- "Pesanan INV-..." (Inter 500, 14px, #6B5D52, monospace for invoice)

### Section 3: Info Box
- **Background:** #F7F3EC
- **Border-left:** 4px solid #C8102E
- **Content:** "Komplain cuma bisa buat pesanan yang udah selesai. Admin respon maksimal 2x24 jam hari kerja."

### Section 4: Form
- **Fields:**
  1. **Item yang Dikomplain** (required, radio)
     - One radio per item in pesanan (nama + varian + harga + qty)
     - Plus: "Semua item di pesanan ini"
     - If pesanan has 1 item: auto-select it, hide radio group
  2. **Alasan Komplain** (required, radio)
     - Barang rusak
     - Barang tidak sesuai deskripsi
     - Salah kirim (varian / jumlah)
     - Lainnya
  3. **Deskripsi Masalah** (required, textarea)
     - Min 20 chars, max 1000
     - Placeholder with example
     - Character count display
  4. **Foto Bukti** (required, min 1, max 5)
     - Same upload zone style as upload-bukti
     - JPG/PNG, max 5MB each
     - Preview thumbnails with remove button

### Section 5: Submit
- "Kirim Komplain" (Primary, full width)
- Mobile: sticky bottom bar

### Section 6: Success State
- **Layout:** Centered, replaces form after submit
- **Content:**
  - Check icon (jade circle, 80x80px)
  - "Komplain terkirim" (H1)
  - "Admin respon maksimal 2x24 jam hari kerja. Kamu bakal dikabarin via notifikasi."
  - "Lihat Riwayat" (primary) → `/pesanan`
  - "Kembali ke Beranda" (secondary) → `/`

---

## States

### Loading (Submit)
- Button: spinner + "Mengirim..."
- Disable form

### Validation Error
- Inline per-field errors
- Foto: "Minimal 1 foto bukti wajib diupload"

### Success
- Replace form with success state (no redirect)
- Customer notified (notifikasi created)

### Already Complained (same pesanan)
- If komplain exists for this pesanan: redirect to `/pesanan/[id]` with toast "Komplain udah diajukan buat pesanan ini."
- Show link "Lihat Status Komplain"

### Pesanan Not SELESAI
- If status != SELESAI: redirect to `/pesanan/[id]` with toast "Komplain cuma bisa buat pesanan yang udah selesai."

### Single Item Pesanan
- Hide "Item yang Dikomplain" radio group
- Auto-select the only item
- Show: "Item: Tas Backpack Premium (Hitam)" as read-only text

---

## Interactions

### Item Radio
- Click → select item (instant)

### Alasan Radio
- Click → select (instant)
- If "Lainnya": show extra text input "Jelaskan alasan" (optional)

### Foto Upload
- Drop or click → validate (type, size, count) → preview thumbnail
- Remove: X on thumbnail → remove from list
- Min 1 required to submit

### Submit
- Validate all → upload fotos to R2 → POST /api/komplain → success state
- On fail: toast "Gagal kirim komplain. Coba lagi."

---

## Edge Cases

### Many Items (10+)
- Radio list scrollable (max-height 300px)
- "Semua item" option at top for convenience

### Very Long Description
- Max 1000 chars, counter "500/1000"
- Textarea auto-resize, max 10 lines

### Foto Upload Fail
- Toast: "Gagal upload foto. Coba lagi."
- Remove failed file

### Network Slow
- Progress indicator on upload (spinner per thumbnail)
- Don't timeout before 30s

---

## WHAT NOT TO DO

1. ❌ NO "→" in buttons
2. ❌ NO "SUBMIT COMPLAINT" (use "Kirim Komplain")
3. ❌ NO optional foto (foto WAJIB for komplain, min 1)
4. ❌ NO "Expected resolution" dropdown (customer describes, admin decides solution)
5. ❌ NO refund amount input (admin decides after review)
6. ❌ NO rating of admin response (backlog)
7. ❌ NO anonymous komplain (must be logged in + own pesanan)

---

## Copy

### Page Title (H1)
```
Ajukan Komplain
Pesanan INV-20240115-A1B2C3D4
```

### Info Box
```
Komplain cuma bisa buat pesanan yang udah selesai.
Admin respon maksimal 2x24 jam hari kerja.
```

### Form
```
Item yang Dikomplain *
(○) Tas Backpack Premium (Hitam) — Rp 282.000 x1
(○) Kaos Oversized (Size L Hitam) — Rp 35.250 x2
(○) Semua item di pesanan ini

Alasan Komplain *
(○) Barang rusak
(○) Barang tidak sesuai deskripsi
(○) Salah kirim (varian / jumlah)
(○) Lainnya

Deskripsi Masalah *
[Strap kanan tas putus pas barang sampai...]
Minimal 20 karakter

Foto Bukti (wajib, min 1, max 5)
[Drop foto di sini] atau [Pilih File]
JPG/PNG, max 5MB per foto

[Kirim Komplain]
```

### Single Item (read-only)
```
Item: Tas Backpack Premium (Hitam)
```

### Success
```
Komplain terkirim
Admin respon maksimal 2x24 jam hari kerja.
Kamu bakal dikabarin via notifikasi.

[Lihat Riwayat]
[Kembali ke Beranda]
```

### Validation Errors
```
Pilih item yang dikomplain dulu
Pilih alasan komplain dulu
Deskripsi minimal 20 karakter
Minimal 1 foto bukti wajib diupload
Maksimal 5 foto
Cuma bisa upload JPG atau PNG
Ukuran foto kebanyakan. Maksimal 5MB.
```

### Toasts
```
Komplain udah diajukan buat pesanan ini.
Komplain cuma bisa buat pesanan yang udah selesai.
Gagal kirim komplain. Coba lagi.
```
