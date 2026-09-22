---
title: "Screen 12: Lupa Password"
tags: [screen, customer, support]
tanggal: 2026-09-21
---
# Screen 12: Lupa Password

## Tujuan
Customer reset password via WhatsApp OTP. Flow: input nomor WA → kirim OTP → verifikasi → set password baru.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│                  [Jastip China logo]                          │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────────────┐                         │
│  │                                    │                         │
│  │     Lupa Password?                │                         │
│  │     Ganti via WhatsApp            │                         │
│  │                                    │                         │
│  ─── Step 1 of 3 ───                │                         │
│  │                                    │                         │
│  │     No. WhatsApp                  │                         │
│  │     [62 812-3456-7890__________]   │                         │
│  │     Nomor yang terdaftar di akun  │                         │
│  │                                    │                         │
│  │     [    Kirim Kode OTP    ]     │                         │
│  │                                    │                         │
│  │     Ingat password?                │                         │
│  │     [Kembali ke Login]             │                         │
│  │                                    │                         │
│  └──────────────────────────────────┘                         │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

### Step 2: Verifikasi OTP

```
┌──────────────────────────────────┐
│                                    │
│  Verifikasi Kode                   │
│  ─── Step 2 of 3 ───              │
│                                    │
│  Kode OTP udah dikirim ke         │
│  +62 812-3456-7890                │
│                                    │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐              │
│  │  │ │  │ │  │ │  │              │
│  └──┘ └──┘ └──┘ └──┘              │
│                                    │
│  Tunggu kode dalam 59s             │
│  [Kirim Ulang]                     │
│                                    │
│  [     Verifikasi      ]          │
│                                    │
│  [Kembali]                         │
│                                    │
└──────────────────────────────────┘
```

### Step 3: Password Baru

```
┌──────────────────────────────────┐
│                                    │
│  Password Baru                     │
│  ─── Step 3 of 3 ───              │
│                                    │
│  Password Baru                     │
│  [__________________________]      │
│                         [Lihat]     │
│  Min 8 karakter, ada angka         │
│                                    │
│  Konfirmasi Password Baru          │
│  [__________________________]      │
│                         [Lihat]     │
│                                    │
│  [    Simpan Password    ]        │
│                                    │
└──────────────────────────────────┘
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

### Section 3: Step 1 — Input Nomor WhatsApp
- **Title:** "Lupa Password?" (Noto Serif SC 700, 24px)
- **Subtitle:** "Ganti via WhatsApp" (Noto Serif SC 500, 18px, #6B5D52)
- **Field:** No. WhatsApp (same as register)
  - Prefix: "+62" disabled
  - Placeholder: "812-3456-7890"
  - Helper: "Nomor yang terdaftar di akunmu"
  - Validation: format check, must exist in database
- **Button:** "Kirim Kode OTP" (Primary, full width)
- **Link:** "Ingat password? Kembali ke Login" (ghost, → `/login`)

### Section 4: Step 2 — Verifikasi OTP
- **Title:** "Verifikasi Kode"
- **Info:** "Kode OTP udah dikirim ke +62 [nomor]"
- **OTP Input:** 4 digit boxes (auto-advance)
- **Resend:** Countdown 60s → "Kirim Ulang"
- **Button:** "Verifikasi" (Primary, full width)
- **Button:** "Kembali" (secondary, → step 1)

### Section 5: Step 3 — Password Baru
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

### Step 1: Error — Nomor Not Found
- Inline error: "Nomor ini belum terdaftar. [Daftar di sini?]"
- Border: 2px #9B4D50

### Step 2: Loading (Verifying)
- Button: spinner + "Memverifikasi..."

### Step 2: Error — Wrong OTP
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
- Step 1 → 2: validate nomor + send OTP → advance
- Step 2 → 3: validate OTP → advance
- Step 2 → 1: "Kembali" button (preserve nomor)
- Step 3: submit → success redirect
- No forward skip (must complete each step)

### OTP Auto-Advance
- Same as register: type → next box, backspace → prev box, paste → fill all

### Resend Countdown
- 60s timer, format "Tunggu kode dalam Xs"
- After 0: "Kirim Ulang" clickable (Chinese Red)

### Password Toggle
- "Lihat" / "Sembunyikan" per field

---

## Edge Cases

### Nomor Exists but Multiple Accounts
- (Shouldn't happen — unique constraint on noWa)
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

1. ❌ NO "→" in buttons
2. ❌ NO "RESET PASSWORD" ALL-CAPS
3. ❌ NO email-based reset (WhatsApp is faster for ID market)
4. ❌ NO "security questions" (outdated pattern)
5. ❌ NO password reveal by default (toggle only)
6. ❌ NO auto-advance to step 3 without completing step 2
7. ❌ NO back button that skips validation (step 2 back is fine, but can't jump forward)

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
