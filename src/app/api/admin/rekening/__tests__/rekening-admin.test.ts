// letak: src/app/api/admin/rekening/__tests__/rekening-admin.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let GET: typeof import("../route").GET;
let POST: typeof import("../route").POST;
let PATCH: typeof import("../[id]/route").PATCH;
let DELETE: typeof import("../[id]/route").DELETE;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-rekening-admin-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ GET, POST } = await import("../route"));
  ({ PATCH, DELETE } = await import("../[id]/route"));
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

function konteks(id = "rek_1") {
  return { params: Promise.resolve({ id }) };
}

test("GET admin rekening tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/admin/rekening");
  const res = await GET(req);
  assert.equal(res.status, 401);
});

test("POST rekening valid berhasil 201", async () => {
  fakePrisma.rekeningBank = {
    create: async (args: { data: Record<string, unknown> }) => ({ id: "rek_baru", ...args.data }),
  };

  const req = new NextRequest("http://localhost/api/admin/rekening", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ bank: "BNI", noRekening: "111222333", atasNama: "PT Jastip China" }),
  });
  const res = await POST(req);
  const json = await res.json();

  assert.equal(res.status, 201);
  assert.equal(json.rekening.bank, "BNI");
});

test("POST rekening tanpa nomor ditolak 400", async () => {
  const req = new NextRequest("http://localhost/api/admin/rekening", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ bank: "BNI", atasNama: "PT Jastip China" }),
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
});

test("PATCH rekening yang tidak ada ditolak 404", async () => {
  fakePrisma.rekeningBank = { updateMany: async () => ({ count: 0 }) };

  const req = new NextRequest("http://localhost/api/admin/rekening/tidak_ada", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ aktif: false }),
  });
  const res = await PATCH(req, konteks("tidak_ada"));
  assert.equal(res.status, 404);
});

test("DELETE rekening berhasil", async () => {
  fakePrisma.rekeningBank = { deleteMany: async () => ({ count: 1 }) };

  const req = new NextRequest("http://localhost/api/admin/rekening/rek_1", {
    method: "DELETE",
    headers: { cookie: await cookieAdmin() },
  });
  const res = await DELETE(req, konteks());
  assert.equal(res.status, 200);
});

test("DELETE rekening yang tidak ada ditolak 404", async () => {
  fakePrisma.rekeningBank = { deleteMany: async () => ({ count: 0 }) };

  const req = new NextRequest("http://localhost/api/admin/rekening/tidak_ada", {
    method: "DELETE",
    headers: { cookie: await cookieAdmin() },
  });
  const res = await DELETE(req, konteks("tidak_ada"));
  assert.equal(res.status, 404);
});
