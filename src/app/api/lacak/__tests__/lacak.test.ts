// letak: src/app/api/lacak/__tests__/lacak.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-lacak-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

test("GET lacak bisa diakses tanpa login", async () => {
  const data = {
    noInvoice: "INV-20240120-ABCD1234",
    statusPesanan: "DIPROSES_ADMIN",
    tglPesan: "2024-01-20",
    statusLog: [],
    pengiriman: null,
  };
  fakePrisma.pesanan = { findUnique: async () => data };

  const req = new NextRequest("http://localhost/api/lacak?invoice=INV-20240120-ABCD1234");
  const res = await GET(req);
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json.pesanan, data);
  // Respons tidak boleh bocorkan nominal/identitas
  assert.ok(!("totalAkhir" in json.pesanan));
  assert.ok(!("customer" in json.pesanan));
});

test("GET lacak invoice tidak dikenal ditolak 404", async () => {
  fakePrisma.pesanan = { findUnique: async () => null };

  const req = new NextRequest("http://localhost/api/lacak?invoice=SALAH");
  const res = await GET(req);
  assert.equal(res.status, 404);
});

test("GET lacak tanpa query ditolak 400", async () => {
  const req = new NextRequest("http://localhost/api/lacak");
  const res = await GET(req);
  assert.equal(res.status, 400);
});
