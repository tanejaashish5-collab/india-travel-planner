#!/usr/bin/env python3
"""guide_reel.py — one destination, one month, one reel: a carousel of our data.

Founder 2026-10-03: "we cover one destination ... each image would actually
represent one of the data points ... restaurants are like a carousel, but in a
reel format ... 3 seconds each, or 4.5 seconds ... 45, 60 seconds ... every
month we would rotate." Posted as a SECOND daily reel (13:05 IST), separate
from the 20:05 IST story reel.

    python3 guide_reel.py slides manali 10      # print the slides (no writes)
    python3 guide_reel.py daily                 # queue stills / render what is complete
    python3 guide_reel.py render manali 10      # cut one now

Each slide = one fact from the destination's fact pack, gated: a slide whose
fields are missing or contradict another field is DROPPED, never guessed.
Images are free Nano Banana stills made by the Cowork run (kind keyframe, 0
credits); the hook uses the destination's own hero photo when we have one.
Slide changes land on bar downbeats of a house track (2 bars a slide), each
boundary snapped to the real kick.
"""
from __future__ import annotations

import json, os, re, shutil, subprocess, sys, textwrap
from datetime import datetime, timezone, timedelta
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent
VEO = Path.home() / "Automation" / "nakshiq-veo"
QUEUE = VEO / "veo_queue.json"
CLIPS = VEO / "clips"
FACTS = VEO / "data" / "facts"
LEDGER = VEO / "data" / "reels.json"
OUTDIR = VEO / "reels"
ROT = HERE / "guide_rotation.json"
HERO = REPO / "apps/web/public/images/destinations"
FONTS = HERE / "assets/fonts"
LOGO = REPO / "apps/web/public/icon-512.png"
MUSIC_DIR = HERE / "assets/music_trendy"
W, H, FPS = 1080, 1920, 30
END = 2.4
BUFFER = 3          # guide storyboards kept in the pipeline (queued or cut, not yet posted)
REPEAT_DAYS = 120   # a destination is not re-guided inside this window
MAX_MISSING = 2     # slides that may fall back to the hero image if their still never came
MONTHS = ["", "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]
PLATFORMS = ("instagram", "youtube")
STYLE = ("Photorealistic travel photograph, vertical 9:16, natural light, rich but natural colour, "
         "35mm lens. No text, no signs, no shop names, no logos, no watermark. Any people are small "
         "in the frame or seen from behind; no faces in close-up and nobody looks at the camera.")


# ─── month + rotation ────────────────────────────────────────────────────
def target_month(now: datetime | None = None) -> int:
    """The month people are planning: this month until the 24th, then the next."""
    now = now or datetime.now(timezone(timedelta(hours=5, minutes=30)))
    return now.month if now.day < 25 else now.month % 12 + 1


def sb_id(slug: str, month: int) -> str:
    return f"{slug}__guide_m{month:02d}"


# ─── text helpers ────────────────────────────────────────────────────────
def _clean(s: str) -> str:
    s = (s or "").replace("—", ",").replace("–", "-").replace("  ", " ")
    return re.sub(r"\s+,", ",", s).strip(" ,.")


def _head(item: str) -> str:
    """'Photographers — the best light ...' -> 'Photographers'."""
    return _clean(re.split(r"\s[—–-]\s", item or "", maxsplit=1)[0])


def _tail(item: str) -> str:
    parts = re.split(r"\s[—–-]\s", item or "", maxsplit=1)
    return _clean(parts[1]) if len(parts) > 1 else ""


def _short(s: str, n: int) -> str:
    s = _clean(s)
    if len(s) <= n:
        return s
    cut = s[:n]
    for sep in (". ", ", ", " "):
        i = cut.rfind(sep)
        if i > n * 0.55:
            return cut[:i].rstrip(" ,.")
    return cut.rstrip(" ,.")


def _cap(s: str) -> str:
    s = _clean(s)
    return s[:1].upper() + s[1:] if s else s


def _season_line(why: str) -> str:
    """'peak season with crisp days, minimal rain, and golden poplar colours create
    ideal trekking ...' -> 'Crisp days, minimal rain, and golden poplar colours'."""
    s = re.sub(r"^(it'?s |this is )?(the )?(peak|best|ideal|prime)( season| month)?( with| means| combines|,)?\s*", "", _clean(why), flags=re.I)
    s = re.split(r"\s(create|creates|make|makes|mean|means|deliver|delivers|give|gives|so|but|for|and ideal)\s", s, maxsplit=1)[0]
    return _cap(_short(s, 70))


def _inr(v) -> str:
    return "₹" + f"{int(round(float(v))):,}"


def _range_head(s: str):
    m = re.match(r"\[(\d+),(\d+)\)", str(s or ""))
    return (int(m.group(1)), int(m.group(2)) - 1) if m else None


# ─── slides ──────────────────────────────────────────────────────────────
def load_pack(slug: str) -> dict | None:
    p = FACTS / f"{slug}.json"
    return json.loads(p.read_text()) if p.exists() else None


# Every slide shows a DIFFERENT kind of scene (founder 2026-10-03: "a couple sitting
# on the desk can't be sitting on the desk with a different angle ... it shouldn't
# be repeated"). People are rare: at most one small figure, never a returning cast.
SCENES = {
    "hook": "a wide landscape photograph, no people",
    "time": "the landmark itself at that hour, no crowd, at most one tiny distant figure",
    "gem": "the place itself as a landscape or architecture photograph, no people",
    "eat": "an overhead close-up of the single dish on a plain table, no people, no hands",
    "swap": "a wide valley or village landscape photograph, no people",
    "skip": "an empty atmospheric detail of the place (weather, road, light), no people",
    "cost": "an empty, simple guesthouse room interior with a window view, no people",
    "kids": "one small child seen from far behind on an open path, tiny in the frame",
}
LOCAL_FOOD = ("himachali", "kashmiri", "local", "pahadi", "garhwali", "kumaoni", "rajasthani", "bengali",
              "street", "dhaba", "thali", "south-indian", "andhra", "chettinad", "punjabi", "awadhi", "tibetan")


def _fit(s: str, n: int) -> str:
    """Whole sentences while they fit; else the first clause that fits; never a
    sentence chopped mid-way (10-03: "At 4:30AM", "The 200-acre park next door has")."""
    s = _clean(s)
    if len(s) <= n:
        return s
    parts = re.split(r"(?<=[.!?;])\s+", s)
    acc = ""
    for ptxt in parts:
        nxt = f"{acc} {ptxt}".strip()
        if len(nxt) > n:
            break
        acc = nxt
    if acc:
        return acc.rstrip(";").rstrip()
    first = parts[0]
    cut = first[:n]
    i = max(cut.rfind(", "), cut.rfind(": "), cut.rfind(" - "))
    return (cut[:i] if i > n * 0.4 else _short(first, n)).rstrip(" ,:;")


def _first_sentence(s: str, n: int = 110) -> str:
    s = _clean(s)
    m = re.match(r"(.+?[.!?])(\s|$)", s)
    return _short(m.group(1) if m else s, n)


def slides(pack: dict, month: int) -> list[dict]:
    """[{kind, eyebrow, title, body, prompt, place}] — only facts the pack proves,
    ordered around what a typical reel about the place does not say: our honest
    verdict, the hidden spots and why people miss them, the insider timing, the
    local dish with its tip, the quieter swap, who should skip it, the real cost."""
    d = pack["destination"]
    name = d["name"]
    mon = MONTHS[month]
    state = (d.get("state_id") or "").replace("-", " ").title()
    place = ", ".join(x for x in [d.get("region"), state] if x)
    mrow = next((m for m in pack.get("months") or [] if m.get("month") == month), None)
    if not mrow or mrow.get("score") != 5:
        raise SystemExit(f"{name}: {mon} is not a 10/10 month in the pack")
    out = []

    def add(kind, scene, eyebrow, title, body, subject, place_q=None):
        title, body = _clean(title), _clean(body)
        if not title:
            return
        out.append({"kind": kind, "eyebrow": eyebrow.upper(), "title": title, "body": body,
                    "place": place_q,
                    "prompt": f"{subject} Composition: {SCENES[scene]}. {STYLE}"})

    treks = pack.get("treks") or []
    def contradicts(line: str) -> bool:
        for t in treks:
            key = (t.get("name") or "").replace(" Trek", "").strip()
            if key and key.lower() in line.lower() and month not in (t.get("best_months") or []):
                return True
        return False

    # 1. Hook: our own honest line beats the brochure line when we have one.
    honest = _fit(d.get("why_special") or "", 150)
    verdict_why = _tail(mrow.get("go_or_skip_verdict") or "")
    add("hook", "hook", f"{mon} verdict: 10/10", f"{name} in {mon}. Skip what everyone posts.",
        honest or _cap(_short(verdict_why, 100)),
        f"{name}, {place}, India in {mon}, a view away from the town centre: {_short(verdict_why, 140)}.", (f"{name} {state}", name))

    # 2. Insider timing from the photographer note ("Hadimba at 7am (no tourists...)").
    ph = ((d.get("persona_blocks") or {}).get("photographer") or "")
    m = re.match(r"([A-Z][\w' ]{2,30}? at \d{1,2}(?::\d\d)?\s?(?:am|pm))\s*\(([^)]+)\)", ph)
    if m and not contradicts(ph):
        spot = re.sub(r"\s+at\s+\d.*$", "", m.group(1)).strip()
        add("time", "time", "Go at this hour", m.group(1), _cap(_short(m.group(2), 80)),
            f"{spot} in {name}, {place}, India, early morning, soft light, empty.")

    # 3-5. Hidden gems, with WHY people miss them (the part nobody else has).
    # Never point people at a river swim or a jump (Rishikesh's list has a "pre-dawn
    # swim" at Triveni Ghat while its own kids note says the river is genuinely dangerous).
    risky = re.compile(r"\b(swim|swimming|dip|cliff jump|jumping)\b", re.I)
    gems = [g for g in (pack.get("hidden_gems") or []) if g.get("why_go") and not contradicts(g.get("why_go", ""))
            and not risky.search(f"{g.get('name', '')} {g.get('why_unknown', '')}")]
    gems.sort(key=lambda g: -(g.get("confidence_score") or 0))
    # Three DIFFERENT places: Rishikesh's list has Kunjapuri twice (sunrise, caves).
    STOP = {"temple", "village", "valley", "lake", "trek", "walk", "view", "point", "fort", "sunrise", "sunset",
            "meadow", "falls", "waterfall", "the", "and", "ghat", "cave", "caves", "meditation"}
    picked, seen = [], set()
    for g in gems:
        keys = {w for w in re.findall(r"[a-z]+", g["name"].lower()) if len(w) > 3 and w not in STOP}
        if keys & seen:
            continue
        picked.append(g); seen |= keys
    gems = picked
    for i, g in enumerate(gems[:3]):
        miss = _fit(g.get("why_unknown") or "", 110)
        dist = f"{g['distance_km']} km away" if g.get("distance_km") else ""
        add(f"gem{i + 1}", "gem", "Hidden gem" if i == 0 else "Another one", g["name"],
            " · ".join(x for x in [dist, _cap(miss) if miss else _cap(_short(g["why_go"], 70))] if x),
            f"{g['name']}, near {name}, {place}, India: {_short(g['why_go'], 160)}.", (f"{g['name']} {state}", g["name"]))

    # 6. Eat: local food and the insider tip first, the pizza places last.
    eats = sorted(pack.get("eateries") or [], key=lambda e: (
        -any(k in " ".join(e.get("cuisine") or []).lower() for k in LOCAL_FOOD),
        -bool(e.get("insider_tip")), -bool(e.get("is_legendary"))))
    if eats:
        e = eats[0]
        tip = _fit(e.get("insider_tip") or "", 110)
        pr = _range_head(e.get("price_per_head_inr"))
        body = " · ".join(x for x in [_cap(e.get("signature_dish") or ""), tip or (f"{_inr(pr[0])} to {_inr(pr[1])} a head" if pr else "")] if x)
        add("eat", "eat", "Eat here", f"{e['name']}, {e.get('area') or name}", body,
            f"{_cap(e.get('signature_dish') or 'a local dish')}, as served in {name}, {place}, India.")

    # 7. The quieter swap.
    swaps = ((pack.get("trap_swaps") or {}).get("as_trap") or [])
    if swaps:
        s = swaps[0]
        alt = s["alternative_destination_id"].replace("-", " ").title()
        add("swap", "swap", "Skip the crowd", f"Try {alt} instead",
            " · ".join(x for x in [f"{s['distance_km']} km" if s.get("distance_km") else "", s.get("drive_time") or "",
                                     _cap(_fit(re.split(r"\s[—–-]\s", s.get("why_better") or "")[0], 80))] if x),
            f"{alt}, {state}, India: {_short(s.get('why_better') or '', 140)}. {_short(s.get('vibe_difference') or '', 80)}.",
            (f"{alt} {state}", alt))

    # 8. Who should skip it (honest).
    avoid = [x for x in (mrow.get("who_should_avoid") or []) if not contradicts(x)]
    if avoid:
        add("skip", "skip", "Who should skip it", _head(avoid[0]), _cap(_short(_tail(avoid[0]), 100)),
            f"{name}, {place}, India in {mon}, a detail that shows this: {_short(_tail(avoid[0]), 120)}.")

    # 9. What the month really costs.
    season = next((k for k, v in (pack.get("costs") or {}).items()
                   if any(month in (c.get("months") or []) for c in v.values())), None)
    if season:
        c = pack["costs"][season]
        parts = []
        if c.get("hotel-mid"): parts.append(f"Mid hotel {_inr(c['hotel-mid']['typical_inr'])} a night")
        if c.get("food-per-day"): parts.append(f"food {_inr(c['food-per-day']['typical_inr'])} a day")
        if c.get("transport-taxi-day"): parts.append(f"taxi {_inr(c['transport-taxi-day']['typical_inr'])} a day")
        if parts:
            add("cost", "cost", f"What {mon} really costs", parts[0], ", ".join(parts[1:]).capitalize(),
                f"A simple mid-range guesthouse room in {name}, {place}, India.")

    # 10. Kids, only if there is still room.
    k = pack.get("kids") or {}
    if len(out) < 10 and k.get("rating"):
        add("kids", "kids", "With kids", f"{k['rating']}/5 for families" + (f", ages {k['best_age_group']}" if k.get("best_age_group") else ""),
            _short((k.get("concerns") or [""])[0], 80), f"An open path in {name}, {place}, India in {mon}.")
    return out[:10]


# ─── real photos of named places (Wikimedia Commons) ─────────────────────
# Founder 2026-10-03: "when you say Barot Valley, you need to show a picture of the
# Barot Valley". A named place gets a REAL photo when Commons has one whose TITLE
# names it (a "Lama Dugh" search returned Barot's "Lamba Dug", a different meadow),
# under a licence that allows reuse with credit. Otherwise an AI still is made.
PHOTOS = VEO / "data" / "guide_photos"
LICENCE_RANK = [("cc0", 0), ("public domain", 0), ("pd", 0), ("cc by 4", 1), ("cc by 3", 1), ("cc by 2", 1),
                ("cc by-sa", 2)]
UA = {"User-Agent": "NakshIQ-guide/1.0 (https://www.nakshiq.com)"}


def _lic_rank(lic: str) -> int | None:
    l = (lic or "").lower()
    for k, r in LICENCE_RANK:
        if l.startswith(k) or k in l:
            return r
    return None


REJECT = HERE / "guide_photo_reject.json"   # Commons titles rejected on sight (plaques, crowds, wrong place)


def commons_photo(query: str, must: str, dest: Path, used: set) -> dict | None:
    import urllib.request, urllib.parse, html as H
    words = [w for w in re.findall(r"[a-z]+", must.lower()) if len(w) > 2]
    if not words:
        return None
    u = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({
        "action": "query", "format": "json", "generator": "search", "gsrsearch": f"{query} filetype:bitmap",
        "gsrnamespace": 6, "gsrlimit": 20, "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": 1400})
    try:
        r = json.load(urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30))
    except Exception:
        return None
    cands = []
    for pg in (r.get("query", {}).get("pages") or {}).values():
        title = pg["title"][5:]
        norm = re.sub(r"[^a-z]+", " ", title.lower())
        rejected = json.loads(REJECT.read_text()).get("titles", []) if REJECT.exists() else []
        if not all(re.search(rf"\b{w}", norm) for w in words) or title in used or title in rejected:
            continue
        ii = pg["imageinfo"][0]; m = ii.get("extmetadata", {})
        lic = (m.get("LicenseShortName") or {}).get("value", "")
        rank = _lic_rank(lic)
        if rank is None or min(ii["width"], ii["height"]) < 900:
            continue
        artist = re.sub(r"<[^>]+>", "", H.unescape((m.get("Artist") or {}).get("value", ""))).strip()[:60] or "unknown"
        portrait = ii["height"] >= ii["width"]
        cands.append((rank, not portrait, -ii["width"] * ii["height"], title, ii, lic, artist))
    if not cands:
        return None
    rank, _, _, title, ii, lic, artist = sorted(cands)[0]
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        data = urllib.request.urlopen(urllib.request.Request(ii.get("thumburl") or ii["url"], headers=UA), timeout=60).read()
    except Exception:
        return None
    dest.write_bytes(data)
    used.add(title)
    meta = {"file": str(dest), "title": title, "licence": lic, "author": artist,
            "page": ii.get("descriptionurl"), "share_alike": rank == 2}
    dest.with_suffix(".json").write_text(json.dumps(meta, ensure_ascii=False, indent=1))
    return meta


