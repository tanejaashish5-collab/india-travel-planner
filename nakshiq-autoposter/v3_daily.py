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
A cut lands in the ledger as "ready" and publish() posts it in the next slot
(founder, 2026-09-29: "switch the pipeline to auto-publish every reel that
passes the check"). The check is qa(): a cut missing its audio or video,
running outside 15-60s, or showing the same picture in two beats (look_alike,
added 2026-10-01 after Kodaikanal), lands as "review" instead, with the reason
in "held".
Touch HOLD_FOR_REVIEW (next to this file) to send every new cut to "review"
again; delete it to go back to auto-publish.
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
HOLD = HERE / "HOLD_FOR_REVIEW"


def qa(path: Path) -> str:
    """Return why this cut must not auto-publish, or "" when it may."""
    import subprocess
    if not path.exists() or path.stat().st_size < 500_000:
        return "file missing or under 0.5 MB"
    try:
        out = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                              "stream=codec_type:format=duration", "-of", "json", str(path)],
                             capture_output=True, text=True, timeout=60).stdout
        info = json.loads(out)
    except Exception as e:  # noqa: BLE001
        return f"ffprobe failed: {e}"
    kinds = {st.get("codec_type") for st in info.get("streams", [])}
    if not {"video", "audio"} <= kinds:
        return f"streams {sorted(kinds)}, need video + audio"
    dur = float(info.get("format", {}).get("duration") or 0)
    if not 15 <= dur <= 60:
        return f"duration {dur:.1f}s outside 15-60s"
    # The same picture twice (Kodaikanal 2026-10-01: beats 1 and 3 were one
    # desk, one pose, 15 s of the opening). Fails closed: no beat map, no publish.
    try:
        same = R.look_alike(path)
    except Exception as e:  # noqa: BLE001
        return f"repeated-shot check could not run: {e}"
    if same:
        i, j, v = same[0]
        return (f"beats {i + 1} and {j + 1} look like the same shot ({v:.2f} >= {R.SAME_SHOT}); "
                "give one a zoom/focus in the spec, or regenerate it")
    return ""


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


def yt_title(s: dict) -> str | None:
    """The YouTube title: the spec's "yt_title", else the cover hook (the line
    written to open a question), never the bare "<Place> | NakshIQ" default."""
    if s.get("yt_title"):
        return s["yt_title"]
    hook = " ".join((s.get("cover") or {}).get("hook", "").replace("*", "").replace("|", " ").split())
    return f"{hook} | NakshIQ" if hook else None


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
                    cover = str(reel_cover.make(s, R.VEO / "reels" / f"{s['id']}__cover.jpg"))  # English, both cuts
                except (Exception, SystemExit) as e:   # a missing cover never blocks the reel
                    print(f"[v3_daily] {key} cover failed: {e}")
            first = [l for l in s["vo"]["en"][0].splitlines() if l.strip()]
            held = "HOLD_FOR_REVIEW file present" if HOLD.exists() else qa(out)
            led[key] = {"storyboard": s["id"], "slug": s["slug"], "format": s.get("format"),
                        "status": "review" if held else "ready", "six_beat": True, "pipeline": "v3",
                        "rendered_at": datetime.now(timezone.utc).isoformat(),
                        "caption_hook": " ".join(first[:2]), "lang": lang, "platform": platform,
                        "file": str(out), "cover": cover}
            if held:
                led[key]["held"] = held
            if platform == "youtube" and yt_title(s):
                led[key]["yt_title"] = yt_title(s)
            LEDGER.write_text(json.dumps(led, ensure_ascii=False, indent=1))
            made += 1
            print(f"[v3_daily] cut {key} -> {out} (status {led[key]['status']}{': ' + held if held else ''})")
    print(f"[v3_daily] render: {made} cut(s)")
    return 0


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    raise SystemExit({"topup": topup, "render": render}.get(cmd, lambda: print(__doc__) or 2)())
