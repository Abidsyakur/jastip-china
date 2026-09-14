// letak: src/app/api/admin/permintaan-po/[id]/review/__tests__/review.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let PATCH: typeof import("../route").PATCH;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-review-po-minimal-32-karakter";
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

function konteks(id = "po_1") {
  return { params: Promise.resolve({ id }) };
}

test("PATCH review tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/admin/permintaan-po/po_1/review", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "DITOLAK", catatanAdmin: "Tidak jelas" }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 401);
});

test("PATCH review PO tidak ditemukan ditolak 404", async () => {
  fakePrisma.permintaanPo = { findUnique: async () => null };

  const req = new NextRequest("http://localhost/api/admin/permintaan-po/po_x/review", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "DITOLAK", catatanAdmin: "Tidak jelas" }),
  });
  const res = await PATCH(req, konteks("po_x"));
  assert.equal(res.status, 404);
});

test("PATCH review ditolak 409 kalau sudah pernah direview (guard atomik)", async () => {
  fakePrisma.permintaanPo = {
    findUnique: async () => ({ id: "po_1", status: "DIKONFIRMASI_HARGA" }),
  };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({ permintaanPo: { updateMany: async () => ({ count: 0 }) } });

  const req = new NextRequest("http://localhost/api/admin/permintaan-po/po_1/review", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "DITOLAK", catatanAdmin: "Tidak jelas" }),
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 409);
});

test("PATCH review DIKONFIRMASI_HARGA berhasil, tercatat di LogAktivitas", async () => {
  let dataUpdate: Record<string, unknown> | undefined;
  let logDibuat: Record<string, unknown> | undefined;

  fakePrisma.permintaanPo = { findUnique: async () => ({ id: "po_1", status: "MENUNGGU_REVIEW" }) };
  fakePrisma.$transaction = async (fn: (tx: unknown) => unknown) =>
    fn({
      permintaanPo: {
        updateMany: async (args: { data: Record<string, unknown> }) => {
          dataUpdate = args.data;
          return { count: 1 };
        },
      },
      logAktivitas: {
        create: async (args: { data: Record<string, unknown> }) => {
          logDibuat = args.data;
          return {};
        },
      },
    });

  const req = new NextRequest("http://localhost/api/admin/permintaan-po/po_1/review", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "DIKONFIRMASI_HARGA", estimasiHarga: 150000, estimasiOngkir: 50000 }),
  });
  const res = await PATCH(req, konteks());

  assert.equal(res.status, 200);
  assert.equal(dataUpdate?.status, "DIKONFIRMASI_HARGA");
  assert.equal(dataUpdate?.estimasiHarga, 150000);
  assert.equal((logDibuat as { aksi: string })?.aksi, "REVIEW_PO");
});

test("PATCH review tanpa estimasiHarga saat DIKONFIRMASI_HARGA ditolak 400 (Zod)", async () => {
  const req = new NextRequest("http://localhost/api/admin/permintaan-po/po_1/review", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ status: "DIKONFIRMASI_HARGA" }), // tidak ada estimasiHarga/estimasiOngkir
  });
  const res = await PATCH(req, konteks());
  assert.equal(res.status, 400);
});