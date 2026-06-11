#!/usr/bin/env python3
"""
strategy_engine.py — NakshIQ Strategic Content Engine (2026-05-10)
==================================================================

Reads data/content_strategy.csv (25 hand-crafted formats across 5 pillars:
moment / discovery / verification / anti_trap / verdict) and produces a daily
content brief: which format to ship, against which destination, with all
placeholders filled, and the 3 ready-to-paste prompts (Pomelli / image / video).

This is the strategy layer the autoposter's old 18-format MORNING_FORMATS
round-robin was missing. Selection is data-aware (skips formats with missing
required fields), pillar-balanced (anti-monoculture), freq-capped, and
anti-repeat (no format twice in <14 days, no dest twice in <7 days).

CLI:
    python3 strategy_engine.py                       # pick today's brief
    python3 strategy_engine.py --format=v2_pov_slow_morning  # force a format
    python3 strategy_engine.py --dest=munsiyari             # force a destination
    python3 strategy_engine.py --list-eligible              # show all eligible
    python3 strategy_engine.py --explain                    # dump pick reasoning
"""

from __future__ import annotations
import csv
import json
import os
import sys
import argparse
import calendar
import math
import random
from datetime import datetime, date, timedelta
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).parent
CSV_PATH = ROOT / "data" / "content_strategy.csv"
STATE_FILE = ROOT / "state.json"
BRIEF_DIR = ROOT / "data" / "strategy_briefs"
BRIEF_DIR.mkdir(parents=True, exist_ok=True)

# ─────────────────────────────────────────────────────────────────────────────
# DATA FILLERS — auto-fill what we can from NakshIQ API + heuristics
# ─────────────────────────────────────────────────────────────────────────────

# Per-state nearest major city for "anchor_city" (weekend escape format)
ANCHOR_CITY = {
    "Uttarakhand": "Delhi", "Himachal Pradesh": "Delhi", "Punjab": "Delhi",
    "Haryana": "Delhi", "Rajasthan": "Delhi", "Uttar Pradesh": "Delhi",
    "Jammu & Kashmir": "Delhi", "Ladakh": "Delhi",
    "Maharashtra": "Mumbai", "Gujarat": "Mumbai", "Goa": "Mumbai",
    "Karnataka": "Bangalore", "Kerala": "Bangalore", "Tamil Nadu": "Chennai",
    "Andhra Pradesh": "Hyderabad", "Telangana": "Hyderabad",
    "West Bengal": "Kolkata", "Odisha": "Kolkata", "Sikkim": "Kolkata",
    "Assam": "Guwahati", "Arunachal Pradesh": "Guwahati",
    "Nagaland": "Guwahati", "Manipur": "Guwahati",
    "Mizoram": "Guwahati", "Meghalaya": "Guwahati", "Tripura": "Guwahati",
    "Madhya Pradesh": "Indore", "Chhattisgarh": "Raipur", "Bihar": "Patna",
    "Jharkhand": "Ranchi",
}

# Per-state local language for v2_local_knows format
LOCAL_LANGUAGE = {
    "Uttarakhand": "Garhwali / Kumaoni", "Himachal Pradesh": "Pahari",
    "Jammu & Kashmir": "Kashmiri", "Ladakh": "Ladakhi",
    "Punjab": "Punjabi", "Haryana": "Haryanvi",
    "Rajasthan": "Marwari", "Gujarat": "Gujarati", "Maharashtra": "Marathi",
    "Goa": "Konkani", "Karnataka": "Kannada", "Kerala": "Malayalam",
    "Tamil Nadu": "Tamil", "Andhra Pradesh": "Telugu", "Telangana": "Telugu",
    "Odisha": "Odia", "West Bengal": "Bengali",
    "Sikkim": "Nepali / Sikkimese",
    "Assam": "Assamese", "Arunachal Pradesh": "Local (varies)",
    "Nagaland": "Nagamese", "Manipur": "Meiteilon",
    "Mizoram": "Mizo", "Meghalaya": "Khasi / Garo", "Tripura": "Kokborok",
    "Madhya Pradesh": "Hindi (Malvi)", "Bihar": "Bhojpuri / Maithili",
    "Jharkhand": "Hindi / Santhali",
    "Uttar Pradesh": "Hindi (Awadhi / Bhojpuri)",
    "Chhattisgarh": "Chhattisgarhi",
}


