"""
storyboard.py — the missing layer between what a reel SAYS and what it SHOWS.
================================================================================

Built 2026-09-20. The 09-20 diagnosis fixed the cut (one 8s clip looped 3x became
a real multi-shot edit) but left the content untouched: `_shot_list` slices
whatever generic b-roll exists in round-robin, so nothing connects the sentence
playing at 0:08 to the picture on screen at 0:08. Eleven shots of "Leh looks
nice" is still eleven shots of Leh looking nice.

A storyboard fixes that by making one object own all three at once:

    beat = { what the voice SAYS, what the caption READS, what Veo SHOWS }

and by generating the Veo prompt FROM the destination's own verified fields, so
the picture carries the same data the page does. "Roads close within weeks" stops
being a line of narration and becomes a shot of the road closing.

Two rules live in this file as CODE, not as advice, because a rule in a prompt is
a suggestion and a rule in the tool layer is a restriction:

  1. EVERY storyboard must contain exactly one `turn` beat. A travel reel with no
     turn is a screensaver: it has no reason to be watched to the end. `validate`
     raises without one, so a format cannot ship flat.

  2. A prompt is NEVER filled with invented detail. Each format declares which
     destination fields it needs; if one is missing, generation REFUSES for that
     destination rather than writing a plausible sentence. Honest scarcity over
     fabrication is the standing repo rule and it applies to prompts exactly as
     it applies to phone numbers.

Data contract — the `dest` dict as the render path already supplies it
(`_fetch_destinations`, include_intel=1). Everything is optional; formats declare
what they actually require:

    id, name, state, score (0-5 raw; the site renders score*2), note,
    tagline, why_special, elevation_m, difficulty, best_months,
    price_range_inr, hero_dish, eatery_name,
    intel: { weather_night, sos, reach, network, legendary_eatery, fuel }

`months` is an optional {month:int -> {"score","label","sentence"}} map. Formats
that argue about timing need it and refuse without it.

Veo prompt house style, from the 2026-09-20 research and the Flow notes:
  * structure is [Cinematography] + [Subject] + [Action] + [Context] + [Style]
  * present tense, 100-150 words, camera first, mood last
  * NEVER ask Veo for on-screen text — it still renders text badly, and every
    overlay we use is burned in post by build_ass()
  * photorealistic documentary, not talking heads; named places and real weather
    are what keep it off the "AI slop" read
"""
from __future__ import annotations

import json
import re
from datetime import datetime
from pathlib import Path
from typing import Optional

HERE = Path(__file__).resolve().parent
VEO_QUEUE = HERE / "data" / "veo_queue.json"

BEAT_ROLES = ("hook", "escalate", "build", "turn", "act", "payoff")

# Beat durations. The turn gets the longest hold because it is the moment the
# reel is actually for; the hook is short because a slow open is a swipe.
# One Veo clip is 8 seconds, so a beat is 8 seconds. These are WEIGHTS: the
# narration's real length decides the reel's length and these only set the
# proportions (scale_beats). Holding them equal is deliberate — the turn used to
# be weighted longest, which on an 8s clip meant re-cutting the same shot.
DEFAULT_DURS = {"hook": 8.0, "escalate": 8.0, "build": 8.0,
                "turn": 8.0, "act": 8.0, "payoff": 8.0}

# Style suffix shared by every prompt, so "cinematic" is a property of the
# system rather than something each prompt has to remember. It deliberately says
# NOTHING about camera movement: wrong_month is a locked-off tripod and
# crowd_pullback is a moving dolly, so any movement claim here would contradict
# one of them inside the same prompt.
STYLE = ("Shot on a 35mm lens at a shallow stop, photorealistic documentary "
         "cinematography with natural unstylised colour, real atmospheric haze "
         "and airborne dust catching the light, grain left in, highlights "
         "allowed to clip the way a real sensor clips. No slow-motion glamour "
         "pass, no drone-reel colour grade, no lens flares added in post. "
         "No text, no captions, no watermark, no on-screen writing of any kind.")

_TEXT_ASK = re.compile(r"\b(text|caption|title|subtitle|lettering|words on)\b", re.I)

# Physical features a template must NEVER assert, because we hold no per
# destination terrain field and a wrong one renders a confident lie about a real
# place. Caught 2026-09-20 when two_places gave Aihole, a Deccan temple site,
# deodar trees and colonial tin roofs.
# A scenario shows a phone being used. It must NEVER ask Veo to render the
# number: text comes out garbled, and a plausible-but-wrong emergency number is
# the most dangerous thing this repo could publish. The real value is burned in
# post from the DB, or it is not shown at all.
_NUMBER_ASSERT = re.compile(r"(\+?\d[\d\s\-]{6,}\d)|\b(dials?|types?) (the )?number\b", re.I)

_TERRAIN_ASSERT = re.compile(
    r"\b(deodar|pine|palm|terraces?|ridgeline|glacier|dune|backwater|tin roofs?|"
    r"colonial-era|paddy|ice shelves|spindrift|snow-capped)\b", re.I)


class StoryboardError(ValueError):
    """Raised when a storyboard cannot be built HONESTLY from the data given."""


# ─────────────────────────────────────────────────────────────────────────
# helpers
# ─────────────────────────────────────────────────────────────────────────

def _month_name(m: int) -> str:
    return datetime(2000, int(m), 1).strftime("%B")


def _disp(score) -> str:
    """The DISPLAYED score. The site renders the raw 0-5 column doubled, so a
    DB 4 is 8/10 on screen — quoting the raw value is a standing scar."""
    try:
        return f"{int(round(float(score) * 2))}/10"
    except (TypeError, ValueError):
        return ""


def _require(dest: dict, fields: tuple, fmt: str) -> None:
    missing = [f for f in fields if not dest.get(f)]
    if missing:
        raise StoryboardError(
            f"{fmt}: {dest.get('id', '?')} is missing {', '.join(missing)} — "
            f"refusing to invent it")


def _first_sentence(t: str) -> str:
    """The first sentence of editorial prose.

    Verdict `sentence` / `note` text is written for a page, not a reel, and some
    rows carry two sentences — which the one-sentence beat rule (rightly)
    rejects. Trimming beats refusing: the opening clause is the call, and the
    rest is detail the page already carries.
    """
    t = (t or "").strip()
    if not t:
        return ""
    parts = re.split(r"(?<=[.!?])\s+", t)
    return parts[0].strip()


def _place(dest: dict) -> str:
    """'Chitkul in Himachal Pradesh' — the specificity anchor that keeps a
    prompt from producing generic mountain wallpaper."""
    name = dest.get("name") or dest.get("id") or ""
    state = dest.get("state") or ""
    return f"{name} in {state}" if state else name


# A month only counts as the turn if the verdict itself says stay away. "Lower
# score" is not enough: in a catalogue where 88% of verdicts are 8/10 or better,
# the lowest month is usually still a "go".
_NOT_GO = {"wait", "skip", "avoid", "no"}


def _worst_month(months: dict) -> Optional[int]:
    """The month this place genuinely says DON'T GO, or None.

    Returns None when no month qualifies — and the caller then refuses to build,
    which is the correct outcome. A reel that says "not November" about a month
    our own data rates 8/10 is a reel that lies.
    """
    if not months:
        return None
    bad = [(m, v.get("score")) for m, v in months.items()
           if isinstance(v.get("score"), (int, float))
           and (str(v.get("label") or "").lower() in _NOT_GO or v.get("score") <= 2)]
    if not bad:
        return None
    return min(bad, key=lambda x: x[1])[0]


# ─────────────────────────────────────────────────────────────────────────
# formats
# ─────────────────────────────────────────────────────────────────────────

def _fmt_wrong_month(dest: dict, month: int, months: dict) -> list:
    """The camera never moves; the year does.

    Needs a month map with a genuinely worse month in it. Without one there is no
    turn, and without a turn this is a postcard — so it refuses.
    """
    _require(dest, ("name",), "wrong_month")
    bad = _worst_month(months)
    if bad is None:
        raise StoryboardError(
            f"wrong_month: {dest.get('id')} has no month our data actually says "
            f"to avoid — refusing to invent a bad month")
    if bad == month:
        raise StoryboardError(
            f"wrong_month: {dest.get('id')}'s worst month IS {month}")

    place = _place(dest)
    good_n, bad_n = _month_name(month), _month_name(bad)
    # The subject is the PLACE, named and nothing more. No invented terrain.
    frame = f"{place}, framed wide so the whole setting is in shot"
    bad_line = _first_sentence(months.get(bad, {}).get("sentence"))
    # The turn SHOWS the reason the data gives, rather than a winter this format
    # assumed. A destination can score badly for monsoon, heat, haze or crowds.
    # An empty note left "makes it a bad month: ." in a live prompt (chail,
    # 2026-09-23, caught by the Flow session). A bad month with no stated reason
    # is a verdict we cannot show, so refuse rather than emit a blank.
    if not (bad_line or "").strip():
        raise StoryboardError(
            f"wrong_month: {dest.get('id')} has no note saying WHY {_month_name(bad)} "
            f"is bad — refusing to render a bad month with no reason")
    bad_cond = bad_line if bad_line.endswith(".") else (bad_line + ".")

    return [
        {"role": "hook", "dur": DEFAULT_DURS["hook"],
         "say": f"This is {dest['name']} in {good_n}.",
         "caption": f"{dest['name']}, {good_n}",
         "veo": (f"Locked-off wide shot on a tripod with no camera movement of {frame}, "
                 f"as it is at its {good_n} best: clear air, full seasonal colour, "
                 f"low afternoon sun raking across it. Nothing moves but the light "
                 f"and whatever the wind touches. {STYLE}")},
        {"role": "build", "dur": DEFAULT_DURS["build"],
         "say": "Same frame, same camera, watch the year turn.",
         "caption": "same frame, same camera",
         "veo": (f"The identical locked-off framing of {frame}, the season shifting "
                 f"forward continuously without the camera moving: colour draining "
                 f"toward gold and rust, the light going lower and colder, the first "
                 f"hard weather of the season arriving. {STYLE}")},
        {"role": "turn", "dur": DEFAULT_DURS["turn"],
         "say": f"This is the same place in {bad_n}.",
         "caption": f"{dest['name']}, {bad_n}",
         "veo": (f"The identical locked-off framing of {frame}, now in {bad_n}, "
                 f"showing exactly the condition that makes it a bad month: "
                 f"{bad_cond} Unflattering light, the place at its least "
                 f"appealing, few or no visitors in frame. {STYLE}")},
        {"role": "payoff", "dur": DEFAULT_DURS["payoff"],
         "say": bad_line or f"{good_n} is the call, not {bad_n}.",
         "caption": f"{good_n}: {_disp(dest.get('score'))}",
         "veo": None},   # the verdict card is burned in post, never generated
    ]


