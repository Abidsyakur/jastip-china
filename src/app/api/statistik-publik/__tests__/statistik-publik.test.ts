// letak: src/app/api/statistik-publik/__tests__/statistik-publik.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-statistik-publik-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

test("GET statistik-publik bisa diakses tanpa login", async () => {
  fakePrisma.pesanan = {
    count: async () => 1200,
    groupBy: async () => [{ customerId: "c1" }, { customerId: "c2" }],
  };

  const req = new NextRequest("http://localhost/api/statistik-publik");
  const res = await GET();
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.pesananTerkirim, 1200);
  assert.equal(json.customerAktif, 2);
});

test("GET statistik-publik nol kalau belum ada data", async () => {
  fakePrisma.pesanan = {
    count: async () => 0,
    groupBy: async () => [],
  };

  const req = new NextRequest("http://localhost/api/statistik-publik");
  const res = await GET();
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.pesananTerkirim, 0);
  assert.equal(json.customerAktif, 0);
});