def _sunrise_time(state: str, month: int) -> Optional[str]:
    """Approximate sunrise time (IST) by state + month for high-altitude POI."""
    # Rough month-of-year sunrise table for Indian Himalayan / hill destinations
    # in HH:MM 24h IST. Plain average; precise per-dest would need lat/lon.
    by_month = {
        1: "07:10", 2: "06:55", 3: "06:25", 4: "05:55",
        5: "05:30", 6: "05:20", 7: "05:25", 8: "05:45",
        9: "06:05", 10: "06:25", 11: "06:45", 12: "07:05",
    }
    base = by_month.get(month, "06:00")
    # NE shifts earlier by ~30 min vs north-west India
    if state in ("Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram",
                 "Meghalaya", "Assam", "Tripura", "Sikkim"):
        h, m = base.split(":")
        h, m = int(h), int(m) - 30
        if m < 0:
            h -= 1; m += 60
        return f"{h:02d}:{m:02d}"
    return base


def _nearest_landmark(dest: dict) -> Optional[str]:
    """Try to extract a landmark from the destination note/tagline."""
    note = (dest.get("note") or "") + " " + (dest.get("tagline") or "")
    # Crude — look for capitalized multi-word noun phrases
    import re
    matches = re.findall(r"\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\b", note)
    # Filter generic words
    skip = {"India", "Indian", "May", "Best", "The", "January", "February",
            "March", "April", "June", "July", "August", "September",
            "October", "November", "December", "Score", "Best Month",
            "North", "South", "East", "West"}
    candidates = [m for m in matches if m not in skip]
    return candidates[0] if candidates else None


def _month_hindi(month: int) -> str:
    return {1: "जनवरी", 2: "फ़रवरी", 3: "मार्च", 4: "अप्रैल", 5: "मई",
            6: "जून", 7: "जुलाई", 8: "अगस्त", 9: "सितंबर",
            10: "अक्टूबर", 11: "नवंबर", 12: "दिसंबर"}[month]


def _crowd_level(score: int) -> str:
    return {5: "low", 4: "manageable", 3: "moderate",
            2: "heavy", 1: "extreme"}.get(score, "moderate")


def _daily_cost_inr(state: str, score: int) -> int:
    """Heuristic daily-cost band by state + score (placeholder until API ships)."""
    base = {
        "Goa": 2500, "Kerala": 2200, "Himachal Pradesh": 1800,
        "Uttarakhand": 1500, "Jammu & Kashmir": 2000, "Ladakh": 2800,
        "Rajasthan": 1800, "Maharashtra": 2500, "Karnataka": 2000,
        "Tamil Nadu": 1800, "Sikkim": 2000, "Arunachal Pradesh": 2200,
        "Meghalaya": 1800, "Nagaland": 2000, "West Bengal": 1500,
    }.get(state, 1500)
    if score == 5:
        return base
    if score <= 2:
        return base - 400
    return base - 200


# ─────────────────────────────────────────────────────────────────────────────
# CSV LOADER
# ─────────────────────────────────────────────────────────────────────────────

def load_strategy() -> list:
    """Read all 25 strategy formats from CSV."""
    if not CSV_PATH.exists():
        raise FileNotFoundError(f"Strategy CSV not found: {CSV_PATH}")
    with open(CSV_PATH) as f:
        return list(csv.DictReader(f))


# ─────────────────────────────────────────────────────────────────────────────
# DATA AUTO-FILL — from a destination dict, build the placeholder substitutions
# ─────────────────────────────────────────────────────────────────────────────

