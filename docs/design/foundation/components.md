---
title: "Components Library - Jastip China"
tags: [foundation]
tanggal: 2026-09-21
---
# Components Library - Jastip China

18 reusable components dengan semua states (default, hover, active, focus, disabled, error, loading).

**Design principle:** Setiap component harus bisa standalone, tidak bergantung pada context parent (kecuali data props).

---

## 1. BUTTON

### Variants

#### Primary (Call-to-action)
```
Background: Chinese Red #C8102E
Text: White #FFFFFF
Font: Inter 600, 16px
Padding: 12px 24px
Radius: 8px
Border: none
Shadow: none (default), subtle on hover
```

**States:**

| State | Background | Text | Border | Shadow | Cursor |
|-------|------------|------|--------|--------|--------|
| Default | #C8102E | #FFFFFF | none | none | pointer |
| Hover | #A60D25 (darker 15%) | #FFFFFF | none | 0 2px 4px rgba(200,16,46,0.2) | pointer |
| Active | #8B0A1F (darker 30%) | #FFFFFF | none | inset 0 2px 4px rgba(0,0,0,0.2) | pointer |
| Focus | #C8102E | #FFFFFF | 2px solid #C8102E | 0 0 0 4px rgba(200,16,46,0.1) | pointer |
| Disabled | #E8DCC8 | #6B5D52 (60% opacity) | none | none | not-allowed |
| Loading | #C8102E | Spinner white | none | none | default |

**Usage:** "Tambah ke Keranjang", "Checkout", "Bayar Sekarang", "Simpan"

**ANTI-PATTERN:** JANGAN tambah "→" di akhir text button.

---

#### Secondary (Non-destructive action)
```
Background: transparent
Text: Chinese Red #C8102E
Font: Inter 600, 16px
Padding: 12px 24px
Radius: 8px
Border: 1px solid #C8102E
Shadow: none
```

**States:**

| State | Background | Text | Border | Shadow | Cursor |
|-------|------------|------|--------|--------|--------|
| Default | transparent | #C8102E | 1px solid #C8102E | none | pointer |
| Hover | rgba(200,16,46,0.05) | #C8102E | 1px solid #C8102E | none | pointer |
| Active | rgba(200,16,46,0.1) | #A60D25 | 1px solid #A60D25 | none | pointer |
| Focus | transparent | #C8102E | 2px solid #C8102E | 0 0 0 4px rgba(200,16,46,0.1) | pointer |
| Disabled | transparent | #6B5D52 (60% opacity) | 1px solid #E8DCC8 | none | not-allowed |

**Usage:** "Batal", "Kembali", "Lihat Detail", "Edit"

---

#### Ghost (Subtle action)
```
Background: transparent
Text: Chinese Red #C8102E
Font: Inter 500, 16px
Padding: 8px 16px
Radius: 8px
Border: none
Shadow: none
```

**States:**

| State | Background | Text | Cursor |
|-------|------------|------|--------|
| Default | transparent | #C8102E | pointer |
| Hover | rgba(200,16,46,0.08) | #C8102E | pointer |
| Active | rgba(200,16,46,0.15) | #A60D25 | pointer |
| Focus | rgba(200,16,46,0.05) | #C8102E with ring | pointer |
| Disabled | transparent | #6B5D52 (60% opacity) | not-allowed |

**Usage:** "Hapus", link-style action dalam card, "Skip", tertiary action

---

#### Icon Button (No text, icon only)
```
Size: 40x40px (touch target)
Icon size: 20x20px
Background: transparent
Border: none
Radius: 8px
```

**States:**

| State | Background | Icon Color | Cursor |
|-------|------------|------------|--------|
| Default | transparent | #2C1810 | pointer |
| Hover | rgba(200,16,46,0.08) | #C8102E | pointer |
| Active | rgba(200,16,46,0.15) | #C8102E | pointer |
| Focus | rgba(200,16,46,0.05) with ring | #C8102E | pointer |

**Usage:** Close modal, hamburger menu, icon actions (heart wishlist, share)

---

### Loading Spinner (Button State)

