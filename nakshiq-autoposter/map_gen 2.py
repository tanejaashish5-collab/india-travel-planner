"""
Nakshiq illustrated tourist map generator for Indian states.

Renders 1080x1080 JPEG maps following the locked Nakshiq Visual Identity:
  - Ink Deep (#161614) backgrounds, Bone (#F5F1E8) text, Vermillion Bright dot
  - State boundary polygon with subtle fill
  - Landmarks rendered as typed icon markers (mountain, temple, fort, etc.)
  - Rivers drawn as smooth curves in Topo Green
  - Compass rose, neighbor labels, brand bar at bottom

Usage:
  from map_gen import build_tourist_map
  path = build_tourist_map("HP", Path("/tmp/out"))

Data source: map_data.json (same directory), keyed by state code (e.g., "HP").
"""
from __future__ import annotations

import json
import math
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont

# Import brand constants and helpers from slide_gen (single source of truth)
from slide_gen import (
    ASSETS,
    BONE,
    BONE_DIM,
    FONTS_DIR,
    INK_DEEP,
    SAFFRON_GOLD,
    SLIDE_SIZE,
    TOPO_GREEN,
    VERMILLION_BRIGHT,
    _crimson_italic,
    _draw_dot,
    _draw_tracked,
    _hairline,
    _instrument,
    _jetbrains,
    _text_width,
    _text_width_tracked,
)

# ─────────────────────────────────────────────────────────────────────────────
# Map-specific constants
# ─────────────────────────────────────────────────────────────────────────────

DATA_FILE = Path(__file__).parent / "map_data.json"

# Layout zones (vertical)
HEADER_TOP    = 0
HEADER_BOTTOM = 140
MAP_TOP       = 140
MAP_BOTTOM    = 920
BRAND_TOP     = 920
BRAND_BOTTOM  = SLIDE_SIZE  # 1080

# Map drawing area with padding inside the map zone
MAP_PAD_X = 60
MAP_PAD_Y = 30
MAP_AREA_X1 = MAP_PAD_X
MAP_AREA_Y1 = MAP_TOP + MAP_PAD_Y
MAP_AREA_X2 = SLIDE_SIZE - MAP_PAD_X
MAP_AREA_Y2 = MAP_BOTTOM - MAP_PAD_Y

# Subtle fill for state polygon (slightly lighter than INK_DEEP)
STATE_FILL    = (30, 30, 28)    # #1E1E1C
STATE_STROKE  = BONE_DIM


# ─────────────────────────────────────────────────────────────────────────────
# Data loading
# ─────────────────────────────────────────────────────────────────────────────

def _load_state_data(state_code: str) -> dict[str, Any]:
    """Load state data from map_data.json by state code (e.g., 'HP')."""
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        all_data = json.load(f)
    code_upper = state_code.upper()

    # Support both formats: dict keyed by code, or {"states": [...]} array
    if "states" in all_data:
        for s in all_data["states"]:
            if s.get("short_code", "").upper() == code_upper:
                return s
        available = [s.get("short_code", "?") for s in all_data["states"]]
        raise KeyError(
            f"State code '{code_upper}' not found. "
            f"Available: {', '.join(sorted(available))}"
        )
    elif code_upper in all_data:
        return all_data[code_upper]
    else:
        raise KeyError(
            f"State code '{code_upper}' not found in {DATA_FILE}. "
            f"Available: {', '.join(sorted(all_data.keys()))}"
        )


# ─────────────────────────────────────────────────────────────────────────────
# Coordinate projection
# ─────────────────────────────────────────────────────────────────────────────

