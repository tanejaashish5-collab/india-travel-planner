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


# Devanagari support — Noto Sans Devanagari ships in assets/fonts/ so CI
# (where macOS system fonts are unavailable) can still render Hindi formats.
# CrimsonPro / Instrument / JetBrains have ZERO Devanagari glyphs — using
# them on Hindi text produces tofu (.notdef) boxes.
def _devanagari(size: int) -> ImageFont.FreeTypeFont:
    return _font("NotoSansDevanagari-Bold.ttf", size)


# Match any Devanagari codepoint (U+0900–U+097F + extended).
import re as _re
_DEVANAGARI_RE = _re.compile(r"[ऀ-ॿ꣠-ꣿ]")


def _has_devanagari(text: str) -> bool:
    """True when the text contains Devanagari script. The display-text
    renderers use this to swap CrimsonPro → NotoSansDevanagari and avoid
    tofu boxes."""
    return bool(text) and bool(_DEVANAGARI_RE.search(text))


def _display_font(size: int, text: str, bold: bool = True) -> ImageFont.FreeTypeFont:
    """Pick the right display font for `text`. CrimsonPro Italic by default;
    NotoSansDevanagari when the text has any Devanagari character."""
    if _has_devanagari(text):
        return _devanagari(size)
    return _crimson_italic(size, bold=bold)


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


# ─────────────────────────────────────────────────────────────────────────────
# CSV-format renderer (v2/v3/v4) — used when no static asset on disk
# ─────────────────────────────────────────────────────────────────────────────
#
# The legacy carousel renderer above only knows 3 format_ids. The 38 v2/v3/v4
# CSV formats need their own renderer that reads the FormatSpec + destination
# dict + run-scoped extras and composites text-on-photo at post time. This
# removes the dependency on pre-rendered static assets in social_image_library/
# for `post_type in (single, carousel)` formats — reels/yt_shorts still need
# their own video pipeline.

CSV_PORTRAIT_W = 1080
CSV_PORTRAIT_H = 1350     # 4:5 IG-portrait
CSV_SQUARE     = 1080

R2_HERO_BASE = "https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev/destinations"


def _r2_hero_url(dest: dict) -> str | None:
    """Build the R2 hero URL for a dest. Returns None if dest has no slug."""
    slug = (dest.get("id") or dest.get("slug") or "").lower().strip()
    if not slug:
        return None
    # Prefer an explicit image_url on the dest if present (some content sources
    # ship a fully-qualified URL); else build the canonical R2 path.
    return dest.get("image") or dest.get("image_url") or f"{R2_HERO_BASE}/{slug}.jpg"


def _fetch_hero(dest: dict, w: int, h: int) -> Image.Image:
    """Fetch + crop the dest's hero. Falls back to a Topo-Green solid fill so
    we never crash a render over a missing photo. Always returns an image."""
    url = _r2_hero_url(dest)
    if url:
        try:
            hero = _fetch_image(url)
            return _cover_resize(hero, w, h)
        except Exception:
            pass
    fill = Image.new("RGB", (w, h), TOPO_GREEN)
    return fill


def _bottom_gradient(im: Image.Image, height_pct: float = 0.55,
                     alpha_max: int = 200) -> None:
    """Paint a bottom-up dark gradient onto `im` so light text reads on busy
    photo backgrounds. In-place mutate. height_pct = how much of the image the
    gradient covers from the bottom up (0–1)."""
    w, h = im.size
    band_h = int(h * height_pct)
    grad = Image.new("L", (1, band_h))
    for y in range(band_h):
        pct = y / max(1, band_h - 1)        # 0 at top of band, 1 at bottom
        grad.putpixel((0, y), int(alpha_max * (pct ** 1.4)))
    grad = grad.resize((w, band_h))
    dark = Image.new("RGB", (w, band_h), INK_DEEP)
    im.paste(dark, (0, h - band_h), grad)


