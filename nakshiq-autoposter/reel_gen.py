"""
reel_gen.py — NakshIQ Reel / Short-Form Video Generator
=========================================================
Generates 9:16 vertical Reels (1080×1920) by compositing:
  1. Background video clip (center-cropped from 1280×720 landscape footage)
  2. Animated text overlays (score reveals, comparisons, hooks)
  3. NakshIQ branding (logo bar, watermark)

Reel formats:
  - score_reveal:  "Don't go to X in [month]. Score: 2/5" → dramatic reveal
  - seasonal_shift: "X is 5/5 now. In 3 months? 2/5."
  - contrarian:    "Everyone goes to X. Smart travelers go to Y."
  - trap_alert:    "Tourist trap: [thing]. What to do instead."
  - top_5:         Quick-fire top 5 destinations this month

Uses ffmpeg for all video processing (available on GitHub Actions ubuntu).
"""

from __future__ import annotations

import json
import random
import shutil
import subprocess
import tempfile
from pathlib import Path
from typing import Optional

# ── Brand constants (single source of truth: slide_gen.py) ────────────────
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

# ── Paths ─────────────────────────────────────────────────────────────────
VIDEOS_DIR = Path(__file__).parent.parent / "videos"
ASSETS_DIR = Path(__file__).parent / "assets"

# ── Output specs ──────────────────────────────────────────────────────────
REEL_W, REEL_H = 1080, 1920
REEL_FPS = 30
REEL_DURATION = 10  # seconds — sweet spot for Reels algorithm

# ── Font paths (used in ffmpeg drawtext) ──────────────────────────────────
FONT_CRIMSON = str(FONT_DIR / "CrimsonPro-Italic.ttf") if FONT_DIR.exists() else ""
FONT_INSTRUMENT = str(FONT_DIR / "InstrumentSans-Bold.ttf") if FONT_DIR.exists() else ""
FONT_JETBRAINS = str(FONT_DIR / "JetBrainsMono-Bold.ttf") if FONT_DIR.exists() else ""


def _find_video(dest_slug: str) -> Optional[Path]:
    """Find the best matching video for a destination slug."""
    slug = dest_slug.lower().replace(" ", "-").replace("_", "-")
    slug_parts = set(slug.split("-"))  # e.g. {"gir", "national", "park"}

    all_vids = []
    candidates = []
    for p in VIDEOS_DIR.glob("*.mp4"):
        if " 2" in p.stem:
            continue
        all_vids.append(p)
        name = p.stem.lower().replace("video_", "").replace("video-", "")

        # Exact match
        if name == slug:
            return p

        # Full slug in name or name in slug
        if slug in name or name in slug:
            candidates.append((2, p))  # priority 2 = substring
            continue

        # Partial word overlap (at least 1 meaningful word matches)
        name_parts = set(name.split("-"))
        # Filter out generic words
        stop = {"national", "park", "lake", "valley", "falls", "fort", "temple", "np"}
        meaningful_overlap = (slug_parts - stop) & (name_parts - stop)
        if meaningful_overlap:
            candidates.append((1, p))  # priority 1 = word overlap

    # Return best candidate by priority
    if candidates:
        candidates.sort(key=lambda x: -x[0])
        return candidates[0][1]
    return None


def _hex_to_ffmpeg(hex_color: str) -> str:
    """Convert #RRGGBB to ffmpeg-compatible color string."""
    h = hex_color.lstrip("#")
    return f"0x{h}"


def _escape_text(text: str) -> str:
    """Escape special characters for ffmpeg drawtext filter."""
    return (text
            .replace("\\", "\\\\")
            .replace("'", "\u2019")   # curly apostrophe avoids quoting hell
            .replace(":", "\\:")
            .replace("%", "%%")
            .replace(",", "\\,"))


def _build_drawtext(text: str, font: str, size: int, color: str,
                    x: str, y: str, enable: str = "",
                    border_w: int = 3, shadow_color: str = "black@0.6",
                    shadow_x: int = 2, shadow_y: int = 2) -> str:
    """Build an ffmpeg drawtext filter string."""
    escaped = _escape_text(text)
    parts = [
        f"drawtext=text='{escaped}'",
        f"fontfile='{font}'" if font else "",
        f"fontsize={size}",
        f"fontcolor={_hex_to_ffmpeg(color)}",
        f"x={x}",
        f"y={y}",
        f"borderw={border_w}",
        f"bordercolor=black@0.5",
        f"shadowcolor={shadow_color}",
        f"shadowx={shadow_x}",
        f"shadowy={shadow_y}",
    ]
    if enable:
        # Escape commas in enable expressions so they don't conflict
        # with ffmpeg's filter chain comma separator
        esc_enable = enable.replace(",", "\\,")
        parts.append(f"enable='{esc_enable}'")
    return ":".join(p for p in parts if p)


