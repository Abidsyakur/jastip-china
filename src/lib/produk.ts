// letak: src/lib/produk.ts
import { ambilKursAktif } from "@/lib/kurs-master";

/** kursInput ada? pakai apa adanya. Tidak ada? ambil dari KursMaster aktif (throw kalau belum pernah diisi). */
export async function tentukanKurs(kursInput?: number): Promise<number> {
  if (kursInput !== undefined) return kursInput;
  const kursAktif = await ambilKursAktif();
  return Number(kursAktif.kursRmbIdr);
}

/**
 * hargaJualIdrInput ada? pakai apa adanya (mengabaikan hasil hitung otomatis).
 * Tidak ada? hitung round(hargaAsalRmb x kurs) TANPA markup apapun — TIDAK
 * ADA pemanggilan hitungBiayaJasaTitip() atau logika markup lain di sini,
 * itu cuma boleh dipanggil di lib/pesanan.ts § prosesCheckout.
 *
 * Tidak ada flag "manual override" yang disimpan/dilacak — tiap request
 * dievaluasi independen (keputusan bisnis: simpel, tidak perlu riwayat).
 * Konsekuensinya: edit produk kirim hargaAsalRmb/kurs baru TANPA
 * hargaJualIdr akan MENGHITUNG ULANG dari nol, override manual sebelumnya
 * TIDAK dipertahankan — ini sengaja, bukan bug.
 */
export function tentukanHargaJualIdr(hargaAsalRmb: number, kurs: number, hargaJualIdrInput?: number): number {
  if (hargaJualIdrInput !== undefined) return hargaJualIdrInput;
  return Math.round(hargaAsalRmb * kurs);
}