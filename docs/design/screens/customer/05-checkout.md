# Screen 05: Checkout

## Tujuan
Customer konfirmasi alamat, pilih kurir, review pesanan, dan submit ke API untuk buat pesanan + redirect ke upload bukti pembayaran.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Checkout                                                     │
│                                                                │
│  ●━━━●━━━●                                                    │
│  Alamat  Kurir  Konfirmasi                                   │
│                                                                │
│  ┌────────────────────────────────────┐  ┌──────────────────┐ │
│  │                                    │  │ Ringkasan Pesanan│ │
│  │  [Step 1: Alamat Pengiriman]       │  │                  │ │
│  │                                    │  │ ┌──┐ Produk 1   │ │
│  │  (○) Jl. Merdeka No. 123          │  │ └──┘ Rp 282.000 │ │
│  │      Budi Santoso                  │  │     x1          │ │
│  │      Bandung, 40123                │  │                  │ │
│  │                                    │  │ ┌──┐ Produk 2   │ │
│  │  (○) Jl. Sudirman No. 45          │  │ └──┘ Rp 35.250  │ │
│  │      Siti Nurhaliza                │  │     x2          │ │
│  │      Jakarta, 12190                │  │                  │ │
│  │                                    │  │ Subtotal: 3 items│
│  │  [ + Tambah Alamat Baru ]         │  │ Rp 352.500       │ │
│  │                                    │  │                  │ │
│  │  [Selanjutnya: Pilih Kurir]       │  │ Jasa Titip:      │ │
│  │                                    │  │ Rp 35.250       │ │
│  └────────────────────────────────────┘  │ Ongkir: Rp 0    │ │
│                                          │                  │ │
│                                          │ Total: Rp 387.750│ │
│                                          │                  │ │
│                                          │ Metode Bayar:   │ │
│                                          │ Transfer Bank    │ │
│                                          │                  │ │
│                                          │ [Bayar Sekarang] │ │
│                                          └──────────────────┘ │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Checkout            │
├──────────────────────────┤
│ ●━━━●━━━●                │
│ Alamat  Kurir  Konfirmasi│
│                            │
│ ┌────────────────────────┐ │
│ │ Step 1: Alamat         │ │
│ │                        │ │
│ │ (○) Jl. Merdeka 123    │ │
│ │     Budi Santoso        │ │
│ │     Bandung, 40123      │ │
│ │                        │ │
│ │ (○) Jl. Sudirman 45    │ │
│ │     Siti Nurhaliza      │ │
│ │                        │ │
│ │ [+ Tambah Alamat Baru] │ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│ Subtotal: Rp 352.500      │
│ Total: Rp 387.750         │
│ [Bayar Sekarang]          │ ← sticky bottom (if last step)
└──────────────────────────┘

