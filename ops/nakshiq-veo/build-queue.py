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
# Facts for the lighter formats (treks, crowd calendar, cost days, full-year
# verdicts, /vs/ pairs). Written by scripts/export-reel-data.mjs; see its header.
REEL_DATA = HERE / "data" / "reel-data.json"

DAILY_CLIP_BUDGET = 30                    # 6 accounts x 50 credits / 10 per clip.
                                          # Founder, 09-21: use all 30 every day.
# Storyboards are 3 or 4 clips and must stay WHOLE (a reel missing one beat
# renders nothing), so the queue cannot simply stop at 30: it has to LAND on 30.
# Every whole number is a sum of 3s and 4s except 1, 2 and 5, so a storyboard is
# only accepted if the budget it leaves behind is still fillable.
_UNFILLABLE = {1, 2, 5}
# No format may take more than this many storyboards in one run. sos_rescue
# needs no per-destination data since the 09-21 honesty rewrite, so it passes
# for EVERY destination; with it first in FORMATS, an uncapped run would be
# seven copies of the same rescue story in seven places.
PER_FORMAT_CAP = 2
# THE TONE MIX (founder-approved 2026-09-21): two storyboards per tone per day,
# so a day is 25% tense and 75% useful / warm / awe, never seven rescue stories.
# The tones and their formats live in storyboard.TONES.
PER_TONE = 2
import os as _os
DEBUG = _os.environ.get("VEO_DEBUG") == "1"
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


def load_reel_data() -> dict:
    """Best effort, like intel: a missing snapshot makes the formats that need it
    refuse (visible in the log), it never stops the run."""
    try:
        d = json.loads(REEL_DATA.read_text())
        print(f"[build-queue] reel-data from {d.get('generated_at', '?')[:10]}: "
              f"{len(d.get('treks', {}))} trek dests, {len(d.get('costs', {}))} cost dests, "
              f"{len(d.get('months', {}))} full-year dests, {len(d.get('vs_pairs', []))} /vs/ pairs")
        return d
    except Exception as e:
        print(f"[build-queue] reel-data unavailable ({type(e).__name__}) — "
              f"how_hard / which_two / real_cost / quiet_month will refuse")
        return {}


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
    reel = load_reel_data()
    # Full-year verdicts: the IG pack only spans the brief's look-ahead window
    # (Sep-Nov, 2.2 months per destination), which starved quiet_month. Keep the
    # pack's editorial sentence where it exists; take score + label for every
    # month from destination_months.
    for d in dests.values():
        for m, v in (reel.get("months", {}).get(d["id"]) or {}).items():
            d["months"].setdefault(int(m), {"sentence": ""}).update(
                {"score": v.get("score"), "label": v.get("label")})
    vs_partner: dict = {}
    for a_, b_ in reel.get("vs_pairs", []):
        vs_partner.setdefault(a_, []).append(b_)
        vs_partner.setdefault(b_, []).append(a_)
    tone_of = {f: t for t, fs in SB.TONES.items() for f in fs}
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
    # Seed the cap from what is ALREADY pending, not from zero. The job runs at
    # 09:20 and again at 14:20; a cap counted per-run let the second run add two
    # more of a format the first run had already maxed (seen 09-21: four
    # sos_rescue in one day's queue with a cap of two).
    per_fmt: dict = {}
    per_tone: dict = {}
    try:
        _pend = {(r["slug"], r["format"]) for r in json.loads(QUEUE.read_text())
                 if r.get("status") == "pending"}
        for _slug, _fmt in _pend:
            per_fmt[_fmt] = per_fmt.get(_fmt, 0) + 1
            per_tone[tone_of.get(_fmt)] = per_tone.get(tone_of.get(_fmt), 0) + 1
    except Exception:
        pass
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
                "elevation_m": live.get("elevation_m"),
                "treks": reel.get("treks", {}).get(d["id"]),
                "crowd": reel.get("crowd", {}).get(d["id"]),
                "costs": reel.get("costs", {}).get(d["id"])}
        # Try the tones furthest below quota first, so the day fills evenly
        # instead of whichever format happens to be listed first.
        want = sorted((t for t in SB.TONES if per_tone.get(t, 0) < PER_TONE),
                      key=lambda t: per_tone.get(t, 0))
        # Filter against storyboard's registry, NOT this file's old FORMATS tuple:
        # that tuple predates the lighter formats, and filtering on it silently
        # dropped all four before they were ever tried (09-21, found by trace).
        order_fmts = [f for t in want for f in SB.TONES[t] if f in SB.FORMATS]
        for fmt in order_fmts:
            if clips >= budget:
                break
            key = f"{d['id']}::{fmt}"
            if led.get(key):                      # already generated, ever
                continue
            if per_fmt.get(fmt, 0) >= PER_FORMAT_CAP:
                continue                          # variety: try the next format
            if per_tone.get(tone_of.get(fmt), 0) >= PER_TONE:
                continue                          # this tone is full today
            try:
                kw = {}
                remaining = budget - clips
                if fmt == "which_two":
                    partner = next((x for x in vs_partner.get(d["id"], [])
                                    if x in dests and month in dests[x]["months"]), None)
                    if not partner:
                        raise SB.StoryboardError("which_two: no /vs/ partner with a score this month")
                    pm = dests[partner]["months"][month]
                    kw["dest_b"] = {"id": partner, "name": dests[partner]["name"],
                                    "score": pm.get("score"), "label": pm.get("label")}
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
                if DEBUG:
                    print(f"    [debug] {d['id']:<16} {fmt:<14} refused: {str(e)[:90]}")
                skipped.setdefault(str(e).split(":")[1].strip()[:44], 0)
                skipped[str(e).split(":")[1].strip()[:44]] += 1
                continue
            size = len(SB.queue_rows(sb))
            left = remaining - size
            if size > remaining or left in _UNFILLABLE:
                if DEBUG:
                    print(f"    [debug] {d['id']:<16} {fmt:<14} skipped: size {size} leaves {left} of {remaining}")
                continue                          # would overshoot or strand credits
            n = SB.enqueue(sb, QUEUE)
            if n:
                queued.append((d["id"], fmt, n))
                per_fmt[fmt] = per_fmt.get(fmt, 0) + 1
                per_tone[tone_of.get(fmt)] = per_tone.get(tone_of.get(fmt), 0) + 1
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
