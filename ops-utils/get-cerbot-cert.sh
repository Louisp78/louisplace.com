#!/bin/bash

# Verify PUBLIC_BASE_URL environment variable is set
if [ -z "$PUBLIC_BASE_URL" ]; then
    echo "Error: PUBLIC_BASE_URL environment variable is not set"
    echo "Usage: PUBLIC_BASE_URL=yourdomain.com ./get-cerbot-cert.sh"
    exit 1
fi

echo "Obtaining SSL certificate for domain: $PUBLIC_BASE_URL"

sudo apt update &&
sudo apt install -y certbot &&

sudo certbot certonly --standalone -d "$PUBLIC_BASE_URL" -d "www.$PUBLIC_BASE_URL"

if [ $? -eq 0 ]; then
    echo "✅ Successfully obtained SSL certificate for $PUBLIC_BASE_URL"
    echo "Certificate location: /etc/letsencrypt/live/$PUBLIC_BASE_URL/"
else
    echo "❌ Failed to obtain SSL certificate"
    exit 1
fi