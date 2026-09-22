"use client";

import Link from "next/link";
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

  const keluar = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-cream">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col bg-ink text-cream md:flex">
        <div className="border-b border-cream/10 p-4">
          <p className="font-display text-lg font-bold text-gold">Jastip China</p>
          <p className="text-xs opacity-70">Admin Only</p>
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
      <div className="pb-20 md:ml-60 md:pb-0">
        <div className="border-b border-garis bg-white px-4 py-3 md:hidden">
          <p className="font-display font-bold text-brand">Jastip China Admin</p>
        </div>
        <main className="mx-auto max-w-5xl p-4 md:p-6">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-garis bg-white md:hidden">
          {MENU.slice(0, 5).map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`flex flex-col items-center py-2 text-[11px] ${
                pathname?.startsWith(m.href) ? "font-semibold text-brand" : "text-ink-muda"
              }`}
            >
              {m.label.split(" ")[0]}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
