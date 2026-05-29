"""
yt_shorts_gen.py — NakshIQ YouTube Shorts Generator
=====================================================
Generates 9:16 vertical Shorts (1080×1920, 30-45s) exclusively for YouTube.
Composites per-destination background video + animated text overlays + branded audio.

Formats (rotating):
  - listicle:      "Top 5 Places to Visit in [Month]" — countdown reveal
  - before_after:  "[Dest] in [Month A] vs [Month B]" — score contrast
  - mini_guide:    "48 Hours in [Dest]" — quick itinerary teaser
  - did_you_know:  "Did You Know?" — single surprising destination fact
  - this_vs_that:  "[A] vs [B]" — head-to-head destination comparison
  - dont_go_here:  "Don't Go Here in [Month]" — low-scoring destinations warning

Music library: 37 tracks in assets/yt_music/ — rotated with anti-repetition.
Uses ffmpeg for all video processing (available on GitHub Actions ubuntu).
"""

from __future__ import annotations

import calendar
import json
import random
import shutil
import subprocess
import tempfile
from datetime import datetime, date
from pathlib import Path
from typing import Optional


def _format_score(raw) -> str:
    """Convert raw 1-5 API score into the website-aligned '8/10' display string.
    Mirrors format_score() in autoposter.py and formatScore() in
    apps/web/src/components/destination-detail-cinematic.tsx (Tier 1, 2026-05-10).
    """
    try:
        if raw is None or raw == "":
            return "—/10"
        return f"{int(raw) * 2}/10"
    except (TypeError, ValueError):
        return "—/10"


# ── Brand constants ──────────────────────────────────────────────────
try:
    from slide_gen import (INK_DEEP, BONE, VERMILLION_BRIGHT, VERMILLION_DEEP,
                           SAFFRON, SAGE, FONT_DIR)
except ImportError:
    INK_DEEP = "#161614"
    BONE = "#F5F1E8"
    VERMILLION_BRIGHT = "#E55642"
    VERMILLION_DEEP = "#C43E2D"
    SAFFRON = "#D4883A"
    SAGE = "#5C6B5A"
    FONT_DIR = Path(__file__).parent / "assets" / "fonts"

# ── Paths ─────────────────────────────────────────────────────────────
VIDEOS_DIR = Path(__file__).parent.parent / "videos"
POMELLI_DIR = Path(__file__).parent / "pomelli_library"
POMELLI_MANIFEST = POMELLI_DIR / "manifest.json"
ASSETS_DIR = Path(__file__).parent / "assets"
YT_MUSIC_DIR = ASSETS_DIR / "yt_music"
STATE_FILE = Path(__file__).parent / "state.json"
# 2026-05-20: Phase 2 CSV-defined YT formats post a pre-rendered .mp4 from here.
SOCIAL_IMAGE_LIBRARY = Path(__file__).parent / "social_image_library"

# ── Output specs ──────────────────────────────────────────────────────
REEL_W, REEL_H = 1080, 1920
REEL_FPS = 30

# ── Font paths ────────────────────────────────────────────────────────
FONT_INSTRUMENT = str(FONT_DIR / "InstrumentSans-Bold.ttf") if FONT_DIR.exists() else ""
FONT_CRIMSON = str(FONT_DIR / "CrimsonPro-BoldItalic.ttf") if FONT_DIR.exists() else ""
FONT_JETBRAINS = str(FONT_DIR / "JetBrainsMono-Bold.ttf") if FONT_DIR.exists() else ""

# ── Formats ───────────────────────────────────────────────────────────
YT_SHORT_FORMATS = ["listicle", "before_after", "mini_guide", "did_you_know", "this_vs_that", "dont_go_here"]

# ── Nakshiq API ───────────────────────────────────────────────────────
NAKSHIQ_API = "https://nakshiq.com/api/content"
NAKSHIQ_WEEKLY_PICKS_API = "https://nakshiq.com/api/weekly-picks"


# ═══════════════════════════════════════════════════════════════════════
# HELPERS
# ═══════════════════════════════════════════════════════════════════════

def _esc(text: str) -> str:
    """Escape text for ffmpeg drawtext."""
    return (text.replace("\\", "\\\\").replace("'", "\u2019")
            .replace(":", "\\:").replace("%", "%%"))


def _dt(text: str, font: str, size: int, color: str,
        x: str, y: str, enable: str = "", bw: int = 3) -> str:
    """Build a drawtext filter string."""
    e = _esc(text)
    s = (f"drawtext=text='{e}':fontfile='{font}':fontsize={size}"
         f":fontcolor={color}:x={x}:y={y}"
         f":borderw={bw}:bordercolor=black@0.5"
         f":shadowcolor=black@0.6:shadowx=2:shadowy=2")
    if enable:
        s += f":enable='{enable}'"
    return s


def _hex(c: str) -> str:
    """#RRGGBB → 0xRRGGBB for ffmpeg."""
    return "0x" + c.lstrip("#")


def _branding_bar() -> list[str]:
    """Persistent NakshIQ branding bar at bottom."""
    return [
        f"drawbox=x=0:y=h-140:w=iw:h=140:color={_hex(INK_DEEP)}@0.90:t=fill",
        _dt("NAKSHIQ", FONT_INSTRUMENT, 30, _hex(BONE), "40", "h-105", bw=0),
        _dt("Travel with IQ", FONT_CRIMSON, 24, _hex(SAFFRON), "40", "h-70", bw=0),
        _dt("nakshiq.com", FONT_INSTRUMENT, 22, _hex(BONE), "w-220", "h-90", bw=0),
    ]


def _iter_dest_videos():
    """Yield destination-footage videos from videos/.

    Real destination footage is named `<slug>.mp4` (e.g. rudraprayag.mp4)
    or `state-<slug>.mp4` (e.g. state-uttarakhand.mp4). Legacy stock clips
    use the `VIDEO_*.mp4` prefix. The old glob `VIDEO_*.mp4` silently hid
    682 of 727 mp4s (94% of the library) — caught 2026-05-15 when a
    Rudraprayag Short rendered with mismatched footage.

    Excluded:
      - ARTICLE_*.mp4  (article promos, not background footage)
      - "<name> 2.mp4" (Finder dedup artifacts)
    """
    if not VIDEOS_DIR.exists():
        return
    for p in VIDEOS_DIR.glob("*.mp4"):
        stem = p.stem
        if " 2" in stem:
            continue
        if stem.startswith("ARTICLE_"):
            continue
        yield p


# R2 video sync (2026-05-18) — see nakshiq-autoposter/r2_videos.py for full
# context. videos/ is gitignored, so on GHA _find_video() used to miss every
# slug and segments fell to Pomelli ad templates. Now misses fall through to
# R2 fetch first.
from r2_videos import fetch as _r2_fetch_raw

def _r2_fetch_video(slug: str) -> Optional[Path]:
    """Wrapper that pins videos_dir to this module's VIDEOS_DIR."""
    return _r2_fetch_raw(slug, VIDEOS_DIR)


def _find_video(dest_slug: str) -> Optional[Path]:
    """Find the best matching video for a destination slug.

    2026-05-17 (Tier 7 Phase 1.6): tightened matching to prevent cross-dest
    contamination. The old `slug in name or name in slug` substring match
    let "parvati" match "kasol-parvati" (different destination). Now:
      1. exact match wins (rank 3)
      2. multi-token overlap (≥2 non-stopword tokens) qualifies (rank 2)
      3. substring match only if the substring is the FULL stem (no
         half-word like "tehri" matching "tehri-garhwal" unless tehri is
         a genuine prefix-with-hyphen — that's rank 1)
    Returns the highest-rank candidate; ties broken by lexicographic order
    for determinism.
    """
    slug = dest_slug.lower().replace(" ", "-").replace("_", "-")
    if not slug:
        return None
    # 2026-05-18: R2 sync. Local file is the cache; on a miss we try R2 once
    # before falling through to the broader name-match logic. This is the
    # single most important fix — without it, GHA crons can never find a
    # destination video (videos/ is gitignored) and listicles render as
    # static Pomelli ads.
    direct = VIDEOS_DIR / f"{slug}.mp4"
    if direct.exists() and direct.stat().st_size > 0:
        return direct
    r2_hit = _r2_fetch_video(slug)
    if r2_hit:
        return r2_hit
    if not VIDEOS_DIR.exists():
        return None
    slug_parts = set(slug.split("-"))
    stop = {"national", "park", "lake", "valley", "falls", "fort", "temple",
            "village", "town", "city", "of", "the"}
    slug_nonstop = slug_parts - stop

    candidates = []
    for p in _iter_dest_videos():
        name = p.stem.lower().replace("video_", "").replace("state-", "")
        name_parts = set(name.split("-"))
        name_nonstop = name_parts - stop

        if name == slug:
            return p  # exact match, return immediately

        # Hyphen-delimited prefix match: slug = "tehri" matches
        # "tehri-garhwal" because "tehri-" is a complete token, NOT
        # "tehri-foo" matching unrelated "foo-tehri"
        if name.startswith(slug + "-") or slug.startswith(name + "-"):
            candidates.append((2, p.stem, p))
            continue

        # Multi-token overlap (≥2 non-stopwords)
        overlap = slug_nonstop & name_nonstop
        if len(overlap) >= 2:
            candidates.append((2, p.stem, p))
            continue

        # Single non-stopword overlap — weak signal, accept only if both
        # slugs are single-word (then it's effectively equality)
        if len(overlap) == 1 and len(slug_nonstop) == 1 and len(name_nonstop) == 1:
            candidates.append((1, p.stem, p))

    if candidates:
        candidates.sort(key=lambda x: (-x[0], x[1]))
        return candidates[0][2]
    return None


def _find_similar_video(dest: dict) -> Optional[Path]:
    """Find a video with similar aesthetic — same state or similar geography.

    Returns None when no dest-specific or state-matching video exists. We used
    to fall back to a random video from the whole library, which produced
    cross-region mismatches (Goa beach footage behind a Rudraprayag title).
    The caller should degrade to a Pomelli image or a state-themed clip
    instead — see _pick_background.
    """
    vid = _find_video(dest.get("id", dest.get("name", "")))
    if vid:
        return vid

    # Try state-based fallback — matches `state-<slug>.mp4` or any video whose
    # stem contains the state slug.
    state = dest.get("state", "").lower().replace(" ", "-")
    if state:
        # Prefer the canonical state-<slug>.mp4 if present (local then R2).
        canonical = VIDEOS_DIR / f"state-{state}.mp4"
        if canonical.exists():
            return canonical
        r2_state = _r2_fetch_video(f"state-{state}")
        if r2_state:
            return r2_state
        if VIDEOS_DIR.exists():
            for p in _iter_dest_videos():
                if state in p.stem.lower():
                    return p

    # No random fallback — return None so the caller renders a brand-neutral
    # solid background (see _make_solid_segment). Never falls to Pomelli —
    # Pomelli images carry baked text + CTAs that suppress our own overlays,
    # which is exactly the bug user flagged 2026-05-18.
    return None


# ── Pomelli image selection ──────────────────────────────────────────

_POMELLI_CACHE: list = []

def _load_pomelli_manifest() -> list:
    """Load and cache Pomelli manifest images."""
    global _POMELLI_CACHE
    if _POMELLI_CACHE:
        return _POMELLI_CACHE
    if not POMELLI_MANIFEST.exists():
        return []
    try:
        data = json.loads(POMELLI_MANIFEST.read_text())
        _POMELLI_CACHE = data.get("images", [])
    except Exception:
        _POMELLI_CACHE = []
    return _POMELLI_CACHE


