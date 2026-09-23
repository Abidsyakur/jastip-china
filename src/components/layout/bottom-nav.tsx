"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, User } from "lucide-react";

const MENU = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/katalog", label: "Katalog", icon: Package },
  { href: "/keranjang", label: "Keranjang", icon: ShoppingCart },
  { href: "/akun", label: "Profil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-garis bg-white md:hidden">
      <div className="grid grid-cols-4">
        {MENU.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.href}
              href={m.href}
              className={`flex flex-col items-center gap-1 py-2 text-xs ${
                pathname === m.href ? "font-semibold text-brand" : "text-ink-muda"
              }`}
            >
              <Icon size={20} />
              <span>{m.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
