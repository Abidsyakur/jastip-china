-- Jalankan setelah migration awal (`npx prisma migrate dev --name init`).
-- Cara pasang, dari root project:
--
--   npx prisma migrate dev --create-only --name check_sesi_dan_reset_token
--
-- Itu akan bikin folder migration baru yang KOSONG di
-- prisma/migrations/xxxxxxxx_check_sesi_dan_reset_token/migration.sql
-- — copy isi file ini ke situ, lalu jalankan:
--
--   npx prisma migrate dev
--
-- untuk benar-benar menerapkannya ke database.

-- Cuma salah satu (customer_id atau admin_id) yang boleh terisi per baris.
-- Ini jaring pengaman terakhir di level DB — kode aplikasi sudah dipaksa
-- lewat satu pintu masuk (lib/auth/sesi.ts), tapi constraint ini yang
-- menjamin walau ada bug di masa depan, data yang salah bentuk tidak akan
-- pernah tersimpan.
ALTER TABLE "sesi_login"
ADD CONSTRAINT sesi_login_satu_user_saja CHECK (
  ("customer_id" IS NOT NULL AND "admin_id" IS NULL) OR
  ("customer_id" IS NULL AND "admin_id" IS NOT NULL)
);

ALTER TABLE "reset_password_tokens"
ADD CONSTRAINT reset_token_satu_user_saja CHECK (
  ("customer_id" IS NOT NULL AND "admin_id" IS NULL) OR
  ("customer_id" IS NULL AND "admin_id" IS NOT NULL)
);
