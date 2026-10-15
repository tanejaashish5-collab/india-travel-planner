#!/usr/bin/env python3
"""place_reels.py — the people-free story-reel formats and the weekly format rotation.

    python3 place_reels.py render --fmt two_months --slug chandipur   # render one, write nothing to the ledger
    python3 place_reels.py list --fmt map_reveal                      # who can run today, best first
    python3 place_reels.py prepare                                    # queue the next tiny_world stills + shots
    python3 place_reels.py slots --days 28                            # print the rotation

WHY (founder, 2026-10-15): "we have already had too many people in all reels". Every v3 spec
had a cast; 16 of 22 held cuts were AI people appearing or vanishing mid-shot; people-led story
reels had a median IG reach of 10.5 against 102 for the old data reels. The founder chose to run
every format once a week ("every week we go through all these different format once and then in
a few weeks we will get to know what works") instead of picking one.

Formats (no voice, music bed, text over real pictures; never a text-only reel, which Instagram
ranks down):
  map_reveal  India map, the pin, a zoom, then the place: height, rail and air distance, the next
              good month. The picture is the site's own hero photo or a month-matched Commons photo.
  two_months  The same place in its best coming month and in a skip month, split screen, both REAL
              Commons photos taken within a month of the month they label. Scores, crowd and the
              mid-range hotel price for each month, all from reel-data.json.
  tiny_world  The place as a miniature: two Nano Banana stills made FROM the site hero photo (so
              the layout is the real place), each animated by Veo (Frames to Video, 10 credits).
              Clips must show no people (clip_qa, cast 0).
  data_card   data_card.py, unchanged; it now has its own weekly slot instead of gap days only.
  cast        the v3 story reels (reel_specs/), capped at two a week by the rotation.

EVERY NUMBER ON SCREEN comes from reel-data.json (scripts/export-reel-data.mjs). A place that
cannot fill a format honestly refuses, and publish() moves to the next candidate.

ROTATION: off until ROTATION_START (a file next to this one holding a Monday, e.g. 2026-10-19)
exists. Each week runs map_reveal, cast, data_card, two_months, cast, tiny_world, wildcard; the
weekday order shifts by two days each week so no format always gets the same day. The wildcard repeats
last week's leader (format_reach.json, written by the weekly read-out), else map_reveal.
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent
VEO = Path.home() / "Automation" / "nakshiq-veo"
DATA = VEO / "data" / "reel-data.json"
QUEUE = VEO / "veo_queue.json"
CLIPS = VEO / "clips"
LEDGER = VEO / "data" / "reels.json"
WORK = VEO / "place_reels"
PHOTOS = VEO / "data" / "place_photos"
REACH = VEO / "data" / "format_reach.json"
TPL = HERE / "place_reels"
PROJECT = HERE / "data_card"          # package.json + hyperframes.json + gsap, shared with the data card
HF = "hyperframes@0.8.70"
MAP_SVG = REPO / "apps/web/public/maps/india-outline.svg"
START_FILE = HERE / "ROTATION_START"

MONTHS = ["", "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]
PLACE_FORMATS = ("map_reveal", "two_months", "tiny_world")
# Order matters: casts are apart, and the weekly shift is TWO days (a one-day shift made every Sunday
# and the following Monday the same format). 2 is coprime with 7, so over 7 weeks every format
# lands on every weekday.
WEEK = ("map_reveal", "cast", "data_card", "two_months", "cast", "tiny_world", "wildcard")
SHIFT = 2
REPEAT_DAYS = 60                      # a place is not re-used by the same format inside this window
DUR = {"map_reveal": 15.0, "two_months": 13.0, "tiny_world": 15.0}


class Refuse(Exception):
    pass


def _load(p: Path, default):
    try:
        return json.loads(p.read_text())
    except Exception:
        return default


_DATA: dict | None = None


def data() -> dict:
    global _DATA
    if _DATA is None:
        _DATA = _load(DATA, {})
    return _DATA


# ─── rotation ─────────────────────────────────────────────────────────────
def rotation_start() -> date | None:
    try:
        d = date.fromisoformat(START_FILE.read_text().strip())
    except Exception:
        return None
    return d - timedelta(days=d.weekday())          # always a Monday


def leader() -> str:
    """Last week's best place format by median IG reach (format_reach.json), else map_reveal."""
    r = _load(REACH, {})
    best = r.get("leader")
    return best if best in PLACE_FORMATS + ("data_card",) else "map_reveal"


def slot(day: date) -> str | None:
    """The format this day's story slot runs, or None when the rotation is off or not started."""
    start = rotation_start()
    if not start or day < start:
        return None
    f = _base(day, start)
    if f != "wildcard":
        return f
    # The wildcard repeats last week's leader, but never the same format as the day before or the
    # day after (the weekly shift puts consecutive weeks' wildcards side by side).
    prev = slot(day - timedelta(days=1)) if day > start else None
    nxt = _base(day + timedelta(days=1), start)
    for c in (leader(), *PLACE_FORMATS, "data_card"):
        if c not in (prev, nxt):
            return c
    return leader()


def _base(day: date, start: date) -> str:
    week = (day - start).days // 7
    return WEEK[(day.weekday() - SHIFT * week) % 7]


# ─── shared facts ─────────────────────────────────────────────────────────
def name(slug: str) -> str:
    g = (data().get("geo") or {}).get(slug) or {}
    return g.get("name") or slug.replace("-", " ").title()


def scores(slug: str) -> tuple[list[int], list[str]]:
    m = (data().get("months") or {}).get(slug)
    if not m or len(m) < 12:
        raise Refuse("no 12-month scores")
    return ([int(m[str(i)]["score"]) * 2 for i in range(1, 13)],
            [(m[str(i)].get("label") or "") for i in range(1, 13)])


