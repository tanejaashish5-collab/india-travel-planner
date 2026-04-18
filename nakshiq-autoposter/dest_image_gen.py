"""
NakshIQ Destination Image Library Generator
============================================

Generates branded social media images for every destination with text overlays
and NakshIQ branding. Produces two formats per destination:

  - 1080×1080 (Instagram/Facebook feed)
  - 1080×1920 (Stories/Reels cover)

Four text overlay styles rotate per destination (by index % 4):
  1. BOLD CINEMATIC  — Large bold text, gradient shadow, magazine-cover feel
  2. MINIMAL ELEGANT — Clean sans-serif in frosted glass bar at bottom
  3. TYPOGRAPHIC ART — The place name IS the design, giant expressive type
  4. INFO CARD       — Structured layout: name + state + tagline, Pinterest-ready

Three branding placements rotate independently (by index % 3):
  A. SUBTLE WATERMARK    — Small logo/monogram in a corner
  B. BRANDED FOOTER BAR  — Thin branded strip at bottom with tagline
  C. INTEGRATED BADGE    — Branded stamp element that feels part of the design

Usage:
  python dest_image_gen.py                     # Generate for ALL destinations
  python dest_image_gen.py --limit 10          # First 10 only (for testing)
  python dest_image_gen.py --dest "Spiti"      # Single destination
  python dest_image_gen.py --style 0           # Force style (0-3)
  python dest_image_gen.py --branding 1        # Force branding (0-2)
  python dest_image_gen.py --regenerate        # Overwrite existing images
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import sys
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

# ─────────────────────────────────────────────────────────────────────────────
# Paths & Constants
# ─────────────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).parent
ASSETS     = ROOT / "assets"
FONTS_DIR  = ASSETS / "fonts"
BRAND_DIR  = ASSETS / "brand-pack" / "nakshiq"
OUTPUT_DIR = ROOT / "social_image_library"

FEED_SIZE  = (1080, 1080)
STORY_SIZE = (1080, 1920)

API_URL    = "https://nakshiq.com/api/content"

# ─────────────────────────────────────────────────────────────────────────────
# Brand Colors (from Visual Identity)
# ─────────────────────────────────────────────────────────────────────────────

INK_DEEP          = (22, 22, 20)         # #161614
INK               = (14, 14, 12)         # #0E0E0C
BONE              = (245, 241, 232)      # #F5F1E8
VERMILLION        = (212, 63, 42)        # #D43F2A
VERMILLION_BRIGHT = (229, 86, 66)        # #E55642
TOPO_GREEN        = (47, 79, 63)         # #2F4F3F
SAFFRON_GOLD      = (200, 147, 47)       # #C8932F
BONE_DIM          = (200, 196, 186)      # dimmed Bone for secondary text

# ─────────────────────────────────────────────────────────────────────────────
# Font Helpers
# ─────────────────────────────────────────────────────────────────────────────

def _font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS_DIR / name), size)

def _crimson(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    return _font("CrimsonPro-BoldItalic.ttf" if bold else "CrimsonPro-Italic.ttf", size)

def _instrument(size: int) -> ImageFont.FreeTypeFont:
    return _font("InstrumentSans-Bold.ttf", size)

def _jetbrains(size: int) -> ImageFont.FreeTypeFont:
    return _font("JetBrainsMono-Bold.ttf", size)


# ─────────────────────────────────────────────────────────────────────────────
# Drawing Helpers
# ─────────────────────────────────────────────────────────────────────────────

def _text_w(text: str, font: ImageFont.FreeTypeFont) -> int:
    return int(font.getlength(text))

def _draw_tracked(draw: ImageDraw.ImageDraw, xy, text: str,
                  font: ImageFont.FreeTypeFont, fill, track: float):
    """Draw text with letter-spacing."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) * (1 + track)

def _tracked_width(text: str, font: ImageFont.FreeTypeFont, track: float) -> int:
    if not text:
        return 0
    total = sum(font.getlength(ch) * (1 + track) for ch in text[:-1])
    total += font.getlength(text[-1])
    return int(total)

def _cover_resize(im: Image.Image, w: int, h: int) -> Image.Image:
    """Resize-and-crop to fill (w,h) exactly — CSS object-fit: cover."""
    src_w, src_h = im.size
    src_aspect = src_w / src_h
    dst_aspect = w / h
    if src_aspect > dst_aspect:
        new_h = h
        new_w = int(src_w * (h / src_h))
    else:
        new_w = w
        new_h = int(src_h * (w / src_w))
    im = im.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - w) // 2
    top  = (new_h - h) // 2
    return im.crop((left, top, left + w, top + h))

