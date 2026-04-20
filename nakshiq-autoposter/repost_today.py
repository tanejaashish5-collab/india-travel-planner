#!/usr/bin/env python3
"""
One-shot: re-post 2026-04-18 MORNING content after fixing the title-overflow
and Chamba-typography-overflow rendering bugs.

Pins:
  Collection  → Autumn Destinations — Where September to November Scores 5/5
  Carousel    → tirthan-valley, nainital, dharamshala  (Autumn's curated order)
  Kids story  → Chamba
  Shared best → Dhanaulti

Mechanism: monkey-patches the 3 selector functions (`recently_used_destinations`,
`pick_oldest_unused`, `pick_best_destination`) to force today's choices, then
calls the normal `autoposter.run()` pipeline. All caption, slide, Outstand
upload, and publish paths are reused unchanged.

Safe to re-run: relies on `--force` semantics (bypasses lock + dedup). A
`--dry-run` pass is supported via the usual CLI flag.

Usage:
  python3 repost_today.py --dry-run   # preview
  python3 repost_today.py             # commit (implicit --force)
"""
import os
import sys
import argparse

# Ensure local imports resolve from the autoposter directory.
HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

import autoposter as ap


# ── Pinned content for today (2026-04-18) ─────────────────────────────────────
PINNED_COLLECTION_NAME = (
    "Autumn Destinations — Where September to November Scores 5/5"
)
PINNED_KIDS_DEST_ID = "chamba"
PINNED_BEST_DEST_ID = "dhanaulti"
# IDs we need to survive the 14-day "recently used" cooldown filter so the
# carousel builder can see them again.
PINNED_EXCLUDE_FROM_USED = {
    "chamba",
    "tirthan-valley",
    "nainital",
    "dharamshala",
    "dhanaulti",
}


# ── Patch 1: exempt today's pinned destinations from the cooldown set ─────────
_orig_recently_used = ap.recently_used_destinations


def _patched_recently_used(state):
    return _orig_recently_used(state) - PINNED_EXCLUDE_FROM_USED


ap.recently_used_destinations = _patched_recently_used


# ── Patch 2: force Autumn collection + Chamba kid-dest to the head of the queue
_orig_pick_oldest_unused = ap.pick_oldest_unused


def _patched_pick_oldest_unused(state, dimension, items, key="id"):
    ordered = _orig_pick_oldest_unused(state, dimension, items, key=key)
    if dimension == "collections":
        for idx, c in enumerate(ordered):
            if c.get("name") == PINNED_COLLECTION_NAME:
                if idx == 0:
                    return ordered
                return [c] + [x for i, x in enumerate(ordered) if i != idx]
    elif dimension == "destinations":
        # Only reorder when the pool actually contains Chamba — otherwise this
        # is the carousel pool and the collection-item ranking takes over inside
        # carousel_destinations(), so ordering here is harmless.
        for idx, d in enumerate(ordered):
            if d.get("id") == PINNED_KIDS_DEST_ID:
                if idx == 0:
                    return ordered
                return [d] + [x for i, x in enumerate(ordered) if i != idx]
    return ordered


ap.pick_oldest_unused = _patched_pick_oldest_unused


# ── Patch 3: force shared-best destination to Dhanaulti ───────────────────────
_orig_pick_best = ap.pick_best_destination


def _patched_pick_best(destinations, used, content=None):
    for d in destinations:
        if d.get("id") == PINNED_BEST_DEST_ID:
            return d
    return _orig_pick_best(destinations, used, content)


ap.pick_best_destination = _patched_pick_best


# ── Patch 4: scrub today's Story dedup key so the kids story re-fires ─────────
# `--force` bypasses feed-post dedup (line ~2048: `and not force`) but the
# Story guard at line 2194 has no force exemption, so we clear the relevant
# `posted_today[*_story]` entries for today after state load.
_orig_load_state = ap.load_state


def _patched_load_state():
    state = _orig_load_state()
    today_iso = ap.date.today().isoformat()
    pt = state.get("posted_today", {})
    scrubbed = []
    for k in list(pt.keys()):
        # Scrub any *_story keys (morning, evening) dated today. Don't touch
        # other modes' keys — they rotate independently.
        if k.endswith("_story") and pt[k] == today_iso:
            del pt[k]
            scrubbed.append(k)
    if scrubbed:
        print(f"  [repost] scrubbed Story dedup keys: {scrubbed}")
    return state


ap.load_state = _patched_load_state


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true",
                        help="Render + preview, no publish.")
    args = parser.parse_args()

    print("── Repost pre-flight ─────────────────────────────────────────")
    print(f"  Collection  → {PINNED_COLLECTION_NAME}")
    print(f"  Carousel    → tirthan-valley, nainital, dharamshala")
    print(f"  Kids story  → {PINNED_KIDS_DEST_ID}")
    print(f"  Shared best → {PINNED_BEST_DEST_ID}")
    print(f"  Mode        → {'DRY-RUN' if args.dry_run else 'LIVE'} (force=True)")
    print("──────────────────────────────────────────────────────────────")

    # Morning mode (default) — same schedule that fired this morning.
    ap.run(force=True, sync_only=False, dry_run=args.dry_run,
           evening=False, moat=False)
