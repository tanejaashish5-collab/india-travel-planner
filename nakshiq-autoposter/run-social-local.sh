#!/bin/bash
# run-social-local.sh — the local half of the 2026-09-13 social strategy.
#
# ALL THREE reels are rendered and published from THIS Mac (2026-09-15 —
# the automated reel moved off GitHub Actions; see section 3 for why):
#   T1 voice reel — the founder's voice note lives here, not in CI.
#   T2 road reel  — Fridays, from road_updates.
#   the daily automated reel — IST-gated, marker-guarded, section 3.
# Order matters: the voice/road reel runs FIRST, so when one is waiting it
# takes the day's single Instagram slot and NAKSHIQ_IG_DAILY_CAP=1 keeps the
# automated reel to YouTube only.
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
# 3. The day's automated reel — MOVED HERE FROM GITHUB ACTIONS 2026-09-15.
#    Why: the GHA cron was "47 6 * * *" (12:17 IST) but GitHub fires scheduled
#    workflows 2-3.5h late, so every reel actually landed 14:13-15:46 IST. Our
#    own ledger says noon IST reaches a median of 142 (n=18) vs 109 at 18:00 —
#    the best-evidenced lever we own, thrown away by the scheduler. launchd
#    fires on time. It also lets the reel use the local Kokoro Hindi voices,
#    which do not exist in CI.
#
#    DST: launchd fires on LOCAL time and Canberra moves to AEDT on 2026-10-04,
#    which would shift every fire an hour earlier in IST. So the plist fires
#    four times spanning both offsets and the IST gate below decides which one
#    counts; the marker makes the rest no-ops. Do NOT collapse this to a single
#    fire — see feedback_single_fire_jobs_drop_a_day_on_network_loss.
#    DORMANT BY DEFAULT — set NAKSHIQ_LOCAL_DAILY_REEL=1 to arm it, and comment
#    out the GHA cron in the same change. The blocker is state: the workflow
#    pulls state.json / post_log.jsonl / posted_today.jsonl from the
#    autoposter-state branch BEFORE running and merges them back AFTER, and
#    this script does neither yet. Publishing without that would (a) run dedup
#    against a post_log.jsonl that is months stale — the Uttarakhand
#    triple-publish class, 2026-05-25 — and (b) strand every local post outside
#    the ledger that engagement_pull reads, so the reel would publish and then
#    be invisible to every measurement we have.
#    NOTE: voice_reel.py and road_reel.py above have the SAME gap today. It has
#    never bitten only because neither has ever published.
if [ "${NAKSHIQ_LOCAL_DAILY_REEL:-0}" != "1" ]; then
  say "daily reel: DORMANT (NAKSHIQ_LOCAL_DAILY_REEL!=1) — GitHub Actions still owns this slot"
else
  IST_HHMM="$(TZ=Asia/Kolkata date '+%H%M')"
  IST_DATE="$(TZ=Asia/Kolkata date '+%F')"
  MARK_DIR="$HOME/.nakshiq/social-local"
  mkdir -p "$MARK_DIR"
  MARKER="$MARK_DIR/reel-$IST_DATE.done"
  LOG_JSONL="nakshiq-autoposter/data/post_log.jsonl"

  if [ -f "$MARKER" ]; then
    say "daily reel: already published for IST $IST_DATE — skipping"
  elif [ "$((10#$IST_HHMM))" -lt 1130 ]; then
    say "daily reel: IST $IST_HHMM is before the 11:30 gate — waiting for a later fire"
  else
    say "daily reel: IST $IST_HHMM → running autoposter --yt-short"
    # --allow-local is REQUIRED: autoposter.py refuses to run off GitHub Actions
    # without it AND EXITS 0 when it refuses, so a wrapper that trusts the exit
    # code would mark the day done having published nothing. Hence the
    # before/after line count below — exit 0 is not evidence a post landed.
    BEFORE=$(wc -l < "$LOG_JSONL" 2>/dev/null || echo 0)
    run_py autoposter.py --yt-short --allow-local $DRY || say "⚠️  autoposter exited non-zero"
    AFTER=$(wc -l < "$LOG_JSONL" 2>/dev/null || echo 0)
    if [ -n "$DRY" ]; then
      say "daily reel: dry run, no marker written"
    elif [ "$AFTER" -gt "$BEFORE" ]; then
      date -u +%FT%TZ > "$MARKER"
      say "daily reel: published ($((AFTER - BEFORE)) new ledger row(s))"
    else
      say "⚠️  daily reel: post_log did not grow — nothing published. No marker; will retry at the next fire."
    fi
    find "$MARK_DIR" -name 'reel-*.done' -mtime +30 -delete 2>/dev/null || true
  fi
fi

say "=== social-local end (exit=$RC) ==="
exit $RC
