# Screen 06: Upload Bukti Pembayaran

## Tujuan
Customer upload bukti transfer bank. Halaman tujuan setelah checkout, atau dari riwayat pesanan yang statusnya MENUNGGU_BUKTI.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Upload Bukti Pembayaran                                      │
│  No. Invoice: INV-20240120-I9J0K1L2                          │
│                                                                │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │                          │  │ Total Bayar:             │  │
│  │  Transfer ke:            │  │ Rp 365.575               │  │
│  │                          │  │                           │  │
│  │  BCA                     │  │ Status:                   │  │
│  │  1234567890              │  │ [Menunggu Bukti]         │  │
│  │  PT Jastip China         │  │                           │  │
│  │                          │  │ Kedaluwarsa dalam:       │  │
│  │  [Salin]                 │  │ 23 jam 45 menit          │  │
│  │                          │  │                           │  │
│  │  Mandiri                 │  │                           │  │
│  │  9876543210              │  │                           │  │
│  │  PT Jastip China         │  │                           │  │
│  │                          │  │                           │  │
│  │  [Salin]                 │  │                           │  │
│  └──────────────────────────┘  └──────────────────────────┘  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │                                                           │ │
│  │            [Drop bukti di sini]                         │ │
│  │            atau [Pilih File]                            │ │
│  │                                                           │ │
│  │  Format: JPG, PNG, PDF                                   │ │
│  │  Maksimal: 5MB                                           │ │
│  │                                                           │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  [Upload Bukti]                                               │
│                                                                │
│  Catatan: Pembayaran akan diverifikasi admin 1x24 jam.       │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Upload Bukti        │
├──────────────────────────┤
│                            │
│ No. Invoice:               │
│ INV-20240120-I9J0K1L2     │
│                            │
│ ┌────────────────────────┐ │
│ │ Total Bayar:           │ │
│ │ Rp 365.575             │ │
│ │                        │ │
│ │ Status:                │ │
│ │ [Menunggu Bukti]       │ │
│ │                        │ │
│ │ Kedaluwarsa:            │ │
│ │ 23 jam 45 menit        │ │
│ └────────────────────────┘ │
│                            │
│ Transfer ke:               │
│ ┌────────────────────────┐ │
│ │ BCA                    │ │
│ │ 1234567890             │ │
│ │ PT Jastip China        │ │
│ │            [Salin]     │ │
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │ Mandiri                │ │
│ │ 9876543210             │ │
│ │ PT Jastip China        │ │
│ │            [Salin]     │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │                        │ │
│ │  [Drop bukti di sini]  │ │
│ │  atau [Pilih File]    │ │
│ │                        │ │
│ │  JPG, PNG, PDF, 5MB   │ │
│ └────────────────────────┘ │
│                            │
│ [Upload Bukti]             │
│                            │
│ Pembayaran akan diverifikasi│
│ admin 1x24 jam.           │
│                            │
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘
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
- **Copy behavior:** Click "Salin" → clipboard + tooltip "Tersalin!"

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
  - Drag & drop: file enter → border #C8102E, background rgba(200,16,46,0.05)
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
- Show: "Buat pesanan baru" CTA → `/katalog`

### Rejected (Status: DITOLAK)
- Show: "Bukti ditolak admin: {catatanAdmin}"
- Show: rejected bukti preview
- Show: upload zone (retry with new bukti)
- Status badge: "Ditolak" (red-muted)

---

## Interactions

### File Drag & Drop
- Dragenter: border → #C8102E, bg → rgba(200,16,46,0.05)
- Dragleave: revert to default
- Drop: file validation → if OK, show preview

### File Select (Click)
- Click zone or "Pilih File" link → trigger file input
- File selected → validation → if OK, show preview

### Salin Rekening
- Click "Salin" button → clipboard API
- Tooltip: "Tersalin!" (fade in 100ms, fade out 200ms after 2s)

### Countdown Timer
- JS interval: update every minute
- Format: "X jam Y menit"
- Color: normal (#6B5D52), warning (< 2 jam: #9B4D50)
- At 0: show "Kedaluwarsa" + disable upload

### Upload Submit
- Button click → get presigned URL from API → upload to R2 → submit bukti URL to API
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

1. ❌ NO "→" in Upload button
2. ❌ NO "SUBMIT PROOF" (use "Upload Bukti")
3. ❌ NO multiple rekening in one line (use card list)
4. ❌ NO auto-submit on file select (let user click Upload)
5. ❌ NO QR code payment (MVP: manual transfer only)
6. ❌ NO "Pay with e-wallet" option
7. ❌ NO countdown timer in red large (subtle, not pressure)
8. ❌ NO "Urgent!" or "Bayar sekarang atau batal!" aggressive copy

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
