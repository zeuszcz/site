#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> git pull"
git pull --ff-only

echo "==> install"
npm ci

echo "==> build"
npm run build

echo "==> copy standalone public + static"
mkdir -p .next/standalone/.next
cp -r public .next/standalone/public 2>/dev/null || true
cp -r .next/static .next/standalone/.next/static

echo "==> restart"
if npx pm2 describe site >/dev/null 2>&1; then
  npx pm2 reload ecosystem.config.cjs --update-env
else
  npx pm2 start ecosystem.config.cjs
fi
npx pm2 save

echo "==> done"
npx pm2 status
