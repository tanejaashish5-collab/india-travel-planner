#!/usr/bin/env python3
"""
gen_flow_stories.py — Generate varied text-overlay image prompts for Flow/Nano Banana 2.
Reads destinations_data.json and produces prompts with diverse design styles.
Each prompt includes the photo background + text overlay instructions so the AI
renders the complete storytelling card in one shot.

Usage:
  python gen_flow_stories.py --all                    # All 491 destinations
  python gen_flow_stories.py --state "Ladakh"         # Single state
  python gen_flow_stories.py --state "Goa" --style editorial  # Specific style
  python gen_flow_stories.py --preview 5              # Show 5 sample prompts
  python gen_flow_stories.py --collections            # Route/collection/festival prompts
"""

import json, hashlib, random, argparse, os, sys
from pathlib import Path

# ── Month names ──────────────────────────────────────────────────────────
MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

def fmt_months(best_months):
    if not best_months: return "Year-round"
    names = [MONTHS[m-1] for m in sorted(best_months) if 1 <= m <= 12]
    if len(names) >= 10: return "Year-round"
    if len(names) <= 3: return ", ".join(names)
    return f"{names[0]}-{names[-1]}"

def fmt_budget(tier):
    # Keys must match the canonical destinations.budget_tier enum
    # (feedback_destinations_budget_tier_constraint.md): hyphenated values.
    # Empty default — better to drop the chip than to silently mislabel.
    m = {
        "budget":         "₹",
        "mid-range":      "₹₹",
        "splurge":        "₹₹₹",
        "mixed":          "₹–₹₹₹",
        "budget-to-mid":  "₹–₹₹",
        "mid-to-luxury":  "₹₹–₹₹₹",
    }
    return m.get(tier, "")

def fmt_elevation(e):
    if not e or e < 10: return None
    if e >= 1000: return f"{e:,}m"
    return f"{e}m"

def fmt_difficulty(d):
    return {"easy": "Easy Access", "moderate": "Moderate Trek", "challenging": "Challenging",
            "extreme": "Extreme Adventure"}.get(d, None)

def hiddenness_label(h):
    if h is None: return None
    if h >= 0.8: return "Ultra Hidden"
    if h >= 0.6: return "Off the Radar"
    if h >= 0.4: return "Under-explored"
    return None

def remoteness_label(r):
    if r is None: return None
    if r >= 0.8: return "Edge of Civilization"
    if r >= 0.6: return "Far-flung"
    if r >= 0.4: return "Remote"
    return None

