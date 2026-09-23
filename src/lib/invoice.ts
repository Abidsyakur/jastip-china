// letak: src/lib/invoice.ts
import PDFDocument from "pdfkit";

/**
 * Builder PDF invoice — fungsi MURNI atas data plain (tidak menyentuh prisma
 * sama sekali), supaya bisa di-unit-test tanpa DB: cukup kasih objek
 * InvoiceData palsu lalu assert hasilnya Buffer PDF valid.
 *
 * Route handler (/api/pesanan/[id]/invoice) yang bertugas: cek ownership,
 * ambil data dari DB, konversi Decimal -> number, lalu panggil fungsi ini.
 */

export interface InvoiceItemData {
  nama: string;
  varian: string | null;
  jumlah: number;
  hargaSatuan: number;
}

export interface InvoiceRekeningData {
  bank: string;
  noRekening: string;
  atasNama: string;
}

export interface InvoiceData {
  noInvoice: string;
  tglPesan: Date | string;
  customerNama: string;
  customerKontak: string;
  alamatLengkap: string;
  items: InvoiceItemData[];
  subtotalProduk: number;
  biayaJasaTitip: number;
  ongkirChinaGudang: number;
  ongkirDomestik: number;
  biayaAdminPayment: number;
  totalAkhir: number;
  rekening: InvoiceRekeningData[];
}

function rupiah(n: number): string {
  return "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n));
}

function tanggal(id: Date | string): string {
  const d = typeof id === "string" ? new Date(id) : id;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function bangunInvoicePdf(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const potongan: Buffer[] = [];

    doc.on("data", (c: Buffer) => potongan.push(c));
    doc.on("end", () => resolve(Buffer.concat(potongan)));
    doc.on("error", reject);

    // Gunakan font default PDFKit (built-in, tanpa external dependency)
    // PDFKit sudah include Helvetica built-in, tapi di serverless Vercel
    // tidak bisa load external fonts. Gunakan API default saja.
    doc.fontSize(20).text("Jastip China");
    doc.fontSize(10).fillColor("#666666").text("Invoice pesanan jastip barang China");
    doc.moveDown();
    doc.fillColor("#000000").fontSize(12);
    doc.text(`No. Invoice: ${data.noInvoice}`);
    doc.fontSize(10).text(`Tanggal pesan: ${tanggal(data.tglPesan)}`);
    doc.moveDown();

    doc.fontSize(11).text("Ditagihkan ke:");
    doc.fontSize(10).text(data.customerNama);
    doc.text(data.customerKontak);
    doc.text(data.alamatLengkap, { width: 500 });
    doc.moveDown();

    // Item — baris teks sederhana
    doc.fontSize(11).text("Item pesanan:");
    doc.fontSize(10);
    for (const item of data.items) {
      const nama = item.varian ? `${item.nama} (${item.varian})` : item.nama;
      doc.text(`${nama} — ${item.jumlah} x ${rupiah(item.hargaSatuan)} = ${rupiah(item.hargaSatuan * item.jumlah)}`, {
        width: 500,
      });
    }
    doc.moveDown();

    // Rincian biaya
    doc.fontSize(11).text("Rincian biaya:");
    doc.fontSize(10);
    doc.text(`Subtotal produk: ${rupiah(data.subtotalProduk)}`);
    doc.text(`Biaya jasa titip: ${rupiah(data.biayaJasaTitip)}`);
    doc.text(`Ongkir China ke gudang: ${rupiah(data.ongkirChinaGudang)}`);
    doc.text(`Ongkir domestik: ${rupiah(data.ongkirDomestik)}`);
    if (data.biayaAdminPayment > 0) {
      doc.text(`Biaya admin pembayaran: ${rupiah(data.biayaAdminPayment)}`);
    }
    doc.moveDown();
    doc.fontSize(13).text(`Total: ${rupiah(data.totalAkhir)}`);
    doc.moveDown();

    if (data.rekening.length > 0) {
      doc.fontSize(11).text("Transfer ke:");
      doc.fontSize(10);
      for (const r of data.rekening) {
        doc.text(`${r.bank} — ${r.noRekening} a.n. ${r.atasNama}`);
      }
      doc.moveDown();
    }

    doc.fontSize(9).fillColor("#666666").text("Simpan invoice ini sebagai bukti pesananmu.");
    doc.end();
  });
}
