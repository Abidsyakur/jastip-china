// letak: src/app/api/upload/file/__tests__/upload-file.test.ts
import { test, mock, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

// GANTI sesuai lokasi file yang berisi cekRateLimitUpload
const PATH_RATE_LIMIT = "@/lib/auth/rate-limit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakeR2: { unggah?: (...a: any[]) => Promise<void> } = {};
let POST: typeof import("../route").POST;

// Status rate limit bisa diubah per test (default: diizinkan)
const fakeRateLimit = { diizinkan: true };

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-upload-file-minimal-32-karakter";
  mockPrismaClientModule();
  mock.module("@/lib/db", { namedExports: { prisma: {} } });
  mock.module("@/lib/r2", {
    namedExports: {
      unggahBufferKeR2: async (...a: never[]) => fakeR2.unggah?.(...a),
    },
  });
  // Mock rate limiter supaya test tidak menyentuh Upstash/Redis sungguhan
  mock.module(PATH_RATE_LIMIT, {
    namedExports: {
      cekRateLimitUpload: async () => ({ diizinkan: fakeRateLimit.diizinkan }),
    },
  });
  ({ POST } = await import("../route"));
});

beforeEach(() => {
  delete fakeR2.unggah;
  fakeRateLimit.diizinkan = true;
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

test("POST upload/file tanpa login ditolak 401", async () => {
  const res = await POST(reqFile(new File(["x"], "a.png", { type: "image/png" })));
  assert.equal(res.status, 401);
});

test("POST upload/file tipe tidak diizinkan ditolak 400", async () => {
  const res = await POST(
    reqFile(new File(["x"], "a.pdf", { type: "application/pdf" }), "bukti-transfer", await cookieCustomer())
  );
  assert.equal(res.status, 400);
});

test("POST upload/file berhasil: kembali publicUrl same-origin", async () => {
  let keyTersimpan = "";
  fakeR2.unggah = async (key: string) => {
    keyTersimpan = key;
  };

  const res = await POST(
    reqFile(new File(["isi-gambar"], "bukti.png", { type: "image/png" }), "bukti-transfer", await cookieCustomer())
  );
  const json = await res.json();

  assert.equal(res.status, 201);
  assert.match(json.publicUrl, /^\/api\/file\/bukti-transfer\//);
  assert.ok(keyTersimpan.endsWith(".png"));
});