"""
reel_map_gen.py — NakshIQ Animated Map/Infographic Reel Generator (v2)
======================================================================
Generates 9:16 vertical Reels (1080×1920) by animating Pomelli campaign
images with Ken Burns zoompan effects + crossfade transitions + music.

Reel map formats:
  - state_heatmap:   4 Pomelli images from a campaign, Ken Burns + xfade
  - route_trace:     4 Pomelli images with slide transitions
  - cluster_reveal:  4 images from different campaigns, region-themed
  - score_pulse:     Single Pomelli image with extended Ken Burns + text overlay

Data source: pomelli_library/manifest.json (campaign images) + music tracks.
Uses ffmpeg for all video processing (available on GitHub Actions ubuntu).
"""

from __future__ import annotations

import json
import math
import os
import random
import shutil
import subprocess
import tempfile
from pathlib import Path
from typing import Optional

# ── Brand constants ──────────────────────────────────────────────────────
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

# ── Paths ────────────────────────────────────────────────────────────────
ASSETS_DIR = Path(__file__).parent / "assets"
MUSIC_DIR  = ASSETS_DIR / "music"
POMELLI_DIR = Path(__file__).parent / "pomelli_library"
MANIFEST_FILE = POMELLI_DIR / "manifest.json"
DATA_FILE = Path(__file__).parent / "map_data.json"

# ── Output specs ─────────────────────────────────────────────────────────
REEL_W, REEL_H = 1080, 1920
REEL_FPS = 30
REEL_DURATION = 12  # seconds

# ── Font paths (used in ffmpeg drawtext) ─────────────────────────────────
FONT_CRIMSON = str(FONT_DIR / "CrimsonPro-Italic.ttf") if FONT_DIR.exists() else ""
FONT_INSTRUMENT = str(FONT_DIR / "InstrumentSans-Bold.ttf") if FONT_DIR.exists() else ""
FONT_JETBRAINS = str(FONT_DIR / "JetBrainsMono-Bold.ttf") if FONT_DIR.exists() else ""

# ── Music preferences per format (trendy tracks first) ──────────────────
_MUSIC_PREFS: dict[str, list[str]] = {
    "state_heatmap":  ["amapiano_sun", "golden_hour", "melodic_house", "cinematic_warm"],
    "route_trace":    ["lofi_wanderer", "chill_hop", "coastal_breeze", "travel_pulse"],
    "cluster_reveal": ["cinematic_trap", "epic_journey", "horizon_swell", "amapiano_sun"],
    "score_pulse":    ["desi_future", "monsoon_groove", "mystic_india", "golden_hour"],
}

# ── Zoompan variations for visual variety ────────────────────────────────
# Each is (zoom_expr, x_expr, y_expr) for ffmpeg zoompan filter
_ZOOMPAN_STYLES = [
    # Zoom in center
    ("min(1.12,1+0.0004*on)", "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"),
    # Zoom out center
    ("1.12-0.0004*on", "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"),
    # Zoom in + pan right
    ("min(1.12,1+0.0004*on)", "iw/4+(iw/4*on/FRAMES)", "ih/2-(ih/zoom/2)"),
    # Zoom in + pan left
    ("min(1.12,1+0.0004*on)", "iw/2-(iw/4*on/FRAMES)", "ih/2-(ih/zoom/2)"),
    # Zoom out + pan down
    ("1.12-0.0004*on", "iw/2-(iw/zoom/2)", "ih/4+(ih/6*on/FRAMES)"),
    # Zoom in + pan up
    ("min(1.12,1+0.0004*on)", "iw/2-(iw/zoom/2)", "ih/3-(ih/6*on/FRAMES)"),
]

# ── Crossfade transition types ───────────────────────────────────────────
_XFADE_TRANSITIONS = [
    "fadeblack", "fadewhite", "dissolve", "slideleft", "slideright",
    "slideup", "slidedown", "wipeleft", "wiperight",
]


# ═══════════════════════════════════════════════════════════════════════════
# POMELLI IMAGE SELECTION
# ═══════════════════════════════════════════════════════════════════════════

