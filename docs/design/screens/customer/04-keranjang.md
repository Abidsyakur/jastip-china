# Screen 04: Keranjang (Cart)

## Tujuan
Customer review items sebelum checkout, update qty, hapus item, lihat estimasi biaya.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Keranjang Belanja                                            │
│                                                                │
│  ┌────────────────────────────────────┐  ┌──────────────────┐ │
│  │                                    │  │ Ringkasan       │ │
│  │  ┌──┐  Tas Backpack Premium       │  │                  │ │
│  │  │  │  Varian: Hitam              │  │ Subtotal (2):    │ │
│  │  │  │  Rp 282.000                 │  │ Rp 317.250       │ │
│  │  └──┘  [- 1 +]  [Hapus]          │  │                  │ │
│  │                                    │  │ Jasa Titip (10%):│ │
│  │  ┌──┐  Kaos Oversized              │  │ Rp 31.725        │ │
│  │  │  │  Varian: Size L Hitam       │  │                  │ │
│  │  │  │  Rp 35.250                  │  │ Ongkir Domestik: │ │
│  │  └──┘  [- 1 +]  [Hapus]          │  │ (dihitung saat   │ │
│  │                                    │  │  checkout)      │ │
│  │  ┌──┐  Dompet Kulit Asli          │  │                  │ │
│  │  │  │  Varian: Coklat             │  │ Total Estimasi:  │ │
│  │  │  │  Rp 223.250                 │  │ Rp 349.000       │ │
│  │  └──┘  [- 1 +]  [Hapus]          │  │                  │ │
│  │                                    │  │ [Checkout]       │ │
│  └────────────────────────────────────┘  └──────────────────┘ │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Keranjang            │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ ┌──┐ Tas Backpack       │ │
│ │ │  │ Premium             │ │
│ │ └──┘ Varian: Hitam      │ │
│ │       Rp 282.000         │ │
│ │       [- 1 +]    [Hapus] │ │
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │ ┌──┐ Kaos Oversized     │ │
│ │ │  │                     │ │
│ │ └──┘ Varian: Size L      │ │
│ │       Rp 35.250          │ │
│ │       [- 1 +]    [Hapus] │ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│ Subtotal: Rp 317.250      │ ← sticky summary
│ [Checkout]                │ (fixed bottom)
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘

