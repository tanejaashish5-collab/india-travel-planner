#!/usr/bin/env python3
"""Has today's daily reel already been published?

Reads post_log.jsonl on stdin. Exits 10 (and prints the matching row) if a
`yt_short.*` post exists for TODAY in IST; exits 0 if not. Any other exit
status means the check could not be made — callers must treat that as "not
published" and let their own state sync be the hard gate.

Used by the `gate` job in .github/workflows/autoposter.yml, which is the
only place a once-a-day cap exists for YouTube: autoposter.py caps Instagram
via NAKSHIQ_IG_DAILY_CAP but has no YouTube equivalent, so a duplicate
trigger (delayed cron arriving after a watchdog catch-up already published)
put out 2-3 YouTube shorts a day through 2026-09-14.

The ledger's own `date` field is UTC-derived. Publishing happens 06:30-14:00
UTC, where the UTC and IST dates agree — but parsing `timestamp` and
converting removes the ambiguity rather than relying on that.

  git show origin/autoposter-state:nakshiq-autoposter/data/post_log.jsonl \
    | python3 nakshiq-autoposter/scripts/reel_published_today.py

Optional argv[1] overrides the format prefix (default "yt_short").
"""
import datetime as dt
import json
import sys

IST = dt.timezone(dt.timedelta(hours=5, minutes=30))
PREFIX = sys.argv[1] if len(sys.argv) > 1 else "yt_short"


def main() -> int:
    today = dt.datetime.now(IST).date()
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            row = json.loads(line)
        except ValueError:
            continue  # a torn line is not evidence of a publish
        if not str(row.get("format", "")).startswith(PREFIX):
            continue
        try:
            stamp = dt.datetime.fromisoformat(
                str(row.get("timestamp", "")).replace("Z", "+00:00")
            )
        except ValueError:
            continue
        if stamp.tzinfo is None:
            stamp = stamp.replace(tzinfo=dt.timezone.utc)
        stamp = stamp.astimezone(IST)
        if stamp.date() == today:
            print(
                "%s / %s at %s IST"
                % (row.get("platform"), row.get("format"), stamp.strftime("%H:%M"))
            )
            return 10
    return 0


if __name__ == "__main__":
    sys.exit(main())