def _change_note(state: str, score: int, elevation: int, month: int) -> str:
    """Heuristic per-state, per-month change_note (publishable natural language).

    Hand-tuned for the 6 auto-fillable formats so captions/videos don't render
    placeholders or robotic booleans. Each branch returns a short, specific,
    publishable phrase suitable for on-screen text overlay or caption use.
    """
    HILL_NORTH = ("Himachal Pradesh", "Uttarakhand", "Jammu & Kashmir",
                  "Ladakh", "Sikkim", "Arunachal Pradesh")
    HILL_SOUTH = ("Tamil Nadu", "Kerala", "Karnataka")
    PLAINS = ("Rajasthan", "Gujarat", "Uttar Pradesh", "Madhya Pradesh",
              "Bihar", "Haryana", "Punjab", "Delhi", "Chhattisgarh")
    NORTHEAST = ("Assam", "Meghalaya", "Nagaland", "Manipur", "Mizoram", "Tripura")
    COAST = ("Goa", "Maharashtra", "Andhra Pradesh", "Odisha", "West Bengal")

    high_alt = (elevation or 0) >= 2000

    # May-specific phrasing
    if month == 5:
        if state in HILL_NORTH:
            return ("snow cleared from upper passes — peak trekking window opens"
                    if high_alt
                    else "valley weather settled at 14-26°C — all routes stable")
        if state in HILL_SOUTH:
            return "pre-monsoon window holds — last clear days before June rains"
        if state in PLAINS:
            return f"heat peaks {38 if score <= 2 else 36}-42°C — go pre-dawn or skip"
        if state in NORTHEAST:
            return "pre-monsoon dry window — last reliable photo light before June"
        if state in COAST:
            return "off-season pricing — pre-monsoon, low crowd, cheap stays"

    # June-specific phrasing (monsoon onset)
    if month == 6:
        if state in HILL_NORTH:
            return "monsoon edge — lower valleys flood, upper passes still stable" if high_alt else "monsoon arriving — landslide-prone roads, plan flexibly"
        if state in HILL_SOUTH:
            return "monsoon active — Kerala/Coorg green-season starts, expect rain"
        if state in PLAINS:
            return "pre-monsoon furnace — 42-46°C peak heat, AC-only travel"
        if state in NORTHEAST:
            return "monsoon onset — flooding risk in Assam plains, hills steadier"
        if state in COAST:
            return "monsoon hits west coast first — Goa green, dramatic sea"

    # Generic fallback by score band
    if score >= 5:
        return "score holds firm — verified peak window this month"
    if score >= 4:
        return "score solid with minor caveats — check road conditions"
    if score >= 3:
        return "score mixed — go with flexible plans"
    if score >= 2:
        return "score has dropped — better windows exist nearby"
    return "score collapsed — skip this month, return when window reopens"


def _true_now_phrase(score: int) -> str:
    """Natural-language replacement for the raw boolean true_now field."""
    return {
        5: "Score holds firm",
        4: "Score solid",
        3: "Score mixed",
        2: "Score has dropped",
        1: "Score collapsed",
    }.get(score, "Score mixed")


def _still_skip_phrase(score: int) -> str:
    """Natural-language replacement for the raw boolean still_skip field."""
    if score >= 4:
        return "No — go now"
    if score == 3:
        return "Go with caveats"
    return "Yes — wait for next window"


def build_fill_data(dest: dict, today: date) -> dict:
    """Build {placeholder: value} dict from a destination object.

    Returns only the fields we can auto-fill. Fields not in the dict are left
    unfilled in the rendered template (with [MISSING_FIELD] markers).

    CHANGED 2026-05-19: replaced raw booleans (true_now=true/false,
    still_skip=yes/no) with natural-language phrases; added _change_note()
    heuristic so caption + video overlay text reads naturally, not robotically.
    """
    state = dest.get("state", "")
    name  = dest.get("name", "")
    score = dest.get("score") or 0
    elev  = dest.get("elevation_m") or 0
    month = today.month
    fill = {
        "dest_name": name,
        "state": state,
        "score": str(score),
        "month_name": calendar.month_name[month],
        "month": str(month),
        "month_hindi": _month_hindi(month),
        "altitude_m": str(dest.get("elevation_m", "")),
        "sunrise_time": _sunrise_time(state, month) or "",
        "nearest_landmark": _nearest_landmark(dest) or "",
        "anchor_city": ANCHOR_CITY.get(state, "Delhi"),
        "local_language": LOCAL_LANGUAGE.get(state, ""),
        "crowd_level": _crowd_level(score),
        "crowd_hindi": {"low": "कम भीड़", "manageable": "ठीक भीड़",
                        "moderate": "मध्यम भीड़", "heavy": "ज़्यादा भीड़",
                        "extreme": "बहुत भीड़"}.get(_crowd_level(score), ""),
        "daily_cost_inr": str(_daily_cost_inr(state, score)),
        "cost_inr": str(_daily_cost_inr(state, score)),
        "weather_hindi": {5: "एकदम सही मौसम", 4: "अच्छा मौसम",
                          3: "ठीक मौसम", 2: "मुश्किल मौसम",
                          1: "बहुत मुश्किल"}.get(score, ""),
        # Natural-language fillers (replace raw booleans 2026-05-19)
        "true_now": _true_now_phrase(score),
        "still_skip": _still_skip_phrase(score),
        "change_note": _change_note(state, score, elev, month),
        "verification_date": today.isoformat(),
        "english_one_liner": (dest.get("tagline") or "").split("—")[0].strip()[:60],
        "why_go": (dest.get("tagline") or "").split("—")[-1].strip()[:120],
        # Hindi reason — score-aware default that reads naturally
        "why_go_hindi": {
            5: "इस महीने सबसे बेहतर मौसम और हालत",
            4: "अच्छा महीना — कुछ चीज़ें ध्यान रखकर जाएँ",
            3: "ठीक है — पर बेहतर महीने भी हैं",
            2: "इस महीने ना जाएँ — मुश्किल हालत",
            1: "बिल्कुल ना जाएँ — रास्ते बंद/जोखिम है",
        }.get(score, "इस महीने जाने का सही समय जाँचें"),
        "duration": "",      # format-specific, left for editorial
    }
    # Drop empty strings so unfilled placeholders show up as [MISSING_FIELD]
    return {k: v for k, v in fill.items() if v}


