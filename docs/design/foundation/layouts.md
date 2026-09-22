---
title: "Layouts - Jastip China"
tags: [foundation]
tanggal: 2026-09-21
---
# Layouts - Jastip China

Grid system, container, header/footer structure, admin sidebar layout.

---

## 1. GRID SYSTEM

**Approach:** CSS Grid native (bukan 12-col Bootstrap-style).

**Reason:** E-commerce modern needs flexible layouts — produk unggulan span 2x2, regular 1x1, sidebar fixed + content fluid. CSS Grid handles ini naturally.

---

## 2. CONTAINER

### Desktop (lg+, 1024px+)
```
Max-width: 1280px
Padding: 0 24px (horizontal)
Margin: 0 auto (center)
```

### Tablet (md, 768-1023px)
```
Max-width: 100%
Padding: 0 20px
```

### Mobile (xs-sm, 0-767px)
```
Max-width: 100%
Padding: 0 16px
```

**Implementation:**
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}
@media (max-width: 1023px) { .container { padding: 0 20px; } }
@media (max-width: 767px) { .container { padding: 0 16px; } }
```

---

## 3. HEADER (Customer)

### Desktop
```
Height: 64px
Background: #FFFFFF
Border-bottom: 1px solid #E8DCC8
Position: sticky, top 0, z-index 10
```

**Layout (3 zones):**
```
┌──────────────────────────────────────────────────┐
│ [Left: Logo]  [Center: Nav Menu]  [Right: Actions]│
└──────────────────────────────────────────────────┘
   flex-start      flex-1 centered     flex-end
```

| Zone | Content | Alignment |
|------|---------|-----------|
| Left | Logo (text/image) | flex-start |
| Center | Nav menu (Beranda, Katalog, Cara Order, Lacak) | flex-1, centered |
| Right | Search icon, Cart icon, Avatar/Login | flex-end, 16px gap |

**Nav Menu Spacing:**
- Item padding: 8px 16px
- Gap between items: 8px
- Active: underline 2px solid #C8102E

---

### Mobile
```
Height: 56px
Padding: 0 16px
```

**Layout:**
```
┌────────────────────────────────────┐
│ [☰]    [Logo Center]    [Cart] [♡]│
└────────────────────────────────────┘
 flex-start  flex-1 center  flex-end
```

- Hamburger: 44x44px touch target (left)
- Logo: centered (absolute or grid center)
- Cart + Wishlist: 44x44px each (right)

---

## 4. FOOTER (Customer)

### Desktop
```
Background: #2C1810 (ink dark)
Color: #FAF8F3 (cream text)
Padding: 48px 24px 24px
```

**Layout (4 columns):**
```
┌───────────────────────────────────────────────────┐
│ [Logo+Desc]  [Navigasi]  [Bantuan]  [Kontak/WA]  │
│                                                   │
│ ───────────────────────────────────────────────── │
│ © 2024 Jastip China. All rights reserved.         │
└───────────────────────────────────────────────────┘
```

| Column | Content |
|--------|---------|
| 1 | Logo, tagline ("Barang China, sampai pintu rumah"), deskripsi singkat (2-3 lines) |
| 2 | Navigasi (Beranda, Katalog, Cara Order, Lacak Pesanan, Ajukan PO) |
| 3 | Bantuan (FAQ, Kebijakan Privasi, Syarat & Ketentuan, Kebijakan Refund) |
| 4 | Kontak (WhatsApp, Email, Jam operasional, Social media) |

### Mobile
```
Layout: stack vertical (1 column)
Order: Logo+Desc → Kontak → Navigasi → Bantuan → Copyright
Padding: 32px 16px
```

**Bottom margin mobile:** 64px (space untuk bottom navigation bar)

---

## 5. ADMIN SIDEBAR LAYOUT (Permanent)

### Desktop (lg+, 1024px+)

```
┌─────────┬──────────────────────────────────────────┐
│         │ Header (64px)                            │
│ Sidebar ├──────────────────────────────────────────┤
│ (240px) │                                          │
│         │ Content Area                             │
│         │                                          │
│         │                                          │
└─────────┴──────────────────────────────────────────┘
```

**Sidebar:**
```
Width: 240px (expanded), 64px (collapsed)
Background: #2C1810 (ink dark)
Color: #FAF8F3
Position: fixed, left 0, top 0
Height: 100vh
Z-index: 20
```

**Sidebar Header:**
- Logo: "Admin" text, Noto Serif SC 700, 20px, color #C8102E (Chinese Red accent)
- Padding: 16px 24px
- Height: 64px (align dengan content header)
- Border-bottom: 1px solid rgba(250,248,243,0.1)

**Menu Items:**
```
Layout: vertical stack, 4px gap
Item: padding 12px 16px, radius 8px, font Inter 500 14px
Icon: 20x20px left, 12px gap to text
Active: background rgba(200,16,46,0.2), left border 3px solid #C8102E, text #FAF8F3
Inactive: text rgba(250,248,243,0.7), hover text #FAF8F3, hover background rgba(250,248,243,0.05)
```

**Menu Structure:**
```
Dashboard
Katalog
  ├ Produk
  └ Kategori
Pesanan
  ├ Semua Pesanan
  ├ Verifikasi Pembayaran
  └ Pengiriman
Custom PO
  └ Review PO
Komplain
  └ Handle Komplain
Pengaturan
  ├ Kurs
  ├ Log Aktivitas
  └ Admin Users
