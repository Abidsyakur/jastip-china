// letak: src/app/api/notifikasi/tandai-baca/__tests__/tandai-baca.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let PATCH: typeof import("../route").PATCH;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-tandai-baca-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ PATCH } = await import("../route"));
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

test("PATCH tanpa notifikasiIds menandai SEMUA milik customer (scope tetap ke customerId sendiri)", async () => {
  let whereDipakai: Record<string, unknown> | undefined;
  fakePrisma.notifikasi = {
    updateMany: async (args: { where: Record<string, unknown> }) => {
      whereDipakai = args.where;
      return { count: 5 };
    },
  };

  const req = new NextRequest("http://localhost/api/notifikasi/tandai-baca", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify({}),
  });
  const res = await PATCH(req);
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(whereDipakai?.customerId, "cust_1");
  assert.equal("id" in (whereDipakai ?? {}), false, "tidak ada filter id -- artinya semua punya customer ini");
  assert.equal(json.jumlahDiupdate, 5);
});

test("PATCH dengan notifikasiIds TETAP di-scope ke customerId, walau ID milik orang lain diselipkan", async () => {
  let whereDipakai: Record<string, unknown> | undefined;
  fakePrisma.notifikasi = {
    updateMany: async (args: { where: Record<string, unknown> }) => {
      whereDipakai = args.where;
      return { count: 1 };
    },
  };

  const req = new NextRequest("http://localhost/api/notifikasi/tandai-baca", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify({ notifikasiIds: ["cnotif0000000000000000001"] }),
  });
  await PATCH(req);

  // customerId HARUS tetap ada di where, walau notifikasiIds dikirim --
  // updateMany-nya Prisma otomatis AND-kan semua kondisi where, jadi baris
  // yang bukan milik cust_1 tidak akan pernah ke-update walau ID-nya benar.
  assert.equal(whereDipakai?.customerId, "cust_1");
  assert.deepEqual(whereDipakai?.id, { in: ["cnotif0000000000000000001"] });
});