#!/usr/bin/env bash
# Uji end-to-end manual — jalankan setelah `npm run dev` aktif di terminal lain.
# Butuh: curl, ./jq.exe

set -uo pipefail
BASE="http://localhost:3000/api"
CUST_COOKIE=$(mktemp)
ADMIN_COOKIE=$(mktemp)
NOWA="081$(date +%s | tail -c 9)"

bagian() { echo -e "\n\n========== $1 =========="; }
langkah() { echo -e "\n--- $1 ---"; }

# ============================================================
bagian "1. AUTH — CUSTOMER"
# ============================================================

langkah "Register (EKSPEKTASI: 200, ada id+nama)"
curl -s -X POST "$BASE/auth/register" -H "Content-Type: application/json" \
  -d "{\"nama\":\"Budi Tester\",\"noWa\":\"$NOWA\",\"password\":\"passwordkuat123\"}" | ./jq.exe .

langkah "Register nomor SAMA lagi (EKSPEKTASI: 409)"
curl -s -o /dev/null -w "Status: %{http_code}\n" -X POST "$BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"nama\":\"Budi\",\"noWa\":\"$NOWA\",\"password\":\"passwordkuat123\"}"

langkah "Login salah password (EKSPEKTASI: 401)"
curl -s -w "\nStatus: %{http_code}\n" -X POST "$BASE/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"noWa\":\"$NOWA\",\"password\":\"salahini\"}"

langkah "Login BENAR, simpan cookie customer (EKSPEKTASI: 200, cookie ke-set)"
curl -s -c "$CUST_COOKIE" -X POST "$BASE/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"nama\":\"Budi Tester\",\"noWa\":\"$NOWA\",\"password\":\"passwordkuat123\"}" | ./jq.exe .

langkah "Rate limit — 6x login salah berturut-turut (EKSPEKTASI: percobaan ke-6 = 429)"
for i in 1 2 3 4 5 6; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"noWa\":\"$NOWA\",\"password\":\"salahterus\"}")
  echo "Percobaan $i: HTTP $STATUS"
done

langkah "Refresh token (EKSPEKTASI: 200, access_token baru)"
curl -s -c "$CUST_COOKIE" -b "$CUST_COOKIE" -X POST "$BASE/auth/refresh" | ./jq.exe .

# ============================================================
bagian "2. AUTH — ADMIN"
# ============================================================

langkah "Admin login (EKSPEKTASI: 200)"
curl -s -c "$ADMIN_COOKIE" -X POST "$BASE/auth/admin-login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jastipchina.local","password":"admin123"}' | ./jq.exe .

langkah "Akses endpoint admin PAKAI COOKIE CUSTOMER (EKSPEKTASI: 403)"
curl -s -o /dev/null -w "Status: %{http_code}\n" -b "$CUST_COOKIE" "$BASE/admin/dashboard/statistik"

# ============================================================
bagian "3. KATALOG — kategori & produk"
# ============================================================

langkah "Admin buat kategori (EKSPEKTASI: 200, dapat id)"
KATEGORI=$(curl -s -b "$ADMIN_COOKIE" -X POST "$BASE/admin/kategori" \
  -H "Content-Type: application/json" -d '{"namaKategori":"Elektronik Test"}')
echo "$KATEGORI" | ./jq.exe .
KATEGORI_ID=$(echo "$KATEGORI" | ./jq.exe -r '.kategori.id // .id')

langkah "Admin buat produk (EKSPEKTASI: 200)"
PRODUK=$(curl -s -b "$ADMIN_COOKIE" -X POST "$BASE/admin/produk" \
  -H "Content-Type: application/json" \
  -d "{\"kategoriId\":\"$KATEGORI_ID\",\"namaProduk\":\"Case HP Test\",\"deskripsi\":\"buat testing\",\"hargaAsalRmb\":15,\"kurs\":2300,\"hargaJualIdr\":46580,\"beratGram\":100,\"linkSumber\":\"https://taobao.com/test\",\"stok\":50,\"gambarUrls\":[\"https://contoh.com/gambar.jpg\"]}")
echo "$PRODUK" | ./jq.exe .
PRODUK_ID=$(echo "$PRODUK" | ./jq.exe -r '.produk.id // .id')

langkah "GET produk publik tanpa login (EKSPEKTASI: 200)"
curl -s "$BASE/produk" | ./jq.exe '.data // .'

# ============================================================
bagian "4. ALAMAT — customer tambah alamat"
# ============================================================

langkah "Tambah alamat (EKSPEKTASI: 200)"
ALAMAT=$(curl -s -b "$CUST_COOKIE" -X POST "$BASE/alamat" \
  -H "Content-Type: application/json" \
  -d '{"label":"Rumah","penerima":"Budi Tester","noTelp":"081234567890","alamatLengkap":"Jl. Testing No. 1","kota":"Medan","kodePos":"20111","provinsi":"Sumatera Utara"}')
echo "$ALAMAT" | ./jq.exe .
ALAMAT_ID=$(echo "$ALAMAT" | ./jq.exe -r '.alamat.id // .id')

# ============================================================
bagian "5. KERANJANG"
# ============================================================

langkah "Tambah produk ke keranjang (EKSPEKTASI: 200)"
ITEM=$(curl -s -b "$CUST_COOKIE" -X POST "$BASE/keranjang" \
  -H "Content-Type: application/json" \
  -d "{\"produkId\":\"$PRODUK_ID\",\"jumlah\":2}")
echo "$ITEM" | ./jq.exe .
ITEM_ID=$(echo "$ITEM" | ./jq.exe -r '.item.id // .id')

