# Screen Admin 11: Pengaturan Umum

## Tujuan
Admin set pengaturan umum: rekening bank (untuk customer transfer), nomor WhatsApp admin, profil admin (ganti password), info brand (nama, tagline).

---

## Layout Wireframe (Desktop)

```
┌─────┬───────────────────────────────────────────────────────────┐
│     │  Pengaturan Umum                                          │
│  S  ├───────────────────────────────────────────────────────────┤
│  i  │                                                            │
│  d  │  ┌──────────────────────────────────────────────────────┐ │
│  e  │  │  Profil Admin                                         │ │
│  b  │  │                                                        │ │
│  a  │  │  Email (tidak bisa diubah)                            │ │
│  r  │  │  admin@jastipchina.local                              │ │
│  d  │  │                                                        │ │
│     │  │  Password Saat Ini *                                  │ │
│  D  │  │  [________________]  (verifikasi sebelum ganti)      │ │
│  a  │  │                                                        │ │
│  s  │  │  Password Baru                                        │ │
│  h  │  │  [________________]  Min 8 karakter                  │ │
│  b  │  │                                                        │ │
│  o  │  │  Konfirmasi Password Baru                              │ │
│  a  │  │  [________________]                                    │ │
│  r  │  │                                                        │ │
│  P  │  │  [Ganti Password]                                     │ │
│  r  │  └──────────────────────────────────────────────────────┘ │
│  o  │                                                            │
│  d  │  ┌──────────────────────────────────────────────────────┐ │
│  u  │  │  Rekening Bank                                        │ │
│  k  │  │  (Dipakai customer buat transfer pembayaran)        │ │
│     │  │                                                        │ │
│  P  │  │  ┌────────────────────────────────────────────────┐  │ │
│  O  │  │  │ Bank: BCA                                          │  │ │
│  K  │  │  │ No. Rekening: 1234567890                          │  │ │
│  o  │  │  │ Atas Nama: PT Jastip China                        │  │ │
│  m  │  │  │                              [Edit] [Hapus]        │  │ │
│  p  │  │  └────────────────────────────────────────────────┘  │ │
│     │  │  ┌────────────────────────────────────────────────┐  │ │
│  L  │  │  │ Bank: Mandiri                                     │  │ │
│  o  │  │  │ No. Rekening: 9876543210                          │  │ │
│  g  │  │  │ Atas Nama: PT Jastip China                        │  │ │
│     │  │  │                              [Edit] [Hapus]        │  │ │
│  S  │  │  └────────────────────────────────────────────────┘  │ │
│  e  │  │                                                        │ │
│  t  │  │  [+ Tambah Rekening]                                 │ │
│  t  │  └──────────────────────────────────────────────────────┘ │
│  .  │                                                            │
│     │  ┌──────────────────────────────────────────────────────┐ │
│     │  │  Info Kontak                                          │ │
│     │  │                                                        │ │
│     │  │  Nomor WhatsApp Admin *                              │ │
│     │  │  [62 812-0000-0000]                                   │ │
│     │  │  (Dipakai buat link Chat WhatsApp + broadcast)       │ │
│     │  │                                                        │ │
│     │  │  Email Customer Service *                            │ │
│     │  │  [hello@jastipchina.id]                              │ │
│     │  │                                                        │ │
│     │  │  Jam Operasional                                      │ │
│     │  │  [Senin-Sabtu, 09:00-18:00 WIB]                      │ │
│     │  │                                                        │ │
│     │  │  [Simpan]                                             │ │
│     │  └──────────────────────────────────────────────────────┘ │
│     │                                                            │
│     │  ┌──────────────────────────────────────────────────────┐ │
│     │  │  Info Brand                                           │ │
│     │  │                                                        │ │
│     │  │  Nama Brand *                                         │ │
│     │  │  [Jastip China]                                       │ │
│     │  │                                                        │ │
│     │  │  Tagline (CN) *                                       │ │
│     │  │  [鲜货直达]                                            │ │
│     │  │                                                        │ │
│     │  │  Tagline (ID) *                                       │ │
│     │  │  [Barang China, sampai pintu rumah]                  │ │
│     │  │                                                        │ │
│     │  │  Deskripsi Footer                                     │ │
│     │  │  [Jastip China - jasa titip barang China...]        │ │
│     │  │  [                                                  ]  │ │
│     │  │                                                        │ │
│     │  │  [Simpan]                                             │ │
│     │  └──────────────────────────────────────────────────────┘ │
│     │                                                            │
└─────┴───────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Pengaturan Umum    │
├──────────────────────────┤
│                            │
│ ┌────────────────────────┐ │
│ │ Profil Admin            │ │
│ │                         │ │
│ │ Email (tidak bisa diubah)│ │
│ │ admin@jastipchina.local │ │
│ │                         │ │
│ │ Password Saat Ini *    │ │
│ │ [________________]      │ │
│ │                         │ │
│ │ Password Baru           │ │
│ │ [________________]      │ │
│ │                         │ │
│ │ Konfirmasi Password Baru│ │
│ │ [________________]      │ │
│ │                         │ │
│ │ [Ganti Password]       │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Rekening Bank          │ │
│ │                         │ │
│ │ ┌────────────────────┐ │ │
│ │ │ BCA                │ │ │
│ │ │ 1234567890         │ │ │
│ │ │ PT Jastip China    │ │ │
│ │ │       [Edit][Hapus]│ │ │
│ │ └────────────────────┘ │ │
│ │ ┌────────────────────┐ │ │
│ │ │ Mandiri            │ │ │
│ │ │ 9876543210         │ │ │
│ │ │ PT Jastip China    │ │ │
│ │ │       [Edit][Hapus]│ │ │
│ │ └────────────────────┘ │ │
│ │ [+ Tambah Rekening]  │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Info Kontak             │ │
│ │                         │ │
│ │ Nomor WhatsApp Admin * │ │
│ │ [62 812-0000-0000]      │ │
│ │                         │ │
│ │ Email CS *              │ │
│ │ [hello@jastipchina.id]  │ │
│ │                         │ │
│ │ Jam Operasional         │ │
│ │ [Senin-Sabtu, 09-18]    │ │
│ │                         │ │
│ │ [Simpan]               │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Info Brand              │ │
│ │                         │ │
│ │ Nama Brand *            │ │
│ │ [Jastip China]          │ │
│ │                         │ │
│ │ Tagline (CN) *          │ │
│ │ [鲜货直达]               │ │
│ │                         │ │
│ │ Tagline (ID) *          │ │
│ │ [Barang China, sampai..]│ │
│ │                         │ │
│ │ Deskripsi Footer         │ │
│ │ [Jastip China - jasa..] │ │
│ │                         │ │
│ │ [Simpan]               │ │
│ └────────────────────────┘ │
│                            │
├──────────────────────────┤
│[Dash][Order][+][Prod][More]│
└──────────────────────────┘
```

