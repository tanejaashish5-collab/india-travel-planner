#!/bin/bash
# autoposter-state-sync.sh — pull/push the autoposter's state to the
# `autoposter-state` branch, for runs that happen OUTSIDE GitHub Actions.
#
# WHY THIS EXISTS. The autoposter's state files (state.json, post_log.jsonl,
# posted_today.jsonl, …) live on a side branch so they never trigger a Vercel
# rebuild on main. The GitHub workflow pulls them before the run and merges
# them back after; a local run did NEITHER. That is not cosmetic:
#
#   1. post_log.jsonl feeds destinations_posted_today_jsonl(), which is the
#      same-day-destination dedup gate. Running it against a stale file is
#      exactly what caused the Uttarakhand triple-publish on 2026-05-25.
#   2. engagement_pull runs in CI and reads the branch. A post recorded only
#      in a local working copy is invisible to every measurement we have —
#      it would publish and then never appear in any scorecard.
#
# Usage:
#   bash scripts/autoposter-state-sync.sh pull    # before the autoposter runs
#   bash scripts/autoposter-state-sync.sh push    # after it runs
#
# Both are no-ops that exit 0 when the branch does not exist yet. `pull` exits
# NON-ZERO when a file that exists on the remote fails to check out — the
# caller must treat that as "do not publish", because dedup would then run on
# stale data. Mirrors the hard-fail the workflow added in Phase C 2026-05-26.
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to $REPO_ROOT"; exit 1; }

BRANCH="${AUTOPOSTER_STATE_BRANCH:-autoposter-state}"
SNAP="${TMPDIR:-/tmp}/autoposter-snap-$$"
WORKTREE="${TMPDIR:-/tmp}/autoposter-state-wt-$$"

# The exact file list the workflow syncs. Keep the two in step.
FILES=(
  nakshiq-autoposter/state.json
  nakshiq-autoposter/autoposter.log
  nakshiq-autoposter/analytics.json
  nakshiq-autoposter/data/post_engagement.json
  nakshiq-autoposter/data/post_outcomes.jsonl
  nakshiq-autoposter/data/post_log.jsonl
  nakshiq-autoposter/data/posted_today.jsonl
  nakshiq-autoposter/data/theme_usage.jsonl
)
# Append-only JSONLs. These must NEVER be copied over the worktree copy:
# the worktree holds what the remote has, and merge_jsonl.py unions it with
# our snapshot. Copying first destroys any row a concurrent CI run appended
# and then "merges" our snapshot with itself — silent data loss that still
# reports a healthy merge count.
#
# Caught 2026-09-15 by an end-to-end test: a simulated CI row was on the
# remote, our push was rejected, the retry reset to the remote and then
# copied the snapshot over it — and the CI row vanished. Everything else is
# last-write-wins, which is fine because the racing fields live in the JSONLs.
MERGE_ONLY=(post_log.jsonl theme_usage.jsonl posted_today.jsonl)

is_merge_only() {
  local b; b="$(basename "$1")"
  for m in "${MERGE_ONLY[@]}"; do [ "$b" = "$m" ] && return 0; done
  return 1
}

say() { echo "[state-sync] $*"; }

remote_has_branch() {
  git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1
}

do_pull() {
  if ! remote_has_branch; then
    say "branch '$BRANCH' not on origin yet — nothing to pull (first run)"
    return 0
  fi
  git fetch origin "$BRANCH" --depth=1 -q || { say "FATAL: fetch failed"; return 1; }
  local failed=0
  for f in "${FILES[@]}"; do
    if git cat-file -e "origin/${BRANCH}:$f" 2>/dev/null; then
      if git checkout "origin/${BRANCH}" -- "$f"; then
        # Leave the index clean: the file content is what the autoposter
        # needs, but a staged entry would pollute the next commit on main.
        git restore --staged "$f" 2>/dev/null || true
      else
        say "ERROR: exists on remote but checkout FAILED: $f"
        failed=1
      fi
    else
      say "  $f not on remote yet (fine)"
    fi
  done
  if [ "$failed" -ne 0 ]; then
    say "REFUSING: one or more state files failed to sync. Dedup would run on stale data."
    return 1
  fi
  say "pulled state from origin/$BRANCH"
}

