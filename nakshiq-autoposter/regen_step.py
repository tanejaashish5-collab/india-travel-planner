#!/usr/bin/env python3
"""Single-step regen — process N images, update cache after each save, exit."""
import sys, time, json
from pathlib import Path
from PIL import Image, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
from regen_pomelli_library import (
    detect_dark_bar_height, load_monogram, POMELLI_DIR,
    NEW_BAR_HEIGHT, CHARCOAL, LOGO_PADDING_LEFT, SAFETY_MARGIN, MAX_BAR_FRACTION
)

DIRTY_CACHE = Path(__file__).parent / ".regen_dirty_cache.json"
N = int(sys.argv[1]) if len(sys.argv) > 1 else 50

mono = load_monogram()

if not DIRTY_CACHE.exists():
    print("No cache — building...")
    dirty = []
    for p in sorted(POMELLI_DIR.glob("*.png")):
        try:
            if detect_dark_bar_height(Image.open(p)) > 80:
                dirty.append(str(p))
        except: pass
    DIRTY_CACHE.write_text(json.dumps(dirty))
    print(f"Built cache with {len(dirty)} dirty images")

dirty = json.loads(DIRTY_CACHE.read_text())
print(f"Cache has {len(dirty)} dirty images. Processing up to {N}...")

if not dirty:
    print("✅ ALL CLEAN")
    DIRTY_CACHE.unlink(missing_ok=True)
    sys.exit(0)

todo = dirty[:N]
ok = fail = 0
t0 = time.time()

for i, ps in enumerate(todo):
    p = Path(ps)
    try:
        im = Image.open(p).convert("RGB")
        im.load()
        w, h = im.size
        d = detect_dark_bar_height(im)
        max_a = int(h * MAX_BAR_FRACTION)
        cropped = min(d + SAFETY_MARGIN, max_a) if d > 0 else 0
        if cropped > 0:
            im = im.crop((0, 0, w, h - cropped))
        new_h = im.size[1] + NEW_BAR_HEIGHT
        out = Image.new("RGB", (w, new_h), CHARCOAL)
        out.paste(im, (0, 0))
        bar_y = im.size[1]
        mono_y = bar_y + (NEW_BAR_HEIGHT - mono.height) // 2
        out.paste(mono, (LOGO_PADDING_LEFT, mono_y), mono)
        out.save(p, "PNG")
        ok += 1
        # Update cache: remove this path
        dirty.remove(ps)
        DIRTY_CACHE.write_text(json.dumps(dirty))
    except Exception as e:
        fail += 1
        print(f"  FAIL {p.name}: {str(e)[:60]}")
    if time.time() - t0 > 35:
        print(f"  TIME BUDGET — stopping at {i+1}/{len(todo)}")
        break

print(f"Done: ok={ok} fail={fail} ({time.time()-t0:.1f}s) — remaining {len(dirty)}")
if not dirty:
    DIRTY_CACHE.unlink(missing_ok=True)
    print("✅ ALL CLEAN — cache cleared")
