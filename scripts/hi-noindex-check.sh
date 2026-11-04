#!/bin/bash
# hi-noindex-check.sh: LaunchAgent wrapper for scripts/hi-noindex-check.mjs.
# Weekly click check until 16 Dec 2026, then the one 6-week read, committed through
# the audit guard. A LaunchAgent via /bin/bash because the GSC secrets are local-only
# and launchd has the keychain for git push. Removes itself after the final read.
# The body is a brace group so a mid-run edit cannot corrupt the tail of the job.
{
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT" || { echo "FATAL: cannot cd to $REPO_ROOT"; exit 1; }
STATE="$HOME/Automation/hi-noindex-check"
RUN=(node --no-warnings --env-file=apps/web/.env.local scripts/hi-noindex-check.mjs)
if [ "$(date +%Y%m%d)" -lt 20261216 ]; then
  "${RUN[@]}" watch
  exit $?
fi
[ -f "$STATE/.final-done" ] && exit 0
"${RUN[@]}" final || exit 1
TODAY="$(date +%Y-%m-%d)"
bash scripts/audit-commit-guard.sh -m "measure(seo): Hindi noindex 6-week read $TODAY" \
  "gsc-audits/hi-noindex-recheck-$TODAY.md" "gsc-audits/hi-noindex-recheck-$TODAY.tsv" || exit 1
touch "$STATE/.final-done"
launchctl bootout "gui/$(id -u)/com.nakshiq.hi-noindex-check"
exit 0
}