---

## Sections

### Section 1: Admin Sidebar
- "Settings" → "Pengaturan Umum" active

### Section 2: Profil Admin
- **Layout:** Card, full width
- **Content:**
  - Email (read-only, disabled): "admin@jastipchina.local"
  - Password Saat Ini (required, password input): verifikasi sebelum ganti
  - Password Baru (optional, password input): min 8 chars
  - Konfirmasi Password Baru (optional): must match
  - "Ganti Password" button (Primary)
- **Validation:**
  - Current password must match (API verify)
  - New password: min 8, letter + number
  - Confirm must match
- **Success:** Toast "Password berhasil diganti." + clear fields
- **Error:** "Password saat ini salah."

### Section 3: Rekening Bank
- **Layout:** Card, full width
- **Content:** List of bank accounts (from Pengaturan or static config)
- **Each rekening card:**
  ```
  Bank: [nama bank]
  No. Rekening: [nomor] (monospace, Inter 600)
  Atas Nama: [pemilik]
  [Edit] [Hapus]
  ```
- **Actions:**
  - "+ Tambah Rekening" (ghost button)
  - Edit → modal form
  - Hapus → confirm modal
- **Modal form (Tambah/Edit):**
  - Bank (input or dropdown: BCA, Mandiri, BNI, BRI, CIMB)
  - No. Rekening (input, numeric)
  - Atas Nama (input)
  - [Batal] [Simpan]

### Section 4: Info Kontak
- **Layout:** Card, full width
- **Fields:**
  1. **Nomor WhatsApp Admin** (required)
     - Input: tel, prefix "+62"
     - Helper: "Dipakai buat link Chat WhatsApp + broadcast notifikasi"
     - Validation: format check
  2. **Email Customer Service** (required)
     - Input: email
     - Validation: email format
  3. **Jam Operasional** (optional)
     - Input: text
     - Placeholder: "Senin-Sabtu, 09:00-18:00 WIB"
- **Button:** "Simpan" (Primary)
- **Success:** Toast "Info kontak disimpan."

### Section 5: Info Brand
- **Layout:** Card, full width
- **Fields:**
  1. **Nama Brand** (required)
     - Default: "Jastip China"
  2. **Tagline (CN)** (required)
     - Chinese text, Ma Shan Zheng font
     - Default: "鲜货直达"
  3. **Tagline (ID)** (required)
     - Default: "Barang China, sampai pintu rumah"
  4. **Deskripsi Footer** (optional, textarea)
     - Default: "Jastip China - jasa titip barang China terpercaya..."
     - Max 500 chars
- **Button:** "Simpan" (Primary)
- **Success:** Toast "Info brand disimpan."

---

## States

### Loading
- Skeleton all cards

### Save Loading (per card)
- Each "Simpan" button: spinner + "Menyimpan..."

### Save Success
- Toast: "[Section] disimpan."
- Card updates

