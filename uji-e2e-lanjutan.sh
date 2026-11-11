
#!/usr/bin/env bash
# Uji lanjutan rate limit PostgreSQL.
# Jalankan setelah npm run dev aktif.
# Butuh: curl, ./jq.exe (atau jq), bash.
#
# Penggunaan:
# ./uji-e2e-lanjutan.sh
#
# Opsional:
# LACAK_URL="http://localhost:3000/api/lacak?invoice=..." \
# UPLOAD_URL="http://localhost:3000/api/pesanan/ID/pembayaran/bukti" \
# TEST_WA="081234567890" \
# TEST_PASSWORD="Password123" \
# ./uji-e2e-lanjutan.sh

set -uo pipefail

BASE="${BASE:-http://localhost:3000/api}"
JQ="${JQ:-./jq.exe}"

LACAK_URL="${LACAK_URL:-}"
UPLOAD_URL="${UPLOAD_URL:-}"
TEST_WA="${TEST_WA:-}"
TEST_PASSWORD="${TEST_PASSWORD:-}"

PASS=0
FAIL=0
SKIP=0

COOKIE=$(mktemp)
TMPDIR_TEST=$(mktemp -d)

NOW="$(date +%s)"
PREFIX="08${NOW}"

cleanup() {
  rm -f "$COOKIE"
  rm -rf "$TMPDIR_TEST"
}
trap cleanup EXIT

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

lulus() {
  echo "[PASS] $1"
  PASS=$((PASS + 1))
}

gagal() {
  echo "[FAIL] $1"
  FAIL=$((FAIL + 1))
}

skip() {
  echo "[SKIP] $1"
  SKIP=$((SKIP + 1))
}

http_status() {
  curl -s -o /dev/null -w "%{http_code}" "$@"
}

register() {
  local nomor="$1"

  http_status -X POST "$BASE/auth/register" \
    -H "Content-Type: application/json" \
    -d "{\"nama\":\"Tester Rate Limit\",\"noWa\":\"$nomor\",\"password\":\"TesterKuat123\"}"
}

login_salah() {
  local nomor="$1"

  http_status -X POST "$BASE/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"noWa\":\"$nomor\",\"password\":\"PasswordSalah123\"}"
}

# ============================================================
bagian "1. RATE LIMIT LOGIN — 5 PER 5 MENIT"
# ============================================================

LOGIN_WA="${PREFIX}1001"

langkah "6x login salah menggunakan identifier yang sama"

LOGIN_OK=1

for i in 1 2 3 4 5 6; do
  STATUS=$(login_salah "$LOGIN_WA")
  echo "Percobaan $i: HTTP $STATUS"

  if [ "$i" -le 5 ] && [ "$STATUS" != "401" ]; then
    LOGIN_OK=0
  fi

  if [ "$i" -eq 6 ] && [ "$STATUS" != "429" ]; then
    LOGIN_OK=0
  fi
done

if [ "$LOGIN_OK" -eq 1 ]; then
  lulus "Login: 5x401 dan percobaan ke-6 HTTP 429"
else
  gagal "Login: hasil tidak sesuai ekspektasi"
fi

# ============================================================
bagian "2. RATE LIMIT REGISTER — 3 PER 1 JAM"
# ============================================================

langkah "4x register menggunakan IP yang sama"

REG_OK=1

for i in 1 2 3 4; do
  NOMOR="${PREFIX}20${i}"
  STATUS=$(register "$NOMOR")

  echo "Register $i: HTTP $STATUS"

  if [ "$i" -le 3 ] && [ "$STATUS" != "201" ]; then
    REG_OK=0
  fi

  if [ "$i" -eq 4 ] && [ "$STATUS" != "429" ]; then
    REG_OK=0
  fi
done

if [ "$REG_OK" -eq 1 ]; then
  lulus "Register: 3x201 dan percobaan ke-4 HTTP 429"
else
  gagal "Register: ekspektasi 3x201 dan 1x429"
fi

# ============================================================
bagian "3. RATE LIMIT LACAK — 20 PER MENIT"
# ============================================================

langkah "21x request endpoint lacak"

if [ -z "$LACAK_URL" ]; then
  skip "Lacak: isi variabel LACAK_URL"
else
  LACAK_OK=1
  LACAK_NORMAL=0
  LACAK_LIMIT=0

  for i in $(seq 1 21); do
    STATUS=$(http_status "$LACAK_URL")

    if [ "$STATUS" = "429" ]; then
      LACAK_LIMIT=$((LACAK_LIMIT + 1))
    else
      LACAK_NORMAL=$((LACAK_NORMAL + 1))
    fi
  done

  echo "Request normal : $LACAK_NORMAL"
  echo "HTTP 429       : $LACAK_LIMIT"

  if [ "$LACAK_NORMAL" -eq 20 ] &&
     [ "$LACAK_LIMIT" -eq 1 ]; then
    lulus "Lacak: 20 request diizinkan, ke-21 ditolak"
  else
    gagal "Lacak: hasil tidak sesuai ekspektasi"
  fi