def _build_score_reveal_filters(dest_name: str, month: str, score: int,
                                reason: str) -> str:
    """
    Score Reveal format:
      0-2s:  "DON'T GO TO [DEST]"
      2-4s:  "IN [MONTH]."
      4-7s:  Big score "2/5" with vermillion flash
      7-10s: Reason text + NakshIQ branding
    """
    lines = []

    # Dark overlay for readability
    lines.append("drawbox=x=0:y=0:w=iw:h=ih:color=black@0.45:t=fill")

    # Line 1: "DO NOT GO TO" (fade in 0-0.5s)
    lines.append(_build_drawtext(
        "DO NOT GO TO", FONT_INSTRUMENT, 52,
        BONE, "(w-text_w)/2", "h*0.28",
        enable="between(t,0,4)"
    ))

    # Line 2: destination name BIG (fade in 0.3-1s)
    lines.append(_build_drawtext(
        dest_name.upper(), FONT_INSTRUMENT, 78,
        VERMILLION_BRIGHT, "(w-text_w)/2", "h*0.34",
        enable="between(t,0.3,4)"
    ))

    # Line 3: "IN [MONTH]" (fade in 1.5s)
    lines.append(_build_drawtext(
        f"IN {month.upper()}", FONT_INSTRUMENT, 52,
        BONE, "(w-text_w)/2", "h*0.42",
        enable="between(t,1.5,4)"
    ))

    # Score reveal BIG (appear at 4s)
    lines.append(_build_drawtext(
        f"{score}/5", FONT_JETBRAINS, 180,
        VERMILLION_BRIGHT if score <= 2 else SAFFRON if score == 3 else "#4CAF50",
        "(w-text_w)/2", "h*0.30",
        enable="gte(t,4)", border_w=5
    ))

    # "NAKSHIQ SCORE" label above score
    lines.append(_build_drawtext(
        "NAKSHIQ SCORE", FONT_INSTRUMENT, 36,
        BONE, "(w-text_w)/2", "h*0.24",
        enable="gte(t,4)"
    ))

    # Reason text (appear at 6s)
    # Wrap long reason into 2 lines
    words = reason.split()
    mid = len(words) // 2
    line_1 = " ".join(words[:mid])
    line_2 = " ".join(words[mid:])

    lines.append(_build_drawtext(
        line_1, FONT_CRIMSON, 42,
        BONE, "(w-text_w)/2", "h*0.52",
        enable="gte(t,6)"
    ))
    lines.append(_build_drawtext(
        line_2, FONT_CRIMSON, 42,
        BONE, "(w-text_w)/2", "h*0.58",
        enable="gte(t,6)"
    ))

    # Bottom branding bar
    lines.append("drawbox=x=0:y=h-160:w=iw:h=160:color=0x161614@0.85:t=fill:enable='gte(t\\,0)'")
    lines.append(_build_drawtext(
        "NAKSHIQ", FONT_INSTRUMENT, 32,
        BONE, "40", "h-120",
        border_w=0
    ))
    lines.append(_build_drawtext(
        "Travel with IQ", FONT_CRIMSON, 28,
        SAFFRON, "40", "h-80",
        border_w=0
    ))
    lines.append(_build_drawtext(
        "nakshiq.com", FONT_INSTRUMENT, 24,
        BONE, "w-240", "h-100",
        border_w=0
    ))

    return ",".join(lines)


