---
title: "Copy & Content Strategy - Jastip China"
tags: [foundation]
tanggal: 2026-09-21
---
# Copy & Content Strategy - Jastip China

Tone of voice, button labels, error messages, empty states, dan semua teks UI.

---

## 1. TONE OF VOICE

### Character
**Hangat, approachable, jujur, tau-medan.**

- Bahasa Indonesia sehari-hari (tidak kaku, tidak formal berlebihan)
- Tidak pakai "Anda" (terlalu formal) → pakai "Kamu" (approachable) atau "Mau" (direct)
- Tidak pakai "Mohon" (terlalu servile) → pakai "Yuk" atau "Silakan"
- Singkat, padat, tidak bertele-tele
- Honest tentang proses (realistis, tidak over-promise)

### Do vs Don't

| ❌ Don't | ✅ Do |
|----------|-------|
| "Mohon maaf, Anda belum login." | "Kamu belum login. Yuk login dulu." |
| "Silakan mengisi nomor WhatsApp Anda." | "Masukin nomor WhatsApp kamu." |
| "Terima kasih telah berbelanja di situs kami." | "Makasih udah belanja di Jastip China!" |
| "Produk ini tidak tersedia." | "Produk ini lagi kosong. Coba cek katalog lain." |
| "Harap tunggu konfirmasi dari admin." | "Lagi nunggu verifikasi admin. Biasanya 1x24 jam." |
| "Pembayaran Anda sedang diproses." | "Bukti transfer kamu lagi dicek admin." |
| "Terjadi kesalahan. Silakan coba lagi." | "Ada yang error. Coba lagi ya, atau hubungi admin via WA." |

---

## 2. BUTTON LABELS

### Pattern: [Verb] + [Object]

| Context | Label | Notes |
|---------|-------|-------|
| Add to cart | "Tambah ke Keranjang" | Not "Add to Cart", not "→" |
| Buy now | "Beli Langsung" | Skip cart, go to checkout |
| Checkout | "Checkout" | Or "Lanjut ke Checkout" |
| Pay | "Bayar Sekarang" | |
| Upload proof | "Upload Bukti" | Not "Kirim Bukti" (upload is clearer) |
| Verify (admin) | "Verifikasi" | |
| Reject (admin) | "Tolak" | |
| Approve (admin) | "Setujui" | |
| Save | "Simpan" | |
| Cancel | "Batal" | |
| Delete | "Hapus" | |
| Edit | "Edit" | |
| Submit | "Kirim" | Or "Kirim Permintaan" (PO) |
| Login | "Login" | Not "Masuk" (login is more common in ID e-commerce) |
| Register | "Daftar" | Not "Register" |
| Logout | "Keluar" | |
| Search | "Cari" | |
| Filter | "Filter" | |
| Reset filter | "Reset" | |
| Load more | "Muat Lainnya" | Or "Lihat Lebih Banyak" |
| View detail | "Lihat Detail" | Not "Selengkapnya →" |
| Back | "Kembali" | |

### ANTI-PATTERN

- ❌ "Tambah ke Keranjang →" (no arrow)
- ❌ "BUY NOW" (no all-caps)
- ❌ "Submit Form" (redundant)
- ❌ "Click Here" (non-descriptive)
- ❌ "Proceed to Checkout" (too formal)

---

## 3. ERROR MESSAGES

### Form Validation

| Field | Error Trigger | Message |
|-------|---------------|---------|
| noWa | Empty | "Nomor WhatsApp wajib diisi" |
| noWa | Invalid format | "Format nomor salah. Contoh: 08123456789" |
| email | Invalid format | "Emailnya belum bener. Cek lagi ya." |
| password | Too short | "Password minimal 6 karakter" |
| confirmPassword | Mismatch | "Passwordnya nggak cocok. Coba ketik ulang." |
| alamat | Empty | "Alamat pengiriman wajib diisi" |
| qty | Exceeds stock | "Stok cuma tersisa {jumlah} biji" |
| file | Wrong type | "Cuma bisa upload gambar (JPG, PNG) atau PDF" |
| file | Too large | "Ukuran file kebanyakan. Maksimal 5MB." |
| required | Empty (generic) | "Ini wajib diisi" |

