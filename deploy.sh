#! /bin/sh
SCRIPT_DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1 && pwd)"
cd "$SCRIPT_DIR" || exit 1 &&
git pull origin main &&
docker compose up -d --build &&
echo '✅ louisplace.com is well deployed !'