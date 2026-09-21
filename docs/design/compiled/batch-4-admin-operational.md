# BATCH 4: ADMIN OPERATIONAL

Gabungan 6 file admin operational screens untuk pen.dev

---



========================================
# FILE: admin-01-dashboard.md
========================================

# Screen Admin 01: Dashboard

## Tujuan
Admin overview: KPI stats, pesanan perlu perhatian, PO menunggu, aktivitas terbaru. Halaman pertama yang dilihat admin setelah login.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Dashboard                                  [ðŸ‘¤] Admin   â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”‚
â”‚  e  â”‚  â”‚ 12       â”‚ â”‚ Rp 45.2M â”‚ â”‚ 3        â”‚ â”‚ 2        â”‚    â”‚
â”‚  b  â”‚  â”‚ Pesanan  â”‚ â”‚ Omzet    â”‚ â”‚ PO       â”‚ â”‚ Komplain â”‚    â”‚
â”‚  a  â”‚  â”‚ Bulan Iniâ”‚ â”‚ Bulan Iniâ”‚ â”‚ Menuggu  â”‚ â”‚ Terbuka  â”‚    â”‚
â”‚  r  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â”‚
â”‚     â”‚                                                            â”‚
â”‚  â”€â”€â”€â”‚  â”€â”€â”€ Perlu Perhatian â”€â”€â”€                                   â”‚
â”‚     â”‚                                                            â”‚
â”‚  D  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  a  â”‚  â”‚ â— 3 pesanan menunggu verifikasi pembayaran           â”‚ â”‚
â”‚  s  â”‚  â”‚ â— 2 PO menunggu penawaran                              â”‚ â”‚
â”‚  h  â”‚  â”‚ â— 1 komplain baru                                       â”‚ â”‚
â”‚  b  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  o  â”‚                                                            â”‚
â”‚  a  â”‚  â”€â”€â”€ Pesanan Terbaru â”€â”€â”€                                  â”‚
â”‚  r  â”‚                                                            â”‚
â”‚  d  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚     â”‚  â”‚ INV-...I9J0K1L2  [Menunggu Verifikasi]  Rp 365K     â”‚ â”‚
â”‚  P  â”‚  â”‚ INV-...E5F6G7H8  [Diproses Admin]      Rp 644K     â”‚ â”‚
â”‚  e  â”‚  â”‚ INV-...A1B2C3D4  [Selesai]              Rp 562K     â”‚ â”‚
â”‚  s  â”‚  â”‚ ...                                                     â”‚ â”‚
â”‚  a  â”‚  â”‚                                    [Lihat Semua]      â”‚ â”‚
â”‚  n  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  a  â”‚                                                            â”‚
â”‚  n  â”‚  â”€â”€â”€ Aktivitas Terbaru â”€â”€â”€                                â”‚
â”‚     â”‚                                                            â”‚
â”‚  P  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  r  â”‚  â”‚ 09:15 - Verifikasi pembayaran INV-...I9J0K1L2       â”‚ â”‚
â”‚  o  â”‚  â”‚ 08:50 - Update resi INV-...E5F6G7H8                  â”‚ â”‚
â”‚  d  â”‚  â”‚ 08:30 - Penawaran PO PO-...001                        â”‚ â”‚
â”‚  u  â”‚  â”‚ Kemarin 16:00 - Pesanan INV-...A1B2C3D4 selesai      â”‚ â”‚
â”‚  k  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚     â”‚                                                            â”‚
â”‚  P  â”‚                                                            â”‚
â”‚  O  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  K  â”‚                                                            â”‚
â”‚  o  â”‚                                                            â”‚
â”‚  m  â”‚                                                            â”‚
â”‚  p  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  L  â”‚                                                            â”‚
â”‚  o  â”‚                                                            â”‚
â”‚  g  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  S  â”‚                                                            â”‚
â”‚  e  â”‚                                                            â”‚
â”‚  t  â”‚                                                            â”‚
â”‚  t  â”‚                                                            â”‚
â”‚  .  â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]  Dashboard   [ðŸ‘¤]    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”â”‚
â”‚ â”‚ 12 â”‚ â”‚45M â”‚ â”‚ 3  â”‚ â”‚2 â”‚â”‚
â”‚ â”‚Psn â”‚ â”‚Omz â”‚ â”‚PO â”‚ â”‚Kmâ”‚â”‚
â”‚ â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜ â””â”€â”€â”˜â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Perlu Perhatian â”€â”€â”€   â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ â— 3 verifikasi bayar  â”‚ â”‚
â”‚ â”‚ â— 2 PO menunggu       â”‚ â”‚
â”‚ â”‚ â— 1 komplain baru     â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Pesanan Terbaru â”€â”€â”€   â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚INV-...I9J0K1L2        â”‚ â”‚
â”‚ â”‚[Menuggu Verif] 365K   â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚INV-...E5F6G7H8        â”‚ â”‚
â”‚ â”‚[Diproses] 644K        â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚            [Lihat Semua]   â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Aktivitas â”€â”€â”€         â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ 09:15 Verif INV-...    â”‚ â”‚
â”‚ â”‚ 08:50 Resi INV-...     â”‚ â”‚
â”‚ â”‚ 08:30 Penawaran PO-... â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚ â† admin bottom nav
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
- **Collapse:** Click toggle â†’ 64px (icons only, tooltips on hover)
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
  - Clickable: â†’ navigate to filtered list
