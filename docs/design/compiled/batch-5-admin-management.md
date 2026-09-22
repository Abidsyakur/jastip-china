---
title: "BATCH 5: ADMIN MANAGEMENT"
tags: [compiled, pen-dev]
tanggal: 2026-09-21
---
# BATCH 5: ADMIN MANAGEMENT

Gabungan 5 file admin management screens untuk pen.dev

---



========================================
# FILE: admin-07-kelola-komplain.md
========================================

# Screen Admin 07: Kelola Komplain

## Tujuan
Admin lihat semua komplain dari customer, filter by status, buka detail, respond (tanggapi), dan resolve (selesai/ditolak). Link ke pesanan terkait.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Kelola Komplain                                          â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  [ðŸ” Cari komplain...]  Status: [Semua â–¼]                  â”‚
â”‚  e  â”‚                                                            â”‚
â”‚  b  â”‚  [Semua] [Baru] [Diproses] [Selesai] [Ditolak]            â”‚
â”‚  a  â”‚                                                            â”‚
â”‚  r  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚     â”‚  â”‚ Komplain-ID   Pesanan         Customer   Tgl   Status â”‚ â”‚
â”‚  D  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  a  â”‚  â”‚ KMP-001  INV-...A1B2C3D4  budi@..  22 Jan [Baru]    â‹® â”‚ â”‚
â”‚  s  â”‚  â”‚ KMP-002  INV-...E5F6G7H8  siti@..  21 Jan [Diproses]â‹® â”‚ â”‚
â”‚  h  â”‚  â”‚ KMP-003  INV-...I9J0K1L2  andi@..  20 Jan [Selesai] â‹® â”‚ â”‚
â”‚  b  â”‚  â”‚ ...                                                       â”‚ â”‚
â”‚  o  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  a  â”‚                                                            â”‚
â”‚  r  â”‚  [â† Prev]  1 2 3  [Next â†’]    10 per page                 â”‚
â”‚  d  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  P  â”‚  (Detail Drawer when â‹® / row clicked):                   â”‚
â”‚  r  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  o  â”‚  â”‚  Komplain KMP-001                          [X]        â”‚ â”‚
â”‚  d  â”‚  â”‚  Status: [Baru]                                        â”‚ â”‚
â”‚  u  â”‚  â”‚  22 Jan 2024, 10:00 WIB                              â”‚ â”‚
â”‚  k  â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  â”€â”€â”€ Info Komplain â”€â”€â”€                                  â”‚ â”‚
â”‚  P  â”‚  â”‚  Pesanan: INV-20240115-A1B2C3D4  [Lihat Pesanan]    â”‚ â”‚
â”‚  O  â”‚  â”‚  Customer: Budi Santoso (budi@email.com)            â”‚ â”‚
â”‚  K  â”‚  â”‚  Tanggal Komplain: 22 Jan 2024                        â”‚ â”‚
â”‚  o  â”‚  â”‚  Kategori: Barang Rusak                                 â”‚ â”‚
â”‚  m  â”‚  â”‚                                                        â”‚ â”‚
â”‚  p  â”‚  â”‚  Deskripsi:                                            â”‚ â”‚
â”‚     â”‚  â”‚  Tas sampai tapi strap kanan putus. Kelihatannya    â”‚ â”‚
â”‚  L  â”‚  â”‚  rusak saat pengiriman. Mau minta ganti atau...     â”‚ â”‚
â”‚  o  â”‚  â”‚                                                        â”‚ â”‚
â”‚  g  â”‚  â”‚  Foto (3):                                             â”‚ â”‚
â”‚     â”‚  â”‚  [img1] [img2] [img3]    [Lihat]                      â”‚ â”‚
â”‚  S  â”‚  â”‚                                                        â”‚ â”‚
â”‚  e  â”‚  â”‚  â”€â”€â”€ Riwayat â”€â”€â”€                                       â”‚ â”‚
â”‚  t  â”‚  â”‚  22 Jan 10:00 - Komplain diajukan (customer)        â”‚ â”‚
â”‚  t  â”‚  â”‚                                                        â”‚ â”‚
â”‚  .  â”‚  â”‚  â”€â”€â”€ Tanggapan Admin â”€â”€â”€                               â”‚ â”‚
â”‚     â”‚  â”‚  [                                                  ]   â”‚ â”‚
â”‚     â”‚  â”‚  [  Halo Budi, mau minta foto Strap yang...      ]   â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚  P  â”‚  â”‚  Status: [Diproses â–¼]                                  â”‚ â”‚
â”‚  e  â”‚  â”‚  (Diproses / Selesai / Ditolak)                       â”‚ â”‚
â”‚  s  â”‚  â”‚                                                        â”‚ â”‚
â”‚  a  â”‚  â”‚  [Kirim Tanggapan]                                    â”‚ â”‚
â”‚  n  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  a  â”‚                                                            â”‚
â”‚  n  â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]  Kelola Komplain [ðŸ‘¤]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [ðŸ” Cari komplain...]     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Semua][Baru][Diproses]   â”‚ â† horizontal scroll
â”‚ [Selesai][Ditolak]        â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ KMP-001                â”‚ â”‚
â”‚ â”‚ INV-...A1B2C3D4        â”‚ â”‚
â”‚ â”‚ budi@email.com         â”‚ â”‚
â”‚ â”‚ 22 Jan  [Baru]         â”‚ â”‚
â”‚ â”‚             [Detail]   â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ KMP-002                â”‚ â”‚
â”‚ â”‚ INV-...E5F6G7H8        â”‚ â”‚
â”‚ â”‚ siti@email.com         â”‚ â”‚
â”‚ â”‚ 21 Jan  [Diproses]     â”‚ â”‚
â”‚ â”‚             [Detail]   â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Muat Lainnya]            â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Detail - full screen page on mobile):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Komplain KMP-001   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Baru]                     â”‚
â”‚ 22 Jan 2024, 10:00 WIB    â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Info Komplain â”€â”€â”€     â”‚
â”‚ Pesanan: INV-...A1B2C3D4 â”‚
â”‚ [Lihat Pesanan]           â”‚
â”‚ Customer: Budi Santoso    â”‚
â”‚ Kategori: Barang Rusak    â”‚
â”‚                            â”‚
â”‚ Deskripsi:                 â”‚
â”‚ Tas sampai tapi strap     â”‚
â”‚ kanan putus...            â”‚
â”‚                            â”‚
â”‚ Foto (3):                  â”‚
â”‚ [img1][img2][img3]        â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Riwayat â”€â”€â”€           â”‚
â”‚ 22 Jan 10:00 - Diajukan  â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Tanggapan â”€â”€â”€         â”‚
â”‚ [                          ] â”‚
â”‚ [  Halo Budi, mau...   ] â”‚
â”‚                            â”‚
â”‚ Status: [Diproses â–¼]       â”‚
â”‚                            â”‚
â”‚ [Kirim Tanggapan]         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- "Komplain" active

