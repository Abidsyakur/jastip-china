// letak: src/app/api/rekening/__tests__/rekening.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-rekening-publik-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

test("GET rekening publik bisa diakses tanpa login, cuma yang aktif", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let whereDiterima: any;
  const aktif = [
    { id: "r1", bank: "BCA", noRekening: "1234567890", atasNama: "PT Jastip China", aktif: true },
  ];
  fakePrisma.rekeningBank = {
    findMany: async (args: { where: unknown }) => {
      whereDiterima = args.where;
      return aktif;
    },
  };

  const req = new NextRequest("http://localhost/api/rekening");
  const res = await GET();
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json.items, aktif);
  assert.deepEqual(whereDiterima, { aktif: true });
});
