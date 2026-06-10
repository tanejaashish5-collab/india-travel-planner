#!/usr/bin/env python3
"""
digest_weekly.py — Tier 2.5 (2026-05-10)
==========================================
Generates a weekly engagement digest from data/post_engagement.json (filled
by engagement_pull.py).  Output is a Markdown report committed to
data/research/social-engagement-week-{YYYY-MM-DD}.md so the trend stays
durable and reviewable in git.

What's in the report
--------------------
1. Summary: posts published in the last 7 days, total reach / likes / saves,
   and the engagement-rate baseline (engagement / reach × 100).
2. Top 5 posts by velocity (engagement per hour since publish).
3. Bottom 5 posts (kill-format candidates).
4. Format leaderboard: avg likes / saves / reach per format.
5. Platform leaderboard.
6. Post-by-post table (sortable by saves descending — the #1 IG ranking signal).

Usage
-----
    python digest_weekly.py
    Or via the autoposter CLI: python autoposter.py --digest-weekly

Cron
----
    Sundays 22:17 UTC (03:47 IST Mon) — runs after the daily engagement-pull
    at 21:17 UTC so the digest sees the most-recent metrics.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any


HERE = Path(__file__).resolve().parent
REPO_ROOT = HERE.parent
DATA_DIR = HERE / "data"
ENGAGEMENT_PATH = DATA_DIR / "post_engagement.json"
OUTCOMES_PATH = DATA_DIR / "post_outcomes.jsonl"
REPORT_DIR = REPO_ROOT / "data" / "research"

# Monetisation gate from the roadmap (CLAUDE.md: "gated until 100K MUV +
# 2K email list") — shown next to the subscriber count so the digest always
# answers "how far from the gate are we?" in absolute terms.
EMAIL_LIST_GATE = 2000


def _log(msg: str) -> None:
    print(f"[digest_weekly] {msg}", flush=True)


# ─────────────────────────────────────────────────────────────────────────
# Owned-audience ABSOLUTE counts (added 2026-06-10)
# -------------------------------------------------------------------------
# WHY: the digest reported only percentages / relative metrics, which masked
# an email base of ~6 against the 2,000-subscriber monetisation gate.
# Absolute counts make a tiny base un-maskable.
#
# DB access mirrors content_calendar_gen.py (env or apps/web/.env.local +
# PostgREST). Counts use HEAD probes with `Prefer: count=exact`, which
# return ONLY a Content-Range header — zero row egress (Supabase egress
# rules, CLAUDE.md). Missing creds / network errors degrade to "unavailable"
# so the Sunday cron never fails on this section.
# ─────────────────────────────────────────────────────────────────────────

def _load_env_local() -> None:
    """Mirror content_calendar_gen.py's loader: pick up Supabase creds from
    apps/web/.env.local when not already in the environment (local runs).
    On GitHub Actions the secrets arrive via the workflow env."""
    env_file = REPO_ROOT / "apps" / "web" / ".env.local"
    if not env_file.exists():
        return
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        v = v.strip().strip('"').strip("'")
        # Known repo gotcha (2026-06-08 session memory): some .env.local
        # values carry a LITERAL "\n" inside the quotes → DNS failures.
        v = v.replace("\\n", "").replace("\\r", "").strip()
        os.environ.setdefault(k.strip(), v)


def _sb_count(table: str, params: str = "") -> int | None:
    """Exact row count via a PostgREST HEAD probe (no rows transferred).
    Returns None when creds are missing or the request fails."""
    url_base = (os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
                or os.environ.get("SUPABASE_URL"))
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not url_base or not key:
        return None
    qs = "select=*" + (f"&{params}" if params else "")
    req = urllib.request.Request(
        f"{url_base.rstrip('/')}/rest/v1/{table}?{qs}",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Prefer": "count=exact",
            "Range": "0-0",
        },
        method="HEAD",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            content_range = resp.headers.get("Content-Range") or ""
    except (urllib.error.URLError, OSError) as e:
        _log(f"WARNING: count probe failed for {table}: {e}")
        return None
    # Content-Range looks like "0-0/123" (or "*/123" on empty tables).
    try:
        return int(content_range.rsplit("/", 1)[1])
    except (IndexError, ValueError):
        _log(f"WARNING: unparseable Content-Range for {table}: {content_range!r}")
        return None


def owned_audience_counts() -> dict[str, int | None]:
    """Absolute owned-audience counts. Keys map to the report rows below."""
    _load_env_local()
    return {
        # THE number: confirmed AND not unsubscribed — matches the
        # "Active confirmed" definition in scripts/_audit-conversion.mjs.
        "newsletter_active": _sb_count(
            "newsletter_subscribers",
            "confirmed_at=not.is.null&unsubscribed_at=is.null"),
        "newsletter_total": _sb_count("newsletter_subscribers"),
        "destination_alerts": _sb_count("destination_alerts"),
        "trip_boards": _sb_count("trip_boards"),
    }


def _fmt_count(v: int | None) -> str:
    return "unavailable" if v is None else f"{v:,}"


def load_engagement() -> dict[str, Any]:
    if not ENGAGEMENT_PATH.exists():
        _log(f"WARNING: {ENGAGEMENT_PATH} does not exist — empty digest.")
        return {}
    try:
        return json.loads(ENGAGEMENT_PATH.read_text())
    except (json.JSONDecodeError, OSError) as e:
        _log(f"ERROR: engagement store unreadable: {e}")
        return {}


def hours_since(iso_ts: str | None) -> float | None:
    if not iso_ts:
        return None
    try:
        dt = datetime.fromisoformat(iso_ts.replace("Z", "+00:00"))
    except ValueError:
        return None
    delta = datetime.now(timezone.utc) - dt
    return max(delta.total_seconds() / 3600.0, 0.5)  # floor 30 min to avoid divide-by-tiny


def velocity(snap: dict[str, Any]) -> float:
    """Engagement-per-hour score.  Tier-3 IG ranking weights:
    saves and comments matter more than likes; reach is a reach signal,
    not engagement.
    """
    m = snap.get("metrics") or {}
    weighted = (
        (m.get("saves") or 0) * 5
        + (m.get("comments") or 0) * 3
        + (m.get("shares") or 0) * 3
        + (m.get("likes") or 0) * 1
    )
    h = hours_since(snap.get("published_at"))
    if h is None:
        return 0.0
    return round(weighted / h, 3)


def filter_recent(store: dict[str, Any], days: int) -> list[dict[str, Any]]:
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    out = []
    for snap in store.values():
        ts = snap.get("published_at")
        if not ts:
            continue
        try:
            dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
        except ValueError:
            continue
        if dt >= cutoff:
            out.append(snap)
    return out


def _fmt_int(n: Any) -> str:
    if not isinstance(n, (int, float)):
        return "—"
    return f"{int(n):,}"


def render_report(snaps: list[dict[str, Any]], days: int,
                  audience: dict[str, int | None] | None = None) -> str:
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    # Sort variants
    by_velocity = sorted(snaps, key=velocity, reverse=True)
    by_saves = sorted(snaps,
                       key=lambda s: (s.get("metrics", {}).get("saves") or 0,
                                      s.get("metrics", {}).get("comments") or 0,
                                      s.get("metrics", {}).get("likes") or 0),
                       reverse=True)

    # Aggregates
    total = {"likes": 0, "comments": 0, "saves": 0, "shares": 0,
             "reach": 0, "views": 0, "impressions": 0}
    by_format: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    by_format_count: dict[str, int] = defaultdict(int)
    by_platform: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    by_platform_count: dict[str, int] = defaultdict(int)

    for s in snaps:
        m = s.get("metrics") or {}
        for k in total:
            total[k] += int(m.get(k) or 0)
        fmt = s.get("format") or "?"
        plat = s.get("network") or "?"
        for k in total:
            by_format[fmt][k] += int(m.get(k) or 0)
            by_platform[plat][k] += int(m.get(k) or 0)
        by_format_count[fmt] += 1
        by_platform_count[plat] += 1

    # ── Markdown ──
    lines: list[str] = []
    lines.append(f"# NakshIQ Social — Engagement Digest · week of {today}")
    lines.append("")
    lines.append(f"**Window:** last {days} days · **Posts pulled:** {len(snaps)}")
    lines.append("")
    lines.append("## Summary")
    lines.append("")
    lines.append(f"- **Total likes:** {_fmt_int(total['likes'])}")
    lines.append(f"- **Total comments:** {_fmt_int(total['comments'])}")
    lines.append(f"- **Total saves:** {_fmt_int(total['saves'])} · IG #1 ranking signal")
    lines.append(f"- **Total shares:** {_fmt_int(total['shares'])}")
    lines.append(f"- **Total reach (IG only):** {_fmt_int(total['reach'])}")
    lines.append(f"- **Total YT views:** {_fmt_int(total['views'])}")
    if total['reach']:
        eng_rate = (total['likes'] + total['comments'] + total['saves'] + total['shares']) / max(total['reach'], 1) * 100
        lines.append(f"- **Engagement rate (eng / reach):** {eng_rate:.2f}%")
    lines.append("")

    # ── Owned audience — ABSOLUTE counts ──
    # Deliberately absolute, never percentage-only: a percentage on a base of
    # 6 subscribers reads healthy and hides the real problem. If a number
    # below is tiny, it must LOOK tiny.
    aud = audience if audience is not None else {}
    lines.append("## Owned audience — absolute counts")
    lines.append("")
    lines.append("Absolute numbers on purpose — percentage metrics previously "
                 "masked a single-digit email base. Source: live Supabase "
                 "count probes at digest time.")
    lines.append("")
    lines.append("| Metric | Count |")
    lines.append("|---|---:|")
    nl_active = aud.get("newsletter_active")
    gate_note = (f" of {EMAIL_LIST_GATE:,} monetisation gate"
                 if nl_active is not None else "")
    lines.append(f"| **Newsletter subscribers (confirmed, not unsubscribed)** "
                 f"| **{_fmt_count(nl_active)}**{gate_note} |")
    lines.append(f"| Newsletter rows lifetime (incl. unconfirmed) "
                 f"| {_fmt_count(aud.get('newsletter_total'))} |")
    lines.append(f"| Destination peak-alert rows (total) "
                 f"| {_fmt_count(aud.get('destination_alerts'))} |")
    lines.append(f"| Trip boards (total) "
                 f"| {_fmt_count(aud.get('trip_boards'))} |")
    if nl_active is None:
        lines.append("")
        lines.append("_Counts unavailable — set `NEXT_PUBLIC_SUPABASE_URL` + "
                     "`SUPABASE_SERVICE_ROLE_KEY` in the digest environment._")
    lines.append("")

    lines.append("## Top 5 by velocity (engagement / hour since publish)")
    lines.append("")
    lines.append("Velocity weights: saves×5 + comments×3 + shares×3 + likes×1.  "
                 "Higher = stronger algorithmic signal.  "
                 "If the top 1-2 here are the same format week-over-week, "
                 "double-down on that format.")
    lines.append("")
    lines.append("| # | post_id | network | format | dest | likes | comments | saves | reach | velocity |")
    lines.append("|---|---|---|---|---|---:|---:|---:|---:|---:|")
    for i, s in enumerate(by_velocity[:5], 1):
        m = s.get("metrics") or {}
        lines.append(
            f"| {i} | `{s.get('post_id', '?')}` | {s.get('network', '?')} | "
            f"{s.get('format', '?')} | {s.get('destination') or '—'} | "
            f"{m.get('likes', 0)} | {m.get('comments', 0)} | "
            f"{m.get('saves', 0)} | {m.get('reach', 0)} | {velocity(s):.2f} |"
        )
    lines.append("")

    lines.append("## Bottom 5 (kill-format candidates)")
    lines.append("")
    lines.append("Posts that have been live ≥48h with zero saves AND zero comments.  "
                 "If a format keeps appearing here, deprecate it in Tier 5.")
    lines.append("")
    dead = [s for s in snaps
            if (s.get("metrics", {}).get("saves") or 0) == 0
            and (s.get("metrics", {}).get("comments") or 0) == 0
            and (hours_since(s.get("published_at")) or 0) >= 48]
    dead.sort(key=lambda s: hours_since(s.get("published_at")) or 0, reverse=True)
    if dead:
        lines.append("| post_id | network | format | dest | hrs live | likes | reach |")
        lines.append("|---|---|---|---|---:|---:|---:|")
        for s in dead[:5]:
            m = s.get("metrics") or {}
            lines.append(
                f"| `{s.get('post_id', '?')}` | {s.get('network', '?')} | "
                f"{s.get('format', '?')} | {s.get('destination') or '—'} | "
                f"{hours_since(s.get('published_at')) or 0:.0f} | "
                f"{m.get('likes', 0)} | {m.get('reach', 0)} |"
            )
    else:
        lines.append("_No bottom-cohort posts this week — every post got at least one save or comment._")
    lines.append("")

    lines.append("## Format leaderboard (avg per post)")
    lines.append("")
    lines.append("| format | posts | avg likes | avg saves | avg comments | avg reach |")
    lines.append("|---|---:|---:|---:|---:|---:|")
    fmt_rows = []
    for fmt, agg in by_format.items():
        n = max(by_format_count[fmt], 1)
        fmt_rows.append((fmt, n, agg["likes"]/n, agg["saves"]/n, agg["comments"]/n, agg["reach"]/n))
    fmt_rows.sort(key=lambda r: r[3] + r[4], reverse=True)  # by avg saves+comments
    for fmt, n, l, s, c, r in fmt_rows:
        lines.append(f"| {fmt} | {n} | {l:.1f} | {s:.2f} | {c:.2f} | {r:.0f} |")
    lines.append("")

    lines.append("## Platform leaderboard (totals)")
    lines.append("")
    lines.append("| network | posts | likes | comments | saves | shares | reach | views |")
    lines.append("|---|---:|---:|---:|---:|---:|---:|---:|")
    for plat, agg in sorted(by_platform.items(), key=lambda kv: -kv[1]["likes"]):
        n = by_platform_count[plat]
        lines.append(
            f"| {plat} | {n} | {agg['likes']} | {agg['comments']} | "
            f"{agg['saves']} | {agg['shares']} | {agg['reach']} | {agg['views']} |"
        )
    lines.append("")

    lines.append("## All posts this week (sorted by saves descending)")
    lines.append("")
    lines.append("| post_id | published | network | format | dest | likes | comments | saves | reach | views |")
    lines.append("|---|---|---|---|---|---:|---:|---:|---:|---:|")
    for s in by_saves:
        m = s.get("metrics") or {}
        when = (s.get("published_at") or "")[:16].replace("T", " ")
        lines.append(
            f"| `{s.get('post_id', '?')}` | {when} | {s.get('network', '?')} | "
            f"{s.get('format', '?')} | {s.get('destination') or '—'} | "
            f"{m.get('likes', 0)} | {m.get('comments', 0)} | "
            f"{m.get('saves', 0)} | {m.get('reach', 0)} | {m.get('views', 0)} |"
        )
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("_Generated by `nakshiq-autoposter/digest_weekly.py`. "
                 "Engagement source: Outstand `/v1/posts/{id}/analytics`. "
                 "Pulled by `engagement_pull.py` daily at 21:17 UTC._")
    lines.append("")
    return "\n".join(lines)


def run(days: int = 7) -> Path | None:
    store = load_engagement()
    if not store:
        _log("Empty engagement store — digest skipped.  "
             "Run engagement_pull.py first.")
        return None
    snaps = filter_recent(store, days)
    if not snaps:
        _log(f"No posts in the last {days} days.")
        return None

    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    out_path = REPORT_DIR / f"social-engagement-week-{today}.md"
    audience = owned_audience_counts()
    out_path.write_text(render_report(snaps, days, audience=audience))
    _log(f"Digest written: {out_path} ({len(snaps)} posts in window)")
    return out_path


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__,
                                      formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--days", type=int, default=7,
                        help="Window in days (default 7).")
    args = parser.parse_args(argv)
    out = run(days=args.days)
    return 0 if out else 1


if __name__ == "__main__":
    sys.exit(main())
