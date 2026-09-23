#!/usr/bin/env python3
"""render_storyboard.py — cut ONE reel from a storyboard whose clips are on R2.

`build()` has taken a `storyboard=` argument since the 2026-09-20 rebuild, but
nothing wired it to a command line, so the multi-shot path had never actually
been driven end to end against real generated footage. This is that driver.

It rebuilds the storyboard from the SAME inputs build-queue.py used (the cached
verdict pack plus live intel), so the beats, and therefore the clip filenames,
come out identical to the ones that were generated. Nothing is stored between
the two steps except the filenames themselves, which is the whole point of the
naming contract.

    python3 render_storyboard.py --slug achabal --format sos_rescue
"""
from __future__ import annotations

import argparse
import os
import json
import sys
import urllib.request
from datetime import date
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import storyboard as SB              # noqa: E402
from yt_shorts_v2 import build       # noqa: E402

PACK = Path.home() / "Automation" / "nakshiq-ig" / "data" / "verdicts.json"
# The lighter formats' facts. Must be the SAME snapshot build-queue.py used, or a
# rebuilt storyboard would say different numbers from the clips it is cutting.
REEL_DATA = Path.home() / "Automation" / "nakshiq-veo" / "data" / "reel-data.json"


def _pretty_state(state_id: str) -> str:
    if not state_id:
        return ""
    small = {"and", "of", "the"}
    fix = {"jammu-kashmir": "Jammu and Kashmir",
           "andaman-nicobar": "the Andaman and Nicobar Islands",
           "dadra-nagar-haveli": "Dadra and Nagar Haveli",
           "daman-diu": "Daman and Diu",
           "jammu-and-kashmir": "Jammu and Kashmir"}
    if state_id in fix:
        return fix[state_id]
    return " ".join(w if w in small else w.capitalize()
                    for w in state_id.replace("_", "-").split("-"))


def load_dest(slug: str, month: int) -> tuple[dict, dict]:
    rows = json.loads(PACK.read_text())
    months, name, state, state_id = {}, None, "", ""
    for r in rows:
        if r.get("id") != slug or not isinstance(r.get("score"), int):
            continue
        name = r["name"]
        state = _pretty_state(r.get("state_id"))
        state_id = r.get("state_id") or ""
        months[r["month"]] = {"score": r["score"], "label": r.get("label"),
                              "sentence": r.get("sentence") or ""}
    if not name:
        sys.exit(f"{slug} not in the verdict pack")

    live = {}
    url = ("https://www.nakshiq.com/api/content?type=destinations"
           f"&month={month}&min_score=0&limit=400&include_intel=1")
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            for d in json.loads(r.read().decode()).get("data", []):
                if d.get("id") == slug:
                    live = d
                    break
    except Exception as e:
        print(f"[render] intel unavailable ({type(e).__name__}) — "
              f"a scenario format will refuse rather than invent")

    try:
        reel = json.loads(REEL_DATA.read_text())
    except Exception:
        reel = {}
    # full-year verdicts, exactly as build-queue.py merges them
    for m, v in (reel.get("months", {}).get(slug) or {}).items():
        months.setdefault(int(m), {"sentence": ""}).update(
            {"score": v.get("score"), "label": v.get("label")})

    dest = {"id": slug, "name": name, "state": state, "state_id": state_id,
            "treks": reel.get("treks", {}).get(slug),
            "crowd": reel.get("crowd", {}).get(slug),
            "costs": reel.get("costs", {}).get(slug),
            "score": months.get(month, {}).get("score"),
            "note": months.get(month, {}).get("sentence"),
            "intel": live.get("intel") or {},
            "hero_dish": live.get("hero_dish"),
            "eatery_name": live.get("eatery_name"),
            "elevation_m": live.get("elevation_m")}
    return dest, months


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug", required=True)
    ap.add_argument("--format", required=True, choices=sorted(SB.FORMATS))
    ap.add_argument("--month", type=int, default=date.today().month)
    ap.add_argument("--lang", default="en", choices=["en", "hi"])
    ap.add_argument("--out", default=None)
    ap.add_argument("--alt", default="",
                    help="beats to take from the SECOND take, e.g. b3,b5")
    a = ap.parse_args()
    if a.alt:
        os.environ["NAKSHIQ_ALT_TAKES"] = a.alt

    dest, months = load_dest(a.slug, a.month)
    kw = {}
    if a.format == "which_two":
        reel = json.loads(REEL_DATA.read_text())
        pack = json.loads(PACK.read_text())
        named = {r["id"]: r["name"] for r in pack}
        for x, y in reel.get("vs_pairs", []):
            other = y if x == a.slug else x if y == a.slug else None
            pm = (reel.get("months", {}).get(other) or {}).get(str(a.month)) if other else None
            if other and other in named and pm:
                kw["dest_b"] = {"id": other, "name": named[other],
                                "score": pm.get("score"), "label": pm.get("label")}
                break
    try:
        sb = SB.build_storyboard(a.format, dest, a.month, months, **kw)
    except SB.StoryboardError as e:
        sys.exit(f"[render] storyboard refused: {e}")

    print(f"[render] {a.slug} / {a.format} — {len(sb['beats'])} beats, "
          f"{sb['duration']}s")
    for b in sb["beats"]:
        print(f"    {b['id']} {b['role']:<7} {b['dur']:>4}s  {b['clip'] or '(reprise)'}")
        print(f"        say: {b['say']}")

    out = Path(a.out) if a.out else HERE / "out" / f"{a.slug}__{a.format}.mp4"
    out.parent.mkdir(parents=True, exist_ok=True)

    sb_l = SB.for_lang(sb, a.lang)      # Hindi opens on the outcome shot
    res = build(a.slug, dest, out, spec=SB.spec_from_storyboard(sb, a.lang),
                storyboard=sb_l, lang=a.lang, month=a.month)
    if not res:
        sys.exit("[render] build returned nothing")
    print(f"[render] wrote {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
