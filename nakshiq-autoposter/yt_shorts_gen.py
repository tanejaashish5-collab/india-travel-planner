"""
yt_shorts_gen.py — NakshIQ YouTube Shorts Generator
=====================================================
Generates 9:16 vertical Shorts (1080×1920, 30-45s) exclusively for YouTube.
Composites per-destination background video + animated text overlays + branded audio.

Formats (rotating):
  - listicle:     "Top 5 Places to Visit in [Month]" — countdown reveal
  - before_after: "[Dest] in [Month A] vs [Month B]" — score contrast
  - mini_guide:   "48 Hours in [Dest]" — quick itinerary teaser

Music library: 31 tracks in assets/yt_music/ — rotated with anti-repetition.
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
ASSETS_DIR = Path(__file__).parent / "assets"
YT_MUSIC_DIR = ASSETS_DIR / "yt_music"
STATE_FILE = Path(__file__).parent / "state.json"

# ── Output specs ──────────────────────────────────────────────────────
REEL_W, REEL_H = 1080, 1920
REEL_FPS = 30

# ── Font paths ────────────────────────────────────────────────────────
FONT_INSTRUMENT = str(FONT_DIR / "InstrumentSans-Bold.ttf") if FONT_DIR.exists() else ""
FONT_CRIMSON = str(FONT_DIR / "CrimsonPro-BoldItalic.ttf") if FONT_DIR.exists() else ""
FONT_JETBRAINS = str(FONT_DIR / "JetBrainsMono-Bold.ttf") if FONT_DIR.exists() else ""

# ── Formats ───────────────────────────────────────────────────────────
YT_SHORT_FORMATS = ["listicle", "before_after", "mini_guide"]

# ── Nakshiq API ───────────────────────────────────────────────────────
NAKSHIQ_API = "https://nakshiq.com/api/content"


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


def _find_video(dest_slug: str) -> Optional[Path]:
    """Find the best matching video for a destination slug."""
    if not VIDEOS_DIR.exists():
        return None
    slug = dest_slug.lower().replace(" ", "-").replace("_", "-")
    slug_parts = set(slug.split("-"))

    candidates = []
    all_vids = []
    for p in VIDEOS_DIR.glob("VIDEO_*.mp4"):
        if " 2" in p.stem:
            continue
        all_vids.append(p)
        name = p.stem.lower().replace("video_", "")

        if name == slug:
            return p
        if slug in name or name in slug:
            candidates.append((2, p))
            continue
        name_parts = set(name.split("-"))
        stop = {"national", "park", "lake", "valley", "falls", "fort", "temple"}
        overlap = (slug_parts - stop) & (name_parts - stop)
        if overlap:
            candidates.append((1, p))

    if candidates:
        candidates.sort(key=lambda x: -x[0])
        return candidates[0][1]
    return None


def _find_similar_video(dest: dict) -> Optional[Path]:
    """Find a video with similar aesthetic — same state or similar geography."""
    vid = _find_video(dest.get("id", dest.get("name", "")))
    if vid:
        return vid

    # Try state-based fallback
    state = dest.get("state", "").lower().replace(" ", "-")
    if state:
        for p in VIDEOS_DIR.glob("VIDEO_*.mp4"):
            if state in p.stem.lower():
                return p

    # Random scenic fallback
    all_vids = [v for v in VIDEOS_DIR.glob("VIDEO_*.mp4") if " 2" not in v.stem]
    return random.choice(all_vids) if all_vids else None


def _pick_music(state: dict) -> Optional[Path]:
    """Pick a music track from yt_music/ using oldest-unused rotation."""
    if not YT_MUSIC_DIR.exists():
        return None
    tracks = sorted(YT_MUSIC_DIR.glob("*.wav"))
    if not tracks:
        return None

    # Use state-based rotation
    used = state.get("yt_short_music_used", [])
    unused = [t for t in tracks if t.stem not in used]
    if not unused:
        # All used — reset rotation
        state["yt_short_music_used"] = []
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


def _fetch_destinations(month: int = None) -> list[dict]:
    """Fetch destinations from Nakshiq API."""
    import requests
    if month is None:
        month = datetime.now().month
    try:
        url = f"{NAKSHIQ_API}?type=destinations&month={month}&min_score=0&limit=300"
        resp = requests.get(url, timeout=15)
        data = resp.json().get("data", [])
        return [d for d in data if isinstance(d.get("score"), (int, float))]
    except Exception as e:
        print(f"API fetch failed: {e}")
        return []


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

    # Hook
    hook_vid = _find_similar_video(picks[-1])  # #1 destination
    hook_texts = [
        _dt("TOP 5", FONT_JETBRAINS, 120, V, "(w-text_w)/2", "h*0.25", bw=5),
        _dt("PLACES TO VISIT", FONT_INSTRUMENT, 52, B, "(w-text_w)/2", "h*0.38"),
        _dt(f"IN {month_name.upper()}", FONT_INSTRUMENT, 48, S, "(w-text_w)/2", "h*0.46", "gte(t,0.4)"),
        _dt("Based on NakshIQ scores", FONT_CRIMSON, 32, B, "(w-text_w)/2", "h*0.55", "gte(t,1.0)"),
    ]
    p = _render_segment(hook_vid, HOOK_DUR, hook_texts, out_dir / "seg_00_hook.mp4")
    if p: segments.append(p)

    # Destination reveals
    for i, dest in enumerate(picks):
        rank = 5 - i
        vid = _find_similar_video(dest)
        rc = V if rank == 1 else S
        rs = 160 if rank == 1 else 120
        ns = 72 if rank == 1 else 64
        sc = G if dest.get("score", 0) >= 4 else S
        name = dest.get("name", "Unknown")
        state = dest.get("state", "")
        score = int(dest.get("score", 3))
        tagline = dest.get("tagline") or dest.get("note") or ""
        if len(tagline) > 45:
            tagline = tagline[:42] + "..."

        texts = [
            _dt(f"#{rank}", FONT_JETBRAINS, rs, rc, "(w-text_w)/2", "h*0.18", bw=5),
            _dt(name.upper(), FONT_INSTRUMENT, ns, B, "(w-text_w)/2", "h*0.33", "gte(t,0.5)", 4),
            _dt(state, FONT_CRIMSON, 32, SG, "(w-text_w)/2", "h*0.42", "gte(t,0.8)"),
            _dt(f"{score}/5", FONT_JETBRAINS, 72, sc, "(w-text_w)/2", "h*0.50", "gte(t,1.2)", 4),
            _dt(tagline, FONT_CRIMSON, 34, B, "(w-text_w)/2", "h*0.60", "gte(t,1.8)"),
        ]
        p = _render_segment(vid, REVEAL_DUR, texts, out_dir / f"seg_{i+1:02d}_rank{rank}.mp4")
        if p: segments.append(p)

    # CTA
    cta_vid = _find_similar_video(picks[0])  # different video for variety
    cta_texts = [
        _dt("FOLLOW", FONT_INSTRUMENT, 48, B, "(w-text_w)/2", "h*0.30"),
        _dt("@NAKSHIQ", FONT_INSTRUMENT, 72, V, "(w-text_w)/2", "h*0.38", "gte(t,0.3)", 4),
        _dt("Data-driven travel for India", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.48", "gte(t,0.6)"),
    ]
    p = _render_segment(cta_vid, CTA_DUR, cta_texts, out_dir / "seg_06_cta.mp4")
    if p: segments.append(p)

    return segments, total


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
        return [], 0

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
    hook_vid = _find_similar_video(picks[0])
    hook_texts = [
        _dt("TIMING IS", FONT_INSTRUMENT, 52, B, "(w-text_w)/2", "h*0.28"),
        _dt("EVERYTHING", FONT_JETBRAINS, 100, V, "(w-text_w)/2", "h*0.36", bw=5),
        _dt(f"{month_name_now} vs {month_name_fut}", FONT_INSTRUMENT, 44, S,
            "(w-text_w)/2", "h*0.50", "gte(t,0.5)"),
        _dt("Same place. Different month.", FONT_CRIMSON, 32, B,
            "(w-text_w)/2", "h*0.58", "gte(t,1.2)"),
    ]
    p = _render_segment(hook_vid, HOOK_DUR, hook_texts, out_dir / "seg_00_hook.mp4")
    if p: segments.append(p)

    # Contrast reveals
    for i, dest in enumerate(picks):
        vid = _find_similar_video(dest)
        name = dest.get("name", "Unknown")
        ns = int(dest["now_score"])
        fs = int(dest["future_score"])
        nc = G if ns >= 4 else S if ns == 3 else V
        fc = G if fs >= 4 else S if fs == 3 else V
        direction = "drops to" if ns > fs else "jumps to"

        texts = [
            _dt(name.upper(), FONT_INSTRUMENT, 64, B, "(w-text_w)/2", "h*0.22", bw=4),
            _dt(f"{month_name_now.upper()}", FONT_INSTRUMENT, 40, B, "(w-text_w)/2", "h*0.32", "gte(t,0.3)"),
            _dt(f"{ns}/5", FONT_JETBRAINS, 100, nc, "(w-text_w)/2", "h*0.38", "gte(t,0.6)", 5),
            _dt(f"In {month_name_fut}?", FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.32", "gte(t,3.5)"),
            _dt(f"{fs}/5", FONT_JETBRAINS, 120, fc, "(w-text_w)/2", "h*0.40", "gte(t,4)", 5),
            _dt(f"Score {direction} {fs}/5", FONT_CRIMSON, 34, B, "(w-text_w)/2", "h*0.58", "gte(t,5)"),
        ]
        p = _render_segment(vid, CONTRAST_DUR, texts, out_dir / f"seg_{i+1:02d}_contrast.mp4")
        if p: segments.append(p)

    # CTA
    cta_texts = [
        _dt("CHECK YOUR DATES", FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.30"),
        _dt("@NAKSHIQ", FONT_INSTRUMENT, 72, V, "(w-text_w)/2", "h*0.38", "gte(t,0.3)", 4),
        _dt("nakshiq.com", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.48", "gte(t,0.6)"),
    ]
    p = _render_segment(_find_similar_video(picks[-1]), CTA_DUR, cta_texts,
                         out_dir / "seg_04_cta.mp4")
    if p: segments.append(p)

    return segments, total


# ═══════════════════════════════════════════════════════════════════════
# FORMAT: MINI GUIDE — "48 Hours in [Dest]"
# ═══════════════════════════════════════════════════════════════════════

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

    # Build "tips" based on destination data
    tips = []
    if difficulty == "hard" or (elevation and elevation > 2500):
        tips.append("Pack layers. Altitude hits hard.")
    elif difficulty == "moderate":
        tips.append("Comfortable shoes essential.")
    else:
        tips.append("Light packing works here.")

    if elevation and elevation > 3000:
        tips.append(f"Elevation: {elevation}m. Acclimatize.")
    
    tips.append("Book stays 2 weeks ahead.")
    tips.append("Best explored over 2-3 days.")
    if len(tagline) > 5:
        tips.append(tagline[:50])

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
    vid = _find_similar_video(dest)
    hook_texts = [
        _dt("48 HOURS IN", FONT_INSTRUMENT, 44, S, "(w-text_w)/2", "h*0.25"),
        _dt(name.upper(), FONT_INSTRUMENT, 76, B, "(w-text_w)/2", "h*0.33", "gte(t,0.3)", 5),
        _dt(state, FONT_CRIMSON, 32, SG, "(w-text_w)/2", "h*0.43", "gte(t,0.6)"),
        _dt(f"NakshIQ Score: {score}/5", FONT_JETBRAINS, 48, sc, "(w-text_w)/2", "h*0.52", "gte(t,1.2)", 4),
    ]
    p = _render_segment(vid, HOOK_DUR, hook_texts, out_dir / "seg_00_hook.mp4")
    if p: segments.append(p)

    # Tips
    for i in range(num_tips):
        tip = tips[i]
        tip_vid = _find_similar_video(dest)  # Same destination, different angle
        texts = [
            _dt(f"TIP #{i+1}", FONT_JETBRAINS, 72, V if i == 0 else S,
                "(w-text_w)/2", "h*0.25", bw=4),
            _dt(tip, FONT_CRIMSON, 38, B, "(w-text_w)/2", "h*0.40", "gte(t,0.5)"),
        ]
        p = _render_segment(tip_vid, TIP_DUR, texts, out_dir / f"seg_{i+1:02d}_tip.mp4")
        if p: segments.append(p)

    # CTA
    cta_texts = [
        _dt(f"PLAN {name.upper()}", FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.30"),
        _dt("@NAKSHIQ", FONT_INSTRUMENT, 72, V, "(w-text_w)/2", "h*0.38", "gte(t,0.3)", 4),
        _dt("Full guide on nakshiq.com", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.48", "gte(t,0.6)"),
    ]
    p = _render_segment(vid, CTA_DUR, cta_texts, out_dir / "seg_cta.mp4")
    if p: segments.append(p)

    return segments, total


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
        "Top 5 places to visit in India in {month} — ranked by NakshIQ scores.\n\n"
        "Which one surprised you? Drop a comment!\n\n"
        "→ {link}\n\n"
        "#india #travel #shorts #top5 #nakshiq #travelindia #wanderlust "
        "#indiantravel #bestplaces #traveltips"
    ),
    "before_after": (
        "Same place, different month — the scores tell the story.\n\n"
        "Timing is everything when you travel India.\n\n"
        "→ {link}\n\n"
        "#india #travel #shorts #nakshiq #traveltiming #indiantravel "
        "#travelindia #travelhacks #besttimetovisit"
    ),
    "mini_guide": (
        "48 hours in {dest} — everything you need to know.\n\n"
        "NakshIQ Score: {score}/5\n\n"
        "→ {link}\n\n"
        "#india #travel #shorts #{dest_tag} #nakshiq #travelguide "
        "#indiantravel #travelindia #wanderlust #explore"
    ),
}


def _yt_caption(fmt: str, data: dict) -> str:
    """Generate YouTube Short caption."""
    template = YT_CAPTION_TEMPLATES.get(fmt, YT_CAPTION_TEMPLATES["listicle"])
    dest_name = data.get("dest_name", "India")
    dest_tag = dest_name.lower().replace(" ", "").replace("-", "")
    fallback_link = "https://nakshiq.com?utm_source=youtube&utm_medium=short&utm_campaign=yt-short"
    try:
        return template.format(
            month=data.get("month", ""),
            dest=dest_name,
            score=data.get("score", ""),
            dest_tag=dest_tag,
            link=data.get("link", fallback_link),
        )
    except KeyError:
        return f"Travel smarter with NakshIQ.\n\n→ {fallback_link}\n\n#india #travel #shorts #nakshiq"


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

    # Pick format (oldest-unused rotation)
    if fmt is None:
        used_fmts = st.get("yt_short_formats_used", [])
        unused = [f for f in YT_SHORT_FORMATS if f not in used_fmts]
        if not unused:
            st["yt_short_formats_used"] = []
            unused = YT_SHORT_FORMATS[:]
        fmt = random.choice(unused)

    print(f"Format: {fmt}")

    # Fetch destinations
    destinations = _fetch_destinations(month_now)
    if not destinations:
        print("ERROR: No destinations from API.")
        return None

    print(f"Fetched {len(destinations)} destinations for {month_name}")

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

        if fmt == "listicle":
            segments, total_dur = _build_listicle(destinations, month_name, out_dir)
            caption_data = {
                "month": month_name,
                "link": f"https://nakshiq.com/en/where-to-go/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=listicle",
            }
        elif fmt == "before_after":
            segments, total_dur = _build_before_after(destinations, month_now, out_dir)
            # Pick the top-contrast destination for the deep link
            top_ba = sorted(destinations, key=lambda d: d.get("score", 0), reverse=True)
            ba_dest = top_ba[0] if top_ba else {}
            ba_id = ba_dest.get("id", "")
            caption_data = {
                "month": month_name,
                "link": (
                    f"https://nakshiq.com/en/destination/{ba_id}/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=before-after"
                    if ba_id else
                    f"https://nakshiq.com/en/where-to-go/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=before-after"
                ),
            }
        elif fmt == "mini_guide":
            segments, total_dur = _build_mini_guide(destinations, out_dir)
            top = [d for d in destinations if d.get("score", 0) >= 4]
            dest = top[0] if top else destinations[0]
            dest_id = dest.get("id", "")
            caption_data = {
                "dest_name": dest.get("name", "India"),
                "score": dest.get("score", 4),
                "link": (
                    f"https://nakshiq.com/en/destination/{dest_id}/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=mini-guide"
                    if dest_id else
                    f"https://nakshiq.com/en/where-to-go/{month_slug}?utm_source=youtube&utm_medium=short&utm_campaign=mini-guide"
                ),
            }
        else:
            print(f"Unknown format: {fmt}")
            return None

        if not segments or len(segments) < 2:
            print(f"Not enough segments for {fmt} format. Trying next format.")
            # Fallback to listicle
            if fmt != "listicle":
                fmt = "listicle"
                segments, total_dur = _build_listicle(destinations, month_name, out_dir)
                caption_data = {
                    "month": month_name,
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

        if preview:
            # Copy to a persistent location for preview
            preview_path = Path(__file__).parent / final_name
            preview_path.write_bytes(video_bytes)
            print(f"Preview saved: {preview_path}")

        return {
            "video_bytes": video_bytes,
            "video_filename": final_name,
            "caption": caption,
            "format": fmt,
            "duration": total_dur,
            "music": music.stem,
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