- **Alerts:**
  - "3 pesanan menunggu verifikasi pembayaran" â†’ `/admin/pesanan?status=MENUNGGU_VERIFIKASI`
  - "2 PO menunggu penawaran" â†’ `/admin/po?status=MENUNGGU_PENAWARAN`
  - "1 komplain baru" â†’ `/admin/komplain?status=BARU`
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
  Click: â†’ /admin/pesanan/[id]
  ```
- **Footer:** "Lihat Semua" link â†’ `/admin/pesanan`

### Section 6: Aktivitas Terbaru (Log)
- **Layout:** Card container, full width
- **Content:** Last 5 log entries
- **Each entry:**
  ```
  Layout: horizontal
  - Timestamp (Inter 400, 12px, #6B5D52) â€” "09:15" or "Kemarin 16:00"
  - Action text (Inter 400, 14px)
  - Entity link (clickable, Chinese Red) â†’ related detail
  ```
- **Footer:** "Lihat Semua Log" link â†’ `/admin/log`

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
- Click card â†’ navigate to related list (e.g., Omzet â†’ `/admin/pesanan`)
- Cursor: pointer
- Hover: border #C8102E, shadow subtle

### Alert Click
- Click alert â†’ navigate to filtered list
- e.g., "3 pesanan menunggu verifikasi" â†’ `/admin/pesanan?status=MENUNGGU_VERIFIKASI`

### Pesanan Item Click
- Click â†’ `/admin/pesanan/[id]`

### Lihat Semua Links
- Click â†’ respective full list pages

### Auto-Refresh
- Optional: refresh data every 5 minutes (background, no visible reload)
- OR: manual "Refresh" button in top bar

### Sidebar Collapse Toggle
- Click toggle icon â†’ collapse to 64px (icons only)
- Click again â†’ expand to 240px
- State saved in localStorage

---

## Edge Cases

### Large Omzet (Rp 100M+)
- Format: "Rp 100.5JT" (compact) or "Rp 100.500.000" (full)
- Desktop: full format
- Mobile: compact "Rp 100.5JT"

### Many Pending Items (>10)
- Alert panel: show top 3 categories
- "X pesanan butuh perhatian lain" â†’ link to full list

### No Logs Yet
- Aktivitas: "Belum ada aktivitas tercatat."

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in links
2. âŒ NO "DASHBOARD" / "OVERVIEW" ALL-CAPS
3. âŒ NO count-up animation on stats
4. âŒ NO charts/graphs (MVP: numbers + lists only, backlog: add chart)
5. âŒ NO gradient stat cards
6. âŒ NO "Welcome back, [Name]!" greeting (waste of space)
7. âŒ NO weather widget, news feed, or unrelated content
8. âŒ NO full-page background image
9. âŒ NO "Quick Actions" floating panel (use sidebar nav)

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

â— 3 pesanan menunggu verifikasi pembayaran
â— 2 PO menunggu penawaran
â— 1 komplain baru
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



========================================
# FILE: admin-02-kelola-pesanan.md
========================================

# Screen Admin 02: Kelola Pesanan

## Tujuan
Admin lihat semua pesanan, filter by status, search by invoice, dan quick action: verifikasi pembayaran, update status.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Kelola Pesanan                                           â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  [ðŸ” Cari invoice...]  Status: [Semua â–¼]  [Export CSV]   â”‚
â”‚  e  â”‚                                                            â”‚
â”‚  b  â”‚  [Semua] [Menunggu Bayar] [Verifikasi] [Diproses]         â”‚
â”‚  a  â”‚  [Dikirim] [Selesai] [Dibatalkan]                          â”‚
â”‚  r  â”‚                                                            â”‚
â”‚     â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  D  â”‚  â”‚ Invoice           Customer         Tgl     Total  Statusâ”‚ â”‚
â”‚  a  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  s  â”‚  â”‚ INV-...I9J0K1L2  budi@email.com  20 Jan  365K  [Verif]â”‚ â”‚
â”‚  h  â”‚  â”‚ INV-...E5F6G7H8  siti@email.com  18 Jan  644K  [Proses]â”‚ â”‚
â”‚  b  â”‚  â”‚ INV-...A1B2C3D4  budi@email.com  15 Jan  562K  [Selesaiâ”‚ â”‚
â”‚  o  â”‚  â”‚ ...                                                       â”‚ â”‚
â”‚  a  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  r  â”‚                                                            â”‚
â”‚  d  â”‚  [â† Prev]  1 2 3  [Next â†’]    10 per page                 â”‚
â”‚     â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]  Kelola Pesanan [ðŸ‘¤]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [ðŸ” Cari invoice...]      â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Semua][Bayar][Verif]     â”‚ â† horizontal scroll
â”‚ [Proses][Kirim][Selesai] â”‚
â”‚ [Batal]                   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ INV-...I9J0K1L2        â”‚ â”‚
â”‚ â”‚ budi@email.com         â”‚ â”‚
â”‚ â”‚ 20 Jan  [Verifikasi]   â”‚ â”‚
â”‚ â”‚           Rp 365.575    â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ INV-...E5F6G7H8        â”‚ â”‚
â”‚ â”‚ siti@email.com         â”‚ â”‚
â”‚ â”‚ 18 Jan  [Diproses]     â”‚ â”‚
â”‚ â”‚           Rp 644.280    â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ INV-...A1B2C3D4        â”‚ â”‚
â”‚ â”‚ budi@email.com         â”‚ â”‚
â”‚ â”‚ 15 Jan  [Selesai]      â”‚ â”‚
â”‚ â”‚           Rp 562.750    â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Muat Lainnya]            â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- Same as dashboard, "Pesanan" active

### Section 2: Toolbar
- **Layout:** Horizontal bar, margin 24px
- **Content:**
  - Search input: "Cari invoice..." (placeholder, monospace)
  - Status filter dropdown: Semua, Menunggu Bayar, Menunggu Verifikasi, Diproses Admin, Dikonsolidasi, Dikirim, Tiba Lokal, Selesai, Dibatalkan
  - Export CSV button (secondary, desktop only) â†’ download pesanan list
- **Behavior:**
  - Search: debounce 300ms â†’ filter by invoice (contains)
  - Status: select â†’ filter list
  - Both: combine filters

### Section 3: Status Tabs (Quick Filter)
- **Layout:** Horizontal row (desktop) / scroll (mobile)
- **Tabs:** Semua, Menunggu Bayar, Menunggu Verifikasi, Diproses, Dikirim, Selesai, Dibatalkan
- **Active state:** Background rgba(200,16,46,0.1), text Chinese Red, font-weight 600
- **Behavior:** Click â†’ filter list by status (sync with dropdown)
- **Badge count:** Optional (count per status, small badge on tab)

### Section 4: Pesanan Table (Desktop)
- **Layout:** Table, full width
- **Columns:**
  ```
  | Invoice | Customer | Tanggal | Total | Status | Action |
  ```
- **Column details:**
  - Invoice: monospace, Inter 600, 14px
  - Customer: email (Inter 400, 14px)
  - Tanggal: DD MMM YYYY (Inter 400, 14px)
  - Total: Noto Serif SC 700, 16px, gold #B5941F
  - Status: badge (from components.md)
  - Action: "Detail" link (ghost, â†’ `/admin/pesanan/[id]`)
- **Row hover:** Background #F7F3EC, cursor pointer
- **Row click:** Navigate to detail
- **Pagination:** Bottom, 10 per page

### Section 5: Pesanan Cards (Mobile)
- **Layout:** Vertical stack, 12px gap
- **Each card:**
  ```
  Invoice (Inter 600, 14px, monospace)
  Customer email (Inter 400, 13px, #6B5D52)
  Tanggal + Status badge (horizontal)
  Total (right-aligned, Noto Serif SC 700, 16px, gold)
  Click: â†’ /admin/pesanan/[id]
  ```
- **Load More:** Button at bottom

### Section 6: Pagination (Desktop)
- **Layout:** Center, margin 24px top
- **Content:** Prev/Next + page numbers
- **Style:** Same as customer katalog pagination
- **Page size:** 10 per page (desktop), 20 per page (mobile load more)

---

## States

### Loading
- Table: skeleton rows (10 placeholders)
- Mobile: skeleton cards

### Empty (No Pesanan)
- Table area: "Belum ada pesanan."
- If filtered: "Nggak ada pesanan dengan status ini."

### Search No Results
- "Nggak ketemu invoice 'XYZ'. Cek lagi nomornya."

### Export Loading
- Button: spinner + "Mengexport..."
- On complete: file downloads, toast "CSV terdownload"

---

## Interactions

### Search
- Debounce 300ms
- Filter by invoice number (contains, case-insensitive)
- Preserve status filter

### Status Filter (Dropdown + Tabs)
- Both sync: change dropdown â†’ update tab active, change tab â†’ update dropdown
- Tabs: quick access, dropdown: full list

### Row Click
- Click row (desktop) or card (mobile) â†’ `/admin/pesanan/[id]`

### Export CSV
- Click â†’ API: GET /api/admin/pesanan/export?status=X â†’ CSV file
- Desktop only (mobile: no export, just view)

### Pagination
- Click page â†’ fetch new data
- URL sync: `/admin/pesanan?page=2&status=DIPROSES&q=`

---

## Edge Cases

### Very Long Invoice List (100+)
- Pagination 10 per page
- Show "X dari Y pesanan" count

### Custom PO Pesanan
- Invoice shows "PO-" prefix for PO-derived orders
- Or same format, but detail page shows PO origin

### Pesanan Dibatalkan by System (Kadaluwarsa)
- Show in list with badge "Dibatalkan" (grey)
- Can still view detail (for audit)

### Customer Deleted Account
- Still show pesanan (pesanan is independent of account deletion)
- Customer email: "[Akun dihapus]" or last known email

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in "Detail" link
2. âŒ NO "ORDERS" / "MANAGE ORDERS" ALL-CAPS
3. âŒ NO bulk select checkboxes (MVP: individual action only)
4. âŒ NO inline status edit (use detail page for status update)
5. âŒ NO drag-to-reorder rows
6. âŒ NO "Print invoice" button (backlog)

---

## Copy

### Page Title (H1)
```
Kelola Pesanan
```

### Toolbar
```
[Cari invoice...]  Status: [Semua â–¼]  [Export CSV]
```

### Status Tabs
```
Semua
Menunggu Bayar
Menunggu Verifikasi
Diproses
Dikirim
Selesai
Dibatalkan
```

### Table Headers
```
Invoice | Customer | Tanggal | Total | Status | Action
```

### Table Row
```
INV-20240120-I9J0K1L2  budi@email.com  20 Jan 2024  Rp 365.575  [Menunggu Verifikasi]  [Detail]
```

### Empty States
```
Belum ada pesanan.
Nggak ada pesanan dengan status ini.
Nggak ketemu invoice 'XYZ'. Cek lagi nomornya.
```

### Pagination
```
[â† Sebelumnya]  1 2 3  [Selanjutnya â†’]
10 per halaman
```

### Mobile Load More
```
Muat Lainnya
```

### Toasts
```
CSV terdownload
```



========================================
# FILE: admin-03-detail-pesanan.md
========================================

# Screen Admin 03: Detail Pesanan

## Tujuan
Admin lihat detail pesanan, verifikasi pembayaran (approve/reject), update status (proses, kirim, selesai), update no. resi, lihat status log timeline, akses komplain (jika ada).

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  â† Kelola Pesanan                                         â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  INV-20240120-I9J0K1L2     [Menunggu Verifikasi]         â”‚
â”‚  e  â”‚  20 Jan 2024, 19:45 WIB   Customer: budi@email.com       â”‚
â”‚  b  â”‚                                                            â”‚
â”‚  a  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  r  â”‚  â”‚  Status Pipeline         â”‚  â”‚  Aksi Cepat           â”‚  â”‚
â”‚     â”‚  â”‚                          â”‚  â”‚                       â”‚  â”‚
â”‚  D  â”‚  â”‚  â—â”â”â—â”â”â—â”â”â—‹â”â”â—‹â”â”â—‹       â”‚  â”‚  [Verifikasi Bayar]  â”‚  â”‚
â”‚  a  â”‚  â”‚  Bayar Verif Proses Kon Lok Sel  â”‚  â”‚  [Tolak Bayar]       â”‚  â”‚
â”‚  s  â”‚  â”‚                          â”‚  â”‚                       â”‚  â”‚
â”‚  h  â”‚  â”‚  Log:                    â”‚  â”‚  Update Resi:         â”‚  â”‚
â”‚  b  â”‚  â”‚  19:45 - Pesanan dibuat  â”‚  â”‚  [JNE-________]       â”‚  â”‚
â”‚  o  â”‚  â”‚  19:45 - Bukti diupload  â”‚  â”‚  [Update Resi]        â”‚  â”‚
â”‚  a  â”‚  â”‚  (waiting verify)        â”‚  â”‚                       â”‚  â”‚
â”‚  r  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚  d  â”‚                                                            â”‚
â”‚     â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  P  â”‚  â”‚  Item Pesanan            â”‚  â”‚  Info Customer        â”‚  â”‚
â”‚  e  â”‚  â”‚                          â”‚  â”‚                       â”‚  â”‚
â”‚  s  â”‚  â”‚  â”Œâ”€â”€â” Tas Backpack       â”‚  â”‚  Budi Santoso         â”‚  â”‚
â”‚  a  â”‚  â”‚  â”‚  â”‚ Premium (Hitam)    â”‚  â”‚  budi@email.com       â”‚  â”‚
â”‚  n  â”‚  â”‚  â””â”€â”€â”˜ 282K x1 = 282K    â”‚  â”‚  +62 812-3456-7890    â”‚  â”‚
â”‚  a  â”‚  â”‚                          â”‚  â”‚                       â”‚  â”‚
â”‚  n  â”‚  â”‚  â”Œâ”€â”€â” Kaos Oversized     â”‚  â”‚  [Chat WhatsApp]      â”‚  â”‚
â”‚     â”‚  â”‚  â”‚  â”‚ (Size L Hitam)    â”‚  â”‚                       â”‚  â”‚
â”‚  P  â”‚  â”‚  â””â”€â”€â”˜ 35K x2 = 70K      â”‚  â”‚  Alamat:              â”‚  â”‚
â”‚  r  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚  Jl. Merdeka 123     â”‚  â”‚
â”‚  o  â”‚                                  â”‚  Bandung, 40123     â”‚  â”‚
â”‚  d  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚                       â”‚  â”‚
â”‚  u  â”‚  â”‚  Bukti Pembayaran        â”‚  â”‚  Kurir: JNE REG       â”‚  â”‚
â”‚  k  â”‚  â”‚                          â”‚  â”‚  Resi: -              â”‚  â”‚
â”‚     â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”              â”‚  â”‚  Estimasi: 3-5 hari  â”‚  â”‚
â”‚  P  â”‚  â”‚  â”‚        â”‚  [Lihat]    â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚  O  â”‚  â”‚  â”‚ IMAGE  â”‚              â”‚                              â”‚
â”‚     â”‚  â”‚  â”‚        â”‚              â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  K  â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜              â”‚  â”‚  Rincian Biaya       â”‚  â”‚
â”‚  o  â”‚  â”‚  Upload: 19:50 WIB       â”‚  â”‚                       â”‚  â”‚
â”‚  m  â”‚  â”‚  Bank: BCA               â”‚  â”‚  Subtotal:  352.500   â”‚  â”‚
â”‚  p  â”‚  â”‚  Jumlah: Rp 365.575      â”‚  â”‚  Jasa Titip: 35.250  â”‚  â”‚
â”‚     â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚  Ongkir CN: 150.000  â”‚  â”‚
â”‚  L  â”‚                                  â”‚  Ongkir ID:  25.000  â”‚  â”‚
â”‚  o  â”‚                                  â”‚  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€       â”‚  â”‚
â”‚  g  â”‚                                  â”‚  Total:     562.750  â”‚  â”‚
â”‚     â”‚                                  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Detail Pesanan     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ INV-20240120-I9J0K1L2     â”‚
â”‚ [Menunggu Verifikasi]      â”‚
â”‚ 20 Jan 2024, 19:45 WIB   â”‚
â”‚ budi@email.com            â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Status Pipeline        â”‚ â”‚
â”‚ â”‚ â—â”â—â”â—â”â—‹â”â—‹â”â—‹            â”‚
â”‚ â”‚ B V P K L S            â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Log:                   â”‚ â”‚
â”‚ â”‚ 19:45 Pesanan dibuat  â”‚ â”‚
â”‚ â”‚ 19:50 Bukti diupload  â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Aksi Cepat             â”‚ â”‚
â”‚ â”‚ [Verifikasi Bayar]    â”‚ â”‚
â”‚ â”‚ [Tolak Bayar]         â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Update Resi:           â”‚ â”‚
â”‚ â”‚ [JNE-________]         â”‚ â”‚
â”‚ â”‚ [Update Resi]         â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Item Pesanan           â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â” Tas Backpack      â”‚ â”‚
â”‚ â”‚ â”‚  â”‚ Premium (Hitam)   â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”˜ 282K x1           â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â” Kaos Oversized    â”‚ â”‚
â”‚ â”‚ â”‚  â”‚ (L Hitam)         â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”˜ 35K x2            â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Bukti Pembayaran       â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â”€â”€â”                 â”‚ â”‚
â”‚ â”‚ â”‚IMG â”‚ [Lihat]         â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”€â”€â”˜                 â”‚ â”‚
â”‚ â”‚ Upload: 19:50         â”‚ â”‚
â”‚ â”‚ Bank: BCA              â”‚ â”‚
â”‚ â”‚ Jumlah: Rp 365.575     â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Info Customer          â”‚ â”‚
â”‚ â”‚ Budi Santoso           â”‚ â”‚
â”‚ â”‚ budi@email.com         â”‚ â”‚
â”‚ â”‚ +62 812-3456-7890     â”‚ â”‚
â”‚ â”‚ [Chat WhatsApp]        â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Alamat:                â”‚ â”‚
â”‚ â”‚ Jl. Merdeka 123        â”‚ â”‚
â”‚ â”‚ Bandung, 40123         â”‚ â”‚
â”‚ â”‚ Kurir: JNE REG         â”‚ â”‚
â”‚ â”‚ Resi: -                â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Rincian Biaya          â”‚ â”‚
â”‚ â”‚ Subtotal:    352.500   â”‚ â”‚
â”‚ â”‚ Jasa Titip:   35.250   â”‚ â”‚
â”‚ â”‚ Ongkir CN:   150.000   â”‚ â”‚
â”‚ â”‚ Ongkir ID:    25.000   â”‚ â”‚
â”‚ â”‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€          â”‚ â”‚
â”‚ â”‚ Total:       562.750   â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Back link: "â† Kelola Pesanan" (â†’ `/admin/pesanan`)
- Mobile: back button, title "Detail Pesanan"

### Section 2: Header Info
- Invoice number (H1, Noto Serif SC 700, 24px desktop / 20px mobile)
- Status badge
- Tanggal + Customer email (horizontal, Inter 400, 14px)

### Section 3: Status Pipeline + Log
- **Pipeline:** 6 nodes (Bayar, Verif, Proses, Konsol, Lokal, Selesai)
  - Completed: gold + check
  - Active: Chinese Red
  - Pending: outline
  - Dibatalkan: red-muted
- **Log (below pipeline):**
  - Timestamp + action description
  - e.g., "19:45 - Pesanan dibuat"
  - e.g., "19:50 - Bukti pembayaran diupload"
  - e.g., "09:15 - Verifikasi pembayaran (admin)"

### Section 4: Aksi Cepat (Quick Actions)
- **Conditional based on status:**
  - MENUNGGU_VERIFIKASI:
    - "Verifikasi Bayar" (Primary) â†’ status â†’ DIPROSES_ADMIN
    - "Tolak Bayar" (secondary, red-tinted) â†’ status â†’ DITOLAK + reason
  - DIPROSES_ADMIN:
    - "Update Resi" (with input field) â†’ status â†’ DIKIRIM
    - Resi input: text, monospace, placeholder "JNE-1234567890"
  - DIKIRIM / TIBA_KIRIM_LOKAL:
    - "Tandai Tiba" â†’ TIBA_KIRIM_LOKAL
    - "Tandai Selesai" â†’ SELESAI
  - SELESAI: no actions (read-only)
  - DIBATALKAN: no actions

### Section 5: Item Pesanan
- Same as customer detail-pesanan
- List of items: thumbnail + name + varian + harga + qty + subtotal

### Section 6: Bukti Pembayaran
- **Conditional:** Only if bukti uploaded (status >= MENUNGGU_VERIFIKASI)
- **Content:**
  - Thumbnail preview (200x200px or 4:3)
  - "Lihat" button â†’ fullscreen modal
  - Upload timestamp
  - Bank (detected or from customer input)
  - Jumlah (total bayar)
- **If no bukti (MENUNGGU_PEMBAYARAN):** "Belum ada bukti. Pesanan menunggu pembayaran."

### Section 7: Info Customer
- **Content:**
  - Nama
  - Email
  - No. WhatsApp + "Chat WhatsApp" button (â†’ wa.me link)
  - Alamat lengkap
  - Kurir + No. Resi + Estimasi

### Section 8: Rincian Biaya
- Same as customer detail-pesanan
- Breakdown: subtotal, jasa titip, ongkir china, ongkir domestik, biaya admin, total

---

## States

### Loading
- Skeleton all cards

### Verify Loading
- "Verifikasi Bayar" button: spinner + "Memverifikasi..."
- Disable all actions

### Reject Flow
- Click "Tolak Bayar" â†’ modal:
  - "Tolak pembayaran ini?"
  - Reason textarea (required): "Alasan penolakan"
  - [Batal] [Ya, Tolak]
- On confirm: status â†’ DITOLAK, log updated, customer notified

### Resi Update
- Input resi + click "Update Resi" â†’ API update
- Success: status â†’ DIKIRIM, toast "Resi diupdate, pesanan dikirim"
- Customer notified (notifikasi)

### Status Update Success
- Pipeline updates (active node moves)
- Log adds new entry
- Toast: "Status pesanan diupdate"

---

## Interactions

### Verifikasi Bayar
- Click â†’ confirm modal "Verifikasi pembayaran ini? Customer akan dikabarin."
- Confirm â†’ API: PATCH /api/admin/pesanan/[id]/verify
- Status â†’ DIPROSES_ADMIN
- Log: "Verifikasi pembayaran"
- Customer notified

### Tolak Bayar
- Click â†’ modal with reason textarea
- Confirm â†’ API: PATCH /api/admin/pesanan/[id]/reject
- Status â†’ DITOLAK
- Log: "Pembayaran ditolak: [reason]"
- Customer notified with reason

### Update Resi
- Input resi + click "Update Resi"
- API: PATCH /api/admin/pesanan/[id]/resi
- Status â†’ DIKIRIM (if was DIPROSES_ADMIN)
- Log: "No. resi diupdate: [resi]"
- Customer notified

### Tandai Tiba / Selesai
- Click â†’ confirm â†’ API: PATCH status
- Log updated, customer notified

### Bukti Fullscreen
- Click thumbnail â†’ modal fullscreen image
- Close: X or click outside

### Chat WhatsApp
- Click â†’ `window.open(wa.me/[nomor]?text=...)`
- Pre-filled: "Halo [nama], mengenai pesanan [invoice]..."

---

## Edge Cases

### Custom PO Pesanan
- Item: "Custom PO: [deskripsi]"
- Link to PO detail: "Lihat PO PO-20240120-001"

### Bukti Multiple Uploads (retry after reject)
- Show all bukti attempts (history)
- Each: timestamp + status (verified/rejected)
- Current active bukti highlighted

### Komplain on This Pesanan
- If komplain exists: show badge "Komplain Diajukan"
- Link: "Lihat Komplain" â†’ `/admin/komplain/[id]`

### Customer No WhatsApp
- If noWa null: hide "Chat WhatsApp" button
- Show email only

### Resi Update Fail
- Toast: "Gagal update resi. Coba lagi."

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in action buttons
2. âŒ NO "ORDER DETAILS" ALL-CAPS
3. âŒ NO inline edit of biaya (read-only display, edit via separate flow if needed)
4. âŒ NO "Delete pesanan" button (pesanan is permanent record)
5. âŒ NO auto-approve payment (admin must verify manually)
6. âŒ NO "Print invoice" (backlog)
7. âŒ NO "Refund" button (refund handled via komplain flow)

---

## Copy

### Page Title (H1)
```
INV-20240120-I9J0K1L2
```

### Header Info
```
[Menunggu Verifikasi]
20 Jan 2024, 19:45 WIB
Customer: budi@email.com
```

### Status Pipeline
```
â—â”â”â—â”â”â—‹â”â”â—‹â”â”â—‹â”â”â—‹
Bayar  Verif  Proses  Konsol  Lokal  Selesai
```

### Log
```
19:45 - Pesanan dibuat
19:50 - Bukti pembayaran diupload
(waiting verification)
```

### Quick Actions
```
[Verifikasi Bayar]
[Tolak Bayar]

Update Resi:
[JNE-________]
[Update Resi]
```

### Item
```
Tas Backpack Premium
Varian: Hitam
Rp 282.000 x1
Subtotal: Rp 282.000
```

### Bukti Pembayaran
```
Bukti Pembayaran

[IMAGE THUMBNAIL]  [Lihat]
Upload: 20 Jan 2024, 19:50 WIB
Bank: BCA
Jumlah: Rp 365.575
```

### Info Customer
```
Info Customer

Budi Santoso
budi@email.com
+62 812-3456-7890
[Chat WhatsApp]

Alamat:
Jl. Merdeka No. 123
RT 01 RW 02
Bandung, Jawa Barat
40123

Kurir: JNE REG
No. Resi: -
Estimasi: 3-5 hari
```

### Rincian Biaya
```
Rincian Biaya

Subtotal Produk:        Rp 352.500
Biaya Jasa Titip (10%): Rp 35.250
Ongkir China Gudang:    Rp 150.000
Ongkir Domestik:        Rp 25.000
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Total:                  Rp 562.750
```

### Reject Modal
```
Tolak pembayaran ini?

Alasan penolakan:
[                                        ]

[Batal]  [Ya, Tolak]
```

### Verify Confirm
```
Verifikasi pembayaran ini?
Customer akan dikabarin.

[Batal]  [Ya, Verifikasi]
```

### Toasts
```
Status pesanan diupdate
Resi diupdate, pesanan dikirim
Pembayaran diverifikasi
Pembayaran ditolak, customer dikabarin
Gagal update resi. Coba lagi.
```



========================================
# FILE: admin-04-kelola-produk.md
========================================

# Screen Admin 04: Kelola Produk

## Tujuan
Admin lihat semua produk, filter by kategori/status, search, dan CRUD (create new, edit, delete, set unggulan, toggle status).

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Kelola Produk                          [+ Tambah Produk] â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  [ðŸ” Cari produk...]  Kategori: [Semua â–¼]  Status: [Semuaâ–¼]â”‚
â”‚  e  â”‚                                                            â”‚
â”‚  b  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  a  â”‚  â”‚ Produk           Kategori   Harga    Stok  Status  Actâ”‚ â”‚
â”‚  r  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  d  â”‚  â”‚ [img] Tas Back..  Tas        282K     15   Aktif   â‹®  â”‚ â”‚
â”‚     â”‚  â”‚ [img] Kaos Over.  Fashion     35K     50   Aktif   â‹®  â”‚ â”‚
â”‚  P  â”‚  â”‚ [img] Dompet Kul. Aksesoris  223K      8   Aktif   â‹®  â”‚ â”‚
â”‚  r  â”‚  â”‚ [img] Sepatu Run. Sepatu     450K      0   Stok Hb  â‹® â”‚ â”‚
â”‚  o  â”‚  â”‚ ...                                                       â”‚ â”‚
â”‚  d  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  u  â”‚                                                            â”‚
â”‚  k  â”‚  [â† Prev]  1 2 3  [Next â†’]    10 per page                 â”‚
â”‚     â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]  Kelola Produk  [+]  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [ðŸ” Cari produk...]       â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Semua][Tas][Sepatu]      â”‚ â† kategori scroll
â”‚ [Aksesoris][Elektronik]   â”‚
â”‚ [Fashion]                 â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ [img] Tas Backpack     â”‚ â”‚
â”‚ â”‚ Tas  |  Rp 282.000     â”‚ â”‚
â”‚ â”‚ Stok: 15  [Aktif]  [â‹®] â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ [img] Kaos Oversized   â”‚ â”‚
â”‚ â”‚ Fashion | Rp 35.250    â”‚ â”‚
â”‚ â”‚ Stok: 50  [Aktif]  [â‹®] â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ [img] Dompet Kulit     â”‚ â”‚
â”‚ â”‚ Aksesoris | Rp 223.250 â”‚ â”‚
â”‚ â”‚ Stok: 8  [Aktif]  [â‹®]  â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ [img] Sepatu Running   â”‚ â”‚
â”‚ â”‚ Sepatu | Rp 450.000    â”‚ â”‚
â”‚ â”‚ Stok: 0  [Habis]  [â‹®]  â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Muat Lainnya]            â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Action Menu - when â‹® clicked):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Edit Produk              â”‚
â”‚  Set/Unggulan             â”‚
â”‚  Ubah Status (Aktif/Hb)   â”‚
â”‚  Hapus Produk             â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- "Produk" active

### Section 2: Header + Tambah
- **Title:** "Kelola Produk" (H1)
- **Action:** "+ Tambah Produk" (Primary, top right) â†’ `/admin/produk/new`

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
  - Action: "â‹®" menu (dropdown: Edit, Set Unggulan, Ubah Status, Hapus)
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
  Action: "â‹®" menu
  Click (card body): â†’ /admin/produk/[id]
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
- Debounce 300ms â†’ filter by nama (contains, case-insensitive)

### Filter (Kategori + Status)
- Dropdown change â†’ filter list
- URL sync: `/admin/produk?kategori=Tas&status=AKTIF`

### Row Click
- Click row body â†’ `/admin/produk/[id]` (edit page)
- Click "â‹®" â†’ action menu (don't navigate)

### Action Menu
- **Edit Produk:** â†’ `/admin/produk/[id]`
- **Set/Unggulan:** Toggle is_unggulan (toast "Produk dijadikan unggulan" / "Unggulan dicabut")
- **Ubah Status:** Toggle AKTIF â†” NONAKTIF (toast "Produk diaktifkan" / "Produk dinonaktifkan")
- **Hapus Produk:** â†’ confirm modal â†’ soft delete

### Tambah Produk
- Click "+ Tambah Produk" â†’ `/admin/produk/new`

### Pagination
- Click page â†’ fetch new data

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
- Soft delete: status â†’ DIHAPUS, hidden from customer + admin list (unless filter "Semua" includes deleted)
- Or: hide from admin list by default, show with "Tampilkan Dihapus" toggle

### Image Missing
- Fallback: placeholder icon (bag shape, #E8DCC8)

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "PRODUCTS" / "MANAGE PRODUCTS" ALL-CAPS
3. âŒ NO bulk select + bulk delete (MVP: individual)
4. âŒ NO drag-to-reorder (use is_unggulan flag instead)
5. âŒ NO inline edit (use detail page)
6. âŒ NO duplicate product button (backlog)

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
[Cari produk...]  Kategori: [Semua â–¼]  Status: [Semua â–¼]
```

### Table Headers
```
Produk | Kategori | Harga | Stok | Status | Action
```

### Row
```
[img] Tas Backpack Premium    Tas         Rp 282.000    15    [Aktif]    â‹®
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
[â† Sebelumnya]  1 2 3  [Selanjutnya â†’]
10 per halaman
```



========================================
# FILE: admin-05-detail-produk.md
========================================

# Screen Admin 05: Detail/Edit Produk

## Tujuan
Admin create new product atau edit existing. Form: nama, deskripsi, harga, kategori, gambar (multi-upload), varian (size/warna + stok), is_unggulan, status.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  â† Kelola Produk                                          â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  Edit Produk: Tas Backpack Premium                       â”‚
â”‚  e  â”‚  [Aktif]                                                  â”‚
â”‚  b  â”‚                                                            â”‚
â”‚  a  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  r  â”‚  â”‚  Informasi Dasar                                       â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚  D  â”‚  â”‚  Nama Produk *                                        â”‚ â”‚
â”‚  a  â”‚  â”‚  [Tas Backpack Premium Kulit Sintetis____________]   â”‚ â”‚
â”‚  s  â”‚  â”‚                                                        â”‚ â”‚
â”‚  h  â”‚  â”‚  Kategori *                                           â”‚ â”‚
â”‚  b  â”‚  â”‚  [Tas â–¼]                                              â”‚ â”‚
â”‚  o  â”‚  â”‚                                                        â”‚ â”‚
â”‚  a  â”‚  â”‚  Deskripsi *                                          â”‚ â”‚
â”‚  r  â”‚  â”‚  [                                                  ] â”‚ â”‚
â”‚  d  â”‚  â”‚  [  Tas backpack bahan kulit sintetis premium.      ] â”‚ â”‚
â”‚     â”‚  â”‚  [  Kapasitas 20L, cocok buat laptop 15 inch...    ] â”‚ â”‚
â”‚  P  â”‚  â”‚  [                                                  ] â”‚ â”‚
â”‚  r  â”‚  â”‚                                                        â”‚ â”‚
â”‚  o  â”‚  â”‚  Harga (RMB) *      Kurs Otomatis: 1 RMB = Rp 2.450  â”‚ â”‚
â”‚  d  â”‚  â”‚  [115.00]           Harga IDR: Rp 282.175            â”‚ â”‚
â”‚  u  â”‚  â”‚                      (auto-calculate, bisa override)  â”‚ â”‚
â”‚  k  â”‚  â”‚  [x] Override harga IDR manual                        â”‚ â”‚
â”‚     â”‚  â”‚  [Rp 282.000_______________]                           â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Berat (gram) *                                       â”‚ â”‚
â”‚  P  â”‚  â”‚  [800]                                                 â”‚ â”‚
â”‚  O  â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Estimasi Sampai (hari)                               â”‚ â”‚
â”‚  K  â”‚  â”‚  [7-14]                                                â”‚ â”‚
â”‚  o  â”‚  â”‚                                                        â”‚ â”‚
â”‚  m  â”‚  â”‚  â˜ Produk Unggulan (tampil besar di beranda)         â”‚ â”‚
â”‚  p  â”‚  â”‚  â˜‘ Status Aktif (tampil di katalog customer)         â”‚ â”‚
â”‚     â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  L  â”‚                                                            â”‚
â”‚  o  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  g  â”‚  â”‚  Gambar Produk           â”‚  â”‚  Varian              â”‚  â”‚
â”‚     â”‚  â”‚                          â”‚  â”‚                      â”‚  â”‚
â”‚  S  â”‚  â”‚  â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”          â”‚  â”‚  [+ Tambah Varian]  â”‚  â”‚
â”‚  e  â”‚  â”‚  â”‚  â”‚ â”‚  â”‚ â”‚  â”‚          â”‚  â”‚                      â”‚  â”‚
â”‚  t  â”‚  â”‚  â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜          â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚  â”‚
â”‚  t  â”‚  â”‚  [img1][img2][img3]      â”‚  â”‚  â”‚ Varian 1         â”‚ â”‚  â”‚
â”‚  .  â”‚  â”‚  Drag to reorder          â”‚  â”‚  â”‚ Warna: Hitam    â”‚ â”‚  â”‚
â”‚     â”‚  â”‚  [+ Upload Gambar]        â”‚  â”‚  â”‚ Stok: [10___]   â”‚ â”‚  â”‚
â”‚     â”‚  â”‚  Max 5, JPG/PNG, 2MB     â”‚  â”‚  â”‚ [Hapus]         â”‚ â”‚  â”‚
â”‚     â”‚  â”‚                          â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚  â”‚
â”‚     â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚  â”‚
â”‚     â”‚                                  â”‚  â”‚ Varian 2         â”‚ â”‚  â”‚
â”‚     â”‚                                  â”‚  â”‚ Warna: Coklat  â”‚ â”‚  â”‚
â”‚     â”‚                                  â”‚  â”‚ Stok: [5____]  â”‚ â”‚  â”‚
â”‚     â”‚                                  â”‚  â”‚ [Hapus]         â”‚ â”‚  â”‚
â”‚     â”‚                                  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚  â”‚
â”‚     â”‚                                  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚     â”‚                                                            â”‚
â”‚     â”‚  [Batal]                              [Simpan Produk]     â”‚
â”‚     â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Edit Produk         â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ Edit Produk               â”‚
â”‚ Tas Backpack Premium      â”‚
â”‚ [Aktif]                    â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Informasi Dasar â”€â”€â”€   â”‚
â”‚                            â”‚
â”‚ Nama Produk *              â”‚
â”‚ [Tas Backpack Premium___] â”‚
â”‚                            â”‚
â”‚ Kategori *                 â”‚
â”‚ [Tas â–¼]                   â”‚
â”‚                            â”‚
â”‚ Deskripsi *                â”‚
â”‚ [                          ] â”‚
â”‚ [  Tas backpack bahan...  ] â”‚
â”‚ [                          ] â”‚
â”‚                            â”‚
â”‚ Harga (RMB) *              â”‚
â”‚ [115.00]                   â”‚
â”‚ Kurs: 1 RMB = Rp 2.450    â”‚
â”‚ Harga IDR: Rp 282.175     â”‚
â”‚ â˜ Override harga IDR      â”‚
â”‚ [Rp 282.000___]            â”‚
â”‚                            â”‚
â”‚ Berat (gram) *             â”‚
â”‚ [800]                      â”‚
â”‚                            â”‚
â”‚ Estimasi Sampai (hari)     â”‚
â”‚ [7-14]                     â”‚
â”‚                            â”‚
â”‚ â˜ Produk Unggulan         â”‚
â”‚ â˜‘ Status Aktif             â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Gambar Produk â”€â”€â”€     â”‚
â”‚ â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”             â”‚
â”‚ â”‚  â”‚ â”‚  â”‚ â”‚  â”‚             â”‚
â”‚ â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜             â”‚
â”‚ [+ Upload Gambar]          â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Varian â”€â”€â”€             â”‚
â”‚ [+ Tambah Varian]         â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Varian 1               â”‚ â”‚
â”‚ â”‚ Warna: [Hitam_______]  â”‚ â”‚
â”‚ â”‚ Stok: [10___]          â”‚ â”‚
â”‚ â”‚ [Hapus]                â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Varian 2               â”‚ â”‚
â”‚ â”‚ Warna: [Coklat_______] â”‚ â”‚
â”‚ â”‚ Stok: [5____]          â”‚ â”‚
â”‚ â”‚ [Hapus]                â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Batal]      [Simpan Produk]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Back link: "â† Kelola Produk"
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
  1. Select file â†’ preview
  2. On save: upload to R2 â†’ get URL â†’ save to DB
- **Delete:** Click X â†’ confirm "Hapus gambar ini?" â†’ remove from list (delete from R2 on save)

### Section 5: Varian
- **Layout:** List of varian cards, stack vertical
- **Add:** "+ Tambah Varian" button â†’ new empty varian card
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
  - "Batal" (secondary) â†’ `/admin/produk` (discard changes)
  - "Simpan Produk" (Primary) â†’ validate + save
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
- Drag thumbnail â†’ reorder (visual feedback)
- On save: update urutan in DB

### Varian Delete
- Click "Hapus" on varian â†’ confirm "Hapus varian ini? Stok varian ini ikut hilang."
- Confirm â†’ remove card (fade-out)
- If only 1 varian: disable delete (min 1 required)

---

## Interactions

### Harga Auto-Calc
- Type in RMB field â†’ live calc IDR = RMB Ã— kursRmbIdr
- Display: "Harga IDR: Rp 282.175"
- If "Override" checked: show manual IDR input, auto-calc disabled
- If override unchecked: revert to auto-calc

### Image Drag-to-Reorder
- HTML5 drag-and-drop or library (react-beautiful-dnd)
- First position = main image (badge "Utama")

### Image Upload
- Click "+ Upload Gambar" â†’ file input (multiple)
- Or: drag files to upload zone
- Validate: type (JPG/PNG), size (< 2MB), count (current + new <= 5)
- Preview: show thumbnail immediately (client-side URL)
- On save: upload to R2, replace preview with R2 URL

### Varian Add
- Click "+ Tambah Varian" â†’ new card slides in (200ms)
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

1. âŒ NO "â†’" in buttons
2. âŒ NO "ADD PRODUCT" / "EDIT PRODUCT" ALL-CAPS
3. âŒ NO rich text editor for deskripsi (plain textarea, MVP)
4. âŒ NO SEO meta fields (backlog)
5. âŒ NO "Related products" selector (auto from kategori)
6. âŒ NO discount/sale price field (backlog)
7. âŒ NO multiple currency (RMB input â†’ IDR auto, that's it)
8. âŒ NO video upload (backlog)

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
[Tas â–¼]

Deskripsi *
[Tas backpack bahan kulit sintetis premium. Kapasitas 20L...]

Harga (RMB) *
Kurs Otomatis: 1 RMB = Rp 2.450
Harga IDR: Rp 282.175
â˜ Override harga IDR manual
[Rp 282.000]

Berat (gram) *
[800]

Estimasi Sampai (hari)
[7-14]

â˜ Produk Unggulan (tampil besar di beranda)
â˜‘ Status Aktif (tampil di katalog customer)
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



========================================
# FILE: admin-06-kelola-po.md
========================================

# Screen Admin 06: Kelola PO

## Tujuan
Admin lihat semua permintaan PO dari customer, filter by status, dan buat penawaran (harga + estimasi ongkir + catatan) untuk permintaan yang menunggu.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Kelola PO                                                â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  [ðŸ” Cari PO...]  Status: [Semua â–¼]                       â”‚
â”‚  e  â”‚                                                            â”‚
â”‚  b  â”‚  [Semua] [Menunggu] [Ditawar] [Diterima] [Ditolak] [Exp]  â”‚
â”‚  a  â”‚                                                            â”‚
â”‚  r  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚     â”‚  â”‚ PO-ID        Customer         Tgl     Status    Actionâ”‚ â”‚
â”‚  D  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  a  â”‚  â”‚ PO-...001   budi@email.com  20 Jan  [Menunggu] [Buat] â”‚ â”‚
â”‚  s  â”‚  â”‚ PO-...002   siti@email.com  19 Jan  [Ditawar]  [Lihat]â”‚ â”‚
â”‚  h  â”‚  â”‚ PO-...003   andi@email.com  18 Jan  [Diterima] [Lihat]â”‚ â”‚
â”‚  b  â”‚  â”‚ PO-...004   budi@email.com  17 Jan  [Ditolak]  [Lihat]â”‚ â”‚
â”‚  o  â”‚  â”‚ ...                                                       â”‚ â”‚
â”‚  a  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  r  â”‚                                                            â”‚
â”‚  d  â”‚  [â† Prev]  1 2 3  [Next â†’]    10 per page                 â”‚
â”‚     â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]  Kelola PO     [ðŸ‘¤]  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [ðŸ” Cari PO...]           â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Semua][Menuggu][Ditawar] â”‚ â† horizontal scroll
â”‚ [Diterima][Ditolak][Exp]  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ PO-20240120-001        â”‚ â”‚
â”‚ â”‚ budi@email.com         â”‚ â”‚
â”‚ â”‚ 20 Jan  [Menunggu]     â”‚ â”‚
â”‚ â”‚ 1 unit  [Buat Penawaran]â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ PO-20240119-002        â”‚ â”‚
â”‚ â”‚ siti@email.com         â”‚ â”‚
â”‚ â”‚ 19 Jan  [Ditawar]      â”‚ â”‚
â”‚ â”‚ 2 unit  [Lihat Detail] â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ PO-20240118-003        â”‚ â”‚
â”‚ â”‚ andi@email.com         â”‚ â”‚
â”‚ â”‚ 18 Jan  [Diterima]     â”‚ â”‚
â”‚ â”‚ 1 unit  [Lihat Detail] â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Muat Lainnya]            â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Buat Penawaran (Modal/Drawer)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Buat Penawaran untuk PO-20240120-001              [X]       â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Detail Permintaan (read-only)                           â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  Customer: Budi Santoso (budi@email.com)                â”‚ â”‚
â”‚  â”‚  Link: https://taobao.com/...    [Buka Link]             â”‚ â”‚
â”‚  â”‚  Deskripsi: Sepatu running brand X, size 42...           â”‚ â”‚
â”‚  â”‚  Foto: [img1] [img2]                                     â”‚ â”‚
â”‚  â”‚  Jumlah Diminta: 1                                       â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Form Penawaran                                          â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  Harga per Unit (IDR) *                                  â”‚ â”‚
â”‚  â”‚  [Rp 450.000_______________]                             â”‚ â”‚
â”‚  â”‚  (Harga sudah termasuk biaya produk dari China)          â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  Estimasi Ongkir (China + Domestik) *                   â”‚ â”‚
â”‚  â”‚  [Rp 150.000______________]                              â”‚ â”‚
â”‚  â”‚  (Gabungan ongkir China gudang + domestik Indonesia)    â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  â”€â”€â”€ Auto-calc preview â”€â”€â”€                               â”‚ â”‚
â”‚  â”‚  Subtotal:        Rp 450.000 (harga Ã— jumlah)            â”‚ â”‚
â”‚  â”‚  Biaya Jasa Titip: Rp 45.000  (10%, min Rp 15.000)       â”‚ â”‚
â”‚  â”‚  Ongkir:          Rp 150.000                              â”‚ â”‚
â”‚  â”‚  Total Estimasi:  Rp 645.000                             â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  Catatan untuk Customer *                               â”‚ â”‚
â”‚  â”‚  [                                                  ]    â”‚ â”‚
â”‚  â”‚  [  Produk available, tapi pengiriman butuh 2 minggu ]    â”‚ â”‚
â”‚  â”‚  [  karena dari gudang beda kota.                    ]    â”‚ â”‚
â”‚  â”‚  Minimal 20 karakter                                     â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  [Batal]                              [Kirim Penawaran]        â”‚
â”‚                                                                â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- "PO" active