def next_best(slug: str, today: date) -> tuple[int, int]:
    """(month 1-12, score /10): the best of the next three months; refuses below 8."""
    sc, _ = scores(slug)
    window = [(today.month - 1 + k) % 12 + 1 for k in (1, 2, 3)]
    crowd = (data().get("crowd") or {}).get(slug) or {}
    quiet = set(crowd.get("quiet_months") or [])
    best = max(window, key=lambda m: (sc[m - 1], m in quiet, -window.index(m)))
    if sc[best - 1] < 8:
        raise Refuse(f"nothing scores 8+ in {', '.join(MONTHS[m] for m in window)}")
    return best, sc[best - 1]


def hotel_season(slug: str, month: int) -> tuple[int, str] | None:
    """(mid-range hotel per night, cost season) for the month, from reel-data's cost rows."""
    for c in (data().get("costs") or {}).get(slug) or []:
        if month in (c.get("months") or []) and c.get("hotel_mid"):
            return int(c["hotel_mid"]), c.get("season")
    return None


def hotel_for(slug: str, month: int) -> int | None:
    h = hotel_season(slug, month)
    return h[0] if h else None


def _inr(n: int) -> str:
    return "₹" + f"{int(round(n)):,}"


def _dist(text: str | None) -> tuple[str, int] | None:
    """('Balasore Railway Station', 16) from 'Balasore Railway Station — 16km'; None when the
    text carries no single place and distance (a line we cannot state honestly)."""
    if not text:
        return None
    kms = list(re.finditer(r"(\d[\d,]*)\s*km\b", text))
    if len(kms) != 1 or "/" in text[:kms[0].start()]:      # two distances, or "A / B": not one fact
        return None
    place = text[:kms[0].start()].strip(" —–-:,(")
    place = re.sub(r"\s+", " ", place).strip()
    km = int(kms[0].group(1).replace(",", ""))
    return (place, km) if place and 0 < km < 2000 else None


def _name_px(n: str, max_px: int = 300) -> int:
    return int(min(max_px, max(130, 900 / (0.42 * max(len(n), 1)))))


def hero(slug: str) -> Path | None:
    import guide_reel as GR
    return GR.hero(slug)


# A photo standing for "the place in that month" must be scenery. Titles naming the place also cover
# its birds and flowers (Chakrata 2026-10-15: a barbet and a dandelion), so a title must either be
# only the place name (+ numbers/camera tags) or carry a scenery word, and never a wildlife one.
SCENERY = re.compile(r"\b(view|views|valley|town|city|market|bazaar|hill|hills|mountains?|peaks?|range|lake|river|"
                     r"road|street|temple|fort|palace|beach|coast|sea|landscape|panorama|panoramic|village|forest|"
                     r"snow|snowfall|sunset|sunrise|clouds?|monsoon|rain|winter|summer|autumn|spring|falls|waterfall|"
                     r"church|monastery|gompa|mall|scenery|morning|evening|dusk|dawn|skyline|meadow|glacier|pass|"
                     r"backwaters?|ghats?|bridge|dam|garden|tea|estate|camp|trek|trail|top|point|station)\b", re.I)
WILDLIFE = re.compile(r"\b(bird|birds|barbet|bulbul|warbler|flycatcher|thrush|eagle|owl|insect|butterfly|moth|beetle|"
                      r"spider|bee|wasp|ant|dragonfly|flower|flowers|orchid|plant|leaf|leaves|fungus|fungi|lichen|moss|"
                      r"mushroom|seed|fruit|species|lizard|snake|frog|monkey|langur|macaque|dog|cat|cow|goat|yak|horse|"
                      r"specimen|herbarium|taraxacum|megalaima|psilopogon)\b", re.I)


def scenery_title(place: str, state: str = ""):
    drop = {w.lower() for w in re.findall(r"[A-Za-z]+", f"{place} {state} india")}
    def ok(title: str) -> bool:
        t = re.sub(r"\.(jpe?g|png|tiff?|webp)$", "", title, flags=re.I)
        if WILDLIFE.search(t):
            return False
        rest = [w for w in re.findall(r"[A-Za-z]+", t) if w.lower() not in drop
                and not re.fullmatch(r"(img|dsc|dscn|dcim|pano|panoramio|photo|pic|edit|cropped|of|the|in|at|and|near|from|a)", w, re.I)]
        return not rest or bool(SCENERY.search(t))
    return ok


def commons(slug: str, month: int, tag: str) -> dict | None:
    """A real Commons photo of the place taken within a month of `month` (guide_reel's matcher:
    the title must name the place, no people/signs, a reuse licence). Cached per slug+month."""
    import guide_reel as GR
    dest = PHOTOS / slug / f"{tag}_m{month:02d}.jpg"
    meta = dest.with_suffix(".json")
    if dest.exists() and meta.exists():
        return _load(meta, None)
    nm = name(slug)
    state = ((data().get("geo") or {}).get(slug) or {}).get("state_name") or ""
    used: set = set()
    ok = scenery_title(nm, state)
    for q in (nm, f"{nm} {state}".strip()):
        got = GR.commons_photo(q, nm, dest, used, month, need_month=True, max_gap=1, title_ok=ok)
        if got:
            return got
    return None


# ─── format facts ─────────────────────────────────────────────────────────
def facts_map_reveal(slug: str, today: date) -> dict:
    g = (data().get("geo") or {}).get(slug)
    if not g or g.get("lat") is None:
        raise Refuse("no map pin")
    best, best_score = next_best(slug, today)
    lines = []
    if (g.get("elevation_m") or 0) >= 300:
        lines.append(f"<em>{int(g['elevation_m']):,} m</em> above sea level")
    elif g.get("elevation_m") is not None and int(g["elevation_m"]) < 50:
        lines.append(f"Right on the coast, <em>{int(g['elevation_m'])} m</em> above sea level")
    for key, what in (("nearest_railhead", "train"), ("nearest_airport", "airport")):
        d = _dist(g.get(key))
        if d:
            lines.append(f"<em>{d[1]} km</em> from the {what}: {d[0]}")
    if len(lines) < 2:
        raise Refuse("fewer than two location facts")
    pic = hero(slug)
    credit = ""
    if not pic:
        c = commons(slug, today.month, "map")
        if not c:
            raise Refuse("no photo of the place")
        pic, credit = Path(c["file"]), f"Photo: {c.get('author') or 'Wikimedia Commons'} ({c.get('licence')})"
    return {"slug": slug, "name": name(slug), "state": g.get("state_name") or "", "lat": g["lat"], "lng": g["lng"],
            "facts": lines, "best": MONTHS[best], "best_score": best_score, "photo": pic, "credit": credit,
            "commons": [] if not credit else [c],
            "screen_text": [re.sub(r"</?em>", "", l) for l in lines] + [f"{MONTHS[best]} {best_score}/10"]}


