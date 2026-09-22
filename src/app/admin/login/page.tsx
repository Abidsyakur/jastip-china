"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";

const skema = z.object({
  email: z.string().trim().email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [galat, setGalat] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof skema>>({ resolver: zodResolver(skema) });

  const kirim = async (data: z.infer<typeof skema>) => {
    setGalat(null);
    try {
      await login(data.email, data.password, "admin");
      router.push("/admin/dashboard");
    } catch (err) {
      setGalat(err instanceof Error ? err.message : "Login gagal");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-8">
      <Card className="w-full max-w-md p-6 md:p-8">
        <p className="text-center font-display text-xl font-bold text-brand">Jastip China</p>
        <h1 className="mt-1 text-center text-lg font-semibold">Masuk khusus admin untuk kelola toko.</h1>
        <form onSubmit={handleSubmit(kirim)} className="mt-6 flex flex-col gap-4">
          <Field label="Email" error={errors.email?.message}>
            <Input {...register("email")} placeholder="admin@jastipchina.id" inputMode="email" />
          </Field>
          <Field label="Password" error={errors.password?.message}>
            <Input {...register("password")} type="password" placeholder="••••••••" />
          </Field>
          {galat && <p className="text-sm text-merah-muda">{galat}</p>}
          <Button memuat={isSubmitting}>Masuk Dashboard</Button>
        </form>
      </Card>
    </main>
  );
}
