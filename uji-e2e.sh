
#!/usr/bin/env bash

# ============================================================
# JASTIP CHINA - END TO END TEST
# Jalankan setelah npm run dev aktif.
#
# Dependencies:
# - curl
# - jq.exe
#
# Default URL: http://localhost:3001/api
# ============================================================

set -uo pipefail

BASE="${BASE:-http://localhost:3000/api}"

mkdir -p .e2e

CUST_COOKIE=".e2e/customer-cookie.txt"
ADMIN_COOKIE=".e2e/admin-cookie.txt"

rm -f "$CUST_COOKIE" "$ADMIN_COOKIE"

# ============================================================
# KONFIGURASI
# ============================================================

NOWA="081$(date +%s | tail -c 9)"
PASSWORD="BudiKuat123"

ADMIN_EMAIL="${ADMIN_EMAIL:-admin@jastipchina.local}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-AdminChina123}"

NAMA="Budi Tester"

PASS=0
FAIL=0
SKIP=0

CUSTOMER_OK=false
ADMIN_OK=false

CUSTOMER_ID=""
ADMIN_ID=""
KATEGORI_ID=""
PRODUK_ID=""
ALAMAT_ID=""
ITEM_ID=""
PESANAN_ID=""
PEMBAYARAN_ID=""
PO_ID=""

# ============================================================
# HELPER
# ============================================================

bagian() {
  echo
  echo "============================================================"
  echo " $1"
  echo "============================================================"
}

langkah() {
  echo
  echo "--- $1 ---"
}

pass() {
  echo "[PASS] $1"
  PASS=$((PASS + 1))
}

fail() {
  echo "[FAIL] $1"
  FAIL=$((FAIL + 1))
}

skip() {
  echo "[SKIP] $1"
  SKIP=$((SKIP + 1))
}

jq() {
  ./jq.exe "$@"
}

status() {
  echo "$1" | tail -n 1
}

body() {
  echo "$1" | sed '$d'
}

ambil() {
  echo "$1" | jq -r "$2 // empty" 2>/dev/null || true
}

tampilkan() {
  local hasil="$1"
  local isi
  isi="$(body "$hasil")"

  echo "$isi" | jq . 2>/dev/null || echo "$isi"
}

periksa() {
  local nama="$1"
  local hasil="$2"
  local ekspektasi="$3"

  local aktual
  aktual="$(status "$hasil")"

  if [[ "$aktual" == "$ekspektasi" ]]; then
    pass "$nama (HTTP $aktual)"
  else
    fail "$nama (Ekspektasi $ekspektasi, aktual $aktual)"
  fi
}

# ============================================================
# CURL REQUEST
# ============================================================

request() {
  local method="$1"
  local url="$2"
  local cookie="${3:-}"
  local data="${4:-}"

  local args=(
    -sS
    --connect-timeout 5
    --max-time 30
    -X "$method"
    "$BASE$url"
    -H "Content-Type: application/json"
    -w $'\n%{http_code}'
  )

  if [[ -n "$cookie" ]]; then
    args+=(-b "$cookie" -c "$cookie")
  fi

  if [[ -n "$data" ]]; then
    args+=(-d "$data")
  fi

  curl "${args[@]}"
}

# ============================================================
# 1. AUTH CUSTOMER
# ============================================================

bagian "1. AUTH - CUSTOMER"

langkah "Register customer"

REGISTER=$(request POST "/auth/register" "" \
  "{\"nama\":\"$NAMA\",\"noWa\":\"$NOWA\",\"password\":\"$PASSWORD\"}")

tampilkan "$REGISTER"

REGISTER_STATUS=$(status "$REGISTER")
REGISTER_BODY=$(body "$REGISTER")

if [[ "$REGISTER_STATUS" == "200" || "$REGISTER_STATUS" == "201" ]]; then
  CUSTOMER_ID=$(ambil "$REGISTER_BODY" '.customerId')
  pass "Register customer"
elif [[ "$REGISTER_STATUS" == "429" ]]; then
  skip "Register terkena rate limit"
elif [[ "$REGISTER_STATUS" == "409" ]]; then
  fail "Nomor WA baru ternyata sudah terdaftar"
else
  fail "Register customer HTTP $REGISTER_STATUS"
fi

langkah "Register nomor sama lagi (ekspektasi 409)"

