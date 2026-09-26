#!/bin/bash
# queue-keyframe-stills-once.sh — ONE-SHOT for 2026-09-26 13:05 AEST.
#
# Queues the free stills (3 refs + 7 keyframes, 0 credits) of the keyframe-mode
# Chikmagalur spec and writes the task file the 10:00 Cowork run reads, so the
# 27 Sep run makes the storyboard for the founder to approve before any credit
# is spent (reel_v3.py sheet). Deferred past 13:00 because the queue and the
# task file must never change while a 10:00 Cowork run may still be reading
# them (feedback rule of 2026-09-23: 30 clips nearly orphaned). Runs as a
# LaunchAgent via /bin/bash (Full Disk Access: reads the repo under ~/Desktop
# and the task folder under ~/Documents), then removes its own plist.
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE" || exit 1
REPO="$HOME/Desktop/India Travel Planner/nakshiq-autoposter"
SPEC="$REPO/reel_specs/chikmagalur__sos_keyframe.json"
TASK="$HOME/Documents/Claude/Scheduled/nakshiq-veo-daily/SKILL.md"
LABEL="com.nakshiq.veo-kf-once"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
say() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
finish() { rm -f "$PLIST"; launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null; }

say "=== kf-once start ==="
HM=$(TZ=Australia/Sydney date +%H%M)
if [ "$HM" -lt 1300 ]; then
  say "REFUSING: ${HM} AEST is inside the 10:00-13:00 Cowork window; plist left in place"
  exit 1
fi
TC=$(python3 -c "import json;print(json.load(open('today-tasks.json')).get('total_clips',-1))" 2>/dev/null || echo -1)
if [ "$TC" != "0" ]; then
  say "REFUSING: today-tasks.json has total_clips=$TC, expected the zeroed file — not touching anything"
  finish; exit 1
fi
mkdir -p _backups
STAMP=$(date +%F-%H%M)
cp veo_queue.json "_backups/veo_queue.$STAMP.json" && cp today-tasks.json "_backups/today-tasks.$STAMP.json" || { say "backup failed"; finish; exit 1; }
restore() { cp "_backups/veo_queue.$STAMP.json" veo_queue.json; cp "_backups/today-tasks.$STAMP.json" today-tasks.json; say "restored the backups"; }

OUT=$(cd "$REPO" && python3 reel_v3.py enqueue "$SPEC" --stills-only 2>&1) || { say "enqueue failed: $OUT"; restore; finish; exit 1; }
say "$OUT"
node export-tasks.mjs || { say "export failed"; restore; finish; exit 1; }
PEND=$(python3 -c "import json;q=json.load(open('veo_queue.json'));print(sum(1 for r in q if r.get('status')=='pending'))")
CR=$(python3 -c "import json;d=json.load(open('today-tasks.json'));print(d['total_clips'],d['total_credits'])")
say "pending rows: $PEND; task file clips/credits: $CR"
if [ "$PEND" != "10" ] || [ "$CR" != "10 0" ]; then
  say "UNEXPECTED numbers (wanted 10 pending, task 10 clips / 0 credits)"; restore; finish; exit 1
fi
if cp cowork-task.SKILL.md "$TASK"; then say "Cowork task synced to $TASK"; else say "WARN could not sync the Cowork task file"; fi
osascript -e 'display notification "10 free stills queued for the 10:00 Cowork run. Approve the contact sheet after the 14:20 intake." with title "NakshIQ Veo" sound name "Ping"' >/dev/null 2>&1 || true
say "=== kf-once end (ok) ==="
finish
