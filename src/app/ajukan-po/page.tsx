"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { SiteHeader, SiteFooter } from "@/components/layout/site";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/input";
import { QtyStepper } from "@/components/qty-stepper";
import { UploadField } from "@/components/upload-field";
import { toast } from "@/components/ui/toaster";
import { useRequireCustomer } from "@/components/auth-guard";

const skema = z.object({
  linkProdukReferensi: z.string().trim().url("Link tidak valid").optional().or(z.literal("")),
  deskripsiSpesifikasi: z
    .string()
    .trim()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(2000),
  jumlahDiminta: z.coerce.number().int().min(1),
});

type FormPO = z.infer<typeof skema>;

export default function AjukanPOPage() {
  const { user, isLoading } = useRequireCustomer();
  const router = useRouter();
  const [foto, setFoto] = useState<string | null>(null);
  const [galat, setGalat] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormPO>({ resolver: zodResolver(skema), defaultValues: { jumlahDiminta: 1 } });
  const jumlah = watch("jumlahDiminta");

  const kirim = async (data: FormPO) => {
    setGalat(null);
    try {
      const res = await api<{ po: { id: string } }>("/api/permintaan-po", {
        method: "POST",
        body: {
          linkProdukReferensi: data.linkProdukReferensi || undefined,
          deskripsiSpesifikasi: data.deskripsiSpesifikasi,
          fotoReferensiUrl: foto ?? undefined,
          jumlahDiminta: data.jumlahDiminta,
        },
      });
      toast("Permintaan PO terkirim. Tunggu review admin ya.", "sukses");
      router.push(`/po/${res.po.id}`);
    } catch (err) {
      setGalat(err instanceof Error ? err.message : "Gagal");
    }
  };

  if (isLoading || !user) return null;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-12">
        <h1 className="text-2xl font-bold md:text-3xl">Ajukan Custom PO</h1>
        <Card className="mt-4 border-l-4 border-l-brand p-4 text-sm text-ink-muda">
          Mau beli barang yang nggak ada di katalog? Kirim link produk dari China, tim kami akan
          kasih estimasi harga dalam 1-2 hari kerja.
        </Card>

        <form onSubmit={handleSubmit(kirim)} className="mt-4 flex flex-col gap-4">
          <Field
            label="Link Produk Referensi"
            error={errors.linkProdukReferensi?.message}
            bantu="Contoh: link Taobao, 1688, atau AliExpress (opsional)"
          >
            <Input {...register("linkProdukReferensi")} placeholder="https://taobao.com/..." inputMode="url" />
          </Field>

          <Field label="Deskripsi Spesifikasi" error={errors.deskripsiSpesifikasi?.message} bantu="Minimal 10 karakter">
            <Textarea
              {...register("deskripsiSpesifikasi")}
              placeholder="Mau beli sepatu running brand X, size 42, warna hitam..."
            />
          </Field>

          <div>
            <p className="mb-1 text-sm font-medium">Foto Referensi (opsional, 1 foto)</p>
            <UploadField tujuan="referensi-po" nilai={foto} onBerubah={setFoto} />
          </div>

          <div>
            <p className="mb-1 text-sm font-medium">Jumlah Diminta</p>
            <QtyStepper nilai={jumlah} min={1} onUbah={(v) => setValue("jumlahDiminta", v)} />
          </div>

          {galat && <p className="text-sm text-merah-muda">{galat}</p>}
          <Button memuat={isSubmitting}>Kirim Permintaan</Button>
        </form>
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
