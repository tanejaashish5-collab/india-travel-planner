#!/bin/bash
# mirror.sh — copy this directory into the repo, and REFUSE if it would publish
# an account address.
#
# `india-travel-planner` is a PUBLIC GitHub repo. On 2026-09-21 a hand-sanitised
# README in the mirror was silently overwritten by the live one, and four Google
# account names reached that public repo. The sanitising was correct and it STILL
# failed, because it lived in a step a human had to remember. So it lives here
# now: the scan runs on every mirror and a hit stops the mirror dead.
#
# A rule in a prompt is a suggestion. A rule in the tool layer is a restriction.
#
# The forbidden names are READ FROM accounts.json at runtime and never written
# into this file — a guard that hardcodes the secrets it guards is itself a leak
# (this script's first version tripped its own check, which is how that was
# caught). accounts.json is never mirrored.
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$HOME/Desktop/India Travel Planner"
DEST="$REPO/ops/nakshiq-veo"

[ -d "$REPO/.git" ] || { echo "[mirror] repo not found at $REPO"; exit 1; }
mkdir -p "$DEST"

rsync -a --delete \
  --exclude 'profile/' --exclude 'downloads/' --exclude 'clips/' --exclude 'inbox/' --exclude 'data/' \
  --exclude 'node_modules/' --exclude 'veo_queue.json' --exclude 'generated.json' \
  --exclude 'accounts.json' --exclude 'today-tasks.json' --exclude 'reels/' \
  "$HERE/" "$DEST/"

# Any address-shaped string, plus every local-part on the live roster.
# Any address-shaped string, plus the explicit never_publish list. Local-parts
# are NOT derived from the emails: doing that put "nakshiq" in the pattern and
# matched every file in the directory, which is a guard nobody would keep.
PAT='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
if [ -f "$HERE/accounts.json" ]; then
  EXTRA=$(python3 -c "
import json,sys,re
d=json.load(open(sys.argv[1]))
print('|'.join(re.escape(x) for x in d.get('never_publish',[]) if x))" "$HERE/accounts.json" 2>/dev/null || true)
  [ -n "${EXTRA:-}" ] && PAT="$PAT|$EXTRA"
fi

if grep -rIn -E "$PAT" "$DEST" \
     --exclude='package-lock.json' --exclude='*.lock' \
   | grep -v 'noreply@anthropic\.com' ; then
  echo
  echo "[mirror] REFUSING: the lines above would publish an account address to a PUBLIC repo."
  echo "[mirror] Fix the LIVE copy under ~/Automation/nakshiq-veo/, then mirror again."
  exit 1
fi

echo "[mirror] clean — $DEST updated, nothing identifying in it"
