import React from "react";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-garis bg-[#d4af37] text-[#2c1810] ${className}`}>{children}</div>
  );
}