# ─────────────────────────────────────────────────────────────────────────────
# PLACEHOLDER SUBSTITUTION
# ─────────────────────────────────────────────────────────────────────────────

import re
_PLACEHOLDER_RE = re.compile(r"\{([a-z0-9_]+)\}")


def render_template(template: str, fill: dict) -> tuple:
    """Replace {placeholder} with values. Returns (rendered, missing_fields).

    Unfilled placeholders are wrapped as [MISSING_<name>] so they're visible
    in the brief and the user knows what to add manually.
    """
    missing = []
    def _sub(m):
        key = m.group(1)
        if key in fill:
            return str(fill[key])
        missing.append(key)
        return f"[MISSING_{key}]"
    rendered = _PLACEHOLDER_RE.sub(_sub, template)
    return rendered, sorted(set(missing))


# ─────────────────────────────────────────────────────────────────────────────
# ELIGIBILITY — which formats can run today given data + skip conditions?
# ─────────────────────────────────────────────────────────────────────────────

def required_fields(row: dict) -> list:
    return [f.strip() for f in row["data_inputs"].split("|") if f.strip()]


def auto_fillable_pct(row: dict, fill: dict) -> float:
    needed = required_fields(row)
    if not needed:
        return 1.0
    filled = sum(1 for f in needed if f in fill)
    return filled / len(needed)


