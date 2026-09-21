# Accessibility - Jastip China

WCAG 2.1 Level AA compliance minimum. Focus on keyboard navigation, screen reader support, dan color contrast.

---

## 1. COLOR CONTRAST

### WCAG AA Requirements

| Element | Contrast Ratio | Status |
|---------|----------------|--------|
| Body text (#2C1810 on #FAF8F3) | 9.8:1 | ✅ AAA |
| Secondary text (#6B5D52 on #FAF8F3) | 5.6:1 | ✅ AA |
| Button text (#FFFFFF on #C8102E) | 5.7:1 | ✅ AA |
| Link (#C8102E on #FAF8F3) | 5.7:1 | ✅ AA |
| Price (#D4AF37 on #FFFFFF) | 2.8:1 | ❌ FAIL for text, OK for large text (28px+) |

### Price Color Fix

Price text `#D4AF37` (gold) on white only passes for large text (3:1 for 24px+ regular atau 18px+ bold).

**Solution:**
- Price display: Noto Serif SC 700, minimum 20px → passes large text requirement
- Small price (cart item, order summary): use `#B5941F` (darker gold) instead → 4.5:1 AA pass
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
- [ ] Heading hierarchy logical (H1 → H2 → H3, no skipped levels)
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
