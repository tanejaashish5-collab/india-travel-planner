#!/bin/bash
# ga4-audit-cron.sh — run the daily GA4 audit AND get its output committed.
#
# WHY THIS EXISTS (2026-08-10)
# ---------------------------
# `scripts/ga4-daily-audit.mjs` writes ga4-audits/ga4-audit-YYYY-MM-DD.md and
# stops. It has no git step. The crontab entry that ran it had no git step
# either. So every GA4 audit file since the feature shipped only ever reached
# the repo because a human or a Claude session happened to notice an untracked
# file and commit it by hand.
#
# That is invisible when it fails. The apps/web prebuild builds
# audit-snapshots.json from COMMITTED audit files only, so an uncommitted audit
# silently freezes the GA4 half of the snapshot while the cron log keeps
# printing "✓ wrote ...". On 2026-08-10 four days (08-07 → 08-10) were sitting
# uncommitted and the snapshot had been frozen at 08-06.
#
# The GSC side of the house already had scripts/audit-commit-guard.sh for
# exactly this class of bug. The GA4 cron predates it and never got wired up.
# This script is that wiring.
#
# WHAT MAKES IT SURVIVE UNATTENDED USE
# ------------------------------------
# A naive `... && audit-commit-guard.sh <today's file>` in crontab looks correct
# and then rots, for three separate reasons. Each is handled below:
#
#   1. CATCH-UP. If a run fails, the machine is asleep at 09:45, or the push is
#      rejected, that day's file is orphaned forever — tomorrow's run would only
#      offer tomorrow's file. So this commits EVERY uncommitted ga4-audit-*.md
#      it finds, not just today's. One good run heals any number of missed days.
#
#   2. BEING BEHIND ORIGIN. Cloud routines push audit commits to main on their
#      own schedule; on 2026-08-10 this checkout was 5 commits behind. A push
#      from a behind-local is rejected, the guard fails loudly — into a log
#      nobody reads. So we rebase onto origin first, every time.
#
#   3. A PREVIOUSLY-FAILED PUSH. If the guard ever commits and then fails to
#      push, the file is committed — so the next run's "uncommitted" scan finds
#      nothing and the commit sits local forever. So we explicitly push any
#      unpushed commits even when there is nothing new to add.
#
# Exit codes: 0 = audit ran and the repo is in sync. Non-zero = something needs
# a human. The next day's run will attempt to heal it regardless.
#
# USAGE (crontab):
#   45 9 * * * bash "/path/to/repo/scripts/ga4-audit-cron.sh" >> ~/.claude/ga4-audit-cron.log 2>&1

set -uo pipefail

# cron gets a minimal PATH — node and git must be found by absolute location.
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to $REPO_ROOT"; exit 1; }

BRANCH="main"
LOG_MAX_LINES=5000
STALE_AFTER_DAYS=2

say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

say "=== ga4-audit-cron start (repo: $REPO_ROOT) ==="

# ------------------------------------------------------------ 1. run audit
# Deliberately does NOT abort on failure: an audit that fails today must not
# also block yesterday's orphaned file from finally being committed.
node scripts/ga4-daily-audit.mjs
AUDIT_RC=$?
if [ "$AUDIT_RC" -ne 0 ]; then
  say "⚠️  ga4-daily-audit.mjs exited $AUDIT_RC — continuing to the commit step anyway"
  say "    (a failed audit must not strand previously-written files)"
fi

# ------------------------------------------------- 2. sync with origin first
# Without this, a push from a behind-local is rejected and everything after it
# fails. --autostash protects any work-in-progress in the checkout.
# Braces are required, not cosmetic: bash 3.2 folds an immediately-following
# multibyte character into the variable name, so `$BRANCH…` is an unbound
# variable and `set -u` kills the run right here.
say "syncing with origin/${BRANCH}…"
if ! git fetch -q origin "$BRANCH" 2>/dev/null; then
  say "⚠️  git fetch failed (offline?) — will still commit locally, push may fail"
else
  BEHIND="$(git rev-list --count "HEAD..origin/$BRANCH" 2>/dev/null || echo 0)"
  if [ "${BEHIND:-0}" -gt 0 ]; then
    say "  local is $BEHIND commit(s) behind — rebasing"
    if ! git pull --rebase --autostash -q origin "$BRANCH"; then
      git rebase --abort 2>/dev/null
      say "❌ rebase failed and was aborted — the checkout needs a human."
      say "   Nothing was committed. Resolve, then re-run this script."
      exit 1
    fi
    say "  ✓ rebased onto origin/$BRANCH"
  else
    say "  ✓ already up to date"
  fi
fi

