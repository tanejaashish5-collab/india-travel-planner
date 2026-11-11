#!/bin/bash
# freshness-review-weekly.sh — LaunchAgent wrapper for the weekly destination
# freshness review (procedure: .claude/commands/freshness-review.md).
#
# WHY IT EXISTS
# Every "VERIFIED <month>" on a destination page is content_reviewed_at. After
# the Apr–Jun 2026 backfills nothing re-checked pages, and by 2026-09-21 only
# 5% had been reviewed in 90 days. This re-checks the stalest 41 every
# Saturday (533 / 13 weeks), so every page is re-verified at least quarterly.
# CATCH-UP (2026-10-04): it also fires Wednesdays, but a Wednesday run only picks
# rows older than 84 days, so it switches itself off once the backlog is gone
# (409 of 533 pages were 90-180 days old that day).
#
# CORRECTIONS go to an approval queue (destination_corrections, migration 077).
# Since 2026-10-29 scripts/corrections-autoverify.mjs decides them first (two
# independent verifier sessions + quote check); only the ones it cannot settle
# are emailed with one-click Approve links via /api/admin/corrections/notify.
# OPEN ITEMS (2026-11-02): what the queue refuses (weak source, page would not
# open) gets a settle session after the stamp, procedure in
# .claude/commands/freshness-settle.md, so it no longer waits for someone to do
# "research by hand". Only the pinned settle command writes; see that step below.
#
# WHY LOCAL, VIA /bin/bash — same reasons as sos-backlog-weekly.sh: the cloud
# routine sandbox blocks outbound web (it cannot open .gov.in / .nic.in), cron
# has no keychain to push, and /bin/bash holds Full Disk Access for ~/Desktop.
#
# WHERE THE CONTROLS LIVE (not in the prompt):
#   - the session never writes the DB; THIS wrapper runs the stamp, after it ends
#   - the stamp can only touch ids in the batch this wrapper picked, and the
#     batch is checksummed before the session starts
#   - the RPC it calls can only move content_reviewed_at, never content
#
# The whole body is a brace group so a mid-run edit of this file cannot make
# bash resume at a stale byte offset (see sos-backlog-weekly.sh, 2026-09-14).
{
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to $REPO_ROOT"; exit 1; }

BATCH_SIZE="${FRESHNESS_BATCH_SIZE:-41}"
TODAY="$(date +%F)"
WEEK="$(date +%G-W%V)"
WORK="$HOME/.claude/freshness-review"; mkdir -p "$WORK"
MARKER="$WORK/done-$TODAY"   # per day: the 19:00 slot is a retry of the 07:00 one
BATCH="$WORK/batch-$TODAY.json"
ENTRIES="$WORK/entries-$TODAY.json"
NOTE="data/audits/freshness-review-$TODAY.md"
NODE="node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON --env-file=apps/web/.env.local"
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
notify() {
  printf '%s' "$1" > "$HOME/Automation/nakshiq-ig/logs/notify-pending.txt" 2>/dev/null
  printf '%s' "${2:-$WORK/run-$TODAY.log}" > "$HOME/Automation/nakshiq-ig/logs/latest-brief.txt" 2>/dev/null
  /usr/bin/open -n -a "$HOME/Automation/nakshiq-ig/NakshIQ-Brief.app" 2>/dev/null
}

if [ -f "$MARKER" ]; then
  say "$TODAY already completed ($(cat "$MARKER")) — nothing to do"
  exit 0
fi
MIN_AGE_ARGS=()
[ "$(date +%u)" != "6" ] && MIN_AGE_ARGS=(--min-age-days 84)   # non-Saturday = catch-up only
say "=== freshness-review start ($TODAY, week $WEEK, batch $BATCH_SIZE) ==="

START_SHA="$(git rev-parse HEAD)"
$NODE scripts/freshness-review.mjs pick --n "$BATCH_SIZE" --out "$BATCH" ${MIN_AGE_ARGS[@]+"${MIN_AGE_ARGS[@]}"} \
  || { say "❌ pick failed"; notify "Freshness review could not pick this week's batch."; exit 1; }
if [ "$(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).destinations.length)' "$BATCH")" = "0" ]; then
  say "nothing older than the catch-up threshold — backlog clear, skipping"
  printf '%s skipped: backlog clear' "$TODAY" > "$MARKER"
  exit 0
fi
BATCH_SHA="$(shasum -a 256 "$BATCH" | cut -d' ' -f1)"
rm -f "$ENTRIES"

PROMPT="You are running the NakshIQ weekly destination freshness review for $TODAY. Read .claude/commands/freshness-review.md first and follow it exactly; read CLAUDE.md for project rules. Work in this repo.

BATCH=$BATCH  (do not modify it)
ENTRIES=$ENTRIES  (write your verdicts here)
NOTE=$NOTE  (write the run note here; do not commit)

You are running LOCALLY, so WebSearch, WebFetch and curl reach .gov.in and .nic.in. Those hosts are slow and often need a retry before they answer.

You CANNOT write to the database and must not try: no Supabase MCP, and never run freshness-review.mjs with --commit. The wrapper stamps confirmed destinations after you finish."

claude -p "$PROMPT" --model sonnet \
  --allowedTools "Read,Glob,Grep,Bash,Write,Edit,WebSearch,WebFetch,Task" \
  --permission-mode acceptEdits --max-turns 250 \
  > "$WORK/run-$TODAY.log" 2>&1
RC=$?
say "claude exit=$RC; tail:"; tail -3 "$WORK/run-$TODAY.log"

if [ "$(shasum -a 256 "$BATCH" | cut -d' ' -f1)" != "$BATCH_SHA" ]; then
  say "❌ batch file changed during the session — refusing to stamp"
  notify "Freshness review: the session modified its batch file, so nothing was stamped."
  exit 1
fi
if [ ! -f "$ENTRIES" ] || [ ! -f "$NOTE" ]; then
  say "❌ session did not write entries and note"
  notify "Freshness review wrote nothing this week. Click for the log."
  exit 1
fi

# Run the validator AS IT STOOD before the session: the session has Bash and
# could edit scripts/freshness-review.mjs (e.g. widen the source rules) and
# then pass its own gate. Pinned copy sits in scripts/ so module resolution
# still finds node_modules.
PINNED="scripts/.freshness-review.pinned-$$.mjs"
git show "$START_SHA:scripts/freshness-review.mjs" > "$PINNED" \
  || { say "❌ cannot read pinned validator at $START_SHA"; rm -f "$PINNED"; notify "Freshness review: could not load its pinned validator."; exit 1; }
$NODE "$PINNED" apply --batch "$BATCH" --entries "$ENTRIES" --commit \
  > "$WORK/apply-$TODAY.log" 2>&1
APPLY_RC=$?
rm -f "$PINNED"
cat "$WORK/apply-$TODAY.log"
RESULT_LINE="$(grep -o '^RESULT .*' "$WORK/apply-$TODAY.log" | tail -1)"
if [ $APPLY_RC -ne 0 ] || [ -z "$RESULT_LINE" ]; then
  say "❌ stamp failed"
  notify "Freshness review: the stamp step failed. Click for the log." "$WORK/apply-$TODAY.log"
  exit 1
fi

# Append the authoritative outcome (what the wrapper actually stamped) to the note.
{ echo; echo "## Wrapper outcome"; echo; echo '```'; cat "$WORK/apply-$TODAY.log"; echo '```'; } >> "$NOTE"

# SETTLE OPEN ITEMS (founder 2026-11-02). A separate session re-researches anything
# still flagged, from scratch, because earlier flags were often the reviewer's own
# error. It writes a verdict file only; the settle command pinned to the run's start
# commit decides what becomes a queue row or a stamp, before auto-verify runs on it.
OPEN_BATCH="$WORK/open-$TODAY.json"
OPEN_ENTRIES="$WORK/open-entries-$TODAY.json"
PINNED_FR="scripts/.freshness-review.pinned-open-$$.mjs"
if git show "$START_SHA:scripts/freshness-review.mjs" > "$PINNED_FR" 2>/dev/null; then
  OPEN_COUNT="$($NODE "$PINNED_FR" open --out "$OPEN_BATCH" 2>>"$WORK/settle-$TODAY.log" | sed -nE 's/^RESULT open=([0-9]+)$/\1/p')"
  say "open items: ${OPEN_COUNT:-unknown}"
  if [ "${OPEN_COUNT:-0}" -gt 0 ] 2>/dev/null; then
    OPEN_SHA="$(shasum -a 256 "$OPEN_BATCH" | cut -d' ' -f1)"
    rm -f "$OPEN_ENTRIES"
    OPEN_PROMPT="Settle the NakshIQ freshness review's open items for $TODAY. Read .claude/commands/freshness-settle.md first and follow it exactly. Work in this repo.

BATCH=$OPEN_BATCH  (do not modify it)
ENTRIES=$OPEN_ENTRIES  (write your verdicts here)

You are running LOCALLY, so WebSearch, WebFetch and curl reach .gov.in and .nic.in. You CANNOT write to the database and must not try. Do not commit."
    claude -p "$OPEN_PROMPT" --model sonnet \
      --allowedTools "Read,Glob,Grep,Bash,Write,WebSearch,WebFetch,Task" \
      --permission-mode acceptEdits --add-dir "$WORK" --max-turns 120 \
      >> "$WORK/settle-$TODAY.log" 2>&1
    say "settle session exit=$?"
    if [ "$(shasum -a 256 "$OPEN_BATCH" | cut -d' ' -f1)" != "$OPEN_SHA" ]; then
      say "❌ open batch changed during the session — refusing to settle"
    elif [ ! -f "$OPEN_ENTRIES" ]; then
      say "❌ settle session wrote no verdicts; items stay open for the watchdog"
    else
      $NODE "$PINNED_FR" settle --batch "$OPEN_BATCH" --entries "$OPEN_ENTRIES" --commit >> "$WORK/settle-$TODAY.log" 2>&1
      say "settle: $(grep -o '^RESULT .*' "$WORK/settle-$TODAY.log" | tail -1)"
      { echo; echo "## Open items settled"; echo; echo '```'; grep -E '^(stamp|queue|for email|left|RESULT) ' "$WORK/settle-$TODAY.log"; echo '```'; } >> "$NOTE"
    fi
  fi
fi
rm -f "$PINNED_FR"

# AUTO-APPROVE (founder 2026-10-29: "make it autonomous ... check twice and then
# approve if all looked good"). Every queued fix gets two independent verifier
# sessions plus a machine quote check; it is applied only if both approve and
# every quote is found on its source, rejected if both reject, else left for the
# approval email below. Pinned to the run's start commit like the validator.
AUTO_NOTE="data/audits/corrections-auto-$TODAY.md"
PINNED_AV="scripts/.corrections-autoverify.pinned-$$.mjs"
if git show "$START_SHA:scripts/corrections-autoverify.mjs" > "$PINNED_AV" 2>/dev/null; then
  $NODE "$PINNED_AV" --out "$AUTO_NOTE" > "$WORK/autoverify-$TODAY.log" 2>&1
  say "auto-verify: $(grep -o '^RESULT .*' "$WORK/autoverify-$TODAY.log" | tail -1)"
else
  say "auto-verify script missing at $START_SHA; every fix goes to the approval email"
fi
rm -f "$PINNED_AV"

# alerts_count is what the watchdog emails about, so it must count what is still
# open after settling, not what this run found.
OPEN_LEFT="$($NODE scripts/freshness-review.mjs recount --commit 2>/dev/null | sed -nE 's/^RESULT open=([0-9]+).*/\1/p')"
say "still open after settling: ${OPEN_LEFT:-unknown}"

COMMIT_PATHS=("$NOTE"); [ -f "$AUTO_NOTE" ] && COMMIT_PATHS+=("$AUTO_NOTE")
bash scripts/audit-commit-guard.sh -m "audit(freshness): weekly review $TODAY — $RESULT_LINE" "${COMMIT_PATHS[@]}" \
  || { say "❌ commit guard failed"; notify "Freshness review stamped pages but could not commit its note."; }

# Exception-only: a quiet week never pages him.
# Queued corrections → one email with an Approve button per fix (sent by the
# deployment, which holds the Resend key). Anything the settle step could not
# finish → desktop note now, and the watchdog emails if it stays open 3 days.
# Called after EVERY run, not only when this run queued something: fixes queued
# by hand or left unanswered get re-sent twice a week until decided. The endpoint
# sends nothing when the queue is empty.
# 2026-11-11 (founder: "how does it matter if I press okay or you press okay?"):
# no approval email any more. corrections-autoverify.mjs decides every fix,
# re-checks the unconfirmed ones each run and rejects them after 14 days, and
# reports a verifier crash to the watchdog, which emails only for that.
say "approval email retired 2026-11-11; auto-verify decides the queue"
if [ -n "${OPEN_LEFT:-}" ] && [ "$OPEN_LEFT" -gt 0 ] 2>/dev/null; then
  say "escalating: $OPEN_LEFT destination(s) the settle step could not finish"
  notify "Freshness review: $OPEN_LEFT page(s) may state something no longer true and the automatic check could not settle them. Click for the note." "$REPO_ROOT/$NOTE"
fi

printf '%s %s' "$TODAY" "$RESULT_LINE" > "$MARKER"
say "=== freshness-review end ($RESULT_LINE) ==="
exit 0
}
