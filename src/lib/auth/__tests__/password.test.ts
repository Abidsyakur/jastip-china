import { test } from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword } from "../password";

test("hash lalu verify dengan password yang benar harus cocok", async () => {
  const hash = await hashPassword("passwordRahasia123");
  assert.equal(await verifyPassword("passwordRahasia123", hash), true);
});

test("verify dengan password salah harus gagal", async () => {
  const hash = await hashPassword("passwordRahasia123");
  assert.equal(await verifyPassword("passwordSalah", hash), false);
});

test("dua hash dari password yang sama harus berbeda (salt acak)", async () => {
  const hash1 = await hashPassword("samaSamaAja");
  const hash2 = await hashPassword("samaSamaAja");
  assert.notEqual(hash1, hash2);
});