# Jastip China — Backend & API

Implementasi teknis dari spesifikasi bisnis di `spesifikasi-jastip-china.md`.

## Tech stack

- **Next.js** (React + TypeScript) — frontend & backend jadi satu (monolith)
- **PostgreSQL** + **Prisma ORM** — lihat `../schema.prisma`
- **Cloudflare R2** — storage foto produk, bukti transfer, foto komplain
- **Fonnte** — kirim notifikasi WhatsApp
- **Upstash Redis** — rate limiting login
- Autentikasi custom: access token (JWT, 15 menit) + refresh token (random, 30 hari, disimpan ter-hash di DB)

## Setup awal

```bash
npm install
cp .env.example .env   # isi semua environment variable
npx prisma migrate dev --name init
npx prisma db seed     # isi kategori awal + akun admin pertama
npm run dev
```

Setelah seed, login admin pertama pakai kredensial yang muncul di console — **ganti passwordnya segera**.

## Git workflow

Solo development, belum live — jadi sengaja disederhanakan, bukan model `main` + `dev` permanen:

- **`main`** — satu-satunya branch panjang. Harus selalu dalam kondisi bisa di-*build* (`npm run typecheck` lolos) di setiap commit.
- **Branch pendek per modul**, mengikuti urutan di `spesifikasi-jastip-china.md` § 5: `feat/auth`, `feat/produk`, `feat/keranjang`, `feat/pesanan-pembayaran`, `feat/permintaan-po`, `feat/komplain`, dst.
  ```bash
  git checkout -b feat/auth
  # ...kerjakan modul, commit sesering perlu...
  npm run typecheck && npm run build   # pastikan hijau sebelum merge
  git checkout main
  git merge feat/auth
  git branch -d feat/auth
  ```
- Jangan commit langsung ke `main` walau solo — tetap lewat branch per modul, supaya riwayat per-fitur jelas dan gampang di-`revert` satu modul penuh kalau ternyata bermasalah tanpa mengganggu modul lain.
- Commit message pakai awalan modul, mis. `auth: tambah endpoint refresh token`, `produk: validasi varian saat create`.

**Kapan pola ini perlu berubah** (dicatat di sini supaya tidak lupa nanti):
- Begitu ada developer kedua → pertimbangkan PR review sebelum merge ke `main`, walau tanpa branch `dev` permanen (Vercel preview deployment per branch/PR sudah cukup jadi environment uji).
- Begitu project live dengan user asli → pastikan preview deployment pakai `DATABASE_URL` staging yang terpisah dari production, supaya testing modul baru tidak pernah menyentuh data customer asli. Baru kalau butuh staging environment yang persisten (bukan cuma preview sementara, mis. untuk demo ke mitra) → baru masuk akal tambah branch `staging`/`dev` yang di-deploy terus-menerus.

## Struktur folder

```
src/
├── app/api/
│   ├── auth/              # register, login, admin-login, refresh, logout
│   ├── produk/             # katalog (list + detail, publik)
│   ├── kategori/           # daftar kategori (publik)
│   ├── keranjang/          # kelola isi keranjang
│   ├── alamat/             # kelola alamat pengiriman customer
│   ├── pesanan/            # checkout, riwayat, detail, lacak status
│   ├── pembayaran/         # upload bukti, bayar ulang
│   ├── permintaan-po/      # ajukan PO, setujui/tolak penawaran
│   ├── komplain/           # ajukan komplain
│   ├── notifikasi/         # daftar & tandai dibaca
│   ├── upload/             # presigned URL untuk upload file ke R2
│   ├── admin/              # semua endpoint khusus admin
│   └── cron/               # cek-kedaluwarsa (dijadwalkan via vercel.json)
├── lib/                    # helper: auth, db, notifikasi, storage, dll
└── middleware.ts           # proteksi halaman /admin dan halaman customer tertentu
```

## Status pengerjaan

✅ Selesai (semua modul inti sesuai urutan prioritas di spesifikasi § 5): skema database, auth (customer + admin, RBAC OWNER/STAFF), rate limiting login, katalog produk + kategori + **kurs terpusat (`KursMaster`)**, keranjang, alamat, pesanan + pembayaran manual lengkap (checkout dengan tarif otomatis, upload bukti, retry, verifikasi admin, cron kedaluwarsa), pipeline status pesanan + biaya + pengiriman (admin), custom PO (ajukan → review admin → konversi otomatis jadi Pesanan), upload file (presigned URL R2), notifikasi (list + tandai dibaca), komplain (ajukan customer + tindak lanjut admin), statistik dashboard admin.

⏳ Belum dikerjakan (sesuai catatan asli di spesifikasi, tidak menghalangi jalan):
- Testing otomatis untuk lingkungan dengan Postgres/Redis asli (yang ada sekarang: unit + integration test dengan mock, tanpa DB asli — lihat catatan testing di tiap bagian modul)
- CI/CD
- Page-view tracking untuk statistik "viewer"
- Kalkulator tarif ongkir China→gudang otomatis (saat ini masih diisi manual admin lewat `PATCH /api/admin/pesanan/[id]/biaya`; `biayaJasaTitip` & `ongkirDomestik` sudah otomatis sejak `lib/tarif.ts`, kurs sekarang terpusat lewat `KursMaster`)

