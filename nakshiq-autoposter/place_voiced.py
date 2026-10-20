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
MUSIC_DIR = HERE / "assets" / "music_travel"
MUSIC = "travel-pop-07-94"     # ~117 bpm pop; picked 2026-10-20 for "trendy", not the calm house themes
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


def render(script: Path, out: Path, music: str = MUSIC, today: date | None = None, subs: str = "none") -> dict:
    import reel_v3 as R
    s = json.loads(script.read_text())
    slug, lines, scenes = s["slug"], s["vo"]["hi"], s["scenes"]
    if len(scenes) != len(lines):
        raise SystemExit(f"{script.name}: {len(lines)} voice lines but {len(scenes)} scenes")
    f = P.facts_map_reveal(slug, today or date.today())       # map pin, place facts, the real photo + credit
    w = P.WORK / f"{s['id']}__voiced"
    if w.exists():
        shutil.rmtree(w)
    (w / "assets").mkdir(parents=True)
    for fn in ("package.json", "hyperframes.json"):
        shutil.copy(P.PROJECT / fn, w / fn)
    shutil.copy(P.PROJECT / "gsap.min.js", w / "assets" / "gsap.min.js")

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
    src = MUSIC_DIR / f"{music}.mp3"
    _ff("-i", str(src), "-i", str(w / "assets" / "vo.mp3"), "-filter_complex",
        f"[0:a]atrim=0:{total},asetpts=PTS-STARTPTS,loudnorm=I=-16:TP=-2,volume=0.55,"
        f"afade=t=in:d=0.3,afade=t=out:st={total - 1.6}:d=1.6[m];"
        f"[1:a]atempo={sp},adelay={int(LEAD * 1000)}|{int(LEAD * 1000)},loudnorm=I=-15:TP=-1.5,apad=whole_dur={total}[v];"
        f"[v]asplit=2[v1][v2];[m][v1]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=350[md];"
        f"[md][v2]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[out]",
        "-map", "[out]", "-t", str(total), "-c:a", "aac", "-b:a", "192k", str(w / "assets" / "mix.m4a"))

    # 3 pictures: the real photo, and any Veo clip slowed to cover its line
    P._photo(f["photo"], w / "assets" / "photo.jpg")
    media, blocks, anim = [], [], []
    authors = [(f.get("commons") or [{}])[0].get("author")]
    pans = {"photo": ("50% 40%", 1.0, 1.12), "photo2": ("20% 60%", 1.15, 1.28), "photo3": ("80% 30%", 1.1, 1.22),
            "end": ("50% 50%", 1.2, 1.3)}
    for i, sc in enumerate(scenes):
        st, du = starts[i], round(ends[i] - starts[i], 2)
        bg = sc.get("bg", "photo")
        if bg.startswith("clip:"):
            clip = P.CLIPS / bg[5:]
            slow = max(1.0, du / _dur(clip))
            if slow > MAX_SLOW:
                raise SystemExit(f"scene {i + 1}: {clip.name} is {_dur(clip):.1f}s for a {du:.1f}s line (more than {MAX_SLOW}x slow)")
            _ff("-i", str(clip), "-an", "-vf", f"setpts={slow:.4f}*PTS,fps=30,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920",
                "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", str(w / "assets" / f"c{i}.mp4"))
            media.append(f'<video id="bg{i}" class="clip bg" src="assets/c{i}.mp4" data-start="{st}" data-duration="{du}" '
                         f'data-media-start="0" data-track-index="0" muted playsinline></video>')
        elif bg.startswith("photo:"):          # "photo:<commons query>|<words the title must hold>"
            q, _, must = bg[6:].partition("|")
            c = _extra_photo(slug, q, must or q)
            if not c:
                raise SystemExit(f"scene {i + 1}: no Commons photo for {q!r}")
            P._photo(Path(c["file"]), w / "assets" / f"p{i}.jpg")
            authors.append(c.get("author"))
            media.append(f'<img id="bg{i}" class="clip bg" src="assets/p{i}.jpg" alt="" data-start="{st}" data-duration="{du}" data-track-index="0" />')
            anim.append(f'tl.fromTo("#bg{i}", {{scale:1.04, transformOrigin:"50% 45%"}}, {{scale:1.16, duration:{du}, ease:"none"}}, {st});')
        elif bg in pans:
            org, a, b = pans[bg]
            media.append(f'<img id="bg{i}" class="clip bg" src="assets/photo.jpg" alt="" data-start="{st}" data-duration="{du}" data-track-index="0" />')
            anim.append(f'tl.fromTo("#bg{i}", {{scale:{a}, transformOrigin:"{org}"}}, {{scale:{b}, duration:{du}, ease:"none"}}, {st});')
        if bg not in ("map", "end"):
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
    for k, v in rep.items():
        html = html.replace("{{" + k + "}}", str(v))
    (w / "index.html").write_text(html)
    out.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(["npx", "--yes", P.HF, "render", str(w), "-o", str(out), "--quiet", "--no-best-effort"],
                       capture_output=True, text=True)
    if r.returncode != 0 or not out.exists():
        raise SystemExit("hyperframes render failed: " + (r.stderr or r.stdout)[-600:])
    return {"file": str(out), "seconds": total, "starts": starts, "facts": f,
            "credits": list(dict.fromkeys(a for a in authors if a))}


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["render"])
    ap.add_argument("script")
    ap.add_argument("--out")
    ap.add_argument("--music", default=MUSIC)
    ap.add_argument("--subs", default="none", help="none | hinglish | en (the script's subs block)")
    a = ap.parse_args(argv)
    sp = Path(a.script)
    tag = "" if a.subs == "none" else f"__{a.subs}"
    out = Path(a.out) if a.out else P.VEO / "reels" / f"{sp.stem}__voiced{tag}.mp4"
    res = render(sp, out, a.music, subs=a.subs)
    print(f"[place_voiced] {out} ({res['seconds']:.1f}s) scenes at {res['starts']}; caption credits: {', '.join(res['credits'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
