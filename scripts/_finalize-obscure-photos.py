#!/usr/bin/env python3
"""Finalize verified obscure-festival photos: normalize KEEPs → data/festivals/
photos/famphoto-<slug>.jpg and merge credits into data/festivals/photo-sources.json.
Rejects (sheet,position 1-indexed) come from manual montage verification."""
import json, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHEETS = os.path.join(ROOT, ".scrapes", "festival-footage", "obscure-sheets")
RAW = os.path.join(ROOT, ".scrapes", "festival-footage", "obscure-raw")
PICKS = os.path.join(ROOT, ".scrapes", "festival-footage", "obscure-photo-picks.json")
OUTDIR = os.path.join(ROOT, "data", "festivals", "photos")
SRCJSON = os.path.join(ROOT, "data", "festivals", "photo-sources.json")

REJECT = {  # sheet -> [positions rejected during visual verification]
  1: [2, 7, 8, 12, 15], 2: [3, 4, 8, 11, 12, 15], 3: [1, 3, 4, 7, 9, 13],
  4: [3, 5, 7, 9, 11, 15], 5: [2, 12, 14, 15, 16], 6: [2, 6, 7, 8, 9, 16],
  7: [1, 5, 9, 10], 8: [4, 5, 6, 10, 11, 13, 15], 9: [2, 5, 6, 7, 8, 9, 14, 15],
  10: [13, 15], 11: [1, 5, 9, 13, 15, 16],
}
index = json.load(open(os.path.join(SHEETS, "index.json")))
picks = json.load(open(PICKS))

reject_slugs = set()
for sheet, slugs in index.items():
    n = int(sheet.split("-")[1])
    for pos in REJECT.get(n, []):
        if 1 <= pos <= len(slugs):
            reject_slugs.add(slugs[pos - 1])

keep = [s for s in picks if s not in reject_slugs]
print(f"{len(picks)} candidates, {len(reject_slugs)} rejected, {len(keep)} keep")

def credit(c):
    lic = c["lic"]; au = (c.get("artist") or "").strip()
    if "cc0" in lic.lower() or "public domain" in lic.lower(): return ""
    who = f"{au} / " if au else ""
    return f"Photo: {who}Wikimedia Commons, {lic}"

src = json.load(open(SRCJSON)) if os.path.exists(SRCJSON) else {}
os.makedirs(OUTDIR, exist_ok=True)
saved = 0
for slug in keep:
    raw = os.path.join(RAW, f"{slug}.jpg")
    if not os.path.exists(raw):
        continue
    try:
        im = Image.open(raw).convert("RGB")
    except Exception as e:
        print(f"skip {slug}: {e}"); continue
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)))
    im.save(os.path.join(OUTDIR, f"famphoto-{slug}.jpg"), quality=82, optimize=True)
    c = picks[slug]
    src[slug] = {"family": slug, "url": c["url"], "license": c["lic"],
                 "author": (c.get("artist") or "").strip(), "credit": credit(c),
                 "title": c.get("title", "")}
    saved += 1
json.dump(src, open(SRCJSON, "w"), indent=2, ensure_ascii=False)
print(f"saved {saved} photos → {os.path.relpath(OUTDIR, ROOT)}; photo-sources.json now {len(src)} entries")
