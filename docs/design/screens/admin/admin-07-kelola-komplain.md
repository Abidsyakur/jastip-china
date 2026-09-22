---
title: "Screen Admin 07: Kelola Komplain"
tags: [screen, admin, manajemen]
tanggal: 2026-09-21
---
# Screen Admin 07: Kelola Komplain

## Tujuan
Admin lihat semua komplain dari customer, filter by status, buka detail, respond (tanggapi), dan resolve (selesai/ditolak). Link ke pesanan terkait.

---

## Layout Wireframe (Desktop)

```
┌─────┬───────────────────────────────────────────────────────────┐
│     │  Kelola Komplain                                          │
│  S  ├───────────────────────────────────────────────────────────┤
│  i  │                                                            │
│  d  │  [🔍 Cari komplain...]  Status: [Semua ▼]                  │
│  e  │                                                            │
│  b  │  [Semua] [Baru] [Diproses] [Selesai] [Ditolak]            │
│  a  │                                                            │
│  r  │  ┌────────────────────────────────────────────────────────┐ │
│     │  │ Komplain-ID   Pesanan         Customer   Tgl   Status │ │
│  D  │  ├────────────────────────────────────────────────────────┤ │
│  a  │  │ KMP-001  INV-...A1B2C3D4  budi@..  22 Jan [Baru]    ⋮ │ │
│  s  │  │ KMP-002  INV-...E5F6G7H8  siti@..  21 Jan [Diproses]⋮ │ │
│  h  │  │ KMP-003  INV-...I9J0K1L2  andi@..  20 Jan [Selesai] ⋮ │ │
│  b  │  │ ...                                                       │ │
│  o  │  └────────────────────────────────────────────────────────┘ │
│  a  │                                                            │
│  r  │  [← Prev]  1 2 3  [Next →]    10 per page                 │
│  d  │                                                            │
│     │                                                            │
│  P  │  (Detail Drawer when ⋮ / row clicked):                   │
│  r  │  ┌──────────────────────────────────────────────────────┐ │
│  o  │  │  Komplain KMP-001                          [X]        │ │
│  d  │  │  Status: [Baru]                                        │ │
│  u  │  │  22 Jan 2024, 10:00 WIB                              │ │
│  k  │  │                                                        │ │
│     │  │  ─── Info Komplain ───                                  │ │
│  P  │  │  Pesanan: INV-20240115-A1B2C3D4  [Lihat Pesanan]    │ │
│  O  │  │  Customer: Budi Santoso (budi@email.com)            │ │
│  K  │  │  Tanggal Komplain: 22 Jan 2024                        │ │
│  o  │  │  Kategori: Barang Rusak                                 │ │
│  m  │  │                                                        │ │
│  p  │  │  Deskripsi:                                            │ │
│     │  │  Tas sampai tapi strap kanan putus. Kelihatannya    │ │
│  L  │  │  rusak saat pengiriman. Mau minta ganti atau...     │ │
│  o  │  │                                                        │ │
│  g  │  │  Foto (3):                                             │ │
│     │  │  [img1] [img2] [img3]    [Lihat]                      │ │
│  S  │  │                                                        │ │
│  e  │  │  ─── Riwayat ───                                       │ │
│  t  │  │  22 Jan 10:00 - Komplain diajukan (customer)        │ │
│  t  │  │                                                        │ │
│  .  │  │  ─── Tanggapan Admin ───                               │ │
│     │  │  [                                                  ]   │ │
│     │  │  [  Halo Budi, mau minta foto Strap yang...      ]   │ │
│     │  │                                                        │ │
│  P  │  │  Status: [Diproses ▼]                                  │ │
│  e  │  │  (Diproses / Selesai / Ditolak)                       │ │
│  s  │  │                                                        │ │
│  a  │  │  [Kirim Tanggapan]                                    │ │
│  n  │  └──────────────────────────────────────────────────────┘ │
│  a  │                                                            │
│  n  │                                                            │
└─────┴───────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [☰]  Kelola Komplain [👤]│
├──────────────────────────┤
│ [🔍 Cari komplain...]     │
├──────────────────────────┤
│ [Semua][Baru][Diproses]   │ ← horizontal scroll
│ [Selesai][Ditolak]        │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ KMP-001                │ │
│ │ INV-...A1B2C3D4        │ │
│ │ budi@email.com         │ │
│ │ 22 Jan  [Baru]         │ │
│ │             [Detail]   │ │
│ ├────────────────────────┤ │
│ │ KMP-002                │ │
│ │ INV-...E5F6G7H8        │ │
│ │ siti@email.com         │ │
│ │ 21 Jan  [Diproses]     │ │
│ │             [Detail]   │ │
│ └────────────────────────┘ │
│                            │
│ [Muat Lainnya]            │
│                            │
├──────────────────────────┤
│[Dash][Order][+][Prod][More]│
└──────────────────────────┘

(Detail - full screen page on mobile):
┌──────────────────────────┐
│ [←]  Komplain KMP-001   │
├──────────────────────────┤
│ [Baru]                     │
│ 22 Jan 2024, 10:00 WIB    │
│                            │
│ ─── Info Komplain ───     │
│ Pesanan: INV-...A1B2C3D4 │
│ [Lihat Pesanan]           │
│ Customer: Budi Santoso    │
│ Kategori: Barang Rusak    │
│                            │
│ Deskripsi:                 │
│ Tas sampai tapi strap     │
│ kanan putus...            │
│                            │
│ Foto (3):                  │
│ [img1][img2][img3]        │
│                            │
│ ─── Riwayat ───           │
│ 22 Jan 10:00 - Diajukan  │
│                            │
│ ─── Tanggapan ───         │
│ [                          ] │
│ [  Halo Budi, mau...   ] │
│                            │
│ Status: [Diproses ▼]       │
│                            │
│ [Kirim Tanggapan]         │
└──────────────────────────┘
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
  - Pesanan: invoice (clickable link → `/admin/pesanan/[id]`)
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
  [Detail] button → /admin/komplain/[id]
  ```