def photo_path(slug: str, month: int, i: int) -> Path:
    return PHOTOS / sb_id(slug, month) / f"g{i:02d}.jpg"


def fetch_photos(slug: str, month: int, sl: list[dict]) -> int:
    used, got = set(), 0
    for i, s in enumerate(sl, 1):
        if not s.get("place") or (s["kind"] == "hook" and hero(slug)):
            continue
        dest = photo_path(slug, month, i)
        if dest.exists():
            got += 1; continue
        if s["kind"] == "swap":
            # A whole destination: our own site photo of it beats a name-matched Commons
            # file (10-03: "Chandigarh" matched a portrait of two people).
            alt = re.sub(r"[^a-z0-9]+", "-", s["place"][1].lower()).strip("-")
            if hero(alt):
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy(hero(alt), dest)
                got += 1; continue
            continue                       # no site photo: an AI still, never a guessed Commons file
        query, must = s["place"]
        if commons_photo(query, must, dest, used):
            got += 1
    return got


def credits(slug: str, month: int) -> list[dict]:
    d = PHOTOS / sb_id(slug, month)
    return [json.loads(p.read_text()) for p in sorted(d.glob("g*.json"))] if d.exists() else []


# ─── queue (stills for Cowork) ───────────────────────────────────────────
def still_name(slug: str, month: int, i: int) -> str:
    return f"{sb_id(slug, month)}__g{i:02d}.jpg"


