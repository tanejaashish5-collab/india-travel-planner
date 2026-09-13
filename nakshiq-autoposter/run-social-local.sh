#!/bin/bash
# run-social-local.sh — the local half of the 2026-09-13 social strategy.
#
# Two reels are rendered and published from THIS Mac, not GitHub Actions:
#   T1 voice reel — the founder's voice note lives here, not in CI.
#   T2 road reel  — Fridays, from road_updates.
# The GitHub workflow still runs the one automated reel at 12:17 IST; the
# publish layer's NAKSHIQ_IG_DAILY_CAP=1 makes sure only one of them lands, and
# the local run goes FIRST so a founder-voice reel always wins the slot.
#
# LaunchAgent via /bin/bash: it needs ~/Automation (voice notes), the login
# keychain, and apps/web/.env.local. Same pattern as com.ashish.ga4-audit.
#
# Secrets: node --env-file loads apps/web/.env.local and hands the environment
# to python. Nothing here reads or prints the file (repo rule).
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to $REPO_ROOT"; exit 1; }
DRY="${1:-}"
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
IST_DOW="$(TZ=Asia/Kolkata date +%u)"   # 1=Mon .. 7=Sun
say "=== social-local start (IST $(TZ=Asia/Kolkata date '+%F %H:%M'), dow=$IST_DOW) ==="

run_py() {  # run_py <script> [args…] — env from the .env file, never echoed
  node --env-file=apps/web/.env.local -e '
    const {spawnSync}=require("child_process");
    const a=process.argv.slice(1);
    process.exit(spawnSync("python3",a,{stdio:"inherit",cwd:"nakshiq-autoposter",env:process.env}).status ?? 1);
  ' -- "$@"
}

# 1. Top the prompt queue up and bind anything the founder dropped.
run_py voice_queue.py refresh || say "⚠️  queue refresh failed"
run_py voice_queue.py bind    || say "⚠️  bind failed"

# 2. Friday is the road reel; every other day is the voice reel (if one is
#    waiting). Both are no-ops when there is nothing to say — silence is fine.
if [ "$IST_DOW" = "5" ]; then
  say "Friday → road reel"
  run_py road_reel.py $DRY
  RC=$?
else
  say "voice reel (if a note is waiting)"
  run_py voice_reel.py $DRY
  RC=$?
fi
say "=== social-local end (exit=$RC) ==="
exit $RC
