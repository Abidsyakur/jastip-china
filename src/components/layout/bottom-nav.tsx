"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/keranjang", label: "Keranjang" },
  { href: "/akun", label: "Profil" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-garis bg-white md:hidden">
      <div className="grid grid-cols-4">
        {MENU.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`flex flex-col items-center py-2 text-xs ${
              pathname === m.href ? "font-semibold text-brand" : "text-ink-muda"
            }`}
          >
            {m.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
