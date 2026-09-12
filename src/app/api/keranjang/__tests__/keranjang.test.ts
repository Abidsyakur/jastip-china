// letak: src/app/api/keranjang/__tests__/keranjang.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;
let POST: typeof import("../route").POST;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-keranjang-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET, POST } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

async function cookieCustomer(sub = "cust_1") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub, tipe: "customer" });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

async function cookieAdmin() {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub: "admin_1", tipe: "admin", role: "OWNER" });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

test("GET /api/keranjang tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/keranjang");
  const res = await GET(req);
  assert.equal(res.status, 401);
});

test("GET /api/keranjang oleh admin ditolak 403 (bukan customer)", async () => {
  fakePrisma.keranjang = { findUnique: async () => ({ id: "kr_1", customerId: "admin_1" }) };

  const req = new NextRequest("http://localhost/api/keranjang", {
    headers: { cookie: await cookieAdmin() },
  });
  const res = await GET(req);
  assert.equal(res.status, 403);
});

test("GET /api/keranjang menghitung hargaSatuan & subtotal dengan benar (termasuk hargaTambahan varian)", async () => {
  fakePrisma.keranjang = { findUnique: async () => ({ id: "kr_1", customerId: "cust_1" }) };
  fakePrisma.keranjangItem = {
    findMany: async () => [
      {
        id: "item_1",
        jumlah: 2,
        produk: { hargaJualIdr: 100000, gambar: [] },
        produkVarian: { hargaTambahan: 15000 },
      },
    ],
  };

  const req = new NextRequest("http://localhost/api/keranjang", {
    headers: { cookie: await cookieCustomer() },
  });
  const res = await GET(req);
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.items[0].hargaSatuan, 115000); // 100000 + 15000
  assert.equal(json.items[0].subtotal, 230000); // 115000 * 2
  assert.equal(json.total, 230000);
});

test("POST /api/keranjang produk tidak AKTIF ditolak 404", async () => {
  fakePrisma.produk = { findUnique: async () => ({ id: "p1", status: "NONAKTIF", varian: [] }) };

  const req = new NextRequest("http://localhost/api/keranjang", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ produkId: "cproduk00000000000000001", jumlah: 1 }),
  });
  const res = await POST(req);
  assert.equal(res.status, 404);
});

test("POST /api/keranjang produk punya varian tapi tidak dipilih ditolak 400", async () => {
  fakePrisma.produk = {
    findUnique: async () => ({
      id: "p1",
      status: "AKTIF",
      stok: 10,
      varian: [{ id: "v1", stok: 5 }],
    }),
  };

  const req = new NextRequest("http://localhost/api/keranjang", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ produkId: "cproduk00000000000000001", jumlah: 1 }),
  });
  const res = await POST(req);
  const json = await res.json();
  assert.equal(res.status, 400);
  assert.match(json.error, /varian/i);
});

test("POST /api/keranjang jumlah melebihi stok ditolak 409, tidak sampai create", async () => {
  let createDipanggil = false;
  fakePrisma.produk = {
    findUnique: async () => ({ id: "p1", status: "AKTIF", stok: 3, varian: [] }),
  };
  fakePrisma.keranjang = { findUnique: async () => ({ id: "kr_1", customerId: "cust_1" }) };
  fakePrisma.keranjangItem = {
    findFirst: async () => null,
    create: async () => {
      createDipanggil = true;
      return {};
    },
  };

  const req = new NextRequest("http://localhost/api/keranjang", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ produkId: "cproduk00000000000000001", jumlah: 5 }),
  });
  const res = await POST(req);

  assert.equal(res.status, 409);
  assert.equal(createDipanggil, false);
});

test("POST /api/keranjang item sudah ada digabung jumlahnya (update, bukan create baru)", async () => {
  let updateDipanggilDengan: unknown;
  fakePrisma.produk = {
    findUnique: async () => ({ id: "p1", status: "AKTIF", stok: 10, varian: [] }),
  };
  fakePrisma.keranjang = { findUnique: async () => ({ id: "kr_1", customerId: "cust_1" }) };
  fakePrisma.keranjangItem = {
    findFirst: async () => ({ id: "item_1", jumlah: 2 }),
    update: async (args: unknown) => {
      updateDipanggilDengan = args;
      return { id: "item_1", jumlah: 5 };
    },
  };

  const req = new NextRequest("http://localhost/api/keranjang", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ produkId: "cproduk00000000000000001", jumlah: 3 }),
  });
  const res = await POST(req);
  const json = await res.json();

  assert.equal(res.status, 200); // 200, bukan 201 — karena update, bukan create
  assert.equal(json.item.jumlah, 5); // 2 + 3
  assert.deepEqual((updateDipanggilDengan as { data: { jumlah: number } }).data, { jumlah: 5 });
});