# Screen Admin 05: Detail/Edit Produk

## Tujuan
Admin create new product atau edit existing. Form: nama, deskripsi, harga, kategori, gambar (multi-upload), varian (size/warna + stok), is_unggulan, status.

---

## Layout Wireframe (Desktop)

```
┌─────┬───────────────────────────────────────────────────────────┐
│     │  ← Kelola Produk                                          │
│  S  ├───────────────────────────────────────────────────────────┤
│  i  │                                                            │
│  d  │  Edit Produk: Tas Backpack Premium                       │
│  e  │  [Aktif]                                                  │
│  b  │                                                            │
│  a  │  ┌──────────────────────────────────────────────────────┐ │
│  r  │  │  Informasi Dasar                                       │ │
│     │  │                                                        │ │
│  D  │  │  Nama Produk *                                        │ │
│  a  │  │  [Tas Backpack Premium Kulit Sintetis____________]   │ │
│  s  │  │                                                        │ │
│  h  │  │  Kategori *                                           │ │
│  b  │  │  [Tas ▼]                                              │ │
│  o  │  │                                                        │ │
│  a  │  │  Deskripsi *                                          │ │
│  r  │  │  [                                                  ] │ │
│  d  │  │  [  Tas backpack bahan kulit sintetis premium.      ] │ │
│     │  │  [  Kapasitas 20L, cocok buat laptop 15 inch...    ] │ │
│  P  │  │  [                                                  ] │ │
│  r  │  │                                                        │ │
│  o  │  │  Harga (RMB) *      Kurs Otomatis: 1 RMB = Rp 2.450  │ │
│  d  │  │  [115.00]           Harga IDR: Rp 282.175            │ │
│  u  │  │                      (auto-calculate, bisa override)  │ │
│  k  │  │  [x] Override harga IDR manual                        │ │
│     │  │  [Rp 282.000_______________]                           │ │
│     │  │                                                        │ │
│     │  │  Berat (gram) *                                       │ │
│  P  │  │  [800]                                                 │ │
│  O  │  │                                                        │ │
│     │  │  Estimasi Sampai (hari)                               │ │
│  K  │  │  [7-14]                                                │ │
│  o  │  │                                                        │ │
│  m  │  │  ☐ Produk Unggulan (tampil besar di beranda)         │ │
│  p  │  │  ☑ Status Aktif (tampil di katalog customer)         │ │
│     │  └──────────────────────────────────────────────────────┘ │
│  L  │                                                            │
│  o  │  ┌──────────────────────────┐  ┌──────────────────────┐  │
│  g  │  │  Gambar Produk           │  │  Varian              │  │
│     │  │                          │  │                      │  │
│  S  │  │  ┌──┐ ┌──┐ ┌──┐          │  │  [+ Tambah Varian]  │  │
│  e  │  │  │  │ │  │ │  │          │  │                      │  │
│  t  │  │  └──┘ └──┘ └──┘          │  │  ┌────────────────┐ │  │
│  t  │  │  [img1][img2][img3]      │  │  │ Varian 1         │ │  │
│  .  │  │  Drag to reorder          │  │  │ Warna: Hitam    │ │  │
│     │  │  [+ Upload Gambar]        │  │  │ Stok: [10___]   │ │  │
│     │  │  Max 5, JPG/PNG, 2MB     │  │  │ [Hapus]         │ │  │
│     │  │                          │  │  └────────────────┘ │  │
│     │  └──────────────────────────┘  │  ┌────────────────┐ │  │
│     │                                  │  │ Varian 2         │ │  │
│     │                                  │  │ Warna: Coklat  │ │  │
│     │                                  │  │ Stok: [5____]  │ │  │
│     │                                  │  │ [Hapus]         │ │  │
│     │                                  │  └────────────────┘ │  │
│     │                                  └──────────────────────┘  │
│     │                                                            │
│     │  [Batal]                              [Simpan Produk]     │
│     │                                                            │
└─────┴───────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Edit Produk         │
├──────────────────────────┤
│                            │
│ Edit Produk               │
│ Tas Backpack Premium      │
│ [Aktif]                    │
│                            │
│ ─── Informasi Dasar ───   │
│                            │
│ Nama Produk *              │
│ [Tas Backpack Premium___] │
│                            │
│ Kategori *                 │
│ [Tas ▼]                   │
│                            │
│ Deskripsi *                │
│ [                          ] │
│ [  Tas backpack bahan...  ] │
│ [                          ] │
│                            │
│ Harga (RMB) *              │
│ [115.00]                   │
│ Kurs: 1 RMB = Rp 2.450    │
│ Harga IDR: Rp 282.175     │
│ ☐ Override harga IDR      │
│ [Rp 282.000___]            │
│                            │
│ Berat (gram) *             │
│ [800]                      │
│                            │
│ Estimasi Sampai (hari)     │
│ [7-14]                     │
│                            │
│ ☐ Produk Unggulan         │
│ ☑ Status Aktif             │
│                            │
│ ─── Gambar Produk ───     │
│ ┌──┐ ┌──┐ ┌──┐             │
│ │  │ │  │ │  │             │
│ └──┘ └──┘ └──┘             │
│ [+ Upload Gambar]          │
│                            │
│ ─── Varian ───             │
│ [+ Tambah Varian]         │
│ ┌────────────────────────┐ │
│ │ Varian 1               │ │
│ │ Warna: [Hitam_______]  │ │
│ │ Stok: [10___]          │ │
│ │ [Hapus]                │ │
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │ Varian 2               │ │
│ │ Warna: [Coklat_______] │ │
│ │ Stok: [5____]          │ │
│ │ [Hapus]                │ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│ [Batal]      [Simpan Produk]│
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- Back link: "← Kelola Produk"
- Mobile: back button, title "Edit Produk" or "Tambah Produk"

### Section 2: Title + Status
- "Edit Produk: [nama]" or "Tambah Produk Baru" (H1)
- Status badge (if editing): "Aktif" / "Nonaktif"
- If new: no status badge

### Section 3: Informasi Dasar (Form)
- **Fields:**
  1. **Nama Produk** (required)
     - Input text, max 100 chars
     - Validation: min 3, max 100
  2. **Kategori** (required, dropdown)
     - Options: Tas, Sepatu, Aksesoris, Elektronik, Fashion
     - From API (Kategori table)
  3. **Deskripsi** (required, textarea)
     - Min 20 chars, max 2000
     - Auto-resize
  4. **Harga (RMB)** (required, number)
     - Input: decimal, 2 places
     - Live display: "Harga IDR: Rp [auto-calc]" (from KursMaster.kursRmbIdr)
     - Checkbox: "Override harga IDR manual"
       - If checked: show manual IDR input, disable auto-calc
  5. **Berat (gram)** (required, number)
     - For ongkir calculation
  6. **Estimasi Sampai (hari)** (optional, text)
     - Placeholder: "7-14"
  7. **Produk Unggulan** (checkbox)
     - If checked: shows as large card on beranda
  8. **Status Aktif** (checkbox, default checked)
     - If checked: visible in customer katalog

### Section 4: Gambar Produk
- **Layout:** Thumbnail grid (max 5), drag-to-reorder
- **Upload:** "+ Upload Gambar" button or drag-drop zone
- **Constraints:** JPG/PNG, max 2MB each, max 5 images
- **Each thumbnail:**
  - 80x80px, radius 8px
  - Remove button (X, top-right corner)
  - Drag handle (top-left, for reorder)
  - First image = main (badge "Utama")
- **New upload flow:**
  1. Select file → preview
  2. On save: upload to R2 → get URL → save to DB
- **Delete:** Click X → confirm "Hapus gambar ini?" → remove from list (delete from R2 on save)

### Section 5: Varian
- **Layout:** List of varian cards, stack vertical
- **Add:** "+ Tambah Varian" button → new empty varian card
- **Each varian card:**
  ```
  - Varian label (auto: "Varian 1", "Varian 2")
  - Warna (input text, e.g., "Hitam")
  - Stok (number input, default 0)
  - [Hapus] button
  ```
- **Validation:** At least 1 varian required
- **Varian purpose:** Tracks stok per variant (e.g., Hitam 10, Coklat 5)
- **If no variants concept:** Can use single varian "Default" with total stok

### Section 6: Submit
- **Buttons:**
  - "Batal" (secondary) → `/admin/produk` (discard changes)
  - "Simpan Produk" (Primary) → validate + save
- **Mobile:** Sticky bottom bar

---

## States

### Loading (Existing Product)
- Skeleton form fields
- Images load from R2 URLs

### Save Loading
- "Simpan Produk" button: spinner + "Menyimpan..."
- Disable all inputs

### Validation Error
- Inline error per field
- Error border: 2px #9B4D50
- Scroll to first error

### Save Success
- Toast: "Produk berhasil disimpan." (edit) or "Produk baru ditambahkan." (create)
- Redirect to `/admin/produk/[id]` (stay on page) or `/admin/produk` (list)
- Design choice: stay on page with success toast (allow further edits)

### Image Upload Loading
- Thumbnail: spinner overlay
- On success: show image
- On fail: red border + toast "Gagal upload gambar. Coba lagi."

### Image Reorder
- Drag thumbnail → reorder (visual feedback)
- On save: update urutan in DB

### Varian Delete
- Click "Hapus" on varian → confirm "Hapus varian ini? Stok varian ini ikut hilang."
- Confirm → remove card (fade-out)
- If only 1 varian: disable delete (min 1 required)

---

## Interactions

### Harga Auto-Calc
- Type in RMB field → live calc IDR = RMB × kursRmbIdr
- Display: "Harga IDR: Rp 282.175"
- If "Override" checked: show manual IDR input, auto-calc disabled
- If override unchecked: revert to auto-calc

### Image Drag-to-Reorder
- HTML5 drag-and-drop or library (react-beautiful-dnd)
- First position = main image (badge "Utama")

### Image Upload
- Click "+ Upload Gambar" → file input (multiple)
- Or: drag files to upload zone
- Validate: type (JPG/PNG), size (< 2MB), count (current + new <= 5)
- Preview: show thumbnail immediately (client-side URL)
- On save: upload to R2, replace preview with R2 URL

### Varian Add
- Click "+ Tambah Varian" → new card slides in (200ms)
- Auto-focus warna input

### Form Navigation
- Tab key: move through fields in order
- Enter on last field: focus "Simpan Produk"

---

## Edge Cases

### New Product (No Images, No Varian Yet)
- Image grid: empty, show "+ Upload Gambar" prominent
- Varian: show 1 default empty varian card (don't force user to click add)

### Product with Active Pesanan (Editing)
- Allow edit nama, deskripsi, gambar, varian stok
- Warning: "Produk ini ada di pesanan aktif. Perubahan stok bisa pengaruhi ketersediaan."
- Harga change: only affects new pesanan (existing keep snapshot)

### Image Upload Fail (R2 Error)
- Toast: "Gagal upload gambar. Coba lagi, atau simpan tanpa gambar ini."
- Remove failed thumbnail
- Allow save without that image

### Many Varian (10+)
- Varian list: scrollable (max-height 400px, overflow-y)
- Or: collapse old varian (show "X varian lainnya")

### Kategori Not in List
- Admin can add new kategori? (MVP: fixed list from DB, admin can manage via settings or direct DB)
- Backlog: kategori CRUD

### Harga RMB = 0 (Free Product?)
- Validation: min 0.01 RMB
- Error: "Harga minimal 0.01 RMB"

---

## WHAT NOT TO DO

1. ❌ NO "→" in buttons
2. ❌ NO "ADD PRODUCT" / "EDIT PRODUCT" ALL-CAPS
3. ❌ NO rich text editor for deskripsi (plain textarea, MVP)
4. ❌ NO SEO meta fields (backlog)
5. ❌ NO "Related products" selector (auto from kategori)
6. ❌ NO discount/sale price field (backlog)
7. ❌ NO multiple currency (RMB input → IDR auto, that's it)
8. ❌ NO video upload (backlog)

---

## Copy

### Page Title (H1)
```
Edit Produk: Tas Backpack Premium
(atau)
Tambah Produk Baru
```

### Form Labels
```
Informasi Dasar