### Section 6: Detail (Drawer Desktop / Page Mobile)
- **Layout:** Right drawer 480px (desktop) / full page (mobile)
- **Content:**
  - Header: KMP-ID + status badge + tanggal
  - Info Komplain:
    - Pesanan link (→ `/admin/pesanan/[id]`)
    - Customer name + email
    - Kategori (Barang Rusak, Barang Tidak Sesuai, Pengiriman Lambat, Lainnya)
    - Deskripsi (read-only, full text)
    - Foto thumbnails (click → fullscreen)
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
  - Submit tanggapan → API: POST /api/admin/komplain/[id]/tanggapan
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
- Debounce 300ms → filter by KMP-ID or invoice (contains)

### Status Filter
- Dropdown + tabs sync

### Row Click
- Desktop: open drawer
- Mobile: navigate to `/admin/komplain/[id]`

### Lihat Pesanan
- Click invoice link → `/admin/pesanan/[id]` (new tab or same)

### Foto Fullscreen
- Click thumbnail → modal fullscreen, swipe through

### Tanggapan Submit
- Textarea + status → API → riwayat + status update
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
- Link → `/admin/pesanan/[id]` (same flow)

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

1. ❌ NO "→" in buttons
2. ❌ NO "COMPLAINTS" / "TICKETS" ALL-CAPS
3. ❌ NO "Priority" field (MVP: no priority levels)
4. ❌ NO "Assign to" field (single admin MVP)
5. ❌ NO SLA timer ("Respond within 24h")
6. ❌ NO canned/template responses (free text)
7. ❌ NO customer rating of resolution (backlog)

---

## Copy

### Page Title (H1)
```
Kelola Komplain
```

### Toolbar
```
[Cari komplain...]  Status: [Semua ▼]
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

Status: [Diproses ▼]
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
