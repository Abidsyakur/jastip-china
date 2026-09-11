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

✅ Selesai: skema database, auth (customer + admin, RBAC OWNER/STAFF), rate limiting login, **katalog produk + kategori (admin CRUD + publik)**.

🚧 Sedang dikerjakan: keranjang, alamat, checkout, pembayaran manual, custom PO, upload file, notifikasi WA, komplain, statistik dashboard admin.

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

**Testing**: 21 unit/integration test lolos tanpa perlu Postgres asli — pakai `mock.module()` (Node 22, `--experimental-test-module-mocks`) untuk mock `@/lib/db` dan `@prisma/client`. Pola mock yang dipakai didokumentasikan di `src/test-utils/mock-prisma-client.ts` — **penting dibaca sebelum nulis test baru** untuk modul lain, ada jebakan soal caching modul ES yang sempat bikin test false-negative.

## Prinsip penting yang diikuti di seluruh kode

1. **Panggilan jaringan eksternal (WA, dll) selalu di luar `prisma.$transaction`** — lihat `lib/notifikasi.ts`.
2. **Harga & varian di-snapshot saat transaksi**, tidak pernah direferensikan live ke tabel produk — riwayat invoice tidak berubah walau harga/varian produk berubah nanti.
3. **Setiap aksi admin yang mengubah data penting (verifikasi bayar, hapus produk, dll) tercatat di `LogAktivitas`.**
4. **Stok ditahan cuma selama jendela satu percobaan pembayaran aktif**, bukan sepanjang umur pesanan — memungkinkan retry tanpa batas tanpa mengunci stok selamanya.