# ─── two_months: two Veo clips side by side, each showing what that month's note says ──────
# Founder 2026-10-15 on the photo version: "there is no reason why we are skipping"; the Chakrata
# photos were a busy street labelled "quiet month" and a lovely landscape labelled "skip". So the
# pictures now come FROM the reason: each month's destination_months.note is turned into the
# Veo prompt (only what the note says), and the note itself is the line on screen.
# (pattern in the note, what the still shows, how the clip moves, what it sounds like)
CUES = [
    (r"heavy monsoon|monsoon|heavy rain|downpour|rain", "heavy monsoon rain pouring down, low dark grey clouds, wet glistening ground and puddles",
     "Heavy rain falls in sheets and low clouds drift across.", "steady heavy rain and distant thunder"),
    (r"landslide|washed out|flash flood|flood", "a swollen muddy stream and loose mud on the road edge", "", ""),
    (r"snow[- ]?(capped|clad|peaks?|line)|(peaks?|mountains?|range|summits?) (with|under|dusted with) snow|snow on (the )?(distant )?(peaks|mountains|range|summits)",
     "snow only on the distant high peaks, the valley and town below dry", "Clouds drift past the snowy peaks far away.", "light wind and birdsong"),
    (r"(?<!pre-)(?<!pre )(?<!no )(?<!before )(?<!without )\b(blizzard|heavy snow|snowfall|snowbound|snow)\b(?![- ]?(free|yet|capped|clad|peaks?|line))", "deep fresh snow covering the ground, roofs and trees", "Light snow drifts down.",
     "soft wind and muffled stillness"),
    (r"fog|mist|haze|smog", "thick drifting fog softening everything", "Fog rolls slowly across.", "a low quiet wind"),
    (r"scorching|heatwave|extreme heat|hot\b|heat", "harsh white midday sun and shimmering heat haze", "Heat haze shimmers over the ground.",
     "dry wind and cicadas"),
    (r"clear sk|clear blue|clear view|clarity|crisp|sunny|sunshine|bright", "a clear deep-blue sky and crisp sharp light", "Soft clouds drift high and leaves stir in a light breeze.",
     "light wind and birdsong"),
    (r"fall colou?rs|autumn|golden", "trees in autumn gold, orange and red", "Autumn leaves stir in a light breeze.", "light wind in dry leaves"),
    (r"bloom|blossom|wildflower|rhododendron|flowers", "trees and slopes in full bloom", "Blossoms sway gently in the breeze.", "birdsong and a light breeze"),
    (r"lush|green|verdant", "lush green hills and fields", "Green slopes ripple in the breeze.", "birdsong and running water"),
]
CROWD_NOTE = re.compile(r"crowd|packed|peak|busy|rush|jam|queue|tourist rush|overcrowd", re.I)
QUIET_NOTE = re.compile(r"quiet|few tourists|fewer tourists|peaceful|empty|deserted|serene|serenity", re.I)


def month_note(slug: str, m: int) -> str:
    return (((data().get("months") or {}).get(slug) or {}).get(str(m)) or {}).get("note") or ""


def reason_line(note: str, limit: int = 78) -> str:
    """The note's own words, as many sentences as fit, preferring the ones that SAY why (weather,
    temperature, crowds, closures) over framing like "November is October's quieter sibling"."""
    sents = [x.strip() for x in re.split(r"(?<=[.!?])\s+", note.strip()) if x.strip()]
    why = re.compile("|".join(p for p, *_ in CUES) + r"|°C|landslide|closed|closure|crowd|quiet|few tourists|peak|"
                     r"road|pass|cold|warm|humid|leech|slippery|flood|wash", re.I)
    visual = re.compile("|".join(p for p, *_ in CUES), re.I)
    # sentences a camera can show first, then other reasons; keep the note's own order within each
    ranked = [x for x in sents if visual.search(x)] + [x for x in sents if why.search(x) and not visual.search(x)]
    pick = ranked or sents
    out = ""
    for sent in pick:
        cand = (out + " " + sent).strip()
        if len(cand) > limit and out:
            break
        out = cand
    if len(out) <= limit + 25:
        return out
    cut = out[:limit]
    return (cut.rsplit(",", 1)[0] if "," in cut else cut.rsplit(" ", 1)[0]).rstrip(" ,;:") + "."


def crowded(slug: str, m: int, note: str) -> bool:
    if CROWD_NOTE.search(note) and not QUIET_NOTE.search(note):
        return True
    if QUIET_NOTE.search(note):
        return False
    return m in ((((data().get("crowd") or {}).get(slug)) or {}).get("peak_months") or [])


def scene(slug: str, m: int) -> dict | None:
    """What a month's clip must show, built only from that month's note. None when the note names
    nothing a camera can see (then the month cannot be shown honestly)."""
    note = month_note(slug, m)
    looks, motion, sound = [], "", ""
    for pat, look, mo, so in CUES:
        if re.search(pat, note, re.I):
            looks.append(look)
            motion = motion or mo
            sound = sound or so
    if not looks:
        return None
    busy = crowded(slug, m, note)
    looks.append("busy, with crowds of small distant figures" if busy else "almost empty, no one in sight")
    return {"month": m, "note": note, "looks": looks[:4], "motion": motion or "Clouds drift slowly.",
            "sound": sound or "light wind", "crowd": busy}


def two_sb(slug: str) -> str:
    return f"{slug}__two_months"


