"""
reel_map_gen.py — NakshIQ Animated Map Reel Generator
======================================================
Generates 9:16 vertical Reels (1080×1920) with animated map sequences:
  1. PIL-rendered map frames (state boundaries, destinations, scores)
  2. ffmpeg compositing into MP4 with music
  3. NakshIQ branding overlay

Reel map formats:
  - state_heatmap:   State map with destinations appearing by score (red→green)
  - route_trace:     Animated line tracing between destinations with data cards
  - cluster_reveal:  India-wide view with destination clusters appearing by region
  - score_pulse:     Single destination zoom with pulsing score ring + data overlay

Data source: map_data.json (boundaries, landmarks, rivers) + NakshIQ API (scores).
Uses ffmpeg for video assembly (available on GitHub Actions ubuntu).
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

from PIL import Image, ImageDraw, ImageFont

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
DATA_FILE  = Path(__file__).parent / "map_data.json"

# ── Output specs ─────────────────────────────────────────────────────────
REEL_W, REEL_H = 1080, 1920
REEL_FPS = 30
REEL_DURATION = 12  # seconds — slightly longer for map animations

# ── Color palette (RGB tuples for PIL) ───────────────────────────────────
C_BG          = (22, 22, 20)       # INK_DEEP
C_BG_SUBTLE   = (30, 30, 28)       # state polygon fill
C_BONE        = (245, 241, 232)
C_BONE_DIM    = (200, 196, 186)
C_VERMILLION  = (229, 86, 66)
C_VERM_DEEP   = (196, 62, 45)
C_SAFFRON     = (212, 136, 58)
C_SAGE        = (92, 107, 90)
C_GREEN       = (76, 175, 80)
C_TEAL        = (0, 150, 136)
C_DARK_OVERLAY = (16, 16, 14)

# Score → color mapping
SCORE_COLORS = {
    1: (229, 86, 66),     # Vermillion — bad
    2: (212, 100, 70),    # Red-orange
    3: (212, 136, 58),    # Saffron — mid
    4: (120, 160, 80),    # Olive-green — good
    5: (76, 175, 80),     # Green — great
}

# ── Music preferences per format ─────────────────────────────────────────
_MUSIC_PREFS: dict[str, list[str]] = {
    "state_heatmap":  ["cinematic_warm", "horizon_swell"],
    "route_trace":    ["travel_pulse", "horizon_swell"],
    "cluster_reveal": ["horizon_swell", "cinematic_warm"],
    "score_pulse":    ["mystic_india", "ambient_drift"],
}


# ═══════════════════════════════════════════════════════════════════════════
# FONT LOADING
# ═══════════════════════════════════════════════════════════════════════════

_font_cache: dict[str, ImageFont.FreeTypeFont] = {}


def _load_font(name: str, size: int) -> ImageFont.FreeTypeFont:
    """Load a font from the assets/fonts directory with caching."""
    key = f"{name}_{size}"
    if key in _font_cache:
        return _font_cache[key]

    font_map = {
        "crimson":    "CrimsonPro-Italic.ttf",
        "instrument": "InstrumentSans-Bold.ttf",
        "jetbrains":  "JetBrainsMono-Bold.ttf",
    }
    filename = font_map.get(name, f"{name}.ttf")
    path = FONT_DIR / filename

    try:
        font = ImageFont.truetype(str(path), size)
    except (OSError, IOError):
        # Fallback to system fonts
        for fallback in ["DejaVuSans-Bold.ttf", "LiberationSans-Bold.ttf"]:
            try:
                font = ImageFont.truetype(fallback, size)
                break
            except (OSError, IOError):
                continue
        else:
            font = ImageFont.load_default()

    _font_cache[key] = font
    return font


# ═══════════════════════════════════════════════════════════════════════════
# MAP DATA LOADING
# ═══════════════════════════════════════════════════════════════════════════

def _load_map_data() -> dict:
    """Load map_data.json."""
    if not DATA_FILE.exists():
        return {}
    with open(DATA_FILE) as f:
        return json.load(f)


def _get_state_data(map_data: dict, state_code: str) -> Optional[dict]:
    """Get state data by short code (e.g., 'HP', 'RJ')."""
    for state in map_data.get("states", []):
        if state.get("short_code") == state_code:
            return state
    return None


def _get_all_state_codes(map_data: dict) -> list[str]:
    """Return all available state codes."""
    return [s["short_code"] for s in map_data.get("states", [])
            if "short_code" in s]


# ═══════════════════════════════════════════════════════════════════════════
# COORDINATE PROJECTION
# ═══════════════════════════════════════════════════════════════════════════

def _project_coords(
    lat: float, lng: float,
    bounds: dict,  # {"min_lat", "max_lat", "min_lng", "max_lng"}
    canvas_rect: tuple[int, int, int, int],  # (x, y, w, h) — drawing area
    padding: int = 40,
) -> tuple[int, int]:
    """Project lat/lng to pixel coordinates within the canvas rect."""
    x0, y0, w, h = canvas_rect
    lat_range = bounds["max_lat"] - bounds["min_lat"]
    lng_range = bounds["max_lng"] - bounds["min_lng"]

    if lat_range == 0 or lng_range == 0:
        return (x0 + w // 2, y0 + h // 2)

    # Aspect ratio correction — keep map proportional
    map_aspect = lng_range / lat_range
    canvas_aspect = (w - 2 * padding) / (h - 2 * padding)

    if map_aspect > canvas_aspect:
        # Map is wider → pad top/bottom
        eff_w = w - 2 * padding
        eff_h = int(eff_w / map_aspect)
        x_off = x0 + padding
        y_off = y0 + (h - eff_h) // 2
    else:
        # Map is taller → pad left/right
        eff_h = h - 2 * padding
        eff_w = int(eff_h * map_aspect)
        x_off = x0 + (w - eff_w) // 2
        y_off = y0 + padding

    px = x_off + int((lng - bounds["min_lng"]) / lng_range * eff_w)
    py = y_off + int((bounds["max_lat"] - lat) / lat_range * eff_h)
    return (px, py)


def _compute_bounds(boundary: list[list[float]], pad: float = 0.3) -> dict:
    """Compute bounding box from boundary coordinates with padding."""
    lats = [p[0] for p in boundary]
    lngs = [p[1] for p in boundary]
    lat_range = max(lats) - min(lats)
    lng_range = max(lngs) - min(lngs)
    return {
        "min_lat": min(lats) - lat_range * pad,
        "max_lat": max(lats) + lat_range * pad,
        "min_lng": min(lngs) - lng_range * pad,
        "max_lng": max(lngs) + lng_range * pad,
    }


# ═══════════════════════════════════════════════════════════════════════════
# DRAWING HELPERS
# ═══════════════════════════════════════════════════════════════════════════

def _draw_state_boundary(draw: ImageDraw.Draw, boundary: list, bounds: dict,
                         canvas_rect: tuple, fill: tuple = None,
                         outline: tuple = C_BONE_DIM, width: int = 2):
    """Draw a state boundary polygon."""
    points = [_project_coords(p[0], p[1], bounds, canvas_rect)
              for p in boundary]
    if fill:
        draw.polygon(points, fill=fill, outline=outline, width=width)
    else:
        draw.polygon(points, outline=outline, width=width)


def _draw_dot(draw: ImageDraw.Draw, x: int, y: int, radius: int,
              color: tuple, outline: tuple = None):
    """Draw a filled circle."""
    draw.ellipse(
        [x - radius, y - radius, x + radius, y + radius],
        fill=color, outline=outline, width=2 if outline else 0
    )


def _draw_score_ring(draw: ImageDraw.Draw, x: int, y: int,
                     radius: int, score: int, progress: float = 1.0):
    """Draw a score indicator ring (arc proportional to score/5)."""
    color = SCORE_COLORS.get(score, C_SAFFRON)
    # Background ring (dim)
    draw.arc([x - radius, y - radius, x + radius, y + radius],
             0, 360, fill=(*color[:3], 60) if len(color) == 4 else (60, 60, 58),
             width=4)
    # Score arc (bright)
    arc_end = int(360 * (score / 5) * progress)
    if arc_end > 0:
        draw.arc([x - radius, y - radius, x + radius, y + radius],
                 -90, -90 + arc_end, fill=color, width=6)


def _draw_data_card(img: Image.Image, x: int, y: int,
                    name: str, score: int, detail: str = "",
                    alpha: float = 1.0):
    """Draw a floating data card with destination info."""
    draw = ImageDraw.Draw(img)
    font_name = _load_font("instrument", 28)
    font_score = _load_font("jetbrains", 36)
    font_detail = _load_font("crimson", 22)

    card_w, card_h = 320, 110
    if detail:
        card_h = 140

    # Card background (semi-transparent dark)
    card_bg = Image.new("RGBA", (card_w, card_h), (*C_DARK_OVERLAY, int(220 * alpha)))
    # Border
    card_draw = ImageDraw.Draw(card_bg)
    card_draw.rectangle([0, 0, card_w - 1, card_h - 1],
                        outline=(*SCORE_COLORS.get(score, C_SAFFRON), int(180 * alpha)),
                        width=2)

    # Name
    card_draw.text((16, 12), name.upper(),
                   fill=(*C_BONE, int(255 * alpha)),
                   font=font_name)

    # Score
    score_color = SCORE_COLORS.get(score, C_SAFFRON)
    card_draw.text((16, 50), f"{score}/5",
                   fill=(*score_color, int(255 * alpha)),
                   font=font_score)

    # Score label
    card_draw.text((100, 58), "NAKSHIQ SCORE",
                   fill=(*C_BONE_DIM, int(200 * alpha)),
                   font=_load_font("instrument", 18))

    # Detail line
    if detail:
        # Truncate long details
        if len(detail) > 35:
            detail = detail[:32] + "..."
        card_draw.text((16, 95), detail,
                       fill=(*C_BONE_DIM, int(200 * alpha)),
                       font=font_detail)

    # Paste card onto image
    paste_x = max(10, min(x - card_w // 2, REEL_W - card_w - 10))
    paste_y = max(10, min(y, REEL_H - card_h - 200))
    img.paste(card_bg, (paste_x, paste_y), card_bg)


def _draw_branding_bar(img: Image.Image):
    """Draw the NakshIQ branding bar at the bottom."""
    draw = ImageDraw.Draw(img)
    bar_h = 140
    bar_y = REEL_H - bar_h

    # Dark bar
    draw.rectangle([0, bar_y, REEL_W, REEL_H], fill=(*C_BG, 230))

    # "NAKSHIQ" logo text
    font_logo = _load_font("instrument", 32)
    draw.text((40, bar_y + 25), "NAKSHIQ", fill=C_BONE, font=font_logo)

    # "Travel with IQ" tagline
    font_tag = _load_font("crimson", 26)
    draw.text((40, bar_y + 70), "Travel with IQ", fill=C_SAFFRON, font=font_tag)

    # "nakshiq.com" right-aligned
    font_url = _load_font("instrument", 22)
    draw.text((REEL_W - 240, bar_y + 50), "nakshiq.com", fill=C_BONE, font=font_url)


def _draw_header_text(draw: ImageDraw.Draw, text: str, y: int,
                      font_name: str = "instrument", size: int = 42,
                      color: tuple = C_BONE):
    """Draw centered header text."""
    font = _load_font(font_name, size)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    x = (REEL_W - tw) // 2
    # Shadow
    draw.text((x + 2, y + 2), text, fill=(0, 0, 0), font=font)
    draw.text((x, y), text, fill=color, font=font)


# ═══════════════════════════════════════════════════════════════════════════
# FRAME RENDERERS — one per format
# ═══════════════════════════════════════════════════════════════════════════

def _render_state_heatmap_frames(
    state_data: dict,
    destinations: list[dict],
    out_dir: Path,
) -> list[Path]:
    """
    State Heatmap: State boundary with destinations appearing one by one,
    colored by their NakshIQ score. Each destination gets a dot + data card.

    Timeline (12s @ 30fps = 360 frames):
      0-1s:   State boundary draws in
      1-2s:   Title text appears
      2-10s:  Destinations appear sequentially (staggered ~1s each)
      10-12s: Summary stats + branding
    """
    boundary = state_data.get("boundary", [])
    landmarks = state_data.get("landmarks", [])
    state_name = state_data.get("name", "Unknown State")
    rivers = state_data.get("rivers", [])

    if not boundary:
        return []

    bounds = _compute_bounds(boundary, pad=0.15)
    canvas_rect = (60, 280, REEL_W - 120, REEL_H - 520)

    total_frames = REEL_FPS * REEL_DURATION
    frames = []

    # Match landmarks to destination scores
    scored_landmarks = []
    for lm in landmarks:
        score = 3  # default
        detail = ""
        for d in destinations:
            if (d.get("name", "").lower() == lm["name"].lower() or
                    lm.get("label", "").lower() in d.get("name", "").lower()):
                score = int(d.get("score", 3))
                detail = d.get("tagline") or d.get("note") or ""
                break
        scored_landmarks.append({**lm, "score": score, "detail": detail})

    # Sort by score descending so best destinations appear last (climax)
    scored_landmarks.sort(key=lambda x: x["score"])

    n_dests = min(len(scored_landmarks), 8)  # max 8 destinations per reel
    if n_dests == 0:
        n_dests = 1
        scored_landmarks = [{"name": state_name, "lat": boundary[0][0],
                             "lng": boundary[0][1], "score": 4, "detail": "",
                             "label": state_name[:6]}]

    dest_appear_start = 2.0  # seconds
    dest_interval = min(1.0, 8.0 / n_dests)  # ~1s each, compress if many

    for frame_idx in range(total_frames):
        t = frame_idx / REEL_FPS  # time in seconds

        img = Image.new("RGB", (REEL_W, REEL_H), C_BG)
        draw = ImageDraw.Draw(img)

        # ── Draw subtle grid ────────────────────────────────────────────
        for gx in range(0, REEL_W, 80):
            draw.line([(gx, 0), (gx, REEL_H)], fill=(28, 28, 26), width=1)
        for gy in range(0, REEL_H, 80):
            draw.line([(0, gy), (REEL_W, gy)], fill=(28, 28, 26), width=1)

        # ── Draw state boundary (animate draw-in during 0-1s) ───────────
        points = [_project_coords(p[0], p[1], bounds, canvas_rect)
                  for p in boundary]

        if t < 1.0:
            # Progressive boundary draw
            n_points = max(2, int(len(points) * t))
            partial = points[:n_points]
            if len(partial) >= 2:
                draw.line(partial, fill=C_BONE_DIM, width=2)
        else:
            # Full boundary
            draw.polygon(points, fill=C_BG_SUBTLE, outline=C_BONE_DIM, width=2)

            # Draw rivers
            for river in rivers:
                river_points = [_project_coords(p[0], p[1], bounds, canvas_rect)
                                for p in river.get("path", [])]
                if len(river_points) >= 2:
                    draw.line(river_points, fill=(60, 100, 140, 80), width=2)

        # ── Title text (fade in 1-2s) ───────────────────────────────────
        if t >= 1.0:
            title_alpha = min(1.0, (t - 1.0) / 0.5)
            title_color = tuple(int(c * title_alpha) for c in C_BONE)
            _draw_header_text(draw, state_name.upper(), 60,
                              "instrument", 52, title_color)
            _draw_header_text(draw, "DESTINATION SCORES", 125,
                              "instrument", 30, tuple(int(c * title_alpha)
                                                       for c in C_SAFFRON))

            # Month label
            import calendar
            from datetime import datetime
            month_name = calendar.month_name[datetime.now().month].upper()
            _draw_header_text(draw, month_name, 170,
                              "jetbrains", 24,
                              tuple(int(c * title_alpha) for c in C_BONE_DIM))

        # ── Destinations appearing sequentially ─────────────────────────
        for i, lm in enumerate(scored_landmarks[:n_dests]):
            appear_t = dest_appear_start + i * dest_interval
            if t < appear_t:
                continue

            progress = min(1.0, (t - appear_t) / 0.5)  # 0.5s fade-in
            lat = lm.get("lat", boundary[0][0])
            lng = lm.get("lng", boundary[0][1])
            px, py = _project_coords(lat, lng, bounds, canvas_rect)
            score = lm["score"]
            color = SCORE_COLORS.get(score, C_SAFFRON)

            # Pulsing dot
            dot_r = int(8 + 4 * progress)
            pulse = 1.0 + 0.15 * math.sin((t - appear_t) * 4)
            dot_r = int(dot_r * pulse)

            # Glow
            glow_r = dot_r + 8
            glow_color = (*color, int(60 * progress))
            _draw_dot(draw, px, py, glow_r, glow_color)
            _draw_dot(draw, px, py, dot_r, color)

            # Score ring
            _draw_score_ring(draw, px, py, dot_r + 14, score, progress)

            # Label
            font_label = _load_font("instrument", 20)
            label = lm.get("label", lm["name"][:8])
            bbox = draw.textbbox((0, 0), label, font=font_label)
            lw = bbox[2] - bbox[0]
            lx = px - lw // 2
            ly = py + dot_r + 20
            draw.text((lx + 1, ly + 1), label, fill=(0, 0, 0), font=font_label)
            draw.text((lx, ly), label, fill=C_BONE, font=font_label)

            # Data card (only show for most recent 2 destinations)
            if i >= n_dests - 2 and progress > 0.3:
                card_alpha = min(1.0, (progress - 0.3) / 0.4)
                _draw_data_card(img, px, py - 130, lm["name"],
                                score, lm.get("detail", ""), card_alpha)

        # ── Summary stats (10-12s) ──────────────────────────────────────
        if t >= 10.0:
            summary_alpha = min(1.0, (t - 10.0) / 0.5)
            scores = [lm["score"] for lm in scored_landmarks[:n_dests]]
            avg = sum(scores) / len(scores) if scores else 0
            best = max(scores) if scores else 0

            font_stat = _load_font("jetbrains", 28)
            font_label = _load_font("instrument", 20)

            stat_y = REEL_H - 320
            stat_color = tuple(int(c * summary_alpha) for c in C_BONE)

            draw.text((80, stat_y), f"AVG SCORE: {avg:.1f}/5",
                      fill=stat_color, font=font_stat)
            draw.text((80, stat_y + 45), f"BEST: {best}/5",
                      fill=tuple(int(c * summary_alpha) for c in C_GREEN),
                      font=font_stat)
            draw.text((80, stat_y + 90),
                      f"{n_dests} DESTINATIONS SCORED",
                      fill=tuple(int(c * summary_alpha) for c in C_BONE_DIM),
                      font=font_label)

        # ── Branding bar (always visible after 1s) ──────────────────────
        if t >= 1.0:
            _draw_branding_bar(img)

        # Save frame
        frame_path = out_dir / f"frame_{frame_idx:04d}.png"
        img.save(frame_path, "PNG")
        frames.append(frame_path)

    return frames


def _render_route_trace_frames(
    state_data: dict,
    destinations: list[dict],
    out_dir: Path,
) -> list[Path]:
    """
    Route Trace: Animated line tracing between top destinations in a state.
    A glowing line connects waypoints, with data cards popping up at each stop.

    Timeline (12s @ 30fps = 360 frames):
      0-1s:   State boundary + title
      1-10s:  Line traces between waypoints, cards appear at each stop
      10-12s: "Plan your route" CTA + branding
    """
    boundary = state_data.get("boundary", [])
    landmarks = state_data.get("landmarks", [])
    state_name = state_data.get("name", "Unknown")

    if not boundary or not landmarks:
        return []

    bounds = _compute_bounds(boundary, pad=0.15)
    canvas_rect = (60, 280, REEL_W - 120, REEL_H - 520)

    # Pick top scored landmarks as route waypoints
    scored = []
    for lm in landmarks:
        score = 3
        detail = ""
        for d in destinations:
            if (d.get("name", "").lower() == lm["name"].lower() or
                    lm.get("label", "").lower() in d.get("name", "").lower()):
                score = int(d.get("score", 3))
                detail = d.get("tagline") or ""
                break
        scored.append({**lm, "score": score, "detail": detail})

    # Sort by geography (rough south-to-north for visual flow)
    scored.sort(key=lambda x: x.get("lat", 0))
    waypoints = scored[:6]  # max 6 stops per route

    if len(waypoints) < 2:
        return []

    total_frames = REEL_FPS * REEL_DURATION
    frames = []

    trace_start = 1.5  # when line starts drawing
    trace_end = 9.5
    trace_duration = trace_end - trace_start
    n_segments = len(waypoints) - 1

    for frame_idx in range(total_frames):
        t = frame_idx / REEL_FPS

        img = Image.new("RGB", (REEL_W, REEL_H), C_BG)
        draw = ImageDraw.Draw(img)

        # Subtle grid
        for gx in range(0, REEL_W, 80):
            draw.line([(gx, 0), (gx, REEL_H)], fill=(28, 28, 26), width=1)
        for gy in range(0, REEL_H, 80):
            draw.line([(0, gy), (REEL_W, gy)], fill=(28, 28, 26), width=1)

        # State boundary (always after 0.5s)
        if t >= 0.5:
            points = [_project_coords(p[0], p[1], bounds, canvas_rect)
                      for p in boundary]
            draw.polygon(points, fill=C_BG_SUBTLE, outline=C_BONE_DIM, width=2)

        # Title
        if t >= 0.8:
            _draw_header_text(draw, f"{state_name.upper()} ROUTE", 60,
                              "instrument", 48, C_BONE)
            _draw_header_text(draw, "TOP DESTINATIONS", 120,
                              "instrument", 28, C_SAFFRON)

        # Route trace animation
        wp_coords = [_project_coords(wp.get("lat", 0), wp.get("lng", 0),
                                     bounds, canvas_rect)
                     for wp in waypoints]

        if t >= trace_start:
            trace_progress = min(1.0, (t - trace_start) / trace_duration)
            total_dist = 0
            segment_dists = []
            for i in range(n_segments):
                dx = wp_coords[i + 1][0] - wp_coords[i][0]
                dy = wp_coords[i + 1][1] - wp_coords[i][1]
                d = math.sqrt(dx * dx + dy * dy)
                segment_dists.append(d)
                total_dist += d

            drawn_dist = trace_progress * total_dist
            cum = 0

            for i in range(n_segments):
                seg_d = segment_dists[i]
                if cum + seg_d <= drawn_dist:
                    # Full segment drawn
                    draw.line([wp_coords[i], wp_coords[i + 1]],
                              fill=C_VERMILLION, width=4)
                    cum += seg_d
                elif cum < drawn_dist:
                    # Partial segment
                    frac = (drawn_dist - cum) / seg_d
                    end_x = wp_coords[i][0] + frac * (wp_coords[i + 1][0] - wp_coords[i][0])
                    end_y = wp_coords[i][1] + frac * (wp_coords[i + 1][1] - wp_coords[i][1])
                    draw.line([wp_coords[i], (int(end_x), int(end_y))],
                              fill=C_VERMILLION, width=4)
                    # Glowing head
                    _draw_dot(draw, int(end_x), int(end_y), 8, C_VERMILLION)
                    _draw_dot(draw, int(end_x), int(end_y), 14,
                              (*C_VERMILLION, 80))
                    break
                else:
                    break

            # Waypoint dots + cards
            for i, wp in enumerate(waypoints):
                wp_appear = trace_start + (i / max(1, n_segments)) * trace_duration
                if t >= wp_appear:
                    px, py = wp_coords[i]
                    score = wp["score"]
                    progress = min(1.0, (t - wp_appear) / 0.4)

                    # Waypoint dot
                    color = SCORE_COLORS.get(score, C_SAFFRON)
                    r = int(10 * progress)
                    _draw_dot(draw, px, py, r + 4, (*C_BG, 200))
                    _draw_dot(draw, px, py, r, color)

                    # Number label
                    font_num = _load_font("jetbrains", 18)
                    draw.text((px - 5, py - 8), str(i + 1),
                              fill=C_BONE, font=font_num)

                    # Show data card for current + previous waypoint
                    next_wp_appear = (trace_start +
                                     ((i + 1) / max(1, n_segments)) * trace_duration
                                     if i < n_segments else trace_end)
                    if t < next_wp_appear + 0.5 and progress > 0.5:
                        card_alpha = min(1.0, (progress - 0.5) / 0.3)
                        # Alternate card position above/below
                        card_y = py - 150 if i % 2 == 0 else py + 30
                        _draw_data_card(img, px, card_y, wp["name"],
                                        score, wp.get("detail", ""), card_alpha)

        # CTA (10-12s)
        if t >= 10.0:
            cta_alpha = min(1.0, (t - 10.0) / 0.5)
            cta_color = tuple(int(c * cta_alpha) for c in C_BONE)
            _draw_header_text(draw, "PLAN YOUR ROUTE", REEL_H - 340,
                              "instrument", 38, cta_color)
            _draw_header_text(draw, "nakshiq.com/trip-planner", REEL_H - 290,
                              "jetbrains", 22,
                              tuple(int(c * cta_alpha) for c in C_SAFFRON))

        # Branding
        if t >= 0.8:
            _draw_branding_bar(img)

        frame_path = out_dir / f"frame_{frame_idx:04d}.png"
        img.save(frame_path, "PNG")
        frames.append(frame_path)

    return frames


def _render_cluster_reveal_frames(
    map_data: dict,
    destinations: list[dict],
    out_dir: Path,
) -> list[Path]:
    """
    Cluster Reveal: India-wide view with destination clusters appearing by region.
    All states shown as dim outlines, then destinations light up region by region.

    Timeline (12s @ 30fps = 360 frames):
      0-1.5s: India outline draws in + title
      1.5-9s: Regions light up sequentially (North, South, East, West, Central)
      9-12s:  All lit + summary + branding
    """
    states = map_data.get("states", [])
    if not states:
        return []

    # Compute India-wide bounds from all state boundaries
    all_lats, all_lngs = [], []
    for s in states:
        for p in s.get("boundary", []):
            all_lats.append(p[0])
            all_lngs.append(p[1])

    if not all_lats:
        return []

    bounds = {
        "min_lat": min(all_lats) - 1,
        "max_lat": max(all_lats) + 1,
        "min_lng": min(all_lngs) - 1,
        "max_lng": max(all_lngs) + 1,
    }
    canvas_rect = (30, 280, REEL_W - 60, REEL_H - 520)

    # Group states by region
    regions = {"north": [], "south": [], "east": [], "west": [], "central": [],
               "northeast": []}
    for s in states:
        r = s.get("region", "central").lower()
        if r not in regions:
            r = "central"
        regions[r].append(s)

    region_order = ["north", "west", "south", "east", "northeast", "central"]
    region_labels = {
        "north": "NORTH INDIA", "south": "SOUTH INDIA",
        "east": "EAST INDIA", "west": "WEST INDIA",
        "northeast": "NORTHEAST", "central": "CENTRAL INDIA",
    }

    total_frames = REEL_FPS * REEL_DURATION
    frames = []
    region_start = 1.5
    region_interval = 7.5 / max(1, len(region_order))

    for frame_idx in range(total_frames):
        t = frame_idx / REEL_FPS

        img = Image.new("RGB", (REEL_W, REEL_H), C_BG)
        draw = ImageDraw.Draw(img)

        # Title
        if t >= 0.5:
            _draw_header_text(draw, "INDIA", 50, "instrument", 56, C_BONE)
            _draw_header_text(draw, "DESTINATION SCORES BY REGION", 115,
                              "instrument", 26, C_SAFFRON)

            import calendar
            from datetime import datetime
            month = calendar.month_name[datetime.now().month].upper()
            _draw_header_text(draw, month, 155, "jetbrains", 22, C_BONE_DIM)

        # Draw all state boundaries (dim)
        for s in states:
            bnd = s.get("boundary", [])
            if len(bnd) >= 3:
                pts = [_project_coords(p[0], p[1], bounds, canvas_rect)
                       for p in bnd]
                outline_color = (40, 40, 38) if t < 1.5 else (50, 50, 48)
                draw.polygon(pts, fill=C_BG_SUBTLE if t >= 1.0 else C_BG,
                             outline=outline_color, width=1)

        # Light up regions sequentially
        for ri, region_name in enumerate(region_order):
            r_start = region_start + ri * region_interval
            if t < r_start:
                continue

            r_progress = min(1.0, (t - r_start) / 1.0)
            r_states = regions.get(region_name, [])

            for s in r_states:
                bnd = s.get("boundary", [])
                if len(bnd) < 3:
                    continue
                pts = [_project_coords(p[0], p[1], bounds, canvas_rect)
                       for p in bnd]

                # Brightened fill based on region
                region_colors = {
                    "north": C_VERMILLION, "south": C_GREEN,
                    "east": C_TEAL, "west": C_SAFFRON,
                    "northeast": C_SAGE, "central": C_BONE_DIM,
                }
                base = region_colors.get(region_name, C_SAFFRON)
                fill_color = tuple(int(30 + (c - 30) * 0.3 * r_progress)
                                   for c in base)
                draw.polygon(pts, fill=fill_color,
                             outline=(*base, int(180 * r_progress)), width=2)

                # Show destination dots for this state
                for lm in s.get("landmarks", [])[:3]:
                    if r_progress < 0.5:
                        continue
                    px, py = _project_coords(lm.get("lat", 0), lm.get("lng", 0),
                                             bounds, canvas_rect)
                    # Find score
                    score = 3
                    for d in destinations:
                        if lm["name"].lower() in d.get("name", "").lower():
                            score = int(d.get("score", 3))
                            break
                    dot_a = min(1.0, (r_progress - 0.5) * 2)
                    color = SCORE_COLORS.get(score, C_SAFFRON)
                    _draw_dot(draw, px, py, int(5 * dot_a),
                              tuple(int(c * dot_a) for c in color))

            # Region label
            if r_progress > 0.3:
                label = region_labels.get(region_name, region_name.upper())
                # Position label near the region center
                r_lats = []
                r_lngs = []
                for s in r_states:
                    for p in s.get("boundary", []):
                        r_lats.append(p[0])
                        r_lngs.append(p[1])
                if r_lats:
                    cx, cy = _project_coords(
                        sum(r_lats) / len(r_lats),
                        sum(r_lngs) / len(r_lngs),
                        bounds, canvas_rect
                    )
                    font_rl = _load_font("instrument", 18)
                    bbox = draw.textbbox((0, 0), label, font=font_rl)
                    lw = bbox[2] - bbox[0]
                    la = min(1.0, (r_progress - 0.3) / 0.3)
                    draw.text((cx - lw // 2 + 1, cy + 1), label,
                              fill=(0, 0, 0), font=font_rl)
                    draw.text((cx - lw // 2, cy), label,
                              fill=tuple(int(c * la) for c in C_BONE),
                              font=font_rl)

        # Summary (9-12s)
        if t >= 9.5:
            sa = min(1.0, (t - 9.5) / 0.5)
            n_dest = len(destinations)
            _draw_header_text(draw, f"{n_dest}+ DESTINATIONS SCORED", REEL_H - 340,
                              "jetbrains", 26,
                              tuple(int(c * sa) for c in C_BONE))
            _draw_header_text(draw, "EVERY MONTH. EVERY STATE.", REEL_H - 300,
                              "instrument", 24,
                              tuple(int(c * sa) for c in C_SAFFRON))

        # Branding
        if t >= 1.0:
            _draw_branding_bar(img)

        frame_path = out_dir / f"frame_{frame_idx:04d}.png"
        img.save(frame_path, "PNG")
        frames.append(frame_path)

    return frames


def _render_score_pulse_frames(
    dest_data: dict,
    state_data: dict,
    out_dir: Path,
) -> list[Path]:
    """
    Score Pulse: Single destination with zoomed view, pulsing score ring,
    and animated data overlay with confidence details.

    Timeline (12s @ 30fps = 360 frames):
      0-2s:   State outline zooms in, destination dot appears
      2-5s:   Score ring animates (fills arc proportional to score)
      5-9s:   Data cards slide in (tagline, state, elevation, etc.)
      9-12s:  CTA + branding
    """
    dest_name = dest_data.get("name", "Unknown")
    score = int(dest_data.get("score", 4))
    state_name = dest_data.get("state", "")
    tagline = dest_data.get("tagline") or dest_data.get("note") or ""
    elevation = dest_data.get("elevation_m")

    boundary = state_data.get("boundary", []) if state_data else []
    bounds = _compute_bounds(boundary, pad=0.3) if boundary else {
        "min_lat": 8, "max_lat": 35, "min_lng": 68, "max_lng": 97
    }
    canvas_rect = (60, 350, REEL_W - 120, 800)

    # Find destination coords
    dest_lat, dest_lng = None, None
    if state_data:
        for lm in state_data.get("landmarks", []):
            if dest_name.lower() in lm["name"].lower():
                dest_lat = lm.get("lat")
                dest_lng = lm.get("lng")
                break
    if dest_lat is None:
        # Use state center
        if boundary:
            dest_lat = sum(p[0] for p in boundary) / len(boundary)
            dest_lng = sum(p[1] for p in boundary) / len(boundary)
        else:
            dest_lat, dest_lng = 20.5, 78.9  # India center

    total_frames = REEL_FPS * REEL_DURATION
    frames = []

    for frame_idx in range(total_frames):
        t = frame_idx / REEL_FPS

        img = Image.new("RGB", (REEL_W, REEL_H), C_BG)
        draw = ImageDraw.Draw(img)

        # Subtle radial lines from center
        cx, cy = REEL_W // 2, 700
        for angle in range(0, 360, 15):
            rad = math.radians(angle)
            ex = cx + int(600 * math.cos(rad))
            ey = cy + int(600 * math.sin(rad))
            draw.line([(cx, cy), (ex, ey)], fill=(26, 26, 24), width=1)

        # State boundary (fade in 0-1s)
        if boundary and t >= 0.3:
            b_alpha = min(1.0, (t - 0.3) / 0.7)
            points = [_project_coords(p[0], p[1], bounds, canvas_rect)
                      for p in boundary]
            outline_c = tuple(int(c * b_alpha) for c in C_BONE_DIM)
            fill_c = tuple(int(c * b_alpha) for c in C_BG_SUBTLE)
            draw.polygon(points, fill=fill_c, outline=outline_c, width=2)

        # Destination dot (appear at 1s)
        px, py = _project_coords(dest_lat, dest_lng, bounds, canvas_rect)
        if t >= 1.0:
            dot_progress = min(1.0, (t - 1.0) / 0.5)
            color = SCORE_COLORS.get(score, C_SAFFRON)

            # Pulsing glow
            pulse = 1.0 + 0.2 * math.sin(t * 3)
            glow_r = int(30 * dot_progress * pulse)
            _draw_dot(draw, px, py, glow_r, (*color, 40))
            _draw_dot(draw, px, py, int(20 * dot_progress), (*color, 80))
            _draw_dot(draw, px, py, int(12 * dot_progress), color)

        # Destination name (appear at 1.5s)
        if t >= 1.5:
            na = min(1.0, (t - 1.5) / 0.5)
            _draw_header_text(draw, dest_name.upper(), 80,
                              "instrument", 52,
                              tuple(int(c * na) for c in C_BONE))
            if state_name:
                _draw_header_text(draw, state_name.upper(), 145,
                                  "instrument", 28,
                                  tuple(int(c * na) for c in C_BONE_DIM))

        # Score ring animation (2-5s)
        if t >= 2.0:
            ring_progress = min(1.0, (t - 2.0) / 2.0)

            # Large centered score ring
            ring_cx, ring_cy = REEL_W // 2, REEL_H - 600
            ring_r = 80

            # Background circle
            draw.ellipse([ring_cx - ring_r, ring_cy - ring_r,
                          ring_cx + ring_r, ring_cy + ring_r],
                         fill=C_BG, outline=(50, 50, 48), width=3)

            # Score arc
            arc_end = int(360 * (score / 5) * ring_progress)
            if arc_end > 0:
                color = SCORE_COLORS.get(score, C_SAFFRON)
                draw.arc([ring_cx - ring_r, ring_cy - ring_r,
                          ring_cx + ring_r, ring_cy + ring_r],
                         -90, -90 + arc_end, fill=color, width=8)

            # Score text inside ring
            if ring_progress > 0.5:
                ta = min(1.0, (ring_progress - 0.5) * 2)
                font_score = _load_font("jetbrains", 52)
                score_text = f"{score}/5"
                bbox = draw.textbbox((0, 0), score_text, font=font_score)
                sw = bbox[2] - bbox[0]
                sh = bbox[3] - bbox[1]
                draw.text((ring_cx - sw // 2, ring_cy - sh // 2 - 5),
                          score_text,
                          fill=tuple(int(c * ta) for c in
                                     SCORE_COLORS.get(score, C_SAFFRON)),
                          font=font_score)

            # "NAKSHIQ SCORE" label
            font_label = _load_font("instrument", 20)
            label = "NAKSHIQ SCORE"
            bbox = draw.textbbox((0, 0), label, font=font_label)
            lw = bbox[2] - bbox[0]
            draw.text((ring_cx - lw // 2, ring_cy + ring_r + 15),
                      label,
                      fill=tuple(int(c * ring_progress) for c in C_BONE_DIM),
                      font=font_label)

        # Data details (5-9s)
        if t >= 5.0:
            detail_a = min(1.0, (t - 5.0) / 0.8)
            detail_y = REEL_H - 440
            font_detail = _load_font("crimson", 26)
            font_key = _load_font("instrument", 20)

            if tagline:
                # Wrap tagline
                words = tagline.split()
                if len(words) > 8:
                    line1 = " ".join(words[:8])
                    line2 = " ".join(words[8:16])
                else:
                    line1 = tagline
                    line2 = ""

                draw.text((80, detail_y), line1,
                          fill=tuple(int(c * detail_a) for c in C_BONE),
                          font=font_detail)
                if line2:
                    draw.text((80, detail_y + 35), line2,
                              fill=tuple(int(c * detail_a) for c in C_BONE),
                              font=font_detail)

            if elevation and t >= 6.0:
                ea = min(1.0, (t - 6.0) / 0.5)
                draw.text((80, detail_y + 80), "ELEVATION",
                          fill=tuple(int(c * ea) for c in C_BONE_DIM),
                          font=font_key)
                draw.text((80, detail_y + 105), f"{elevation:,}m",
                          fill=tuple(int(c * ea) for c in C_SAFFRON),
                          font=_load_font("jetbrains", 28))

        # CTA (9-12s)
        if t >= 9.0:
            cta_a = min(1.0, (t - 9.0) / 0.5)
            _draw_header_text(draw, "CHECK BEFORE YOU GO", REEL_H - 310,
                              "instrument", 32,
                              tuple(int(c * cta_a) for c in C_BONE))
            _draw_header_text(draw, "nakshiq.com", REEL_H - 270,
                              "jetbrains", 22,
                              tuple(int(c * cta_a) for c in C_SAFFRON))

        # Branding
        if t >= 1.0:
            _draw_branding_bar(img)

        frame_path = out_dir / f"frame_{frame_idx:04d}.png"
        img.save(frame_path, "PNG")
        frames.append(frame_path)

    return frames


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
# VIDEO ASSEMBLY (ffmpeg)
# ═══════════════════════════════════════════════════════════════════════════

def _assemble_video(
    frames_dir: Path,
    music_path: Optional[Path],
    out_path: Path,
) -> bool:
    """Assemble PNG frames into MP4 with optional music."""
    ffmpeg_bin = shutil.which("ffmpeg")
    if not ffmpeg_bin:
        for candidate in ["/usr/bin/ffmpeg", "/usr/local/bin/ffmpeg"]:
            if os.path.isfile(candidate):
                ffmpeg_bin = candidate
                break
    ffmpeg_bin = ffmpeg_bin or "ffmpeg"

    frame_pattern = str(frames_dir / "frame_%04d.png")

    if music_path and music_path.exists():
        cmd = [
            ffmpeg_bin, "-y",
            "-framerate", str(REEL_FPS),
            "-i", frame_pattern,
            "-i", str(music_path),
            "-filter_complex",
            f"[1:a]atrim=0:{REEL_DURATION},"
            f"afade=t=in:st=0:d=1,"
            f"afade=t=out:st={REEL_DURATION - 2}:d=2,"
            f"volume=0.35[aout]",
            "-map", "0:v", "-map", "[aout]",
            "-c:v", "libx264", "-preset", "medium", "-crf", "23",
            "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "128k",
            "-t", str(REEL_DURATION),
            str(out_path),
        ]
    else:
        cmd = [
            ffmpeg_bin, "-y",
            "-framerate", str(REEL_FPS),
            "-i", frame_pattern,
            "-c:v", "libx264", "-preset", "medium", "-crf", "23",
            "-pix_fmt", "yuv420p",
            "-t", str(REEL_DURATION), "-an",
            str(out_path),
        ]

    print(f"ffmpeg command: {' '.join(cmd[:6])}... → {out_path.name}")
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)

    if result.returncode != 0:
        print(f"ffmpeg FAILED (rc={result.returncode}):")
        print(result.stderr[-500:] if result.stderr else "no stderr")
        return False

    print(f"Video assembled: {out_path.name} "
          f"({out_path.stat().st_size // 1024} KB)")
    return True


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
    Render an animated map Reel. Returns path to the output MP4.

    Args:
        reel_format: One of REEL_MAP_FORMATS
        data: Format-specific data dict:
            - state_heatmap: {state_code, state_data, destinations}
            - route_trace:   {state_code, state_data, destinations}
            - cluster_reveal: {map_data, destinations}
            - score_pulse:   {dest_data, state_data}
        out_dir: Directory for output file
    """
    print(f"Rendering reel-map format: {reel_format}")

    # Create temp dir for frames
    frames_dir = out_dir / f"frames_{reel_format}"
    frames_dir.mkdir(parents=True, exist_ok=True)

    # Render frames based on format
    if reel_format == "state_heatmap":
        frames = _render_state_heatmap_frames(
            data["state_data"], data.get("destinations", []), frames_dir)

    elif reel_format == "route_trace":
        frames = _render_route_trace_frames(
            data["state_data"], data.get("destinations", []), frames_dir)

    elif reel_format == "cluster_reveal":
        frames = _render_cluster_reveal_frames(
            data["map_data"], data.get("destinations", []), frames_dir)

    elif reel_format == "score_pulse":
        frames = _render_score_pulse_frames(
            data["dest_data"], data.get("state_data"), frames_dir)

    else:
        print(f"Unknown reel-map format: {reel_format}")
        return None

    if not frames:
        print(f"No frames rendered for {reel_format}")
        return None

    print(f"Rendered {len(frames)} frames")

    # Pick music
    music_path = _pick_music(reel_format)
    if music_path:
        print(f"Music: {music_path.name}")

    # Assemble video
    slug = data.get("slug", reel_format)
    out_path = out_dir / f"reel_map_{reel_format}_{slug}.mp4"
    success = _assemble_video(frames_dir, music_path, out_path)

    if not success or not out_path.exists():
        return None

    # Clean up frames
    try:
        shutil.rmtree(frames_dir)
    except Exception:
        pass

    return out_path


