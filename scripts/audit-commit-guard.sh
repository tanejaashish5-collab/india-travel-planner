#!/bin/bash
# audit-commit-guard.sh — commit + push audit files so a FAILURE IS LOUD.
#
# Why this exists (2026-07-29 incident):
#   Scheduled audit runs write dated audit files and commit them. Two failure
#   modes both looked like success:
#
#   1. STALE GIT LOCKS. A session crashed 2026-07-27 21:12 leaving 0-byte
#      .git/index.lock + .git/HEAD.lock. Every local commit for the next two
#      days died with "Unable to create '.git/index.lock'". Nothing inspected
#      the exit code, so the runs reported done. (A third lock,
#      .git/objects/maintenance.lock, had been stale since 2026-04-29.)
#   2. VERCEL SKIPPED THE BUILD. apps/web/vercel-ignore.sh excluded every *.md,
#      so an audit-only commit never triggered the build whose prebuild
#      regenerates apps/web/src/data/audit-snapshots.json. Fixed at source in
#      that script; this guard verifies the outcome anyway rather than trusting
#      it, because the snapshot going stale is invisible from the outside.
#
# The rule this encodes: never infer that a commit landed. Check that HEAD
# moved, that the files are IN the new commit, and that the remote advanced.
#
# Usage:
#   bash scripts/audit-commit-guard.sh -m "<message>" <path> [<path>...]
#   bash scripts/audit-commit-guard.sh -m "<msg>" --no-push <path>...
#
# Exits 0 only when every step is verified. Any doubt exits non-zero and says
# what to do. Exit 0 with "nothing to commit" is a legitimate no-op.

set -uo pipefail

# This script is called from cron, whose PATH is minimal. `git push` here goes
# through `credential.helper = !gh auth git-credential`, so `gh` must resolve
# or the push dies with "could not read Username". Homebrew on Apple Silicon
# is /opt/homebrew/bin — absent from cron's default PATH. (2026-08-26)
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to repo root"; exit 1; }

MSG=""
DO_PUSH=1
PATHS=()
STALE_LOCK_AGE_MIN=10

while [ $# -gt 0 ]; do
  case "$1" in
    -m|--message) MSG="${2:-}"; shift 2 ;;
    --no-push)    DO_PUSH=0; shift ;;
    -h|--help)    sed -n '1,30p' "$0"; exit 0 ;;
    *)            PATHS+=("$1"); shift ;;
  esac
done

fail() { echo ""; echo "❌ AUDIT COMMIT FAILED — $1"; echo "   ${2:-}"; exit 1; }

