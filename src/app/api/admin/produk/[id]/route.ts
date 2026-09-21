// letak: src/app/api/admin/produk/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Prisma, ProdukStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseBody, produkUpdateSchema } from "@/lib/validasi";
import { wajibAdmin } from "@/lib/auth";
import { tanganiErrorAuth, tanganiAppError } from "@/lib/http-error";
import { catatLogAktivitas } from "@/lib/log-aktivitas";
import { tentukanKurs, tentukanHargaJualIdr } from "@/lib/produk";

interface Konteks {
  // Next.js 15: params jadi Promise, bukan objek langsung — wajib di-await
  // di dalam handler, tidak bisa dipakai langsung dari destructuring.
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Konteks) {
  try {
    await wajibAdmin(req);
    const { id } = await params;

    const produk = await prisma.produk.findUnique({
      where: { id },
      include: { gambar: { orderBy: { urutan: "asc" } }, varian: true, kategori: true },
    });
    if (!produk) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ produk });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}

export async function PATCH(req: NextRequest, { params }: Konteks) {
  try {
    const admin = await wajibAdmin(req); // OWNER & STAFF sama-sama boleh edit produk
    const { id } = await params;

    const parsed = await parseBody(req, produkUpdateSchema);
    if ("error" in parsed) return parsed.error;
    const data = parsed.data;

    // hargaJualIdr dihitung ULANG setiap kali salah satu dari
    // hargaAsalRmb/kurs/hargaJualIdr disentuh di request INI (kecuali kalau
    // hargaJualIdr eksplisit dikirim -- itu dipakai apa adanya). PATCH yang
    // sama sekali tidak menyentuh field harga (mis. cuma ganti namaProduk)
    // TIDAK memicu apa pun di sini. Override manual sebelumnya TIDAK
    // dipertahankan kalau hargaJualIdr tidak eksplisit dikirim ULANG di
    // request ini -- keputusan bisnis sengaja, lihat lib/produk.ts.
    let kursFinal = data.kurs;
    let hargaJualIdrFinal = data.hargaJualIdr;
    const sentuhHarga =
      data.hargaAsalRmb !== undefined || data.kurs !== undefined || data.hargaJualIdr !== undefined;

    if (sentuhHarga) {
      kursFinal = await tentukanKurs(data.kurs);

      if (data.hargaJualIdr === undefined) {
        let hargaAsalRmbEfektif = data.hargaAsalRmb;
        if (hargaAsalRmbEfektif === undefined) {
          const produkLama = await prisma.produk.findUnique({ where: { id }, select: { hargaAsalRmb: true } });
          if (!produkLama) {
            return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
          }
          hargaAsalRmbEfektif = Number(produkLama.hargaAsalRmb);
        }
        hargaJualIdrFinal = tentukanHargaJualIdr(hargaAsalRmbEfektif, kursFinal, undefined);
      }
    }

    const produk = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const diupdate = await tx.produk.update({
        where: { id },
        data: {
          ...(data.kategoriId !== undefined && { kategoriId: data.kategoriId }),
          ...(data.namaProduk !== undefined && { namaProduk: data.namaProduk }),
          ...(data.deskripsi !== undefined && { deskripsi: data.deskripsi }),
          ...(data.hargaAsalRmb !== undefined && { hargaAsalRmb: data.hargaAsalRmb }),
          ...(kursFinal !== undefined && { kurs: kursFinal }),
          ...(hargaJualIdrFinal !== undefined && { hargaJualIdr: hargaJualIdrFinal }),
          ...(data.beratGram !== undefined && { beratGram: data.beratGram }),
          ...(data.linkSumber !== undefined && { linkSumber: data.linkSumber }),
          ...(data.stok !== undefined && { stok: data.stok }),
          ...(data.status !== undefined && { status: data.status }),
        },
      });

      // gambarUrls/varian kalau dikirim berarti REPLACE total, bukan patch per-item.
      // Trade-off yang diterima untuk MVP: kalau ada KeranjangItem yang refer
      // salah satu varian lama, produkVarianId-nya otomatis jadi NULL
      // (onDelete: SetNull di schema) — bukan error, tapi customer perlu pilih
      // ulang variannya saat checkout.
      if (data.gambarUrls) {
        await tx.produkGambar.deleteMany({ where: { produkId: id } });
        await tx.produkGambar.createMany({
          data: data.gambarUrls.map((url, i) => ({ produkId: id, urlGambar: url, urutan: i })),
        });
      }

      if (data.varian) {
        await tx.produkVarian.deleteMany({ where: { produkId: id } });
        await tx.produkVarian.createMany({
          data: (data.varian ?? []).map((v) => ({
            produkId: id,
            namaVarian: v.namaVarian,
            stok: v.stok,
            hargaTambahan: v.hargaTambahan,
          })),
        });
      }

      await catatLogAktivitas(
        tx,
        admin.sub,
        "UBAH_PRODUK",
        id,
        `Produk "${diupdate.namaProduk}" diperbarui`
      );

      return diupdate;
    });

    return NextResponse.json({ message: "Produk berhasil diperbarui", produk });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    const resApp = tanganiAppError(err);
    if (resApp) return resApp;
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }
    throw err;
  }
}

/**
 * Soft delete — set status NONAKTIF, BUKAN prisma.produk.delete() beneran.
 * Alasan (keputusan di tahap modul ini): produk yang sudah pernah dipesan
 * harus tetap ada untuk riwayat invoice (PesananItem sudah snapshot harga,
 * tapi tetap referensi produkId). Hard delete juga akan ditolak Postgres
 * lewat FK constraint begitu produk punya riwayat pesanan.
 */
export async function DELETE(req: NextRequest, { params }: Konteks) {
  try {
    const admin = await wajibAdmin(req); // OWNER & STAFF sama-sama boleh nonaktifkan produk
    const { id } = await params;

    const produk = await prisma.produk.findUnique({ where: { id } });
    if (!produk) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.produk.update({ where: { id }, data: { status: ProdukStatus.NONAKTIF } });
      await catatLogAktivitas(
        tx,
        admin.sub,
        "NONAKTIFKAN_PRODUK",
        id,
        `Produk "${produk.namaProduk}" dinonaktifkan`
      );
    });

    return NextResponse.json({ message: "Produk dinonaktifkan" });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    throw err;
  }
}