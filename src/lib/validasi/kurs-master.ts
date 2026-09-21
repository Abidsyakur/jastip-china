// letak: src/lib/validasi/kurs-master.ts
import { z } from "zod";
import { uangPositifSchema } from "./common";

export const buatKursMasterSchema = z.object({
  kursRmbIdr: uangPositifSchema,
});
export type BuatKursMasterInput = z.infer<typeof buatKursMasterSchema>;