sudo apt update
sudo apt install fail2ban

sudo ufw default deny incoming
sudo ufw default allow outgoing

sudo ufw allow ssh
sudo ufw deny 443
for ip in $(curl https://www.cloudflare.com/ips-v4); do sudo ufw allow from $ip to any port 443 proto tcp; done

sudo ufw enable

echo "net.ipv4.tcp_syncookies = 1" >> /etc/sysctl.conf
sysctl -p