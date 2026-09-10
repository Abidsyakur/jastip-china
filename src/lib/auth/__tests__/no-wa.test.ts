import { test } from "node:test";
import assert from "node:assert/strict";
import { normalisasiNoWa } from "../no-wa";

test("nomor diawali 08 dikonversi ke 628", () => {
  assert.equal(normalisasiNoWa("081234567890"), "6281234567890");
});

test("nomor diawali 62 dibiarkan apa adanya", () => {
  assert.equal(normalisasiNoWa("6281234567890"), "6281234567890");
});

test("nomor diawali +62 dirapikan jadi 62 tanpa plus", () => {
  assert.equal(normalisasiNoWa("+6281234567890"), "6281234567890");
});

test("spasi dan strip di nomor dibuang", () => {
  assert.equal(normalisasiNoWa("0812-3456-7890"), "6281234567890");
  assert.equal(normalisasiNoWa("0812 3456 7890"), "6281234567890");
});