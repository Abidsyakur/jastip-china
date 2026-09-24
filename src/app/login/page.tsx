"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";

const skema = z.object({
  noWa: z.string().trim().min(1, "Nomor WhatsApp wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

type FormLogin = z.infer<typeof skema>;

function LoginIsi() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();
  const [galat, setGalat] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLogin>({ resolver: zodResolver(skema) });

  const kirim = async (data: FormLogin) => {
    setGalat(null);
    try {
      await login(data.noWa, data.password, "customer");
      router.push(params.get("dari") ?? "/");
    } catch (err) {
      setGalat(err instanceof Error ? err.message : "Login gagal");
    }
  };

  return (
    <Card className="w-full max-w-md p-6 md:p-8">
      <div className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-nihao.png" alt="Nihao Jastip" className="h-14 w-auto" />
      </div>
      <p className="mt-2 text-center font-display text-2xl font-bold text-brand">é²œè´§ç›´è¾¾</p>
      <h1 className="mt-1 text-center text-xl font-semibold">Masuk ke akunmu</h1>
      <form onSubmit={handleSubmit(kirim)} className="mt-6 flex flex-col gap-4">
        <Field label="Nomor WhatsApp" error={errors.noWa?.message}>
          <Input {...register("noWa")} placeholder="08xxxxxxxxxx" inputMode="tel" />
        </Field>
        <div>
          <Field label="Password" error={errors.password?.message}>
            <Input {...register("password")} type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
          </Field>
          <div className="mt-1 text-right">
            <Link href="/forgot-password" className="text-sm text-brand">
              Lupa password?
            </Link>
          </div>
        </div>
        {galat && <p className="text-sm text-merah-muda">{galat}</p>}
        <Button memuat={isSubmitting}>Masuk</Button>
      </form>
      <p className="mt-4 text-center text-sm text-ink-muda">
        Belum punya akun?{" "}
        <Link href="/register" className="font-medium text-brand">
          Daftar di sini
        </Link>
      </p>
      <div className="my-4 h-px bg-garis" />
      <p className="text-center text-xs text-ink-muda">
        Butuh bantuan? Chat admin via WhatsApp di 0878-9838-8993.
      </p>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <Suspense fallback={null}>
        <LoginIsi />
      </Suspense>
    </main>
  );
}
