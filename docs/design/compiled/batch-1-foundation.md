---
title: "BATCH 1: FOUNDATION"
tags: [compiled, pen-dev]
tanggal: 2026-09-21
---
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