### Section 2: Header + Toolbar
- **Title:** "Kelola PO" (H1)
- **Toolbar:**
  - Search: "Cari PO..." (filter by PO-ID, debouce 300ms)
  - Status dropdown: Semua, Menunggu Penawaran, Sudah Ditawar, Diterima, Ditolak, Kadaluwarsa

### Section 3: Status Tabs
- **Tabs:** Semua, Menunggu, Ditawar, Diterima, Ditolak, Kadaluwarsa
- **Active state:** Background rgba(200,16,46,0.1), Chinese Red text
- **Badge count:** Optional per tab

### Section 4: PO Table (Desktop)
- **Columns:**
  ```
  | PO-ID | Customer | Tanggal | Jumlah | Status | Action |
  ```
- **Row details:**
  - PO-ID: monospace, Inter 600, 14px
  - Customer: email (Inter 400, 14px)
  - Tanggal: DD MMM YYYY
  - Jumlah: unit count (e.g., "1 unit", "2 unit")
  - Status: badge (Menunggu=gold, Ditawar=jade, Diterima=jade, Ditolak=red-muted, Kadaluwarsa=grey)
  - Action:
    - Menunggu: "Buat Penawaran" (Primary, small)
    - Ditawar/Diterima/Ditolak/Kadaluwarsa: "Lihat Detail" (ghost)
