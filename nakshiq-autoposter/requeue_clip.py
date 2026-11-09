"""Re-queue Veo shots that have no reel spec (two_months, opener): archive the clip, set its row pending.

    python3 nakshiq-autoposter/requeue_clip.py <clip.mp4> [<clip.mp4> ...]

queue_retake.py rebuilds rows from reel_specs/<storyboard>.json; place_reels storyboards have no spec, so
it cannot retake them. Here the row keeps its prompt and start frame, so the next export asks Cowork for a
fresh take of the same shot (2026-11-09: rajahmundry two_months s1 cloned a seated woman into a second
one walking in). A take made from the WRONG start frame needs nothing: intake-named.mjs refuses it.

Refuses inside the Cowork window (15:30-20:30 local). VEO_HOME points it at a copy for testing."""
import json
import os
import shutil
import sys
from datetime import datetime
from pathlib import Path

now = datetime.now()
if (15, 30) <= (now.hour, now.minute) < (20, 30) and os.environ.get("COWORK_RUN_DONE") != "1":
    sys.exit("inside the Cowork window (15:30-20:30): not touching the queue")
V = Path(os.environ.get("VEO_HOME") or Path.home() / "Automation/nakshiq-veo")
Q = V / "veo_queue.json"
raw = Q.read_text()
q = json.loads(raw)
ind = next((i for i in (2, 1) if raw.rstrip("\n") == json.dumps(q, indent=i, ensure_ascii=False)), None)
if ind is None:
    sys.exit(f"{Q} is not in a layout this script rewrites (indent 1 or 2): not touching anything")
by = {r.get("clip"): r for r in q}
bad = [c for c in sys.argv[1:] if (by.get(c) or {}).get("kind") != "shot"]
if not sys.argv[1:] or bad:
    sys.exit(f"not shot rows in the queue: {bad or 'none given'}")
D = V / f"_retake_{now:%Y-%m-%d}"
D.mkdir(exist_ok=True)
shutil.copy2(Q, D / f"veo_queue.before-requeue-{now:%H%M%S}.json")
for c in sys.argv[1:]:
    f = V / "clips" / c
    if f.exists():
        shutil.move(str(f), str(D / c))
    by[c]["status"] = "pending"
    print(f"[requeue] {c}: clip archived to {D.name}/, row pending ({by[c].get('credits')} credits)")
Q.write_text(json.dumps(q, indent=ind, ensure_ascii=False) + ("\n" if raw.endswith("\n") else ""))
