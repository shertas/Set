#!/bin/sh
set -e

# If AIVEN_CA_PEM_BASE64 provided, decode to a secure file and export path
if [ -n "$AIVEN_CA_PEM_BASE64" ] && [ ! -f /etc/ssl/certs/aiven-ca.pem ]; then
  mkdir -p /etc/ssl/certs
  echo "$AIVEN_CA_PEM_BASE64" | base64 -d > /etc/ssl/certs/aiven-ca.pem
  chmod 600 /etc/ssl/certs/aiven-ca.pem || true
  export AIVEN_CA_PEM_PATH=/etc/ssl/certs/aiven-ca.pem
fi

# If AIVEN_CA_PEM_PATH is set but file missing and base64 present, decode
if [ -n "$AIVEN_CA_PEM_BASE64" ] && [ -n "$AIVEN_CA_PEM_PATH" ] && [ ! -f "$AIVEN_CA_PEM_PATH" ]; then
  mkdir -p "$(dirname "$AIVEN_CA_PEM_PATH")"
  echo "$AIVEN_CA_PEM_BASE64" | base64 -d > "$AIVEN_CA_PEM_PATH"
  chmod 600 "$AIVEN_CA_PEM_PATH" || true
fi

# Ensure dependencies installed (graceful)
if [ -f composer.json ]; then
  composer install --no-dev --no-interaction --optimize-autoloader || true
fi

# Exec the main process (apache)
exec "$@"