def hero(slug: str) -> Path | None:
    for ext in ("jpg", "jpeg", "webp", "png"):
        p = HERO / f"{slug}.{ext}"
        if p.exists():
            return p
    return None


def _cowork_window() -> bool:
    now = datetime.now()
    return 10 <= now.hour < 13


def queue(slug: str, month: int, sl: list[dict]) -> int:
    if _cowork_window():
        raise SystemExit("10:00-13:00 local: Cowork is generating off the task file; not touching the queue")
    rows = json.loads(QUEUE.read_text())
    have = {r["clip"] for r in rows}
    added = 0
    for i, s in enumerate(sl, 1):
        if s["kind"] == "hook" and hero(slug):
            continue                       # the real hero photo opens the reel
        name = still_name(slug, month, i)
        if name in have or photo_path(slug, month, i).exists():
            continue
        rows.append({"slug": slug, "format": "guide", "pipeline": "v3", "storyboard": sb_id(slug, month),
                     "status": "pending", "take": 1, "clip": name, "kind": "ref",
                     "role": f"guide_{s['kind']}", "prompt": s["prompt"], "seconds": 0, "credits": 0})
        added += 1
    if added:
        tmp = QUEUE.with_suffix(".tmp")
        tmp.write_text(json.dumps(rows, ensure_ascii=False, indent=1))
        tmp.replace(QUEUE)
    return added


