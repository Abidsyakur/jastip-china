---
title: "Log Sesi 2026-09-22 — Upload via Server"
tags: [log-sesi]
tanggal: 2026-09-22
---
# Log Sesi 2026-09-22 — Upload via Server

## Masalah

Upload foto produk admin "fetch failed". Console: `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` saat PUT ke `*.r2.cloudflarestorage.com`. Bukan CORS — TLS-nya yang gagal, dari browser user DAN mesin dev. PUT langsung browser→R2 tidak bisa diandalkan untuk market Indonesia.

## Solusi: upload + baca via server (same-origin)

- `POST /api/upload/file` (multipart: file + tujuan, validasi sama dengan presigned flow) → `{publicUrl: /api/file/...}`.
- `GET /api/file/[...key]` publik, whitelist prefix, cache immutable 1 tahun.
- `lib/r2.ts`: `unggahBufferKeR2` + `ambilDariR2`.
- `lib/upload.ts`: kompres client via canvas (maks 1920px, JPEG 0.85, file kecil dilewati) — jauh di bawah batas body 4.5MB Vercel Hobby.
- Semua foto (bukti, referensi, komplain, produk) otomatis JPEG setelah kompresi.
- Presigned endpoint lama tetap ada (tidak breaking), frontend pindah ke jalur server.

## Verifikasi

6 test baru, 176/176 lolos. Typecheck + build hijau (70 halaman).
