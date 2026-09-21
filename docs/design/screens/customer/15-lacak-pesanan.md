# Screen 15: Lacak Pesanan

## Tujuan
Customer lacak status pesanan via input nomor invoice (atau deep-link dari notifikasi). Halaman standalone, bisa akses tanpa login (track publik).

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Lacak Pesanan                                               │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Masukkan No. Invoice                                    │ │
│  │  [INV-20240120-I9J0K1L2____________________] [Lacak]    │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  (After search - result):                                     │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  INV-20240120-I9J0K1L2          [Diproses Admin]        │ │
│  │  20 Jan 2024                                          │ │
│  │                                                          │ │
│  │  ●━━━●━━━○━━━○━━━○                                     │ │
│  │  Bayar  Proses  Konsol  Lokal  Selesai                │ │
│  │                                                          │ │
│  │  Detail Status:                                         │ │
│  │  ┌────────────────────────────────────────────────────┐ │ │
│  │  │ ✓ Bayar           20 Jan 2024, 19:45 WIB          │ │ │
│  │  │ ✓ Verifikasi      21 Jan 2024, 09:15 WIB          │ │ │
│  │  │ ● Diproses Admin  21 Jan 2024, 10:00 WIB (current)│ │ │
│  │  │ ○ Dikonsolidasi  -                                 │ │ │
│  │  │ ○ Tiba Lokal      -                                 │ │ │
│  │  │ ○ Selesai          -                                 │ │ │
│  │  └────────────────────────────────────────────────────┘ │ │
│  │                                                          │ │
│  │  No. Resi: JNE-1234567890   (if available)             │ │
│  │  Kurir: JNE REG                                         │ │
│  │                                                          │ │
│  │  [Lihat Detail Pesanan] (if logged in & own order)     │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Lacak Pesanan      │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ Masukkan No. Invoice   │ │
│ │ [INV-20240120-...____] │ │
│ │            [Lacak]     │ │
│ └────────────────────────┘ │
│                            │
│ (After search):             │
│                            │
│ ┌────────────────────────┐ │
│ │ INV-20240120-I9J0K1L2  │ │
│ │ [Diproses Admin]       │ │
│ │ 20 Jan 2024            │ │
│ │                        │ │
│ │ ●━━●━━○━━○━━○          │ │
│ │ B P K L S              │ │
│ │                        │ │
│ │ Detail Status:         │ │
│ │ ✓ Bayar                │ │
│ │   20 Jan, 19:45        │ │
│ │ ✓ Verifikasi           │ │
│ │   21 Jan, 09:15        │ │
│ │ ● Diproses Admin       │ │
│ │   21 Jan, 10:00        │ │
│ │ ○ Dikonsolidasi        │ │
│ │   -                    │ │
│ │ ○ Tiba Lokal           │ │
│ │   -                    │ │
│ │ ○ Selesai              │ │
│ │   -                    │ │
│ │                        │ │
│ │ No. Resi: JNE-123456789│ │
│ │ Kurir: JNE REG         │ │
│ └────────────────────────┘ │
│                            │
│ [Lihat Detail Pesanan]    │
│                            │
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘

(Empty Result):
┌──────────────────────────┐
│  [icon: search-x]         │
│                            │
│  Pesanan nggak ketemu     │
│  Cek lagi nomor invoice   │
│  kamu.                     │
│                            │
│  [Coba Lagi]              │
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- Standard nav, "Cara Order" or "Lacak" active
- Mobile: back button, title "Lacak Pesanan"

### Section 2: Search Box
- **Layout:** Centered, max-width 600px, margin 32px top
- **Content:**
  - Label: "Masukkan No. Invoice" (Inter 500, 14px)
  - Input + "Lacak" button (inline, button right of input)
  - Input: text, monospace, placeholder "INV-20240120-I9J0K1L2"
  - Validation: format check (INV-YYYYMMDD-XXXXXX)
- **Behavior:** Enter key → search, or click "Lacak"

