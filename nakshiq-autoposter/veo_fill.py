#!/usr/bin/env python3
"""veo_fill.py: spend the day's free Veo credits on people-free place clips, every run.

    python3 veo_fill.py                 # top the queue up to 340 video credits
    python3 veo_fill.py --dry           # say what it would queue, change nothing
    python3 veo_fill.py --target 200 --max-new 8

WHY (founder 2026-10-17): "using 350 credits which is approx 35 clips everyday for free should be
P1 and should be done everyday ... at least we have the clips". The Cowork run that day made four
free stills while 350 Veo credits sat unused. Story reels with AI people are capped at two a week by
the format rotation (place_reels.py, founder 10-15), and they need an approved script and ElevenLabs.
The place formats need neither, so the spare credits go to them and build a corpus:
  tiny_world  2 Nano Banana miniatures from a real Commons photo + 2 Veo shots, 20 credits.
              Evergreen, so it makes up most of the corpus.
  two_months  the good month and the skip month of the same real place, 20 credits. Tied to the
              coming months, so at most TWO_CAP wait unposted at a time (one posts a week).
Work already queued (retakes, cast reels, the rotation's own prepare) counts toward the target
and goes first: these rows are appended at the end of the queue.

Runs from run-veo.sh after `place_reels.py prepare`, at 09:20 and 21:00. Like place_reels it never
touches the queue 15:30-21:00 while Cowork generates, unless COWORK_RUN_DONE=1, which is only for
a day whose Cowork report already says the run finished.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import place_reels as P  # noqa: E402

TARGET = 340      # 7 Flow accounts x 50 credits, less one clip of slack
MAX_NEW = 16      # storyboards added per run (32 Veo clips): what one Cowork session has managed
TWO_CAP = 30      # two_months storyboards waiting unposted (queued or made). Was 6; raised 2026-10-20 when the
                  # founder locked the voiced place reel, whose November and skip-month scenes ARE the two_months
                  # clips: one pair per reel, one reel a day, so about a month of footage ahead.


def pending_credits(rows: list[dict]) -> int:
    return sum(int(r.get("credits") or 0) for r in rows if r.get("status") == "pending")


def taken(rows: list[dict], led: dict, suffix: str) -> set[str]:
    """Places that already have this format queued, made or posted."""
    out = {r.get("slug") for r in rows if str(r.get("storyboard", "")).endswith(suffix)}
    out |= {v.get("slug") for v in led.values() if isinstance(v, dict) and str(v.get("kind")) == suffix.strip("_")}
    out |= {p.name.split("__")[0] for p in P.CLIPS.glob(f"*{suffix}__s2.mp4")}
    return {s for s in out if s}


def waiting_two(rows: list[dict], led: dict) -> int:
    posted = {v.get("slug") for v in led.values() if isinstance(v, dict)
              and (v.get("kind") == "two_months" or v.get("voiced"))
              and v.get("status") in ("published", "unconfirmed")}
    sbs = {r["storyboard"] for r in rows if str(r.get("storyboard", "")).endswith("__two_months")}
    return sum(1 for sb in sbs if sb.split("__")[0] not in posted)


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--target", type=int, default=int(os.environ.get("VEO_DAILY_TARGET", TARGET)))
    ap.add_argument("--max-new", type=int, default=MAX_NEW)
    ap.add_argument("--dry", action="store_true")
    a = ap.parse_args(argv)
    if P._cowork_window():
        if os.environ.get("COWORK_RUN_DONE") != "1":
            print("[veo_fill] 15:30-21:00: Cowork generates off the task file; not touching the queue")
            return 0
        P._cowork_window = lambda: False   # today's Cowork report says the run is finished
    if not P.rotation_start():
        print("[veo_fill] format rotation off (no ROTATION_START): nothing to fill")
        return 0
    today = date.today()
    rows, led = P._load(P.QUEUE, []), P._load(P.LEDGER, {})
    have = pending_credits(rows)
    print(f"[veo_fill] video credits already queued: {have} of {a.target}")
    if have >= a.target:
        return 0
    pool = P.candidates("map_reveal", today)          # places with a good coming month, soonest first
    want = min((a.target - have) // 20, a.max_new)
    two_room = max(0, TWO_CAP - waiting_two(rows, led))
    # Candidates in order: the few time-bound two_months first, then evergreen tiny_world. A place
    # that refuses (no usable Commons photo) is skipped and the next one takes its turn.
    busy_two, busy_tiny = taken(rows, led, "__two_months"), taken(rows, led, "__tiny_world")
    order = ([("two_months", s) for s in pool if s not in busy_two][:two_room * 3]
             + [("tiny_world", s) for s in pool if s not in busy_tiny])
    if a.dry:
        print(f"[veo_fill] DRY wants {want} storyboard(s) (two_months room {two_room}); first in line: {order[:want + 4]}")
        return 0
    added, two_added, refused = 0, 0, []
    for fmt, slug in order:
        if added >= want:
            break
        if fmt == "two_months" and two_added >= two_room:
            continue
        try:
            n = P.queue_two(slug, today) if fmt == "two_months" else P.queue_tiny(slug)
        except P.Refuse as e:
            refused.append(f"{fmt}:{slug} ({e})")
            continue
        if n:
            added += 1
            two_added += fmt == "two_months"
            print(f"[veo_fill] {fmt}: queued {n} row(s) for {slug}")
    rows = P._load(P.QUEUE, [])
    print(f"[veo_fill] added {added} storyboard(s); video credits queued now {pending_credits(rows)} of {a.target}"
          + (f"; refused {len(refused)}: {'; '.join(refused[:6])}" if refused else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
