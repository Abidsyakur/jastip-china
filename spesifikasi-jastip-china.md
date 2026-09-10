# Spesifikasi Website Jastip China — Rangkuman Final

## 1. Ringkasan bisnis

Platform jastip barang China dengan tiga jalur pemasukan barang:
- **Katalog** — produk ready stock yang sudah difoto dan diberi harga tetap.
- **Custom PO** — barang di luar katalog, customer isi form, admin review dan kasih harga sebelum invoice terbit.
- **Pembayaran manual** (MVP) — transfer bank + upload bukti, diverifikasi admin. Tidak pakai payment gateway di fase awal (hemat biaya, tanpa kompleksitas integrasi API); arsitektur tetap kompatibel kalau mau ditambah nanti.

Dua role: **Customer** (browsing, checkout, bayar, ajukan PO/komplain) dan **Admin** (kelola produk, verifikasi pembayaran, review PO, tangani komplain).

---

## 2. Skema database final (20 tabel)

### Akun & keamanan login
- **CUSTOMER** — id, nama, no_wa, email, password_hash, tgl_registrasi
- **ADMIN** — id, nama, no_wa, email, password_hash, role
- **ALAMAT** — id, customer_id (FK), label, penerima, no_telp, alamat_lengkap, kota, kode_pos
- **SESI_LOGIN** — id, customer_id (FK, nullable), admin_id (FK, nullable), refresh_token_hash, device_info, ip_address, dibuat_pada, kedaluwarsa_pada, dicabut
- **RESET_PASSWORD_TOKEN** — id, customer_id (FK, nullable), admin_id (FK, nullable), token_hash, kedaluwarsa_pada, sudah_dipakai
  > Bukan kolom `user_id` + `tipe_user` (relasi polimorfik generik), tapi dua foreign key nullable — cuma salah satu (`customer_id` atau `admin_id`) yang terisi per baris. Pendekatan ini dipilih karena Prisma tidak punya relasi polimorfik native yang tetap menjaga referential integrity ke dua tabel berbeda.
  >
  > Aturan "cuma salah satu terisi" ditegakkan dua lapis, bukan cuma disiplin kode:
  > 1. **CHECK constraint di database** (ditambahkan manual via raw SQL setelah migration awal, karena Prisma schema tidak bisa mendefinisikan ini) — baris yang melanggar (dua-duanya null atau dua-duanya terisi) ditolak Postgres, apa pun yang terjadi di kode aplikasi.
  > 2. **Satu pintu masuk di kode** (`buatSesiCustomer()` / `buatSesiAdmin()`, dst) — tidak ada `prisma.sesiLogin.create()` dipanggil langsung tersebar di banyak tempat, supaya bentuk data selalu benar sejak awal, bukan mengandalkan constraint sebagai satu-satunya penjaga.
  >
  > Kalau nanti ada role ketiga (mis. reseller/mitra), kolom FK nullable baru + constraint yang diperbarui adalah cara paling langsung untuk extend pendekatan ini.

### Katalog produk
- **KATEGORI** — id, nama_kategori
- **PRODUK** — id, kategori_id (FK), admin_id (FK), nama_produk, deskripsi, harga_asal_rmb, kurs, harga_jual_idr, berat_gram, link_sumber, stok, status
- **PRODUK_GAMBAR** — id, produk_id (FK), url_gambar, urutan
- **PRODUK_VARIAN** — id, produk_id (FK), nama_varian (teks kombinasi lengkap, mis. "Medium - Premium suede"), stok, harga_tambahan
  > Keputusan: pendekatan simpel (1 baris = 1 kombinasi lengkap), bukan model atribut-nilai terpisah. Tampilan di frontend juga flat (satu baris chip varian), sesuai apa yang tersimpan di database.

### Request custom (di luar katalog)
- **PERMINTAAN_PO** — id, customer_id (FK), admin_id_reviewer (FK), link_produk_referensi, deskripsi_spesifikasi, foto_referensi_url, jumlah_diminta, status (menunggu_review / dikonfirmasi_harga / ditolak / sudah_jadi_pesanan), estimasi_harga, estimasi_ongkir, catatan_admin, tgl_submit, tgl_respon
  > Begitu disetujui, otomatis dikonversi jadi PESANAN baru — tidak lewat keranjang.

### Keranjang
- **KERANJANG** — id, customer_id (FK)
- **KERANJANG_ITEM** — id, keranjang_id (FK), produk_id (FK), jumlah
  > Hanya untuk barang katalog. Barang custom PO tidak masuk keranjang.

### Transaksi
- **PESANAN** — id, customer_id (FK), alamat_id (FK), no_invoice, status_pesanan (menunggu_pembayaran / diproses_admin / dikonsolidasi_kirim / tiba_kirim_lokal / selesai / dibatalkan), preferensi_kurir, subtotal_produk, biaya_jasa_titip, ongkir_china_ke_gudang, ongkir_domestik, biaya_admin_payment, total_akhir, tgl_pesan
- **PESANAN_ITEM** — id, pesanan_id (FK), sumber_item (katalog / custom_po), produk_id (FK, nullable), permintaan_po_id (FK, nullable), nama_item_snapshot, harga_satuan_saat_beli, jumlah
  > Harga & sumber disalin (snapshot) saat checkout — riwayat invoice tidak berubah walau harga produk asli berubah nanti.
