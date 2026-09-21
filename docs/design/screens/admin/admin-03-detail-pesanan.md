# Screen Admin 03: Detail Pesanan

## Tujuan
Admin lihat detail pesanan, verifikasi pembayaran (approve/reject), update status (proses, kirim, selesai), update no. resi, lihat status log timeline, akses komplain (jika ada).

---

## Layout Wireframe (Desktop)

```
┌─────┬───────────────────────────────────────────────────────────┐
│     │  ← Kelola Pesanan                                         │
│  S  ├───────────────────────────────────────────────────────────┤
│  i  │                                                            │
│  d  │  INV-20240120-I9J0K1L2     [Menunggu Verifikasi]         │
│  e  │  20 Jan 2024, 19:45 WIB   Customer: budi@email.com       │
│  b  │                                                            │
│  a  │  ┌──────────────────────────┐  ┌──────────────────────┐  │
│  r  │  │  Status Pipeline         │  │  Aksi Cepat           │  │
│     │  │                          │  │                       │  │
│  D  │  │  ●━━●━━●━━○━━○━━○       │  │  [Verifikasi Bayar]  │  │
│  a  │  │  Bayar Verif Proses Kon Lok Sel  │  │  [Tolak Bayar]       │  │
│  s  │  │                          │  │                       │  │
│  h  │  │  Log:                    │  │  Update Resi:         │  │
│  b  │  │  19:45 - Pesanan dibuat  │  │  [JNE-________]       │  │
│  o  │  │  19:45 - Bukti diupload  │  │  [Update Resi]        │  │
│  a  │  │  (waiting verify)        │  │                       │  │
│  r  │  └──────────────────────────┘  └──────────────────────┘  │
│  d  │                                                            │
│     │  ┌──────────────────────────┐  ┌──────────────────────┐  │
│  P  │  │  Item Pesanan            │  │  Info Customer        │  │
│  e  │  │                          │  │                       │  │
│  s  │  │  ┌──┐ Tas Backpack       │  │  Budi Santoso         │  │
│  a  │  │  │  │ Premium (Hitam)    │  │  budi@email.com       │  │
│  n  │  │  └──┘ 282K x1 = 282K    │  │  +62 812-3456-7890    │  │
│  a  │  │                          │  │                       │  │
│  n  │  │  ┌──┐ Kaos Oversized     │  │  [Chat WhatsApp]      │  │
│     │  │  │  │ (Size L Hitam)    │  │                       │  │
│  P  │  │  └──┘ 35K x2 = 70K      │  │  Alamat:              │  │
│  r  │  └──────────────────────────┘  │  Jl. Merdeka 123     │  │
│  o  │                                  │  Bandung, 40123     │  │
│  d  │  ┌──────────────────────────┐  │                       │  │
│  u  │  │  Bukti Pembayaran        │  │  Kurir: JNE REG       │  │
│  k  │  │                          │  │  Resi: -              │  │
│     │  │  ┌────────┐              │  │  Estimasi: 3-5 hari  │  │
│  P  │  │  │        │  [Lihat]    │  └──────────────────────┘  │
│  O  │  │  │ IMAGE  │              │                              │
│     │  │  │        │              │  ┌──────────────────────┐  │
│  K  │  │  └────────┘              │  │  Rincian Biaya       │  │
│  o  │  │  Upload: 19:50 WIB       │  │                       │  │
│  m  │  │  Bank: BCA               │  │  Subtotal:  352.500   │  │
│  p  │  │  Jumlah: Rp 365.575      │  │  Jasa Titip: 35.250  │  │
│     │  └──────────────────────────┘  │  Ongkir CN: 150.000  │  │
│  L  │                                  │  Ongkir ID:  25.000  │  │
│  o  │                                  │  ──────────────       │  │
│  g  │                                  │  Total:     562.750  │  │
│     │                                  └──────────────────────┘  │
└─────┴───────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Detail Pesanan     │
├──────────────────────────┤
│                            │
│ INV-20240120-I9J0K1L2     │
│ [Menunggu Verifikasi]      │
│ 20 Jan 2024, 19:45 WIB   │
│ budi@email.com            │
│                            │
│ ┌────────────────────────┐ │
│ │ Status Pipeline        │ │
│ │ ●━●━●━○━○━○            │
│ │ B V P K L S            │ │
│ │                        │ │
│ │ Log:                   │ │
│ │ 19:45 Pesanan dibuat  │ │
│ │ 19:50 Bukti diupload  │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Aksi Cepat             │ │
│ │ [Verifikasi Bayar]    │ │
│ │ [Tolak Bayar]         │ │
│ │                        │ │
│ │ Update Resi:           │ │
│ │ [JNE-________]         │ │
│ │ [Update Resi]         │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Item Pesanan           │ │
│ │ ┌──┐ Tas Backpack      │ │
│ │ │  │ Premium (Hitam)   │ │
│ │ └──┘ 282K x1           │ │
│ │ ┌──┐ Kaos Oversized    │ │
│ │ │  │ (L Hitam)         │ │
│ │ └──┘ 35K x2            │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Bukti Pembayaran       │ │
│ │ ┌────┐                 │ │
│ │ │IMG │ [Lihat]         │ │
│ │ └────┘                 │ │
│ │ Upload: 19:50         │ │
│ │ Bank: BCA              │ │
│ │ Jumlah: Rp 365.575     │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Info Customer          │ │
│ │ Budi Santoso           │ │
│ │ budi@email.com         │ │
│ │ +62 812-3456-7890     │ │
│ │ [Chat WhatsApp]        │ │
│ │                        │ │
│ │ Alamat:                │ │
│ │ Jl. Merdeka 123        │ │
│ │ Bandung, 40123         │ │
│ │ Kurir: JNE REG         │ │
│ │ Resi: -                │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Rincian Biaya          │ │
│ │ Subtotal:    352.500   │ │
│ │ Jasa Titip:   35.250   │ │
│ │ Ongkir CN:   150.000   │ │
│ │ Ongkir ID:    25.000   │ │
│ │ ──────────────          │ │
│ │ Total:       562.750   │ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│[Dash][Order][+][Prod][More]│
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- Back link: "← Kelola Pesanan" (→ `/admin/pesanan`)
- Mobile: back button, title "Detail Pesanan"

### Section 2: Header Info
- Invoice number (H1, Noto Serif SC 700, 24px desktop / 20px mobile)
- Status badge
- Tanggal + Customer email (horizontal, Inter 400, 14px)

### Section 3: Status Pipeline + Log
- **Pipeline:** 6 nodes (Bayar, Verif, Proses, Konsol, Lokal, Selesai)
  - Completed: gold + check
  - Active: Chinese Red
  - Pending: outline
  - Dibatalkan: red-muted
- **Log (below pipeline):**
  - Timestamp + action description
  - e.g., "19:45 - Pesanan dibuat"
  - e.g., "19:50 - Bukti pembayaran diupload"
  - e.g., "09:15 - Verifikasi pembayaran (admin)"

### Section 4: Aksi Cepat (Quick Actions)
- **Conditional based on status:**
  - MENUNGGU_VERIFIKASI:
    - "Verifikasi Bayar" (Primary) → status → DIPROSES_ADMIN
    - "Tolak Bayar" (secondary, red-tinted) → status → DITOLAK + reason
  - DIPROSES_ADMIN:
    - "Update Resi" (with input field) → status → DIKIRIM
    - Resi input: text, monospace, placeholder "JNE-1234567890"
  - DIKIRIM / TIBA_KIRIM_LOKAL:
    - "Tandai Tiba" → TIBA_KIRIM_LOKAL
    - "Tandai Selesai" → SELESAI
  - SELESAI: no actions (read-only)
  - DIBATALKAN: no actions

### Section 5: Item Pesanan
- Same as customer detail-pesanan
- List of items: thumbnail + name + varian + harga + qty + subtotal

### Section 6: Bukti Pembayaran
- **Conditional:** Only if bukti uploaded (status >= MENUNGGU_VERIFIKASI)
- **Content:**
  - Thumbnail preview (200x200px or 4:3)
  - "Lihat" button → fullscreen modal
  - Upload timestamp
  - Bank (detected or from customer input)
  - Jumlah (total bayar)
- **If no bukti (MENUNGGU_PEMBAYARAN):** "Belum ada bukti. Pesanan menunggu pembayaran."

### Section 7: Info Customer
- **Content:**
  - Nama
  - Email
  - No. WhatsApp + "Chat WhatsApp" button (→ wa.me link)
  - Alamat lengkap
  - Kurir + No. Resi + Estimasi

### Section 8: Rincian Biaya
- Same as customer detail-pesanan
- Breakdown: subtotal, jasa titip, ongkir china, ongkir domestik, biaya admin, total

---

## States

### Loading
- Skeleton all cards

### Verify Loading
- "Verifikasi Bayar" button: spinner + "Memverifikasi..."
- Disable all actions

### Reject Flow
- Click "Tolak Bayar" → modal:
  - "Tolak pembayaran ini?"
  - Reason textarea (required): "Alasan penolakan"
  - [Batal] [Ya, Tolak]
- On confirm: status → DITOLAK, log updated, customer notified

### Resi Update
- Input resi + click "Update Resi" → API update
- Success: status → DIKIRIM, toast "Resi diupdate, pesanan dikirim"
- Customer notified (notifikasi)

### Status Update Success
- Pipeline updates (active node moves)
- Log adds new entry
- Toast: "Status pesanan diupdate"

---

## Interactions

### Verifikasi Bayar
- Click → confirm modal "Verifikasi pembayaran ini? Customer akan dikabarin."
- Confirm → API: PATCH /api/admin/pesanan/[id]/verify
- Status → DIPROSES_ADMIN
- Log: "Verifikasi pembayaran"
- Customer notified

### Tolak Bayar
- Click → modal with reason textarea
- Confirm → API: PATCH /api/admin/pesanan/[id]/reject
- Status → DITOLAK
- Log: "Pembayaran ditolak: [reason]"
- Customer notified with reason

### Update Resi
- Input resi + click "Update Resi"
- API: PATCH /api/admin/pesanan/[id]/resi
- Status → DIKIRIM (if was DIPROSES_ADMIN)
- Log: "No. resi diupdate: [resi]"
- Customer notified

### Tandai Tiba / Selesai
- Click → confirm → API: PATCH status
- Log updated, customer notified

### Bukti Fullscreen
- Click thumbnail → modal fullscreen image
- Close: X or click outside

### Chat WhatsApp
- Click → `window.open(wa.me/[nomor]?text=...)`
- Pre-filled: "Halo [nama], mengenai pesanan [invoice]..."

---

## Edge Cases

### Custom PO Pesanan
- Item: "Custom PO: [deskripsi]"
- Link to PO detail: "Lihat PO PO-20240120-001"

### Bukti Multiple Uploads (retry after reject)
- Show all bukti attempts (history)
- Each: timestamp + status (verified/rejected)
- Current active bukti highlighted

### Komplain on This Pesanan
- If komplain exists: show badge "Komplain Diajukan"
- Link: "Lihat Komplain" → `/admin/komplain/[id]`

### Customer No WhatsApp
- If noWa null: hide "Chat WhatsApp" button
- Show email only

### Resi Update Fail
- Toast: "Gagal update resi. Coba lagi."

---

## WHAT NOT TO DO

1. ❌ NO "→" in action buttons
2. ❌ NO "ORDER DETAILS" ALL-CAPS
3. ❌ NO inline edit of biaya (read-only display, edit via separate flow if needed)
4. ❌ NO "Delete pesanan" button (pesanan is permanent record)
5. ❌ NO auto-approve payment (admin must verify manually)
6. ❌ NO "Print invoice" (backlog)
7. ❌ NO "Refund" button (refund handled via komplain flow)

---

## Copy

### Page Title (H1)
```
INV-20240120-I9J0K1L2
```

### Header Info
```
[Menunggu Verifikasi]
20 Jan 2024, 19:45 WIB
Customer: budi@email.com
```

### Status Pipeline
```
●━━●━━○━━○━━○━━○
Bayar  Verif  Proses  Konsol  Lokal  Selesai
```

### Log
```
19:45 - Pesanan dibuat
19:50 - Bukti pembayaran diupload
(waiting verification)
```

### Quick Actions
```
[Verifikasi Bayar]
[Tolak Bayar]

