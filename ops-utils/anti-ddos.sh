sudo apt update
sudo apt install -y ufw fail2ban

sudo ufw default deny incoming
sudo ufw default allow outgoing

sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

sudo ufw enable

# Enable SYN cookies to help mitigate SYN flood attacks
echo "net.ipv4.tcp_syncookies = 1" >> /etc/sysctl.conf
sysctl -p