---
title: "Log Sesi 2026-09-22 — Implementasi Frontend"
tags: [log-sesi]
tanggal: 2026-09-22
---
# Log Sesi 2026-09-22 — Implementasi Frontend

Implementasi penuh dari PDF pen.dev (bukan spek MD — PDF menang di 2 titik).

## Fondasi (commit f5bbcff)

- Font Noto Serif SC + Inter via `next/font`. Token brand `@theme` (red/gold/jade/cream/ink/garis).
- `lib/format.ts` (rupiah/tanggal), `lib/api-client.ts` (ApiError, cookie ikut), `lib/types.ts` + `lib/types-admin.ts`.
- `auth-context` diperbaiki: respons backend benar, register TANPA auto-login + param email.
- Komponen: Button/Badge/Card/Input/Toaster/EmptyState/Skeleton, SiteHeader/Footer, BottomNav, AdminShell, ProductCard, QtyStepper, StatusPipeline, guard customer/admin.

## Batch B revenue (c37a141)

Beranda (unggulan 2x2), katalog, detail produk (varian flat, sticky CTA), keranjang (checkbox + jasa via `lib/tarif`), checkout 3 langkah (ongkir preview via `hitungOngkirDomestik`), pembayaran (countdown, bayar ulang, batal), riwayat tab pesanan+PO, detail pesanan (pipeline, resi, invoice PDF), ajukan PO, detail PO (setuju/tolak).

## Batch C support (9d48a8b) + 2 endpoint baru

- Auth rewrite: login (WA, `?dari=`), register (min 8+huruf+angka), forgot (link WA), reset-password BARU (tidak ada di mockup, ikut gaya login).
- `GET/PATCH /api/auth/profil` (noWa immutable, email 409) + `GET /api/lacak` publik minimal (tanpa nominal/PII).
- Akun, lacak publik, notifikasi, bantuan, tentang (server-side stats), cara order, komplain (pilih item, 1 foto).

## Batch D admin (b7d63fe)

11 halaman. List PO/komplain diperkaya include (customer, log) — aditif, tanpa endpoint baru.

## Koreksi mockup yang diterapkan di kode

Password 8, jasa 35% read-only, foto tunggal (komplain + PO), tanpa PDF (backend cuma gambar), tanpa "perkiraan harga" PO, reset-password dibuatkan, omzet-harian endpoint baru, matematika admin dibetulkan saat render (nilai dari API).

## Verifikasi tiap batch

`tsc --noEmit` + `npm run build` + `npm run test` hijau (166/166 final).
