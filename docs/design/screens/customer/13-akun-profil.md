---
title: "Screen 13: Akun Saya (Profile)"
tags: [screen, customer, support]
tanggal: 2026-09-21
---
# Screen 13: Akun Saya (Profile)

## Tujuan
Customer view/edit profile info, manage addresses, logout. Hub untuk akun-related actions.

---

## Layout Wireframe (Desktop)

```
┌───────────────────────────────────────────────────────────────┐
│ [Jastip China]   Beranda  Katalog  Cara Order  [♡] [🛒] [👤] │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐  ┌────────────────────────────────────────┐ │
│  │              │  │ Akun Saya                               │ │
│  │  [Avatar]    │  │                                          │ │
│  │  Budi S.     │  │  Informasi Pribadi                      │ │
│  │              │  │  ┌────────────────────────────────────┐ │ │
│  │  ─── nav ─── │  │  │ Nama:        Budi Santoso          │ │ │
│  │  Profil      │  │  │ Email:       budi@email.com        │ │ │
│  │  Alamat      │  │  │ WhatsApp:    +62 812-3456-7890     │ │ │
│  │  Pesanan     │  │  │                                    │ │ │
│  │  Bantuan     │  │  │              [Edit Profil]          │ │ │
│  │              │  │  └────────────────────────────────────┘ │ │
│  │  [Logout]    │  │                                          │ │
│  │              │  │  Alamat Tersimpan                       │ │
│  └──────────────┘  │  ┌────────────────────────────────────┐ │ │
│                      │  │ (○) Rumah                           │ │ │
│                      │  │     Budi Santoso                    │ │ │
│                      │  │     Jl. Merdeka No. 123            │ │ │
│                      │  │     Bandung, 40123                  │ │ │
│                      │  │                        [Edit]       │ │ │
│                      │  ├────────────────────────────────────┤ │ │
│                      │  │ ( ) Kantor                          │ │ │
│                      │  │     Budi Santoso                    │ │ │
│                      │  │     Jl. Sudirman No. 45            │ │ │
│                      │  │     Jakarta, 12190                  │ │ │
│                      │  │                        [Edit]       │ │
│                      │  ├────────────────────────────────────┤ │ │
│                      │  │ + Tambah Alamat Baru                │ │ │
│                      │  └────────────────────────────────────┘ │ │
│                      │                                          │ │
│                      │  Statistik                              │ │
│                      │  ┌────────┐ ┌────────┐ ┌────────┐     │ │
│                      │  │  3     │ │  1     │ │ 12     │     │ │
│                      │  │Pesanan│ │Proses  │ │Produk  │     │ │
│                      │  └────────┘ └────────┘ └────────┘     │ │
│                      └────────────────────────────────────────┘ │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│ Footer                                                         │
└───────────────────────────────────────────────────────────────┘
```

## Layout Wireframe (Mobile)

```
┌──────────────────────────┐
│ [←]  Akun Saya           │
├──────────────────────────┤
│                            │
│  ┌──────────────────────┐ │
│  │  [Avatar] Budi S.     │ │
│  │  budi@email.com       │ │
│  └──────────────────────┘ │
│                            │
│  ┌──┐ Profil              │
│  └──┘                     │
│  ┌──┐ Alamat              │
│  └──┘                     │
│  ┌──┐ Pesanan Saya        │
│  └──┘                     │
│  ┌──┐ Bantuan             │
│  └──┘                     │
│                            │
│  ┌──────────────────────┐ │
│  │ Alamat Tersimpan     │ │
│  │                      │ │
│  │ (○) Rumah            │ │
│  │ Budi Santoso         │ │
│  │ Jl. Merdeka No. 123  │ │
│  │ Bandung, 40123       │ │
│  │            [Edit]    │ │
│  ├──────────────────────┤ │
│  │ ( ) Kantor           │ │
│  │ ...                  │ │
│  │            [Edit]    │ │
│  ├──────────────────────┤ │
│  │ + Tambah Alamat Baru │ │
│  └──────────────────────┘ │
│                            │
│  [Logout]                  │
│                            │
├──────────────────────────┤
│[Home][Katalog][+][Cart][Me]│
└──────────────────────────┘

(Edit Profil Modal):
┌──────────────────────────┐
│  ━━━ (drag handle)        │
│                      [X]  │
│  Edit Profil              │
│                           │
│  Nama Lengkap             │
│  [Budi Santoso________]   │
│                           │
│  Email                    │
│  [budi@email.com_______]  │
│  (tidak bisa diubah)      │
│                           │
│  No. WhatsApp             │
│  [62 812-3456-7890______] │
│  (verifikasi OTP jika ganti)│
│                           │
│  [Simpan Perubahan]       │
└──────────────────────────┘
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
    - Pesanan Saya → `/pesanan`
    - Bantuan → `/bantuan`
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
- **Action:** "Edit Profil" button (ghost, top-right) → opens modal

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
- **Behavior:** Click → confirm modal "Yakin mau logout?" → clear token → redirect `/beranda`

---

## States

### Loading
- Skeleton profile card, skeleton address list

### Edit Modal — Loading (Save)
- Button: spinner + "Menyimpan..."
- Disable inputs

### Edit Modal — WhatsApp Change
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
- Click "Edit Profil" → modal opens
- Fields: Nama (editable), Email (read-only, disabled), WhatsApp (editable)
- Save → if WhatsApp changed, trigger OTP modal → on verify, save + close
- If only name changed: direct save + toast "Profil berhasil diupdate"

### Address Edit
- Click "Edit" → navigate to `/akun/alamat/[id]` or inline modal form
- Same form as checkout address modal

### Add Address
- Click "+ Tambah Alamat Baru" → modal form
- Fields: Label, Penerima, No. Telp, Alamat, Kota, Provinsi, Kode Pos
- Save → add to list, toast "Alamat baru tersimpan"

### Set Default Address
- Click radio → API update → toast "Alamat utama diubah"

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
- Email is account identity → disabled in edit form
- Helper: "Email nggak bisa diubah. Kalau mau ganti email, hubungi admin."

### WhatsApp Already Used Elsewhere
- On change + verify: if nomor taken by another account
- Error: "Nomor ini dipake akun lain. Hubungi admin kalau ini akun kamu."

### Many Addresses (>5)
- Show all, scrollable card (max-height 400px, overflow-y)
- Or "Lihat Semua Alamat" expandable

---

## WHAT NOT TO DO

1. ❌ NO "→" in buttons
2. ❌ NO "MY ACCOUNT" / "PROFILE" ALL-CAPS
3. ❌ NO settings gear icon menu (use list items)
4. ❌ NO "Account deletion" button (MVP: contact admin to delete)
5. ❌ NO notification preference toggles (backlog)
6. ❌ NO "Connected accounts" (no social login)
7. ❌ NO count-up animation on statistics
8. ❌ NO "2FA settings" (WhatsApp OTP is the 2FA)
9. ❌ NO "Change email" flow (email immutable for MVP)

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

(○) Rumah
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
