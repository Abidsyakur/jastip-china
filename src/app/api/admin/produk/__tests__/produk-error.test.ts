// letak: src/app/api/admin/produk/__tests__/produk-error.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

const fakePrisma: any = {};
let GET: typeof import("../route").GET;
let POST: typeof import("../route").POST;
let AppError: typeof import("@/lib/http-error").AppError;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-produk-error-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET, POST } = await import("../route"));
  ({ AppError } = await import("@/lib/http-error"));
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

const bodyValid = {
  kategoriId: "ckategoriid000000000001",
  namaProduk: "Tas Import Premium",
  hargaAsalRmb: 100,
  kurs: 2200,
  hargaJualIdr: 250000,
  beratGram: 500,
  linkSumber: "https://taobao.com/item/123",
  gambarUrls: ["https://cdn.example.com/a.jpg"],
  varian: [],
};

async function reqPost() {
  return new NextRequest("http://localhost/api/admin/produk", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify(bodyValid),
  });
}

test("POST admin/produk: AppError dari proses simpan diubah jadi respons dengan status miliknya", async () => {
  fakePrisma.$transaction = async () => {
    throw new AppError("kategori tidak ditemukan", 404);
  };

  const res = await POST(await reqPost());

  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { error: "kategori tidak ditemukan" });
});

test("POST admin/produk: error tak terduga dilempar ulang (supaya tercatat sebagai 500)", async () => {
  fakePrisma.$transaction = async () => {
    throw new Error("koneksi database putus");
  };

  await assert.rejects(async () => POST(await reqPost()), /koneksi database putus/);
});

test("GET admin/produk: error tak terduga dilempar ulang (supaya tercatat sebagai 500)", async () => {
  fakePrisma.produk = {
    findMany: async () => {
      throw new Error("query gagal");
    },
    count: async () => 0,
  };
  const req = new NextRequest("http://localhost/api/admin/produk", {
    method: "GET",
    headers: { cookie: await cookieAdmin() },
  });

  await assert.rejects(async () => GET(req), /query gagal/);
});