def _build_contrarian_filters(famous: str, hidden: str,
                              famous_score: int, hidden_score: int) -> str:
    """
    Contrarian Pair format:
      0-3s:  "Everyone goes to [FAMOUS]"
      3-5s:  "Score: X/5 — crowded, overpriced"
      5-8s:  "Smart travelers go to [HIDDEN]"
      8-10s: "Score: Y/5" + NakshIQ branding
    """
    lines = []

    lines.append("drawbox=x=0:y=0:w=iw:h=ih:color=black@0.45:t=fill")

    # Phase 1: Everyone goes to...
    lines.append(_build_drawtext(
        "EVERYONE GOES TO", FONT_INSTRUMENT, 44,
        BONE, "(w-text_w)/2", "h*0.30",
        enable="between(t,0,5)"
    ))
    lines.append(_build_drawtext(
        famous.upper(), FONT_INSTRUMENT, 72,
        VERMILLION_BRIGHT, "(w-text_w)/2", "h*0.37",
        enable="between(t,0.3,5)"
    ))
    lines.append(_build_drawtext(
        f"Score: {famous_score}/5", FONT_JETBRAINS, 56,
        SAFFRON, "(w-text_w)/2", "h*0.47",
        enable="between(t,1.5,5)", border_w=4
    ))

    # Phase 2: Smart travelers go to...
    lines.append(_build_drawtext(
        "SMART TRAVELERS GO TO", FONT_INSTRUMENT, 44,
        BONE, "(w-text_w)/2", "h*0.28",
        enable="gte(t,5)"
    ))
    lines.append(_build_drawtext(
        hidden.upper(), FONT_INSTRUMENT, 72,
        "#4CAF50", "(w-text_w)/2", "h*0.36",
        enable="gte(t,5.3)"
    ))
    lines.append(_build_drawtext(
        f"Score: {hidden_score}/5", FONT_JETBRAINS, 64,
        "#4CAF50", "(w-text_w)/2", "h*0.47",
        enable="gte(t,6.5)", border_w=4
    ))
    lines.append(_build_drawtext(
        "Same region. Less crowd. Better value.", FONT_CRIMSON, 36,
        BONE, "(w-text_w)/2", "h*0.56",
        enable="gte(t,7.5)"
    ))

    # Bottom branding
    lines.append("drawbox=x=0:y=h-160:w=iw:h=160:color=0x161614@0.85:t=fill")
    lines.append(_build_drawtext(
        "NAKSHIQ", FONT_INSTRUMENT, 32,
        BONE, "40", "h-120", border_w=0
    ))
    lines.append(_build_drawtext(
        "Data, not opinions.", FONT_CRIMSON, 28,
        SAFFRON, "40", "h-80", border_w=0
    ))
    lines.append(_build_drawtext(
        "nakshiq.com", FONT_INSTRUMENT, 24,
        BONE, "w-240", "h-100", border_w=0
    ))

    return ",".join(lines)


def _build_seasonal_shift_filters(dest_name: str, now_month: str,
                                  now_score: int, future_month: str,
                                  future_score: int) -> str:
    """
    Seasonal Shift format:
      0-3s:  "[DEST] is a [5]/5 in [NOW_MONTH]"
      3-5s:  Dramatic pause
      5-8s:  "In [FUTURE_MONTH]?" → big score drop reveal
      8-10s: "Timing is everything." + NakshIQ
    """
    lines = []

    lines.append("drawbox=x=0:y=0:w=iw:h=ih:color=black@0.45:t=fill")

    # Current score
    lines.append(_build_drawtext(
        dest_name.upper(), FONT_INSTRUMENT, 64,
        BONE, "(w-text_w)/2", "h*0.28",
        enable="between(t,0,5)"
    ))
    lines.append(_build_drawtext(
        f"is a {now_score}/5", FONT_JETBRAINS, 80,
        "#4CAF50", "(w-text_w)/2", "h*0.37",
        enable="between(t,0.5,5)", border_w=4
    ))
    lines.append(_build_drawtext(
        f"in {now_month}", FONT_INSTRUMENT, 48,
        BONE, "(w-text_w)/2", "h*0.48",
        enable="between(t,1,5)"
    ))

    # Future reveal
    lines.append(_build_drawtext(
        f"In {future_month}?", FONT_INSTRUMENT, 56,
        BONE, "(w-text_w)/2", "h*0.28",
        enable="gte(t,5)"
    ))
    lines.append(_build_drawtext(
        f"{future_score}/5", FONT_JETBRAINS, 180,
        VERMILLION_BRIGHT, "(w-text_w)/2", "h*0.35",
        enable="gte(t,6)", border_w=5
    ))
    lines.append(_build_drawtext(
        "Timing is everything.", FONT_CRIMSON, 44,
        SAFFRON, "(w-text_w)/2", "h*0.56",
        enable="gte(t,7.5)"
    ))

    # Bottom branding
    lines.append("drawbox=x=0:y=h-160:w=iw:h=160:color=0x161614@0.85:t=fill")
    lines.append(_build_drawtext(
        "NAKSHIQ", FONT_INSTRUMENT, 32,
        BONE, "40", "h-120", border_w=0
    ))
    lines.append(_build_drawtext(
        "Travel with IQ", FONT_CRIMSON, 28,
        SAFFRON, "40", "h-80", border_w=0
    ))
    lines.append(_build_drawtext(
        "nakshiq.com", FONT_INSTRUMENT, 24,
        BONE, "w-240", "h-100", border_w=0
    ))

    return ",".join(lines)


