#!/bin/bash
# Pre-warm ISR cache after cinematic flip (merge commit 9f15e042 → main).
#
# Run this AFTER Vercel deploy status shows "Ready" for the production
# deployment of commit 9f15e042. Hitting each URL triggers Next.js to
# regenerate the ISR-cached HTML with the new cinematic design instead
# of serving the stale old-design HTML from the previous deploy.
#
# Without pre-warming, the OLD design will keep serving for up to 1h
# (landing pages, revalidate=3600) or 24h (destination pages,
# revalidate=86400) until each URL is requested + its ISR window
# expires.
#
# Alternative: Vercel Dashboard → Project → Deployments → "..." menu
# on the latest Ready deploy → "Purge Cache" → "Everything". One click
# invalidates all caches.
#
# Usage:
#   bash scripts/prewarm-cinematic-flip.sh

set -u
BASE="https://www.nakshiq.com"

# Landing pages (both locales)
LANDING=( "/en" "/hi" )

# 50 marquee destinations (mirrors PRE_RENDER_IDS in
# apps/web/src/app/[locale]/destination/[id]/page.tsx — these are the
# highest-traffic dests in GA4 + the demo-critical surfaces).
DESTS=(
  bomdila gurez-valley kaza
  leh pangong-lake nubra-valley srinagar gulmarg pahalgam
  manali shimla dharamshala mcleodganj spiti-valley
  rishikesh mussoorie nainital valley-of-flowers auli
  tawang dzukou-valley cherrapunji gangtok ziro-valley shillong
  jaisalmer udaipur jaipur jodhpur pushkar
  varanasi agra delhi
  hampi khajuraho ajanta-caves ellora-caves mahabalipuram konark
  munnar alleppey kochi kodaikanal ooty coorg
  panaji palolem havelock-island neil-island puducherry gokarna
  rann-of-kutch ahmedabad
)

echo "Pre-warming ISR cache for cinematic flip"
echo "Target: $BASE"
echo ""

# Hit landing pages (en + hi)
echo "=== Landing pages ==="
for path in "${LANDING[@]}"; do
  status=$(curl -sI -o /dev/null -w "%{http_code} %{time_total}s" "$BASE$path")
  printf "%-50s %s\n" "$path" "$status"
done

echo ""
echo "=== Destination pages (en) ==="
for id in "${DESTS[@]}"; do
  path="/en/destination/$id"
  status=$(curl -sI -o /dev/null -w "%{http_code} %{time_total}s" "$BASE$path")
  printf "%-50s %s\n" "$path" "$status"
done

echo ""
echo "=== Destination pages (hi) ==="
for id in "${DESTS[@]}"; do
  path="/hi/destination/$id"
  status=$(curl -sI -o /dev/null -w "%{http_code} %{time_total}s" "$BASE$path")
  printf "%-50s %s\n" "$path" "$status"
done

echo ""
echo "Done. Each URL above is now ISR-regenerated with the new"
echo "cinematic design. Spot-check any 5xx or unusually long times."