def images(slug: str, month: int, sl: list[dict]) -> tuple[list[Path | None], int]:
    out, missing = [], 0
    for i, s in enumerate(sl, 1):
        p = CLIPS / still_name(slug, month, i)
        if photo_path(slug, month, i).exists():
            p = photo_path(slug, month, i)
        if s["kind"] == "hook" and hero(slug):
            p = hero(slug)
        if p.exists():
            out.append(p)
        else:
            out.append(None); missing += 1
    return out, missing


# ─── music: a house track with a steady kick ─────────────────────────────
def pick_track(seed: str) -> tuple[Path, list[float], float]:
    """(track, kick-snapped bar downbeats from the start point, start seconds).
    A track whose kick does not line up with its beat grid is skipped: the
    10-03 Rising Forest test drifted 80 ms because it had no steady kick."""
    import warnings; warnings.filterwarnings("ignore")
    import numpy as np, librosa
    cache = VEO / "data" / "guide_music.json"
    info = json.loads(cache.read_text()) if cache.exists() else {}
    tracks = sorted(MUSIC_DIR.glob("house-*.mp3")) + sorted((HERE / "assets/music_nakshiq").glob("guide*.mp3"))
    forced = os.environ.get("GUIDE_TRACK")
    if forced:
        tracks.append(Path(forced))
    if any(t.name not in info for t in tracks):
        for t in tracks:
            if t.name in info:
                continue
            y, sr = librosa.load(str(t), sr=22050, mono=True, duration=150)
            tempo, bf = librosa.beat.beat_track(y=y, sr=sr, start_bpm=120)
            bt = librosa.frames_to_time(bf, sr=sr)
            oe = librosa.onset.onset_strength(y=y, sr=sr, fmax=200)
            kicks = librosa.onset.onset_detect(onset_envelope=oe, sr=sr, units="time")
            off = [float(np.min(np.abs(kicks - b))) for b in bt] if len(kicks) else [1.0]
            rms = librosa.feature.rms(y=y)[0]; rt = librosa.times_like(rms, sr=sr)
            # start where the full beat is in: first beat after which 8 s of energy stay high
            lvl = 0.8 * np.percentile(rms, 70)   # an even-energy track otherwise "starts" late (theme B: 29 s)
            start = next((float(b) for b in bt if rms[(rt >= b) & (rt < b + 8)].mean() >= lvl), float(bt[0]))
            info[t.name] = {"bpm": float(np.atleast_1d(tempo)[0]), "kick_ms": float(np.median(off) * 1000),
                            "start": start, "dur": len(y) / sr}
        cache.write_text(json.dumps(info, indent=1))
    path_of = {t.name: t for t in tracks}
    ok = [n for n, v in info.items() if n in path_of and 110 <= v["bpm"] <= 130 and v["kick_ms"] <= 25 and v["dur"] - v["start"] > 45]
    if not ok:
        raise SystemExit("no house track with a steady kick in range")
    own = [n for n in ok if n.startswith("guide")]      # the NakshIQ guide theme, once picked, is the sound
    if forced and Path(forced).name in ok:
        name = Path(forced).name
    elif own:
        name = own[sum(map(ord, seed)) % len(own)]
    else:
        name = ok[sum(map(ord, seed)) % len(ok)]
    t = path_of[name]
    y, sr = librosa.load(str(t), sr=22050, mono=True)
    _, bf = librosa.beat.beat_track(y=y, sr=sr, start_bpm=120)
    bt = librosa.frames_to_time(bf, sr=sr)
    kicks = librosa.onset.onset_detect(onset_envelope=librosa.onset.onset_strength(y=y, sr=sr, fmax=200), sr=sr, units="time")
    st = info[name]["start"]
    beats = [b for b in bt if b >= st - 0.01]
    snapped = []
    for b in beats:
        near = kicks[np.abs(kicks - b) <= 0.06]
        snapped.append(float(near[np.argmin(np.abs(near - b))]) if len(near) else float(b))
    return t, [b - snapped[0] for b in snapped], snapped[0]


