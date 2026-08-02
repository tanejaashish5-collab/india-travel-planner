#!/usr/bin/env python3
"""
editorial_slides.py — editorial "infographic" carousel renderer (2026-07-20).

WHY THIS EXISTS
  Founder approved upgrading the daily verified-data carousel from the dark
  photo-scrim PIL slides to the editorial cream "carousel essay" style (big
  sans headline + italic-serif accent, numbered chip header, icon rows,
  handwritten margin notes, polaroid photo card). Prototype + design grammar:
  data/design/editorial-carousel-2026-07-20/ in the main repo.

HOW IT FITS
  carousel_studio.py's five slide painters call into here when
  NAKSHIQ_EDITORIAL_CAROUSEL != "0" and available() is True; on ANY failure
  they fall back to the original PIL painters, so the daily slot can never go
  dark because of Chrome/fonts. This module renders HTML → PNG via headless
  Chrome (preinstalled on the GHA ubuntu runner) and returns PIL Images so the
  existing _to_jpeg / upload path is untouched. Data flow is unchanged — every
  string still comes from the verified `content` dict; this file only styles.

FONTS (bundled in assets/fonts, all OFL — runner-safe, no network):
  InstrumentSans Regular/Bold (body/headline) · CrimsonPro Italic (accent) ·
  Caveat (handwritten notes) · NotoSansDevanagari Bold (Hindi glyph fallback).
"""
from __future__ import annotations
import html as _html
import os, shutil, subprocess, tempfile
from pathlib import Path

from PIL import Image

HERE = Path(__file__).parent
FONTS = HERE / "assets" / "fonts"
W, H = 1080, 1350

# palette (matches the approved prototype)
CREAM = "#F6F0E2"; INK = "#171310"; BODY = "#3E382E"; ACCENT = "#C05A2E"
TILE = "#EFE3CA"; DIVIDER = "#E5DAC2"; MUTED = "#8B8578"; PILL = "#7E7668"

_REQUIRED_FONTS = [
    "InstrumentSans-Regular.ttf", "InstrumentSans-Bold.ttf",
    "CrimsonPro-Italic.ttf", "Caveat-Bold.ttf", "NotoSansDevanagari-Bold.ttf",
]


def _chrome() -> str | None:
    for c in (os.environ.get("CHROME_BIN"), "google-chrome", "google-chrome-stable",
              "chromium-browser", "chromium"):
        if c and shutil.which(c):
            return shutil.which(c)
    mac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    return mac if os.path.exists(mac) else None


def available() -> bool:
    return _chrome() is not None and all((FONTS / f).exists() for f in _REQUIRED_FONTS)


def _e(s) -> str:
    return _html.escape(str(s or ""))


ICONS = {
    "pin":   '<path d="M20 36c8-9 12-15 12-21a12 12 0 1 0-24 0c0 6 4 12 12 21z"/><circle cx="20" cy="15" r="4"/>',
    "alert": '<path d="M20 5 35 32H5L20 5z M20 15v8 M20 27v.5"/>',
    "flag":  '<path d="M10 36V6 M10 7c7-4 13 4 20 0v14c-7 4-13-4-20 0"/>',
    "star":  '<path d="M20 4l4.5 10.5L36 16l-8.5 8L30 36l-10-6.5L10 36l2.5-12L4 16l11.5-1.5L20 4z"/>',
    "coin":  '<circle cx="20" cy="20" r="14"/><path d="M15 24c0 3 10 3 10 0s-10-3-10-6 10-3 10 0 M20 11v3 M20 26v3"/>',
    "bowl":  '<path d="M6 18h28a14 14 0 0 1-28 0z M14 18c0-8 3-12 3-12 M22 18c0-8 3-12 3-12"/>',
    "cal":   '<rect x="7" y="9" width="26" height="24" rx="3"/><path d="M7 16h26 M14 6v6 M26 6v6"/>',
    "swap":  '<path d="M8 14h20l-5-5 M32 26H12l5 5"/>',
    "globe": '<circle cx="20" cy="20" r="15"/><path d="M5 20h30 M20 5c-5 5-5 25 0 30 M20 5c5 5 5 25 0 30"/>',
    "bookmark": '<path d="M11 5h18v30l-9-7-9 7V5z"/>',
}

