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
import sys
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


def _log(msg: str) -> None:
    print(f"[digest_weekly] {msg}", flush=True)


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


def render_report(snaps: list[dict[str, Any]], days: int) -> str:
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
    out_path.write_text(render_report(snaps, days))
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
