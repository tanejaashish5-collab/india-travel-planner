#!/usr/bin/env python3
"""
Apply NakshIQ branding to all Pomelli creative images.

CHANGED 2026-05-03 — NO TEXT OVERLAY RULE:
Pomelli images are already data-rich. Per user direction, no drawn text glyphs
are allowed on Pomelli outputs. This script now pastes a minimal monogram LOGO
IMAGE (italic N + vermillion dot) into the 56-px charcoal footer bar — no
ImageDraw.text() calls. The 56-px bar height is preserved so existing reel
crop logic in reel_map_gen.py / reel_gen.py (crop=iw:ih-56:0:0) continues to
work without modification.

Use --no-bar to skip the footer entirely (cleanest, but reels expecting the
56-px crop will lose 56-px of real image content — only safe for fresh runs).
"""

import os
import sys
from PIL import Image

# ── Brand colours ──────────────────────────────────────────
CHARCOAL   = (22, 22, 20)      # #161614
CREAM      = (245, 241, 232)   # #F5F1E8
VERMILLION = (229, 86, 66)     # #E55642

# ── Dimensions ─────────────────────────────────────────────
BAR_HEIGHT = 56                # footer bar height in px (for 1080×1350) — DO NOT CHANGE without updating reel crops
LOGO_HEIGHT = 32               # rendered monogram height inside the bar
LOGO_PADDING_LEFT = 28

POMELLI_DIR = os.path.join(os.path.dirname(__file__), "pomelli_library")
MONOGRAM_PATH = os.path.join(
    os.path.dirname(__file__),
    "assets", "brand-pack", "nakshiq",
    "icon-system", "monogram", "nakshiq-monogram-light.png",
)


def load_monogram():
    """Load the monogram logo image, resized to LOGO_HEIGHT preserving aspect."""
    if not os.path.exists(MONOGRAM_PATH):
        print(f"  WARN: monogram not found at {MONOGRAM_PATH} — bar will be image-only")
        return None
    try:
        mono = Image.open(MONOGRAM_PATH).convert("RGBA")
        # Resize to LOGO_HEIGHT preserving aspect ratio
        ratio = LOGO_HEIGHT / mono.height
        new_w = int(mono.width * ratio)
        mono = mono.resize((new_w, LOGO_HEIGHT), Image.LANCZOS)
        return mono
    except Exception as e:
        print(f"  WARN: could not load monogram: {e}")
        return None


def brand_image(img_path, monogram, dry_run=False, no_bar=False):
    """Add NakshIQ footer bar with monogram logo IMAGE only — no text glyphs.

    Per user rule (2026-05-03): Pomelli images are already data-rich and must
    NOT have any text overlay. Brand presence comes from a small italic-N
    monogram pasted into the charcoal footer bar.
    """
    try:
        im = Image.open(img_path).convert("RGB")
    except Exception as e:
        print(f"  SKIP {os.path.basename(img_path)}: {e}")
        return False

    w, h = im.size

    if no_bar:
        # Pure pass-through — no branding added at all
        if dry_run:
            preview_path = img_path.replace(".png", "_nobar_preview.png")
            im.save(preview_path, "PNG", optimize=True)
            print(f"  PREVIEW (no-bar) → {os.path.basename(preview_path)}")
            return True
        # No-op (image already as-is)
        return True

    # Create new image with charcoal footer bar appended below original
    new_h = h + BAR_HEIGHT
    branded = Image.new("RGB", (w, new_h), CHARCOAL)
    branded.paste(im, (0, 0))

    # Paste monogram into the bar (left-aligned, vertically centred)
    if monogram is not None:
        bar_y = h
        mono_y = bar_y + (BAR_HEIGHT - monogram.height) // 2
        # Use the alpha channel as a mask so the cream N + vermillion dot
        # land cleanly on the charcoal bar without a white box.
        branded.paste(monogram, (LOGO_PADDING_LEFT, mono_y), monogram)

    if dry_run:
        preview_path = img_path.replace(".png", "_branded_preview.png")
        branded.save(preview_path, "PNG", optimize=True)
        print(f"  PREVIEW → {os.path.basename(preview_path)}")
        return True

    # Overwrite original
    branded.save(img_path, "PNG", optimize=True)
    return True


def main():
    dry_run = "--dry-run" in sys.argv
    no_bar = "--no-bar" in sys.argv
    limit = None
    for arg in sys.argv[1:]:
        if arg.startswith("--limit="):
            limit = int(arg.split("=")[1])

    monogram = None if no_bar else load_monogram()

    images = sorted(f for f in os.listdir(POMELLI_DIR) if f.endswith(".png"))
    if limit:
        images = images[:limit]

    mode = "(NO BAR)" if no_bar else ("(DRY RUN)" if dry_run else "(IN PLACE)")
    print(f"Branding {len(images)} Pomelli images {mode} — monogram-only, no text...")

    ok = 0
    fail = 0
    for i, fname in enumerate(images):
        path = os.path.join(POMELLI_DIR, fname)
        if brand_image(path, monogram, dry_run=dry_run, no_bar=no_bar):
            ok += 1
        else:
            fail += 1
        if (i + 1) % 25 == 0:
            print(f"  ... {i+1}/{len(images)}")

    print(f"\nDone: {ok} branded, {fail} failed")


if __name__ == "__main__":
    main()