```
Size: 16x16px
Border: 2px solid
Border color: transparent transparent #FFFFFF #FFFFFF (gradient effect)
Animation: rotate 0.6s linear infinite
Position: center of button (replace text temporary)
```

**Behavior:**
- Button text hilang sementara
- Width button tetap (tidak shrink)
- Disabled state otomatis (no double-click)

---

## 2. INPUT FIELD

### Text Input (Default)

```
Height: 48px
Padding: 12px 16px
Font: Inter 400, 16px
Border: 1px solid #E8DCC8
Radius: 8px
Background: #FFFFFF
```

**States:**

| State | Border | Background | Text | Placeholder |
|-------|--------|------------|------|-------------|
| Default | 1px #E8DCC8 | #FFFFFF | #2C1810 | #6B5D52 (60% opacity) |
| Hover | 1px #C8102E (subtle) | #FFFFFF | #2C1810 | #6B5D52 |
| Focus | 2px #C8102E + ring 4px rgba(200,16,46,0.1) | #FFFFFF | #2C1810 | hidden |
| Filled | 1px #E8DCC8 | #FFFFFF | #2C1810 | hidden |
| Error | 2px #9B4D50 + ring 4px rgba(155,77,80,0.1) | #FFFFFF | #2C1810 | error text |
| Disabled | 1px #E8DCC8 | #F7F3EC | #6B5D52 (60%) | disabled |

**Label:**
```
Font: Inter 500, 14px
Color: #2C1810
Margin bottom: 8px
Required indicator: "*" in Chinese Red #C8102E
```

**Error Message:**
```
Font: Inter 400, 12px
Color: #9B4D50
Margin top: 4px
Icon: warning triangle 12x12px (optional)
```

**Helper Text (below input, optional):**
```
Font: Inter 400, 12px
Color: #6B5D52
Margin top: 4px
```

---

### Variants

#### Number Input (Qty Stepper)
```
Width: 120px
Layout: [- button] [number] [+ button]
Button size: 36x36px
Number: center, Inter 500, 16px
```

**Behavior:**
- Min: 1
- Max: 999 (atau stock limit)
- Button disabled kalau min/max reached
- Manual input allowed (numeric keyboard mobile)

---

#### Textarea
```
Min height: 120px (5 lines)
Max height: 240px (auto-resize, max 10 lines)
Padding: 12px 16px
Resize: vertical only (desktop), auto (mobile)
```

---

#### Search Input
```
Icon: search 20x20px, left padding 16px
Padding left: 48px (space untuk icon)
Clear button: X icon right side (muncul kalau ada value)
```

---

## 3. CARD PRODUK

### Regular (Grid Item)

```
Width: responsive (grid-auto-flow)
Aspect ratio gambar: 1:1
Border: 1px solid #E8DCC8
Radius: 12px
Background: #FFFFFF atau #F7F3EC (alternate)
Shadow: none (default)
Padding: 0 (gambar full-bleed top), 16px body
```

**Layout:**
```
┌─────────────────────┐
│                     │
│   GAMBAR (1:1)      │
│                     │
├─────────────────────┤
│ [Badge]             │ <- 8px from top gambar
│                     │
│ Nama Produk         │ <- Noto Serif SC 500, 18px, 2 lines max
│ (max 2 lines)       │
│                     │
│ Rp 285.000          │ <- Noto Serif SC 700, 20px, gold #D4AF37
│ Stok: 15            │ <- Inter 400, 12px, secondary text
└─────────────────────┘
```

**States:**

| State | Border | Shadow | Transform | Cursor |
|-------|--------|--------|-----------|--------|
| Default | 1px #E8DCC8 | none | none | default |
| Hover | 1px #C8102E | 0 4px 12px rgba(200,16,46,0.08) | none (NO scale) | pointer |
| Active | 1px #C8102E | 0 2px 8px rgba(200,16,46,0.12) | none | pointer |

**Badge (top-left gambar):**
```
Position: absolute, top 8px, left 8px
Background: Gold #D4AF37 (Ready Stock) atau Chinese Red #C8102E (Flash Sale)
Text: Inter 600, 12px, white
Padding: 4px 12px
Radius: 6px
```

