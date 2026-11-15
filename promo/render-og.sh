#!/bin/sh
# Renders the link-preview image and the PNG logo into public/.
set -e
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
run() { "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
  --user-data-dir="${TMPDIR:-/tmp}/bettercatarman-og-chrome" --virtual-time-budget=10000 "$@" >/dev/null 2>&1; }
run --window-size=1200,630 --screenshot="$PWD/../public/og-image.png" "file://$PWD/og-image.html"
run --window-size=512,512 --default-background-color=00000000 --screenshot="$PWD/../public/logo-mark.png" "file://$PWD/../public/logo-mark.svg"
echo "public/og-image.png public/logo-mark.png"