# ── Landscape descriptors per state/region ───────────────────────────────
LANDSCAPE_HINTS = {
    "Ladakh": "barren high-altitude moonscape, rugged Himalayan peaks, Buddhist monasteries",
    "Jammu & Kashmir": "snow-covered Kashmir valley, pine forests, dal lake houseboats, mughal gardens",
    "Himachal Pradesh": "misty Himalayan hill station, cedar forests, colonial architecture, mountain trails",
    "Uttarakhand": "Himalayan foothills, sacred rivers, dense deodar forests, pilgrimage temples",
    "Punjab": "golden wheat fields, historic Sikh gurudwaras, vibrant bazaars",
    "Haryana": "flat plains, ancient archaeological sites, rural countryside",
    "Chandigarh": "modernist Le Corbusier architecture, rock garden, planned city grid",
    "Rajasthan": "golden sandstone forts and palaces, Thar Desert dunes, colorful bazaars, camel caravans",
    "Uttar Pradesh": "ancient temple cities on sacred rivers, Mughal monuments, spiritual ghats",
    "Bihar": "ancient Buddhist ruins, Bodhi tree, rural plains, Ganges riverbanks",
    "Jharkhand": "dense sal forests, tribal waterfalls, rocky plateaus, red earth",
    "West Bengal": "colonial Kolkata mansions, Sundarbans mangroves, tea gardens, terracotta temples",
    "Sikkim": "rhododendron forests, Buddhist monasteries on misty ridges, Kanchenjunga views",
    "Arunachal Pradesh": "cloud forests, bamboo villages, snow peaks, tribal longhouses, rushing rivers",
    "Nagaland": "rolling Naga hills, hornbill festival grounds, tribal warrior villages, misty valleys",
    "Manipur": "Loktak floating lake, lush green valleys, polo grounds, mountain passes",
    "Mizoram": "endless blue-green mountain ridges, bamboo forests, cloud-wrapped villages",
    "Tripura": "bamboo palaces, Hindu temple complexes, rubber plantations, lake palaces",
    "Meghalaya": "living root bridges, crystal waterfalls, limestone caves, wettest place on earth",
    "Assam": "vast tea estates, Brahmaputra river islands, one-horned rhino grasslands",
    "Odisha": "ancient Hindu temples, pristine beaches, tribal art villages, Chilika lagoon",
    "Chhattisgarh": "dense jungle waterfalls, tribal markets, Bastar rock art, red earth canyons",
    "Madhya Pradesh": "tiger reserves, ancient rock shelters, ornate temples, royal cenotaphs",
    "Gujarat": "Rann of Kutch salt flats, Gir lions, stepwells, textile bazaars",
    "Maharashtra": "Western Ghats hill forts, Konkan coast beaches, Ajanta-Ellora caves",
    "Goa": "palm-fringed beaches, Portuguese churches, spice plantations, sunset shacks",
    "Karnataka": "Hampi boulder ruins, Western Ghats coffee estates, ornate Hoysala temples",
    "Andhra Pradesh": "Tirupati temple hills, Krishna river delta, Belum caves, spice markets",
    "Telangana": "Hyderabad pearl bazaars, Golconda fort, Nizam palaces, biryani street food",
    "Tamil Nadu": "towering Dravidian gopurams, temple towns, hill stations, Chettinad mansions",
    "Kerala": "emerald backwaters, coconut palm houseboats, spice gardens, Ayurvedic retreats",
    "Andaman & Nicobar": "turquoise lagoons, pristine coral reefs, dense tropical rainforest, volcanic beach",
    "Lakshadweep": "remote coral atolls, crystal lagoons, untouched tropical islands",
    "Puducherry": "French colonial quarter, pastel-colored villas, Auroville meditation dome",
    "Delhi": "Mughal monuments, bustling old Delhi lanes, modern India Gate boulevard",
    "Dadra & Nagar Haveli": "lush tribal forests, Daman Ganga river, wildlife sanctuaries",
}

# ── 10 DESIGN STYLES (varied so they don't look templated) ───────────────
# Each returns a prompt string given destination data

def style_editorial_magazine(d, landscape):
    """Clean editorial magazine spread — large serif title, italic tagline, data strip at bottom"""
    elev = fmt_elevation(d.get("elevation_m"))
    months = fmt_months(d.get("best_months"))
    budget = fmt_budget(d.get("budget_tier"))
    vibes = d.get("vibe", [])[:3]

    data_chips = []
    if elev: data_chips.append(elev)
    data_chips.append(f"Best: {months}")
    data_chips.append(f"Budget: {budget}")

    vibe_str = ""
    if vibes:
        vibe_str = f' Rounded pill tags at bottom: {" ".join(f""""{v}"""  for v in vibes)}.'

    return (
        f"Editorial magazine-style Instagram travel card. Cinematic photo background of {landscape} "
        f"at {d['name']}, {d['state']}. Large elegant serif title \"{d['name'].upper()}\" centered at top "
        f"in white with subtle drop shadow. Italic subtitle below: \"{d.get('tagline', '')}\". "
        f"Thin horizontal line separator. Data strip at bottom with small chips: "
        f"{' | '.join(data_chips)}.{vibe_str} "
        f"Small footer: \"naksh.iq\" with dot accent. Dark gradient overlay at top and bottom for text readability. "
        f"Premium travel editorial layout, 3:4 portrait format"
    )