# ─── text as images (drawtext cannot fall back to a second font for the ₹ sign) ──
def _font(name: str, size: int):
    from PIL import ImageFont
    return ImageFont.truetype(str(FONTS / name), size)


def _runs(text: str):
    """Split into (chunk, is_rupee) so ₹ draws from Noto, everything else from Instrument."""
    out, buf = [], ""
    for ch in text:
        if ch == "₹":
            if buf: out.append((buf, False)); buf = ""
            out.append((ch, True))
        else:
            buf += ch
    if buf: out.append((buf, False))
    return out


def _measure(text: str, f, fr) -> float:
    return sum((fr if r else f).getlength(c) for c, r in _runs(text))


def _wrap_px(text: str, f, fr, maxw: int) -> list[str]:
    lines, cur = [], ""
    for w in text.split():
        nxt = f"{cur} {w}".strip()
        if _measure(nxt, f, fr) <= maxw or not cur:
            cur = nxt
        else:
            lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines


def text_png(s: dict, k: int, n: int, path: Path) -> None:
    from PIL import Image, ImageDraw
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    hook = s["kind"] == "hook"
    X, MAXW = 72, W - 144
    fe, ft, fb = _font("InstrumentSans-Bold.ttf", 34), _font("InstrumentSans-Bold.ttf", 108 if hook else 80), _font("InstrumentSans-Regular.ttf", 44)
    rt, rb = _font("NotoSansDevanagari-Bold.ttf", 108 if hook else 80), _font("NotoSansDevanagari-Bold.ttf", 44)
    tl = _wrap_px(s["title"], ft, rt, MAXW)
    bl = _wrap_px(s["body"], fb, rb, MAXW) if s["body"] else []
    th, bh = int((108 if hook else 80) * 1.12), int(44 * 1.32)
    y = H - 150 - len(bl) * bh                     # body sits just above the disclosure line
    yb = y
    y -= (34 if bl else 0) + len(tl) * th          # title above the body
    yt = y
    ye = yt - 58                                   # eyebrow above the title

    def draw_line(x, y, text, f, fr, fill):
        for chunk, rup in _runs(text):
            ff = fr if rup else f
            dy = int(ff.size * 0.06) if rup else 0
            d.text((x, y + dy), chunk, font=ff, fill=fill)
            x += ff.getlength(chunk)
    d.text((X, ye), s["eyebrow"], font=fe, fill=(242, 181, 68, 255))
    for i, line in enumerate(tl):
        draw_line(X, yt + i * th, line, ft, rt, (246, 241, 232, 255))
    for i, line in enumerate(bl):
        draw_line(X, yb + i * bh, line, fb, rb, (217, 210, 198, 255))
    d.text((W - 60 - fe.getlength(f"{k + 1}/{n}"), 104), f"{k + 1}/{n}", font=_font("InstrumentSans-Regular.ttf", 30), fill=(255, 255, 255, 180))
    img.save(path)


