#!/usr/bin/env python3
"""Brand only unbranded Pomelli creatives (detect by checking for charcoal footer bar)."""
import os, sys
from PIL import Image, ImageDraw, ImageFont

LIB = os.path.join(os.path.dirname(__file__), "pomelli_library")
CHARCOAL = (22, 22, 20)
CREAM    = (245, 241, 232)
BAR_H    = 60
FONT_PATHS = [
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/HelveticaNeue.ttc",
    "/Library/Fonts/Arial.ttf",
]

def get_font(size):
    for fp in FONT_PATHS:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except Exception:
                continue
    return ImageFont.load_default()

def is_branded(img):
    """Check if bottom-left pixel matches charcoal bar."""
    w, h = img.size
    px = img.getpixel((10, h - 10))[:3]
    return all(abs(px[i] - CHARCOAL[i]) < 30 for i in range(3))

def brand(path):
    img = Image.open(path).convert("RGBA")
    if is_branded(img):
        return False
    w, h = img.size
    draw = ImageDraw.Draw(img)
    draw.rectangle([(0, h - BAR_H), (w, h)], fill=CHARCOAL)
    main_font = get_font(22)
    tag_font  = get_font(11)
    draw.text((20, h - BAR_H + 12), "Naksh.iq", fill=CREAM, font=main_font)
    draw.text((20, h - BAR_H + 38), "TRAVEL WITH CONFIDENCE", fill=CREAM, font=tag_font)
    img.save(path, "PNG")
    return True

branded = 0
skipped = 0
for f in sorted(os.listdir(LIB)):
    if not f.endswith(".png"):
        continue
    fp = os.path.join(LIB, f)
    try:
        if brand(fp):
            branded += 1
            print(f"  branded: {f}")
        else:
            skipped += 1
    except Exception as e:
        print(f"  ERROR {f}: {e}")

print(f"\nDone: {branded} branded, {skipped} already branded")
