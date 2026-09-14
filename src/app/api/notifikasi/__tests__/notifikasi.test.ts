// letak: src/app/api/notifikasi/__tests__/notifikasi.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-notifikasi-minimal-32-karakter";
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

test("GET /api/notifikasi tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/notifikasi");
  const res = await GET(req);
  assert.equal(res.status, 401);
});

test("GET /api/notifikasi cuma ambil milik customer yang login", async () => {
  let whereFindMany: Record<string, unknown> | undefined;
  let whereCount: Record<string, unknown> | undefined;

  fakePrisma.notifikasi = {
    findMany: async (args: { where: Record<string, unknown> }) => {
      whereFindMany = args.where;
      return [];
    },
    count: async (args: { where: Record<string, unknown> }) => {
      whereCount = args.where;
      return 0;
    },
  };

  const req = new NextRequest("http://localhost/api/notifikasi", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  await GET(req);

  assert.equal(whereFindMany?.customerId, "cust_1");
  assert.equal(whereCount?.customerId, "cust_1");
  assert.equal(whereCount?.statusBaca, false);
});