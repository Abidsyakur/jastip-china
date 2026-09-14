// letak: src/app/api/admin/pesanan/[id]/pengiriman/__tests__/pengiriman.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let PATCH: typeof import("../route").PATCH;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-pengiriman-minimal-32-karakter";
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

function konteks(id = "pesanan_1") {
  return { params: Promise.resolve({ id }) };
}

test("PATCH pengiriman: lazy-create kalau belum ada baris Pengiriman", async () => {
  let pengirimanDibuat = false;
  fakePrisma.pesanan = { findUnique: async () => ({ id: "pesanan_1" }) };
  fakePrisma.pengiriman = {
    findUnique: async () => null,
    create: async () => {
      pengirimanDibuat = true;
      return { id: "kirim_1", pesananId: "pesanan_1" };
    },
    update: async (args: { data: Record<string, unknown> }) => ({ id: "kirim_1", ...args.data }),
  };

  const req = new NextRequest("http://localhost/api/admin/pesanan/pesanan_1/pengiriman", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie: await cookieAdmin() },
    body: JSON.stringify({ kurir: "JNE", noResi: "JNE123456789" }),
  });
  const res = await PATCH(req, konteks());

  assert.equal(res.status, 200);
  assert.equal(pengirimanDibuat, true);
});