def _fmt_crowd_pullback(dest: dict, month: int, months: dict) -> list:
    """The postcard retreats until the queue is in frame."""
    _require(dest, ("name", "note"), "crowd_pullback")
    place = _place(dest)
    return [
        {"role": "hook", "dur": DEFAULT_DURS["hook"],
         "say": "This is the shot you saved.",
         "caption": "the shot you saved",
         "veo": (f"Tight, perfectly composed postcard framing of the main landmark at "
                 f"{place} at first light, completely empty, soft gold light on it, "
                 f"mist still sitting low. The camera is almost still. {STYLE}")},
        {"role": "build", "dur": DEFAULT_DURS["build"],
         "say": "Now let the camera step back.",
         "caption": "now step back",
         "veo": (f"Slow continuous dolly back from that same landmark at {place}, the "
                 f"frame widening to take in the paving, the barriers and the first "
                 f"few visitors at the edges. Handheld micro-movement. {STYLE}")},
        {"role": "turn", "dur": DEFAULT_DURS["turn"],
         "say": "That photo was taken before the gates opened.",
         "caption": "before the gates opened",
         "veo": (f"The dolly-back continues at {place} to reveal the full reality "
                 f"around the photograph: several hundred visitors pressed behind "
                 f"steel crowd barriers, phones raised, guides calling out, shoe "
                 f"covers on the paving, a security scanner and litter bins in the "
                 f"foreground, hard midday light. Real crowd density and body "
                 f"language. {STYLE}")},
        {"role": "payoff", "dur": DEFAULT_DURS["payoff"],
         "say": _first_sentence(dest.get("note")),
         "caption": f"{dest['name']}: {_disp(dest.get('score'))}",
         "veo": None},
    ]


def _fmt_two_places(dest: dict, month: int, months: dict, dest_b: dict = None) -> list:
    """One frame morphing between the two halves of a /vs/ page.

    The score is deliberately NOT the payoff here: checked 2026-09-20, Kasauli and
    Mussoorie are both 10/10 in October, so the number cannot separate them. The
    crowd and the character have to carry the reveal.
    """
    if not dest_b:
        raise StoryboardError("two_places: needs a second destination")
    _require(dest, ("name",), "two_places")
    _require(dest_b, ("name",), "two_places")
    a, b = _place(dest), _place(dest_b)
    return [
        {"role": "hook", "dur": DEFAULT_DURS["hook"],
         "say": f"{dest['name']} or {dest_b['name']} this {_month_name(month)}?",
         "caption": f"{dest['name']} or {dest_b['name']}?",
         "veo": (f"Locked-off wide shot of the main approach to {a} on an ordinary "
                 f"afternoon, held completely still, quiet, only a couple of people "
                 f"in frame and no traffic. {STYLE}")},
        {"role": "build", "dur": DEFAULT_DURS["build"],
         "say": "Same lens, same hour, same week.",
         "caption": "same lens, same hour",
         "veo": (f"The same framing and exposure begins to morph seamlessly, the "
                 f"quiet approach at {a} filling in: more people arriving at the "
                 f"edges, vehicles appearing, the space closing up. {STYLE}")},
        {"role": "turn", "dur": DEFAULT_DURS["turn"],
         "say": f"That is {dest_b['name']}.",
         "caption": dest_b["name"],
         "veo": (f"The morph completes into the main approach to {b} at the same "
                 f"hour of the same week: packed shoulder to shoulder with people "
                 f"and vehicles nose to tail, matched lens and exposure so that "
                 f"only the place has changed. {STYLE}")},
        {"role": "payoff", "dur": DEFAULT_DURS["payoff"],
         "say": (_first_sentence(months.get(month, {}).get("sentence"))
                 or "Same score, completely different week."),
         "caption": f"{dest['name']} {_disp(dest.get('score'))}  ·  "
                    f"{dest_b['name']} {_disp(dest_b.get('score'))}",
         "veo": None},
    ]


FORMATS = {
    "wrong_month": _fmt_wrong_month,
    "crowd_pullback": _fmt_crowd_pullback,
    "two_places": _fmt_two_places,
}


# ─────────────────────────────────────────────────────────────────────────
# build + validate
# ─────────────────────────────────────────────────────────────────────────

def build_storyboard(fmt: str, dest: dict, month: int, months: dict = None,
                     **kw) -> dict:
    if fmt not in FORMATS:
        raise StoryboardError(f"unknown format {fmt!r}")
    beats = FORMATS[fmt](dest, month, months or {}, **kw)
    slug = dest.get("id") or "unknown"
    for i, b in enumerate(beats):
        b["id"] = f"b{i + 1}"
        # The clip filename IS the contract between this file, the Flow session
        # and the renderer. Nothing else has to agree on anything.
        b["clip"] = f"{slug}__{fmt}__{b['id']}.mp4" if b.get("veo") else None
    # The payoff beat generates no footage of its own (the verdict is an overlay
    # burned in post), which left its screen time spilling onto whatever shot
    # came before — on the first end-to-end render that was a 7-second hold on
    # the turn. Returning to the HOOK's image under the verdict is both the
    # cheaper fix and the better edit: the reel closes on the frame it opened on,
    # now meaning something different.
    hook_clip = next((b["clip"] for b in beats if b.get("role") == "hook" and b.get("clip")), None)
    for b in beats:
        if b.get("role") == "payoff" and not b.get("clip") and hook_clip:
            b["clip"] = hook_clip
            b["reprise"] = True
    sb = {
        "format": fmt, "slug": slug, "month": month,
        "name": dest.get("name"), "beats": beats,
        "duration": round(sum(b["dur"] for b in beats), 2),
        # Every name a prompt in THIS storyboard is allowed to be anchored on.
        # A /vs/ format legitimately names its second destination in the turn.
        "names": [n for n in (dest.get("name"),
                              (kw.get("dest_b") or {}).get("name")) if n],
    }
    validate(sb)
    return sb


# WORDS A REEL MAY NOT SAY. Every one of these was in shipped copy on
# 2026-09-21 and every one was false: "every destination ... carries a verified
# local contact" (we have no local contacts to promise -- founder: never claim
# it), "every road destination", "every destination page", "update daily" about
# roads we never tracked, "verified against three sources" about data whose
# provenance was never proven. A claim that is true for SOME destinations is a
# lie when a reel says it about ALL of them, so universal quantifiers and
# verification words are refused outright; a format that genuinely has proof
# names the specific place instead ("the nearest pump for Kaza is on its page").
_OVERCLAIM = re.compile(
    r"\bevery\s+(destination|place|road|page|trip|town|village)"
    r"|\ball\s+(destinations|places|roads)"
    r"|\bverified\b|\bguarantee"
    r"|\blocal\s+(contact|helper|guide)s?\b"
    r"|\bupdated?\s+daily\b|\breal[- ]time\b|\blive\s+(updates?|status)\b",
    re.I)


