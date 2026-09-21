# Screen Admin 04: Kelola Produk

## Tujuan
Admin lihat semua produk, filter by kategori/status, search, dan CRUD (create new, edit, delete, set unggulan, toggle status).

---

## Layout Wireframe (Desktop)

```
┌─────┬───────────────────────────────────────────────────────────┐
│     │  Kelola Produk                          [+ Tambah Produk] │
│  S  ├───────────────────────────────────────────────────────────┤
│  i  │                                                            │
│  d  │  [🔍 Cari produk...]  Kategori: [Semua ▼]  Status: [Semua▼]│
│  e  │                                                            │
│  b  │  ┌────────────────────────────────────────────────────────┐ │
│  a  │  │ Produk           Kategori   Harga    Stok  Status  Act│ │
│  r  │  ├────────────────────────────────────────────────────────┤ │
│  d  │  │ [img] Tas Back..  Tas        282K     15   Aktif   ⋮  │ │
│     │  │ [img] Kaos Over.  Fashion     35K     50   Aktif   ⋮  │ │
│  P  │  │ [img] Dompet Kul. Aksesoris  223K      8   Aktif   ⋮  │ │
│  r  │  │ [img] Sepatu Run. Sepatu     450K      0   Stok Hb  ⋮ │ │
│  o  │  │ ...                                                       │ │
│  d  │  └────────────────────────────────────────────────────────┘ │
│  u  │                                                            │
│  k  │  [← Prev]  1 2 3  [Next →]    10 per page                 │
│     │                                                            │
└─────┴───────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [☰]  Kelola Produk  [+]  │
├──────────────────────────┤
│ [🔍 Cari produk...]       │
├──────────────────────────┤
│ [Semua][Tas][Sepatu]      │ ← kategori scroll
│ [Aksesoris][Elektronik]   │
│ [Fashion]                 │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ [img] Tas Backpack     │ │
│ │ Tas  |  Rp 282.000     │ │
│ │ Stok: 15  [Aktif]  [⋮] │ │
│ ├────────────────────────┤ │
│ │ [img] Kaos Oversized   │ │
│ │ Fashion | Rp 35.250    │ │
│ │ Stok: 50  [Aktif]  [⋮] │ │
│ ├────────────────────────┤ │
│ │ [img] Dompet Kulit     │ │
│ │ Aksesoris | Rp 223.250 │ │
│ │ Stok: 8  [Aktif]  [⋮]  │ │
│ ├────────────────────────┤ │
│ │ [img] Sepatu Running   │ │
│ │ Sepatu | Rp 450.000    │ │
│ │ Stok: 0  [Habis]  [⋮]  │ │
│ └────────────────────────┘ │
│                            │
│ [Muat Lainnya]            │
│                            │
├──────────────────────────┤
│[Dash][Order][+][Prod][More]│
└──────────────────────────┘

(Action Menu - when ⋮ clicked):
┌──────────────────────────┐
│  Edit Produk              │
│  Set/Unggulan             │
│  Ubah Status (Aktif/Hb)   │
│  Hapus Produk             │
└──────────────────────────┘
```

---

## Sections

### Section 1: Admin Sidebar
- "Produk" active

### Section 2: Header + Tambah
- **Title:** "Kelola Produk" (H1)
- **Action:** "+ Tambah Produk" (Primary, top right) → `/admin/produk/new`

### Section 3: Toolbar
- **Content:**
  - Search: "Cari produk..." (debounce 300ms, filter by nama)
  - Kategori dropdown: Semua, Tas, Sepatu, Aksesoris, Elektronik, Fashion
  - Status dropdown: Semua, Aktif, Stok Habis, Nonaktif
- **Mobile:** Search + kategori scroll tabs (no status dropdown, use "Semua")

### Section 4: Produk Table (Desktop)
- **Columns:**
  ```
  | Produk (img+nama) | Kategori | Harga | Stok | Status | Action |
  ```
- **Row details:**
  - Produk: thumbnail 40x40px + nama (Inter 600, 14px)
  - Kategori: badge (small)
  - Harga: Noto Serif SC 700, 16px, gold
  - Stok: number (Inter 500, 14px) + "Stok Rendah" badge if < 5
  - Status: "Aktif" (jade), "Stok Habis" (red-muted), "Nonaktif" (grey)
  - Action: "⋮" menu (dropdown: Edit, Set Unggulan, Ubah Status, Hapus)
