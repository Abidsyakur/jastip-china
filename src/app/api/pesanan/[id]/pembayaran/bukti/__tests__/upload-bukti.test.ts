// letak: src/app/api/pesanan/[id]/pembayaran/bukti/__tests__/upload-bukti.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let PATCH: typeof import("../route").PATCH;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-upload-bukti-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ PATCH } = await import("../route"));
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

const bodyValid = {
  buktiUrl: "https://cdn.example.com/bukti.jpg",
  tglBayar: new Date().toISOString(),
};

test("PATCH upload bukti untuk pesanan bukan milik sendiri ditolak 404", async () => {
  fakePrisma.pesanan = {
    findUnique: async () => ({ id: "pesanan_1", customerId: "cust_LAIN", pembayaran: [] }),
  };

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/pembayaran/bukti", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 404);
});

test("PATCH upload bukti kalau belum ada percobaan bayar sama sekali ditolak 404", async () => {
  fakePrisma.pesanan = { findUnique: async () => ({ id: "pesanan_1", customerId: "cust_1", pembayaran: [] }) };

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/pembayaran/bukti", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 404);
});

test("PATCH upload bukti gagal (guard atomik, status sudah bukan MENUNGGU_BUKTI) ditolak 409", async () => {
  fakePrisma.pesanan = {
    findUnique: async () => ({
      id: "pesanan_1",
      customerId: "cust_1",
      pembayaran: [{ id: "bayar_1", status: "KADALUARSA" }],
    }),
  };
  fakePrisma.pembayaran = { updateMany: async () => ({ count: 0 }) };

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/pembayaran/bukti", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 409);
});

test("PATCH upload bukti berhasil untuk percobaan yang masih MENUNGGU_BUKTI", async () => {
  let dataDikirim: Record<string, unknown> | undefined;
  fakePrisma.pesanan = {
    findUnique: async () => ({
      id: "pesanan_1",
      customerId: "cust_1",
      pembayaran: [{ id: "bayar_1", status: "MENUNGGU_BUKTI" }],
    }),
  };
  fakePrisma.pembayaran = {
    updateMany: async (args: { data: Record<string, unknown> }) => {
      dataDikirim = args.data;
      return { count: 1 };
    },
    findUnique: async () => ({ id: "bayar_1", status: "MENUNGGU_VERIFIKASI" }),
  };

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1/pembayaran/bukti", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await PATCH(req, konteks());

  assert.equal(res.status, 200);
  assert.equal(dataDikirim?.status, "MENUNGGU_VERIFIKASI");
});