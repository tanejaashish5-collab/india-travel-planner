#!/usr/bin/env python3
"""Empirical BEFORE/AFTER proof for the 2026-06-21 feed-mix fix.

Replays the morning + evening format pickers over N days against a full eligible
pool and reports the resulting PILLAR distribution, comparing the OLD evening
picker (CSV-only round-robin, NO pillar bias) with the NEW one (shared pillar-
complete pool + deficit bias). The morning picker is unchanged in both arms, so
any difference is purely the evening fix.

Faithful round-robin: monkeypatches autoposter.date so date.today() advances day
by day (pick_oldest_unused / mark_theme_used / compute_weekly_pillar_share all
key off it). Run: python3 scripts/_simulate_format_mix.py
"""
import sys, copy
from collections import Counter
from datetime import date as _real_date, timedelta
sys.path.insert(0, ".")
import autoposter as A
import csv_format_loader as L

PILLARS = ["verdict", "verification", "anti_trap", "discovery", "moment"]
TARGET = A.PILLAR_WEEKLY_SHARE

# Full eligible pool = active copy_* MORNING_FORMATS + every feed CSV format id.
CSV_FEED = [fid for fid, s in L.load_all_formats().items() if s.is_feed_format]
FULL_POOL = list(A.MORNING_FORMATS) + CSV_FEED
VISUAL = list(A.VISUAL_DELEGATE_FORMATS)
CSV_ONLY = CSV_FEED + VISUAL          # the OLD evening pool
NEW_EVE = FULL_POOL + VISUAL          # the NEW evening pool (== morning + visual)


def _patch_date(sim_day):
    class D(_real_date):
        @classmethod
        def today(cls):
            return sim_day
    A.date = D


def run(days=30, evening_new=True, seed_offset=0):
    A.random_seed = None
    state = {"post_log": [], "theme_usage": {}, "dimension_cycle_status": {}}
    start = _real_date(2026, 6, 1)
    morn_p, eve_p = Counter(), Counter()
    for i in range(days):
        d = start + timedelta(days=i)
        _patch_date(d)
        ds = d.isoformat()
        # MORNING (unchanged): themed + deficit bias over the full pool
        m = A._pillar_biased_pick(state, FULL_POOL, mode="themed", label="M")
        A.mark_theme_used(state, "morning_formats", m)
        state["post_log"].append({"date": ds, "format": m})
        morn_p[A.FORMAT_PILLARS.get(m, "?")] += 1
        # EVENING: OLD (CSV-only round-robin, no bias) vs NEW (biased full pool)
        if evening_new:
            e = A._pillar_biased_pick(state, NEW_EVE, mode="balance", label="E")
        else:
            e = A.pick_oldest_unused(state, "morning_formats", CSV_ONLY, key=None)[0]
        A.mark_theme_used(state, "morning_formats", e)
        state["post_log"].append({"date": ds, "format": e})
        eve_p[A.FORMAT_PILLARS.get(e, "?")] += 1
    return morn_p, eve_p


def show(label, eve):
    n = sum(eve.values())
    print(f"\n{label} — evening slot pillar mix ({n} posts):")
    for p in PILLARS:
        a = eve.get(p, 0) / max(1, n)
        t = TARGET[p]
        flag = "⬆OVER" if a > t + 0.08 else ("⬇UNDER" if a < t - 0.08 else "ok")
        print(f"   {p:13} {a*100:4.0f}%   target {int(t*100):2d}%   {flag}")


if __name__ == "__main__":
    # average several trials (pick_oldest_unused pre-shuffles ties)
    TRIALS, DAYS = 6, 30
    old_tot, new_tot, morn_tot = Counter(), Counter(), Counter()
    for t in range(TRIALS):
        import random; random.seed(1000 + t)
        m1, old_e = run(DAYS, evening_new=False)
        random.seed(1000 + t)
        m2, new_e = run(DAYS, evening_new=True)
        old_tot += old_e; new_tot += new_e; morn_tot += m1
    print(f"=== {TRIALS}×{DAYS}-day replay (morning identical in both arms) ===")
    show("BEFORE (current evening: CSV-only, no bias)", old_tot)
    show("AFTER  (fix: shared pool + deficit-proportional balance)", new_tot)
    show("morning slot (unchanged, reference)", morn_tot)
    # The number that matters: the COMBINED feed a follower actually sees.
    show("COMBINED feed BEFORE (morning + old evening)", morn_tot + old_tot)
    show("COMBINED feed AFTER  (morning + new evening)", morn_tot + new_tot)
    A.date = _real_date  # restore
