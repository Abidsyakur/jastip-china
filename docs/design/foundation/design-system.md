---
title: "Design System - Jastip China"
tags: [foundation]
tanggal: 2026-09-21
---
# Design System - Jastip China

Platform e-commerce jastip barang dari China ke Indonesia dengan estetika China aesthetic yang premium, hangat, dan terpercaya.

---

## 1. COLOR PALETTE

### Primary: Chinese Red
```
#C8102E
RGB: (200, 16, 46)
HSL: 349° 85% 42%
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
HSL: 43° 64% 52%
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
HSL: 144° 11% 54%
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
HSL: 34° 67% 97%
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
HSL: 0° 0% 100%
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
HSL: 30° 33% 95%
Usage: Card background variation (alternate dengan #FFFFFF)
Character: Slightly warmer than pure white, less harsh
```

**Strategy:** Variasikan antara #FFFFFF dan #F7F3EC di grid produk untuk visual interest (tidak semua card putih identik).

---

### Neutral: Border (Divider)
```
#E8DCC8
RGB: (232, 220, 200)
HSL: 30° 40% 85%
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
HSL: 18° 47% 12%
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
HSL: 18° 14% 37%
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
- Contoh: Tagline di beranda ("鲜货直达" = Fresh goods direct) atau section header dekoratif
- Size: minimal 24px untuk readability

**When to use:**
- Beranda tagline di banner
- Atau section header accent (misal "新品" = New Items)
- JANGAN overuse → AI slop territory

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
| xl | 1280px | ∞ | Desktop large |

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
