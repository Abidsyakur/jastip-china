# Setup Oracle Cloud Free Tier + Docker + n8n (24/7 Gratis)

Panduan lengkap VPS gratis permanen untuk menjalankan n8n 24/7.
Free tier: **Ampere A1 ARM** — 4 OCPU / 24 GB RAM (cukup jauh untuk n8n + lainnya).

---

## Step 1 — Daftar Akun Oracle Cloud

1. Buka `https://www.oracle.com/cloud/free/` → **Start for free**
2. Isi email, nama, negara **Indonesia**, nomor HP, alamat
3. Verifikasi email + nomor HP (OTP)
4. **Kartu kredit/debit** untuk verifikasi identitas — TIDAK ditagih
   (hanya authorization sementara ±$1, tidak jadi charge)
5. **Home Region: pilih Singapore (ap-singapore-1)** — terdekat dari
   Indonesia, latensi rendah. Free tier resources cuma bisa di 1 region,
   jadi pilih yang benar dari awal (tidak bisa pindah).
6. Review akun bisa makan 15-60 menit — tunggu email "Get Started"

---

## Step 2 — Buat VM (Compute Instance)

1. Menu ☰ → **Compute → Instances → Create Instance**
2. Nama: `n8n-server`
3. Image: **Ubuntu 22.04 LTS** (Minimal a.k.a Canonical)
4. Shape: **Ampere** → **VM.Standard.A1.Flex** → **2 OCPU, 12 GB RAM**
   (free tier total 4 OCPU/24GB — sisakan untuk kebutuhan lain)
5. Boot volume: default 50 GB (free 200 GB total)
6. **SSH Keys**: pilih *Generate a key pair* → download PRIVATE key
   (`.key` file) — simpan aman, tidak bisa di-download lagi
7. **Create** → tunggu status RUNNING, catat **Public IP Address**

---

## Step 3 — Buka Port Firewall

### 3a. Security List (level cloud)
Menu → **Networking → Virtual Cloud Networks** → VCN milikmu →
**Security Lists → Default Security List → Add Ingress Rules**:

| Source CIDR | IP Protocol | Destination Port |
|---|---|---|
| `0.0.0.0/0` | TCP | `443` |
| `0.0.0.0/0` | TCP | `80` |

### 3b. OS firewall (iptables di Ubuntu Oracle)
Image Ubuntu Oracle punya default REJECT rules — harus diedit:

```bash
ssh -i <private-key>.key ubuntu@<PUBLIC_IP>
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo netfilter-persistent save
```

---

## Step 4 — Install Docker + n8n

```bash
# Docker (official script)
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu
# logout lalu login lagi supaya group docker aktif

# n8n (image resmi support ARM64)
docker volume create n8n_data
docker run -d --name n8n --restart unless-stopped \
  -p 5678:5678 \
  -e GENERIC_TIMEZONE="Asia/Jakarta" \
  -e TZ="Asia/Jakarta" \
  -v n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n

# Cek jalan
docker logs -f n8n   # tunggu "Editor is now accessible via ..."
```

Test: buka `http://<PUBLIC_IP>:5678` di browser — editor n8n muncul.

---

## Step 5 — HTTPS via Cloudflare Tunnel (gratis, tanpa buka port)

n8n perlu HTTPS untuk cookie secure + webhook. Cara termudah & gratis:
**Cloudflare Tunnel** — butuh domain yang DNS-nya di-manage Cloudflare.

```bash
# Install cloudflared (ARM64)
curl -L -o cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64
sudo mv cloudflared /usr/local/bin/ && sudo chmod +x /usr/local/bin/cloudflared

# Login (buka URL yang muncul di browser, pilih domain kamu)
cloudflared tunnel login

# Buat tunnel + route DNS
cloudflared tunnel create n8n
cloudflared tunnel route dns n8n n8n.domainkamu.com

# Config
mkdir -p ~/.cloudflared
cat > ~/.cloudflared/config.yml <<EOF
tunnel: n8n
credentials-file: /home/ubuntu/.cloudflared/<TUNNEL-ID>.json
ingress:
  - hostname: n8n.domainkamu.com
    service: http://localhost:5678
  - service: http_status:404
EOF

# Jalankan sebagai service (auto-start 24/7)
sudo cloudflared service install
sudo systemctl enable --now cloudflared
sudo systemctl status cloudflared
```

Update n8n supaya pakai domain + cookie secure:

```bash
docker rm -f n8n
docker run -d --name n8n --restart unless-stopped \
  -p 5678:5678 \
  -e N8N_HOST="n8n.domainkamu.com" \
  -e N8N_SECURE_COOKIE=true \
  -e WEBHOOK_URL="https://n8n.domainkamu.com/" \
  -e GENERIC_TIMEZONE="Asia/Jakarta" \
  -e TZ="Asia/Jakarta" \
  -v n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

Akses final: `https://n8n.domainkamu.com` → buat akun owner n8n (email +
password lokal n8n) → import 3 workflow dari `docs/n8n/*.json` → aktifkan.

> **Tanpa domain?** n8n tetap bisa dipakai via `http://<PUBLIC_IP>:5678`
> dengan `-e N8N_SECURE_COOKIE=false` (Step 4 saja) — kurang aman (login
> n8n lewat HTTP polos) tapi berfungsi. Disarankan pakai domain.

---

## Step 6 — Import Workflow + Aktivasi

1. Buka `https://n8n.domainkamu.com` → daftar akun owner
2. **Workflows → ⋯ → Import from File** — import 3 file:
   - `docs/n8n/workflow-a-uptime-monitor.json`
   - `docs/n8n/workflow-b-cron-order-jobs.json`
   - `docs/n8n/workflow-c-laporan-harian.json`
3. Ganti `GANTI_FONNTE_TOKEN` di node WA dengan token Fonnte
4. **Execute Workflow** manual tiap workflow → cek output → **Active**

---

## Biaya: Rp 0/bulan

- VM Ampere A1: gratis (free tier)
- Cloudflare Tunnel: gratis
- Docker + n8n self-hosted: gratis (Community Edition)
- Bandingkan: n8n Cloud ±$24/bln

## Tips penting

1. **Upgrade instance shape tidak bisa?** Free tier A1 kapasitasnya
   "always free" tapi resource pool bisa penuh di region sibuk — kalau
   "Out of capacity" saat create, coba lagi beberapa kali / ganti
   availability domain.
2. **Backup n8n**: data workflow tersimpan di volume `n8n_data` —
   backup rutin: `docker run --rm -v n8n_data:/data -v $(pwd):/backup
   alpine tar czf /backup/n8n-backup.tar.gz /data`
3. **Jangan upgrade ke paid** tanpa sadar — free tier tidak auto-charge,
   kartu cuma bukan verifikasi.
