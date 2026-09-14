// letak: src/app/api/admin/dashboard/statistik/__tests__/statistik.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-statistik-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
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

test("GET statistik tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/admin/dashboard/statistik");
  const res = await GET(req);
  assert.equal(res.status, 401);
});

test("GET statistik merangkum semua angka dengan benar", async () => {
  fakePrisma.pesanan = {
    groupBy: async () => [
      { statusPesanan: "MENUNGGU_PEMBAYARAN", _count: 3 },
      { statusPesanan: "SELESAI", _count: 10 },
    ],
    aggregate: async () => ({ _sum: { totalAkhir: 5000000 } }),
  };
  fakePrisma.pembayaran = { count: async () => 2 };
  fakePrisma.permintaanPo = { count: async () => 1 };
  fakePrisma.komplain = { count: async () => 4 };
  fakePrisma.produk = { count: async () => 25 };

  const req = new NextRequest("http://localhost/api/admin/dashboard/statistik", {
    headers: { cookie: await cookieAdmin() },
  });
  const res = await GET(req);
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json.pesananPerStatus, [
    { status: "MENUNGGU_PEMBAYARAN", jumlah: 3 },
    { status: "SELESAI", jumlah: 10 },
  ]);
  assert.equal(json.perluPerhatian.pembayaranMenungguVerifikasi, 2);
  assert.equal(json.perluPerhatian.poMenungguReview, 1);
  assert.equal(json.perluPerhatian.komplainBelumSelesai, 4);
  assert.equal(json.produkAktif, 25);
  assert.equal(json.omzet, 5000000);
});

test("GET statistik omzet 0 kalau belum ada pesanan sama sekali (aggregate null)", async () => {
  fakePrisma.pesanan = {
    groupBy: async () => [],
    aggregate: async () => ({ _sum: { totalAkhir: null } }),
  };
  fakePrisma.pembayaran = { count: async () => 0 };
  fakePrisma.permintaanPo = { count: async () => 0 };
  fakePrisma.komplain = { count: async () => 0 };
  fakePrisma.produk = { count: async () => 0 };

  const req = new NextRequest("http://localhost/api/admin/dashboard/statistik", {
    headers: { cookie: await cookieAdmin() },
  });
  const res = await GET(req);
  const json = await res.json();

  assert.equal(json.omzet, 0);
});