def _find_pomelli_images(keywords: list[str], count: int = 1,
                         campaign_type: str = None,
                         strict: bool = False) -> list[Path]:
    """Find Pomelli images matching keywords (campaign name, subject, tags).

    Returns up to `count` image paths, shuffled for variety.

    When strict=True, returns [] if no keyword match scores positive — i.e.
    skips the random library fallback. Use this in callers that need to avoid
    cross-destination leakage (Pomelli backgrounds for Shorts, etc.).
    """
    manifest = _load_pomelli_manifest()
    if not manifest:
        return []

    scored = []
    kw_lower = [k.lower().replace(" ", "_").replace("-", "_") for k in keywords if k]

    for entry in manifest:
        # Handle both dict entries and plain filename strings
        if isinstance(entry, str):
            f = entry
            campaign = entry.lower().replace(".png", "").replace("pomelli_", "")
            subject = ""
            tags = []
            ctype = ""
        else:
            f = entry.get("file", "")
            campaign = entry.get("campaign", "").lower()
            subject = (entry.get("subject") or "").lower()
            tags = [t.lower() for t in entry.get("tags", [])]
            ctype = entry.get("campaign_type", "")

        path = POMELLI_DIR / f
        if not path.exists():
            continue

        # Score relevance
        score = 0
        for kw in kw_lower:
            if kw in campaign:
                score += 3
            if kw in subject:
                score += 2
            if any(kw in t for t in tags):
                score += 1
            if kw in f.lower():
                score += 1

        if campaign_type and ctype == campaign_type:
            score += 2

        if score > 0:
            scored.append((score, random.random(), path))

    if not scored:
        if strict:
            return []
        # Random fallback from full library
        all_imgs = []
        for e in manifest:
            fname = e if isinstance(e, str) else e.get("file", "")
            p = POMELLI_DIR / fname
            if p.exists():
                all_imgs.append(p)
        random.shuffle(all_imgs)
        return all_imgs[:count]

    scored.sort(key=lambda x: (-x[0], x[1]))
    return [s[2] for s in scored[:count]]


def _render_segment_image(image_file: Path, duration: float,
                          text_filters: list[str], out_path: Path,
                          zoom_dir: str = "in") -> Optional[Path]:
    """Render a segment from a static Pomelli image with Ken Burns effect.

    Applies zoompan (slow zoom in/out + slight drift) then text overlays.
    Output is 1080x1920 at REEL_FPS.
    """
    if not image_file or not image_file.exists():
        return None

    total_frames = int(REEL_FPS * duration)

    # Ken Burns: zoom from 1.0→1.15 (in) or 1.15→1.0 (out), slight x/y drift
    if zoom_dir == "in":
        z_expr = f"min(1+0.15*on/{total_frames},1.15)"
        x_expr = f"iw/2-(iw/zoom/2)+10*on/{total_frames}"
    else:
        z_expr = f"max(1.15-0.15*on/{total_frames},1.0)"
        x_expr = f"iw/2-(iw/zoom/2)-10*on/{total_frames}"
    y_expr = "ih/2-(ih/zoom/2)"

    all_filters = text_filters + _branding_bar()
    text_chain = ",".join(all_filters) if all_filters else ""

    # Pipeline: image → scale up → zoompan → scale to 1080x1920 → text
    vf_parts = [
        f"scale=2160:-1:flags=lanczos",
        f"zoompan=z='{z_expr}':x='{x_expr}':y='{y_expr}'"
        f":d={total_frames}:s={REEL_W}x{REEL_H}:fps={REEL_FPS}",
        f"setsar=1",
    ]
    if text_chain:
        vf_parts.append(text_chain)

    vf = ",".join(vf_parts)

    ffmpeg = shutil.which("ffmpeg") or "/usr/bin/ffmpeg"
    cmd = [
        ffmpeg, "-y",
        "-loop", "1", "-i", str(image_file),
        "-vf", vf,
        "-c:v", "libx264", "-preset", "fast", "-crf", "22",
        "-pix_fmt", "yuv420p", "-r", str(REEL_FPS),
        "-t", str(duration), "-an",
        str(out_path)
    ]
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        if r.returncode != 0:
            print(f"  Image segment render failed: {r.stderr[-500:]}")
            return None
        return out_path
    except Exception as e:
        print(f"  Image segment render error: {e}")
        return None


def _pick_background(dest: dict, keywords: list[str] = None,
                     campaign_type: str = None) -> tuple:
    """Pick a background for a segment.

    Priority (revised 2026-05-18 — Pomelli fallback removed):
      1. Destination video from R2 library (local cache + R2 fetch).
      2. None — caller renders solid brand-colour with text overlays.

    Pomelli fallback was killed because: (a) Pomelli images carry baked
    titles + CTAs that suppress our listicle/reveal text overlays; (b) the
    videos/ folder is gitignored, so on GitHub Actions _find_video always
    missed and EVERY segment fell to Pomelli — listicles posted as static
    Pomelli ads with Ken Burns zoom (user flag 2026-05-18). Without an R2
    download for the dest video, a clean solid backdrop is strictly better
    than a wrong-dest Pomelli card.

    The `keywords` and `campaign_type` args are kept for ABI compatibility
    with existing callers (before_after / mini_guide / etc.) but are unused.

    Returns (path, is_image: bool).
    """
    vid = _find_similar_video(dest)
    if vid:
        return vid, False
    return None, False


def _render_segment_solid(color: str, duration: float,
                          text_filters: list[str], out_path: Path) -> Optional[Path]:
    """Render a segment over a solid brand colour + text overlays.

    2026-05-18: replaces the old Pomelli-image fallback for segments that
    don't have a real destination video. Pomelli cards carry baked titles +
    CTAs that suppress our own listicle/reveal text — the user saw a static
    ad template instead of a 'Top 5 in May' hook. Solid background lets the
    real overlays render cleanly.

    `color` is an ffmpeg colour token (e.g. "0xC73A2C" or "0x1A1A1A").
    """
    all_filters = list(text_filters) + _branding_bar()
    vf = ",".join(all_filters) if all_filters else "null"
    ffmpeg = shutil.which("ffmpeg") or "/usr/bin/ffmpeg"
    cmd = [
        ffmpeg, "-y",
        "-f", "lavfi",
        "-i", f"color=c={color}:s={REEL_W}x{REEL_H}:d={duration}:r={REEL_FPS}",
        "-vf", vf,
        "-c:v", "libx264", "-preset", "fast", "-crf", "22",
        "-pix_fmt", "yuv420p", "-r", str(REEL_FPS),
        "-t", str(duration), "-an",
        str(out_path),
    ]
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        if r.returncode != 0:
            print(f"  Solid segment render failed: {r.stderr[-500:]}")
            return None
        return out_path
    except Exception as e:
        print(f"  Solid segment render error: {e}")
        return None


def _render_segment_auto(bg_path: Optional[Path], is_image: bool, duration: float,
                         text_filters: list[str], out_path: Path,
                         zoom_dir: str = "in",
                         solid_color: str = None) -> Optional[Path]:
    """Render a segment. Priority:
      1. Destination video → use it (clean, no baked text).
      2. No video → solid brand-coloured backdrop with our own text overlays.
      3. Pomelli image → DEFENSIVE: should never hit here since _pick_background
         no longer returns Pomelli paths, but if it does, treat as no-video and
         render solid. Pomelli's baked text + CTAs suppress our overlays — that
         was the 2026-05-18 'Top 5 in May posted as a Pomelli ad' bug.
    """
    default_solid = solid_color or _hex(INK_DEEP)
    if bg_path is None:
        return _render_segment_solid(default_solid, duration, text_filters, out_path)
    if is_image:
        try:
            is_pomelli = POMELLI_DIR.resolve() in bg_path.resolve().parents
        except Exception:
            is_pomelli = str(bg_path).startswith(str(POMELLI_DIR))
        if is_pomelli:
            # Defensive seatbelt — render solid colour, never a Pomelli ad.
            return _render_segment_solid(default_solid, duration, text_filters, out_path)
        return _render_segment_image(bg_path, duration, text_filters, out_path, zoom_dir)
    return _render_segment(bg_path, duration, text_filters, out_path)


def _pick_music(state: dict) -> Optional[Path]:
    """Pick a music track from yt_music/ using oldest-unused rotation."""
    if not YT_MUSIC_DIR.exists():
        return None
    tracks = sorted(YT_MUSIC_DIR.glob("*.wav"))
    if not tracks:
        return None

    # Cap the rotation array at the library size — without this, every pick
    # appends and the array grows unbounded (35+ entries seen in prod 2026-05-05
    # against a ~37-track library). The reset-when-empty branch never fires
    # because stale-but-still-listed names match against current files.
    track_stems = {t.stem for t in tracks}
    used = [s for s in state.get("yt_short_music_used", []) if s in track_stems]
    if len(used) >= len(tracks):
        used = []
    state["yt_short_music_used"] = used

    unused = [t for t in tracks if t.stem not in used]
    if not unused:
        unused = tracks

    pick = random.choice(unused)
    return pick


def _load_state() -> dict:
    try:
        return json.loads(STATE_FILE.read_text())
    except Exception:
        return {}


def _save_state(st: dict):
    STATE_FILE.write_text(json.dumps(st, indent=2, default=str))


def _fetch_destinations(month: int = None, max_score: int = None,
                        include_intel: bool = False) -> list[dict]:
    """Fetch destinations from Nakshiq API.

    Args:
        month: Calendar month (1-12). Defaults to current month.
        max_score: If set, adds &max_score=N to fetch low-scoring destinations.
        include_intel: When True, asks the API to JOIN confidence_cards +
            emergency_sos + a legendary eatery. Used by mini_guide so its tips
            can be destination-specific instead of cookie-cutter ("pack light").
    """
    import requests
    if month is None:
        month = datetime.now().month
    try:
        url = f"{NAKSHIQ_API}?type=destinations&month={month}&min_score=0&limit=300"
        if max_score is not None:
            url += f"&max_score={max_score}"
        if include_intel:
            url += "&include_intel=1"
        resp = requests.get(url, timeout=20)
        data = resp.json().get("data", [])
        return [d for d in data if isinstance(d.get("score"), (int, float))]
    except Exception as e:
        print(f"API fetch failed: {e}")
        return []


