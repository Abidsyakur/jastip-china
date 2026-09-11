/*
  Warnings:

  - Added the required column `diperbarui_pada` to the `produk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produk" ADD COLUMN     "dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "diperbarui_pada" TIMESTAMP(3) NOT NULL;