### Section 3: Result Card
- **Layout:** Full width (max 600px center), margin 24px top
- **Content:**
  - Invoice number + status badge
  - Tanggal
  - Timeline (horizontal compact): 5 nodes
  - Detail status (vertical list with timestamps)
  - No. Resi (if available, copyable)
  - Kurir name
- **Action (conditional):** "Lihat Detail Pesanan" if logged in AND owns this order → `/pesanan/[id]`

### Section 4: Empty Result
- **Trigger:** Invoice not found or invalid format
- **Content:**
  - Icon: search-x (line, 80x80px, #E8DCC8)
  - Title: "Pesanan nggak ketemu" (Noto Serif SC 500, 20px)
  - Desc: "Cek lagi nomor invoice kamu." (Inter 400, 14px)
  - CTA: "Coba Lagi" (clear input, focus)

---

## States

### Loading (Searching)
- "Lacak" button: spinner
- Show skeleton result card (shimmer)

### Error (Network)
- Toast: "Gagal lacak. Coba lagi."
- Keep input value

### No Input (Empty search)
- Don't show result card
- Show helper: "Masukin nomor invoice kamu buat lacak status pesanan."

### Deep Link (from notifikasi WhatsApp)
- URL: `/lacak?inv=INV-20240120-I9J0K1L2`
- Auto-fill input + auto-search on mount

---

## Interactions

### Search
- Input + click "Lacak" (or Enter) → validate format → API GET /api/pesanan/track?inv=X
- If valid + found: show result card
- If invalid format: inline error "Format invoice: INV-YYYYMMDD-XXXXXX"
- If not found: show empty result

### Copy No. Resi
- If resi available: tap to copy
- Tooltip: "No. resi tersalin!"

### Lihat Detail Pesanan
- Only visible if: user logged in + this invoice belongs to them
- Click → navigate to `/pesanan/[id]`

### Pull to Refresh (Mobile)
- If result shown: pull down → refetch status
- Update timeline if changed

---

## Edge Cases

### Invoice Belongs to Other User
- Show status (public tracking allowed)
- Don't show "Lihat Detail Pesanan" link
- Privacy: only status + resi visible, no customer info

### Invoice Format Invalid
- Real-time validation as user types
- Helper: "Format: INV-YYYYMMDD-XXXXXX"

### Very Old Invoice (> 6 months)
- Still trackable if in database
- Note: "Pesanan lama. Data mungkin nggak lengkap."

### Resi Not Yet Assigned
- Show "No. Resi: -"
- Helper: "Resi akan muncul setelah dikirim dari China"

---

## WHAT NOT TO DO

1. ❌ NO "→" in "Lacak" button
2. ❌ NO "TRACK ORDER" ALL-CAPS
3. ❌ NO required login to track (public access)
4. ❌ NO live auto-refresh (let user manually refresh)
5. ❌ NO map/GPS tracking (we don't have courier API integration)
6. ❌ NO "Estimated delivery countdown"
7. ❌ NO courier deep-link (JNE/J&T external tracking, backlog)

---

## Copy

### Page Title (H1)
```
Lacak Pesanan
```

### Search
```
Masukkan No. Invoice
[INV-20240120-I9J0K1L2]  [Lacak]
Format: INV-YYYYMMDD-XXXXXX
```

### Result
```
INV-20240120-I9J0K1L2
[Diproses Admin]
20 Jan 2024

●━━●━━○━━○━━○
Bayar Proses Konsol Lokal Selesai

Detail Status:
✓ Bayar
  20 Jan 2024, 19:45 WIB
✓ Verifikasi
  21 Jan 2024, 09:15 WIB
● Diproses Admin
  21 Jan 2024, 10:00 WIB
○ Dikonsolidasi
  -
○ Tiba Lokal
  -
○ Selesai
  -

No. Resi: JNE-1234567890
Kurir: JNE REG

[Lihat Detail Pesanan]
```

### Empty Result
```
Pesanan nggak ketemu
Cek lagi nomor invoice kamu.
[Coba Lagi]
```

### Helper (No Input)
```
Masukin nomor invoice kamu buat lacak status pesanan.
```

### Toasts
```
Gagal lacak. Coba lagi.
No. resi tersalin!
```
