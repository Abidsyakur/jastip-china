// letak: src/app/api/upload/__tests__/upload.test.ts
import { test, mock, before } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { mockPrismaClientModule } from "@/test-utils/mock-prisma-client";

let POST: typeof import("../route").POST;

before(async () => {
  process.env.JWT_ACCESS_SECRET = "secret-testing-upload-minimal-32-karakter";
  mockPrismaClientModule();
  // "@/lib/auth" (barrel) transitif mengimpor "@/lib/db" lewat sesi.ts/reset-token.ts
  // walau route ini sendiri tidak query DB apa pun -- tetap wajib di-mock.
  mock.module("@/lib/db", { namedExports: { prisma: {} } });

  // Mock S3 SDK -- tidak ada kredensial R2 asli di lingkungan test.
  mock.module("@aws-sdk/client-s3", {
    namedExports: {
      S3Client: class {},
      PutObjectCommand: class {
        constructor(public input: unknown) {}
      },
    },
  });
  mock.module("@aws-sdk/s3-request-presigner", {
    namedExports: {
      getSignedUrl: async () => "https://r2.example.com/presigned-url-palsu",
    },
  });

  ({ POST } = await import("../route"));
});

async function cookieCustomer(sub = "cust_1") {
  const { buatAccessToken } = await import("@/lib/auth/token");
  const { COOKIE_ACCESS_TOKEN } = await import("@/lib/auth/cookie");
  const token = await buatAccessToken({ sub, tipe: "customer" });
  return `${COOKIE_ACCESS_TOKEN}=${token}`;
}

const bodyValid = {
  namaFile: "bukti.jpg",
  tipeFile: "image/jpeg",
  ukuranBytes: 1024 * 500,
  tujuan: "bukti-transfer",
};

test("POST /api/upload tanpa login ditolak 401", async () => {
  const req = new NextRequest("http://localhost/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);
  assert.equal(res.status, 401);
});

test("POST /api/upload tipe file tidak diizinkan ditolak 400", async () => {
  const req = new NextRequest("http://localhost/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ ...bodyValid, tipeFile: "application/pdf" }),
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
});

test("POST /api/upload ukuran melebihi batas ditolak 400", async () => {
  const req = new NextRequest("http://localhost/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer() },
    body: JSON.stringify({ ...bodyValid, ukuranBytes: 10 * 1024 * 1024 }),
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
});

test("POST /api/upload berhasil, mengembalikan uploadUrl dan publicUrl", async () => {
  const req = new NextRequest("http://localhost/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: await cookieCustomer("cust_1") },
    body: JSON.stringify(bodyValid),
  });
  const res = await POST(req);
  const json = await res.json();

  assert.equal(res.status, 200);
  assert.equal(json.uploadUrl, "https://r2.example.com/presigned-url-palsu");
  assert.match(json.publicUrl, /^\/bukti-transfer\/customer-cust_1\/.+\.jpg$/);
});