#!/usr/bin/env python3
"""
carousel_studio.py — NakshIQ verified-data CAROUSEL engine (2026-07-01).

WHY THIS EXISTS
  The legacy `data_carousel` feed path silently fell back to `score_card`
  (its hero-image HEAD-check 403s/404s behind the firewall → <2 slides →
  is_carousel=False), so the account posted ZERO carousels for 65 days while
  research shows carousels get ~4x the engagement + ~2x the saves of reels.
  This module is a self-contained generator that:
    - reads ONLY verified data from the already-synced `content` dict
      (destinations / traps / collections — same source every other slot uses),
    - renders brand slides with PIL (text baked in, no external render pipeline),
    - NEVER drops a slide: background falls back R2-video-frame → gradient, so a
      missing image can't collapse the carousel into a score.
  Publishing + logging is done by autoposter.run_carousel(); this file only
  produces slide BYTES + a caption. Zero fabrication — every fact comes from the
  verified DB fields (score/verdict/tagline/trap→alternative/collection items).

Formats (v1): best_month · skip_list · collection.  Score shown on the 0-10
display scale (DB 1-5 × 2), matching the website.
"""
from __future__ import annotations
import os, io, subprocess, shutil, hashlib
from pathlib import Path
from datetime import datetime

try:
    import requests
except Exception:  # pragma: no cover
    requests = None
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = Path(__file__).parent
FONTS = HERE / "assets" / "fonts"
R2_VIDEO = "https://pub-bcda9bac2f63408880ee3f23aa3548e5.r2.dev"
WORK = Path("/tmp/nakshiq_carousel"); WORK.mkdir(parents=True, exist_ok=True)
FF = shutil.which("ffmpeg") or "ffmpeg"

W, H = 1080, 1350
BG = (13, 17, 23)
GOLD = (244, 183, 64); WHITE = (245, 247, 250); MUT = (159, 179, 200)
GREEN = (122, 199, 120); VERM = (232, 85, 45); INK = (6, 9, 14)

BOLD = "InstrumentSans-Bold.ttf"; MONO = "JetBrainsMono-Bold.ttf"; SERIF = "CrimsonPro-BoldItalic.ttf"


def _F(name, size):
    return ImageFont.truetype(str(FONTS / name), size)


def month_long(m: int | None = None) -> str:
    return datetime(2000, m or datetime.now().month, 1).strftime("%B")


# ── data helpers ─────────────────────────────────────────────────────────────
def _rows(content: dict, key: str) -> list:
    node = (content or {}).get(key) or {}
    if isinstance(node, dict):
        return node.get("data") or []
    return node or []


def _score_disp(score) -> str:
    try:
        return f"{int(round(float(score))) * 2}/10"
    except Exception:
        return ""


# ── background: R2 video-frame → gradient fallback (never fails) ──────────────
def _frame(slug: str) -> Path | None:
    if not slug or requests is None:
        return None
    jpg = WORK / f"{slug}.jpg"
    if jpg.exists() and jpg.stat().st_size > 5000:
        return jpg
    mp4 = WORK / f"{slug}.mp4"
    try:
        if not mp4.exists():
            r = requests.get(f"{R2_VIDEO}/{slug}.mp4", timeout=45, stream=True)
            if r.status_code != 200:
                return None
            with open(mp4, "wb") as fh:
                for chunk in r.iter_content(65536):
                    fh.write(chunk)
        subprocess.run([FF, "-y", "-ss", "1.2", "-i", str(mp4), "-frames:v", "1", str(jpg)],
                       capture_output=True, timeout=40)
    except Exception:
        return None
    return jpg if jpg.exists() and jpg.stat().st_size > 5000 else None


