// letak: src/app/api/pesanan/[id]/invoice/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { wajibCustomer } from "@/lib/auth";
import { tanganiErrorAuth } from "@/lib/http-error";
import { bangunInvoicePdf } from "@/lib/invoice";

interface Konteks {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Konteks) {
  try {
    const user = await wajibCustomer(req);
    const { id } = await params;

    const [pesanan, rekening] = await Promise.all([
      prisma.pesanan.findUnique({
        where: { id },
        include: {
          item: true,
          alamat: true,
          customer: { select: { nama: true, noWa: true, email: true } },
        },
      }),
      // Rekening yang tampil di invoice = yang aktif saja (sama seperti
      // yang dilihat customer di halaman pembayaran via /api/rekening).
      prisma.rekeningBank.findMany({
        where: { aktif: true },
        orderBy: { dibuatPada: "asc" },
      }),
    ]);

    // 404 seragam untuk "tidak ada" maupun "bukan milik kamu" — pola yang
    // sama seperti GET /api/pesanan/[id].
    if (!pesanan || pesanan.customerId !== user.sub) {
      return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
    }

    const pdf = await bangunInvoicePdf({
      noInvoice: pesanan.noInvoice,
      tglPesan: pesanan.tglPesan,
      customerNama: pesanan.customer.nama,
      customerKontak: `${pesanan.customer.noWa}${pesanan.customer.email ? ` / ${pesanan.customer.email}` : ""}`,
      alamatLengkap: `${pesanan.alamat.alamatLengkap}, ${pesanan.alamat.kota} ${pesanan.alamat.kodePos}`,
      items: pesanan.item.map((i) => ({
        nama: i.namaItemSnapshot,
        varian: i.varianSnapshot,
        jumlah: i.jumlah,
        hargaSatuan: Number(i.hargaSatuanSaatBeli),
      })),
      subtotalProduk: Number(pesanan.subtotalProduk),
      biayaJasaTitip: Number(pesanan.biayaJasaTitip),
      ongkirChinaGudang: Number(pesanan.ongkirChinaGudang),
      ongkirDomestik: Number(pesanan.ongkirDomestik),
      biayaAdminPayment: Number(pesanan.biayaAdminPayment),
      totalAkhir: Number(pesanan.totalAkhir),
      rekening: rekening.map((r) => ({ bank: r.bank, noRekening: r.noRekening, atasNama: r.atasNama })),
    });

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${pesanan.noInvoice}.pdf"`,
      },
    });
  } catch (err) {
    const res = tanganiErrorAuth(err);
    if (res) return res;
    console.error("Invoice error:", err);
    return NextResponse.json({ error: "Gagal membuat invoice" }, { status: 500 });
  }
}
