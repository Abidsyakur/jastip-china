# Screen 18: Tentang Kami

## Tujuan
Halaman statis brand: siapa Jastip China, bukti sederhana (statistik), kenapa pilih kami, kontak. Bukan landing marketing agresif, tidak ada hard-sell CTA.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Tentang Kami                                                 │
│  鲜货直达                                                      │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Jastip China bantu kamu beli barang langsung dari      │ │
│  │  China tanpa ribet. Pilih dari katalog ready stock,     │ │
│  │  atau ajukan Custom PO kalau barangnya nggak ada        │ │
│  │  di katalog. Kami urus pembelian, konsolidasi,          │ │
│  │  sampai pengiriman ke rumahmu.                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   1.200+     │  │     850+     │  │     4.9      │        │
│  │   Pesanan    │  │   Customer   │  │   Rating     │        │
│  │   terkirim   │  │    aktif     │  │   kepuasan   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                │
│  ─── cloud pattern border (5% opacity) ───                   │
│                                                                │
│  Kenapa Jastip China                                         │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Harga transparan                                        │ │
│  │  Harga produk + jasa titip + ongkir dirinci jelas       │ │
│  │  sebelum kamu bayar. Nggak ada biaya siluman.           │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │  Update status otomatis                                  │ │
│  │  Tiap tahap pesanan (verifikasi, proses, kirim)         │ │
│  │  muncul di halaman lacak + notifikasi.                  │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │  Custom PO                                               │ │
│  │  Barang nggak ada di katalog? Kirim link produk China,  │ │
│  │  tim kami kasih estimasi harga 1-2 hari kerja.          │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │  Jalur komplain jelas                                   │ │
│  │  Barang rusak atau nggak sesuai? Ajukan komplain        │ │
│  │  langsung dari detail pesanan.                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Hubungi kami                                            │ │
│  │  WhatsApp: 0812-0000-0000        [Chat WhatsApp]        │ │
│  │  Email: hello@jastipchina.id                            │ │
│  │  Jam: Senin-Sabtu, 09:00-18:00 WIB                      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Tentang Kami        │
├──────────────────────────┤
│                            │
│ Tentang Kami               │
│ 鲜货直达                    │
│                            │
│ ┌────────────────────────┐ │
│ │ Jastip China bantu     │ │
│ │ kamu beli barang       │ │
│ │ langsung dari China... │ │
│ └────────────────────────┘ │
│                            │
│ ┌──────┐ ┌──────┐ ┌──────┐ │
│ │1.200+│ │ 850+ │ │ 4.9  │ │
│ │Kirim │ │Cust. │ │Rating│ │
│ └──────┘ └──────┘ └──────┘ │
│                            │
│ Kenapa Jastip China        │
│ ┌────────────────────────┐ │
│ │ Harga transparan       │ │
│ │ Harga + jasa + ongkir  │ │
│ │ dirinci jelas...       │ │
│ ├────────────────────────┤ │
│ │ Update status otomatis │ │
│ │ ...                    │ │
│ ├────────────────────────┤ │
│ │ Custom PO              │ │
│ │ ...                    │ │
│ ├────────────────────────┤ │
│ │ Jalur komplain jelas   │ │
│ │ ...                    │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Hubungi kami           │ │
│ │ WA: 0812-0000-0000     │ │
│ │ [Chat WhatsApp]        │ │
│ │ hello@jastipchina.id   │ │
│ │ Senin-Sabtu 09-18 WIB  │ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- Standard nav, no active menu (or "Tentang Kami" if in footer link context)
- Mobile: back button, title "Tentang Kami"

### Section 2: Title + Tagline
- **Title:** "Tentang Kami" (H1, Noto Serif SC 700, 32px desktop / 24px mobile)
- **Tagline:** "鲜货直达" (Ma Shan Zheng, 24px, Chinese Red)
- No CTA button, no hero image, no gradient

