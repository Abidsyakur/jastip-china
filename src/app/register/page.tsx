// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  noWa: z.string().min(10, "Nomor WhatsApp tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      await registerUser(data.nama, data.noWa, null, data.password);
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registrasi gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Daftar Akun Baru</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input
              {...register("nama")}
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.nama && (
              <span className="text-sm text-red-600">{errors.nama.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nomor WhatsApp</label>
            <input
              {...register("noWa")}
              type="text"
              placeholder="08xxxxxxxxxx"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.noWa && (
              <span className="text-sm text-red-600">{errors.noWa.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <span className="text-sm text-red-600">{errors.password.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Konfirmasi Password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-600">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Daftar"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
