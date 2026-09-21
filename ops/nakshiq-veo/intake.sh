#!/bin/bash
# intake.sh — run after generating clips by hand in Flow.
#
# Takes whatever landed in ~/Downloads, names it by beat, and ships it to R2.
# Generation is the only manual step; this is everything after it.
#
#   bash ~/Automation/nakshiq-veo/intake.sh --dry   # show the pairing, change nothing
#   bash ~/Automation/nakshiq-veo/intake.sh         # do it
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE" || exit 1
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

node intake-manual.mjs "$@" || { say "intake failed"; exit 1; }
case " $* " in *" --dry "*) exit 0;; esac

node collect-clips.mjs || say "WARN collect failed"

# R2 credentials reach the uploader through node --env-file only (standing rule:
# this script never reads or echoes the env file).
ENVF="$HOME/Desktop/India Travel Planner/apps/web/.env.local"
if [ -f "$ENVF" ]; then
  node --env-file="$ENVF" upload-clips.mjs || say "WARN upload failed"
else
  say "WARN no env file — clips stay local, not on R2"
fi

say "clips on disk: $(ls -1 clips/*.mp4 2>/dev/null | wc -l | tr -d ' ')"
