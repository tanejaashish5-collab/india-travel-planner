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


def _fmt(path: Path):
    """Load JSON and the layout it was written in, so the rewrite is a minimal diff. The ledger is
    indent 1 or 2 depending on which job wrote it last (v3_daily writes 1); asserting one layout
    after the queue was already written left a half-done retake (2026-10-18)."""
    raw = path.read_text()
    obj = json.loads(raw)
    for ind in (2, 1):
        s = json.dumps(obj, indent=ind, ensure_ascii=False)
        if raw in (s, s + "\n"):
            return obj, ind, raw.endswith("\n")
    sys.exit(f"{path} is not in a layout this script rewrites (indent 1 or 2): not touching anything")


def _dump(path: Path, obj, ind: int, nl: bool) -> None:
    path.write_text(json.dumps(obj, indent=ind, ensure_ascii=False) + ("\n" if nl else ""))


Q = V / "veo_queue.json"
P = V / "data/reels.json"
q, q_ind, q_nl = _fmt(Q)
L, l_ind, l_nl = _fmt(P)      # both checked before anything is written or moved
D = V / f"_retake_{now:%Y-%m-%d}"
D.mkdir(exist_ok=True)
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
_dump(Q, q, q_ind, q_nl)
shutil.copy2(P, D / f"reels.before-{sb}.json")
ren = {f"{sb}__{lang}": f"{sb}__{lang}__held_{now:%Y-%m-%d}" for lang in ("hi", "en")
       if L.get(f"{sb}__{lang}", {}).get("status") == "review"}
L = {ren.get(k, k): v for k, v in L.items()}
_dump(P, L, l_ind, l_nl)
print(f"{sb}: reset {len(redo)} rows, added {added}, archived {moved} files, renamed {list(ren.values())}")
