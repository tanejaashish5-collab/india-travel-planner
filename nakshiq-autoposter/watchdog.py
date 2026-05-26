"""Autoposter watchdog — detect missed posting slots and force-trigger.

Runs hourly from .github/workflows/autoposter-watchdog.yml (07-14 UTC). For
each posting slot expected today, checks GHA run history. If the slot's
expected time + grace window has passed without a covering run (successful or
in-progress), force-triggers the slot via workflow_dispatch.

Why this exists
---------------
GHA scheduled workflows are documented as unreliable, especially for
early-UTC crons (00:00-06:00 UTC = Asia morning, when our day starts). On
2026-05-11 and 2026-05-12 the 03:17 / 04:17 / 05:47 UTC crons silently failed
to fire — no entry in run history at all. The watchdog backstops this so the
brand keeps posting without manual intervention.

Design
------
- Fires one workflow_dispatch per invocation (avoids concurrency stampede)
- Idempotent: re-running mid-cycle is safe — if a slot has fired, it's skipped
- Uses GH_PAT (not GITHUB_TOKEN) because GITHUB_TOKEN can't trigger other
  workflows (anti-infinite-loop guard, by design)
- 90-min grace window before declaring a slot "missed" (handles normal GHA
  drift up to ~1.5h)
"""
import os
import sys
import requests
from datetime import datetime, timezone, timedelta

REPO = os.environ.get("REPO")
if not REPO:
    print("ERROR: REPO env var not set (expected like 'owner/name').")
    sys.exit(1)
WORKFLOW_FILE = "autoposter.yml"

GH_TOKEN = os.environ.get("GH_PAT") or os.environ.get("GITHUB_TOKEN")
if not GH_TOKEN:
    print("ERROR: no GH_PAT or GITHUB_TOKEN env var.")
    sys.exit(1)

# Posting slots. Each tuple: (label, expected_utc_hour, expected_utc_min, dispatch_mode, dow_filter)
# dow_filter: None = daily, or a set of weekday ints (Mon=0..Sun=6).
# Times match the Tier 3 cadence schedule in .github/workflows/autoposter.yml.
#
# 2026-05-26: dispatch modes dropped the "-force" suffix. --force bypasses
# every dedup gate (per-account posted_today + Outstand-side remote_today
# merge), which caused the 2026-05-25 Uttarakhand triple-publish: when
# slot_covered() kept firing for a slot that had actually posted late, each
# new watchdog dispatch re-ran with --force and re-published the same dest.
# The non-force variants still attach the correct slot flag (--evening etc.)
# but leave the dedup gates active so a successful late fire blocks repeats.
DAILY_SLOTS = [
    ("morning",     3, 17, "",          None),  # 08:47 IST · IG+FB
    ("yt-short-1",  4, 17, "yt-short",  None),  # 09:47 IST · YT
    ("reel",        5, 47, "reel",      None),  # 11:17 IST · IG+FB
    ("yt-short-2", 11, 47, "yt-short",  None),  # 17:17 IST · YT
    ("evening",    14, 17, "evening",   None),  # 19:47 IST · IG+FB (shifted +1h on 2026-05-15)
]

# 13:17 IST = 07:47 UTC — visual rotation by weekday (see autoposter.yml mode-detection)
WEEKDAY_VISUAL_MODE = {
    0: "moat",            # Mon
    1: "tourist-map",     # Tue
    2: "moat",            # Wed
    3: "tourist-map",     # Thu
    4: "infographic",     # Fri
    5: "canva-visual",    # Sat
    6: "pomelli-visual",  # Sun
}

