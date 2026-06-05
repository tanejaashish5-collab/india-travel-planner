"""
yt_shorts_v2.py — NakshIQ "NakshIQ Score" narrated Shorts (v2)
================================================================
The v2 upgrade over yt_shorts_gen.py. One repeatable series:
  "Should you go to <X> right now?" — a 22-28s Hinglish-voiced,
  word-by-word-captioned, fast-hook Short built from the real
  destination data moat (month score + road/crowd/weather/hospital/cell).

What changed vs v1 (and WHY):
  - VOICE: edge-tts Indian-English female (en-IN-Neerja), FREE, no API key,
    runs unattended on GitHub Actions. v1 had no voice at all.
  - SCRIPT: hand-authored Hinglish (NO paid LLM API — per founder 2026-06-04).
    A small bank of scripts in data/yt_scripts/<slug>.json; a template
    fallback builds one from the intel when a slug has no hand-written script.
  - CAPTIONS: word-by-word, burned in via libass. Timing derived from
    edge-tts sentence boundaries (split across words by length) — no
    faster-whisper model needed. v1 text was static drawtext that just
    appeared.
  - HOOK: 0.7s zoom-burst on the best clip frame + the score slamming in;
    payoff (the score) lands by ~0:04. v1 opened on a static 4s title card.
  - MUSIC: ducked to a low bed under the voice (volume 0.13). Real
    royalty-free tracks replace the numpy synth (see data/yt_scripts/README).

This module is standalone-runnable for PREVIEW (no posting):
    python3 yt_shorts_v2.py --slug lolab-valley --preview
It deliberately does NOT import yt_shorts_gen (which pulls R2/boto on import).
Production wiring into autoposter happens only after founder sign-off.
"""

from __future__ import annotations

import argparse
import asyncio
import glob
import json
import os
import shutil
import subprocess
import tempfile
from datetime import date, datetime
from pathlib import Path
from typing import Optional

HERE = Path(__file__).parent
VIDEOS_DIR = HERE.parent / "videos"
FONT_DIR = HERE / "assets" / "fonts"
MUSIC_DIR = HERE / "assets" / "yt_music"
SCRIPTS_DIR = HERE / "data" / "yt_scripts"

REEL_W, REEL_H = 1080, 1920
FPS = 30

# Brand palette (mirrors slide_gen.py)
INK_DEEP = "161614"
BONE = "F5F1E8"
VERMILLION = "E55642"
SAFFRON = "D4883A"
SAGE = "5C6B5A"
GREEN = "4CAF50"

# Voice (free default = edge-tts)
VOICE = "en-IN-NeerjaNeural"   # Hinglish female; "en-IN-NeerjaExpressiveNeural" = more energy
VOICE_RATE = "+14%"            # Shorts want pace; +14% keeps Neerja crisp without chipmunking

# ── Voice profiles (the 4 tuned Hindi deliveries, mapped to content mood) ──
# Set a script's meta "voice_profile" to one of these keys. Mapping logic for
# the daily series: BRIGHT = hype / go-now / hidden-gem; DEEP = gravitas /
# warnings / famous-epic. Alternate male/female across days for variety.
VOICE_PROFILES = {
    "madhur_deep":   {"voice": "hi-IN-MadhurNeural", "rate": "+8%",  "pitch": "-12Hz"},  # epic / authority
    "madhur_bright": {"voice": "hi-IN-MadhurNeural", "rate": "+15%", "pitch": "+18Hz"},  # adventure / energy
    "swara_deep":    {"voice": "hi-IN-SwaraNeural",  "rate": "+8%",  "pitch": "-8Hz"},   # warning / serious
    "swara_bright":  {"voice": "hi-IN-SwaraNeural",  "rate": "+18%", "pitch": "+22Hz"},  # gem / aspirational
}

# ── Optional ElevenLabs premium voice ─────────────────────────────────
# When ELEVENLABS_API_KEY + a voice id (ELEVEN_VOICE_ID env, script meta
# "eleven_voice_id", or --eleven-voice) are present, narration uses the
# ElevenLabs voice instead of edge-tts. Captions stay romanized; timing comes
# from ElevenLabs char-level timestamps. Free tier works for PREVIEW only —
# live/commercial use needs the ~$5/mo Starter plan (commercial license, no
# forced "elevenlabs.io" title tag). Key/voice id live in .env.local (gitignored).
ELEVEN_TTS_URL = "https://api.elevenlabs.io/v1/text-to-speech/{vid}/with-timestamps"
ELEVEN_MODEL = "eleven_multilingual_v2"   # supports Hindi; turbo_v2_5 = half-credits, lower quality


def _load_env_local():
    """Mirror the autoposter's .env.local loader so ELEVENLABS_API_KEY /
    ELEVEN_VOICE_ID can live in the gitignored env file."""
    f = HERE / ".env.local"
    if not f.exists():
        return
    for line in f.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


_load_env_local()

LEAD = 0.65    # seconds of visual hook before the voice starts
TAIL = 1.9     # seconds of CTA hold after the voice ends


