-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('OWNER', 'STAFF');

-- CreateEnum
CREATE TYPE "ProdukStatus" AS ENUM ('AKTIF', 'NONAKTIF');

-- CreateEnum
CREATE TYPE "PermintaanPoStatus" AS ENUM ('MENUNGGU_REVIEW', 'DIKONFIRMASI_HARGA', 'DITOLAK', 'SUDAH_JADI_PESANAN');

-- CreateEnum
CREATE TYPE "StatusPesanan" AS ENUM ('MENUNGGU_PEMBAYARAN', 'DIPROSES_ADMIN', 'DIKONSOLIDASI_KIRIM', 'TIBA_KIRIM_LOKAL', 'SELESAI', 'DIBATALKAN');

-- CreateEnum
CREATE TYPE "SumberItem" AS ENUM ('KATALOG', 'CUSTOM_PO');

-- CreateEnum
CREATE TYPE "StatusPembayaran" AS ENUM ('MENUNGGU_BUKTI', 'MENUNGGU_VERIFIKASI', 'TERVERIFIKASI', 'DITOLAK', 'KADALUARSA');

-- CreateEnum
CREATE TYPE "AlasanKomplain" AS ENUM ('BARANG_RUSAK', 'TIDAK_SESUAI_DESKRIPSI', 'SALAH_KIRIM', 'LAINNYA');

-- CreateEnum
CREATE TYPE "StatusKomplain" AS ENUM ('DIAJUKAN', 'DIPROSES', 'SELESAI');