do_push() {
  mkdir -p "$SNAP"
  local any=0
  for f in "${FILES[@]}"; do
    [ -f "$f" ] && { cp "$f" "$SNAP/$(basename "$f")"; any=1; }
  done
  if [ "$any" -eq 0 ]; then
    say "no state files on disk — nothing to push"
    rm -rf "$SNAP"
    return 0
  fi

  if ! remote_has_branch; then
    say "branch '$BRANCH' missing on origin — refusing to bootstrap it from a local run"
    rm -rf "$SNAP"
    return 1
  fi

  git fetch origin "$BRANCH" --depth=1 -q || { say "FATAL: fetch failed"; rm -rf "$SNAP"; return 1; }
  rm -rf "$WORKTREE"
  git worktree add -q "$WORKTREE" "$BRANCH" 2>/dev/null \
    || git worktree add -q --detach "$WORKTREE" "origin/$BRANCH" \
    || { say "FATAL: worktree add failed"; rm -rf "$SNAP"; return 1; }

  local rc=0
  (
    mkdir -p "$WORKTREE/nakshiq-autoposter/data"
    for f in "${FILES[@]}"; do
      is_merge_only "$f" && continue   # leave the remote's copy for the merge
      [ -f "$SNAP/$(basename "$f")" ] && cp "$SNAP/$(basename "$f")" "$WORKTREE/$f"
    done
    # Union the append-only files with whatever the remote already holds.
    python3 nakshiq-autoposter/scripts/merge_jsonl.py \
            "$WORKTREE/nakshiq-autoposter/data" "$SNAP" || true

    cd "$WORKTREE" || exit 1
    git config user.name  "Nakshiq Autoposter"
    git config user.email "autoposter@nakshiq.com"
    for f in "${FILES[@]}"; do [ -f "$f" ] && git add -- "$f"; done
    if git diff --staged --quiet; then
      echo "[state-sync] no state changes to commit"
      exit 0
    fi
    git commit -q -m "chore: autoposter state $(date -u +'%Y-%m-%d %H:%M UTC') (local)" || exit 1

    # Three attempts. A rejected push means CI pushed while we worked; do NOT
    # rebase (JSONL appends conflict at EOF every time). Hard-reset to the
    # remote, re-apply our snapshot, re-merge, re-commit. Idempotent — each
    # retry converges on the union of both sides.
    for attempt in 1 2 3; do
      if git push -q origin "HEAD:$BRANCH"; then
        echo "[state-sync] pushed (attempt $attempt)"
        exit 0
      fi
      echo "[state-sync] push rejected (attempt $attempt) — re-merging onto remote"
      git fetch origin "$BRANCH" -q
      git reset --hard -q "origin/$BRANCH"
      for f in "${FILES[@]}"; do
        b="$(basename "$f")"
        is_merge_only "$f" && continue   # the reset just restored the remote's
                                         # rows — copying over them loses them
        [ -f "$SNAP/$b" ] && cp "$SNAP/$b" "$f"
      done
      python3 "$REPO_ROOT/nakshiq-autoposter/scripts/merge_jsonl.py" \
              "$WORKTREE/nakshiq-autoposter/data" "$SNAP" || true
      for f in "${FILES[@]}"; do [ -f "$f" ] && git add -- "$f"; done
      git diff --staged --quiet || git commit -q -m "chore: autoposter state $(date -u +'%Y-%m-%d %H:%M UTC') (local, retry $attempt)"
    done
    echo "[state-sync] ERROR: all 3 push attempts failed — state is committed locally in the worktree only"
    exit 1
  )
  rc=$?

  git worktree remove --force "$WORKTREE" 2>/dev/null || rm -rf "$WORKTREE"
  git worktree prune 2>/dev/null || true
  rm -rf "$SNAP"
  return $rc
}

# Put the working tree back to main's committed copies of the state files.
# CI runs in a throwaway checkout; a developer's machine does not. Without
# this, every local run leaves four tracked files permanently modified — and
# this repo has already been bitten once by a commit that swept up a shared
# file someone else was midway through (2026-08-10, stayPicks.disclosure).
# Only ever called after a SUCCESSFUL push, when the branch holds the truth
# and the local copies are disposable.
do_restore() {
  for f in "${FILES[@]}"; do
    if git ls-files --error-unmatch "$f" >/dev/null 2>&1; then
      git checkout HEAD -- "$f" 2>/dev/null || true
    else
      # Untracked on main (e.g. posted_today.jsonl) — pulled from the branch,
      # so remove it rather than leaving a stray untracked file behind.
      rm -f "$f"
    fi
  done
  say "working tree restored to main's state files"
}

case "${1:-}" in
  pull) do_pull ;;
  push) do_push ;;
  restore) do_restore ;;
  *) echo "usage: $0 pull|push|restore"; exit 2 ;;
esac
