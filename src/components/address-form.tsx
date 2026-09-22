"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PROVINSI_KE_ZONA } from "@/lib/tarif";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, Select } from "@/components/ui/input";
import type { Alamat } from "@/lib/types";

const skema = z.object({
  label: z.string().trim().min(2, "Label minimal 2 karakter").max(50),
  penerima: z.string().trim().min(2, "Nama penerima minimal 2 karakter").max(100),
  noTelp: z.string().trim().min(9, "Nomor tidak valid"),
  alamatLengkap: z.string().trim().min(10, "Alamat terlalu pendek").max(500),
  kota: z.string().trim().min(2).max(100),
  provinsi: z.string().min(1, "Pilih provinsi"),
  kodePos: z.string().trim().regex(/^\d{5}$/, "Kode pos harus 5 digit angka"),
});

type FormAlamat = z.infer<typeof skema>;

const DAFTAR_PROVINSI = Object.keys(PROVINSI_KE_ZONA);

// Form tambah alamat (dipakai checkout + akun). Provinsi dropdown dari sumber
// yang sama dengan kalkulator ongkir — tidak didaftar manual.
export function AddressForm({
  onSimpan,
  onBatal,
}: {
  onSimpan: (a: Alamat) => void;
  onBatal: () => void;
}) {
  const [galat, setGalat] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormAlamat>({ resolver: zodResolver(skema) });

  const kirim = async (data: FormAlamat) => {
    setGalat(null);
    try {
      const res = await api<{ alamat: Alamat }>("/api/alamat", { method: "POST", body: data });
      onSimpan(res.alamat);
    } catch (err) {
      setGalat(err instanceof Error ? err.message : "Gagal simpan alamat");
    }
  };

  return (
    <form onSubmit={handleSubmit(kirim)} className="flex flex-col gap-4">
      <Field label="Label Alamat" error={errors.label?.message}>
        <Input {...register("label")} placeholder="Rumah" />
      </Field>
      <Field label="Nama Penerima" error={errors.penerima?.message}>
        <Input {...register("penerima")} placeholder="Budi Santoso" />
      </Field>
      <Field label="No. Telp" error={errors.noTelp?.message}>
        <Input {...register("noTelp")} placeholder="081234567890" />
      </Field>
      <Field label="Alamat Lengkap" error={errors.alamatLengkap?.message}>
        <Textarea {...register("alamatLengkap")} placeholder="Jl. Merdeka No. 123, RT 01 RW 02" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Kota" error={errors.kota?.message}>
          <Input {...register("kota")} placeholder="Bandung" />
        </Field>
        <Field label="Kode Pos" error={errors.kodePos?.message}>
          <Input {...register("kodePos")} placeholder="40123" inputMode="numeric" />
        </Field>
      </div>
      <Field label="Provinsi" error={errors.provinsi?.message} bantu="Dibutuhkan untuk hitung ongkir">
        <Select {...register("provinsi")} defaultValue="">
          <option value="" disabled>
            Pilih provinsi
          </option>
          {DAFTAR_PROVINSI.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
      </Field>
      {galat && <p className="text-sm text-merah-muda">{galat}</p>}
      <div className="flex gap-2">
        <Button type="button" varian="secondary" onClick={onBatal} className="flex-1">
          Batal
        </Button>
        <Button memuat={isSubmitting} className="flex-1">
          Simpan
        </Button>
      </div>
    </form>
  );
}
