import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m", target: 20 },
    { duration: "20s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<800"],
  },
};

const BASE = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const hasil = http.batch([
    ["GET", `${BASE}/api/health`],
    ["GET", `${BASE}/api/produk`],
    ["GET", `${BASE}/api/kategori`],
    ["GET", `${BASE}/api/statistik-publik`],
    ["GET", `${BASE}/katalog`],
  ]);
  hasil.forEach((r) => check(r, { "status 200": (x) => x.status === 200 }));
  sleep(1);
}