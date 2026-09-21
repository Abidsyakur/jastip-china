# Screen 07: Riwayat Pesanan

## Tujuan
Customer lihat semua pesanan mereka, filter by status, akses detail/track/lacak.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Riwayat Pesanan                                             │
│                                                                │
│  [Semua] [Menunggu Bayar] [Diproses] [Dikirim] [Selesai]    │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ INV-20240120-I9J0K1L2              [Menunggu Pembayaran] │ │
│  │ 20 Jan 2024, 19:45 WIB              Rp 365.575            │ │
│  │ 1 item                                                   │ │
│  │                                          [Lihat Detail]  │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ INV-20240118-E5F6G7H8              [Diproses Admin]      │ │
│  │ 18 Jan 2024, 10:15 WIB              Rp 644.280            │ │
│  │ 2 items                                                  │ │
│  │                                          [Lihat Detail]  │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ INV-20240115-A1B2C3D4              [Selesai]             │ │
│  │ 15 Jan 2024, 14:30 WIB              Rp 562.750            │ │
│  │ 3 items                                                  │ │
│  │                                          [Lihat Detail]  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  [Muat Lainnya]                                               │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Riwayat Pesanan     │
├──────────────────────────┤
│ [Semua] [Bayar] [Proses]  │ ← horizontal scroll filter
│ [Kirim] [Selesai]         │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ INV-...I9J0K1L2        │ │
│ │ [Menunggu Pembayaran]   │ │
│ │ 20 Jan 2024             │ │
│ │ Rp 365.575 | 1 item     │ │
│ │         [Lihat Detail]  │ │
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │ INV-...E5F6G7H8        │ │
│ │ [Diproses Admin]        │ │
│ │ 18 Jan 2024             │ │
│ │ Rp 644.280 | 2 items    │ │
│ │         [Lihat Detail]  │ │
│ └────────────────────────┘ │
│                            │
│ [Muat Lainnya]            │
│                            │
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘

(Empty State):
┌──────────────────────────┐
│ [←]  Riwayat Pesanan     │
├──────────────────────────┤
│                            │
│      [icon: empty box]     │
│                            │
│   Belum ada pesanan        │
│   Saatnya belanja pertama  │
│   kamu!                    │
│                            │
│   [Mulai Belanja]         │
│                            │
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- Mobile: back button, title "Riwayat Pesanan"

### Section 2: Page Title
- "Riwayat Pesanan" (H1, Noto Serif SC 700, 32px / 24px mobile)

### Section 3: Filter Tabs
- **Layout (Desktop):** Horizontal row, left-aligned, 8px gap
- **Layout (Mobile):** Horizontal scroll, snap, 8px gap
- **Tabs:** Semua, Menunggu Bayar, Diproses, Dikirim, Selesai
- **Component:** Ghost button variant
- **Active state:** Background rgba(200,16,46,0.1), text Chinese Red, font-weight 600
- **Behavior:** Click → filter list (client-side or API call with status param)

### Section 4: Pesanan List
- **Layout:** Vertical stack, 12px gap
- **Each item (Card):**
  ```
  Layout: horizontal (info left, action right)
  Padding: 16px (desktop) / 12px (mobile)
  Border: 1px solid #E8DCC8
  Radius: 12px
  Background: #FFFFFF
  Hover: border #C8102E, shadow subtle
  ```
- **Content per card:**
  - Row 1: No Invoice (Inter 600, 16px) + Status Badge (right aligned)
  - Row 2: Tanggal (Inter 400, 14px, #6B5D52) + Total (Noto Serif SC 700, 18px, gold #B5941F)
  - Row 3: Item count summary ("2 items") + "Lihat Detail" button (ghost, right)

### Section 5: Load More (Pagination)
- **Desktop:** "Muat Lainnya" button (secondary, center)
- **Mobile:** Same, or infinite scroll with sentinel
- **Behavior:** Click → append new items, show skeleton loaders while fetching

### Section 6: Empty State
- **Trigger:** No pesanan at all, OR no pesanan in selected filter
- **Content:**
  - Illustration: empty box line icon (120x120px, #E8DCC8)
  - Title: "Belum ada pesanan" (Noto Serif SC 500, 20px)
  - Desc: "Saatnya belanja pertama kamu!" (Inter 400, 14px)
  - CTA: "Mulai Belanja" (primary) → `/katalog`

---

## States

### Loading State
- Show 3-4 skeleton cards (shimmer)
- Filter tabs rendered but disabled

### Error State
- Title: "Gagal memuat pesanan"
- Desc: "Coba refresh halaman, atau hubungi admin via WA."
- CTA: "Coba Lagi"

### Filtered Empty (e.g., "Selesai" but no completed orders)
- Title: "Belum ada pesanan [status]"
- Desc: "Pesanan dengan status ini belum ada."
- No CTA (just switch filter)

---

## Interactions

### Filter Tab Click
- Click tab → update active state
- Fetch pesanan with status filter (or client-side filter if cached)
- Show loading state in list area only

### Card Click / Lihat Detail
- Click anywhere on card → navigate to `/pesanan/[id]`
- Cursor: pointer
- Hover: border #C8102E, shadow subtle

### Load More
- Click → fetch next page
- Append to list (no replace)
- Show skeleton at bottom while loading
- Hide button if no more pages

### Pull to Refresh (Mobile)
- Pull down → refetch list
- Spinner: Chinese Red, 24x24px

---

## Edge Cases

### Banyak Pesanan (50+)
- Pagination: 10 per page (desktop), load more (mobile)
- Lazy load images (item thumbnails if shown)

### Pesanan Dibatalkan
- Show with badge "Dibatalkan" (red-muted)
- Still visible in "Semua" filter, hidden from status filters

### Invoice Number Long
- Truncate on mobile: "INV-20240120-I9J0..." (expandable)
- Full on desktop

### Multiple Items Summary
- "1 item" vs "2 items" (plural)
- If > 3: "3+ items" or show first 2 names

---

## WHAT NOT TO DO

1. ❌ NO "→" in "Lihat Detail" button
2. ❌ NO "ORDER HISTORY" label ALL-CAPS
3. ❌ NO table layout for mobile (use cards)
4. ❌ NO separate "Track" page (use detail pesanan with timeline)
5. ❌ NO auto-refresh (let user pull to refresh manually)
6. ❌ NO search in riwayat (filter by status is enough for MVP)

---

## Copy

### Page Title (H1)
```
Riwayat Pesanan
```

### Filter Tabs
```
Semua
Menunggu Bayar
Diproses
Dikirim
Selesai
```

### Card Content
```
INV-20240120-I9J0K1L2
[Status Badge]
20 Jan 2024, 19:45 WIB
Rp 365.575
1 item
Lihat Detail
```

### Load More
```
Muat Lainnya
```

### Empty State
```
Belum ada pesanan
Saatnya belanja pertama kamu!
[Mulai Belanja]
```

### Filtered Empty
```
Belum ada pesanan [status]
Pesanan dengan status ini belum ada.
```
