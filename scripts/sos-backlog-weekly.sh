#!/bin/bash
# sos-backlog-weekly.sh — LaunchAgent wrapper for the emergency-SOS provenance backlog.
#
# WHY LOCAL, VIA /bin/bash
#
# This job ran as a cloud routine and failed five weeks running (2026-08-16,
# 08-23, 08-30, 09-06, 09-13) with zero writes each time. The cause was never
# the procedure: that sandbox's egress proxy denies essentially all outbound
# web access, so it can never open a .gov.in page to confirm a number, and the
# procedure's first rule forbids writing one it has not seen. Each run correctly
# refused to write and logged the block — the notes asked for a .gov.in
# allow-list, but the same proxy also blocked www.google.com, so there was no
# per-host exception to grant. This Mac reaches those hosts fine (verified
# 2026-09-14), and /bin/bash holds Full Disk Access while launchd has the
# keychain — the same pattern as com.nakshiq.road-updates and com.ashish.ga4-audit.
#
# Fires twice, both BEFORE the Monday 00:00 UTC sos-auto-reverify cron, so
# anything sourced is available to that week's re-verification. The second fire
# is the single-fire-drops-a-week safeguard and no-ops once the week is done.
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to $REPO_ROOT"; exit 1; }

TODAY="$(date +%F)"
WEEK="$(date +%G-W%V)"                      # ISO week — the two fire times share one marker
WORK="$HOME/.claude/sos-backlog"; mkdir -p "$WORK"
MARKER="$WORK/done-$WEEK"
ENTRIES="$WORK/entries-$TODAY.json"
NOTE="data/audits/sos-backlog-$TODAY.md"
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

if [ -f "$MARKER" ]; then
  say "week $WEEK already completed ($(cat "$MARKER")) — nothing to do"
  exit 0
fi
say "=== sos-backlog start ($TODAY, week $WEEK) ==="

PROMPT="You are running the NakshIQ emergency-SOS provenance backlog for $TODAY. Read .claude/commands/sos-backlog.md first and follow it exactly; read CLAUDE.md for project rules. Work in this repo.

You are running LOCALLY, not in the cloud sandbox that blocked the last five runs, so WebFetch and curl do reach .gov.in and .nic.in. Those hosts are slow and often need a retry before they answer — a timeout is not evidence the page is missing.

Follow the procedure's steps. Dispatch at most 3 parallel Haiku sub-agents for discovery. Then confirm every candidate YOURSELF before it counts.

KNOWN DEAD ENDS — do not spend time on these three. Each was researched twice and the official sites simply do not publish a phone for the facility: 03803-222253 (District Hospital Roing), 04545-240581 (Government Hospital Palani), 04172-232538 (Govt HQ Hospital Walajah). Leave them unconfirmed and say so in the note.

You CANNOT write to the database directly and there is no Supabase MCP here. The only write path is:
  node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON --env-file=apps/web/.env.local scripts/sos-source-map-insert.mjs $ENTRIES
Write $ENTRIES as {\"entries\":[{\"number\",\"url\",\"field\",\"quote\"}...],\"run\":{\"candidates\":N,\"dropped\":N,\"note\":\"…\"}} where field is one of the PHONE_FIELDS. That script re-fetches every url and re-matches the digits with the cron's own rules, and REFUSES THE WHOLE FILE if any entry fails — so include only entries you have already confirmed yourself. If it refuses, drop the entries it names and re-run it. An empty entries array is a valid outcome.

Then write the run note to $NOTE in the same format as data/audits/sos-backlog-2026-09-06.md. Do NOT commit — the wrapper commits it.

Finish with exactly one final line: RESULT sourced=<n> changed=<n> unconfirmed=<n>"

# Alias pinned (never a full model id — aliases resolve against the binary's own table).
claude -p "$PROMPT" --model sonnet \
  --allowedTools "Read,Glob,Grep,Bash,Write,Edit,WebSearch,WebFetch,Task" \
  --permission-mode acceptEdits --max-turns 200 \
  > "$WORK/run-$TODAY.log" 2>&1
RC=$?
say "claude exit=$RC; tail:"; tail -3 "$WORK/run-$TODAY.log"

notify() {
  printf '%s' "$1" > "$HOME/Automation/nakshiq-ig/logs/notify-pending.txt" 2>/dev/null
  printf '%s' "$WORK/run-$TODAY.log" > "$HOME/Automation/nakshiq-ig/logs/latest-brief.txt" 2>/dev/null
  /usr/bin/open -n -a "$HOME/Automation/nakshiq-ig/NakshIQ-Brief.app" 2>/dev/null
}

if [ ! -f "$NOTE" ]; then
  say "❌ no run note written — the session did not complete the job"
  notify "SOS backlog wrote nothing today. Click for the log."
  exit 1
fi

# The audit-commit rule: never a bare git commit. The guard clears provably
# stale locks, rebases onto origin first (cloud routines push to main on their
# own schedule), verifies HEAD moved and the file is IN the commit, and pushes.
RESULT_LINE="$(grep -o '^RESULT sourced=[0-9]* changed=[0-9]* unconfirmed=[0-9]*' "$WORK/run-$TODAY.log" | tail -1)"
bash scripts/audit-commit-guard.sh -m "audit(sos): backlog run $TODAY — ${RESULT_LINE:-see note}" "$NOTE" \
  || { say "❌ commit guard failed"; notify "SOS backlog ran but could not commit its note."; exit 1; }

# Escalate ONLY when a stored emergency number turned out to be wrong on a live
# page. That is the one case the procedure says is worth his attention; a quiet
# week is a healthy week and must never page him.
CHANGED="$(printf '%s' "$RESULT_LINE" | sed -nE 's/.*changed=([0-9]+).*/\1/p')"
if [ -n "${CHANGED:-}" ] && [ "$CHANGED" -gt 0 ] 2>/dev/null; then
  say "escalating: $CHANGED stored number(s) were wrong on a live page"
  notify "SOS: $CHANGED stored emergency number(s) were WRONG on their official page. Click for the note."
fi

printf '%s %s' "$TODAY" "${RESULT_LINE:-completed}" > "$MARKER"
say "=== sos-backlog end (${RESULT_LINE:-no RESULT line}) ==="
