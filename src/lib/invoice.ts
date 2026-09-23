// letak: src/lib/invoice.ts
import { jsPDF } from "jspdf";

/**
 * Builder PDF invoice dengan jsPDF (pure JS, serverless-compatible).
 * Fungsi MURNI atas data plain (tidak menyentuh prisma sama sekali).
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

export function bangunInvoicePdf(data: InvoiceData): Buffer {
  const doc = new jsPDF();
  let y = 20;

  // Header
  doc.setFontSize(20);
  doc.text("Jastip China", 20, y);
  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Invoice pesanan jastip barang China", 20, y);
  y += 10;

  // Info invoice
  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.text(`No. Invoice: ${data.noInvoice}`, 20, y);
  y += 7;
  doc.setFontSize(10);
  doc.text(`Tanggal pesan: ${tanggal(data.tglPesan)}`, 20, y);
  y += 10;

  // Customer
  doc.setFontSize(11);
  doc.text("Ditagihkan ke:", 20, y);
  y += 5;
  doc.setFontSize(10);
  doc.text(data.customerNama, 20, y);
  y += 5;
  doc.text(data.customerKontak, 20, y);
  y += 5;
  const alamatLines = doc.splitTextToSize(data.alamatLengkap, 170);
  doc.text(alamatLines, 20, y);
  y += alamatLines.length * 5 + 5;

  // Items
  doc.setFontSize(11);
  doc.text("Item pesanan:", 20, y);
  y += 5;
  doc.setFontSize(10);
  for (const item of data.items) {
    const nama = item.varian ? `${item.nama} (${item.varian})` : item.nama;
    const line = `${nama} - ${item.jumlah} x ${rupiah(item.hargaSatuan)} = ${rupiah(item.hargaSatuan * item.jumlah)}`;
    const lines = doc.splitTextToSize(line, 170);
    doc.text(lines, 20, y);
    y += lines.length * 5;
  }
  y += 5;

  // Biaya
  doc.setFontSize(11);
  doc.text("Rincian biaya:", 20, y);
  y += 5;
  doc.setFontSize(10);
  doc.text(`Subtotal produk: ${rupiah(data.subtotalProduk)}`, 20, y);
  y += 5;
  doc.text(`Biaya jasa titip: ${rupiah(data.biayaJasaTitip)}`, 20, y);
  y += 5;
  doc.text(`Ongkir China ke gudang: ${rupiah(data.ongkirChinaGudang)}`, 20, y);
  y += 5;
  doc.text(`Ongkir domestik: ${rupiah(data.ongkirDomestik)}`, 20, y);
  y += 5;
  if (data.biayaAdminPayment > 0) {
    doc.text(`Biaya admin pembayaran: ${rupiah(data.biayaAdminPayment)}`, 20, y);
    y += 5;
  }
  y += 3;
  doc.setFontSize(13);
  doc.text(`Total: ${rupiah(data.totalAkhir)}`, 20, y);
  y += 10;

  // Rekening
  if (data.rekening.length > 0) {
    doc.setFontSize(11);
    doc.text("Transfer ke:", 20, y);
    y += 5;
    doc.setFontSize(10);
    for (const r of data.rekening) {
      doc.text(`${r.bank} - ${r.noRekening} a.n. ${r.atasNama}`, 20, y);
      y += 5;
    }
    y += 5;
  }

  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text("Simpan invoice ini sebagai bukti pesananmu.", 20, y);

  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}