def _wrap_to_width(text: str, font: ImageFont.FreeTypeFont,
                   max_w: int, max_lines: int = 3) -> list[str]:
    """Greedy word-wrap. Truncates to max_lines (last line ends with '…')."""
    words = text.split()
    lines, cur = [], ""
    for w in words:
        candidate = (cur + " " + w).strip()
        if _text_width(candidate, font) <= max_w:
            cur = candidate
            continue
        if cur:
            lines.append(cur)
        cur = w
        if len(lines) >= max_lines:
            break
    if cur and len(lines) < max_lines:
        lines.append(cur)
    if len(lines) >= max_lines:
        last = lines[-1]
        while last and _text_width(last + "…", font) > max_w:
            last = last[:-1]
        lines[-1] = (last or "").rstrip() + "…"
    return lines


def _draw_wrapped(draw: ImageDraw.ImageDraw, lines: list[str],
                  x: int, y: int, font: ImageFont.FreeTypeFont, fill,
                  line_height_mult: float = 1.12) -> int:
    """Draw wrapped lines top-aligned at (x,y). Returns the y after the last
    line (so callers can position subsequent elements relative to it)."""
    lh = int(font.size * line_height_mult)
    for i, line in enumerate(lines):
        draw.text((x, y + i * lh), line, font=font, fill=fill)
    return y + len(lines) * lh


def _footer_band(img: Image.Image, dest: dict, label: str = "NAKSHIQ.COM") -> None:
    """Brand-locked footer: hairline + N. monogram dot + dest meta + URL.
    Drawn at the bottom 90px of `img`. In-place mutate."""
    w, h = img.size
    draw = ImageDraw.Draw(img)
    band_top = h - 100
    # Vermillion hairline above the footer
    _hairline(draw, 60, band_top, w - 60, VERMILLION_BRIGHT, 2)
    # N. monogram on the left
    mono = _crimson_italic(48, bold=True)
    draw.text((60, band_top + 22), "N", font=mono, fill=BONE)
    _draw_dot(draw, 60 + _text_width("N", mono) + 10,
              band_top + 22 + int(mono.size * 0.85), 6, VERMILLION_BRIGHT)
    # URL right-aligned
    url_font = _instrument(22)
    uw = _text_width_tracked(label, url_font, 0.20)
    _draw_tracked(draw, (w - 60 - uw, band_top + 40), label,
                  url_font, BONE_DIM, 0.20)


def _score_chip(draw: ImageDraw.ImageDraw, x: int, y: int,
                score, max_score: int = 5) -> int:
    """Draw a JetBrains Mono score chip with vermillion dot at (x,y).
    Returns the right edge x-coordinate."""
    try:
        s = int(round(float(score)))
    except Exception:
        s = 0
    f = _jetbrains(40)
    text = f"{s}/{max_score}"
    tw = _text_width(text, f)
    draw.text((x, y), text, font=f, fill=BONE)
    _draw_dot(draw, x + tw + 14, y + int(f.size * 0.62), 6, VERMILLION_BRIGHT)
    return x + tw + 26


# ─────────────────────────────────────────────────────────────────────────────
# Layout A — HEADLINE_OVERLAY (single-slide singles + carousel cover slides)
# ─────────────────────────────────────────────────────────────────────────────

