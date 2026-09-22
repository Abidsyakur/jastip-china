---
title: "Design Prompt: Jastip China E-Commerce Platform"
tags: [pen-dev, arsip]
tanggal: 2026-09-21
---
# Design Prompt: Jastip China E-Commerce Platform

## TENTANG PRODUK

Platform jasa titip (jastip) barang dari China ke Indonesia. Customer membeli produk dari katalog (ready stock) atau ajukan Custom PO (off-catalog). Pembayaran via transfer bank manual + upload bukti. Admin verifikasi pembayaran, proses pesanan, update status kirim.

**Domain bisnis:** E-commerce + jasa titip import. BUKAN SaaS. BUKAN landing page marketing.

**Target user:**
- Customer: pembeli online Indonesia yang cari produk China (tas, sepatu, aksesoris, elektronik, fashion)
- Admin: owner/staff yang manage katalog, verifikasi pembayaran, proses pesanan

**Vibe:** Boutique importir premium tapi approachable. Bukan megah mewah. Bukan murah-meriah. Hangat, terpercaya, jujur.

---

## TOKEN DESAIN (PAKAI PERSIS INI, JANGAN IMPROVISASI)

### Warna

```
Primer/brand:    #4a2318 (maroon tua)
Latar utama:     #EDE6DA (stone hangat)
Teks utama:      #2A211D (nyaris hitam, hangat)
Aksen:           #B8863B (ochre pudar, untuk harga/badge)
Putih kartu:     #FFFFFF atau #F7F3EC (variasi tipis dari latar)
```

**Penggunaan warna:**
- Latar `#EDE6DA` dipakai untuk body/background halaman
- Card produk pakai `#FFFFFF` atau `#F7F3EC` (bervariasi, bukan semua sama)
- Maroon `#4a2318` untuk: logo, tombol primer, link aktif, header navigation
- Ochre `#B8863B` HANYA untuk: harga, badge "Ready Stock", highlight angka penting
- Teks body `#2A211D`, teks secondary (deskripsi, meta) pakai opacity 70-80%

### Tipografi

```
Judul/heading: Fraunces (Google Fonts) — serif berkarakter, dipakai BESAR dan percaya diri
Body/UI:      Work Sans (Google Fonts) — bersih, mudah dibaca
```

**Aturan tipografi:**
- Heading pakai Fraunces, weight 500-700, ukuran besar (H1: 48-64px, H2: 32-40px, H3: 24-28px)
- Body pakai Work Sans, weight 400 untuk body, 500-600 untuk UI labels/button
- JANGAN pakai Inter, Poppins, Playfair Display
- JANGAN pakai label ALL-CAPS di atas judul
- Harga selalu pakai Work Sans weight 600, warna ochre

### Border Radius (BERVARIASI, bukan satu nilai seragam)

```
Card produk unggulan:  20px (besar, premium feel)
Card produk regular:   12px (sedang)
Badge/tag:             6px (kecil, tegas)
Tombol:                8px (sedang, clean)
Input field:           8px
```

### Shadow & Border

- Shadow dipakai SEPERLUNYA, bukan default di setiap card
- Card produk: border tipis 1px `#E0D9CC` sebagai pemisah, shadow halus hanya pada hover
- Card unggulan boleh shadow lebih dalam
- Tombol primer: no shadow default, shadow halus saat hover

---

## LAYOUT PRINSIP

### Beranda (BUKAN SaaS landing page)

- TIDAK ADA hero besar dengan judul marketing + tombol CTA + gradient dekoratif
- TIDAK ADA "OUR PRODUCTS" label di atas grid
- Beranda LANGSUNG tampilkan grid produk sebagai elemen utama
- Navigation bar tipis di atas (logo kiri, menu kanan)
- Grid produk: variasikan ukuran card — produk unggulan lebih besar (2x lebar + 2x tinggi), regular seragam
- Maksimal 1 section banner kecil (promo/kategori) sebelum grid, opsional

