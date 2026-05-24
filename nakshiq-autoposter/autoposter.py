#!/usr/bin/env python3
from __future__ import annotations
"""
Nakshiq Autonomous Social Media Poster
=======================================
Syncs Nakshiq content 3x/day. Posts ONCE per day per connected platform.
On Instagram: posts a feed post + a Story (Mon/Thu) using the same image.
Reels/video support activates automatically once Nakshiq serves real video files.

Modes:
  python autoposter.py              # Normal run
  python autoposter.py --force      # Force-post even if already posted today
  python autoposter.py --sync-only  # Sync content only, skip posting
  python autoposter.py --dry-run    # Preview without publishing
"""

import json
import os
import re
import sys
import time
import argparse
import hashlib
import logging
import requests
from datetime import datetime, timezone, date, timedelta
from pathlib import Path

# 2026-05-20: v2/v3/v4 CSV-driven formats. Lazily loaded on first call to
# get_csv_specs() so logging.basicConfig (further below) is already wired and
# load-time INFO messages route to the autoposter.log file. Asset-presence in
# social_image_library/ is the natural opt-in switch — no env var. See
# csv_format_loader.py.
import csv_format_loader as _csv_fmt
_CSV_SPECS_CACHE: "dict | None" = None


def get_csv_specs() -> dict:
    global _CSV_SPECS_CACHE
    if _CSV_SPECS_CACHE is None:
        try:
            _CSV_SPECS_CACHE = _csv_fmt.load_all_formats()
        except Exception as e:                               # pragma: no cover
            print(f"[csv_formats] failed to load: {e}", flush=True)
            _CSV_SPECS_CACHE = {}
    return _CSV_SPECS_CACHE


SOCIAL_IMAGE_LIBRARY_DIR = Path(__file__).parent / "social_image_library"

# ─────────────────────────────────────────────────────────────────────────────
# ENV — load .env.local if present (for local/Cowork runs; GH Actions uses secrets)
# ─────────────────────────────────────────────────────────────────────────────
_env_local = Path(__file__).parent / ".env.local"
if _env_local.exists():
    for _line in _env_local.read_text().splitlines():
        _line = _line.strip()
        if _line and not _line.startswith("#") and "=" in _line:
            _k, _, _v = _line.partition("=")
            os.environ.setdefault(_k.strip(), _v.strip())

# ─────────────────────────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────────────────────────

OUTSTAND_API_KEY = os.environ.get("OUTSTAND_API_KEY", "")
OUTSTAND_BASE    = "https://api.outstand.so"
NAKSHIQ_BASE     = "https://nakshiq.com/api/content"
STATE_FILE       = Path(__file__).parent / "state.json"
LOG_FILE         = Path(__file__).parent / "autoposter.log"
# 2026-05-18: post_log + theme_usage moved out of state.json into append-only
# JSONL files. Root cause: state-branch race condition. Every cron run did
# `cp state.json /tmp/autoposter-state-worktree/state.json` which wholesale-
# overwrote the file with the snapshot taken at run-start. Concurrent runs
# dropped each other's appends — observed 2026-05-17 when post_log went
# 40 → 41 → 38 entries across 4 cron commits on the same day (every published
# post got wiped within hours).
#
# JSONL append-mode is POSIX-atomic for writes ≤ PIPE_BUF (~4KB on Linux),
# well above our ~250B row size. Concurrent appends from separate processes
# interleave safely. The workflow now MERGES (instead of overwriting) these
# files in the worktree so cross-run pushes preserve each other's entries.
DATA_DIR          = Path(__file__).parent / "data"
POST_LOG_JSONL    = DATA_DIR / "post_log.jsonl"
THEME_USAGE_JSONL = DATA_DIR / "theme_usage.jsonl"
# 2026-05-20: durable mirror of state.posted_today — JSONL is the source of
# truth so analytics-sync race (observed 2026-05-19 17:17 UTC: state.posted_today
# rolled back to {}) can't reset the daily dedup gate.
POSTED_TODAY_JSONL = DATA_DIR / "posted_today.jsonl"

# ─────────────────────────────────────────────────────────────────────────────
# MORNING FEED — strict round-robin rotation (no format repeats until ALL
# have been cycled through). Tracked via theme_usage["morning_formats"].
# ─────────────────────────────────────────────────────────────────────────────
MORNING_FORMATS = [
    # ── 2026-05-17 TIER 7 PHASE 2: VARIETY RESTORATION (14 formats) ──
    #
    # After the 2026-05-16 pivot cut 26→7, audit confirmed pillar imbalance
    # (verification 57%, discovery 0%, anti_trap 0%) — same 7-day mix
    # repeating every week. Phase 2 restores 4 culled formats (revoiced) +
    # adds 3 brand-new data-driven formats to bring total to 14, distributed
    # across all 5 pillars.
    #
    # Quality contract (unchanged from 2026-05-16):
    #   - hook in line 1 (curiosity / specific value)
    #   - real DB data only (SKIP if data missing — no silent fallback)
    #   - comment-CTA + niche tags + no IG URL (link in bio)
    #
    # ─── Verdict (3) ──────────────────────────────────────────────────────
    "score_card",                # core verdict
    "weekend_escape",            # 48hr plan with dest-specific detail
    "festival_alert",            # this-month festival with timing (moment too)
    # ─── Verification (4) ────────────────────────────────────────────────
    "stays_pick",                # editor-curated stay
    "emergency_intel",           # per-dest SOS contacts + local helper
    "eateries_pick",             # legendary local eatery + insider tip
    "confidence_intel",          # reach + sleep + fuel + network report
    # ─── Discovery (4) — restored + new ─────────────────────────────────
    "hidden_gem_reveal",         # NEW: "nobody talks about X" from hidden_gems
    "collection_series",         # RESTORED + revoiced: themed multi-post
    "route_spotlight_short",     # NEW: featured stop on a multi-day route
    "women_solo_brief",          # NEW: solo-female-safe curated dest
    # ─── Anti-trap (1) — restored ───────────────────────────────────────
    "tourist_trap",              # RESTORED + revoiced: skip X go Y
    # ─── Moment (2) — practical / decisional ────────────────────────────
    "arrival_intel",             # NEW: airport prepaid taxi + scam warning
    "cost_index_card",           # NEW: ₹/day breakdown
]

# ─────────────────────────────────────────────────────────────────────────────
# CONTENT PILLARS — see docs/social-playbook.md
# Every format maps to exactly one pillar. The rotation selector biases toward
# the most-under-share pillar (over rolling 7 days) before falling back to
# pick_oldest_unused, so brand recall stays consistent without losing variety.
# ─────────────────────────────────────────────────────────────────────────────

FORMAT_PILLARS = {
    # 2026-05-17 Tier 7 Phase 2 — pillar map for the active 14 formats.
    # (Inactive entries from earlier tiers retained as dict keys so analytics
    # backfills still resolve old format names to pillars; their absence from
    # MORNING_FORMATS means they never get picked.)
    # VERDICT — "Should I go to X in Y month?"
    "score_card":           "verdict",
    "weekend_escape":       "verdict",
    "festival_alert":       "verdict",   # also moment-flavoured
    # legacy verdict (inactive)
    "reality_check":        "verdict",
    "monthly_forecast":     "verdict",
    "seasonal_shift":       "verdict",
    "this_month_only":      "verdict",
    # VERIFICATION — "Verified, here's the source"
    "stays_pick":           "verification",
    "emergency_intel":      "verification",
    "eateries_pick":        "verification",
    "confidence_intel":     "verification",
    # legacy verification (inactive)
    "infrastructure_truth": "verification",
    # ANTI-TRAP — "Don't fall for X"
    "tourist_trap":         "anti_trap",
    # DISCOVERY — "What you didn't know about X"
    "hidden_gem_reveal":    "discovery",
    "collection_series":    "discovery",
    "route_spotlight_short":"discovery",
    "women_solo_brief":     "discovery",   # solo-curation is discovery-flavoured
    # legacy discovery (inactive)
    "collection_spotlight": "discovery",
    "kids_intel":           "discovery",
    "underdog_spotlight":   "discovery",
    "adventure_pick":       "discovery",
    "trek_intel":           "discovery",
    "viral_eats_pick":      "discovery",
    "camping_intel":        "discovery",
    # MOMENT — "Right now, this matters"
    "arrival_intel":        "moment",
    "cost_index_card":      "moment",
    # legacy moment (inactive)
    "data_carousel":        "moment",
    "blog_promo":           "moment",
    "elevation_face_off":   "moment",
    "state_showdown":       "moment",
    "difficulty_spectrum":  "moment",
    # VISUAL DELEGATES — heavyweight pipelines rotated through the evening slot
    # (2026-05-22). Pillars keep compute_weekly_pillar_share() from seeing a
    # None key when these post.
    "infographic":          "verification",
    "tourist_map":          "discovery",
    "reel_map":             "discovery",
}

# 2026-05-20 — fold in CSV-loaded v2/v3/v4 pillars so pick_morning_format's
# pillar-bias logic (themed-week / deficit-share / dimension_cycle_status)
# treats them as first-class. Runs once at import via get_csv_specs() cache.
FORMAT_PILLARS.update(_csv_fmt.pillar_map(get_csv_specs()))

# Target weekly share per pillar. Playbook spec; the rotation biases toward
# pillars whose actual 7-day share is BELOW these targets. Total = 1.0.
# Anti-trap structurally has only 1 format in the pool today, so its target
# is the share the rotation should TRY to hit, not a hard ceiling.
WEEK_OF_MONTH_BIAS = {
    # 2026-05-17 Tier 7 Phase 3 — narrative arc within a calendar month.
    # Each week of the month biases the picker toward a pillar group so
    # followers anticipate a rhythm (without breaking the once-per-month
    # rule). Week numbers are 1-indexed; week 5 (days 29-31) acts as
    # catch-up — no bias, picker uses deficit-share fallback.
    #
    # Reasoning:
    #   Week 1 (1-7):   open with VERDICT — "best dests this month" rolling
    #                   into DISCOVERY — "hidden gems" hooks attention early
    #   Week 2 (8-14):  VERIFICATION — stays/eateries/emergency deep-dive
    #                   (middle of month = planning peak, build trust)
    #   Week 3 (15-21): ANTI_TRAP + MOMENT — "don't fall for X" + festivals/
    #                   "this is happening NOW" hooks
    #   Week 4 (22-28): DISCOVERY + VERIFICATION — routes/cost/airports
    #                   (end-of-month booking decisions)
    #   Week 5 (29-31): no bias, default to under-share deficit
    1: ["verdict", "discovery"],
    2: ["verification"],
    3: ["anti_trap", "moment"],
    4: ["discovery", "verification"],
    5: [],  # catch-up
}


def week_of_month(today=None) -> int:
    """Return 1-indexed week-of-month. Day 1-7 = week 1, 8-14 = 2, etc.
    Day 29-31 = week 5."""
    t = today or date.today()
    return min(5, ((t.day - 1) // 7) + 1)


PILLAR_WEEKLY_SHARE = {
    "verdict":      0.35,
    "verification": 0.20,
    "anti_trap":    0.15,
    "discovery":    0.20,
    "moment":       0.10,
}

# ─────────────────────────────────────────────────────────────────────────────
# SEASONAL OVERRIDES — date-window pillar weight adjustments
# Adds to PILLAR_WEEKLY_SHARE during the matching window. Caller clamps the
# combined target so no single override moves a pillar by >+0.15 absolute.
# month-day tuples; year-agnostic. Multiple windows can stack additively.
# ─────────────────────────────────────────────────────────────────────────────

SEASONAL_OVERRIDES = [
    # SW monsoon: verdict surges (Kerala/Goa reversals, NE flips).
    {
        "name":   "sw_monsoon",
        "start":  (6, 1),
        "end":    (9, 30),
        "deltas": {"verdict": +0.15, "discovery": -0.05, "moment": -0.05},
    },
    # Char Dham permit edges: emergency_intel + verdict surge for UK dests.
    {
        "name":   "char_dham_open",
        "start":  (4, 28),
        "end":    (5, 12),
        "deltas": {"verification": +0.10, "verdict": +0.05},
    },
    {
        "name":   "char_dham_close",
        "start":  (10, 24),
        "end":    (11, 7),
        "deltas": {"verification": +0.10, "verdict": +0.05},
    },
    # Festival weeks — Indian festivals cluster around specific dates;
    # moment pillar doubles share in those windows. Diwali, Holi, Onam,
    # Durga Puja, Chithirai (Madurai Apr), Karthigai Deepam (Tamil Nadu Dec).
    {"name": "diwali_window",      "start": (10, 25), "end": (11, 10),
     "deltas": {"moment": +0.15, "discovery": -0.05}},
    {"name": "holi_window",        "start": (3, 5),   "end": (3, 18),
     "deltas": {"moment": +0.15, "discovery": -0.05}},
    {"name": "onam_window",        "start": (8, 25),  "end": (9, 10),
     "deltas": {"moment": +0.10}},
    {"name": "durga_puja",         "start": (9, 25),  "end": (10, 15),
     "deltas": {"moment": +0.10}},
    {"name": "chithirai_madurai",  "start": (4, 1),   "end": (4, 30),
     "deltas": {"moment": +0.10}},
    {"name": "karthigai_deepam",   "start": (12, 1),  "end": (12, 15),
     "deltas": {"moment": +0.10}},
    # Wedding season — off-season-drivers content surfaces (Rajasthan/Kerala).
    {
        "name":   "wedding_season",
        "start":  (11, 1),
        "end":    (2, 28),
        "deltas": {"verification": +0.05, "discovery": +0.05, "moment": -0.05},
    },
    # Summer peak — hill stations win, mainland warnings rise.
    {
        "name":   "summer_peak",
        "start":  (4, 1),
        "end":    (6, 15),
        "deltas": {"anti_trap": +0.05, "verdict": +0.05},
    },
    # Diaspora homecoming — NRI parents-visit, ASI / UNESCO spotlights.
    {
        "name":   "diaspora_nov_dec",
        "start":  (11, 15),
        "end":    (12, 31),
        "deltas": {"verification": +0.10},
    },
    {
        "name":   "diaspora_mar_apr",
        "start":  (3, 15),
        "end":    (4, 30),
        "deltas": {"verification": +0.10},
    },
]

# Legacy weekday-based schedule (kept for fallback only — round-robin is primary)
_LEGACY_FORMAT_SCHEDULE = {
    0: "score_card", 1: "reality_check", 2: "data_carousel",
    3: "score_card", 4: "reality_check", 5: "collection_spotlight",
    6: "infrastructure_truth",
}

# Facebook format overrides — no longer needed with round-robin, but kept
# for backward compatibility in case the legacy path is triggered.
FB_FORMAT_OVERRIDES = {
    3: "collection_spotlight",
}
FIRST_SAT_FB_FORMAT = "monthly_forecast"

# Instagram Story rotation (separate from feed) — one per weekday
STORY_FORMAT_SCHEDULE = {
    0: "festival_alert",        # Mon — festival this month if any
    1: "blog_promo",            # Tue — latest article
    2: "collection_spotlight",  # Wed
    3: "score_card",            # Thu — "route teaser" not feasible yet; use score card
    4: "infrastructure_truth",  # Fri
    5: "kids_intel",            # Sat
    6: "score_card",            # Sun — "score teaser"
}

# Weekdays on which a Story is attempted. Skipped when the feed post is a Reel
# to avoid running the same video twice in the same surface session.
STORY_DAYS = {0, 1, 2, 3, 4, 5, 6}

# ─────────────────────────────────────────────────────────────────────────────
# EVENING SCHEDULE — runs at 6pm AEST / 9:30pm IST via a separate cron
# -----------------------------------------------------------------------------
# Pillar: entertainment / inspiration / motion. Video-first (Reels), rotates
# audience-tag filters so every traveler segment gets featured over a week.
# Complements the morning 9am data-pillar schedule — never repeats the same
# destination across morning + evening on the same day.
# ─────────────────────────────────────────────────────────────────────────────

EVENING_FORMAT_SCHEDULE = {
    0: "score_card",            # Mon — Hidden-destination reel (audience=backpackers)
    1: "tourist_trap",          # Tue — Tourist trap vs alternative (reality_check if no traps)
    2: "collection_spotlight",  # Wed — Collection cinematic carousel
    3: "festival_alert",        # Thu — Festival teaser
    4: "score_card",            # Fri — Adventure / adventurers reel
    5: "score_card",            # Sat — Family / kids reel
    6: "monthly_forecast",      # Sun — Next-month preview carousel
}

# Audience filter applied to the pool before format selection, per weekday.
# None = no filter (use the whole pool).
EVENING_AUDIENCE_SCHEDULE = {
    0: "backpackers",    # Mon
    1: None,             # Tue — trap/reality handles its own pairing
    2: None,             # Wed — collection provides its own items
    3: None,             # Thu — festival binds to its own destination
    4: "adventurers",    # Fri
    5: "families",       # Sat
    6: None,             # Sun — monthly forecast uses top-5 overall
}

EVENING_STORY_SCHEDULE = {
    0: "festival_alert",        # Mon — festival peek
    1: "collection_spotlight",  # Tue — weekend-getaway equivalent (best collection for "weekenders")
    2: "blog_promo",            # Wed — blog excerpt
    3: "collection_spotlight",  # Thu — another collection
    4: "reality_check",         # Fri — tease a reality pair
    5: "route_spotlight",       # Sat — route snapshot (if data available)
    6: "kids_intel",            # Sun — kids intel tease
}

# ─────────────────────────────────────────────────────────────────────────────
# MOAT SCHEDULE — runs Mon/Wed/Fri at 12pm IST via a 3rd cron
# -----------------------------------------------------------------------------
# Pillar: brand/identity/methodology. Documents Nakshiq's 3-layer moat
# (data · editorial authority · trust brand) so future acquirers can audit
# the content library as evidence. Rotates through 9 distinct "angles" that
# map 1:1 to sections of the Master Playbook. Anti-repetition tracker on the
# `moat_angles` dimension guarantees no angle repeats until all have been used.
# ─────────────────────────────────────────────────────────────────────────────

# The 9 moat angles — the picker chooses the oldest-never-used one each run.
# When a new angle is added, it gets featured first automatically (never-used
# sorts ahead of everything). When all 9 have cycled, rotation resets.
MOAT_ANGLES = [
    # 2026-05-16 PIVOT — kept ONE genuine moat angle (skip_list — honest
    # 'don't go' content is unique to NakshIQ and trust-building). Killed
    # all methodology + manifesto angles: chinese_wall, four_questions,
    # data_provenance, same_place_12_months, methodology_roads/family/
    # altitude/crowds — these posted brand statements with no destination
    # hook and earned zero engagement on the 12-follower account.
    # When MOAT_ANGLES has only 1 entry, the pick_oldest_unused tracker
    # returns it every Mon/Wed/Fri but the moat cron is M/W/F only, so
    # skip_list fires ~3x/week which is reasonable cadence for honest
    # 'don't go' content.
    "skip_list",
]

# Methodology content per dimension — hardcoded because it IS the moat.
# These explanations map directly to the "Data Layer" of the Moat (Playbook 3.2).
METHODOLOGY_CONTENT = {
    "roads": {
        "title":  "HOW WE SCORE ROADS",
        "signals": [
            "Road type (NH / SH / district / unpaved)",
            "Landslide history (last 24 months)",
            "Fuel availability (km to nearest pump)",
            "Network coverage (Jio / Airtel / BSNL / Vi)",
            "Medical access (km to nearest hospital > 50 beds)",
            "Repair infrastructure (mechanic, tire shops)",
            "Seasonal passability (monsoon, snow, closures)",
        ],
        "closing": "7 signals. No advertiser tips the scale. No tourism board subsidy.",
    },
    "family": {
        "title":  "HOW WE SCORE FAMILY-FRIENDLINESS",
        "signals": [
            "Kid-suitable activities (age 4-12)",
            "Altitude tolerance (risk above 2500m)",
            "Medical access for emergencies",
            "Food safety & availability of familiar options",
            "Washroom infrastructure (for long drives + sites)",
            "Elder-friendliness (stairs, walking distances)",
            "Seasonal weather risk (heat, cold, rain intensity)",
        ],
        "closing": "Every rating is scored against a 5-year-old on a 3-day trip.",
    },
    "altitude": {
        "title":  "HOW WE SCORE ALTITUDE TOLERANCE",
        "signals": [
            "Base elevation (m)",
            "Acclimatization route (gradual or abrupt)",
            "Max elevation on recommended day-plan",
            "AMS history (reported cases by operators)",
            "Oxygen availability (hotels, hospitals)",
            "Evacuation time to nearest lowland city",
            "Seasonal weather amplification (cold + altitude)",
        ],
        "closing": "High score means altitude is genuinely manageable. Low score means we don't care who told you it's beautiful.",
    },
    "crowds": {
        "title":  "HOW WE SCORE CROWDS",
        "signals": [
            "Peak-season occupancy (hotel/homestay)",
            "Landmark wait times (verified monthly)",
            "Road congestion (drive times vs off-season)",
            "Parking availability at key viewpoints",
            "Traffic permit restrictions (if any)",
            "Popular social media saturation (signal for tourist bloat)",
            "Local-to-visitor ratio (infra carrying capacity)",
        ],
        "closing": "High crowd score = manageable. Low = do something else this month.",
    },
}

# Moat lock file (separate from morning / evening locks)
MOAT_LOCK_FILE = Path(__file__).parent / ".autoposter-moat.lock"

# ─────────────────────────────────────────────────────────────────────────────
# FESTIVAL DATE AWARENESS
# The Nakshiq festivals API exposes only an integer `month`, not start/end
# dates. This lookup records the END day-of-month for festivals where the
# date is fixed/well-known so we can drop them once they've passed. Festivals
# not listed here use a generic "first 14 days of the month" planning window
# — past day 14, current-month festivals drop out and the rotation prefers
# next-month festivals instead.
# Names are normalized to lower-case for matching.
# ─────────────────────────────────────────────────────────────────────────────
KNOWN_FESTIVAL_END_DAYS: dict[str, int] = {
    # January
    "republic day parade":   26,    # Jan 26
    "republic day":          26,
    "makar sankranti":       15,    # Jan 14-15
    "lohri":                 14,    # Jan 13-14
    # February
    "vasant panchami":       10,    # early-mid Feb (varies by year, generous cutoff)
    # March
    "holi":                  20,    # mid-March (varies, generous cutoff)
    "shivratri":             10,    # early March (varies)
    # April
    "baisakhi":              15,    # Apr 13-14
    "ram navami":             20,    # mid April (varies)
    "mahavir jayanti":        21,
    # May
    "buddha purnima":         25,    # mid-late May (varies)
    # August
    "independence day":       15,
    "independence day parade":15,
    "raksha bandhan":         25,
    "janmashtami":            30,    # late Aug (varies)
    # September
    "ganesh chaturthi":       15,    # early-mid Sept (varies)
    "onam":                   15,    # early-mid Sept (varies)
    # October
    "dussehra":               25,    # mid-late Oct (varies)
    "navratri":               25,    # spans 9 nights, generous cutoff
    "gandhi jayanti":          2,    # Oct 2
    # November
    "diwali":                 15,    # early-mid Nov (varies)
    "bhai dooj":              17,
    "chhath puja":            20,
    # December
    "christmas":              25,    # Dec 25
}

# Generic "current month festivals are still in their planning window" cutoff.
# Past this day-of-month, drop unknown current-month festivals from the pool
# and let the rotation prefer next-month festivals instead.
FESTIVAL_PLANNING_CUTOFF_DAY = 14

# Total destinations Nakshiq scores — populated from /stats on each sync (see
# sync_all_content, autoposter.py:845-848).  Fallback only matters when the
# stats call fails; bumping to current catalog size (2026-05-10) so a sync
# failure doesn't stamp every caption with a stale number.
TOTAL_DESTINATIONS = 505


# ─────────────────────────────────────────────────────────────────────────────
# Caption helpers (Tier 1 overhaul, 2026-05-10)
# Centralises score scaling, IG-only URL stripping, and hashtag expansion so
# every caption builder shares one source of truth.  The website moved to a
# 0-10 scale during the 2026-05-05 sweep; raw API values remain on /5 so we
# scale at display time only.
# ─────────────────────────────────────────────────────────────────────────────

def format_score(raw) -> str:
    """Convert raw 1-5 score from the API into the website-aligned '8/10' form.
    Mirrors the formatScore() helper in apps/web/src/components/destination-detail-cinematic.tsx.
    """
    try:
        if raw is None or raw == "":
            return "—/10"
        return f"{int(raw) * 2}/10"
    except (TypeError, ValueError):
        return "—/10"


# Niche/branded hashtag pool used by _build_ig_hashtags.  Every entry has been
# checked against _BANNED_HASHTAGS — none get stripped by _sanitize_caption.
# Broad tags (#travel, #india, #wanderlust, #travelgram …) are intentionally
# excluded; the existing brand rules sanitise those out anyway.
_IG_NICHE_POOL = [
    "IndianHillStations", "IndianRoadtrip", "IndianAdventures",
    "DesiTravel", "DesiTraveller", "TravelBharat", "BharatTravel",
    "DiscoverIndia", "ExploreBharat", "IndianTravelDiaries",
    "HimalayanIndia", "IndianMonuments", "IndianForts",
    "IndianTemples", "IndianTrails",
]

_IG_BRAND_POOL = [
    "NakshIQ", "TravelWithIQ", "DataDrivenTravel",
    "PlanWithData", "ScoredDestinations", "VerifiedTravel",
]

_IG_CATEGORY_POOL = {
    "food":         ["IndianFood", "IndianStreetFood", "IndianCuisine"],
    "festivals":    ["IndianFestivals", "FestivalsOfIndia", "DesiFestivals"],
    "activities":   ["IndianAdventures", "AdventureIndia", "IndianTrails"],
    "seasons":      ["SeasonalTravel", "MonsoonTravel", "IndianClimate"],
    "mood_shots":   ["IndianTravelDiaries", "DesiTravel", "TravelBharat"],
    "collections":  ["TravelCollection", "IndianRoadtrip", "DiscoverIndia"],
    "score_card":   ["VerifiedTravel", "ScoredDestinations", "TravelData"],
    "reel":         ["TravelReels", "ReelsOfIndia", "IndianTravelReels"],
    "yt_short":     ["TravelShorts", "IndianTravelShorts", "Shorts"],
    "tourist_trap": ["TouristTrapAlert", "IndianTravelTips", "TravelSmart"],
    "budget":       ["BudgetTravelIndia", "AffordableTravel", "TravelOnBudget"],
    "kids":         ["FamilyTravelIndia", "KidsTravelIndia", "FamilyAdventure"],
    "festival":     ["IndianFestivals", "FestivalsOfIndia", "DesiFestivals"],
    "pomelli":      ["VerifiedTravel", "DataDrivenTravel", "TravelIntel"],
    "canva":        ["IndianTravelDiaries", "DesiTravel", "TravelCollection"],
    "flow_story":   ["IndianLandscapes", "TravelMoments", "DesiTravel"],
}


def _build_ig_hashtags(dest_name: str | None = None,
                       state_name: str | None = None,
                       category: str | None = None,
                       max_tags: int = 18) -> str:
    """Build a 15-20 tag hashtag block for Instagram captions.

    Tier 1 (2026-05-10): expands from 5 → ~18 niche/branded tags to improve IG
    discoverability.  Pool order: dest-specific → state-specific → category
    niche → safe broad-Indian-travel → branded.  Broad tags like #travel are
    intentionally absent (sanitiser strips them; brand rule).
    """
    tags: list[str] = []

    def _push(t: str) -> None:
        if not t:
            return
        if t not in tags and len(tags) < max_tags:
            tags.append(t)

    # 1. Destination-specific (up to 3)
    if dest_name and dest_name not in ("India", "STATE_SHOWCASE", "EDITORIAL", "GENERIC"):
        clean = dest_name.replace(" ", "").replace("-", "").replace("&", "").replace(",", "")
        if clean:
            _push(clean)
            _push(f"{clean}Travel")
            _push(f"Visit{clean}")

    # 2. State-specific (up to 3)
    if state_name and state_name not in ("India", "STATE_SHOWCASE", "EDITORIAL", "GENERIC"):
        clean_state = state_name.replace(" ", "").replace("&", "And").replace("-", "")
        if clean_state:
            _push(clean_state)
            _push(f"{clean_state}Travel")
            _push(f"{clean_state}Tourism")

    # 3. Category niche (up to 3)
    cat_key = (category or "").lower()
    cat_tags = _IG_CATEGORY_POOL.get(cat_key, [])
    for t in cat_tags[:3]:
        _push(t)

    # 4. Safe niche-Indian-travel pool (top up to ~14)
    for t in _IG_NICHE_POOL:
        if len(tags) >= max_tags - 4:
            break
        _push(t)

    # 5. Branded (last 4 slots)
    for t in _IG_BRAND_POOL:
        _push(t)

    return " ".join(f"#{t}" for t in tags[:max_tags])


def _strip_url_for_ig(caption: str, platform: str,
                      replacement: str = "📲 Full data → link in bio") -> str:
    """Replace the '→ http(s)://nakshiq.com…' line with link-in-bio CTA when
    posting to Instagram.  IG renders caption URLs as plain text (unclickable)
    so they add clutter; FB and YT keep the URL intact.
    """
    if platform != "instagram" or not caption:
        return caption
    import re as _re
    pattern = _re.compile(
        r'^(?:→\s*)?(?:https?://)?(?:www\.)?nakshiq\.com[^\n]*\n?',
        _re.MULTILINE,
    )
    if not pattern.search(caption):
        return caption
    # Replace first match with the link-in-bio CTA, drop subsequent URL lines.
    first_replaced = [False]
    def _sub(m):  # noqa: ANN001
        if first_replaced[0]:
            return ""
        first_replaced[0] = True
        return f"{replacement}\n"
    out = pattern.sub(_sub, caption)
    # Collapse any tripled blank lines created by the strip.
    out = _re.sub(r'\n{3,}', '\n\n', out)
    return out


_IG_ENGAGEMENT_CTAS = {
    "reel":         "💾 Save this — the timing window closes faster than you think.",
    "reel_map":     "💾 Save this map for your next trip planning session.",
    "canva":        "💬 Comment which one fits your trip — we'll DM you the data.",
    "pomelli":      "📌 Save for trip planning. Tag a travel buddy below.",
    "flow_story":   "💾 Save this — pull it up when you're booking.",
    "yt_short":     "💾 Save for later. Comment your next destination.",
    "feed_post":    "💾 Save this — refer back when you plan your trip.",
}


def _add_ig_engagement_cta(caption: str, platform: str, kind: str) -> str:
    """Inject a saves/comments-bait line above the hashtag block when posting
    to Instagram.  Saves and comments are IG's #1 ranking signals as of 2025/26.
    No-op for FB / YT (their feed mechanics differ; CTAs would feel forced).
    """
    if platform != "instagram" or not caption:
        return caption
    cta = _IG_ENGAGEMENT_CTAS.get(kind)
    if not cta:
        return caption
    if cta in caption:
        return caption
    # Insert above trailing hashtag block ("…\n\n#tag1 #tag2 …")
    import re as _re
    m = _re.search(r'\n\n#[A-Za-z0-9_ ]+(?:\s|$)', caption)
    if m:
        return caption[:m.start()] + f"\n\n{cta}" + caption[m.start():]
    return caption.rstrip() + f"\n\n{cta}"


# Brand-voice guardrails. Captions are passed through sanitize() before publishing
# so these phrases/hashtags never reach the platforms.
BANNED_PHRASES = [
    "hidden gem", "hidden gems",
    "curated",
    "offbeat paradise",
    "must-visit", "must visit",
    "bucket list",
    "wanderlust",
    "explore the unexplored",
    "breathtaking",
    "stunning paradise",
]
BANNED_HASHTAGS = {"HiddenIndia", "OffbeatIndia"}

# ─────────────────────────────────────────────────────────────────────────────
# PER-PLATFORM VOICE MATRIX — see docs/social-playbook.md
# Applied after the per-format copy_* function emits its caption. Keeps the
# data identical across platforms but enforces caption length, emoji count,
# hashtag count, and CTA pattern per the playbook. Conservative defaults so
# this layer never destroys signal — it only trims.
# ─────────────────────────────────────────────────────────────────────────────

PLATFORM_VOICE = {
    "instagram": {
        "max_words":       120,
        "max_emoji":       2,
        "max_hashtags":    18,
        "cta_pattern":     "→ nakshiq.com/destination/{slug}",
    },
    "facebook": {
        "max_words":       100,
        "max_emoji":       3,
        "max_hashtags":    6,
        "cta_pattern":     "→ nakshiq.com/destination/{slug}",
    },
    "yt_shorts": {
        # YT description-side caption; description is short, hooky.
        "max_words":       90,
        "max_emoji":       1,
        "max_hashtags":    5,
        "cta_pattern":     "→ nakshiq.com",   # YT punishes off-platform links
    },
    "reels": {
        "max_words":       70,
        "max_emoji":       0,
        "max_hashtags":    8,
        "cta_pattern":     "→ link in bio",
    },
}

# Platform synonyms used elsewhere in the codebase. Normalised before lookup
# so call-sites can pass "ig", "fb", "yt", "yts", "yt_short", "reel", etc.
_PLATFORM_ALIASES = {
    "ig": "instagram", "instagram": "instagram",
    "fb": "facebook", "facebook": "facebook",
    "yt": "yt_shorts", "yts": "yt_shorts", "yt_short": "yt_shorts",
    "yt_shorts": "yt_shorts", "youtube_shorts": "yt_shorts", "youtube": "yt_shorts",
    "reel": "reels", "reels": "reels",
}

CONTRARIAN_PAIRS = [
    ("Mussoorie",   "Dhanaulti"),
    ("Nainital",    "Bhimtal"),
    ("Manali",      "Tirthan Valley"),
    ("Shimla",      "Chaukori"),
    ("Kasol",       "Jibhi"),
    ("Pahalgam",    "Achabal"),
    ("Dharamshala", "Chamba"),
]

CONTRARIAN_KEYWORDS = [
    "fewer", "without", "alternative", "quiet", "no crowd",
    "30 years", "credit for", "promises but", "before instagram",
    "the real", "overrated", "what manali was", "used to be",
]

# Audience tags — inferred from destination fields so each post can be targeted
# at a specific traveler segment. A single destination may carry multiple tags.
# Used by the evening scheduler to filter the pool before picking.
AUDIENCE_TAGS = (
    "backpackers", "families", "adventurers",
    "international", "spiritual", "weekenders",
    "luxury", "solo_female",
)

AUDIENCE_KEYWORDS = {
    "backpackers":   ["budget", "hostel", "backpack", "cheap", "low-cost",
                      "cafe culture", "under ₹", "affordable"],
    "families":      [],  # purely rule-based (difficulty + elevation), see below
    "adventurers":   ["trek", "trekking", "rafting", "ski", "skiing",
                      "paragliding", "bungee", "climb", "climbing",
                      "expedition", "summit", "high altitude"],
    "international": ["unesco", "world heritage", "iconic", "famous",
                      "beatles", "dalai lama", "buddhist", "taj",
                      "world's highest", "visa on arrival"],
    "spiritual":     ["temple", "ashram", "pilgrim", "sacred",
                      "jyotirlinga", "gurdwara", "monastery", "dargah",
                      "kumbh", "char dham", "kedarnath", "chardham"],
    "weekenders":    ["weekend", "2-day", "3-day", "gateway",
                      "from delhi", "from mumbai", "from bangalore",
                      "from kolkata", "driveable"],
    "luxury":        ["heritage hotel", "palace", "five-star", "5-star",
                      "spa", "wellness retreat", "exclusive"],
    # Solo Female Travelers — the 5th audience segment from Playbook 1.4
    # Heuristic: safe, well-populated, established tourist circuits with
    # good network coverage and medical access. Excludes extreme remote.
    "solo_female":   ["solo-friendly", "safe for women", "women travelers",
                      "hostel culture", "cafe culture", "yoga",
                      "well-trodden", "backpacker hub", "expat community"],
}


def infer_audience_tags(dest: dict) -> set:
    """
    Return the set of audience tags that apply to a destination, inferred from
    difficulty, elevation, and keyword hits in tagline + note.
    """
    tags = set()
    diff    = (dest.get("difficulty") or "").lower()
    elev    = dest.get("elevation_m") or 0
    blob    = ((dest.get("tagline") or "") + " "
               + (dest.get("note") or "")).lower()

    # Rule-based: families
    # Easy + not-too-high + no scary keywords
    scary = ["risk", "dangerous", "treacherous", "remote",
             "no network", "no signal", "hard to reach"]
    if diff == "easy" and elev < 2500 and not any(s in blob for s in scary):
        tags.add("families")

    # Rule-based: adventurers (hard difficulty OR high altitude)
    if diff == "hard" or elev > 3000:
        tags.add("adventurers")

    # Keyword-based: everything else
    for tag, kws in AUDIENCE_KEYWORDS.items():
        if tag == "families":
            continue  # already handled
        if any(kw in blob for kw in kws):
            tags.add(tag)

    # Rule-based: solo_female — conservative heuristic, picks established
    # backpacker circuits + well-populated destinations (not remote). The
    # assumption: high score + low-to-moderate difficulty + known "backpacker"
    # or "spiritual" circuit = safer for women traveling alone. This is
    # imperfect — on-the-ground vetting should override in a future iteration.
    score = dest.get("score", 0) or 0
    well_known = any(kw in blob for kw in
                     ["popular", "tourist circuit", "expat", "established",
                      "backpacker", "hostel", "cafe", "well-trodden"])
    if (diff in ("easy", "moderate")
        and elev < 3500
        and score >= 4
        and ("backpackers" in tags or "spiritual" in tags or well_known)):
        tags.add("solo_female")

    # Default fallback: if nothing matched and it's a scored 5/5 destination,
    # tag as "international" so it's always eligible for something.
    if not tags and dest.get("score", 0) >= 4:
        tags.add("international")

    return tags


def filter_pool_by_audience(pool: list, audience_tag: str) -> list:
    """Filter destinations to those carrying `audience_tag`. Falls back to
    the unfiltered pool if the filter would empty it."""
    if not audience_tag or audience_tag not in AUDIENCE_TAGS:
        return pool
    matching = [d for d in pool if audience_tag in infer_audience_tags(d)]
    return matching if matching else pool

# ─────────────────────────────────────────────────────────────────────────────
# LOGGING
# ─────────────────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
    ],
)
log = logging.getLogger("nakshiq")

# ─────────────────────────────────────────────────────────────────────────────
# JSONL APPEND-ONLY STORES — post_log + theme_usage (2026-05-18)
# -----------------------------------------------------------------------------
# These two collections are append-mostly and were the only fields in
# state.json that grew over time. They were also the only fields the state-
# branch race actually mangled (wholesale-overwrite dropped per-run appends).
# Splitting them into append-only JSONL files lets:
#   (a) concurrent runs append without coordination (POSIX O_APPEND atomic)
#   (b) the workflow merge cross-run files in the worktree before pushing
#   (c) read-time dedupe + GC stay in pure Python without destructive writes
# ─────────────────────────────────────────────────────────────────────────────

def _append_jsonl(path: Path, entry: dict) -> None:
    """Atomic append of one JSON entry as a single line. POSIX guarantees
    O_APPEND writes ≤ PIPE_BUF (~4KB) are atomic — our rows are ~250B so
    concurrent appends from separate processes interleave safely.
    """
    path.parent.mkdir(parents=True, exist_ok=True)
    try:
        with open(path, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry, ensure_ascii=False, default=str) + "\n")
    except OSError as e:
        log.warning(f"[jsonl] append to {path.name} failed: {e}")


def load_post_log_jsonl() -> list[dict]:
    """Read post_log.jsonl, dedupe by (post_id, platform, timestamp), sort by ts."""
    if not POST_LOG_JSONL.exists():
        return []
    out: list[dict] = []
    seen: set = set()
    try:
        with open(POST_LOG_JSONL, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    e = json.loads(line)
                except json.JSONDecodeError:
                    continue
                key = (e.get("post_id"), e.get("platform"), e.get("timestamp"))
                if key in seen:
                    continue
                seen.add(key)
                out.append(e)
    except OSError as e:
        log.warning(f"[jsonl] read post_log.jsonl failed: {e}")
        return []
    out.sort(key=lambda e: e.get("timestamp") or "")
    return out


def destinations_posted_today_jsonl() -> tuple[set, set]:
    """Fresh read of post_log.jsonl → ({dest_ids}, {media_ids}) posted *today*.

    Reads the JSONL direct on every call rather than the load-time `state`
    snapshot, so a sibling autoposter run that pushed minutes earlier is seen
    even before its state propagates through the autoposter-state branch.
    Closes the same-day double-post race that put chopta out twice on
    2026-05-20 (arrival_intel + v2_pov_slow_morning, both chopta.mp4) — the
    v2 run's state snapshot pre-dated the arrival_intel entry.
    """
    today = date.today().isoformat()
    dests: set = set()
    media: set = set()
    for e in load_post_log_jsonl():
        if (e.get("date") or "") != today:
            continue
        did = e.get("destination") or e.get("dest_id")
        if did:
            dests.add(did)
        m = e.get("media_id") or e.get("media")
        if m:
            media.add(m)
    return dests, media


def load_theme_usage_jsonl() -> dict:
    """Reconstruct {dimension: {item_id: [iso_dates]}} from JSONL events.
    Applies 90-day GC at read-time (drops items whose latest stamp is >90d old)
    so destinations featured long ago re-enter the candidate pool naturally.
    """
    if not THEME_USAGE_JSONL.exists():
        return {}
    raw: dict[str, dict[str, set]] = {}
    try:
        with open(THEME_USAGE_JSONL, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    e = json.loads(line)
                except json.JSONDecodeError:
                    continue
                dim = e.get("dimension")
                iid = e.get("item_id")
                ts = e.get("ts") or ""
                if not (dim and iid and ts):
                    continue
                raw.setdefault(dim, {}).setdefault(iid, set()).add(ts[:10])
    except OSError as e:
        log.warning(f"[jsonl] read theme_usage.jsonl failed: {e}")
        return {}
    gc_cutoff = (date.today() - timedelta(days=90)).isoformat()
    out: dict[str, dict[str, list[str]]] = {}
    for dim, items in raw.items():
        items_out: dict[str, list[str]] = {}
        for iid, stamps in items.items():
            uniq = sorted(stamps)
            if uniq and uniq[-1] >= gc_cutoff:
                items_out[iid] = uniq
        if items_out:
            out[dim] = items_out
    return out


def append_post_log_entry(entry: dict) -> None:
    """Mirror of mark_posted's post_log.append(), but to durable JSONL."""
    _append_jsonl(POST_LOG_JSONL, entry)


def append_theme_usage_entry(dimension: str, item_id: str, ts: str | None = None) -> None:
    """Append one mark_theme_used event. ts defaults to now in UTC."""
    _append_jsonl(THEME_USAGE_JSONL, {
        "dimension": dimension,
        "item_id":   item_id,
        "ts":        ts or datetime.now(timezone.utc).isoformat(),
    })


def load_posted_today_keys() -> set[str]:
    """Return today's posted account-scoped keys from the durable JSONL mirror.
    Empty set if file missing. Read-time filtering by today UTC date — file
    grows ~10-30 rows/day so even a year of history loads in <50ms.
    """
    if not POSTED_TODAY_JSONL.exists():
        return set()
    today_iso = date.today().isoformat()
    out: set[str] = set()
    try:
        with open(POSTED_TODAY_JSONL, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    e = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if e.get("date") == today_iso and e.get("key"):
                    out.add(e["key"])
    except OSError as e:
        log.warning(f"[jsonl] read posted_today.jsonl failed: {e}")
        return set()
    return out


def _mark_posted_today(state: dict, key: str) -> None:
    """Atomic mark — writes to in-memory state.posted_today AND to durable
    JSONL mirror. Use this everywhere posted_today gets stamped so the
    dedup gate survives a state.json rollback.
    """
    today_iso = date.today().isoformat()
    state.setdefault("posted_today", {})[key] = today_iso
    _append_jsonl(POSTED_TODAY_JSONL, {
        "ts":   datetime.now(timezone.utc).isoformat(),
        "date": today_iso,
        "key":  key,
    })


def _bootstrap_jsonl_from_state(state: dict) -> None:
    """One-time migration: if JSONL files are empty/missing but state.json
    has post_log/theme_usage entries (autoposter-state branch has 38+ rows),
    seed the JSONL files so the migration retains all history.
    """
    if not POST_LOG_JSONL.exists() or POST_LOG_JSONL.stat().st_size == 0:
        legacy = state.get("post_log") or []
        if legacy:
            DATA_DIR.mkdir(parents=True, exist_ok=True)
            try:
                with open(POST_LOG_JSONL, "w", encoding="utf-8") as f:
                    for e in legacy:
                        f.write(json.dumps(e, ensure_ascii=False, default=str) + "\n")
                log.info(f"[migration] bootstrapped post_log.jsonl with {len(legacy)} entries from state.json")
            except OSError as e:
                log.warning(f"[migration] post_log.jsonl bootstrap failed: {e}")
    if not THEME_USAGE_JSONL.exists() or THEME_USAGE_JSONL.stat().st_size == 0:
        themes = state.get("theme_usage") or {}
        count = sum(len(stamps) for dim in themes.values() for stamps in dim.values())
        if count:
            DATA_DIR.mkdir(parents=True, exist_ok=True)
            try:
                with open(THEME_USAGE_JSONL, "w", encoding="utf-8") as f:
                    for dim, items in themes.items():
                        for iid, stamps in items.items():
                            for s in stamps:
                                # 'ts' written as ISO date (YYYY-MM-DD) — load
                                # truncates to [:10] anyway so this is lossless.
                                f.write(json.dumps({
                                    "dimension": dim, "item_id": iid, "ts": s,
                                }, ensure_ascii=False) + "\n")
                log.info(f"[migration] bootstrapped theme_usage.jsonl with {count} entries from state.json")
            except OSError as e:
                log.warning(f"[migration] theme_usage.jsonl bootstrap failed: {e}")


# ─────────────────────────────────────────────────────────────────────────────
# STATE MANAGER
# ─────────────────────────────────────────────────────────────────────────────

def load_state() -> dict:
    defaults = {
        "last_sync":           None,
        "posted_today":        {},
        "posted_destinations": [],
        "posted_formats":      {},
        "post_log":            [],
        # theme_usage: per-dimension record of which entities have been featured
        # and when. Used by pick_oldest_unused() to guarantee content variety —
        # every selection prefers never-used items, then oldest-last-used.
        # Dimensions are created lazily as content types are introduced:
        #   destinations, collections, festivals, articles, audience_tags,
        #   routes, traps, reels (destinations used specifically in Reels).
        "theme_usage":         {},
        # 2026-05-17 (Tier 7 Phase 1.1): operator-curated runtime block list
        # with ISO expiry per entry. Without an explicit default, save_state
        # writes the state without this key, then the next load can't tell
        # whether the field was wiped or never set — so a manual edit could
        # silently vanish (caught 2026-05-16: my manual block of pahalgam
        # got overwritten and pahalgam re-posted same evening).
        # The DURABLE block list is HARDCODED_DEST_BLOCKS (module constant);
        # this state-based map is for runtime/operator additions on top.
        "manual_skip_dests":   {},
    }
    if STATE_FILE.exists():
        with open(STATE_FILE, encoding="utf-8") as f:
            state = json.load(f)
        # Backfill any missing keys so callers never hit KeyError
        for k, v in defaults.items():
            state.setdefault(k, v)
        # Drop posted_today entries whose date is more than 1 day stale.
        # Pre-existing keys like "jUmP2_yt_short: 2026-04-20" lingered for
        # 16 days because rotation only resets when the same key fires again
        # — that left the daily 2/2 cap permanently active for accounts
        # whose Shorts cron silently dropped. Numeric counters (e.g.
        # "_count") aren't dates and stay untouched.
        today_iso = date.today().isoformat()
        yesterday_iso = (date.today() - timedelta(days=1)).isoformat()
        pruned = {}
        for k, v in state["posted_today"].items():
            if isinstance(v, str) and len(v) == 10 and v[4] == "-":
                if v >= yesterday_iso:
                    pruned[k] = v
            else:
                pruned[k] = v  # not a date — keep (counters etc.)
        state["posted_today"] = pruned
        # 2026-05-18: post_log + theme_usage now live in append-only JSONL
        # files. Bootstrap them from state.json on first run after this
        # migration, then read JSONL as source of truth on every load.
        # state.json's copy stays as an in-run mirror so existing readers
        # (post_fingerprints, current_month_posted_destinations, theme_bucket)
        # don't have to be rewritten — they read from the same dict shape.
        _bootstrap_jsonl_from_state(state)
        jsonl_log = load_post_log_jsonl()
        if jsonl_log:
            state["post_log"] = jsonl_log
        jsonl_themes = load_theme_usage_jsonl()
        if jsonl_themes:
            state["theme_usage"] = jsonl_themes
        # 2026-05-20: merge durable posted_today.jsonl into state — survives
        # state.json rollback (analytics-sync race observed 2026-05-19 17:17 UTC).
        for k in load_posted_today_keys():
            if state["posted_today"].get(k) != today_iso:
                state["posted_today"][k] = today_iso
        return state
    # First-ever run: still produce the JSONL files so subsequent loads see them.
    _bootstrap_jsonl_from_state(defaults)
    return defaults

def save_state(state: dict):
    """Atomic state write. write→fsync→rename so a kill -9 mid-write can't
    leave state.json truncated and lose posted_today (root cause of the
    May-4 duplicate-post cascade).
    """
    tmp_path = STATE_FILE.with_suffix(STATE_FILE.suffix + ".tmp")
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, default=str, ensure_ascii=False)
        f.flush()
        os.fsync(f.fileno())
    os.replace(tmp_path, STATE_FILE)

def already_posted_today(state: dict, key: str) -> bool:
    """Belt-and-braces dedup gate. Checks in-memory state first, then falls
    back to the durable JSONL mirror — so a state.json rollback (cron race)
    can't trick the gate into thinking nothing posted today.
    """
    today_iso = date.today().isoformat()
    if state.get("posted_today", {}).get(key) == today_iso:
        return True
    return key in load_posted_today_keys()

def mark_posted(state: dict, account_id: str, destination_id: str,
                fmt: str, post_id: str, platform: str, has_media: bool,
                media_id: str | None = None):
    today = date.today().isoformat()
    _mark_posted_today(state, account_id)
    state.setdefault("posted_destinations", [])
    state.setdefault("posted_formats", {})
    state.setdefault("post_log", [])
    cutoff = (date.today() - timedelta(days=14)).isoformat()
    state["posted_destinations"] = [
        d for d in state["posted_destinations"] if d["date"] >= cutoff
    ]
    # Deduplicate: only add if this dest+date combo isn't already recorded
    if not any(d["destination_id"] == destination_id and d["date"] == today
               for d in state["posted_destinations"]):
        state["posted_destinations"].append({"destination_id": destination_id, "date": today})
    if account_id not in state["posted_formats"]:
        state["posted_formats"][account_id] = []
    state["posted_formats"][account_id] = (
        state["posted_formats"][account_id][-20:] + [fmt]
    )
    # post_log carries media_id since 2026-05-05 so post_fingerprints() can
    # dedup `(dest, fmt, media)` triples on a rolling 7/30/60-day window.
    entry = {
        "timestamp":  datetime.now(timezone.utc).isoformat(),
        "date":       today,
        "platform":   platform,
        "account_id": account_id,
        "post_id":    post_id,
        "destination": destination_id,
        "format":     fmt,
        "has_media":  has_media,
        "media_id":   media_id,
    }
    state["post_log"].append(entry)
    # 2026-05-18: durable append to JSONL — state.json mirror still kept for
    # in-run reads but the JSONL is the source of truth across runs.
    append_post_log_entry(entry)
    # 2026-05-17 Tier 7 Phase 4: cap raised 500 → 2000. At ~6-10 posts/day
    # across all flows, 500 rows = ~70 days. We want a full calendar quarter
    # so current_month_posted_destinations sees deeper history and weekly
    # digest leaderboards have 90 days of format-vs-engagement data.
    state["post_log"] = state["post_log"][-2000:]

def record_publish(state: dict, *, dest_id: str | None, fmt: str,
                   post_id: str | None, platform: str,
                   media_id: str | None = None):
    """Lightweight publish-recorder for non-main flows (pomelli / canva /
    flow_story / tourist_map). They have their own theme trackers but
    historically never wrote to `posted_destinations` or `post_log`, so the
    main-loop's 14-day cooldown couldn't see what they'd already posted —
    that's how Manali ended up in score_card on Monday + pomelli on Tuesday.

    This appends a minimal post_log entry + (when dest_id is known) extends
    posted_destinations so the main loop's `recently_used_destinations` set
    and the new `post_fingerprints()` helper both have full cross-flow data.
    """
    today = date.today().isoformat()
    state.setdefault("post_log", [])
    state.setdefault("posted_destinations", [])
    cutoff = (date.today() - timedelta(days=14)).isoformat()
    # GC posted_destinations
    state["posted_destinations"] = [
        d for d in state["posted_destinations"] if (d.get("date") or "") >= cutoff
    ]
    if dest_id and not any(
        d.get("destination_id") == dest_id and d.get("date") == today
        for d in state["posted_destinations"]
    ):
        state["posted_destinations"].append({"destination_id": dest_id, "date": today})
    entry = {
        "timestamp":   datetime.now(timezone.utc).isoformat(),
        "date":        today,
        "platform":    platform,
        "post_id":     post_id,
        "destination": dest_id,
        "format":      fmt,
        "media_id":    media_id,
    }
    state["post_log"].append(entry)
    # 2026-05-18: durable JSONL append (race-safe, see POST_LOG_JSONL block).
    append_post_log_entry(entry)
    # Cap raised 500 → 2000 to retain ~90 days of cross-flow history (Phase 4).
    state["post_log"] = state["post_log"][-2000:]


def post_fingerprints(state: dict, *, dest_days: int = 7,
                      fmt_days: int = 30, media_days: int = 60) -> dict:
    """Tier-2 fingerprint dedup. Returns three sets of recently-used identifiers
    so callers can reject candidate `(dest_id, fmt, media_id)` triples and
    structurally guarantee no repeat within the rolling windows.

    Why three windows: a destination can legitimately reappear in 7 days under
    a different format (score_card → eateries_pick), the same `(dest, fmt)`
    pair should not, and the exact media_id (image/video file) should not
    repeat for 60 days. Tunable per the cost-aware operating rules.
    """
    today = date.today()
    dest_cut  = (today - timedelta(days=dest_days)).isoformat()
    fmt_cut   = (today - timedelta(days=fmt_days)).isoformat()
    media_cut = (today - timedelta(days=media_days)).isoformat()

    log_entries = state.get("post_log", []) or []

    used_dests:    set = set()
    used_dest_fmt: set = set()  # tuples of (dest_id, fmt)
    used_media:    set = set()
    # 2026-05-16: once-per-calendar-month rule — see current_month_posted_destinations()
    month_prefix = today.strftime("%Y-%m")

    for e in log_entries:
        d = e.get("date") or ""
        did   = e.get("destination") or e.get("dest_id")
        fmt   = e.get("format")
        media = e.get("media_id") or e.get("media")
        if did and (d >= dest_cut or d.startswith(month_prefix)):
            used_dests.add(did)
        if did and fmt and d >= fmt_cut:
            used_dest_fmt.add((did, fmt))
        if media and d >= media_cut:
            used_media.add(media)
    # Honour manual operator-curated blocks (state["manual_skip_dests"])
    for did, expiry in (state.get("manual_skip_dests") or {}).items():
        if not expiry or expiry >= today.isoformat():
            used_dests.add(did)
    # 2026-05-17: hardcoded code-level blocks (durable, can't be wiped).
    used_dests |= hardcoded_block_dests()
    return {"dests": used_dests, "dest_fmt": used_dest_fmt, "media": used_media}


# ─────────────────────────────────────────────────────────────────────────────
# HARDCODED DESTINATION BLOCK LIST (added 2026-05-17, durable block)
# -----------------------------------------------------------------------------
# Why this is hardcoded in the module instead of state.json:
# 2026-05-16 attempt at state-based blocks (manual_skip_dests) was silently
# WIPED by the next autoposter save_state cycle — Pahalgam re-posted the same
# evening despite explicit block. Root cause: state-branch race + save_state
# overwrites everything. A code constant survives every state rewrite because
# it's loaded fresh from the Python module on every run.
#
# Format: {dest_id: ISO_expiry_date}. Edit + git push to add/remove. The
# autoposter loads this on every run, so the block takes effect at the next
# cron fire.
#
# User complaints addressed:
#   - 2026-05-16: tehri, pahalgam (re-posted 5+ times in May)
#   - 2026-05-17: parvati-valley + tehri-lake video repeats on YT/IG
# Add a dest here when the user flags repetition. Remove when the expiry
# date passes naturally (or delete the entry to unblock manually).
# ─────────────────────────────────────────────────────────────────────────────
HARDCODED_DEST_BLOCKS: dict[str, str] = {
    "tehri":          "2026-06-01",  # user flag 2026-05-16
    "tehri-lake":     "2026-06-01",  # slug variant
    "pahalgam":       "2026-06-01",  # user flag 2026-05-16 (re-posted same day)
    "parvati-valley": "2026-06-01",  # user flag 2026-05-17 (YT short repeats)
    "kasol":          "2026-06-01",  # user flag 2026-05-17 (Parvati Valley nearby)
    "kasol-parvati":  "2026-06-01",  # slug variant
    "tirthan-valley": "2026-06-01",  # user flag 2026-05-17 (posted "so many times")
    "tirthan":        "2026-06-01",  # slug variant
}


def hardcoded_block_dests() -> set:
    """Return dest_ids currently under a code-level block (HARDCODED_DEST_BLOCKS).
    Expired entries auto-release on their ISO expiry date — no manual cleanup
    needed."""
    today = date.today().isoformat()
    return {did for did, expiry in HARDCODED_DEST_BLOCKS.items()
            if not expiry or expiry > today}


def current_month_posted_destinations(state: dict) -> set:
    """Destinations posted at least once in the current calendar month.

    Enforces the **once-per-month rule** (user directive 2026-05-16):
        "If we have 50 locations in May, we should only post one location
         once, not repeat it. We are posting it multiple times."

    Sources `post_log` (capped at 500 entries ≈ 2-3 months retention) rather
    than `posted_destinations` (14-day GC) so May-1 posts are still gated on
    May-30. Includes BOTH `destination` (main loop) and `dest_id` (record_publish)
    field names — they exist in different writer paths.
    """
    month_prefix = date.today().strftime("%Y-%m")
    used: set = set()
    for e in state.get("post_log", []) or []:
        d = e.get("date") or ""
        if not d.startswith(month_prefix):
            continue
        did = e.get("destination") or e.get("dest_id")
        if did:
            used.add(did)
    # Also include manual blocks (operator-curated skip-list with ISO expiry)
    for did, expiry in (state.get("manual_skip_dests") or {}).items():
        if not expiry or expiry >= date.today().isoformat():
            used.add(did)
    # 2026-05-17: also union with hardcoded module-level blocks (durable —
    # can't be wiped by save_state). See HARDCODED_DEST_BLOCKS comment above.
    used |= hardcoded_block_dests()
    return used


def recently_used_destinations(state: dict, cutoff_days: int = 14) -> set:
    """Destinations posted in the LAST `cutoff_days` (default 14) UNIONED with
    every dest already posted in the current calendar month.

    The 14-day rolling cutoff alone was insufficient — by mid-month, a
    destination posted on day 1 falls out of the 14-day window and re-enters
    the candidate pool, which is exactly how Pahalgam ended up posted 5 times
    in May (Apr 19/27/30 + May repeats). The monthly union enforces
    once-per-month even when the rolling window has expired.

    Without a cutoff, posted_destinations grows unboundedly and within a few
    weeks every catalog dest ends up in the set, which empties the picker's
    `fresh` pool and forces deterministic max-score fallback (locking onto
    the same top-scored dest every day, e.g. Pahalgam Apr 19/27/30).
    """
    cutoff = (date.today() - timedelta(days=cutoff_days)).isoformat()
    rolling = {d["destination_id"]
               for d in state.get("posted_destinations", [])
               if (d.get("date") or "") >= cutoff}
    return rolling | current_month_posted_destinations(state)


# ─────────────────────────────────────────────────────────────────────────────
# ANTI-REPETITION THEME TRACKER
# -----------------------------------------------------------------------------
# Mechanism: `state["theme_usage"][dimension][item_id]` is a list of ISO dates
# on which that item was featured. `pick_oldest_unused` sorts by
# (never-used-first, oldest-last-use), guaranteeing every run prefers the
# content that's been off-feed the longest. When a whole dimension has been
# cycled through, it resets naturally because all items become "tied for oldest".
# ─────────────────────────────────────────────────────────────────────────────

def theme_bucket(state: dict, dimension: str) -> dict:
    """Return (and lazily create) the per-dimension usage map."""
    return state.setdefault("theme_usage", {}).setdefault(dimension, {})


def theme_last_used(state: dict, dimension: str, item_id: str) -> str | None:
    """ISO date of last use, or None if item has never been featured."""
    hist = theme_bucket(state, dimension).get(item_id) or []
    return hist[-1] if hist else None


def pick_oldest_unused(state: dict, dimension: str, items: list,
                       key: str = "id",
                       cooldown_days: int = 0,
                       exclude_ids: set | None = None) -> list:
    """
    Return `items` sorted so the oldest-never-used candidates come first.
    Callers pick [0] (or filter further).

    Sort key: (has_been_used_bool, last_used_date_iso). Never-used → (False, "")
    sorts ahead of everything; among-used items, oldest date sorts first.

    cooldown_days: if >0, items used within the last N days are demoted to the
        end of the result list (unless that would empty the list — in which
        case the cooldown is bypassed). Prevents same-day or back-to-back
        repeats even if state.theme_usage gets out of sync between modes.
    exclude_ids: set of item ids to push to the very end (last-resort fallback).
        Use this for "last picked X" memory so the picker won't repeat the
        immediately-previous selection no matter what theme_usage says.
    """
    bucket = theme_bucket(state, dimension)
    excl = exclude_ids or set()
    today = date.today()

    def _id(item):
        return item.get(key) if isinstance(item, dict) else str(item)

    def _within_cooldown(hist: list) -> bool:
        if not hist or cooldown_days <= 0:
            return False
        try:
            last = date.fromisoformat(hist[-1])
        except Exception:
            return False
        return (today - last).days < cooldown_days

    def _rank(item):
        iid = _id(item)
        hist = bucket.get(iid) or []
        excluded   = iid in excl
        in_cool    = _within_cooldown(hist)
        if not hist:
            base = (0, "")              # never used — highest priority
        else:
            base = (1, hist[-1])         # used — earlier last-use sorts first
        # Layer cooldown + exclude flags ON TOP, demoting matched items.
        return (1 if excluded else 0, 1 if in_cool else 0) + base

    # Pre-shuffle so tie-breaking is non-deterministic. Without this, items
    # with identical rank (e.g. all never-used) keep the upstream list order
    # and the picker locks onto the same head-of-list item every run with
    # the same input — observed in state.json as Munsiyari posted 2 days
    # in a row when the upstream catalog ordering was stable.
    import random as _random
    shuffled = list(items)
    _random.shuffle(shuffled)
    ranked = sorted(shuffled, key=_rank)
    return ranked


def mark_theme_used(state: dict, dimension: str, item_id: str):
    """Stamp today's date on this item in the given dimension.

    2026-05-17 (Tier 7 Phase 1.5): also GC the dimension's bucket on each
    write. Entries whose LATEST timestamp is >90 days old are dropped so a
    destination featured 12+ months ago becomes eligible again. Without GC,
    `pick_oldest_unused` saw old entries as "used forever", locking out
    destinations that should be back in the pool.
    """
    today = date.today().isoformat()
    bucket = theme_bucket(state, dimension)
    hist = bucket.setdefault(item_id, [])
    new_stamp = not hist or hist[-1] != today
    if new_stamp:
        hist.append(today)
    # Keep history bounded (365 days per item is plenty)
    bucket[item_id] = hist[-365:]

    # 2026-05-18: durable JSONL append. Only on first stamp of the day per
    # (dim, item) — keeps the file from blowing up if mark_theme_used is
    # called repeatedly in the same process. Read-side dedupes by ts[:10]
    # anyway so duplicates would be harmless, but cheaper to skip.
    if new_stamp:
        append_theme_usage_entry(dimension, item_id, ts=today)

    # GC: drop ANY item whose latest stamp is older than 90 days. Run on
    # every write but only iterates the dimension being written, so cost
    # is bounded to ~few hundred items per dimension.
    gc_cutoff = (date.today() - timedelta(days=90)).isoformat()
    stale = [iid for iid, h in bucket.items() if h and h[-1] < gc_cutoff]
    for iid in stale:
        del bucket[iid]


def mark_themes_batch(state: dict, dimension: str, items: list, key: str = "id"):
    """Bulk-stamp many items for this dimension."""
    for item in items:
        iid = item.get(key) if isinstance(item, dict) else str(item)
        if iid:
            mark_theme_used(state, dimension, iid)


def dimension_cycle_status(state: dict, dimension: str, total_catalog: int) -> dict:
    """
    Return {"used": N, "unused": M, "total": T, "oldest": date, "newest": date}
    so callers can log cycle progress.
    """
    bucket = theme_bucket(state, dimension)
    used = len(bucket)
    last_dates = [hist[-1] for hist in bucket.values() if hist]
    return {
        "used":   used,
        "unused": max(0, total_catalog - used),
        "total":  total_catalog,
        "oldest": min(last_dates) if last_dates else None,
        "newest": max(last_dates) if last_dates else None,
    }

# ─────────────────────────────────────────────────────────────────────────────
# NAKSHIQ CONTENT FETCHER
# ─────────────────────────────────────────────────────────────────────────────

def nakshiq_fetch(type_: str, extra: dict = {}) -> dict:
    try:
        r = requests.get(NAKSHIQ_BASE, params={"type": type_, **extra}, timeout=15)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        log.warning(f"Nakshiq [{type_}] fetch failed: {e}")
        return {}


def fetch_full_destination_catalog() -> list:
    """
    The Nakshiq API caps `?type=destinations&limit=N` at 100 rows regardless of N.
    Union across all 12 month buckets at min_score=0 to get the full ~431 destination
    catalog so festival_alert can resolve home destinations that aren't in the
    current month's top-scored slice (e.g. Amritsar in April, Kedarnath in winter).
    """
    union: dict = {}
    for m in range(1, 13):
        try:
            r = requests.get(NAKSHIQ_BASE,
                             params={"type": "destinations",
                                     "month": m,
                                     "min_score": 0,
                                     "limit": 100},
                             timeout=15)
            r.raise_for_status()
            for d in r.json().get("data", []):
                did = d.get("id")
                if did and did not in union:
                    union[did] = d
        except Exception as e:
            log.warning(f"destinations_full month={m} fetch failed: {e}")
    return list(union.values())


def filter_active_festivals(fests: list, today=None) -> list:
    """
    Drop festivals that are clearly past:
      • Same-month festivals where we have a known end-day in KNOWN_FESTIVAL_END_DAYS
        and today.day > end_day
      • Same-month festivals with no known end-day, where today.day > FESTIVAL_PLANNING_CUTOFF_DAY
        (mid-month cutoff — past day 14 we prefer next month's festivals)
    Future-month festivals (festival.month != current month) always pass through.
    Festivals with no integer `month` field always pass through (defensive).
    """
    if today is None:
        today = date.today()
    cur_m, cur_d = today.month, today.day
    out = []
    dropped = []
    for f in fests or []:
        fm = f.get("month")
        if not isinstance(fm, int):
            out.append(f)
            continue
        if fm != cur_m:
            out.append(f)        # different month → assume upcoming
            continue
        # Same month: check if past
        nm = (f.get("name") or "").strip().lower()
        end_day = KNOWN_FESTIVAL_END_DAYS.get(nm)
        if end_day is not None:
            if cur_d <= end_day:
                out.append(f)
            else:
                dropped.append(f.get("name") or nm)
        else:
            if cur_d <= FESTIVAL_PLANNING_CUTOFF_DAY:
                out.append(f)
            else:
                dropped.append(f.get("name") or nm)
    if dropped:
        log.info(f"Festivals filtered (past/post-window): {', '.join(dropped[:8])}"
                 + (f" (+{len(dropped)-8} more)" if len(dropped) > 8 else ""))
    return out

def sync_all_content() -> dict:
    log.info("── Syncing Nakshiq content ──────────────────────────────")
    month      = datetime.now().month
    next_month = (month % 12) + 1
    since = (date.today() - timedelta(days=7)).isoformat()
    content = {
        "stats":        nakshiq_fetch("stats"),
        "destinations": nakshiq_fetch("destinations", {"month": month, "min_score": 4}),
        # Skip List / Tourist-Trap posts need destinations scoring LOW this month.
        # Fetch a wider slice (limit=100) so the low-scored tail is captured —
        # default limit=20 tends to surface only 5/5 destinations in peak months.
        "destinations_low": nakshiq_fetch("destinations",
                                          {"month": month, "min_score": 0, "limit": 100}),
        # Full catalog — unioned across all 12 month buckets because the API
        # caps `limit` at 100 rows. This lets festival_alert look up home
        # destinations that aren't in the current month's top-scoring slice
        # (e.g. Amritsar for Baisakhi, Kedarnath for the May opening, etc.).
        "destinations_full": {"data": fetch_full_destination_catalog()},
        "articles":     nakshiq_fetch("articles",     {"since": since}),
        "traps":        nakshiq_fetch("traps"),
        "festivals":    nakshiq_fetch("festivals",    {"month": month}),
        # Next month's festivals — once we're past mid-month the rotation
        # prefers these over (potentially-past) current-month festivals.
        "festivals_next": nakshiq_fetch("festivals",  {"month": next_month}),
        "collections":  nakshiq_fetch("collections"),
        # Tier-2 content sources (added 2026-05-05). The /api/content endpoint
        # gained `routes`, `treks`, `eateries` types in the same commit. Each
        # is filtered by the current month server-side where applicable.
        "routes":       nakshiq_fetch("routes",       {"month": month, "limit": 50}),
        "treks":        nakshiq_fetch("treks",        {"month": month, "limit": 50}),
        "eateries":     nakshiq_fetch("eateries",     {"limit": 100}),
        # Tier 6 (2026-05-10) — close coverage gap on stays / emergency / viral
        # eats / camping / hidden gems verticals. Each backed by /api/content
        # types added in the same commit.
        "stays":        nakshiq_fetch("stays",        {"limit": 100}),
        "emergency":    nakshiq_fetch("emergency",    {"limit": 100}),
        "viral_eats":   nakshiq_fetch("viral_eats",   {"limit": 100}),
        "camping":      nakshiq_fetch("camping",      {"month": month, "limit": 50}),
        "hidden_gems":  nakshiq_fetch("hidden_gems",  {"limit": 50}),
        # Tier 7 Phase 2 (2026-05-17) — restored variety + 3 new verticals.
        "arrival":      nakshiq_fetch("arrival",      {"limit": 20}),
        "cost_index":   nakshiq_fetch("cost_index",   {"month": month, "limit": 100}),
        "women_solo":   nakshiq_fetch("women_solo",   {"month": month, "limit": 100}),
    }
    # Keep TOTAL_DESTINATIONS in sync with the real catalog size.
    global TOTAL_DESTINATIONS
    stats_total = (content.get("stats") or {}).get("data", {}).get("destinations")
    if isinstance(stats_total, int) and stats_total > 0:
        TOTAL_DESTINATIONS = stats_total
    log.info(
        f"Synced → {len(content['destinations'].get('data',[]))} destinations · "
        f"{len(content['traps'].get('data',[]))} traps · "
        f"{len(content['articles'].get('data',[]))} articles · "
        f"{len(content['routes'].get('data',[]))} routes · "
        f"{len(content['treks'].get('data',[]))} treks · "
        f"{len(content['eateries'].get('data',[]))} eateries · "
        f"{len(content['stays'].get('data',[]))} stays · "
        f"{len(content['emergency'].get('data',[]))} sos · "
        f"{len(content['viral_eats'].get('data',[]))} viral · "
        f"{len(content['camping'].get('data',[]))} camping · "
        f"{len(content['hidden_gems'].get('data',[]))} gems · "
        f"total catalog={TOTAL_DESTINATIONS}"
    )
    return content

def check_video_available(dest: dict) -> str | None:
    """Returns video URL if the MP4 actually exists, else None."""
    video_url = dest.get("video")
    if not video_url:
        return None
    try:
        r = requests.head(video_url, timeout=8, allow_redirects=True)
        ct = r.headers.get("content-type", "")
        if r.status_code == 200 and "video" in ct:
            return video_url
    except Exception:
        pass
    return None


def check_image_available(dest: dict, content: dict | None = None) -> bool:
    """
    Returns True if the destination's hero image URL actually resolves with a
    200 response. Results are cached per-run in content['__image_valid__'] so
    we don't re-HEAD the same URL multiple times.

    Nakshiq's catalog is still growing — some destinations advertise image
    paths that 404. Carousel builders call this to skip those gracefully.
    """
    url = (dest.get("image") or "").strip()
    if not url:
        return False

    cache = content.setdefault("__image_valid__", {}) if content is not None else None
    if cache is not None and dest["id"] in cache:
        return cache[dest["id"]]

    ok = False
    try:
        r  = requests.head(url, timeout=8, allow_redirects=True)
        ct = r.headers.get("content-type", "")
        ok = (r.status_code == 200 and "image" in ct)
    except Exception:
        ok = False

    if cache is not None:
        cache[dest["id"]] = ok
    return ok

# ─────────────────────────────────────────────────────────────────────────────
# CONTENT SELECTOR
# ─────────────────────────────────────────────────────────────────────────────

def contrarian_score(dest: dict) -> float:
    combined = ((dest.get("tagline") or "") + " " + (dest.get("note") or "")).lower()
    return sum(1.0 for kw in CONTRARIAN_KEYWORDS if kw in combined)

def pick_best_destination(destinations: list, used: set,
                          content: dict | None = None,
                          state: dict | None = None) -> dict | None:
    """
    Pick the highest-scoring destination from the pool, preferring ones whose
    hero image actually resolves (Nakshiq's catalog has broken image URLs for
    some not-yet-photographed destinations). If nothing in the pool has a valid
    image, fall back to the original scoring pool without the image filter.

    When `state` is provided, the function also consults reel theme trackers
    (reel_seasonal_dests, reel_reveal_dests, reels) so that a destination
    featured in a reel within the last 14 days is treated as "used" for feed
    picking too. Prevents cross-format repeats (e.g. Bhimtal reel yesterday +
    Bhimtal score_card today). Wrapped in try/except so any tracker corruption
    fails open — the feed picker still works, just without the extra guard.
    """
    extra_used: set = set()
    if state is not None:
        try:
            cutoff = (date.today() - timedelta(days=14)).isoformat()
            for bucket_name in ("reel_seasonal_dests", "reel_reveal_dests", "reels"):
                bucket = (state.get("theme_usage") or {}).get(bucket_name, {}) or {}
                for dest_id, hist in bucket.items():
                    if hist and hist[-1] >= cutoff:
                        extra_used.add(dest_id)
        except Exception as e:
            log.warning(f"pick_best_destination: reel-tracker guard skipped ({e})")
            extra_used = set()

    combined_used = used | extra_used
    fresh = [d for d in destinations if d["id"] not in combined_used]
    # If the extra guard emptied the pool, fall back to the original 14-day
    # `used` filter (never all destinations — that would re-pick today's post).
    if not fresh:
        fresh = [d for d in destinations if d["id"] not in used]
    pool  = fresh if fresh else destinations
    if not pool:
        return None

    # Prefer destinations with a verified image; fall back if none qualify.
    if content is not None:
        valid_image_pool = [d for d in pool if check_image_available(d, content)]
        if valid_image_pool:
            pool = valid_image_pool

    # Ranking strategy:
    #   1) Oldest-never-featured first (anti-repetition is the LOAD-BEARING goal).
    #      Score is only a tiebreaker WITHIN equal-staleness candidates.
    #
    # Previous design used max(score)+bonuses, which is deterministic and locks
    # onto the same top-scored dest every run as soon as the 14-day `fresh`
    # filter empties (e.g. Pahalgam picked Apr 19, 27, 30 in a row).
    if state is not None:
        try:
            # Also exclude the dest that was JUST locked as shared_best last run,
            # in case state.theme_usage.destinations is out-of-sync.
            last_best = (state.get("last_picked", {}) or {}).get("shared_best")
            ordered = pick_oldest_unused(
                state, "destinations", pool, key="id",
                cooldown_days=14,
                exclude_ids={last_best} if last_best else None,
            )
        except Exception as e:
            log.warning(f"pick_best_destination: oldest-unused sort skipped ({e})")
            ordered = pool
    else:
        ordered = pool

    # Among the top stale-tier (head of `ordered`), break ties with score+bonuses.
    bucket = (state or {}).get("theme_usage", {}).get("destinations", {}) if state else {}
    def _stale_key(d):
        hist = bucket.get(d["id"]) or []
        return (1, hist[-1]) if hist else (0, "")
    if ordered:
        top_stale = _stale_key(ordered[0])
        head = [d for d in ordered if _stale_key(d) == top_stale]
    else:
        head = pool

    return max(head, key=lambda d: (
        d.get("score", 0)
        + contrarian_score(d) * 0.5
        + (0.3 if d.get("note") else 0)
        + (0.2 if d.get("image") else 0)
        + (0.4 if d.get("video") else 0)   # bonus for video content
    ))

def pick_format(weekday: int, traps: list) -> str:
    """Legacy weekday picker — fallback only."""
    if date.today().day <= 7 and weekday == 0:
        return "monthly_forecast"
    fmt = _LEGACY_FORMAT_SCHEDULE.get(weekday, "score_card")
    if fmt == "tourist_trap" and not traps:
        fmt = "reality_check"
    return fmt


def asset_backed_csv_dests(content: dict) -> list:
    """Full-catalog dest rows that have a purpose-built Phase-2 CSV asset on disk.

    CSV eligibility + the render dispatcher normally iterate only the ~20-dest
    current-month scored pool, so a format-specific asset named
    {format_id}-{dest_slug}.{ext} for a dest OUTSIDE that slice is never seen —
    the format stays dormant however many assets exist. This pulls every such
    dest from the full ~505-catalog so the asset opts its format in regardless
    of whether the dest landed in today's scored slice.

    Only format-specific assets count. State-keyed assets
    ({format_id}-{state_slug}) resolve to no dest here and are skipped — they
    already match any in-pool dest of that state via the loader's state-slug
    fallback. Generic {dest_slug}.{ext} images are skipped too (no format id).
    """
    specs = get_csv_specs()
    if not specs or not SOCIAL_IMAGE_LIBRARY_DIR.exists():
        return []
    full = content.get("destinations_full", {}).get("data", []) or []
    by_slug = {(d.get("id") or "").lower(): d for d in full if d.get("id")}
    seen: dict = {}
    for f in SOCIAL_IMAGE_LIBRARY_DIR.iterdir():
        if f.suffix.lower() not in (".jpg", ".png", ".mp4"):
            continue
        stem = f.stem
        if "-" not in stem:
            continue
        # Format-ids contain underscores only — never hyphens — so the first
        # hyphen is the format_id <-> dest_slug boundary.
        fid, slug = stem.split("-", 1)
        if fid not in specs:
            continue
        for suf in ("-feed", "-story"):
            if slug.endswith(suf):
                slug = slug[: -len(suf)]
        d = by_slug.get(slug)
        if d and d["id"] not in seen:
            seen[d["id"]] = d
    return list(seen.values())


def eligible_csv_formats(content: dict, dests: list) -> list:
    """Feed-eligible CSV (v2/v3/v4) format-ids that can post this run.

    A format is eligible when at least one candidate dest passes
    _csv_fmt.is_eligible (caption placeholders resolve + a matching asset is
    on disk). Candidate dests = the current scored pool (score>=4) PLUS the
    asset-backed dests from asset_backed_csv_dests() — an asset on disk is an
    explicit editorial opt-in, so asset-backed dests skip the score gate.
    """
    specs = get_csv_specs()
    if not specs:
        return []
    backed = asset_backed_csv_dests(content)
    out = []
    for fid, spec in specs.items():
        if not spec.is_feed_format:
            continue
        hit = False
        for d in dests:
            if (d.get("score") or 0) < 4:
                continue
            ok, _r = _csv_fmt.is_eligible(spec, d, SOCIAL_IMAGE_LIBRARY_DIR)
            if ok:
                hit = True
                break
        if not hit:
            for d in backed:
                ok, _r = _csv_fmt.is_eligible(spec, d, SOCIAL_IMAGE_LIBRARY_DIR)
                if ok:
                    hit = True
                    break
        if hit:
            out.append(fid)
    return out


def pick_morning_format(state: dict, content: dict) -> str:
    """
    Pick the oldest-never-used morning format via strict round-robin.
    No format repeats until ALL 18 have been cycled through.
    """
    try:
        traps    = content.get("traps", {}).get("data", [])
        # Festival eligibility: combine current + next month and apply the
        # past-festival filter so we don't keep festival_alert eligible on a
        # pool of already-completed festivals.
        fests    = filter_active_festivals(
            (content.get("festivals", {}).get("data", []) or [])
            + (content.get("festivals_next", {}).get("data", []) or []),
            date.today(),
        )
        articles = content.get("articles", {}).get("data", [])
        colls    = content.get("collections", {}).get("data", [])
        dests    = content.get("destinations", {}).get("data", [])

        # Build eligible list — skip formats whose data preconditions fail
        eligible = []
        for fmt in MORNING_FORMATS:
            if fmt == "tourist_trap" and not traps:
                continue
            if fmt == "festival_alert" and not fests:
                continue
            if fmt == "blog_promo" and not articles:
                continue
            if fmt == "collection_spotlight" and not colls:
                continue
            # Comparison formats need at least 2 qualifying destinations
            if fmt == "elevation_face_off":
                hi = [d for d in dests if (d.get("score") or 0) >= 4
                      and (d.get("elevation_m") or 0) > 3000]
                lo = [d for d in dests if (d.get("score") or 0) >= 4
                      and (d.get("elevation_m") or 0) < 1500]
                if not hi or not lo:
                    continue
            if fmt == "state_showdown":
                states = set(d.get("state", "") for d in dests if (d.get("score") or 0) >= 4)
                if len(states) < 2:
                    continue
            if fmt == "difficulty_spectrum":
                easy = [d for d in dests if (d.get("difficulty") or "").lower() == "easy"
                        and (d.get("score") or 0) >= 4]
                hard = [d for d in dests if (d.get("difficulty") or "").lower() == "hard"
                        and (d.get("score") or 0) >= 4]
                if not easy or not hard:
                    continue
            if fmt == "underdog_spotlight":
                underdogs = [d for d in dests
                             if (d.get("score") or 0) >= 4
                             and (d.get("elevation_m") or 0) < 2000
                             and (d.get("difficulty") or "").lower() in ("easy", "moderate")]
                if not underdogs:
                    continue
            if fmt == "adventure_pick":
                adventures = [d for d in dests
                              if (d.get("score") or 0) >= 4
                              and ((d.get("difficulty") or "").lower() == "hard"
                                   or (d.get("elevation_m") or 0) > 3000)]
                if not adventures:
                    continue
            if fmt == "weekend_escape":
                escapes = [d for d in dests
                           if (d.get("score") or 0) >= 4
                           and (d.get("elevation_m") or 0) < 2500
                           and (d.get("difficulty") or "").lower() in ("easy", "moderate")]
                if not escapes:
                    continue
            # Tier 2.5 — fresh content sources. Skip silently if the API hasn't
            # returned data yet (e.g. eateries endpoint reachable but empty).
            if fmt == "eateries_pick":
                eateries = content.get("eateries", {}).get("data", []) or []
                if not eateries:
                    continue
            if fmt == "trek_intel":
                treks = content.get("treks", {}).get("data", []) or []
                if not treks:
                    continue
            # Tier 6 — close the coverage gap on stays / emergency / viral eats /
            # camping / confidence cards / collections. Each guarded by the
            # corresponding /api/content type populating in sync_all_content.
            if fmt == "stays_pick":
                stays = content.get("stays", {}).get("data", []) or []
                if not stays:
                    continue
            if fmt == "emergency_intel":
                sos = content.get("emergency", {}).get("data", []) or []
                # Floor at 5 — guarantees the round-robin doesn't lock onto the
                # same destination if the API returns a thin slice for a day.
                if len(sos) < 5:
                    continue
            if fmt == "viral_eats_pick":
                viral = content.get("viral_eats", {}).get("data", []) or []
                if not viral:
                    continue
            if fmt == "camping_intel":
                camps = content.get("camping", {}).get("data", []) or []
                if not camps:
                    continue
            if fmt == "confidence_intel":
                # Needs at least one high-scoring dest with a populated reach OR
                # network confidence card so the report-card has 2+ filled rows.
                # Fallback to score_card otherwise (no point posting an empty
                # infrastructure report).
                rich = [d for d in dests if (d.get("score") or 0) >= 4]
                if not rich:
                    continue
            if fmt == "collection_series":
                colls = content.get("collections", {}).get("data", []) or []
                # Need at least one collection with 5+ items so the mini-series
                # has enough rotation. Single-item collections become trivia.
                eligible_colls = [c for c in colls if (c.get("itemCount") or 0) >= 5]
                if not eligible_colls:
                    continue
            # 2026-05-17 Phase 2 — eligibility checks for new formats
            if fmt == "hidden_gem_reveal":
                gems = content.get("hidden_gems", {}).get("data", []) or []
                if not gems:
                    continue
            if fmt == "route_spotlight_short":
                routes = content.get("routes", {}).get("data", []) or []
                if not routes:
                    continue
            if fmt == "arrival_intel":
                airports = content.get("arrival", {}).get("data", []) or []
                if not airports:
                    continue
            if fmt == "women_solo_brief":
                ws = content.get("women_solo", {}).get("data", []) or []
                if not ws:
                    continue
            if fmt == "cost_index_card":
                ci = content.get("cost_index", {}).get("data", []) or []
                if not ci:
                    continue
            eligible.append(fmt)

        # 2026-05-20 — CSV-loaded v2/v3/v4 formats. Iterate every feed-eligible
        # spec; include only if at least one current-month-scored dest passes
        # both is_eligible checks (data fields resolve + matching asset present
        # in social_image_library/). Asset-presence is the opt-in switch, so
        # rows whose Co-work assets haven't been generated yet stay dormant
        # automatically — no env var, no manual gate.
        csv_specs = get_csv_specs()
        if csv_specs:
            csv_eligible = eligible_csv_formats(content, dests)
            eligible.extend(csv_eligible)
            if csv_eligible:
                log.info(
                    f"[csv_formats] {len(csv_eligible)}/{len(csv_specs)} "
                    f"CSV formats eligible this run "
                    f"(asset present + data resolves)"
                )

        if not eligible:
            eligible = ["score_card"]

        # 2026-05-17 Tier 7 Phase 3 — themed-week bias.
        # PRIMARY: WEEK_OF_MONTH_BIAS preferred pillars for today's week-of-month.
        # FALLBACK: under-share deficit (existing playbook discipline).
        # Final FALLBACK: full eligible pool.
        biased_pool = eligible
        chosen_pillar = None
        bias_source = "balanced"
        wom = week_of_month()
        themed_pillars = WEEK_OF_MONTH_BIAS.get(wom, [])
        for pillar in themed_pillars:
            candidates = [f for f in eligible if FORMAT_PILLARS.get(f) == pillar]
            if candidates:
                biased_pool = candidates
                chosen_pillar = pillar
                bias_source = f"themed-week-{wom}"
                break
        # Fall back to deficit-pillar if themed week didn't match anything
        # (week 5 catch-up, or themed pillar had no eligible formats today)
        if not chosen_pillar:
            deficit_pillars = under_share_pillars(state)
            for pillar in deficit_pillars:
                candidates = [f for f in eligible if FORMAT_PILLARS.get(f) == pillar]
                if candidates:
                    biased_pool = candidates
                    chosen_pillar = pillar
                    bias_source = "deficit"
                    break

        ordered = pick_oldest_unused(state, "morning_formats", biased_pool, key=None)
        chosen = ordered[0]

        status = dimension_cycle_status(state, "morning_formats", len(MORNING_FORMATS))
        if chosen_pillar:
            actual = compute_weekly_pillar_share(state).get(chosen_pillar, 0.0)
            target = target_pillar_share().get(chosen_pillar, 0.0)
            log.info(f"Morning format ({bias_source}→{chosen_pillar}): {chosen} "
                     f"[{actual:.0%} vs target {target:.0%}] "
                     f"({status['unused']}/{status['total']} never featured)")
        else:
            log.info(f"Morning format (balanced, week-{wom}): {chosen} "
                     f"({status['unused']}/{status['total']} never featured)")
        return chosen
    except Exception as e:
        log.warning(f"pick_morning_format error: {e} — fallback to score_card")
        return "score_card"

# ─────────────────────────────────────────────────────────────────────────────
# COPY WRITERS
# ─────────────────────────────────────────────────────────────────────────────

def month_name() -> str:
    return datetime.now().strftime("%B")

def hashtag(*tags: str) -> str:
    """Join tags into #tags, filtering out brand-voice-banned entries."""
    clean = [t for t in tags if t and t not in BANNED_HASHTAGS]
    return " ".join(f"#{t.replace(' ', '')}" for t in clean)


# ─────────────────────────────────────────────────────────────────────────────
# NICHE HASHTAG LIBRARY (added 2026-05-16, voice pivot)
# -----------------------------------------------------------------------------
# Brand-stuffed tags like #NakshIQ + auto-generated #5outOf5 + #May2026Travel
# earn near-zero reach on the sub-1k follower account. IG's algorithm gates
# distribution by hashtag-community engagement — branded tags have only us
# posting, so the algo concludes "low-engagement hashtag, low-engagement post".
#
# This library maps state + theme to 5 NICHE tags with active communities
# (~100k-2M posts each, verified manually 2026-05-16). These are the tags
# successful India-travel accounts (incredibleindia, travelxp, indiagrams,
# bohemiantravel, etc.) actually use.
#
# Use `niche_tags(state, theme, dest_name=None)` to assemble a 5-tag block.
# It auto-mixes 2 geographic + 2 theme + 1 dest-specific (when destination
# is iconic enough to have its own active tag, e.g. #manalidiaries).
# ─────────────────────────────────────────────────────────────────────────────

STATE_NICHE_TAGS = {
    "Andhra Pradesh":   ["andhratourism", "andhrapradeshtourism", "exploreandhra"],
    "Arunachal Pradesh":["arunachalpradesh", "northeastindiatravel", "ariverflowseast"],
    "Assam":            ["assamtourism", "incredibleassam", "northeastdiaries"],
    "Bihar":            ["bihartourism", "explorebihar", "indianheritage"],
    "Chhattisgarh":     ["chhattisgarhtourism", "explorechhattisgarh", "tribalindia"],
    "Goa":              ["goadiaries", "goagram", "southgoavibes"],
    "Gujarat":          ["gujarattourism", "khushbugujaratki", "rannutsav"],
    "Haryana":          ["haryanatourism", "delhinearby", "northindiadiaries"],
    "Himachal Pradesh": ["himachaldiaries", "himachalpradesh", "himalayanwanderer"],
    "Jammu & Kashmir":  ["kashmirdiaries", "kashmirgram", "kashmirtourism"],
    "Jharkhand":        ["jharkhandtourism", "explorejharkhand", "tribaltravels"],
    "Karnataka":        ["karnatakatourism", "exploredsouthindia", "karnatakadiaries"],
    "Kerala":           ["godsowncountry", "keralatourism", "keralagram"],
    "Ladakh":           ["ladakhdiaries", "leh_ladakh", "ladakhtourism"],
    "Lakshadweep":      ["lakshadweepdiaries", "indianislands", "beachesofindia"],
    "Madhya Pradesh":   ["heartofindia", "mptourism", "incrediblemp"],
    "Maharashtra":      ["maharashtra_tourism", "maharashtradiaries", "konkandiaries"],
    "Manipur":          ["manipurtourism", "northeastindia", "exploremanipur"],
    "Meghalaya":        ["meghalayatourism", "scotlandoftheeast", "shillongdiaries"],
    "Mizoram":          ["mizoramtourism", "incrediblemizoram", "northeastvibes"],
    "Nagaland":         ["nagalandtourism", "hornbillfestival", "northeastdiaries"],
    "Odisha":           ["odishatourism", "incredibleodisha", "tribalheritage"],
    "Puducherry":       ["pondicherrydiaries", "frenchindia", "southindiatravel"],
    "Punjab":           ["punjabtourism", "punjabidiaries", "amritsardiaries"],
    "Rajasthan":        ["rajasthandiaries", "padharomarodesh", "incrediblerajasthan"],
    "Sikkim":           ["sikkimtourism", "explore_sikkim", "northeastdiaries"],
    "Tamil Nadu":       ["tamilnadutourism", "templesoftamilnadu", "exploretn"],
    "Telangana":        ["telanganatourism", "exploretelangana", "hyderabaddiaries"],
    "Tripura":          ["tripuratourism", "northeastexplorer", "exploretripura"],
    "Uttar Pradesh":    ["uptourism", "incredibleup", "varanasidiaries"],
    "Uttarakhand":      ["uttarakhandtourism", "devbhumi", "himalayandiaries"],
    "West Bengal":      ["westbengaltourism", "explorewestbengal", "bengaldiaries"],
    "Andaman & Nicobar":["andamandiaries", "indianbeaches", "scubadivingindia"],
    "Chandigarh":       ["chandigarhdiaries", "northindiatravel", "rockgardens"],
    "Delhi":            ["delhigram", "olddelhi", "delhidiaries"],
    "Dadra & Nagar Haveli":["unionterritoryindia", "westindiatravel", "exploreindia"],
    "Daman & Diu":      ["damanddiu", "westcoastindia", "indianbeaches"],
}

THEME_NICHE_TAGS = {
    "stays":     ["boutiquestaysindia", "homestaysindia", "indiastays",
                  "budgetstayindia", "luxurystayindia"],
    "eateries":  ["foodofindia", "indianstreetfood", "indianfoodblog",
                  "foodtravelindia", "instafoodieindia"],
    "viral_eats":["foodieindia", "indianstreetfood", "viralfoodindia",
                  "foodofinstagram", "explorefoodindia"],
    "emergency": ["solotravelindia", "safetravelindia", "responsibletravel",
                  "travelplanner", "travelhacksindia"],
    "weekend":   ["weekendgetaway", "weekendgetawayfromdelhi", "weekendgetawayfrommumbai",
                  "weekendgetawayfrombangalore", "shortbreaksindia"],
    "trek":      ["trekkingindia", "indianhimalayas", "trekkersofindia",
                  "mountainsofindia", "trekdiariesindia"],
    "festival":  ["festivalsofindia", "indianfestival", "incredibleindiafestivals",
                  "culturalindia", "spiritualindia"],
    "score":     ["india_travel", "incredibleindiaofficial", "indiagram",
                  "exploreindiaofficial", "travelindia"],
    "anti_trap": ["honesttravel", "skipthis", "touristtrapsindia",
                  "travelreality", "smarttravel"],
    "kids":      ["familytravelindia", "kidsfriendlytravel", "indiawithkids",
                  "indianfamilytravel", "vacationswithkids"],
    "skip":      ["honesttravel", "skipthis", "travelreality",
                  "donotvisit", "smarttravel"],
    "camping":   ["campingindia", "campinglife", "campingindiandiaries",
                  "wildernessindia", "outdoorindia"],
    "infra":     ["roadtripindia", "indianroads", "drivingindia",
                  "travelhacksindia", "northindiadrives"],
}


def niche_tags(state: str | None, theme: str, dest_name: str | None = None,
               max_tags: int = 5) -> str:
    """Assemble a niche hashtag block for an IG/FB caption.

    Mixes:
      - 2 from STATE_NICHE_TAGS[state]      (geographic community)
      - 2 from THEME_NICHE_TAGS[theme]      (theme community)
      - 1 dest-specific (e.g. #manalidiaries) when dest_name resolves

    Returns space-joined `#tag1 #tag2 ...` string. Never includes #NakshIQ —
    branded tags are explicitly killed by the 2026-05-16 voice pivot because
    they earn zero reach on a sub-1k account.
    """
    tags: list[str] = []
    state_pool = STATE_NICHE_TAGS.get(state or "") or []
    theme_pool = THEME_NICHE_TAGS.get(theme or "") or []

    # Dest-specific tag — only for destinations with active tag communities.
    dest_iconic = {
        "manali": "manalidiaries", "shimla": "shimladiaries",
        "spiti": "spitivalley", "ladakh": "ladakhdiaries",
        "varanasi": "varanasidiaries", "rishikesh": "rishikeshdiaries",
        "goa": "goadiaries", "kochi": "kochidiaries",
        "darjeeling": "darjeelingdiaries", "udaipur": "udaipurdiaries",
        "jaipur": "jaipurdiaries", "jaisalmer": "jaisalmerdiaries",
        "mumbai": "mumbaikar", "bangalore": "bangalorediaries",
        "kashmir": "kashmirdiaries", "kerala": "keralagram",
        "munnar": "munnardiaries", "ooty": "ootydiaries",
        "coorg": "coorgdiaries", "kasol": "kasolvibes",
        "mcleodganj": "mcleodganjdiaries", "auli": "aulidiaries",
        "kedarnath": "kedarnathyatra", "badrinath": "badrinathdham",
        "amritsar": "amritsardiaries", "pondicherry": "pondicherrydiaries",
        "andaman": "andamandiaries", "havelock": "havelockisland",
    }
    if dest_name:
        key = dest_name.lower().split()[0]
        if key in dest_iconic:
            tags.append(dest_iconic[key])

    # Geographic
    for t in state_pool[:2]:
        if t not in tags:
            tags.append(t)
    # Theme
    for t in theme_pool[:3]:
        if t not in tags and len(tags) < max_tags:
            tags.append(t)
    # Backfill with theme if state pool was empty
    for t in theme_pool[3:]:
        if t not in tags and len(tags) < max_tags:
            tags.append(t)
    return " ".join(f"#{t}" for t in tags[:max_tags])


def _filter_dest_used(items: list, used: set, key: str = "destination_id") -> list:
    """Filter pre-pick items so dests already posted this calendar month
    are EXCLUDED. Returns items in original order, minus any whose
    `destination_id` (or supplied key) appears in `used`.

    Empty result = every candidate's dest has been posted this month;
    caller should SKIP the format rather than silently degrade to
    score_card (the silent-fallback pattern was killed 2026-05-16).
    """
    if not items:
        return []
    out: list = []
    for it in items:
        if not isinstance(it, dict):
            continue
        did = it.get(key) or it.get("destination_id") or it.get("id")
        if did and did in used:
            continue
        out.append(it)
    return out


def comment_cta(theme: str, dest_name: str = "this") -> str:
    """Return a hook-style comment-trigger CTA matching the post theme.

    Comment-CTAs outperform link-CTAs on IG because (a) links are stripped
    from captions anyway, (b) comments are a strong algo signal that boosts
    organic reach, (c) DM follow-up is where actual conversion happens.
    """
    # First-name the destination — strip state suffix, lowercase first word
    short = (dest_name or "this").split(",")[0].strip()
    short_lower = short.lower().split()[0]
    triggers = {
        "score":     f"Comment '{short_lower}' — I'll DM the 48-hour plan I'd actually do.",
        "stays":     f"Comment '{short_lower}' — I'll send the 3 stays I'd actually book + price ranges.",
        "eateries":  f"Comment '{short_lower}' — I'll send 5 places no listicle has.",
        "emergency": f"Save this. Comment 'safety' — I'll DM the printable contact card.",
        "festival":  f"Comment '{short_lower}' — I'll send the lesser-known timing + crowd map.",
        "weekend":   f"Comment '{short_lower}' — I'll DM the Fri-Sun plan with real costs.",
        "infra":     f"Comment '{short_lower}' — I'll send the offline map + fuel stops.",
        "trek":      f"Comment '{short_lower}' — I'll DM the offline route + permit form.",
        "anti_trap": f"Comment 'where' — I'll send the alternative that's actually worth it.",
        "skip":      f"Comment 'where' — I'll DM the alternative I'd send my own family to.",
        "viral_eats":f"Comment '{short_lower}' — I'll tell you honestly whether it's worth the queue.",
        "camping":   f"Comment '{short_lower}' — I'll DM permit details + nearest water/fuel.",
        "kids":      f"Comment '{short_lower}' — I'll send what to pack for kids + age guide.",
    }
    return triggers.get(theme, triggers["score"])


def sanitize(text: str) -> str:
    """
    Strip banned phrases and banned hashtags from a caption before publishing.
    Case-insensitive phrase removal; preserves sentence punctuation spacing.
    """
    if not text:
        return text
    for phrase in BANNED_PHRASES:
        text = re.sub(re.escape(phrase), "", text, flags=re.IGNORECASE)
    for ht in BANNED_HASHTAGS:
        text = re.sub(rf"#{re.escape(ht)}\b", "", text, flags=re.IGNORECASE)
    # Collapse duplicated spaces introduced by removal, but keep newlines intact.
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r" +\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


# ─────────────────────────────────────────────────────────────────────────────
# Pillar share + seasonal overrides + per-platform voice
# ─────────────────────────────────────────────────────────────────────────────

def _normalise_platform(platform: str | None) -> str | None:
    if not platform:
        return None
    return _PLATFORM_ALIASES.get(str(platform).lower().strip())


def _today_in_window(start: tuple, end: tuple, today=None) -> bool:
    """True if today falls within [start..end] inclusive. Handles year-wrap
    (Nov → Feb wedding season) by detecting start > end and OR-ing the two
    halves of the year."""
    t = today or date.today()
    s = date(t.year, *start)
    e = date(t.year, *end)
    if s <= e:
        return s <= t <= e
    # Year-wrap window — e.g. start=(11,1) end=(2,28)
    return t >= s or t <= e


def current_seasonal_overrides(today=None) -> dict:
    """Return the additive pillar-weight deltas from any SEASONAL_OVERRIDES
    windows that match today. Empty dict if no window matches."""
    deltas = {p: 0.0 for p in PILLAR_WEEKLY_SHARE}
    for window in SEASONAL_OVERRIDES:
        if _today_in_window(window["start"], window["end"], today=today):
            for pillar, d in window.get("deltas", {}).items():
                if pillar in deltas:
                    deltas[pillar] += d
    # Clamp single-day movement so no pillar exceeds ±0.15 from baseline.
    for p in deltas:
        if deltas[p] > 0.15:
            deltas[p] = 0.15
        if deltas[p] < -0.15:
            deltas[p] = -0.15
    return deltas


def target_pillar_share(today=None) -> dict:
    """Baseline PILLAR_WEEKLY_SHARE plus today's seasonal overrides. Re-clamped
    so no pillar drops below 0.02. Does not re-normalise to sum 1.0 — the
    rotation only uses the relative ordering (most-under-share first)."""
    deltas = current_seasonal_overrides(today=today)
    out = {}
    for p, base in PILLAR_WEEKLY_SHARE.items():
        out[p] = max(0.02, base + deltas.get(p, 0.0))
    return out


def compute_weekly_pillar_share(state: dict) -> dict:
    """Actual 7-day pillar share computed from state['post_log']. Returns a
    dict pillar → fraction of posts in last 7 days that landed in that pillar.
    Sums to ≤ 1.0 (formats with no pillar mapping are ignored)."""
    cutoff = (date.today() - timedelta(days=7)).isoformat()
    log = state.get("post_log") or []
    counts = {p: 0 for p in PILLAR_WEEKLY_SHARE}
    total = 0
    for entry in log:
        if (entry.get("date") or "") < cutoff:
            continue
        fmt = entry.get("format") or ""
        pillar = FORMAT_PILLARS.get(fmt)
        if pillar in counts:
            counts[pillar] += 1
            total += 1
    if total == 0:
        return {p: 0.0 for p in PILLAR_WEEKLY_SHARE}
    return {p: c / total for p, c in counts.items()}


def under_share_pillars(state: dict, today=None) -> list:
    """Return pillars whose actual 7-day share is below target, ordered by
    largest deficit first. Empty list means we're balanced or no log yet."""
    target = target_pillar_share(today=today)
    actual = compute_weekly_pillar_share(state)
    deficits = []
    for p, want in target.items():
        gap = want - actual.get(p, 0.0)
        if gap > 0:
            deficits.append((p, gap))
    deficits.sort(key=lambda x: -x[1])
    return [p for p, _ in deficits]


def apply_platform_voice(caption: str, platform: str | None,
                         kind: str | None = None) -> str:
    """Trim a caption to per-platform discipline (word count, emoji cap,
    hashtag cap). Conservative: only removes; never rewrites. Safe to call
    on any caption — returns input unchanged if platform is unknown.

    Why post-process instead of per-format: the 26 copy_<format> functions
    each generate one caption that's shared across platforms; this is the
    single point where IG/FB/YT-Shorts/Reels variance is enforced.
    """
    if not caption:
        return caption
    plat = _normalise_platform(platform)
    if not plat or plat not in PLATFORM_VOICE:
        return caption
    rule = PLATFORM_VOICE[plat]

    # Split caption into [body, hashtag_block]. Hashtag block is the trailing
    # paragraph that is all-hashtag tokens. Body is everything before it.
    parts = caption.rstrip().split("\n\n")
    tail_idx = len(parts) - 1
    body, hash_block = caption, ""
    if tail_idx >= 0:
        tail = parts[tail_idx].strip()
        tokens = tail.split()
        if tokens and all(t.startswith("#") for t in tokens):
            body = "\n\n".join(parts[:tail_idx]).rstrip()
            hash_block = tail

    # Trim hashtags to cap.
    if hash_block:
        tags = hash_block.split()
        cap = rule["max_hashtags"]
        if len(tags) > cap:
            hash_block = " ".join(tags[:cap])

    # Trim body to max_words. Preserves newlines by splitting on whitespace
    # and rejoining with a single space (last-resort safety; expected to only
    # trip on tier-2/3 over-long captions).
    words = body.split()
    if len(words) > rule["max_words"]:
        body = " ".join(words[:rule["max_words"]]).rstrip(",;:.") + "…"

    # Cap emoji count by stripping anything past max_emoji. Regex catches the
    # base codepoint + an optional VS16/VS15 variation selector so ☀️ trims
    # as one grapheme. Not a full Unicode emoji parser; fine for the rare
    # 3rd-emoji-in-caption case.
    cap = rule["max_emoji"]
    if cap >= 0:
        seen = [0]
        def _maybe_strip(m):
            seen[0] += 1
            return m.group(0) if seen[0] <= cap else ""
        body = re.sub(r"[\U0001F300-\U0001FAFF☀-➿][︎️]?",
                      _maybe_strip, body)
        # Collapse any whitespace left by emoji removal.
        body = re.sub(r" {2,}", " ", body).strip()

    out = body
    if hash_block:
        out = f"{body}\n\n{hash_block}"
    return out.strip()

def utm(url: str, source: str, medium: str, campaign: str,
        content: str | None = None) -> str:
    """Append UTM tracking parameters to a URL.

    `content` (optional) maps to GA4's utm_content dimension — set this to a
    per-post identifier like `<dest_id>-<format>-<YYYYMMDD>` so engagement can
    be attributed back to the exact post that drove a click. Without it, all
    flow-story IG posts (for example) collapse into a single GA4 row and we
    can't tell which one converts.
    """
    sep = "&" if "?" in url else "?"
    suffix = f"utm_source={source}&utm_medium={medium}&utm_campaign={campaign}"
    if content:
        suffix += f"&utm_content={content}"
    return f"{url}{sep}{suffix}"


def build_utm_content(dest_id: str | None, fmt: str | None,
                      date_str: str | None = None) -> str:
    """Compose utm_content as `<dest_id>-<fmt>-<YYYYMMDD>`. Falls back to
    `<fmt>-<date>` when dest_id is unknown (generic / topic posts) and
    `unknown-<date>` if everything else is missing.

    Sanitises chars GA4 dislikes (spaces, ampersands, slashes).
    """
    d = (date_str or date.today().strftime("%Y%m%d")).replace("-", "")
    parts = [p for p in [dest_id, fmt] if p]
    if not parts:
        raw = f"unknown-{d}"
    else:
        raw = "-".join(parts + [d])
    # GA4 utm_content allows alphanumerics + dash/underscore. Map everything
    # else to dash so we don't break URL parsing client-side.
    return re.sub(r"[^A-Za-z0-9_\-]", "-", raw)[:80]


def dest_url(dest: dict, source: str = "", medium: str = "", campaign: str = "",
             content: str | None = None) -> str:
    """Return the deep-link URL for a destination, optionally with UTM params."""
    base = (dest.get("url") or f"https://nakshiq.com/en/destination/{dest['id']}").strip()
    if source:
        return utm(base, source, medium, campaign, content=content)
    return base


def copy_score_card(dest: dict, platform: str) -> str:
    """2026-05-16 VOICE PIVOT — hook-first, curiosity-led, comment-CTA, no IG URL.

    Old voice ("MANALI · MAY · NakshIQ scores 505 destinations monthly")
    earned 0.93% post-to-follower rate. New voice opens with a curiosity
    hook from the destination's `note` (the verified mid-month update) and
    ends with a comment trigger that drives DM signal — IG's strongest
    algo input on small accounts.
    """
    name  = dest["name"]
    state = dest["state"]
    tag   = (dest.get("tagline") or "").strip()
    note  = (dest.get("note") or "").strip()
    score = dest.get("score") or 0
    mon   = month_name()
    tags  = niche_tags(state, "score", dest_name=name)
    cta   = comment_cta("score", name)

    # Hook line — prefer the full note (verified, time-sensitive). Only split
    # on first sentence if note is too long for IG's truncate-at-125-char rule
    # AND the first sentence stands alone as a hook (>30 chars).
    full_text = note if note else tag
    hook = full_text
    if len(full_text) > 140:
        first = full_text.split(". ")[0].strip()
        if len(first) > 35:
            hook = first.rstrip(".") + "."
    # If hook is too-short like "Mid-May." just use the whole note.
    if hook and len(hook) < 35 and note:
        hook = note

    if platform == "facebook":
        # FB tolerates longer copy + clickable links — keep URL there.
        url = dest_url(dest, "social", "post", "score-card",
                       content=build_utm_content(dest.get("id"), "score_card"))
        body = [hook] if hook else []
        body.append(f"Verified for {mon}. Score: {score}/5. {state}.")
        body.append(cta)
        body.append(f"Full {name} guide → {url}")
        body.append(tags)
        return "\n\n".join(b for b in body if b).strip()

    # IG — no URL (stripped from captions). Link-in-bio model + comment-CTA.
    body = [hook] if hook else []
    body.append(f"{mon} · NakshIQ {score}/5 · {state}")
    body.append(cta)
    body.append("🔗 link in bio for the full guide.")
    body.append(tags)
    return "\n\n".join(b for b in body if b).strip()

def copy_reality_check(destinations: list, platform: str,
                       pair: tuple | None = None) -> tuple[str, str]:
    # If the caller pre-picked a pair (so both platforms use the same contrast),
    # use it. Otherwise pick one here from the destinations list.
    if not pair:
        dest_map = {d["name"]: d for d in destinations}
        for famous, hidden in CONTRARIAN_PAIRS:
            if famous in dest_map and hidden in dest_map:
                pair = (dest_map[famous], dest_map[hidden])
                break
        if not pair:
            pair = (destinations[0], destinations[1]) if len(destinations) >= 2 else None
    if not pair:
        return copy_score_card(destinations[0], platform), destinations[0]["id"]
    a, b = pair
    note = (b.get("note") or "").strip()
    url  = dest_url(b, "social", "post", "reality-check")
    tags = hashtag(b["name"], b["state"], "RealityCheck",
                   f"{month_name()}Travel", "NakshIQ")
    if platform == "facebook":
        body = (
            f"REALITY CHECK — {month_name().upper()} {date.today().year}\n\n"
            f"Both score {format_score(a['score'])} this month. Same region. Very different experience.\n\n"
            f"❌ {a['name'].upper()} (↑{a['elevation_m']:,}m)\n{a['tagline']}\n\n"
            f"✅ {b['name'].upper()} (↑{b['elevation_m']:,}m)\n{b['tagline']}\n"
            + (f"{note}\n\n" if note else "\n")
            + f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly — same score, context is everything.\n\n"
            f"Go deep on {b['name']} → {url}\n\n{tags}"
        ).strip()
    else:
        body = (
            f"SAME SCORE. DIFFERENT SATURDAY.\n\n"
            f"{a['name']} and {b['name']} both score {format_score(a['score'])} this {month_name()}.\n\n"
            f"{a['name']}: {a['tagline']}\n\n{b['name']}: {b['tagline']}\n"
            + (f"{note}\n\n" if note else "\n")
            + f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly.\n\n"
            f"↓ {b['name']} detail → {url}\n\n{tags}"
        ).strip()
    return body, b["id"]

def copy_data_carousel(destinations: list, platform: str) -> str:
    top5 = destinations[:5]
    lines = "\n".join(
        f"{'★'*d['score']} {d['name']} ({d['elevation_m']:,}m)\n"
        f"   → {(d['tagline'] or '')[:72]}..."
        for d in top5
    )
    tags = hashtag(f"{month_name()}Top5", "ScoreData",
                   f"{month_name()}Travel", "BestTimeToVisit", "NakshIQ")
    explore_url = utm("https://nakshiq.com/en/explore", "social", "post", "carousel")
    if platform == "facebook":
        return (
            f"{month_name().upper()}'S REAL 10/10 DESTINATIONS\n\n"
            f"NakshIQ scored {TOTAL_DESTINATIONS} destinations this {month_name()}. 20 hit 10/10. "
            f"Most travelers are booking the same 4.\n\n"
            f"Here's what the data actually shows:\n\n{lines}\n\n"
            f"Every score is monthly — 10/10 in {month_name()} may be 4/10 in August.\n\n"
            f"Full ranked list → {explore_url}\n\n{tags}"
        ).strip()
    else:
        return (
            f"{month_name().upper()}'S 10/10 PICKS\n(Save — the window closes fast)\n\n"
            f"{lines}\n\n"
            f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly. These are {month_name()}'s facts.\n\n"
            f"↓ Full scores → {explore_url}\n\n{tags}"
        ).strip()

def copy_tourist_trap(trap: dict, platform: str) -> str:
    """Tourist trap → alternative pairing. 2026-05-17 Phase 2 revoiced.

    Old voice was generic boilerplate. New version pulls the trap+alt pair from
    the actual /api/content?type=traps endpoint (trap_dest_name +
    alternative_dest_name + reason + alternative_reason) and frames as
    "skip X, go Y because Z".
    """
    # The API returns {trap: {id,name}, reason, alternative: {id,name,reason}, ...}
    trap_meta = trap.get("trap") or {}
    alt_meta = trap.get("alternative") or {}
    trap_name = (trap_meta.get("name") or trap.get("name") or "").strip()
    alt_name = (alt_meta.get("name") or "").strip()
    trap_reason = (trap.get("reason") or trap.get("description") or "").strip()
    alt_reason = (alt_meta.get("reason") or "").strip()
    alt_id = alt_meta.get("id")

    if not trap_name:
        return ""

    state = ""  # not in the trap payload; would need a join

    hook = trap_reason or f"{trap_name} is overhyped this {month_name()}."
    if hook and "." in hook[:200]:
        hook = hook.split(".")[0].rstrip(".") + "."

    tags = niche_tags(state, "anti_trap", dest_name=trap_name)
    cta = comment_cta("anti_trap")

    if platform == "facebook":
        if alt_id:
            url = utm(f"https://nakshiq.com/en/destination/{alt_id}",
                      "social", "post", "tourist-trap",
                      content=build_utm_content(alt_id, "tourist_trap"))
        else:
            url = utm("https://nakshiq.com/en/tourist-traps", "social", "post", "tourist-trap")
        body = [
            f"Skip {trap_name}.",
            hook,
        ]
        if alt_name:
            body.append(f"Go to {alt_name} instead.{(' ' + alt_reason) if alt_reason else ''}")
        body.append(cta)
        body.append(f"Full trap-vs-alternative list → {url}")
        body.append(tags)
        return "\n\n".join(b for b in body if b).strip()

    body = [
        f"Skip {trap_name}.",
        hook,
    ]
    if alt_name:
        body.append(f"Go to {alt_name} instead.{(' ' + alt_reason) if alt_reason else ''}")
    body.append(cta)
    body.append("🔗 link in bio for the full skip-list with alternatives.")
    body.append(tags)
    return "\n\n".join(b for b in body if b).strip()

def copy_infrastructure_truth(dest: dict, platform: str) -> str:
    note = (dest.get("note") or dest.get("tagline") or "").strip()
    url  = dest_url(dest, "social", "post", "score-card")
    tags = hashtag(dest["name"].replace(" ", ""), dest["state"].replace(" ", ""),
                   "RoadConditions", "InfraAudit", "NakshIQ")
    return (
        f"INFRASTRUCTURE REALITY — {dest['name'].upper()}\n\n"
        f"↑ {dest['elevation_m']:,}m · {dest['state']}\n\n{note}\n\n"
        f"NakshIQ tracks road access, fuel, ATM, and signal for {TOTAL_DESTINATIONS} destinations monthly.\n\n"
        f"Know before you drive → {url}\n\n{tags}"
    ).strip()

def copy_monthly_forecast(destinations: list, platform: str) -> str:
    top3 = [d for d in destinations if d.get("score", 0) == 5][:3]
    lines = "\n".join(
        f"★★★★★ {d['name']} ({d['elevation_m']:,}m)\n   {d['tagline'][:72]}"
        for d in top3
    )
    explore_url = utm("https://nakshiq.com/en/explore", "social", "post", "carousel")
    tags = hashtag(f"{month_name()}Forecast", "MonthlyScores",
                   "BestTimeToVisit", f"{month_name()}Travel", "NakshIQ")
    return (
        f"📊 {month_name().upper()} FORECAST — NakshIQ Monthly Update\n\n"
        f"{TOTAL_DESTINATIONS} destinations re-scored. This month's top 10/10 picks:\n\n{lines}\n\n"
        f"Scores reset every month. What worked last month may not work now.\n\n"
        f"Full {month_name()} data → {explore_url}\n\n{tags}"
    ).strip()

# ─────────────────────────────────────────────────────────────────────────────
# COPY FUNCTIONS — extended formats (collection / festival / kids / blog)
# ─────────────────────────────────────────────────────────────────────────────

def copy_collection_spotlight(collection: dict, dest_map: dict, platform: str) -> str:
    name      = collection["name"]
    desc      = (collection.get("description") or "").strip()
    count     = collection.get("itemCount") or len(collection.get("items", []))
    coll_url  = utm((collection.get("url") or
                 f"https://nakshiq.com/en/collections/{collection['id']}").strip(),
                 "social", "post", "collection")
    # Resolve top-3 destination names from the items list using the destination map
    top3_names = []
    for item in collection.get("items", [])[:3]:
        did = item.get("destination_id")
        if did and did in dest_map:
            top3_names.append(dest_map[did]["name"])
        elif did:
            top3_names.append(did.replace("-", " ").title())
    top3_line  = " · ".join(top3_names) if top3_names else f"{count} destinations"
    coll_tags  = [t for t in (collection.get("tags") or [])[:3] if t]
    tags       = hashtag(*coll_tags[:3], f"{month_name()}Travel", "NakshIQ")
    if platform == "facebook":
        return (
            f"{name.upper()}\n\n"
            f"{desc}\n\n"
            f"{count} destinations in this collection. Every one scored, mapped, "
            f"and rated monthly.\n\n"
            f"Top picks: {top3_line}\n\n"
            f"Explore the full collection → {coll_url}\n\n{tags}"
        ).strip()
    return (
        f"{name.upper()}\n\n"
        f"{desc}\n\n"
        f"Top 3: {top3_line}\n"
        f"({count} destinations · all scored monthly)\n\n"
        f"↓ Full collection → {coll_url}\n\n{tags}"
    ).strip()


def copy_festival_alert(festival: dict, dest_map: dict, platform: str) -> str:
    """2026-05-16 VOICE PIVOT — festival hook + comment-CTA, no IG URL."""
    name      = (festival.get("name") or "").strip()
    desc      = (festival.get("description") or "").strip()
    dest_name = festival.get("destination_name") or "India"
    dest_state = ""
    did = festival.get("destination_id")
    if did and did in dest_map:
        dest_state = (dest_map[did].get("state") or "").strip()

    if not name:
        log.info("festival_alert: no name — SKIPPING")
        return ""

    tags = niche_tags(dest_state, "festival", dest_name=dest_name)
    cta  = comment_cta("festival", name)
    mon  = month_name()

    # Hook = the festival's specific moment, not a generic alert
    hook = f"{name} is happening in {dest_name} this {mon}."
    if desc:
        # Pull first sentence of desc as the curiosity line
        first_sentence = desc.split(".")[0].strip()
        if len(first_sentence) > 30:
            hook = f"{first_sentence}."

    if platform == "facebook":
        # Resolve URL safely — dest record may not carry a `url` key, fall
        # back to constructed deep-link, then festival.url, then hub.
        base_url = ""
        if did and did in dest_map:
            base_url = (dest_map[did].get("url") or f"https://nakshiq.com/en/destination/{did}")
        if not base_url:
            base_url = (festival.get("url") or "https://nakshiq.com/en/festivals")
        url = utm(base_url.strip(), "social", "post", "festival",
                  content=build_utm_content(did, "festival_alert"))
        body = [
            hook,
            f"📍 {dest_name}{f', {dest_state}' if dest_state else ''} · {mon}",
        ]
        if desc and desc.split(".")[0] != hook.rstrip("."):
            body.append(desc)
        body.append(cta)
        body.append(f"Festival timing + nearby stays → {url}")
        body.append(tags)
        return "\n\n".join(b for b in body if b).strip()

    # IG — no URL
    body = [
        hook,
        f"📍 {dest_name} · {mon}",
    ]
    if desc and desc.split(".")[0] != hook.rstrip("."):
        body.append(desc)
    body.append(cta)
    body.append("🔗 link in bio for the full festival brief.")
    body.append(tags)
    return "\n\n".join(b for b in body if b).strip()


def copy_kids_intel(dest: dict, platform: str) -> str:
    name       = dest["name"]
    state      = dest["state"]
    tag        = dest["tagline"]
    note       = (dest.get("note") or "").strip()
    elev       = dest["elevation_m"]
    difficulty = (dest.get("difficulty") or "moderate").lower()
    url        = dest_url(dest, "social", "post", "score-card")
    if difficulty == "easy" and elev < 2500:
        verdict = "Kid-friendly. Low altitude, easy trails."
    elif difficulty == "easy":
        verdict = "Easy destination — watch altitude with kids under 10."
    elif elev < 2000:
        verdict = "Moderate difficulty. Older kids (10+) do fine."
    else:
        verdict = "Challenging terrain + altitude. Best for teens or older."
    tags = hashtag(name, state, "TravelWithKids",
                   "FamilyTrip", f"{month_name()}Travel")
    return (
        f"KIDS TRAVEL INTEL — {name.upper()}\n\n"
        f"👧 {verdict}\n"
        f"🏔️ Elevation: ↑{elev:,}m\n"
        f"📍 {state}\n\n"
        f"{tag}\n\n"
        + (f"{note}\n\n" if note else "")
        + f"Family travel data for {TOTAL_DESTINATIONS} destinations → {url}\n\n{tags}"
    ).strip()


# ─────────────────────────────────────────────────────────────────────────────
# NEW DATA-DRIVEN FORMATS — surfacing untapped destination data
# ─────────────────────────────────────────────────────────────────────────────

def copy_seasonal_shift(dest: dict, next_month: str, next_score: int,
                        platform: str) -> str:
    """Urgency post: destination drops sharply next month."""
    try:
        name  = dest["name"]
        score = dest.get("score", 5)
        state = dest["state"]
        stars_now  = "★" * score + "☆" * (5 - score)
        stars_next = "★" * next_score + "☆" * (5 - next_score)
        url = dest_url(dest, "social", "post", "seasonal-shift")
        tags = hashtag(name, state, "GoNow",
                       f"{month_name()}Travel", "ScoreDrop")
        if platform == "facebook":
            return (
                f"⏳ {name.upper()} — TIMING IS EVERYTHING\n\n"
                f"Right now: {format_score(score)} {stars_now}\n"
                f"In {next_month}: {format_score(next_score)} {stars_next}\n\n"
                f"That's a {score - next_score}-point drop. Weather shifts, roads close, "
                f"crowds change.\n\n"
                f"Would you rather visit a 10/10 or a 4/10? The data says go now.\n\n"
                f"Full {name} breakdown → {url}\n\n{tags}"
            ).strip()
        else:
            return (
                f"⏳ {name.upper()} · {month_name().upper()} → {next_month.upper()}\n"
                f"{stars_now} {format_score(score)} now → {stars_next} {format_score(next_score)}\n\n"
                f"That's a {score - next_score}-point drop in 30 days.\n\n"
                f"Roads, weather, crowds — something shifts. "
                f"NakshIQ tracks it so you don't have to guess.\n\n"
                f"Save this. {name} detail → {url}\n\n{tags}"
            ).strip()
    except Exception as e:
        log.warning(f"copy_seasonal_shift error: {e}")
        return copy_score_card(dest, platform)


def copy_elevation_face_off(low_dest: dict, high_dest: dict,
                            platform: str) -> str:
    """Two destinations at opposite elevations, both scoring high."""
    try:
        lo_name, lo_elev, lo_score = low_dest["name"], low_dest["elevation_m"], low_dest["score"]
        hi_name, hi_elev, hi_score = high_dest["name"], high_dest["elevation_m"], high_dest["score"]
        lo_url = dest_url(low_dest, "social", "post", "elevation-face-off")
        hi_url = dest_url(high_dest, "social", "post", "elevation-face-off")
        tags = hashtag(lo_name, hi_name, "ElevationData",
                       f"{month_name()}Travel", "BeachVsMountain")
        if platform == "facebook":
            return (
                f"SEA LEVEL vs SKY LEVEL — both score high this {month_name()}\n\n"
                f"🏖️ {lo_name} · {lo_elev:,}m · {format_score(lo_score)}\n"
                f"🏔️ {hi_name} · {hi_elev:,}m · {format_score(hi_score)}\n\n"
                f"Same month, same score, completely different experience.\n"
                f"One's a beach escape. One needs a down jacket.\n\n"
                f"Which elevation suits you? Both are data-backed this month.\n\n"
                f"{lo_name} → {lo_url}\n{hi_name} → {hi_url}\n\n{tags}"
            ).strip()
        else:
            return (
                f"🏖️ vs 🏔️ · {month_name().upper()}\n\n"
                f"{lo_name} · {lo_elev:,}m · {format_score(lo_score)}\n"
                f"{hi_name} · {hi_elev:,}m · {format_score(hi_score)}\n\n"
                f"Same month. Same score. ↑{hi_elev - lo_elev:,}m apart.\n\n"
                f"NakshIQ doesn't tell you where to go. "
                f"It tells you what the data says — for {TOTAL_DESTINATIONS} destinations.\n\n"
                f"Save both → {lo_url}\n\n{tags}"
            ).strip()
    except Exception as e:
        log.warning(f"copy_elevation_face_off error: {e}")
        return copy_score_card(high_dest or low_dest, platform)


def copy_state_showdown(dest_a: dict, dest_b: dict, platform: str) -> str:
    """Head-to-head comparison of top destinations from two states."""
    try:
        a_name, a_state, a_score = dest_a["name"], dest_a["state"], dest_a["score"]
        b_name, b_state, b_score = dest_b["name"], dest_b["state"], dest_b["score"]
        url_a = dest_url(dest_a, "social", "post", "state-showdown")
        url_b = dest_url(dest_b, "social", "post", "state-showdown")
        tags = hashtag(a_state, b_state, "StateVsState",
                       f"{month_name()}Travel", "NakshIQ")
        if platform == "facebook":
            return (
                f"{a_state.upper()} vs {b_state.upper()} — {month_name()} data\n\n"
                f"📍 {a_name} ({a_state}) · {format_score(a_score)}\n"
                f"📍 {b_name} ({b_state}) · {format_score(b_score)}\n\n"
                f"Same month, different states, different experience.\n"
                f"Which state wins YOUR travel style this {month_name()}?\n\n"
                f"{a_name} → {url_a}\n{b_name} → {url_b}\n\n{tags}"
            ).strip()
        else:
            return (
                f"{a_state.upper()} vs {b_state.upper()} · {month_name().upper()}\n\n"
                f"📍 {a_name} · {format_score(a_score)}\n"
                f"📍 {b_name} · {format_score(b_score)}\n\n"
                f"Not opinions. Not listicles. Monthly scores from "
                f"{TOTAL_DESTINATIONS} destinations.\n\n"
                f"Compare → {url_a}\n\n{tags}"
            ).strip()
    except Exception as e:
        log.warning(f"copy_state_showdown error: {e}")
        return copy_score_card(dest_a, platform)


def copy_difficulty_spectrum(easy_dest: dict, hard_dest: dict,
                            platform: str) -> str:
    """Easy vs Hard — both high-scoring, pick your speed."""
    try:
        e_name, e_score, e_diff = easy_dest["name"], easy_dest["score"], "Easy"
        h_name, h_score, h_diff = hard_dest["name"], hard_dest["score"], "Hard"
        url_e = dest_url(easy_dest, "social", "post", "difficulty-spectrum")
        url_h = dest_url(hard_dest, "social", "post", "difficulty-spectrum")
        tags = hashtag(e_name, h_name, "EasyVsHard",
                       f"{month_name()}Travel", "DifficultyLevel")
        if platform == "facebook":
            return (
                f"EASY vs HARD — both score high this {month_name()}\n\n"
                f"🟢 {e_name} · {e_diff} · {format_score(e_score)}\n"
                f"🔴 {h_name} · {h_diff} · {format_score(h_score)}\n\n"
                f"One's a relaxed getaway. One's a proper challenge.\n"
                f"The data says both are excellent right now.\n\n"
                f"Pick your speed → {url_e}\n\n{tags}"
            ).strip()
        else:
            return (
                f"🟢 EASY vs 🔴 HARD · {month_name().upper()}\n\n"
                f"{e_name} · {e_diff} · {format_score(e_score)}\n"
                f"{h_name} · {h_diff} · {format_score(h_score)}\n\n"
                f"Same month. Same score. Totally different trip.\n\n"
                f"NakshIQ scores difficulty alongside everything else — "
                f"roads, weather, crowds, safety.\n\n"
                f"Save this → {url_e}\n\n{tags}"
            ).strip()
    except Exception as e:
        log.warning(f"copy_difficulty_spectrum error: {e}")
        return copy_score_card(easy_dest, platform)


def copy_underdog_spotlight(dest: dict, platform: str) -> str:
    """Easy, low-elevation, high-scoring — the hidden gem heuristic."""
    try:
        name  = dest["name"]
        score = dest["score"]
        elev  = dest["elevation_m"]
        state = dest["state"]
        tag   = dest.get("tagline", "")
        url   = dest_url(dest, "social", "post", "underdog")
        stars = "★" * score + "☆" * (5 - score)
        tags  = hashtag(name, state, "HiddenGem",
                        f"{month_name()}Travel", "Underdog")
        if platform == "facebook":
            return (
                f"UNDERDOG ALERT: {name.upper()}\n\n"
                f"{stars} {format_score(score)} · {elev:,}m · {state}\n\n"
                f"{tag}\n\n"
                f"No one's talking about {name}. The data says they should be.\n"
                f"Easy access. Low elevation. High score. "
                f"The kind of place that doesn't need a listicle to prove itself.\n\n"
                f"Full data → {url}\n\n{tags}"
            ).strip()
        else:
            return (
                f"💎 UNDERDOG · {month_name().upper()}\n"
                f"{name.upper()} · {stars} {format_score(score)}\n"
                f"↑{elev:,}m · {state}\n\n"
                f"{tag}\n\n"
                f"Easy access. No hype. The data speaks.\n"
                f"{TOTAL_DESTINATIONS} destinations scored — this one quietly wins.\n\n"
                f"Save → {url}\n\n{tags}"
            ).strip()
    except Exception as e:
        log.warning(f"copy_underdog_spotlight error: {e}")
        return copy_score_card(dest, platform)


def copy_this_month_only(dest: dict, prev_score: int, next_score: int,
                         platform: str) -> str:
    """Narrow window — 5/5 now but bad before and after."""
    try:
        name  = dest["name"]
        score = dest.get("score", 5)
        state = dest["state"]
        url   = dest_url(dest, "social", "post", "this-month-only")
        tags  = hashtag(name, state, "NarrowWindow",
                        f"{month_name()}Only", "GoNow")
        if platform == "facebook":
            return (
                f"🎯 {name.upper()} — THIS MONTH ONLY\n\n"
                f"Last month: {format_score(prev_score)}\n"
                f"Right now: {format_score(score)} ★★★★★\n"
                f"Next month: {format_score(next_score)}\n\n"
                f"{name} has a narrow window. The conditions that make it "
                f"{format_score(score)} won't last.\n\n"
                f"This isn't FOMO. It's data. {TOTAL_DESTINATIONS} destinations, "
                f"scored monthly.\n\n"
                f"Plan fast → {url}\n\n{tags}"
            ).strip()
        else:
            return (
                f"🎯 NARROW WINDOW · {month_name().upper()}\n"
                f"{name.upper()} · {state}\n\n"
                f"Last month: {format_score(prev_score)}\n"
                f"NOW: {format_score(score)} ★★★★★\n"
                f"Next month: {format_score(next_score)}\n\n"
                f"The data says go now or wait a year.\n\n"
                f"Save → {url}\n\n{tags}"
            ).strip()
    except Exception as e:
        log.warning(f"copy_this_month_only error: {e}")
        return copy_score_card(dest, platform)


def copy_adventure_pick(dest: dict, platform: str) -> str:
    """Hard or high-altitude — for the adventurous."""
    try:
        name  = dest["name"]
        score = dest["score"]
        elev  = dest["elevation_m"]
        state = dest["state"]
        diff  = (dest.get("difficulty") or "challenging").capitalize()
        tag   = dest.get("tagline", "")
        url   = dest_url(dest, "social", "post", "adventure")
        stars = "★" * score + "☆" * (5 - score)
        tags  = hashtag(name, state, "AdventurePick",
                        f"{elev}m", f"{month_name()}Trek")
        if platform == "facebook":
            return (
                f"🧗 ADVENTURE PICK: {name.upper()}\n\n"
                f"{stars} {format_score(score)} · {elev:,}m · {diff} · {state}\n\n"
                f"{tag}\n\n"
                f"Not every destination is a weekend escape. {name} asks "
                f"something of you — and the data says {month_name()} is the month to answer.\n\n"
                f"Full adventure data → {url}\n\n{tags}"
            ).strip()
        else:
            return (
                f"🧗 ADVENTURE · {month_name().upper()}\n"
                f"{name.upper()} · {stars} {format_score(score)}\n"
                f"↑{elev:,}m · {diff} · {state}\n\n"
                f"{tag}\n\n"
                f"For those who don't do easy.\n"
                f"Data-backed. Not blog-backed.\n\n"
                f"Save → {url}\n\n{tags}"
            ).strip()
    except Exception as e:
        log.warning(f"copy_adventure_pick error: {e}")
        return copy_score_card(dest, platform)


def copy_weekend_escape(dest: dict, platform: str) -> str:
    """2026-05-16 VOICE PIVOT — Fri-Sun specific, hook + comment-CTA, no IG URL.

    Was 6 rotating hooks all saying "data-backed not guesswork" — same
    voice anchor in different words. New version frames the 48hr window
    as a real plan with specific timing, and ends with comment-CTA to
    deliver the actual plan via DM.
    """
    try:
        name  = dest["name"]
        state = dest["state"]
        note  = (dest.get("note") or "").strip()
        tag   = (dest.get("tagline") or "").strip()
        diff  = (dest.get("difficulty") or "easy").capitalize()

        if not name:
            return ""

        # Hook = the verified note (time-sensitive) or tagline.
        full_text = note if note else tag
        hook = full_text
        if len(full_text) > 140:
            first = full_text.split(". ")[0].strip()
            if len(first) > 35:
                hook = first.rstrip(".") + "."
        if hook and len(hook) < 35 and note:
            hook = note

        meta_line = f"Friday evening to Sunday night · {diff.lower()} access · {state}"
        tags = niche_tags(state, "weekend", dest_name=name)
        cta  = comment_cta("weekend", name)

        if platform == "facebook":
            url = dest_url(dest, "social", "post", "weekend-escape",
                           content=build_utm_content(dest.get("id"), "weekend_escape"))
            body = [
                f"You don't need a week off for {name}.",
                hook,
                meta_line,
                cta,
                f"Plan it → {url}",
                tags,
            ]
            return "\n\n".join(b for b in body if b).strip()

        # IG
        body = [
            f"You don't need a week off for {name}.",
            hook,
            meta_line,
            cta,
            "🔗 link in bio for the full 48hr plan.",
            tags,
        ]
        return "\n\n".join(b for b in body if b).strip()
    except Exception as e:
        log.warning(f"copy_weekend_escape error: {e} — SKIPPING")
        return ""


# ─────────────────────────────────────────────────────────────────────────────
# TIER 2.5 — fresh content sources (eateries, treks)
# ─────────────────────────────────────────────────────────────────────────────

def copy_eateries_pick(eatery: dict, dest_map: dict, platform: str) -> str:
    """2026-05-16 VOICE PIVOT — open with the dish, close with comment-CTA.

    Was: "🍴 LOCAL ICON — XYZ · NakshIQ verifies every eatery"  (cold)
    Now: opens with the why_it_matters line (the cultural / culinary reason
    the place earns a post) or the insider_tip, ends with comment-bait so
    the food-discovery community engages.

    Returns "" when name+dest is missing — NO score_card fallback (voice
    pivot 2026-05-16). A food post about a missing eatery is worse than
    no post.
    """
    try:
        name      = (eatery.get("name") or "").strip()
        area      = (eatery.get("area") or "").strip()
        cuisine   = eatery.get("cuisine") or []
        signature = (eatery.get("signature_dish") or "").strip()
        must_try  = eatery.get("must_try") or []
        price     = (eatery.get("price_range") or "").strip()
        year      = eatery.get("established_year")
        why       = (eatery.get("why_it_matters") or "").strip()
        tip       = (eatery.get("insider_tip") or "").strip()
        legendary = bool(eatery.get("is_legendary"))
        dest_id   = eatery.get("destination_id")
        dest_name = (dest_map.get(dest_id, {}).get("name") if dest_id else "") or area or "India"
        dest_state = (dest_map.get(dest_id, {}).get("state") or "") if dest_id else ""

        if not name or not dest_id:
            log.info(f"eateries_pick: missing name/dest_id — SKIPPING")
            return ""

        # Hook = why_it_matters (the cultural story) or signature dish framing
        if why and len(why) > 30:
            hook = why
        elif signature:
            hook = f"{name} in {dest_name} is famous for one dish: {signature}."
        elif must_try:
            hook = f"What people drive to {name} in {dest_name} for: {must_try[0]}."
        else:
            hook = f"{name} is the eatery {dest_name} regulars actually return to."

        # Order line
        order_line = ""
        if signature:
            order_line = f"Order: {signature}"
        elif must_try:
            order_line = f"Order: {', '.join(must_try[:3])}"

        meta_parts: list[str] = []
        if year:
            meta_parts.append(f"since {year}")
        if price:
            meta_parts.append(price)
        if cuisine:
            meta_parts.append((cuisine[0] if isinstance(cuisine, list) else str(cuisine)).replace("_", " ").title())
        meta_line = " · ".join(meta_parts)

        # Hashtags
        food_theme = "viral_eats" if not legendary else "eateries"
        tags = niche_tags(dest_state, food_theme, dest_name=dest_name)
        cta  = comment_cta("eateries", dest_name)

        if platform == "facebook":
            url = dest_url(dest_map.get(dest_id) or {"id": dest_id}, "social", "post",
                           "eateries-pick", content=build_utm_content(dest_id, "eateries_pick"))
            body = [
                hook,
                f"📍 {name} · {area or dest_name}{f', {dest_state}' if dest_state else ''}",
            ]
            if meta_line:
                body.append(meta_line)
            if order_line:
                body.append(order_line)
            if tip:
                body.append(f"Insider tip: {tip}")
            body.append(cta)
            body.append(f"Full {dest_name} food guide → {url}")
            body.append(tags)
            return "\n\n".join(b for b in body if b).strip()

        # IG — no URL
        body = [
            hook,
            f"📍 {name} · {area or dest_name}",
        ]
        if meta_line:
            body.append(meta_line)
        if order_line:
            body.append(order_line)
        if tip:
            body.append(f"💡 {tip}")
        body.append(cta)
        body.append("🔗 link in bio for the full food guide.")
        body.append(tags)
        return "\n\n".join(b for b in body if b).strip()
    except Exception as e:
        log.warning(f"copy_eateries_pick error: {e} — SKIPPING")
        return ""


def copy_trek_intel(trek: dict, dest_map: dict, platform: str) -> str:
    """Trek brief — altitude + difficulty + permit + best months.

    Inputs (per /api/content?type=treks):
      name, destination_id, destination_name, difficulty, duration_days,
      max_altitude_m, distance_km, best_months[], permits_required,
      kids_suitable, fitness_level, description, highlights[]

    Voice anchor: trek logbook entry — short, factual, decision-ready.
    """
    try:
        name      = (trek.get("name") or "").strip()
        dest_id   = trek.get("destination_id")
        dest_name = trek.get("destination_name") or (dest_map.get(dest_id, {}).get("name") if dest_id else None)
        difficulty = (trek.get("difficulty") or "moderate").lower()
        duration  = trek.get("duration_days")
        altitude  = trek.get("max_altitude_m")
        distance  = trek.get("distance_km")
        permits   = bool(trek.get("permits_required"))
        kids_ok   = bool(trek.get("kids_suitable"))
        fitness   = (trek.get("fitness_level") or "").strip()
        desc      = (trek.get("description") or "").strip()
        highlights = trek.get("highlights") or []

        if not name:
            return copy_score_card(dest_map.get(dest_id) or {}, platform)

        # CTA URL — link to home destination page when known (depth)
        if dest_id and dest_id in dest_map:
            url = dest_url(dest_map[dest_id], "social", "post", "trek-intel",
                           content=build_utm_content(dest_id, "trek_intel"))
        else:
            url = utm("https://nakshiq.com/en", "social", "post", "trek-intel",
                      content=build_utm_content(dest_id, "trek_intel"))

        # Stat line — only show fields that are present
        stat_parts: list[str] = []
        if altitude:
            stat_parts.append(f"↑ {int(altitude):,}m")
        if duration:
            stat_parts.append(f"{int(duration)} day{'s' if int(duration) != 1 else ''}")
        if distance:
            stat_parts.append(f"{distance:.0f}km")
        stat_parts.append(difficulty.title())
        stat_line = " · ".join(stat_parts)

        # Permit / kids badges
        badges: list[str] = []
        if permits:
            badges.append("Permit required")
        if kids_ok:
            badges.append("Kid-friendly")
        if fitness:
            badges.append(f"Fitness: {fitness.title()}")
        badge_line = " · ".join(badges)

        # Highlights line — first 2-3 bullets
        hl_block = ""
        if highlights:
            hl_block = "\n".join(f"• {h}" for h in highlights[:3])

        # State for hashtags
        dest_state = ""
        if dest_id and dest_id in dest_map:
            dest_state = (dest_map[dest_id].get("state") or "").strip()

        hashtag_inputs = [name.replace(" ", "").replace("-", "")[:24] or "Trek"]
        if dest_state:
            hashtag_inputs.append(dest_state.replace(" ", ""))
        hashtag_inputs.extend(["TrekIndia", difficulty.title(), "NakshIQ"])
        tags = hashtag(*hashtag_inputs[:5])

        if platform == "facebook":
            return (
                f"🥾 TREK INTEL — {name.upper()}\n"
                + (f"📍 {dest_name}\n" if dest_name else "")
                + (f"\n{stat_line}\n" if stat_line else "")
                + (f"{badge_line}\n" if badge_line else "")
                + (f"\n{desc}\n" if desc else "")
                + (f"\n{hl_block}\n" if hl_block else "")
                + f"\nFull intel — when to go, what to pack, what nobody tells you → {url}\n\n{tags}"
            ).strip()
        else:
            return (
                f"🥾 {name.upper()}\n"
                + (f"📍 {dest_name}\n\n" if dest_name else "\n")
                + (f"{stat_line}\n" if stat_line else "")
                + (f"{badge_line}\n" if badge_line else "")
                + (f"\n{desc}\n" if desc else "")
                + (f"\n{hl_block}\n" if hl_block else "")
                + f"\n↓ Full trek intel → {url}\n\n{tags}"
            ).strip()
    except Exception as e:
        log.warning(f"copy_trek_intel error: {e}")
        if trek.get("destination_id") and trek["destination_id"] in dest_map:
            return copy_score_card(dest_map[trek["destination_id"]], platform)
        return ""


# ─────────────────────────────────────────────────────────────────────────────
# TIER 6 — closes the data-vertical coverage gap (added 2026-05-10)
# -----------------------------------------------------------------------------
# Five missing verticals + one fragmented angle become first-class formats:
#   stays_pick       — editor-curated stay (signature_experience, why_nakshiq)
#   emergency_intel  — per-dest SOS (police, hospital, local_helpers contact)
#   viral_eats_pick  — viral-on-Reels eatery + honest review
#   camping_intel    — camping spot (permit, water, facilities)
#   confidence_intel — unified reach + sleep + fuel + network report card
#   collection_series — themed multi-post (root bridges / sacred lakes / etc)
# Voice: same as Tier 2.5 (data-first, decision-ready, no hype).
# ─────────────────────────────────────────────────────────────────────────────


def copy_stays_pick(stay: dict, dest_map: dict, platform: str) -> str:
    """2026-05-16 VOICE PIVOT — hook-first, comment-CTA, no IG URL.

    Was: "🛏️ STAY PICK — APPLE COUNTRY RESORT MANALI · No sponsored picks
    — ever. ↓ Full stay guide → https://..."  (analytical / cold)

    Now: opens with the signature_experience as a curiosity hook, surfaces
    only the price band + property type as decision-data, ends with
    'Comment {dest}' so engagement compounds into the algorithm.

    Returns "" (caller must SKIP the post) when name+dest_id are missing.
    NO silent fallback to score_card — that's what made every post feel
    like the same generic content.
    """
    try:
        name      = (stay.get("name") or "").strip()
        dest_id   = stay.get("destination_id")
        dest_name = stay.get("destination_name") or (dest_map.get(dest_id, {}).get("name") if dest_id else None)
        prop_type = (stay.get("property_type") or "").strip()
        price     = (stay.get("price_band") or "").strip()
        why       = (stay.get("why_nakshiq") or "").strip()
        sig       = (stay.get("signature_experience") or "").strip()
        dest_state = (stay.get("state") or "").strip()

        # Hard skip — no silent score_card fallback (voice pivot 2026-05-16)
        if not name or not dest_id or not dest_name:
            log.info(f"stays_pick: missing name/dest_id/dest_name — SKIPPING (no fallback)")
            return ""

        # Hook = signature_experience (the unique reason to book here) or
        # the why_nakshiq line. NEVER lead with the property name — that
        # reads like a listing, not a story.
        hook = sig if (sig and len(sig) > 20) else why

        meta_parts: list[str] = []
        if prop_type:
            meta_parts.append(prop_type.title())
        if price:
            meta_parts.append(price)
        meta_line = " · ".join(meta_parts)

        tags = niche_tags(dest_state, "stays", dest_name=dest_name)
        cta  = comment_cta("stays", dest_name)

        if platform == "facebook":
            url = dest_url(dest_map.get(dest_id) or {"id": dest_id}, "social", "post",
                           "stays-pick", content=build_utm_content(dest_id, "stays_pick"))
            body = [hook] if hook else []
            body.append(f"📍 {name} · {dest_name}, {dest_state}")
            if meta_line:
                body.append(meta_line)
            if why and why != hook:
                body.append(why)
            body.append(cta)
            body.append(f"Full {dest_name} stays guide → {url}")
            body.append(tags)
            return "\n\n".join(b for b in body if b).strip()

        # IG — no URL, comment-CTA only.
        body = [hook] if hook else []
        body.append(f"📍 {name} · {dest_name}")
        if meta_line:
            body.append(meta_line)
        if why and why != hook:
            body.append(why)
        body.append(cta)
        body.append("🔗 link in bio for full stays guide.")
        body.append(tags)
        return "\n\n".join(b for b in body if b).strip()
    except Exception as e:
        log.warning(f"copy_stays_pick error: {e} — SKIPPING")
        return ""


def copy_emergency_intel(sos: dict, dest_map: dict, platform: str) -> str:
    """2026-05-16 VOICE PIVOT — open with the moment, end with save+comment.

    No other India travel account posts real per-dest emergency contacts.
    That IS the moat. New voice surfaces it as a 'before something goes
    wrong' save-bait, not a methodology brag.

    Returns "" (caller SKIPS) when phone_block is empty — no silent
    fallback to score_card. A safety post without contacts is worse than
    no post.
    """
    try:
        dest_id   = sos.get("destination_id")
        dest_name = sos.get("destination_name") or (dest_map.get(dest_id, {}).get("name") if dest_id else None)
        dest_state = (sos.get("state") or "").strip()
        if not dest_id or not dest_name:
            return ""

        helpers = sos.get("local_helpers") or []
        helper = helpers[0] if isinstance(helpers, list) and helpers else None

        # Phone lines — only show fields that are present and non-trivial
        phone_lines: list[str] = []
        if sos.get("police"):
            phone_lines.append(f"🚓 Police: {sos['police']}")
        if sos.get("ambulance"):
            phone_lines.append(f"🚑 Ambulance: {sos['ambulance']}")
        if sos.get("nearest_hospital"):
            km = sos.get("nearest_hospital_km")
            km_str = f" · {km}km" if km else ""
            phone_lines.append(f"🏥 {sos['nearest_hospital']}{km_str}")
        if sos.get("mountain_rescue"):
            phone_lines.append(f"⛰️ Rescue: {sos['mountain_rescue']}")
        elif sos.get("rescue_contact"):
            phone_lines.append(f"🆘 Rescue: {sos['rescue_contact']}")
        if sos.get("women_helpline"):
            phone_lines.append(f"👩 Women helpline: {sos['women_helpline']}")

        phone_block = "\n".join(phone_lines[:4])
        if not phone_block:
            log.info(f"emergency_intel for {dest_name}: no phone data — SKIPPING")
            return ""

        helper_block = ""
        if helper and helper.get("name") and helper.get("contact"):
            helper_role = (helper.get("role") or "").strip()
            helper_contact = (helper.get("contact") or "").strip()
            helper_block = (
                f"🤝 {helper['name']}"
                + (f" ({helper_role})" if helper_role else "")
                + f" · 📞 {helper_contact}"
            )

        tags = niche_tags(dest_state, "emergency", dest_name=dest_name)
        cta  = comment_cta("emergency", dest_name)

        # Hook = "Save this BEFORE you go to X" — frames save-bait as forward-looking
        hook = f"Save this before you go to {dest_name}."

        if platform == "facebook":
            url = dest_url(dest_map.get(dest_id) or {"id": dest_id}, "social", "post",
                           "emergency-intel", content=build_utm_content(dest_id, "emergency_intel"))
            body = [
                hook,
                f"Real contacts for {dest_name}, {dest_state}. Verified through district sources — not Google's first result.",
                phone_block,
            ]
            if helper_block:
                body.append(helper_block)
            body.append(cta)
            body.append(f"Full safety brief → {url}")
            body.append(tags)
            return "\n\n".join(b for b in body if b).strip()

        # IG — no URL
        body = [
            hook,
            f"{dest_name}, {dest_state} — real contacts, district-verified.",
            phone_block,
        ]
        if helper_block:
            body.append(helper_block)
        body.append(cta)
        body.append("🔗 link in bio for the full printable card.")
        body.append(tags)
        return "\n\n".join(b for b in body if b).strip()
    except Exception as e:
        log.warning(f"copy_emergency_intel error: {e} — SKIPPING")
        return ""


def copy_viral_eats_pick(viral: dict, dest_map: dict, platform: str) -> str:
    """Viral-on-X eatery — different angle from local_eateries (insider) — this
    one is "the place that went viral, here's the honest take".

    Inputs (per /api/content?type=viral_eats):
      name, location, type, famous_for, viral_on, price_range, honest_review,
      destination_id, destination_name, state.

    Voice anchor: "Viral on Reels. Here's whether it's actually worth it."
    """
    try:
        name      = (viral.get("name") or "").strip()
        location  = (viral.get("location") or "").strip()
        kind      = (viral.get("type") or "").strip()
        famous    = (viral.get("famous_for") or "").strip()
        viral_on  = (viral.get("viral_on") or "").strip()
        price     = (viral.get("price_range") or "").strip()
        review    = (viral.get("honest_review") or "").strip()
        dest_id   = viral.get("destination_id")
        dest_name = viral.get("destination_name") or (dest_map.get(dest_id, {}).get("name") if dest_id else None)
        dest_state = (viral.get("state") or "").strip()

        if not name:
            return copy_score_card(dest_map.get(dest_id) or {}, platform)

        if dest_id and dest_id in dest_map:
            url = dest_url(dest_map[dest_id], "social", "post", "viral-eats",
                           content=build_utm_content(dest_id, "viral_eats_pick"))
        else:
            url = utm("https://nakshiq.com/en", "social", "post", "viral-eats",
                      content=build_utm_content(dest_id, "viral_eats_pick"))

        meta_parts: list[str] = []
        if kind:
            meta_parts.append(kind.replace("_", " ").title())
        if price:
            meta_parts.append(price)
        if viral_on:
            meta_parts.append(f"Viral on {viral_on}")
        meta_line = " · ".join(meta_parts)

        hashtag_inputs = [name.replace(" ", "")[:24] or "FoodIndia"]
        if dest_state:
            hashtag_inputs.append(dest_state.replace(" ", ""))
        hashtag_inputs.extend(["ViralEats", "FoodieIndia", "NakshIQ"])
        tags = hashtag(*hashtag_inputs[:5])

        if platform == "facebook":
            return (
                f"🍴 VIRAL — {name.upper()}\n"
                + (f"📍 {location or dest_name}\n" if (location or dest_name) else "")
                + (f"\n{meta_line}\n" if meta_line else "")
                + (f"\nFamous for: {famous}\n" if famous else "")
                + (f"\nHonest take: {review}\n" if review else "")
                + f"\nWe rate places, not promote them. No sponsorships.\n"
                f"Full {dest_name or name} food guide → {url}\n\n{tags}"
            ).strip()
        else:
            return (
                f"🍴 {name.upper()}\n"
                + (f"📍 {location or dest_name}\n\n" if (location or dest_name) else "\n")
                + (f"{meta_line}\n" if meta_line else "")
                + (f"\nFamous for: {famous}\n" if famous else "")
                + (f"\nHonest take: {review}\n" if review else "")
                + f"\nWe rate, never promote.\n💬 Worth the queue? Comment below.\n↓ Full guide → {url}\n\n{tags}"
            ).strip()
    except Exception as e:
        log.warning(f"copy_viral_eats_pick error: {e}")
        if viral.get("destination_id") and viral["destination_id"] in dest_map:
            return copy_score_card(dest_map[viral["destination_id"]], platform)
        return ""


def copy_camping_intel(camp: dict, dest_map: dict, platform: str) -> str:
    """Camping spot brief — permit + water + facilities + month-window.

    Inputs (per /api/content?type=camping):
      name, destination_id, destination_name, state, elevation_m, open_months,
      permit_required, water_source, facilities, description.

    Voice anchor: "Camp here this month — here's what to know before you pitch."
    """
    try:
        name      = (camp.get("name") or "").strip()
        dest_id   = camp.get("destination_id")
        dest_name = camp.get("destination_name") or (dest_map.get(dest_id, {}).get("name") if dest_id else None)
        dest_state = (camp.get("state") or "").strip()
        elev      = camp.get("elevation_m")
        permit    = bool(camp.get("permit_required"))
        water_raw = camp.get("water_source")
        # water_source is a bool in this table — True = available on-site, False = carry your own.
        # Future schema migration may make it a string description; handle both shapes defensively.
        if isinstance(water_raw, bool):
            water = "Available on-site" if water_raw else "Carry your own"
        else:
            water = (str(water_raw) if water_raw else "").strip()
        facilities_raw = camp.get("facilities")
        # facilities is a free-text string in this table, but the API serializer
        # may pass an array shape later — handle both.
        if isinstance(facilities_raw, list):
            facilities_str = ", ".join(facilities_raw[:3])
        else:
            facilities_str = (str(facilities_raw) if facilities_raw else "").strip()
        desc      = (camp.get("description") or "").strip()

        if not name:
            return copy_score_card(dest_map.get(dest_id) or {}, platform)

        if dest_id and dest_id in dest_map:
            url = dest_url(dest_map[dest_id], "social", "post", "camping-intel",
                           content=build_utm_content(dest_id, "camping_intel"))
        else:
            url = utm("https://nakshiq.com/en/camping", "social", "post", "camping-intel",
                      content=build_utm_content(dest_id, "camping_intel"))

        stat_parts: list[str] = []
        if elev:
            stat_parts.append(f"↑ {int(elev):,}m")
        stat_parts.append(month_name())
        if permit:
            stat_parts.append("Permit required")
        else:
            stat_parts.append("No permit")
        stat_line = " · ".join(stat_parts)

        info_parts: list[str] = []
        if water:
            info_parts.append(f"💧 Water: {water}")
        if facilities_str:
            info_parts.append(f"🛠 {facilities_str}")
        info_block = "\n".join(info_parts)

        hashtag_inputs = [name.replace(" ", "")[:24] or "Camping"]
        if dest_state:
            hashtag_inputs.append(dest_state.replace(" ", ""))
        hashtag_inputs.extend(["CampingIndia", "Camping", "NakshIQ"])
        tags = hashtag(*hashtag_inputs[:5])

        if platform == "facebook":
            return (
                f"⛺ CAMPING INTEL — {name.upper()}\n"
                + (f"📍 {dest_name}\n" if dest_name else "")
                + (f"\n{stat_line}\n" if stat_line else "")
                + (f"\n{info_block}\n" if info_block else "")
                + (f"\n{desc}\n" if desc else "")
                + f"\nFull intel — when, what to pack, what nobody tells you → {url}\n\n{tags}"
            ).strip()
        else:
            return (
                f"⛺ {name.upper()}\n"
                + (f"📍 {dest_name}\n\n" if dest_name else "\n")
                + (f"{stat_line}\n" if stat_line else "")
                + (f"\n{info_block}\n" if info_block else "")
                + (f"\n{desc}\n" if desc else "")
                + f"\n💾 Save before you pitch.\n↓ Full camping intel → {url}\n\n{tags}"
            ).strip()
    except Exception as e:
        log.warning(f"copy_camping_intel error: {e}")
        if camp.get("destination_id") and camp["destination_id"] in dest_map:
            return copy_score_card(dest_map[camp["destination_id"]], platform)
        return ""


def copy_confidence_intel(dest: dict, platform: str) -> str:
    """Unified infrastructure report card — all 4 confidence cards in one post.

    Voice anchor: "Everything you need before you drive in."
    Pulls from dest's confidence_cards JSONB (already on every dest record):
      reach (road_condition, public_transport)
      sleep (options_count, price_range_inr)
      fuel (nearest_petrol_pump, carry_extra)
      network (jio, airtel, bsnl, vi)
    """
    try:
        name = (dest.get("name") or "").strip()
        dest_id = dest.get("id") or dest.get("destination_id")
        dest_state = (dest.get("state") or "").strip()
        cc_raw = dest.get("confidence_cards") or {}
        if isinstance(cc_raw, list):
            cc_raw = cc_raw[0] if cc_raw else {}
        if not isinstance(cc_raw, dict):
            cc_raw = {}

        reach   = cc_raw.get("reach") or {}
        sleep   = cc_raw.get("sleep") or {}
        fuel    = cc_raw.get("fuel") or {}
        network = cc_raw.get("network") or {}

        rows: list[str] = []
        if reach.get("road_condition"):
            rows.append(f"🚗 Reach: {reach['road_condition']}")
        elif reach.get("from_nearest_city"):
            rows.append(f"🚗 Reach: {reach['from_nearest_city']}")
        if sleep.get("options_count"):
            price = sleep.get("price_range_inr")
            price_str = f", ₹{price}/night" if price else ""
            rows.append(f"🛏️ Sleep: {sleep['options_count']} options{price_str}")
        elif sleep.get("note"):
            rows.append(f"🛏️ Sleep: {sleep['note']}")
        if fuel.get("nearest_petrol_pump"):
            warn = " ⚠ carry extra" if fuel.get("carry_extra") else ""
            rows.append(f"⛽ Fuel: {fuel['nearest_petrol_pump']}{warn}")
        elif fuel.get("note"):
            rows.append(f"⛽ Fuel: {fuel['note']}")
        nets = []
        if network.get("jio"):    nets.append("Jio")
        if network.get("airtel"): nets.append("Airtel")
        if network.get("bsnl"):   nets.append("BSNL")
        if network.get("vi"):     nets.append("Vi")
        if nets:
            rows.append(f"📶 Network: {', '.join(nets)}")
        elif network.get("note"):
            rows.append(f"📶 Network: {network['note']}")

        # 2026-05-16 PIVOT — no silent fallback to score_card.
        if len(rows) < 2:
            log.info(f"confidence_intel for {name}: only {len(rows)} card rows — SKIPPING")
            return ""

        rows_block = "\n".join(rows)
        month = month_name()
        tags = niche_tags(dest_state, "infra", dest_name=name)
        cta  = comment_cta("infra", name)

        if platform == "facebook":
            url = dest_url(dest, "social", "post", "confidence-intel",
                           content=build_utm_content(dest_id, "confidence_intel"))
            body = [
                f"Before you drive into {name}, check this.",
                f"📍 {name}, {dest_state} · {month}",
                rows_block,
                cta,
                f"Full {name} infra report → {url}",
                tags,
            ]
            return "\n\n".join(b for b in body if b).strip()

        # IG
        body = [
            f"Before you drive into {name}, check this.",
            f"📍 {name} · {month}",
            rows_block,
            cta,
            "🔗 link in bio for the full infra brief.",
            tags,
        ]
        return "\n\n".join(b for b in body if b).strip()
    except Exception as e:
        log.warning(f"copy_confidence_intel error: {e} — SKIPPING")
        return ""


def copy_collection_series(collection: dict, dest_map: dict, dest_map_full: dict, series_index: int, platform: str) -> str:
    """One post in a themed collection mini-series (e.g. "Root Bridge #3/6").

    Inputs (per /api/content?type=collections):
      id, name, description, items (array of dest ids), itemCount, image.

    Voice anchor: "All N {theme}, ranked. This is #{i}."
    Differs from collection_spotlight (which posts the whole collection at once).
    """
    try:
        coll_id   = collection.get("id") or ""
        coll_name = (collection.get("name") or "").strip()
        items     = collection.get("items") or []
        total     = collection.get("itemCount") or len(items) if isinstance(items, list) else 0

        # 2026-05-17 Phase 2: no silent fallback to score_card — SKIP instead.
        if not items or not isinstance(items, list) or total < 2:
            log.info(f"collection_series: collection has <2 items — SKIPPING")
            return ""

        # Pick item by series_index (mod total) — caller may iterate the series.
        idx = max(0, min(series_index, total - 1))
        raw_item = items[idx]
        # Items are stored as either bare dest-id strings (legacy) or
        # {note, rank, destination_id} objects (current). Handle both.
        if isinstance(raw_item, str):
            item_id = raw_item
            item_note = ""
        elif isinstance(raw_item, dict):
            item_id = raw_item.get("destination_id") or raw_item.get("id")
            item_note = (raw_item.get("note") or "").strip()
        else:
            item_id = None
            item_note = ""
        if not item_id:
            log.info(f"collection_series: item at idx {idx} has no destination_id — SKIPPING")
            return ""

        item_dest = dest_map_full.get(item_id) or dest_map.get(item_id) or {}
        if not item_dest:
            log.info(f"collection_series: dest '{item_id}' not in dest_map — SKIPPING")
            return ""

        item_name = (item_dest.get("name") or "").strip()
        item_score = item_dest.get("score") or 0
        item_state = (item_dest.get("state") or "").strip()

        # Use collection name as the prefix — strip "best of" / "top" prefixes
        clean_coll = coll_name.replace("Best of ", "").replace("Top ", "").strip()
        position = f"#{idx + 1} of {total}"

        # Hook = the item-specific note from the collection (curator's reason)
        # OR a series-position framing
        hook = item_note if (item_note and len(item_note) > 30) else (
            f"{position} in our {clean_coll.lower()} series: {item_name}."
        )

        tags = niche_tags(item_state, "score", dest_name=item_name)
        cta = f"Comment '{item_name.split()[0].lower()}' — I'll DM why this one earned slot #{idx + 1}."

        if platform == "facebook":
            url = dest_url(item_dest, "social", "post", "collection-series",
                           content=build_utm_content(item_id, f"collection_series_{coll_id}"))
            body = [hook, f"📍 {item_name}, {item_state} · {clean_coll}"]
            if item_score:
                body.append(f"NakshIQ score this month: {item_score}/5")
            body.append(cta)
            body.append(f"Full series → https://nakshiq.com/en/collections/{coll_id}")
            body.append(f"This destination → {url}")
            body.append(tags)
            return "\n\n".join(b for b in body if b).strip()

        # IG
        body = [hook, f"📍 {item_name} · {position}"]
        if item_score:
            body.append(f"⭐ {item_score}/5 this {month_name()}")
        body.append(cta)
        body.append("🔗 link in bio for the full series.")
        body.append(tags)
        return "\n\n".join(b for b in body if b).strip()
    except Exception as e:
        log.warning(f"copy_collection_series error: {e} — SKIPPING")
        return ""


# ─────────────────────────────────────────────────────────────────────────────
# TIER 7 PHASE 2 (2026-05-17) — new caption builders for restored variety
# -----------------------------------------------------------------------------
# Adds 7 formats: 4 restored (hidden_gem_reveal, route_spotlight_short,
# tourist_trap-revoiced, collection_series-revoiced) + 3 NEW data-driven
# (arrival_intel, women_solo_brief, cost_index_card). Each follows the
# 2026-05-16 voice rules:
#   - hook in line 1 (curiosity / specific value)
#   - meta-data only when useful
#   - comment-CTA at close (drives DM signal, IG's strongest small-account algo)
#   - niche tags only (no #NakshIQ branding bludgeon)
#   - URL only in FB (IG drops URLs — link-in-bio model)
#   - SKIP via "" return on missing data (no silent fallback to score_card)
# ─────────────────────────────────────────────────────────────────────────────

def copy_hidden_gem_reveal(gem: dict, dest_map: dict, platform: str) -> str:
    """Hidden-gem reveal — "Nobody talks about X (Nkm from Y)" hook."""
    try:
        name = (gem.get("name") or "").strip()
        near_dest_name = (gem.get("near_destination_name") or "").strip()
        near_dest_id = gem.get("near_destination_id")
        state = (gem.get("state") or "").strip()
        distance_km = gem.get("distance_km")
        why_unknown = (gem.get("why_unknown") or "").strip()
        why_go = (gem.get("why_go") or "").strip()
        social_proof = (gem.get("social_proof") or "").strip()

        if not name or not near_dest_name:
            return ""

        # Hook = why_unknown (the scarcity story) or why_go (the value story)
        hook = why_unknown if (why_unknown and len(why_unknown) > 30) else why_go
        if not hook:
            hook = f"Nobody talks about {name} — and {near_dest_name} is the closest city most travellers actually know."

        distance_line = f"{distance_km}km from {near_dest_name}" if distance_km else f"Near {near_dest_name}"
        tags = niche_tags(state, "score", dest_name=near_dest_name)
        cta = f"Comment '{near_dest_name.split()[0].lower()}' — I'll DM the access notes + best month to go."

        if platform == "facebook":
            url = utm(f"https://nakshiq.com/en/destination/{near_dest_id}",
                      "social", "post", "hidden-gem-reveal",
                      content=build_utm_content(near_dest_id, "hidden_gem_reveal"))
            body = [
                f"Nobody talks about {name}.",
                hook,
                f"📍 {distance_line} · {state}",
            ]
            if why_go and why_go != hook:
                body.append(why_go)
            if social_proof:
                body.append(f"Why it stays under the radar: {social_proof}")
            body.append(cta)
            body.append(f"Full {near_dest_name} guide → {url}")
            body.append(tags)
            return "\n\n".join(b for b in body if b).strip()

        # IG
        body = [
            f"Nobody talks about {name}.",
            hook,
            f"📍 {distance_line}",
        ]
        if social_proof:
            body.append(social_proof)
        body.append(cta)
        body.append("🔗 link in bio for the full guide.")
        body.append(tags)
        return "\n\n".join(b for b in body if b).strip()
    except Exception as e:
        log.warning(f"copy_hidden_gem_reveal error: {e} — SKIPPING")
        return ""


def copy_route_spotlight_short(route: dict, dest_map: dict, platform: str) -> str:
    """Lightweight route teaser — one stop highlighted, not full itinerary."""
    try:
        name = (route.get("name") or route.get("title") or "").strip()
        days = route.get("days") or route.get("duration_days")
        stops = route.get("stops") or []
        highlights = route.get("highlights") or []
        route_id = route.get("id")

        if not name or not stops:
            return ""

        # Pick the most "interesting" stop = first non-start, non-end stop
        # with a description.
        stop_picks = stops[1:-1] if len(stops) >= 3 else stops
        featured = None
        for s in stop_picks:
            if isinstance(s, dict) and s.get("name"):
                featured = s
                break
        if not featured and stops:
            featured = stops[0] if isinstance(stops[0], dict) else {"name": str(stops[0])}
        if not featured:
            return ""

        featured_name = featured.get("name", "this stop")
        featured_state = featured.get("state", "")
        featured_note = (featured.get("note") or featured.get("description") or "").strip()

        # Hook = the one stop most people skip on this route
        hook = (f"Most people drive past {featured_name} on the {name} route. "
                f"Here's why I'd stop.")
        # If we have a note, use ONLY the first sentence as hook so the full
        # note can sit in the body without repetition.
        body_extra = ""
        if featured_note:
            first = featured_note.split(". ")[0].rstrip(".")
            rest = featured_note[len(first) + 2:].strip() if len(featured_note) > len(first) + 2 else ""
            hook = f"On the {name} route, {featured_name} is the stop most people skip. {first}."
            body_extra = rest  # only the REST of the note, not the first sentence

        stop_count = len(stops)
        days_str = f"{days}-day" if days else "multi-day"
        meta_line = f"{name} · {days_str} · {stop_count} stops"

        tags = niche_tags(featured_state, "trek", dest_name=featured_name)
        cta = f"Comment '{name.split()[0].lower()}' — I'll DM the full route + timing breakdown."

        if platform == "facebook":
            url = utm(f"https://nakshiq.com/en/routes/{route_id}",
                      "social", "post", "route-spotlight-short",
                      content=build_utm_content(route_id, "route_spotlight_short"))
            body = [hook, meta_line]
            if body_extra:
                body.append(body_extra)
            if highlights:
                body.append("Other stops: " + ", ".join(h if isinstance(h, str) else h.get("name", "") for h in highlights[:3]))
            body.append(cta)
            body.append(f"Full route → {url}")
            body.append(tags)
            return "\n\n".join(b for b in body if b).strip()

        # IG
        body = [hook, meta_line]
        if body_extra:
            body.append(body_extra)
        body.append(cta)
        body.append("🔗 link in bio for the full route map.")
        body.append(tags)
        return "\n\n".join(b for b in body if b).strip()
    except Exception as e:
        log.warning(f"copy_route_spotlight_short error: {e} — SKIPPING")
        return ""


def copy_arrival_intel(arrival: dict, platform: str) -> str:
    """Airport arrival brief — prepaid taxi + scam warning + SIM tip."""
    try:
        iata = (arrival.get("iata") or "").strip()
        city = (arrival.get("city") or "").strip()
        state = (arrival.get("state") or "").strip()
        scam = (arrival.get("scam_warning") or "").strip()
        prepaid = (arrival.get("prepaid_taxi") or "").strip()
        sim = (arrival.get("sim_counters") or "").strip()
        dest_id = arrival.get("destination_id") or city.lower()

        if not city or not iata:
            return ""

        # Hook = the scam warning (everyone reads cautionary content)
        hook = f"The oldest scam at {iata} ({city}) airport — and how to avoid it."
        if scam:
            # First sentence as hook
            hook_alt = scam.split(".")[0].rstrip(".") + "."
            if 40 < len(hook_alt) < 200:
                hook = hook_alt

        scam_line = scam if scam else ""
        prepaid_short = ""
        if prepaid:
            # First sentence of prepaid info
            prepaid_short = prepaid.split(".")[0].rstrip(".") + "."

        sim_short = ""
        if sim:
            sim_short = sim.split(".")[0].rstrip(".") + "."

        tags = niche_tags(state, "emergency", dest_name=city)
        cta = f"Comment '{iata.lower()}' — I'll DM the full first-4-hours checklist."

        if platform == "facebook":
            url = utm(arrival.get("url") or f"https://nakshiq.com/en/arrival/{(arrival.get('slug') or iata.lower())}",
                      "social", "post", "arrival-intel",
                      content=build_utm_content(dest_id, "arrival_intel"))
            body = [hook, f"📍 {iata} · {city}, {state}"]
            if scam_line and scam_line != hook:
                body.append(scam_line)
            if prepaid_short:
                body.append(f"Prepaid taxi: {prepaid_short}")
            if sim_short:
                body.append(f"SIM: {sim_short}")
            body.append(cta)
            body.append(f"Full {iata} playbook → {url}")
            body.append(tags)
            return "\n\n".join(b for b in body if b).strip()

        # IG
        body = [hook, f"📍 {iata} · {city}"]
        if prepaid_short:
            body.append(prepaid_short)
        if scam_line and scam_line != hook:
            body.append("⚠️ " + scam_line)
        body.append(cta)
        body.append("🔗 link in bio for the full first-4-hours guide.")
        body.append(tags)
        return "\n\n".join(b for b in body if b).strip()
    except Exception as e:
        log.warning(f"copy_arrival_intel error: {e} — SKIPPING")
        return ""


def copy_women_solo_brief(dest: dict, platform: str) -> str:
    """Curated solo-female-safe dest for current month."""
    try:
        name = (dest.get("destination_name") or dest.get("name") or "").strip()
        dest_id = dest.get("destination_id") or dest.get("id")
        state = (dest.get("state") or "").strip()
        score = dest.get("score")
        solo_score = dest.get("solo_female_score")
        solo_note = (dest.get("solo_female_note") or "").strip()
        tagline = (dest.get("tagline") or "").strip()
        difficulty = (dest.get("difficulty") or "").strip()

        if not name or not dest_id:
            return ""

        # Hook = the dest-specific note or a safety-focused framing
        hook = solo_note if (solo_note and len(solo_note) > 30) else (
            f"{name} is one of the few destinations where I'd send a solo traveller "
            f"to in {month_name()} without a second thought."
        )

        score_line_parts = []
        if score:
            score_line_parts.append(f"NakshIQ {score}/5 this {month_name()}")
        if solo_score:
            score_line_parts.append(f"Solo-female safety: {solo_score}/5")
        if difficulty:
            score_line_parts.append(difficulty.title())
        score_line = " · ".join(score_line_parts)

        tags = niche_tags(state, "emergency", dest_name=name)  # safety theme
        cta = f"Comment '{name.split()[0].lower()}' — I'll DM the safety-specific stays + transport notes."

        if platform == "facebook":
            url = utm(f"https://nakshiq.com/en/destination/{dest_id}",
                      "social", "post", "women-solo-brief",
                      content=build_utm_content(dest_id, "women_solo_brief"))
            body = [hook, f"📍 {name}, {state}"]
            if score_line:
                body.append(score_line)
            if tagline and tagline not in hook:
                body.append(tagline)
            body.append(cta)
            body.append(f"Full {name} guide → {url}")
            body.append(tags)
            return "\n\n".join(b for b in body if b).strip()

        # IG
        body = [hook, f"📍 {name}"]
        if score_line:
            body.append(score_line)
        body.append(cta)
        body.append("🔗 link in bio for safety-specific stays + transport.")
        body.append(tags)
        return "\n\n".join(b for b in body if b).strip()
    except Exception as e:
        log.warning(f"copy_women_solo_brief error: {e} — SKIPPING")
        return ""


def copy_cost_index_card(dest: dict, platform: str) -> str:
    """₹/day breakdown for a destination — budget reality card."""
    try:
        name = (dest.get("destination_name") or dest.get("name") or "").strip()
        dest_id = dest.get("destination_id") or dest.get("id")
        state = (dest.get("state") or "").strip()
        sleep_range = (dest.get("sleep_price_range_inr") or "").strip()
        sleep_options = dest.get("sleep_options_count")
        reach_summary = (dest.get("reach_summary") or "").strip()
        fuel_warning = (dest.get("fuel_warning") or "").strip()

        if not name or not dest_id:
            return ""
        if not sleep_range and not reach_summary:
            log.info(f"cost_index_card for {name}: no price/reach data — SKIPPING")
            return ""

        # Hook = budget-honesty framing
        hook = (f"{name} costs less than you think. Or more — depending on which "
                f"part of {month_name()} you go.")
        if sleep_range:
            hook = f"What 24 hours in {name} actually costs."

        rows = []
        if sleep_range:
            count = f" ({sleep_options} options)" if sleep_options else ""
            rows.append(f"🛏️ Sleep: ₹{sleep_range}/night{count}")
        if reach_summary:
            rows.append(f"🚗 Reach: {reach_summary}")
        if fuel_warning:
            rows.append(f"⛽ Fuel: {fuel_warning}")
        rows_block = "\n".join(rows)

        tags = niche_tags(state, "stays", dest_name=name)
        cta = f"Comment '{name.split()[0].lower()}' — I'll DM the full ₹/day breakdown by traveller type."

        if platform == "facebook":
            url = utm(f"https://nakshiq.com/en/destination/{dest_id}",
                      "social", "post", "cost-index-card",
                      content=build_utm_content(dest_id, "cost_index_card"))
            body = [hook, f"📍 {name}, {state} · {month_name()}", rows_block, cta,
                    f"Full {name} cost breakdown → {url}", tags]
            return "\n\n".join(b for b in body if b).strip()

        # IG
        body = [hook, f"📍 {name} · {month_name()}", rows_block, cta,
                "🔗 link in bio for the full ₹/day breakdown.", tags]
        return "\n\n".join(b for b in body if b).strip()
    except Exception as e:
        log.warning(f"copy_cost_index_card error: {e} — SKIPPING")
        return ""


def _first_qualifying_dest(dest_map_full: dict) -> dict:
    """Helper for collection_series fallback — return any dest with score >=4."""
    for d in dest_map_full.values():
        if (d.get("score") or 0) >= 4:
            return d
    return next(iter(dest_map_full.values()), {})


# ─────────────────────────────────────────────────────────────────────────────
# MOAT COPY FUNCTIONS
# -----------------------------------------------------------------------------
# These are the brand/identity/methodology posts that build the acquisition
# narrative. Each function maps to one "angle" in MOAT_ANGLES and one section
# of NakshIQ_Master_Playbook.md.
# ─────────────────────────────────────────────────────────────────────────────

def copy_methodology(dimension: str, platform: str) -> str:
    """Methodology deep-dive — pulls content from METHODOLOGY_CONTENT constant.
    Moat layer: DATA (10,000+ proprietary datapoints, public methodology)."""
    c = METHODOLOGY_CONTENT.get(dimension)
    if not c:
        return ""  # will trigger fallback in dispatcher
    signals = "\n".join(f"{i+1}. {s}" for i, s in enumerate(c["signals"]))
    if platform == "facebook":
        return (
            f"{c['title']} — THE METHODOLOGY\n\n"
            f"Every NakshIQ score for this dimension is derived from:\n\n"
            f"{signals}\n\n"
            f"{c['closing']}\n\n"
            f"Full methodology: {utm('https://nakshiq.com/methodology', 'social', 'post', 'methodology')}\n\n"
            f"{TOTAL_DESTINATIONS} destinations. Scored monthly. Zero paid placements.\n\n"
            + hashtag("Methodology", "HowWeScore",
                      "TransparentData", "ScoringMethod", "NakshIQ")
        ).strip()
    return (
        f"{c['title']}\n\n"
        f"{signals}\n\n"
        f"{c['closing']}\n\n"
        f"↓ Full methodology → {utm('https://nakshiq.com/methodology', 'social', 'post', 'methodology')}\n\n"
        + hashtag("Methodology", "HowWeScore",
                  "TransparentData", "ScoringMethod", "NakshIQ")
    ).strip()


def copy_skip_list(dest: dict, platform: str,
                   forward_month: str | None = None,
                   forward_score: int | None = None) -> str:
    """Skip List — a destination with a low score (either this month or
    a drop coming in `forward_month`). Moat layer: TRUST BRAND (willingness
    to say 'don't go'). If `forward_month` is set, the post becomes
    "upcoming skip list" for that month."""
    name    = dest["name"]
    state   = dest.get("state", "")
    note    = (dest.get("note") or dest.get("tagline") or "").strip()
    url     = dest_url(dest, "social", "post", "skip-list")
    this_mo = month_name().upper()

    if forward_month and forward_score is not None:
        # Forward-looking Skip List: "5/5 now but dropping to 2/5 in July"
        current_score = dest.get("score", 0)
        header = (f"🚩 UPCOMING SKIP LIST — {forward_month.upper()}\n\n"
                  f"{name.upper()} ({state}): {format_score(current_score)} this {this_mo.title()}.\n"
                  f"{format_score(forward_score)} in {forward_month}.")
    else:
        # Standard Skip List: destination scoring low THIS month
        score  = dest.get("score", 0)
        header = (f"🚩 SKIP LIST — {this_mo} {date.today().year}\n\n"
                  f"{name.upper()} ({state}): {format_score(score)} this month.")

    if platform == "facebook":
        return (
            f"{header}\n\n"
            f"{note}\n\n"
            f"Why we're publishing this: if we won't tell you when NOT to go, nobody will.\n"
            f"Other sites are paid to say every place is worth visiting.\n"
            f"We're paid by nobody.\n\n"
            f"Better alternatives → {utm('https://nakshiq.com/en/tourist-traps', 'social', 'post', 'skip-list')}\n\n"
            + hashtag("SkipList", name.replace(" ", ""),
                      f"{month_name()}Avoid", "HonestReview", "NakshIQ")
        ).strip()
    return (
        f"{header}\n\n"
        f"{note}\n\n"
        f"If we won't tell you when not to go, nobody will.\n"
        f"Zero paid placements. Ever.\n\n"
        f"↓ Better picks → {url}\n\n"
        + hashtag("SkipList", name.replace(" ", ""),
                  f"{month_name()}Avoid", "HonestReview", "NakshIQ")
    ).strip()


def copy_chinese_wall(platform: str) -> str:
    """The Chinese Wall — identity post. No destination data; pure manifesto.
    Moat layer: TRUST BRAND (editorial-revenue firewall)."""
    if platform == "facebook":
        return (
            f"THE CHINESE WALL\n\n"
            f"How NakshIQ makes money:\n"
            f"• Small commission on bookings IF you book through our affiliate — at no extra cost to you\n"
            f"• Upcoming: paid editorial newsletter\n\n"
            f"How we do NOT make money:\n"
            f"✗ NO money from tourism boards\n"
            f"✗ NO money from hotels for positive reviews\n"
            f"✗ NO money from destinations for higher scores\n"
            f"✗ NO sponsored content. Ever.\n"
            f"✗ NO display advertising\n\n"
            f"Year to date: ₹0 in paid placements. {TOTAL_DESTINATIONS} destinations scored.\n\n"
            f"Our editorial policy is published: {utm('https://nakshiq.com/editorial-policy', 'social', 'post', 'chinese-wall')}\n\n"
            f"This isn't marketing. It's the reason NakshIQ exists.\n\n"
            + hashtag("EditorialIntegrity", "NoPaidPlacements",
                      "ZeroSponsors", "TrustBrand", "NakshIQ")
        ).strip()
    return (
        f"THE CHINESE WALL\n\n"
        f"How we make money: small commission on bookings you choose.\n\n"
        f"How we don't:\n"
        f"✗ Tourism board money\n"
        f"✗ Hotel placement fees\n"
        f"✗ Sponsored content\n"
        f"✗ Display ads\n\n"
        f"Year-to-date: ₹0 in paid placements.\n"
        f"{TOTAL_DESTINATIONS} destinations scored.\n\n"
        f"Editorial policy → {utm('https://nakshiq.com/editorial-policy', 'social', 'post', 'chinese-wall')}\n\n"
        + hashtag("EditorialIntegrity", "NoPaidPlacements",
                  "ZeroSponsors", "TrustBrand", "NakshIQ")
    ).strip()


def copy_four_questions(platform: str) -> str:
    """Four Questions — identity post. Positions NakshIQ vs competitors.
    Moat layer: POSITIONING (owns decisions 1-4, cedes 5-6 to OTAs)."""
    if platform == "facebook":
        return (
            f"THE 4 QUESTIONS NOBODY ELSE ANSWERS\n\n"
            f"Planning an India trip, you need to know:\n\n"
            f"1. Is this destination worth visiting?\n"
            f"2. When specifically should I go — which month?\n"
            f"3. Is it safe — roads, weather, medical?\n"
            f"4. Can my family handle it?\n\n"
            f"Every other India travel site optimizes for:\n"
            f"5. Where do I stay?\n"
            f"6. How do I book?\n\n"
            f"We don't compete on 5 and 6. Book wherever you want.\n\n"
            f"But 1-4 — that's what we exist for.\n"
            f"{TOTAL_DESTINATIONS} destinations × 12 months × 6 dimensions = proprietary scores.\n"
            f"No advertiser paid for any of them.\n\n"
            f"{utm('https://nakshiq.com/en/explore', 'social', 'post', 'compare')}\n\n"
            + hashtag("4Questions", "WhenToGo",
                      "TravelSafety", "FamilyTravel", "NakshIQ")
        ).strip()
    return (
        f"THE 4 QUESTIONS\n"
        f"NOBODY ELSE ANSWERS\n\n"
        f"1. Worth visiting?\n"
        f"2. When — which month?\n"
        f"3. Is it safe?\n"
        f"4. Family-friendly?\n\n"
        f"Other sites answer where to stay + how to book.\n"
        f"We don't compete there.\n\n"
        f"But 1-4 — {TOTAL_DESTINATIONS} destinations deep.\n\n"
        f"↓ {utm('https://nakshiq.com/en/explore', 'social', 'post', 'compare')}\n\n"
        + hashtag("4Questions", "WhenToGo", "TravelSafety",
                  "FamilyTravel", "NakshIQ")
    ).strip()


def copy_data_provenance(dest: dict, platform: str) -> str:
    """Data Provenance — shows the work behind ONE destination's score.
    Moat layer: DATA (proprietary, measured, non-AI)."""
    name  = dest["name"]
    score = dest.get("score", 0)
    state = dest.get("state", "")
    elev  = dest.get("elevation_m", 0)
    tag   = dest.get("tagline", "")
    note  = (dest.get("note") or "").strip()
    diff  = (dest.get("difficulty") or "moderate").title()
    mon   = month_name()
    url   = dest_url(dest, "social", "post", "score-card")
    if platform == "facebook":
        return (
            f"WHY {name.upper()} SCORES {format_score(score)} IN {mon.upper()}\n\n"
            f"This isn't a vibe check. Here's what went into the score:\n\n"
            f"• Elevation: ↑ {elev:,}m (altitude tolerance factor)\n"
            f"• State: {state}\n"
            f"• Difficulty: {diff}\n"
            f"• {mon} note: {note or tag}\n\n"
            f"Our methodology is public. Every input is measurable.\n"
            f"No advertiser touches the score. No influencer gets a\n"
            f"discount for a glowing review. No tourism board subsidy.\n\n"
            f"{name} detail → {url}\n\n"
            + hashtag("DataProvenance", "HowWeScore",
                      name.replace(" ", ""), state.replace(" ", ""), "NakshIQ")
        ).strip()
    return (
        f"WHY {name.upper()}: {format_score(score)}\n"
        f"· {mon.upper()} ·\n\n"
        f"↑ {elev:,}m · {state}\n"
        f"Difficulty: {diff}\n\n"
        f"{note or tag}\n\n"
        f"Not a vibe. Measured.\n"
        f"No advertiser. No subsidy. No influencer discount.\n\n"
        f"↓ {url}\n\n"
        + hashtag("DataProvenance", "HowWeScore", name, state)
    ).strip()


def copy_same_place_12_months(dest: dict, monthly_scores: dict, platform: str) -> str:
    """Same Place, 12 Months — demonstrates monthly scoring.
    `monthly_scores` = {1: score, 2: score, ..., 12: score}.
    Moat layer: DATA (month-by-month granularity is unique to NakshIQ)."""
    name = dest["name"]
    url  = dest_url(dest, "social", "post", "score-card")
    months_abbr = ["JAN","FEB","MAR","APR","MAY","JUN",
                   "JUL","AUG","SEP","OCT","NOV","DEC"]
    lines = "\n".join(
        f"  {months_abbr[i]}: {format_score(monthly_scores.get(i+1))}"
        for i in range(12)
    )
    if platform == "facebook":
        return (
            f"{name.upper()} — ALL 12 MONTHS\n\n"
            f"One place. 12 different answers.\n"
            f"This is why 'best time to visit X' isn't something you\n"
            f"can Google in one query. Weather, crowds, infrastructure,\n"
            f"and safety all change month by month.\n\n"
            f"{lines}\n\n"
            f"NakshIQ scores every destination monthly. No other site does.\n\n"
            f"Full monthly data → {url}\n\n"
            + hashtag("MonthlyScores", name.replace(" ", ""),
                      "12Months", "BestTimeToVisit", "NakshIQ")
        ).strip()
    return (
        f"{name.upper()}\n"
        f"12 months. 12 answers.\n\n"
        f"{lines}\n\n"
        f"'Best time to visit' isn't one query.\n"
        f"We score every destination monthly.\n\n"
        f"↓ {url}\n\n"
        + hashtag("MonthlyScores", name.replace(" ", ""),
                  "12Months", "BestTimeToVisit", "NakshIQ")
    ).strip()


def copy_route_spotlight(route: dict, dest_map: dict, platform: str) -> str:
    """
    Route / road-trip feature. Expected route fields (per the social-media-prompt
    doc): name, days, difficulty, stops[], highlights[], kids_suitable, bike_route.
    This function tolerates partial data because Nakshiq hasn't yet exposed the
    full route schema via the content API.
    """
    name       = route.get("name") or route.get("title") or "Road Trip"
    days       = route.get("days") or route.get("duration_days") or "?"
    difficulty = (route.get("difficulty") or "moderate").title()
    stops      = route.get("stops") or []
    highlights = route.get("highlights") or []
    kids_ok    = bool(route.get("kids_suitable"))
    bike_ok    = bool(route.get("bike_route"))
    url        = utm((route.get("url") or
                  f"https://nakshiq.com/en/routes/{route.get('id','')}").strip(),
                  "social", "post", "route")

    stop_line = ""
    if stops:
        stop_names = [s.get("name") if isinstance(s, dict) else str(s) for s in stops[:6]]
        stop_line  = " → ".join(stop_names)

    highlight_lines = ""
    if highlights:
        highlight_lines = "\n".join(f"• {h}" for h in highlights[:4])

    badges = []
    if kids_ok:  badges.append("Family-friendly")
    if bike_ok:  badges.append("Bike-friendly")
    badge_line = " · ".join(badges)

    tags = hashtag("RoadTrip", name.replace(" ", "").replace("–", ""),
                   f"{days}DayTrip", difficulty.replace(" ", ""), "NakshIQ")

    if platform == "facebook":
        return (
            f"ROUTE — {name.upper()}\n\n"
            f"{days} days · {difficulty}"
            + (f" · {badge_line}" if badge_line else "") + "\n\n"
            + (f"{stop_line}\n\n" if stop_line else "")
            + (f"{highlight_lines}\n\n" if highlight_lines else "")
            + f"Full day-by-day plan → {url}\n\n{tags}"
        ).strip()
    return (
        f"{name.upper()}\n"
        f"{days}-DAY ROUTE · {difficulty}\n\n"
        + (f"{stop_line}\n\n" if stop_line else "")
        + (f"{highlight_lines}\n\n" if highlight_lines else "")
        + (f"{badge_line}\n\n" if badge_line else "")
        + f"↓ Full itinerary → {url}\n\n{tags}"
    ).strip()


def copy_blog_promo(article: dict, platform: str) -> str:
    title    = article.get("title", "New on NakshIQ")
    excerpt  = (article.get("excerpt") or "").strip()
    if len(excerpt) > 220:
        excerpt = excerpt[:217].rstrip() + "…"
    minutes  = article.get("reading_time", 5)
    category = (article.get("category") or "india-travel").replace("-", "")
    cat_tag  = "".join(w.capitalize() for w in (article.get("category") or "").split("-"))
    url      = utm((article.get("url") or
                f"https://nakshiq.com/en/blog/{article.get('slug','')}").strip(),
                "social", "post", "article")
    tags = hashtag(cat_tag or "TravelRead", f"{minutes}MinRead",
                   "NakshIQBlog", "TravelIntel", "NakshIQ")
    return (
        f"NEW on NakshIQ: {title}\n\n"
        f"{excerpt}\n\n"
        f"📖 {minutes} min read\n\n"
        f"→ {url}\n\n{tags}"
    ).strip()


def _pick_kid_friendly(pool: list) -> dict:
    """Return the most kid-friendly destination from the pool (easy + lower elevation)."""
    if not pool:
        return None
    rank = lambda d: (
        0 if (d.get("difficulty") or "").lower() == "easy" else
        (1 if (d.get("difficulty") or "").lower() == "moderate" else 2),
        d.get("elevation_m", 9999),
    )
    return sorted(pool, key=rank)[0]


def _collection_image_dest(collection: dict, dest_map: dict,
                           dest_map_full: dict | None = None) -> dict | None:
    """Return a destination object whose image we can borrow for a collection post.

    Two-pass lookup: prefer this month's scored pool (better hero image), fall
    back to the full catalog. Off-season collections (e.g. monsoon beaches in
    May) MUST still resolve to a member of the collection — never to the day's
    shared `best` dest, which would land us with mismatches like the
    'Best Beaches' Story carrying a Tirthan Valley image (incident 2026-05-06).
    """
    items = collection.get("items", [])
    for item in items:
        did = item.get("destination_id")
        if did in dest_map:
            return dest_map[did]
    if dest_map_full:
        for item in items:
            did = item.get("destination_id")
            if did in dest_map_full:
                return dest_map_full[did]
    return None


def _article_image_dest(article: dict, dest_map: dict,
                        dest_map_full: dict | None = None) -> dict | None:
    """Return a destination object whose image we can borrow for a blog post.

    Same two-pass pattern as _collection_image_dest. Articles that span
    off-season destinations (e.g. a beach roundup in May) need full-catalog
    lookup so the image stays on-topic.
    """
    dests = article.get("destinations") or []
    for did in dests:
        if did in dest_map:
            return dest_map[did]
    if dest_map_full:
        for did in dests:
            if did in dest_map_full:
                return dest_map_full[did]
    return None


# ─────────────────────────────────────────────────────────────────────────────
# POST GENERATOR
# ─────────────────────────────────────────────────────────────────────────────

def generate_post(fmt: str, content: dict, platform: str,
                  used: set) -> tuple[str, dict | None]:
    """Returns (caption, dest_obj | None). dest_obj carries image + video URLs."""
    destinations = content["destinations"].get("data", [])
    traps        = content["traps"].get("data", [])
    collections  = content.get("collections", {}).get("data", []) or []
    # Combine current + next month festivals so __run_festival__ from either
    # bucket is reachable here. Truthiness only — pick is already locked.
    festivals    = ((content.get("festivals",      {}).get("data", []) or [])
                    + (content.get("festivals_next", {}).get("data", []) or []))
    articles     = content.get("articles",    {}).get("data", []) or []
    fresh        = [d for d in destinations if d["id"] not in used]
    pool         = fresh if fresh else destinations
    dest_map     = {d["id"]: d for d in destinations}
    # Wider catalog map — lets us resolve festival home destinations that
    # aren't in the current month's top-scoring slice (e.g. Amritsar in April).
    full_dests   = content.get("destinations_full", {}).get("data", []) or []
    dest_map_full = {d["id"]: d for d in full_dests}
    if not pool:
        return None, None

    # Use the run-scoped shared best (pre-picked before the per-account loop)
    # so that split-format days (e.g. Thu IG=score_card, FB=collection_spotlight)
    # always anchor on the same destination across platforms.
    best = content.get("__run_best__") or pick_best_destination(pool, used, content)

    if fmt == "score_card" and best:
        return copy_score_card(best, platform), best

    elif fmt == "reality_check":
        # Use the run-scoped pair if pre-picked (ensures FB and IG use the same contrast).
        pair = content.get("__run_pair__")
        caption, dest_id = copy_reality_check(pool, platform, pair=pair)
        dest_obj = (pair[1] if pair else None) or next((d for d in pool if d["id"] == dest_id), best)
        return caption, dest_obj

    elif fmt == "data_carousel":
        # CHANGED 2026-05-03: anchor cover image on first carousel slide so
        # caption + visual match. Falls back to pool[0] if carousel-dests not set.
        carousel_dests = content.get("__run_carousel_dests__data_carousel") or pool[:5]
        cover = carousel_dests[0] if carousel_dests else (pool[0] if pool else None)
        return copy_data_carousel(carousel_dests[:5], platform), cover

    elif fmt == "tourist_trap" and traps:
        # CHANGED 2026-05-03: image must match the trap's home destination,
        # not the unrelated shared_best. Same pattern as festival_alert.
        trap = traps[0]
        trap_did = trap.get("destination_id") or trap.get("dest_id")
        trap_dest = dest_map_full.get(trap_did) if trap_did else None
        return copy_tourist_trap(trap, platform), (trap_dest or best)

    elif fmt == "infrastructure_truth" and best:
        return copy_infrastructure_truth(best, platform), best

    elif fmt == "monthly_forecast":
        # CHANGED 2026-05-03: anchor cover image on first carousel slide so
        # caption + visual match. Falls back to pool[0] if no carousel-dests.
        carousel_dests = content.get("__run_carousel_dests__monthly_forecast") or pool
        cover = carousel_dests[0] if carousel_dests else (pool[0] if pool else None)
        return copy_monthly_forecast(carousel_dests, platform), cover

    elif fmt == "collection_spotlight" and collections:
        # Pre-picked at run start so FB + IG show the same collection
        coll = content.get("__run_collection__") or collections[0]
        # Image MUST come from the collection's own destinations, never from
        # the day's shared `best`. Otherwise a "Best Beaches" collection ships
        # with a Himalayan image (incident: 2026-05-06 IG Story for
        # 'Best Beaches in India — Beyond Goa' carried a Tirthan Valley image).
        img = _collection_image_dest(coll, dest_map, dest_map_full)
        if not img:
            log.warning(
                f"collection_spotlight: no member of '{coll.get('name')}' "
                f"resolves in catalog — falling back to score_card to avoid "
                f"caption/image mismatch."
            )
            return copy_score_card(best, platform), best
        return copy_collection_spotlight(coll, dest_map, platform), img

    elif fmt == "festival_alert" and festivals:
        fest = content.get("__run_festival__") or festivals[0]
        fest_did = fest.get("destination_id")
        # Prefer the festival's own home destination (correct video + image).
        # Try monthly map first (already-fetched, scored), then fall back to
        # the full catalog (covers off-season home destinations like Amritsar
        # in April). Only fall through to `best` if neither resolves — and
        # log a clear warning so the mismatch is visible.
        img = dest_map.get(fest_did) or dest_map_full.get(fest_did)
        if not img:
            log.warning(
                f"festival_alert: home destination '{fest_did}' for festival "
                f"'{fest.get('name')}' not found in catalog — falling back to "
                f"score_card to avoid caption/video mismatch."
            )
            return copy_score_card(best, platform), best
        return copy_festival_alert(fest, dest_map, platform), img

    elif fmt == "kids_intel":
        kid_dest = content.get("__run_kid_dest__") or _pick_kid_friendly(pool)
        return copy_kids_intel(kid_dest, platform), kid_dest

    elif fmt == "blog_promo" and articles:
        article = content.get("__run_article__") or articles[0]
        # Search the article's destinations against this month's pool first,
        # then the full catalog. Falling through to `best` produced the
        # Tirthan-on-a-beach-article Story on 2026-05-06.
        img = _article_image_dest(article, dest_map, dest_map_full)
        if not img:
            log.warning(
                f"blog_promo: article '{article.get('title')}' has no "
                f"linked destinations in catalog — falling back to score_card "
                f"to avoid caption/image mismatch."
            )
            return copy_score_card(best, platform), best
        return copy_blog_promo(article, platform), img

    elif fmt == "route_spotlight":
        routes = content.get("routes", {}).get("data", []) or []
        if not routes:
            # Data not yet available — fall back silently to score_card
            return copy_score_card(best, platform), best
        route = content.get("__run_route__") or routes[0]
        # Image MUST come from a stop on the route. Iterate every stop against
        # this month's pool first, then the full catalog. The previous code
        # only checked the FIRST stop and only against dest_map, so an
        # off-season route (e.g. Ladakh circuit in May) would silently
        # ship with `best` as its hero — same class of bug as collection_spotlight.
        stops = route.get("stops", []) or []
        def _stop_id(s):
            return s.get("destination_id") if isinstance(s, dict) else s
        img = None
        for s in stops:
            sid = _stop_id(s)
            if sid in dest_map:
                img = dest_map[sid]
                break
        if not img:
            for s in stops:
                sid = _stop_id(s)
                if sid in dest_map_full:
                    img = dest_map_full[sid]
                    break
        if not img:
            log.warning(
                f"route_spotlight: no stops of route '{route.get('name')}' "
                f"resolve in catalog — falling back to score_card."
            )
            return copy_score_card(best, platform), best
        return copy_route_spotlight(route, dest_map, platform), img

    # ───────────────────────────────────────────────────────────────────────
    # MOAT formats — identity / methodology / trust-brand posts
    # ───────────────────────────────────────────────────────────────────────
    elif fmt and fmt.startswith("methodology_"):
        dimension = fmt.replace("methodology_", "")
        caption   = copy_methodology(dimension, platform)
        # Image: any scored destination as backdrop (best works fine)
        return caption, best

    elif fmt == "skip_list":
        # Prefer the run-scoped pre-pick; otherwise dig through destinations_low
        target = content.get("__run_skip_dest__")
        if not target:
            low_all = content.get("destinations_low", {}).get("data", []) or []
            lows    = [d for d in low_all if 1 <= (d.get("score") or 0) <= 3]
            target  = lows[0] if lows else best
        # Forward-looking Skip List: if the pre-pick set a future month + score,
        # pass them so the caption renders "5/5 now → 2/5 next month".
        fwd = content.get("__run_skip_forward__")
        if fwd:
            fwd_month, fwd_score = fwd
            return copy_skip_list(target, platform,
                                  forward_month=fwd_month,
                                  forward_score=fwd_score), target
        return copy_skip_list(target, platform), target

    elif fmt == "chinese_wall":
        # Identity post — no destination data, but attach a scored-destination
        # image as visual anchor so it doesn't look like pure text.
        return copy_chinese_wall(platform), best

    elif fmt == "four_questions":
        return copy_four_questions(platform), best

    elif fmt == "data_provenance":
        # Feature the most-data-rich destination (has note + tagline + high score)
        candidates = [d for d in destinations if d.get("note") and d.get("tagline")
                      and d["id"] not in used] or [d for d in destinations if d.get("note")]
        target = content.get("__run_provenance_dest__") or (candidates[0] if candidates else best)
        return copy_data_provenance(target, platform), target

    elif fmt == "same_place_12_months":
        target = content.get("__run_12month_dest__") or best
        monthly = content.get("__run_12month_scores__") or {}
        return copy_same_place_12_months(target, monthly, platform), target

    # ───────────────────────────────────────────────────────────────────────
    # NEW data-driven formats (Tier 2 morning round-robin)
    # ───────────────────────────────────────────────────────────────────────
    elif fmt == "seasonal_shift":
        target      = content.get("__run_seasonal_dest__") or best
        next_month  = content.get("__run_seasonal_month__", "next month")
        next_score  = content.get("__run_seasonal_score__", 2)
        return copy_seasonal_shift(target, next_month, next_score, platform), target

    elif fmt == "elevation_face_off":
        low_dest  = content.get("__run_elev_low__") or best
        high_dest = content.get("__run_elev_high__") or best
        return copy_elevation_face_off(low_dest, high_dest, platform), high_dest

    elif fmt == "state_showdown":
        dest_a = content.get("__run_showdown_a__") or best
        dest_b = content.get("__run_showdown_b__") or best
        return copy_state_showdown(dest_a, dest_b, platform), dest_a

    elif fmt == "difficulty_spectrum":
        easy_dest = content.get("__run_diff_easy__") or best
        hard_dest = content.get("__run_diff_hard__") or best
        return copy_difficulty_spectrum(easy_dest, hard_dest, platform), easy_dest

    elif fmt == "underdog_spotlight":
        target = content.get("__run_underdog__") or best
        return copy_underdog_spotlight(target, platform), target

    elif fmt == "this_month_only":
        target     = content.get("__run_thismonth_dest__") or best
        prev_score = content.get("__run_thismonth_prev__", 2)
        next_score = content.get("__run_thismonth_next__", 2)
        return copy_this_month_only(target, prev_score, next_score, platform), target

    elif fmt == "adventure_pick":
        target = content.get("__run_adventure__") or best
        return copy_adventure_pick(target, platform), target

    elif fmt == "weekend_escape":
        target = content.get("__run_weekend__") or best
        return copy_weekend_escape(target, platform), target

    # ───────────────────────────────────────────────────────────────────────
    # Tier 2.5 — fresh-content formats (eateries, treks)
    # ───────────────────────────────────────────────────────────────────────
    elif fmt == "eateries_pick":
        eateries = content.get("eateries", {}).get("data", []) or []
        if not eateries:
            log.info("eateries_pick: no eateries available — falling back to score_card")
            return copy_score_card(best, platform), best
        # Run-scoped pre-pick (set in main loop) for FB/IG anchor consistency.
        pick = content.get("__run_eatery__") or eateries[0]
        # Resolve image: home destination's hero, fall back to shared best
        img = dest_map_full.get(pick.get("destination_id")) or dest_map.get(pick.get("destination_id")) or best
        return copy_eateries_pick(pick, dest_map, platform), img

    elif fmt == "trek_intel":
        treks = content.get("treks", {}).get("data", []) or []
        if not treks:
            log.info("trek_intel: no treks available — falling back to score_card")
            return copy_score_card(best, platform), best
        pick = content.get("__run_trek__") or treks[0]
        img = dest_map_full.get(pick.get("destination_id")) or dest_map.get(pick.get("destination_id")) or best
        return copy_trek_intel(pick, dest_map, platform), img

    # ───────────────────────────────────────────────────────────────────────
    # Tier 6 — coverage-gap formats (added 2026-05-10)
    # ───────────────────────────────────────────────────────────────────────
    elif fmt == "stays_pick":
        stays = content.get("stays", {}).get("data", []) or []
        if not stays:
            log.info("stays_pick: no stays available — falling back to score_card")
            return copy_score_card(best, platform), best
        pick = content.get("__run_stay__") or stays[0]
        img = dest_map_full.get(pick.get("destination_id")) or dest_map.get(pick.get("destination_id")) or best
        return copy_stays_pick(pick, dest_map_full or dest_map, platform), img

    elif fmt == "emergency_intel":
        sos_list = content.get("emergency", {}).get("data", []) or []
        if len(sos_list) < 5:
            log.info(f"emergency_intel: only {len(sos_list)} SOS records — falling back")
            return copy_score_card(best, platform), best
        pick = content.get("__run_sos__") or sos_list[0]
        img = dest_map_full.get(pick.get("destination_id")) or dest_map.get(pick.get("destination_id")) or best
        return copy_emergency_intel(pick, dest_map_full or dest_map, platform), img

    elif fmt == "viral_eats_pick":
        viral = content.get("viral_eats", {}).get("data", []) or []
        if not viral:
            log.info("viral_eats_pick: no viral eats available — falling back to score_card")
            return copy_score_card(best, platform), best
        pick = content.get("__run_viral__") or viral[0]
        img = dest_map_full.get(pick.get("destination_id")) or dest_map.get(pick.get("destination_id")) or best
        return copy_viral_eats_pick(pick, dest_map_full or dest_map, platform), img

    elif fmt == "camping_intel":
        camps = content.get("camping", {}).get("data", []) or []
        if not camps:
            log.info("camping_intel: no camping spots available — falling back to score_card")
            return copy_score_card(best, platform), best
        pick = content.get("__run_camp__") or camps[0]
        img = dest_map_full.get(pick.get("destination_id")) or dest_map.get(pick.get("destination_id")) or best
        return copy_camping_intel(pick, dest_map_full or dest_map, platform), img

    elif fmt == "confidence_intel":
        # Use `best` (already a high-scoring dest with confidence_cards loaded)
        return copy_confidence_intel(best, platform), best

    elif fmt == "collection_series":
        colls = content.get("collections", {}).get("data", []) or []
        eligible_colls = [c for c in colls if (c.get("itemCount") or 0) >= 5]
        if not eligible_colls:
            log.info("collection_series: no eligible collections — SKIPPING")
            return "", None
        pick_coll = content.get("__run_coll_series__") or eligible_colls[0]
        # Series index: rotates through items via state.theme_usage["coll_series"][coll_id]
        # For now, use a deterministic-by-day picker so each day surfaces the next item.
        series_idx = (date.today().toordinal() % max(1, pick_coll.get("itemCount") or 1))
        caption = copy_collection_series(pick_coll, dest_map, dest_map_full, series_idx, platform)
        if not caption:
            return "", None
        # Find the dest object (for image / dedupe) — items can be strings or dicts
        items = pick_coll.get("items") or []
        idx = max(0, min(series_idx, len(items) - 1))
        item = items[idx]
        item_id = item if isinstance(item, str) else (item.get("destination_id") or item.get("id"))
        item_dest = dest_map_full.get(item_id) or dest_map.get(item_id) or best
        return caption, item_dest

    # ─── Tier 7 Phase 2 (2026-05-17) — 7 restored/new format dispatches ──
    elif fmt == "hidden_gem_reveal":
        gems = content.get("hidden_gems", {}).get("data", []) or []
        if not gems:
            log.info("hidden_gem_reveal: no gems available — SKIPPING")
            return "", None
        gem = content.get("__run_hidden_gem__") or gems[0]
        # Anchor image on the near-destination (parent dest)
        near_id = gem.get("near_destination_id")
        gem_dest = dest_map_full.get(near_id) or dest_map.get(near_id) or best
        return copy_hidden_gem_reveal(gem, dest_map_full or dest_map, platform), gem_dest

    elif fmt == "route_spotlight_short":
        routes = content.get("routes", {}).get("data", []) or []
        if not routes:
            log.info("route_spotlight_short: no routes available — SKIPPING")
            return "", None
        route = content.get("__run_route_short__") or routes[0]
        # Featured stop's destination if resolvable
        stops = route.get("stops") or []
        featured_id = None
        for s in stops:
            if isinstance(s, dict) and s.get("destination_id"):
                featured_id = s["destination_id"]
                break
        route_dest = (dest_map_full.get(featured_id) if featured_id else None) or best
        return copy_route_spotlight_short(route, dest_map_full or dest_map, platform), route_dest

    elif fmt == "tourist_trap":
        traps = content.get("traps", {}).get("data", []) or []
        if not traps:
            log.info("tourist_trap: no traps available — SKIPPING")
            return "", None
        trap = content.get("__run_trap__") or traps[0]
        # Anchor image on the ALTERNATIVE dest (not the trap)
        alt_id = (trap.get("alternative") or {}).get("id")
        trap_dest = dest_map_full.get(alt_id) or dest_map.get(alt_id) or best
        return copy_tourist_trap(trap, platform), trap_dest

    elif fmt == "arrival_intel":
        airports = content.get("arrival", {}).get("data", []) or []
        if not airports:
            log.info("arrival_intel: no airport data — SKIPPING")
            return "", None
        airport = content.get("__run_arrival__") or airports[0]
        airport_dest = dest_map_full.get(airport.get("destination_id")) or best
        return copy_arrival_intel(airport, platform), airport_dest

    elif fmt == "women_solo_brief":
        ws_dests = content.get("women_solo", {}).get("data", []) or []
        if not ws_dests:
            log.info("women_solo_brief: no curated dests — SKIPPING")
            return "", None
        ws_pick = content.get("__run_women_solo__") or ws_dests[0]
        ws_dest = dest_map_full.get(ws_pick.get("destination_id")) or dest_map.get(ws_pick.get("destination_id")) or best
        return copy_women_solo_brief(ws_pick, platform), ws_dest

    elif fmt == "cost_index_card":
        ci_dests = content.get("cost_index", {}).get("data", []) or []
        if not ci_dests:
            log.info("cost_index_card: no cost-index data — SKIPPING")
            return "", None
        ci_pick = content.get("__run_cost_index__") or ci_dests[0]
        ci_dest = dest_map_full.get(ci_pick.get("destination_id")) or dest_map.get(ci_pick.get("destination_id")) or best
        return copy_cost_index_card(ci_pick, platform), ci_dest

    # 2026-05-20 — CSV-loaded v2/v3/v4 formats. Generic dispatcher: find a
    # dest from the current scored pool that passes _csv_fmt.is_eligible
    # (data fields resolve + asset present), then render caption via the
    # CSV template. SKIPs to score_card fallback if no eligible dest found.
    csv_specs = get_csv_specs()
    if fmt in csv_specs:
        spec = csv_specs[fmt]
        # 2026-05-21 same-day double-post guard. Re-read post_log.jsonl fresh
        # (not the load-time state snapshot) so a sibling run that posted
        # minutes ago is seen even before its state propagates through the
        # autoposter-state branch. Closes the chopta ×2 race — arrival_intel
        # then v2_pov_slow_morning, both falling back to the same {slug}.mp4.
        _today_dests, _today_media = destinations_posted_today_jsonl()
        # 2026-05-22 — augment the scored pool with asset-backed dests from the
        # full catalog (dests outside today's 20-dest slice that carry a
        # purpose-built CSV asset). Asset-backed go FIRST so a format-specific
        # asset always wins over a pool dest's generic image; both are 14-day
        # `used`-filtered so the few asset-dests rotate instead of spamming one.
        _pool_ids = {p.get("id") for p in pool}
        _csv_pool = [
            d for d in asset_backed_csv_dests(content)
            if d.get("id") not in _pool_ids and d.get("id") not in used
        ] + pool
        # Try every candidate until one is eligible. Cheap; short-circuits.
        for cand in _csv_pool:
            cid = cand.get("id") or cand.get("slug") or ""
            if cid in _today_dests:
                log.info(
                    f"{fmt}: {cid} already posted today — SKIPPING dest "
                    f"(same-day guard)"
                )
                continue
            if cid and f"{cid}.mp4" in _today_media:
                log.info(
                    f"{fmt}: {cid}.mp4 already used today — SKIPPING dest "
                    f"(same-day media guard)"
                )
                continue
            ok, _reason = _csv_fmt.is_eligible(
                spec, cand, SOCIAL_IMAGE_LIBRARY_DIR
            )
            if not ok:
                continue
            # Render-time extra context: month + verification stamp + state
            # list for templates that need them. Add more keys as templates
            # demand (alias-expansion in csv_format_loader handles dest_*).
            from datetime import date as _date
            _HINDI_MONTHS = {
                1: "जनवरी", 2: "फ़रवरी", 3: "मार्च", 4: "अप्रैल",
                5: "मई", 6: "जून", 7: "जुलाई", 8: "अगस्त",
                9: "सितंबर", 10: "अक्टूबर", 11: "नवंबर", 12: "दिसंबर",
            }
            extras = {
                "month_name":        _date.today().strftime("%B"),
                "month_hindi":       _HINDI_MONTHS[_date.today().month],
                "verification_date": _date.today().isoformat(),
                "state_list":        cand.get("state", ""),
                "state_list_first":  cand.get("state", ""),
            }
            # v3_tl_poll_reel is a head-to-head — inject a second destination
            # from the pool. cand is dest_a (its asset matched); dest_b is the
            # next distinct pool dest. Winner = higher score (tie → dest_a).
            if fmt == "v3_tl_poll_reel":
                dest_b = next(
                    (d for d in pool if d.get("id") != cand.get("id")), None
                )
                if not dest_b:
                    continue  # need 2 dests; try next cand
                a_score = cand.get("score") or 0
                b_score = dest_b.get("score") or 0
                extras.update({
                    "dest_a_name":     cand.get("name", ""),
                    "dest_a_score":    a_score,
                    "dest_b_name":     dest_b.get("name", ""),
                    "dest_b_score":    b_score,
                    "data_winner_name": (
                        dest_b.get("name", "") if b_score > a_score
                        else cand.get("name", "")
                    ),
                })
            # v3_tl_editorial_listicle is a whole-state ranked list — build the
            # listicle body from the top-scored dests in cand's state. The
            # state-keyed asset (v3_tl_editorial_listicle-{state_slug}) matched
            # via the loader's state-slug fallback, so cand is any dest in that
            # state. Need >=5 scored dests to be worth a "listicle".
            if fmt == "v3_tl_editorial_listicle":
                state_name = cand.get("state", "")
                in_state = sorted(
                    [d for d in pool if d.get("state") == state_name],
                    key=lambda d: d.get("score") or 0, reverse=True,
                )[:10]
                if len(in_state) < 5:
                    continue  # too thin for a listicle; try next cand
                extras["listicle_body"] = "\n".join(
                    f"{i}. {d.get('name','')} · {d.get('score','?')}/5"
                    for i, d in enumerate(in_state, 1)
                )
                extras["listicle_count"] = len(in_state)
                # slide_gen.build_csv_carousel uses items + state_name to
                # render the listicle slide visually (not from listicle_body).
                extras["items"] = [
                    {"name": d.get("name",""), "score": d.get("score") or 0,
                     "id": d.get("id","")}
                    for d in in_state
                ]
                extras["state_name"] = state_name
            caption = _csv_fmt.render_caption(spec, cand, extra_context=extras)
            if caption:
                # Surface the purpose-built asset the eligibility check matched
                # so the posting loop attaches THAT file — not the dest's
                # generic Ken Burns clip. Shallow-copy so the `_csv_asset` key
                # never leaks onto the shared pool object.
                #
                # find_asset_or_dynamic() returns either:
                #   - a real Path        → static asset, upload as-is
                #   - DYNAMIC_ASSET      → slide_gen renders image slides
                #   - DEST_VIDEO_ASSET   → use dest["video"] R2 Ken Burns clip
                #   - None               → no path forward, skip
                asset = _csv_fmt.find_asset_or_dynamic(
                    spec, cand, SOCIAL_IMAGE_LIBRARY_DIR
                )
                out_dest = dict(cand)
                if asset is _csv_fmt.DYNAMIC_ASSET:
                    out_dest["_csv_asset"] = "__DYNAMIC__"
                    out_dest["_csv_spec_id"] = spec.format_id
                    # Stash anything render-time needs for slide_gen
                    if extras:
                        out_dest["_csv_extras"] = dict(extras)
                elif asset is _csv_fmt.DEST_VIDEO_ASSET:
                    out_dest["_csv_asset"] = "__DEST_VIDEO__"
                    out_dest["_csv_spec_id"] = spec.format_id
                elif asset:
                    out_dest["_csv_asset"] = str(asset)
                    out_dest["_csv_spec_id"] = spec.format_id
                return caption, out_dest
        # No dest passed eligibility — skip this format silently so picker
        # falls through to v1 next time. (Picker shouldn't have surfaced
        # this fmt if no dest was eligible, but defensive fallback.)
        log.info(f"{fmt}: no eligible dest at render time — SKIPPING")
        return "", None

    else:
        return copy_score_card(best, platform), best

# ─────────────────────────────────────────────────────────────────────────────
# OUTSTAND API CLIENT
# ─────────────────────────────────────────────────────────────────────────────

def _headers() -> dict:
    return {"Authorization": f"Bearer {OUTSTAND_API_KEY}", "Content-Type": "application/json"}

def outstand_get(path: str) -> dict:
    r = requests.get(f"{OUTSTAND_BASE}{path}", headers=_headers(), timeout=15)
    r.raise_for_status()
    return r.json()

def outstand_post_req(path: str, payload: dict, timeout: int = 30) -> dict:
    r = requests.post(f"{OUTSTAND_BASE}{path}", headers=_headers(), json=payload, timeout=timeout)
    try:
        return r.json()
    except Exception:
        log.warning(f"    outstand_post_req {path} returned non-JSON: status={r.status_code} body={r.text[:300]}")
        return {"success": False, "error": f"HTTP {r.status_code}: {r.text[:200]}"}

def get_connected_accounts() -> list:
    try:
        return outstand_get("/v1/social-accounts").get("data", [])
    except Exception as e:
        log.error(f"Could not fetch accounts: {e}")
        return []

# ─────────────────────────────────────────────────────────────────────────────
# MEDIA UPLOAD
# ─────────────────────────────────────────────────────────────────────────────

def _try_branded_image(url: str, filename: str, fmt: str = "feed") -> bytes | None:
    """
    Check if a branded social-library image exists for this destination URL.
    Returns the file bytes if found, or None to fall back to the remote URL.
    Wrapped in a blanket try/except so it can NEVER break the caller.

    ``fmt`` selects the aspect ratio variant — "feed" (1080x1080) or
    "story" (1080x1920). Story callers MUST pass fmt="story", otherwise IG
    crops the 1:1 feed asset to 9:16 and chops text off the sides.
    If the requested variant is missing, falls back to the feed variant so
    we never crash a Story upload over a missing asset.
    """
    try:
        from social_image_picker import pick_social_image
        # Extract destination slug from the URL: .../destinations/manali.jpg → manali
        stem = Path(url).stem if url else ""
        if not stem:
            return None
        # Try both the URL slug and a cleaned version
        img_path = pick_social_image(stem.replace("-", " "), fmt=fmt)
        # Fallback: if the requested variant doesn't exist, try the feed variant
        # so we never fail-open to the raw remote URL just because the story
        # asset is missing. For Stories, IG will still crop, but at least the
        # branded image is used.
        if not (img_path and img_path.exists()) and fmt != "feed":
            img_path = pick_social_image(stem.replace("-", " "), fmt="feed")
        if img_path and img_path.exists():
            data = img_path.read_bytes()
            log.info(f"    Using branded image: {img_path.name} ({len(data):,} bytes)")
            return data
    except Exception:
        pass  # Any failure → silent fallback to original URL
    return None


def upload_media(url: str, filename: str, content_type: str = "image/jpeg",
                 fmt: str = "feed") -> dict | None:
    """Download from URL → upload to Outstand R2 → confirm → return media obj.
    Prefers a branded image from social_image_library/ when available.

    ``fmt`` is forwarded to the branded-image picker. Pass "story" for
    IG Story uploads so the 1080x1920 variant is selected instead of the
    1:1 feed asset (which IG crops and chops off side text)."""
    try:
        # Try branded local image first (safe — falls back on any failure)
        if "image/jpeg" in content_type:
            branded = _try_branded_image(url, filename, fmt=fmt)
            if branded:
                return upload_media_bytes(branded, filename, content_type)

        # Original behavior: download from remote URL
        log.info(f"    Downloading: {url}")
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
        return upload_media_bytes(resp.content, filename, content_type)
    except Exception as e:
        log.warning(f"    Media upload exception: {e}")
        return None


def upload_media_bytes(data: bytes, filename: str, content_type: str = "image/jpeg") -> dict | None:
    """
    Upload raw bytes (from a local file / generated image) to Outstand R2.
    Returns the media object, or None on failure.
    """
    try:
        size = len(data)
        upload_timeout = 300 if "video" in content_type else 120
        log.info(f"    Requesting upload URL for {filename} ({size:,} bytes, {content_type})")
        r1 = outstand_post_req("/v1/media/upload",
                               {"filename": filename, "content_type": content_type})
        if not r1.get("success"):
            log.warning(f"    Upload URL failed: {r1}")
            return None
        log.info(f"    Uploading to R2 (timeout={upload_timeout}s)...")
        put = requests.put(r1["data"]["upload_url"], data=data,
                           headers={"Content-Type": content_type},
                           timeout=upload_timeout)
        if put.status_code != 200:
            log.warning(f"    R2 PUT failed: {put.status_code} — {put.text[:200]}")
            return None
        log.info(f"    R2 PUT OK. Confirming...")
        r3 = outstand_post_req(f"/v1/media/{r1['data']['id']}/confirm", {"size": size})
        if not r3.get("success"):
            log.warning(f"    Confirm failed: {r3}")
            return None
        m = r3["data"]
        log.info(f"    Media ready: {m['id']} ({size:,} bytes · {filename})")
        return m
    except Exception as e:
        log.warning(f"    Media upload exception: {e}")
        import traceback
        log.warning(f"    Traceback: {traceback.format_exc()}")
        return None

def _upload_csv_asset(path: str, label: str) -> tuple[dict | None, bool]:
    """Upload a Phase-2 / CSV-format asset (a local file) to Outstand.

    Returns (media_obj, is_video). media_obj is None on any failure so the
    caller cleanly falls back to the dest's generic media. The asset's own
    basename is kept as the upload filename so post_log's media_id reflects
    the real asset (e.g. v2_pov_slow_morning-chopta.mp4) and the 60-day
    media-reuse dedup window treats it as distinct from the generic clip.
    """
    ext = os.path.splitext(path)[1].lower()
    try:
        with open(path, "rb") as f:
            data = f.read()
    except OSError as e:
        log.warning(f"[{label}] Phase-2 asset read failed ({e}) — falling back.")
        return None, False
    if not data:
        log.warning(f"[{label}] Phase-2 asset is empty — falling back.")
        return None, False
    name = os.path.basename(path)
    if ext == ".mp4":
        m = upload_media_bytes(data, name, "video/mp4")
        if m:
            log.info(f"[{label}] Phase-2 asset → Reel: {name}")
        return m, bool(m)
    ctype = "image/png" if ext == ".png" else "image/jpeg"
    m = upload_media_bytes(data, name, ctype)
    if m:
        log.info(f"[{label}] Phase-2 asset → image: {name}")
    return m, False


def _render_csv_dynamic(spec_id: str, dest: dict, extras: dict | None,
                        label: str) -> tuple[dict | None, list[dict]]:
    """Render a CSV format's slides at post time via slide_gen and upload
    each to Outstand.

    Returns (single_media_obj, media_list). For `post_type=single` exactly one
    of those is populated (single_media_obj); for `post_type=carousel` it's
    media_list. On failure returns (None, []).

    This is the dynamic-render path for v2/v3/v4 single+carousel formats —
    no pre-rendered asset on disk required. slide_gen pulls the dest hero
    from R2 and composites brand-locked text overlays.
    """
    try:
        import tempfile
        from pathlib import Path as _Path
        import slide_gen
    except Exception as e:
        log.warning(f"[{label}] slide_gen unavailable for dynamic render ({e}).")
        return None, []
    specs = get_csv_specs() or {}
    spec = specs.get(spec_id)
    if not spec:
        log.warning(f"[{label}] dynamic render: unknown spec_id={spec_id}")
        return None, []
    try:
        with tempfile.TemporaryDirectory(prefix="nakshiq_csv_slides_") as td:
            out_dir = _Path(td)
            paths = slide_gen.build_csv_slides(spec, dest, extras or {}, out_dir)
            if not paths:
                log.warning(f"[{label}] dynamic render: 0 slides produced "
                            f"for {spec_id}")
                return None, []
            log.info(f"[{label}] dynamic render: {len(paths)} slide(s) for "
                     f"{spec_id} → uploading...")
            uploaded: list[dict] = []
            for p in paths:
                try:
                    with open(p, "rb") as f:
                        data = f.read()
                except OSError as e:
                    log.warning(f"[{label}] dynamic slide read failed ({e})")
                    continue
                m = upload_media_bytes(data, p.name, "image/png")
                if m:
                    uploaded.append(m)
            if not uploaded:
                return None, []
            if spec.post_type == "single":
                return uploaded[0], []
            return None, uploaded
    except Exception as e:
        log.warning(f"[{label}] dynamic render crashed ({e}).")
        return None, []


# ─────────────────────────────────────────────────────────────────────────────
# PUBLISHERS
# ─────────────────────────────────────────────────────────────────────────────

def build_media_item(m: dict) -> dict:
    return {"id": m["id"], "url": m["url"], "filename": m["filename"]}


# Instagram allows 2-10 media items per carousel. Cap at 10 for both platforms.
CAROUSEL_MAX_SLIDES = 10
# Legacy carousels — rendered by slide_gen.build_carousel_slides (the 3
# format_ids it knows). CSV carousels (v2_*/v3_*/v4_* with post_type=carousel)
# are added dynamically below from the loaded specs.
CAROUSEL_FORMATS    = {"data_carousel", "monthly_forecast", "collection_spotlight"}


def _csv_carousel_format_ids() -> set[str]:
    """v2/v3/v4 format_ids with post_type=carousel. Computed once from the
    loaded specs so the autoposter routes them through the multi-slide path
    instead of treating them as single-image posts. If the spec cache hasn't
    loaded yet (rare — module import order), returns empty."""
    try:
        specs = get_csv_specs() or {}
        return {fid for fid, s in specs.items() if s.post_type == "carousel"}
    except Exception:
        return set()


# Extend at import time so the rest of the file's `fmt in CAROUSEL_FORMATS`
# checks pick up CSV carousels too.
CAROUSEL_FORMATS |= _csv_carousel_format_ids()


def _build_branded_carousel(fmt: str, content: dict, destinations: list,
                            label: str = "") -> list:
    """
    Render branded 1080×1080 slides via slide_gen and upload each to Outstand.
    Returns [media_dict, ...] (title slide + destination slides + CTA slide) on
    success, or an empty list on any failure — caller should then fall back to
    raw-photo carousel.
    """
    try:
        # Lazy-import so a slide_gen or Pillow problem doesn't break sync-only runs.
        from slide_gen import build_carousel_slides
        import tempfile
        from pathlib import Path as _Path
    except Exception as e:
        log.warning(f"[{label}] slide_gen unavailable ({e}) — will use raw-photo fallback.")
        return []

    try:
        with tempfile.TemporaryDirectory(prefix="nakshiq_slides_") as td:
            out_dir = _Path(td)
            log.info(f"[{label}] Rendering branded carousel ({fmt}, {len(destinations)} dests)...")
            slide_paths = build_carousel_slides(fmt, content, destinations, out_dir)
            if not slide_paths:
                log.warning(f"[{label}] slide_gen returned zero slides.")
                return []
            log.info(f"[{label}] Rendered {len(slide_paths)} branded slides · uploading to Outstand...")
            media_list = []
            for sp in slide_paths:
                data = sp.read_bytes()
                m = upload_media_bytes(data, sp.name, "image/jpeg")
                if m:
                    media_list.append(m)
            return media_list
    except Exception as e:
        log.warning(f"[{label}] Branded carousel rendering failed ({e}).")
        return []


_BANNED_HASHTAGS = {
    "#travel", "#india", "#wanderlust", "#explore", "#nature",
    "#instagood", "#photography", "#tourism", "#trip", "#vacation",
    "#holiday", "#instatravel", "#incredibleindia", "#mountains",
    "#beach", "#travelphotography", "#travelgram", "#wanderer",
    "#instadaily", "#picoftheday", "#photooftheday", "#beautiful",
    "#amazing", "#awesome", "#bestoftheday", "#follow", "#like4like",
}


def _sanitize_caption(caption: str, platform: str = "") -> str:
    """Single-point caption sanitizer (added 2026-05-03).

    Enforces brand-voice rules across ALL publish paths:
    - Strips banned generic hashtags (preserves #NakshIQ + niche tags)
    - Caps total length: IG/FB feed = 2000 chars, Reels/YT captions = 2200 chars
    - Logs any banned tag stripping for audit visibility

    Called from publish_feed_post + publish_reel so EVERY post (regardless of
    which caption generator built it) goes through the same enforcement.
    """
    if not caption:
        return caption

    # Strip banned hashtags. Use regex to match # and following alphanumerics
    # so that "Body\n\n#travel" still gets the #travel scrubbed.
    import re
    stripped = []
    def _scrub(match: "re.Match") -> str:
        tag = match.group(0)
        if tag.lower() in _BANNED_HASHTAGS:
            stripped.append(tag)
            return ""
        return tag
    sanitized = re.sub(r"#[A-Za-z0-9_]+", _scrub, caption)
    # Collapse any double-spaces left over from removed tags
    sanitized = re.sub(r"  +", " ", sanitized)
    sanitized = re.sub(r" +\n", "\n", sanitized)

    if stripped:
        log.info(f"    Caption sanitizer: stripped {len(stripped)} banned tags: {stripped[:5]}")

    # Length cap (preserves trailing hashtags by truncating mid-paragraph)
    # IG long-form caption max = 2200, but most engagement happens in first ~150 chars
    # so we cap at 2000 to leave room for hashtag block.
    MAX_LEN = 2000 if platform != "youtube" else 4500
    if len(sanitized) > MAX_LEN:
        # Try to keep the last hashtag block; truncate body
        parts = sanitized.rsplit("\n\n", 1)
        if len(parts) == 2:
            body, tags = parts
            body_max = MAX_LEN - len(tags) - 4  # leave space for "\n\n" + buffer
            if body_max > 100:
                body = body[:body_max].rstrip() + "…"
                sanitized = body + "\n\n" + tags
            else:
                sanitized = sanitized[:MAX_LEN].rstrip() + "…"
        else:
            sanitized = sanitized[:MAX_LEN].rstrip() + "…"
        log.info(f"    Caption sanitizer: truncated to {len(sanitized)} chars (was over {MAX_LEN})")

    return sanitized


_HEALTHCHECK_CACHE: dict[str, tuple[bool, int]] = {}
_BAD_URL_QUEUE_PATH = Path(__file__).parent / "data" / "bad-url-queue.jsonl"
_POST_OUTCOMES_PATH = Path(__file__).parent / "data" / "post_outcomes.jsonl"


def _log_post_outcome(*, post_id: str | None, dest_id: str | None,
                      fmt: str | None, media_id: str | None,
                      account: dict, caption: str, cta_url: str | None,
                      utm_content: str | None,
                      status: str = "published"):
    """Append a structured outcome row to data/post_outcomes.jsonl after every
    publish attempt. Foundation for the weekly engagement digest (Tier 3) —
    join `utm_content` against GA4 to compute per-post CTR.

    `status` defaults to "published" (post confirmed by the platform). Pass
    "queued_unconfirmed" when Outstand accepted the post but `wait_for_publish`
    never saw a platform confirmation — surfaces ghost posts (e.g. IG Short
    post_id=iwJiB on 2026-05-05) in the watchdog instead of dropping silently.

    Best-effort: never raises. Logging failure should not block the run.
    """
    try:
        _POST_OUTCOMES_PATH.parent.mkdir(parents=True, exist_ok=True)
        record = {
            "ts":            datetime.now(timezone.utc).isoformat(),
            "status":        status,
            "post_id":       post_id,
            "dest_id":       dest_id,
            "format":        fmt,
            "media_id":      media_id,
            "platform":      account.get("network"),
            "account":       account.get("username") or account.get("id"),
            "cta_url":       cta_url,
            "utm_content":   utm_content,
            "caption_hash":  hashlib.sha256((caption or "").encode("utf-8")).hexdigest()[:12],
            "caption_preview": (caption or "")[:160],
        }
        with open(_POST_OUTCOMES_PATH, "a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")
    except Exception as e:
        log.warning(f"Could not write post_outcomes entry: {e}")


def _extract_caption_url(caption: str) -> str | None:
    """Pull the first https://nakshiq.com/... URL out of a caption string.

    Captions follow a `→ {url}` pattern; we just match anything starting with
    https://nakshiq.com or http://nakshiq.com. Returns None if the caption is
    text-only / has no CTA URL.
    """
    m = re.search(r"https?://(?:www\.)?nakshiq\.com[^\s)]*", caption)
    return m.group(0).rstrip(".,;:") if m else None


def _healthcheck_url(url: str, timeout: float = 6.0) -> tuple[bool, int]:
    """HEAD-probe a URL. Returns (ok, status_code). Cached for the duration of
    one run so each unique URL is only probed once.

    `ok` is True only on 2xx. 3xx is treated as ok if the redirect target is
    on nakshiq.com (legit locale redirect). Network errors return (True, 0)
    so a flaky healthcheck never blocks an otherwise-valid post — only proven
    4xx/5xx abort the publish.
    """
    if not url:
        return True, 0
    if url in _HEALTHCHECK_CACHE:
        return _HEALTHCHECK_CACHE[url]
    try:
        r = requests.head(url, allow_redirects=True, timeout=timeout)
        status = r.status_code
        ok = 200 <= status < 400
    except requests.RequestException:
        # Network blips shouldn't block posting — treat as ok-with-status-0 so
        # the run continues. Bad URLs that consistently fail will still 4xx
        # when the user clicks them, but at least the autoposter won't deadlock.
        ok, status = True, 0
    _HEALTHCHECK_CACHE[url] = (ok, status)
    return ok, status


def _log_bad_url(url: str, status: int, caption: str, account: dict):
    """Append a structured record to data/bad-url-queue.jsonl so we can audit
    bad URLs the autoposter generated. One line per offence — easier to grep
    + jq than rebuilding the file every time.
    """
    try:
        _BAD_URL_QUEUE_PATH.parent.mkdir(parents=True, exist_ok=True)
        record = {
            "ts": datetime.now(timezone.utc).isoformat(),
            "url": url,
            "status": status,
            "platform": account.get("network"),
            "username": account.get("username"),
            "caption_preview": (caption or "")[:160],
        }
        with open(_BAD_URL_QUEUE_PATH, "a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")
    except Exception as e:
        log.warning(f"Could not write bad-url-queue entry: {e}")


def publish_feed_post(caption: str, account: dict, media,
                      dry_run: bool = False,
                      *, dest_id: str | None = None,
                      fmt: str | None = None,
                      media_id: str | None = None,
                      utm_content: str | None = None) -> dict | None:
    """
    Publish a feed post. `media` accepts:
      - None                → text-only post
      - a single media dict → single-image post
      - a list of dicts     → multi-image carousel (2–10 items)

    Optional kwargs are passed straight through to the post-outcomes log so
    we can attribute future GA4 clicks back to the exact post. Callers that
    don't supply them will produce a row with nulls — still better than
    nothing for high-level aggregates.
    """
    username = account.get("username", account["id"])
    platform = account["network"]
    # Sanitize caption BEFORE any platform call (banned tags + length cap)
    caption = _sanitize_caption(caption, platform=platform)

    # Pre-publish healthcheck on the caption's CTA URL. If it's a hard 4xx/5xx,
    # ABORT the post — better to skip a slot than ship a 404 to followers.
    # Skipped on dry_run (no actual publish) and silently ignored when no URL
    # is in the caption (text-only formats). Network errors are treated as ok
    # so flaky DNS / transient blips never block legitimate posts.
    cta_url = _extract_caption_url(caption)
    if cta_url and not dry_run:
        ok, status = _healthcheck_url(cta_url)
        if not ok and 400 <= status < 600:
            log.error(
                f"[{platform}/{username}] CTA URL healthcheck FAILED "
                f"(status={status}, url={cta_url}) — aborting post."
            )
            _log_bad_url(cta_url, status, caption, account)
            return None
        elif status == 0:
            log.info(f"[{platform}/{username}] CTA healthcheck inconclusive (network) — proceeding.")
        else:
            log.debug(f"[{platform}/{username}] CTA healthcheck ok (status={status}, url={cta_url})")

    # Normalise to a list for uniform handling.
    if media is None:
        media_list = []
    elif isinstance(media, list):
        media_list = [m for m in media if m]
    else:
        media_list = [media]
    media_list = media_list[:CAROUSEL_MAX_SLIDES]

    if dry_run:
        if len(media_list) > 1:
            desc = f"{len(media_list)}-slide carousel [" + ", ".join(m["filename"] for m in media_list) + "]"
        elif media_list:
            desc = f"single image ({media_list[0]['filename']})"
        else:
            desc = "text-only"
        log.info(f"    [DRY RUN] {platform}/{username} — {len(caption)} chars + {desc}")
        return {"post": {"id": "DRY_RUN"}}

    container = {"content": caption}
    if media_list:
        container["media"] = [build_media_item(m) for m in media_list]

    result = outstand_post_req("/v1/posts/", {"accounts": [username], "containers": [container]})
    if not result.get("success"):
        log.error(f"    Feed post failed: {result}")
        return None

    # Best-effort: append a row to data/post_outcomes.jsonl so the weekly
    # engagement digest can join utm_content × GA4 to compute per-post CTR.
    post_id = (result.get("post") or {}).get("id")
    _log_post_outcome(
        post_id=post_id,
        dest_id=dest_id,
        fmt=fmt,
        media_id=media_id,
        account=account,
        caption=caption,
        cta_url=cta_url,
        utm_content=utm_content,
    )
    return result


def carousel_destinations(fmt: str, content: dict, pool: list,
                          target_count: int = 5) -> list:
    """
    Return up to `target_count` destinations whose hero images actually resolve
    (200 response). Iterates the format-specific candidate list in priority order
    and HEAD-checks each image, skipping ones that 404. Stops at target_count.

    A small HEAD-check cache in `content['__image_valid__']` keeps this cheap
    when called multiple times per run.
    """
    # 1. Build the ordered candidate list
    candidates: list = []
    if fmt == "data_carousel":
        candidates = list(pool)
    elif fmt == "monthly_forecast":
        five_star = [d for d in pool if d.get("score", 0) == 5]
        candidates = five_star or list(pool)
    elif fmt == "collection_spotlight":
        coll = content.get("__run_collection__")
        if not coll:
            return []
        dest_map = {d["id"]: d for d in content["destinations"].get("data", [])}
        # Collection items are pre-ranked. Rotate through them with the same
        # oldest-never-used logic used for collections themselves so we don't
        # always lock onto the first item (e.g. After Dark always→mcleodganj).
        # Bucket key is per-collection so each collection has its own rotation.
        items_in_map = [dest_map[i["destination_id"]]
                        for i in coll.get("items", [])
                        if i.get("destination_id") in dest_map]
        st = content.get("__run_state__") or {}
        bucket_name = f"collection_carousel_dests:{coll.get('id','?')}"
        # 14-day cooldown so the same dest doesn't show twice in two weeks.
        candidates = pick_oldest_unused(
            st, bucket_name, items_in_map, key="id",
            cooldown_days=14,
        )

    # 2. Walk candidates, keeping only those with a valid hero image
    result: list = []
    skipped: list = []
    for d in candidates:
        if len(result) >= target_count:
            break
        if check_image_available(d, content):
            result.append(d)
        else:
            skipped.append(d["id"])

    if skipped:
        log.info(f"    Skipped (no image) → {', '.join(skipped[:8])}"
                 + (f" +{len(skipped)-8} more" if len(skipped) > 8 else ""))
    return result


def publish_story(account: dict, media: dict, dry_run: bool = False) -> dict | None:
    """Post an Instagram Story (image only — no caption, no stickers via API)."""
    username = account.get("username", account["id"])

    if dry_run:
        log.info(f"    [DRY RUN] Story → {media['filename']}")
        return {"post": {"id": "DRY_RUN_STORY"}}

    # Outstand requires non-empty content (min 1 char). Instagram Stories API
    # does not render it anyway — use a single space as a placeholder.
    result = outstand_post_req("/v1/posts/", {
        "accounts":   [username],
        "containers": [{"content": " ", "media": [build_media_item(media)]}],
        "instagram":  {"publishAsStory": True},
    })
    if not result.get("success"):
        log.warning(f"    Story failed: {result}")
        return None
    return result


def publish_reel(caption: str, account: dict, video_media: dict,
                 dry_run: bool = False) -> dict | None:
    """Post an Instagram/Facebook Reel or YouTube Short (vertical video)."""
    username = account.get("username", account["id"])
    platform = account["network"]
    # Sanitize caption BEFORE any platform call (banned tags + length cap)
    caption = _sanitize_caption(caption, platform=platform)

    # Pre-publish healthcheck — same gate as publish_feed_post. Reels and YT
    # Shorts both flow through here, so a single check covers both. Skipped on
    # dry_run; transient network errors are tolerated (status=0).
    cta_url = _extract_caption_url(caption)
    if cta_url and not dry_run:
        ok, status = _healthcheck_url(cta_url)
        if not ok and 400 <= status < 600:
            log.error(
                f"[{platform}/{username}] Reel CTA URL healthcheck FAILED "
                f"(status={status}, url={cta_url}) — aborting post."
            )
            _log_bad_url(cta_url, status, caption, account)
            return None

    if dry_run:
        log.info(f"    [DRY RUN] Reel → {video_media['filename']}")
        return {"post": {"id": "DRY_RUN_REEL"}}

    payload = {
        "accounts":   [username],
        "containers": [{"content": caption, "media": [build_media_item(video_media)]}],
    }

    # YouTube Shorts: tell Outstand this is a Short with proper metadata
    if platform == "youtube":
        try:
            # Extract a title from the caption (first line, max 100 chars)
            yt_title = caption.split("\n")[0].strip()
            # Remove emoji and leading symbols for a cleaner title
            yt_title = yt_title.lstrip("📍🏔️🎯⚠️🌊 ").strip()
            if len(yt_title) > 100:
                yt_title = yt_title[:97] + "..."
            payload["networkOverrideConfiguration"] = {
                "youtubeConfiguration": {
                    "isShort": True,
                    "privacyStatus": "public",
                    "madeForKids": False,
                    "categoryId": "19",  # Travel & Events
                    "title": yt_title,
                    "tags": ["india", "travel", "nakshiq", "shorts"],
                }
            }
        except Exception:
            pass  # If metadata extraction fails, post without overrides

    result = outstand_post_req("/v1/posts/", payload)
    if not result.get("success"):
        log.warning(f"    Reel publish failed: {result}")
        return None
    return result


def wait_for_publish(post_id: str, timeout: int = 40) -> dict | None:
    for _ in range(timeout // 5):
        time.sleep(5)
        try:
            post = outstand_get(f"/v1/posts/{post_id}").get("post", {})
            for acc in post.get("socialAccounts", []):
                if acc.get("status") == "published":
                    return acc
                if acc.get("error"):
                    log.warning(f"    Platform error: {acc['error']}")
                    return None
        except Exception:
            pass
    return None

# ─────────────────────────────────────────────────────────────────────────────
# MAIN RUN LOOP
# ─────────────────────────────────────────────────────────────────────────────

LOCK_FILE     = Path(__file__).parent / ".autoposter.lock"
LOCK_MAX_AGE  = 30 * 60  # seconds — Reel uploads (R2 download + IG processing) routinely exceed 15min, raised to 30 to absorb that

def _pid_alive(pid) -> bool:
    """POSIX liveness probe — True if a process with this PID is still running.

    Returns False on AnyError so the caller treats unknown PIDs as dead. We
    explicitly never want to treat an alive PID as dead (would cause the
    May-4-class lock-cascade where a force-fired run kills a healthy upload).
    """
    if not pid:
        return False
    try:
        pid = int(pid)
    except (TypeError, ValueError):
        return False
    if pid <= 0:
        return False
    try:
        os.kill(pid, 0)  # signal 0 = liveness probe, no actual signal sent
        return True
    except ProcessLookupError:
        return False
    except PermissionError:
        # Process exists but is owned by another user — still alive, refuse override.
        return True
    except OSError:
        return False


def _acquire_lock(force: bool = False) -> bool:
    """Prevent concurrent/re-entrant runs. Returns True if lock acquired.

    Override rules (post-2026-05-04 cascade fix):
    1. If holder PID is still alive → REFUSE override regardless of age and
       regardless of force=True. A long-running Reel upload should never be
       killed by a re-fired cron / GH-Actions retry.
    2. If holder PID is dead → override allowed. Logged as "stale lock".
    3. If lock parse fails → override allowed (corrupt lock file).
    """
    now_ts = time.time()
    if LOCK_FILE.exists():
        try:
            payload = json.loads(LOCK_FILE.read_text())
            age = now_ts - float(payload.get("ts", 0))
            holder = payload.get("pid")
        except Exception:
            age, holder = LOCK_MAX_AGE + 1, None
        # Liveness probe — gates ALL override paths, even --force
        if _pid_alive(holder):
            log.warning(
                f"Another run in progress (pid={holder}, age={int(age)}s, alive=yes) — "
                f"refusing to override even with force={force}. Exiting."
            )
            return False
        # PID is dead. Distinguish stale-by-age vs force-override-of-dead-holder
        # for log clarity (the May-4 cascade was masked by a single ambiguous
        # "Stale lock — overriding" message).
        if age >= LOCK_MAX_AGE:
            log.info(f"Stale lock (pid={holder} dead, age={int(age)}s) — overriding.")
        elif force:
            log.info(f"Force override (pid={holder} dead, age={int(age)}s) — overriding.")
        else:
            # Dead holder, fresh lock, no force — could be a race between
            # process death and lock cleanup. Override (the dead holder can't
            # complete its work anyway).
            log.info(f"Holder pid={holder} dead (age={int(age)}s) — overriding.")
    LOCK_FILE.write_text(json.dumps({"pid": os.getpid(), "ts": now_ts}))
    return True

def _release_lock():
    try:
        LOCK_FILE.unlink()
    except FileNotFoundError:
        pass

def _outstand_posts_today() -> list:
    """Pull today's successful posts from Outstand (dedup guard). Never raises."""
    today = date.today().isoformat()
    out = []
    try:
        r  = outstand_get("/v1/posts?limit=50")
        for p in (r.get("data") or []):
            if not (p.get("createdAt") or "").startswith(today):
                continue
            for sa in (p.get("socialAccounts") or []):
                if sa.get("status") == "published":
                    out.append({
                        "account_id": sa.get("id"),
                        "platform":   sa.get("network"),
                        "media":      ((p.get("containers") or [{}])[0].get("media") or [{}])[0].get("filename"),
                    })
    except Exception as e:
        log.warning(f"Outstand dedup-check failed ({e}) — proceeding with local state only.")
    return out


def run(force: bool = False, sync_only: bool = False, dry_run: bool = False,
        evening: bool = False, moat: bool = False):
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    # ── 0. Acquire re-entry lock ─────────────────────────────────────────────
    # Morning, evening and moat runs use DIFFERENT lock files so they can
    # overlap briefly without blocking each other in edge cases.
    global LOCK_FILE
    original_lock = LOCK_FILE
    if evening:
        LOCK_FILE = Path(__file__).parent / ".autoposter-evening.lock"
    elif moat:
        LOCK_FILE = Path(__file__).parent / ".autoposter-moat.lock"

    try:
        if not sync_only and not dry_run and not _acquire_lock(force=force):
            sys.exit(0)
        try:
            _run_inner(force=force, sync_only=sync_only, dry_run=dry_run,
                       evening=evening, moat=moat)
        finally:
            if not sync_only and not dry_run:
                _release_lock()
    finally:
        LOCK_FILE = original_lock


def _run_inner(force: bool, sync_only: bool, dry_run: bool,
               evening: bool = False, moat: bool = False):
    today   = date.today().isoformat()
    weekday = date.today().weekday()
    state   = load_state()
    mode    = "MOAT" if moat else ("EVENING" if evening else "MORNING")
    # Use a mode-scoped suffix for posted_today keys so morning, evening and
    # moat runs don't collide on the "already posted today" check.
    mode_suffix = "_moat" if moat else ("_evening" if evening else "")

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · {mode} · {today} · weekday={weekday}")
    log.info("═" * 60)

    # ── 1. Sync content ───────────────────────────────────────────────────────
    content = sync_all_content()
    state["last_sync"] = datetime.now(timezone.utc).isoformat()

    if sync_only:
        log.info("Sync-only mode. Done.")
        save_state(state)
        return

    # ── 2. Get accounts ───────────────────────────────────────────────────────
    accounts = get_connected_accounts()
    active   = [a for a in accounts if a.get("isActive")]
    if not active:
        log.warning("No active connected accounts.")
        save_state(state)
        return

    labels = [f"{a['network']}/{a['username']}" for a in active]
    log.info(f"Active accounts: {labels}")

    # ── 2b. Outstand-side dedup guard ─────────────────────────────────────────
    # For morning runs: merge today's remote posts into posted_today so external
    # posts block a duplicate. For evening runs: we SKIP this merge because
    # evening uses mode-scoped posted_today keys ("<id>_evening"), and the
    # morning's entries would otherwise be misread as evening already-posted.
    remote_today = _outstand_posts_today() if (not force and not evening) else []
    if remote_today:
        for item in remote_today:
            acc_id = item["account_id"]
            if acc_id and not already_posted_today(state, acc_id):
                _mark_posted_today(state, acc_id)
            media_name = (item.get("media") or "")
            if media_name.endswith(('.jpg','.jpeg','.png','.mp4')):
                dest_from_media = media_name.rsplit('.',1)[0]
                if not any(d.get("destination_id")==dest_from_media and d.get("date")==today
                           for d in state.get("posted_destinations", [])):
                    state.setdefault("posted_destinations", []).append(
                        {"destination_id": dest_from_media, "date": today})
        log.info(f"Outstand dedup guard: merged {len(remote_today)} remote posts into state.")

    # ── 3. Determine formats per platform + pre-pick run-scoped slots ──────
    traps  = content["traps"].get("data", [])
    used   = recently_used_destinations(state)
    dests  = content["destinations"].get("data", [])

    # Per-platform format selection — branches on morning / evening / moat
    if moat:
        # Moat mode: pick the oldest-never-used angle from MOAT_ANGLES.
        # Both platforms use the same format. No Story (moat posts are feed-only).
        # Only runs on Mon/Wed/Fri (weekday 0, 2, 4). Other days exit early.
        if weekday not in (0, 2, 4):
            log.info(f"Moat mode runs Mon/Wed/Fri only (today weekday={weekday}) — exiting.")
            return
        ordered = pick_oldest_unused(state, "moat_angles", MOAT_ANGLES, key=None)
        chosen  = ordered[0] if ordered else "chinese_wall"
        ig_fmt       = chosen
        fb_fmt       = chosen
        story_fmt    = None        # no Story in moat mode — the post IS the message
        audience_tag = None
        status = dimension_cycle_status(state, "moat_angles", len(MOAT_ANGLES))
        log.info(f"Moat angle locked: {chosen} "
                 f"({status['unused']}/{status['total']} never featured)")
    elif evening:
        # Evening uses the entertainment-pillar rotation; both platforms run
        # the same format (simpler — Reels are platform-agnostic).
        base_fmt       = EVENING_FORMAT_SCHEDULE.get(weekday, "score_card")
        # 2026-05-22 — evening is the variety valve: rotate v2/v3/v4 CSV
        # formats AND the heavyweight visual pipelines (infographic /
        # tourist_map / reel_map) through the evening slot. No themed-week
        # pillar lock — the morning run owns the pillar arc. Shares the
        # `morning_formats` usage bucket so morning + evening jointly rotate
        # and never repeat the same format across one day.
        _eve_pool = (eligible_csv_formats(content, dests)
                     + list(VISUAL_DELEGATE_FORMATS))
        if _eve_pool:
            base_fmt = pick_oldest_unused(
                state, "morning_formats", _eve_pool, key=None
            )[0]
            _n_vis = len(VISUAL_DELEGATE_FORMATS)
            log.info(
                f"[evening] variety pick: {base_fmt} "
                f"({len(_eve_pool) - _n_vis} CSV + {_n_vis} visual candidates)"
            )
        ig_fmt         = base_fmt
        fb_fmt         = base_fmt
        story_fmt      = EVENING_STORY_SCHEDULE.get(weekday, "score_card")
        audience_tag   = EVENING_AUDIENCE_SCHEDULE.get(weekday)
        # tourist_trap falls back to reality_check when no traps exist
        if ig_fmt == "tourist_trap" and not traps:
            ig_fmt = fb_fmt = "reality_check"
    else:
        ig_fmt       = pick_morning_format(state, content)
        fb_fmt       = ig_fmt   # both platforms use the same round-robin format
        story_fmt    = STORY_FORMAT_SCHEDULE.get(weekday, "score_card")
        audience_tag = None

    log.info(f"Formats — IG: {ig_fmt}  ·  FB: {fb_fmt}  ·  Story: {story_fmt}"
             + (f"  ·  Audience: {audience_tag}" if audience_tag else ""))
    log.info(f"Used destinations (14d rolling ∪ current-month ∪ manual-skip): {len(used)}")

    # 2026-05-22 — visual-format delegation. infographic / tourist_map /
    # reel_map are heavyweight pipelines with their own generation + posting
    # code. When the evening picker lands on one, hand the whole slot to that
    # pipeline (reused wholesale) instead of the standard caption+dest flow.
    # bypass_schedule=True: the picker rotation is the scheduler now, so the
    # pipeline's own Mon/Wed/Fri / Tue/Thu/Sat DOW gate is obsolete; each
    # pipeline keeps its own per-account posted-today guard.
    if ig_fmt in VISUAL_DELEGATE_FORMATS:
        # Persist the round-robin mark BEFORE delegating — the delegate runs
        # its own load_state()/save_state(), so the mark must already be on
        # disk or its save would drop it (→ format re-picked every evening).
        mark_theme_used(state, "morning_formats", ig_fmt)
        save_state(state)
        log.info(f"Delegating evening slot → {ig_fmt} visual pipeline")
        try:
            _visual_posted = VISUAL_DELEGATE_FORMATS[ig_fmt](
                bypass_schedule=True, dry_run=dry_run
            )
        except Exception as e:
            import traceback
            log.error(f"{ig_fmt} delegate crashed: {e}")
            log.error(traceback.format_exc())
            _visual_posted = False
        if _visual_posted:
            return
        # Visual produced nothing — fall back to a standard format so the
        # evening slot is never left dark.
        log.warning(
            f"{ig_fmt} delegate posted nothing — falling back to score_card"
        )
        ig_fmt = fb_fmt = "score_card"

    # If an evening audience filter is set, pre-filter the pool for all
    # destination-driven picks (score_card, reality_check, infrastructure_truth,
    # kids_intel, and carousel dests). Keeps the theme_usage picker honest: it
    # will pick the oldest-unused destination that ALSO matches the audience.
    if audience_tag:
        filtered = [d for d in dests if audience_tag in infer_audience_tags(d)]
        # Floor of 3: when the filter narrows to 0-2 candidates the picker
        # locks onto the same destination every weekday-X run (May-4 cascade
        # had backpackers→1 dest, Parvati Valley posted 4× the same day).
        AUDIENCE_FLOOR = 3
        if len(filtered) >= AUDIENCE_FLOOR:
            log.info(f"Audience filter '{audience_tag}' → {len(filtered)} destinations match.")
            audience_pool = filtered
        elif filtered:
            log.warning(
                f"Audience filter '{audience_tag}' → only {len(filtered)} match "
                f"(floor={AUDIENCE_FLOOR}). Dropping filter to avoid same-dest spam."
            )
            audience_pool = dests
        else:
            log.info(f"Audience filter '{audience_tag}' → no matches, using full pool.")
            audience_pool = dests
    else:
        audience_pool = dests

    # Tier 2.6 — fingerprint dedup snapshot. Computed once at run start so all
    # downstream pickers see a consistent view. Pulls from post_log (cross-flow,
    # not just main-loop's posted_destinations) so pomelli + canva + flow_story
    # posts now contribute to the dedup picture.
    fp = post_fingerprints(state)
    log.info(f"Fingerprint dedup snapshot — "
             f"{len(fp['dests'])} dests in 7d · "
             f"{len(fp['dest_fmt'])} (dest,fmt) pairs in 30d · "
             f"{len(fp['media'])} media in 60d")

    # Helper: build a fresh candidate pool. Filters in priority order:
    #   1. Audience filter (already applied above)
    #   2. 14-day `used` set (main loop's posted_destinations history)
    #   3. 7-day fingerprint `dests` set (catches cross-flow posts that
    #      historically didn't write to posted_destinations — pomelli, canva,
    #      flow_story)
    # Falls back gracefully if a filter empties the pool.
    def _dest_pool() -> list:
        base  = [d for d in audience_pool if d["id"] not in used] or audience_pool
        fresh = [d for d in base if d["id"] not in fp["dests"]] or base
        return pick_oldest_unused(state, "destinations", fresh, key="id")

    # Run-scoped pre-picks so FB + IG share the same anchor where appropriate.
    # 1) Reality Check pair (so the contrast matches across platforms)
    needs_pair = "reality_check" in (ig_fmt, fb_fmt)
    if needs_pair:
        pool = _dest_pool()
        name_map = {d["name"]: d for d in pool}
        run_pair = None
        for famous, hidden in CONTRARIAN_PAIRS:
            if famous in name_map and hidden in name_map:
                run_pair = (name_map[famous], name_map[hidden])
                log.info(f"Reality Check pair locked: {famous} ↔ {hidden}")
                break
        if not run_pair and len(pool) >= 2:
            run_pair = (pool[0], pool[1])
            log.info(f"Reality Check pair (fallback): {run_pair[0]['name']} ↔ {run_pair[1]['name']}")
        content["__run_pair__"] = run_pair

    # 2) Collection — pick one fresh-ish collection if either feed needs it
    if "collection_spotlight" in (ig_fmt, fb_fmt, story_fmt):
        colls = content.get("collections", {}).get("data", []) or []
        if colls:
            # Oldest-never-used collection first, with a 14-day cooldown AND
            # explicit exclude of the last picked collection. Belt + braces:
            # if state.theme_usage gets clobbered between mode runs, the
            # last_picked_collection memory still prevents back-to-back repeats.
            last_pick = (state.get("last_picked", {}) or {}).get("collection")
            ordered = pick_oldest_unused(
                state, "collections", colls, key="id",
                cooldown_days=14,
                exclude_ids={last_pick} if last_pick else None,
            )
            content["__run_collection__"] = ordered[0]
            # Stamp the pick IMMEDIATELY at lock-time (not just at publish-success
            # time) so concurrent mode runs see the same state and don't re-pick.
            mark_theme_used(state, "collections", ordered[0]["id"])
            state.setdefault("last_picked", {})["collection"] = ordered[0]["id"]
            save_state(state)
            status = dimension_cycle_status(state, "collections", len(colls))
            log.info(f"Collection locked: {ordered[0]['name']} "
                     f"({status['unused']}/{status['total']} never featured)")

    # 3) Festival — prefer festivals that haven't been featured yet.
    # Pool = current month + next month, with past festivals filtered out
    # (date-aware via KNOWN_FESTIVAL_END_DAYS + mid-month cutoff). This stops
    # already-completed festivals like Baisakhi from getting selected on
    # the last day of the month.
    if "festival_alert" in (ig_fmt, fb_fmt, story_fmt):
        cur_fests  = content.get("festivals",      {}).get("data", []) or []
        next_fests = content.get("festivals_next", {}).get("data", []) or []
        seen = set()
        combined = []
        for f in cur_fests + next_fests:
            fid = f.get("id")
            if fid and fid in seen:
                continue
            if fid:
                seen.add(fid)
            combined.append(f)
        fests = filter_active_festivals(combined, date.today())
        # 2026-05-16: once-per-month — drop festivals whose home dest already posted.
        fests_fresh = _filter_dest_used(fests, used, key="destination_id")
        if fests_fresh:
            ordered = pick_oldest_unused(state, "festivals", fests_fresh, key="id")
            content["__run_festival__"] = ordered[0]
            status = dimension_cycle_status(state, "festivals", len(fests_fresh))
            log.info(f"Festival locked: {ordered[0].get('name','?')} "
                     f"({status['unused']}/{status['total']} active festivals never featured)")
        elif fests:
            log.info(f"festival_alert: all {len(fests)} festivals' home dests already posted this month — SKIPPING")
        else:
            log.info("festival_alert: no active festivals — SKIPPING")

    # 4) Article — oldest-unused article (not "most recent") so the blog rotation
    #    covers every article before repeating.
    if "blog_promo" in (ig_fmt, fb_fmt, story_fmt):
        arts = content.get("articles", {}).get("data", []) or []
        if arts:
            ordered = pick_oldest_unused(state, "articles", arts, key="slug")
            content["__run_article__"] = ordered[0]
            status = dimension_cycle_status(state, "articles", len(arts))
            log.info(f"Article locked: {ordered[0].get('title','?')} "
                     f"({status['unused']}/{status['total']} never featured)")

    # 5) Kid-friendly destination for the kids story (audience-filtered,
    #    theme-tracked so we don't repeat the same family destination).
    if "kids_intel" in (ig_fmt, fb_fmt, story_fmt):
        pool = [d for d in dests if d["id"] not in used
                and "families" in infer_audience_tags(d)] or [d for d in dests if d["id"] not in used] or dests
        ordered = pick_oldest_unused(state, "destinations", pool, key="id")
        kid = _pick_kid_friendly(ordered) or (ordered[0] if ordered else None)
        if kid:
            content["__run_kid_dest__"] = kid
            log.info(f"Kids destination locked: {kid['name']}")

    # 6) Route — oldest-unused route from the route catalog (when available)
    if "route_spotlight" in (ig_fmt, fb_fmt, story_fmt):
        rts = content.get("routes", {}).get("data", []) or []
        if rts:
            ordered = pick_oldest_unused(state, "routes", rts, key="id")
            content["__run_route__"] = ordered[0]
            log.info(f"Route locked: {ordered[0].get('name','?')}")
        else:
            log.info("Route format requested but /routes API returned no data — will fall back to score_card.")

    # 6b) Tier 2.5 — Eatery + Trek pre-picks (oldest-never-used so the rotation
    # exhausts the catalog before repeating). Each is theme-tracked under its
    # own dimension so picks don't collide with destinations / collections.
    # 2026-05-16: every secondary-entity pre-pick now filters items whose
    # home destination was already posted this calendar month (once-per-month
    # rule). Empty pool after filtering = SKIP the format (no silent
    # degradation to score_card).
    if "eateries_pick" in (ig_fmt, fb_fmt, story_fmt):
        eats = content.get("eateries", {}).get("data", []) or []
        eats_fresh = _filter_dest_used(eats, used, key="destination_id")
        if eats_fresh:
            ordered = pick_oldest_unused(state, "eateries", eats_fresh, key="id")
            content["__run_eatery__"] = ordered[0]
            status = dimension_cycle_status(state, "eateries", len(eats_fresh))
            log.info(f"Eatery locked: {ordered[0].get('name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")
        elif eats:
            log.info(f"eateries_pick: all {len(eats)} eateries' dests already posted this month — SKIPPING")
        else:
            log.info("eateries_pick: /eateries API returned no data — SKIPPING")

    if "trek_intel" in (ig_fmt, fb_fmt, story_fmt):
        treks = content.get("treks", {}).get("data", []) or []
        treks_fresh = _filter_dest_used(treks, used, key="destination_id")
        if treks_fresh:
            ordered = pick_oldest_unused(state, "treks", treks_fresh, key="id")
            content["__run_trek__"] = ordered[0]
            status = dimension_cycle_status(state, "treks", len(treks_fresh))
            log.info(f"Trek locked: {ordered[0].get('name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")
        elif treks:
            log.info(f"trek_intel: all {len(treks)} treks' dests already posted this month — SKIPPING")
        else:
            log.info("trek_intel: /treks API returned no data — SKIPPING")

    # 6c) Tier 6 (2026-05-10) — coverage-gap formats. Each pre-picks an oldest-never-used
    # record from its own theme_usage dimension so the catalog is exhausted before repeating.
    if "stays_pick" in (ig_fmt, fb_fmt, story_fmt):
        stays = content.get("stays", {}).get("data", []) or []
        stays_fresh = _filter_dest_used(stays, used, key="destination_id")
        if stays_fresh:
            ordered = pick_oldest_unused(state, "stays", stays_fresh, key="destination_id")
            content["__run_stay__"] = ordered[0]
            status = dimension_cycle_status(state, "stays", len(stays_fresh))
            log.info(f"Stay locked: {ordered[0].get('name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")
        elif stays:
            log.info(f"stays_pick: all {len(stays)} stays' dests already posted this month — SKIPPING")
        else:
            log.info("stays_pick: /stays API returned no data — SKIPPING")

    if "emergency_intel" in (ig_fmt, fb_fmt, story_fmt):
        sos = content.get("emergency", {}).get("data", []) or []
        sos_fresh = _filter_dest_used(sos, used, key="destination_id")
        if len(sos_fresh) >= 1:  # was 5 — single fresh record is fine
            ordered = pick_oldest_unused(state, "emergency", sos_fresh, key="destination_id")
            content["__run_sos__"] = ordered[0]
            status = dimension_cycle_status(state, "emergency", len(sos_fresh))
            log.info(f"SOS locked: {ordered[0].get('destination_name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")
        elif sos:
            log.info(f"emergency_intel: all {len(sos)} SOS records' dests already posted this month — SKIPPING")
        else:
            log.info("emergency_intel: /emergency API returned no data — SKIPPING")

    if "viral_eats_pick" in (ig_fmt, fb_fmt, story_fmt):
        viral = content.get("viral_eats", {}).get("data", []) or []
        viral_fresh = _filter_dest_used(viral, used, key="destination_id")
        if viral_fresh:
            ordered = pick_oldest_unused(state, "viral_eats", viral_fresh, key="id")
            content["__run_viral__"] = ordered[0]
            status = dimension_cycle_status(state, "viral_eats", len(viral_fresh))
            log.info(f"Viral eatery locked: {ordered[0].get('name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")
        elif viral:
            log.info(f"viral_eats_pick: all {len(viral)} viral eateries' dests already posted this month — SKIPPING")
        else:
            log.info("viral_eats_pick: /viral_eats API returned no data — SKIPPING")

    if "camping_intel" in (ig_fmt, fb_fmt, story_fmt):
        camps = content.get("camping", {}).get("data", []) or []
        camps_fresh = _filter_dest_used(camps, used, key="destination_id")
        if camps_fresh:
            ordered = pick_oldest_unused(state, "camping", camps_fresh, key="id")
            content["__run_camp__"] = ordered[0]
            status = dimension_cycle_status(state, "camping", len(camps_fresh))
            log.info(f"Camp locked: {ordered[0].get('name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")
        elif camps:
            log.info(f"camping_intel: all {len(camps)} camping spots' dests already posted this month — SKIPPING")
        else:
            log.info("camping_intel: /camping API returned no data — SKIPPING")

    if "collection_series" in (ig_fmt, fb_fmt, story_fmt):
        colls = content.get("collections", {}).get("data", []) or []
        eligible_colls = [c for c in colls if (c.get("itemCount") or 0) >= 5]
        if eligible_colls:
            ordered = pick_oldest_unused(state, "collection_series", eligible_colls, key="id")
            content["__run_coll_series__"] = ordered[0]
            status = dimension_cycle_status(state, "collection_series", len(eligible_colls))
            log.info(f"Collection series locked: {ordered[0].get('name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")
        else:
            log.info("collection_series: no eligible collections — SKIPPING")

    # ─── Tier 7 Phase 2 (2026-05-17) — pre-picks for new/restored formats ──
    if "hidden_gem_reveal" in (ig_fmt, fb_fmt, story_fmt):
        gems = content.get("hidden_gems", {}).get("data", []) or []
        # Hidden gems link to a PARENT destination via near_destination_id.
        # Filter against the once-per-month rule on that key.
        gems_fresh = [g for g in gems if (g.get("near_destination_id") or "") not in used]
        if gems_fresh:
            ordered = pick_oldest_unused(state, "hidden_gem_reveal", gems_fresh, key="id")
            content["__run_hidden_gem__"] = ordered[0]
            status = dimension_cycle_status(state, "hidden_gem_reveal", len(gems_fresh))
            log.info(f"Hidden gem locked: {ordered[0].get('name','?')} "
                     f"(near {ordered[0].get('near_destination_name','?')}) "
                     f"({status['unused']}/{status['total']} never featured)")
        elif gems:
            log.info(f"hidden_gem_reveal: all {len(gems)} gems' parent dests already posted this month — SKIPPING")
        else:
            log.info("hidden_gem_reveal: no gems available — SKIPPING")

    if "route_spotlight_short" in (ig_fmt, fb_fmt, story_fmt):
        routes = content.get("routes", {}).get("data", []) or []
        if routes:
            ordered = pick_oldest_unused(state, "route_spotlight_short", routes, key="id")
            content["__run_route_short__"] = ordered[0]
            status = dimension_cycle_status(state, "route_spotlight_short", len(routes))
            log.info(f"Route short locked: {ordered[0].get('name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")
        else:
            log.info("route_spotlight_short: no routes — SKIPPING")

    if "tourist_trap" in (ig_fmt, fb_fmt, story_fmt):
        traps_data = content.get("traps", {}).get("data", []) or []
        # Trap entries are {trap:{id,name}, alternative:{id,name}, reason, ...}
        # Flatten so pick_oldest_unused (which only accepts a string key) can
        # work — promote trap.id to a top-level `trap_id` field.
        traps_flat = []
        for t in traps_data:
            trap_id = (t.get("trap") or {}).get("id") or ""
            alt_id = (t.get("alternative") or {}).get("id") or ""
            if trap_id not in used and alt_id not in used:
                traps_flat.append({**t, "trap_id": trap_id})
        if traps_flat:
            ordered = pick_oldest_unused(state, "tourist_trap_alts", traps_flat, key="trap_id")
            content["__run_trap__"] = ordered[0]
            status = dimension_cycle_status(state, "tourist_trap_alts", len(traps_flat))
            log.info(f"Tourist trap locked: skip {(ordered[0].get('trap') or {}).get('name','?')} → go "
                     f"{(ordered[0].get('alternative') or {}).get('name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")
        elif traps_data:
            log.info(f"tourist_trap: all {len(traps_data)} trap+alt pairs already covered this month — SKIPPING")
        else:
            log.info("tourist_trap: /traps API returned no data — SKIPPING")

    if "arrival_intel" in (ig_fmt, fb_fmt, story_fmt):
        airports = content.get("arrival", {}).get("data", []) or []
        airports_fresh = [a for a in airports if (a.get("destination_id") or "") not in used]
        if airports_fresh:
            ordered = pick_oldest_unused(state, "arrival_intel", airports_fresh, key="iata")
            content["__run_arrival__"] = ordered[0]
            status = dimension_cycle_status(state, "arrival_intel", len(airports_fresh))
            log.info(f"Arrival locked: {ordered[0].get('iata','?')} ({ordered[0].get('city','?')}) "
                     f"({status['unused']}/{status['total']} never featured)")
        elif airports:
            log.info(f"arrival_intel: all {len(airports)} airports' dests already posted this month — SKIPPING")
        else:
            log.info("arrival_intel: no airport data — SKIPPING")

    if "women_solo_brief" in (ig_fmt, fb_fmt, story_fmt):
        ws = content.get("women_solo", {}).get("data", []) or []
        ws_fresh = _filter_dest_used(ws, used, key="destination_id")
        if ws_fresh:
            ordered = pick_oldest_unused(state, "women_solo_brief", ws_fresh, key="destination_id")
            content["__run_women_solo__"] = ordered[0]
            status = dimension_cycle_status(state, "women_solo_brief", len(ws_fresh))
            log.info(f"Women-solo dest locked: {ordered[0].get('destination_name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")
        elif ws:
            log.info(f"women_solo_brief: all {len(ws)} curated dests already posted this month — SKIPPING")
        else:
            log.info("women_solo_brief: no curated dests — SKIPPING")

    if "cost_index_card" in (ig_fmt, fb_fmt, story_fmt):
        ci = content.get("cost_index", {}).get("data", []) or []
        ci_fresh = _filter_dest_used(ci, used, key="destination_id")
        if ci_fresh:
            ordered = pick_oldest_unused(state, "cost_index_card", ci_fresh, key="destination_id")
            content["__run_cost_index__"] = ordered[0]
            status = dimension_cycle_status(state, "cost_index_card", len(ci_fresh))
            log.info(f"Cost index dest locked: {ordered[0].get('destination_name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")
        elif ci:
            log.info(f"cost_index_card: all {len(ci)} cost-index dests already posted this month — SKIPPING")
        else:
            log.info("cost_index_card: no cost-index data — SKIPPING")

    # 7a) Skip List — pick the oldest-never-used LOW-scored destination.
    # Strategy:
    #   1. Look at CURRENT month's pool for destinations scoring 1-3/5. Feature
    #      those directly ("Skip List — April 2026: Destination X is 2/5").
    #   2. If the current month has no lows (peak-season months like April or
    #      December), look FORWARD 1-2 months for destinations that are 5/5
    #      now but will drop to ≤3/5 soon. Post as "Upcoming Skip List — July".
    #      This makes the format valuable year-round.
    if "skip_list" in (ig_fmt, fb_fmt):
        # 2026-05-16: skip_list dests also gated by once-per-calendar-month rule.
        current_low = [d for d in (content.get("destinations_low", {}).get("data") or [])
                       if 1 <= (d.get("score") or 0) <= 3
                       and d.get("id") not in used]
        if current_low:
            ordered = pick_oldest_unused(state, "destinations", current_low, key="id")
            content["__run_skip_dest__"] = ordered[0]
            log.info(f"Skip List target: {ordered[0]['name']} "
                     f"({ordered[0].get('score','?')}/5 this month)")
        else:
            # Forward-looking fallback: look up to 3 months ahead
            import calendar
            current_month_num = date.today().month
            current_hi_ids    = {d["id"] for d in dests if (d.get("score") or 0) >= 4}
            forward = None
            for offset in (1, 2, 3):
                fwd_month_num = ((current_month_num - 1 + offset) % 12) + 1
                fwd_month_name = calendar.month_name[fwd_month_num]
                r = nakshiq_fetch("destinations",
                                  {"month": fwd_month_num, "min_score": 0, "limit": 100})
                dropping = [d for d in (r.get("data") or [])
                            if d["id"] in current_hi_ids
                            and 1 <= (d.get("score") or 0) <= 3
                            and d["id"] not in used]
                if dropping:
                    ordered = pick_oldest_unused(state, "destinations", dropping, key="id")
                    target  = ordered[0]
                    # Attach the current dest record (for its current score) so the
                    # copy function can produce the "5/5 now, 2/5 next month" contrast.
                    current_version = next((d for d in dests if d["id"] == target["id"]), target)
                    content["__run_skip_dest__"]    = current_version
                    content["__run_skip_forward__"] = (fwd_month_name, target.get("score"))
                    forward = fwd_month_name
                    log.info(f"Skip List (forward {fwd_month_name}): "
                             f"{target['name']} drops from {current_version.get('score','?')}/5 "
                             f"to {target.get('score','?')}/5 in {fwd_month_name}")
                    break
            if not forward:
                log.info("Skip List: no low-score destinations found in next 3 months — moat picker will rotate.")

    # 7b) Data Provenance — prefer the data-richest oldest-unused destination
    if "data_provenance" in (ig_fmt, fb_fmt):
        rich = [d for d in dests if d.get("note") and d.get("tagline")]
        if rich:
            ordered = pick_oldest_unused(state, "destinations", rich, key="id")
            content["__run_provenance_dest__"] = ordered[0]
            log.info(f"Data Provenance target: {ordered[0]['name']}")

    # 7c) Same-Place-12-Months — pick one destination + fetch 12 monthly scores
    if "same_place_12_months" in (ig_fmt, fb_fmt):
        # Pick the oldest-unused high-score destination
        tops = [d for d in dests if (d.get("score") or 0) >= 4]
        if tops:
            ordered = pick_oldest_unused(state, "destinations", tops, key="id")
            target  = ordered[0]
            content["__run_12month_dest__"] = target
            log.info(f"12-month target: {target['name']} — fetching all 12 months...")
            monthly = {}
            for m in range(1, 13):
                r = nakshiq_fetch("destinations", {"month": m, "min_score": 0})
                for d in (r.get("data") or []):
                    if d["id"] == target["id"]:
                        monthly[m] = d.get("score", 0)
                        break
            content["__run_12month_scores__"] = monthly
            log.info(f"12-month scores for {target['name']}: {monthly}")

    # ── New Tier-2 format pre-picks ──────────────────────────────────────────

    # 8a) Seasonal Shift — find a destination that's high now, drops sharply next month
    if ig_fmt == "seasonal_shift" or fb_fmt == "seasonal_shift":
        import calendar as _cal
        cur_m = date.today().month
        hi_now = [d for d in dests if (d.get("score") or 0) >= 4]
        hi_ids = {d["id"] for d in hi_now}
        for offset in (1, 2):
            nxt_m = ((cur_m - 1 + offset) % 12) + 1
            nxt_name = _cal.month_name[nxt_m]
            r = nakshiq_fetch("destinations",
                              {"month": nxt_m, "min_score": 0, "limit": 100})
            dropping = [d for d in (r.get("data") or [])
                        if d["id"] in hi_ids and (d.get("score") or 0) <= 3]
            if dropping:
                ordered = pick_oldest_unused(state, "destinations", dropping, key="id")
                target  = ordered[0]
                cur_ver = next((d for d in dests if d["id"] == target["id"]), target)
                content["__run_seasonal_dest__"]  = cur_ver
                content["__run_seasonal_month__"] = nxt_name
                content["__run_seasonal_score__"] = target.get("score", 2)
                log.info(f"Seasonal Shift: {cur_ver['name']} "
                         f"{cur_ver.get('score','?')}/5 → {target.get('score','?')}/5 in {nxt_name}")
                break

    # 8b) Elevation Face-Off — pair a low-altitude with a high-altitude destination
    if ig_fmt == "elevation_face_off" or fb_fmt == "elevation_face_off":
        hi_elev = [d for d in dests if (d.get("score") or 0) >= 4
                   and (d.get("elevation_m") or 0) > 3000]
        lo_elev = [d for d in dests if (d.get("score") or 0) >= 4
                   and (d.get("elevation_m") or 0) < 1500]
        if hi_elev and lo_elev:
            hi_pick = pick_oldest_unused(state, "destinations", hi_elev, key="id")[0]
            lo_pick = pick_oldest_unused(state, "destinations", lo_elev, key="id")[0]
            content["__run_elev_high__"] = hi_pick
            content["__run_elev_low__"]  = lo_pick
            log.info(f"Elevation Face-Off: {lo_pick['name']} ({lo_pick.get('elevation_m',0)}m) "
                     f"vs {hi_pick['name']} ({hi_pick.get('elevation_m',0)}m)")

    # 8c) State Showdown — pair two destinations from different states
    if ig_fmt == "state_showdown" or fb_fmt == "state_showdown":
        top_dests = [d for d in dests if (d.get("score") or 0) >= 4 and d.get("state")]
        if len(top_dests) >= 2:
            ordered = pick_oldest_unused(state, "destinations", top_dests, key="id")
            pick_a = ordered[0]
            pick_b = next((d for d in ordered[1:] if d.get("state") != pick_a.get("state")), None)
            if pick_b:
                content["__run_showdown_a__"] = pick_a
                content["__run_showdown_b__"] = pick_b
                log.info(f"State Showdown: {pick_a['name']} ({pick_a['state']}) "
                         f"vs {pick_b['name']} ({pick_b['state']})")

    # 8d) Difficulty Spectrum — pair an easy and a hard destination
    if ig_fmt == "difficulty_spectrum" or fb_fmt == "difficulty_spectrum":
        easy = [d for d in dests if (d.get("difficulty") or "").lower() == "easy"
                and (d.get("score") or 0) >= 4]
        hard = [d for d in dests if (d.get("difficulty") or "").lower() == "hard"
                and (d.get("score") or 0) >= 4]
        if easy and hard:
            e_pick = pick_oldest_unused(state, "destinations", easy, key="id")[0]
            h_pick = pick_oldest_unused(state, "destinations", hard, key="id")[0]
            content["__run_diff_easy__"] = e_pick
            content["__run_diff_hard__"] = h_pick
            log.info(f"Difficulty Spectrum: {e_pick['name']} (easy) vs {h_pick['name']} (hard)")

    # 8e) Underdog Spotlight — easy, low-elevation, high-scoring hidden gem
    if ig_fmt == "underdog_spotlight" or fb_fmt == "underdog_spotlight":
        underdogs = [d for d in dests
                     if (d.get("score") or 0) >= 4
                     and (d.get("elevation_m") or 0) < 2000
                     and (d.get("difficulty") or "").lower() in ("easy", "moderate")]
        if underdogs:
            pick = pick_oldest_unused(state, "destinations", underdogs, key="id")[0]
            content["__run_underdog__"] = pick
            log.info(f"Underdog Spotlight: {pick['name']}")

    # 8f) This Month Only — narrow 5/5 window (low prev month, low next month)
    if ig_fmt == "this_month_only" or fb_fmt == "this_month_only":
        import calendar as _cal
        cur_m = date.today().month
        hi_now = [d for d in dests if (d.get("score") or 0) >= 5]
        hi_ids = {d["id"] for d in hi_now}
        prev_m  = ((cur_m - 2) % 12) + 1
        next_m  = (cur_m % 12) + 1
        prev_r  = nakshiq_fetch("destinations", {"month": prev_m, "min_score": 0, "limit": 100})
        next_r  = nakshiq_fetch("destinations", {"month": next_m, "min_score": 0, "limit": 100})
        prev_map = {d["id"]: d.get("score", 0) for d in (prev_r.get("data") or [])}
        next_map = {d["id"]: d.get("score", 0) for d in (next_r.get("data") or [])}
        narrow = [d for d in hi_now
                  if prev_map.get(d["id"], 0) <= 3
                  and next_map.get(d["id"], 0) <= 3]
        if narrow:
            pick = pick_oldest_unused(state, "destinations", narrow, key="id")[0]
            content["__run_thismonth_dest__"] = pick
            content["__run_thismonth_prev__"] = prev_map.get(pick["id"], 2)
            content["__run_thismonth_next__"] = next_map.get(pick["id"], 2)
            log.info(f"This Month Only: {pick['name']} "
                     f"(prev={prev_map.get(pick['id'],0)}, now=5, next={next_map.get(pick['id'],0)})")

    # 8g) Adventure Pick — hard or high-altitude featured pick
    if ig_fmt == "adventure_pick" or fb_fmt == "adventure_pick":
        adventures = [d for d in dests
                      if (d.get("score") or 0) >= 4
                      and ((d.get("difficulty") or "").lower() == "hard"
                           or (d.get("elevation_m") or 0) > 3000)]
        if adventures:
            pick = pick_oldest_unused(state, "destinations", adventures, key="id")[0]
            content["__run_adventure__"] = pick
            log.info(f"Adventure Pick: {pick['name']}")

    # 8h) Weekend Escape — easy + accessible + high-scoring
    # 2026-05-16: also gated by once-per-calendar-month rule.
    if ig_fmt == "weekend_escape" or fb_fmt == "weekend_escape":
        escapes = [d for d in dests
                   if (d.get("score") or 0) >= 4
                   and (d.get("elevation_m") or 0) < 2500
                   and (d.get("difficulty") or "").lower() in ("easy", "moderate")
                   and d.get("id") not in used]
        if escapes:
            pick = pick_oldest_unused(state, "destinations", escapes, key="id")[0]
            content["__run_weekend__"] = pick
            log.info(f"Weekend Escape: {pick['name']}")
        else:
            log.info("weekend_escape: no fresh escape candidates this month — fallback to shared_best")

    # 7d) Shared best destination — when IG and FB run DIFFERENT formats on the
    #     same day (e.g. Thu: IG=score_card, FB=collection_spotlight), pre-pick
    #     one "best" destination so both platforms anchor on the same place.
    #     Without this, score_card picks via pick_best_destination() and
    #     collection_spotlight picks via _collection_image_dest(), yielding
    #     different destinations — breaking pair-consistency.
    #
    # CHANGED 2026-05-03 (caption-visual coherence fix): Do NOT mark shared_best
    # as used here. Marking it pre-emptively excluded it from the subsequent
    # carousel pick, so the caption named shared_best while the carousel showed
    # 5 OTHER dests (audit log line 12:50:10 proves it). We now lock shared_best
    # but do NOT stamp it — the carousel logic below explicitly seeds slide 0
    # with shared_best so caption + visual stay aligned.
    shared_best = pick_best_destination(_dest_pool(), used, content, state)
    if shared_best:
        content["__run_best__"] = shared_best
        state.setdefault("last_picked", {})["shared_best"] = shared_best["id"]
        save_state(state)
        log.info(f"Shared best destination locked: {shared_best['name']}")

    # 8) Carousel destinations — lock a SINGLE list so IG and FB show the same
    #    5 destinations (same order). Applies image validation + theme tracker.
    if any(f in CAROUSEL_FORMATS for f in (ig_fmt, fb_fmt, story_fmt)):
        base_pool = [d for d in audience_pool if d["id"] not in used] or audience_pool
        # Priority: oldest-unused first, BUT collection_spotlight defers to
        # the collection's own item ranking (which is intentionally curated).
        pool_for_carousel = pick_oldest_unused(state, "destinations", base_pool, key="id")
        # Stash state into content so format-specific picks (e.g. collection
        # carousel rotation) can apply the per-collection cooldown tracker.
        content["__run_state__"] = state
        for carousel_fmt in {ig_fmt, fb_fmt, story_fmt}:
            if carousel_fmt not in CAROUSEL_FORMATS:
                continue
            picks = carousel_destinations(carousel_fmt, content, pool_for_carousel, target_count=5)

            # CHANGED 2026-05-03: ensure shared_best is slide 0 so caption ↔
            # carousel match. Without this, caption.dest != any slide.dest.
            # Skip for collection_spotlight (it's curated by the collection).
            if (carousel_fmt != "collection_spotlight" and shared_best
                    and not any(d.get("id") == shared_best.get("id") for d in picks)):
                # Insert at front; trim to 5
                picks = [shared_best] + [d for d in picks if d.get("id") != shared_best.get("id")]
                picks = picks[:5]

            content[f"__run_carousel_dests__{carousel_fmt}"] = picks
            # Now (post-carousel) mark all shown dests as used so tomorrow rotates.
            for d in picks:
                mark_theme_used(state, "destinations", d["id"])
            # For collection_spotlight, stamp the chosen carousel dest in the
            # per-collection bucket so tomorrow we rotate to a different item.
            # Stamp at lock-time, not publish-time, so concurrent mode runs
            # see the same anti-repeat history.
            if carousel_fmt == "collection_spotlight" and picks:
                coll = content.get("__run_collection__") or {}
                bucket_name = f"collection_carousel_dests:{coll.get('id','?')}"
                for d in picks:
                    mark_theme_used(state, bucket_name, d["id"])
            save_state(state)
            log.info(f"Carousel locked ({carousel_fmt}): "
                     + (", ".join(d['id'] for d in picks) if picks else "no valid images found"))

    # ── 4. Post to each account ───────────────────────────────────────────────
    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        # YouTube only supports video — skip image/carousel feed posts
        if platform == "youtube":
            log.info(f"[{label}] Skipping feed post (YouTube only accepts video/reels).")
            continue

        # Per-platform format + mode-scoped posted_today key so morning vs
        # evening runs don't clash on the "already posted today" check.
        fmt              = fb_fmt if platform == "facebook" else ig_fmt
        acc_scoped_key   = acc_id + mode_suffix

        if state.get("posted_today", {}).get(acc_scoped_key) == today and not force:
            log.info(f"[{label}] Already posted today ({mode.lower()}) — skipping.")
            continue

        log.info(f"[{label}] Generating {fmt} post...")
        caption, dest_obj = generate_post(fmt, content, platform, used)

        if not caption or not dest_obj:
            log.warning(f"[{label}] No content generated — skipping.")
            continue

        # Per-platform voice + brand-voice sanitation before publish
        caption = apply_platform_voice(caption, platform)
        caption = sanitize(caption)

        dest_id = dest_obj["id"]
        log.info(f"[{label}] Caption ready ({len(caption)} chars, dest={dest_id})")

        # ── Decide: Reel, carousel, or single-image ───────────────────────────
        # Evening mode is VIDEO-FIRST — the entertainment pillar. Morning mode
        # prefers image/carousel unless format is explicitly carousel.
        is_carousel = fmt in CAROUSEL_FORMATS
        media_obj   = None        # set below in whichever branch runs
        media_list  = []          # used for carousels only
        use_video   = False

        # ── Phase-2 / CSV-format asset (highest priority) ─────────────────────
        # CSV formats (v2_*/v3_*/v4_*) ship one of two asset paths:
        #   1. Static asset on disk: social_image_library/{format_id}-{slug}.{mp4,png}
        #      → upload it as-is. (Used for reel/yt_short + pre-rendered overrides.)
        #   2. DYNAMIC render: slide_gen.build_csv_slides composites the slides
        #      from the FormatSpec + dest hero at post time. Used for all
        #      single/carousel formats without a static asset on disk — which
        #      after the 2026-05-24 rewrite is most of them. Removes the
        #      bare-photo / wrong-dest problem and unblocks the 25 CSV
        #      formats that previously had zero assets.
        csv_asset_path = dest_obj.get("_csv_asset")
        csv_spec_id    = dest_obj.get("_csv_spec_id")
        if csv_asset_path == "__DYNAMIC__" and csv_spec_id:
            single_media, slide_list = _render_csv_dynamic(
                csv_spec_id, dest_obj,
                dest_obj.get("_csv_extras") or {}, label,
            )
            if slide_list:
                media_list  = slide_list
                is_carousel = True
            elif single_media:
                media_obj   = single_media
                is_carousel = False
            else:
                log.warning(f"[{label}] dynamic CSV render produced nothing — "
                            f"falling back to generic dest media.")
        elif csv_asset_path == "__DEST_VIDEO__" and csv_spec_id:
            # CSV reel/yt_short with no purpose-built clip — use the dest's
            # R2 Ken Burns video so the format fires (the caption + cover
            # frame still differentiates it; the motion is generic ambient).
            # Unlocks ~14 video formats that were previously dormant.
            video_url = check_video_available(dest_obj)
            if video_url:
                log.info(f"[{label}] CSV video format ({csv_spec_id}) — "
                         f"using dest Ken Burns clip as fallback")
                media_obj = upload_media(video_url, f"{dest_id}.mp4", "video/mp4")
                if media_obj:
                    use_video   = True
                    is_carousel = False
                else:
                    log.warning(f"[{label}] Ken Burns upload failed — "
                                f"falling back to generic dest media.")
            else:
                log.warning(f"[{label}] Ken Burns HEAD-check failed for "
                            f"dest={dest_id} — falling back to generic media.")
        elif csv_asset_path and os.path.exists(csv_asset_path):
            media_obj, use_video = _upload_csv_asset(csv_asset_path, label)
            if media_obj:
                is_carousel = False
            else:
                log.warning(f"[{label}] Phase-2 asset upload failed — "
                            f"falling back to generic dest media.")

        # ── Generic dest media — only if no Phase-2 asset was attached ────────
        video_url = None
        if media_obj is None and not is_carousel:
            video_url = check_video_available(dest_obj)
            use_video = bool(video_url)

        if use_video and media_obj is None:
            log.info(f"[{label}] Video available — uploading for Reel{'  (evening mode)' if evening else ''}...")
            media_obj = upload_media(video_url, f"{dest_id}.mp4", "video/mp4")
            if not media_obj:
                log.warning(f"[{label}] Video upload failed — falling back to image.")
                use_video = False

        if is_carousel and not use_video and not media_list:
            # CSV carousels are already handled above via the dynamic CSV
            # render path (which populates media_list). Only the legacy 3
            # carousel formats reach this block.
            #
            # Use the run-scoped destination list that was pre-picked before the
            # per-account loop. This guarantees IG and FB show the SAME carousel
            # (same destinations, same order) when they both run a carousel format
            # today. Falls back to fresh resolution only if the pre-pick was empty.
            slide_dests = content.get(f"__run_carousel_dests__{fmt}") or []
            if not slide_dests:
                pool_now    = [d for d in dests if d["id"] not in used] or dests
                slide_dests = carousel_destinations(fmt, content, pool_now)
            if not slide_dests:
                log.warning(f"[{label}] No carousel destinations resolved — falling back to single image.")
                is_carousel = False
            else:
                # Try branded slide generation first (Path B). Falls back to raw
                # destination photos (Path A) if rendering fails for any reason.
                media_list = _build_branded_carousel(fmt, content, slide_dests, label)
                if len(media_list) < 2:
                    log.warning(f"[{label}] Branded slide generation produced <2 slides — "
                                f"falling back to raw destination photos.")
                    media_list = []
                    for sd in slide_dests:
                        img = sd.get("image")
                        if not img:
                            continue
                        m = upload_media(img, f"{sd['id']}.jpg", "image/jpeg")
                        if m:
                            media_list.append(m)
                if len(media_list) < 2:
                    log.warning(f"[{label}] Raw-photo fallback also yielded <2 slides — "
                                f"posting as single image.")
                    media_obj   = media_list[0] if media_list else None
                    is_carousel = False

        if not use_video and not is_carousel and media_obj is None:
            # Single-image fallback (the default for non-carousel formats)
            image_url = dest_obj.get("image")
            if image_url:
                log.info(f"[{label}] Uploading image...")
                media_obj = upload_media(image_url, f"{dest_id}.jpg", "image/jpeg")
                if not media_obj:
                    log.warning(f"[{label}] Image upload failed — posting text only.")

        # ── Publish feed post / Reel ──────────────────────────────────────────
        # Per-post utm_content for GA4 attribution (foundation for engagement digest)
        run_utm_content = build_utm_content(dest_id, fmt)
        if use_video:
            log.info(f"[{label}] Publishing Reel...")
            result = publish_reel(caption, account, media_obj, dry_run=dry_run)
        elif is_carousel:
            log.info(f"[{label}] Publishing {len(media_list)}-slide carousel...")
            result = publish_feed_post(
                caption, account, media_list, dry_run=dry_run,
                dest_id=dest_id, fmt=fmt, utm_content=run_utm_content,
            )
        else:
            log.info(f"[{label}] Publishing feed post...")
            result = publish_feed_post(
                caption, account, media_obj, dry_run=dry_run,
                dest_id=dest_id, fmt=fmt, utm_content=run_utm_content,
            )

        if not result:
            log.error(f"[{label}] ❌ Publish failed.")
            continue

        post_id = result.get("post", {}).get("id", "unknown")

        if not dry_run and post_id != "unknown":
            confirmed = wait_for_publish(post_id)
            if confirmed:
                fb_id = confirmed.get("platformPostId", "—")
                log.info(f"[{label}] ✅ Published · Outstand={post_id} · Platform={fb_id}")
            else:
                log.warning(f"[{label}] ⚠️  Queued (ID={post_id})")
        else:
            log.info(f"[{label}] ✅ Submitted (post_id={post_id})")

        if not dry_run:
            has_media = bool(media_obj) or bool(media_list)
            # media_id: filename of single image, or first carousel slide. Used by
            # post_fingerprints() to enforce a rolling 60-day media-reuse window.
            media_id = None
            if media_list and isinstance(media_list, list) and media_list:
                media_id = media_list[0].get("filename") if isinstance(media_list[0], dict) else None
            elif media_obj and isinstance(media_obj, dict):
                media_id = media_obj.get("filename")
            mark_posted(state, acc_id, dest_id, fmt, post_id, platform, has_media,
                        media_id=media_id)
            # Mode-scoped today marker (morning vs evening won't collide)
            _mark_posted_today(state, acc_scoped_key)
            used.add(dest_id)

            # ── Anti-repetition tracker updates ──────────────────────────────
            # Every entity we featured today gets stamped so tomorrow's picker
            # prefers items we haven't shown yet.
            mark_theme_used(state, "destinations", dest_id)
            if evening:
                mark_theme_used(state, "reels", dest_id)
            if fmt == "collection_spotlight" and content.get("__run_collection__"):
                mark_theme_used(state, "collections", content["__run_collection__"]["id"])
            if fmt == "festival_alert" and content.get("__run_festival__"):
                mark_theme_used(state, "festivals", content["__run_festival__"]["id"])
            if fmt == "blog_promo" and content.get("__run_article__"):
                mark_theme_used(state, "articles", content["__run_article__"].get("slug","?"))
            if fmt == "route_spotlight" and content.get("__run_route__"):
                mark_theme_used(state, "routes", content["__run_route__"].get("id","?"))
            if fmt == "eateries_pick" and content.get("__run_eatery__"):
                mark_theme_used(state, "eateries", content["__run_eatery__"].get("id","?"))
            if fmt == "trek_intel" and content.get("__run_trek__"):
                mark_theme_used(state, "treks", content["__run_trek__"].get("id","?"))
            # Tier 6 trackers — each new format advances its own catalog dimension.
            if fmt == "stays_pick" and content.get("__run_stay__"):
                mark_theme_used(state, "stays", content["__run_stay__"].get("destination_id","?"))
            if fmt == "emergency_intel" and content.get("__run_sos__"):
                mark_theme_used(state, "emergency", content["__run_sos__"].get("destination_id","?"))
            if fmt == "viral_eats_pick" and content.get("__run_viral__"):
                mark_theme_used(state, "viral_eats", content["__run_viral__"].get("id","?"))
            if fmt == "camping_intel" and content.get("__run_camp__"):
                mark_theme_used(state, "camping", content["__run_camp__"].get("id","?"))
            if fmt == "collection_series" and content.get("__run_coll_series__"):
                mark_theme_used(state, "collection_series", content["__run_coll_series__"].get("id","?"))
            if audience_tag:
                mark_theme_used(state, "audience_tags", audience_tag)
            # Moat tracker: the angle itself, so it rotates through all of MOAT_ANGLES
            if moat and fmt:
                mark_theme_used(state, "moat_angles", fmt)
            # Format round-robin tracker. Records BOTH morning and evening
            # picks (2026-05-22) so the two runs jointly cycle through formats
            # and never repeat the same one across a single day.
            if not moat and fmt:
                mark_theme_used(state, "morning_formats", fmt)

            # For carousels, stamp every featured destination so the 14-day
            # cooldown applies to the whole set — not just the anchor slide.
            if is_carousel:
                for sd in slide_dests:
                    used.add(sd["id"])
                    # Deduplicate: mark_posted already stamps the anchor dest
                    if not any(d["destination_id"] == sd["id"] and d["date"] == today
                               for d in state.get("posted_destinations", [])):
                        state.setdefault("posted_destinations", []).append(
                            {"destination_id": sd["id"], "date": today})
                    mark_theme_used(state, "destinations", sd["id"])

        # ── Instagram Story (separate format — every day except Reel days) ────
        # Mode-scoped key so morning & evening each get their own Story slot.
        # Moat mode does NOT post a Story — the feed post IS the moat message.
        story_key = acc_id + mode_suffix + "_story"
        if (not moat
                and story_fmt is not None
                and platform == "instagram"
                and weekday in STORY_DAYS
                and state.get("posted_today", {}).get(story_key) != today
                and not use_video):  # Stories use images only; Reel days skip Story

            # Generate a story-specific caption + image (DIFFERENT from feed)
            story_caption, story_dest = generate_post(story_fmt, content, "instagram", used)
            if not story_caption or not story_dest:
                log.warning(f"[{label}] Story content unavailable for {story_fmt} — skipping Story.")
                continue
            story_caption = apply_platform_voice(story_caption, "instagram")
            story_caption = sanitize(story_caption)

            story_image_url = story_dest.get("image")
            story_media     = None
            if story_image_url:
                log.info(f"[{label}] Uploading Story image ({story_dest['id']}.jpg)...")
                # fmt="story" → branded picker returns the 1080x1920 variant so
                # IG's 9:16 Story viewport doesn't crop title text off the sides.
                story_media = upload_media(story_image_url, f"{story_dest['id']}.jpg", "image/jpeg", fmt="story")
            if not story_media:
                log.warning(f"[{label}] Story image upload failed — skipping Story.")
                continue

            log.info(f"[{label}] Publishing Story · format={story_fmt} · dest={story_dest['id']}")
            story_result = publish_story(account, story_media, dry_run=dry_run)
            if story_result:
                story_post_id = story_result.get("post", {}).get("id", "unknown")
                if not dry_run and story_post_id != "unknown":
                    s_confirmed = wait_for_publish(story_post_id)
                    if s_confirmed:
                        log.info(f"[{label}] ✅ Story live · ID={s_confirmed.get('platformPostId','—')}")
                    else:
                        log.info(f"[{label}] ✅ Story queued · Outstand={story_post_id}")
                else:
                    log.info(f"[{label}] ✅ Story submitted (id={story_post_id})")
                if not dry_run:
                    _mark_posted_today(state, story_key)
                    state["post_log"].append({
                        "timestamp":   datetime.now(timezone.utc).isoformat(),
                        "date":        today,
                        "platform":    "instagram_story",
                        "account_id":  acc_id,
                        "post_id":     story_post_id,
                        "destination": story_dest["id"],
                        "format":      story_fmt,
                        "has_media":   True,
                        "mode":        mode.lower(),
                    })
                    mark_theme_used(state, "destinations", story_dest["id"])
                    if story_fmt == "collection_spotlight" and content.get("__run_collection__"):
                        mark_theme_used(state, "collections", content["__run_collection__"]["id"])
                    if story_fmt == "festival_alert" and content.get("__run_festival__"):
                        mark_theme_used(state, "festivals", content["__run_festival__"]["id"])
                    if story_fmt == "blog_promo" and content.get("__run_article__"):
                        mark_theme_used(state, "articles", content["__run_article__"].get("slug","?"))
            else:
                log.warning(f"[{label}] Story failed — continuing.")

    # ── 5. Save state ─────────────────────────────────────────────────────────
    save_state(state)
    log.info("State saved. Run complete.")
    log.info("═" * 60)

# ─────────────────────────────────────────────────────────────────────────────
# TOURIST MAP MODE
# ─────────────────────────────────────────────────────────────────────────────
# Standalone schedule (Tue/Thu/Sat) that generates illustrated tourist maps
# from map_data.json. Rotates through 28 states × 4 combos (2 variants ×
# 2 themes) = 112 unique posts before any repeat. At 2-3 posts/week that's
# ~9 months of content.

TOURIST_MAP_VARIANTS = ["cartographic", "editorial"]
TOURIST_MAP_THEMES   = ["dark", "light"]
# Runs on Tue/Thu/Sat (weekdays 1, 3, 5)
TOURIST_MAP_DAYS     = {1, 3, 5}

TOURIST_MAP_LOCK_FILE = Path(__file__).parent / ".autoposter-tourist-map.lock"


def _tourist_map_caption(state_name: str, tagline: str, landmarks: list,
                         platform: str) -> str:
    """Generate a caption for a tourist map post."""
    # Pick up to 4 landmark names for the caption
    spots = [lm.get("name", "") for lm in landmarks[:4] if lm.get("name")]
    spots_str = ", ".join(spots) if spots else "and more"

    caption = (
        f"📍 {state_name} — Tourist Map\n\n"
        f"{tagline}\n\n"
        f"From {spots_str} — {state_name} has it all.\n\n"
        f"Save this map for your next trip.\n\n"
        f"—\n"
        f"NakshIQ scores every Indian destination, every month.\n"
        f"Data, not opinions.\n\n"
    )

    # Platform-specific hashtags (max 5)
    st = state_name.replace(' ', '')
    if platform in ("instagram", "facebook"):
        caption += (
            f"#{st} #{st}Tourism #TouristMap "
            f"#{month_name()}Travel #NakshIQ"
        )
    elif platform == "linkedin":
        caption += f"#{st} #TravelTech #TouristMap #NakshIQ #{month_name()}Travel"

    return caption


def _run_tourist_map(force: bool = False, dry_run: bool = False,
                     bypass_schedule: bool = False) -> bool:
    """
    Tourist Map mode — generates and posts an illustrated state tourist map.
    Rotates through states (oldest-unused first) and cycles variant+theme combos.

    bypass_schedule: skip the Tue/Thu/Sat day-of-week gate (set True when
    invoked from the evening picker rotation — the picker is the scheduler).
    Returns True if at least one account was posted to.
    """
    import json
    import tempfile
    import random
    from pathlib import Path as _Path

    today   = date.today().isoformat()
    weekday = date.today().weekday()
    state   = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · TOURIST MAP · {today} · weekday={weekday}")
    log.info("═" * 60)

    # Only runs on Tue/Thu/Sat
    if weekday not in TOURIST_MAP_DAYS and not force and not bypass_schedule:
        log.info(f"Tourist Map mode runs Tue/Thu/Sat only (today weekday={weekday}) — exiting.")
        return False

    # Load map data
    map_data_path = _Path(__file__).parent / "map_data.json"
    if not map_data_path.exists():
        log.error("map_data.json not found — cannot generate tourist maps.")
        return

    with open(map_data_path) as f:
        map_data = json.load(f)

    states_list = map_data.get("states", [])
    if not states_list:
        log.error("No states in map_data.json.")
        return

    # Build state items for the anti-repetition tracker
    state_items = [{"id": s["short_code"], "name": s["name"],
                    "tagline": s.get("tagline", ""),
                    "landmarks": s.get("landmarks", [])}
                   for s in states_list]

    # Pick oldest-unused state
    ordered = pick_oldest_unused(state, "tourist_map_states", state_items, key="id")
    chosen_state = ordered[0]
    state_code = chosen_state["id"]
    state_name = chosen_state["name"]

    # Pick variant+theme combo. Use a secondary tracker so we cycle through
    # all 4 combos for each state before repeating.
    combos = [f"{v}_{t}" for v in TOURIST_MAP_VARIANTS for t in TOURIST_MAP_THEMES]
    combo_items = [{"id": f"{state_code}_{c}"} for c in combos]
    combo_ordered = pick_oldest_unused(state, "tourist_map_combos", combo_items, key="id")
    chosen_combo_id = combo_ordered[0]["id"]  # e.g. "HP_cartographic_dark"
    parts = chosen_combo_id.replace(f"{state_code}_", "", 1).rsplit("_", 1)
    variant, theme = parts[0], parts[1]

    status = dimension_cycle_status(state, "tourist_map_states", len(state_items))
    log.info(f"Tourist Map target: {state_name} ({state_code}) · {variant} · {theme} "
             f"({status['unused']}/{status['total']} states never featured)")

    # Generate the map image
    try:
        from map_gen import build_tourist_map
    except Exception as e:
        log.error(f"Cannot import map_gen: {e}")
        return

    try:
        with tempfile.TemporaryDirectory(prefix="nakshiq_tmap_") as td:
            out_dir = _Path(td)
            map_path = build_tourist_map(state_code, out_dir, theme=theme, variant=variant)
            log.info(f"Map rendered: {map_path.name} ({map_path.stat().st_size // 1024} KB)")
            map_bytes = map_path.read_bytes()
    except Exception as e:
        log.error(f"Map generation failed for {state_code}: {e}")
        import traceback; traceback.print_exc()
        return

    # Upload image
    media_filename = f"tourist_map_{state_code}_{theme}_{variant}.jpg"
    media_obj = upload_media_bytes(map_bytes, media_filename, "image/jpeg")
    if not media_obj:
        log.error("Media upload failed.")
        return

    log.info(f"Map image uploaded: {media_filename}")

    # Get accounts
    accounts = get_connected_accounts()
    active   = [a for a in accounts if a.get("isActive")]
    if not active:
        log.warning("No active connected accounts.")
        return

    labels = [f"{a['network']}/{a['username']}" for a in active]
    log.info(f"Active accounts: {labels}")

    mode_suffix = "_tourist_map"
    posted_any = False

    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        # YouTube only supports video — skip image posts
        if platform == "youtube":
            log.info(f"[{label}] Skipping tourist map (YouTube only accepts video/reels).")
            continue

        acc_scoped_key = acc_id + mode_suffix
        if state.get("posted_today", {}).get(acc_scoped_key) == today and not force:
            log.info(f"[{label}] Already posted tourist map today — skipping.")
            continue

        caption = _tourist_map_caption(
            state_name, chosen_state["tagline"],
            chosen_state["landmarks"], platform
        )
        caption = apply_platform_voice(caption, platform)
        caption = sanitize(caption)

        log.info(f"[{label}] Publishing tourist map for {state_name}...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish:\n{caption[:200]}...")
            posted_any = True
            continue

        result = publish_feed_post(
            caption, account, media_obj, dry_run=False,
            fmt="tourist_map",
            utm_content=build_utm_content(state_name.lower().replace(" ", "-"), "tourist_map"),
        )
        if result:
            log.info(f"[{label}] Tourist map posted successfully!")
            _mark_posted_today(state, acc_scoped_key)
            posted_any = True
            # Cross-flow dedup: write to post_log so morning round-robin's
            # 14-day filter sees this state-themed post on subsequent days.
            record_publish(
                state,
                dest_id=None,  # state-themed, not destination-bound
                fmt="tourist_map",
                post_id=(result.get("post") or {}).get("id"),
                platform=platform,
                media_id=chosen_combo_id,
            )
        else:
            log.warning(f"[{label}] Tourist map post failed.")

    # Mark state + combo as used in theme tracker
    if posted_any:
        mark_theme_used(state, "tourist_map_states", state_code)
        mark_theme_used(state, "tourist_map_combos", chosen_combo_id)
        log.info(f"Theme tracker updated: {state_code} / {chosen_combo_id}")

    save_state(state)
    log.info("State saved. Tourist Map run complete.")
    log.info("═" * 60)
    return posted_any


def run_tourist_map(force: bool = False, dry_run: bool = False):
    """Entry point for tourist map mode with its own lock file."""
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    global LOCK_FILE
    original_lock = LOCK_FILE
    LOCK_FILE = TOURIST_MAP_LOCK_FILE

    try:
        if not dry_run and not _acquire_lock(force=force):
            sys.exit(0)
        try:
            _run_tourist_map(force=force, dry_run=dry_run)
        finally:
            if not dry_run:
                _release_lock()
    finally:
        LOCK_FILE = original_lock


# ─────────────────────────────────────────────────────────────────────────────
# CANVA VISUAL MODE
# ─────────────────────────────────────────────────────────────────────────────
# Posts pre-generated Canva visuals from canva_library/. Rotates across 8
# content categories (mood_shots, color_palettes, this_or_that, collections,
# activities, seasons, food, festivals) using anti-repetition tracking.
# Library is grown over time via Canva MCP batch sessions.
#
# With 460+ destinations, 85 collections, 311 festivals, etc., the prompt
# templates in manifest.json can generate thousands of unique visuals.

CANVA_LIBRARY_DIR = Path(__file__).parent / "canva_library"
CANVA_LOCK_FILE   = Path(__file__).parent / ".autoposter-canva.lock"

# Category rotation — cycles through categories so the feed never shows
# the same type of visual on consecutive days.
CANVA_CATEGORY_ORDER = [
    "mood_shots", "collections", "this_or_that", "activities",
    "color_palettes", "food", "seasons", "festivals",
]

# Caption templates per category
CANVA_CAPTION_TEMPLATES = {
    "mood_destination": (
        "📍 {subject}\n\n"
        "This destination is scored 1-10 every month based on weather, "
        "road access, crowd density, infrastructure, and safety.\n"
        "Right now? Check the score before you book.\n\n"
        "→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=canva-visual\n\n"
        "{hashtags}"
    ),
    "color_palette": (
        "🎨 {subject}\n\n"
        "These colors peak in a specific 6-week window. "
        "NakshIQ tracks exactly when — because 3 weeks late means brown, not gold.\n\n"
        "→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=canva-visual\n\n"
        "{hashtags}"
    ),
    "this_or_that": (
        "🤔 {comparison_a} or {comparison_b}?\n\n"
        "One scores higher this month. One has better roads. "
        "One costs 40% less. Drop your pick — we'll drop the data.\n\n"
        "→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=canva-visual\n\n"
        "{hashtags}"
    ),
    "collection": (
        "📌 {subject}\n\n"
        "Every spot in this list is scored monthly on 5 real dimensions. "
        "Not a blogger's top 10 — a data-backed shortlist updated in real time.\n\n"
        "→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=canva-visual\n\n"
        "{hashtags}"
    ),
    "activity": (
        "⛰️ {subject}\n\n"
        "Before you go: NakshIQ checked the road conditions, nearest hospital, "
        "cell coverage, and crowd density at this spot. You should too.\n\n"
        "→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=canva-visual\n\n"
        "{hashtags}"
    ),
    "season": (
        "🌦️ {subject}\n\n"
        "Wrong month = washed-out roads, 45°C heat, or surprise closures. "
        "NakshIQ scores {total} destinations monthly so you don't learn this the hard way.\n\n"
        "→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=canva-visual\n\n"
        "{hashtags}"
    ),
    "food_city": (
        "🍽️ {subject}\n\n"
        "Skip the Google Maps 4.2-star tourist traps. "
        "NakshIQ audits local eateries with real prices, hygiene notes, and timings.\n\n"
        "→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=canva-visual\n\n"
        "{hashtags}"
    ),
    "festival": (
        "🪔 {subject}\n\n"
        "NakshIQ tracks 325+ Indian festivals — exact dates, "
        "which roads are open, crowd density data, and whether your carrier gets signal there.\n\n"
        "→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=canva-visual\n\n"
        "{hashtags}"
    ),
}


def _canva_hashtags(entry: dict, platform: str) -> str:
    """Build platform-appropriate hashtags from image metadata.

    Tier 1 (2026-05-10): IG gets ~18 niche/branded tags from the shared pool;
    FB/YT keep the legacy 5-tag block where the algorithm doesn't reward depth.
    """
    state = entry.get("state")
    dest = entry.get("destination")
    category = entry.get("category", "")

    if platform == "instagram":
        return _build_ig_hashtags(
            dest_name=dest,
            state_name=state,
            category=category or "canva",
        )

    # Legacy 5-tag block for FB/other.
    tags = entry.get("tags", [])
    base: list[str] = []
    if dest:
        base.append(dest.replace("_", "").replace(" ", ""))
    if state:
        base.append(state.replace(" ", ""))
    for t in tags[:3]:
        clean = t.replace("_", "").replace(" ", "")
        if clean and clean not in base:
            base.append(clean)
    CAT_TAGS = {
        "food": "IndiaFood", "festivals": "IndiaFestivals",
        "activities": "IndiaAdventure", "seasons": "SeasonalTravel",
        "mood_shots": "IndiaVibes", "collections": "TravelCollection",
    }
    cat_tag = CAT_TAGS.get(category)
    if cat_tag and len(base) < 5 and cat_tag not in base:
        base.append(cat_tag)
    if len(base) < 5 and "NakshIQ" not in base:
        base.append("NakshIQ")

    return " ".join(f"#{h}" for h in base[:5])


def _canva_caption(entry: dict, platform: str) -> str:
    """Generate caption for a Canva visual post."""
    template_key = entry.get("caption_template", "mood_destination")
    # Map category to template key if not explicitly set
    category_template_map = {
        "mood_shots": "mood_destination",
        "color_palettes": "color_palette",
        "this_or_that": "this_or_that",
        "collections": "collection",
        "activities": "activity",
        "seasons": "season",
        "food": "food_city",
        "festivals": "festival",
    }
    if template_key not in CANVA_CAPTION_TEMPLATES:
        template_key = category_template_map.get(entry.get("category", ""), "mood_destination")

    template = CANVA_CAPTION_TEMPLATES.get(template_key, CANVA_CAPTION_TEMPLATES["mood_destination"])
    hashtags = _canva_hashtags(entry, platform)

    caption = template.format(
        subject=entry.get("subject", "India"),
        comparison_a=entry.get("comparison", ["A", "B"])[0] if "comparison" in entry else "This",
        comparison_b=entry.get("comparison", ["A", "B"])[1] if "comparison" in entry else "That",
        total=TOTAL_DESTINATIONS,
        hashtags=hashtags,
    )

    # Tier 2.6 — same homepage→deep-link swap as pomelli. Picks the path from
    # CANVA_CAMPAIGN_PATHS based on entry category (or template_key fallback).
    cat = entry.get("category", "") or template_key
    path = CANVA_CAMPAIGN_PATHS.get(cat, CANVA_GENERAL_PATH)
    utm_source = "fb" if platform == "facebook" else "ig"
    deep_url = utm(
        f"https://nakshiq.com{path}",
        utm_source, "post", "canva-visual",
        content=build_utm_content(entry.get("destination") or cat or None,
                                  "canva_visual"),
    )
    caption = _swap_homepage_cta(caption, deep_url, "canva-visual")
    # Tier 1.3 + 1.5: strip IG URL → link-in-bio + add comments-bait CTA.
    caption = _strip_url_for_ig(caption, platform)
    caption = _add_ig_engagement_cta(caption, platform, "canva")
    return caption


def _run_canva_visual(force: bool = False, dry_run: bool = False):
    """
    Canva Visual mode — posts pre-generated visuals from canva_library/.
    Rotates categories and images with full anti-repetition tracking.
    """
    import json as _json

    today   = date.today().isoformat()
    weekday = date.today().weekday()
    st      = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · CANVA VISUAL · {today} · weekday={weekday}")
    log.info("═" * 60)

    # Load manifest
    manifest_path = CANVA_LIBRARY_DIR / "manifest.json"
    if not manifest_path.exists():
        log.error("canva_library/manifest.json not found.")
        return

    try:
        with open(manifest_path) as f:
            manifest = _json.load(f)
    except (_json.JSONDecodeError, OSError) as e:
        log.error(f"canva_library/manifest.json corrupt or unreadable: {e}")
        return

    all_images = manifest.get("images", [])
    if not all_images:
        log.error("No images in canva_library/manifest.json.")
        return

    # Verify image files actually exist
    available = []
    for img in all_images:
        img_path = CANVA_LIBRARY_DIR / img["file"]
        if img_path.exists():
            available.append(img)
        else:
            log.warning(f"Image not found, skipping: {img['file']}")

    if not available:
        log.error("No available images in library.")
        return

    log.info(f"Library: {len(available)} images across "
             f"{len(set(i['category'] for i in available))} categories")

    # ── Pick category (oldest-unused first, cycling through all 8) ────────
    available_cats = list(set(i["category"] for i in available))
    cat_items = [{"id": c} for c in CANVA_CATEGORY_ORDER if c in available_cats]
    if not cat_items:
        cat_items = [{"id": c} for c in available_cats]
    cat_ordered = pick_oldest_unused(st, "canva_categories", cat_items, key="id")
    chosen_cat = cat_ordered[0]["id"]

    # ── Pick image within that category (oldest-unused first) ─────────────
    cat_images = [i for i in available if i["category"] == chosen_cat]
    if not cat_images:
        # Fallback: pick from any category
        cat_images = available
        chosen_cat = cat_images[0]["category"]

    # 2026-05-17 (Tier 7 Phase 1.4): filter out images whose destination has
    # already been posted this calendar month (or is hardcoded-blocked).
    # Without this, Canva visual can re-post Pahalgam mid-month even though
    # the main loop already covered it.
    used = recently_used_destinations(st)
    cat_images_fresh = [i for i in cat_images
                       if (i.get("destination") or i.get("dest_id") or "") not in used]
    if cat_images_fresh:
        cat_images = cat_images_fresh
    else:
        log.info(f"canva_visual: all {len(cat_images)} images in '{chosen_cat}' "
                 f"already covered this month — falling back to original pool")

    img_items = [{"id": img["file"], **img} for img in cat_images]
    img_ordered = pick_oldest_unused(st, "canva_images", img_items, key="id")
    chosen_img = img_ordered[0]

    log.info(f"Selected: [{chosen_cat}] {chosen_img['subject']} → {chosen_img['file']}")

    # Read image bytes
    img_path = CANVA_LIBRARY_DIR / chosen_img["file"]
    img_bytes = img_path.read_bytes()

    # Upload
    media_filename = f"canva_{chosen_cat}_{Path(chosen_img['file']).stem}.jpg"
    media_obj = upload_media_bytes(img_bytes, media_filename, "image/jpeg")
    if not media_obj:
        log.error("Media upload failed.")
        return

    log.info(f"Image uploaded: {media_filename} ({len(img_bytes) // 1024} KB)")

    # Get accounts
    accounts = get_connected_accounts()
    active   = [a for a in accounts if a.get("isActive")]
    if not active:
        log.warning("No active connected accounts.")
        return

    mode_suffix = "_canva"
    posted_any = False

    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        # YouTube only supports video — skip image posts
        if platform == "youtube":
            log.info(f"[{label}] Skipping canva visual (YouTube only accepts video/reels).")
            continue

        acc_scoped_key = acc_id + mode_suffix
        if st.get("posted_today", {}).get(acc_scoped_key) == today and not force:
            log.info(f"[{label}] Already posted canva visual today — skipping.")
            continue

        caption = _canva_caption(chosen_img, platform)
        caption = apply_platform_voice(caption, platform)
        caption = sanitize(caption)

        log.info(f"[{label}] Publishing canva visual: {chosen_img['subject']}...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish:\n{caption[:200]}...")
            posted_any = True
            continue

        canva_campaign = chosen_img.get("campaign") or chosen_img.get("subject", "")
        result = publish_feed_post(
            caption, account, media_obj, dry_run=False,
            fmt="canva_visual",
            media_id=chosen_img.get("file"),
            utm_content=build_utm_content(canva_campaign.replace(" ", "-").lower() or None, "canva_visual"),
        )
        if result:
            log.info(f"[{label}] Canva visual posted successfully!")
            _mark_posted_today(st, acc_scoped_key)
            posted_any = True
            record_publish(
                st,
                dest_id=chosen_img.get("destination") or None,
                fmt="canva_visual",
                post_id=(result.get("post") or {}).get("id"),
                platform=platform,
                media_id=chosen_img.get("file"),
            )
        else:
            log.warning(f"[{label}] Canva visual post failed.")

    # Mark category + image as used
    if posted_any:
        mark_theme_used(st, "canva_categories", chosen_cat)
        mark_theme_used(st, "canva_images", chosen_img["file"])
        log.info(f"Theme tracker updated: cat={chosen_cat} / img={chosen_img['file']}")

    save_state(st)
    log.info("State saved. Canva Visual run complete.")
    log.info("═" * 60)


def run_canva_visual(force: bool = False, dry_run: bool = False):
    """Entry point for canva visual mode with its own lock file."""
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    global LOCK_FILE
    original_lock = LOCK_FILE
    LOCK_FILE = CANVA_LOCK_FILE

    try:
        if not dry_run and not _acquire_lock(force=force):
            sys.exit(0)
        try:
            _run_canva_visual(force=force, dry_run=dry_run)
        finally:
            if not dry_run:
                _release_lock()
    finally:
        LOCK_FILE = original_lock


# ─────────────────────────────────────────────────────────────────────────────
# POMELLI VISUAL MODE — AI-generated on-brand campaign creatives
# ─────────────────────────────────────────────────────────────────────────────
#
# Posts from pomelli_library/ — 496 creatives across 20 feature campaigns
# (monthly_scores, tourist_traps, kids_safety, etc.) and 20+ region campaigns.
# Rotates campaign themes with anti-repetition so the feed showcases a
# different NakshIQ MOAT feature every day.  Platform-specific captions:
# IG = long-form + hashtags, FB = question-led + shorter.

POMELLI_LIBRARY_DIR = Path(__file__).parent / "pomelli_library"
POMELLI_LOCK_FILE   = Path(__file__).parent / ".autoposter-pomelli.lock"

# Campaign theme rotation — feature campaigns first (high-value MOAT content),
# then region campaigns.  Cycling ensures the feed never shows the same
# campaign type on consecutive days.
POMELLI_CAMPAIGN_ORDER = [
    # ── Feature campaigns (20) — rotate these first ──────────────────────
    "monthly_scores", "tourist_traps", "kids_safety", "budget_reality",
    "before_you_decide", "crowd_intelligence", "road_status", "budget_1000day",
    "dangerous_roads", "solo_female_safety", "74_road_trips", "manali_leh_reality",
    "festivals_325", "unknown_festivals", "emergency_sos", "network_coverage",
    "ai_trip_planner", "route_builder", "480_destinations", "scoring_methodology",
    # ── General data themes (4) ──────────────────────────────────────────
    "safety_data", "seasonal_intel", "infrastructure_reality", "data_authority",
    # ── Region campaigns (21) — destination-specific creatives ───────────
    "kerala", "himachal", "rajasthan", "tamilnadu", "goa", "meghalaya",
    "uttarakhand", "punjab", "mp", "karnataka", "delhi", "odisha", "sikkim",
    "jk", "assam", "as", "bihar", "chhattisgarh", "northeast",
    "maharashtra", "mh", "wb", "up", "ap", "andhra", "jharkhand", "guj",
    # ── May 2026 campaigns (27) — seasonal + monsoon prep ──────────────
    "may_heat_trap", "may_suitability_audit", "may_the_may_suitability_audit",
    "may_monsoon_myths_reality", "may_verified_safe_monsoon_corridors",
    "may_june_s_landslide_hazard_map", "may_the_june_drainage_map",
    "may_luxury_stays_monsoon_prices", "may_safe_corridors_for_summer_pilgrims",
    "may_the_may_heat_exhaustion_map", "may_the_28_state_water_safety_map",
    "may_oxygen_gaps_at_17_582_feet", "may_spiti_s_400km_of_dead_spots",
    "may_4g_dead_zone_map", "may_pediatric_icu_distance_verified",
    "may_the_72_hour_permit_backlog", "may_midnight_arrival_read_this_first",
    "may_the_senior_friendly_circuit", "may_travel_guides_without_the_filters",
    "may_the_andhra_temple_food_audit", "may_17_stepwells_the_audit",
    "may_bengal_s_30_heritage_rail_audits", "may_gokarna_s_4_hidden_riptides",
    "may_mangalore_s_may_surf_data", "may_the_murdeshwar_cliff_audit",
    "may_6_people_per_square_meter", "may_travel_math_solved",
    # ── Catchall ─────────────────────────────────────────────────────────
    "brand_authority",
]

# ── Feature campaign caption metadata ────────────────────────────────────
# Platform-specific templates: IG gets long-form + hashtags, FB gets
# question-driven shorter copy.  Region campaigns get generic templates
# with state-specific context injected.

POMELLI_FEATURE_CAPTIONS = {
    "monthly_scores": {
        "ig": "📊 {subject}\n\nEvery destination. Every month. One honest score.\nWeather × Crowds × Roads × Infrastructure × Safety = one number.\n\nStop guessing. Start planning with data.\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nData, not opinions.\n\n{hashtags}",
        "fb": "What if you could see exactly when to visit any Indian destination — scored 1 to 10 for every month?\n\nThat's what NakshIQ does. {subject}\n\n→ nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "tourist_traps": {
        "ig": "🚫 {subject}\n\n109 tourist traps exposed. The overcrowded, overpriced, overhyped spots travel blogs won't warn you about.\n\nNakshIQ doesn't just recommend — we anti-recommend.\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nTravel with IQ.\n\n{hashtags}",
        "fb": "Would you rather discover a tourist trap BEFORE or AFTER spending ₹15,000 to get there?\n\n{subject}\n\n109 honest anti-recommendations → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "kids_safety": {
        "ig": "👨‍👩‍👧 {subject}\n\nHospital distance. Ambulance time. Phone signal. Altitude risk. Road safety.\nAll factored into one kids score.\n\nFamily travel without data is gambling.\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nData, not opinions.\n\n{hashtags}",
        "fb": "Before you book that 'family-friendly' hill station — do you know how far the nearest hospital is?\n\n{subject}\n\nNakshIQ scores every destination for family safety → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "budget_reality": {
        "ig": "💰 {subject}\n\n₹1,100/day to ₹10,000/day — every destination priced honestly.\nStay + food + transport + activities.\n\nNo influencer fantasy. Real numbers.\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nTravel with IQ.\n\n{hashtags}",
        "fb": "Influencers say Goa costs ₹500/day. Reality? Depends on the month, the area, and what you actually want.\n\n{subject}\n\nReal budgets for every Indian destination → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "before_you_decide": {
        "ig": "🔄 {subject}\n\nSame region. Less crowd. Better value.\nNakshIQ shows you what the famous place used to be — before the crowds.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nTravel with IQ.\n\n{hashtags}",
        "fb": "What if the best version of your destination is 3 hours away — quieter, cheaper, and better?\n\n{subject}\n\nSmarter alternatives backed by data → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "crowd_intelligence": {
        "ig": "👥 {subject}\n\nMonthly crowd heatmaps. Best days. Worst weekends.\nKnow before you go.\n\nNakshIQ tracks crowd density so you never walk into chaos.\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nData, not opinions.\n\n{hashtags}",
        "fb": "Would you visit the Taj Mahal on a Saturday in October? NakshIQ's crowd data says: don't.\n\n{subject}\n\nReal-time crowd intelligence → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "road_status": {
        "ig": "🛣️ {subject}\n\nLandslides. Closures. Permits. Surface quality. Queue times.\nNakshIQ knows if that road is actually open.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nTravel with IQ.\n\n{hashtags}",
        "fb": "Planning a road trip? That highway you're counting on might be closed right now.\n\n{subject}\n\nReal-time road intelligence → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "budget_1000day": {
        "ig": "🎒 {subject}\n\n18 incredible destinations on ₹1,000/day. Real budget. Zero compromise.\nStay + food + transport + activities — all verified.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nData, not opinions.\n\n{hashtags}",
        "fb": "₹1,000 per day. Can you actually travel India on that? Yes — to 18 specific destinations.\n\n{subject}\n\nVerified budget travel → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "dangerous_roads": {
        "ig": "⚡ {subject}\n\nCliff edges. No barriers. Scenery that stops your heart.\nIndia's most dangerous roads — and the data that keeps bikers alive.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nTravel with IQ.\n\n{hashtags}",
        "fb": "Some roads in India have zero guardrails and 1,000-foot drops. Bikers ride them anyway.\n\n{subject}\n\nDangerous road data → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "solo_female_safety": {
        "ig": "🛡️ {subject}\n\n25 destinations scored safest for solo female travelers.\nInfrastructure. Connectivity. Active tourism. Tested.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nData, not opinions.\n\n{hashtags}",
        "fb": "Solo female travel in India — which destinations actually score highest for safety?\n\n{subject}\n\nData-backed safety scores → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "74_road_trips": {
        "ig": "🏍️ {subject}\n\n74 road trips. Road quality. Fuel stops. Phone signal. Altitude risk.\nNot blog lists — biker data.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nTravel with IQ.\n\n{hashtags}",
        "fb": "74 road trips across India — each scored for road quality, fuel, phone signal, and safety.\n\n{subject}\n\nRoad trip intelligence → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "manali_leh_reality": {
        "ig": "🏔️ {subject}\n\n490km. 5 passes above 4000m. 365km without fuel. Zero signal zones.\nThe Manali-Leh reality nobody posts.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nData, not opinions.\n\n{hashtags}",
        "fb": "Manali to Leh: 490km through uninhabited desert. What nobody tells you before you go.\n\n{subject}\n\nReal route data → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "festivals_325": {
        "ig": "🪔 {subject}\n\n325 festivals mapped across India. Dates. Locations. Safety intel.\nTime your next trip around something extraordinary.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nTravel with IQ.\n\n{hashtags}",
        "fb": "India celebrates 325+ festivals a year. Most travelers accidentally miss all of them.\n\n{subject}\n\nFestival calendar → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "unknown_festivals": {
        "ig": "🎭 {subject}\n\n200+ village deities. Midnight ceremonies. Masked tribal dances.\nThe festivals travel guides don't cover.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nData, not opinions.\n\n{hashtags}",
        "fb": "Did you know Kullu Dussehra STARTS when everyone else's ends? 200+ village gods.\n\n{subject}\n\nHidden festivals → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "emergency_sos": {
        "ig": "🏥 {subject}\n\nHospital: 1km. Ambulance: 10 min. Police: on call.\nEmergency data for every destination.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nTravel with IQ.\n\n{hashtags}",
        "fb": "Your travel app shows sunset photos. Does it show how far the nearest hospital is?\n\n{subject}\n\nEmergency data → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "network_coverage": {
        "ig": "📱 {subject}\n\nJio? Airtel? BSNL? NakshIQ tested every destination.\nKnow which carrier works — before you lose signal.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nData, not opinions.\n\n{hashtags}",
        "fb": "15 destinations where ONLY BSNL works. Is that your carrier?\n\n{subject}\n\nNetwork coverage → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "ai_trip_planner": {
        "ig": "🤖 {subject}\n\nAI Trip Planner backed by real data. 480 destinations. 74 routes. 325 festivals.\nThe first AI planner that actually knows India.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nTravel with IQ.\n\n{hashtags}",
        "fb": "AI travel planners give generic answers. NakshIQ's AI is trained on 480 real destinations.\n\n{subject}\n\nTry the smarter AI planner → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "route_builder": {
        "ig": "🗺️ {subject}\n\nBuild your own route. We tell you what's open, where to fuel, where your phone dies.\nReal infrastructure data on every road.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nData, not opinions.\n\n{hashtags}",
        "fb": "Building a road trip route? NakshIQ overlays fuel, signal, road conditions, and safety.\n\n{subject}\n\nRoute Builder → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "480_destinations": {
        "ig": "🎯 {subject}\n\n480 destinations. Not blog posts — intelligence reports.\nMonthly scores. Safety. Budget. Infrastructure.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nTravel with IQ.\n\n{hashtags}",
        "fb": "480 Indian destinations. Each one treated like a mission briefing — not a blog post.\n\n{subject}\n\nAccess the intelligence → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
    "scoring_methodology": {
        "ig": "🔬 {subject}\n\nWeather + Road Access + Crowd Density + Infrastructure + Safety = one honest number.\nTransparency builds trust.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n—\nData, not opinions.\n\n{hashtags}",
        "fb": "How do you reduce an entire destination to one number? Five data layers, zero opinions.\n\n{subject}\n\nSee the methodology → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
    },
}

# Generic caption templates for region + general campaigns
POMELLI_REGION_CAPTION = {
    "ig": "📍 {subject}\n\n{state} — every destination scored on road access, hospital distance, cell signal, crowd density, and budget.\nUpdated monthly. Not a blog post.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n{hashtags}",
    "fb": "{subject}\n\nEvery {state} destination scored monthly on 5 real dimensions.\nRoad conditions. Hospital proximity. Signal coverage. The data that actually matters.\n\n→ nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
}

POMELLI_GENERAL_CAPTION = {
    "ig": "📊 {subject}\n\n{total} destinations. Scored 1-10 every month.\nWeather. Roads. Crowds. Hospitals. Cell signal.\nThe stuff travel blogs skip.\n\n→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=pomelli-visual\n\n{hashtags}",
    "fb": "{subject}\n\n{total} destinations scored monthly on 5 real dimensions — not vibes, not reviews, not sponsored lists.\n\nCheck the data → nakshiq.com?utm_source=fb&utm_medium=post&utm_campaign=pomelli-visual",
}


def _pomelli_hashtags(entry: dict, platform: str) -> str:
    """Build platform-appropriate hashtags for a Pomelli post.

    Tier 1 (2026-05-10): IG path now returns ~18 niche/branded tags via the
    shared pool, blending in any campaign-specific tags from `entry["tags"]`.
    FB/YT keep the legacy 5-tag block (algorithm doesn't reward depth).
    """
    state = entry.get("state")

    if platform == "instagram":
        block = _build_ig_hashtags(
            dest_name=entry.get("destination") or None,
            state_name=state,
            category="pomelli",
        )
        # Prepend up to 2 campaign-specific tags so feature campaigns stay
        # discoverable inside their own hashtag pool (e.g. #SoloFemaleSafety).
        camp_tags = []
        for t in entry.get("tags", [])[:2]:
            clean = t.replace(" ", "").replace("_", "")
            if clean and f"#{clean}" not in block:
                camp_tags.append(f"#{clean}")
        if camp_tags:
            block = " ".join(camp_tags) + " " + block
        return block

    # Legacy 5-tag block for FB / other.
    tags = entry.get("tags", [])
    base: list[str] = []
    for t in tags:
        clean = t.replace(" ", "").replace("_", "")
        if clean and clean not in base:
            base.append(clean)
    if state and len(base) < 5:
        st = state.replace(" ", "")
        if st not in base:
            base.append(st)
    if len(base) < 5 and "NakshIQ" not in base:
        base.append("NakshIQ")

    return " ".join(f"#{h}" for h in base[:5])


# Tier 2.6 — campaign → category-page map. Replaces the homepage CTA in every
# pomelli + canva caption (~60 hardcoded `nakshiq.com?utm_...` URLs) with a
# deep link that lands on a verified high-engagement page.
#
# Targets chosen from the data-baseline-2026-05-04.md top-engaged list:
#   - /en/nakshiq-100 (top-100 destinations) — better fresh-landing experience
#     than /en/explore (which leaks 0% engagement on cold visits per data).
#   - /en/methodology — 6/6 engaged sessions / users (perfect engagement rate).
#   - /en/tourist-traps, /en/sos, /en/cost-index, etc. — direct subject match.
# Pages confirmed to exist via filesystem check (apps/web/src/app/[locale]/*).
POMELLI_CAMPAIGN_PATHS = {
    "monthly_scores":         "/en/nakshiq-100",
    "tourist_traps":          "/en/tourist-traps",
    "kids_safety":            "/en/explore-by-persona",
    "budget_reality":         "/en/cost-index",
    "before_you_decide":      "/en/compare",
    "crowd_intelligence":     "/en/explore-by-persona",
    "road_status":            "/en/road-conditions",
    "budget_1000day":         "/en/cost-index",
    "dangerous_roads":        "/en/road-conditions",
    "solo_female_safety":     "/en/explore-by-persona",
    "74_road_trips":          "/en/build-route",
    "manali_leh_reality":     "/en/build-route",
    "festivals_325":          "/en/festivals",
    "unknown_festivals":      "/en/festivals",
    "emergency_sos":          "/en/sos",
    "network_coverage":       "/en/methodology",
    "ai_trip_planner":        "/en/plan",
    "route_builder":          "/en/build-route",
    "480_destinations":       "/en/nakshiq-100",
    "scoring_methodology":    "/en/methodology",
}
# Default for region campaigns + general fallback. Both verified-existing.
POMELLI_REGION_PATH  = "/en/india-travel"
POMELLI_GENERAL_PATH = "/en/nakshiq-100"

# Same approach for canva
CANVA_CAMPAIGN_PATHS = {
    "destinations":   "/en/nakshiq-100",
    "festivals":      "/en/festivals",
    "infrastructure": "/en/methodology",
    "kids":           "/en/explore-by-persona",
    "budget":         "/en/cost-index",
    "trust":          "/en/transparency",
}
CANVA_GENERAL_PATH = "/en/nakshiq-100"


def _swap_homepage_cta(caption: str, deep_url: str, campaign_token: str) -> str:
    """Replace any `nakshiq.com?utm_*&utm_campaign=<campaign_token>` URL in
    `caption` with `deep_url`. Idempotent — running twice produces the same
    output. Used to swap pomelli/canva captions' homepage CTAs for
    campaign-specific deep links without rewriting every template.
    """
    pattern = re.compile(
        r"https?://(?:www\.)?nakshiq\.com\?utm_source=[a-z]+"
        r"&utm_medium=post"
        rf"&utm_campaign={re.escape(campaign_token)}"
    )
    # Some templates omit `https://` (just `nakshiq.com?utm=…`). Catch both.
    short = re.compile(
        r"\bnakshiq\.com\?utm_source=[a-z]+"
        r"&utm_medium=post"
        rf"&utm_campaign={re.escape(campaign_token)}"
    )
    out = pattern.sub(deep_url, caption)
    out = short.sub(deep_url, out)
    return out


def _pomelli_caption(entry: dict, platform: str) -> str:
    """Generate platform-specific caption for a Pomelli creative."""
    campaign = entry.get("campaign", "")
    campaign_type = entry.get("campaign_type", "general")

    # Platform key: "ig" for Instagram, "fb" for Facebook
    plat_key = "fb" if platform == "facebook" else "ig"

    # Select template
    if campaign in POMELLI_FEATURE_CAPTIONS:
        template = POMELLI_FEATURE_CAPTIONS[campaign][plat_key]
    elif campaign_type == "region":
        template = POMELLI_REGION_CAPTION[plat_key]
    else:
        template = POMELLI_GENERAL_CAPTION[plat_key]

    hashtags = _pomelli_hashtags(entry, platform)
    state = entry.get("state", "India")
    subject = entry.get("subject", "India")

    caption = template.format(
        subject=subject,
        state=state,
        total=TOTAL_DESTINATIONS,
        hashtags=hashtags,
    )

    # Tier 2.6 — replace the templated homepage CTA with a campaign-specific
    # deep link that resolves to a high-engagement page (not the 0%-engagement
    # blank-landing leak from data-baseline-2026-05-04.md).
    if campaign in POMELLI_CAMPAIGN_PATHS:
        path = POMELLI_CAMPAIGN_PATHS[campaign]
    elif campaign_type == "region":
        path = POMELLI_REGION_PATH
    else:
        path = POMELLI_GENERAL_PATH
    utm_source = "fb" if platform == "facebook" else "ig"
    deep_url = utm(
        f"https://nakshiq.com{path}",
        utm_source, "post", "pomelli-visual",
        content=build_utm_content(entry.get("destination") or campaign or None,
                                  "pomelli_visual"),
    )
    caption = _swap_homepage_cta(caption, deep_url, "pomelli-visual")
    # Tier 1.3 + 1.5: strip IG URL → link-in-bio + add saves-bait CTA.
    caption = _strip_url_for_ig(caption, platform)
    caption = _add_ig_engagement_cta(caption, platform, "pomelli")
    return caption


def _pomelli_clean_at_post_time(img_path: Path) -> bytes:
    """Defensive cleanup before uploading a Pomelli image to IG/FB (2026-05-03).

    If the on-disk image still has a stacked dark text bar (>80 px charcoal at
    bottom), strip it dynamically and re-stamp the clean monogram-only bar.
    Otherwise return the bytes unchanged. Failures fall back silently to the
    original bytes — never block a post on cleanup.
    """
    try:
        from PIL import Image, ImageFile
        ImageFile.LOAD_TRUNCATED_IMAGES = True
        import numpy as np
        from io import BytesIO

        im = Image.open(img_path).convert("RGB")
        im.load()
        arr = np.asarray(im)
        h = arr.shape[0]
        # Detect dark bar at bottom
        bar = 0
        for row in range(h - 1, -1, -1):
            if arr[row].mean() < 60:
                bar += 1
            else:
                break
        # Threshold: only trigger on EXTREME stacked bars (>150 px). Lower
        # values catch false positives (designs with naturally dark bottom
        # content like night photos or charcoal data charts).
        if bar <= 150:
            # Already clean — return original bytes
            return img_path.read_bytes()

        log.info(f"    Defensive cleanup: detected {bar}px stacked bar, regenerating in-flight…")
        w = im.size[0]
        max_a = int(h * 0.45)
        cropped = min(bar + 8, max_a)
        im = im.crop((0, 0, w, h - cropped))

        # Add single 56-px charcoal bar with monogram only (no text)
        new_h = im.size[1] + 56
        out = Image.new("RGB", (w, new_h), (22, 22, 20))
        out.paste(im, (0, 0))

        mono_path = (
            Path(__file__).parent / "assets" / "brand-pack" / "nakshiq"
            / "icon-system" / "monogram" / "nakshiq-monogram-light.png"
        )
        if mono_path.exists():
            mono = Image.open(mono_path).convert("RGBA")
            ratio = 32 / mono.height
            mono = mono.resize((int(mono.width * ratio), 32), Image.LANCZOS)
            out.paste(mono, (28, im.size[1] + (56 - mono.height) // 2), mono)

        buf = BytesIO()
        out.save(buf, "PNG")
        return buf.getvalue()
    except Exception as e:
        log.warning(f"    Defensive cleanup failed ({e}); falling back to raw bytes.")
        return img_path.read_bytes()


def _run_pomelli_visual(force: bool = False, dry_run: bool = False):
    """
    Pomelli Visual mode — posts AI-generated on-brand creatives from pomelli_library/.
    Rotates campaign themes (20 feature + 20 region) with anti-repetition tracking.
    Platform-specific captions: IG = long-form + hashtags, FB = question-driven.
    """
    import json as _json

    today   = date.today().isoformat()
    weekday = date.today().weekday()
    st      = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · POMELLI VISUAL · {today} · weekday={weekday}")
    log.info("═" * 60)

    # Load manifest
    manifest_path = POMELLI_LIBRARY_DIR / "manifest.json"
    if not manifest_path.exists():
        log.error("pomelli_library/manifest.json not found.")
        return

    try:
        with open(manifest_path) as f:
            manifest = _json.load(f)
    except (_json.JSONDecodeError, OSError) as e:
        log.error(f"pomelli_library/manifest.json corrupt or unreadable: {e}")
        return

    raw_images = manifest.get("images", [])
    if not raw_images:
        log.error("No images in pomelli_library/manifest.json.")
        return

    # Normalize manifest entries: support BOTH string (filename) and dict format.
    # Build a reverse lookup filename → campaign from the campaigns map so string
    # entries can be promoted to dicts with campaign info.
    file_to_campaign = {}
    for camp_name, files in manifest.get("campaigns", {}).items():
        for fname in files:
            file_to_campaign[fname] = camp_name

    all_images = []
    for entry in raw_images:
        if isinstance(entry, dict):
            all_images.append(entry)
        elif isinstance(entry, str):
            campaign = file_to_campaign.get(entry, "uncategorized")
            # Derive a subject from the filename: drop pomelli_ prefix, _N suffix
            subject = entry.replace("pomelli_", "").replace(".png", "")
            subject = subject.rsplit("_", 1)[0] if subject.rsplit("_", 1)[-1].isdigit() else subject
            subject = subject.replace("_", " ").title()
            all_images.append({"file": entry, "campaign": campaign, "subject": subject})

    # Verify image files actually exist
    available = []
    for img in all_images:
        img_path = POMELLI_LIBRARY_DIR / img["file"]
        if img_path.exists():
            available.append(img)
        else:
            log.warning(f"Image not found, skipping: {img['file']}")

    if not available:
        log.error("No available images in pomelli library.")
        return

    log.info(f"Library: {len(available)} images across "
             f"{len(set(i['campaign'] for i in available))} campaigns")

    # ── Pick campaign theme (oldest-unused first, cycling through all) ───
    available_camps = list(set(i["campaign"] for i in available))
    camp_items = [{"id": c} for c in POMELLI_CAMPAIGN_ORDER if c in available_camps]
    if not camp_items:
        camp_items = [{"id": c} for c in available_camps]
    camp_ordered = pick_oldest_unused(st, "pomelli_campaigns", camp_items, key="id")
    chosen_camp = camp_ordered[0]["id"]

    # ── Pick image within that campaign (oldest-unused first) ────────────
    camp_images = [i for i in available if i["campaign"] == chosen_camp]
    if not camp_images:
        # Fallback: pick from any campaign
        camp_images = available
        chosen_camp = camp_images[0]["campaign"]

    # 2026-05-17 (Tier 7 Phase 1.4): respect once-per-calendar-month rule —
    # drop images whose `destination` field is in the dedupe set. Pomelli
    # images carry a `destination` slug; falling back to filename parsing
    # if absent. If filtering empties the campaign pool, keep original
    # (better a same-campaign repeat than no post at all).
    used = recently_used_destinations(st)
    camp_images_fresh = [i for i in camp_images
                        if (i.get("destination")
                            or Path(i["file"]).stem.rsplit("_", 1)[0].replace("pomelli_", "")
                            or "") not in used]
    if camp_images_fresh:
        camp_images = camp_images_fresh
    else:
        log.info(f"pomelli_visual: all {len(camp_images)} images in '{chosen_camp}' "
                 f"cover already-posted dests — falling back to original pool")

    img_items = [{"id": img["file"], **img} for img in camp_images]
    img_ordered = pick_oldest_unused(st, "pomelli_images", img_items, key="id")
    chosen_img = img_ordered[0]

    log.info(f"Selected: [{chosen_camp}] {chosen_img.get('subject', '')} → {chosen_img['file']}")

    # Read image bytes — with on-the-fly defensive cleanup (added 2026-05-03)
    # If the source image still has a stacked text bar (>80 px charcoal bottom),
    # strip it dynamically and re-stamp the clean monogram. This is a SAFETY net
    # — the bulk regen on 2026-05-03 already cleaned the library, but any future
    # dirty PNG that lands in pomelli_library/ will be auto-cleaned at post time.
    img_path = POMELLI_LIBRARY_DIR / chosen_img["file"]
    img_bytes = _pomelli_clean_at_post_time(img_path)

    # Upload
    media_filename = f"pomelli_{chosen_camp}_{Path(chosen_img['file']).stem}.png"
    media_obj = upload_media_bytes(img_bytes, media_filename, "image/png")
    if not media_obj:
        log.error("Media upload failed.")
        return

    log.info(f"Image uploaded: {media_filename} ({len(img_bytes) // 1024} KB)")

    # Get accounts
    accounts = get_connected_accounts()
    active   = [a for a in accounts if a.get("isActive")]
    if not active:
        log.warning("No active connected accounts.")
        return

    mode_suffix = "_pomelli"
    posted_any = False

    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        # YouTube only supports video — skip image posts
        if platform == "youtube":
            log.info(f"[{label}] Skipping pomelli visual (YouTube only accepts video).")
            continue

        acc_scoped_key = acc_id + mode_suffix
        if st.get("posted_today", {}).get(acc_scoped_key) == today and not force:
            log.info(f"[{label}] Already posted pomelli visual today — skipping.")
            continue

        caption = _pomelli_caption(chosen_img, platform)
        caption = apply_platform_voice(caption, platform)
        caption = sanitize(caption)

        log.info(f"[{label}] Publishing pomelli visual: {chosen_img.get('subject', '')}...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish:\n{caption[:300]}...")
            posted_any = True
            continue

        pomelli_campaign = chosen_img.get("campaign") or chosen_img.get("subject", "")
        result = publish_feed_post(
            caption, account, media_obj, dry_run=False,
            fmt="pomelli_visual",
            media_id=chosen_img.get("file"),
            utm_content=build_utm_content(pomelli_campaign.replace(" ", "-").lower() or None, "pomelli_visual"),
        )
        if result:
            log.info(f"[{label}] Pomelli visual posted successfully!")
            _mark_posted_today(st, acc_scoped_key)
            posted_any = True
            record_publish(
                st,
                dest_id=chosen_img.get("destination") or None,
                fmt="pomelli_visual",
                post_id=(result.get("post") or {}).get("id"),
                platform=platform,
                media_id=chosen_img.get("file"),
            )
        else:
            log.warning(f"[{label}] Pomelli visual post failed.")

    # Mark campaign + image as used
    if posted_any:
        mark_theme_used(st, "pomelli_campaigns", chosen_camp)
        mark_theme_used(st, "pomelli_images", chosen_img["file"])
        log.info(f"Theme tracker updated: campaign={chosen_camp} / img={chosen_img['file']}")

    save_state(st)
    log.info("State saved. Pomelli Visual run complete.")
    log.info("═" * 60)


def run_pomelli_visual(force: bool = False, dry_run: bool = False):
    """Entry point for pomelli visual mode with its own lock file."""
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    global LOCK_FILE
    original_lock = LOCK_FILE
    LOCK_FILE = POMELLI_LOCK_FILE

    try:
        if not dry_run and not _acquire_lock(force=force):
            sys.exit(0)
        try:
            _run_pomelli_visual(force=force, dry_run=dry_run)
        finally:
            if not dry_run:
                _release_lock()
    finally:
        LOCK_FILE = original_lock


# ─────────────────────────────────────────────────────────────────────────────
# FLOW STORY MODE — posts AI-generated destination visuals from Flow library
# ─────────────────────────────────────────────────────────────────────────────

FLOW_STORIES_DIR    = Path(__file__).parent / "flow_stories_library"
FLOW_STORY_LOCK_FILE = Path(__file__).parent / ".autoposter-flow-story.lock"

# Caption templates — destination-specific, no generic fluff
FLOW_STORY_CAPTIONS_IG_SCORED = [
    (
        "{dest}, {state} — {score_display} this month\n\n"
        "{score_note}\n\n"
        "NakshIQ scores {total} Indian destinations monthly.\n"
        "→ {dest_url}\n\n"
        "{hashtags}"
    ),
    (
        "{dest} · NakshIQ Score: {score_display}\n\n"
        "{score_note}\n\n"
        "{total} destinations. 5 dimensions. Updated monthly.\n"
        "→ {dest_url}\n\n"
        "{hashtags}"
    ),
]

FLOW_STORY_CAPTIONS_IG_UNSCORED = [
    (
        "{dest}, {state}\n\n"
        "NakshIQ rates {total} Indian destinations monthly.\n"
        "When to go, what to skip, what nobody tells you.\n\n"
        "→ {dest_url}\n\n"
        "{hashtags}"
    ),
    (
        "{dest}\n\n"
        "Every destination has a best month and a worst month.\n"
        "We score both — no ads, no sponsorships, just data.\n\n"
        "→ {dest_url}\n\n"
        "{hashtags}"
    ),
]

FLOW_STORY_CAPTIONS_FB_SCORED = [
    (
        "{dest}, {state} — {score_display} this month\n\n"
        "{score_note}\n\n"
        "We score {total} destinations monthly so you don't have to guess.\n"
        "→ {dest_url}"
    ),
]

FLOW_STORY_CAPTIONS_FB_UNSCORED = [
    (
        "{dest}, {state}\n\n"
        "Have you been? When did you go — and would you time it differently?\n\n"
        "We score {total} destinations monthly so you don't have to guess.\n"
        "→ {dest_url}"
    ),
    (
        "{dest}\n\n"
        "Most travel advice is recycled. Ours is scored.\n"
        "{total} destinations, updated monthly, zero sponsorships.\n\n"
        "→ {dest_url}"
    ),
]

# Score-context notes for the 1-5 raw scale (kept here; mapping is internal).
FLOW_STORY_SCORE_NOTES = {
    5: "Peak season — ideal weather, festivals, and accessibility.",
    4: "Great time to visit. Slightly off-peak but that's often better.",
    3: "Decent conditions. Do your research on specific dates.",
    2: "Not the best month. Expect compromises.",
    1: "Avoid unless you have a specific reason.",
}

# Fallback for generic images (no dest).  IG hashtag block intentionally avoids
# generic broad tags that _sanitize_caption strips (#travel/#india/#wanderlust).
FLOW_STORY_GENERIC_IG = (
    "India has {total} destinations worth scoring.\n\n"
    "Weather. Crowds. Safety. Infrastructure. Cultural access.\n"
    "We rate them all — every month.\n\n"
    "→ nakshiq.com?utm_source=ig&utm_medium=post&utm_campaign=flow-story\n\n"
    "{hashtags}"
)

FLOW_STORY_GENERIC_FB = (
    "{total} Indian destinations. 5 scoring dimensions. Updated monthly.\n\n"
    "Which one are you checking first?\n"
    "→ nakshiq.com"
)


def _flow_story_hashtags(dest: str, state: str, platform: str = "instagram") -> str:
    """Generate hashtags for a Flow story post.

    Tier 1 (2026-05-10): IG → ~18 niche/branded tags via shared pool; FB keeps
    the legacy 5-tag block.
    """
    if platform == "instagram":
        # Strip parenthetical clarifiers from dest before hashtag-ifying.
        bare_dest = dest.split("(")[0].strip() if dest else None
        return _build_ig_hashtags(
            dest_name=bare_dest,
            state_name=state,
            category="flow_story",
        )
    tags = ["#NakshIQ"]
    if dest:
        clean = dest.split("(")[0].strip().replace(" ", "").replace("-", "").replace("&", "And")
        tags.append(f"#{clean}")
        tags.append(f"#{clean}Travel")
    if state:
        clean_state = state.replace(" ", "").replace("&", "And")
        if f"#{clean_state}" not in tags:
            tags.append(f"#{clean_state}")
    tags.append("#IndiaTravel")
    return " ".join(tags[:5])


def _flow_story_resolve_dest_id(name: str, lookup: dict) -> str | None:
    """Resolve a flow-story display name (e.g. 'Valley of Flowers', 'Andaman & Nicobar')
    to the real Supabase destination id used in /en/destination/<id> URLs.

    Returns None when no match — caller must fall back to homepage to avoid 404s.
    """
    if not name or not lookup:
        return None
    if name in lookup:
        return lookup[name]
    if name.lower() in lookup:
        return lookup[name.lower()]
    # Strip parenthetical clarifiers: "Spiti Valley (Kaza Region)" → "Spiti Valley"
    bare = name.split("(")[0].strip()
    if bare and bare.lower() in lookup:
        return lookup[bare.lower()]
    # Last-ditch: normalise to slug-form and try again ("Andaman & Nicobar" → "andaman-nicobar")
    slug_form = (
        bare.lower()
        .replace(" & ", "-")
        .replace("&", "and")
        .replace(",", "")
        .replace(" ", "-")
    )
    return lookup.get(slug_form)


def _flow_story_caption(entry: dict, platform: str, dest_id_lookup: dict | None = None) -> str:
    """Generate a caption for a Flow story image. Uses score when available.

    `dest_id_lookup` maps name (and lowercase variants + slug-form) → real DB id.
    Without it, every URL falls back to the homepage to avoid 404s.
    """
    import random as _random

    dest  = entry.get("dest")
    state = entry.get("state")
    score = entry.get("_score")  # injected by seasonal picker
    uncertain = entry.get("uncertain", False)  # manual flag for image-dest mismatch

    # CHANGED 2026-05-03: STATE_SHOWCASE / EDITORIAL entries are themed, not
    # destination-specific. Treat them as generic to prevent mis-attributing
    # a specific destination caption to an editorial-style image. Also respects
    # any image manually flagged as `uncertain` per the visual-audit feedback
    # in memory: feedback_flow_image_caption_match.md.
    is_themed = state in ("STATE_SHOWCASE", "EDITORIAL", "GENERIC", None, "")
    if not dest or dest == state or is_themed or uncertain:
        # Generic / state-level / unverified image
        if platform == "facebook":
            return FLOW_STORY_GENERIC_FB.format(total=TOTAL_DESTINATIONS)
        # IG path — pull a 18-tag hashtag block (no dest/state to specialise).
        ig_hashtags = _build_ig_hashtags(category="flow_story")
        caption = FLOW_STORY_GENERIC_IG.format(total=TOTAL_DESTINATIONS, hashtags=ig_hashtags)
        caption = _strip_url_for_ig(caption, platform)
        caption = _add_ig_engagement_cta(caption, platform, "flow_story")
        return caption

    # Resolve real DB id (was: lossy `dest.lower().split("-")[0]` which 404'd on
    # any multi-word destination — e.g. "Valley of Flowers" → "valley" → 404).
    dest_id = _flow_story_resolve_dest_id(dest, dest_id_lookup or {})
    utm_source = "fb" if platform == "facebook" else "ig"
    if dest_id:
        dest_url_str = utm(
            f"https://nakshiq.com/en/destination/{dest_id}",
            utm_source, "post", "flow-story",
        )
    else:
        # No DB match — link to homepage instead of generating a 404. This is
        # the failure mode that drove user-reported "random 404s" on flow-story
        # posts. Healthcheck (Tier 2) will eventually replace this with hard skip.
        log.warning(f"[flow-story] No dest_id match for '{dest}' — linking to homepage")
        dest_url_str = utm("https://nakshiq.com/en", utm_source, "post", "flow-story")

    hashtags = _flow_story_hashtags(dest, state, platform)

    if score and score > 0:
        score_note = FLOW_STORY_SCORE_NOTES.get(score, "")
        if platform == "facebook":
            template = _random.choice(FLOW_STORY_CAPTIONS_FB_SCORED)
        else:
            template = _random.choice(FLOW_STORY_CAPTIONS_IG_SCORED)
        caption = template.format(
            dest=dest,
            state=state or "India",
            dest_url=dest_url_str,
            score=score,
            score_display=format_score(score),
            score_note=score_note,
            total=TOTAL_DESTINATIONS,
            hashtags=hashtags,
        )
    else:
        if platform == "facebook":
            template = _random.choice(FLOW_STORY_CAPTIONS_FB_UNSCORED)
        else:
            template = _random.choice(FLOW_STORY_CAPTIONS_IG_UNSCORED)
        caption = template.format(
            dest=dest,
            state=state or "India",
            dest_url=dest_url_str,
            total=TOTAL_DESTINATIONS,
            hashtags=hashtags,
        )
    # Tier 1.3 + 1.5: IG → strip URL + saves-bait CTA.
    caption = _strip_url_for_ig(caption, platform)
    caption = _add_ig_engagement_cta(caption, platform, "flow_story")
    return caption


def _run_flow_story(force: bool = False, dry_run: bool = False):
    """
    Flow Story mode — posts AI-generated destination visuals from flow_stories_library/.
    956 images across 410 destinations, generated via Google Flow (Nano Banana 2).
    Rotates through dest-matched images first, then generic ones.
    """
    import json as _json

    today   = date.today().isoformat()
    weekday = date.today().weekday()
    st      = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · FLOW STORY · {today} · weekday={weekday}")
    log.info("═" * 60)

    # Load manifest
    manifest_path = FLOW_STORIES_DIR / "manifest.json"
    if not manifest_path.exists():
        log.error("flow_stories_library/manifest.json not found.")
        return

    try:
        with open(manifest_path) as f:
            manifest = _json.load(f)
    except (_json.JSONDecodeError, OSError) as e:
        log.error(f"flow_stories_library/manifest.json corrupt or unreadable: {e}")
        return

    if not manifest:
        log.error("Empty manifest in flow_stories_library.")
        return

    # Verify image files exist
    available = []
    for entry in manifest:
        img_path = FLOW_STORIES_DIR / entry["file"]
        if img_path.exists():
            available.append(entry)

    if not available:
        log.error("No available images in flow stories library.")
        return

    # Prefer dest-matched images over generic ones
    with_dest = [e for e in available if e.get("dest")]
    generic   = [e for e in available if not e.get("dest")]

    log.info(f"Library: {len(available)} images ({len(with_dest)} dest-matched, "
             f"{len(generic)} generic)")

    # ── Seasonal-smart picking ───────────────────────────────────────────
    # Fetch current month's scores from Supabase so we post destinations
    # that are actually relevant right now (hill stations in summer,
    # Rajasthan in winter, etc.)
    month = datetime.now().month
    score_lookup   = {}  # dest_name → score (1-5)
    dest_id_lookup = {}  # dest_name (+ lowercase + slug-form variants) → DB id
    try:
        # Fetch ALL destinations with scores (min_score=0, limit=500)
        scored = nakshiq_fetch("destinations", {"month": month, "min_score": 0, "limit": 500})
        scored_data = scored.get("data", [])
        for d in scored_data:
            name = d.get("name", "")
            d_id = d.get("id")
            score_lookup[name] = d.get("score", 0)
            # Also index by lowercase for fuzzy matching
            score_lookup[name.lower()] = d.get("score", 0)
            # Build name-variant → id lookup so flow-story captions can resolve
            # 'Valley of Flowers' → 'valley-of-flowers' instead of truncating to 'valley'
            if d_id:
                dest_id_lookup[name] = d_id
                dest_id_lookup[name.lower()] = d_id
                dest_id_lookup[d_id] = d_id  # idempotent
        log.info(f"Seasonal scores loaded: {len(scored_data)} destinations for month {month}")
    except Exception as e:
        log.warning(f"Could not fetch seasonal scores: {e} — falling back to round-robin")

    def _seasonal_score(entry):
        """Return score for sorting: higher = post sooner. 5→post first, 0→last."""
        dest = entry.get("dest", "")
        if not dest:
            return -1  # generic images last
        # Try exact match, then lowercase
        s = score_lookup.get(dest) or score_lookup.get(dest.lower()) or 0
        return s

    # 2026-05-17 (Tier 7 Phase 1.4): drop entries whose dest is already posted
    # this month BEFORE tiering. Without this, flow_story could pick a dest
    # the main loop already covered.
    used = recently_used_destinations(st)
    pre_dedupe = len(with_dest)
    with_dest = [e for e in with_dest if (e.get("dest")
                                          or dest_id_lookup.get(e.get("dest_name", ""))
                                          or "") not in used
                                       and (dest_id_lookup.get(e.get("dest", ""))
                                            or "") not in used]
    if pre_dedupe != len(with_dest):
        log.info(f"flow_story: filtered {pre_dedupe} → {len(with_dest)} after once-per-month dedupe")
    if not with_dest:
        log.info("flow_story: all dest-matched images already covered this month — SKIPPING")
        return

    # Sort dest-matched pool: high-scoring destinations first, then by name for stability
    # Within each score tier, pick_oldest_unused still handles anti-repetition
    if score_lookup and with_dest:
        # Bucket into tiers: 5, 4, 3, 2, 1, 0/unscored
        tier_5 = [e for e in with_dest if _seasonal_score(e) >= 5]
        tier_4 = [e for e in with_dest if _seasonal_score(e) == 4]
        tier_3 = [e for e in with_dest if _seasonal_score(e) == 3]
        tier_low = [e for e in with_dest if 0 < _seasonal_score(e) < 3]
        tier_unscored = [e for e in with_dest if _seasonal_score(e) <= 0]

        log.info(f"Seasonal tiers: 5★={len(tier_5)} · 4★={len(tier_4)} · "
                 f"3★={len(tier_3)} · low={len(tier_low)} · unscored={len(tier_unscored)}")

        # Pick from highest available tier (oldest-unused within that tier)
        pool = None
        for tier_name, tier in [("5★", tier_5), ("4★", tier_4), ("3★", tier_3),
                                 ("low", tier_low), ("unscored", tier_unscored)]:
            if not tier:
                continue
            items = [{"id": e["file"], **e} for e in tier]
            ordered = pick_oldest_unused(st, "flow_story_images", items, key="id")
            # Check if top pick is actually unused (not just least-recently-used)
            top = ordered[0]
            used_list = st.get("theme_history", {}).get("flow_story_images", [])
            if top["id"] not in used_list:
                pool = tier
                log.info(f"Picking from {tier_name} tier (has unused images)")
                break
        # If all tiers exhausted, fall back to full pool (round-robin restarts)
        if pool is None:
            pool = with_dest
            log.info("All seasonal tiers cycled — using full dest pool")
    else:
        pool = with_dest if with_dest else generic

    img_items = [{"id": e["file"], **e} for e in pool]
    img_ordered = pick_oldest_unused(st, "flow_story_images", img_items, key="id")
    chosen = img_ordered[0]

    # Enhance caption with score if available
    chosen_score = _seasonal_score(chosen)
    if chosen_score > 0:
        chosen["_score"] = chosen_score
        log.info(f"Seasonal score: raw={chosen_score} → {format_score(chosen_score)} for {chosen.get('dest')}")

    log.info(f"Selected: {chosen['file']} → {chosen.get('dest', 'generic')} "
             f"({chosen.get('state', '?')})")

    # Read image bytes
    img_path = FLOW_STORIES_DIR / chosen["file"]
    img_bytes = img_path.read_bytes()

    # Upload
    media_filename = f"flow_story_{Path(chosen['file']).stem}.jpg"
    media_obj = upload_media_bytes(img_bytes, media_filename, "image/jpeg")
    if not media_obj:
        log.error("Media upload failed.")
        return

    log.info(f"Image uploaded: {media_filename} ({len(img_bytes) // 1024} KB)")

    # Get accounts
    accounts = get_connected_accounts()
    active   = [a for a in accounts if a.get("isActive")]
    if not active:
        log.warning("No active connected accounts.")
        return

    mode_suffix = "_flow_story"
    posted_any  = False

    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        # YouTube only supports video — skip image posts
        if platform == "youtube":
            log.info(f"[{label}] Skipping flow story (YouTube only accepts video).")
            continue

        acc_scoped_key = acc_id + mode_suffix
        if st.get("posted_today", {}).get(acc_scoped_key) == today and not force:
            log.info(f"[{label}] Already posted flow story today — skipping.")
            continue

        caption = _flow_story_caption(chosen, platform, dest_id_lookup=dest_id_lookup)
        caption = apply_platform_voice(caption, platform)
        caption = sanitize(caption)

        log.info(f"[{label}] Publishing flow story: "
                 f"{chosen.get('dest', 'generic')}...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish:\n{caption[:300]}...")
            posted_any = True
            continue

        # Resolve real DB id for utm_content (matches the URL fix in commit 5cc9386f)
        flow_dest_id = _flow_story_resolve_dest_id(chosen.get("dest"), dest_id_lookup or {})
        result = publish_feed_post(
            caption, account, media_obj, dry_run=False,
            fmt="flow_story",
            dest_id=flow_dest_id,
            media_id=chosen.get("file"),
            utm_content=build_utm_content(flow_dest_id, "flow_story"),
        )
        if result:
            log.info(f"[{label}] Flow story posted successfully!")
            _mark_posted_today(st, acc_scoped_key)
            posted_any = True
            record_publish(
                st,
                dest_id=flow_dest_id,
                fmt="flow_story",
                post_id=(result.get("post") or {}).get("id"),
                platform=platform,
                media_id=chosen.get("file"),
            )
        else:
            log.warning(f"[{label}] Flow story post failed.")

    # Mark image as used
    if posted_any:
        mark_theme_used(st, "flow_story_images", chosen["file"])
        log.info(f"Theme tracker updated: flow_story_images={chosen['file']}")

    save_state(st)
    log.info("State saved. Flow Story run complete.")
    log.info("═" * 60)


def run_flow_story(force: bool = False, dry_run: bool = False):
    """Entry point for flow story mode with its own lock file."""
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    global LOCK_FILE
    original_lock = LOCK_FILE
    LOCK_FILE = FLOW_STORY_LOCK_FILE

    try:
        if not dry_run and not _acquire_lock(force=force):
            sys.exit(0)
        try:
            _run_flow_story(force=force, dry_run=dry_run)
        finally:
            if not dry_run:
                _release_lock()
    finally:
        LOCK_FILE = original_lock


# ─────────────────────────────────────────────────────────────────────────────
# REEL MODE — programmatic short-form vertical video
# ─────────────────────────────────────────────────────────────────────────────

REEL_LOCK_FILE = Path(__file__).parent / ".autoposter-reel.lock"

REEL_FORMATS = ["score_reveal", "contrarian", "seasonal_shift", "trap_alert", "destination_reveal", "hidden_gem_callout"]

# Captions per reel format
REEL_CAPTION_TEMPLATES = {
    "score_reveal": (
        "🎯 Do NOT go to {dest} in {month}.\n\n"
        "NakshIQ Score: {score_display}\n"
        "{reason}\n\n"
        "{total} destinations. Real-time travel scores.\n"
        "→ https://nakshiq.com?utm_source=social&utm_medium=reel&utm_campaign=reel\n\n"
        "—\n"
        "Data, not opinions.\n\n"
        "{hashtags}"
    ),
    "contrarian": (
        "💡 Everyone goes to {famous}. Smart travelers go to {hidden}.\n\n"
        "{famous}: {famous_score_display}\n"
        "{hidden}: {hidden_score_display}\n\n"
        "Same region. Less crowd. Better value.\n"
        "→ https://nakshiq.com?utm_source=social&utm_medium=reel&utm_campaign=reel\n\n"
        "—\n"
        "Travel with IQ.\n\n"
        "{hashtags}"
    ),
    "seasonal_shift": (
        "⏰ {dest} is a {now_score_display} right now.\n"
        "In {future_month}? {future_score_display}.\n\n"
        "Timing is everything.\n"
        "{total} destinations scored for every month.\n"
        "→ https://nakshiq.com?utm_source=social&utm_medium=reel&utm_campaign=reel\n\n"
        "—\n"
        "Data, not opinions.\n\n"
        "{hashtags}"
    ),
    "trap_alert": (
        "⚠️ TOURIST TRAP: {trap}\n\n"
        "{reason}\n"
        "Do this instead: {alternative}\n\n"
        "NakshIQ flags traps so you don't waste money.\n"
        "→ https://nakshiq.com?utm_source=social&utm_medium=reel&utm_campaign=reel\n\n"
        "—\n"
        "Travel with IQ.\n\n"
        "{hashtags}"
    ),
    "destination_reveal": (
        "📍 Discover {dest}, {state}\n\n"
        "NakshIQ Score: {score_display}\n"
        "{tagline}\n\n"
        "{total} destinations. Real scores. Zero fluff.\n"
        "→ https://nakshiq.com?utm_source=social&utm_medium=reel&utm_campaign=reel\n\n"
        "—\n"
        "Travel with IQ.\n\n"
        "{hashtags}"
    ),
    # Tier 6 (2026-05-10): hidden gem narrative — flips the algorithmic
    # underdog_spotlight angle into a "you've never heard of this" hook.
    # Pulls from /api/content?type=hidden_gems (confidence_score>=0.7).
    "hidden_gem_callout": (
        "🤫 Nobody talks about {dest}.\n\n"
        "{near_dest_label}{distance_label}\n"
        "{why_unknown}\n\n"
        "Why go: {why_go}\n\n"
        "{total} destinations scored. This one shouldn't be a secret.\n"
        "→ https://nakshiq.com?utm_source=social&utm_medium=reel&utm_campaign=hidden-gem\n\n"
        "—\n"
        "Real data. Honest scoring.\n\n"
        "{hashtags}"
    ),
}


def _reel_hashtags(dest_name: str, platform: str, state_name: str | None = None) -> str:
    """Build reel-specific hashtags.

    Tier 1 (2026-05-10): platform-aware sizing.  IG = ~18 niche/branded tags
    via _build_ig_hashtags (raises discoverability ~3x).  YT/FB still cap at 5
    since beyond that there's no measurable ranking benefit on those platforms.
    """
    if platform == "instagram":
        return _build_ig_hashtags(
            dest_name=dest_name,
            state_name=state_name,
            category="reel",
        )
    # YT / FB: keep the legacy 5-tag block.
    base: list[str] = []
    if dest_name:
        clean = dest_name.replace(" ", "").replace("-", "")
        base.append(clean)
    base.extend(["TravelReels", f"{month_name()}Travel", "NakshIQ"])
    if platform == "youtube":
        base.append("Shorts")
    else:
        base.append("ReelsIndia")
    return " ".join(f"#{h}" for h in base[:5])


def _reel_caption(reel_format: str, data: dict, platform: str) -> str:
    """Generate caption for a reel post."""
    template = REEL_CAPTION_TEMPLATES.get(reel_format, REEL_CAPTION_TEMPLATES["score_reveal"])
    dest_name = data.get("dest_name") or data.get("famous") or data.get("trap_name") or "India"
    state_name = data.get("state_name") or data.get("state") or None
    hashtags = _reel_hashtags(dest_name, platform, state_name)

    try:
        caption = template.format(
            dest=data.get("dest_name", ""),
            month=data.get("month", ""),
            score=data.get("score", ""),
            score_display=format_score(data.get("score")),
            reason=data.get("reason", ""),
            famous=data.get("famous", ""),
            hidden=data.get("hidden", ""),
            famous_score=data.get("famous_score", ""),
            famous_score_display=format_score(data.get("famous_score")),
            hidden_score=data.get("hidden_score", ""),
            hidden_score_display=format_score(data.get("hidden_score")),
            now_score=data.get("now_score", ""),
            now_score_display=format_score(data.get("now_score")),
            future_month=data.get("future_month", ""),
            future_score=data.get("future_score", ""),
            future_score_display=format_score(data.get("future_score")),
            trap=data.get("trap_name", ""),
            alternative=data.get("alternative", ""),
            state=data.get("state_name", "India"),
            tagline=data.get("tagline", ""),
            # hidden_gem_callout fields (Tier 6)
            near_dest_label=(f"📍 Near {data.get('near_dest_name', '')}" if data.get("near_dest_name") else ""),
            distance_label=(f" · {data.get('distance_km', '')}km away\n" if data.get("distance_km") else "\n"),
            why_unknown=data.get("why_unknown", ""),
            why_go=data.get("why_go", ""),
            total=TOTAL_DESTINATIONS,
            hashtags=hashtags,
        )
    except KeyError:
        caption = (f"🎯 Travel smarter. {dest_name} on NakshIQ.\n\n"
                   f"→ https://nakshiq.com?utm_source=social&utm_medium=reel&utm_campaign=reel\n\n"
                   f"{hashtags}")
    # Tier 1.3 + 1.5: strip IG URL → link in bio + add saves-bait CTA.
    caption = _strip_url_for_ig(caption, platform)
    caption = _add_ig_engagement_cta(caption, platform, "reel")
    return caption


def _pick_reel_data(state: dict, content: dict, reel_format: str) -> dict | None:
    """Pick destination data for a reel format from synced content.

    2026-05-16: once-per-calendar-month rule applies to ALL 6 reel formats.
    Computes `used` set once at top, every sub-format's candidate pool is
    filtered to exclude dests already posted this month BEFORE
    pick_oldest_unused. Returns None if filtering empties the pool —
    caller MUST skip (no silent fallback).
    """
    import calendar
    from datetime import datetime as _dt
    month_now  = _dt.now().month
    month_name = calendar.month_name[month_now]

    # Once-per-month dedupe — apply to every reel format below.
    used = recently_used_destinations(state)

    destinations = content.get("destinations", {}).get("data", [])
    destinations_low = content.get("destinations_low", {}).get("data", [])
    traps = content.get("traps", {}).get("data", [])

    if reel_format == "score_reveal":
        # Pick a LOW-scored destination (≤3) — the "don't go" hook only works
        # when the score genuinely warrants a warning. Skip if nothing qualifies.
        low_scored = [d for d in destinations_low
                      if isinstance(d.get("score"), (int, float)) and d["score"] <= 3
                      and d.get("id") not in used]
        if not low_scored:
            return None
        ordered = pick_oldest_unused(state, "reel_score_dests",
                                     [{"id": d.get("id", d.get("name", "")), **d}
                                      for d in low_scored], key="id")
        d = ordered[0]
        return {
            "dest_name": d.get("name", "Unknown"),
            "dest_slug": d.get("id", d.get("name", "india")),
            "month": month_name,
            "score": int(d.get("score", 2)),
            "reason": d.get("note") or d.get("tagline") or "Check nakshiq.com for the full breakdown",
        }

    elif reel_format == "contrarian":
        # Pair a famous (popular but low-ish score) with a hidden gem (high score)
        # Both dests filtered against once-per-month set.
        high = [d for d in destinations
                if isinstance(d.get("score"), (int, float)) and d["score"] >= 4
                and d.get("id") not in used]
        low  = [d for d in destinations_low
                if isinstance(d.get("score"), (int, float)) and d["score"] <= 3
                and d.get("id") not in used]
        if not high or not low:
            return None
        h_ordered = pick_oldest_unused(state, "reel_contrarian_hidden",
                                       [{"id": d.get("id", d.get("name", "")), **d}
                                        for d in high], key="id")
        l_ordered = pick_oldest_unused(state, "reel_contrarian_famous",
                                       [{"id": d.get("id", d.get("name", "")), **d}
                                        for d in low], key="id")
        return {
            "famous": l_ordered[0].get("name", "Popular Place"),
            "hidden": h_ordered[0].get("name", "Hidden Gem"),
            "famous_score": int(l_ordered[0].get("score", 3)),
            "hidden_score": int(h_ordered[0].get("score", 5)),
            "dest_slug": h_ordered[0].get("id", "hidden"),
        }

    elif reel_format == "seasonal_shift":
        # Show a destination great now but bad in ~3 months
        future_month_num = ((month_now - 1 + 3) % 12) + 1
        future_month_name = calendar.month_name[future_month_num]

        # Use top-scored destinations and assume score drops in off-season
        great_now = [d for d in destinations
                     if isinstance(d.get("score"), (int, float)) and d["score"] >= 4
                     and d.get("id") not in used]
        if not great_now:
            return None
        ordered = pick_oldest_unused(state, "reel_seasonal_dests",
                                     [{"id": d.get("id", d.get("name", "")), **d}
                                      for d in great_now], key="id")
        d = ordered[0]
        # For the future score, check if the API provided month-specific scores
        # Otherwise estimate a dramatic drop for visual impact
        future_score = d.get(f"score_m{future_month_num}")
        if not isinstance(future_score, (int, float)):
            # Conservative estimate: 5→2, 4→2 for dramatic effect
            future_score = max(1, int(d["score"]) - 3)
        return {
            "dest_name": d.get("name", "Unknown"),
            "dest_slug": d.get("id", d.get("name", "india")),
            "now_month": month_name,
            "now_score": int(d.get("score", 5)),
            "future_month": future_month_name,
            "future_score": int(future_score),
        }

    elif reel_format == "trap_alert":
        # Trap home dest filtered against once-per-month set.
        traps_fresh = [t for t in traps if t.get("destination_id") not in used]
        if not traps_fresh:
            return None
        ordered = pick_oldest_unused(state, "reel_trap_alerts",
                                     [{"id": t.get("id", t.get("name", "")), **t}
                                      for t in traps_fresh], key="id")
        t = ordered[0]
        return {
            "trap_name": t.get("name") or t.get("title", "Common Tourist Trap"),
            "alternative": t.get("alternative") or t.get("tip") or "Ask locals",
            "reason": t.get("reason") or t.get("why") or "Overpriced and overcrowded",
            "dest_slug": t.get("destination_id") or t.get("destination", "india"),
        }

    elif reel_format == "destination_reveal":
        # Pick a HIGH-scored destination that has a branded image
        try:
            from social_image_picker import has_social_image
        except ImportError:
            return None
        high_scored = [d for d in destinations
                       if isinstance(d.get("score"), (int, float))
                       and d["score"] >= 4
                       and has_social_image(d.get("name", ""))
                       and d.get("id") not in used]
        if not high_scored:
            # Fallback: any destination with a branded image, still filtered
            # against once-per-month set.
            high_scored = [d for d in destinations
                          if has_social_image(d.get("name", ""))
                          and d.get("id") not in used]
        if not high_scored:
            return None
        ordered = pick_oldest_unused(state, "reel_reveal_dests",
                                     [{"id": d.get("id", d.get("name", "")), **d}
                                      for d in high_scored], key="id")
        d = ordered[0]
        return {
            "dest_name": d.get("name", "Unknown"),
            "dest_slug": d.get("id", d.get("name", "india")),
            "state_name": d.get("state", ""),
            "score": int(d.get("score", 4)),
            "tagline": d.get("tagline") or d.get("note") or "",
        }

    elif reel_format == "hidden_gem_callout":
        # Tier 6 (2026-05-10) — pulls from /api/content?type=hidden_gems.
        # Differs from underdog_spotlight (algorithmic high-score + low-elev): this
        # uses verified hidden_gems table records with confidence_score>=0.7 +
        # has why_unknown / why_go prose for the narrative hook.
        gems = content.get("hidden_gems", {}).get("data", []) or []
        # Hidden gems link to near_destination_id (their parent dest); filter
        # against the once-per-month set on that key.
        gems_fresh = [g for g in gems if g.get("near_destination_id") not in used]
        if not gems_fresh:
            return None
        ordered = pick_oldest_unused(state, "reel_hidden_gems",
                                     [{"id": g.get("id", g.get("name", "")), **g}
                                      for g in gems_fresh], key="id")
        g = ordered[0]
        return {
            "dest_name": g.get("name", "Unknown"),
            "dest_slug": g.get("near_destination_id", "india"),
            "state_name": g.get("state", ""),
            "near_dest_name": g.get("near_destination_name", ""),
            "distance_km": g.get("distance_km", ""),
            "why_unknown": g.get("why_unknown", ""),
            "why_go": g.get("why_go", ""),
        }

    return None


def _run_reel(force: bool = False, dry_run: bool = False):
    """
    Reel mode — generates and posts a short-form vertical video.
    Rotates through 5 reel formats with anti-repetition.
    """
    import tempfile
    from reel_gen import render_reel

    today   = date.today().isoformat()
    weekday = date.today().weekday()
    st      = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · REEL · {today} · weekday={weekday}")
    log.info("═" * 60)

    # Sync content for reel data
    content = sync_all_content()

    # ── Pick reel format (oldest-unused rotation) ──────────────────────────
    fmt_items = [{"id": f} for f in REEL_FORMATS]
    fmt_ordered = pick_oldest_unused(st, "reel_formats", fmt_items, key="id")

    reel_data = None
    chosen_format = None

    # Try each format in order until we find one with available data
    for fmt_item in fmt_ordered:
        fmt_id = fmt_item["id"]
        data = _pick_reel_data(st, content, fmt_id)
        if data:
            reel_data = data
            chosen_format = fmt_id
            break

    if not reel_data or not chosen_format:
        log.warning("No suitable reel data available for any format.")
        save_state(st)
        return

    log.info(f"Format: {chosen_format} | Data: {reel_data}")

    # ── Render video ─────────────────────────────────────────────────────
    with tempfile.TemporaryDirectory(prefix="nakshiq_reel_") as td:
        out_dir = Path(td)
        video_path = render_reel(chosen_format, reel_data, out_dir)

        if not video_path or not video_path.exists():
            log.error("Reel rendering failed.")
            save_state(st)
            return

        video_bytes = video_path.read_bytes()
        video_size_kb = len(video_bytes) // 1024
        log.info(f"Reel rendered: {video_path.name} ({video_size_kb} KB)")

        # ── Upload ────────────────────────────────────────────────────────
        media_filename = f"reel_{chosen_format}_{video_path.stem}.mp4"
        media_obj = upload_media_bytes(video_bytes, media_filename, "video/mp4")
        if not media_obj:
            log.error("Reel video upload failed.")
            save_state(st)
            return

        log.info(f"Video uploaded: {media_filename}")

    # ── Publish to all platforms ────────────────────────────────────────
    accounts = get_connected_accounts()
    active   = [a for a in accounts if a.get("isActive")]
    if not active:
        log.warning("No active connected accounts.")
        save_state(st)
        return

    mode_suffix = "_reel"
    posted_any = False

    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        acc_scoped_key = acc_id + mode_suffix
        if st.get("posted_today", {}).get(acc_scoped_key) == today and not force:
            log.info(f"[{label}] Already posted reel today — skipping.")
            continue

        caption = _reel_caption(chosen_format, reel_data, platform)
        caption = apply_platform_voice(caption, "reels")
        caption = sanitize(caption)

        log.info(f"[{label}] Publishing reel ({chosen_format})...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish:\n{caption[:200]}...")
            posted_any = True
            continue

        result = publish_reel(caption, account, media_obj, dry_run=False)
        if not result:
            log.warning(f"[{label}] Reel post failed (API rejected).")
            continue

        post_id = result.get("post", {}).get("id", "unknown")
        log.info(f"[{label}] Outstand accepted (post_id={post_id}), confirming...")

        confirmed = wait_for_publish(post_id) if post_id != "unknown" else None
        reel_dest_id = (
            reel_data.get("dest_id")
            or reel_data.get("dest_slug")
            or reel_data.get("hidden")
            or reel_data.get("trap_name")
            or None
        )
        cta_url = _extract_caption_url(caption)
        utm_content = build_utm_content(reel_dest_id, f"reel.{chosen_format}")
        if confirmed:
            platform_id = confirmed.get("platformPostId", "—")
            log.info(f"[{label}] ✅ Reel published · Outstand={post_id} · Platform={platform_id}")
            _mark_posted_today(st, acc_scoped_key)
            posted_any = True
            record_publish(
                st,
                dest_id=reel_dest_id,
                fmt=f"reel.{chosen_format}",
                post_id=post_id,
                platform=platform,
                media_id=media_filename,
            )
            _log_post_outcome(
                post_id=post_id, dest_id=reel_dest_id,
                fmt=f"reel.{chosen_format}", media_id=media_filename,
                account=account, caption=caption,
                cta_url=cta_url, utm_content=utm_content,
                status="published",
            )
        else:
            log.warning(f"[{label}] ⚠️  Reel queued but NOT confirmed (post_id={post_id}).")
            # 2026-05-17 (Tier 7 Phase 1.2): also write to post_log on
            # queued_unconfirmed so an in-flight reel BLOCKS subsequent flows
            # from picking the same dest while Outstand processes async.
            # Without this, a parallel main-loop run could pick Pahalgam
            # while the reel is mid-flight and we'd get same-day duplicates.
            record_publish(
                st,
                dest_id=reel_dest_id,
                fmt=f"reel.{chosen_format}",
                post_id=post_id,
                platform=platform,
                media_id=media_filename,
            )
            _log_post_outcome(
                post_id=post_id, dest_id=reel_dest_id,
                fmt=f"reel.{chosen_format}", media_id=media_filename,
                account=account, caption=caption,
                cta_url=cta_url, utm_content=utm_content,
                status="queued_unconfirmed",
            )

    # Mark format + data as used
    if posted_any:
        mark_theme_used(st, "reel_formats", chosen_format)
        # Mark the specific destination/trap as used
        dest_id = reel_data.get("dest_slug") or reel_data.get("dest_name", "")
        if chosen_format == "score_reveal":
            mark_theme_used(st, "reel_score_dests", dest_id)
        elif chosen_format == "contrarian":
            mark_theme_used(st, "reel_contrarian_hidden", reel_data.get("hidden", ""))
            mark_theme_used(st, "reel_contrarian_famous", reel_data.get("famous", ""))
        elif chosen_format == "seasonal_shift":
            mark_theme_used(st, "reel_seasonal_dests", dest_id)
        elif chosen_format == "trap_alert":
            mark_theme_used(st, "reel_trap_alerts", reel_data.get("trap_name", ""))
        elif chosen_format == "destination_reveal":
            mark_theme_used(st, "reel_reveal_dests", dest_id)
        elif chosen_format == "hidden_gem_callout":
            # Track by gem id (UUID) so the catalog of 625 gems exhausts before repeats
            gem_id = reel_data.get("dest_slug") or reel_data.get("dest_name", "")
            mark_theme_used(st, "reel_hidden_gems", gem_id)

        log.info(f"Theme tracker updated: format={chosen_format}")

    save_state(st)
    log.info("State saved. Reel run complete.")
    log.info("═" * 60)


def run_reel(force: bool = False, dry_run: bool = False):
    """Entry point for reel mode with its own lock file."""
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    global LOCK_FILE
    original_lock = LOCK_FILE
    LOCK_FILE = REEL_LOCK_FILE

    try:
        if not dry_run and not _acquire_lock(force=force):
            sys.exit(0)
        try:
            _run_reel(force=force, dry_run=dry_run)
        finally:
            if not dry_run:
                _release_lock()
    finally:
        LOCK_FILE = original_lock


# ─────────────────────────────────────────────────────────────────────────────
# REEL-MAP MODE — animated map Reels with destination data overlays
# ─────────────────────────────────────────────────────────────────────────────

REEL_MAP_LOCK_FILE = Path(__file__).parent / ".autoposter-reel-map.lock"

REEL_MAP_FORMATS = ["state_heatmap", "route_trace", "cluster_reveal", "score_pulse"]


def _pick_reel_campaign(state: dict) -> dict | None:
    """
    Campaign-driven reel picking.
    Picks a Pomelli campaign (oldest-unused rotation, needs ≥2 images),
    and returns a unified data dict that contains both the campaign info
    AND image paths. This guarantees caption ↔ visual alignment.
    """
    from reel_map_gen import pick_campaign_with_images
    import json as _json
    from pathlib import Path as _Path

    manifest_path = _Path(__file__).parent / "pomelli_library" / "manifest.json"
    if not manifest_path.exists():
        log.error("pomelli manifest.json not found.")
        return None

    with open(manifest_path) as f:
        manifest = _json.load(f)

    campaigns = manifest.get("campaigns", {})

    # Build candidate list: campaigns with ≥2 valid images
    pomelli_dir = _Path(__file__).parent / "pomelli_library"
    candidates = []
    for name, imgs in campaigns.items():
        valid = [pomelli_dir / img for img in imgs if (pomelli_dir / img).exists()]
        if len(valid) >= 2:
            candidates.append({"id": name, "images": valid})

    if not candidates:
        log.error("No Pomelli campaigns with ≥2 images found.")
        return None

    # Oldest-unused rotation
    ordered = pick_oldest_unused(state, "reel_map_campaigns", candidates, key="id")
    chosen = ordered[0]

    campaign_name = chosen["id"]
    images = chosen["images"][:4]  # Cap at 4 for reel

    # Build human-readable title from campaign name
    # e.g. "ghnp_48hrs" → "GHNP 48hrs", "jagdalpur_monsoon" → "Jagdalpur Monsoon"
    readable = campaign_name.replace("_", " ").title()

    log.info(f"Picked campaign: '{campaign_name}' ({len(images)} images) → \"{readable}\"")

    return {
        "campaign_name": campaign_name,
        "campaign_images": images,
        "campaign_readable": readable,
        "slug": campaign_name[:40],
    }


def _reel_map_caption(reel_format: str, data: dict, platform: str) -> str:
    """
    Generate platform-specific captions for reel-map posts.
    Campaign-driven: caption is derived from the campaign name/readable title,
    guaranteeing it matches the visual content the viewer sees.
    """
    import calendar
    from datetime import datetime as _dt
    _month_name = calendar.month_name[_dt.now().month]

    title = data.get("campaign_readable", "India Travel Intelligence")
    campaign = data.get("campaign_name", "")  # noqa: F841 — kept for future use

    if platform == "instagram":
        # Tier 1 (2026-05-10): expanded hashtag block, link-in-bio CTA, saves-bait.
        ig_hashtags = _build_ig_hashtags(category="reel")
        caption = (
            f"{title} — data you won't find on travel blogs.\n\n"
            f"Road access, hospital distance, crowd level, cell coverage — "
            f"all scored for this month.\n\n"
            f"📲 Full breakdown → link in bio\n\n"
            f"{ig_hashtags}"
        )
        caption = _add_ig_engagement_cta(caption, platform, "reel_map")
        return caption
    elif platform == "youtube":
        return (
            f"{title}\n\n"
            f"Every destination scored 1-10, every month. "
            f"No opinions — just data.\n\n"
            f"→ https://nakshiq.com?utm_source=youtube&utm_medium=short&utm_campaign=reel-map\n\n"
            f"#NakshIQ #{_month_name}Travel #DataDrivenTravel #Shorts"
        )
    else:
        return (
            f"{title}\n\n"
            f"Every destination scored 1-10, every month. "
            f"No opinions — just data.\n\n"
            f"→ nakshiq.com"
        )


def _run_reel_map(force: bool = False, dry_run: bool = False,
                  bypass_schedule: bool = False) -> bool:
    """
    Reel-Map mode v3 — campaign-driven, no text overlays.
    Picks a Pomelli campaign → animates its images → derives caption from
    the campaign name. Guarantees caption ↔ visual alignment.

    bypass_schedule: accepted for a uniform delegate signature (reel-map has
    no day-of-week gate of its own). Returns True if an account was posted to.
    """
    import tempfile
    from reel_map_gen import render_reel_map

    today   = date.today().isoformat()
    weekday = date.today().weekday()
    st      = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · REEL-MAP v3 · {today} · weekday={weekday}")
    log.info("═" * 60)

    # ── Pick a Pomelli campaign (oldest-unused rotation) ─────────────────
    reel_data = _pick_reel_campaign(st)
    if not reel_data:
        log.warning("No suitable Pomelli campaign available for reel.")
        save_state(st)
        return

    # Pick music style (rotate through formats for variety)
    fmt_items = [{"id": f} for f in REEL_MAP_FORMATS]
    fmt_ordered = pick_oldest_unused(st, "reel_map_formats", fmt_items, key="id")
    chosen_format = fmt_ordered[0]["id"]

    campaign_name = reel_data["campaign_name"]
    log.info(f"Campaign: {campaign_name} | Music style: {chosen_format}")

    # ── Render video ─────────────────────────────────────────────────────
    with tempfile.TemporaryDirectory(prefix="nakshiq_reel_map_") as td:
        out_dir = Path(td)
        try:
            video_path = render_reel_map(chosen_format, reel_data, out_dir)
        except Exception as e:
            log.error(f"Reel rendering crashed: {e}")
            save_state(st)
            return

        if not video_path or not video_path.exists():
            log.error("Reel rendering failed (no output).")
            save_state(st)
            return

        video_bytes = video_path.read_bytes()
        video_size_kb = len(video_bytes) // 1024
        log.info(f"Reel rendered: {video_path.name} ({video_size_kb} KB)")

        # ── Upload ────────────────────────────────────────────────────────
        media_filename = f"reel_pomelli_{campaign_name[:40]}.mp4"
        media_obj = upload_media_bytes(video_bytes, media_filename, "video/mp4")
        if not media_obj:
            log.error("Reel video upload failed.")
            save_state(st)
            return

        log.info(f"Video uploaded: {media_filename}")

    # ── Publish to all platforms ─────────────────────────────────────────
    accounts = get_connected_accounts()
    active   = [a for a in accounts if a.get("isActive")]
    if not active:
        log.warning("No active connected accounts.")
        save_state(st)
        return

    mode_suffix = "_reel_map"
    posted_any = False

    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        acc_scoped_key = acc_id + mode_suffix
        if st.get("posted_today", {}).get(acc_scoped_key) == today and not force:
            log.info(f"[{label}] Already posted reel-map today — skipping.")
            continue

        caption = _reel_map_caption(chosen_format, reel_data, platform)
        caption = apply_platform_voice(caption, "reels")
        caption = sanitize(caption)

        log.info(f"[{label}] Publishing reel ({campaign_name})...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish:\n{caption[:200]}...")
            posted_any = True
            continue

        result = publish_reel(caption, account, media_obj, dry_run=False)
        if not result:
            log.warning(f"[{label}] Reel post failed (API rejected).")
            continue

        post_id = result.get("post", {}).get("id", "unknown")
        log.info(f"[{label}] Outstand accepted (post_id={post_id}), confirming...")

        confirmed = wait_for_publish(post_id) if post_id != "unknown" else None
        cta_url = _extract_caption_url(caption)
        utm_content = build_utm_content(campaign_name, f"reel_map.{chosen_format}")
        if confirmed:
            platform_id = confirmed.get("platformPostId", "—")
            log.info(f"[{label}] ✅ Reel published · Outstand={post_id} · Platform={platform_id}")
            _mark_posted_today(st, acc_scoped_key)
            posted_any = True
            # Reel-map is campaign-driven, not destination-driven, so dest_id stays None.
            record_publish(
                st,
                dest_id=None,
                fmt=f"reel_map.{chosen_format}",
                post_id=post_id,
                platform=platform,
                media_id=media_filename,
            )
            _log_post_outcome(
                post_id=post_id, dest_id=None,
                fmt=f"reel_map.{chosen_format}", media_id=media_filename,
                account=account, caption=caption,
                cta_url=cta_url, utm_content=utm_content,
                status="published",
            )
        else:
            log.warning(f"[{label}] ⚠️  Reel queued but NOT confirmed (post_id={post_id}).")
            # 2026-05-17 (Tier 7 Phase 1.2): mirror Phase 1.2 of _run_reel —
            # write to post_log on queued_unconfirmed so cross-flow dedupe
            # sees the in-flight post. dest_id=None for reel_map (campaign-driven).
            record_publish(
                st,
                dest_id=None,
                fmt=f"reel_map.{chosen_format}",
                post_id=post_id,
                platform=platform,
                media_id=media_filename,
            )
            _log_post_outcome(
                post_id=post_id, dest_id=None,
                fmt=f"reel_map.{chosen_format}", media_id=media_filename,
                account=account, caption=caption,
                cta_url=cta_url, utm_content=utm_content,
                status="queued_unconfirmed",
            )

    # Mark campaign + format as used
    if posted_any:
        mark_theme_used(st, "reel_map_campaigns", campaign_name)
        mark_theme_used(st, "reel_map_formats", chosen_format)
        log.info(f"Theme tracker updated: campaign={campaign_name}, music={chosen_format}")

    save_state(st)
    log.info("State saved. Reel-map run complete.")
    log.info("═" * 60)
    return posted_any


def run_reel_map(force: bool = False, dry_run: bool = False):
    """Entry point for reel-map mode with its own lock file."""
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    global LOCK_FILE
    original_lock = LOCK_FILE
    LOCK_FILE = REEL_MAP_LOCK_FILE

    try:
        if not dry_run and not _acquire_lock(force=force):
            sys.exit(0)
        try:
            _run_reel_map(force=force, dry_run=dry_run)
        finally:
            if not dry_run:
                _release_lock()
    finally:
        LOCK_FILE = original_lock


# ─────────────────────────────────────────────────────────────────────────────
# UGC MODE — AI avatar videos with persona-aware script matching
# ─────────────────────────────────────────────────────────────────────────────

UGC_LOCK_FILE = Path(__file__).parent / ".autoposter-ugc.lock"


def _run_ugc(force: bool = False, dry_run: bool = False):
    """
    UGC mode — generates AI avatar videos using HeyGen and posts as Reels.
    10-avatar roster with persona-script-music matching and strict cultural rules.
    Posts to Instagram + YouTube.
    """
    from ugc_gen import generate_ugc, ContentRuleViolation

    today   = date.today().isoformat()
    st      = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · UGC · {today}")
    log.info("═" * 60)

    # ── Generate UGC video ──────────────────────────────────────────────
    try:
        result = generate_ugc(dry_run=dry_run)
    except ContentRuleViolation as e:
        log.error(f"UGC generation BLOCKED by content rules: {e}")
        save_state(st)
        return
    except Exception as e:
        log.error(f"UGC generation failed: {e}")
        import traceback
        log.error(traceback.format_exc())
        save_state(st)
        return

    avatar_name = result.get("avatar_name", "Unknown")
    dest = result.get("dest", "India")
    category = result.get("category", "unknown")

    log.info(f"Avatar: {avatar_name} | Dest: {dest} | Category: {category}")

    # 2026-05-17 (Tier 7 Phase 1.4): once-per-calendar-month dedupe for UGC.
    # The dest is determined inside generate_ugc() so we check post-hoc.
    # This wastes one HeyGen credit when blocked, but UGC fires manually only
    # (cron paused) and the alternative is letting Pahalgam appear again.
    used = recently_used_destinations(st)
    dest_id_candidate = (result.get("dest_id")
                          or dest.lower().replace(" ", "-")
                          or "")
    if dest_id_candidate in used:
        log.info(f"UGC for dest '{dest_id_candidate}' is BLOCKED by once-per-month / hardcoded — SKIPPING publish")
        save_state(st)
        return

    if dry_run:
        log.info(f"DRY RUN — script generated, skipping upload.")
        log.info(f"Script: {result.get('script', '')[:200]}...")
        save_state(st)
        return

    video_path = result.get("video_path")
    if not video_path or not Path(video_path).exists():
        log.error("UGC video file not found after generation.")
        save_state(st)
        return

    video_bytes = Path(video_path).read_bytes()
    video_size_kb = len(video_bytes) // 1024
    log.info(f"UGC video rendered: {Path(video_path).name} ({video_size_kb} KB)")

    # ── Upload to Outstand ──────────────────────────────────────────────
    media_filename = f"ugc_{result['avatar']}_{dest.lower().replace(' ', '_')}.mp4"
    media_obj = upload_media_bytes(video_bytes, media_filename, "video/mp4")
    if not media_obj:
        log.error("UGC video upload failed.")
        save_state(st)
        return

    log.info(f"Video uploaded: {media_filename}")

    # ── Publish to all platforms ────────────────────────────────────────
    accounts = get_connected_accounts()
    active   = [a for a in accounts if a.get("isActive")]
    if not active:
        log.warning("No active connected accounts.")
        save_state(st)
        return

    mode_suffix = "_ugc"
    posted_any = False

    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        acc_scoped_key = acc_id + mode_suffix
        if st.get("posted_today", {}).get(acc_scoped_key) == today and not force:
            log.info(f"[{label}] Already posted UGC today — skipping.")
            continue

        # Use platform-specific caption from ugc_gen
        if platform == "youtube":
            caption = result.get("caption_yt", result.get("caption_ig", ""))
        else:
            caption = result.get("caption_ig", "")

        caption = apply_platform_voice(caption, platform)
        caption = sanitize(caption)

        log.info(f"[{label}] Publishing UGC ({avatar_name} on {dest})...")

        pub_result = publish_reel(caption, account, media_obj, dry_run=False)
        if not pub_result:
            log.warning(f"[{label}] UGC post failed (API rejected).")
            continue

        post_id = pub_result.get("post", {}).get("id", "unknown")
        log.info(f"[{label}] Outstand accepted (post_id={post_id}), confirming...")

        confirmed = wait_for_publish(post_id) if post_id != "unknown" else None
        # 2026-05-17 Tier 7 Phase 4: UGC was the only flow not writing to
        # post_log + post_outcomes.jsonl. Add both calls here so cross-flow
        # dedupe sees UGC posts AND the weekly digest can attribute clicks.
        ugc_dest_id = result.get("dest_id") or (dest or "").lower().replace(" ", "-") or None
        cta_url = _extract_caption_url(caption)
        utm_content = build_utm_content(ugc_dest_id, f"ugc.{result.get('avatar', 'unknown')}")
        if confirmed:
            platform_id = confirmed.get("platformPostId", "—")
            log.info(f"[{label}] ✅ UGC published · Outstand={post_id} · Platform={platform_id}")
            _mark_posted_today(st, acc_scoped_key)
            posted_any = True
            record_publish(
                st,
                dest_id=ugc_dest_id,
                fmt=f"ugc.{result.get('avatar', 'unknown')}",
                post_id=post_id,
                platform=platform,
                media_id=media_filename,
            )
            _log_post_outcome(
                post_id=post_id, dest_id=ugc_dest_id,
                fmt=f"ugc.{result.get('avatar', 'unknown')}", media_id=media_filename,
                account=account, caption=caption,
                cta_url=cta_url, utm_content=utm_content,
                status="published",
            )
        else:
            log.warning(f"[{label}] ⚠️  UGC queued but NOT confirmed (post_id={post_id}).")
            record_publish(
                st,
                dest_id=ugc_dest_id,
                fmt=f"ugc.{result.get('avatar', 'unknown')}",
                post_id=post_id,
                platform=platform,
                media_id=media_filename,
            )
            _log_post_outcome(
                post_id=post_id, dest_id=ugc_dest_id,
                fmt=f"ugc.{result.get('avatar', 'unknown')}", media_id=media_filename,
                account=account, caption=caption,
                cta_url=cta_url, utm_content=utm_content,
                status="queued_unconfirmed",
            )

    if posted_any:
        mark_theme_used(st, "ugc_avatars", result["avatar"])

    save_state(st)
    log.info(f"State saved. UGC run complete. Cost: ${result.get('cost', 0):.2f}")
    log.info("═" * 60)


def run_ugc(force: bool = False, dry_run: bool = False):
    """Entry point for UGC mode with its own lock file."""
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    global LOCK_FILE
    original_lock = LOCK_FILE
    LOCK_FILE = UGC_LOCK_FILE

    try:
        if not dry_run and not _acquire_lock(force=force):
            sys.exit(0)
        try:
            _run_ugc(force=force, dry_run=dry_run)
        finally:
            if not dry_run:
                _release_lock()
    finally:
        LOCK_FILE = original_lock


# ─────────────────────────────────────────────────────────────────────────────
# INFOGRAPHIC MODE — branded carousel infographics (treks, festivals, etc.)
# ─────────────────────────────────────────────────────────────────────────────

INFOGRAPHIC_LOCK_FILE = Path(__file__).parent / ".autoposter-infographic.lock"


def _run_infographic(force: bool = False, dry_run: bool = False,
                     bypass_schedule: bool = False) -> bool:
    """
    Infographic mode — generates branded infographic carousels and posts
    as carousel feed posts. Rotates topics (treks, festivals, hidden_gems,
    camping) and themes (magazine, topo, datacard, noir).
    Mon/Wed/Fri schedule.

    bypass_schedule: skip the Mon/Wed/Fri day-of-week gate (set True when
    invoked from the evening picker rotation — the picker is the scheduler).
    Returns True if at least one account was posted to.
    """
    today   = date.today().isoformat()
    weekday = date.today().weekday()
    st      = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · INFOGRAPHIC · {today} · weekday={weekday}")
    log.info("═" * 60)

    # Only run Mon/Wed/Fri (0, 2, 4) — silently exit on other days
    if weekday not in (0, 2, 4) and not force and not bypass_schedule:
        log.info("Infographic mode only runs Mon/Wed/Fri. Exiting.")
        return False

    # Generate infographic carousel
    try:
        from infographic_gen import build_infographic
    except ImportError:
        log.error("infographic_gen.py not found. Exiting.")
        return

    try:
        result = build_infographic(dry_run=True)  # always generate to disk first
    except Exception as e:
        log.error(f"Infographic generation failed: {e}")
        import traceback
        log.error(traceback.format_exc())
        return

    if not result or "error" in result:
        log.error(f"Infographic generation returned error: {result}")
        return

    slides = result["slides"]
    caption = result["caption"]
    topic = result["topic"]
    theme = result["theme"]

    log.info(f"Generated {len(slides)} slides: topic={topic}, theme={theme}")

    # Upload all slides to Outstand
    media_objs = []
    for slide_path in slides:
        try:
            img_bytes = slide_path.read_bytes()
            media_obj = upload_media_bytes(
                img_bytes,
                f"infographic_{slide_path.stem}.jpg",
                "image/jpeg",
            )
            if media_obj:
                media_objs.append(media_obj)
                log.info(f"  Uploaded: {slide_path.name} ({len(img_bytes) // 1024} KB)")
            else:
                log.warning(f"  Upload failed: {slide_path.name}")
        except Exception as e:
            log.warning(f"  Upload exception for {slide_path.name}: {e}")

    if len(media_objs) < 2:
        log.error(f"Only {len(media_objs)} slides uploaded — need at least 2 for carousel.")
        return

    log.info(f"All slides uploaded: {len(media_objs)} media objects")

    # Post to each connected account
    accounts = get_connected_accounts()
    active   = [a for a in accounts if a.get("isActive")]
    if not active:
        log.warning("No active connected accounts.")
        return

    mode_suffix = "_infographic"
    posted_any = False

    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        # YouTube only supports video — skip image carousel posts
        if platform == "youtube":
            log.info(f"[{label}] Skipping infographic (YouTube only accepts video/reels).")
            continue

        acc_scoped_key = acc_id + mode_suffix
        if st.get("posted_today", {}).get(acc_scoped_key) == today and not force:
            log.info(f"[{label}] Already posted infographic today — skipping.")
            continue

        post_caption = sanitize(apply_platform_voice(caption, platform))

        log.info(f"[{label}] Publishing infographic carousel: {topic}/{theme}...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish {len(media_objs)}-slide carousel:\n{post_caption[:200]}...")
            posted_any = True
            continue

        result = publish_feed_post(post_caption, account, media_objs, dry_run=False)
        if result:
            log.info(f"[{label}] Infographic carousel posted successfully!")
            _mark_posted_today(st, acc_scoped_key)
            posted_any = True
        else:
            log.warning(f"[{label}] Infographic post failed.")

    # Update infographic state (topic/theme rotation) if posted
    # IMPORTANT: merge into `st` directly so the single save_state() call below
    # doesn't overwrite the infographic rotation state (was a race-condition bug).
    if posted_any and not dry_run:
        try:
            from infographic_gen import TOPICS, THEMES
            if "infographic" not in st:
                st["infographic"] = {}
            st["infographic"]["last_topic_idx"] = TOPICS.index(topic)
            st["infographic"]["last_theme_idx"] = THEMES.index(theme)
            st["infographic"]["last_posted"] = today
            log.info(f"Infographic state updated: topic={topic}, theme={theme}")
        except Exception as e:
            log.warning(f"Failed to update infographic state: {e}")

    save_state(st)
    log.info("State saved. Infographic run complete.")
    log.info("═" * 60)
    return posted_any


def run_infographic(force: bool = False, dry_run: bool = False):
    """Entry point for infographic mode with its own lock file."""
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    global LOCK_FILE
    original_lock = LOCK_FILE
    LOCK_FILE = INFOGRAPHIC_LOCK_FILE

    try:
        if not dry_run and not _acquire_lock(force=force):
            sys.exit(0)
        try:
            _run_infographic(force=force, dry_run=dry_run)
        finally:
            if not dry_run:
                _release_lock()
    finally:
        LOCK_FILE = original_lock


# ─────────────────────────────────────────────────────────────────────────────
# VISUAL-FORMAT DELEGATES — heavyweight pipelines the evening picker can rotate
# -----------------------------------------------------------------------------
# 2026-05-22 — infographic / tourist_map / reel_map were paused in the
# 2026-05-16 cadence cut (their crons commented out). Rather than re-add crons
# (which would breach the 2-posts/day ceiling), they are now rotated INTO the
# evening slot: pick_oldest_unused surfaces one of these keys, and _run_inner
# hands the whole slot to the matching pipeline via bypass_schedule=True.
# ─────────────────────────────────────────────────────────────────────────────
VISUAL_DELEGATE_FORMATS = {
    "infographic": _run_infographic,
    "tourist_map": _run_tourist_map,
    "reel_map":    _run_reel_map,
}


# ─────────────────────────────────────────────────────────────────────────────
# YT SHORT MODE — YouTube Shorts (listicle, before_after, mini_guide)
# ─────────────────────────────────────────────────────────────────────────────

YT_SHORT_LOCK_FILE = Path(__file__).parent / ".autoposter-yt-short.lock"


def _run_yt_short(force: bool = False, dry_run: bool = False):
    """
    YT Short mode — generates and posts YouTube Shorts + Instagram Reels.
    Rotates through 6 formats with anti-repetition. Platform-specific captions
    (YouTube gets YT-optimized, Instagram gets IG-optimized). Max 2 per day.
    """
    import tempfile

    try:
        from yt_shorts_gen import build_yt_short
    except ImportError:
        log.error("yt_shorts_gen.py not found. Exiting.")
        return

    today = date.today().isoformat()
    st    = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · YT SHORT · {today}")
    log.info("═" * 60)

    # ── Generate the Short ────────────────────────────────────────────────
    try:
        result = build_yt_short(dry_run=dry_run)
    except Exception as e:
        log.error(f"YT Short generation failed: {e}")
        import traceback
        log.error(traceback.format_exc())
        return

    if not result:
        log.error("YT Short generation returned None.")
        return

    video_bytes = result["video_bytes"]
    video_fname = result["video_filename"]
    yt_caption  = result["caption"]
    ig_caption  = result.get("ig_caption", result["caption"])
    fmt         = result["format"]
    duration    = result.get("duration", 0)
    music       = result.get("music", "unknown")
    primary_dest_id = result.get("primary_dest_id")  # may be None for multi-dest formats

    video_size_kb = len(video_bytes) // 1024
    log.info(f"Short rendered: {video_fname} ({video_size_kb} KB, {duration:.1f}s, fmt={fmt}, music={music})")

    # ── Upload video ──────────────────────────────────────────────────────
    media_filename = f"yt_short_{fmt}_{video_fname}"
    media_obj = upload_media_bytes(video_bytes, media_filename, "video/mp4")
    if not media_obj:
        log.error("YT Short video upload failed.")
        return

    log.info(f"Video uploaded: {media_filename}")

    # ── Publish to YouTube accounts ONLY ──────────────────────────────────
    accounts = get_connected_accounts()
    active   = [a for a in accounts if a.get("isActive")]
    if not active:
        log.warning("No active connected accounts.")
        return

    mode_suffix = "_yt_short"
    posted_any  = False

    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        # Post to YouTube and Instagram (skip Facebook)
        if platform not in ("youtube", "instagram"):
            log.info(f"[{label}] Skipping (YT Shorts post to YouTube + Instagram only).")
            continue

        # 2-per-day limit per account
        acc_scoped_key = acc_id + mode_suffix
        daily_count_key = acc_id + mode_suffix + "_count"
        posted_today = st.get("posted_today", {})

        if posted_today.get(acc_scoped_key) == today:
            count = posted_today.get(daily_count_key, 0)
            if count >= 2 and not force:
                log.info(f"[{label}] Already posted {count} YT Shorts today — skipping.")
                continue

        # Platform-specific caption: YouTube vs Instagram
        if platform == "instagram":
            post_caption = sanitize(apply_platform_voice(ig_caption, "instagram"))
        else:
            post_caption = sanitize(apply_platform_voice(yt_caption, "yt_shorts"))
        log.info(f"[{label}] Publishing YT Short ({fmt})...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish:\n{post_caption[:200]}...")
            posted_any = True
            continue

        pub_result = publish_reel(post_caption, account, media_obj, dry_run=False)
        if not pub_result:
            log.warning(f"[{label}] YT Short post failed (API rejected).")
            continue

        post_id = pub_result.get("post", {}).get("id", "unknown")
        log.info(f"[{label}] Outstand accepted (post_id={post_id}), waiting for platform confirmation...")

        confirmed = wait_for_publish(post_id) if post_id != "unknown" else None
        cta_url = _extract_caption_url(post_caption)
        utm_content = build_utm_content(primary_dest_id, "yt_short")
        if confirmed:
            platform_id = confirmed.get("platformPostId", "—")
            log.info(f"[{label}] ✅ YT Short published · Outstand={post_id} · Platform={platform_id}")
            posted_today = st.setdefault("posted_today", {})
            prev_date = posted_today.get(acc_scoped_key)
            prev_count = posted_today.get(daily_count_key, 0) if prev_date == today else 0
            _mark_posted_today(st, acc_scoped_key)
            posted_today[daily_count_key] = prev_count + 1
            posted_any = True
            # Cross-flow dedup: register this Short with the main loop so the
            # same dest doesn't get re-used in carousel within 14 days.
            record_publish(
                st,
                dest_id=primary_dest_id,
                fmt=f"yt_short.{fmt}",
                post_id=post_id,
                platform=platform,
                media_id=media_filename,
            )
            _log_post_outcome(
                post_id=post_id, dest_id=primary_dest_id,
                fmt=f"yt_short.{fmt}", media_id=media_filename,
                account=account, caption=post_caption,
                cta_url=cta_url, utm_content=utm_content,
                status="published",
            )
        else:
            log.warning(f"[{label}] ⚠️  YT Short queued but NOT confirmed (post_id={post_id}). May have silently failed.")
            # 2026-05-17 (Tier 7 Phase 1.3): also write to post_log on
            # queued_unconfirmed so cross-flow dedupe sees the in-flight
            # YT Short. Without this, a parallel reel/main run could pick
            # the same dest while Outstand processes async.
            record_publish(
                st,
                dest_id=primary_dest_id,
                fmt=f"yt_short.{fmt}",
                post_id=post_id,
                platform=platform,
                media_id=media_filename,
            )
            _log_post_outcome(
                post_id=post_id, dest_id=primary_dest_id,
                fmt=f"yt_short.{fmt}", media_id=media_filename,
                account=account, caption=post_caption,
                cta_url=cta_url, utm_content=utm_content,
                status="queued_unconfirmed",
            )

    if posted_any:
        log.info(f"YT Short posted: format={fmt}, music={music}")

    # Merge yt_short rotation state from yt_shorts_gen into st.
    # IMPORTANT: build_yt_short() independently loads/saves state.json with
    # yt_short_formats_used and yt_short_music_used. If we don't re-read those
    # fields, save_state(st) overwrites them with the stale values from when
    # st was loaded (same class of bug as the infographic state-overwrite).
    try:
        from yt_shorts_gen import _load_state as _yt_load_state
        fresh = _yt_load_state()
        for key in ("yt_short_formats_used", "yt_short_music_used"):
            if key in fresh:
                st[key] = fresh[key]
    except Exception as e:
        log.warning(f"Failed to merge YT Short rotation state: {e}")

    save_state(st)
    log.info("State saved. YT Short run complete.")
    log.info("═" * 60)


def run_yt_short(force: bool = False, dry_run: bool = False):
    """Entry point for YT Short mode with its own lock file."""
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    global LOCK_FILE
    original_lock = LOCK_FILE
    LOCK_FILE = YT_SHORT_LOCK_FILE

    try:
        if not dry_run and not _acquire_lock(force=force):
            sys.exit(0)
        try:
            _run_yt_short(force=force, dry_run=dry_run)
        finally:
            if not dry_run:
                _release_lock()
    finally:
        LOCK_FILE = original_lock


# ─────────────────────────────────────────────────────────────────────────────
# ANALYTICS — Performance tracking & smart format weighting
# ─────────────────────────────────────────────────────────────────────────────

ANALYTICS_FILE = Path(__file__).parent / "analytics.json"


def _load_analytics() -> dict:
    """Load analytics data from analytics.json."""
    try:
        return json.loads(ANALYTICS_FILE.read_text())
    except Exception:
        return {"posts": [], "last_sync": None}


def _save_analytics(data: dict):
    """Save analytics data."""
    ANALYTICS_FILE.write_text(json.dumps(data, indent=2, default=str))


def _parse_post_metadata(post: dict) -> dict:
    """Extract structured metadata from an Outstand post object."""
    containers = post.get("containers") or [{}]
    content = containers[0].get("content", "") if containers else ""
    media = ((containers[0].get("media") or [{}])[0] if containers else {})
    filename = media.get("filename", "")

    # Detect format from filename pattern: yt_short_{fmt}_{date}.mp4
    fmt = "unknown"
    content_type = "unknown"
    if "yt_short_" in filename:
        content_type = "yt_short"
        parts = filename.replace("yt_short_", "").split("_")
        if parts:
            fmt = parts[0]
    elif "reel_" in filename:
        content_type = "reel"
        parts = filename.replace("reel_", "").split("_")
        if parts:
            fmt = parts[0]
    elif "infographic" in filename.lower():
        content_type = "infographic"
    elif "tourist_map" in filename.lower():
        content_type = "tourist_map"
    elif "flow_story" in filename.lower():
        content_type = "flow_story"
    elif "pomelli" in filename.lower():
        content_type = "pomelli_visual"
    elif "canva" in filename.lower():
        content_type = "canva_visual"
    else:
        content_type = "feed_post"

    # Extract campaign from UTM in content
    campaign = ""
    if "utm_campaign=" in content:
        try:
            campaign = content.split("utm_campaign=")[1].split("&")[0].split("\n")[0].split(" ")[0].split("#")[0]
        except Exception:
            pass

    return {
        "content_type": content_type,
        "format": fmt,
        "campaign": campaign,
        "filename": filename,
    }


def run_analytics():
    """
    Analytics sync — pull recent posts from Outstand, track performance,
    and generate a report. Stores data in analytics.json.
    """
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · ANALYTICS SYNC · {date.today().isoformat()}")
    log.info("═" * 60)

    analytics = _load_analytics()
    existing_ids = {p["post_id"] for p in analytics.get("posts", []) if "post_id" in p}

    # Pull recent posts (up to 200)
    new_posts = 0
    try:
        for page in range(1, 5):  # 4 pages × 50 = 200 posts
            r = outstand_get(f"/v1/posts?limit=50&page={page}")
            posts = r.get("data") or []
            if not posts:
                break

            for post in posts:
                post_id = post.get("id", "")
                if post_id in existing_ids:
                    continue

                created = post.get("createdAt", "")
                meta = _parse_post_metadata(post)

                # Collect per-platform results
                platforms = []
                for sa in (post.get("socialAccounts") or []):
                    platform_data = {
                        "platform": sa.get("network", "unknown"),
                        "username": sa.get("username", ""),
                        "status": sa.get("status", "unknown"),
                        "error": sa.get("error"),
                        "posted_url": sa.get("postedUrl", ""),
                    }
                    platforms.append(platform_data)

                record = {
                    "post_id": post_id,
                    "created_at": created,
                    "content_type": meta["content_type"],
                    "format": meta["format"],
                    "campaign": meta["campaign"],
                    "platforms": platforms,
                }
                analytics.setdefault("posts", []).append(record)
                existing_ids.add(post_id)
                new_posts += 1

    except Exception as e:
        log.error(f"Analytics sync failed: {e}")
        import traceback
        log.error(traceback.format_exc())

    analytics["last_sync"] = datetime.now().isoformat()
    _save_analytics(analytics)

    log.info(f"Synced {new_posts} new posts (total: {len(analytics.get('posts', []))})")

    # Generate summary report
    _analytics_report(analytics)


def _analytics_report(analytics: dict):
    """Print a summary of post performance by content type and format."""
    posts = analytics.get("posts", [])
    if not posts:
        log.info("No posts to analyze.")
        return

    # Count by content type
    by_type = {}
    by_format = {}
    by_platform = {}
    success_count = 0
    fail_count = 0

    for p in posts:
        ct = p.get("content_type", "unknown")
        fmt = p.get("format", "unknown")
        by_type[ct] = by_type.get(ct, 0) + 1
        by_format[f"{ct}:{fmt}"] = by_format.get(f"{ct}:{fmt}", 0) + 1

        for plat in p.get("platforms", []):
            pn = plat.get("platform", "unknown")
            status = plat.get("status", "unknown")
            by_platform[pn] = by_platform.get(pn, 0) + 1
            if status == "published":
                success_count += 1
            elif status in ("failed", "error"):
                fail_count += 1

    log.info("── Analytics Summary ──")
    log.info(f"Total posts tracked: {len(posts)}")
    log.info(f"Successfully published: {success_count} | Failed: {fail_count}")
    log.info("")
    log.info("By content type:")
    for ct, count in sorted(by_type.items(), key=lambda x: -x[1]):
        log.info(f"  {ct}: {count}")
    log.info("")
    log.info("By format:")
    for fmt, count in sorted(by_format.items(), key=lambda x: -x[1]):
        log.info(f"  {fmt}: {count}")
    log.info("")
    log.info("By platform:")
    for pn, count in sorted(by_platform.items(), key=lambda x: -x[1]):
        log.info(f"  {pn}: {count}")

    # YT Short format breakdown (for weighting)
    yt_formats = {k: v for k, v in by_format.items() if k.startswith("yt_short:")}
    if yt_formats:
        log.info("")
        log.info("YT Short format distribution:")
        total_yt = sum(yt_formats.values())
        for fmt, count in sorted(yt_formats.items(), key=lambda x: -x[1]):
            pct = (count / total_yt * 100) if total_yt else 0
            log.info(f"  {fmt.split(':')[1]}: {count} ({pct:.0f}%)")

    # Date range
    dates = [p.get("created_at", "")[:10] for p in posts if p.get("created_at")]
    if dates:
        log.info(f"\nDate range: {min(dates)} → {max(dates)}")

    log.info("═" * 60)


def smart_format_weights(content_type: str = "yt_short") -> dict:
    """
    Return format weights based on analytics. Formats that haven't been tried
    get a boost. Formats with high success rates get higher weight.
    Returns {format_name: weight} dict.
    """
    analytics = _load_analytics()
    posts = analytics.get("posts", [])

    # Filter to relevant content type
    relevant = [p for p in posts if p.get("content_type") == content_type]

    if not relevant:
        # No data yet — equal weights
        return {}

    # Count successes per format
    format_stats = {}
    for p in relevant:
        fmt = p.get("format", "unknown")
        if fmt == "unknown":
            continue
        stats = format_stats.setdefault(fmt, {"total": 0, "success": 0})
        stats["total"] += 1
        for plat in p.get("platforms", []):
            if plat.get("status") == "published":
                stats["success"] += 1

    # Calculate weights: success_rate * (1 + novelty_bonus)
    # Novelty bonus = higher weight for less-used formats
    total_posts = sum(s["total"] for s in format_stats.values())
    weights = {}
    for fmt, stats in format_stats.items():
        success_rate = stats["success"] / max(stats["total"], 1)
        # Novelty: inverse of usage proportion
        usage_pct = stats["total"] / max(total_posts, 1)
        novelty = max(0.5, 1.5 - usage_pct)
        weights[fmt] = round(success_rate * novelty, 3)

    return weights


# ─────────────────────────────────────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    # 2026-05-20 diag: capture which workflow/run/actor invoked us, so the
    # mystery ~20:05 UTC commit (recurring log truncation, source unidentified
    # in audit 2026-05-20) surfaces its trigger in autoposter.log on next fire.
    print(
        f"[diag] event={os.getenv('GITHUB_EVENT_NAME','local')} "
        f"workflow={os.getenv('GITHUB_WORKFLOW','local')} "
        f"job={os.getenv('GITHUB_JOB','local')} "
        f"actor={os.getenv('GITHUB_ACTOR','local')} "
        f"run_id={os.getenv('GITHUB_RUN_ID','local')} "
        f"argv={sys.argv[1:]}",
        flush=True,
    )
    parser = argparse.ArgumentParser(description="Nakshiq Autoposter — morning (default) or evening mode.")
    parser.add_argument("--force",     action="store_true",
                        help="Post even if already posted today (bypasses dedup + lock).")
    parser.add_argument("--sync-only", action="store_true",
                        help="Only sync Nakshiq content; no publishing.")
    parser.add_argument("--dry-run",   action="store_true",
                        help="Render and preview everything but do not publish.")
    parser.add_argument("--evening",   action="store_true",
                        help="Run the evening entertainment-pillar schedule "
                             "(Reels-first, audience-filtered). Defaults to "
                             "morning data-pillar schedule when omitted.")
    parser.add_argument("--moat",      action="store_true",
                        help="Run the moat/identity-pillar schedule "
                             "(methodology, skip list, Chinese wall, etc.). "
                             "Only runs on Mon/Wed/Fri; exits silently on other days.")
    parser.add_argument("--tourist-map", action="store_true",
                        help="Run the tourist map schedule (Tue/Thu/Sat). "
                             "Generates illustrated state maps from map_data.json "
                             "and posts to all platforms.")
    parser.add_argument("--canva-visual", action="store_true",
                        help="Post a pre-generated Canva visual from the library. "
                             "Rotates across 8 content categories with anti-repetition.")
    parser.add_argument("--pomelli-visual", action="store_true",
                        help="Post a Pomelli AI-generated campaign creative. "
                             "Rotates 20 feature + 20 region campaigns with "
                             "platform-specific captions (IG vs FB).")
    parser.add_argument("--flow-story", action="store_true",
                        help="Post a Flow AI-generated destination visual. "
                             "956 images across 410 destinations, rotates with "
                             "anti-repetition. Daily at 16:00 IST.")
    parser.add_argument("--reel", action="store_true",
                        help="Generate and post a short-form vertical Reel video. "
                             "Rotates through score_reveal, contrarian, seasonal_shift, "
                             "and trap_alert formats with anti-repetition.")
    parser.add_argument("--infographic", action="store_true",
                        help="Generate and post a branded infographic carousel. "
                             "Rotates topics (treks, festivals, hidden_gems, camping) "
                             "and themes (magazine, topo, datacard, noir). Mon/Wed/Fri.")
    parser.add_argument("--yt-short", action="store_true",
                        help="Generate and post a YouTube Short video. "
                             "Rotates through 6 formats with anti-repetition. "
                             "Posts to YouTube + Instagram, max 2 per day.")
    parser.add_argument("--reel-map", action="store_true",
                        help="Generate and post an animated map Reel. "
                             "Rotates through 4 formats (state_heatmap, route_trace, "
                             "cluster_reveal, score_pulse) × 28 states.")
    parser.add_argument("--ugc", action="store_true",
                        help="Generate and post a UGC AI avatar video. "
                             "10-avatar roster with persona-aware script/music "
                             "matching and strict cultural rules.")
    parser.add_argument("--analytics", action="store_true",
                        help="Sync post history from Outstand and generate "
                             "performance analytics report. No posting.")
    parser.add_argument("--engagement-pull", action="store_true",
                        help="Pull per-post engagement (likes/comments/saves/"
                             "shares/reach/views) from Outstand /v1/posts/"
                             "{id}/analytics into data/post_engagement.json. "
                             "Tier 2 (2026-05-10).  No posting.")
    parser.add_argument("--engagement-days", type=int, default=7,
                        help="Days back to pull engagement for "
                             "(default 7).")
    parser.add_argument("--digest-weekly", action="store_true",
                        help="Generate the weekly engagement digest from "
                             "data/post_engagement.json and write it to "
                             "data/research/social-engagement-week-{date}.md. "
                             "Tier 2.5 (2026-05-10).  No posting.")
    parser.add_argument("--strategy", action="store_true",
                        help="Strategic content engine (2026-05-19). Reads "
                             "data/content_strategy.csv (25 hand-crafted "
                             "formats × 5 pillars), picks the best format ↔ "
                             "destination pair for today using fill-pct + "
                             "pillar balance + anti-repeat, writes a daily "
                             "brief with hook + caption + Pomelli/image/video "
                             "prompts to data/strategy_briefs/. No publishing — "
                             "outputs the brief for asset creation.")
    parser.add_argument("--strategy-format", default="",
                        help="Force a specific strategy format_id "
                             "(e.g. --strategy-format=v2_pov_slow_morning).")
    parser.add_argument("--strategy-dest", default="",
                        help="Force a specific destination id for strategy mode.")
    parser.add_argument("--strategy-explain", action="store_true",
                        help="Include picker reasoning in the strategy brief.")
    parser.add_argument("--allow-local", action="store_true",
                        help="Permit running outside GitHub Actions. Without this "
                             "flag, the autoposter aborts immediately when "
                             "GITHUB_ACTIONS is unset — protects against sandboxed "
                             "schedulers (e.g. Cowork) that get killed mid-run and "
                             "leave stale locks / corrupted state.")
    args = parser.parse_args()

    # Sandbox / unauthorized-scheduler guard.
    # GHA cron is the only authorized scheduler. Local Mac terminal runs must
    # pass --allow-local explicitly. Anything else (Cowork sandbox tasks, IDE
    # subshells, accidental cron) exits cleanly before touching state.json so a
    # 45s sandbox kill cannot corrupt the canonical state on autoposter-state.
    if not os.environ.get("GITHUB_ACTIONS") and not args.allow_local:
        sys.stderr.write(
            "[autoposter] ABORT: not running on GitHub Actions and --allow-local "
            "not set. GHA cron is the only authorized scheduler. For manual local "
            "runs, pass --allow-local explicitly.\n"
        )
        sys.exit(0)
    exclusive = sum([args.evening, args.moat, args.tourist_map, args.canva_visual, args.pomelli_visual, args.flow_story, args.reel, args.reel_map, args.ugc, args.infographic, args.yt_short, args.analytics, args.engagement_pull, args.digest_weekly, args.strategy])
    if exclusive > 1:
        parser.error("--evening, --moat, --tourist-map, --canva-visual, --pomelli-visual, --flow-story, --reel, --reel-map, --ugc, --infographic, --yt-short, --analytics, --engagement-pull, --digest-weekly, and --strategy are mutually exclusive.")
    if args.tourist_map:
        run_tourist_map(force=args.force, dry_run=args.dry_run)
    elif args.canva_visual:
        run_canva_visual(force=args.force, dry_run=args.dry_run)
    elif args.pomelli_visual:
        run_pomelli_visual(force=args.force, dry_run=args.dry_run)
    elif args.flow_story:
        run_flow_story(force=args.force, dry_run=args.dry_run)
    elif args.reel:
        run_reel(force=args.force, dry_run=args.dry_run)
    elif args.reel_map:
        run_reel_map(force=args.force, dry_run=args.dry_run)
    elif args.ugc:
        run_ugc(force=args.force, dry_run=args.dry_run)
    elif args.infographic:
        run_infographic(force=args.force, dry_run=args.dry_run)
    elif args.yt_short:
        run_yt_short(force=args.force, dry_run=args.dry_run)
    elif args.analytics:
        run_analytics()
    elif args.engagement_pull:
        # Tier 2 (2026-05-10): pull per-post engagement from Outstand /analytics.
        from engagement_pull import run as run_engagement_pull
        run_engagement_pull(days=args.engagement_days)
    elif args.digest_weekly:
        # Tier 2.5 (2026-05-10): write weekly markdown digest from engagement data.
        from digest_weekly import run as run_digest_weekly
        run_digest_weekly(days=7)
    elif args.strategy:
        # 2026-05-19: strategic content engine — pick from 25 hand-crafted
        # formats based on fill-data + pillar balance + anti-repeat, write a
        # daily brief with hook + caption + Pomelli/image/video prompts.
        from strategy_engine import (
            pick_format_and_destination, render_brief, record_pick, BRIEF_DIR,
        )
        today = date.today()
        pick = pick_format_and_destination(
            today=today,
            force_format=args.strategy_format or None,
            force_dest_id=args.strategy_dest or None,
            explain=args.strategy_explain,
        )
        brief = render_brief(pick, today)
        out_path = BRIEF_DIR / f"{today.isoformat()}.md"
        out_path.write_text(brief)
        log.info("═" * 60)
        log.info(f"Nakshiq Autoposter · STRATEGY · {today.isoformat()}")
        log.info("═" * 60)
        if pick.get("error"):
            log.error(f"Strategy pick failed: {pick['error']}")
            sys.exit(1)
        log.info(f"Strategy pick: {pick['format_id']} × {pick['destination']['name']} "
                 f"({pick['destination']['state']}) — pillar={pick['pillar']}, "
                 f"score={pick['scoring']['total']:.3f}")
        if pick["missing_fields"]:
            log.warning(f"Brief has {len(pick['missing_fields'])} missing fields: "
                        f"{', '.join(pick['missing_fields'][:5])}"
                        f"{'…' if len(pick['missing_fields']) > 5 else ''}")
        log.info(f"Brief written to: {out_path}")
        if not args.dry_run:
            record_pick(pick, today)
            log.info("Strategy pick recorded to state.json.")
    else:
        run(force=args.force, sync_only=args.sync_only,
            dry_run=args.dry_run, evening=args.evening, moat=args.moat)
