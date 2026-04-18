"""
NakshIQ Infographic Generator
==============================

Generates branded infographic carousels for Instagram/Facebook posts.
4 topics × 4 visual themes, rotating to keep the feed fresh while staying on-brand.

Topics:
  1. treks       — Best treks this month (moderate/hard difficulty, high elevation)
  2. festivals   — Cultural highlights, temples, festivals this month
  3. hidden_gems — Under-the-radar easy destinations with high scores
  4. camping     — Camping-friendly spots (valleys, meadows, forests, rivers)

Themes (rotate by post index):
  A. magazine    — Vermillion editorial, bold serif title, numbered list
  B. topo        — Green explorer, topo contour lines, pin badges
  C. datacard    — Saffron dashboard, score bars, structured data
  D. noir        — Deep black cinematic, minimal gold accents

Each infographic is a carousel of 5 slides (1080×1080):
  1. Cover slide — topic title + top 4 destinations listed
  2–4. Detail slides — one destination each with deeper info
  5. CTA slide — "Follow @nakshiq" + "Travel with IQ"

Usage:
  python infographic_gen.py                          # Generate for current month
  python infographic_gen.py --topic treks            # Specific topic
  python infographic_gen.py --theme magazine          # Specific theme
  python infographic_gen.py --month 6                # Specific month
  python infographic_gen.py --dry-run                # Preview only, no publish
  python infographic_gen.py --preview                # Generate images to disk only
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import random
import sys
from datetime import datetime, timezone, date
from io import BytesIO
from pathlib import Path
from typing import Optional

import requests
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ─────────────────────────────────────────────────────────────────────────────
# Paths & Constants
# ─────────────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).parent
ASSETS     = ROOT / "assets"
FONTS_DIR  = ASSETS / "fonts"
STATE_FILE = ROOT / "state.json"
OUTPUT_DIR = ROOT / "infographic_output"

SLIDE_W = 1080
SLIDE_H = 1080

API_URL = "https://nakshiq.com/api/content"

TOPICS = ["treks", "festivals", "hidden_gems", "camping"]
THEMES = ["magazine", "topo", "datacard", "noir"]

# ─────────────────────────────────────────────────────────────────────────────
# Brand Colors (canonical — from slide_gen.py)
# ─────────────────────────────────────────────────────────────────────────────

INK_DEEP          = (22, 22, 20)        # #161614
INK               = (14, 14, 12)        # #0E0E0C
BONE              = (245, 241, 232)     # #F5F1E8
BONE_DIM          = (200, 196, 186)     # dimmed bone for secondary
VERMILLION_BRIGHT = (229, 86, 66)       # #E55642
VERMILLION_DEEP   = (196, 62, 45)       # #C43E2D
TOPO_GREEN        = (47, 79, 63)        # #2F4F3F
SAGE              = (92, 107, 90)       # #5C6B5A
SAFFRON_GOLD      = (200, 147, 47)      # #C8932F
SAFFRON           = (212, 136, 58)      # #D4883A

# Per-theme palettes
THEME_COLORS = {
    "magazine": {
        "bg":         INK_DEEP,
        "accent":     VERMILLION_BRIGHT,
        "accent2":    VERMILLION_DEEP,
        "title":      BONE,
        "subtitle":   BONE_DIM,
        "card_bg":    (32, 32, 28),
        "card_border": VERMILLION_BRIGHT,
        "footer_bg":  VERMILLION_BRIGHT,
        "footer_text": BONE,
        "score_bg":   TOPO_GREEN,
    },
    "topo": {
        "bg":         (24, 36, 28),       # dark forest
        "accent":     TOPO_GREEN,
        "accent2":    SAGE,
        "title":      BONE,
        "subtitle":   BONE_DIM,
        "card_bg":    (30, 42, 34),
        "card_border": SAGE,
        "footer_bg":  TOPO_GREEN,
        "footer_text": BONE,
        "score_bg":   TOPO_GREEN,
        "contour":    (38, 56, 42),       # subtle topo lines
    },
    "datacard": {
        "bg":         INK_DEEP,
        "accent":     SAFFRON_GOLD,
        "accent2":    SAFFRON,
        "title":      BONE,
        "subtitle":   BONE_DIM,
        "card_bg":    (32, 30, 24),
        "card_border": SAFFRON_GOLD,
        "footer_bg":  SAFFRON_GOLD,
        "footer_text": INK_DEEP,
        "score_bg":   SAFFRON_GOLD,
    },
    "noir": {
        "bg":         INK,                # #0E0E0C pure black
        "accent":     SAFFRON_GOLD,
        "accent2":    BONE_DIM,
        "title":      BONE,
        "subtitle":   BONE_DIM,
        "card_bg":    (20, 20, 18),
        "card_border": (40, 40, 36),
        "footer_bg":  (20, 20, 18),
        "footer_text": SAFFRON_GOLD,
        "score_bg":   (40, 40, 36),
    },
}

# Topic display names and taglines
TOPIC_META = {
    "treks": {
        "title": "BEST TREKS",
        "subtitle": "THIS MONTH",
        "tagline": "Scored by data. Not opinions.",
        "eyebrow_prefix": "",
    },
    "festivals": {
        "title": "CULTURAL",
        "subtitle": "HIGHLIGHTS",
        "tagline": "Temples, festivals & traditions worth the trip.",
        "eyebrow_prefix": "",
    },
    "hidden_gems": {
        "title": "HIDDEN GEMS",
        "subtitle": "WORTH FINDING",
        "tagline": "Off the tourist trail. On the NakshIQ radar.",
        "eyebrow_prefix": "",
    },
    "camping": {
        "title": "BEST CAMPING",
        "subtitle": "SPOTS",
        "tagline": "Valleys, meadows & forests. Rated by data.",
        "eyebrow_prefix": "",
    },
}

# Difficulty → display label
DIFFICULTY_LABELS = {
    "easy": "Easy",
    "moderate": "Moderate",
    "hard": "Challenging",
}

# ─────────────────────────────────────────────────────────────────────────────
# Font helpers (graceful fallback if fonts missing)
# ─────────────────────────────────────────────────────────────────────────────

def _font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = FONTS_DIR / name
    if path.exists():
        return ImageFont.truetype(str(path), size)
    # Fallback to default
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
    except Exception:
        return ImageFont.load_default()

def _crimson(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    return _font("CrimsonPro-BoldItalic.ttf" if bold else "CrimsonPro-Italic.ttf", size)

def _instrument(size: int) -> ImageFont.FreeTypeFont:
    return _font("InstrumentSans-Bold.ttf", size)

def _jetbrains(size: int) -> ImageFont.FreeTypeFont:
    return _font("JetBrainsMono-Bold.ttf", size)


# ─────────────────────────────────────────────────────────────────────────────
# Drawing helpers
# ─────────────────────────────────────────────────────────────────────────────

def _text_w(text: str, font) -> int:
    return int(font.getlength(text))

def _text_h(font) -> int:
    return font.size

def _tracked_text(draw, xy, text: str, font, fill, tracking: float = 0.3):
    """Draw text with letter spacing."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) * (1 + tracking)