def render_overlay_single(eyebrow: str, headline: str, body: str,
                          dest: dict, footer_meta: str = "") -> Image.Image:
    """1080×1350 single slide: hero photo with eyebrow + headline + body +
    score chip overlaid. Used for v2_*/v3_*/v4_* `single` formats."""
    w, h = CSV_PORTRAIT_W, CSV_PORTRAIT_H
    img = _fetch_hero(dest, w, h)
    _bottom_gradient(img, height_pct=0.62, alpha_max=215)
    draw = ImageDraw.Draw(img)

    # EYEBROW at top-left (Instrument tracked, Bone)
    eye_font = _instrument(22)
    _draw_tracked(draw, (60, 56), eyebrow.upper(),
                  eye_font, BONE_DIM, 0.30)
    _hairline(draw, 60, 56 + 38, 60 + 60, VERMILLION_BRIGHT, 2)

    # HEADLINE — Crimson Italic Bold (or NotoSansDevanagari for Hindi text),
    # auto-shrink, wrap to 3 lines
    max_w = w - 120
    headline_size = 84
    headline_font = _display_font(headline_size, headline, bold=True)
    lines = _wrap_to_width(headline, headline_font, max_w, max_lines=3)
    while (max((_text_width(l, headline_font) for l in lines), default=0) > max_w
           and headline_size > 48):
        headline_size -= 6
        headline_font = _display_font(headline_size, headline, bold=True)
        lines = _wrap_to_width(headline, headline_font, max_w, max_lines=3)
    headline_block_h = int(headline_font.size * 1.10) * len(lines)
    # InstrumentSans-Bold has no Devanagari glyphs — swap to Noto for Hindi
    # body lines (e.g. v2_hindi_score_card's "इस महीने ... जाना है?" body).
    body_font = _devanagari(26) if _has_devanagari(body) else _instrument(26)
    body_lines = _wrap_to_width(body, body_font, max_w, max_lines=3) if body else []
    body_block_h = int(body_font.size * 1.30) * len(body_lines)
    score_h = 60 if dest.get("score") not in (None, "") else 0
    footer_buffer = 130

    total_block = headline_block_h + (24 if body_lines else 0) + body_block_h + (28 if score_h else 0) + score_h
    top_y = h - footer_buffer - total_block - 40

    y = _draw_wrapped(draw, lines, 60, top_y, headline_font, BONE, 1.10)
    if body_lines:
        y += 24
        y = _draw_wrapped(draw, body_lines, 60, y, body_font, BONE_DIM, 1.30)
    if score_h:
        y += 28
        right_x = _score_chip(draw, 60, y, dest.get("score"))
        if footer_meta:
            meta_font = _instrument(20)
            _draw_tracked(draw, (right_x + 20, y + 16),
                          footer_meta.upper(), meta_font, BONE_DIM, 0.20)

    _footer_band(img, dest)
    return img


def render_overlay_title_slide(eyebrow: str, title: str, kicker: str = "",
                               dest: dict | None = None) -> Image.Image:
    """1080×1350 carousel cover slide. Photo backdrop + big italic title."""
    w, h = CSV_PORTRAIT_W, CSV_PORTRAIT_H
    img = _fetch_hero(dest or {}, w, h)
    _bottom_gradient(img, height_pct=0.70, alpha_max=210)
    draw = ImageDraw.Draw(img)

    # EYEBROW
    eye_font = _instrument(24)
    _draw_tracked(draw, (60, 60), eyebrow.upper(), eye_font, BONE_DIM, 0.30)
    _hairline(draw, 60, 60 + 40, 60 + 64, VERMILLION_BRIGHT, 2)

    # TITLE — auto-shrink, max 3 lines (script-aware font picker)
    title_size = 124
    title_font = _display_font(title_size, title, bold=True)
    max_w = w - 120
    lines = _wrap_to_width(title, title_font, max_w, max_lines=3)
    while (max((_text_width(l, title_font) for l in lines), default=0) > max_w
           and title_size > 64):
        title_size -= 8
        title_font = _display_font(title_size, title, bold=True)
        lines = _wrap_to_width(title, title_font, max_w, max_lines=3)
    block_h = int(title_font.size * 1.10) * len(lines)
    top_y = h - 280 - block_h
    y = _draw_wrapped(draw, lines, 60, top_y, title_font, BONE, 1.10)
    # Vermillion dot trailing the last title word
    last = lines[-1]
    lw = _text_width(last, title_font)
    _draw_dot(draw, 60 + lw + 22, y - int(title_font.size * 0.30),
              12, VERMILLION_BRIGHT)

    if kicker:
        kick_font = _display_font(40, kicker, bold=False)
        kw = _text_width(kicker, kick_font)
        draw.text((60, y + 24), kicker, font=kick_font, fill=BONE_DIM)

    _footer_band(img, dest or {})
    return img


