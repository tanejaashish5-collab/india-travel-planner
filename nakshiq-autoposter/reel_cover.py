#!/usr/bin/env python3
"""reel_cover.py — the cover image for a v3 reel (Instagram grid + Reels tab).

    python3 reel_cover.py reel_specs/triund__first_trek.json --lang hi [--out x.jpg]

WHY (founder, 2026-09-29: "why dont we have any proper thumbnails"): nothing
sent a cover, so Instagram used frame 0 of every reel and the grid read as
anonymous stock photos. Outstand takes `instagram.reelCoverUrl`.

The spec's "cover" block names the still and two short lines per language:
  "cover": {"still": "kf_s5_end", "en": ["Her first trek.", "NakshIQ said easy."],
            "hi": [...]}
The grid shows the MIDDLE 3:4 of a 9:16 reel (y 240..1680 at 1920), so every
word sits inside that band. Built with ffmpeg because its drawtext shapes
Devanagari (HarfBuzz); Pillow here has no raqm and breaks the matras.
The cover makes the same claims as the script and no others.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import reel_v3 as R  # noqa: E402

FONTS = HERE / "assets" / "fonts"
FONT = {"en": FONTS / "InstrumentSans-Bold.ttf", "hi": FONTS / "NotoSansDevanagari-Bold.ttf"}
BRAND = FONTS / "InstrumentSans-Bold.ttf"


def _esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace("'", "’").replace(":", "\\:").replace("%", "\\%")


def _size(text: str, big: int) -> int:
    """Shrink long lines so they fit the 1080 width with a margin."""
    return big if len(text) <= 16 else int(big * 16 / len(text) * 1.15)


def make(spec: dict, lang: str, out: Path) -> Path:
    c = spec.get("cover") or {}
    lines = c.get(lang) or c.get("en")
    if not lines:
        raise SystemExit(f"{spec['id']}: no cover lines for {lang}")
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        if c.get("frame"):             # ["s3", 4.0]: a frame of a shot, for specs without keyframe stills
            shot, at = c["frame"]
            still = Path(td) / "frame.jpg"
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", str(at), "-i",
                            str(R.CLIPS / R.clip_name(spec, shot)), "-frames:v", "1", "-q:v", "2",
                            str(still)], check=True)
        else:
            kfs = spec.get("keyframes") or [{}]
            still = R.CLIPS / f"{spec['id']}__{c.get('still', kfs[-1].get('name'))}.jpg"
        if not still.exists():
            raise SystemExit(f"missing still {still}")
        # Copy fonts: drawtext paths with spaces ("India Travel Planner") need no escaping this way.
        f_main, f_brand = Path(td) / "m.ttf", Path(td) / "b.ttf"
        f_main.write_bytes(FONT[lang].read_bytes()); f_brand.write_bytes(BRAND.read_bytes())
        head, sub = lines[0], (lines[1] if len(lines) > 1 else "")
        vf = [
            "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920",
            # a soft dark fade under the text (stepped boxes, no hard edge)
            *[f"drawbox=x=0:y={1120 + i * 40}:w=1080:h={800 - i * 40}:color=black@0.06:t=fill"
              for i in range(12)],
            f"drawtext=fontfile={f_brand}:text='NakshIQ':fontsize=64:fontcolor=white:"
            f"x=(w-text_w)/2:y=290:shadowcolor=black@0.6:shadowx=2:shadowy=2",
            f"drawtext=fontfile={f_main}:text='{_esc(head)}':fontsize={_size(head, 132)}:"
            f"fontcolor=white:x=(w-text_w)/2:y=1330:shadowcolor=black@0.8:shadowx=3:shadowy=3",
        ]
        if sub:
            vf.append(f"drawtext=fontfile={f_main}:text='{_esc(sub)}':fontsize={_size(sub, 76)}:fontcolor=0xFFD166:"
                      f"x=(w-text_w)/2:y=1520:shadowcolor=black@0.7:shadowx=2:shadowy=2")
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(still), "-vf", ",".join(vf),
                        "-frames:v", "1", "-q:v", "3", "-pix_fmt", "yuvj420p", str(out)], check=True)
    return out


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("spec"); ap.add_argument("--lang", default="en"); ap.add_argument("--out")
    a = ap.parse_args()
    s = R.load(a.spec)
    o = Path(a.out) if a.out else R.VEO / "reels" / f"{s['id']}__{a.lang}__cover.jpg"
    print(f"[cover] wrote {make(s, a.lang, o)}")
