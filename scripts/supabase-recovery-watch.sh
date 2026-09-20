#!/bin/bash
# supabase-recovery-watch.sh — wait out the Supabase incident, then force the
# Vercel rebuild the repo's standing rule requires, exactly once.
#
# WHY THIS EXISTS (2026-09-20)
# ----------------------------
# Supabase's API Gateway went degraded_performance during a platform incident
# whose own status update said the fix would roll out "throughout this
# weekend". NakshIQ destination pages whose ISR cache had expired blocked on
# regeneration and never returned (3 of 8 sampled); pages with a live prerender
# served fine, so the site decays gradually as caches age.
#
# CLAUDE.md: "After any Supabase outage / 402 / freeze, force-rebuild Vercel.
# ISR caches survive the recovery." That is the action this automates, so the
# founder does not have to poll a status page all weekend.
#
# DESIGN DECISIONS, each one earned:
#
#   * TWO CONSECUTIVE HEALTHY CHECKS before rebuilding. A half-recovered
#     gateway is worse than a down one: on 2026-09-20 two Vercel builds were
#     kicked off while Supabase was flaky and BOTH failed after 12 minutes,
#     timing out prerendering /festivals/ and /vs/ pages. Rebuilding into a
#     wobble just burns build minutes and leaves Error deployments in the list.
#
#   * FIRES ONCE, THEN DISABLES ITSELF. A watcher that keeps force-rebuilding
#     every 15 minutes is a runaway deploy loop. After a successful rebuild it
#     writes a DONE marker and unloads its own LaunchAgent.
#
#   * EFFECT-LEVEL HEALTH, not just a status page. The check queries our own
#     PostgREST AND re-fetches pages that were observed hanging. status.supabase
#     .com is logged for context but never gates the decision — a green status
#     page has been wrong before, and what matters is whether OUR pages render.
#
#   * NEVER INFERS THAT THE PUSH LANDED. Checks that HEAD moved and that
#     origin matches, same as scripts/audit-commit-guard.sh.
#
# Exit 0 = nothing to do, or rebuild triggered successfully.
# Exit 1 = something needs a human.
#
# USAGE (LaunchAgent): scripts/com.ashish.supabase-recovery-watch.plist
#   Manual dry run:  bash scripts/supabase-recovery-watch.sh --dry-run

set -uo pipefail

# git in this repo authenticates via `credential.helper = !gh auth
# git-credential`, so `git push` needs `gh` on PATH even though nothing calls
# gh by name. Missing /opt/homebrew/bin broke the GA4 push for four straight
# days in August. Do not trim this.
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${REPO_ROOT}" || { echo "FATAL: cannot cd to ${REPO_ROOT}"; exit 1; }

STATE_DIR="${HOME}/.claude"
STREAK_FILE="${STATE_DIR}/nakshiq-supabase-watch.streak"
DONE_FILE="${STATE_DIR}/nakshiq-supabase-watch.done"
LABEL="com.ashish.supabase-recovery-watch"
PLIST="${HOME}/Library/LaunchAgents/${LABEL}.plist"
NEEDED_STREAK=2
DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

mkdir -p "${STATE_DIR}"
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
notify() {
  osascript -e "display notification \"$1\" with title \"NakshIQ\" subtitle \"Supabase recovery watch\"" 2>/dev/null || true
}

say "=== supabase-recovery-watch ==="

# Already done? Then this agent should not be running at all — say so and unload.
if [ -f "${DONE_FILE}" ]; then
  say "DONE marker exists ($(cat "${DONE_FILE}")) — rebuild already fired. Unloading agent."
  [ "${DRY_RUN}" -eq 0 ] && launchctl unload "${PLIST}" 2>/dev/null
  exit 0
fi

# Context only — never gates the decision.
STATUS_DESC="$(curl -s --max-time 15 https://status.supabase.com/api/v2/status.json \
  | sed -n 's/.*"description"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')"
say "supabase status page: ${STATUS_DESC:-unavailable}"

# The real check. CHECK_CMD is a test seam: the rebuild branch cannot be
# exercised by waiting for a platform incident to end, and an untested
# self-healing path is worse than none because it reads as coverage. This repo
# already has that exact scar — a heal branch nested where its own failure
# could never reach it, which sat dead for months.
CHECK_JSON="$(${CHECK_CMD:-node scripts/supabase-recovery-check.mjs} 2>/dev/null | tail -n 1)"
CHECK_RC=$?
say "check: ${CHECK_JSON:-<no output>}"

if [ "${CHECK_RC}" -ne 0 ] || [ -z "${CHECK_JSON}" ]; then
  echo 0 > "${STREAK_FILE}"
  say "still degraded — streak reset to 0. Will look again next interval."
  exit 0
fi

STREAK=$(cat "${STREAK_FILE}" 2>/dev/null || echo 0)
case "${STREAK}" in ''|*[!0-9]*) STREAK=0 ;; esac
STREAK=$((STREAK + 1))
echo "${STREAK}" > "${STREAK_FILE}"
say "healthy check #${STREAK} of ${NEEDED_STREAK} required"

if [ "${STREAK}" -lt "${NEEDED_STREAK}" ]; then
  say "waiting for one more consecutive healthy check before rebuilding."
  exit 0
fi

# ---- Recovered. Force the rebuild. ----------------------------------------
say "Supabase healthy on ${STREAK} consecutive checks — forcing Vercel rebuild."

if [ "${DRY_RUN}" -eq 1 ]; then
  say "DRY RUN: would commit --allow-empty and push to origin."
  exit 0
fi

git fetch --quiet origin || say "WARN: git fetch failed"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
# Brace-quote before any non-ASCII: bash 3.2 folds a following multibyte
# character into the variable name and `set -u` then kills the script.
git rebase --quiet "origin/${BRANCH}" 2>/dev/null || say "WARN: rebase skipped"

BEFORE="$(git rev-parse HEAD)"
git commit --quiet --allow-empty -m "chore(build): force rebuild after Supabase gateway recovery

Supabase ran a platform incident (API Gateway degraded_performance) during
which destination pages with an expired ISR cache hung on regeneration.
Per CLAUDE.md, ISR caches survive a Supabase recovery poisoned, so the
recovery is not complete until a rebuild has run.

Fired by scripts/supabase-recovery-watch.sh after ${NEEDED_STREAK} consecutive
healthy checks of both PostgREST and the previously-hanging canary pages." || {
  say "FATAL: empty commit failed"; notify "Rebuild FAILED: commit error"; exit 1; }

AFTER="$(git rev-parse HEAD)"
if [ "${BEFORE}" = "${AFTER}" ]; then
  say "FATAL: HEAD did not move; commit silently failed"
  notify "Rebuild FAILED: HEAD did not move"
  exit 1
fi

git push --quiet origin "${BRANCH}" || { say "FATAL: push failed"; notify "Rebuild FAILED: push error"; exit 1; }

git fetch --quiet origin || true
if [ "$(git rev-parse HEAD)" != "$(git rev-parse "origin/${BRANCH}")" ]; then
  say "FATAL: origin/${BRANCH} did not advance to HEAD"
  notify "Rebuild FAILED: remote did not advance"
  exit 1
fi

date '+%Y-%m-%d %H:%M:%S' > "${DONE_FILE}"
say "OK: pushed ${AFTER} — Vercel rebuild triggered. Marking done and unloading agent."
notify "Supabase recovered. Vercel rebuild triggered."
launchctl unload "${PLIST}" 2>/dev/null
exit 0
