#!/usr/bin/env python3
"""Regen ONLY images with stacked bars (>80 px detected). Process in chunks of N.

Run repeatedly until output reports 'No more dirty images.' Each invocation is
self-contained — handles ~150 images per ~30s in the sandboxed env.
"""

import sys
from pathlib import Path
from PIL import Image
import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
from regen_pomelli_library import (
    detect_dark_bar_height, regen_image, load_monogram, POMELLI_DIR
)

CHUNK_SIZE = int(sys.argv[1]) if len(sys.argv) > 1 else 150
DIRTY_THRESHOLD = 80  # >80px = stacked bar (single brand_pomelli adds 56px)

mono = load_monogram()
all_imgs = sorted(p for p in POMELLI_DIR.glob("*.png"))
print(f"Library has {len(all_imgs)} PNGs.")

# Find dirty ones
dirty = []
for p in all_imgs:
    try:
        im = Image.open(p)
        bar = detect_dark_bar_height(im)
        if bar > DIRTY_THRESHOLD:
            dirty.append((p, bar))
    except Exception as e:
        print(f"  scan-fail {p.name}: {e}")

print(f"Dirty images (bar > {DIRTY_THRESHOLD}px): {len(dirty)}")
if not dirty:
    print("✅ No more dirty images. Library clean.")
    sys.exit(0)

# Process up to CHUNK_SIZE
todo = dirty[:CHUNK_SIZE]
print(f"Processing {len(todo)} this run...")
ok = fail = 0
for i, (p, original_bar) in enumerate(todo):
    try:
        regen_image(p, p, mono)
        ok += 1
        if (i + 1) % 25 == 0 or i == 0:
            print(f"  [{i+1:>3}/{len(todo)}] {p.name[:50]:<50} (was {original_bar}px)")
    except Exception as e:
        fail += 1
        print(f"  FAIL {p.name}: {e}")

remaining = len(dirty) - ok
print(f"Done this chunk: {ok} ok, {fail} fail. Remaining dirty: ~{remaining}")
