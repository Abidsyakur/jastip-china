-- CreateTable
CREATE TABLE "rate_limit" (
    "kunci" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "reset_pada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rate_limit_pkey" PRIMARY KEY ("kunci")
);

-- CreateIndex
CREATE INDEX "rate_limit_reset_pada_idx" ON "rate_limit"("reset_pada");