def pick_two(slug: str, today: date) -> tuple[dict, dict]:
    """(good scene, skip scene): the best of the next three months and the lowest-scoring month at
    least three months away, both with a note a camera can show."""
    sc, labels = scores(slug)
    good, _ = next_best(slug, today)
    a = scene(slug, good)
    if not a:
        raise Refuse(f"{MONTHS[good]}'s note names nothing a camera can show")
    bad = sorted((m for m in range(1, 13) if sc[m - 1] <= 4 and min((m - good) % 12, (good - m) % 12) >= 3),
                 key=lambda m: (sc[m - 1], labels[m - 1] != "skip"))
    for m in bad:
        b = scene(slug, m)
        if b:
            return a, b
    raise Refuse("no skip month whose note a camera can show")


def facts_two_months(slug: str, today: date) -> dict:
    sb = two_sb(slug)
    rows = {r.get("role"): r for r in _load(QUEUE, []) if r.get("storyboard") == sb}
    clips = [CLIPS / f"{sb}__s{i}.mp4" for i in (1, 2)]
    if not all(c.exists() for c in clips) or not {"s1", "s2"} <= set(rows):
        raise Refuse("two_months clips not generated yet")
    good, bad = int(rows["s1"]["month"]), int(rows["s2"]["month"])
    # The reel says "go in <good>"; posted after that month has passed, it would point backwards.
    if (good - today.month) % 12 > 3:
        raise Refuse(f"{MONTHS[good]} is no longer in the next three months")
    sc, labels = scores(slug)
    verdict = lambda m: (labels[m - 1] or ("go" if sc[m - 1] >= 8 else "skip" if sc[m - 1] <= 4 else "wait"))
    ra, rb = reason_line(month_note(slug, good)), reason_line(month_note(slug, bad))
    if not ra or not rb:
        raise Refuse("a month has no note to give the reason")
    return {"slug": slug, "name": name(slug), "good": good, "bad": bad, "good_score": sc[good - 1],
            "bad_score": sc[bad - 1], "good_verdict": verdict(good), "bad_verdict": verdict(bad),
            "good_note": ra, "bad_note": rb, "clips": clips,
            "screen_text": [f"{MONTHS[good]} {sc[good - 1]}/10 {ra}", f"{MONTHS[bad]} {sc[bad - 1]}/10 {rb}"]}


def tiny_sb(slug: str) -> str:
    return f"{slug}__tiny_world"


def facts_tiny_world(slug: str, today: date) -> dict:
    clips = [CLIPS / f"{tiny_sb(slug)}__s{i}.mp4" for i in (1, 2)]
    if not all(c.exists() for c in clips):
        raise Refuse("tiny_world clips not generated yet")
    best, best_score = next_best(slug, today)
    g = (data().get("geo") or {}).get(slug) or {}
    lines = [f"Go in <em>{MONTHS[best]}</em>: {best_score}/10"]
    if (g.get("elevation_m") or 0) >= 300:
        lines.append(f"<em>{int(g['elevation_m']):,} m</em> up")
    d = _dist(g.get("nearest_railhead"))
    if d:
        lines.append(f"<em>{d[1]} km</em> from the nearest train")
    return {"slug": slug, "name": name(slug), "facts": lines, "clips": clips,
            "best": MONTHS[best], "best_score": best_score,
            "screen_text": [l.replace("<em>", "").replace("</em>", "") for l in lines]}


FACTS = {"map_reveal": facts_map_reveal, "two_months": facts_two_months, "tiny_world": facts_tiny_world}


# ─── rendering ────────────────────────────────────────────────────────────
GUIDE_THEMES = ("guide_theme_a.mp3", "guide_theme_d.mp3", "guide_theme_e.mp3", "guide_theme_e.mp3")  # E twice: founder pick 10-04


def pick_music(fmt: str, slug: str) -> Path | None:
    """A house theme with a steady beat (founder 2026-10-15: "I could not hear any music" on the
    two_months cut, which had drawn a near-silent ambient track). Stable per place + format."""
    import zlib
    names = [n for n in GUIDE_THEMES if (HERE / "assets/music_nakshiq" / n).exists()]
    return (HERE / "assets/music_nakshiq" / names[zlib.crc32(f"{slug}:{fmt}".encode()) % len(names)]) if names else None


def _project(slug: str, fmt: str, dur: float) -> tuple[Path, str]:
    sys.path.insert(0, str(HERE))
    music = pick_music(fmt, slug)
    if not music:
        raise Refuse("no music bed on disk")
    w = WORK / f"{slug}__{fmt}"
    if w.exists():
        shutil.rmtree(w)
    (w / "assets").mkdir(parents=True)
    for fn in ("package.json", "hyperframes.json"):
        shutil.copy(PROJECT / fn, w / fn)
    shutil.copy(PROJECT / "gsap.min.js", w / "assets" / "gsap.min.js")   # no CDN (28 Sep DNS outage)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(music), "-t", str(dur),
                    "-af", f"afade=t=in:d=0.4,afade=t=out:st={dur - 1.5}:d=1.5,loudnorm=I=-14:TP=-1.5:LRA=11",
                    "-c:a", "aac", "-b:a", "192k", str(w / "assets" / "music.m4a")], check=True)
    return w, music.stem


def _photo(src: Path, dest: Path) -> None:
    """Normalise to a 1080-wide JPEG (Commons originals can be huge; webp heroes need converting)."""
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-vf", "scale=1600:-2", "-q:v", "3", str(dest)],
                   check=True)


def _fill(tpl: str, rep: dict) -> str:
    s = (TPL / tpl).read_text()
    for k, v in rep.items():
        s = s.replace("{{" + k + "}}", str(v))
    left = re.findall(r"\{\{(\w+)\}\}", s)
    if left:
        raise Refuse(f"template placeholder left unfilled: {left[:3]}")
    return s


def _map_path() -> str:
    s = MAP_SVG.read_text()
    m = re.search(r"<path[^>]*/>", s)
    if not m:
        raise Refuse("india-outline.svg has no path")
    return m.group(0)