def _build_trap_alert_filters(trap_name: str, alternative: str,
                              reason: str) -> str:
    """
    Trap Alert format:
      0-3s:  "TOURIST TRAP" flash + trap name
      3-6s:  Why it's a trap (1 line reason)
      6-10s: "Do this instead:" + alternative + NakshIQ
    """
    lines = []

    lines.append("drawbox=x=0:y=0:w=iw:h=ih:color=black@0.5:t=fill")

    # Trap label
    lines.append("drawbox=x=(w-500)/2:y=h*0.22:w=500:h=70:color=0xE55642:t=fill:enable='between(t\\,0\\,6)'")
    lines.append(_build_drawtext(
        "TOURIST TRAP", FONT_INSTRUMENT, 40,
        BONE, "(w-text_w)/2", "h*0.23",
        enable="between(t,0,6)", border_w=0
    ))

    # Trap name
    lines.append(_build_drawtext(
        trap_name.upper(), FONT_INSTRUMENT, 60,
        BONE, "(w-text_w)/2", "h*0.35",
        enable="between(t,0.5,6)"
    ))

    # Reason
    lines.append(_build_drawtext(
        reason, FONT_CRIMSON, 36,
        SAFFRON, "(w-text_w)/2", "h*0.45",
        enable="between(t,2,6)"
    ))

    # Alternative
    lines.append("drawbox=x=(w-500)/2:y=h*0.22:w=500:h=70:color=0x4CAF50:t=fill:enable='gte(t\\,6)'")
    lines.append(_build_drawtext(
        "DO THIS INSTEAD", FONT_INSTRUMENT, 40,
        BONE, "(w-text_w)/2", "h*0.23",
        enable="gte(t,6)", border_w=0
    ))
    lines.append(_build_drawtext(
        alternative.upper(), FONT_INSTRUMENT, 60,
        "#4CAF50", "(w-text_w)/2", "h*0.35",
        enable="gte(t,6.5)"
    ))

    # Bottom branding
    lines.append("drawbox=x=0:y=h-160:w=iw:h=160:color=0x161614@0.85:t=fill")
    lines.append(_build_drawtext(
        "NAKSHIQ", FONT_INSTRUMENT, 32,
        BONE, "40", "h-120", border_w=0
    ))
    lines.append(_build_drawtext(
        "Data, not opinions.", FONT_CRIMSON, 28,
        SAFFRON, "40", "h-80", border_w=0
    ))
    lines.append(_build_drawtext(
        "nakshiq.com", FONT_INSTRUMENT, 24,
        BONE, "w-240", "h-100", border_w=0
    ))

    return ",".join(lines)


