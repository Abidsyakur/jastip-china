"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";

// Password min 8 + huruf+angka (ikut backend passwordSchema + aturan mockup).
const skema = z
  .object({
    nama: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
    noWa: z.string().trim().min(9, "Nomor tidak valid"),
    email: z.string().trim().email("Format email tidak valid").optional().or(z.literal("")),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Password harus ada huruf dan angka"),
    konfirmasi: z.string(),
  })
  .refine((d) => d.password === d.konfirmasi, {
    message: "Konfirmasi password tidak cocok",
    path: ["konfirmasi"],
  });

type FormDaftar = z.infer<typeof skema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: daftar } = useAuth();
  const [galat, setGalat] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDaftar>({ resolver: zodResolver(skema) });

  const kirim = async (data: FormDaftar) => {
    setGalat(null);
    try {
      await daftar(data.nama, data.noWa, data.email || null, data.password);
      toast("Akun berhasil dibuat. Silakan login.", "sukses");
      router.push("/login");
    } catch (err) {
      setGalat(err instanceof Error ? err.message : "Registrasi gagal");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md p-6 md:p-8">
        <p className="text-center font-display text-2xl font-bold text-brand">鲜货直达</p>
        <h1 className="mt-1 text-center text-xl font-semibold">Daftar akun baru</h1>
        <form onSubmit={handleSubmit(kirim)} className="mt-6 flex flex-col gap-4">
          <Field label="Nama Lengkap" error={errors.nama?.message}>
            <Input {...register("nama")} placeholder="Budi Santoso" />
          </Field>
          <Field label="Nomor WhatsApp" error={errors.noWa?.message}>
            <Input {...register("noWa")} placeholder="08xxxxxxxxxx" inputMode="tel" />
          </Field>
          <Field label="Email (opsional)" error={errors.email?.message}>
            <Input {...register("email")} placeholder="nama@email.com" inputMode="email" />
          </Field>
          <Field label="Password" error={errors.password?.message} bantu="Min 8 karakter, ada huruf dan angka">
            <Input {...register("password")} type="password" placeholder="••••••••" />
          </Field>
          <Field label="Konfirmasi Password" error={errors.konfirmasi?.message}>
            <Input {...register("konfirmasi")} type="password" placeholder="••••••••" />
          </Field>
          {galat && <p className="text-sm text-merah-muda">{galat}</p>}
          <Button memuat={isSubmitting}>Daftar</Button>
        </form>
        <p className="mt-4 text-center text-sm text-ink-muda">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-medium text-brand">
            Masuk di sini
          </Link>
        </p>
      </Card>
    </main>
  );
}