def check_skip_conditions(row: dict, dest: dict, fill: dict) -> Optional[str]:
    """Return skip reason if format should NOT run for this destination.

    Reads the `notes` column for skip rules + adds domain heuristics.
    """
    notes = (row.get("notes") or "").lower()
    state = (dest.get("state") or "")
    name = (dest.get("name") or "").lower()
    elev = dest.get("elevation_m") or 0

    fmt = row["format_id"]

    # v2_pov_slow_morning — needs high-altitude POI
    if fmt == "v2_pov_slow_morning":
        if state in ("Goa",) or "plain" in name.lower():
            return "plain/coastal — needs high-altitude POI"
        if not fill.get("sunrise_time") or not fill.get("nearest_landmark"):
            return "missing sunrise_time or nearest_landmark"
        if (elev or 0) < 800:
            return f"altitude {elev}m too low (needs ≥800m)"

    # v2_thali_close_up — needs verified eatery data (not in current API)
    if fmt == "v2_thali_close_up":
        return "eatery data not available in API yet"

    # v2_route_animated_map — needs ≥4 verified stops
    if fmt == "v2_route_animated_map":
        return "routes API not wired to format (needs ≥4 stops)"

    # v2_wildlife_moment — needs verified wildlife sighting
    if fmt == "v2_wildlife_moment":
        return "wildlife sighting data not available in API"

    # v2_budget_receipt — must NOT fabricate cost; needs verified receipt
    if fmt == "v2_budget_receipt":
        return "needs verified per-day cost receipt (no fabrication)"

    # v2_cost_vs_feeling — needs verified cost + specific feeling phrase
    if fmt == "v2_cost_vs_feeling":
        return "needs verified cost + specific feeling phrase (editorial)"

    # v2_ugc_spotlight — needs creator handle + permission
    if fmt == "v2_ugc_spotlight":
        return "needs creator submission + permission (community sourced)"

    # v2_series_episode — needs pre-scheduled episode chain
    if fmt == "v2_series_episode":
        return "needs episode chain pre-scheduled (multi-day series)"

    # v2_yt_food_capital — needs 4 verified dish/eatery/price triples
    if fmt == "v2_yt_food_capital":
        return "needs 4 verified eateries with dishes + prices (editorial)"

    # v2_yt_local_etiquette — needs verified local contributor
    if fmt == "v2_yt_local_etiquette":
        return "needs verified local contributor (editorial)"

    # v2_yt_silent_pov — needs real captured ambient
    if fmt == "v2_yt_silent_pov":
        return "needs real captured ambient audio (editorial)"

    # v2_festival_alert_sensory — needs festival data with specific signature
    if fmt == "v2_festival_alert_sensory":
        return "needs festival API row with start_date + venue + visual_signature"

    # v2_tourist_trap_split — needs trap pair data
    if fmt == "v2_tourist_trap_split":
        return "needs trap_name + alternative_name + photo_window (editorial)"

    # v2_yt_route_5_stops — same as route_animated_map
    if fmt == "v2_yt_route_5_stops":
        return "routes API not wired (needs ≥5 stops)"

    # v2_women_solo_brief_video — sensitive, needs real verified data
    if fmt == "v2_women_solo_brief_video":
        return "needs verified solo-female-traveller field data"

    # v2_arrival_intel_video — needs IATA + arrival logistics data
    if fmt == "v2_arrival_intel_video":
        if not name:
            return "needs IATA + arrival logistics (city-only format)"

    # v2_hidden_gem_reveal_atmo — needs dest with population + near-dest pair
    if fmt == "v2_hidden_gem_reveal_atmo":
        return "needs verified low-population gem + nearby anchor"

    # v2_myth_bust_oneline — needs specific myth + source citation
    if fmt == "v2_myth_bust_oneline":
        return "needs specific myth_question + verified source_note"

    # v2_texture_macro — needs specific texture subject (manual)
    if fmt == "v2_texture_macro":
        return "needs specific texture_subject (creative manual pick)"

    # v2_local_knows — needs verified trap + local alternative
    if fmt == "v2_local_knows":
        return "needs trap_landmark + local_alternative (editorial)"

    # v2_yt_hindi_3things — needs 3 verified Hindi facts
    if fmt == "v2_yt_hindi_3things":
        return "needs 3 verified Hindi facts (editorial)"

    # v2_weekend_escape_map — needs drive_hours + itinerary
    if fmt == "v2_weekend_escape_map":
        if not fill.get("anchor_city"):
            return "no anchor_city for this state"

    # v2_hindi_score_card / v2_score_card_pov / v2_cost_index_handwritten —
    # all auto-fillable from API + heuristics
    return None


# ─────────────────────────────────────────────────────────────────────────────
# FREQ + ANTI-REPEAT TRACKERS (read state.json)
# ─────────────────────────────────────────────────────────────────────────────

def load_history(state_path: Path = STATE_FILE) -> list:
    if not state_path.exists():
        return []
    s = json.loads(state_path.read_text())
    return s.get("strategy_history", [])


def save_history(history: list, state_path: Path = STATE_FILE):
    if not state_path.exists():
        state_path.write_text("{}")
    s = json.loads(state_path.read_text())
    s["strategy_history"] = history[-200:]  # keep last 200
    state_path.write_text(json.dumps(s, indent=2))


def format_freq_this_month(history: list, format_id: str, today: date) -> int:
    """How many times has this format been used this calendar month?"""
    return sum(1 for h in history
               if h.get("format_id") == format_id
               and h.get("date", "").startswith(today.strftime("%Y-%m")))


def days_since_last_use(history: list, format_id: str, today: date) -> int:
    """Days since this format last ran (or 9999 if never)."""
    last = max((h.get("date") for h in history
                if h.get("format_id") == format_id), default=None)
    if not last:
        return 9999
    try:
        return (today - date.fromisoformat(last)).days
    except Exception:
        return 9999


def days_since_dest_last_used(history: list, dest_id: str, today: date) -> int:
    last = max((h.get("date") for h in history
                if h.get("dest_id") == dest_id), default=None)
    if not last:
        return 9999
    try:
        return (today - date.fromisoformat(last)).days
    except Exception:
        return 9999


