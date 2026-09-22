---
title: "Log Sesi 2026-09-22 — 6 Endpoint Gap + Vault Obsidian"
tags: [log-sesi]
tanggal: 2026-09-22
---
# Log Sesi 2026-09-22 — 6 Endpoint Gap + Vault Obsidian

## Backend: 6 endpoint gap desain

Semua diminta agar desain bisa selesai tanpa placeholder blocking.

1. `GET /api/admin/dashboard/produk-terlaris` — agregat `PesananItem`, definisi "terjual" = omzet (bukan nunggu bayar/batal), CUSTOM_PO tidak ikut. Untuk [[admin-01-dashboard]].
2. `GET /api/admin/log-aktivitas` — tabel ada tapi belum bisa dibaca; pagination + filter `aksi`/`adminId`. Untuk [[admin-10-log-aktivitas]].
3. `POST /api/pesanan/[id]/batal` — customer batal sendiri, guard atomik, stok kembali, bayar aktif kadaluwarsa, tanpa WA. Untuk [[08-detail-pesanan]].
4. `GET /api/pesanan/[id]/invoice` — PDF via pdfkit, builder murni testable (`lib/invoice.ts`). Untuk detail pesanan.
5. `GET /api/rekening` (publik) + CRUD admin — tabel `RekeningBank` baru, bukan statis. Untuk halaman pembayaran.
6. `GET /api/statistik-publik` — `{pesananTerkirim, customerAktif}`, tanpa rating. Untuk [[18-tentang-kami]].

## Temuan saat kerja

- **Drift migrasi**: `berat_total_gram` + `kurs_master` belum pernah masuk migration files di DB mana pun → checkout + kurs mati di prod. Migrasi `sinkron-kurs-berat-rekening` + backfill berat dari item. Diterapkan ke lokal DAN Neon prod, terverifikasi via `information_schema`.
- **Seed prod**: 2 rekening (BCA/Mandiri) terisi via `seed.ts` (aman: upsert, admin diskip karena sudah ada).
- **Build production rusak total** (Tailwind v4 + config v3-style) → Vercel tidak bisa deploy. Diperbaiki minimal: `@tailwindcss/postcss` + `@theme inline`, tanpa ubah visual. `npm run build` hijau, 51 route.
- **Deploy**: 2 push, endpoint publik 404 terus; setelah build-fix push ke-3, user konfirmasi 200 tanpa login. Pelajaran: kalau endpoint baru 404 padahal kode sudah push → cek tab Deployments Vercel dulu.
- **Diskrepansi angka**: jasa titip backend 35% vs desain 10% → desain wajib ikut 35%. Lihat [[keputusan]].

## Verifikasi

- 155 test lolos (27 baru), typecheck bersih, build hijau.
- Smoke prod: `/api/rekening` + `/api/statistik-publik` 200 tanpa login (dikonfirmasi user).

## Vault Obsidian

- Vault = folder `docs/`. Dibuat [[00-index]] (MOC), [[keputusan]], log sesi ini.
- Frontmatter (title/tags/tanggal) dipasang ke 50+ file via `scripts/frontmatter.ps1` (dihapus setelah jalan).
- Cara pakai: instal Obsidian → Open folder as vault → `D:\jastip-china\docs`. Jangan root repo (`node_modules` berat di-index).
