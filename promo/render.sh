#!/bin/sh
# Renders promo/slides.html to promo/out/*.png at 2160 x 2160 (1080 CSS px at 2x).
# The site must be running on the address set as SITE in slides.html.
# Usage: promo/render.sh            (all slides)
#        promo/render.sh 0 3        (only the cover and slide 3)
set -e
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
names="00-cover 01-services 02-barangays 03-barangay-officials 04-government 05-statistics 06-transparency 07-hotlines 08-about-the-data"
mkdir -p out
i=0
for name in $names; do
  if [ $# -eq 0 ] || echo " $* " | grep -q " $i "; then
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
      --user-data-dir="${TMPDIR:-/tmp}/bettercatarman-promo-chrome" \
      --window-size=1080,1080 --force-device-scale-factor=2 \
      --virtual-time-budget=20000 \
      --screenshot="$PWD/out/$name.png" "file://$PWD/slides.html?s=$i" >/dev/null 2>&1
    echo "out/$name.png"
  fi
  i=$((i + 1))
done
