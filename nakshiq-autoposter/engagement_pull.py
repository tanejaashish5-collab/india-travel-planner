#!/usr/bin/env python3
"""
engagement_pull.py — Tier 2 (2026-05-10)
==========================================
Pulls per-post engagement (likes / comments / saves / shares / reach /
views) from Outstand's /v1/posts/{id}/analytics endpoint and stores it
alongside the existing publish log.

The Tier 2.1 spike (scripts/spike_outstand_insights.py, 2026-05-10)
confirmed Outstand returns full engagement data for IG / FB / YT — so
this module skips the direct Meta Graph / YouTube Data v3 path entirely.

Storage
-------
    data/post_engagement.json   {post_id: snapshot, ...}

Snapshot schema
---------------
    {
      "post_id":          "Piix0",
      "platform_post_id": "1040562...",        # IG/FB/YT native ID
      "network":          "instagram",
      "account":          "nakshiq",
      "published_at":     "2026-05-10T03:04:48Z",
      "pulled_at":        "2026-05-10T05:30:00Z",
      "metrics": {
        "likes":      1,
        "comments":   0,
        "saves":      0,    # IG only
        "shares":     0,
        "reach":      0,    # IG only
        "views":      0,    # YT only
        "impressions": 0,
        "engagement_total": 1
      },
      "aggregated": { ... whole-post numbers across all account-publishes ... }
    }

Usage
-----
    OUTSTAND_API_KEY=... python engagement_pull.py [--days 7]

    Or as part of the autoposter CLI: python autoposter.py --engagement-pull

Cron
----
    21:17 UTC (02:47 IST next day) — gives posts ~6h to accumulate engagement
    after the latest evening publish at 13:17 UTC.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import requests


OUTSTAND_BASE = "https://api.outstand.so"
HERE = Path(__file__).resolve().parent
DATA_DIR = HERE / "data"
POST_OUTCOMES_PATH = DATA_DIR / "post_outcomes.jsonl"
POST_ENGAGEMENT_PATH = DATA_DIR / "post_engagement.json"
PULL_TIMEOUT_SEC = 12
SLEEP_BETWEEN_CALLS_SEC = 0.5  # gentle on Outstand


def _log(msg: str) -> None:
    print(f"[engagement_pull] {msg}", flush=True)


def _headers(api_key: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {api_key}",
            "Accept": "application/json"}


def load_outcomes(days: int) -> list[dict[str, Any]]:
    """Read post_outcomes.jsonl and return records from the last N days that
    have a non-null post_id and status='published'.
    """
    if not POST_OUTCOMES_PATH.exists():
        _log(f"post_outcomes.jsonl not found at {POST_OUTCOMES_PATH}")
        return []
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    out: list[dict[str, Any]] = []
    with open(POST_OUTCOMES_PATH, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except json.JSONDecodeError:
                continue
            if rec.get("status") != "published":
                continue
            pid = rec.get("post_id")
            if not pid:
                continue
            ts = rec.get("ts")
            if ts:
                try:
                    when = datetime.fromisoformat(ts.replace("Z", "+00:00"))
                    if when < cutoff:
                        continue
                except ValueError:
                    pass
            out.append(rec)
    return out


def load_engagement_store() -> dict[str, Any]:
    if not POST_ENGAGEMENT_PATH.exists():
        return {}
    try:
        return json.loads(POST_ENGAGEMENT_PATH.read_text())
    except (json.JSONDecodeError, OSError) as e:
        _log(f"WARNING: engagement store unreadable ({e}); starting fresh")
        return {}


def save_engagement_store(store: dict[str, Any]) -> None:
    """Atomic write — temp file + rename, so a crashed pull never truncates."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    tmp = POST_ENGAGEMENT_PATH.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(store, indent=2, ensure_ascii=False, sort_keys=True))
    tmp.replace(POST_ENGAGEMENT_PATH)


def normalize_metrics(m: dict[str, Any]) -> dict[str, int]:
    """Coerce Outstand's per-account metrics block into a flat int dict
    with our canonical keys.  Missing fields default to 0.

    IG keys:        likes, comments, saves, shares, reach, impressions
    FB keys:        likes, comments, shares, engagement_total
    YT keys:        views, likes, comments, shares
    """
    if not isinstance(m, dict):
        return {}
    plat_specific = m.get("platform_specific") or {}
    if not isinstance(plat_specific, dict):
        plat_specific = {}

    def _pick(*keys: str) -> int:
        for k in keys:
            if k in m:
                v = m.get(k)
                if isinstance(v, (int, float)):
                    return int(v)
            if k in plat_specific:
                v = plat_specific.get(k)
                if isinstance(v, (int, float)):
                    return int(v)
        return 0

    return {
        "likes":            _pick("likes", "like_count"),
        "comments":         _pick("comments", "comment_count"),
        "saves":            _pick("saves", "saved"),
        "shares":           _pick("shares"),
        "reach":            _pick("reach"),
        "impressions":      _pick("impressions"),
        "views":            _pick("views", "video_views"),
        "engagement_total": _pick("engagement_total", "engagement"),
    }