def style_bold_modern(d, landscape):
    """Bold modern poster — huge condensed sans-serif title, geometric accents"""
    why = d.get("why_special", "")
    quote = why[:80].rsplit(" ", 1)[0] + "..." if len(why) > 80 else why
    months = fmt_months(d.get("best_months"))

    types = d.get("type", [])[:3]
    type_str = ""
    if types:
        type_str = f' Category labels in small caps: {", ".join(types)}.'

    return (
        f"Bold modern poster design for Instagram. Striking photo of {landscape} at {d['name']}. "
        f"Massive condensed sans-serif title \"{d['name'].upper()}\" spanning full width at top, "
        f"white text with geometric line accents. Small state label \"{d['state'].upper()}\" above title in tracking-wide text. "
        f"Pull quote in center: \"{quote}\" in elegant italic. "
        f"Bottom has minimal info bar: \"{months}\" and \"{fmt_budget(d.get('budget_tier'))}\".{type_str} "
        f"Accent color stripe at very bottom with \"naksh.iq\" branding. "
        f"Contemporary graphic design aesthetic, high contrast, 3:4"
    )

def style_data_card(d, landscape):
    """Data-driven infographic card — numbers prominent, scientific feel"""
    elev = fmt_elevation(d.get("elevation_m"))
    months = fmt_months(d.get("best_months"))
    diff = fmt_difficulty(d.get("difficulty"))
    hidden = hiddenness_label(d.get("hiddenness"))
    remote = remoteness_label(d.get("remoteness"))

    metrics = []
    if elev: metrics.append(f"▲ {elev} altitude")
    if diff: metrics.append(f"◆ {diff}")
    if hidden: metrics.append(f"◎ {hidden}")
    if remote: metrics.append(f"⊕ {remote}")
    metrics.append(f"☀ {months}")
    budget = fmt_budget(d.get("budget_tier"))
    if budget:
        metrics.append(budget)

    return (
        f"Data-driven travel infographic card. Background photo of {landscape} at {d['name']}, "
        f"with dark semi-transparent overlay. Title \"{d['name']}\" in bold white monospace font at top left. "
        f"State label \"{d['state']}\" in small orange text above title. "
        f"Right side has vertical data column with metrics stacked: {'; '.join(metrics)}. "
        f"Each metric has an icon and value in clean monospace typography. "
        f"Bottom bar: \"TRAVEL WITH CONFIDENCE\" and \"naksh.iq\" in small text. "
        f"Scientific expedition journal aesthetic, dark moody tones, 3:4"
    )

def style_vibe_check(d, landscape):
    """Personality profile card — vibe pills, personality descriptors"""
    vibes = d.get("vibe", [])[:4]
    types = d.get("type", [])[:3]
    why = d.get("why_special", "")
    excerpt = why[:100].rsplit(" ", 1)[0] if len(why) > 100 else why

    pills = vibes + types
    pill_str = ", ".join(f'"{p}"' for p in pills[:5]) if pills else '"Hidden Gem", "Must Visit"'

    return (
        f"Personality profile travel card for Instagram. Dreamy photo of {landscape} at {d['name']}. "
        f"Top: destination name \"{d['name']}\" in handwritten-style brush font, white. "
        f"Below: \"{d['state']}\" in thin sans-serif. "
        f"Center section has personality trait pills in frosted glass bubbles: {pill_str}. "
        f"Below pills: italic quote \"{excerpt}\". "
        f"Bottom: \"Your Travel Personality Match\" in small caps, then \"naksh.iq\" footer. "
        f"Soft pastel gradient overlay, warm dreamy aesthetic, editorial Instagram 3:4"
    )

