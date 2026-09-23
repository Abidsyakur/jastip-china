"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { formatTanggalWaktu } from "@/lib/format";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkeletonBar } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireCustomer } from "@/components/auth-guard";

interface KomplainDetail {
  id: string;
  alasan: string;
  deskripsi: string;
  status: string;
  solusi: string | null;
  catatanSolusi: string | null;
  tglKomplain: string;
  tglDiselesaikan: string | null;
  pesananItem: {
    namaItemSnapshot: string;
    varianSnapshot: string | null;
    pesanan: { noInvoice: string };
  };
  gambar: { urlGambar: string }[];
}

const LABEL_ALASAN: Record<string, string> = {
  BARANG_RUSAK: "Barang rusak",
  TIDAK_SESUAI_DESKRIPSI: "Tidak sesuai deskripsi",
  SALAH_KIRIM: "Salah kirim",
  LAINNYA: "Lainnya",
};

const LABEL_SOLUSI: Record<string, string> = {
  REFUND_PENUH: "Refund penuh",
  REFUND_SEBAGIAN: "Refund sebagian",
  KIRIM_ULANG: "Kirim ulang",
  TIDAK_ADA_SOLUSI: "Tidak ada solusi",
};

export default function DetailKomplainPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading } = useRequireCustomer();
  const [komplain, setKomplain] = useState<KomplainDetail | null>(null);
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    if (isLoading || !user) return;
    api<{ komplain: KomplainDetail }>(`/api/komplain/${id}`)
      .then((r) => setKomplain(r.komplain))
      .catch((err) => toast(err.message, "error"))
      .finally(() => setMemuat(false));
  }, [id, isLoading, user]);

  if (isLoading || !user || memuat) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 pb-24 md:pb-12">
          <SkeletonBar />
        </main>
      </div>
    );
  }

  if (!komplain) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 pb-24 md:pb-12">
          <p>Komplain tidak ditemukan</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 pb-24 md:pb-12">
        <p className="text-sm text-ink-muda">
          <Link href="/riwayat-komplain" className="hover:text-brand">
            Riwayat Komplain
          </Link>{" "}
          / Detail
        </p>
        <h1 className="mt-1 text-2xl font-bold md:text-3xl">Detail Komplain</h1>

        <Card className="mt-4 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium">
                {komplain.pesananItem.namaItemSnapshot}
                {komplain.pesananItem.varianSnapshot ? ` (${komplain.pesananItem.varianSnapshot})` : ""}
              </p>
              <p className="text-xs text-ink-muda">Invoice: {komplain.pesananItem.pesanan.noInvoice}</p>
            </div>
            <Badge status={komplain.status} />
          </div>

          <div className="mt-4 border-t border-garis pt-4 text-sm">
            <p className="font-semibold">Alasan:</p>
            <p className="text-ink-muda">{LABEL_ALASAN[komplain.alasan] ?? komplain.alasan}</p>
          </div>

          <div className="mt-2 text-sm">
            <p className="font-semibold">Deskripsi:</p>
            <p className="text-ink-muda">{komplain.deskripsi}</p>
          </div>

          {komplain.gambar.length > 0 && (
            <div className="mt-3">
              <p className="mb-2 text-sm font-semibold">Foto Bukti:</p>
              <div className="flex gap-2">
                {komplain.gambar.map((g, idx) => (
                  <img
                    key={idx}
                    src={g.urlGambar}
                    alt={`Bukti ${idx + 1}`}
                    className="h-32 w-32 rounded-lg border border-garis object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {komplain.solusi && (
            <div className="mt-4 border-t border-garis pt-4 text-sm">
              <p className="font-semibold">Solusi:</p>
              <p className="text-ink-muda">{LABEL_SOLUSI[komplain.solusi] ?? komplain.solusi}</p>
              {komplain.catatanSolusi && (
                <p className="mt-1 text-ink-muda">Catatan: {komplain.catatanSolusi}</p>
              )}
            </div>
          )}

          <p className="mt-4 text-xs text-ink-muda">Diajukan: {formatTanggalWaktu(komplain.tglKomplain)}</p>
          {komplain.tglDiselesaikan && (
            <p className="text-xs text-ink-muda">Diselesaikan: {formatTanggalWaktu(komplain.tglDiselesaikan)}</p>
          )}
        </Card>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
