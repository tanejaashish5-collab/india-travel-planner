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
import random
import re
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
    "madhur_deep":   {"voice": "hi-IN-MadhurNeural", "rate": "+12%", "pitch": "-9Hz"},   # gripping / authority
    "madhur_bright": {"voice": "hi-IN-MadhurNeural", "rate": "+21%", "pitch": "+22Hz"},  # adventure / hype
    "swara_deep":    {"voice": "hi-IN-SwaraNeural",  "rate": "+12%", "pitch": "-5Hz"},   # gripping / serious
    "swara_bright":  {"voice": "hi-IN-SwaraNeural",  "rate": "+21%", "pitch": "+26Hz"},  # gem / aspirational
    # English (inbound / international travellers) — authentic Indian-English, clear.
    "en_deep_f":     {"voice": "en-IN-NeerjaNeural",            "rate": "+6%",  "pitch": "-2Hz"},   # warn/wait
    "en_deep_m":     {"voice": "en-IN-PrabhatNeural",           "rate": "+5%",  "pitch": "-8Hz"},
    "en_bright_f":   {"voice": "en-IN-NeerjaExpressiveNeural",  "rate": "+12%", "pitch": "+0Hz"},   # gem/food/drive
    "en_bright_m":   {"voice": "en-IN-PrabhatNeural",           "rate": "+10%", "pitch": "+0Hz"},
    # "Landing in India" arrival reels — Neerja, clear + brisk (info reel, keep it tight).
    "en_arrival":    {"voice": "en-IN-NeerjaNeural",           "rate": "+16%", "pitch": "+0Hz"},
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

def _resolve_spec(slug: str, dest: dict, lang: str = "hi") -> dict:
    """Return the full script spec: {lines (voice), caption_lines (on-screen),
    voice_profile, ...}. Hand-written bank file wins (lang-specific:
    <slug>.en.json for English, <slug>.json for Hindi); otherwise the
    deterministic data-driven template in that language."""
    f = SCRIPTS_DIR / (f"{slug}.en.json" if lang == "en" else f"{slug}.json")
    if f.exists():
        try:
            data = json.loads(f.read_text())
            if data.get("lines"):
                return data
        except Exception:
            pass
    return _template_spec_en(dest) if lang == "en" else _template_spec(dest)


def load_script(slug: str, dest: dict) -> list[str]:
    """Back-compat helper for the CLI: just the voice lines."""
    return _resolve_spec(slug, dest).get("lines", [])


def _profile_for(dest: dict) -> str:
    """Pick a voice profile by score band, alternating male/female by slug so
    consecutive days vary. BRIGHT = go-now/gem (score >= 8/10), DEEP = warning."""
    raw = dest.get("score") or 3
    even = (sum(ord(c) for c in (dest.get("id") or "x")) % 2 == 0)
    # raw>=3 (6/10+) -> bright/energetic. The positive arcs (gem/food/drive) only
    # fire at raw>=3, so they all get the hype voice; warn/wait force deep
    # themselves regardless. Energy is about the discovery, not a score claim —
    # the receipt still states the honest score.
    if raw >= 3:
        return "swara_bright" if even else "madhur_bright"
    return "swara_deep" if even else "madhur_deep"


# ── Devanagari → Latin (for CAPTIONS only) ───────────────────────────────
# The VOICE always reads the real Devanagari (edge-tts → correct Hindi). This
# only romanizes the on-screen caption mirror (libass breaks Devanagari
# conjuncts), so minor schwa imperfections are acceptable. Deterministic, no
# deps, no API — it just lets us surface the audited Hindi tagline/why_special
# as the spoken hook with a readable Latin caption underneath.
_V_IND = {'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri',
          'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऍ': 'e', 'ऑ': 'o', 'ॲ': 'a'}
_MATRA = {'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'े': 'e',
          'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ॅ': 'e', 'ॉ': 'o', 'ॆ': 'e', 'ॊ': 'o'}
_CONS = {'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng', 'च': 'ch', 'छ': 'chh',
         'ज': 'j', 'झ': 'jh', 'ञ': 'ny', 'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh',
         'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n', 'प': 'p',
         'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l',
         'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h', 'ळ': 'l'}
_CONS_NUKTA = {'क': 'q', 'ख': 'kh', 'ग': 'g', 'ज': 'z', 'ड': 'r', 'ढ': 'rh', 'फ': 'f', 'य': 'y'}
_DEVA_DIGITS = {'०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5',
                '६': '6', '७': '7', '८': '8', '९': '9'}
_VIRAMA, _NUKTA = '्', '़'
_DEVA_RE = re.compile(r'[ऀ-ॿ]')


def _aksharas(w: str) -> list:
    """Devanagari word → [[consonant, vowel], …]. Inherent schwa = [c, 'a'],
    virama = [c, ''], independent vowel = ['', v]; nasals fold into the vowel."""
    out, i, n = [], 0, len(w)
    while i < n:
        ch = w[i]
        if ch in _CONS:
            base = _CONS[ch]; i += 1
            if i < n and w[i] == _NUKTA:
                base = _CONS_NUKTA.get(ch, base); i += 1
            if i < n and w[i] in _MATRA:
                out.append([base, _MATRA[w[i]]]); i += 1
            elif i < n and w[i] == _VIRAMA:
                out.append([base, '']); i += 1
            else:
                out.append([base, 'a'])
        elif ch in _V_IND:
            out.append(['', _V_IND[ch]]); i += 1
        elif ch in _DEVA_DIGITS:
            out.append(['', _DEVA_DIGITS[ch]]); i += 1
        elif ch in ('ं', 'ँ'):
            if out:
                out[-1][1] += 'n'
            i += 1
        elif ch == 'ः':
            if out:
                out[-1][1] += 'h'
            i += 1
        elif ch in (_NUKTA, '‍', '‌'):
            i += 1
        else:
            out.append(['', ch]); i += 1
    return out


def _translit_word(w: str) -> str:
    ak = _aksharas(w)
    if not ak:
        return ''
    if len(ak) > 1 and ak[-1][0] and ak[-1][1] == 'a':   # word-final schwa
        ak[-1][1] = ''
    for i in range(len(ak) - 2, 0, -1):                  # medial schwa (VC_CV)
        if ak[i][0] and ak[i][1] == 'a':
            nxt = ak[i + 1]
            if any(ak[j][1] for j in range(i)) and nxt[0] and nxt[1]:
                ak[i][1] = ''
    return ''.join(c + v for c, v in ak)


def deva_to_latin(text: str) -> str:
    if not text:
        return text
    text = text.replace('।', ' ').replace('॥', ' ')
    res = []
    for t in re.split(r'(\s+)', text):
        if _DEVA_RE.search(t):
            m = re.match(r'^([^ऀ-ॿ]*)(.*?)([^ऀ-ॿ]*)$', t, re.S)
            res.append(m.group(1) + _translit_word(m.group(2)) + m.group(3))
        else:
            res.append(t)
    return re.sub(r'\s+', ' ', ''.join(res)).strip()


def _hi_clauses(text: str) -> list:
    """Split Hindi prose into speakable clauses (≈8–96 chars), in order."""
    if not text:
        return []
    parts = re.split(r'[।\n;|]|—|–|(?<=[ऀ-ॿ])\.(?=\s)', text)
    out = []
    for p in parts:
        p = (p or '').strip().strip('-–—,').strip()
        if 8 <= len(p) <= 96:
            out.append(p)
    return out


def _single_sentence(s: str) -> str:
    """edge-tts emits one SentenceBoundary per . ? ! । — so a voice line with an
    INTERNAL terminator yields 2 bounds but only 1 caption_line → caption drift.
    Collapse any internal ।/?/! (not the terminal one) to a dash-pause so every
    voice line is exactly one sentence and maps 1:1 to its caption. Latin '.'
    (abbreviations like W.D.) is left alone."""
    s = re.sub(r"\s*[।?!]+(?=\s*\S)", " —", s.strip())
    # English: an internal '.' before a space + capital is a sentence break too
    return re.sub(r"\.\s+(?=[A-Z])", " — ", s)


def _en_clauses(text: str) -> list:
    """Split English prose into speakable single-sentence clauses (≈8–115 chars)."""
    if not text:
        return []
    parts = re.split(r"(?<=[.;:])\s+|\n+|—|–|\s\(", text)
    out = []
    for p in parts:
        p = (p or "").strip().strip("-–—,;:()").strip().rstrip(".")
        if 8 <= len(p) <= 115 and not p.lower().startswith(("see ", "more ", "http")):
            out.append(p)
    return out


def _lead_token(s: str) -> str:
    """'Kaza (Indian Oil) — only pump' → 'Kaza'."""
    s = (s or '').strip()
    for sep in ('(', '—', '–', ',', ' - ', '.'):
        if sep in s:
            s = s.split(sep)[0]
    return s.strip()


