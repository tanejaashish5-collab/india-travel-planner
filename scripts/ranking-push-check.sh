#!/bin/bash
# ranking-push-check.sh — LaunchAgent wrapper for the pre-registered 2026-10-20 measurement.
#
# Mirrors scripts/ga4-audit-cron.sh, for the same two reasons that job is a
# LaunchAgent invoked through /bin/bash and not cron or a cloud routine:
#   - the GSC OAuth secrets live only in .secrets/ on this machine, so no cloud
#     routine can run the measurement;
#   - /bin/bash holds Full Disk Access (reads ~/Desktop) AND launchd has the
#     login keychain (so `gh`'s credential helper can push). cron has neither.
#
# Idempotent: a second fire on the same day (the plist has a retry day) does
# nothing if today's check file already exists.
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to $REPO_ROOT"; exit 1; }
BRANCH="main"
TODAY="$(date +%F)"
OUT="gsc-audits/ranking-push-check-${TODAY}.md"
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

say "=== ranking-push-check start ==="
if [ -f "$OUT" ]; then
  say "✓ $OUT already exists — nothing to do (retry fire)"
  exit 0
fi

# Refresh both inputs the check joins on, then score.
node --env-file=apps/web/.env.local scripts/gsc-ranking-push-candidates.mjs >/dev/null 2>&1 \
  || say "⚠️  candidates refresh failed — the check still runs off the committed baseline"
if ! node --env-file=apps/web/.env.local scripts/ranking-push-check.mjs; then
  say "❌ measurement FAILED — no check file written, nothing committed"
  # Fail LOUDLY: a silent miss on the decision date is the worst outcome.
  printf '%s' "$HOME/.claude/ranking-push-check.log" > "$HOME/Automation/nakshiq-ig/logs/latest-brief.txt" 2>/dev/null
  printf '%s' "Ranking push check FAILED to measure. Click for the log." > "$HOME/Automation/nakshiq-ig/logs/notify-pending.txt" 2>/dev/null
  /usr/bin/open -n -a "$HOME/Automation/nakshiq-ig/NakshIQ-Brief.app" 2>/dev/null
  exit 1
fi

# Readable copy for the founder: dark PDF in ~/Desktop/Reports, opened by the
# notification click through the NakshIQ-Brief applet (bare osascript
# notifications belong to Script Editor, see ops/nakshiq-ig/README.md).
PDF="$HOME/Desktop/Reports/NakshIQ-Ranking-Push-Check-${TODAY}.pdf"
if node scripts/md-to-dark-pdf.mjs "$OUT" "$PDF" 2>/dev/null; then
  printf '%s' "$PDF" > "$HOME/Automation/nakshiq-ig/logs/latest-brief.txt" 2>/dev/null
else
  say "⚠️  PDF render failed — notification will open the markdown"
  printf '%s' "$REPO_ROOT/$OUT" > "$HOME/Automation/nakshiq-ig/logs/latest-brief.txt" 2>/dev/null
fi
printf '%s' "Ranking push check is in. Click to read the verdict." > "$HOME/Automation/nakshiq-ig/logs/notify-pending.txt" 2>/dev/null
/usr/bin/open -n -a "$HOME/Automation/nakshiq-ig/NakshIQ-Brief.app" 2>/dev/null

# Commit + push through the guard (rebase first: cloud routines push to main on
# their own schedule and a behind-local push is rejected).
say "syncing with origin/${BRANCH}…"
if git fetch -q origin "$BRANCH" 2>/dev/null; then
  BEHIND="$(git rev-list --count "HEAD..origin/${BRANCH}" 2>/dev/null || echo 0)"
  if [ "${BEHIND:-0}" -gt 0 ]; then
    git pull --rebase --autostash -q origin "$BRANCH" || { git rebase --abort 2>/dev/null; say "❌ rebase failed — file written but NOT committed"; exit 1; }
  fi
fi
bash scripts/audit-commit-guard.sh -m "measure(seo): ranking push check ${TODAY} vs 2026-09-13 baseline

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>" "$OUT" gsc-audits/ranking-push-candidates-*.json
RC=$?
say "=== ranking-push-check end (guard exit=$RC) ==="
exit $RC