def validate(sb: dict) -> None:
    beats = sb.get("beats") or []
    if len(beats) < 3:
        raise StoryboardError("a storyboard needs at least 3 beats")

    for b in beats:
        for field in ("say", "caption"):
            hit = _OVERCLAIM.search(b.get(field) or "")
            if hit:
                raise StoryboardError(
                    f"{sb.get('format')}: beat {b.get('id')} {field} claims "
                    f"{hit.group(0)!r} — {b.get(field)!r}. A reel may only say "
                    f"what the data proves for THIS destination.")

    # A PERSON MAY NEVER APPEAR UNDESCRIBED. Veo has no memory between beats, so
    # "same people" or a bare "the couple" gets new people every time. Any beat
    # whose prompt shows a person must carry at least one full cast description.
    # Recurring characters only. Anonymous crowds ("visitors", "walkers") are
    # extras, not characters -- nobody has to recognise them in the next shot --
    # so "people" is deliberately NOT here: it blocked every crowd shot in
    # quiet_month (seen 09-21).
    _PERSON = re.compile(r"\b(man|woman|couple|family|parent|child|children|"
                         r"traveller|driver|passenger|he|she|they)\b", re.I)
    for b in beats:
        v = b.get("veo") or ""
        if re.search(r"same (people|two|couple|family)", v, re.I):
            raise StoryboardError(
                f"{sb.get('format')}: beat {b.get('id')} says 'same people' -- Veo "
                f"cannot resolve that; describe each person in full instead")
        fulls = b.get("cast_full") or []
        # Case-insensitive: a sentence that OPENS with a person capitalises the
        # description ("A man in his late twenties..."), which a case-sensitive
        # match missed -- it failed every solo food_find beat.
        if fulls and _PERSON.search(v) and not any(f.lower() in v.lower() for f in fulls):
            raise StoryboardError(
                f"{sb.get('format')}: beat {b.get('id')} shows a person without "
                f"their full description -- Veo would invent a new one")

    turns = [b for b in beats if b.get("role") == "turn"]
    if len(turns) != 1:
        raise StoryboardError(
            f"{sb.get('format')}: needs exactly one 'turn' beat, found "
            f"{len(turns)} — a reel with no turn has no reason to be watched "
            f"to the end")

    for b in beats:
        say = (b.get("say") or "").strip()
        if say and len(re.findall(r"[.!?](?:\s|$)", say)) > 3:
            raise StoryboardError(
                f"{b['id']}: `say` is more than three sentences — one beat is "
                f"one thought, and a fourth belongs to the next beat")
        # HOW IT SOUNDS IS PART OF WHETHER IT WORKS (founder, 2026-09-23: "how to
        # make these scripts more hip"). Two rules, in code so they cannot rot:
        # a beat is short enough to say in one breath, and nobody narrates.
        # A ceiling, not a style. The first version of this rule capped a beat
        # at 16 words and produced telegraphese ("Car dead. Empty road.") that
        # the founder rejected on sight: short is not the same as spoken. 20
        # words is roughly one breath, which is the real limit; sounding like a
        # person is a writing job, not something a word count can enforce.
        if say and len(say.split()) > 20:
            raise StoryboardError(
                f"{b['id']}: `say` is {len(say.split())} words — past one "
                f"breath, so it will read as narration")
        _narrator = re.compile(
            r"\b(clearly|plainly|genuinely|simply|entirely|rather|indeed|"
            r"somewhat|quite frankly|it is worth noting)\b", re.I)
        if say and _narrator.search(say):
            raise StoryboardError(
                f"{b['id']}: `say` uses a narrator word "
                f"({_narrator.search(say).group(0)!r}) — say the thing instead")
        if b.get("role") not in BEAT_ROLES:
            raise StoryboardError(f"unknown beat role {b.get('role')!r}")
        p = b.get("veo")
        if p is None:
            continue
        if len(p.split()) < 90:
            raise StoryboardError(
                f"{b['id']}: prompt is {len(p.split())} words — Veo adherence "
                f"needs 100-150, this will render generic")
        body = p.replace(STYLE, "")
        if _TERRAIN_ASSERT.search(body):
            raise StoryboardError(
                f"{b['id']}: prompt asserts terrain we have no field for "
                f"({_TERRAIN_ASSERT.search(body).group(0)!r}) — name the place "
                f"and the condition, never invent what it looks like")
        if _NUMBER_ASSERT.search(body):
            raise StoryboardError(
                f"{b['id']}: prompt puts a phone number or a dialled number in "
                f"frame — Veo garbles text and a wrong emergency number is the "
                f"worst thing we could render; burn it in post from the DB")
        if _TEXT_ASK.search(body):
            raise StoryboardError(
                f"{b['id']}: prompt asks Veo for on-screen text; Veo renders "
                f"text badly and every overlay is burned in post")
        names = sb.get("names") or ([sb["name"]] if sb.get("name") else [])
        if not any(n.lower() in p.lower() for n in names):
            raise StoryboardError(
                f"{b['id']}: prompt does not name the place — unnamed prompts "
                f"produce interchangeable wallpaper")

    # `dur` is a WEIGHT, not a runtime. The finished reel is as long as its
    # narration, and scale_beats() distributes that length across the beats in
    # these proportions — so a storyboard never hard-codes a duration it cannot
    # actually control.
    if not (6.0 <= sb.get("duration", 0) <= 60.0):
        raise StoryboardError(
            f"beat weights sum to {sb.get('duration')} — outside the sane 6-60 band")


# ─────────────────────────────────────────────────────────────────────────
# the Veo queue — what a Flow session actually works through
# ─────────────────────────────────────────────────────────────────────────

def queue_rows(sb: dict, takes: int = 1) -> list:
    """One row per beat, or per beat PER TAKE when takes > 1.

    WHY TAKES (founder call, 2026-09-23). Publishing is capped at one reel a day
    per surface, so 30 clips a day was five times more reels than could ever go
    out. The same budget buys two reels a day shot TWICE instead: Veo ignores
    part of a prompt often enough that a single take is a coin toss (it served a
    bowl of noodles for a named sweet on 09-22), and a second take of the same
    beat is the only insurance that does not cost a day's delay.

    The alternate take is the SAME prompt with an `alt` suffix on the filename,
    because the filename is the only contract between the queue, the Flow
    session and the renderer.
    """
    rows = []
    for b in sb["beats"]:
        if not b.get("veo"):
            continue
        for t in range(max(1, takes)):
            clip = b["clip"] if t == 0 else b["clip"].replace(".mp4", "alt.mp4")
            rows.append({"clip": clip, "prompt": b["veo"], "slug": sb["slug"],
                         "format": sb["format"], "beat": b["id"], "role": b["role"],
                         "character": b.get("character", ""), "take": t + 1,
                         "seconds": 8, "status": "pending"})
    return rows


def enqueue(sb: dict, path: Path = None, takes: int = 1) -> int:
    """Append this storyboard's prompts to the Veo queue, skipping any clip
    already queued or generated. Returns how many rows were added."""
    path = path or VEO_QUEUE
    path.parent.mkdir(parents=True, exist_ok=True)
    try:
        q = json.loads(path.read_text())
    except Exception:
        q = []
    have = {r.get("clip") for r in q}
    new = [r for r in queue_rows(sb, takes=takes) if r["clip"] not in have]
    if new:
        path.write_text(json.dumps(q + new, indent=2, ensure_ascii=False))
    return len(new)


def scale_beats(sb: dict, total_dur: float, lead: float = 0.0) -> list:
    """(clip, seconds) in beat order, stretched to the reel's REAL length.

    The narration decides how long a reel is; the storyboard only decides the
    proportions. Beats whose clip is missing are dropped and their time is
    redistributed, so one ungenerated clip shortens a shot instead of killing
    the render.
    """
    usable = [b for b in sb["beats"] if b.get("clip")]
    if not usable:
        return []
    w = sum(b["dur"] for b in usable)
    span = max(0.0, total_dur - lead)
    return [(b["clip"], round(span * b["dur"] / w, 2)) for b in usable]


# THE HINDI REEL OPENS ON THE OUTCOME (founder pick, 2026-09-23: "for hindi,
# reverse is good to finalise"). Same six clips, different order under the
# voice: the payoff shot first as the open loop, then the story, then the payoff
# again. The escalate beat's clip is not used in Hindi; its line is folded into
# the build. Indices are into the storyboard's beat list.
HI_CLIP_ORDER = (5, 0, 2, 3, 4, 5)


def for_lang(sb: dict, lang: str) -> dict:
    """A copy of the storyboard whose beats carry the clip that plays under
    each line IN THAT LANGUAGE. English keeps the shot order; Hindi is reordered
    per HI_CLIP_ORDER. Prompts, ids and characters are untouched, so this never
    changes what gets generated, only what gets cut."""
    import copy
    out = copy.deepcopy(sb)
    if lang != "hi":
        return out
    src = sb["beats"]
    if len(src) != len(HI_CLIP_ORDER):
        return out                      # a landscape format: leave it alone
    for beat, idx in zip(out["beats"], HI_CLIP_ORDER):
        beat["clip"] = src[idx].get("clip")
    return out


def spec_from_storyboard(sb: dict, lang: str = "en") -> dict:
    """The `spec` build() wants: narration lines + matching on-screen captions.
    One beat, one line, one caption — which is what keeps picture and voice in
    step instead of drifting."""
    _b = [b for b in sb["beats"] if (b.get("say") or "").strip()]
    if lang == "hi":
        missing = [b["id"] for b in _b if not (b.get("say_hi") or "").strip()]
        if missing:
            raise StoryboardError(
                f"{sb['format']}: no Hindi narration for {', '.join(missing)} — "
                f"refusing to read English lines in a Hindi voice")
        return {"lines": [b["say_hi"] for b in _b],
                # ENGLISH CAPTIONS OVER HINDI VOICE (founder, 2026-09-23). The
                # Hindi reel has its own structure (it opens on the outcome), so
                # its caption is an English rendering of THAT line, written
                # alongside it as caption_hi, not the English reel's line for
                # the same slot. Falls back to the English line if none.
                "caption_lines": [b.get("caption_hi") or b["say"] for b in _b],
                # Voice named directly, NOT via a profile: a profile's own rate
                # wins over the spec's, and swara_deep's +12% is the brisk pace
                # this rewrite exists to slow down.
                "voice": "hi-IN-SwaraNeural", "rate": "+2%", "pitch": "-4Hz",
                "storyboard": sb["format"], "slug": sb["slug"], "lang": "hi"}
    lines = [b["say"] for b in _b]
    caps = [b["caption"] for b in _b]
    # Scenarios are narrated slower than score reels. +14% reads as brisk, which
    # is the opposite of tense (founder, 2026-09-23: "need more tension").
    return {"lines": lines, "caption_lines": caps, "rate": "+2%",
            "storyboard": sb["format"], "slug": sb["slug"]}


if __name__ == "__main__":
    import argparse
    ap = argparse.ArgumentParser(description="Print a storyboard + its Veo prompts")
    ap.add_argument("--format", default="wrong_month", choices=sorted(FORMATS))
    ap.add_argument("--slug", default="chitkul")
    ap.add_argument("--month", type=int, default=datetime.now().month)
    a = ap.parse_args()
    print(f"(demo only — real runs are fed a dest dict by the render path)")


# ─────────────────────────────────────────────────────────────────────────
# SCENARIO FORMATS (founder direction, 2026-09-20)
# ─────────────────────────────────────────────────────────────────────────
# "rather than just empty villages ... a couple or a solo traveller getting
#  stuck and then opening their nakshiq offline app to check the emergency
#  number and dialing and someone comes to rescue them ... thats what sells
#  the site, the experiences."
#
# He is right, and it is a better use of the data than the landscape formats
# above. A pretty valley shows a PLACE; a scenario shows the PRODUCT working,
# and the product is the only thing we have that nobody else does.
#
# VERIFIED BEFORE BUILDING, because the whole premise is a capability claim:
# apps/web/public/sw.js (CACHE_VERSION nakshiq-v60) precaches "/en/sos" and
# "/hi/sos" as an explicit offline-first feature. Someone with the PWA saved
# really can open the SOS page with no signal. If that had not been true these
# formats would be a false advertisement and would not exist.
#
# FOUR SAFETY RULES, in code below, not in a comment:
#   1. A scenario NEVER asks Veo to render a phone number. Veo renders text
#      badly, and a plausible-but-wrong emergency number on screen is the most
#      dangerous thing this repo could publish. The real number is burned in
#      post from the DB, or it is not shown.
#   2. A format REFUSES for any destination whose relevant intel is missing.
#      No invented helper, no invented pump, no invented hospital.
#   3. People are shot from behind, over-shoulder, hands-and-phone, or at middle
#      distance — never a face in close-up. This both dodges Veo's face
#      consistency problem across beats and keeps the reel from reading as an
#      AI persona.
#   4. The resolution shows help being REACHED, never a medical outcome.

