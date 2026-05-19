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

from pathlib import Path
from typing import Optional

R2_VIDEO_BASE = "https://pub-bcda9bac2f63408880ee3f23aa3548e5.r2.dev"
DOWNLOAD_TIMEOUT_SEC = 30
# Cache of slugs R2 returned 404 for, so a hot loop doesn't re-hammer R2.
_404_CACHE: set = set()


def fetch(slug: str, videos_dir: Path) -> Optional[Path]:
    """Try to fetch <slug>.mp4 from R2 into `videos_dir`. Returns the local
    path on success, None on 404 / network failure.
    """
    import requests
    if not slug:
        return None
    if slug in _404_CACHE:
        return None
    videos_dir.mkdir(parents=True, exist_ok=True)
    target = videos_dir / f"{slug}.mp4"
    if target.exists() and target.stat().st_size > 0:
        return target
    url = f"{R2_VIDEO_BASE}/{slug}.mp4"
    try:
        with requests.get(url, stream=True, timeout=DOWNLOAD_TIMEOUT_SEC) as r:
            if r.status_code == 404:
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