DUPLICATE=$(request POST "/auth/register" "" \
  "{\"nama\":\"Budi\",\"noWa\":\"$NOWA\",\"password\":\"$PASSWORD\"}")

tampilkan "$DUPLICATE"
periksa "Duplicate register" "$DUPLICATE" "409"

langkah "Login salah password (ekspektasi 401)"

WRONG_LOGIN=$(request POST "/auth/login" "" \
  "{\"noWa\":\"$NOWA\",\"password\":\"salahini\"}")

tampilkan "$WRONG_LOGIN"
periksa "Login password salah" "$WRONG_LOGIN" "401"

langkah "Login benar, simpan cookie customer"

LOGIN=$(request POST "/auth/login" "$CUST_COOKIE" \
  "{\"noWa\":\"$NOWA\",\"password\":\"$PASSWORD\"}")

tampilkan "$LOGIN"

LOGIN_STATUS=$(status "$LOGIN")
LOGIN_BODY=$(body "$LOGIN")

if [[ "$LOGIN_STATUS" == "200" ]]; then
  CUSTOMER_ID=$(ambil "$LOGIN_BODY" '.customer.id')
  CUSTOMER_OK=true
  pass "Login customer"
else
  fail "Login customer HTTP $LOGIN_STATUS"
fi

langkah "Rate limit login salah - akun terpisah"

# Gunakan identifier berbeda agar sesi customer utama tidak terkunci.
RL_WA="089$(date +%s | tail -c 9)"

for i in 1 2 3 4 5 6; do

  RL_RESULT=$(request POST "/auth/login" "" \
    "{\"noWa\":\"$RL_WA\",\"password\":\"salahterus\"}")

  RL_STATUS=$(status "$RL_RESULT")

  echo "Percobaan $i: HTTP $RL_STATUS"

  if [[ "$i" -lt 6 && "$RL_STATUS" != "401" ]]; then
    echo "[INFO] Rate limit berbeda dari ekspektasi."
  fi

  if [[ "$i" -eq 6 ]]; then
    if [[ "$RL_STATUS" == "429" ]]; then
      pass "Rate limit login percobaan ke-6"
    else
      fail "Rate limit login percobaan ke-6"
    fi
  fi

done

langkah "Refresh token customer"

if [[ "$CUSTOMER_OK" == true ]]; then

  REFRESH=$(request POST "/auth/refresh" "$CUST_COOKIE")

  tampilkan "$REFRESH"
  periksa "Refresh token" "$REFRESH" "200"

else
  skip "Refresh token: customer belum login"
fi

# ============================================================
# 2. AUTH ADMIN
# ============================================================

bagian "2. AUTH - ADMIN"

langkah "Admin login"

ADMIN_LOGIN=$(request POST "/auth/admin-login" "$ADMIN_COOKIE" \
  "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}")

tampilkan "$ADMIN_LOGIN"

ADMIN_STATUS=$(status "$ADMIN_LOGIN")
ADMIN_BODY=$(body "$ADMIN_LOGIN")

if [[ "$ADMIN_STATUS" == "200" ]]; then
  ADMIN_ID=$(ambil "$ADMIN_BODY" '.admin.id')
  ADMIN_OK=true
  pass "Admin login"
else
  fail "Admin login HTTP $ADMIN_STATUS"
fi

langkah "Akses endpoint admin menggunakan cookie customer"

if [[ "$CUSTOMER_OK" == true ]]; then

  WRONG_ROLE=$(request GET "/admin/dashboard/statistik" "$CUST_COOKIE")

  WRONG_STATUS=$(status "$WRONG_ROLE")

  echo "HTTP $WRONG_STATUS"

  if [[ "$WRONG_STATUS" == "401" || "$WRONG_STATUS" == "403" ]]; then
    pass "Customer ditolak dari endpoint admin"
  else
    fail "Customer seharusnya ditolak dari endpoint admin"
  fi

else
  skip "Pengujian role customer"
fi

# ============================================================
# 3. KATALOG
# ============================================================

bagian "3. KATALOG - KATEGORI DAN PRODUK"

