#! /bin/sh
# shellcheck source=/dev/null
. /home/louisplace-app/.bashrc
cd /var/www/louisplace.com || exit 1 &&
git pull origin main &&
pnpm install &&
pnpm build &&
sudo -u ubuntu /home/ubuntu/pm2-safe-restart.sh &&
echo '✅ louisplace.com is well deployed !'