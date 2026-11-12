"""Re-queue Veo shots that have no reel spec (two_months, opener): archive the clip, set its row pending.

    python3 nakshiq-autoposter/requeue_clip.py [--still | --photo] <clip.mp4> [<clip.mp4> ...]

queue_retake.py rebuilds rows from reel_specs/<storyboard>.json; place_reels storyboards have no spec, so
it cannot retake them. Here the row keeps its prompt and start frame, so the next export asks Cowork for a
fresh take of the same shot (2026-11-09: rajahmundry two_months s1 cloned a seated woman into a second
one walking in). A take made from the WRONG start frame needs nothing: intake-named.mjs refuses it.

--still also re-makes the shot's start still (free): the still is archived and its row goes pending, so
Cowork draws it again before the video. For an opener, both prompts are refreshed from
place_reels.opener_prompts, because the fault is in the old wording (2026-11-10: "extend the frame" let
Flow invent a palace and a bus-filled square over Alwar's forested sanctuary hillside).

--photo (implies --still) also re-picks the place's Commons photo first, for a clip built from a photo
that is not the place as it looks now (2026-11-12: an 1885 engraved map of Barren Island, a 1967
painting of Bharatpur). Add the bad title to guide_photo_reject.json before running it.

Every re-queued row also swaps a retired motion line for its replacement (place_reels.RETIRED_MOTION:
2026-11-12 "Heat haze shimmers" drew smoke plumes and swirling rings into most heat clips).

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
args = sys.argv[1:]
photo = "--photo" in args
still = photo or "--still" in args
clips = [a for a in args if a not in ("--still", "--photo")]
V = Path(os.environ.get("VEO_HOME") or Path.home() / "Automation/nakshiq-veo")
Q = V / "veo_queue.json"
raw = Q.read_text()
q = json.loads(raw)
ind = next((i for i in (2, 1) if raw.rstrip("\n") == json.dumps(q, indent=i, ensure_ascii=False)), None)
if ind is None:
    sys.exit(f"{Q} is not in a layout this script rewrites (indent 1 or 2): not touching anything")
by = {r.get("clip"): r for r in q}
bad = [c for c in clips if (by.get(c) or {}).get("kind") != "shot"]
if still:
    bad += [c for c in clips if c not in bad and (by.get((by[c].get("start_frame") or "")) or {}).get("kind") != "keyframe"]
if not clips or bad:
    sys.exit(f"not shot rows (or, with --still, no keyframe start still) in the queue: {bad or 'none given'}")
D = V / f"_retake_{now:%Y-%m-%d}"
D.mkdir(exist_ok=True)
sys.path.insert(0, str(Path(__file__).resolve().parent))
import place_reels  # noqa: E402
if os.environ.get("VEO_HOME"):    # a test copy: keep place_reels' photo and clip writes inside it too
    place_reels.CLIPS, place_reels.PHOTOS = V / "clips", V / "data" / "place_photos"

if photo:    # pick every new photo BEFORE touching anything, so a place with no usable photo changes nothing
    picked, lost = set(), []
    for c in clips:
        sb, slug = by[c]["storyboard"], by[c]["slug"]
        if sb in picked:
            continue
        old = [place_reels.PHOTOS / slug / "ref.jpg", place_reels.PHOTOS / slug / "ref.json",
               V / "clips" / f"{sb}__photo.jpg", V / "clips" / f"{sb}__photo.json"]
        keep = D / f"_photo_{sb}"
        keep.mkdir(exist_ok=True)
        for f in old:
            if f.exists():
                shutil.move(str(f), str(keep / f.name))
        try:
            place_reels._photo_ref(sb, slug)
            picked.add(sb)
            print(f"[requeue] {sb}: new photo {(place_reels.ref_photo(slug) or {}).get('title')}")
        except place_reels.Refuse as e:
            for f in old:    # put the old photo back; this storyboard stays as it was
                if (keep / f.name).exists():
                    shutil.move(str(keep / f.name), str(f))
            lost.append(sb)
            print(f"[requeue] {sb}: NOT re-made, {e}")
    clips = [c for c in clips if by[c]["storyboard"] not in lost]
    if not clips:
        sys.exit("no storyboard got a new photo: queue untouched")
shutil.copy2(Q, D / f"veo_queue.before-requeue-{now:%H%M%S}.json")


def archive(name: str) -> None:
    f = V / "clips" / name
    if f.exists():
        shutil.move(str(f), str(D / name))


for c in clips:
    row = by[c]
    archive(c)
    row["status"] = "pending"
    note = f"row pending ({row.get('credits')} credits)"
    for old, new in place_reels.RETIRED_MOTION.items():
        if old in (row.get("prompt") or ""):
            row["prompt"] = row["prompt"].replace(old, new)
            note += ", motion line replaced"
    if still:
        kf = by[row["start_frame"]]
        archive(kf["clip"])
        kf["status"] = "pending"
        note += f"; still {kf['clip']} archived, pending (0 credits)"
        if str(row.get("storyboard", "")).endswith("__opener"):
            kf["prompt"], row["prompt"], row["crowd"] = place_reels.opener_prompts(row["slug"], now.date())
            note += ", prompts refreshed"
    print(f"[requeue] {c}: clip archived to {D.name}/, {note}")
Q.write_text(json.dumps(q, indent=ind, ensure_ascii=False) + ("\n" if raw.endswith("\n") else ""))