def _project_xy(lat: float, lng: float) -> tuple[float, float]:
    # Same projection as apps/web/src/components/landing-cinema/act-4-atlas.tsx (viewBox 1000x1100).
    x = 20 + ((lng - 68) / (97 - 68)) * (1000 - 40)
    y = 20 + ((37 - lat) / (37 - 6)) * (1100 - 40)
    return round(x, 1), round(y, 1)


def _html(fmt: str, f: dict, follow: str, music: str, w: Path) -> str:
    snap = (data().get("generated_at") or "")[:10]
    dur = DUR[fmt]
    if fmt == "map_reveal":
        _photo(f["photo"], w / "assets" / "photo.jpg")
        px, py = _project_xy(f["lat"], f["lng"])
        zoom = 3.2
        n = len(f["facts"])
        return _fill("map_reveal.html", {
            "NAME": f["name"], "SNAPSHOT": snap, "MUSIC": music, "DUR": dur, "END_DUR": round(dur - 12.6, 2),
            "NAME_PX": _name_px(f["name"]), "STATE": f["state"], "FACTS": "\n".join(f"          <div>{x}</div>" for x in f["facts"]),
            "FACTS_TOP": 1010 + int(_name_px(f["name"]) * 0.92) + 30, "CARD_H": 140 + int(_name_px(f["name"]) * 0.92) + 60 + n * 82,
            "BEST": f["best"], "BEST_SCORE": f["best_score"], "MONTH_PX": int(min(330, 880 / (0.40 * len(f["best"])))),
            "MAP_PATH": _map_path(), "PX": px, "PY": py, "ZOOM": zoom,
            "TX": round(540 - (40 + px), 1), "TY": round(900 - (470 + py), 1),
            "FOLLOW": follow, "CREDIT": f.get("credit") or ""})
    if fmt == "two_months":
        # 8 s Veo clips slowed to 10 s (setpts) so both play for the whole split screen; the skip
        # month's own sound (rain, wind) is kept as an ambience bed under the music.
        for i, c in enumerate(f["clips"], 1):
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(c), "-an", "-vf", "setpts=1.25*PTS,fps=30",
                            "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", str(w / "assets" / f"v{i}.mp4")], check=True)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(f["clips"][1]), "-vn", "-af",
                        "atempo=0.8,atrim=0:5.6,afade=t=in:d=0.6,afade=t=out:st=4.8:d=0.8,volume=0.9",
                        "-c:a", "aac", "-b:a", "160k", str(w / "assets" / "amb.m4a")], check=True)
        cls = lambda v: v if v in ("go", "wait", "skip") else "wait"
        px = _name_px(f["name"])
        return _fill("two_months.html", {
            "NAME": f["name"], "SNAPSHOT": snap, "MUSIC": music, "DUR": dur, "NAME_PX": px,
            "LINE_TOP": 620 + int(px * 0.92) + 30,
            "HOOK": "Same place. <em>Two very different trips.</em>",
            "A_MONTH": MONTHS[f["good"]], "A_SCORE": f["good_score"], "A_VERDICT": f["good_verdict"].upper(),
            "A_CLASS": cls(f["good_verdict"]), "A_NOTE": f["good_note"],
            "B_MONTH": MONTHS[f["bad"]], "B_SCORE": f["bad_score"], "B_VERDICT": f["bad_verdict"].upper(),
            "B_CLASS": cls(f["bad_verdict"]), "B_NOTE": f["bad_note"],
            "END_LINE": f"Go in <em>{MONTHS[f['good']]}</em>.<br>Not in {MONTHS[f['bad']]}.",
            "FOLLOW": follow, "CREDIT": "AI footage of the real place, made from our photo"})
    if fmt == "tiny_world":
        for i, c in enumerate(f["clips"], 1):
            shutil.copy(c, w / "assets" / f"bg{i}.mp4")
        return _fill("tiny_world.html", {
            "NAME": f["name"], "SNAPSHOT": snap, "MUSIC": music, "DUR": dur, "V2_DUR": round(dur - 7.5, 2),
            "NAME_PX": _name_px(f["name"], 260), "SUB": "in miniature",
            "FACTS": "\n".join(f"        <div>{x}</div>" for x in f["facts"]), "FOLLOW": follow})
    raise Refuse(f"unknown format {fmt}")


def render(fmt: str, slug: str, out: Path, follow: str = "follow @nakshiq", today: date | None = None) -> dict:
    today = today or date.today()
    f = FACTS[fmt](slug, today)
    if fmt in ("tiny_world", "two_months"):
        why = place_only_flags(tiny_sb(slug) if fmt == "tiny_world" else two_sb(slug))
        if why:
            raise Refuse(f"people in a place-only clip: {why}")
    w, music = _project(slug, fmt, DUR[fmt])
    (w / "index.html").write_text(_html(fmt, f, follow, music, w))
    out.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(["npx", "--yes", HF, "render", str(w), "-o", str(out), "--quiet", "--no-best-effort"],
                       capture_output=True, text=True)
    if r.returncode != 0 or not out.exists():
        txt = r.stderr or r.stdout or ""
        errs = [l for l in txt.splitlines() if any(k in l.lower() for k in ("error", "fail", "timeout", "net::"))]
        raise RuntimeError("hyperframes render failed: " + (" | ".join(errs)[:500] or txt[-400:]))
    return f


def place_only_flags(storyboard: str) -> str:
    """clip_qa with a cast of 0: any lasting figure in a place-only clip is a flag. Fails closed."""
    import clip_qa
    if not clip_qa.PY.exists():
        return "clip people-check could not run (no .venv-qa)"
    r = subprocess.run([str(clip_qa.PY), str(HERE / "clip_qa.py"), storyboard], capture_output=True, text=True, timeout=900)
    flags = [l[5:].split("  ")[0] for l in r.stdout.splitlines() if l.startswith("FLAG ")]
    if r.returncode not in (0, 1) or (r.returncode == 1 and not flags):
        return f"clip people-check failed: {(r.stderr or r.stdout)[-200:]}"
    return "; ".join(flags)


