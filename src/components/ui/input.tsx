import React from "react";

const gayaInput =
  "w-full rounded-lg border border-garis bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muda/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-50";

export function Field({
  label,
  error,
  bantu,
  children,
}: {
  label: string;
  error?: string;
  bantu?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink">{label}</label>
      {children}
      {bantu && !error && <p className="mt-1 text-xs text-ink-muda">{bantu}</p>}
      {error && <p className="mt-1 text-xs text-merah-muda">{error}</p>}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${gayaInput} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${gayaInput} min-h-24 ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${gayaInput} ${props.className ?? ""}`} />;
}
