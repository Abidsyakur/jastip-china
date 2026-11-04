// letak: src/app/api/admin/produk/__tests__/produk-get.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-admin-produk-get-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

// ⚠ SESUAIKAN: salin helper cookie admin dari test admin Anda yang sudah ada.
// Payload token admin (mis. field peran OWNER/STAFF) belum saya lihat.
async function cookieAdmin(role: "OWNER" | "STAFF" = "OWNER") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub: "admin_test_1", tipe: "admin", role });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

function reqGet(query = "", cookie?: string) {
  return new NextRequest(`http://localhost/api/admin/produk${query}`, {
    method: "GET",
    headers: cookie ? { cookie } : {},
  });
}

function pasangProduk(rekam: { findMany?: any; count?: any } = {}) {
  const panggilan: { findMany?: any; count?: any } = {};
  fakePrisma.produk = {
    findMany: async (a: any) => {
      panggilan.findMany = a;
      return rekam.findMany ?? [];
    },
    count: async (a: any) => {
      panggilan.count = a;
      return rekam.count ?? 0;
    },
  };
  return panggilan;
}

test("GET admin/produk tanpa login ditolak 401", async () => {
  pasangProduk();
  const res = await GET(reqGet());
  assert.equal(res.status, 401);
});

test("GET admin/produk default: page 1, limit 20, urut terbaru", async () => {
  const items = [{ id: "p1" }, { id: "p2" }];
  const panggilan = pasangProduk({ findMany: items, count: 2 });

  const res = await GET(reqGet("", await cookieAdmin()));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json.items, items);
  assert.equal(json.total, 2);
  assert.equal(json.page, 1);
  assert.equal(json.limit, 20);
  assert.equal(panggilan.findMany.skip, 0);
  assert.equal(panggilan.findMany.take, 20);
  assert.deepEqual(panggilan.findMany.orderBy, { dibuatPada: "desc" });
  assert.deepEqual(panggilan.findMany.where, {});
});

test("GET admin/produk: pencarian nama case-insensitive + sort termurah + paginasi", async () => {
  const panggilan = pasangProduk();

  const res = await GET(reqGet("?cari=baju&sort=termurah&page=3&limit=5", await cookieAdmin()));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.page, 3);
  assert.equal(json.limit, 5);
  assert.deepEqual(panggilan.findMany.where.namaProduk, { contains: "baju", mode: "insensitive" });
  assert.deepEqual(panggilan.findMany.orderBy, { hargaJualIdr: "asc" });
  assert.equal(panggilan.findMany.skip, 10); // (3 - 1) * 5
  assert.equal(panggilan.findMany.take, 5);
  // count harus memakai filter yang sama supaya total konsisten dengan items
  assert.deepEqual(panggilan.count.where, panggilan.findMany.where);
});

test("GET admin/produk: sort termahal", async () => {
  const panggilan = pasangProduk();

  await GET(reqGet("?sort=termahal", await cookieAdmin()));

  assert.deepEqual(panggilan.findMany.orderBy, { hargaJualIdr: "desc" });
});

test("GET admin/produk: query tidak valid ditolak 400", async () => {
  pasangProduk();

  const res = await GET(reqGet("?page=abc", await cookieAdmin()));

  assert.equal(res.status, 400);
});