### API Errors

| Status | Message (to user) |
|--------|---------------------|
| 401 Unauthorized | "Kamu belum login. Yuk login dulu." |
| 403 Forbidden | "Kamu nggak ada akses ke halaman ini." |
| 404 Not Found | "Halaman/data nggak ketemu. Mungkin udah dihapus." |
| 409 Conflict | "Data udah ada/konflik. Coba refresh halaman." |
| 429 Too Many Requests | "Kecepatan ngetik/aksi terlalu cepat. Tunggu sebentar ya." |
| 500 Server Error | "Server lagi bermasalah. Coba lagi sebentar, atau hubungi admin via WA." |
| Network error | "Koneksi internet bermasalah. Cek sinyal/WiFi kamu." |

### Empty States

| Context | Title | Description | CTA |
|---------|-------|-------------|-----|
| Cart empty | "Keranjang masih kosong" | "Yuk lihat katalog, siapa tau ada yang menarik." | "Lihat Katalog" |
| Order history empty | "Belum ada pesanan" | "Saatnya belanja pertama kamu!" | "Mulai Belanja" |
| Notification empty | "Belum ada notifikasi" | "Notif akan muncul kalau ada update pesanan." | (none) |
| Search no result | "Nggak ketemu produknya" | "Coba kata kunci lain, atau cek kategori." | "Reset Filter" |
| Product out of stock | "Stok habis" | "Produk ini lagi kosong. Coba lain kali." | "Lihat Produk Lain" |
| Address empty | "Belum ada alamat" | "Tambahin alamat biar bisa checkout." | "Tambah Alamat" |

### Success Messages

| Context | Message |
|---------|---------|
| Login | "Berhasil login! Halo, {nama}" |
| Register | "Akun udah dibuat. Selamat datang!" |
| Add to cart | "{namaProduk} masuk keranjang" |
| Checkout | "Pesanan dibuat! No. Invoice: {invoice}" |
| Upload proof | "Bukti transfer terkirim. Tunggu verifikasi admin ya." |
| Payment verified | "Pembayaran terverifikasi! Pesanan lagi diproses." |
| Order complete | "Pesanan selesai! Makasih udah belanja." |
| Profile update | "Profil berhasil diupdate" |
| Address save | "Alamat disimpan" |
| Logout | "Kamu udah keluar. Sampai jumpa!" |

---

## 4. NAVIGATION LABELS

### Customer

| Label | URL | Notes |
|-------|-----|-------|
| Beranda | / | Not "Home" |
| Katalog | /katalog | Not "Produk" or "Shop" |
| Cara Order | /cara-order | How to buy guide |
| Lacak Pesanan | /pesanan | Order tracking/history |
| Ajukan PO | /permintaan-po | Custom order request |
| Keranjang | /keranjang | |
| Notifikasi | /notifikasi | |
| Profil | /profil | |

### Admin

| Label | URL | Notes |
|-------|-----|-------|
| Dashboard | /admin/dashboard | |
| Produk | /admin/produk | |
| Kategori | /admin/kategori | |
| Pesanan | /admin/pesanan | |
| Verifikasi Pembayaran | /admin/pembayaran | |
| Custom PO | /admin/permintaan-po | |
| Komplain | /admin/komplain | |
| Kurs | /admin/kurs | |
| Log Aktivitas | /admin/log | |

---

## 5. STATUS LABELS

### Pesanan

| Status | Label (UI) | Description |
|--------|------------|-------------|
| MENUNGGU_PEMBAYARAN | "Menunggu Pembayaran" | "Segera upload bukti transfer" |
| DIPROSES_ADMIN | "Diproses Admin" | "Pesanan lagi disiapin" |
| DIKONSOLIDASI_KIRIM | "Dikonsolidasi Kirim" | "Barang dikirim dari China" |
| TIBA_KIRIM_LOKAL | "Tiba di Gudang Lokal" | "Barang udah sampe Indonesia, siap kirim ke kamu" |
| SELESAI | "Selesai" | "Pesanan kelar. Makasih!" |
| DIBATALKAN | "Dibatalkan" | "Pesanan dibatalin" |

