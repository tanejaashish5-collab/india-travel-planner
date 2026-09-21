#!/usr/bin/env python3
"""
build-queue.py — pick today's destinations, storyboard them, queue the prompts.

The first half of the loop that was never built. As of 2026-09-20 NOTHING in the
repo submitted a prompt to Flow: `scripts/veo-harvest.mjs` only COLLECTS files a
human had already downloaded, and there was no LaunchAgent, no cron entry and no
workflow that generated anything. The 30 clips of 2026-09-15 were made by hand in
one session and nothing has been generated since. That is why the credits sat
unused: not a bug, an absent job.

This writes `veo_queue.json`, which `flow-run.mjs` then works through.

DATA SOURCE. It reads the cached verdict pack (`~/Automation/nakshiq-ig/data/
verdicts.json`, 744 verified month-verdicts across 335 destinations) rather than
the live content API, for two reasons: the API was returning
FUNCTION_INVOCATION_TIMEOUT on 2026-09-20, and a generation job that dies when
the site is slow is a job that silently stops producing. The pack is the same
source the daily IG brief already trusts.

SELECTION. Least-recently-generated first, so the library broadens instead of
deepening on six destinations. A destination whose data cannot support a format
is SKIPPED, never fabricated into one — storyboard.py raises and we move on.

BUDGET. 6 Flow accounts x 50 credits/day / 10 credits per Veo 3.1 Lite clip = 30
clips/day. We queue a little under that so a retry has room.
"""
from __future__ import annotations

import json
import sys
from datetime import date, datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = Path.home() / "Desktop" / "India Travel Planner" / "nakshiq-autoposter"
PACK = Path.home() / "Automation" / "nakshiq-ig" / "data" / "verdicts.json"
QUEUE = HERE / "veo_queue.json"
LEDGER = HERE / "generated.json"          # slug+format -> last generated date

DAILY_CLIP_BUDGET = 28                    # 7 whole 4-beat storyboards; of 30,
                                          # leaving 20 credits to finish a partial
# No format may take more than this many storyboards in one run. sos_rescue
# needs no per-destination data since the 09-21 honesty rewrite, so it passes
# for EVERY destination; with it first in FORMATS, an uncapped run would be
# seven copies of the same rescue story in seven places.
PER_FORMAT_CAP = 2
# Order is priority. Scenarios first (they show the product working), landscape
# formats as the fallback for destinations whose intel cannot support one.
FORMATS = ("sos_rescue", "road_closed", "fuel_gap", "hospital_run", "food_find",
           "wrong_month", "crowd_pullback", "two_places")

sys.path.insert(0, str(REPO))
try:
    import storyboard as SB
except ImportError:
    sys.exit(f"cannot import storyboard.py from {REPO} — is the repo present?")


def _pretty_state(state_id: str) -> str:
    """'himachal-pradesh' -> 'Himachal Pradesh'. The pack stores slugs; prompts
    need the name a human would say, or the shot reads as generic."""
    if not state_id:
        return ""
    small = {"and", "of", "the"}
    FIXUPS = {"jammu-kashmir": "Jammu and Kashmir",
              "andaman-nicobar": "the Andaman and Nicobar Islands",
              "dadra-nagar-haveli": "Dadra and Nagar Haveli",
              "daman-diu": "Daman and Diu",
              "jammu-and-kashmir": "Jammu and Kashmir"}
    if state_id in FIXUPS:
        return FIXUPS[state_id]
    return " ".join(w if w in small else w.capitalize()
                    for w in state_id.replace("_", "-").split("-"))


def load_intel() -> dict:
    """Per-destination intel (sos / fuel / eatery), needed by the scenario
    formats and absent from the verdict pack.

    Best effort on purpose. The content API was returning
    FUNCTION_INVOCATION_TIMEOUT on 2026-09-20, and a generation job that stops
    producing when the site is slow is a job that silently goes quiet. When
    intel is unavailable the scenario formats simply refuse per destination and
    the run falls through to the formats that need no intel — which is visible
    in the log, not silent.
    """
    import urllib.request
    url = ("https://www.nakshiq.com/api/content?type=destinations"
           f"&month={date.today().month}&min_score=0&limit=400&include_intel=1")
    try:
        with urllib.request.urlopen(url, timeout=25) as r:
            data = json.loads(r.read().decode()).get("data", [])
        out = {d["id"]: d for d in data if d.get("id")}
        print(f"[build-queue] intel loaded for {len(out)} destinations")
        return out
    except Exception as e:
        print(f"[build-queue] intel unavailable ({type(e).__name__}) — "
              f"scenario formats will refuse and the run falls back to "
              f"formats that need no intel")
        return {}


