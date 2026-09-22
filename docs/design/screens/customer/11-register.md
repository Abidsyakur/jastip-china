---
title: "Screen 11: Register (Daftar)"
tags: [screen, customer, support]
tanggal: 2026-09-21
---
# Screen 11: Register (Daftar)

## Tujuan
Customer daftar akun baru dengan nama, email, password, no. WhatsApp. Verifikasi OTP via WhatsApp.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│                  [Jastip China logo]                          │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────────────┐                         │
│  │                                    │                         │
│  │     鲜货直达                      │                         │
│  │     Daftar akun baru              │                         │
│  │                                    │                         │
│  │     Nama Lengkap                  │                         │
│  │     [__________________________]  │                         │
│  │     Budi Santoso                   │                         │
│  │                                    │                         │
│  │     Email                         │                         │
│  │     [__________________________]  │                         │
│  │     nama@email.com                │                         │
│  │                                    │                         │
│  │     No. WhatsApp                  │                         │
│  │     [62 812-3456-7890__________]   │                         │
│  │     Format: 62xxx                 │                         │
│  │                                    │                         │
│  │     Password                      │                         │
│  │     [__________________________]  │                         │
│  │                         [Lihat]    │                         │
│  │     Min 8 karakter, ada angka      │                         │
│  │                                    │                         │
│  │     Konfirmasi Password            │                         │
│  │     [__________________________]  │                         │
│  │                         [Lihat]    │                         │
│  │                                    │                         │
│  │     ☐ Saya setuju dengan Syarat   │                         │
│  │       & Ketentuan serta Kebijakan │                         │
│  │       Privasi                      │                         │
│  │                                    │                         │
│  │     [      Daftar          ]      │                         │
│  │                                    │                         │
│  │     Sudah punya akun?              │                         │
│  │     [Masuk di sini]                │                         │
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
│ [←]                      │
├──────────────────────────┤
│                            │
│        鲜货直达             │
│        Daftar akun baru  │
│                            │
│   Nama Lengkap             │
│   [______________________] │
│                            │
│   Email                    │
│   [______________________] │
│                            │
│   No. WhatsApp             │
│   [62 812-3456-7890______] │
│                            │
│   Password                 │
│   [______________________] │
│                  [Lihat]    │
│                            │
│   Konfirmasi Password      │
│   [______________________] │
│                  [Lihat]    │
│                            │
│   ☐ Saya setuju dengan     │
│     Syarat & Ketentuan... │
│                            │
│   [      Daftar        ]   │
│                            │
│   Sudah punya akun?        │
│   [Masuk di sini]          │
│                            │
└──────────────────────────┘

(OTP Verification Modal - after submit):
┌──────────────────────────┐
│  ━━━ (drag handle)        │
│                      [X]  │
│  Verifikasi WhatsApp      │
│                           │
│  Kode OTP udah dikirim    │
│  ke 62 812-3456-7890      │
│                           │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐     │
│  │  │ │  │ │  │ │  │     │
│  └──┘ └──┘ └──┘ └──┘     │
│                           │
│  Tunggu kode dalam 59s    │
│  [Kirim Ulang]            │
│                           │
│  [Verifikasi]             │
│                           │
│  Salah nomor? [Ubah]      │
└──────────────────────────┘
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
  - Chinese tagline: "鲜货直达" (Ma Shan Zheng, 28px, Chinese Red, centered)
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
     - Links in text: "Syarat & Ketentuan" → `/snk`, "Kebijakan Privasi" → `/privasi`
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
  - Resend: "Tunggu kode dalam 59s" countdown → "Kirim Ulang" (clickable after 60s)
  - "Verifikasi" button (primary)
  - "Salah nomor? Ubah" link → close modal, back to form

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
- Type digit → auto-focus next box
- Backspace on empty → focus previous box
- Paste 4 digits → fill all boxes

### Resend OTP Countdown
- 60-second timer starts after first send
- Format: "Tunggu kode dalam 59s" → "Tunggu kode dalam 1s"
- After 0: "Kirim Ulang" becomes clickable (Chinese Red)

### Unique Check (Email + WhatsApp)
- On blur: debounce 300ms → API check
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
- User types "0812" → auto-strip leading 0 → "812"
- User types "+62812" → auto-strip +62 → "812"
- Display: "+62 812-3456-7890" (auto-format with dashes)

### OTP Lost (WhatsApp not received)
- After 2nd resend: show "Belum dapet kode? Hubungi admin via WA"
- WhatsApp link to admin number

---

## WHAT NOT TO DO

1. ❌ NO "→" in "Daftar" button
2. ❌ NO "CREATE ACCOUNT" / "SIGN UP" ALL-CAPS
3. ❌ NO social login (Google/Facebook)
4. ❌ NO email verification link (use WhatsApp OTP, faster for ID market)
5. ❌ NO mandatory profile photo upload
6. ❌ NO mandatory address during registration (add later in profile)
7. ❌ NO "Subscribe to newsletter" checkbox
8. ❌ NO captcha (rate limiting handles bots)
9. ❌ NO "Invite code" / referral field (backlog)

---

## Copy

### Tagline
```
鲜货直达
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