# ─── render ──────────────────────────────────────────────────────────────
def _wrap(s: str, width: int) -> str:
    return "\n".join(textwrap.wrap(s, width=width, break_long_words=False)) if s else ""


def render(slug: str, month: int, out: Path, sl: list[dict], imgs: list[Path | None]) -> float:
    out = Path(out).resolve()                    # ffmpeg runs in the work dir
    track, beats, m0 = pick_track(slug + str(month))
    BAR = 4; PER = 2 * BAR                       # 2 bars a slide
    n = len(sl)
    need = n * PER + 1
    if len(beats) < need:
        raise SystemExit("track too short for this many slides")
    B = [beats[i * PER] for i in range(n + 1)]   # slide boundaries on bar downbeats
    MONT = B[-1]; TOTAL = MONT + END
    tdp = out.parent / f".{out.stem}_work"
    shutil.rmtree(tdp, ignore_errors=True); tdp.mkdir(parents=True)
    for f in ("InstrumentSans-Bold.ttf", "InstrumentSans-Regular.ttf"):
        shutil.copy(FONTS / f, tdp / f)
    shutil.copy(LOGO, tdp / "logo.png")
    # A slide with no image is a plain brand card, never a second use of another photo.
    from PIL import Image as _I
    _I.new("RGB", (W, H), (20, 18, 16)).save(tdp / "card.png")
    fallback = tdp / "card.png"
    # bottom gradient so the words always read
    from PIL import Image
    g = Image.new("L", (W, H), 0)
    px = g.load()
    for yy in range(H):
        a = max(0.0, min(1.0, (yy - H * 0.38) / (H * 0.5)))
        for xx in range(0, W):
            px[xx, yy] = int(235 * a)
    grad = Image.new("RGBA", (W, H), (12, 10, 9, 0)); grad.putalpha(g); grad.save(tdp / "grad.png")
    TD = 0.22                                    # transition, finishes ON the downbeat
    trans = ["slideleft", "zoomin", "slideup", "smoothleft", "zoomin", "slideright", "slidedown", "zoomin", "smoothup", "slideleft"]
    ins, fc = [], []
    for k, p in enumerate(imgs):
        src = p or fallback
        dur = (B[k + 1] - B[k]) + (TD if k else 0)
        ins += ["-loop", "1", "-t", f"{dur + 0.1:.3f}", "-i", str(src)]
    gidx = n
    ins += ["-loop", "1", "-t", f"{TOTAL:.2f}", "-i", "grad.png"]
    fc.append(f"[{gidx}:v]format=rgba,split={n}" + "".join(f"[g{k}]" for k in range(n)))
    txt0 = gidx + 1
    for k in range(n):
        dur = (B[k + 1] - B[k]) + (TD if k else 0)
        ins += ["-loop", "1", "-t", f"{dur + 0.1:.3f}", "-i", f"txt{k}.png"]
    for k, (s, p) in enumerate(zip(sl, imgs)):
        dur = (B[k + 1] - B[k]) + (TD if k else 0)
        fr = int(dur * FPS)
        blur = ""
        drift = "" if k % 2 == 0 else f"+(iw*0.03)*on/{fr}"
        text_png(s, k, n, tdp / f"txt{k}.png")
        lead = TD if k else 0
        a0 = lead + 0.12
        fc.append(
            f"[{k}:v]scale={int(W * 1.12)}:{int(H * 1.12)}:force_original_aspect_ratio=increase,"
            f"crop={int(W * 1.12)}:{int(H * 1.12)}{blur},setsar=1,"
            f"zoompan=z='1+0.07*on/{fr}':x='iw/2-(iw/zoom/2){drift}':y='ih/2-(ih/zoom/2)':d={fr + 3}:s={W}x{H}:fps={FPS},"
            f"trim=duration={dur:.3f},setpts=PTS-STARTPTS[r{k}]")
        fc.append(f"[{txt0 + k}:v]format=rgba,fade=t=in:st={a0:.3f}:d=0.28:alpha=1[tx{k}]")
        fc.append(f"[r{k}][g{k}]overlay=0:0:shortest=1[o{k}]")
        fc.append(f"[o{k}][tx{k}]overlay=0:'(1-min(1,max(0,(t-{a0:.3f})/0.3)))*40':shortest=1,"
                  f"format=yuv420p,settb=AVTB[s{k}]")
    # chain slides: transition ends exactly on each downbeat
    cur = "s0"
    for k in range(1, n):
        off = B[k] - TD
        fc.append(f"[{cur}][s{k}]xfade=transition={trans[(k - 1) % len(trans)]}:duration={TD}:offset={off:.3f}[x{k}]")
        cur = f"x{k}"
    fc.append(f"[{cur}]trim=duration={MONT:.3f},drawtext=fontfile=InstrumentSans-Regular.ttf:"
              f"text='Images AI-generated · facts are NakshIQ data':fontsize=26:fontcolor=white@0.55:x=72:y=h-80,"
              f"drawtext=fontfile=InstrumentSans-Bold.ttf:text='NakshIQ':fontsize=36:fontcolor=white@0.85:x=60:y=104[mont]")
    li = txt0 + n
    ins += ["-loop", "1", "-t", str(END), "-i", "logo.png"]
    url = f"nakshiq.com/{slug}"
    (tdp / "url.txt").write_text(f"Full {sl[0]['title'].split(' in ')[0]} guide")
    fc.append(f"[{li}:v]scale=420:420,pad={W}:{H}:(ow-iw)/2:(oh-ih)/2-160:color=0x141210,fps={FPS},"
              f"drawtext=fontfile=InstrumentSans-Regular.ttf:textfile=url.txt:fontcolor=0xE8E3DA:"
              f"fontsize=50:x=(w-text_w)/2:y=h*0.62,"
              f"drawtext=fontfile=InstrumentSans-Regular.ttf:text='nakshiq.com':fontcolor=0x8A8178:"
              f"fontsize=40:x=(w-text_w)/2:y=h*0.62+74,fade=t=in:st=0:d=0.25,"
              f"trim=duration={END},setpts=PTS-STARTPTS,format=yuv420p,settb=AVTB[vend]")
    fc.append("[mont][vend]concat=n=2:v=1:a=0,scale=out_range=tv,format=yuv420p[vout]")
    mi = li + 1
    ins += ["-ss", f"{m0:.3f}", "-t", f"{TOTAL:.3f}", "-i", str(track)]
    fc.append(f"[{mi}:a]asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:d=0.03,"
              f"afade=t=out:st={TOTAL - 1.8:.3f}:d=1.8[aout]")
    cmd = ["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(fc),
           "-map", "[vout]", "-map", "[aout]", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-profile:v", "high",
           "-preset", "medium", "-crf", "20", "-r", str(FPS), "-c:a", "aac", "-b:a", "192k",
           "-movflags", "+faststart", "-t", f"{TOTAL:.3f}", str(out)]
    r = subprocess.run(cmd, cwd=tdp, capture_output=True, text=True)
    if r.returncode:
        raise SystemExit("ffmpeg failed:\n" + r.stderr[-2500:])
    shutil.rmtree(tdp, ignore_errors=True)
    (out.with_suffix(".json")).write_text(json.dumps({"track": track.name, "start": m0, "bounds": B,
                                                        "slides": sl}, ensure_ascii=False, indent=1))
    return TOTAL


