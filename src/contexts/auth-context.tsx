// src/contexts/auth-context.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api-client";

export interface AuthUser {
  id: string;
  nama: string;
  tipe: "customer" | "admin";
  role?: "OWNER" | "STAFF";
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (noWaAtauEmail: string, password: string, type: "customer" | "admin") => Promise<void>;
  logout: () => Promise<void>;
  register: (nama: string, noWa: string, email: string | null, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const KUNCI_USER = "auth_user";

function bacaPesanError(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Terjadi kesalahan, coba lagi";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const tersimpan = localStorage.getItem(KUNCI_USER);
      if (tersimpan) setUser(JSON.parse(tersimpan));
    } catch {
      localStorage.removeItem(KUNCI_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const simpanUser = (u: AuthUser) => {
    setUser(u);
    localStorage.setItem(KUNCI_USER, JSON.stringify(u));
  };

  const login = async (noWaAtauEmail: string, password: string, type: "customer" | "admin") => {
    setIsLoading(true);
    try {
      if (type === "admin") {
        const data = await api<{ admin: { id: string; nama: string; role: "OWNER" | "STAFF" } }>(
          "/api/auth/admin-login",
          { method: "POST", body: { email: noWaAtauEmail, password } }
        );
        simpanUser({ id: data.admin.id, nama: data.admin.nama, tipe: "admin", role: data.admin.role });
      } else {
        // Backend terima noWa ATAU email di field terpisah — deteksi dari @.
        const adalahEmail = noWaAtauEmail.includes("@");
        const data = await api<{ customer: { id: string; nama: string } }>("/api/auth/login", {
          method: "POST",
          body: adalahEmail
            ? { email: noWaAtauEmail, password }
            : { noWa: noWaAtauEmail, password },
        });
        simpanUser({ id: data.customer.id, nama: data.customer.nama, tipe: "customer" });
      }
    } catch (err) {
      throw new Error(bacaPesanError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch {
      // Logout tetap lanjut walau request gagal (cookie mungkin sudah mati).
    } finally {
      setUser(null);
      localStorage.removeItem(KUNCI_USER);
      setIsLoading(false);
    }
  };

  // Register TIDAK auto-login: backend cuma bikin akun (201 { customerId }),
  // tanpa sesi. Halaman register harus arahkan ke /login setelah sukses.
  const register = async (nama: string, noWa: string, email: string | null, password: string) => {
    setIsLoading(true);
    try {
      await api("/api/auth/register", {
        method: "POST",
        body: { nama, noWa, ...(email ? { email } : {}), password },
      });
    } catch (err) {
      throw new Error(bacaPesanError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
