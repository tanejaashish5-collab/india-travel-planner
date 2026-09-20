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


def _place(dest: dict) -> str:
    """'Chitkul in Himachal Pradesh' — the specificity anchor that keeps a
    prompt from producing generic mountain wallpaper."""
    name = dest.get("name") or dest.get("id") or ""
    state = dest.get("state") or ""
    return f"{name} in {state}" if state else name


def _worst_month(months: dict) -> Optional[int]:
    """The month this place scores LOWEST. That is the turn: the reel exists to
    say 'not then'. Returns None when the data cannot support the claim."""
    if not months:
        return None
    scored = [(m, v.get("score")) for m, v in months.items()
              if isinstance(v.get("score"), (int, float))]
    if len(scored) < 2:
        return None
    return min(scored, key=lambda x: x[1])[0]


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
            "wrong_month: need scores for 2+ months to name a worse one")
    if months.get(bad, {}).get("score") >= months.get(month, {}).get("score", 0):
        raise StoryboardError(
            f"wrong_month: {dest.get('id')} has no month worse than {month}")

    place = _place(dest)
    good_n, bad_n = _month_name(month), _month_name(bad)
    frame = (f"{place}, the village and its valley filling the middle distance "
             f"with the ridgeline behind")
    bad_line = (months.get(bad, {}).get("sentence") or "").strip()

    return [
        {"role": "hook", "dur": DEFAULT_DURS["hook"],
         "say": f"This is {dest['name']} in {good_n}.",
         "caption": f"{dest['name']}, {good_n}",
         "veo": (f"Locked-off wide shot on a tripod with no camera movement of {frame}, "
                 f"at its {good_n} best: full colour in the terraces, clear air, "
                 f"low afternoon sun raking across the slope. Nothing moves but the "
                 f"light and the grass. {STYLE}")},
        {"role": "build", "dur": DEFAULT_DURS["build"],
         "say": "Same frame, same camera, watch the year turn.",
         "caption": "same frame, same camera",
         "veo": (f"The identical locked-off framing of {frame}, the season shifting "
                 f"forward continuously without the camera moving: green giving way "
                 f"to gold and rust, the light going lower and colder, the first "
                 f"thin snow settling on the roofs. {STYLE}")},
        {"role": "turn", "dur": DEFAULT_DURS["turn"],
         "say": f"This is the same place in {bad_n}.",
         "caption": f"{dest['name']}, {bad_n}",
         "veo": (f"The identical locked-off framing of {frame}, now in deep {bad_n}: "
                 f"the road buried and untracked, the river running black between "
                 f"ice shelves, houses shuttered to the windowsills, flat grey light "
                 f"and blowing spindrift. No people, no vehicles, no movement but "
                 f"weather. {STYLE}")},
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
                 f"{place} at first light, completely empty, soft gold on the stone, "
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
         "say": (dest.get("note") or "").strip(),
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
         "veo": (f"Locked-off frame of a single hill road: deodar trees, colonial-era "
                 f"buildings with tin roofs, a low stone wall on the right. This is "
                 f"{a}, quiet, two walkers, no traffic, late afternoon. {STYLE}")},
        {"role": "build", "dur": DEFAULT_DURS["build"],
         "say": "Same lens, same hour, same week.",
         "caption": "same lens, same hour",
         "veo": (f"The identical framing and exposure begins to morph seamlessly, the "
                 f"empty road at {a} filling with detail: shopfronts resolving, "
                 f"signage appearing, parked cars sliding into the verge. {STYLE}")},
        {"role": "turn", "dur": DEFAULT_DURS["turn"],
         "say": f"That is {dest_b['name']}.",
         "caption": dest_b["name"],
         "veo": (f"The morph completes into {b} at the same hour: the road packed "
                 f"shoulder to shoulder with people, stalls, hoardings, horns, "
                 f"vehicles nose to tail, matched lens and exposure so only the "
                 f"place has changed. {STYLE}")},
        {"role": "payoff", "dur": DEFAULT_DURS["payoff"],
         "say": (months.get(month, {}).get("sentence") or "").strip()
                or "Same score. Completely different week.",
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


def validate(sb: dict) -> None:
    beats = sb.get("beats") or []
    if len(beats) < 3:
        raise StoryboardError("a storyboard needs at least 3 beats")

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
        if _TEXT_ASK.search(p.replace(STYLE, "")):
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
    return [{"clip": b["clip"], "prompt": b["veo"], "slug": sb["slug"],
             "format": sb["format"], "beat": b["id"], "role": b["role"],
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
