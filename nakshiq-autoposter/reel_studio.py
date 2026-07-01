#!/usr/bin/env python3
"""
reel_studio.py — NakshIQ verified-data REEL engine (Phase 3, 2026-07-01).

Multi-clip vertical reels (1080x1920) built from verified data, in the
travel_bysubhash "N-day plan" style the founder validated. No voiceover →
TRENDY music (founder rule); the emotional driver is footage + music + text.

v1 format: ITINERARY (from the `routes` catalog — name / days / ordered stops).
Each stop = its destination's R2 hero clip + a text overlay; music is fetched
from a baked list of no-attribution CDN URLs (Mixkit Free + Pixabay) at build
time, so nothing has to be hosted in R2 or committed to the repo (avoids bloat
and needs no R2 write creds on the GHA runner). Zero fabrication — every stop,
name and tagline comes from the DB.

Publishing + logging is done by autoposter.run_reel_studio(); this file only
produces the video BYTES + a caption. build(content, fmt) returns None if the
data is too thin (caller falls through / skips the slot).
"""
from __future__ import annotations
import os, io, subprocess, shutil, textwrap, hashlib
from pathlib import Path
from datetime import datetime

try:
    import requests
except Exception:  # pragma: no cover
    requests = None

HERE = Path(__file__).parent
FONTS = HERE / "assets" / "fonts"
R2_VIDEO = "https://pub-bcda9bac2f63408880ee3f23aa3548e5.r2.dev"
WORK = Path("/tmp/nakshiq_reel"); WORK.mkdir(parents=True, exist_ok=True)
CLIPS = WORK / "clips"; CLIPS.mkdir(exist_ok=True)
FF = shutil.which("ffmpeg") or "ffmpeg"
FFPROBE = shutil.which("ffprobe") or "ffprobe"

W, H, FPS = 1080, 1920, 30
GOLD = "0xF4B740"; WHITE = "white"; SAND = "0xEAD9B0"; STEEL = "0xBFC9D6"; ICE = "0xE6ECF3"

BOLD = "InstrumentSans-Bold.ttf"; MONO = "JetBrainsMono-Bold.ttf"; SERIF = "CrimsonPro-BoldItalic.ttf"

# No-attribution, monetization-safe music (validated 2026-07-01). Fetched one at
# build time — no hosting/creds needed. Trendy = house/EDM (Mixkit + Pixabay),
# calm = ambient (Pixabay) for any future voiceover reels.
MUSIC = {
    "trendy": [
        "https://assets.mixkit.co/music/623/623.mp3",
        "https://assets.mixkit.co/music/474/474.mp3",
        "https://assets.mixkit.co/music/181/181.mp3",
        "https://assets.mixkit.co/music/180/180.mp3",
        "https://assets.mixkit.co/music/197/197.mp3",
        "https://assets.mixkit.co/music/186/186.mp3",
        "https://assets.mixkit.co/music/775/775.mp3",
        "https://assets.mixkit.co/music/106/106.mp3",
        "https://assets.mixkit.co/music/745/745.mp3",
        "https://assets.mixkit.co/music/674/674.mp3",
        "https://cdn.pixabay.com/audio/2026/06/27/audio_8ce3619bb8.mp3",
        "https://cdn.pixabay.com/audio/2026/06/23/audio_c7fc36928f.mp3",
        "https://cdn.pixabay.com/audio/2026/06/23/audio_05d413e03b.mp3",
        "https://cdn.pixabay.com/audio/2026/06/23/audio_34f3dc4a22.mp3",
    ],
    "calm": [
        "https://cdn.pixabay.com/audio/2026/06/10/audio_46281ca3ee.mp3",
        "https://cdn.pixabay.com/audio/2026/06/09/audio_c02888c61c.mp3",
        "https://cdn.pixabay.com/audio/2026/06/04/audio_683ceeb786.mp3",
        "https://cdn.pixabay.com/audio/2026/05/07/audio_79142a6adb.mp3",
    ],
}

for _f in (BOLD, MONO, SERIF):
    src = FONTS / _f
    if src.exists() and not (WORK / _f).exists():
        shutil.copy(src, WORK / _f)


