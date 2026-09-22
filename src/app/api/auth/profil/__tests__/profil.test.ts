// letak: src/app/api/auth/profil/__tests__/profil.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule, PrismaClientKnownRequestError } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;
let PATCH: typeof import("../route").PATCH;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-profil-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET, PATCH } = await import("../route"));
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

test("GET profil tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/auth/profil");
  const res = await GET(req);
  assert.equal(res.status, 401);
});

test("GET profil mengembalikan data sendiri (tanpa passwordHash)", async () => {
  const data = { nama: "Budi", noWa: "0812", email: "budi@x.id", tglRegistrasi: "2024-01-01" };
  fakePrisma.customer = { findUnique: async () => data };

  const req = new NextRequest("http://localhost/api/auth/profil", {
    headers: { cookie: await cookieCustomer() },
  });
  const res = await GET(req);
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json.customer, data);
});

test("PATCH profil email duplikat ditolak 409, bukan 500", async () => {
  fakePrisma.customer = {
    update: async () => {
      throw new PrismaClientKnownRequestError("unique", "P2002");
    },
  };

  const req = new NextRequest("http://localhost/api/auth/profil", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ email: "dipakai@x.id" }),
  });
  const res = await PATCH(req);
  assert.equal(res.status, 409);
});

test("PATCH profil nama terlalu pendek ditolak 400", async () => {
  const req = new NextRequest("http://localhost/api/auth/profil", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ nama: "A" }),
  });
  const res = await PATCH(req);
  assert.equal(res.status, 400);
});
