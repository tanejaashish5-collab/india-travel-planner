#!/bin/bash
# road-updates-daily.sh — LaunchAgent wrapper for the dated road-conditions feed.
#
# Why local, via /bin/bash: the cloud routine's sandbox cannot open news or
# government pages (2026-09-13 first run: 403 policy-denial on every source),
# so it can never date-check a claim. This Mac can. /bin/bash holds Full Disk
# Access and launchd has the keychain, the same pattern as com.ashish.ga4-audit.
#
# Idempotent per day: the insert script ignores duplicate rows and every day
# gets exactly one ops_reports row per successful run.
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to $REPO_ROOT"; exit 1; }
TODAY="$(TZ=Asia/Kolkata date +%F)"
WORK="$HOME/.claude/road-updates"; mkdir -p "$WORK"
ROWS="$WORK/rows-$TODAY.json"
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
say "=== road-updates-daily start (IST $TODAY) ==="

PROMPT="You are running the NakshIQ daily road updates job for IST date $TODAY. Read ops/road-updates/SKILL.md first and follow it exactly; read CLAUDE.md for project rules. Work in this repo. Use WebSearch and WebFetch (and Playwright via node if a site blocks plain fetches) to collect road closures, restrictions and reopenings announced in the last 48 hours for the 8 regions; open every source and confirm its own dateline. Dispatch at most 3 parallel Haiku sub-agents grouped by region. Then write $ROWS in the exact shape the skill gives (empty rows array is fine on a quiet day, with a run.note) and run: node --env-file=apps/web/.env.local scripts/road-updates-insert.mjs $ROWS . If it refuses, fix the rows it names and re-run it. Do not write to the database any other way. Do not commit anything. Finish with one line: INSERTED <n>."

# Alias pinned (never a full model id — aliases resolve against the binary's own table).
claude -p "$PROMPT" --model sonnet \
  --allowedTools "Read,Glob,Grep,Bash,Write,Edit,WebSearch,WebFetch,Task" \
  --permission-mode acceptEdits --max-turns 120 \
  > "$WORK/run-$TODAY.log" 2>&1
RC=$?
say "claude exit=$RC; tail:"; tail -3 "$WORK/run-$TODAY.log"

if [ ! -f "$ROWS" ]; then
  say "❌ no rows file written — the session did not complete the job"
  printf '%s' "$WORK/run-$TODAY.log" > "$HOME/Automation/nakshiq-ig/logs/latest-brief.txt" 2>/dev/null
  printf '%s' "Road updates job wrote nothing today. Click for the log." > "$HOME/Automation/nakshiq-ig/logs/notify-pending.txt" 2>/dev/null
  /usr/bin/open -n -a "$HOME/Automation/nakshiq-ig/NakshIQ-Brief.app" 2>/dev/null
  exit 1
fi
# Belt and braces: the session should have inserted; this re-run is a no-op on duplicates
# and guarantees the ops_reports row exists even if the session died after writing rows.json.
node --env-file=apps/web/.env.local scripts/road-updates-insert.mjs "$ROWS" || { say "❌ insert refused"; exit 1; }
say "=== road-updates-daily end ==="
