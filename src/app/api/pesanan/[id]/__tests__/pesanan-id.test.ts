// letak: src/app/api/pesanan/[id]/__tests__/pesanan-id.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-pesanan-id-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
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

test("GET pesanan milik customer lain ditolak 404", async () => {
  fakePrisma.pesanan = { findUnique: async () => ({ id: "pesanan_1", customerId: "cust_LAIN" }) };

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  const res = await GET(req, konteks());
  assert.equal(res.status, 404);
});

test("GET pesanan yang tidak ada sama sekali juga 404", async () => {
  fakePrisma.pesanan = { findUnique: async () => null };

  const req = new NextRequest("http://localhost/api/pesanan/tidak_ada", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  const res = await GET(req, konteks("tidak_ada"));
  assert.equal(res.status, 404);
});

test("GET pesanan berhasil untuk pemilik yang benar", async () => {
  fakePrisma.pesanan = {
    findUnique: async () => ({ id: "pesanan_1", customerId: "cust_1", noInvoice: "INV-1" }),
  };

  const req = new NextRequest("http://localhost/api/pesanan/pesanan_1", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  const res = await GET(req, konteks());
  assert.equal(res.status, 200);
});