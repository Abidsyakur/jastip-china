import { NextResponse } from "next/server";
import { ZodError, ZodSchema } from "zod";

/**
 * Parse & validasi body request JSON pakai skema Zod.
 * Return union type: { data } kalau sukses, { error } (NextResponse siap pakai) kalau gagal.
 * Ini yang bikin format error 400 SERAGAM di semua endpoint — sebelumnya tiap
 * route bikin format sendiri-sendiri.
 *
 * Contoh pakai di route handler:
 *
 *   const parsed = await parseBody(req, checkoutSchema);
 *   if ("error" in parsed) return parsed.error;
 *   const { alamatId, keranjangItemIds } = parsed.data; // sudah typed & valid
 */
export async function parseBody<T>(
  req: Request,
  schema: ZodSchema<T>
): Promise<{ data: T } | { error: NextResponse }> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return {
      error: NextResponse.json({ error: "Body request bukan JSON valid" }, { status: 400 }),
    };
  }

  const result = schema.safeParse(json);
  if (!result.success) {
    return {
      error: NextResponse.json(
        { error: "Validasi gagal", detail: formatZodError(result.error) },
        { status: 400 }
      ),
    };
  }

  return { data: result.data };
}

/** Sama seperti parseBody, tapi untuk query string (searchParams) di GET request. */
export function parseQuery<T>(
  searchParams: URLSearchParams,
  schema: ZodSchema<T>
): { data: T } | { error: NextResponse } {
  const raw = Object.fromEntries(searchParams.entries());
  const result = schema.safeParse(raw);
  if (!result.success) {
    return {
      error: NextResponse.json(
        { error: "Query tidak valid", detail: formatZodError(result.error) },
        { status: 400 }
      ),
    };
  }
  return { data: result.data };
}

function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join(".") || "(root)",
    pesan: issue.message,
  }));
}
