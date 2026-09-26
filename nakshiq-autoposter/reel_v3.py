#!/usr/bin/env python3
"""reel_v3.py — spec-driven cinematic reels (2026-09-25 rebuild).

    python3 reel_v3.py check   reel_specs/chikmagalur__sos_rescue.json
    python3 reel_v3.py enqueue reel_specs/chikmagalur__sos_rescue.json
    python3 reel_v3.py status  reel_specs/chikmagalur__sos_rescue.json
    python3 reel_v3.py render  reel_specs/chikmagalur__sos_rescue.json --lang en [--out x.mp4]
                               [--clip s1x=/path.mp4 ...]   # stand-in footage for editing tests

WHY THIS EXISTS. The founder called the v2 reels "pathetic" (2026-09-24) and he
was right on every count we could measure:
  - every clip was generated from text alone, so the light, the car and the
    clothes changed at every cut (text-only probe clips drifted the same way);
  - cuts fell on a 3.53 s metronome, and take 1 / take 2 of the SAME shot were
    cut together, which reads as a jump cut;
  - Veo's own sound was thrown away, a grey title bar and a grey caption strip
    sat on every frame, and edge-tts read the script flat.
The 2026-09-25 Flow probe proved the fix: reference stills + Ingredients to
Video on Veo 3.1 Lite keep the same people, car and blue hour across shots, and
Extend continues a shot seamlessly (probe clips 01/02).

SO A REEL IS NOW A HAND-WRITTEN SPEC (reel_specs/*.json), not a template:
  - the script is the founder's, or one he approved, in both languages;
  - refs: three stills generated once (man, woman, car/place);
  - shots: each "ingredients" (refs + prompt) or "extend" (continues a shot);
  - beats: which shot (and from which second) carries each line of the VO.
This module turns a spec into Veo queue rows for Cowork, and cuts the reel:
picture changes on the voice, one colour grade over everything, native Veo
ambience ducked under ElevenLabs VO, no bars, the logo end card.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
VEO = Path.home() / "Automation" / "nakshiq-veo"
QUEUE = VEO / "veo_queue.json"
CLIPS = VEO / "clips"
VOICE_CACHE = VEO / "voice_cache"
sys.path.insert(0, str(HERE))

LEAD = 0.45        # picture before the first word
TAIL = 1.4         # hold after the last word, before the end card
CUT_EARLY = 0.18   # picture changes just before the next line lands
MIN_SPEED = 0.82   # slow a shot down at most this much before holding its last frame
AMBIENCE = 0.55    # native Veo sound level under the bed
MUSIC = 0.09
DISCLOSE = "Dramatised · AI footage"


# ─── spec ────────────────────────────────────────────────────────────────
def load(path) -> dict:
    s = json.loads(Path(path).read_text())
    s["_path"] = str(path)
    return s


def clip_name(spec: dict, key: str) -> str:
    ext = ".jpg" if key.startswith("ref_") else ".mp4"
    return f"{spec['id']}__{key}{ext}"


def veo_prompt(spec: dict, shot: dict) -> str:
    sound = f" Sound: {shot['sound']}" if shot.get("sound") else ""
    return f"{shot['prompt']}{sound} {spec['look']}"


def check(spec: dict) -> list[str]:
    """Problems that must block a spec. Empty list = good to queue."""
    import storyboard as SB
    errs = []
    shots = {s["id"]: s for s in spec["shots"]}
    refs = {r["name"] for r in spec["refs"]}
    for s in spec["shots"]:
        if s["mode"] == "ingredients":
            missing = set(s.get("refs") or []) - refs
            if not s.get("refs") or missing:
                errs.append(f"{s['id']}: ingredients shot needs refs from {sorted(refs)}")
        elif s["mode"] == "extend":
            if s.get("of") not in shots:
                errs.append(f"{s['id']}: extends unknown shot {s.get('of')!r}")
        else:
            errs.append(f"{s['id']}: unknown mode {s['mode']!r}")
        if SB._NUMBER_ASSERT.search(s["prompt"]):
            errs.append(f"{s['id']}: prompt would put a phone number on screen")
    for b in spec["beats"]:
        if b["shot"] not in shots:
            errs.append(f"beat uses unknown shot {b['shot']!r}")
    for lang, lines in spec["vo"].items():
        if len(lines) != len(spec["beats"]):
            errs.append(f"vo.{lang}: {len(lines)} lines for {len(spec['beats'])} beats")
        for ln in lines:
            if SB._OVERCLAIM.search(ln):
                errs.append(f"vo.{lang}: overclaim in {ln[:50]!r}")
    return errs


def queue_rows(spec: dict) -> list[dict]:
    """Rows for veo_queue.json. Refs first, then shots in spec order, which is
    the order Cowork must generate them in (an extend needs its source)."""
    base = {"slug": spec["slug"], "format": spec["id"], "pipeline": "v3",
            "storyboard": spec["id"], "status": "pending", "take": 1}
    rows = []
    for r in spec["refs"]:
        rows.append(dict(base, clip=clip_name(spec, r["name"]), kind="ref",
                         role=r["name"], prompt=r["prompt"], seconds=0))
    for s in spec["shots"]:
        row = dict(base, clip=clip_name(spec, s["id"]), kind="shot", mode=s["mode"],
                   role=s["id"], prompt=veo_prompt(spec, s), seconds=8)
        if s["mode"] == "ingredients":
            row["refs"] = [clip_name(spec, r) for r in s["refs"]]
        else:
            row["extend_of"] = clip_name(spec, s["of"])
            row["seconds"] = 15
        rows.append(row)
    return rows


def enqueue(spec: dict) -> int:
    q = json.loads(QUEUE.read_text()) if QUEUE.exists() else []
    have = {r["clip"] for r in q}
    new = [r for r in queue_rows(spec) if r["clip"] not in have]
    if new:
        QUEUE.write_text(json.dumps(q + new, indent=2, ensure_ascii=False))
    return len(new)


def status(spec: dict) -> dict:
    q = {r["clip"]: r for r in (json.loads(QUEUE.read_text()) if QUEUE.exists() else [])}
    return {r["clip"]: (q.get(r["clip"]) or {}).get("status", "not queued") for r in queue_rows(spec)}


def ready(spec: dict) -> bool:
    """Every SHOT file on disk (refs are only inputs to generation)."""
    return all((CLIPS / clip_name(spec, s["id"])).exists() for s in spec["shots"])


# ─── voice ───────────────────────────────────────────────────────────────
def voice(spec: dict, lang: str, tdp: Path):
    """ElevenLabs one pass (founder's pick), cached on disk by exact text so a
    re-cut never spends quota twice. Returns (mp3, [(start, dur, line)])."""
    import yt_shorts_v2 as Y
    lines = spec["vo"][lang]
    vid = (os.environ.get("ELEVEN_VOICE_ID_EN") if spec.get("audience") == "foreign"
           else os.environ.get("ELEVEN_VOICE_ID_HI"))
    key = os.environ.get("ELEVENLABS_API_KEY")
    if not (vid and key):
        raise SystemExit("ElevenLabs key/voice missing — run through node --env-file (see module doc)")
    h = hashlib.sha1(json.dumps([vid, Y.ELEVEN_MODEL, Y.ELEVEN_STABILITY, lines]).encode()).hexdigest()[:16]
    VOICE_CACHE.mkdir(parents=True, exist_ok=True)
    mp3, js = VOICE_CACHE / f"{h}.mp3", VOICE_CACHE / f"{h}.json"
    if not (mp3.exists() and js.exists()):
        bounds = Y._synth_eleven("\n\n".join(lines), lines, vid, key, tdp / "vo.mp3")
        if not bounds:
            raise SystemExit("ElevenLabs synthesis failed")
        shutil.copy(tdp / "vo.mp3", mp3)
        js.write_text(json.dumps(bounds))
    return mp3, [tuple(b) for b in json.loads(js.read_text())]


# ─── edit ────────────────────────────────────────────────────────────────
def _dur(p: Path) -> float:
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", str(p)], capture_output=True, text=True)
    return float(r.stdout.strip() or 0)


def _has_audio(p: Path) -> bool:
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "a",
                        "-show_entries", "stream=index", "-of", "csv=p=0", str(p)],
                       capture_output=True, text=True)
    return bool(r.stdout.strip())


def _esc(t: str) -> str:
    return t.replace("\\", "\\\\").replace(":", "\\:").replace("'", "’").replace("%", "\\%")


def _chunks(line: str, n: int = 3) -> list[str]:
    out = []
    for frag in [f.strip() for f in re.split(r"(?<=[.!?…])\s+|\n", line) if f.strip()]:
        w = frag.split()
        out += [" ".join(w[i:i + n]) for i in range(0, len(w), n)]
    return out


def render(spec: dict, lang: str, out: Path, stand_in: dict | None = None,
           music: Path | None = None) -> Path:
    import storyboard as SB
    import yt_shorts_v2 as Y
    stand_in = stand_in or {}
    tdp = Path(tempfile.mkdtemp(prefix="reelv3_"))
    vo, bounds = voice(spec, lang, tdp)
    v_dur = _dur(vo)
    n = len(spec["beats"])
    if len(bounds) != n:
        raise SystemExit(f"voice returned {len(bounds)} beats, spec has {n}")

    # Picture timeline: beat i owns the screen from just before its line to
    # just before the next one. The last beat holds TAIL past the final word.
    starts = [0.0] + [max(0.0, LEAD + bounds[i][0] - CUT_EARLY) for i in range(1, n)]
    total = LEAD + v_dur + TAIL
    # The sound runs on under the logo card: music carries through and fades,
    # rather than the reel ending on 2.4 s of dead air (seen in the 09-25 test).
    full = total + Y.ENDCARD_DUR
    segs = [(starts[i], (starts[i + 1] if i + 1 < n else total) - starts[i]) for i in range(n)]

    shots = {s["id"]: s for s in spec["shots"]}
    ins, vf, af = [], [], []
    for i, (b, (_, seg)) in enumerate(zip(spec["beats"], segs)):
        src = Path(stand_in.get(b["shot"]) or (CLIPS / clip_name(spec, b["shot"])))
        if not src.exists():
            raise SystemExit(f"missing footage for {b['shot']}: {src}")
        frm = float(b.get("from", 0.0))
        avail = max(0.1, _dur(src) - frm)
        speed = 1.0 if avail >= seg else max(MIN_SPEED, avail / seg)
        ins += ["-i", str(src)]
        k = i
        # Scale to 1080x1920 first so every shot shares one grade and grain.
        vf.append(f"[{k}:v]trim=start={frm:.3f}:duration={min(avail, seg * speed):.3f},"
                  f"setpts=(PTS-STARTPTS)/{speed:.4f},fps=30,"
                  f"scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,"
                  f"crop=1080:1920,tpad=stop_mode=clone:stop_duration={seg:.3f},"
                  f"trim=duration={seg:.3f},setpts=PTS-STARTPTS,format=yuv420p[v{i}]")
        if _has_audio(src):
            af.append(f"[{k}:a]atrim=start={frm:.3f}:duration={min(avail, seg):.3f},"
                      f"asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,"
                      f"afade=t=in:d=0.08,apad=whole_dur={seg:.3f},atrim=duration={seg:.3f}[a{i}]")
        else:
            af.append(f"anullsrc=r=48000:cl=stereo,atrim=duration={seg:.3f}[a{i}]")
    vi = len(spec["beats"])
    ins += ["-i", str(vo)]
    mi = None
    if music and Path(music).exists():
        ins += ["-i", str(music)]
        mi = vi + 1

    # Text: the disclosure, and (Hindi reel only) English captions, 1-3 words
    # at a time, bold white with a soft shadow, no box.
    fontsrc = HERE / "assets" / "fonts" / "InstrumentSans-Bold.ttf"
    font = tdp / "f.ttf"
    shutil.copy(fontsrc, font)
    draw = [f"drawtext=fontfile={font}:text='{_esc(DISCLOSE)}':fontsize=26:"
            f"fontcolor=white@0.55:x=44:y=h-86"]
    cap_lang = (spec.get("captions") or {}).get(lang)
    if cap_lang:
        for (st, du, _), line in zip(bounds, spec["vo"][cap_lang]):
            parts = _chunks(line)
            step = du / max(1, len(parts))
            for j, p in enumerate(parts):
                a = LEAD + st + j * step
                draw.append(f"drawtext=fontfile={font}:text='{_esc(p)}':fontsize=64:"
                            f"fontcolor=white:shadowcolor=black@0.7:shadowx=0:shadowy=3:"
                            f"x=(w-text_w)/2:y=h*0.70:enable='between(t,{a:.2f},{a + step:.2f})'")

    fc = ";".join(vf + af)
    fc += ";" + "".join(f"[v{i}]" for i in range(vi)) + f"concat=n={vi}:v=1:a=0[vc]"
    # One grade over the whole reel: shots from different generations sit together.
    fc += (";[vc]eq=contrast=1.05:saturation=0.94:gamma=0.97,"
           "unsharp=5:5:0.35,noise=alls=5:allf=t,vignette=angle=PI/5,"
           + ",".join(draw) + "[vout]")
    fc += (";" + "".join(f"[a{i}]" for i in range(vi)) + f"concat=n={vi}:v=0:a=1,volume={AMBIENCE},"
           f"afade=t=out:st={total - 0.6:.2f}:d=0.6,apad=whole_dur={full:.3f}[amb]")
    fc += (f";[{vi}:a]aresample=48000,aformat=channel_layouts=stereo,"
           f"adelay={int(LEAD * 1000)}|{int(LEAD * 1000)},apad=whole_dur={full:.3f},asplit=2[vo][key]")
    bed = "[amb]"
    if mi is not None:
        fc += (f";[{mi}:a]aresample=48000,aformat=channel_layouts=stereo,aloop=loop=-1:size=2e9,"
               f"atrim=duration={full:.3f},afade=t=in:d=1.0,afade=t=out:st={full - 2.2:.2f}:d=2.2,"
               f"volume={MUSIC}[mus];[amb][mus]amix=inputs=2:normalize=0[bedmix]")
        bed = "[bedmix]"
    # Native sound and music duck under the voice, then everything is levelled.
    fc += (f";{bed}[key]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=350[duck]"
           f";[vo][duck]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,"
           f"atrim=duration={full:.3f},asplit=2[aout][afull]")

    out.parent.mkdir(parents=True, exist_ok=True)
    full_wav = tdp / "full.wav"
    cmd = ["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", fc,
           "-map", "[vout]", "-map", "[aout]", "-c:v", "libx264", "-preset", "slow",
           "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
           "-ar", "48000", "-movflags", "+faststart", "-t", f"{total:.3f}", str(out),
           "-map", "[afull]", "-c:a", "pcm_s16le", str(full_wav)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise SystemExit("ffmpeg failed:\n" + r.stderr[-1500:])
    # English goes to YouTube (@naksh-iq), Hindi to Instagram (@nakshiq).
    os.environ.setdefault("NAKSHIQ_ENDCARD_CTA",
                          "follow @naksh-iq" if lang == "en" else "follow @nakshiq")
    if Y._append_endcard(out, tdp):
        mixed = tdp / "mixed.mp4"
        r = subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(out), "-i", str(full_wav),
                            "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac",
                            "-b:a", "192k", "-shortest", "-movflags", "+faststart", str(mixed)],
                           capture_output=True, text=True)
        if r.returncode == 0:
            shutil.move(str(mixed), str(out))
    shutil.rmtree(tdp, ignore_errors=True)
    return out


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["check", "enqueue", "status", "render"])
    ap.add_argument("spec")
    ap.add_argument("--lang", default="en")
    ap.add_argument("--out")
    ap.add_argument("--music")
    ap.add_argument("--clip", action="append", default=[],
                    help="stand-in footage for an editing test: SHOT=/path.mp4")
    a = ap.parse_args()
    spec = load(a.spec)
    errs = check(spec)
    if a.cmd == "check":
        print("\n".join(errs) or "spec OK")
        raise SystemExit(1 if errs else 0)
    if errs:
        raise SystemExit("spec has problems:\n" + "\n".join(errs))
    if a.cmd == "enqueue":
        print(f"queued {enqueue(spec)} new row(s)")
    elif a.cmd == "status":
        for k, v in status(spec).items():
            print(f"{v:<12} {k}")
    else:
        import storyboard as SB
        stand = dict(x.split("=", 1) for x in a.clip)
        music = Path(a.music) if a.music else SB.pick_music(spec.get("format", ""), spec["slug"])
        out = Path(a.out) if a.out else VEO / "reels" / f"{spec['id']}__{a.lang}.mp4"
        print(f"[reel_v3] wrote {render(spec, a.lang, out, stand, music)}")