**Image:**
- Object-fit: cover
- Border-radius: 12px top-left & top-right only (0 bottom)
- Lazy load below fold

**Nama produk:**
- Max 2 lines, ellipsis "..." kalau overflow
- Line-clamp: 2

---

### Unggulan (Featured, 2x Size)

```
Width: 2x grid column
Height: 2x grid row
Aspect ratio gambar: 1:1 (tetap, meskipun card lebih besar)
Border: 1px solid #E8DCC8
Radius: 20px (lebih besar dari regular)
Background: #FFFFFF
Shadow: 0 4px 12px rgba(200,16,46,0.08) (default, bukan hover)
Padding: 0 (gambar), 24px body (lebih besar dari regular)
```

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│      GAMBAR (1:1, besar)        │
│                                 │
│                                 │
├─────────────────────────────────┤
│ [Badge Premium]                 │
│                                 │
│ Nama Produk Unggulan            │ <- Noto Serif SC 500, 24px (lebih besar)
│ (max 2 lines)                   │
│                                 │
│ Deskripsi singkat produk ini    │ <- Inter 400, 14px, 3 lines max, NEW
│ menarik perhatian customer...   │
│                                 │
│ Rp 1.250.000                    │ <- Noto Serif SC 700, 28px, gold (lebih besar)
│ Stok: 8                         │
└─────────────────────────────────┘
```

**Difference dari regular:**
- Deskripsi included (3 lines max, Inter 400, 14px)
- Font size lebih besar (title 24px, price 28px)
- Padding lebih besar (24px vs 16px)
- Shadow default (tidak perlu hover)
- Radius lebih besar (20px vs 12px)

**States:** Same as regular tapi hover shadow lebih dalam.

---

## 4. BADGE STATUS PESANAN

6 varian sesuai status pipeline.

**Base spec:**
```
Padding: 4px 12px
Radius: 6px
Font: Inter 500, 12px
Text: UPPERCASE? NO. Sentence case. "Menunggu Pembayaran" bukan "MENUNGGU PEMBAYARAN"
```

| Status | Background | Text Color | Icon (optional) |
|--------|------------|------------|-----------------|
| MENUNGGU_PEMBAYARAN | #D4AF37 (gold) | #FFFFFF | clock 12px |
| DIPROSES_ADMIN | #C8102E (red) | #FFFFFF | gear 12px |
| DIKONSOLIDASI_KIRIM | #5B7C99 (blue-muted) | #FFFFFF | box 12px |
| TIBA_KIRIM_LOKAL | #7C9885 (jade) | #FFFFFF | truck 12px |
| SELESAI | #7C9885 (jade) | #FFFFFF | check 12px |
| DIBATALKAN | #9B4D50 (red-muted) | #FFFFFF | x 12px |

**Usage:** List pesanan, detail pesanan header, timeline node

---

## 5. NAVIGATION BAR (Desktop)

```
Height: 64px
Background: #FFFFFF atau #F7F3EC (subtle warmth)
Border bottom: 1px solid #E8DCC8
Position: sticky top 0
Z-index: 10
Padding: 0 24px
```

**Layout:**
```
┌──────────────────────────────────────────────────────┐
│ [Logo]        [Menu Items]            [Cart] [Avatar]│
│  16px gap     24px gap each           16px gap       │
└──────────────────────────────────────────────────────┘
```

**Logo:**
- Noto Serif SC 700, 24px, Chinese Red #C8102E
- Text: "Jastip China" atau logo image max height 40px

**Menu Items:**
- Font: Inter 500, 16px
- Color: #2C1810 (default), #C8102E (active/hover)
- Padding: 8px 16px
- Radius: 8px (background hover)
- Active indicator: underline 2px solid #C8102E (bottom)

**Cart Icon:**
- Size: 24x24px
- Badge: circle 18x18px, background Chinese Red, white number (Inter 600, 12px)
- Badge position: top-right (-4px, -4px offset)

**Avatar/Login:**
- Size: 36x36px circle
- Background: #F7F3EC (logged out placeholder)
- Image: user photo (logged in)
- Dropdown: 10px below avatar

---

## 6. NAVIGATION BAR (Mobile)

```
Height: 56px (lebih pendek dari desktop)
Background: #FFFFFF
Border bottom: 1px solid #E8DCC8
Position: sticky top 0
Padding: 0 16px
```

**Layout:**
```
┌──────────────────────────────────────┐
│ [☰]         [Logo Center]      [Cart]│
│ 44x44px      flexible          44x44px│
└──────────────────────────────────────┘
```

**Hamburger:**
- Icon: 3 lines, 20x20px
- Touch target: 44x44px
- Tap: slide menu dari kiri

**Menu Drawer:**
- Width: 280px
- Background: #FFFFFF
- Slide animation: 300ms ease-out
- Backdrop: rgba(0,0,0,0.4) blur 4px
- Close: X icon top-right 44x44px atau tap backdrop

---

## 7. BOTTOM NAVIGATION (Mobile Only)

```
Height: 64px
Background: #FFFFFF
Border top: 1px solid #E8DCC8
Position: fixed bottom 0
Z-index: 10
Shadow: 0 -2px 8px rgba(44,24,16,0.08)
```

**Layout (5 items):**
```
┌──────────────────────────────────────────┐
│ [Home] [Catalog] [FAB +] [Cart] [Profile]│
│  flex-1  flex-1   48px   flex-1   flex-1 │
└──────────────────────────────────────────┘
```

**Item:**
- Icon: 24x24px
- Label: Inter 400, 10px
- Padding: 8px
- Active color: Chinese Red #C8102E
- Inactive color: #6B5D52

**FAB (center):**
- Size: 56x56px circle
- Background: Chinese Red #C8102E gradient (subtle)
- Icon: + white 24x24px
- Elevation: 8px above bar (shadow medium)
- Tap: ajukan custom PO

---

## 8. STATUS PIPELINE (Timeline)

### Horizontal (Desktop)

```
┌───○───────○───────○───────○───────○───┐
│  Step1   Step2   Step3   Step4   Step5 │
└───────────────────────────────────────┘
```

**Node:**
- Size: 32x32px circle
- Border: 2px solid
- Active: filled Chinese Red #C8102E, white check icon
- Completed: filled Gold #D4AF37, white check icon
- Pending: border only #E8DCC8, background white
- Label: Inter 400, 12px, below node 8px gap

**Line:**
- Height: 2px
- Color: #E8DCC8 (pending), #C8102E (completed)
- Width: flex (auto between nodes)

---

### Vertical (Mobile)

```
○──── Step 1
│
│
○──── Step 2
│
│
○──── Step 3
```

**Node:** Same as horizontal, 24x24px (smaller)
**Line:** Vertical, left side, 2px width
**Label:** Right side, 12px gap

---

## 9. MODAL / DIALOG

```
Width: 480px desktop, 90vw mobile (max 480px)
Max height: 80vh
Background: #FFFFFF
Radius: 12px
Shadow: 0 8px 24px rgba(44,24,16,0.16)
Padding: 24px
```

**Header:**
- Title: Noto Serif SC 500, 24px
- Close button: X icon 44x44px top-right

**Body:**
- Padding: 24px 0
- Max height: calc(80vh - 120px) (scroll kalau overflow)

**Footer:**
- Padding top: 16px
- Border top: 1px solid #E8DCC8
- Buttons: right-aligned, 12px gap

**Backdrop:**
- Background: rgba(0,0,0,0.4)
- Blur: 4px
- Click: close modal (optional, confirm first kalau ada form)

---

## 10. DROPDOWN / SELECT

```
Min width: 200px
Max height: 320px (scroll kalau banyak item)
Background: #FFFFFF
Radius: 8px
Shadow: 0 4px 12px rgba(44,24,16,0.12)
Border: 1px solid #E8DCC8
```

**Trigger (button):**
- Same as Input Field spec
- Icon: chevron-down 16x16px right side
- Padding right: 40px (space untuk icon)

**Item:**
- Padding: 12px 16px
- Font: Inter 400, 16px
- Hover: background rgba(200,16,46,0.05)
- Selected: background rgba(200,16,46,0.1), check icon right
- Disabled: opacity 50%, cursor not-allowed

**Divider (optional):**
- Height: 1px, color #E8DCC8
- Usage: group separator

---

## 11. CHECKBOX

```
Size: 20x20px
Border: 2px solid #E8DCC8
Radius: 4px (rounded corner, not circle)
Background: #FFFFFF (unchecked), Chinese Red #C8102E (checked)
Check icon: white, 12x12px
```

**States:**

| State | Border | Background | Icon | Cursor |
|-------|--------|------------|------|--------|
| Unchecked | 2px #E8DCC8 | #FFFFFF | none | pointer |
| Checked | none | #C8102E | white check | pointer |
| Hover (unchecked) | 2px #C8102E | #FFFFFF | none | pointer |
| Focus | 2px #C8102E + ring | #FFFFFF | check if checked | pointer |
| Disabled | 2px #E8DCC8 | #F7F3EC | grey if checked | not-allowed |

**Label:**
- Font: Inter 400, 14px
- Color: #2C1810
- Padding left: 8px
- Clickable (expand touch target)

---

## 12. RADIO BUTTON

```
Size: 20x20px circle
Border: 2px solid #E8DCC8
Background: #FFFFFF (unselected), Chinese Red #C8102E (selected)
Inner dot: 8x8px circle white (selected state only)
```

**States:** Similar to checkbox, tapi shape circle.

**Usage:** Single selection (alamat, kurir, metode pembayaran)

---

## 13. STEPPER (Quantity)

```
Width: 120px
Height: 40px
Layout: [- button] [input] [+ button]
```

**Button (-/+):**
- Size: 40x40px
- Background: transparent
- Border: 1px solid #E8DCC8
- Icon: minus/plus 16x16px, color #2C1810
- Hover: background rgba(200,16,46,0.05)
- Disabled: opacity 50% (min/max reached)
- Radius: 8px left (minus), 8px right (plus), 0 (middle input)

**Input (number):**
- Width: 40px (center)
- Height: 40px
- Border: 1px solid #E8DCC8 (top/bottom only)
- Text: center, Inter 500, 16px
- Background: #FFFFFF
- No spinner (hide default browser spinner)

**Behavior:**
- Min: 1
- Max: stock limit atau 999
- Step: 1
- Manual input: allowed (validate on blur)
- Mobile: numeric keyboard

---

## 14. TOAST / ALERT (Notification)

```
Width: 360px desktop, 90vw mobile
Padding: 16px
Radius: 8px
Shadow: 0 4px 12px rgba(44,24,16,0.16)
Position: fixed top-right 24px, top 80px (below header)
Animation: slide-in from right 300ms ease-out
Auto-dismiss: 5 seconds (atau manual close)
```

**Variants:**

| Type | Background | Icon Color | Border Left |
|------|------------|------------|-------------|
| Success | #F0F7F3 | #7C9885 (jade) | 4px solid #7C9885 |
| Error | #FBF0F0 | #9B4D50 | 4px solid #9B4D50 |
| Warning | #FDF8ED | #D4AF37 | 4px solid #D4AF37 |
| Info | #EFF4F8 | #5B7C99 | 4px solid #5B7C99 |

**Content:**
- Icon: 20x20px left
- Title: Inter 600, 14px, color #2C1810
- Message: Inter 400, 14px, color #6B5D52
- Close button: X icon 16x16px top-right

---

## 15. LOADING SPINNER (Standalone)

```
Size: 48x48px (large), 32x32px (medium), 16x16px (small)
Border: 4px solid
Border color: transparent transparent #C8102E #C8102E (gradient)
Radius: 50% (circle)
Animation: rotate 0.8s linear infinite
```

**Usage:**
- Large: page loading (center screen)
- Medium: section loading (skeleton replacement)
- Small: button loading, inline loading

---

## 16. EMPTY STATE

```
Padding: 48px 24px
Text align: center
```

**Icon/Illustration:**
- Size: 120x120px (simple line illustration, bukan photo)
- Color: #E8DCC8 (subtle, not colorful)
- Example: empty box, empty cart icon

**Title:**
- Noto Serif SC 500, 20px
- Color: #2C1810
- Margin bottom: 8px

**Description:**
- Inter 400, 14px
- Color: #6B5D52
- Max width: 400px (center)
- Margin bottom: 24px

**CTA Button:**
- Primary button
- Example: "Lihat Katalog", "Tambah Produk"

**Examples:**
- Keranjang kosong: "Keranjang masih kosong, yuk lihat katalog"
- Notifikasi kosong: "Belum ada notifikasi"
- Riwayat kosong: "Belum ada pesanan, mulai belanja sekarang"

---

## 17. SKELETON LOADER

Gunakan saat data loading (bukan spinner generic).

**Card Produk Skeleton:**
```
┌─────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░ │ <- grey block, shimmer animation
│ ░░░░░░░░░░░░░░░░░░░ │
├─────────────────────┤
│ ░░░░░░░░ (title)    │
│ ░░░ (price)         │
└─────────────────────┘
```

**Base color:** #E8DCC8
**Shimmer:** linear gradient moving left-to-right
**Animation:** 1.5s ease-in-out infinite

**Usage:**
- Grid katalog loading
- List pesanan loading
- Detail page loading (show skeleton structure, not blank page)

---

## 18. BREADCRUMB

```
Font: Inter 400, 14px
Color: #6B5D52 (inactive), #C8102E (active)
Separator: "/" 8px gap left/right
```

**Layout:**
```
Home / Katalog / Tas / Detail Produk
```

**Behavior:**
- Clickable: all items except last (current page)
- Hover: underline + color #C8102E
- Mobile: collapse middle items → "Home / ... / Current"

**Usage:** Detail produk, checkout, admin pages

---

## COMPONENT USAGE MATRIX

| Component | Customer Pages | Admin Pages | Priority |
|-----------|----------------|-------------|----------|
| Button | ✅ All | ✅ All | HIGH |
| Input Field | ✅ Auth, Checkout, PO | ✅ Form | HIGH |
| Card Produk | ✅ Beranda, Katalog | ❌ | HIGH |
| Badge Status | ✅ Riwayat, Detail | ✅ List Pesanan | HIGH |
| Navigation Bar | ✅ All | ✅ All | HIGH |
| Bottom Nav | ✅ Mobile only | ❌ | MEDIUM |
| Status Pipeline | ✅ Detail Pesanan | ✅ Detail Pesanan | MEDIUM |
| Modal | ✅ Confirm, Image Preview | ✅ Confirm Delete | MEDIUM |
| Dropdown | ✅ Filter, Sort | ✅ Filter, Status | MEDIUM |
| Checkbox | ✅ Filter Katalog | ✅ Batch Actions | MEDIUM |
| Radio | ✅ Alamat, Kurir | ✅ Form Options | HIGH |
| Stepper | ✅ Keranjang, Checkout | ❌ | MEDIUM |
| Toast | ✅ Success/Error | ✅ Success/Error | HIGH |
| Spinner | ✅ All loading | ✅ All loading | HIGH |
| Empty State | ✅ Keranjang, Notif | ✅ List kosong | MEDIUM |
| Skeleton | ✅ Katalog loading | ✅ List loading | MEDIUM |
| Breadcrumb | ✅ Detail Produk | ✅ Admin pages | LOW |

---

## VERIFICATION CHECKLIST

Before implementing component:

- [ ] All 6+ states defined (default, hover, active, focus, disabled, error/loading)
- [ ] Touch target min 44x44px (mobile)
- [ ] Focus ring visible (keyboard accessibility)
- [ ] Color contrast WCAG AA minimum
- [ ] Font size min 14px (readability)
- [ ] Spacing multiple of 4px
- [ ] Radius consistent dengan hierarchy
- [ ] No AI slop patterns (→ arrows, ALL-CAPS, etc)
- [ ] Realistic example content (bukan "Lorem")
- [ ] Mobile responsive behavior documented