fi

# ============================================================
bagian "4. RATE LIMIT UPLOAD — 50 PER 24 JAM"
# ============================================================

langkah "51x request upload bukti pembayaran"

if [ -z "$UPLOAD_URL" ] ||
   [ -z "$TEST_WA" ] ||
   [ -z "$TEST_PASSWORD" ]; then

  skip "Upload: isi UPLOAD_URL, TEST_WA dan TEST_PASSWORD"

else
  LOGIN_RESPONSE=$(curl -s -c "$COOKIE" \
    -X POST "$BASE/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"noWa\":\"$TEST_WA\",\"password\":\"$TEST_PASSWORD\"}")

  echo "$LOGIN_RESPONSE" | "$JQ" .

  if ! echo "$LOGIN_RESPONSE" | "$JQ" -e '.message == "Login berhasil"' >/dev/null 2>&1; then
    gagal "Upload: login customer gagal"
  else
    UPLOAD_OK=1
    UPLOAD_NORMAL=0
    UPLOAD_LIMIT=0

    for i in $(seq 1 51); do
      STATUS=$(http_status -b "$COOKIE" \
        -X PATCH "$UPLOAD_URL" \
        -H "Content-Type: application/json" \
        -d "{\"buktiUrl\":\"https://contoh.com/test-$i.jpg\",\"tglBayar\":\"$(date -u +%Y-%m-%dT%H:%M:%S.000Z)\"}")

      if [ "$STATUS" = "429" ]; then
        UPLOAD_LIMIT=$((UPLOAD_LIMIT + 1))
      else
        UPLOAD_NORMAL=$((UPLOAD_NORMAL + 1))
      fi
    done

    echo "Request normal : $UPLOAD_NORMAL"
    echo "HTTP 429       : $UPLOAD_LIMIT"

    if [ "$UPLOAD_NORMAL" -eq 50 ] &&
       [ "$UPLOAD_LIMIT" -eq 1 ]; then
      lulus "Upload: 50 request diizinkan, ke-51 ditolak"
    else
      gagal "Upload: hasil tidak sesuai ekspektasi"
    fi
  fi
fi

# ============================================================
bagian "5. IDENTIFIER LOGIN BERBEDA"
# ============================================================

WA_A="${PREFIX}3001"
WA_B="${PREFIX}3002"

langkah "5x login salah pada identifier A, 1x pada identifier B"

IDENTIFIER_OK=1

for i in 1 2 3 4 5; do
  STATUS=$(login_salah "$WA_A")
  echo "Identifier A - $i: HTTP $STATUS"

  if [ "$STATUS" != "401" ]; then
    IDENTIFIER_OK=0
  fi
done

STATUS_B=$(login_salah "$WA_B")
echo "Identifier B: HTTP $STATUS_B"

if [ "$STATUS_B" != "401" ]; then
  IDENTIFIER_OK=0
fi

if [ "$IDENTIFIER_OK" -eq 1 ]; then
  lulus "Identifier berbeda tidak saling mengganggu"
else
  gagal "Identifier berbeda mengalami kegagalan"
fi

# ============================================================
bagian "6. REQUEST BERSAMAAN — ATOMISITAS LOGIN"
# ============================================================

CONCURRENT_WA="${PREFIX}4001"

langkah "6 request login bersamaan menggunakan identifier baru"

for i in $(seq 1 6); do
  (
    login_salah "$CONCURRENT_WA" > "$TMPDIR_TEST/$i"
  ) &
done

wait

HTTP_401=0
HTTP_429=0
HTTP_OTHER=0

for i in $(seq 1 6); do
  STATUS=$(cat "$TMPDIR_TEST/$i")

  case "$STATUS" in
    401) HTTP_401=$((HTTP_401 + 1)) ;;
    429) HTTP_429=$((HTTP_429 + 1)) ;;
    *) HTTP_OTHER=$((HTTP_OTHER + 1)) ;;
  esac
done

echo "HTTP 401: $HTTP_401"
echo "HTTP 429: $HTTP_429"
echo "HTTP lainnya: $HTTP_OTHER"

if [ "$HTTP_401" -eq 5 ] &&
   [ "$HTTP_429" -eq 1 ] &&
   [ "$HTTP_OTHER" -eq 0 ]; then
  lulus "Request bersamaan: tepat 5 diterima dan 1 ditolak"
else
  gagal "Request bersamaan: hasil tidak sesuai ekspektasi"
fi

# ============================================================
bagian "7. RINGKASAN PENGUJIAN"
# ============================================================

echo
echo "================================"
echo " PASS : $PASS"
echo " FAIL : $FAIL"
echo " SKIP : $SKIP"
echo "================================"

if [ "$FAIL" -eq 0 ]; then
  echo "HASIL: SELURUH PENGUJIAN YANG DIJALANKAN LULUS"
  exit 0
else
  echo "HASIL: ADA PENGUJIAN YANG GAGAL"
  exit 1
fi
