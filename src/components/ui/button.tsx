import React from "react";

type Varian = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  varian?: Varian;
  ukuran?: "sm" | "md";
  penuh?: boolean;
  memuat?: boolean;
}

const gayaVarian: Record<Varian, string> = {
  primary: "bg-brand text-white hover:bg-brand-tua",
  secondary: "border border-brand text-brand hover:bg-brand/10 bg-transparent",
  ghost: "text-brand hover:bg-brand/10 bg-transparent",
  danger: "border border-merah-muda text-merah-muda hover:bg-merah-muda/10 bg-transparent",
};

export function Button({
  varian = "primary",
  ukuran = "md",
  penuh = false,
  memuat = false,
  className = "",
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        ukuran === "sm" ? "px-3 py-1.5 text-sm" : "px-6 py-3 text-base"
      } ${penuh ? "w-full" : ""} ${gayaVarian[varian]} ${className}`}
      disabled={disabled || memuat}
      {...rest}
    >
      {memuat && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