def _template_spec(dest: dict) -> dict:
    """Deterministic, data-driven script — the unattended fallback when a slug
    has no hand-written bank file. Picks one of 5 ARCS (WAIT / WARN / FOOD /
    DRIVE / GEM) by score band + which intel fields exist, then assembles
    field-GATED beats: the score is the *receipt* (what we checked), never the
    payload. VOICE lines are Devanagari (correct pronunciation); CAPTIONS are
    the romanized mirror. Every beat slots a VERIFIED field — null field → beat
    skipped (honest scarcity). No runtime LLM, no fabrication."""
    name = dest.get("name") or dest.get("id") or "Yeh jagah"
    state = dest.get("state") or ""
    raw = dest.get("score") or 3
    disp = _format_score(raw)                       # "10/10"
    disp_voice = disp.replace("/", " बटा ")          # edge-tts: "10 बटा 10" = "das bata das"

    intel = dest.get("intel") or {}
    net = intel.get("network") or {}
    fuel = intel.get("fuel") or {}
    wx = intel.get("weather_night") or {}
    sos = intel.get("sos") or {}
    reach = intel.get("reach") or {}
    leg = intel.get("legendary_eatery") or {}
    helper = sos.get("local_helper") if isinstance(sos.get("local_helper"), dict) else {}
    helper = helper or {}
    safety = sos.get("safety_contact") if isinstance(sos.get("safety_contact"), dict) else {}
    safety = safety or {}

    tagline_hi = (dest.get("tagline_hi") or "").strip()
    why_hi = dest.get("why_special_hi") or ""
    note = (dest.get("note") or "").strip()
    elev = dest.get("elevation_m")
    diff = (dest.get("difficulty") or "").lower()
    price = dest.get("price_range_inr")
    dish = dest.get("hero_dish")
    eatery = (leg.get("name") if isinstance(leg, dict) else None) or dest.get("eatery_name")
    summer_low = wx.get("summer_low_c")
    pump = _lead_token(fuel.get("nearest_petrol_pump"))
    # only use pump in voice if it's a real PLACE name (not "In town"/"Everywhere"/"Multiple"/"N/A")
    pump_ok = bool(pump) and len(pump) <= 22 and pump[:1].isupper() and not re.search(
        r"(?i)\b(town|city|everywhere|multiple|n/?a|none|local|nearest|all)\b", pump)
    carry_extra = bool(fuel.get("carry_extra"))
    phone = (helper.get("phone") or "").strip()
    helper_name = (helper.get("name") or "").strip()
    road = (reach.get("road_condition") or "").lower()
    last_km = (reach.get("last_km_difficulty") or "").lower()

    nets = [k for k in ("jio", "airtel", "bsnl", "vi") if net.get(k)]
    bsnl_only = bool(net.get("bsnl")) and not (net.get("jio") or net.get("airtel") or net.get("vi"))

    # ── field-gated beats (each returns (devanagari, caption) or None) ──
    def b_hook(arc):
        # Scroll-stopping OPENER (≤1.5s pull), arc-flavoured + data-gated. Hand-
        # written bilingual (Devanagari voice + clean romanized caption). Confident
        # "No Bakwaas" energy — curiosity / stakes / craving, never cheesy hype.
        # Screened by a brand+fabrication judge panel (catchy-yt-hooks workflow).
        if arc == "wait":
            return (f"{name} अभी जाना — सबसे बड़ी गलती होगी।",
                    f"{name} abhi jaana — sabse badi galti hogi")
        if arc == "warn":
            if elev and elev >= 3500:
                return (f"{elev} मीटर पर एक छोटी गलती — और मदद कोसों दूर।",
                        f"{elev}m par ek chhoti galti — aur madad koson door")
            return (f"{name} खूबसूरत है — पर यहाँ एक चूक भारी पड़ती है।",
                    f"{name} khoobsurat hai — par ek chook bhaari padti hai")
        if arc == "food" and dish:
            return (f"{name} जाओ तो {dish} ज़रूर — वरना जाना बेकार।",
                    f"{name} jao to {dish} zaroor — varna jaana bekaar")
        if arc == "drive":
            if pump_ok:
                return (f"{pump} के बाद का रास्ता — मंज़िल भुला देगा।",
                        f"{pump} ke baad ka raasta — manzil bhula dega")
            return (f"{name} में मंज़िल भूल जाओ — रास्ता ही पूरी कहानी है।",
                    f"{name} mein manzil bhool jao — raasta hi poori kahani hai")
        # GEM (default) — curiosity + FOMO; pays off in beat 2 (the why)
        return (f"{name} — वायरल होने से पहले, ये देख लो।",
                f"{name} — viral hone se pehle, ye dekh lo")

    def b_why(punchy=True):
        cl = _hi_clauses(why_hi) or _hi_clauses(tagline_hi)
        if not cl:
            return None
        if punchy:
            sig = [c for c in cl if re.search(r"\d", c) or any(
                s in c for s in ("सबसे", "एकमात्र", "अकेल", "दुनिया", "विश्व",
                                 "पहली", "पहला", "आख़िर", "आखिर", "रहस्य", "केवल"))]
            cl = sig or cl
        c = cl[0]
        return (c + "।", deva_to_latin(c))

    def b_altitude():
        if not elev or elev < 3500:
            return None
        if elev >= 5000:
            return (f"{elev} मीटर — हवा में आधी ऑक्सीजन।", f"{elev}m — hawa mein aadhi oxygen")
        return (f"{elev} मीटर पर हवा पतली — साँस फूलेगी।", f"{elev}m — hawa patli, saans phoolegi")

    def b_network():
        if bsnl_only:
            return ("यहाँ सिर्फ़ BSNL टिकता है — बाकी सब डेड।", "Yahan sirf BSNL — baaki sab dead")
        if len(nets) == 1:
            return (f"यहाँ सिर्फ़ {nets[0].upper()} का नेटवर्क चलता है।", f"Yahan sirf {nets[0].upper()} ka network")
        return None

    def b_fuel():
        if not (carry_extra and pump_ok):
            return None
        return (f"पेट्रोल सिर्फ़ {pump} में — टंकी फुल, जरकन साथ।",
                f"Petrol sirf {pump} mein — tank full, jerry can saath")

    def b_cold():
        if summer_low is None or summer_low > 8:
            return None
        return (f"गर्मियों में भी रातें {summer_low} डिग्री — थर्मल साथ लाना।",
                f"Garmi mein bhi raatein {summer_low}°C — thermals laao")

    def b_food():
        if not dish:
            return None
        if eatery:
            return (f"और जाते-जाते {dish} ज़रूर — {eatery} का।",
                    f"Jaate-jaate {dish} zaroor — {eatery} ka")
        return (f"और यहाँ का {dish} खाना मत भूलना।", f"Yahan ka {dish} miss mat karna")

    def b_cost():
        if not price:
            return None
        m = re.findall(r"\d[\d,]*", str(price))
        if not m or int(m[0].replace(",", "")) > 2500:
            return None
        return (f"और रुकना सस्ता — सिर्फ़ ₹{m[0]} से।", f"Rukna sasta — sirf ₹{m[0]} se")

    def b_drive():
        return ("यहाँ मंज़िल नहीं — रास्ता ही असली सफ़र है।", "Yahan manzil nahi — raasta hi safar hai")

    def b_emergency():
        val = (safety.get("value") or phone or "").strip()
        if not val:
            return None
        label = (safety.get("label") or helper_name or "").strip()
        # don't render "Emergency: emergency" when the label is generic
        cap = f"Emergency: {label} → {val}" if label and label.lower() not in (
            "emergency", "rescue", "local rescue", "helpline") else f"Emergency → {val}"
        # keep the number readable in the caption: trim an over-long label tail
        if len(cap) > 80:
            cap = f"Emergency → {val}"
        return ("इमरजेंसी में मदद का एक नंबर — caption में सेव कर लो।", cap)

    def b_wait_reason():
        nl = note.lower()
        if any(k in nl for k in ("monsoon", "rain", "rainfall", "flood")):
            return ("अभी मानसून — रास्ते फिसलन भरे, ट्रेल और नज़ारे बंद।",
                    "Abhi monsoon — raaste fisalan-bhare, trail/view band")
        if any(k in nl for k in ("snow", "closed", "pass clos", "blocked")):
            return ("रास्ता अभी बंद — बर्फ़ और बंद दर्रे।", "Raasta abhi band — barf, darre band")
        if any(k in nl for k in ("heat", "38", "40", "42", "45", "47", "brutal", "hot")):
            return ("अभी झुलसाने वाली गर्मी — दिन में घूमना मुश्किल।", "Abhi jhulsane wali garmi — ghoomna mushkil")
        if summer_low is not None and summer_low <= 4:
            return (f"और रातें {summer_low} डिग्री तक — हालात अभी सही नहीं।", f"Raatein {summer_low}°C tak — haalat sahi nahi")
        return ("अभी का मौसम इस जगह के हक़ में नहीं।", "Abhi ka mausam is jagah ke haq mein nahi")

    def b_shock():
        return (f"और अभी का स्कोर — सिर्फ़ {disp_voice}।", f"Aur abhi ka score — sirf {disp}")

    def b_receipt():
        return ("मौसम, सड़क, भीड़, अस्पताल, नेटवर्क — पाँचों परखे, तभी " + disp_voice + "।",
                f"Mausam · sadak · bheed · hospital · network → {disp}")

    def b_cta(kind):
        if kind == "warn":
            return ("जाने से पहले पूरी कुंडली NakshIQ पे देख लेना।", "Jaane se pehle poori kundli — NakshIQ pe")
        if kind == "wait":
            return ("बेहतर महीना NakshIQ पे देखो, फिर निकलो।", "Behtar mahina NakshIQ pe — phir niklo")
        # gem/food/drive — the hook owns "viral hone se pehle", so the CTA differs
        return ("अभी save कर लो — अगली मंज़िल यही।", "Save karo — agli manzil yahi")

    # ── STORY-SPINE beats (2026-06-18) — Hook → Tension → Payoff → Turn.
    # Reuses the verified beat-builders above; the score becomes EARNED evidence
    # inside the TURN (not a standalone "we checked 5 things → score" receipt),
    # so the short reads as one narrative instead of a data checklist. Gated by
    # NAKSHIQ_YT_STORY_SPINE (default ON); =0 → legacy data-receipt assembly.
    _STORY_SPINE = os.environ.get("NAKSHIQ_YT_STORY_SPINE", "1") != "0"
    _HI_MONTHS = {1: "जनवरी", 2: "फ़रवरी", 3: "मार्च", 4: "अप्रैल", 5: "मई", 6: "जून",
                  7: "जुलाई", 8: "अगस्त", 9: "सितंबर", 10: "अक्टूबर", 11: "नवंबर", 12: "दिसंबर"}
    _best = dest.get("best_months") or []

    def b_tag():
        cl = _hi_clauses(tagline_hi)
        return (cl[0] + "।", deva_to_latin(cl[0])) if cl else None

    def b_when_wait():
        try:
            bm = _HI_MONTHS.get(int(_best[0])) if _best else None
        except Exception:
            bm = None
        if bm:
            return (f"रुक जाओ — {bm} में जाओ, तब ये जगह अपने असली रंग में होती है।",
                    f"Ruk jao — {bm} mein, tab asli rang")
        return ("रुक जाओ — सही मौसम का इंतज़ार करो।", "Ruk jao — sahi mausam ka intezaar")

    def b_when_go():
        return ("और अभी मौसम इसके हक़ में है — सही वक़्त यही है।",
                "Aur abhi mausam iske haq mein — sahi waqt yahi")

    def b_warn_rule():
        if elev and elev >= 3500:
            return ("एक नियम — ऊँचाई पर शरीर को ढलने का वक़्त दो, वरना पहाड़ की बीमारी तोड़ देगी।",
                    "Ek niyam — body ko dhalne do, warna pahaad ki bimari")
        if carry_extra and pump_ok:
            return (f"पेट्रोल सिर्फ़ {pump} में मिलेगा — टंकी फुल रखो, जरकन साथ।",
                    f"Petrol sirf {pump} — tank full, jerry can saath")
        if summer_low is not None and summer_low <= 4:
            return (f"रातें {summer_low} डिग्री तक गिरती हैं — गर्म कपड़े ज़रूर।",
                    f"Raatein {summer_low}°C tak — garam kapde zaroor")
        return ("जाओ — पर पूरी तैयारी के साथ।", "Jao — par poori taiyari ke saath")

    def b_warn_extra():
        if bsnl_only:
            return ("और यहाँ सिर्फ़ BSNL टिकता है — बाकी सब डेड।", "Sirf BSNL — baaki sab dead")
        if net and not nets:
            return ("और फ़ोन यहाँ काम नहीं करेगा — सब पहले से सेव कर लो, किसी को अपनी योजना बता दो।",
                    "Phone nahi chalega — sab save, plan batao")
        if summer_low is not None and summer_low <= 4 and not (elev and elev >= 3500):
            return (f"और रातें {summer_low} डिग्री तक — गर्म कपड़े साथ।", f"Raatein {summer_low}°C — garam kapde")
        return b_emergency()

    def b_turn(a):
        if a == "wait":
            return (f"अभी का स्कोर सिर्फ़ {disp_voice} — जगह बुरी नहीं, महीना ग़लत है।",
                    f"Abhi score {disp} — jagah nahi, mahina galat")
        if a == "warn":
            return (f"इसीलिए स्कोर {disp_voice} — ख़ूबसूरती के लिए नहीं, बल्कि इसलिए कि सही तैयारी के साथ ये जगह बदल देती है।",
                    f"Isliye score {disp} — sahi taiyari ke saath ye jagah badal deti hai")
        if a == "food":
            return (f"स्कोर {disp_voice} — और यही स्वाद बार-बार वापस खींचता है।",
                    f"Score {disp} — yahi swaad wapas kheenchta hai")
        if a == "drive":
            return (f"स्कोर {disp_voice} — पर असली इनाम मंज़िल नहीं, वो रास्ता है।",
                    f"Score {disp} — asli inaam manzil nahi, raasta hai")
        return (f"स्कोर {disp_voice} — वायरल होने से पहले देख लो।",
                f"Score {disp} — viral hone se pehle dekh lo")

    # ── arc selection (priority cascade) ──
    is_risky = (elev and elev >= 3500) or diff == "hard" or bsnl_only
    has_drive = last_km == "hard" or any(
        k in road for k in ("landslide", "pass", "4wd", "4x4", "narrow", "unpaved", "single-lane", "single lane"))
    even = (sum(ord(c) for c in (dest.get("id") or "x")) % 2 == 0)
    profile = _profile_for(dest)

    if _STORY_SPINE:
        # Hook → Tension → Payoff → Turn (score folded into the turn as earned).
        if raw <= 2:                                # WAIT
            arc, kind = "wait", "wait"
            profile = "swara_deep" if even else "madhur_deep"
            body = [b_hook("wait"), b_wait_reason(), b_when_wait(), b_turn("wait")]
        elif is_risky:                              # WARN (go prepared)
            arc, kind = "warn", "warn"
            profile = "swara_deep" if even else "madhur_deep"
            body = [b_hook("warn"), b_why(punchy=False) or b_tag(), b_warn_rule(), b_warn_extra(), b_turn("warn")]
        elif dish and eatery and raw >= 4:          # FOOD
            arc, kind = "food", "gem"
            body = [b_hook("food"), b_why(punchy=False) or b_tag(), b_food(), b_turn("food")]
        elif has_drive and raw >= 3:                # DRIVE
            arc, kind = "drive", "gem"
            body = [b_hook("drive"), b_why(punchy=False) or b_tag(), b_fuel() or b_cold() or b_drive(), b_turn("drive")]
        else:                                       # GEM (default, go-now)
            arc, kind = "gem", "gem"
            body = [b_hook("gem"), b_why(punchy=False) or b_tag(),
                    b_food() or b_cold() or b_cost() or b_network() or b_altitude() or b_when_go(),
                    b_turn("gem")]
        seen, uniq = set(), []
        for beat in body:
            if not beat:
                continue
            k = beat[1].lower()[:26]
            if k in seen:
                continue
            seen.add(k); uniq.append(beat)
        # floor: never ship fewer than hook + turn
        if len(uniq) < 2:
            uniq = [b for b in (b_hook(arc), b_turn(kind if kind == "wait" else "gem")) if b]
        seq = uniq[:6] + [b_cta(kind)]
    else:
        if raw <= 2:                                   # DON'T-GO / WAIT (score leads)
            arc, kind = "wait", "wait"
            profile = "swara_deep" if even else "madhur_deep"
            body = [b_hook("wait"), b_shock(), b_wait_reason()]
        elif is_risky:                                  # WARN-then-WHY (go prepared)
            arc, kind = "warn", "warn"
            profile = "swara_deep" if even else "madhur_deep"
            body = [b_hook("warn"), b_why(), b_fuel() or b_network() or b_cold(), b_emergency()]
        elif dish and eatery and raw >= 4:              # FOOD-ANCHOR
            arc, kind = "food", "gem"
            body = [b_hook("food"), b_why(), b_food(), b_cost() or b_network()]
        elif has_drive and raw >= 3:                    # THE-DRIVE
            arc, kind = "drive", "gem"
            body = [b_hook("drive"), b_why(), b_fuel() or b_network() or b_cold()]
        else:                                            # GEM (default, go-now)
            arc, kind = "gem", "gem"
            body = [b_hook("gem"), b_why(), b_food() or b_cold() or b_cost() or b_network() or b_altitude()]
        seen, uniq = set(), []
        for beat in body:
            if not beat:
                continue
            k = beat[1].lower()[:26]
            if k in seen:
                continue
            seen.add(k); uniq.append(beat)
        body = uniq
        if len(body) < 3:
            for c in _hi_clauses(why_hi):
                cand = (c + "।", deva_to_latin(c))
                if cand[1].lower()[:26] not in seen:
                    body.append(cand); seen.add(cand[1].lower()[:26])
                if len(body) >= 3:
                    break
        if len(body) < 2:
            where = f"{state} की " if state else ""
            body = [(f"{name} — {where}एक ऐसी जगह जिसे लोग अक्सर miss कर देते हैं।",
                     f"{name}{(' — ' + state) if state else ''}")]
        cap = 5 if arc == "warn" else 4
        seq = body[:cap] + [b_receipt(), b_cta(kind)]

    lines = [_single_sentence(d) for d, _ in seq]   # 1 sentence/line → captions stay 1:1
    caps = [c for _, c in seq]
    return {
        "lines": lines[:7],
        "caption_lines": caps[:7],
        "voice_profile": profile,
        "arc": arc,
        "generated": True,
    }