### Section 2: Header + Toolbar
- **Title:** "Kelola Komplain" (H1)
- **Toolbar:**
  - Search: "Cari komplain..." (filter by KMP-ID or invoice, debounce 300ms)
  - Status dropdown: Semua, Baru, Diproses, Selesai, Ditolak

### Section 3: Status Tabs
- **Tabs:** Semua, Baru, Diproses, Selesai, Ditolak
- **Badge count:** Optional (e.g., "Baru (3)")

### Section 4: Komplain Table (Desktop)
- **Columns:**
  ```
  | Komplain-ID | Pesanan | Customer | Tanggal | Status | Action |
  ```
- **Row details:**
  - Komplain-ID: "KMP-001" (monospace, Inter 600, 14px)
  - Pesanan: invoice (clickable link â†’ `/admin/pesanan/[id]`)
  - Customer: email
  - Tanggal: DD MMM YYYY
  - Status: badge (Baru=Chinese Red, Diproses=gold, Selesai=jade, Ditolak=red-muted)
  - Action: "Detail" link (ghost)
- **Row click:** Open detail drawer (desktop) or navigate (mobile)
- **Pagination:** 10 per page

### Section 5: Komplain Cards (Mobile)
- **Each card:**
  ```
  KMP-ID (Inter 600, 14px)
  Invoice + Customer email
  Tanggal + Status badge
  [Detail] button â†’ /admin/komplain/[id]
  ```

### Section 6: Detail (Drawer Desktop / Page Mobile)
- **Layout:** Right drawer 480px (desktop) / full page (mobile)
- **Content:**
  - Header: KMP-ID + status badge + tanggal
  - Info Komplain:
    - Pesanan link (â†’ `/admin/pesanan/[id]`)
    - Customer name + email
    - Kategori (Barang Rusak, Barang Tidak Sesuai, Pengiriman Lambat, Lainnya)
    - Deskripsi (read-only, full text)
    - Foto thumbnails (click â†’ fullscreen)
  - Riwayat (timeline):
    - Each entry: timestamp + action + actor (customer/admin)
    - e.g., "22 Jan 10:00 - Komplain diajukan (customer)"
    - e.g., "22 Jan 14:30 - Tanggapan admin: Halo Budi... (admin)"
    - e.g., "23 Jan 09:00 - Status: Selesai (admin)"
  - Tanggapan Form:
    - Textarea: "Tanggapan untuk customer"
    - Status dropdown: Diproses / Selesai / Ditolak
    - "Kirim Tanggapan" button (Primary)
- **Behavior:**
  - Submit tanggapan â†’ API: POST /api/admin/komplain/[id]/tanggapan
  - Adds to riwayat + updates status
  - Customer notified (notifikasi + WhatsApp)

---

## States

### Loading
- Skeleton table / cards

### Empty (No Komplain)
- "Belum ada komplain. Mantap!"

### Submit Loading
- "Kirim Tanggapan" button: spinner + "Mengirim..."
- Disable form

### Submit Success
- Toast: "Tanggapan dikirim. Customer dikabarin."
- Riwayat updates with new entry
- Status badge updates
- Customer notified

### Komplain Not Found
- 404: "Komplain nggak ketemu"

---

## Interactions

### Search
- Debounce 300ms â†’ filter by KMP-ID or invoice (contains)

### Status Filter
- Dropdown + tabs sync

### Row Click
- Desktop: open drawer
- Mobile: navigate to `/admin/komplain/[id]`

### Lihat Pesanan
- Click invoice link â†’ `/admin/pesanan/[id]` (new tab or same)

### Foto Fullscreen
- Click thumbnail â†’ modal fullscreen, swipe through

### Tanggapan Submit
- Textarea + status â†’ API â†’ riwayat + status update
- Customer notified

### Status Change Only (no tanggapan)
- Admin can change status without tanggapan (e.g., mark "Selesai" after resolving via WhatsApp)
- If status changed without tanggapan: log "Status: [status] (admin)" in riwayat

---

## Edge Cases

### Komplain with Multiple Tanggapan
- Riwayat shows all (timeline)
- Each tanggapan: timestamp + text + actor badge (customer/admin)

### Komplain on Custom PO Pesanan
- Invoice shows "PO-" prefix
- Link â†’ `/admin/pesanan/[id]` (same flow)

### Customer Wants Refund
- Kategori: "Permintaan Refund"
- Admin tanggapan: process refund manually (bank transfer) + mark "Selesai" with note "Refund Rp X.XXX transferred"
- No automated refund (manual bank transfer)

### Komplain Closed but Reopened
- MVP: no reopen (if new issue, customer creates new komplain)
- Backlog: allow reopen within 7 days

### No Foto
- Hide foto section
- Or: "Customer tidak upload foto"

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "COMPLAINTS" / "TICKETS" ALL-CAPS
3. âŒ NO "Priority" field (MVP: no priority levels)
4. âŒ NO "Assign to" field (single admin MVP)
5. âŒ NO SLA timer ("Respond within 24h")
6. âŒ NO canned/template responses (free text)
7. âŒ NO customer rating of resolution (backlog)

---

## Copy

### Page Title (H1)
```
Kelola Komplain
```

### Toolbar
```
[Cari komplain...]  Status: [Semua â–¼]
```

### Status Tabs
```
Semua
Baru
Diproses
Selesai
Ditolak
```

### Table Headers
```
Komplain-ID | Pesanan | Customer | Tanggal | Status | Action
```

### Row
```
KMP-001  INV-20240115-A1B2C3D4  budi@email.com  22 Jan 2024  [Baru]  [Detail]
```

### Detail Header
```
Komplain KMP-001
Status: [Baru]
22 Jan 2024, 10:00 WIB
```

### Info Komplain
```
Info Komplain

Pesanan: INV-20240115-A1B2C3D4  [Lihat Pesanan]
Customer: Budi Santoso (budi@email.com)
Tanggal Komplain: 22 Jan 2024
Kategori: Barang Rusak

Deskripsi:
Tas sampai tapi strap kanan putus. Kelihatannya rusak saat pengiriman. Mau minta ganti atau refund ongkir.

Foto (3):
[img1] [img2] [img3]  [Lihat]
```

### Riwayat
```
Riwayat

22 Jan 10:00 - Komplain diajukan (customer)
22 Jan 14:30 - Tanggapan: Halo Budi, mau minta foto strap yang lebih jelas? (admin)
22 Jan 15:00 - Foto tambahan diupload (customer)
23 Jan 09:00 - Status: Selesai (admin)
```

### Tanggapan Form
```
Tanggapan Admin

[                                        ]
[  Halo Budi, mau minta foto Strap...  ]

Status: [Diproses â–¼]
(Diproses / Selesai / Ditolak)

[Kirim Tanggapan]
```

### Empty State
```
Belum ada komplain. Mantap!
```

### Toasts
```
Tanggapan dikirim. Customer dikabarin.
```

### Kategori Options
```
Barang Rusak
Barang Tidak Sesuai
Pengiriman Lambat
Permintaan Refund
Lainnya
```



========================================
# FILE: admin-08-kelola-kategori.md
========================================