- **Row hover:** Background #F7F3EC
- **Pagination:** 10 per page

### Section 5: PO Cards (Mobile)
- **Each card:**
  ```
  PO-ID (Inter 600, 14px, monospace)
  Customer email (Inter 400, 13px, #6B5D52)
  Tanggal + Jumlah (horizontal)
  Status badge + Action button
  Click (body): â†’ /admin/po/[id]
  ```

### Section 6: Buat Penawaran (Modal/Drawer)
- **Trigger:** Click "Buat Penawaran" on MENUNGGU_PO
- **Layout:** Right-side drawer (desktop, 480px) / full-screen sheet (mobile)
- **Content:**
  - Detail Permintaan (read-only): customer, link, deskripsi, foto, jumlah
  - Form Penawaran:
    - Harga per Unit (IDR, required) â€” number input
    - Estimasi Ongkir (IDR, required) â€” number input
    - Auto-calc preview: subtotal, jasa titip (10%, min Rp 15K), total
    - Catatan untuk Customer (required, textarea, min 20 chars)
  - Buttons: "Batal" (secondary) + "Kirim Penawaran" (Primary)

---

## States

### Loading
- Skeleton table rows / cards

### Empty (No PO)
- "Belum ada permintaan PO."

### Search No Results
- "Nggak ketemu PO 'XYZ'."