def _rows(content, key):
    node = (content or {}).get(key) or {}
    return node.get("data", []) if isinstance(node, dict) else (node or [])


def _fetch_clip(slug):
    if not slug or requests is None:
        return None
    dst = CLIPS / f"{slug}.mp4"
    if dst.exists() and dst.stat().st_size > 10000:
        return dst
    try:
        r = requests.get(f"{R2_VIDEO}/{slug}.mp4", timeout=45, stream=True)
        if r.status_code != 200:
            return None
        with open(dst, "wb") as fh:
            for c in r.iter_content(65536):
                fh.write(c)
    except Exception:
        return None
    return dst if dst.exists() and dst.stat().st_size > 10000 else None


def _fetch_music(voiceover: bool, seed: str):
    pool = MUSIC["calm"] if voiceover else MUSIC["trendy"]
    if not pool or requests is None:
        return None
    idx = int(hashlib.md5(seed.encode()).hexdigest(), 16) % len(pool)
    for off in range(len(pool)):  # try in order from the seeded index (resilient)
        url = pool[(idx + off) % len(pool)]
        dst = WORK / ("music_" + hashlib.md5(url.encode()).hexdigest()[:10] + ".mp3")
        if dst.exists() and dst.stat().st_size > 30000:
            return dst
        try:
            r = requests.get(url, timeout=40)
            if r.status_code == 200 and len(r.content) > 30000:
                dst.write_bytes(r.content)
                return dst
        except Exception:
            continue
    return None


# ── drawtext helpers (tofu-safe: one drawtext per wrapped line, textfiles read raw) ──
_LN = [0]


def _dtext(textfile=None, text=None, font=BOLD, size=54, color=WHITE, x="(w-tw)/2",
           y="0", shadow=True, box=False, boxalpha=0.5, borderw=0):
    parts = [f"fontfile={font}", f"fontsize={size}", f"fontcolor={color}", f"x={x}", f"y={y}"]
    if textfile:
        parts.append(f"textfile={textfile}")
    else:
        # escape backslash FIRST, then ffmpeg-special ':' and '%' (drawtext expands
        # %{...}); strip quotes. Prevents a name like "100% off" / "Devil's" from
        # corrupting or dropping the whole text layer. (2026-07-01 audit MEDIUM)
        t = (text or "").replace("\\", "\\\\").replace("%", "\\%").replace(":", "\\:").replace("'", "")
        parts.append("text='" + t + "'")
    if shadow:
        parts += ["shadowcolor=black@0.85", "shadowx=3", "shadowy=4"]
    if borderw:
        parts += [f"borderw={borderw}", "bordercolor=black@0.9"]
    if box:
        parts += ["box=1", f"boxcolor=black@{boxalpha}", "boxborderw=22"]
    return "drawtext=" + ":".join(parts)


def _dtext_lines(text, width, font, size, color, y, center=True, x_left=46, line_h=None, **kw):
    lines = textwrap.wrap(text or "", width)[:3]
    lh = line_h or int(size * 1.2)
    out = []
    for i, ln in enumerate(lines):
        _LN[0] += 1
        f = WORK / f"_ln{_LN[0]}.txt"
        f.write_text(ln, encoding="utf-8")
        x = "(w-tw)/2" if center else str(x_left)
        out.append(_dtext(textfile=f, font=font, size=size, color=color, x=x, y=str(int(y) + i * lh), **kw))
    return out


def _segment(clip, dur, drawtexts, out, dim_all=0.05):
    filt = [f"scale={W}:{H}:force_original_aspect_ratio=increase", f"crop={W}:{H}", "setsar=1"]
    if dim_all:
        filt.append(f"eq=brightness=-{dim_all}")
    filt.append(f"drawbox=x=0:y={H-760}:w={W}:h=760:color=black@0.30:t=fill")
    filt.append(f"drawbox=x=0:y={H-480}:w={W}:h=480:color=black@0.42:t=fill")
    filt.append(f"drawbox=x=0:y=0:w={W}:h=300:color=black@0.28:t=fill")
    filt += drawtexts
    filt.append(f"fps={FPS}")
    cmd = [FF, "-y", "-stream_loop", "-1", "-t", f"{dur}", "-i", str(clip),
           "-vf", ",".join(filt), "-an", "-c:v", "libx264", "-preset", "medium",
           "-crf", "20", "-pix_fmt", "yuv420p", "-r", str(FPS), str(out)]
    subprocess.run(cmd, capture_output=True, text=True, cwd=str(WORK))
    return out.exists()


