sudo apt update
sudo apt upgrade

./anti-ddos.sh
./install-docker.sh

echo "Please add SSL certificates to apache/certs/ and configure apache sites in apache/conf/ before starting the services."