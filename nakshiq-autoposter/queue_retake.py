"""Queue a v3 retake: archive the old stills/clips, reset their queue rows to the spec's
fresh rows (status pending), insert any NEW refs right after the spec's previous ref,
rename the storyboard's held ledger rows so render cuts fresh ones.

    python3 nakshiq-autoposter/queue_retake.py <storyboard> <name> [<name> ...]
    names are spec keys: ref_x / kf_sN / sN (new refs are found automatically)

Refuses inside the Cowork window (15:30-20:30 local)."""
import json
import shutil
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import os  # noqa: E402
import reel_v3 as R  # noqa: E402

now = datetime.now()
if (15, 30) <= (now.hour, now.minute) < (20, 30) and os.environ.get("COWORK_RUN_DONE") != "1":
    sys.exit("inside the Cowork window (15:30-20:30): not touching the queue "
             "(set COWORK_RUN_DONE=1 only when today's Cowork report says the run is complete)")
sb, names = sys.argv[1], sys.argv[2:]
V = Path.home() / "Automation/nakshiq-veo"
D = V / f"_retake_{now:%Y-%m-%d}"
D.mkdir(exist_ok=True)
Q = V / "veo_queue.json"
raw = Q.read_text()
q = json.loads(raw)
assert json.dumps(q, indent=2, ensure_ascii=False) == raw, "queue not canonical"
shutil.copy2(Q, D / f"veo_queue.before-{sb}.json")
spec = R.load(Path(__file__).resolve().parent / "reel_specs" / f"{sb}.json")
rows = R.queue_rows(spec)
want = {r["clip"]: r for r in rows}
idx = {r.get("clip"): i for i, r in enumerate(q)}
redo = [R.clip_name(spec, n) for n in names]
missing = [c for c in redo if c not in idx]
assert not missing, f"not in queue: {missing}"
for c in redo:
    q[idx[c]] = dict(want[c])
# new rows (e.g. a new ref): insert after the last existing row of this storyboard of the same kind
added = []
for r in rows:
    if r["clip"] in idx:
        continue
    same = [i for i, x in enumerate(q) if x.get("storyboard") == sb and x.get("kind") == r["kind"]]
    pos = (max(same) + 1) if same else len(q)
    q.insert(pos, dict(r))
    added.append(r["clip"])
moved = 0
for c in redo:
    f = V / "clips" / c
    if f.exists():
        shutil.move(str(f), str(D / c))
        moved += 1
Q.write_text(json.dumps(q, indent=2, ensure_ascii=False))
P = V / "data/reels.json"
lraw = P.read_text()
L = json.loads(lraw)
assert json.dumps(L, indent=2, ensure_ascii=False) == lraw
shutil.copy2(P, D / f"reels.before-{sb}.json")
ren = {f"{sb}__{lang}": f"{sb}__{lang}__held_{now:%Y-%m-%d}" for lang in ("hi", "en")
       if L.get(f"{sb}__{lang}", {}).get("status") == "review"}
L = {ren.get(k, k): v for k, v in L.items()}
P.write_text(json.dumps(L, indent=2, ensure_ascii=False))
print(f"{sb}: reset {len(redo)} rows, added {added}, archived {moved} files, renamed {list(ren.values())}")
