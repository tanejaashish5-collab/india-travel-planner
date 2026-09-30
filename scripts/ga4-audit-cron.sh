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

# cron gets a minimal PATH, and it must cover more than node and git.
# git is configured with `credential.helper = !gh auth git-credential`, so a
# `git push` to https://github.com needs `gh` on PATH too. Homebrew on Apple
# Silicon installs to /opt/homebrew/bin, which cron's default PATH does not
# include. That single omission broke the push on four consecutive days
# (2026-08-23 → 08-26); each run committed fine and then died with
# "gh: command not found" / "could not read Username for 'https://github.com'",
# leaving the commit stranded locally. Do not trim this list.
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

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

# ---------------------- 3+4. commit EVERY uncommitted audit file, per family
# Untracked (never committed) + modified (committed then rewritten). Restricted
# to dated filename patterns so nothing else in a directory is swept in.
#
# Two families, one commit each so git log stays readable:
#   ga4-audits/ga4-audit-*.md    written by ga4-daily-audit.mjs above
#   gsc-audits/gsc-audit-*.md    written ~21:15 by the Cowork "daily-gsc-audit"
#                                task (~/Documents/Claude/Scheduled/), which has
#                                NO commit step
#   gsc-audits/demand-gaps-*.md  written Mondays by com.ashish.demand-gaps, which
#                                commits only its JSON
# (2026-09-30) The Cowork GSC session committed its file on its own initiative
# until 09-24, then silently stopped: 09-25 → 09-29 sat untracked, freezing the
# GSC half of audit-snapshots.json — the same bug this script fixed for GA4.
# A commit that depends on a model remembering is a suggestion; this is the
# control. Next morning's run picks up the previous evening's GSC file.
GUARD_FAILED=0

# Redact before committing. This repo is PUBLIC and the Cowork audit has written
# personal Gmail addresses into reports (2026-08/09). The pre-commit hook
# (scripts/privacy-guard.sh) would refuse such a file, and a refused commit
# freezes audit-snapshots.json, so scrub instead of failing: every address
# except system senders (google.com, nakshiq.com), plus every literal in the
# gitignored .secrets/never-publish.txt, becomes [account].
redact_audit_file() {
  perl -pi -e 's/[A-Za-z0-9._%+-]+@(?!(?:google\.com|nakshiq\.com)\b)[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/[account]/g' "$1"
  if [ -s .secrets/never-publish.txt ]; then
    NP_LIST=.secrets/never-publish.txt perl -pi -e '
      BEGIN { open my $f, "<", $ENV{NP_LIST} or die; @w = grep { length } map { s/^\s+|\s+$//gr } grep { !/^\s*#/ } <$f>; }
      for my $w (@w) { s/\Q$w\E/[account]/gi }' "$1"
  fi
}

commit_family() {  # $1 label  $2 dir  $3 anchored ERE for the path  $4 msg prefix
  local label="$1" dir="$2" re="$3" prefix="$4"
  local pending=() f dates first last msg
  while IFS= read -r f; do
    [ -n "$f" ] && pending+=("$f")
  done < <(
    {
      git ls-files --others --exclude-standard -- "$dir"
      git diff --name-only -- "$dir"
    } | grep -E "$re" | sort -u
  )
  if [ ${#pending[@]} -eq 0 ]; then
    say "no uncommitted $label files"
    return 0
  fi
  say "found ${#pending[@]} uncommitted $label file(s):"
  printf '    %s\n' "${pending[@]}"
  for f in "${pending[@]}"; do redact_audit_file "$f"; done

  # Name the span in the message so a catch-up run is obvious in git log.
  # Derived with head/tail rather than array indices on purpose: bash indexes
  # arrays from 0 and zsh from 1, and this file should not silently produce a
  # wrong commit message if someone ever runs it under a different shell.
  dates="$(printf '%s\n' "${pending[@]}" | sed -E 's#.*-([0-9]{4}-[0-9]{2}-[0-9]{2})\.md$#\1#' | sort)"
  first="$(printf '%s\n' "$dates" | head -1)"
  last="$(printf '%s\n' "$dates" | tail -1)"
  if [ "$first" = "$last" ] && [ ${#pending[@]} -eq 1 ]; then
    msg="$prefix $first"
  else
    msg="$prefix files $first → $last (catch-up, ${#pending[@]} files)"
  fi

  # The guard does the work that matters: clears provably-stale locks, verifies
  # HEAD actually moved, verifies the files are IN the commit, verifies the
  # remote advanced. Never replace this with a bare `git commit`.
  if bash scripts/audit-commit-guard.sh -m "$msg" "${pending[@]}"; then
    say "✓ $label committed and pushed"
  else
    GUARD_FAILED=1
    say "⚠️  audit-commit-guard did not complete for $label — see its output above."
    say "    Falling through to the stranded-commit heal below."
  fi
}

commit_family "GA4 audit" ga4-audits/ \
  '^ga4-audits/ga4-audit-[0-9]{4}-[0-9]{2}-[0-9]{2}\.md$' "measure(ga4): audit"
commit_family "GSC audit" gsc-audits/ \
  '^gsc-audits/(gsc-audit|demand-gaps)-[0-9]{4}-[0-9]{2}-[0-9]{2}\.md$' "chore(gsc): audit"

# ------------------------------------------- 4b. heal stranded local commits
# This block USED TO LIVE inside the `else` above, which made it dead code:
# the audit writes a file every single day, so PENDING was never empty and the
# heal never ran. When the guard's push then failed, the script exited 1 right
# there and the commit sat local forever — the exact failure that repeated for
# four days (2026-08-23 → 08-26) while a "self-healing" branch sat unreachable
# a few lines below it. It now runs unconditionally, after either path.
AHEAD="$(git rev-list --count "origin/${BRANCH}..HEAD" 2>/dev/null || echo 0)"
if [ "${AHEAD:-0}" -gt 0 ]; then
  say "⚠️  $AHEAD local commit(s) not on origin/${BRANCH} — pushing now"
  if git push -q origin "$BRANCH"; then
    # Never infer a push landed — verify the remote actually moved to HEAD.
    git fetch -q origin "$BRANCH" 2>/dev/null
    if [ "$(git rev-parse HEAD 2>/dev/null)" = "$(git rev-parse "origin/${BRANCH}" 2>/dev/null)" ]; then
      say "✓ pushed $AHEAD previously-stranded commit(s) — origin/${BRANCH} verified at HEAD"
      GUARD_FAILED=0
    else
      say "❌ push reported success but origin/${BRANCH} is not at HEAD — needs a human"
      exit 1
    fi
  else
    say "❌ push failed — $AHEAD commit(s) still stranded locally. Needs a human."
    exit 1
  fi
fi

if [ "$GUARD_FAILED" -ne 0 ]; then
  say "❌ audit-commit-guard failed and there was nothing left to heal."
  say "   Tomorrow's run will retry; if it keeps failing, this needs a human."
  exit 1
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