### Grid Produk

```
Layout grid: CSS Grid, bukan flexbox uniform
- Produk unggulan: span 2 kolom x 2 baris
- Produk regular: 1x1
- Mobile: semua 1 kolom (full width), unggulan tetap 2x tinggi
- Gap antar card: 16px desktop, 12px mobile
```

### Spacing

```
Container max-width: 1280px desktop, full width mobile
Padding horizontal: 24px desktop, 16px mobile
Section gap: 48px desktop, 32px mobile
```

---

## YANG HARUS DIHINDARI (STRICT)

1. ❌ Label ALL-CAPS di atas judul (mis. "OUR PRODUCTS", "FEATURED ITEMS")
2. ❌ Teks meta dipisah titik tengah (·) — gunakan koma atau pisah baris
3. ❌ Tombol yang selalu diakhiri "→" — pakai teks biasa
4. ❌ Angka 01/02/03 sebagai dekorasi (KECUALI halaman "Cara Order" yang benar-benar proses berurutan)
5. ❌ Animasi fade-in/slide-up di SETIAP section saat scroll — pilih SATU momen saja (misal transisi buka detail produk), biarkan sisanya diam
6. ❌ Inter, Poppins, Playfair Display sebagai font
7. ❌ Gradient hero decorative
8. ❌ Shadow abu-abu generik di setiap card
9. ❌ Satu border-radius sama untuk semua elemen
10. ❌ Grid produk seragam sempurna semua ukuran sama

---

## HALAMAN YANG PERLU DIDESAIN

### A. CUSTOMER PAGES

#### 1. Beranda (`/`)
- Navigation bar: logo kiri, menu (Katalog, Cara Order, Lacak Pesanan), ikon keranjang + login/avatar kanan
- Banner kategori kecil (horizontal scroll): Tas, Sepatu, Aksesoris, Elektronik, Fashion
- Grid produk utama: 6-8 produk, 1-2 unggulan (besar), sisanya regular
- Card produk: gambar, nama produk (Fraunces), harga (ochre), badge "Ready Stock" atau "Stok Terbatas"
- Footer minimal: logo, kontak WhatsApp, link singkat

#### 2. Katalog (`/katalog`)
- Filter sidebar kiri: kategori (checkbox/radio), range harga, status stok
- Sort dropdown: Terbaru, Harga Terendah, Harga Tertinggi, Popularitas
- Grid produk regular (seragam, no unggulan), pagination di bawah
- Card sama dengan beranda tapi lebih compact

#### 3. Detail Produk (`/produk/[id]`)
- Layout 2 kolom: gambar kiri (gallery + thumbnail), info kanan
- Galeri: gambar utama + thumbnail strip di bawah
- Info: nama (Fraunces besar), harga (ochre), deskripsi, pilih varian (button group), qty stepper, tombol "Tambah ke Keranjang" + "Beli Langsung"
- Section "Produk Terkait" di bawah (horizontal scroll)
- INI MOMEN SATU-SATUNYA untuk animasi: transisi buka detail (fade image in)

#### 4. Keranjang (`/keranjang`)
- Layout 2 kolom: list item kiri, ringkasan order kanan
- Item: gambar kecil, nama, varian, harga satuan, qty stepper, subtotal, tombol hapus
- Ringkasan: subtotal produk, biaya jasa titip (estimasi), ongkir (estimasi/placeholder "dihitung saat checkout"), total
- Tombol "Checkout" di bawah ringkasan
- Empty state: ilustrasi/teks sederhana "Keranjang masih kosong" + tombol "Lihat Katalog"

#### 5. Checkout (`/checkout`)
- Layout 3 step horizontal (bukan wizard pop-up):
  1. Pilih Alamat (list radio alamat tersimpan + tombol "Tambah Alamat Baru")
  2. Pilih Kurir (radio: JNE, J&T, SiCepat — dengan estimasi ongkir)
  3. Konfirmasi Pesanan (ringkasan item + biaya breakdown)