- **Row hover:** Background #F7F3EC
- **Pagination:** 10 per page

### Section 5: Produk Cards (Mobile)
- **Layout:** Vertical stack, 12px gap
- **Each card:**
  ```
  Layout: horizontal (thumbnail left, info right, action far right)
  Thumbnail: 56x56px, radius 8px
  Info:
    - Nama (Inter 600, 14px)
    - Kategori + Harga (horizontal)
    - Stok + Status badge
  Action: "⋮" menu
  Click (card body): → /admin/produk/[id]
  ```
- **Load More:** Button at bottom

---

## States

### Loading
- Skeleton table rows / cards

### Empty (No Products)
- "Belum ada produk. Tambah produk pertama kamu."
- CTA: "+ Tambah Produk"

### Search No Results
- "Nggak ketemu produk 'XYZ'."

### Delete Confirm
- Modal: "Hapus produk ini? Aksi ini nggak bisa dibatalkan."
- Warning: "Pesanan yang udah ada masih bisa lihat produk ini (soft delete)."
- [Batal] [Ya, Hapus]

### Delete Success
- Toast: "Produk dihapus."
- Row removed from table (fade-out 200ms)

---

## Interactions

### Search
- Debounce 300ms → filter by nama (contains, case-insensitive)

### Filter (Kategori + Status)
- Dropdown change → filter list
- URL sync: `/admin/produk?kategori=Tas&status=AKTIF`

### Row Click
- Click row body → `/admin/produk/[id]` (edit page)
- Click "⋮" → action menu (don't navigate)

### Action Menu
- **Edit Produk:** → `/admin/produk/[id]`
- **Set/Unggulan:** Toggle is_unggulan (toast "Produk dijadikan unggulan" / "Unggulan dicabut")
- **Ubah Status:** Toggle AKTIF ↔ NONAKTIF (toast "Produk diaktifkan" / "Produk dinonaktifkan")
- **Hapus Produk:** → confirm modal → soft delete

### Tambah Produk
- Click "+ Tambah Produk" → `/admin/produk/new`

### Pagination
- Click page → fetch new data

---

## Edge Cases

### Stok 0 (Habis)
- Status auto: "Stok Habis"
- Badge: red-muted
- Still visible in list (not hidden)
- Can still edit (restock)

### Produk Nonaktif
- Hidden from customer katalog
- Still visible in admin list (with "Nonaktif" badge)
- Can reactivate

### Many Products (50+)
- Pagination 10 per page
- Search + filter essential

### Produk with Active Pesanan
- Cannot hard delete (pesanan reference)
- Soft delete: status → DIHAPUS, hidden from customer + admin list (unless filter "Semua" includes deleted)
- Or: hide from admin list by default, show with "Tampilkan Dihapus" toggle

### Image Missing
- Fallback: placeholder icon (bag shape, #E8DCC8)

---

## WHAT NOT TO DO

1. ❌ NO "→" in buttons
2. ❌ NO "PRODUCTS" / "MANAGE PRODUCTS" ALL-CAPS
3. ❌ NO bulk select + bulk delete (MVP: individual)
4. ❌ NO drag-to-reorder (use is_unggulan flag instead)
5. ❌ NO inline edit (use detail page)
6. ❌ NO duplicate product button (backlog)

---

## Copy

### Page Title (H1)
```
Kelola Produk
```

### Actions
```
[+ Tambah Produk]
```

### Toolbar
```
[Cari produk...]  Kategori: [Semua ▼]  Status: [Semua ▼]
```

### Table Headers
```
Produk | Kategori | Harga | Stok | Status | Action
```

### Row
```
[img] Tas Backpack Premium    Tas         Rp 282.000    15    [Aktif]    ⋮
```

### Action Menu
```
Edit Produk
Set Unggulan
Ubah Status
Hapus Produk
```

### Empty States
```
Belum ada produk. Tambah produk pertama kamu.
Nggak ketemu produk 'XYZ'.
```

### Delete Confirm
```
Hapus produk ini? Aksi ini nggak bisa dibatalkan.
Pesanan yang udah ada masih bisa lihat produk ini (soft delete).

[Batal]  [Ya, Hapus]
```

### Toasts
```
Produk dihapus.
Produk dijadikan unggulan.
Unggulan dicabut.
Produk diaktifkan.
Produk dinonaktifkan.
```

### Pagination
```
[← Sebelumnya]  1 2 3  [Selanjutnya →]
10 per halaman
```
