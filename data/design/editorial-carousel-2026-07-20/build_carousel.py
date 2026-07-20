#!/usr/bin/env python3
"""Editorial-carousel template engine (IG 4:5, 1080x1350).

Design grammar reverse-engineered from the divyannshisharma / theromanknox
"editorial infographic" carousel style (July 2026):
  - warm cream canvas, near-black sans headline + burnt-orange italic-serif
    accent line with a hand-drawn underline stroke
  - numbered chip header + dotted leader + slide-counter pill
  - icon-tile rows (rounded tan tile, orange line icon) with thin dividers
  - handwritten annotation notes for personality
  - footer brand strip

Usage:  python3 build_carousel.py spec.json outdir/
Spec = {"brand": {...}, "slides": [...]}  (see sample-emergency-numbers.json)
Renders each slide via headless Chrome, then merges a preview PDF.
"""
import json, os, subprocess, sys, html

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

ICONS = {
    "phone":    '<path d="M6 4c0-1 1-2 2-2h3l2 5-2.5 1.5a16 16 0 0 0 7 7L19 13l5 2v3c0 1-1 2-2 2C12 20 6 14 6 4z" transform="scale(1.55)"/>',
    "alert":    '<path d="M20 5 35 32H5L20 5z M20 15v8 M20 27v.5" transform="scale(1.0)" />',
    "shield":   '<path d="M20 4 33 9v9c0 9-6 15-13 18C13 33 7 27 7 18V9l13-5z" />',
    "cross":    '<path d="M16 6h8v10h10v8H24v10h-8V24H6v-8h10V6z" />',
    "info":     '<circle cx="20" cy="20" r="15"/><path d="M20 13v.5 M20 19v9"/>',
    "bookmark": '<path d="M11 5h18v30l-9-7-9 7V5z" />',
    "globe":    '<circle cx="20" cy="20" r="15"/><path d="M5 20h30 M20 5c-5 5-5 25 0 30 M20 5c5 5 5 25 0 30"/>',
    "clock":    '<circle cx="20" cy="20" r="15"/><path d="M20 11v9l6 4"/>',
    "flag":     '<path d="M10 36V6 M10 7c7-4 13 4 20 0v14c-7 4-13-4-20 0" />',
    "heart":    '<path d="M20 34C8 25 5 17 9 11c3-4 9-4 11 1 2-5 8-5 11-1 4 6 1 14-11 23z"/>',
    "star":     '<path d="M20 4l4.5 10.5L36 16l-8.5 8L30 36l-10-6.5L10 36l2.5-12L4 16l11.5-1.5L20 4z"/>',
    "chat":     '<path d="M6 8h28v18H18l-8 7v-7H6V8z"/>',
}

CSS = """
* { margin:0; padding:0; box-sizing:border-box; }
html,body { width:1080px; height:1350px; }
body {
  background:#F6F0E2; color:#171310; overflow:hidden; position:relative;
  font-family:'Geist','Inter',-apple-system,'Helvetica Neue',sans-serif;
  padding:64px 72px 56px;
}
body.grain::after { content:''; position:absolute; inset:0; pointer-events:none;
  background-image:radial-gradient(#00000008 1px, transparent 1px); background-size:5px 5px; }

/* header */
.chipbar { display:flex; align-items:center; gap:16px; margin-bottom:56px; }
.chip-num { background:#171310; color:#F6F0E2; font-weight:800; font-size:26px;
  padding:8px 14px; letter-spacing:1px; }
.chip-label { border:2px solid #171310; background:#FDFAF2; font-weight:700;
  font-size:24px; letter-spacing:1.5px; padding:8px 18px; text-transform:uppercase; white-space:nowrap; }
.leader { flex:1; border-bottom:4px dotted #C9BCA0; margin-top:4px; }
.counter { background:#7E7668; color:#F6F0E2; font-weight:700; font-size:28px;
  border-radius:40px; padding:12px 24px; }

/* headline */
h1 { font-size:104px; line-height:1.02; font-weight:800; letter-spacing:-3px; margin-bottom:18px; }
h1 .accent { font-family:Georgia,'Times New Roman',serif; font-style:italic;
  font-weight:500; color:#C05A2E; letter-spacing:-1px; }
.underline { margin:-6px 0 34px 4px; }
.kicker { font-size:34px; line-height:1.45; color:#3E382E; margin-bottom:44px; max-width:760px; }
.kicker b { color:#171310; }

/* icon rows */
.rows { display:flex; flex-direction:column; }
.row { display:flex; gap:30px; align-items:flex-start; padding:30px 0; }
.row + .row { border-top:2px solid #E5DAC2; }
.tile { flex:0 0 92px; height:92px; border-radius:22px; background:#EFE3CA;
  display:flex; align-items:center; justify-content:center; }
.tile svg { width:44px; height:44px; stroke:#C05A2E; stroke-width:2.6;
  fill:none; stroke-linecap:round; stroke-linejoin:round; }
.row .txt { font-size:33px; line-height:1.42; padding-top:8px; color:#3E382E; max-width:660px; }
.row .txt b { color:#171310; }
.row .txt .hi { font-weight:700; }

/* big number display (enhancement slide type) */
.bignum { font-size:250px; font-weight:800; letter-spacing:-8px; line-height:1;
  color:#C05A2E; margin:10px 0 6px; }
.bignum-label { font-size:40px; font-weight:800; text-transform:uppercase; letter-spacing:3px; }

/* annotation */
.note { position:absolute; font-family:'Bradley Hand','Noteworthy','Comic Sans MS',cursive;
  font-size:36px; line-height:1.3; color:#171310; transform:rotate(-4deg); max-width:340px; }
.note u { text-decoration:none; border-bottom:4px solid #C05A2E; }

/* quote box */
.quote { border:2px solid #E0CBA8; background:#FBF3DF; border-radius:18px;
  padding:34px 38px; font-family:Georgia,serif; font-style:italic; font-size:32px;
  line-height:1.5; color:#5A4632; margin-top:10px; }

/* footer */
.footer { position:absolute; left:72px; right:72px; bottom:44px;
  display:flex; align-items:center; gap:18px; font-size:24px; color:#8B8578; }
.footer .brand { font-weight:800; letter-spacing:3px; color:#171310; }
.footer .dot { width:6px; height:6px; border-radius:3px; background:#C9BCA0; }
.footer .swipe { margin-left:auto; border:2px solid #171310; border-radius:40px;
  padding:8px 22px; font-weight:700; color:#171310; background:#FDFAF2; }
"""

