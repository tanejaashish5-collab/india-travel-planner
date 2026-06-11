#!/usr/bin/env python3
"""
regen_pomelli_library.py — strip stacked branding bars + reapply ONE clean monogram bar.

Background (2026-05-03 audit):
- 742 PNGs in pomelli_library/ have heavy multi-stacked "Naksh.iq · TRAVEL WITH
  CONFIDENCE" charcoal bars (47% have 150-180px of stacked text bar; some up
  to 1400px). brand_pomelli.py was run multiple times by accident.
- The user rule is "no overlaid text on Pomelli — already data-rich".
- This script detects the stacked dark bar dynamically per image, crops ALL of
  it, then reapplies a SINGLE clean monogram-only bar (italic N + vermillion
  dot, no text glyphs) so the 56-px reel-crop logic in reel_map_gen.py /
  reel_gen.py / yt_shorts_gen.py keeps working unchanged.

Usage:
    python3 regen_pomelli_library.py --dry-run --limit=5    # preview 5 to /tmp
    python3 regen_pomelli_library.py --limit=5              # regen 5 in place
    python3 regen_pomelli_library.py                        # regen all 742

Always test with --dry-run --limit=5 first.
"""

import argparse
import os
import sys
from pathlib import Path
from PIL import Image, ImageFile
import numpy as np

# Tolerate any truncated PNGs from past interrupted writes — recover what we can
ImageFile.LOAD_TRUNCATED_IMAGES = True

POMELLI_DIR = Path(__file__).parent / "pomelli_library"
MONOGRAM_PATH = (
    Path(__file__).parent
    / "assets" / "brand-pack" / "nakshiq"
    / "icon-system" / "monogram" / "nakshiq-monogram-light.png"
)

CHARCOAL = (22, 22, 20)         # #161614
NEW_BAR_HEIGHT = 56             # matches reel_map_gen / reel_gen crop expectation
LOGO_HEIGHT = 32
LOGO_PADDING_LEFT = 28
DARK_THRESHOLD = 60             # row mean brightness < this = "dark bar"
SAFETY_MARGIN = 8               # extra px to crop above the detected bar (anti-aliasing)
MAX_BAR_FRACTION = 0.45         # never crop more than 45% of image height (sanity guard)


def detect_dark_bar_height(im: Image.Image, threshold: int = DARK_THRESHOLD) -> int:
    """Return height (px) of contiguous dark rows at the bottom."""
    arr = np.asarray(im.convert("RGB"))
    h = arr.shape[0]
    bar = 0
    for row in range(h - 1, -1, -1):
        if arr[row].mean() < threshold:
            bar += 1
        else:
            break
    return bar


def regen_image(src_path: Path, dst_path: Path, monogram: Image.Image) -> dict:
    """Strip stacked dark bar + add one clean monogram bar.

    Returns a stats dict for logging.
    """
    im = Image.open(src_path).convert("RGB")
    w, h = im.size

    # Detect existing stacked bar
    detected = detect_dark_bar_height(im)
    max_allowed = int(h * MAX_BAR_FRACTION)
    cropped = min(detected + SAFETY_MARGIN, max_allowed) if detected > 0 else 0

    # Crop the dark stack
    if cropped > 0:
        im = im.crop((0, 0, w, h - cropped))

    # Append single 56-px charcoal bar
    new_h = im.size[1] + NEW_BAR_HEIGHT
    branded = Image.new("RGB", (w, new_h), CHARCOAL)
    branded.paste(im, (0, 0))

    # Paste monogram (no draw.text)
    if monogram is not None:
        bar_y = im.size[1]
        mono_y = bar_y + (NEW_BAR_HEIGHT - monogram.height) // 2
        branded.paste(monogram, (LOGO_PADDING_LEFT, mono_y), monogram)

    # Save (PNG preserves quality; optimize=True compresses)
    branded.save(dst_path, "PNG", optimize=True)

    return {
        "src_size": (w, h),
        "detected_bar": detected,
        "cropped": cropped,
        "out_size": branded.size,
    }


def load_monogram() -> Image.Image:
    if not MONOGRAM_PATH.exists():
        print(f"FATAL: monogram not found at {MONOGRAM_PATH}", file=sys.stderr)
        sys.exit(1)
    mono = Image.open(MONOGRAM_PATH).convert("RGBA")
    ratio = LOGO_HEIGHT / mono.height
    new_w = int(mono.width * ratio)
    return mono.resize((new_w, LOGO_HEIGHT), Image.LANCZOS)


def main():
    ap = argparse.ArgumentParser(description="Regenerate Pomelli library with clean monogram bar.")
    ap.add_argument("--dry-run", action="store_true",
                    help="Write outputs to /tmp/pomelli_regen_preview/ without touching originals.")
    ap.add_argument("--limit", type=int, default=0,
                    help="Process only first N images (default = all).")
    ap.add_argument("--filter", type=str, default="",
                    help="Substring filter on filename (e.g. 'rajasthan').")
    args = ap.parse_args()

    monogram = load_monogram()
    print(f"Monogram: {monogram.size} px loaded.")

    images = sorted(p for p in POMELLI_DIR.glob("*.png"))
    if args.filter:
        images = [p for p in images if args.filter in p.name]
    if args.limit:
        images = images[: args.limit]

    if args.dry_run:
        out_root = Path("/tmp/pomelli_regen_preview")
        out_root.mkdir(parents=True, exist_ok=True)
        print(f"DRY RUN — outputs go to {out_root}/")

    print(f"Processing {len(images)} images...")
    ok = fail = 0
    bars_summary = {"none": 0, "small": 0, "medium": 0, "large": 0, "huge": 0}

    for i, src in enumerate(images):
        try:
            dst = (Path("/tmp/pomelli_regen_preview") / src.name) if args.dry_run else src
            stats = regen_image(src, dst, monogram)
            ok += 1
            d = stats["detected_bar"]
            if d == 0:
                bars_summary["none"] += 1
            elif d < 90:
                bars_summary["small"] += 1
            elif d < 200:
                bars_summary["medium"] += 1
            elif d < 500:
                bars_summary["large"] += 1
            else:
                bars_summary["huge"] += 1
            if (i + 1) % 50 == 0 or i == 0:
                print(f"  [{i+1:>4}/{len(images)}] {src.name[:50]:<50}  "
                      f"detected={d:>4}px cropped={stats['cropped']:>4}px  "
                      f"out={stats['out_size']}")
        except Exception as e:
            fail += 1
            print(f"  FAIL {src.name}: {e}")

    print()
    print(f"Done: {ok} regenerated, {fail} failed.")
    print(f"Bar size distribution: {bars_summary}")


if __name__ == "__main__":
    main()
