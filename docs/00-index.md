---
title: "Peta Vault — Jastip China"
tags: [index]
tanggal: 2026-09-22
---
# Peta Vault — Jastip China

Vault ini = folder `docs/` repo jastip-china. Sumber kebenaran desain + keputusan. Mulai dari sini.

## Foundation (baca pertama)

- [[design-system]] — token warna, tipografi, spacing, radius, shadow
- [[components]] — 18 komponen + semua state
- [[layouts]] — grid, header/footer, sidebar admin, pola halaman
- [[anti-patterns]] — 15 aturan anti-slop + panduan estetika China
- [[chinese-elements]] — simbolisme warna, pola dekoratif, ikon
- [[copy]] — seluruh teks UI (Indonesia primer)
- [[content-examples]] — 20 produk, customer, pesanan, PO, komplain contoh
- [[interactions]] — perilaku klik, hover, animasi (satu momen "berani")
- [[responsive]] — breakpoint + aturan adaptif
- [[mobile-patterns]] — bottom nav, bottom sheet, sticky CTA
- [[accessibility]] — kontras, fokus, target sentuh

## Layar Customer

Revenue (alur uang):

- [[01-beranda]] → [[02-katalog]] → [[03-detail-produk]] → [[04-keranjang]] → [[05-checkout]] → [[06-upload-bukti]]
- [[07-riwayat-pesanan]] → [[08-detail-pesanan]]
- [[09-ajukan-po]] → [[14-detail-po]]

Support + akun:

- [[10-login]] → [[11-register]] → [[12-lupa-password]]
- [[13-akun-profil]] → [[16-notifikasi]]
- [[15-lacak-pesanan]] → [[17-bantuan]] → [[20-ajukan-komplain]]

Statis:

- [[18-tentang-kami]] ← disuplai [[statistik-publik]] (API)
- [[19-cara-order]]

## Layar Admin

Operasional:

- [[admin-01-dashboard]] ← disuplai [[statistik]] + produk-terlaris (API)
- [[admin-02-kelola-pesanan]] → [[admin-03-detail-pesanan]]
- [[admin-04-kelola-produk]] → [[admin-05-detail-produk]]
- [[admin-06-kelola-po]]

Manajemen:

- [[admin-07-kelola-komplain]]
- [[admin-08-kelola-kategori]]
- [[admin-09-pengaturan-kurs]]
- [[admin-10-log-aktivitas]] ← disuplai log-aktivitas (API)
- [[admin-11-pengaturan-umum]] ← kelola rekening via API rekening

## Bundle pen.dev (arsip, jangan edit langsung)

- [[batch-1-foundation]] → [[batch-2-customer-revenue]] → [[batch-3-customer-support]] → [[batch-4-admin-operational]] → [[batch-5-admin-management]]
- [[master-all-38]] — gabungan semua (arsip, kedaluwarsa tiap ada screen baru)
- [[pen-dev-prompt]] — prompt desain versi awal (arsip)

## Keputusan + Riwayat

- [[keputusan]] — semua keputusan final (arsitektur, bisnis, desain)
- Log sesi di folder `log-sesi/` — catatan kerja per tanggal
