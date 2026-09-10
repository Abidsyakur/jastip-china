import { z } from "zod";
import { emailSchema, noWaSchema, passwordSchema } from "./common";

// POST /api/auth/register
export const registerSchema = z.object({
  nama: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
  noWa: noWaSchema, // unique di DB — cek duplikat tetap di layer service, bukan di sini
  email: emailSchema.optional(),
  password: passwordSchema,
});
export type RegisterInput = z.infer<typeof registerSchema>;

// POST /api/auth/login — customer login pakai noWa ATAU email, minimal salah satu
export const loginSchema = z
  .object({
    noWa: noWaSchema.optional(),
    email: emailSchema.optional(),
    password: z.string().min(1, "Password wajib diisi"),
  })
  .refine((data) => Boolean(data.noWa || data.email), {
    message: "Isi noWa atau email",
    path: ["noWa"],
  });
export type LoginInput = z.infer<typeof loginSchema>;

// POST /api/auth/admin-login — Admin.email unique di schema, jadi login pakai email
export const adminLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password wajib diisi"),
});
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

// POST /api/auth/refresh — biasanya refreshToken dari cookie httpOnly,
// tapi kalau dikirim via body juga tetap divalidasi
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "refreshToken wajib diisi"),
});
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

// POST /api/auth/logout
export const logoutSchema = z.object({
  refreshToken: z.string().min(1).optional(),
});

// POST /api/auth/forgot-password — kirim link reset ke email
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// POST /api/auth/reset-password — pakai token dari ResetPasswordToken
export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token wajib diisi"),
  passwordBaru: passwordSchema,
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
