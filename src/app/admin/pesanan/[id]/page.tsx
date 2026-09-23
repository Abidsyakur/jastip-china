"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { rupiah, formatTanggalWaktu } from "@/lib/format";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { SkeletonBar } from "@/components/ui/feedback";
import { StatusPipeline } from "@/components/status-pipeline";
import { toast } from "@/components/ui/toaster";
import { useRequireAdmin } from "@/components/auth-guard";
import type { AdminPesanan } from "@/lib/types-admin";

const TAHAP = ["Bayar", "Dikemas", "Tiba di Gudang Lokal", "Di Tangan Kurir", "Sudah Sampai"];
const INDEKS: Record<string, number> = {
  MENUNGGU_PEMBAYARAN: 0,
  DIPROSES_ADMIN: 1,
  DIKONSOLIDASI_KIRIM: 2,
  TIBA_KIRIM_LOKAL: 3,
  SELESAI: 4,
};
const STATUS_OPSI = ["DIPROSES_ADMIN", "DIKONSOLIDASI_KIRIM", "TIBA_KIRIM_LOKAL", "SELESAI", "DIBATALKAN"];

export default function AdminDetailPesananPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading } = useRequireAdmin();
  const [p, setP] = useState<AdminPesanan | null>(null);
  const [alasanTolak, setAlasanTolak] = useState("");
  const [tanyaTolak, setTanyaTolak] = useState(false);
  const [resi, setResi] = useState("");
  const [kurir, setKurir] = useState("");
  const [statusBaru, setStatusBaru] = useState("DIKONSOLIDASI_KIRIM");
  const [ongkirChina, setOngkirChina] = useState("");
  const [kerja, setKerja] = useState(false);

  const ambil = useCallback(async () => {
    const res = await api<{ pesanan: AdminPesanan }>(`/api/admin/pesanan/${id}`);
    setP(res.pesanan);
    setResi(res.pesanan.pengiriman?.noResi ?? "");
    setKurir(res.pesanan.pengiriman?.kurir ?? "");
  }, [id]);

  useEffect(() => {
    if (!isLoading && user) ambil().catch((err) => toast(err.message, "error"));
  }, [isLoading, user, ambil]);

  const jalan = async (fn: () => Promise<unknown>, pesan: string) => {
    setKerja(true);
    try {
      await fn();
      toast(pesan, "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setKerja(false);
      setTanyaTolak(false);
    }
  };

  if (isLoading || !user || !p) {
    return (
      <AdminShell>
        <SkeletonBar /> <div className="mt-2" /> <SkeletonBar />
      </AdminShell>
    );
  }

  const dibatalkan = p.statusPesanan === "DIBATALKAN";
  const bukti = p.pembayaran.find((x) => x.buktiUrl) ?? p.pembayaran[0];
  const perluVerif = p.pembayaran.some((x) => x.status === "MENUNGGU_VERIFIKASI");

  return (
    <AdminShell>
      <p className="text-sm text-ink-muda">
        <Link href="/admin/pesanan" className="hover:text-brand">Kelola Pesanan</Link> / {p.noInvoice}
      </p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <h1 className="font-mono text-xl font-bold">{p.noInvoice}</h1>
        <Badge status={p.statusPesanan} />
      </div>
      <p className="text-sm text-ink-muda">
        {formatTanggalWaktu(p.tglPesan)} — {p.customer.nama} ({p.customer.noWa})
      </p>

      <Card className="mt-4 p-4">
        <StatusPipeline
          tahap={TAHAP.map((label, i) => {
            const kode = Object.keys(INDEKS).find((k) => INDEKS[k] === i);
            const log = p.statusLog?.find((l) => l.status === kode);
            return { label, waktu: log ? formatTanggalWaktu(log.waktu) : null };
          })}
          indeksAktif={dibatalkan ? 0 : (INDEKS[p.statusPesanan] ?? 0)}
          gagal={dibatalkan}
        />
      </Card>

      {perluVerif && bukti && (
        <Card className="mt-4 border-l-4 border-l-gold p-4">
          <p className="mb-2 font-display font-bold">Verifikasi Pembayaran</p>
          {bukti.buktiUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={bukti.buktiUrl} alt="Bukti transfer" className="max-h-64 rounded-lg object-contain" />
          )}
          <p className="mt-2 text-sm">Jumlah: {rupiah(bukti.jumlahBayar)} — Metode: {bukti.metode}</p>
          {!tanyaTolak ? (
            <div className="mt-2 flex gap-2">
              <Button
                ukuran="sm"
                disabled={kerja}
                onClick={() =>
                  jalan(
                    () => api(`/api/admin/pembayaran/${bukti.id}/verifikasi`, { method: "PATCH", body: { status: "TERVERIFIKASI" } }),
                    "Pembayaran diverifikasi"
                  )
                }
              >
                Verifikasi Bayar
              </Button>
              <Button ukuran="sm" varian="danger" onClick={() => setTanyaTolak(true)}>
                Tolak Bayar
              </Button>
            </div>
          ) : (
            <div className="mt-2">
              <Field label="Alasan penolakan (wajib)">
                <Textarea value={alasanTolak} onChange={(e) => setAlasanTolak(e.target.value)} />
              </Field>
              <div className="mt-2 flex gap-2">
                <Button ukuran="sm" varian="secondary" onClick={() => setTanyaTolak(false)}>Batal</Button>
                <Button
                  ukuran="sm"
                  varian="danger"
                  disabled={kerja || !alasanTolak.trim()}
                  onClick={() =>
                    jalan(
                      () => api(`/api/admin/pembayaran/${bukti.id}/verifikasi`, { method: "PATCH", body: { status: "DITOLAK", catatanAdmin: alasanTolak } }),
                      "Pembayaran ditolak, customer dikabarin"
                    )
                  }
                >
                  Ya, Tolak
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card className="p-4 text-sm">
          <p className="mb-2 font-display font-bold">Update Pengiriman</p>
          <Field label="Kurir">
            <Select value={kurir} onChange={(e) => setKurir(e.target.value)}>
              <option value="">Pilih Kurir</option>
              <option value="jnt">J&T</option>
              <option value="shopee_express">Shopee Express</option>
            </Select>
          </Field>
          <div className="mt-3">
            <Field label="No. Resi">
              <Input value={resi} onChange={(e) => setResi(e.target.value)} placeholder="JNE-1234567890" />
            </Field>
          </div>
          <Button
            ukuran="sm" className="mt-2" disabled={kerja || (!resi.trim() && !kurir.trim())}
            onClick={() => jalan(() => api(`/api/admin/pesanan/${id}/pengiriman`, { method: "PATCH", body: { kurir: kurir || undefined, noResi: resi || undefined } }), "Info pengiriman diupdate")}
          >
            Update Pengiriman
          </Button>
          <div className="mt-3">
            <Field label="Ubah Status">
              <Select value={statusBaru} onChange={(e) => setStatusBaru(e.target.value)}>
                {STATUS_OPSI.map((s) => (
                  <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                ))}
              </Select>
            </Field>
            <Button
              ukuran="sm" className="mt-2" disabled={kerja}
              onClick={() => jalan(() => api(`/api/admin/pesanan/${id}/status`, { method: "PATCH", body: { status: statusBaru } }), "Status pesanan diupdate")}
            >
              Update Status
            </Button>
          </div>
        </Card>

        <Card className="p-4 text-sm">
          <p className="mb-2 font-display font-bold">Biaya</p>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between"><span>Subtotal</span><span>{rupiah(p.subtotalProduk)}</span></div>
            <div className="flex justify-between"><span>Jasa Titip</span><span>{rupiah(p.biayaJasaTitip)}</span></div>
            <div className="flex justify-between"><span>Ongkir Domestik</span><span>{rupiah(p.ongkirDomestik)}</span></div>
            <div className="flex justify-between"><span>Ongkir China</span><span>{rupiah(p.ongkirChinaGudang)}</span></div>
            <div className="flex justify-between font-semibold"><span>Total</span><span>{rupiah(p.totalAkhir)}</span></div>
          </div>
          <p className="mt-2 text-sm font-medium">Kurir Pilihan: {labelKurir(p.pengiriman?.kurir)}</p>
          <div className="mt-3">
            <Field label="Ongkir China Gudang (Rp)">
              <Input value={ongkirChina} onChange={(e) => setOngkirChina(e.target.value)} inputMode="numeric" placeholder="150000" />
            </Field>
            <Button
              ukuran="sm" className="mt-2" disabled={kerja || !ongkirChina}
              onClick={() => jalan(() => api(`/api/admin/pesanan/${id}/biaya`, { method: "PATCH", body: { ongkirChinaGudang: Number(ongkirChina) } }), "Ongkir China diupdate")}
            >
              Simpan Ongkir China
            </Button>
          </div>
        </Card>
      </div>

      <Card className="mt-4 p-4 text-sm">
        <p className="mb-2 font-display font-bold">Item ({p.item.length})</p>
        {p.item.map((i) => (
          <p key={i.id}>
            {i.namaItemSnapshot}{i.varianSnapshot ? ` (${i.varianSnapshot})` : ""} × {i.jumlah} — {rupiah(Number(i.hargaSatuanSaatBeli) * i.jumlah)}
          </p>
        ))}
        <p className="mt-2 text-ink-muda">
          {p.alamat
            ? `${p.alamat.penerima}, ${p.alamat.alamatLengkap}, ${p.alamat.kota} ${p.alamat.kodePos}`
            : "-"}
        </p>
      </Card>
    </AdminShell>
  );
}
