// Bentuk data API (Decimal dari Prisma tiba sebagai string/number di JSON).

export interface ProdukListItem {
  id: string;
  namaProduk: string;
  hargaJualIdr: number | string;
  stok: number;
  status: string;
  beratGram: number;
  kategori: { namaKategori: string };
  gambar: { urlGambar: string }[];
}

export interface ProdukVarian {
  id: string;
  namaVarian: string;
  stok: number;
  hargaTambahan: number | string;
}

export interface ProdukDetail extends ProdukListItem {
  kategoriId: string;
  deskripsi: string | null;
  beratGram: number;
  gambar: { urlGambar: string }[];
  varian: ProdukVarian[];
}

export interface KeranjangItem {
  id: string;
  jumlah: number;
  hargaSatuan: number | string;
  subtotal: number | string;
  produk: ProdukListItem;
  produkVarian: ProdukVarian | null;
}

export interface Alamat {
  id: string;
  label: string;
  penerima: string;
  noTelp: string;
  alamatLengkap: string;
  kota: string;
  provinsi: string | null;
  kodePos: string;
}

export interface PesananItem {
  id: string;
  namaItemSnapshot: string;
  varianSnapshot: string | null;
  hargaSatuanSaatBeli: number | string;
  jumlah: number;
  produkId: string | null;
}

export interface Pembayaran {
  id: string;
  metode: string;
  status: string;
  jumlahBayar: number | string;
  buktiUrl: string | null;
  catatanAdmin: string | null;
  kedaluwarsaPada: string;
}

export interface Pesanan {
  id: string;
  noInvoice: string;
  statusPesanan: string;
  tglPesan: string;
  subtotalProduk: number | string;
  biayaJasaTitip: number | string;
  ongkirChinaGudang: number | string;
  ongkirDomestik: number | string;
  biayaAdminPayment: number | string;
  totalAkhir: number | string;
  item: PesananItem[];
  pembayaran: Pembayaran[];
  statusLog?: { status: string; waktu: string; catatan: string | null }[];
  alamat?: Alamat;
  pengiriman?: { kurir: string | null; noResi: string | null; estimasiTiba: string | null } | null;
}

export interface Rekening {
  id: string;
  bank: string;
  noRekening: string;
  atasNama: string;
}

export interface PermintaanPO {
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
}

export interface Notifikasi {
  id: string;
  pesan: string;
  tipe: string;
  statusBaca: boolean;
  tglKirim: string;
  pesananId: string | null;
}
