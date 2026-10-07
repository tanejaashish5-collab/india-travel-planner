"""clip_qa.py: catch AI-video people glitches inside a Veo clip before it is cut into a reel.

Founder 2026-10-07: the Coorg reel shipped a second copy of the mother walking in and merging
into the one already seated; an earlier reel showed the wrong number of people. qa() in the
cutter compares whole shots, so it never sees what happens INSIDE a clip.

This counts people in every clip (YOLO person detector, local, free) at a few frames a second
and flags a clip when the number of people changes and stays changed: someone appears, vanishes
or doubles mid-shot. It cannot judge whether a place is the right place; the daily visual check
does that.

    ~/Automation/nakshiq-veo/.venv-qa/bin/python clip_qa.py <storyboard> ...   # a verdict per clip
    ~/Automation/nakshiq-veo/.venv-qa/bin/python clip_qa.py --all-ready        # every v3 row status ready

Tested 2026-10-07 on 24 clips: flagged 4 real glitches (Coorg ghost mother, Udaipur parents
vanishing, Gangtok hands+phone vanishing, Katra cards) and 2 hand close-ups that were fine.
Exit code 1 when any clip is flagged.
"""
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
VEO = Path.home() / "Automation" / "nakshiq-veo"
CLIPS = VEO / "clips"
LEDGER = VEO / "data" / "reels.json"
# Runs in its own Python 3.12 venv (torch has no 3.14 build):
#   uv venv --python 3.12 ~/Automation/nakshiq-veo/.venv-qa && uv pip install --python ~/Automation/nakshiq-veo/.venv-qa/bin/python ultralytics
PY = VEO / ".venv-qa" / "bin" / "python"
FPS = 3          # samples a second
HOLD = 4         # a count must hold this many samples in a row (1.3 s) to count as real
CONF = 0.35

_model = None


def _yolo():
    global _model
    if _model is None:
        from ultralytics import YOLO
        _model = YOLO(str(VEO / ".venv-qa" / "yolo11s.pt"))   # weights live outside the public repo
    return _model


def counts(clip: Path) -> list[int]:
    with tempfile.TemporaryDirectory() as td:
        subprocess.run(["ffmpeg", "-v", "error", "-i", str(clip), "-vf", f"fps={FPS},scale=540:-2",
                        f"{td}/f%03d.jpg"], check=True)
        frames = sorted(Path(td).glob("f*.jpg"))
        res = _yolo().predict([str(f) for f in frames], classes=[0], conf=CONF, verbose=False)
        return [len(r.boxes) for r in res]


def stable_runs(seq: list[int]) -> list[tuple[int, int, int]]:
    """(count, start_index, length) for every run of the same count lasting >= HOLD samples."""
    runs, i = [], 0
    while i < len(seq):
        j = i
        while j < len(seq) and seq[j] == seq[i]:
            j += 1
        if j - i >= HOLD:
            runs.append((seq[i], i, j - i))
        i = j
    return runs


def verdict(seq: list[int], static: bool, cast: int | None) -> str:
    """Static shot: any lasting change in the head count is a glitch (nobody is meant to come or go).
    Moving shot: people may leave the frame as the camera moves, so only an APPEARANCE counts:
    more people than the shot opened with, or more than the cast has."""
    runs = stable_runs(seq)
    if not runs:
        return ""
    t = lambda idx: f"{idx / FPS:.1f}s"
    first, firstidx = runs[0][0], runs[0][1]
    if cast is not None:
        over = next((r for r in runs if r[0] > cast), None)
        if over:
            return f"{over[0]} people from {t(over[1])}, the cast has {cast}"
    for c, i, _ in runs[1:]:
        if static and c != first:
            return f"camera holds still but people go {first} -> {c} at {t(i)}"
        if not static and c > first:
            return f"people appear mid-shot {first} -> {c} at {t(i)}"
    return ""


def _shot_info(storyboard: str) -> dict[str, tuple[bool, int | None]]:
    """shot id -> (camera holds still?, people in the cast). From the reel spec when it exists."""
    spec = HERE / "reel_specs" / f"{storyboard}.json"
    if not spec.exists():
        return {}
    d = json.loads(spec.read_text())
    cast = d.get("cast")
    n = len(cast) if isinstance(cast, list) else (len(cast) if isinstance(cast, dict) else None)
    return {s["id"]: ("holds still" in (s.get("prompt") or "").lower(), n) for s in d.get("shots", [])}


def check(storyboard: str) -> list[tuple[str, str, list[int]]]:
    out, info = [], _shot_info(storyboard)
    for clip in sorted(CLIPS.glob(f"{storyboard}__s[0-9].mp4")):
        static, cast = info.get(clip.stem.rsplit("__", 1)[1], (False, None))
        seq = counts(clip)
        out.append((clip.stem, verdict(seq, static, cast), seq))
    return out


def main(argv: list[str]) -> int:
    if argv and argv[0] == "--all-ready":
        led = json.loads(LEDGER.read_text())
        sbs = sorted({v["storyboard"] for v in led.values() if v.get("pipeline") == "v3" and v.get("status") == "ready"})
    else:
        sbs = argv
    bad = 0
    for sb in sbs:
        for stem, why, seq in check(sb):
            print(f"{'FLAG' if why else 'ok  '} {stem}: {why or 'people steady'}  {''.join(map(str, seq))}")
            bad += bool(why)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