-- CreateEnum
CREATE TYPE "SolusiKomplain" AS ENUM ('KIRIM_ULANG', 'REFUND_SEBAGIAN', 'REFUND_PENUH', 'DITOLAK');

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "no_wa" TEXT NOT NULL,
    "email" TEXT,
    "password_hash" TEXT NOT NULL,
    "tgl_registrasi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "no_wa" TEXT NOT NULL,
    "email" TEXT,
    "password_hash" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'STAFF',

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alamat" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "penerima" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,
    "alamat_lengkap" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "kode_pos" TEXT NOT NULL,

    CONSTRAINT "alamat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sesi_login" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT,
    "admin_id" TEXT,
    "refresh_token_hash" TEXT NOT NULL,
    "device_info" TEXT,
    "ip_address" TEXT,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kedaluwarsa_pada" TIMESTAMP(3) NOT NULL,
    "dicabut" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sesi_login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reset_password_tokens" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT,
    "admin_id" TEXT,
    "token_hash" TEXT NOT NULL,
    "kedaluwarsa_pada" TIMESTAMP(3) NOT NULL,
    "sudah_dipakai" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reset_password_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori" (
    "id" TEXT NOT NULL,
    "nama_kategori" TEXT NOT NULL,

    CONSTRAINT "kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produk" (
    "id" TEXT NOT NULL,
    "kategori_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "nama_produk" TEXT NOT NULL,
    "deskripsi" TEXT,
    "harga_asal_rmb" DECIMAL(12,2) NOT NULL,
    "kurs" DECIMAL(10,2) NOT NULL,
    "harga_jual_idr" DECIMAL(12,2) NOT NULL,
    "berat_gram" INTEGER NOT NULL,
    "link_sumber" TEXT NOT NULL,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "status" "ProdukStatus" NOT NULL DEFAULT 'AKTIF',

    CONSTRAINT "produk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produk_gambar" (
    "id" TEXT NOT NULL,
    "produk_id" TEXT NOT NULL,
    "url_gambar" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "produk_gambar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produk_varian" (
    "id" TEXT NOT NULL,
    "produk_id" TEXT NOT NULL,
    "nama_varian" TEXT NOT NULL,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "harga_tambahan" DECIMAL(12,2) NOT NULL DEFAULT 0,

    CONSTRAINT "produk_varian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permintaan_po" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "admin_reviewer_id" TEXT,
    "link_produk_referensi" TEXT,
    "deskripsi_spesifikasi" TEXT NOT NULL,
    "foto_referensi_url" TEXT,
    "jumlah_diminta" INTEGER NOT NULL,
    "status" "PermintaanPoStatus" NOT NULL DEFAULT 'MENUNGGU_REVIEW',
    "estimasi_harga" DECIMAL(12,2),
    "estimasi_ongkir" DECIMAL(12,2),
    "catatan_admin" TEXT,
    "tgl_submit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tgl_respon" TIMESTAMP(3),

    CONSTRAINT "permintaan_po_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keranjang" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "keranjang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keranjang_item" (
    "id" TEXT NOT NULL,
    "keranjang_id" TEXT NOT NULL,
    "produk_id" TEXT NOT NULL,
    "produk_varian_id" TEXT,
    "jumlah" INTEGER NOT NULL,

    CONSTRAINT "keranjang_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesanan" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "alamat_id" TEXT NOT NULL,
    "no_invoice" TEXT NOT NULL,
    "status_pesanan" "StatusPesanan" NOT NULL DEFAULT 'MENUNGGU_PEMBAYARAN',
    "preferensi_kurir" TEXT NOT NULL,
    "subtotal_produk" DECIMAL(12,2) NOT NULL,
    "biaya_jasa_titip" DECIMAL(12,2) NOT NULL,
    "ongkir_china_ke_gudang" DECIMAL(12,2) NOT NULL,
    "ongkir_domestik" DECIMAL(12,2) NOT NULL,
    "biaya_admin_payment" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "total_akhir" DECIMAL(12,2) NOT NULL,
    "tgl_pesan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesanan_status_log" (
    "id" TEXT NOT NULL,
    "pesanan_id" TEXT NOT NULL,
    "status" "StatusPesanan" NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "catatan" TEXT,

    CONSTRAINT "pesanan_status_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesanan_item" (
    "id" TEXT NOT NULL,
    "pesanan_id" TEXT NOT NULL,
    "sumber_item" "SumberItem" NOT NULL,
    "produk_id" TEXT,
    "produk_varian_id" TEXT,
    "varian_snapshot" TEXT,
    "permintaan_po_id" TEXT,
    "nama_item_snapshot" TEXT NOT NULL,
    "harga_satuan_saat_beli" DECIMAL(12,2) NOT NULL,
    "jumlah" INTEGER NOT NULL,

    CONSTRAINT "pesanan_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pembayaran" (
    "id" TEXT NOT NULL,
    "pesanan_id" TEXT NOT NULL,
    "metode" TEXT NOT NULL,
    "status" "StatusPembayaran" NOT NULL DEFAULT 'MENUNGGU_BUKTI',
    "jumlah_bayar" DECIMAL(12,2) NOT NULL,
    "bukti_url" TEXT,
    "verified_by_admin_id" TEXT,
    "catatan_admin" TEXT,
    "tgl_bayar" TIMESTAMP(3),
    "tgl_verifikasi" TIMESTAMP(3),
    "kedaluwarsa_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengiriman" (
    "id" TEXT NOT NULL,
    "pesanan_id" TEXT NOT NULL,
    "kurir" TEXT,
    "no_resi" TEXT,
    "status_kirim" TEXT NOT NULL DEFAULT 'belum_dikirim',
    "estimasi_tiba" TIMESTAMP(3),

    CONSTRAINT "pengiriman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "komplain" (
    "id" TEXT NOT NULL,
    "pesanan_item_id" TEXT NOT NULL,
    "alasan" "AlasanKomplain" NOT NULL,
    "bukti_foto" TEXT NOT NULL,
    "deskripsi" TEXT,
    "status" "StatusKomplain" NOT NULL DEFAULT 'DIAJUKAN',
    "solusi" "SolusiKomplain",

    CONSTRAINT "komplain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "komplain_log" (
    "id" TEXT NOT NULL,
    "komplain_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "catatan" TEXT NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "komplain_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifikasi" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "pesanan_id" TEXT,
    "pesan" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "status_baca" BOOLEAN NOT NULL DEFAULT false,
    "tgl_kirim" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_aktivitas" (
    "id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "aksi" TEXT NOT NULL,
    "entitas_terkait" TEXT NOT NULL,
    "keterangan" TEXT,
    "waktu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_aktivitas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_no_wa_key" ON "customers"("no_wa");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "keranjang_customer_id_key" ON "keranjang"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "pesanan_no_invoice_key" ON "pesanan"("no_invoice");

-- CreateIndex
CREATE UNIQUE INDEX "pesanan_item_permintaan_po_id_key" ON "pesanan_item"("permintaan_po_id");

-- CreateIndex
CREATE UNIQUE INDEX "pengiriman_pesanan_id_key" ON "pengiriman"("pesanan_id");

-- AddForeignKey
ALTER TABLE "alamat" ADD CONSTRAINT "alamat_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesi_login" ADD CONSTRAINT "sesi_login_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesi_login" ADD CONSTRAINT "sesi_login_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reset_password_tokens" ADD CONSTRAINT "reset_password_tokens_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reset_password_tokens" ADD CONSTRAINT "reset_password_tokens_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produk" ADD CONSTRAINT "produk_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produk" ADD CONSTRAINT "produk_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produk_gambar" ADD CONSTRAINT "produk_gambar_produk_id_fkey" FOREIGN KEY ("produk_id") REFERENCES "produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produk_varian" ADD CONSTRAINT "produk_varian_produk_id_fkey" FOREIGN KEY ("produk_id") REFERENCES "produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permintaan_po" ADD CONSTRAINT "permintaan_po_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permintaan_po" ADD CONSTRAINT "permintaan_po_admin_reviewer_id_fkey" FOREIGN KEY ("admin_reviewer_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang_item" ADD CONSTRAINT "keranjang_item_keranjang_id_fkey" FOREIGN KEY ("keranjang_id") REFERENCES "keranjang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang_item" ADD CONSTRAINT "keranjang_item_produk_id_fkey" FOREIGN KEY ("produk_id") REFERENCES "produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang_item" ADD CONSTRAINT "keranjang_item_produk_varian_id_fkey" FOREIGN KEY ("produk_varian_id") REFERENCES "produk_varian"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesanan" ADD CONSTRAINT "pesanan_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesanan" ADD CONSTRAINT "pesanan_alamat_id_fkey" FOREIGN KEY ("alamat_id") REFERENCES "alamat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesanan_status_log" ADD CONSTRAINT "pesanan_status_log_pesanan_id_fkey" FOREIGN KEY ("pesanan_id") REFERENCES "pesanan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesanan_item" ADD CONSTRAINT "pesanan_item_pesanan_id_fkey" FOREIGN KEY ("pesanan_id") REFERENCES "pesanan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesanan_item" ADD CONSTRAINT "pesanan_item_produk_id_fkey" FOREIGN KEY ("produk_id") REFERENCES "produk"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesanan_item" ADD CONSTRAINT "pesanan_item_produk_varian_id_fkey" FOREIGN KEY ("produk_varian_id") REFERENCES "produk_varian"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesanan_item" ADD CONSTRAINT "pesanan_item_permintaan_po_id_fkey" FOREIGN KEY ("permintaan_po_id") REFERENCES "permintaan_po"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_pesanan_id_fkey" FOREIGN KEY ("pesanan_id") REFERENCES "pesanan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_verified_by_admin_id_fkey" FOREIGN KEY ("verified_by_admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengiriman" ADD CONSTRAINT "pengiriman_pesanan_id_fkey" FOREIGN KEY ("pesanan_id") REFERENCES "pesanan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "komplain" ADD CONSTRAINT "komplain_pesanan_item_id_fkey" FOREIGN KEY ("pesanan_item_id") REFERENCES "pesanan_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "komplain_log" ADD CONSTRAINT "komplain_log_komplain_id_fkey" FOREIGN KEY ("komplain_id") REFERENCES "komplain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "komplain_log" ADD CONSTRAINT "komplain_log_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifikasi" ADD CONSTRAINT "notifikasi_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifikasi" ADD CONSTRAINT "notifikasi_pesanan_id_fkey" FOREIGN KEY ("pesanan_id") REFERENCES "pesanan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_aktivitas" ADD CONSTRAINT "log_aktivitas_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
