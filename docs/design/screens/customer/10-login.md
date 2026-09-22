---
title: "Screen 10: Login"
tags: [screen, customer, support]
tanggal: 2026-09-21
---
# Screen 10: Login

## Tujuan
Customer login dengan email + password. Gateway ke checkout, riwayat, profile.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│                  [Jastip China logo]                          │
│              Beranda  Katalog  Cara Order                     │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────────────┐                         │
│  │                                    │                         │
│  │     鲜货直达                      │                         │
│  │     Masuk ke akunmu               │                         │
│  │                                    │                         │
│  │     Email                         │                         │
│  │     [__________________________]  │                         │
│  │     nama@email.com                │                         │
│  │                                    │                         │
│  │     Password                       │                         │
│  │     [__________________________]  │                         │
│  │                         [Lihat]    │                         │
│  │                                    │                         │
│  │     [        Masuk          ]     │                         │
│  │                                    │                         │
│  │     Lupa password?                 │                         │
│  │                                    │                         │
│  │     ─── atau ───                   │                         │
│  │                                    │                         │
│  │     Belum punya akun?              │                         │
│  │     [Daftar di sini]               │                         │
│  │                                    │                         │
│  │     ─── cloud pattern ───          │                         │
│  │     Admin? [Login Admin]          │                         │
│  │                                    │                         │
│  └──────────────────────────────────┘                         │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]              [🛒]     │
├──────────────────────────┤
│                            │
│                            │
│        鲜货直达             │
│        Masuk ke akunmu    │
│                            │
│   Email                    │
│   [______________________] │
│   nama@email.com           │
│                            │
│   Password                 │
│   [______________________] │
│                  [Lihat]    │
│                            │
│   [      Masuk        ]    │
│                            │
│   Lupa password?           │
│                            │
│   ─── atau ───              │
│                            │
│   Belum punya akun?        │
│   [Daftar di sini]         │
│                            │
│   ─── cloud pattern ───    │
│   Admin? [Login Admin]    │
│                            │
└──────────────────────────┘
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
  - Chinese tagline: "鲜货直达" (Ma Shan Zheng, 28px, Chinese Red, centered)
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
  - "Lupa password?" (ghost link, Chinese Red, 14px) → `/forgot-password`
  - Divider: "─── atau ───" (Inter 400, 12px, #6B5D52, centered)
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
- Click "Lihat" → toggle input type password ↔ text
- Icon change: eye → eye-off
- Text change: "Lihat" → "Sembunyikan"

### Enter Key Submit
- Press Enter on password field → submit form

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

1. ❌ NO "→" in "Masuk" button
2. ❌ NO "WELCOME BACK" or "SIGN IN" ALL-CAPS
3. ❌ NO social login (Google/Facebook) — MVP uses email only
4. ❌ NO "Remember me" checkbox (session handled by JWT expiry)
5. ❌ NO captcha (rate limiting handles bots)
6. ❌ NO full-page background image
7. ❌ NO gradient background
8. ❌ NO auto-focus on email (mobile keyboard pops up unexpectedly)

---

## Copy

### Tagline
```
鲜货直达
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

─── atau ───

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
