#!/bin/bash
# snow-outlook-daily.sh — LaunchAgent wrapper for the snow outlook.
#
#   forecast run  -> scripts/snow-outlook.mjs run     (six models + IMD, writes snow_outlooks)
#   scoring       -> scripts/snow-outlook.mjs verify  (windows that have ended)
#   new "likely"  -> nakshiq-autoposter/snow_reel.py --publish  (renders; posts ONLY if
#                    NAKSHIQ_SNOW_REEL_ENABLED=1, otherwise holds for review) + notify
#
# Why local, via /bin/bash: IMD's portals answer from this Mac and the job needs
# pdftotext; /bin/bash holds Full Disk Access so launchd can run it from ~/Desktop
# (same pattern as com.nakshiq.road-updates). Three fire times a day: 11:00 IST
# (overnight model runs in), 15:00 IST (IMD's ~13:00 bulletins in), 17:00 IST
# (retry: a single fire drops a day on network loss). Each run replaces today's
# rows; a place already called "likely" today never triggers a second reel.
#
# Notifies ONLY on a new "likely" call or a failure. Silence is healthy.
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to $REPO_ROOT"; exit 1; }
TODAY="$(TZ=Asia/Kolkata date +%F)"
WORK="$HOME/.claude/snow-outlook"; mkdir -p "$WORK"
LOG="$WORK/run-$TODAY.log"
NODE="node --no-warnings --env-file=apps/web/.env.local"
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
notify() {
  printf '%s' "$1" > "$HOME/Automation/nakshiq-ig/logs/notify-pending.txt" 2>/dev/null
  printf '%s' "${2:-$LOG}" > "$HOME/Automation/nakshiq-ig/logs/latest-brief.txt" 2>/dev/null
  /usr/bin/open -n -a "$HOME/Automation/nakshiq-ig/NakshIQ-Brief.app" 2>/dev/null
}
run_py() {  # env from apps/web/.env.local via node, never echoed (repo rule)
  node --env-file=apps/web/.env.local -e '
    const {spawnSync}=require("child_process");
    const a=process.argv.slice(1);
    process.exit(spawnSync("python3",a,{stdio:"inherit",cwd:"nakshiq-autoposter",env:process.env}).status ?? 1);
  ' -- "$@"
}

say "=== snow-outlook start (IST $(TZ=Asia/Kolkata date '+%F %H:%M')) ===" | tee -a "$LOG"
RUN_OUT="$WORK/last-run.out"
$NODE scripts/snow-outlook.mjs run > "$RUN_OUT" 2>&1
RC=$?
cat "$RUN_OUT" >> "$LOG"
if [ $RC -ne 0 ]; then
  say "❌ run failed (exit $RC)" | tee -a "$LOG"
  # Only shout on the LAST slot of the day; earlier slots get retried.
  if [ "$(TZ=Asia/Kolkata date +%H)" -ge 16 ]; then notify "Snow outlook failed every run today. Click for the log."; fi
  exit 1
fi
$NODE scripts/snow-outlook.mjs verify >> "$LOG" 2>&1 || say "⚠️ verify failed" | tee -a "$LOG"

# The run's LAST line says whether it called anything new (review 2026-10-16: a log-tail grep
# could miss it when a widespread spell printed many revalidate lines).
RESULT="$(grep -E '^NEW_LIKELY=' "$RUN_OUT" | tail -1)"
NEW="$(printf '%s' "$RESULT" | sed -E 's/^NEW_LIKELY=([0-9]+).*/\1/')"
PACK_REL="$(printf '%s' "$RESULT" | sed -nE 's/.* PACK=nakshiq-autoposter\/(.+)$/\1/p')"
if [ -z "$RESULT" ]; then
  say "⚠️ run printed no NEW_LIKELY line" | tee -a "$LOG"
elif [ "${NEW:-0}" -gt 0 ] && [ -n "$PACK_REL" ] && [ -f "nakshiq-autoposter/$PACK_REL" ]; then
  NAMES="$(python3 -c "import json,sys;p=json.load(open(sys.argv[1]));print(', '.join(a['name']+' ('+a['window_text']+')' for a in p['alerts'][:3]))" "nakshiq-autoposter/$PACK_REL")"
  say "new likely: $NAMES" | tee -a "$LOG"
  REEL_OUT="$WORK/last-reel.out"
  run_py snow_reel.py --pack "$PACK_REL" --publish > "$REEL_OUT" 2>&1
  cat "$REEL_OUT" >> "$LOG"
  VID="$REPO_ROOT/nakshiq-autoposter/data/snow_reels/snow_outlook_$TODAY.mp4"
  if grep -q "HELD for review" "$REEL_OUT"; then
    notify "Snow likely: $NAMES. Reel rendered and HELD for your review (publishing is off). Click to watch." "$VID"
  elif grep -q "POSTED" "$REEL_OUT"; then
    notify "Snow likely: $NAMES. Snow reel POSTED. Click for the log." "$LOG"
  else
    notify "Snow likely: $NAMES. The reel step did not post or hold; see the log." "$LOG"
  fi
fi
say "=== snow-outlook end ===" | tee -a "$LOG"
