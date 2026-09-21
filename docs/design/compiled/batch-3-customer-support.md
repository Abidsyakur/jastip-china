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