def style_insider_knowledge(d, landscape):
    """Insider tips card — numbered nuggets from why_special"""
    why = d.get("why_special", "")
    # Split into 2-3 knowledge nuggets
    sentences = [s.strip() for s in why.replace(". ", ".|").split("|") if s.strip()][:3]

    nuggets = ""
    for i, s in enumerate(sentences, 1):
        short = s[:70].rsplit(" ", 1)[0] if len(s) > 70 else s.rstrip(".")
        nuggets += f' #{i}: "{short}."'

    if not nuggets:
        nuggets = f' #1: "A hidden treasure waiting to be discovered."'

    return (
        f"Insider knowledge travel card. Atmospheric photo of {landscape} at {d['name']}, {d['state']}. "
        f"Top banner: \"WHAT NOBODY TELLS YOU ABOUT\" in small tracking-wide white text. "
        f"Large destination name \"{d['name'].upper()}\" below in bold serif. "
        f"Center has numbered insider tips on frosted dark cards:{nuggets} "
        f"Bottom: \"{fmt_months(d.get('best_months'))}\" and \"naksh.iq\" branding. "
        f"Dark editorial storytelling layout, cinematic photography, 3:4"
    )

def style_hidden_gem(d, landscape):
    """Hidden gem reveal — meter/gauge visualization for remoteness/hiddenness"""
    hidden = d.get("hiddenness")
    remote = d.get("remoteness")
    h_pct = int((hidden or 0.5) * 100)
    r_pct = int((remote or 0.5) * 100)

    return (
        f"Hidden gem reveal card for Instagram travel. Moody atmospheric photo of {landscape} "
        f"at {d['name']}, {d['state']}. Top: small label \"HIDDEN GEM ALERT\" in gold/amber text. "
        f"Large title \"{d['name'].upper()}\" in white bold serif with glow effect. "
        f"Tagline: \"{d.get('tagline', 'Off the beaten path')}\". "
        f"Center has two horizontal meter bars: \"Hiddenness: {h_pct}%\" and \"Remoteness: {r_pct}%\" "
        f"with filled progress bars in amber/gold. "
        f"Bottom: difficulty badge \"{fmt_difficulty(d.get('difficulty')) or 'Moderate'}\" "
        f"and \"naksh.iq\" footer. "
        f"Mysterious dark tones with gold accents, discovery aesthetic, 3:4"
    )

def style_postcard(d, landscape):
    """Vintage postcard — handwritten feel, stamp, postmark"""
    return (
        f"Vintage travel postcard design. Beautiful photo of {landscape} at {d['name']}, {d['state']}. "
        f"Handwritten-style title \"Greetings from {d['name']}\" in elegant cursive across the top. "
        f"Bottom right corner has a vintage-style stamp with \"{d['state']}\" text. "
        f"Circular postmark overlay with date. "
        f"Subtitle: \"{d.get('tagline', 'Wish you were here')}\". "
        f"Small text: \"Best time: {fmt_months(d.get('best_months'))}\" and \"{fmt_budget(d.get('budget_tier'))}\" "
        f"in a weathered label. \"naksh.iq\" in corner. "
        f"Warm vintage color grading, slightly worn paper edges, nostalgic 3:4"
    )

def style_minimal_japanese(d, landscape):
    """Minimal Japanese-inspired — lots of whitespace, vertical text, zen"""
    return (
        f"Minimalist Japanese-inspired travel card. Serene photo of {landscape} at {d['name']}. "
        f"Large white space at top with destination name \"{d['name']}\" in thin elegant serif, "
        f"very small \"{d['state']}\" below it. "
        f"Vertical text on right edge: \"{d.get('tagline', 'Travel with intention')}\". "
        f"Bottom has a thin line with minimal data: \"{fmt_elevation(d.get('elevation_m')) or 'Sea level'}\" "
        f"and \"{fmt_months(d.get('best_months'))}\". "
        f"Very bottom: \"naksh.iq\" in whisper-small text. "
        f"Extreme negative space, muted tones, wabi-sabi aesthetic, zen calm, 3:4"
    )

