// letak: src/app/api/komplain/__tests__/komplain.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let POST: typeof import("../route").POST;
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-komplain-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ POST, GET } = await import("../route"));
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

const bodyValid = {
  pesananItemId: "citem000000000000000001",
  alasan: "BARANG_RUSAK",
  buktiFoto: "https://cdn.example.com/rusak.jpg",
};

test("POST /api/komplain tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/komplain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);
  assert.equal(res.status, 401);
});

test("POST /api/komplain untuk item pesanan milik customer LAIN ditolak 404", async () => {
  fakePrisma.pesananItem = {
    findUnique: async () => ({ id: "citem000000000000000001", pesanan: { customerId: "cust_LAIN" } }),
  };

  const req = new NextRequest("http://localhost/api/komplain", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);
  assert.equal(res.status, 404);
});

test("POST /api/komplain tanpa buktiFoto ditolak 400 (wajib sesuai spesifikasi)", async () => {
  const { buktiFoto, ...tanpaBukti } = bodyValid;
  void buktiFoto;

  const req = new NextRequest("http://localhost/api/komplain", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify(tanpaBukti),
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
});

test("POST /api/komplain berhasil untuk pemilik item yang benar", async () => {
  fakePrisma.pesananItem = {
    findUnique: async () => ({ id: "citem000000000000000001", pesanan: { customerId: "cust_1" } }),
  };
  fakePrisma.komplain = {
    create: async (args: { data: Record<string, unknown> }) => ({ id: "komplain_1", ...args.data }),
  };

  const req = new NextRequest("http://localhost/api/komplain", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);
  assert.equal(res.status, 201);
});

test("GET /api/komplain di-scope ke pesananItem.pesanan.customerId milik sendiri", async () => {
  let whereDipakai: Record<string, unknown> | undefined;
  fakePrisma.komplain = {
    findMany: async (args: { where: Record<string, unknown> }) => {
      whereDipakai = args.where;
      return [];
    },
  };

  const req = new NextRequest("http://localhost/api/komplain", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  await GET(req);

  assert.deepEqual(whereDipakai, { pesananItem: { pesanan: { customerId: "cust_1" } } });
});