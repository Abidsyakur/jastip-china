// letak: src/app/api/admin/komplain/[id]/__tests__/komplain-admin.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let PATCH: typeof import("../route").PATCH;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-komplain-admin-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ PATCH } = await import("../route"));
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

function konteks(id = "komplain_1") {
  return { params: Promise.resolve({ id }) };
}

test("PATCH tindak lanjut ditolak 409 kalau komplain sudah SELESAI (guard atomik)", async () => {
  fakePrisma.komplain = { findUnique: async () => ({ id: "komplain_1", status: "SELESAI" }) };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({ komplain: { updateMany: async () => ({ count: 0 }) } });

  const req = new NextRequest("http://localhost/api/admin/komplain/komplain_1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "DIPROSES", catatan: "Dicek lagi" }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 409);
});

test("PATCH tindak lanjut berhasil: KomplainLog ditambah, LogAktivitas tercatat", async () => {
  let logKomplainDibuat = false;
  let logAktivitasDibuat: Record<string, unknown> | undefined;

  fakePrisma.komplain = { findUnique: async () => ({ id: "komplain_1", status: "DIAJUKAN" }) };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      komplain: { updateMany: async () => ({ count: 1 }) },
      komplainLog: {
        create: async () => {
          logKomplainDibuat = true;
          return {};
        },
      },
      logAktivitas: {
        create: async (args: { data: Record<string, unknown> }) => {
          logAktivitasDibuat = args.data;
          return {};
        },
      },
    });

  const req = new NextRequest("http://localhost/api/admin/komplain/komplain_1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "DIPROSES", catatan: "Sedang dicek admin" }),
  });
  const res = await PATCH(req, konteks());

  assert.equal(res.status, 200);
  assert.equal(logKomplainDibuat, true);
  assert.equal((logAktivitasDibuat as { aksi: string })?.aksi, "TINDAK_LANJUT_KOMPLAIN");
});

test("PATCH tindak lanjut status SELESAI tanpa solusi ditolak 400 (Zod)", async () => {
  const req = new NextRequest("http://localhost/api/admin/komplain/komplain_1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "SELESAI", catatan: "Selesai diganti" }), // tanpa solusi
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 400);
});