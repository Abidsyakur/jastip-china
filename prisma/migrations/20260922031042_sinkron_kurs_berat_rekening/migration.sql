-- AlterTable: tambah berat_total_gram dengan backfill dari item existing
-- (nullable dulu -> isi dari SUM(berat_gram x jumlah) -> baru NOT NULL),
-- supaya baris pesanan lama (13 baris di dev, N baris di prod) tidak gagal.
ALTER TABLE "pesanan" ADD COLUMN     "berat_total_gram" INTEGER;

UPDATE "pesanan" p SET "berat_total_gram" = COALESCE((
  SELECT SUM(pr."berat_gram" * pi."jumlah")::INTEGER
  FROM "pesanan_item" pi
  JOIN "produk" pr ON pr."id" = pi."produk_id"
  WHERE pi."pesanan_id" = p."id"
), 0);

ALTER TABLE "pesanan" ALTER COLUMN "berat_total_gram" SET NOT NULL;

-- CreateTable
CREATE TABLE "kurs_master" (
    "id" TEXT NOT NULL,
    "kurs_rmb_idr" DECIMAL(10,2) NOT NULL,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin_id" TEXT NOT NULL,

    CONSTRAINT "kurs_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rekening_bank" (
    "id" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "no_rekening" TEXT NOT NULL,
    "atas_nama" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rekening_bank_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "kurs_master" ADD CONSTRAINT "kurs_master_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
