import type { Pesanan } from "@/lib/types";

export interface DashboardStatistik {
  pesananPerStatus: { status: string; jumlah: number }[];
  perluPerhatian: {
    pembayaranMenungguVerifikasi: number;
    poMenungguReview: number;
    komplainBelumSelesai: number;
  };
  produkAktif: number;
  omzet: number | string;
}

export interface ProdukTerlaris {
  produkId: string;
  namaProduk: string;
  kategori: string;
  hargaJualIdr: number | string;
  totalTerjual: number;
}

export interface OmzetHarian {
  tanggal: string;
  omzet: number | string;
  jumlahPesanan: number;
}

export interface LogAktivitas {
  id: string;
  aksi: string;
  entitasTerkait: string;
  keterangan: string | null;
  waktu: string;
  admin: { nama: string; email: string | null };
}

export interface AdminPesanan extends Pesanan {
  customer: { id: string; nama: string; noWa: string; email: string | null };
}

export interface AdminPembayaran {
  id: string;
  metode: string;
  status: string;
  jumlahBayar: number | string;
  buktiUrl: string | null;
  tglBayar: string | null;
  catatanAdmin: string | null;
  kedaluwarsaPada: string;
  pesanan: { id: string; noInvoice: string; customerId: string; totalAkhir: number | string };
}

export interface AdminKomplain {
  id: string;
  alasan: string;
  buktiFoto: string;
  deskripsi: string | null;
  status: string;
  solusi: string | null;
  pesananItem: {
    id: string;
    namaItemSnapshot: string;
    varianSnapshot: string | null;
    jumlah: number;
    pesanan: { id: string; noInvoice: string; customer: { nama: string; noWa: string } };
  };
  log: { id: string; catatan: string; waktu: string; admin: { nama: string } }[];
}

export interface AdminPO {
  id: string;
  linkProdukReferensi: string | null;
  deskripsiSpesifikasi: string;
  fotoReferensiUrl: string | null;
  jumlahDiminta: number;
  status: string;
  estimasiHarga: number | string | null;
  estimasiOngkir: number | string | null;
  catatanAdmin: string | null;
  tglSubmit: string;
  customer: { nama: string; noWa: string; email: string | null };
}

export interface KursMaster {
  id: string;
  kursRmbIdr: number | string;
  dibuatPada: string;
}