def render_reel(
    reel_format: str,
    data: dict,
    out_dir: Path,
    video_path: Optional[Path] = None,
) -> Optional[Path]:
    """
    Render a Reel video. Returns path to the output MP4.

    Args:
        reel_format: One of "score_reveal", "contrarian", "seasonal_shift", "trap_alert"
        data: Format-specific data dict (see format builders)
        out_dir: Directory for output file
        video_path: Override background video (auto-detected if None)
    """
    # Find background video
    if video_path is None:
        dest_slug = data.get("dest_slug") or data.get("dest_name", "india")
        video_path = _find_video(dest_slug)

    if video_path is None or not video_path.exists():
        vids = [v for v in VIDEOS_DIR.glob("VIDEO_*.mp4") if " 2" not in v.stem]
        if not vids:
            print("ERROR: No videos available at all.")
            return None
        video_path = random.choice(vids)
        print(f"WARNING: No video for '{dest_slug}'. Using random: {video_path.name}")

    # Build format-specific text filters
    if reel_format == "score_reveal":
        text_filters = _build_score_reveal_filters(
            data["dest_name"], data["month"],
            data["score"], data.get("reason", "Check nakshiq.com for details")
        )
    elif reel_format == "contrarian":
        text_filters = _build_contrarian_filters(
            data["famous"], data["hidden"],
            data.get("famous_score", 3), data.get("hidden_score", 5)
        )
    elif reel_format == "seasonal_shift":
        text_filters = _build_seasonal_shift_filters(
            data["dest_name"], data["now_month"], data["now_score"],
            data["future_month"], data["future_score"]
        )
    elif reel_format == "trap_alert":
        text_filters = _build_trap_alert_filters(
            data["trap_name"], data["alternative"],
            data.get("reason", "Overpriced and overcrowded")
        )
    else:
        print(f"Unknown reel format: {reel_format}")
        return None

    # Output path
    slug = (data.get("dest_slug") or data.get("dest_name") or "reel").lower()
    slug = slug.replace(" ", "_")
    out_path = out_dir / f"reel_{reel_format}_{slug}.mp4"

    # Build ffmpeg command:
    # 1. Input video
    # 2. Crop landscape to vertical (center crop)
    # 3. Scale to 1080x1920
    # 4. Apply text overlays
    # 5. Trim to REEL_DURATION seconds
    # 6. Loop if source < duration
    filter_chain = (
        # Center-crop 720x720 from 1280x720, then scale to 1080x1920
        f"[0:v]loop=loop={REEL_FPS * REEL_DURATION}:size={REEL_FPS * 10}:start=0,"
        f"trim=duration={REEL_DURATION},setpts=PTS-STARTPTS,"
        f"crop=ih*9/16:ih:iw/2-ih*9/16/2:0,"
        f"scale={REEL_W}:{REEL_H}:flags=lanczos,"
        f"setsar=1,"
        f"{text_filters}"
        f"[out]"
    )

    import os
    ffmpeg_bin = shutil.which("ffmpeg")
    if not ffmpeg_bin:
        for candidate in ["/usr/bin/ffmpeg", "/usr/local/bin/ffmpeg"]:
            if os.path.isfile(candidate):
                ffmpeg_bin = candidate
                break
    ffmpeg_bin = ffmpeg_bin or "ffmpeg"

    cmd = [
        ffmpeg_bin, "-y",
        "-i", str(video_path),
        "-filter_complex", filter_chain,
        "-map", "[out]",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "23",
        "-pix_fmt", "yuv420p",
        "-r", str(REEL_FPS),
        "-t", str(REEL_DURATION),
        "-an",  # No audio for now (Reels get music added in-app)
        str(out_path)
    ]

    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        if result.returncode != 0:
            print(f"ffmpeg error:\n{result.stderr[-1000:]}")
            return None
        print(f"Reel rendered: {out_path.name} ({out_path.stat().st_size // 1024} KB)")
        return out_path
    except subprocess.TimeoutExpired:
        print("ffmpeg timed out (120s)")
        return None
    except FileNotFoundError:
        print(f"ffmpeg not found at '{ffmpeg_bin}' — install ffmpeg to generate Reels")
        return None


# ── Convenience: build a Reel from Nakshiq API data ──────────────────────
def build_score_reveal_reel(dest: dict, month: str, out_dir: Path) -> Optional[Path]:
    """Build a score reveal Reel from a destination data dict."""
    name = dest.get("name", "Unknown")
    score = dest.get("score", 3)
    note = dest.get("note") or dest.get("tagline") or "Check nakshiq.com for the full breakdown"

    # Make the reason punchy (truncate to ~60 chars)
    if len(note) > 80:
        note = note[:77] + "..."

    return render_reel("score_reveal", {
        "dest_name": name,
        "dest_slug": dest.get("id", name),
        "month": month,
        "score": score,
        "reason": note,
    }, out_dir)


def build_contrarian_reel(famous: dict, hidden: dict, out_dir: Path) -> Optional[Path]:
    """Build a contrarian pair Reel."""
    return render_reel("contrarian", {
        "famous": famous.get("name", "Popular Place"),
        "hidden": hidden.get("name", "Hidden Gem"),
        "famous_score": famous.get("score", 3),
        "hidden_score": hidden.get("score", 5),
        "dest_slug": hidden.get("id", "hidden"),
    }, out_dir)


# ── CLI test ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import sys
    out = Path(tempfile.mkdtemp(prefix="nakshiq_reel_"))
    print(f"Output dir: {out}")

    # Test score reveal
    p = render_reel("score_reveal", {
        "dest_name": "Goa",
        "dest_slug": "goa",
        "month": "June",
        "score": 2,
        "reason": "Monsoon floods. Beaches closed. Shacks shut down.",
    }, out)
    if p:
        print(f"Score Reveal: {p}")

    # Test contrarian
    p = render_reel("contrarian", {
        "famous": "Manali",
        "hidden": "Tirthan Valley",
        "famous_score": 3,
        "hidden_score": 5,
        "dest_slug": "tirthan-valley",
    }, out)
    if p:
        print(f"Contrarian: {p}")

    print(f"\nAll output: {out}")
