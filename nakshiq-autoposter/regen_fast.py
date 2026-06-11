#!/usr/bin/env python3
"""Fast regen — caches dirty list, parallel processing, time-budgeted."""
import sys, time, json, os
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
from regen_pomelli_library import (
    detect_dark_bar_height, load_monogram, POMELLI_DIR,
    NEW_BAR_HEIGHT, CHARCOAL, LOGO_PADDING_LEFT, SAFETY_MARGIN, MAX_BAR_FRACTION
)

DIRTY_CACHE = Path(__file__).parent / ".regen_dirty_cache.json"
TIME_BUDGET = 35.0

mono = load_monogram()


def regen_one(p):
    try:
        im = Image.open(p).convert("RGB")
        im.load()
        w, h = im.size
        d = detect_dark_bar_height(im)
        if d <= 80:
            return ("skip-already-clean", str(p))
        max_a = int(h * MAX_BAR_FRACTION)
        cropped = min(d + SAFETY_MARGIN, max_a)
        im = im.crop((0, 0, w, h - cropped))
        new_h = im.size[1] + NEW_BAR_HEIGHT
        out = Image.new("RGB", (w, new_h), CHARCOAL)
        out.paste(im, (0, 0))
        bar_y = im.size[1]
        mono_y = bar_y + (NEW_BAR_HEIGHT - mono.height) // 2
        out.paste(mono, (LOGO_PADDING_LEFT, mono_y), mono)
        out.save(p, "PNG")
        return ("ok", str(p))
    except Exception as e:
        return (f"fail:{e}", str(p))


# Load or rebuild dirty cache
all_imgs = sorted(POMELLI_DIR.glob("*.png"))
if DIRTY_CACHE.exists():
    cached = json.loads(DIRTY_CACHE.read_text())
    dirty = [Path(p) for p in cached if Path(p).exists()]
    print(f"Loaded dirty cache: {len(dirty)} images")
else:
    dirty = []
    for p in all_imgs:
        try:
            im = Image.open(p)
            if detect_dark_bar_height(im) > 80:
                dirty.append(p)
        except:
            pass
    DIRTY_CACHE.write_text(json.dumps([str(p) for p in dirty]))
    print(f"Built dirty cache: {len(dirty)} images")

if not dirty:
    print("✅ ALL CLEAN")
    DIRTY_CACHE.unlink(missing_ok=True)
    sys.exit(0)

ok = fail = 0
t0 = time.time()
results = {}
# Parallel with 4 workers (PIL releases GIL during disk I/O)
with ThreadPoolExecutor(max_workers=4) as ex:
    futs = {ex.submit(regen_one, p): p for p in dirty}
    for fut in as_completed(futs):
        if time.time() - t0 > TIME_BUDGET:
            break
        result, path = fut.result()
        results[path] = result
        if result == "ok":
            ok += 1
        elif result.startswith("fail"):
            fail += 1
            print(f"  FAIL {path}: {result[5:80]}")

# Update cache: remove successfully cleaned, keep the rest
remaining = [p for p in dirty if results.get(str(p)) != "ok"]
DIRTY_CACHE.write_text(json.dumps([str(p) for p in remaining]))

elapsed = time.time() - t0
print(f"This run: ok={ok}, fail={fail}, {elapsed:.1f}s")
print(f"Remaining: {len(remaining)}")
if not remaining:
    print("✅ ALL CLEAN — removing cache.")
    DIRTY_CACHE.unlink(missing_ok=True)