def _template_spec_en(dest: dict) -> dict:
    """ENGLISH variant for international / inbound travellers — same 5-arc engine
    and the SAME verified data, but English script + English (Indian-English)
    voice. Captions == voice (English, no transliteration). One sentence per
    beat. $0, no runtime LLM, no fabrication."""
    name = dest.get("name") or dest.get("id") or "This place"
    state = dest.get("state") or ""
    raw = dest.get("score") or 3
    disp = _format_score(raw)                         # "10/10"
    disp_v = disp.replace("/", " out of ")            # spoken: "10 out of 10"

    intel = dest.get("intel") or {}
    net = intel.get("network") or {}
    fuel = intel.get("fuel") or {}
    wx = intel.get("weather_night") or {}
    sos = intel.get("sos") or {}
    reach = intel.get("reach") or {}
    leg = intel.get("legendary_eatery") or {}
    safety = sos.get("safety_contact") if isinstance(sos.get("safety_contact"), dict) else {}
    safety = safety or {}
    helper = sos.get("local_helper") if isinstance(sos.get("local_helper"), dict) else {}
    helper = helper or {}

    tagline = (dest.get("tagline") or "").strip()
    why = dest.get("why_special") or ""
    note = (dest.get("note") or "").strip()
    elev = dest.get("elevation_m")
    diff = (dest.get("difficulty") or "").lower()
    price = dest.get("price_range_inr")
    dish = dest.get("hero_dish")
    eatery = (leg.get("name") if isinstance(leg, dict) else None) or dest.get("eatery_name")
    summer_low = wx.get("summer_low_c")
    pump = _lead_token(fuel.get("nearest_petrol_pump"))
    pump_ok = bool(pump) and len(pump) <= 22 and pump[:1].isupper() and not re.search(
        r"(?i)\b(town|city|everywhere|multiple|n/?a|none|local|nearest|all)\b", pump)
    carry_extra = bool(fuel.get("carry_extra"))
    road = (reach.get("road_condition") or "").lower()
    last_km = (reach.get("last_km_difficulty") or "").lower()
    nets = [k for k in ("jio", "airtel", "bsnl", "vi") if net.get(k)]
    bsnl_only = bool(net.get("bsnl")) and not (net.get("jio") or net.get("airtel") or net.get("vi"))

    def _en(s):
        return (s, s)

    def b_hook(arc):
        if arc == "wait":
            return _en(f"Going to {name} right now — that's the mistake.")
        if arc == "warn":
            if elev and elev >= 3500:
                return _en(f"{elev} metres up — one wrong move, and help is hours away.")
            return _en(f"{name} is stunning — but one slip here costs you.")
        if arc == "food" and dish:
            return _en(f"In {name}, skip the {dish} and you've missed the point.")
        if arc == "drive":
            if pump_ok:
                return _en(f"Past {pump}, the road itself becomes the destination.")
            return _en(f"In {name}, forget the destination — the drive is the story.")
        return _en(f"{name} — save this before everyone else finds it.")

    def b_why(punchy=True):
        cl = _en_clauses(why) or _en_clauses(tagline)
        if not cl:
            return None
        if punchy:
            sig = [c for c in cl if re.search(r"\d", c) or re.search(
                r"(?i)\b(only|largest|highest|first|oldest|world|rare|biggest|best|second)\b", c)]
            cl = sig or cl
        return _en(cl[0] + ".")

    def b_altitude():
        if not elev or elev < 3500:
            return None
        if elev >= 5000:
            return _en(f"At {elev} metres, the air holds half the oxygen of sea level.")
        return _en(f"At {elev} metres the air is thin — you'll feel every step.")

    def b_network():
        if bsnl_only:
            return _en("Only BSNL works here — every other network is dead.")
        if len(nets) == 1:
            return _en(f"Only {nets[0].upper()} holds a signal here.")
        return None

    def b_fuel():
        if not (carry_extra and pump_ok):
            return None
        return _en(f"The last fuel is at {pump} — fill up and carry a spare can.")

    def b_cold():
        if summer_low is None or summer_low > 8:
            return None
        return _en(f"Even in summer, nights fall to {summer_low} degrees — pack warm.")

    def b_food():
        if not dish:
            return None
        if eatery:
            return _en(f"And don't leave without the {dish}, at {eatery}.")
        return _en(f"And don't miss the local {dish}.")

    def b_cost():
        if not price:
            return None
        m = re.findall(r"\d[\d,]*", str(price))
        if not m or int(m[0].replace(",", "")) > 2500:
            return None
        return _en(f"And it's cheap — stays start at just {m[0]} rupees.")

    def b_emergency():
        val = (safety.get("value") or helper.get("phone") or "").strip()
        if not val:
            return None
        label = (safety.get("label") or helper.get("name") or "").strip()
        cap = f"Emergency: {label} → {val}" if label and label.lower() not in (
            "emergency", "rescue", "local rescue", "helpline") else f"Emergency → {val}"
        if len(cap) > 80:
            cap = f"Emergency → {val}"
        return ("Save one emergency number before you go — it's below.", cap)

    def b_wait_reason():
        nl = note.lower()
        if any(k in nl for k in ("monsoon", "rain", "rainfall", "flood")):
            return _en("It's monsoon now — trails shut, roads slick, views fogged out.")
        if any(k in nl for k in ("snow", "closed", "pass clos", "blocked")):
            return _en("The route's closed now — snow and blocked passes.")
        if any(k in nl for k in ("heat", "38", "40", "42", "45", "47", "brutal", "hot")):
            return _en("It's brutally hot right now — the middle of the day is rough.")
        if summer_low is not None and summer_low <= 4:
            return _en(f"Nights drop to {summer_low} degrees — conditions aren't right yet.")
        return _en("The weather just isn't on your side right now.")

    def b_shock():
        return _en(f"Its score right now — just {disp}.")

    def b_receipt():
        return (f"Weather, road, crowd, hospital, signal — all five checked, and that's a {disp_v}.",
                f"Weather · road · crowd · hospital · signal → {disp}")

    def b_cta(kind):
        if kind == "warn":
            return _en("See the full breakdown on NakshIQ before you go.")
        if kind == "wait":
            return _en("Check a better month on NakshIQ first.")
        return _en("Save it — your next trip might start here.")

    # ── STORY-SPINE beats (2026-06-19) — mirror of the Hindi engine: Hook →
    # Tension → Payoff → Turn, with the score folded into the TURN as EARNED
    # evidence (not a standalone "5 things checked → score" receipt). Reuses the
    # verified beat-builders above. Same flag as Hindi (NAKSHIQ_YT_STORY_SPINE,
    # default ON); =0 → legacy data-receipt assembly. No fabrication.
    _STORY_SPINE = os.environ.get("NAKSHIQ_YT_STORY_SPINE", "1") != "0"
    _EN_MONTHS = {1: "January", 2: "February", 3: "March", 4: "April", 5: "May",
                  6: "June", 7: "July", 8: "August", 9: "September", 10: "October",
                  11: "November", 12: "December"}
    _best = dest.get("best_months") or []

    def b_tag():
        cl = _en_clauses(tagline)
        return _en(cl[0] + ".") if cl else None

    def b_when_wait():
        try:
            bm = _EN_MONTHS.get(int(_best[0])) if _best else None
        except Exception:
            bm = None
        if bm:
            return _en(f"Wait — go in {bm}, when this place is at its best.")
        return _en("Wait for the right season — that's when it's worth it.")

    def b_when_go():
        return _en("And right now the weather's on your side — this is the window.")

    def b_warn_rule():
        if elev and elev >= 3500:
            return _en("One rule — give your body a day to adjust to the altitude, or it will break you.")
        if carry_extra and pump_ok:
            return _en(f"The last fuel is at {pump} — fill the tank and carry a spare can.")
        if summer_low is not None and summer_low <= 4:
            return _en(f"Nights drop to {summer_low} degrees — pack proper warm layers.")
        return _en("Go — but go fully prepared.")

    def b_warn_extra():
        if bsnl_only:
            return _en("And only BSNL works here — every other network is dead.")
        if net and not nets:
            return _en("And your phone won't work here — download everything first, and tell someone your plan.")
        if summer_low is not None and summer_low <= 4 and not (elev and elev >= 3500):
            return _en(f"And nights drop to {summer_low} degrees — carry warm layers.")
        return b_emergency()

    def b_drive_line():
        return _en("Out here it's not about arriving — the road is the whole trip.")

    def b_turn(a):
        if a == "wait":
            return (f"Right now it scores just {disp_v} — the place isn't the problem, the month is.",
                    f"Right now — just {disp}. Not the place, the month.")
        if a == "warn":
            return (f"That's why it scores {disp_v} — not for the views, but because with the right prep, this place changes you.",
                    f"That's the {disp} — earned with the right prep.")
        if a == "food":
            return (f"It scores {disp_v} — and that one taste is what pulls you back.",
                    f"Scores {disp} — and that taste pulls you back.")
        if a == "drive":
            return (f"It scores {disp_v} — but the real reward isn't the destination, it's the road.",
                    f"Scores {disp} — the road is the reward.")
        return (f"It scores {disp_v} — see it before it goes viral.",
                f"Scores {disp} — see it before it goes viral.")

    is_risky = (elev and elev >= 3500) or diff == "hard" or bsnl_only
    has_drive = last_km == "hard" or any(
        k in road for k in ("landslide", "pass", "4wd", "4x4", "narrow", "unpaved", "single-lane", "single lane"))
    even = (sum(ord(c) for c in (dest.get("id") or "x")) % 2 == 0)

    def _prof(bright):
        if bright:
            return "en_bright_f" if even else "en_bright_m"
        return "en_deep_f" if even else "en_deep_m"

    if _STORY_SPINE:
        # Hook → Tension → Payoff → Turn (score folded into the turn as earned).
        if raw <= 2:                                # WAIT
            arc, kind, profile = "wait", "wait", _prof(False)
            body = [b_hook("wait"), b_wait_reason(), b_when_wait(), b_turn("wait")]
        elif is_risky:                              # WARN (go prepared)
            arc, kind, profile = "warn", "warn", _prof(False)
            body = [b_hook("warn"), b_why(punchy=False) or b_tag(), b_warn_rule(), b_warn_extra(), b_turn("warn")]
        elif dish and eatery and raw >= 4:          # FOOD
            arc, kind, profile = "food", "gem", _prof(True)
            body = [b_hook("food"), b_why(punchy=False) or b_tag(), b_food(), b_turn("food")]
        elif has_drive and raw >= 3:                # DRIVE
            arc, kind, profile = "drive", "gem", _prof(True)
            body = [b_hook("drive"), b_why(punchy=False) or b_tag(), b_fuel() or b_cold() or b_drive_line(), b_turn("drive")]
        else:                                       # GEM (default, go-now)
            arc, kind, profile = "gem", "gem", _prof(True)
            body = [b_hook("gem"), b_why(punchy=False) or b_tag(),
                    b_food() or b_cold() or b_cost() or b_network() or b_altitude() or b_when_go(),
                    b_turn("gem")]
        seen, uniq = set(), []
        for beat in body:
            if not beat:
                continue
            k = beat[1].lower()[:26]
            if k in seen:
                continue
            seen.add(k); uniq.append(beat)
        if len(uniq) < 2:
            uniq = [b for b in (b_hook(arc), b_turn(kind if kind == "wait" else "gem")) if b]
        seq = uniq[:6] + [b_cta(kind)]
    else:
        if raw <= 2:
            arc, kind, profile = "wait", "wait", _prof(False)
            body = [b_hook("wait"), b_shock(), b_wait_reason()]
        elif is_risky:
            arc, kind, profile = "warn", "warn", _prof(False)
            body = [b_hook("warn"), b_why(), b_fuel() or b_network() or b_cold(), b_emergency()]
        elif dish and eatery and raw >= 4:
            arc, kind, profile = "food", "gem", _prof(True)
            body = [b_hook("food"), b_why(), b_food(), b_cost() or b_network()]
        elif has_drive and raw >= 3:
            arc, kind, profile = "drive", "gem", _prof(True)
            body = [b_hook("drive"), b_why(), b_fuel() or b_network() or b_cold()]
        else:
            arc, kind, profile = "gem", "gem", _prof(True)
            body = [b_hook("gem"), b_why(), b_food() or b_cold() or b_cost() or b_network() or b_altitude()]
        seen, uniq = set(), []
        for beat in body:
            if not beat:
                continue
            k = beat[1].lower()[:26]
            if k in seen:
                continue
            seen.add(k); uniq.append(beat)
        body = uniq
        if len(body) < 3:
            for c in _en_clauses(why):
                cand = (c + ".", c + ".")
                if cand[1].lower()[:26] not in seen:
                    body.append(cand); seen.add(cand[1].lower()[:26])
                if len(body) >= 3:
                    break
        if len(body) < 2:
            body = [_en(f"{name} — a corner of {state or 'India'} most travellers walk right past.")]
        cap = 5 if arc == "warn" else 4
        seq = body[:cap] + [b_receipt(), b_cta(kind)]
    lines = [_single_sentence(d) for d, _ in seq]
    caps = [c for _, c in seq]
    return {
        "lines": lines[:7],
        "caption_lines": caps[:7],
        "voice_profile": profile,
        "arc": arc,
        "lang": "en",
        "generated": True,
    }