if [[ "$ADMIN_OK" == true ]]; then

  langkah "Admin buat kategori"

  KATEGORI=$(request POST "/admin/kategori" "$ADMIN_COOKIE" \
    "{\"namaKategori\":\"Elektronik Test $(date +%s)\"}")

  tampilkan "$KATEGORI"

  KATEGORI_STATUS=$(status "$KATEGORI")
  KATEGORI_BODY=$(body "$KATEGORI")

  if [[ "$KATEGORI_STATUS" == "200" || "$KATEGORI_STATUS" == "201" ]]; then
    KATEGORI_ID=$(ambil "$KATEGORI_BODY" '.kategori.id // .id')
    pass "Buat kategori"
  else
    fail "Buat kategori HTTP $KATEGORI_STATUS"
  fi

  langkah "Admin buat produk"

  if [[ -n "$KATEGORI_ID" ]]; then

    PRODUK=$(request POST "/admin/produk" "$ADMIN_COOKIE" \
      "{\"kategoriId\":\"$KATEGORI_ID\",\"namaProduk\":\"Case HP Test\",\"deskripsi\":\"buat testing\",\"hargaAsalRmb\":15,\"kurs\":2300,\"hargaJualIdr\":46580,\"beratGram\":100,\"linkSumber\":\"https://taobao.com/test\",\"stok\":50,\"gambarUrls\":[\"https://contoh.com/gambar.jpg\"]}")

    tampilkan "$PRODUK"

    PRODUK_STATUS=$(status "$PRODUK")
    PRODUK_BODY=$(body "$PRODUK")

    if [[ "$PRODUK_STATUS" == "200" || "$PRODUK_STATUS" == "201" ]]; then
      PRODUK_ID=$(ambil "$PRODUK_BODY" '.produk.id // .id')
      pass "Buat produk"
    else
      fail "Buat produk HTTP $PRODUK_STATUS"
    fi

  else
    skip "Buat produk: kategori tidak tersedia"
  fi

else
  skip "Katalog: admin belum login"
fi

langkah "GET produk publik tanpa login"

PRODUK_LIST=$(request GET "/produk")
tampilkan "$PRODUK_LIST"

periksa "GET produk publik" "$PRODUK_LIST" "200"

PRODUK_LIST_BODY=$(body "$PRODUK_LIST")

if [[ -z "$PRODUK_ID" ]]; then
  PRODUK_ID=$(ambil "$PRODUK_LIST_BODY" '.items[0].id // .data[0].id')
fi

# ============================================================
# 4. ALAMAT
# ============================================================

bagian "4. ALAMAT CUSTOMER"

if [[ "$CUSTOMER_OK" == true ]]; then

  langkah "Customer tambah alamat"

  ALAMAT=$(request POST "/alamat" "$CUST_COOKIE" \
    '{"label":"Rumah","penerima":"Budi Tester","noTelp":"081234567890","alamatLengkap":"Jl. Testing No. 1","kota":"Medan","kodePos":"20111","provinsi":"Sumatera Utara"}')

  tampilkan "$ALAMAT"

  ALAMAT_STATUS=$(status "$ALAMAT")
  ALAMAT_BODY=$(body "$ALAMAT")

  if [[ "$ALAMAT_STATUS" == "200" || "$ALAMAT_STATUS" == "201" ]]; then
    ALAMAT_ID=$(ambil "$ALAMAT_BODY" '.alamat.id // .id')
    pass "Tambah alamat"
  else
    fail "Tambah alamat HTTP $ALAMAT_STATUS"
  fi

else
  skip "Alamat: customer belum login"
fi

# ============================================================
# 5. KERANJANG
# ============================================================

bagian "5. KERANJANG"

if [[ "$CUSTOMER_OK" == true && -n "$PRODUK_ID" ]]; then

  langkah "Tambah produk ke keranjang"

  ITEM=$(request POST "/keranjang" "$CUST_COOKIE" \
    "{\"produkId\":\"$PRODUK_ID\",\"jumlah\":2}")

  tampilkan "$ITEM"

  ITEM_STATUS=$(status "$ITEM")
  ITEM_BODY=$(body "$ITEM")

  if [[ "$ITEM_STATUS" == "200" || "$ITEM_STATUS" == "201" ]]; then
    ITEM_ID=$(ambil "$ITEM_BODY" '.item.id // .id')
    pass "Tambah keranjang"
  else
    fail "Tambah keranjang HTTP $ITEM_STATUS"
  fi

  langkah "Lihat isi keranjang"

  CART=$(request GET "/keranjang" "$CUST_COOKIE")
  tampilkan "$CART"
  periksa "GET keranjang" "$CART" "200"

  if [[ -z "$ITEM_ID" ]]; then
    ITEM_ID=$(ambil "$(body "$CART")" '.items[0].id')
  fi

