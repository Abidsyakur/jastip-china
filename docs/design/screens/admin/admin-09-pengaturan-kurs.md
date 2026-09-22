---
title: "Screen Admin 09: Pengaturan Kurs"
tags: [screen, admin, manajemen]
tanggal: 2026-09-21
---
# Screen Admin 09: Pengaturan Kurs

## Tujuan
Admin set/update kurs RMB → IDR (kursRmbIdr). Rate ini dipakai untuk auto-calc harga produk dari RMB ke IDR, dan estimasi biaya di PO.

---

## Layout Wireframe (Desktop)

```
┌─────┬───────────────────────────────────────────────────────────┐
│     │  Pengaturan Kurs                                           │
│  S  ├───────────────────────────────────────────────────────────┤
│  i  │                                                            │
│  d  │  ┌──────────────────────────────────────────────────────┐ │
│  e  │  │  Kurs Saat Ini                                        │ │
│  b  │  │                                                        │ │
│  a  │  │  1 RMB  =  Rp 2.450                                    │ │
│  r  │  │  (Update terakhir: 20 Jan 2024, 09:00 WIB)          │ │
│  d  │  │  (oleh: admin@jastipchina.local)                     │ │
│     │  └──────────────────────────────────────────────────────┘ │
│  D  │                                                            │
│  a  │  ┌──────────────────────────────────────────────────────┐ │
│  s  │  │  Update Kurs                                          │ │
│  h  │  │                                                        │ │
│  b  │  │  Kurs RMB → IDR *                                     │ │
│  o  │  │  [2.450]                                              │ │
│  a  │  │  Format: angka desimal (contoh: 2450 atau 2450.50)   │ │
│  r  │  │                                                        │ │
│     │  │  ─── Preview ───                                      │ │
│  P  │  │  Produk "Tas Backpack" (RMB 115):                    │ │
│  r  │  │  Rp 282.175  (sebelumnya: Rp 281.750)                │ │
│  o  │  │  Produk "Kaos Oversized" (RMB 14):                    │ │
│  d  │  │  Rp 34.300   (sebelumnya: Rp 34.300)                  │ │
│  u  │  │                                                        │ │
│  k  │  │  Catatan (opsional)                                    │ │
│  P  │  │  [                                                  ]  │ │
│  O  │  │  [  Update mengikuti kurs BI terbaru              ]  │ │
│  K  │  │                                                        │ │
│  o  │  │  [Simpan Kurs Baru]                                  │ │
│  m  │  └──────────────────────────────────────────────────────┘ │
│  p  │                                                            │
│     │  ┌──────────────────────────────────────────────────────┐ │
│  L  │  │  Riwayat Kurs                                         │ │
│  o  │  │                                                        │ │
│  g  │  │  Tanggal           Kurs         Oleh       Catatan   │ │
│     │  ├────────────────────────────────────────────────────────┤ │
│  S  │  │  20 Jan 2024       2.450        admin      Update...  │ │
│  e  │  │  15 Jan 2024       2.400        admin      -          │ │
│  t  │  │  10 Jan 2024       2.350        admin      Awal      │ │
│  t  │  └──────────────────────────────────────────────────────┘ │
│  .  │                                                            │
└─────┴───────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Pengaturan Kurs    │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ Kurs Saat Ini           │ │
│ │                         │ │
│ │ 1 RMB = Rp 2.450       │ │
│ │ Update: 20 Jan 2024    │ │
│ │ Oleh: admin             │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Update Kurs             │ │
│ │                         │ │
│ │ Kurs RMB → IDR *       │ │
│ │ [2.450]                 │ │
│ │ Format: angka desimal   │ │
│ │                         │ │
│ │ ─── Preview ───         │ │
│ │ Tas Backpack (115 RMB): │ │
│ │ Rp 282.175              │ │
│ │ Kaos Oversized (14):    │ │
│ │ Rp 34.300               │ │
│ │                         │ │
│ │ Catatan (opsional)      │ │
│ │ [                      ] │ │
│ │                         │ │
│ │ [Simpan Kurs Baru]     │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Riwayat Kurs            │ │
│ │                         │ │
│ │ 20 Jan - 2.450 - admin │ │
│ │ 15 Jan - 2.400 - admin │ │
│ │ 10 Jan - 2.350 - admin │ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│[Dash][Order][+][Prod][More]│
└──────────────────────────┘
```

---

## Sections

### Section 1: Admin Sidebar
- "Settings" → "Pengaturan Kurs" active

### Section 2: Kurs Saat Ini (Current Rate)
- **Layout:** Card, full width
- **Content:**
  - Big display: "1 RMB = Rp [kursRmbIdr]" (Noto Serif SC 700, 32px, gold)
  - Update terakhir: tanggal + waktu (Inter 400, 14px, #6B5D52)
  - Oleh: admin email/name (Inter 400, 14px, #6B5D52)

### Section 3: Update Kurs Form
- **Layout:** Card, full width
- **Fields:**
  1. **Kurs RMB → IDR** (required, number)
     - Input: decimal, 2 places
     - Placeholder: "2450" or "2450.50"
     - Helper: "Format: angka desimal (contoh: 2450 atau 2450.50)"
     - Validation: > 0
  2. **Preview** (auto-calc, read-only)
     - Show 2-3 sample products with old vs new IDR price
     - e.g., "Tas Backpack (115 RMB): Rp 282.175 (sebelumnya: Rp 281.750)"
     - Highlight if changed (green if up, red-muted if down — optional, subtle)
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
- Type in kurs field → preview updates live (debounce 300ms)
- Shows 2-3 sample products (from DB, highest price + lowest price + random)
- Old price: strikethrough or "(sebelumnya: Rp X)" in #6B5D52
- New price: bold gold

### Save
- Click "Simpan Kurs Baru" → confirm modal (optional): "Update kurs ke [value]? Harga produk otomatis ikut."
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

1. ❌ NO "→" in buttons
2. ❌ NO "EXCHANGE RATE" / "CURRENCY SETTINGS" ALL-CAPS
3. ❌ NO auto-fetch from BI/Google API (manual input for MVP, backlog: auto-fetch)
4. ❌ NO multi-currency (only RMB → IDR)
5. ❌ NO "Scheduled update" (immediate update)
6. ❌ NO "Revert to previous" button (just set old value manually if needed)

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

Kurs RMB → IDR *
[2.450]
Format: angka desimal (contoh: 2450 atau 2450.50)

─── Preview ───
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