def _format_score(raw) -> str:
    """Raw 1-5 API score -> website '10/10' display string (score x2)."""
    try:
        if raw in (None, ""):
            return "—"
        return f"{int(raw) * 2}/10"
    except (TypeError, ValueError):
        return "—"


# ─────────────────────────────────────────────────────────────────────────
# 1. SCRIPT  (hand-authored Hinglish — no paid LLM API)
# ─────────────────────────────────────────────────────────────────────────

def _resolve_spec(slug: str, dest: dict) -> dict:
    """Return the full script spec: {lines (Devanagari voice), caption_lines
    (romanized on-screen), voice_profile, ...}. Hand-written bank file wins;
    otherwise a deterministic tone-B template built from real intel."""
    f = SCRIPTS_DIR / f"{slug}.json"
    if f.exists():
        try:
            data = json.loads(f.read_text())
            if data.get("lines"):
                return data
        except Exception:
            pass
    return _template_spec(dest)


def load_script(slug: str, dest: dict) -> list[str]:
    """Back-compat helper for the CLI: just the voice lines."""
    return _resolve_spec(slug, dest).get("lines", [])


def _profile_for(dest: dict) -> str:
    """Pick a voice profile by score band, alternating male/female by slug so
    consecutive days vary. BRIGHT = go-now/gem (score >= 8/10), DEEP = warning."""
    raw = dest.get("score") or 3
    even = (sum(ord(c) for c in (dest.get("id") or "x")) % 2 == 0)
    if raw >= 4:                       # 8/10+ -> hype/go-now
        return "swara_bright" if even else "madhur_bright"
    return "swara_deep" if even else "madhur_deep"   # <= 6/10 -> serious/warning


def _template_spec(dest: dict) -> dict:
    """Deterministic tone-B (bold/dramatic) script from real intel — the
    unattended fallback when a destination has no hand-written script.

    VOICE lines are Devanagari frames (correct Hindi pronunciation) with English
    place names / numerals slotted in; CAPTIONS are the romanized mirror. Each
    line is ONE sentence so edge-tts boundaries map 1:1 to caption_lines.
    Uses only real data points (no fabrication)."""
    name = dest.get("name") or dest.get("id") or "Yeh jagah"
    state = dest.get("state", "")
    raw = dest.get("score") or 3
    disp = _format_score(raw)                       # "10/10" etc.
    intel = dest.get("intel") or {}
    sleep = intel.get("sleep") or {}
    net = intel.get("network") or {}
    wx = intel.get("weather_night") or {}
    reach = intel.get("reach") or {}
    note = (dest.get("note") or dest.get("tagline") or "").strip().rstrip(".")

    nets = [k for k in ("jio", "airtel", "bsnl", "vi") if net.get(k)]
    price = sleep.get("price_range_inr")
    lo, hi = wx.get("summer_low_c"), wx.get("summer_high_c")
    near = (reach.get("from_nearest_city") or "").split(".")[0].strip()

    lines, caps = [], []

    def add(dev, cap):
        lines.append(dev)
        caps.append(cap)

    if raw >= 4:
        # GO-NOW / GEM
        add(f"{name} — {state} की वो जगह जिसका जून score है पूरा {disp}।",
            f"{name} — June score poora {disp}")
        add("और ज़्यादातर लोगों को इसके बारे में पता ही नहीं।",
            "Aur zyaadatar logon ko pata hi nahi")
        # one strong intel beat
        if len(nets) == 1:
            add(f"यहाँ सिर्फ़ {nets[0].upper()} चलता है — पूरा digital detox।",
                f"Yahan sirf {nets[0].upper()} — poora digital detox")
        elif price:
            add(f"और रुकना भी सस्ता — होमस्टे सिर्फ़ {price} रुपये से।",
                f"Homestay sirf {price} se")
        elif lo is not None and hi is not None:
            add(f"दिन में मौसम {lo} से {hi} डिग्री — बिलकुल perfect।",
                f"Mausam {lo} se {hi} degree — perfect")
        elif near:
            add(f"और ये है {near} से बस कुछ ही घंटे दूर।",
                f"{near} se kuch hi ghante door")
        add("ये जगह वायरल होने से पहले, सेव कर लीजिए।",
            "Ye jagah viral hone se pehle — save karo")
    else:
        # WARNING / WAIT
        add(f"{name} का प्लान बना रहे हो? जून में ज़रा रुको।",
            f"{name} ka plan? June mein ruko")
        add(f"इसका जून का NakshIQ score सिर्फ़ {disp}।",
            f"June ka score — sirf {disp}")
        if note:
            short = note.split(".")[0][:70]
            add(f"वजह — {short}।", f"Wajah — {short}")
        elif lo is not None and hi is not None:
            add(f"मौसम {lo} से {hi} डिग्री — सही नहीं अभी।",
                f"Mausam {lo} se {hi} degree — sahi nahi abhi")
        add("बेहतर महीना देखो NakshIQ पे, फिर जाओ।",
            "Behtar mahina dekho NakshIQ pe")

    return {
        "lines": lines[:5],
        "caption_lines": caps[:5],
        "voice_profile": _profile_for(dest),
        "generated": True,
    }


