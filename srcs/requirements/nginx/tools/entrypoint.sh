#!/bin/sh
set -eu

envsubst '${DOMAIN_NAME}' </etc/nginx/conf.d/www.conf.template >/etc/nginx/conf.d/www.conf

if [ ! -f "/etc/ssl/certs/inception.${DOMAIN_NAME}.key" ]; then
  openssl genrsa -out "/etc/ssl/certs/inception.${DOMAIN_NAME}.key" 4096
  openssl req -x509 -nodes -days 365 \
    -key "/etc/ssl/certs/inception.${DOMAIN_NAME}.key" \
    -out "/etc/ssl/certs/inception.${DOMAIN_NAME}.crt" \
    -subj "/C=KR/ST=SEOUL/L=Gaepo-dong/O=42Seoul/OU=jaeskim/CN=${DOMAIN_NAME}"
  chmod 640 "/etc/ssl/certs/inception.${DOMAIN_NAME}."*
fi

exec "$@"