def candidates(fmt: str, today: date | None = None, limit: int | None = None) -> list[str]:
    """Places that can fill the format, next month and quiet first. Only cheap checks here (no
    photo downloads); a place whose photos are missing refuses at render time instead."""
    today = today or date.today()
    out = []
    for slug in sorted((data().get("months") or {})):
        try:
            best, sc = next_best(slug, today)
        except Refuse:
            continue
        if fmt == "map_reveal" and not ((data().get("geo") or {}).get(slug) or {}).get("lat"):
            continue
        if fmt == "tiny_world" and not (CLIPS / f"{tiny_sb(slug)}__s2.mp4").exists():
            continue
        if fmt == "two_months" and not (CLIPS / f"{two_sb(slug)}__s2.mp4").exists():
            continue
        quiet = best in (((data().get("crowd") or {}).get(slug) or {}).get("quiet_months") or [])
        out.append(((best - today.month) % 12, not quiet, -sc, slug))
    return [s for *_, s in sorted(out)][:limit]


# ─── publish hook ─────────────────────────────────────────────────────────
def make_row(fmt: str, plat: str, surf: dict, led: dict, dry: bool, log=print) -> dict | None:
    """Render today's place-format reel for one surface and add it to the ledger (scenario_daily
    calls this when the rotation says so). The FIRST reel of each format lands as "review": the
    founder watches one of every new format before any posts unseen."""
    cutoff = (datetime.now(timezone.utc) - timedelta(days=REPEAT_DAYS)).isoformat()
    recent = {v.get("slug") for v in led.values() if v.get("kind") == fmt and (v.get("rendered_at") or "") >= cutoff}
    # Both surfaces show the same place on the same day: a slug cut today for the other surface
    # goes first (re-rendered, because the end card carries this surface's own handle).
    today_iso = datetime.now(timezone.utc).date().isoformat()
    twin = [v["slug"] for v in led.values() if v.get("kind") == fmt and v.get("platform") != plat
            and (v.get("rendered_at") or "").startswith(today_iso)]
    # A cut the founder released from review (status flipped to "ready") posts before anything new.
    released = [v for v in led.values() if v.get("kind") == fmt and v.get("platform") == plat
                and v.get("status") == "ready" and Path(v.get("file", "")).exists()]
    if released:
        return sorted(released, key=lambda v: v["rendered_at"])[0]
    first = not any(v.get("kind") == fmt and v.get("status") in ("published", "unconfirmed") for v in led.values())
    for slug in twin[:1] + candidates(fmt):
        if slug in recent and slug not in twin:
            continue
        out = VEO / "reels" / f"{slug}__{fmt}__{plat}.mp4"
        log(f"{plat}: rotation slot {fmt} — trying {slug}")
        if dry:
            return None
        try:
            f = render(fmt, slug, out, follow=surf["cta"])
        except Refuse as e:
            log(f"  {fmt} {slug} refused: {e}")
            continue
        except Exception as e:  # noqa: BLE001
            log(f"  {fmt} {slug} failed: {str(e)[:200]}")
            continue
        row = {"storyboard": f"{slug}__{fmt}", "slug": slug, "format": fmt, "kind": fmt, "angle": fmt,
               "lang": "en", "platform": plat, "file": str(out), "six_beat": False, "pipeline": "place",
               "status": "review" if first else "ready", "rendered_at": datetime.now(timezone.utc).isoformat(),
               "name": f["name"], "screen_text": f.get("screen_text") or [],
               "commons": [{k: c.get(k) for k in ("title", "author", "licence", "page", "share_alike")} for c in f.get("commons") or []]}
        for k in ("best", "best_score", "good", "bad", "good_score", "bad_score"):
            if k in f:
                row[k] = f[k]
        if f.get("cost_basis"):
            row["cost_basis"] = f["cost_basis"]
        if first:
            row["held"] = f"first {fmt} reel: founder watches one of every new format before any posts"
        led[f"{slug}__{fmt}__{plat}"] = row
        return row
    return None


def caption(row: dict) -> tuple[str, str]:
    import guide_reel as GR
    nm, slug = row["name"], row["slug"]
    url = f"https://www.nakshiq.com/en/destination/{slug}"
    tag = slug.replace("-", "")
    credits = GR.caption_credits(row.get("commons") or [])
    if row["kind"] == "map_reveal":
        cap = (f"Where is {nm}, really? How high, how far from the train and the airport, and the next "
               f"good month ({row['best']}, {row['best_score']}/10).\n\nSend this to whoever's coming with you.\n\n"
               f"{nm}, month by month: {url}\n\nScores and distances are NakshIQ's real data.{credits}"
               f"\n\n#{tag} #indiatravel #NakshIQ")
        return cap, f"Where is {nm}, really? | NakshIQ"
    if row["kind"] == "two_months":
        g, b = MONTHS[row["good"]], MONTHS[row["bad"]]
        cap = (f"{nm} in {g}: {row['good_score']}/10. In {b}: {row['bad_score']}/10. Same place, two very different trips.\n\n"
               f"Send this to whoever's planning it with you.\n\n{nm}, every month: {url}\n\n"
               f"Scores and reasons are NakshIQ's real data. The footage is AI-generated from our photo of the real place, "
               f"showing what each month's verdict describes."
               f"\n\n#{tag} #indiatravel #NakshIQ")
        return cap, f"{nm}: {g} or {b}? | NakshIQ"
    if row["kind"] == "tiny_world":
        cap = (f"{nm}, in miniature. Go in {row['best']}: {row['best_score']}/10.\n\n"
               f"Send this to whoever you'd go with.\n\n{nm}, month by month: {url}\n\n"
               f"The miniature is AI-generated from a photo of the real place. Scores are NakshIQ's real data."
               f"\n\n#{tag} #indiatravel #NakshIQ")
        return cap, f"{nm}, in miniature | NakshIQ"
    raise ValueError(row["kind"])