def _load_manifest() -> dict:
    """Load the Pomelli manifest."""
    if not MANIFEST_FILE.exists():
        return {}
    try:
        with open(MANIFEST_FILE) as f:
            return json.load(f)
    except Exception:
        return {}


def _get_campaign_images(campaign_name: str) -> list[Path]:
    """Get all valid image paths for a campaign."""
    manifest = _load_manifest()
    campaigns = manifest.get("campaigns", {})
    images = campaigns.get(campaign_name, [])
    paths = []
    for img_name in images:
        p = POMELLI_DIR / img_name
        if p.exists():
            paths.append(p)
    return paths


def _pick_campaign_for_reel(n_images: int = 4,
                            exclude_campaigns: list[str] | None = None
                            ) -> tuple[str, list[Path]]:
    """
    Pick a Pomelli campaign with at least n_images images.
    Returns (campaign_name, [image_paths]).
    """
    manifest = _load_manifest()
    campaigns = manifest.get("campaigns", {})
    exclude = set(exclude_campaigns or [])

    # Prefer campaigns with exactly the right number of images
    candidates = []
    for name, images in campaigns.items():
        if name in exclude:
            continue
        valid = [POMELLI_DIR / img for img in images
                 if (POMELLI_DIR / img).exists()]
        if len(valid) >= n_images:
            candidates.append((name, valid[:n_images]))

    if not candidates:
        # Fallback: any campaign with at least 2 images
        for name, images in campaigns.items():
            if name in exclude:
                continue
            valid = [POMELLI_DIR / img for img in images
                     if (POMELLI_DIR / img).exists()]
            if len(valid) >= 2:
                candidates.append((name, valid))

    if not candidates:
        return ("", [])

    choice = random.choice(candidates)
    return choice


def _pick_multi_campaign_images(n_images: int = 4) -> list[Path]:
    """
    Pick images from DIFFERENT campaigns for variety (used for cluster_reveal).
    Returns n_images paths from different campaigns.
    """
    manifest = _load_manifest()
    campaigns = manifest.get("campaigns", {})

    # Collect one representative image per campaign
    pool = []
    for name, images in campaigns.items():
        valid = [POMELLI_DIR / img for img in images
                 if (POMELLI_DIR / img).exists()]
        if valid:
            # Pick the first image (usually the "hero" slide)
            pool.append(valid[0])

    if len(pool) < n_images:
        return pool

    return random.sample(pool, n_images)


# ═══════════════════════════════════════════════════════════════════════════
# MUSIC SELECTION
# ═══════════════════════════════════════════════════════════════════════════

def _pick_music(reel_format: str) -> Optional[Path]:
    """Pick a background music track for a reel-map format."""
    if not MUSIC_DIR.exists():
        return None
    all_tracks = list(MUSIC_DIR.glob("*.wav"))
    if not all_tracks:
        return None

    prefs = _MUSIC_PREFS.get(reel_format, [])
    for name in prefs:
        p = MUSIC_DIR / f"{name}.wav"
        if p.exists():
            return p
    return random.choice(all_tracks)


# ═══════════════════════════════════════════════════════════════════════════
# FFMPEG HELPERS
# ═══════════════════════════════════════════════════════════════════════════

def _find_ffmpeg() -> str:
    """Find the ffmpeg binary."""
    ffmpeg_bin = shutil.which("ffmpeg")
    if not ffmpeg_bin:
        for candidate in ["/usr/bin/ffmpeg", "/usr/local/bin/ffmpeg"]:
            if os.path.isfile(candidate):
                ffmpeg_bin = candidate
                break
    return ffmpeg_bin or "ffmpeg"


