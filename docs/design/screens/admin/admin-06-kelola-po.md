# Screen Admin 06: Kelola PO

## Tujuan
Admin lihat semua permintaan PO dari customer, filter by status, dan buat penawaran (harga + estimasi ongkir + catatan) untuk permintaan yang menunggu.

---

## Layout Wireframe (Desktop)

```
┌─────┬───────────────────────────────────────────────────────────┐
│     │  Kelola PO                                                │
│  S  ├───────────────────────────────────────────────────────────┤
│  i  │                                                            │
│  d  │  [🔍 Cari PO...]  Status: [Semua ▼]                       │
│  e  │                                                            │
│  b  │  [Semua] [Menunggu] [Ditawar] [Diterima] [Ditolak] [Exp]  │
│  a  │                                                            │
│  r  │  ┌────────────────────────────────────────────────────────┐ │
│     │  │ PO-ID        Customer         Tgl     Status    Action│ │
│  D  │  ├────────────────────────────────────────────────────────┤ │
│  a  │  │ PO-...001   budi@email.com  20 Jan  [Menunggu] [Buat] │ │
│  s  │  │ PO-...002   siti@email.com  19 Jan  [Ditawar]  [Lihat]│ │
│  h  │  │ PO-...003   andi@email.com  18 Jan  [Diterima] [Lihat]│ │
│  b  │  │ PO-...004   budi@email.com  17 Jan  [Ditolak]  [Lihat]│ │
│  o  │  │ ...                                                       │ │
│  a  │  └────────────────────────────────────────────────────────┘ │
│  r  │                                                            │
│  d  │  [← Prev]  1 2 3  [Next →]    10 per page                 │
│     │                                                            │
└─────┴───────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [☰]  Kelola PO     [👤]  │
├──────────────────────────┤
│ [🔍 Cari PO...]           │
├──────────────────────────┤
│ [Semua][Menuggu][Ditawar] │ ← horizontal scroll
│ [Diterima][Ditolak][Exp]  │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ PO-20240120-001        │ │
│ │ budi@email.com         │ │
│ │ 20 Jan  [Menunggu]     │ │
│ │ 1 unit  [Buat Penawaran]│ │
│ ├────────────────────────┤ │
│ │ PO-20240119-002        │ │
│ │ siti@email.com         │ │
│ │ 19 Jan  [Ditawar]      │ │
│ │ 2 unit  [Lihat Detail] │ │
│ ├────────────────────────┤ │
│ │ PO-20240118-003        │ │
│ │ andi@email.com         │ │
│ │ 18 Jan  [Diterima]     │ │
│ │ 1 unit  [Lihat Detail] │ │
│ └────────────────────────┘ │
│                            │
│ [Muat Lainnya]            │
│                            │
├──────────────────────────┤
│[Dash][Order][+][Prod][More]│
└──────────────────────────┘
```

### Buat Penawaran (Modal/Drawer)

