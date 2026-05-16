#!/usr/bin/env python3
"""
spike_outstand_insights.py — Tier 2.1 (2026-05-10)
=====================================================
Probes Outstand's API for an engagement-insights endpoint.  Called by
Tier 2 of the social overhaul: if Outstand exposes per-post likes/views/
comments/saves/reach, we use it (cheap path).  If every probe returns
4xx/5xx, we fall back to direct Meta Graph + YouTube Data v3 clients
(`engagement_pull.py`).

Usage
-----
    OUTSTAND_API_KEY=... python scripts/spike_outstand_insights.py

The script reads recent successful post_ids from state.json (so we always
test against IDs that exist on the Outstand side) and probes a fixed list
of candidate paths.  Output is summarised to stdout AND committed to
data/research/spike-outstand-insights-{date}.md so the result is durable.

Exit code
---------
    0  → at least one probed path returned 200 with engagement-shaped JSON
    1  → every probe failed (no insights endpoint surfaced)
    2  → environment / setup error before any probe ran
"""
from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests


OUTSTAND_BASE = "https://api.outstand.so"
HERE = Path(__file__).resolve().parent
AUTOPOSTER_DIR = HERE.parent
REPO_ROOT = AUTOPOSTER_DIR.parent
STATE_FILE = AUTOPOSTER_DIR / "state.json"
REPORT_DIR = REPO_ROOT / "data" / "research"

# Candidate probes — each is (path_template, description).  {post_id} is
# replaced per call.  Ordered roughly by likelihood of existing.
CANDIDATE_PATHS = [
    ("/v1/posts/{post_id}/insights",      "REST sub-resource (Meta-style)"),
    ("/v1/posts/{post_id}/metrics",       "alt naming for insights"),
    ("/v1/posts/{post_id}/analytics",     "alt naming"),
    ("/v1/posts/{post_id}/engagement",    "alt naming"),
    ("/v1/posts/{post_id}/stats",         "alt naming"),
    ("/v1/posts/{post_id}?fields=insights,metrics,engagement,stats", "field-include"),
    ("/v1/posts/{post_id}",               "baseline (does field show up unprompted?)"),
    ("/v1/insights?post_id={post_id}",    "query-param style"),
    ("/v1/analytics?post_id={post_id}",   "alt query-param"),
    ("/v1/posts/{post_id}/performance",   "performance phrasing"),
]

ENGAGEMENT_KEYS = {
    "likes", "comments", "saves", "saved", "shares", "reach",
    "impressions", "views", "plays", "engagement", "engagements",
    "video_views", "comment_count", "like_count", "reactions",
    "favorites", "stats", "metrics", "insights",
}


def env_or_die(key: str) -> str:
    val = os.environ.get(key)
    if not val:
        print(f"::error::Missing required env var {key}.  "
              f"Run with `{key}=... python scripts/spike_outstand_insights.py`",
              file=sys.stderr)
        sys.exit(2)
    return val


def headers(api_key: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {api_key}",
            "Accept": "application/json"}


def pick_post_ids_from_state(n: int = 5) -> list[dict[str, Any]]:
    """Return up to N recent post_log entries — one per platform if available
    so we cover IG, FB, YT in the spike.
    """
    if not STATE_FILE.exists():
        print(f"state.json not found at {STATE_FILE}; skipping post-id discovery.",
              file=sys.stderr)
        return []
    try:
        st = json.loads(STATE_FILE.read_text())
    except json.JSONDecodeError as e:
        print(f"state.json invalid: {e}", file=sys.stderr)
        return []
    log = st.get("post_log", []) or []
    seen_platforms: set[str] = set()
    picks: list[dict[str, Any]] = []
    # Walk most-recent first
    for entry in reversed(log):
        pid = entry.get("post_id")
        plat = entry.get("platform") or ""
        if not pid:
            continue
        if plat in seen_platforms and len(picks) >= 3:
            # already covered IG / FB / YT
            continue
        picks.append({"post_id": pid, "platform": plat,
                       "format": entry.get("format"),
                       "destination": entry.get("destination"),
                       "date": entry.get("date")})
        seen_platforms.add(plat)
        if len(picks) >= n:
            break
    return picks


def probe(api_key: str, path: str, post_id: str) -> dict[str, Any]:
    url = OUTSTAND_BASE + path.format(post_id=post_id)
    try:
        r = requests.get(url, headers=headers(api_key), timeout=12)
    except requests.RequestException as e:
        return {"status": "error", "exception": str(e)}
    out: dict[str, Any] = {
        "status": r.status_code,
        "url": url,
        "content_type": r.headers.get("content-type", "")[:80],
    }
    if r.status_code != 200:
        out["body_preview"] = r.text[:300]
        return out
    # Look for engagement-shaped data
    try:
        body = r.json()
    except ValueError:
        out["body_preview"] = r.text[:300]
        out["engagement_shape"] = "non-json"
        return out
    out["engagement_shape"] = classify_shape(body)
    out["body_preview"] = (json.dumps(body)[:600]
                            if isinstance(body, (dict, list)) else str(body)[:300])
    return out


