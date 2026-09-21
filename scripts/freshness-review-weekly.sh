#!/bin/bash
# freshness-review-weekly.sh — LaunchAgent wrapper for the weekly destination
# freshness review (procedure: .claude/commands/freshness-review.md).
#
# WHY IT EXISTS
# Every "VERIFIED <month>" on a destination page is content_reviewed_at. After
# the Apr–Jun 2026 backfills nothing re-checked pages, and by 2026-09-21 only
# 5% had been reviewed in 90 days. This re-checks the stalest 41 a week
# (533 / 13 weeks), so every page is re-verified at least quarterly.
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
MARKER="$WORK/done-$WEEK"
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
  say "week $WEEK already completed ($(cat "$MARKER")) — nothing to do"
  exit 0
fi
say "=== freshness-review start ($TODAY, week $WEEK, batch $BATCH_SIZE) ==="

START_SHA="$(git rev-parse HEAD)"
$NODE scripts/freshness-review.mjs pick --n "$BATCH_SIZE" --out "$BATCH" \
  || { say "❌ pick failed"; notify "Freshness review could not pick this week's batch."; exit 1; }
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

bash scripts/audit-commit-guard.sh -m "audit(freshness): weekly review $TODAY — $RESULT_LINE" "$NOTE" \
  || { say "❌ commit guard failed"; notify "Freshness review stamped pages but could not commit its note."; }

# Exception-only: a quiet week never pages him. A proposed correction means a
# live page states something that is no longer true.
CORR="$(printf '%s' "$RESULT_LINE" | sed -nE 's/.*corrections=([0-9]+).*/\1/p')"
if [ -n "${CORR:-}" ] && [ "$CORR" -gt 0 ] 2>/dev/null; then
  say "escalating: $CORR destination(s) have facts that are now wrong"
  notify "Freshness review: $CORR destination page(s) state something no longer true. Click for the note." "$REPO_ROOT/$NOTE"
fi

printf '%s %s' "$TODAY" "$RESULT_LINE" > "$MARKER"
say "=== freshness-review end ($RESULT_LINE) ==="
exit 0
}