def render_overlay_fact_slide(eyebrow: str, fact_label: str, fact_value: str,
                              body: str, dest: dict) -> Image.Image:
    """1080×1350 carousel body slide. Hero photo with a single big stat or
    fact + supporting body line. Used for slides 2-N of CSV carousels."""
    w, h = CSV_PORTRAIT_W, CSV_PORTRAIT_H
    img = _fetch_hero(dest, w, h)
    _bottom_gradient(img, height_pct=0.65, alpha_max=215)
    draw = ImageDraw.Draw(img)

    eye_font = _instrument(20)
    _draw_tracked(draw, (60, 60), eyebrow.upper(), eye_font, BONE_DIM, 0.30)

    # BIG VALUE — JetBrains Mono Bold, 144pt
    val_font = _jetbrains(132)
    vw = _text_width(fact_value, val_font)
    while vw > w - 120 and val_font.size > 72:
        val_font = _jetbrains(val_font.size - 8)
        vw = _text_width(fact_value, val_font)
    val_y = h - 470
    draw.text((60, val_y), fact_value, font=val_font, fill=BONE)
    # Vermillion dot trailing the value
    _draw_dot(draw, 60 + vw + 18, val_y + int(val_font.size * 0.65),
              10, VERMILLION_BRIGHT)

    # LABEL underneath value — Instrument Tracked, Bone Dim
    label_font = _instrument(24)
    _draw_tracked(draw, (60, val_y + int(val_font.size * 1.05)),
                  fact_label.upper(), label_font, BONE_DIM, 0.25)

    # BODY (1-2 lines) below the label — script-aware
    body_font = _display_font(40, body, bold=False)
    body_lines = _wrap_to_width(body, body_font, w - 120, max_lines=2)
    _draw_wrapped(draw, body_lines, 60,
                  val_y + int(val_font.size * 1.05) + 60,
                  body_font, BONE, 1.20)

    _footer_band(img, dest)
    return img