# ═══════════════════════════════════════════════════════════════════════════
# CLI — standalone testing
# ═══════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="NakshIQ Reel Map Generator")
    parser.add_argument("--format", choices=REEL_MAP_FORMATS,
                        default="state_heatmap",
                        help="Reel map format to render")
    parser.add_argument("--state", default="HP",
                        help="State code (e.g., HP, RJ, KL)")
    parser.add_argument("--out", default="/tmp/reel_map_test",
                        help="Output directory")
    args = parser.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    map_data = _load_map_data()
    state_data = _get_state_data(map_data, args.state)

    if not state_data:
        print(f"No state data for {args.state}")
        exit(1)

    # Mock destination scores for testing
    mock_dests = []
    for lm in state_data.get("landmarks", []):
        mock_dests.append({
            "name": lm["name"],
            "score": random.randint(2, 5),
            "tagline": f"Score based on {12} factors",
            "state": state_data["name"],
            "elevation_m": random.choice([None, 1500, 2200, 3500]),
        })

    if args.format == "state_heatmap":
        data = {"state_code": args.state, "state_data": state_data,
                "destinations": mock_dests, "slug": args.state.lower()}
    elif args.format == "route_trace":
        data = {"state_code": args.state, "state_data": state_data,
                "destinations": mock_dests, "slug": args.state.lower()}
    elif args.format == "cluster_reveal":
        data = {"map_data": map_data, "destinations": mock_dests,
                "slug": "india"}
    elif args.format == "score_pulse":
        d = mock_dests[0] if mock_dests else {"name": "Test", "score": 4}
        data = {"dest_data": d, "state_data": state_data,
                "slug": d["name"].lower().replace(" ", "_")}
    else:
        print(f"Unknown format: {args.format}")
        exit(1)

    result = render_reel_map(args.format, data, out_dir)
    if result:
        print(f"\n✅ Output: {result}")
    else:
        print("\n❌ Rendering failed")
