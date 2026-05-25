#!/bin/sh
set -e

cat > /usr/share/nginx/html/env-config.js <<EOF
window.__ENV__ = {
  VITE_GOOGLE_CLIENT_ID: "${VITE_GOOGLE_CLIENT_ID:-}",
  APP_VERSION: "${APP_VERSION:-0.1.0}",
  ENVIRONMENT: "${ENVIRONMENT:-production}"
};
EOF

echo "env-config.js generated successfully"

CACHE_BUST=$(date +%s)
sed -i "s|<meta http-equiv=\"Expires\" content=\"0\" />|<meta http-equiv=\"Expires\" content=\"0\" />\n    <meta name=\"deployed-at\" content=\"$CACHE_BUST\" />|" /usr/share/nginx/html/index.html

echo "Cache busting applied with timestamp: $CACHE_BUST"

exec "$@"