def _build_drawtext(text: str, font_path: str, size: int,
                    color: str, x: str, y: str,
                    enable: str = "", border_w: int = 2) -> str:
    """Build an ffmpeg drawtext filter expression."""
    # Escape special chars for ffmpeg
    safe_text = (text.replace("'", "'\\''")
                     .replace(":", "\\:")
                     .replace("%", "%%"))
    parts = [
        f"drawtext=text='{safe_text}'",
        f"fontfile='{font_path}'" if font_path else "",
        f"fontsize={size}",
        f"fontcolor={color}",
        f"x={x}", f"y={y}",
        f"borderw={border_w}" if border_w else "",
        f"bordercolor=black@0.6" if border_w else "",
    ]
    if enable:
        safe_enable = enable.replace(",", "\\,")
        parts.append(f"enable='{safe_enable}'")
    return ":".join(p for p in parts if p)


# ═══════════════════════════════════════════════════════════════════════════
# MULTI-IMAGE REEL BUILDER (core engine)
# ═══════════════════════════════════════════════════════════════════════════

def _build_multi_image_reel(
    images: list[Path],
    music_path: Optional[Path],
    out_path: Path,
    text_overlay: str = "",
    segment_duration: float = 0,
    xfade_duration: float = 0.5,
) -> bool:
    """
    Build a reel from multiple Pomelli images with Ken Burns zoompan + xfade.

    Args:
        images: List of image paths (2-6 images)
        music_path: Background music WAV
        out_path: Output MP4 path
        text_overlay: Optional ffmpeg drawtext filter chain to overlay on final video
        segment_duration: Duration per image segment (0 = auto-calculate)
        xfade_duration: Crossfade duration between segments
    """
    n = len(images)
    if n < 1:
        return False

    ffmpeg_bin = _find_ffmpeg()

    # Single image → simple Ken Burns
    if n == 1:
        return _build_single_image_reel(images[0], music_path, out_path, text_overlay)

    # Calculate segment durations
    if segment_duration <= 0:
        # Total time = n * seg - (n-1) * xfade
        # Solve: REEL_DURATION = n * seg - (n-1) * xfade
        segment_duration = (REEL_DURATION + (n - 1) * xfade_duration) / n

    frames_per_segment = int(segment_duration * REEL_FPS)

    # Build ffmpeg command
    cmd = [ffmpeg_bin, "-y"]

    # Input images (each looped for segment_duration)
    for img in images:
        cmd.extend(["-loop", "1", "-t", f"{segment_duration:.2f}", "-i", str(img)])

    # Add music input
    if music_path and music_path.exists():
        cmd.extend(["-i", str(music_path)])
        music_input_idx = n
    else:
        music_input_idx = None

    # Build filter complex
    filter_parts = []

    # Apply zoompan to each image input
    styles = random.sample(range(len(_ZOOMPAN_STYLES)),
                           min(n, len(_ZOOMPAN_STYLES)))
    while len(styles) < n:
        styles.append(random.randint(0, len(_ZOOMPAN_STYLES) - 1))

    for i in range(n):
        z_expr, x_expr, y_expr = _ZOOMPAN_STYLES[styles[i]]
        # Replace FRAMES placeholder
        z_expr = z_expr.replace("FRAMES", str(frames_per_segment))
        x_expr = x_expr.replace("FRAMES", str(frames_per_segment))
        y_expr = y_expr.replace("FRAMES", str(frames_per_segment))

        filter_parts.append(
            f"[{i}:v]scale=1188:2112:flags=lanczos,"
            f"zoompan=z='{z_expr}':x='{x_expr}':y='{y_expr}'"
            f":d={frames_per_segment}:s={REEL_W}x{REEL_H}:fps={REEL_FPS},"
            f"setsar=1[v{i}]"
        )

    # Chain xfade transitions
    if n == 2:
        transition = random.choice(_XFADE_TRANSITIONS)
        offset = segment_duration - xfade_duration
        filter_parts.append(
            f"[v0][v1]xfade=transition={transition}"
            f":duration={xfade_duration}:offset={offset:.2f}[vfinal]"
        )
    else:
        # Chain: v0+v1 → x01, x01+v2 → x02, etc.
        prev_label = "v0"
        for i in range(1, n):
            transition = random.choice(_XFADE_TRANSITIONS)
            # Offset accumulates: each segment adds (seg_dur - xfade_dur) to timeline
            offset = segment_duration - xfade_duration + (i - 1) * (segment_duration - xfade_duration)
            out_label = "vfinal" if i == n - 1 else f"x{i:02d}"
            filter_parts.append(
                f"[{prev_label}][v{i}]xfade=transition={transition}"
                f":duration={xfade_duration}:offset={offset:.2f}[{out_label}]"
            )
            prev_label = out_label

    # Apply text overlay if provided
    if text_overlay:
        filter_parts.append(f"[vfinal]{text_overlay}[vout]")
        video_label = "[vout]"
    else:
        video_label = "[vfinal]"

    # Audio filter
    if music_input_idx is not None:
        filter_parts.append(
            f"[{music_input_idx}:a]atrim=0:{REEL_DURATION},"
            f"afade=t=in:st=0:d=1,"
            f"afade=t=out:st={REEL_DURATION - 2}:d=2,"
            f"volume=0.40[aout]"
        )

    filter_complex = ";\n".join(filter_parts)
    cmd.extend(["-filter_complex", filter_complex])

    # Map outputs
    cmd.extend(["-map", video_label])
    if music_input_idx is not None:
        cmd.extend(["-map", "[aout]"])

    # Encoding
    cmd.extend([
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-pix_fmt", "yuv420p", "-r", str(REEL_FPS),
        "-c:a", "aac", "-b:a", "128k",
        "-t", str(REEL_DURATION),
        str(out_path),
    ])

    print(f"Building multi-image reel: {n} images → {out_path.name}")
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=180)

    if result.returncode != 0:
        print(f"ffmpeg FAILED (rc={result.returncode}):")
        print(result.stderr[-800:] if result.stderr else "no stderr")
        return False

    if out_path.exists():
        print(f"Reel assembled: {out_path.name} ({out_path.stat().st_size // 1024} KB)")
        return True
    return False


