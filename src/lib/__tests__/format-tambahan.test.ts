// letak: src/lib/__tests__/format-tambahan.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { rupiah, formatTanggal, formatTanggalWaktu, potong } from "../format";

// --- rupiah ---

test("rupiah: angka dipisah titik ribuan gaya Indonesia", () => {
  assert.equal(rupiah(282000), "Rp 282.000");
  assert.equal(rupiah(1500000), "Rp 1.500.000");
  assert.equal(rupiah(0), "Rp 0");
});

test("rupiah: string numerik diterima (mis. Decimal dari Prisma)", () => {
  assert.equal(rupiah("282000"), "Rp 282.000");
});

test("rupiah: desimal dibulatkan ke rupiah terdekat", () => {
  assert.equal(rupiah(1234.4), "Rp 1.234");
  assert.equal(rupiah(1234.5), "Rp 1.235");
  assert.equal(rupiah("282000.50"), "Rp 282.001");
});

test("rupiah: input tidak valid menghasilkan Rp 0, bukan NaN", () => {
  assert.equal(rupiah(NaN), "Rp 0");
  assert.equal(rupiah(Infinity), "Rp 0");
  assert.equal(rupiah("bukan angka"), "Rp 0");
});

// --- formatTanggal ---
// Tanggal dibuat dengan waktu LOKAL tengah hari supaya hasilnya tidak
// bergantung zona waktu mesin yang menjalankan test.

test("formatTanggal: objek Date -> '20 Jan 2024'", () => {
  assert.equal(formatTanggal(new Date(2024, 0, 20, 12, 0)), "20 Jan 2024");
});

test("formatTanggal: string tanpa zona waktu diterima", () => {
  assert.equal(formatTanggal("2024-01-20T12:00:00"), "20 Jan 2024");
});

test("formatTanggal: nama bulan Indonesia (Mei, Agustus)", () => {
  assert.equal(formatTanggal(new Date(2024, 4, 5, 12, 0)), "5 Mei 2024");
  // Beberapa versi ICU menulis "Agu", sebagian "Agt"/"Agus": longgarkan agar test tidak rapuh
  assert.match(formatTanggal(new Date(2024, 7, 17, 12, 0)), /^17 Ag\w* 2024$/);
});

// --- formatTanggalWaktu ---
// Pemisah jam bisa ":" atau "." tergantung versi ICU, dan koma setelah tahun
// kadang ada kadang tidak, jadi pola dibuat toleran.

test("formatTanggalWaktu: tanggal + jam + sufiks WIB", () => {
  const hasil = formatTanggalWaktu(new Date(2024, 0, 20, 19, 45));
  assert.match(hasil, /^20 Jan 2024,? 19[.:]45 WIB$/);
});

test("formatTanggalWaktu: jam dan menit satu digit diberi nol di depan", () => {
  const hasil = formatTanggalWaktu(new Date(2024, 0, 20, 9, 5));
  assert.match(hasil, /09[.:]05 WIB$/);
});

test("formatTanggalWaktu: string tanpa zona waktu diterima", () => {
  assert.match(formatTanggalWaktu("2024-01-20T19:45:00"), /^20 Jan 2024,? 19[.:]45 WIB$/);
});

// --- potong ---

test("potong: teks lebih pendek atau sama dengan batas tidak diubah", () => {
  assert.equal(potong("Tas", 12), "Tas");
  assert.equal(potong("Tas Backpack", 12), "Tas Backpack"); // tepat di batas
  assert.equal(potong("", 0), "");
});

test("potong: teks panjang dipotong + ellipsis", () => {
  assert.equal(potong("Tas Backpack Premium", 12), "Tas Backpack...");
});

test("potong: spasi di ujung potongan dibuang sebelum ellipsis", () => {
  // slice(0, 13) = "Tas Backpack " (ada spasi di ujung)
  assert.equal(potong("Tas Backpack Premium", 13), "Tas Backpack...");
});