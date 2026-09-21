# Screen Admin 02: Kelola Pesanan

## Tujuan
Admin lihat semua pesanan, filter by status, search by invoice, dan quick action: verifikasi pembayaran, update status.

---

## Layout Wireframe (Desktop)

```
┌─────┬───────────────────────────────────────────────────────────┐
│     │  Kelola Pesanan                                           │
│  S  ├───────────────────────────────────────────────────────────┤
│  i  │                                                            │
│  d  │  [🔍 Cari invoice...]  Status: [Semua ▼]  [Export CSV]   │
│  e  │                                                            │
│  b  │  [Semua] [Menunggu Bayar] [Verifikasi] [Diproses]         │
│  a  │  [Dikirim] [Selesai] [Dibatalkan]                          │
│  r  │                                                            │
│     │  ┌────────────────────────────────────────────────────────┐ │
│  D  │  │ Invoice           Customer         Tgl     Total  Status│ │
│  a  │  ├────────────────────────────────────────────────────────┤ │
│  s  │  │ INV-...I9J0K1L2  budi@email.com  20 Jan  365K  [Verif]│ │
│  h  │  │ INV-...E5F6G7H8  siti@email.com  18 Jan  644K  [Proses]│ │
│  b  │  │ INV-...A1B2C3D4  budi@email.com  15 Jan  562K  [Selesai│ │
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
│ [☰]  Kelola Pesanan [👤]│
├──────────────────────────┤
│ [🔍 Cari invoice...]      │
├──────────────────────────┤
│ [Semua][Bayar][Verif]     │ ← horizontal scroll
│ [Proses][Kirim][Selesai] │
│ [Batal]                   │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ INV-...I9J0K1L2        │ │
│ │ budi@email.com         │ │
│ │ 20 Jan  [Verifikasi]   │ │
│ │           Rp 365.575    │ │
│ ├────────────────────────┤ │
│ │ INV-...E5F6G7H8        │ │
│ │ siti@email.com         │ │
│ │ 18 Jan  [Diproses]     │ │
│ │           Rp 644.280    │ │
│ ├────────────────────────┤ │
│ │ INV-...A1B2C3D4        │ │
│ │ budi@email.com         │ │
│ │ 15 Jan  [Selesai]      │ │
│ │           Rp 562.750    │ │
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
- Same as dashboard, "Pesanan" active

### Section 2: Toolbar
- **Layout:** Horizontal bar, margin 24px
- **Content:**
  - Search input: "Cari invoice..." (placeholder, monospace)
  - Status filter dropdown: Semua, Menunggu Bayar, Menunggu Verifikasi, Diproses Admin, Dikonsolidasi, Dikirim, Tiba Lokal, Selesai, Dibatalkan
  - Export CSV button (secondary, desktop only) → download pesanan list
- **Behavior:**
  - Search: debounce 300ms → filter by invoice (contains)
  - Status: select → filter list
  - Both: combine filters

### Section 3: Status Tabs (Quick Filter)
- **Layout:** Horizontal row (desktop) / scroll (mobile)
- **Tabs:** Semua, Menunggu Bayar, Menunggu Verifikasi, Diproses, Dikirim, Selesai, Dibatalkan
- **Active state:** Background rgba(200,16,46,0.1), text Chinese Red, font-weight 600
- **Behavior:** Click → filter list by status (sync with dropdown)
- **Badge count:** Optional (count per status, small badge on tab)

### Section 4: Pesanan Table (Desktop)
- **Layout:** Table, full width
- **Columns:**
  ```
  | Invoice | Customer | Tanggal | Total | Status | Action |
  ```
- **Column details:**
  - Invoice: monospace, Inter 600, 14px
  - Customer: email (Inter 400, 14px)
  - Tanggal: DD MMM YYYY (Inter 400, 14px)
  - Total: Noto Serif SC 700, 16px, gold #B5941F
  - Status: badge (from components.md)
  - Action: "Detail" link (ghost, → `/admin/pesanan/[id]`)
- **Row hover:** Background #F7F3EC, cursor pointer
- **Row click:** Navigate to detail
- **Pagination:** Bottom, 10 per page

### Section 5: Pesanan Cards (Mobile)
- **Layout:** Vertical stack, 12px gap
- **Each card:**
  ```
  Invoice (Inter 600, 14px, monospace)
  Customer email (Inter 400, 13px, #6B5D52)
  Tanggal + Status badge (horizontal)
  Total (right-aligned, Noto Serif SC 700, 16px, gold)
  Click: → /admin/pesanan/[id]
  ```
- **Load More:** Button at bottom

### Section 6: Pagination (Desktop)
- **Layout:** Center, margin 24px top
- **Content:** Prev/Next + page numbers
- **Style:** Same as customer katalog pagination
- **Page size:** 10 per page (desktop), 20 per page (mobile load more)

---

## States

### Loading
- Table: skeleton rows (10 placeholders)
- Mobile: skeleton cards

### Empty (No Pesanan)
- Table area: "Belum ada pesanan."
- If filtered: "Nggak ada pesanan dengan status ini."

### Search No Results
- "Nggak ketemu invoice 'XYZ'. Cek lagi nomornya."

### Export Loading
- Button: spinner + "Mengexport..."
- On complete: file downloads, toast "CSV terdownload"

---

## Interactions

### Search
- Debounce 300ms
- Filter by invoice number (contains, case-insensitive)
- Preserve status filter

### Status Filter (Dropdown + Tabs)
- Both sync: change dropdown → update tab active, change tab → update dropdown
- Tabs: quick access, dropdown: full list

### Row Click
- Click row (desktop) or card (mobile) → `/admin/pesanan/[id]`

### Export CSV
- Click → API: GET /api/admin/pesanan/export?status=X → CSV file
- Desktop only (mobile: no export, just view)

### Pagination
- Click page → fetch new data
- URL sync: `/admin/pesanan?page=2&status=DIPROSES&q=`

---

## Edge Cases

### Very Long Invoice List (100+)
- Pagination 10 per page
- Show "X dari Y pesanan" count

### Custom PO Pesanan
- Invoice shows "PO-" prefix for PO-derived orders
- Or same format, but detail page shows PO origin

### Pesanan Dibatalkan by System (Kadaluwarsa)
- Show in list with badge "Dibatalkan" (grey)
- Can still view detail (for audit)

### Customer Deleted Account
- Still show pesanan (pesanan is independent of account deletion)
- Customer email: "[Akun dihapus]" or last known email

---

## WHAT NOT TO DO

1. ❌ NO "→" in "Detail" link
2. ❌ NO "ORDERS" / "MANAGE ORDERS" ALL-CAPS
3. ❌ NO bulk select checkboxes (MVP: individual action only)
4. ❌ NO inline status edit (use detail page for status update)
5. ❌ NO drag-to-reorder rows
6. ❌ NO "Print invoice" button (backlog)

---

## Copy

### Page Title (H1)
```
Kelola Pesanan
```

### Toolbar
```
[Cari invoice...]  Status: [Semua ▼]  [Export CSV]
```

### Status Tabs
```
Semua
Menunggu Bayar
Menunggu Verifikasi
Diproses
Dikirim
Selesai
Dibatalkan
```

### Table Headers
```
Invoice | Customer | Tanggal | Total | Status | Action
```

### Table Row
```
INV-20240120-I9J0K1L2  budi@email.com  20 Jan 2024  Rp 365.575  [Menunggu Verifikasi]  [Detail]
```

### Empty States
```
Belum ada pesanan.
Nggak ada pesanan dengan status ini.
Nggak ketemu invoice 'XYZ'. Cek lagi nomornya.
```

### Pagination
```
[← Sebelumnya]  1 2 3  [Selanjutnya →]
10 per halaman
```

### Mobile Load More
```
Muat Lainnya
```

### Toasts
```
CSV terdownload
```