# ─── tiny_world generation queue ──────────────────────────────────────────
def _cowork_window() -> bool:
    """The Cowork run generates off the task file 15:30-20:30 local (moved from 10:00 on
    2026-10-08); the 21:00 ingest collects it. Never touch the queue in between."""
    now = datetime.now()
    return (15, 30) <= (now.hour, now.minute) < (21, 0)


KF = ("Turn this photograph into a handcrafted miniature diorama of exactly this place, seen from slightly above: "
      "the same layout, the same buildings, hills, trees and water, rebuilt at tiny scale with model trees, tiny "
      "painted buildings and textured paper hills, soft tilt-shift blur along the top and bottom edges, warm natural "
      "light. Vertical 9:16. An empty miniature: no people, no figurines, no vehicles, no text, no signs.")
KF2 = ("A closer, lower view of one corner of this same miniature diorama: the tiny buildings and model trees in "
       "sharp focus, the rest falling into tilt-shift blur, same warm light. Vertical 9:16. No people, no figurines, "
       "no text, no signs.")
SHOT = ("Slow push-in over the miniature diorama; tiny cotton-wool clouds drift and the model trees sway slightly, "
        "the camera glides smoothly forward. Ambient sound: soft wind and distant birdsong. No people, no text.")
SHOT2 = ("Slow sideways tracking move across the miniature diorama, shallow tilt-shift focus sliding over the tiny "
         "buildings; warm light flickers softly. Ambient sound: gentle breeze and a faint river. No people, no text.")


def queue_tiny(slug: str) -> int:
    if _cowork_window():
        raise SystemExit("15:30-21:00 local: Cowork is generating off the task file; not touching the queue")
    sb = tiny_sb(slug)
    photo = _photo_ref(sb, slug)
    rows = _load(QUEUE, [])
    have = {r["clip"] for r in rows}
    base = {"slug": slug, "format": sb, "pipeline": "v3", "storyboard": sb, "take": 1}
    want = [
        dict(base, clip=photo, kind="ref", role="photo", status="live", seconds=0, credits=0,
             prompt="Real photograph of the place (site hero), saved at " + str(CLIPS / photo)),
        dict(base, clip=f"{sb}__kf1.jpg", kind="keyframe", role="kf1", status="pending", seconds=0, credits=0,
             prompt=KF, refs=[photo]),
        dict(base, clip=f"{sb}__kf2.jpg", kind="keyframe", role="kf2", status="pending", seconds=0, credits=0,
             prompt=KF2, refs=[f"{sb}__kf1.jpg"]),
        dict(base, clip=f"{sb}__s1.mp4", kind="shot", mode="frames", role="s1", status="pending", seconds=8,
             credits=10, prompt=SHOT, start_frame=f"{sb}__kf1.jpg", end_frame=None),
        dict(base, clip=f"{sb}__s2.mp4", kind="shot", mode="frames", role="s2", status="pending", seconds=8,
             credits=10, prompt=SHOT2, start_frame=f"{sb}__kf2.jpg", end_frame=None),
    ]
    new = [r for r in want if r["clip"] not in have]
    if new:
        tmp = QUEUE.with_suffix(".tmp")
        tmp.write_text(json.dumps(rows + new, indent=2, ensure_ascii=False))
        tmp.replace(QUEUE)
    return len(new)


def _photo_ref(sb: str, slug: str) -> str:
    h = hero(slug)
    if not h:
        raise Refuse("no site hero photo to build from")
    photo = f"{sb}__photo.jpg"
    CLIPS.mkdir(parents=True, exist_ok=True)
    if not (CLIPS / photo).exists():
        _photo(h, CLIPS / photo)
    return photo


def queue_two(slug: str, today: date) -> int:
    """Two stills of the real place (from its site photo) in the good month and the skip month,
    exactly as each month's note describes, then one Veo clip from each (20 credits)."""
    if _cowork_window():
        raise SystemExit("15:30-21:00 local: Cowork is generating off the task file; not touching the queue")
    a, b = pick_two(slug, today)
    sb = two_sb(slug)
    photo = _photo_ref(sb, slug)
    g = (data().get("geo") or {}).get(slug) or {}
    where = f"{name(slug)}, {g.get('state_name')}" if g.get("state_name") else name(slug)
    def still(sc: dict) -> str:
        return (f"Using this photograph of {where}, India, show exactly the same place in {MONTHS[sc['month']]}: "
                + "; ".join(sc["looks"]) + ". Keep the same viewpoint and the same buildings, hills and landmarks. "
                "Photorealistic, natural colour, vertical 9:16. No text, no signs, no watermark."
                + ("" if sc["crowd"] else " No people."))
    def shot(sc: dict) -> str:
        return (f"The camera holds almost still with a very slow push-in. {sc['motion']} "
                f"Ambient sound: {sc['sound']}." + ("" if sc["crowd"] else " No people.") + " No text.")
    rows = _load(QUEUE, [])
    have = {r["clip"] for r in rows}
    base = {"slug": slug, "format": sb, "pipeline": "v3", "storyboard": sb, "take": 1}
    want = [dict(base, clip=photo, kind="ref", role="photo", status="live", seconds=0, credits=0,
                 prompt="Real photograph of the place (site hero), saved at " + str(CLIPS / photo))]
    for i, sc in ((1, a), (2, b)):
        want += [dict(base, clip=f"{sb}__kf{i}.jpg", kind="keyframe", role=f"kf{i}", status="pending", seconds=0,
                      credits=0, prompt=still(sc), refs=[photo], month=sc["month"]),
                 dict(base, clip=f"{sb}__s{i}.mp4", kind="shot", mode="frames", role=f"s{i}", status="pending",
                      seconds=8, credits=10, prompt=shot(sc), start_frame=f"{sb}__kf{i}.jpg", end_frame=None,
                      month=sc["month"], crowd=sc["crowd"])]
    new = [r for r in want if r["clip"] not in have]
    if new:
        tmp = QUEUE.with_suffix(".tmp")
        tmp.write_text(json.dumps(rows + new, indent=2, ensure_ascii=False))
        tmp.replace(QUEUE)
    return len(new)


