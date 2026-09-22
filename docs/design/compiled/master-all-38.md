---
title: "MASTER DESIGN SPEC: JASTIP CHINA"
tags: [compiled, pen-dev, arsip]
tanggal: 2026-09-21
---
# MASTER DESIGN SPEC: JASTIP CHINA

Complete design specification for pen.dev.
Includes foundation + all 31 screens (20 customer + 11 admin), compiled from 41 design files.

PROCESSING INSTRUCTIONS FOR PEN.DEV:

1. Read Batch 1 Foundation first.
2. Lock visual system from Batch 1:
   - colors
   - typography
   - spacing
   - radius
   - shadows
   - components
   - states
   - responsive rules
3. Generate all customer and admin screens using the same locked design system.
4. Do not create separate styles per batch.
5. Indonesian is primary language.
6. No dark mode.
7. No gradients.
8. No all-caps labels.
9. No arrow symbols in buttons.
10. No middle-dot separators.
11. No generic SaaS landing page.
12. No scroll-triggered animation except product-detail transition.
13. Customer pages: warm, premium, approachable e-commerce.
14. Admin pages: clean, efficient, professional, same design system.
15. Varian chips are FLAT (1 combination = 1 choice). Never 2D matrix.
16. Cara Order is the only page allowed sequential numbers as functional content.

Recommended pen.dev settings if required:
- Parallel agents: 1
- Iterations: 1
- Mode: default or side by side
- Iteration mode: style first, then layout if available

If context is too large, process by batch files instead.

---


============================================================
# INCLUDED FILE: batch-1-foundation.md
============================================================

# BATCH 1: FOUNDATION

Gabungan 10 file foundation untuk pen.dev

---



========================================
# FILE: accessibility.md
========================================

# Accessibility - Jastip China

WCAG 2.1 Level AA compliance minimum. Focus on keyboard navigation, screen reader support, dan color contrast.

---

## 1. COLOR CONTRAST

### WCAG AA Requirements

