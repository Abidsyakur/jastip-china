// letak: src/app/api/admin/dashboard/produk-terlaris/__tests__/produk-terlaris.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-produk-terlaris-minimal-32-karakter";
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

async function cookieCustomer(sub = "cust_1") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub, tipe: "customer" });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

test("GET produk-terlaris tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/admin/dashboard/produk-terlaris");
  const res = await GET(req);
  assert.equal(res.status, 401);
});

test("GET produk-terlaris oleh customer ditolak 403", async () => {
  const req = new NextRequest("http://localhost/api/admin/dashboard/produk-terlaris", {
    headers: { cookie: await cookieCustomer() },
  });
  const res = await GET(req);
  assert.equal(res.status, 403);
});

test("GET produk-terlaris menggabung agregat dengan info produk", async () => {
  fakePrisma.pesananItem = {
    groupBy: async () => [
      { produkId: "p1", _sum: { jumlah: 12 } },
      { produkId: "p2", _sum: { jumlah: 7 } },
    ],
  };
  fakePrisma.produk = {
    findMany: async () => [
      { id: "p1", namaProduk: "Tas Backpack", hargaJualIdr: 282000, kategori: { namaKategori: "Tas" } },
      { id: "p2", namaProduk: "Kaos Oversized", hargaJualIdr: 35250, kategori: { namaKategori: "Fashion" } },
    ],
  };

  const req = new NextRequest("http://localhost/api/admin/dashboard/produk-terlaris", {
    headers: { cookie: await cookieAdmin() },
  });
  const res = await GET(req);
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json.items, [
    { produkId: "p1", namaProduk: "Tas Backpack", kategori: "Tas", hargaJualIdr: 282000, totalTerjual: 12 },
    { produkId: "p2", namaProduk: "Kaos Oversized", kategori: "Fashion", hargaJualIdr: 35250, totalTerjual: 7 },
  ]);
});

test("GET produk-terlaris kosong kalau belum ada yang terjual", async () => {
  fakePrisma.pesananItem = { groupBy: async () => [] };
  fakePrisma.produk = { findMany: async () => [] };

  const req = new NextRequest("http://localhost/api/admin/dashboard/produk-terlaris", {
    headers: { cookie: await cookieAdmin() },
  });
  const res = await GET(req);
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json.items, []);
});

test("GET produk-terlaris limit tidak valid ditolak 400", async () => {
  const req = new NextRequest("http://localhost/api/admin/dashboard/produk-terlaris?limit=999", {
    headers: { cookie: await cookieAdmin() },
  });
  const res = await GET(req);
  assert.equal(res.status, 400);
});
