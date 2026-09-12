// letak: src/app/api/keranjang/[itemId]/__tests__/keranjang-item.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let PATCH: typeof import("../route").PATCH;
let DELETE: typeof import("../route").DELETE;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-keranjang-item-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ PATCH, DELETE } = await import("../route"));
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

function konteks(itemId = "item_1") {
  return { params: Promise.resolve({ itemId }) };
}

test("PATCH item milik CUSTOMER LAIN ditolak 404 (bukan 403 — tidak boleh konfirmasi item itu ada)", async () => {
  fakePrisma.keranjangItem = {
    findUnique: async () => ({
      id: "item_1",
      keranjang: { customerId: "cust_LAIN" }, // bukan cust_1 yang login
      produk: { stok: 10 },
      produkVarian: null,
    }),
  };

  const req = new NextRequest("http://localhost/api/keranjang/item_1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify({ jumlah: 2 }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 404);
});

test("PATCH item tidak ada sama sekali juga 404 (respons sama dengan kasus bukan pemilik)", async () => {
  fakePrisma.keranjangItem = { findUnique: async () => null };

  const req = new NextRequest("http://localhost/api/keranjang/item_x", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ jumlah: 2 }),
  });
  const res = await PATCH(req, konteks("item_x"));
  assert.equal(res.status, 404);
});

test("PATCH jumlah melebihi stok ditolak 409", async () => {
  fakePrisma.keranjangItem = {
    findUnique: async () => ({
      id: "item_1",
      keranjang: { customerId: "cust_1" },
      produk: { stok: 3 },
      produkVarian: null,
    }),
  };

  const req = new NextRequest("http://localhost/api/keranjang/item_1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ jumlah: 10 }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 409);
});

test("PATCH berhasil untuk pemilik yang benar, dalam batas stok", async () => {
  fakePrisma.keranjangItem = {
    findUnique: async () => ({
      id: "item_1",
      keranjang: { customerId: "cust_1" },
      produk: { stok: 10 },
      produkVarian: null,
    }),
    update: async () => ({ id: "item_1", jumlah: 4 }),
  };

  const req = new NextRequest("http://localhost/api/keranjang/item_1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ jumlah: 4 }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 200);
});

test("DELETE item milik customer lain ditolak 404, tidak sampai panggil delete", async () => {
  let deleteDipanggil = false;
  fakePrisma.keranjangItem = {
    findUnique: async () => ({ id: "item_1", keranjang: { customerId: "cust_LAIN" } }),
    delete: async () => {
      deleteDipanggil = true;
    },
  };

  const req = new NextRequest("http://localhost/api/keranjang/item_1", {
    method: "DELETE",
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  const res = await DELETE(req, konteks());

  assert.equal(res.status, 404);
  assert.equal(deleteDipanggil, false);
});

test("DELETE berhasil untuk pemilik yang benar", async () => {
  fakePrisma.keranjangItem = {
    findUnique: async () => ({ id: "item_1", keranjang: { customerId: "cust_1" } }),
    delete: async () => ({ id: "item_1" }),
  };

  const req = new NextRequest("http://localhost/api/keranjang/item_1", {
    method: "DELETE",
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  const res = await DELETE(req, konteks());
  assert.equal(res.status, 200);
});