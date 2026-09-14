// letak: src/app/api/permintaan-po/__tests__/permintaan-po.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let POST: typeof import("../route").POST;
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-permintaan-po-minimal-32-karakter";
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
  deskripsiSpesifikasi: "Tas selempang kulit warna coklat, ukuran sedang, merek apapun asal mirip referensi",
  jumlahDiminta: 2,
};

test("POST /api/permintaan-po tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/permintaan-po", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);
  assert.equal(res.status, 401);
});

test("POST /api/permintaan-po deskripsi terlalu pendek ditolak 400", async () => {
  const req = new NextRequest("http://localhost/api/permintaan-po", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ ...bodyValid, deskripsiSpesifikasi: "pendek" }),
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
});

test("POST /api/permintaan-po berhasil, customerId dari token", async () => {
  let dataDikirim: Record<string, unknown> | undefined;
  fakePrisma.permintaanPo = {
    create: async (args: { data: Record<string, unknown> }) => {
      dataDikirim = args.data;
      return { id: "po_1", ...args.data };
    },
  };

  const req = new NextRequest("http://localhost/api/permintaan-po", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);

  assert.equal(res.status, 201);
  assert.equal(dataDikirim?.customerId, "cust_1");
});

test("GET /api/permintaan-po cuma ambil milik customer yang login", async () => {
  let whereDipakai: Record<string, unknown> | undefined;
  fakePrisma.permintaanPo = {
    findMany: async (args: { where: Record<string, unknown> }) => {
      whereDipakai = args.where;
      return [];
    },
  };

  const req = new NextRequest("http://localhost/api/permintaan-po", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  await GET(req);

  assert.equal(whereDipakai?.customerId, "cust_1");
});