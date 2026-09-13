// letak: src/app/api/pesanan/[id]/pembayaran/__tests__/pembayaran-retry.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let POST: typeof import("../route").POST;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-retry-bayar-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ POST } = await import("../route"));
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

function pesananDasar(override: Record<string, unknown> = {}) {
  return {
    id: "pesanan_1",
    customerId: "cust_1",
    statusPesanan: "MENUNGGU_PEMBAYARAN",
    totalAkhir: 200000,
    item: [
      { produkId: "produk_1", produkVarianId: null, jumlah: 2, namaItemSnapshot: "Tas Import" },
    ],
    pembayaran: [{ status: "KADALUARSA" }], // percobaan sebelumnya sudah kadaluarsa
    ...override,
  };
}

function konteks(id = "pesanan_1") {
  return { params: Promise.resolve({ id }) };
}

test("POST retry tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/pembayaran", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ metode: "transfer_bca" }),
  });
  const res = await POST(req, konteks());
  assert.equal(res.status, 401);
});

test("POST retry untuk pesanan milik customer lain ditolak 404", async () => {
  fakePrisma.pesanan = { findUnique: async () => pesananDasar({ customerId: "cust_LAIN" }) };

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/pembayaran", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify({ metode: "transfer_bca" }),
  });
  const res = await POST(req, konteks());
  assert.equal(res.status, 404);
});

test("POST retry ditolak 409 kalau pesanan sudah tidak MENUNGGU_PEMBAYARAN", async () => {
  fakePrisma.pesanan = { findUnique: async () => pesananDasar({ statusPesanan: "DIPROSES_ADMIN" }) };

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/pembayaran", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify({ metode: "transfer_bca" }),
  });
  const res = await POST(req, konteks());
  assert.equal(res.status, 409);
});

test("POST retry ditolak 409 kalau masih ada percobaan bayar AKTIF (belum kadaluarsa/ditolak)", async () => {
  fakePrisma.pesanan = {
    findUnique: async () => pesananDasar({ pembayaran: [{ status: "MENUNGGU_VERIFIKASI" }] }),
  };

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/pembayaran", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify({ metode: "transfer_bca" }),
  });
  const res = await POST(req, konteks());
  const json = await res.json();
  assert.equal(res.status, 409);
  assert.match(json.error, /aktif/i);
});

test("POST retry stok tidak cukup ditolak 409, pembayaran.create tidak dipanggil", async () => {
  let pembayaranDibuat = false;
  fakePrisma.pesanan = { findUnique: async () => pesananDasar() };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      produk: { updateMany: async () => ({ count: 0 }) }, // stok gagal
      pembayaran: {
        create: async () => {
          pembayaranDibuat = true;
          return {};
        },
      },
    });

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/pembayaran", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify({ metode: "transfer_bca" }),
  });
  const res = await POST(req, konteks());

  assert.equal(res.status, 409);
  assert.equal(pembayaranDibuat, false);
});

test("POST retry berhasil: jumlahBayar SELALU dari pesanan.totalAkhir, bukan dari body client", async () => {
  let dataPembayaran: Record<string, unknown> | undefined;
  fakePrisma.pesanan = { findUnique: async () => pesananDasar({ totalAkhir: 200000 }) };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      produk: { updateMany: async () => ({ count: 1 }) },
      pembayaran: {
        create: async (args: { data: Record<string, unknown> }) => {
          dataPembayaran = args.data;
          return { id: "bayar_baru", ...args.data };
        },
      },
    });

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/pembayaran", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    // sengaja selipkan jumlahBayar palsu — skema Zod tidak punya field ini
    // sama sekali jadi otomatis diabaikan, tapi tetap dites eksplisit di sini
    body: JSON.stringify({ metode: "transfer_bca", jumlahBayar: 1 }),
  });
  const res = await POST(req, konteks());

  assert.equal(res.status, 201);
  assert.equal(dataPembayaran?.jumlahBayar, 200000, "jumlahBayar harus dari pesanan.totalAkhir, bukan body");
  assert.equal(dataPembayaran?.status, "MENUNGGU_BUKTI");
});