- Sidebar kanan: total bayar, metode pembayaran (transfer bank), tombol "Bayar Sekarang"
- Setelah submit: redirect ke `/pesanan/[id]/pembayaran`

#### 6. Upload Bukti Pembayaran (`/pesanan/[id]/pembayaran`)
- Info pesanan: no invoice, total bayar, metode (transfer bank), rekening tujuan
- Area upload: drop zone atau tombol "Pilih File", preview gambar setelah dipilih
- Tombol "Upload Bukti" + status (menunggu upload, terkirim, menunggu verifikasi)
- Catatan: "Pembayaran akan diverifikasi admin dalam 1x24 jam"

#### 7. Riwayat Pesanan (`/pesanan`)
- List pesanan (timeline vertikal atau table)
- Tiap item: no invoice, tanggal, status (badge berwarna), total, tombol "Lihat Detail"
- Filter status: Semua, Menunggu Pembayaran, Diproses, Dikirim, Selesai

#### 8. Detail Pesanan / Lacak (`/pesanan/[id]`)
- Status pipeline visual: Menunggu Pembayaran → Diproses Admin → Dikonsolidasi Kirim → Tiba Kirim Lokal → Selesai
- Detail item, alamat tujuan, biaya breakdown
- Info pengiriman: kurir, no resi, estimasi tiba
- Tombol "Ajukan Komplain" (jika status Selesai dan dalam masa garansi)
- Tombol "Upload Bukti" (jika status Menunggu Pembayaran)

#### 9. Ajukan Custom PO (`/permintaan-po`)
- Form: link produk referensi, deskripsi spesifikasi (textarea), upload foto referensi (multi), jumlah diminta
- Info box: "Tim kami akan review dan kasih estimasi harga dalam 1-2 hari kerja"
- Setelah submit: redirect ke `/permintaan-po/[id]` dengan status "Menunggu Review"

#### 10. Respon Penawaran PO (`/permintaan-po/[id]`)
- Detail PO: link referensi, spesifikasi, foto
- Penawaran admin: estimasi harga/unit, estimasi ongkir, catatan admin
- Tombol: "Setuju & Lanjut ke Pembayaran" atau "Tolak Penawaran"
- Jika setuju: form alamat + kurir (seperti checkout step 1-2), tombol "Konfirmasi"

#### 11. Ajukan Komplain (`/pesanan/[id]/komplain`)
- Pilih item yang dikomplain (jika pesanan multi-item)
- Pilih alasan: Barang Rusak, Tidak Sesuai Deskripsi, Salah Kirim, Lainnya
- Upload bukti foto (wajib, multi)
- Deskripsi masalah (textarea)
- Tombol "Kirim Komplain"

#### 12. Notifikasi (`/notifikasi`)
- List notifikasi (icon + pesan + waktu)
- Tombol "Tandai Semua Dibaca"
- Filter: Semua, Belum Dibaca

#### 13. Profil & Alamat (`/profil`)
- Tab: Info Akun, Alamat Saya, Riwayat Pesanan
- Info Akun: nama, no WhatsApp, email (edit)
- Alamat: list alamat tersimpan, tombol tambah/edit/hapus
- Setiap alamat: label, penerima, no telp, alamat lengkap, kota, provinsi, kode pos

#### 14. Login Customer (`/login`)
- Form sederhana di tengah, latar stone hangat
- Field: Nomor WhatsApp, Password
- Link: "Belum punya akun? Daftar" dan "Lupa password?"
- Link kecil: "Login sebagai Admin" di bawah

#### 15. Register Customer (`/register`)
- Form: Nama Lengkap, Nomor WhatsApp, Password, Konfirmasi Password
- Link: "Sudah punya akun? Login"

#### 16. Forgot Password (`/forgot-password`)
- Form: Nomor WhatsApp
- Info: "Link reset akan dikirim via WhatsApp"
- Success state: "Link reset terkirim, cek WhatsApp Anda"

