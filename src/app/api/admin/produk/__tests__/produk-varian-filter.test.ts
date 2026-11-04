// letak: src/app/api/admin/produk/__tests__/produk-varian-filter.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

const fakePrisma: any = {};
let GET: typeof import("../route").GET;
let POST: typeof import("../route").POST;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-produk-varian-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET, POST } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

async function cookieAdmin(role: "OWNER" | "STAFF" = "OWNER") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub: "admin_test_1", tipe: "admin", role });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

test("POST admin/produk: varian dan gambar dipetakan dengan benar (urutan gambar = indeks)", async () => {
  let dataDikirim: any;
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      produk: {
        create: async (args: { data: any }) => {
          dataDikirim = args.data;
          return { id: "produk_1", ...args.data, gambar: [], varian: [] };
        },
      },
      logAktivitas: { create: async () => ({}) },
    });

  const body = {
    kategoriId: "ckategoriid000000000001",
    namaProduk: "Sepatu Import",
    hargaAsalRmb: 100,
    kurs: 2200,
    hargaJualIdr: 250000,
    beratGram: 800,
    linkSumber: "https://taobao.com/item/456",
    gambarUrls: ["https://cdn.example.com/a.jpg", "https://cdn.example.com/b.jpg"],
    varian: [
      { namaVarian: "Ukuran 40 - Hitam", stok: 5, hargaTambahan: 10000 },
      { namaVarian: "Ukuran 42 - Putih", stok: 3, hargaTambahan: 0 },
    ],
  };
  const req = new NextRequest("http://localhost/api/admin/produk", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify(body),
  });

  const res = await POST(req);

  assert.equal(res.status, 201);
  assert.deepEqual(dataDikirim.varian.create, [
    { namaVarian: "Ukuran 40 - Hitam", stok: 5, hargaTambahan: 10000 },
    { namaVarian: "Ukuran 42 - Putih", stok: 3, hargaTambahan: 0 },
  ]);
  assert.deepEqual(dataDikirim.gambar.create, [
    { urlGambar: "https://cdn.example.com/a.jpg", urutan: 0 },
    { urlGambar: "https://cdn.example.com/b.jpg", urutan: 1 },
  ]);
});

test("GET admin/produk: filter kategoriId dan status masuk ke WHERE (count memakai filter yang sama)", async () => {
  let whereItems: any;
  let whereCount: any;
  fakePrisma.produk = {
    findMany: async (a: any) => {
      whereItems = a.where;
      return [];
    },
    count: async (a: any) => {
      whereCount = a.where;
      return 0;
    },
  };
  const req = new NextRequest(
    "http://localhost/api/admin/produk?kategoriId=ckategoriid000000000001&status=AKTIF",
    { method: "GET", headers: { cookie: await cookieAdmin() } }
  );

  const res = await GET(req);

  assert.equal(res.status, 200);
  assert.deepEqual(whereItems, { kategoriId: "ckategoriid000000000001", status: "AKTIF" });
  assert.deepEqual(whereCount, whereItems);
});