def _bg(slug: str | None, darken: float = 0.5, blur: int = 0) -> Image.Image:
    base = Image.new("RGB", (W, H), BG)
    fr = _frame(slug) if slug else None
    if fr:
        try:
            im = Image.open(fr).convert("RGB")
            sc = max(W / im.width, H / im.height)
            im = im.resize((int(im.width * sc), int(im.height * sc)))
            x = (im.width - W) // 2; y = (im.height - H) // 2
            im = im.crop((x, y, x + W, y + H))
            if blur:
                im = im.filter(ImageFilter.GaussianBlur(blur))
            base = im
        except Exception:
            pass
    else:
        # brand gradient (top-lit) so a clip-less slide still looks intentional
        d = ImageDraw.Draw(base)
        for yy in range(H):
            t = yy / H
            r = int(18 + (13 - 18) * t); g = int(34 + (17 - 34) * t); b = int(70 + (23 - 70) * t)
            d.line([(0, yy), (W, yy)], fill=(max(r, 0), max(g, 0), max(b, 0)))
    # dark scrim, stronger at the bottom where text sits
    ov = Image.new("L", (W, H), 0); d = ImageDraw.Draw(ov)
    for yy in range(H):
        top = int(150 * darken); bot = int(240 * darken)
        d.line([(0, yy), (W, yy)], fill=int(top + (bot - top) * (yy / H)))
    return Image.composite(Image.new("RGB", (W, H), INK), base, ov)


def _wrap(draw, text, font, maxw):
    words = (text or "").split(); lines = []; cur = ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=font) <= maxw:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def _chip(d, xy, text, font, fg, bg, pad=(18, 10)):
    tw = d.textlength(text, font=font); th = font.size
    x, y = xy
    d.rounded_rectangle([x, y, x + tw + pad[0] * 2, y + th + pad[1] * 2], radius=10, fill=bg)
    d.text((x + pad[0], y + pad[1] - 2), text, font=font, fill=fg)
    return tw + pad[0] * 2


# ── slide painters ───────────────────────────────────────────────────────────
def _cover_slide(kicker, headline_lines, sub, bg_slug):
    c = _bg(bg_slug, darken=0.6, blur=3); d = ImageDraw.Draw(c)
    d.text((70, 120), kicker, font=_F(MONO, 30), fill=GOLD)
    hl = _F(BOLD, 86)
    y = 300
    for ln in headline_lines:
        d.text((68, y), ln, font=hl, fill=WHITE); y += 96
    y = max(y + 20, 636)
    for ln in _wrap(d, sub, _F(SERIF, 40), W - 140):
        d.text((70, y), ln, font=_F(SERIF, 40), fill=MUT); y += 52
    d.text((70, H - 140), "NakshIQ", font=_F(BOLD, 46), fill=WHITE)
    d.text((72, H - 84), "swipe →", font=_F(MONO, 30), fill=GOLD)
    return c


def _item_slide(idx, total, badge, badge_col, state, name, line, bg_slug):
    c = _bg(bg_slug, darken=0.5); d = ImageDraw.Draw(c)
    num = f"{idx:02d}/{total:02d}"
    tw = d.textlength(num, font=_F(MONO, 28)); d.text((W - 70 - tw, 80), num, font=_F(MONO, 28), fill=MUT)
    if badge:
        _chip(d, (70, 80), badge, _F(BOLD, 34), INK, badge_col)
    name_f = _F(BOLD, 74)
    nlines = _wrap(d, name, name_f, W - 140)
    y = H - 470
    if state:
        d.text((70, y), state.upper(), font=_F(MONO, 30), fill=GOLD); y += 52
    for ln in nlines:
        d.text((68, y), ln, font=name_f, fill=WHITE); y += 82
    y += 12
    for ln in _wrap(d, line, _F(SERIF, 42), W - 150):
        d.text((70, y), ln, font=_F(SERIF, 42), fill=(223, 229, 238)); y += 54
    d.text((70, H - 92), "NakshIQ · verified", font=_F(MONO, 26), fill=MUT)
    return c