[ -n "$MSG" ]        || fail "no commit message" "Pass -m \"<message>\"."
[ ${#PATHS[@]} -gt 0 ] || fail "no paths given" "Pass the audit files to commit."

# ---------------------------------------------------------------- 1. locks
# Only clear a lock we can PROVE is abandoned: no git process running against
# this repo, and the lock is either empty or older than STALE_LOCK_AGE_MIN.
# A lock held by a live git process is left alone — removing it could corrupt
# a concurrent write.
if pgrep -f "git .*$REPO_ROOT" >/dev/null 2>&1; then
  fail "a git process is running in this repo" \
       "Refusing to touch lock files while git is active. Retry once it exits."
fi

CLEARED=""
while IFS= read -r lock; do
  [ -n "$lock" ] || continue
  if [ ! -s "$lock" ] || [ -n "$(find "$lock" -mmin +$STALE_LOCK_AGE_MIN 2>/dev/null)" ]; then
    rm -f "$lock" && CLEARED="$CLEARED $lock"
  else
    fail "fresh non-empty lock present: $lock" \
         "Less than ${STALE_LOCK_AGE_MIN}m old and non-empty — may be a live write. Inspect manually."
  fi
done < <(find .git -name "*.lock" -type f 2>/dev/null)

if [ -n "$CLEARED" ]; then
  echo "⚠️  cleared stale git lock(s):$CLEARED"
  echo "    (a previous run almost certainly failed to commit — check for a gap"
  echo "     between the last commit date and today)"
fi

# ------------------------------------------------------- 2. stage + commit
HEAD_BEFORE="$(git rev-parse HEAD 2>/dev/null)" || fail "cannot read HEAD" "Is this a git repo?"

git add -- "${PATHS[@]}" || fail "git add failed" "Check the paths exist and aren't gitignored."

if git diff --cached --quiet; then
  echo "✓ nothing to commit — the given paths are already committed and unchanged."
  echo "  (If you expected changes, confirm the files were actually written, and"
  echo "   that they are not matched by .gitignore: git check-ignore -v <path>)"
  exit 0
fi

STAGED="$(git diff --cached --name-only)"
echo "staging:"; echo "$STAGED" | sed 's/^/  /'

git commit -q -m "$MSG"
COMMIT_RC=$?

HEAD_AFTER="$(git rev-parse HEAD 2>/dev/null)"

# Exit code alone is not enough — a pre-commit hook can fail after git reports
# progress, and the 07-27 lock failure returned non-zero with HEAD unmoved.
if [ "$COMMIT_RC" -ne 0 ] || [ "$HEAD_BEFORE" = "$HEAD_AFTER" ]; then
  fail "commit did not land (rc=$COMMIT_RC, HEAD unchanged at ${HEAD_BEFORE:0:8})" \
       "Common causes: stale lock, pre-commit credential-scan rejection, empty identity."
fi

# Prove the files are IN the commit, not merely staged at some point.
COMMITTED="$(git show --pretty="" --name-only HEAD)"
MISSING=""
while IFS= read -r f; do
  [ -n "$f" ] || continue
  echo "$COMMITTED" | grep -Fqx "$f" || MISSING="$MISSING $f"
done <<< "$STAGED"
[ -z "$MISSING" ] || fail "files staged but absent from HEAD:$MISSING" "Commit is incomplete."

echo "✓ committed ${HEAD_AFTER:0:8} — $(echo "$COMMITTED" | wc -l | tr -d ' ') file(s)"

# ------------------------------------------------- 3. will Vercel build it?
# Audit files must reach the prebuild. vercel-ignore.sh now treats them as
# build-triggering, but verify rather than assume — if it would skip, say so.
if [ -f apps/web/vercel-ignore.sh ]; then
  if (cd apps/web && bash vercel-ignore.sh >/dev/null 2>&1); then
    echo "⚠️  vercel-ignore.sh would SKIP the build for this commit."
    echo "    If these files feed the apps/web prebuild (audit-snapshots.json),"
    echo "    force a build:  git commit --allow-empty -m 'chore(build): force rebuild'"
  else
    echo "✓ vercel-ignore.sh will allow a build for this commit"
  fi
fi

# --------------------------------------------------------------- 4. push
if [ "$DO_PUSH" -eq 0 ]; then
  echo "✓ done (--no-push: commit is local only, NOT deployed)"
  exit 0
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"

# Preflight the credential helper. Without this the failure surfaces only as
# git's generic "could not read Username for 'https://github.com'", which reads
# like an auth/token problem and sent four days of debugging down the wrong
# path. If the helper is a bare command, it must be resolvable on PATH.
HELPER="$(git config --get credential.helper 2>/dev/null || true)"
case "$HELPER" in
  "!"*)
    HELPER_BIN="$(printf '%s' "${HELPER#!}" | awk '{print $1}')"
    case "$HELPER_BIN" in
      /*) [ -x "$HELPER_BIN" ] || fail "credential helper '$HELPER_BIN' is not executable" \
            "git cannot authenticate to push. Fix the path in .git/config." ;;
      *)  command -v "$HELPER_BIN" >/dev/null 2>&1 || fail \
            "credential helper '$HELPER_BIN' is not on PATH — git cannot authenticate to push" \
            "PATH starts: $(printf '%s' "$PATH" | cut -d: -f1-6)
   Fix: add the directory holding '$HELPER_BIN' to the PATH line at the top of this script." ;;
    esac
    ;;
esac

git push -q origin "$BRANCH" || fail "push failed" \
  "Commit is safe locally at ${HEAD_AFTER:0:8}. Resolve and re-push; do not re-run this script."

git fetch -q origin "$BRANCH" 2>/dev/null
REMOTE="$(git rev-parse "origin/$BRANCH" 2>/dev/null)"
[ "$REMOTE" = "$HEAD_AFTER" ] || fail \
  "push reported success but origin/$BRANCH is ${REMOTE:0:8}, not ${HEAD_AFTER:0:8}" \
  "Someone else pushed, or the push silently no-op'd. Re-check before assuming deployed."

echo "✓ pushed — origin/$BRANCH at ${HEAD_AFTER:0:8}"
echo "✓ all checks passed"
