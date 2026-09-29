#!/usr/bin/env python3
"""v3_daily.py — the daily steps of the v3 (keyframe) reel pipeline.

    python3 v3_daily.py topup     # queue every reel_specs/*.json marked "auto": true (dedupes)
    python3 v3_daily.py render    # cut EN + HI for every auto spec whose shots are all in

WHY (founder, 2026-09-28): the PAUSED file had held the whole daily job since
24 Sep, so after Triund the queue sat empty and a day of Flow credits went
unused. Lifting it would also have switched back on the v2 steps (text-only
queue top-up, v2 cuts) that caused the pause. This replaces those two steps and
nothing else.

A spec enters the daily loop only when it carries "auto": true, so an old or
parked spec (chikmagalur__sos_keyframe) is never re-queued by accident.
A cut lands in the ledger as status "review", never "ready": publish() only
posts "ready" rows, so nothing goes out until the founder has watched it.
"""
from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import reel_v3 as R  # noqa: E402

SPECS = HERE / "reel_specs"
LEDGER = Path.home() / "Automation" / "nakshiq-veo" / "data" / "reels.json"
SURFACE = {"hi": "instagram", "en": "youtube"}


def auto_specs():
    for p in sorted(SPECS.glob("*.json")):
        s = R.load(p)
        if s.get("auto") and not R.check(s):
            yield p, s


def topup() -> int:
    n = 0
    for p, s in auto_specs():
        k = R.enqueue(s)
        if k:
            print(f"[v3_daily] queued {k} row(s) for {s['id']}")
        n += k
    print(f"[v3_daily] topup: {n} new row(s)")
    return 0


def render() -> int:
    import storyboard as SB
    led = json.loads(LEDGER.read_text()) if LEDGER.exists() else {}
    made = 0
    for p, s in auto_specs():
        if not R.ready(s):
            continue
        for lang, platform in SURFACE.items():
            key = f"{s['id']}__{lang}"
            if key in led:
                continue
            out = R.VEO / "reels" / f"{key}.mp4"
            try:
                R.render(s, lang, out, None, SB.pick_music(s.get("format", ""), s["slug"]))
            except Exception as e:  # one bad cut must not stop the others
                print(f"[v3_daily] {key} failed: {e}")
                continue
            cover = None
            if s.get("cover"):
                try:
                    import reel_cover
                    cover = str(reel_cover.make(s, lang, R.VEO / "reels" / f"{key}__cover.jpg"))
                except (Exception, SystemExit) as e:   # a missing cover never blocks the reel
                    print(f"[v3_daily] {key} cover failed: {e}")
            first = [l for l in s["vo"]["en"][0].splitlines() if l.strip()]
            led[key] = {"storyboard": s["id"], "slug": s["slug"], "format": s.get("format"),
                        "status": "review", "six_beat": True, "pipeline": "v3",
                        "rendered_at": datetime.now(timezone.utc).isoformat(),
                        "caption_hook": " ".join(first[:2]), "lang": lang, "platform": platform,
                        "file": str(out), "cover": cover}
            LEDGER.write_text(json.dumps(led, ensure_ascii=False, indent=1))
            made += 1
            print(f"[v3_daily] cut {key} -> {out} (status review)")
    print(f"[v3_daily] render: {made} cut(s)")
    return 0


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    raise SystemExit({"topup": topup, "render": render}.get(cmd, lambda: print(__doc__) or 2)())
