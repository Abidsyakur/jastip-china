---
title: "Anti-Patterns & Chinese Elements - Jastip China"
tags: [foundation]
tanggal: 2026-09-21
---
# Anti-Patterns & Chinese Elements - Jastip China

Dua panduan: apa yang HARUS dihindari (AI slop) + bagaimana Chinese aesthetic dipakai benar.

---

## PART 1: ANTI-PATTERNS (YANG HARUS DIHINDARI)

### 1. Label ALL-CAPS di Atas Judul

**❌ AI Slop:**
```
OUR PRODUCTS
Produk Kami
```

**✅ Correct:**
```
Produk Kami
```
Atau langsung produk tanpa section header kalau context clear.

---

### 2. Teks Meta dengan Titik Tengah (·)

**❌ AI Slop:**
```
Tas · Sepatu · Aksesoris
```
```
15 Jan 2024 · 14:30 WIB · Bandung
```

**✅ Correct:**
```
Tas, Sepatu, Aksesoris
```
```
15 Jan 2024, 14:30 WIB, Bandung
```
Pakai koma atau spasi-dash.

---

### 3. Tombol Diakhiri "→"

**❌ AI Slop:**
```
[ Lihat Selengkapnya → ]
[ Mulai Belanja → ]
[ Checkout → ]
```

**✅ Correct:**
```
[ Lihat Selengkapnya ]
[ Mulai Belanja ]
[ Checkout ]
```
Tidak ada arrow装饰.

---

### 4. Angka 01/02/03 Dekorasi (Non-Process)

**❌ AI Slop:**
```
01  Kualitas Premium
02  Harga Bersahabat
03  Pengiriman Cepat
```

**✅ Correct:**
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

**❌ AI Slop:**
```
┌──┐ ┌──┐ ┌──┐ ┌──┐
│  │ │  │ │  │ │  │
└──┘ └──┘ └──┘ └──┘
┌──┐ ┌──┐ ┌──┐ ┌──┐
│  │ │  │ │  │ │  │
└──┘ └──┘ └──┘ └──┘
```
Semua card sama ukuran, monoton, generik.

**✅ Correct:**
```
┌────────┐ ┌──┐ ┌──┐
│        │ │  │ │  │
│ UNGG.  │ └──┘ └──┘
│ (2x2)  │ ┌──┐ ┌──┐
│        │ │  │ │  │
└────────┘ └──┘ └──┘
```
Unggulan lebih besar, variasi ukuran.

---

### 6. Shadow Default di Setiap Card

**❌ AI Slop:**
```
┌────────┐
│ Card 1 │ <- shadow
└────────┘
┌────────┐
│ Card 2 │ <- shadow
└────────┘
```
Shadow generik abu-abu di setiap card, semua sama.

**✅ Correct:**
```
┌────────┐
│ Card 1 │ <- border tipis, no shadow
└────────┘
┌────────┐
│ Card 2 │ <- border tipis, no shadow
└────────┘
```
Border tipis sebagai pemisah, shadow hanya saat hover.

---

### 7. Satu Border Radius Sama untuk Semua

**❌ AI Slop:**
```
┌──────────┐
│ Card      │  <- radius 12px
└──────────┘
┌──────────┐
│ Button   │  <- radius 12px (sama!)
└──────────┘
```

**✅ Correct:**
```
┌──────────────┐
│ Card Unggulan│  <- radius 20px
└──────────────┘
┌──────────┐
│ Card Reg │  <- radius 12px
└──────────┘
┌────────┐
│ Button │  <- radius 8px
└────────┘
```
Bervariasi sesuai hierarki.

---

### 8. Animasi Fade-in/Slide-up di Setiap Section Scroll

**❌ AI Slop:**
- IntersectionObserver + AOS library
- Setiap section fade-in saat scroll
- Card grid stagger animation

**✅ Correct:**
- Hanya 1 momen "berani": transisi buka detail produk
- Sisanya diam, instant, clean

---

### 9. Gradient Hero Dekoratif

**❌ AI Slop:**
```
┌──────────────────────────────────────┐
│ [gradient background: blue to purple] │
│                                       │
│        BELANJA PRODUK CHINA           │
│   [hero text with gradient]           │
│                                       │
│        [Mulai Belanja →]              │
│                                       │
└──────────────────────────────────────┘
```

