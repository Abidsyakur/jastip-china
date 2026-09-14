// letak: src/app/api/admin/pesanan/[id]/status/__tests__/status.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let PATCH: typeof import("../route").PATCH;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-status-pesanan-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ PATCH } = await import("../route"));
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

function konteks(id = "pesanan_1") {
  return { params: Promise.resolve({ id }) };
}

test("PATCH status ditolak 409 kalau pesanan sudah status TERMINAL (SELESAI)", async () => {
  fakePrisma.pesanan = { findUnique: async () => ({ id: "pesanan_1", statusPesanan: "SELESAI" }) };

  const req = new NextRequest("http://localhost/api/admin/pesanan/pesanan_1/status", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "DIPROSES_ADMIN" }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 409);
});

test("PATCH status ditolak 409 kalau pesanan sudah DIBATALKAN (terminal juga)", async () => {
  fakePrisma.pesanan = { findUnique: async () => ({ id: "pesanan_1", statusPesanan: "DIBATALKAN" }) };

  const req = new NextRequest("http://localhost/api/admin/pesanan/pesanan_1/status", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "SELESAI" }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 409);
});

test("PATCH status berhasil: PesananStatusLog ditambah, LogAktivitas tercatat", async () => {
  let statusLogDibuat: Record<string, unknown> | undefined;
  let logAktivitasDibuat: Record<string, unknown> | undefined;

  fakePrisma.pesanan = {
    findUnique: async () => ({
      id: "pesanan_1",
      statusPesanan: "DIPROSES_ADMIN",
      noInvoice: "INV-1",
      customer: { noWa: "6281234567890" },
    }),
  };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      pesanan: { update: async () => ({}) },
      pesananStatusLog: {
        create: async (args: { data: Record<string, unknown> }) => {
          statusLogDibuat = args.data;
          return {};
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

  const req = new NextRequest("http://localhost/api/admin/pesanan/pesanan_1/status", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "DIKONSOLIDASI_KIRIM" }),
  });
  const res = await PATCH(req, konteks());

  assert.equal(res.status, 200);
  assert.equal(statusLogDibuat?.status, "DIKONSOLIDASI_KIRIM");
  assert.equal((logAktivitasDibuat as { aksi: string })?.aksi, "UBAH_STATUS_PESANAN");
});