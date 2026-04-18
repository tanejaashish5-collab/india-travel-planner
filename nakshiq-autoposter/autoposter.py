#!/usr/bin/env python3
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
import logging
import requests
from datetime import datetime, timezone, date, timedelta
from pathlib import Path

# ─────────────────────────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────────────────────────

OUTSTAND_API_KEY = os.environ.get("OUTSTAND_API_KEY", "")
OUTSTAND_BASE    = "https://api.outstand.so"
NAKSHIQ_BASE     = "https://nakshiq.com/api/content"
STATE_FILE       = Path(__file__).parent / "state.json"
LOG_FILE         = Path(__file__).parent / "autoposter.log"

# IG feed format per weekday (0=Mon … 6=Sun)
FORMAT_SCHEDULE = {
    0: "score_card",            # Monday
    1: "reality_check",         # Tuesday  (tourist_trap falls back to this if no traps)
    2: "data_carousel",         # Wednesday
    3: "score_card",            # Thursday
    4: "reality_check",         # Friday
    5: "collection_spotlight",  # Saturday
    6: "infrastructure_truth",  # Sunday   (falls back to score_card if no best dest)
}

# Facebook format overrides — FB differs from IG on these days
FB_FORMAT_OVERRIDES = {
    3: "collection_spotlight",  # Thu: IG=score_card, FB=collection_spotlight
}
# 1st Saturday of the month → FB override = monthly_forecast (applied at runtime)
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
    "methodology_roads",
    "methodology_family",
    "methodology_altitude",
    "methodology_crowds",
    "skip_list",
    "chinese_wall",
    "four_questions",
    "data_provenance",
    "same_place_12_months",
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

# Total destinations Nakshiq scores — populated from /stats on each sync.
# Fallback keeps copy sensible if the stats call fails for any reason.
TOTAL_DESTINATIONS = 260

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
# STATE MANAGER
# ─────────────────────────────────────────────────────────────────────────────

def load_state() -> dict:
    if STATE_FILE.exists():
        with open(STATE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {
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
    }

def save_state(state: dict):
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, default=str, ensure_ascii=False)

def already_posted_today(state: dict, key: str) -> bool:
    return state["posted_today"].get(key) == date.today().isoformat()

def mark_posted(state: dict, account_id: str, destination_id: str,
                fmt: str, post_id: str, platform: str, has_media: bool):
    today = date.today().isoformat()
    state["posted_today"][account_id] = today
    cutoff = (date.today() - timedelta(days=14)).isoformat()
    state["posted_destinations"] = [
        d for d in state["posted_destinations"] if d["date"] >= cutoff
    ]
    state["posted_destinations"].append({"destination_id": destination_id, "date": today})
    if account_id not in state["posted_formats"]:
        state["posted_formats"][account_id] = []
    state["posted_formats"][account_id] = (
        state["posted_formats"][account_id][-20:] + [fmt]
    )
    state["post_log"].append({
        "timestamp":  datetime.now(timezone.utc).isoformat(),
        "date":       today,
        "platform":   platform,
        "account_id": account_id,
        "post_id":    post_id,
        "destination": destination_id,
        "format":     fmt,
        "has_media":  has_media,
    })
    state["post_log"] = state["post_log"][-500:]

def recently_used_destinations(state: dict) -> set:
    return {d["destination_id"] for d in state.get("posted_destinations", [])}


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
                       key: str = "id") -> list:
    """
    Return `items` sorted so the oldest-never-used candidates come first.
    Callers pick [0] (or filter further).

    Sort key: (has_been_used_bool, last_used_date_iso). Never-used → (False, "")
    sorts ahead of everything; among-used items, oldest date sorts first.
    """
    bucket = theme_bucket(state, dimension)

    def _id(item):
        return item.get(key) if isinstance(item, dict) else str(item)

    def _rank(item):
        hist = bucket.get(_id(item)) or []
        if not hist:
            return (0, "")           # never used — highest priority
        return (1, hist[-1])          # used — earlier last-use sorts first

    return sorted(items, key=_rank)


def mark_theme_used(state: dict, dimension: str, item_id: str):
    """Stamp today's date on this item in the given dimension."""
    today = date.today().isoformat()
    bucket = theme_bucket(state, dimension)
    hist = bucket.setdefault(item_id, [])
    if not hist or hist[-1] != today:
        hist.append(today)
    # Keep history bounded (365 days per item is plenty)
    bucket[item_id] = hist[-365:]


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

def sync_all_content() -> dict:
    log.info("── Syncing Nakshiq content ──────────────────────────────")
    month = datetime.now().month
    since = (date.today() - timedelta(days=7)).isoformat()
    content = {
        "stats":        nakshiq_fetch("stats"),
        "destinations": nakshiq_fetch("destinations", {"month": month, "min_score": 4}),
        # Skip List / Tourist-Trap posts need destinations scoring LOW this month.
        # Fetch a wider slice (limit=100) so the low-scored tail is captured —
        # default limit=20 tends to surface only 5/5 destinations in peak months.
        "destinations_low": nakshiq_fetch("destinations",
                                          {"month": month, "min_score": 0, "limit": 100}),
        "articles":     nakshiq_fetch("articles",     {"since": since}),
        "traps":        nakshiq_fetch("traps"),
        "festivals":    nakshiq_fetch("festivals",    {"month": month}),
        "collections":  nakshiq_fetch("collections"),
        # `routes` is not yet exposed by the Nakshiq content API — the format
        # machinery below is wired and will activate the day `type=routes`
        # returns data. No upstream error in the meantime.
        "routes":       {},
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
                          content: dict | None = None) -> dict | None:
    """
    Pick the highest-scoring destination from the pool, preferring ones whose
    hero image actually resolves (Nakshiq's catalog has broken image URLs for
    some not-yet-photographed destinations). If nothing in the pool has a valid
    image, fall back to the original scoring pool without the image filter.
    """
    fresh = [d for d in destinations if d["id"] not in used]
    pool  = fresh if fresh else destinations
    if not pool:
        return None

    # Prefer destinations with a verified image; fall back if none qualify.
    if content is not None:
        valid_image_pool = [d for d in pool if check_image_available(d, content)]
        if valid_image_pool:
            pool = valid_image_pool

    return max(pool, key=lambda d: (
        d.get("score", 0)
        + contrarian_score(d) * 0.5
        + (0.3 if d.get("note") else 0)
        + (0.2 if d.get("image") else 0)
        + (0.4 if d.get("video") else 0)   # bonus for video content
    ))

