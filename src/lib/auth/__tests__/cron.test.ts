// letak: src/lib/auth/__tests__/cron.test.ts
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { sesuaiRahasia, wajibCron } from "../cron";

const secretAwal = process.env.CRON_SECRET;

afterEach(() => {
  if (secretAwal === undefined) delete process.env.CRON_SECRET;
  else process.env.CRON_SECRET = secretAwal;
});

function req(authorization?: string) {
  return new NextRequest("http://localhost/api/cron/x", {
    headers: authorization ? { authorization } : {},
  });
}

test("sesuaiRahasia: sama persis -> true", () => {
  assert.equal(sesuaiRahasia("abc123", "abc123"), true);
});

test("sesuaiRahasia: berbeda isi atau panjang -> false", () => {
  assert.equal(sesuaiRahasia("abc124", "abc123"), false);
  assert.equal(sesuaiRahasia("abc", "abc123"), false);
  assert.equal(sesuaiRahasia("abc1234", "abc123"), false);
});

test("sesuaiRahasia: rahasia server kosong/undefined SELALU ditolak", () => {
  assert.equal(sesuaiRahasia("undefined", undefined), false);
  assert.equal(sesuaiRahasia("", ""), false);
  assert.equal(sesuaiRahasia("apa saja", ""), false);
});

test("sesuaiRahasia: nilai yang diberikan kosong/null -> false", () => {
  assert.equal(sesuaiRahasia(null, "rahasia"), false);
  assert.equal(sesuaiRahasia(undefined, "rahasia"), false);
  assert.equal(sesuaiRahasia("", "rahasia"), false);
});

test("wajibCron: header benar -> null (boleh lanjut)", () => {
  process.env.CRON_SECRET = "rahasia-cron";
  assert.equal(wajibCron(req("Bearer rahasia-cron")), null);
});

test("wajibCron: tanpa header, secret salah, atau skema bukan Bearer -> 401", async () => {
  process.env.CRON_SECRET = "rahasia-cron";
  for (const h of [undefined, "Bearer salah", "Basic rahasia-cron", "bearer rahasia-cron", "Bearer "]) {
    const res = wajibCron(req(h));
    assert.ok(res, `header ${String(h)} harus ditolak`);
    assert.equal(res.status, 401);
  }
  const res = wajibCron(req());
  assert.deepEqual(await res?.json(), { error: "Tidak diizinkan" });
});

test("wajibCron: CRON_SECRET belum diisi -> 'Bearer undefined' dan header kosong ditolak", () => {
  delete process.env.CRON_SECRET;
  assert.equal(wajibCron(req("Bearer undefined"))?.status, 401);
  assert.equal(wajibCron(req("Bearer "))?.status, 401);
  process.env.CRON_SECRET = "";
  assert.equal(wajibCron(req("Bearer "))?.status, 401);
});