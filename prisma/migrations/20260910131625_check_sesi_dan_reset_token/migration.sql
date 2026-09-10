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