Update Resi:
[JNE-________]
[Update Resi]
```

### Item
```
Tas Backpack Premium
Varian: Hitam
Rp 282.000 x1
Subtotal: Rp 282.000
```

### Bukti Pembayaran
```
Bukti Pembayaran

[IMAGE THUMBNAIL]  [Lihat]
Upload: 20 Jan 2024, 19:50 WIB
Bank: BCA
Jumlah: Rp 365.575
```

### Info Customer
```
Info Customer

Budi Santoso
budi@email.com
+62 812-3456-7890
[Chat WhatsApp]

Alamat:
Jl. Merdeka No. 123
RT 01 RW 02
Bandung, Jawa Barat
40123

Kurir: JNE REG
No. Resi: -
Estimasi: 3-5 hari
```

### Rincian Biaya
```
Rincian Biaya

Subtotal Produk:        Rp 352.500
Biaya Jasa Titip (10%): Rp 35.250
Ongkir China Gudang:    Rp 150.000
Ongkir Domestik:        Rp 25.000
────────────────────────────────
Total:                  Rp 562.750
```

### Reject Modal
```
Tolak pembayaran ini?

Alasan penolakan:
[                                        ]

[Batal]  [Ya, Tolak]
```

### Verify Confirm
```
Verifikasi pembayaran ini?
Customer akan dikabarin.

[Batal]  [Ya, Verifikasi]
```

### Toasts
```
Status pesanan diupdate
Resi diupdate, pesanan dikirim
Pembayaran diverifikasi
Pembayaran ditolak, customer dikabarin
Gagal update resi. Coba lagi.
```