def _build_single_image_reel(
    image: Path,
    music_path: Optional[Path],
    out_path: Path,
    text_overlay: str = "",
) -> bool:
    """Build a reel from a single Pomelli image with Ken Burns zoom."""
    ffmpeg_bin = _find_ffmpeg()
    total_frames = REEL_FPS * REEL_DURATION

    # Pick a random zoompan style
    z_expr, x_expr, y_expr = random.choice(_ZOOMPAN_STYLES)
    z_expr = z_expr.replace("FRAMES", str(total_frames))
    x_expr = x_expr.replace("FRAMES", str(total_frames))
    y_expr = y_expr.replace("FRAMES", str(total_frames))

    # Dark overlay + text overlay
    filters = (
        f"[0:v]scale=1188:2112:flags=lanczos,"
        f"zoompan=z='{z_expr}':x='{x_expr}':y='{y_expr}'"
        f":d={total_frames}:s={REEL_W}x{REEL_H}:fps={REEL_FPS},"
        f"setsar=1"
    )
    if text_overlay:
        filters += f",{text_overlay}"
    filters += "[vout]"

    # Audio
    has_music = music_path is not None and music_path.exists()
    if has_music:
        audio_filter = (
            f"[1:a]atrim=0:{REEL_DURATION},"
            f"afade=t=in:st=0:d=1,"
            f"afade=t=out:st={REEL_DURATION - 2}:d=2,"
            f"volume=0.40[aout]"
        )
        filter_complex = f"{filters};{audio_filter}"
    else:
        filter_complex = filters

    cmd = [ffmpeg_bin, "-y", "-loop", "1", "-i", str(image)]
    if has_music:
        cmd.extend(["-i", str(music_path)])

    cmd.extend([
        "-filter_complex", filter_complex,
        "-map", "[vout]",
    ])
    if has_music:
        cmd.extend(["-map", "[aout]"])

    cmd.extend([
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-pix_fmt", "yuv420p", "-r", str(REEL_FPS),
        "-c:a", "aac", "-b:a", "128k",
        "-t", str(REEL_DURATION),
        str(out_path),
    ])

    print(f"Building single-image reel: {image.name} → {out_path.name}")
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)

    if result.returncode != 0:
        print(f"ffmpeg FAILED (rc={result.returncode}):")
        print(result.stderr[-500:] if result.stderr else "no stderr")
        return False

    if out_path.exists():
        print(f"Reel assembled: {out_path.name} ({out_path.stat().st_size // 1024} KB)")
        return True
    return False