def pick_format(weekday: int, traps: list) -> str:
    if date.today().day <= 7 and weekday == 0:
        return "monthly_forecast"
    fmt = FORMAT_SCHEDULE.get(weekday, "score_card")
    if fmt == "tourist_trap"         and not traps: fmt = "reality_check"
    return fmt

# ─────────────────────────────────────────────────────────────────────────────
# COPY WRITERS
# ─────────────────────────────────────────────────────────────────────────────

def month_name() -> str:
    return datetime.now().strftime("%B")

def hashtag(*tags: str) -> str:
    """Join tags into #tags, filtering out brand-voice-banned entries."""
    clean = [t for t in tags if t and t not in BANNED_HASHTAGS]
    return " ".join(f"#{t.replace(' ', '')}" for t in clean)


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

def dest_url(dest: dict) -> str:
    """Return the deep-link URL for a destination (falls back to /explore)."""
    return (dest.get("url") or f"https://nakshiq.com/en/destination/{dest['id']}").strip()


def copy_score_card(dest: dict, platform: str) -> str:
    name  = dest["name"]
    score = dest["score"]
    elev  = dest["elevation_m"]
    state = dest["state"]
    tag   = dest["tagline"]
    note  = (dest.get("note") or "").strip()
    url   = dest_url(dest)
    stars = "★" * score + "☆" * (5 - score)
    mon   = month_name().upper()
    tags  = hashtag("NakshIQ", name, state, "IndiaTravelData",
                    "DataDrivenTravel", "5outof5", f"{month_name()}Travel")
    if platform == "facebook":
        return (
            f"{name.upper()} IN {mon}: {score}/5  {stars}\n\n"
            f"↑ {elev:,}m · {state}\n\n{tag}\n\n"
            + (f"{note}\n\n" if note else "")
            + f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly. Not a blog post — live data.\n\n"
            f"Full {name} data → {url}\n\n{tags}"
        ).strip()
    else:
        return (
            f"{name.upper()} · {mon}\n"
            f"{stars} {score}/5 · ↑{elev:,}m · {state}\n\n{tag}\n\n"
            + (f"{note}\n\n" if note else "")
            + f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly — actual data, not aspirational content.\n\n"
            f"Save this. {name} detail → {url}\n\n{tags}"
        ).strip()

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
    url  = dest_url(b)
    tags = hashtag("NakshIQ", "RealityCheck", b["name"], a["name"],
                   "IndiaTravelData", "SkipTheCrowd", "DataDrivenTravel",
                   b["state"], f"{month_name()}Travel")
    if platform == "facebook":
        body = (
            f"REALITY CHECK — {month_name().upper()} {date.today().year}\n\n"
            f"Both score {a['score']}/5 this month. Same region. Very different experience.\n\n"
            f"❌ {a['name'].upper()} (↑{a['elevation_m']:,}m)\n{a['tagline']}\n\n"
            f"✅ {b['name'].upper()} (↑{b['elevation_m']:,}m)\n{b['tagline']}\n"
            + (f"{note}\n\n" if note else "\n")
            + f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly — same score, context is everything.\n\n"
            f"Go deep on {b['name']} → {url}\n\n{tags}"
        ).strip()
    else:
        body = (
            f"SAME SCORE. DIFFERENT SATURDAY.\n\n"
            f"{a['name']} and {b['name']} both score {a['score']}/5 this {month_name()}.\n\n"
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
    tags = hashtag("NakshIQ", "IndiaTravelData", f"{month_name()}Travel",
                   "DataDrivenTravel", "5outof5", "NorthIndia")
    explore_url = "https://nakshiq.com/en/explore"
    if platform == "facebook":
        return (
            f"{month_name().upper()}'S REAL 5/5 DESTINATIONS\n\n"
            f"NakshIQ scored {TOTAL_DESTINATIONS} destinations this {month_name()}. 20 hit 5/5. "
            f"Most travelers are booking the same 4.\n\n"
            f"Here's what the data actually shows:\n\n{lines}\n\n"
            f"Every score is monthly — 5/5 in {month_name()} may be 2/5 in August.\n\n"
            f"Full ranked list → {explore_url}\n\n{tags}"
        ).strip()
    else:
        return (
            f"{month_name().upper()}'S 5/5 PICKS\n(Save — the window closes fast)\n\n"
            f"{lines}\n\n"
            f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly. These are {month_name()}'s facts.\n\n"
            f"↓ Full scores → {explore_url}\n\n{tags}"
        ).strip()

def copy_tourist_trap(trap: dict, platform: str) -> str:
    name = trap.get("name", "This destination")
    desc = trap.get("description", "")
    tags = hashtag("NakshIQ", "TouristTrap", "IndiaTravelData",
                   "DataDrivenTravel", "TravelSmart", f"{month_name()}Travel")
    return (
        f"{'TOURIST TRAP' if platform == 'facebook' else '🚩 TOURIST TRAP'} — {name.upper()}\n\n"
        f"{desc}\n\n"
        f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly. Some score low for a reason.\n\n"
        f"Better alternatives → https://nakshiq.com/en/tourist-traps\n\n{tags}"
    ).strip()

def copy_infrastructure_truth(dest: dict, platform: str) -> str:
    note = (dest.get("note") or dest.get("tagline") or "").strip()
    url  = dest_url(dest)
    tags = hashtag("NakshIQ", "InfrastructureTruth", dest["name"], "RoadTrip",
                   "IndiaTravelData", "KnowBeforeYouDrive", f"{month_name()}Travel", dest["state"])
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
    explore_url = "https://nakshiq.com/en/explore"
    tags = hashtag("NakshIQ", f"{month_name()}Forecast", "IndiaTravelData",
                   "DataDrivenTravel", "NorthIndia", f"{month_name()}Travel", "5outof5")
    return (
        f"📊 {month_name().upper()} FORECAST — NakshIQ Monthly Update\n\n"
        f"{TOTAL_DESTINATIONS} destinations re-scored. This month's top 5/5 picks:\n\n{lines}\n\n"
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
    coll_url  = (collection.get("url") or
                 f"https://nakshiq.com/en/collections/{collection['id']}").strip()
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
    tags       = hashtag("NakshIQ", *coll_tags, "IndiaTravelData", "DataDrivenTravel")
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
    name      = festival.get("name", "Festival")
    desc      = (festival.get("description") or "").strip()
    dest_name = festival.get("destination_name") or "India"
    did       = festival.get("destination_id")
    deep_url  = (dest_map[did]["url"] if did in dest_map else
                 (festival.get("url") or "https://nakshiq.com/en/festivals")).strip()
    tags = hashtag("NakshIQ", name, dest_name,
                   "IndiaFestivals", "IndiaTravelData", f"{month_name()}Travel")
    emoji = "🎪" if platform == "facebook" else "🪔"
    return (
        f"{emoji} {name.upper()} — {month_name().upper()}\n\n"
        f"📍 {dest_name}\n\n"
        f"{desc}\n\n"
        f"Plan your trip around it → {deep_url}\n\n{tags}"
    ).strip()


def copy_kids_intel(dest: dict, platform: str) -> str:
    name       = dest["name"]
    state      = dest["state"]
    tag        = dest["tagline"]
    note       = (dest.get("note") or "").strip()
    elev       = dest["elevation_m"]
    difficulty = (dest.get("difficulty") or "moderate").lower()
    url        = dest_url(dest)
    if difficulty == "easy" and elev < 2500:
        verdict = "Kid-friendly. Low altitude, easy trails."
    elif difficulty == "easy":
        verdict = "Easy destination — watch altitude with kids under 10."
    elif elev < 2000:
        verdict = "Moderate difficulty. Older kids (10+) do fine."
    else:
        verdict = "Challenging terrain + altitude. Best for teens or older."
    tags = hashtag("NakshIQ", "FamilyTravel", "KidsTravel", "IndiaWithKids",
                   name, state, "IndiaTravelData")
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
            f"Full methodology: nakshiq.com/methodology\n\n"
            f"{TOTAL_DESTINATIONS} destinations. Scored monthly. Zero paid placements.\n\n"
            + hashtag("NakshIQ", "Methodology", "IndiaTravelData",
                      "NoPaidPlacements", "DataDrivenTravel")
        ).strip()
    return (
        f"{c['title']}\n\n"
        f"{signals}\n\n"
        f"{c['closing']}\n\n"
        f"↓ Full methodology → nakshiq.com/methodology\n\n"
        + hashtag("NakshIQ", "Methodology", "IndiaTravelData",
                  "NoPaidPlacements", "DataDrivenTravel")
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
    url     = dest_url(dest)
    this_mo = month_name().upper()

    if forward_month and forward_score is not None:
        # Forward-looking Skip List: "5/5 now but dropping to 2/5 in July"
        current_score = dest.get("score", 0)
        header = (f"🚩 UPCOMING SKIP LIST — {forward_month.upper()}\n\n"
                  f"{name.upper()} ({state}): {current_score}/5 this {this_mo.title()}.\n"
                  f"{forward_score}/5 in {forward_month}.")
    else:
        # Standard Skip List: destination scoring low THIS month
        score  = dest.get("score", 0)
        header = (f"🚩 SKIP LIST — {this_mo} {date.today().year}\n\n"
                  f"{name.upper()} ({state}): {score}/5 this month.")

    if platform == "facebook":
        return (
            f"{header}\n\n"
            f"{note}\n\n"
            f"Why we're publishing this: if we won't tell you when NOT to go, nobody will.\n"
            f"Other sites are paid to say every place is worth visiting.\n"
            f"We're paid by nobody.\n\n"
            f"Better alternatives → https://nakshiq.com/en/tourist-traps\n\n"
            + hashtag("NakshIQ", "SkipList", "TravelHonesty",
                      "NoPaidPlacements", f"{month_name()}Travel")
        ).strip()
    return (
        f"{header}\n\n"
        f"{note}\n\n"
        f"If we won't tell you when not to go, nobody will.\n"
        f"Zero paid placements. Ever.\n\n"
        f"↓ Better picks → {url}\n\n"
        + hashtag("NakshIQ", "SkipList", "TravelHonesty", "NoPaidPlacements")
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
            f"Our editorial policy is published: nakshiq.com/editorial-policy\n\n"
            f"This isn't marketing. It's the reason NakshIQ exists.\n\n"
            + hashtag("NakshIQ", "EditorialIntegrity", "NoPaidPlacements",
                      "TravelWithIQ", "DataDrivenTravel")
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
        f"Editorial policy → nakshiq.com/editorial-policy\n\n"
        + hashtag("NakshIQ", "EditorialIntegrity", "NoPaidPlacements",
                  "TravelWithIQ")
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
            f"nakshiq.com/en/explore\n\n"
            + hashtag("NakshIQ", "TravelWithIQ", "DataDrivenTravel",
                      "IndiaTravel", "NoPaidPlacements")
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
        f"↓ nakshiq.com/en/explore\n\n"
        + hashtag("NakshIQ", "TravelWithIQ", "DataDrivenTravel")
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
    url   = dest_url(dest)
    if platform == "facebook":
        return (
            f"WHY {name.upper()} SCORES {score}/5 IN {mon.upper()}\n\n"
            f"This isn't a vibe check. Here's what went into the score:\n\n"
            f"• Elevation: ↑ {elev:,}m (altitude tolerance factor)\n"
            f"• State: {state}\n"
            f"• Difficulty: {diff}\n"
            f"• {mon} note: {note or tag}\n\n"
            f"Our methodology is public. Every input is measurable.\n"
            f"No advertiser touches the score. No influencer gets a\n"
            f"discount for a glowing review. No tourism board subsidy.\n\n"
            f"{name} detail → {url}\n\n"
            + hashtag("NakshIQ", "DataProvenance", "HowWeScore",
                      "NoPaidPlacements", name, state)
        ).strip()
    return (
        f"WHY {name.upper()}: {score}/5\n"
        f"· {mon.upper()} ·\n\n"
        f"↑ {elev:,}m · {state}\n"
        f"Difficulty: {diff}\n\n"
        f"{note or tag}\n\n"
        f"Not a vibe. Measured.\n"
        f"No advertiser. No subsidy. No influencer discount.\n\n"
        f"↓ {url}\n\n"
        + hashtag("NakshIQ", "DataProvenance", "HowWeScore")
    ).strip()


def copy_same_place_12_months(dest: dict, monthly_scores: dict, platform: str) -> str:
    """Same Place, 12 Months — demonstrates monthly scoring.
    `monthly_scores` = {1: score, 2: score, ..., 12: score}.
    Moat layer: DATA (month-by-month granularity is unique to NakshIQ)."""
    name = dest["name"]
    url  = dest_url(dest)
    months_abbr = ["JAN","FEB","MAR","APR","MAY","JUN",
                   "JUL","AUG","SEP","OCT","NOV","DEC"]
    lines = "\n".join(
        f"  {months_abbr[i]}: {monthly_scores.get(i+1, '?')}/5"
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
            + hashtag("NakshIQ", "MonthlyScores", "IndiaTravelData",
                      "DataDrivenTravel", name)
        ).strip()
    return (
        f"{name.upper()}\n"
        f"12 months. 12 answers.\n\n"
        f"{lines}\n\n"
        f"'Best time to visit' isn't one query.\n"
        f"We score every destination monthly.\n\n"
        f"↓ {url}\n\n"
        + hashtag("NakshIQ", "MonthlyScores", "IndiaTravelData")
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
    url        = (route.get("url") or
                  f"https://nakshiq.com/en/routes/{route.get('id','')}").strip()

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

    tags = hashtag("NakshIQ", "RoadTrip", name, "IndiaTravelData",
                   "DataDrivenTravel", f"{days}DayTrip")

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
    url      = (article.get("url") or
                f"https://nakshiq.com/en/blog/{article.get('slug','')}").strip()
    tags = hashtag("NakshIQ", cat_tag or "IndiaTravel", "IndiaTravelData", "DataDrivenTravel")
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


def _collection_image_dest(collection: dict, dest_map: dict) -> dict | None:
    """Return a destination object whose image we can borrow for a collection post."""
    for item in collection.get("items", []):
        did = item.get("destination_id")
        if did in dest_map:
            return dest_map[did]
    return None


def _article_image_dest(article: dict, dest_map: dict) -> dict | None:
    """Return a destination object whose image we can borrow for a blog post."""
    for did in (article.get("destinations") or []):
        if did in dest_map:
            return dest_map[did]
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
    festivals    = content.get("festivals",   {}).get("data", []) or []
    articles     = content.get("articles",    {}).get("data", []) or []
    fresh        = [d for d in destinations if d["id"] not in used]
    pool         = fresh if fresh else destinations
    dest_map     = {d["id"]: d for d in destinations}
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
        return copy_data_carousel(pool[:5], platform), pool[0]

    elif fmt == "tourist_trap" and traps:
        return copy_tourist_trap(traps[0], platform), best  # use best dest image

    elif fmt == "infrastructure_truth" and best:
        return copy_infrastructure_truth(best, platform), best

    elif fmt == "monthly_forecast":
        return copy_monthly_forecast(pool, platform), pool[0] if pool else None

    elif fmt == "collection_spotlight" and collections:
        # Pre-picked at run start so FB + IG show the same collection
        coll = content.get("__run_collection__") or collections[0]
        # Prefer shared best (pair-consistency with score_card on split-format
        # days like Thu). Fall back to collection's own image dest only if
        # no shared best is available.
        img  = best or _collection_image_dest(coll, dest_map)
        return copy_collection_spotlight(coll, dest_map, platform), img

    elif fmt == "festival_alert" and festivals:
        fest = content.get("__run_festival__") or festivals[0]
        img  = dest_map.get(fest.get("destination_id")) or best
        return copy_festival_alert(fest, dest_map, platform), img

    elif fmt == "kids_intel":
        kid_dest = content.get("__run_kid_dest__") or _pick_kid_friendly(pool)
        return copy_kids_intel(kid_dest, platform), kid_dest

    elif fmt == "blog_promo" and articles:
        article = content.get("__run_article__") or articles[0]
        img     = _article_image_dest(article, dest_map) or best
        return copy_blog_promo(article, platform), img

    elif fmt == "route_spotlight":
        routes = content.get("routes", {}).get("data", []) or []
        if not routes:
            # Data not yet available — fall back silently to score_card
            return copy_score_card(best, platform), best
        route = content.get("__run_route__") or routes[0]
        # Pick an image from the route's first stop, or best destination
        img = best
        if route.get("stops"):
            first = route["stops"][0]
            first_id = first.get("destination_id") if isinstance(first, dict) else first
            if first_id in dest_map:
                img = dest_map[first_id]
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

# ─────────────────────────────────────────────────────────────────────────────
# PUBLISHERS
# ─────────────────────────────────────────────────────────────────────────────

def build_media_item(m: dict) -> dict:
    return {"id": m["id"], "url": m["url"], "filename": m["filename"]}


# Instagram allows 2-10 media items per carousel. Cap at 10 for both platforms.
CAROUSEL_MAX_SLIDES = 10
CAROUSEL_FORMATS    = {"data_carousel", "monthly_forecast", "collection_spotlight"}


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


def publish_feed_post(caption: str, account: dict, media,
                      dry_run: bool = False) -> dict | None:
    """
    Publish a feed post. `media` accepts:
      - None                → text-only post
      - a single media dict → single-image post
      - a list of dicts     → multi-image carousel (2–10 items)
    """
    username = account.get("username", account["id"])
    platform = account["network"]

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
        # Collection items are pre-ranked; walk in order until we have enough valid ones
        candidates = [dest_map[i["destination_id"]]
                      for i in coll.get("items", [])
                      if i.get("destination_id") in dest_map]

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
LOCK_MAX_AGE  = 15 * 60  # seconds — any lock older than 15min is considered stale

def _acquire_lock(force: bool = False) -> bool:
    """Prevent concurrent/re-entrant runs. Returns True if lock acquired."""
    now_ts = time.time()
    if LOCK_FILE.exists():
        try:
            payload = json.loads(LOCK_FILE.read_text())
            age = now_ts - float(payload.get("ts", 0))
            holder = payload.get("pid")
        except Exception:
            age, holder = LOCK_MAX_AGE + 1, None
        if age < LOCK_MAX_AGE and not force:
            log.warning(f"Another run in progress (pid={holder}, age={int(age)}s) — exiting.")
            return False
        log.info(f"Stale lock (age={int(age)}s) — overriding.")
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
                state.setdefault("posted_today", {})[acc_id] = today
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
        ig_fmt         = base_fmt
        fb_fmt         = base_fmt
        story_fmt      = EVENING_STORY_SCHEDULE.get(weekday, "score_card")
        audience_tag   = EVENING_AUDIENCE_SCHEDULE.get(weekday)
        # tourist_trap falls back to reality_check when no traps exist
        if ig_fmt == "tourist_trap" and not traps:
            ig_fmt = fb_fmt = "reality_check"
    else:
        ig_fmt       = pick_format(weekday, traps)
        fb_fmt       = FB_FORMAT_OVERRIDES.get(weekday, ig_fmt)
        if weekday == 5 and date.today().day <= 7:
            fb_fmt = FIRST_SAT_FB_FORMAT
        story_fmt    = STORY_FORMAT_SCHEDULE.get(weekday, "score_card")
        audience_tag = None

    log.info(f"Formats — IG: {ig_fmt}  ·  FB: {fb_fmt}  ·  Story: {story_fmt}"
             + (f"  ·  Audience: {audience_tag}" if audience_tag else ""))
    log.info(f"Used destinations (14d): {len(used)}")

    # If an evening audience filter is set, pre-filter the pool for all
    # destination-driven picks (score_card, reality_check, infrastructure_truth,
    # kids_intel, and carousel dests). Keeps the theme_usage picker honest: it
    # will pick the oldest-unused destination that ALSO matches the audience.
    if audience_tag:
        filtered = [d for d in dests if audience_tag in infer_audience_tags(d)]
        if filtered:
            log.info(f"Audience filter '{audience_tag}' → {len(filtered)} destinations match.")
            audience_pool = filtered
        else:
            log.info(f"Audience filter '{audience_tag}' → no matches, using full pool.")
            audience_pool = dests
    else:
        audience_pool = dests

    # Helper: build a fresh candidate pool (exclude 14-day used, apply audience
    # filter if set, then sort by theme_usage.destinations oldest-unused first).
    def _dest_pool() -> list:
        base = [d for d in audience_pool if d["id"] not in used] or audience_pool
        return pick_oldest_unused(state, "destinations", base, key="id")

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
            # Oldest-never-used collection first (anti-repetition tracker).
            ordered = pick_oldest_unused(state, "collections", colls, key="id")
            content["__run_collection__"] = ordered[0]
            status = dimension_cycle_status(state, "collections", len(colls))
            log.info(f"Collection locked: {ordered[0]['name']} "
                     f"({status['unused']}/{status['total']} never featured)")

    # 3) Festival — prefer festivals that haven't been featured yet
    if "festival_alert" in (ig_fmt, fb_fmt, story_fmt):
        fests = content.get("festivals", {}).get("data", []) or []
        if fests:
            ordered = pick_oldest_unused(state, "festivals", fests, key="id")
            content["__run_festival__"] = ordered[0]
            status = dimension_cycle_status(state, "festivals", len(fests))
            log.info(f"Festival locked: {ordered[0].get('name','?')} "
                     f"({status['unused']}/{status['total']} never featured)")

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

    # 7a) Skip List — pick the oldest-never-used LOW-scored destination.
    # Strategy:
    #   1. Look at CURRENT month's pool for destinations scoring 1-3/5. Feature
    #      those directly ("Skip List — April 2026: Destination X is 2/5").
    #   2. If the current month has no lows (peak-season months like April or
    #      December), look FORWARD 1-2 months for destinations that are 5/5
    #      now but will drop to ≤3/5 soon. Post as "Upcoming Skip List — July".
    #      This makes the format valuable year-round.
    if "skip_list" in (ig_fmt, fb_fmt):
        current_low = [d for d in (content.get("destinations_low", {}).get("data") or [])
                       if 1 <= (d.get("score") or 0) <= 3]
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
                            and 1 <= (d.get("score") or 0) <= 3]
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

    # 7d) Shared best destination — when IG and FB run DIFFERENT formats on the
    #     same day (e.g. Thu: IG=score_card, FB=collection_spotlight), pre-pick
    #     one "best" destination so both platforms anchor on the same place.
    #     Without this, score_card picks via pick_best_destination() and
    #     collection_spotlight picks via _collection_image_dest(), yielding
    #     different destinations — breaking pair-consistency.
    shared_best = pick_best_destination(_dest_pool(), used, content)
    if shared_best:
        content["__run_best__"] = shared_best
        log.info(f"Shared best destination locked: {shared_best['name']}")

    # 8) Carousel destinations — lock a SINGLE list so IG and FB show the same
    #    5 destinations (same order). Applies image validation + theme tracker.
    if any(f in CAROUSEL_FORMATS for f in (ig_fmt, fb_fmt, story_fmt)):
        base_pool = [d for d in audience_pool if d["id"] not in used] or audience_pool
        # Priority: oldest-unused first, BUT collection_spotlight defers to
        # the collection's own item ranking (which is intentionally curated).
        pool_for_carousel = pick_oldest_unused(state, "destinations", base_pool, key="id")
        for carousel_fmt in {ig_fmt, fb_fmt, story_fmt}:
            if carousel_fmt not in CAROUSEL_FORMATS:
                continue
            picks = carousel_destinations(carousel_fmt, content, pool_for_carousel, target_count=5)
            content[f"__run_carousel_dests__{carousel_fmt}"] = picks
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

        # Brand-voice sanitation — strip banned phrases/hashtags before publish
        caption = sanitize(caption)

        dest_id = dest_obj["id"]
        log.info(f"[{label}] Caption ready ({len(caption)} chars, dest={dest_id})")

        # ── Decide: Reel, carousel, or single-image ───────────────────────────
        # Evening mode is VIDEO-FIRST — the entertainment pillar. Morning mode
        # prefers image/carousel unless format is explicitly carousel.
        is_carousel = fmt in CAROUSEL_FORMATS
        video_url   = None if is_carousel else check_video_available(dest_obj)
        use_video   = bool(video_url)
        media_obj   = None        # set below in whichever branch runs
        media_list  = []          # used for carousels only

        if use_video:
            log.info(f"[{label}] Video available — uploading for Reel{'  (evening mode)' if evening else ''}...")
            media_obj = upload_media(video_url, f"{dest_id}.mp4", "video/mp4")
            if not media_obj:
                log.warning(f"[{label}] Video upload failed — falling back to image.")
                use_video = False

        if is_carousel and not use_video:
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
        if use_video:
            log.info(f"[{label}] Publishing Reel...")
            result = publish_reel(caption, account, media_obj, dry_run=dry_run)
        elif is_carousel:
            log.info(f"[{label}] Publishing {len(media_list)}-slide carousel...")
            result = publish_feed_post(caption, account, media_list, dry_run=dry_run)
        else:
            log.info(f"[{label}] Publishing feed post...")
            result = publish_feed_post(caption, account, media_obj, dry_run=dry_run)

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
            mark_posted(state, acc_id, dest_id, fmt, post_id, platform, has_media)
            # Mode-scoped today marker (morning vs evening won't collide)
            state.setdefault("posted_today", {})[acc_scoped_key] = today
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
            if audience_tag:
                mark_theme_used(state, "audience_tags", audience_tag)
            # Moat tracker: the angle itself, so it rotates through all of MOAT_ANGLES
            if moat and fmt:
                mark_theme_used(state, "moat_angles", fmt)

            # For carousels, stamp every featured destination so the 14-day
            # cooldown applies to the whole set — not just the anchor slide.
            if is_carousel:
                for sd in slide_dests:
                    used.add(sd["id"])
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
                    state["posted_today"][story_key] = today
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

    # Platform-specific hashtags
    if platform in ("instagram", "facebook"):
        caption += (
            f"#NakshIQ #TravelWithIQ #{state_name.replace(' ', '')} "
            f"#India #TouristMap #TravelIndia #IncredibleIndia "
            f"#{state_name.replace(' ', '')}Tourism"
        )
    elif platform == "linkedin":
        caption += "#NakshIQ #TravelTech #IndiaTravel"

    return caption


def _run_tourist_map(force: bool = False, dry_run: bool = False):
    """
    Tourist Map mode — generates and posts an illustrated state tourist map.
    Rotates through states (oldest-unused first) and cycles variant+theme combos.
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
    if weekday not in TOURIST_MAP_DAYS and not force:
        log.info(f"Tourist Map mode runs Tue/Thu/Sat only (today weekday={weekday}) — exiting.")
        return

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
        caption = sanitize(caption)

        log.info(f"[{label}] Publishing tourist map for {state_name}...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish:\n{caption[:200]}...")
            posted_any = True
            continue

        result = publish_feed_post(caption, account, media_obj, dry_run=False)
        if result:
            log.info(f"[{label}] Tourist map posted successfully!")
            state.setdefault("posted_today", {})[acc_scoped_key] = today
            posted_any = True
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
        "Some places don't need words. They need data.\n"
        "NakshIQ scores every Indian destination, every month — so you know "
        "exactly when to go.\n\n"
        "Save this. Plan smarter.\n\n"
        "—\n"
        "Data, not opinions.\n\n"
        "{hashtags}"
    ),
    "color_palette": (
        "🎨 {subject}\n\n"
        "Every destination has a color story. This one speaks for itself.\n\n"
        "NakshIQ doesn't just tell you where to go — we tell you when "
        "the colors are at their best.\n\n"
        "—\n"
        "Travel with IQ.\n\n"
        "{hashtags}"
    ),
    "this_or_that": (
        "🤔 {comparison_a} or {comparison_b}?\n\n"
        "Drop your pick in the comments. No wrong answers — "
        "but NakshIQ data says one scores higher this month 👀\n\n"
        "—\n"
        "nakshiq.com — scores, not opinions.\n\n"
        "{hashtags}"
    ),
    "collection": (
        "📌 {subject}\n\n"
        "Not a random list. Every spot in this collection is scored and "
        "verified — real data, real traveler intel, updated monthly.\n\n"
        "Explore the full collection on nakshiq.com\n\n"
        "—\n"
        "Travel with IQ.\n\n"
        "{hashtags}"
    ),
    "activity": (
        "⛰️ {subject}\n\n"
        "India has 460+ destinations we score monthly. Some are best "
        "experienced with your heart racing.\n\n"
        "Check nakshiq.com for the best time + safety intel before you go.\n\n"
        "—\n"
        "Data, not opinions.\n\n"
        "{hashtags}"
    ),
    "season": (
        "🌦️ {subject}\n\n"
        "Timing is everything. NakshIQ tracks seasonal scores for 460+ "
        "destinations so you never visit at the wrong time.\n\n"
        "Check your destination's score this month → nakshiq.com\n\n"
        "—\n"
        "Travel with IQ.\n\n"
        "{hashtags}"
    ),
    "food_city": (
        "🍽️ {subject}\n\n"
        "Forget the tourist restaurants. NakshIQ's local intel covers "
        "the real food trail — verified, mapped, no fake reviews.\n\n"
        "Full food guide → nakshiq.com\n\n"
        "—\n"
        "Data, not opinions.\n\n"
        "{hashtags}"
    ),
    "festival": (
        "🪔 {subject}\n\n"
        "India celebrates 311+ festivals across the year. NakshIQ tracks "
        "them all — dates, locations, what to expect, safety intel.\n\n"
        "Plan around a festival → nakshiq.com\n\n"
        "—\n"
        "Travel with IQ.\n\n"
        "{hashtags}"
    ),
}


def _canva_hashtags(entry: dict, platform: str) -> str:
    """Build platform-appropriate hashtags from image metadata."""
    tags = entry.get("tags", [])
    state = entry.get("state")
    dest = entry.get("destination")

    base = ["NakshIQ", "TravelWithIQ", "IndiaTravel", "IncredibleIndia"]
    if state:
        base.append(state)
    if dest:
        base.append(dest.replace("_", "").title())
    for t in tags[:3]:
        base.append(t.replace("_", "").title())

    if platform == "linkedin":
        return " ".join(f"#{h}" for h in base[:5])
    return " ".join(f"#{h}" for h in base)


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

    return template.format(
        subject=entry.get("subject", "India"),
        comparison_a=entry.get("comparison", ["A", "B"])[0] if "comparison" in entry else "This",
        comparison_b=entry.get("comparison", ["A", "B"])[1] if "comparison" in entry else "That",
        hashtags=hashtags,
    )


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

    with open(manifest_path) as f:
        manifest = _json.load(f)

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
        caption = sanitize(caption)

        log.info(f"[{label}] Publishing canva visual: {chosen_img['subject']}...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish:\n{caption[:200]}...")
            posted_any = True
            continue

        result = publish_feed_post(caption, account, media_obj, dry_run=False)
        if result:
            log.info(f"[{label}] Canva visual posted successfully!")
            st.setdefault("posted_today", {})[acc_scoped_key] = today
            posted_any = True
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
# REEL MODE — programmatic short-form vertical video
# ─────────────────────────────────────────────────────────────────────────────

REEL_LOCK_FILE = Path(__file__).parent / ".autoposter-reel.lock"

REEL_FORMATS = ["score_reveal", "contrarian", "seasonal_shift", "trap_alert", "destination_reveal"]

# Captions per reel format
REEL_CAPTION_TEMPLATES = {
    "score_reveal": (
        "🎯 Do NOT go to {dest} in {month}.\n\n"
        "NakshIQ Score: {score}/5\n"
        "{reason}\n\n"
        "303 destinations. Real-time travel scores.\n"
        "→ nakshiq.com\n\n"
        "—\n"
        "Data, not opinions.\n\n"
        "{hashtags}"
    ),
    "contrarian": (
        "💡 Everyone goes to {famous}. Smart travelers go to {hidden}.\n\n"
        "{famous}: {famous_score}/5\n"
        "{hidden}: {hidden_score}/5\n\n"
        "Same region. Less crowd. Better value.\n"
        "→ nakshiq.com\n\n"
        "—\n"
        "Travel with IQ.\n\n"
        "{hashtags}"
    ),
    "seasonal_shift": (
        "⏰ {dest} is a {now_score}/5 right now.\n"
        "In {future_month}? {future_score}/5.\n\n"
        "Timing is everything.\n"
        "303 destinations scored for every month.\n"
        "→ nakshiq.com\n\n"
        "—\n"
        "Data, not opinions.\n\n"
        "{hashtags}"
    ),
    "trap_alert": (
        "⚠️ TOURIST TRAP: {trap}\n\n"
        "{reason}\n"
        "Do this instead: {alternative}\n\n"
        "NakshIQ flags traps so you don't waste money.\n"
        "→ nakshiq.com\n\n"
        "—\n"
        "Travel with IQ.\n\n"
        "{hashtags}"
    ),
    "destination_reveal": (
        "📍 Discover {dest}, {state}\n\n"
        "NakshIQ Score: {score}/5\n"
        "{tagline}\n\n"
        "303 destinations. Real scores. Zero fluff.\n"
        "→ nakshiq.com\n\n"
        "—\n"
        "Travel with IQ.\n\n"
        "{hashtags}"
    ),
}


def _reel_hashtags(dest_name: str, platform: str) -> str:
    """Build reel-specific hashtags."""
    base = ["NakshIQ", "TravelWithIQ", "IndiaTravel", "IncredibleIndia",
            "TravelReels", "IndiaReels"]
    if dest_name:
        clean = dest_name.replace(" ", "").replace("-", "")
        base.append(clean)
    if platform == "linkedin":
        return " ".join(f"#{h}" for h in base[:5])
    return " ".join(f"#{h}" for h in base)


def _reel_caption(reel_format: str, data: dict, platform: str) -> str:
    """Generate caption for a reel post."""
    template = REEL_CAPTION_TEMPLATES.get(reel_format, REEL_CAPTION_TEMPLATES["score_reveal"])
    dest_name = data.get("dest_name") or data.get("famous") or data.get("trap_name") or "India"
    hashtags = _reel_hashtags(dest_name, platform)

    try:
        return template.format(
            dest=data.get("dest_name", ""),
            month=data.get("month", ""),
            score=data.get("score", ""),
            reason=data.get("reason", ""),
            famous=data.get("famous", ""),
            hidden=data.get("hidden", ""),
            famous_score=data.get("famous_score", ""),
            hidden_score=data.get("hidden_score", ""),
            now_score=data.get("now_score", ""),
            future_month=data.get("future_month", ""),
            future_score=data.get("future_score", ""),
            trap=data.get("trap_name", ""),
            alternative=data.get("alternative", ""),
            state=data.get("state_name", "India"),
            tagline=data.get("tagline", ""),
            hashtags=hashtags,
        )
    except KeyError:
        return f"🎯 Travel smarter. {dest_name} on NakshIQ.\n\n→ nakshiq.com\n\n{hashtags}"


def _pick_reel_data(state: dict, content: dict, reel_format: str) -> dict | None:
    """Pick destination data for a reel format from synced content."""
    import calendar
    from datetime import datetime as _dt
    month_now  = _dt.now().month
    month_name = calendar.month_name[month_now]

    destinations = content.get("destinations", {}).get("data", [])
    destinations_low = content.get("destinations_low", {}).get("data", [])
    traps = content.get("traps", {}).get("data", [])

    if reel_format == "score_reveal":
        # Pick a LOW-scored destination (≤3) — the "don't go" hook only works
        # when the score genuinely warrants a warning. Skip if nothing qualifies.
        low_scored = [d for d in destinations_low
                      if isinstance(d.get("score"), (int, float)) and d["score"] <= 3]
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
        high = [d for d in destinations if isinstance(d.get("score"), (int, float)) and d["score"] >= 4]
        low  = [d for d in destinations_low if isinstance(d.get("score"), (int, float)) and d["score"] <= 3]
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
                     if isinstance(d.get("score"), (int, float)) and d["score"] >= 4]
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
        if not traps:
            return None
        ordered = pick_oldest_unused(state, "reel_trap_alerts",
                                     [{"id": t.get("id", t.get("name", "")), **t}
                                      for t in traps], key="id")
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
                       and has_social_image(d.get("name", ""))]
        if not high_scored:
            # Fallback: any destination with a branded image
            high_scored = [d for d in destinations
                          if has_social_image(d.get("name", ""))]
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
        caption = sanitize(caption)

        log.info(f"[{label}] Publishing reel ({chosen_format})...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish:\n{caption[:200]}...")
            posted_any = True
            continue

        result = publish_reel(caption, account, media_obj, dry_run=False)
        if result:
            log.info(f"[{label}] Reel posted successfully!")
            st.setdefault("posted_today", {})[acc_scoped_key] = today
            posted_any = True
        else:
            log.warning(f"[{label}] Reel post failed.")

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
# INFOGRAPHIC MODE — branded carousel infographics (treks, festivals, etc.)
# ─────────────────────────────────────────────────────────────────────────────

INFOGRAPHIC_LOCK_FILE = Path(__file__).parent / ".autoposter-infographic.lock"


def _run_infographic(force: bool = False, dry_run: bool = False):
    """
    Infographic mode — generates branded infographic carousels and posts
    as carousel feed posts. Rotates topics (treks, festivals, hidden_gems,
    camping) and themes (magazine, topo, datacard, noir).
    Mon/Wed/Fri schedule.
    """
    today   = date.today().isoformat()
    weekday = date.today().weekday()
    st      = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter · INFOGRAPHIC · {today} · weekday={weekday}")
    log.info("═" * 60)

    # Only run Mon/Wed/Fri (0, 2, 4) — silently exit on other days
    if weekday not in (0, 2, 4) and not force:
        log.info("Infographic mode only runs Mon/Wed/Fri. Exiting.")
        return

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

        post_caption = sanitize(caption)

        log.info(f"[{label}] Publishing infographic carousel: {topic}/{theme}...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish {len(media_objs)}-slide carousel:\n{post_caption[:200]}...")
            posted_any = True
            continue

        result = publish_feed_post(post_caption, account, media_objs, dry_run=False)
        if result:
            log.info(f"[{label}] Infographic carousel posted successfully!")
            st.setdefault("posted_today", {})[acc_scoped_key] = today
            posted_any = True
        else:
            log.warning(f"[{label}] Infographic post failed.")

    # Update infographic state (topic/theme rotation) if posted
    if posted_any and not dry_run:
        try:
            from infographic_gen import TOPICS, THEMES, _load_state, _save_state
            ig_state = _load_state()
            if "infographic" not in ig_state:
                ig_state["infographic"] = {}
            ig_state["infographic"]["last_topic_idx"] = TOPICS.index(topic)
            ig_state["infographic"]["last_theme_idx"] = THEMES.index(theme)
            ig_state["infographic"]["last_posted"] = today
            _save_state(ig_state)
            log.info(f"Infographic state updated: topic={topic}, theme={theme}")
        except Exception as e:
            log.warning(f"Failed to update infographic state: {e}")

    save_state(st)
    log.info("State saved. Infographic run complete.")
    log.info("═" * 60)


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
# YT SHORT MODE — YouTube Shorts (listicle, before_after, mini_guide)
# ─────────────────────────────────────────────────────────────────────────────

YT_SHORT_LOCK_FILE = Path(__file__).parent / ".autoposter-yt-short.lock"


def _run_yt_short(force: bool = False, dry_run: bool = False):
    """
    YT Short mode — generates and posts YouTube Shorts.
    Rotates through 3 formats (listicle, before_after, mini_guide) with
    anti-repetition. YouTube-ONLY posting (skips IG/FB). Max 2 per day.
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
    caption     = result["caption"]
    fmt         = result["format"]
    duration    = result.get("duration", 0)
    music       = result.get("music", "unknown")

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

        yt_caption = sanitize(caption)
        log.info(f"[{label}] Publishing YT Short ({fmt})...")

        if dry_run:
            log.info(f"[{label}] DRY RUN — would publish:\n{yt_caption[:200]}...")
            posted_any = True
            continue

        pub_result = publish_reel(yt_caption, account, media_obj, dry_run=False)
        if pub_result:
            log.info(f"[{label}] YT Short posted successfully!")
            posted_today = st.setdefault("posted_today", {})
            prev_date = posted_today.get(acc_scoped_key)
            prev_count = posted_today.get(daily_count_key, 0) if prev_date == today else 0
            posted_today[acc_scoped_key] = today
            posted_today[daily_count_key] = prev_count + 1
            posted_any = True
        else:
            log.warning(f"[{label}] YT Short post failed.")

    if posted_any:
        log.info(f"YT Short posted: format={fmt}, music={music}")

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
# ENTRY POINT
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
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
                             "Rotates through listicle, before_after, and mini_guide "
                             "formats. YouTube-only, max 2 per day.")
    args = parser.parse_args()
    exclusive = sum([args.evening, args.moat, args.tourist_map, args.canva_visual, args.reel, args.infographic, args.yt_short])
    if exclusive > 1:
        parser.error("--evening, --moat, --tourist-map, --canva-visual, --reel, --infographic, and --yt-short are mutually exclusive.")
    if args.tourist_map:
        run_tourist_map(force=args.force, dry_run=args.dry_run)
    elif args.canva_visual:
        run_canva_visual(force=args.force, dry_run=args.dry_run)
    elif args.reel:
        run_reel(force=args.force, dry_run=args.dry_run)
    elif args.infographic:
        run_infographic(force=args.force, dry_run=args.dry_run)
    elif args.yt_short:
        run_yt_short(force=args.force, dry_run=args.dry_run)
    else:
        run(force=args.force, sync_only=args.sync_only,
            dry_run=args.dry_run, evening=args.evening, moat=args.moat)