# ─────────────────────────────────────────────────────────────────────────
# 2. VOICE  (edge-tts + word timing from sentence boundaries)
# ─────────────────────────────────────────────────────────────────────────

async def _synth(text: str, out_mp3: Path, voice: str = VOICE, rate: str = VOICE_RATE,
                 pitch: str = "+0Hz"):
    import edge_tts
    c = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
    audio = bytearray()
    bounds = []  # (start_s, dur_s, text)
    async for ch in c.stream():
        if ch["type"] == "audio":
            audio += ch["data"]
        elif ch["type"] in ("SentenceBoundary", "WordBoundary"):
            bounds.append((ch["offset"] / 1e7, ch["duration"] / 1e7, ch["text"]))
    out_mp3.write_bytes(bytes(audio))
    return bounds


def _synth_eleven(text: str, lines: list, voice_id: str, api_key: str,
                  out_mp3: Path) -> list:
    """ElevenLabs TTS with char-level timestamps. Writes mp3 and returns
    per-sentence bounds [(start_s, dur_s, sentence)] mapped from the alignment,
    so the caption pipeline (caption_lines) works unchanged. [] on failure."""
    import base64
    import requests
    url = ELEVEN_TTS_URL.format(vid=voice_id)
    try:
        r = requests.post(
            url, params={"output_format": "mp3_44100_128"},
            headers={"xi-api-key": api_key, "Content-Type": "application/json"},
            json={"text": text, "model_id": ELEVEN_MODEL}, timeout=90)
    except Exception as e:
        print(f"ElevenLabs request error: {e}")
        return []
    if r.status_code != 200:
        print(f"ElevenLabs HTTP {r.status_code}: {r.text[:300]}")
        return []
    data = r.json()
    b64 = data.get("audio_base64")
    if not b64:
        print("ElevenLabs: no audio in response")
        return []
    out_mp3.write_bytes(base64.b64decode(b64))
    al = data.get("alignment") or data.get("normalized_alignment") or {}
    chars = al.get("characters") or []
    starts = al.get("character_start_times_seconds") or []
    ends = al.get("character_end_times_seconds") or []
    if not chars or not starts:
        return [(0.0, _audio_dur(out_mp3), " ".join(lines))]
    full = "".join(chars)
    bounds, cursor = [], 0
    for ln in lines:
        idx = full.find(ln, cursor)
        if idx < 0:
            idx = full.find(ln)
        if idx < 0:
            continue
        s, e = idx, idx + len(ln) - 1
        st = starts[s] if s < len(starts) else 0.0
        en = ends[e] if e < len(ends) else (ends[-1] if ends else st)
        bounds.append((round(st, 2), round(max(0.05, en - st), 2), ln))
        cursor = e + 1
    return bounds or [(0.0, _audio_dur(out_mp3), " ".join(lines))]


def _word_cues(bounds: list, caption_texts: list = None, max_words: int = 3) -> list:
    """Split each sentence span across its words (weighted by length), then
    group into <=max_words caption cues that never cross a sentence. Returns
    [(start_s, end_s, text), ...].

    If caption_texts is given (1:1 with bounds/sentences), the ON-SCREEN words
    come from it instead of the spoken text. This lets the VOICE read Devanagari
    (correct Hindi pronunciation) while CAPTIONS show romanized Hinglish
    (libass shapes Latin cleanly; Devanagari conjuncts break)."""
    cues = []
    for i, (off, dur, txt) in enumerate(bounds):
        if caption_texts and i < len(caption_texts):
            txt = caption_texts[i]
        words = txt.split()
        if not words:
            continue
        weights = [len(w) + 1 for w in words]
        total = sum(weights)
        # per-word (start,end)
        t = off
        wt = []
        for w, wgt in zip(words, weights):
            d = dur * wgt / total
            wt.append((t, t + d, w))
            t += d
        # group within the sentence
        i = 0
        while i < len(wt):
            chunk = wt[i:i + max_words]
            cues.append((round(chunk[0][0], 2), round(chunk[-1][1], 2),
                         " ".join(c[2] for c in chunk)))
            i += max_words
    return cues


# ─────────────────────────────────────────────────────────────────────────
# 3. ASS SUBTITLES  (hook score-slam + word captions + brand bar + CTA)
# ─────────────────────────────────────────────────────────────────────────