def render_overlay_cta_slide(headline: str, body: str = "",
                             url: str = "nakshiq.com",
                             dest: dict | None = None) -> Image.Image:
    """1080×1350 carousel close slide. Ink Deep background, no photo."""
    w, h = CSV_PORTRAIT_W, CSV_PORTRAIT_H
    img = Image.new("RGB", (w, h), INK_DEEP)
    draw = ImageDraw.Draw(img)

    # N. monogram top
    mono_font = _crimson_italic(200, bold=True)
    mw = _text_width("N", mono_font)
    mx = (w - mw - 32) // 2
    draw.text((mx, 220), "N", font=mono_font, fill=BONE)
    _draw_dot(draw, mx + mw + 16, 220 + int(mono_font.size * 0.85),
              14, VERMILLION_BRIGHT)

    # HEADLINE — Crimson Italic Bold (Devanagari → Noto), centred
    hd_font = _display_font(72, headline, bold=True)
    hd_lines = _wrap_to_width(headline, hd_font, w - 120, max_lines=3)
    while (max((_text_width(l, hd_font) for l in hd_lines), default=0) > w - 120
           and hd_font.size > 44):
        hd_font = _display_font(hd_font.size - 6, headline, bold=True)
        hd_lines = _wrap_to_width(headline, hd_font, w - 120, max_lines=3)
    hd_top = 560
    for i, line in enumerate(hd_lines):
        lw = _text_width(line, hd_font)
        draw.text(((w - lw) // 2, hd_top + i * int(hd_font.size * 1.10)),
                  line, font=hd_font, fill=BONE)

    # BODY — Crimson italic non-bold (or Noto for Hindi)
    if body:
        by_font = _display_font(36, body, bold=False)
        by_lines = _wrap_to_width(body, by_font, w - 160, max_lines=3)
        by_top = hd_top + len(hd_lines) * int(hd_font.size * 1.10) + 32
        for i, line in enumerate(by_lines):
            lw = _text_width(line, by_font)
            draw.text(((w - lw) // 2,
                       by_top + i * int(by_font.size * 1.25)),
                      line, font=by_font, fill=BONE_DIM)

    # URL chip at bottom
    url_font = _jetbrains(34)
    uw = _text_width(url, url_font)
    url_y = h - 200
    draw.text(((w - uw) // 2, url_y), url, font=url_font, fill=BONE)
    _hairline(draw, w // 2 - 80, url_y + 56, w // 2 + 80, VERMILLION_BRIGHT, 2)

    # Closing line
    cl_font = _crimson_italic(34, bold=False)
    cl = "Travel with IQ."
    cw = _text_width(cl, cl_font)
    draw.text(((w - cw) // 2, h - 100), cl, font=cl_font, fill=BONE_DIM)

    return img


# ─────────────────────────────────────────────────────────────────────────────
# Layout B — LISTICLE (v3_tl_editorial_listicle)
# ─────────────────────────────────────────────────────────────────────────────

def render_listicle_slide(state_name: str, items: list[dict],
                          month_name: str = "") -> Image.Image:
    """1080×1350 listicle: ranked rows of (dest_name, score)."""
    w, h = CSV_PORTRAIT_W, CSV_PORTRAIT_H
    img = Image.new("RGB", (w, h), INK_DEEP)
    draw = ImageDraw.Draw(img)

    # EYEBROW
    eye_font = _instrument(24)
    eyebrow = f"NAKSHIQ · {month_name.upper()}" if month_name else "NAKSHIQ EDITORIAL"
    _draw_tracked(draw, (60, 60), eyebrow, eye_font, BONE_DIM, 0.30)
    _hairline(draw, 60, 110, 60 + 60, VERMILLION_BRIGHT, 2)

    # TITLE — "{STATE}'S BEST"
    title = f"{state_name.upper()}'S BEST"
    title_font = _crimson_italic(96, bold=True)
    while _text_width(title, title_font) > w - 120 and title_font.size > 60:
        title_font = _crimson_italic(title_font.size - 8, bold=True)
    tw = _text_width(title, title_font)
    draw.text((60, 140), title, font=title_font, fill=BONE)
    _draw_dot(draw, 60 + tw + 22, 140 + int(title_font.size * 0.62),
              12, VERMILLION_BRIGHT)

    # Subtitle
    sub_font = _crimson_italic(34, bold=False)
    sub = "Ranked by NakshIQ data — not by Tripadvisor."
    draw.text((60, 140 + int(title_font.size * 1.05)),
              sub, font=sub_font, fill=BONE_DIM)

    # LIST — up to 10 rows
    list_top = 380
    row_h = 70
    name_font = _crimson_italic(40, bold=True)
    rank_font = _jetbrains(36)
    score_font = _jetbrains(34)
    max_rows = min(10, len(items))
    for i in range(max_rows):
        d = items[i]
        ry = list_top + i * row_h
        # Rank
        rank_text = f"{i+1:02d}"
        draw.text((60, ry + 12), rank_text, font=rank_font, fill=VERMILLION_BRIGHT)
        # Dest name (truncated)
        name = d.get("name") or d.get("id") or "—"
        name_x = 60 + 110
        name_max = w - name_x - 180
        nf = name_font
        while _text_width(name, nf) > name_max and nf.size > 28:
            nf = _crimson_italic(nf.size - 4, bold=True)
        draw.text((name_x, ry + 6), name, font=nf, fill=BONE)
        # Score right-aligned
        try:
            score_val = int(round(float(d.get("score") or 0)))
        except Exception:
            score_val = 0
        score_text = f"{score_val}/5"
        sw = _text_width(score_text, score_font)
        draw.text((w - 60 - sw, ry + 12),
                  score_text, font=score_font, fill=BONE_DIM)
        # Hairline divider
        _hairline(draw, 60, ry + row_h - 8, w - 60, BONE_DIM, 1)

    _footer_band(img, {})
    return img


# ─────────────────────────────────────────────────────────────────────────────
# Public API — dispatch by format_id
# ─────────────────────────────────────────────────────────────────────────────

def _truncate(text: str, n: int) -> str:
    if not text:
        return ""
    text = " ".join(text.split())   # collapse whitespace
    return text if len(text) <= n else (text[:n - 1].rsplit(" ", 1)[0] + "…")


def _format_pillar(spec) -> str:
    pillar_map = {
        "intelligence": "INTELLIGENCE",
        "discovery": "DISCOVERY",
        "transparency": "TRANSPARENCY",
        "entertainment": "ENTERTAINMENT",
        "advocacy": "ADVOCACY",
    }
    return pillar_map.get((getattr(spec, "pillar", "") or "").lower(), "NAKSHIQ")


def _safe_format(template: str, ctx: dict) -> str:
    """Render template with the same tolerant dict csv_format_loader uses."""
    try:
        # Import locally to avoid hard dep if slide_gen is used standalone
        from csv_format_loader import _DefaultDict, _expand_aliases
        c = _DefaultDict()
        c.update({k: v for k, v in (_expand_aliases(ctx) or {}).items()
                  if v not in (None, "")})
        out = template.format_map(c)
    except Exception:
        try:
            out = template.format(**ctx)
        except Exception:
            out = template
    # Collapse blank-line gaps so single-line headlines come out clean
    return out.strip()


import re as _re_fallback
_BROKEN_TEMPLATE_RE = _re_fallback.compile(
    r"(:\s*[.,;:!?]|\b\w+:\s*$|^\s*[.,;:!?]\s*$|:\s*$)"
)


def _looks_broken(text: str) -> bool:
    """True when a rendered template has obvious unresolved-placeholder
    fingerprints. Examples:
      "Myth: . Reality: ."        ← placeholders collapsed to empty
      "Just announced: "          ← trailing label with empty value
      ". . ."                     ← only punctuation
    Used by build_csv_single to fall back to a generic headline rather than
    publish a slide that screams 'broken template'.
    """
    if not text:
        return True
    stripped = text.strip()
    if len(stripped) < 16:
        return True
    # Count visible word characters vs total characters. If text is mostly
    # punctuation + whitespace, it's broken.
    word_chars = sum(1 for c in stripped if c.isalnum())
    if word_chars < 8 or (word_chars / max(1, len(stripped))) < 0.35:
        return True
    # Look for the specific "Label: ." pattern (>=2 instances means most
    # value slots emptied out).
    if len(_BROKEN_TEMPLATE_RE.findall(stripped)) >= 2:
        return True
    return False


def _fallback_headline(spec, dest: dict) -> str:
    """Generic headline when the format's template can't resolve from the
    dest record. Reads as 'editorial-grade dest highlight' so users don't
    spot a fallback."""
    name = dest.get("name") or dest.get("id") or "this place"
    state = dest.get("state") or ""
    pillar = (getattr(spec, "pillar", "") or "").lower()
    if pillar == "transparency":
        return f"What {name} is actually like this month."
    if pillar == "discovery":
        return f"{name} — what the brochure won't tell you."
    if pillar == "intelligence":
        return f"{name}, by the numbers."
    if pillar == "advocacy":
        return f"The {name} story worth reading."
    return f"{name}{f', {state}' if state else ''} — verified, not vibes."


def build_csv_single(spec, dest: dict, extras: dict | None = None,
                     out_dir: Path | None = None) -> Path | None:
    """Render a 1-slide PNG for a CSV `single`/`carousel` format. Returns
    the saved Path, or None if rendering failed."""
    if out_dir is None:
        return None
    out_dir.mkdir(parents=True, exist_ok=True)
    ctx = dict(dest or {})
    if extras:
        ctx.update(extras)

    # Hook + first body line — the loudest text to put on the overlay
    hook = _safe_format(spec.hook_template, ctx) or (dest.get("name") or "NakshIQ")
    body_lines_raw = [l.strip() for l in _safe_format(spec.caption_template, ctx).splitlines() if l.strip()]
    body = body_lines_raw[0] if body_lines_raw else ""

    # Fallback when placeholders collapsed — e.g. "Myth: . Reality: ." for
    # v4_dw_counter_narrative_myth_bust on a dest without myth/reality data.
    # Better to ship a generic editorial line than a visibly-broken card.
    if _looks_broken(hook):
        hook = _fallback_headline(spec, dest)
    if _looks_broken(body):
        # Keep body silent rather than show ". ." artifacts
        body = ""

    body = _truncate(body, 140)
    hook = _truncate(hook, 90)

    eyebrow = _format_pillar(spec)

    state = (dest.get("state") or "").upper()
    footer_meta = state

    img = render_overlay_single(eyebrow, hook, body, dest, footer_meta=footer_meta)
    slug = (dest.get("id") or "slide").lower().replace(" ", "-")
    out_path = out_dir / f"{spec.format_id}-{slug}.png"
    img.save(out_path, "PNG", optimize=True)
    return out_path


def build_csv_carousel(spec, dest: dict, extras: dict | None = None,
                       out_dir: Path | None = None,
                       slide_count: int = 5) -> list[Path]:
    """Render a multi-slide CSV carousel as 1080×1350 PNGs. Returns slide
    paths in order. `dest` is the anchor destination — slide 1 is its hero
    + the format's hook; slides 2..N-1 surface key data points pulled from
    spec.data_inputs; slide N is the CTA."""
    if out_dir is None:
        return []
    out_dir.mkdir(parents=True, exist_ok=True)
    ctx = dict(dest or {})
    if extras:
        ctx.update(extras)

    paths: list[Path] = []
    slug = (dest.get("id") or "slide").lower().replace(" ", "-")
    fid = spec.format_id

    # Special-case the listicle — it's a single slide that lists 10 dests,
    # not a 5-slide carousel. Caller passes the dest list via extras["items"].
    if fid == "v3_tl_editorial_listicle":
        items = extras.get("items", []) if extras else []
        state = (extras or {}).get("state_name") or dest.get("state") or ""
        month = (extras or {}).get("month_name", "")
        img = render_listicle_slide(state, items, month_name=month)
        p = out_dir / f"{fid}-{slug}.png"
        img.save(p, "PNG", optimize=True)
        paths.append(p)
        return paths

    eyebrow = _format_pillar(spec)
    hook = _safe_format(spec.hook_template, ctx) or dest.get("name", "")
    if _looks_broken(hook):
        hook = _fallback_headline(spec, dest)
    title_text = _truncate(hook, 90)

    # Cover slide
    cover = render_overlay_title_slide(
        eyebrow, title_text,
        kicker=(dest.get("name") or ""), dest=dest,
    )
    pc = out_dir / f"{fid}-{slug}_01_cover.png"
    cover.save(pc, "PNG", optimize=True)
    paths.append(pc)

    # Body slides — split caption_template on blank lines + use each segment
    body_text = _safe_format(spec.caption_template, ctx)
    segments = [s.strip() for s in body_text.split("\n") if s.strip()]
    # Filter out template-leftover lines (still have {placeholders}) AND
    # segments that look broken (label-with-no-value, mostly punctuation).
    segments = [s for s in segments
                if "{" not in s and "}" not in s and not _looks_broken(s)]
    # Pick up to N-2 segments for body slides
    n_body = max(0, slide_count - 2)
    body_segments = segments[:n_body] if segments else []

    for i, seg in enumerate(body_segments, start=2):
        # If the segment looks like "Label: value" — render as fact slide.
        if ":" in seg and len(seg) < 80:
            label, _, value = seg.partition(":")
            value = value.strip().rstrip(".")
            if value:
                img = render_overlay_fact_slide(
                    eyebrow, label.strip(), _truncate(value, 18),
                    "", dest,
                )
            else:
                img = render_overlay_single(
                    eyebrow, _truncate(seg, 90), "", dest, footer_meta="",
                )
        else:
            img = render_overlay_single(
                eyebrow, _truncate(seg, 90), "", dest, footer_meta="",
            )
        p = out_dir / f"{fid}-{slug}_{i:02d}.png"
        img.save(p, "PNG", optimize=True)
        paths.append(p)

    # CTA slide
    cta_head = _safe_format(spec.cta_template, ctx) or "Travel with IQ."
    cta_head_clean = [l.strip() for l in cta_head.splitlines() if l.strip()]
    cta = render_overlay_cta_slide(
        cta_head_clean[0] if cta_head_clean else "Travel with IQ.",
        body=cta_head_clean[1] if len(cta_head_clean) > 1 else "",
        url="nakshiq.com", dest=dest,
    )
    cta_path = out_dir / f"{fid}-{slug}_{len(paths)+1:02d}_cta.png"
    cta.save(cta_path, "PNG", optimize=True)
    paths.append(cta_path)

    return paths


def build_csv_slides(spec, dest: dict, extras: dict | None = None,
                     out_dir: Path | None = None) -> list[Path]:
    """Top-level dispatch — picks single vs carousel based on spec.post_type.

    Returns list of paths (1 for single, N for carousel, [] for reel/yt_short
    which need a separate video pipeline). Caller is responsible for cleanup
    of out_dir if it's a tmpdir."""
    if out_dir is None:
        return []
    pt = getattr(spec, "post_type", "")
    if pt == "single":
        p = build_csv_single(spec, dest, extras, out_dir)
        return [p] if p else []
    if pt == "carousel":
        return build_csv_carousel(spec, dest, extras, out_dir)
    # reel / yt_short / story — slide_gen doesn't render video
    return []
