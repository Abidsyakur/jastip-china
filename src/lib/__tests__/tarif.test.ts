// letak: src/lib/__tests__/tarif.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { hitungBiayaJasaTitip, hitungOngkirDomestik } from "../tarif";

test("hitungBiayaJasaTitip: 35% dari subtotal kalau di atas minimum", () => {
  assert.equal(hitungBiayaJasaTitip(100_000), 35_000); // 35% * 100rb = 35rb
  assert.equal(hitungBiayaJasaTitip(1_000_000), 350_000);
});

test("hitungBiayaJasaTitip: kena lantai minimum Rp15.000 kalau 35% di bawah itu", () => {
  assert.equal(hitungBiayaJasaTitip(10_000), 15_000); // 35% * 10rb = 3.5rb, dipaksa jadi 15rb
  assert.equal(hitungBiayaJasaTitip(0), 15_000);
});

test("hitungBiayaJasaTitip: pembulatan ke rupiah terdekat", () => {
  assert.equal(hitungBiayaJasaTitip(123_457), Math.round(123_457 * 0.35));
});

// hitungOngkirDomestik sekarang terima GRAM (bukan kg) sebagai parameter ke-3
test("hitungOngkirDomestik: 6 kombinasi zona x kurir, kg pertama (berat <= 1000gr)", () => {
  assert.equal(hitungOngkirDomestik("DKI Jakarta", "jnt", 500), 9_000);
  assert.equal(hitungOngkirDomestik("DKI Jakarta", "shopee_express", 500), 8_000);
  assert.equal(hitungOngkirDomestik("Sumatera Utara", "jnt", 1000), 15_000);
  assert.equal(hitungOngkirDomestik("Sumatera Utara", "shopee_express", 1000), 14_000);
  assert.equal(hitungOngkirDomestik("Papua", "jnt", 200), 30_000);
  assert.equal(hitungOngkirDomestik("Papua", "shopee_express", 200), 28_000);
});

test("hitungOngkirDomestik: kg berikutnya ditambahkan per kg penuh (bukan linear per gram)", () => {
  // 2500gr dibulatkan ke 3kg -> kgPertama + 2x kgBerikutnya
  assert.equal(hitungOngkirDomestik("DKI Jakarta", "jnt", 2500), 9_000 + 2 * 3_000);
  assert.equal(hitungOngkirDomestik("Papua", "shopee_express", 3100), 28_000 + 3 * 9_000);
});

test("hitungOngkirDomestik: berat pecahan (gram) dibulatkan NAIK ke kg penuh, bukan dibulatkan biasa", () => {
  // 1010gr tetap kena tarif 2kg, bukan dibulatkan ke bawah jadi 1kg
  assert.equal(hitungOngkirDomestik("DKI Jakarta", "jnt", 1010), 9_000 + 3_000);
});

test("hitungOngkirDomestik: provinsi tidak dikenali jatuh ke zona default (indonesia_timur, termahal)", () => {
  assert.equal(hitungOngkirDomestik("Provinsi Ngasal", "jnt", 1000), 30_000);
  assert.equal(hitungOngkirDomestik("", "shopee_express", 1000), 28_000);
});

test("hitungOngkirDomestik: semua 3 zona berbeda tarifnya (bukan kebetulan sama)", () => {
  const jawa = hitungOngkirDomestik("DKI Jakarta", "jnt", 1000);
  const sumbaSulkal = hitungOngkirDomestik("Bali", "jnt", 1000);
  const timur = hitungOngkirDomestik("Maluku", "jnt", 1000);
  assert.ok(jawa < sumbaSulkal);
  assert.ok(sumbaSulkal < timur);
});