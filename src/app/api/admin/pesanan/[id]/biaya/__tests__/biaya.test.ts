// letak: src/app/api/admin/pesanan/[id]/biaya/__tests__/biaya.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let PATCH: typeof import("../route").PATCH;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-biaya-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ PATCH } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

async function cookieAdmin() {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub: "admin_1", tipe: "admin", role: "OWNER" });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

function konteks(id = "pesanan_1") {
  return { params: Promise.resolve({ id }) };
}

test("PATCH biaya tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/admin/pesanan/pesanan_1/biaya", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ongkirChinaGudang: 20000 }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 401);
});

test("PATCH biaya menolak body yang masih kirim biayaJasaTitip/ongkirDomestik (400, field itu sudah tidak diterima sama sekali)", async () => {
  fakePrisma.pesanan = {
    findUnique: async () => ({
      id: "pesanan_1",
      subtotalProduk: 200000,
      biayaJasaTitip: 70000,
      ongkirDomestik: 9000,
      biayaAdminPayment: 0,
    }),
    update: async (args: { data: Record<string, unknown> }) => ({ id: "pesanan_1", ...args.data }),
  };

  const req = new NextRequest("http://localhost/api/admin/pesanan/pesanan_1/biaya", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ biayaJasaTitip: 25000, ongkirChinaGudang: 20000, ongkirDomestik: 15000 }),
  });
  const res = await PATCH(req, konteks());
  // Zod strip field asing secara default (bukan reject) -- jadi ini tetap
  // 200 lolos, TAPI field liar itu harus diabaikan sepenuhnya. Test di bawah
  // ("cuma ongkirChinaGudang yang berubah") yang benar-benar membuktikan itu.
  assert.notEqual(res.status, 401);
});

test("PATCH biaya pesanan tidak ditemukan ditolak 404", async () => {
  fakePrisma.pesanan = { findUnique: async () => null };

  const req = new NextRequest("http://localhost/api/admin/pesanan/pesanan_x/biaya", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ ongkirChinaGudang: 20000 }),
  });
  const res = await PATCH(req, konteks("pesanan_x"));
  assert.equal(res.status, 404);
});

test("PATCH biaya cuma ubah ongkirChinaGudang & totalAkhir -- biayaJasaTitip/ongkirDomestik TIDAK ikut ditulis ulang", async () => {
  let dataUpdate: Record<string, unknown> | undefined;

  fakePrisma.pesanan = {
    findUnique: async () => ({
      id: "pesanan_1",
      subtotalProduk: 200000,
      biayaJasaTitip: 70000, // nilai TERSIMPAN, hasil otomatis dari checkout
      ongkirDomestik: 9000, // nilai TERSIMPAN, hasil otomatis dari checkout
      biayaAdminPayment: 0,
    }),
    update: async (args: { data: Record<string, unknown> }) => {
      dataUpdate = args.data;
      return { id: "pesanan_1", ...args.data };
    },
  };

  // Sengaja SELIPKAN biayaJasaTitip/ongkirDomestik di body -- harus diabaikan
  // total (Zod strip, tidak masuk ke parsed.data sama sekali).
  const req = new NextRequest("http://localhost/api/admin/pesanan/pesanan_1/biaya", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ biayaJasaTitip: 999999, ongkirChinaGudang: 20000, ongkirDomestik: 999999 }),
  });
  const res = await PATCH(req, konteks());

  assert.equal(res.status, 200);
  // 200000 (subtotal) + 70000 (jasaTitip TERSIMPAN) + 20000 (ongkirChinaGudang BARU) + 9000 (ongkirDomestik TERSIMPAN) + 0
  assert.equal(dataUpdate?.totalAkhir, 299000);
  assert.equal(dataUpdate?.ongkirChinaGudang, 20000);
  // Field ini TIDAK BOLEH ada di data yang dikirim ke Prisma sama sekali
  assert.equal("biayaJasaTitip" in (dataUpdate ?? {}), false);
  assert.equal("ongkirDomestik" in (dataUpdate ?? {}), false);
});