def style_adventure_badge(d, landscape):
    """Adventure badge/patch — outdoor expedition style with shield/badge element"""
    elev = fmt_elevation(d.get("elevation_m"))
    diff = fmt_difficulty(d.get("difficulty"))

    badge_text = []
    if elev: badge_text.append(elev)
    if diff: badge_text.append(diff)
    badge_text.append(d["state"])

    return (
        f"Adventure expedition badge card for Instagram. Dramatic photo of {landscape} at {d['name']}. "
        f"Center has a shield/badge emblem with destination name \"{d['name'].upper()}\" in bold condensed text "
        f"inside the badge. Badge has decorative border with mountains/compass motif. "
        f"Around badge: {' · '.join(badge_text)}. "
        f"Top: \"EXPEDITION\" in tracking-wide small text. "
        f"Bottom: \"EST. {random.choice(['ANCIENT', 'TIMELESS', 'LEGENDARY'])}\" and season \"{fmt_months(d.get('best_months'))}\". "
        f"\"naksh.iq\" at very bottom. "
        f"Outdoor adventure branding, earth tones, expedition journal feel, 3:4"
    )

def style_superlative(d, landscape):
    """Superlative/stat hero — one big surprising fact dominates"""
    elev = d.get("elevation_m", 0) or 0
    hidden = d.get("hiddenness") or 0
    remote = d.get("remoteness") or 0

    # Pick the most interesting superlative
    facts = []
    if elev > 3000: facts.append(f"At {elev:,}m, higher than most European peaks")
    if elev > 4000: facts.append(f"{elev:,}m — where the air thins and the views never end")
    if hidden > 0.7: facts.append(f"Only {int((1-hidden)*100)}% of travelers know this place exists")
    if remote > 0.7: facts.append(f"Remoteness score: {int(remote*100)}/100 — true frontier territory")
    if d.get("cell_network") == "none": facts.append("Zero cell signal — pure digital detox")
    if d.get("cell_network") == "limited": facts.append("Limited cell signal — the world fades away here")
    if not facts:
        facts.append(f"\"{d.get('tagline', 'A destination that changes you')}\"")

    hero_fact = facts[0]

    return (
        f"Bold stat-hero travel card for Instagram. Cinematic photo of {landscape} at {d['name']}, {d['state']}. "
        f"Dominant large text in center: \"{hero_fact}\" in bold white mixed typography (key number extra large). "
        f"Small destination name \"{d['name'].upper()}\" at top in tracking-wide sans-serif. "
        f"Bottom strip: \"{d['state']}\" · \"{fmt_months(d.get('best_months'))}\" · \"{fmt_budget(d.get('budget_tier'))}\". "
        f"\"naksh.iq\" footer branding. "
        f"High-impact editorial design, dramatic dark overlay, one-stat storytelling, 3:4"
    )

# ── All styles registry ──────────────────────────────────────────────────
STYLES = [
    ("editorial", style_editorial_magazine),
    ("bold_modern", style_bold_modern),
    ("data_card", style_data_card),
    ("vibe_check", style_vibe_check),
    ("insider", style_insider_knowledge),
    ("hidden_gem", style_hidden_gem),
    ("postcard", style_postcard),
    ("minimal", style_minimal_japanese),
    ("adventure", style_adventure_badge),
    ("superlative", style_superlative),
]

def pick_style(dest_name, style_override=None):
    """Deterministic style rotation based on destination name hash"""
    if style_override:
        for name, fn in STYLES:
            if name == style_override:
                return name, fn
    h = int(hashlib.md5(dest_name.encode()).hexdigest(), 16)
    idx = h % len(STYLES)
    return STYLES[idx]

