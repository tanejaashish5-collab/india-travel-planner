#!/usr/bin/env python3
"""
Generate hyper-local destination storytelling Instagram posts for NakshIQ.

Creates 1080x1350 PNG images with NakshIQ branding, inspired by @delhiwalks
carousel style — personality-driven, witty, data-rich, insider knowledge.

Formats:
  1. vibe_check     — Destination personality profile (vibes, feel, character)
  2. by_the_numbers — Data-driven facts (elevation, budget, scores)
  3. what_nobody_tells — Honest insider tips from why_special
  4. the_tagline    — Bold tagline card with destination identity
  5. hidden_gem     — Spotlight on high-hiddenness/remoteness destinations

Usage:
  python gen_stories.py --state "Ladakh"
  python gen_stories.py --state "Ladakh" --format vibe_check
  python gen_stories.py --all               # All states, all formats
  python gen_stories.py --state "Ladakh" --dry-run
"""

import json, os, sys, random, textwrap, argparse, math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# ── Brand System ──────────────────────────────────────────────
CHARCOAL    = (22, 22, 20)       # #161614 — primary bg
CREAM       = (245, 241, 232)    # #F5F1E8 — primary text
VERMILLION  = (229, 86, 66)     # #E55642 — accent
TEAL        = (0, 128, 128)      # #008080 — secondary accent
MUTED       = (160, 155, 145)    # muted text
DARK_CREAM  = (35, 35, 30)      # slightly lighter bg for cards
WARM_GREY   = (80, 78, 72)      # divider lines

# Alternate palettes for variety
PALETTES = [
    {"bg": CHARCOAL, "text": CREAM, "accent": VERMILLION, "muted": MUTED},
    {"bg": (15, 30, 45), "text": CREAM, "accent": (255, 180, 60), "muted": (140, 155, 170)},  # navy + gold
    {"bg": (35, 25, 20), "text": (240, 235, 225), "accent": (200, 90, 50), "muted": (150, 140, 130)},  # espresso
    {"bg": (20, 35, 25), "text": (230, 240, 225), "accent": (100, 200, 120), "muted": (130, 150, 135)},  # forest
    {"bg": (40, 30, 50), "text": (235, 230, 245), "accent": (180, 120, 220), "muted": (145, 135, 155)},  # dusk
]

# ── Paths ─────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
FONT_DIR = SCRIPT_DIR / "assets" / "fonts"
OUTPUT_DIR = SCRIPT_DIR / "pomelli_stories_library"
BRAND_ICON = SCRIPT_DIR / "assets" / "brand-pack" / "nakshiq" / "icon-final-N" / "icon-N-02-crimson-pro.png"

W, H = 1080, 1350  # Instagram post size

# ── Font Loading ──────────────────────────────────────────────
def load_fonts():
    """Load NakshIQ brand fonts with fallbacks."""
    fonts = {}
    
    # Try brand fonts first
    crimson_bi = FONT_DIR / "CrimsonPro-BoldItalic.ttf"
    crimson_i = FONT_DIR / "CrimsonPro-Italic.ttf"
    instrument = FONT_DIR / "InstrumentSans-Bold.ttf"
    jetbrains = FONT_DIR / "JetBrainsMono-Bold.ttf"
    
    # Fallback paths
    fallback_serif = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
    fallback_sans = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    fallback_mono = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"
    
    def try_font(primary, fallback, size):
        for p in [primary, fallback]:
            if p and Path(p).exists():
                try:
                    return ImageFont.truetype(str(p), size)
                except:
                    pass
        return ImageFont.load_default()
    
    fonts["title_lg"] = try_font(crimson_bi, fallback_serif, 72)
    fonts["title_md"] = try_font(crimson_bi, fallback_serif, 54)
    fonts["title_sm"] = try_font(crimson_bi, fallback_serif, 42)
    fonts["body"] = try_font(instrument, fallback_sans, 32)
    fonts["body_sm"] = try_font(instrument, fallback_sans, 26)
    fonts["caption"] = try_font(instrument, fallback_sans, 22)
    fonts["mono_lg"] = try_font(jetbrains, fallback_mono, 64)
    fonts["mono_md"] = try_font(jetbrains, fallback_mono, 40)
    fonts["mono_sm"] = try_font(jetbrains, fallback_mono, 28)
    fonts["label"] = try_font(instrument, fallback_sans, 18)
    fonts["italic"] = try_font(crimson_i, fallback_serif, 30)
    
    return fonts


