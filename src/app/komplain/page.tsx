"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Textarea, Select } from "@/components/ui/input";
import { SkeletonBar } from "@/components/ui/feedback";
import { UploadField } from "@/components/upload-field";
import { toast } from "@/components/ui/toaster";
import { useRequireCustomer } from "@/components/auth-guard";
import type { Pesanan } from "@/lib/types";

const ALASAN = [
  { nilai: "BARANG_RUSAK", label: "Barang rusak" },
  { nilai: "TIDAK_SESUAI_DESKRIPSI", label: "Barang tidak sesuai deskripsi" },
  { nilai: "SALAH_KIRIM", label: "Salah kirim (varian / jumlah)" },
  { nilai: "LAINNYA", label: "Lainnya" },
];

const skema = z.object({
  pesananItemId: z.string().min(1, "Pilih item dulu"),
  alasan: z.enum(["BARANG_RUSAK", "TIDAK_SESUAI_DESKRIPSI", "SALAH_KIRIM", "LAINNYA"]),
  deskripsi: z.string().trim().max(1000).optional(),
});

function KomplainIsi({ pesananAwal }: { pesananAwal: string }) {
  const { user, isLoading } = useRequireCustomer();
  const router = useRouter();
  const [daftar, setDaftar] = useState<Pesanan[]>([]);
  const [pesananId, setPesananId] = useState(pesananAwal);
  const [foto, setFoto] = useState<string | null>(null);
  const [galat, setGalat] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof skema>>({ resolver: zodResolver(skema) });

  useEffect(() => {
    if (isLoading || !user) return;
    api<{ items: Pesanan[] }>("/api/pesanan")
      .then((r) => setDaftar(r.items.filter((p) => p.statusPesanan === "SELESAI")))
      .catch((err) => toast(err.message, "error"));
  }, [isLoading, user]);

  const pesanan = daftar.find((p) => p.id === pesananId) ?? null;

  const kirim = async (data: z.infer<typeof skema>) => {
    if (!foto) {
      setGalat("1 foto bukti wajib diupload");
      return;
    }
    setGalat(null);
    try {
      await api("/api/komplain", {
        method: "POST",
        body: { pesananItemId: data.pesananItemId, alasan: data.alasan, buktiFoto: foto, deskripsi: data.deskripsi || undefined },
      });
      toast("Komplain terkirim. Admin respon maksimal 2x24 jam hari kerja.", "sukses");
      router.push("/pesanan");
    } catch (err) {
      setGalat(err instanceof Error ? err.message : "Gagal");
    }
  };

  if (isLoading || !user) return null;

  return (
    <form onSubmit={handleSubmit(kirim)} className="flex flex-col gap-4">
      <Card className="border-l-4 border-l-brand p-4 text-sm text-ink-muda">
        Komplain cuma bisa buat pesanan yang udah selesai. Admin respon maksimal 2x24 jam hari kerja.
      </Card>

      <Field label="Pesanan">
        <Select value={pesananId} onChange={(e) => setPesananId(e.target.value)}>
          <option value="">Pilih pesanan selesai</option>
          {daftar.map((p) => (
            <option key={p.id} value={p.id}>
              {p.noInvoice}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Item yang Dikomplain" error={errors.pesananItemId?.message}>
        <Select {...register("pesananItemId")} defaultValue="">
          <option value="" disabled>
            Pilih item
          </option>
          {(pesanan?.item ?? []).map((i) => (
            <option key={i.id} value={i.id}>
              {i.namaItemSnapshot}{i.varianSnapshot ? ` (${i.varianSnapshot})` : ""} × {i.jumlah}
            </option>
          ))}
        </Select>
      </Field>

      <div>
        <p className="mb-1 text-sm font-medium">Alasan Komplain</p>
        <div className="flex flex-col gap-2">
          {ALASAN.map((a) => (
            <label key={a.nilai} className="flex items-center gap-2 rounded-lg border border-garis p-3 text-sm">
              <input type="radio" value={a.nilai} {...register("alasan")} className="h-4 w-4 accent-[#C8102E]" />
              {a.label}
            </label>
          ))}
        </div>
        {errors.alasan && <p className="mt-1 text-xs text-merah-muda">Pilih alasan dulu</p>}
      </div>

      <Field label="Deskripsi Masalah (opsional)" error={errors.deskripsi?.message}>
        <Textarea {...register("deskripsi")} placeholder="Ceritakan kronologi singkat..." />
      </Field>

      <div>
        <p className="mb-1 text-sm font-medium">Foto Bukti (wajib, 1 foto)</p>
        <UploadField tujuan="bukti-komplain" nilai={foto} onBerubah={setFoto} />
      </div>

      {galat && <p className="text-sm text-merah-muda">{galat}</p>}
      <Button memuat={isSubmitting}>Kirim Komplain</Button>
    </form>
  );
}

export default function KomplainPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">Ajukan Komplain</h1>
        <Suspense fallback={<SkeletonBar />}>
          <KomplainBoot />
        </Suspense>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}

function KomplainBoot() {
  const params = useSearchParams();
  return <KomplainIsi pesananAwal={params.get("pesananId") ?? ""} />;
}
