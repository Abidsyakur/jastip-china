# Screen Admin 01: Dashboard

## Tujuan
Admin overview: KPI stats, pesanan perlu perhatian, PO menunggu, aktivitas terbaru. Halaman pertama yang dilihat admin setelah login.

---

## Layout Wireframe (Desktop)

```
┌─────┬───────────────────────────────────────────────────────────┐
│     │  Dashboard                                  [👤] Admin   │
│  S  ├───────────────────────────────────────────────────────────┤
│  i  │                                                            │
│  d  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  e  │  │ 12       │ │ Rp 45.2M │ │ 3        │ │ 2        │    │
│  b  │  │ Pesanan  │ │ Omzet    │ │ PO       │ │ Komplain │    │
│  a  │  │ Bulan Ini│ │ Bulan Ini│ │ Menuggu  │ │ Terbuka  │    │
│  r  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
│     │                                                            │
│  ───│  ─── Perlu Perhatian ───                                   │
│     │                                                            │
│  D  │  ┌──────────────────────────────────────────────────────┐ │
│  a  │  │ ● 3 pesanan menunggu verifikasi pembayaran           │ │
│  s  │  │ ● 2 PO menunggu penawaran                              │ │
│  h  │  │ ● 1 komplain baru                                       │ │
│  b  │  └──────────────────────────────────────────────────────┘ │
│  o  │                                                            │
│  a  │  ─── Pesanan Terbaru ───                                  │
│  r  │                                                            │
│  d  │  ┌──────────────────────────────────────────────────────┐ │
│     │  │ INV-...I9J0K1L2  [Menunggu Verifikasi]  Rp 365K     │ │
│  P  │  │ INV-...E5F6G7H8  [Diproses Admin]      Rp 644K     │ │
│  e  │  │ INV-...A1B2C3D4  [Selesai]              Rp 562K     │ │
│  s  │  │ ...                                                     │ │
│  a  │  │                                    [Lihat Semua]      │ │
│  n  │  └──────────────────────────────────────────────────────┘ │
│  a  │                                                            │
│  n  │  ─── Aktivitas Terbaru ───                                │
│     │                                                            │
│  P  │  ┌──────────────────────────────────────────────────────┐ │
│  r  │  │ 09:15 - Verifikasi pembayaran INV-...I9J0K1L2       │ │
│  o  │  │ 08:50 - Update resi INV-...E5F6G7H8                  │ │
│  d  │  │ 08:30 - Penawaran PO PO-...001                        │ │
│  u  │  │ Kemarin 16:00 - Pesanan INV-...A1B2C3D4 selesai      │ │
│  k  │  └──────────────────────────────────────────────────────┘ │
│     │                                                            │
│  P  │                                                            │
│  O  │                                                            │
│     │                                                            │
│  K  │                                                            │
│  o  │                                                            │
│  m  │                                                            │
│  p  │                                                            │
│     │                                                            │
│  L  │                                                            │
│  o  │                                                            │
│  g  │                                                            │
│     │                                                            │
│  S  │                                                            │
│  e  │                                                            │
│  t  │                                                            │
│  t  │                                                            │
│  .  │                                                            │
└─────┴───────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [☰]  Dashboard   [👤]    │
├──────────────────────────┤
│                            │
│ ┌────┐ ┌────┐ ┌────┐ ┌──┐│
│ │ 12 │ │45M │ │ 3  │ │2 ││
│ │Psn │ │Omz │ │PO │ │Km││
│ └────┘ └────┘ └────┘ └──┘│
│                            │
│ ─── Perlu Perhatian ───   │
│ ┌────────────────────────┐ │
│ │ ● 3 verifikasi bayar  │ │
│ │ ● 2 PO menunggu       │ │
│ │ ● 1 komplain baru     │ │
│ └────────────────────────┘ │
│                            │
│ ─── Pesanan Terbaru ───   │
│ ┌────────────────────────┐ │
│ │INV-...I9J0K1L2        │ │
│ │[Menuggu Verif] 365K   │ │
│ ├────────────────────────┤ │
│ │INV-...E5F6G7H8        │ │
│ │[Diproses] 644K        │ │
│ └────────────────────────┘ │
│            [Lihat Semua]   │
│                            │
│ ─── Aktivitas ───         │
│ ┌────────────────────────┐ │
│ │ 09:15 Verif INV-...    │ │
│ │ 08:50 Resi INV-...     │ │
│ │ 08:30 Penawaran PO-... │ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│[Dash][Order][+][Prod][More]│ ← admin bottom nav
└──────────────────────────┘
```

