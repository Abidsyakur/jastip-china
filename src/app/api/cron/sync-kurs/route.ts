// letak: src/app/api/cron/sync-kurs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * Sync kurs RMB-IDR otomatis untuk n8n/cron-job.org (GET dengan Bearer
 * CRON_SECRET, jalan sekali sehari). Fetch kurs dari open.er-api.com
 * (gratis, tanpa API key), lalu catat baris KursMaster baru —
 * APPEND-ONLY, pola sama dengan input manual admin.
 *
 * Guard:
 * - Validasi "wajar" (1000-10000): kalau API kurs rusak/mengembalikan
 *   angka ngaco, tidak boleh langsung merusak harga semua produk.
 * - Skip kalau kurs baru sama (selisih < 1) dengan kurs aktif —
 *   jangan bikin baris duplikat tiap hari untuk nilai yang tidak
 *   berubah (riwayat kurs jadi bersih, cuma berisi perubahan nyata).
 * - adminId dipakai dari akun OWNER (sistem, bukan manusia) —
 *   kalau OWNER tidak ada, gagal 500 dengan pesan jelas.
 */
const KURS_API_URL = "https://open.er-api.com/v6/latest/CNY";
const KURS_MIN_WAJAR = 1000;
const KURS_MAKS_WAJAR = 10000;
const SELISIH_MIN = 1;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  let kursBaru: number;
  try {
    const res = await fetch(KURS_API_URL, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      return NextResponse.json(
        { error: `API kurs gagal (${res.status}), sync dilewati` },
        { status: 502 }
      );
    }
    const data: unknown = await res.json();
    const rate = (data as { rates?: { IDR?: unknown } }).rates?.IDR;
    kursBaru = Number(rate);
  } catch {
    return NextResponse.json(
      { error: "Gagal menghubungi API kurs, sync dilewati" },
      { status: 502 }
    );
  }

  // Guard nilai wajar — API rusak tidak boleh merusak harga.
  if (!Number.isFinite(kursBaru) || kursBaru < KURS_MIN_WAJAR || kursBaru > KURS_MAKS_WAJAR) {
    return NextResponse.json(
      { error: `Kurs dari API tidak wajar (${kursBaru}), sync dilewati` },
      { status: 502 }
    );
  }

  const kursAktif = await prisma.kursMaster.findFirst({ orderBy: { dibuatPada: "desc" } });
  if (kursAktif && Math.abs(Number(kursAktif.kursRmbIdr) - kursBaru) < SELISIH_MIN) {
    return NextResponse.json({
      message: "Kurs tidak berubah, tidak ada baris baru",
      kursRmbIdr: kursBaru,
      berubah: false,
    });
  }

  // adminId dari akun OWNER — sistem yang mencatat, bukan manusia.
  const owner = await prisma.admin.findFirst({ where: { role: "OWNER" } });
  if (!owner) {
    return NextResponse.json(
      { error: "Akun OWNER tidak ditemukan, tidak bisa mencatat kurs" },
      { status: 500 }
    );
  }

  const kurs = await prisma.kursMaster.create({
    data: { adminId: owner.id, kursRmbIdr: kursBaru },
  });

  return NextResponse.json({
    message: "Kurs baru dicatat dari API",
    kursRmbIdr: kursBaru,
    sebelumnya: kursAktif ? Number(kursAktif.kursRmbIdr) : null,
    berubah: true,
  });
}
