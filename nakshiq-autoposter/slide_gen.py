"""
Nakshiq branded slide generator for carousel posts.

Renders 1080×1080 JPEG slides following the locked Nakshiq Visual Identity:
  - Ink Deep (#161614) backgrounds, Bone (#F5F1E8) text, Vermillion Bright dot
  - Crimson Pro Italic for display (destination names, titles)
  - Instrument Sans Bold (tracked) for labels and taglines
  - JetBrains Mono Bold for scores and numeric data
  - Hairline-flanked layouts, no drop shadows or bevels

Usage:
  from slide_gen import build_carousel_slides
  paths = build_carousel_slides("data_carousel", content, destinations, Path("/tmp/out"))

Each slide function returns a PIL.Image; build_carousel_slides writes JPGs.
"""
from __future__ import annotations

from datetime import datetime
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image, ImageDraw, ImageFont

# ─────────────────────────────────────────────────────────────────────────────
# Constants
# ─────────────────────────────────────────────────────────────────────────────

ASSETS     = Path(__file__).parent / "assets"
FONTS_DIR  = ASSETS / "fonts"
SLIDE_SIZE = 1080

# Brand colors (from Branding/02_Visual_Identity.md)
INK_DEEP          = (22, 22, 20)       # #161614 — app icon / dark surfaces
INK               = (14, 14, 12)       # #0E0E0C — body text on light
BONE              = (245, 241, 232)    # #F5F1E8 — body background
VERMILLION        = (212, 63, 42)      # #D43F2A — accent on light
VERMILLION_BRIGHT = (229, 86, 66)      # #E55642 — accent on dark (what we use)
TOPO_GREEN        = (47, 79, 63)       # #2F4F3F — score accents / fallback fill
SAFFRON_GOLD      = (200, 147, 47)     # #C8932F — rare editorial accent

BONE_DIM          = (200, 196, 186)    # slightly dimmed Bone for secondary text


# ─────────────────────────────────────────────────────────────────────────────
# Font helpers
# ─────────────────────────────────────────────────────────────────────────────

def _font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS_DIR / name), size)

