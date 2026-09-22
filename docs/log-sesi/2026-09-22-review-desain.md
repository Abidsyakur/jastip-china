---
title: "Log Sesi 2026-09-22 — Review Desain pen.dev"
tags: [log-sesi]
tanggal: 2026-09-22
---
# Log Sesi 2026-09-22 — Review Desain pen.dev

User push 3 file: `pen-dev-desktop.pdf`, `pen-dev-mobile.pdf`, `nihao.pen` (di `docs/design/`, `.pen` terenkripsi — hanya via aplikasi pen.dev, tidak bisa dibaca di sini). Kedua PDF dibaca penuh + disilang lawan backend. Vonis: ~90% siap implementasi.

## Koreksi wajib (konflik backend, disetujui user)

1. Register "Minimal 6 karakter" → **8** (`passwordSchema`, backend tolak < 8).
2. Pengaturan Umum "Jasa Titip 10%" → **read-only 35% (min Rp15.000)**. Tidak ada endpoint untuk ubah angka ini.
3. Admin detail pesanan salah hitung: jasa **123.375** (bukan 35.250), total **650.875** (bukan 562.750).
4. Form komplain: pilih **item** (backend butuh `pesananItemId`), bukan invoice. Foto **maks 1** (`buktiFoto` tunggal) — sama untuk foto referensi PO.
5. Form PO: hapus **"Perkiraan harga"** (tidak ada field backend; `estimasiHarga` hak admin).
6. **Halaman reset-password tidak ada di desain** — backend kirim link `/reset-password?token=` via WA (1 jam). Dibuatkan mengikuti gaya form login, tanpa mockup baru.
7. Chart **"Omzet per hari"** tanpa sumber data → endpoint baru `GET /api/admin/dashboard/omzet-harian` (disetujui user, 4 test, 159 total).

## Ditangani di kode (desain tidak diubah)

Mapping label kurir, lacak 6 tahap penuh, FAQ disamakan 7 hari, Export CSV + "Beli lagi" client-side, angka rekening/invoice/stats ikut API.

## Temuan sampingan

- Spek MD lama [[11-register]] / [[12-lupa-password]] (alur OTP) **salah lawan backend** — yang benar: register langsung + link reset. Mockup pen.dev sudah benar; PDF menang atas MD di sini.
- PO deskripsi min backend = **10** (mockup "min 10 char" benar; spek MD lama tulis 20 — salah).
- Komplain backend: tanpa guard status/waktu, deskripsi opsional. Jendela 7 hari murni copy.
