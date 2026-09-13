// letak: src/app/api/alamat/[id]/__tests__/alamat-id.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule, PrismaClientKnownRequestError } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let PATCH: typeof import("../route").PATCH;
let DELETE: typeof import("../route").DELETE;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-alamat-id-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ PATCH, DELETE } = await import("../route"));
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

function konteks(id = "alamat_1") {
  return { params: Promise.resolve({ id }) };
}

test("PATCH alamat milik customer lain ditolak 404", async () => {
  fakePrisma.alamat = {
    findUnique: async () => ({ id: "alamat_1", customerId: "cust_LAIN" }),
  };

  const req = new NextRequest("http://localhost/api/alamat/alamat_1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify({ kota: "Bandung" }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 404);
});

test("PATCH berhasil untuk pemilik yang benar", async () => {
  fakePrisma.alamat = {
    findUnique: async () => ({ id: "alamat_1", customerId: "cust_1" }),
    update: async () => ({ id: "alamat_1", kota: "Bandung" }),
  };

  const req = new NextRequest("http://localhost/api/alamat/alamat_1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify({ kota: "Bandung" }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 200);
});

test("DELETE alamat yang sudah dipakai pesanan (FK P2003) ditolak 409, bukan 500", async () => {
  fakePrisma.alamat = {
    findUnique: async () => ({ id: "alamat_1", customerId: "cust_1" }),
    delete: async () => {
      throw new PrismaClientKnownRequestError("FK constraint", "P2003");
    },
  };

  const req = new NextRequest("http://localhost/api/alamat/alamat_1", {
    method: "DELETE",
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  const res = await DELETE(req, konteks());
  const json = await res.json();

  assert.equal(res.status, 409);
  assert.match(json.error, /pesanan/i);
});

test("DELETE alamat milik customer lain ditolak 404, tidak sampai panggil delete", async () => {
  let deleteDipanggil = false;
  fakePrisma.alamat = {
    findUnique: async () => ({ id: "alamat_1", customerId: "cust_LAIN" }),
    delete: async () => {
      deleteDipanggil = true;
    },
  };

  const req = new NextRequest("http://localhost/api/alamat/alamat_1", {
    method: "DELETE",
    headers: { cookie: await cookieCustomer("cust_1") },
  });
  const res = await DELETE(req, konteks());

  assert.equal(res.status, 404);
  assert.equal(deleteDipanggil, false);
});