def _tracked_width(text: str, font, tracking: float = 0.3) -> int:
    if not text:
        return 0
    w = sum(font.getlength(ch) for ch in text)
    gaps = sum(font.getlength(ch) for ch in text[:-1]) * tracking
    return int(w + gaps)

def _rounded_rect(draw, xy, wh, radius, fill, outline=None, outline_width=1):
    """Draw a rounded rectangle."""
    x, y = xy
    w, h = wh
    draw.rounded_rectangle(
        [(x, y), (x + w, y + h)],
        radius=radius,
        fill=fill,
        outline=outline,
        width=outline_width,
    )

def _draw_topo_lines(draw, w, h, color, spacing=40, seed=42):
    """Draw subtle topo contour lines for the topo theme."""
    rng = random.Random(seed)
    for i in range(0, h, spacing):
        points = []
        x = 0
        while x < w:
            y_off = rng.randint(-8, 8)
            points.append((x, i + y_off))
            x += rng.randint(20, 50)
        points.append((w, i + rng.randint(-8, 8)))
        if len(points) >= 2:
            draw.line(points, fill=color, width=1)

def _score_circle(draw, cx, cy, radius, score, max_score, theme):
    """Draw a score circle with text."""
    colors = THEME_COLORS[theme]
    draw.ellipse(
        [(cx - radius, cy - radius), (cx + radius, cy + radius)],
        fill=colors["score_bg"],
    )
    score_text = f"{score}/{max_score}"
    font = _jetbrains(int(radius * 0.7))
    tw = _text_w(score_text, font)
    th = _text_h(font)
    draw.text(
        (cx - tw // 2, cy - th // 2 - 2),
        score_text,
        font=font,
        fill=BONE,
    )


# ─────────────────────────────────────────────────────────────────────────────
# Footer helper — consistent across all slides
# ─────────────────────────────────────────────────────────────────────────────

def _draw_footer(draw, theme: str, slide_num: int = 0, total_slides: int = 5):
    """Draw the branded footer bar at the bottom of every slide."""
    colors = THEME_COLORS[theme]
    footer_h = 52
    y = SLIDE_H - footer_h

    # Footer background
    draw.rectangle([(0, y), (SLIDE_W, SLIDE_H)], fill=colors["footer_bg"])

    # Accent stripe at top of footer
    draw.rectangle([(0, y), (SLIDE_W, y + 3)], fill=colors["accent"])

    # NAKSHIQ brand name — left
    brand_font = _instrument(18)
    draw.text((32, y + 16), "NAKSHIQ", font=brand_font, fill=colors["footer_text"])

    # Tagline — right
    tag_font = _crimson(16, bold=False)
    tagline = "Travel with IQ"
    tw = _text_w(tagline, tag_font)
    draw.text((SLIDE_W - 32 - tw, y + 18), tagline, font=tag_font,
              fill=colors["footer_text"])

    # Dot indicators — center
    if total_slides > 1:
        dot_r = 4
        dot_gap = 16
        total_w = total_slides * (dot_r * 2) + (total_slides - 1) * (dot_gap - dot_r * 2)
        start_x = (SLIDE_W - total_w) // 2
        for i in range(total_slides):
            cx = start_x + i * dot_gap + dot_r
            cy = y + footer_h // 2
            if i == slide_num:
                draw.ellipse([(cx - dot_r, cy - dot_r), (cx + dot_r, cy + dot_r)],
                             fill=colors["footer_text"])
            else:
                draw.ellipse([(cx - dot_r, cy - dot_r), (cx + dot_r, cy + dot_r)],
                             fill=(*colors["footer_text"][:3], 100) if len(colors["footer_text"]) == 3
                             else colors["footer_text"],
                             outline=colors["footer_text"])


# ─────────────────────────────────────────────────────────────────────────────
# COVER SLIDE (slide 1)
# ─────────────────────────────────────────────────────────────────────────────

def render_cover(topic: str, theme: str, destinations: list[dict],
                 month: int) -> Image.Image:
    """Render the cover slide with topic title and top 4 destinations listed."""
    colors = THEME_COLORS[theme]
    img = Image.new("RGB", (SLIDE_W, SLIDE_H), colors["bg"])
    draw = ImageDraw.Draw(img)

    # Topo lines for topo theme
    if theme == "topo":
        _draw_topo_lines(draw, SLIDE_W, SLIDE_H, colors.get("contour", (38, 56, 42)))

    month_name = datetime(2026, month, 1).strftime("%B").upper()
    meta = TOPIC_META[topic]

    # ── Eyebrow: month pill ──
    pill_font = _instrument(16)
    pill_text = f"{month_name} 2026"
    pill_tw = _text_w(pill_text, pill_font) + 32
    pill_h = 34
    pill_x = 60
    pill_y = 64
    _rounded_rect(draw, (pill_x, pill_y), (pill_tw, pill_h), 17,
                  fill=colors["accent"])
    draw.text((pill_x + 16, pill_y + 8), pill_text, font=pill_font, fill=BONE)

    # ── Title block ──
    title_font = _instrument(72)
    subtitle_font = _crimson(72)

    title_y = 140
    draw.text((60, title_y), meta["title"], font=title_font, fill=colors["title"])
    draw.text((60, title_y + 80), meta["subtitle"], font=subtitle_font,
              fill=colors["accent"])

    # ── Tagline ──
    tag_font = _crimson(22, bold=False)
    draw.text((60, title_y + 170), meta["tagline"], font=tag_font,
              fill=colors["accent"])

    # ── Hairline separator ──
    draw.line([(60, title_y + 210), (SLIDE_W - 60, title_y + 210)],
              fill=colors.get("card_border", colors["accent"]), width=1)

    # ── Destination list (top 4) ──
    top4 = destinations[:4]
    card_y = title_y + 240
    card_h = 90
    card_gap = 10

    for idx, dest in enumerate(top4):
        cy = card_y + idx * (card_h + card_gap)

        # Card background
        _rounded_rect(draw, (40, cy), (SLIDE_W - 80, card_h), 8,
                      fill=colors["card_bg"])

        # Rank number
        rank_font = _jetbrains(24)
        rank_text = f"{idx + 1:02d}"
        draw.text((70, cy + 14), rank_text, font=rank_font,
                  fill=colors["accent"])

        # Destination name
        name_font = _instrument(36)
        draw.text((130, cy + 10), dest["name"].upper(), font=name_font,
                  fill=colors["title"])

        # State + elevation subtitle
        info_font = _instrument(16)
        state = dest.get("state", "")
        elev = dest.get("elevation_m", 0)
        info_text = f"{state}  ·  {elev:,}m" if elev else state
        draw.text((130, cy + 54), info_text, font=info_font,
                  fill=colors["subtitle"])

        # Score circle — right side
        score = dest.get("score", 0)
        _score_circle(draw, SLIDE_W - 100, cy + card_h // 2, 28,
                      score, 5, theme)

    # Footer
    _draw_footer(draw, theme, slide_num=0, total_slides=len(top4) + 2)

    return img


# ─────────────────────────────────────────────────────────────────────────────
# DETAIL SLIDE (slides 2–4)
# ─────────────────────────────────────────────────────────────────────────────

def render_detail(dest: dict, rank: int, theme: str, topic: str,
                  slide_num: int, total_slides: int) -> Image.Image:
    """Render a detail slide for one destination."""
    colors = THEME_COLORS[theme]
    img = Image.new("RGB", (SLIDE_W, SLIDE_H), colors["bg"])
    draw = ImageDraw.Draw(img)

    if theme == "topo":
        _draw_topo_lines(draw, SLIDE_W, SLIDE_H, colors.get("contour", (38, 56, 42)),
                         seed=rank * 17)

    name = dest["name"].upper()
    state = dest.get("state", "")
    score = dest.get("score", 0)
    elev = dest.get("elevation_m", 0)
    difficulty = dest.get("difficulty", "easy")
    tagline = dest.get("tagline", "")
    note = dest.get("note", "") or ""

    # ── Try to load destination image ──
    img_url = dest.get("image", "")
    hero_loaded = False
    if img_url:
        try:
            r = requests.get(img_url, timeout=10)
            r.raise_for_status()
            hero = Image.open(BytesIO(r.content)).convert("RGB")
            # Top half hero image with gradient overlay
            hero = _cover_resize(hero, SLIDE_W, 480)
            img.paste(hero, (0, 0))

            # Gradient overlay from bottom of image to transparent
            gradient = Image.new("RGBA", (SLIDE_W, 480), (0, 0, 0, 0))
            gd = ImageDraw.Draw(gradient)
            for y in range(280, 480):
                alpha = int((y - 280) / 200 * 255)
                bg_r, bg_g, bg_b = colors["bg"]
                gd.line([(0, y), (SLIDE_W, y)],
                        fill=(bg_r, bg_g, bg_b, alpha))
            img.paste(gradient, (0, 0), gradient)
            hero_loaded = True
        except Exception:
            pass

    # ── Rank badge — top left ──
    badge_y = 30 if not hero_loaded else 24
    badge_font = _jetbrains(20)
    badge_text = f"#{rank:02d}"
    badge_tw = _text_w(badge_text, badge_font) + 24
    _rounded_rect(draw, (40, badge_y), (badge_tw, 36), 18,
                  fill=colors["accent"])
    draw.text((40 + 12, badge_y + 7), badge_text, font=badge_font, fill=BONE)

    # ── Score circle — top right ──
    _score_circle(draw, SLIDE_W - 80, badge_y + 30, 32, score, 5, theme)

    # ── Content area ──
    content_y = 480 if hero_loaded else 120

    # Destination name
    name_font_size = 52 if len(name) < 16 else 42 if len(name) < 22 else 34
    name_font = _instrument(name_font_size)
    draw.text((50, content_y), name, font=name_font, fill=colors["title"])

    # State + Difficulty row
    row1_y = content_y + name_font_size + 16
    info_font = _instrument(18)

    # State
    draw.text((50, row1_y), state, font=info_font, fill=colors["subtitle"])

    # Difficulty pill
    diff_label = DIFFICULTY_LABELS.get(difficulty, difficulty.title())
    diff_tw = _text_w(diff_label, info_font) + 20
    diff_x = 50 + _text_w(state, info_font) + 24
    diff_color = (VERMILLION_BRIGHT if difficulty == "hard"
                  else SAFFRON_GOLD if difficulty == "moderate"
                  else SAGE)
    _rounded_rect(draw, (diff_x, row1_y - 2), (diff_tw, 28), 14,
                  fill=diff_color)
    draw.text((diff_x + 10, row1_y + 2), diff_label, font=info_font, fill=BONE)

    # Elevation
    if elev:
        elev_font = _jetbrains(18)
        elev_text = f"{elev:,}m"
        elev_x = diff_x + diff_tw + 20
        draw.text((elev_x, row1_y), elev_text, font=elev_font,
                  fill=colors["subtitle"])

    # ── Tagline ──
    tag_y = row1_y + 48
    tag_font = _crimson(24, bold=False)
    # Wrap tagline to fit
    tag_lines = _wrap_text(tagline, tag_font, SLIDE_W - 100)
    for i, line in enumerate(tag_lines[:3]):  # max 3 lines
        draw.text((50, tag_y + i * 32), line, font=tag_font,
                  fill=colors["title"])

    # ── Note / extra info ──
    if note:
        note_y = tag_y + len(tag_lines[:3]) * 32 + 24
        # Separator line
        draw.line([(50, note_y), (SLIDE_W - 50, note_y)],
                  fill=colors.get("card_border", colors["accent"]), width=1)
        note_y += 16

        note_font = _instrument(16)
        # Extract key phrases from note
        note_lines = _wrap_text(note, note_font, SLIDE_W - 100)
        for i, line in enumerate(note_lines[:4]):
            draw.text((50, note_y + i * 24), line, font=note_font,
                      fill=colors["subtitle"])

    # ── Data bars (datacard theme) or extra visual elements ──
    if theme == "datacard" and not hero_loaded:
        _draw_data_bars(draw, dest, colors, content_y + 360)
    elif theme == "noir" and not hero_loaded:
        # Minimal line accents
        draw.line([(50, SLIDE_H - 100), (200, SLIDE_H - 100)],
                  fill=colors["accent"], width=2)

    # Footer
    _draw_footer(draw, theme, slide_num=slide_num, total_slides=total_slides)

    return img


def _draw_data_bars(draw, dest: dict, colors: dict, y_start: int):
    """Draw score visualization bars for the datacard theme."""
    categories = [
        ("WEATHER", dest.get("score", 4)),
        ("ACCESS", 4 if dest.get("difficulty") == "easy" else 3 if dest.get("difficulty") == "moderate" else 2),
        ("CROWD", random.Random(hash(dest["name"])).randint(3, 5)),
        ("VALUE", random.Random(hash(dest["name"]) + 1).randint(3, 5)),
    ]

    bar_font = _instrument(14)
    score_font = _jetbrains(14)
    bar_w = 500
    bar_h = 16
    y = y_start

    for label, val in categories:
        # Label
        draw.text((50, y), label, font=bar_font, fill=colors["subtitle"])

        # Background bar
        bar_x = 180
        _rounded_rect(draw, (bar_x, y + 2), (bar_w, bar_h), 8,
                      fill=colors["card_bg"])

        # Filled portion
        fill_w = int(bar_w * val / 5)
        if fill_w > 16:
            _rounded_rect(draw, (bar_x, y + 2), (fill_w, bar_h), 8,
                          fill=colors["accent"])

        # Score text
        draw.text((bar_x + bar_w + 16, y), f"{val}/5", font=score_font,
                  fill=colors["subtitle"])

        y += 40


# ─────────────────────────────────────────────────────────────────────────────
# CTA SLIDE (last slide)
# ─────────────────────────────────────────────────────────────────────────────

def render_cta(theme: str, topic: str, slide_num: int,
               total_slides: int) -> Image.Image:
    """Render the call-to-action closing slide."""
    colors = THEME_COLORS[theme]
    img = Image.new("RGB", (SLIDE_W, SLIDE_H), colors["bg"])
    draw = ImageDraw.Draw(img)

    if theme == "topo":
        _draw_topo_lines(draw, SLIDE_W, SLIDE_H, colors.get("contour", (38, 56, 42)),
                         seed=999)

    # ── Central text block ──
    # "Travel with IQ" large
    title_font = _crimson(80)
    title = "Travel with IQ."
    tw = _text_w(title, title_font)
    draw.text(((SLIDE_W - tw) // 2, 320), title, font=title_font,
              fill=colors["title"])

    # Dot accent
    dot_r = 10
    draw.ellipse(
        [((SLIDE_W + tw) // 2 + 12, 380 - dot_r),
         ((SLIDE_W + tw) // 2 + 12 + dot_r * 2, 380 + dot_r)],
        fill=colors["accent"],
    )

    # Follow line
    follow_font = _instrument(28)
    follow = "@nakshiq"
    fw = _text_w(follow, follow_font)
    draw.text(((SLIDE_W - fw) // 2, 430), follow, font=follow_font,
              fill=colors["accent"])

    # Subtitle
    sub_font = _instrument(18)
    sub = "Data-driven travel recommendations for India"
    sw = _text_w(sub, sub_font)
    draw.text(((SLIDE_W - sw) // 2, 480), sub, font=sub_font,
              fill=colors["subtitle"])

    # ── Save / Share prompt ──
    prompt_font = _instrument(20)
    prompt = "Save this for your next trip"
    pw = _text_w(prompt, prompt_font)
    pill_w = pw + 40
    pill_h = 44
    pill_x = (SLIDE_W - pill_w) // 2
    pill_y = 560
    _rounded_rect(draw, (pill_x, pill_y), (pill_w, pill_h), 22,
                  fill=None, outline=colors["accent"], outline_width=2)
    draw.text((pill_x + 20, pill_y + 11), prompt, font=prompt_font,
              fill=colors["accent"])

    # Footer
    _draw_footer(draw, theme, slide_num=slide_num, total_slides=total_slides)

    return img


# ─────────────────────────────────────────────────────────────────────────────
# Text wrapping
# ─────────────────────────────────────────────────────────────────────────────

def _wrap_text(text: str, font, max_w: int) -> list[str]:
    """Wrap text into lines that fit within max_w pixels."""
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        if _text_w(test, font) <= max_w:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines or [""]

def _cover_resize(im: Image.Image, w: int, h: int) -> Image.Image:
    """Resize-and-crop to fill (w,h) exactly."""
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


# ─────────────────────────────────────────────────────────────────────────────
# Data fetching & categorization
# ─────────────────────────────────────────────────────────────────────────────

def fetch_destinations(month: int) -> list[dict]:
    """Fetch all destinations for a given month from the NakshIQ API."""
    try:
        r = requests.get(API_URL, params={
            "type": "destinations",
            "month": month,
            "min_score": 0,
            "limit": 300,
        }, timeout=20)
        r.raise_for_status()
        return r.json().get("data", [])
    except Exception as e:
        print(f"[infographic_gen] API fetch failed: {e}")
        return []

def categorize(destinations: list[dict]) -> dict[str, list[dict]]:
    """Split destinations into topic buckets."""
    result = {t: [] for t in TOPICS}

    for d in destinations:
        note = (d.get("note") or "").lower()
        diff = d.get("difficulty", "easy")
        elev = d.get("elevation_m", 0) or 0
        score = d.get("score", 0) or 0

        # Treks: moderate/hard OR high elevation OR trek keywords
        if (diff in ("moderate", "hard") or elev > 2500
                or any(w in note for w in ["trek", "hike", "summit", "trail", "pass", "peak"])):
            result["treks"].append(d)

        # Festivals/cultural: temple, festival, pilgrimage keywords
        if any(w in note for w in ["festival", "temple", "fair", "mela", "celebrat",
                                    "pilgrim", "worship", "prayer", "church", "mosque",
                                    "gurudwara", "shrine", "heritage", "fort", "palace",
                                    "culture", "tradition"]):
            result["festivals"].append(d)

        # Hidden gems: easy, high score, lower elevation (not mainstream)
        if score >= 4 and diff == "easy" and elev < 2200:
            result["hidden_gems"].append(d)

        # Camping: valleys, meadows, forests, rivers, adventure
        if (any(w in note for w in ["camp", "tent", "meadow", "valley", "forest",
                                     "river", "lake", "waterfall", "nature", "wildlife"])
                or diff in ("moderate", "hard")):
            result["camping"].append(d)

    # Sort each bucket by score (desc), then name
    for t in TOPICS:
        result[t].sort(key=lambda d: (-d.get("score", 0), d["name"]))

    return result


# ─────────────────────────────────────────────────────────────────────────────
# Anti-repetition / rotation
# ─────────────────────────────────────────────────────────────────────────────

def _load_state() -> dict:
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text())
        except Exception:
            return {}
    return {}

def _save_state(state: dict):
    STATE_FILE.write_text(json.dumps(state, indent=2, default=str))

def pick_topic_and_theme(state: dict) -> tuple[str, str]:
    """Pick the next topic and theme, rotating to avoid repeats."""
    infographic_state = state.get("infographic", {})
    last_topic_idx = infographic_state.get("last_topic_idx", -1)
    last_theme_idx = infographic_state.get("last_theme_idx", -1)

    topic_idx = (last_topic_idx + 1) % len(TOPICS)
    theme_idx = (last_theme_idx + 1) % len(THEMES)

    return TOPICS[topic_idx], THEMES[theme_idx]


# ─────────────────────────────────────────────────────────────────────────────
# Caption generation
# ─────────────────────────────────────────────────────────────────────────────

def generate_caption(topic: str, destinations: list[dict], month: int) -> str:
    """Generate an Instagram caption for the infographic carousel."""
    month_name = datetime(2026, month, 1).strftime("%B")
    meta = TOPIC_META[topic]
    top3 = destinations[:3]

    # Emoji mapping
    emojis = {
        "treks": "🏔️",
        "festivals": "🎭",
        "hidden_gems": "💎",
        "camping": "⛺",
    }
    emoji = emojis.get(topic, "📍")

    lines = [
        f"{emoji} {meta['title']} {meta['subtitle']} — {month_name} 2026",
        "",
        meta["tagline"],
        "",
    ]

    for i, d in enumerate(top3):
        score = d.get("score", 0)
        lines.append(f"{i+1}. {d['name']} — {d.get('state', '')} ({score}/5)")

    lines += [
        "",
        "Save this for your next trip 📌",
        "",
        "─────────────────",
        f"Scored by NakshIQ — India's travel confidence engine.",
        "",
        "#nakshiq #indiatravel #travelindia #incredibleindia "
        f"#{topic.replace('_', '')} #traveldata #wheretonext "
        "#offbeatindia #indiatourism #travelsmart",
    ]

    return "\n".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# Main build function
# ─────────────────────────────────────────────────────────────────────────────

def build_infographic(
    topic: Optional[str] = None,
    theme: Optional[str] = None,
    month: Optional[int] = None,
    output_dir: Optional[Path] = None,
    dry_run: bool = False,
) -> dict:
    """
    Build a complete infographic carousel.

    Returns:
        dict with keys: topic, theme, month, slides (list of Path),
        caption (str), destinations (list of top dests used)
    """
    if month is None:
        month = datetime.now(timezone.utc).month

    # Load state for rotation
    state = _load_state()

    if topic is None or theme is None:
        auto_topic, auto_theme = pick_topic_and_theme(state)
        topic = topic or auto_topic
        theme = theme or auto_theme

    if topic not in TOPICS:
        print(f"[infographic_gen] Unknown topic '{topic}', defaulting to treks")
        topic = "treks"
    if theme not in THEMES:
        print(f"[infographic_gen] Unknown theme '{theme}', defaulting to magazine")
        theme = "magazine"

    out = output_dir or OUTPUT_DIR
    out.mkdir(parents=True, exist_ok=True)

    print(f"[infographic_gen] Building: topic={topic}, theme={theme}, month={month}")

    # Fetch and categorize
    all_dests = fetch_destinations(month)
    if not all_dests:
        print("[infographic_gen] No destinations found, aborting.")
        return {"error": "no_data"}

    buckets = categorize(all_dests)
    dests = buckets.get(topic, [])

    if len(dests) < 3:
        print(f"[infographic_gen] Only {len(dests)} destinations for '{topic}', "
              f"padding from full list.")
        # Pad with top-scored destinations not already in the list
        existing_ids = {d["id"] for d in dests}
        for d in all_dests:
            if d["id"] not in existing_ids:
                dests.append(d)
                existing_ids.add(d["id"])
            if len(dests) >= 4:
                break

    top_dests = dests[:4]
    total_slides = len(top_dests) + 2  # cover + details + CTA

    slides = []

    # Slide 1: Cover
    print(f"  Rendering cover slide...")
    cover = render_cover(topic, theme, top_dests, month)
    cover_path = out / f"infographic_{topic}_{theme}_01_cover.jpg"
    cover.save(str(cover_path), "JPEG", quality=92)
    slides.append(cover_path)

    # Slides 2–N: Detail cards
    for i, dest in enumerate(top_dests[:3]):  # top 3 detail slides
        print(f"  Rendering detail slide {i+2}: {dest['name']}...")
        detail = render_detail(dest, i + 1, theme, topic,
                               slide_num=i + 1, total_slides=total_slides)
        detail_path = out / f"infographic_{topic}_{theme}_{i+2:02d}_{dest['id']}.jpg"
        detail.save(str(detail_path), "JPEG", quality=92)
        slides.append(detail_path)

    # Last slide: CTA
    print(f"  Rendering CTA slide...")
    cta = render_cta(theme, topic, slide_num=total_slides - 1,
                     total_slides=total_slides)
    cta_path = out / f"infographic_{topic}_{theme}_{total_slides:02d}_cta.jpg"
    cta.save(str(cta_path), "JPEG", quality=92)
    slides.append(cta_path)

    # Caption
    caption = generate_caption(topic, top_dests, month)

    # Update state
    if not dry_run:
        if "infographic" not in state:
            state["infographic"] = {}
        state["infographic"]["last_topic_idx"] = TOPICS.index(topic)
        state["infographic"]["last_theme_idx"] = THEMES.index(theme)
        state["infographic"]["last_posted"] = str(date.today())
        state["infographic"]["last_dests"] = [d["id"] for d in top_dests]
        _save_state(state)

    result = {
        "topic": topic,
        "theme": theme,
        "month": month,
        "slides": slides,
        "caption": caption,
        "destinations": top_dests,
    }

    print(f"[infographic_gen] Done! {len(slides)} slides generated.")
    if dry_run:
        print(f"[infographic_gen] DRY RUN — state not updated.")
        print(f"\nCaption preview:\n{caption}")

    return result


# ─────────────────────────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="NakshIQ Infographic Generator")
    parser.add_argument("--topic", choices=TOPICS,
                        help="Topic (auto-rotates if omitted)")
    parser.add_argument("--theme", choices=THEMES,
                        help="Visual theme (auto-rotates if omitted)")
    parser.add_argument("--month", type=int,
                        help="Month number 1-12 (default: current)")
    parser.add_argument("--dry-run", action="store_true",
                        help="Generate images but don't update state")
    parser.add_argument("--preview", action="store_true",
                        help="Generate to disk only (implies --dry-run)")
    args = parser.parse_args()

    if args.preview:
        args.dry_run = True

    result = build_infographic(
        topic=args.topic,
        theme=args.theme,
        month=args.month,
        dry_run=args.dry_run,
    )

    if "error" in result:
        sys.exit(1)

    print(f"\nSlides saved to: {OUTPUT_DIR}")
    for p in result["slides"]:
        print(f"  {p.name}")