def prepare(today: date | None = None) -> int:
    """Keep ONE tiny_world and ONE two_months storyboard ready or queued ahead of their weekly
    slots (20 credits each a week). Runs from run-veo.sh after the ingest; off with the rotation."""
    today = today or date.today()
    if not rotation_start():
        print("[place_reels] rotation off (no ROTATION_START): nothing to prepare")
        return 0
    led = _load(LEDGER, {})
    rows = _load(QUEUE, [])
    for fmt, suffix, q in (("tiny_world", "__tiny_world", lambda s: queue_tiny(s)),
                           ("two_months", "__two_months", lambda s: queue_two(s, today))):
        used = {v.get("slug") for v in led.values() if v.get("kind") == fmt}
        waiting = {r["slug"] for r in rows if r.get("storyboard", "").endswith(suffix) and r.get("status") in ("pending", "parked")}
        ready = []
        for s in candidates(fmt, today):
            if s in used:
                continue
            try:
                FACTS[fmt](s, today)
                ready.append(s)
            except Refuse:
                pass
        if waiting or ready:
            print(f"[place_reels] {fmt}: {len(ready)} ready, {len(waiting)} in the queue — nothing to add")
            continue
        for slug in candidates("map_reveal", today):   # any place with a good coming month
            if slug in used or not hero(slug):
                continue
            try:
                n = q(slug)
            except Refuse as e:
                continue
            print(f"[place_reels] {fmt}: queued {n} row(s) for {slug}")
            break
        else:
            print(f"[place_reels] {fmt}: no place qualifies")
    return 0


# ─── weekly read-out ──────────────────────────────────────────────────────
def readout(days: int = 7) -> dict:
    """Median IG reach and YouTube views per format for posts published in the last `days`
    (Outstand analytics via engagement_pull, the same source as the rest of the post log), plus
    the all-time table since ROTATION_START. Writes format_reach.json; its "leader" (best median
    IG reach among the place formats + data card, at least 2 posts) feeds the next wildcard."""
    import os
    import statistics as st
    import engagement_pull as EP
    key = os.environ.get("OUTSTAND_API_KEY")
    if not key:
        raise SystemExit("OUTSTAND_API_KEY missing (run via node --env-file=apps/web/.env.local)")
    led = _load(LEDGER, {})
    start = rotation_start()
    since_all = (start.isoformat() if start else "2026-10-19")
    since_week = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
    def fmt_of(v):
        k = v.get("kind")
        return k if k in PLACE_FORMATS + ("data_card",) else ("cast" if v.get("pipeline") == "v3" and k not in ("guide",) else None)
    rows = [v for v in led.values() if v.get("status") in ("published", "unconfirmed") and v.get("post_id")
            and (v.get("published_at") or "") >= since_all and fmt_of(v)]
    table: dict = {}
    for v in rows:
        a = EP.fetch_analytics(key, v["post_id"]) or {}
        acct = (a.get("metrics_by_account") or [{}])[0]
        m = EP.normalize_metrics(acct.get("metrics") or {})
        metric = "reach" if v.get("platform") == "instagram" else "views"
        t = table.setdefault(fmt_of(v), {"instagram_reach": [], "youtube_views": [], "week_instagram_reach": [], "week_youtube_views": []})
        val = int(m.get(metric) or 0)
        t["instagram_reach" if metric == "reach" else "youtube_views"].append(val)
        if (v.get("published_at") or "") >= since_week:
            t["week_instagram_reach" if metric == "reach" else "week_youtube_views"].append(val)
    out = {"generated_at": datetime.now(timezone.utc).isoformat(), "since": since_all,
           "baseline": {"story_reels_ig_median_reach": 10.5, "old_data_reels_ig_median_reach": 102},
           "formats": {f: {k: {"n": len(x), "median": (st.median(x) if x else None)} for k, x in t.items()}
                       for f, t in table.items()}}
    pool = {f: d["instagram_reach"]["median"] for f, d in out["formats"].items()
            if f in PLACE_FORMATS + ("data_card",) and d["instagram_reach"]["n"] >= 2}
    out["leader"] = max(pool, key=pool.get) if pool else None
    REACH.write_text(json.dumps(out, indent=1))
    return out


# ─── CLI ──────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    sys.path.insert(0, str(HERE))
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=("render", "list", "prepare", "slots", "readout"))
    ap.add_argument("--fmt", choices=PLACE_FORMATS)
    ap.add_argument("--slug")
    ap.add_argument("--out")
    ap.add_argument("--days", type=int, default=28)
    ap.add_argument("--start", help="pretend ROTATION_START is this date (slots only)")
    a = ap.parse_args()
    if a.cmd == "list":
        print("\n".join(candidates(a.fmt, limit=30)))
    elif a.cmd == "prepare":
        raise SystemExit(prepare())
    elif a.cmd == "readout":
        print(json.dumps(readout(), indent=1))
    elif a.cmd == "slots":
        if a.start:
            rotation_start = lambda: date.fromisoformat(a.start) - timedelta(days=date.fromisoformat(a.start).weekday())  # noqa: E731
        d0 = rotation_start() or date.today()
        for i in range(a.days):
            d = d0 + timedelta(days=i)
            print(d.isoformat(), d.strftime("%a"), slot(d))
    else:
        out = Path(a.out) if a.out else VEO / "reels" / "_preview" / f"{a.slug}__{a.fmt}.mp4"
        try:
            f = render(a.fmt, a.slug, out)
        except Refuse as e:
            raise SystemExit(f"[place_reels] {a.fmt} {a.slug} refused: {e}")
        print(f"[place_reels] wrote {out}")
        print(json.dumps({k: (str(v) if isinstance(v, Path) else v) for k, v in f.items()
                          if k not in ("commons", "photos", "clips")}, ensure_ascii=False, indent=1)[:1500])