def _week_of_month(d: datetime = None) -> int:
    """Day-of-month / 7 bucketing, matching apps/web/src/lib/weekly-picks/weight.ts.
    Mirrors the landing page's week calculation so Shorts land on the correct week URL."""
    if d is None:
        d = datetime.now()
    return min(5, max(1, (d.day - 1) // 7 + 1))


def _fetch_weekly_picks(month: int = None, week: int = None) -> Optional[list[dict]]:
    """Fetch the current week's 5 picks from /api/weekly-picks.

    Returns None on any failure (network, non-200, malformed JSON) — caller
    falls back to _fetch_destinations(). Zero-risk pattern per PRD §19: if
    the new endpoint flaps, the autoposter keeps running on the old one.

    Returns a list of destination dicts matching the _fetch_destinations
    shape (id/name/state/score/tagline/note) so downstream builders stay
    unchanged.
    """
    import requests
    now = datetime.now()
    if month is None:
        month = now.month
    if week is None:
        week = _week_of_month(now)
    year = now.year
    try:
        url = f"{NAKSHIQ_WEEKLY_PICKS_API}?month={month}&week={week}&year={year}"
        resp = requests.get(url, timeout=15)
        if resp.status_code != 200:
            print(f"[weekly-picks] status={resp.status_code}, falling back")
            return None
        data = resp.json()
        picks = data.get("destinations") or []
        if len(picks) < 5:
            print(f"[weekly-picks] got only {len(picks)} picks, falling back")
            return None
        # Map to the _fetch_destinations dict shape the builders expect.
        return [
            {
                "id": p.get("id"),
                "name": p.get("name"),
                "state": p.get("state") or "",
                "tagline": p.get("tagline") or p.get("why_this_week", ""),
                "note": p.get("why_this_week") or "",
                "score": p.get("score", 5),
                "elevation_m": p.get("elevation_m"),
                "difficulty": p.get("difficulty"),
            }
            for p in picks
        ]
    except Exception as e:
        print(f"[weekly-picks] fetch failed ({e}), falling back to /api/content")
        return None


# ═══════════════════════════════════════════════════════════════════════
# SEGMENT RENDERER
# ═══════════════════════════════════════════════════════════════════════

def _render_segment(video_file: Path, duration: float, text_filters: list[str],
                    out_path: Path) -> Optional[Path]:
    """Render a single video segment with text overlays."""
    if not video_file or not video_file.exists():
        return None

    all_filters = (["drawbox=x=0:y=0:w=iw:h=ih:color=black@0.45:t=fill"]
                   + text_filters + _branding_bar())
    text_chain = ",".join(all_filters)

    vf = (
        f"[0:v]loop=loop={int(REEL_FPS * duration + REEL_FPS)}:size={REEL_FPS * 10}:start=0,"
        f"trim=duration={duration},setpts=PTS-STARTPTS,"
        f"crop=ih*9/16:ih:iw/2-ih*9/16/2:0,"
        f"scale={REEL_W}:{REEL_H}:flags=lanczos,setsar=1,"
        f"{text_chain}[out]"
    )

    ffmpeg = shutil.which("ffmpeg") or "/usr/bin/ffmpeg"
    cmd = [
        ffmpeg, "-y",
        "-i", str(video_file),
        "-filter_complex", vf,
        "-map", "[out]",
        "-c:v", "libx264", "-preset", "fast", "-crf", "22",
        "-pix_fmt", "yuv420p", "-r", str(REEL_FPS),
        "-t", str(duration), "-an",
        str(out_path)
    ]
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        if r.returncode != 0:
            print(f"  Segment render failed: {r.stderr[-500:]}")
            return None
        return out_path
    except Exception as e:
        print(f"  Segment render error: {e}")
        return None


# ═══════════════════════════════════════════════════════════════════════
# FORMAT: LISTICLE — "Top 5 Places to Visit in [Month]"
# ═══════════════════════════════════════════════════════════════════════

def _build_listicle(destinations: list[dict], month_name: str,
                    out_dir: Path) -> tuple[list[Path], float]:
    """Build a Top 5 listicle Short. Returns (segments, total_duration)."""
    # Pick top 5 by score (with some variety)
    top = sorted(destinations, key=lambda d: -d.get("score", 0))[:20]
    random.shuffle(top)
    picks = top[:5]
    # Sort by score ascending so #1 is revealed last
    picks.sort(key=lambda d: d.get("score", 0))

    HOOK_DUR = 4.0
    REVEAL_DUR = 5.5
    CTA_DUR = 3.5
    total = HOOK_DUR + 5 * REVEAL_DUR + CTA_DUR

    segments = []
    V = _hex(VERMILLION_BRIGHT)
    B = _hex(BONE)
    S = _hex(SAFFRON)
    G = "0x4CAF50"
    SG = _hex(SAGE)

    # Hook — top-pick (picks[-1] = highest score) video underneath if available;
    # otherwise solid INK_DEEP backdrop with vermillion + bone overlays. NEVER
    # falls to Pomelli (suppresses our text). solid_color is INK_DEEP to give
    # the white/saffron text high contrast.
    hook_bg, hook_is_img = _pick_background(picks[-1], ["top5", "listicle", month_name.lower()])
    hook_texts = [
        _dt("TOP 5", FONT_JETBRAINS, 120, V, "(w-text_w)/2", "h*0.25", bw=5),
        _dt("PLACES TO VISIT", FONT_INSTRUMENT, 52, B, "(w-text_w)/2", "h*0.38"),
        _dt(f"IN {month_name.upper()}", FONT_INSTRUMENT, 48, S, "(w-text_w)/2", "h*0.46", "gte(t,0.4)"),
        _dt("Based on NakshIQ scores", FONT_CRIMSON, 32, B, "(w-text_w)/2", "h*0.55", "gte(t,1.0)"),
    ]
    p = _render_segment_auto(hook_bg, hook_is_img, HOOK_DUR, hook_texts,
                             out_dir / "seg_00_hook.mp4",
                             solid_color=_hex(INK_DEEP))
    if p: segments.append(p)

    # Destination reveals
    for i, dest in enumerate(picks):
        rank = 5 - i
        name = dest.get("name", "Unknown")
        state = dest.get("state", "")
        bg, is_img = _pick_background(dest, [name, state])
        rc = V if rank == 1 else S
        rs = 160 if rank == 1 else 120
        ns = 72 if rank == 1 else 64
        sc = G if dest.get("score", 0) >= 4 else S
        score = int(dest.get("score", 3))
        tagline = dest.get("tagline") or dest.get("note") or ""
        if len(tagline) > 45:
            tagline = tagline[:42] + "..."

        texts = [
            _dt(f"#{rank}", FONT_JETBRAINS, rs, rc, "(w-text_w)/2", "h*0.18", bw=5),
            _dt(name.upper(), FONT_INSTRUMENT, ns, B, "(w-text_w)/2", "h*0.33", "gte(t,0.5)", 4),
            _dt(state, FONT_CRIMSON, 32, SG, "(w-text_w)/2", "h*0.42", "gte(t,0.8)"),
            _dt(_format_score(score), FONT_JETBRAINS, 72, sc, "(w-text_w)/2", "h*0.50", "gte(t,1.2)", 4),
            _dt(tagline, FONT_CRIMSON, 34, B, "(w-text_w)/2", "h*0.60", "gte(t,1.8)"),
        ]
        zoom = "in" if i % 2 == 0 else "out"
        # Reveal segments: alternate INK_DEEP for #5/#3/#1, SAGE-tinted dark
        # for #4/#2 so back-to-back fallbacks (when several picks miss R2)
        # don't look identical. Vermillion rank chip + bone name + saffron
        # score still pop on either backdrop.
        reveal_solid = _hex(INK_DEEP) if i % 2 == 0 else "0x2A3528"  # near-black sage
        p = _render_segment_auto(bg, is_img, REVEAL_DUR, texts,
                                 out_dir / f"seg_{i+1:02d}_rank{rank}.mp4",
                                 zoom_dir=zoom, solid_color=reveal_solid)
        if p: segments.append(p)

    # CTA — also use top-pick video if available, else solid vermillion
    # (it's the "FOLLOW @NAKSHIQ" close, brand colour is on-message). Pull
    # from picks[-1] (the #1 reveal that just played) so the visual continues
    # rather than cutting to a random low-ranked dest's footage.
    cta_bg, cta_is_img = _pick_background(picks[-1], ["nakshiq", "follow"])
    cta_texts = [
        _dt("FOLLOW", FONT_INSTRUMENT, 48, B, "(w-text_w)/2", "h*0.30"),
        _dt("@NAKSHIQ", FONT_INSTRUMENT, 72, V, "(w-text_w)/2", "h*0.38", "gte(t,0.3)", 4),
        _dt("Data-driven travel for India", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.48", "gte(t,0.6)"),
    ]
    p = _render_segment_auto(cta_bg, cta_is_img, CTA_DUR, cta_texts,
                             out_dir / "seg_06_cta.mp4", zoom_dir="out",
                             solid_color=_hex(VERMILLION_BRIGHT))
    if p: segments.append(p)

    return segments, total, {}


# ═══════════════════════════════════════════════════════════════════════
# FORMAT: BEFORE/AFTER — "[Dest] in [Month A] vs [Month B]"
# ═══════════════════════════════════════════════════════════════════════

def _build_before_after(destinations: list[dict], month_now: int,
                        out_dir: Path) -> tuple[list[Path], float]:
    """Build a before/after seasonal contrast Short."""
    # Find destinations with big score swings across months
    # Try multiple contrast months to find the most dramatic swings
    import requests

    # Candidate months: opposite season first, then shoulder months
    candidates = []
    for offset in [2, 4, 6, 3, 5, 1]:
        candidates.append(((month_now - 1 + offset) % 12) + 1)
    # Deduplicate while preserving order
    seen = set()
    contrast_months = []
    for m in candidates:
        if m != month_now and m not in seen:
            seen.add(m)
            contrast_months.append(m)

    contrasts = []
    best_month = None
    for month_future in contrast_months:
        future_dests = _fetch_destinations(month_future)
        future_scores = {d.get("id", d.get("name", "")): d.get("score", 3) for d in future_dests}

        month_contrasts = []
        for d in destinations:
            did = d.get("id", d.get("name", ""))
            now_score = d.get("score", 3)
            fut_score = future_scores.get(did, now_score)
            diff = abs(now_score - fut_score)
            if diff >= 1:
                month_contrasts.append({**d, "now_score": now_score, "future_score": fut_score,
                                        "future_month": month_future})

        # Sort by biggest diff first
        month_contrasts.sort(key=lambda x: abs(x["now_score"] - x["future_score"]), reverse=True)

        if len(month_contrasts) >= 2 and len(month_contrasts) > len(contrasts):
            contrasts = month_contrasts
            best_month = month_future
            # If we found 3+ with diff>=2, that's great — stop searching
            big_diffs = [c for c in contrasts if abs(c["now_score"] - c["future_score"]) >= 2]
            if len(big_diffs) >= 3:
                break

    if len(contrasts) < 2:
        return [], 0, {}

    # Prioritize biggest diffs, then shuffle within same diff
    contrasts.sort(key=lambda x: abs(x["now_score"] - x["future_score"]), reverse=True)
    picks = contrasts[:3]  # Show up to 3 contrasts
    num_picks = len(picks)

    HOOK_DUR = 4.0
    CONTRAST_DUR = 8.0
    CTA_DUR = 3.0
    total = HOOK_DUR + num_picks * CONTRAST_DUR + CTA_DUR

    segments = []
    V = _hex(VERMILLION_BRIGHT); B = _hex(BONE); S = _hex(SAFFRON); G = "0x4CAF50"
    month_name_now = calendar.month_name[month_now]
    month_name_fut = calendar.month_name[picks[0]["future_month"]]

    # Hook
    hook_bg, hook_is_img = _pick_background(picks[0])
    hook_texts = [
        _dt("TIMING IS", FONT_INSTRUMENT, 52, B, "(w-text_w)/2", "h*0.28"),
        _dt("EVERYTHING", FONT_JETBRAINS, 100, V, "(w-text_w)/2", "h*0.36", bw=5),
        _dt(f"{month_name_now} vs {month_name_fut}", FONT_INSTRUMENT, 44, S,
            "(w-text_w)/2", "h*0.50", "gte(t,0.5)"),
        _dt("Same place. Different month.", FONT_CRIMSON, 32, B,
            "(w-text_w)/2", "h*0.58", "gte(t,1.2)"),
    ]
    p = _render_segment_auto(hook_bg, hook_is_img, HOOK_DUR, hook_texts, out_dir / "seg_00_hook.mp4")
    if p: segments.append(p)

    # Contrast reveals
    for i, dest in enumerate(picks):
        bg, is_img = _pick_background(dest)
        name = dest.get("name", "Unknown")
        ns = int(dest["now_score"])
        fs = int(dest["future_score"])
        nc = G if ns >= 4 else S if ns == 3 else V
        fc = G if fs >= 4 else S if fs == 3 else V
        direction = "drops to" if ns > fs else "jumps to"

        texts = [
            _dt(name.upper(), FONT_INSTRUMENT, 64, B, "(w-text_w)/2", "h*0.22", bw=4),
            # "Now" month + score: visible from 0.3–3.4s, then disappear
            _dt(f"{month_name_now.upper()}", FONT_INSTRUMENT, 40, B, "(w-text_w)/2", "h*0.32", "between(t,0.3,3.4)"),
            _dt(_format_score(ns), FONT_JETBRAINS, 100, nc, "(w-text_w)/2", "h*0.38", "between(t,0.6,3.4)", 5),
            # "Future" month + score: appear at 3.5s onward (no overlap)
            _dt(f"In {month_name_fut}?", FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.32", "gte(t,3.5)"),
            _dt(_format_score(fs), FONT_JETBRAINS, 120, fc, "(w-text_w)/2", "h*0.40", "gte(t,4)", 5),
            _dt(f"Score {direction} {_format_score(fs)}", FONT_CRIMSON, 34, B, "(w-text_w)/2", "h*0.58", "gte(t,5)"),
        ]
        p = _render_segment_auto(bg, is_img, CONTRAST_DUR, texts, out_dir / f"seg_{i+1:02d}_contrast.mp4")
        if p: segments.append(p)

    # CTA
    cta_texts = [
        _dt("CHECK YOUR DATES", FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.30"),
        _dt("@NAKSHIQ", FONT_INSTRUMENT, 72, V, "(w-text_w)/2", "h*0.38", "gte(t,0.3)", 4),
        _dt("nakshiq.com", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.48", "gte(t,0.6)"),
    ]
    cta_bg, cta_is_img = _pick_background(picks[-1], ["timing", "nakshiq"])
    p = _render_segment_auto(cta_bg, cta_is_img, CTA_DUR, cta_texts,
                         out_dir / "seg_04_cta.mp4")
    if p: segments.append(p)

    return segments, total, {"dest": picks[0]}


# ═══════════════════════════════════════════════════════════════════════
# FORMAT: MINI GUIDE — "48 Hours in [Dest]"
# ═══════════════════════════════════════════════════════════════════════

def _build_dest_specific_tips(dest: dict) -> list[str]:
    """Build 4 destination-specific tips from confidence_cards + emergency + eatery.

    Falls back to generic-but-still-useful tips when intel is missing, but
    always tries to surface ONE real data point per tip so the playbook reads
    like a NakshIQ post, not a Lonely Planet template.
    """
    # Strings that look populated but mean "no data" — filter pre-render so
    # we don't ship "Stay: ₹N/A/night" or "Hospital: TBD" to viewers.
    _SENTINEL = {"", "n/a", "na", "tbd", "tba", "unknown", "none", "null"}

    def _val(s) -> str:
        """Treat sentinel-only strings as empty."""
        if s is None:
            return ""
        t = str(s).strip()
        return "" if t.lower() in _SENTINEL else t

    def _short(s: str, maxlen: int = 50) -> str:
        """Trim to a single sentence under maxlen chars without breaking
        mid-word, mid-paren, or mid-number (e.g. "3.5hrs"). Drops trailing
        dots/whitespace too."""
        s = _val(s)
        if not s:
            return ""
        s = s.rstrip(".").rstrip()
        # Sentence-split on ". " (period+space) NOT on bare "." — bare "."
        # appears inside decimals ("3.5hrs") and abbreviations.
        if ". " in s and len(s) > maxlen:
            first = s.split(". ")[0].strip()
            if first and len(first) <= maxlen:
                return first.rstrip(".").rstrip()
        # Still too long: cut at maxlen but back off to last space to avoid
        # mid-word truncation. Drop trailing punctuation noise + dangling
        # open-parens.
        if len(s) > maxlen:
            cut = s[: maxlen - 1].rstrip()
            if " " in cut:
                cut = cut.rsplit(" ", 1)[0]
            # Drop trailing dangling open-paren or close-paren-without-open
            cut = cut.rstrip(",;:-(")
            # If we ended inside a parenthesis (open without close), strip the
            # whole parenthetical clause back to the previous space.
            if cut.count("(") > cut.count(")") and "(" in cut:
                cut = cut.rsplit("(", 1)[0].rstrip()
            return cut + "…"
        return s

    intel = dest.get("intel") or {}
    reach = intel.get("reach") or {}
    sleep = intel.get("sleep") or {}
    fuel = intel.get("fuel") or {}
    network = intel.get("network") or {}
    emergency = intel.get("emergency") or {}
    sos = intel.get("sos") or {}
    eatery = intel.get("legendary_eatery") or {}
    elevation = dest.get("elevation_m") or 0
    name = dest.get("name", "")
    tagline = (dest.get("tagline") or dest.get("note") or "").strip()

    tips: list[str] = []

    # TIP 1 — How to reach. Tip cards are 5-second video overlays; keep each
    # line under ~50 chars so it fits the safe-area without auto-wrap.
    near_city = _short(reach.get("from_nearest_city"))
    road = _short(reach.get("road_condition"))
    if near_city:
        tips.append(f"From {near_city}.")
    elif road:
        tips.append(f"Roads: {road}.")
    elif elevation and elevation > 3000:
        tips.append(f"{elevation}m — acclimatize 1 night below.")

    # TIP 2 — Where to sleep (real options count + price band)
    opts = sleep.get("options_count")
    price = _val(sleep.get("price_range_inr"))
    if opts and price:
        tips.append(f"Sleep: {opts} options, ₹{price}/night.")
    elif opts:
        tips.append(f"Sleep: {opts} verified options.")
    elif price:
        tips.append(f"Stay: ₹{price}/night.")

    # TIP 3 — Fuel + network (driver intel)
    fuel_pump = _short(fuel.get("nearest_petrol_pump"), maxlen=28)
    carry_extra = bool(fuel.get("carry_extra"))
    nets = [k for k in ("jio", "airtel", "bsnl", "vi") if network.get(k)]
    fuel_line = ""
    if carry_extra:
        fuel_line = "Carry extra fuel."
    elif fuel_pump:
        fuel_line = f"Fuel: {fuel_pump}."
    net_line = ""
    if nets:
        net_line = f"Cell: {', '.join(n.title() for n in nets[:2])}."
    elif _val(network.get("note")):
        net_line = f"Cell: {_short(network['note'], maxlen=30)}."
    combined = " ".join(filter(None, [fuel_line, net_line]))
    if combined:
        tips.append(combined)

    # TIP 4 — Legendary eatery (preferred) or emergency contact
    eatery_name = _short(eatery.get("name"), maxlen=24)
    sig = _short(eatery.get("signature_dish"), maxlen=22)
    hospital = _short(emergency.get("nearest_hospital") or sos.get("nearest_hospital"), maxlen=28)
    hospital_km = sos.get("nearest_hospital_km") or emergency.get("nearest_hospital_km")
    if eatery_name and sig:
        tips.append(f"Eat: {eatery_name} — {sig}.")
    elif eatery_name:
        tips.append(f"Eat: {eatery_name}.")
    elif hospital and hospital_km:
        tips.append(f"Hospital: {hospital} ({hospital_km}km).")
    elif hospital:
        tips.append(f"Hospital: {hospital}.")
    elif sos.get("mountain_rescue"):
        tips.append(f"Rescue: {_short(sos['mountain_rescue'], maxlen=40)}.")

    # If we still have <2 tips, fall back to tagline (last-resort filler)
    if len(tips) < 2 and tagline:
        tips.append(tagline[:60])

    # Final fallback so the playbook is never empty
    if not tips:
        tips.append(f"Plan {name} on nakshiq.com.")

    return tips[:4]


def _build_mini_guide(destinations: list[dict], out_dir: Path) -> tuple[list[Path], float]:
    """Build a mini travel guide Short for a single destination."""
    # Pick a high-scoring destination
    top = [d for d in destinations if d.get("score", 0) >= 4]
    if not top:
        top = destinations[:10]
    random.shuffle(top)
    dest = top[0]

    name = dest.get("name", "Unknown")
    state = dest.get("state", "")
    score = int(dest.get("score", 4))
    tagline = dest.get("tagline") or dest.get("note") or ""
    difficulty = dest.get("difficulty", "easy")
    elevation = dest.get("elevation_m", 0)

    # Real-data tips (confidence_cards + emergency + eatery anchor). Falls back
    # gracefully when `intel` is missing — see _build_dest_specific_tips.
    tips = _build_dest_specific_tips(dest)

    HOOK_DUR = 5.0
    TIP_DUR = 5.0
    CTA_DUR = 3.0
    num_tips = min(len(tips), 4)
    total = HOOK_DUR + num_tips * TIP_DUR + CTA_DUR

    segments = []
    V = _hex(VERMILLION_BRIGHT); B = _hex(BONE); S = _hex(SAFFRON)
    G = "0x4CAF50"; SG = _hex(SAGE)
    sc = G if score >= 4 else S

    # Hook — destination reveal
    bg, is_img = _pick_background(dest)
    hook_texts = [
        _dt("48 HOURS IN", FONT_INSTRUMENT, 44, S, "(w-text_w)/2", "h*0.25"),
        _dt(name.upper(), FONT_INSTRUMENT, 76, B, "(w-text_w)/2", "h*0.33", "gte(t,0.3)", 5),
        _dt(state, FONT_CRIMSON, 32, SG, "(w-text_w)/2", "h*0.43", "gte(t,0.6)"),
        _dt(f"NakshIQ Score: {_format_score(score)}", FONT_JETBRAINS, 48, sc, "(w-text_w)/2", "h*0.52", "gte(t,1.2)", 4),
    ]
    p = _render_segment_auto(bg, is_img, HOOK_DUR, hook_texts, out_dir / "seg_00_hook.mp4")
    if p: segments.append(p)

    # Tips
    for i in range(num_tips):
        tip = tips[i]
        tip_bg, tip_is_img = _pick_background(dest, [name, state, tip.lower()])
        texts = [
            _dt(f"TIP #{i+1}", FONT_JETBRAINS, 72, V if i == 0 else S,
                "(w-text_w)/2", "h*0.25", bw=4),
            _dt(tip, FONT_CRIMSON, 38, B, "(w-text_w)/2", "h*0.40", "gte(t,0.5)"),
        ]
        p = _render_segment_auto(tip_bg, tip_is_img, TIP_DUR, texts, out_dir / f"seg_{i+1:02d}_tip.mp4")
        if p: segments.append(p)

    # CTA
    cta_texts = [
        _dt(f"PLAN {name.upper()}", FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.30"),
        _dt("@NAKSHIQ", FONT_INSTRUMENT, 72, V, "(w-text_w)/2", "h*0.38", "gte(t,0.3)", 4),
        _dt("Full guide on nakshiq.com", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.48", "gte(t,0.6)"),
    ]
    p = _render_segment_auto(bg, is_img, CTA_DUR, cta_texts, out_dir / "seg_cta.mp4", zoom_dir="out")
    if p: segments.append(p)

    return segments, total, {"dest": dest}


# ═══════════════════════════════════════════════════════════════════════
# FORMAT: DID YOU KNOW — Single surprising fact about a destination
# ═══════════════════════════════════════════════════════════════════════

def _build_did_you_know(destinations: list[dict], out_dir: Path) -> tuple[list[Path], float]:
    """Build a 'Did You Know?' Short — one surprising destination fact."""
    # Find destinations with long, interesting taglines or notes
    candidates = []
    for d in destinations:
        tagline = d.get("tagline") or ""
        note = d.get("note") or ""
        # Prefer destinations with rich descriptions
        text = tagline if len(tagline) > len(note) else note
        if len(text) > 30 and d.get("score", 0) >= 3:
            candidates.append({**d, "_fact": text})
    if not candidates:
        return [], 0, {}

    random.shuffle(candidates)
    dest = candidates[0]
    fact = dest["_fact"]
    name = dest.get("name", "Unknown")
    state = dest.get("state", "")
    score = int(dest.get("score", 4))
    elevation = dest.get("elevation_m", 0)

    # Split fact into lines for readability (max ~35 chars per line)
    words = fact.split()
    lines = []
    current = ""
    for w in words:
        if len(current) + len(w) + 1 > 35:
            lines.append(current.strip())
            current = w
        else:
            current += " " + w
    if current.strip():
        lines.append(current.strip())
    lines = lines[:4]  # Max 4 lines

    HOOK_DUR = 4.0
    FACT_DUR = 8.0
    STAT_DUR = 5.0
    CTA_DUR = 3.0
    total = HOOK_DUR + FACT_DUR + STAT_DUR + CTA_DUR

    segments = []
    V = _hex(VERMILLION_BRIGHT); B = _hex(BONE); S = _hex(SAFFRON)
    G = "0x4CAF50"; SG = _hex(SAGE)
    sc = G if score >= 4 else S

    # Hook — "DID YOU KNOW?"
    bg, is_img = _pick_background(dest)
    hook_texts = [
        _dt("DID YOU", FONT_INSTRUMENT, 52, B, "(w-text_w)/2", "h*0.28"),
        _dt("KNOW?", FONT_JETBRAINS, 120, V, "(w-text_w)/2", "h*0.36", bw=5),
        _dt(name.upper(), FONT_INSTRUMENT, 56, S, "(w-text_w)/2", "h*0.50", "gte(t,0.8)", 4),
        _dt(state, FONT_CRIMSON, 30, SG, "(w-text_w)/2", "h*0.58", "gte(t,1.2)"),
    ]
    p = _render_segment_auto(bg, is_img, HOOK_DUR, hook_texts, out_dir / "seg_00_hook.mp4")
    if p: segments.append(p)

    # Fact reveal — staggered line appearance
    fact_texts = []
    y_start = 0.25
    for i, line in enumerate(lines):
        delay = 0.5 + i * 1.2
        fact_texts.append(
            _dt(line, FONT_CRIMSON, 42, B, "(w-text_w)/2",
                f"h*{y_start + i * 0.08:.2f}", f"gte(t,{delay:.1f})")
        )
    p = _render_segment_auto(bg, is_img, FACT_DUR, fact_texts, out_dir / "seg_01_fact.mp4", zoom_dir="out")
    if p: segments.append(p)

    # Stats card
    stat_texts = [
        _dt(name.upper(), FONT_INSTRUMENT, 56, B, "(w-text_w)/2", "h*0.25", bw=4),
        _dt(f"Score: {_format_score(score)}", FONT_JETBRAINS, 64, sc, "(w-text_w)/2", "h*0.35", "gte(t,0.4)", 4),
        _dt(f"Difficulty: {dest.get('difficulty', 'easy').title()}", FONT_INSTRUMENT, 36, S,
            "(w-text_w)/2", "h*0.46", "gte(t,0.8)"),
    ]
    if elevation and elevation > 500:
        stat_texts.append(
            _dt(f"Elevation: {elevation:,}m", FONT_INSTRUMENT, 36, SG,
                "(w-text_w)/2", "h*0.53", "gte(t,1.2)")
        )
    p = _render_segment_auto(bg, is_img, STAT_DUR, stat_texts, out_dir / "seg_02_stats.mp4")
    if p: segments.append(p)

    # CTA
    cta_texts = [
        _dt("MORE FACTS", FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.30"),
        _dt("@NAKSHIQ", FONT_INSTRUMENT, 72, V, "(w-text_w)/2", "h*0.38", "gte(t,0.3)", 4),
        _dt("Travel with IQ", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.48", "gte(t,0.6)"),
    ]
    _cta_bg, _cta_is_img = _pick_background(dest)
    p = _render_segment_auto(_cta_bg, _cta_is_img, CTA_DUR, cta_texts, out_dir / "seg_03_cta.mp4")
    if p: segments.append(p)

    return segments, total, {"dest": dest}


# ═══════════════════════════════════════════════════════════════════════
# FORMAT: THIS VS THAT — Head-to-head destination comparison
# ═══════════════════════════════════════════════════════════════════════

def _build_this_vs_that(destinations: list[dict], out_dir: Path) -> tuple[list[Path], float]:
    """Build a 'This vs That' comparison Short — two destinations head-to-head."""
    # Find pairs with similar scores but different character
    scored = [d for d in destinations if d.get("score", 0) >= 3]
    if len(scored) < 2:
        return [], 0, {}

    # Try to find an interesting matchup — same score, different difficulty/state
    random.shuffle(scored)
    pair = None
    for i, a in enumerate(scored[:-1]):
        for b in scored[i+1:]:
            if a.get("state") != b.get("state"):
                pair = (a, b)
                break
        if pair:
            break

    if not pair:
        pair = (scored[0], scored[1])

    dest_a, dest_b = pair
    name_a = dest_a.get("name", "A")
    name_b = dest_b.get("name", "B")
    state_a = dest_a.get("state", "")
    state_b = dest_b.get("state", "")
    score_a = int(dest_a.get("score", 3))
    score_b = int(dest_b.get("score", 3))

    HOOK_DUR = 4.0
    CARD_DUR = 6.0
    VERDICT_DUR = 5.0
    CTA_DUR = 3.0
    total = HOOK_DUR + 2 * CARD_DUR + VERDICT_DUR + CTA_DUR

    segments = []
    V = _hex(VERMILLION_BRIGHT); B = _hex(BONE); S = _hex(SAFFRON)
    G = "0x4CAF50"; SG = _hex(SAGE)

    # Hook — "THIS vs THAT"
    bg_a, is_img_a = _pick_background(dest_a, [name_a, state_a])
    hook_texts = [
        _dt(name_a.upper(), FONT_INSTRUMENT, 52, S, "(w-text_w)/2", "h*0.25"),
        _dt("VS", FONT_JETBRAINS, 120, V, "(w-text_w)/2", "h*0.34", "gte(t,0.5)", bw=5),
        _dt(name_b.upper(), FONT_INSTRUMENT, 52, S, "(w-text_w)/2", "h*0.48", "gte(t,1.0)"),
        _dt("Which one wins this month?", FONT_CRIMSON, 32, B, "(w-text_w)/2", "h*0.58", "gte(t,1.5)"),
    ]
    p = _render_segment_auto(bg_a, is_img_a, HOOK_DUR, hook_texts, out_dir / "seg_00_hook.mp4")
    if p: segments.append(p)

    # Card A
    sc_a = G if score_a >= 4 else S if score_a == 3 else V
    tagline_a = dest_a.get("tagline") or dest_a.get("note") or ""
    if len(tagline_a) > 45:
        tagline_a = tagline_a[:42] + "..."
    card_a_texts = [
        _dt(name_a.upper(), FONT_INSTRUMENT, 68, B, "(w-text_w)/2", "h*0.22", bw=4),
        _dt(dest_a.get("state", ""), FONT_CRIMSON, 30, SG, "(w-text_w)/2", "h*0.32", "gte(t,0.3)"),
        _dt(_format_score(score_a), FONT_JETBRAINS, 100, sc_a, "(w-text_w)/2", "h*0.40", "gte(t,0.6)", 5),
        _dt(f"Difficulty: {dest_a.get('difficulty', 'easy').title()}", FONT_INSTRUMENT, 32, S,
            "(w-text_w)/2", "h*0.52", "gte(t,1.2)"),
        _dt(tagline_a, FONT_CRIMSON, 30, B, "(w-text_w)/2", "h*0.60", "gte(t,2.0)"),
    ]
    p = _render_segment_auto(bg_a, is_img_a, CARD_DUR, card_a_texts, out_dir / "seg_01_card_a.mp4")
    if p: segments.append(p)

    # Card B
    bg_b, is_img_b = _pick_background(dest_b, [name_b, state_b])
    sc_b = G if score_b >= 4 else S if score_b == 3 else V
    tagline_b = dest_b.get("tagline") or dest_b.get("note") or ""
    if len(tagline_b) > 45:
        tagline_b = tagline_b[:42] + "..."
    card_b_texts = [
        _dt(name_b.upper(), FONT_INSTRUMENT, 68, B, "(w-text_w)/2", "h*0.22", bw=4),
        _dt(dest_b.get("state", ""), FONT_CRIMSON, 30, SG, "(w-text_w)/2", "h*0.32", "gte(t,0.3)"),
        _dt(_format_score(score_b), FONT_JETBRAINS, 100, sc_b, "(w-text_w)/2", "h*0.40", "gte(t,0.6)", 5),
        _dt(f"Difficulty: {dest_b.get('difficulty', 'easy').title()}", FONT_INSTRUMENT, 32, S,
            "(w-text_w)/2", "h*0.52", "gte(t,1.2)"),
        _dt(tagline_b, FONT_CRIMSON, 30, B, "(w-text_w)/2", "h*0.60", "gte(t,2.0)"),
    ]
    p = _render_segment_auto(bg_b, is_img_b, CARD_DUR, card_b_texts, out_dir / "seg_02_card_b.mp4")
    if p: segments.append(p)

    # Verdict
    if score_a > score_b:
        winner, w_score = name_a, score_a
    elif score_b > score_a:
        winner, w_score = name_b, score_b
    else:
        winner, w_score = "IT'S A TIE", score_a
    wc = G if w_score >= 4 else S
    verdict_bg = bg_a if score_a >= score_b else bg_b
    verdict_is_img = is_img_a if score_a >= score_b else is_img_b
    verdict_texts = [
        _dt("THE VERDICT", FONT_INSTRUMENT, 48, B, "(w-text_w)/2", "h*0.25"),
        _dt(winner.upper(), FONT_INSTRUMENT, 72, wc, "(w-text_w)/2", "h*0.35", "gte(t,0.8)", 5),
        _dt(f"NakshIQ Score: {_format_score(w_score)}", FONT_JETBRAINS, 48, B, "(w-text_w)/2", "h*0.46", "gte(t,1.5)", 4),
        _dt("This month's pick", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.56", "gte(t,2.2)"),
    ]
    p = _render_segment_auto(verdict_bg, verdict_is_img, VERDICT_DUR, verdict_texts, out_dir / "seg_03_verdict.mp4")
    if p: segments.append(p)

    # CTA
    cta_texts = [
        _dt("COMPARE MORE", FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.30"),
        _dt("@NAKSHIQ", FONT_INSTRUMENT, 72, V, "(w-text_w)/2", "h*0.38", "gte(t,0.3)", 4),
        _dt("Data-driven travel for India", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.48", "gte(t,0.6)"),
    ]
    _cta_bg, _cta_is_img = _pick_background(dest_a)
    p = _render_segment_auto(_cta_bg, _cta_is_img, CTA_DUR, cta_texts, out_dir / "seg_04_cta.mp4")
    if p: segments.append(p)

    return segments, total, {"dest_a": dest_a, "dest_b": dest_b}


# ═══════════════════════════════════════════════════════════════════════
# FORMAT: DON'T GO HERE — Low-scoring destinations this month
# ═══════════════════════════════════════════════════════════════════════

def _build_dont_go_here(destinations: list[dict], month_name: str,
                        out_dir: Path) -> tuple[list[Path], float, dict]:
    """Build a 'Don't Go Here in [Month]' Short — warning about lower-scoring destinations."""
    import calendar
    month_num = list(calendar.month_name).index(month_name) if month_name in calendar.month_name else datetime.now().month

    # First try: fetch genuinely low-scoring destinations via max_score API param
    bad = _fetch_destinations(month=month_num, max_score=2)
    if len(bad) < 3:
        # Fallback: score ≤2 from the provided destinations
        bad = [d for d in destinations if d.get("score", 0) <= 2]
    if len(bad) < 3:
        # Skip this format — don't mislead viewers with 4/5 destinations
        print("dont_go_here: not enough low-scoring destinations (need score ≤2). Skipping.")
        return [], 0, {}

    # Prefer famous destinations that people might mistakenly visit
    bad.sort(key=lambda d: len(d.get("tagline") or ""), reverse=True)
    picks = bad[:4]
    random.shuffle(picks)

    HOOK_DUR = 4.0
    WARN_DUR = 6.0
    ALT_DUR = 5.0
    CTA_DUR = 3.0
    num_warns = len(picks)
    total = HOOK_DUR + num_warns * WARN_DUR + ALT_DUR + CTA_DUR

    segments = []
    V = _hex(VERMILLION_BRIGHT); B = _hex(BONE); S = _hex(SAFFRON)
    RED = "0xE55642"; SG = _hex(SAGE)

    # Hook — "DON'T GO HERE"
    bg, is_img = _pick_background(picks[0])
    hook_texts = [
        _dt("WAIT ON", FONT_INSTRUMENT, 52, B, "(w-text_w)/2", "h*0.28"),
        _dt("THESE", FONT_JETBRAINS, 120, RED, "(w-text_w)/2", "h*0.36", bw=5),
        _dt(f"in {month_name}", FONT_INSTRUMENT, 48, S, "(w-text_w)/2", "h*0.50", "gte(t,0.5)"),
        _dt("Better months exist.", FONT_CRIMSON, 32, B, "(w-text_w)/2", "h*0.58", "gte(t,1.2)"),
    ]
    p = _render_segment_auto(bg, is_img, HOOK_DUR, hook_texts, out_dir / "seg_00_hook.mp4")
    if p: segments.append(p)

    # Warning cards
    for i, dest in enumerate(picks):
        bg, is_img = _pick_background(dest)
        name = dest.get("name", "Unknown")
        state = dest.get("state", "")
        score = int(dest.get("score", 1))
        reason = dest.get("note") or dest.get("tagline") or "Not the right time."
        if len(reason) > 50:
            reason = reason[:47] + "..."

        label = "SKIP" if score <= 2 else "NOT NOW"
        sc = RED if score <= 2 else S
        texts = [
            _dt(label, FONT_JETBRAINS, 52, RED, "(w-text_w)/2", "h*0.18", bw=4),
            _dt(name.upper(), FONT_INSTRUMENT, 64, B, "(w-text_w)/2", "h*0.28", "gte(t,0.3)", 4),
            _dt(state, FONT_CRIMSON, 28, SG, "(w-text_w)/2", "h*0.38", "gte(t,0.6)"),
            _dt(_format_score(score), FONT_JETBRAINS, 100, sc, "(w-text_w)/2", "h*0.45", "gte(t,1.0)", 5),
            _dt(reason, FONT_CRIMSON, 30, B, "(w-text_w)/2", "h*0.58", "gte(t,2.0)"),
        ]
        p = _render_segment_auto(bg, is_img, WARN_DUR, texts, out_dir / f"seg_{i+1:02d}_warn.mp4")
        if p: segments.append(p)

    # Better alternatives — show top score destination
    best = sorted(destinations, key=lambda d: -d.get("score", 0))
    alt = best[0] if best else picks[0]
    alt_bg, alt_is_img = _pick_background(alt, [alt.get("name",""), alt.get("state","")])
    alt_name = alt.get("name", "Unknown")
    alt_score = int(alt.get("score", 5))
    alt_texts = [
        _dt("GO HERE INSTEAD", FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.25"),
        _dt(alt_name.upper(), FONT_INSTRUMENT, 68, "0x4CAF50", "(w-text_w)/2", "h*0.35", "gte(t,0.5)", 5),
        _dt(f"Score: {_format_score(alt_score)} this month", FONT_JETBRAINS, 44, B, "(w-text_w)/2", "h*0.46", "gte(t,1.2)", 4),
        _dt(alt.get("state", ""), FONT_CRIMSON, 30, SG, "(w-text_w)/2", "h*0.55", "gte(t,1.8)"),
    ]
    p = _render_segment_auto(alt_bg, alt_is_img, ALT_DUR, alt_texts, out_dir / f"seg_{num_warns+1:02d}_alt.mp4")
    if p: segments.append(p)

    # CTA
    cta_texts = [
        _dt("CHECK YOUR DATES", FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.30"),
        _dt("@NAKSHIQ", FONT_INSTRUMENT, 72, V, "(w-text_w)/2", "h*0.38", "gte(t,0.3)", 4),
        _dt("Don't waste your trip", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.48", "gte(t,0.6)"),
    ]
    _cta_bg, _cta_is_img = _pick_background(alt)
    p = _render_segment_auto(_cta_bg, _cta_is_img, CTA_DUR, cta_texts, out_dir / f"seg_{num_warns+2:02d}_cta.mp4")
    if p: segments.append(p)

    return segments, total, {}


# ═══════════════════════════════════════════════════════════════════════
# CONCAT + MUSIC
# ═══════════════════════════════════════════════════════════════════════

def _concat_with_music(segments: list[Path], total_dur: float,
                       music_path: Path, out_path: Path) -> Optional[Path]:
    """Concatenate segments and overlay music."""
    if len(segments) < 2:
        return None

    ffmpeg = shutil.which("ffmpeg") or "/usr/bin/ffmpeg"
    tmp_dir = segments[0].parent

    # Write concat file
    concat_file = tmp_dir / "concat.txt"
    with open(concat_file, "w") as f:
        for seg in segments:
            f.write(f"file '{seg}'\n")

    # Concat video (no audio)
    concat_vid = tmp_dir / "concat_silent.mp4"
    cmd1 = [
        ffmpeg, "-y",
        "-f", "concat", "-safe", "0", "-i", str(concat_file),
        "-c:v", "libx264", "-preset", "medium", "-crf", "22",
        "-pix_fmt", "yuv420p", "-r", str(REEL_FPS), "-an",
        str(concat_vid)
    ]
    r = subprocess.run(cmd1, capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        print(f"Concat failed: {r.stderr[-500:]}")
        return None

    # Add music
    cmd2 = [
        ffmpeg, "-y",
        "-i", str(concat_vid),
        "-i", str(music_path),
        "-filter_complex",
        f"[1:a]aloop=loop=3:size=2e+09,atrim=0:{total_dur},"
        f"afade=t=in:st=0:d=0.8,"
        f"afade=t=out:st={total_dur - 2}:d=2,"
        f"volume=0.50[aout]",
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "128k",
        "-t", str(total_dur), "-shortest",
        str(out_path)
    ]
    r = subprocess.run(cmd2, capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        print(f"Music overlay failed: {r.stderr[-500:]}")
        return None

    return out_path


# ═══════════════════════════════════════════════════════════════════════
# CAPTIONS
# ═══════════════════════════════════════════════════════════════════════

YT_CAPTION_TEMPLATES = {
    "listicle": (
        "5 places scoring 10/10 in {month} — ranked by road access, crowd density, weather, hospitals & cell signal.\n\n"
        "Which one surprised you?\n\n"
        "→ {link}\n\n"
        "#{month}Travel #WeeklyPicks #{state_tag} #ScoreData #NakshIQ"
    ),
    "before_after": (
        "{dest} drops from {score_before_display} to {score_after_display} next month.\n\n"
        "Roads close. Crowds vanish. The data shifts overnight.\n\n"
        "→ {link}\n\n"
        "#{dest_tag} #{state_tag} #ScoreShift #{month}Travel #NakshIQ"
    ),
    "mini_guide": (
        "48 hours in {dest} — score {score_display} this month.\n\n"
        "Road condition, nearest hospital, cell signal, crowd level — all checked.\n\n"
        "→ {link}\n\n"
        "#{dest_tag} #{state_tag} #{month}Travel #MiniGuide #NakshIQ"
    ),
    "did_you_know": (
        "{dest} scores {score_display} in {month}.\n\n"
        "Most people visit in the wrong month. The data says go now.\n\n"
        "→ {link}\n\n"
        "#{dest_tag} #{state_tag} #{month}Travel #HiddenGem #NakshIQ"
    ),
    "this_vs_that": (
        "{dest_a} ({score_a_display}) vs {dest_b} ({score_b_display}) in {month}.\n\n"
        "Same region, different scores. One has better roads, less crowd.\n\n"
        "→ {link}\n\n"
        "#{dest_a_tag}vs{dest_b_tag} #{state_tag} #{month}Travel #HeadToHead #NakshIQ"
    ),
    "dont_go_here": (
        "These places score 2/10 in {month}. Roads shut, 40°C+ heat, zero cell signal.\n\n"
        "Don't waste your leave. Check the score first.\n\n"
        "→ {link}\n\n"
        "#{month}AvoidList #{state_tag} #ScoreData #SkipThis #NakshIQ"
    ),
}


def _yt_caption(fmt: str, data: dict) -> str:
    """Generate YouTube Short caption with niche, destination-specific hashtags."""
    template = YT_CAPTION_TEMPLATES.get(fmt, YT_CAPTION_TEMPLATES["listicle"])
    dest_name = data.get("dest_name", "")
    dest_tag = dest_name.replace(" ", "").replace("-", "") if dest_name else ""
    state_name = data.get("state", "")
    state_tag = state_name.replace(" ", "").replace("&", "").replace("-", "") if state_name else ""
    dest_a_name = data.get("dest_a", "")
    dest_b_name = data.get("dest_b", "")
    dest_a_tag = dest_a_name.replace(" ", "").replace("-", "") if dest_a_name else ""
    dest_b_tag = dest_b_name.replace(" ", "").replace("-", "") if dest_b_name else ""
    fallback_link = "https://nakshiq.com?utm_source=youtube&utm_medium=short&utm_campaign=yt-short"
    try:
        return template.format(
            month=data.get("month", ""),
            dest=dest_name,
            score=data.get("score", ""),
            score_display=_format_score(data.get("score")),
            score_before=data.get("score_before", ""),
            score_before_display=_format_score(data.get("score_before")),
            score_after=data.get("score_after", ""),
            score_after_display=_format_score(data.get("score_after")),
            score_a=data.get("score_a", ""),
            score_a_display=_format_score(data.get("score_a")),
            score_b=data.get("score_b", ""),
            score_b_display=_format_score(data.get("score_b")),
            dest_tag=dest_tag,
            state_tag=state_tag,
            link=data.get("link", fallback_link),
            dest_a=dest_a_name,
            dest_b=dest_b_name,
            dest_a_tag=dest_a_tag,
            dest_b_tag=dest_b_tag,
        )
    except (KeyError, IndexError):
        return f"{dest_name or 'India'} — scored by NakshIQ.\n\n→ {fallback_link}\n\n#{dest_tag or 'NakshIQ'} #{state_tag or 'ScoreData'} #NakshIQ"


# ── Instagram-optimized captions (more emoji, IG hashtags, no YT CTAs) ──

IG_CAPTION_TEMPLATES = {
    "listicle": (
        "5 destinations scoring 10/10 right now \u2014 weather, roads, crowds, hospitals, cell signal all checked.\n\n"
        "{month} picks based on real data, not opinions.\n\n"
        "\ud83d\udcbe Save this \u2014 refer back when you're booking.\n\n"
        "{hashtags}"
    ),
    "before_after": (
        "{dest} \u2014 {score_before_display} now, drops to {score_after_display} next month.\n\n"
        "Roads, weather, everything shifts. Timing matters.\n\n"
        "\ud83d\udcbe Save this \u2014 the timing window closes faster than you think.\n\n"
        "{hashtags}"
    ),
    "mini_guide": (
        "48 hours in {dest} \u2014 score {score_display} this month.\n\n"
        "Road access, hospital distance, crowd level, cell coverage \u2014 all in one place.\n\n"
        "\ud83d\udcbe Save this for your weekend planning.\n\n"
        "{hashtags}"
    ),
    "did_you_know": (
        "{dest} scores {score_display} in {month}.\n\n"
        "Most people don't know this place exists. The data says go now.\n\n"
        "\ud83d\udcac Comment 'PLAN' and we'll DM you the {month} window.\n\n"
        "{hashtags}"
    ),
    "this_vs_that": (
        "{dest_a} ({score_a_display}) vs {dest_b} ({score_b_display}) \u2014 {month} head-to-head.\n\n"
        "Same region, different scores. The data picks a winner.\n\n"
        "\ud83d\udcac Which one would you pick? Drop your vote below.\n\n"
        "{hashtags}"
    ),
    "dont_go_here": (
        "Scoring 2/10 in {month} \u2014 roads shut, extreme heat, no signal.\n\n"
        "Don't waste your leave on these right now.\n\n"
        "\ud83d\udcbe Save this \u2014 check the score before you book.\n\n"
        "{hashtags}"
    ),
}


# Niche/branded hashtag pool for IG (kept local so this module avoids circular
# imports from autoposter.py).  All tags below are NOT in autoposter._BANNED_HASHTAGS.
_IG_NICHE_POOL = [
    "IndianHillStations", "IndianRoadtrip", "IndianAdventures",
    "DesiTravel", "DesiTraveller", "TravelBharat", "BharatTravel",
    "DiscoverIndia", "ExploreBharat", "IndianTravelDiaries",
    "HimalayanIndia", "IndianMonuments", "IndianForts",
    "IndianTemples", "IndianTrails",
]
_IG_BRAND_POOL = [
    "NakshIQ", "TravelWithIQ", "DataDrivenTravel",
    "PlanWithData", "ScoredDestinations", "VerifiedTravel",
]


def _ig_hashtag_block(dest_name: str | None,
                      state_name: str | None,
                      month: str | None,
                      max_tags: int = 18) -> str:
    """Build a 15-20 tag IG-only hashtag block.  Mirrors _build_ig_hashtags()
    in autoposter.py.  Pool order: dest → state → month/format → niche → branded.
    """
    tags: list[str] = []
    seen: set[str] = set()

    def _push(t: str) -> None:
        if not t or t in seen or len(tags) >= max_tags:
            return
        tags.append(t)
        seen.add(t)

    if dest_name and dest_name not in ("India", ""):
        clean = dest_name.replace(" ", "").replace("-", "").replace("&", "")
        if clean:
            _push(clean)
            _push(f"{clean}Travel")
            _push(f"Visit{clean}")
    if state_name and state_name not in ("India", ""):
        clean_state = state_name.replace(" ", "").replace("&", "And").replace("-", "")
        if clean_state:
            _push(clean_state)
            _push(f"{clean_state}Travel")
            _push(f"{clean_state}Tourism")
    if month:
        clean_month = month.replace(" ", "")
        if clean_month:
            _push(f"{clean_month}Travel")
    for t in ("TravelReels", "TravelShorts", "IndianTravelReels"):
        _push(t)
    for t in _IG_NICHE_POOL:
        if len(tags) >= max_tags - 4:
            break
        _push(t)
    for t in _IG_BRAND_POOL:
        _push(t)

    return " ".join(f"#{t}" for t in tags[:max_tags])


def _ig_caption(fmt: str, data: dict) -> str:
    """Generate Instagram Reel caption with expanded hashtags + saves-bait CTA.
    Tier 1 (2026-05-10): no caption URL (IG renders it as plain text), 18-tag
    hashtag block, save/comment CTA inline in template.
    """
    template = IG_CAPTION_TEMPLATES.get(fmt, IG_CAPTION_TEMPLATES["listicle"])
    dest_name = data.get("dest_name", "")
    state_name = data.get("state", "")
    month = data.get("month", "")
    dest_tag = dest_name.replace(" ", "").replace("-", "") if dest_name else ""
    state_tag = state_name.replace(" ", "").replace("&", "").replace("-", "") if state_name else ""
    dest_a_name = data.get("dest_a", "")
    dest_b_name = data.get("dest_b", "")
    dest_a_tag = dest_a_name.replace(" ", "").replace("-", "") if dest_a_name else ""
    dest_b_tag = dest_b_name.replace(" ", "").replace("-", "") if dest_b_name else ""
    hashtags = _ig_hashtag_block(dest_name or dest_a_name, state_name, month)
    try:
        return template.format(
            month=month,
            dest=dest_name,
            score=data.get("score", ""),
            score_display=_format_score(data.get("score")),
            score_before=data.get("score_before", ""),
            score_before_display=_format_score(data.get("score_before")),
            score_after=data.get("score_after", ""),
            score_after_display=_format_score(data.get("score_after")),
            score_a=data.get("score_a", ""),
            score_a_display=_format_score(data.get("score_a")),
            score_b=data.get("score_b", ""),
            score_b_display=_format_score(data.get("score_b")),
            dest_tag=dest_tag,
            state_tag=state_tag,
            dest_a=dest_a_name,
            dest_b=dest_b_name,
            dest_a_tag=dest_a_tag,
            dest_b_tag=dest_b_tag,
            hashtags=hashtags,
        )
    except (KeyError, IndexError):
        return f"{dest_name or 'India'} — scored by NakshIQ.\n\n💾 Save this for your next trip.\n\n{hashtags}"



# ═══════════════════════════════════════════════════════════════════════
# CSV-DEFINED YT FORMATS (Phase 2 — pre-rendered .mp4 assets)
# ═══════════════════════════════════════════════════════════════════════

def _available_csv_yt_formats() -> list[str]:
    """CSV-defined yt_short formats (v2_yt_*, etc.) that have at least one
    .mp4 asset in social_image_library/. Asset presence is the opt-in — a
    format with no rendered video stays out of the rotation automatically.

    2026-05-29: denylisted assets (e.g. the 4 Veo-watermarked v2_yt_silent_pov
    clips) do NOT count toward opt-in. A format whose every .mp4 is quarantined
    is a zombie — it would enter rotation but _build_csv_yt_short can never
    materialise it, returning None and (since None doesn't mark the format used)
    re-picking it every run. That caused the 3× "returned None" failures on
    2026-05-28. Mirror the denylist filter from csv_format_loader._find_matching_asset.
    """
    if not SOCIAL_IMAGE_LIBRARY.exists():
        return []
    try:
        import csv_format_loader as _cfl
        specs = _cfl.load_all_formats()
        denylist = getattr(_cfl, "_ASSET_DENYLIST", frozenset())
    except Exception as e:
        print(f"[csv_yt] loader unavailable: {e}")
        return []
    out = []
    for fid, spec in specs.items():
        if not getattr(spec, "is_yt_short", False):
            continue
        live_mp4s = [p for p in SOCIAL_IMAGE_LIBRARY.glob(f"{fid}-*.mp4")
                     if p.name not in denylist and p.stat().st_size > 0]
        if live_mp4s:
            out.append(fid)
        elif list(SOCIAL_IMAGE_LIBRARY.glob(f"{fid}-*.mp4")):
            print(f"[csv_yt] {fid}: all .mp4 assets denylisted/empty — excluded from rotation")
    return out


def _build_csv_yt_short(fmt: str, destinations: list[dict], st: dict,
                        dry_run: bool, preview: bool) -> Optional[dict]:
    """Post a CSV-defined YT Short — a pre-rendered .mp4 from
    social_image_library/ plus a caption from the CSV template. No segment
    building, no music concat (the asset is already a finished video).
    """
    import csv_format_loader as _cfl
    specs = _cfl.load_all_formats()
    spec = specs.get(fmt)
    if not spec:
        print(f"[csv_yt] spec {fmt} not found — SKIPPING")
        return None

    month_name = calendar.month_name[datetime.now().month]
    extras = {
        "month_name":        month_name,
        "verification_date": date.today().isoformat(),
    }
    for dest in destinations:
        ok, reason = _cfl.is_eligible(spec, dest, SOCIAL_IMAGE_LIBRARY)
        if not ok:
            continue
        asset = _cfl._find_matching_asset(spec, dest, SOCIAL_IMAGE_LIBRARY)
        if not asset or asset.suffix.lower() != ".mp4":
            continue  # a YT Short needs a finished video, not a still
        extras["state_list"] = dest.get("state", "")
        extras["state_list_first"] = dest.get("state", "")
        caption = _cfl.render_caption(spec, dest, extra_context=extras)
        if not caption:
            continue
        video_bytes = asset.read_bytes()
        size_mb = len(video_bytes) / (1024 * 1024)
        print(f"[csv_yt] {fmt} → {asset.name} ({size_mb:.1f} MB), dest={dest.get('id')}")
        st.setdefault("yt_short_formats_used", []).append(fmt)
        if not dry_run:
            _save_state(st)
        final_name = f"yt_short_{fmt}_{date.today().isoformat()}.mp4"
        if preview:
            (Path(__file__).parent / final_name).write_bytes(video_bytes)
            print(f"Preview saved: {final_name}")
        return {
            "video_bytes":     video_bytes,
            "video_filename":  final_name,
            "caption":         caption,
            "ig_caption":      caption,
            "format":          fmt,
            "duration":        0,                  # pre-rendered — duration unknown
            "music":           "(pre-rendered asset)",
            "primary_dest_id": dest.get("id"),
            # 2026-05-27: CSV-static yt_shorts upload pre-rendered files as-is
            # (no in-builder text overlay). Flip brand_stamp ON for these so
            # the dest name + brand bar burn in at upload time. Dynamic
            # builders (mini_guide / did_you_know / dont_go_here / listicle /
            # before_after / this_vs_that) already bake `name.upper()` and
            # do NOT set this flag — keeps brand_stamp opt-in everywhere else.
            "is_csv_static":   True,
        }
    print(f"[csv_yt] {fmt}: no eligible dest with a .mp4 asset — SKIPPING")
    return None


# ═══════════════════════════════════════════════════════════════════════
# MAIN BUILD FUNCTION
# ═══════════════════════════════════════════════════════════════════════

def build_yt_short(
    fmt: str = None,
    dry_run: bool = False,
    preview: bool = False,
) -> Optional[dict]:
    """
    Build a YouTube Short video.

    Returns dict with keys: video_path, caption, format, duration, music
    or None on failure.
    """
    st = _load_state()
    month_now = datetime.now().month
    month_name = calendar.month_name[month_now]

    # Pick format — rotation first, analytics-weighted within unused pool
    if fmt is None:
        used_fmts = st.get("yt_short_formats_used", [])
        # CSV-defined YT formats with a .mp4 asset join the rotation pool.
        rotation_pool = YT_SHORT_FORMATS + _available_csv_yt_formats()
        unused = [f for f in rotation_pool if f not in used_fmts]
        if not unused:
            st["yt_short_formats_used"] = []
            unused = rotation_pool[:]

        # Try analytics-weighted selection if data exists
        try:
            from autoposter import smart_format_weights
            weights = smart_format_weights("yt_short")
            if weights:
                pool_weights = [weights.get(f, 1.0) for f in unused]
                fmt = random.choices(unused, weights=pool_weights, k=1)[0]
                print(f"Format (analytics-weighted): {fmt}")
            else:
                fmt = random.choice(unused)
        except Exception:
            fmt = random.choice(unused)

    print(f"Format: {fmt}")

    # Fetch destinations. include_intel=True so mini_guide's "48 hours in X"
    # tips can be destination-specific (confidence_cards + emergency + legendary
    # eatery), not cookie-cutter — caught 2026-05-15.
    destinations = _fetch_destinations(month_now, include_intel=True)
    if not destinations:
        print("ERROR: No destinations from API.")
        return None

    print(f"Fetched {len(destinations)} destinations for {month_name}")

    # 2026-05-16 — once-per-calendar-month rule. Filter the candidate pool so
    # no YT Short surfaces a destination that's already been posted this month
    # across any flow (main loop, evening, reels, pomelli/canva/flow_story).
    # Returns None (SKIP) when the filter empties the pool — no silent
    # degradation. Import is local because yt_shorts_gen runs both as a
    # standalone module and as an autoposter import.
    try:
        from autoposter import recently_used_destinations
        used = recently_used_destinations(st)
        if used:
            fresh = [d for d in destinations if d.get("id") not in used]
            if not fresh:
                print(f"YT Short: all {len(destinations)} dests already posted this month — SKIPPING")
                return None
            print(f"After once-per-month dedup: {len(fresh)}/{len(destinations)} fresh dests")
            destinations = fresh
    except Exception as e:
        print(f"WARN: once-per-month dedup unavailable ({e}) — continuing without filter")

    # CSV-defined YT formats (Phase 2) post a pre-rendered .mp4 from
    # social_image_library/ — no music, no segment building. Branch out
    # before the native build pipeline.
    if fmt not in YT_SHORT_FORMATS:
        csv_result = _build_csv_yt_short(fmt, destinations, st, dry_run, preview)
        if csv_result:
            return csv_result
        # 2026-05-29: a CSV format that can't materialise (every eligible dest
        # deduped out this month, or assets quarantined) must NOT abort the whole
        # YT-Short slot. Fall through to the native listicle pipeline so the slot
        # still publishes a video rather than logging "returned None" and skipping.
        print(f"[csv_yt] {fmt} produced nothing — falling back to native 'listicle'")
        fmt = "listicle"

    # Pick music
    music = _pick_music(st)
    if not music:
        print("WARNING: No music tracks found in assets/yt_music/")
        return None
    print(f"Music: {music.name}")

    # Build segments
    with tempfile.TemporaryDirectory(prefix="nakshiq_ytshort_") as td:
        out_dir = Path(td)

        month_slug = month_name.lower()   # e.g. "april"

        primary_dest_id = None  # Tier-3 telemetry: the single dest a Short
                                # most-prominently features, used by record_publish
                                # + _log_post_outcome for cross-flow dedup.

        if fmt == "listicle":
            # Weekly Picks alignment contract (PRD §8.1): if the new endpoint
            # is live, use its 5 picks for the Short so what the viewer sees
            # in the video matches what they see on /where-to-go/{month} and
            # in its JSON-LD ItemList. Silent fallback to the existing
            # /api/content pool keeps the cron alive if the endpoint flaps.
            wk_num = _week_of_month()
            wp = _fetch_weekly_picks(month=month_now, week=wk_num)
            listicle_dests = wp if wp else destinations
            segments, total_dur, _meta = _build_listicle(listicle_dests, month_name, out_dir)
            # Use state from top-scoring dest for hashtag
            top_dest = listicle_dests[0] if listicle_dests else {}
            primary_dest_id = top_dest.get("id") or None
            caption_data = {
                "month": month_name,
                "week": wk_num,
                "state": top_dest.get("state", ""),
                "link": f"https://nakshiq.com/en/where-to-go/{month_slug}?week={wk_num}&utm_source=youtube&utm_medium=short&utm_campaign=weekly-picks",
            }
        elif fmt == "before_after":
            segments, total_dur, _meta = _build_before_after(destinations, month_now, out_dir)
            ba_dest = _meta.get("dest", {})
            ba_id = ba_dest.get("id", "")
            primary_dest_id = ba_id or None
            caption_data = {
                "month": month_name,
                "dest_name": ba_dest.get("name", ""),
                "state": ba_dest.get("state", ""),
                "score_before": _meta.get("score_before", ba_dest.get("score", "")),
                "score_after": _meta.get("score_after", ""),
                "link": (
                    f"https://nakshiq.com/en/destination/{ba_id}/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=before-after"
                    if ba_id else
                    f"https://nakshiq.com/en/where-to-go/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=before-after"
                ),
            }
        elif fmt == "mini_guide":
            segments, total_dur, _meta = _build_mini_guide(destinations, out_dir)
            dest = _meta.get("dest", destinations[0])
            dest_id = dest.get("id", "")
            primary_dest_id = dest_id or None
            caption_data = {
                "month": month_name,
                "dest_name": dest.get("name", ""),
                "state": dest.get("state", ""),
                "score": dest.get("score", 4),
                "link": (
                    f"https://nakshiq.com/en/destination/{dest_id}/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=mini-guide"
                    if dest_id else
                    f"https://nakshiq.com/en/where-to-go/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=mini-guide"
                ),
            }
        elif fmt == "did_you_know":
            segments, total_dur, _meta = _build_did_you_know(destinations, out_dir)
            dyk_dest = _meta.get("dest", destinations[0])
            dyk_id = dyk_dest.get("id", "")
            primary_dest_id = dyk_id or None
            caption_data = {
                "month": month_name,
                "dest_name": dyk_dest.get("name", ""),
                "state": dyk_dest.get("state", ""),
                "score": dyk_dest.get("score", 4),
                "link": (
                    f"https://nakshiq.com/en/destination/{dyk_id}/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=did-you-know"
                    if dyk_id else
                    f"https://nakshiq.com/en/where-to-go/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=did-you-know"
                ),
            }
        elif fmt == "this_vs_that":
            segments, total_dur, _meta = _build_this_vs_that(destinations, out_dir)
            tvt_a = _meta.get("dest_a", destinations[0])
            tvt_b = _meta.get("dest_b", destinations[1] if len(destinations) > 1 else destinations[0])
            primary_dest_id = tvt_a.get("id") or None
            caption_data = {
                "month": month_name,
                "dest_a": tvt_a.get("name", "A"),
                "dest_b": tvt_b.get("name", "B"),
                "score_a": tvt_a.get("score", ""),
                "score_b": tvt_b.get("score", ""),
                "state": tvt_a.get("state", ""),
                "link": f"https://nakshiq.com/en/where-to-go/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=this-vs-that",
            }
        elif fmt == "dont_go_here":
            segments, total_dur, _meta = _build_dont_go_here(destinations, month_name, out_dir)
            dgh_dests = _meta.get("dests", [])
            dgh_state = dgh_dests[0].get("state", "") if dgh_dests else ""
            # Multi-dest format — leave primary_dest_id None so cross-flow dedup
            # doesn't mistakenly block any single dest from the main loop.
            caption_data = {
                "month": month_name,
                "state": dgh_state,
                "link": f"https://nakshiq.com/en/where-to-go/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=dont-go-here",
            }
        else:
            print(f"Unknown format: {fmt}")
            return None

        if not segments or len(segments) < 2:
            print(f"Not enough segments for {fmt} format. Trying next format.")
            # Fallback to listicle
            if fmt != "listicle":
                fmt = "listicle"
                segments, total_dur, _meta = _build_listicle(destinations, month_name, out_dir)
                top_dest = destinations[0] if destinations else {}
                primary_dest_id = top_dest.get("id") or None
                caption_data = {
                    "month": month_name,
                    "state": top_dest.get("state", ""),
                    "link": f"https://nakshiq.com/en/where-to-go/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=listicle",
                }
            if not segments or len(segments) < 2:
                return None

        print(f"Rendered {len(segments)} segments ({total_dur}s total)")

        # Concat + music
        final_name = f"yt_short_{fmt}_{date.today().isoformat()}.mp4"
        final_path = out_dir / final_name
        result = _concat_with_music(segments, total_dur, music, final_path)

        if not result or not result.exists():
            print("Final video assembly failed.")
            return None

        video_bytes = result.read_bytes()
        size_mb = len(video_bytes) / (1024 * 1024)
        print(f"YT Short ready: {final_name} ({size_mb:.1f} MB, {total_dur}s)")

        # Update state
        st.setdefault("yt_short_formats_used", []).append(fmt)
        st.setdefault("yt_short_music_used", []).append(music.stem)
        if not dry_run:
            _save_state(st)

        # Generate caption
        caption = _yt_caption(fmt, caption_data)
        ig_cap  = _ig_caption(fmt, caption_data)

        if preview:
            # Copy to a persistent location for preview
            preview_path = Path(__file__).parent / final_name
            preview_path.write_bytes(video_bytes)
            print(f"Preview saved: {preview_path}")

        return {
            "video_bytes": video_bytes,
            "video_filename": final_name,
            "caption": caption,
            "ig_caption": ig_cap,
            "format": fmt,
            "duration": total_dur,
            "music": music.stem,
            "primary_dest_id": primary_dest_id,
        }


# ═══════════════════════════════════════════════════════════════════════
# CLI
# ═══════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="NakshIQ YT Shorts Generator")
    parser.add_argument("--format", choices=YT_SHORT_FORMATS,
                        help="Force a specific format")
    parser.add_argument("--dry-run", action="store_true",
                        help="Generate but don't update state")
    parser.add_argument("--preview", action="store_true",
                        help="Save preview copy alongside generation")
    args = parser.parse_args()

    result = build_yt_short(fmt=args.format, dry_run=args.dry_run, preview=args.preview)
    if result:
        print(f"\nSuccess! Format: {result['format']}, Music: {result['music']}")
        print(f"Duration: {result['duration']}s")
        print(f"Caption:\n{result['caption']}")
    else:
        print("\nFailed to generate YT Short.")