### Password Change Error
- "Password saat ini salah." (inline on current password field)

### Validation Error
- Per-field inline errors

### Rekening Delete Confirm
- "Hapus rekening ini? Customer nggak bakal bisa lihat rekening ini buat transfer."
- If only 1 rekening: "Minimal 1 rekening harus ada. Tambah rekening lain dulu."

---

## Interactions

### Ganti Password
- Fill current + new + confirm → click "Ganti Password"
- API: POST /api/admin/change-password
- Verify current → if match, update
- On success: clear fields, toast
- On fail: error on current password field

### Rekening CRUD
- **Tambah:** Click "+ Tambah Rekening" → modal form → save → add to list
- **Edit:** Click "Edit" → modal pre-filled → save → update
- **Hapus:** Click "Hapus" → confirm → delete → remove from list

### Info Kontak Save
- Fill fields → click "Simpan" → API update → toast

### Info Brand Save
- Fill fields → click "Simpan" → API update → toast
- Tagline (CN): font preview (Ma Shan Zheng)

---

## Edge Cases

### Only One Rekening (can't delete)
- Disable "Hapus" if only 1 rekening
- Or: show warning "Minimal 1 rekening harus ada."

### WhatsApp Number Format
- Auto-format: strip leading 0, add +62 prefix
- Display: "+62 812-0000-0000"

### Brand Name Change
- Affects: header logo, footer, page titles
- Global update (all pages reflect new name)

### Tagline CN Font
- Ensure Ma Shan Zheng loaded
- Preview in form (real-time)

### Password Reuse
- If new password == current: "Password baru nggak boleh sama dengan yang lama."

---

## WHAT NOT TO DO

1. ❌ NO "→" in buttons
2. ❌ NO "SETTINGS" / "GENERAL SETTINGS" ALL-CAPS
3. ❌ NO "2FA setup" (password is enough for MVP)
4. ❌ NO email change (admin email is immutable)
5. ❌ NO "Delete account" (admin account permanent)
6. ❌ NO SMTP/email server config (WhatsApp only for MVP)
7. ❌ NO "Maintenance mode" toggle (backlog)
8. ❌ NO "API keys" management (backlog)

---

## Copy

### Page Title (H1)
```
Pengaturan Umum
```

### Profil Admin
```
Profil Admin

Email (tidak bisa diubah)
admin@jastipchina.local

Password Saat Ini *
[________________]
(verifikasi sebelum ganti password)

Password Baru
[________________]
Min 8 karakter, ada huruf dan angka

Konfirmasi Password Baru
[________________]

[Ganti Password]
```

### Rekening Bank
```
Rekening Bank
(Dipakai customer buat transfer pembayaran)

Bank: BCA
No. Rekening: 1234567890
Atas Nama: PT Jastip China
[Edit] [Hapus]

Bank: Mandiri
No. Rekening: 9876543210
Atas Nama: PT Jastip China
[Edit] [Hapus]

[+ Tambah Rekening]
```

### Rekening Modal
```
Tambah Rekening

Bank *
[BCA ▼]
(BCA, Mandiri, BNI, BRI, CIMB)

No. Rekening *
[1234567890]

Atas Nama *
[PT Jastip China]

[Batal] [Simpan]
```

### Info Kontak
```
Info Kontak

Nomor WhatsApp Admin *
[62 812-0000-0000]
(Dipakai buat link Chat WhatsApp + broadcast notifikasi)

Email Customer Service *
[hello@jastipchina.id]

Jam Operasional
[Senin-Sabtu, 09:00-18:00 WIB]

[Simpan]
```

### Info Brand
```
Info Brand

Nama Brand *
[Jastip China]

Tagline (CN) *
[鲜货直达]

Tagline (ID) *
[Barang China, sampai pintu rumah]

Deskripsi Footer
[Jastip China - jasa titip barang China terpercaya. Barang asli, harga bersahabat, sampai depan pintu rumah.]

[Simpan]
```

### Validation Errors
```
Password saat ini salah.
Password baru nggak boleh sama dengan yang lama.
Password minimal 8 karakter.
Konfirmasi password tidak cocok.
Nomor WhatsApp tidak valid.
Format email tidak valid.
Nama brand wajib diisi.
Tagline (CN) wajib diisi.
Tagline (ID) wajib diisi.
Bank wajib dipilih.
No. Rekening wajib diisi.
Atas Nama wajib diisi.
```

### Delete Confirm (Rekening)
```
Hapus rekening ini?
Customer nggak bakal bisa lihat rekening ini buat transfer.

[Batal] [Ya, Hapus]
```

### Delete Blocked (Last Rekening)
```
Minimal 1 rekening harus ada.
Tambah rekening lain dulu.
```

### Toasts
```
Password berhasil diganti.
Rekening disimpan.
Rekening dihapus.
Info kontak disimpan.
Info brand disimpan.
```
