---
title: "Interactions & Micro-Interactions - Jastip China"
tags: [foundation]
tanggal: 2026-09-21
---
# Interactions & Micro-Interactions - Jastip China

Animation, hover, focus, dan transisi rules.

**Core principle:** "Satu halaman, satu momen berani — sisanya tenang dan disiplin."

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

**Rule:** JANGAN pakai `ease` default browser — always explicit cubic-bezier.

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

**Context:** User click card produk → navigasi ke `/produk/[id]`

**Animation:**
1. Card produk image slightly scale (1.0 → 1.02, 200ms)
2. Page transition: fade-out current page (200ms)
3. New page load: detail image fade-in + slight scale (0.98 → 1.0, 400ms ease-out)
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

**Skeleton → Content Transition:**
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

- Click label → focus input (expand touch target)
- Tab key → logical order (top-to-bottom, left-to-right)
- Enter key on single-field form → submit
- Enter key on multi-field form → focus next field (NOT submit)

---

## 8. MODAL & DROPDOWN ANIMATIONS

### Modal Open

```
1. Backdrop fade-in: 200ms ease-out (opacity 0 → 0.4)
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
1. Old tab fade-out: 100ms ease-out (opacity 1 → 0)
2. New tab fade-in: 200ms ease-out (opacity 0 → 1)
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
1. Main image fade-out: 100ms ease-out (opacity 1 → 0)
2. New image fade-in: 200ms ease-out (opacity 0 → 1)
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

### ❌ AI Slop Animations

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

### ❌ Decorative Motion

- NO animated background gradients
- NO floating particles
- NO spinning decorative elements
- NO moving waves or shapes
- NO video backgrounds
- NO Lottie animations (except loading states, optional)

### ❌ Excessive Transitions

- NO 500ms+ duration for simple state changes
- NO multiple animations running simultaneously on same element
- NO transition on layout properties (width, height, padding) — only transform + opacity

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
- [ ] Duration ≤ 400ms for most animations
- [ ] Skeleton loaders for content areas
- [ ] Modal/dropdown animations functional (not decorative)
- [ ] No scroll-triggered fade-in animations
- [ ] `prefers-reduced-motion` respected
- [ ] Loading states prevent double-submit
