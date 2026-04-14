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

# Format rotation — one per weekday (0=Mon … 6=Sun)
FORMAT_SCHEDULE = {
    0: "score_card",           # Monday
    1: "tourist_trap",         # Tuesday  → falls back to reality_check
    2: "data_carousel",        # Wednesday
    3: "score_card",           # Thursday
    4: "reality_check",        # Friday
    5: "data_carousel",        # Saturday
    6: "infrastructure_truth", # Sunday   → falls back to score_card
}

# Story posted alongside feed post on these weekdays
STORY_DAYS = {0, 1, 2, 3, 4, 5, 6}  # Every day (skipped on Reel days — see run())

# Total destinations Nakshiq scores — populated from /stats on each sync.
# Fallback keeps copy sensible if the stats call fails for any reason.
TOTAL_DESTINATIONS = 260

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
        "articles":     nakshiq_fetch("articles",     {"since": since}),
        "traps":        nakshiq_fetch("traps"),
        "festivals":    nakshiq_fetch("festivals",    {"month": month}),
        "collections":  nakshiq_fetch("collections"),
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

# ─────────────────────────────────────────────────────────────────────────────
# CONTENT SELECTOR
# ─────────────────────────────────────────────────────────────────────────────

def contrarian_score(dest: dict) -> float:
    combined = ((dest.get("tagline") or "") + " " + (dest.get("note") or "")).lower()
    return sum(1.0 for kw in CONTRARIAN_KEYWORDS if kw in combined)

def pick_best_destination(destinations: list, used: set) -> dict | None:
    fresh = [d for d in destinations if d["id"] not in used]
    pool  = fresh if fresh else destinations
    if not pool:
        return None
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
    return " ".join(f"#{t.replace(' ', '')}" for t in tags)