#### 17. Reset Password (`/reset-password`)
- Form: Password Baru, Konfirmasi Password
- Auto-verify token dari URL param

### B. ADMIN PAGES

#### 18. Admin Login (`/admin/login`)
- Form sederhana, vibe lebih "clean/professional" bukan marketing
- Field: Email, Password
- Bisa sedikit berbeda dari customer login (tombol maroon lebih tegas, minimal)

#### 19. Admin Dashboard (`/admin/dashboard`)
- Statistik cards: Total Omzet (ochre accent), Pesanan Aktif, Menunggu Verifikasi, Komplain Pending
- Chart sederhana: pesanan per status (bar chart atau donut)
- Table "Aksi Cepat": list pesanan menunggu verifikasi pembayaran + PO menunggu review

#### 20. Admin Manajemen Produk (`/admin/produk`)
- Table produk: nama, kategori, harga, stok, status, tombol aksi (edit/hapus)
- Tombol "Tambah Produk" (maroon)
- Filter: kategori, status (AKTIF/NONAKTIF)
- Search by nama

#### 21. Admin Form Produk (`/admin/produk/new` & `/admin/produk/[id]/edit`)
- Layout 2 kolom: form kiri, preview/live preview kanan
- Field: nama, kategori (select), deskripsi, harga asal (RMB), kurs (auto dari KursMaster, tampil read-only), harga jual IDR (auto-calc, bisa override), berat (gram), link sumber, stok, status
- Multi-gambar: upload URL atau file, drag to reorder, set thumbnail
- Varian: dynamic list, add/remove row (nama varian, stok, harga tambahan)
- Tombol: Simpan, Batal

#### 22. Admin Manajemen Pesanan (`/admin/pesanan`)
- Table: no invoice, customer, tanggal, status, total, aksi (detail)
- Filter status: semua + 6 status pipeline
- Search by invoice/customer

#### 23. Admin Detail Pesanan (`/admin/pesanan/[id]`)
- Info pesanan: customer, alamat, item list, biaya breakdown
- Status pipeline visual + tombol update status
- Section pembayaran: list percobaan pembayaran, view bukti, tombol verify/reject
- Section pengiriman: input kurir, no resi, estimasi (lazy-create)
- Section biaya: edit ongkirChinaGudang (field khusus), total auto-recalc

#### 24. Admin Verifikasi Pembayaran (`/admin/pembayaran`)
- List pembayaran menunggu verifikasi (table)
- Klik row → modal/page: view bukti transfer (image preview besar), info pesanan, tombol "Verifikasi" atau "Tolak" (dengan catatan)

#### 25. Admin Review Custom PO (`/admin/permintaan-po`)
- List PO menunggu review
- Klik → detail: link referensi, spesifikasi, foto, qty
- Form review: estimasi harga/unit, estimasi ongkir, catatan admin
- Tombol: "Kirim Penawaran" atau "Tolak PO" (dengan alasan)

#### 26. Admin Handle Komplain (`/admin/komplain`)
- List komplain (filter: DIAJUKAN, DIPROSES, SELESAI)
- Klik → detail: item komplain, alasan, bukti foto, deskripsi
- Form tindak lanjut: pilih solusi (Kirim Ulang, Refund Sebagian, Refund Penuh, Tolak), catatan
- Log history tindak lanjut (timeline)

#### 27. Admin Manajemen Kurs (`/admin/kurs`)
- Display kurs aktif (besar, ochre)
- Form input kurs baru (append-only, tidak edit old)
- History table: tanggal, nilai kurs

#### 28. Admin Log Aktivitas (`/admin/log-aktivitas`)
- Table: waktu, admin, aksi, entitas, keterangan
- Filter by admin, aksi type
- Pagination

---

## KOMPONEN REUSABLE (DESAIN SEKALI, PAKAI Banyak)

