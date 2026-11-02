#!/bin/bash
# sos-changed-triage.sh — LaunchAgent wrapper for the Monday triage of emergency
# numbers that vanished from their source (procedure: .claude/commands/sos-changed.md).
#
# WHY IT EXISTS (founder 2026-11-02)
# sos-auto-reverify flags these on Monday at 00:00 UTC; sos-backlog-weekly.sh only
# ran on Sunday, so a flagged safety number waited 6 days. This fires shortly after
# the check and before the 01:30 UTC SOS email, so a settled row never reaches him.
#
# WHERE THE CONTROLS LIVE (not in the prompt): the session writes a proposals file
# and nothing else. Only the copy of sos-changed-apply.mjs pinned at the start commit
# writes to the database, and it refuses anything it cannot prove (see its header).
# WHY LOCAL, VIA /bin/bash: same reasons as sos-backlog-weekly.sh.
# The body is a brace group so a mid-run edit cannot corrupt the tail of the job.
{
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to $REPO_ROOT"; exit 1; }

TODAY="$(date +%F)"
WORK="$HOME/.claude/sos-changed"; mkdir -p "$WORK"
MARKER="$WORK/done-$TODAY"
ROWS="$WORK/rows-$TODAY.json"
PROPOSALS="$WORK/proposals-$TODAY.json"
TOUCHED="$WORK/touched-$TODAY.txt"
NOTE="data/audits/sos-changed-$TODAY.md"
NODE="node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON --env-file=apps/web/.env.local"
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
notify() {
  printf '%s' "$1" > "$HOME/Automation/nakshiq-ig/logs/notify-pending.txt" 2>/dev/null
  printf '%s' "$WORK/run-$TODAY.log" > "$HOME/Automation/nakshiq-ig/logs/latest-brief.txt" 2>/dev/null
  /usr/bin/open -n -a "$HOME/Automation/nakshiq-ig/NakshIQ-Brief.app" 2>/dev/null
}

if [ -f "$MARKER" ]; then
  say "$TODAY already completed ($(cat "$MARKER")) — nothing to do"
  exit 0
fi

START_SHA="$(git rev-parse HEAD)"
export SOS_ALLOW_REF="$START_SHA"
PINNED="scripts/.sos-changed-apply.pinned-$$.mjs"
trap 'rm -f "$PINNED"' EXIT
git show "$START_SHA:scripts/sos-changed-apply.mjs" > "$PINNED" \
  || { say "❌ cannot read the pinned script at $START_SHA"; notify "SOS triage could not start. Click for the log."; exit 1; }

FLAGGED="$($NODE "$PINNED" --count | sed -nE 's/^RESULT flagged=([0-9]+)$/\1/p')"
if [ -z "$FLAGGED" ]; then
  say "❌ could not read the flagged rows"
  notify "SOS triage could not read the flagged rows. Click for the log."
  exit 1
fi
if [ "$FLAGGED" = "0" ]; then
  say "no number flagged this week — nothing to do"
  printf '%s flagged=0' "$TODAY" > "$MARKER"
  exit 0
fi
say "=== sos-changed start ($FLAGGED row(s) flagged) ==="

$NODE "$PINNED" --pull "$ROWS" || { say "❌ pull failed"; exit 1; }
rm -f "$PROPOSALS"
PROMPT="Triage the NakshIQ emergency numbers flagged today, $TODAY. Read .claude/commands/sos-changed.md first and follow it exactly. Work in this repo.

ROWS=$ROWS  (do not modify it)
PROPOSALS=$PROPOSALS  (write your proposals here)

You are running LOCALLY, so WebFetch and curl reach .gov.in and .nic.in. Those hosts are slow and often need a retry. You CANNOT write to the database and must not try. Do not commit."

# Alias pinned (never a full model id). No Edit and no general Bash: this session has no reason to change a file.
claude -p "$PROMPT" --model sonnet \
  --allowedTools "Read,Glob,Grep,Write,WebSearch,WebFetch,Bash(curl:*)" \
  --permission-mode acceptEdits --add-dir "$WORK" --max-turns 100 \
  > "$WORK/run-$TODAY.log" 2>&1
say "claude exit=$?; tail:"; tail -2 "$WORK/run-$TODAY.log"

if ! git diff --quiet "$START_SHA" -- apps/web/src/lib/sos-verify.ts data/sos-source-hosts-allow.json; then
  say "❌ the verifier or the allow list changed during the session — refusing to apply"
  notify "SOS triage: a trusted file changed during the run, so nothing was applied. Click for the log."
  exit 1
fi
if [ ! -f "$PROPOSALS" ]; then
  say "❌ the session wrote no proposals; the rows stay on the Monday email"
  notify "SOS triage wrote nothing today, so the flagged numbers need the Monday email. Click for the log."
  exit 1
fi

$NODE "$PINNED" "$PROPOSALS" --note "$NOTE" --touched "$TOUCHED" >> "$WORK/run-$TODAY.log" 2>&1
RC=$?
RESULT_LINE="$(grep -o '^RESULT flagged=.*' "$WORK/run-$TODAY.log" | tail -1)"
say "apply exit=$RC: ${RESULT_LINE:-no RESULT line}"
if [ $RC -ne 0 ] || [ -z "$RESULT_LINE" ]; then
  notify "SOS triage: the apply step failed. Click for the log."
  exit 1
fi

# A changed number has to reach the live page, and that has to be checked on the page.
if [ -s "$TOUCHED" ]; then
  if $NODE scripts/verify-touched-pages.mjs --dest "$(cat "$TOUCHED")" --revalidate >> "$WORK/run-$TODAY.log" 2>&1; then
    say "rendered pages passed: $(cat "$TOUCHED")"
  else
    say "❌ a touched page failed its render check"
    notify "SOS triage changed a number and a page then failed its check. Click for the log."
  fi
fi

[ -f "$NOTE" ] && { bash scripts/audit-commit-guard.sh -m "audit(sos): Monday triage $TODAY — $RESULT_LINE" "$NOTE" || say "❌ commit guard failed"; }
printf '%s %s' "$TODAY" "$RESULT_LINE" > "$MARKER"
say "=== sos-changed end ($RESULT_LINE) ==="
exit 0
}