```

**Collapse Toggle:**
- Button: bottom sidebar, 40x40px
- Icon: chevron-left (collapse), chevron-right (expand)
- State: persisted in localStorage

**Collapsed State:**
- Width: 64px
- Text hidden, icon centered
- Tooltip on hover (text reveal)

---

### Admin Content Header
```
Height: 64px
Background: #FFFFFF
Border-bottom: 1px solid #E8DCC8
Padding: 0 24px
Position: sticky, top 0 (within content area)
```

**Layout:**
```
┌──────────────────────────────────────────────────┐
│ [Page Title]                    [Admin Profile]  │
│ Breadcrumb (optional)                             │
└──────────────────────────────────────────────────┘
```

- Title: Noto Serif SC 500, 20px
- Profile: avatar 36x36px + name + role badge

---

### Mobile (Admin)
```
Sidebar: hidden by default
Hamburger: top-left header (44x44px)
Sidebar overlay: slide from left, 280px width, backdrop blur
```

---

## 6. PAGE LAYOUT PATTERNS

### Pattern A: Full-Width Grid (Beranda, Katalog)
```
┌──────────────────────────────────────────────────┐
│ Header                                            │
├──────────────────────────────────────────────────┤
│                                                   │
│  Grid Produk (full container width)              │
│                                                   │
├──────────────────────────────────────────────────┤
│ Footer                                            │
└──────────────────────────────────────────────────┘
```

### Pattern B: Sidebar + Content (Katalog with filter)
```
┌──────────────────────────────────────────────────┐
│ Header                                            │
├──────────┬───────────────────────────────────────┤
│          │                                        │
│ Filter   │  Grid Produk                          │
│ Sidebar  │                                       │
│ (256px)  │                                       │
│          │                                        │
├──────────┴───────────────────────────────────────┤
│ Footer                                            │
└──────────────────────────────────────────────────┘
```

### Pattern C: 2-Column (Detail Produk, Keranjang)
```
┌──────────────────────────────────────────────────┐
│ Header                                            │
├──────────────────────────────────────────────────┤
│                    │                              │
│  Media/Gallery     │  Info/Summary                │
│  (60% width)       │  (40% width, sticky)        │
│                    │                              │
├──────────────────────────────────────────────────┤
│ Footer                                            │
└──────────────────────────────────────────────────┘
```

### Pattern D: Centered Form (Auth Pages)
```
┌──────────────────────────────────────────────────┐
│ Header (minimal, logo only)                      │
├──────────────────────────────────────────────────┤
│                                                   │
│                                                   │
│         ┌──────────────────┐                      │
│         │                  │                      │
│         │  Form Card       │                      │
│         │  (max-w-md)      │                      │
│         │                  │                      │
│         └──────────────────┘                      │
│                                                   │
│                                                   │
├──────────────────────────────────────────────────┤
│ Footer (minimal)                                 │
└──────────────────────────────────────────────────┘
```

### Pattern E: Wizard/Stepper (Checkout)
```
┌──────────────────────────────────────────────────┐
│ Header                                            │
├──────────────────────────────────────────────────┤
│  Step 1 ─── Step 2 ─── Step 3                   │
│                                                   │
│  ┌────────────────────┬──────────────────────┐   │
│  │                    │                      │   │
│  │  Step Content      │  Order Summary       │   │
│  │  (flex-1)          │  (320px, sticky)     │   │
│  │                    │                      │   │
│  └────────────────────┴──────────────────────┘   │
├──────────────────────────────────────────────────┤
│ Footer                                            │
└──────────────────────────────────────────────────┘
```

### Pattern F: Admin Table (List Pages)
```
┌─────────┬────────────────────────────────────────┐
│ Sidebar │ Header                                  │
│         ├────────────────────────────────────────┤
│         │ Title + Action Button                  │
│         ├────────────────────────────────────────┤
│         │                                        │
│         │  Table (full width)                    │
│         │  Filter bar (optional)                 │
│         │  Pagination (bottom)                  │
│         │                                        │
└─────────┴────────────────────────────────────────┘
```

---

## 7. Z-INDEX STRATEGY

| Element | Z-Index | Context |
|---------|---------|---------|
| Base content | 0 | Default |
| Sticky header | 10 | Customer + Admin |
| Sidebar (admin) | 20 | Fixed sidebar |
| Dropdown menu | 30 | Select, user menu |
| Modal backdrop | 40 | Overlay background |
| Modal dialog | 41 | Modal content |
| Toast notification | 50 | Top-right alerts |
| Tooltip | 60 | Hover info |
| Bottom nav (mobile) | 10 | Fixed bottom |

---

## 8. SECTION SPACING

| Section Type | Top Margin | Bottom Margin |
|--------------|------------|---------------|
| Hero/Banner | 0 | 48px |
| Grid Produk (main) | 0 | 48px |
| Section separator | 32px | 32px |
| Form section | 24px | 24px |
| Card section (within page) | 16px | 16px |

**Mobile spacing (reduced):**
- All values × 0.75 (desktop spacing × 3/4)
- Example: 48px → 36px, 32px → 24px

---

## VERIFICATION CHECKLIST

- [ ] Container max-width 1280px (desktop)
- [ ] Padding horizontal: 24px (desktop), 20px (tablet), 16px (mobile)
- [ ] Header height: 64px (desktop), 56px (mobile)
- [ ] Admin sidebar: 240px expanded, 64px collapsed
- [ ] Footer: dark background, 4 columns desktop, stack mobile
- [ ] Z-index hierarchy consistent
- [ ] Section spacing multiple of 8px
- [ ] Mobile bottom padding: 64px (space for bottom nav)