### Navigation Bar (Customer)
- Height: 64px, bg `#FFFFFF` atau `#F7F3EC`, border-bottom 1px `#E0D9CC`
- Logo kiri (Fraunces, maroon), menu tengah, ikon kanan (keranjang + avatar/login)
- Mobile: hamburger menu kiri, logo tengah, ikon kanan

### Card Produk
- Border 1px `#E0D9CC`, radius 12px (regular) atau 20px (unggulan)
- Gambar: aspect ratio 1:1, object-cover, border-radius top only
- Body: padding 16px, nama (Fraunces 18-20px), harga (Work Sans 600, ochre), badge top-left
- Hover: shadow halus, no scale transform

### Badge Status Pesanan
- 6 status dengan warna berbeda:
  - MENUNGGU_PEMBAYARAN: ochre bg `#B8863B` text white
  - DIPROSES_ADMIN: maroon bg `#4a2318` text white
  - DIKONSOLIDASI_KIRIM: blue-muted (custom, tetap hangat)
  - TIBA_KIRIM_LOKAL: green-muted `#6B8E4E` text white
  - SELESAI: green `#6B8E4E` bg
  - DIBATALKAN: red-muted `#A04545` text white
- Radius 6px, padding 4px 12px, font Work Sans 500, size 12px

### Tombol
- Primer: bg maroon `#4a2318`, text white, radius 8px, padding 12px 24px
- Sekunder: bg transparent, border 1px maroon, text maroon
- Ghost: text maroon, no border, hover bg maroon 10% opacity
- Disabled: opacity 50%, cursor not-allowed
- TIDAK ADA tombol diakhiri "→"

### Input Field
- Border 1px `#E0D9CC`, radius 8px, padding 12px 16px
- Focus: border maroon `#4a2318`, ring 2px maroon 20% opacity
- Label: Work Sans 500, 14px, color `#2A211D`
- Error: border red `#A04545`, text error `#A04545` 12px

### Status Pipeline Visual (Detail Pesanan)
- Horizontal timeline: 5 node (status), connect with line
- Node aktif: filled maroon, node selesai: filled ochre, node mendatang: outline
- Label di bawah node: Work Sans 12px
- Mobile: vertical timeline

---

## MOBILE RESPONSIVE

- Breakpoint: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Navigation: hamburger di mobile
- Grid produk: 1 kolom mobile, 2-3 kolom tablet, 3-4 kolom desktop
- Checkout: stack vertical di mobile (1 step per screen)
- Admin tables: horizontal scroll atau card layout di mobile
- Card produk unggulan: tetap 2x tinggi di mobile (full width)

---

## DELIVERABLES

Desain semua 28 halaman di atas. Untuk setiap halaman, berikan:

1. **Wireframe ASCII** (kasar, untuk konfirmasi struktur sebelum visual)
2. **Mockup visual** (high-fidelity, pakai token desain yang dispesifikkan)
3. **Spesifikasi** (spacing, ukuran, state — hover, active, disabled, empty, error)

Urutkan prioritas:
1. Beranda + Card Produk komponen (paling penting, set tone)
2. Katalog + Detail Produk
3. Keranjang + Checkout + Upload Bukti
4. Riwayat + Detail Pesanan
5. Auth pages (login, register, forgot, admin login)
6. Admin Dashboard + Manajemen Produk
7. Admin Pesanan + Verifikasi Pembayaran
8. Admin Custom PO + Komplain + Kurs + Log

---

## CATATAN FINAL

- Ini e-commerce jastip China, BUKAN SaaS landing page
- Customer-facing pages: warm, premium, approachable
- Admin pages: clean, efficient, professional (tetap pakai token warna sama)
- Satu halaman, satu elemen "berani" saja — sisanya tenang
- Border radius bervariasi, shadow seperluanya, border tipis sebagai pemisah
- Fraunces untuk heading besar dan percaya diri, Work Sans untuk UI
- Produk unggulan lebih besar dari regular di grid beranda
- JANGAN buat semua elemen berebut perhatian