def pick_best_styles(d):
    """Pick 2 best-fit styles for a destination based on its data"""
    styles = []
    h = int(hashlib.md5(d["name"].encode()).hexdigest(), 16)

    # Always include the hash-based primary style
    primary_idx = h % len(STYLES)
    styles.append(STYLES[primary_idx])

    # Pick a complementary style based on data
    hidden = d.get("hiddenness") or 0
    remote = d.get("remoteness") or 0
    elev = d.get("elevation_m") or 0

    if hidden > 0.6 or remote > 0.6:
        candidate = ("hidden_gem", style_hidden_gem)
    elif elev > 3000 or d.get("difficulty") in ("challenging", "extreme"):
        candidate = ("adventure", style_adventure_badge)
    elif d.get("vibe") and len(d.get("vibe", [])) >= 2:
        candidate = ("vibe_check", style_vibe_check)
    elif elev > 2000 or hidden > 0.5:
        candidate = ("superlative", style_superlative)
    else:
        secondary_idx = (h * 7 + 3) % len(STYLES)
        candidate = STYLES[secondary_idx]

    if candidate[0] != styles[0][0]:
        styles.append(candidate)
    else:
        fallback_idx = (primary_idx + 3) % len(STYLES)
        styles.append(STYLES[fallback_idx])

    return styles

# ── Collection/Route/Festival prompts ────────────────────────────────────
COLLECTIONS = [
    {
        "title": "TOP 10 HIDDEN GEMS",
        "subtitle": "Places 95% of Travelers Miss",
        "filter": lambda d: (d.get("hiddenness") or 0) > 0.7,
        "landscape": "mysterious misty mountain valley with ancient ruins barely visible through fog",
        "style": "editorial"
    },
    {
        "title": "EXTREME INDIA",
        "subtitle": "For the Fearless Explorer",
        "filter": lambda d: d.get("difficulty") in ("challenging", "extreme"),
        "landscape": "dramatic cliff edge trail with rope bridge over deep gorge, adventurer silhouette",
        "style": "adventure"
    },
    {
        "title": "UNDER ₹1000/DAY",
        "subtitle": "Budget Destinations That Feel Luxury",
        "filter": lambda d: d.get("budget_tier") == "budget",
        "landscape": "beautiful sunset over a serene lake with simple wooden boats and village in background",
        "style": "data_card"
    },
    {
        "title": "ABOVE THE CLOUDS",
        "subtitle": "India's Highest Destinations",
        "filter": lambda d: (d.get("elevation_m") or 0) > 4000,
        "landscape": "vast Himalayan panorama above cloud line, prayer flags, snow peaks touching sky",
        "style": "superlative"
    },
    {
        "title": "ZERO SIGNAL ZONE",
        "subtitle": "Where Digital Detox is Mandatory",
        "filter": lambda d: d.get("cell_network") in ("none", "limited"),
        "landscape": "remote mountain campsite under milky way stars, no artificial light, pure wilderness",
        "style": "hidden_gem"
    },
    {
        "title": "MONSOON MAGIC",
        "subtitle": "Best in the Rains",
        "filter": lambda d: 7 in (d.get("best_months") or []) and 8 in (d.get("best_months") or []),
        "landscape": "lush green waterfall cascading through tropical forest in heavy monsoon rain, mist rising",
        "style": "vibe_check"
    },
    {
        "title": "WINTER WONDERLAND",
        "subtitle": "India's Best Snow Destinations",
        "filter": lambda d: (d.get("elevation_m") or 0) > 2000 and 12 in (d.get("best_months") or []),
        "landscape": "snow-blanketed Himalayan village with smoke rising from chimneys, pine trees heavy with snow",
        "style": "postcard"
    },
]

