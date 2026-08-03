#!/usr/bin/env python3
"""Backfill metadata.json for scrape folders that have none.

Why: 273 of ~1,268 catalogue rows (22%) carry an empty channel field, because those
folders hold no *.info.json and no metadata.json. They are invisible to any
channel-based grep — which silently breaks the standing "grep the catalogue before
re-scraping" rule, the same way the handle-vs-display-name split did (fixed 2026-08-02).

Note the endpoints fail independently: YouTube's transcript/timedtext endpoint can be
hard-blocked while the metadata endpoint stays perfectly healthy (measured 2026-08-03).
This script only touches metadata, so it is safe to run during a transcript block.

Usage:
  python3 scripts/backfill-scrape-metadata.py --limit 300
  python3 scripts/backfill-scrape-metadata.py --dry-run
"""
import argparse
import glob
import json
import os
import subprocess
import sys
import time

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".scrapes")
YT = os.path.join(ROOT, "youtube")

FIELDS = "%(channel)s\t%(uploader_id)s\t%(upload_date)s\t%(duration)s\t%(view_count)s\t%(like_count)s\t%(title)s"


def needs_backfill(d):
    """True when the folder has no usable channel attribution."""
    for m in glob.glob(os.path.join(d, "*.info.json")) + glob.glob(os.path.join(d, "metadata.json")):
        try:
            j = json.load(open(m, encoding="utf-8"))
            if j.get("channel") or j.get("uploader"):
                return False
        except Exception:
            continue
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=300)
    ap.add_argument("--sleep", type=float, default=1.5)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    todo = [d for d in sorted(glob.glob(os.path.join(YT, "yt-*"))) if needs_backfill(d)]
    print(f"{len(todo)} folders missing channel attribution", flush=True)
    if a.dry_run:
        for d in todo[:20]:
            print("  " + os.path.basename(d))
        print(f"  ... ({len(todo)} total)" if len(todo) > 20 else "")
        return 0

    ok = fail = 0
    for i, d in enumerate(todo[: a.limit], 1):
        vid = os.path.basename(d)[3:]
        try:
            r = subprocess.run(
                ["yt-dlp", "--skip-download", "--no-warnings", "--print", FIELDS,
                 f"https://www.youtube.com/watch?v={vid}"],
                capture_output=True, text=True, timeout=120,
            )
            line = (r.stdout or "").strip().splitlines()
            if not line or r.returncode != 0:
                err = (r.stderr or "").strip().splitlines()
                reason = err[-1][:90] if err else f"rc={r.returncode}"
                print(f"  [{i}/{min(len(todo), a.limit)}] FAIL {vid}: {reason}", flush=True)
                fail += 1
                time.sleep(a.sleep)
                continue
            parts = (line[-1] + "\t\t\t\t\t\t").split("\t")
            ch, uid, date, dur, views, likes, title = parts[:7]

            mp = os.path.join(d, "metadata.json")
            meta = {}
            if os.path.exists(mp):
                try:
                    meta = json.load(open(mp, encoding="utf-8"))
                except Exception:
                    meta = {}
            meta.update({
                "id": vid,
                "url": f"https://www.youtube.com/watch?v={vid}",
                "title": meta.get("title") or (title if title != "NA" else None),
                "channel": ch if ch != "NA" else None,
                "uploader_id": uid if uid != "NA" else None,
                "upload_date": date if date != "NA" else None,
                "duration_sec": int(float(dur)) if dur not in ("NA", "") else None,
                "view_count": int(views) if views.isdigit() else None,
                "like_count": int(likes) if likes.isdigit() else None,
                "metadata_backfilled_at": "2026-08-03",
            })
            json.dump(meta, open(mp, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
            print(f"  [{i}/{min(len(todo), a.limit)}] OK   {vid}  {ch[:28]:<28} {title[:44]}", flush=True)
            ok += 1
        except subprocess.TimeoutExpired:
            print(f"  [{i}] TIMEOUT {vid}", flush=True)
            fail += 1
        time.sleep(a.sleep)

    print(f"---\nbackfilled={ok} failed={fail}", flush=True)
    print("run `python3 scripts/build-scrape-catalogue.py` to refresh the catalogue", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
