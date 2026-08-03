#!/usr/bin/env python3
"""Rebuild the scrape catalogue.

`.scrapes/` holds ~3.8 GB of research with no index — the most expensive material
we own was the least findable. This writes a compact, greppable catalogue so a
session can answer "have we already scraped X?" without walking the tree.

Usage:  python3 scripts/build-scrape-catalogue.py
Writes: .scrapes/CATALOGUE-youtube.md  and  .scrapes/CATALOGUE.md
"""
import collections
import glob
import io
import json
import os
import re

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".scrapes")


def youtube_rows():
    rows = []
    for d in sorted(glob.glob(os.path.join(ROOT, "youtube", "yt-*"))):
        meta = glob.glob(os.path.join(d, "*.info.json")) + glob.glob(os.path.join(d, "metadata.json"))
        title = channel = date = ""
        if meta:
            try:
                j = json.load(open(meta[0], encoding="utf-8"))
                title = (j.get("title") or "")[:95]
                channel = (j.get("channel") or j.get("uploader") or "")[:34]
                date = j.get("upload_date") or ""
            except Exception:
                pass
        has_transcript = "T" if (
            glob.glob(os.path.join(d, "transcript-prose.txt")) or glob.glob(os.path.join(d, "*.vtt"))
        ) else "-"
        rows.append((channel, date, title or "(no metadata)", os.path.basename(d), has_transcript))

    # Canonicalise channel names before grouping. Scrape generations disagree on whether
    # `channel` holds the @handle ("mastersunion") or the display name ("Masters' Union"),
    # which silently SPLITS one channel into two rows in the channel table and breaks the
    # standing "grep the catalogue before re-scraping" rule in both directions.
    # (Caught 2026-08-02: Masters' Union was listed as 10 + 9.)
    # Group by an alphanumeric-only key and display the most common variant, tie-broken by
    # the longest (the display name is more readable than the handle).
    variants = collections.defaultdict(collections.Counter)
    for ch, *_ in rows:
        if ch:
            variants[re.sub(r"[^a-z0-9]", "", ch.lower())][ch] += 1
    canonical = {
        key: max(counter.items(), key=lambda kv: (kv[1], len(kv[0])))[0]
        for key, counter in variants.items()
    }
    rows = [
        (canonical.get(re.sub(r"[^a-z0-9]", "", ch.lower()), ch), *rest)
        for ch, *rest in rows
    ]

    rows.sort(key=lambda r: (r[0].lower(), r[1]))
    return rows


def write_youtube(rows):
    counts = {}
    for r in rows:
        counts[r[0]] = counts.get(r[0], 0) + 1
    out = io.StringIO()
    out.write("# Scrape catalogue — YouTube\n\n")
    out.write(f"Auto-generated. **{len(rows)} scrapes** across {len(counts)} channels.\n")
    out.write("Regenerate: `python3 scripts/build-scrape-catalogue.py`\n\n")
    out.write("Read one: `.scrapes/youtube/<folder>/transcript-prose.txt`. T = transcript present.\n")
    out.write("**Grep this file before re-scraping anything.**\n\n")
    out.write("## Channels by volume\n\n| Channel | Scrapes |\n|---|---|\n")
    for c, n in sorted(counts.items(), key=lambda x: -x[1])[:30]:
        out.write(f"| {c or '(unknown)'} | {n} |\n")
    out.write("\n## All scrapes\n\n| Channel | Date | Title | Folder | T |\n|---|---|---|---|---|\n")
    for c, dt, t, d, ht in rows:
        out.write(f"| {c.replace('|', '/')} | {dt} | {t.replace('|', '/')} | `{d}` | {ht} |\n")
    open(os.path.join(ROOT, "CATALOGUE-youtube.md"), "w", encoding="utf-8").write(out.getvalue())


def write_master(rows):
    def count(sub):
        p = os.path.join(ROOT, sub)
        return len(os.listdir(p)) if os.path.isdir(p) else 0

    out = io.StringIO()
    out.write("# `.scrapes/` master catalogue\n\n")
    out.write("Everything scraped, in one greppable place. Gitignored — local only.\n")
    out.write("Regenerate: `python3 scripts/build-scrape-catalogue.py`\n\n")
    out.write("**Before scraping any source, grep here first.** Re-scraping something we already\n")
    out.write("hold is pure waste, and these transcripts are the most expensive material we own.\n\n")
    out.write("| Area | Items | Path | What it is |\n|---|---|---|---|\n")
    out.write(f"| YouTube | {len(rows)} | `.scrapes/youtube/` | Full index: `CATALOGUE-youtube.md` |\n")
    out.write(f"| Web pages | {count('web')} | `.scrapes/web/` | Article/page scrapes |\n")
    out.write(f"| Social | {count('social')} | `.scrapes/social/` | Social post scrapes |\n")
    out.write(f"| TLDR | {count('tldr')} | `.scrapes/tldr/` | Newsletter digests |\n")
    out.write(f"| Channels | {count('channels')} | `.scrapes/channels/` | Channel-level video lists (TSV) |\n")
    out.write("| Festival footage | — | `.scrapes/festival-footage/` | ~2.6 GB video assets, not knowledge |\n")
    out.write("\n## Convention\n\n")
    out.write("All YouTube scrapes go to `.scrapes/youtube/yt-<videoId>/` (see project CLAUDE.md).\n")
    out.write("Other sources get sibling folders. Never batch-ingest raw scrapes into the research wiki —\n")
    out.write("write a findings doc to `data/research/`, then ingest that.\n")
    open(os.path.join(ROOT, "CATALOGUE.md"), "w", encoding="utf-8").write(out.getvalue())


if __name__ == "__main__":
    rows = youtube_rows()
    write_youtube(rows)
    write_master(rows)
    print(f"catalogued {len(rows)} youtube scrapes -> .scrapes/CATALOGUE.md + CATALOGUE-youtube.md")
