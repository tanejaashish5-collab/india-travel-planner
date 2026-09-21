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

BEAT_ROLES = ("hook", "build", "turn", "payoff")

# Beat durations. The turn gets the longest hold because it is the moment the
# reel is actually for; the hook is short because a slow open is a swipe.
DEFAULT_DURS = {"hook": 2.6, "build": 2.2, "turn": 3.4, "payoff": 2.4}

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

    turns = [b for b in beats if b.get("role") == "turn"]
    if len(turns) != 1:
        raise StoryboardError(
            f"{sb.get('format')}: needs exactly one 'turn' beat, found "
            f"{len(turns)} — a reel with no turn has no reason to be watched "
            f"to the end")

    for b in beats:
        say = (b.get("say") or "").strip()
        if say and len(re.findall(r"[.!?](?:\s|$)", say)) > 1:
            raise StoryboardError(
                f"{b['id']}: `say` must be ONE sentence — the TTS splits on "
                f"sentence boundaries, so a multi-sentence beat drifts its "
                f"captions out of step with the picture")
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

def queue_rows(sb: dict) -> list:
    # `character` rides on every row so the Flow session can put the SAME text in
    # Flow's character field for every beat of one storyboard. Formats with no
    # people (the landscape ones) simply carry an empty string.
    return [{"clip": b["clip"], "prompt": b["veo"], "slug": sb["slug"],
             "format": sb["format"], "beat": b["id"], "role": b["role"],
             "character": b.get("character", ""),
             "seconds": 8, "status": "pending"}
            for b in sb["beats"] if b.get("veo")]


def enqueue(sb: dict, path: Path = None) -> int:
    """Append this storyboard's prompts to the Veo queue, skipping any clip
    already queued or generated. Returns how many rows were added."""
    path = path or VEO_QUEUE
    path.parent.mkdir(parents=True, exist_ok=True)
    try:
        q = json.loads(path.read_text())
    except Exception:
        q = []
    have = {r.get("clip") for r in q}
    new = [r for r in queue_rows(sb) if r["clip"] not in have]
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