### Penawaran Submit Loading
- "Kirim Penawaran" button: spinner + "Mengirim..."
- Disable form

### Penawaran Submit Success
- Toast: "Penawaran dikirim. Customer bakal dikabarin."
- Modal/drawer closes
- PO status â†’ SUDAH_DITAWAR
- Row updates in list
- Customer notified (notifikasi + WhatsApp broadcast)

### Penawaran Validation Error
- Harga: "Harga minimal Rp 1.000"
- Ongkir: "Ongkir minimal Rp 0"
- Catatan: "Catatan minimal 20 karakter"

---

## Interactions

### Search
- Debounce 300ms â†’ filter by PO-ID (contains)

### Status Filter
- Dropdown + tabs sync (same as kelola-pesanan)

### Row Click
- Click row (desktop) or card (mobile) â†’ `/admin/po/[id]`
- Click "Buat Penawaran" â†’ open drawer/modal

### Buat Penawaran
- Fill form â†’ auto-calc preview updates live
- "Kirim Penawaran" â†’ validate â†’ API: POST /api/admin/po/[id]/penawaran
- On success: status â†’ SUDAH_DITAWAR, customer notified

### Buka Link
- In detail view: click "Buka Link" â†’ open URL in new tab

### Foto Fullscreen
- In detail view: click thumbnail â†’ modal fullscreen