(Mobile: each step full screen, no sidebar summary)
```

---

## Sections

### Section 1: Progress Stepper (Top)

```
●━━━●━━━●
Alamat  Kurir  Konfirmasi
```

- **Purpose:** Show 3-step progress
- **Layout:** Center, margin 32px bottom
- **Component:** Status Pipeline (Horizontal) modified for steps
- **Nodes:**
  - Completed: filled gold #D4AF37 + check icon
  - Active: filled Chinese Red #C8102E
  - Pending: outline #E8DCC8
- **Labels below:** "Alamat", "Kurir", "Konfirmasi" (Inter 400, 12px)
- **Mobile:** Same, smaller (24x24px nodes)

### Section 2: Step Content (Left, Desktop)

**Step 1: Alamat Pengiriman**
- List radio alamat tersimpan
- Each: penerima, alamat, kota+kodepos
- "Tambah Alamat Baru" button (ghost, + icon)
- Click → modal form (inline form fields)
- Continue: "Selanjutnya: Pilih Kurir" button (primary)

**Step 2: Pilih Kurir**
- Radio list kurir:
  - JNE REG - Rp 25.000 - Estimasi 3-5 hari
  - J&T - Rp 28.000 - Estimasi 2-4 hari
  - SiCepat - Rp 30.000 - Estimasi 2-3 hari
- Ongkir calculated based on beratTotalGram + provinsi
- Continue: "Selanjutnya: Konfirmasi" button
- Back: "Kembali" button (secondary)

**Step 3: Konfirmasi Pesanan**
- Review items (compact list)
- Review alamat (compact)
- Review kurir + estimasi
- Biaya breakdown final
- No edit here (go back to step to edit)

### Section 3: Ringkasan Pesanan (Right Sidebar, Desktop)
- **Purpose:** Sticky order summary + final CTA
- **Layout:** Right column, 320px, sticky top 80px
- **Content:**
  - Item list (compact: thumbnail + name + qty + price)
  - Subtotal
  - Jasa titip (10%)
  - Ongkir (updated per kurir selection)
  - Total
  - Metode pembayaran: "Transfer Bank" (fixed text, no choice for MVP)
  - "Bayar Sekarang" button (primary)
- **Mobile:** Sticky bottom bar (total + button)

---

## States

### Loading State
- Skeleton form fields, skeleton summary
- Disable stepper navigation

### Address Loading
- Skeleton radio items

### Kurir Loading
- Skeleton radio items
- Disable "Selanjutnya" button

### Submit Loading
- "Bayar Sekarang" button: spinner replace text
- Disable all inputs
- Min display 500ms

### Submit Success
- Redirect to `/pesanan/[id]/pembayaran` (new pesanan created)

### Submit Error (Stok berubah)
- Modal: "Stok produk berubah"
- List items with stok issue
- CTA: "Kembali ke Keranjang"

---

## Interactions

### Step Navigation
- "Selanjutnya" → validate current step → if valid, advance step
- "Kembali" → previous step (preserve data)
- Click on completed step node → jump back (if data valid)
- URL sync: `/checkout?step=1` (optional, for back-button)

### Alamat Selection
- Radio change → update selected alamat
- "Tambah Alamat" → modal form (label, penerima, noTelp, alamat, kota, provinsi, kodePos)
- Submit new alamat → add to list, auto-select

### Kurir Selection
- Radio change → update ongkir in summary (instant recalc)
- Show loading on ongkir text if calculating (rare, usually instant)

### Bayar Sekarang
- Validate: alamat selected, kurir selected
- API call: POST /api/pesanan
- On success: redirect to `/pesanan/[id]/pembayaran`
- On fail: toast error

---

## Edge Cases

### No Alamat
- Step 1: hide radio list
- Show: "Belum ada alamat. Tambah dulu ya." + form
- "Tambah Alamat Baru" mandatory

### Cart Empty (navigated directly to /checkout)
- Redirect to `/keranjang` with toast "Keranjang masih kosong"

### Item Stok Habis (during checkout)
- Block submit
- Modal: "Stok {produk} habis. Hapus dari keranjang dulu."
- CTA: "Kembali ke Keranjang"

### Weight Exceeds Limit
- (No real limit, but inform if heavy)
- "Total berat 5kg. Ongkir might mahal, yakin lanjut?"

### Ongkir Cannot Calculate (provinsi not recognized)
- Fallback: zona default (termahal)
- Note: "Ongkir estimasi untuk wilayahmu. Final dihitung admin."

---

## WHAT NOT TO DO

1. ❌ NO "→" in step navigation buttons ("Selanjutnya", "Kembali")
2. ❌ NO "CONFIRM ORDER" (use "Bayar Sekarang")
3. ❌ NO accordion steps (use visible progress + single active step)
4. ❌ NO modal for checkout (use page layout)
5. ❌ NO "Special instructions" textarea (MVP scope)
6. ❌ NO multiple payment methods (MVP: manual transfer only)
7. ❌ NO coupon/promo code field (backlog)
8. ❌ NO guest checkout (require login - simpler for MVP)

---

## Copy

### Page Title (H1)
```
Checkout
```

### Progress Steps
```
Alamat
Kurir
Konfirmasi
```

### Step 1
```
Alamat Pengiriman

[Alamat Radio Items]

+ Tambah Alamat Baru

Selanjutnya: Pilih Kurir
```

### Step 2
```
Pilih Kurir

JNE REG - Rp 25.000 - Estimasi 3-5 hari
J&T - Rp 28.000 - Estimasi 2-4 hari
SiCepat - Rp 30.000 - Estimasi 2-3 hari

Kembali
Selanjutnya: Konfirmasi
```

### Step 3
```
Konfirmasi Pesanan

[Item list]
[Alamat compact]
[Kurir compact]

Kembali
```

### Summary
```
Ringkasan Pesanan

[Item list compact]

Subtotal (3 items):
Rp 352.500

Jasa Titip (10%):
Rp 35.250

Ongkir:
Rp 25.000

Total:
Rp 412.750

Metode Bayar:
Transfer Bank

[Bayar Sekarang]
```

### Address Form (Modal)
```
Tambah Alamat Baru

Label Alamat
[Nama penerima]
[No. telp]
[Alamat lengkap]
[Kota]
[Provinsi]
[Kode Pos]

[Batal] [Simpan]
```

### Error: Stok Berubah
```
Stok produk berubah

Maaf, stok produk ini berubah saat kamu checkout:
- Tas Backpack (sisa 5)

[Kembali ke Keranjang]
```
