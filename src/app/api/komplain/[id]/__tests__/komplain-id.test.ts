// letak: src/app/api/komplain/[id]/__tests__/komplain-id.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-komplain-id-minimal-32-karakter";
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

function konteks(id = "komplain_1") {
  return { params: Promise.resolve({ id }) };
}

test("GET komplain milik customer lain ditolak 404", async () => {
  fakePrisma.komplain = {
    findUnique: async () => ({
      id: "komplain_1",
      pesananItem: { pesanan: { customerId: "cust_LAIN" } },
      log: [],
    }),
  };

  const req = new NextRequest("http://localhost/api/komplain/komplain_1", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  const res = await GET(req, konteks());
  assert.equal(res.status, 404);
});

test("GET komplain berhasil untuk pemilik yang benar, termasuk log", async () => {
  fakePrisma.komplain = {
    findUnique: async () => ({
      id: "komplain_1",
      pesananItem: { pesanan: { customerId: "cust_1" } },
      log: [{ id: "log_1", catatan: "Sedang diproses" }],
    }),
  };

  const req = new NextRequest("http://localhost/api/komplain/komplain_1", {
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  const res = await GET(req, konteks());
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.komplain.log.length, 1);
});