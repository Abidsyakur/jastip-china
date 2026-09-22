---
title: "Keputusan Final — Jastip China"
tags: [keputusan]
tanggal: 2026-09-22
---
# Keputusan Final — Jastip China

Catatan keputusan yang mengikat. Kalau ada yang mau diubah, diskusikan dulu — jangan diam-diam.

## Arsitektur

- **Auth custom JWT, bukan NextAuth** — dual customer/admin + OTP WhatsApp + rate limiting terlalu non-standar untuk NextAuth.
- **Database Neon PostgreSQL (Singapore)**, scale-to-zero. Migrasi via Prisma; drift `berat_total_gram` + `kurs_master` (2026-09-22) jadi pelajaran: kode tanpa migrasi = fitur mati di prod.
- **Cron via cron-job.org tiap 15 menit** → `GET /api/cron/cek-kadaluwarsa` (header `Authorization: Bearer CRON_SECRET`). Vercel Hobby tidak dukung cron 15 menit.
- **File di Cloudflare R2 bucket "nihao"**, upload langsung dari browser via presigned URL — server tidak pernah sentuh isi file.
- **WA di luar transaksi, notifikasi in-app di dalam transaksi.** Panggilan Fonnte gagal tidak boleh batalkan data.
- **Guard atomik `WHERE status = <lama>`** untuk semua transisi status (verifikasi, retry, batal, review PO, respon PO) — pola anti-race cron-vs-admin.
- **Harga & varian di-snapshot saat transaksi**, tidak pernah live-ref ke produk.

## Bisnis

- **Jasa titip 35%, lantai Rp15.000** (`lib/tarif.ts`, ter-test). Desain yang tulis 10% SALAH — lihat [[05-checkout]].
- **Ongkir domestik otomatis by zona** (Jawa / tengah / timur), kurir cuma `jnt` + `shopee_express`. Provinsi tak dikenal → zona termahal.
- **`ongkirChinaGudang` selalu 0 saat checkout**, diisi manual admin (belum ada kalkulator forwarder).
- **Pembayaran 1-ke-banyak**: retry = baris baru, bukan update. Stok ditahan hanya selama 1 percobaan aktif. Kadaluwarsa default 24 jam.
- **Batal customer** cuma saat `MENUNGGU_PEMBAYARAN`; bayar aktif ikut kadaluwarsa; stok kembali; tanpa WA. Lihat [[08-detail-pesanan]].
- **Hapus produk = soft delete** (status NONAKTIF). Kategori dipakai produk = 409, tidak bisa hapus.
- **Kurs append-only** (`kurs_master`): kurs aktif = baris terbaru. Field-nya `kursRmbIdr`, bukan `nilaiKurs`.
- **PO**: `estimasiHarga` = per unit (× jumlah saat konversi), `estimasiOngkir` → `ongkirChinaGudang`. Setuju = checkout instan. Lihat [[09-ajukan-po]] dan [[14-detail-po]].
- **Komplain** tanpa `customerId` langsung — ownership via rantai `pesananItem → pesanan`. Foto wajib min 1. Lihat [[20-ajukan-komplain]].
- **Rekening bank = tabel `RekeningBank`** (bukan statis), dikelola admin, dibaca publik yang aktif saja. Seed: BCA + Mandiri a.n. PT Jastip China.
- **Rating kepuasan tanpa sumber data** (tidak ada tabel ulasan) — frontend placeholder, tidak ada endpoint.

## Desain

- **Palet**: Chinese Red `#C8102E`, Gold `#D4AF37`, Jade `#7C9885`, Cream `#FAF8F3`, Ink `#2C1810`. Lihat [[design-system]].
- **Tipografi**: Noto Serif SC (heading) + Inter (body). Dilarang Inter/Poppins/Playfair untuk heading.
- **Tanpa dark mode** (MVP). Tanpa gradient hero, tanpa label all-caps, tanpa panah di tombol, tanpa middle-dot.
- **Satu momen "berani"**: transisi buka [[03-detail-produk]]. Sisanya diam.
- **Varian FLAT**: 1 baris = 1 kombinasi lengkap. Jangan pernah matriks 2D.
- **Mobile-first**, bottom nav 5 item + FAB. Sidebar admin permanen desktop (240px, collapse 64px).
- **Bahasa Indonesia primer**, Inggris fallback. Lihat [[copy]].
- **Halaman statis** [[18-tentang-kami]] disuplai `statistik-publik` (tanpa rating); [[19-cara-order]] satu-satunya halaman bernomor fungsional.

## Operasional

- Branch `master`, remote GitHub. Deploy Vercel auto dari push — kalau endpoint baru 404, cek tab Deployments dulu (build CSS Tailwind pernah gagal total, diperbaiki 2026-09-22).
- Test: `npm.cmd run test` (bukan `npm`), 155 lolos. `npx.cmd tsc --noEmit`. PowerShell: tanpa `&&`, tanpa `head/tail`.
- Seed: `prisma/seed.ts` (kategori + rekening + admin pertama). Dev: `seed-dev.ts` (data contoh penuh).
- Kredensial prod hanya di `.env.production` (gitignored) — jangan pernah commit, jangan tulis di vault.