⏳ Belum dikerjakan (tidak menghalangi jalan, bisa menyusul):
- Validasi terstruktur pakai Zod (saat ini validasi manual per endpoint)
- Testing (unit/integration)
- CI/CD
- Page-view tracking untuk statistik "viewer" di dashboard admin
- Optimisasi kurs terpusat (saat ini kurs masih per-produk, sesuai kesepakatan awal)

## Modul: Auth

Endpoint yang sudah jadi (`src/app/api/auth/`):

| Endpoint | Body | Catatan |
|---|---|---|
| `POST /api/auth/register` | `nama, noWa, email?, password` | Customer only |
| `POST /api/auth/login` | `noWa\|email, password` | Customer, rate-limited |
| `POST /api/auth/admin-login` | `email, password` | Admin, rate-limited |
| `POST /api/auth/refresh` | *(tanpa body, refresh token dari cookie)* | Rotasi refresh token |
| `POST /api/auth/logout` | *(tanpa body)* | Cabut sesi aktif |
| `POST /api/auth/forgot-password` | `noWa` | Kirim token via WA (Fonnte) |
| `POST /api/auth/reset-password` | `token, passwordBaru` | Cabut semua sesi lama setelah berhasil |

**Alur token**: access token (JWT, 15 menit) + refresh token (opaque random, 30 hari) — dua-duanya di cookie `httpOnly`. Refresh token di-*rotate* tiap kali `/api/auth/refresh` dipanggil (baris `SesiLogin` yang sama, token lama diganti), bukan bikin baris baru. `src/middleware.ts` memproteksi `/admin/*` dengan verifikasi JWT di Edge runtime.

**Setelah `prisma migrate dev --name init`**, jalankan juga `prisma/manual-constraints.sql` (lihat instruksi di dalam file itu) untuk memasang CHECK constraint dua-FK-nullable di `sesi_login` & `reset_password_tokens`.

**Cara uji manual** (setelah `npm run dev`):

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nama":"Budi","noWa":"081234567890","password":"passwordkuat123"}'

# Login — simpan cookie ke file supaya bisa dipakai request berikutnya
curl -X POST http://localhost:3000/api/auth/login -c cookies.txt \
  -H "Content-Type: application/json" \
  -d '{"noWa":"081234567890","password":"passwordkuat123"}'

# Refresh pakai cookie yang tersimpan
curl -X POST http://localhost:3000/api/auth/refresh -b cookies.txt -c cookies.txt