# ─────────────────────────────────────────────────────────────────────────────
# DESTINATION FETCH
# ─────────────────────────────────────────────────────────────────────────────

def fetch_destinations(month: int, limit: int = 100) -> list:
    """Fetch month's destinations. Default limit=100 (API returns top-20 without it)."""
    import requests
    try:
        r = requests.get(
            f"https://nakshiq.com/api/content?month={month}&limit={limit}",
            timeout=10,
        )
        return r.json().get("data", [])
    except Exception as e:
        sys.stderr.write(f"[strategy_engine] fetch_destinations failed: {e}\n")
        return []


# ─────────────────────────────────────────────────────────────────────────────
# PILLAR BALANCE
# ─────────────────────────────────────────────────────────────────────────────

PILLARS = ("moment", "discovery", "verification", "anti_trap", "verdict")


def recent_pillar_distribution(history: list, days: int = 14) -> dict:
    cutoff = (date.today() - timedelta(days=days)).isoformat()
    recent = [h for h in history if h.get("date", "") >= cutoff]
    dist = {p: 0 for p in PILLARS}
    for h in recent:
        p = h.get("pillar")
        if p in dist:
            dist[p] += 1
    return dist


def pillar_weight(pillar: str, dist: dict) -> float:
    """Lower count → higher weight. Encourages diversity."""
    total = sum(dist.values()) or 1
    p_count = dist.get(pillar, 0)
    # 1.0 if pillar is underused, 0.3 if heavily overused
    return max(0.3, 1.0 - (p_count / total) * 2)


# ─────────────────────────────────────────────────────────────────────────────
# THE PICKER
# ─────────────────────────────────────────────────────────────────────────────

