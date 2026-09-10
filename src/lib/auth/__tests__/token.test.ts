import { test, before } from "node:test";
import assert from "node:assert/strict";
import { buatAccessToken, verifikasiAccessToken } from "../token";

const SECRET_UTAMA = "secret-untuk-testing-minimal-32-karakter-xx";

before(() => {
  process.env.JWT_ACCESS_SECRET = SECRET_UTAMA;
});

test("token yang baru dibuat harus valid dan payload-nya sesuai", async () => {
  const token = await buatAccessToken({ sub: "cust_123", tipe: "customer" });
  const payload = await verifikasiAccessToken(token);

  assert.ok(payload);
  assert.equal(payload?.sub, "cust_123");
  assert.equal(payload?.tipe, "customer");
});

test("payload admin menyimpan role", async () => {
  const token = await buatAccessToken({ sub: "adm_1", tipe: "admin", role: "OWNER" });
  const payload = await verifikasiAccessToken(token);

  assert.equal(payload?.role, "OWNER");
});

test("token dengan signature diutak-atik harus ditolak", async () => {
  const token = await buatAccessToken({ sub: "cust_123", tipe: "customer" });
  const rusak = `${token.slice(0, -2)}xx`;

  assert.equal(await verifikasiAccessToken(rusak), null);
});

test("token yang ditandatangani dengan secret lain harus ditolak", async () => {
  const token = await buatAccessToken({ sub: "cust_123", tipe: "customer" });

  process.env.JWT_ACCESS_SECRET = "secret-yang-sama-sekali-berbeda-dari-atas";
  const payload = await verifikasiAccessToken(token);
  process.env.JWT_ACCESS_SECRET = SECRET_UTAMA; // reset untuk test lain

  assert.equal(payload, null);
});

test("string acak yang bukan JWT sama sekali harus ditolak, bukan bikin crash", async () => {
  assert.equal(await verifikasiAccessToken("bukan-jwt-sama-sekali"), null);
});