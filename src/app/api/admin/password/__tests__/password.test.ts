// letak: src/app/api/admin/password/__tests__/password.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakePrisma: any = {};
let POST: typeof import("../route").POST;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-ganti-password-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: fakePrisma } });
  ({ POST } = await import("../route"));
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

function reqGanti(body: unknown, cookie?: string) {
  return new NextRequest("http://localhost/api/admin/password", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
    body: JSON.stringify(body),
  });
}

test("POST ganti password tanpa login ditolak 401", async () => {
  const res = await POST(reqGanti({ passwordLama: "x", passwordBaru: "baru12345" }));
  assert.equal(res.status, 401);
});

test("POST ganti password baru terlalu pendek ditolak 400", async () => {
  const res = await POST(
    reqGanti({ passwordLama: "lama12345", passwordBaru: "pendek" }, await cookieAdmin())
  );
  assert.equal(res.status, 400);
});

test("POST ganti password lama salah ditolak 400", async () => {
  const { hashPassword } = await import("@/lib/auth/password");
  fakePrisma.admin = {
    findUnique: async () => ({ passwordHash: await hashPassword("benar12345") }),
    update: async () => ({}),
  };

  const res = await POST(
    reqGanti({ passwordLama: "salah12345", passwordBaru: "baru12345" }, await cookieAdmin())
  );
  const json = await res.json();
  assert.equal(res.status, 400);
  assert.match(json.error, /saat ini salah/i);
});

test("POST ganti password benar: hash baru tersimpan", async () => {
  const { hashPassword } = await import("@/lib/auth/password");
  const lama = await hashPassword("lama12345");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let dataTersimpan: any;
  fakePrisma.admin = {
    findUnique: async () => ({ passwordHash: lama }),
    update: async (args: { data: unknown }) => {
      dataTersimpan = args.data;
      return {};
    },
  };

  const res = await POST(
    reqGanti({ passwordLama: "lama12345", passwordBaru: "baru12345" }, await cookieAdmin())
  );

  assert.equal(res.status, 200);
  assert.ok(dataTersimpan.passwordHash !== lama, "hash harus berubah");
});
