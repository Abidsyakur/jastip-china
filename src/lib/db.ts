import { PrismaClient } from "@prisma/client";

// Next.js dev mode reload module tiap ada perubahan file — tanpa pola ini,
// tiap reload bikin PrismaClient baru dan lama-lama koneksi ke Postgres
// kehabisan slot. globalThis dipakai sebagai cache lintas-reload.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