### Pembayaran

| Status | Label (UI) |
|--------|------------|
| MENUNGGU_BUKTI | "Menunggu Bukti Transfer" |
| MENUNGGU_VERIFIKASI | "Menunggu Verifikasi Admin" |
| TERVERIFIKASI | "Terverifikasi" |
| DITOLAK | "Ditolak" |
| KADALUARSA | "Kedaluwarsa" |

### Custom PO

| Status | Label (UI) |
|--------|------------|
| MENUNGGU_REVIEW | "Menunggu Review Admin" |
| DIKONFIRMASI_HARGA | "Penawaran Diterima, Menunggu Respon" |
| DITOLAK | "Ditolak" |
| SUDAH_JADI_PESANAN | "Sudah Jadi Pesanan" |

### Komplain

| Status | Label (UI) |
|--------|------------|
| DIAJUKAN | "Diajukan" |
| DIPROSES | "Diproses" |
| SELESAI | "Selesai" |

---

## 6. FORM LABELS & PLACEHOLDERS

### Auth

| Field | Label | Placeholder | Helper Text |
|-------|-------|-------------|-------------|
| nama | "Nama Lengkap" | "Contoh: Budi Santoso" | |
| noWa | "Nomor WhatsApp" | "08123456789" | "Format: 08xxx atau 628xxx" |
| email | "Email" | "budi@example.com" | "Email opsional, buat notifikasi." |
| password | "Password" | "••••••••" | "Minimal 6 karakter" |
| confirmPassword | "Konfirmasi Password" | "••••••••" | "Ketik ulang password" |

### Address

| Field | Label | Placeholder |
|-------|-------|-------------|
| label | "Label Alamat" | "Rumah, Kantor, Kos" |
| penerima | "Nama Penerima" | "Budi Santoso" |
| noTelp | "No. Telp Penerima" | "08123456789" |
| alamatLengkap | "Alamat Lengkap" | "Jl. Merdeka No. 123, RT 01 RW 02" |
| kota | "Kota" | "Bandung" |
| provinsi | "Provinsi" | "Jawa Barat" |
| kodePos | "Kode Pos" | "40123" |

### Product (Admin)

| Field | Label | Placeholder | Helper |
|-------|-------|-------------|--------|
| namaProduk | "Nama Produk" | "Tas Backpack Premium" | |
| deskripsi | "Deskripsi" | "Material kulit sintetis, kapasitas 20L..." | |
| hargaAsalRmb | "Harga Asal (RMB)" | "120" | "Harga beli di China (RMB)" |
| kurs | "Kurs" | (auto-filled) | "Otomatis dari KursMaster aktif" |
| hargaJualIdr | "Harga Jual (IDR)" | (auto-calculated) | "Otomatis = RMB × Kurs. Bisa override." |
| beratGram | "Berat (gram)" | "800" | |
| linkSumber | "Link Sumber" | "https://taobao.com/..." | |
| stok | "Stok" | "15" | |
| status | "Status" | | "AKTIF = tampil di katalog" |

---

## 7. HEADING HIERARCHY

### Page Title (H1)

- Only ONE H1 per page
- Noto Serif SC 700, 48px desktop / 32px mobile
- Example: "Katalog Produk", "Detail Pesanan", "Keranjang Belanja"

### Section Title (H2)

- Noto Serif SC 500, 32px desktop / 24px mobile
- Example: "Produk Terkait", "Ringkasan Pesanan", "Info Pengiriman"

### Card Title (H3)

- Noto Serif SC 500, 24px desktop / 20px mobile
- Example: Product name in card

### ANTI-PATTERN

- ❌ "PRODUK KAMI" (H2) above "Katalog" (H1) — all-caps label
- ❌ Multiple H1 on page
- ❌ Using H3 for non-heading decorative text

---

## 8. META TEXT FORMATTING

### Separators

