// letak: src/app/api/admin/pembayaran/[id]/verifikasi/__tests__/verifikasi.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let PATCH: typeof import("../route").PATCH;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-verifikasi-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ PATCH } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

async function cookieAdmin(role: "OWNER" | "STAFF" = "OWNER") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub: "admin_1", tipe: "admin", role });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

function konteks(id = "bayar_1") {
  return { params: Promise.resolve({ id }) };
}

function pembayaranDasar() {
  return {
    id: "bayar_1",
    pesananId: "pesanan_1",
    pesanan: {
      noInvoice: "INV-1",
      customerId: "cust_1",
      customer: { noWa: "6281234567890" },
      item: [{ produkId: "produk_1", produkVarianId: null, jumlah: 2 }],
    },
  };
}

test("PATCH verifikasi tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/admin/pembayaran/bayar_1/verifikasi", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "TERVERIFIKASI" }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 401);
});

test("PATCH verifikasi pembayaran tidak ditemukan ditolak 404", async () => {
  fakePrisma.pembayaran = { findUnique: async () => null };

  const req = new NextRequest("http://localhost/api/admin/pembayaran/bayar_x/verifikasi", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "TERVERIFIKASI" }),
  });
  const res = await PATCH(req, konteks("bayar_x"));
  assert.equal(res.status, 404);
});

test("PATCH verifikasi ditolak 409 kalau sudah diproses duluan (guard atomik, count 0 -- race dengan cron)", async () => {
  fakePrisma.pembayaran = { findUnique: async () => pembayaranDasar() };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({ pembayaran: { updateMany: async () => ({ count: 0 }) } });

  const req = new NextRequest("http://localhost/api/admin/pembayaran/bayar_1/verifikasi", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "TERVERIFIKASI" }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 409);
});

test("PATCH verifikasi TERVERIFIKASI: pesanan pindah status DIPROSES_ADMIN, stok TIDAK dikembalikan", async () => {
  let statusPesananBaru: string | undefined;
  let produkUpdateDipanggil = false;
  let logAktivitasDibuat: Record<string, unknown> | undefined;

  fakePrisma.pembayaran = { findUnique: async () => pembayaranDasar() };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      pembayaran: { updateMany: async () => ({ count: 1 }) },
      pesanan: {
        update: async (args: { data: { statusPesanan: string } }) => {
          statusPesananBaru = args.data.statusPesanan;
          return {};
        },
      },
      pesananStatusLog: { create: async () => ({}) },
      produk: {
        updateMany: async () => {
          produkUpdateDipanggil = true;
          return { count: 1 };
        },
      },
      logAktivitas: {
        create: async (args: { data: Record<string, unknown> }) => {
          logAktivitasDibuat = args.data;
          return {};
        },
      },
      notifikasi: { create: async () => ({}) },
    });

  const req = new NextRequest("http://localhost/api/admin/pembayaran/bayar_1/verifikasi", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "TERVERIFIKASI" }),
  });
  const res = await PATCH(req, konteks());

  assert.equal(res.status, 200);
  assert.equal(statusPesananBaru, "DIPROSES_ADMIN");
  assert.equal(produkUpdateDipanggil, false, "stok TIDAK boleh dikembalikan kalau pembayaran diterima");
  assert.equal((logAktivitasDibuat as { aksi: string })?.aksi, "VERIFIKASI_PEMBAYARAN");
});

test("PATCH verifikasi DITOLAK: stok DIKEMBALIKAN, pesanan TIDAK diubah statusnya", async () => {
  let stokDikembalikanDengan: unknown;
  let pesananUpdateDipanggil = false;

  fakePrisma.pembayaran = { findUnique: async () => pembayaranDasar() };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      pembayaran: { updateMany: async () => ({ count: 1 }) },
      pesanan: {
        update: async () => {
          pesananUpdateDipanggil = true;
          return {};
        },
      },
      produk: {
        updateMany: async (args: unknown) => {
          stokDikembalikanDengan = args;
          return { count: 1 };
        },
      },
      logAktivitas: { create: async () => ({}) },
      notifikasi: { create: async () => ({}) },
    });

  const req = new NextRequest("http://localhost/api/admin/pembayaran/bayar_1/verifikasi", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "DITOLAK", catatanAdmin: "Bukti transfer tidak jelas" }),
  });
  const res = await PATCH(req, konteks());

  assert.equal(res.status, 200);
  assert.equal(pesananUpdateDipanggil, false, "status Pesanan tidak boleh berubah kalau pembayaran ditolak");
  assert.deepEqual(stokDikembalikanDengan, {
    where: { id: "produk_1" },
    data: { stok: { increment: 2 } },
  });
});