---
title: "Screen Admin 08: Kelola Kategori"
tags: [screen, admin, manajemen]
tanggal: 2026-09-21
---
# Screen Admin 08: Kelola Kategori

## Tujuan
Admin CRUD kategori produk. Kategori sederhana: nama + slug + icon (optional). Dipakai di produk dan katalog filter.

---

## Layout Wireframe (Desktop)

```
┌─────┬───────────────────────────────────────────────────────────┐
│     │  Kelola Kategori                       [+ Tambah Kategori] │
│  S  ├───────────────────────────────────────────────────────────┤
│  i  │                                                            │
│  d  │  ┌────────────────────────────────────────────────────────┐ │
│  e  │  │ Kategori       Slug          Jml Produk   Action       │ │
│  b  │  ├────────────────────────────────────────────────────────┤ │
│  a  │  │ Tas             tas            5           [Edit] [Hapus]│ │
│  r  │  │ Sepatu          sepatu         3           [Edit] [Hapus]│ │
│     │  │ Aksesoris       aksesoris      4           [Edit] [Hapus]│ │
│  D  │  │ Elektronik      elektronik     2           [Edit] [Hapus]│ │
│  a  │  │ Fashion         fashion        6           [Edit] [Hapus]│ │
│  s  │  └────────────────────────────────────────────────────────┘ │
│  h  │                                                            │
│  b  │                                                            │
│  o  │  (Edit/Create Modal):                                     │
│  a  │  ┌──────────────────────────────────────────────────────┐  │
│  r  │  │  Tambah Kategori                          [X]        │  │
│  d  │  │                                                        │  │
│  P  │  │  Nama Kategori *                                      │  │
│  r  │  │  [Tas____________________________]                     │  │
│  o  │  │                                                        │  │
│  d  │  │  Slug * (auto-generate, bisa edit)                    │  │
│  u  │  │  [tas____________________________]                     │  │
│  k  │  │  URL: /katalog?kategori=tas                           │  │
│     │  │                                                        │  │
│  P  │  │  Icon (opsional)                                      │  │
│  O  │  │  [Pilih Icon ▼]  atau upload SVG                       │  │
│  K  │  │                                                        │  │
│  o  │  │  [Batal]  [Simpan]                                    │  │
│  m  │  └──────────────────────────────────────────────────────┘  │
│  p  │                                                            │
│     │                                                            │
│  L  │                                                            │
│  o  │                                                            │
│  g  │                                                            │
│     │                                                            │
└─────┴───────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [☰]  Kelola Kategori [+] │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ Tas          5 produk   │ │
│ │              [Edit][Hapus]│ │
│ ├────────────────────────┤ │
│ │ Sepatu       3 produk   │ │
│ │              [Edit][Hapus]│ │
│ ├────────────────────────┤ │
│ │ Aksesoris    4 produk   │ │
│ │              [Edit][Hapus]│ │
│ ├────────────────────────┤ │
│ │ Elektronik   2 produk   │ │
│ │              [Edit][Hapus]│ │
│ ├────────────────────────┤ │
│ │ Fashion      6 produk   │ │
│ │              [Edit][Hapus]│ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│[Dash][Order][+][Prod][More]│
└──────────────────────────┘

(Create/Edit Modal - bottom sheet):
┌──────────────────────────┐
│  ━━━ (drag handle)       │
│                      [X] │
│  Tambah Kategori         │
│                           │
│  Nama Kategori *         │
│  [Tas_________________]   │
│                           │
│  Slug *                   │
│  [tas_________________]   │
│  URL: /katalog?kategori=tas│
│                           │
│  Icon (opsional)          │
│  [Pilih Icon ▼]            │
│                           │
│  [Batal]    [Simpan]      │
└──────────────────────────┘
```

---

## Sections

### Section 1: Admin Sidebar
- "Settings" → "Kategori" submenu active, or standalone "Kategori" link

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
  - Jml Produk: count (e.g., "5 produk") — from Produk table
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
     - Auto from nama (lowercase, spaces → hyphens)
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
- Type nama → slug auto-generates (real-time)
- If slug manually edited: stop auto-generate (respect user input)
- Slug format: lowercase, spaces → hyphens, no special chars

### Edit
- Click "Edit" → modal opens with pre-filled values
- Save → update

### Delete
- Click "Hapus" → confirm modal
- If kategori has products: show count warning
- Confirm → soft delete or reassign products to "Tanpa Kategori"

### Jml Produk Count
- Display count of Produk with this kategoriId
- If 0: "0 produk" (safe to delete)
- If > 0: show count + delete warning

---

## Edge Cases

### Kategori Used by Active Pesanan
- Cannot hard delete (pesanan references kategori via produk)
- Soft delete: status → NONAKTIF, hidden from admin list (unless "Tampilkan Nonaktif")
- Products keep kategoriId (for historical data)

### Kategori Name Duplicate
- Case-insensitive unique check
- "Tas" and "tas" = duplicate

### Slug Collision
- "Tas Baru" and "Tas-Baru" → same slug "tas-baru"
- Error: "Slug 'tas-baru' udah dipake"

### No Kategori (first setup)
- Show prompt: "Tambah kategori pertama buat mulai katalog produk."
- CTA: "+ Tambah Kategori"

---

## WHAT NOT TO DO

1. ❌ NO "→" in buttons
2. ❌ NO "CATEGORIES" ALL-CAPS
3. ❌ NO nested/sub-categories (MVP: flat list only)
4. ❌ NO category image upload (icon preset only)
5. ❌ NO category description field (nama + slug is enough)
6. ❌ NO drag-to-reorder (alphabetical or manual order, backlog)

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
[Pilih Icon ▼]

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