else
  skip "Keranjang: customer atau produk tidak tersedia"
fi

# ============================================================
# 6. CHECKOUT
# ============================================================

bagian "6. CHECKOUT"

if [[ "$CUSTOMER_OK" == true && -n "$ALAMAT_ID" && -n "$ITEM_ID" ]]; then

  langkah "Checkout"

  PESANAN=$(request POST "/pesanan" "$CUST_COOKIE" \
    "{\"alamatId\":\"$ALAMAT_ID\",\"preferensiKurir\":\"jnt\",\"metode\":\"transfer_bank\",\"keranjangItemIds\":[\"$ITEM_ID\"]}")

  tampilkan "$PESANAN"

  PESANAN_STATUS=$(status "$PESANAN")
  PESANAN_BODY=$(body "$PESANAN")

  if [[ "$PESANAN_STATUS" == "200" || "$PESANAN_STATUS" == "201" ]]; then
    PESANAN_ID=$(ambil "$PESANAN_BODY" '.pesanan.id // .id')
    pass "Checkout"
  else
    fail "Checkout HTTP $PESANAN_STATUS"
  fi

else
  skip "Checkout: alamat atau keranjang tidak tersedia"
fi

langkah "Cek stok produk"

if [[ -n "$PRODUK_ID" ]]; then

  STOK=$(request GET "/produk/$PRODUK_ID")
  tampilkan "$STOK"

else
  skip "Cek stok: produk tidak tersedia"
fi

# ============================================================
# 7. PEMBAYARAN
# ============================================================

bagian "7. PEMBAYARAN"

if [[ "$CUSTOMER_OK" == true && -n "$PESANAN_ID" ]]; then

  langkah "Upload bukti pembayaran"

  BUKTI=$(request PATCH "/pesanan/$PESANAN_ID/pembayaran/bukti" "$CUST_COOKIE" \
    '{"buktiUrl":"https://contoh.com/bukti-dummy.jpg","tglBayar":"2026-11-10T10:00:00.000Z"}')

  tampilkan "$BUKTI"

  periksa "Upload bukti" "$BUKTI" "200"

else
  skip "Upload bukti: pesanan tidak tersedia"
fi

if [[ "$ADMIN_OK" == true ]]; then

  langkah "Admin lihat daftar pembayaran"

  DAFTAR_BAYAR=$(request GET "/admin/pembayaran" "$ADMIN_COOKIE")

  tampilkan "$DAFTAR_BAYAR"

  periksa "Daftar pembayaran admin" "$DAFTAR_BAYAR" "200"

  DAFTAR_BODY=$(body "$DAFTAR_BAYAR")

  if [[ -n "$PESANAN_ID" ]]; then
    PEMBAYARAN_ID=$(echo "$DAFTAR_BODY" | jq -r \
      --arg id "$PESANAN_ID" \
      '.items[] | select(.pesananId == $id) | .id' 2>/dev/null | head -n 1)
  fi

  langkah "Admin verifikasi pembayaran"

  if [[ -n "$PEMBAYARAN_ID" ]]; then

    VERIFIKASI=$(request PATCH "/admin/pembayaran/$PEMBAYARAN_ID/verifikasi" "$ADMIN_COOKIE" \
      '{"status":"TERVERIFIKASI","terverifikasi":true}')

    tampilkan "$VERIFIKASI"
    periksa "Verifikasi pembayaran" "$VERIFIKASI" "200"

  else
    skip "Verifikasi: pembayaran untuk pesanan ini tidak ditemukan"
  fi

else
  skip "Pembayaran admin: admin belum login"
fi

langkah "Cek status pesanan"

if [[ "$CUSTOMER_OK" == true && -n "$PESANAN_ID" ]]; then

  STATUS_PESANAN=$(request GET "/pesanan/$PESANAN_ID" "$CUST_COOKIE")
  tampilkan "$STATUS_PESANAN"

else
  skip "Status pesanan: pesanan tidak tersedia"
fi

langkah "Cek notifikasi"

if [[ "$CUSTOMER_OK" == true ]]; then

  NOTIFIKASI=$(request GET "/notifikasi" "$CUST_COOKIE")
  tampilkan "$NOTIFIKASI"
  periksa "GET notifikasi" "$NOTIFIKASI" "200"

else
  skip "Notifikasi: customer belum login"
fi

# ============================================================
# 8. ADMIN - BIAYA DAN STATUS
# ============================================================

