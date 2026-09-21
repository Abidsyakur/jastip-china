# Screen 17: Bantuan (FAQ + Komplain)

## Tujuan
Customer cari jawaban di FAQ, atau akses form komplain untuk pesanan yang udah selesai.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Bantuan                                                      │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  [🔍] Cari pertanyaan...                    [Cari]      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │  FAQ                     │  │  Butuh bantuan lain?     │  │
│  │                          │  │                          │  │
│  │  ─── Umum ───             │  │  Chat admin via WhatsApp │  │
│  │  [+] Apa itu jastip?     │  │  [Chat WhatsApp]         │  │
│  │  [+] Gimana cara order? │  │                          │  │
│  │  [+] Berapa lama sampai?│  │  ─── atau ───              │  │
│  │                          │  │                          │  │
│  │  ─── Pembayaran ───      │  │  Ajukan komplain buat    │  │
│  │  [+] Metode bayar apa?  │  │  pesanan yang udah selesai│  │
│  │  [+] Berapa lama verif? │  │  [Ajukan Komplain]        │  │
│  │                          │  │                          │  │
│  │  ─── Pengiriman ───      │  │  Lihat status komplain:  │  │
│  │  [+] Kurir apa aja?      │  │  [INV-... I9J0K1L2]      │  │
│  │  [+] Lacak gimana?       │  │  [INV-... A1B2C3D4]      │  │
│  │                          │  │                          │  │
│  │  ─── PO ───              │  │                          │  │
│  │  [+] Apa itu custom PO? │  │                          │  │
│  │  [+] Berapa lama respon?│  │                          │  │
│  └──────────────────────────┘  └──────────────────────────┘  │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Bantuan            │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ [🔍] Cari... [Cari]    │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Butuh bantuan lain?    │ │
│ │                        │ │
│ │ Chat admin via WhatsApp│ │
│ │ [Chat WhatsApp]        │ │
│ │                        │ │
│ │ Ajukan komplain buat   │ │
│ │ pesanan selesai        │ │
│ │ [Ajukan Komplain]      │ │
│ │                        │ │
│ │ Status komplain:       │ │
│ │ [INV-... I9J0K1L2]    │ │
│ └────────────────────────┘ │
│                            │
│ FAQ                        │
│                            │
│ ─── Umum ───              │
│ [+] Apa itu jastip?       │
│ [+] Gimana cara order?    │
│ [+] Berapa lama sampai?   │
│                            │
│ ─── Pembayaran ───        │
│ [+] Metode bayar apa?     │
│ [+] Berapa lama verif?    │
│                            │
│ ─── Pengiriman ───        │
│ [+] Kurir apa aja?         │
│ [+] Lacak gimana?         │
│                            │
│ ─── PO ───                │
│ [+] Apa itu custom PO?   │
│ [+] Berapa lama respon?  │
│                            │
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘

(FAQ expanded):
┌──────────────────────────┐
│ [-] Apa itu jastip?      │
│   Jastip = jasa titip.   │
│   Kami titipin belanja   │
│   barang dari China,     │
│   sampai depan pintu      │
│   rumah kamu di Indonesia.│
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- Standard nav, "Bantuan" active (or under "Cara Order")
- Mobile: back button, title "Bantuan"

### Section 2: Search FAQ
- **Layout:** Full width search bar, margin 24px
- **Content:** Search input + "Cari" button
- **Behavior:** Type + Enter/Cari → filter FAQ list (client-side or API)
- **Placeholder:** "Cari pertanyaan..."

