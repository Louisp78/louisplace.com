#!/bin/bash

# Verify PUBLIC_DOMAIN environment variable is set
if [ -z "$PUBLIC_DOMAIN" ]; then
    echo "Error: PUBLIC_DOMAIN environment variable is not set"
    echo "Usage: PUBLIC_DOMAIN=yourdomain.com ./get-cerbot-cert.sh"
    exit 1
fi

echo "Obtaining SSL certificate for domain: $PUBLIC_DOMAIN"

sudo apt update &&
sudo apt install -y certbot &&

sudo certbot certonly --standalone -d "$PUBLIC_DOMAIN" -d "www.$PUBLIC_DOMAIN"

if [ $? -eq 0 ]; then
    echo "✅ Successfully obtained SSL certificate for $PUBLIC_DOMAIN"
    echo "Certificate location: /etc/letsencrypt/live/$PUBLIC_DOMAIN/"
else
    echo "❌ Failed to obtain SSL certificate"
    exit 1
fi