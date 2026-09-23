#!/bin/bash
# run-social-local.sh — the local half of the 2026-09-13 social strategy.
#
# TWO reels are rendered and published from THIS Mac:
#   T1 voice reel — the founder's voice note lives here, not in CI.
#   T2 road reel  — Fridays, from road_updates.
# The daily automated reel is NOT one of them. Section 3 can run it, but it
# is DORMANT and GitHub Actions still owns that slot — founder decision
# 2026-09-15, see section 3.
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
# 2b. THE SCENARIO REELS (added 2026-09-23). One Hindi reel to Instagram and
#     one English reel to YouTube, cut earlier by the Veo job. Runs BEFORE the
#     GitHub slot (12:00 IST) and writes to the SAME shared ledger, so the
#     per-surface cap makes that slot step aside on any surface this covered.
#     OFF until the founder turns it on: NAKSHIQ_SCENARIO_PUBLISH=1 in
#     nakshiq-autoposter/.env.local. Off, it only logs what it would post.
SC_IST="$(TZ=Asia/Kolkata date '+%H%M')"
if [ "$((10#$SC_IST))" -lt 1100 ] || [ "$((10#$SC_IST))" -ge 1200 ]; then
  say "scenario reels: IST $SC_IST is outside 11:00-12:00 — not this fire"
elif ! bash scripts/autoposter-state-sync.sh pull; then
  say "⚠️  scenario reels: state pull FAILED — skipping rather than publishing on stale caps"
else
  SC_LOG="nakshiq-autoposter/data/post_log.jsonl"
  SC_BEFORE=$(wc -l < "$SC_LOG" 2>/dev/null || echo 0)
  node --env-file=apps/web/.env.local --env-file=nakshiq-autoposter/.env.local -e '
    const {spawnSync}=require("child_process");
    process.exit(spawnSync("python3",["scenario_daily.py","publish"],
      {stdio:"inherit",cwd:"nakshiq-autoposter",env:process.env}).status ?? 1);' \
    || say "⚠️  scenario publish exited non-zero"
  SC_AFTER=$(wc -l < "$SC_LOG" 2>/dev/null || echo 0)
  if [ "$SC_AFTER" -gt "$SC_BEFORE" ]; then
    if bash scripts/autoposter-state-sync.sh push; then
      say "scenario reels: published $((SC_AFTER - SC_BEFORE)), ledger pushed before the GitHub slot"
    else
      say "⚠️  scenario reels: PUBLISHED but ledger push FAILED — GitHub slot may double-post"
    fi
  fi
  bash scripts/autoposter-state-sync.sh restore
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
#    DORMANT, AND STAYING THAT WAY — founder decision 2026-09-15. Noon IST is
#    16:30 in Canberra, so the Mac is usually awake; the objection was not the
#    hour but the dependency — an asleep or offline Mac publishes nothing, and
#    GitHub does not care. So the slot stayed on GitHub Actions and the timing
#    was fixed there instead: the workflow's `gate` job now fires the cron
#    early (02:47 UTC) and holds the run until 06:30 UTC = 12:00 IST exactly.
#
#    If this is ever armed: set NAKSHIQ_LOCAL_DAILY_REEL=1 AND comment out the
#    "47 2 * * *" cron in autoposter.yml in the SAME change. They must never
#    both be live — same collision rule as the ga4-audit crontab line. The
#    gate's ledger check would catch a same-day double publish, but only after
#    the render, and only if the local run pushed its state first.
#
#    State is handled by scripts/autoposter-state-sync.sh (added 2026-09-15),
#    which mirrors the workflow's two steps: pull the ledger from the
#    autoposter-state branch before the run, merge and push it after. Without
#    that, dedup runs on a post_log.jsonl that is months stale — the
#    Uttarakhand triple-publish class, 2026-05-25 — and every local post lands
#    outside the ledger engagement_pull reads, publishing into a blind spot.
#    A failed PULL is fatal for the slot: we skip rather than publish blind.
if [ "${NAKSHIQ_LOCAL_DAILY_REEL:-0}" != "1" ]; then
  say "daily reel: DORMANT (NAKSHIQ_LOCAL_DAILY_REEL!=1) — GitHub Actions still owns this slot"
else
  IST_HHMM="$(TZ=Asia/Kolkata date '+%H%M')"
  IST_DATE="$(TZ=Asia/Kolkata date '+%F')"
  MARK_DIR="$HOME/.nakshiq/social-local"
  mkdir -p "$MARK_DIR"
  MARKER="$MARK_DIR/reel-$IST_DATE.done"
  PENDING="$MARK_DIR/push-pending"
  LOG_JSONL="nakshiq-autoposter/data/post_log.jsonl"

  # HEAL A STRANDED LEDGER FIRST. If a previous fire published but its push
  # failed, re-running the autoposter cannot fix it: dedup blocks the repeat,
  # post_log does not grow, and the push branch below is never reached — the
  # row stays local forever, invisible to engagement_pull. Same shape as the
  # GA4 scar where a failed push left a commit no uncommitted-file scan could
  # ever find again. So retry the push on its own, before anything else.
  if [ -f "$PENDING" ]; then
    say "daily reel: a previous run published but failed to push — retrying the push alone"
    if bash scripts/autoposter-state-sync.sh push; then
      rm -f "$PENDING"
      say "daily reel: stranded state pushed"
      bash scripts/autoposter-state-sync.sh restore
    else
      say "⚠️  daily reel: stranded state STILL not pushed"
    fi
  fi

  if [ -f "$MARKER" ]; then
    say "daily reel: already published for IST $IST_DATE — skipping"
  elif [ "$((10#$IST_HHMM))" -lt 1130 ]; then
    say "daily reel: IST $IST_HHMM is before the 11:30 gate — waiting for a later fire"
  else
    # 3a. Pull the ledger FIRST. A failure here means dedup would run on stale
    #     state, so we skip the slot entirely rather than risk a repeat publish.
    if ! bash scripts/autoposter-state-sync.sh pull; then
      say "⚠️  daily reel: state pull FAILED — skipping the slot rather than publishing on stale dedup data"
      exit 1
    fi

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
      # 3b. Push BEFORE the marker. If the ledger never reaches the branch the
      #     post is invisible to engagement_pull, so the day is not "done".
      # The marker is written EITHER WAY: the reel really did publish, so a
      # later fire must not publish a second one. A failed push is recorded
      # separately in $PENDING and healed at the top of the next fire.
      date -u +%FT%TZ > "$MARKER"
      if bash scripts/autoposter-state-sync.sh push; then
        rm -f "$PENDING"
        say "daily reel: published ($((AFTER - BEFORE)) new ledger row(s)) and state pushed"
        bash scripts/autoposter-state-sync.sh restore
      else
        date -u +%FT%TZ > "$PENDING"
        say "⚠️  daily reel: PUBLISHED but state push FAILED — flagged for retry at the next fire"
      fi
    else
      say "⚠️  daily reel: post_log did not grow — nothing published. No marker; will retry at the next fire."
    fi
    find "$MARK_DIR" -name 'reel-*.done' -mtime +30 -delete 2>/dev/null || true
  fi
fi

say "=== social-local end (exit=$RC) ==="
exit $RC
