"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";

const skema = z.object({
  noWa: z.string().trim().min(1, "Nomor WhatsApp wajib diisi"),
});

export default function ForgotPasswordPage() {
  const [terkirim, setTerkirim] = useState(false);
  const [galat, setGalat] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof skema>>({ resolver: zodResolver(skema) });

  const kirim = async (data: z.infer<typeof skema>) => {
    setGalat(null);
    try {
      await api("/api/auth/forgot-password", { method: "POST", body: data });
      setTerkirim(true);
    } catch (err) {
      setGalat(err instanceof Error ? err.message : "Gagal");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md p-6 md:p-8">
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-nihao.png" alt="Nihao Jastip" className="h-14 w-auto" />
        </div>
        <h1 className="mt-2 text-center text-xl font-semibold">Lupa Password</h1>
        {terkirim ? (
          <div className="mt-6 text-center">
            <p className="font-medium">Link reset terkirim</p>
            <p className="mt-1 text-sm text-ink-muda">
              Kalau nomor terdaftar, link reset password sudah dikirim via WhatsApp (berlaku 1 jam).
            </p>
            <Link href="/login" className="mt-4 inline-block">
              <Button varian="secondary">Kembali ke Login</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(kirim)} className="mt-6 flex flex-col gap-4">
            <p className="text-sm text-ink-muda">
              Masukin nomor WhatsApp kamu. Link reset berlaku 1 jam.
            </p>
            <Field label="Nomor WhatsApp" error={errors.noWa?.message}>
              <Input {...register("noWa")} placeholder="08xxxxxxxxxx" inputMode="tel" />
            </Field>
            {galat && <p className="text-sm text-merah-muda">{galat}</p>}
            <Button memuat={isSubmitting}>Kirim Link Reset</Button>
            <p className="text-center text-sm text-ink-muda">
              Ingat password?{" "}
              <Link href="/login" className="font-medium text-brand">
                Kembali login
              </Link>
            </p>
          </form>
        )}
      </Card>
    </main>
  );
}