# A dramatised character in a scene is ordinary footage. This is deliberately
# NOT a recurring AI presenter: Instagram's 31-Aug-2026 rule attaches the
# "AI-generated profile" label to accounts whose CREATOR is an AI person, and
# building one of those is a different decision with a different disclosure.
# WHAT THE SCREEN IS NOT. "Visible only as glow and shape, never legible" tells
# Veo what NOT to resolve but nothing about what the thing IS, so on the first
# real render (achabal, 2026-09-21) the turn beat — the one shot that carries the
# entire product claim — came back as a CAMERA app, green viewfinder and shutter
# button included, over the line "the page you saved still opens with no signal".
# The most important second of the reel showed the wrong product. Describe the
# shape of the page without making it readable, and name the UIs that must not
# appear, because those are what Veo reaches for by default.
SCREEN = ("The phone screen shows a simple vertical list of dark rows on a pale "
          "background, too small and too soft to read: no camera viewfinder, no "
          "shutter button, no map, no video call, no photo gallery, no keyboard. ")

# Veo does not hold a face across separate generations, and the four beats of a
# storyboard ARE four separate generations. The achabal reel came back as three
# unrelated sets of people in eighteen seconds — a couple, a lone man, two men in
# shawls — which reads as a montage, not a story. Keeping faces out of shot was
# already handled; what was missing was anything ELSE to recognise them by. So
# every beat of one storyboard names the same wardrobe and the same car, chosen
# deterministically from the slug so a beat regenerated later still matches the
# ones already sitting on R2.
# THE CAST — described IN FULL, every time a person appears in a prompt.
#
# Founder, 2026-09-21: "you can't say 'same people'. It will not take 'same
# people'. You need to have the character details properly attached every time
# you mention the people." Correct, and it is the mechanism, not a style point:
# Veo generates each beat as an independent prompt with no memory of the others,
# so a line like "same people in every shot" is meaningless to it, and a bare
# "the couple" gets a newly invented couple in every beat. The earlier version
# was also ambiguous on its own terms ("the adults in a rust-red fleece and a
# grey hooded sweatshirt" never said who wore which).
#
# So each person is a fixed description — age, hair, one named garment in one
# named colour — assigned to ONE person, and every beat that shows them repeats
# it verbatim. Deterministic from the slug: a beat regenerated later matches the
# ones already on R2, and different reels get different people.
_MEN = ("a man in his late twenties with short black hair and a trimmed beard",
        "a man in his early thirties with close-cropped hair and a thin moustache",
        "a man in his mid twenties with wavy black hair down to his collar")
_WOMEN = ("a woman in her late twenties with a single long dark braid",
          "a woman in her early thirties with short curly black hair",
          "a woman in her mid twenties with her hair tied up in a high bun")
_TOP_M = ("a rust-red fleece jacket", "a navy blue quilted jacket",
          "an olive green field jacket", "a black puffer jacket")
_TOP_W = ("a grey hooded sweatshirt", "a mustard yellow wool shawl",
          "a cream cable-knit jumper", "a deep green windcheater")
_KIDS = ("two children of about six and nine, both in bright red knitted jumpers",
         "two children of about five and eight, both in blue hooded raincoats",
         "two children of about seven and ten, both in orange puffer jackets")
_CHILD = ("a small child of about four, wrapped in a red and white checked blanket",
          "a small child of about three, wrapped in a thick blue woollen blanket")
_VEHICLE = ("a dusty white hatchback with a black roof rack",
            "a silver compact hatchback",
            "a pale grey hatchback with mud on its doors")


def _rest(desc: str) -> str:
    """'a navy blue quilted jacket' -> 'navy blue quilted jacket'."""
    return desc.split(" ", 1)[1]


def _cap(t: str) -> str:
    return t[:1].upper() + t[1:]


def _cast(slug: str) -> dict:
    """Every person and the car, fully described, for one storyboard."""
    import zlib
    h = zlib.crc32((slug or "x").encode())
    tm, tw = _TOP_M[(h >> 6) % len(_TOP_M)], _TOP_W[(h >> 9) % len(_TOP_W)]
    car = _VEHICLE[(h >> 12) % len(_VEHICLE)]
    c = {
        "A": f"{_MEN[h % len(_MEN)]}, wearing {tm}",
        "B": f"{_WOMEN[(h >> 3) % len(_WOMEN)]}, wearing {tw}",
        "K": _KIDS[(h >> 15) % len(_KIDS)],
        "C": _CHILD[(h >> 18) % len(_CHILD)],
        "car": car, "car_s": "the " + _rest(car),
    }
    c.update({"A_cap": _cap(c["A"]), "B_cap": _cap(c["B"]), "car_cap": _cap(car),
              "K_cap": _cap(c["K"]), "C_cap": _cap(c["C"])})
    # A solo traveller is one of the two, chosen by the slug too.
    c["S"] = c["A"] if (h >> 21) % 2 == 0 else c["B"]
    c["S_cap"] = _cap(c["S"])
    return c


def _sheet(c: dict, *who: str) -> str:
    """The character sheet for Flow's character field: the SAME full text the
    prompts carry inline, one line per person, so the two can never disagree."""
    label = {"A": "MAN", "B": "WOMAN", "K": "CHILDREN", "C": "CHILD",
             "S": "TRAVELLER", "car": "CAR"}
    return " | ".join(f"{label[k]}: {c[k]}" for k in who)


PEOPLE = ("Shot from behind or over the shoulder, or framed on hands and the "
          "phone screen, or at middle distance — no face in close-up, no one "
          "addressing the camera. The phone screen is visible only as glow and "
          "shape, never legible. ")


def _intel(dest: dict, *path):
    cur = dest.get("intel") or {}
    for k in path:
        cur = (cur or {}).get(k) if isinstance(cur, dict) else None
    return cur


def _scenario(dest: dict, month: int, *, cast: dict, who: tuple, trouble: str,
              escalate: str, helpless: str, lookup: str, act: str, resolve: str,
              says: tuple, caps: tuple, payoff_say: str, payoff_cap: str,
              says_hi: tuple = None, caps_hi: tuple = None,
              payoff_say_hi: str = None, payoff_cap_hi: str = None,
              screen: bool = True) -> list:
    """Shared SIX-beat shape: trouble, it gets worse, no way out, the lookup
    (the turn -- this is the product), acting on what the page said, and the
    outcome.

    WHY SIX AND NOT FOUR (2026-09-23). Four beats of narration came to ~11
    seconds, so a 4-clip storyboard -- 32 seconds of footage that cost 40
    credits -- was cut down to a 16-second reel and three quarters of it was
    thrown away. The founder watched the first two and said it plainly: "not
    showing an end-to-end proper reel, and it's too short as well." Six beats at
    roughly eight seconds each is one Veo clip per beat used nearly whole, a
    48-second reel, and a story with a middle: the thing gets worse before the
    page fixes it, and you see the fix being ACTED ON, not just looked up.

    Scene text is written with {A} {B} {K} {C} {S} {car} placeholders and filled
    here, so every mention of a person in every beat carries that person's FULL
    description. Nothing depends on Veo remembering an earlier beat: it cannot."""
    place = _place(dest)
    fill = lambda t: t.format(**cast)
    sheet = _sheet(cast, *who)
    fulls = [cast[k] for k in who if k != "car"]
    beats = [
        {"role": "hook", "dur": DEFAULT_DURS["hook"], "say": says[0],
         "caption": caps[0],
         "veo": f"{fill(trouble)} Near {place}. {PEOPLE}{STYLE}"},
        {"role": "escalate", "dur": DEFAULT_DURS["escalate"], "say": says[1],
         "caption": caps[1],
         "veo": f"{fill(escalate)} Near {place}. {PEOPLE}{STYLE}"},
        {"role": "build", "dur": DEFAULT_DURS["build"], "say": says[2],
         "caption": caps[2],
         "veo": f"{fill(helpless)} Near {place}. {PEOPLE}{STYLE}"},
        # SCREEN only on the turn: describing a screen in a shot that has none
        # is an invitation to add one.
        {"role": "turn", "dur": DEFAULT_DURS["turn"], "say": says[3],
         "caption": caps[3],
         "veo": f"{fill(lookup)} Near {place}. {SCREEN if screen else ''}{PEOPLE}{STYLE}"},
        {"role": "act", "dur": DEFAULT_DURS["act"], "say": says[4],
         "caption": caps[4],
         "veo": f"{fill(act)} Near {place}. {PEOPLE}{STYLE}"},
        {"role": "payoff", "dur": DEFAULT_DURS["payoff"], "say": payoff_say,
         "caption": payoff_cap,
         "veo": f"{fill(resolve)} Near {place}. {PEOPLE}{STYLE}"},
    ]
    # HINDI IS A SECOND SCRIPT OVER THE SAME PICTURE, not a second shoot. Same
    # beats, same clips, same claims; only the narration changes, so a Hindi
    # reel costs no extra credits. Captions carry the ROMANISED line, never
    # Devanagari: libass breaks Devanagari conjuncts (long-standing rule here),
    # so the voice reads Devanagari and the screen shows Hinglish.
    if says_hi:
        hi_say = list(says_hi) + [payoff_say_hi or ""]
        hi_cap = list(caps_hi or ()) + [payoff_cap_hi or ""]
        for i, bt in enumerate(beats):
            if i < len(hi_say) and hi_say[i]:
                bt["say_hi"] = hi_say[i]
            if i < len(hi_cap) and hi_cap[i]:
                bt["caption_hi"] = hi_cap[i]
    for bt in beats:
        bt["character"] = sheet
        bt["cast_full"] = fulls
    return beats

# Regions the road feed actually covers (road_updates.region_id, verified
# 2026-09-21: J&K 30, Sikkim 20, HP 10, Uttarakhand 7, Ladakh 4, Arunachal 1).
# road_closed used to require ONLY a destination name, so on its first real run
# it made five reels -- Agonda, Ahmedabad, Aihole, Ajanta, Ajmer -- each saying
# "road conditions update daily on NakshIQ" about roads we have never tracked.
ROAD_REGIONS = {"jammu-kashmir", "sikkim", "himachal-pradesh", "uttarakhand",
                "ladakh", "arunachal-pradesh"}