def _fetch_image(url: str) -> Image.Image | None:
    try:
        r = requests.get(url, timeout=20)
        r.raise_for_status()
        return Image.open(BytesIO(r.content)).convert("RGBA")
    except Exception:
        return None

def _draw_dot(draw, cx: int, cy: int, r: int, color=VERMILLION_BRIGHT):
    draw.ellipse([(cx - r, cy - r), (cx + r, cy + r)], fill=color)

def _gradient_overlay(img: Image.Image, direction: str = "bottom",
                      opacity: float = 0.65, color=INK_DEEP) -> Image.Image:
    """Apply a gradient overlay to darken part of the image for text legibility."""
    w, h = img.size
    gradient = Image.new("L", (w, h), 0)

    for y in range(h):
        if direction == "bottom":
            pct = y / h
            alpha = int(min(1.0, pct ** 1.5) * opacity * 255)
        elif direction == "top":
            pct = 1 - (y / h)
            alpha = int(min(1.0, pct ** 1.5) * opacity * 255)
        elif direction == "full":
            alpha = int(opacity * 255)
        else:
            alpha = 0
        for x in range(w):
            gradient.putpixel((x, y), alpha)

    overlay = Image.new("RGBA", (w, h), color + (255,))
    # Use a more efficient approach for the gradient
    result = img.copy().convert("RGBA")
    overlay.putalpha(gradient)
    result = Image.alpha_composite(result, overlay)
    return result

def _gradient_overlay_fast(img: Image.Image, direction: str = "bottom",
                           opacity: float = 0.65, color=INK_DEEP) -> Image.Image:
    """Faster gradient overlay using column-based approach."""
    w, h = img.size
    result = img.copy().convert("RGBA")

    # Create gradient as a 1-pixel wide strip then resize
    strip = Image.new("L", (1, h), 0)
    for y in range(h):
        if direction == "bottom":
            pct = y / h
            alpha = int(min(1.0, pct ** 1.5) * opacity * 255)
        elif direction == "top":
            pct = 1 - (y / h)
            alpha = int(min(1.0, pct ** 1.5) * opacity * 255)
        elif direction == "center_out":
            # Gradient from center outwards — lighter in middle
            dist = abs(y - h / 2) / (h / 2)
            alpha = int(min(1.0, dist ** 1.2) * opacity * 255)
        else:
            alpha = int(opacity * 0.4 * 255)
        strip.putpixel((0, y), alpha)

    gradient = strip.resize((w, h), Image.NEAREST)
    overlay = Image.new("RGBA", (w, h), color + (255,))
    overlay.putalpha(gradient)
    return Image.alpha_composite(result, overlay)

def _frosted_glass_bar(img: Image.Image, y_start: int, bar_height: int,
                       tint_color=INK_DEEP, tint_opacity: float = 0.55) -> Image.Image:
    """Draw a frosted glass bar on the image."""
    w, h = img.size
    result = img.copy().convert("RGBA")

    # Extract the bar region and blur it
    bar_region = result.crop((0, y_start, w, min(y_start + bar_height, h)))
    bar_blurred = bar_region.filter(ImageFilter.GaussianBlur(radius=15))

    # Apply tint
    tint = Image.new("RGBA", bar_blurred.size, tint_color + (int(tint_opacity * 255),))
    bar_blurred = Image.alpha_composite(bar_blurred, tint)

    result.paste(bar_blurred, (0, y_start))
    return result

def _load_logo(variant: str = "light", max_height: int = 60) -> Image.Image | None:
    """Load the NakshIQ lockup logo."""
    paths = {
        "light": BRAND_DIR / "final" / "nakshiq-lockup-final-light.png",
        "dark":  BRAND_DIR / "final" / "nakshiq-lockup-final-dark.png",
    }
    p = paths.get(variant)
    if not p or not p.exists():
        return None
    logo = Image.open(p).convert("RGBA")
    ratio = max_height / logo.height
    new_w = int(logo.width * ratio)
    return logo.resize((new_w, max_height), Image.LANCZOS)

