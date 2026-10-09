#!/bin/bash
# pre-push: PARKED BRANCH GATE (added 2026-10-09).
# A branch named parked/* holds website changes that must ship in ONE Vercel build
# together with the next real web push (every deploy empties the ISR cache = the bill).
# Block a push to main that would trigger a web build while a parked branch is unmerged.
# Pushes that vercel-ignore.sh would skip (autoposter, audits, docs, data) pass freely.
# Override once with: PARKED_OK=1 git push
[ "${PARKED_OK:-}" = "1" ] && exit 0
SKIP_RE='^(nakshiq-autoposter/|ops/|videos/|images/|\.claude/|\.expo/|\.playwright-mcp/|\.match_ashish\.py$|data/|scripts/|qa/|tests/|\.loop/|\.github/|\.gitignore$|supabase/seed/|gsc-audits/|ga4-audits/|Web Res reports/|Branding/|.*\.docx$|.*\.md$|MEMORY\.md|[^/]+\.png$|.*\.csv$)'
while read -r lref lsha rref rsha; do
  [ "$rref" = "refs/heads/main" ] || continue
  [ "$lsha" = "0000000000000000000000000000000000000000" ] && continue
  PARKED=$(git for-each-ref --format='%(refname:short)' 'refs/heads/parked/*')
  [ -z "$PARKED" ] && continue
  UNMERGED=""
  for b in $PARKED; do git merge-base --is-ancestor "$b" "$lsha" 2>/dev/null || UNMERGED="$UNMERGED $b"; done
  [ -z "$UNMERGED" ] && continue
  if [ "$rsha" = "0000000000000000000000000000000000000000" ]; then RANGE="$lsha"; else RANGE="$rsha..$lsha"; fi
  WEB=$(git diff --name-only $RANGE 2>/dev/null | grep -vE "$SKIP_RE" | head -5)
  if [ -n "$WEB" ]; then
    echo "PUSH BLOCKED: this push triggers a Vercel build, but parked website changes are unmerged:$UNMERGED" >&2
    echo "Triggering files:" >&2; echo "$WEB" | sed 's/^/  /' >&2
    echo "Fix: from the main checkout run  git merge --no-ff $UNMERGED  (resolve conflicts), re-check, then push once." >&2
    echo "Then delete the branch + worktree (git worktree remove ~/Automation/parked/itp-copy-fixes; git branch -d ...)." >&2
    echo "Override (rare): PARKED_OK=1 git push" >&2
    exit 1
  fi
done
exit 0