def _ass_time(s: float) -> str:
    s = max(0.0, s)
    h = int(s // 3600); m = int((s % 3600) // 60); sec = s % 60
    return f"{h}:{m:02d}:{sec:05.2f}"


def _ass_color(hex6: str) -> str:
    """#RRGGBB -> &H00BBGGRR (ASS, alpha=00 opaque)."""
    r, g, b = hex6[0:2], hex6[2:4], hex6[4:6]
    return f"&H00{b}{g}{r}".upper()


def build_ass(cues, score_disp, name, total_dur, out_ass: Path):
    W = _ass_color(BONE); V = _ass_color(VERMILLION); S = _ass_color(SAFFRON)
    INK = _ass_color(INK_DEEP)
    vermillion_bg = (VERMILLION[4:6] + VERMILLION[2:4] + VERMILLION[0:2]).upper()  # BGR for ASS box
    header = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {REEL_W}
PlayResY: {REEL_H}
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Instrument Sans,132,{W},{W},&H00000000,&H64000000,-1,0,0,0,100,100,1,0,1,8,4,5,70,70,0,1
Style: Score,JetBrains Mono,250,{V},{V},&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,9,5,5,0,0,0,1
Style: Kicker,Instrument Sans,56,{S},{S},&H00000000,&H64000000,-1,0,0,0,100,100,3,0,1,5,2,5,0,0,0,1
Style: Badge,Instrument Sans,52,{W},{W},&H00000000,&HB4{vermillion_bg},-1,0,0,0,100,100,1,0,3,18,0,8,0,0,70,1
Style: Brand,Instrument Sans,40,{W},{W},&H00000000,&H96000000,-1,0,0,0,100,100,0,0,1,3,2,1,46,0,40,1
Style: Site,Instrument Sans,34,{S},{S},&H00000000,&H96000000,-1,0,0,0,100,100,0,0,1,3,2,3,0,46,44,1
Style: CTA,Instrument Sans,120,{W},{W},&H00000000,&H64000000,-1,0,0,0,100,100,1,0,1,8,4,5,70,70,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    ev = []

    def dlg(start, end, style, text, layer=0):
        ev.append(f"Dialogue: {layer},{_ass_time(start)},{_ass_time(end)},{style},,0,0,0,,{text}")

    # Persistent brand bar (whole video)
    dlg(0, total_dur, "Brand", "{\\pos(46,1830)}NAKSHIQ", layer=5)
    dlg(0, total_dur, "Site", "{\\pos(1034,1840)}nakshiq.com", layer=5)

    voice_end = total_dur - TAIL

    # HOOK — small kicker + the score SLAMMING in (0.12 -> hook_end), then it
    # shrinks into the persistent top badge.
    hook_end = LEAD + 1.6
    dlg(0.40, hook_end, "Kicker",
        "{\\an5\\pos(540,560)\\fad(150,80)}JUNE  •  NAKSHIQ SCORE")
    dlg(0.12, hook_end, "Score",
        "{\\an5\\pos(540,800)\\fad(60,120)\\fscx26\\fscy26\\t(0,240,\\fscx120\\fscy120)\\t(240,440,\\fscx100\\fscy100)}"
        + score_disp.replace("/", " / "))

    # Persistent top badge (after the hook): "<NAME> · 10/10" so the score +
    # destination stay on screen the whole time — reinforces the data brand.
    dlg(hook_end - 0.1, voice_end, "Badge",
        "{\\an8\\pos(540,150)\\fad(180,0)}  " + name.upper() + "   " + score_disp + "  ")

    # WORD CAPTIONS — big, low (in the bottom scrim), pop-in, synced to voice.
    for (s, e, txt) in cues:
        s2, e2 = s + LEAD, e + LEAD
        anim = "{\\an5\\pos(540,1410)\\fad(45,40)\\fscx74\\fscy74\\t(0,120,\\fscx107\\fscy107)\\t(120,200,\\fscx100\\fscy100)}"
        dlg(s2, e2, "Cap", anim + _ass_escape(txt))

    # CTA hold at the end (after the voice finishes)
    dlg(voice_end + 0.05, total_dur, "CTA",
        "{\\an5\\pos(540,1150)\\fad(140,0)}SAVE THIS")
    dlg(voice_end + 0.30, total_dur, "Kicker",
        "{\\an5\\pos(540,1320)\\fad(180,0)}roz naye scores · nakshiq.com")

    out_ass.write_text(header + "\n".join(ev) + "\n", encoding="utf-8")
    return out_ass


def _ass_escape(t: str) -> str:
    return t.replace("\\", "\\\\").replace("{", "(").replace("}", ")")


# ─────────────────────────────────────────────────────────────────────────
# 4. BACKGROUND VIDEO  (hook zoom-burst + body clip, light scrim)
# ─────────────────────────────────────────────────────────────────────────

def _find_clip(slug: str) -> Optional[Path]:
    """Local clip lookup for the preview. Handles VIDEO_<slug>.mp4 + <slug>.mp4."""
    for cand in (VIDEOS_DIR / f"{slug}.mp4", VIDEOS_DIR / f"VIDEO_{slug}.mp4"):
        if cand.exists() and cand.stat().st_size > 0:
            return cand
    # loose match
    for p in glob.glob(str(VIDEOS_DIR / "*.mp4")):
        stem = Path(p).stem.lower().replace("video_", "")
        if stem == slug or (len(slug) > 4 and slug in stem):
            return Path(p)
    # R2 fallback — videos/ is gitignored, so on GitHub Actions the clip is only
    # in R2. Reuses the existing r2_videos.fetch (lazy import; no-op locally).
    try:
        from r2_videos import fetch as _r2
        hit = _r2(slug, VIDEOS_DIR)
        if hit and Path(hit).exists() and Path(hit).stat().st_size > 0:
            return Path(hit)
    except Exception:
        pass
    return None


def _ff() -> str:
    return shutil.which("ffmpeg") or "/usr/bin/ffmpeg"


def _build_background(clip: Optional[Path], total_dur: float, out: Path) -> Optional[Path]:
    """Hook (0..LEAD): zoom-burst on a freeze frame. Body: the clip cropped to
    9:16, looped to fill, with a light top+bottom scrim for caption legibility.
    Returns a silent mp4 of length total_dur."""
    ff = _ff()
    td = out.parent

    if clip is None:
        # brand-colour fallback (rare in prod; never for preview here)
        cmd = [ff, "-y", "-f", "lavfi", "-i",
               f"color=c=0x{INK_DEEP}:s={REEL_W}x{REEL_H}:d={total_dur}:r={FPS}",
               "-c:v", "libx264", "-preset", "fast", "-crf", "22",
               "-pix_fmt", "yuv420p", str(out)]
        return out if subprocess.run(cmd, capture_output=True).returncode == 0 else None

    # 1) hook freeze-frame (grab ~0.6s in) -> zoom-burst image segment
    hook_png = td / "hook.png"
    subprocess.run([ff, "-y", "-ss", "0.6", "-i", str(clip),
                    "-vf", f"crop=ih*9/16:ih:iw/2-ih*9/16/2:0,scale={REEL_W}:{REEL_H}",
                    "-frames:v", "1", str(hook_png)], capture_output=True)
    hook_seg = td / "seg_hook.mp4"
    hf = int(FPS * LEAD)
    zoom = f"zoompan=z='min(1.04+0.18*on/{hf},1.22)':d={hf}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={REEL_W}x{REEL_H}:fps={FPS}"
    subprocess.run([ff, "-y", "-loop", "1", "-i", str(hook_png),
                    "-vf", f"scale={REEL_W*2}:-1:flags=lanczos,{zoom},setsar=1",
                    "-c:v", "libx264", "-preset", "fast", "-crf", "21",
                    "-pix_fmt", "yuv420p", "-r", str(FPS), "-t", f"{LEAD}", str(hook_seg)],
                   capture_output=True)

    # 2) body — loop clip to fill (total_dur - LEAD), crop 9:16, light scrim
    body_dur = total_dur - LEAD
    body_seg = td / "seg_body.mp4"
    loops = int(body_dur // 8 + 2)
    # gentle scrim: darken top + bottom thirds so white captions/brand read,
    # keep the middle bright so the footage shows (v1 used a flat 45% which
    # killed the footage). gradient via two stacked boxes.
    scrim = (f"drawbox=x=0:y=0:w=iw:h=300:color=black@0.50:t=fill,"
             f"drawbox=x=0:y=ih-720:w=iw:h=240:color=black@0.18:t=fill,"
             f"drawbox=x=0:y=ih-480:w=iw:h=480:color=black@0.42:t=fill,"
             f"drawbox=x=0:y=0:w=iw:h=ih:color=black@0.10:t=fill")
    vf = (f"loop=loop={loops}:size={FPS*8}:start=0,"
          f"trim=duration={body_dur},setpts=PTS-STARTPTS,"
          f"crop=ih*9/16:ih:iw/2-ih*9/16/2:0,scale={REEL_W}:{REEL_H}:flags=lanczos,"
          f"setsar=1,{scrim}")
    subprocess.run([ff, "-y", "-i", str(clip), "-vf", vf,
                    "-c:v", "libx264", "-preset", "fast", "-crf", "21",
                    "-pix_fmt", "yuv420p", "-r", str(FPS), "-t", f"{body_dur}",
                    "-an", str(body_seg)], capture_output=True)

    # 3) concat hook + body
    concat_txt = td / "concat.txt"
    concat_txt.write_text(f"file '{hook_seg}'\nfile '{body_seg}'\n")
    r = subprocess.run([ff, "-y", "-f", "concat", "-safe", "0", "-i", str(concat_txt),
                        "-c:v", "libx264", "-preset", "fast", "-crf", "21",
                        "-pix_fmt", "yuv420p", "-r", str(FPS), str(out)],
                       capture_output=True, text=True)
    if r.returncode != 0:
        print("background concat failed:", r.stderr[-600:])
        return None
    return out


# ─────────────────────────────────────────────────────────────────────────
# 5. AUDIO MIX  (voice delayed by LEAD + ducked music bed)
# ─────────────────────────────────────────────────────────────────────────

def _mix_audio(voice_mp3: Path, music: Optional[Path], total_dur: float, out: Path):
    ff = _ff()
    if music and music.exists():
        fc = (f"[1:a]adelay={int(LEAD*1000)}|{int(LEAD*1000)}[v];"
              f"[2:a]aloop=loop=-1:size=2e9,atrim=0:{total_dur},"
              f"afade=t=in:st=0:d=0.6,afade=t=out:st={total_dur-1.4}:d=1.4,volume=0.16[m];"
              f"[v][m]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[mx];"
              f"[mx]alimiter=limit=0.9:level=disabled[a]")
        cmd = [ff, "-y",
               "-f", "lavfi", "-t", f"{total_dur}", "-i", "anullsrc=r=44100:cl=stereo",
               "-i", str(voice_mp3), "-i", str(music),
               "-filter_complex", fc, "-map", "[a]",
               "-c:a", "aac", "-b:a", "160k", "-t", f"{total_dur}", str(out)]
    else:
        fc = f"[1:a]adelay={int(LEAD*1000)}|{int(LEAD*1000)}[a]"
        cmd = [ff, "-y",
               "-f", "lavfi", "-t", f"{total_dur}", "-i", "anullsrc=r=44100:cl=stereo",
               "-i", str(voice_mp3), "-filter_complex", fc, "-map", "[a]",
               "-c:a", "aac", "-b:a", "160k", "-t", f"{total_dur}", str(out)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("audio mix failed:", r.stderr[-600:])
        return None
    return out


# ─────────────────────────────────────────────────────────────────────────
# 6. BUILD
# ─────────────────────────────────────────────────────────────────────────

def _audio_dur(path: Path) -> float:
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", str(path)], capture_output=True, text=True)
    try:
        return float(r.stdout.strip())
    except ValueError:
        return 0.0


def _pick_music() -> Optional[Path]:
    tracks = sorted(MUSIC_DIR.glob("*.wav"))
    return tracks[0] if tracks else None


def build(slug: str, dest: dict, out_path: Path, music: Optional[Path] = None,
          voice_override: str = None, rate_override: str = None,
          pitch_override: str = None, eleven_override: str = None) -> Optional[dict]:
    score_disp = _format_score(dest.get("score"))
    name = dest.get("name") or slug

    with tempfile.TemporaryDirectory(prefix="nq_v2_") as td:
        tdp = Path(td)
        # 1. script -> 2. voice (hand-written bank or tone-B template; profile
        #    sets the tuned voice/rate/pitch, CLI flags still override)
        spec = _resolve_spec(slug, dest)
        lines = spec.get("lines", [])
        if not lines:
            print("no script lines"); return None
        prof = VOICE_PROFILES.get(spec.get("voice_profile", ""), {})
        voice = voice_override or prof.get("voice") or spec.get("voice", VOICE)
        rate = rate_override or prof.get("rate") or spec.get("rate", VOICE_RATE)
        pitch = pitch_override or prof.get("pitch") or spec.get("pitch", "+0Hz")
        script_text = " ".join(lines)
        voice_mp3 = tdp / "voice.mp3"
        # ElevenLabs only if a key + voice id are configured (off by default).
        eleven_id = eleven_override or spec.get("eleven_voice_id") or os.environ.get("ELEVEN_VOICE_ID")
        eleven_key = os.environ.get("ELEVENLABS_API_KEY", "")
        if eleven_id and eleven_key and not voice_override:
            print(f"Voice: ElevenLabs {eleven_id}")
            bounds = _synth_eleven(script_text, lines, eleven_id, eleven_key, voice_mp3)
        else:
            print(f"Voice: edge-tts {voice} rate={rate} pitch={pitch}")
            bounds = asyncio.run(_synth(script_text, voice_mp3, voice, rate, pitch))
        v_dur = _audio_dur(voice_mp3)
        if v_dur <= 0:
            print("voice synth produced no audio"); return None
        total = round(LEAD + v_dur + TAIL, 2)
        cap_lines = spec.get("caption_lines")
        if cap_lines and len(cap_lines) != len(bounds):
            print(f"WARN: caption_lines ({len(cap_lines)}) != sentences ({len(bounds)}) — captions may drift")
        cues = _word_cues(bounds, cap_lines)

        # 3. ASS
        ass = build_ass(cues, score_disp, name, total, tdp / "subs.ass")
        # 4. background
        clip = _find_clip(slug)
        bg = _build_background(clip, total, tdp / "bg.mp4")
        if not bg:
            print("background build failed"); return None
        # 5. audio
        music = music or _pick_music()
        amix = _mix_audio(voice_mp3, music, total, tdp / "audio.m4a")
        if not amix:
            return None
        # 6. burn captions + mux
        ff = _ff()
        ass_path = str(ass).replace(":", "\\:")
        vf = f"ass='{ass_path}':fontsdir='{FONT_DIR}'"
        r = subprocess.run([ff, "-y", "-i", str(bg), "-i", str(amix),
                            "-vf", vf, "-map", "0:v", "-map", "1:a",
                            "-c:v", "libx264", "-preset", "medium", "-crf", "20",
                            "-pix_fmt", "yuv420p", "-r", str(FPS),
                            "-c:a", "aac", "-b:a", "160k", "-t", f"{total}",
                            str(out_path)], capture_output=True, text=True)
        if r.returncode != 0:
            print("final burn failed:", r.stderr[-800:])
            return None

        # poster frame for quick review
        poster = out_path.with_suffix(".hook.png")
        subprocess.run([ff, "-y", "-ss", "0.9", "-i", str(out_path),
                        "-frames:v", "1", str(poster)], capture_output=True)
        return {
            "video": str(out_path), "poster": str(poster),
            "video_bytes": out_path.read_bytes(),
            "duration": total, "voice_dur": round(v_dur, 2),
            "clip": str(clip) if clip else None,
            "music": str(music) if music else None,
            "music_name": music.stem if music else "",
            "script": lines, "cues": len(cues), "spec": spec,
        }


def _fetch_dest(slug: str, month: int = 6) -> Optional[dict]:
    import requests
    url = f"https://nakshiq.com/api/content?type=destinations&month={month}&min_score=0&limit=300&include_intel=1"
    data = requests.get(url, timeout=20).json().get("data", [])
    for d in data:
        if d.get("id") == slug:
            return d
    return None


# ─────────────────────────────────────────────────────────────────────────
# 7. PRODUCTION SERIES — music (mood + auto-credit), captions, autoposter entry
# ─────────────────────────────────────────────────────────────────────────

MUSIC_V2_DIR = HERE / "assets" / "yt_music_v2"
# All current yt_music_v2 tracks are Kevin MacLeod / incompetech (CC BY 4.0) →
# attribution required, auto-appended to captions. To go no-attribution, drop
# YouTube-Audio-Library / Pixabay files here and clear _CC_BY_CREDIT.
_CC_BY_CREDIT = "Music: Kevin MacLeod (incompetech.com) — CC BY 4.0"

_HASHTAG_POOL = ["IncredibleIndia", "India", "IndiaTravel", "TravelIndia", "Shorts",
                 "TravelShorts", "IndianTravel", "Wanderlust", "TravelReels",
                 "HiddenGems", "NakshIQ", "TravelWithIQ", "DataDrivenTravel"]


def _pick_music_v2(profile: str) -> Optional[Path]:
    """Mood-matched track: upbeat for BRIGHT (hype/go-now), calmer for DEEP."""
    bright = "bright" in (profile or "")
    order = (["Carefree.mp3", "Local_Forecast.mp3"] if bright
             else ["Happy_Alley.mp3", "Carefree.mp3"])
    for fn in order:
        p = MUSIC_V2_DIR / fn
        if p.exists():
            return p
    any_ = sorted(MUSIC_V2_DIR.glob("*.mp3")) or sorted(MUSIC_V2_DIR.glob("*.wav"))
    return any_[0] if any_ else _pick_music()


def _music_credit(music_path: Optional[Path]) -> str:
    try:
        if music_path and MUSIC_V2_DIR.resolve() == Path(music_path).resolve().parent:
            return _CC_BY_CREDIT
    except Exception:
        pass
    return ""


def _hashtags(name: str, state: str, n: int = 12) -> str:
    tags = []

    def push(t):
        t = (t or "").replace(" ", "").replace("-", "").replace("&", "")
        if t and t not in tags:
            tags.append(t)
    if name:
        push(name); push(name + "Travel")
    if state:
        push(state); push(state + "Tourism")
    for t in _HASHTAG_POOL:
        if len(tags) >= n:
            break
        push(t)
    return " ".join("#" + t for t in tags[:n])


def _series_link(slug: str, month_slug: str) -> str:
    base = (f"https://nakshiq.com/en/destination/{slug}/{month_slug}" if slug
            else f"https://nakshiq.com/en/where-to-go/{month_slug}")
    return base + "?utm_source=youtube&utm_medium=short&utm_campaign=nakshiq-score"


def _yt_caption_v2(dest: dict, spec: dict, music_credit: str, month_name: str) -> str:
    name = dest.get("name") or dest.get("id"); state = dest.get("state", "")
    disp = _format_score(dest.get("score"))
    caps = spec.get("caption_lines") or []
    hook = caps[0] if caps else f"{name} — {disp}"
    link = _series_link(dest.get("id"), month_name.lower())
    title = f"{name}: {month_name} NakshIQ Score {disp}"
    body = (f"{hook}.\n\n{name}, {state} — {month_name} score {disp} "
            f"(weather, roads, crowds, hospital & cell signal all checked).\n\n"
            f"Full verified guide → {link}\n\n{_hashtags(name, state)}")
    if music_credit:
        body += f"\n\n{music_credit}"
    return title + "\n\n" + body   # _run_yt_short takes the first line as YT title


def _ig_caption_v2(dest: dict, spec: dict, music_credit: str, month_name: str) -> str:
    name = dest.get("name") or dest.get("id"); state = dest.get("state", "")
    disp = _format_score(dest.get("score"))
    caps = spec.get("caption_lines") or []
    hook = caps[0] if caps else f"{name} — {disp}"
    body = (f"{hook}.\n\n{name}, {state} — {month_name} NakshIQ score {disp}. "
            f"Real data, no fluff.\n\n\U0001f4be Save this for your {month_name} trip.\n\n"
            f"{_hashtags(name, state, 16)}")
    if music_credit:
        body += f"\n\n{music_credit}"
    return body


def _fetch_destinations(month: int = None, max_score: int = None) -> list:
    import requests
    month = month or datetime.now().month
    url = (f"https://nakshiq.com/api/content?type=destinations&month={month}"
           f"&min_score=0&limit=400&include_intel=1")
    if max_score is not None:
        url += f"&max_score={max_score}"
    try:
        data = requests.get(url, timeout=25).json().get("data", [])
        return [d for d in data if isinstance(d.get("score"), (int, float))]
    except Exception as e:
        print(f"API fetch failed: {e}")
        return []


def build_series_short(dry_run: bool = False, preview: bool = False,
                       slug: str = None, month: int = None) -> Optional[dict]:
    """Autoposter entrypoint for the 'NakshIQ Score' v2 series. Returns the same
    dict shape as yt_shorts_gen.build_yt_short so _run_yt_short publishes it to
    YouTube + Instagram unchanged. None on failure (caller falls back to v1)."""
    month = month or datetime.now().month
    month_name = datetime(2000, month, 1).strftime("%B")
    dests = _fetch_destinations(month)
    if not dests:
        print("series: no destinations from API")
        return None

    used = set()
    try:
        from autoposter import recently_used_destinations, load_state
        used = recently_used_destinations(load_state()) or set()
    except Exception as e:
        print(f"series: cross-flow dedup unavailable ({e})")

    def has_clip(d):
        return _find_clip(d.get("id", "")) is not None

    heroes = {p.stem for p in SCRIPTS_DIR.glob("*.json")}
    pool = [d for d in dests if d.get("id") not in used]
    if slug:
        cands = [d for d in dests if d.get("id") == slug]
    else:
        hero_c = [d for d in pool if d.get("id") in heroes and has_clip(d)]
        rest = sorted([d for d in pool if d.get("id") not in heroes and has_clip(d)],
                      key=lambda d: -d.get("score", 0))
        cands = hero_c + rest
    if not cands:
        print("series: no eligible destination (needs footage + not posted this month)")
        return None
    dest = cands[0]; slug = dest.get("id")
    print(f"series: picked {slug} (score {dest.get('score')}, {dest.get('state','')})")

    spec = _resolve_spec(slug, dest)
    profile = spec.get("voice_profile") or _profile_for(dest)
    music = _pick_music_v2(profile)

    final_name = f"yt_short_nakshiq_score_{slug}_{date.today().isoformat()}.mp4"
    out = (HERE / final_name) if preview else (Path(tempfile.gettempdir()) / final_name)
    res = build(slug, dest, out, music=music)
    if not res:
        print("series: render failed")
        return None

    credit = _music_credit(music)
    result = {
        "video_bytes": res["video_bytes"],
        "video_filename": final_name,
        "caption": _yt_caption_v2(dest, spec, credit, month_name),
        "ig_caption": _ig_caption_v2(dest, spec, credit, month_name),
        "format": "nakshiq_score",
        "duration": res["duration"],
        "music": res.get("music_name", ""),
        "primary_dest_id": slug,
    }
    if not preview:
        try:
            out.unlink()
        except Exception:
            pass
    return result


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug", default="lolab-valley")
    ap.add_argument("--month", type=int, default=6)
    ap.add_argument("--preview", action="store_true")
    ap.add_argument("--out", default=None)
    ap.add_argument("--voice", default=None, help="override voice e.g. hi-IN-MadhurNeural")
    ap.add_argument("--rate", default=None, help="override rate e.g. +14%%")
    ap.add_argument("--pitch", default=None, help="override pitch e.g. +20Hz or -10Hz")
    ap.add_argument("--music", default=None, help="path to a music file (mp3/wav)")
    ap.add_argument("--eleven-voice", default=None, help="ElevenLabs voice id (needs ELEVENLABS_API_KEY)")
    args = ap.parse_args()

    dest = _fetch_dest(args.slug, args.month)
    if not dest:
        print(f"destination {args.slug} not found in month {args.month} feed")
        raise SystemExit(1)
    out = Path(args.out) if args.out else HERE / f"preview_{args.slug}.mp4"
    music = Path(args.music) if args.music else None
    res = build(args.slug, dest, out, music=music, voice_override=args.voice,
                rate_override=args.rate, pitch_override=args.pitch,
                eleven_override=args.eleven_voice)
    if res:
        print(json.dumps(res, indent=2, ensure_ascii=False))
        print(f"\n✅ Preview: {res['video']}  ({res['duration']}s)")
    else:
        print("❌ build failed")
