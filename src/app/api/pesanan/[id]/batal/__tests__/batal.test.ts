// letak: src/app/api/pesanan/[id]/batal/__tests__/batal.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let POST: typeof import("../route").POST;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-batal-pesanan-minimal-32-karakter";
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

function konteks(id = "pesanan_1") {
  return { params: Promise.resolve({ id }) };
}

function pesananDasar(override: Record<string, unknown> = {}) {
  return {
    id: "pesanan_1",
    customerId: "cust_1",
    noInvoice: "INV-1",
    statusPesanan: "MENUNGGU_PEMBAYARAN",
    item: [{ produkId: "produk_1", produkVarianId: null, jumlah: 2 }],
    ...override,
  };
}

function reqBatal(sub = "cust_1") {
  return async () =>
    new NextRequest("http://localhost/api/pesanan/pesanan_1/batal", {
      method: "POST",
      headers: { cookie: await cookieCustomer(sub) },
    });
}

test("POST batal tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/batal", { method: "POST" });
  const res = await POST(req, konteks());
  assert.equal(res.status, 401);
});

test("POST batal pesanan milik customer lain ditolak 404", async () => {
  fakePrisma.pesanan = { findUnique: async () => pesananDasar({ customerId: "cust_LAIN" }) };

  const res = await POST(await reqBatal()(), konteks());
  assert.equal(res.status, 404);
});

test("POST batal ditolak 409 kalau pesanan sudah diproses admin", async () => {
  fakePrisma.pesanan = { findUnique: async () => pesananDasar({ statusPesanan: "DIPROSES_ADMIN" }) };

  const res = await POST(await reqBatal()(), konteks());
  const json = await res.json();
  assert.equal(res.status, 409);
  assert.match(json.error, /diproses admin/i);
});

test("POST batal berhasil: status DIBATALKAN, bayar aktif KADALUARSA, stok kembali, notif dibuat", async () => {
  const panggilan: {
    pesananUpdate: unknown[];
    pembayaranUpdate: unknown[];
    produkUpdate: unknown[];
    statusLog: unknown[];
    notifikasi: unknown[];
  } = {
    pesananUpdate: [],
    pembayaranUpdate: [],
    produkUpdate: [],
    statusLog: [],
    notifikasi: [],
  };
  fakePrisma.pesanan = { findUnique: async () => pesananDasar() };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      pesanan: {
        updateMany: async (args: unknown) => {
          panggilan.pesananUpdate.push(args);
          return { count: 1 };
        },
      },
      pesananStatusLog: {
        create: async (args: unknown) => {
          panggilan.statusLog.push(args);
          return {};
        },
      },
      pembayaran: {
        updateMany: async (args: unknown) => {
          panggilan.pembayaranUpdate.push(args);
          return { count: 1 };
        },
      },
      produk: {
        updateMany: async (args: unknown) => {
          panggilan.produkUpdate.push(args);
          return { count: 1 };
        },
      },
      notifikasi: {
        create: async (args: unknown) => {
          panggilan.notifikasi.push(args);
          return {};
        },
      },
    });

  const res = await POST(await reqBatal()(), konteks());

  assert.equal(res.status, 200);
  assert.equal(panggilan.pesananUpdate.length, 1);
  assert.deepEqual(
    (panggilan.pesananUpdate[0] as { data: unknown }).data,
    { statusPesanan: "DIBATALKAN" }
  );
  assert.equal(panggilan.pembayaranUpdate.length, 1);
  assert.deepEqual((panggilan.pembayaranUpdate[0] as { data: unknown }).data, {
    status: "KADALUARSA",
  });
  // kembalikanStok untuk item tanpa varian -> produk stok increment
  assert.equal(panggilan.produkUpdate.length, 1);
  assert.deepEqual((panggilan.produkUpdate[0] as { data: unknown }).data, {
    stok: { increment: 2 },
  });
  assert.equal(panggilan.statusLog.length, 1);
  assert.equal(panggilan.notifikasi.length, 1);
});

test("POST batal kalah race (status berubah di tengah jalan) ditolak 409", async () => {
  fakePrisma.pesanan = { findUnique: async () => pesananDasar() };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      pesanan: { updateMany: async () => ({ count: 0 }) }, // guard atomik kalah
      pesananStatusLog: { create: async () => ({}) },
      pembayaran: { updateMany: async () => ({ count: 0 }) },
      notifikasi: { create: async () => ({}) },
    });

  const res = await POST(await reqBatal()(), konteks());
  assert.equal(res.status, 409);
});
