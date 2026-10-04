#!/bin/bash
# One-shot: let flow.google.com download files automatically in Comet (Cowork's browser).
# Comet ignores the user-level AutomaticDownloadsAllowedForUrls default (only managed
# policy counts), so the site exception is written into the profile while Comet is closed.
# Runs only overnight and only when the Mac has been idle 15+ min, so it never closes the
# browser under the founder or under Cowork (10:00). Tabs come back via --restore-last-session.
DONE="$HOME/Automation/nakshiq-veo/data/.comet-flow-allowed"
LOG="$HOME/Automation/nakshiq-veo/data/comet-allow-flow.log"
PREF="$HOME/Library/Application Support/Comet/Default/Preferences"
[ -f "$DONE" ] && exit 0
H=$(date +%H); H=${H#0}
if [ "$H" -ge 9 ] && [ "$H" -lt 22 ]; then exit 0; fi
IDLE=$(ioreg -c IOHIDSystem | awk '/HIDIdleTime/ {print int($NF/1000000000); exit}')
[ "${IDLE:-0}" -lt 900 ] && { echo "$(date) idle ${IDLE}s, waiting" >> "$LOG"; exit 0; }
WAS_RUNNING=0
if pgrep -xq Comet; then
  WAS_RUNNING=1
  osascript -e 'tell application "Comet" to quit' >/dev/null 2>&1
  for i in $(seq 1 60); do pgrep -xq Comet || break; sleep 1; done
  if pgrep -xq Comet; then echo "$(date) Comet did not quit, retry later" >> "$LOG"; exit 0; fi
fi
cp "$PREF" "$PREF.bak-flow" && /usr/bin/python3 - "$PREF" <<'PY' >> "$LOG" 2>&1
import json, sys, time
p = sys.argv[1]
d = json.load(open(p))
ex = d.setdefault("profile", {}).setdefault("content_settings", {}).setdefault("exceptions", {})
ad = ex.setdefault("automatic_downloads", {})
stamp = str(int((time.time() + 11644473600) * 1_000_000))
for site in ("https://flow.google.com:443,*", "https://labs.google:443,*"):
    ad[site] = {"last_modified": stamp, "setting": 1}
json.dump(d, open(p, "w"), separators=(",", ":"))
print("written:", sorted(ad))
PY
OK=$?
[ $WAS_RUNNING = 1 ] && open -a Comet --args --restore-last-session
sleep 20
if /usr/bin/python3 -c "import json,sys;d=json.load(open(sys.argv[1]));sys.exit(0 if 'https://flow.google.com:443,*' in d['profile']['content_settings']['exceptions']['automatic_downloads'] else 1)" "$PREF"; then
  echo "$(date) DONE: flow.google.com allowed (write ok=$OK)" >> "$LOG"; touch "$DONE"
else
  echo "$(date) FAILED: exception missing after relaunch" >> "$LOG"
fi
