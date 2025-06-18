#! /bin/sh
cd /home/ubuntu/apps/louisplace.com || exit 1
git pull origin main
pnpm install
pnpm build
pm2 restart louisplace
echo '✅ louisplace.com is well deployed !'