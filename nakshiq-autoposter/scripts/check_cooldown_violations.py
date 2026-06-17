#!/usr/bin/env python3
"""Deterministic cooldown-violation check for the NakshIQ autoposter.

Why this exists
---------------
On 2026-06-17 the founder noticed pangong-lake posting repeatedly ("twice in
2 days"). It had actually posted 7× in 14 days, all via CSV v2/v3 formats. The
AI-generated daily audit said "0 issues" the whole time — it samples summaries,
it doesn't replay the dedup windows. This script is the deterministic guardrail:
it replays the SAME three cooldown windows the autoposter enforces and fails if
any was violated.

Windows (must match post_fingerprints() in autoposter.py):
  - destination       : no repeat within 14 days
  - (destination, fmt): no repeat within 30 days   ("rotate the format too")
  - media_id          : no repeat within 60 days

Usage
-----
  python3 scripts/check_cooldown_violations.py                  # default log, last 16 days
  python3 scripts/check_cooldown_violations.py --all            # whole history
  python3 scripts/check_cooldown_violations.py --since-days 30
  python3 scripts/check_cooldown_violations.py /path/to/post_log.jsonl

Exit code is 1 if any violation falls inside the report window (so CI / the
daily audit can branch on it), 0 otherwise.
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

DEST_DAYS = 14
FMT_DAYS = 30
MEDIA_DAYS = 60

# Default log path: <repo>/nakshiq-autoposter/data/post_log.jsonl, resolved
# relative to this script (scripts/ -> ../data).
DEFAULT_LOG = Path(__file__).resolve().parent.parent / "data" / "post_log.jsonl"


def _load(path: Path) -> list[dict]:
    """Read post_log.jsonl, deduped on (post_id, platform, timestamp)."""
    if not path.exists():
        print(f"[check-cooldown] log not found: {path}", file=sys.stderr)
        return []
    out: list[dict] = []
    seen: set = set()
    with open(path, encoding="utf-8") as f:
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
    return out


def _day_gap(a: str, b: str) -> int | None:
    """Whole days between two ISO yyyy-mm-dd dates, or None if unparseable."""
    try:
        return abs((date.fromisoformat(a[:10]) - date.fromisoformat(b[:10])).days)
    except ValueError:
        return None


def _scan(entries: list[dict], key_fn, window: int) -> list[tuple]:
    """Return (key, earlier_date, later_date, gap) for every pair of *distinct
    days* a key reappears within `window` days.

    We collapse to distinct DATES per key first, so the legitimate platform
    fan-out — the IG↔FB feed mirror and the YT↔IG short cross-post both write
    one row per platform on the SAME day — is not mistaken for a cooldown
    breach. Only a reappearance on a LATER day inside the window is a violation
    (gap >= 1), which is exactly the pangong-lake-every-few-days bug.
    """
    by_key: dict = defaultdict(set)
    for e in entries:
        k = key_fn(e)
        if k is None:
            continue
        d = (e.get("date") or "")[:10]
        if d:
            by_key[k].add(d)
    violations: list[tuple] = []
    for k, dateset in by_key.items():
        dates = sorted(dateset)
        for i in range(1, len(dates)):
            gap = _day_gap(dates[i - 1], dates[i])
            if gap is not None and 0 < gap < window:
                violations.append((k, dates[i - 1], dates[i], gap))
    return violations


def _dest_of(e: dict) -> str | None:
    return (e.get("destination") or e.get("dest_id") or "").lower() or None


def _fmt_of(e: dict) -> str | None:
    f = e.get("format")
    return f if f else None


def main() -> int:
    ap = argparse.ArgumentParser(description="Replay autoposter cooldown windows.")
    ap.add_argument("log", nargs="?", default=str(DEFAULT_LOG),
                    help="path to post_log.jsonl")
    ap.add_argument("--since-days", type=int, default=16,
                    help="only fail on violations whose LATER post is within "
                         "this many days of today (default 16)")
    ap.add_argument("--all", action="store_true",
                    help="report violations across the whole history")
    args = ap.parse_args()

    entries = _load(Path(args.log))
    if not entries:
        print("[check-cooldown] no entries — nothing to check.")
        return 0

    dest_v = _scan(entries, _dest_of, DEST_DAYS)
    fmt_v = _scan(entries, lambda e: (_dest_of(e), _fmt_of(e))
                  if _dest_of(e) and _fmt_of(e) else None, FMT_DAYS)
    media_v = _scan(entries, lambda e: (e.get("media_id") or "").lower() or None,
                    MEDIA_DAYS)

    cutoff = None if args.all else (date.today().toordinal() - args.since_days)

    def _recent(later: str) -> bool:
        if cutoff is None:
            return True
        try:
            return date.fromisoformat(later[:10]).toordinal() >= cutoff
        except ValueError:
            return False

    sections = [
        (f"DESTINATION repeated within {DEST_DAYS} days", dest_v,
         lambda k: k),
        (f"(DEST, FORMAT) repeated within {FMT_DAYS} days", fmt_v,
         lambda k: f"{k[0]} · {k[1]}"),
        (f"MEDIA repeated within {MEDIA_DAYS} days", media_v,
         lambda k: k),
    ]

    total = 0
    for title, viols, fmt_key in sections:
        shown = [v for v in viols if _recent(v[2])]
        if not shown:
            continue
        total += len(shown)
        print(f"\n⚠️  {title} — {len(shown)} violation(s):")
        for k, d0, d1, gap in sorted(shown, key=lambda v: v[2], reverse=True):
            print(f"    {fmt_key(k):<48} {d0} → {d1}  ({gap}d gap)")

    if total:
        window = "all history" if args.all else f"last {args.since_days}d"
        print(f"\n❌ {total} cooldown violation(s) in {window}.")
        return 1

    window = "all history" if args.all else f"last {args.since_days}d"
    print(f"✅ No cooldown violations ({window}). "
          f"Checked {len(entries)} posts.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
