# Screen Admin 10: Log Aktivitas

## Tujuan
Admin lihat audit log semua aksi admin: verifikasi pembayaran, update status pesanan, update resi, penawaran PO, hapus produk, dll. Filter by jenis aksi + tanggal.

---

## Layout Wireframe (Desktop)

```
┌─────┬───────────────────────────────────────────────────────────┐
│     │  Log Aktivitas                                            │
│  S  ├───────────────────────────────────────────────────────────┤
│  i  │                                                            │
│  d  │  Jenis: [Semua ▼]  Tanggal: [__/__/____]  [Filter]        │
│  e  │                                                            │
│  b  │  ┌────────────────────────────────────────────────────────┐ │
│  a  │  │ Waktu          Admin         Aksi       Entitas       │ │
│  r  │  ├────────────────────────────────────────────────────────┤ │
│     │  │ 20 Jan 09:15   admin@...    Verifikasi  INV-...I9J0K │ │
│  D  │  │ 20 Jan 08:50   admin@...    Update Resi INV-...E5F6G │ │
│  a  │  │ 20 Jan 08:30   admin@...    Penawaran   PO-...001    │ │
│  s  │  │ 19 Jan 16:00   admin@...    Status:     INV-...A1B2  │ │
│  h  │  │ 19 Jan 14:30   admin@...    Tambah      Dompet Kulit │ │
│  b  │  │ ...                                                       │ │
│  o  │  └────────────────────────────────────────────────────────┘ │
│  a  │                                                            │
│  r  │  [← Prev]  1 2 3  [Next →]    20 per page                 │
│  d  │                                                            │
│     │                                                            │
│  P  │                                                            │
│  r  │                                                            │
│  o  │                                                            │
│  d  │                                                            │
│  u  │                                                            │
│  k  │                                                            │
│     │                                                            │
│  P  │                                                            │
│  O  │                                                            │
│     │                                                            │
│  K  │                                                            │
│  o  │                                                            │
│  m  │                                                            │
│  p  │                                                            │
│     │                                                            │
│  L  │                                                            │
│  o  │                                                            │
│  g  │                                                            │
│     │                                                            │
│  S  │                                                            │
│  e  │                                                            │
│  t  │                                                            │
│  t  │                                                            │
│  .  │                                                            │
└─────┴───────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [☰]  Log Aktivitas [👤]  │
├──────────────────────────┤
│ Jenis: [Semua ▼]          │
│ Tgl: [__/__/____] [Filter]│
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ 20 Jan 09:15           │ │
│ │ admin@jastipchina.local│ │
│ │ Verifikasi Pembayaran  │ │
│ │ INV-...I9J0K1L2        │ │
│ ├────────────────────────┤ │
│ │ 20 Jan 08:50           │ │
│ │ admin@jastipchina.local│ │
│ │ Update Resi            │ │
│ │ INV-...E5F6G7H8        │ │
│ ├────────────────────────┤ │
│ │ 20 Jan 08:30           │ │
│ │ admin@jastipchina.local│ │
│ │ Penawaran PO           │ │
│ │ PO-20240120-001        │ │
│ ├────────────────────────┤ │
│ │ 19 Jan 16:00           │ │
│ │ admin@jastipchina.local│ │
│ │ Status: Selesai        │ │
│ │ INV-...A1B2C3D4        │ │
│ └────────────────────────┘ │
│                            │
│ [Muat Lainnya]            │
│                            │
├──────────────────────────┤
│[Dash][Order][+][Prod][More]│
└──────────────────────────┘
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
  - Entitas: invoice/PO-ID/product name (link, Chinese Red) → related detail
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
- Jenis dropdown → filter by action type
- Tanggal → filter by date (or range)
- Both combine
- URL sync: `/admin/log?jenis=verify&tanggal=2024-01-20`

### Entitas Link
- Click invoice → `/admin/pesanan/[id]`
- Click PO-ID → `/admin/po/[id]`
- Click product → `/admin/produk/[id]`
- Click komplain → `/admin/komplain/[id]`

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
- "Export CSV" button (desktop only) — backlog, not MVP

---

## WHAT NOT TO DO

1. ❌ NO "→" in links
2. ❌ NO "ACTIVITY LOG" / "AUDIT TRAIL" ALL-CAPS
3. ❌ NO real-time auto-refresh (manual filter + paginate)
4. ❌ NO "Delete log" button (logs are permanent, append-only)
5. ❌ NO search by keyword (filter by jenis + tanggal is enough for MVP)
6. ❌ NO charts/visualizations (just list)

---

## Copy

### Page Title (H1)
```
Log Aktivitas
```

### Filter
```
Jenis: [Semua ▼]  Tanggal: [__/__/____]  [Filter]
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
[← Sebelumnya]  1 2 3  [Selanjutnya →]
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
