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
    body: JSON.stringify({ biayaJasaTitip: 10000, ongkirDomestik: 15000 }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 401);
});

test("PATCH biaya pesanan tidak ditemukan ditolak 404", async () => {
  fakePrisma.pesanan = { findUnique: async () => null };

  const req = new NextRequest("http://localhost/api/admin/pesanan/pesanan_x/biaya", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ biayaJasaTitip: 10000, ongkirDomestik: 15000 }),
  });
  const res = await PATCH(req, konteks("pesanan_x"));
  assert.equal(res.status, 404);
});

test("PATCH biaya menghitung ulang totalAkhir = subtotalProduk + jasaTitip + ongkirChinaGudang(lama) + ongkirDomestik + biayaAdminPayment(lama)", async () => {
  let dataUpdate: Record<string, unknown> | undefined;

  fakePrisma.pesanan = {
    findUnique: async () => ({
      id: "pesanan_1",
      subtotalProduk: 200000,
      ongkirChinaGudang: 20000, // sudah ada dari sebelumnya (mis. dari custom PO)
      biayaAdminPayment: 0,
    }),
    update: async (args: { data: Record<string, unknown> }) => {
      dataUpdate = args.data;
      return { id: "pesanan_1", ...args.data };
    },
  };

  const req = new NextRequest("http://localhost/api/admin/pesanan/pesanan_1/biaya", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ biayaJasaTitip: 25000, ongkirDomestik: 15000 }),
  });
  const res = await PATCH(req, konteks());

  assert.equal(res.status, 200);
  // 200000 + 25000 + 20000 + 15000 + 0 = 260000
  assert.equal(dataUpdate?.totalAkhir, 260000);
  assert.equal(dataUpdate?.biayaJasaTitip, 25000);
  assert.equal(dataUpdate?.ongkirDomestik, 15000);
});