---

## Sections

### Section 1: Admin Sidebar (Desktop, Permanent)
- **Layout:** Left, 240px width, permanent (collapsible to 64px)
- **Background:** #2C1810 (ink dark)
- **Text:** #FAF8F3 (cream)
- **Content:**
  - Logo: "Jastip China" (Noto Serif SC 700, 18px, gold) + "Admin" label (12px, #6B5D52)
  - Nav links (with icons):
    - Dashboard (active)
    - Pesanan
    - Produk
    - PO
    - Komplain
    - Log Aktivitas
    - Settings
  - User: avatar + name + logout (bottom)
- **Collapse:** Click toggle → 64px (icons only, tooltips on hover)
- **Mobile:** Not visible (use bottom nav + hamburger menu)

### Section 2: Top Bar (Mobile)
- **Layout:** Fixed top, 56px
- **Content:** Hamburger (left), title "Dashboard" (center), avatar (right)

### Section 3: KPI Stats
- **Layout:** 4 stat cards, grid (desktop: 4-col, tablet: 2-col, mobile: 4-col compact)
- **Each card:**
  ```
  Background: #FFFFFF
  Border: 1px #E8DCC8
  Radius: 12px
  Padding: 20px
  Content:
    - Number (Noto Serif SC 700, 32px desktop / 24px mobile)
    - Label (Inter 400, 12px, #6B5D52)
    - Trend (optional, +/- vs last month, small)
  ```
- **Stats:**
  1. Pesanan Bulan Ini (count)
  2. Omzet Bulan Ini (Rp, formatted)
  3. PO Menunggu (count)
  4. Komplain Terbuka (count)
- **Color accents:**
  - Pesanan: Chinese Red #C8102E
  - Omzet: Gold #D4AF37
  - PO: Jade #7C9885
  - Komplain: #9B4D50 (red-muted)
- **ANTI-PATTERN:** NO count-up animation (static display)

### Section 4: Perlu Perhatian (Alert Panel)
- **Layout:** Full width card, margin 24px top
- **Background:** rgba(200,16,46,0.05) (subtle red tint)
- **Border-left:** 4px solid #C8102E
- **Content:**
  - Each alert: dot (8px, Chinese Red) + text + count
  - Clickable: → navigate to filtered list
- **Alerts:**
  - "3 pesanan menunggu verifikasi pembayaran" → `/admin/pesanan?status=MENUNGGU_VERIFIKASI`
  - "2 PO menunggu penawaran" → `/admin/po?status=MENUNGGU_PENAWARAN`
  - "1 komplain baru" → `/admin/komplain?status=BARU`
- **If no alerts:** "Semua aman, nggak ada yang perlu perhatian." (jade accent)

### Section 5: Pesanan Terbaru
- **Layout:** Card container, full width
- **Content:** Last 5 pesanan (compact list)
- **Each item:**
  ```
  Layout: horizontal (info left, action right)
  Border-bottom: 1px #E8DCC8
  Padding: 12px 16px
  Content:
    - Invoice number (Inter 600, 14px)
    - Status badge (right)
    - Total (Noto Serif SC 700, 16px, gold #B5941F)
  Click: → /admin/pesanan/[id]
  ```
- **Footer:** "Lihat Semua" link → `/admin/pesanan`

### Section 6: Aktivitas Terbaru (Log)
- **Layout:** Card container, full width
- **Content:** Last 5 log entries
- **Each entry:**
  ```
  Layout: horizontal
  - Timestamp (Inter 400, 12px, #6B5D52) — "09:15" or "Kemarin 16:00"
  - Action text (Inter 400, 14px)
  - Entity link (clickable, Chinese Red) → related detail
  ```
- **Footer:** "Lihat Semua Log" link → `/admin/log`

---

## States

### Loading
- Skeleton stat cards, skeleton alert panel, skeleton lists

### Error (Stats Fetch Fail)
- Stat cards: show "-" instead of number
- Toast: "Gagal memuat statistik. Refresh ya."

### Empty Dashboard (New Admin, No Data)
- Stats: all 0
- Perlu Perhatian: "Semua aman, nggak ada yang perlu perhatian."
- Pesanan Terbaru: "Belum ada pesanan masuk."
- Aktivitas: "Belum ada aktivitas."

---

## Interactions

### Stat Card Click
- Click card → navigate to related list (e.g., Omzet → `/admin/pesanan`)
- Cursor: pointer
- Hover: border #C8102E, shadow subtle

### Alert Click
- Click alert → navigate to filtered list
- e.g., "3 pesanan menunggu verifikasi" → `/admin/pesanan?status=MENUNGGU_VERIFIKASI`

### Pesanan Item Click
- Click → `/admin/pesanan/[id]`

### Lihat Semua Links
- Click → respective full list pages

### Auto-Refresh
- Optional: refresh data every 5 minutes (background, no visible reload)
- OR: manual "Refresh" button in top bar

### Sidebar Collapse Toggle
- Click toggle icon → collapse to 64px (icons only)
- Click again → expand to 240px
- State saved in localStorage

---

## Edge Cases

### Large Omzet (Rp 100M+)
- Format: "Rp 100.5JT" (compact) or "Rp 100.500.000" (full)
- Desktop: full format
- Mobile: compact "Rp 100.5JT"

### Many Pending Items (>10)
- Alert panel: show top 3 categories
- "X pesanan butuh perhatian lain" → link to full list

### No Logs Yet
- Aktivitas: "Belum ada aktivitas tercatat."

---

## WHAT NOT TO DO

1. ❌ NO "→" in links
2. ❌ NO "DASHBOARD" / "OVERVIEW" ALL-CAPS
3. ❌ NO count-up animation on stats
4. ❌ NO charts/graphs (MVP: numbers + lists only, backlog: add chart)
5. ❌ NO gradient stat cards
6. ❌ NO "Welcome back, [Name]!" greeting (waste of space)
7. ❌ NO weather widget, news feed, or unrelated content
8. ❌ NO full-page background image
9. ❌ NO "Quick Actions" floating panel (use sidebar nav)

---

## Copy

### Page Title (H1)
```
Dashboard
```

### Sidebar Nav
```
Dashboard
Pesanan
Produk
PO
Komplain
Log Aktivitas
Settings
```

### KPI Stats
```
12                Rp 45.2JT         3                2
Pesanan Bulan Ini Omzet Bulan Ini   PO Menunggu      Komplain Terbuka
```

### Perlu Perhatian
```
Perlu Perhatian

● 3 pesanan menunggu verifikasi pembayaran
● 2 PO menunggu penawaran
● 1 komplain baru
```

### No Alerts
```
Semua aman, nggak ada yang perlu perhatian.
```

### Pesanan Terbaru
```
Pesanan Terbaru

INV-20240120-I9J0K1L2   [Menunggu Verifikasi]   Rp 365.575
INV-20240118-E5F6G7H8   [Diproses Admin]       Rp 644.280
INV-20240115-A1B2C3D4   [Selesai]              Rp 562.750

[Lihat Semua]
```

### Aktivitas Terbaru
```
Aktivitas Terbaru

09:15    Verifikasi pembayaran INV-20240120-I9J0K1L2
08:50    Update resi INV-20240118-E5F6G7H8
08:30    Penawaran PO PO-20240120-001
Kemarin 16:00  Pesanan INV-20240115-A1B2C3D4 selesai
Kemarin 14:30  Produk baru ditambahkan: Dompet Kulit Asli

[Lihat Semua Log]
```

### Empty States
```
Belum ada pesanan masuk.
Belum ada aktivitas tercatat.
```
