// letak: src/app/api/admin/log-aktivitas/__tests__/log-aktivitas.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-log-aktivitas-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET } = await import("../route"));
});

beforeEach(() => {
  for (const key of Object.keys(fakePrisma)) delete fakePrisma[key];
});

async function cookieAdmin() {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub: "admin_1", tipe: "admin", role: "OWNER" });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

const barisLog = [
  { id: "log_1", aksi: "VERIFIKASI_PEMBAYARAN", admin: { nama: "Owner", email: "admin@x.id" } },
];

test("GET log-aktivitas tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/admin/log-aktivitas");
  const res = await GET(req);
  assert.equal(res.status, 401);
});

test("GET log-aktivitas mengembalikan items + total + pagination", async () => {
  fakePrisma.logAktivitas = {
    findMany: async () => barisLog,
    count: async () => 1,
  };

  const req = new NextRequest("http://localhost/api/admin/log-aktivitas", {
    headers: { cookie: await cookieAdmin() },
  });
  const res = await GET(req);
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(json.items, barisLog);
  assert.equal(json.total, 1);
  assert.equal(json.page, 1);
  assert.equal(json.limit, 20);
});

test("GET log-aktivitas filter aksi diteruskan ke where", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let whereDiterima: any;
  fakePrisma.logAktivitas = {
    findMany: async (args: { where: unknown }) => {
      whereDiterima = args.where;
      return [];
    },
    count: async () => 0,
  };

  const req = new NextRequest("http://localhost/api/admin/log-aktivitas?aksi=VERIFIKASI", {
    headers: { cookie: await cookieAdmin() },
  });
  const res = await GET(req);

  assert.equal(res.status, 200);
  assert.deepEqual(whereDiterima, { aksi: { contains: "VERIFIKASI", mode: "insensitive" } });
});
