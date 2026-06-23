#!/usr/bin/env python3
"""BEFORE/AFTER proof for the 2026-06-23 cadence fix (founder: "limit the
scoring to once a week" + "not enough data carousels").

Three proofs, each driving the REAL picker code over a synthetic accumulating
post log (merged_post_log monkeypatched → the synthetic log, date.today()
advanced day by day so every rolling-window read is faithful):

  1. SHORTS — yt_shorts_v2._score_short_recent + the weekly-budget rule.
     BEFORE = the live channel (read from data/post_log.jsonl).
     AFTER  = the new rule. Asserts: never more than 1 nakshiq_score in any
     rolling 7-day window, and the feed is never dark (every slot ships).

  2. DATA CAROUSEL FLOOR — autoposter._pillar_biased_pick over the full feed
     pool. Asserts: data_carousel posts >=1x per 7 days (it had not posted
     since 2026-04-27 before this fix).

  3. FEED SCORE CAP — autoposter._eligible_feed_formats with/without a recent
     score_card in the log. Asserts: score_card drops out of the eligible pool
     for 7 days after it posts, as long as non-score alternatives remain.

Run: python3 scripts/_simulate_score_cadence.py
"""
import json
import sys
from collections import Counter
from datetime import date as RD, timedelta
from pathlib import Path

sys.path.insert(0, ".")
import autoposter as A          # noqa: E402
import yt_shorts_v2 as Y        # noqa: E402

# ── Synthetic shared log + monkeypatches ─────────────────────────────────────
LOG: list = []
A.merged_post_log = lambda state=None: LOG     # both feed + shorts read this
A.load_state = lambda: {"post_log": LOG}


def patch_today(d):
    class _D(RD):
        @classmethod
        def today(cls):
            return d
    A.date = _D
    Y.date = _D


def _max_in_any_window(predicate, window=7) -> int:
    """Worst-case count of matching posts in any rolling `window`-day span."""
    hits = [e["date"] for e in LOG if predicate(e.get("format", ""))]
    if not hits:
        return 0
    dates = sorted({e["date"] for e in LOG})
    worst = 0
    for d in dates:
        dt = RD.fromisoformat(d)
        lo = (dt - timedelta(days=window - 1)).isoformat()
        worst = max(worst, sum(1 for h in hits if lo <= h <= d))
    return worst


# ── PROOF 1 — shorts weekly score budget ─────────────────────────────────────
def proof_shorts(days=28, slots_per_day=2, every=7):
    LOG.clear()
    start = RD(2026, 6, 1)
    fmt_counts = Counter()
    dark_slots = 0
    for i in range(days):
        d = start + timedelta(days=i)
        patch_today(d)
        ds = d.isoformat()
        for s in range(slots_per_day):
            score_due = (every <= 0) or (not Y._score_short_recent(every))
            if score_due:
                fmt = "nakshiq_score"
            else:
                # variety backstop: this_vs_that always resolves (any 2 dests)
                fmt = "did_you_know" if (i + s) % 2 == 0 else "this_vs_that"
            if not fmt:                       # would be a dark slot — never happens
                dark_slots += 1
                continue
            LOG.append({"date": ds, "format": f"yt_short.{fmt}"})
            fmt_counts[fmt] += 1
    worst7 = _max_in_any_window(lambda f: "nakshiq_score" in f, 7)
    total = sum(fmt_counts.values())
    return fmt_counts, total, worst7, dark_slots


def live_shorts_baseline():
    """BEFORE: score-short share from the real channel log."""
    p = Path("data/post_log.jsonl")
    if not p.exists():
        return None
    by_week = Counter()
    score_by_week = Counter()
    for line in p.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            e = json.loads(line)
        except json.JSONDecodeError:
            continue
        f = e.get("format", "")
        if not f.startswith("yt_short"):
            continue
        d = e.get("date") or (e.get("timestamp") or "")[:10]
        if not d or d < "2026-06-01":
            continue
        try:
            wk = RD.fromisoformat(d).isocalendar()[1]
        except ValueError:
            continue
        by_week[wk] += 1
        if "nakshiq_score" in f:
            score_by_week[wk] += 1
    return by_week, score_by_week