# ═══════════════════════════════════════════════════════════════════════════
# TEXT OVERLAY BUILDERS (format-specific)
# ═══════════════════════════════════════════════════════════════════════════

def _build_heatmap_overlay(state_name: str) -> str:
    """Text overlay for state_heatmap format."""
    import calendar
    from datetime import datetime
    month = calendar.month_name[datetime.now().month].upper()

    parts = []
    # Dark semi-transparent bars for text readability
    parts.append("drawbox=x=0:y=0:w=iw:h=200:color=black@0.5:t=fill")
    parts.append("drawbox=x=0:y=ih-180:w=iw:h=180:color=0x161614@0.85:t=fill")

    # Top: State name + month
    parts.append(_build_drawtext(
        state_name.upper(), FONT_INSTRUMENT, 52,
        BONE, "(w-text_w)/2", "40",
        border_w=3
    ))
    parts.append(_build_drawtext(
        f"DESTINATION SCORES — {month}", FONT_INSTRUMENT, 28,
        SAFFRON, "(w-text_w)/2", "105",
        border_w=2
    ))
    parts.append(_build_drawtext(
        f"Swipe for details", FONT_CRIMSON, 24,
        BONE, "(w-text_w)/2", "145",
        enable="gte(t,8)", border_w=1
    ))

    # Bottom branding
    parts.append(_build_drawtext("NAKSHIQ", FONT_INSTRUMENT, 32,
                                  BONE, "40", "h-140", border_w=0))
    parts.append(_build_drawtext("Travel with IQ", FONT_CRIMSON, 26,
                                  SAFFRON, "40", "h-100", border_w=0))
    parts.append(_build_drawtext("nakshiq.com", FONT_INSTRUMENT, 22,
                                  BONE, "w-240", "h-120", border_w=0))

    return ",".join(parts)


def _build_route_overlay(state_name: str) -> str:
    """Text overlay for route_trace format."""
    parts = []
    parts.append("drawbox=x=0:y=0:w=iw:h=200:color=black@0.5:t=fill")
    parts.append("drawbox=x=0:y=ih-180:w=iw:h=180:color=0x161614@0.85:t=fill")

    parts.append(_build_drawtext(
        f"{state_name.upper()} ROUTE", FONT_INSTRUMENT, 48,
        BONE, "(w-text_w)/2", "40",
        border_w=3
    ))
    parts.append(_build_drawtext(
        "TOP DESTINATIONS CONNECTED", FONT_INSTRUMENT, 26,
        SAFFRON, "(w-text_w)/2", "100",
        border_w=2
    ))
    parts.append(_build_drawtext(
        "Plan your route at nakshiq.com", FONT_CRIMSON, 24,
        BONE, "(w-text_w)/2", "145",
        enable="gte(t,8)", border_w=1
    ))

    # Bottom branding
    parts.append(_build_drawtext("NAKSHIQ", FONT_INSTRUMENT, 32,
                                  BONE, "40", "h-140", border_w=0))
    parts.append(_build_drawtext("Travel with IQ", FONT_CRIMSON, 26,
                                  SAFFRON, "40", "h-100", border_w=0))
    parts.append(_build_drawtext("nakshiq.com", FONT_INSTRUMENT, 22,
                                  BONE, "w-240", "h-120", border_w=0))

    return ",".join(parts)