**✅ Correct:**
```
┌──────────────────────────────────────┐
│ (plain background #FAF8F3)           │
│                                       │
│ ┌────────┐ ┌──┐ ┌──┐ ┌──┐          │
│ │Unggulan│ │  │ │  │ │  │          │
│ │  (2x2) │ └──┘ └──┘ └──┘          │
│ └────────┘                           │
│ (grid produk langsung, no hero)     │
└──────────────────────────────────────┘
```

---

### 10. Font Inter/Poppins/Playfair Generik

**❌ AI Slop:**
- Inter for everything (default AI)
- Poppins (default AI)
- Playfair Display (default AI)

**✅ Correct:**
- Noto Serif SC (heading) — Chinese aesthetic
- Inter (body) — readability (bukan untuk heading)

---

### 11. Tombol dengan Icon Decorative

**❌ AI Slop:**
```
[→ Checkout]
[✨ Premium]
[🔥 Hot Item]
[🚀 Fast Shipping]
```

**✅ Correct:**
```
[Checkout]
Premium (badge)
Hot Item (badge)
Fast Shipping (text)
```
No decorative icons in button text.

---

### 12. Counter Animation pada Angka

**❌ AI Slop:**
- "1,234" animasi count-up saat scroll
- "Rp 10.000.000" counter from 0

**✅ Correct:**
- Static number
- If needed, show "updated 2 jam lalu"

---

### 13. "Trusted by" Logo Strip

**❌ AI Slop:**
```
TRUSTED BY:
[logo1] [logo2] [logo3] [logo4] [logo5]
```

**✅ Correct:**
- Testimonial real (1-2, with photo + nama + kota)
- Atau statistik real "500+ pesanan selesai"

---

### 14. Feature Cards with Icons

**❌ AI Slop:**
```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ [icon]   │ │ [icon]   │ │ [icon]   │
│ Cepat    │ │ Aman     │ │ Murah    │
└──────────┘ └──────────┘ └──────────┘
```

**✅ Correct:**
- Beranda langsung produk
- "Cara Order" pakai numbered steps (1, 2, 3) dengan deskripsi
- No icon-grid feature cards

---

### 15. Typewriter/Text Reveal Effect

**❌ AI Slop:**
- Heading muncul huruf demi huruf
- "Loading..." text typewriter

**✅ Correct:**
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

**Cloud Pattern (祥云):**
- Simbol: good fortune, heaven
- Pakai: divider section (halus, subtle)
- Jangan: card background (busy)

**Wave Pattern (海浪):**
- Simbol: continuous flow, longevity
- Pakai: footer border (subtle)
- Jangan: button background

**Geometric (回纹):**
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
✅ Correct:
  [Simple line icon, 1px stroke, no fill]
  - Shopping bag: outline only
  - User: simple circle + body shape
  - Search: magnifying glass, thin line

❌ AI Slop:
  [Filled icon, rounded, colorful]
  - 3D shopping cart
  - Emoji as icon
  - Multi-color filled icon
```

**Chinese-inspired icons (optional):**
- Coin (元宝): for price-related
- Knot (中国结): for connection/link
- Lotus (莲花): for purity/premium

**Usage:** HANYA kalau fit naturally dengan UI. Jangan pakai Chinese icon kalau generik icon lebih jelas.

---

### 4. Border Style

**Straight, angular, clean:**
``
✅ Correct:
  - 1px solid border, sharp corners on containers
  - 0px radius for section backgrounds
  - Varied radius for cards (12px, 20px) — premium feel

❌ AI Slop:
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
- Contoh: tagline di beranda "鲜货直达" (Fresh goods direct)
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
┌──────────────────────────────────────────────────┐
│ [Logo: Jastip China (red text)]   [Menu] [Cart] │
├──────────────────────────────────────────────────┤
│                                                   │
│  鲜货直达                          ←── brush script, 1 element
│  Barang China, sampai pintu rumah               ←── tagline, Inter 400
│                                                   │
│  ┌────────┐ ┌──┐ ┌──┐                          │
│  │Unggulan│ │  │ │  │                          │
│  │ (2x2)  │ └──┘ └──┘                          │
│  └────────┘                                     │
│                                                   │
│  [footer border: subtle cloud pattern]           │
└──────────────────────────────────────────────────┘
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
- [ ] NO middle dots (·) in meta text
- [ ] NO arrows (→) in buttons
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