### Section 3: Help Actions (Right Sidebar Desktop / Top Mobile)
- **Content:**
  - WhatsApp button: "Chat WhatsApp" (ghost, WhatsApp green #25D366 border)
    - Link: `https://wa.me/6281200000000?text=Halo admin, saya mau tanya...`
    - Opens WhatsApp (web or app)
  - Komplain button: "Ajukan Komplain" (secondary)
    - Navigate to `/komplain/pilih-pesanan` (select pesanan SELESAI)
  - Existing komplain list (if any):
    - Each: invoice + status badge
    - Click → `/komplain/[id]`

### Section 4: FAQ List
- **Layout (Desktop):** Left column, 60% width
- **Layout (Mobile):** Full width, below help actions
- **Structure:** Grouped by category
  - Umum, Pembayaran, Pengiriman, PO
- **Category header:** Inter 500, 14px, #6B5D52, uppercase NO (just bold, no caps)
  - ANTI-PATTERN: NO ALL-CAPS category headers
  - Use: "Umum", "Pembayaran" (normal case, bold)
- **Each FAQ item (Accordion):**
  ```
  Collapsed: [+] Question text (Inter 500, 15px)
  Expanded: [-] Question text
    + Answer text (Inter 400, 14px, #6B5D52)
    Padding: 16px
  Border-bottom: 1px #E8DCC8
  ```

### Section 5: Search Results (if searching)
- **Behavior:** When user searches, filter FAQ items
- If results: show matching items (expanded by default)
- If no results: "Nggak ketemu FAQ yang cocok. Coba chat admin via WA."

---

## States

### FAQ Expanded
- One item open at a time (or multiple — design choice, multiple OK)
- Smooth expand/collapse (max-height transition 200ms)
- Icon: [+] → [-]

### Search Empty Results
- "Nggak ketemu FAQ yang cocok."
- "Coba kata kunci lain, atau chat admin via WA."
- CTA: "Chat WhatsApp"

### Loading (if API-based FAQ)
- Skeleton accordion items

---

## Interactions

### FAQ Accordion Toggle
- Click question → expand/collapse answer
- Icon rotate: + → x (or + → -)
- Multiple can be open (not exclusive)

### Search
- Debounce 300ms
- Filter FAQ by question + answer text (case-insensitive)
- If search active: hide category headers, show flat results

### Chat WhatsApp
- Click → `window.open(waLink, '_blank')`
- Pre-filled message: "Halo admin, saya mau tanya..."

### Ajukan Komplain
- Click → navigate to `/komplain/pilih-pesanan`
- Page shows list of SELESAI pesanan
- Select one → form komplain

### View Existing Komplain
- Click invoice link → `/komplain/[id]`

---

## Edge Cases

### No FAQ Match
- Show empty search state + WhatsApp CTA

### FAQ Content Update
- FAQ stored in DB (model FAQ) or static content
- Admin can edit via admin panel (backlog)

### No Completed Orders (can't komplain)
- "Ajukan Komplain" button: disabled
- Tooltip: "Komplain cuma bisa buat pesanan yang udah selesai."

### Multiple Active Komplain
- Show all in list
- Each with status badge

---

## WHAT NOT TO DO

1. ❌ NO "→" in buttons
2. ❌ NO "FAQ" or "HELP CENTER" ALL-CAPS headers
3. ❌ NO category headers in ALL-CAPS (use bold normal case)
4. ❌ NO live chat widget (use WhatsApp link, async)
5. ❌ NO "Was this helpful? Yes/No" on each FAQ (backlog)
6. ❌ NO video tutorials (text FAQ only for MVP)
7. ❌ NO chatbot/AI assistant (use WhatsApp + FAQ)

---

## Copy

### Page Title (H1)
```
Bantuan
```

### Search
```
Cari pertanyaan...
[Cari]
```

### Help Actions
```
Butuh bantuan lain?

Chat admin via WhatsApp
[Chat WhatsApp]

Ajukan komplain buat pesanan yang udah selesai
[Ajukan Komplain]

Status komplain:
[INV-20240120-I9J0K1L2]  [Diproses]
[INV-20240115-A1B2C3D4]  [Selesai]
```

### FAQ Categories + Questions

```
Umum

Apa itu jastip?
Jastip = jasa titip. Kami titipin belanja barang dari China, sampai depan pintu rumah kamu di Indonesia.

Gimana cara order?
1. Pilih produk di katalog
2. Tambah ke keranjang
3. Checkout + pilih alamat + kurir
4. Transfer pembayaran
5. Upload bukti transfer
6. Tunggu verifikasi admin
7. Pesanan diproses + dikirim

Berapa lama sampai?
Estimasi 7-14 hari setelah pembayaran terverifikasi. Tergantung pengiriman dari China + domestik.

Pembayaran

Metode bayar apa aja?
Saat ini: Transfer Bank (BCA + Mandiri). E-wallet menyusul.

Berapa lama verifikasi pembayaran?
Maksimal 1x24 jam setelah kamu upload bukti transfer. Biasanya lebih cepat.

Pengiriman

Kurir apa aja?
JNE, J&T, SiCepat. Ongkir dihitung berdasarkan berat + tujuan.

Lacak gimana?
Bisa lacak di halaman Lacak Pesanan. Masukin nomor invoice kamu.

PO

Apa itu custom PO?
PO = Purchase Order. Kalau barang yang kamu mau nggak ada di katalog, kamu bisa ajukan link produk dari China, admin kasih estimasi harga.

Berapa lama respon PO?
Admin review dalam 1-2 hari kerja. Kalau udah ditawar, kamu setuju + lanjut bayar.
```

### Empty Search
```
Nggak ketemu FAQ yang cocok.
Coba kata kunci lain, atau chat admin via WA.
[Chat WhatsApp]
```

### No Completed Orders (Komplain disabled)
```
Komplain cuma bisa buat pesanan yang udah selesai.
```