# ------------------------------- 3. collect EVERY uncommitted GA4 audit file
# Untracked (never committed) + modified (committed then rewritten). Restricted
# to the dated filename pattern so nothing else in the directory is swept in.
PENDING=()
while IFS= read -r f; do
  [ -n "$f" ] && PENDING+=("$f")
done < <(
  {
    git ls-files --others --exclude-standard -- ga4-audits/
    git diff --name-only -- ga4-audits/
  } | grep -E '^ga4-audits/ga4-audit-[0-9]{4}-[0-9]{2}-[0-9]{2}\.md$' | sort -u
)

# --------------------------------------------------------- 4. commit + push
if [ ${#PENDING[@]} -gt 0 ]; then
  say "found ${#PENDING[@]} uncommitted audit file(s):"
  printf '    %s\n' "${PENDING[@]}"

  # Name the span in the message so a catch-up run is obvious in git log.
  # Derived with head/tail rather than array indices on purpose: bash indexes
  # arrays from 0 and zsh from 1, and this file should not silently produce a
  # wrong commit message if someone ever runs it under a different shell.
  DATES="$(printf '%s\n' "${PENDING[@]}" | sed -E 's#.*/ga4-audit-([0-9]{4}-[0-9]{2}-[0-9]{2})\.md#\1#' | sort)"
  FIRST_DATE="$(printf '%s\n' "$DATES" | head -1)"
  LAST_DATE="$(printf '%s\n' "$DATES" | tail -1)"
  if [ "$FIRST_DATE" = "$LAST_DATE" ]; then
    MSG="measure(ga4): audit $FIRST_DATE"
  else
    MSG="measure(ga4): audit files $FIRST_DATE → $LAST_DATE (catch-up, ${#PENDING[@]} days)"
  fi

  # The guard does the work that matters: clears provably-stale locks, verifies
  # HEAD actually moved, verifies the files are IN the commit, verifies the
  # remote advanced. Never replace this with a bare `git commit`.
  if bash scripts/audit-commit-guard.sh -m "$MSG" "${PENDING[@]}"; then
    say "✓ committed and pushed"
  else
    say "❌ audit-commit-guard failed — see its output above."
    say "   Tomorrow's run will retry; if it keeps failing, this needs a human."
    exit 1
  fi
else
  say "no uncommitted audit files"

  # Heal a previously-failed push: committed locally but never landed on origin.
  AHEAD="$(git rev-list --count "origin/$BRANCH..HEAD" 2>/dev/null || echo 0)"
  if [ "${AHEAD:-0}" -gt 0 ]; then
    say "⚠️  $AHEAD local commit(s) never pushed — pushing now"
    if git push -q origin "$BRANCH"; then
      say "✓ pushed $AHEAD previously-stranded commit(s)"
    else
      say "❌ push failed — repo needs a human"
      exit 1
    fi
  fi
fi

# ------------------------------------------------------- 5. staleness check
# The whole point is that the snapshot must not silently freeze. If the newest
# COMMITTED audit is old, say so loudly even when this run itself succeeded.
NEWEST_COMMITTED="$(git ls-files ga4-audits/ | grep -E 'ga4-audit-[0-9]{4}-[0-9]{2}-[0-9]{2}\.md$' | sort | tail -1)"
if [ -n "$NEWEST_COMMITTED" ]; then
  NEWEST_DATE="$(basename "$NEWEST_COMMITTED" .md | sed 's/ga4-audit-//')"
  AGE_DAYS=$(( ( $(date +%s) - $(date -j -f "%Y-%m-%d" "$NEWEST_DATE" +%s 2>/dev/null || echo "$(date +%s)") ) / 86400 ))
  if [ "$AGE_DAYS" -gt "$STALE_AFTER_DAYS" ]; then
    say "⚠️  newest COMMITTED audit is $NEWEST_DATE ($AGE_DAYS days old) — snapshot may be frozen"
  else
    say "✓ newest committed audit: $NEWEST_DATE (${AGE_DAYS}d old)"
  fi
fi

# ---------------------------------------------------------- 6. trim the log
# dotenvx prints several self-promo "tip" lines per run; unbounded growth makes
# the log useless exactly when someone finally reads it.
LOGFILE="${HOME}/.claude/ga4-audit-cron.log"
if [ -f "$LOGFILE" ] && [ "$(wc -l < "$LOGFILE" | tr -d ' ')" -gt "$LOG_MAX_LINES" ]; then
  tail -n "$LOG_MAX_LINES" "$LOGFILE" > "${LOGFILE}.tmp" && mv "${LOGFILE}.tmp" "$LOGFILE"
fi

say "=== ga4-audit-cron done ==="
exit 0