def _month_long(m=None):
    return datetime(2000, m or datetime.now().month, 1).strftime("%B")


def _render(cover, stops, end, primary, voiceover=False):
    """cover={title,subtitle,season,hook,clip}; stops=[{label,place,line,clip}]; end={headline,clip}."""
    _LN[0] = 0
    segs = []
    # cover — adaptive title (wrap + size to fit any route/dest name), dynamic layout
    tl = (cover["title"] or "").upper()
    tsize = 140 if len(tl) <= 9 else (108 if len(tl) <= 15 else 82)
    twidth = 11 if tsize >= 108 else 15
    tlh = int(tsize * 1.08)
    ty = 660
    dts = _dtext_lines(tl, twidth, BOLD, tsize, WHITE, ty, center=True, borderw=6, line_h=tlh)
    ycur = ty + max(1, len(textwrap.wrap(tl, twidth))) * tlh + 24
    dts.append(_dtext(text=cover["subtitle"], font=BOLD, size=54, color=GOLD, y=str(ycur)))
    ycur += 84
    if cover.get("season"):
        dts.append(_dtext(text=cover["season"], font=MONO, size=42, color=WHITE, y=str(ycur), box=True, boxalpha=0.55))
        ycur += 96
    dts += _dtext_lines(cover.get("hook", ""), 30, SERIF, 50, SAND, ycur + 6, center=True)
    dts.append(_dtext(text="NAKSHIQ", font=BOLD, size=38, color=WHITE, x="46", y=str(H - 90)))
    cov = WORK / "seg_cover.mp4"
    if not _segment(cover["clip"], 2.6, dts, cov):
        return None
    segs.append(cov)
    # stops
    n = len(stops)
    for i, s in enumerate(stops, 1):
        dts = [
            _dtext(text=s.get("label", f"STOP {i}"), font=MONO, size=50, color=GOLD, x="46", y="70"),
            _dtext(text=f"{i} / {n}", font=MONO, size=40, color=STEEL, x="w-tw-46", y="80"),
            _dtext(text=s["place"], font=BOLD, size=100, color=WHITE, x="46", y=str(H - 430), borderw=5),
        ]
        if s.get("line"):
            dts += _dtext_lines(s["line"], 30, BOLD, 48, ICE, H - 300, center=False, x_left=46)
        dts.append(_dtext(text="nakshiq.com", font=BOLD, size=34, color=GOLD, x="w-tw-46", y=str(H - 70)))
        seg = WORK / f"seg_{i}.mp4"
        if not _segment(s["clip"], 3.1, dts, seg):
            return None
        segs.append(seg)
    # end
    dts = _dtext_lines(end["headline"], 24, BOLD, 66, WHITE, 760, center=True, borderw=4)
    dts.append(_dtext(text="full plan → nakshiq.com", font=BOLD, size=46, color=GOLD, y=str(H - 360), box=True, boxalpha=0.5))
    dts.append(_dtext(text="NAKSHIQ", font=BOLD, size=40, color=WHITE, x="46", y=str(H - 90)))
    endseg = WORK / "seg_end.mp4"
    if not _segment(end["clip"], 2.8, dts, endseg):
        return None
    segs.append(endseg)

    # concat
    listf = WORK / "list.txt"
    listf.write_text("".join(f"file '{s}'\n" for s in segs), encoding="utf-8")
    silent = WORK / "silent.mp4"
    subprocess.run([FF, "-y", "-f", "concat", "-safe", "0", "-i", str(listf), "-c", "copy", str(silent)],
                   capture_output=True, text=True, cwd=str(WORK))
    if not silent.exists():
        return None
    try:
        dur = float(subprocess.run([FFPROBE, "-v", "error", "-show_entries", "format=duration",
                                    "-of", "default=nk=1:nw=1", str(silent)],
                                   capture_output=True, text=True).stdout.strip())
    except Exception:
        dur = 21.0
    music = _fetch_music(voiceover, primary or "nakshiq")
    out = WORK / "reel.mp4"
    if music:
        vol = "0.18" if voiceover else "0.72"
        fo = max(0.5, dur - 1.3)
        subprocess.run([FF, "-y", "-i", str(silent), "-stream_loop", "-1", "-i", str(music),
                        "-filter_complex", f"[1:a]atrim=0:{dur},afade=t=in:st=0:d=0.8,afade=t=out:st={fo}:d=1.3,volume={vol}[a]",
                        "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
                        "-shortest", str(out)], capture_output=True, text=True, cwd=str(WORK))
    if not music or not out.exists():
        shutil.copy(silent, out)  # never fail for lack of music
    return (out.read_bytes(), round(dur, 1)) if out.exists() else None