| Element | Contrast Ratio | Status |
|---------|----------------|--------|
| Body text (#2C1810 on #FAF8F3) | 9.8:1 | âœ… AAA |
| Secondary text (#6B5D52 on #FAF8F3) | 5.6:1 | âœ… AA |
| Button text (#FFFFFF on #C8102E) | 5.7:1 | âœ… AA |
| Link (#C8102E on #FAF8F3) | 5.7:1 | âœ… AA |
| Price (#D4AF37 on #FFFFFF) | 2.8:1 | âŒ FAIL for text, OK for large text (28px+) |

### Price Color Fix

Price text `#D4AF37` (gold) on white only passes for large text (3:1 for 24px+ regular atau 18px+ bold).

**Solution:**
- Price display: Noto Serif SC 700, minimum 20px â†’ passes large text requirement
- Small price (cart item, order summary): use `#B5941F` (darker gold) instead â†’ 4.5:1 AA pass
- Price in table/list: use `#B5941F` (darker gold) for AA compliance

**Updated:**
```
Price Large (display): #D4AF37 (only for 20px+ bold)
Price Small (inline, table): #B5941F (darker, AA compliant)
```

---

## 2. FOCUS INDICATORS

### Standard Focus Ring

```
Outline: 2px solid #C8102E
Box-shadow: 0 0 0 4px rgba(200,16,46,0.1)
Offset: 2px from element
```

**Elements requiring focus ring:**
- Button (all variants)
- Input field (text, textarea, number, search)
- Select/Dropdown trigger
- Checkbox
- Radio button
- Link (text dan image links)
- Tab item
- Menu item (navigation, dropdown)
- Close button (modal, toast)
- Stepper button (+/-)

**Implementation:**
```css
*:focus-visible {
  outline: 2px solid #C8102E;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(200,16,46,0.1);
}
*:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}
```

---

## 3. KEYBOARD NAVIGATION

### Tab Order

Logical reading order: top-to-bottom, left-to-right.

**Skip to Content Link:**
```html
<a href="#main-content" class="skip-link">Lewati ke konten</a>
```
- Hidden by default (off-screen)
- Visible on focus (top-left, z-index 100)
- Style: Chinese Red background, white text

### Key Bindings

| Key | Action |
|-----|--------|
| Tab | Move to next interactive element |
| Shift+Tab | Move to previous interactive element |
| Enter | Activate button/link |
| Space | Toggle checkbox, activate button |
| Escape | Close modal, dropdown, drawer |
| Arrow Up/Down | Navigate dropdown, radio group |
| Arrow Left/Right | Navigate tabs, image gallery |
| Home/End | First/last item in list |

### Modal Keyboard Trap

When modal open:
- Tab cycles within modal only (trap focus)
- Escape key closes modal
- Focus moves to modal on open
- Focus returns to trigger button on close

---

## 4. SCREEN READER LABELS

### Images

```html
<!-- Product image -->
<img src="tas-backpack.jpg" alt="Tas Backpack Premium - Warna Hitam" />

<!-- Decorative icon (no meaning) -->
<img src="divider.png" alt="" role="presentation" />

<!-- Icon button -->
<button aria-label="Tambah ke keranjang">
  <svg>...</svg>
</button>
```

**Rules:**
- Product image: descriptive alt (nama produk + varian)
- Decorative: empty alt `alt=""`
- Icon-only button: `aria-label`
- Complex image: `aria-describedby` linking to detailed description

### Form Labels

```html
<label for="noWa">Nomor WhatsApp</label>
<input id="noWa" type="tel" aria-required="true" aria-describedby="noWa-error" />
<span id="noWa-error" role="alert">Nomor WhatsApp tidak valid</span>
```

**Rules:**
- Every input has associated `<label>`
- Required fields: `aria-required="true"`
- Error messages: `role="alert"` (announced on update)
- Helper text: `aria-describedby`

### Dynamic Content

```html
<!-- Live region for toast/status -->
<div role="status" aria-live="polite">
  <!-- Toast content injected here -->
</div>

<!-- Alert for errors -->
<div role="alert" aria-live="assertive">
  <!-- Error content injected here -->
</div>
```

### Page Structure

```html
<header role="banner">...</header>
<nav role="navigation" aria-label="Navigasi utama">...</nav>
<main id="main-content" role="main">...</main>
<aside role="complementary" aria-label="Filter katalog">...</aside>
<footer role="contentinfo">...</footer>
```

---

## 5. TOUCH TARGETS

### Minimum Sizes

| Element | Min Size | Notes |
|---------|----------|-------|
| Button | 48x48px | Height minimum |
| Icon button | 44x44px | Touch target area |
| Checkbox/Radio | 44x44px | Including label clickable area |
| Link | 44x44px | If image link, the image area |
| Stepper button | 44x44px | Plus/minus button |
| Tab item | 44px height | Full width on mobile |
| Close button | 44x44px | Modal, toast |

**Spacing between touch targets:** minimum 8px (prevent mis-tap).

---

## 6. FORM ACCESSIBILITY

### Error Identification

```html
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert" class="error-text">
  Email tidak valid
</span>
```

**Rules:**
- `aria-invalid="true"` when field has error
- `aria-describedby` pointing to error message element
- Error message: `role="alert"` (screen reader announces immediately)
- Error clear: `aria-invalid` removed when user starts correcting

### Required Fields

- Label includes `*` (visual indicator, Chinese Red)
- `aria-required="true"` (programmatic indicator)
- Error message if empty on submit

---

## 7. ARIA PATTERNS

### Dropdown/Select

```html
<button
  aria-haspopup="listbox"
  aria-expanded="false"
  aria-controls="dropdown-list"
>
  Pilih Kategori
</button>
<ul id="dropdown-list" role="listbox" aria-labelledby="dropdown-label">
  <li role="option" aria-selected="true">Tas</li>
  <li role="option" aria-selected="false">Sepatu</li>
</ul>
```

### Modal

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Konfirmasi Hapus</h2>
  ...
</div>
```

### Tabs

```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Info Akun</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">Alamat</button>
</div>
<div role="tabpanel" id="panel-1">...</div>
<div role="tabpanel" id="panel-2" hidden>...</div>
```

### Toast/Alert

```html
<div role="status" aria-live="polite" aria-atomic="true">
  <!-- Toast content -->
</div>
```

---

## 8. RESPONSIVE ACCESSIBILITY

### Zoom Support

- Support 200% zoom (text scaling) without horizontal scroll
- Support 300% zoom on mobile (reflow content)
- No `font-size: 12px` for critical text (use 14px minimum)

### Mobile Screen Reader

- VoiceOver (iOS) and TalkBack (Android) compatible
- Touch targets meet 44x44px minimum
- No off-screen content that screen reader can access

---

## 9. ACCESSIBILITY CHECKLIST

### Per Page

- [ ] Skip to content link present
- [ ] Page has single `<main>` with `id="main-content"`
- [ ] Heading hierarchy logical (H1 â†’ H2 â†’ H3, no skipped levels)
- [ ] All images have appropriate alt text
- [ ] All forms have labels associated
- [ ] Error messages announced (role="alert")
- [ ] Keyboard navigation works (Tab order logical)
- [ ] No keyboard trap (except modal)
- [ ] Focus visible on all interactive elements
- [ ] Touch targets meet minimum size

### Per Component

- [ ] Focusable: `tabindex="0"` or native element
- [ ] Focus indicator visible (2px solid #C8102E)
- [ ] ARIA roles correct (button, link, dialog, etc.)
- [ ] Screen reader announces state changes (aria-live)
- [ ] Color contrast WCAG AA minimum
- [ ] No color-only indicator (add icon/text)



========================================
# FILE: anti-patterns.md
========================================

# Anti-Patterns & Chinese Elements - Jastip China

Dua panduan: apa yang HARUS dihindari (AI slop) + bagaimana Chinese aesthetic dipakai benar.

---

## PART 1: ANTI-PATTERNS (YANG HARUS DIHINDARI)

### 1. Label ALL-CAPS di Atas Judul

**âŒ AI Slop:**
```
OUR PRODUCTS
Produk Kami
```

**âœ… Correct:**
```
Produk Kami
```
Atau langsung produk tanpa section header kalau context clear.

---

### 2. Teks Meta dengan Titik Tengah (Â·)

**âŒ AI Slop:**
```
Tas Â· Sepatu Â· Aksesoris
```
```
15 Jan 2024 Â· 14:30 WIB Â· Bandung
```

**âœ… Correct:**
```
Tas, Sepatu, Aksesoris
```
```
15 Jan 2024, 14:30 WIB, Bandung
```
Pakai koma atau spasi-dash.

---

### 3. Tombol Diakhiri "â†’"

**âŒ AI Slop:**
```
[ Lihat Selengkapnya â†’ ]
[ Mulai Belanja â†’ ]
[ Checkout â†’ ]
```

**âœ… Correct:**
```
[ Lihat Selengkapnya ]
[ Mulai Belanja ]
[ Checkout ]
```
Tidak ada arrowè£…é¥°.

---

### 4. Angka 01/02/03 Dekorasi (Non-Process)

**âŒ AI Slop:**
```
01  Kualitas Premium
02  Harga Bersahabat
03  Pengiriman Cepat
```

**âœ… Correct:**
```
Kualitas Premium
Harga Bersahabat
Pengiriman Cepat
```

**Exception:** Halaman "Cara Order" (proses berurutan) BOLEH pakai angka:
```
1. Pilih produk
2. Checkout dan bayar
3. Tunggu verifikasi
4. Terima barang
```

---

### 5. Grid Produk Seragam Semua Ukuran Sama

**âŒ AI Slop:**
```
â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”
â”‚  â”‚ â”‚  â”‚ â”‚  â”‚ â”‚  â”‚
â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜
â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”
â”‚  â”‚ â”‚  â”‚ â”‚  â”‚ â”‚  â”‚
â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜
```
Semua card sama ukuran, monoton, generik.

**âœ… Correct:**
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”
â”‚        â”‚ â”‚  â”‚ â”‚  â”‚
â”‚ UNGG.  â”‚ â””â”€â”€â”˜ â””â”€â”€â”˜
â”‚ (2x2)  â”‚ â”Œâ”€â”€â” â”Œâ”€â”€â”
â”‚        â”‚ â”‚  â”‚ â”‚  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜
```
Unggulan lebih besar, variasi ukuran.

---

### 6. Shadow Default di Setiap Card

**âŒ AI Slop:**
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Card 1 â”‚ <- shadow
â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Card 2 â”‚ <- shadow
â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```
Shadow generik abu-abu di setiap card, semua sama.

**âœ… Correct:**
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Card 1 â”‚ <- border tipis, no shadow
â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Card 2 â”‚ <- border tipis, no shadow
â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```
Border tipis sebagai pemisah, shadow hanya saat hover.

---

### 7. Satu Border Radius Sama untuk Semua

**âŒ AI Slop:**
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Card      â”‚  <- radius 12px
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Button   â”‚  <- radius 12px (sama!)
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**âœ… Correct:**
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Card Unggulanâ”‚  <- radius 20px
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Card Reg â”‚  <- radius 12px
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Button â”‚  <- radius 8px
â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```
Bervariasi sesuai hierarki.

---

### 8. Animasi Fade-in/Slide-up di Setiap Section Scroll

**âŒ AI Slop:**
- IntersectionObserver + AOS library
- Setiap section fade-in saat scroll
- Card grid stagger animation

**âœ… Correct:**
- Hanya 1 momen "berani": transisi buka detail produk
- Sisanya diam, instant, clean

---

### 9. Gradient Hero Dekoratif

**âŒ AI Slop:**
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [gradient background: blue to purple] â”‚
â”‚                                       â”‚
â”‚        BELANJA PRODUK CHINA           â”‚
â”‚   [hero text with gradient]           â”‚
â”‚                                       â”‚
â”‚        [Mulai Belanja â†’]              â”‚
â”‚                                       â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**âœ… Correct:**
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ (plain background #FAF8F3)           â”‚
â”‚                                       â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”          â”‚
â”‚ â”‚Unggulanâ”‚ â”‚  â”‚ â”‚  â”‚ â”‚  â”‚          â”‚
â”‚ â”‚  (2x2) â”‚ â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜          â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜                           â”‚
â”‚ (grid produk langsung, no hero)     â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

### 10. Font Inter/Poppins/Playfair Generik

**âŒ AI Slop:**
- Inter for everything (default AI)
- Poppins (default AI)
- Playfair Display (default AI)

**âœ… Correct:**
- Noto Serif SC (heading) â€” Chinese aesthetic
- Inter (body) â€” readability (bukan untuk heading)

---

### 11. Tombol dengan Icon Decorative

**âŒ AI Slop:**
```
[â†’ Checkout]
[âœ¨ Premium]
[ðŸ”¥ Hot Item]
[ðŸš€ Fast Shipping]
```

**âœ… Correct:**
```
[Checkout]
Premium (badge)
Hot Item (badge)
Fast Shipping (text)
```
No decorative icons in button text.

---

### 12. Counter Animation pada Angka

**âŒ AI Slop:**
- "1,234" animasi count-up saat scroll
- "Rp 10.000.000" counter from 0

**âœ… Correct:**
- Static number
- If needed, show "updated 2 jam lalu"

---

### 13. "Trusted by" Logo Strip

**âŒ AI Slop:**
```
TRUSTED BY:
[logo1] [logo2] [logo3] [logo4] [logo5]
```

**âœ… Correct:**
- Testimonial real (1-2, with photo + nama + kota)
- Atau statistik real "500+ pesanan selesai"

---

### 14. Feature Cards with Icons

**âŒ AI Slop:**
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [icon]   â”‚ â”‚ [icon]   â”‚ â”‚ [icon]   â”‚
â”‚ Cepat    â”‚ â”‚ Aman     â”‚ â”‚ Murah    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**âœ… Correct:**
- Beranda langsung produk
- "Cara Order" pakai numbered steps (1, 2, 3) dengan deskripsi
- No icon-grid feature cards

---

### 15. Typewriter/Text Reveal Effect

**âŒ AI Slop:**
- Heading muncul huruf demi huruf
- "Loading..." text typewriter

**âœ… Correct:**
- Static text
- Loading: spinner or skeleton

---

## PART 2: CHINESE ELEMENTS (ESTETIKA BENAR)

### 1. Color Symbolism (Pakai dengan Benar)

**Chinese Red #C8102E:**
- Simbol: prosperity, luck, joy (tradisional)
- Pakai: logo, CTA, active state
- Jangan: background besar (overwhelming)

**Gold #D4AF37:**
- Simbol: wealth, luxury, prosperity
- Pakai: price, premium badge, accent line
- Jangan: body text (low contrast)

**Jade #7C9885:**
- Simbol: protection, harmony
- Pakai: success state, verification badge
- Jangan: error state

---

### 2. Decorative Patterns (Bilamana Tepat)

**Cloud Pattern (ç¥¥äº‘):**
- Simbol: good fortune, heaven
- Pakai: divider section (halus, subtle)
- Jangan: card background (busy)

**Wave Pattern (æµ·æµª):**
- Simbol: continuous flow, longevity
- Pakai: footer border (subtle)
- Jangan: button background

**Geometric (å›žçº¹):**
- Simbol: prosperity, continuity
- Pakai: border decorative (tipis, monolinear)
- Jangan: full background

**IMPLEMENTATION:**
```
Pattern pakai sebagai:
1. SVG background (inline, scalable)
2. Subtle opacity (5-10%)
3. Monolinear (1px stroke)
4. Color: #C8102E atau #D4AF37 (very low opacity)
```

---

### 3. Icon Style

**Line-based, minimal, angular:**
```
âœ… Correct:
  [Simple line icon, 1px stroke, no fill]
  - Shopping bag: outline only
  - User: simple circle + body shape
  - Search: magnifying glass, thin line

âŒ AI Slop:
  [Filled icon, rounded, colorful]
  - 3D shopping cart
  - Emoji as icon
  - Multi-color filled icon
```

**Chinese-inspired icons (optional):**
- Coin (å…ƒå®): for price-related
- Knot (ä¸­å›½ç»“): for connection/link
- Lotus (èŽ²èŠ±): for purity/premium

**Usage:** HANYA kalau fit naturally dengan UI. Jangan pakai Chinese icon kalau generik icon lebih jelas.

---

### 4. Border Style

**Straight, angular, clean:**
``
âœ… Correct:
  - 1px solid border, sharp corners on containers
  - 0px radius for section backgrounds
  - Varied radius for cards (12px, 20px) â€” premium feel

âŒ AI Slop:
  - All rounded-xl (12px+) for everything
  - Circle borders everywhere
  - Decorative scalloped edges
```

---

### 5. Typography as Chinese Element

**Noto Serif SC (heading):**
- Chinese serif font, elegant
- Bawa Chinese vibe TANPA pakai motif/pattern berlebihan
- Ini cara paling subtle + effective untuk Chinese aesthetic

**Ma Shan Zheng (brush script):**
- HANYA untuk 1-2 decorative element
- Contoh: tagline di beranda "é²œè´§ç›´è¾¾" (Fresh goods direct)
- Size: minimal 24px (readable)
- Color: #C8102E atau #D4AF37
- Jangan: body text, button text, form label

---

### 6. When to Use Chinese Elements

**DO:**
- Beranda: 1 brush script tagline (Ma Shan Zheng)
- Footer: subtle cloud/wave pattern border (5% opacity)
- Logo: Chinese Red color
- Premium badge: Gold background
- Section divider: thin geometric pattern (optional)

**DON'T:**
- Setiap halaman pakai brush script
- Card background pakai pattern (busy)
- Button pakai Chinese pattern (tacky)
- Border semua pakai decorative pattern (overwhelming)
- Icon semua pakai Chinese motif (confusing)

---

### 7. Chinese Aesthetic in Practice

**Beranda Example:**
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Logo: Jastip China (red text)]   [Menu] [Cart] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                   â”‚
â”‚  é²œè´§ç›´è¾¾                          â†â”€â”€ brush script, 1 element
â”‚  Barang China, sampai pintu rumah               â†â”€â”€ tagline, Inter 400
â”‚                                                   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”                          â”‚
â”‚  â”‚Unggulanâ”‚ â”‚  â”‚ â”‚  â”‚                          â”‚
â”‚  â”‚ (2x2)  â”‚ â””â”€â”€â”˜ â””â”€â”€â”˜                          â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜                                     â”‚
â”‚                                                   â”‚
â”‚  [footer border: subtle cloud pattern]           â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Result:**
- Chinese Red logo = brand identity
- Brush script tagline = Chinese character (subtle)
- Grid produk = e-commerce focus (bukan marketing fluff)
- Cloud pattern border = decorative accent (minimal)

---

## VERIFICATION CHECKLIST

### Anti-Patterns Avoided
- [ ] NO all-caps labels above headings
- [ ] NO middle dots (Â·) in meta text
- [ ] NO arrows (â†’) in buttons
- [ ] NO decorative numbers (01/02/03) on non-process content
- [ ] NO uniform grid (unggulan + regular mix)
- [ ] NO shadow on every card (border-based)
- [ ] NO single border radius for all
- [ ] NO scroll-triggered animations on every section
- [ ] NO gradient hero
- [ ] NO Inter/Poppins/Playfair for headings
- [ ] NO decorative icons in button text
- [ ] NO counter animations
- [ ] NO "trusted by" logo strip
- [ ] NO feature cards with icons (SaaS pattern)
- [ ] NO typewriter/text reveal effects

### Chinese Elements Applied Correctly
- [ ] Chinese Red for brand/CTA
- [ ] Gold for price only
- [ ] Jade for success states
- [ ] Noto Serif SC for headings (primary Chinese element)
- [ ] Ma Shan Zheng for 1-2 decorative elements only
- [ ] Cloud/wave pattern as subtle border (optional, 5% opacity)
- [ ] Line-based minimal icons
- [ ] Angular borders, varied radius
- [ ] E-commerce focus (grid produk), not SaaS marketing



========================================
# FILE: chinese-elements.md
========================================

# Chinese Elements Guide - Jastip China

Panduan spesifik penggunaan elemen estetika China secara benar dan tidak berlebihan.

---

## 1. WARNA SIMBOLIK

### Chinese Red (#C8102E)
- **Simbol:** Prosperity, luck, joy, celebration
- **Pakai untuk:**
  - Logo text dan brand identity
  - Tombol primer (CTA)
  - Link aktif/navigasi aktif
  - Badge "Flash Sale" atau "Baru"
  - Border accent pada card hover
- **JANGAN pakai untuk:**
  - Background area besar (overwhelming)
  - Body text (low contrast on light bg)
  - Error state (pakai red-muted #9B4D50)

### Gold (#D4AF37)
- **Simbol:** Wealth, luxury, prosperity
- **Pakai untuk:**
  - Harga produk (display besar)
  - Badge "Ready Stock" atau "Premium"
  - Divider line decorative (tipis, subtle)
  - Icon accent kecil
- **JANGAN pakai untuk:**
  - Body text (low contrast)
  - Background button (flashy)
  - Large area (tacky)

### Jade (#7C9885)
- **Simbol:** Protection, harmony, purity
- **Pakai untuk:**
  - Success state (pembayaran terverifikasi)
  - Badge "Selesai"
  - Check icon
- **JANGAN pakai untuk:**
  - Error state
  - Warning

---

## 2. POLA DEKORATIF

### Cloud Pattern (ç¥¥äº‘ - Xiangyun)
- **Simbol:** Good fortune, heavenly blessing
- **Pakai untuk:**
  - Footer border (subtle, 5% opacity)
  - Section divider (optional, tipis)
- **JANGAN pakai untuk:**
  - Card background
  - Button background
  - Large visible area

**Implementation:**
```svg
<svg width="100%" height="20" opacity="0.05">
  <pattern id="cloud" width="40" height="20" patternUnits="userSpaceOnUse">
    <path d="M0,10 Q10,0 20,10 T40,10" fill="none" stroke="#C8102E" stroke-width="1"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#cloud)"/>
</svg>
```

### Wave Pattern (æµ·æµª - Hailang)
- **Simbol:** Continuous flow, longevity
- **Pakai untuk:**
  - Footer top border (alternative to cloud)
- **JANGAN pakai untuk:**
  - Hero background
  - Card decoration

### Geometric Key Pattern (å›žçº¹ - Huiwen)
- **Simbol:** Prosperity, continuity, eternity
- **Pakai untuk:**
  - Border decorative (tipis, monolinear)
  - Corner accent (optional, pada premium card)
- **JANGAN pakai untuk:**
  - Full background
  - Busy decoration

---

## 3. TIPOGRAFI SEBAGAI CHINESE ELEMENT

### Noto Serif SC (Heading)
- **Karakter:** Chinese serif, elegant, strong personality
- **Peran:** Chinese aesthetic UTAMA â€” tidak perlu pattern/motif berlebihan
- **Pakai untuk:** H1, H2, H3, price display, logo

### Ma Shan Zheng (Brush Script, Decorative)
- **Karakter:** Chinese brush calligraphy, artistic
- **Peran:** Decorative accent, BUKAN body
- **Pakai untuk:** HANYA 1-2 element per halaman

**Contoh penggunaan:**
```
Beranda:
  - Tagline: "é²œè´§ç›´è¾¾" (Fresh goods direct) â€” Ma Shan Zheng, 32px, #C8102E
  - Tagline EN: "Barang China, sampai pintu rumah" â€” Inter 400, 14px, #6B5D52
```

**JANGAN:**
- Pakai untuk body text
- Pakai untuk button label
- Pakai untuk form label
- Pakai di setiap halaman (overuse â†’ AI slop)

---

## 4. IKON GRAFIK

### Style: Line-based, Minimal, Angular

**Prinsip:**
- 1px stroke, no fill
- Angular shapes (bukan rounded soft)
- Simple, recognizable
- Size: 20x20px (UI), 24x24px (nav), 16x16px (inline)

**Contoh:**
```
âœ… Correct (line, angular):
  - Shopping bag: rectangle + handle lines
  - User: circle + trapezoid body
  - Search: circle + diagonal line
  - Cart: trapezoid + wheels

âŒ AI Slop (filled, rounded, colorful):
  - 3D shopping cart
  - Emoji as icon
  - Multi-color filled icon
  - Gradient icon
```

### Chinese-Inspired Icons (Optional)

HANYA kalau fit naturally dengan context UI:

| Icon | Chinese Name | Usage |
|------|--------------|-------|
| å…ƒå® (Gold Ingot) | Yuan bao | Price-related, premium badge |
| ä¸­å›½ç»“ (Chinese Knot) | Zhong guo jie | Connection, link, partnership |
| èŽ²èŠ± (Lotus) | Lian hua | Purity, premium product |
| å¦‚æ„ (Ruyi) | Ru yi | Wishing, prosperity |

**Rule:** Kalau generik icon lebih jelas, pakai generik. Jangan paksa Chinese icon kalau confusing.

---

## 5. BORDER & RADIUS

### Border Style: Straight, Angular

**âœ… Correct:**
- 1px solid border, sharp definition
- 0px radius untuk section background (modern, clean block)
- Varied radius untuk card (12px regular, 20px unggulan) â€” premium feel
- Varied radius untuk badge/button (6px, 8px) â€” hierarchy

**âŒ AI Slop:**
- All rounded-xl (12px+) for everything
- Circle borders everywhere
- Decorative scalloped edges
- All same radius (monotonous)

---

## 6. KAPAN PAKAI CHINESE ELEMENTS

### Beranda (DO)
- Logo: Chinese Red text
- Tagline: Ma Shan Zheng brush script (1 element)
- Grid produk: focus e-commerce (bukan decorative)
- Footer border: cloud/wave pattern (5% opacity, subtle)

### Katalog (DO)
- Filter sidebar: clean, no decoration
- Grid: border-based cards, no Chinese pattern
- Focus on product display

### Detail Produk (DO)
- Heading: Noto Serif SC (Chinese vibe via typography)
- Price: Gold color (prosperity)
- Gallery: clean, no decorative frame
- Related products: subtle border

### Auth Pages (DO)
- Logo: Chinese Red
- Form: clean, minimal
- No decorative patterns (keep it simple)

### Admin (DO)
- Sidebar: ink dark (#2C1810, ink brush)
- Logo: Chinese Red accent
- No decorative patterns (operational focus)
- Clean, efficient, professional

---

## 7. KAPAN JANGAN PAKAI CHINESE ELEMENTS

### Card Background (DON'T)
- Jangan pakai pattern (cloud/wave) sebagai card background
- Card harus clean (white/cream, border tipis)
- Pattern hanya di footer border atau section divider (subtle)

### Button (DON'T)
- Jangan pakai Chinese pattern di button
- Button: solid color, clean, clear
- No decorative border

### Form Input (DON'T)
- No Chinese pattern di input field
- Input: border tipis, focus ring, clean

### Large Background Area (DON'T)
- Jangan pakai Chinese pattern sebagai full-page background
- Overwhelming, busy, distract from content
- Pattern hanya di border/divider (very subtle)

---

## 8. CONTOH IMPLEMENTASI

### Beranda (Ideal)
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda Katalog ...   [Cart]   â”‚
â”‚                    (red text)                     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                   â”‚
â”‚  é²œè´§ç›´è¾¾                   (brush, 32px, red)  â”‚
â”‚  Barang China, sampai pintu rumah                â”‚
â”‚                                                   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”                           â”‚
â”‚  â”‚Unggulanâ”‚ â”‚  â”‚ â”‚  â”‚  (border, no shadow)     â”‚
â”‚  â”‚ 2x2    â”‚ â””â”€â”€â”˜ â””â”€â”€â”˜                           â”‚
â”‚  â”‚ Rp 282kâ”‚                                       â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜                                       â”‚
â”‚                                                   â”‚
â”‚  â”€â”€â”€â”€ cloud pattern border (5% opacity) â”€â”€â”€â”€   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Result:**
- âœ… Chinese Red logo = brand
- âœ… Brush script = 1 Chinese character element
- âœ… Grid produk = e-commerce focus
- âœ… Cloud pattern = subtle decorative (border only)
- âœ… Tidak overwhelming, tidak AI slop

### Footer (Ideal)
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ (ink dark background #2C1810)                    â”‚
â”‚                                                   â”‚
â”‚ â”€â”€â”€â”€ cloud pattern (5% opacity, #D4AF37) â”€â”€â”€â”€  â”‚
â”‚                                                   â”‚
â”‚ [Logo red]   Navigasi   Bantuan   Kontak        â”‚
â”‚ Tagline      Links      Links      WA          â”‚
â”‚                                                   â”‚
â”‚ Â© 2024 Jastip China                              â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Result:**
- âœ… Cloud pattern = subtle top border
- âœ… Gold opacity 5% = prosperity accent
- âœ… Dark background = premium feel
- âœ… Not busy, not overwhelming

---

## VERIFICATION CHECKLIST

### Chinese Elements Applied
- [ ] Chinese Red for brand identity (logo, CTA)
- [ ] Gold for price and premium badges
- [ ] Jade for success states
- [ ] Noto Serif SC for all headings
- [ ] Ma Shan Zheng for 1-2 decorative elements only
- [ ] Cloud/wave pattern as subtle border (5% opacity)
- [ ] Line-based minimal icons (no filled/3D)
- [ ] Angular borders, varied radius
- [ ] E-commerce focus (grid produk), not marketing

### Chinese Elements NOT Overused
- [ ] No pattern on card backgrounds
- [ ] No pattern on buttons
- [ ] No pattern on input fields
- [ ] No pattern on full-page background
- [ ] No brush script on body text
- [ ] No brush script on multiple pages
- [ ] No Chinese icons if generic is clearer
- [ ] No overwhelming decorations



========================================
# FILE: components.md
========================================

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

**ANTI-PATTERN:** JANGAN tambah "â†’" di akhir text button.

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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                     â”‚
â”‚   GAMBAR (1:1)      â”‚
â”‚                     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Badge]             â”‚ <- 8px from top gambar
â”‚                     â”‚
â”‚ Nama Produk         â”‚ <- Noto Serif SC 500, 18px, 2 lines max
â”‚ (max 2 lines)       â”‚
â”‚                     â”‚
â”‚ Rp 285.000          â”‚ <- Noto Serif SC 700, 20px, gold #D4AF37
â”‚ Stok: 15            â”‚ <- Inter 400, 12px, secondary text
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                                 â”‚
â”‚                                 â”‚
â”‚      GAMBAR (1:1, besar)        â”‚
â”‚                                 â”‚
â”‚                                 â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Badge Premium]                 â”‚
â”‚                                 â”‚
â”‚ Nama Produk Unggulan            â”‚ <- Noto Serif SC 500, 24px (lebih besar)
â”‚ (max 2 lines)                   â”‚
â”‚                                 â”‚
â”‚ Deskripsi singkat produk ini    â”‚ <- Inter 400, 14px, 3 lines max, NEW
â”‚ menarik perhatian customer...   â”‚
â”‚                                 â”‚
â”‚ Rp 1.250.000                    â”‚ <- Noto Serif SC 700, 28px, gold (lebih besar)
â”‚ Stok: 8                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Logo]        [Menu Items]            [Cart] [Avatar]â”‚
â”‚  16px gap     24px gap each           16px gap       â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]         [Logo Center]      [Cart]â”‚
â”‚ 44x44px      flexible          44x44pxâ”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Home] [Catalog] [FAB +] [Cart] [Profile]â”‚
â”‚  flex-1  flex-1   48px   flex-1   flex-1 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
â”Œâ”€â”€â”€â—‹â”€â”€â”€â”€â”€â”€â”€â—‹â”€â”€â”€â”€â”€â”€â”€â—‹â”€â”€â”€â”€â”€â”€â”€â—‹â”€â”€â”€â”€â”€â”€â”€â—‹â”€â”€â”€â”
â”‚  Step1   Step2   Step3   Step4   Step5 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
â—‹â”€â”€â”€â”€ Step 1
â”‚
â”‚
â—‹â”€â”€â”€â”€ Step 2
â”‚
â”‚
â—‹â”€â”€â”€â”€ Step 3
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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘ â”‚ <- grey block, shimmer animation
â”‚ â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘ â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ â–‘â–‘â–‘â–‘â–‘â–‘â–‘â–‘ (title)    â”‚
â”‚ â–‘â–‘â–‘ (price)         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
- Mobile: collapse middle items â†’ "Home / ... / Current"

**Usage:** Detail produk, checkout, admin pages

---

## COMPONENT USAGE MATRIX

| Component | Customer Pages | Admin Pages | Priority |
|-----------|----------------|-------------|----------|
| Button | âœ… All | âœ… All | HIGH |
| Input Field | âœ… Auth, Checkout, PO | âœ… Form | HIGH |
| Card Produk | âœ… Beranda, Katalog | âŒ | HIGH |
| Badge Status | âœ… Riwayat, Detail | âœ… List Pesanan | HIGH |
| Navigation Bar | âœ… All | âœ… All | HIGH |
| Bottom Nav | âœ… Mobile only | âŒ | MEDIUM |
| Status Pipeline | âœ… Detail Pesanan | âœ… Detail Pesanan | MEDIUM |
| Modal | âœ… Confirm, Image Preview | âœ… Confirm Delete | MEDIUM |
| Dropdown | âœ… Filter, Sort | âœ… Filter, Status | MEDIUM |
| Checkbox | âœ… Filter Katalog | âœ… Batch Actions | MEDIUM |
| Radio | âœ… Alamat, Kurir | âœ… Form Options | HIGH |
| Stepper | âœ… Keranjang, Checkout | âŒ | MEDIUM |
| Toast | âœ… Success/Error | âœ… Success/Error | HIGH |
| Spinner | âœ… All loading | âœ… All loading | HIGH |
| Empty State | âœ… Keranjang, Notif | âœ… List kosong | MEDIUM |
| Skeleton | âœ… Katalog loading | âœ… List loading | MEDIUM |
| Breadcrumb | âœ… Detail Produk | âœ… Admin pages | LOW |

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
- [ ] No AI slop patterns (â†’ arrows, ALL-CAPS, etc)
- [ ] Realistic example content (bukan "Lorem")
- [ ] Mobile responsive behavior documented



========================================
# FILE: copy.md
========================================

# Copy & Content Strategy - Jastip China

Tone of voice, button labels, error messages, empty states, dan semua teks UI.

---

## 1. TONE OF VOICE

### Character
**Hangat, approachable, jujur, tau-medan.**

- Bahasa Indonesia sehari-hari (tidak kaku, tidak formal berlebihan)
- Tidak pakai "Anda" (terlalu formal) â†’ pakai "Kamu" (approachable) atau "Mau" (direct)
- Tidak pakai "Mohon" (terlalu servile) â†’ pakai "Yuk" atau "Silakan"
- Singkat, padat, tidak bertele-tele
- Honest tentang proses (realistis, tidak over-promise)

### Do vs Don't

| âŒ Don't | âœ… Do |
|----------|-------|
| "Mohon maaf, Anda belum login." | "Kamu belum login. Yuk login dulu." |
| "Silakan mengisi nomor WhatsApp Anda." | "Masukin nomor WhatsApp kamu." |
| "Terima kasih telah berbelanja di situs kami." | "Makasih udah belanja di Jastip China!" |
| "Produk ini tidak tersedia." | "Produk ini lagi kosong. Coba cek katalog lain." |
| "Harap tunggu konfirmasi dari admin." | "Lagi nunggu verifikasi admin. Biasanya 1x24 jam." |
| "Pembayaran Anda sedang diproses." | "Bukti transfer kamu lagi dicek admin." |
| "Terjadi kesalahan. Silakan coba lagi." | "Ada yang error. Coba lagi ya, atau hubungi admin via WA." |

---

## 2. BUTTON LABELS

### Pattern: [Verb] + [Object]

| Context | Label | Notes |
|---------|-------|-------|
| Add to cart | "Tambah ke Keranjang" | Not "Add to Cart", not "â†’" |
| Buy now | "Beli Langsung" | Skip cart, go to checkout |
| Checkout | "Checkout" | Or "Lanjut ke Checkout" |
| Pay | "Bayar Sekarang" | |
| Upload proof | "Upload Bukti" | Not "Kirim Bukti" (upload is clearer) |
| Verify (admin) | "Verifikasi" | |
| Reject (admin) | "Tolak" | |
| Approve (admin) | "Setujui" | |
| Save | "Simpan" | |
| Cancel | "Batal" | |
| Delete | "Hapus" | |
| Edit | "Edit" | |
| Submit | "Kirim" | Or "Kirim Permintaan" (PO) |
| Login | "Login" | Not "Masuk" (login is more common in ID e-commerce) |
| Register | "Daftar" | Not "Register" |
| Logout | "Keluar" | |
| Search | "Cari" | |
| Filter | "Filter" | |
| Reset filter | "Reset" | |
| Load more | "Muat Lainnya" | Or "Lihat Lebih Banyak" |
| View detail | "Lihat Detail" | Not "Selengkapnya â†’" |
| Back | "Kembali" | |

### ANTI-PATTERN

- âŒ "Tambah ke Keranjang â†’" (no arrow)
- âŒ "BUY NOW" (no all-caps)
- âŒ "Submit Form" (redundant)
- âŒ "Click Here" (non-descriptive)
- âŒ "Proceed to Checkout" (too formal)

---

## 3. ERROR MESSAGES

### Form Validation

| Field | Error Trigger | Message |
|-------|---------------|---------|
| noWa | Empty | "Nomor WhatsApp wajib diisi" |
| noWa | Invalid format | "Format nomor salah. Contoh: 08123456789" |
| email | Invalid format | "Emailnya belum bener. Cek lagi ya." |
| password | Too short | "Password minimal 6 karakter" |
| confirmPassword | Mismatch | "Passwordnya nggak cocok. Coba ketik ulang." |
| alamat | Empty | "Alamat pengiriman wajib diisi" |
| qty | Exceeds stock | "Stok cuma tersisa {jumlah} biji" |
| file | Wrong type | "Cuma bisa upload gambar (JPG, PNG) atau PDF" |
| file | Too large | "Ukuran file kebanyakan. Maksimal 5MB." |
| required | Empty (generic) | "Ini wajib diisi" |

### API Errors

| Status | Message (to user) |
|--------|---------------------|
| 401 Unauthorized | "Kamu belum login. Yuk login dulu." |
| 403 Forbidden | "Kamu nggak ada akses ke halaman ini." |
| 404 Not Found | "Halaman/data nggak ketemu. Mungkin udah dihapus." |
| 409 Conflict | "Data udah ada/konflik. Coba refresh halaman." |
| 429 Too Many Requests | "Kecepatan ngetik/aksi terlalu cepat. Tunggu sebentar ya." |
| 500 Server Error | "Server lagi bermasalah. Coba lagi sebentar, atau hubungi admin via WA." |
| Network error | "Koneksi internet bermasalah. Cek sinyal/WiFi kamu." |

### Empty States

| Context | Title | Description | CTA |
|---------|-------|-------------|-----|
| Cart empty | "Keranjang masih kosong" | "Yuk lihat katalog, siapa tau ada yang menarik." | "Lihat Katalog" |
| Order history empty | "Belum ada pesanan" | "Saatnya belanja pertama kamu!" | "Mulai Belanja" |
| Notification empty | "Belum ada notifikasi" | "Notif akan muncul kalau ada update pesanan." | (none) |
| Search no result | "Nggak ketemu produknya" | "Coba kata kunci lain, atau cek kategori." | "Reset Filter" |
| Product out of stock | "Stok habis" | "Produk ini lagi kosong. Coba lain kali." | "Lihat Produk Lain" |
| Address empty | "Belum ada alamat" | "Tambahin alamat biar bisa checkout." | "Tambah Alamat" |

### Success Messages

| Context | Message |
|---------|---------|
| Login | "Berhasil login! Halo, {nama}" |
| Register | "Akun udah dibuat. Selamat datang!" |
| Add to cart | "{namaProduk} masuk keranjang" |
| Checkout | "Pesanan dibuat! No. Invoice: {invoice}" |
| Upload proof | "Bukti transfer terkirim. Tunggu verifikasi admin ya." |
| Payment verified | "Pembayaran terverifikasi! Pesanan lagi diproses." |
| Order complete | "Pesanan selesai! Makasih udah belanja." |
| Profile update | "Profil berhasil diupdate" |
| Address save | "Alamat disimpan" |
| Logout | "Kamu udah keluar. Sampai jumpa!" |

---

## 4. NAVIGATION LABELS

### Customer

| Label | URL | Notes |
|-------|-----|-------|
| Beranda | / | Not "Home" |
| Katalog | /katalog | Not "Produk" or "Shop" |
| Cara Order | /cara-order | How to buy guide |
| Lacak Pesanan | /pesanan | Order tracking/history |
| Ajukan PO | /permintaan-po | Custom order request |
| Keranjang | /keranjang | |
| Notifikasi | /notifikasi | |
| Profil | /profil | |

### Admin

| Label | URL | Notes |
|-------|-----|-------|
| Dashboard | /admin/dashboard | |
| Produk | /admin/produk | |
| Kategori | /admin/kategori | |
| Pesanan | /admin/pesanan | |
| Verifikasi Pembayaran | /admin/pembayaran | |
| Custom PO | /admin/permintaan-po | |
| Komplain | /admin/komplain | |
| Kurs | /admin/kurs | |
| Log Aktivitas | /admin/log | |

---

## 5. STATUS LABELS

### Pesanan

| Status | Label (UI) | Description |
|--------|------------|-------------|
| MENUNGGU_PEMBAYARAN | "Menunggu Pembayaran" | "Segera upload bukti transfer" |
| DIPROSES_ADMIN | "Diproses Admin" | "Pesanan lagi disiapin" |
| DIKONSOLIDASI_KIRIM | "Dikonsolidasi Kirim" | "Barang dikirim dari China" |
| TIBA_KIRIM_LOKAL | "Tiba di Gudang Lokal" | "Barang udah sampe Indonesia, siap kirim ke kamu" |
| SELESAI | "Selesai" | "Pesanan kelar. Makasih!" |
| DIBATALKAN | "Dibatalkan" | "Pesanan dibatalin" |

### Pembayaran

| Status | Label (UI) |
|--------|------------|
| MENUNGGU_BUKTI | "Menunggu Bukti Transfer" |
| MENUNGGU_VERIFIKASI | "Menunggu Verifikasi Admin" |
| TERVERIFIKASI | "Terverifikasi" |
| DITOLAK | "Ditolak" |
| KADALUARSA | "Kedaluwarsa" |

### Custom PO

| Status | Label (UI) |
|--------|------------|
| MENUNGGU_REVIEW | "Menunggu Review Admin" |
| DIKONFIRMASI_HARGA | "Penawaran Diterima, Menunggu Respon" |
| DITOLAK | "Ditolak" |
| SUDAH_JADI_PESANAN | "Sudah Jadi Pesanan" |

### Komplain

| Status | Label (UI) |
|--------|------------|
| DIAJUKAN | "Diajukan" |
| DIPROSES | "Diproses" |
| SELESAI | "Selesai" |

---

## 6. FORM LABELS & PLACEHOLDERS

### Auth

| Field | Label | Placeholder | Helper Text |
|-------|-------|-------------|-------------|
| nama | "Nama Lengkap" | "Contoh: Budi Santoso" | |
| noWa | "Nomor WhatsApp" | "08123456789" | "Format: 08xxx atau 628xxx" |
| email | "Email" | "budi@example.com" | "Email opsional, buat notifikasi." |
| password | "Password" | "â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" | "Minimal 6 karakter" |
| confirmPassword | "Konfirmasi Password" | "â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" | "Ketik ulang password" |

### Address

| Field | Label | Placeholder |
|-------|-------|-------------|
| label | "Label Alamat" | "Rumah, Kantor, Kos" |
| penerima | "Nama Penerima" | "Budi Santoso" |
| noTelp | "No. Telp Penerima" | "08123456789" |
| alamatLengkap | "Alamat Lengkap" | "Jl. Merdeka No. 123, RT 01 RW 02" |
| kota | "Kota" | "Bandung" |
| provinsi | "Provinsi" | "Jawa Barat" |
| kodePos | "Kode Pos" | "40123" |

### Product (Admin)

| Field | Label | Placeholder | Helper |
|-------|-------|-------------|--------|
| namaProduk | "Nama Produk" | "Tas Backpack Premium" | |
| deskripsi | "Deskripsi" | "Material kulit sintetis, kapasitas 20L..." | |
| hargaAsalRmb | "Harga Asal (RMB)" | "120" | "Harga beli di China (RMB)" |
| kurs | "Kurs" | (auto-filled) | "Otomatis dari KursMaster aktif" |
| hargaJualIdr | "Harga Jual (IDR)" | (auto-calculated) | "Otomatis = RMB Ã— Kurs. Bisa override." |
| beratGram | "Berat (gram)" | "800" | |
| linkSumber | "Link Sumber" | "https://taobao.com/..." | |
| stok | "Stok" | "15" | |
| status | "Status" | | "AKTIF = tampil di katalog" |

---

## 7. HEADING HIERARCHY

### Page Title (H1)

- Only ONE H1 per page
- Noto Serif SC 700, 48px desktop / 32px mobile
- Example: "Katalog Produk", "Detail Pesanan", "Keranjang Belanja"

### Section Title (H2)

- Noto Serif SC 500, 32px desktop / 24px mobile
- Example: "Produk Terkait", "Ringkasan Pesanan", "Info Pengiriman"

### Card Title (H3)

- Noto Serif SC 500, 24px desktop / 20px mobile
- Example: Product name in card

### ANTI-PATTERN

- âŒ "PRODUK KAMI" (H2) above "Katalog" (H1) â€” all-caps label
- âŒ Multiple H1 on page
- âŒ Using H3 for non-heading decorative text

---

## 8. META TEXT FORMATTING

### Separators

- Use comma: "Tas, Sepatu, Aksesoris"
- Use space + dash: "15 Jan 2024 - 20 Jan 2024"
- âŒ Do NOT use middle dot: "Tas Â· Sepatu Â· Aksesoris"

### Date Format

- Short: "15 Jan 2024"
- Long: "15 Januari 2024"
- With time: "15 Jan 2024, 14:30 WIB"
- Relative: "2 jam lalu", "kemarin", "3 hari lalu" (for notifications)

### Price Format

- Prefix: "Rp" (not "IDR", not "Rp.")
- Separator: dot for thousands
- Example: "Rp 285.000"
- Decimal: usually no decimal for IDR. If needed: "Rp 285.000,50"

### Quantity Format

- "15 pcs", "8 biji", "3 kg"
- Choose one consistently per context. "pcs" for generic, "biji" for casual.

---

## 9. EMAIL / WHATSAPP COPY

### WhatsApp Notification (From System)

```
Halo {nama}!

Pesanan kamu udah update:
- No. Invoice: {noInvoice}
- Status: {statusBaru}

Cek detail di: {APP_URL}/pesanan/{pesananId}

Makasih udah belanja di Jastip China!
```

### Password Reset (WhatsApp)

```
Halo {nama}!

Ini link reset password kamu:
{APP_URL}/reset-password?token={token}

Link ini cuma berlaku 1 jam. Kalau bukan kamu yang minta, abaikan pesan ini.
```

---

## 10. SEO META

### Page Titles

| Page | Title |
|------|-------|
| Beranda | "Jastip China - Barang China, sampai pintu rumah" |
| Katalog | "Katalog Produk | Jastip China" |
| Detail Produk | "{namaProduk} | Jastip China" |
| Cara Order | "Cara Order | Jastip China" |
| Login | "Login | Jastip China" |
| Register | "Daftar Akun | Jastip China" |

### Meta Descriptions

| Page | Description |
|------|-------------|
| Beranda | "Beli produk China berkualitas - tas, sepatu, aksesoris, elektronik. Jastip aman, harga bersahabat, sampai depan pintu." |
| Katalog | "Lengkap produk China siap kirim. Tas branded, sepatu premium, aksesoris murah. Stok terbatas, amankan sekarang." |
| Detail | "Beli {namaProduk} via jastip China. {deskripsiSingkat}. Stok terbatas." |

---

## 11. MICROCOPY (Small Text)

### Helper Text

| Context | Text |
|---------|------|
| Payment expiry | "Selesaikan pembayaran dalam 24 jam. Kalau lewat, pesanan otomatis batal." |
| Bank transfer | "Transfer ke rekening berikut. Jangan lupa upload buktinya." |
| Verification wait | "Bukti lagi dicek admin. Biasanya 1x24 jam." |
| Shipping estimate | "Estimasi sampai 7-14 hari setelah verifikasi" |
| Custom PO | "Tim kami review dulu, kasih estimasi harga dalam 1-2 hari kerja." |
| Stock warning | "Stok terbatas! Sisa {jumlah} biji" |
| Cart count | "{count} item di keranjang" |
| Subtotal | "Subtotal: {count} produk" |

### Tooltip

| Context | Text |
|---------|------|
| Kurs info | "Kurs RMB ke IDR. Otomatis diambil dari KursMaster terbaru." |
| Weight info | "Total berat semua item pesanan. Dipakai buat hitung ongkir." |
| Snapshot price | "Harga sesuai saat checkout. Tidak berubah walau harga produk diupdate." |

---

## COPY CHECKLIST

- [ ] Tone: hangat, approachable, jujur (not formal, not servile)
- [ ] "Kamu" not "Anda"
- [ ] No all-caps labels
- [ ] No arrows (â†’) in buttons
- [ ] No middle dots (Â·) in meta
- [ ] Error messages: helpful + actionable
- [ ] Empty states: friendly + CTA
- [ ] Success messages: enthusiastic but not over
- [ ] Date format: "15 Jan 2024"
- [ ] Price format: "Rp 285.000"
- [ ] Status labels: sentence case, not uppercase enum
- [ ] Helper text: explains WHY, not just WHAT



========================================
# FILE: design-system.md
========================================

# Design System - Jastip China

Platform e-commerce jastip barang dari China ke Indonesia dengan estetika China aesthetic yang premium, hangat, dan terpercaya.

---

## 1. COLOR PALETTE

### Primary: Chinese Red
```
#C8102E
RGB: (200, 16, 46)
HSL: 349Â° 85% 42%
Usage: Logo, CTA buttons, active states, links, header accents
Character: Auspicious red (prosperity), traditional Chinese symbolism
Contrast on #FAF8F3: 7.2:1 (AAA compliant)
```

**When to use:**
- Call-to-action buttons ("Tambah ke Keranjang", "Bayar Sekarang", "Checkout")
- Active menu items
- Link hover state
- Badge "Baru" atau "Flash Sale"
- Form focus ring (primary variant)
- Error state accent (secondary)

---

### Secondary: Gold (Prosperity)
```
#D4AF37
RGB: (212, 175, 55)
HSL: 43Â° 64% 52%
Usage: Harga, premium badges, prosperity accents
Character: Luxury, wealth (Chinese symbolism)
Contrast on #FFFFFF: 5.8:1 (AA compliant, use for price only)
```

**When to use:**
- Price display (harga produk, total bayar)
- Badge "Ready Stock", "Premium", "Pilihan"
- Icon accent (hanya kecil, jangan besar)
- Section divider (decorative line)
- JANGAN untuk body text atau large area

---

### Accent: Jade (Success/Verification)
```
#7C9885
RGB: (124, 152, 133)
HSL: 144Â° 11% 54%
Usage: Success states, verification, safe/green actions
Character: Jade stone (protection, harmony in Chinese culture)
Contrast on #FFFFFF: 4.6:1 (AA compliant)
```

**When to use:**
- Badge "Terverifikasi", "Pesanan Selesai"
- Success message color
- Checkmark icon color
- Status "Pembayaran Terverifikasi"
- JANGAN untuk error atau warning

---

### Neutral: Cream (Latar Utama)
```
#FAF8F3
RGB: (250, 248, 243)
HSL: 34Â° 67% 97%
Usage: Body background, page canvas
Character: Rice paper warmth, aged parchment
Reference: Traditional Chinese paper color
```

**Usage:**
- Body background (entire page)
- Default state untuk elemen (sebelum hover)

---

### Neutral: White (Card Background)
```
#FFFFFF
RGB: (255, 255, 255)
HSL: 0Â° 0% 100%
Usage: Card container, modal, dropdown, elevation layer
Character: Clean, premium, elevated
```

**Usage:**
- Card produk background
- Form container
- Modal dialog
- Dropdown menu background
- Table rows

**Alternative (subtle warmth):**
```
#F7F3EC
RGB: (247, 243, 236)
HSL: 30Â° 33% 95%
Usage: Card background variation (alternate dengan #FFFFFF)
Character: Slightly warmer than pure white, less harsh
```

**Strategy:** Variasikan antara #FFFFFF dan #F7F3EC di grid produk untuk visual interest (tidak semua card putih identik).

---

### Neutral: Border (Divider)
```
#E8DCC8
RGB: (232, 220, 200)
HSL: 30Â° 40% 85%
Usage: Border, divider line, subtle separation
Character: Tea-stained paper, soft boundary
Contrast on #FAF8F3: 1.5:1 (low contrast = subtle)
```

**Usage:**
- Card border (1px solid)
- Divider line antar section
- Input field border (default state)
- Dropdown border

---

### Neutral: Text - Primary (Ink Brush Dark)
```
#2C1810
RGB: (44, 24, 16)
HSL: 18Â° 47% 12%
Usage: Heading, body text, primary content
Character: Ink brush dark, warm dark tone (tidak pure black)
Contrast on #FAF8F3: 9.8:1 (AAA compliant)
```

**Usage:**
- H1, H2, H3 heading
- Body paragraph text
- Button text (primary, sekunder)
- Form label
- Card title

---

### Neutral: Text - Secondary (Faded Ink)
```
#6B5D52
RGB: (107, 93, 82)
HSL: 18Â° 14% 37%
Usage: Meta text, description, secondary content
Character: Faded ink, less prominent
Contrast on #FAF8F3: 5.6:1 (AA compliant)
```

**Usage:**
- Product description (excerpt 2-3 lines)
- Meta text (tanggal, jumlah review, stok)
- Secondary label ("Estimasi pengiriman: 3-5 hari")
- Placeholder text (input field)
- Caption di gambar

---

### Status Colors (NOT IN PALETTE, derived)

| Status | Color | RGB | Usage |
|--------|-------|-----|-------|
| MENUNGGU_PEMBAYARAN | Gold `#D4AF37` | (212, 175, 55) | Badge, pending indicator |
| DIPROSES_ADMIN | Chinese Red `#C8102E` | (200, 16, 46) | Active processing |
| DIKONSOLIDASI_KIRIM | Blue-Muted `#5B7C99` | (91, 124, 153) | In transit (cool tone) |
| TIBA_KIRIM_LOKAL | Jade `#7C9885` | (124, 152, 133) | Local delivery |
| SELESAI | Jade `#7C9885` | (124, 152, 133) | Complete/success |
| DIBATALKAN | Red-Muted `#9B4D50` | (155, 77, 80) | Cancelled/error |

**Usage:** Badge di riwayat pesanan, timeline status, list item indicator.

---

### Semantic Colors

| Use Case | Color | Usage |
|----------|-------|-------|
| Error | `#9B4D50` (muted red) | Error message, validation error border, error badge |
| Warning | `#D4A93B` (muted gold) | Warning message, cautionary badge |
| Success | `#7C9885` (jade) | Success message, check icon |
| Info | `#5B7C99` (blue-muted) | Info tooltip, information badge |
| Disabled | `#E8DCC8` + opacity 50% text | Disabled button, disabled input |

---

## 2. TYPOGRAPHY

### Display Font: Noto Serif SC (Google Fonts)

**Character:** Chinese serif, elegant, strong personality, premium feel.

**Weights used:**
- 500 (Medium): Section headings
- 700 (Bold): Display, price, important titles

**Sizes & Line Heights:**

| Usage | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| H1 (Logo/Hero) | 48px | 700 | 56px | -0.5px |
| H2 (Section Title) | 32px | 500 | 40px | 0px |
| H3 (Card Title) | 24px | 500 | 32px | 0px |
| Price (Large) | 20px | 700 | 28px | 0px |
| Subtitle | 18px | 500 | 26px | 0.5px |

**System fallback:** Georgia, "Times New Roman", serif

**When to use:**
- Logo text
- Page headings (H2)
- Card product titles (h3)
- Price display (besar)
- Section subheading
- Badge text (premium badges)

---

### Body Font: Inter (Google Fonts)

**Character:** Clean, readable, modern sans-serif. Proven accessibility track record.

**Weights used:**
- 400 (Regular): Body copy
- 500 (Medium): UI labels, form labels
- 600 (Semibold): Emphasis, button text

**Sizes & Line Heights:**

| Usage | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| Body Text | 16px | 400 | 24px | 0px |
| Small Text | 14px | 400 | 20px | 0.25px |
| XSmall (Meta) | 12px | 400 | 16px | 0.3px |
| Button Label | 16px | 600 | 24px | 0px |
| Form Label | 14px | 500 | 20px | 0px |
| Input Placeholder | 16px | 400 | 24px | 0px (opacity 60%) |
| Link | 16px | 500 | 24px | 0px |

**System fallback:** system-ui, -apple-system, "Segoe UI", Roboto, sans-serif

**When to use:**
- Paragraph text
- Form input & labels
- Button text
- Navigation menu
- Description text
- Meta information
- ALL UI text (bukan heading)

---

### Accent Font (Optional, Decorative): Ma Shan Zheng (Google Fonts)

**Character:** Chinese brush script, artistic, handwritten feel.

**USAGE CONSTRAINT:**
- HANYA untuk 1-2 decorative element pada halaman
- TIDAK untuk body text atau banyak elemen
- Contoh: Tagline di beranda ("é²œè´§ç›´è¾¾" = Fresh goods direct) atau section header dekoratif
- Size: minimal 24px untuk readability

**When to use:**
- Beranda tagline di banner
- Atau section header accent (misal "æ–°å“" = New Items)
- JANGAN overuse â†’ AI slop territory

---

## 3. SPACING SCALE

**Base unit:** 4px

| Value | Multiple | Usage |
|-------|----------|-------|
| 4px | 1x | Icon spacing, micro gaps |
| 8px | 2x | Small padding, tight spacing |
| 12px | 3x | Button padding, small gap |
| 16px | 4x | Card padding, form field margin |
| 24px | 6x | Section padding, container horizontal |
| 32px | 8x | Section gap, large margin |
| 48px | 12x | Major section separator |
| 64px | 16x | Page vertical spacing |
| 96px | 24x | Hero/banner bottom margin |

**Container Padding:**
- Desktop (lg+): 24px horizontal
- Tablet (md): 20px horizontal
- Mobile (xs-sm): 16px horizontal

**Grid Gap:**
- Desktop: 24px
- Tablet: 20px
- Mobile: 16px

---

## 4. BORDER RADIUS

**Hierarchy-based (NOT one-size-fits-all):**

| Value | Usage | Character |
|-------|-------|-----------|
| 6px | Badge, tag, small button | Crisp, defined, secondary element |
| 8px | Button, input field, dropdown | Standard UI, interactive |
| 12px | Regular card produk, modal | Friendly, main content card |
| 20px | Card produk unggulan (2x size) | Premium, highlighted, large card |
| 0px (none) | Section background, full-width container | Modern, clean block |

**Strategy:**
- Card produk regular: 12px
- Card produk unggulan (featured): 20px
- Button: 8px
- Input field: 8px
- Badge: 6px
- Modal: 12px
- Container (full-width section): 0px (sharp edge)

---

## 5. SHADOW

**Guideline:** Shadow dipakai SPARINGLY, hanya saat ada elevation/interaction.

| Name | CSS | Usage |
|------|-----|-------|
| None | none | Default card state, flat design |
| Subtle | `0 2px 4px rgba(44, 24, 16, 0.08)` | Hover card, light elevation |
| Medium | `0 4px 12px rgba(44, 24, 16, 0.12)` | Active card, modal shadow |
| Deep | `0 8px 24px rgba(44, 24, 16, 0.16)` | Dropdown menu, overlay |

**Usage:**
- Card produk default: NO shadow (border 1px `#E8DCC8` saja)
- Card produk hover: Subtle shadow + border tetap
- Card produk unggulan (featured): Medium shadow default
- Modal: Deep shadow (backdrop blur + shadow)
- Dropdown menu: Medium shadow
- Floating button: Medium shadow

**ANTI-PATTERN:** Jangan shadow semua card default. Subtle adalah default, shadow lebih dalam saat interaksi.

---

## 6. BORDERS

**Default border:** 1px solid `#E8DCC8`

| Element | Border | Usage |
|---------|--------|-------|
| Card produk | 1px solid `#E8DCC8` | Subtle divider |
| Input field (default) | 1px solid `#E8DCC8` | Subtle frame |
| Input field (focus) | 2px solid `#C8102E` + ring | Focus indicator |
| Divider line | 1px solid `#E8DCC8` | Section separator |
| Table row | 1px solid `#E8DCC8` (bottom) | Row divider |
| Modal | 1px solid `#E8DCC8` | Container boundary |

**Input Focus Ring:**
- Border: 2px solid Chinese Red `#C8102E`
- Ring (outline): 4px solid `rgba(200, 16, 46, 0.1)` (20% opacity)
- Total focus area: border + ring

---

## 7. OPACITY / TRANSPARENCY

| Value | Usage |
|-------|-------|
| 100% | Full opacity default |
| 80% | Secondary text, muted state |
| 60% | Placeholder text, disabled state |
| 40% | Disabled element, very subtle |
| 0% | Hidden (display: none preferred) |

---

## 8. BREAKPOINTS (Mobile-first)

| Name | Min Width | Max Width | Context |
|------|-----------|-----------|---------|
| xs | 0px | 639px | Mobile portrait |
| sm | 640px | 767px | Mobile landscape |
| md | 768px | 1023px | Tablet |
| lg | 1024px | 1279px | Desktop small |
| xl | 1280px | âˆž | Desktop large |

---

## 9. Z-INDEX SCALE

| Level | Value | Usage |
|-------|-------|-------|
| Base | 0 | Default element |
| Sticky | 10 | Sticky header, floating label |
| Dropdown | 20 | Dropdown menu, select dropdown |
| Modal | 30 | Modal backdrop, modal dialog |
| Toast | 40 | Toast notification, alerts |
| Tooltip | 50 | Tooltip, popover |

---

## CSS VARIABLES (Tailwind Config)

```css
:root {
  /* Colors */
  --color-primary: #C8102E;
  --color-secondary: #D4AF37;
  --color-accent: #7C9885;
  
  --color-bg-main: #FAF8F3;
  --color-bg-card: #FFFFFF;
  --color-bg-card-alt: #F7F3EC;
  
  --color-border: #E8DCC8;
  --color-text-primary: #2C1810;
  --color-text-secondary: #6B5D52;
  
  /* Typography */
  --font-display: 'Noto Serif SC', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-base: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  
  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 20px;
  
  /* Shadow */
  --shadow-none: none;
  --shadow-subtle: 0 2px 4px rgba(44, 24, 16, 0.08);
  --shadow-md: 0 4px 12px rgba(44, 24, 16, 0.12);
  --shadow-lg: 0 8px 24px rgba(44, 24, 16, 0.16);
}
```

---

## VERIFICATION CHECKLIST

Before implementing, verify:

- [ ] Colors match Chinese aesthetic (red + gold prosperity symbols)
- [ ] Contrast ratios WCAG AA minimum (all text colors)
- [ ] Font weights are exact (not "bold" fuzzy)
- [ ] Spacing is multiple of 4px base unit
- [ ] Border radius bervariasi per hierarchy (not uniform)
- [ ] Shadow used sparingly (not default on every card)
- [ ] Noto Serif SC only for heading/price (not overused)
- [ ] No pure black or pure white (warmth maintained)
- [ ] System font fallback present for all fonts



========================================
# FILE: interactions.md
========================================

# Interactions & Micro-Interactions - Jastip China

Animation, hover, focus, dan transisi rules.

**Core principle:** "Satu halaman, satu momen berani â€” sisanya tenang dan disiplin."

---

## 1. ANIMATION TOKENS

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| Instant | 100ms | Color change (hover, focus state) |
| Fast | 200ms | Button state, toggle, small feedback |
| Medium | 300ms | Modal open, drawer slide, dropdown |
| Slow | 400ms | Page transition, detail product open |
| None | 0ms | Static elements, decorative content |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| Ease-out | `cubic-bezier(0.25, 0.8, 0.25, 1)` | Default, element entering/moving |
| Ease-in | `cubic-bezier(0.4, 0, 1, 1)` | Element exiting (rare) |
| Ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | State change (expand/collapse) |
| Linear | `linear` | Spinner rotation only |

**Rule:** JANGAN pakai `ease` default browser â€” always explicit cubic-bezier.

---

## 2. HOVER STATES

### Card Produk (Regular)

| Property | Default | Hover | Transition |
|----------|---------|-------|------------|
| Border color | #E8DCC8 | #C8102E | 200ms ease-out |
| Box shadow | none | 0 4px 12px rgba(200,16,46,0.08) | 200ms ease-out |
| Transform | none | none (NO scale) | - |
| Cursor | default | pointer | - |

**ANTI-PATTERN:** JANGAN scale-up card on hover. Itu pattern SaaS generik.

### Card Produk (Unggulan)

| Property | Default | Hover | Transition |
|----------|---------|-------|------------|
| Border | #E8DCC8 | #C8102E | 200ms ease-out |
| Shadow | 0 4px 12px rgba(200,16,46,0.08) | 0 8px 24px rgba(200,16,46,0.12) | 300ms ease-out |
| Transform | none | none | - |

### Button (Primary)

| Property | Default | Hover | Transition |
|----------|---------|-------|------------|
| Background | #C8102E | #A60D25 (darker 15%) | 200ms ease-out |
| Shadow | none | 0 2px 4px rgba(200,16,46,0.2) | 200ms ease-out |
| Transform | none | none | - |

### Input Field

| Property | Default | Hover | Focus |
|----------|---------|-------|-------|
| Border | 1px #E8DCC8 | 1px #C8102E (subtle) | 2px #C8102E |
| Ring | none | none | 0 0 0 4px rgba(200,16,46,0.1) |
| Transition | - | 100ms ease-out | 200ms ease-out |

### Navigation Item

| Property | Default | Hover | Active |
|----------|---------|-------|--------|
| Color | #2C1810 | #C8102E | #C8102E |
| Background | transparent | rgba(200,16,46,0.05) | transparent |
| Underline | none | none (appear on active only) | 2px solid #C8102E |
| Transition | 200ms ease-out | 200ms ease-out | - |

---

## 3. FOCUS STATES (Accessibility)

**Rule:** Setiap interactive element WAJIB punya visible focus indicator.

### Standard Focus Ring

```
Outline: 2px solid #C8102E (Chinese Red)
Ring: 0 0 0 4px rgba(200,16,46,0.1) (20% opacity)
Transition: 100ms ease-out
```

**Elements:** Button, Input, Select, Checkbox, Radio, Link, Menu Item

### Focus Visible Only

Gunakan `:focus-visible` selector (bukan `:focus`) agar focus ring tidak muncul saat mouse click, hanya keyboard nav.

```css
/* Hanya muncul saat keyboard navigation */
*:focus-visible {
  outline: 2px solid #C8102E;
  box-shadow: 0 0 0 4px rgba(200,16,46,0.1);
}
/* Mouse click tidak trigger focus ring */
*:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}
```

---

## 4. THE ONE "BERANI" MOMENT

### Detail Produk Transition (Only Allowed Animation)

**Context:** User click card produk â†’ navigasi ke `/produk/[id]`

**Animation:**
1. Card produk image slightly scale (1.0 â†’ 1.02, 200ms)
2. Page transition: fade-out current page (200ms)
3. New page load: detail image fade-in + slight scale (0.98 â†’ 1.0, 400ms ease-out)
4. Content below image: subtle slide-up (8px, 300ms ease-out, staggered 50ms)

**Why this is the ONE moment:**
- Detail page is the conversion point (user decides to buy)
- Visual continuity (image grows into detail page)
- Signals premium experience
- Does NOT apply to any other page transition

### All Other Transitions: NONE

- Page to page: instant (no fade, no slide)
- Section to section: instant (no scroll-triggered animation)
- Modal open: 300ms fade + scale (functional, not decorative)
- Dropdown: 200ms slide-down (functional)

---

## 5. SCROLL BEHAVIOR

### Smooth Scroll

```css
html {
  scroll-behavior: smooth;
}
```

**Usage:** Anchor link navigation, back-to-top button

### Scroll-Triggered Animations: NONE

**ANTI-PATTERN:** JANGAN pakai `IntersectionObserver` atau library seperti AOS untuk fade-in/slide-up on scroll. Itu AI slop territory.

**Exception:** Lazy-load images (functional, not decorative).

---

## 6. LOADING STATES

### Skeleton Loader (Preferred)

**Usage:** Content area loading (grid produk, list, detail page)

**Behavior:**
- Tampilkan skeleton structure immediately
- Fade to real content (200ms cross-fade) when data arrives
- Skeleton animation: shimmer (1.5s linear infinite)

**Skeleton â†’ Content Transition:**
```css
.skeleton-to-content {
  animation: fadeIn 200ms ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Spinner (Minimal Use)

**Usage:** Button submit, inline action (not page-level)

**Behavior:**
- Replace button text with spinner (16x16px)
- Button width tetap (tidak shrink)
- Auto-disabled (prevent double-click)
- Spinner rotation: 0.8s linear infinite

---

## 7. FORM INTERACTION PATTERNS

### Validation Timing

| Field Type | Validate When | Show Error When |
|------------|---------------|-----------------|
| Email/NoWa | On blur | On blur if invalid |
| Password | On blur | On blur if < 6 chars |
| Required | On submit | On submit if empty |
| Confirm Password | On blur | On blur if not match |

**Error Display:**
- Border: 2px #9B4D50 (instant, no transition)
- Error text: fade-in 200ms ease-out
- Clear error: when user starts typing (instant border reset)

### Input Focus Behavior

- Click label â†’ focus input (expand touch target)
- Tab key â†’ logical order (top-to-bottom, left-to-right)
- Enter key on single-field form â†’ submit
- Enter key on multi-field form â†’ focus next field (NOT submit)

---

## 8. MODAL & DROPDOWN ANIMATIONS

### Modal Open

```
1. Backdrop fade-in: 200ms ease-out (opacity 0 â†’ 0.4)
2. Modal scale + fade: 300ms ease-out
   - Initial: opacity 0, transform scale(0.95) translateY(8px)
   - Final: opacity 1, transform scale(1) translateY(0)
3. Body scroll lock: instant (overflow hidden)
```

### Modal Close

```
1. Modal scale + fade: 200ms ease-in
   - Initial: opacity 1, transform scale(1)
   - Final: opacity 0, transform scale(0.98)
2. Backdrop fade-out: 200ms ease-out (after modal)
3. Body scroll unlock: instant (after animation)
```

### Dropdown Open

```
1. Dropdown slide-down: 200ms ease-out
   - Initial: opacity 0, transform translateY(-4px)
   - Final: opacity 1, transform translateY(0)
```

---

## 9. TAB SWITCHING

### Tab Content Transition

```
1. Old tab fade-out: 100ms ease-out (opacity 1 â†’ 0)
2. New tab fade-in: 200ms ease-out (opacity 0 â†’ 1)
3. No slide (avoid complexity)
```

**Active Tab Indicator:**
- Underline: 2px solid #C8102E
- Transition: 200ms ease-in-out (slide to new tab)

---

## 10. QUANTITY STEPPER

### Button Press Feedback

```
- Active state: scale(0.95) (50ms, instant snap)
- Release: scale(1.0) (100ms ease-out)
- Number change: instant (no animation)
```

**DISABLED state (min/max reached):**
- Button opacity: 50%
- Cursor: not-allowed
- No hover effect

---

## 11. IMAGE GALLERY (Detail Produk)

### Thumbnail Click

```
1. Main image fade-out: 100ms ease-out (opacity 1 â†’ 0)
2. New image fade-in: 200ms ease-out (opacity 0 â†’ 1)
3. Active thumbnail border: 2px solid #C8102E (100ms ease-out)
```

### Swipe (Mobile)

```
- Swipe left/right: 300ms ease-out (translate image)
- Threshold: 30% width (otherwise snap back)
- Haptic feedback: light (if supported)
```

---

## 12. TOAST NOTIFICATION

### Enter Animation

```
1. Slide-in from right: 300ms ease-out
   - Initial: opacity 0, transform translateX(100%)
   - Final: opacity 1, transform translateX(0)
2. Auto-dismiss timer: 5 seconds
3. Hover: pause timer (stay visible)
```

### Exit Animation

```
1. Slide-out to right: 200ms ease-in
   - Initial: opacity 1, transform translateX(0)
   - Final: opacity 0, transform translateX(100%)
2. After animation: display none
```

---

## 13. COPY TO CLIPBOARD

### Feedback

```
1. Click copy icon: icon change to check (instant)
2. Tooltip "Tersalin!" fade-in: 100ms ease-out
3. Tooltip fade-out: 200ms ease-out (after 2 seconds)
4. Icon revert to copy: instant (after tooltip dismiss)
```

---

## 14. WHAT NOT TO DO (Strict)

### âŒ AI Slop Animations

- NO fade-in-up on every section scroll
- NO stagger animation on card grid
- NO parallax scroll on hero
- NO counter animation on numbers
- NO typewriter effect on headings
- NO bouncy spring physics on cards
- NO shimmer on every element (only skeleton loaders)
- NO scale 1.05 on every hover
- NO rotate 360deg on icons
- NO pulse animation on buttons (except loading)

### âŒ Decorative Motion

- NO animated background gradients
- NO floating particles
- NO spinning decorative elements
- NO moving waves or shapes
- NO video backgrounds
- NO Lottie animations (except loading states, optional)

### âŒ Excessive Transitions

- NO 500ms+ duration for simple state changes
- NO multiple animations running simultaneously on same element
- NO transition on layout properties (width, height, padding) â€” only transform + opacity

---

## 15. REDUCED MOTION (Accessibility)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-beease: auto !important;
  }
}
```

**Behavior:** All animations reduced to instant. Spinner still functional (but no rotation, show static "Loading...").

---

## VERIFICATION CHECKLIST

- [ ] Only 1 "berani" moment per page (detail product transition)
- [ ] Hover states use color/shadow change, NOT scale transform
- [ ] Focus rings visible on keyboard navigation
- [ ] Easing functions explicit (not default browser ease)
- [ ] Duration â‰¤ 400ms for most animations
- [ ] Skeleton loaders for content areas
- [ ] Modal/dropdown animations functional (not decorative)
- [ ] No scroll-triggered fade-in animations
- [ ] `prefers-reduced-motion` respected
- [ ] Loading states prevent double-submit



========================================
# FILE: layouts.md
========================================

# Layouts - Jastip China

Grid system, container, header/footer structure, admin sidebar layout.

---

## 1. GRID SYSTEM

**Approach:** CSS Grid native (bukan 12-col Bootstrap-style).

**Reason:** E-commerce modern needs flexible layouts â€” produk unggulan span 2x2, regular 1x1, sidebar fixed + content fluid. CSS Grid handles ini naturally.

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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Left: Logo]  [Center: Nav Menu]  [Right: Actions]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]    [Logo Center]    [Cart] [â™¡]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Logo+Desc]  [Navigasi]  [Bantuan]  [Kontak/WA]  â”‚
â”‚                                                   â”‚
â”‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ â”‚
â”‚ Â© 2024 Jastip China. All rights reserved.         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
Order: Logo+Desc â†’ Kontak â†’ Navigasi â†’ Bantuan â†’ Copyright
Padding: 32px 16px
```

**Bottom margin mobile:** 64px (space untuk bottom navigation bar)

---

## 5. ADMIN SIDEBAR LAYOUT (Permanent)

### Desktop (lg+, 1024px+)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚         â”‚ Header (64px)                            â”‚
â”‚ Sidebar â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ (240px) â”‚                                          â”‚
â”‚         â”‚ Content Area                             â”‚
â”‚         â”‚                                          â”‚
â”‚         â”‚                                          â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
  â”œ Produk
  â”” Kategori
Pesanan
  â”œ Semua Pesanan
  â”œ Verifikasi Pembayaran
  â”” Pengiriman
Custom PO
  â”” Review PO
Komplain
  â”” Handle Komplain
Pengaturan
  â”œ Kurs
  â”œ Log Aktivitas
  â”” Admin Users
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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Page Title]                    [Admin Profile]  â”‚
â”‚ Breadcrumb (optional)                             â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Header                                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                   â”‚
â”‚  Grid Produk (full container width)              â”‚
â”‚                                                   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Pattern B: Sidebar + Content (Katalog with filter)
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Header                                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚          â”‚                                        â”‚
â”‚ Filter   â”‚  Grid Produk                          â”‚
â”‚ Sidebar  â”‚                                       â”‚
â”‚ (256px)  â”‚                                       â”‚
â”‚          â”‚                                        â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Pattern C: 2-Column (Detail Produk, Keranjang)
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Header                                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                    â”‚                              â”‚
â”‚  Media/Gallery     â”‚  Info/Summary                â”‚
â”‚  (60% width)       â”‚  (40% width, sticky)        â”‚
â”‚                    â”‚                              â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Pattern D: Centered Form (Auth Pages)
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Header (minimal, logo only)                      â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                   â”‚
â”‚                                                   â”‚
â”‚         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”                      â”‚
â”‚         â”‚                  â”‚                      â”‚
â”‚         â”‚  Form Card       â”‚                      â”‚
â”‚         â”‚  (max-w-md)      â”‚                      â”‚
â”‚         â”‚                  â”‚                      â”‚
â”‚         â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                      â”‚
â”‚                                                   â”‚
â”‚                                                   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer (minimal)                                 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Pattern E: Wizard/Stepper (Checkout)
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Header                                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Step 1 â”€â”€â”€ Step 2 â”€â”€â”€ Step 3                   â”‚
â”‚                                                   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚                    â”‚                      â”‚   â”‚
â”‚  â”‚  Step Content      â”‚  Order Summary       â”‚   â”‚
â”‚  â”‚  (flex-1)          â”‚  (320px, sticky)     â”‚   â”‚
â”‚  â”‚                    â”‚                      â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Pattern F: Admin Table (List Pages)
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Sidebar â”‚ Header                                  â”‚
â”‚         â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚         â”‚ Title + Action Button                  â”‚
â”‚         â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚         â”‚                                        â”‚
â”‚         â”‚  Table (full width)                    â”‚
â”‚         â”‚  Filter bar (optional)                 â”‚
â”‚         â”‚  Pagination (bottom)                  â”‚
â”‚         â”‚                                        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
- All values Ã— 0.75 (desktop spacing Ã— 3/4)
- Example: 48px â†’ 36px, 32px â†’ 24px

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



========================================
# FILE: mobile-patterns.md
========================================

# Mobile Patterns - Jastip China

Pola UI spesifik mobile (bottom nav, bottom sheet, gestures, keyboards) yang tidak covered di responsive.md umum.

---

## 1. BOTTOM NAVIGATION (Mobile Only)

**Presence:** Only show on xs/sm (0-767px). Hidden on md+ (768px+).

### Layout
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Home] [Catalog] [FAB +] [Cart] [Profile]â”‚
â”‚ flex-1   flex-1   56px    flex-1  flex-1 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
Height: 64px (including safe area padding)
Background: #FFFFFF
Border-top: 1px solid #E8DCC8
Position: fixed, bottom 0, left 0, right 0
Z-index: 10
Shadow: 0 -2px 8px rgba(44,24,16,0.08)
Padding-bottom: env(safe-area-inset-bottom) /* iPhone notch */
```

