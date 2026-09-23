// letak: src/app/api/health/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * Health check untuk uptime monitoring (n8n ping tiap 5 menit).
 * Sengaja endpoint paling ringan: cuma SELECT 1 ke DB — bukti aplikasi
 * DAN koneksi database hidup. Kalau DB down, ini return 503 supaya
 * monitor bisa bedakan "app hidup tapi DB mati" dari "semua mati".
 * Tanpa data sensitif — aman publik.
 */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", db: "up", waktu: new Date().toISOString() });
  } catch {
    return NextResponse.json(
      { status: "degraded", db: "down", waktu: new Date().toISOString() },
      { status: 503 }
    );
  }
}
