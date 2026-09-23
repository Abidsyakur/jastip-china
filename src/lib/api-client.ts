// Fetch wrapper same-origin ke /api/* (satu aplikasi Next.js yang sama).
// Cookie httpOnly otomatis ikut (credentials: include). Error backend
// selalu berbentuk { error: string } — dilempar sebagai ApiError.

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface ApiOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
}

export async function api<T>(path: string, opts: ApiOptions = {}): Promise<T> {
  const res = await fetch(path, {
    method: opts.method ?? "GET",
    headers: opts.body !== undefined ? { "Content-Type": "application/json" } : undefined,
    credentials: "include",
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  if (res.status === 204) return undefined as T;

  const ct = res.headers.get("content-type") ?? "";
  const data: unknown = ct.includes("application/json") ? await res.json() : await res.text();

  if (!res.ok) {
    let pesan = `Gagal memuat (${res.status})`;
    if (typeof data === "object" && data !== null && "error" in data && typeof data.error === "string") {
      pesan = data.error;
      // Validasi Zod: { error: "Validasi gagal", detail: [{field, pesan}] }
      // Susun jadi satu baris yang bisa dibaca manusia, supaya user tahu
      // FIELD mana yang salah — bukan cuma "Validasi gagal" generik.
      if (
        data.error === "Validasi gagal" &&
        Array.isArray((data as { detail?: unknown }).detail)
      ) {
        const rincian = (
          (data as unknown as { detail: { field: string; pesan: string }[] }).detail ?? []
        )
          .map((d) => `${d.field}: ${d.pesan}`)
          .join("; ");
        if (rincian) pesan = `Validasi gagal — ${rincian}`;
      }
    }
    throw new ApiError(pesan, res.status);
  }

  return data as T;
}