def pick_format_and_destination(
    today: date = None,
    force_format: Optional[str] = None,
    force_dest_id: Optional[str] = None,
    explain: bool = False,
) -> dict:
    """Return {format, destination, fill, missing_fields, prompts, reasoning}."""
    today = today or date.today()
    formats = load_strategy()
    history = load_history()
    destinations = fetch_destinations(today.month)
    if not destinations:
        return {"error": "No destinations fetched from API"}

    dist = recent_pillar_distribution(history, days=14)

    # Filter destinations: prefer score ≥3, not posted in last 7 days
    recent_dest_ids = set(
        h.get("dest_id") for h in history
        if h.get("date", "") >= (today - timedelta(days=7)).isoformat()
    )
    candidate_dests = [
        d for d in destinations
        if (d.get("score") or 0) >= 3
        and d.get("id") not in recent_dest_ids
    ]
    if not candidate_dests:
        candidate_dests = destinations  # fall back to anything

    reasoning = []

    # Try each format in priority order against each candidate dest
    eligible = []
    for row in formats:
        fmt_id = row["format_id"]

        # Force override
        if force_format and fmt_id != force_format:
            continue

        # Freq cap check
        freq_used = format_freq_this_month(history, fmt_id, today)
        freq_cap = int(row.get("max_freq_per_month") or 99)
        if freq_used >= freq_cap:
            if explain:
                reasoning.append(f"  ✗ {fmt_id}: freq cap reached ({freq_used}/{freq_cap})")
            continue

        # Anti-repeat: format not used in last 5 days
        days_ago = days_since_last_use(history, fmt_id, today)
        if days_ago < 5 and not force_format:
            if explain:
                reasoning.append(f"  ✗ {fmt_id}: used {days_ago}d ago (need ≥5d)")
            continue

        # Find best destination for this format
        for dest in candidate_dests:
            if force_dest_id and dest.get("id") != force_dest_id:
                continue
            fill = build_fill_data(dest, today)
            skip_reason = check_skip_conditions(row, dest, fill)
            if skip_reason:
                continue
            # Score the (format, dest) pair
            fill_pct = auto_fillable_pct(row, fill)
            pillar = row.get("pillar")
            p_weight = pillar_weight(pillar, dist)
            dest_days = days_since_dest_last_used(history, dest.get("id"), today)
            dest_freshness = min(1.0, dest_days / 14.0)
            dest_score = (dest.get("score") or 0) / 5.0
            score = (fill_pct * 0.35
                     + p_weight * 0.25
                     + dest_freshness * 0.20
                     + dest_score * 0.20)
            eligible.append({
                "format": row,
                "dest": dest,
                "fill": fill,
                "fill_pct": fill_pct,
                "pillar_weight": p_weight,
                "dest_freshness": dest_freshness,
                "score": score,
            })

    if not eligible:
        return {
            "error": "No eligible format/dest pair found",
            "reasoning": reasoning if explain else None,
            "current_pillar_dist": dist,
        }

    # Sort by score desc, take top
    eligible.sort(key=lambda x: -x["score"])
    pick = eligible[0]

    if explain:
        reasoning.append("")
        reasoning.append(f"=== Top 5 (sorted by score) ===")
        for e in eligible[:5]:
            f, d = e["format"], e["dest"]
            reasoning.append(
                f"  {e['score']:.3f} | {f['format_id']} × {d.get('name')} "
                f"(fill={e['fill_pct']:.0%}, pillar_w={e['pillar_weight']:.2f}, "
                f"dest_fresh={e['dest_freshness']:.2f})"
            )

    # Render templates with fill data
    fmt = pick["format"]
    fill = pick["fill"]
    hook, missing_hook = render_template(fmt["hook_template"], fill)
    caption, missing_cap = render_template(fmt["caption_template"], fill)
    cta, missing_cta = render_template(fmt["cta_template"], fill)
    pomelli, missing_pp = render_template(fmt["pomelli_prompt"], fill)
    image, missing_img = render_template(fmt["image_prompt"], fill)
    video, missing_vid = render_template(fmt["video_prompt"], fill)

    missing = sorted(set(missing_hook + missing_cap + missing_cta
                         + missing_pp + missing_img + missing_vid))

    return {
        "format_id": fmt["format_id"],
        "post_type": fmt["post_type"],
        "platform": fmt["platform"],
        "pillar": fmt["pillar"],
        "inspired_by": fmt["inspired_by"],
        "asset_aspect": fmt["asset_aspect"],
        "destination": {
            "id": pick["dest"].get("id"),
            "name": pick["dest"].get("name"),
            "state": pick["dest"].get("state"),
            "score": pick["dest"].get("score"),
            "elevation_m": pick["dest"].get("elevation_m"),
        },
        "hook": hook,
        "caption": caption,
        "cta": cta,
        "prompts": {
            "pomelli": pomelli,
            "image": image,
            "video": video,
        },
        "fill_data": fill,
        "missing_fields": missing,
        "notes": fmt.get("notes"),
        "scoring": {
            "fill_pct": pick["fill_pct"],
            "pillar_weight": pick["pillar_weight"],
            "dest_freshness": pick["dest_freshness"],
            "total": pick["score"],
        },
        "current_pillar_dist": dist,
        "reasoning": reasoning if explain else None,
        "candidate_count": len(eligible),
    }


# ─────────────────────────────────────────────────────────────────────────────
# BRIEF RENDERER
# ─────────────────────────────────────────────────────────────────────────────

