#!/usr/bin/env python3
"""place_voiced.py: the longer, Hindi-voiced place reel (about 40 s).

    node --env-file=../apps/web/.env.local -e '...spawn python3 place_voiced.py render reel_scripts/place/chakrata__map_reveal.json'
    python3 place_voiced.py render <script.json> [--out reels/x.mp4] [--music travel-pop-07-94]

WHY (founder 2026-10-20, on the 15 s Chakrata map reel): "it's only 15 seconds long, and I did
not hear any trendy music ... People don't connect emotionally and will like or comment in 15
seconds, so we need to add more information." Then: "we need better quality rather than
quantity". He chose: stay automatic, upbeat music, one strong reel a day, Hindi voice, ~40 s.

A script (reel_scripts/place/<slug>__<fmt>.json) is written per place by hand from reel-data.json,
never generated on the fly: one flowing Hindi line per scene (feedback_reel_script_needs_continuity),
at most three spoken numbers, no score spoken, no food cost. Each scene starts as its line starts,
so the picture always shows what is being said. Voice: ElevenLabs one pass through reel_v3.voice()
(budget-gated, cached by exact text, so a re-render is free). Music: an upbeat Mixkit track ducked
under the voice.
"""
from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
from datetime import date
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import place_reels as P  # noqa: E402

TPL = HERE / "place_reels" / "voiced.html"
MUSIC_DIRS = [HERE / "assets" / d for d in ("music_travel", "yt_music_v2", "music_trendy")]   # Mixkit + Pixabay, no credit needed
MUSIC = "travel-pop-07-94"     # ~117 bpm pop; picked 2026-10-20 for "trendy", not the calm house themes
# Founder 2026-10-20: "why is the music the same in all these reels?" ... "you need to be smart enough to choose
# the right music to the right script". Each series has its own mood; a script may name its track ("music",
# "music_start" seconds into the track, or "music_drop" + "music_drop_scene" to land a measured drop on a scene).
# Otherwise the first track of the series pool not used by a voiced reel in the last 7 days is written into the script.
SERIES_MUSIC = {
    "where_is_it": [("travel-pop-07-94", 0), ("travel-slow-pop-840", 0), ("travel-feel-alive-3", 2), ("uplifting-driving-ambition-682", 0)],
    "real_cost": [("travel-night-sky-hip-hop-963", 12), ("travel-like-a-loop-machine-351", 0), ("hype-267", 0), ("hype-738", 0)],
    "sos": [("cinematic-the-journey-543", 20), ("cinematic-rising-sun-892", 0), ("cinematic-vastness-759", 0)],
    "swap": [("edm-471", 0), ("edm-371", 26), ("house-129", 35)],
    "skip": [("cinematic-vastness-759", 0), ("cinematic-a-new-life-606", 29), ("cinematic-rising-sun-892", 27)],
    "hidden_gems": [("travel-traveling-along-669", 2), ("uplifting-happy-times-1030", 0), ("uplifting-mountains-952", 0)],
    "eat_here": [("travel-just-keep-walking-339", 33), ("uplifting-mountains-952", 0), ("travel-traveling-along-669", 0)],
    "list_of_3": [("travel-summer-fun-970", 0), ("travel-dance-with-me-1063", 0), ("uplifting-yeah-yeah-271", 0)],
    "window": [("uplifting-reaching-out-187", 0), ("cinematic-drawing-the-sky-797", 0), ("travel-serene-view-839", 0)],
    "vs": [("travel-the-duel-617", 0), ("travel-rock-the-game-820", 0), ("travel-funky-triplets-817", 0)],
}
LEAD = 1.4                     # map + first beat of music before the first word
CUT_EARLY = 0.25               # a scene's picture lands just before its line
TAIL = 2.8                     # end card after the last word
MAX_SLOW = 1.6                 # a Veo clip may be slowed this much to cover its line
SPEED = 1.2                    # eleven_v3 Hindi reads ~166 wpm; 1.2x = ~200 wpm, the pace of the @globeverse
                               # Ayodhya reel (511K views, 2026-10-15 analysis). A script may set "speed".