def copy_score_card(dest: dict, platform: str) -> str:
    name  = dest["name"]
    score = dest["score"]
    elev  = dest["elevation_m"]
    state = dest["state"]
    tag   = dest["tagline"]
    note  = (dest.get("note") or "").strip()
    stars = "★" * score + "☆" * (5 - score)
    mon   = month_name().upper()
    tags  = hashtag("Nakshiq", name, state, "IndiaTravelData",
                    "DataDrivenTravel", "5outof5", f"{month_name()}Travel", "HiddenIndia")
    if platform == "facebook":
        return (
            f"{name.upper()} IN {mon}: {score}/5  {stars}\n\n"
            f"↑ {elev:,}m · {state}\n\n{tag}\n\n"
            + (f"{note}\n\n" if note else "")
            + f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly. Not a blog post — live data.\n\n"
            f"Full {month_name()} scores → nakshiq.com\n\n{tags}"
        ).strip()
    else:
        return (
            f"{name.upper()} · {mon}\n"
            f"{stars} {score}/5 · ↑{elev:,}m · {state}\n\n{tag}\n\n"
            + (f"{note}\n\n" if note else "")
            + f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly — actual data, not aspirational content.\n\n"
            f"Save this. Full {month_name()} scores → nakshiq.com\n\n{tags}"
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
    tags = hashtag("Nakshiq", "RealityCheck", b["name"], a["name"],
                   "IndiaTravelData", "SkipTheCrowd", "DataDrivenTravel",
                   b["state"], f"{month_name()}Travel", "HiddenIndia")
    if platform == "facebook":
        body = (
            f"REALITY CHECK — {month_name().upper()} {date.today().year}\n\n"
            f"Both score {a['score']}/5 this month. Same region. Very different experience.\n\n"
            f"❌ {a['name'].upper()} (↑{a['elevation_m']:,}m)\n{a['tagline']}\n\n"
            f"✅ {b['name'].upper()} (↑{b['elevation_m']:,}m)\n{b['tagline']}\n"
            + (f"{note}\n\n" if note else "\n")
            + f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly — same score, context is everything.\n\n"
            f"Full {month_name()} data → nakshiq.com\n\n{tags}"
        ).strip()
    else:
        body = (
            f"SAME SCORE. DIFFERENT SATURDAY.\n\n"
            f"{a['name']} and {b['name']} both score {a['score']}/5 this {month_name()}.\n\n"
            f"{a['name']}: {a['tagline']}\n\n{b['name']}: {b['tagline']}\n"
            + (f"{note}\n\n" if note else "\n")
            + f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly.\n\n"
            f"↓ Full {month_name()} data → nakshiq.com\n\n{tags}"
        ).strip()
    return body, b["id"]

def copy_data_carousel(destinations: list, platform: str) -> str:
    top5 = destinations[:5]
    lines = "\n".join(
        f"{'★'*d['score']} {d['name']} ({d['elevation_m']:,}m)\n"
        f"   → {(d['tagline'] or '')[:72]}..."
        for d in top5
    )
    tags = hashtag("Nakshiq", "IndiaTravelData", f"{month_name()}Travel",
                   "DataDrivenTravel", "HiddenIndia", "5outof5", "OffbeatIndia", "NorthIndia")
    if platform == "facebook":
        return (
            f"{month_name().upper()}'S REAL 5/5 DESTINATIONS\n\n"
            f"NakshIQ scored {TOTAL_DESTINATIONS} destinations this {month_name()}. 20 hit 5/5. "
            f"Most travelers are booking the same 4.\n\n"
            f"Here's what the data actually shows:\n\n{lines}\n\n"
            f"Every score is monthly — 5/5 in {month_name()} may be 2/5 in August.\n\n"
            f"Full ranked list → nakshiq.com\n\n{tags}"
        ).strip()
    else:
        return (
            f"{month_name().upper()}'S 5/5 PICKS\n(Save — the window closes fast)\n\n"
            f"{lines}\n\n"
            f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly. These are {month_name()}'s facts.\n\n"
            f"↓ Full scores → nakshiq.com\n\n{tags}"
        ).strip()

def copy_tourist_trap(trap: dict, platform: str) -> str:
    name = trap.get("name", "This destination")
    desc = trap.get("description", "")
    tags = hashtag("Nakshiq", "TouristTrap", "IndiaTravelData",
                   "DataDrivenTravel", "TravelSmart", f"{month_name()}Travel")
    return (
        f"{'TOURIST TRAP' if platform == 'facebook' else '🚩 TOURIST TRAP'} — {name.upper()}\n\n"
        f"{desc}\n\n"
        f"NakshIQ scores {TOTAL_DESTINATIONS} destinations monthly. Some score low for a reason.\n\n"
        f"Better alternatives → nakshiq.com\n\n{tags}"
    ).strip()

def copy_infrastructure_truth(dest: dict, platform: str) -> str:
    note = (dest.get("note") or dest.get("tagline") or "").strip()
    tags = hashtag("Nakshiq", "InfrastructureTruth", dest["name"], "RoadTrip",
                   "IndiaTravelData", "KnowBeforeYouDrive", f"{month_name()}Travel", dest["state"])
    return (
        f"INFRASTRUCTURE REALITY — {dest['name'].upper()}\n\n"
        f"↑ {dest['elevation_m']:,}m · {dest['state']}\n\n{note}\n\n"
        f"NakshIQ tracks road access, fuel, ATM, and signal for {TOTAL_DESTINATIONS} destinations monthly.\n\n"
        f"Know before you drive → nakshiq.com\n\n{tags}"
    ).strip()

def copy_monthly_forecast(destinations: list, platform: str) -> str:
    top3 = [d for d in destinations if d.get("score", 0) == 5][:3]
    lines = "\n".join(
        f"★★★★★ {d['name']} ({d['elevation_m']:,}m)\n   {d['tagline'][:72]}"
        for d in top3
    )
    tags = hashtag("Nakshiq", f"{month_name()}Forecast", "IndiaTravelData",
                   "DataDrivenTravel", "NorthIndia", f"{month_name()}Travel", "5outof5")
    return (
        f"📊 {month_name().upper()} FORECAST — NakshIQ Monthly Update\n\n"
        f"{TOTAL_DESTINATIONS} destinations re-scored. This month's top 5/5 picks:\n\n{lines}\n\n"
        f"Scores reset every month. What worked last month may not work now.\n\n"
        f"Full {month_name()} data → nakshiq.com\n\n{tags}"
    ).strip()

# ─────────────────────────────────────────────────────────────────────────────
# POST GENERATOR
# ─────────────────────────────────────────────────────────────────────────────

def generate_post(fmt: str, content: dict, platform: str,
                  used: set) -> tuple[str, dict | None]:
    """Returns (caption, dest_obj | None). dest_obj carries image + video URLs."""
    destinations = content["destinations"].get("data", [])
    traps        = content["traps"].get("data", [])
    fresh        = [d for d in destinations if d["id"] not in used]
    pool         = fresh if fresh else destinations
    if not pool:
        return None, None

    best = pick_best_destination(pool, used)

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

def outstand_post_req(path: str, payload: dict) -> dict:
    r = requests.post(f"{OUTSTAND_BASE}{path}", headers=_headers(), json=payload, timeout=30)
    return r.json()

def get_connected_accounts() -> list:
    try:
        return outstand_get("/v1/social-accounts").get("data", [])
    except Exception as e:
        log.error(f"Could not fetch accounts: {e}")
        return []

# ─────────────────────────────────────────────────────────────────────────────
# MEDIA UPLOAD
# ─────────────────────────────────────────────────────────────────────────────

def upload_media(url: str, filename: str, content_type: str = "image/jpeg") -> dict | None:
    """Download from URL → upload to Outstand R2 → confirm → return media obj."""
    try:
        log.info(f"    Downloading: {url}")
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
        data = resp.content
        size = len(data)

        r1 = outstand_post_req("/v1/media/upload", {"filename": filename, "content_type": content_type})
        if not r1.get("success"):
            log.warning(f"    Upload URL failed: {r1}")
            return None

        put = requests.put(r1["data"]["upload_url"], data=data,
                           headers={"Content-Type": content_type}, timeout=120)
        if put.status_code != 200:
            log.warning(f"    R2 PUT failed: {put.status_code}")
            return None

        r3 = outstand_post_req(f"/v1/media/{r1['data']['id']}/confirm", {"size": size})
        if not r3.get("success"):
            log.warning(f"    Confirm failed: {r3}")
            return None

        m = r3["data"]
        log.info(f"    Media ready: {m['id']} ({size:,} bytes)")
        return m

    except Exception as e:
        log.warning(f"    Media upload exception: {e}")
        return None

# ─────────────────────────────────────────────────────────────────────────────
# PUBLISHERS
# ─────────────────────────────────────────────────────────────────────────────

def build_media_item(m: dict) -> dict:
    return {"id": m["id"], "url": m["url"], "filename": m["filename"]}

def publish_feed_post(caption: str, account: dict, media: dict | None,
                      dry_run: bool = False) -> dict | None:
    username = account.get("username", account["id"])
    platform = account["network"]

    if dry_run:
        log.info(f"    [DRY RUN] {platform}/{username} — {len(caption)} chars"
                 + (f" + {media['filename']}" if media else " (no media)"))
        return {"post": {"id": "DRY_RUN"}}

    container = {"content": caption}
    if media:
        container["media"] = [build_media_item(media)]

    result = outstand_post_req("/v1/posts/", {"accounts": [username], "containers": [container]})
    if not result.get("success"):
        log.error(f"    Feed post failed: {result}")
        return None
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
    """Post an Instagram/Facebook Reel (vertical video)."""
    username = account.get("username", account["id"])
    platform = account["network"]

    if dry_run:
        log.info(f"    [DRY RUN] Reel → {video_media['filename']}")
        return {"post": {"id": "DRY_RUN_REEL"}}

    result = outstand_post_req("/v1/posts/", {
        "accounts":   [username],
        "containers": [{"content": caption, "media": [build_media_item(video_media)]}],
    })
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


def run(force: bool = False, sync_only: bool = False, dry_run: bool = False):
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    # ── 0. Acquire re-entry lock ─────────────────────────────────────────────
    if not sync_only and not dry_run and not _acquire_lock(force=force):
        sys.exit(0)

    try:
        _run_inner(force=force, sync_only=sync_only, dry_run=dry_run)
    finally:
        if not sync_only and not dry_run:
            _release_lock()


def _run_inner(force: bool, sync_only: bool, dry_run: bool):
    today   = date.today().isoformat()
    weekday = date.today().weekday()
    state   = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter  ·  {today}  ·  weekday={weekday}")
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
    # Merge today's posts from Outstand into posted_today + posted_destinations
    # so anything published outside this script (tests, manual posts) still blocks
    # a duplicate today.
    remote_today = _outstand_posts_today() if not force else []
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

    # ── 3. Determine format and pre-pick the Reality Check pair (once) ──────
    traps  = content["traps"].get("data", [])
    fmt    = pick_format(weekday, traps)
    used   = recently_used_destinations(state)
    log.info(f"Format: {fmt}  ·  Used destinations (14d): {len(used)}")

    # Reality Check must use the SAME pair on both FB and IG. Pre-pick it here
    # before the loop so the second platform doesn't re-roll against a depleted pool.
    dests = content["destinations"].get("data", [])
    run_pair = None
    if fmt == "reality_check":
        pool = [d for d in dests if d["id"] not in used] or dests
        name_map = {d["name"]: d for d in pool}
        for famous, hidden in CONTRARIAN_PAIRS:
            if famous in name_map and hidden in name_map:
                run_pair = (name_map[famous], name_map[hidden])
                log.info(f"Reality Check pair locked: {famous} ↔ {hidden}")
                break
        if not run_pair and len(pool) >= 2:
            run_pair = (pool[0], pool[1])
            log.info(f"Reality Check pair (fallback): {run_pair[0]['name']} ↔ {run_pair[1]['name']}")
    content["__run_pair__"] = run_pair

    # ── 4. Post to each account ───────────────────────────────────────────────
    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        if already_posted_today(state, acc_id) and not force:
            log.info(f"[{label}] Already posted today — skipping.")
            continue

        log.info(f"[{label}] Generating {fmt} post...")
        caption, dest_obj = generate_post(fmt, content, platform, used)

        if not caption or not dest_obj:
            log.warning(f"[{label}] No content generated — skipping.")
            continue

        dest_id = dest_obj["id"]
        log.info(f"[{label}] Caption ready ({len(caption)} chars, dest={dest_id})")

        # ── Decide: image post or Reel ────────────────────────────────────────
        video_url = check_video_available(dest_obj)
        use_video = bool(video_url)

        if use_video:
            log.info(f"[{label}] Video available — uploading for Reel...")
            media_obj = upload_media(video_url, f"{dest_id}.mp4", "video/mp4")
            if not media_obj:
                log.warning(f"[{label}] Video upload failed — falling back to image.")
                use_video = False

        if not use_video:
            image_url = dest_obj.get("image")
            media_obj = None
            if image_url:
                log.info(f"[{label}] Uploading image...")
                media_obj = upload_media(image_url, f"{dest_id}.jpg", "image/jpeg")
                if not media_obj:
                    log.warning(f"[{label}] Image upload failed — posting text only.")

        # ── Publish feed post / Reel ──────────────────────────────────────────
        if use_video:
            log.info(f"[{label}] Publishing Reel...")
            result = publish_reel(caption, account, media_obj, dry_run=dry_run)
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
            mark_posted(state, acc_id, dest_id, fmt, post_id, platform, bool(media_obj))
            used.add(dest_id)

        # ── Instagram Story (Mon + Thu, alongside feed post) ──────────────────
        story_key = acc_id + "_story"
        if (platform == "instagram"
                and weekday in STORY_DAYS
                and media_obj
                and not already_posted_today(state, story_key)
                and not use_video):  # Stories use images only; Reel days skip Story

            log.info(f"[{label}] Posting Instagram Story...")
            story_result = publish_story(account, media_obj, dry_run=dry_run)
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
                        "timestamp":  datetime.now(timezone.utc).isoformat(),
                        "date":       today,
                        "platform":   "instagram_story",
                        "account_id": acc_id,
                        "post_id":    story_post_id,
                        "destination": dest_id,
                        "format":     "story",
                        "has_media":  True,
                    })
            else:
                log.warning(f"[{label}] Story failed — continuing.")

    # ── 5. Save state ─────────────────────────────────────────────────────────
    save_state(state)
    log.info("State saved. Run complete.")
    log.info("═" * 60)

# ─────────────────────────────────────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--force",     action="store_true")
    parser.add_argument("--sync-only", action="store_true")
    parser.add_argument("--dry-run",   action="store_true")
    args = parser.parse_args()
    run(force=args.force, sync_only=args.sync_only, dry_run=args.dry_run)