def _load_monogram(variant: str = "light", size: int = 80) -> Image.Image | None:
    """Load the NakshIQ monogram (N mark)."""
    paths = {
        "light":     BRAND_DIR / "icon-system" / "monogram" / "nakshiq-monogram-light.png",
        "dark":      BRAND_DIR / "icon-system" / "monogram" / "nakshiq-monogram-dark.png",
        "vermillion": BRAND_DIR / "icon-system" / "monogram" / "nakshiq-monogram-vermillion.png",
    }
    p = paths.get(variant)
    if not p or not p.exists():
        return None
    mono = Image.open(p).convert("RGBA")
    return mono.resize((size, size), Image.LANCZOS)

def _hairline(draw, x1, y, x2, color=BONE, width=1):
    draw.line([(x1, y), (x2, y)], fill=color, width=width)

def _wrap_text(text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    """Word-wrap text to fit within max_width."""
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        if _text_w(test, font) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines or [text]


# ═════════════════════════════════════════════════════════════════════════════
# TEXT OVERLAY STYLES (4 rotating styles)
# ═════════════════════════════════════════════════════════════════════════════

def _style_bold_cinematic(img: Image.Image, dest: dict, size: tuple) -> Image.Image:
    """
    STYLE 0: Bold Cinematic
    Large bold text with dramatic gradient shadow, travel-magazine cover feel.
    Text dominates the lower third with a heavy bottom gradient.
    """
    w, h = size
    name = dest["name"].upper()
    state = (dest.get("state") or "").upper()

    # Apply dramatic bottom gradient
    result = _gradient_overlay_fast(img, "bottom", opacity=0.75)
    draw = ImageDraw.Draw(result)

    # Destination name — big bold Crimson Pro
    name_size = 120 if len(name) <= 12 else (96 if len(name) <= 18 else 72)
    name_font = _crimson(name_size, bold=True)
    lines = _wrap_text(name, name_font, w - 120)

    # Position in lower portion
    line_h = int(name_size * 1.15)
    block_h = line_h * len(lines)
    start_y = h - block_h - (200 if h > 1200 else 140)

    for i, line in enumerate(lines):
        lw = _text_w(line, name_font)
        lx = 60
        ly = start_y + i * line_h
        # Text shadow for depth
        draw.text((lx + 3, ly + 3), line, font=name_font, fill=(0, 0, 0, 160))
        draw.text((lx, ly), line, font=name_font, fill=BONE)

    # Vermillion dot after last line
    last_lw = _text_w(lines[-1], name_font)
    dot_y = start_y + (len(lines) - 1) * line_h + name_size // 2
    _draw_dot(draw, 60 + last_lw + 28, dot_y, 12, VERMILLION_BRIGHT)

    # State label underneath
    if state:
        state_font = _instrument(28)
        state_y = start_y + block_h + 12
        _draw_tracked(draw, (62, state_y), state, state_font, BONE_DIM, 0.35)

    # Thin vermillion accent line
    accent_y = start_y - 30
    draw.rectangle([(60, accent_y), (260, accent_y + 3)], fill=VERMILLION_BRIGHT)

    return result


def _style_minimal_elegant(img: Image.Image, dest: dict, size: tuple) -> Image.Image:
    """
    STYLE 1: Minimal Elegant
    Clean sans-serif text on a frosted glass bar at bottom.
    Understated, modern, premium feel.
    """
    w, h = size
    name = dest["name"]
    state = (dest.get("state") or "")

    bar_height = 180 if h > 1200 else 140
    bar_y = h - bar_height

    # Apply frosted glass bar
    result = _frosted_glass_bar(img, bar_y, bar_height, INK_DEEP, 0.6)
    draw = ImageDraw.Draw(result)

    # Thin vermillion line at top of bar
    draw.rectangle([(0, bar_y), (w, bar_y + 2)], fill=VERMILLION_BRIGHT)

    # Destination name — Instrument Sans (clean, modern)
    name_font = _instrument(52 if len(name) <= 20 else 40)
    name_y = bar_y + (bar_height // 2) - 36
    draw.text((60, name_y), name, font=name_font, fill=BONE)

    # State on the right
    if state:
        state_font = _instrument(24)
        state_text = state.upper()
        sw = _tracked_width(state_text, state_font, 0.30)
        _draw_tracked(draw, (w - sw - 60, name_y + 20), state_text,
                      state_font, BONE_DIM, 0.30)

    # Subtle hairline separator
    sep_y = name_y + 58
    _hairline(draw, 60, sep_y, 200, BONE_DIM, 1)

    # "nakshiq.com" text below separator
    url_font = _jetbrains(16)
    draw.text((60, sep_y + 10), "nakshiq.com", font=url_font, fill=BONE_DIM)

    return result


def _style_typographic_art(img: Image.Image, dest: dict, size: tuple) -> Image.Image:
    """
    STYLE 2: Typographic Art
    The place name IS the design — giant expressive italic typography
    that interacts with the image. Text fills the frame.
    """
    w, h = size
    name = dest["name"].upper()

    # Heavier overall darken for text legibility
    result = _gradient_overlay_fast(img, "bottom", opacity=0.55)
    draw = ImageDraw.Draw(result)

    # Giant typography — fill the width
    # Leave a safer horizontal margin (italic glyphs overshoot PIL's bbox on
    # both ends, so the effective rendered width is ~6% wider than reported).
    target_width = w - 160              # 80px margin each side (was 40)
    italic_safety = 0.92                # keep rendered width ≤ 92% of target
    font_size = 200
    font = _crimson(font_size, bold=True)

    # Scale font to fill width
    lines = _wrap_text(name, font, target_width)
    while (len(lines) == 1
           and _text_w(name, font) < target_width * 0.72   # was 0.8
           and font_size < 320):
        font_size += 10
        font = _crimson(font_size, bold=True)
        lines = _wrap_text(name, font, target_width)

    # If too wide (any line), scale down. Compare against the italic-safe cap
    # so descenders/serifs don't clip the slide edges.
    safe_w = int(target_width * italic_safety)
    while (max((_text_w(l, font) for l in lines), default=0) > safe_w
           and font_size > 80):
        font_size -= 5
        font = _crimson(font_size, bold=True)
        lines = _wrap_text(name, font, target_width)

    line_h = int(font_size * 1.05)
    block_h = line_h * len(lines)

    # Center vertically, slightly below middle
    start_y = (h - block_h) // 2 + (h // 20)

    for i, line in enumerate(lines):
        lw = _text_w(line, font)
        lx = (w - lw) // 2
        ly = start_y + i * line_h

        # Subtle text shadow
        draw.text((lx + 4, ly + 4), line, font=font, fill=(0, 0, 0, 100))
        draw.text((lx, ly), line, font=font, fill=BONE)

    # Vermillion dot centered below text
    dot_y = start_y + block_h + 30
    _draw_dot(draw, w // 2, dot_y, 10, VERMILLION_BRIGHT)

    # Small "INDIA" label above
    label_font = _instrument(22)
    label = "INDIA"
    lw = _tracked_width(label, label_font, 0.50)
    _draw_tracked(draw, ((w - lw) // 2, start_y - 50), label,
                  label_font, VERMILLION_BRIGHT, 0.50)

    return result


def _style_info_card(img: Image.Image, dest: dict, size: tuple) -> Image.Image:
    """
    STYLE 3: Info Card
    Structured layout: name + state + tagline + score.
    More informational, Pinterest/carousel friendly.
    """
    w, h = size
    name = dest["name"]
    state = (dest.get("state") or "").upper()
    score = dest.get("score", 0)
    elevation = dest.get("elevation_m", 0)

    # Card-style: darken more heavily for readability
    result = _gradient_overlay_fast(img, "bottom", opacity=0.70)
    draw = ImageDraw.Draw(result)

    # Card area in lower portion
    card_top = h - (420 if h > 1200 else 320)

    # Hairline-flanked "DESTINATION" eyebrow
    eye_font = _instrument(18)
    eye_text = "DESTINATION"
    ew = _tracked_width(eye_text, eye_font, 0.50)
    eye_x = 60
    eye_y = card_top
    _draw_tracked(draw, (eye_x, eye_y), eye_text, eye_font, VERMILLION_BRIGHT, 0.50)
    _hairline(draw, eye_x + ew + 16, eye_y + 10, eye_x + ew + 120, VERMILLION_BRIGHT, 1)

    # Destination name
    name_font = _crimson(80 if len(name) <= 16 else 64, bold=True)
    name_y = eye_y + 40
    lines = _wrap_text(name, name_font, w - 120)
    line_h = int(name_font.size * 1.1)

    for i, line in enumerate(lines):
        draw.text((60, name_y + i * line_h), line, font=name_font, fill=BONE)

    block_bottom = name_y + len(lines) * line_h

    # Score + State + Elevation row
    meta_y = block_bottom + 16

    if score:
        score_font = _jetbrains(42)
        score_text = f"{score}/5"
        draw.text((60, meta_y), score_text, font=score_font, fill=BONE)
        sw = _text_w(score_text, score_font)
        _draw_dot(draw, 60 + sw + 16, meta_y + 22, 7, VERMILLION_BRIGHT)
        meta_x = 60 + sw + 40
    else:
        meta_x = 60

    meta_font = _instrument(22)
    meta_parts = []
    if state:
        meta_parts.append(state)
    if elevation:
        meta_parts.append(f"{elevation:,}M")
    meta_text = "  ·  ".join(meta_parts)
    _draw_tracked(draw, (meta_x, meta_y + 12), meta_text, meta_font, BONE_DIM, 0.15)

    # Hairline at the bottom
    _hairline(draw, 60, meta_y + 60, w - 60, BONE_DIM, 1)

    return result


STYLE_RENDERERS = [
    _style_bold_cinematic,
    _style_minimal_elegant,
    _style_typographic_art,
    _style_info_card,
]

STYLE_NAMES = [
    "bold-cinematic",
    "minimal-elegant",
    "typographic-art",
    "info-card",
]


# ═════════════════════════════════════════════════════════════════════════════
# BRANDING PLACEMENTS (3 rotating variants)
# ═════════════════════════════════════════════════════════════════════════════

def _brand_watermark(img: Image.Image, size: tuple) -> Image.Image:
    """
    BRANDING 0: Subtle Watermark
    Small monogram in the top-right corner, slightly transparent.
    """
    result = img.copy()
    mono = _load_monogram("light", size=56)
    if mono:
        # Make semi-transparent
        alpha = mono.split()[3]
        alpha = alpha.point(lambda p: int(p * 0.7))
        mono.putalpha(alpha)
        w, h = size
        result.paste(mono, (w - 56 - 30, 30), mono)
    return result


def _brand_footer_bar(img: Image.Image, size: tuple) -> Image.Image:
    """
    BRANDING 1: Branded Footer Bar
    Thin Ink Deep strip at the very bottom with logo + tagline.
    """
    w, h = size
    result = img.copy()
    draw = ImageDraw.Draw(result)

    bar_h = 48
    bar_y = h - bar_h

    # Solid bar
    draw.rectangle([(0, bar_y), (w, h)], fill=INK_DEEP + (240,))

    # Vermillion top edge
    draw.rectangle([(0, bar_y), (w, bar_y + 2)], fill=VERMILLION_BRIGHT + (255,))

    # Logo on left
    logo = _load_logo("light", max_height=28)
    if logo:
        result.paste(logo, (24, bar_y + 10), logo)
        text_x = 24 + logo.width + 16
    else:
        text_x = 24

    # Tagline on right
    tag_font = _instrument(14)
    tagline = "TRAVEL WITH CONFIDENCE"
    tw = _tracked_width(tagline, tag_font, 0.30)
    _draw_tracked(draw, (w - tw - 24, bar_y + 17), tagline, tag_font, BONE_DIM, 0.30)

    return result


def _brand_badge(img: Image.Image, size: tuple) -> Image.Image:
    """
    BRANDING 2: Integrated Badge
    A small branded badge/stamp element in the top-left that feels
    part of the design. Circular monogram with a subtle ring.
    """
    result = img.copy()
    draw = ImageDraw.Draw(result)

    badge_x, badge_y = 36, 36
    badge_r = 32

    # Draw subtle ring
    draw.ellipse(
        [(badge_x - badge_r - 3, badge_y - badge_r - 3),
         (badge_x + badge_r + 3, badge_y + badge_r + 3)],
        outline=BONE + (120,), width=1
    )

    # Dark circle background
    draw.ellipse(
        [(badge_x - badge_r, badge_y - badge_r),
         (badge_x + badge_r, badge_y + badge_r)],
        fill=INK_DEEP + (200,)
    )

    # "N" monogram centered in badge
    n_font = _crimson(36, bold=True)
    n_w = _text_w("N", n_font)
    draw.text((badge_x - n_w // 2, badge_y - 22), "N", font=n_font, fill=BONE)

    # Vermillion dot
    _draw_dot(draw, badge_x + badge_r - 6, badge_y - badge_r + 8, 4, VERMILLION_BRIGHT)

    return result


BRAND_RENDERERS = [
    _brand_watermark,
    _brand_footer_bar,
    _brand_badge,
]

BRAND_NAMES = [
    "watermark",
    "footer-bar",
    "badge",
]


# ═════════════════════════════════════════════════════════════════════════════
# FALLBACK IMAGE GENERATOR (when no photo available)
# ═════════════════════════════════════════════════════════════════════════════

def _generate_fallback_image(dest: dict, size: tuple) -> Image.Image:
    """
    Generate a branded fallback image when no photo URL is available.
    Uses Topo Green base with topographic-style pattern lines.
    """
    w, h = size
    img = Image.new("RGBA", (w, h), TOPO_GREEN + (255,))
    draw = ImageDraw.Draw(img)

    # Generate deterministic pattern from destination name
    seed = int(hashlib.md5(dest["name"].encode()).hexdigest()[:8], 16)

    # Draw subtle topographic-style curved lines
    for i in range(12):
        offset = (seed + i * 137) % 200
        y_base = (h * (i + 1)) // 14
        points = []
        for x in range(0, w + 40, 40):
            y = y_base + int(math.sin((x + offset) * 0.008) * 60 +
                             math.cos((x + offset) * 0.005) * 30)
            points.append((x, y))
        if len(points) >= 2:
            # Slightly different topo green for lines
            line_color = (57, 89, 73, 60)
            draw.line(points, fill=line_color, width=1)

    return img


# ═════════════════════════════════════════════════════════════════════════════
# MAIN GENERATOR
# ═════════════════════════════════════════════════════════════════════════════

def fetch_destinations() -> list[dict]:
    """Fetch all destinations from the NakshIQ API across all 12 months."""
    print("Fetching destinations from API (all months)...")
    all_dests: dict[str, dict] = {}
    try:
        for month in range(1, 13):
            r = requests.get(API_URL, params={
                "type": "destinations",
                "month": month,
                "min_score": 0,
                "limit": 300,
            }, timeout=15)
            r.raise_for_status()
            data = r.json().get("data", [])
            for dest in data:
                all_dests[dest["name"]] = dest
            print(f"  Month {month:2d}: {len(data)} fetched  "
                  f"(cumulative unique: {len(all_dests)})")

        destinations = list(all_dests.values())
        print(f"  Total unique: {len(destinations)} destinations")
        return destinations
    except Exception as e:
        print(f"  Error fetching: {e}")
        return []


def generate_destination_images(
    dest: dict,
    index: int,
    style_override: int | None = None,
    brand_override: int | None = None,
    regenerate: bool = False,
) -> list[Path]:
    """Generate feed + story images for a single destination."""
    name = dest.get("name", "Unknown")
    slug = name.lower().replace(" ", "-").replace("'", "").replace(",", "")
    state_code = (dest.get("state_code") or dest.get("state", "")[:2]).upper()

    # Determine style and branding rotation
    style_idx = style_override if style_override is not None else (index % 4)
    brand_idx = brand_override if brand_override is not None else (index % 3)

    style_name = STYLE_NAMES[style_idx]
    brand_name = BRAND_NAMES[brand_idx]

    # Output directory
    dest_dir = OUTPUT_DIR / f"{slug}_{state_code}" if state_code else OUTPUT_DIR / slug
    dest_dir.mkdir(parents=True, exist_ok=True)

    feed_path  = dest_dir / f"{slug}_feed_{style_name}_{brand_name}.jpg"
    story_path = dest_dir / f"{slug}_story_{style_name}_{brand_name}.jpg"

    if not regenerate and feed_path.exists() and story_path.exists():
        print(f"  [{index:03d}] {name} — already exists, skipping")
        return [feed_path, story_path]

    # Fetch or generate base image
    img_url = dest.get("image") or dest.get("hero_image")
    base_img = None
    if img_url:
        base_img = _fetch_image(img_url)

    outputs = []
    for size, label, out_path in [(FEED_SIZE, "feed", feed_path),
                                   (STORY_SIZE, "story", story_path)]:
        w, h = size

        # Prepare base
        if base_img:
            canvas = _cover_resize(base_img.copy(), w, h)
        else:
            canvas = _generate_fallback_image(dest, size)

        # Apply text overlay style
        canvas = STYLE_RENDERERS[style_idx](canvas, dest, size)

        # Apply branding
        canvas = BRAND_RENDERERS[brand_idx](canvas, size)

        # Save as JPEG
        final = canvas.convert("RGB")
        final.save(str(out_path), "JPEG", quality=92, optimize=True)
        outputs.append(out_path)

    print(f"  [{index:03d}] {name} — {style_name} + {brand_name} ✓")
    return outputs


def generate_manifest(destinations: list[dict], all_outputs: dict) -> Path:
    """Generate a manifest.json for the image library."""
    manifest = {
        "meta": {
            "description": "NakshIQ Social Media Destination Image Library",
            "version": 1,
            "total_destinations": len(destinations),
            "formats": ["feed_1080x1080", "story_1080x1920"],
            "styles": STYLE_NAMES,
            "brandings": BRAND_NAMES,
        },
        "images": []
    }

    for dest_name, paths in all_outputs.items():
        entry = {
            "destination": dest_name,
            "files": [str(p.relative_to(OUTPUT_DIR)) for p in paths],
        }
        manifest["images"].append(entry)

    manifest_path = OUTPUT_DIR / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2))
    return manifest_path


def main():
    parser = argparse.ArgumentParser(description="NakshIQ Destination Image Library Generator")
    parser.add_argument("--limit", type=int, help="Limit to first N destinations")
    parser.add_argument("--dest", type=str, help="Generate for a single destination name")
    parser.add_argument("--style", type=int, choices=[0, 1, 2, 3],
                        help="Force a specific text style (0-3)")
    parser.add_argument("--branding", type=int, choices=[0, 1, 2],
                        help="Force a specific branding variant (0-2)")
    parser.add_argument("--regenerate", action="store_true",
                        help="Overwrite existing images")
    parser.add_argument("--dry-run", action="store_true",
                        help="Show what would be generated without creating images")
    args = parser.parse_args()

    print("╔══════════════════════════════════════════════╗")
    print("║  NakshIQ Social Image Library Generator      ║")
    print("╚══════════════════════════════════════════════╝")
    print()

    destinations = fetch_destinations()
    if not destinations:
        print("No destinations found. Exiting.")
        sys.exit(1)

    # Filter
    if args.dest:
        destinations = [d for d in destinations
                        if args.dest.lower() in d.get("name", "").lower()]
        if not destinations:
            print(f"No destination matching '{args.dest}' found.")
            sys.exit(1)

    if args.limit:
        destinations = destinations[:args.limit]

    print(f"\nGenerating images for {len(destinations)} destinations")
    print(f"  Styles:    {', '.join(STYLE_NAMES)}")
    print(f"  Brandings: {', '.join(BRAND_NAMES)}")
    print(f"  Formats:   1080×1080 (feed) + 1080×1920 (story)")
    print(f"  Output:    {OUTPUT_DIR}")
    print()

    if args.dry_run:
        for i, dest in enumerate(destinations):
            s = args.style if args.style is not None else (i % 4)
            b = args.branding if args.branding is not None else (i % 3)
            has_img = "✓" if dest.get("image") else "✗"
            print(f"  [{i:03d}] {dest['name']:30s} img={has_img}  "
                  f"style={STYLE_NAMES[s]:20s}  brand={BRAND_NAMES[b]}")
        print(f"\n  Total: {len(destinations)} destinations × 2 formats = "
              f"{len(destinations) * 2} images")
        return

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    all_outputs = {}
    generated = 0
    failed = 0

    for i, dest in enumerate(destinations):
        try:
            paths = generate_destination_images(
                dest, i,
                style_override=args.style,
                brand_override=args.branding,
                regenerate=args.regenerate,
            )
            all_outputs[dest.get("name", f"dest_{i}")] = paths
            generated += 1
        except Exception as e:
            print(f"  [{i:03d}] {dest.get('name', '?')} — FAILED: {e}")
            failed += 1

    # Generate manifest
    manifest_path = generate_manifest(destinations, all_outputs)

    print()
    print("═" * 50)
    print(f"  Generated: {generated} destinations ({generated * 2} images)")
    if failed:
        print(f"  Failed:    {failed}")
    print(f"  Manifest:  {manifest_path}")
    print(f"  Output:    {OUTPUT_DIR}")
    print("═" * 50)


if __name__ == "__main__":
    main()