def _build_cluster_overlay() -> str:
    """Text overlay for cluster_reveal format."""
    import calendar
    from datetime import datetime
    month = calendar.month_name[datetime.now().month].upper()

    parts = []
    parts.append("drawbox=x=0:y=0:w=iw:h=220:color=black@0.5:t=fill")
    parts.append("drawbox=x=0:y=ih-180:w=iw:h=180:color=0x161614@0.85:t=fill")

    parts.append(_build_drawtext(
        "INDIA", FONT_INSTRUMENT, 56,
        BONE, "(w-text_w)/2", "30",
        border_w=3
    ))
    parts.append(_build_drawtext(
        f"DESTINATION SCORES — {month}", FONT_INSTRUMENT, 28,
        SAFFRON, "(w-text_w)/2", "100",
        border_w=2
    ))
    parts.append(_build_drawtext(
        "Every region. Every month.", FONT_CRIMSON, 24,
        BONE, "(w-text_w)/2", "145",
        border_w=1
    ))
    parts.append(_build_drawtext(
        "Explore all scores at nakshiq.com", FONT_CRIMSON, 24,
        BONE, "(w-text_w)/2", "175",
        enable="gte(t,8)", border_w=1
    ))

    # Bottom branding
    parts.append(_build_drawtext("NAKSHIQ", FONT_INSTRUMENT, 32,
                                  BONE, "40", "h-140", border_w=0))
    parts.append(_build_drawtext("Travel with IQ", FONT_CRIMSON, 26,
                                  SAFFRON, "40", "h-100", border_w=0))
    parts.append(_build_drawtext("nakshiq.com", FONT_INSTRUMENT, 22,
                                  BONE, "w-240", "h-120", border_w=0))

    return ",".join(parts)


def _build_pulse_overlay(dest_name: str, score: int,
                         state_name: str = "", tagline: str = "") -> str:
    """Text overlay for score_pulse format."""
    score_color = VERMILLION_BRIGHT if score <= 2 else SAFFRON if score == 3 else "#4CAF50"

    parts = []
    # Dark overlay for readability
    parts.append("drawbox=x=0:y=0:w=iw:h=ih:color=black@0.25:t=fill")
    parts.append("drawbox=x=0:y=ih-180:w=iw:h=180:color=0x161614@0.85:t=fill")

    # "DISCOVER" teaser (0-2s)
    parts.append(_build_drawtext(
        "DISCOVER", FONT_INSTRUMENT, 40,
        SAFFRON, "(w-text_w)/2", "h*0.28",
        enable="between(t,0.3,5)", border_w=2
    ))

    # Destination name (appear at 1s)
    parts.append(_build_drawtext(
        dest_name.upper(), FONT_INSTRUMENT, 72,
        BONE, "(w-text_w)/2", "h*0.35",
        enable="gte(t,1)", border_w=4
    ))

    # State name (appear at 1.5s)
    if state_name:
        parts.append(_build_drawtext(
            state_name.upper(), FONT_CRIMSON, 34,
            BONE, "(w-text_w)/2", "h*0.43",
            enable="gte(t,1.5)", border_w=2
        ))

    # Score (appear at 4s)
    parts.append(_build_drawtext(
        f"{score}/5", FONT_JETBRAINS, 120,
        score_color, "(w-text_w)/2", "h*0.52",
        enable="gte(t,4)", border_w=5
    ))

    # "NAKSHIQ SCORE" label
    parts.append(_build_drawtext(
        "NAKSHIQ SCORE", FONT_INSTRUMENT, 24,
        BONE, "(w-text_w)/2", "h*0.62",
        enable="gte(t,4.5)", border_w=1
    ))

    # Tagline (appear at 5.5s)
    if tagline:
        tag = tagline[:70] + ("..." if len(tagline) > 70 else "")
        words = tag.split()
        mid = len(words) // 2
        t1 = " ".join(words[:mid])
        t2 = " ".join(words[mid:])
        parts.append(_build_drawtext(
            t1, FONT_CRIMSON, 30,
            BONE, "(w-text_w)/2", "h*0.68",
            enable="gte(t,5.5)", border_w=2
        ))
        if t2:
            parts.append(_build_drawtext(
                t2, FONT_CRIMSON, 30,
                BONE, "(w-text_w)/2", "h*0.72",
                enable="gte(t,5.5)", border_w=2
            ))

    # CTA (8s+)
    parts.append(
        "drawbox=x=(w-480)/2:y=h*0.78:w=480:h=60"
        ":color=0xE55642:t=fill:enable='gte(t\\,8)'"
    )
    parts.append(_build_drawtext(
        "Plan on nakshiq.com", FONT_INSTRUMENT, 28,
        BONE, "(w-text_w)/2", "h*0.79",
        enable="gte(t,8)", border_w=0
    ))

    # Bottom branding
    parts.append(_build_drawtext("NAKSHIQ", FONT_INSTRUMENT, 32,
                                  BONE, "40", "h-140", border_w=0))
    parts.append(_build_drawtext("Travel with IQ", FONT_CRIMSON, 26,
                                  SAFFRON, "40", "h-100", border_w=0))
    parts.append(_build_drawtext("nakshiq.com", FONT_INSTRUMENT, 22,
                                  BONE, "w-240", "h-120", border_w=0))

    return ",".join(parts)