CSS = f"""
@font-face {{ font-family:'EdSans'; src:url('file://{FONTS}/InstrumentSans-Regular.ttf'); }}
@font-face {{ font-family:'EdSansBold'; src:url('file://{FONTS}/InstrumentSans-Bold.ttf'); }}
@font-face {{ font-family:'EdSerif'; src:url('file://{FONTS}/CrimsonPro-Italic.ttf'); }}
@font-face {{ font-family:'EdHand'; src:url('file://{FONTS}/Caveat-Bold.ttf'); }}
@font-face {{ font-family:'EdDeva'; src:url('file://{FONTS}/NotoSansDevanagari-Bold.ttf'); }}
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{W}px; height:{H}px; }}
body {{ background:{CREAM}; color:{INK}; overflow:hidden; position:relative;
  font-family:'EdSans','EdDeva',sans-serif; padding:64px 72px 56px; }}
body::after {{ content:''; position:absolute; inset:0; pointer-events:none;
  background-image:radial-gradient(#00000008 1px, transparent 1px); background-size:5px 5px; }}
.chipbar {{ display:flex; align-items:center; gap:16px; margin-bottom:48px; }}
.chip-num {{ background:{INK}; color:{CREAM}; font-family:'EdSansBold'; font-size:26px; padding:8px 14px; letter-spacing:1px; }}
.chip-label {{ border:2px solid {INK}; background:#FDFAF2; font-family:'EdSansBold';
  font-size:23px; letter-spacing:1.5px; padding:8px 18px; text-transform:uppercase; white-space:nowrap;
  max-width:640px; overflow:hidden; text-overflow:ellipsis; }}
.leader {{ flex:1; border-bottom:4px dotted #C9BCA0; margin-top:4px; }}
.counter {{ background:{PILL}; color:{CREAM}; font-family:'EdSansBold'; font-size:27px; border-radius:40px; padding:11px 22px; white-space:nowrap; }}
.state {{ font-family:'EdSansBold'; font-size:28px; letter-spacing:4px; color:{ACCENT}; text-transform:uppercase; margin-bottom:14px; }}
h1 {{ font-family:'EdSansBold','EdDeva'; font-size:92px; line-height:1.04; font-weight:400; letter-spacing:-2px; margin-bottom:14px; }}
h1 .accent {{ font-family:'EdSerif','EdDeva'; font-style:italic; color:{ACCENT}; letter-spacing:-1px; }}
h1.smaller {{ font-size:76px; }}
.underline {{ margin:-4px 0 30px 4px; }}
.kicker {{ font-size:33px; line-height:1.45; color:{BODY}; margin-bottom:34px; max-width:700px; }}
.kicker b {{ font-family:'EdSansBold'; color:{INK}; font-weight:400; }}
.rows {{ display:flex; flex-direction:column; }}
.row {{ display:flex; gap:28px; align-items:flex-start; padding:26px 0; }}
.row + .row {{ border-top:2px solid {DIVIDER}; }}
.tile {{ flex:0 0 88px; height:88px; border-radius:20px; background:{TILE}; display:flex; align-items:center; justify-content:center; }}
.tile svg {{ width:42px; height:42px; stroke:{ACCENT}; stroke-width:2.6; fill:none; stroke-linecap:round; stroke-linejoin:round; }}
.row .txt {{ font-size:32px; line-height:1.42; padding-top:6px; color:{BODY}; }}
.row .txt b {{ font-family:'EdSansBold'; color:{INK}; font-weight:400; }}
.badge {{ display:inline-block; font-family:'EdSansBold'; font-size:30px; letter-spacing:2px;
  text-transform:uppercase; padding:12px 26px; border-radius:12px; margin-bottom:26px; }}
.badge.go {{ background:{ACCENT}; color:{CREAM}; }}
.badge.stop {{ background:{INK}; color:{CREAM}; }}
.badge.plain {{ border:2px solid {INK}; background:#FDFAF2; color:{INK}; }}
.note {{ position:absolute; font-family:'EdHand'; font-size:40px; line-height:1.25; color:{INK};
  transform:rotate(-4deg); max-width:340px; }}
.polaroid {{ position:absolute; background:#FDFAF2; padding:14px 14px 44px;
  box-shadow:0 14px 34px rgba(23,19,16,.18); border:1px solid #E8DEC8; }}
.polaroid img {{ display:block; object-fit:cover; }}
.polaroid .cap {{ position:absolute; left:0; right:0; bottom:8px; text-align:center;
  font-family:'EdHand'; font-size:28px; color:{BODY}; }}
.sitechip {{ display:inline-block; background:{ACCENT}; color:{CREAM}; font-family:'EdSansBold';
  font-size:38px; padding:18px 34px; border-radius:14px; margin-top:26px; }}
.footer {{ position:absolute; left:72px; right:72px; bottom:44px; display:flex; align-items:center;
  gap:16px; font-size:23px; color:{MUTED}; }}
.footer .brand {{ font-family:'EdSansBold'; letter-spacing:3px; color:{INK}; }}
.footer .dot {{ width:6px; height:6px; border-radius:3px; background:#C9BCA0; }}
.footer .swipe {{ margin-left:auto; border:2px solid {INK}; border-radius:40px; padding:8px 22px;
  font-family:'EdSansBold'; color:{INK}; background:#FDFAF2; }}
"""