- Use comma: "Tas, Sepatu, Aksesoris"
- Use space + dash: "15 Jan 2024 - 20 Jan 2024"
- ❌ Do NOT use middle dot: "Tas · Sepatu · Aksesoris"

### Date Format

- Short: "15 Jan 2024"
- Long: "15 Januari 2024"
- With time: "15 Jan 2024, 14:30 WIB"
- Relative: "2 jam lalu", "kemarin", "3 hari lalu" (for notifications)

### Price Format

- Prefix: "Rp" (not "IDR", not "Rp.")
- Separator: dot for thousands
- Example: "Rp 285.000"
- Decimal: usually no decimal for IDR. If needed: "Rp 285.000,50"

### Quantity Format

- "15 pcs", "8 biji", "3 kg"
- Choose one consistently per context. "pcs" for generic, "biji" for casual.

---

## 9. EMAIL / WHATSAPP COPY

### WhatsApp Notification (From System)

```
Halo {nama}!

Pesanan kamu udah update:
- No. Invoice: {noInvoice}
- Status: {statusBaru}

Cek detail di: {APP_URL}/pesanan/{pesananId}

Makasih udah belanja di Jastip China!
```

### Password Reset (WhatsApp)

```
Halo {nama}!

Ini link reset password kamu:
{APP_URL}/reset-password?token={token}

Link ini cuma berlaku 1 jam. Kalau bukan kamu yang minta, abaikan pesan ini.
```

---

## 10. SEO META

### Page Titles

| Page | Title |
|------|-------|
| Beranda | "Jastip China - Barang China, sampai pintu rumah" |
| Katalog | "Katalog Produk | Jastip China" |
| Detail Produk | "{namaProduk} | Jastip China" |
| Cara Order | "Cara Order | Jastip China" |
| Login | "Login | Jastip China" |
| Register | "Daftar Akun | Jastip China" |

### Meta Descriptions

| Page | Description |
|------|-------------|
| Beranda | "Beli produk China berkualitas - tas, sepatu, aksesoris, elektronik. Jastip aman, harga bersahabat, sampai depan pintu." |
| Katalog | "Lengkap produk China siap kirim. Tas branded, sepatu premium, aksesoris murah. Stok terbatas, amankan sekarang." |
| Detail | "Beli {namaProduk} via jastip China. {deskripsiSingkat}. Stok terbatas." |

---

## 11. MICROCOPY (Small Text)

### Helper Text

| Context | Text |
|---------|------|
| Payment expiry | "Selesaikan pembayaran dalam 24 jam. Kalau lewat, pesanan otomatis batal." |
| Bank transfer | "Transfer ke rekening berikut. Jangan lupa upload buktinya." |
| Verification wait | "Bukti lagi dicek admin. Biasanya 1x24 jam." |
| Shipping estimate | "Estimasi sampai 7-14 hari setelah verifikasi" |
| Custom PO | "Tim kami review dulu, kasih estimasi harga dalam 1-2 hari kerja." |
| Stock warning | "Stok terbatas! Sisa {jumlah} biji" |
| Cart count | "{count} item di keranjang" |
| Subtotal | "Subtotal: {count} produk" |

### Tooltip

| Context | Text |
|---------|------|
| Kurs info | "Kurs RMB ke IDR. Otomatis diambil dari KursMaster terbaru." |
| Weight info | "Total berat semua item pesanan. Dipakai buat hitung ongkir." |
| Snapshot price | "Harga sesuai saat checkout. Tidak berubah walau harga produk diupdate." |

---

## COPY CHECKLIST

- [ ] Tone: hangat, approachable, jujur (not formal, not servile)
- [ ] "Kamu" not "Anda"
- [ ] No all-caps labels
- [ ] No arrows (→) in buttons
- [ ] No middle dots (·) in meta
- [ ] Error messages: helpful + actionable
- [ ] Empty states: friendly + CTA
- [ ] Success messages: enthusiastic but not over
- [ ] Date format: "15 Jan 2024"
- [ ] Price format: "Rp 285.000"
- [ ] Status labels: sentence case, not uppercase enum
- [ ] Helper text: explains WHY, not just WHAT