UNDERLINE_SVG = ('<svg class="underline" width="{w}" height="16" viewBox="0 0 {w} 16">'
  '<path d="M4 11 C {q} 2, {tq} 14, {e} 7" stroke="#C05A2E" stroke-width="6" '
  'fill="none" stroke-linecap="round"/></svg>')

def underline(w):
    return UNDERLINE_SVG.format(w=w, q=int(w*.3), tq=int(w*.7), e=w-6)

def icon(name):
    return f'<svg viewBox="0 0 40 40">{ICONS.get(name, ICONS["info"])}</svg>'

def esc(s):  # allow <b>/<span class=hi> passthrough via markers
    s = html.escape(s)
    for a,b in (("**","<b>"),("//b//","</b>")): pass
    # simple markdown-ish: **bold**
    out, parts, open_b = [], s.split("**"), False
    for i,p in enumerate(parts):
        out.append(p)
        if i < len(parts)-1:
            out.append("</b>" if open_b else "<b>"); open_b = not open_b
    return "".join(out)

def render_slide(slide, brand, idx, total):
    h = []
    grain = " grain" if brand.get("grain", True) else ""
    h.append(f'<html><head><meta charset="utf-8"><style>{CSS}</style></head><body class="s{idx}{grain}">')
    # header chipbar
    h.append('<div class="chipbar">')
    h.append(f'<div class="chip-num">{idx:02d}</div>')
    h.append(f'<div class="chip-label">{esc(slide["label"])}</div>')
    h.append('<div class="leader"></div>')
    h.append(f'<div class="counter">{idx}/{total}</div></div>')
    # headline: last line accent
    lines = slide["title"].split("\n")
    h.append("<h1>")
    for i, ln in enumerate(lines):
        cls = ' class="accent"' if i == len(lines)-1 and len(lines) > 1 else ""
        h.append(f"<span{cls}>{esc(ln)}</span><br>")
    h.append("</h1>")
    if len(lines) > 1:
        h.append(underline(min(60*len(lines[-1]), 560)))
    if slide.get("kicker"):
        h.append(f'<div class="kicker">{esc(slide["kicker"])}</div>')
    if slide.get("bignum"):
        h.append(f'<div class="bignum">{esc(slide["bignum"])}</div>')
        h.append(f'<div class="bignum-label">{esc(slide.get("bignum_label",""))}</div>')
    if slide.get("rows"):
        h.append('<div class="rows">')
        for r in slide["rows"]:
            h.append(f'<div class="row"><div class="tile">{icon(r.get("icon","info"))}</div>'
                     f'<div class="txt">{esc(r["text"])}</div></div>')
        h.append("</div>")
    if slide.get("quote"):
        h.append(f'<div class="quote">&ldquo;{esc(slide["quote"])}&rdquo;</div>')
    if slide.get("note"):
        n = slide["note"]
        h.append(f'<div class="note" style="right:{n.get("right",90)}px;top:{n.get("top",560)}px">{esc(n["text"])}</div>')
    # footer
    h.append('<div class="footer">')
    h.append(f'<span class="brand">{esc(brand["name"])}</span><span class="dot"></span>'
             f'<span>{esc(brand["url"])}</span>')
    swipe = "save this &#9873;" if idx == total else "swipe &#8594;"
    h.append(f'<span class="swipe">{swipe}</span></div>')
    h.append("</body></html>")
    return "".join(h)

def main():
    spec_path, outdir = sys.argv[1], sys.argv[2]
    spec = json.load(open(spec_path))
    os.makedirs(outdir, exist_ok=True)
    total, pngs = len(spec["slides"]), []
    for i, slide in enumerate(spec["slides"], 1):
        hp = os.path.join(outdir, f"slide-{i:02d}.html")
        pp = os.path.join(outdir, f"slide-{i:02d}.png")
        open(hp, "w").write(render_slide(slide, spec["brand"], i, total))
        subprocess.run([CHROME, "--headless=new", "--disable-gpu",
            f"--screenshot={pp}", "--window-size=1080,1350",
            "--force-device-scale-factor=1", "--hide-scrollbars", hp],
            check=True, capture_output=True)
        pngs.append(pp); print(f"rendered {pp}")
    # preview PDF
    from PIL import Image
    imgs = [Image.open(p).convert("RGB") for p in pngs]
    pdf = os.path.join(outdir, "carousel-preview.pdf")
    imgs[0].save(pdf, save_all=True, append_images=imgs[1:], resolution=96)
    print(f"preview: {pdf}")

if __name__ == "__main__":
    main()
