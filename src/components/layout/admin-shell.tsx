"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const MENU = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/pesanan", label: "Pesanan" },
  { href: "/admin/produk", label: "Produk" },
  { href: "/admin/kategori", label: "Kategori" },
  { href: "/admin/po", label: "Custom PO" },
  { href: "/admin/komplain", label: "Komplain" },
  { href: "/admin/kurs", label: "Kurs" },
  { href: "/admin/log", label: "Log Aktivitas" },
  { href: "/admin/pengaturan", label: "Pengaturan" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [bukaMenu, setBukaMenu] = useState(false);

  const keluar = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-cream">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col bg-ink text-cream md:flex">
        <div className="border-b border-cream/10 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-nihao.png" alt="Nihao Jastip" className="h-10 w-auto brightness-0 invert" />
          <p className="mt-1 text-xs opacity-70">Admin Only</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {MENU.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`rounded-lg px-3 py-2 text-sm ${
                pathname?.startsWith(m.href) ? "bg-cream/10 font-semibold text-gold" : "opacity-80 hover:bg-cream/5"
              }`}
            >
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-cream/10 p-4">
          <p className="text-sm">{user?.nama ?? "Admin"}</p>
          <button onClick={keluar} className="mt-1 text-xs opacity-70 hover:opacity-100">
            Keluar
          </button>
        </div>
      </aside>

      <div className="pb-12 md:ml-60 md:pb-0">
        <div className="flex items-center justify-between border-b border-garis bg-white px-4 py-3 md:hidden">
          <img src="/logo-nihao.png" alt="Nihao" className="h-8 w-auto" />
          <button
            onClick={() => setBukaMenu(!bukaMenu)}
            className="rounded-lg border border-garis px-3 py-1.5 text-sm font-medium"
          >
            {bukaMenu ? "Tutup" : "Menu ☰"}
          </button>
        </div>

        {bukaMenu && (
          <div className="border-b border-garis bg-white px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-2">
              {MENU.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  onClick={() => setBukaMenu(false)}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    pathname?.startsWith(m.href) ? "bg-brand/10 font-semibold text-brand" : "text-ink"
                  }`}
                >
                  {m.label}
                </Link>
              ))}
              <button
                onClick={keluar}
                className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-left text-sm font-medium text-red-600"
              >
                Keluar
              </button>
            </nav>
          </div>
        )}

        <main className="mx-auto max-w-5xl p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
