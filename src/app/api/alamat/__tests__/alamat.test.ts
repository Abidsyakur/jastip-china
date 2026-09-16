// letak: src/app/api/alamat/__tests__/alamat.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;
let POST: typeof import("../route").POST;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-alamat-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET, POST } = await import("../route"));
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

const alamatValid = {
  label: "Rumah",
  penerima: "Budi Santoso",
  noTelp: "081234567890",
  alamatLengkap: "Jl. Merdeka No. 10, RT 01 RW 02",
  kota: "Jakarta Selatan",
  provinsi: "DKI Jakarta",
  kodePos: "12345",
};

test("GET /api/alamat tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/alamat");
  const res = await GET(req);
  assert.equal(res.status, 401);
});

test("GET /api/alamat cuma ambil alamat milik customer yang login", async () => {
  let whereDipakai: Record<string, unknown> | undefined;
  fakePrisma.alamat = {
    findMany: async (args: { where: Record<string, unknown> }) => {
      whereDipakai = args.where;
      return [];
    },
  };

  const req = new NextRequest("http://localhost/api/alamat", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  await GET(req);

  assert.equal(whereDipakai?.customerId, "cust_1");
});

test("POST /api/alamat dengan data valid berhasil, customerId diambil dari token bukan dari body", async () => {
  let dataDikirim: Record<string, unknown> | undefined;
  fakePrisma.alamat = {
    create: async (args: { data: Record<string, unknown> }) => {
      dataDikirim = args.data;
      return { id: "alamat_1", ...args.data };
    },
  };

  const req = new NextRequest("http://localhost/api/alamat", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    // sengaja selipkan customerId palsu di body — harus DIABAIKAN, bukan dipakai
    body: JSON.stringify({ ...alamatValid, customerId: "cust_ORANG_LAIN" }),
  });
  const res = await POST(req);

  assert.equal(res.status, 201);
  assert.equal(dataDikirim?.customerId, "cust_1", "customerId harus dari token, bukan dari body request");
});

test("POST /api/alamat dengan kode pos tidak valid ditolak 400", async () => {
  const req = new NextRequest("http://localhost/api/alamat", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ ...alamatValid, kodePos: "abc" }),
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
});