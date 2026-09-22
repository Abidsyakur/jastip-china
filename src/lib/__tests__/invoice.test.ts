// letak: src/lib/__tests__/invoice.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { bangunInvoicePdf, type InvoiceData } from "@/lib/invoice";

function dataDasar(): InvoiceData {
  return {
    noInvoice: "INV-20240120-TEST",
    tglPesan: new Date("2024-01-20T19:45:00+07:00"),
    customerNama: "Budi Santoso",
    customerKontak: "081234567890 / budi@email.com",
    alamatLengkap: "Jl. Merdeka No. 123, Bandung 40123",
    items: [
      { nama: "Tas Backpack Premium", varian: "Hitam", jumlah: 1, hargaSatuan: 282000 },
      { nama: "Kaos Oversized", varian: null, jumlah: 2, hargaSatuan: 35250 },
    ],
    subtotalProduk: 352500,
    biayaJasaTitip: 35000,
    ongkirChinaGudang: 0,
    ongkirDomestik: 25000,
    biayaAdminPayment: 0,
    totalAkhir: 412500,
    rekening: [{ bank: "BCA", noRekening: "1234567890", atasNama: "PT Jastip China" }],
  };
}

test("bangunInvoicePdf menghasilkan Buffer PDF valid", async () => {
  const pdf = await bangunInvoicePdf(dataDasar());

  assert.ok(Buffer.isBuffer(pdf));
  assert.ok(pdf.length > 500, "PDF jangan sampai kosong");
  assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
});

test("bangunInvoicePdf tetap jalan tanpa rekening & tanpa varian", async () => {
  const pdf = await bangunInvoicePdf({ ...dataDasar(), rekening: [] });

  assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
});
