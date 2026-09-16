// letak: src/lib/tarif.ts

/**
 * Dua fungsi kalkulasi biaya checkout — dipanggil di lib/pesanan.ts §
 * prosesCheckout, LANGSUNG final saat checkout (bukan ditunda ke admin).
 * Semua murni fungsi lokal, tidak ada panggilan jaringan sama sekali.
 *
 * ongkirChinaGudang SENGAJA tidak ada kalkulatornya di sini — tetap 0 saat
 * checkout, diisi manual admin belakangan (sama seperti sebelumnya).
 */

const PERSEN_JASA_TITIP = 0.35;
const MINIMUM_JASA_TITIP = 15_000;

export function hitungBiayaJasaTitip(subtotalProduk: number): number {
  return Math.max(Math.round(subtotalProduk * PERSEN_JASA_TITIP), MINIMUM_JASA_TITIP);
}

export type KurirDomestik = "jnt" | "shopee_express";
type Zona = "jawa" | "sumatera_bali_kalimantan_sulawesi" | "indonesia_timur";

export const PROVINSI_KE_ZONA: Record<string, Zona> = {
  "DKI Jakarta": "jawa",
  "Jawa Barat": "jawa",
  "Jawa Tengah": "jawa",
  "Jawa Timur": "jawa",
  "DI Yogyakarta": "jawa",
  Banten: "jawa",

  Aceh: "sumatera_bali_kalimantan_sulawesi",
  "Sumatera Utara": "sumatera_bali_kalimantan_sulawesi",
  "Sumatera Barat": "sumatera_bali_kalimantan_sulawesi",
  Riau: "sumatera_bali_kalimantan_sulawesi",
  "Kepulauan Riau": "sumatera_bali_kalimantan_sulawesi",
  Jambi: "sumatera_bali_kalimantan_sulawesi",
  "Sumatera Selatan": "sumatera_bali_kalimantan_sulawesi",
  "Bangka Belitung": "sumatera_bali_kalimantan_sulawesi",
  Bengkulu: "sumatera_bali_kalimantan_sulawesi",
  Lampung: "sumatera_bali_kalimantan_sulawesi",
  Bali: "sumatera_bali_kalimantan_sulawesi",
  "Kalimantan Barat": "sumatera_bali_kalimantan_sulawesi",
  "Kalimantan Tengah": "sumatera_bali_kalimantan_sulawesi",
  "Kalimantan Selatan": "sumatera_bali_kalimantan_sulawesi",
  "Kalimantan Timur": "sumatera_bali_kalimantan_sulawesi",
  "Kalimantan Utara": "sumatera_bali_kalimantan_sulawesi",
  "Sulawesi Utara": "sumatera_bali_kalimantan_sulawesi",
  "Sulawesi Tengah": "sumatera_bali_kalimantan_sulawesi",
  "Sulawesi Selatan": "sumatera_bali_kalimantan_sulawesi",
  "Sulawesi Tenggara": "sumatera_bali_kalimantan_sulawesi",
  Gorontalo: "sumatera_bali_kalimantan_sulawesi",
  "Sulawesi Barat": "sumatera_bali_kalimantan_sulawesi",

  "Nusa Tenggara Barat": "indonesia_timur",
  "Nusa Tenggara Timur": "indonesia_timur",
  Maluku: "indonesia_timur",
  "Maluku Utara": "indonesia_timur",
  Papua: "indonesia_timur",
  "Papua Barat": "indonesia_timur",
  "Papua Tengah": "indonesia_timur",
  "Papua Pegunungan": "indonesia_timur",
  "Papua Selatan": "indonesia_timur",
  "Papua Barat Daya": "indonesia_timur",
};

// Provinsi tidak dikenali (data lama sebelum dropdown ada, dsb) jatuh ke zona
// TERMAHAL sebagai default -- lebih aman rugi tipis daripada developer yang
// nombokin. TODO: tambahkan logging kalau default ini kepakai di production.
const ZONA_DEFAULT: Zona = "indonesia_timur";

const TARIF_ONGKIR_DOMESTIK: Record<Zona, Record<KurirDomestik, { kgPertama: number; kgBerikutnya: number }>> = {
  jawa: {
    jnt: { kgPertama: 9_000, kgBerikutnya: 3_000 },
    shopee_express: { kgPertama: 8_000, kgBerikutnya: 2_500 },
  },
  sumatera_bali_kalimantan_sulawesi: {
    jnt: { kgPertama: 15_000, kgBerikutnya: 5_000 },
    shopee_express: { kgPertama: 14_000, kgBerikutnya: 4_500 },
  },
  indonesia_timur: {
    jnt: { kgPertama: 30_000, kgBerikutnya: 10_000 },
    shopee_express: { kgPertama: 28_000, kgBerikutnya: 9_000 },
  },
};

/** Pola tarif ekspedisi asli: kg pertama + kg berikutnya, bukan flat linear. */
export function hitungOngkirDomestik(provinsi: string, kurir: KurirDomestik, beratTotalKg: number): number {
  const zona = PROVINSI_KE_ZONA[provinsi] ?? ZONA_DEFAULT;
  const tarif = TARIF_ONGKIR_DOMESTIK[zona][kurir];
  const beratDibulatkan = Math.max(Math.ceil(beratTotalKg), 1);
  return tarif.kgPertama + tarif.kgBerikutnya * (beratDibulatkan - 1);
}