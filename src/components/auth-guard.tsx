"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export function useRequireCustomer() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && (!user || user.tipe !== "customer")) router.replace("/login");
  }, [user, isLoading, router]);
  return { user, isLoading };
}

export function useRequireAdmin() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && (!user || user.tipe !== "admin")) router.replace("/admin/login");
  }, [user, isLoading, router]);
  return { user, isLoading };
}