---

## Edge Cases

### PO Kadaluwarsa (no admin response in 7 days)
- Auto-expire via cron (cek-kadaluwarsa)
- Status: KADALUWARSA
- Admin can still view (read-only)
- Note: "Permintaan kadaluwarsa (admin belum review dalam 7 hari)"

### Customer Accepted Offer
- Status: DITERIMA
- Pesanan auto-created from PO
- Show link: "Lihat Pesanan INV-..." â†’ `/admin/pesanan/[id]`

### Customer Rejected Offer
- Status: DITOLAK
- Admin can see rejection (with optional reason)
- PO closed (can't re-offer in MVP)

### Multiple PO from Same Customer
- Normal: list all
- No grouping (flat list)

### Link Tidak Valid (admin checked)
- Admin can update link in penawaran (edit before sending)
- Or: add note in catatan "Link udah tak cek, ini update: [new link]"

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "PURCHASE ORDERS" ALL-CAPS
3. âŒ NO counter-offer/negotiation flow (MVP: single offer, accept/reject)
4. âŒ NO auto-generate price from link scraping (manual input)
5. âŒ NO "Draft penawaran" save (send or cancel)
6. âŒ NO bulk PO processing
7. âŒ NO "Archive PO" button (status-based, not manual archive)

---

## Copy

### Page Title (H1)
```
Kelola PO
```

### Toolbar
```
[Cari PO...]  Status: [Semua â–¼]
```

### Status Tabs
```
Semua
Menunggu
Ditawar
Diterima
Ditolak
Kadaluwarsa
```

### Table Headers
```
PO-ID | Customer | Tanggal | Jumlah | Status | Action
```

### Row
```
PO-20240120-001  budi@email.com  20 Jan 2024  1 unit  [Menunggu Penawaran]  [Buat Penawaran]
```

### Buat Penawaran Modal
```
Buat Penawaran untuk PO-20240120-001

Detail Permintaan

Customer: Budi Santoso (budi@email.com)
Link: https://taobao.com/...
[Buka Link]

Deskripsi: Sepatu running brand X, size 42, warna hitam...

Foto: [img1] [img2]

Jumlah Diminta: 1

Form Penawaran

Harga per Unit (IDR) *
[Rp 450.000]
(Harga sudah termasuk biaya produk dari China)

Estimasi Ongkir (China + Domestik) *
[Rp 150.000]
(Gabongan ongkir China gudang + domestik Indonesia)

â”€â”€â”€ Auto-calc preview â”€â”€â”€
Subtotal:         Rp 450.000 (harga Ã— jumlah)
Biaya Jasa Titip:  Rp 45.000 (10%, min Rp 15.000)
Ongkir:           Rp 150.000
Total Estimasi:   Rp 645.000

Catatan untuk Customer *
[Produk available, tapi pengiriman butuh 2 minggu...]
Minimal 20 karakter

[Batal]  [Kirim Penawaran]
```

### Empty States
```
Belum ada permintaan PO.
Nggak ketemu PO 'XYZ'.
```

### Validation Errors
```
Harga minimal Rp 1.000
Ongkir minimal Rp 0
Catatan minimal 20 karakter
```

### Toasts
```
Penawaran dikirim. Customer bakal dikabarin.
```

### Kadaluwarsa Note
```
Permintaan kadaluwarsa (admin belum review dalam 7 hari)
```

### Diterima (Link to Pesanan)
```
Penawaran diterima customer.
Lihat Pesanan INV-20240120-XXX
```
