// letak: src/app/api/admin/password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseBody, gantiPasswordAdminSchema } from "@/lib/validasi";
import { wajibAdmin, hashPassword, verifyPassword } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError, AppError } from "@/lib/http-error";

export async function POST(req: NextRequest) {
  try {
    const admin = await wajibAdmin(req);

    const parsed = await parseBody(req, gantiPasswordAdminSchema);
    if ("error" in parsed) return parsed.error;

    const data = await prisma.admin.findUnique({
      where: { id: admin.sub },
      select: { passwordHash: true },
    });
    if (!data) {
      return NextResponse.json({ error: "Akun admin tidak ditemukan" }, { status: 404 });
    }

    const cocok = await verifyPassword(parsed.data.passwordLama, data.passwordHash);
    if (!cocok) {
      throw new AppError("Password saat ini salah", 400);
    }

    await prisma.admin.update({
      where: { id: admin.sub },
      data: { passwordHash: await hashPassword(parsed.data.passwordBaru) },
    });

    return NextResponse.json({ message: "Password berhasil diganti, silakan login ulang" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    throw err;
  }
}