# Screen Admin 08: Kelola Kategori

## Tujuan
Admin CRUD kategori produk. Kategori sederhana: nama + slug + icon (optional). Dipakai di produk dan katalog filter.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Kelola Kategori                       [+ Tambah Kategori] â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  e  â”‚  â”‚ Kategori       Slug          Jml Produk   Action       â”‚ â”‚
â”‚  b  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  a  â”‚  â”‚ Tas             tas            5           [Edit] [Hapus]â”‚ â”‚
â”‚  r  â”‚  â”‚ Sepatu          sepatu         3           [Edit] [Hapus]â”‚ â”‚
â”‚     â”‚  â”‚ Aksesoris       aksesoris      4           [Edit] [Hapus]â”‚ â”‚
â”‚  D  â”‚  â”‚ Elektronik      elektronik     2           [Edit] [Hapus]â”‚ â”‚
â”‚  a  â”‚  â”‚ Fashion         fashion        6           [Edit] [Hapus]â”‚ â”‚
â”‚  s  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  h  â”‚                                                            â”‚
â”‚  b  â”‚                                                            â”‚
â”‚  o  â”‚  (Edit/Create Modal):                                     â”‚
â”‚  a  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  r  â”‚  â”‚  Tambah Kategori                          [X]        â”‚  â”‚
â”‚  d  â”‚  â”‚                                                        â”‚  â”‚
â”‚  P  â”‚  â”‚  Nama Kategori *                                      â”‚  â”‚
â”‚  r  â”‚  â”‚  [Tas____________________________]                     â”‚  â”‚
â”‚  o  â”‚  â”‚                                                        â”‚  â”‚
â”‚  d  â”‚  â”‚  Slug * (auto-generate, bisa edit)                    â”‚  â”‚
â”‚  u  â”‚  â”‚  [tas____________________________]                     â”‚  â”‚
â”‚  k  â”‚  â”‚  URL: /katalog?kategori=tas                           â”‚  â”‚
â”‚     â”‚  â”‚                                                        â”‚  â”‚
â”‚  P  â”‚  â”‚  Icon (opsional)                                      â”‚  â”‚
â”‚  O  â”‚  â”‚  [Pilih Icon â–¼]  atau upload SVG                       â”‚  â”‚
â”‚  K  â”‚  â”‚                                                        â”‚  â”‚
â”‚  o  â”‚  â”‚  [Batal]  [Simpan]                                    â”‚  â”‚
â”‚  m  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚  p  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  L  â”‚                                                            â”‚
â”‚  o  â”‚                                                            â”‚
â”‚  g  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]  Kelola Kategori [+] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Tas          5 produk   â”‚ â”‚
â”‚ â”‚              [Edit][Hapus]â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ Sepatu       3 produk   â”‚ â”‚
â”‚ â”‚              [Edit][Hapus]â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ Aksesoris    4 produk   â”‚ â”‚
â”‚ â”‚              [Edit][Hapus]â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ Elektronik   2 produk   â”‚ â”‚
â”‚ â”‚              [Edit][Hapus]â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ Fashion      6 produk   â”‚ â”‚
â”‚ â”‚              [Edit][Hapus]â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Create/Edit Modal - bottom sheet):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  â”â”â” (drag handle)       â”‚
â”‚                      [X] â”‚
â”‚  Tambah Kategori         â”‚
â”‚                           â”‚
â”‚  Nama Kategori *         â”‚
â”‚  [Tas_________________]   â”‚
â”‚                           â”‚
â”‚  Slug *                   â”‚
â”‚  [tas_________________]   â”‚
â”‚  URL: /katalog?kategori=tasâ”‚
â”‚                           â”‚
â”‚  Icon (opsional)          â”‚
â”‚  [Pilih Icon â–¼]            â”‚
â”‚                           â”‚
â”‚  [Batal]    [Simpan]      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- "Settings" â†’ "Kategori" submenu active, or standalone "Kategori" link

### Section 2: Header + Tambah
- **Title:** "Kelola Kategori" (H1)
- **Action:** "+ Tambah Kategori" (Primary, top right)

### Section 3: Kategori List
- **Layout (Desktop):** Table
- **Columns:**
  ```
  | Kategori | Slug | Jml Produk | Action |
  ```