```
┌───────────────────────────────────────────────────────────────┐
│  Buat Penawaran untuk PO-20240120-001              [X]       │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Detail Permintaan (read-only)                           │ │
│  │                                                          │ │
│  │  Customer: Budi Santoso (budi@email.com)                │ │
│  │  Link: https://taobao.com/...    [Buka Link]             │ │
│  │  Deskripsi: Sepatu running brand X, size 42...           │ │
│  │  Foto: [img1] [img2]                                     │ │
│  │  Jumlah Diminta: 1                                       │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Form Penawaran                                          │ │
│  │                                                          │ │
│  │  Harga per Unit (IDR) *                                  │ │
│  │  [Rp 450.000_______________]                             │ │
│  │  (Harga sudah termasuk biaya produk dari China)          │ │
│  │                                                          │ │
│  │  Estimasi Ongkir (China + Domestik) *                   │ │
│  │  [Rp 150.000______________]                              │ │
│  │  (Gabungan ongkir China gudang + domestik Indonesia)    │ │
│  │                                                          │ │
│  │  ─── Auto-calc preview ───                               │ │
│  │  Subtotal:        Rp 450.000 (harga × jumlah)            │ │
│  │  Biaya Jasa Titip: Rp 45.000  (10%, min Rp 15.000)       │ │
│  │  Ongkir:          Rp 150.000                              │ │
│  │  Total Estimasi:  Rp 645.000                             │ │
│  │                                                          │ │
│  │  Catatan untuk Customer *                               │ │
│  │  [                                                  ]    │ │
│  │  [  Produk available, tapi pengiriman butuh 2 minggu ]    │ │
│  │  [  karena dari gudang beda kota.                    ]    │ │
│  │  Minimal 20 karakter                                     │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  [Batal]                              [Kirim Penawaran]        │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

---

## Sections

### Section 1: Admin Sidebar
- "PO" active

### Section 2: Header + Toolbar
- **Title:** "Kelola PO" (H1)
- **Toolbar:**
  - Search: "Cari PO..." (filter by PO-ID, debouce 300ms)
  - Status dropdown: Semua, Menunggu Penawaran, Sudah Ditawar, Diterima, Ditolak, Kadaluwarsa

### Section 3: Status Tabs
- **Tabs:** Semua, Menunggu, Ditawar, Diterima, Ditolak, Kadaluwarsa
- **Active state:** Background rgba(200,16,46,0.1), Chinese Red text
- **Badge count:** Optional per tab

### Section 4: PO Table (Desktop)
- **Columns:**
  ```
  | PO-ID | Customer | Tanggal | Jumlah | Status | Action |
  ```
- **Row details:**
  - PO-ID: monospace, Inter 600, 14px
  - Customer: email (Inter 400, 14px)
  - Tanggal: DD MMM YYYY
  - Jumlah: unit count (e.g., "1 unit", "2 unit")
  - Status: badge (Menunggu=gold, Ditawar=jade, Diterima=jade, Ditolak=red-muted, Kadaluwarsa=grey)
  - Action:
    - Menunggu: "Buat Penawaran" (Primary, small)
    - Ditawar/Diterima/Ditolak/Kadaluwarsa: "Lihat Detail" (ghost)
- **Row hover:** Background #F7F3EC
- **Pagination:** 10 per page

### Section 5: PO Cards (Mobile)
- **Each card:**
  ```
  PO-ID (Inter 600, 14px, monospace)
  Customer email (Inter 400, 13px, #6B5D52)
  Tanggal + Jumlah (horizontal)
  Status badge + Action button
  Click (body): → /admin/po/[id]
  ```

### Section 6: Buat Penawaran (Modal/Drawer)
- **Trigger:** Click "Buat Penawaran" on MENUNGGU_PO
- **Layout:** Right-side drawer (desktop, 480px) / full-screen sheet (mobile)
- **Content:**
  - Detail Permintaan (read-only): customer, link, deskripsi, foto, jumlah
  - Form Penawaran:
    - Harga per Unit (IDR, required) — number input
    - Estimasi Ongkir (IDR, required) — number input
    - Auto-calc preview: subtotal, jasa titip (10%, min Rp 15K), total
    - Catatan untuk Customer (required, textarea, min 20 chars)
  - Buttons: "Batal" (secondary) + "Kirim Penawaran" (Primary)

---

## States

### Loading
- Skeleton table rows / cards

### Empty (No PO)
- "Belum ada permintaan PO."

### Search No Results
- "Nggak ketemu PO 'XYZ'."

### Penawaran Submit Loading
- "Kirim Penawaran" button: spinner + "Mengirim..."
- Disable form

### Penawaran Submit Success
- Toast: "Penawaran dikirim. Customer bakal dikabarin."
- Modal/drawer closes
- PO status → SUDAH_DITAWAR
- Row updates in list
- Customer notified (notifikasi + WhatsApp broadcast)

### Penawaran Validation Error
- Harga: "Harga minimal Rp 1.000"
- Ongkir: "Ongkir minimal Rp 0"
- Catatan: "Catatan minimal 20 karakter"

---

## Interactions

### Search
- Debounce 300ms → filter by PO-ID (contains)

### Status Filter
- Dropdown + tabs sync (same as kelola-pesanan)

### Row Click
- Click row (desktop) or card (mobile) → `/admin/po/[id]`
- Click "Buat Penawaran" → open drawer/modal

### Buat Penawaran
- Fill form → auto-calc preview updates live
- "Kirim Penawaran" → validate → API: POST /api/admin/po/[id]/penawaran
- On success: status → SUDAH_DITAWAR, customer notified

### Buka Link
- In detail view: click "Buka Link" → open URL in new tab

### Foto Fullscreen
- In detail view: click thumbnail → modal fullscreen

---

## Edge Cases

### PO Kadaluwarsa (no admin response in 7 days)
- Auto-expire via cron (cek-kadaluwarsa)
- Status: KADALUWARSA
- Admin can still view (read-only)
- Note: "Permintaan kadaluwarsa (admin belum review dalam 7 hari)"

### Customer Accepted Offer
- Status: DITERIMA
- Pesanan auto-created from PO
- Show link: "Lihat Pesanan INV-..." → `/admin/pesanan/[id]`

### Customer Rejected Offer
- Status: DITOLAK
- Admin can see rejection (with optional reason)
- PO closed (can't re-offer in MVP)

### Multiple PO from Same Customer
- Normal: list all
- No grouping (flat list)

### Link Tidak Valid (admin checked)
- Admin can update link in penawaran (edit before sending)
- Or: add note in catatan "Link udah tak cek, ini update: [new link]"

---

## WHAT NOT TO DO

1. ❌ NO "→" in buttons
2. ❌ NO "PURCHASE ORDERS" ALL-CAPS
3. ❌ NO counter-offer/negotiation flow (MVP: single offer, accept/reject)
4. ❌ NO auto-generate price from link scraping (manual input)
5. ❌ NO "Draft penawaran" save (send or cancel)
6. ❌ NO bulk PO processing
7. ❌ NO "Archive PO" button (status-based, not manual archive)

---

## Copy

### Page Title (H1)
```
Kelola PO
```

### Toolbar
```
[Cari PO...]  Status: [Semua ▼]
```

### Status Tabs
```
Semua
Menunggu
Ditawar
Diterima
Ditolak
Kadaluwarsa
```

### Table Headers
```
PO-ID | Customer | Tanggal | Jumlah | Status | Action
```

### Row
```
PO-20240120-001  budi@email.com  20 Jan 2024  1 unit  [Menunggu Penawaran]  [Buat Penawaran]
```

### Buat Penawaran Modal
```
Buat Penawaran untuk PO-20240120-001

Detail Permintaan

Customer: Budi Santoso (budi@email.com)
Link: https://taobao.com/...
[Buka Link]

Deskripsi: Sepatu running brand X, size 42, warna hitam...

Foto: [img1] [img2]

Jumlah Diminta: 1

Form Penawaran

Harga per Unit (IDR) *
[Rp 450.000]
(Harga sudah termasuk biaya produk dari China)

Estimasi Ongkir (China + Domestik) *
[Rp 150.000]
(Gabongan ongkir China gudang + domestik Indonesia)

─── Auto-calc preview ───
Subtotal:         Rp 450.000 (harga × jumlah)
Biaya Jasa Titip:  Rp 45.000 (10%, min Rp 15.000)
Ongkir:           Rp 150.000
Total Estimasi:   Rp 645.000

Catatan untuk Customer *
[Produk available, tapi pengiriman butuh 2 minggu...]
Minimal 20 karakter

[Batal]  [Kirim Penawaran]
```

### Empty States
```
Belum ada permintaan PO.
Nggak ketemu PO 'XYZ'.
```

### Validation Errors
```
Harga minimal Rp 1.000
Ongkir minimal Rp 0
Catatan minimal 20 karakter
```

### Toasts
```
Penawaran dikirim. Customer bakal dikabarin.
```

### Kadaluwarsa Note
```
Permintaan kadaluwarsa (admin belum review dalam 7 hari)
```

### Diterima (Link to Pesanan)
```
Penawaran diterima customer.
Lihat Pesanan INV-20240120-XXX
```
