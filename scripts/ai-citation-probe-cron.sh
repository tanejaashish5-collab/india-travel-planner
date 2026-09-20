#!/bin/bash
# ai-citation-probe-cron.sh — run the AI Overview citation probe AND get its
# output committed.
#
# WHY THIS EXISTS (2026-09-20)
# ----------------------------
# Same wiring as scripts/ga4-audit-cron.sh, for the same reason: a script that
# writes a dated audit file and stops is invisible when it fails. The GA4 half
# of this repo lost four days that way before it was wrapped. This one is
# wrapped on day one instead of after the incident.
#
# MUST BE A LaunchAgent, NOT cron — two independent reasons:
#   1. `gh` keeps its token in the macOS login keychain. cron runs outside the
#      Aqua session, cannot unlock it, and so cannot `git push` (proven both
#      directions on 2026-09-09/10 — see CLAUDE.md).
#   2. Google captchas headless Chromium, so the probe runs HEADFUL and needs a
#      real logged-in window server.
#
# Exit codes: 0 = probe ran and the repo is in sync. Non-zero = needs a human.
#
# USAGE (LaunchAgent): see scripts/com.ashish.ai-citation.plist

set -uo pipefail

# PATH must cover the tools our tools reach for. git in this repo authenticates
# through `credential.helper = !gh auth git-credential`, so `git push` needs
# `gh` on PATH even though nothing calls gh by name. Omitting /opt/homebrew/bin
# broke the GA4 push on four consecutive days (2026-08-23 → 08-26). Do not trim.
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${REPO_ROOT}" || { echo "FATAL: cannot cd to ${REPO_ROOT}"; exit 1; }

echo "=== ai-citation-probe $(date '+%Y-%m-%d %H:%M:%S') ==="

# 1. Run the probe. A non-zero exit means EVERY probe was blocked/errored; the
#    script already refuses to write that up as a citation loss. Keep going so
#    any previously-stranded commits still get pushed below, but remember it.
PROBE_RC=0
node scripts/ai-overview-citation-probe.mjs --limit 20 || PROBE_RC=$?
if [ "${PROBE_RC}" -ne 0 ]; then
  echo "WARN: probe exited ${PROBE_RC} (likely all probes blocked). Continuing to the git step."
fi

# 2. Rebase onto origin first. Cloud routines push to main on their own
#    schedule, and a push from a behind-local is rejected.
git fetch --quiet origin || echo "WARN: git fetch failed"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
# NOTE: always brace-quote a var followed by a non-ASCII char — bash 3.2 folds
# the multibyte character into the variable name and `set -u` kills the script.
git rebase --quiet "origin/${BRANCH}" 2>/dev/null || echo "WARN: rebase skipped/failed; continuing"

# 3. Commit EVERY uncommitted citation file, not just today's, so one good run
#    heals any number of missed days.
# NOTE: a plain read loop, NOT `mapfile`. macOS ships bash 3.2 (verified
# 3.2.57 on this machine) and the plist invokes /bin/bash, where `mapfile` is
# simply "command not found" — this would have failed silently every Monday.
# `bash -n` does not catch it; only running it does. Same family of trap as the
# bash-3.2 multibyte-variable-name scar in CLAUDE.md.
PENDING=()
while IFS= read -r f; do
  [ -n "$f" ] && PENDING+=("$f")
done < <(git status --porcelain -- 'gsc-audits/ai-citation-*' | awk '{print $2}')

if [ "${#PENDING[@]}" -gt 0 ]; then
  echo "committing ${#PENDING[@]} citation file(s): ${PENDING[*]}"
  bash scripts/audit-commit-guard.sh -m "measure(aio): AI Overview citation probe $(date '+%Y-%m-%d')" "${PENDING[@]}" || {
    echo "FATAL: audit-commit-guard failed"; exit 1; }
else
  echo "no uncommitted citation files"
fi

# 4. Push anything previously stranded. This runs UNCONDITIONALLY: a guard run
#    that commits and then fails to push leaves the file committed, so the
#    "uncommitted files" scan above would never find it again. The GA4 script
#    had this exact heal branch nested inside the no-op case, where the failure
#    it existed to heal could never reach it.
UNPUSHED="$(git log --oneline "origin/${BRANCH}..HEAD" 2>/dev/null | wc -l | tr -d ' ')"
if [ "${UNPUSHED}" != "0" ]; then
  echo "pushing ${UNPUSHED} unpushed commit(s)"
  git push origin "${BRANCH}" || { echo "FATAL: push failed"; exit 1; }
fi

# 5. Verify the remote actually moved rather than assuming it.
git fetch --quiet origin || true
if [ "$(git rev-parse HEAD)" != "$(git rev-parse "origin/${BRANCH}")" ]; then
  echo "FATAL: HEAD and origin/${BRANCH} still differ after push"
  exit 1
fi

echo "OK: repo in sync with origin/${BRANCH}"
exit "${PROBE_RC}"
