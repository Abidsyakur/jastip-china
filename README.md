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

✅ Selesai: skema database, auth (customer + admin, RBAC OWNER/STAFF), katalog +
varian, keranjang, alamat, checkout, pembayaran manual (+ retry tanpa batas +
kedaluwarsa otomatis), custom PO, upload file, notifikasi WA, komplain,
statistik dashboard admin, rate limiting login.

⏳ Belum dikerjakan (tidak menghalangi jalan, bisa menyusul):
- Validasi terstruktur pakai Zod (saat ini validasi manual per endpoint)
- Testing (unit/integration)
- CI/CD
- Page-view tracking untuk statistik "viewer" di dashboard admin
- Optimisasi kurs terpusat (saat ini kurs masih per-produk, sesuai kesepakatan awal)

## Prinsip penting yang diikuti di seluruh kode

1. **Panggilan jaringan eksternal (WA, dll) selalu di luar `prisma.$transaction`** — lihat `lib/notifikasi.ts`.
2. **Harga & varian di-snapshot saat transaksi**, tidak pernah direferensikan live ke tabel produk — riwayat invoice tidak berubah walau harga/varian produk berubah nanti.
3. **Setiap aksi admin yang mengubah data penting (verifikasi bayar, hapus produk, dll) tercatat di `LogAktivitas`.**
4. **Stok ditahan cuma selama jendela satu percobaan pembayaran aktif**, bukan sepanjang umur pesanan — memungkinkan retry tanpa batas tanpa mengunci stok selamanya.
=====