#!/bin/bash
# demand-gaps weekly wrapper (2026-09-09).
# Runs the GSC demand-gap scan and PUSHES a summary to Telegram, because a report Ashish
# has to remember to open is a report that never gets read.
#
# Runs under CRON, not launchd, on purpose: cron has Full Disk Access on this machine
# (proven by ga4-audit-cron.sh reading this same repo); launchd does NOT and cannot read
# ~/Desktop contents. Do not port this to a LaunchAgent without re-testing.
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
REPO="/Users/ashishtaneja/Desktop/India Travel Planner"
CHAT="7189904774"
cd "$REPO" || exit 1

echo "[$(date '+%F %T')] === demand-gaps start ==="
OUT=$(node --env-file=apps/web/.env.local scripts/demand-gaps.mjs 2>&1)
RC=$?
echo "$OUT"

if [ $RC -ne 0 ]; then
  MSG="⛔️ <b>Demand gaps FAILED</b>%0A<pre>$(echo "$OUT" | tail -5 | sed 's/&/\&amp;/g;s/</\&lt;/g')</pre>"
else
  FILE=$(echo "$OUT" | grep -o 'gsc-audits/demand-gaps-[0-9-]*\.md' | head -1)
  P2=$(echo "$OUT"  | grep -o 'page-2: .*' || echo "")
  NC=$(echo "$OUT"  | grep -o 'shown-never-clicked: .*' || echo "")
  BIG=$(echo "$OUT" | grep -o 'biggest page-2 gap: .*' || echo "")
  # top 5 shown-never-clicked straight out of the report
  TOP=$(awk '/Shown but never clicked/,0' "$REPO/$FILE" 2>/dev/null \
        | grep '^| ' | grep -v '^| query' | grep -v '^|---' | head -5 \
        | sed 's/^| //; s/ |$//; s/ | / — /g')
  MSG="🔍 <b>Demand gaps</b> — queries you're visible for but not capturing%0A%0A${P2}%0A${NC}%0A${BIG}%0A%0A<b>Top shown-but-never-clicked</b> (query — impr — pos):%0A$(echo "$TOP" | sed 's/$/%0A/' | tr -d '\n')%0A<i>${FILE}</i>"
fi

TOKEN=$(grep -E '^TELEGRAM_BOT_TOKEN=' "$HOME/Automation/.telegram-bot.env" | cut -d= -f2-)
if [ -n "$TOKEN" ]; then
  code=$(curl -sS -o /tmp/dg-tg.json -w "%{http_code}" -X POST \
    "https://api.telegram.org/bot${TOKEN}/sendMessage" \
    -d "chat_id=${CHAT}" -d "parse_mode=HTML" --data-urlencode "text=$(printf '%b' "${MSG//%0A/\\n}")")
  echo "[$(date '+%F %T')] telegram HTTP $code"
  [ "$code" != "200" ] && head -c 300 /tmp/dg-tg.json
else
  echo "[$(date '+%F %T')] NO TELEGRAM TOKEN — summary not sent" >&2
fi
echo "[$(date '+%F %T')] === demand-gaps end (rc=$RC) ==="
exit $RC