def _icon(name):
    return f'<svg viewBox="0 0 40 40">{ICONS.get(name, ICONS["pin"])}</svg>'


def _underline(width_px: int) -> str:
    w = max(220, min(width_px, 620))
    return (f'<svg class="underline" width="{w}" height="16" viewBox="0 0 {w} 16">'
            f'<path d="M4 11 C {int(w*.3)} 2, {int(w*.7)} 14, {w-6} 7" stroke="{ACCENT}"'
            f' stroke-width="6" fill="none" stroke-linecap="round"/></svg>')


def _headline(lines, smaller=False) -> str:
    lines = [ln for ln in (lines or []) if (ln or "").strip()]
    if not lines:
        return ""
    out = ['<h1 class="smaller">' if smaller else "<h1>"]
    for i, ln in enumerate(lines):
        cls = ' class="accent"' if i == len(lines) - 1 else ""
        out.append(f"<span{cls}>{_e(ln)}</span><br>")
    out.append("</h1>")
    out.append(_underline(int(len(lines[-1]) * (34 if smaller else 42))))
    return "".join(out)


def _rows(rows) -> str:
    if not rows:
        return ""
    out = ['<div class="rows">']
    for ic, txt in rows:
        out.append(f'<div class="row"><div class="tile">{_icon(ic)}</div>'
                   f'<div class="txt">{txt}</div></div>')
    out.append("</div>")
    return "".join(out)


def _polaroid(photo: Path | None, cap: str = "", w=430, h=320,
              right=64, bottom=120, rot=2.5) -> str:
    if not photo:
        return ""
    return (f'<div class="polaroid" style="right:{right}px;bottom:{bottom}px;'
            f'transform:rotate({rot}deg)">'
            f'<img src="file://{photo}" style="width:{w}px;height:{h}px">'
            + (f'<div class="cap">{_e(cap)}</div>' if cap else "") + "</div>")


def _note(text, top, right) -> str:
    return f'<div class="note" style="top:{top}px;right:{right}px">{_e(text)}</div>'


def _page(body: str, chip_num, chip_label, counter, last=False) -> str:
    swipe = "save this &#9873;" if last else "swipe &#8594;"
    num = f"{chip_num:02d}" if isinstance(chip_num, int) else _e(chip_num)
    return (f'<html><head><meta charset="utf-8"><style>{CSS}</style></head><body>'
            f'<div class="chipbar"><div class="chip-num">{num}</div>'
            f'<div class="chip-label">{_e(chip_label)}</div><div class="leader"></div>'
            + (f'<div class="counter">{_e(counter)}</div>' if counter else "")
            + f'</div>{body}<div class="footer"><span class="brand">NAKSHIQ</span>'
            f'<span class="dot"></span><span>nakshiq.com &middot; verified, not sponsored</span>'
            f'<span class="swipe">{swipe}</span></div></body></html>')


def _shoot(html_doc: str) -> Image.Image:
    chrome = _chrome()
    if not chrome:
        raise RuntimeError("no chrome binary")
    with tempfile.TemporaryDirectory(prefix="ed_slide_") as td:
        hp = Path(td) / "s.html"; pp = Path(td) / "s.png"
        hp.write_text(html_doc, encoding="utf-8")
        r = subprocess.run([chrome, "--headless=new", "--disable-gpu", "--no-sandbox",
                            "--disable-dev-shm-usage", "--hide-scrollbars",
                            f"--screenshot={pp}", f"--window-size={W},{H}",
                            "--force-device-scale-factor=1", str(hp)],
                           capture_output=True, timeout=90)
        if not pp.exists():
            raise RuntimeError(f"chrome screenshot failed: {r.stderr[-300:]!r}")
        img = Image.open(pp).convert("RGB")
        img.load()
    return img


# ── public painters (mirror carousel_studio's PIL painters) ──────────────────
def cover(kicker: str, headline_lines: list, sub: str, photo: Path | None,
          last: bool = False) -> Image.Image:
    """`last=True` swaps the "swipe →" footer for "save this". Added 2026-08-02
    for The Window's Story render, which reuses the cover art — a Story has
    nothing to swipe to, so the default footer is a dead instruction there."""
    body = (_headline(headline_lines)
            + f'<div class="kicker">{_e(sub)}</div>'
            + _polaroid(photo, w=470, h=350, bottom=130, rot=2.5)
            + _note("save this one.", top=H - 560, right=530 if photo else 90))
    return _shoot(_page(body, 1, kicker or "NakshIQ", "", last=last))


