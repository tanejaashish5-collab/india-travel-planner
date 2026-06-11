#!/usr/bin/env python3
"""Download obscure-festival photo candidates and build labelled montage sheets
(16 per sheet, 4x4) for batch visual verification. Each tile is labelled with
its index + slug so mismatches can be rejected by slug.

Usage: python3 scripts/_montage-obscure-photos.py
Reads:  .scrapes/festival-footage/obscure-photo-picks.json
Writes: .scrapes/festival-footage/obscure-raw/<slug>.jpg
        .scrapes/festival-footage/obscure-sheets/sheet-NN.jpg + index.json
"""
import json, os, urllib.request
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PICKS = os.path.join(ROOT, ".scrapes", "festival-footage", "obscure-photo-picks.json")
RAW = os.path.join(ROOT, ".scrapes", "festival-footage", "obscure-raw")
SHEETS = os.path.join(ROOT, ".scrapes", "festival-footage", "obscure-sheets")
UA = "NakshIQ/1.0 (taneja.ashish5@gmail.com)"
os.makedirs(RAW, exist_ok=True); os.makedirs(SHEETS, exist_ok=True)

picks = json.load(open(PICKS))
slugs = sorted(picks.keys())

# download
ok = []
for slug in slugs:
    dst = os.path.join(RAW, f"{slug}.jpg")
    if not os.path.exists(dst) or os.path.getsize(dst) < 2000:
        try:
            req = urllib.request.Request(picks[slug]["url"], headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r, open(dst, "wb") as f:
                f.write(r.read())
        except Exception as e:
            print(f"FAIL {slug}: {e}"); continue
    ok.append(slug)
print(f"downloaded {len(ok)}/{len(slugs)}")

# montage: 4x4, 360x225 tiles
COLS, ROWS, CW, CH = 4, 4, 360, 225
per = COLS * ROWS
index = {}
for s in range(0, len(ok), per):
    batch = ok[s:s + per]
    sheet = Image.new("RGB", (COLS * CW, ROWS * CH), (20, 20, 20))
    d = ImageDraw.Draw(sheet)
    for i, slug in enumerate(batch):
        try:
            im = Image.open(os.path.join(RAW, f"{slug}.jpg")).convert("RGB")
        except Exception:
            continue
        sc = max(CW / im.width, CH / im.height)
        im = im.resize((int(im.width * sc) + 1, int(im.height * sc) + 1))
        l, t = (im.width - CW) // 2, (im.height - CH) // 2
        im = im.crop((l, t, l + CW, t + CH))
        x, y = (i % COLS) * CW, (i // COLS) * CH
        sheet.paste(im, (x, y))
        d.rectangle([x, y, x + CW, y + 16], fill=(0, 0, 0))
        d.text((x + 3, y + 4), f"{i+1} {slug[:42]}", fill=(255, 255, 0))
    n = s // per + 1
    sheet.save(os.path.join(SHEETS, f"sheet-{n:02d}.jpg"), quality=78)
    index[f"sheet-{n:02d}"] = batch
json.dump(index, open(os.path.join(SHEETS, "index.json"), "w"), indent=2)
print(f"built {len(index)} montage sheets in {os.path.relpath(SHEETS, ROOT)}")
