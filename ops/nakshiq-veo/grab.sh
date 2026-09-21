#!/bin/bash
# grab.sh <save_as_name.mp4> — take the newest download*.zip from ~/Downloads,
# extract its single mp4, and place it in inbox under the exact given name.
set -uo pipefail
export PATH=/opt/homebrew/bin:/usr/local/bin:$PATH
IN=/Users/ashishtaneja/Automation/nakshiq-veo/inbox
NAME="$1"
Z=$(ls -1t ~/Downloads/download*.zip 2>/dev/null | head -1)
if [ -z "$Z" ]; then echo "MISS no zip for $NAME"; exit 1; fi
T=$(mktemp -d)
unzip -o -q "$Z" -d "$T" || { echo "MISS bad zip $NAME"; exit 1; }
F=$(ls -1 "$T"/*.mp4 2>/dev/null | head -1)
if [ -z "$F" ]; then echo "MISS no mp4 $NAME"; rm -rf "$T"; exit 1; fi
mv "$F" "$IN/$NAME"
rm -f "$Z"; rm -rf "$T"
D=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of csv=p=0 "$IN/$NAME" 2>/dev/null)
echo "OK $NAME $D"