Nama Produk *
[Tas Backpack Premium Kulit Sintetis]

Kategori *
[Tas ▼]

Deskripsi *
[Tas backpack bahan kulit sintetis premium. Kapasitas 20L...]

Harga (RMB) *
Kurs Otomatis: 1 RMB = Rp 2.450
Harga IDR: Rp 282.175
☐ Override harga IDR manual
[Rp 282.000]

Berat (gram) *
[800]

Estimasi Sampai (hari)
[7-14]

☐ Produk Unggulan (tampil besar di beranda)
☑ Status Aktif (tampil di katalog customer)
```

### Gambar
```
Gambar Produk

[img1] [img2] [img3]
[+ Upload Gambar]
Max 5 gambar, JPG/PNG, 2MB each
Drag untuk atur urutan (img1 = utama)
```

### Varian
```
Varian

[+ Tambah Varian]

Varian 1
Warna: [Hitam]
Stok: [10]
[Hapus]

Varian 2
Warna: [Coklat]
Stok: [5]
[Hapus]
```

### Buttons
```
[Batal]  [Simpan Produk]
```

### Validation Errors
```
Nama produk minimal 3 karakter
Nama produk maksimal 100 karakter
Kategori wajib dipilih
Deskripsi minimal 20 karakter
Harga RMB minimal 0.01
Berat minimal 1 gram
Minimal 1 varian
Stok minimal 0
```

### Toasts
```
Produk berhasil disimpan.
Produk baru ditambahkan.
Gagal upload gambar. Coba lagi.
Varian dihapus.
Gambar dihapus.
```

### Delete Confirm (Varian)
```
Hapus varian ini?
Stok varian ini ikut hilang.

[Batal]  [Ya, Hapus]
```

### Delete Confirm (Image)
```
Hapus gambar ini?

[Batal]  [Ya, Hapus]
```