- **Layout (Mobile):** Vertical cards
- **Each row/card:**
  - Nama (Inter 600, 16px)
  - Slug (monospace, Inter 400, 14px, #6B5D52)
  - Jml Produk: count (e.g., "5 produk") â€” from Produk table
  - Action: "Edit" (ghost) + "Hapus" (ghost, red-tinted)
- **Empty:** "Belum ada kategori. Tambah dulu."

### Section 4: Create/Edit Modal
- **Trigger:** "+ Tambah Kategori" or "Edit"
- **Layout:** Centered modal (desktop) / bottom sheet (mobile)
- **Fields:**
  1. **Nama Kategori** (required)
     - Input text, max 30 chars
     - Validation: min 2, unique
  2. **Slug** (required, auto-generate)
     - Auto from nama (lowercase, spaces â†’ hyphens)
     - Editable (override)
     - Preview: "URL: /katalog?kategori=[slug]"
     - Validation: unique, lowercase, no spaces
  3. **Icon** (optional)
     - Dropdown: preset icons (bag, shoe, accessory, electronics, shirt)
     - Or: upload SVG (backlog)
- **Buttons:** "Batal" (secondary) + "Simpan" (Primary)

---

## States

### Loading
- Skeleton table rows

### Save Loading
- "Simpan" button: spinner + "Menyimpan..."

### Save Success
- Toast: "Kategori disimpan." (edit) or "Kategori baru ditambahkan." (create)
- Modal closes
- List refreshes

### Validation Error
- Nama: "Nama minimal 2 karakter", "Nama kategori udah ada"
- Slug: "Slug udah dipake kategori lain"

### Delete Confirm
- Modal: "Hapus kategori ini?"
- Warning: "Produk dengan kategori ini bakal jadi 'Tanpa Kategori'. Yakin?"
- [Batal] [Ya, Hapus]

### Delete with Products
- Warning: "Kategori ini punya X produk. Produk bakal jadi 'Tanpa Kategori'."
- [Batal] [Ya, Hapus Saja]

---

## Interactions

### Auto-Generate Slug
- Type nama â†’ slug auto-generates (real-time)
- If slug manually edited: stop auto-generate (respect user input)
- Slug format: lowercase, spaces â†’ hyphens, no special chars

### Edit
- Click "Edit" â†’ modal opens with pre-filled values
- Save â†’ update

### Delete
- Click "Hapus" â†’ confirm modal
- If kategori has products: show count warning
- Confirm â†’ soft delete or reassign products to "Tanpa Kategori"

### Jml Produk Count
- Display count of Produk with this kategoriId
- If 0: "0 produk" (safe to delete)
- If > 0: show count + delete warning

---

## Edge Cases

### Kategori Used by Active Pesanan
- Cannot hard delete (pesanan references kategori via produk)
- Soft delete: status â†’ NONAKTIF, hidden from admin list (unless "Tampilkan Nonaktif")
- Products keep kategoriId (for historical data)

### Kategori Name Duplicate
- Case-insensitive unique check
- "Tas" and "tas" = duplicate

### Slug Collision
- "Tas Baru" and "Tas-Baru" â†’ same slug "tas-baru"
- Error: "Slug 'tas-baru' udah dipake"

### No Kategori (first setup)
- Show prompt: "Tambah kategori pertama buat mulai katalog produk."
- CTA: "+ Tambah Kategori"

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "CATEGORIES" ALL-CAPS
3. âŒ NO nested/sub-categories (MVP: flat list only)
4. âŒ NO category image upload (icon preset only)
5. âŒ NO category description field (nama + slug is enough)
6. âŒ NO drag-to-reorder (alphabetical or manual order, backlog)

---

## Copy

### Page Title (H1)
```
Kelola Kategori
```

### Action
```
[+ Tambah Kategori]
```

### Table Headers
```
Kategori | Slug | Jml Produk | Action
```

### Row
```
Tas    tas       5 produk    [Edit] [Hapus]
```

### Modal
```
Tambah Kategori

Nama Kategori *
[Tas]

Slug *
[tas]
URL: /katalog?kategori=tas

Icon (opsional)
[Pilih Icon â–¼]

[Batal]  [Simpan]
```

### Empty State
```
Belum ada kategori. Tambah dulu.
```

### Delete Confirm
```
Hapus kategori ini?

Produk dengan kategori ini bakal jadi 'Tanpa Kategori'. Yakin?

[Batal]  [Ya, Hapus]
```

### Delete with Products
```
Hapus kategori ini?

Kategori ini punya 5 produk. Produk bakal jadi 'Tanpa Kategori'.

[Batal]  [Ya, Hapus Saja]
```

### Validation Errors
```
Nama minimal 2 karakter
Nama kategori udah ada
Slug udah dipake kategori lain
```

### Toasts
```
Kategori disimpan.
Kategori baru ditambahkan.
Kategori dihapus.
```



========================================
# FILE: admin-09-pengaturan-kurs.md
========================================

# Screen Admin 09: Pengaturan Kurs

## Tujuan
Admin set/update kurs RMB â†’ IDR (kursRmbIdr). Rate ini dipakai untuk auto-calc harga produk dari RMB ke IDR, dan estimasi biaya di PO.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Pengaturan Kurs                                           â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  e  â”‚  â”‚  Kurs Saat Ini                                        â”‚ â”‚
â”‚  b  â”‚  â”‚                                                        â”‚ â”‚
â”‚  a  â”‚  â”‚  1 RMB  =  Rp 2.450                                    â”‚ â”‚
â”‚  r  â”‚  â”‚  (Update terakhir: 20 Jan 2024, 09:00 WIB)          â”‚ â”‚
â”‚  d  â”‚  â”‚  (oleh: admin@jastipchina.local)                     â”‚ â”‚
â”‚     â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  D  â”‚                                                            â”‚
â”‚  a  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  s  â”‚  â”‚  Update Kurs                                          â”‚ â”‚
â”‚  h  â”‚  â”‚                                                        â”‚ â”‚
â”‚  b  â”‚  â”‚  Kurs RMB â†’ IDR *                                     â”‚ â”‚
â”‚  o  â”‚  â”‚  [2.450]                                              â”‚ â”‚
â”‚  a  â”‚  â”‚  Format: angka desimal (contoh: 2450 atau 2450.50)   â”‚ â”‚
â”‚  r  â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  â”€â”€â”€ Preview â”€â”€â”€                                      â”‚ â”‚
â”‚  P  â”‚  â”‚  Produk "Tas Backpack" (RMB 115):                    â”‚ â”‚
â”‚  r  â”‚  â”‚  Rp 282.175  (sebelumnya: Rp 281.750)                â”‚ â”‚
â”‚  o  â”‚  â”‚  Produk "Kaos Oversized" (RMB 14):                    â”‚ â”‚
â”‚  d  â”‚  â”‚  Rp 34.300   (sebelumnya: Rp 34.300)                  â”‚ â”‚
â”‚  u  â”‚  â”‚                                                        â”‚ â”‚
â”‚  k  â”‚  â”‚  Catatan (opsional)                                    â”‚ â”‚
â”‚  P  â”‚  â”‚  [                                                  ]  â”‚ â”‚
â”‚  O  â”‚  â”‚  [  Update mengikuti kurs BI terbaru              ]  â”‚ â”‚
â”‚  K  â”‚  â”‚                                                        â”‚ â”‚
â”‚  o  â”‚  â”‚  [Simpan Kurs Baru]                                  â”‚ â”‚
â”‚  m  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  p  â”‚                                                            â”‚
â”‚     â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  L  â”‚  â”‚  Riwayat Kurs                                         â”‚ â”‚
â”‚  o  â”‚  â”‚                                                        â”‚ â”‚
â”‚  g  â”‚  â”‚  Tanggal           Kurs         Oleh       Catatan   â”‚ â”‚
â”‚     â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  S  â”‚  â”‚  20 Jan 2024       2.450        admin      Update...  â”‚ â”‚
â”‚  e  â”‚  â”‚  15 Jan 2024       2.400        admin      -          â”‚ â”‚
â”‚  t  â”‚  â”‚  10 Jan 2024       2.350        admin      Awal      â”‚ â”‚
â”‚  t  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  .  â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Pengaturan Kurs    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Kurs Saat Ini           â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ 1 RMB = Rp 2.450       â”‚ â”‚
â”‚ â”‚ Update: 20 Jan 2024    â”‚ â”‚
â”‚ â”‚ Oleh: admin             â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Update Kurs             â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Kurs RMB â†’ IDR *       â”‚ â”‚
â”‚ â”‚ [2.450]                 â”‚ â”‚
â”‚ â”‚ Format: angka desimal   â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ â”€â”€â”€ Preview â”€â”€â”€         â”‚ â”‚
â”‚ â”‚ Tas Backpack (115 RMB): â”‚ â”‚
â”‚ â”‚ Rp 282.175              â”‚ â”‚
â”‚ â”‚ Kaos Oversized (14):    â”‚ â”‚
â”‚ â”‚ Rp 34.300               â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Catatan (opsional)      â”‚ â”‚
â”‚ â”‚ [                      ] â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ [Simpan Kurs Baru]     â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Riwayat Kurs            â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ 20 Jan - 2.450 - admin â”‚ â”‚
â”‚ â”‚ 15 Jan - 2.400 - admin â”‚ â”‚
â”‚ â”‚ 10 Jan - 2.350 - admin â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- "Settings" â†’ "Pengaturan Kurs" active

### Section 2: Kurs Saat Ini (Current Rate)
- **Layout:** Card, full width
- **Content:**
  - Big display: "1 RMB = Rp [kursRmbIdr]" (Noto Serif SC 700, 32px, gold)
  - Update terakhir: tanggal + waktu (Inter 400, 14px, #6B5D52)
  - Oleh: admin email/name (Inter 400, 14px, #6B5D52)

### Section 3: Update Kurs Form
- **Layout:** Card, full width
- **Fields:**
  1. **Kurs RMB â†’ IDR** (required, number)
     - Input: decimal, 2 places
     - Placeholder: "2450" or "2450.50"
     - Helper: "Format: angka desimal (contoh: 2450 atau 2450.50)"
     - Validation: > 0
  2. **Preview** (auto-calc, read-only)
     - Show 2-3 sample products with old vs new IDR price
     - e.g., "Tas Backpack (115 RMB): Rp 282.175 (sebelumnya: Rp 281.750)"
     - Highlight if changed (green if up, red-muted if down â€” optional, subtle)
  3. **Catatan** (optional, textarea)
     - Helper: "Catatan internal untuk log (opsional)"
- **Button:** "Simpan Kurs Baru" (Primary, full width mobile)

### Section 4: Riwayat Kurs
- **Layout:** Card, full width
- **Content:** Table (desktop) / list (mobile) of KursMaster history
- **Columns:**
  ```
  | Tanggal | Kurs | Oleh | Catatan |
  ```
- **Each row:**
  - Tanggal: DD MMM YYYY, HH:MM WIB
  - Kurs: "Rp [kursRmbIdr]" (Inter 600, 14px)
  - Oleh: admin email (Inter 400, 14px)
  - Catatan: text (Inter 400, 14px, #6B5D52) or "-"
- **Pagination:** Last 10 entries, "Lihat Semua" if more

---

## States

### Loading
- Skeleton current rate card, skeleton history

### Save Loading
- "Simpan Kurs Baru" button: spinner + "Menyimpan..."

### Save Success
- Toast: "Kurs berhasil diupdate. Harga produk otomatis mengikuti."
- Current rate card updates
- History list adds new entry
- Preview recalculates (but shows new as "current")

### Validation Error
- "Kurs minimal 1"
- "Format angka tidak valid"

### No History (First Setup)
- Riwayat: "Belum ada riwayat kurs."

---

## Interactions

### Preview Auto-Calc
- Type in kurs field â†’ preview updates live (debounce 300ms)
- Shows 2-3 sample products (from DB, highest price + lowest price + random)
- Old price: strikethrough or "(sebelumnya: Rp X)" in #6B5D52
- New price: bold gold

### Save
- Click "Simpan Kurs Baru" â†’ confirm modal (optional): "Update kurs ke [value]? Harga produk otomatis ikut."
- API: POST /api/admin/kurs (creates new KursMaster, deactivates old)
- Log created automatically
- Toast + refresh display

---

## Edge Cases

### Very Large Kurs (Rp 10.000+)
- Format: "Rp 10.000" (no decimal if whole)
- Display: "1 RMB = Rp 10.000"

### Products with Override IDR Price
- Preview: skip products with harga_override (they don't use kurs)
- Or: show but mark "(manual override)"

### No Products (Preview Empty)
- Preview: "Belum ada produk buat preview. Kurs tetap bisa disimpan."

### Kurs Decreases (IDR cheaper)
- No special UI (just show new value)
- Products with harga_override: unaffected
- Products without override: auto-recalc (new lower IDR price)

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "EXCHANGE RATE" / "CURRENCY SETTINGS" ALL-CAPS
3. âŒ NO auto-fetch from BI/Google API (manual input for MVP, backlog: auto-fetch)
4. âŒ NO multi-currency (only RMB â†’ IDR)
5. âŒ NO "Scheduled update" (immediate update)
6. âŒ NO "Revert to previous" button (just set old value manually if needed)

---

## Copy

### Page Title (H1)
```
Pengaturan Kurs
```

### Current Rate
```
Kurs Saat Ini

1 RMB = Rp 2.450
Update terakhir: 20 Jan 2024, 09:00 WIB
Oleh: admin@jastipchina.local
```

### Update Form
```
Update Kurs

Kurs RMB â†’ IDR *
[2.450]
Format: angka desimal (contoh: 2450 atau 2450.50)

â”€â”€â”€ Preview â”€â”€â”€
Tas Backpack Premium (115 RMB):
Rp 282.175 (sebelumnya: Rp 281.750)
Kaos Oversized (14 RMB):
Rp 34.300 (sebelumnya: Rp 34.300)
Dompet Kulit (91 RMB):
Rp 222.950 (sebelumnya: Rp 222.950)

Catatan (opsional)
[Update mengikuti kurs BI terbaru]

[Simpan Kurs Baru]
```

### History
```
Riwayat Kurs

Tanggal          Kurs      Oleh       Catatan
20 Jan 2024      2.450     admin      Update mengikuti kurs BI
15 Jan 2024      2.400     admin      -
10 Jan 2024      2.350     admin      Kurs awal
```

### Validation Errors
```
Kurs minimal 1
Format angka tidak valid
```

### Toasts
```
Kurs berhasil diupdate. Harga produk otomatis mengikuti.
```

### Empty History
```
Belum ada riwayat kurs.
```

### Confirm (Optional)
```
Update kurs ke 2.450?
Harga produk otomatis ikut kurs baru.

[Batal]  [Ya, Update]
```



========================================
# FILE: admin-10-log-aktivitas.md
========================================

# Screen Admin 10: Log Aktivitas

## Tujuan
Admin lihat audit log semua aksi admin: verifikasi pembayaran, update status pesanan, update resi, penawaran PO, hapus produk, dll. Filter by jenis aksi + tanggal.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Log Aktivitas                                            â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  Jenis: [Semua â–¼]  Tanggal: [__/__/____]  [Filter]        â”‚
â”‚  e  â”‚                                                            â”‚
â”‚  b  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  a  â”‚  â”‚ Waktu          Admin         Aksi       Entitas       â”‚ â”‚
â”‚  r  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚     â”‚  â”‚ 20 Jan 09:15   admin@...    Verifikasi  INV-...I9J0K â”‚ â”‚
â”‚  D  â”‚  â”‚ 20 Jan 08:50   admin@...    Update Resi INV-...E5F6G â”‚ â”‚
â”‚  a  â”‚  â”‚ 20 Jan 08:30   admin@...    Penawaran   PO-...001    â”‚ â”‚
â”‚  s  â”‚  â”‚ 19 Jan 16:00   admin@...    Status:     INV-...A1B2  â”‚ â”‚
â”‚  h  â”‚  â”‚ 19 Jan 14:30   admin@...    Tambah      Dompet Kulit â”‚ â”‚
â”‚  b  â”‚  â”‚ ...                                                       â”‚ â”‚
â”‚  o  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  a  â”‚                                                            â”‚
â”‚  r  â”‚  [â† Prev]  1 2 3  [Next â†’]    20 per page                 â”‚
â”‚  d  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  P  â”‚                                                            â”‚
â”‚  r  â”‚                                                            â”‚
â”‚  o  â”‚                                                            â”‚
â”‚  d  â”‚                                                            â”‚
â”‚  u  â”‚                                                            â”‚
â”‚  k  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  P  â”‚                                                            â”‚
â”‚  O  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  K  â”‚                                                            â”‚
â”‚  o  â”‚                                                            â”‚
â”‚  m  â”‚                                                            â”‚
â”‚  p  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  L  â”‚                                                            â”‚
â”‚  o  â”‚                                                            â”‚
â”‚  g  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  S  â”‚                                                            â”‚
â”‚  e  â”‚                                                            â”‚
â”‚  t  â”‚                                                            â”‚
â”‚  t  â”‚                                                            â”‚
â”‚  .  â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]  Log Aktivitas [ðŸ‘¤]  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Jenis: [Semua â–¼]          â”‚
â”‚ Tgl: [__/__/____] [Filter]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ 20 Jan 09:15           â”‚ â”‚
â”‚ â”‚ admin@jastipchina.localâ”‚ â”‚
â”‚ â”‚ Verifikasi Pembayaran  â”‚ â”‚
â”‚ â”‚ INV-...I9J0K1L2        â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ 20 Jan 08:50           â”‚ â”‚
â”‚ â”‚ admin@jastipchina.localâ”‚ â”‚
â”‚ â”‚ Update Resi            â”‚ â”‚
â”‚ â”‚ INV-...E5F6G7H8        â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ 20 Jan 08:30           â”‚ â”‚
â”‚ â”‚ admin@jastipchina.localâ”‚ â”‚
â”‚ â”‚ Penawaran PO           â”‚ â”‚
â”‚ â”‚ PO-20240120-001        â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ 19 Jan 16:00           â”‚ â”‚
â”‚ â”‚ admin@jastipchina.localâ”‚ â”‚
â”‚ â”‚ Status: Selesai        â”‚ â”‚
â”‚ â”‚ INV-...A1B2C3D4        â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Muat Lainnya]            â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- "Log Aktivitas" active

### Section 2: Header + Filter
- **Title:** "Log Aktivitas" (H1)
- **Filter:**
  - Jenis dropdown: Semua, Verifikasi Pembayaran, Tolak Pembayaran, Update Status, Update Resi, Penawaran PO, Tambah Produk, Edit Produk, Hapus Produk, Update Kurs, Resolusi Komplain
  - Tanggal: date picker (single day) or range
  - "Filter" button (apply)

### Section 3: Log Table (Desktop)
- **Columns:**
  ```
  | Waktu | Admin | Aksi | Entitas | Detail |
  ```
- **Row details:**
  - Waktu: "DD MMM YYYY, HH:MM WIB" (Inter 400, 14px)
  - Admin: email (Inter 400, 14px, #6B5D52)
  - Aksi: action description (Inter 500, 14px)
  - Entitas: invoice/PO-ID/product name (link, Chinese Red) â†’ related detail
  - Detail: optional extra info (e.g., "Resi: JNE-1234567890")
- **Row hover:** Background #F7F3EC
- **Pagination:** 20 per page

### Section 4: Log Cards (Mobile)
- **Each card:**
  ```
  Waktu (Inter 500, 13px) + Admin (Inter 400, 12px, #6B5D52)
  Aksi (Inter 600, 14px)
  Entitas (link, Chinese Red, 13px)
  Detail (optional, Inter 400, 13px, #6B5D52)
  ```
- **Load More:** Button at bottom

---

## States

### Loading
- Skeleton table rows / cards

### Empty (No Logs)
- "Belum ada aktivitas tercatat."

### Filtered Empty
- "Nggak ada log untuk filter ini."

### Date Filter Invalid
- "Tanggal nggak valid. Format: DD/MM/YYYY"

---

## Interactions

### Filter
- Jenis dropdown â†’ filter by action type
- Tanggal â†’ filter by date (or range)
- Both combine
- URL sync: `/admin/log?jenis=verify&tanggal=2024-01-20`

### Entitas Link
- Click invoice â†’ `/admin/pesanan/[id]`
- Click PO-ID â†’ `/admin/po/[id]`
- Click product â†’ `/admin/produk/[id]`
- Click komplain â†’ `/admin/komplain/[id]`

### Pagination / Load More
- Desktop: pagination
- Mobile: load more (append)

---

## Edge Cases

### Very Old Logs (> 90 days)
- Still accessible (no auto-archive in MVP)
- Performance: index on createdAt

### Multiple Admins
- Filter by admin? (backlog, MVP: show all in "Admin" column)

### Log Deleted with Entity
- If pesanan deleted (shouldn't happen, but if): log remains, link 404
- Fallback: show entity ID as text (not link)

### Export Log (Backlog)
- "Export CSV" button (desktop only) â€” backlog, not MVP

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in links
2. âŒ NO "ACTIVITY LOG" / "AUDIT TRAIL" ALL-CAPS
3. âŒ NO real-time auto-refresh (manual filter + paginate)
4. âŒ NO "Delete log" button (logs are permanent, append-only)
5. âŒ NO search by keyword (filter by jenis + tanggal is enough for MVP)
6. âŒ NO charts/visualizations (just list)

---

## Copy

### Page Title (H1)
```
Log Aktivitas
```

### Filter
```
Jenis: [Semua â–¼]  Tanggal: [__/__/____]  [Filter]
```

### Jenis Options
```
Semua
Verifikasi Pembayaran
Tolak Pembayaran
Update Status
Update Resi
Penawaran PO
Tambah Produk
Edit Produk
Hapus Produk
Update Kurs
Resolusi Komplain
```

### Table Headers
```
Waktu | Admin | Aksi | Entitas | Detail
```

### Rows
```
20 Jan 2024, 09:15 WIB  admin@jastipchina.local  Verifikasi Pembayaran  INV-20240120-I9J0K1L2  -
20 Jan 2024, 08:50 WIB  admin@jastipchina.local  Update Resi            INV-20240118-E5F6G7H8  Resi: JNE-1234567890
20 Jan 2024, 08:30 WIB  admin@jastipchina.local  Penawaran PO           PO-20240120-001       Total: Rp 645.000
19 Jan 2024, 16:00 WIB  admin@jastipchina.local  Update Status: Selesai  INV-20240115-A1B2C3D4  -
19 Jan 2024, 14:30 WIB  admin@jastipchina.local  Tambah Produk          Dompet Kulit Asli      -
```

### Empty States
```
Belum ada aktivitas tercatat.
Nggak ada log untuk filter ini.
```

### Pagination
```
[â† Sebelumnya]  1 2 3  [Selanjutnya â†’]
20 per halaman
```

### Mobile Load More
```
Muat Lainnya
```

### Date Filter Error
```
Tanggal nggak valid. Format: DD/MM/YYYY
```



========================================
# FILE: admin-11-pengaturan-umum.md
========================================

# Screen Admin 11: Pengaturan Umum

## Tujuan
Admin set pengaturan umum: rekening bank (untuk customer transfer), nomor WhatsApp admin, profil admin (ganti password), info brand (nama, tagline).

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Pengaturan Umum                                          â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  e  â”‚  â”‚  Profil Admin                                         â”‚ â”‚
â”‚  b  â”‚  â”‚                                                        â”‚ â”‚
â”‚  a  â”‚  â”‚  Email (tidak bisa diubah)                            â”‚ â”‚
â”‚  r  â”‚  â”‚  admin@jastipchina.local                              â”‚ â”‚
â”‚  d  â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Password Saat Ini *                                  â”‚ â”‚
â”‚  D  â”‚  â”‚  [________________]  (verifikasi sebelum ganti)      â”‚ â”‚
â”‚  a  â”‚  â”‚                                                        â”‚ â”‚
â”‚  s  â”‚  â”‚  Password Baru                                        â”‚ â”‚
â”‚  h  â”‚  â”‚  [________________]  Min 8 karakter                  â”‚ â”‚
â”‚  b  â”‚  â”‚                                                        â”‚ â”‚
â”‚  o  â”‚  â”‚  Konfirmasi Password Baru                              â”‚ â”‚
â”‚  a  â”‚  â”‚  [________________]                                    â”‚ â”‚
â”‚  r  â”‚  â”‚                                                        â”‚ â”‚
â”‚  P  â”‚  â”‚  [Ganti Password]                                     â”‚ â”‚
â”‚  r  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  o  â”‚                                                            â”‚
â”‚  d  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  u  â”‚  â”‚  Rekening Bank                                        â”‚ â”‚
â”‚  k  â”‚  â”‚  (Dipakai customer buat transfer pembayaran)        â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚  P  â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚ â”‚
â”‚  O  â”‚  â”‚  â”‚ Bank: BCA                                          â”‚  â”‚ â”‚
â”‚  K  â”‚  â”‚  â”‚ No. Rekening: 1234567890                          â”‚  â”‚ â”‚
â”‚  o  â”‚  â”‚  â”‚ Atas Nama: PT Jastip China                        â”‚  â”‚ â”‚
â”‚  m  â”‚  â”‚  â”‚                              [Edit] [Hapus]        â”‚  â”‚ â”‚
â”‚  p  â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚ â”‚
â”‚     â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚ â”‚
â”‚  L  â”‚  â”‚  â”‚ Bank: Mandiri                                     â”‚  â”‚ â”‚
â”‚  o  â”‚  â”‚  â”‚ No. Rekening: 9876543210                          â”‚  â”‚ â”‚
â”‚  g  â”‚  â”‚  â”‚ Atas Nama: PT Jastip China                        â”‚  â”‚ â”‚
â”‚     â”‚  â”‚  â”‚                              [Edit] [Hapus]        â”‚  â”‚ â”‚
â”‚  S  â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚ â”‚
â”‚  e  â”‚  â”‚                                                        â”‚ â”‚
â”‚  t  â”‚  â”‚  [+ Tambah Rekening]                                 â”‚ â”‚
â”‚  t  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  .  â”‚                                                            â”‚
â”‚     â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚     â”‚  â”‚  Info Kontak                                          â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Nomor WhatsApp Admin *                              â”‚ â”‚
â”‚     â”‚  â”‚  [62 812-0000-0000]                                   â”‚ â”‚
â”‚     â”‚  â”‚  (Dipakai buat link Chat WhatsApp + broadcast)       â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Email Customer Service *                            â”‚ â”‚
â”‚     â”‚  â”‚  [hello@jastipchina.id]                              â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Jam Operasional                                      â”‚ â”‚
â”‚     â”‚  â”‚  [Senin-Sabtu, 09:00-18:00 WIB]                      â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  [Simpan]                                             â”‚ â”‚
â”‚     â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚     â”‚                                                            â”‚
â”‚     â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚     â”‚  â”‚  Info Brand                                           â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Nama Brand *                                         â”‚ â”‚
â”‚     â”‚  â”‚  [Jastip China]                                       â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Tagline (CN) *                                       â”‚ â”‚
â”‚     â”‚  â”‚  [é²œè´§ç›´è¾¾]                                            â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Tagline (ID) *                                       â”‚ â”‚
â”‚     â”‚  â”‚  [Barang China, sampai pintu rumah]                  â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Deskripsi Footer                                     â”‚ â”‚
â”‚     â”‚  â”‚  [Jastip China - jasa titip barang China...]        â”‚ â”‚
â”‚     â”‚  â”‚  [                                                  ]  â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  [Simpan]                                             â”‚ â”‚
â”‚     â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚     â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Pengaturan Umum    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Profil Admin            â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Email (tidak bisa diubah)â”‚ â”‚
â”‚ â”‚ admin@jastipchina.local â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Password Saat Ini *    â”‚ â”‚
â”‚ â”‚ [________________]      â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Password Baru           â”‚ â”‚
â”‚ â”‚ [________________]      â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Konfirmasi Password Baruâ”‚ â”‚
â”‚ â”‚ [________________]      â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ [Ganti Password]       â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Rekening Bank          â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”‚
â”‚ â”‚ â”‚ BCA                â”‚ â”‚ â”‚
â”‚ â”‚ â”‚ 1234567890         â”‚ â”‚ â”‚
â”‚ â”‚ â”‚ PT Jastip China    â”‚ â”‚ â”‚
â”‚ â”‚ â”‚       [Edit][Hapus]â”‚ â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”‚
â”‚ â”‚ â”‚ Mandiri            â”‚ â”‚ â”‚
â”‚ â”‚ â”‚ 9876543210         â”‚ â”‚ â”‚
â”‚ â”‚ â”‚ PT Jastip China    â”‚ â”‚ â”‚
â”‚ â”‚ â”‚       [Edit][Hapus]â”‚ â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚
â”‚ â”‚ [+ Tambah Rekening]  â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Info Kontak             â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Nomor WhatsApp Admin * â”‚ â”‚
â”‚ â”‚ [62 812-0000-0000]      â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Email CS *              â”‚ â”‚
â”‚ â”‚ [hello@jastipchina.id]  â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Jam Operasional         â”‚ â”‚
â”‚ â”‚ [Senin-Sabtu, 09-18]    â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ [Simpan]               â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Info Brand              â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Nama Brand *            â”‚ â”‚
â”‚ â”‚ [Jastip China]          â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Tagline (CN) *          â”‚ â”‚
â”‚ â”‚ [é²œè´§ç›´è¾¾]               â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Tagline (ID) *          â”‚ â”‚
â”‚ â”‚ [Barang China, sampai..]â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Deskripsi Footer         â”‚ â”‚
â”‚ â”‚ [Jastip China - jasa..] â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ [Simpan]               â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- "Settings" â†’ "Pengaturan Umum" active

### Section 2: Profil Admin
- **Layout:** Card, full width
- **Content:**
  - Email (read-only, disabled): "admin@jastipchina.local"
  - Password Saat Ini (required, password input): verifikasi sebelum ganti
  - Password Baru (optional, password input): min 8 chars
  - Konfirmasi Password Baru (optional): must match
  - "Ganti Password" button (Primary)
- **Validation:**
  - Current password must match (API verify)
  - New password: min 8, letter + number
  - Confirm must match
- **Success:** Toast "Password berhasil diganti." + clear fields
- **Error:** "Password saat ini salah."

### Section 3: Rekening Bank
- **Layout:** Card, full width
- **Content:** List of bank accounts (from Pengaturan or static config)
- **Each rekening card:**
  ```
  Bank: [nama bank]
  No. Rekening: [nomor] (monospace, Inter 600)
  Atas Nama: [pemilik]
  [Edit] [Hapus]
  ```
- **Actions:**
  - "+ Tambah Rekening" (ghost button)
  - Edit â†’ modal form
  - Hapus â†’ confirm modal
- **Modal form (Tambah/Edit):**
  - Bank (input or dropdown: BCA, Mandiri, BNI, BRI, CIMB)
  - No. Rekening (input, numeric)
  - Atas Nama (input)
  - [Batal] [Simpan]

### Section 4: Info Kontak
- **Layout:** Card, full width
- **Fields:**
  1. **Nomor WhatsApp Admin** (required)
     - Input: tel, prefix "+62"
     - Helper: "Dipakai buat link Chat WhatsApp + broadcast notifikasi"
     - Validation: format check
  2. **Email Customer Service** (required)
     - Input: email
     - Validation: email format
  3. **Jam Operasional** (optional)
     - Input: text
     - Placeholder: "Senin-Sabtu, 09:00-18:00 WIB"
- **Button:** "Simpan" (Primary)
- **Success:** Toast "Info kontak disimpan."

### Section 5: Info Brand
- **Layout:** Card, full width
- **Fields:**
  1. **Nama Brand** (required)
     - Default: "Jastip China"
  2. **Tagline (CN)** (required)
     - Chinese text, Ma Shan Zheng font
     - Default: "é²œè´§ç›´è¾¾"
  3. **Tagline (ID)** (required)
     - Default: "Barang China, sampai pintu rumah"
  4. **Deskripsi Footer** (optional, textarea)
     - Default: "Jastip China - jasa titip barang China terpercaya..."
     - Max 500 chars
- **Button:** "Simpan" (Primary)
- **Success:** Toast "Info brand disimpan."

---

## States

### Loading
- Skeleton all cards

### Save Loading (per card)
- Each "Simpan" button: spinner + "Menyimpan..."

### Save Success
- Toast: "[Section] disimpan."
- Card updates

### Password Change Error
- "Password saat ini salah." (inline on current password field)

### Validation Error
- Per-field inline errors

### Rekening Delete Confirm
- "Hapus rekening ini? Customer nggak bakal bisa lihat rekening ini buat transfer."
- If only 1 rekening: "Minimal 1 rekening harus ada. Tambah rekening lain dulu."

---

## Interactions

### Ganti Password
- Fill current + new + confirm â†’ click "Ganti Password"
- API: POST /api/admin/change-password
- Verify current â†’ if match, update
- On success: clear fields, toast
- On fail: error on current password field

### Rekening CRUD
- **Tambah:** Click "+ Tambah Rekening" â†’ modal form â†’ save â†’ add to list
- **Edit:** Click "Edit" â†’ modal pre-filled â†’ save â†’ update
- **Hapus:** Click "Hapus" â†’ confirm â†’ delete â†’ remove from list

### Info Kontak Save
- Fill fields â†’ click "Simpan" â†’ API update â†’ toast

### Info Brand Save
- Fill fields â†’ click "Simpan" â†’ API update â†’ toast
- Tagline (CN): font preview (Ma Shan Zheng)

---

## Edge Cases

### Only One Rekening (can't delete)
- Disable "Hapus" if only 1 rekening
- Or: show warning "Minimal 1 rekening harus ada."

### WhatsApp Number Format
- Auto-format: strip leading 0, add +62 prefix
- Display: "+62 812-0000-0000"

### Brand Name Change
- Affects: header logo, footer, page titles
- Global update (all pages reflect new name)

### Tagline CN Font
- Ensure Ma Shan Zheng loaded
- Preview in form (real-time)

### Password Reuse
- If new password == current: "Password baru nggak boleh sama dengan yang lama."

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "SETTINGS" / "GENERAL SETTINGS" ALL-CAPS
3. âŒ NO "2FA setup" (password is enough for MVP)
4. âŒ NO email change (admin email is immutable)
5. âŒ NO "Delete account" (admin account permanent)
6. âŒ NO SMTP/email server config (WhatsApp only for MVP)
7. âŒ NO "Maintenance mode" toggle (backlog)
8. âŒ NO "API keys" management (backlog)

---

## Copy

### Page Title (H1)
```
Pengaturan Umum
```

### Profil Admin
```
Profil Admin

Email (tidak bisa diubah)
admin@jastipchina.local

Password Saat Ini *
[________________]
(verifikasi sebelum ganti password)

Password Baru
[________________]
Min 8 karakter, ada huruf dan angka

Konfirmasi Password Baru
[________________]

[Ganti Password]
```

### Rekening Bank
```
Rekening Bank
(Dipakai customer buat transfer pembayaran)

Bank: BCA
No. Rekening: 1234567890
Atas Nama: PT Jastip China
[Edit] [Hapus]

Bank: Mandiri
No. Rekening: 9876543210
Atas Nama: PT Jastip China
[Edit] [Hapus]

[+ Tambah Rekening]
```

### Rekening Modal
```
Tambah Rekening

Bank *
[BCA â–¼]
(BCA, Mandiri, BNI, BRI, CIMB)

No. Rekening *
[1234567890]

Atas Nama *
[PT Jastip China]

[Batal] [Simpan]
```

### Info Kontak
```
Info Kontak

Nomor WhatsApp Admin *
[62 812-0000-0000]
(Dipakai buat link Chat WhatsApp + broadcast notifikasi)

Email Customer Service *
[hello@jastipchina.id]

Jam Operasional
[Senin-Sabtu, 09:00-18:00 WIB]

[Simpan]
```

### Info Brand
```
Info Brand

Nama Brand *
[Jastip China]

Tagline (CN) *
[é²œè´§ç›´è¾¾]

Tagline (ID) *
[Barang China, sampai pintu rumah]

Deskripsi Footer
[Jastip China - jasa titip barang China terpercaya. Barang asli, harga bersahabat, sampai depan pintu rumah.]

[Simpan]
```

### Validation Errors
```
Password saat ini salah.
Password baru nggak boleh sama dengan yang lama.
Password minimal 8 karakter.
Konfirmasi password tidak cocok.
Nomor WhatsApp tidak valid.
Format email tidak valid.
Nama brand wajib diisi.
Tagline (CN) wajib diisi.
Tagline (ID) wajib diisi.
Bank wajib dipilih.
No. Rekening wajib diisi.
Atas Nama wajib diisi.
```

### Delete Confirm (Rekening)
```
Hapus rekening ini?
Customer nggak bakal bisa lihat rekening ini buat transfer.

[Batal] [Ya, Hapus]
```

### Delete Blocked (Last Rekening)
```
Minimal 1 rekening harus ada.
Tambah rekening lain dulu.
```

### Toasts
```
Password berhasil diganti.
Rekening disimpan.
Rekening dihapus.
Info kontak disimpan.
Info brand disimpan.
```