STATE_SHOWCASE = [
    ("Ladakh", "The Last Frontier", "endless moonscape passes and turquoise high-altitude lakes"),
    ("Rajasthan", "Land of Kings", "golden fort silhouettes against fiery desert sunset"),
    ("Kerala", "God's Own Country", "emerald backwater canals lined with coconut palms at golden hour"),
    ("Meghalaya", "Abode of Clouds", "living root bridges draped in moss over crystal clear streams"),
    ("Sikkim", "Hidden Kingdom", "rhododendron forests with Kanchenjunga towering above monastery"),
    ("Goa", "Beyond the Beach", "Portuguese chapel on a cliff overlooking secluded cove at sunset"),
    ("Himachal Pradesh", "Mountain Calling", "snow-capped Himalayan peaks behind apple orchards in bloom"),
    ("Tamil Nadu", "Temple Country", "towering colorful Dravidian gopuram temple at sunset with oil lamps"),
    ("Uttarakhand", "Dev Bhoomi", "sacred river confluence with ancient temples and misty Himalayan backdrop"),
    ("Karnataka", "One State Many Worlds", "Hampi boulder landscape with ancient Vijayanagara ruins at golden hour"),
    ("Gujarat", "Land of Legends", "white Rann of Kutch salt desert stretching to horizon under full moon"),
    ("Nagaland", "Land of Festivals", "Naga warrior in traditional regalia with misty hills and hornbill"),
    ("Arunachal Pradesh", "Land of the Rising Sun", "sunrise over Tawang monastery with snow peaks"),
    ("West Bengal", "Cultural Capital", "colonial Kolkata architecture along Hooghly river with Howrah Bridge"),
    ("Assam", "Gateway to the East", "endless tea gardens with mist rolling through at dawn"),
    ("Madhya Pradesh", "Heart of India", "tiger emerging from morning mist in sal forest"),
    ("Maharashtra", "Gateway of India", "Western Ghats hill fort rising through monsoon clouds"),
    ("Odisha", "Soul of India", "Konark Sun Temple wheel with ocean in background at sunrise"),
    ("Andaman & Nicobar", "Emerald Islands", "turquoise lagoon with pristine white beach and tropical forest"),
]


def generate_collection_prompt(coll, matching_dests):
    """Generate a collection/roundup card prompt"""
    count = len(matching_dests)
    sample_names = ", ".join(d["name"] for d in matching_dests[:5])

    style_fn = None
    for name, fn in STYLES:
        if name == coll["style"]:
            style_fn = fn
            break

    return (
        f"Instagram travel collection card. Cinematic photo background of {coll['landscape']}. "
        f"Large bold title \"{coll['title']}\" at top in white with dramatic typography. "
        f"Subtitle: \"{coll['subtitle']}\" in italic below. "
        f"Center shows count badge: \"{count} Destinations\" in a circle. "
        f"Sample names in small text: \"{sample_names}...\". "
        f"Bottom: \"Swipe to explore →\" call-to-action and \"naksh.iq\" branding. "
        f"Premium editorial card design, dark dramatic overlay, 3:4"
    )

def generate_state_prompt(state_name, tagline, landscape):
    """Generate a state showcase card prompt"""
    return (
        f"Instagram state showcase card. Stunning cinematic photo of {landscape} in {state_name}, India. "
        f"Huge bold title \"{state_name.upper()}\" centered in white with letterpress texture. "
        f"Elegant italic subtitle: \"{tagline}\". "
        f"Map outline silhouette of {state_name} state in semi-transparent white at corner. "
        f"Bottom data: number of destinations, best season, key highlight. "
        f"\"Explore all destinations →\" and \"naksh.iq\" footer. "
        f"Premium travel editorial, state pride design, warm cinematic tones, 3:4"
    )


def load_data(data_path):
    with open(data_path) as f:
        raw = json.load(f)
    # Flatten state-grouped structure
    dests = []
    if isinstance(raw, dict):
        for state, state_dests in raw.items():
            for d in state_dests:
                d["state"] = state
                dests.append(d)
    else:
        dests = raw
    return dests


