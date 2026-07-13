#!/bin/bash
# One-command installer for the DAILY RADAR 12:03pm schedule (com.nakshiq.loop-radar).
# Claude staged this but is (correctly) blocked from granting itself permissions —
# running this script is YOUR approval of the scoped allowlist in
# settings-allowlist-proposed.json. Review that file first if you want.
#
#   bash ".loop/radar-install/install.sh"        (from the project root)
#
# Undo any time:
#   launchctl bootout gui/$(id -u)/com.nakshiq.loop-radar
#   rm ~/Library/LaunchAgents/com.nakshiq.loop-radar.plist
set -euo pipefail
cd "$(dirname "$0")/../.."   # project root

# 1) apply the scoped allowlist (permissions block only) to .claude/settings.local.json
python3 - <<'PY'
import json
prop = json.load(open(".loop/radar-install/settings-allowlist-proposed.json"))
path = ".claude/settings.local.json"
try:
    cur = json.load(open(path))
except FileNotFoundError:
    cur = {}
cur.setdefault("permissions", {})
have = cur["permissions"].get("allow", [])
for rule in prop["permissions"]["allow"]:
    if rule not in have:
        have.append(rule)
cur["permissions"]["allow"] = have
json.dump(cur, open(path, "w"), indent=2)
print(f"allowlist applied -> {path} ({len(have)} rules)")
PY

# 2) install + load the LaunchAgent
cp ".loop/radar-install/com.nakshiq.loop-radar.plist" "$HOME/Library/LaunchAgents/"
launchctl bootout "gui/$(id -u)/com.nakshiq.loop-radar" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$HOME/Library/LaunchAgents/com.nakshiq.loop-radar.plist"
launchctl print "gui/$(id -u)/com.nakshiq.loop-radar" | head -5
echo "DONE — the radar runs daily at 12:03pm. Logs: .loop/radar-cron.log"