_REGION_ALIASES = {"jammu-and-kashmir": "jammu-kashmir"}

# The altitude narrative only makes sense where there is altitude. Below this
# a child-at-altitude reel is fiction about the place.
HIGH_ALTITUDE_M = 2500


def _fmt_sos_rescue(dest: dict, month: int, months: dict) -> list:
    """Broken down, no signal, the SOS page still opens, help is reached.

    THE CLAIM, and why it is this one. The old payoff said "every destination on
    NakshIQ carries a verified local contact". We do not have that, and the
    founder was explicit: never promise it. What IS true everywhere is that the
    /sos page carries India's official emergency numbers (ministry-sourced
    constants, correct in every state) and that the service worker precaches it
    (sw.js, "offline-first upgrade"), so it opens with no signal.

    THE STORY, and why it changed. No bars -> open page -> press call is a lie:
    the page opens offline, but nobody places a call with literally no signal.
    So the numbers are found offline, and the call is made once a bar comes back.
    Help arriving is an emergency vehicle, because that is what those numbers
    dispatch -- not "a local", which only made sense beside the false claim.
    Needs no per-destination data, so it runs anywhere.
    """
    _require(dest, ("name",), "sos_rescue")
    return _scenario(
        dest, month,
        cast=_cast(dest.get("id")), who=("A", "B", "car"),
        # NO TERRAIN. This format needs no per-destination data, so it runs for
        # every destination -- coast, desert, plains and hills alike. It used to
        # say "empty mountain road ... the valley below", which on its first
        # honest queue put a mountain road into Alibaug (a flat coastal town) and
        # Alleppey's backwaters. The scene asserts only what is true anywhere: an
        # empty road, dusk, no signal.
        trouble=("{car_cap} is stopped at the side of an empty road at dusk with "
                 "its hazard lights blinking and its bonnet up. Beside it stand "
                 "{A}, and {B}, both looking down the road in both directions."),
        escalate=("A single truck goes past {car_s} without slowing, its lights "
                  "sweeping over {A}, and {B}, who are left standing at the "
                  "roadside in the dust as the sound of it fades and the road "
                  "goes quiet again."),
        helpless=("{A_cap}, holds a phone up at arm's length, turning slowly, "
                  "searching for a signal that is not there, while {B}, waits "
                  "beside {car_s} as the light fades and the road stays empty."),
        lookup=("Close on the hands of {A}, opening a saved page on a phone that "
                "loads with no signal at all, the screen lighting his hands in "
                "the dark."),
        act=("{A_cap}, walks a little way up the road away from {car_s}, holding "
             "the phone high until it finds a single bar, and lifts it to his "
             "ear, while {B}, watches from beside the car."),
        resolve=("Blue and red lights sweep around the bend behind {car_s} and an "
                 "emergency vehicle pulls in, and {A}, and {B}, walk toward it."),
        # GENERIC IS A WASTED MENTION. "The page you saved" could be anyone's
        # page; the turn is the one second of the reel where the viewer is
        # looking for what solved it, so it says NakshIQ by name (founder,
        # 2026-09-23: "why are you being generic and not specific").
        says=("We were supposed to reach the beach before dark. We did not.",
              "The car just stopped, and my phone had nothing. Not one bar.",
              "He kept holding his up like that would change something.",
              "Then I remembered the NakshIQ page I had saved. It opened. No network.",
              "He walked up the road till one bar came back, and made the call."),
        caps=("",
              "",
              "",
              "",
              ""),
        says_hi=("ये एम्बुलेंस दो लोगों तक पहुँची, बिना सिग्नल के। कैसे, देखो।",
                 "चालीस मिनट पहले गाड़ी बंद हो गई, और फ़ोन पर नो सर्विस।",
                 "वही किया जो सब करते हैं। फ़ोन ऊपर उठाया, घूमे, कुछ नहीं मिला।",
                 "फिर उसने NakshIQ खोला। सेव किया हुआ पेज ज़ीरो बार पर भी खुल गया।",
                 "वो चलता रहा जब तक एक बार आया, और वहीं से नंबर मिलाया।"),
        caps_hi=("This ambulance found two people with no signal. Here is how.",
                 "Forty minutes earlier the car died, and the phone said no service.",
                 "They did the usual thing. Held it up, walked around, got nothing.",
                 "Then she opened NakshIQ. The saved page loaded on zero bars.",
                 "He walked till one bar showed, and dialled straight off it."),
        payoff_say="I never used to think about emergency numbers. Now they are saved on NakshIQ, offline.",
        payoff_cap="emergency numbers · offline",
        payoff_say_hi="भारत के सारे इमरजेंसी नंबर, NakshIQ पर, ऑफ़लाइन सेव।",
        payoff_cap_hi="Every emergency number in India, on NakshIQ, saved offline.")


def _fmt_fuel_gap(dest: dict, month: int, months: dict) -> list:
    """The fuel light, on the stretch where it actually matters."""
    _require(dest, ("name",), "fuel_gap")
    fuel = _intel(dest, "fuel") or {}
    pump = fuel.get("nearest_petrol_pump") if isinstance(fuel, dict) else None
    if not pump:
        raise StoryboardError(
            f"fuel_gap: {dest.get('id')} has no nearest_petrol_pump — refusing "
            f"to claim we know where the pumps are")
    has_next = isinstance(fuel, dict) and bool(fuel.get("next_after_that"))
    name = dest.get("name")
    return _scenario(
        dest, month,
        cast=_cast(dest.get("id")), who=("A", "B", "car"),
        # No terrain. This said "at altitude ... nothing but rock and sky", and
        # its first real pick was Ambaji, a ~480 m temple town in Gujarat -- the
        # same fabrication class as Aihole's invented deodars. The fuel-light
        # story is true on any empty road, so the scene asserts only that.
        trouble=("Close on the dashboard of {car}, the low-fuel light coming on "
                 "amber, the road ahead through the windscreen long and completely "
                 "empty; at the wheel is {A}."),
        escalate=("Through the windscreen of {car}, a shuttered roadside fuel "
                  "pump goes by with its hoses coiled and nobody there, and the "
                  "road beyond it runs straight and empty again; at the wheel is "
                  "{A}, and beside him sits {B}."),
        helpless=("{A_cap}, driving {car_s}, glances at {B}, in the passenger "
                  "seat, then back at the empty road, no fuel station, no "
                  "buildings and no other car in sight."),
        lookup=("In the passenger seat of {car_s}, {B}, opens a saved page on a "
                "phone that loads with no signal, and her finger stops on a line "
                "partway down."),
        act=("{B_cap}, holds the phone where {A}, can see it as he drives "
             "{car_s}, and he nods once and keeps going without turning back, "
             "the empty road still running ahead of them."),
        resolve=("{car_cap} pulls into a small roadside fuel pump with a "
                 "hand-painted sign as an attendant walks over with the nozzle, "
                 "and {A}, steps out of the driver's side."),
        says=("The fuel light came on with nothing around us. He said it was fine.",
              "The first pump we passed was shuttered. Then the road went empty again.",
              "No buildings, no cars, and neither of us saying the obvious thing.",
              f"So I opened the NakshIQ page for {name}. No signal, and it still loaded.",
              "It named the nearest pump, so we kept going instead of turning back."),
        caps=("",
              "",
              "",
              "",
              ""),
        says_hi=(f"ये पंप हमें {name} के पास मिला, जब टैंक में बस दो-तीन लीटर बचे थे। कैसे, देखो।",
                 "आधे घंटे पहले फ़्यूल लाइट जली, और आसपास कुछ भी नहीं था।",
                 "पहला पंप बंद मिला, और उसके बाद सड़क फिर खाली।",
                 f"फिर मैंने NakshIQ पर {name} का पेज खोला। बिना सिग्नल के, फिर भी खुला।",
                 "उसपर सबसे नज़दीकी पंप लिखा था, तो हम वापस नहीं मुड़े, आगे बढ़े।"),
        caps_hi=(f"We found this pump near {name} with almost nothing in the tank. Here is how.",
                 "Half an hour earlier the fuel light came on, with nothing around.",
                 "The first pump was shuttered, then the road went empty again.",
                 f"Then I opened the NakshIQ page for {name}. No signal, still loaded.",
                 "It named the nearest pump, so we kept going instead of turning back."),
        payoff_say=f"The nearest pump for {name} is on its NakshIQ page. I check it before every empty stretch now.",
        payoff_cap="nearest pump, listed",
        payoff_say_hi=f"{name} का सबसे नज़दीकी पंप, NakshIQ के पेज पर।",
        payoff_cap_hi=f"The nearest pump for {name}, on its NakshIQ page.")


