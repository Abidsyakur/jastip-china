// letak: src/app/api/cron/reminder-pembayaran/route.ts
import { NextRequest, NextResponse } from "next/server";
import { StatusPesanan } from "@prisma/client";
import { prisma } from "@/lib/db";
import { kirimNotifikasiWa } from "@/lib/notifikasi";
import { rupiah } from "@/lib/format";
import { wajibCron } from "@/lib/auth/cron";

/**
 * Reminder pembayaran untuk n8n/cron-job.org (GET dengan Bearer
 * CRON_SECRET, jalan tiap 15 menit). Cari pesanan MENUNGGU_PEMBAYARAN
 * yang deadline-nya (tglPesan + 24 jam) hampir habis: sisa 12 jam dan
 * sisa 2 jam — dua titik reminder, bukan spam tiap tick.
 *
 * Anti-spam: tiap reminder yang TERKIRIM ditandai baris Notifikasi
 * (tipe REMINDER_12H / REMINDER_2H). Cron berikutnya cek dulu tanda
 * itu — pesanan yang sudah direminder di titik yang sama dilewati.
 *
 * URUTAN: WA dikirim DULU, tanda dicatat SESUDAH WA benar-benar terkirim.
 * Kalau WA gagal (Fonnte down, token kosong, perangkat terputus), tanda
 * TIDAK dicatat sehingga cron berikutnya mencoba lagi selama pesanan masih
 * di jendela waktunya. Konsekuensinya: kalau WA terkirim tapi penyimpanan
 * tanda gagal, pesan bisa terkirim dua kali (lebih baik daripada tidak
 * terkirim sama sekali). Gagal kirim tidak melempar error ke pemanggil;
 * cukup dicatat di daftar `gagal` pada respons.
 */
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
const JAM_KEDALUWARSA_PEMBAYARAN = Number(process.env.PEMBAYARAN_KEDALUWARSA_JAM ?? 24);

interface Kandidat {
  pesananId: string;
  customerId: string;
  noWa: string;
  nama: string;
  noInvoice: string;
  totalAkhir: number;
  tipe: string;
  sisaJam: number;
  sisaMenit: number;
}

export async function GET(req: NextRequest) {
  const tolak = wajibCron(req);
  if (tolak) return tolak;

  const deadlineMs = JAM_KEDALUWARSA_PEMBAYARAN * 60 * 60 * 1000;
  const sekarang = Date.now();

  // Semua pesanan yang masih nunggu bayar — volume kecil (pesanan aktif
  // saja), tidak perlu filter waktu di WHERE karena sisa jam dihitung
  // per-pesanan dari tglPesan masing-masing.
  const menunggu = await prisma.pesanan.findMany({
    where: { statusPesanan: StatusPesanan.MENUNGGU_PEMBAYARAN },
    include: { customer: { select: { id: true, noWa: true, nama: true } } },
  });

  // Kandidat: sisa waktu di jendela reminder (12h atau 2h).
  const kandidat: Kandidat[] = [];
  for (const p of menunggu) {
    const sisa = new Date(p.tglPesan).getTime() + deadlineMs - sekarang;
    const sisaJam = Math.floor(sisa / (60 * 60 * 1000));
    const sisaMenit = Math.floor((sisa % (60 * 60 * 1000)) / (60 * 1000));
    let tipe: string | null = null;
    if (sisa > 11 * 60 * 60 * 1000 && sisa <= 12 * 60 * 60 * 1000) tipe = "REMINDER_12H";
    if (sisa > 1 * 60 * 60 * 1000 && sisa <= 2 * 60 * 60 * 1000) tipe = "REMINDER_2H";
    if (!tipe) continue;
    kandidat.push({
      pesananId: p.id,
      customerId: p.customer.id,
      noWa: p.customer.noWa,
      nama: p.customer.nama,
      noInvoice: p.noInvoice,
      totalAkhir: Number(p.totalAkhir),
      tipe,
      sisaJam,
      sisaMenit,
    });
  }

  // Anti-spam: buang kandidat yang sudah direminder di titik yang sama.
  if (kandidat.length > 0) {
    const sudahTerkirim = await prisma.notifikasi.findMany({
      where: {
        pesananId: { in: kandidat.map((k) => k.pesananId) },
        tipe: { in: ["REMINDER_12H", "REMINDER_2H"] },
      },
      select: { pesananId: true, tipe: true },
    });
    const tanda = new Set(sudahTerkirim.map((s) => `${s.pesananId}:${s.tipe}`));
    const tersisa = kandidat.filter((k) => !tanda.has(`${k.pesananId}:${k.tipe}`));
    kandidat.length = 0;
    kandidat.push(...tersisa);
  }

  // Kirim WA dulu; tanda dicatat HANYA bila WA benar-benar terkirim.
  let dikirim = 0;
  const gagal: string[] = [];
  for (const k of kandidat) {
    const pesan =
      `Halo ${k.nama}, pengingat: pesanan ${k.noInvoice} sebesar ${rupiah(k.totalAkhir)} ` +
      `belum dibayar. Sisa waktu pembayaran ${k.sisaJam} jam ${k.sisaMenit} menit ` +
      `sebelum pesanan dibatalkan otomatis.`;
    try {
      const terkirim = await kirimNotifikasiWa(k.noWa, pesan);
      if (!terkirim) {
        gagal.push(k.noInvoice);
        continue;
      }
      await prisma.notifikasi.create({
        data: { customerId: k.customerId, pesananId: k.pesananId, pesan, tipe: k.tipe },
      });
      dikirim++;
    } catch {
      gagal.push(k.noInvoice);
    }
  }

  const sekarangWib = new Date(sekarang + WIB_OFFSET_MS).toISOString().slice(0, 10);
  return NextResponse.json({
    tanggal: sekarangWib,
    dicek: menunggu.length,
    dikirim,
    gagal,
  });
}