def fetch_analytics(api_key: str, post_id: str) -> dict[str, Any] | None:
    url = f"{OUTSTAND_BASE}/v1/posts/{post_id}/analytics"
    try:
        r = requests.get(url, headers=_headers(api_key), timeout=PULL_TIMEOUT_SEC)
    except requests.RequestException as e:
        _log(f"  {post_id}: request error: {e}")
        return None
    if r.status_code != 200:
        _log(f"  {post_id}: HTTP {r.status_code} ({r.text[:120]})")
        return None
    try:
        return r.json()
    except ValueError:
        _log(f"  {post_id}: non-JSON response")
        return None


def build_snapshot(post_id: str,
                   outcome: dict[str, Any],
                   analytics: dict[str, Any]) -> dict[str, Any]:
    """Flatten Outstand's nested response into a single per-post snapshot
    keyed by post_id.  Picks the FIRST account's per-platform metrics
    (most posts go to one account; IG+FB cross-posts are rare).  The full
    aggregated_metrics block is preserved for the multi-account case.
    """
    by_account = analytics.get("metrics_by_account") or []
    primary = by_account[0] if by_account else {}
    metrics = normalize_metrics(primary.get("metrics") or {})
    return {
        "post_id":          post_id,
        "platform_post_id": primary.get("platform_post_id"),
        "network":          (primary.get("social_account") or {}).get("network")
                            or outcome.get("platform"),
        "account":          (primary.get("social_account") or {}).get("username")
                            or outcome.get("account"),
        "format":           outcome.get("format"),
        "destination":      outcome.get("dest_id"),
        "utm_content":      outcome.get("utm_content"),
        "published_at":     primary.get("published_at")
                            or analytics.get("post", {}).get("publishedAt")
                            or outcome.get("ts"),
        "pulled_at":        datetime.now(timezone.utc).isoformat(),
        "metrics":          metrics,
        "aggregated":       analytics.get("aggregated_metrics") or {},
        "account_count":    len(by_account),
    }


def run(days: int = 7, max_posts: int | None = None,
        sleep: float = SLEEP_BETWEEN_CALLS_SEC) -> int:
    """Pull engagement for every published post in the last `days` days.

    Returns the number of posts whose engagement was refreshed.
    """
    api_key = os.environ.get("OUTSTAND_API_KEY")
    if not api_key:
        _log("ERROR: OUTSTAND_API_KEY missing")
        return 0

    outcomes = load_outcomes(days=days)
    if max_posts:
        outcomes = outcomes[-max_posts:]
    _log(f"Loaded {len(outcomes)} published posts from last {days} days "
         f"(post_outcomes.jsonl).")

    if not outcomes:
        _log("Nothing to pull.")
        return 0

    store = load_engagement_store()
    refreshed = 0
    failed = 0
    seen_ids: set[str] = set()

    for outcome in outcomes:
        post_id = outcome["post_id"]
        if post_id in seen_ids:
            # Outstand returns the same analytics for every account-publish
            # of a given post_id; one fetch covers IG+FB+YT.  Skip dupes.
            continue
        seen_ids.add(post_id)

        analytics = fetch_analytics(api_key, post_id)
        if analytics is None:
            failed += 1
            continue

        snap = build_snapshot(post_id, outcome, analytics)
        store[post_id] = snap
        refreshed += 1
        m = snap["metrics"]
        _log(f"  {post_id} {snap['network']:>9s} {snap['format'] or '?':>20s} | "
             f"likes={m['likes']:>3} comments={m['comments']:>2} "
             f"saves={m['saves']:>2} shares={m['shares']:>2} "
             f"reach={m['reach']:>5} views={m['views']:>5}")
        if sleep:
            time.sleep(sleep)

    save_engagement_store(store)
    _log(f"Refreshed {refreshed} posts ({failed} failed).  "
         f"Store now has {len(store)} entries → {POST_ENGAGEMENT_PATH}")
    return refreshed


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__,
                                      formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--days", type=int, default=7,
                        help="Pull engagement for posts in the last N days (default: 7)")
    parser.add_argument("--max", type=int, default=None,
                        help="Cap on number of posts to process (debug)")
    parser.add_argument("--sleep", type=float, default=SLEEP_BETWEEN_CALLS_SEC,
                        help="Seconds to sleep between Outstand calls "
                             "(default: 0.5; rate-limit guard)")
    args = parser.parse_args(argv)

    refreshed = run(days=args.days, max_posts=args.max, sleep=args.sleep)
    return 0 if refreshed >= 0 else 1


if __name__ == "__main__":
    sys.exit(main())