### Items

| Item | Icon | Label | Active Color | Inactive Color |
|------|------|-------|-------------|----------------|
| Home | house 24px | "Beranda" | #C8102E | #6B5D52 |
| Catalog | grid 24px | "Katalog" | #C8102E | #6B5D52 |
| FAB | plus 24px (white) | (none) | #C8102E bg | #C8102E bg |
| Cart | shopping-bag 24px | "Keranjang" | #C8102E | #6B5D52 |
| Profile | user 24px | "Profil" | #C8102E | #6B5D52 |

**Icon size:** 24x24px
**Label:** Inter 400, 10px
**Touch target:** full flex-1 area (min 44x44px)

### FAB (Floating Action Button)

```
Size: 56x56px circle
Background: #C8102E
Icon: white + 24x24px
Elevation: -8px from bar top (half outside bar)
Shadow: 0 4px 12px rgba(200,16,46,0.3)
Position: center, relative to bar
```

**Action:** Tap â†’ navigate to `/permintaan-po` (Ajukan Custom PO)

### Cart Badge
```
Size: 18x18px circle
Background: #C8102E
Text: white, Inter 600, 10px
Position: top-right of Cart icon (-4px, -4px offset)
Show: only if cart has items (count > 0)
Max display: "99+" if > 99
```

### Page Body Padding
```
padding-bottom: 80px (64px nav + 16px gap)
```

---

## 2. BOTTOM SHEET (Mobile Modal Pattern)

**Usage:** Filter katalog, select options, image picker, confirm dialog (mobile alternative to modal).

### Structure
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚        â”â”â”               â”‚ (drag handle, 36x4px, #E8DCC8)
â”‚                          â”‚
â”‚  [Title]          [X]   â”‚
â”‚                          â”‚
â”‚  Content                 â”‚
â”‚  (scrollable)            â”‚
â”‚                          â”‚
â”‚  [Action Button]        â”‚ (optional, sticky bottom)
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Dimensions
```
Width: 100vw
Max height: 80vh
Background: #FFFFFF
Radius: 20px top-left + top-right
Shadow: 0 -8px 24px rgba(44,24,16,0.16)
Position: fixed, bottom 0
Z-index: 40
```

### Backdrop
```
Background: rgba(0,0,0,0.4)
Blur: 4px
Z-index: 39
```

### Open Animation
```
1. Backdrop fade-in: 200ms ease-out
2. Sheet slide-up: 300ms ease-out
   - Initial: transform translateY(100%)
   - Final: transform translateY(0)
```

### Close Animation
```
1. Sheet slide-down: 200ms ease-in
2. Backdrop fade-out: 200ms ease-out (parallel)
```

### Gestures
- Swipe down (drag handle area): dismiss sheet
- Threshold: 25% height (if dragged < 25%, snap back)
- Tap backdrop: dismiss sheet

---

## 3. GESTURES

### Image Gallery Swipe (Detail Produk)

```
Swipe left: next image
Swipe right: previous image
Threshold: 30% width or 50px
Animation: 300ms ease-out (translate)
Haptic: light feedback on snap
```

**Dot Indicators:**
```
â— â—‹ â—‹ â—‹ (max 5 dots, current = filled)
Position: bottom center, 8px from image bottom
Color: #FFFFFF (filled), rgba(255,255,255,0.4) (empty)
Size: 8x8px circle
```

### Pull to Refresh (Katalog, Riwayat Pesanan)

```
Pull threshold: 80px
Spinner: appears at 40px pull
Haptic: light at threshold
Release: triggers refresh
Animation: 300ms ease-out (snap back)
```

**Spinner Style:**
- Color: #C8102E
- Size: 24x24px
- Text: "Memuat..." (Inter 400, 14px, #6B5D52)

### Long Press: NOT USED

**Reason:** Avoid hidden interactions. All actions visible via buttons.

---

## 4. MOBILE KEYBOARDS

### Input Types

| Field | Input Type | Keyboard |
|-------|------------|----------|
| Nomor WhatsApp | `type="tel"` | Numeric |
| Email | `type="email"` | Email (@ key) |
| Password | `type="password"` | Default |
| Harga | `inputmode="decimal"` | Numeric + decimal |
| Kode Pos | `inputmode="numeric"` | Numeric |
| Qty | `inputmode="numeric"` | Numeric |
| Search | `type="search"` | Default + search key |

### Auto-resize Textarea

```javascript
// Auto-resize behavior
textarea.style.height = 'auto';
textarea.style.height = `${textarea.scrollHeight}px`;
// Max height: 240px (10 lines), then scroll
```

### Form Scroll Behavior

- Keyboard open: scroll input to view (browser default usually OK)
- Submit button: above keyboard (sticky bottom, adjust for viewport)
- Form container: `scroll-padding-bottom: 300px` (space for keyboard)

---

## 5. MOBILE NAVIGATION PATTERNS

### Back Button

**Location:** Header left (replacing hamburger on inner pages)
**Behavior:** `history.back()` or navigate to logical parent
**Icon:** chevron-left 24x24px

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Detail Produk                 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Page Transition (Mobile)

```
- New page: slide-in from right (300ms ease-out)
- Old page: slide-out to left (300ms ease-out, slight fade)
- Back: reverse (new from left, old to right)
```

**Exception:** Detail produk transition (the "berani" moment â€” fade + scale, not slide).

### Drawer Menu (Hamburger)

```
Width: 280px
Background: #FFFFFF
Slide: from left, 300ms ease-out
Backdrop: rgba(0,0,0,0.4) + blur 4px
Close: X 44x44px or tap backdrop or swipe left
```

**Menu Content:**
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [X]                  â”‚
â”‚                      â”‚
â”‚ [Avatar]             â”‚
â”‚ Nama User            â”‚
â”‚ noWa                 â”‚
â”‚                      â”‚
â”‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€    â”‚
â”‚                      â”‚
â”‚ Beranda              â”‚
â”‚ Katalog              â”‚
â”‚ Cara Order           â”‚
â”‚ Lacak Pesanan        â”‚
â”‚ Ajukan PO            â”‚
â”‚                      â”‚
â”‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€    â”‚
â”‚                      â”‚
â”‚ Notifikasi    [3]    â”‚
â”‚ Profil               â”‚
â”‚ Logout               â”‚
â”‚                      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 6. STICKY CTA BAR (Mobile)

**Usage:** Detail produk, checkout, keranjang â€” pages with primary action.

### Detail Produk
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [+ Keranjang]            â”‚ [Beli Langsung]      â”‚
â”‚ secondary                â”‚ primary              â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
Height: 64px + safe area
Position: fixed bottom, above bottom nav (if present) or standalone
Background: #FFFFFF
Border-top: 1px solid #E8DCC8
Z-index: 9 (below bottom nav z-10)
```

**If Bottom Nav present:** CTA bar replaces bottom nav on this page (hide bottom nav, show CTA bar).

### Checkout
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Total: Rp 350.000                                 â”‚
â”‚ [Bayar Sekarang]                                 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
Height: 80px + safe area
Position: fixed bottom
```

---

## 7. MOBILE-SPECIFIC COMPONENTS

### Filter Button (Katalog Mobile)

```
Position: header right (replacing search on scroll)
Icon: filter 24px
Badge: count of active filters (18x18px, #C8102E)
Tap: open bottom sheet with filters
```

### Sort Dropdown (Mobile)

```
Position: below header (sticky, 48px height)
Layout: [Sort: Terbaru â–¼]  [View: â–¦]
Tap sort: open bottom sheet with sort options
Tap view: toggle grid (2-col â†” 1-col)
```

### Image Preview (Fullscreen)

```
Background: rgba(0,0,0,0.9)
Close: tap anywhere or X top-right
Pinch: zoom (optional)
Swipe: navigate images
```

---

## 8. MOBILE PERFORMANCE

### Image Optimization

```
Format: WebP (fallback JPEG)
Max dimension: 800x800px (retina = 1600x1600 source)
Compression: quality 80
Lazy load: below fold
Placeholder: skeleton shimmer (not generic spinner)
```

### List Virtualization

```
Katalog/riwayat with > 50 items:
- Implement react-window or similar
- Render only visible items + buffer
- Prevent DOM overload
```

### Font Loading

```
Inter: preload, font-display: swap
Noto Serif SC: preload critical weights only (500, 700)
Ma Shan Zheng: lazy load (only on pages that use it)
```

```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700&display=swap" />
```

---

## 9. MOBILE CHECKLIST

### Per Page

- [ ] Bottom nav present (xs/sm only)
- [ ] Sticky CTA bar (detail produk, checkout)
- [ ] Bottom sheet for filters/modals (mobile)
- [ ] Input types trigger correct keyboard
- [ ] Touch targets min 44x44px
- [ ] No horizontal scroll
- [ ] Images lazy loaded
- [ ] Font preloaded (Inter, Noto Serif SC)
- [ ] Safe area padding (iPhone notch)
- [ ] Pull to refresh (list pages)
- [ ] Swipe gestures (image gallery)
- [ ] Back button on inner pages
- [ ] Page transitions smooth
- [ ] No layout shift on load (skeleton loaders)



========================================
# FILE: responsive.md
========================================

# Responsive Design - Jastip China

Mobile-first approach. Setiap page harus dapat diakses dan fungsional di semua breakpoints.

---

## 1. BREAKPOINT STRATEGY

**Mobile-first:** Base styles untuk mobile, scale up dengan `min-width` media queries.

```css
/* Base: Mobile (0-639px) */
.component { /* mobile styles */ }

/* sm: 640px+ (mobile landscape) */
@media (min-width: 640px) { /* ... */ }

/* md: 768px+ (tablet) */
@media (min-width: 768px) { /* ... */ }

/* lg: 1024px+ (desktop) */
@media (min-width: 1024px) { /* ... */ }

/* xl: 1280px+ (desktop large) */
@media (min-width: 1280px) { /* ... */ }
```

| Breakpoint | Width | Device | Layout |
|------------|-------|--------|--------|
| xs | 0-639px | Mobile portrait | 1 column, bottom nav, hamburger |
| sm | 640-767px | Mobile landscape | 2 columns, bottom nav |
| md | 768-1023px | Tablet | 2-3 columns, top nav, no bottom nav |
| lg | 1024-1279px | Desktop small | 3-4 columns, top nav, full features |
| xl | 1280px+ | Desktop large | 4 columns, max-width container |

---

## 2. NAVIGATION RESPONSIVE

### Mobile (xs, sm: 0-767px)

**Header:**
```
Height: 56px
Layout: [â˜°] [Logo Center] [Cart Icon] [Avatar Icon]
Hamburger: 44x44px (left)
Logo: centered
Icons: 44x44px each (right)
```

**Menu:** Hamburger â†’ drawer slides from left
- Drawer width: 280px
- Backdrop: rgba(0,0,0,0.4) + blur 4px
- Close: X 44x44px or tap backdrop

**Bottom Navigation:**
```
[Home] [Catalog] [FAB +] [Cart] [Profile]
Height: 64px
Fixed bottom 0
5 items equal flex
FAB: 56x56px elevated circle (Chinese Red)
```

**Cart Badge:** Top-right of cart icon, 18x18px circle

### Tablet (md: 768-1023px)

**Header:**
```
Height: 64px
Layout: [Logo Left] [Nav Menu Center] [Cart + Avatar Right]
Nav visible (no hamburger)
No bottom navigation
```

### Desktop (lg+: 1024px+)

**Header:**
```
Height: 64px
Layout: [Logo Left] [Nav Menu Center] [Search + Cart + Avatar Right]
Search: visible in header (not icon-only)
```

---

## 3. GRID RESPONSIVE

### Beranda Grid

**Mobile (xs):** 1 column
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Unggulan â”‚ (2x height, full width)
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Produk 1 â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Produk 2 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Mobile landscape (sm):** 2 columns
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Unggulan â”‚          â”‚ (2x height, span 2 cols)
â”‚          â”‚          â”‚
â”‚          â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚          â”‚ Produk 2 â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Produk 3 â”‚ Produk 4 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

Wait, simpler: unggulan span 2 cols AND 2 rows on sm.
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚             â”‚ Produk 2 â”‚
â”‚  Unggulan   â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ (span 2x2)  â”‚ Produk 3 â”‚
â”‚             â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚             â”‚ Produk 4 â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Produk 5   â”‚ Produk 6 â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Tablet (md):** 3 columns
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚        â”‚        â”‚ P2     â”‚
â”‚Unggulanâ”‚        â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚(2x2)   â”‚        â”‚ P3     â”‚
â”‚        â”‚        â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚        â”‚        â”‚ P4     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ P5     â”‚ P6     â”‚ P7     â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Desktop (lg):** 4 columns
```
â”Œâ”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”
â”‚      â”‚ P2   â”‚ P3   â”‚ P4   â”‚
â”‚Ungg. â”‚â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”‚
â”‚(2x2) â”‚ P5   â”‚ P6   â”‚ P7   â”‚
â”‚      â”‚â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”‚
â”‚      â”‚ P8   â”‚ P9   â”‚ P10  â”‚
â””â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”˜
```

**Desktop large (xl):** 4 columns, max-width 1280px container

---

### Katalog Grid

No unggulan in katalog (all regular cards).

| Breakpoint | Columns |
|------------|---------|
| xs (mobile) | 1 (portrait) or 2 (landscape) |
| sm | 2 |
| md (tablet) | 3 |
| lg (desktop) | 4 |
| xl | 4 (max-width container) |

**Filter Sidebar:**
- Desktop (lg+): sidebar left, 256px width
- Tablet/Mobile: bottom sheet (swipe up) or drawer

---

## 4. DETAIL PRODUK RESPONSIVE

### Desktop (lg+: 1024px+)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                    â”‚                      â”‚
â”‚  Image Gallery     â”‚  Product Info        â”‚
â”‚  (60% width)       â”‚  (40% width, sticky)  â”‚
â”‚                    â”‚                      â”‚
â”‚  [Main Image]      â”‚  Nama Produk         â”‚
â”‚  [Thumb1] [Thumb2] â”‚  Rp 285.000          â”‚
â”‚                    â”‚  Varian: [Hitam]     â”‚
â”‚                    â”‚  Qty: [- 1 +]        â”‚
â”‚                    â”‚  [Keranjang] [Beli]  â”‚
â”‚                    â”‚                      â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Deskripsi Produk                         â”‚
â”‚  Terkait: [P1] [P2] [P3] [P4] â†’           â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Mobile (xs-sm: 0-767px)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Main Image]     â”‚ (swipeable gallery)
â”‚        â— â—‹ â—‹     â”‚ (dot indicators)
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Nama Produk      â”‚
â”‚ Rp 285.000       â”‚
â”‚ Varian: [Hitam]  â”‚
â”‚ Qty: [- 1 +]     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Deskripsi        â”‚
â”‚ (expandable)     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Terkait          â”‚
â”‚ (horizontal scroll)â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Keranjang] [Beli]â”‚ (fixed bottom, sticky)
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Sticky CTA bar mobile:** Bottom fixed, 2 buttons side-by-side, above bottom nav.

---

## 5. CHECKOUT RESPONSIVE

### Desktop (lg+)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                â”‚              â”‚
â”‚ Step 1: Alamat â”‚ Order Summaryâ”‚
â”‚ Step 2: Kurir  â”‚ (sticky)     â”‚
â”‚ Step 3: Confirmâ”‚              â”‚
â”‚                â”‚ Total: ...   â”‚
â”‚ [Back] [Next]  â”‚ [Bayar]      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Mobile

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Step 1            â”‚
â”‚ Step 2            â”‚ (stacked, 1 per screen)
â”‚ Step 3            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Summary (collapsed)â”‚
â”‚ Total: Rp 350.000â”‚
â”‚ [Bayar Sekarang] â”‚ (fixed bottom)
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

- Each step full screen
- Progress indicator at top
- Summary accessible via expandable section
- CTA button fixed at bottom

---

## 6. ADMIN RESPONSIVE

### Desktop (lg+: 1024px+)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Sidebar â”‚ Header                  â”‚
â”‚ (240px) â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚         â”‚ Content                 â”‚
â”‚         â”‚ (table, form, etc.)    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Tablet (md: 768-1023px)

- Sidebar: collapsible (default collapsed, 64px icon-only)
- Tap icon: expand to 240px overlay
- Content: full width

### Mobile (xs-sm: 0-767px)

- Sidebar: hidden (hamburger menu)
- Header: hamburger + page title + avatar
- Tables: horizontal scroll OR card layout
- Forms: single column

---

## 7. TABLE RESPONSIVE

### Desktop

Standard table layout:
```
| Kolom 1 | Kolom 2 | Kolom 3 | Aksi |
|---------|---------|---------|------|
| Data    | Data    | Data    | â‹¯   |
```

### Mobile

**Option A: Card layout (preferred for admin)**
```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Title: Data 1    â”‚
â”‚ Kolom 2: Data 2  â”‚
â”‚ Kolom 3: Data 3  â”‚
â”‚            [â‹¯]  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Option B: Horizontal scroll (for dense data)**
```
â† [Table with min-width 800px] â†’
```

---

## 8. FORM RESPONSIVE

### Desktop

- Labels: left-aligned, inline with input
- 2-column layout for short fields (nama + noWa)
- 1-column for long fields (alamat, deskripsi)

### Mobile

- Labels: top-aligned, above input
- All fields single column
- Inputs: full width
- Submit button: full width, fixed bottom or inline

---

## 9. IMAGE RESPONSIVE

### Product Images

| Context | Max Width | Aspect Ratio | Format |
|---------|-----------|--------------|--------|
| Grid card | 400x400 | 1:1 | WebP |
| Detail main | 800x800 | 1:1 | WebP |
| Thumbnail | 120x120 | 1:1 | WebP |
| Cart item | 80x80 | 1:1 | WebP |

**Loading:**
- Lazy load below fold
- Placeholder: skeleton shimmer
- `srcset` for responsive sizes

```html
<img
  src="/produk-400.webp"
  srcset="/produk-400.webp 400w, /produk-800.webp 800w"
  sizes="(max-width: 768px) 100vw, 400px"
  alt="Tas Backpack Premium"
  loading="lazy"
/>
```

---

## 10. TYPOGRAPHY RESPONSIVE

### Fluid Typography (clamp)

```css
h1 {
  font-size: clamp(32px, 5vw, 48px);
  line-height: clamp(40px, 6vw, 56px);
}
h2 {
  font-size: clamp(24px, 4vw, 32px);
  line-height: clamp(32px, 5vw, 40px);
}
h3 {
  font-size: clamp(20px, 3vw, 24px);
  line-height: clamp(28px, 4vw, 32px);
}
```

### Body Text

- Mobile: 16px (no scaling down â€” readability)
- Desktop: 16px (same, consistent)
- Small text: 14px (mobile), 14px (desktop)

**Rule:** Body text tidak pernah di bawah 14px (accessibility).

---

## 11. SPACING RESPONSIVE

| Token | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| Container H | 16px | 20px | 24px |
| Section gap | 32px | 40px | 48px |
| Grid gap | 16px | 20px | 24px |
| Card padding | 16px | 20px | 24px |

---

## 12. MODAL RESPONSIVE

### Desktop

- Width: 480px (max)
- Centered (horizontal + vertical)
- Backdrop blur

### Mobile

- Width: 90vw (max 480px)
- Bottom sheet style (slide from bottom)
- Swipe down to close

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚      â”â”â”          â”‚ (drag handle)
â”‚                  â”‚
â”‚  Modal Content   â”‚
â”‚                  â”‚
â”‚  [Batal] [OK]    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 13. RESPONSIVE CHECKLIST

### Per Page

- [ ] Mobile layout defined (xs)
- [ ] Tablet layout defined (md)
- [ ] Desktop layout defined (lg)
- [ ] Touch targets min 44x44px (mobile)
- [ ] No horizontal scroll (mobile)
- [ ] Images responsive (srcset, lazy load)
- [ ] Typography fluid (clamp) or breakpoint-based
- [ ] Grid adjusts columns per breakpoint
- [ ] Navigation adapts (hamburger â†’ top nav)
- [ ] Bottom nav (mobile) or top nav (desktop)
- [ ] Forms stack vertically (mobile)
- [ ] Tables transform (card layout or scroll)
- [ ] Modal adapts (bottom sheet mobile)
- [ ] Sticky CTA bar (mobile, above bottom nav)



============================================================
# INCLUDED FILE: batch-2-customer-revenue.md
============================================================

# BATCH 2: CUSTOMER REVENUE

Gabungan 9 file customer revenue screens untuk pen.dev

---



========================================
# FILE: 01-beranda.md
========================================

# Screen 01: Beranda (Homepage)

## Tujuan
Menampilkan grid produk sebagai elemen utama (BUKAN SaaS landing page). Customer langsung lihat produk yang dijual, bisa add to cart, atau explore kategori.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”            â”‚
â”‚  â”‚                  â”‚  â”‚          â”‚  â”‚          â”‚            â”‚
â”‚  â”‚                  â”‚  â”‚ Produk 2 â”‚  â”‚ Produk 3 â”‚            â”‚
â”‚  â”‚  PRODUK UNGGULAN â”‚  â”‚          â”‚  â”‚          â”‚            â”‚
â”‚  â”‚  (2x2 size)      â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜            â”‚
â”‚  â”‚                  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”            â”‚
â”‚  â”‚  Rp 282.000      â”‚  â”‚          â”‚  â”‚          â”‚            â”‚
â”‚  â”‚  [Ready Stock]   â”‚  â”‚ Produk 4 â”‚  â”‚ Produk 5 â”‚            â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚          â”‚  â”‚          â”‚            â”‚
â”‚                         â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜            â”‚
â”‚                                                                â”‚
â”‚  â”€â”€â”€â”€ cloud pattern border (5% opacity) â”€â”€â”€â”€                 â”‚
â”‚                                                                â”‚
â”‚  Kategori: [Tas] [Sepatu] [Aksesoris] [Elektronik] [Fashion]â”‚
â”‚                                                                â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]    [Jastip China] [ðŸ›’]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚  é²œè´§ç›´è¾¾                  â”‚ â† brush script tagline
â”‚  Barang China, sampai     â”‚
â”‚  pintu rumah               â”‚
â”‚                            â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                      â”‚ â”‚
â”‚  â”‚   PRODUK UNGGULAN    â”‚ â”‚ â† full width, 2x height
â”‚  â”‚   (full width, 2x)   â”‚ â”‚
â”‚  â”‚                      â”‚ â”‚
â”‚  â”‚   Rp 282.000         â”‚ â”‚
â”‚  â”‚   [Ready Stock]      â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ Produk 2              â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ Produk 3              â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚ â† bottom nav
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header (Navigation Bar)

- **Purpose:** Brand identity + primary navigation + quick actions
- **Content:**
  - Logo: "Jastip China" (Noto Serif SC 700, 24px, Chinese Red)
  - Menu: Beranda (active), Katalog, Cara Order, Lacak Pesanan
  - Actions: Search icon, Cart icon (with badge count), Avatar/Login
- **Components:** Navigation Bar (Desktop) from components.md
- **Spacing:** Height 64px, padding 0 24px
- **Responsive:** Mobile â†’ hamburger left, logo center, cart right
- **State:**
  - Logged out: "Login" text link (Chinese Red)
  - Logged in: Avatar circle 36x36px + dropdown
  - Cart badge: show if count > 0

### Section 2: Hero Banner (Minimal, NOT SaaS)

- **Purpose:** Brand tagline + set Chinese aesthetic tone (BUKAN marketing CTA)
- **Content:**
  - Tagline Chinese: "é²œè´§ç›´è¾¾" (Ma Shan Zheng, 32px, Chinese Red)
  - Tagline ID: "Barang China, sampai pintu rumah" (Inter 400, 16px, #6B5D52)
- **Layout:** Center-left aligned, padding 48px 24px 32px
- **Background:** Plain #FAF8F3 (NO gradient, NO decorative image)
- **Mobile:** Same, padding 32px 16px 24px
- **ANTI-PATTERN:** NO "BELANJA SEKARANG" button, NO hero image, NO gradient

### Section 3: Grid Produk Utama

- **Purpose:** Show products immediately (e-commerce focus)
- **Content:** 6-8 produk (1-2 unggulan, 5-6 regular)
- **Data:** Produk unggulan = stok > 10 + harga menarik, diurutkan by popularity
- **Components:** Card Produk (Regular + Unggulan) from components.md
- **Layout (Desktop, 4 col):**
  ```
  Grid: CSS Grid, grid-template-columns: repeat(4, 1fr)
  Unggulan: grid-column: span 2, grid-row: span 2
  Gap: 24px
  ```
- **Layout (Tablet, 3 col):**
  ```
  grid-template-columns: repeat(3, 1fr)
  Unggulan: span 2, span 2
  Gap: 20px
  ```
- **Layout (Mobile, 1 col):**
  ```
  grid-template-columns: 1fr
  Unggulan: span 1 (full width), tetap 2x height
  Gap: 16px
  ```
- **Spacing:** Margin top 0 (directly after hero), margin bottom 48px

### Section 4: Cloud Pattern Divider

- **Purpose:** Subtle Chinese decorative element (separator)
- **Content:** SVG cloud pattern (ç¥¥äº‘), opacity 5%, Chinese Red or Gold
- **Layout:** Full width, height 20px, margin 0
- **Mobile:** Same, height 16px
- **ANTI-PATTERN:** NO busy pattern, NO large decorative image

### Section 5: Kategori Quick Access

- **Purpose:** Quick filter by category
- **Content:** 5 buttons (Tas, Sepatu, Aksesoris, Elektronik, Fashion)
- **Layout (Desktop):** Horizontal row, center, 12px gap
- **Layout (Mobile):** Horizontal scroll, snap, 8px gap
- **Component:** Ghost button variant, padding 8px 16px
- **Behavior:** Click â†’ navigate to `/katalog?kategori=[nama]`
- **Active state:** Background rgba(200,16,46,0.1), text Chinese Red

### Section 6: Footer

- **Purpose:** Brand info, navigation, contact
- **Content:** 4 columns (Logo+Desc, Navigasi, Bantuan, Kontak)
- **Background:** #2C1810 (ink dark)
- **Text color:** #FAF8F3 (cream)
- **Top border:** Cloud pattern (5% opacity, Gold)
- **Mobile:** Stack vertical, padding 32px 16px + 64px bottom (space for bottom nav)

---

## States

### Loading State
- Show 6-8 skeleton card loaders (shimmer animation)
- Unggulan skeleton: 2x size, same shimmer
- Header + footer rendered normally
- Duration: max 2 seconds (skeleton â†’ real content fade 200ms)

### Error State
- Title: "Gagal memuat produk" (Noto Serif SC 500, 24px)
- Description: "Server lagi bermasalah. Coba refresh atau hubungi admin via WA." (Inter 400, 14px)
- CTA: "Coba Lagi" button (primary)
- Illustration: simple line icon (cloud with X)

### Empty State (No Products)
- Title: "Katalog masih kosong" (Noto Serif SC 500, 20px)
- Description: "Produk lagi disiapin. Coba cek lagi nanti ya." (Inter 400, 14px)
- No CTA (just wait)

---

## Interactions

### Card Produk Click
- Click anywhere on card â†’ navigate to `/produk/[id]`
- Cursor: pointer
- Hover: border #C8102E, shadow subtle (200ms ease-out)
- NO scale transform

### Kategori Button Click
- Click â†’ navigate to `/katalog?kategori=Tas`
- Active state: background rgba(200,16,46,0.1)

### Cart Icon Click
- Click â†’ navigate to `/keranjang`
- Badge count: from API, update via Context

### Search Icon Click
- Desktop: expand search bar inline (width 0 â†’ 240px, 300ms)
- Mobile: navigate to `/katalog` with search focus

---

## Edge Cases

### Nama Produk Panjang
- Max 2 lines, ellipsis "..." if overflow
- CSS: `line-clamp: 2`
- Example: "Tas Backpack Premium Kulit Sintetis Anti Air..." (truncated)

### Harga Jutaan
- Format: "Rp 1.250.000" (dot separator)
- Font: Noto Serif SC 700, 20px (regular) / 28px (unggulan)
- Color: Gold #D4AF37 (large) / #B5941F (small, for AA contrast)

### Stok Rendah
- Badge: "Stok Terbatas" if stok < 5
- Badge color: Chinese Red (urgent)
- Text: "Sisa 3 biji" below price (Inter 400, 12px, #9B4D50)

### Stok Habis
- Card opacity: 60%
- Badge: "Stok Habis" (grey background #6B5D52)
- No add to cart button (or disabled)
- Hover: no shadow, cursor: not-allowed

### Gambar Produk Hilang
- Fallback: placeholder image (simple line icon, bag shape)
- Background: #F7F3EC
- Text: "Gambar tidak tersedia" (12px, #6B5D52)

---

## WHAT NOT TO DO (Anti-Patterns for Beranda)

1. âŒ NO hero banner besar dengan "BELANJA PRODUK CHINA" + gradient + CTA button
2. âŒ NO "OUR PRODUCTS" / "PRODUK KAMI" label ALL-CAPS di atas grid
3. âŒ NO "â†’" di tombol "Lihat Semua Produk"
4. âŒ NO grid seragam semua card ukuran sama
5. âŒ NO shadow di setiap card default (border only, shadow on hover)
6. âŒ NO "Trusted by" logo strip
7. âŒ NO feature cards with icons (Cepat, Aman, Murah)
8. âŒ NO counter animation on numbers
9. âŒ NO fade-in-up on scroll for grid section
10. âŒ NO "01/02/03" decorative numbers

---

## Copy (Realistic Content)

### Tagline
```
é²œè´§ç›´è¾¾
Barang China, sampai pintu rumah
```

### Kategori Buttons
```
Tas
Sepatu
Aksesoris
Elektronik
Fashion
```

### Footer
```
Logo: Jastip China
Tagline: Jastip China - jasa titip barang China terpercaya. Barang asli, harga bersahabat, sampai depan pintu rumah.

Navigasi:
- Beranda
- Katalog
- Cara Order
- Lacak Pesanan
- Ajukan PO

Bantuan:
- FAQ
- Kebijakan Privasi
- Syarat & Ketentuan
- Kebijakan Refund

Kontak:
- WhatsApp: 0812-0000-0000
- Email: hello@jastipchina.id
- Jam: Senin-Sabtu, 09:00-18:00 WIB

