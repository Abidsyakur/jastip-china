# Panduan Rakit n8n — Jastip China Automation

3 workflow, masing-masing 3-4 node. Semua endpoint sudah LIVE di prod.

**Base URL**: `https://jastip-nihao.vercel.app`
**CRON_SECRET**: `M4kVEtDu9j1x708Q2Ucz8NFHItU3nJWUe1ZEGqCiBxg=`
**FONNTE_API_TOKEN**: token Fonnte (lihat Vercel env / dashboard fonnte.com)
**WA Admin**: `6287898388993`

> Hosting n8n: n8n Cloud (trial 14 hari), atau self-host gratis via Docker
> di VPS/Railway/Render. Cron-job.org juga bisa sebagai alternatif tanpa n8n
> (tinggal GET endpoint + header Bearer, tanpa WA relay).

---

## Workflow A — Uptime Monitor (5 menit)

Fungsi: ping health check tiap 5 menit, WA admin kalau app/DB down.

| # | Node (n8n) | Setting |
|---|---|---|
| 1 | **Schedule Trigger** | Interval: every **5 minutes** |
| 2 | **HTTP Request** | Method: `GET`, URL: `https://jastip-nihao.vercel.app/api/health` |
| 3 | **IF** | Condition: `{{ $json.status }}` **is not equal to** `ok` |
| 3-true | **HTTP Request** (WA admin) | Method: `POST`, URL: `https://api.fonnte.com/send`<br>Header: `Authorization: <FONNTE_API_TOKEN>`<br>Body (form-urlencoded): `target=6287898388993`, `message=🚨 ALERT Jastip China: app/DB down ({{ $json.db }}). Cek Vercel dashboard.` |
| 3-false | (tidak ada — selesai) | |

---

## Workflow B — Cron Order Jobs (15 menit)

Fungsi: jalankan job pesanan otomatis — kadaluwarsa + reminder pembayaran.

| # | Node (n8n) | Setting |
|---|---|---|
| 1 | **Schedule Trigger** | Interval: every **15 minutes** |
| 2 | **HTTP Request** — kadaluwarsa | Method: `GET`, URL: `https://jastip-nihao.vercel.app/api/cron/cek-kadaluwarsa`<br>Header: `Authorization: Bearer M4kVEtDu9j1x708Q2Ucz8NFHItU3nJWUe1ZEGqCiBxg=` |
| 3 | **HTTP Request** — reminder | Method: `GET`, URL: `https://jastip-nihao.vercel.app/api/cron/reminder-pembayaran`<br>Header: `Authorization: Bearer M4kVEtDu9j1x708Q2Ucz8NFHItU3nJWUe1ZEGqCiBxg=`<br>(sambungkan dari node 2 — sequential) |

> Node 2 & 3 tidak boleh paralel dari trigger yang sama? Boleh saja paralel
> di n8n (branch dari Schedule Trigger). Sequential lebih aman urutan log.

---

## Workflow C — Laporan Harian (21:00 WIB)

Fungsi: digest harian siap-relay ke WA admin. Endpoint sudah return `pesan`
jadi kalimat — n8n tidak perlu format apa pun.

| # | Node (n8n) | Setting |
|---|---|---|
| 1 | **Schedule Trigger** | Custom cron (UTC): `0 14 * * *` (= 21:00 WIB) |
| 2 | **HTTP Request** | Method: `GET`, URL: `https://jastip-nihao.vercel.app/api/cron/laporan-harian`<br>Header: `Authorization: Bearer M4kVEtDu9j1x708Q2Ucz8NFHItU3nJWUe1ZEGqCiBxg=` |
| 3 | **HTTP Request** (Fonnte) | Method: `POST`, URL: `https://api.fonnte.com/send`<br>Header: `Authorization: <FONNTE_API_TOKEN>`<br>Body (form-urlencoded): `target=6287898388993`, `message={{ $json.pesan }}` |

---

## Tips

1. **Credentials**: simpan `CRON_SECRET` dan `FONNTE_API_TOKEN` sebagai
   n8n *credential* (Header Auth) — jangan hardcode di node, supaya ganti
   secret cukup di satu tempat.
2. **Test dulu**: tiap workflow, klik **Execute Workflow** manual sekali
   sebelum aktivasi — cek output tiap node.
3. **Aktivasi**: toggle **Active** (kanan atas) supaya jalan 24/7.
4. **Error workflow**: tambahkan node **Error Trigger** yang kirim WA admin
   kalau workflow gagal (opsional).
5. **sync-kurs TIDAK dipasang** — sesuai keputusan, kurs dikontrol manual
   di `/admin/kurs`.