def _build_projection(
    all_coords: list[tuple[float, float]],
    area_x1: int, area_y1: int, area_x2: int, area_y2: int,
) -> callable:
    """
    Build a lat/lng -> (px_x, px_y) projection function.

    Uses simple equirectangular projection with aspect-preserving scaling,
    centered in the given pixel area. Latitude is inverted (north = up).

    Parameters
    ----------
    all_coords : list of (lat, lng) tuples — every coordinate that will be drawn
    area_x1..area_y2 : pixel bounding box for the map drawing area

    Returns
    -------
    A function  project(lat, lng) -> (px_x, px_y)
    """
    if not all_coords:
        # Fallback: center of India
        return lambda lat, lng: (
            (area_x1 + area_x2) // 2,
            (area_y1 + area_y2) // 2,
        )

    lats = [c[0] for c in all_coords]
    lngs = [c[1] for c in all_coords]
    min_lat, max_lat = min(lats), max(lats)
    min_lng, max_lng = min(lngs), max(lngs)

    # Add small margin so points don't sit on the very edge
    lat_margin = (max_lat - min_lat) * 0.08 or 0.5
    lng_margin = (max_lng - min_lng) * 0.08 or 0.5
    min_lat -= lat_margin
    max_lat += lat_margin
    min_lng -= lng_margin
    max_lng += lng_margin

    data_w = max_lng - min_lng
    data_h = max_lat - min_lat
    area_w = area_x2 - area_x1
    area_h = area_y2 - area_y1

    # Aspect-preserving scale (equirectangular: lng scaled by cos of center lat)
    center_lat_rad = math.radians((min_lat + max_lat) / 2)
    cos_lat = math.cos(center_lat_rad)
    # Effective data width in "lat-equivalent" units
    eff_data_w = data_w * cos_lat
    scale = min(area_w / eff_data_w, area_h / data_h) if (eff_data_w > 0 and data_h > 0) else 1.0

    # Center offset
    proj_w = eff_data_w * scale
    proj_h = data_h * scale
    offset_x = area_x1 + (area_w - proj_w) / 2
    offset_y = area_y1 + (area_h - proj_h) / 2

    def project(lat: float, lng: float) -> tuple[int, int]:
        px_x = offset_x + (lng - min_lng) * cos_lat * scale
        px_y = offset_y + (max_lat - lat) * scale  # invert Y (north = up)
        return int(px_x), int(px_y)

    return project


def _collect_all_coords(state: dict) -> list[tuple[float, float]]:
    """Gather every lat/lng coordinate from boundary, landmarks, and rivers."""
    coords: list[tuple[float, float]] = []

    # Boundary polygon(s) — handle both nested rings and flat point list
    boundary = state.get("boundary", [])
    if boundary and isinstance(boundary[0], (int, float)):
        # Single flat list — shouldn't happen, skip
        pass
    elif boundary and isinstance(boundary[0], list):
        if isinstance(boundary[0][0], (int, float)):
            # Flat list of [lat, lng] points (single ring)
            for pt in boundary:
                coords.append((pt[0], pt[1]))
        else:
            # Nested rings: [[ring1_points], [ring2_points]]
            for ring in boundary:
                for pt in ring:
                    coords.append((pt[0], pt[1]))

    # Landmarks
    for lm in state.get("landmarks", []):
        coords.append((lm["lat"], lm["lng"]))

    # Rivers
    for river in state.get("rivers", []):
        for pt in river.get("path", river.get("points", [])):
            coords.append((pt[0], pt[1]))

    return coords


# ─────────────────────────────────────────────────────────────────────────────
# Drawing: state boundary
# ─────────────────────────────────────────────────────────────────────────────

def _draw_boundary(draw: ImageDraw.ImageDraw, state: dict, project) -> None:
    """Draw the state boundary polygon(s) with subtle fill and thin stroke."""
    boundary = state.get("boundary", [])
    if not boundary:
        return

    # Detect if flat list of [lat, lng] or nested rings
    if isinstance(boundary[0][0], (int, float)):
        # Single ring (flat list of points)
        rings = [boundary]
    else:
        rings = boundary

    for ring in rings:
        if len(ring) < 3:
            continue
        poly = [project(pt[0], pt[1]) for pt in ring]
        draw.polygon(poly, fill=STATE_FILL, outline=STATE_STROKE, width=1)


# ─────────────────────────────────────────────────────────────────────────────
# Drawing: rivers
# ─────────────────────────────────────────────────────────────────────────────

def _draw_rivers(draw: ImageDraw.ImageDraw, state: dict, project) -> None:
    """Draw rivers as smooth polylines in TOPO_GREEN."""
    for river in state.get("rivers", []):
        points = river.get("path", river.get("points", []))
        if len(points) < 2:
            continue
        projected = [project(pt[0], pt[1]) for pt in points]
        # Draw as connected line segments (PIL doesn't have true bezier)
        draw.line(projected, fill=TOPO_GREEN, width=2, joint="curve")