(Empty State):
┌──────────────────────────┐
│ [←]  Keranjang            │
├──────────────────────────┤
│                            │
│        [icon: empty cart]  │
│                            │
│   Keranjang masih kosong  │
│   Yuk lihat katalog,       │
│   siapa tau ada yang       │
│   menarik.                 │
│                            │
│   [Lihat Katalog]         │
│                            │
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- Same as other pages, but no active menu (or "Keranjang" active if it's a menu item)
- Mobile: back button (←), title "Keranjang"

### Section 2: Page Title
- **Content:** "Keranjang Belanja" (H1, Noto Serif SC 700, 32px desktop / 24px mobile)
- **Layout:** Margin 32px top, 24px bottom

### Section 3: Item List (Left Column Desktop)
- **Purpose:** List cart items with controls
- **Layout (Desktop):** Left column, 60% width
- **Layout (Mobile):** Full width, stack vertical
- **Item Card:**
  ```
  Layout: horizontal (image left, info right)
  Image: 80x80px (mobile) / 100x100px (desktop), radius 8px, object-cover
  Info:
    - Nama (Noto Serif SC 500, 18px desktop / 16px mobile)
    - Varian (Inter 400, 14px, #6B5D52)
    - Harga satuan (Noto Serif SC 700, 16px, gold #B5941F for AA)
    - Qty stepper + Hapus button (right aligned)
  Padding: 16px
  Border: 1px solid #E8DCC8
  Radius: 12px
  Gap between items: 12px
  ```

### Section 4: Ringkasan Order (Right Column Desktop, Sticky)
- **Purpose:** Cost breakdown + checkout CTA
- **Layout (Desktop):** Right column, 40% width, sticky top 80px
- **Content:**
  - Subtotal produk (count × price)
  - Biaya jasa titip (10% dari subtotal, min Rp 15.000)
  - Ongkir domestik (placeholder text, belum dihitung)
  - Total Estimasi (subtotal + jasa titip, ongkir TBD)
  - Checkout button (primary, full width)
- **Layout (Mobile):** Sticky bottom bar (not sidebar)

### Section 5: Empty State
- **Trigger:** Cart has 0 items
- **Content:**
  - Illustration: empty cart line icon (120x120px, #E8DCC8)
  - Title: "Keranjang masih kosong" (Noto Serif SC 500, 20px)
  - Desc: "Yuk lihat katalog, siapa tau ada yang menarik." (Inter 400, 14px)
  - CTA: "Lihat Katalog" (primary button)

---

## States

### Loading State
- Show skeleton item cards (3-4 placeholder)
- Skeleton summary box

### Error State
- Title: "Gagal memuat keranjang"
- Desc: "Coba refresh halaman, atau hubungi admin via WA."
- CTA: "Coba Lagi"

### Item Removed (Undo)
- Toast: "Tas Backpack dihapus dari keranjang" + "Undo" link (5s)
- If undo clicked: item restored, qty preserved

### Qty Update Failure
- Toast error: "Gagal update jumlah. Stok mungkin berubah."
- Revert qty to previous value
- Refresh cart data

---

## Interactions

### Qty Update
- Stepper button click → API call (debounce 500ms)
- Optimistic update: UI change instant, API call background
- If fail: revert + toast error
- Max: stok limit (disable + button)

### Hapus Item
- Click "Hapus" → confirm modal: "Hapus item ini dari keranjang?"
- Confirm → API delete → item removed (fade-out 200ms)
- Show undo toast (5s)

### Checkout
- Click "Checkout" → navigate to `/checkout`
- If cart empty (edge): disable button, toast "Keranjang masih kosong"

### Sticky Summary (Mobile)
- Always visible at bottom
- Shows: subtotal + Checkout button
- Expandable: tap to see full breakdown (bottom sheet)

---

## Edge Cases

### Stok Berubah (Product now has less stock)
- On load: check each item vs current stok
- If qty > stok: badge "Stok berubah" on item
- Auto-adjust qty to stok limit
- Toast: "Stok Tas Backpack berubah jadi 10. Qty disesuaikan."

### Product Nonaktif (status NONAKTIF)
- Item card: opacity 60%
- Badge: "Produk tidak tersedia"
- Hapus button: still works
- Checkout: blocked if any item nonaktif, toast "Hapus produk tidak tersedia dulu"

### Varian Hapus
- If varian deleted: same as product nonaktif
- Badge: "Varian tidak tersedia"

### Harga Berubah
- Display current price (not snapshot)
- Toast on load: "Harga beberapa produk udah berubah" (if any diff)

### Very Long Item List (20+)
- Desktop: scroll within left column (max-height)
- Mobile: normal scroll, summary stays sticky

---

## WHAT NOT TO DO

1. ❌ NO "→" in Checkout button
2. ❌ NO "PROCEED TO CHECKOUT" (too formal, use "Checkout")
3. ❌ NO modal for qty update (inline stepper)
4. ❌ NO auto-navigate to checkout on item add (let user decide)
5. ❌ NO "You might also like" section
6. ❌ NO forced login to view cart (allow guest cart, prompt login at checkout)
7. ❌ NO stale price (always show current, not cached)

---

## Copy

### Page Title (H1)
```
Keranjang Belanja
```

### Item Info
```
[namaProduk]
Varian: [namaVarian]
Rp [hargaSatuan]
```

### Actions
```
Hapus
```

### Summary
```
Ringkasan

Subtotal ([count]):
Rp [subtotal]

Jasa Titip (10%):
Rp [jasaTitip]

Ongkir Domestik:
(dihitung saat checkout)

Total Estimasi:
Rp [total]
```

### Checkout
```
Checkout
```

### Empty State
```
Keranjang masih kosong
Yuk lihat katalog, siapa tau ada yang menarik.
[Lihat Katalog]
```

### Undo Toast
```
{namaProduk} dihapus dari keranjang
Undo
```

### Stok Berubah
```
Stok {namaProduk} berubah jadi {stok}. Qty disesuaikan.
```
