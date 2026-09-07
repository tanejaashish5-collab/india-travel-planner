#!/bin/bash
# Resume the Jeff Su / Sirio transcript grind if it is not already running and
# transcripts are still missing. Safe to run repeatedly; no-ops when complete.
#
# PATH must cover the tools' tools, not just what we call by name — git here
# authenticates via `!gh auth git-credential`, and cron's default PATH lacks
# /opt/homebrew/bin. (Documented scar, 2026-08-26.)
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$HOME/bin:/Library/Frameworks/Python.framework/Versions/3.14/bin"
REPO="/Users/ashishtaneja/Desktop/India Travel Planner"
cd "$REPO" || exit 1

LOG="$HOME/.claude/transcript-grind-run.log"

# A running process is only a reason to skip if it is getting somewhere.
#
# On 2026-09-07 a grind sat for three hours making zero progress against a hard
# IP block, and this guard faithfully reported "already running, skip" every two
# hours, so nothing ever replaced it. Liveness is not progress: judge it by
# whether transcripts are appearing, and stop anything that has produced nothing
# for half an hour.
PID=$(pgrep -f "_tmp-transcript-grind.py" | head -1)
if [ -n "$PID" ]; then
  LAST=$(find "$REPO/.scrapes/youtube" -name transcript-prose.txt -newermt '30 minutes ago' 2>/dev/null | head -1)
  if [ -n "$LAST" ]; then
    echo "[$(date '+%F %T')] grind running and producing transcripts, leaving it alone"
    exit 0
  fi
  echo "[$(date '+%F %T')] grind pid $PID has produced nothing for 30 min — stopping it and starting fresh"
  kill "$PID" 2>/dev/null
  sleep 3
fi

REMAIN=$(python3 - <<'PY'
import json,os
n=0
for c in ['sirio','jeffsu']:
    p=f".scrapes/youtube/_catalogs/{c}-raw.json"
    if not os.path.exists(p): continue
    for x in json.load(open(p))['entries']:
        f=f".scrapes/youtube/yt-{x['id']}/transcript-prose.txt"
        if not (os.path.exists(f) and os.path.getsize(f)>200): n+=1
print(n)
PY
)
if [ "$REMAIN" -eq 0 ]; then echo "[$(date '+%F %T')] all transcripts present — nothing to do"; exit 0; fi

echo "[$(date '+%F %T')] resuming grind, $REMAIN transcripts missing"
# Log to a stable path. The 2026-09-07 run wrote to a Claude session scratchpad
# under /private/tmp, which is per-session and effectively invisible: the grind
# looked silent for three hours while its real log sat somewhere nobody would
# look.
nohup python3 scripts/_tmp-transcript-grind.py \
  .scrapes/youtube/_catalogs/sirio-raw.json \
  .scrapes/youtube/_catalogs/jeffsu-raw.json >> "$LOG" 2>&1 &
echo "[$(date '+%F %T')] started pid $!"