# ─────────────────────────────────────────────────────────────────────────
# 1a-VARIETY. Non-score narrated formats (2026-06-21) — so the channel isn't
#     100% "NakshIQ score". Same render pipeline + voice; different STORY.
#     Zero fabrication: every fact is a clause of why_special / tagline.
# ─────────────────────────────────────────────────────────────────────────

def _template_spec_did_you_know(dest: dict, lang: str = "hi"):
    """Narrated 'Did You Know' awe-fact short — opens on a VERIFIED striking fact
    (the why_special / tagline clause), not the score. Returns None when the dest
    has no usable fact (caller falls back to the score short)."""
    name = dest.get("name") or dest.get("id") or "this place"
    prof = _profile_for(dest)
    if lang == "en":
        cl = _en_clauses(dest.get("why_special") or "") or _en_clauses(dest.get("tagline") or "")
        if not cl:
            return None
        sig = [c for c in cl if re.search(r"\d", c) or re.search(
            r"(?i)\b(only|largest|highest|first|oldest|world|rare|biggest|second|last|hidden)\b", c)]
        facts = (sig or cl)[:2]
        seq = [f"Here's something most people don't know about {name}."]
        seq += [c.strip().rstrip(".") + "." for c in facts]
        seq.append("Details like that are the whole reason it's worth the trip.")
        seq.append("Full story, and the right month to go — on NakshIQ.")
        lines = [_single_sentence(s) for s in seq]
        caps = list(lines)
    else:
        cl = _hi_clauses(dest.get("why_special_hi") or "") or _hi_clauses(dest.get("tagline_hi") or "")
        if not cl:
            return None
        sig = [c for c in cl if re.search(r"\d", c) or any(
            s in c for s in ("सबसे", "एकमात्र", "अकेल", "दुनिया", "विश्व", "पहल",
                             "आख़िर", "आखिर", "रहस्य", "केवल", "अनोखा", "अनोखी"))]
        facts = (sig or cl)[:2]
        deva = [f"{name} के बारे में एक बात — जो कम लोग जानते हैं।"]
        deva += [c.strip().rstrip("।") + "।" for c in facts]
        deva.append("यही छोटी-छोटी बातें इस जगह को खास बनाती हैं।")
        deva.append("पूरी कहानी और सही महीना — NakshIQ पे।")
        lines = [_single_sentence(d) for d in deva]
        caps = [deva_to_latin(d) for d in deva]
    return {"lines": lines[:6], "caption_lines": caps[:6], "voice_profile": prof,
            "arc": "did_you_know", "lang": lang, "generated": True}