# ─────────────────────────────────────────────────────────────────────────────
# Drawing: landmark markers
# ─────────────────────────────────────────────────────────────────────────────

_MARKER_COLORS = {
    "mountain":      BONE,
    "pass":          BONE,
    "temple":        SAFFRON_GOLD,
    "monastery":     SAFFRON_GOLD,
    "fort":          VERMILLION_BRIGHT,
    "palace":        VERMILLION_BRIGHT,
    "monument":      VERMILLION_BRIGHT,
    "lake":          TOPO_GREEN,
    "beach":         TOPO_GREEN,
    "waterfall":     TOPO_GREEN,
    "city":          BONE,
    "hill_station":  BONE,
    "wildlife":      TOPO_GREEN,
    "national_park": TOPO_GREEN,
    "valley":        BONE_DIM,
    "desert":        BONE_DIM,
    "island":        BONE_DIM,
}


def _draw_marker(draw: ImageDraw.ImageDraw, x: int, y: int,
                 lm_type: str, size: int = 8) -> None:
    """
    Draw a small icon marker at (x, y) based on landmark type.

    Shapes by category:
      mountain/pass      -> triangle
      temple/monastery   -> circle with center dot
      fort/palace/monument -> square
      lake/beach/waterfall -> wave (~) shape
      city/hill_station  -> filled circle
      wildlife/national_park -> diamond
      valley/desert/island -> circle outline
    """
    color = _MARKER_COLORS.get(lm_type, BONE_DIM)
    s = size

    if lm_type in ("mountain", "pass"):
        # Small triangle pointing up
        draw.polygon(
            [(x, y - s), (x - s, y + s), (x + s, y + s)],
            fill=color,
        )

    elif lm_type in ("temple", "monastery"):
        # Circle with center dot
        draw.ellipse([(x - s, y - s), (x + s, y + s)], outline=color, width=2)
        _draw_dot(draw, x, y, 3, color)

    elif lm_type in ("fort", "palace", "monument"):
        # Small square
        draw.rectangle([(x - s, y - s), (x + s, y + s)], fill=color)

    elif lm_type in ("lake", "beach", "waterfall"):
        # Wave / tilde shape (three small arcs approximated with lines)
        pts = []
        for i in range(7):
            px = x - s + (2 * s * i / 6)
            py = y + math.sin(i * math.pi / 1.5) * (s * 0.6)
            pts.append((px, py))
        draw.line(pts, fill=color, width=2)

    elif lm_type in ("city", "hill_station"):
        # Filled circle
        draw.ellipse([(x - s, y - s), (x + s, y + s)], fill=color)

    elif lm_type in ("wildlife", "national_park"):
        # Diamond
        draw.polygon(
            [(x, y - s), (x + s, y), (x, y + s), (x - s, y)],
            fill=color,
        )

    else:
        # Fallback: circle outline
        draw.ellipse([(x - s, y - s), (x + s, y + s)], outline=BONE_DIM, width=2)


# ─────────────────────────────────────────────────────────────────────────────
# Label collision avoidance
# ─────────────────────────────────────────────────────────────────────────────