def classify_shape(body: Any) -> str:
    """Heuristic — does this response look like engagement data?"""
    if isinstance(body, dict):
        all_keys: set[str] = set()
        def _walk(o: Any) -> None:
            if isinstance(o, dict):
                for k, v in o.items():
                    all_keys.add(k.lower())
                    _walk(v)
            elif isinstance(o, list):
                for item in o:
                    _walk(item)
        _walk(body)
        hits = ENGAGEMENT_KEYS & all_keys
        if hits:
            return f"ENGAGEMENT_KEYS_FOUND={sorted(hits)}"
    return "no engagement-shaped fields found"


def render_report(probes: list[dict[str, Any]],
                  picks: list[dict[str, Any]],
                  ok_paths: list[str]) -> str:
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    lines: list[str] = [
        f"# Outstand Insights API Spike — {today}",
        "",
        ("**Verdict:** "
         + ("✅ Found at least one working insights path."
            if ok_paths else "❌ No insights endpoint surfaced.  Falling back to Meta Graph + YT Data v3.")),
        "",
        f"## Tested post IDs ({len(picks)})",
        "",
    ]
    if picks:
        lines.append("| post_id | platform | format | destination | date |")
        lines.append("|---|---|---|---|---|")
        for p in picks:
            lines.append("| `{post_id}` | {platform} | {format} | {destination} | {date} |".format(**p))
    else:
        lines.append("_No post_ids resolved from state.json — re-run after a successful publish._")
    lines += ["", "## Probe results", ""]
    lines.append("| post_id | path | status | shape |")
    lines.append("|---|---|---|---|")
    for p in probes:
        shape = p.get("engagement_shape") or p.get("body_preview", "")[:40]
        lines.append(f"| `{p['post_id']}` | `{p['path']}` | {p['status']} | {shape[:80]} |")
    lines += ["", "## Successful paths", ""]
    if ok_paths:
        for path in ok_paths:
            lines.append(f"- `{path}`")
    else:
        lines.append("_None — every probed path returned non-200 or non-engagement-shaped JSON._")
    lines += [
        "",
        "## Next steps",
        "",
    ]
    if ok_paths:
        lines += [
            ("- Wire the working path into `engagement_pull.py` (Tier 2.2). "
             "Use the Outstand bearer token; no Meta/YT direct API needed."),
            "- Confirm response shape across IG / FB / YT in case fields differ per platform.",
            "- Set up the Tier 2.5 weekly digest using these fields.",
        ]
    else:
        lines += [
            ("- Build direct Meta Graph + YT Data v3 clients in "
             "`engagement_pull.py` (Tier 2.2 fallback)."),
            ("- Hard prereq: confirm both Instagram accounts (m8EAd, PdMu0) "
             "are **Business or Creator** type — Personal accounts return "
             "100 OAUTH on insights endpoints."),
            ("- Add env vars: `META_APP_ID`, `META_APP_SECRET`, "
             "`META_USER_ACCESS_TOKEN` (long-lived), `IG_BUSINESS_ID_M8EAD`, "
             "`IG_BUSINESS_ID_PDMU0`, `FB_PAGE_ID`, `YOUTUBE_API_KEY`."),
            ("- Optional: open an Outstand support ticket asking whether "
             "an insights endpoint exists.  In the meantime the direct path "
             "is the only reliable way to measure."),
        ]
    return "\n".join(lines) + "\n"


def main() -> int:
    api_key = env_or_die("OUTSTAND_API_KEY")
    picks = pick_post_ids_from_state(n=5)
    if not picks:
        print("No post_ids in state.json — cannot probe.  Re-run after a publish.",
              file=sys.stderr)
        # Still write a report so the spike result is documented.

    print(f"\nProbing {len(CANDIDATE_PATHS)} paths × {len(picks)} post_ids "
          f"= {len(CANDIDATE_PATHS) * len(picks)} requests.\n")

    probes: list[dict[str, Any]] = []
    ok_paths: list[str] = []
    for entry in picks:
        post_id = entry["post_id"]
        for path, desc in CANDIDATE_PATHS:
            result = probe(api_key, path, post_id)
            result["post_id"] = post_id
            result["path"] = path
            result["description"] = desc
            status = result.get("status")
            shape = result.get("engagement_shape", "")
            print(f"  {post_id} | {status:>5} | {path}")
            if status == 200 and "ENGAGEMENT_KEYS_FOUND" in str(shape):
                if path not in ok_paths:
                    ok_paths.append(path)
                    print(f"    ⮕ ENGAGEMENT-SHAPED RESPONSE: {shape}")
            probes.append(result)

    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    report_path = REPORT_DIR / f"spike-outstand-insights-{today}.md"
    report_path.write_text(render_report(probes, picks, ok_paths))
    print(f"\nReport written: {report_path}")

    if ok_paths:
        print(f"\n✅ Tier 2.1 SUCCESS — {len(ok_paths)} working path(s):")
        for p in ok_paths:
            print(f"   - {p}")
        return 0
    print("\n❌ Tier 2.1 FAIL — no insights endpoint found.  "
          "Proceed with direct Meta + YT API fallback (Tier 2.2).")
    return 1


if __name__ == "__main__":
    sys.exit(main())