def _tidy(line: str) -> str:
    """Builders hard-cut lines at ~150 chars, which can land mid-word. In the
    clean editorial typography that reads as a bug — trim back to the last
    complete word and close with an ellipsis."""
    line = (line or "").strip()
    if line and line[-1] not in ".!?…।":       # ॥/। danda-safe
        cut = line.rfind(" ")
        if cut > 40:
            line = line[:cut].rstrip(",;:—- ") + " …"
    return line


def _leadin(line: str) -> str:
    """Bold the first sentence of a tagline for the reference style's
    'bold lead-in, regular rest' row rhythm."""
    line = _tidy(line)
    cut = line.find(". ")
    if 8 <= cut <= 70:
        return f"<b>{_e(line[:cut + 1])}</b> {_e(line[cut + 2:])}"
    return _e(line)


def _narrow(inner: str, photo) -> str:
    """Keep row text clear of the polaroid zone when a photo is present."""
    return f'<div style="max-width:540px">{inner}</div>' if photo else inner


def item(idx: int, total: int, badge: str, badge_kind: str, state: str,
         name: str, line: str, photo: Path | None, icon: str = "pin",
         label: str | None = None) -> Image.Image:
    """`label` overrides the "pick N" chip. Added 2026-08-02 for The Window,
    whose deck mixes ranked picks with a road report — labelling a road status
    "pick 7" is simply wrong. Omitted everywhere else, so existing decks are
    byte-identical."""
    kind = badge_kind if badge_kind in ("go", "stop", "plain") else "plain"
    body = ((f'<div class="state">{_e(state)}</div>' if state else "")
            + _headline([name], smaller=len(name or "") > 16)
            + (f'<div class="badge {kind}">{_e(badge)}</div>' if badge else "")
            + (_narrow(_rows([(icon, _leadin(line))]), photo) if line else "")
            + _polaroid(photo, w=430, h=320, cap=name))
    return _shoot(_page(body, idx + 1, label or f"pick {idx}", f"{idx}/{total}"))


def skip(idx: int, total: int, skip_name: str, skip_reason: str,
         go_name: str, go_reason: str, photo: Path | None) -> Image.Image:
    rows = [("alert", f'<b>Skip {_e(skip_name)}.</b> {_e(_tidy(skip_reason))}'),
            ("flag", f'<b>Go to {_e(go_name)} instead.</b> {_e(_tidy(go_reason))}')]
    body = (_headline([f"Not {skip_name},", f"{go_name}."], smaller=True)
            + _narrow(_rows(rows), photo)
            + _polaroid(photo, w=390, h=290, bottom=110, rot=-2.5, cap=go_name))
    return _shoot(_page(body, idx + 1, "the honest swap", f"{idx}/{total}"))


def versus(idx: int, total: int, a_name: str, a_sub: str,
           b_name: str, b_sub: str, photo: Path | None) -> Image.Image:
    rows = [("star", f'<b>{_e(a_name)} — the famous one.</b> {_e(_tidy(a_sub))}'),
            ("swap", f'<b>{_e(b_name)} — the quieter twin.</b> {_e(_tidy(b_sub))}')]
    body = (_headline([f"{a_name} or", f"{b_name}?"], smaller=True)
            + _narrow(_rows(rows), photo)
            + _polaroid(photo, w=390, h=290, bottom=110, rot=-2.5, cap=b_name))
    return _shoot(_page(body, idx + 1, "this or that", f"{idx}/{total}"))


def end(headline_lines: list, sub: str, photo: Path | None,
        cta: str | None = None, rows: list | None = None) -> Image.Image:
    """`cta` overrides the site chip and `rows` the two closing lines. Added
    2026-08-02 so The Window can close on its own signup ask instead of the
    generic domain — a newsletter deck whose only CTA is "nakshiq.com" wastes the
    one slide people reach after deciding they like it. Both default to the
    existing copy, so every other deck renders unchanged."""
    body = (_headline(headline_lines)
            + f'<div class="kicker">{_e(sub)}</div>'
            + f'<div class="sitechip">{_e(cta or "nakshiq.com")}</div>'
            + _rows(rows or [("bookmark", "<b>Save this post</b> so it's there when you plan."),
                             ("globe", "<b>Every claim above is a verified database field</b> — go / wait / skip for 500+ places, every month.")])
            + _note("hope it helps.", top=H - 250, right=100))
    return _shoot(_page(body, "END", "keep it", "", last=True))