def _dur(p: Path) -> float:
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                       capture_output=True, text=True)
    return float(r.stdout.strip())


def _ff(*args: str) -> None:
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def _music_file(name: str) -> Path:
    for d in MUSIC_DIRS:
        if (d / f"{name}.mp3").exists():
            return d / f"{name}.mp3"
    raise SystemExit(f"no music track {name!r} in {', '.join(d.name for d in MUSIC_DIRS)}")


def pick_music(script: Path) -> str:
    """The script's own track, or the first of its series pool unused by a voiced reel in 7 days (saved into the script)."""
    from datetime import datetime, timedelta, timezone
    s = json.loads(script.read_text())
    if s.get("music"):
        return s["music"]
    week = (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
    led = json.loads(P.LEDGER.read_text())
    recent = {v.get("music") for v in led.values() if isinstance(v, dict) and v.get("voiced")
              and ((v.get("published_at") or v.get("rendered_at") or "") >= week or v.get("status") == "ready")}
    pool = SERIES_MUSIC.get(s.get("series") or "where_is_it") or SERIES_MUSIC["where_is_it"]
    name, start = next(((n, st) for n, st in pool if n not in recent), pool[0])
    s.update(music=name, music_start=s.get("music_start", start))
    script.write_text(json.dumps(s, indent=1, ensure_ascii=False) + "\n")
    return name


def _facts(slug: str, today: date) -> dict:
    """The map reel's place facts; a city without two location facts (Shimla, Amritsar) still gets its pin and name
    for a script that opens without the map and carries no place card."""
    try:
        return P.facts_map_reveal(slug, today)
    except P.Refuse:
        g = (P.data().get("geo") or {}).get(slug) or {}
        try:
            best, best_score = P.next_best(slug, today)
        except P.Refuse:                       # a skip reel (Char Dham in winter) has no good month ahead
            best, best_score = 0, None
        return {"slug": slug, "name": P.name(slug), "state": g.get("state_name") or "", "lat": g.get("lat") or 22,
                "lng": g.get("lng") or 79, "facts": [], "best": P.MONTHS[best] if best else "", "best_score": best_score,
                "photo": None, "commons": []}


def _extra_photo(slug: str, q: str, must: str) -> dict | None:
    """A second real Commons photo for one scene (a landmark the line names), any month, cached per query
    so a re-render shows the same picture. Same title checks as the guide reel's photos."""
    import hashlib
    import guide_reel as GR
    dest = P.PHOTOS / slug / f"q_{hashlib.sha1(q.encode()).hexdigest()[:10]}.jpg"
    meta = dest.with_suffix(".json")
    if dest.exists() and meta.exists():
        return json.loads(meta.read_text())
    dest.parent.mkdir(parents=True, exist_ok=True)
    got = GR.commons_photo(q, must, dest, set(), 0, need_month=False, max_gap=12)
    if got:
        meta.write_text(json.dumps(got))
    return got


def _card(sc: dict, f: dict) -> str:
    """The text block for one scene."""
    if sc.get("card") == "place":
        facts = "".join(f"<div>{x}</div>" for x in f["facts"])
        return (f'<div class="kick">{f["state"]}</div><div class="big display" style="font-size:{P._name_px(f["name"])}px">'
                f'{f["name"]}</div><div class="facts">{facts}</div>')
    out = []
    if sc.get("kicker"):
        out.append(f'<div class="kick">{sc["kicker"]}</div>')
    if sc.get("big"):
        px = int(min(260, 860 / (0.42 * max(len(sc["big"]), 1))))
        out.append(f'<div class="big display" style="font-size:{px}px">{sc["big"]}</div>')
    if sc.get("line"):
        out.append(f'<div class="line">{sc["line"]}</div>')
    if sc.get("lines"):
        out.append('<div class="facts">' + "".join(f"<div>{x}</div>" for x in sc["lines"]) + "</div>")
    if sc.get("rows"):
        out.append('<div class="rows">' + "".join(f'<div class="row"><span>{a}</span><b>{b}</b></div>' for a, b in sc["rows"]) + "</div>")
    if sc.get("sub"):
        out.append(f'<div class="sub">{sc["sub"]}</div>')
    return "".join(out)


def _subs(chunks_per_line: list, bounds: list) -> tuple[list, list]:
    """Burned-in subtitles (founder 2026-10-20: most viewers watch muted; "not in Hindi ... Hinglish,
    do both"). Each line's chunks share that line's spoken time in proportion to their length (the
    voice pauses at the commas where the chunks split). *word* marks a keyword shown in the accent."""
    import re
    els, anim = [], []
    for li, (chunks, (b0, bd, _)) in enumerate(zip(chunks_per_line, bounds)):
        t0, tot = LEAD + b0, sum(len(c) for c in chunks) or 1
        for ci, c in enumerate(chunks):
            d = round(bd * len(c) / tot, 2)
            html = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", c)
            els.append(f'<div id="u{li}_{ci}" class="sub-line clip" data-start="{round(t0, 2)}" data-duration="{d}" data-track-index="5">{html}</div>')
            anim.append(f'tl.fromTo("#u{li}_{ci}", {{opacity:0, scale:0.92}}, {{opacity:1, scale:1, duration:0.18, ease:"back.out(2)"}}, {round(t0, 2)});')
            t0 += d
    return els, anim


def _closer_kind(line: str) -> str:
    """The kind of a reel's last line (founder 2026-10-22: every reel ended "send this to someone")."""
    for kind, mark in (("send", "भेजिए"), ("comment", "कमेंट"), ("tag", "टैग"), ("save", "सेव"), ("part2", "अगले")):
        if mark in line:
            return kind
    return " ".join(line.split()[:2])


def _check_closer(script: Path, s: dict) -> None:
    """A new script's closing line must differ in kind from the two reels queued before it. Runs before the
    voice is paid for; a script already in the ledger (a re-cut) is never refused."""
    led = json.loads(P.LEDGER.read_text())
    mine = f"{s['slug']}__{s['format']}_voiced__"
    if any(k.startswith(mine) for k in led):
        return
    prev = sorted({(v.get("queue_order") or 0, f"{v['slug']}__{v['format'].removesuffix('_voiced')}")
                   for v in led.values() if isinstance(v, dict) and v.get("voiced") and v.get("slug")})[-2:]
    kinds = []
    for _, stem in prev:
        p = script.parent / f"{stem}.json"
        if p.exists():
            kinds.append(_closer_kind(json.loads(p.read_text())["vo"]["hi"][-1]))
    k = _closer_kind(s["vo"]["hi"][-1])
    if k in kinds:
        raise SystemExit(f"{script.name}: closing line is a '{k}' ending, like the reel queued before it; "
                         f"rotate it (STYLE.md, Closing line)")


def render(script: Path, out: Path, music: str | None = None, today: date | None = None, subs: str = "none") -> dict:
    import reel_v3 as R
    _check_closer(script, json.loads(script.read_text()))
    music = music or pick_music(script)
    s = json.loads(script.read_text())
    slug, lines, scenes = s["slug"], s["vo"]["hi"], s["scenes"]
    if len(scenes) != len(lines):
        raise SystemExit(f"{script.name}: {len(lines)} voice lines but {len(scenes)} scenes")
    f = _facts(slug, today or date.today())                   # map pin, place facts, the real photo + credit
    map_open = scenes[0].get("bg", "map") == "map"
    if not f["facts"] and (map_open or any(sc.get("card") == "place" for sc in scenes)):
        raise SystemExit(f"{slug}: no place facts for the map or the place card")
    w = P.WORK / f"{s['id']}__voiced"
    if w.exists():
        shutil.rmtree(w)
    (w / "assets").mkdir(parents=True)
    for fn in ("package.json", "hyperframes.json"):
        shutil.copy(P.PROJECT / fn, w / fn)
    shutil.copy(P.PROJECT / "gsap.min.js", w / "assets" / "gsap.min.js")
    for fn in ("CrimsonPro-Italic.ttf", "InstrumentSans-Regular.ttf", "InstrumentSans-Bold.ttf"):   # brand end screen
        shutil.copy(HERE / "assets" / "fonts" / fn, w / "assets" / fn)

    # 1 voice (paid once, then cached by exact text)
    with tempfile.TemporaryDirectory() as td:
        vo_mp3, bounds = R.voice({"id": s["id"], "vo": {"hi": lines}}, "hi", Path(td))
        shutil.copy(vo_mp3, w / "assets" / "vo.mp3")
    if len(bounds) != len(lines):
        raise SystemExit(f"voice came back with {len(bounds)} line timings for {len(lines)} lines")
    sp = float(s.get("speed", SPEED))
    bounds = [(b[0] / sp, b[1] / sp, b[2]) for b in bounds]   # the mix plays the voice sp x faster
    v_end = LEAD + bounds[-1][0] + bounds[-1][1]
    total = round(v_end + TAIL, 2)
    starts = [0.0] + [round(LEAD + b[0] - CUT_EARLY, 2) for b in bounds[1:]]
    ends = starts[1:] + [total]

    # 2 sound: music ducked under the voice, faded at both ends
    src = _music_file(music)
    m0 = float(s.get("music_start") or 0) if music == s.get("music") else 0.0
    if music == s.get("music") and s.get("music_drop") is not None:      # land the track's drop on a scene
        m0 = max(0.0, float(s["music_drop"]) - starts[int(s.get("music_drop_scene") or 1)])
    _ff("-i", str(src), "-i", str(w / "assets" / "vo.mp3"), "-filter_complex",
        f"[0:a]atrim={m0}:{m0 + total},asetpts=PTS-STARTPTS,loudnorm=I=-16:TP=-2,volume=0.55,"
        f"afade=t=in:d=0.3,afade=t=out:st={total - 1.6}:d=1.6[m];"
        f"[1:a]atempo={sp},adelay={int(LEAD * 1000)}|{int(LEAD * 1000)},loudnorm=I=-15:TP=-1.5,apad=whole_dur={total}[v];"
        f"[v]asplit=2[v1][v2];[m][v1]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=350[md];"
        f"[md][v2]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[out]",
        "-map", "[out]", "-t", str(total), "-c:a", "aac", "-b:a", "192k", str(w / "assets" / "mix.m4a"))

    # 3 pictures: the real photo, and any Veo clip slowed to cover its line
    if f.get("photo"):
        P._photo(f["photo"], w / "assets" / "photo.jpg")
    media, blocks, anim = [], [], []
    uses_ref = any(sc.get("bg", "photo") in ("photo", "photo2", "photo3") for sc in scenes)
    authors = [(f.get("commons") or [{}])[0].get("author")] if uses_ref else []
    pans = {"photo": ("50% 40%", 1.0, 1.12), "photo2": ("20% 60%", 1.15, 1.28), "photo3": ("80% 30%", 1.1, 1.22),
            "end": ("50% 50%", 1.2, 1.3)}
    for i, sc in enumerate(scenes):
        st, du = starts[i], round(ends[i] - starts[i], 2)
        bg = sc.get("bg", "photo")
        if bg.startswith("clip:"):
            # "clip:<file>@<seconds>" starts the clip partway in, past a glitch the eyeball found
            # (Kokernag s1 jump-cuts at 2.7 s, 2026-10-20).
            name, _, off = bg[5:].partition("@")
            clip, off = P.CLIPS / name, float(off or 0)
            avail = _dur(clip) - off
            slow = max(1.0, du / avail)
            if slow > MAX_SLOW:
                raise SystemExit(f"scene {i + 1}: {clip.name} gives {avail:.1f}s for a {du:.1f}s line (more than {MAX_SLOW}x slow)")
            _ff("-ss", str(off), "-i", str(clip), "-an", "-vf", f"setpts={slow:.4f}*PTS,fps=30,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920",
                "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", str(w / "assets" / f"c{i}.mp4"))
            media.append(f'<video id="bg{i}" class="clip bg" src="assets/c{i}.mp4" data-start="{st}" data-duration="{du}" '
                         f'data-media-start="0" data-track-index="0" muted playsinline></video>')
        elif bg.startswith("photo:"):          # "photo:<commons query>|<words the title must hold>"
            q, _, must = bg[6:].partition("|")
            c = _extra_photo(slug, q, must or q)
            if not c:
                raise SystemExit(f"scene {i + 1}: no Commons photo for {q!r}")
            src_img = Path(c["file"])
            if sc.get("crop"):                 # [x, y, w, h] as fractions: frame the subject above the card
                x0, y0, cw, ch = sc["crop"]    # (Ukhimath's temple sat under the card, 2026-10-20)
                src_img = w / "assets" / f"crop{i}.jpg"
                _ff("-i", c["file"], "-vf", f"crop=iw*{cw}:ih*{ch}:iw*{x0}:ih*{y0}", "-q:v", "2", str(src_img))
            P._photo(src_img, w / "assets" / f"p{i}.jpg")
            authors.append(c.get("author"))
            media.append(f'<img id="bg{i}" class="clip bg" src="assets/p{i}.jpg" alt="" data-start="{st}" data-duration="{du}" data-track-index="0" />')
            anim.append(f'tl.fromTo("#bg{i}", {{scale:1.04, transformOrigin:"50% 45%"}}, {{scale:1.16, duration:{du}, ease:"none"}}, {st});')
        elif bg == "end":
            pass                               # the Ink end screen fades in over the last card; no photo under it
        elif bg in pans:
            if not f.get("photo"):
                raise SystemExit(f"scene {i + 1}: '{bg}' needs the place photo; name one with photo:<query>|<must>")
            org, a, b = pans[bg]
            media.append(f'<img id="bg{i}" class="clip bg" src="assets/photo.jpg" alt="" data-start="{st}" data-duration="{du}" data-track-index="0" />')
            anim.append(f'tl.fromTo("#bg{i}", {{scale:{a}, transformOrigin:"{org}"}}, {{scale:{b}, duration:{du}, ease:"none"}}, {st});')
        if bg not in ("map", "end") and _card(sc, f):
            blocks.append(f'<section id="s{i}" class="scene clip" data-start="{st}" data-duration="{du}" data-track-index="1">'
                          f'<div class="card" id="k{i}">{_card(sc, f)}</div></section>')
            anim.append(f'tl.fromTo("#k{i}", {{opacity:0, y:40}}, {{opacity:1, y:0, duration:0.5, ease:"power3.out"}}, {st + 0.15});')
            anim.append(f'tl.fromTo("#k{i} .facts div, #k{i} .row", {{opacity:0, x:-24}}, {{opacity:1, x:0, duration:0.35, stagger:0.55, ease:"power3.out"}}, {st + 0.5});')
    sub_els = []
    if subs != "none":
        chunks = (s.get("subs") or {}).get(subs)
        if not chunks or len(chunks) != len(lines):
            raise SystemExit(f"{script.name}: no '{subs}' subtitles for all {len(lines)} lines")
        sub_els, sub_anim = _subs(chunks, bounds)
        anim += sub_anim
    px, py = P._project_xy(f["lat"], f["lng"])
    hook = scenes[0].get("hook") or f'Where is <em>{f["name"]}</em>, really?'
    rep = {"NAME": f["name"], "DUR": total, "MAP_END": ends[0], "MAP_PATH": P._map_path(), "PX": px, "PY": py,
           "TX": round(540 - (40 + px), 1), "TY": round(900 - (470 + py), 1), "HOOK": hook,
           "MEDIA": "\n      ".join(media), "SCENES": "\n      ".join(blocks), "ANIM": "\n      ".join(anim),
           "END_START": starts[-1], "END_DUR": round(total - starts[-1], 2),
           # On screen just the source (founder 2026-10-20). CC BY / BY-SA still require the authors'
           # names, so they go in the caption (credits), never dropped.
           "CREDIT": "Photos: Wikimedia Commons", "SUBS": "\n      ".join(sub_els),
           "MUSIC": music, "FOLLOW": "follow NakshIQ"}
    html = TPL.read_text()
    if not map_open:      # opens on its own picture and hook: no map, the scrim on from the first frame
        html = html.replace("</style>", "  #mapwrap { display: none; } #scrim { opacity: 1 !important; }\n    </style>", 1)
    for k, v in rep.items():
        html = html.replace("{{" + k + "}}", str(v))
    (w / "index.html").write_text(html)
    out.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(["npx", "--yes", P.HF, "render", str(w), "-o", str(out), "--quiet", "--no-best-effort"],
                       capture_output=True, text=True)
    if r.returncode != 0 or not out.exists():
        raise SystemExit("hyperframes render failed: " + (r.stderr or r.stdout)[-600:])
    # The renderer re-mixes the audio track and can lose level: Rann of Kutch came out at -23.6 LUFS from a
    # -15.4 LUFS mix (2026-10-20). Put the exact ffmpeg mix back over the rendered picture.
    tmp = out.with_suffix(".remux.mp4")
    _ff("-i", str(out), "-i", str(w / "assets" / "mix.m4a"), "-map", "0:v", "-map", "1:a", "-c", "copy",
        "-t", str(total), "-movflags", "+faststart", str(tmp))
    tmp.replace(out)
    return {"file": str(out), "seconds": total, "starts": starts, "facts": f, "music": music, "music_start": m0,
            "credits": list(dict.fromkeys(a for a in authors if a))}


# Cover style per series (founder 2026-10-20 compared three full sets and chose to mix them):
# A bold hook for questions and lists, B verdict stamp for one-word verdicts, C everyone-vs-you for comparisons.
SERIES_COVER = {"where_is_it": "A", "window": "A", "list_of_3": "A",
                "real_cost": "B", "sos": "B", "skip": "B",
                "swap": "C", "eat_here": "C", "hidden_gems": "C", "vs": "C"}
SERIES_TAG = {"where_is_it": "Where is it", "window": "The window", "list_of_3": "Three places", "real_cost": "Real cost",
              "sos": "SOS", "skip": "Skip list", "swap": "The swap", "eat_here": "Eat here", "hidden_gems": "Hidden gems",
              "vs": "This or that"}


def _cover_img(slug: str, ref: str, td: Path) -> Path:
    """'place' (the map reel's real photo), 'photo:<query>|<must>', 'clip:<file>@<sec>' or a file path."""
    if ref == "place":
        return Path(_facts(slug, date.today())["photo"])
    if ref.startswith("photo:"):
        q, _, must = ref[6:].partition("|")
        c = _extra_photo(slug, q, must or q)
        if not c:
            raise SystemExit(f"cover: no Commons photo for {q!r}")
        return Path(c["file"])
    if ref.startswith("clip:"):
        name, _, at = ref[5:].partition("@")
        out = td / f"frame_{name}.jpg"
        _ff("-ss", at or "3", "-i", str(P.CLIPS / name), "-frames:v", "1", "-q:v", "2", str(out))
        return out
    return Path(ref).expanduser()


def make_cover(script: Path) -> Path:
    """Render the reel's cover from its script's "cover" block, in its series' style, and attach it to the
    Instagram row if the reel is registered (YouTube picks its own frame; the hook is on frame 0 for it)."""
    import re
    import reel_cover as RC
    s = json.loads(script.read_text())
    c = s.get("cover") or {}
    series = s.get("series") or "where_is_it"
    style = c.get("style") or SERIES_COVER.get(series, "A")
    words = lambda t: len(re.sub(r"[*|]", " ", t).split())
    out = P.VEO / "reels" / f"{script.stem}__voiced__cover.jpg"
    with tempfile.TemporaryDirectory() as td:
        td = Path(td)
        if style == "A":
            if words(c["hook"]) > 8:
                raise SystemExit(f"cover hook over 8 words: {c['hook']}")
            RC.from_image(_cover_img(s["slug"], c["image"], td), c["hook"], out, hi=RC.VERMILLION_BRIGHT,
                          tag=c.get("tag") or SERIES_TAG.get(series))
        elif style == "B":
            # founder 2026-10-20: "CLOSED" in its box was perfect; "ALMOST EMPTY" left the box half empty
            # because long stamps shrink the type. One punchy word, at most 9 characters.
            if len(c["stamp"]) > 9:
                raise SystemExit(f"stamp over 9 characters (the type shrinks and the box looks empty): {c['stamp']}")
            RC.stamp_cover(_cover_img(s["slug"], c["image"], td), c["line"], c["stamp"], out, tuple(c.get("focus") or (0.5, 0.5)))
        else:
            if words(c["hook"]) > 8:
                raise SystemExit(f"cover hook over 8 words: {c['hook']}")
            RC.split_cover(_cover_img(s["slug"], c["top"], td), c["top_label"], _cover_img(s["slug"], c["bottom"], td),
                           c["bottom_label"], c["hook"], out)
    raw = P.LEDGER.read_text()
    led = json.loads(raw)
    ind = next((i for i in (1, 2) if raw in (json.dumps(led, indent=i, ensure_ascii=False),
                                             json.dumps(led, indent=i, ensure_ascii=False) + "\n")), 1)
    key = f"{s['slug']}__{s['format']}_voiced__instagram"
    if key in led and (led[key].get("status") not in ("published", "unconfirmed")):
        led[key]["cover"] = str(out)
        P.LEDGER.write_text(json.dumps(led, indent=ind, ensure_ascii=False) + ("\n" if raw.endswith("\n") else ""))
    return out


SURFACES = (("instagram", "hinglish"), ("youtube", "en"))   # founder 2026-10-20: IG Hinglish subs, YT English subs


def _strip(html: str) -> str:
    import re
    return re.sub(r"<[^>]+>", "", html)


def register(script: Path, today: date | None = None, hold: bool = False) -> list[str]:
    """Add both cuts of a rendered script to the ledger as ready rows (the founder approved the locked
    structure, so a script that renders and passes its checks posts without a review stop). Keys
    <slug>__<fmt>_voiced__<platform>. queue_order keeps Instagram and YouTube on the same reel each day."""
    from datetime import datetime, timezone
    s = json.loads(script.read_text())
    slug = s["slug"]
    led_p = P.LEDGER
    raw = led_p.read_text()
    led = json.loads(raw)
    ind = next((i for i in (1, 2) if raw in (json.dumps(led, indent=i, ensure_ascii=False),
                                             json.dumps(led, indent=i, ensure_ascii=False) + "\n")), 1)
    f = _facts(slug, today or date.today())
    recs = list(f.get("commons") or []) if any(sc.get("bg", "photo") in ("photo", "photo2", "photo3") for sc in s["scenes"]) else []
    for sc in s["scenes"]:
        bg = sc.get("bg", "")
        if bg.startswith("photo:"):
            q, _, must = bg[6:].partition("|")
            c = _extra_photo(slug, q, must or q)
            if c:
                recs.append(c)
        elif bg.startswith("clip:"):
            pj = P.CLIPS / (bg[5:].partition("@")[0].rsplit("__s", 1)[0] + "__photo.json")
            if pj.exists():
                recs.append(json.loads(pj.read_text()))
    seen, commons = set(), []
    for r in recs:
        if r.get("title") and r["title"] not in seen:
            seen.add(r["title"])
            c = {k: r.get(k) for k in ("title", "author", "licence", "page", "share_alike")}
            import re
            m = re.search(r"flickr\.com/photos/([^/\s]+)", c.get("author") or "")
            if m:                              # Commons "author" is sometimes a bare Flickr URL (Kullu, 2026-10-20)
                c["author"] = f"{m.group(1)} (Flickr)"
            c["author"] = re.sub(r"\s*\(talk\s*·\s*contribs\)", "", c.get("author") or "").strip()   # a wiki signature
            commons.append(c)
    screen = []
    for sc in s["scenes"]:
        for k in ("big", "line", "sub"):
            if sc.get(k):
                screen.append(_strip(sc[k]))
        screen += [_strip(x) for x in sc.get("lines") or []]
        screen += [f"{a} {b}" for a, b in sc.get("rows") or []]
    screen += [_strip(x) for x in f["facts"]]
    order = max([v.get("queue_order", 0) for v in led.values() if isinstance(v, dict) and v.get("voiced")] or [0]) + 1
    keys = []
    for plat, sub in SURFACES:
        out = P.VEO / "reels" / f"{script.stem}__voiced__{sub}.mp4"
        if not out.exists():
            raise SystemExit(f"{out.name} not rendered: run render --subs {sub} first")
        key = f"{slug}__{s['format']}_voiced__{plat}"
        if (led.get(key) or {}).get("status") in ("published", "unconfirmed"):
            raise SystemExit(f"{key} is already published")
        led[key] = {"storyboard": s["id"], "slug": slug, "format": s["format"], "kind": s["format"], "angle": s["format"],
                    "lang": "hi", "subs": sub, "platform": plat, "file": str(out), "six_beat": False, "pipeline": "place",
                    "voiced": True, "series": s.get("series") or "where_is_it", "ai_footage": sum(sc.get("bg", "").startswith("clip:") for sc in s["scenes"]),
                    "status": "founder_review" if hold else "ready", "music": s.get("music") or MUSIC,
                    **({"held": "founder reviews before it posts (2026-10-20)"} if hold else {}), "queue_order": (led.get(key) or {}).get("queue_order") or order,
                    "rendered_at": datetime.fromtimestamp(out.stat().st_mtime, timezone.utc).isoformat(),
                    "name": f["name"], "best": f["best"], "best_score": f["best_score"],
                    "caption_lead": s.get("caption_lead"), "screen_text": screen,
                    **({"yt_title": s.get("title") or (_strip((s["scenes"][0].get("hook") or "").replace("<br>", " ")) + " | NakshIQ")}
                       if s["scenes"][0].get("hook") else {}),
                    "cost_basis": s.get("cost_basis") or [], "commons": commons,
                    **({"cover": str(P.VEO / "reels" / f"{script.stem}__voiced__cover.jpg")}
                       if plat == "instagram" and (P.VEO / "reels" / f"{script.stem}__voiced__cover.jpg").exists() else {})}
        keys.append(key)
    led_p.write_text(json.dumps(led, indent=ind, ensure_ascii=False))
    return keys


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["render", "register", "cover"])
    ap.add_argument("script")
    ap.add_argument("--out")
    ap.add_argument("--music", default=None, help="override the script's / series' track")
    ap.add_argument("--hold", action="store_true", help="register for founder review instead of ready")
    ap.add_argument("--subs", default="none", help="none | hinglish | en (the script's subs block)")
    a = ap.parse_args(argv)
    sp = Path(a.script)
    if a.cmd == "cover":
        print(f"[place_voiced] cover {make_cover(sp)}")
        return 0
    if a.cmd == "register":
        print("[place_voiced] registered " + ", ".join(register(sp, hold=a.hold)))
        return 0
    # 2026-10-22: a bare `python3 place_voiced.py render` (no apps/web env) hashed the voice with a different
    # ELEVEN_MODEL, missed every cached voice and paid ElevenLabs 4,071 chars to re-voice 5 approved reels.
    if "ELEVEN_MODEL" not in os.environ:
        raise SystemExit("run through node --env-file=../apps/web/.env.local (see the module doc): without it the "
                         "voice settings differ, the cached voices are missed and ElevenLabs is paid again")
    tag = "" if a.subs == "none" else f"__{a.subs}"
    out = Path(a.out) if a.out else P.VEO / "reels" / f"{sp.stem}__voiced{tag}.mp4"
    res = render(sp, out, a.music, subs=a.subs)
    print(f"[place_voiced] {out} ({res['seconds']:.1f}s) scenes at {res['starts']}; music {res['music']} from {res['music_start']:.1f}s; "
          f"caption credits: {', '.join(res['credits'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
