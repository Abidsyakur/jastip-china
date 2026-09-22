---
title: "Screen 16: Notifikasi"
tags: [screen, customer, support]
tanggal: 2026-09-21
---
# Screen 16: Notifikasi

## Tujuan
Customer lihat daftar notifikasi (status pesanan update, penawaran PO, broadcast promo/info). Tandai read, hapus.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Notifikasi                              [Tandai Semua Baca] │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ ● [Pesanan] INV-20240120-I9J0K1L2                        │ │
│  │   Pesananmu lagi diproses admin.                        │ │
│  │   2 jam lalu                                              │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ ● [PO] PO-20240120-001                                    │ │
│  │   Admin udah kasih penawaran buat permintaan PO kamu.  │ │
│  │   5 jam lalu                                              │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │   [Info] Selamat datang di Jastip China!                 │ │
│  │   Terima kasih udah gabung.                              │ │
│  │   Kemarin                                                  │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │   [Promo] Gratis ongkir untuk pembelian pertama!        │ │
│  │   Pakai kode: GRATISONGKIR                                │ │
│  │   2 hari lalu                                             │ │
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
│ [←]  Notifikasi          │
│              [Tandai Baca]│
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │● [Pesanan] INV-...    │ │
│ │  Pesananmu lagi       │ │
│ │  diproses admin.       │ │
│ │  2 jam lalu            │ │
│ ├────────────────────────┤ │
│ │● [PO] PO-20240120-001 │ │
│ │  Admin udah kasih     │ │
│ │  penawaran PO kamu.   │ │
│ │  5 jam lalu            │ │
│ ├────────────────────────┤ │
│ │  [Info] Selamat datang│ │
│ │  Terima kasih gabung. │ │
│ │  Kemarin               │ │
│ ├────────────────────────┤ │
│ │  [Promo] Gratis ongkir│ │
│ │  pembelian pertama!    │ │
│ │  Kode: GRATISONGKIR   │ │
│ │  2 hari lalu           │ │
│ └────────────────────────┘ │
│                            │
│ [Muat Lainnya]            │
│                            │
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘

(Empty State):
┌──────────────────────────┐
│      [icon: bell-off]     │
│                            │
│   Belum ada notifikasi   │
│   Notifikasi bakal        │
│   muncul di sini.         │
│                            │
└──────────────────────────┘
```

---

## Sections

### Section 1: Header
- Standard nav
- Mobile: back button, title "Notifikasi"
- "Tandai Semua Baca" link (top right, ghost, Chinese Red) — only if unread > 0

### Section 2: Notifikasi List
- **Layout:** Vertical stack, 1px divider between items
- **Each item:**
  ```
  Layout: horizontal padding 16px desktop / 12px mobile
  Unread indicator: dot (8px circle) on left, Chinese Red if unread
  Content:
    - Type tag: [Pesanan], [PO], [Info], [Promo] (badge, small)
    - Title/Message (Inter 400, 14px desktop / 13px mobile)
    - Timestamp (Inter 400, 12px, #6B5D52)
  Unread: font-weight 600 (semibold)
  Read: font-weight 400 (normal)
  ```
- **Type tags (Badge variants):**
  - PESANAN: Jade bg
  - PO: Gold bg
  - INFO: Cream/grey bg
  - PROMO: Chinese Red bg

### Section 3: Load More
- "Muat Lainnya" button (secondary, center)
- Pagination: 20 per page

### Section 4: Empty State
- Icon: bell-off (line, 120x120px, #E8DCC8)
- Title: "Belum ada notifikasi" (Noto Serif SC 500, 20px)
- Desc: "Notifikasi bakal muncul di sini." (Inter 400, 14px)

---

## States

### Loading
- Skeleton list items (5-6 placeholders, shimmer)

### Error
- Toast: "Gagal memuat notifikasi. Tarik ke bawah buat refresh."
- Retry on pull

### All Read (no unread)
- Hide "Tandai Semua Baca" link
- All items: normal font-weight

---

## Interactions

### Item Click
- Click anywhere on item → mark as read (API) + navigate to related page
- PESANAN: → `/pesanan/[id]`
- PO: → `/permintaan-po/[id]`
- INFO: → stay (or `/bantuan` if linked)
- PROMO: → `/katalog` (or `/promo/[id]` if specific)

### Tandai Semua Baca
- Click → API: PATCH /api/notifikasi/read-all
- All unread dots disappear
- All items → normal font-weight
- Toast: "Semua notifikasi ditandai baca"

### Swipe to Delete (Mobile)
- Swipe left on item → reveal "Hapus" (red bg)
- Tap "Hapus" → API delete → item removed (fade-out 200ms)
- Desktop: no swipe, maybe hover "x" button (backlog)

### Pull to Refresh (Mobile)
- Pull down → refetch list
- Update read/unread states

---

## Edge Cases

### Many Notifications (>50)
- Pagination 20 per page
- Load more button
- Old read notifications: auto-archive after 30 days (backend)

### Deep Link from Notification
- WhatsApp broadcast with link `/notifikasi?id=X`
- Auto-scroll to that notification + highlight (bg pulse 2s)

### Notification with Action (e.g., "PO ditawar")
- Click → navigate to detail PO
- The PO detail page handles next action (setuju/tolak)

### Promo Expired
- Still show notification (historical)
- Promo link: "Promo udah berakhir" page (or `/katalog`)

---

## WHAT NOT TO DO

1. ❌ NO "→" in any notification item
2. ❌ NO "NOTIFICATIONS" label ALL-CAPS
3. ❌ NO push notification permission popup (use WhatsApp broadcast)
4. ❌ NO in-app toast for each notification (list is enough)
5. ❌ NO "Notification settings" page (MVP: all on by default)
6. ❌ NO grouped/stacked notifications (flat list)
7. ❌ NO unread badge count in header (too aggressive for MVP)

---

## Copy

### Page Title (H1)
```
Notifikasi
[Tandai Semua Baca]
```

### List Items
```
● [Pesanan] INV-20240120-I9J0K1L2
  Pesananmu lagi diproses admin.
  2 jam lalu

● [PO] PO-20240120-001
  Admin udah kasih penawaran buat permintaan PO kamu.
  5 jam lalu

  [Info] Selamat datang di Jastip China!
  Terima kasih udah gabung.
  Kemarin

  [Promo] Gratis ongkir untuk pembelian pertama!
  Pakai kode: GRATISONGKIR
  2 hari lalu
```

### Empty State
```
Belum ada notifikasi
Notifikasi bakal muncul di sini.
```

### Toasts
```
Semua notifikasi ditandai baca
Notifikasi dihapus
Gagal memuat notifikasi. Tarik ke bawah buat refresh.
```

### Load More
```
Muat Lainnya
```

### Timestamps (relative)
```
Baru saja
X menit lalu
X jam lalu
Kemarin
X hari lalu
```
