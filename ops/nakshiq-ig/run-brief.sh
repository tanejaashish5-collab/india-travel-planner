#!/bin/bash
# Wrapper for com.nakshiq.ig-brief.
#
# Why a wrapper and not an inline command: the plist first used
#   node daily-brief.mjs || /opt/homebrew/bin/node daily-brief.mjs
# where the `||` was meant as "if that node binary is missing, try the other".
# It actually meant "if the JOB FAILS, run the whole job again" — so the
# fail-loud path (0 handles verified) silently triggered a second full run.
# Pick the interpreter first, then run it exactly once.
set -uo pipefail

# PATH must cover the tools' tools, not just what we call by name (2026-08-26 scar).
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$HOME/bin"

cd /Users/ashishtaneja/Automation/nakshiq-ig || exit 1

NODE=""
for c in /usr/local/bin/node /opt/homebrew/bin/node "$(command -v node 2>/dev/null)"; do
  if [ -n "$c" ] && [ -x "$c" ]; then NODE="$c"; break; fi
done
if [ -z "$NODE" ]; then
  echo "$(date -u +%FT%TZ)  FATAL: no node binary found on PATH" >&2
  exit 127
fi

"$NODE" daily-brief.mjs
status=$?
echo "$(date -u +%FT%TZ)  run-brief exit=$status (node=$NODE)"
exit $status
