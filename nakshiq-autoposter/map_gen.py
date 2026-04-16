"""
Nakshiq illustrated tourist map generator for Indian states.

Renders 1080x1080 JPEG maps following the locked Nakshiq Visual Identity.
Supports multiple themes (dark / light) and design variants for social rotation.

Usage:
  from map_gen import build_tourist_map
  path = build_tourist_map("HP", Path("/tmp/out"), theme="dark", variant="cartographic")

Data source: map_data.json (same directory), keyed by state code (e.g., "HP").
"""
from __future__ import annotations

import json
import math
import random
from io import BytesIO
from pathlib import Path
from typing import Any

import requests
from PIL import Image, ImageDraw, ImageFont

# Import brand constants and helpers from slide_gen (single source of truth)
from slide_gen import (
    ASSETS,
    BONE,
    BONE_DIM,
    FONTS_DIR,
    INK,
    INK_DEEP,
    SAFFRON_GOLD,
    SLIDE_SIZE,
    TOPO_GREEN,
    VERMILLION,
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
# Theme system
# ─────────────────────────────────────────────────────────────────────────────

THEMES = {
    "dark": {
        "bg":             INK_DEEP,        # (22, 22, 20)
        "bg_subtle":      (30, 30, 28),    # state polygon fill
        "text_primary":   BONE,            # (245, 241, 232)
        "text_secondary": BONE_DIM,        # (200, 196, 186)
        "accent":         VERMILLION_BRIGHT,  # (229, 86, 66) — on dark
        "accent_alt":     SAFFRON_GOLD,
        "topo":           TOPO_GREEN,
        "border":         BONE_DIM,
        "contour":        (24, 24, 22),    # barely visible contour lines
        "grid":           (32, 32, 30),    # subtle grid
        "legend_bg":      (26, 26, 24),    # legend box background
    },
    "light": {
        "bg":             BONE,            # (245, 241, 232)
        "bg_subtle":      (235, 230, 218), # state polygon fill
        "text_primary":   INK,             # (14, 14, 12)
        "text_secondary": (120, 116, 106), # dimmed ink
        "accent":         VERMILLION,      # (212, 63, 42) — on light
        "accent_alt":     SAFFRON_GOLD,
        "topo":           TOPO_GREEN,
        "border":         (160, 156, 146), # muted border
        "contour":        (242, 238, 228), # barely visible contour
        "grid":           (238, 234, 224), # subtle grid
        "legend_bg":      (240, 236, 226), # legend box
    },
}

# Design variant configs
VARIANTS = ("cartographic", "minimal", "editorial", "photo_map", "icon_rich")


# ─────────────────────────────────────────────────────────────────────────────
# Map-specific constants
# ─────────────────────────────────────────────────────────────────────────────

DATA_FILE = Path(__file__).parent / "map_data.json"

HEADER_TOP    = 0
HEADER_BOTTOM = 140
MAP_TOP       = 140
MAP_BOTTOM    = 920
BRAND_TOP     = 920
BRAND_BOTTOM  = SLIDE_SIZE

MAP_PAD_X = 60
MAP_PAD_Y = 30
MAP_AREA_X1 = MAP_PAD_X
MAP_AREA_Y1 = MAP_TOP + MAP_PAD_Y
MAP_AREA_X2 = SLIDE_SIZE - MAP_PAD_X
MAP_AREA_Y2 = MAP_BOTTOM - MAP_PAD_Y


# ─────────────────────────────────────────────────────────────────────────────
# Data loading
# ─────────────────────────────────────────────────────────────────────────────

def _load_state_data(state_code: str) -> dict[str, Any]:
    """Load state data from map_data.json by state code (e.g., 'HP')."""
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        all_data = json.load(f)
    code_upper = state_code.upper()

    if "states" in all_data:
        for s in all_data["states"]:
            if s.get("short_code", "").upper() == code_upper:
                return s
        available = [s.get("short_code", "?") for s in all_data["states"]]
        raise KeyError(f"State '{code_upper}' not found. Available: {', '.join(sorted(available))}")
    elif code_upper in all_data:
        return all_data[code_upper]
    else:
        raise KeyError(f"State '{code_upper}' not found in {DATA_FILE}")


def get_all_state_codes() -> list[str]:
    """Return all available state codes from map_data.json."""
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        all_data = json.load(f)
    if "states" in all_data:
        return [s["short_code"] for s in all_data["states"]]
    return [k for k in all_data.keys() if k != "meta"]


# ─────────────────────────────────────────────────────────────────────────────
# Coordinate projection
# ─────────────────────────────────────────────────────────────────────────────

def _build_projection(all_coords, area_x1, area_y1, area_x2, area_y2):
    """Build a lat/lng -> (px_x, px_y) equirectangular projection."""
    if not all_coords:
        return lambda lat, lng: ((area_x1 + area_x2) // 2, (area_y1 + area_y2) // 2)

    lats = [c[0] for c in all_coords]
    lngs = [c[1] for c in all_coords]
    min_lat, max_lat = min(lats), max(lats)
    min_lng, max_lng = min(lngs), max(lngs)

    lat_margin = (max_lat - min_lat) * 0.10 or 0.5
    lng_margin = (max_lng - min_lng) * 0.10 or 0.5
    min_lat -= lat_margin
    max_lat += lat_margin
    min_lng -= lng_margin
    max_lng += lng_margin

    data_w = max_lng - min_lng
    data_h = max_lat - min_lat
    area_w = area_x2 - area_x1
    area_h = area_y2 - area_y1

    center_lat_rad = math.radians((min_lat + max_lat) / 2)
    cos_lat = math.cos(center_lat_rad)
    eff_data_w = data_w * cos_lat
    scale = min(area_w / eff_data_w, area_h / data_h) if (eff_data_w > 0 and data_h > 0) else 1.0

    proj_w = eff_data_w * scale
    proj_h = data_h * scale
    offset_x = area_x1 + (area_w - proj_w) / 2
    offset_y = area_y1 + (area_h - proj_h) / 2

    def project(lat: float, lng: float) -> tuple[int, int]:
        px_x = offset_x + (lng - min_lng) * cos_lat * scale
        px_y = offset_y + (max_lat - lat) * scale
        return int(px_x), int(px_y)

    return project


def _collect_all_coords(state: dict) -> list[tuple[float, float]]:
    """Gather every lat/lng from boundary, landmarks, and rivers."""
    coords = []
    boundary = state.get("boundary", [])
    if boundary and isinstance(boundary[0], list):
        if isinstance(boundary[0][0], (int, float)):
            for pt in boundary:
                coords.append((pt[0], pt[1]))
        else:
            for ring in boundary:
                for pt in ring:
                    coords.append((pt[0], pt[1]))

    for lm in state.get("landmarks", []):
        coords.append((lm["lat"], lm["lng"]))
    for river in state.get("rivers", []):
        for pt in river.get("path", river.get("points", [])):
            coords.append((pt[0], pt[1]))
    return coords


def _get_boundary_rings(state: dict) -> list[list]:
    """Normalize boundary data into a list of rings."""
    boundary = state.get("boundary", [])
    if not boundary:
        return []
    if isinstance(boundary[0][0], (int, float)):
        return [boundary]
    return boundary


# ─────────────────────────────────────────────────────────────────────────────
# Label collision avoidance (IMPROVED — wider margins, marker registration)
# ─────────────────────────────────────────────────────────────────────────────

class _LabelPlacer:
    """
    Greedy label placement with collision avoidance.
    Wider margins and more offset options to prevent overlapping text.
    """

    def __init__(self):
        self._boxes: list[tuple[int, int, int, int]] = []

    def register(self, x1: int, y1: int, x2: int, y2: int):
        """Register an existing occupied area (e.g., marker icon)."""
        self._boxes.append((x1, y1, x2, y2))

    def _overlaps(self, box):
        x1, y1, x2, y2 = box
        for bx1, by1, bx2, by2 in self._boxes:
            if x1 < bx2 and x2 > bx1 and y1 < by2 and y2 > by1:
                return True
        return False

    def place(self, anchor_x, anchor_y, label_w, label_h, margin=10):
        """Find a non-overlapping position near (anchor_x, anchor_y)."""
        # More offsets, wider gaps to avoid stacking
        offsets = [
            (18, -label_h // 2),                 # right
            (-label_w - 18, -label_h // 2),      # left
            (-label_w // 2, -label_h - 18),      # above
            (-label_w // 2, 18),                  # below
            (18, -label_h - 10),                  # upper-right
            (18, 10),                             # lower-right
            (-label_w - 18, -label_h - 10),      # upper-left
            (-label_w - 18, 10),                  # lower-left
            (30, -label_h // 2),                  # far right
            (-label_w - 30, -label_h // 2),      # far left
            (-label_w // 2, -label_h - 30),      # far above
            (-label_w // 2, 30),                  # far below
        ]

        for dx, dy in offsets:
            tx = anchor_x + dx
            ty = anchor_y + dy
            box = (tx - margin, ty - margin, tx + label_w + margin, ty + label_h + margin)

            if box[0] < MAP_AREA_X1 or box[2] > MAP_AREA_X2:
                continue
            if box[1] < MAP_AREA_Y1 or box[3] > MAP_AREA_Y2:
                continue

            if not self._overlaps(box):
                self._boxes.append(box)
                return (tx, ty)

        # Last resort: far right
        dx, dy = offsets[0]
        tx, ty = anchor_x + dx, anchor_y + dy
        box = (tx - margin, ty - margin, tx + label_w + margin, ty + label_h + margin)
        self._boxes.append(box)
        return (tx, ty)


# ─────────────────────────────────────────────────────────────────────────────
# Drawing helpers
# ─────────────────────────────────────────────────────────────────────────────

def _draw_boundary(draw, state, project, theme):
    """Draw the state boundary polygon(s) with fill, stroke, and optional dash."""
    for ring in _get_boundary_rings(state):
        if len(ring) < 3:
            continue
        poly = [project(pt[0], pt[1]) for pt in ring]
        # Filled polygon with subtle lift
        draw.polygon(poly, fill=theme["bg_subtle"], outline=theme["border"], width=2)


def _draw_contour_lines(draw, state, project, theme):
    """Draw subtle topographic-style contour lines inside the boundary for texture."""
    rings = _get_boundary_rings(state)
    if not rings:
        return
    ring = rings[0]
    if len(ring) < 3:
        return

    # Get bounding box of projected polygon
    projected = [project(pt[0], pt[1]) for pt in ring]
    xs = [p[0] for p in projected]
    ys = [p[1] for p in projected]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)

    contour_color = theme["contour"]
    # Draw horizontal contour lines at intervals
    interval = 40
    for y in range(min_y + interval, max_y, interval):
        # Find intersections with polygon edges
        intersections = []
        n = len(projected)
        for i in range(n):
            x1, y1 = projected[i]
            x2, y2 = projected[(i + 1) % n]
            if (y1 <= y < y2) or (y2 <= y < y1):
                if y2 != y1:
                    t = (y - y1) / (y2 - y1)
                    ix = x1 + t * (x2 - x1)
                    intersections.append(int(ix))
        intersections.sort()
        # Draw line segments between pairs of intersections
        for j in range(0, len(intersections) - 1, 2):
            draw.line([(intersections[j], y), (intersections[j + 1], y)],
                      fill=contour_color, width=1)


def _draw_grid_lines(draw, theme):
    """Draw subtle grid dots for cartographic feel."""
    grid_color = theme["grid"]
    spacing = 60
    for x in range(MAP_AREA_X1 + 30, MAP_AREA_X2, spacing):
        for y in range(MAP_AREA_Y1 + 30, MAP_AREA_Y2, spacing):
            draw.point((x, y), fill=grid_color)


def _draw_rivers(draw, state, project, theme):
    """Draw rivers as smooth polylines with optional name labels."""
    river_color = theme["topo"]
    river_name_font = _instrument(11)
    for river in state.get("rivers", []):
        points = river.get("path", river.get("points", []))
        if len(points) < 2:
            continue
        projected = [project(pt[0], pt[1]) for pt in points]
        draw.line(projected, fill=river_color, width=2, joint="curve")

        # River name label at midpoint
        name = river.get("name", "")
        if name and len(projected) >= 2:
            mid_idx = len(projected) // 2
            mx, my = projected[mid_idx]
            draw.text((mx + 4, my - 14), name,
                      font=river_name_font, fill=river_color)


def _get_marker_color(lm_type, theme):
    """Get the appropriate marker color based on type and theme."""
    group_colors = {
        "mountain":      theme["text_primary"],
        "pass":          theme["text_primary"],
        "temple":        theme["accent_alt"],
        "monastery":     theme["accent_alt"],
        "fort":          theme["accent"],
        "palace":        theme["accent"],
        "monument":      theme["accent"],
        "lake":          theme["topo"],
        "beach":         theme["topo"],
        "waterfall":     theme["topo"],
        "city":          theme["text_primary"],
        "hill_station":  theme["text_primary"],
        "wildlife":      theme["topo"],
        "national_park": theme["topo"],
        "valley":        theme["text_secondary"],
        "desert":        theme["text_secondary"],
        "island":        theme["text_secondary"],
    }
    return group_colors.get(lm_type, theme["text_secondary"])


def _draw_marker(draw, x, y, lm_type, theme, size=9):
    """Draw a typed icon marker. Slightly larger (size=9) for better visibility."""
    color = _get_marker_color(lm_type, theme)
    s = size

    if lm_type in ("mountain", "pass"):
        # Triangle with outline for depth
        draw.polygon([(x, y - s), (x - s, y + s), (x + s, y + s)], fill=color)
        draw.polygon([(x, y - s), (x - s, y + s), (x + s, y + s)],
                     outline=theme["bg"], width=1)

    elif lm_type in ("temple", "monastery"):
        draw.ellipse([(x - s, y - s), (x + s, y + s)], outline=color, width=2)
        _draw_dot(draw, x, y, 3, color)

    elif lm_type in ("fort", "palace", "monument"):
        draw.rectangle([(x - s, y - s), (x + s, y + s)], fill=color)
        draw.rectangle([(x - s, y - s), (x + s, y + s)],
                       outline=theme["bg"], width=1)

    elif lm_type in ("lake", "beach", "waterfall"):
        # Double wave
        for offset_y in (-2, 2):
            pts = []
            for i in range(9):
                px = x - s + (2 * s * i / 8)
                py = y + offset_y + math.sin(i * math.pi / 2) * (s * 0.4)
                pts.append((px, py))
            draw.line(pts, fill=color, width=2)

    elif lm_type in ("city", "hill_station"):
        draw.ellipse([(x - s, y - s), (x + s, y + s)], fill=color)
        # Inner dot in bg color for a ring effect
        inner = s - 3
        if inner > 1:
            draw.ellipse([(x - inner, y - inner), (x + inner, y + inner)],
                         fill=theme["bg_subtle"])
            _draw_dot(draw, x, y, 2, color)

    elif lm_type in ("wildlife", "national_park"):
        draw.polygon([(x, y - s), (x + s, y), (x, y + s), (x - s, y)], fill=color)
        draw.polygon([(x, y - s), (x + s, y), (x, y + s), (x - s, y)],
                     outline=theme["bg"], width=1)

    else:
        draw.ellipse([(x - s, y - s), (x + s, y + s)],
                     outline=theme["text_secondary"], width=2)


def _draw_rich_marker(draw, x, y, lm_type, theme, size=30):
    """
    Draw a rich illustrated icon marker (~30-40px) with multiple PIL elements
    to create recognizable mini-illustrations for each landmark type.
    """
    s = size
    hs = s // 2  # half size

    if lm_type in ("mountain", "pass"):
        # TWO overlapping mountain triangles with white snow cap
        body_color = BONE if theme.get("bg") == INK_DEEP else (80, 76, 66)
        # Larger rear mountain (slightly left)
        draw.polygon(
            [(x - 4, y - hs + 2), (x - hs - 2, y + hs), (x + hs - 6, y + hs)],
            fill=body_color
        )
        # Smaller front mountain (slightly right, overlapping)
        draw.polygon(
            [(x + 3, y - hs - 2), (x - hs + 6, y + hs), (x + hs + 2, y + hs)],
            fill=body_color
        )
        # Snow cap on the taller peak — small white triangle
        cap_h = s // 5
        draw.polygon(
            [(x + 3, y - hs - 2), (x - 3, y - hs + cap_h), (x + 9, y - hs + cap_h)],
            fill=(255, 255, 255)
        )
        # Ground line
        draw.line([(x - hs - 2, y + hs), (x + hs + 2, y + hs)],
                  fill=body_color, width=1)

    elif lm_type in ("temple", "monastery"):
        # Dome shape: semicircle on top, rectangle base, spire on top
        color = SAFFRON_GOLD
        base_w = s // 2
        base_h = s // 3
        # Rectangle base
        draw.rectangle(
            [(x - base_w, y + hs - base_h), (x + base_w, y + hs)],
            fill=color
        )
        # Dome (semicircle) on top of base
        dome_top = y - hs + 4
        dome_bottom = y + hs - base_h
        draw.pieslice(
            [(x - base_w, dome_top), (x + base_w, dome_bottom + (dome_bottom - dome_top))],
            start=180, end=0, fill=color
        )
        # Spire / finial — tiny triangle on top
        spire_h = s // 4
        draw.polygon(
            [(x, dome_top - spire_h), (x - 3, dome_top + 2), (x + 3, dome_top + 2)],
            fill=color
        )
        # Small door circle at base
        draw.ellipse(
            [(x - 3, y + hs - base_h + 2), (x + 3, y + hs - 2)],
            fill=theme["bg"]
        )

    elif lm_type in ("fort", "palace", "monument"):
        # Battlements: rectangle base with 3 crenellations on top + flag
        color = theme["accent"]
        base_w = hs
        base_h = s * 2 // 3
        base_top = y + hs - base_h
        # Main wall
        draw.rectangle(
            [(x - base_w, base_top), (x + base_w, y + hs)],
            fill=color
        )
        # 3 crenellation notches on top
        notch_w = base_w * 2 // 5
        notch_h = s // 5
        for nx in [x - base_w + 2, x - notch_w // 2, x + base_w - notch_w - 2]:
            draw.rectangle(
                [(nx, base_top - notch_h), (nx + notch_w, base_top)],
                fill=color
            )
        # Small flag triangle on top-right
        flag_x = x + base_w - 2
        flag_y = base_top - notch_h
        draw.line([(flag_x, flag_y), (flag_x, flag_y - s // 4)],
                  fill=theme["text_primary"], width=1)
        draw.polygon(
            [(flag_x, flag_y - s // 4), (flag_x + s // 5, flag_y - s // 6),
             (flag_x, flag_y - s // 8)],
            fill=SAFFRON_GOLD
        )

    elif lm_type in ("lake", "beach", "waterfall"):
        # 3 wavy horizontal lines + sun/moon circle above
        wave_color = TOPO_GREEN
        sun_color = SAFFRON_GOLD
        # Sun/moon circle above waves
        draw.ellipse(
            [(x - 4, y - hs - 2), (x + 4, y - hs + 6)],
            fill=sun_color
        )
        # 3 wavy lines
        for wi, wy in enumerate([y - 4, y + 4, y + 12]):
            pts = []
            for i in range(12):
                px = x - hs + (s * i / 11)
                py = wy + math.sin(i * math.pi / 2.5 + wi * 0.5) * 3
                pts.append((px, py))
            if len(pts) >= 2:
                draw.line(pts, fill=wave_color, width=2)

    elif lm_type in ("city", "hill_station"):
        # Cluster of 2-3 buildings of different heights with window dots
        color = theme["text_primary"]
        # Tall building (left)
        bw = s // 5
        bh1 = s * 3 // 4
        draw.rectangle(
            [(x - hs + 2, y + hs - bh1), (x - hs + 2 + bw, y + hs)],
            fill=color
        )
        # Medium building (center)
        bh2 = s // 2
        draw.rectangle(
            [(x - bw // 2, y + hs - bh2), (x + bw // 2 + 2, y + hs)],
            fill=color
        )
        # Short building (right)
        bh3 = s * 2 // 5
        draw.rectangle(
            [(x + hs - bw - 2, y + hs - bh3), (x + hs - 2, y + hs)],
            fill=color
        )
        # Window dots on each building
        win_color = theme["bg"]
        for bx, by_top, bwidth in [
            (x - hs + 2, y + hs - bh1, bw),
            (x - bw // 2, y + hs - bh2, bw + 2),
            (x + hs - bw - 2, y + hs - bh3, bw),
        ]:
            for wy in range(by_top + 4, y + hs - 3, 6):
                draw.rectangle(
                    [(bx + 2, wy), (bx + 4, wy + 2)],
                    fill=win_color
                )

    elif lm_type in ("wildlife", "national_park"):
        # Tree: triangle canopy on thin rectangle trunk + small diamond leaf
        color = TOPO_GREEN
        trunk_w = 3
        trunk_h = s // 3
        # Trunk
        draw.rectangle(
            [(x - trunk_w // 2, y + hs - trunk_h), (x + trunk_w // 2, y + hs)],
            fill=color
        )
        # Triangle canopy
        canopy_h = s * 2 // 3
        canopy_w = hs
        canopy_top = y + hs - trunk_h - canopy_h + 4
        draw.polygon(
            [(x, canopy_top), (x - canopy_w, y + hs - trunk_h + 2),
             (x + canopy_w, y + hs - trunk_h + 2)],
            fill=color
        )
        # Small diamond leaf beside the tree
        lx = x + canopy_w + 2
        ly = canopy_top + canopy_h // 2
        ds = 4
        draw.polygon(
            [(lx, ly - ds), (lx + ds, ly), (lx, ly + ds), (lx - ds, ly)],
            fill=color
        )

    elif lm_type in ("valley", "desert"):
        # Rolling hills/dunes: 2-3 overlapping semicircles
        color = theme["text_secondary"]
        # Back dune (wider, lighter feel)
        draw.pieslice(
            [(x - hs - 4, y - 2), (x + hs - 6, y + s)],
            start=180, end=0, fill=color
        )
        # Middle dune
        draw.pieslice(
            [(x - hs + 6, y + 2), (x + hs + 4, y + s + 4)],
            start=180, end=0, fill=color
        )
        # Front small dune
        draw.pieslice(
            [(x - 6, y + 4), (x + hs - 2, y + s + 2)],
            start=180, end=0, fill=color
        )

    elif lm_type == "island":
        # Palm tree on a small mound
        color = TOPO_GREEN
        # Mound (semicircle base)
        draw.pieslice(
            [(x - hs, y + 4), (x + hs, y + hs + 8)],
            start=180, end=0, fill=color
        )
        # Curved trunk line
        trunk_pts = []
        for i in range(8):
            t = i / 7.0
            tx = x - 4 + t * 6 + math.sin(t * math.pi) * 4
            ty = y + 4 - t * (s * 2 // 3)
            trunk_pts.append((tx, ty))
        if len(trunk_pts) >= 2:
            draw.line(trunk_pts, fill=(139, 119, 80), width=2)
        # Palm fan — lines radiating from top of trunk
        top_x, top_y = trunk_pts[-1] if trunk_pts else (x, y - hs)
        for angle_deg in [-60, -30, 0, 30, 60]:
            angle_rad = math.radians(angle_deg - 90)
            end_x = top_x + math.cos(angle_rad) * (s // 3)
            end_y = top_y + math.sin(angle_rad) * (s // 3)
            draw.line([(top_x, top_y), (int(end_x), int(end_y))],
                      fill=color, width=2)

    else:
        # Fallback: simple circle
        draw.ellipse([(x - hs, y - hs), (x + hs, y + hs)],
                     outline=theme["text_secondary"], width=2)


# ─────────────────────────────────────────────────────────────────────────────
# Photo circle for photo_map variant
# ─────────────────────────────────────────────────────────────────────────────

def _draw_photo_circle(img, draw, cx, cy, photo_url, radius, border_color, theme):
    """Download a photo and composite it as a circle with border at (cx, cy)."""
    try:
        from slide_gen import _fetch_image, _cover_resize
        photo = _fetch_image(photo_url)
        photo = _cover_resize(photo, radius * 2, radius * 2)

        # Create circular mask
        mask = Image.new("L", (radius * 2, radius * 2), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse([(0, 0), (radius * 2 - 1, radius * 2 - 1)], fill=255)

        # Paste photo with circular mask
        paste_x = cx - radius
        paste_y = cy - radius
        img.paste(photo, (paste_x, paste_y), mask)

        # Draw border ring
        draw.ellipse(
            [(cx - radius - 2, cy - radius - 2), (cx + radius + 2, cy + radius + 2)],
            outline=border_color, width=3
        )
        # Small dot at bottom of circle (like a map pin)
        draw.polygon(
            [(cx - 6, cy + radius + 1), (cx + 6, cy + radius + 1), (cx, cy + radius + 12)],
            fill=border_color
        )
    except Exception:
        # Fallback: draw a colored circle placeholder
        draw.ellipse([(cx - radius, cy - radius), (cx + radius, cy + radius)],
                     fill=theme["bg_subtle"], outline=border_color, width=3)


def _get_landmark_image_url(landmark_name, state_name):
    """Try to find a matching destination image from NakshIQ API."""
    try:
        r = requests.get(
            "https://nakshiq.com/api/content",
            params={"type": "destinations"},
            timeout=10,
        )
        if r.status_code == 200:
            data = r.json()
            dests = data.get("destinations", [])
            name_lower = landmark_name.lower()
            for d in dests:
                if name_lower in d.get("name", "").lower():
                    url = d.get("image", "")
                    if url:
                        return url
    except Exception:
        pass
    return None


def _draw_compass(draw, cx, cy, theme, size=30):
    """Draw a compass rose with circle ring."""
    # Outer ring
    ring_r = size + 8
    draw.ellipse([(cx - ring_r, cy - ring_r), (cx + ring_r, cy + ring_r)],
                 outline=theme["text_secondary"], width=1)
    # Arrow shaft
    draw.line([(cx, cy + size), (cx, cy - size)], fill=theme["text_secondary"], width=2)
    # Arrow head (filled north)
    draw.polygon([(cx, cy - size), (cx - 7, cy - size + 14), (cx + 7, cy - size + 14)],
                 fill=theme["text_primary"])
    # Cross ticks (E/W)
    tick = 6
    draw.line([(cx - size, cy), (cx - size + tick, cy)], fill=theme["text_secondary"], width=1)
    draw.line([(cx + size - tick, cy), (cx + size, cy)], fill=theme["text_secondary"], width=1)
    # "N" label
    n_font = _instrument(13)
    n_w = int(n_font.getlength("N"))
    draw.text((cx - n_w // 2, cy - size - 22), "N", font=n_font, fill=theme["text_primary"])


def _draw_legend(draw, state, theme):
    """Draw a small legend box showing marker type meanings."""
    landmarks = state.get("landmarks", [])
    # Collect unique types present
    types_present = list(dict.fromkeys(lm.get("type", "city") for lm in landmarks))

    type_labels = {
        "city": "City", "hill_station": "Hill Station", "mountain": "Mountain",
        "pass": "Pass", "temple": "Temple", "monastery": "Monastery",
        "fort": "Fort", "palace": "Palace", "monument": "Monument",
        "lake": "Lake", "beach": "Beach", "waterfall": "Waterfall",
        "wildlife": "Wildlife", "national_park": "National Park",
        "valley": "Valley", "desert": "Desert", "island": "Island",
    }

    # Only show up to 6 types to keep legend compact
    show_types = types_present[:6]
    if not show_types:
        return

    legend_font = _instrument(11)
    row_h = 22
    legend_w = 130
    legend_h = len(show_types) * row_h + 24
    lx = MAP_AREA_X1 + 8
    ly = MAP_AREA_Y2 - legend_h - 24

    # Background box
    draw.rectangle([(lx, ly), (lx + legend_w, ly + legend_h)],
                   fill=theme["legend_bg"], outline=theme["border"], width=1)

    # Title
    title_font = _instrument(10)
    draw.text((lx + 10, ly + 6), "LEGEND", font=title_font, fill=theme["text_secondary"])

    for i, t in enumerate(show_types):
        row_y = ly + 22 + i * row_h
        # Mini marker
        _draw_marker(draw, lx + 18, row_y + 6, t, theme, size=5)
        # Label
        label = type_labels.get(t, t.title())
        draw.text((lx + 32, row_y), label, font=legend_font, fill=theme["text_secondary"])


# ─────────────────────────────────────────────────────────────────────────────
# Header rendering
# ─────────────────────────────────────────────────────────────────────────────

def _draw_header(draw, state, theme, variant="cartographic"):
    """Draw header zone (y: 0-140)."""
    state_name = state.get("name", "STATE")

    if variant == "editorial":
        # Editorial: Large state code watermark + name
        code = state.get("short_code", "XX")
        code_font = _crimson_italic(180, bold=True)
        # Watermark code in subtle color, right-aligned
        code_w = _text_width(code, code_font)
        draw.text((SLIDE_SIZE - code_w - 40, -30), code,
                  font=code_font, fill=theme["bg_subtle"])

    # Eyebrow
    eye_font = _instrument(16)
    _draw_tracked(draw, (60, 20), "NAKSHIQ", eye_font, theme["text_secondary"], 0.30)

    # Title
    title_font = _crimson_italic(72, bold=True)
    title_text = state_name.upper()
    while _text_width(title_text, title_font) > SLIDE_SIZE - 200 and title_font.size > 40:
        title_font = _crimson_italic(title_font.size - 4, bold=True)
    draw.text((60, 44), title_text, font=title_font, fill=theme["text_primary"])
    title_w = _text_width(title_text, title_font)
    # Vermillion dot
    _draw_dot(draw, 60 + title_w + 16, 44 + int(title_font.size * 0.72),
              8, theme["accent"])

    # Subtitle
    sub_font = _crimson_italic(30, bold=False)
    sub_y = 44 + int(title_font.size * 0.92) + 4
    sub_text = "Tourist Map" if variant != "minimal" else ""
    if sub_text:
        draw.text((60, sub_y), sub_text, font=sub_font, fill=theme["text_secondary"])


# ─────────────────────────────────────────────────────────────────────────────
# Brand bar rendering
# ─────────────────────────────────────────────────────────────────────────────

def _draw_brand_bar(draw, state, theme):
    """Draw the bottom brand bar (y: 920-1080)."""
    bar_y = BRAND_TOP

    # Hairline separator
    _hairline(draw, 0, bar_y, SLIDE_SIZE, theme["accent"], 2)

    row1_y = bar_y + 16

    # Left: "Naksh.iq" wordmark
    wm_font = _crimson_italic(32, bold=True)
    draw.text((60, row1_y), "Naksh", font=wm_font, fill=theme["text_primary"])
    wm_w = _text_width("Naksh", wm_font)
    dot_x = 60 + wm_w + 6
    dot_y = row1_y + int(wm_font.size * 0.68)
    _draw_dot(draw, dot_x, dot_y, 4, theme["accent"])
    draw.text((dot_x + 10, row1_y), "iq", font=wm_font, fill=theme["text_primary"])

    # Center: state tagline
    tagline_text = state.get("tagline", "").upper()
    if tagline_text:
        tl_font = _instrument(16)
        tl_w = _text_width_tracked(tagline_text, tl_font, 0.20)
        tl_x = (SLIDE_SIZE - tl_w) // 2
        _draw_tracked(draw, (tl_x, row1_y + 8), tagline_text,
                      tl_font, theme["text_secondary"], 0.20)

    # Right: nakshiq.com
    url_font = _jetbrains(16)
    url_text = "nakshiq.com"
    url_w = _text_width(url_text, url_font)
    draw.text((SLIDE_SIZE - 60 - url_w, row1_y + 8), url_text,
              font=url_font, fill=theme["text_secondary"])

    # TRAVEL WITH IQ — hairline-flanked
    tw_text = "TRAVEL WITH IQ"
    tw_font = _instrument(18)
    tw_w = _text_width_tracked(tw_text, tw_font, 0.50)
    tw_x = (SLIDE_SIZE - tw_w) // 2
    tw_y = bar_y + 64
    _draw_tracked(draw, (tw_x, tw_y), tw_text, tw_font, theme["text_primary"], 0.50)
    hl_gap, hl_len = 20, 90
    hl_y = tw_y + 10
    _hairline(draw, tw_x - hl_gap - hl_len, hl_y, tw_x - hl_gap, theme["text_primary"], 1)
    _hairline(draw, tw_x + tw_w + hl_gap, hl_y, tw_x + tw_w + hl_gap + hl_len,
              theme["text_primary"], 1)


# ─────────────────────────────────────────────────────────────────────────────
# Connecting line helper
# ─────────────────────────────────────────────────────────────────────────────

def _draw_connecting_line(draw, marker_x, marker_y, label_x, label_y, label_w, label_h, theme):
    """
    Draw a thin 1px connecting line from marker to label if they are far apart.
    Only draws when distance > 20px.
    """
    # Find the closest edge point of the label to the marker
    label_cx = label_x + label_w // 2
    label_cy = label_y + label_h // 2
    dist = math.hypot(marker_x - label_cx, marker_y - label_cy)

    if dist > 20:
        # Connect from marker to nearest edge of label box
        # Clamp target to label edge
        target_x = max(label_x, min(marker_x, label_x + label_w))
        target_y = max(label_y, min(marker_y, label_y + label_h))
        draw.line(
            [(marker_x, marker_y), (target_x, target_y)],
            fill=theme["text_secondary"], width=1
        )


# ─────────────────────────────────────────────────────────────────────────────
# Main renderer
# ─────────────────────────────────────────────────────────────────────────────

def render_tourist_map(
    state_code: str,
    theme: str = "dark",
    variant: str = "cartographic",
) -> Image.Image:
    """
    Render a 1080x1080 tourist map for the given state code.

    Parameters
    ----------
    state_code : str
        Two-letter state code (e.g., "HP").
    theme : str
        "dark" (Ink Deep bg) or "light" (Bone bg). Default "dark".
    variant : str
        "cartographic" — full map with grid, contours, legend, river names.
        "minimal" — clean, fewer elements, no legend/grid, more whitespace.
        "editorial" — large state code watermark, bolder accents, legend.
        "photo_map" — circular destination photos at landmark positions.
        "icon_rich" — like cartographic but with rich illustrated icons, no legend.
    """
    state = _load_state_data(state_code)
    t = THEMES.get(theme, THEMES["dark"])

    img = Image.new("RGB", (SLIDE_SIZE, SLIDE_SIZE), t["bg"])
    draw = ImageDraw.Draw(img)

    all_coords = _collect_all_coords(state)
    project = _build_projection(all_coords, MAP_AREA_X1, MAP_AREA_Y1,
                                MAP_AREA_X2, MAP_AREA_Y2)

    # ── Background texture ────────────────────────────────────────────────
    if variant in ("cartographic", "icon_rich"):
        _draw_grid_lines(draw, t)

    # ── State boundary ────────────────────────────────────────────────────
    _draw_boundary(draw, state, project, t)

    # ── Contour lines (inside boundary) ───────────────────────────────────
    if variant in ("cartographic", "editorial", "icon_rich"):
        _draw_contour_lines(draw, state, project, t)

    # ── Rivers ────────────────────────────────────────────────────────────
    _draw_rivers(draw, state, project, t)

    # ── Landmarks (markers + labels) ──────────────────────────────────────
    landmarks = state.get("landmarks", [])
    placer = _LabelPlacer()

    if variant == "photo_map":
        # Photo map variant: try photos, fallback to rich icons
        label_font = _instrument(14)
        state_name = state.get("name", "")
        photo_radius = 35

        # First pass: draw photo circles or rich icon fallback
        for lm in landmarks:
            px, py = project(lm["lat"], lm["lng"])
            lm_name = lm.get("name", lm.get("label", ""))
            photo_url = _get_landmark_image_url(lm_name, state_name)

            if photo_url:
                border_color = _get_marker_color(lm.get("type", "city"), t)
                _draw_photo_circle(img, draw, px, py, photo_url, photo_radius,
                                   border_color, t)
                reg_r = photo_radius + 4
                placer.register(px - reg_r, py - reg_r, px + reg_r, py + reg_r + 12)
            else:
                # Fallback to rich illustrated icon
                _draw_rich_marker(draw, px, py, lm.get("type", "city"), t, size=30)
                placer.register(px - 18, py - 18, px + 18, py + 18)

        # Second pass: place labels below
        for lm in landmarks:
            px, py = project(lm["lat"], lm["lng"])
            label = lm.get("label", lm.get("name", ""))
            if not label:
                continue
            lw = int(label_font.getlength(label))
            lh = int(label_font.size * 1.3)
            pos = placer.place(px, py, lw, lh, margin=8)
            if pos:
                draw.text(pos, label, font=label_font, fill=t["text_primary"])
                _draw_connecting_line(draw, px, py, pos[0], pos[1], lw, lh, t)

    elif variant == "icon_rich":
        # Icon-rich variant: use rich illustrated icons at size 35, no legend
        label_font = _instrument(14)  # slightly smaller for dense maps
        marker_size = 35

        # First pass: draw rich markers and register bounding boxes
        for lm in landmarks:
            px, py = project(lm["lat"], lm["lng"])
            _draw_rich_marker(draw, px, py, lm.get("type", "city"), t, size=marker_size)
            # Register the FULL icon area — rich icons are taller/wider than marker_size
            reg = marker_size // 2 + 10
            placer.register(px - reg, py - reg, px + reg, py + reg)

        # Second pass: place labels with larger margins for big icons
        for lm in landmarks:
            px, py = project(lm["lat"], lm["lng"])
            label = lm.get("label", lm.get("name", ""))
            if not label:
                continue
            lw = int(label_font.getlength(label))
            lh = int(label_font.size * 1.3)
            pos = placer.place(px, py, lw, lh, margin=14)
            if pos:
                draw.text(pos, label, font=label_font, fill=t["text_primary"])
                _draw_connecting_line(draw, px, py, pos[0], pos[1], lw, lh, t)

    else:
        # Original variants: cartographic, minimal, editorial
        label_font = _instrument(16)

        # First pass: draw markers and register their bounding boxes
        for lm in landmarks:
            px, py = project(lm["lat"], lm["lng"])
            marker_size = 9 if variant != "minimal" else 7
            _draw_marker(draw, px, py, lm.get("type", "city"), t, size=marker_size)
            # Register marker area so labels avoid it
            placer.register(px - marker_size - 4, py - marker_size - 4,
                            px + marker_size + 4, py + marker_size + 4)

        # Second pass: place labels
        for lm in landmarks:
            px, py = project(lm["lat"], lm["lng"])
            label = lm.get("label", lm.get("name", ""))
            if not label:
                continue
            lw = int(label_font.getlength(label))
            lh = int(label_font.size * 1.3)
            pos = placer.place(px, py, lw, lh, margin=10)
            if pos:
                draw.text(pos, label, font=label_font, fill=t["text_primary"])
                _draw_connecting_line(draw, px, py, pos[0], pos[1], lw, lh, t)

    # ── Neighbor labels (Indian states only — exclude countries) ─────────
    EXCLUDED_NEIGHBORS = {
        "PAKISTAN", "CHINA", "TIBET", "TIBET (CHINA)", "SRI LANKA",
        "BANGLADESH", "MYANMAR", "NEPAL", "BHUTAN", "AFGHANISTAN",
        "ARABIAN SEA", "BAY OF BENGAL", "INDIAN OCEAN", "LAKSHADWEEP SEA",
    }
    neighbor_font = _instrument(14)
    for nb in state.get("neighbors", []):
        nb_name = nb.get("name", "").upper()
        if not nb_name:
            continue
        if nb_name in EXCLUDED_NEIGHBORS:
            continue
        nb_w = _text_width_tracked(nb_name, neighbor_font, 0.15)

        if "position" in nb:
            pos = nb["position"]
            nx, ny = project(pos[0], pos[1])
            nx = max(MAP_AREA_X1 + 4, min(nx - nb_w // 2, MAP_AREA_X2 - nb_w - 4))
            ny = max(MAP_AREA_Y1 + 4, min(ny - 8, MAP_AREA_Y2 - 22))
        else:
            nx, ny = MAP_AREA_X1 + 8, MAP_AREA_Y1 + 4

        _draw_tracked(draw, (nx, ny), nb_name, neighbor_font,
                      t["text_secondary"], 0.15)

    # ── Disclaimer ────────────────────────────────────────────────────────
    disc_font = _instrument(11)
    disc_text = "Map not to scale"
    disc_w = int(disc_font.getlength(disc_text))
    draw.text((MAP_AREA_X2 - disc_w - 4, MAP_AREA_Y2 - 18),
              disc_text, font=disc_font, fill=t["text_secondary"])

    # ── Compass rose ──────────────────────────────────────────────────────
    _draw_compass(draw, MAP_AREA_X2 - 40, MAP_AREA_Y1 + 50, t)

    # ── Legend (cartographic + editorial only — skip for photo_map and icon_rich) ─
    if variant in ("cartographic", "editorial"):
        _draw_legend(draw, state, t)

    # ── Header ────────────────────────────────────────────────────────────
    _draw_header(draw, state, t, variant)

    # ── Brand bar ─────────────────────────────────────────────────────────
    _draw_brand_bar(draw, state, t)

    return img


# ─────────────────────────────────────────────────────────────────────────────
# Public API
# ─────────────────────────────────────────────────────────────────────────────

def build_tourist_map(
    state_code: str,
    out_dir: Path,
    theme: str = "dark",
    variant: str = "cartographic",
) -> Path:
    """
    Render and save a tourist map as a high-quality JPEG.

    Returns the path to the saved file.
    """
    out_dir.mkdir(parents=True, exist_ok=True)
    img = render_tourist_map(state_code, theme=theme, variant=variant)
    filename = f"tourist_map_{state_code.upper()}_{theme}_{variant}.jpg"
    path = out_dir / filename
    img.save(path, "JPEG", quality=92, optimize=True)
    return path


# ─────────────────────────────────────────────────────────────────────────────
# CLI entry point
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import sys

    usage = (
        "Usage: python map_gen.py <STATE_CODE> [THEME] [VARIANT]\n"
        "\n"
        "  STATE_CODE  Two-letter code (e.g., HP, RJ, GA). Use 'ALL' for every state.\n"
        f"  THEME       dark | light  (default: dark)\n"
        f"  VARIANT     {' | '.join(VARIANTS)}  (default: cartographic)\n"
        "\n"
        "Examples:\n"
        "  python map_gen.py HP dark cartographic\n"
        "  python map_gen.py RJ light photo_map\n"
        "  python map_gen.py GA dark icon_rich\n"
    )

    if len(sys.argv) > 1 and sys.argv[1] in ("-h", "--help"):
        print(usage)
        sys.exit(0)

    code = sys.argv[1] if len(sys.argv) > 1 else "HP"
    theme_arg = sys.argv[2] if len(sys.argv) > 2 else "dark"
    variant_arg = sys.argv[3] if len(sys.argv) > 3 else "cartographic"

    path = build_tourist_map(code, Path("./test_maps"), theme=theme_arg, variant=variant_arg)
    print(f"Saved: {path}")