class _LabelPlacer:
    """
    Simple greedy label placement with collision avoidance.

    For each label, tries the preferred offset first, then alternative
    positions (up, down, left, right, diagonal). Keeps a list of placed
    bounding boxes and rejects positions that overlap existing labels.
    """

    def __init__(self):
        self._boxes: list[tuple[int, int, int, int]] = []  # (x1, y1, x2, y2)

    def _overlaps(self, box: tuple[int, int, int, int]) -> bool:
        """Check if box overlaps any previously placed label."""
        x1, y1, x2, y2 = box
        for bx1, by1, bx2, by2 in self._boxes:
            if x1 < bx2 and x2 > bx1 and y1 < by2 and y2 > by1:
                return True
        return False

    def place(
        self,
        anchor_x: int, anchor_y: int,
        label_w: int, label_h: int,
        margin: int = 4,
    ) -> tuple[int, int] | None:
        """
        Find a non-overlapping position for a label near (anchor_x, anchor_y).

        Returns (text_x, text_y) or None if all positions collide.
        """
        # Candidate offsets: right, left, above, below, and diagonals
        offsets = [
            (14, -label_h // 2),                 # right
            (-label_w - 14, -label_h // 2),      # left
            (-label_w // 2, -label_h - 14),      # above
            (-label_w // 2, 14),                  # below
            (14, -label_h - 8),                   # upper-right
            (14, 8),                              # lower-right
            (-label_w - 14, -label_h - 8),       # upper-left
            (-label_w - 14, 8),                   # lower-left
        ]

        for dx, dy in offsets:
            tx = anchor_x + dx
            ty = anchor_y + dy
            box = (tx - margin, ty - margin, tx + label_w + margin, ty + label_h + margin)

            # Clamp within map area
            if box[0] < MAP_AREA_X1 or box[2] > MAP_AREA_X2:
                continue
            if box[1] < MAP_AREA_Y1 or box[3] > MAP_AREA_Y2:
                continue

            if not self._overlaps(box):
                self._boxes.append(box)
                return (tx, ty)

        # Last resort: place at first offset anyway (better than invisible)
        dx, dy = offsets[0]
        tx, ty = anchor_x + dx, anchor_y + dy
        box = (tx - margin, ty - margin, tx + label_w + margin, ty + label_h + margin)
        self._boxes.append(box)
        return (tx, ty)


# ─────────────────────────────────────────────────────────────────────────────
# Drawing: compass rose
# ─────────────────────────────────────────────────────────────────────────────

def _draw_compass(draw: ImageDraw.ImageDraw, cx: int, cy: int, size: int = 28) -> None:
    """
    Draw a minimal compass rose (north arrow) at (cx, cy).

    Just a simple N arrow pointing up — clean cartographic style.
    """
    # Arrow shaft
    draw.line([(cx, cy + size), (cx, cy - size)], fill=BONE_DIM, width=2)
    # Arrow head
    draw.polygon(
        [(cx, cy - size), (cx - 6, cy - size + 12), (cx + 6, cy - size + 12)],
        fill=BONE_DIM,
    )
    # "N" label above arrow
    n_font = _instrument(14)
    n_w = int(n_font.getlength("N"))
    draw.text((cx - n_w // 2, cy - size - 18), "N", font=n_font, fill=BONE_DIM)


# ─────────────────────────────────────────────────────────────────────────────
# Header rendering (top section)
# ─────────────────────────────────────────────────────────────────────────────

def _draw_header(draw: ImageDraw.ImageDraw, state: dict) -> None:
    """Draw eyebrow, title, and subtitle in the header zone (y: 0-140)."""
    state_name = state.get("name", "STATE")

    # Eyebrow: "NAKSHIQ" tracked
    eye_font = _instrument(16)
    eyebrow = "NAKSHIQ"
    eye_y = 20
    _draw_tracked(draw, (60, eye_y), eyebrow, eye_font, BONE_DIM, 0.30)

    # Title: state name, large Crimson Pro Bold Italic
    title_font = _crimson_italic(72, bold=True)
    title_text = state_name.upper()
    # Shrink if too wide
    while _text_width(title_text, title_font) > SLIDE_SIZE - 200 and title_font.size > 40:
        title_font = _crimson_italic(title_font.size - 4, bold=True)
    title_y = 44
    draw.text((60, title_y), title_text, font=title_font, fill=BONE)
    title_w = _text_width(title_text, title_font)

    # Vermillion dot after title
    dot_y = title_y + int(title_font.size * 0.72)
    _draw_dot(draw, 60 + title_w + 16, dot_y, 8, VERMILLION_BRIGHT)

    # Subtitle: "Tourist Map" in Crimson Pro Italic (non-bold)
    sub_font = _crimson_italic(30, bold=False)
    sub_y = title_y + int(title_font.size * 0.92) + 4
    draw.text((60, sub_y), "Tourist Map", font=sub_font, fill=BONE_DIM)


# ─────────────────────────────────────────────────────────────────────────────
# Brand bar rendering (bottom section)
# ─────────────────────────────────────────────────────────────────────────────

def _draw_brand_bar(draw: ImageDraw.ImageDraw, state: dict) -> None:
    """Draw the bottom brand bar (y: 920-1080)."""
    bar_y = BRAND_TOP

    # Hairline separator
    _hairline(draw, 0, bar_y, SLIDE_SIZE, VERMILLION_BRIGHT, 2)

    # Row 1 (y ~ 930-970): Wordmark left, tagline center, URL right
    row1_y = bar_y + 16

    # Left: "Naksh.iq" wordmark — Crimson Pro Bold Italic
    wm_font = _crimson_italic(32, bold=True)
    wm_text = "Naksh"
    draw.text((60, row1_y), wm_text, font=wm_font, fill=BONE)
    wm_w = _text_width(wm_text, wm_font)
    # Vermillion dot for the period
    dot_x = 60 + wm_w + 6
    dot_y = row1_y + int(wm_font.size * 0.68)
    _draw_dot(draw, dot_x, dot_y, 4, VERMILLION_BRIGHT)
    # "iq" after the dot
    iq_x = dot_x + 10
    draw.text((iq_x, row1_y), "iq", font=wm_font, fill=BONE)

    # Center: state tagline
    tagline_text = state.get("tagline", "").upper()
    if tagline_text:
        tl_font = _instrument(16)
        tl_w = _text_width_tracked(tagline_text, tl_font, 0.20)
        tl_x = (SLIDE_SIZE - tl_w) // 2
        tl_y = row1_y + 8
        _draw_tracked(draw, (tl_x, tl_y), tagline_text, tl_font, BONE_DIM, 0.20)

    # Right: "nakshiq.com" in JetBrains Mono Bold
    url_font = _jetbrains(16)
    url_text = "nakshiq.com"
    url_w = _text_width(url_text, url_font)
    url_x = SLIDE_SIZE - 60 - url_w
    url_y = row1_y + 8
    draw.text((url_x, url_y), url_text, font=url_font, fill=BONE_DIM)

    # Row 2: "TRAVEL WITH IQ" hairline-flanked, centered
    tw_text = "TRAVEL WITH IQ"
    tw_font = _instrument(18)
    tw_w = _text_width_tracked(tw_text, tw_font, 0.50)
    tw_x = (SLIDE_SIZE - tw_w) // 2
    tw_y = bar_y + 64
    _draw_tracked(draw, (tw_x, tw_y), tw_text, tw_font, BONE, 0.50)

    # Flanking hairlines
    hl_gap = 20
    hl_len = 90
    hl_y = tw_y + 10
    _hairline(draw, tw_x - hl_gap - hl_len, hl_y, tw_x - hl_gap, BONE, 1)
    _hairline(draw, tw_x + tw_w + hl_gap, hl_y, tw_x + tw_w + hl_gap + hl_len, BONE, 1)


# ─────────────────────────────────────────────────────────────────────────────
# Main renderer
# ─────────────────────────────────────────────────────────────────────────────

def render_tourist_map(state_code: str) -> Image.Image:
    """
    Render a 1080x1080 tourist map for the given state code.

    Parameters
    ----------
    state_code : str
        Two-letter state code (e.g., "HP" for Himachal Pradesh).
        Must exist in map_data.json.

    Returns
    -------
    PIL.Image.Image
        The rendered map as a PIL image (RGB, 1080x1080).
    """
    state = _load_state_data(state_code)

    # Canvas
    img = Image.new("RGB", (SLIDE_SIZE, SLIDE_SIZE), INK_DEEP)
    draw = ImageDraw.Draw(img)

    # ── Collect all coordinates and build projection ──────────────────────
    all_coords = _collect_all_coords(state)
    project = _build_projection(all_coords, MAP_AREA_X1, MAP_AREA_Y1, MAP_AREA_X2, MAP_AREA_Y2)

    # ── Map section background ────────────────────────────────────────────
    # (Already INK_DEEP from canvas; boundary fill provides the subtle lift)

    # ── Draw boundary ─────────────────────────────────────────────────────
    _draw_boundary(draw, state, project)

    # ── Draw rivers ───────────────────────────────────────────────────────
    _draw_rivers(draw, state, project)

    # ── Draw landmarks (markers + labels) ─────────────────────────────────
    label_font = _instrument(16)
    placer = _LabelPlacer()

    # Also register marker positions as occupied boxes so labels avoid them
    landmarks = state.get("landmarks", [])
    for lm in landmarks:
        px, py = project(lm["lat"], lm["lng"])
        # Draw the icon marker
        _draw_marker(draw, px, py, lm.get("type", "city"), size=7)

    # Now place labels
    for lm in landmarks:
        px, py = project(lm["lat"], lm["lng"])
        label = lm.get("label", lm.get("name", ""))
        if not label:
            continue
        lw = int(label_font.getlength(label))
        lh = int(label_font.size * 1.2)
        pos = placer.place(px, py, lw, lh)
        if pos:
            draw.text(pos, label, font=label_font, fill=BONE)

    # ── Neighbor labels ───────────────────────────────────────────────────
    neighbor_font = _instrument(14)
    neighbors = state.get("neighbors", [])
    for nb in neighbors:
        nb_name = nb.get("name", "").upper()
        if not nb_name:
            continue

        nb_w = _text_width_tracked(nb_name, neighbor_font, 0.15)

        # Use "position" [lat, lng] if available, else fallback to "side"
        if "position" in nb:
            pos = nb["position"]
            nx, ny = project(pos[0], pos[1])
            # Center the text on the projected position
            nx = nx - nb_w // 2
            ny = ny - 8
            # Clamp to map area
            nx = max(MAP_AREA_X1 + 4, min(nx, MAP_AREA_X2 - nb_w - 4))
            ny = max(MAP_AREA_Y1 + 4, min(ny, MAP_AREA_Y2 - 22))
        else:
            nb_side = nb.get("side", "n")
            cx = (MAP_AREA_X1 + MAP_AREA_X2) // 2
            cy = (MAP_AREA_Y1 + MAP_AREA_Y2) // 2
            side_positions = {
                "n":  (cx - nb_w // 2, MAP_AREA_Y1 + 4),
                "s":  (cx - nb_w // 2, MAP_AREA_Y2 - 22),
                "e":  (MAP_AREA_X2 - nb_w - 8, cy - 8),
                "w":  (MAP_AREA_X1 + 8, cy - 8),
                "ne": (MAP_AREA_X2 - nb_w - 8, MAP_AREA_Y1 + 4),
                "nw": (MAP_AREA_X1 + 8, MAP_AREA_Y1 + 4),
                "se": (MAP_AREA_X2 - nb_w - 8, MAP_AREA_Y2 - 22),
                "sw": (MAP_AREA_X1 + 8, MAP_AREA_Y2 - 22),
            }
            nx, ny = side_positions.get(nb_side, (cx - nb_w // 2, MAP_AREA_Y1 + 4))

        _draw_tracked(draw, (nx, ny), nb_name, neighbor_font, BONE_DIM, 0.15)

    # ── "Map not to scale" disclaimer ─────────────────────────────────────
    disc_font = _instrument(11)
    disc_text = "Map not to scale"
    disc_w = int(disc_font.getlength(disc_text))
    draw.text(
        (MAP_AREA_X2 - disc_w - 4, MAP_AREA_Y2 - 18),
        disc_text, font=disc_font, fill=BONE_DIM,
    )

    # ── Compass rose (top-right of map area) ──────────────────────────────
    _draw_compass(draw, MAP_AREA_X2 - 36, MAP_AREA_Y1 + 44)

    # ── Header ────────────────────────────────────────────────────────────
    _draw_header(draw, state)

    # ── Brand bar ─────────────────────────────────────────────────────────
    _draw_brand_bar(draw, state)

    return img


def build_tourist_map(state_code: str, out_dir: Path) -> Path:
    """
    Render and save a tourist map as a high-quality JPEG.

    Parameters
    ----------
    state_code : str
        Two-letter state code (e.g., "HP").
    out_dir : Path
        Directory to save the output image.

    Returns
    -------
    Path
        Absolute path to the saved JPEG file.
    """
    out_dir.mkdir(parents=True, exist_ok=True)
    img = render_tourist_map(state_code)
    filename = f"tourist_map_{state_code.upper()}.jpg"
    path = out_dir / filename
    img.save(path, "JPEG", quality=92, optimize=True)
    return path


# ─────────────────────────────────────────────────────────────────────────────
# CLI entry point
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import sys

    code = sys.argv[1] if len(sys.argv) > 1 else "HP"
    path = build_tourist_map(code, Path("./test_maps"))
    print(f"Saved: {path}")