bagian "8. ADMIN - BIAYA DAN STATUS"

if [[ "$ADMIN_OK" == true && -n "$PESANAN_ID" ]]; then

  langkah "Admin isi biaya"

  BIAYA=$(request PATCH "/admin/pesanan/$PESANAN_ID/biaya" "$ADMIN_COOKIE" \
    '{"biayaJasaTitip":12000,"ongkirDomestik":35000,"ongkirChinaGudang":25000}')

  tampilkan "$BIAYA"
  periksa "Update biaya pesanan" "$BIAYA" "200"

  langkah "Admin majukan status"

  STATUS_UPDATE=$(request PATCH "/admin/pesanan/$PESANAN_ID/status" "$ADMIN_COOKIE" \
    '{"status":"DIKONSOLIDASI_KIRIM"}')

  tampilkan "$STATUS_UPDATE"
  periksa "Update status pesanan" "$STATUS_UPDATE" "200"

else
  skip "Update biaya dan status: pesanan atau admin tidak tersedia"
fi

# ============================================================
# 9. CUSTOM PO
# ============================================================

bagian "9. CUSTOM PO"

if [[ "$CUSTOMER_OK" == true ]]; then

  langkah "Customer ajukan PO"

  PO=$(request POST "/permintaan-po" "$CUST_COOKIE" \
    '{"deskripsiSpesifikasi":"Jam tangan analog silver","jumlahDiminta":1,"linkProdukReferensi":"https://1688.com/test"}')

  tampilkan "$PO"

  PO_STATUS=$(status "$PO")
  PO_BODY=$(body "$PO")

  if [[ "$PO_STATUS" == "200" || "$PO_STATUS" == "201" ]]; then
    PO_ID=$(ambil "$PO_BODY" '.po.id // .id')
    pass "Ajukan PO"
  else
    fail "Ajukan PO HTTP $PO_STATUS"
  fi

else
  skip "Custom PO: customer belum login"
fi

if [[ "$ADMIN_OK" == true && -n "$PO_ID" ]]; then

  langkah "Admin memberikan estimasi harga"

  REVIEW=$(request PATCH "/admin/permintaan-po/$PO_ID/review" "$ADMIN_COOKIE" \
    '{"status":"DIKONFIRMASI_HARGA","estimasiHarga":420000,"estimasiOngkir":40000}')

  tampilkan "$REVIEW"
  periksa "Admin review PO" "$REVIEW" "200"

else
  skip "Admin review PO: admin atau PO tidak tersedia"
fi

if [[ "$CUSTOMER_OK" == true && -n "$PO_ID" && -n "$ALAMAT_ID" ]]; then

  langkah "Customer setujui PO"

  SETUJU=$(request PATCH "/permintaan-po/$PO_ID/respon" "$CUST_COOKIE" \
    "{\"setuju\":true,\"alamatId\":\"$ALAMAT_ID\",\"preferensiKurir\":\"jnt\",\"metode\":\"transfer_bank\"}")

  tampilkan "$SETUJU"
  periksa "Customer setujui PO" "$SETUJU" "200"

else
  skip "Persetujuan PO: data tidak tersedia"
fi

# ============================================================
# 10. SELESAI
# ============================================================

bagian "10. RINGKASAN PENGUJIAN"

echo "CUSTOMER ID : ${CUSTOMER_ID:--}"
echo "ADMIN ID    : ${ADMIN_ID:--}"
echo "KATEGORI ID : ${KATEGORI_ID:--}"
echo "PRODUK ID   : ${PRODUK_ID:--}"
echo "ALAMAT ID   : ${ALAMAT_ID:--}"
echo "ITEM ID     : ${ITEM_ID:--}"
echo "PESANAN ID  : ${PESANAN_ID:--}"
echo "BAYAR ID    : ${PEMBAYARAN_ID:--}"
echo "PO ID       : ${PO_ID:--}"

echo
echo "================================"
echo " PASS : $PASS"
echo " FAIL : $FAIL"
echo " SKIP : $SKIP"
echo "================================"

rm -f "$CUST_COOKIE" "$ADMIN_COOKIE"

if [[ "$FAIL" -gt 0 ]]; then
  echo "HASIL: PENGUJIAN MASIH ADA YANG GAGAL"
  exit 1
fi

echo "HASIL: SELURUH PENGUJIAN YANG DIJALANKAN LULUS"