def spec_from_storyboard(sb: dict) -> dict:
    """The `spec` build() wants: narration lines + matching on-screen captions.
    One beat, one line, one caption — which is what keeps picture and voice in
    step instead of drifting."""
    lines = [b["say"] for b in sb["beats"] if (b.get("say") or "").strip()]
    caps = [b["caption"] for b in sb["beats"] if (b.get("say") or "").strip()]
    return {"lines": lines, "caption_lines": caps,
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
_WARDROBE = ("a navy quilted jacket and a mustard wool shawl",
             "a rust-red fleece and a grey hooded sweatshirt",
             "an olive field jacket and a cream shawl",
             "a black puffer jacket and a deep green scarf")
_VEHICLE = ("a dusty white hatchback with a roof rack",
            "a silver compact hatchback",
            "a mud-streaked pale grey hatchback")
_KIDS = ("the children in bright red and yellow knitted jumpers",
         "the children in matching blue raincoats",
         "the children in orange and teal puffer jackets")


def _character(slug: str, who: str, *, car: bool = True, kids: bool = False) -> str:
    """ONE description of the people in a storyboard, identical in every beat.

    Flow has a character field for exactly this, and the Cowork brief puts this
    string in it; it also rides in each prompt so the rule holds even if that
    field is unavailable. Chosen deterministically from the slug, so a beat
    regenerated later still matches the ones already on R2 — and different
    reels get different people, while one reel keeps the same ones.
    """
    import zlib
    h = zlib.crc32((slug or "x").encode())
    bits = [f"{who}, the adults in {_WARDROBE[h % len(_WARDROBE)]}"]
    if kids:
        bits.append(_KIDS[(h >> 4) % len(_KIDS)])
    if car:
        bits.append(f"travelling in {_VEHICLE[(h >> 8) % len(_VEHICLE)]}")
    return "Same people in every shot: " + ", ".join(bits) + ". "


PEOPLE = ("Shot from behind or over the shoulder, or framed on hands and the "
          "phone screen, or at middle distance — no face in close-up, no one "
          "addressing the camera. The phone screen is visible only as glow and "
          "shape, never legible. ")


def _intel(dest: dict, *path):
    cur = dest.get("intel") or {}
    for k in path:
        cur = (cur or {}).get(k) if isinstance(cur, dict) else None
    return cur


def _scenario(dest: dict, month: int, *, trouble: str, helpless: str,
              lookup: str, resolve: str, says: tuple, caps: tuple,
              payoff_say: str, payoff_cap: str, character: str) -> list:
    """Shared four-beat shape for every scenario: trouble, helplessness, the
    lookup (the turn — this is the product), and help arriving."""
    place = _place(dest)
    cast = character
    # SCREEN goes only on the turn: it is the beat that shows the page, and
    # describing a screen in a shot that has none invites Veo to add one.
    beats = [
        {"role": "hook", "dur": DEFAULT_DURS["hook"], "say": says[0],
         "caption": caps[0],
         "veo": f"{trouble} Near {place}. {cast}{PEOPLE}{STYLE}"},
        {"role": "build", "dur": DEFAULT_DURS["build"], "say": says[1],
         "caption": caps[1],
         "veo": f"{helpless} Near {place}. {cast}{PEOPLE}{STYLE}"},
        {"role": "turn", "dur": DEFAULT_DURS["turn"], "say": says[2],
         "caption": caps[2],
         "veo": f"{lookup} Near {place}. {cast}{SCREEN}{PEOPLE}{STYLE}"},
        {"role": "payoff", "dur": DEFAULT_DURS["payoff"], "say": payoff_say,
         "caption": payoff_cap,
         "veo": f"{resolve} Near {place}. {cast}{PEOPLE}{STYLE}"},
    ]
    for b in beats:
        b["character"] = character.strip()
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
        character=_character(dest.get("id"), "a young couple"),
        trouble=("A small hatchback is stopped at the side of an empty mountain "
                 "road at dusk with its hazard lights blinking, bonnet up, the "
                 "couple standing beside it looking down the empty road in both "
                 "directions."),
        helpless=("One of them holds a phone up at arm's length, turning slowly, "
                  "searching for a signal that is not there while the light goes "
                  "and the valley below fills with shadow."),
        lookup=("Close on their hands opening a saved page on the phone that "
                "loads with no signal at all, then one of them walking a little "
                "way up the road holding the phone high until it finds a single "
                "bar, and lifting it to their ear."),
        resolve=("Blue and red lights sweep around the bend behind them and an "
                 "emergency vehicle pulls in, and the couple walk toward it."),
        says=("Your car stops here, and there is no signal.",
              "No bars, no one on the road, and the light is going.",
              "The page you saved still opens, numbers and all."),
        caps=("no signal", "no one coming", "the numbers, offline"),
        payoff_say="India's emergency numbers are saved on NakshIQ, and the page opens offline.",
        payoff_cap="emergency numbers · offline")


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
        character=_character(dest.get("id"), "two friends on a road trip"),
        trouble=("Close on a car dashboard at altitude, the low-fuel light coming "
                 "on amber, the road ahead through the windscreen completely empty "
                 "and climbing."),
        helpless=("The driver glances at the passenger, then back at the empty "
                  "road, nothing but rock and sky in every direction and no "
                  "buildings at all."),
        lookup=("The passenger's hands open a saved page on a phone that loads "
                "with no signal, and their finger stops on a line partway down."),
        resolve=("The car pulls into a small roadside fuel pump with a hand-painted "
                 "sign, an attendant already walking over with the nozzle."),
        says=("The fuel light comes on right about here.",
              "There is nothing ahead for a long time.",
              f"NakshIQ lists the nearest pump for {name}."),
        caps=("fuel light", "nothing ahead", "the nearest pump"),
        payoff_say=(f"The nearest pump for {name}, and the one after it, are on its page."
                    if has_next else f"The nearest pump for {name} is on its page."),
        payoff_cap="nearest pump, listed")


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
        character=_character(dest.get("id"), "a family of four, two parents and two children", kids=True),
        trouble=("The family loading bags into a car outside a house early in the "
                 "morning, the children half asleep, the boot open, everything "
                 "ready to go."),
        helpless=("A wider shot of the mountain road hours ahead of them: a "
                  "landslide has taken half the carriageway, a line of stopped "
                  "trucks, nobody moving in either direction."),
        lookup=("Back at the car, a parent stands with the boot still open and "
                "checks a page on their phone, then closes the boot without "
                "hurrying."),
        resolve=("The family eating breakfast unhurried at a table, the car still "
                 "parked outside, going nowhere today and entirely fine about it."),
        says=("This family was leaving at six.",
              "The road ahead had gone overnight.",
              "They checked the road page before loading the car."),
        caps=("leaving at six", "the road had gone", "they checked first"),
        payoff_say=f"NakshIQ tracks road closures across {state}, dated and sourced.",
        payoff_cap="closures, dated + sourced")


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
        character=_character(dest.get("id"), "a parent and a young child", car=False),
        trouble=("The parent kneeling beside the child wrapped in a blanket on a "
                 "guesthouse bed at high altitude, a hand on the child's forehead, "
                 "the window behind them showing thin cold light."),
        helpless=("The parent stands at the window holding a phone up, no signal, "
                  "the settlement outside small and scattered and a long way from "
                  "anywhere."),
        lookup=("Hands on the phone opening a saved page that loads without a "
                "signal, the parent already reaching for a jacket with the other "
                "hand."),
        resolve=("A vehicle pulling up outside a small district clinic with its "
                 "lights on, a staff member opening the door as the parent carries "
                 "the child in."),
        # Not "altitude hits children faster" -- that is a medical claim we
        # cannot source. What is defensible is that a young child cannot tell
        # you it is happening.
        says=("A small child cannot tell you the altitude is getting to them.",
              "There is no signal and no hospital in sight.",
              "The nearest hospital is on the page you saved."),
        caps=("altitude, and a child", "no signal", "nearest hospital, saved"),
        payoff_say=f"The nearest hospital to {name} is named on its NakshIQ page.",
        payoff_cap="nearest hospital, named")


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
        character=_character(dest.get("id"), "a solo traveller", car=False),
        trouble=("The traveller standing on a busy street looking at a row of "
                 "almost identical restaurant fronts, every one of them with a "
                 "tout waving a menu."),
        helpless=("They hesitate, take a step toward one, then stop, clearly "
                  "unsure, the street noise and the hawkers pressing in."),
        lookup=("Hands on a phone opening a saved page, one name on it, and they "
                "turn and walk away from the row of fronts down a narrower lane."),
        resolve=("A plate arriving on a scratched steel table in a small plain "
                 "room that is completely full of local families eating, steam "
                 "coming off it."),
        says=("Twenty places, all claiming to be the famous one.",
              "You have one meal here and no way to tell.",
              f"NakshIQ names the one: {ename}."),
        caps=("twenty identical fronts", "one meal, no way to tell", ename),
        # Was "verified against three sources". The three-source rule governed
        # the local_eateries backfill; legendary_eatery's provenance is not
        # proven to be the same, so the reel does not claim it.
        payoff_say=(f"Ask for the {dish} at {ename}." if dish else f"{ename}."),
        payoff_cap=ename)


FORMATS.update({
    "sos_rescue": _fmt_sos_rescue,
    "fuel_gap": _fmt_fuel_gap,
    "road_closed": _fmt_road_closed,
    "hospital_run": _fmt_hospital_run,
    "food_find": _fmt_food_find,
})