def load_pack() -> dict:
    rows = json.loads(PACK.read_text())
    dests: dict = {}
    for r in rows:
        if not isinstance(r.get("score"), int):
            continue
        d = dests.setdefault(r["id"], {
            "id": r["id"], "name": r["name"],
            "state": _pretty_state(r.get("state_id")),
            # raw slug too: road_closed gates on it (the road feed only covers
            # six Himalayan regions, so the pretty name is not enough)
            "state_id": r.get("state_id") or "", "months": {},
        })
        d["months"][r["month"]] = {"score": r["score"], "label": r.get("label"),
                                   "sentence": r.get("sentence") or ""}
    return dests


def load_ledger() -> dict:
    try:
        return json.loads(LEDGER.read_text())
    except Exception:
        return {}


def save_ledger(led: dict) -> None:
    LEDGER.write_text(json.dumps(led, indent=2, sort_keys=True))


def main() -> int:
    today = date.today()
    month = today.month
    dests = load_pack()
    intel = load_intel()
    led = load_ledger()

    # Least-recently-generated first. Never seen -> "" sorts first, so the
    # library spreads across destinations instead of deepening on the same six.
    order = sorted(dests.values(), key=lambda d: (led.get(d["id"], ""), d["id"]))

    # Only top up to the budget. The wrapper runs this on every fire, and
    # queueing a fresh 27 each time would grow a backlog the 30-clips-a-day
    # ceiling can never work through (seen: 27 -> 54 in two runs).
    try:
        already = sum(1 for r in json.loads(QUEUE.read_text())
                      if r.get("status") == "pending")
    except Exception:
        already = 0
    budget = max(0, DAILY_CLIP_BUDGET - already)
    if budget == 0:
        print(f"[build-queue] {already} clips already pending — not topping up")
        return 0

    queued, clips, skipped = [], 0, {}
    per_fmt: dict = {}
    for d in order:
        if clips >= budget:
            break
        live = intel.get(d["id"]) or {}
        dest = {"id": d["id"], "name": d["name"], "state": d["state"],
                "state_id": d["state_id"],
                "score": d["months"].get(month, {}).get("score"),
                "note": d["months"].get(month, {}).get("sentence"),
                # everything the scenario formats read; absent -> they refuse
                "intel": live.get("intel") or {},
                "hero_dish": live.get("hero_dish"),
                "eatery_name": live.get("eatery_name"),
                "elevation_m": live.get("elevation_m")}
        for fmt in FORMATS:
            if clips >= budget:
                break
            key = f"{d['id']}::{fmt}"
            if led.get(key):                      # already generated, ever
                continue
            if per_fmt.get(fmt, 0) >= PER_FORMAT_CAP:
                continue                          # variety: try the next format
            try:
                kw = {}
                if fmt == "two_places":
                    partner = next((o for o in order
                                    if o["id"] != d["id"]
                                    and o["state"] == d["state"]
                                    and month in o["months"]), None)
                    if not partner:
                        raise SB.StoryboardError("two_places: no same-state partner")
                    kw["dest_b"] = {"id": partner["id"], "name": partner["name"],
                                    "state": partner["state"],
                                    "score": partner["months"][month]["score"]}
                sb = SB.build_storyboard(fmt, dest, month, d["months"], **kw)
            except SB.StoryboardError as e:
                skipped.setdefault(str(e).split(":")[1].strip()[:44], 0)
                skipped[str(e).split(":")[1].strip()[:44]] += 1
                continue
            n = SB.enqueue(sb, QUEUE)
            if n:
                queued.append((d["id"], fmt, n))
                per_fmt[fmt] = per_fmt.get(fmt, 0) + 1
                clips += n
                led[key] = today.isoformat()
                led[d["id"]] = today.isoformat()
                break          # ONE format per destination per run: broaden
                               # the library, don't deepen it on one place

    save_ledger(led)
    total = len(json.loads(QUEUE.read_text())) if QUEUE.exists() else 0
    print(f"[build-queue] {today} month={month}")
    print(f"[build-queue] queued {clips} new clips across {len(queued)} storyboards")
    for slug, fmt, n in queued[:12]:
        print(f"    + {slug:<22} {fmt:<15} {n} clips")
    if skipped:
        print("[build-queue] refused (data cannot support the format, not fabricated):")
        for reason, n in sorted(skipped.items(), key=lambda x: -x[1])[:5]:
            print(f"    - {n:>4}x {reason}")
    print(f"[build-queue] queue now holds {total} rows total")
    # A run that queues nothing is not an error (the ledger may simply be full
    # for today), but it must be visible rather than silent.
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