# ── FORMAT: itinerary (from routes) ──────────────────────────────────────────
def build_itinerary(content: dict, month: int | None = None, used_ids: set | None = None) -> dict | None:
    used_ids = used_ids or set()
    routes = _rows(content, "routes")
    dmap = {d.get("id"): d for d in (_rows(content, "destinations_full") or _rows(content, "destinations"))}

    def resolve(s):
        # stops may be slug strings (text[] in DB) OR dicts keyed destination_id/id.
        # (2026-07-01 audit HIGH: dict stops used the wrong key → 0 reels forever.)
        if isinstance(s, dict):
            sid = (s.get("id") or s.get("destination_id") or "").strip()
            fb_name = (s.get("name") or "").strip()
            fb_line = (s.get("tagline") or s.get("note") or "").strip()
        else:
            sid = str(s).strip(); fb_name = ""; fb_line = ""
        if not sid:
            return None
        clip = _fetch_clip(sid)          # a stop with no footage is skipped
        if not clip:
            return None
        d = dmap.get(sid) or {}
        return {"place": (d.get("name") or fb_name or sid), "clip": clip,
                "line": ((d.get("tagline") or fb_line or "")[:70]), "id": sid}

    for r in routes:
        # canonical dedup key — computed identically here and stored as route_id
        # below so the check can never miss the store. (2026-07-01 audit MEDIUM)
        rid = r.get("id") or (r.get("name") or r.get("title") or "").strip()
        if rid and rid in used_ids:
            continue
        raw = r.get("stops") or []
        stops = [x for x in (resolve(s) for s in raw) if x][:5]
        if len(stops) < 3:
            continue
        rname = (r.get("name") or r.get("title") or "").strip()
        days = r.get("days") or r.get("duration_days")
        for i, st in enumerate(stops, 1):
            st["label"] = f"DAY {i}"
        cover = {
            "title": rname,
            "subtitle": (f"PERFECT {days}-DAY PLAN" if days else "THE PERFECT ROUTE"),
            "season": None,
            "hook": f"{rname} — the stops, in the right order",
            "clip": stops[0]["clip"],
        }
        end = {"headline": f"The full {rname} plan, free", "clip": stops[0]["clip"]}
        rendered = _render(cover, stops, end, stops[0]["id"], voiceover=False)
        if not rendered:
            continue
        video_bytes, dur = rendered
        place_list = " → ".join(s["place"] for s in stops)
        caption = (f"{rname} — the perfect" + (f" {days}-day" if days else "") + " route 🗺️\n\n"
                   f"Save this. The stops, in the right order:\n{place_list}\n\n"
                   "Full day-by-day plan, drive times and where to stay — free, verified, no ads → nakshiq.com\n\n"
                   "#indiatravel #itinerary #roadtrip #traveltips #incredibleindia")
        return {
            "format": "itinerary", "video_bytes": video_bytes,
            "video_filename": f"itinerary_{(r.get('id') or 'route')}.mp4",
            "caption": caption, "ig_caption": caption, "duration": dur,
            "primary_dest_id": stops[0]["id"], "route_id": rid,
        }
    return None


BUILDERS = {"itinerary": build_itinerary}
FORMAT_ROTATION = ["itinerary"]


def build(content: dict, fmt: str = "itinerary", month: int | None = None, used_ids: set | None = None) -> dict | None:
    fn = BUILDERS.get(fmt)
    return fn(content, month=month, used_ids=used_ids) if fn else None
