// letak: src/app/api/admin/pesanan/[id]/pengiriman/__tests__/pengiriman-error.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

const fake: { update?: (...a: any[]) => Promise<unknown> } = {};
let PATCH: typeof import("../route").PATCH;
let AppError: typeof import("@/lib/http-error").AppError;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-pengiriman-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: {} } });
  mock.module("@/lib/pesanan", {
    namedExports: { updatePengiriman: async (...a: never[]) => fake.update?.(...a) },
  });
  ({ PATCH } = await import("../route"));
  ({ AppError } = await import("@/lib/http-error"));
});

beforeEach(() => {
  delete fake.update;
});

async function cookieAdmin(role: "OWNER" | "STAFF" = "OWNER") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub: "admin_test_1", tipe: "admin", role });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

const konteks = (id = "pesanan_1") => ({ params: Promise.resolve({ id }) });

async function reqPatch(body: unknown, cookie?: string) {
  return new NextRequest("http://localhost/api/admin/pesanan/pesanan_1/pengiriman", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const bodyValid = { kurir: "JNE", noResi: "JNE123456789" };

test("PATCH pengiriman tanpa login ditolak 401", async () => {
  const res = await PATCH(await reqPatch(bodyValid), konteks());

  assert.equal(res.status, 401);
});

test("PATCH pengiriman: berhasil, id dari URL dan data tervalidasi diteruskan ke updatePengiriman", async () => {
  let argId: unknown;
  let argData: unknown;
  fake.update = async (id: string, data: unknown) => {
    argId = id;
    argData = data;
    return { id: "kirim_1", ...(data as object) };
  };

  const res = await PATCH(await reqPatch(bodyValid, await cookieAdmin()), konteks("pesanan_9"));
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(argId, "pesanan_9");
  assert.deepEqual(argData, bodyValid);
  assert.equal(json.pengiriman.noResi, "JNE123456789");
});

test("PATCH pengiriman: STAFF juga boleh (bukan khusus OWNER)", async () => {
  fake.update = async () => ({ id: "kirim_1" });

  const res = await PATCH(await reqPatch(bodyValid, await cookieAdmin("STAFF")), konteks());

  assert.equal(res.status, 200);
});

test("PATCH pengiriman: body tidak valid ditolak 400 dan updatePengiriman tidak dipanggil", async () => {
  let dipanggil = false;
  fake.update = async () => {
    dipanggil = true;
    return {};
  };

  const res = await PATCH(await reqPatch("bukan json", await cookieAdmin()), konteks());

  assert.equal(res.status, 400);
  assert.equal(dipanggil, false);
});

test("PATCH pengiriman: AppError (mis. pesanan tidak ditemukan) diubah jadi respons dengan statusnya", async () => {
  fake.update = async () => {
    throw new AppError("Pesanan tidak ditemukan", 404);
  };

  const res = await PATCH(await reqPatch(bodyValid, await cookieAdmin()), konteks());

  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { error: "Pesanan tidak ditemukan" });
});

test("PATCH pengiriman: error tak terduga dilempar ulang supaya tercatat 500", async () => {
  fake.update = async () => {
    throw new Error("database putus");
  };

  await assert.rejects(
    async () => PATCH(await reqPatch(bodyValid, await cookieAdmin()), konteks()),
    /database putus/
  );
});