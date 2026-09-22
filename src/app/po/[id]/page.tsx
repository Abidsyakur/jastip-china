"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { rupiah, formatTanggalWaktu } from "@/lib/format";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkeletonBar } from "@/components/ui/feedback";
import { toast } from "@/components/ui/toaster";
import { useRequireCustomer } from "@/components/auth-guard";
import { labelKurir } from "@/lib/kurir";
import type { PermintaanPO, Alamat } from "@/lib/types";
import type { KurirDomestik } from "@/lib/tarif";

export default function DetailPOPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isLoading } = useRequireCustomer();
  const [po, setPo] = useState<PermintaanPO | null>(null);
  const [alamat, setAlamat] = useState<Alamat[]>([]);
  const [alamatId, setAlamatId] = useState("");
  const [kurir, setKurir] = useState<KurirDomestik>("jnt");
  const [kirim, setKirim] = useState(false);

  useEffect(() => {
    if (isLoading || !user) return;
    (async () => {
      try {
        const [p, a] = await Promise.all([
          api<{ po: PermintaanPO }>(`/api/permintaan-po/${id}`),
          api<{ items: Alamat[] }>("/api/alamat").catch(() => ({ items: [] as Alamat[] })),
        ]);
        setPo(p.po);
        setAlamat(a.items);
        if (a.items[0]) setAlamatId(a.items[0].id);
      } catch (err) {
        toast(err instanceof Error ? err.message : "Gagal", "error");
      }
    })();
  }, [isLoading, user, id]);

  const respon = async (setuju: boolean) => {
    if (setuju && !alamatId) {
      toast("Pilih alamat dulu", "error");
      return;
    }
    if (setuju && !confirm("Setuju sama penawaran ini? Lanjut ke pembayaran.")) return;
    setKirim(true);
    try {
      const res = await api<{ dikonversiJadiPesanan: boolean; pesanan?: { id: string } }>(
        `/api/permintaan-po/${id}/respon`,
        {
          method: "PATCH",
          body: setuju
            ? { setuju: true, alamatId, preferensiKurir: kurir, metode: "transfer_bank" }
            : { setuju: false },
        }
      );
      if (setuju && res.pesanan) {
        router.push(`/pesanan/${res.pesanan.id}/pembayaran`);
      } else {
        toast("Penawaran ditolak", "sukses");
        router.push("/pesanan?tab=po");
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : "Gagal", "error");
    } finally {
      setKirim(false);
    }
  };

  if (isLoading || !user || !po) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-6">
          <SkeletonBar /> <div className="mt-2" /> <SkeletonBar />
        </main>
      </div>
    );
  }

  const subtotal = Number(po.estimasiHarga ?? 0) * po.jumlahDiminta;
  const jasa = Math.max(Math.round(subtotal * 0.35), 15000);
  const total = subtotal + jasa + Number(po.estimasiOngkir ?? 0);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <p className="text-sm text-ink-muda">
          <Link href="/pesanan?tab=po" className="hover:text-brand">Pengajuan PO</Link> / Detail
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold md:text-2xl">{po.deskripsiSpesifikasi.slice(0, 50)}</h1>
          <Badge status={po.status} />
        </div>
        <p className="text-sm text-ink-muda">{formatTanggalWaktu(po.tglSubmit)}</p>

        <Card className="mt-4 p-4 text-sm">
          <p className="mb-2 font-display text-lg font-bold">Detail Permintaan</p>
          {po.linkProdukReferensi && (
            <p>
              Link:{" "}
              <a href={po.linkProdukReferensi} target="_blank" rel="noreferrer" className="text-brand underline">
                Buka Link
              </a>
            </p>
          )}
          <p className="mt-1 whitespace-pre-line">{po.deskripsiSpesifikasi}</p>
          {po.fotoReferensiUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={po.fotoReferensiUrl} alt="Referensi" className="mt-2 max-h-48 rounded-lg object-contain" />
          )}
          <p className="mt-2">Jumlah diminta: {po.jumlahDiminta}</p>
        </Card>

        {po.status === "MENUNGGU_REVIEW" && (
          <Card className="mt-4 p-4 text-center text-sm text-ink-muda">
            Admin lagi review permintaanmu. Penawaran akan muncul di sini dalam 1-2 hari kerja.
          </Card>
        )}

        {(po.status === "DIKONFIRMASI_HARGA" || po.status === "SUDAH_JADI_PESANAN") && (
          <Card className="mt-4 p-4 text-sm">
            <p className="mb-2 font-display text-lg font-bold">Penawaran Admin</p>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between"><span>Harga per unit</span><span>{rupiah(po.estimasiHarga ?? 0)}</span></div>
              <div className="flex justify-between"><span>Jumlah</span><span>{po.jumlahDiminta}</span></div>
              <div className="flex justify-between"><span>Jasa Titip (35%)</span><span>{rupiah(jasa)}</span></div>
              <div className="flex justify-between"><span>Estimasi Ongkir</span><span>{rupiah(po.estimasiOngkir ?? 0)}</span></div>
              <div className="my-1 h-px bg-garis" />
              <div className="flex justify-between font-semibold">
                <span>Total Estimasi</span>
                <span className="text-gold-tua">{rupiah(total)}</span>
              </div>
            </div>
            {po.catatanAdmin && <p className="mt-2 text-ink-muda">Catatan admin: {po.catatanAdmin}</p>}

            {po.status === "DIKONFIRMASI_HARGA" && (
              <div className="mt-4">
                <p className="mb-2 font-medium">Alamat pengiriman</p>
                <div className="flex flex-col gap-2">
                  {alamat.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setAlamatId(a.id)}
                      className={`rounded-lg border p-2 text-left text-sm ${alamatId === a.id ? "border-brand bg-brand/5" : "border-garis"}`}
                    >
                      {a.label} — {a.alamatLengkap}, {a.kota}
                    </button>
                  ))}
                  {alamat.length === 0 && (
                    <Link href="/akun" className="text-sm text-brand underline">
                      Tambah alamat dulu di halaman akun
                    </Link>
                  )}
                </div>
                <p className="mb-2 mt-3 font-medium">Kurir</p>
                <div className="flex gap-2">
                  {(["jnt", "shopee_express"] as KurirDomestik[]).map((k) => (
                    <button
                      key={k}
                      onClick={() => setKurir(k)}
                      className={`rounded-lg border px-3 py-2 text-sm ${kurir === k ? "border-brand bg-brand/5 font-semibold" : "border-garis"}`}
                    >
                      {labelKurir(k)}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button varian="danger" className="flex-1" memuat={kirim} onClick={() => respon(false)}>
                    Tolak Penawaran
                  </Button>
                  <Button className="flex-1" memuat={kirim} onClick={() => respon(true)}>
                    Setuju dan Lanjut
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {po.status === "DITOLAK" && (
          <Card className="mt-4 p-4 text-center text-sm">
            <p>Penawaran ditolak. Bisa ajukan PO baru kapan aja.</p>
            <Link href="/ajukan-po" className="mt-2 inline-block">
              <Button ukuran="sm">Ajukan PO Baru</Button>
            </Link>
          </Card>
        )}
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