def _fmt_road_closed(dest: dict, month: int, months: dict) -> list:
    """The family who checked BEFORE leaving. Founder's own example.

    Runs ONLY where the road feed runs. See ROAD_REGIONS."""
    _require(dest, ("name",), "road_closed")
    sid = (dest.get("state_id") or "").strip().lower()
    sid = _REGION_ALIASES.get(sid, sid)
    if sid not in ROAD_REGIONS:
        raise StoryboardError(
            f"road_closed: {dest.get('id')} is in {sid or 'an unknown state'}, "
            f"which the road feed does not cover — refusing to claim we track "
            f"its roads")
    state = dest.get("state") or "these"
    return _scenario(
        dest, month,
        cast=_cast(dest.get("id")), who=("A", "B", "K", "car"),
        trouble=("Early morning outside a house: {A}, and {B}, load bags into the "
                 "open boot of {car}, while {K}, stand half asleep beside it."),
        escalate=("A wider shot of the mountain road hours ahead of them: a "
                  "landslide has taken half the carriageway, a line of stopped "
                  "trucks, nobody moving in either direction."),
        helpless=("A line of cars sits nose to tail at a barrier on that same "
                  "mountain road with their engines off, families standing "
                  "about on the verge with nothing to do and nowhere to turn "
                  "around."),
        lookup=("Beside {car_s} with its boot still open, {B}, checks a page on "
                "her phone while {A}, waits with a bag in each hand and {K}, "
                "lean against the car."),
        act=("{B_cap}, closes the boot of {car_s} without hurrying as {A}, "
             "lifts the bags back out and sets them down by the door, and {K}, "
             "head back inside the house."),
        resolve=("{A_cap}, {B}, and {K}, eat breakfast unhurried at a table, "
                 "{car_s} still parked outside the window, going nowhere today "
                 "and entirely fine about it."),
        says=("We had the car loaded at six. Kids half asleep, bags in the boot.",
              "Hours up that road, a landslide had taken half of it overnight.",
              "The families who left early were stuck at a barrier with nowhere to turn.",
              "I checked NakshIQ's road page before we pulled out of the driveway.",
              "So the bags came back inside, and the day turned into breakfast instead."),
        caps=("",
              "",
              "",
              "",
              ""),
        says_hi=("ये फ़ैमिली आज कहीं नहीं गई, और यही सबसे अच्छा फ़ैसला था। क्यों, देखो।",
                 "छह बजे गाड़ी लोड थी, बच्चे आधे सोए हुए, बैग डिक्की में।",
                 "उस सड़क पर कई घंटे आगे, रात में लैंडस्लाइड आधी सड़क ले गई थी।",
                 "निकलने से पहले उसने NakshIQ का रोड पेज चेक किया।",
                 "बैग वापस अंदर गए, और दिन ब्रेकफ़ास्ट में बदल गया।"),
        caps_hi=("This family went nowhere today, and that was the best call. Here is why.",
                 "At six the car was loaded, kids half asleep, bags in the boot.",
                 "Hours up that road, a landslide had taken half of it overnight.",
                 "Before leaving, she checked NakshIQ's road page.",
                 "The bags came back inside, and the day became breakfast."),
        payoff_say=f"NakshIQ tracks road closures across {state}, dated and sourced. We check it before every drive now.",
        payoff_cap="closures, dated + sourced",
        payoff_say_hi=f"{state} की रोड क्लोज़र, तारीख़ और सोर्स के साथ, NakshIQ पर।",
        payoff_cap_hi=f"Road closures across {state}, dated and sourced, on NakshIQ.")


def _fmt_hospital_run(dest: dict, month: int, months: dict) -> list:
    """Altitude and a child. Shows reaching help, never an outcome.

    Needs a NAMED nearest hospital (so "the nearest help is on the page" is
    true) and real altitude (so the story is about this place)."""
    _require(dest, ("name",), "hospital_run")
    emerg = _intel(dest, "emergency") or {}
    sos = _intel(dest, "sos") or {}
    hosp = ((emerg.get("nearest_hospital") if isinstance(emerg, dict) else None)
            or (sos.get("nearest_hospital") if isinstance(sos, dict) else None))
    if not hosp:
        raise StoryboardError(
            f"hospital_run: {dest.get('id')} has no named nearest hospital — "
            f"refusing to dramatise a medical emergency without one")
    elev = dest.get("elevation_m")
    try:
        elev = float(elev)
    except (TypeError, ValueError):
        elev = None
    if not elev or elev < HIGH_ALTITUDE_M:
        raise StoryboardError(
            f"hospital_run: {dest.get('id')} is at {elev or 'unknown'} m, below "
            f"{HIGH_ALTITUDE_M} m — an altitude story would be fiction here")
    name = dest.get("name")
    return _scenario(
        dest, month,
        cast=_cast(dest.get("id")), who=("B", "C"),
        trouble=("In a guesthouse room at high altitude, {B}, kneels beside the "
                 "bed where {C}, lies, her hand on the child's forehead, the window "
                 "behind them showing thin cold light."),
        escalate=("{C_cap}, sits up on the edge of the bed with a blanket "
                  "round the shoulders and will not take the glass of water "
                  "{B}, is holding out, and {B}, puts the back of her hand "
                  "against the child's cheek again."),
        helpless=("{B_cap}, stands at the window holding a phone up with no "
                  "signal, the small scattered settlement outside a long way from "
                  "anywhere, and {C}, still in the bed behind her."),
        lookup=("Close on the hands of {B}, opening a saved page on a phone that "
                "loads without a signal, as she reaches for a coat with her other "
                "hand."),
        act=("{B_cap}, wraps {C}, in a blanket and carries the child out "
             "through a doorway into thin cold morning light, a bag over one "
             "shoulder and the phone still in her hand."),
        resolve=("A vehicle pulls up outside a small district clinic with its "
                 "lights on, and a staff member opens the door as {B}, carries "
                 "{C}, inside."),
        # Not "altitude hits children faster" -- that is a medical claim we
        # cannot source. What is defensible is that a young child cannot tell
        # you it is happening.
        says=("She woke up quiet, and she is never quiet. That was the first thing.",
              "She would not take the water, and her cheek was hot against my hand.",
              "No signal in the room, and no hospital anywhere I could see.",
              "The NakshIQ page I had saved opened with no signal, and it named the nearest hospital.",
              "I had her wrapped and out of the door before I finished reading it."),
        caps=("",
              "",
              "",
              "",
              ""),
        says_hi=("ये क्लिनिक हमें मिला, बिना सिग्नल के, बच्चे के साथ। कैसे, देखो।",
                 "सुबह वो चुप उठी, और वो कभी चुप नहीं रहती।",
                 "पानी नहीं लिया, गाल गरम, और कमरे में सिग्नल ज़ीरो।",
                 "NakshIQ का सेव किया पेज बिना सिग्नल खुला, और उसपर सबसे नज़दीकी हॉस्पिटल का नाम था।",
                 "पढ़ना पूरा होने से पहले मैं उसे लेकर दरवाज़े से बाहर थी।"),
        caps_hi=("We found this clinic, no signal, with a child. Here is how.",
                 "She woke up quiet, and she is never quiet.",
                 "Would not take water, cheek hot, and zero signal in the room.",
                 "The saved NakshIQ page opened offline, and named the nearest hospital.",
                 "I was out of the door with her before I finished reading it."),
        payoff_say=f"The nearest hospital to {name} is named on its NakshIQ page. Save it before you go up.",
        payoff_cap="nearest hospital, named",
        payoff_say_hi=f"{name} का सबसे नज़दीकी हॉस्पिटल, नाम के साथ, NakshIQ पर।",
        payoff_cap_hi=f"The nearest hospital to {name}, named, on NakshIQ.")


def _fmt_food_find(dest: dict, month: int, months: dict) -> list:
    """The eatery that is actually worth stopping for."""
    _require(dest, ("name",), "food_find")
    eat = _intel(dest, "legendary_eatery") or {}
    ename = (eat.get("name") if isinstance(eat, dict) else None) or dest.get("eatery_name")
    if not ename:
        raise StoryboardError(
            f"food_find: {dest.get('id')} has no named eatery — refusing to "
            f"send anyone to a restaurant we made up")
    dish = dest.get("hero_dish") or ""
    return _scenario(
        dest, month,
        cast=_cast(dest.get("id")), who=("S",),
        trouble=("{S_cap}, stands on a busy street looking at a row of almost "
                 "identical restaurant fronts, every one of them with a tout "
                 "waving a menu."),
        escalate=("A tout steps in front of {S}, holding a laminated menu open "
                  "at arm's length, and behind him two more wave from their own "
                  "doorways, all of them pointing at boards that say more or "
                  "less the same thing."),
        helpless=("{S_cap}, hesitates, takes a step toward one, then stops, "
                  "clearly unsure, as the street noise and the hawkers press in."),
        lookup=("Close on the hands of {S}, opening a saved page on a phone with "
                "one name on it, before turning away from the row of fronts down "
                "a narrower lane."),
        # The plate used to be unnamed, so Veo filled it with whatever it liked:
        # the first champawat render had the voice say "bal mithai", a sweet,
        # over a close-up of a bowl of noodles (2026-09-23). The reel's whole
        # claim is WHICH dish at WHICH place, so the dish has to be on the
        # plate. Named when we have it, and never a stand-in when we do not.
        resolve=(("A plate of " + dish + " is set down in front of {S}, at a "
                  "scratched steel table in a small plain room completely full "
                  "of local families eating, steam coming off it. The food on "
                  "the plate is " + dish + " and nothing else: no noodles, no "
                  "pasta, no burger, no pizza.")
                 if dish else
                 ("A plate of local food is set down in front of {S}, at a "
                  "scratched steel table in a small plain room completely full "
                  "of local families eating, steam coming off it. Indian food "
                  "only: no noodles, no pasta, no burger, no pizza.")),
        act=("{S_cap}, walks away from the bright main street down a narrower "
             "lane, past a shuttered front and a parked scooter, checking the "
             "phone once and then putting it away."),
        says=("Twenty shops in a row, and every one of them said it was the famous one.",
              "A menu in my face, two more men calling from their doorways.",
              "I had one meal in this town, and no idea which door was right.",
              f"So I opened NakshIQ. It named one place here: {ename}.",
              "I left the bright street and walked down a lane instead."),
        caps=("",
              "",
              "",
              "",
              ""),
        says_hi=(f"ये प्लेट {ename} की है, और इस शहर में यही एक जगह सही थी। कैसे पता चला, देखो।",
                 "बीस दुकानें एक लाइन में, हर एक बोल रही थी कि फेमस हम ही हैं।",
                 "एक बंदा मेन्यू लेकर सामने, दो और दरवाज़े से आवाज़ लगा रहे थे।",
                 f"फिर मैंने NakshIQ खोला। यहाँ का एक ही नाम था, {ename}।",
                 "मेन बाज़ार छोड़ा, और गली में निकल गई।"),
        caps_hi=(f"This plate is from {ename}, the one right place in town. Here is how I knew.",
                 "Twenty shops in a row, every one claiming to be the famous one.",
                 "A menu in my face, two more calling from their doorways.",
                 f"Then I opened NakshIQ. One name for this town: {ename}.",
                 "I left the main bazaar and took the lane."),
        payoff_say=(f"Ask for the {dish} at {ename}. I did." if dish else f"{ename}. Go."),
        payoff_cap=ename,
        payoff_say_hi=(f"{ename} पहुँचो, और {dish} ज़रूर माँगना।" if dish else f"यहाँ की एक ही जगह है, {ename}।"),
        payoff_cap_hi=(f"Get to {ename}, and ask for the {dish}." if dish else f"The one place here: {ename}."))