### Section 3: Deskripsi
- **Layout:** Card or plain block, max-width 720px
- **Content:** 1 short paragraph (3-5 sentences), Inter 400, 16px
- Plain text, no drop cap, no pull quote styling

### Section 4: Statistik
- **Layout:** 3 stat boxes, horizontal (desktop) / 3-col compact (mobile)
- **Content:**
  - Pesanan terkirim (count, e.g., "1.200+")
  - Customer aktif (count, e.g., "850+")
  - Rating kepuasan (e.g., "4.9")
- **Style:** Number (Noto Serif SC 700, 32px desktop / 20px mobile, Chinese Red), label (Inter 400, 12px, #6B5D52)
- **ANTI-PATTERN:** NO count-up animation (static display)

### Section 5: Keunggulan
- **Layout:** Vertical list in card container, dividers between items
- **Content (4 items):**
  1. Harga transparan
  2. Update status otomatis
  3. Custom PO
  4. Jalur komplain jelas
- **Each item:** Title (Inter 600, 15px) + 1-2 sentence desc (Inter 400, 14px, #6B5D52)
- **Style:** Plain list, NO icon cards, NO colored tiles, NO shadow boxes per item

### Section 6: Kontak
- **Layout:** Card container
- **Content:** WhatsApp + "Chat WhatsApp" button (ghost, WhatsApp green border), email, jam operasional
- **Behavior:** Chat button → `window.open(wa.me/...)`

---

## States

### Loading
- Static page, no skeleton needed (content bundled, renders instantly)

### Error
- N/A (no API dependency; stats are static text updated manually)

---

## Interactions

### Chat WhatsApp
- Click → open wa.me link in new tab with pre-filled message

### Email
- Click → `mailto:` link

### Nav Links
- Standard header/footer navigation

---

## Edge Cases

### Stats Outdated
- Stats are manual text; admin updates when needed
- No auto-fetch, no fake live counter

### Long Description
- Max 1 paragraph + optional 2nd short paragraph
- No "read more" expander (keep page short)

---

## WHAT NOT TO DO

1. ❌ NO hero banner with CTA button
2. ❌ NO "ABOUT US" / "TENTANG KAMI" ALL-CAPS eyebrow label
3. ❌ NO count-up animation on stats
4. ❌ NO team member photos (fake team = trust killer)
5. ❌ NO testimonial carousel (no verified review system yet)
6. ❌ NO "Our Mission / Our Vision" corporate blocks
7. ❌ NO timeline "Founded 2020 → 2021 → ..." decoration
8. ❌ NO gradient background
9. ❌ NO "→" in buttons

---

## Copy

### Page Title (H1)
```
Tentang Kami
鲜货直达
```

### Deskripsi
```
Jastip China bantu kamu beli barang langsung dari China tanpa ribet. Pilih dari katalog ready stock, atau ajukan Custom PO kalau barangnya nggak ada di katalog. Kami urus pembelian, konsolidasi, sampai pengiriman ke rumahmu.
```

### Statistik
```
1.200+
Pesanan terkirim

850+
Customer aktif

4.9
Rating kepuasan
```

### Keunggulan
```
Kenapa Jastip China

Harga transparan
Harga produk + jasa titip + ongkir dirinci jelas sebelum kamu bayar. Nggak ada biaya siluman.

Update status otomatis
Tiap tahap pesanan (verifikasi, proses, kirim) muncul di halaman lacak + notifikasi.

Custom PO
Barang nggak ada di katalog? Kirim link produk China, tim kami kasih estimasi harga 1-2 hari kerja.

Jalur komplain jelas
Barang rusak atau nggak sesuai? Ajukan komplain langsung dari detail pesanan.
```

### Kontak
```
Hubungi kami

WhatsApp: 0812-0000-0000
[Chat WhatsApp]

Email: hello@jastipchina.id
Jam: Senin-Sabtu, 09:00-18:00 WIB
```