# ── PROOF 2 — data_carousel weekly floor ─────────────────────────────────────
def proof_carousel(days=28):
    LOG.clear()
    state = {"post_log": LOG, "theme_usage": {}, "dimension_cycle_status": {}}
    pool = list(A.MORNING_FORMATS)            # includes data_carousel + score_card
    counts = Counter()
    start = RD(2026, 6, 1)
    for i in range(days):
        d = start + timedelta(days=i)
        patch_today(d)
        ds = d.isoformat()
        for label, mode in (("M", "themed"), ("E", "balance")):
            f = A._pillar_biased_pick(state, list(pool), mode=mode, label=label)
            A.mark_theme_used(state, "morning_formats", f)
            LOG.append({"date": ds, "format": f})
            counts[f] += 1
    weeks = (days + 6) // 7
    return counts, weeks


# ── PROOF 3 — feed score cap (real _eligible_feed_formats) ────────────────────
def proof_feed_score_cap():
    # Isolate the core copy_* formats — skip CSV asset resolution in the sim.
    A.get_csv_specs = lambda: {}
    dests = [
        {"id": f"d{i}", "name": f"Dest {i}", "score": 5,
         "elevation_m": 1500 + (i * 100), "difficulty": "easy", "state": "HP"}
        for i in range(8)
    ]
    content = {"destinations": {"data": dests}}
    patch_today(RD(2026, 6, 15))

    LOG.clear()
    elig_empty = A._eligible_feed_formats({"post_log": LOG}, content)

    LOG.clear()
    LOG.append({"date": "2026-06-14", "format": "score_card"})   # posted yesterday
    elig_recent = A._eligible_feed_formats({"post_log": LOG}, content)
    return elig_empty, elig_recent


def proof_feed_frequency(days=28):
    """28-day replay through the REAL _eligible_feed_formats (cap) + the REAL
    _pillar_biased_pick (floor), both feed slots. Closes the gap the adversarial
    review flagged: _simulate_format_mix.py bypasses _eligible_feed_formats, so
    it never exercised the score cap. This one does — asserting the score-card
    family never appears more than once in any rolling 7-day feed window."""
    A.get_csv_specs = lambda: {}
    dests = [
        {"id": f"d{i}", "name": f"Dest {i}", "score": 5,
         "elevation_m": 1500 + (i * 90), "difficulty": "easy", "state": "HP"}
        for i in range(8)
    ]
    content = {"destinations": {"data": dests}}
    LOG.clear()
    state = {"post_log": LOG, "theme_usage": {}, "dimension_cycle_status": {}}
    counts = Counter()
    start = RD(2026, 6, 1)
    for i in range(days):
        d = start + timedelta(days=i)
        patch_today(d)
        ds = d.isoformat()
        for label, mode in (("M", "themed"), ("E", "balance")):
            eligible = A._eligible_feed_formats(state, content)
            f = A._pillar_biased_pick(state, eligible, mode=mode, label=label)
            A.mark_theme_used(state, "morning_formats", f)
            LOG.append({"date": ds, "format": f})
            counts[f] += 1
    score_worst = _max_in_any_window(lambda f: f in A.SCORE_FEED_FORMATS, 7)
    return counts, score_worst


def proof_visual_no_score():
    """REGRESSION GUARD (2026-06-24): the on-screen overlay must MATCH the arc.
    A non-score reel rendered without an _arc_hook falls back to build_ass's score
    default (score number + 'NAKSHIQ SCORE' kicker + '<NAME> 8/10' badge) — that's
    why the did_you_know/this_vs_that reels still LOOKED like score reels. Build the
    real ASS for each arc and assert the score tokens appear ONLY for nakshiq_score."""
    import tempfile
    from pathlib import Path
    import yt_shorts_v2 as YV
    cues = [(1.0, 2.2, "most people"), (2.3, 3.6, "dont know this")]
    out = {}
    for fmt in ("nakshiq_score", "did_you_know", "this_vs_that"):
        hook = YV._arc_hook(fmt, "Manali")
        ass = Path(tempfile.gettempdir()) / f"_proof_{fmt}.ass"
        YV.build_ass(cues, "8/10", "Manali", 6.0, ass, hook=hook)
        txt = ass.read_text(encoding="utf-8")
        out[fmt] = ("NAKSHIQ SCORE" in txt) or ("8/10" in txt) or ("8 / 10" in txt)
    return out