# Time windows in minutes
GRACE_MINUTES = 90       # only force after expected_time + 90min
COVERAGE_WINDOW_BEFORE = 30
# 2026-05-26: widened from 240 (4h) to 1440 (24h). The 4h ceiling meant a
# slot whose cron drifted >4h late never registered as "covered" — watchdog
# kept dispatching catch-ups all day, multiplying every drifted fire into
# 3-6 duplicates (Uttarakhand listicle 2026-05-25). Any late-but-successful
# run today now blocks further catch-ups for the same slot.
COVERAGE_WINDOW_AFTER = 1440  # accept any run within 24h after expected as "covered"


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def gh_get(path: str, params: dict | None = None) -> dict:
    r = requests.get(
        f"https://api.github.com{path}",
        headers={
            "Authorization": f"Bearer {GH_TOKEN}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
        params=params or {},
        timeout=15,
    )
    r.raise_for_status()
    return r.json()


def gh_post(path: str, data: dict) -> dict:
    r = requests.post(
        f"https://api.github.com{path}",
        headers={
            "Authorization": f"Bearer {GH_TOKEN}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
        json=data,
        timeout=15,
    )
    r.raise_for_status()
    return r.json() if r.text else {}


def runs_today() -> list[dict]:
    """All autoposter runs that started today (UTC). Excludes the watchdog itself."""
    today_iso = now_utc().date().isoformat()
    data = gh_get(
        f"/repos/{REPO}/actions/workflows/{WORKFLOW_FILE}/runs",
        {"per_page": 50, "created": f">={today_iso}T00:00:00Z"},
    )
    return data.get("workflow_runs", [])


def parse_iso_utc(s: str) -> datetime:
    return datetime.fromisoformat(s.replace("Z", "+00:00"))


def slot_covered(expected: datetime, runs: list[dict]) -> bool:
    """Did a run start within the slot's coverage window AND not get cancelled?

    We're permissive: any run inside [expected-30min, expected+4h] that isn't
    cancelled/failed counts as covering the slot. Scheduled runs that arrive
    late, manual force-triggers, and the slot's own scheduled fire all count.
    """
    window_start = expected - timedelta(minutes=COVERAGE_WINDOW_BEFORE)
    window_end = expected + timedelta(minutes=COVERAGE_WINDOW_AFTER)
    for r in runs:
        conclusion = r.get("conclusion")
        if conclusion in ("cancelled", "failure", "timed_out", "skipped"):
            continue
        try:
            started = parse_iso_utc(r["created_at"])
        except Exception:
            continue
        if window_start <= started <= window_end:
            return True
    return False


def dispatch_mode(mode: str) -> None:
    print(f"  -> dispatching mode={mode}")
    gh_post(
        f"/repos/{REPO}/actions/workflows/{WORKFLOW_FILE}/dispatches",
        {"ref": "main", "inputs": {"mode": mode}},
    )


def main() -> None:
    now = now_utc()
    today = now.date()
    dow = today.weekday()
    runs = runs_today()
    print(f"=== Watchdog @ {now.strftime('%Y-%m-%d %H:%M:%S UTC')} · DOW={dow} ===")
    print(f"Runs today: {len(runs)} (excluding watchdog)")

    slots: list[tuple[str, int, int, str, set | None]] = list(DAILY_SLOTS)
    vmode = WEEKDAY_VISUAL_MODE.get(dow)
    if vmode:
        slots.append(("visual", 7, 47, vmode, None))

    # Sort by expected fire time so earliest missing slot fires first
    slots.sort(key=lambda s: s[1] * 60 + s[2])

    triggered = False
    for label, hr, mn, mode, dow_filter in slots:
        if dow_filter is not None and dow not in dow_filter:
            continue
        expected = datetime.combine(
            today, datetime.min.time(), tzinfo=timezone.utc
        ).replace(hour=hr, minute=mn)
        grace_cutoff = expected + timedelta(minutes=GRACE_MINUTES)

        if now < grace_cutoff:
            print(f"  {label:14s} expected={expected.strftime('%H:%M')} · within grace, skip")
            continue

        if slot_covered(expected, runs):
            print(f"  {label:14s} expected={expected.strftime('%H:%M')} · OK covered")
            continue

        if triggered:
            print(f"  {label:14s} expected={expected.strftime('%H:%M')} · MISSING (deferred to next watchdog tick)")
            continue

        print(f"  {label:14s} expected={expected.strftime('%H:%M')} · MISSING - triggering mode={mode}")
        dispatch_mode(mode)
        triggered = True

    if not triggered:
        print("All eligible slots covered. No dispatch.")


if __name__ == "__main__":
    main()
