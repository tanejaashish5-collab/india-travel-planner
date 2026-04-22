#!/usr/bin/env python3
"""
Apply NakshIQ branding to all Pomelli creative images.

Adds a charcoal (#161614) footer bar at the bottom with:
  - Left: "Naksh.iq" text (cream #F5F1E8) with vermillion dot
  - Right: "TRAVEL WITH CONFIDENCE" tagline (muted cream)

Matches the style of existing social_image_library watermarks.
"""

import os
import sys
from PIL import Image, ImageDraw, ImageFont

# ── Brand colours ──────────────────────────────────────────
CHARCOAL   = (22, 22, 20)      # #161614
CREAM      = (245, 241, 232)   # #F5F1E8
VERMILLION = (229, 86, 66)     # #E55642
MUTED_CREAM = (180, 175, 165)  # slightly muted for tagline

# ── Dimensions ─────────────────────────────────────────────
BAR_HEIGHT = 56                # footer bar height in px (for 1080×1350)
LOGO_PADDING_LEFT = 28
TAGLINE_PADDING_RIGHT = 28

POMELLI_DIR = os.path.join(os.path.dirname(__file__), "pomelli_library")


def load_fonts():
    """Try to load brand fonts, fall back to defaults."""
    # Try system fonts first, then bundled, then default
    font_paths = [
        # Common Linux paths
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
    ]
    
    serif_font = None
    sans_font = None
    
    for fp in font_paths:
        if os.path.exists(fp) and serif_font is None and "Serif" in fp:
            serif_font = fp
        if os.path.exists(fp) and sans_font is None and "Sans" in fp:
            sans_font = fp
    
    # Logo text: "Naksh.iq" — serif italic style, ~22px
    try:
        logo_font = ImageFont.truetype(serif_font or font_paths[0], 24)
    except Exception:
        logo_font = ImageFont.load_default()
    
    # Tagline: "TRAVEL WITH CONFIDENCE" — sans, spaced, ~12px  
    try:
        tagline_font = ImageFont.truetype(sans_font or font_paths[1], 13)
    except Exception:
        tagline_font = ImageFont.load_default()
    
    return logo_font, tagline_font


def brand_image(img_path, logo_font, tagline_font, dry_run=False):
    """Add NakshIQ footer bar to a single image, overwriting in place."""
    try:
        im = Image.open(img_path).convert("RGB")
    except Exception as e:
        print(f"  SKIP {os.path.basename(img_path)}: {e}")
        return False
    
    w, h = im.size
    
    # Create new image with footer bar
    new_h = h + BAR_HEIGHT
    branded = Image.new("RGB", (w, new_h), CHARCOAL)
    branded.paste(im, (0, 0))
    
    # Draw on the footer bar
    draw = ImageDraw.Draw(branded)
    bar_y = h  # top of footer bar
    bar_mid_y = bar_y + BAR_HEIGHT // 2
    
    # ── Left side: "Naksh" + vermillion dot + "iq" ──
    # Draw "Naksh" in cream
    naksh_text = "Naksh"
    dot_text = "."
    iq_text = "iq"
    
    x = LOGO_PADDING_LEFT
    
    # Get text dimensions
    naksh_bbox = draw.textbbox((0, 0), naksh_text, font=logo_font)
    naksh_w = naksh_bbox[2] - naksh_bbox[0]
    naksh_h = naksh_bbox[3] - naksh_bbox[1]
    
    dot_bbox = draw.textbbox((0, 0), dot_text, font=logo_font)
    dot_w = dot_bbox[2] - dot_bbox[0]
    
    text_y = bar_mid_y - naksh_h // 2 - 2
    
    draw.text((x, text_y), naksh_text, fill=CREAM, font=logo_font)
    x += naksh_w
    draw.text((x, text_y), dot_text, fill=VERMILLION, font=logo_font)
    x += dot_w
    draw.text((x, text_y), iq_text, fill=CREAM, font=logo_font)
    
    # ── Right side: "TRAVEL WITH CONFIDENCE" ──
    tagline = "T R A V E L   W I T H   C O N F I D E N C E"
    tag_bbox = draw.textbbox((0, 0), tagline, font=tagline_font)
    tag_w = tag_bbox[2] - tag_bbox[0]
    tag_h = tag_bbox[3] - tag_bbox[1]
    tag_x = w - tag_w - TAGLINE_PADDING_RIGHT
    tag_y = bar_mid_y - tag_h // 2 - 1
    draw.text((tag_x, tag_y), tagline, fill=MUTED_CREAM, font=tagline_font)
    
    if dry_run:
        # Save to temp for preview
        preview_path = img_path.replace(".png", "_branded_preview.png")
        branded.save(preview_path, "PNG", optimize=True)
        print(f"  PREVIEW → {os.path.basename(preview_path)}")
        return True
    
    # Overwrite original
    branded.save(img_path, "PNG", optimize=True)
    return True


def main():
    dry_run = "--dry-run" in sys.argv
    limit = None
    for arg in sys.argv[1:]:
        if arg.startswith("--limit="):
            limit = int(arg.split("=")[1])
    
    logo_font, tagline_font = load_fonts()
    
    images = sorted(f for f in os.listdir(POMELLI_DIR) if f.endswith(".png"))
    if limit:
        images = images[:limit]
    
    print(f"Branding {len(images)} Pomelli images {'(DRY RUN)' if dry_run else '(IN PLACE)'}...")
    
    ok = 0
    fail = 0
    for i, fname in enumerate(images):
        path = os.path.join(POMELLI_DIR, fname)
        if brand_image(path, logo_font, tagline_font, dry_run=dry_run):
            ok += 1
        else:
            fail += 1
        if (i + 1) % 25 == 0:
            print(f"  ... {i+1}/{len(images)}")
    
    print(f"\nDone: {ok} branded, {fail} failed")


if __name__ == "__main__":
    main()
