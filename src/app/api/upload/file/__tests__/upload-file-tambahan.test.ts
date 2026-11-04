// letak: src/app/api/upload/file/__tests__/upload-file-tambahan.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

const fakeR2: { unggah?: (...a: any[]) => Promise<void> } = {};
let POST: typeof import("../route").POST;

const fakeRateLimit = { diizinkan: true, identifierTerakhir: "" };

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-upload-tambahan-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: {} } });
  mock.module("@/lib/r2", {
    namedExports: {
      unggahBufferKeR2: async (...a: never[]) => fakeR2.unggah?.(...a),
    },
  });
  mock.module("@/lib/auth/rate-limit", {
    namedExports: {
      cekRateLimitUpload: async (identifier: string) => {
        fakeRateLimit.identifierTerakhir = identifier;
        return { diizinkan: fakeRateLimit.diizinkan };
      },
    },
  });
  ({ POST } = await import("../route"));
});

beforeEach(() => {
  delete fakeR2.unggah;
  fakeRateLimit.diizinkan = true;
  fakeRateLimit.identifierTerakhir = "";
});

async function cookieCustomer(sub = "cust_1") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub, tipe: "customer" });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

function reqFile(file: File | null, tujuan = "bukti-transfer", cookie?: string) {
  const form = new FormData();
  if (file) form.append("file", file);
  form.append("tujuan", tujuan);
  return new NextRequest("http://localhost/api/upload/file", {
    method: "POST",
    headers: cookie ? { cookie } : {},
    body: form,
  });
}

test("POST upload/file: batas harian tercapai ditolak 429 dan R2 tidak dipanggil", async () => {
  fakeRateLimit.diizinkan = false;
  let r2Dipanggil = false;
  fakeR2.unggah = async () => {
    r2Dipanggil = true;
  };

  const res = await POST(
    reqFile(new File(["x"], "a.png", { type: "image/png" }), "bukti-transfer", await cookieCustomer())
  );

  assert.equal(res.status, 429);
  assert.equal(r2Dipanggil, false);
});

test("POST upload/file: identifier rate limit = tipe:id pengguna", async () => {
  fakeR2.unggah = async () => {};

  await POST(
    reqFile(new File(["x"], "a.png", { type: "image/png" }), "bukti-transfer", await cookieCustomer("cust_77"))
  );

  assert.equal(fakeRateLimit.identifierTerakhir, "customer:cust_77");
});

test("POST upload/file: tanpa file ditolak 400", async () => {
  const res = await POST(reqFile(null, "bukti-transfer", await cookieCustomer()));

  assert.equal(res.status, 400);
});

test("POST upload/file: file lebih dari 5MB ditolak 400 dan R2 tidak dipanggil", async () => {
  let r2Dipanggil = false;
  fakeR2.unggah = async () => {
    r2Dipanggil = true;
  };
  const besar = new File([new Uint8Array(5 * 1024 * 1024 + 1)], "besar.png", { type: "image/png" });

  const res = await POST(reqFile(besar, "bukti-transfer", await cookieCustomer()));

  assert.equal(res.status, 400);
  assert.equal(r2Dipanggil, false);
});

test("POST upload/file: key = tujuan/tipe-id/uuid.ekstensi, buffer dan tipe konten diteruskan ke R2", async () => {
  let key = "";
  let isi: unknown;
  let tipe = "";
  fakeR2.unggah = async (k: string, buf: Buffer, t: string) => {
    key = k;
    isi = buf;
    tipe = t;
  };

  const res = await POST(
    reqFile(new File(["isi-gambar"], "bukti.png", { type: "image/png" }), "bukti-transfer", await cookieCustomer("cust_1"))
  );
  const json = await res.json();

  assert.equal(res.status, 201);
  assert.match(key, /^bukti-transfer\/customer-cust_1\/[0-9a-f-]{36}\.png$/);
  assert.ok(Buffer.isBuffer(isi));
  assert.equal((isi as Buffer).toString(), "isi-gambar");
  assert.equal(tipe, "image/png");
  assert.equal(json.publicUrl, `/api/file/${key}`);
});

test("POST upload/file: ekstensi mengikuti tipe file (webp -> .webp, jpeg -> .jpg)", async () => {
  const keys: string[] = [];
  fakeR2.unggah = async (k: string) => {
    keys.push(k);
  };
  const cookie = await cookieCustomer();

  const resWebp = await POST(reqFile(new File(["x"], "a.webp", { type: "image/webp" }), "bukti-transfer", cookie));
  const resJpeg = await POST(reqFile(new File(["x"], "a.jpg", { type: "image/jpeg" }), "bukti-transfer", cookie));

  assert.equal(resWebp.status, 201);
  assert.equal(resJpeg.status, 201);
  assert.ok(keys[0]?.endsWith(".webp"));
  assert.ok(keys[1]?.endsWith(".jpg"));
});

test("POST upload/file: R2 gagal (error tak terduga) dilempar ulang supaya tercatat 500", async () => {
  fakeR2.unggah = async () => {
    throw new Error("R2 down");
  };

  await assert.rejects(
    async () =>
      POST(reqFile(new File(["x"], "a.png", { type: "image/png" }), "bukti-transfer", await cookieCustomer())),
    /R2 down/
  );
});