def _template_spec_vs(a: dict, b: dict, lang: str = "hi"):
    """Honest two-destination comparison for the SAME month — verified scores +
    one distinguishing clause each. None if names missing. The video uses dest
    `a`'s footage; `b` is named in the script only."""
    na = a.get("name"); nb = b.get("name")
    if not na or not nb:
        return None
    sa = a.get("score") or 0; sb = b.get("score") or 0
    win = a if sa >= sb else b
    prof = _profile_for(win)
    if lang == "en":
        ca = (_en_clauses(a.get("why_special") or a.get("tagline") or "") or [""])[0].strip().rstrip(".")
        cb = (_en_clauses(b.get("why_special") or b.get("tagline") or "") or [""])[0].strip().rstrip(".")
        seq = [f"{na} or {nb} this month? Let's settle it."]
        seq.append(f"{na}: {ca}." if ca else f"{na} scores {_format_score(sa)} right now.")
        seq.append(f"{nb}: {cb}." if cb else f"{nb} scores {_format_score(sb)} right now.")
        seq.append(f"The honest call this month: {win.get('name')}, at {_format_score(win.get('score'))}.")
        seq.append("Both re-checked every month on NakshIQ — no sponsors, just the data.")
        lines = [_single_sentence(s) for s in seq]
        caps = list(lines)
    else:
        ca = (_hi_clauses(a.get("why_special_hi") or a.get("tagline_hi") or "") or [""])[0].strip().rstrip("।")
        cb = (_hi_clauses(b.get("why_special_hi") or b.get("tagline_hi") or "") or [""])[0].strip().rstrip("।")
        ws = _format_score(win.get("score")).replace("/", " बटा ")
        deva = [f"{na} या {nb} — इस महीने कौन बेहतर?"]
        deva.append(f"{na} — {ca}।" if ca else f"{na} का स्कोर {_format_score(sa).replace('/', ' बटा ')}।")
        deva.append(f"{nb} — {cb}।" if cb else f"{nb} का स्कोर {_format_score(sb).replace('/', ' बटा ')}।")
        deva.append(f"ईमानदार जवाब अभी — {win.get('name')}, स्कोर {ws}।")
        deva.append("दोनों की पूरी जाँच हर महीने — NakshIQ पे।")
        lines = [_single_sentence(d) for d in deva]
        caps = [deva_to_latin(d) for d in deva]
    return {"lines": lines[:6], "caption_lines": caps[:6], "voice_profile": prof,
            "arc": "this_vs_that", "lang": lang, "generated": True}


# ─────────────────────────────────────────────────────────────────────────
# 1b. "LANDING IN INDIA" — arrival-logistics reels for inbound travellers
#     A SEPARATE content type (NOT a destination score). English, en-IN voice.
#     Beats are field-gated against data/arrivals/arrivals.json (verified +
#     sourced; see AUDIT-arrivals-*.md). $0, no runtime LLM, no fabrication:
#     an unconfirmed airport-transport fact is `null` → the beat falls back to
#     the always-true prepaid-taxi line (honest scarcity).
# ─────────────────────────────────────────────────────────────────────────

ARRIVALS_FILE = HERE / "data" / "arrivals" / "arrivals.json"


def load_arrivals() -> Optional[dict]:
    """Return {"national": {...}, "airports": [...]} or None if the bank is
    missing/unreadable."""
    try:
        return json.loads(ARRIVALS_FILE.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"arrivals: bank unavailable ({e})")
        return None


