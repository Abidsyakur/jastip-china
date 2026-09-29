# Telegram ↔ OpenCode Bridge (Opsi B)

Chat dengan AI agent (OpenCode) langsung dari Telegram di HP — 24/7 via VPS.
**Zero dependencies**: Node 18+ saja, tanpa `npm install`.

## Arsitektur

```
HP (Telegram) → bot → bridge (script ini, VPS) → OpenCode Server (VPS) → AI → balik ke HP
```

## Jalankan di VPS (Oracle Cloud, setelah Step 1-4 panduan setup)

### 1. Install Node 20+ & clone repo

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
git clone https://github.com/Abidsyakur/jastip-china.git
cd jastip-china/bridge
```

### 2. Jalankan OpenCode Server (24/7)

```bash
cd ~/jastip-china
npm install -g opencode
opencode auth login   # login provider AI (nvidia/GLM)

# Service systemd — jalan permanen
sudo tee /etc/systemd/system/opencode-server.service > /dev/null <<EOF
[Unit]
Description=OpenCode Server
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/jastip-china
ExecStart=/usr/bin/opencode serve --port 4096
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable --now opencode-server
systemctl status opencode-server --no-pager
```

Cek: `curl http://127.0.0.1:4096/api/info` → balas JSON versi OpenCode.

### 3. Jalankan Bridge (24/7)

```bash
cd ~/jastip-china/bridge
sudo tee /etc/systemd/system/telegram-bridge.service > /dev/null <<EOF
[Unit]
Description=Telegram <-> OpenCode Bridge
After=network.target opencode-server.service

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/jastip-china/bridge
ExecStart=/usr/bin/node /home/ubuntu/jastip-china/bridge/telegram-bridge.mjs
Restart=always
RestartSec=5
Environment=TELEGRAM_BOT_TOKEN=<TOKEN_BOT_KAMU>
Environment=TELEGRAM_CHAT_ID=<CHAT_ID_KAMU>
Environment=OPENCODE_SERVER_URL=http://127.0.0.1:4096
Environment=OPENCODE_DIR=/home/ubuntu/jastip-china
Environment=BRIDGE_STATE_FILE=/home/ubuntu/jastip-china/bridge/bridge-state.json

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable --now telegram-bridge
journalctl -u telegram-bridge -f --no-pager
```

Coba chat bot di HP: `halo, status web app sekarang gimana?` → AI balas.

## Keamanan (WAJIB dipatuhi)

1. **Chat ID allowlist** — hanya chat ID kamu yang dilayani (sudah di-guard di script).
2. **Jangan ekspos port 4096** ke internet — OpenCode server cukup localhost,
   bridge akses via loopback. Security list Oracle: JANGAN buka 4096.
3. **Script punya prefix instruksi**: jawab ringkas, tidak destruktif tanpa
   diminta eksplisit — tapi ini bukan pengganti kehati-hatian: jangan minta
   "hapus database" via chat, kecuali kamu paham konsekuensinya.
4. **Secret**: token bot + chat ID di systemd unit (bukan di file repo yang
   ter-commit). Jangan commit token ke git.
5. **Biaya**: tiap chat = panggilan API model AI (per token).

## Troubleshooting

| Masalah | Cek |
|---|---|
| Bot tidak balas | `journalctl -u telegram-bridge -f` — lihat log |
| "OpenCode ... -> 502/timeout" | `systemctl status opencode-server` — server mati? |
| Balasan lama berulang | Hapus `bridge-state.json` → restart bridge |
| AI balas terpotong | Batas Telegram 4096 char — by design |
