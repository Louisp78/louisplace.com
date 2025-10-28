#! /bin/sh
cd louisplace.com || exit 1 &&
git pull origin main &&
docker compose up -d --build &&
echo '✅ louisplace.com is well deployed !'