langkah "Lihat isi keranjang (EKSPEKTASI: 200)"
curl -s -b "$CUST_COOKIE" "$BASE/keranjang" | ./jq.exe .

# ============================================================
bagian "6. CHECKOUT"
# ============================================================

langkah "Checkout (EKSPEKTASI: 200)"
PESANAN=$(curl -s -b "$CUST_COOKIE" -X POST "$BASE/pesanan" \
  -H "Content-Type: application/json" \
  -d "{\"alamatId\":\"$ALAMAT_ID\",\"preferensiKurir\":\"jnt\",\"metode\":\"transfer_bank\",\"keranjangItemIds\":[\"$ITEM_ID\"]}")
echo "$PESANAN" | ./jq.exe .
PESANAN_ID=$(echo "$PESANAN" | ./jq.exe -r '.pesanan.id // .id // .noInvoice')

langkah "Cek stok produk (EKSPEKTASI: 48)"
curl -s "$BASE/produk/$PRODUK_ID" | ./jq.exe '.stok // .produk.stok'

# ============================================================
bagian "7. PEMBAYARAN"
# ============================================================

langkah "Upload bukti (EKSPEKTASI: 200)"
curl -s -b "$CUST_COOKIE" -X PATCH "$BASE/pesanan/$PESANAN_ID/pembayaran/bukti" \
  -H "Content-Type: application/json" \
  -d '{"buktiUrl":"https://contoh.com/bukti-dummy.jpg","tglBayar":"2026-09-16T10:00:00.000Z"}' | ./jq.exe .

langkah "Admin lihat daftar pembayaran"
DAFTAR_BAYAR=$(curl -s -b "$ADMIN_COOKIE" "$BASE/admin/pembayaran")
echo "$DAFTAR_BAYAR" | ./jq.exe .

# Ambil ID pembayaran yang sesuai dengan PESANAN_ID yang sedang diuji
PEMBAYARAN_ID=$(echo "$DAFTAR_BAYAR" | ./jq.exe -r ".items[] | select(.pesananId==\"$PESANAN_ID\").id // empty")

# Fallback jika select spesifik tidak menemukan, ambil elemen paling akhir (paling baru)
if [ -z "$PEMBAYARAN_ID" ]; then
  PEMBAYARAN_ID=$(echo "$DAFTAR_BAYAR" | ./jq.exe -r '.items[-1].id // empty')
fi

langkah "Admin verifikasi pembayaran (EKSPEKTASI: 200, pesanan pindah status)"
if [ -n "$PEMBAYARAN_ID" ]; then
  curl -s -b "$ADMIN_COOKIE" -X PATCH "$BASE/admin/pembayaran/$PEMBAYARAN_ID/verifikasi" \
    -H "Content-Type: application/json" \
    -d '{"status":"TERVERIFIKASI","terverifikasi":true}' | ./jq.exe .
else
  echo "Error: PEMBAYARAN_ID tidak ditemukan!"
fi

langkah "Cek status pesanan sekarang"
curl -s -b "$CUST_COOKIE" "$BASE/pesanan/$PESANAN_ID" | ./jq.exe '.statusPesanan // .pesanan.statusPesanan'

langkah "Cek NOTIFIKASI masuk"
curl -s -b "$CUST_COOKIE" "$BASE/notifikasi" | ./jq.exe .

# ============================================================
bagian "8. ADMIN — isi biaya & status"
# ============================================================

langkah "Admin isi ongkirChinaGudang manual"
curl -s -b "$ADMIN_COOKIE" -X PATCH "$BASE/admin/pesanan/$PESANAN_ID/biaya" \
  -H "Content-Type: application/json" \
  -d '{"biayaJasaTitip":12000,"ongkirDomestik":35000,"ongkirChinaGudang":25000}' | ./jq.exe .

langkah "Admin majukan status ke DIKONSOLIDASI_KIRIM"
curl -s -b "$ADMIN_COOKIE" -X PATCH "$BASE/admin/pesanan/$PESANAN_ID/status" \
  -H "Content-Type: application/json" -d '{"status":"DIKONSOLIDASI_KIRIM"}' | ./jq.exe .

# ============================================================
bagian "9. CUSTOM PO"
# ============================================================

langkah "Customer ajukan PO"
PO=$(curl -s -b "$CUST_COOKIE" -X POST "$BASE/permintaan-po" \
  -H "Content-Type: application/json" \
  -d '{"deskripsiSpesifikasi":"Jam tangan analog silver","jumlahDiminta":1,"linkProdukReferensi":"https://1688.com/test"}')
echo "$PO" | ./jq.exe .
PO_ID=$(echo "$PO" | ./jq.exe -r '.po.id // .id')

langkah "Admin kasih harga"
curl -s -b "$ADMIN_COOKIE" -X PATCH "$BASE/admin/permintaan-po/$PO_ID/review" \
  -H "Content-Type: application/json" \
  -d '{"status":"DIKONFIRMASI_HARGA","estimasiHarga":420000,"estimasiOngkir":40000}' | ./jq.exe .

langkah "Customer setujui"
curl -s -b "$CUST_COOKIE" -X PATCH "$BASE/permintaan-po/$PO_ID/respon" \
  -H "Content-Type: application/json" \
  -d "{\"setuju\":true,\"alamatId\":\"$ALAMAT_ID\",\"preferensiKurir\":\"jnt\",\"metode\":\"transfer_bank\"}" | ./jq.exe .

# ============================================================
bagian "10. SELESAI"
# ============================================================

rm -f "$CUST_COOKIE" "$ADMIN_COOKIE"
echo -e "\nPengujian selesai."