FORMATS.update({
    "sos_rescue": _fmt_sos_rescue,
    "fuel_gap": _fmt_fuel_gap,
    "road_closed": _fmt_road_closed,
    "hospital_run": _fmt_hospital_run,
    "food_find": _fmt_food_find,
})


# ─────────────────────────────────────────────────────────────────────────
# LIGHTER FORMATS (founder-approved slate, 2026-09-21)
# ─────────────────────────────────────────────────────────────────────────
# "Can't be all serious, so it has to be different functions. Different
# features, different data points." Correct, and our own evidence agrees: the
# most-searched thing on NakshIQ is "girnar 10,000 steps in km", then which
# month, X vs Y and cost -- pre-trip curiosity, not emergencies. Each of these
# uses a different feature and a different data point, and each has its OWN
# story shape instead of borrowing the rescue arc:
#   how_hard     useful  the question -> the rumour -> the real numbers -> who it suits
#   which_two    useful  the stalemate -> both look perfect -> this month's scores -> the call
#   real_cost    useful  the question -> the first price -> the real day -> what it buys
#   quiet_month  awe     the crowd -> the crush -> the same place, empty -> it is still good
# Every number these speak comes straight from reel-data.json; none is typed here.

def _km(x) -> str:
    x = float(x)
    return f"{int(x)}" if x == int(x) else f"{x:.1f}"


def _fmt_how_hard(dest: dict, month: int, months: dict) -> list:
    """The single most-searched question on the site, answered with the trek's
    real distance, altitude, days and our difficulty rating. No step counts:
    the treks table has none, so the reel may not claim any."""
    _require(dest, ("name",), "how_hard")
    treks = dest.get("treks") or []
    if not treks:
        raise StoryboardError(f"how_hard: {dest.get('id')} has no trek data")
    t = treks[0]
    name, days = t["name"], int(t["duration_days"])
    span = "in a single day" if days <= 1 else f"over {days} days"
    span_hi = "एक ही दिन में" if days <= 1 else f"{days} दिन में"
    return _scenario(
        dest, month, cast=_cast(dest.get("id")), who=("A", "B"),
        trouble=("At the start of a walking trail at first light, {A}, tightens "
                 "the straps of a small daypack while {B}, looks up at the path "
                 "climbing away from them."),
        escalate=("{A_cap}, and {B}, pass a group of walkers resting on rocks "
                  "beside the path, one of them waving a hand vaguely uphill, as "
                  "the trail keeps climbing ahead."),
        helpless=("Higher up the same trail, {B}, stops with hands on knees "
                  "while {A}, waits a few steps above, and above them both the "
                  "path keeps going up around another shoulder of the hill with "
                  "no top in sight."),
        lookup=("At a rest stop partway up the trail, {B}, holds a phone with a "
                "saved page open and turns it so {A}, can read it too."),
        act=("{A_cap}, and {B}, set off uphill again at a steadier, slower "
             "pace, shortening their strides on the steep part instead of "
             "pushing, the path climbing away ahead of them."),
        resolve=("{A_cap}, and {B}, reach an open viewpoint at the top of the "
                 "trail and stand side by side taking it in, packs still on, "
                 "breathing hard and grinning."),
        says=(f"Everyone told us something different about the {name}. So we just started.",
              "An hour in, the path was still climbing and there was no top in sight.",
              "I stopped with my hands on my knees, wondering if we had misjudged it.",
              f"Then I checked NakshIQ: {_km(t['distance_km'])} kilometres, up to {int(t['max_altitude_m']):,} metres, {span}.",
              "Knowing the real numbers, we stopped pushing and found a pace we could hold."),
        caps=("",
              "",
              "",
              "",
              ""),
        says_hi=(f"ये {name} का टॉप है, और हम यहाँ बिना थके पहुँचे। कैसे, देखो।",
                 "नीचे हर कोई अलग बात बता रहा था, तो हम बस चल पड़े।",
                 "एक घंटे बाद भी रास्ता चढ़ता ही जा रहा था, टॉप कहीं नहीं।",
                 f"फिर NakshIQ देखा: {_km(t['distance_km'])} किलोमीटर, {int(t['max_altitude_m']):,} मीटर तक, {span_hi}।",
                 "असली नंबर पता थे, तो ज़ोर लगाना छोड़ा और अपनी रफ़्तार पकड़ी।"),
        caps_hi=(f"This is the top of the {name}, and we got here without burning out. Here is how.",
                 "At the bottom everyone said something different, so we just started.",
                 "An hour in, the path was still climbing, no top in sight.",
                 f"Then NakshIQ: {_km(t['distance_km'])} km, up to {int(t['max_altitude_m']):,} m, {span}.",
                 "Knowing the real numbers, we stopped pushing and found our pace."),
        payoff_say=f"NakshIQ rates it {t['difficulty']}, for {t['fitness_level']} fitness. It was right.",
        payoff_cap=f"{t['difficulty']} · {t['fitness_level']} fitness",
        payoff_say_hi=f"NakshIQ इसे {t['difficulty']} बताता है, {t['fitness_level']} फ़िटनेस के लिए। सही था।",
        payoff_cap_hi=f"NakshIQ rates it {t['difficulty']}, for {t['fitness_level']} fitness. It was right.")


def _fmt_which_two(dest: dict, month: int, months: dict, dest_b: dict = None) -> list:
    """The /vs/ decision, made with THIS month's scores for both places. Only
    pairs that already have a live /vs/ page are ever offered here. A tie is
    said out loud as a tie -- inventing a winner would be the lie."""
    _require(dest, ("name",), "which_two")
    if not dest_b or not dest_b.get("name"):
        raise StoryboardError(f"which_two: {dest.get('id')} has no /vs/ partner")
    sa, sb_ = dest.get("score"), dest_b.get("score")
    if not isinstance(sa, int) or not isinstance(sb_, int):
        raise StoryboardError(f"which_two: missing a {_month_name(month)} score")
    a, b = dest["name"], dest_b["name"]
    da, db = int(round(sa * 2)), int(round(sb_ * 2))
    mon = _month_name(month)
    la = (months.get(month) or {}).get("label")
    lb = dest_b.get("label")
    # Its first sample recommended "a genuine tie, pick the one you love" for
    # Agonda vs Alibaug in September -- both 4/10, both monsoon. A reel that ends
    # on "go" must only ever point at a month our own verdict says to go.
    if da == db and not (la == "go" and lb == "go"):
        raise StoryboardError(
            f"which_two: {a} and {b} tie at {da}/10 in {mon} but are not both a "
            f"'go' — refusing to recommend either")
    if da != db and ((la if da > db else lb) != "go"):
        raise StoryboardError(
            f"which_two: the higher of {a}/{b} in {mon} is still not a 'go' — "
            f"refusing to recommend it")
    if da == db:
        call_say, call_cap = f"In {mon} it is a genuine tie, so we picked the one we loved.", "a genuine tie"
        call_say_hi = f"{mon} में दोनों बराबर हैं, तो जो दिल कहे वहाँ जाओ।"
        win = a
    else:
        win = a if da > db else b
        call_say, call_cap = f"This {mon}, go to {win}. We did.", f"this {mon}: {win}"
        call_say_hi = f"इस {mon} में {win} जाओ। हम गए।"
    return _scenario(
        dest, month, cast=_cast(dest.get("id")), who=("A", "B"),
        trouble=("At a small cafe table covered in a folded paper map, {A}, and "
                 "{B}, each put a finger on a different spot and look up at each "
                 "other, both laughing at the stalemate."),
        escalate=(f"{{B_cap}}, walks slowly through {a} in soft light while "
                  f"{{A}}, walks through {b} in the same light, the two scenes "
                  f"feeling equally inviting."),
        helpless=("Back at the cafe table the tea has gone cold and the map is "
                  "still folded open between them, and {A}, and {B}, sit back "
                  "on opposite sides of it, no closer to deciding than before."),
        lookup=("Still at the cafe table, {B}, holds up a phone with a saved "
                "page open and turns it toward {A}, who leans in to read it."),
        act=(f"{{A_cap}}, folds the paper map away and {{B}}, picks up a small "
             f"bag from beside the cafe table, the two of them already moving "
             f"as they stand."),
        resolve=(f"{{A_cap}}, and {{B}}, walk together through {win} in warm "
                 f"late light, small bags over their shoulders, clearly pleased "
                 f"with the choice."),
        says=(f"{a} or {b}. We had one week in {mon} and could not agree.",
              "Both looked perfect in every photo either of us could find.",
              "The tea went cold and we were no closer than when we sat down.",
              f"So I checked NakshIQ for this month. {a} {da} out of ten, {b} {db}.",
              "The map got folded away, and we went."),
        caps=("",
              "",
              "",
              "",
              ""),
        says_hi=(f"हम {win} पहुँच गए, और ये सही फ़ैसला था। कैसे लिया, देखो।",
                 f"{a} या {b}। {mon} में एक हफ़्ता, और हम दोनों की राय अलग।",
                 "दोनों हर फ़ोटो में परफ़ेक्ट लग रहे थे। चाय ठंडी हो गई।",
                 f"फिर NakshIQ पर इस महीने का स्कोर देखा। {a} दस में {da}, {b} {db}।",
                 "नक़्शा बंद किया, और निकल पड़े।"),
        caps_hi=(f"We made it to {win}, and it was the right call. Here is how we made it.",
                 f"{a} or {b}. One week in {mon}, and we could not agree.",
                 "Both looked perfect in every photo. The tea went cold.",
                 f"Then NakshIQ, this month: {a} {da} out of ten, {b} {db}.",
                 "Map folded, and we went."),
        payoff_say=call_say,
        payoff_cap=call_cap,
        payoff_say_hi=call_say_hi,
        payoff_cap_hi=call_say)