Copyright: Â© 2024 Jastip China. All rights reserved.
```



========================================
# FILE: 02-katalog.md
========================================

# Screen 02: Katalog (Catalog Page)

## Tujuan
Customer browse produk dengan filter kategori, sort, dan pagination. Grid seragam (no unggulan).

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚          â”‚  â”‚ Sort: [Terbaru â–¼]     View: [â–¦]            â”‚ â”‚
â”‚  â”‚  FILTER  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚          â”‚  â”‚                                              â”‚ â”‚
â”‚  â”‚ Kategori â”‚  â”‚  â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”             â”‚ â”‚
â”‚  â”‚ â˜ Tas    â”‚  â”‚  â”‚ P1 â”‚ â”‚ P2 â”‚ â”‚ P3 â”‚ â”‚ P4 â”‚             â”‚ â”‚
â”‚  â”‚ â˜ Sepatu â”‚  â”‚  â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜             â”‚ â”‚
â”‚  â”‚ â˜ Akses  â”‚  â”‚  â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”             â”‚ â”‚
â”‚  â”‚          â”‚  â”‚  â”‚ P5 â”‚ â”‚ P6 â”‚ â”‚ P7 â”‚ â”‚ P8 â”‚             â”‚ â”‚
â”‚  â”‚ Harga    â”‚  â”‚  â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”˜             â”‚ â”‚
â”‚  â”‚ [slider] â”‚  â”‚                                              â”‚ â”‚
â”‚  â”‚          â”‚  â”‚  [â† Prev]  1 2 3  [Next â†’]                â”‚ â”‚
â”‚  â”‚ Stok     â”‚  â”‚                                              â”‚ â”‚
â”‚  â”‚ â˜ Ready â”‚  â”‚                                              â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Katalog       [Filter] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Sort: Terbaru â–¼]          â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚   P1    â”‚  â”‚   P2    â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚   P3    â”‚  â”‚   P4    â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Load Lainnya]            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Bottom Sheet Filter saat tombol Filter ditekan):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  â”â”â” (drag handle)        â”‚
â”‚                      [X]  â”‚
â”‚  Filter                   â”‚
â”‚                           â”‚
â”‚  Kategori                 â”‚
â”‚  â˜ Tas  â˜ Sepatu          â”‚
â”‚  â˜ Aksesoris              â”‚
â”‚                           â”‚
â”‚  Rentang Harga            â”‚
â”‚  [slider]                 â”‚
â”‚                           â”‚
â”‚  Status Stok              â”‚
â”‚  â˜ Ready Stock only      â”‚
â”‚                           â”‚
â”‚  [Reset]      [Terapkan]  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- **Same as Beranda**, but "Katalog" menu is active
- Mobile: back button (â†) replaces hamburger, title "Katalog" center

### Section 2: Filter Sidebar (Desktop)
- **Purpose:** Filter produk by kategori, harga, stok
- **Layout:** Left sidebar, 256px width, sticky
- **Content:**
  - **Kategori:** Checkbox list (Tas, Sepatu, Aksesoris, Elektronik, Fashion)
  - **Harga:** Range slider (min-max, Rp 30.000 - Rp 300.000)
  - **Stok:** Checkbox "Ready Stock only"
- **Components:** Checkbox, Range Slider (custom)
- **Behavior:**
  - Filter change â†’ update URL query â†’ fetch new data (replace, not append)
  - Active filter count badge on mobile "Filter" button

### Section 2 (Mobile): Filter Bottom Sheet
- **Trigger:** "Filter" button in header right (with badge count)
- **Layout:** Bottom sheet (from mobile-patterns.md)
- **Content:** Same as desktop sidebar, stacked vertical
- **Close:** Swipe down, X button, or "Terapkan" button

### Section 3: Sort & View Toolbar
- **Purpose:** Sort results, toggle grid view
- **Layout:** Horizontal bar, 48px height, border-bottom 1px #E8DCC8
- **Content:**
  - Left: Sort dropdown (Terbaru, Harga Terendah, Harga Tertinggi, Popularitas)
  - Right (desktop): View toggle (grid 4-col / list)
  - Right (mobile): View toggle (2-col / 1-col)
- **Behavior:** Sort change â†’ update URL query â†’ fetch new data

### Section 4: Grid Produk
- **Layout (Desktop):** 4 columns, gap 24px
- **Layout (Tablet):** 3 columns, gap 20px
- **Layout (Mobile portrait):** 2 columns, gap 16px
- **Layout (Mobile landscape):** 2-3 columns
- **Components:** Card Produk (Regular only, NO unggulan)
- **Spacing:** Margin top 16px (from toolbar)

### Section 5: Pagination (Desktop)
- **Layout:** Center, margin top 48px
- **Content:** Prev/Next buttons + page numbers
- **Style:**
  - Button: 40x40px, border 1px #E8DCC8, radius 8px
  - Active: background #C8102E, text white
  - Disabled: opacity 50%
- **Behavior:** Click page â†’ update URL `?page=X` â†’ fetch + scroll to top

### Section 5 (Mobile): Load More
- **Layout:** Center, margin top 32px
- **Content:** "Muat Lainnya" button (secondary, full width)
- **Behavior:** Click â†’ append new products to grid (infinite scroll alternative)

### Section 6: Footer
- Same as Beranda

---

## States

### Loading State (Initial)
- Show 8-12 skeleton cards in grid
- Toolbar rendered (but sort/view disabled)
- Filter sidebar rendered (but inputs disabled)

### Loading State (Filter/Sort Change)
- Show skeleton only in grid area (not full page)
- Keep current filter/sidebar visible
- Overlay subtle opacity 0.6 on grid

### Empty State (No Results)
- Title: "Nggak ketemu produknya" (Noto Serif SC 500, 20px)
- Description: "Coba kata kunci lain, atau cek kategori." (Inter 400, 14px)
- CTA: "Reset Filter" button (secondary)
- Illustration: simple line icon (magnifying glass with X)

### Error State
- Same as Beranda error state, but in grid area

---

## Interactions

### Filter Change
- Checkbox toggle â†’ update URL query â†’ fetch new data
- No debounce needed (user action explicit)
- Show loading state in grid area only

### Sort Change
- Dropdown select â†’ update URL query â†’ fetch new data
- Preserve current filters in URL

### Pagination
- Click page â†’ scroll to top of grid smoothly â†’ fetch new data
- URL: `/katalog?page=2&kategori=Tas&sort=price-asc`

### URL Synchronization
- All filter/sort/page state in URL (shareable, back-button friendly)
- Parse URL on mount â†’ initialize filter state

---

## Edge Cases

### Banyak Produk (>100)
- Desktop: pagination (12 per page)
- Mobile: load more + lazy load images
- Max page buttons shown: 5 (current Â± 2)

### Filter Kombinasi Tidak Ada Hasil
- Show empty state
- Suggest: "Coba hapus salah satu filter"

### Harga Range Invalid (min > max)
- Auto-swap values
- Or disable "Terapkan" button

---

## WHAT NOT TO DO

1. âŒ NO unggulan card in katalog (all regular, uniform grid)
2. âŒ NO "OUR PRODUCTS" / "KATALOG KAMI" label ALL-CAPS
3. âŒ NO "â†’" in pagination buttons
4. âŒ NO modal for filter (use bottom sheet on mobile, sidebar on desktop)
5. âŒ NO infinite scroll without "Load More" fallback (accessibility)
6. âŒ NO fade-in animation on every new card load
7. âŒ NO separate "Search" page (search integrated in katalog)

---

## Copy

### Page Title (H1)
```
Katalog
```

### Sort Options
```
Terbaru
Harga Terendah
Harga Tertinggi
Popularitas
```

### Filter Labels
```
Kategori
Rentang Harga
Status Stok
Ready Stock only
```

### Empty State
```
Nggak ketemu produknya
Coba kata kunci lain, atau cek kategori.
[Reset Filter]
```

### Pagination
```
Sebelumnya
Selanjutnya
Halaman {X} dari {Y}
```

### Load More (Mobile)
```
Muat Lainnya
```



========================================
# FILE: 03-detail-produk.md
========================================

# Screen 03: Detail Produk

## Tujuan
Customer lihat detail produk, pilih varian, tentukan qty, add to cart atau beli langsung. **Ini adalah momen "berani" satu-satunya** yang boleh ada animasi transisi.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Home / Katalog / Tas / Tas Backpack Premium  (breadcrumb)   â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                          â”‚  â”‚ Tas Backpack Premium      â”‚ â”‚
â”‚  â”‚                          â”‚  â”‚                            â”‚ â”‚
â”‚  â”‚    MAIN IMAGE            â”‚  â”‚ Rp 282.000                â”‚ â”‚
â”‚  â”‚    (1:1, large)          â”‚  â”‚                            â”‚ â”‚
â”‚  â”‚                          â”‚  â”‚ [Ready Stock]              â”‚ â”‚
â”‚  â”‚                          â”‚  â”‚ Stok: 15 biji              â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤  â”‚                            â”‚ â”‚
â”‚  â”‚ [thumb1] [thumb2] [thumb3]â”‚  â”‚ Varian:                   â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚ (â—‹) Hitam (stok 10)       â”‚ â”‚
â”‚                                â”‚ (â—‹) Coklat (stok 5)       â”‚ â”‚
â”‚                                â”‚                            â”‚ â”‚
â”‚                                â”‚ Jumlah:                   â”‚ â”‚
â”‚                                â”‚ [- 1 +]                    â”‚ â”‚
â”‚                                â”‚                            â”‚ â”‚
â”‚                                â”‚ Subtotal: Rp 282.000       â”‚ â”‚
â”‚                                â”‚                            â”‚ â”‚
â”‚                                â”‚ [+ Tambah ke Keranjang]    â”‚ â”‚
â”‚                                â”‚ [Beli Langsung]            â”‚ â”‚
â”‚                                â”‚                            â”‚ â”‚
â”‚                                â”‚ Estimasi sampai: 7-14 hari â”‚ â”‚
â”‚                                â”‚ Berat: 800g                â”‚ â”‚
â”‚                                â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Deskripsi Produk                                             â”‚
â”‚  Tas backpack bahan kulit sintetis premium. Kapasitas 20L,   â”‚
â”‚  cocok buat laptop 15 inch. Resisten air, strap kuat...     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Produk Terkait                                              â”‚
â”‚  [P1] [P2] [P3] [P4] [P5] â†’   (horizontal scroll)            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]                  [â™¡] [ðŸ›’]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚   â”‚                      â”‚ â”‚
â”‚   â”‚   MAIN IMAGE         â”‚ â”‚ (swipeable gallery)
â”‚   â”‚   (1:1, full width)  â”‚ â”‚
â”‚   â”‚                      â”‚ â”‚
â”‚   â”‚         â— â—‹ â—‹        â”‚ â”‚ (dot indicators)
â”‚   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚  Tas Backpack Premium      â”‚ â† H1
â”‚  Rp 282.000                â”‚ â† price (gold)
â”‚                            â”‚
â”‚  [Ready Stock]  Stok: 15   â”‚
â”‚                            â”‚
â”‚  Varian:                   â”‚
â”‚  (â—‹) Hitam (stok 10)       â”‚
â”‚  (â—‹) Coklat (stok 5)       â”‚
â”‚                            â”‚
â”‚  Jumlah: [- 1 +]           â”‚
â”‚                            â”‚
â”‚  Deskripsi                 â”‚
â”‚  Tas backpack bahan kulit  â”‚
â”‚  sintetis premium...       â”‚
â”‚  [Lihat Selengkapnya â–¼]    â”‚ (expandable)
â”‚                            â”‚
â”‚  Produk Terkait            â”‚
â”‚  [P1] [P2] [P3] [P4] â†’     â”‚ (horizontal scroll)
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[+ Keranjang] [Beli Langsung]â”‚ â† sticky CTA bar
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚ â† bottom nav (hidden if CTA bar)
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Breadcrumb (Desktop only)
- **Purpose:** Navigation context
- **Content:** Home / Katalog / [Kategori] / [Nama Produk]
- **Layout:** Top, margin 16px 24px
- **Mobile:** Hidden (back button sufficient)

### Section 2: Image Gallery
- **Purpose:** Show product images, allow zoom/switch
- **Layout (Desktop):** Left column, 60% width
- **Layout (Mobile):** Full width, swipeable
- **Components:**
  - Main image: 1:1 aspect ratio, object-cover, radius 12px top
  - Thumbnail strip (desktop): below main, horizontal, 4-5 thumbnails
  - Dot indicators (mobile): below main, center
- **Interaction:**
  - Thumbnail click â†’ main image change (fade 200ms)
  - Swipe (mobile) â†’ next/prev image (300ms ease-out)
  - Pinch zoom (optional)
- **State:**
  - Active thumbnail: border 2px #C8102E
  - Inactive: border 1px #E8DCC8

### Section 3: Product Info (Sticky Desktop)
- **Purpose:** Buying decision info + actions
- **Layout (Desktop):** Right column, 40% width, position sticky top 80px
- **Content:**
  - **Nama Produk:** H1 (Noto Serif SC 700, 32px desktop / 24px mobile)
  - **Harga:** Rp 282.000 (Noto Serif SC 700, 28px, gold #D4AF37)
  - **Badge:** "Ready Stock" (gold bg, white text)
  - **Stok:** "Stok: 15 biji" (Inter 400, 14px, #6B5D52)
  - **Varian:** Radio group (Hitam, Coklat), with stok per varian
  - **Qty:** Stepper (- 1 +)
  - **Subtotal:** Calculated (harga Ã— qty)
  - **CTA:** "Tambah ke Keranjang" (secondary) + "Beli Langsung" (primary)
  - **Meta:** Estimasi sampai (7-14 hari), Berat (800g)

### Section 4: Deskripsi
- **Purpose:** Detailed product info
- **Layout:** Full width, margin top 48px
- **Content:** Text paragraph, bullet specs
- **Mobile:** Expandable ("Lihat Selengkapnya" â†’ expand, "Sembunyikan" â†’ collapse)
- **Desktop:** Always expanded

### Section 5: Produk Terkait
- **Purpose:** Cross-sell, keep user engaged
- **Layout:** Horizontal scroll, margin top 48px
- **Content:** 5-10 produk from same kategori
- **Components:** Card Produk (Regular, compact size)
- **Mobile:** Horizontal scroll, snap, 140px width per card

### Section 6: Sticky CTA Bar (Mobile)
- **Purpose:** Always-accessible buy actions
- **Layout:** Fixed bottom, 64px height + safe area
- **Content:** "Tambah ke Keranjang" (secondary, flex-1) + "Beli Langsung" (primary, flex-1)
- **Behavior:** Replaces bottom nav on this page (hide bottom nav, show CTA bar)
- **Background:** #FFFFFF, border-top 1px #E8DCC8, shadow 0 -2px 8px rgba(0,0,0,0.08)

---

## States

### Loading State
- Image: skeleton shimmer (1:1 box)
- Info: skeleton lines (title, price, buttons)
- Use the "berani" transition: fade-in real content (400ms)

### Error State (Product Not Found)
- 404 page: "Produk nggak ketemu" (H1)
- "Mungkin udah dihapus atau stoknya habis." (description)
- CTA: "Kembali ke Katalog"

### Varian Not Selected
- "Beli Langsung" button disabled
- Tooltip: "Pilih varian dulu ya"
- Radio group: border 1px #9B4D50 (subtle error indicator)

### Stok Habis
- Harga: strikethrough
- Badge: "Stok Habis" (grey)
- Buttons: disabled, opacity 50%
- Text: "Produk lagi kosong. Coba lain kali."

---

## Interactions

### THE "Berani" Moment: Page Transition

**Trigger:** User clicks card produk (from beranda/katalog) â†’ navigate to detail

**Animation:**
1. Card image slightly scale (1.0 â†’ 1.02, 200ms ease-out)
2. Page fade-out (200ms)
3. New page load: detail image fade-in + slight scale (0.98 â†’ 1.0, 400ms ease-out)
4. Content below: subtle slide-up (8px, 300ms, staggered 50ms)

**This is the ONLY allowed scroll/page animation.**

### Varian Selection
- Radio click â†’ update selected state (instant)
- Stok label update per varian (instant)
- Subtotal recalculate if qty > 1 (instant)

### Qty Stepper
- Button press: scale(0.95) snap, release scale(1.0) (100ms)
- Number change: instant
- Max: stok limit (button disabled if reached)
- Min: 1 (minus disabled if qty = 1)

### Add to Cart
- Button click â†’ API call
- Loading: spinner replace text (200ms min display)
- Success: toast "Tas Backpack Premium masuk keranjang" (5s)
- Cart badge count +1 (animate: scale 1.0 â†’ 1.2 â†’ 1.0, 300ms)

### Beli Langsung
- Button click â†’ if varian not selected, show tooltip
- If selected â†’ navigate to `/checkout?produk=[id]&varian=[id]&qty=[qty]` (skip cart)

---

## Edge Cases

### Multiple Varian (5+)
- Desktop: radio group vertical, scroll if > 5 (max height 200px)
- Mobile: same, scrollable

### No Varian
- Hide varian section
- Direct qty selection + CTA

### Harga Berubah (Snapshot)
- Harga displayed: current product price
- Note: "Harga final dihitung saat checkout" (helper text, 12px)

### Deskripsi Panjang
- Desktop: full text, max width 720px
- Mobile: expandable, max 3 lines collapsed

### Gambar Hanya 1
- Hide thumbnail strip (desktop) / dot indicators (mobile)

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in CTA buttons
2. âŒ NO "OUR PRODUCTS" / "PRODUK TERKAIT" label ALL-CAPS
3. âŒ NO modal for varian selection (inline radio group)
4. âŒ NO image carousel auto-rotate
5. âŒ NO "Customers also bought" popup/modal
6. âŒ NO countdown timer "Flash Sale ends in 02:34:56"
7. âŒ NO review/rating section (MVP scope, backlog)
8. âŒ NO "Add to Wishlist" as primary button (it's secondary, icon only)

---

## Copy

### Page Title (H1)
```
[Nama Produk]
Example: Tas Backpack Premium Kulit Sintetis
```

### Price
```
Rp 282.000
```

### Badge
```
Ready Stock
```

### Varian
```
Varian:
(â—‹) Hitam (stok 10)
(â—‹) Coklat (stok 5)
```

### CTA Buttons
```
Tambah ke Keranjang
Beli Langsung
```

### Meta
```
Estimasi sampai: 7-14 hari setelah verifikasi
Berat: 800g
```

### Deskripsi (Expandable Mobile)
```
[Lihat Selengkapnya â–¼]
[Sembunyikan â–²]
```

### Stok Habis
```
Stok Habis
Produk lagi kosong. Coba lain kali.
```

### Terkait
```
Produk Terkait
```

### Toast (Add to Cart Success)
```
{namaProduk} masuk keranjang
```

### Varian Not Selected Tooltip
```
Pilih varian dulu ya
```



========================================
# FILE: 04-keranjang.md
========================================

# Screen 04: Keranjang (Cart)

## Tujuan
Customer review items sebelum checkout, update qty, hapus item, lihat estimasi biaya.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Keranjang Belanja                                            â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                                    â”‚  â”‚ Ringkasan       â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”  Tas Backpack Premium       â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Varian: Hitam              â”‚  â”‚ Subtotal (2):    â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Rp 282.000                 â”‚  â”‚ Rp 317.250       â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”˜  [- 1 +]  [Hapus]          â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ Jasa Titip (10%):â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”  Kaos Oversized              â”‚  â”‚ Rp 31.725        â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Varian: Size L Hitam       â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Rp 35.250                  â”‚  â”‚ Ongkir Domestik: â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”˜  [- 1 +]  [Hapus]          â”‚  â”‚ (dihitung saat   â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚  checkout)      â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”  Dompet Kulit Asli          â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Varian: Coklat             â”‚  â”‚ Total Estimasi:  â”‚ â”‚
â”‚  â”‚  â”‚  â”‚  Rp 223.250                 â”‚  â”‚ Rp 349.000       â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”˜  [- 1 +]  [Hapus]          â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ [Checkout]       â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Keranjang            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ â”Œâ”€â”€â” Tas Backpack       â”‚ â”‚
â”‚ â”‚ â”‚  â”‚ Premium             â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”˜ Varian: Hitam      â”‚ â”‚
â”‚ â”‚       Rp 282.000         â”‚ â”‚
â”‚ â”‚       [- 1 +]    [Hapus] â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ â”Œâ”€â”€â” Kaos Oversized     â”‚ â”‚
â”‚ â”‚ â”‚  â”‚                     â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”˜ Varian: Size L      â”‚ â”‚
â”‚ â”‚       Rp 35.250          â”‚ â”‚
â”‚ â”‚       [- 1 +]    [Hapus] â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Subtotal: Rp 317.250      â”‚ â† sticky summary
â”‚ [Checkout]                â”‚ (fixed bottom)
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Empty State):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Keranjang            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚        [icon: empty cart]  â”‚
â”‚                            â”‚
â”‚   Keranjang masih kosong  â”‚
â”‚   Yuk lihat katalog,       â”‚
â”‚   siapa tau ada yang       â”‚
â”‚   menarik.                 â”‚
â”‚                            â”‚
â”‚   [Lihat Katalog]         â”‚
â”‚                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Same as other pages, but no active menu (or "Keranjang" active if it's a menu item)
- Mobile: back button (â†), title "Keranjang"

### Section 2: Page Title
- **Content:** "Keranjang Belanja" (H1, Noto Serif SC 700, 32px desktop / 24px mobile)
- **Layout:** Margin 32px top, 24px bottom

### Section 3: Item List (Left Column Desktop)
- **Purpose:** List cart items with controls
- **Layout (Desktop):** Left column, 60% width
- **Layout (Mobile):** Full width, stack vertical
- **Item Card:**
  ```
  Layout: horizontal (image left, info right)
  Image: 80x80px (mobile) / 100x100px (desktop), radius 8px, object-cover
  Info:
    - Nama (Noto Serif SC 500, 18px desktop / 16px mobile)
    - Varian (Inter 400, 14px, #6B5D52)
    - Harga satuan (Noto Serif SC 700, 16px, gold #B5941F for AA)
    - Qty stepper + Hapus button (right aligned)
  Padding: 16px
  Border: 1px solid #E8DCC8
  Radius: 12px
  Gap between items: 12px
  ```

### Section 4: Ringkasan Order (Right Column Desktop, Sticky)
- **Purpose:** Cost breakdown + checkout CTA
- **Layout (Desktop):** Right column, 40% width, sticky top 80px
- **Content:**
  - Subtotal produk (count Ã— price)
  - Biaya jasa titip (10% dari subtotal, min Rp 15.000)
  - Ongkir domestik (placeholder text, belum dihitung)
  - Total Estimasi (subtotal + jasa titip, ongkir TBD)
  - Checkout button (primary, full width)
- **Layout (Mobile):** Sticky bottom bar (not sidebar)

### Section 5: Empty State
- **Trigger:** Cart has 0 items
- **Content:**
  - Illustration: empty cart line icon (120x120px, #E8DCC8)
  - Title: "Keranjang masih kosong" (Noto Serif SC 500, 20px)
  - Desc: "Yuk lihat katalog, siapa tau ada yang menarik." (Inter 400, 14px)
  - CTA: "Lihat Katalog" (primary button)

---

## States

### Loading State
- Show skeleton item cards (3-4 placeholder)
- Skeleton summary box

### Error State
- Title: "Gagal memuat keranjang"
- Desc: "Coba refresh halaman, atau hubungi admin via WA."
- CTA: "Coba Lagi"

### Item Removed (Undo)
- Toast: "Tas Backpack dihapus dari keranjang" + "Undo" link (5s)
- If undo clicked: item restored, qty preserved

### Qty Update Failure
- Toast error: "Gagal update jumlah. Stok mungkin berubah."
- Revert qty to previous value
- Refresh cart data

---

## Interactions

### Qty Update
- Stepper button click â†’ API call (debounce 500ms)
- Optimistic update: UI change instant, API call background
- If fail: revert + toast error
- Max: stok limit (disable + button)

### Hapus Item
- Click "Hapus" â†’ confirm modal: "Hapus item ini dari keranjang?"
- Confirm â†’ API delete â†’ item removed (fade-out 200ms)
- Show undo toast (5s)

### Checkout
- Click "Checkout" â†’ navigate to `/checkout`
- If cart empty (edge): disable button, toast "Keranjang masih kosong"

### Sticky Summary (Mobile)
- Always visible at bottom
- Shows: subtotal + Checkout button
- Expandable: tap to see full breakdown (bottom sheet)

---

## Edge Cases

### Stok Berubah (Product now has less stock)
- On load: check each item vs current stok
- If qty > stok: badge "Stok berubah" on item
- Auto-adjust qty to stok limit
- Toast: "Stok Tas Backpack berubah jadi 10. Qty disesuaikan."

### Product Nonaktif (status NONAKTIF)
- Item card: opacity 60%
- Badge: "Produk tidak tersedia"
- Hapus button: still works
- Checkout: blocked if any item nonaktif, toast "Hapus produk tidak tersedia dulu"

### Varian Hapus
- If varian deleted: same as product nonaktif
- Badge: "Varian tidak tersedia"

### Harga Berubah
- Display current price (not snapshot)
- Toast on load: "Harga beberapa produk udah berubah" (if any diff)

### Very Long Item List (20+)
- Desktop: scroll within left column (max-height)
- Mobile: normal scroll, summary stays sticky

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in Checkout button
2. âŒ NO "PROCEED TO CHECKOUT" (too formal, use "Checkout")
3. âŒ NO modal for qty update (inline stepper)
4. âŒ NO auto-navigate to checkout on item add (let user decide)
5. âŒ NO "You might also like" section
6. âŒ NO forced login to view cart (allow guest cart, prompt login at checkout)
7. âŒ NO stale price (always show current, not cached)

---

## Copy

### Page Title (H1)
```
Keranjang Belanja
```

### Item Info
```
[namaProduk]
Varian: [namaVarian]
Rp [hargaSatuan]
```

### Actions
```
Hapus
```

### Summary
```
Ringkasan

Subtotal ([count]):
Rp [subtotal]

Jasa Titip (10%):
Rp [jasaTitip]

Ongkir Domestik:
(dihitung saat checkout)

Total Estimasi:
Rp [total]
```

### Checkout
```
Checkout
```

### Empty State
```
Keranjang masih kosong
Yuk lihat katalog, siapa tau ada yang menarik.
[Lihat Katalog]
```

### Undo Toast
```
{namaProduk} dihapus dari keranjang
Undo
```

### Stok Berubah
```
Stok {namaProduk} berubah jadi {stok}. Qty disesuaikan.
```



========================================
# FILE: 05-checkout.md
========================================

# Screen 05: Checkout

## Tujuan
Customer konfirmasi alamat, pilih kurir, review pesanan, dan submit ke API untuk buat pesanan + redirect ke upload bukti pembayaran.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Checkout                                                     â”‚
â”‚                                                                â”‚
â”‚  â—â”â”â”â—â”â”â”â—                                                    â”‚
â”‚  Alamat  Kurir  Konfirmasi                                   â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                                    â”‚  â”‚ Ringkasan Pesananâ”‚ â”‚
â”‚  â”‚  [Step 1: Alamat Pengiriman]       â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ â”Œâ”€â”€â” Produk 1   â”‚ â”‚
â”‚  â”‚  (â—‹) Jl. Merdeka No. 123          â”‚  â”‚ â””â”€â”€â”˜ Rp 282.000 â”‚ â”‚
â”‚  â”‚      Budi Santoso                  â”‚  â”‚     x1          â”‚ â”‚
â”‚  â”‚      Bandung, 40123                â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ â”Œâ”€â”€â” Produk 2   â”‚ â”‚
â”‚  â”‚  (â—‹) Jl. Sudirman No. 45          â”‚  â”‚ â””â”€â”€â”˜ Rp 35.250  â”‚ â”‚
â”‚  â”‚      Siti Nurhaliza                â”‚  â”‚     x2          â”‚ â”‚
â”‚  â”‚      Jakarta, 12190                â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ Subtotal: 3 itemsâ”‚
â”‚  â”‚  [ + Tambah Alamat Baru ]         â”‚  â”‚ Rp 352.500       â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚                  â”‚ â”‚
â”‚  â”‚  [Selanjutnya: Pilih Kurir]       â”‚  â”‚ Jasa Titip:      â”‚ â”‚
â”‚  â”‚                                    â”‚  â”‚ Rp 35.250       â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚ Ongkir: Rp 0    â”‚ â”‚
â”‚                                          â”‚                  â”‚ â”‚
â”‚                                          â”‚ Total: Rp 387.750â”‚ â”‚
â”‚                                          â”‚                  â”‚ â”‚
â”‚                                          â”‚ Metode Bayar:   â”‚ â”‚
â”‚                                          â”‚ Transfer Bank    â”‚ â”‚
â”‚                                          â”‚                  â”‚ â”‚
â”‚                                          â”‚ [Bayar Sekarang] â”‚ â”‚
â”‚                                          â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Checkout            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ â—â”â”â”â—â”â”â”â—                â”‚
â”‚ Alamat  Kurir  Konfirmasiâ”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Step 1: Alamat         â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ (â—‹) Jl. Merdeka 123    â”‚ â”‚
â”‚ â”‚     Budi Santoso        â”‚ â”‚
â”‚ â”‚     Bandung, 40123      â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ (â—‹) Jl. Sudirman 45    â”‚ â”‚
â”‚ â”‚     Siti Nurhaliza      â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ [+ Tambah Alamat Baru] â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Subtotal: Rp 352.500      â”‚
â”‚ Total: Rp 387.750         â”‚
â”‚ [Bayar Sekarang]          â”‚ â† sticky bottom (if last step)
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Mobile: each step full screen, no sidebar summary)
```

---

## Sections

### Section 1: Progress Stepper (Top)

```
â—â”â”â”â—â”â”â”â—
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
- Click â†’ modal form (inline form fields)
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
- "Selanjutnya" â†’ validate current step â†’ if valid, advance step
- "Kembali" â†’ previous step (preserve data)
- Click on completed step node â†’ jump back (if data valid)
- URL sync: `/checkout?step=1` (optional, for back-button)

### Alamat Selection
- Radio change â†’ update selected alamat
- "Tambah Alamat" â†’ modal form (label, penerima, noTelp, alamat, kota, provinsi, kodePos)
- Submit new alamat â†’ add to list, auto-select

### Kurir Selection
- Radio change â†’ update ongkir in summary (instant recalc)
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

1. âŒ NO "â†’" in step navigation buttons ("Selanjutnya", "Kembali")
2. âŒ NO "CONFIRM ORDER" (use "Bayar Sekarang")
3. âŒ NO accordion steps (use visible progress + single active step)
4. âŒ NO modal for checkout (use page layout)
5. âŒ NO "Special instructions" textarea (MVP scope)
6. âŒ NO multiple payment methods (MVP: manual transfer only)
7. âŒ NO coupon/promo code field (backlog)
8. âŒ NO guest checkout (require login - simpler for MVP)

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



========================================
# FILE: 06-upload-bukti.md
========================================

# Screen 06: Upload Bukti Pembayaran

## Tujuan
Customer upload bukti transfer bank. Halaman tujuan setelah checkout, atau dari riwayat pesanan yang statusnya MENUNGGU_BUKTI.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Upload Bukti Pembayaran                                      â”‚
â”‚  No. Invoice: INV-20240120-I9J0K1L2                          â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚                          â”‚  â”‚ Total Bayar:             â”‚  â”‚
â”‚  â”‚  Transfer ke:            â”‚  â”‚ Rp 365.575               â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚  BCA                     â”‚  â”‚ Status:                   â”‚  â”‚
â”‚  â”‚  1234567890              â”‚  â”‚ [Menunggu Bukti]         â”‚  â”‚
â”‚  â”‚  PT Jastip China         â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚ Kedaluwarsa dalam:       â”‚  â”‚
â”‚  â”‚  [Salin]                 â”‚  â”‚ 23 jam 45 menit          â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚  Mandiri                 â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚  9876543210              â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚  PT Jastip China         â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                           â”‚  â”‚
â”‚  â”‚  [Salin]                 â”‚  â”‚                           â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚            [Drop bukti di sini]                         â”‚ â”‚
â”‚  â”‚            atau [Pilih File]                            â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Format: JPG, PNG, PDF                                   â”‚ â”‚
â”‚  â”‚  Maksimal: 5MB                                           â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  [Upload Bukti]                                               â”‚
â”‚                                                                â”‚
â”‚  Catatan: Pembayaran akan diverifikasi admin 1x24 jam.       â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Upload Bukti        â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ No. Invoice:               â”‚
â”‚ INV-20240120-I9J0K1L2     â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Total Bayar:           â”‚ â”‚
â”‚ â”‚ Rp 365.575             â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Status:                â”‚ â”‚
â”‚ â”‚ [Menunggu Bukti]       â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Kedaluwarsa:            â”‚ â”‚
â”‚ â”‚ 23 jam 45 menit        â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ Transfer ke:               â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ BCA                    â”‚ â”‚
â”‚ â”‚ 1234567890             â”‚ â”‚
â”‚ â”‚ PT Jastip China        â”‚ â”‚
â”‚ â”‚            [Salin]     â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Mandiri                â”‚ â”‚
â”‚ â”‚ 9876543210             â”‚ â”‚
â”‚ â”‚ PT Jastip China        â”‚ â”‚
â”‚ â”‚            [Salin]     â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚  [Drop bukti di sini]  â”‚ â”‚
â”‚ â”‚  atau [Pilih File]    â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚  JPG, PNG, PDF, 5MB   â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Upload Bukti]             â”‚
â”‚                            â”‚
â”‚ Pembayaran akan diverifikasiâ”‚
â”‚ admin 1x24 jam.           â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Mobile: back button, title "Upload Bukti"

### Section 2: Info Pesanan (Summary)
- **Layout (Desktop):** 2-column (rekening kiri, total+status kanan)
- **Layout (Mobile):** Stack vertical (total first, rekening below)
- **Content Right:**
  - Total Bayar (Noto Serif SC 700, 28px, gold)
  - Status badge: "Menunggu Bukti" (gold bg)
  - Countdown timer: "Kedaluwarsa dalam: 23 jam 45 menit"

### Section 3: Rekening Tujuan
- **Layout:** Card list, stack vertical
- **Each card:**
  - Bank name (Inter 600, 18px)
  - Account number (Inter 400, 16px, monospace)
  - Account holder (Inter 400, 14px, #6B5D52)
  - "Salin" button (ghost, copy icon)
- **Copy behavior:** Click "Salin" â†’ clipboard + tooltip "Tersalin!"

### Section 4: Upload Zone
- **Layout (Desktop):** Full width box, 200px height
- **Layout (Mobile):** Full width, 160px height
- **Style:**
  - Border: 2px dashed #E8DCC8
  - Background: #F7F3EC (subtle warm)
  - Radius: 12px
  - Center content: icon + text
- **Content:**
  - Icon: upload-cloud 48px, #6B5D52
  - Text: "Drop bukti di sini"
  - Link: "Pilih File" (Chinese Red, underlined)
  - Helper: "Format: JPG, PNG, PDF. Maksimal 5MB"
- **Interaction:**
  - Drag & drop: file enter â†’ border #C8102E, background rgba(200,16,46,0.05)
  - File selected: show preview thumbnail + file name + size
  - Click "Pilih File": trigger hidden `<input type="file">`

### Section 5: Upload Button
- **Component:** Button Primary, full width
- **Label:** "Upload Bukti"
- **State:**
  - Disabled (no file selected): opacity 50%
  - Loading (uploading): spinner + "Mengupload..."
  - Success: redirect to `/pesanan/[id]` with toast "Bukti terkirim, tunggu verifikasi"

### Section 6: Catatan
- **Content:** "Pembayaran akan diverifikasi admin dalam 1x24 jam."
- **Style:** Inter 400, 14px, #6B5D52, centered

---

## States

### Loading (Submitting)
- Button: spinner + "Mengupload..."
- Disable upload zone (no file change)
- Disable rekening salin

### Success
- Redirect to `/pesanan/[id]`
- Toast: "Bukti transfer terkirim. Tunggu verifikasi admin ya."

### Error (Upload Fail)
- Toast: "Gagal upload. Coba lagi, atau hubungi admin via WA."
- Clear file selection
- Re-enable upload zone

### Error (Wrong File Type)
- Instant validation on file select
- Toast: "Cuma bisa upload gambar (JPG, PNG) atau PDF"
- Clear file selection

### Error (File Too Large)
- Instant validation
- Toast: "Ukuran file kebanyakan. Maksimal 5MB."
- Clear file selection

### Already Uploaded (Status: MENUNGGU_VERIFIKASI)
- Hide upload zone
- Show: "Bukti udah dikirim, lagi dicek admin."
- Show: preview bukti (thumbnail)
- Show: timestamp upload

### Expired (Status: KADALUARSA)
- Hide upload zone
- Show: "Pembayaran kedaluwarsa. Pesanan dibatalkan."
- Show: "Buat pesanan baru" CTA â†’ `/katalog`

### Rejected (Status: DITOLAK)
- Show: "Bukti ditolak admin: {catatanAdmin}"
- Show: rejected bukti preview
- Show: upload zone (retry with new bukti)
- Status badge: "Ditolak" (red-muted)

---

## Interactions

### File Drag & Drop
- Dragenter: border â†’ #C8102E, bg â†’ rgba(200,16,46,0.05)
- Dragleave: revert to default
- Drop: file validation â†’ if OK, show preview

### File Select (Click)
- Click zone or "Pilih File" link â†’ trigger file input
- File selected â†’ validation â†’ if OK, show preview

### Salin Rekening
- Click "Salin" button â†’ clipboard API
- Tooltip: "Tersalin!" (fade in 100ms, fade out 200ms after 2s)

### Countdown Timer
- JS interval: update every minute
- Format: "X jam Y menit"
- Color: normal (#6B5D52), warning (< 2 jam: #9B4D50)
- At 0: show "Kedaluwarsa" + disable upload

### Upload Submit
- Button click â†’ get presigned URL from API â†’ upload to R2 â†’ submit bukti URL to API
- Or: simpler flow - upload file to API endpoint, API handles R2

---

## Edge Cases

### No Pembayaran Found
- Redirect to `/pesanan` with toast "Pesanan tidak ditemukan"

### Multiple Retries (previous DITOLAK)
- Show history of attempts (compact list)
- Each: timestamp, status, catatan admin (if rejected)
- Current upload zone active

### Network Slow
- Show progress bar (if possible) or spinner
- Don't timeout too fast (min 30s)

### File Preview
- Image: thumbnail 200x200px, object-contain
- PDF: PDF icon + filename
- Click thumbnail: fullscreen preview (modal)

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in Upload button
2. âŒ NO "SUBMIT PROOF" (use "Upload Bukti")
3. âŒ NO multiple rekening in one line (use card list)
4. âŒ NO auto-submit on file select (let user click Upload)
5. âŒ NO QR code payment (MVP: manual transfer only)
6. âŒ NO "Pay with e-wallet" option
7. âŒ NO countdown timer in red large (subtle, not pressure)
8. âŒ NO "Urgent!" or "Bayar sekarang atau batal!" aggressive copy

---

## Copy

### Page Title (H1)
```
Upload Bukti Pembayaran
```

### Invoice
```
No. Invoice: INV-20240120-I9J0K1L2
```

### Summary
```
Total Bayar:
Rp 365.575

Status:
[Menunggu Bukti]

Kedaluwarsa dalam:
23 jam 45 menit
```

### Rekening
```
Transfer ke:

BCA
1234567890
PT Jastip China
[Salin]

Mandiri
9876543210
PT Jastip China
[Salin]
```

### Upload Zone
```
[Drop bukti di sini]
atau [Pilih File]

Format: JPG, PNG, PDF
Maksimal: 5MB
```

### Upload Button
```
Upload Bukti
```

### Catatan
```
Pembayaran akan diverifikasi admin dalam 1x24 jam.
```

### Already Uploaded
```
Bukti udah dikirim, lagi dicek admin.
```

### Expired
```
Pembayaran kedaluwarsa. Pesanan dibatalkan.
[Buat Pesanan Baru]
```

### Rejected
```
Bukti ditolak admin: {catatanAdmin}

Upload ulang bukti transfer yang benar.
```

### Toast Success
```
Bukti transfer terkirim. Tunggu verifikasi admin ya.
```

### Toast Copy
```
Tersalin!
```

### Toast Error (File)
```
Cuma bisa upload gambar (JPG, PNG) atau PDF
Ukuran file kebanyakan. Maksimal 5MB.
```



========================================
# FILE: 07-riwayat-pesanan.md
========================================

# Screen 07: Riwayat Pesanan

## Tujuan
Customer lihat semua pesanan mereka, filter by status, akses detail/track/lacak.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Riwayat Pesanan                                             â”‚
â”‚                                                                â”‚
â”‚  [Semua] [Menunggu Bayar] [Diproses] [Dikirim] [Selesai]    â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ INV-20240120-I9J0K1L2              [Menunggu Pembayaran] â”‚ â”‚
â”‚  â”‚ 20 Jan 2024, 19:45 WIB              Rp 365.575            â”‚ â”‚
â”‚  â”‚ 1 item                                                   â”‚ â”‚
â”‚  â”‚                                          [Lihat Detail]  â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚ INV-20240118-E5F6G7H8              [Diproses Admin]      â”‚ â”‚
â”‚  â”‚ 18 Jan 2024, 10:15 WIB              Rp 644.280            â”‚ â”‚
â”‚  â”‚ 2 items                                                  â”‚ â”‚
â”‚  â”‚                                          [Lihat Detail]  â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚ INV-20240115-A1B2C3D4              [Selesai]             â”‚ â”‚
â”‚  â”‚ 15 Jan 2024, 14:30 WIB              Rp 562.750            â”‚ â”‚
â”‚  â”‚ 3 items                                                  â”‚ â”‚
â”‚  â”‚                                          [Lihat Detail]  â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  [Muat Lainnya]                                               â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Riwayat Pesanan     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Semua] [Bayar] [Proses]  â”‚ â† horizontal scroll filter
â”‚ [Kirim] [Selesai]         â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ INV-...I9J0K1L2        â”‚ â”‚
â”‚ â”‚ [Menunggu Pembayaran]   â”‚ â”‚
â”‚ â”‚ 20 Jan 2024             â”‚ â”‚
â”‚ â”‚ Rp 365.575 | 1 item     â”‚ â”‚
â”‚ â”‚         [Lihat Detail]  â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ INV-...E5F6G7H8        â”‚ â”‚
â”‚ â”‚ [Diproses Admin]        â”‚ â”‚
â”‚ â”‚ 18 Jan 2024             â”‚ â”‚
â”‚ â”‚ Rp 644.280 | 2 items    â”‚ â”‚
â”‚ â”‚         [Lihat Detail]  â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Muat Lainnya]            â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Empty State):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Riwayat Pesanan     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚      [icon: empty box]     â”‚
â”‚                            â”‚
â”‚   Belum ada pesanan        â”‚
â”‚   Saatnya belanja pertama  â”‚
â”‚   kamu!                    â”‚
â”‚                            â”‚
â”‚   [Mulai Belanja]         â”‚
â”‚                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
- **Behavior:** Click â†’ filter list (client-side or API call with status param)

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
- **Behavior:** Click â†’ append new items, show skeleton loaders while fetching

### Section 6: Empty State
- **Trigger:** No pesanan at all, OR no pesanan in selected filter
- **Content:**
  - Illustration: empty box line icon (120x120px, #E8DCC8)
  - Title: "Belum ada pesanan" (Noto Serif SC 500, 20px)
  - Desc: "Saatnya belanja pertama kamu!" (Inter 400, 14px)
  - CTA: "Mulai Belanja" (primary) â†’ `/katalog`

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
- Click tab â†’ update active state
- Fetch pesanan with status filter (or client-side filter if cached)
- Show loading state in list area only

### Card Click / Lihat Detail
- Click anywhere on card â†’ navigate to `/pesanan/[id]`
- Cursor: pointer
- Hover: border #C8102E, shadow subtle

### Load More
- Click â†’ fetch next page
- Append to list (no replace)
- Show skeleton at bottom while loading
- Hide button if no more pages

### Pull to Refresh (Mobile)
- Pull down â†’ refetch list
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

1. âŒ NO "â†’" in "Lihat Detail" button
2. âŒ NO "ORDER HISTORY" label ALL-CAPS
3. âŒ NO table layout for mobile (use cards)
4. âŒ NO separate "Track" page (use detail pesanan with timeline)
5. âŒ NO auto-refresh (let user pull to refresh manually)
6. âŒ NO search in riwayat (filter by status is enough for MVP)

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



========================================
# FILE: 08-detail-pesanan.md
========================================

# Screen 08: Detail Pesanan (Lacak)

## Tujuan
Customer lihat detail pesanan: item, alamat, biaya, status pipeline (lacak), info pengiriman, dan akses ke upload bukti / komplain.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Home / Riwayat / INV-20240120-I9J0K1L2  (breadcrumb)        â”‚
â”‚                                                                â”‚
â”‚  Pesanan INV-20240120-I9J0K1L2                               â”‚
â”‚  [Menunggu Pembayaran]                                       â”‚
â”‚  20 Jan 2024, 19:45 WIB                                      â”‚
â”‚                                                                â”‚
â”‚  â—â”â”â”â—‹â”â”â”â—‹â”â”â”â—‹â”â”â”â—‹                                           â”‚
â”‚  Bayar  Proses  Konsol  Lokal  Selesai                      â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Item Pesanan             â”‚  â”‚ Info Pengiriman          â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚ â”Œâ”€â”€â” Tas Backpack        â”‚  â”‚ Penerima: Budi Santoso   â”‚  â”‚
â”‚  â”‚ â”‚  â”‚ Premium (Hitam)     â”‚  â”‚ No. Telp: 081234567890   â”‚  â”‚
â”‚  â”‚ â””â”€â”€â”˜ Rp 282.000 x1       â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚      Subtotal: 282.000   â”‚  â”‚ Jl. Merdeka No. 123      â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚ RT 01 RW 02              â”‚  â”‚
â”‚  â”‚ â”Œâ”€â”€â” Kaos Oversized      â”‚  â”‚ Bandung, Jawa Barat      â”‚  â”‚
â”‚  â”‚ â”‚  â”‚ (Size L Hitam)      â”‚  â”‚ 40123                    â”‚  â”‚
â”‚  â”‚ â””â”€â”€â”˜ Rp 35.250 x2        â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚      Subtotal: 70.500    â”‚  â”‚ Kurir: JNE REG           â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚ No. Resi: -              â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚ Estimasi: -              â”‚  â”‚
â”‚                                â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ Rincian Biaya                                            â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚ Subtotal Produk:        Rp 352.500                       â”‚ â”‚
â”‚  â”‚ Biaya Jasa Titip (10%): Rp 35.250                        â”‚ â”‚
â”‚  â”‚ Ongkir China:           Rp 150.000                       â”‚ â”‚
â”‚  â”‚ Ongkir Domestik:         Rp 25.000                        â”‚ â”‚
â”‚  â”‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€                        â”‚ â”‚
â”‚  â”‚ Total:                   Rp 562.750                       â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  [Upload Bukti Pembayaran]  [Ajukan Komplain]               â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Detail Pesanan      â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ INV-20240120-I9J0K1L2     â”‚
â”‚ [Menunggu Pembayaran]      â”‚
â”‚ 20 Jan 2024, 19:45 WIB    â”‚
â”‚                            â”‚
â”‚ â—â”â”â”â—‹â”â”â”â—‹â”â”â”â—‹â”â”â”â—‹        â”‚
â”‚ Bayar Proses Kon Lok Selesaiâ”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Item Pesanan           â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â” Tas Backpack       â”‚ â”‚
â”‚ â”‚ â”‚  â”‚ Premium (Hitam)    â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”˜ 282.000 x1         â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â” Kaos Oversized     â”‚ â”‚
â”‚ â”‚ â”‚  â”‚ (Size L Hitam)     â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”˜ 35.250 x2          â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Info Pengiriman        â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Penerima: Budi Santoso  â”‚ â”‚
â”‚ â”‚ 081234567890            â”‚ â”‚
â”‚ â”‚ Jl. Merdeka No. 123     â”‚ â”‚
â”‚ â”‚ Bandung, Jawa Barat     â”‚ â”‚
â”‚ â”‚ 40123                   â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Kurir: JNE REG          â”‚ â”‚
â”‚ â”‚ No. Resi: -             â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Rincian Biaya          â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Subtotal:    352.500   â”‚ â”‚
â”‚ â”‚ Jasa Titip:   35.250   â”‚ â”‚
â”‚ â”‚ Ongkir China: 150.000  â”‚ â”‚
â”‚ â”‚ Ongkir Domestik: 25.000â”‚ â”‚
â”‚ â”‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ â”‚ â”‚
â”‚ â”‚ Total:       562.750   â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Upload Bukti]            â”‚ â† sticky CTA (if menunggu bayar)
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Breadcrumb (Desktop)
- Home / Riwayat / [Invoice]

### Section 2: Header Info
- Invoice number (H1, Noto Serif SC 700, 28px desktop / 20px mobile)
- Status badge (from components.md, 6 variants)
- Tanggal pesan (Inter 400, 14px, #6B5D52)

### Section 3: Status Pipeline (Timeline)
- **Layout (Desktop):** Horizontal, 5 nodes
- **Layout (Mobile):** Horizontal (smaller) or vertical if too tight
- **Nodes:**
  1. Bayar (MENUNGGU_PEMBAYARAN)
  2. Proses (DIPROSES_ADMIN)
  3. Konsol (DIKONSOLIDASI_KIRIM)
  4. Lokal (TIBA_KIRIM_LOKAL)
  5. Selesai (SELESAI)
- **Node state:**
  - Completed: filled gold #D4AF37 + check icon
  - Active (current): filled Chinese Red #C8102E
  - Pending: outline #E8DCC8
- **Labels:** "Bayar", "Proses", "Konsol", "Lokal", "Selesai" (Inter 400, 12px)
- **DIBATALKAN:** Show red-muted node at "Bayar" position, all others pending

### Section 4: Item Pesanan
- **Layout:** Card container, vertical item list
- **Each item:**
  - Thumbnail: 80x80px, radius 8px, object-cover
  - Nama (Noto Serif SC 500, 18px / 16px mobile)
  - Varian (Inter 400, 14px, #6B5D52)
  - Harga satuan (Noto Serif SC 700, 16px, gold #B5941F)
  - Qty: "x1" or "x2"
  - Subtotal: harga Ã— qty

### Section 5: Info Pengiriman
- **Layout:** Card container
- **Content:**
  - Penerima (Inter 500, 16px)
  - No. Telp
  - Alamat lengkap (multi-line)
  - Kurir (Inter 500, 16px)
  - No. Resi (or "-" if not yet assigned)
  - Estimasi tiba (or "-" if not yet)

### Section 6: Rincian Biaya
- **Layout:** Card container, breakdown table
- **Content:**
  - Subtotal Produk
  - Biaya Jasa Titip (label with %)
  - Ongkir China Gudang
  - Ongkir Domestik
  - Biaya Admin Payment (if > 0)
  - Divider line (1px #E8DCC8)
  - Total Akhir (Noto Serif SC 700, 20px, gold)
- **Style:** Label left, value right (Inter 500 for label, Inter 600 for value)

### Section 7: Action Buttons
- **Layout:** Horizontal row, 12px gap, margin top 32px
- **Buttons (conditional based on status):**
  - MENUNGGU_PEMBAYARAN: "Upload Bukti Pembayaran" (primary) â†’ `/pesanan/[id]/pembayaran`
  - SELESAI: "Ajukan Komplain" (secondary) â†’ `/pesanan/[id]/komplain`
  - DIBATALKAN: no buttons
  - Others: no action buttons
- **Mobile:** Sticky bottom bar if "Upload Bukti" available

---

## States

### Loading State
- Skeleton pipeline, skeleton item list, skeleton info card

### Not Found
- 404: "Pesanan nggak ketemu"
- CTA: "Kembali ke Riwayat"

### No Resi Yet
- Show "-" for no resi
- Estimasi: "Belum ada"

### Komplain Already Submitted
- If komplain exists: show "Komplain Diajukan" badge
- "Ajukan Komplain" button disabled or hidden
- Link: "Lihat Status Komplain"

---

## Interactions

### Pipeline Node Hover (Desktop)
- Hover completed/active node â†’ tooltip with timestamp
- Tooltip: "Diproses Admin: 19 Jan 2024, 14:00 WIB"

### Upload Bukti Click
- Navigate to `/pesanan/[id]/pembayaran`

### Ajukan Komplain Click
- Navigate to `/pesanan/[id]/komplain`

### Copy No Resi
- If resi available: tap to copy
- Tooltip: "No. resi tersalin!"

---

## Edge Cases

### DIBATALKAN
- Pipeline: red-muted node at current status, all others grey
- Info card: "Pesanan dibatalkan" note
- No action buttons
- Show reason if available (from status log)

### Multiple Items (10+)
- Show all items (no collapse)
- Scrollable card container (max-height 400px, scroll)

### Custom PO Pesanan
- Item: "Custom PO: [deskripsi singkat]"
- Link to original PO: "Lihat Permintaan PO"
- No product thumbnail (use generic icon)

### Biaya Modified by Admin
- Show original price + modified note
- "Biaya ongkir diupdate admin" (helper text)

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in action buttons
2. âŒ NO "TRACK ORDER" label ALL-CAPS
3. âŒ NO auto-refresh status (let user pull to refresh)
4. âŒ NO live chat widget
5. âŒ NO "Reorder" button (MVP scope)
6. âŒ NO "Add review" section (backlog)
7. âŒ NO print invoice button (MVP scope)
8. âŒ NO share order to social media

---

## Copy

### Page Title (H1)
```
Pesanan INV-20240120-I9J0K1L2
```

### Status + Date
```
[Status Badge]
20 Jan 2024, 19:45 WIB
```

### Pipeline Labels
```
Bayar
Proses
Konsol
Lokal
Selesai
```

### Item
```
Tas Backpack Premium
Varian: Hitam
Rp 282.000
x1
Subtotal: Rp 282.000
```

### Info Pengiriman
```
Info Pengiriman

Penerima: Budi Santoso
No. Telp: 081234567890

Jl. Merdeka No. 123
RT 01 RW 02
Bandung, Jawa Barat
40123

Kurir: JNE REG
No. Resi: -
Estimasi: -
```

### Biaya
```
Rincian Biaya

Subtotal Produk:        Rp 352.500
Biaya Jasa Titip (10%): Rp 35.250
Ongkir China Gudang:    Rp 150.000
Ongkir Domestik:        Rp 25.000
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Total:                  Rp 562.750
```

### Actions
```
Upload Bukti Pembayaran
Ajukan Komplain
```

### Dibatalkan
```
Pesanan dibatalkan
Alasan: {alasan dari status log, jika ada}
```

### Komplain Exists
```
Komplain Diajukan
Lihat Status Komplain
```



========================================
# FILE: 09-ajukan-po.md
========================================

# Screen 09: Ajukan Custom PO

## Tujuan
Customer ajukan permintaan produk off-catalog (tidak ada di katalog). Upload link referensi + spesifikasi + foto.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Ajukan Custom PO                                            â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Mau beli barang yang nggak ada di katalog?              â”‚ â”‚
â”‚  â”‚  Kirim link produk dari China, tim kami akan kasih       â”‚ â”‚
â”‚  â”‚  estimasi harga dalam 1-2 hari kerja.                   â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Form Permintaan                                         â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Link Produk Referensi *                                 â”‚ â”‚
â”‚  â”‚  [https://taobao.com/...]                                â”‚ â”‚
â”‚  â”‚  Contoh: link Taobao, 1688, atau AliExpress             â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Deskripsi Spesifikasi *                                 â”‚ â”‚
â”‚  â”‚  [                                                      ] â”‚ â”‚
â”‚  â”‚  [  Mau beli sepatu running brand X, size 42, warna    ] â”‚ â”‚
â”‚  â”‚  [  hitam. Beda sama yang di katalog, yang ini ada...  ] â”‚ â”‚
â”‚  â”‚  [                                                      ] â”‚ â”‚
â”‚  â”‚  Minimal 20 karakter                                     â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Foto Referensi (opsional, tapi disarankan)             â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”‚ â”‚
â”‚  â”‚  â”‚                                                    â”‚    â”‚ â”‚
â”‚  â”‚  â”‚  [Drop foto di sini] atau [Pilih File]          â”‚    â”‚ â”‚
â”‚  â”‚  â”‚  Maksimal 3 foto, JPG/PNG, 5MB each              â”‚    â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  Jumlah Diminta *                                        â”‚ â”‚
â”‚  â”‚  [- 1 +]                                                 â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â”‚  [Kirim Permintaan]                                      â”‚ â”‚
â”‚  â”‚                                                           â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Ajukan Custom PO    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Mau beli barang yang   â”‚ â”‚
â”‚ â”‚ nggak ada di katalog?  â”‚ â”‚
â”‚ â”‚ Kirim link produk,     â”‚ â”‚
â”‚ â”‚ tim kami kasih estimasiâ”‚ â”‚
â”‚ â”‚ 1-2 hari kerja.        â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ Link Produk Referensi *    â”‚
â”‚ [https://taobao.com/...]   â”‚
â”‚                            â”‚
â”‚ Deskripsi Spesifikasi *    â”‚
â”‚ [                          ] â”‚
â”‚ [  Mau beli sepatu...      ] â”‚
â”‚ [  running brand X...     ] â”‚
â”‚                            â”‚
â”‚ Foto Referensi             â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ [Drop/Pilih File]      â”‚ â”‚
â”‚ â”‚ Max 3, JPG/PNG, 5MB   â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ Jumlah Diminta *           â”‚
â”‚ [- 1 +]                    â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Kirim Permintaan]        â”‚ â† sticky CTA
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Mobile: back button, title "Ajukan Custom PO"

### Section 2: Page Title + Info Box
- **Title:** "Ajukan Custom PO" (H1)
- **Info Box:** 
  - Background: #F7F3EC
  - Border-left: 4px solid #C8102E
  - Padding: 16px
  - Text: "Mau beli barang yang nggak ada di katalog? Kirim link produk dari China, tim kami akan kasih estimasi harga dalam 1-2 hari kerja."

### Section 3: Form
- **Container:** Card, padding 24px desktop / 16px mobile
- **Fields:**
  1. **Link Produk Referensi** (required)
     - Input type: url
     - Placeholder: "https://taobao.com/..."
     - Helper: "Contoh: link Taobao, 1688, atau AliExpress"
  2. **Deskripsi Spesifikasi** (required, textarea)
     - Min length: 20 characters
     - Placeholder: "Mau beli sepatu running brand X, size 42, warna hitam..."
     - Helper: "Minimal 20 karakter. Jelaskan detail spesifikasi yang kamu mau."
  3. **Foto Referensi** (optional, multi-upload)
     - Max files: 3
     - Format: JPG, PNG
     - Max size: 5MB each
     - Upload zone: same style as upload-bukti.md
     - Preview: thumbnail grid (max 3, 80x80px each)
  4. **Jumlah Diminta** (required)
     - Stepper component
     - Min: 1, Max: 999

### Section 4: Submit Button
- **Component:** Button Primary, full width
- **Label:** "Kirim Permintaan"
- **Behavior:** Validate form â†’ submit â†’ redirect to `/permintaan-po/[id]`

---

## States

### Loading (Submitting)
- Button: spinner + "Mengirim..."
- Disable all inputs

### Validation Error
- Inline error messages per field
- Border: 2px #9B4D50
- Error text: 12px, #9B4D50

### Success
- Redirect to `/permintaan-po/[id]`
- Toast: "Permintaan PO terkirim. Tunggu review admin ya."

### File Upload Preview
- After file selected: thumbnail 80x80px in grid
- Remove button (X) on each thumbnail
- Upload progress bar (if multiple files)

### File Upload Error
- Toast: "Gagal upload foto. Coba lagi."
- Remove file from preview

---

## Interactions

### Form Validation
- Link: URL format check on blur
- Deskripsi: character count display (e.g., "25/20 minimal"), validate min on blur
- Foto: file validation on select (type, size)
- Jumlah: stepper validation (min 1)

### Submit
- Validate all fields
- If valid: API call (POST /api/permintaan-po)
- If photo: upload to R2 first, then submit URLs
- On success: redirect to detail PO page

---

## Edge Cases

### No Link, Only Description
- Link required: block submit
- Error: "Link produk wajib diisi"

### Too Many Photos (>3)
- Reject 4th file
- Toast: "Maksimal 3 foto"

### Very Long Description
- Max 1000 characters (textarea auto-resize, max 10 lines)
- Show character count: "500/1000"

### Jumlah Very Large (999+)
- Max 999
- If > 999: disable + button, toast "Maksimal 999 unit per PO"

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in submit button
2. âŒ NO "SUBMIT REQUEST" (use "Kirim Permintaan")
3. âŒ NO required login reminder (user already logged in to access this)
4. âŒ NO price estimate field (admin provides that)
5. âŒ NO shipping address field (filled later when approving offer)
6. âŒ NO "Similar products" suggestion
7. âŒ NO mandatory photo (optional, disarankan only)

---

## Copy

### Page Title (H1)
```
Ajukan Custom PO
```

### Info Box
```
Mau beli barang yang nggak ada di katalog?
Kirim link produk dari China, tim kami akan kasih estimasi harga dalam 1-2 hari kerja.
```

### Form Labels
```
Link Produk Referensi
Contoh: link Taobao, 1688, atau AliExpress

Deskripsi Spesifikasi
Minimal 20 karakter. Jelaskan detail spesifikasi yang kamu mau.

Foto Referensi
Opsional, tapi disarankan. Maksimal 3 foto, JPG/PNG, 5MB each.

Jumlah Diminta
```

### Submit Button
```
Kirim Permintaan
```

### Placeholders
```
https://taobao.com/...
Mau beli sepatu running brand X, size 42, warna hitam...
```

### Toast Success
```
Permintaan PO terkirim. Tunggu review admin ya.
```

### Validation Errors
```
Link produk wajib diisi
Link tidak valid, cek formatnya
Deskripsi minimal 20 karakter
Jumlah minimal 1
```

### File Upload Zone
```
[Drop foto di sini]
atau [Pilih File]
Maksimal 3 foto, JPG/PNG, 5MB each
```



============================================================
# INCLUDED FILE: batch-3-customer-support.md
============================================================

# BATCH 3: CUSTOMER SUPPORT

Gabungan 11 file customer support + static screens untuk pen.dev

---



========================================
# FILE: 10-login.md
========================================

# Screen 10: Login

## Tujuan
Customer login dengan email + password. Gateway ke checkout, riwayat, profile.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                  [Jastip China logo]                          â”‚
â”‚              Beranda  Katalog  Cara Order                     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     é²œè´§ç›´è¾¾                      â”‚                         â”‚
â”‚  â”‚     Masuk ke akunmu               â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     Email                         â”‚                         â”‚
â”‚  â”‚     [__________________________]  â”‚                         â”‚
â”‚  â”‚     nama@email.com                â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     Password                       â”‚                         â”‚
â”‚  â”‚     [__________________________]  â”‚                         â”‚
â”‚  â”‚                         [Lihat]    â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     [        Masuk          ]     â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     Lupa password?                 â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     â”€â”€â”€ atau â”€â”€â”€                   â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     Belum punya akun?              â”‚                         â”‚
â”‚  â”‚     [Daftar di sini]               â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     â”€â”€â”€ cloud pattern â”€â”€â”€          â”‚                         â”‚
â”‚  â”‚     Admin? [Login Admin]          â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                         â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]              [ðŸ›’]     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚                            â”‚
â”‚        é²œè´§ç›´è¾¾             â”‚
â”‚        Masuk ke akunmu    â”‚
â”‚                            â”‚
â”‚   Email                    â”‚
â”‚   [______________________] â”‚
â”‚   nama@email.com           â”‚
â”‚                            â”‚
â”‚   Password                 â”‚
â”‚   [______________________] â”‚
â”‚                  [Lihat]    â”‚
â”‚                            â”‚
â”‚   [      Masuk        ]    â”‚
â”‚                            â”‚
â”‚   Lupa password?           â”‚
â”‚                            â”‚
â”‚   â”€â”€â”€ atau â”€â”€â”€              â”‚
â”‚                            â”‚
â”‚   Belum punya akun?        â”‚
â”‚   [Daftar di sini]         â”‚
â”‚                            â”‚
â”‚   â”€â”€â”€ cloud pattern â”€â”€â”€    â”‚
â”‚   Admin? [Login Admin]    â”‚
â”‚                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header (Minimal)
- **Layout:** Center, 64px height
- **Content:** Logo "Jastip China" (Noto Serif SC 700, 24px, Chinese Red) centered
- **Mobile:** Back button left, cart icon right

### Section 2: Auth Card
- **Layout:** Center, max-width 440px, padding 40px desktop / 24px mobile
- **Background:** #FFFFFF, border 1px #E8DCC8, radius 16px, shadow subtle
- **Content:**
  - Chinese tagline: "é²œè´§ç›´è¾¾" (Ma Shan Zheng, 28px, Chinese Red, centered)
  - Subtitle: "Masuk ke akunmu" (Noto Serif SC 500, 20px, centered)
  - Form fields (below)
  - Cloud pattern divider (5% opacity, full width within card)
  - Admin link (below divider)

### Section 3: Form
- **Fields:**
  1. **Email** (required)
     - Input type: email
     - Placeholder: "nama@email.com"
     - Icon: mail (left, 20px, #6B5D52)
     - Validation: email format on blur
  2. **Password** (required)
     - Input type: password (toggle to text)
     - Icon: lock (left), eye/lucide-eye (right toggle)
     - Validation: min 6 characters
     - "Lihat" text button to toggle visibility

- **Field Style:**
  - Border: 1px #E8DCC8, radius 8px
  - Focus: border 2px #C8102E, ring 0 0 0 3px rgba(200,16,46,0.1)
  - Error: border 2px #9B4D50
  - Padding: 12px 16px
  - Label: Inter 500, 14px, #2C1810

### Section 4: Submit + Links
- **Button:** "Masuk" (Primary, full width, 48px height)
- **Links (below button):**
  - "Lupa password?" (ghost link, Chinese Red, 14px) â†’ `/forgot-password`
  - Divider: "â”€â”€â”€ atau â”€â”€â”€" (Inter 400, 12px, #6B5D52, centered)
  - "Belum punya akun?" (Inter 400, 14px) + "Daftar di sini" (link, Chinese Red)

### Section 5: Cloud Divider + Admin Link
- Cloud pattern (SVG, 5% opacity gold, full width of card)
- Below: "Admin?" (Inter 400, 13px, #6B5D52) + "Login Admin" (link, Jade #7C9885)
- Navigate to `/admin/login`

---

## States

### Loading (Submitting)
- Button: spinner + "Masuk..." (disabled)
- Disable all inputs
- Min display 500ms

### Validation Error
- Inline error below each field
- Error border: 2px #9B4D50
- Error text: 12px #9B4D50

### Auth Error (Wrong credentials)
- Toast: "Email atau password salah. Coba lagi."
- Password field: clear value, focus
- Shake animation on card (subtle, 100ms, 3px left-right)

### Rate Limited
- Toast: "Terlalu banyak coba. Tunggu 1 menit ya."
- Disable button for 60s with countdown

### Success
- Redirect to intended URL (redirect param) or `/akun`
- If came from checkout: redirect back to `/checkout`

---

## Interactions

### Password Toggle
- Click "Lihat" â†’ toggle input type password â†” text
- Icon change: eye â†’ eye-off
- Text change: "Lihat" â†’ "Sembunyikan"

### Enter Key Submit
- Press Enter on password field â†’ submit form

### Redirect After Login
- Check URL param `?redirect=/checkout`
- If exists: redirect there
- Default: redirect to `/akun`

---

## Edge Cases

### Already Logged In
- If token exists: redirect to `/akun` (don't show login form)

### Session Expired
- If redirected here from auth-protected page: show toast "Sesi habis, login lagi ya"
- Pre-fill email if known from localStorage

### No Admin Access
- If customer tries admin email: error "Email ini khusus admin. Login di [Login Admin]"

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in "Masuk" button
2. âŒ NO "WELCOME BACK" or "SIGN IN" ALL-CAPS
3. âŒ NO social login (Google/Facebook) â€” MVP uses email only
4. âŒ NO "Remember me" checkbox (session handled by JWT expiry)
5. âŒ NO captcha (rate limiting handles bots)
6. âŒ NO full-page background image
7. âŒ NO gradient background
8. âŒ NO auto-focus on email (mobile keyboard pops up unexpectedly)

---

## Copy

### Tagline
```
é²œè´§ç›´è¾¾
Masuk ke akunmu
```

### Form
```
Email
nama@email.com

Password
[Lihat]

[Masuk]

Lupa password?

â”€â”€â”€ atau â”€â”€â”€

Belum punya akun?
Daftar di sini
```

### Admin Link
```
Admin?
Login Admin
```

### Validation Errors
```
Email wajib diisi
Format email tidak valid
Password wajib diisi
Password minimal 6 karakter
```

### Toast Errors
```
Email atau password salah. Coba lagi.
Terlalu banyak coba. Tunggu 1 menit ya.
Sesi habis, login lagi ya.
```

### Toast Success
```
Berhasil masuk. Selamat datang!
```



========================================
# FILE: 11-register.md
========================================

# Screen 11: Register (Daftar)

## Tujuan
Customer daftar akun baru dengan nama, email, password, no. WhatsApp. Verifikasi OTP via WhatsApp.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                  [Jastip China logo]                          â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     é²œè´§ç›´è¾¾                      â”‚                         â”‚
â”‚  â”‚     Daftar akun baru              â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     Nama Lengkap                  â”‚                         â”‚
â”‚  â”‚     [__________________________]  â”‚                         â”‚
â”‚  â”‚     Budi Santoso                   â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     Email                         â”‚                         â”‚
â”‚  â”‚     [__________________________]  â”‚                         â”‚
â”‚  â”‚     nama@email.com                â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     No. WhatsApp                  â”‚                         â”‚
â”‚  â”‚     [62 812-3456-7890__________]   â”‚                         â”‚
â”‚  â”‚     Format: 62xxx                 â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     Password                      â”‚                         â”‚
â”‚  â”‚     [__________________________]  â”‚                         â”‚
â”‚  â”‚                         [Lihat]    â”‚                         â”‚
â”‚  â”‚     Min 8 karakter, ada angka      â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     Konfirmasi Password            â”‚                         â”‚
â”‚  â”‚     [__________________________]  â”‚                         â”‚
â”‚  â”‚                         [Lihat]    â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     â˜ Saya setuju dengan Syarat   â”‚                         â”‚
â”‚  â”‚       & Ketentuan serta Kebijakan â”‚                         â”‚
â”‚  â”‚       Privasi                      â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     [      Daftar          ]      â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     Sudah punya akun?              â”‚                         â”‚
â”‚  â”‚     [Masuk di sini]                â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                         â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]                      â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚        é²œè´§ç›´è¾¾             â”‚
â”‚        Daftar akun baru  â”‚
â”‚                            â”‚
â”‚   Nama Lengkap             â”‚
â”‚   [______________________] â”‚
â”‚                            â”‚
â”‚   Email                    â”‚
â”‚   [______________________] â”‚
â”‚                            â”‚
â”‚   No. WhatsApp             â”‚
â”‚   [62 812-3456-7890______] â”‚
â”‚                            â”‚
â”‚   Password                 â”‚
â”‚   [______________________] â”‚
â”‚                  [Lihat]    â”‚
â”‚                            â”‚
â”‚   Konfirmasi Password      â”‚
â”‚   [______________________] â”‚
â”‚                  [Lihat]    â”‚
â”‚                            â”‚
â”‚   â˜ Saya setuju dengan     â”‚
â”‚     Syarat & Ketentuan... â”‚
â”‚                            â”‚
â”‚   [      Daftar        ]   â”‚
â”‚                            â”‚
â”‚   Sudah punya akun?        â”‚
â”‚   [Masuk di sini]          â”‚
â”‚                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(OTP Verification Modal - after submit):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  â”â”â” (drag handle)        â”‚
â”‚                      [X]  â”‚
â”‚  Verifikasi WhatsApp      â”‚
â”‚                           â”‚
â”‚  Kode OTP udah dikirim    â”‚
â”‚  ke 62 812-3456-7890      â”‚
â”‚                           â”‚
â”‚  â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”     â”‚
â”‚  â”‚  â”‚ â”‚  â”‚ â”‚  â”‚ â”‚  â”‚     â”‚
â”‚  â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜     â”‚
â”‚                           â”‚
â”‚  Tunggu kode dalam 59s    â”‚
â”‚  [Kirim Ulang]            â”‚
â”‚                           â”‚
â”‚  [Verifikasi]             â”‚
â”‚                           â”‚
â”‚  Salah nomor? [Ubah]      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header (Minimal)
- Same as login: centered logo, no nav menu
- Mobile: back button

### Section 2: Auth Card
- **Layout:** Center, max-width 480px (slightly wider than login), padding 40px desktop / 24px mobile
- **Background:** #FFFFFF, border 1px #E8DCC8, radius 16px, shadow subtle
- **Content:**
  - Chinese tagline: "é²œè´§ç›´è¾¾" (Ma Shan Zheng, 28px, Chinese Red, centered)
  - Subtitle: "Daftar akun baru" (Noto Serif SC 500, 20px, centered)
  - Form fields (below)

### Section 3: Form
- **Fields:**
  1. **Nama Lengkap** (required)
     - Input type: text
     - Placeholder: "Budi Santoso"
     - Validation: min 3 characters
  2. **Email** (required)
     - Input type: email
     - Placeholder: "nama@email.com"
     - Validation: email format, unique check on blur
  3. **No. WhatsApp** (required)
     - Input type: tel
     - Prefix: country code "+62" (disabled prefix field)
     - Placeholder: "812-3456-7890"
     - Helper: "Format: 62xxx. Tanpa 0 di depan."
     - Validation: 10-13 digits, unique check on blur
  4. **Password** (required)
     - Input type: password (toggle)
     - Helper: "Min 8 karakter, ada huruf dan angka"
     - Validation: min 8 chars, must contain letter + number
     - Strength indicator: weak/medium/strong bar (optional, subtle)
  5. **Konfirmasi Password** (required)
     - Input type: password (toggle)
     - Validation: must match password field
  6. **Terms Checkbox** (required)
     - "Saya setuju dengan Syarat & Ketentuan serta Kebijakan Privasi"
     - Links in text: "Syarat & Ketentuan" â†’ `/snk`, "Kebijakan Privasi" â†’ `/privasi`
     - Validation: must be checked to submit

### Section 4: Submit + Links
- **Button:** "Daftar" (Primary, full width, 48px height)
- **Links:**
  - "Sudah punya akun?" (Inter 400, 14px) + "Masuk di sini" (link, Chinese Red)

### Section 5: OTP Verification Modal
- **Trigger:** After form submit success
- **Layout:** Bottom sheet (mobile) / centered modal (desktop)
- **Content:**
  - Title: "Verifikasi WhatsApp"
  - Info: "Kode OTP udah dikirim ke [nomor]"
  - OTP input: 4 separate digit boxes (auto-advance focus)
  - Resend: "Tunggu kode dalam 59s" countdown â†’ "Kirim Ulang" (clickable after 60s)
  - "Verifikasi" button (primary)
  - "Salah nomor? Ubah" link â†’ close modal, back to form

---

## States

### Loading (Form Submit)
- Button: spinner + "Mendaftarkan..."
- Disable all inputs
- On success: show OTP modal (status MENUNGGU_OTP on backend)

### Loading (OTP Submit)
- Button: spinner + "Memverifikasi..."
- Disable OTP inputs

### Validation Error (Inline)
- Per-field error messages
- Error border: 2px #9B4D50
- Real-time: confirm password mismatch shows error as user types

### Email Already Exists
- On blur: check API
- If exists: "Email udah terdaftar. [Masuk di sini?]"
- Border: 2px #9B4D50

### WhatsApp Already Exists
- On blur: check API
- If exists: "Nomor WhatsApp udah terdaftar. [Masuk di sini?]"
- Border: 2px #9B4D50

### OTP Error (Wrong Code)
- Toast: "Kode OTP salah. Coba lagi."
- Clear OTP boxes, focus first box
- Shake animation on OTP boxes (subtle)

### OTP Expired
- Toast: "Kode OTP kadaluwarsa. Kirim ulang ya."
- Show "Kirim Ulang" button (highlighted)

### Success
- Redirect to `/akun` with toast "Akun berhasil dibuat. Selamat datang!"
- Auto-login (token from OTP verification response)

---

## Interactions

### Password Toggle
- Same as login: "Lihat" / "Sembunyikan" per field
- Each password field has its own toggle

### OTP Auto-Advance
- Type digit â†’ auto-focus next box
- Backspace on empty â†’ focus previous box
- Paste 4 digits â†’ fill all boxes

### Resend OTP Countdown
- 60-second timer starts after first send
- Format: "Tunggu kode dalam 59s" â†’ "Tunggu kode dalam 1s"
- After 0: "Kirim Ulang" becomes clickable (Chinese Red)

### Unique Check (Email + WhatsApp)
- On blur: debounce 300ms â†’ API check
- If unique: no visual change (green check icon subtle, optional)
- If exists: error message inline

---

## Edge Cases

### Already Logged In
- If token valid: redirect to `/akun`

### Terms Not Checked
- Block submit
- Error: "Centang setuju Syarat & Ketentuan dulu ya"

### Password Strength
- Weak: 1/3 bar, #9B4D50
- Medium: 2/3 bar, #D4AF37
- Strong: 3/3 bar, #7C9885
- Only visible after password field has content

### WhatsApp Format Variations
- User types "0812" â†’ auto-strip leading 0 â†’ "812"
- User types "+62812" â†’ auto-strip +62 â†’ "812"
- Display: "+62 812-3456-7890" (auto-format with dashes)

### OTP Lost (WhatsApp not received)
- After 2nd resend: show "Belum dapet kode? Hubungi admin via WA"
- WhatsApp link to admin number

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in "Daftar" button
2. âŒ NO "CREATE ACCOUNT" / "SIGN UP" ALL-CAPS
3. âŒ NO social login (Google/Facebook)
4. âŒ NO email verification link (use WhatsApp OTP, faster for ID market)
5. âŒ NO mandatory profile photo upload
6. âŒ NO mandatory address during registration (add later in profile)
7. âŒ NO "Subscribe to newsletter" checkbox
8. âŒ NO captcha (rate limiting handles bots)
9. âŒ NO "Invite code" / referral field (backlog)

---

## Copy

### Tagline
```
é²œè´§ç›´è¾¾
Daftar akun baru
```

### Form Labels
```
Nama Lengkap
Budi Santoso

Email
nama@email.com

No. WhatsApp
Format: 62xxx. Tanpa 0 di depan.

Password
Min 8 karakter, ada huruf dan angka

Konfirmasi Password

Saya setuju dengan Syarat & Ketentuan serta Kebijakan Privasi
```

### Submit
```
[Daftar]

Sudah punya akun?
Masuk di sini
```

### OTP Modal
```
Verifikasi WhatsApp

Kode OTP udah dikirim ke +62 812-3456-7890

[ _ ] [ _ ] [ _ ] [ _ ]

Tunggu kode dalam 59s
[Kirim Ulang]

[Verifikasi]

Salah nomor? Ubah
```

### Validation Errors
```
Nama minimal 3 karakter
Email wajib diisi
Format email tidak valid
Email udah terdaftar. Masuk di sini?
No. WhatsApp wajib diisi
Format nomor tidak valid (10-13 digit)
Nomor WhatsApp udah terdaftar. Masuk di sini?
Password wajib diisi
Password minimal 8 karakter
Password harus ada huruf dan angka
Konfirmasi password tidak cocok
Centang setuju Syarat & Ketentuan dulu ya
```

### Toasts
```
Akun berhasil dibuat. Selamat datang!
Kode OTP salah. Coba lagi.
Kode OTP kadaluwarsa. Kirim ulang ya.
Belum dapet kode? Hubungi admin via WA
```



========================================
# FILE: 12-lupa-password.md
========================================

# Screen 12: Lupa Password

## Tujuan
Customer reset password via WhatsApp OTP. Flow: input nomor WA â†’ kirim OTP â†’ verifikasi â†’ set password baru.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                  [Jastip China logo]                          â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     Lupa Password?                â”‚                         â”‚
â”‚  â”‚     Ganti via WhatsApp            â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”€â”€â”€ Step 1 of 3 â”€â”€â”€                â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     No. WhatsApp                  â”‚                         â”‚
â”‚  â”‚     [62 812-3456-7890__________]   â”‚                         â”‚
â”‚  â”‚     Nomor yang terdaftar di akun  â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     [    Kirim Kode OTP    ]     â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â”‚     Ingat password?                â”‚                         â”‚
â”‚  â”‚     [Kembali ke Login]             â”‚                         â”‚
â”‚  â”‚                                    â”‚                         â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                         â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Step 2: Verifikasi OTP

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                                    â”‚
â”‚  Verifikasi Kode                   â”‚
â”‚  â”€â”€â”€ Step 2 of 3 â”€â”€â”€              â”‚
â”‚                                    â”‚
â”‚  Kode OTP udah dikirim ke         â”‚
â”‚  +62 812-3456-7890                â”‚
â”‚                                    â”‚
â”‚  â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”              â”‚
â”‚  â”‚  â”‚ â”‚  â”‚ â”‚  â”‚ â”‚  â”‚              â”‚
â”‚  â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜              â”‚
â”‚                                    â”‚
â”‚  Tunggu kode dalam 59s             â”‚
â”‚  [Kirim Ulang]                     â”‚
â”‚                                    â”‚
â”‚  [     Verifikasi      ]          â”‚
â”‚                                    â”‚
â”‚  [Kembali]                         â”‚
â”‚                                    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Step 3: Password Baru

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                                    â”‚
â”‚  Password Baru                     â”‚
â”‚  â”€â”€â”€ Step 3 of 3 â”€â”€â”€              â”‚
â”‚                                    â”‚
â”‚  Password Baru                     â”‚
â”‚  [__________________________]      â”‚
â”‚                         [Lihat]     â”‚
â”‚  Min 8 karakter, ada angka         â”‚
â”‚                                    â”‚
â”‚  Konfirmasi Password Baru          â”‚
â”‚  [__________________________]      â”‚
â”‚                         [Lihat]     â”‚
â”‚                                    â”‚
â”‚  [    Simpan Password    ]        â”‚
â”‚                                    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Layout Wireframe (Mobile)

```
(Mobile same as desktop, full width card, max-width 440px)
```

---

## Sections

### Section 1: Header (Minimal)
- Centered logo, no nav
- Mobile: back button (goes to `/login` on step 1, previous step on 2/3)

### Section 2: Auth Card
- **Layout:** Center, max-width 440px, padding 40px desktop / 24px mobile
- **Background:** #FFFFFF, border 1px #E8DCC8, radius 16px
- **Step indicator:** "Step X of 3" (Inter 400, 12px, #6B5D52, centered)

### Section 3: Step 1 â€” Input Nomor WhatsApp
- **Title:** "Lupa Password?" (Noto Serif SC 700, 24px)
- **Subtitle:** "Ganti via WhatsApp" (Noto Serif SC 500, 18px, #6B5D52)
- **Field:** No. WhatsApp (same as register)
  - Prefix: "+62" disabled
  - Placeholder: "812-3456-7890"
  - Helper: "Nomor yang terdaftar di akunmu"
  - Validation: format check, must exist in database
- **Button:** "Kirim Kode OTP" (Primary, full width)
- **Link:** "Ingat password? Kembali ke Login" (ghost, â†’ `/login`)

### Section 4: Step 2 â€” Verifikasi OTP
- **Title:** "Verifikasi Kode"
- **Info:** "Kode OTP udah dikirim ke +62 [nomor]"
- **OTP Input:** 4 digit boxes (auto-advance)
- **Resend:** Countdown 60s â†’ "Kirim Ulang"
- **Button:** "Verifikasi" (Primary, full width)
- **Button:** "Kembali" (secondary, â†’ step 1)

### Section 5: Step 3 â€” Password Baru
- **Title:** "Password Baru"
- **Fields:**
  1. Password Baru (password, toggle, same validation as register)
  2. Konfirmasi Password Baru (must match)
- **Button:** "Simpan Password" (Primary, full width)

---

## States

### Step 1: Loading (Sending OTP)
- Button: spinner + "Mengirim..."
- Disable input

### Step 1: Error â€” Nomor Not Found
- Inline error: "Nomor ini belum terdaftar. [Daftar di sini?]"
- Border: 2px #9B4D50

### Step 2: Loading (Verifying)
- Button: spinner + "Memverifikasi..."

### Step 2: Error â€” Wrong OTP
- Toast: "Kode OTP salah. Coba lagi."
- Clear boxes, focus first
- Shake animation

### Step 2: Resent OTP
- Toast: "Kode baru udah dikirim."
- Reset countdown to 60s

### Step 3: Loading (Saving)
- Button: spinner + "Menyimpan..."

### Step 3: Success
- Redirect to `/login` with toast "Password berhasil diubah. Login dengan password baru."
- Auto-fill email (if known) on login page

---

## Interactions

### Step Navigation
- Step 1 â†’ 2: validate nomor + send OTP â†’ advance
- Step 2 â†’ 3: validate OTP â†’ advance
- Step 2 â†’ 1: "Kembali" button (preserve nomor)
- Step 3: submit â†’ success redirect
- No forward skip (must complete each step)

### OTP Auto-Advance
- Same as register: type â†’ next box, backspace â†’ prev box, paste â†’ fill all

### Resend Countdown
- 60s timer, format "Tunggu kode dalam Xs"
- After 0: "Kirim Ulang" clickable (Chinese Red)

### Password Toggle
- "Lihat" / "Sembunyikan" per field

---

## Edge Cases

### Nomor Exists but Multiple Accounts
- (Shouldn't happen â€” unique constraint on noWa)
- Fallback: use first match, show email hint "Akun: na***@email.com"

### OTP Expired
- After 5 minutes: OTP invalid
- Toast: "Kode kadaluwarsa. Kirim ulang."
- Stay on step 2, enable resend

### User Navigates Away Mid-Flow
- If comes back to `/forgot-password`: start fresh (step 1)
- OTP tokens are single-use, expire after 5 min

### Rate Limit on OTP Send
- Max 3 sends per nomor per 15 minutes
- If exceeded: "Terlalu banyak kirim OTP. Tunggu 15 menit ya."

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "RESET PASSWORD" ALL-CAPS
3. âŒ NO email-based reset (WhatsApp is faster for ID market)
4. âŒ NO "security questions" (outdated pattern)
5. âŒ NO password reveal by default (toggle only)
6. âŒ NO auto-advance to step 3 without completing step 2
7. âŒ NO back button that skips validation (step 2 back is fine, but can't jump forward)

---

## Copy

### Step 1
```
Lupa Password?
Ganti via WhatsApp

Step 1 of 3

No. WhatsApp
Nomor yang terdaftar di akunmu

[Kirim Kode OTP]

Ingat password?
Kembali ke Login
```

### Step 2
```
Verifikasi Kode

Step 2 of 3

Kode OTP udah dikirim ke +62 812-3456-7890

[ _ ] [ _ ] [ _ ] [ _ ]

Tunggu kode dalam 59s
[Kirim Ulang]

[Verifikasi]

[Kembali]
```

### Step 3
```
Password Baru

Step 3 of 3

Password Baru
Min 8 karakter, ada huruf dan angka

Konfirmasi Password Baru

[Simpan Password]
```

### Errors
```
Nomor ini belum terdaftar. Daftar di sini?
Format nomor tidak valid
Kode OTP salah. Coba lagi.
Kode kadaluwarsa. Kirim ulang.
Terlalu banyak kirim OTP. Tunggu 15 menit ya.
Konfirmasi password tidak cocok
```

### Toasts
```
Kode baru udah dikirim.
Password berhasil diubah. Login dengan password baru.
```



========================================
# FILE: 13-akun-profil.md
========================================

# Screen 13: Akun Saya (Profile)

## Tujuan
Customer view/edit profile info, manage addresses, logout. Hub untuk akun-related actions.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚              â”‚  â”‚ Akun Saya                               â”‚ â”‚
â”‚  â”‚  [Avatar]    â”‚  â”‚                                          â”‚ â”‚
â”‚  â”‚  Budi S.     â”‚  â”‚  Informasi Pribadi                      â”‚ â”‚
â”‚  â”‚              â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”‚
â”‚  â”‚  â”€â”€â”€ nav â”€â”€â”€ â”‚  â”‚  â”‚ Nama:        Budi Santoso          â”‚ â”‚ â”‚
â”‚  â”‚  Profil      â”‚  â”‚  â”‚ Email:       budi@email.com        â”‚ â”‚ â”‚
â”‚  â”‚  Alamat      â”‚  â”‚  â”‚ WhatsApp:    +62 812-3456-7890     â”‚ â”‚ â”‚
â”‚  â”‚  Pesanan     â”‚  â”‚  â”‚                                    â”‚ â”‚ â”‚
â”‚  â”‚  Bantuan     â”‚  â”‚  â”‚              [Edit Profil]          â”‚ â”‚ â”‚
â”‚  â”‚              â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚
â”‚  â”‚  [Logout]    â”‚  â”‚                                          â”‚ â”‚
â”‚  â”‚              â”‚  â”‚  Alamat Tersimpan                       â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”‚
â”‚                      â”‚  â”‚ (â—‹) Rumah                           â”‚ â”‚ â”‚
â”‚                      â”‚  â”‚     Budi Santoso                    â”‚ â”‚ â”‚
â”‚                      â”‚  â”‚     Jl. Merdeka No. 123            â”‚ â”‚ â”‚
â”‚                      â”‚  â”‚     Bandung, 40123                  â”‚ â”‚ â”‚
â”‚                      â”‚  â”‚                        [Edit]       â”‚ â”‚ â”‚
â”‚                      â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚ â”‚
â”‚                      â”‚  â”‚ ( ) Kantor                          â”‚ â”‚ â”‚
â”‚                      â”‚  â”‚     Budi Santoso                    â”‚ â”‚ â”‚
â”‚                      â”‚  â”‚     Jl. Sudirman No. 45            â”‚ â”‚ â”‚
â”‚                      â”‚  â”‚     Jakarta, 12190                  â”‚ â”‚ â”‚
â”‚                      â”‚  â”‚                        [Edit]       â”‚ â”‚
â”‚                      â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚ â”‚
â”‚                      â”‚  â”‚ + Tambah Alamat Baru                â”‚ â”‚ â”‚
â”‚                      â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚
â”‚                      â”‚                                          â”‚ â”‚
â”‚                      â”‚  Statistik                              â”‚ â”‚
â”‚                      â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”     â”‚ â”‚
â”‚                      â”‚  â”‚  3     â”‚ â”‚  1     â”‚ â”‚ 12     â”‚     â”‚ â”‚
â”‚                      â”‚  â”‚Pesananâ”‚ â”‚Proses  â”‚ â”‚Produk  â”‚     â”‚ â”‚
â”‚                      â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â”‚ â”‚
â”‚                      â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Akun Saya           â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  [Avatar] Budi S.     â”‚ â”‚
â”‚  â”‚  budi@email.com       â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚  â”Œâ”€â”€â” Profil              â”‚
â”‚  â””â”€â”€â”˜                     â”‚
â”‚  â”Œâ”€â”€â” Alamat              â”‚
â”‚  â””â”€â”€â”˜                     â”‚
â”‚  â”Œâ”€â”€â” Pesanan Saya        â”‚
â”‚  â””â”€â”€â”˜                     â”‚
â”‚  â”Œâ”€â”€â” Bantuan             â”‚
â”‚  â””â”€â”€â”˜                     â”‚
â”‚                            â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ Alamat Tersimpan     â”‚ â”‚
â”‚  â”‚                      â”‚ â”‚
â”‚  â”‚ (â—‹) Rumah            â”‚ â”‚
â”‚  â”‚ Budi Santoso         â”‚ â”‚
â”‚  â”‚ Jl. Merdeka No. 123  â”‚ â”‚
â”‚  â”‚ Bandung, 40123       â”‚ â”‚
â”‚  â”‚            [Edit]    â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚ ( ) Kantor           â”‚ â”‚
â”‚  â”‚ ...                  â”‚ â”‚
â”‚  â”‚            [Edit]    â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚ + Tambah Alamat Baru â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚  [Logout]                  â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Edit Profil Modal):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  â”â”â” (drag handle)        â”‚
â”‚                      [X]  â”‚
â”‚  Edit Profil              â”‚
â”‚                           â”‚
â”‚  Nama Lengkap             â”‚
â”‚  [Budi Santoso________]   â”‚
â”‚                           â”‚
â”‚  Email                    â”‚
â”‚  [budi@email.com_______]  â”‚
â”‚  (tidak bisa diubah)      â”‚
â”‚                           â”‚
â”‚  No. WhatsApp             â”‚
â”‚  [62 812-3456-7890______] â”‚
â”‚  (verifikasi OTP jika ganti)â”‚
â”‚                           â”‚
â”‚  [Simpan Perubahan]       â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Standard nav, "Akun" or no active menu
- Mobile: back button, title "Akun Saya"

### Section 2: Profile Sidebar (Desktop)
- **Layout:** Left sidebar, 240px, sticky
- **Content:**
  - Avatar circle 64x64px (initials "BS" in gold bg, or uploaded photo)
  - Name (Noto Serif SC 500, 18px)
  - Divider (1px #E8DCC8)
  - Nav links:
    - Profil (active)
    - Alamat
    - Pesanan Saya â†’ `/pesanan`
    - Bantuan â†’ `/bantuan`
  - Logout button (bottom, secondary, danger style)

### Section 2 (Mobile): Profile Card
- **Layout:** Full width card
- **Content:** Avatar + Name + Email
- **Nav:** List items (Profil, Alamat, Pesanan, Bantuan) with chevron right

### Section 3: Informasi Pribadi
- **Layout:** Card container, padding 24px
- **Content:** Read-only display of:
  - Nama: Budi Santoso
  - Email: budi@email.com
  - WhatsApp: +62 812-3456-7890
- **Action:** "Edit Profil" button (ghost, top-right) â†’ opens modal

### Section 4: Alamat Tersimpan
- **Layout:** Card container
- **Content:** List of saved addresses (radio list, default indicated)
- **Each address:**
  - Radio (default selection)
  - Label (Rumah, Kantor, etc.)
  - Penerima name
  - Alamat multi-line
  - "Edit" button (ghost)
- **Action:** "+ Tambah Alamat Baru" (ghost button, bottom of list)
- **Mobile:** Same card, full width

### Section 5: Statistik (Desktop only)
- **Layout:** 3 stat boxes, horizontal
- **Content:**
  - Total Pesanan (count)
  - Sedang Proses (count)
  - Produk Dilihat (count, optional)
- **Style:** Number (Noto Serif SC 700, 32px, Chinese Red), label (Inter 400, 12px)
- **ANTI-PATTERN:** NO count-up animation (static display)

### Section 6: Logout
- **Desktop:** In sidebar bottom
- **Mobile:** Below all sections, full width secondary button
- **Behavior:** Click â†’ confirm modal "Yakin mau logout?" â†’ clear token â†’ redirect `/beranda`

---

## States

### Loading
- Skeleton profile card, skeleton address list

### Edit Modal â€” Loading (Save)
- Button: spinner + "Menyimpan..."
- Disable inputs

### Edit Modal â€” WhatsApp Change
- If WhatsApp changed: show OTP verification (reuse register OTP flow)
- If unchanged: direct save

### Logout Confirm
- Modal: "Yakin mau logout?"
- Buttons: "Batal" (secondary) + "Ya, Logout" (primary, red-tinted)

### No Addresses
- Address card: empty state
- "Belum ada alamat. Tambah dulu biar checkout lebih cepat."
- CTA: "+ Tambah Alamat Baru"

---

## Interactions

### Edit Profil
- Click "Edit Profil" â†’ modal opens
- Fields: Nama (editable), Email (read-only, disabled), WhatsApp (editable)
- Save â†’ if WhatsApp changed, trigger OTP modal â†’ on verify, save + close
- If only name changed: direct save + toast "Profil berhasil diupdate"

### Address Edit
- Click "Edit" â†’ navigate to `/akun/alamat/[id]` or inline modal form
- Same form as checkout address modal

### Add Address
- Click "+ Tambah Alamat Baru" â†’ modal form
- Fields: Label, Penerima, No. Telp, Alamat, Kota, Provinsi, Kode Pos
- Save â†’ add to list, toast "Alamat baru tersimpan"

### Set Default Address
- Click radio â†’ API update â†’ toast "Alamat utama diubah"

### Delete Address
- In edit modal: "Hapus Alamat" (danger link)
- Confirm: "Hapus alamat ini?"
- If it was default: auto-set next as default, toast "Alamat utama diubah otomatis"

### Nav Links
- Profil: stay (or scroll to top)
- Alamat: scroll to address section (desktop) or `/akun/alamat` (mobile)
- Pesanan Saya: navigate to `/pesanan`
- Bantuan: navigate to `/bantuan`

---

## Edge Cases

### Avatar Upload (Backlog)
- MVP: use initials (BS) in gold circle
- Backlog: allow photo upload

### Email Cannot Change
- Email is account identity â†’ disabled in edit form
- Helper: "Email nggak bisa diubah. Kalau mau ganti email, hubungi admin."

### WhatsApp Already Used Elsewhere
- On change + verify: if nomor taken by another account
- Error: "Nomor ini dipake akun lain. Hubungi admin kalau ini akun kamu."

### Many Addresses (>5)
- Show all, scrollable card (max-height 400px, overflow-y)
- Or "Lihat Semua Alamat" expandable

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "MY ACCOUNT" / "PROFILE" ALL-CAPS
3. âŒ NO settings gear icon menu (use list items)
4. âŒ NO "Account deletion" button (MVP: contact admin to delete)
5. âŒ NO notification preference toggles (backlog)
6. âŒ NO "Connected accounts" (no social login)
7. âŒ NO count-up animation on statistics
8. âŒ NO "2FA settings" (WhatsApp OTP is the 2FA)
9. âŒ NO "Change email" flow (email immutable for MVP)

---

## Copy

### Page Title (H1)
```
Akun Saya
```

### Sidebar Nav
```
Profil
Alamat
Pesanan Saya
Bantuan

[Logout]
```

### Informasi Pribadi
```
Informasi Pribadi

Nama:        Budi Santoso
Email:       budi@email.com
WhatsApp:    +62 812-3456-7890

[Edit Profil]
```

### Edit Modal
```
Edit Profil

Nama Lengkap
[Budi Santoso]

Email
[budi@email.com]
(tidak bisa diubah)

No. WhatsApp
[+62 812-3456-7890]
(verifikasi OTP jika ganti)

[Simpan Perubahan]
```

### Alamat
```
Alamat Tersimpan

(â—‹) Rumah
Budi Santoso
Jl. Merdeka No. 123
RT 01 RW 02
Bandung, Jawa Barat
40123
[Edit]

( ) Kantor
Budi Santoso
Jl. Sudirman No. 45
Jakarta Pusat, DKI Jakarta
12190
[Edit]

+ Tambah Alamat Baru
```

### Statistik
```
3          1          12
Pesanan    Proses     Dilihat
```

### Logout
```
[Logout]

Yakin mau logout?
[Batal]  [Ya, Logout]
```

### Toasts
```
Profil berhasil diupdate
Alamat baru tersimpan
Alamat utama diubah
Alamat utama diubah otomatis
```



========================================
# FILE: 14-detail-po.md
========================================

# Screen 14: Detail Permintaan PO

## Tujuan
Customer lihat detail permintaan PO yang diajukan, termasuk penawaran harga dari admin (jika ada), dan aksi: setuju/tolak penawaran.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Home / Akun / Permintaan PO / PO-20240120-001  (breadcrumb) â”‚
â”‚                                                                â”‚
â”‚  Permintaan PO PO-20240120-001                                â”‚
â”‚  [Menunggu Penawaran]                                         â”‚
â”‚  20 Jan 2024, 19:45 WIB                                      â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚  Detail Permintaan       â”‚  â”‚  Penawaran Admin          â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚  Link Produk:            â”‚  â”‚  Status:                  â”‚  â”‚
â”‚  â”‚  https://taobao.com/...  â”‚  â”‚  [Sudah Ditawarkan]      â”‚  â”‚
â”‚  â”‚  [Buka Link]             â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  Harga per Unit:         â”‚  â”‚
â”‚  â”‚  Deskripsi:               â”‚  â”‚  Rp 450.000              â”‚  â”‚
â”‚  â”‚  Sepatu running brand X  â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚  size 42 warna hitam...  â”‚  â”‚  Jumlah: 1               â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚  Foto Referensi:         â”‚  â”‚  Subtotal:               â”‚  â”‚
â”‚  â”‚  â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”          â”‚  â”‚  Rp 450.000              â”‚  â”‚
â”‚  â”‚  â”‚  â”‚ â”‚  â”‚ â”‚  â”‚          â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚  â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜          â”‚  â”‚  Biaya Jasa Titip (10%): â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  Rp 45.000               â”‚  â”‚
â”‚  â”‚  Jumlah Diminta: 1       â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  Estimasi Ongkir:        â”‚  â”‚
â”‚  â”‚  Catatan Kamu:            â”‚  â”‚  Rp 150.000              â”‚  â”‚
â”‚  â”‚  (jika ada)               â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€           â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  Total Estimasi:         â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  Rp 645.000              â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  Catatan Admin:           â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  Produk ini available,  â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  tapi pengiriman butuh  â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  2 minggu.               â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  [Setuju & Lanjut]       â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚  [Tolak Penawaran]       â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                          â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Detail Permintaan   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ PO-20240120-001            â”‚
â”‚ [Menunggu Penawaran]       â”‚
â”‚ 20 Jan 2024, 19:45 WIB    â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Detail Permintaan      â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Link Produk:           â”‚ â”‚
â”‚ â”‚ https://taobao.com/... â”‚ â”‚
â”‚ â”‚ [Buka Link]            â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Deskripsi:             â”‚ â”‚
â”‚ â”‚ Sepatu running brand X â”‚ â”‚
â”‚ â”‚ size 42 warna hitam... â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Foto Referensi:        â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â” â”Œâ”€â”€â” â”Œâ”€â”€â”         â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”˜ â””â”€â”€â”˜ â””â”€â”€â”˜         â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Jumlah Diminta: 1      â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Penawaran Admin        â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Status:                â”‚ â”‚
â”‚ â”‚ [Sudah Ditawarkan]     â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Harga per Unit:        â”‚ â”‚
â”‚ â”‚ Rp 450.000             â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Jumlah: 1              â”‚ â”‚
â”‚ â”‚ Subtotal: 450.000      â”‚ â”‚
â”‚ â”‚ Jasa Titip: 45.000     â”‚ â”‚
â”‚ â”‚ Estimasi Ongkir: 150K  â”‚ â”‚
â”‚ â”‚ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€          â”‚ â”‚
â”‚ â”‚ Total Estimasi:        â”‚ â”‚
â”‚ â”‚ Rp 645.000             â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Catatan Admin:         â”‚ â”‚
â”‚ â”‚ Produk available,      â”‚ â”‚
â”‚ â”‚ pengiriman butuh       â”‚ â”‚
â”‚ â”‚ 2 minggu.              â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Setuju] [Tolak]          â”‚ â† sticky CTA (if ditawar)
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Breadcrumb (desktop): Home / Akun / Permintaan PO / [PO-ID]
- Mobile: back button, title "Detail Permintaan"

### Section 2: Header Info
- PO number (H1, Noto Serif SC 700, 24px desktop / 20px mobile)
- Status badge:
  - MENUNGGU_PENAWARAN: "Menunggu Penawaran" (gold)
  - SUDAH_DITAWAR: "Sudah Ditawarkan" (jade)
  - DITERIMA: "Diterima" (jade)
  - DITOLAK: "Ditolak" (red-muted)
  - KADALUWARSA: "Kadaluwarsa" (grey)
- Tanggal ajukan (Inter 400, 14px, #6B5D52)

### Section 3: Detail Permintaan (Left/Top)
- **Layout:** Card container
- **Content:**
  - **Link Produk:** URL display (truncated) + "Buka Link" button (ghost, opens new tab)
  - **Deskripsi:** Full text (read-only)
  - **Foto Referensi:** Thumbnail grid (max 3, 80x80px each, click â†’ fullscreen)
  - **Jumlah Diminta:** Number display
  - **Catatan Kamu:** (if ada) optional field, user's note when submitting

### Section 4: Penawaran Admin (Right/Bottom)
- **Layout:** Card container
- **Conditional:** Only show content if status = SUDAH_DITAWAR or DITERIMA
- **Content:**
  - Status: "Sudah Ditawarkan"
  - Harga per Unit (Noto Serif SC 700, 24px, gold)
  - Jumlah (echo from permintaan)
  - Subtotal (harga Ã— jumlah)
  - Biaya Jasa Titip (10% of subtotal, min Rp 15.000)
  - Estimasi Ongkir (from admin input)
  - Divider
  - Total Estimasi (Noto Serif SC 700, 28px, gold)
  - Catatan Admin (textarea display, read-only)
- **Actions (if SUDAH_DITAWAR):**
  - "Setuju & Lanjut ke Pembayaran" (Primary) â†’ creates pesanan from PO
  - "Tolak Penawaran" (secondary, red-tinted) â†’ sets status DITOLAK

### Section 5: Empty Penawaran (Status: MENUNGGU_PENAWARAN)
- **Content:** "Admin lagi review permintaanmu. Penawaran akan muncul di sini dalam 1-2 hari kerja."
- **Style:** Centered text, icon clock, #6B5D52

---

## States

### Loading
- Skeleton both cards

### MENUNGGU_PENAWARAN
- Penawaran card: empty state (waiting message)
- No action buttons

### SUDAH_DITAWAR
- Penawaran card: full content
- Action buttons: Setuju + Tolak
- Mobile: sticky CTA bar

### DITERIMA
- Penawaran card: full content (read-only)
- Link: "Lihat Pesanan INV-..." â†’ `/pesanan/[id]`
- No action buttons

### DITOLAK
- Penawaran card: show rejected offer (strikethrough or greyed)
- Note: "Penawaran ditolak. Bisa ajukan PO baru kapan aja."
- CTA: "Ajukan PO Baru" â†’ `/ajukan-po`

### KADALUWARSA
- Permintaan expired (no response from admin in 7 days)
- Note: "Permintaan kadaluwarsa. Admin belum sempat review. Bisa ajukan ulang."
- CTA: "Ajukan Ulang" â†’ pre-fill form with old data

---

## Interactions

### Buka Link
- Click "Buka Link" â†’ open URL in new tab (`target="_blank"`, `rel="noopener"`)

### Foto Fullscreen
- Click thumbnail â†’ modal fullscreen image
- Swipe through if multiple

### Setuju & Lanjut
- Click "Setuju & Lanjut ke Pembayaran" â†’ confirm modal
- Modal: "Setuju sama penawaran ini? Kamu akan dialihkan ke pembayaran."
- Confirm â†’ API: POST /api/pesanan/from-po â†’ creates pesanan + redirect `/pesanan/[id]/pembayaran`
- Loading: button spinner

### Tolak Penawaran
- Click "Tolak Penawaran" â†’ confirm modal
- Modal: "Yakin tolak penawaran? Permintaan akan ditutup."
- Optional: reason textarea (optional, not required)
- Confirm â†’ API update status DITOLAK â†’ refresh page

### Lihat Pesanan (if DITERIMA)
- Link â†’ navigate to `/pesanan/[id]`

---

## Edge Cases

### Link Tidak Valid (admin found)
- Admin can update link in penawaran with note
- Display updated link + "Link diperbarui admin"

### Harga Lebih Mahal dari Estimasi Customer
- (Customer doesn't set expected price, so no comparison)
- Admin note should explain pricing

### Foto Hilang (R2 expired URL)
- Fallback: placeholder "Foto tidak tersedia"
- Or: re-fetch from API (presigned URL refresh)

### Multiple Rounds of Negotiation (Backlog)
- MVP: single offer, accept or reject
- Backlog: counter-offer flow

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "VIEW OFFER" ALL-CAPS
3. âŒ NO "negotiate" or "counter-offer" flow (MVP: accept/reject only)
4. âŒ NO auto-refresh for penawaran (let user pull to refresh)
5. âŒ NO live chat with admin embedded
6. âŒ NO "Add to cart from PO" (PO converts to direct pesanan)
7. âŒ NO price comparison with catalog (PO is off-catalog by nature)

---

## Copy

### Page Title (H1)
```
Permintaan PO PO-20240120-001
```

### Detail Permintaan
```
Detail Permintaan

Link Produk:
https://taobao.com/...
[Buka Link]

Deskripsi:
Sepatu running brand X, size 42, warna hitam. Beda sama yang di katalog, yang ini ada teknologi sole baru.

Foto Referensi:
[thumb1] [thumb2] [thumb3]

Jumlah Diminta: 1

Catatan Kamu:
Kalau bisa dikirim cepat, tambah ongkir gapapa.
```

### Penawaran Admin
```
Penawaran Admin

Status:
[Sudah Ditawarkan]

Harga per Unit:
Rp 450.000

Jumlah: 1

Subtotal:
Rp 450.000

Biaya Jasa Titip (10%):
Rp 45.000

Estimasi Ongkir:
Rp 150.000

â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Total Estimasi:
Rp 645.000

Catatan Admin:
Produk ini available, tapi pengiriman butuh 2 minggu karena dari gudang beda kota.

[Setuju & Lanjut ke Pembayaran]
[Tolak Penawaran]
```

### Empty Penawaran
```
Admin lagi review permintaanmu.
Penawaran akan muncul di sini dalam 1-2 hari kerja.
```

### Ditolak
```
Penawaran ditolak.
Bisa ajukan PO baru kapan aja.
[Ajukan PO Baru]
```

### Kadaluwarsa
```
Permintaan kadaluwarsa.
Admin belum sempat review. Bisa ajukan ulang.
[Ajukan Ulang]
```

### Diterima
```
Penawaran diterima.
Lihat Pesanan INV-20240120-XXX
```

### Confirm Setuju
```
Setuju sama penawaran ini?
Kamu akan dialihkan ke pembayaran.

[Ya, Lanjut]  [Batal]
```

### Confirm Tolak
```
Yakin tolak penawaran?
Permintaan akan ditutup.

Alasan (opsional):
[                    ]

[Ya, Tolak]  [Batal]
```

### Toasts
```
Permintaan diterima. Lanjut ke pembayaran.
Permintaan ditolak.
```



========================================
# FILE: 15-lacak-pesanan.md
========================================

# Screen 15: Lacak Pesanan

## Tujuan
Customer lacak status pesanan via input nomor invoice (atau deep-link dari notifikasi). Halaman standalone, bisa akses tanpa login (track publik).

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Lacak Pesanan                                               â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Masukkan No. Invoice                                    â”‚ â”‚
â”‚  â”‚  [INV-20240120-I9J0K1L2____________________] [Lacak]    â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  (After search - result):                                     â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  INV-20240120-I9J0K1L2          [Diproses Admin]        â”‚ â”‚
â”‚  â”‚  20 Jan 2024                                          â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  â—â”â”â”â—â”â”â”â—‹â”â”â”â—‹â”â”â”â—‹                                     â”‚ â”‚
â”‚  â”‚  Bayar  Proses  Konsol  Lokal  Selesai                â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  Detail Status:                                         â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”‚
â”‚  â”‚  â”‚ âœ“ Bayar           20 Jan 2024, 19:45 WIB          â”‚ â”‚ â”‚
â”‚  â”‚  â”‚ âœ“ Verifikasi      21 Jan 2024, 09:15 WIB          â”‚ â”‚ â”‚
â”‚  â”‚  â”‚ â— Diproses Admin  21 Jan 2024, 10:00 WIB (current)â”‚ â”‚ â”‚
â”‚  â”‚  â”‚ â—‹ Dikonsolidasi  -                                 â”‚ â”‚ â”‚
â”‚  â”‚  â”‚ â—‹ Tiba Lokal      -                                 â”‚ â”‚ â”‚
â”‚  â”‚  â”‚ â—‹ Selesai          -                                 â”‚ â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  No. Resi: JNE-1234567890   (if available)             â”‚ â”‚
â”‚  â”‚  Kurir: JNE REG                                         â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  [Lihat Detail Pesanan] (if logged in & own order)     â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Lacak Pesanan      â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Masukkan No. Invoice   â”‚ â”‚
â”‚ â”‚ [INV-20240120-...____] â”‚ â”‚
â”‚ â”‚            [Lacak]     â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ (After search):             â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ INV-20240120-I9J0K1L2  â”‚ â”‚
â”‚ â”‚ [Diproses Admin]       â”‚ â”‚
â”‚ â”‚ 20 Jan 2024            â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ â—â”â”â—â”â”â—‹â”â”â—‹â”â”â—‹          â”‚ â”‚
â”‚ â”‚ B P K L S              â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Detail Status:         â”‚ â”‚
â”‚ â”‚ âœ“ Bayar                â”‚ â”‚
â”‚ â”‚   20 Jan, 19:45        â”‚ â”‚
â”‚ â”‚ âœ“ Verifikasi           â”‚ â”‚
â”‚ â”‚   21 Jan, 09:15        â”‚ â”‚
â”‚ â”‚ â— Diproses Admin       â”‚ â”‚
â”‚ â”‚   21 Jan, 10:00        â”‚ â”‚
â”‚ â”‚ â—‹ Dikonsolidasi        â”‚ â”‚
â”‚ â”‚   -                    â”‚ â”‚
â”‚ â”‚ â—‹ Tiba Lokal           â”‚ â”‚
â”‚ â”‚   -                    â”‚ â”‚
â”‚ â”‚ â—‹ Selesai              â”‚ â”‚
â”‚ â”‚   -                    â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ No. Resi: JNE-123456789â”‚ â”‚
â”‚ â”‚ Kurir: JNE REG         â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Lihat Detail Pesanan]    â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Empty Result):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  [icon: search-x]         â”‚
â”‚                            â”‚
â”‚  Pesanan nggak ketemu     â”‚
â”‚  Cek lagi nomor invoice   â”‚
â”‚  kamu.                     â”‚
â”‚                            â”‚
â”‚  [Coba Lagi]              â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Standard nav, "Cara Order" or "Lacak" active
- Mobile: back button, title "Lacak Pesanan"

### Section 2: Search Box
- **Layout:** Centered, max-width 600px, margin 32px top
- **Content:**
  - Label: "Masukkan No. Invoice" (Inter 500, 14px)
  - Input + "Lacak" button (inline, button right of input)
  - Input: text, monospace, placeholder "INV-20240120-I9J0K1L2"
  - Validation: format check (INV-YYYYMMDD-XXXXXX)
- **Behavior:** Enter key â†’ search, or click "Lacak"

### Section 3: Result Card
- **Layout:** Full width (max 600px center), margin 24px top
- **Content:**
  - Invoice number + status badge
  - Tanggal
  - Timeline (horizontal compact): 5 nodes
  - Detail status (vertical list with timestamps)
  - No. Resi (if available, copyable)
  - Kurir name
- **Action (conditional):** "Lihat Detail Pesanan" if logged in AND owns this order â†’ `/pesanan/[id]`

### Section 4: Empty Result
- **Trigger:** Invoice not found or invalid format
- **Content:**
  - Icon: search-x (line, 80x80px, #E8DCC8)
  - Title: "Pesanan nggak ketemu" (Noto Serif SC 500, 20px)
  - Desc: "Cek lagi nomor invoice kamu." (Inter 400, 14px)
  - CTA: "Coba Lagi" (clear input, focus)

---

## States

### Loading (Searching)
- "Lacak" button: spinner
- Show skeleton result card (shimmer)

### Error (Network)
- Toast: "Gagal lacak. Coba lagi."
- Keep input value

### No Input (Empty search)
- Don't show result card
- Show helper: "Masukin nomor invoice kamu buat lacak status pesanan."

### Deep Link (from notifikasi WhatsApp)
- URL: `/lacak?inv=INV-20240120-I9J0K1L2`
- Auto-fill input + auto-search on mount

---

## Interactions

### Search
- Input + click "Lacak" (or Enter) â†’ validate format â†’ API GET /api/pesanan/track?inv=X
- If valid + found: show result card
- If invalid format: inline error "Format invoice: INV-YYYYMMDD-XXXXXX"
- If not found: show empty result

### Copy No. Resi
- If resi available: tap to copy
- Tooltip: "No. resi tersalin!"

### Lihat Detail Pesanan
- Only visible if: user logged in + this invoice belongs to them
- Click â†’ navigate to `/pesanan/[id]`

### Pull to Refresh (Mobile)
- If result shown: pull down â†’ refetch status
- Update timeline if changed

---

## Edge Cases

### Invoice Belongs to Other User
- Show status (public tracking allowed)
- Don't show "Lihat Detail Pesanan" link
- Privacy: only status + resi visible, no customer info

### Invoice Format Invalid
- Real-time validation as user types
- Helper: "Format: INV-YYYYMMDD-XXXXXX"

### Very Old Invoice (> 6 months)
- Still trackable if in database
- Note: "Pesanan lama. Data mungkin nggak lengkap."

### Resi Not Yet Assigned
- Show "No. Resi: -"
- Helper: "Resi akan muncul setelah dikirim dari China"

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in "Lacak" button
2. âŒ NO "TRACK ORDER" ALL-CAPS
3. âŒ NO required login to track (public access)
4. âŒ NO live auto-refresh (let user manually refresh)
5. âŒ NO map/GPS tracking (we don't have courier API integration)
6. âŒ NO "Estimated delivery countdown"
7. âŒ NO courier deep-link (JNE/J&T external tracking, backlog)

---

## Copy

### Page Title (H1)
```
Lacak Pesanan
```

### Search
```
Masukkan No. Invoice
[INV-20240120-I9J0K1L2]  [Lacak]
Format: INV-YYYYMMDD-XXXXXX
```

### Result
```
INV-20240120-I9J0K1L2
[Diproses Admin]
20 Jan 2024

â—â”â”â—â”â”â—‹â”â”â—‹â”â”â—‹
Bayar Proses Konsol Lokal Selesai

Detail Status:
âœ“ Bayar
  20 Jan 2024, 19:45 WIB
âœ“ Verifikasi
  21 Jan 2024, 09:15 WIB
â— Diproses Admin
  21 Jan 2024, 10:00 WIB
â—‹ Dikonsolidasi
  -
â—‹ Tiba Lokal
  -
â—‹ Selesai
  -

No. Resi: JNE-1234567890
Kurir: JNE REG

[Lihat Detail Pesanan]
```

### Empty Result
```
Pesanan nggak ketemu
Cek lagi nomor invoice kamu.
[Coba Lagi]
```

### Helper (No Input)
```
Masukin nomor invoice kamu buat lacak status pesanan.
```

### Toasts
```
Gagal lacak. Coba lagi.
No. resi tersalin!
```



========================================
# FILE: 16-notifikasi.md
========================================

# Screen 16: Notifikasi

## Tujuan
Customer lihat daftar notifikasi (status pesanan update, penawaran PO, broadcast promo/info). Tandai read, hapus.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Notifikasi                              [Tandai Semua Baca] â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ â— [Pesanan] INV-20240120-I9J0K1L2                        â”‚ â”‚
â”‚  â”‚   Pesananmu lagi diproses admin.                        â”‚ â”‚
â”‚  â”‚   2 jam lalu                                              â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚ â— [PO] PO-20240120-001                                    â”‚ â”‚
â”‚  â”‚   Admin udah kasih penawaran buat permintaan PO kamu.  â”‚ â”‚
â”‚  â”‚   5 jam lalu                                              â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚   [Info] Selamat datang di Jastip China!                 â”‚ â”‚
â”‚  â”‚   Terima kasih udah gabung.                              â”‚ â”‚
â”‚  â”‚   Kemarin                                                  â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚   [Promo] Gratis ongkir untuk pembelian pertama!        â”‚ â”‚
â”‚  â”‚   Pakai kode: GRATISONGKIR                                â”‚ â”‚
â”‚  â”‚   2 hari lalu                                             â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  [Muat Lainnya]                                               â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Notifikasi          â”‚
â”‚              [Tandai Baca]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚â— [Pesanan] INV-...    â”‚ â”‚
â”‚ â”‚  Pesananmu lagi       â”‚ â”‚
â”‚ â”‚  diproses admin.       â”‚ â”‚
â”‚ â”‚  2 jam lalu            â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚â— [PO] PO-20240120-001 â”‚ â”‚
â”‚ â”‚  Admin udah kasih     â”‚ â”‚
â”‚ â”‚  penawaran PO kamu.   â”‚ â”‚
â”‚ â”‚  5 jam lalu            â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚  [Info] Selamat datangâ”‚ â”‚
â”‚ â”‚  Terima kasih gabung. â”‚ â”‚
â”‚ â”‚  Kemarin               â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚  [Promo] Gratis ongkirâ”‚ â”‚
â”‚ â”‚  pembelian pertama!    â”‚ â”‚
â”‚ â”‚  Kode: GRATISONGKIR   â”‚ â”‚
â”‚ â”‚  2 hari lalu           â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Muat Lainnya]            â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Empty State):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚      [icon: bell-off]     â”‚
â”‚                            â”‚
â”‚   Belum ada notifikasi   â”‚
â”‚   Notifikasi bakal        â”‚
â”‚   muncul di sini.         â”‚
â”‚                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Standard nav
- Mobile: back button, title "Notifikasi"
- "Tandai Semua Baca" link (top right, ghost, Chinese Red) â€” only if unread > 0

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
- Click anywhere on item â†’ mark as read (API) + navigate to related page
- PESANAN: â†’ `/pesanan/[id]`
- PO: â†’ `/permintaan-po/[id]`
- INFO: â†’ stay (or `/bantuan` if linked)
- PROMO: â†’ `/katalog` (or `/promo/[id]` if specific)

### Tandai Semua Baca
- Click â†’ API: PATCH /api/notifikasi/read-all
- All unread dots disappear
- All items â†’ normal font-weight
- Toast: "Semua notifikasi ditandai baca"

### Swipe to Delete (Mobile)
- Swipe left on item â†’ reveal "Hapus" (red bg)
- Tap "Hapus" â†’ API delete â†’ item removed (fade-out 200ms)
- Desktop: no swipe, maybe hover "x" button (backlog)

### Pull to Refresh (Mobile)
- Pull down â†’ refetch list
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
- Click â†’ navigate to detail PO
- The PO detail page handles next action (setuju/tolak)

### Promo Expired
- Still show notification (historical)
- Promo link: "Promo udah berakhir" page (or `/katalog`)

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in any notification item
2. âŒ NO "NOTIFICATIONS" label ALL-CAPS
3. âŒ NO push notification permission popup (use WhatsApp broadcast)
4. âŒ NO in-app toast for each notification (list is enough)
5. âŒ NO "Notification settings" page (MVP: all on by default)
6. âŒ NO grouped/stacked notifications (flat list)
7. âŒ NO unread badge count in header (too aggressive for MVP)

---

## Copy

### Page Title (H1)
```
Notifikasi
[Tandai Semua Baca]
```

### List Items
```
â— [Pesanan] INV-20240120-I9J0K1L2
  Pesananmu lagi diproses admin.
  2 jam lalu

â— [PO] PO-20240120-001
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



========================================
# FILE: 17-bantuan.md
========================================

# Screen 17: Bantuan (FAQ + Komplain)

## Tujuan
Customer cari jawaban di FAQ, atau akses form komplain untuk pesanan yang udah selesai.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Bantuan                                                      â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  [ðŸ”] Cari pertanyaan...                    [Cari]      â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚  FAQ                     â”‚  â”‚  Butuh bantuan lain?     â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚  â”€â”€â”€ Umum â”€â”€â”€             â”‚  â”‚  Chat admin via WhatsApp â”‚  â”‚
â”‚  â”‚  [+] Apa itu jastip?     â”‚  â”‚  [Chat WhatsApp]         â”‚  â”‚
â”‚  â”‚  [+] Gimana cara order? â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚  [+] Berapa lama sampai?â”‚  â”‚  â”€â”€â”€ atau â”€â”€â”€              â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚  â”€â”€â”€ Pembayaran â”€â”€â”€      â”‚  â”‚  Ajukan komplain buat    â”‚  â”‚
â”‚  â”‚  [+] Metode bayar apa?  â”‚  â”‚  pesanan yang udah selesaiâ”‚  â”‚
â”‚  â”‚  [+] Berapa lama verif? â”‚  â”‚  [Ajukan Komplain]        â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚  â”€â”€â”€ Pengiriman â”€â”€â”€      â”‚  â”‚  Lihat status komplain:  â”‚  â”‚
â”‚  â”‚  [+] Kurir apa aja?      â”‚  â”‚  [INV-... I9J0K1L2]      â”‚  â”‚
â”‚  â”‚  [+] Lacak gimana?       â”‚  â”‚  [INV-... A1B2C3D4]      â”‚  â”‚
â”‚  â”‚                          â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚  â”€â”€â”€ PO â”€â”€â”€              â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚  [+] Apa itu custom PO? â”‚  â”‚                          â”‚  â”‚
â”‚  â”‚  [+] Berapa lama respon?â”‚  â”‚                          â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Bantuan            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ [ðŸ”] Cari... [Cari]    â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Butuh bantuan lain?    â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Chat admin via WhatsAppâ”‚ â”‚
â”‚ â”‚ [Chat WhatsApp]        â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Ajukan komplain buat   â”‚ â”‚
â”‚ â”‚ pesanan selesai        â”‚ â”‚
â”‚ â”‚ [Ajukan Komplain]      â”‚ â”‚
â”‚ â”‚                        â”‚ â”‚
â”‚ â”‚ Status komplain:       â”‚ â”‚
â”‚ â”‚ [INV-... I9J0K1L2]    â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ FAQ                        â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Umum â”€â”€â”€              â”‚
â”‚ [+] Apa itu jastip?       â”‚
â”‚ [+] Gimana cara order?    â”‚
â”‚ [+] Berapa lama sampai?   â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Pembayaran â”€â”€â”€        â”‚
â”‚ [+] Metode bayar apa?     â”‚
â”‚ [+] Berapa lama verif?    â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Pengiriman â”€â”€â”€        â”‚
â”‚ [+] Kurir apa aja?         â”‚
â”‚ [+] Lacak gimana?         â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ PO â”€â”€â”€                â”‚
â”‚ [+] Apa itu custom PO?   â”‚
â”‚ [+] Berapa lama respon?  â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(FAQ expanded):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [-] Apa itu jastip?      â”‚
â”‚   Jastip = jasa titip.   â”‚
â”‚   Kami titipin belanja   â”‚
â”‚   barang dari China,     â”‚
â”‚   sampai depan pintu      â”‚
â”‚   rumah kamu di Indonesia.â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Standard nav, "Bantuan" active (or under "Cara Order")
- Mobile: back button, title "Bantuan"

### Section 2: Search FAQ
- **Layout:** Full width search bar, margin 24px
- **Content:** Search input + "Cari" button
- **Behavior:** Type + Enter/Cari â†’ filter FAQ list (client-side or API)
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
    - Click â†’ `/komplain/[id]`

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
- One item open at a time (or multiple â€” design choice, multiple OK)
- Smooth expand/collapse (max-height transition 200ms)
- Icon: [+] â†’ [-]

### Search Empty Results
- "Nggak ketemu FAQ yang cocok."
- "Coba kata kunci lain, atau chat admin via WA."
- CTA: "Chat WhatsApp"

### Loading (if API-based FAQ)
- Skeleton accordion items

---

## Interactions

### FAQ Accordion Toggle
- Click question â†’ expand/collapse answer
- Icon rotate: + â†’ x (or + â†’ -)
- Multiple can be open (not exclusive)

### Search
- Debounce 300ms
- Filter FAQ by question + answer text (case-insensitive)
- If search active: hide category headers, show flat results

### Chat WhatsApp
- Click â†’ `window.open(waLink, '_blank')`
- Pre-filled message: "Halo admin, saya mau tanya..."

### Ajukan Komplain
- Click â†’ navigate to `/komplain/pilih-pesanan`
- Page shows list of SELESAI pesanan
- Select one â†’ form komplain

### View Existing Komplain
- Click invoice link â†’ `/komplain/[id]`

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

1. âŒ NO "â†’" in buttons
2. âŒ NO "FAQ" or "HELP CENTER" ALL-CAPS headers
3. âŒ NO category headers in ALL-CAPS (use bold normal case)
4. âŒ NO live chat widget (use WhatsApp link, async)
5. âŒ NO "Was this helpful? Yes/No" on each FAQ (backlog)
6. âŒ NO video tutorials (text FAQ only for MVP)
7. âŒ NO chatbot/AI assistant (use WhatsApp + FAQ)

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



========================================
# FILE: 18-tentang-kami.md
========================================

# Screen 18: Tentang Kami

## Tujuan
Halaman statis brand: siapa Jastip China, bukti sederhana (statistik), kenapa pilih kami, kontak. Bukan landing marketing agresif, tidak ada hard-sell CTA.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Tentang Kami                                                 â”‚
â”‚  é²œè´§ç›´è¾¾                                                      â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Jastip China bantu kamu beli barang langsung dari      â”‚ â”‚
â”‚  â”‚  China tanpa ribet. Pilih dari katalog ready stock,     â”‚ â”‚
â”‚  â”‚  atau ajukan Custom PO kalau barangnya nggak ada        â”‚ â”‚
â”‚  â”‚  di katalog. Kami urus pembelian, konsolidasi,          â”‚ â”‚
â”‚  â”‚  sampai pengiriman ke rumahmu.                          â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”        â”‚
â”‚  â”‚   1.200+     â”‚  â”‚     850+     â”‚  â”‚     4.9      â”‚        â”‚
â”‚  â”‚   Pesanan    â”‚  â”‚   Customer   â”‚  â”‚   Rating     â”‚        â”‚
â”‚  â”‚   terkirim   â”‚  â”‚    aktif     â”‚  â”‚   kepuasan   â”‚        â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜        â”‚
â”‚                                                                â”‚
â”‚  â”€â”€â”€ cloud pattern border (5% opacity) â”€â”€â”€                   â”‚
â”‚                                                                â”‚
â”‚  Kenapa Jastip China                                         â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Harga transparan                                        â”‚ â”‚
â”‚  â”‚  Harga produk + jasa titip + ongkir dirinci jelas       â”‚ â”‚
â”‚  â”‚  sebelum kamu bayar. Nggak ada biaya siluman.           â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚  Update status otomatis                                  â”‚ â”‚
â”‚  â”‚  Tiap tahap pesanan (verifikasi, proses, kirim)         â”‚ â”‚
â”‚  â”‚  muncul di halaman lacak + notifikasi.                  â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚  Custom PO                                               â”‚ â”‚
â”‚  â”‚  Barang nggak ada di katalog? Kirim link produk China,  â”‚ â”‚
â”‚  â”‚  tim kami kasih estimasi harga 1-2 hari kerja.          â”‚ â”‚
â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  â”‚  Jalur komplain jelas                                   â”‚ â”‚
â”‚  â”‚  Barang rusak atau nggak sesuai? Ajukan komplain        â”‚ â”‚
â”‚  â”‚  langsung dari detail pesanan.                          â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Hubungi kami                                            â”‚ â”‚
â”‚  â”‚  WhatsApp: 0812-0000-0000        [Chat WhatsApp]        â”‚ â”‚
â”‚  â”‚  Email: hello@jastipchina.id                            â”‚ â”‚
â”‚  â”‚  Jam: Senin-Sabtu, 09:00-18:00 WIB                      â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Tentang Kami        â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ Tentang Kami               â”‚
â”‚ é²œè´§ç›´è¾¾                    â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Jastip China bantu     â”‚ â”‚
â”‚ â”‚ kamu beli barang       â”‚ â”‚
â”‚ â”‚ langsung dari China... â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚1.200+â”‚ â”‚ 850+ â”‚ â”‚ 4.9  â”‚ â”‚
â”‚ â”‚Kirim â”‚ â”‚Cust. â”‚ â”‚Ratingâ”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ Kenapa Jastip China        â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Harga transparan       â”‚ â”‚
â”‚ â”‚ Harga + jasa + ongkir  â”‚ â”‚
â”‚ â”‚ dirinci jelas...       â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ Update status otomatis â”‚ â”‚
â”‚ â”‚ ...                    â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ Custom PO              â”‚ â”‚
â”‚ â”‚ ...                    â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ Jalur komplain jelas   â”‚ â”‚
â”‚ â”‚ ...                    â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Hubungi kami           â”‚ â”‚
â”‚ â”‚ WA: 0812-0000-0000     â”‚ â”‚
â”‚ â”‚ [Chat WhatsApp]        â”‚ â”‚
â”‚ â”‚ hello@jastipchina.id   â”‚ â”‚
â”‚ â”‚ Senin-Sabtu 09-18 WIB  â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Standard nav, no active menu (or "Tentang Kami" if in footer link context)
- Mobile: back button, title "Tentang Kami"

### Section 2: Title + Tagline
- **Title:** "Tentang Kami" (H1, Noto Serif SC 700, 32px desktop / 24px mobile)
- **Tagline:** "é²œè´§ç›´è¾¾" (Ma Shan Zheng, 24px, Chinese Red)
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
- **Behavior:** Chat button â†’ `window.open(wa.me/...)`

---

## States

### Loading
- Static page, no skeleton needed (content bundled, renders instantly)

### Error
- N/A (no API dependency; stats are static text updated manually)

---

## Interactions

### Chat WhatsApp
- Click â†’ open wa.me link in new tab with pre-filled message

### Email
- Click â†’ `mailto:` link

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

1. âŒ NO hero banner with CTA button
2. âŒ NO "ABOUT US" / "TENTANG KAMI" ALL-CAPS eyebrow label
3. âŒ NO count-up animation on stats
4. âŒ NO team member photos (fake team = trust killer)
5. âŒ NO testimonial carousel (no verified review system yet)
6. âŒ NO "Our Mission / Our Vision" corporate blocks
7. âŒ NO timeline "Founded 2020 â†’ 2021 â†’ ..." decoration
8. âŒ NO gradient background
9. âŒ NO "â†’" in buttons

---

## Copy

### Page Title (H1)
```
Tentang Kami
é²œè´§ç›´è¾¾
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



========================================
# FILE: 19-cara-order.md
========================================

# Screen 19: Cara Order

## Tujuan
Panduan 6 langkah order untuk customer baru. Edukasi alur transaksi end-to-end agar customer paham sebelum belanja. Ini satu-satunya halaman yang boleh pakai angka berurutan sebagai konten fungsional (bukan dekorasi).

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                                â”‚
â”‚  Cara Order                                                   â”‚
â”‚  Belanja barang China dalam 6 langkah gampang               â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”        â”‚
â”‚  â”‚      1       â”‚  â”‚      2       â”‚  â”‚      3       â”‚        â”‚
â”‚  â”‚              â”‚  â”‚              â”‚  â”‚              â”‚        â”‚
â”‚  â”‚ Pilih produk â”‚  â”‚   Checkout   â”‚  â”‚   Transfer   â”‚        â”‚
â”‚  â”‚              â”‚  â”‚              â”‚  â”‚              â”‚        â”‚
â”‚  â”‚ Cari di      â”‚  â”‚ Tentuin      â”‚  â”‚ Transfer ke  â”‚        â”‚
â”‚  â”‚ katalog atau â”‚  â”‚ alamat +     â”‚  â”‚ rekening     â”‚        â”‚
â”‚  â”‚ ajukan PO... â”‚  â”‚ kurir...     â”‚  â”‚ kami...      â”‚        â”‚
â”‚  â”‚              â”‚  â”‚              â”‚  â”‚              â”‚        â”‚
â”‚  â”‚ [Lihat       â”‚  â”‚ [Ke          â”‚  â”‚              â”‚        â”‚
â”‚  â”‚  Katalog]    â”‚  â”‚  Keranjang]  â”‚  â”‚              â”‚        â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜        â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”        â”‚
â”‚  â”‚      4       â”‚  â”‚      5       â”‚  â”‚      6       â”‚        â”‚
â”‚  â”‚              â”‚  â”‚              â”‚  â”‚              â”‚        â”‚
â”‚  â”‚ Upload bukti â”‚  â”‚  Kami belikanâ”‚  â”‚   Sampai di  â”‚        â”‚
â”‚  â”‚              â”‚  â”‚              â”‚  â”‚    rumahmu   â”‚        â”‚
â”‚  â”‚ Upload bukti â”‚  â”‚ Tim kami     â”‚  â”‚ Kurir antar  â”‚        â”‚
â”‚  â”‚ transfer,    â”‚  â”‚ belikan +    â”‚  â”‚ ke alamatmu. â”‚        â”‚
â”‚  â”‚ admin verif..â”‚  â”‚ kirim...     â”‚  â”‚ Lacak di...  â”‚        â”‚
â”‚  â”‚              â”‚  â”‚              â”‚  â”‚              â”‚        â”‚
â”‚  â”‚              â”‚  â”‚              â”‚  â”‚ [Lacak       â”‚        â”‚
â”‚  â”‚              â”‚  â”‚              â”‚  â”‚  Pesanan]    â”‚        â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜        â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Masih bingung? Chat admin via WhatsApp                  â”‚ â”‚
â”‚  â”‚  [Chat WhatsApp]                                          â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Cara Order         â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ Cara Order                 â”‚
â”‚ Belanja barang China       â”‚
â”‚ dalam 6 langkah gampang    â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚  1  Pilih produk       â”‚ â”‚
â”‚ â”‚     Cari di katalog    â”‚ â”‚
â”‚ â”‚     atau ajukan PO.    â”‚ â”‚
â”‚ â”‚     [Lihat Katalog]    â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚  2  Checkout           â”‚ â”‚
â”‚ â”‚     Tentuin alamat +   â”‚ â”‚
â”‚ â”‚     kurir.             â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚  3  Transfer           â”‚ â”‚
â”‚ â”‚     Transfer ke        â”‚ â”‚
â”‚ â”‚     rekening kami.     â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚  4  Upload bukti       â”‚ â”‚
â”‚ â”‚     Upload bukti,      â”‚ â”‚
â”‚ â”‚     admin verifikasi.  â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚  5  Kami belikan       â”‚ â”‚
â”‚ â”‚     Tim belikan +      â”‚ â”‚
â”‚ â”‚     kirim.             â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚  6  Sampai di rumahmu  â”‚ â”‚
â”‚ â”‚     Lacak di halaman   â”‚ â”‚
â”‚ â”‚     lacak.             â”‚ â”‚
â”‚ â”‚     [Lacak Pesanan]    â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Masih bingung?         â”‚ â”‚
â”‚ â”‚ [Chat WhatsApp]        â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Standard nav, "Cara Order" active
- Mobile: back button, title "Cara Order"

### Section 2: Title + Subtitle
- **Title:** "Cara Order" (H1, Noto Serif SC 700, 32px desktop / 24px mobile)
- **Subtitle:** "Belanja barang China dalam 6 langkah gampang" (Inter 400, 16px, #6B5D52)

### Section 3: Steps Grid
- **Layout (Desktop):** 3-col grid, 2 rows (steps 1-3 top, 4-6 bottom), gap 24px
- **Layout (Tablet):** 2-col grid, 3 rows
- **Layout (Mobile):** Vertical list, 1 col, dividers between steps
- **Each step card:**
  ```
  Background: #FFFFFF
  Border: 1px solid #E8DCC8
  Radius: 12px
  Padding: 24px desktop / 16px mobile
  Content:
    - Step number (circle, 40x40px, background Chinese Red, white text, Noto Serif SC 700, 20px)
    - Title (Noto Serif SC 600, 18px)
    - Description (Inter 400, 14px, #6B5D52, 2-3 sentences)
    - Link (optional, steps 1, 2, 6 only): ghost link, Chinese Red
  ```

### Section 4: Help Box
- **Layout:** Card, full width, margin 48px top
- **Background:** #F7F3EC
- **Border-left:** 4px solid #7C9885 (jade, friendly tone)
- **Content:** "Masih bingung? Chat admin via WhatsApp" + "Chat WhatsApp" button

---

## States

### Loading
- Static page, renders instantly, no skeleton

### Error
- N/A (no API dependency)

---

## Interactions

### Step Links
- Step 1 "Lihat Katalog" â†’ `/katalog`
- Step 2 "Ke Keranjang" â†’ `/keranjang`
- Step 6 "Lacak Pesanan" â†’ `/lacak`
- Other steps: no link (info only)

### Chat WhatsApp
- Click â†’ wa.me link, new tab

---

## Edge Cases

### User Already Knows Flow
- Page is reference, not forced wizard
- No "Next/Prev" navigation, all steps visible at once

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "HOW TO ORDER" / "STEP BY STEP" ALL-CAPS eyebrow
3. âŒ NO animated step connector line with moving dot
4. âŒ NO auto-play video tutorial
5. âŒ NO "Start Shopping Now!" aggressive CTA at bottom
6. âŒ NO decorative 01/02/03 large background numbers (the small numbered circles ARE the content, keep them 40px, functional, not decorative wallpaper)
7. âŒ NO gradient background

---

## Copy

### Page Title (H1)
```
Cara Order
Belanja barang China dalam 6 langkah gampang
```

### Steps

```
1. Pilih produk
Cari di katalog ready stock, atau ajukan Custom PO kalau barangnya nggak ada di katalog. Tentuin varian + jumlah.
[Lihat Katalog]

2. Checkout
Masukin keranjang, terus checkout. Pilih alamat pengiriman + kurir domestik. Cek rincian biaya sebelum lanjut bayar.
[Ke Keranjang]

3. Transfer
Transfer total bayar ke rekening bank kami (BCA / Mandiri). Nominal harus pas sesuai invoice.

4. Upload bukti
Upload foto bukti transfer di halaman pembayaran. Admin verifikasi maksimal 1x24 jam. Tunggu notifikasi.

5. Kami belikan
Setelah pembayaran terverifikasi, tim kami belikan barang dari China, konsolidasi, terus kirim ke Indonesia.

6. Sampai di rumahmu
Kurir domestik antar ke alamatmu. Lacak status kapan aja pakai nomor invoice.
[Lacak Pesanan]
```

### Help Box
```
Masih bingung? Chat admin via WhatsApp
[Chat WhatsApp]
```



========================================
# FILE: 20-ajukan-komplain.md
========================================

# Screen 20: Ajukan Komplain

## Tujuan
Customer ajukan komplain untuk pesanan SELESAI. Form dedicated: pilih item (jika multi-item), alasan, deskripsi, foto wajib. SLA jelas.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [Jastip China]   Beranda  Katalog  Cara Order  [â™¡] [ðŸ›’] [ðŸ‘¤] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  Home / Riwayat / INV-... / Komplain  (breadcrumb)           â”‚
â”‚                                                                â”‚
â”‚  Ajukan Komplain                                              â”‚
â”‚  Pesanan INV-20240115-A1B2C3D4                                â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Info box                                                â”‚ â”‚
â”‚  â”‚  Komplain cuma bisa buat pesanan yang udah selesai.     â”‚ â”‚
â”‚  â”‚  Admin respon maksimal 2x24 jam hari kerja.              â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Item yang Dikomplain *                                  â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  (â—‹) Tas Backpack Premium (Hitam) â€” Rp 282.000 x1      â”‚ â”‚
â”‚  â”‚  (â—‹) Kaos Oversized (Size L Hitam) â€” Rp 35.250 x2       â”‚ â”‚
â”‚  â”‚  (â—‹) Semua item di pesanan ini                          â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  Alasan Komplain *                                       â”‚ â”‚
â”‚  â”‚  (â—‹) Barang rusak                                        â”‚ â”‚
â”‚  â”‚  (â—‹) Barang tidak sesuai deskripsi                       â”‚ â”‚
â”‚  â”‚  (â—‹) Salah kirim (varian / jumlah)                       â”‚ â”‚
â”‚  â”‚  (â—‹) Lainnya                                             â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  Deskripsi Masalah *                                     â”‚ â”‚
â”‚  â”‚  [                                                      ] â”‚ â”‚
â”‚  â”‚  [  Strap kanan tas putus pas barang sampai...        ] â”‚ â”‚
â”‚  â”‚  [                                                      ] â”‚ â”‚
â”‚  â”‚  Minimal 20 karakter                                     â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  Foto Bukti (wajib, min 1, max 5)                       â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”‚ â”‚
â”‚  â”‚  â”‚                                                    â”‚    â”‚ â”‚
â”‚  â”‚  â”‚  [Drop foto di sini] atau [Pilih File]          â”‚    â”‚ â”‚
â”‚  â”‚  â”‚  JPG/PNG, max 5MB per foto                       â”‚    â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â”‚ â”‚
â”‚  â”‚  â”Œâ”€â”€â” â”Œâ”€â”€â”                                               â”‚ â”‚
â”‚  â”‚  â”‚  â”‚ â”‚  â”‚  (preview uploaded)                           â”‚ â”‚
â”‚  â”‚  â””â”€â”€â”˜ â””â”€â”€â”˜                                               â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â”‚  [Kirim Komplain]                                        â”‚ â”‚
â”‚  â”‚                                                          â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                                â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Footer                                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Ajukan Komplain    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ Ajukan Komplain            â”‚
â”‚ INV-20240115-A1B2C3D4     â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Komplain cuma bisa     â”‚ â”‚
â”‚ â”‚ buat pesanan selesai.  â”‚ â”‚
â”‚ â”‚ Admin respon 2x24 jam. â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ Item yang Dikomplain *     â”‚
â”‚ (â—‹) Tas Backpack (Hitam)   â”‚
â”‚ (â—‹) Kaos Oversized (L)     â”‚
â”‚ (â—‹) Semua item             â”‚
â”‚                            â”‚
â”‚ Alasan Komplain *          â”‚
â”‚ (â—‹) Barang rusak           â”‚
â”‚ (â—‹) Tidak sesuai deskripsi â”‚
â”‚ (â—‹) Salah kirim            â”‚
â”‚ (â—‹) Lainnya                â”‚
â”‚                            â”‚
â”‚ Deskripsi Masalah *        â”‚
â”‚ [                          ] â”‚
â”‚ [  Strap kanan putus...   ] â”‚
â”‚ [                          ] â”‚
â”‚ Min 20 karakter            â”‚
â”‚                            â”‚
â”‚ Foto Bukti (wajib)         â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ [Drop/Pilih File]      â”‚ â”‚
â”‚ â”‚ JPG/PNG, 5MB max      â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚ â”Œâ”€â”€â” â”Œâ”€â”€â”                 â”‚
â”‚ â”‚  â”‚ â”‚  â”‚                 â”‚
â”‚ â””â”€â”€â”˜ â””â”€â”€â”˜                 â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Kirim Komplain]          â”‚ â† sticky CTA
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Home][Katalog][+][Cart][Me]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Success state):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                            â”‚
â”‚        [icon: check]       â”‚
â”‚                            â”‚
â”‚   Komplain terkirim        â”‚
â”‚   Admin respon maksimal    â”‚
â”‚   2x24 jam hari kerja. Kamuâ”‚
â”‚   bakal dikabarin via      â”‚
â”‚   notifikasi.              â”‚
â”‚                            â”‚
â”‚   [Lihat Riwayat]         â”‚
â”‚   [Kembali ke Beranda]    â”‚
â”‚                            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Header
- Breadcrumb (desktop): Home / Riwayat / [Invoice] / Komplain
- Mobile: back button (â†’ `/pesanan/[id]`), title "Ajukan Komplain"

### Section 2: Title + Invoice
- "Ajukan Komplain" (H1)
- "Pesanan INV-..." (Inter 500, 14px, #6B5D52, monospace for invoice)

### Section 3: Info Box
- **Background:** #F7F3EC
- **Border-left:** 4px solid #C8102E
- **Content:** "Komplain cuma bisa buat pesanan yang udah selesai. Admin respon maksimal 2x24 jam hari kerja."

### Section 4: Form
- **Fields:**
  1. **Item yang Dikomplain** (required, radio)
     - One radio per item in pesanan (nama + varian + harga + qty)
     - Plus: "Semua item di pesanan ini"
     - If pesanan has 1 item: auto-select it, hide radio group
  2. **Alasan Komplain** (required, radio)
     - Barang rusak
     - Barang tidak sesuai deskripsi
     - Salah kirim (varian / jumlah)
     - Lainnya
  3. **Deskripsi Masalah** (required, textarea)
     - Min 20 chars, max 1000
     - Placeholder with example
     - Character count display
  4. **Foto Bukti** (required, min 1, max 5)
     - Same upload zone style as upload-bukti
     - JPG/PNG, max 5MB each
     - Preview thumbnails with remove button

### Section 5: Submit
- "Kirim Komplain" (Primary, full width)
- Mobile: sticky bottom bar

### Section 6: Success State
- **Layout:** Centered, replaces form after submit
- **Content:**
  - Check icon (jade circle, 80x80px)
  - "Komplain terkirim" (H1)
  - "Admin respon maksimal 2x24 jam hari kerja. Kamu bakal dikabarin via notifikasi."
  - "Lihat Riwayat" (primary) â†’ `/pesanan`
  - "Kembali ke Beranda" (secondary) â†’ `/`

---

## States

### Loading (Submit)
- Button: spinner + "Mengirim..."
- Disable form

### Validation Error
- Inline per-field errors
- Foto: "Minimal 1 foto bukti wajib diupload"

### Success
- Replace form with success state (no redirect)
- Customer notified (notifikasi created)

### Already Complained (same pesanan)
- If komplain exists for this pesanan: redirect to `/pesanan/[id]` with toast "Komplain udah diajukan buat pesanan ini."
- Show link "Lihat Status Komplain"

### Pesanan Not SELESAI
- If status != SELESAI: redirect to `/pesanan/[id]` with toast "Komplain cuma bisa buat pesanan yang udah selesai."

### Single Item Pesanan
- Hide "Item yang Dikomplain" radio group
- Auto-select the only item
- Show: "Item: Tas Backpack Premium (Hitam)" as read-only text

---

## Interactions

### Item Radio
- Click â†’ select item (instant)

### Alasan Radio
- Click â†’ select (instant)
- If "Lainnya": show extra text input "Jelaskan alasan" (optional)

### Foto Upload
- Drop or click â†’ validate (type, size, count) â†’ preview thumbnail
- Remove: X on thumbnail â†’ remove from list
- Min 1 required to submit

### Submit
- Validate all â†’ upload fotos to R2 â†’ POST /api/komplain â†’ success state
- On fail: toast "Gagal kirim komplain. Coba lagi."

---

## Edge Cases

### Many Items (10+)
- Radio list scrollable (max-height 300px)
- "Semua item" option at top for convenience

### Very Long Description
- Max 1000 chars, counter "500/1000"
- Textarea auto-resize, max 10 lines

### Foto Upload Fail
- Toast: "Gagal upload foto. Coba lagi."
- Remove failed file

### Network Slow
- Progress indicator on upload (spinner per thumbnail)
- Don't timeout before 30s

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "SUBMIT COMPLAINT" (use "Kirim Komplain")
3. âŒ NO optional foto (foto WAJIB for komplain, min 1)
4. âŒ NO "Expected resolution" dropdown (customer describes, admin decides solution)
5. âŒ NO refund amount input (admin decides after review)
6. âŒ NO rating of admin response (backlog)
7. âŒ NO anonymous komplain (must be logged in + own pesanan)

---

## Copy

### Page Title (H1)
```
Ajukan Komplain
Pesanan INV-20240115-A1B2C3D4
```

### Info Box
```
Komplain cuma bisa buat pesanan yang udah selesai.
Admin respon maksimal 2x24 jam hari kerja.
```

### Form
```
Item yang Dikomplain *
(â—‹) Tas Backpack Premium (Hitam) â€” Rp 282.000 x1
(â—‹) Kaos Oversized (Size L Hitam) â€” Rp 35.250 x2
(â—‹) Semua item di pesanan ini

Alasan Komplain *
(â—‹) Barang rusak
(â—‹) Barang tidak sesuai deskripsi
(â—‹) Salah kirim (varian / jumlah)
(â—‹) Lainnya

Deskripsi Masalah *
[Strap kanan tas putus pas barang sampai...]
Minimal 20 karakter

Foto Bukti (wajib, min 1, max 5)
[Drop foto di sini] atau [Pilih File]
JPG/PNG, max 5MB per foto

[Kirim Komplain]
```

### Single Item (read-only)
```
Item: Tas Backpack Premium (Hitam)
```

### Success
```
Komplain terkirim
Admin respon maksimal 2x24 jam hari kerja.
Kamu bakal dikabarin via notifikasi.

[Lihat Riwayat]
[Kembali ke Beranda]
```

### Validation Errors
```
Pilih item yang dikomplain dulu
Pilih alasan komplain dulu
Deskripsi minimal 20 karakter
Minimal 1 foto bukti wajib diupload
Maksimal 5 foto
Cuma bisa upload JPG atau PNG
Ukuran foto kebanyakan. Maksimal 5MB.
```

### Toasts
```
Komplain udah diajukan buat pesanan ini.
Komplain cuma bisa buat pesanan yang udah selesai.
Gagal kirim komplain. Coba lagi.
```



============================================================
# INCLUDED FILE: batch-4-admin-operational.md
============================================================

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



============================================================
# INCLUDED FILE: batch-5-admin-management.md
============================================================

# BATCH 5: ADMIN MANAGEMENT

Gabungan 5 file admin management screens untuk pen.dev

---



========================================
# FILE: admin-07-kelola-komplain.md
========================================

# Screen Admin 07: Kelola Komplain

## Tujuan
Admin lihat semua komplain dari customer, filter by status, buka detail, respond (tanggapi), dan resolve (selesai/ditolak). Link ke pesanan terkait.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Kelola Komplain                                          â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  [ðŸ” Cari komplain...]  Status: [Semua â–¼]                  â”‚
â”‚  e  â”‚                                                            â”‚
â”‚  b  â”‚  [Semua] [Baru] [Diproses] [Selesai] [Ditolak]            â”‚
â”‚  a  â”‚                                                            â”‚
â”‚  r  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚     â”‚  â”‚ Komplain-ID   Pesanan         Customer   Tgl   Status â”‚ â”‚
â”‚  D  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  a  â”‚  â”‚ KMP-001  INV-...A1B2C3D4  budi@..  22 Jan [Baru]    â‹® â”‚ â”‚
â”‚  s  â”‚  â”‚ KMP-002  INV-...E5F6G7H8  siti@..  21 Jan [Diproses]â‹® â”‚ â”‚
â”‚  h  â”‚  â”‚ KMP-003  INV-...I9J0K1L2  andi@..  20 Jan [Selesai] â‹® â”‚ â”‚
â”‚  b  â”‚  â”‚ ...                                                       â”‚ â”‚
â”‚  o  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  a  â”‚                                                            â”‚
â”‚  r  â”‚  [â† Prev]  1 2 3  [Next â†’]    10 per page                 â”‚
â”‚  d  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  P  â”‚  (Detail Drawer when â‹® / row clicked):                   â”‚
â”‚  r  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  o  â”‚  â”‚  Komplain KMP-001                          [X]        â”‚ â”‚
â”‚  d  â”‚  â”‚  Status: [Baru]                                        â”‚ â”‚
â”‚  u  â”‚  â”‚  22 Jan 2024, 10:00 WIB                              â”‚ â”‚
â”‚  k  â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  â”€â”€â”€ Info Komplain â”€â”€â”€                                  â”‚ â”‚
â”‚  P  â”‚  â”‚  Pesanan: INV-20240115-A1B2C3D4  [Lihat Pesanan]    â”‚ â”‚
â”‚  O  â”‚  â”‚  Customer: Budi Santoso (budi@email.com)            â”‚ â”‚
â”‚  K  â”‚  â”‚  Tanggal Komplain: 22 Jan 2024                        â”‚ â”‚
â”‚  o  â”‚  â”‚  Kategori: Barang Rusak                                 â”‚ â”‚
â”‚  m  â”‚  â”‚                                                        â”‚ â”‚
â”‚  p  â”‚  â”‚  Deskripsi:                                            â”‚ â”‚
â”‚     â”‚  â”‚  Tas sampai tapi strap kanan putus. Kelihatannya    â”‚ â”‚
â”‚  L  â”‚  â”‚  rusak saat pengiriman. Mau minta ganti atau...     â”‚ â”‚
â”‚  o  â”‚  â”‚                                                        â”‚ â”‚
â”‚  g  â”‚  â”‚  Foto (3):                                             â”‚ â”‚
â”‚     â”‚  â”‚  [img1] [img2] [img3]    [Lihat]                      â”‚ â”‚
â”‚  S  â”‚  â”‚                                                        â”‚ â”‚
â”‚  e  â”‚  â”‚  â”€â”€â”€ Riwayat â”€â”€â”€                                       â”‚ â”‚
â”‚  t  â”‚  â”‚  22 Jan 10:00 - Komplain diajukan (customer)        â”‚ â”‚
â”‚  t  â”‚  â”‚                                                        â”‚ â”‚
â”‚  .  â”‚  â”‚  â”€â”€â”€ Tanggapan Admin â”€â”€â”€                               â”‚ â”‚
â”‚     â”‚  â”‚  [                                                  ]   â”‚ â”‚
â”‚     â”‚  â”‚  [  Halo Budi, mau minta foto Strap yang...      ]   â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚  P  â”‚  â”‚  Status: [Diproses â–¼]                                  â”‚ â”‚
â”‚  e  â”‚  â”‚  (Diproses / Selesai / Ditolak)                       â”‚ â”‚
â”‚  s  â”‚  â”‚                                                        â”‚ â”‚
â”‚  a  â”‚  â”‚  [Kirim Tanggapan]                                    â”‚ â”‚
â”‚  n  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  a  â”‚                                                            â”‚
â”‚  n  â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]  Kelola Komplain [ðŸ‘¤]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [ðŸ” Cari komplain...]     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Semua][Baru][Diproses]   â”‚ â† horizontal scroll
â”‚ [Selesai][Ditolak]        â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ KMP-001                â”‚ â”‚
â”‚ â”‚ INV-...A1B2C3D4        â”‚ â”‚
â”‚ â”‚ budi@email.com         â”‚ â”‚
â”‚ â”‚ 22 Jan  [Baru]         â”‚ â”‚
â”‚ â”‚             [Detail]   â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ KMP-002                â”‚ â”‚
â”‚ â”‚ INV-...E5F6G7H8        â”‚ â”‚
â”‚ â”‚ siti@email.com         â”‚ â”‚
â”‚ â”‚ 21 Jan  [Diproses]     â”‚ â”‚
â”‚ â”‚             [Detail]   â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ [Muat Lainnya]            â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Detail - full screen page on mobile):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Komplain KMP-001   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Baru]                     â”‚
â”‚ 22 Jan 2024, 10:00 WIB    â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Info Komplain â”€â”€â”€     â”‚
â”‚ Pesanan: INV-...A1B2C3D4 â”‚
â”‚ [Lihat Pesanan]           â”‚
â”‚ Customer: Budi Santoso    â”‚
â”‚ Kategori: Barang Rusak    â”‚
â”‚                            â”‚
â”‚ Deskripsi:                 â”‚
â”‚ Tas sampai tapi strap     â”‚
â”‚ kanan putus...            â”‚
â”‚                            â”‚
â”‚ Foto (3):                  â”‚
â”‚ [img1][img2][img3]        â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Riwayat â”€â”€â”€           â”‚
â”‚ 22 Jan 10:00 - Diajukan  â”‚
â”‚                            â”‚
â”‚ â”€â”€â”€ Tanggapan â”€â”€â”€         â”‚
â”‚ [                          ] â”‚
â”‚ [  Halo Budi, mau...   ] â”‚
â”‚                            â”‚
â”‚ Status: [Diproses â–¼]       â”‚
â”‚                            â”‚
â”‚ [Kirim Tanggapan]         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- "Komplain" active

### Section 2: Header + Toolbar
- **Title:** "Kelola Komplain" (H1)
- **Toolbar:**
  - Search: "Cari komplain..." (filter by KMP-ID or invoice, debounce 300ms)
  - Status dropdown: Semua, Baru, Diproses, Selesai, Ditolak

### Section 3: Status Tabs
- **Tabs:** Semua, Baru, Diproses, Selesai, Ditolak
- **Badge count:** Optional (e.g., "Baru (3)")

### Section 4: Komplain Table (Desktop)
- **Columns:**
  ```
  | Komplain-ID | Pesanan | Customer | Tanggal | Status | Action |
  ```
- **Row details:**
  - Komplain-ID: "KMP-001" (monospace, Inter 600, 14px)
  - Pesanan: invoice (clickable link â†’ `/admin/pesanan/[id]`)
  - Customer: email
  - Tanggal: DD MMM YYYY
  - Status: badge (Baru=Chinese Red, Diproses=gold, Selesai=jade, Ditolak=red-muted)
  - Action: "Detail" link (ghost)
- **Row click:** Open detail drawer (desktop) or navigate (mobile)
- **Pagination:** 10 per page

### Section 5: Komplain Cards (Mobile)
- **Each card:**
  ```
  KMP-ID (Inter 600, 14px)
  Invoice + Customer email
  Tanggal + Status badge
  [Detail] button â†’ /admin/komplain/[id]
  ```

### Section 6: Detail (Drawer Desktop / Page Mobile)
- **Layout:** Right drawer 480px (desktop) / full page (mobile)
- **Content:**
  - Header: KMP-ID + status badge + tanggal
  - Info Komplain:
    - Pesanan link (â†’ `/admin/pesanan/[id]`)
    - Customer name + email
    - Kategori (Barang Rusak, Barang Tidak Sesuai, Pengiriman Lambat, Lainnya)
    - Deskripsi (read-only, full text)
    - Foto thumbnails (click â†’ fullscreen)
  - Riwayat (timeline):
    - Each entry: timestamp + action + actor (customer/admin)
    - e.g., "22 Jan 10:00 - Komplain diajukan (customer)"
    - e.g., "22 Jan 14:30 - Tanggapan admin: Halo Budi... (admin)"
    - e.g., "23 Jan 09:00 - Status: Selesai (admin)"
  - Tanggapan Form:
    - Textarea: "Tanggapan untuk customer"
    - Status dropdown: Diproses / Selesai / Ditolak
    - "Kirim Tanggapan" button (Primary)
- **Behavior:**
  - Submit tanggapan â†’ API: POST /api/admin/komplain/[id]/tanggapan
  - Adds to riwayat + updates status
  - Customer notified (notifikasi + WhatsApp)

---

## States

### Loading
- Skeleton table / cards

### Empty (No Komplain)
- "Belum ada komplain. Mantap!"

### Submit Loading
- "Kirim Tanggapan" button: spinner + "Mengirim..."
- Disable form

### Submit Success
- Toast: "Tanggapan dikirim. Customer dikabarin."
- Riwayat updates with new entry
- Status badge updates
- Customer notified

### Komplain Not Found
- 404: "Komplain nggak ketemu"

---

## Interactions

### Search
- Debounce 300ms â†’ filter by KMP-ID or invoice (contains)

### Status Filter
- Dropdown + tabs sync

### Row Click
- Desktop: open drawer
- Mobile: navigate to `/admin/komplain/[id]`

### Lihat Pesanan
- Click invoice link â†’ `/admin/pesanan/[id]` (new tab or same)

### Foto Fullscreen
- Click thumbnail â†’ modal fullscreen, swipe through

### Tanggapan Submit
- Textarea + status â†’ API â†’ riwayat + status update
- Customer notified

### Status Change Only (no tanggapan)
- Admin can change status without tanggapan (e.g., mark "Selesai" after resolving via WhatsApp)
- If status changed without tanggapan: log "Status: [status] (admin)" in riwayat

---

## Edge Cases

### Komplain with Multiple Tanggapan
- Riwayat shows all (timeline)
- Each tanggapan: timestamp + text + actor badge (customer/admin)

### Komplain on Custom PO Pesanan
- Invoice shows "PO-" prefix
- Link â†’ `/admin/pesanan/[id]` (same flow)

### Customer Wants Refund
- Kategori: "Permintaan Refund"
- Admin tanggapan: process refund manually (bank transfer) + mark "Selesai" with note "Refund Rp X.XXX transferred"
- No automated refund (manual bank transfer)

### Komplain Closed but Reopened
- MVP: no reopen (if new issue, customer creates new komplain)
- Backlog: allow reopen within 7 days

### No Foto
- Hide foto section
- Or: "Customer tidak upload foto"

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "COMPLAINTS" / "TICKETS" ALL-CAPS
3. âŒ NO "Priority" field (MVP: no priority levels)
4. âŒ NO "Assign to" field (single admin MVP)
5. âŒ NO SLA timer ("Respond within 24h")
6. âŒ NO canned/template responses (free text)
7. âŒ NO customer rating of resolution (backlog)

---

## Copy

### Page Title (H1)
```
Kelola Komplain
```

### Toolbar
```
[Cari komplain...]  Status: [Semua â–¼]
```

### Status Tabs
```
Semua
Baru
Diproses
Selesai
Ditolak
```

### Table Headers
```
Komplain-ID | Pesanan | Customer | Tanggal | Status | Action
```

### Row
```
KMP-001  INV-20240115-A1B2C3D4  budi@email.com  22 Jan 2024  [Baru]  [Detail]
```

### Detail Header
```
Komplain KMP-001
Status: [Baru]
22 Jan 2024, 10:00 WIB
```

### Info Komplain
```
Info Komplain

Pesanan: INV-20240115-A1B2C3D4  [Lihat Pesanan]
Customer: Budi Santoso (budi@email.com)
Tanggal Komplain: 22 Jan 2024
Kategori: Barang Rusak

Deskripsi:
Tas sampai tapi strap kanan putus. Kelihatannya rusak saat pengiriman. Mau minta ganti atau refund ongkir.

Foto (3):
[img1] [img2] [img3]  [Lihat]
```

### Riwayat
```
Riwayat

22 Jan 10:00 - Komplain diajukan (customer)
22 Jan 14:30 - Tanggapan: Halo Budi, mau minta foto strap yang lebih jelas? (admin)
22 Jan 15:00 - Foto tambahan diupload (customer)
23 Jan 09:00 - Status: Selesai (admin)
```

### Tanggapan Form
```
Tanggapan Admin

[                                        ]
[  Halo Budi, mau minta foto Strap...  ]

Status: [Diproses â–¼]
(Diproses / Selesai / Ditolak)

[Kirim Tanggapan]
```

### Empty State
```
Belum ada komplain. Mantap!
```

### Toasts
```
Tanggapan dikirim. Customer dikabarin.
```

### Kategori Options
```
Barang Rusak
Barang Tidak Sesuai
Pengiriman Lambat
Permintaan Refund
Lainnya
```



========================================
# FILE: admin-08-kelola-kategori.md
========================================

# Screen Admin 08: Kelola Kategori

## Tujuan
Admin CRUD kategori produk. Kategori sederhana: nama + slug + icon (optional). Dipakai di produk dan katalog filter.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Kelola Kategori                       [+ Tambah Kategori] â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  e  â”‚  â”‚ Kategori       Slug          Jml Produk   Action       â”‚ â”‚
â”‚  b  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  a  â”‚  â”‚ Tas             tas            5           [Edit] [Hapus]â”‚ â”‚
â”‚  r  â”‚  â”‚ Sepatu          sepatu         3           [Edit] [Hapus]â”‚ â”‚
â”‚     â”‚  â”‚ Aksesoris       aksesoris      4           [Edit] [Hapus]â”‚ â”‚
â”‚  D  â”‚  â”‚ Elektronik      elektronik     2           [Edit] [Hapus]â”‚ â”‚
â”‚  a  â”‚  â”‚ Fashion         fashion        6           [Edit] [Hapus]â”‚ â”‚
â”‚  s  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  h  â”‚                                                            â”‚
â”‚  b  â”‚                                                            â”‚
â”‚  o  â”‚  (Edit/Create Modal):                                     â”‚
â”‚  a  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  r  â”‚  â”‚  Tambah Kategori                          [X]        â”‚  â”‚
â”‚  d  â”‚  â”‚                                                        â”‚  â”‚
â”‚  P  â”‚  â”‚  Nama Kategori *                                      â”‚  â”‚
â”‚  r  â”‚  â”‚  [Tas____________________________]                     â”‚  â”‚
â”‚  o  â”‚  â”‚                                                        â”‚  â”‚
â”‚  d  â”‚  â”‚  Slug * (auto-generate, bisa edit)                    â”‚  â”‚
â”‚  u  â”‚  â”‚  [tas____________________________]                     â”‚  â”‚
â”‚  k  â”‚  â”‚  URL: /katalog?kategori=tas                           â”‚  â”‚
â”‚     â”‚  â”‚                                                        â”‚  â”‚
â”‚  P  â”‚  â”‚  Icon (opsional)                                      â”‚  â”‚
â”‚  O  â”‚  â”‚  [Pilih Icon â–¼]  atau upload SVG                       â”‚  â”‚
â”‚  K  â”‚  â”‚                                                        â”‚  â”‚
â”‚  o  â”‚  â”‚  [Batal]  [Simpan]                                    â”‚  â”‚
â”‚  m  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚  p  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  L  â”‚                                                            â”‚
â”‚  o  â”‚                                                            â”‚
â”‚  g  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â˜°]  Kelola Kategori [+] â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Tas          5 produk   â”‚ â”‚
â”‚ â”‚              [Edit][Hapus]â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ Sepatu       3 produk   â”‚ â”‚
â”‚ â”‚              [Edit][Hapus]â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ Aksesoris    4 produk   â”‚ â”‚
â”‚ â”‚              [Edit][Hapus]â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ Elektronik   2 produk   â”‚ â”‚
â”‚ â”‚              [Edit][Hapus]â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ Fashion      6 produk   â”‚ â”‚
â”‚ â”‚              [Edit][Hapus]â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

(Create/Edit Modal - bottom sheet):
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  â”â”â” (drag handle)       â”‚
â”‚                      [X] â”‚
â”‚  Tambah Kategori         â”‚
â”‚                           â”‚
â”‚  Nama Kategori *         â”‚
â”‚  [Tas_________________]   â”‚
â”‚                           â”‚
â”‚  Slug *                   â”‚
â”‚  [tas_________________]   â”‚
â”‚  URL: /katalog?kategori=tasâ”‚
â”‚                           â”‚
â”‚  Icon (opsional)          â”‚
â”‚  [Pilih Icon â–¼]            â”‚
â”‚                           â”‚
â”‚  [Batal]    [Simpan]      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- "Settings" â†’ "Kategori" submenu active, or standalone "Kategori" link

### Section 2: Header + Tambah
- **Title:** "Kelola Kategori" (H1)
- **Action:** "+ Tambah Kategori" (Primary, top right)

### Section 3: Kategori List
- **Layout (Desktop):** Table
- **Columns:**
  ```
  | Kategori | Slug | Jml Produk | Action |
  ```
- **Layout (Mobile):** Vertical cards
- **Each row/card:**
  - Nama (Inter 600, 16px)
  - Slug (monospace, Inter 400, 14px, #6B5D52)
  - Jml Produk: count (e.g., "5 produk") â€” from Produk table
  - Action: "Edit" (ghost) + "Hapus" (ghost, red-tinted)
- **Empty:** "Belum ada kategori. Tambah dulu."

### Section 4: Create/Edit Modal
- **Trigger:** "+ Tambah Kategori" or "Edit"
- **Layout:** Centered modal (desktop) / bottom sheet (mobile)
- **Fields:**
  1. **Nama Kategori** (required)
     - Input text, max 30 chars
     - Validation: min 2, unique
  2. **Slug** (required, auto-generate)
     - Auto from nama (lowercase, spaces â†’ hyphens)
     - Editable (override)
     - Preview: "URL: /katalog?kategori=[slug]"
     - Validation: unique, lowercase, no spaces
  3. **Icon** (optional)
     - Dropdown: preset icons (bag, shoe, accessory, electronics, shirt)
     - Or: upload SVG (backlog)
- **Buttons:** "Batal" (secondary) + "Simpan" (Primary)

---

## States

### Loading
- Skeleton table rows

### Save Loading
- "Simpan" button: spinner + "Menyimpan..."

### Save Success
- Toast: "Kategori disimpan." (edit) or "Kategori baru ditambahkan." (create)
- Modal closes
- List refreshes

### Validation Error
- Nama: "Nama minimal 2 karakter", "Nama kategori udah ada"
- Slug: "Slug udah dipake kategori lain"

### Delete Confirm
- Modal: "Hapus kategori ini?"
- Warning: "Produk dengan kategori ini bakal jadi 'Tanpa Kategori'. Yakin?"
- [Batal] [Ya, Hapus]

### Delete with Products
- Warning: "Kategori ini punya X produk. Produk bakal jadi 'Tanpa Kategori'."
- [Batal] [Ya, Hapus Saja]

---

## Interactions

### Auto-Generate Slug
- Type nama â†’ slug auto-generates (real-time)
- If slug manually edited: stop auto-generate (respect user input)
- Slug format: lowercase, spaces â†’ hyphens, no special chars

### Edit
- Click "Edit" â†’ modal opens with pre-filled values
- Save â†’ update

### Delete
- Click "Hapus" â†’ confirm modal
- If kategori has products: show count warning
- Confirm â†’ soft delete or reassign products to "Tanpa Kategori"

### Jml Produk Count
- Display count of Produk with this kategoriId
- If 0: "0 produk" (safe to delete)
- If > 0: show count + delete warning

---

## Edge Cases

### Kategori Used by Active Pesanan
- Cannot hard delete (pesanan references kategori via produk)
- Soft delete: status â†’ NONAKTIF, hidden from admin list (unless "Tampilkan Nonaktif")
- Products keep kategoriId (for historical data)

### Kategori Name Duplicate
- Case-insensitive unique check
- "Tas" and "tas" = duplicate

### Slug Collision
- "Tas Baru" and "Tas-Baru" â†’ same slug "tas-baru"
- Error: "Slug 'tas-baru' udah dipake"

### No Kategori (first setup)
- Show prompt: "Tambah kategori pertama buat mulai katalog produk."
- CTA: "+ Tambah Kategori"

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "CATEGORIES" ALL-CAPS
3. âŒ NO nested/sub-categories (MVP: flat list only)
4. âŒ NO category image upload (icon preset only)
5. âŒ NO category description field (nama + slug is enough)
6. âŒ NO drag-to-reorder (alphabetical or manual order, backlog)

---

## Copy

### Page Title (H1)
```
Kelola Kategori
```

### Action
```
[+ Tambah Kategori]
```

### Table Headers
```
Kategori | Slug | Jml Produk | Action
```

### Row
```
Tas    tas       5 produk    [Edit] [Hapus]
```

### Modal
```
Tambah Kategori

Nama Kategori *
[Tas]

Slug *
[tas]
URL: /katalog?kategori=tas

Icon (opsional)
[Pilih Icon â–¼]

[Batal]  [Simpan]
```

### Empty State
```
Belum ada kategori. Tambah dulu.
```

### Delete Confirm
```
Hapus kategori ini?

Produk dengan kategori ini bakal jadi 'Tanpa Kategori'. Yakin?

[Batal]  [Ya, Hapus]
```

### Delete with Products
```
Hapus kategori ini?

Kategori ini punya 5 produk. Produk bakal jadi 'Tanpa Kategori'.

[Batal]  [Ya, Hapus Saja]
```

### Validation Errors
```
Nama minimal 2 karakter
Nama kategori udah ada
Slug udah dipake kategori lain
```

### Toasts
```
Kategori disimpan.
Kategori baru ditambahkan.
Kategori dihapus.
```



========================================
# FILE: admin-09-pengaturan-kurs.md
========================================

# Screen Admin 09: Pengaturan Kurs

## Tujuan
Admin set/update kurs RMB â†’ IDR (kursRmbIdr). Rate ini dipakai untuk auto-calc harga produk dari RMB ke IDR, dan estimasi biaya di PO.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Pengaturan Kurs                                           â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  e  â”‚  â”‚  Kurs Saat Ini                                        â”‚ â”‚
â”‚  b  â”‚  â”‚                                                        â”‚ â”‚
â”‚  a  â”‚  â”‚  1 RMB  =  Rp 2.450                                    â”‚ â”‚
â”‚  r  â”‚  â”‚  (Update terakhir: 20 Jan 2024, 09:00 WIB)          â”‚ â”‚
â”‚  d  â”‚  â”‚  (oleh: admin@jastipchina.local)                     â”‚ â”‚
â”‚     â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  D  â”‚                                                            â”‚
â”‚  a  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  s  â”‚  â”‚  Update Kurs                                          â”‚ â”‚
â”‚  h  â”‚  â”‚                                                        â”‚ â”‚
â”‚  b  â”‚  â”‚  Kurs RMB â†’ IDR *                                     â”‚ â”‚
â”‚  o  â”‚  â”‚  [2.450]                                              â”‚ â”‚
â”‚  a  â”‚  â”‚  Format: angka desimal (contoh: 2450 atau 2450.50)   â”‚ â”‚
â”‚  r  â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  â”€â”€â”€ Preview â”€â”€â”€                                      â”‚ â”‚
â”‚  P  â”‚  â”‚  Produk "Tas Backpack" (RMB 115):                    â”‚ â”‚
â”‚  r  â”‚  â”‚  Rp 282.175  (sebelumnya: Rp 281.750)                â”‚ â”‚
â”‚  o  â”‚  â”‚  Produk "Kaos Oversized" (RMB 14):                    â”‚ â”‚
â”‚  d  â”‚  â”‚  Rp 34.300   (sebelumnya: Rp 34.300)                  â”‚ â”‚
â”‚  u  â”‚  â”‚                                                        â”‚ â”‚
â”‚  k  â”‚  â”‚  Catatan (opsional)                                    â”‚ â”‚
â”‚  P  â”‚  â”‚  [                                                  ]  â”‚ â”‚
â”‚  O  â”‚  â”‚  [  Update mengikuti kurs BI terbaru              ]  â”‚ â”‚
â”‚  K  â”‚  â”‚                                                        â”‚ â”‚
â”‚  o  â”‚  â”‚  [Simpan Kurs Baru]                                  â”‚ â”‚
â”‚  m  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  p  â”‚                                                            â”‚
â”‚     â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  L  â”‚  â”‚  Riwayat Kurs                                         â”‚ â”‚
â”‚  o  â”‚  â”‚                                                        â”‚ â”‚
â”‚  g  â”‚  â”‚  Tanggal           Kurs         Oleh       Catatan   â”‚ â”‚
â”‚     â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚  S  â”‚  â”‚  20 Jan 2024       2.450        admin      Update...  â”‚ â”‚
â”‚  e  â”‚  â”‚  15 Jan 2024       2.400        admin      -          â”‚ â”‚
â”‚  t  â”‚  â”‚  10 Jan 2024       2.350        admin      Awal      â”‚ â”‚
â”‚  t  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  .  â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Pengaturan Kurs    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Kurs Saat Ini           â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ 1 RMB = Rp 2.450       â”‚ â”‚
â”‚ â”‚ Update: 20 Jan 2024    â”‚ â”‚
â”‚ â”‚ Oleh: admin             â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Update Kurs             â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Kurs RMB â†’ IDR *       â”‚ â”‚
â”‚ â”‚ [2.450]                 â”‚ â”‚
â”‚ â”‚ Format: angka desimal   â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ â”€â”€â”€ Preview â”€â”€â”€         â”‚ â”‚
â”‚ â”‚ Tas Backpack (115 RMB): â”‚ â”‚
â”‚ â”‚ Rp 282.175              â”‚ â”‚
â”‚ â”‚ Kaos Oversized (14):    â”‚ â”‚
â”‚ â”‚ Rp 34.300               â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Catatan (opsional)      â”‚ â”‚
â”‚ â”‚ [                      ] â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ [Simpan Kurs Baru]     â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Riwayat Kurs            â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ 20 Jan - 2.450 - admin â”‚ â”‚
â”‚ â”‚ 15 Jan - 2.400 - admin â”‚ â”‚
â”‚ â”‚ 10 Jan - 2.350 - admin â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- "Settings" â†’ "Pengaturan Kurs" active

### Section 2: Kurs Saat Ini (Current Rate)
- **Layout:** Card, full width
- **Content:**
  - Big display: "1 RMB = Rp [kursRmbIdr]" (Noto Serif SC 700, 32px, gold)
  - Update terakhir: tanggal + waktu (Inter 400, 14px, #6B5D52)
  - Oleh: admin email/name (Inter 400, 14px, #6B5D52)

### Section 3: Update Kurs Form
- **Layout:** Card, full width
- **Fields:**
  1. **Kurs RMB â†’ IDR** (required, number)
     - Input: decimal, 2 places
     - Placeholder: "2450" or "2450.50"
     - Helper: "Format: angka desimal (contoh: 2450 atau 2450.50)"
     - Validation: > 0
  2. **Preview** (auto-calc, read-only)
     - Show 2-3 sample products with old vs new IDR price
     - e.g., "Tas Backpack (115 RMB): Rp 282.175 (sebelumnya: Rp 281.750)"
     - Highlight if changed (green if up, red-muted if down â€” optional, subtle)
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
- Type in kurs field â†’ preview updates live (debounce 300ms)
- Shows 2-3 sample products (from DB, highest price + lowest price + random)
- Old price: strikethrough or "(sebelumnya: Rp X)" in #6B5D52
- New price: bold gold

### Save
- Click "Simpan Kurs Baru" â†’ confirm modal (optional): "Update kurs ke [value]? Harga produk otomatis ikut."
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

1. âŒ NO "â†’" in buttons
2. âŒ NO "EXCHANGE RATE" / "CURRENCY SETTINGS" ALL-CAPS
3. âŒ NO auto-fetch from BI/Google API (manual input for MVP, backlog: auto-fetch)
4. âŒ NO multi-currency (only RMB â†’ IDR)
5. âŒ NO "Scheduled update" (immediate update)
6. âŒ NO "Revert to previous" button (just set old value manually if needed)

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

Kurs RMB â†’ IDR *
[2.450]
Format: angka desimal (contoh: 2450 atau 2450.50)

â”€â”€â”€ Preview â”€â”€â”€
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



========================================
# FILE: admin-10-log-aktivitas.md
========================================

# Screen Admin 10: Log Aktivitas

## Tujuan
Admin lihat audit log semua aksi admin: verifikasi pembayaran, update status pesanan, update resi, penawaran PO, hapus produk, dll. Filter by jenis aksi + tanggal.

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Log Aktivitas                                            â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  Jenis: [Semua â–¼]  Tanggal: [__/__/____]  [Filter]        â”‚
â”‚  e  â”‚                                                            â”‚
â”‚  b  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  a  â”‚  â”‚ Waktu          Admin         Aksi       Entitas       â”‚ â”‚
â”‚  r  â”‚  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚     â”‚  â”‚ 20 Jan 09:15   admin@...    Verifikasi  INV-...I9J0K â”‚ â”‚
â”‚  D  â”‚  â”‚ 20 Jan 08:50   admin@...    Update Resi INV-...E5F6G â”‚ â”‚
â”‚  a  â”‚  â”‚ 20 Jan 08:30   admin@...    Penawaran   PO-...001    â”‚ â”‚
â”‚  s  â”‚  â”‚ 19 Jan 16:00   admin@...    Status:     INV-...A1B2  â”‚ â”‚
â”‚  h  â”‚  â”‚ 19 Jan 14:30   admin@...    Tambah      Dompet Kulit â”‚ â”‚
â”‚  b  â”‚  â”‚ ...                                                       â”‚ â”‚
â”‚  o  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  a  â”‚                                                            â”‚
â”‚  r  â”‚  [â† Prev]  1 2 3  [Next â†’]    20 per page                 â”‚
â”‚  d  â”‚                                                            â”‚
â”‚     â”‚                                                            â”‚
â”‚  P  â”‚                                                            â”‚
â”‚  r  â”‚                                                            â”‚
â”‚  o  â”‚                                                            â”‚
â”‚  d  â”‚                                                            â”‚
â”‚  u  â”‚                                                            â”‚
â”‚  k  â”‚                                                            â”‚
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
â”‚ [â˜°]  Log Aktivitas [ðŸ‘¤]  â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Jenis: [Semua â–¼]          â”‚
â”‚ Tgl: [__/__/____] [Filter]â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ 20 Jan 09:15           â”‚ â”‚
â”‚ â”‚ admin@jastipchina.localâ”‚ â”‚
â”‚ â”‚ Verifikasi Pembayaran  â”‚ â”‚
â”‚ â”‚ INV-...I9J0K1L2        â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ 20 Jan 08:50           â”‚ â”‚
â”‚ â”‚ admin@jastipchina.localâ”‚ â”‚
â”‚ â”‚ Update Resi            â”‚ â”‚
â”‚ â”‚ INV-...E5F6G7H8        â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ 20 Jan 08:30           â”‚ â”‚
â”‚ â”‚ admin@jastipchina.localâ”‚ â”‚
â”‚ â”‚ Penawaran PO           â”‚ â”‚
â”‚ â”‚ PO-20240120-001        â”‚ â”‚
â”‚ â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤ â”‚
â”‚ â”‚ 19 Jan 16:00           â”‚ â”‚
â”‚ â”‚ admin@jastipchina.localâ”‚ â”‚
â”‚ â”‚ Status: Selesai        â”‚ â”‚
â”‚ â”‚ INV-...A1B2C3D4        â”‚ â”‚
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
- "Log Aktivitas" active

### Section 2: Header + Filter
- **Title:** "Log Aktivitas" (H1)
- **Filter:**
  - Jenis dropdown: Semua, Verifikasi Pembayaran, Tolak Pembayaran, Update Status, Update Resi, Penawaran PO, Tambah Produk, Edit Produk, Hapus Produk, Update Kurs, Resolusi Komplain
  - Tanggal: date picker (single day) or range
  - "Filter" button (apply)

### Section 3: Log Table (Desktop)
- **Columns:**
  ```
  | Waktu | Admin | Aksi | Entitas | Detail |
  ```
- **Row details:**
  - Waktu: "DD MMM YYYY, HH:MM WIB" (Inter 400, 14px)
  - Admin: email (Inter 400, 14px, #6B5D52)
  - Aksi: action description (Inter 500, 14px)
  - Entitas: invoice/PO-ID/product name (link, Chinese Red) â†’ related detail
  - Detail: optional extra info (e.g., "Resi: JNE-1234567890")
- **Row hover:** Background #F7F3EC
- **Pagination:** 20 per page

### Section 4: Log Cards (Mobile)
- **Each card:**
  ```
  Waktu (Inter 500, 13px) + Admin (Inter 400, 12px, #6B5D52)
  Aksi (Inter 600, 14px)
  Entitas (link, Chinese Red, 13px)
  Detail (optional, Inter 400, 13px, #6B5D52)
  ```
- **Load More:** Button at bottom

---

## States

### Loading
- Skeleton table rows / cards

### Empty (No Logs)
- "Belum ada aktivitas tercatat."

### Filtered Empty
- "Nggak ada log untuk filter ini."

### Date Filter Invalid
- "Tanggal nggak valid. Format: DD/MM/YYYY"

---

## Interactions

### Filter
- Jenis dropdown â†’ filter by action type
- Tanggal â†’ filter by date (or range)
- Both combine
- URL sync: `/admin/log?jenis=verify&tanggal=2024-01-20`

### Entitas Link
- Click invoice â†’ `/admin/pesanan/[id]`
- Click PO-ID â†’ `/admin/po/[id]`
- Click product â†’ `/admin/produk/[id]`
- Click komplain â†’ `/admin/komplain/[id]`

### Pagination / Load More
- Desktop: pagination
- Mobile: load more (append)

---

## Edge Cases

### Very Old Logs (> 90 days)
- Still accessible (no auto-archive in MVP)
- Performance: index on createdAt

### Multiple Admins
- Filter by admin? (backlog, MVP: show all in "Admin" column)

### Log Deleted with Entity
- If pesanan deleted (shouldn't happen, but if): log remains, link 404
- Fallback: show entity ID as text (not link)

### Export Log (Backlog)
- "Export CSV" button (desktop only) â€” backlog, not MVP

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in links
2. âŒ NO "ACTIVITY LOG" / "AUDIT TRAIL" ALL-CAPS
3. âŒ NO real-time auto-refresh (manual filter + paginate)
4. âŒ NO "Delete log" button (logs are permanent, append-only)
5. âŒ NO search by keyword (filter by jenis + tanggal is enough for MVP)
6. âŒ NO charts/visualizations (just list)

---

## Copy

### Page Title (H1)
```
Log Aktivitas
```

### Filter
```
Jenis: [Semua â–¼]  Tanggal: [__/__/____]  [Filter]
```

### Jenis Options
```
Semua
Verifikasi Pembayaran
Tolak Pembayaran
Update Status
Update Resi
Penawaran PO
Tambah Produk
Edit Produk
Hapus Produk
Update Kurs
Resolusi Komplain
```

### Table Headers
```
Waktu | Admin | Aksi | Entitas | Detail
```

### Rows
```
20 Jan 2024, 09:15 WIB  admin@jastipchina.local  Verifikasi Pembayaran  INV-20240120-I9J0K1L2  -
20 Jan 2024, 08:50 WIB  admin@jastipchina.local  Update Resi            INV-20240118-E5F6G7H8  Resi: JNE-1234567890
20 Jan 2024, 08:30 WIB  admin@jastipchina.local  Penawaran PO           PO-20240120-001       Total: Rp 645.000
19 Jan 2024, 16:00 WIB  admin@jastipchina.local  Update Status: Selesai  INV-20240115-A1B2C3D4  -
19 Jan 2024, 14:30 WIB  admin@jastipchina.local  Tambah Produk          Dompet Kulit Asli      -
```

### Empty States
```
Belum ada aktivitas tercatat.
Nggak ada log untuk filter ini.
```

### Pagination
```
[â† Sebelumnya]  1 2 3  [Selanjutnya â†’]
20 per halaman
```

### Mobile Load More
```
Muat Lainnya
```

### Date Filter Error
```
Tanggal nggak valid. Format: DD/MM/YYYY
```



========================================
# FILE: admin-11-pengaturan-umum.md
========================================

# Screen Admin 11: Pengaturan Umum

## Tujuan
Admin set pengaturan umum: rekening bank (untuk customer transfer), nomor WhatsApp admin, profil admin (ganti password), info brand (nama, tagline).

---

## Layout Wireframe (Desktop)

```
â”Œâ”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚     â”‚  Pengaturan Umum                                          â”‚
â”‚  S  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚  i  â”‚                                                            â”‚
â”‚  d  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  e  â”‚  â”‚  Profil Admin                                         â”‚ â”‚
â”‚  b  â”‚  â”‚                                                        â”‚ â”‚
â”‚  a  â”‚  â”‚  Email (tidak bisa diubah)                            â”‚ â”‚
â”‚  r  â”‚  â”‚  admin@jastipchina.local                              â”‚ â”‚
â”‚  d  â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Password Saat Ini *                                  â”‚ â”‚
â”‚  D  â”‚  â”‚  [________________]  (verifikasi sebelum ganti)      â”‚ â”‚
â”‚  a  â”‚  â”‚                                                        â”‚ â”‚
â”‚  s  â”‚  â”‚  Password Baru                                        â”‚ â”‚
â”‚  h  â”‚  â”‚  [________________]  Min 8 karakter                  â”‚ â”‚
â”‚  b  â”‚  â”‚                                                        â”‚ â”‚
â”‚  o  â”‚  â”‚  Konfirmasi Password Baru                              â”‚ â”‚
â”‚  a  â”‚  â”‚  [________________]                                    â”‚ â”‚
â”‚  r  â”‚  â”‚                                                        â”‚ â”‚
â”‚  P  â”‚  â”‚  [Ganti Password]                                     â”‚ â”‚
â”‚  r  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  o  â”‚                                                            â”‚
â”‚  d  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  u  â”‚  â”‚  Rekening Bank                                        â”‚ â”‚
â”‚  k  â”‚  â”‚  (Dipakai customer buat transfer pembayaran)        â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚  P  â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚ â”‚
â”‚  O  â”‚  â”‚  â”‚ Bank: BCA                                          â”‚  â”‚ â”‚
â”‚  K  â”‚  â”‚  â”‚ No. Rekening: 1234567890                          â”‚  â”‚ â”‚
â”‚  o  â”‚  â”‚  â”‚ Atas Nama: PT Jastip China                        â”‚  â”‚ â”‚
â”‚  m  â”‚  â”‚  â”‚                              [Edit] [Hapus]        â”‚  â”‚ â”‚
â”‚  p  â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚ â”‚
â”‚     â”‚  â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚ â”‚
â”‚  L  â”‚  â”‚  â”‚ Bank: Mandiri                                     â”‚  â”‚ â”‚
â”‚  o  â”‚  â”‚  â”‚ No. Rekening: 9876543210                          â”‚  â”‚ â”‚
â”‚  g  â”‚  â”‚  â”‚ Atas Nama: PT Jastip China                        â”‚  â”‚ â”‚
â”‚     â”‚  â”‚  â”‚                              [Edit] [Hapus]        â”‚  â”‚ â”‚
â”‚  S  â”‚  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚ â”‚
â”‚  e  â”‚  â”‚                                                        â”‚ â”‚
â”‚  t  â”‚  â”‚  [+ Tambah Rekening]                                 â”‚ â”‚
â”‚  t  â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  .  â”‚                                                            â”‚
â”‚     â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚     â”‚  â”‚  Info Kontak                                          â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Nomor WhatsApp Admin *                              â”‚ â”‚
â”‚     â”‚  â”‚  [62 812-0000-0000]                                   â”‚ â”‚
â”‚     â”‚  â”‚  (Dipakai buat link Chat WhatsApp + broadcast)       â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Email Customer Service *                            â”‚ â”‚
â”‚     â”‚  â”‚  [hello@jastipchina.id]                              â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Jam Operasional                                      â”‚ â”‚
â”‚     â”‚  â”‚  [Senin-Sabtu, 09:00-18:00 WIB]                      â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  [Simpan]                                             â”‚ â”‚
â”‚     â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚     â”‚                                                            â”‚
â”‚     â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚     â”‚  â”‚  Info Brand                                           â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Nama Brand *                                         â”‚ â”‚
â”‚     â”‚  â”‚  [Jastip China]                                       â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Tagline (CN) *                                       â”‚ â”‚
â”‚     â”‚  â”‚  [é²œè´§ç›´è¾¾]                                            â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Tagline (ID) *                                       â”‚ â”‚
â”‚     â”‚  â”‚  [Barang China, sampai pintu rumah]                  â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  Deskripsi Footer                                     â”‚ â”‚
â”‚     â”‚  â”‚  [Jastip China - jasa titip barang China...]        â”‚ â”‚
â”‚     â”‚  â”‚  [                                                  ]  â”‚ â”‚
â”‚     â”‚  â”‚                                                        â”‚ â”‚
â”‚     â”‚  â”‚  [Simpan]                                             â”‚ â”‚
â”‚     â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚     â”‚                                                            â”‚
â””â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Layout Wireframe (Mobile)

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ [â†]  Pengaturan Umum    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Profil Admin            â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Email (tidak bisa diubah)â”‚ â”‚
â”‚ â”‚ admin@jastipchina.local â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Password Saat Ini *    â”‚ â”‚
â”‚ â”‚ [________________]      â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Password Baru           â”‚ â”‚
â”‚ â”‚ [________________]      â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Konfirmasi Password Baruâ”‚ â”‚
â”‚ â”‚ [________________]      â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ [Ganti Password]       â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Rekening Bank          â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”‚
â”‚ â”‚ â”‚ BCA                â”‚ â”‚ â”‚
â”‚ â”‚ â”‚ 1234567890         â”‚ â”‚ â”‚
â”‚ â”‚ â”‚ PT Jastip China    â”‚ â”‚ â”‚
â”‚ â”‚ â”‚       [Edit][Hapus]â”‚ â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚
â”‚ â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚ â”‚
â”‚ â”‚ â”‚ Mandiri            â”‚ â”‚ â”‚
â”‚ â”‚ â”‚ 9876543210         â”‚ â”‚ â”‚
â”‚ â”‚ â”‚ PT Jastip China    â”‚ â”‚ â”‚
â”‚ â”‚ â”‚       [Edit][Hapus]â”‚ â”‚ â”‚
â”‚ â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚
â”‚ â”‚ [+ Tambah Rekening]  â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Info Kontak             â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Nomor WhatsApp Admin * â”‚ â”‚
â”‚ â”‚ [62 812-0000-0000]      â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Email CS *              â”‚ â”‚
â”‚ â”‚ [hello@jastipchina.id]  â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Jam Operasional         â”‚ â”‚
â”‚ â”‚ [Senin-Sabtu, 09-18]    â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ [Simpan]               â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚ â”‚ Info Brand              â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Nama Brand *            â”‚ â”‚
â”‚ â”‚ [Jastip China]          â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Tagline (CN) *          â”‚ â”‚
â”‚ â”‚ [é²œè´§ç›´è¾¾]               â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Tagline (ID) *          â”‚ â”‚
â”‚ â”‚ [Barang China, sampai..]â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ Deskripsi Footer         â”‚ â”‚
â”‚ â”‚ [Jastip China - jasa..] â”‚ â”‚
â”‚ â”‚                         â”‚ â”‚
â”‚ â”‚ [Simpan]               â”‚ â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚[Dash][Order][+][Prod][More]â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Sections

### Section 1: Admin Sidebar
- "Settings" â†’ "Pengaturan Umum" active

### Section 2: Profil Admin
- **Layout:** Card, full width
- **Content:**
  - Email (read-only, disabled): "admin@jastipchina.local"
  - Password Saat Ini (required, password input): verifikasi sebelum ganti
  - Password Baru (optional, password input): min 8 chars
  - Konfirmasi Password Baru (optional): must match
  - "Ganti Password" button (Primary)
- **Validation:**
  - Current password must match (API verify)
  - New password: min 8, letter + number
  - Confirm must match
- **Success:** Toast "Password berhasil diganti." + clear fields
- **Error:** "Password saat ini salah."

### Section 3: Rekening Bank
- **Layout:** Card, full width
- **Content:** List of bank accounts (from Pengaturan or static config)
- **Each rekening card:**
  ```
  Bank: [nama bank]
  No. Rekening: [nomor] (monospace, Inter 600)
  Atas Nama: [pemilik]
  [Edit] [Hapus]
  ```
- **Actions:**
  - "+ Tambah Rekening" (ghost button)
  - Edit â†’ modal form
  - Hapus â†’ confirm modal
- **Modal form (Tambah/Edit):**
  - Bank (input or dropdown: BCA, Mandiri, BNI, BRI, CIMB)
  - No. Rekening (input, numeric)
  - Atas Nama (input)
  - [Batal] [Simpan]

### Section 4: Info Kontak
- **Layout:** Card, full width
- **Fields:**
  1. **Nomor WhatsApp Admin** (required)
     - Input: tel, prefix "+62"
     - Helper: "Dipakai buat link Chat WhatsApp + broadcast notifikasi"
     - Validation: format check
  2. **Email Customer Service** (required)
     - Input: email
     - Validation: email format
  3. **Jam Operasional** (optional)
     - Input: text
     - Placeholder: "Senin-Sabtu, 09:00-18:00 WIB"
- **Button:** "Simpan" (Primary)
- **Success:** Toast "Info kontak disimpan."

### Section 5: Info Brand
- **Layout:** Card, full width
- **Fields:**
  1. **Nama Brand** (required)
     - Default: "Jastip China"
  2. **Tagline (CN)** (required)
     - Chinese text, Ma Shan Zheng font
     - Default: "é²œè´§ç›´è¾¾"
  3. **Tagline (ID)** (required)
     - Default: "Barang China, sampai pintu rumah"
  4. **Deskripsi Footer** (optional, textarea)
     - Default: "Jastip China - jasa titip barang China terpercaya..."
     - Max 500 chars
- **Button:** "Simpan" (Primary)
- **Success:** Toast "Info brand disimpan."

---

## States

### Loading
- Skeleton all cards

### Save Loading (per card)
- Each "Simpan" button: spinner + "Menyimpan..."

### Save Success
- Toast: "[Section] disimpan."
- Card updates

### Password Change Error
- "Password saat ini salah." (inline on current password field)

### Validation Error
- Per-field inline errors

### Rekening Delete Confirm
- "Hapus rekening ini? Customer nggak bakal bisa lihat rekening ini buat transfer."
- If only 1 rekening: "Minimal 1 rekening harus ada. Tambah rekening lain dulu."

---

## Interactions

### Ganti Password
- Fill current + new + confirm â†’ click "Ganti Password"
- API: POST /api/admin/change-password
- Verify current â†’ if match, update
- On success: clear fields, toast
- On fail: error on current password field

### Rekening CRUD
- **Tambah:** Click "+ Tambah Rekening" â†’ modal form â†’ save â†’ add to list
- **Edit:** Click "Edit" â†’ modal pre-filled â†’ save â†’ update
- **Hapus:** Click "Hapus" â†’ confirm â†’ delete â†’ remove from list

### Info Kontak Save
- Fill fields â†’ click "Simpan" â†’ API update â†’ toast

### Info Brand Save
- Fill fields â†’ click "Simpan" â†’ API update â†’ toast
- Tagline (CN): font preview (Ma Shan Zheng)

---

## Edge Cases

### Only One Rekening (can't delete)
- Disable "Hapus" if only 1 rekening
- Or: show warning "Minimal 1 rekening harus ada."

### WhatsApp Number Format
- Auto-format: strip leading 0, add +62 prefix
- Display: "+62 812-0000-0000"

### Brand Name Change
- Affects: header logo, footer, page titles
- Global update (all pages reflect new name)

### Tagline CN Font
- Ensure Ma Shan Zheng loaded
- Preview in form (real-time)

### Password Reuse
- If new password == current: "Password baru nggak boleh sama dengan yang lama."

---

## WHAT NOT TO DO

1. âŒ NO "â†’" in buttons
2. âŒ NO "SETTINGS" / "GENERAL SETTINGS" ALL-CAPS
3. âŒ NO "2FA setup" (password is enough for MVP)
4. âŒ NO email change (admin email is immutable)
5. âŒ NO "Delete account" (admin account permanent)
6. âŒ NO SMTP/email server config (WhatsApp only for MVP)
7. âŒ NO "Maintenance mode" toggle (backlog)
8. âŒ NO "API keys" management (backlog)

---

## Copy

### Page Title (H1)
```
Pengaturan Umum
```

### Profil Admin
```
Profil Admin

Email (tidak bisa diubah)
admin@jastipchina.local

Password Saat Ini *
[________________]
(verifikasi sebelum ganti password)

Password Baru
[________________]
Min 8 karakter, ada huruf dan angka

Konfirmasi Password Baru
[________________]

[Ganti Password]
```

### Rekening Bank
```
Rekening Bank
(Dipakai customer buat transfer pembayaran)

Bank: BCA
No. Rekening: 1234567890
Atas Nama: PT Jastip China
[Edit] [Hapus]

Bank: Mandiri
No. Rekening: 9876543210
Atas Nama: PT Jastip China
[Edit] [Hapus]

[+ Tambah Rekening]
```

### Rekening Modal
```
Tambah Rekening

Bank *
[BCA â–¼]
(BCA, Mandiri, BNI, BRI, CIMB)

No. Rekening *
[1234567890]

Atas Nama *
[PT Jastip China]

[Batal] [Simpan]
```

### Info Kontak
```
Info Kontak

Nomor WhatsApp Admin *
[62 812-0000-0000]
(Dipakai buat link Chat WhatsApp + broadcast notifikasi)

Email Customer Service *
[hello@jastipchina.id]

Jam Operasional
[Senin-Sabtu, 09:00-18:00 WIB]

[Simpan]
```

### Info Brand
```
Info Brand

Nama Brand *
[Jastip China]

Tagline (CN) *
[é²œè´§ç›´è¾¾]

Tagline (ID) *
[Barang China, sampai pintu rumah]

Deskripsi Footer
[Jastip China - jasa titip barang China terpercaya. Barang asli, harga bersahabat, sampai depan pintu rumah.]

[Simpan]
```

### Validation Errors
```
Password saat ini salah.
Password baru nggak boleh sama dengan yang lama.
Password minimal 8 karakter.
Konfirmasi password tidak cocok.
Nomor WhatsApp tidak valid.
Format email tidak valid.
Nama brand wajib diisi.
Tagline (CN) wajib diisi.
Tagline (ID) wajib diisi.
Bank wajib dipilih.
No. Rekening wajib diisi.
Atas Nama wajib diisi.
```

### Delete Confirm (Rekening)
```
Hapus rekening ini?
Customer nggak bakal bisa lihat rekening ini buat transfer.

[Batal] [Ya, Hapus]
```

### Delete Blocked (Last Rekening)
```
Minimal 1 rekening harus ada.
Tambah rekening lain dulu.
```

### Toasts
```
Password berhasil diganti.
Rekening disimpan.
Rekening dihapus.
Info kontak disimpan.
Info brand disimpan.
```