# ─── ledger + daily ──────────────────────────────────────────────────────
def _led() -> dict:
    return json.loads(LEDGER.read_text()) if LEDGER.exists() else {}


def _save(led: dict) -> None:
    tmp = LEDGER.with_suffix(".tmp"); tmp.write_text(json.dumps(led, ensure_ascii=False, indent=1)); tmp.replace(LEDGER)


def fact_pack(slug: str) -> dict | None:
    p = FACTS / f"{slug}.json"
    fresh = p.exists() and (datetime.now().timestamp() - p.stat().st_mtime) < 14 * 86400
    if not fresh:
        subprocess.run(["node", str(REPO / "scripts/reel-fact-pack.mjs"), slug], cwd=REPO,
                       capture_output=True, text=True, env=os.environ)
    return load_pack(slug)


HOLD = HERE / "HOLD_FOR_REVIEW"     # same kill switch as the story reels


LOOKALIKE_SSIM = 0.55      # stills are cut-free, so a lower bar than the story reels' 0.78
LOOKALIKE_HIST = 0.97


def look_alike_images(imgs: list[Path | None]) -> list[tuple[int, int, float, float]]:
    """Slide pairs whose pictures are too alike: grey SSIM at 90x160, or colour
    histograms nearly identical while SSIM is still moderate. Heuristic thresholds
    (2026-10-03), backed by the daily visual check before the post window."""
    import numpy as np
    from PIL import Image
    sys.path.insert(0, str(HERE))
    import reel_v3 as R
    g, h = {}, {}
    for i, p in enumerate(imgs):
        if not p:
            continue
        im = Image.open(p).convert("RGB")
        if im.width > im.height * 9 / 16:
            cw = im.height * 9 // 16
            im = im.crop(((im.width - cw) // 2, 0, (im.width + cw) // 2, im.height))
        im = im.resize((90, 160))
        g[i] = np.asarray(im.convert("L"), np.float64)
        hist = np.concatenate([np.histogram(np.asarray(im)[..., c], 16, (0, 255))[0] for c in range(3)]).astype(float)
        h[i] = hist / hist.sum()
    out = []
    keys = sorted(g)
    for a in range(len(keys)):
        for b in range(a + 1, len(keys)):
            i, j = keys[a], keys[b]
            s = R._ssim(g[i], g[j]); c = float(np.corrcoef(h[i], h[j])[0, 1])
            if s >= LOOKALIKE_SSIM or (c >= LOOKALIKE_HIST and s >= 0.40):
                out.append((i + 1, j + 1, round(s, 2), round(c, 3)))
    return out


def qa(path: Path, expect: float) -> str:
    """'' when the cut is postable, else the reason it is held."""
    if not path.exists() or path.stat().st_size < 500_000:
        return "file missing or under 0.5 MB"
    pr = lambda *a: subprocess.run(["ffprobe", "-v", "error", *a, str(path)], capture_output=True, text=True).stdout.strip()
    try:
        dur = float(pr("-show_entries", "format=duration", "-of", "csv=p=0"))
        frames = int(pr("-count_frames", "-select_streams", "v", "-show_entries", "stream=nb_read_frames", "-of", "csv=p=0"))
    except ValueError:
        return "ffprobe could not read the cut"
    if not pr("-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0"):
        return "no audio stream"
    if not 30 <= dur <= 75:
        return f"length {dur:.1f}s outside 30-75s"
    if abs(frames / FPS - dur) > 0.5:
        return f"picture stops early: {frames / FPS:.1f}s of video in a {dur:.1f}s file"
    if abs(dur - expect) > 0.5:
        return f"length {dur:.1f}s, expected {expect:.1f}s"
    return ""


def cut(slug: str, month: int, led: dict) -> bool:
    pack = load_pack(slug)
    sl = slides(pack, month)
    imgs, missing = images(slug, month, sl)
    if missing > MAX_MISSING or not any(imgs):
        return False
    out = OUTDIR / f"{sb_id(slug, month)}.mp4"
    total = render(slug, month, out, sl, imgs)
    same = look_alike_images(imgs)
    held = ("HOLD_FOR_REVIEW file present" if HOLD.exists() else qa(out, total)
            or (f"slides look alike: {same}" if same else ""))
    now = datetime.now(timezone.utc).isoformat()
    for plat in PLATFORMS:
        led[f"{sb_id(slug, month)}__{plat}"] = {
            "storyboard": sb_id(slug, month), "slug": slug, "format": "guide", "kind": "guide",
            "angle": "guide", "month": month, "name": pack["destination"]["name"], "lang": "en",
            "platform": plat, "status": "review" if held else "ready", "six_beat": False, "pipeline": "guide",
            **({"held": held} if held else {}),
            "rendered_at": now, "file": str(out), "seconds": round(total, 1),
            "slides": len(sl), "fallback_slides": missing}
    _save(led)
    print(f"[guide] cut {out.name}: {len(sl)} slides, {total:.1f}s, {missing} fallback" + (f", HELD: {held}" if held else ""))
    return True


def daily() -> int:
    rot = json.loads(ROT.read_text())
    month = target_month()
    led = _led()
    cutoff = (datetime.now(timezone.utc) - timedelta(days=REPEAT_DAYS)).isoformat()
    recent = {v["slug"] for v in led.values() if v.get("kind") == "guide"
              and (v.get("published_at") or v.get("rendered_at") or "") >= cutoff}
    q = json.loads(QUEUE.read_text())
    queued = sorted({r["storyboard"] for r in q if r.get("format") == "guide"})
    # 1. cut any queued guide whose stills are in
    for sb in queued:
        slug, m = sb.split("__guide_m")[0], int(sb.split("__guide_m")[1])
        if any(v.get("storyboard") == sb for v in led.values()):
            continue
        try:
            cut(slug, m, led)
        except SystemExit as e:
            print(f"[guide] {sb}: {e}")
    # 2. keep BUFFER guides in the pipeline for the target month
    open_ = {sb for sb in queued if not any(v.get("storyboard") == sb and v.get("status") in ("published", "unconfirmed")
                                             for v in led.values())}
    want = BUFFER - len(open_)
    for slug in rot.get(str(month), []):
        if want <= 0:
            break
        if slug in recent or sb_id(slug, month) in queued:
            continue
        pack = fact_pack(slug)
        if not pack:
            print(f"[guide] {slug}: no fact pack"); continue
        try:
            sl = slides(pack, month)
        except SystemExit as e:
            print(f"[guide] {slug}: {e}"); continue
        if len(sl) < 7:
            print(f"[guide] {slug}: only {len(sl)} slides prove out, skipped"); continue
        ph = fetch_photos(slug, month, sl)
        n = queue(slug, month, sl)
        print(f"[guide] {slug}: {ph} real photo(s) from Wikimedia Commons")
        print(f"[guide] queued {sb_id(slug, month)}: {len(sl)} slides, {n} stills for Cowork")
        want -= 1
    return 0


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a or a[0] == "daily":
        sys.exit(daily())
    if a[0] == "slides":
        pack = fact_pack(a[1]) if len(a) > 1 else None
        for i, s in enumerate(slides(pack, int(a[2])), 1):
            print(f"{i:2d} [{s['kind']}] {s['eyebrow']} | {s['title']} | {s['body']}\n    img: {s['prompt'][:150]}")
    elif a[0] == "render":
        led = _led()
        print(cut(a[1], int(a[2]), led))