def _fmt_real_cost(dest: dict, month: int, months: dict) -> list:
    """What a day actually costs, in THIS season: a mid-range room + a day of
    food + a day's taxi, straight from the cost table. Only where all three
    exist for a season covering this month; never an estimate stitched from
    two seasons."""
    _require(dest, ("name",), "real_cost")
    # destination_costs rows carry NO months (the array is empty in every row),
    # so "in September" cannot be read from the cost table. The season is chosen
    # from this destination's own crowd calendar (peak months -> peak, quiet ->
    # low, otherwise shoulder), and the voice-over names the SEASON, which the
    # cost row states directly, rather than claiming a month it does not.
    crowd = dest.get("crowd") or {}
    if not crowd:
        raise StoryboardError(f"real_cost: {dest.get('id')} has no crowd calendar to place {_month_name(month)} in a season")
    season = ("peak" if month in (crowd.get("peak_months") or [])
              else "low" if month in (crowd.get("quiet_months") or []) else "shoulder")
    row = next((r for r in (dest.get("costs") or []) if r.get("season") == season
                and all(r.get(k) for k in ("hotel_mid", "food_day", "taxi_day"))), None)
    if not row:
        raise StoryboardError(
            f"real_cost: {dest.get('id')} has no complete {season}-season cost day")
    h, f, t = int(row["hotel_mid"]), int(row["food_day"]), int(row["taxi_day"])
    day = int(round((h + f + t) / 100.0) * 100)
    name, mon = dest["name"], _month_name(month)
    seas = "off" if season == "low" else season
    seas_hi = {"peak": "पीक", "low": "ऑफ़", "shoulder": "शोल्डर"}[season]
    return _scenario(
        dest, month, cast=_cast(dest.get("id")), who=("A", "B"),
        trouble=(f"At a small hotel reception desk in {name}, {{A}}, and {{B}}, "
                 f"listen to the receptionist, and {{B}}, raises her eyebrows at "
                 f"whatever has just been said."),
        escalate=("{A_cap}, stands beside a line of parked taxis talking to a "
                  "driver, both of them shaking their heads and smiling, while "
                  "{B}, waits with the bags."),
        helpless=("{A_cap}, and {B}, stand at the edge of a busy street with "
                  "their bags at their feet, looking from the taxis back "
                  "towards the hotel they have just come out of, plainly "
                  "working out whether any of it is a fair price."),
        lookup=("At a simple cafe table with two cups of tea steaming, {B}, holds "
                "a phone with a saved page open and slides it across to {A}, who "
                "reads it."),
        act=("{A_cap}, hands the phone back to {B}, and turns to the taxi "
             "driver waiting beside them, saying something short and easy while "
             "{B}, picks up a bag."),
        resolve=("{A_cap}, and {B}, sit at a plain local eatery with full plates "
                 "in front of them, laughing, the day clearly going to plan."),
        says=(f"The first price we heard in {name} made him raise an eyebrow at me.",
              "The taxi driver's number was not much better. Everyone smiling, nobody budging.",
              "So we stood on the street with our bags, guessing what was fair.",
              f"Then I checked NakshIQ. A mid-range day here in {seas} season is about {day:,} rupees.",
              "The next conversation with the driver was very short."),
        caps=("",
              "",
              "",
              "",
              ""),
        says_hi=(f"{name} में हमारा दिन बजट में निकला, बिना बहस के। कैसे, देखो।",
                 "रिसेप्शन पर पहला दाम सुना, और उसने मेरी तरफ़ देखा।",
                 "टैक्सी वाले का नंबर भी कुछ बेहतर नहीं था। सब मुस्कुरा रहे थे, कोई हिल नहीं रहा था।",
                 f"फिर NakshIQ देखा। यहाँ {seas_hi} सीज़न में मिड-रेंज दिन लगभग {day:,} रुपये।",
                 "ड्राइवर से अगली बात बहुत छोटी रही।"),
        caps_hi=(f"Our day in {name} came in on budget, no arguing. Here is how.",
                 "The first price at the desk, and he looked at me.",
                 "The taxi driver's number was no better. Everyone smiling, nobody moving.",
                 f"Then NakshIQ. A mid-range day here in {seas} season is about {day:,} rupees.",
                 "The next conversation with the driver was very short."),
        payoff_say="That is a mid-range room, food and a taxi, from its NakshIQ cost page. Check it before you haggle.",
        payoff_cap=f"room ₹{h:,} · food ₹{f:,} · taxi ₹{t:,}",
        payoff_say_hi="कमरा, खाना और टैक्सी, सब NakshIQ के कॉस्ट पेज पर। बहस से पहले देख लो।",
        payoff_cap_hi="Room, food and taxi, all on the NakshIQ cost page. Check before you haggle.")


def _fmt_quiet_month(dest: dict, month: int, months: dict) -> list:
    """Awe, with a use: the month that is BOTH quiet and still a good month.
    crowd_calendar is seasonal, and a quiet month is often quiet because the
    place is shut ('summer and monsoon prohibit visits' is a real note), so a
    quiet month only qualifies if our verdict for it is 'go'. Without that
    intersection this reel would send people to a closed site."""
    _require(dest, ("name",), "quiet_month")
    crowd = dest.get("crowd") or {}
    peak = [m for m in (crowd.get("peak_months") or []) if isinstance(m, int)]
    quiet = [m for m in (crowd.get("quiet_months") or []) if isinstance(m, int)]
    go = lambda m: (months.get(m) or {}).get("label") == "go"
    # Strict first: a month that is quiet AND a go (69 of 525 destinations).
    # Otherwise a go month that is simply not a peak-crowd month (387 of 525),
    # and then the copy only claims "fewer people than peak", never "empty".
    strict = [m for m in quiet if go(m)]
    soft = [m for m in range(1, 13) if go(m) and m not in peak and m not in quiet]
    if not peak or not (strict or soft):
        raise StoryboardError(
            f"quiet_month: {dest.get('id')} has no go month outside its peak — "
            f"refusing to send anyone somewhere shut")
    is_strict = bool(strict)
    pk, qm = _month_name(peak[0]), _month_name((strict or soft)[0])
    name = dest["name"]
    return _scenario(
        dest, month, cast=_cast(dest.get("id")), who=("S",), screen=False,
        trouble=(f"At the height of the season at {name}, dense crowds of "
                 f"visitors fill the frame around the main sight, shoulder to "
                 f"shoulder, phones raised, a steady noise of voices."),
        escalate=(f"A slow sideways pass along a long queue of visitors waiting "
                  f"in hot sun at {name}, visitors fanning themselves and shifting "
                  f"from foot to foot."),
        helpless=(f"Inside the crowd at {name} at the height of the season, "
                  f"the whole mass of visitors edges forward one shuffled step "
                  f"at a time between raised phones and shoulders, with nowhere "
                  f"to stand still and no clear view of the main sight."),
        lookup=((f"The same main sight at {name}, almost empty in soft early "
                 f"light, and far off in the distance a single figure, {{S}}, "
                 f"walking slowly toward it alone.") if is_strict else
                (f"The same main sight at {name} in soft light with only a few "
                 f"unhurried visitors, and among them {{S}}, walking slowly "
                 f"toward it with room to breathe.")),
        act=(f"{{S_cap}}, walks the last stretch up to the main sight at "
             f"{name} without stopping or queueing, hands in pockets, the space "
             f"ahead open all the way to it."),
        resolve=(f"{{S_cap}}, sits on a low stone wall at {name} with no one "
                 f"else around, simply taking it in."),
        says=(f"The first time I came to {name} was in {pk}. Everybody else had come too.",
              "Queues in the sun, and the whole place shuffling one step at a time.",
              "I never really saw the thing I had travelled for. Just phones and shoulders.",
              f"Then NakshIQ told me {qm} is still a go here. So I came back.",
              "I walked straight up to it. Nobody in my way."),
        caps=("",
              "",
              "",
              "",
              ""),
        says_hi=(f"ये {name} है, और यहाँ मैं अकेली थी। कैसे, देखो।",
                 f"पहली बार {pk} में आई थी। सब लोग भी उसी महीने आए थे।",
                 "धूप में लाइनें, और पूरी जगह एक-एक क़दम सरकती हुई।",
                 f"फिर NakshIQ ने बताया कि {qm} में भी यहाँ जाना सही है। तो वापस आई।",
                 "सीधा चलकर पहुँची। सामने कोई नहीं।"),
        caps_hi=(f"This is {name}, and I had it to myself. Here is how.",
                 f"The first time I came was in {pk}. So had everyone else.",
                 "Queues in the sun, the whole place shuffling one step at a time.",
                 f"Then NakshIQ said {qm} is still a go here. So I came back.",
                 "Walked straight up to it. Nobody in my way."),
        payoff_say=("Quiet, and still a month NakshIQ says to go." if is_strict else "Fewer people than peak, and still a month NakshIQ says to go."),
        payoff_cap=(f"{qm}: quiet, and a go" if is_strict else f"{qm}: fewer crowds, still a go"),
        payoff_say_hi=(f"{qm}: शांत, और NakshIQ के हिसाब से जाने का सही महीना।" if is_strict else f"{qm}: पीक से कम भीड़, और फिर भी जाने का सही महीना।"),
        payoff_cap_hi=(f"{qm}: quiet, and still a month NakshIQ says to go." if is_strict else f"{qm}: fewer people than peak, and still a go."))


FORMATS.update({
    "how_hard": _fmt_how_hard,
    "which_two": _fmt_which_two,
    "real_cost": _fmt_real_cost,
    "quiet_month": _fmt_quiet_month,
})

# THE TONE MIX, enforced by build-queue.py: two storyboards per tone per day.
# 25% tense, 75% everything else. No two reels in a day on the same feature.
# two_places, wrong_month and crowd_pullback are LANDSCAPE formats and still
# three or four beats, so on the six-beat rule (2026-09-23) they would cut a
# short reel out of a long one. They stay in FORMATS — nothing is deleted — but
# they are out of the daily rotation until they are rewritten to six beats.
TONES = {
    "tense":  ("sos_rescue", "road_closed", "fuel_gap", "hospital_run"),
    "useful": ("how_hard", "which_two", "real_cost"),
    "warm":   ("food_find",),
    "awe":    ("quiet_month",),
}
