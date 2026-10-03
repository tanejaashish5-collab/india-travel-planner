#!/bin/bash
# run-veo.sh — the daily Veo generation job.
#
# Runs as a LaunchAgent via /bin/bash. That combination is deliberate and both
# halves matter (scar, 2026-09-09/10): cron cannot unlock the login keychain, and
# launchd through a non-FDA interpreter cannot read ~/Desktop. /bin/bash already
# holds Full Disk Access on this machine, so a LaunchAgent invoking /bin/bash
# gets both — which this job needs, because the storyboard code lives in the repo
# under ~/Desktop while the job itself must live under ~/Automation (launchd is
# TCC-blocked under ~/Desktop).
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE" || exit 1
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

say "=== veo-daily start ==="

# 0. INGEST FIRST. Anything the Cowork session dropped into inbox/ since the last
#    run must be marked collected BEFORE the queue is rebuilt. The other order
#    re-lists clips that were already generated (they still read "pending"
#    until ingested), and the next session generates them a second time — a
#    straight double spend of credits. Named intake only: Cowork saves every
#    clip under its exact beat name, so matching is by filename, never order.
bash intake.sh --named || say "WARN intake failed"

# 0b. COWORK'S OWN REPORT (added 2026-10-02). The generation session ends with a
#     notification nobody reads unless the founder pastes it into a chat. The
#     task now also writes _report-<date>.md into the inbox; file it and echo it
#     here so the per-shot failure reasons ("Audio generation failed" etc.) are
#     in this log, next to the render, where the 14:50 check-in reads them.
mkdir -p data/cowork-reports
for rep in "$HOME"/Downloads/nakshiq-veo-inbox/_report-*.md; do
  [ -f "$rep" ] || continue
  mv "$rep" data/cowork-reports/ && say "cowork report filed: $(basename "$rep")"
  say "----- cowork report -----"; cat "data/cowork-reports/$(basename "$rep")"; say "----- end report -----"
done

# PAUSE (2026-09-24): ingest above still runs; nothing below does.
if [ -f "$HERE/PAUSED" ]; then
  say "PAUSED ($HERE/PAUSED) — ingested only; no cut, no queue top-up, no task export"
  say "=== veo-daily end (exit=0) ==="
  exit 0
fi

# 0a. CUT THE REELS (v3 only since 2026-09-28: v3_daily.py render, cuts land as
#     status "review" so nothing publishes unwatched; added 2026-09-23, founder: "make it fully automated").
#     Every storyboard whose clips are all in AND were generated from today's
#     prompts is cut in one language: Hindi for Instagram, English for YouTube,
#     keeping two ready per language. Publishing is a separate step at the
#     day's slot (run-social-local.sh), so a slow cut never delays a post.
#     Runs in the repo so the renderer reads the same storyboard code that
#     wrote the prompts.
( cd "$HOME/Desktop/India Travel Planner" && \
  node --env-file=apps/web/.env.local -e '
    const {spawnSync}=require("child_process");
    process.exit(spawnSync("python3",["v3_daily.py","render"],
      {stdio:"inherit",cwd:"nakshiq-autoposter",env:process.env}).status ?? 1);' ) \
  || say "WARN reel cut failed"

# 0b. Refresh the facts the lighter formats use (treks, crowd, costs, full-year
#     verdicts, /vs/ pairs), weekly, over DIRECT Postgres -- the costs table is
#     12,693 rows and the standing rule forbids REST for anything over 500. It
#     needs SUPABASE_DB_URL in apps/web/.env.local; until that exists the refresh
#     fails and the job uses the last snapshot, which is safe because these facts
#     change slowly -- but a snapshot older than 30 days is flagged every run.
REPO="$HOME/Desktop/India Travel Planner"
if [ "$(date +%u)" = "1" ] || [ ! -f data/reel-data.json ]; then
  if node --env-file="$REPO/apps/web/.env.local" "$REPO/scripts/export-reel-data.mjs" >/dev/null 2>&1; then
    say "reel-data refreshed"
  else
    say "WARN reel-data refresh failed (SUPABASE_DB_URL missing?) — using the existing snapshot"
  fi
fi
AGE=$(python3 -c "import json,datetime as d;g=json.load(open('data/reel-data.json'))['generated_at'];print((d.datetime.now(d.timezone.utc)-d.datetime.fromisoformat(g)).days)" 2>/dev/null || echo 999)
[ "$AGE" -gt 30 ] && say "WARN reel-data snapshot is ${AGE} days old — add SUPABASE_DB_URL so it can refresh"

# 1. Top up the queue from today's data. Safe to run repeatedly: enqueue()
#    dedupes on clip name and the ledger stops a destination repeating.
# v3 only (2026-09-28): build-queue.py wrote v2 text-only rows, the output the
# 24 Sep pause was about. The queue now fills from reel_specs/*.json marked "auto".
( cd "$HOME/Desktop/India Travel Planner/nakshiq-autoposter" && python3 v3_daily.py topup ) \
  || say "WARN v3 topup failed"

# 1b. DESTINATION GUIDES (founder 2026-10-03: a second daily post). Cuts any guide
#     whose stills arrived (intake above), then keeps 3 guides queued for the
#     month's 10/10 places. Its stills are free Nano Banana rows in the same
#     queue, so the export below hands them to tomorrow's Cowork run. The fact
#     pack reads Supabase, so this goes through the env file like the cut.
( cd "$HOME/Desktop/India Travel Planner" && node --env-file=apps/web/.env.local -e '
    const {spawnSync}=require("child_process");
    process.exit(spawnSync("python3",["guide_reel.py","daily"],
      {stdio:"inherit",cwd:"nakshiq-autoposter",env:process.env}).status ?? 1);' ) \
  || say "WARN guide daily failed"

PENDING=$(python3 -c "import json,os;p='veo_queue.json';print(sum(1 for r in (json.load(open(p)) if os.path.exists(p) else []) if r.get('status')=='pending'))" 2>/dev/null || echo 0)
say "pending clips: $PENDING"
if [ "$PENDING" -eq 0 ]; then
  say "nothing pending — exiting clean"
  say "=== veo-daily end (exit=0) ==="
  exit 0
fi

# 2. Build the paste pack. Generation itself CANNOT be automated — this is a
#    finding, not a TODO. Proven end to end on 2026-09-21:
#      - Google refuses to complete a sign-in in an automation-controlled
#        browser ("Couldn't sign you in / may not be secure").
#      - Signing in with a normal Chrome works, but the first Playwright launch
#        against that profile INVALIDATES the session. Observed in sequence:
#        plain Chrome signed in -> Playwright signed out -> plain Chrome signed
#        out. Google binds the session to the browser.
#      - Chrome has blocked --remote-debugging-port on a real profile since 136
#        (this machine runs 153), so CDP into the founder's own Chrome is out.
#      - Copying cookies out of his main profile is credential material and was
#        deliberately not done.
#    flow-run.mjs is kept for its probe//selector work but is NOT called here;
#    calling it would burn six sign-in checks to produce nothing, which is how
#    the previous gap stayed invisible.
node export-tasks.mjs || say "WARN export-tasks failed"
# The v2 paste pack (manual pasting into Flow) was retired 2026-09-28: Cowork
# generates from today-tasks.json, and the pack listed v2 rows it would never make.

say "=== veo-daily end (exit=0) ==="
exit 0
