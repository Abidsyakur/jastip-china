// Label tampil untuk enum kurir backend (jnt | shopee_express).
export const LABEL_KURIR: Record<string, string> = {
  jnt: "J&T",
  shopee_express: "Shopee Express",
};

export function labelKurir(kode: string | null | undefined): string {
  if (!kode) return "-";
  return LABEL_KURIR[kode] ?? kode;
}

export default labelKurir;
