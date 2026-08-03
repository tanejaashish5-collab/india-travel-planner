#!/usr/bin/env python3
"""Recover transcripts for scrape folders that don't have one.

Why this exists: YouTube rate-limits BOTH transcript endpoints independently, and they fail
at different times, so a sweep reliably ends with a tail of empty folders.

  2026-08-02 — yt-dlp's timedtext endpoint returned HTTP 429 while youtube-transcript-api worked.
  2026-08-03 — youtube-transcript-api returned IpBlocked after 22 fetches while yt-dlp worked.

So the two are mutual fallbacks, and this tries both per video. Note that browser impersonation
does NOT help: installing curl_cffi==0.15.0 (yt-dlp pins <0.16) made impersonation targets
available and the 429 persisted unchanged — the limit is IP-based, not fingerprint-based.
The only real remedy is to cap a run and come back later, which is what --limit is for.

Usage:
  python3 scripts/recover-missing-transcripts.py --channel "Nitin Joshi" --limit 10
  python3 scripts/recover-missing-transcripts.py --ids yt-abc123,yt-def456
  python3 scripts/recover-missing-transcripts.py --all --limit 20      # anything missing
"""
import argparse
import glob
import html
import json
import os
import re
import subprocess
import sys
import time

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".scrapes")
YT = os.path.join(ROOT, "youtube")


def vtt_to_prose(path):
    lines = []
    for ln in open(path, encoding="utf-8", errors="ignore").read().splitlines():
        if "-->" in ln or ln.startswith(("WEBVTT", "Kind:", "Language:")) or not ln.strip():
            continue
        t = html.unescape(re.sub(r"<[^>]+>", "", ln)).strip()
        if t and (not lines or lines[-1] != t):
            lines.append(t)
    out = []
    for t in lines:
        if out and (t.startswith(out[-1]) or out[-1].endswith(t)):
            if len(t) > len(out[-1]):
                out[-1] = t
            continue
        out.append(t)
    return re.sub(r"\s+", " ", " ".join(out)).strip()


def via_api(vid):
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
    except ImportError:
        return None, "youtube_transcript_api not installed"
    try:
        fetched = YouTubeTranscriptApi().fetch(vid, languages=["en", "en-US", "en-GB", "hi"])
        return re.sub(r"\s+", " ", " ".join(s.text for s in fetched)).strip(), None
    except Exception as e:
        return None, f"{type(e).__name__}: {str(e)[:120]}"


def via_ytdlp(vid, d):
    subprocess.run(
        ["yt-dlp", "--skip-download", "--no-write-info-json", "--write-auto-subs", "--write-subs",
         "--sub-langs", "en.*,hi.*", "--sub-format", "vtt", "-o", "%(id)s.%(ext)s",
         f"https://www.youtube.com/watch?v={vid}"],
        cwd=d, capture_output=True, timeout=300,
    )
    vtts = sorted(glob.glob(os.path.join(d, f"{vid}.en*.vtt"))) \
        or sorted(glob.glob(os.path.join(d, f"{vid}.hi*.vtt")))
    if not vtts:
        return None, "no vtt written (rate limited or no captions)"
    return vtt_to_prose(vtts[0]), None


def folder_channel(d):
    for m in glob.glob(os.path.join(d, "*.info.json")) + glob.glob(os.path.join(d, "metadata.json")):
        try:
            j = json.load(open(m, encoding="utf-8"))
            return j.get("channel") or j.get("uploader") or ""
        except Exception:
            pass
    return ""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--channel", help="only folders whose channel matches (case-insensitive substring)")
    ap.add_argument("--ids", help="comma-separated folder names (yt-<id>) or bare video ids")
    ap.add_argument("--all", action="store_true", help="every folder missing a transcript")
    ap.add_argument("--limit", type=int, default=20, help="stop after N successes (rate-limit guard)")
    ap.add_argument("--sleep", type=float, default=4.0)
    a = ap.parse_args()

    if not (a.channel or a.ids or a.all):
        ap.error("pass one of --channel / --ids / --all")

    if a.ids:
        targets = [i if i.startswith("yt-") else f"yt-{i}" for i in a.ids.split(",") if i.strip()]
        dirs = [os.path.join(YT, t) for t in targets]
    else:
        dirs = sorted(glob.glob(os.path.join(YT, "yt-*")))

    todo = []
    for d in dirs:
        p = os.path.join(d, "transcript-prose.txt")
        if os.path.exists(p) and os.path.getsize(p) > 500:
            continue
        if a.channel and a.channel.lower() not in folder_channel(d).lower():
            continue
        todo.append(d)

    print(f"{len(todo)} folders missing a transcript; attempting up to {a.limit}")
    ok = fail = 0
    for d in todo:
        if ok >= a.limit:
            print(f"-- stopping at --limit {a.limit} (rate-limit guard); re-run later for the rest")
            break
        vid = os.path.basename(d)[3:]
        prose, err1 = via_api(vid)
        source = "youtube-transcript-api"
        if not prose:
            prose, err2 = via_ytdlp(vid, d)
            source = "yt-dlp vtt"
            if not prose:
                print(f"  FAIL {vid}: api[{err1}] ytdlp[{err2}]")
                fail += 1
                time.sleep(a.sleep)
                continue
        open(os.path.join(d, "transcript-prose.txt"), "w", encoding="utf-8").write(prose)
        mp = os.path.join(d, "metadata.json")
        meta = json.load(open(mp, encoding="utf-8")) if os.path.exists(mp) else {"id": vid}
        meta.update({"transcript_source": source, "transcript_error": None,
                     "transcript_words": len(prose.split())})
        json.dump(meta, open(mp, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
        print(f"  OK   {vid}  {len(prose.split()):>6}w  via {source}")
        ok += 1
        time.sleep(a.sleep)

    print(f"---\nrecovered={ok} failed={fail} remaining={max(0, len(todo) - ok - fail)}")
    if ok:
        print("run `python3 scripts/build-scrape-catalogue.py` to refresh the catalogue")
    return 0 if ok or not todo else 1


if __name__ == "__main__":
    sys.exit(main())