- **PEMBAYARAN** — id, pesanan_id (FK), metode, status (menunggu_verifikasi / terverifikasi / ditolak / kadaluarsa), jumlah_bayar, bukti_url, verified_by_admin_id (FK), catatan_admin, tgl_bayar, tgl_verifikasi, kedaluwarsa_pada
  > **Relasi ke PESANAN: satu-ke-banyak.** Satu pesanan bisa punya beberapa percobaan pembayaran (kalau yang sebelumnya kadaluarsa, customer bisa retry tanpa batas — bikin pesanan baru tidak perlu). Stok cuma ditahan selama jendela satu percobaan aktif, bukan sepanjang umur pesanan.
- **PENGIRIMAN** — id, pesanan_id (FK), kurir (realisasi aktual, bisa beda dari preferensi_kurir), no_resi, status_kirim, estimasi_tiba

### Dukungan & audit
- **KOMPLAIN** — id, pesanan_item_id (FK), alasan (ENUM: barang_rusak / tidak_sesuai_deskripsi / salah_kirim / lainnya), bukti_foto (wajib), status (diajukan / diproses / selesai), solusi
- **KOMPLAIN_LOG** — id, komplain_id (FK), admin_id (FK), catatan, waktu
  > Riwayat tindak lanjut bertahap per komplain, terpisah dari solusi akhir di tabel KOMPLAIN.
- **NOTIFIKASI** — id, customer_id (FK), pesanan_id (FK, nullable), pesan, tipe, status_baca, tgl_kirim
- **LOG_AKTIVITAS** — id, admin_id (FK), aksi, entitas_terkait, keterangan, waktu
  > Wajib tercatat tiap kali admin verifikasi/tolak pembayaran, review PO, atau ubah data produk.

---

## 3. Keputusan bisnis & teknis kunci

| Area | Keputusan | Alasan singkat |
|---|---|---|
| Pembayaran | Manual (transfer + bukti), bukan payment gateway | MVP lebih cepat dibangun, tanpa fee transaksi & integrasi API |
| Verifikasi | Admin cek manual, wajib isi catatan kalau tolak | Jejak audit jelas via LOG_AKTIVITAS |
| Percobaan bayar | Bisa retry tanpa batas per pesanan | Customer tidak perlu bikin pesanan baru kalau cuma telat transfer |
| Stok | Ditahan cuma selama 1 percobaan pembayaran aktif | Retry tanpa batas tidak mengunci stok selamanya |
| Custom PO | Invoice terpisah dari katalog, skip keranjang | Timeline pengiriman beda jauh, hindari kebingungan |
| Varian produk | Flat (1 kombinasi = 1 baris), bukan atribut terpisah | Lebih simpel dibangun & ditampilkan untuk skala awal |
| Login | Access token (pendek) + refresh token (panjang, tersimpan di DB) | Balance keamanan vs kenyamanan, bisa dicabut paksa |
| Harga & kurs | Snapshot per transaksi, bukan referensi live | Riwayat invoice tidak berubah walau harga produk terbaru berbeda |

---

## 4. Halaman yang sudah didesain

**Customer:** Beranda (katalog + filter kategori), Detail produk (varian, galeri, produk lain), Keranjang (pilih sebagian, ringkasan biaya), Checkout (alamat, kurir, rincian biaya), Pembayaran manual (upload bukti, countdown, retry saat kadaluarsa), Form pengajuan PO custom, Tentang kami, Cara order, Riwayat (tab Pesanan & tab Pengajuan PO), Lacak status (linimasa), Detail pesanan, Ajukan komplain.

**Admin:** Dashboard beranda (statistik + pesanan perlu perhatian), Produk (list + form tambah/edit dengan varian), Permintaan PO (list + panel review/lihat), Pembayaran (list + panel periksa/verifikasi), Komplain (list + panel tindak lanjut/lanjutkan/lihat).

---

## 5. Saran urutan development (prioritas MVP)

1. **Fondasi**: skema database lengkap, autentikasi (login, register, refresh token, reset password)
2. **Katalog**: CRUD produk admin → beranda & detail produk customer
3. **Transaksi inti**: keranjang → checkout → pembayaran manual → verifikasi admin
4. **Status & notifikasi**: pipeline status pesanan, riwayat, lacak status, notifikasi otomatis
5. **Custom PO**: form pengajuan → review admin → konversi ke pesanan
6. **Dukungan**: komplain (customer & admin), log aktivitas
7. **Optimisasi lanjutan** (setelah fitur inti stabil): kurs terpusat, payment gateway, kupon/wishlist/rating

Dokumen ini bisa jadi acuan brief untuk developer atau tim yang akan membangun sistemnya.
