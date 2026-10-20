#!/usr/bin/env python3
"""reel_cover.py — the cover image for a v3 reel (Instagram grid + Reels tab).

    python3 reel_cover.py reel_specs/triund__first_trek.json [--style box|bold] [--out x.jpg]

WHY (founder, 2026-09-29): nothing sent a cover, so the grid showed frame 0 and
read as stock photos; the first plain-text redesign was "very plain boring".
This copies what the highest-viewed Indian travel covers do (checked on their
Reels tabs 2026-09-29):
  box   @framesnflights (2M-9.7M views): white rounded box, bold black text,
        the key words in red, a contrarian or first-person hook.
  bold  @tanyakhanijow (1.4M-47M views): big white outlined words, one word in
        colour, short first-person drama ("I got robbed").
  logo  @curly.tales: the brand mark in the top corner of every cover.
English on every cover, the Hindi reel included (founder). The grid shows the
MIDDLE 3:4 of a 9:16 reel (y 240..1680 at 1920), so text and logo sit inside it.

Spec block: "cover": {"still": "kf_s5_end" | "frame": ["s3", 4.0],
                      "hook": "She said she *couldn't* do this trek."}
*asterisks* mark the highlighted words; "|" forces a line break.
The hook claims nothing the script does not.

THE HOOK MUST OPEN A QUESTION, not narrate (founder 2026-09-29: "She said she
couldn't do this trek" was "plain boring flat ... needs to be more tense, arouse
curiosity"). Stakes, a surprise or a withheld answer: "Car dead. No signal.
What now?", "Don't book Rann in October". And the still must not give the
ending away: the struggle, not the summit.
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import reel_v3 as R  # noqa: E402

# Heavy weight, like the covers it copies; falls back to the brand sans off this Mac.
HEAVY = ("/System/Library/Fonts/Avenir Next.ttc", 8)
FALLBACK = HERE / "assets" / "fonts" / "InstrumentSans-Bold.ttf"
SERIF = HERE / "assets" / "fonts" / "CrimsonPro-BoldItalic.ttf"
INK, VERMILLION, VERMILLION_BRIGHT, YELLOW = (14, 14, 12), (212, 63, 42), (229, 86, 66), (255, 210, 63)


def _font(size: int):
    try:
        return ImageFont.truetype(HEAVY[0], size, index=HEAVY[1])
    except OSError:
        return ImageFont.truetype(str(FALLBACK), size)


def _logo(d: int = 150) -> Image.Image:
    """The profile-picture mark: ink circle, white serif-italic N, vermillion dot."""
    k = 4                                    # draw big, then downsample for clean edges
    im = Image.new("RGBA", (d * k, d * k), (0, 0, 0, 0))
    g = ImageDraw.Draw(im)
    g.ellipse((0, 0, d * k - 1, d * k - 1), fill=(255, 255, 255, 235))
    g.ellipse((5 * k, 5 * k, d * k - 5 * k - 1, d * k - 5 * k - 1), fill=INK + (255,))
    f = ImageFont.truetype(str(SERIF), int(d * k * 0.62))
    bb = g.textbbox((0, 0), "N", font=f)
    nw, nh = bb[2] - bb[0], bb[3] - bb[1]
    x, y = (d * k - nw) / 2 - bb[0] - d * k * 0.05, (d * k - nh) / 2 - bb[1]
    g.text((x, y), "N", font=f, fill=(245, 241, 232))
    r = d * k * 0.055
    cx, cy = x + bb[2] + r * 1.2, y + bb[3] - r
    g.ellipse((cx - r, cy - r, cx + r, cy + r), fill=VERMILLION_BRIGHT)
    return im.resize((d, d), Image.LANCZOS)
W, H = 1080, 1920


def _tokens(hook: str) -> list[tuple[str, bool]]:
    """Words, with each *highlighted phrase* kept whole so it never breaks across lines."""
    out = []
    for i, part in enumerate(re.split(r"\*", hook)):
        if i % 2:
            out.append((part.strip(), True))
        else:
            out += [(w, False) for w in part.replace("|", " | ").split()]
    return out


def _wrap(toks, font, maxw):
    lines, cur = [], []
    for t in toks:
        if t == ("|", False):                 # a forced break from the hook
            if cur:
                lines.append(cur)
            cur = []
            continue
        trial = " ".join(w for w, _ in cur + [t])
        if cur and font.getlength(trial) > maxw:
            lines.append(cur); cur = [t]
        else:
            cur.append(t)
    return lines + ([cur] if cur else [])


def _draw_line(d, line, font, x, y, base, hi, stroke=0):
    space = font.getlength(" ")
    for w, is_hi in line:
        d.text((x, y), w, font=font, fill=hi if is_hi else base,
               stroke_width=stroke, stroke_fill=(0, 0, 0))
        x += font.getlength(w) + space


def _still(spec: dict, c: dict, td: str) -> Path:
    if c.get("frame"):
        shot, at = c["frame"]
        p = Path(td) / "frame.jpg"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", str(at), "-i",
                        str(R.CLIPS / R.clip_name(spec, shot)), "-frames:v", "1", "-q:v", "2", str(p)],
                       check=True)
        return p
    kfs = spec.get("keyframes") or [{}]
    return R.CLIPS / f"{spec['id']}__{c.get('still', kfs[-1].get('name'))}.jpg"


def _bold_layer(hook: str, hi=YELLOW) -> Image.Image:
    """The bold-style hook on a transparent 1080x1920 layer: a soft dark fade over
    the top band plus the outlined words. The cover lays it on a still; the reel
    lays it over its first seconds (reel_v3.render), so both open on the same line."""
    toks = _tokens(hook)
    shade = Image.new("L", (W, H), 0)
    ImageDraw.Draw(shade).rectangle((0, 0, W, 900), fill=90)
    lay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    lay.putalpha(shade.filter(ImageFilter.GaussianBlur(120)))
    d = ImageDraw.Draw(lay)
    if "|" in hook:
        # each forced line sized on its own: the short punch line gets the biggest type
        segs, cur = [], []
        for tk in toks:
            if tk == ("|", False):
                segs.append(cur); cur = []
            else:
                cur.append(tk)
        segs.append(cur)
        y = 450                          # below the logo (268..418)
        for seg in segs:
            size = 170 if any(h for _, h in seg) else 128
            # shrink to a readable floor, then WRAP rather than run off the frame
            # (10-06: 17-word hooks overflowed both edges on four covers)
            while size > 80 and _font(size).getlength(" ".join(w for w, _ in seg)) > 900:
                size -= 4
            font = _font(size)
            if font.getlength(" ".join(w for w, _ in seg)) > 900:
                # a highlighted phrase is kept whole only while it fits; split it into words
                seg = [(w, h) for t, h in seg for w in t.split()]
            for line in _wrap(seg, font, 900):
                lw = font.getlength(" ".join(w for w, _ in line))
                _draw_line(d, line, font, (W - lw) / 2, y, (255, 255, 255), hi, stroke=max(5, size // 18))
                y += int(size * 1.12)
    else:
        size = 132
        while True:
            font = _font(size)
            lines = _wrap(toks, font, 900)
            widest = max(font.getlength(" ".join(w for w, _ in l)) for l in lines)
            if (len(lines) <= 3 and widest <= 940) or size <= 96:
                break
            size -= 6
        y = 450
        for line in lines:
            lw = font.getlength(" ".join(w for w, _ in line))
            _draw_line(d, line, font, (W - lw) / 2, y, (255, 255, 255), hi, stroke=7)
            y += int(size * 1.12)
    return lay


def hook_overlay(spec: dict, out: Path) -> Path | None:
    """PNG of the cover hook for the reel's opening seconds; None if the spec has no hook.
    Coaches' data: the first 3 seconds decide distribution, and our v3 reels opened
    on a quiet establishing shot with nothing on screen (founder plan, 2026-09-29)."""
    hook = (spec.get("cover") or {}).get("hook")
    if not hook:
        return None
    out.parent.mkdir(parents=True, exist_ok=True)
    _bold_layer(hook).save(out, "PNG")
    return out


def make(spec: dict, out: Path, style: str = "bold") -> Path:
    c = spec.get("cover") or {}
    if not c.get("hook"):
        raise SystemExit(f"{spec['id']}: spec has no cover.hook")
    with tempfile.TemporaryDirectory() as td:
        src = _still(spec, c, td)
        if not src.exists():
            raise SystemExit(f"missing still {src}")
        im = Image.open(src).convert("RGB")
    return _compose(im, c["hook"], out, style)


def from_image(src: Path, hook: str, out: Path, hi=YELLOW, tag: str | None = None) -> Path:
    """The same bold cover on any picture (guide and long-weekend reels, 10-06: they
    posted with Instagram's default frame, which caught the title before it faded in)."""
    return _compose(Image.open(src).convert("RGB"), hook, out, "bold", hi=hi, tag=tag)


def _compose(im: Image.Image, hook: str, out: Path, style: str, hi=YELLOW, tag: str | None = None) -> Path:
    c = {"hook": hook}
    s = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    im = im.crop(((im.width - W) // 2, (im.height - H) // 2, (im.width - W) // 2 + W, (im.height - H) // 2 + H))
    toks = _tokens(c["hook"])

    if style == "bold":
        im = Image.alpha_composite(im.convert("RGBA"), _bold_layer(c["hook"], hi)).convert("RGB")
    else:
        font = _font(86)
        lines = _wrap(toks, font, 860)
        lh = int(86 * 1.2)
        bw = max(font.getlength(" ".join(w for w, _ in l)) for l in lines) + 88
        bh = lh * len(lines) + 64
        bx, by = (W - bw) / 2, 1180 - bh / 2
        shadow = Image.new("L", (W, H), 0)
        ImageDraw.Draw(shadow).rounded_rectangle((bx + 6, by + 12, bx + bw + 6, by + bh + 12), 34, fill=120)
        im = Image.composite(Image.new("RGB", (W, H), (0, 0, 0)), im, shadow.filter(ImageFilter.GaussianBlur(18)))
        d = ImageDraw.Draw(im)
        d.rounded_rectangle((bx, by, bx + bw, by + bh), 34, fill=(255, 255, 255))
        y = by + 30
        for line in lines:
            lw = font.getlength(" ".join(w for w, _ in line))
            _draw_line(d, line, font, (W - lw) / 2, y, INK, VERMILLION)
            y += lh

    # logo: the same mark as the profile picture, top LEFT, inside the grid band.
    # Top right sat under Instagram's own reel badge on the grid (Manali, 2026-09-29).
    logo = _logo(150)
    im.paste(logo, (50, 268), logo)
    if tag:
        # the series tag (voiced reels, founder 2026-10-20): an Ink pill with a vermillion rule, low in the grid band,
        # so the profile grid reads as recurring shows
        f = ImageFont.truetype(str(FALLBACK), 44)
        tw = f.getlength(" ".join(tag.upper())) + 72
        bx, by = (W - tw) / 2, 1520
        d = ImageDraw.Draw(im)
        d.rounded_rectangle((bx, by, bx + tw, by + 84), 42, fill=INK, outline=VERMILLION_BRIGHT, width=4)
        d.text((W / 2, by + 42), " ".join(tag.upper()), font=f, fill=(245, 241, 232), anchor="mm")
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, "JPEG", quality=90)
    return out


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("spec"); ap.add_argument("--style", default="bold", choices=["box", "bold"])
    ap.add_argument("--out")
    a = ap.parse_args()
    s = R.load(a.spec)
    o = Path(a.out) if a.out else R.VEO / "reels" / f"{s['id']}__cover.jpg"
    print(f"[cover] wrote {make(s, o, a.style)}")


# ─── Voiced-reel covers: three styles, one per series (founder 2026-10-20) ─────────────────────────
# He compared three full sets and chose to mix them by series: A "bold hook" (from_image with hi=VERMILLION_BRIGHT
# and a series tag), B "verdict stamp" (stamp_cover, the "middle" stamp he called perfect: v1's worn see-through
# ink, brighter and a touch heavier, no plate glow) and C "everyone vs you" (split_cover). place_voiced.SERIES_COVER
# maps series to style. Everything stays inside the grid's middle 3:4 (y 240..1680).
BONE = (245, 241, 232)
STAMP = (250, 88, 60)
_FONTS = HERE / "assets" / "fonts"


def _tf(name: str, size: int):
    return ImageFont.truetype(str(_FONTS / name), size)


def _fill(im: Image.Image, w: int, h: int, focus=(0.5, 0.5)) -> Image.Image:
    s = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x, y = int((im.width - w) * focus[0]), int((im.height - h) * focus[1])
    return im.crop((x, y, x + w, y + h))


def _fit(text: str, fn, size: int, maxw: int, floor: int = 40):
    while size > floor and fn(size).getlength(text) > maxw:
        size -= 4
    return fn(size)


def stamp_cover(src: Path, line: str, stamp: str, out: Path, focus=(0.5, 0.5)) -> Path:
    """B: photo toned to Ink and Bone, a serif-italic setup line, one worn vermillion stamp at an angle."""
    from PIL import ImageOps
    im = _fill(Image.open(src).convert("RGB"), W, H, focus)
    g = ImageOps.autocontrast(ImageOps.grayscale(im), cutoff=1)
    im = ImageOps.colorize(g, black=INK, white=BONE, mid=(120, 112, 100)).convert("RGBA")
    shade = Image.new("L", (W, H), 0)
    d0 = ImageDraw.Draw(shade)
    d0.rectangle((0, 0, W, 760), fill=150); d0.rectangle((0, 1300, W, H), fill=120)
    dark = Image.new("RGBA", (W, H), INK + (255,)); dark.putalpha(shade.filter(ImageFilter.GaussianBlur(140)))
    im = Image.alpha_composite(im, dark)
    d = ImageDraw.Draw(im)
    f = _fit(line, lambda s: _tf("CrimsonPro-Italic.ttf", s), 96, 920)
    d.text((W / 2, 560), line, font=f, fill=BONE, anchor="mm")
    d.line((W / 2 - 70, 640, W / 2 + 70, 640), fill=VERMILLION_BRIGHT, width=5)
    sf = _fit(stamp.replace("₹", "Rs"), _font, 220, 800, 100)
    rf = _tf("NotoSansDevanagari-Bold.ttf", int(sf.size * 1.05))      # the heavy face has no rupee sign
    parts = [(ch, rf if ch == "₹" else sf) for ch in stamp]
    tw = sum(f_.getlength(ch) + (14 if ch == "₹" else 0) for ch, f_ in parts)
    asc = sf.getbbox("H")[3] - sf.getbbox("H")[1]
    pad = 50
    st = Image.new("RGBA", (int(tw + pad * 2 + 24), int(asc + pad * 2 + 40)), (0, 0, 0, 0))
    sd = ImageDraw.Draw(st)
    sd.rounded_rectangle((12, 12, st.width - 12, st.height - 12), 30, outline=STAMP + (255,), width=18)
    x = pad + 12
    for ch, f_ in parts:
        sd.text((x, st.height / 2), ch, font=f_, fill=STAMP + (255,), anchor="lm",
                stroke_width=6 if ch == "₹" else 1, stroke_fill=STAMP + (255,))
        x += f_.getlength(ch) + (14 if ch == "₹" else 0)
    grain = Image.effect_noise(st.size, 70).point(lambda v: 0 if v < 58 else 255)    # light wear
    st.putalpha(Image.composite(st.getchannel("A"), Image.new("L", st.size, 0), grain))
    st = st.rotate(-7, expand=True, resample=Image.BICUBIC)
    sx, sy = int((W - st.width) / 2), int(960 - st.height / 2)
    plate = Image.new("L", (W, H), 0)
    ImageDraw.Draw(plate).rounded_rectangle((sx + 30, sy + 40, sx + st.width - 30, sy + st.height - 40), 40, fill=70)
    ink = Image.new("RGBA", (W, H), INK + (255,)); ink.putalpha(plate.filter(ImageFilter.GaussianBlur(40)))
    im = Image.alpha_composite(im, ink)
    st.putalpha(st.getchannel("A").point(lambda v: int(v * 0.9)))                   # ink on paper, not a sticker
    im.alpha_composite(st, (sx, sy))
    logo = _logo(150)
    im.paste(logo, (50, 268), logo)
    out.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(out, "JPEG", quality=90)
    return out


def split_cover(top: Path, top_label: str, bottom: Path, bottom_label: str, hook: str, out: Path,
                ft=(0.5, 0.5), fb=(0.5, 0.5)) -> Path:
    """C: what everyone does over what you should know, a Bone band with the hook between them.
    hook: "first line|*vermillion line*"."""
    im = Image.new("RGB", (W, H), INK)
    half, band = 820, 280
    im.paste(_fill(Image.open(top).convert("RGB"), W, half, ft), (0, 0))
    im.paste(_fill(Image.open(bottom).convert("RGB"), W, H - half - band, fb), (0, half + band))
    d = ImageDraw.Draw(im)
    d.rectangle((0, half, W, half + band), fill=BONE)
    lines = hook.split("|")
    y = half + band / 2 - (len(lines) - 1) * 52
    for ln in lines:
        hi = ln.startswith("*")
        ln = ln.strip("*")
        d.text((W / 2, y), ln, font=_fit(ln, _font, 104, 960, 60), fill=VERMILLION_BRIGHT if hi else INK, anchor="mm")
        y += 104

    def label(text, x, y, bg):
        f = _tf("NotoSansDevanagari-Bold.ttf" if "₹" in text else "JetBrainsMono-Bold.ttf", 40)
        d.rounded_rectangle((x, y, x + f.getlength(text) + 44, y + 70), 12, fill=bg)
        d.text((x + 22, y + 35), text, font=f, fill=BONE, anchor="lm")
    label(top_label, 60, half - 110, INK)
    label(bottom_label, 60, half + band + 40, VERMILLION_BRIGHT)
    logo = _logo(130)
    im.paste(logo, (50, 268), logo)
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, "JPEG", quality=90)
    return out
