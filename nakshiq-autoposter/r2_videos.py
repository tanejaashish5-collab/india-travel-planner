"""r2_videos.py — shared R2 video fetcher for reel + YT short generators.

videos/ is gitignored (commit 18b17fc9, 2026-05-05 moved master copies to R2).
On GitHub Actions the folder is empty, so _find_video() always missed and
every reel/Short fell to a wrong-template image with baked text — caught
2026-05-18 when a listicle posted as a static Pomelli ad. This module
provides the missing piece: on-demand download from R2 when the local
cache misses.

Used by both yt_shorts_gen.py and reel_gen.py — single source of truth
for the R2 URL + dest naming convention.
"""
from __future__ import annotations

import json
from datetime import date
from pathlib import Path
from typing import Optional

R2_VIDEO_BASE = "https://pub-bcda9bac2f63408880ee3f23aa3548e5.r2.dev"
DOWNLOAD_TIMEOUT_SEC = 30
# Cache of slugs R2 returned 404 for, so a hot loop doesn't re-hammer R2.
_404_CACHE: set = set()

# ── Multiple clips per destination (2026-09-15) ──────────────────────────
# R2 held exactly ONE clip per destination, so every reel about a place used
# the same 8 seconds of footage — Leh went out 8 times on one clip. Extra
# clips are uploaded as "<slug>-2.mp4", "<slug>-3.mp4", … and counted in
# data/video_variants.json ({"leh": 3, …}, 1 = base file only).
#
# A manifest rather than probing: the R2 public dev URL has no listing API,
# so discovering variants would mean a HEAD request per candidate on every
# render. The manifest is written by the upload step, which already knows.
#
# Selection is per-DAY, not random: a re-run on the same day reuses the same
# file (so a retry does not re-download a different clip and change the reel),
# while consecutive days look different.
VARIANTS_PATH = Path(__file__).resolve().parent / "data" / "video_variants.json"
_VARIANTS_CACHE: Optional[dict] = None


def _variants() -> dict:
    global _VARIANTS_CACHE
    if _VARIANTS_CACHE is None:
        try:
            _VARIANTS_CACHE = json.loads(VARIANTS_PATH.read_text())
        except Exception:
            # No manifest = every destination has one clip = today's behaviour.
            _VARIANTS_CACHE = {}
    return _VARIANTS_CACHE


def variant_filename(slug: str, day: Optional[date] = None) -> str:
    """Which clip file to use for this slug today. Always "<slug>.mp4" when
    the manifest is missing or the slug has no extra clips."""
    try:
        n = int(_variants().get(slug, 1))
    except (TypeError, ValueError):
        n = 1
    if n <= 1:
        return f"{slug}.mp4"
    d = day or date.today()
    i = (d.toordinal() + sum(ord(c) for c in slug)) % n
    return f"{slug}.mp4" if i == 0 else f"{slug}-{i + 1}.mp4"


def fetch(slug: str, videos_dir: Path) -> Optional[Path]:
    """Try to fetch this slug's clip for today from R2 into `videos_dir`.
    Returns the local path on success, None on 404 / network failure.

    Falls back to the base "<slug>.mp4" if the chosen variant 404s, so a
    manifest that over-counts (an upload that failed after the count was
    written) degrades to the old behaviour instead of dropping the clip.
    """
    import requests
    if not slug:
        return None
    if slug in _404_CACHE:
        return None
    videos_dir.mkdir(parents=True, exist_ok=True)
    name = variant_filename(slug)
    target = videos_dir / name
    if target.exists() and target.stat().st_size > 0:
        return target
    url = f"{R2_VIDEO_BASE}/{name}"
    try:
        with requests.get(url, stream=True, timeout=DOWNLOAD_TIMEOUT_SEC) as r:
            if r.status_code == 404:
                # A missing VARIANT is not a missing destination — retry the
                # base file once before writing the slug off entirely.
                if name != f"{slug}.mp4":
                    base = videos_dir / f"{slug}.mp4"
                    if base.exists() and base.stat().st_size > 0:
                        return base
                    r2 = requests.get(f"{R2_VIDEO_BASE}/{slug}.mp4", stream=True,
                                      timeout=DOWNLOAD_TIMEOUT_SEC)
                    if r2.status_code == 404:
                        _404_CACHE.add(slug)
                        return None
                    r2.raise_for_status()
                    tmpb = base.with_suffix(".mp4.tmp")
                    with open(tmpb, "wb") as f:
                        for chunk in r2.iter_content(chunk_size=1 << 16):
                            if chunk:
                                f.write(chunk)
                    tmpb.replace(base)
                    return base
                _404_CACHE.add(slug)
                return None
            r.raise_for_status()
            tmp = target.with_suffix(".mp4.tmp")
            with open(tmp, "wb") as f:
                for chunk in r.iter_content(chunk_size=1 << 16):
                    if chunk:
                        f.write(chunk)
            tmp.replace(target)
            return target
    except requests.RequestException:
        return None