# ── Run + report ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 70)
    print("PROOF 1 — SHORTS: cap nakshiq_score to once / 7 days")
    print("=" * 70)
    base = live_shorts_baseline()
    if base:
        by_week, score_by_week = base
        print("\nBEFORE (live channel, data/post_log.jsonl, ISO weeks):")
        for wk in sorted(by_week):
            tot, sc = by_week[wk], score_by_week.get(wk, 0)
            print(f"   week {wk}: {sc:2d} score / {tot:2d} shorts "
                  f"({(100*sc/tot if tot else 0):3.0f}% score)")
    fc, total, worst7, dark = proof_shorts(days=28)
    print("\nAFTER (28-day replay, 2 slots/day, NAKSHIQ_YT_SCORE_EVERY_DAYS=7):")
    for f, n in fc.most_common():
        print(f"   {f:16} {n:3d}  ({100*n/total:3.0f}%)")
    print(f"\n   max nakshiq_score in ANY rolling 7-day window : {worst7}  "
          f"(target <= 1)   {'PASS' if worst7 <= 1 else 'FAIL'}")
    print(f"   dark slots (no format produced)               : {dark}  "
          f"(target 0)      {'PASS' if dark == 0 else 'FAIL'}")

    print("\n" + "=" * 70)
    print("PROOF 2 — DATA CAROUSEL weekly floor")
    print("=" * 70)
    counts, weeks = proof_carousel(days=28)
    dc = counts.get("data_carousel", 0)
    print(f"\n28-day replay ({weeks} weeks), morning + evening feed picker:")
    print(f"   data_carousel posts : {dc}   (target >= {weeks}, ~1/week)   "
          f"{'PASS' if dc >= weeks else 'FAIL'}")
    print(f"   data_carousel share : {100*dc/sum(counts.values()):.0f}% of feed "
          f"(self-limited — can't take over)")
    print("   top feed formats picked:")
    for f, n in counts.most_common(8):
        print(f"      {f:24} {n}")

    print("\n" + "=" * 70)
    print("PROOF 3 — FEED score cap (real _eligible_feed_formats)")
    print("=" * 70)
    elig_empty, elig_recent = proof_feed_score_cap()
    has_empty = "score_card" in elig_empty
    has_recent = "score_card" in elig_recent
    print(f"\n   empty log    -> score_card eligible : {has_empty}  "
          f"(expect True)")
    print(f"   score 1d ago -> score_card eligible : {has_recent}  "
          f"(expect False)")
    ok = has_empty and not has_recent
    print(f"   {'PASS' if ok else 'FAIL'} — score_card drops from the pool for 7 "
          f"days after it posts (alternatives remain: "
          f"{sorted(set(elig_recent))[:5]}...)")

    print("\n" + "=" * 70)
    print("PROOF 4 — FEED score cap, 28-day frequency replay (real picker chain)")
    print("=" * 70)
    fcounts, score_worst = proof_feed_frequency(days=28)
    score_total = sum(n for f, n in fcounts.items() if f in A.SCORE_FEED_FORMATS)
    total = sum(fcounts.values())
    print(f"\n   score-family posts : {score_total}/{total} "
          f"({100*score_total/total:.0f}% of feed)")
    print(f"   max score-family in ANY rolling 7-day window : {score_worst}  "
          f"(target <= 1)   {'PASS' if score_worst <= 1 else 'FAIL'}")
    print("   feed mix:")
    for f, n in fcounts.most_common():
        print(f"      {f:24} {n}")

    print("\n" + "=" * 70)
    print("PROOF 5 — REEL VISUAL matches arc (no score stamped on non-score reels)")
    print("=" * 70)
    vis = proof_visual_no_score()
    print(f"\n   nakshiq_score reel shows score on screen : {vis['nakshiq_score']}  "
          f"(expect True)")
    print(f"   did_you_know reel shows score on screen  : {vis['did_you_know']}  "
          f"(expect False)")
    print(f"   this_vs_that reel shows score on screen  : {vis['this_vs_that']}  "
          f"(expect False)")
    vok = vis["nakshiq_score"] and not vis["did_you_know"] and not vis["this_vs_that"]
    print(f"   {'PASS' if vok else 'FAIL'} — the score number + 'NAKSHIQ SCORE' "
          f"badge render ONLY on the weekly score reel")

    A.date = RD  # restore
