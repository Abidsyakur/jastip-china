// letak: src/app/api/produk/__tests__/produk-publik.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

test("GET /api/produk selalu filter status AKTIF, walau ada query lain", async () => {
  let whereDipakai: Record<string, unknown> | undefined;

  fakePrisma.produk = {
    findMany: async (args: { where: Record<string, unknown> }) => {
      whereDipakai = args.where;
      return [];
    },
    count: async () => 0,
  };

  // Sengaja coba selipkan "status" di query string — endpoint publik TIDAK
  // boleh punya cara untuk lihat produk NONAKTIF lewat parameter apa pun.
  const req = new NextRequest("http://localhost/api/produk?cari=tas&status=NONAKTIF");
  const res = await GET(req);

  assert.equal(res.status, 200);
  assert.equal(whereDipakai?.status, "AKTIF", "status di WHERE harus selalu AKTIF, tidak bisa di-override");
});

test("GET /api/produk dengan query tidak valid (page negatif) ditolak 400", async () => {
  const req = new NextRequest("http://localhost/api/produk?page=-1");
  const res = await GET(req);

  assert.equal(res.status, 400);
});