def _template_spec_arrival(airport: dict, national: dict) -> dict:
    """Deterministic, field-gated arrival-logistics script for one gateway
    airport. Same caption==voice / one-sentence-per-beat discipline as the
    English destination engine. Returns the standard spec shape."""
    city = (airport.get("city") or "your city").strip()
    code = (airport.get("code") or "").strip().upper()
    vibe = (airport.get("vibe") or "").strip()              # city first-impression
    transport = (airport.get("transport") or "").strip()    # airport-specific ride
    signature = (airport.get("signature") or "").strip()    # city distinctive tip
    ride_note = (airport.get("ride_note") or "").strip()    # Goa taxi override

    visa = (national.get("visa") or "").strip()
    tips = national.get("tips") or {}

    # Rotate the constant national advice so reels DON'T all read with the same
    # four lines: one safety tip + one extra, picked deterministically per airport.
    idx = sum(ord(c) for c in code) if code else 0
    safety_pool = [t for t in (tips.get("taxi_safe", ""), tips.get("scam", "")) if t]
    extra_pool = [t for t in (tips.get("sim", ""), tips.get("money", ""),
                              tips.get("water", ""), tips.get("mrp", "")) if t]
    safety = safety_pool[idx % len(safety_pool)] if safety_pool else ""
    # Goa: the prepaid-taxi/app-cab line is wrong (ride apps are limited) — swap in
    # the airport's own ride note whenever the taxi tip is the one that came up.
    if ride_note and safety == tips.get("taxi_safe", ""):
        safety = ride_note
    extra = extra_pool[idx % len(extra_pool)] if extra_pool else ""

    # The city-specific lines (vibe / transport / signature) carry the
    # differentiation; visa anchors the value; safety + extra rotate. The hook
    # names the city. Skip blanks; dedupe.
    hook = f"Just landed in {city}?"
    body = [vibe, visa, transport, signature, safety, extra]
    cta = "Save this — first-hour guides for every Indian airport on NakshIQ."

    seq, seen = [hook], set()
    for s in body + [cta]:
        s = (s or "").strip()
        if not s:
            continue
        k = s.lower()[:28]
        if k in seen:
            continue
        seen.add(k)
        seq.append(s)

    # Keep it Short-length: hook + up to 7 body + CTA (≤9 lines).
    if len(seq) > 9:
        seq = seq[:8] + seq[-1:]
    lines = [_single_sentence(s) for s in seq]

    even = (sum(ord(c) for c in code) % 2 == 0)
    return {
        "lines": lines,
        "caption_lines": lines,           # captions == voice (English)
        "voice_profile": "en_arrival",
        "arc": "arrive",
        "lang": "en",
        "arrival": True,
        "code": code,
        "city": city,
        "generated": True,
        "even": even,
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


def _word_cues(bounds: list, caption_texts: list = None, max_words: int = 2) -> list:
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
        words = [w for w in txt.split() if w not in ("—", "-", "–", "·", "|")]
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


def build_ass(cues, score_disp, name, total_dur, out_ass: Path, hook: dict = None):
    W = _ass_color(BONE); V = _ass_color(VERMILLION); S = _ass_color(SAFFRON)
    INK = _ass_color(INK_DEEP)
    vermillion_bg = (VERMILLION[4:6] + VERMILLION[2:4] + VERMILLION[0:2]).upper()  # BGR for ASS box
    header = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {REEL_W}
PlayResY: {REEL_H}
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Instrument Sans,104,{W},{W},&H00000000,&H64000000,-1,0,0,0,100,100,1,0,1,7,4,2,96,96,470,1
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

    # HOOK — small kicker + a big token SLAMMING in (0.12 -> hook_end), then it
    # shrinks into the persistent top badge. Destination reels slam the score;
    # arrival reels ("Landing in India") have no score, so they slam the 3-letter
    # airport code and use English/arrival copy instead.
    if hook:
        kicker_txt = hook.get("kicker", "FIRST HOUR IN INDIA")
        slam_txt = hook.get("slam", "")
        badge_txt = hook.get("badge", "")
        cta1_txt = hook.get("cta1", "SAVE THIS")
        cta2_txt = hook.get("cta2", "nakshiq.com")
    else:
        kicker_txt = "JUNE  •  NAKSHIQ SCORE"
        slam_txt = score_disp.replace("/", " / ")
        badge_txt = "  " + name.upper() + "   " + score_disp + "  "
        cta1_txt = "SAVE THIS"
        cta2_txt = "roz naye scores · nakshiq.com"

    hook_end = LEAD + 1.6
    dlg(0.40, hook_end, "Kicker",
        "{\\an5\\pos(540,560)\\fad(150,80)}" + kicker_txt)
    dlg(0.12, hook_end, "Score",
        "{\\an5\\pos(540,800)\\fad(60,120)\\fscx26\\fscy26\\t(0,240,\\fscx120\\fscy120)\\t(240,440,\\fscx100\\fscy100)}"
        + slam_txt)

    # Persistent top badge (after the hook): destination "<NAME> · 10/10", or for
    # arrival "<CITY> · <CODE>" — stays on screen to anchor the reel.
    dlg(hook_end - 0.1, voice_end, "Badge",
        "{\\an8\\pos(540,150)\\fad(180,0)}" + badge_txt)

    # WORD CAPTIONS — big, low (in the bottom scrim), pop-in, synced to voice.
    for (s, e, txt) in cues:
        s2, e2 = s + LEAD, e + LEAD
        # No \\pos / \\an here on purpose: the Cap style's bottom-center alignment
        # (an2) + MarginL/R let libass WRAP long lines within the safe width
        # instead of overflowing the screen edges. \\pos would disable wrapping.
        anim = "{\\fad(45,40)\\fscx82\\fscy82\\t(0,120,\\fscx104\\fscy104)\\t(120,200,\\fscx100\\fscy100)}"
        dlg(s2, e2, "Cap", anim + _ass_escape(txt))

    # CTA hold at the end (after the voice finishes)
    dlg(voice_end + 0.05, total_dur, "CTA",
        "{\\an5\\pos(540,1150)\\fad(140,0)}" + cta1_txt)
    dlg(voice_end + 0.30, total_dur, "Kicker",
        "{\\an5\\pos(540,1320)\\fad(180,0)}" + cta2_txt)

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
        # [0:a] = silent bed of length total_dur — mixing it in (duration=longest)
        # forces the mix to span the FULL clip so the music plays under the CTA
        # hold (TAIL) and completes its fade-out, instead of being cut at the
        # voice end (duration=first dropped the tail -> abrupt clip + dead air).
        fc = (f"[1:a]adelay={int(LEAD*1000)}|{int(LEAD*1000)}[v];"
              f"[2:a]aloop=loop=-1:size=2e9,atrim=0:{total_dur},"
              f"afade=t=in:st=0:d=0.6,afade=t=out:st={total_dur-1.6}:d=1.6,volume=0.16[m];"
              f"[0:a][v][m]amix=inputs=3:duration=longest:dropout_transition=0:normalize=0[mx];"
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
          pitch_override: str = None, eleven_override: str = None,
          lang: str = "hi", spec: dict = None, hook: dict = None) -> Optional[dict]:
    score_disp = _format_score(dest.get("score"))
    name = dest.get("name") or slug

    with tempfile.TemporaryDirectory(prefix="nq_v2_") as td:
        tdp = Path(td)
        # 1. script -> 2. voice (hand-written bank or tone-B template; profile
        #    sets the tuned voice/rate/pitch, CLI flags still override). A caller
        #    can inject a ready-made spec (arrival reels) to bypass _resolve_spec.
        spec = spec or _resolve_spec(slug, dest, lang)
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
        ass = build_ass(cues, score_disp, name, total, tdp / "subs.ass", hook=hook)
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
# Library = Mixkit Stock Music Free License tracks (mixkit.co), named
# "<bucket>-<mixkitId>.mp3". That license is free for commercial + social/YouTube
# use and requires NO attribution, so _CC_BY_CREDIT is intentionally empty.
# (Prohibited: CDs/DVDs, TV/radio broadcast, video games, remix-as-music-track.)
# If you ever add a track that DOES require credit, set _CC_BY_CREDIT and the
# caption builders will append it automatically.
_CC_BY_CREDIT = ""

# Genre buckets (file prefixes) → mapped to content energy for mood-matched music.
#   BRIGHT = high score / go-now / hidden gem  → modern, energetic
#   DEEP   = warning / epic / lower score       → cinematic, propulsive
_MUSIC_POOLS = {
    "bright": ["hype", "edm", "dance", "fast"],   # hip-hop/trap, EDM/trance, dance, action
    "deep":   ["cinematic", "fast"],              # film/orchestral/trailer + driving action
}

_HASHTAG_POOL = ["IncredibleIndia", "India", "IndiaTravel", "TravelIndia", "Shorts",
                 "TravelShorts", "IndianTravel", "Wanderlust", "TravelReels",
                 "HiddenGems", "NakshIQ", "TravelWithIQ", "DataDrivenTravel"]


def _pick_music_v2(profile: str) -> Optional[Path]:
    """Mood-matched track from the genre library, rotated for variety.

    BRIGHT (go-now/gems, score>=8) -> hip-hop/trap, EDM/trance, dance, action.
    DEEP   (warnings/epic, score<=6) -> cinematic (film/orchestral/trailer) + driving action.
    Picks at random across the mood's buckets so consecutive posts differ.
    """
    bright = "bright" in (profile or "")
    buckets = _MUSIC_POOLS["bright" if bright else "deep"]
    cands = []
    for b in buckets:
        cands.extend(MUSIC_V2_DIR.glob(f"{b}-*.mp3"))
    if not cands:                                   # fall back to any track in the dir
        cands = list(MUSIC_V2_DIR.glob("*.mp3")) or list(MUSIC_V2_DIR.glob("*.wav"))
    if cands:
        return random.choice(sorted(cands))
    return _pick_music()


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
    hook = (caps[0] if caps else f"{name} — {disp}").rstrip(".")
    link = _series_link(dest.get("id"), month_name.lower())
    arc = spec.get("arc", "")
    if arc == "did_you_know":
        title = hook[:95]
        body = (f"{hook}.\n\n{name}, {state} — verified field intel, re-checked "
                f"monthly. No fluff, no sponsors.\n\nFull guide → {link}\n\n{_hashtags(name, state)}")
    elif arc == "this_vs_that":
        title = hook[:95]
        body = (f"{hook}.\n\n{name}, {state} — an honest, data-backed call, "
                f"re-checked every month on NakshIQ.\n\nFull guide → {link}\n\n{_hashtags(name, state)}")
    else:
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
    hook = (caps[0] if caps else f"{name} — {disp}").rstrip(".")
    arc = spec.get("arc", "")
    if arc in ("did_you_know", "this_vs_that"):
        body = (f"{hook}.\n\n{name}, {state} — verified, re-checked every month "
                f"on NakshIQ. No fluff, no sponsors.\n\n\U0001f4be Save this for your "
                f"{month_name} trip.\n\n{_hashtags(name, state, 16)}")
    else:
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


def _arc_hook(fmt: str, name: str) -> Optional[dict]:
    """The on-screen hook (kicker / slam / badge / CTA) for a NON-score arc, so
    build_ass() doesn't fall back to its score default — a giant score number +
    'NAKSHIQ SCORE' kicker + '<NAME> 8/10' badge — which made the 2026-06-23
    did_you_know / this_vs_that reels still LOOK like score reels (founder, 06-24:
    "last night again I saw the score reels on insta"). Returns None for
    nakshiq_score (the one weekly slot that SHOULD show the score) / unknown arcs.
    Latin-only: the Kicker/Badge ASS styles use Instrument Sans (no Devanagari),
    the same constraint the score reel already lives under on Hindi posts."""
    name_uc = (name or "").upper()
    if fmt == "did_you_know":
        return {"kicker": "DID YOU KNOW", "slam": "?", "badge": "  " + name_uc + "  ",
                "cta1": "SAVE THIS", "cta2": "more on nakshiq.com"}
    if fmt == "this_vs_that":
        return {"kicker": "THIS OR THAT", "slam": "VS", "badge": "  " + name_uc + "  ",
                "cta1": "SAVE THIS", "cta2": "honest calls · nakshiq.com"}
    return None


def _arc_last_used(days: int = 60) -> dict:
    """arc name → last published date (YYYY-MM-DD) within the trailing window.

    Drives the least-recently-used arc rotation in build_series_short. Arcs
    missing from the result have not published in the window and therefore sort
    FIRST (an empty string precedes any ISO date), which is what makes a newly
    added arc go out on the very next variety slot. Fails to {} — an unreadable
    log degrades to hash-order variety, never to a crash or a dark slot."""
    out: dict = {}
    try:
        from datetime import timedelta
        from autoposter import merged_post_log, load_state
        cut = (date.today() - timedelta(days=days)).isoformat()
        for e in merged_post_log(load_state()):
            d = e.get("date") or (e.get("timestamp") or "")[:10]
            f = e.get("format") or ""
            if not d or d < cut or not f.startswith("yt_short."):
                continue
            arc = f.split(".", 1)[1]
            if d > out.get(arc, ""):
                out[arc] = d
    except Exception as ex:
        print(f"series: arc-history read failed ({ex}) — using hash order")
    return out


def _score_short_recent(days: int = 7) -> bool:
    """True if a `nakshiq_score` short was published in the trailing `days`,
    read from the autoposter's canonical merged post log. Powers the weekly
    score budget in build_series_short (2026-06-23 — founder: "limit the scoring
    to once a week"). Fails toward 'recent' (→ variety) so a log-read error can
    never let an EXTRA score through — the founder wants fewer scores, not more."""
    try:
        from datetime import timedelta
        from autoposter import merged_post_log, load_state
        cut = (date.today() - timedelta(days=days)).isoformat()
        for e in merged_post_log(load_state()):
            d = e.get("date") or (e.get("timestamp") or "")[:10]
            f = e.get("format") or ""
            if d and d >= cut and f.startswith("yt_short") and "nakshiq_score" in f:
                return True
    except Exception as ex:
        print(f"series: score-budget log read failed ({ex}) — assuming recent (variety)")
        return True
    return False


def build_series_short(dry_run: bool = False, preview: bool = False,
                       slug: str = None, month: int = None,
                       lang: str = None) -> Optional[dict]:
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
    # Probe lazily: hero scripts first, then highest-scoring dests, and STOP at
    # the first with footage. has_clip() triggers an R2 fetch on a miss, so we
    # must NOT probe the whole pool (that was ~90 R2 requests/run on GHA).
    dest = None
    if slug:
        dest = next((d for d in dests if d.get("id") == slug), None)
    else:
        ordered = ([d for d in pool if d.get("id") in heroes] +
                   sorted([d for d in pool if d.get("id") not in heroes],
                          key=lambda d: -d.get("score", 0)))
        for d in ordered:
            if has_clip(d):
                dest = d
                break
    if not dest:
        print("series: no eligible destination (needs footage + not posted this month)")
        return None
    slug = dest.get("id")
    # Language: a LOW RATIO of posts go out in English for inbound/international
    # travellers (same accounts). Deterministic per slug+day so retries are
    # stable. Tune or disable via NAKSHIQ_YT_EN_RATIO (default 0.25; 0 = Hindi
    # only). English reuses the same verified data + arcs, en-IN Neerja voice.
    if lang is None:
        ratio = float(os.environ.get("NAKSHIQ_YT_EN_RATIO", "0.25") or 0)
        h = sum(ord(c) for c in (slug + date.today().isoformat())) % 100
        lang = "en" if (ratio > 0 and h < ratio * 100) else "hi"
    print(f"series: picked {slug} (score {dest.get('score')}, {dest.get('state','')}) lang={lang}")

    # 2026-06-23 — WEEKLY SCORE BUDGET. Founder: "limit the scoring to once a
    # week." The score short engages weakly yet was 100% of the channel (then
    # 50% under the 2026-06-21 per-slug variety ratio, which still shipped a
    # score every other day). Cap nakshiq_score at ONE post per
    # NAKSHIQ_YT_SCORE_EVERY_DAYS (default 7), measured against the merged post
    # log. Every other slot is a narrated NON-score arc: 'did_you_know' (verified
    # awe-fact) or 'this_vs_that' (honest comparison). this_vs_that resolves for
    # any pair of named dests, so it's the reliable variety backstop — meaning
    # nakshiq_score posts ONLY on (a) the one weekly score slot, or (b) the rare
    # slot where no variety arc resolves at all (never-silent: a score beats a
    # dark slot). Set NAKSHIQ_YT_SCORE_EVERY_DAYS=0 to restore unconditional score.
    try:
        score_every = int(os.environ.get("NAKSHIQ_YT_SCORE_EVERY_DAYS", "7"))
    except (TypeError, ValueError):
        score_every = 7   # junk env → safe default (fewer scores), never crash
    score_due = (score_every <= 0) or (not _score_short_recent(score_every))
    fmt, spec = None, None
    if not score_due:
        # 2026-08-02 — LEAST-RECENTLY-USED arc rotation (founder: "i dont see
        # any new formats ... all looks same"). This block used to be a fixed
        # preference — "prefer did_you_know, fall back to this_vs_that" — with a
        # coin-flip that only reordered two options. Over 14 days that shipped
        # did_you_know 14× and this_vs_that 13× and nothing else: the 06-23 fix
        # for score-monotony created arc-monotony.
        #
        # Now: order the arcs by how long since each last published (from the
        # canonical merged log), so the arc that has been absent longest goes
        # first and a newly added arc is picked immediately. The slug+day hash
        # only breaks ties, keeping retries deterministic. Adding an arc to
        # ARC_BUILDERS is now the ONLY step needed to put it in rotation.
        _vh = sum(ord(c) for c in (slug + "|v|" + date.today().isoformat())) % 100

        def _mk_dyk():
            return _template_spec_did_you_know(dest, lang), "did_you_know"

        def _mk_vs():
            _other = next((d for d in dests
                           if d.get("id") != slug and d.get("name")), None)
            if not _other:
                return None, "this_vs_that"
            return _template_spec_vs(dest, _other, lang), "this_vs_that"

        ARC_BUILDERS = [("did_you_know", _mk_dyk), ("this_vs_that", _mk_vs)]
        _last = _arc_last_used(days=60)
        # oldest-first; never-used arcs sort first (empty string < any date).
        ordered = sorted(
            ARC_BUILDERS,
            key=lambda ab: (_last.get(ab[0], ""), (_vh + hash(ab[0])) % 100),
        )
        print(f"series: arc order (least-recently-used first) = "
              f"{[a for a, _ in ordered]}")
        for _name, _build in ordered:
            cand, _fmt = _build()
            if cand:
                spec, fmt = cand, _fmt
                break
    if spec is None:
        # the weekly score slot, OR a variety-due slot where no arc resolved.
        spec, fmt = _resolve_spec(slug, dest, lang), "nakshiq_score"
    print(f"series: format={fmt} (score_due={score_due}, every={score_every}d)")
    profile = spec.get("voice_profile") or _profile_for(dest)
    music = _pick_music_v2(profile)

    # 2026-06-24 — the VISUAL must match the arc (see _arc_hook). Without a hook
    # build_ass() stamps the score number + "NAKSHIQ SCORE" + "<NAME> 8/10" on
    # screen, so the non-score reels still looked like score reels. nakshiq_score
    # gets None → keeps the score visual (the one weekly slot that should).
    hook = _arc_hook(fmt, dest.get("name") or slug)

    final_name = f"yt_short_{fmt}_{slug}_{lang}_{date.today().isoformat()}.mp4"
    out = (HERE / final_name) if preview else (Path(tempfile.gettempdir()) / final_name)
    res = build(slug, dest, out, music=music, lang=lang, spec=spec, hook=hook)
    if not res:
        print("series: render failed")
        return None

    credit = _music_credit(music)
    result = {
        "video_bytes": res["video_bytes"],
        "video_filename": final_name,
        "caption": _yt_caption_v2(dest, spec, credit, month_name),
        "ig_caption": _ig_caption_v2(dest, spec, credit, month_name),
        "format": fmt,
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


# ─────────────────────────────────────────────────────────────────────────
# 7b. "LANDING IN INDIA" arrival reels — captions + autoposter entry
# ─────────────────────────────────────────────────────────────────────────

_ARRIVAL_HASHTAGS = ["IncredibleIndia", "IndiaTravel", "FirstTimeInIndia", "TravelIndia",
                     "IndiaTrip", "Shorts", "TravelShorts", "IndiaTips", "BackpackingIndia",
                     "TravelTips", "NakshIQ", "TravelWithIQ"]


def _arrival_link() -> str:
    return ("https://nakshiq.com/en?utm_source=youtube&utm_medium=short"
            "&utm_campaign=nakshiq-arrival")


def _arrival_hashtags(city: str, code: str, n: int = 12) -> str:
    tags = []

    def push(t):
        t = (t or "").replace(" ", "").replace("-", "").replace("&", "")
        if t and t not in tags:
            tags.append(t)
    push(city); push((city or "") + "Airport"); push(code)
    for t in _ARRIVAL_HASHTAGS:
        if len(tags) >= n:
            break
        push(t)
    return " ".join("#" + t for t in tags[:n])


def _arrival_body_lines(spec: dict) -> str:
    """The on-screen body steps (skip the hook + the CTA)."""
    caps = spec.get("caption_lines") or []
    return " ".join(caps[1:-1]).strip() if len(caps) > 2 else ""


def _yt_caption_arrival(airport: dict, spec: dict, music_credit: str) -> str:
    city = airport.get("city") or ""
    code = airport.get("code") or ""
    aname = airport.get("airport_name") or f"{city} Airport"
    hook = f"Just landed at {aname} ({code})? Here's your first hour in India"
    title = f"Landing at {aname} ({code})? Your first hour in India"
    body = (f"{hook}.\n\n{_arrival_body_lines(spec)}\n\n"
            f"Verified, no-fluff India guides → {_arrival_link()}\n\n"
            f"{_arrival_hashtags(city, code)}").replace("  ", " ")
    if music_credit:
        body += f"\n\n{music_credit}"
    return title + "\n\n" + body   # _run_yt_short takes the first line as YT title


def _ig_caption_arrival(airport: dict, spec: dict, music_credit: str) -> str:
    city = airport.get("city") or ""
    code = airport.get("code") or ""
    body = (f"Just landed in {city}? Here's your first hour in India.\n\n"
            f"Visa, SIM, the ride into town, and the one scam to ignore.\n\n"
            f"\U0001f4be Save this before you fly.\n\n"
            f"{_arrival_hashtags(city, code, 16)}")
    if music_credit:
        body += f"\n\n{music_credit}"
    return body


def arrival_due_today() -> bool:
    """True on a deterministic LOW fraction of days, set by NAKSHIQ_YT_ARRIVAL_RATIO
    (default 0 = OFF). Lets a few daily slots run the inbound "Landing in India"
    reel instead of the destination-score reel, on the same accounts."""
    try:
        ratio = float(os.environ.get("NAKSHIQ_YT_ARRIVAL_RATIO", "0") or 0)
    except ValueError:
        ratio = 0.0
    if ratio <= 0:
        return False
    h = sum(ord(c) for c in ("arrival" + date.today().isoformat())) % 100
    return h < ratio * 100


def _arrival_hook(airport: dict) -> dict:
    city = (airport.get("city") or "").upper()
    code = (airport.get("code") or "").upper()
    return {
        "kicker": "FIRST HOUR IN INDIA",
        "slam": code,
        "badge": f"  {city}  ·  {code}  ",
        "cta1": "SAVE THIS",
        "cta2": "your first hour in India · nakshiq.com",
    }


def build_arrival_short(dry_run: bool = False, preview: bool = False,
                        code: str = None) -> Optional[dict]:
    """Autoposter entry for a "Landing in India" arrival reel. Returns the same
    publish-dict shape as build_series_short (so _run_yt_short ships it to
    YouTube + Instagram unchanged), or None to let the caller fall back."""
    bank = load_arrivals()
    if not bank:
        return None
    national = bank.get("national") or {}
    airports = bank.get("airports") or []
    if not airports:
        print("arrival: empty bank")
        return None

    used = set()
    try:
        from autoposter import recently_used_destinations, load_state
        used = recently_used_destinations(load_state()) or set()
    except Exception as e:
        print(f"arrival: cross-flow dedup unavailable ({e})")

    if code:
        pool = [a for a in airports if (a.get("code") or "").upper() == code.upper()]
    else:
        # rotate by date so consecutive arrival slots pick different gateways,
        # and prefer a gateway whose city clip wasn't just used by the score series.
        seed = sum(ord(c) for c in date.today().isoformat()) % len(airports)
        rot = airports[seed:] + airports[:seed]
        pool = [a for a in rot if a.get("clip_slug") not in used] or rot

    airport = None
    for a in pool:
        if _find_clip(a.get("clip_slug", "")) is not None:   # R2 fetch on miss
            airport = a
            break
    if not airport:
        print("arrival: no eligible gateway (needs footage)")
        return None

    code = (airport.get("code") or "").upper()
    city = airport.get("city") or ""
    clip_slug = airport.get("clip_slug") or ""
    spec = _template_spec_arrival(airport, national)
    music = _pick_music_v2("bright")          # arrival = welcoming / upbeat
    hook = _arrival_hook(airport)
    dest = {"id": clip_slug, "name": city, "score": None, "state": airport.get("serves", "")}
    print(f"arrival: picked {code} ({city}, clip={clip_slug}) lines={len(spec.get('lines', []))}")

    final_name = f"yt_short_nakshiq_arrival_{code}_{date.today().isoformat()}.mp4"
    out = (HERE / final_name) if preview else (Path(tempfile.gettempdir()) / final_name)
    res = build(clip_slug, dest, out, music=music, lang="en", spec=spec, hook=hook)
    if not res:
        print("arrival: render failed")
        return None

    credit = _music_credit(music)
    result = {
        "video_bytes": res["video_bytes"],
        "video_filename": final_name,
        "caption": _yt_caption_arrival(airport, spec, credit),
        "ig_caption": _ig_caption_arrival(airport, spec, credit),
        "format": "nakshiq_arrival",
        "duration": res["duration"],
        "music": res.get("music_name", ""),
        "primary_dest_id": clip_slug,
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
    ap.add_argument("--lang", default="hi", choices=["hi", "en"], help="script language (hi=Hindi, en=English/inbound)")
    ap.add_argument("--arrival", default=None, help="render a 'Landing in India' arrival preview for an IATA code, e.g. DEL")
    args = ap.parse_args()

    if args.arrival:
        res = build_arrival_short(preview=True, code=args.arrival)
        if res:
            print(json.dumps({k: v for k, v in res.items() if k != "video_bytes"},
                             indent=2, ensure_ascii=False, default=str))
            print(f"\n✅ Arrival preview: {HERE / res['video_filename']}  ({res['duration']}s)")
            raise SystemExit(0)
        print("❌ arrival build failed")
        raise SystemExit(1)

    dest = _fetch_dest(args.slug, args.month)
    if not dest:
        print(f"destination {args.slug} not found in month {args.month} feed")
        raise SystemExit(1)
    out = Path(args.out) if args.out else HERE / f"preview_{args.slug}.mp4"
    music = Path(args.music) if args.music else None
    res = build(args.slug, dest, out, music=music, voice_override=args.voice,
                rate_override=args.rate, pitch_override=args.pitch,
                eleven_override=args.eleven_voice, lang=args.lang)
    if res:
        print(json.dumps({k: v for k, v in res.items() if k != "video_bytes"},
                         indent=2, ensure_ascii=False, default=str))
        print(f"\n✅ Preview: {res['video']}  ({res['duration']}s)")
    else:
        print("❌ build failed")
