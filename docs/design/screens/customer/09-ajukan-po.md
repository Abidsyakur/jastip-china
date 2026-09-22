---
title: "Screen 09: Ajukan Custom PO"
tags: [screen, customer, revenue]
tanggal: 2026-09-21
---
# Screen 09: Ajukan Custom PO

## Tujuan
Customer ajukan permintaan produk off-catalog (tidak ada di katalog). Upload link referensi + spesifikasi + foto.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Ajukan Custom PO                                            │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │  Mau beli barang yang nggak ada di katalog?              │ │
│  │  Kirim link produk dari China, tim kami akan kasih       │ │
│  │  estimasi harga dalam 1-2 hari kerja.                   │ │
│  │                                                           │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Form Permintaan                                         │ │
│  │                                                           │ │
│  │  Link Produk Referensi *                                 │ │
│  │  [https://taobao.com/...]                                │ │
│  │  Contoh: link Taobao, 1688, atau AliExpress             │ │
│  │                                                           │ │
│  │  Deskripsi Spesifikasi *                                 │ │
│  │  [                                                      ] │ │
│  │  [  Mau beli sepatu running brand X, size 42, warna    ] │ │
│  │  [  hitam. Beda sama yang di katalog, yang ini ada...  ] │ │
│  │  [                                                      ] │ │
│  │  Minimal 20 karakter                                     │ │
│  │                                                           │ │
│  │  Foto Referensi (opsional, tapi disarankan)             │ │
│  │  ┌──────────────────────────────────────────────────┐    │ │
│  │  │                                                    │    │ │
│  │  │  [Drop foto di sini] atau [Pilih File]          │    │ │
│  │  │  Maksimal 3 foto, JPG/PNG, 5MB each              │    │ │
│  │  └──────────────────────────────────────────────────┘    │ │
│  │                                                           │ │
│  │  Jumlah Diminta *                                        │ │
│  │  [- 1 +]                                                 │ │
│  │                                                           │ │
│  │  [Kirim Permintaan]                                      │ │
│  │                                                           │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Ajukan Custom PO    │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ Mau beli barang yang   │ │
│ │ nggak ada di katalog?  │ │
│ │ Kirim link produk,     │ │
│ │ tim kami kasih estimasi│ │
│ │ 1-2 hari kerja.        │ │
│ └────────────────────────┘ │
│                            │
│ Link Produk Referensi *    │
│ [https://taobao.com/...]   │
│                            │
│ Deskripsi Spesifikasi *    │
│ [                          ] │
│ [  Mau beli sepatu...      ] │
│ [  running brand X...     ] │
│                            │
│ Foto Referensi             │
│ ┌────────────────────────┐ │
│ │ [Drop/Pilih File]      │ │
│ │ Max 3, JPG/PNG, 5MB   │ │
│ └────────────────────────┘ │
│                            │
│ Jumlah Diminta *           │
│ [- 1 +]                    │
│                            │
├──────────────────────────┤
│ [Kirim Permintaan]        │ ← sticky CTA
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘
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
- **Behavior:** Validate form → submit → redirect to `/permintaan-po/[id]`

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

1. ❌ NO "→" in submit button
2. ❌ NO "SUBMIT REQUEST" (use "Kirim Permintaan")
3. ❌ NO required login reminder (user already logged in to access this)
4. ❌ NO price estimate field (admin provides that)
5. ❌ NO shipping address field (filled later when approving offer)
6. ❌ NO "Similar products" suggestion
7. ❌ NO mandatory photo (optional, disarankan only)

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