def _skip_slide(idx, total, skip_name, skip_reason, go_name, go_reason, bg_slug):
    c = _bg(bg_slug, darken=0.52); d = ImageDraw.Draw(c)
    num = f"{idx:02d}/{total:02d}"
    tw = d.textlength(num, font=_F(MONO, 28)); d.text((W - 70 - tw, 80), num, font=_F(MONO, 28), fill=MUT)
    y = H - 560
    # SKIP block
    _chip(d, (70, y), "SKIP", _F(BOLD, 30), INK, VERM); y += 66
    for ln in _wrap(d, skip_name, _F(BOLD, 58), W - 140):
        d.text((68, y), ln, font=_F(BOLD, 58), fill=WHITE); y += 62
    for ln in _wrap(d, skip_reason, _F(SERIF, 36), W - 150)[:2]:
        d.text((70, y), ln, font=_F(SERIF, 36), fill=(210, 216, 226)); y += 46
    y += 20
    # GO block
    _chip(d, (70, y), "GO INSTEAD", _F(BOLD, 30), INK, GREEN); y += 66
    for ln in _wrap(d, go_name, _F(BOLD, 58), W - 140):
        d.text((68, y), ln, font=_F(BOLD, 58), fill=GOLD); y += 62
    for ln in _wrap(d, go_reason, _F(SERIF, 36), W - 150)[:2]:
        d.text((70, y), ln, font=_F(SERIF, 36), fill=(210, 216, 226)); y += 46
    d.text((70, H - 70), "NakshIQ · verified", font=_F(MONO, 24), fill=MUT)
    return c


def _end_slide(headline_lines, sub, bg_slug):
    c = _bg(bg_slug, darken=0.72, blur=6); d = ImageDraw.Draw(c)
    y = 300
    for ln in headline_lines:
        d.text((68, y), ln, font=_F(BOLD, 78), fill=WHITE); y += 92
    y += 20
    for ln in _wrap(d, sub, _F(SERIF, 42), W - 150):
        d.text((70, y), ln, font=_F(SERIF, 42), fill=MUT); y += 54
    _chip(d, (70, y + 20), "nakshiq.com", _F(BOLD, 44), INK, GOLD, pad=(26, 16))
    d.text((70, H - 130), "NakshIQ", font=_F(BOLD, 46), fill=WHITE)
    return c


def _to_jpeg(img: Image.Image) -> bytes:
    buf = io.BytesIO(); img.convert("RGB").save(buf, "JPEG", quality=88); return buf.getvalue()


# ── FORMAT BUILDERS — each returns dict or None ──────────────────────────────
def _hashtags(*tags):
    return " ".join("#" + t.replace(" ", "") for t in tags if t)


def build_best_month(content: dict, mname: str) -> dict | None:
    dests = [d for d in _rows(content, "destinations")
             if (d.get("verdict") in (None, "go")) and (d.get("score") or 0) >= 4
             and d.get("name") and d.get("tagline")]
    dests = sorted(dests, key=lambda d: -(d.get("score") or 0))[:6]
    if len(dests) < 4:
        return None
    slides = [_cover_slide(
        f"THE {mname.upper()} EDIT", [f"{len(dests)} places at", "their absolute", f"best this {mname}"],
        "Verified go / wait / skip for every month — so you never travel on the wrong one.",
        dests[0].get("id"))]
    for i, dd in enumerate(dests, 1):
        slides.append(_item_slide(i, len(dests), "GO", GREEN, dd.get("state") or "",
                                  dd["name"], (dd.get("tagline") or "")[:150], dd.get("id")))
    slides.append(_end_slide(["Your month is wrong", "more often than your", "destination."],
                             f"Go / wait / skip for {mname} — and all 12 months — for 500+ places.",
                             dests[-1].get("id")))
    caption = (f"{mname.upper()}'S BEST, VERIFIED 📍\n\nSave this for your {mname} trip. "
               f"Every pick is scored for THIS month — a 10/10 in {mname} can be a 3/10 by August.\n\n"
               + "\n".join(f"{i}. {d['name']} — {(d.get('tagline') or '')[:70]}" for i, d in enumerate(dests, 1))
               + f"\n\nFull month-by-month verdict for 500+ places → nakshiq.com\n\n"
               + _hashtags("indiatravel", f"{mname.lower()}travel", "traveltips", "incredibleindia", "traveldeeper"))
    return {"fmt": "best_month", "slides": [_to_jpeg(s) for s in slides], "caption": caption,
            "dest_ids": [d.get("id") for d in dests]}


