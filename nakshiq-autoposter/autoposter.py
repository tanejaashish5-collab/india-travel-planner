#!/usr/bin/env python3
"""
Nakshiq Autonomous Social Media Poster
=======================================
Syncs Nakshiq content 3x/day. Posts ONCE per day per connected platform.
Fully autonomous — no human input required after initial GitHub setup.

Modes:
  python autoposter.py              # Normal run (sync + post if not yet posted today)
  python autoposter.py --force      # Force-post even if already posted today
  python autoposter.py --sync-only  # Sync content only, skip posting
  python autoposter.py --dry-run    # Print what would be posted, don't publish
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
    1: "tourist_trap",         # Tuesday  (falls back → reality_check if no traps)
    2: "data_carousel",        # Wednesday
    3: "score_card",           # Thursday
    4: "reality_check",        # Friday
    5: "data_carousel",        # Saturday
    6: "infrastructure_truth", # Sunday   (falls back → score_card)
}

# Known contrarian pairs for reality-check comparisons
CONTRARIAN_PAIRS = [
    ("Mussoorie",    "Dhanaulti"),
    ("Nainital",     "Bhimtal"),
    ("Manali",       "Tirthan Valley"),
    ("Shimla",       "Chaukori"),
    ("Kasol",        "Jibhi"),
    ("Pahalgam",     "Achabal"),
    ("Dharamshala",  "Chamba"),
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
# STATE MANAGER  (persists to state.json, committed back to repo by CI)
# ─────────────────────────────────────────────────────────────────────────────

def load_state() -> dict:
    if STATE_FILE.exists():
        with open(STATE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {
        "last_sync":             None,
        "posted_today":          {},   # {account_id: "YYYY-MM-DD"}
        "posted_destinations":   [],   # [{destination_id, date}]  rolling 14 days
        "posted_formats":        {},   # {account_id: [recent format strings]}
        "post_log":              [],   # full audit trail
    }

def save_state(state: dict):
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, default=str, ensure_ascii=False)

def already_posted_today(state: dict, account_id: str) -> bool:
    return state["posted_today"].get(account_id) == date.today().isoformat()

def mark_posted(state: dict, account_id: str, destination_id: str,
                fmt: str, post_id: str, platform: str, has_media: bool):
    today = date.today().isoformat()
    state["posted_today"][account_id] = today

    # Rolling 14-day destination history (avoid repeating destinations)
    cutoff = (date.today() - timedelta(days=14)).isoformat()
    state["posted_destinations"] = [
        d for d in state["posted_destinations"] if d["date"] >= cutoff
    ]
    state["posted_destinations"].append({"destination_id": destination_id, "date": today})

    # Format history per account (keep last 21 to detect over-rotation)
    if account_id not in state["posted_formats"]:
        state["posted_formats"][account_id] = []
    state["posted_formats"][account_id] = (
        state["posted_formats"][account_id][-20:] + [fmt]
    )

    state["post_log"].append({
        "timestamp":    datetime.now(timezone.utc).isoformat(),
        "date":         today,
        "platform":     platform,
        "account_id":   account_id,
        "post_id":      post_id,
        "destination":  destination_id,
        "format":       fmt,
        "has_media":    has_media,
    })
    state["post_log"] = state["post_log"][-500:]

def recently_used_destinations(state: dict) -> set:
    return {d["destination_id"] for d in state.get("posted_destinations", [])}

# ─────────────────────────────────────────────────────────────────────────────
# NAKSHIQ CONTENT FETCHER
# ─────────────────────────────────────────────────────────────────────────────

def nakshiq_fetch(type_: str, extra: dict = {}) -> dict:
    params = {"type": type_, **extra}
    try:
        r = requests.get(NAKSHIQ_BASE, params=params, timeout=15)
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

    n_dest  = len(content["destinations"].get("data", []))
    n_traps = len(content["traps"].get("data", []))
    n_arts  = len(content["articles"].get("data", []))
    log.info(f"Synced → {n_dest} destinations (5/5) · {n_traps} traps · {n_arts} articles")
    return content

# ─────────────────────────────────────────────────────────────────────────────
# CONTENT SELECTOR
# ─────────────────────────────────────────────────────────────────────────────

def contrarian_score(dest: dict) -> float:
    tag = (dest.get("tagline") or "").lower()
    note = (dest.get("note") or "").lower()
    return sum(1.0 for kw in CONTRARIAN_KEYWORDS if kw in tag + " " + note)

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
    ))

def pick_format(weekday: int, traps: list) -> str:
    # First week of month → monthly forecast on Monday
    if date.today().day <= 7 and weekday == 0:
        return "monthly_forecast"
    fmt = FORMAT_SCHEDULE.get(weekday, "score_card")
    if fmt == "tourist_trap"         and not traps: fmt = "reality_check"
    if fmt == "infrastructure_truth" and True:      pass  # always available
    return fmt

# ─────────────────────────────────────────────────────────────────────────────
# COPY WRITERS  (one per format × platform)
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

    tags = hashtag(
        "Nakshiq", name, state, "IndiaTravelData",
        "DataDrivenTravel", "5outof5", f"{month_name()}Travel", "HiddenIndia"
    )

    if platform == "facebook":
        return (
            f"{name.upper()} IN {mon}: {score}/5  {stars}\n\n"
            f"↑ {elev:,}m · {state}\n\n"
            f"{tag}\n\n"
            + (f"{note}\n\n" if note else "")
            + f"NakshIQ scores 229 destinations monthly. "
            f"Not a blog post — live data updated every month.\n\n"
            f"Full {month_name()} scores → nakshiq.com\n\n{tags}"
        ).strip()
    else:  # instagram / tiktok / threads
        return (
            f"{name.upper()} · {mon}\n"
            f"{stars} {score}/5 · ↑{elev:,}m · {state}\n\n"
            f"{tag}\n\n"
            + (f"{note}\n\n" if note else "")
            + f"NakshIQ scores 229 destinations monthly — "
            f"not aspirational content, actual data.\n\n"
            f"Save this. Full {month_name()} scores → nakshiq.com\n\n{tags}"
        ).strip()


def copy_reality_check(destinations: list, platform: str) -> tuple[str, str]:
    dest_map = {d["name"]: d for d in destinations}
    pair = None
    for famous, hidden in CONTRARIAN_PAIRS:
        if famous in dest_map and hidden in dest_map:
            pair = (dest_map[famous], dest_map[hidden])
            break
    if not pair:
        pair = (destinations[0], destinations[1]) if len(destinations) >= 2 else None
    if not pair:
        return copy_score_card(destinations[0], platform), destinations[0]["id"]

    a, b  = pair
    note  = (b.get("note") or "").strip()
    tags  = hashtag(
        "Nakshiq", "RealityCheck", b["name"], a["name"],
        "IndiaTravelData", "SkipTheCrowd", "DataDrivenTravel",
        b["state"], f"{month_name()}Travel", "HiddenIndia"
    )

    if platform == "facebook":
        body = (
            f"REALITY CHECK — {month_name().upper()} {date.today().year}\n\n"
            f"Both score {a['score']}/5 this month. "
            f"Both are in the same region. Very different Saturday morning.\n\n"
            f"❌ {a['name'].upper()} (↑{a['elevation_m']:,}m)\n"
            f"{a['tagline']}\n\n"
            f"✅ {b['name'].upper()} (↑{b['elevation_m']:,}m)\n"
            f"{b['tagline']}\n"
            + (f"{note}\n\n" if note else "\n")
            + f"NakshIQ scores 229 destinations every month — "
            f"same score, context is everything.\n\n"
            f"Full {month_name()} data → nakshiq.com\n\n{tags}"
        ).strip()
    else:
        body = (
            f"SAME SCORE. DIFFERENT SATURDAY.\n\n"
            f"{a['name']} and {b['name']} both score "
            f"{a['score']}/5 this {month_name()}.\n\n"
            f"{a['name']}: {a['tagline']}\n\n"
            f"{b['name']}: {b['tagline']}\n"
            + (f"{note}\n\n" if note else "\n")
            + f"NakshIQ scores 229 destinations monthly. "
            f"You choose which experience.\n\n"
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
    tags = hashtag(
        "Nakshiq", "IndiaTravelData", f"{month_name()}Travel",
        "DataDrivenTravel", "HiddenIndia", "5outof5",
        "OffbeatIndia", "NorthIndia"
    )

    if platform == "facebook":
        return (
            f"{month_name().upper()}'S REAL 5/5 DESTINATIONS\n\n"
            f"NakshIQ scored 229 destinations this {month_name()}. "
            f"20 hit 5/5. Most travelers are booking the same 4.\n\n"
            f"Here's what the data actually shows:\n\n"
            f"{lines}\n\n"
            f"Every score is monthly — 5/5 in {month_name()} "
            f"may be 2/5 in August. Timing is everything.\n\n"
            f"Full ranked list → nakshiq.com\n\n{tags}"
        ).strip()
    else:
        return (
            f"{month_name().upper()}'S 5/5 PICKS\n"
            f"(Save — the window closes fast)\n\n"
            f"{lines}\n\n"
            f"NakshIQ scores 229 destinations monthly. "
            f"These are {month_name()}'s facts.\n\n"
            f"↓ Full scores → nakshiq.com\n\n{tags}"
        ).strip()


def copy_tourist_trap(trap: dict, platform: str) -> str:
    name = trap.get("name", "This destination")
    desc = trap.get("description", "")
    tags = hashtag(
        "Nakshiq", "TouristTrap", "IndiaTravelData",
        "DataDrivenTravel", "TravelSmart", f"{month_name()}Travel"
    )
    prefix = "TOURIST TRAP" if platform == "facebook" else "🚩 TOURIST TRAP"
    return (
        f"{prefix} — {name.upper()}\n\n"
        f"{desc}\n\n"
        f"NakshIQ scores 229 destinations monthly. "
        f"Some score low for a reason.\n\n"
        f"Better alternatives with real 5/5 scores → nakshiq.com\n\n{tags}"
    ).strip()


def copy_infrastructure_truth(dest: dict, platform: str) -> str:
    note = (dest.get("note") or dest.get("tagline") or "").strip()
    tags = hashtag(
        "Nakshiq", "InfrastructureTruth", dest["name"],
        "RoadTrip", "IndiaTravelData", "KnowBeforeYouDrive",
        f"{month_name()}Travel", dest["state"]
    )
    return (
        f"INFRASTRUCTURE REALITY — {dest['name'].upper()}\n\n"
        f"↑ {dest['elevation_m']:,}m · {dest['state']}\n\n"
        f"{note}\n\n"
        f"NakshIQ tracks road access, fuel availability, "
        f"ATM distance, and network signal for 229 destinations — "
        f"updated every month.\n\n"
        f"Know before you drive → nakshiq.com\n\n{tags}"
    ).strip()


def copy_monthly_forecast(destinations: list, platform: str) -> str:
    top3 = [d for d in destinations if d.get("score", 0) == 5][:3]
    lines = "\n".join(
        f"★★★★★ {d['name']} ({d['elevation_m']:,}m)\n   {d['tagline'][:72]}"
        for d in top3
    )
    tags = hashtag(
        "Nakshiq", f"{month_name()}Forecast", "IndiaTravelData",
        "DataDrivenTravel", "NorthIndia", f"{month_name()}Travel", "5outof5"
    )
    return (
        f"📊 {month_name().upper()} FORECAST — NakshIQ Monthly Update\n\n"
        f"229 destinations re-scored. This month's top 5/5 picks:\n\n"
        f"{lines}\n\n"
        f"Scores reset every month. What worked in "
        f"{(datetime.now().replace(month=datetime.now().month - 1) if datetime.now().month > 1 else datetime.now().replace(month=12)).strftime('%B')} "
        f"may not work now.\n\n"
        f"Full {month_name()} data → nakshiq.com\n\n{tags}"
    ).strip()


# ─────────────────────────────────────────────────────────────────────────────
# POST GENERATOR  (picks copy + image for a given format + platform)
# ─────────────────────────────────────────────────────────────────────────────

def generate_post(fmt: str, content: dict, platform: str,
                  used: set) -> tuple[str, str, str | None]:
    """Returns (caption, destination_id, image_url | None)"""
    destinations = content["destinations"].get("data", [])
    traps        = content["traps"].get("data", [])
    fresh        = [d for d in destinations if d["id"] not in used]
    pool         = fresh if fresh else destinations

    if not pool:
        log.warning("No destination pool available.")
        return None, None, None

    best = pick_best_destination(pool, used)

    if fmt == "score_card" and best:
        caption   = copy_score_card(best, platform)
        dest_id   = best["id"]
        image_url = best.get("image")

    elif fmt == "reality_check":
        caption, dest_id = copy_reality_check(pool, platform)
        dest_obj  = next((d for d in pool if d["id"] == dest_id), best)
        image_url = dest_obj.get("image") if dest_obj else None

    elif fmt == "data_carousel":
        caption   = copy_data_carousel(pool[:5], platform)
        dest_id   = pool[0]["id"]
        image_url = pool[0].get("image")

    elif fmt == "tourist_trap" and traps:
        caption   = copy_tourist_trap(traps[0], platform)
        dest_id   = traps[0].get("id", "trap")
        image_url = None  # traps don't carry images

    elif fmt == "infrastructure_truth" and best:
        caption   = copy_infrastructure_truth(best, platform)
        dest_id   = best["id"]
        image_url = best.get("image")

    elif fmt == "monthly_forecast":
        caption   = copy_monthly_forecast(pool, platform)
        dest_id   = pool[0]["id"] if pool else "forecast"
        image_url = pool[0].get("image") if pool else None

    else:
        # Universal fallback → score card
        caption   = copy_score_card(best, platform)
        dest_id   = best["id"]
        image_url = best.get("image")

    return caption, dest_id, image_url

# ─────────────────────────────────────────────────────────────────────────────
# OUTSTAND API CLIENT
# ─────────────────────────────────────────────────────────────────────────────

def _headers() -> dict:
    return {
        "Authorization": f"Bearer {OUTSTAND_API_KEY}",
        "Content-Type":  "application/json",
    }

def outstand_get(path: str) -> dict:
    r = requests.get(f"{OUTSTAND_BASE}{path}", headers=_headers(), timeout=15)
    r.raise_for_status()
    return r.json()

def outstand_post_req(path: str, payload: dict) -> dict:
    r = requests.post(
        f"{OUTSTAND_BASE}{path}",
        headers=_headers(),
        json=payload,
        timeout=30,
    )
    return r.json()

def get_connected_accounts() -> list:
    try:
        return outstand_get("/v1/social-accounts").get("data", [])
    except Exception as e:
        log.error(f"Could not fetch Outstand accounts: {e}")
        return []

# ─────────────────────────────────────────────────────────────────────────────
# MEDIA UPLOAD
# ─────────────────────────────────────────────────────────────────────────────

def upload_media(image_url: str, dest_id: str) -> dict | None:
    """Download from Nakshiq → upload to Outstand R2 → confirm → return media obj."""
    try:
        log.info(f"    Downloading: {image_url}")
        img = requests.get(image_url, timeout=20)
        img.raise_for_status()
        img_bytes = img.content
        size      = len(img_bytes)
        filename  = f"{dest_id}.jpg"

        # Step 1: get presigned URL
        r1 = outstand_post_req("/v1/media/upload", {
            "filename":     filename,
            "content_type": "image/jpeg",
        })
        if not r1.get("success"):
            log.warning(f"    Upload URL failed: {r1}")
            return None
        media_id   = r1["data"]["id"]
        upload_url = r1["data"]["upload_url"]

        # Step 2: PUT to R2
        put = requests.put(
            upload_url, data=img_bytes,
            headers={"Content-Type": "image/jpeg"}, timeout=60
        )
        if put.status_code != 200:
            log.warning(f"    R2 PUT failed: HTTP {put.status_code}")
            return None

        # Step 3: confirm
        r3 = outstand_post_req(f"/v1/media/{media_id}/confirm", {"size": size})
        if not r3.get("success"):
            log.warning(f"    Confirm failed: {r3}")
            return None

        media = r3["data"]
        log.info(f"    Media ready: {media['id']} ({size:,} bytes)")
        return media

    except Exception as e:
        log.warning(f"    Media upload exception: {e}")
        return None

# ─────────────────────────────────────────────────────────────────────────────
# PUBLISHER
# ─────────────────────────────────────────────────────────────────────────────

def publish(caption: str, account: dict, media: dict | None,
            dry_run: bool = False) -> dict | None:
    username = account.get("username", account["id"])
    platform = account["network"]

    if dry_run:
        log.info(f"    [DRY RUN] {platform}/{username}")
        log.info(f"    Caption ({len(caption)} chars): {caption[:120]}...")
        log.info(f"    Media: {media['filename'] if media else 'none'}")
        return {"post": {"id": "DRY_RUN"}}

    container = {"content": caption}
    if media:
        container["media"] = [{
            "id":       media["id"],
            "url":      media["url"],
            "filename": media["filename"],
        }]

    payload = {
        "accounts":   [username],
        "containers": [container],
    }

    result = outstand_post_req("/v1/posts/", payload)
    if not result.get("success"):
        log.error(f"    Publish failed: {result}")
        return None
    return result

def wait_for_publish(post_id: str, timeout: int = 30) -> dict | None:
    """Poll post status until published or timeout."""
    for _ in range(timeout // 5):
        time.sleep(5)
        try:
            r = outstand_get(f"/v1/posts/{post_id}")
            post = r.get("post", {})
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

def run(force: bool = False, sync_only: bool = False, dry_run: bool = False):
    if not OUTSTAND_API_KEY:
        log.error("OUTSTAND_API_KEY not set. Exiting.")
        sys.exit(1)

    today   = date.today().isoformat()
    weekday = date.today().weekday()
    state   = load_state()

    log.info("═" * 60)
    log.info(f"Nakshiq Autoposter  ·  {today}  ·  weekday={weekday}")
    log.info("═" * 60)

    # ── 1. Sync content (always — 3x/day) ────────────────────────────────────
    content = sync_all_content()
    state["last_sync"] = datetime.now(timezone.utc).isoformat()

    if sync_only:
        log.info("Sync-only mode. Done.")
        save_state(state)
        return

    # ── 2. Fetch connected accounts ───────────────────────────────────────────
    accounts = get_connected_accounts()
    if not accounts:
        log.warning("No connected accounts found in Outstand. Nothing to post.")
        save_state(state)
        return

    active = [a for a in accounts if a.get("isActive")]
    labels = [f"{a['network']}/{a['username']}" for a in active]
    log.info(f"Active accounts: {labels}")

    # ── 3. Determine today's format ───────────────────────────────────────────
    traps  = content["traps"].get("data", [])
    fmt    = pick_format(weekday, traps)
    used   = recently_used_destinations(state)
    log.info(f"Format today: {fmt}  ·  Used destinations (14d): {len(used)}")

    # ── 4. Post once per account ──────────────────────────────────────────────
    for account in active:
        acc_id   = account["id"]
        platform = account["network"]
        username = account.get("username", acc_id)
        label    = f"{platform}/{username}"

        if already_posted_today(state, acc_id) and not force:
            log.info(f"[{label}] Already posted today — skipping.")
            continue

        log.info(f"[{label}] Generating {fmt} post...")

        # Generate copy (platform-adapted, no verbatim duplication)
        caption, dest_id, image_url = generate_post(fmt, content, platform, used)
        if not caption:
            log.warning(f"[{label}] No content generated — skipping.")
            continue

        log.info(f"[{label}] Caption ready ({len(caption)} chars, dest={dest_id})")

        # Upload media
        media_obj = None
        if image_url:
            log.info(f"[{label}] Uploading media...")
            media_obj = upload_media(image_url, dest_id)
            if not media_obj:
                log.warning(f"[{label}] Media upload failed — posting text-only.")

        # Publish
        log.info(f"[{label}] Publishing...")
        result = publish(caption, account, media_obj, dry_run=dry_run)
        if not result:
            log.error(f"[{label}] ❌ Publish failed.")
            continue

        post_id = result.get("post", {}).get("id", "unknown")

        # Poll for confirmation
        if not dry_run and post_id != "unknown":
            confirmed = wait_for_publish(post_id)
            if confirmed:
                fb_id = confirmed.get("platformPostId", "—")
                log.info(f"[{label}] ✅ Published · Outstand={post_id} · Platform={fb_id}")
            else:
                log.warning(f"[{label}] ⚠️  Post queued but not yet confirmed (ID={post_id})")
        else:
            log.info(f"[{label}] ✅ Submitted (post_id={post_id})")

        if not dry_run:
            mark_posted(state, acc_id, dest_id, fmt, post_id, platform, bool(media_obj))
            used.add(dest_id)  # prevent same dest on another platform same day

    # ── 5. Save state ─────────────────────────────────────────────────────────
    save_state(state)
    log.info("State saved. Run complete.")
    log.info("═" * 60)

# ─────────────────────────────────────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Nakshiq Autonomous Social Media Poster")
    parser.add_argument("--force",     action="store_true", help="Post even if already posted today")
    parser.add_argument("--sync-only", action="store_true", help="Sync only, no posting")
    parser.add_argument("--dry-run",   action="store_true", help="Preview without publishing")
    args = parser.parse_args()
    run(force=args.force, sync_only=args.sync_only, dry_run=args.dry_run)
