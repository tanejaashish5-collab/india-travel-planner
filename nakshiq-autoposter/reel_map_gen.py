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

# ── Paths ────────────────────────────────────────────────────────────────
ASSETS_DIR = Path(__file__).parent / "assets"
MUSIC_DIR  = ASSETS_DIR / "yt_music"
POMELLI_DIR = Path(__file__).parent / "pomelli_library"
MANIFEST_FILE = POMELLI_DIR / "manifest.json"

# ── Output specs ─────────────────────────────────────────────────────────
REEL_W, REEL_H = 1080, 1920
REEL_FPS = 30
REEL_DURATION = 30  # seconds

# ── Music preferences per format (trendy tracks first) ──────────────────
_MUSIC_PREFS: dict[str, list[str]] = {
    "state_heatmap":  ["00_amapiano_glow", "06_sunset_gaze", "05_house_emotion", "12_epic_rise"],
    "route_trace":    ["01_lofi_rain", "09_boom_bap_chill", "15_coastal_vibes", "20_retro_drive"],
    "cluster_reveal": ["02_trap_cinema", "12_epic_rise", "32_cinematic_pulse", "28_amapiano_heat"],
    "score_pulse":    ["03_desi_bounce", "13_monsoon_pulse", "30_rajasthan_groove", "21_golden_temple"],
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
# TEXT OVERLAY — REMOVED
# ═══════════════════════════════════════════════════════════════════════════
# Pomelli images are self-contained designs with their own headlines,
# subtitles, data callouts, and NakshIQ branding baked in.
# Adding drawtext overlays on top of Ken Burns animation caused:
#   1. Text overflow (no width constraint)
#   2. Text-on-text stacking (Pomelli text + overlay text)
#   3. Triple branding (Pomelli has logo + handle + tagline)
#   4. Unreadable text during zoompan animation
# Fix: let Pomelli designs speak for themselves — no additional overlays.


# ═══════════════════════════════════════════════════════════════════════════
# CAMPAIGN-DRIVEN RENDERER (unified)
# ═══════════════════════════════════════════════════════════════════════════

def render_campaign_reel(
    campaign_name: str,
    images: list[Path],
    out_dir: Path,
    music_style: str = "state_heatmap",
) -> Optional[Path]:
    """
    Render a reel from a Pomelli campaign's images — no text overlays.
    The Pomelli designs already contain all visual content (headlines,
    subtitles, branding). We just animate them with Ken Burns + xfade.

    Args:
        campaign_name: Campaign key from manifest (used for filename)
        images: Pre-selected image paths from the campaign
        out_dir: Output directory
        music_style: Key for music preference lookup
    Returns:
        Path to output MP4, or None on failure
    """
    if not images:
        print(f"No images for campaign '{campaign_name}'")
        return None

    print(f"Rendering campaign reel: '{campaign_name}' ({len(images)} images, no text overlay)")

    music = _pick_music(music_style)
    slug = campaign_name.replace(" ", "_")[:40]
    out_path = out_dir / f"reel_pomelli_{slug}.mp4"

    # No text_overlay — Pomelli images are self-contained designs
    success = _build_multi_image_reel(images, music, out_path, text_overlay="")
    return out_path if success else None


# ═══════════════════════════════════════════════════════════════════════════
# PUBLIC API
# ═══════════════════════════════════════════════════════════════════════════

REEL_MAP_FORMATS = ["state_heatmap", "route_trace", "cluster_reveal", "score_pulse"]


def pick_campaign_with_images(
    n_images: int = 4,
    exclude_campaigns: list[str] | None = None,
) -> tuple[str, list[Path]]:
    """
    Public wrapper for campaign picking.
    Returns (campaign_name, [image_paths]).
    Called from autoposter.py so the caller controls which campaign
    is selected and can build a matching caption.
    """
    return _pick_campaign_for_reel(n_images, exclude_campaigns)


def render_reel_map(
    reel_format: str,
    data: dict,
    out_dir: Path,
) -> Optional[Path]:
    """
    Render an animated Reel using Pomelli images — campaign-driven, no text overlays.
    Returns path to the output MP4.

    The caller (autoposter.py) picks the campaign and passes it in data["campaign_name"]
    and data["campaign_images"]. This ensures the caption and video always match.

    Args:
        reel_format: One of REEL_MAP_FORMATS (used for music style selection)
        data: Must contain:
            - campaign_name: str — campaign key from manifest
            - campaign_images: list[Path] — pre-selected image paths
        out_dir: Directory for output file
    """
    campaign_name = data.get("campaign_name", "unknown")
    images = data.get("campaign_images", [])

    print(f"Rendering reel: campaign='{campaign_name}', format={reel_format}, "
          f"images={len(images)}, no text overlay (Pomelli v3)")
    out_dir.mkdir(parents=True, exist_ok=True)

    try:
        return render_campaign_reel(
            campaign_name=campaign_name,
            images=images,
            out_dir=out_dir,
            music_style=reel_format,
        )
    except Exception as e:
        print(f"Reel rendering error: {e}")
        import traceback
        traceback.print_exc()
        return None


# ═══════════════════════════════════════════════════════════════════════════
# CLI — standalone testing
# ═══════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="NakshIQ Reel Generator v3 (campaign-driven)")
    parser.add_argument("--campaign", default="",
                        help="Campaign name from manifest (empty = random)")
    parser.add_argument("--format", choices=REEL_MAP_FORMATS,
                        default="state_heatmap",
                        help="Music style to use")
    parser.add_argument("--out", default="/tmp/reel_map_test",
                        help="Output directory")
    args = parser.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    # Pick campaign
    if args.campaign:
        images = _get_campaign_images(args.campaign)
        campaign_name = args.campaign
    else:
        campaign_name, images = _pick_campaign_for_reel(n_images=4)

    if not images:
        print(f"No images found for campaign '{campaign_name}'")
        exit(1)

    print(f"Campaign: '{campaign_name}' ({len(images)} images)")

    data = {
        "campaign_name": campaign_name,
        "campaign_images": images,
    }

    result = render_reel_map(args.format, data, out_dir)
    if result:
        print(f"\nOutput: {result}")
    else:
        print("\nRendering failed")
