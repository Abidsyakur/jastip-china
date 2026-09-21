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

### Cloud Pattern (祥云 - Xiangyun)
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

### Wave Pattern (海浪 - Hailang)
- **Simbol:** Continuous flow, longevity
- **Pakai untuk:**
  - Footer top border (alternative to cloud)
- **JANGAN pakai untuk:**
  - Hero background
  - Card decoration

### Geometric Key Pattern (回纹 - Huiwen)
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
- **Peran:** Chinese aesthetic UTAMA — tidak perlu pattern/motif berlebihan
- **Pakai untuk:** H1, H2, H3, price display, logo

### Ma Shan Zheng (Brush Script, Decorative)
- **Karakter:** Chinese brush calligraphy, artistic
- **Peran:** Decorative accent, BUKAN body
- **Pakai untuk:** HANYA 1-2 element per halaman

**Contoh penggunaan:**
```
Beranda:
  - Tagline: "鲜货直达" (Fresh goods direct) — Ma Shan Zheng, 32px, #C8102E
  - Tagline EN: "Barang China, sampai pintu rumah" — Inter 400, 14px, #6B5D52
```

**JANGAN:**
- Pakai untuk body text
- Pakai untuk button label
- Pakai untuk form label
- Pakai di setiap halaman (overuse → AI slop)

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
✅ Correct (line, angular):
  - Shopping bag: rectangle + handle lines
  - User: circle + trapezoid body
  - Search: circle + diagonal line
  - Cart: trapezoid + wheels

❌ AI Slop (filled, rounded, colorful):
  - 3D shopping cart
  - Emoji as icon
  - Multi-color filled icon
  - Gradient icon
```

### Chinese-Inspired Icons (Optional)

HANYA kalau fit naturally dengan context UI:

| Icon | Chinese Name | Usage |
|------|--------------|-------|
| 元宝 (Gold Ingot) | Yuan bao | Price-related, premium badge |
| 中国结 (Chinese Knot) | Zhong guo jie | Connection, link, partnership |
| 莲花 (Lotus) | Lian hua | Purity, premium product |
| 如意 (Ruyi) | Ru yi | Wishing, prosperity |

**Rule:** Kalau generik icon lebih jelas, pakai generik. Jangan paksa Chinese icon kalau confusing.

---

## 5. BORDER & RADIUS

### Border Style: Straight, Angular

**✅ Correct:**
- 1px solid border, sharp definition
- 0px radius untuk section background (modern, clean block)
- Varied radius untuk card (12px regular, 20px unggulan) — premium feel
- Varied radius untuk badge/button (6px, 8px) — hierarchy

**❌ AI Slop:**
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
┌──────────────────────────────────────────────────┐
│ [Jastip China]   Beranda Katalog ...   [Cart]   │
│                    (red text)                     │
├──────────────────────────────────────────────────┤
│                                                   │
│  鲜货直达                   (brush, 32px, red)  │
│  Barang China, sampai pintu rumah                │
│                                                   │
│  ┌────────┐ ┌──┐ ┌──┐                           │
│  │Unggulan│ │  │ │  │  (border, no shadow)     │
│  │ 2x2    │ └──┘ └──┘                           │
│  │ Rp 282k│                                       │
│  └────────┘                                       │
│                                                   │
│  ──── cloud pattern border (5% opacity) ────   │
└──────────────────────────────────────────────────┘
```

**Result:**
- ✅ Chinese Red logo = brand
- ✅ Brush script = 1 Chinese character element
- ✅ Grid produk = e-commerce focus
- ✅ Cloud pattern = subtle decorative (border only)
- ✅ Tidak overwhelming, tidak AI slop

### Footer (Ideal)
```
┌──────────────────────────────────────────────────┐
│ (ink dark background #2C1810)                    │
│                                                   │
│ ──── cloud pattern (5% opacity, #D4AF37) ────  │
│                                                   │
│ [Logo red]   Navigasi   Bantuan   Kontak        │
│ Tagline      Links      Links      WA          │
│                                                   │
│ © 2024 Jastip China                              │
└──────────────────────────────────────────────────┘
```

**Result:**
- ✅ Cloud pattern = subtle top border
- ✅ Gold opacity 5% = prosperity accent
- ✅ Dark background = premium feel
- ✅ Not busy, not overwhelming

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
