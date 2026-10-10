#!/usr/bin/env python3
"""script_to_spec.py — a gate-passing script becomes a reel_v3 spec skeleton.

    python3 script_to_spec.py reel_scripts/_round1_2026-10-01/udaipur__parents.json
        -> reel_specs/udaipur__parents.json  (refs / keyframes / shots left for the
           visual pass to fill; vo beats, cover, angle, captions, look already set)

WHY: BRIEF v3 scripts are 7-11 full sentences and the reel is cut from 6 shots,
so the lines have to be grouped onto beats the same way every time. Beats 1-4
take one line each; the remaining lines split across beats 5 and 6, and the
"travel intelligence" line plus the "NakshIQ." sign-off always close beat 6
(reel_v3.render holds the last beat TAIL seconds past the final word).
Hindi is grouped by the same line counts, so a Hindi line one short at the end
still lands under the right picture.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
FORMATS = json.loads((HERE / "reel_formats.json").read_text())["angles"]
LOOK = ("Soft natural light, natural colour, anamorphic 35mm lens, shallow depth of field, soft film "
        "grain, photorealistic, cinematic. Faces are never in close-up and no one looks at the camera. "
        "A phone screen is only a soft glow, never legible. No other people. No music, no speech, no "
        "voiceover, no text, captions, logos or watermark.")


def group(lines: list[str], n_beats: int = 6) -> list[list[str]]:
    """Beats 1-4 one line each; the rest split over beats 5-6 with the last two
    lines always in beat 6. Short scripts (7 lines) give 1|1|1|1|1|2."""
    n = len(lines)
    if n < n_beats + 1:
        raise SystemExit(f"{n} lines cannot fill {n_beats} beats with a 2-line close")
    head = lines[:4]
    close = lines[-2:]                  # travel intelligence + NakshIQ.
    middle = lines[4:-2]                # 1 or more lines
    # The close never shares a beat with a story line. Amritsar 2026-10-02: with the
    # close inside beat 6 the last beat ran 13 s on an 8 s clip and the picture froze
    # 3.4 s; reel_v3.render now refuses that. 7 lines: the close takes beat 6 (s6).
    # 8+ lines: beats 5-6 share the middle and the close is a 7th beat on s6 again,
    # punched in (CLOSE_BEAT), so it reads as a new angle.
    if len(middle) == 1:
        return [[l] for l in head] + [middle, close]
    b5 = middle[: (len(middle) + 1) // 2]
    return [[l] for l in head] + [b5, middle[len(b5):], close]


CLOSE_BEAT = {"shot": "s6", "from": 1.5, "zoom": 1.35}


def build(script: dict, src: Path | None = None) -> dict:
    en = [l.strip() for l in script["lang_en"].splitlines() if l.strip()]
    hi = [l.strip() for l in script["lang_hi"].splitlines() if l.strip()]
    g_en = group(en)
    # Hindi follows the English beat sizes; a line count off by 1-2 is absorbed by the last beat.
    sizes = [len(b) for b in g_en]
    g_hi, i = [], 0
    for k, sz in enumerate(sizes):
        take = hi[i:i + sz] if k < len(sizes) - 1 else hi[i:]
        g_hi.append(take); i += sz
    angle = script.get("angle") or "month"
    fmt = FORMATS[angle]
    return {
        "auto": False,          # flipped to true by the approval step; topup only queues auto specs
        "id": script["id"],
        "slug": script["slug"],
        "angle": angle,
        "format": angle,
        "tone": script.get("tone", "warm"),
        "script_approved": script.get("status", "draft"),
        "script_file": str(src.resolve().relative_to(HERE)) if src else f"reel_scripts/{script['id']}.json",
        "method": "KEYFRAME-FIRST: refs, then a free Nano Banana still per beat, then Frames to Video on Veo 3.1 Lite from each still. Motion + sound prompts only.",
        "cast": fmt["cast"],
        "narrator": fmt["narrator"],
        "setting_basis": "",
        "look": LOOK,
        "refs": [],
        "keyframes": [],
        "shots": [],
        "beats": [{"shot": f"s{i + 1}", "from": 0.0} for i in range(6)] + ([dict(CLOSE_BEAT)] if len(g_en) == 7 else []),
        "vo": {"en": ["\n".join(b) for b in g_en], "hi": ["\n".join(b) for b in g_hi]},
        "captions": {"hi": "en"},
        "cover": {"hook": script.get("cover_short") or script["cover"]["hook"], "still": "kf_s1"},   # covers are <= 8 words (reel_v3.check); the long hook is line 1
        "caption_name": script.get("caption_name"),
        "shot_notes": script.get("shots") or [],
    }


if __name__ == "__main__":
    src = Path(sys.argv[1])
    spec = build(json.loads(src.read_text()), src)
    out = HERE / "reel_specs" / f"{spec['id']}.json"
    if out.exists() and "--refresh-vo" in sys.argv:
        # A revised script: keep the visual pass (refs/keyframes/shots), replace the words.
        cur = json.loads(out.read_text())
        for k in ("vo", "caption_name", "shot_notes", "script_approved"):
            cur[k] = spec[k]
        cur["cover"]["hook"] = spec["cover"]["hook"]     # the visual pass chose the still; keep it
        spec = cur
    elif out.exists() and "--force" not in sys.argv:
        raise SystemExit(f"{out} exists; pass --force to overwrite or --refresh-vo to keep the visuals")
    out.write_text(json.dumps(spec, ensure_ascii=False, indent=1) + "\n")
    print(f"[script_to_spec] {out}: beats {[len(b.splitlines()) for b in spec['vo']['en']]} en / {[len(b.splitlines()) for b in spec['vo']['hi']]} hi")