def draw_rounded_rect(draw, xy, radius, fill):
    """Draw a rounded rectangle."""
    x0, y0, x1, y1 = xy
    r = min(radius, (x1-x0)//2, (y1-y0)//2)
    draw.rectangle([x0+r, y0, x1-r, y1], fill=fill)
    draw.rectangle([x0, y0+r, x1, y1-r], fill=fill)
    draw.pieslice([x0, y0, x0+2*r, y0+2*r], 180, 270, fill=fill)
    draw.pieslice([x1-2*r, y0, x1, y0+2*r], 270, 360, fill=fill)
    draw.pieslice([x0, y1-2*r, x0+2*r, y1], 90, 180, fill=fill)
    draw.pieslice([x1-2*r, y1-2*r, x1, y1], 0, 90, fill=fill)


def draw_nakshiq_footer(draw, fonts, pal, y_start):
    """Draw NakshIQ branded footer at bottom."""
    # Thin accent line
    draw.rectangle([80, y_start, W-80, y_start+2], fill=pal["accent"])
    # Logo text
    draw.text((80, y_start + 16), "naksh", font=fonts["caption"], fill=pal["text"])
    dot_x = 80 + fonts["caption"].getlength("naksh")
    draw.text((dot_x, y_start + 16), ".", font=fonts["caption"], fill=pal["accent"])
    iq_x = dot_x + fonts["caption"].getlength(".")
    draw.text((iq_x, y_start + 16), "iq", font=fonts["caption"], fill=pal["text"])
    # Tagline right-aligned
    tag = "TRAVEL WITH CONFIDENCE"
    tw = fonts["label"].getlength(tag)
    draw.text((W - 80 - tw, y_start + 20), tag, font=fonts["label"], fill=pal["muted"])


def wrap_text(text, font, max_width):
    """Word-wrap text to fit within max_width pixels."""
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        if font.getlength(test) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


# ══════════════════════════════════════════════════════════════
# FORMAT 1: THE TAGLINE — Bold destination identity card
# ══════════════════════════════════════════════════════════════
def gen_tagline(dest, fonts, pal):
    img = Image.new("RGB", (W, H), pal["bg"])
    draw = ImageDraw.Draw(img)
    
    name = dest["name"].upper()
    state = dest.get("state", "").upper()
    tagline = dest.get("tagline", "")
    elevation = dest.get("elevation_m")
    difficulty = dest.get("difficulty", "")
    
    # Top label
    draw.text((80, 80), state, font=fonts["label"], fill=pal["muted"])
    
    # Accent line
    draw.rectangle([80, 115, 280, 118], fill=pal["accent"])
    
    # Destination name — large
    name_lines = wrap_text(name, fonts["title_lg"], W - 160)
    y = 160
    for line in name_lines[:3]:
        draw.text((80, y), line, font=fonts["title_lg"], fill=pal["text"])
        y += 85
    
    # Elevation badge if available
    if elevation:
        badge_y = y + 20
        elev_text = f"{elevation:,}m"
        draw.text((80, badge_y), elev_text, font=fonts["mono_lg"], fill=pal["accent"])
        y = badge_y + 80
    
    # Divider
    y += 20
    draw.rectangle([80, y, W-80, y+1], fill=WARM_GREY)
    y += 40
    
    # Tagline wrapped
    if tagline:
        tag_lines = wrap_text(tagline, fonts["italic"], W - 160)
        for line in tag_lines[:6]:
            draw.text((80, y), line, font=fonts["italic"], fill=pal["text"])
            y += 40
    
    # Bottom data chips
    chips = []
    if difficulty:
        chips.append(difficulty.upper())
    budget = dest.get("budget_tier", "")
    if budget:
        chips.append(budget.upper())
    best = dest.get("best_months", [])
    month_names = {1:"JAN",2:"FEB",3:"MAR",4:"APR",5:"MAY",6:"JUN",7:"JUL",8:"AUG",9:"SEP",10:"OCT",11:"NOV",12:"DEC"}
    if best:
        months_str = " ".join(month_names.get(m, "") for m in sorted(best)[:4])
        chips.append(months_str)
    
    chip_y = H - 140
    chip_x = 80
    for chip in chips:
        cw = fonts["label"].getlength(chip) + 30
        draw_rounded_rect(draw, [chip_x, chip_y, chip_x+cw, chip_y+36], 8, DARK_CREAM)
        draw.text((chip_x+15, chip_y+8), chip, font=fonts["label"], fill=pal["muted"])
        chip_x += cw + 12
    
    draw_nakshiq_footer(draw, fonts, pal, H - 70)
    return img


# ══════════════════════════════════════════════════════════════
# FORMAT 2: VIBE CHECK — Destination personality profile
# ══════════════════════════════════════════════════════════════
def gen_vibe_check(dest, fonts, pal):
    img = Image.new("RGB", (W, H), pal["bg"])
    draw = ImageDraw.Draw(img)
    
    name = dest["name"]
    vibes = dest.get("vibe", [])
    types = dest.get("type", [])
    
    # Header
    draw.text((80, 70), "THE VIBE CHECK", font=fonts["mono_sm"], fill=pal["accent"])
    draw.rectangle([80, 110, 380, 113], fill=pal["accent"])
    
    # Destination name
    draw.text((80, 140), name.upper(), font=fonts["title_md"], fill=pal["text"])
    
    # State
    state = dest.get("state", "")
    name_w = fonts["title_md"].getlength(name.upper())
    draw.text((80, 210), state, font=fonts["body_sm"], fill=pal["muted"])
    
    y = 280
    
    # Vibe pills
    if vibes:
        draw.text((80, y), "VIBES", font=fonts["label"], fill=pal["muted"])
        y += 35
        pill_x = 80
        for v in vibes[:6]:
            v_upper = v.upper()
            pw = fonts["body_sm"].getlength(v_upper) + 40
            if pill_x + pw > W - 80:
                pill_x = 80
                y += 55
            draw_rounded_rect(draw, [pill_x, y, pill_x+pw, y+45], 22, pal["accent"])
            draw.text((pill_x+20, y+8), v_upper, font=fonts["body_sm"], fill=pal["bg"])
            pill_x += pw + 12
        y += 75
    
    # Type pills
    if types:
        draw.text((80, y), "WHAT IT IS", font=fonts["label"], fill=pal["muted"])
        y += 35
        pill_x = 80
        for t in types[:6]:
            t_upper = t.upper()
            pw = fonts["body_sm"].getlength(t_upper) + 40
            if pill_x + pw > W - 80:
                pill_x = 80
                y += 55
            draw_rounded_rect(draw, [pill_x, y, pill_x+pw, y+45], 22, DARK_CREAM)
            draw.text((pill_x+20, y+8), t_upper, font=fonts["body_sm"], fill=pal["text"])
            pill_x += pw + 12
        y += 85
    
    # Why special excerpt
    why = dest.get("why_special", "")
    if why:
        draw.rectangle([80, y, W-80, y+1], fill=WARM_GREY)
        y += 30
        draw.text((80, y), "WHY IT'S SPECIAL", font=fonts["label"], fill=pal["muted"])
        y += 30
        # Truncate to ~200 chars
        excerpt = why[:200]
        if len(why) > 200:
            excerpt = excerpt.rsplit(" ", 1)[0] + "..."
        lines = wrap_text(excerpt, fonts["body_sm"], W - 160)
        for line in lines[:6]:
            draw.text((80, y), line, font=fonts["body_sm"], fill=pal["text"])
            y += 36
    
    draw_nakshiq_footer(draw, fonts, pal, H - 70)
    return img


# ══════════════════════════════════════════════════════════════
# FORMAT 3: BY THE NUMBERS — Data-driven facts
# ══════════════════════════════════════════════════════════════
def gen_by_the_numbers(dest, fonts, pal):
    img = Image.new("RGB", (W, H), pal["bg"])
    draw = ImageDraw.Draw(img)
    
    name = dest["name"]
    
    # Header
    draw.text((80, 70), "BY THE NUMBERS", font=fonts["mono_sm"], fill=pal["accent"])
    draw.rectangle([80, 110, 420, 113], fill=pal["accent"])
    
    draw.text((80, 140), name.upper(), font=fonts["title_md"], fill=pal["text"])
    draw.text((80, 210), dest.get("state", ""), font=fonts["body_sm"], fill=pal["muted"])
    
    # Data rows
    y = 290
    row_h = 130
    
    data_points = []
    elev = dest.get("elevation_m")
    if elev:
        data_points.append((f"{elev:,}m", "ELEVATION", "Above sea level"))
    
    hidden = dest.get("hiddenness")
    if hidden:
        data_points.append((f"{hidden}/5", "HIDDENNESS", "How off-radar this is"))
    
    remote = dest.get("remoteness")
    if remote:
        data_points.append((f"{remote}/5", "REMOTENESS", "How hard to reach"))
    
    budget = dest.get("budget_tier", "")
    if budget:
        # Canonical destinations.budget_tier enum — must match
        # gen_flow_stories.fmt_budget(). Default is empty so unknown values
        # don't render a misleading icon.
        tier_emoji = {
            "budget":         "₹",
            "mid-range":      "₹₹",
            "splurge":        "₹₹₹",
            "mixed":          "₹–₹₹₹",
            "budget-to-mid":  "₹–₹₹",
            "mid-to-luxury":  "₹₹–₹₹₹",
        }
        emoji = tier_emoji.get(budget)
        if emoji:
            data_points.append((emoji, "BUDGET TIER", budget.title()))
    
    diff = dest.get("difficulty", "")
    if diff:
        data_points.append((diff.upper(), "DIFFICULTY", "Physical challenge level"))
    
    best = dest.get("best_months", [])
    month_names = {1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep",10:"Oct",11:"Nov",12:"Dec"}
    if best:
        months = ", ".join(month_names.get(m, "") for m in sorted(best)[:4])
        data_points.append((months, "BEST TIME", "When to visit"))
    
    for i, (value, label, sub) in enumerate(data_points[:6]):
        row_y = y + i * row_h
        # Value (large)
        draw.text((80, row_y), str(value), font=fonts["mono_md"], fill=pal["accent"])
        # Label
        draw.text((80, row_y + 55), label, font=fonts["label"], fill=pal["muted"])
        # Sublabel
        draw.text((80, row_y + 78), sub, font=fonts["label"], fill=WARM_GREY)
        # Divider
        if i < len(data_points) - 1:
            draw.rectangle([80, row_y + row_h - 10, W-80, row_y + row_h - 9], fill=DARK_CREAM)
    
    draw_nakshiq_footer(draw, fonts, pal, H - 70)
    return img


# ══════════════════════════════════════════════════════════════
# FORMAT 4: WHAT NOBODY TELLS YOU — Insider knowledge
# ══════════════════════════════════════════════════════════════
def gen_what_nobody_tells(dest, fonts, pal):
    img = Image.new("RGB", (W, H), pal["bg"])
    draw = ImageDraw.Draw(img)
    
    name = dest["name"]
    why = dest.get("why_special", "")
    tagline = dest.get("tagline", "")
    
    # Header
    draw.text((80, 70), "WHAT NOBODY", font=fonts["title_md"], fill=pal["text"])
    draw.text((80, 135), "TELLS YOU", font=fonts["title_md"], fill=pal["accent"])
    
    # About label
    draw.text((80, 220), f"ABOUT {name.upper()}", font=fonts["mono_sm"], fill=pal["muted"])
    draw.text((80, 260), dest.get("state", ""), font=fonts["label"], fill=WARM_GREY)
    
    # Accent line
    draw.rectangle([80, 300, W-80, 302], fill=pal["accent"])
    
    y = 340
    
    # Break why_special into nuggets (sentences)
    if why:
        sentences = [s.strip() for s in why.replace("—", ".").split(".") if s.strip() and len(s.strip()) > 15]
        for i, sent in enumerate(sentences[:5]):
            # Number marker
            draw.text((80, y), f"0{i+1}", font=fonts["mono_sm"], fill=pal["accent"])
            # Sentence
            lines = wrap_text(sent + ".", fonts["body_sm"], W - 220)
            sent_y = y
            for line in lines[:3]:
                draw.text((160, sent_y), line, font=fonts["body_sm"], fill=pal["text"])
                sent_y += 34
            y = sent_y + 30
            
            if y > H - 200:
                break
    
    # Tagline at bottom
    if tagline and y < H - 200:
        draw.rectangle([80, H - 180, W-80, H - 179], fill=WARM_GREY)
        tag_lines = wrap_text(f'"{tagline}"', fonts["caption"], W - 160)
        ty = H - 160
        for line in tag_lines[:2]:
            draw.text((80, ty), line, font=fonts["caption"], fill=pal["muted"])
            ty += 28
    
    draw_nakshiq_footer(draw, fonts, pal, H - 70)
    return img


# ══════════════════════════════════════════════════════════════
# FORMAT 5: HIDDEN GEM — Spotlight on obscure destinations
# ══════════════════════════════════════════════════════════════
def gen_hidden_gem(dest, fonts, pal):
    img = Image.new("RGB", (W, H), pal["bg"])
    draw = ImageDraw.Draw(img)
    
    name = dest["name"]
    hidden = dest.get("hiddenness", 3)
    remote = dest.get("remoteness", 3)
    
    # Header with gem icon (unicode diamond)
    draw.text((80, 70), "◆ HIDDEN GEM", font=fonts["mono_sm"], fill=pal["accent"])
    draw.rectangle([80, 110, 350, 113], fill=pal["accent"])
    
    # Destination name
    name_lines = wrap_text(name.upper(), fonts["title_lg"], W - 160)
    y = 150
    for line in name_lines[:2]:
        draw.text((80, y), line, font=fonts["title_lg"], fill=pal["text"])
        y += 85
    
    draw.text((80, y + 10), dest.get("state", ""), font=fonts["body"], fill=pal["muted"])
    y += 70
    
    # Hiddenness meter
    if hidden:
        draw.text((80, y), "HIDDENNESS", font=fonts["label"], fill=pal["muted"])
        y += 30
        for i in range(5):
            bx = 80 + i * 60
            fill = pal["accent"] if i < (hidden or 0) else DARK_CREAM
            draw_rounded_rect(draw, [bx, y, bx+48, y+48], 6, fill)
        y += 80
    
    # Remoteness meter
    if remote:
        draw.text((80, y), "REMOTENESS", font=fonts["label"], fill=pal["muted"])
        y += 30
        for i in range(5):
            bx = 80 + i * 60
            fill = pal["accent"] if i < (remote or 0) else DARK_CREAM
            draw_rounded_rect(draw, [bx, y, bx+48, y+48], 6, fill)
        y += 80
    
    # Why special
    why = dest.get("why_special", "")
    if why:
        draw.rectangle([80, y, W-80, y+1], fill=WARM_GREY)
        y += 30
        excerpt = why[:300]
        if len(why) > 300:
            excerpt = excerpt.rsplit(" ", 1)[0] + "..."
        lines = wrap_text(excerpt, fonts["body_sm"], W - 160)
        for line in lines[:8]:
            draw.text((80, y), line, font=fonts["body_sm"], fill=pal["text"])
            y += 34
    
    draw_nakshiq_footer(draw, fonts, pal, H - 70)
    return img


# ══════════════════════════════════════════════════════════════
# DISPATCHER
# ══════════════════════════════════════════════════════════════
FORMAT_MAP = {
    "tagline": gen_tagline,
    "vibe_check": gen_vibe_check,
    "by_the_numbers": gen_by_the_numbers,
    "what_nobody_tells": gen_what_nobody_tells,
    "hidden_gem": gen_hidden_gem,
}

def pick_formats_for_dest(dest):
    """Pick which formats make sense for this destination."""
    formats = ["tagline"]  # Always generate tagline
    
    if dest.get("vibe") or dest.get("type"):
        formats.append("vibe_check")
    
    if dest.get("elevation_m") or dest.get("hiddenness") or dest.get("remoteness"):
        formats.append("by_the_numbers")
    
    if dest.get("why_special") and len(dest.get("why_special", "")) > 100:
        formats.append("what_nobody_tells")
    
    hidden = dest.get("hiddenness", 0) or 0
    remote = dest.get("remoteness", 0) or 0
    if hidden >= 3 or remote >= 4:
        formats.append("hidden_gem")
    
    return formats


def sanitize_filename(name):
    """Make destination name filesystem-safe."""
    return name.lower().replace(" ", "_").replace("(", "").replace(")", "").replace("&", "and").replace(",", "").replace("'", "")


def generate_for_state(state_name, dests, fonts, formats_filter=None, dry_run=False):
    """Generate all story images for destinations in a state."""
    state_slug = sanitize_filename(state_name)
    state_dir = OUTPUT_DIR / state_slug
    state_dir.mkdir(parents=True, exist_ok=True)
    
    total = 0
    for dest in dests:
        dest_slug = sanitize_filename(dest["name"])
        formats = pick_formats_for_dest(dest)
        
        if formats_filter:
            formats = [f for f in formats if f in formats_filter]
        
        # Pick a consistent palette per destination (deterministic from name hash)
        pal_idx = hash(dest["name"]) % len(PALETTES)
        pal = PALETTES[pal_idx]
        
        for fmt in formats:
            fname = f"story_{state_slug}_{dest_slug}_{fmt}.png"
            fpath = state_dir / fname
            
            if dry_run:
                print(f"  [DRY] {fname}")
                total += 1
                continue
            
            gen_fn = FORMAT_MAP[fmt]
            img = gen_fn(dest, fonts, pal)
            img.save(str(fpath), "PNG", optimize=True)
            print(f"  ✓ {fname}")
            total += 1
    
    return total


def main():
    parser = argparse.ArgumentParser(description="Generate NakshIQ destination story images")
    parser.add_argument("--state", type=str, help="State name to generate for")
    parser.add_argument("--all", action="store_true", help="Generate for all states")
    parser.add_argument("--format", type=str, choices=list(FORMAT_MAP.keys()), help="Specific format only")
    parser.add_argument("--dry-run", action="store_true", help="Preview without generating")
    parser.add_argument("--data", type=str, help="Path to JSON data file (instead of hardcoded)")
    args = parser.parse_args()
    
    if not args.state and not args.all:
        parser.error("Specify --state NAME or --all")
    
    print("Loading fonts...")
    fonts = load_fonts()
    
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Load data from JSON file
    if args.data:
        with open(args.data) as f:
            all_data = json.load(f)
    else:
        print("ERROR: Provide --data path to destination JSON")
        sys.exit(1)
    
    formats_filter = [args.format] if args.format else None
    
    grand_total = 0
    states_to_process = list(all_data.keys()) if args.all else [args.state]
    
    for state_name in states_to_process:
        if state_name not in all_data:
            print(f"WARNING: State '{state_name}' not found in data")
            continue
        dests = all_data[state_name]
        print(f"\n{'='*60}")
        print(f"STATE: {state_name} ({len(dests)} destinations)")
        print(f"{'='*60}")
        count = generate_for_state(state_name, dests, fonts, formats_filter, args.dry_run)
        grand_total += count
    
    action = "would generate" if args.dry_run else "generated"
    print(f"\n{'='*60}")
    print(f"TOTAL: {action} {grand_total} story images")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
