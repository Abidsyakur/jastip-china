"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { toast } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";
import { SkeletonBar } from "@/components/ui/feedback";

// Halaman ini TIDAK ada di mockup pen.dev (link reset backend butuh tujuan)
// — dibangun mengikuti gaya form login.
const skema = z
  .object({
    passwordBaru: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Password harus ada huruf dan angka"),
    konfirmasi: z.string(),
  })
  .refine((d) => d.passwordBaru === d.konfirmasi, {
    message: "Konfirmasi password tidak cocok",
    path: ["konfirmasi"],
  });

function ResetIsi() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [galat, setGalat] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof skema>>({ resolver: zodResolver(skema) });

  const kirim = async (data: z.infer<typeof skema>) => {
    setGalat(null);
    try {
      await api("/api/auth/reset-password", {
        method: "POST",
        body: { token, passwordBaru: data.passwordBaru },
      });
      toast("Password berhasil diubah. Login dengan password baru.", "sukses");
      router.push("/login");
    } catch (err) {
      setGalat(err instanceof Error ? err.message : "Gagal");
    }
  };

  if (!token) {
    return (
      <Card className="w-full max-w-md p-6 text-center">
        <p className="font-medium">Link tidak valid</p>
        <p className="mt-1 text-sm text-ink-muda">Link reset harus dibuka dari WhatsApp.</p>
        <Link href="/forgot-password" className="mt-4 inline-block text-sm font-medium text-brand">
          Minta link baru
        </Link>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md p-6 md:p-8">
      <div className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-nihao.png" alt="Nihao Jastip" className="h-14 w-auto" />
      </div>
      <h1 className="mt-2 text-center text-xl font-semibold">Password Baru</h1>
      <form onSubmit={handleSubmit(kirim)} className="mt-6 flex flex-col gap-4">
        <Field label="Password Baru" error={errors.passwordBaru?.message} bantu="Min 8 karakter, ada huruf dan angka">
          <Input {...register("passwordBaru")} type="password" placeholder="••••••••" />
        </Field>
        <Field label="Konfirmasi Password Baru" error={errors.konfirmasi?.message}>
          <Input {...register("konfirmasi")} type="password" placeholder="••••••••" />
        </Field>
        {galat && <p className="text-sm text-merah-muda">{galat}</p>}
        <Button memuat={isSubmitting}>Simpan Password</Button>
      </form>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <Suspense fallback={<div className="w-full max-w-md"><SkeletonBar /></div>}>
        <ResetIsi />
      </Suspense>
    </main>
  );
}