def generate_prompts(dests, style_override=None, max_per_dest=2):
    """Generate prompts for all destinations"""
    prompts = []
    for d in dests:
        state = d.get("state", "India")
        landscape = LANDSCAPE_HINTS.get(state, "beautiful Indian landscape, cultural heritage")

        if style_override:
            style_name, style_fn = pick_style(d["name"], style_override)
            prompt = style_fn(d, landscape)
            prompts.append({
                "dest": d["name"],
                "state": state,
                "style": style_name,
                "prompt": prompt
            })
        else:
            # Pick 2 varied styles per destination
            styles = pick_best_styles(d)
            for style_name, style_fn in styles[:max_per_dest]:
                prompt = style_fn(d, landscape)
                prompts.append({
                    "dest": d["name"],
                    "state": state,
                    "style": style_name,
                    "prompt": prompt
                })
    return prompts


def main():
    parser = argparse.ArgumentParser(description="Generate Flow/Nano Banana 2 prompts")
    parser.add_argument("--data", default="pomelli_stories_library/destinations_data.json")
    parser.add_argument("--state", help="Generate for single state")
    parser.add_argument("--style", choices=[s[0] for s in STYLES], help="Force specific style")
    parser.add_argument("--all", action="store_true", help="All destinations")
    parser.add_argument("--collections", action="store_true", help="Collection/route prompts")
    parser.add_argument("--states", action="store_true", help="State showcase prompts")
    parser.add_argument("--preview", type=int, help="Show N sample prompts")
    parser.add_argument("--output", default="flow_stories_library/prompts.json", help="Output file")
    parser.add_argument("--max-per-dest", type=int, default=2, help="Max styles per destination")
    args = parser.parse_args()

    data_path = Path(args.data)
    if not data_path.exists():
        print(f"❌ Data file not found: {data_path}")
        sys.exit(1)

    dests = load_data(data_path)
    print(f"📊 Loaded {len(dests)} destinations across {len(set(d.get('state','') for d in dests))} states")

    all_prompts = []

    # Filter by state if specified
    if args.state:
        dests = [d for d in dests if d.get("state", "").lower() == args.state.lower()]
        print(f"🎯 Filtered to {len(dests)} destinations in {args.state}")

    if args.all or args.state:
        prompts = generate_prompts(dests, args.style, args.max_per_dest)
        all_prompts.extend(prompts)
        print(f"✅ Generated {len(prompts)} destination prompts")

    if args.collections:
        for coll in COLLECTIONS:
            matching = [d for d in dests if coll["filter"](d)]
            if matching:
                p = generate_collection_prompt(coll, matching)
                all_prompts.append({
                    "dest": coll["title"],
                    "state": "COLLECTION",
                    "style": coll["style"],
                    "prompt": p
                })
        print(f"✅ Generated {len(COLLECTIONS)} collection prompts")

    if args.states:
        for state_name, tagline, landscape in STATE_SHOWCASE:
            p = generate_state_prompt(state_name, tagline, landscape)
            all_prompts.append({
                "dest": state_name,
                "state": "STATE_SHOWCASE",
                "style": "editorial",
                "prompt": p
            })
        print(f"✅ Generated {len(STATE_SHOWCASE)} state showcase prompts")

    if args.preview:
        random.seed(42)
        samples = random.sample(all_prompts, min(args.preview, len(all_prompts)))
        for i, p in enumerate(samples, 1):
            print(f"\n{'='*80}")
            print(f"#{i} | {p['dest']} ({p['state']}) | Style: {p['style']}")
            print(f"{'='*80}")
            print(p["prompt"])
        return

    # Save prompts
    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(all_prompts, f, indent=2, ensure_ascii=False)

    print(f"\n📁 Saved {len(all_prompts)} prompts to {out_path}")

    # Stats
    style_counts = {}
    for p in all_prompts:
        style_counts[p["style"]] = style_counts.get(p["style"], 0) + 1
    print("\n📊 Style distribution:")
    for style, count in sorted(style_counts.items(), key=lambda x: -x[1]):
        print(f"  {style}: {count}")


if __name__ == "__main__":
    main()