def render_brief(pick: dict, today: date) -> str:
    """Markdown brief — the user (or asset-creation agent) acts from this."""
    if pick.get("error"):
        return f"# Strategy brief — {today.isoformat()}\n\nERROR: {pick['error']}\n"

    d = pick["destination"]
    md = []
    md.append(f"# Daily content brief — {today.isoformat()}")
    md.append("")
    md.append(f"**Pick:** `{pick['format_id']}` ({pick['inspired_by']}) — "
              f"{pick['pillar']} pillar · {pick['post_type']} · {pick['asset_aspect']}")
    md.append(f"**Destination:** {d['name']} ({d['state']}) · score {d['score']}/5 · {d['elevation_m']}m")
    md.append(f"**Platform:** {pick['platform']}")
    md.append("")
    md.append(f"**Pick score:** {pick['scoring']['total']:.3f} "
              f"(fill={pick['scoring']['fill_pct']:.0%}, "
              f"pillar_w={pick['scoring']['pillar_weight']:.2f}, "
              f"dest_fresh={pick['scoring']['dest_freshness']:.2f}) · "
              f"chose 1 of {pick['candidate_count']} eligible pairs")

    if pick["missing_fields"]:
        md.append("")
        md.append(f"### ⚠️  Missing fields (fill manually before publish)")
        md.append("")
        for f in pick["missing_fields"]:
            md.append(f"- `{f}`")

    md.append("")
    md.append("### Hook")
    md.append("")
    md.append(f"> {pick['hook']}")
    md.append("")
    md.append("### Caption")
    md.append("")
    md.append(pick["caption"])
    md.append("")
    md.append("### CTA")
    md.append("")
    md.append(f"> {pick['cta']}")
    md.append("")
    md.append("### Prompts (ready to paste)")
    md.append("")
    md.append("#### Pomelli prompt → labs.google.com Pomelli")
    md.append("```")
    md.append(pick["prompts"]["pomelli"])
    md.append("```")
    md.append("")
    md.append("#### Image prompt → ChatGPT-4o / Nano Banana / Midjourney")
    md.append("```")
    md.append(pick["prompts"]["image"])
    md.append("```")
    md.append("")
    md.append("#### Video prompt → Veo / Sora / Runway / Flow")
    md.append("```")
    md.append(pick["prompts"]["video"])
    md.append("```")
    md.append("")
    md.append("### File naming")
    md.append("")
    md.append(f"- Image: `social_image_library/{pick['format_id']}-{d['id']}.jpg`")
    md.append(f"- Video: R2 `{pick['format_id']}-{d['id']}.mp4`")
    md.append("")
    if pick.get("notes"):
        md.append(f"### Format notes")
        md.append("")
        md.append(pick["notes"])
    if pick.get("reasoning"):
        md.append("")
        md.append("### Picker reasoning")
        md.append("")
        for line in pick["reasoning"]:
            md.append(line)
    return "\n".join(md)


def record_pick(pick: dict, today: date):
    """Add this pick to strategy_history in state.json."""
    history = load_history()
    history.append({
        "date": today.isoformat(),
        "format_id": pick.get("format_id"),
        "pillar": pick.get("pillar"),
        "dest_id": pick.get("destination", {}).get("id"),
    })
    save_history(history)


# ─────────────────────────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser(description="NakshIQ Strategic Content Engine")
    ap.add_argument("--format", help="Force a specific format_id")
    ap.add_argument("--dest", help="Force a specific destination id")
    ap.add_argument("--list-eligible", action="store_true",
                    help="List all formats with eligibility status and exit")
    ap.add_argument("--explain", action="store_true",
                    help="Show picker reasoning in the brief")
    ap.add_argument("--no-record", action="store_true",
                    help="Don't write the pick to state.json (dry-run)")
    ap.add_argument("--out", help="Write brief to this path (default: data/strategy_briefs/YYYY-MM-DD.md)")
    args = ap.parse_args()

    today = date.today()

    if args.list_eligible:
        # Show all formats with their skip status for today's top dest
        formats = load_strategy()
        history = load_history()
        destinations = fetch_destinations(today.month)
        if not destinations:
            print("No destinations from API.")
            sys.exit(1)
        top_dest = sorted(destinations, key=lambda d: -(d.get("score") or 0))[0]
        print(f"Eligibility for top dest: {top_dest.get('name')} ({top_dest.get('state')})")
        print()
        for row in formats:
            fill = build_fill_data(top_dest, today)
            skip = check_skip_conditions(row, top_dest, fill)
            freq = format_freq_this_month(history, row["format_id"], today)
            cap = int(row.get("max_freq_per_month") or 99)
            days_ago = days_since_last_use(history, row["format_id"], today)
            mark = "✗" if skip else "✓"
            extra = []
            if skip:
                extra.append(f"skip: {skip}")
            if freq >= cap:
                extra.append(f"freq {freq}/{cap}")
            if days_ago < 5:
                extra.append(f"used {days_ago}d ago")
            print(f"  {mark} {row['format_id']:<32} {row['pillar']:<12} "
                  f"{', '.join(extra) if extra else 'OK'}")
        sys.exit(0)

    pick = pick_format_and_destination(
        today=today,
        force_format=args.format,
        force_dest_id=args.dest,
        explain=args.explain,
    )

    brief = render_brief(pick, today)

    out_path = Path(args.out) if args.out else (BRIEF_DIR / f"{today.isoformat()}.md")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(brief)

    print(brief)
    print()
    print(f"Brief written to: {out_path}")

    if not pick.get("error") and not args.no_record:
        record_pick(pick, today)
        print(f"Pick recorded to state.json strategy_history.")


if __name__ == "__main__":
    main()