# Logout
curl -X POST http://localhost:3000/api/auth/logout -b cookies.txt
```

**Unit test** (`npm run test`) mencakup bagian yang tidak butuh DB/Redis: hashing password, sign/verify JWT (termasuk token dirusak & secret salah), normalisasi nomor WA, dan hashing refresh/reset token. Bagian yang butuh DB (register/login/dst.) perlu diuji manual seperti di atas karena butuh Postgres & Upstash Redis asli.



## Modul: Katalog Produk

Endpoint yang sudah jadi:

| Endpoint | Auth | Catatan |
|---|---|---|
| `GET /api/kategori` | Publik | Daftar semua kategori |
| `POST /api/admin/kategori` | Admin (OWNER/STAFF) | Buat kategori |
| `PATCH /api/admin/kategori/[id]` | Admin (OWNER/STAFF) | Update kategori |
| `DELETE /api/admin/kategori/[id]` | Admin (OWNER/STAFF) | 409 kalau masih dipakai produk (FK constraint) |
| `GET /api/produk` | Publik | Cuma status AKTIF, filter kategori/cari/sort, pagination |
| `GET /api/produk/[id]` | Publik | 404 kalau NONAKTIF atau tidak ada (tidak beda respons) |
| `POST /api/admin/produk` | Admin (OWNER/STAFF) | Create + gambar + varian (nested), 1 transaksi + LogAktivitas |
| `GET /api/admin/produk` | Admin (OWNER/STAFF) | Semua status, filter tambahan `status` |
| `GET /api/admin/produk/[id]` | Admin (OWNER/STAFF) | Untuk form edit |
| `PATCH /api/admin/produk/[id]` | Admin (OWNER/STAFF) | Lihat catatan varian di bawah |
| `DELETE /api/admin/produk/[id]` | Admin (OWNER/STAFF) | **Soft delete** — set status NONAKTIF, bukan hapus row |

**Keputusan desain penting:**
- Hapus produk = soft delete (status → NONAKTIF). Data & riwayat pesanan tetap ada; hard delete juga akan ditolak Postgres lewat FK constraint begitu produk pernah dipesan.
- **PATCH produk dengan `gambarUrls`/`varian`** = REPLACE total daftar lama, bukan patch per-item. Trade-off yang diterima: kalau ada `KeranjangItem` yang refer salah satu varian lama, `produkVarianId`-nya otomatis jadi `NULL` (`onDelete: SetNull` di schema) — customer perlu pilih ulang variannya, tapi tidak error.
- Ditambahkan `dibuatPada`/`diperbaruiPada` ke `Produk` (migration baru) — dibutuhkan supaya sort "terbaru" akurat, sebelumnya schema tidak punya timestamp sama sekali di tabel ini.
- Kategori tidak bisa dihapus kalau masih dipakai produk (409, bukan 500) — FK constraint Postgres ditangkap dan diberi pesan yang jelas ke admin.

**Testing**: 21 unit/integration test — pakai `mock.module()` (Node 22, `--experimental-test-module-mocks`) untuk mock `@/lib/db` dan `@prisma/client`. Pola mock yang dipakai didokumentasikan di `src/test-utils/mock-prisma-client.ts` — **penting dibaca sebelum nulis test baru** untuk modul lain, ada jebakan soal caching modul ES yang sempat bikin test false-negative.

## Modul: Keranjang

Endpoint yang sudah jadi (semua butuh login **customer**, admin ditolak 403):

| Endpoint | Catatan |
|---|---|
| `GET /api/keranjang` | Isi keranjang + `hargaSatuan`/`subtotal`/`total` dihitung on-the-fly dari harga produk TERKINI (bukan snapshot — snapshot beneran baru terjadi saat checkout) |
| `POST /api/keranjang` | Tambah item. Kombinasi produk+varian yang sama digabung jumlahnya (bukan baris duplikat) |
| `PATCH /api/keranjang/[itemId]` | Ubah jumlah |
| `DELETE /api/keranjang/[itemId]` | Hapus item |

**Keputusan desain penting:**
- `Keranjang` di-*lazy-create* (`lib/keranjang.ts` § `getOrBuatKeranjang`) saat pertama kali diakses, bukan saat register — modul auth yang sudah jadi tidak perlu diubah. Race kecil (dua request nyaris bersamaan) ditangani lewat catch `P2002` pada unique constraint `customerId`.
- **Cek kepemilikan item** di PATCH/DELETE: item yang bukan milik customer yang login dapat respons 404 yang **sama persis** dengan item yang benar-benar tidak ada — supaya endpoint ini tidak bisa dipakai menebak-nebak ID item milik customer lain.
- **Cek stok di keranjang itu soft-check**, bukan reservasi atomik seperti di checkout nanti — cukup untuk UX ("stok tidak cukup") karena belum ada komitmen uang di tahap keranjang. Reservasi stok sungguhan (dengan guard atomik `UPDATE ... WHERE stok >= X`, sesuai pembahasan arsitektur) baru terjadi di modul pesanan/pembayaran.
- Produk yang punya varian **wajib** pilih salah satu varian saat ditambah ke keranjang (tidak bisa polos tanpa varian) — konsisten dengan keputusan "ProdukVarian.stok jadi sumber kebenaran kalau ada varian".

**Testing**: 13 test baru (34 total) — termasuk test khusus untuk kalkulasi harga (produk + varian) dan ownership check di PATCH/DELETE.

## Modul: Alamat

Endpoint yang sudah jadi (semua butuh login **customer**):

| Endpoint | Catatan |
|---|---|
| `GET /api/alamat` | List alamat milik customer yang login |
| `POST /api/alamat` | Tambah alamat baru |
| `PATCH /api/alamat/[id]` | Update (ownership check) |
| `DELETE /api/alamat/[id]` | Hapus (ownership check + 409 kalau sudah dipakai pesanan) |

**Keputusan desain penting:**
- `customerId` **selalu** diambil dari token (`user.sub`), bukan dari body request, walau client kirim field itu — dites eksplisit (`POST /api/alamat dengan data valid berhasil, customerId diambil dari token bukan dari body`) supaya tidak ada yang bisa bikin alamat atas nama customer lain.
- `Alamat.id` direferensikan `Pesanan.alamatId` (wajib, tanpa `onDelete`, default RESTRICT) — alamat yang sudah pernah dipakai checkout **tidak bisa dihapus** (409 dengan pesan jelas, bukan 500), supaya riwayat pesanan lama tetap utuh. Tidak perlu soft-delete karena Postgres sudah melindungi ini secara alami.
- Ownership check di PATCH/DELETE pakai pola yang sama seperti keranjang: 404 seragam untuk "tidak ada" maupun "bukan milik kamu".

**Testing**: 8 test baru (42 total). Sekalian menambah `Prisma.PrismaClientKnownRequestError` ke `src/test-utils/mock-prisma-client.ts` — dipakai buat test endpoint mana pun yang menangkap error FK constraint (P2003) atau not-found (P2025) dari Prisma.

## Modul: Pesanan & Pembayaran

> Modul paling kompleks di project ini — implementasi langsung dari semua yang dibahas di tahap arsitektur (guard stok atomik, snapshot harga, race cron-vs-admin).

### Bagian 1 — Checkout

| Endpoint | Auth | Catatan |
|---|---|---|
| `POST /api/pesanan` | Customer | Checkout — lihat detail alur di bawah |
| `GET /api/pesanan` | Customer | Riwayat pesanan milik sendiri |
| `GET /api/pesanan/[id]` | Customer | Detail 1 pesanan (ownership check) |

**Alur checkout (`lib/pesanan.ts` § `prosesCheckout`):**
1. Validasi `alamatId` milik customer yang checkout.
2. Ambil `KeranjangItem` sesuai `keranjangItemIds` — jumlah hasil query harus PERSIS sama dengan yang diminta, kalau kurang berarti ada item yang tidak ada/bukan milik customer ini (404 generik, tidak dibedakan alasannya).
3. Tolak (409) kalau ada produk yang sudah NONAKTIF sejak ditambah ke keranjang.
4. **Dalam satu `$transaction`**: untuk tiap item — hitung harga snapshot, jalankan guard stok atomik (`lib/stok.ts` § `kurangiStokAtomik`, pola `UPDATE ... WHERE stok >= jumlah`), kalau stok kurang di item MANA PUN → seluruh transaksi batal (tidak ada checkout "separuh berhasil"). Baru setelah semua item lolos: buat `Pesanan` + `PesananItem` (snapshot) + `PesananStatusLog` (`MENUNGGU_PEMBAYARAN`) + `Pembayaran` pertama (`MENUNGGU_BUKTI`), lalu hapus item yang barusan checkout dari `KeranjangItem`.
5. `noInvoice` di-retry maksimal 3x kalau kebetulan tabrakan (sangat jarang, `@unique` di schema sebagai jaring pengaman akhir).

`biayaJasaTitip` dan `ongkirDomestik` dihitung **OTOMATIS & FINAL saat checkout** (`lib/tarif.ts`) — customer tidak perlu menunggu admin untuk dua komponen ini. `ongkirChinaGudang` tetap **0 saat checkout** — belum ada kalkulatornya (perlu kuotasi forwarder asli), diisi manual admin lewat `PATCH /api/admin/pesanan/[id]/biaya`.

### Bagian 1b — Tarif Checkout (`lib/tarif.ts`)

Dua fungsi murni (tidak ada panggilan jaringan sama sekali), dipanggil langsung di dalam `prosesCheckout`:

- **`hitungBiayaJasaTitip(subtotalProduk)`** — 35% dari subtotal, lantai minimum Rp15.000 (barang murah tetap sepadan menutup effort admin).
- **`hitungOngkirDomestik(provinsi, kurir, beratTotalKg)`** — berbasis zona provinsi (3 zona: Jawa / Sumatera-Bali-Kalimantan-Sulawesi / Indonesia Timur), pola tarif ekspedisi asli (kg pertama + kg berikutnya, bukan flat linear per kg). Kurir dibatasi `'jnt' | 'shopee_express'` — `checkoutSchema.preferensiKurir` diperketat jadi enum yang sama (sebelumnya bebas teks).

**Keputusan desain penting:**
- **`Alamat.provinsi` nullable di DB, wajib di Zod** untuk alamat baru (pola sama seperti `Admin.email`) — alamat lama dari sebelum field ini ada tidak langsung invalid, tapi **checkout akan menolak** (400, pesan jelas) kalau `provinsi` masih kosong, karena `hitungOngkirDomestik` butuh itu. Customer perlu update alamatnya dulu.
- **Provinsi tidak dikenali jatuh ke zona TERMAHAL** (Indonesia Timur) sebagai default — sengaja dipilih supaya risiko finansial (kalau ada input tidak terduga) jatuh ke pihak platform yang rugi tipis, bukan ke arah yang bisa dieksploitasi customer untuk ongkir murah.
- **`DAFTAR_PROVINSI` di `alamatSchema` diambil langsung dari kunci `PROVINSI_KE_ZONA`** (bukan didaftar ulang manual) — satu sumber kebenaran, tidak bisa telat sinkron antara validasi & kalkulator tarif.
- **Berat total** dihitung dari `Produk.beratGram × jumlah` per item, dijumlah semua item di keranjang yang di-checkout, dikonversi ke kg sebelum dilempar ke `hitungOngkirDomestik`.

**Testing**: 8 test baru untuk `lib/tarif.ts` (pure function, tidak perlu mock apa pun) — mencakup kasus minimum jasa titip, semua kombinasi 3 zona × 2 kurir, pembulatan berat ke kg penuh, dan fallback provinsi tidak dikenali.

### Bagian 2 — Pembayaran (retry, verifikasi, kedaluwarsa)

| Endpoint | Auth | Catatan |
|---|---|---|
| `POST /api/pesanan/[id]/pembayaran` | Customer | Retry — bikin percobaan bayar BARU (bukan update yang lama) |
| `PATCH /api/pesanan/[id]/pembayaran/bukti` | Customer | Upload bukti transfer untuk percobaan TERAKHIR |
| `POST /api/pesanan/[id]/batal` | Customer | Batalkan pesanan sendiri — cuma saat `MENUNGGU_PEMBAYARAN`, guard atomik, stok dikembalikan, bayar aktif ikut `KADALUARSA` |
| `GET /api/pesanan/[id]/invoice` | Customer | Unduh invoice PDF (ownership check), termasuk daftar rekening aktif |
| `GET /api/admin/pembayaran` | Admin | List untuk panel admin, default filter `MENUNGGU_VERIFIKASI` |
| `PATCH /api/admin/pembayaran/[id]/verifikasi` | Admin (OWNER/STAFF) | Terima/tolak |
| `GET /api/cron/cek-kedaluwarsa` | `Authorization: Bearer $CRON_SECRET` | Dijadwalkan `vercel.json`, tiap 15 menit |

**Keputusan & mekanisme kunci (`lib/pembayaran.ts`):**
- **Retry** (`buatPercobaanBayarBaru`) cuma boleh jalan kalau `Pesanan.statusPesanan` masih `MENUNGGU_PEMBAYARAN` DAN tidak ada percobaan bayar lain yang masih aktif (`MENUNGGU_BUKTI`/`MENUNGGU_VERIFIKASI`/`TERVERIFIKASI`). Stok di-guard atomik ULANG (`kurangiStokAtomik`) — **retry BISA gagal** kalau stok sudah diambil orang lain selama jendela kosong antara expired dan retry. Ini bukan bug, memang skenario yang diantisipasi sejak tahap arsitektur.
- **`jumlahBayar` SELALU dari `pesanan.totalAkhir`**, tidak pernah dari body request — field itu sengaja dihapus dari skema Zod `buatPembayaranSchema` supaya tidak ada cara client mengirimnya sama sekali (dites eksplisit).
- **Upload bukti & verifikasi admin** dua-duanya pakai guard atomik `WHERE status = <status lama>` (bukan baca-lalu-tulis) — persis pola yang dibahas di arsitektur untuk cegah race.
- **Verifikasi DITOLAK** → stok dikembalikan (`kembalikanStok`), status `Pesanan` TIDAK berubah (masih `MENUNGGU_PEMBAYARAN`, customer boleh retry). **Verifikasi TERVERIFIKASI** → `Pesanan` pindah ke `DIPROSES_ADMIN` + `PesananStatusLog` baru, stok TIDAK disentuh (sudah benar sejak checkout). Dua-duanya tercatat di `LogAktivitas`.
- **Cron** (`prosesKedaluwarsaPembayaran`) memproses tiap kandidat dalam transaksi TERPISAH per baris, guard atomik `WHERE status = <status saat difetch>` — kalau admin sempat verifikasi tepat di detik yang sama, cron "kalah" untuk baris itu dan di-skip (tidak dobel proses). Sengaja per-baris (bukan satu `UPDATE ... RETURNING` batch) demi portabilitas kode Prisma biasa, bukan raw SQL — cukup untuk skala cron 15 menitan, bisa dioptimasi nanti kalau volume jadi masalah.
- Cron **bukan** endpoint customer/admin — auth-nya `CRON_SECRET` di header `Authorization`, dicocokkan Vercel otomatis sesuai `vercel.json`.

**Refactor kecil**: `AppError` (di `lib/http-error.ts`) jadi base class generik untuk `CheckoutError`/`PembayaranError` — route handler cukup satu `tanganiAppError()`, tidak perlu daftar `instanceof` yang tambah panjang tiap modul baru.

**Testing**: 29 test baru (71 total) — termasuk simulasi race cron-vs-admin yang eksplisit (satu kandidat "menang", satu "kalah", stok cuma dikembalikan untuk yang menang).

## Modul: Custom PO

| Endpoint | Auth | Catatan |
|---|---|---|
| `POST /api/permintaan-po` | Customer | Ajukan barang custom di luar katalog |
| `GET /api/permintaan-po` | Customer | Riwayat pengajuan sendiri |
| `GET /api/permintaan-po/[id]` | Customer | Detail (ownership check) |
| `PATCH /api/permintaan-po/[id]/respon` | Customer | Setuju/tolak penawaran harga admin |
| `GET /api/admin/permintaan-po` | Admin | List, default filter `MENUNGGU_REVIEW` |
| `PATCH /api/admin/permintaan-po/[id]/review` | Admin (OWNER/STAFF) | Kasih harga atau tolak |

**Alur (`lib/permintaan-po.ts`):** ajukan (`MENUNGGU_REVIEW`) → admin `reviewPo` kasih `estimasiHarga`+`estimasiOngkir` (`DIKONFIRMASI_HARGA`) atau tolak (`DITOLAK`) → customer `responPenawaran`: kalau **setuju**, LANGSUNG dikonversi jadi `Pesanan` + `PesananItem` (`sumberItem: CUSTOM_PO`) + `Pembayaran` pertama dalam satu transaksi (skip keranjang sepenuhnya, sesuai spesifikasi bisnis); kalau **tolak**, status jadi `DITOLAK`.

**Keputusan desain penting:**
- `estimasiHarga` diperlakukan sebagai **harga per unit** (konsisten dengan `Produk.hargaJualIdr`), dikalikan `jumlahDiminta` saat dikonversi jadi `subtotalProduk`. `estimasiOngkir` langsung jadi `ongkirChinaGudang` pesanan (nilai ini sudah ada dari hasil review admin, beda dari checkout katalog yang semua ongkirnya masih 0). `ongkirDomestik` tetap 0 (diisi manual admin belakangan, sama seperti checkout biasa).
- **Approve PO butuh `alamatId`+`preferensiKurir`+`metode`** di body (`responPenawaranSchema` pakai `.refine()` supaya field ini wajib HANYA kalau `setuju: true`) — karena approve = checkout instan, butuh info yang sama seperti checkout katalog.
- Guard atomik dipakai LAGI di sini persis pola yang sama seperti modul pembayaran (`WHERE status = <status lama>`) — baik di `reviewPo` (cegah direview dobel) maupun `responPenawaran` (cegah direspon dobel oleh customer, atau setelah admin somehow ubah lagi).
- Custom PO **tidak** melewati guard stok (`lib/stok.ts`) — barang ini di luar katalog, tidak ada baris `Produk`/`ProdukVarian` untuk dijaga.
- Tidak ada status "customer menolak penawaran" yang terpisah dari "admin menolak PO" — dua-duanya berakhir di `DITOLAK` yang sama (skema cuma punya 4 status, sesuai spesifikasi bisnis asli).

**Testing**: 16 test baru (87 total) — termasuk verifikasi perhitungan `subtotalProduk`/`totalAkhir` yang benar saat konversi, dan guard atomik di kedua arah (review & respon).

> **Bugfix pasca-rilis modul ini**: `responPenawaran` sempat kirim `preferensiKurir`/`metode` yang secara tipe statis `string | undefined` ke Prisma (field itu wajib non-null di schema) — lolos di verifikasi sandbox karena `Prisma.TransactionClient` di-stub sebagai `any` di sana, ketahuan begitu `prisma generate` jalan beneran di mesin developer. Diperbaiki dengan guard eksplisit setelah destructuring (sekalian jadi jaring pengaman runtime, bukan cuma akal-akalan tipe). Sudah diaudit: semua pola Zod `.refine()` conditional-required lain di codebase ini aman karena field targetnya di Prisma schema memang nullable.

## Modul: Upload, Notifikasi, Komplain

| Endpoint | Auth | Catatan |
|---|---|---|
| `POST /api/upload` | Siapapun yang login | Presigned URL R2 (customer & admin sama-sama butuh — bukti transfer, foto komplain, referensi PO, foto produk) |
| `GET /api/notifikasi` | Customer | List + `jumlahBelumDibaca` |
| `PATCH /api/notifikasi/tandai-baca` | Customer | Sebagian (`notifikasiIds`) atau semua |
| `POST /api/komplain` | Customer | Ajukan, ownership dicek lewat `PesananItem → Pesanan.customerId` |
| `GET /api/komplain` / `GET /api/komplain/[id]` | Customer | Riwayat & detail (+ `KomplainLog`) |
| `GET /api/admin/komplain` | Admin | List, default filter belum `SELESAI` |
| `PATCH /api/admin/komplain/[id]` | Admin (OWNER/STAFF) | Tindak lanjut |

**Keputusan desain penting:**
- **Upload** pakai `wajibLogin` (bukan `wajibCustomer`/`wajibAdmin`) — dua-duanya perlu upload file. `lib/r2.ts` bikin presigned PUT URL (5 menit) supaya client upload LANGSUNG ke R2 dari browser, server tidak pernah nyentuh isi filenya sama sekali.
- **Notifikasi**: `tandaiBaca` SELALU nge-scope `where` ke `customerId` dari token lebih dulu, baru filter `id` opsional — dites eksplisit bahwa nyelipin ID notifikasi customer lain di body tidak akan pernah ke-update baris itu (Prisma AND-kan semua kondisi `where`).
- **Komplain**: tidak punya kolom `customerId` langsung di tabel-nya — ownership selalu dicek lewat rantai relasi `pesananItem.pesanan.customerId`. `tindakLanjutKomplain` pakai guard `status: { not: SELESAI }` — komplain yang sudah ditutup tidak bisa ditindaklanjuti lagi (harus ajukan baru kalau ada masalah susulan). Tiap tindak lanjut selalu nambah baris `KomplainLog` (riwayat bertahap) terpisah dari `solusi` (keputusan akhir).

**Testing**: 13 test baru (105 total).

## Modul: Admin Pesanan & Dashboard (penutup)

| Endpoint | Catatan |
|---|---|
| `GET /api/admin/pesanan` / `GET /api/admin/pesanan/[id]` | List + detail lengkap (tanpa ownership check — admin lihat pesanan siapapun) |
| `PATCH /api/admin/pesanan/[id]/biaya` | Override manual `biayaJasaTitip`/`ongkirChinaGudang`/`ongkirDomestik`, `totalAkhir` dihitung ULANG server-side. Dua yang pertama sudah otomatis dari checkout (`lib/tarif.ts`), field ini untuk koreksi kasus khusus; `ongkirChinaGudang` TETAP cuma bisa diisi manual di sini |
| `PATCH /api/admin/pesanan/[id]/status` | Ubah status pipeline, guard: pesanan status TERMINAL (SELESAI/DIBATALKAN) tidak bisa diubah lagi, selalu nambah `PesananStatusLog` |
| `PATCH /api/admin/pesanan/[id]/pengiriman` | Realisasi kurir/resi, `Pengiriman` lazy-create (pola sama seperti `Keranjang`) |
| `GET /api/admin/dashboard/statistik` | Pesanan per status, yang perlu perhatian (pembayaran/PO/komplain), produk aktif, omzet |
| `GET /api/admin/dashboard/omzet-harian` | Deret omzet + jumlah pesanan per hari (`?hari`, default 7 max 30, bucket WIB, hari kosong = 0) untuk chart dashboard — agregasi di JS, definisi omzet sama dengan statistik |
| `GET /api/admin/dashboard/produk-terlaris` | Top produk (default 5, max 20) — agregat `PesananItem` per `produkId`, definisi "terjual" sama dengan omzet (bukan nunggu bayar/batal), item CUSTOM_PO tidak ikut |
| `GET /api/admin/log-aktivitas` | List audit (sebelumnya cuma ditulis, tidak bisa dibaca) — pagination + filter `aksi` (contains) + `adminId`, terbaru dulu, include nama/email admin |

**Testing**: 10 test baru (115 total, final).

> **Fix pasca-rilis**: ditemukan sambil menyiapkan pengujian end-to-end — tidak ada satu pun kode yang benar-benar mengisi tabel `Notifikasi` (modul notifikasi cuma bisa baca, tidak ada yang menulis). Ditambahkan `lib/notifikasi.ts` § `buatNotifikasi()` (in-app, ditulis DI DALAM transaksi) dipanggil di 4 titik pemicu: verifikasi/tolak pembayaran, review PO, ubah status pesanan, tindak lanjut komplain — masing-masing juga langsung kirim WA (`kirimNotifikasiWa`, DI LUAR transaksi, sesuai prinsip #1).

## Modul: Kurs Terpusat & Perbaikan Biaya Pesanan (ditemukan dari pengujian manual)

**`KursMaster`** (`lib/kurs-master.ts`) — tabel baru, **append-only** (pola sama seperti `LogAktivitas`/`PesananStatusLog`): "kurs aktif" = baris dengan `dibuatPada` paling baru, bukan satu baris yang di-update terus.

| Endpoint | Catatan |
|---|---|
| `GET /api/admin/kurs-master` | Riwayat semua kurs, terbaru dulu |
| `GET /api/admin/kurs-master/aktif` | Cuma kurs yang berlaku sekarang |
| `POST /api/admin/kurs-master` | Selalu bikin baris BARU, tidak pernah edit baris lama |

**`POST`/`PATCH /api/admin/produk`** — `kurs` dan `hargaJualIdr` sekarang **opsional** (`lib/produk.ts`):
- `kurs` tidak dikirim → ambil dari `KursMaster` aktif (400 kalau belum pernah diisi sama sekali).
- `hargaJualIdr` tidak dikirim → dihitung `round(hargaAsalRmb × kurs)`, **murni, tanpa markup apapun** — `hitungBiayaJasaTitip()` TIDAK dipanggil di sini, cuma boleh di `prosesCheckout`.
- `hargaJualIdr` dikirim eksplisit → dipakai apa adanya, mengabaikan hasil hitung otomatis.
- **PATCH tanpa `hargaJualIdr` tapi kirim `hargaAsalRmb`/`kurs` baru → dihitung ULANG dari nilai baru, override manual sebelumnya TIDAK dipertahankan.** Ini sengaja (tidak ada tracking "manual override"), bukan bug — PATCH yang sama sekali tidak menyentuh field harga tidak memicu apa pun.

**`Pesanan.beratTotalGram`** (kolom baru, required) — snapshot permanen jumlah `beratGram × jumlah` semua item saat checkout, dalam GRAM. `hitungOngkirDomestik` (`lib/tarif.ts`) sekarang terima gram langsung (bukan kg) — satu-satunya representasi berat yang beredar di kode ini integer gram, tidak ada isu presisi desimal.

**`PATCH /api/admin/pesanan/[id]/biaya`** — diperbaiki: sebelumnya endpoint ini bisa ikut menimpa `biayaJasaTitip`/`ongkirDomestik` walau cuma diminta ubah `ongkirChinaGudang`. Sekarang **cuma terima `{ ongkirChinaGudang }`** — dua field lain (yang sudah final & otomatis sejak checkout) selalu diambil dari nilai **tersimpan**, tidak pernah dihitung ulang atau diterima dari body.

**Testing**: unit test murni untuk `hitungOngkirDomestik` (satuan gram), test eksplisit "field liar di body diabaikan total" untuk endpoint biaya, dan test kasus bug asli (`hargaAsalRmb: 15, kurs: 2300` → `hargaJualIdr` PERSIS `34500`, bukan `46580`).

## Modul: Info Publik, Rekening & Penutup Gap Desain

Endpoint untuk 6 kebutuhan halaman desain yang belum punya backend:

| Endpoint | Auth | Catatan |
|---|---|---|
| `GET /api/rekening` | Publik | Daftar rekening bank AKTIF untuk halaman pembayaran (tanpa login) |
| `GET /api/admin/rekening` | Admin (OWNER/STAFF) | Semua rekening termasuk yang nonaktif |
| `POST /api/admin/rekening` | Admin (OWNER/STAFF) | Tambah rekening (`bank`, `noRekening`, `atasNama`) |
| `PATCH /api/admin/rekening/[id]` | Admin (OWNER/STAFF) | Edit / toggle `aktif` (404 kalau id tidak ada) |
| `DELETE /api/admin/rekening/[id]` | Admin (OWNER/STAFF) | Hard delete aman — tidak ada FK yang mereferensikan (404 kalau id tidak ada) |
| `GET /api/statistik-publik` | Publik | `pesananTerkirim` (status SELESAI) + `customerAktif` (distinct customer non-batal) untuk halaman Tentang Kami. Rating TIDAK ada — belum ada sumber datanya (tidak ada tabel ulasan), frontend pakai placeholder |

**Keputusan desain penting:**
- **`RekeningBank` tabel baru** (bukan konten statis di frontend) — supaya admin bisa kelola lewat panel pengaturan (sesuai desain admin-11) tanpa deploy ulang. `Pembayaran.metode` tetap string bebas (tidak FK ke sini) supaya hapus/ganti rekening tidak merusak riwayat pembayaran lama. Seed awal: BCA + Mandiri a.n. PT Jastip China.
- **Batal customer (`batalkanPesananCustomer`)**: guard atomik `WHERE statusPesanan = MENUNGGU_PEMBAYARAN` (race dengan verifikasi admin dimenangkan salah satu, yang kalah 409). Percobaan bayar aktif ikut `KADALUARSA` (tanpa ini retry masih bisa jalan padahal pesanan sudah batal). Stok dikembalikan, `PesananStatusLog` DIBATALKAN selalu ditulis, notifikasi in-app dibuat di dalam transaksi. TIDAK kirim WA — yang bertindak customer itu sendiri.
- **Invoice PDF (`lib/invoice.ts` + pdfkit)**: builder murni atas data plain (tanpa prisma) supaya unit-testable tanpa DB. Font built-in Helvetica (tanpa embedding, aman di serverless). Rincian biaya mirror komponen `totalAkhir` (subtotal + jasa + ongkir china + domestik + admin).
- **Migrasi `sinkron-kurs-berat-rekening`**: sekalian menutup drift lama — `berat_total_gram` + tabel `kurs_master` (dari modul kurs) ternyata belum pernah masuk migration files SAMA SEKALI di local maupun prod (ketahuan karena `migrate dev` gagal dengan 13 baris existing). Backfill berat dari `SUM(berat_gram × jumlah)` item per pesanan, bukan default 0 buta.

**Testing**: 27 test baru (155 total, final).

> **Tambahan**: `GET /api/admin/dashboard/omzet-harian` (4 test baru, 159 total) — diminta untuk chart "Omzet per hari" di desain dashboard admin, yang tidak punya sumber data sebelumnya. Tidak menyentuh arsitektur yang ada: agregasi di JS (bukan raw SQL), definisi omzet sama dengan statistik, auth admin biasa.

## Prinsip penting yang diikuti di seluruh kode

1. **Panggilan jaringan eksternal (WA, dll) selalu di luar `prisma.$transaction`** — lihat `lib/notifikasi.ts`.
2. **Harga & varian di-snapshot saat transaksi**, tidak pernah direferensikan live ke tabel produk — riwayat invoice tidak berubah walau harga/varian produk berubah nanti.
3. **Setiap aksi admin yang mengubah data penting (verifikasi bayar, hapus produk, dll) tercatat di `LogAktivitas`.**
4. **Stok ditahan cuma selama jendela satu percobaan pembayaran aktif**, bukan sepanjang umur pesanan — memungkinkan retry tanpa batas tanpa mengunci stok selamanya.