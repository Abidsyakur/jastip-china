"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { rupiah, formatTanggalWaktu } from "@/lib/format";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Field, Input } from "@/components/ui/input";
import { SkeletonBar } from "@/components/ui/feedback";
import { UploadField } from "@/components/upload-field";
import { toast } from "@/components/ui/toaster";
import { useRequireCustomer } from "@/components/auth-guard";
import type { Pesanan, Rekening, Pembayaran } from "@/lib/types";

function hitungMundur(kedaluwarsa: string): string {
  const sisa = new Date(kedaluwarsa).getTime() - Date.now();
  if (sisa <= 0) return "Kedaluwarsa";
  const jam = Math.floor(sisa / 3600000);
  const menit = Math.floor((sisa % 3600000) / 60000);
  return `${jam} jam ${menit} menit`;
}

export default function PembayaranPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isLoading } = useRequireCustomer();
  const [pesanan, setPesanan] = useState<Pesanan | null>(null);
  const [rekening, setRekening] = useState<Rekening[]>([]);
  const [bukti, setBukti] = useState<string | null>(null);
  const [tglBayar, setTglBayar] = useState("");
  const [kirim, setKirim] = useState(false);
  const [, setDetik] = useState(0);

  const ambil = useCallback(async () => {
    const [p, r] = await Promise.all([
      api<{ pesanan: Pesanan }>(`/api/pesanan/${id}`),
      api<{ items: Rekening[] }>("/api/rekening").catch(() => ({ items: [] as Rekening[] })),
    ]);
    setPesanan(p.pesanan);
    setRekening(r.items);
  }, [id]);

  useEffect(() => {
    if (!isLoading && user) ambil().catch((err) => toast(err.message, "error"));
  }, [isLoading, user, ambil]);

  useEffect(() => {
    const t = setInterval(() => setDetik((d) => d + 1), 60000);
    return () => clearInterval(t);
  }, []);

  if (isLoading || !user || !pesanan) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-6">
          <SkeletonBar /> <div className="mt-2" /> <SkeletonBar />
        </main>
      </div>
    );
  }

  if (pesanan.statusPesanan !== "MENUNGGU_PEMBAYARAN") {
    router.replace(`/pesanan/${id}`);
    return null;
  }

  const terakhir: Pembayaran | undefined = pesanan.pembayaran[0];
  const bisaUpload = terakhir?.status === "MENUNGGU_BUKTI";
  const menungguVerif = terakhir?.status === "MENUNGGU_VERIFIKASI";
  const perluBayarUlang =
    !terakhir || terakhir.status === "KADALUARSA" || terakhir.status === "DITOLAK";

  const salin = async (teks: string) => {
    try {
      await navigator.clipboard.writeText(teks);
      toast("Tersalin!", "sukses");
    } catch {
      toast("Gagal menyalin", "error");
    }
  };

  const uploadBukti = async () => {
    if (!bukti) {
      toast("Pilih foto bukti dulu", "error");
      return;
    }
    if (!tglBayar) {
      toast("Isi tanggal bayar dulu", "error");
      return;
    }
    setKirim(true);
    try {
      await api(`/api/pesanan/${id}/pembayaran/bukti`, {
        method: "PATCH",
        body: { buktiUrl: bukti, tglBayar },
      });
      toast("Bukti transfer terkirim. Tunggu verifikasi admin ya.", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setKirim(false);
    }
  };

  const bayarUlang = async () => {
    setKirim(true);
    try {
      await api(`/api/pesanan/${id}/pembayaran`, {
        method: "POST",
        body: { metode: "transfer_bank" },
      });
      toast("Percobaan pembayaran baru dibuat", "sukses");
      await ambil();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setKirim(false);
    }
  };

  const batalkan = async () => {
    if (!confirm("Yakin batalkan pesanan ini?")) return;
    try {
      await api(`/api/pesanan/${id}/batal`, { method: "POST" });
      toast("Pesanan dibatalkan", "sukses");
      router.push("/pesanan");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="text-2xl font-bold md:text-3xl">Upload Bukti Pembayaran</h1>
        <p className="mt-1 text-sm text-ink-muda">No. Invoice: {pesanan.noInvoice}</p>

        <Card className="mt-4 p-4 text-center">
          <p className="text-sm text-ink-muda">Total Bayar</p>
          <p className="font-display text-3xl font-bold text-gold">
            {rupiah(terakhir?.jumlahBayar ?? pesanan.totalAkhir)}
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            {terakhir && <Badge status={terakhir.status} />}
          </div>
          {terakhir && (bisaUpload || perluBayarUlang) && (
            <p className="mt-1 text-sm text-ink-muda">
              Kedaluwarsa dalam: {hitungMundur(terakhir.kedaluwarsaPada)}
            </p>
          )}
        </Card>

        <Card className="mt-4 p-4">
          <p className="mb-2 font-display text-lg font-bold">Transfer ke</p>
          {rekening.length === 0 && (
            <p className="text-sm text-ink-muda">Rekening belum tersedia, hubungi admin.</p>
          )}
          <div className="flex flex-col gap-2">
            {rekening.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg bg-krim/60 p-3">
                <div>
                  <p className="font-semibold">{r.bank}</p>
                  <p className="font-mono text-sm">{r.noRekening}</p>
                  <p className="text-xs text-ink-muda">{r.atasNama}</p>
                </div>
                <Button varian="ghost" ukuran="sm" onClick={() => salin(r.noRekening)}>
                  Salin
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {menungguVerif && (
          <Card className="mt-4 p-4 text-center">
            <p className="font-medium">Bukti udah dikirim, lagi dicek admin.</p>
            <p className="text-sm text-ink-muda">Verifikasi maksimal 1x24 jam.</p>
          </Card>
        )}

        {terakhir?.status === "TERVERIFIKASI" && (
          <Card className="mt-4 p-4 text-center">
            <p className="font-medium">Pembayaran terverifikasi. Pesananmu sedang diproses.</p>
            <Link href={`/pesanan/${id}`} className="mt-2 inline-block text-sm font-medium text-brand">
              Lihat Detail Pesanan
            </Link>
          </Card>
        )}

        {bisaUpload && (
          <Card className="mt-4 p-4">
            <UploadField tujuan="bukti-transfer" nilai={bukti} onBerubah={setBukti} />
            <div className="mt-3">
              <Field label="Tanggal Bayar">
                <Input type="date" value={tglBayar} onChange={(e) => setTglBayar(e.target.value)} />
              </Field>
            </div>
            <Button penuh memuat={kirim} className="mt-3" onClick={uploadBukti}>
              Upload Bukti
            </Button>
          </Card>
        )}

        {perluBayarUlang && (
          <Card className="mt-4 p-4 text-center">
            <p className="font-display text-lg font-bold">Bayar Ulang</p>
            <p className="mt-1 text-sm text-ink-muda">
              {terakhir
                ? "Pembayaran kedaluwarsa. Stok bisa berubah, segera bayar ulang."
                : "Belum ada percobaan pembayaran aktif."}
            </p>
            {terakhir?.status === "DITOLAK" && terakhir.catatanAdmin && (
              <p className="mt-1 text-sm text-merah-muda">Alasan: {terakhir.catatanAdmin}</p>
            )}
            <div className="mt-3 flex gap-2">
              <Button varian="secondary" className="flex-1" onClick={batalkan}>
                Batalkan Pesanan
              </Button>
              <Button memuat={kirim} className="flex-1" onClick={bayarUlang}>
                Bayar Ulang
              </Button>
            </div>
          </Card>
        )}

        <p className="mt-4 text-center text-sm text-ink-muda">
          Pembayaran akan diverifikasi admin dalam 1x24 jam. {formatTanggalWaktu(pesanan.tglPesan)}
        </p>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