def build_skip_list(content: dict, mname: str) -> dict | None:
    traps = _rows(content, "traps")
    pairs = []
    for t in traps:
        tm = t.get("trap") or {}; am = t.get("alternative") or {}
        sn = (tm.get("name") or t.get("name") or "").strip()
        an = (am.get("name") or "").strip()
        if not sn or not an:
            continue
        pairs.append({
            "skip": sn, "skip_reason": (t.get("reason") or t.get("description") or "").strip(),
            "go": an, "go_reason": (am.get("reason") or "").strip(),
            "go_id": am.get("id") or "",
        })
    pairs = pairs[:5]
    if len(pairs) < 3:
        return None
    slides = [_cover_slide(
        "SKIP LIST", ["Don't waste a day", "on these — go here", "instead"],
        "Overhyped, overcrowded, overpriced. Here's the verified better swap for each.",
        pairs[0]["go_id"])]
    for i, p in enumerate(pairs, 1):
        slides.append(_skip_slide(i, len(pairs), p["skip"], p["skip_reason"],
                                  p["go"], p["go_reason"], p["go_id"]))
    slides.append(_end_slide(["We'll tell you", "what to skip.", ""],
                             "Honest go / wait / skip verdicts for 500+ places — not sponsored, just verified.",
                             pairs[-1]["go_id"]))
    caption = ("STOP wasting trip days 🚩\n\nThe famous name isn't always the right call. "
               "Here's what to skip — and the verified swap for each:\n\n"
               + "\n".join(f"❌ {p['skip']} → ✅ {p['go']}" for p in pairs)
               + "\n\nSave it before you book. Full honest verdicts → nakshiq.com\n\n"
               + _hashtags("indiatravel", "traveltips", "touristtrap", "traveldeeper", "incredibleindia"))
    return {"fmt": "skip_list", "slides": [_to_jpeg(s) for s in slides], "caption": caption,
            "dest_ids": [p["go_id"] for p in pairs if p["go_id"]]}


def build_collection(content: dict, mname: str) -> dict | None:
    colls = _rows(content, "collections")
    dmap = {d.get("id"): d for d in _rows(content, "destinations_full") or _rows(content, "destinations")}
    best = None
    for c in colls:
        items = c.get("items") or []
        if len(items) >= 5:
            best = c; break
    if not best:
        return None
    items = best.get("items")[:6]
    title = (best.get("name") or "").strip()
    slides = [_cover_slide(
        "THE COLLECTION", _wrap(ImageDraw.Draw(Image.new("RGB", (W, H))), title, _F(BOLD, 86), W - 140)[:3] or [title],
        (best.get("description") or "Hand-picked and verified — save the whole set.")[:120],
        (items[0].get("destination_id") if items else None))]
    for i, it in enumerate(items, 1):
        did = it.get("destination_id")
        d = dmap.get(did, {})
        nm = d.get("name") or it.get("name") or did or "—"
        line = (d.get("tagline") or it.get("note") or it.get("reason") or "")[:150]
        slides.append(_item_slide(i, len(items), "PICK", GOLD, d.get("state") or "", nm, line, did))
    slides.append(_end_slide(["The full set", "is on the site.", ""],
                             f"'{title}' — with verified scores, best months and safety notes for each.",
                             (items[0].get("destination_id") if items else None)))
    caption = (f"{title.upper()} 📌\n\nSave the whole set — hand-picked and verified.\n\n"
               + "\n".join(f"{i}. {(dmap.get(it.get('destination_id'), {}).get('name') or it.get('name') or '')}"
                           for i, it in enumerate(items, 1))
               + "\n\nFull collection with scores → nakshiq.com\n\n"
               + _hashtags("indiatravel", "traveltips", "traveldeeper", "incredibleindia"))
    return {"fmt": "collection", "slides": [_to_jpeg(s) for s in slides], "caption": caption,
            "dest_ids": [it.get("destination_id") for it in items]}


BUILDERS = {
    "best_month": build_best_month,
    "skip_list": build_skip_list,
    "collection": build_collection,
}
FORMAT_ROTATION = ["skip_list", "best_month", "collection"]  # skip_list first = biggest gap


def build(content: dict, fmt: str, month: int | None = None) -> dict | None:
    """Return {fmt, slides:[jpeg bytes], caption, dest_ids} or None if data thin."""
    mname = month_long(month)
    fn = BUILDERS.get(fmt)
    return fn(content, mname) if fn else None


def build_first_available(content: dict, order: list[str] | None = None, month: int | None = None) -> dict | None:
    """Try formats in order; return the first that has enough verified data."""
    for fmt in (order or FORMAT_ROTATION):
        out = build(content, fmt, month)
        if out:
            return out
    return None