# ═══════════════════════════════════════════════════════════════════════════
# FORMAT RENDERERS
# ═══════════════════════════════════════════════════════════════════════════

def _render_state_heatmap(data: dict, out_dir: Path) -> Optional[Path]:
    """
    State Heatmap: 4 Pomelli images from a campaign with Ken Burns + xfade.
    Text overlay shows state name + month + branding.
    """
    state_name = data.get("state_data", {}).get("name", "India")
    slug = data.get("slug", "map")

    campaign_name, images = _pick_campaign_for_reel(n_images=4)
    if not images:
        print("No Pomelli campaign with 4 images found.")
        return None

    print(f"Using campaign: '{campaign_name}' ({len(images)} images)")

    music = _pick_music("state_heatmap")
    overlay = _build_heatmap_overlay(state_name)
    out_path = out_dir / f"reel_map_state_heatmap_{slug}.mp4"

    success = _build_multi_image_reel(images, music, out_path, text_overlay=overlay)
    return out_path if success else None


def _render_route_trace(data: dict, out_dir: Path) -> Optional[Path]:
    """
    Route Trace: 4 Pomelli images with slide transitions.
    Text overlay shows state route + branding.
    """
    state_name = data.get("state_data", {}).get("name", "India")
    slug = data.get("slug", "route")

    campaign_name, images = _pick_campaign_for_reel(n_images=4)
    if not images:
        print("No Pomelli campaign with 4 images found.")
        return None

    print(f"Using campaign: '{campaign_name}' ({len(images)} images)")

    music = _pick_music("route_trace")
    overlay = _build_route_overlay(state_name)
    out_path = out_dir / f"reel_map_route_trace_{slug}.mp4"

    success = _build_multi_image_reel(images, music, out_path, text_overlay=overlay)
    return out_path if success else None


def _render_cluster_reveal(data: dict, out_dir: Path) -> Optional[Path]:
    """
    Cluster Reveal: Images from different campaigns for region diversity.
    Text overlay shows India-wide title + branding.
    """
    slug = data.get("slug", "india")

    images = _pick_multi_campaign_images(n_images=4)
    if len(images) < 2:
        print("Not enough Pomelli images across campaigns.")
        return None

    print(f"Using {len(images)} images from different campaigns")

    music = _pick_music("cluster_reveal")
    overlay = _build_cluster_overlay()
    out_path = out_dir / f"reel_map_cluster_reveal_{slug}.mp4"

    success = _build_multi_image_reel(images, music, out_path, text_overlay=overlay)
    return out_path if success else None


def _render_score_pulse(data: dict, out_dir: Path) -> Optional[Path]:
    """
    Score Pulse: Single Pomelli image with extended Ken Burns + score overlay.
    Picks the best matching Pomelli image for the destination.
    """
    dest_data = data.get("dest_data", {})
    dest_name = dest_data.get("name", "Unknown")
    score = int(dest_data.get("score", 4))
    state_name = dest_data.get("state", "")
    tagline = dest_data.get("tagline") or dest_data.get("note") or ""
    slug = data.get("slug", "pulse")

    # Try to find a Pomelli campaign matching the destination name
    manifest = _load_manifest()
    campaigns = manifest.get("campaigns", {})
    image = None

    # Search for campaign name containing destination keywords
    dest_lower = dest_name.lower()
    for name, imgs in campaigns.items():
        if any(word in name.lower() for word in dest_lower.split() if len(word) > 3):
            valid = [POMELLI_DIR / i for i in imgs if (POMELLI_DIR / i).exists()]
            if valid:
                image = valid[0]
                print(f"Matched Pomelli campaign: '{name}' for {dest_name}")
                break

    # Fallback: random campaign hero image
    if image is None:
        _, imgs = _pick_campaign_for_reel(n_images=1)
        if imgs:
            image = imgs[0]
        else:
            print("No Pomelli images available for score_pulse.")
            return None

    music = _pick_music("score_pulse")
    overlay = _build_pulse_overlay(dest_name, score, state_name, tagline)
    out_path = out_dir / f"reel_map_score_pulse_{slug}.mp4"

    success = _build_single_image_reel(image, music, out_path, text_overlay=overlay)
    return out_path if success else None