def _crimson_italic(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    return _font("CrimsonPro-BoldItalic.ttf" if bold else "CrimsonPro-Italic.ttf", size)

def _instrument(size: int) -> ImageFont.FreeTypeFont:
    return _font("InstrumentSans-Bold.ttf", size)

def _jetbrains(size: int) -> ImageFont.FreeTypeFont:
    return _font("JetBrainsMono-Bold.ttf", size)


# ─────────────────────────────────────────────────────────────────────────────
# Layout helpers
# ─────────────────────────────────────────────────────────────────────────────

def _text_width(text: str, font: ImageFont.FreeTypeFont) -> int:
    """Plain text width (no tracking)."""
    return int(font.getlength(text))

def _text_width_tracked(text: str, font: ImageFont.FreeTypeFont, track: float) -> int:
    """Width including added letter-spacing. track=0.3 means +30% per char gap."""
    if not text:
        return 0
    total = 0.0
    for ch in text:
        total += font.getlength(ch)
    # add (n-1) gaps of tracking
    gap = sum(font.getlength(ch) for ch in text[:-1]) * track
    return int(total + gap)

def _draw_tracked(draw: ImageDraw.ImageDraw, xy, text: str,
                  font: ImageFont.FreeTypeFont, fill, track: float):
    """Draw text with letter-spacing (tracking)."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) * (1 + track)

def _hairline(draw, x1, y, x2, color=BONE, width=1):
    draw.line([(x1, y), (x2, y)], fill=color, width=width)

def _cover_resize(im: Image.Image, w: int, h: int) -> Image.Image:
    """Resize-and-crop to fill (w,h) exactly. Like CSS object-fit: cover."""
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

def _fetch_image(url: str) -> Image.Image:
    r = requests.get(url, timeout=20)
    r.raise_for_status()
    return Image.open(BytesIO(r.content)).convert("RGB")

def _draw_dot(draw, cx: int, cy: int, r: int, color=VERMILLION_BRIGHT):
    draw.ellipse([(cx - r, cy - r), (cx + r, cy + r)], fill=color)


# ─────────────────────────────────────────────────────────────────────────────
# Slide renderers
# ─────────────────────────────────────────────────────────────────────────────

def render_title_slide(title: str, subtitle: str = "", eyebrow: str = "NAKSHIQ") -> Image.Image:
    """Slide 1 of a carousel: eyebrow + big title + optional subtitle + hairline tagline."""
    img  = Image.new("RGB", (SLIDE_SIZE, SLIDE_SIZE), INK_DEEP)
    draw = ImageDraw.Draw(img)

    # EYEBROW — small tracked-out Instrument Sans
    eye_font  = _instrument(22)
    eye_w     = _text_width_tracked(eyebrow, eye_font, 0.30)
    eye_x     = (SLIDE_SIZE - eye_w) // 2
    eye_y     = 180
    _draw_tracked(draw, (eye_x, eye_y), eyebrow, eye_font, BONE_DIM, 0.30)

    # TITLE — Crimson Pro Bold Italic, large
    # Wrap long titles onto two lines by space if needed; auto-shrink font size
    # so long single words (e.g. "DESTINATIONS") never overflow the slide width.
    max_title_w = SLIDE_SIZE - 160
    title_size  = 148
    title_font  = _crimson_italic(title_size, bold=True)
    title_lines = _wrap_title(title, title_font, max_title_w)
    while (max((_text_width(l, title_font) for l in title_lines), default=0) > max_title_w
           and title_size > 64):
        title_size -= 8
        title_font  = _crimson_italic(title_size, bold=True)
        title_lines = _wrap_title(title, title_font, max_title_w)
    # Recompute height
    line_h = int(title_font.size * 1.05)
    block_h = line_h * len(title_lines)
    block_top = (SLIDE_SIZE - block_h) // 2 - 40

    for idx, line in enumerate(title_lines):
        lw = _text_width(line, title_font)
        lx = (SLIDE_SIZE - lw) // 2
        ly = block_top + idx * line_h
        draw.text((lx, ly), line, font=title_font, fill=BONE)
        # Vermillion dot after the last line only
        if idx == len(title_lines) - 1:
            dot_r = 14
            _draw_dot(draw, lx + lw + 28, ly + line_h - 38, dot_r, VERMILLION_BRIGHT)

    # SUBTITLE — Crimson Pro italic (non-bold), smaller
    if subtitle:
        sub_font = _crimson_italic(52, bold=False)
        sub_w    = _text_width(subtitle, sub_font)
        sub_x    = (SLIDE_SIZE - sub_w) // 2
        sub_y    = block_top + block_h + 20
        draw.text((sub_x, sub_y), subtitle, font=sub_font, fill=BONE_DIM)

    # HAIRLINE-FLANKED TAGLINE at bottom
    tagline   = "TRAVEL WITH IQ"
    tl_font   = _instrument(22)
    tl_w      = _text_width_tracked(tagline, tl_font, 0.50)
    tl_x      = (SLIDE_SIZE - tl_w) // 2
    tl_y      = SLIDE_SIZE - 120
    _draw_tracked(draw, (tl_x, tl_y), tagline, tl_font, BONE, 0.50)
    hl_gap, hl_len = 28, 120
    _hairline(draw, tl_x - hl_gap - hl_len, tl_y + 13, tl_x - hl_gap, BONE, 1)
    _hairline(draw, tl_x + tl_w + hl_gap, tl_y + 13, tl_x + tl_w + hl_gap + hl_len, BONE, 1)

    return img


def render_destination_slide(dest: dict, index: int, total: int,
                             image_url_override: str | None = None) -> Image.Image:
    """
    Destination card:
      - Hero image fills top 62% (1080 × 670)
      - Hairline separator in Vermillion Bright
      - Data band bottom 38% with name + score + elevation + state
    """
    img  = Image.new("RGB", (SLIDE_SIZE, SLIDE_SIZE), INK_DEEP)
    draw = ImageDraw.Draw(img)

    hero_h = 670

    # HERO IMAGE (or graceful fallback)
    img_url = image_url_override or dest.get("image")
    hero_placed = False
    if img_url:
        try:
            hero = _fetch_image(img_url)
            hero = _cover_resize(hero, SLIDE_SIZE, hero_h)
            img.paste(hero, (0, 0))
            hero_placed = True
        except Exception:
            pass
    if not hero_placed:
        # Fallback: Topographic Green monochrome with centered destination name
        draw.rectangle([(0, 0), (SLIDE_SIZE, hero_h)], fill=TOPO_GREEN)

    # Subtle dark gradient at bottom of image for legibility where text might approach
    gradient = Image.new("L", (1, hero_h))
    for y in range(hero_h):
        # black at bottom, transparent at top 80%
        pct = max(0, (y - int(hero_h * 0.70))) / max(1, int(hero_h * 0.30))
        gradient.putpixel((0, y), int(min(1.0, pct) * 110))
    gradient = gradient.resize((SLIDE_SIZE, hero_h))
    overlay  = Image.new("RGB", (SLIDE_SIZE, hero_h), INK_DEEP)
    img.paste(overlay, (0, 0), gradient)

    # HAIRLINE separator (Vermillion Bright, 3px for visibility)
    draw.rectangle([(0, hero_h - 2), (SLIDE_SIZE, hero_h + 1)], fill=VERMILLION_BRIGHT)

    # NUMBER BADGE (top-right of image)
    badge_text = f"{index:02d} / {total:02d}"
    badge_font = _instrument(26)
    badge_w    = _text_width_tracked(badge_text, badge_font, 0.20)
    pad        = 20
    bx2 = SLIDE_SIZE - 40
    bx1 = bx2 - badge_w - 2 * pad
    by1 = 40
    by2 = by1 + 58
    draw.rectangle([(bx1, by1), (bx2, by2)], fill=INK_DEEP)
    _draw_tracked(draw, (bx1 + pad, by1 + 14), badge_text, badge_font, BONE, 0.20)

    # DATA BAND bottom 38%
    band_top = hero_h + 2

    # Destination name — Crimson Pro Bold Italic, large
    name_font = _crimson_italic(88, bold=True)
    name_text = dest["name"]
    # If the name is wide, shrink
    while _text_width(name_text, name_font) > SLIDE_SIZE - 120 and name_font.size > 48:
        name_font = _crimson_italic(name_font.size - 6, bold=True)
    name_y = band_top + 30
    draw.text((60, name_y), name_text, font=name_font, fill=BONE)

    # Score — JetBrains Mono Bold with vermillion dot
    score      = dest.get("score", 0)
    elev       = dest.get("elevation_m", 0)
    state      = (dest.get("state") or "").upper()

    score_font  = _jetbrains(64)
    score_text  = f"{score}/5"
    score_w     = _text_width(score_text, score_font)
    score_y     = name_y + name_font.size + 28
    draw.text((60, score_y), score_text, font=score_font, fill=BONE)
    # Vermillion period dot after score
    _draw_dot(draw, 60 + score_w + 22, score_y + score_font.size - 20, 9, VERMILLION_BRIGHT)

    # Elevation + state — Instrument Sans Bold, tracked
    meta_parts = []
    if elev:
        meta_parts.append(f"↑ {elev:,}M")
    if state:
        meta_parts.append(state)
    meta_text = "   ·   ".join(meta_parts)
    meta_font = _instrument(24)
    meta_y    = score_y + score_font.size + 22
    _draw_tracked(draw, (60, meta_y), meta_text, meta_font, BONE_DIM, 0.15)

    return img


def render_cta_slide(headline: str, url: str,
                     closing: str = "Go with confidence.") -> Image.Image:
    """Closing slide: N. monogram, headline, URL, Crimson italic closing line."""
    img  = Image.new("RGB", (SLIDE_SIZE, SLIDE_SIZE), INK_DEEP)
    draw = ImageDraw.Draw(img)

    # N. MONOGRAM (Crimson Pro Bold Italic + vermillion dot)
    mono_font = _crimson_italic(240, bold=True)
    mono_w    = _text_width("N", mono_font)
    mono_y    = 180
    mono_x    = (SLIDE_SIZE - mono_w - 40) // 2   # reserve space for dot
    draw.text((mono_x, mono_y), "N", font=mono_font, fill=BONE)
    _draw_dot(draw, mono_x + mono_w + 20, mono_y + int(mono_font.size * 0.90),
              16, VERMILLION_BRIGHT)

    # HEADLINE — Instrument Sans tracked
    hd_font = _instrument(28)
    hd_w    = _text_width_tracked(headline, hd_font, 0.30)
    hd_x    = (SLIDE_SIZE - hd_w) // 2
    hd_y    = 540
    _draw_tracked(draw, (hd_x, hd_y), headline, hd_font, BONE, 0.30)

    # URL — JetBrains Mono Bold
    url_font = _jetbrains(32)
    url_w    = _text_width(url, url_font)
    url_y    = hd_y + 70
    draw.text(((SLIDE_SIZE - url_w) // 2, url_y), url, font=url_font, fill=BONE_DIM)

    # Hairline beneath URL
    _hairline(draw, SLIDE_SIZE // 2 - 120, url_y + 70,
              SLIDE_SIZE // 2 + 120, VERMILLION_BRIGHT, 1)

    # CLOSING LINE — Crimson Pro italic
    cl_font = _crimson_italic(44, bold=False)
    cl_w    = _text_width(closing, cl_font)
    cl_y    = SLIDE_SIZE - 180
    draw.text(((SLIDE_SIZE - cl_w) // 2, cl_y), closing, font=cl_font, fill=BONE)

    return img


# ─────────────────────────────────────────────────────────────────────────────
# Word-wrap helper for titles
# ─────────────────────────────────────────────────────────────────────────────

def _wrap_title(text: str, font: ImageFont.FreeTypeFont, max_w: int) -> list[str]:
    """Wrap a title across at most 2 lines. Splits on spaces; hard-caps long words."""
    if _text_width(text, font) <= max_w:
        return [text]
    words = text.split()
    best_split = None
    for i in range(1, len(words)):
        a = " ".join(words[:i])
        b = " ".join(words[i:])
        if _text_width(a, font) <= max_w and _text_width(b, font) <= max_w:
            # prefer the split that balances line widths
            delta = abs(_text_width(a, font) - _text_width(b, font))
            if best_split is None or delta < best_split[0]:
                best_split = (delta, (a, b))
    if best_split:
        return list(best_split[1])
    # fallback: truncate
    return [text]


# ─────────────────────────────────────────────────────────────────────────────
# Public API: build a full carousel
# ─────────────────────────────────────────────────────────────────────────────

def build_carousel_slides(fmt: str, content: dict, destinations: list,
                          out_dir: Path) -> list[Path]:
    """
    Render all slides for a carousel format as 1080×1080 JPEGs.
    Returns list of file paths in order (title → destinations → CTA).

    Supported formats: data_carousel, monthly_forecast, collection_spotlight.
    """
    out_dir.mkdir(parents=True, exist_ok=True)
    slides: list[Path] = []

    if not destinations:
        return slides

    month_now = datetime.now().strftime("%B").upper()

    if fmt == "data_carousel":
        title    = f"{month_now}'S 5/5"
        subtitle = "DESTINATIONS"
        cta_head = f"FULL {month_now} SCORES"
        cta_url  = "nakshiq.com/en/explore"
    elif fmt == "monthly_forecast":
        title    = f"{month_now} FORECAST"
        subtitle = "NakshIQ Monthly"
        cta_head = "SCORES RESET EVERY MONTH"
        cta_url  = "nakshiq.com/en/explore"
    elif fmt == "collection_spotlight":
        coll     = content.get("__run_collection__") or {}
        raw_name = coll.get("name", "COLLECTION")
        # Take text before em-dash for cleaner title
        title    = raw_name.split("—")[0].strip().upper()[:26] or "COLLECTION"
        subtitle = "Collection"
        cta_head = f"{coll.get('itemCount', len(destinations))} DESTINATIONS · ALL SCORED"
        cta_url  = (coll.get("url") or "nakshiq.com/en/collections").replace("https://", "").replace("http://", "")
    else:
        return slides

    n = len(destinations)

    # Title slide
    title_img  = render_title_slide(title, subtitle)
    title_path = out_dir / f"{fmt}_01_title.jpg"
    title_img.save(title_path, "JPEG", quality=92, optimize=True)
    slides.append(title_path)

    # Destination slides
    for i, d in enumerate(destinations, start=1):
        img  = render_destination_slide(d, i, n)
        path = out_dir / f"{fmt}_{i+1:02d}_{d['id']}.jpg"
        img.save(path, "JPEG", quality=92, optimize=True)
        slides.append(path)

    # CTA slide
    cta_img  = render_cta_slide(cta_head, cta_url)
    cta_path = out_dir / f"{fmt}_{n+2:02d}_cta.jpg"
    cta_img.save(cta_path, "JPEG", quality=92, optimize=True)
    slides.append(cta_path)

    return slides