# ═══════════════════════════════════════════════════════════════════════════
# PUBLIC API
# ═══════════════════════════════════════════════════════════════════════════

REEL_MAP_FORMATS = ["state_heatmap", "route_trace", "cluster_reveal", "score_pulse"]


def render_reel_map(
    reel_format: str,
    data: dict,
    out_dir: Path,
) -> Optional[Path]:
    """
    Render an animated map/infographic Reel using Pomelli images.
    Returns path to the output MP4.

    Args:
        reel_format: One of REEL_MAP_FORMATS
        data: Format-specific data dict (same interface as v1):
            - state_heatmap: {state_code, state_data, destinations}
            - route_trace:   {state_code, state_data, destinations}
            - cluster_reveal: {map_data, destinations}
            - score_pulse:   {dest_data, state_data}
        out_dir: Directory for output file
    """
    print(f"Rendering reel-map format: {reel_format} (Pomelli v2)")
    out_dir.mkdir(parents=True, exist_ok=True)

    try:
        if reel_format == "state_heatmap":
            return _render_state_heatmap(data, out_dir)
        elif reel_format == "route_trace":
            return _render_route_trace(data, out_dir)
        elif reel_format == "cluster_reveal":
            return _render_cluster_reveal(data, out_dir)
        elif reel_format == "score_pulse":
            return _render_score_pulse(data, out_dir)
        else:
            print(f"Unknown reel-map format: {reel_format}")
            return None
    except Exception as e:
        print(f"Reel-map rendering error: {e}")
        import traceback
        traceback.print_exc()
        return None


# ═══════════════════════════════════════════════════════════════════════════
# CLI — standalone testing
# ═══════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="NakshIQ Reel Map Generator v2")
    parser.add_argument("--format", choices=REEL_MAP_FORMATS,
                        default="state_heatmap",
                        help="Reel map format to render")
    parser.add_argument("--state", default="HP",
                        help="State code (for state_heatmap / route_trace)")
    parser.add_argument("--out", default="/tmp/reel_map_test",
                        help="Output directory")
    args = parser.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    # Load map data for CLI testing
    map_data = {}
    if DATA_FILE.exists():
        with open(DATA_FILE) as f:
            map_data = json.load(f)

    state_data = None
    for s in map_data.get("states", []):
        if s.get("short_code") == args.state:
            state_data = s
            break

    # Build test data
    if args.format in ("state_heatmap", "route_trace"):
        if not state_data:
            print(f"No state data for {args.state}")
            exit(1)
        data = {
            "state_code": args.state,
            "state_data": state_data,
            "destinations": [],
            "slug": args.state.lower(),
        }
    elif args.format == "cluster_reveal":
        data = {"map_data": map_data, "destinations": [], "slug": "india"}
    elif args.format == "score_pulse":
        data = {
            "dest_data": {"name": "Shimla", "score": 4, "state": "Himachal Pradesh",
                          "tagline": "Colonial charm meets Himalayan views"},
            "state_data": state_data,
            "slug": "shimla",
        }
    else:
        print(f"Unknown format: {args.format}")
        exit(1)

    result = render_reel_map(args.format, data, out_dir)
    if result:
        print(f"\nOutput: {result}")
    else:
        print("\nRendering failed")
