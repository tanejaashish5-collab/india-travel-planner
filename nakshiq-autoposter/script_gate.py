#!/usr/bin/env python3
"""script_gate.py — the automatic gate every reel script passes before a human sees it.

    python3 script_gate.py reel_scripts/<id>.json          # exit 0 = pass, 1 = refused

WHY (founder, 2026-09-26): scripts are drafted in a loop (generate → critique →
fact-check → refine) and must not need his approval at every step. A rule that
lives in a prompt is a suggestion; this file is the restriction. A script
reaches the weekly review page only if this passes.

A script file is JSON:
  {"id": "...", "lang_en": "line\\nline...", "lang_hi": "...",
   "facts": [ {"kind": "month", "slug": "spiti-valley", "month": 11, "label": "skip"},
              {"kind": "crowd", "slug": "nainital", "month": 10, "is": "peak"},
              {"kind": "trek",  "slug": "girnar", "field": "difficulty", "value": "hard"} ]}
Every factual claim the script makes must appear in `facts`, and every fact is
checked against reel-data.json (the Supabase snapshot the reels use). A fact
that does not match refuses the script; a claim with no fact entry is the
critic's job to catch, which is why the checks below also refuse the claim
shapes that were false in shipped copy before.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from storyboard import _OVERCLAIM, _NUMBER_ASSERT, _TERRAIN_ASSERT  # noqa: E402

DATA = Path.home() / "Automation" / "nakshiq-veo" / "data" / "reel-data.json"
WORDS = (55, 80)            # ~24-32 s at the Cs.V10 one-pass pace
MAX_LINES = 17        # founder picked 13-16-line scripts over 20-line ones 3/3 (2026-09-26)
DASHES = re.compile(r"[–—]")     # founder: no em/en dashes in anything public
DIGITS = re.compile(r"\d")

# STORY rules (BRIEF v2, 2026-10-01). Measured on the posted reels: NakshIQ was first
# spoken at 4.3s (Rann), 5.5s (Manali), 6.0s (Triund), i.e. lines 3-4, and the average
# Instagram viewer left at 5-9s. The founder's own Chikmagalur script names it at line 8,
# after 46% of its words. The product enters late, as the answer to a question already open.
MIN_LINES = 12
PRODUCT_MIN_LINE = 6        # 1-based: NakshIQ is first named on line 6 or later (EN and HI)
PRODUCT_MIN_SHARE = 0.35    # and at least 35% of the English words come before it
SHOTS = 6                   # same man + woman, 6 Veo shots
# The old skeleton's stock entry and stock ending (founder brief, 2026-10-01).
STOCK_ENTRY = re.compile(r"\b(then|so)\s+(i|we)\s+(checked|opened|looked at)\s+nakshiq", re.I)
MOOD_END = re.compile(r"\b(chai|coffee|tea)\b|चाय|कॉफ़ी|कॉफी", re.I)


def _norm(s: str) -> str:
    s = s.replace("*", "").replace("|", " ").lower()
    s = re.sub(r"[.,!?;:'\"’‘“”…]", "", s)
    return " ".join(s.split())


def _story(script: dict) -> list[str]:
    """Story-shape rules a machine can check. Judgement rules live in critic_rubric.md."""
    out = []
    for lang in ("lang_en", "lang_hi"):
        lines = [l.strip() for l in (script.get(lang) or "").splitlines() if l.strip()]
        if not lines:
            continue
        if len(lines) < MIN_LINES:
            out.append(f"{lang} has {len(lines)} lines; min {MIN_LINES}")
        body = lines[:-1]                       # the last line is the "NakshIQ." sign-off
        first = next((i for i, l in enumerate(body) if "nakshiq" in l.lower()), None)
        if first is None:
            out.append(f"{lang}: NakshIQ never enters before the sign-off; it must arrive as the answer")
        elif first + 1 < PRODUCT_MIN_LINE:
            out.append(f"{lang}: NakshIQ first named on line {first + 1}; not before line {PRODUCT_MIN_LINE} "
                       "(the app answered the question before the viewer felt it)")
        elif lang == "lang_en":
            words_before = sum(len(l.split()) for l in lines[:first])
            share = words_before / max(1, sum(len(l.split()) for l in lines))
            if share < PRODUCT_MIN_SHARE:
                out.append(f"lang_en: only {share:.0%} of the words come before NakshIQ; min {PRODUCT_MIN_SHARE:.0%}")
        tail = lines[-max(5, -(-len(lines) * 2 // 5)):]     # the last 40% of the script
        if MOOD_END.search(" ".join(tail)):
            out.append(f"{lang}: the ending is a chai/coffee mood beat; the payoff must be an outcome")
    en = [l.strip() for l in (script.get("lang_en") or "").splitlines() if l.strip()]
    hi = [l.strip() for l in (script.get("lang_hi") or "").splitlines() if l.strip()]
    if en and hi and abs(len(en) - len(hi)) > 2:
        out.append(f"Hindi has {len(hi)} lines vs English {len(en)}; keep them parallel (within 2)")
    m = STOCK_ENTRY.search(script.get("lang_en") or "")
    if m:
        out.append(f"lang_en uses the old stock entry {m.group(0)!r}; find a fresh way in")
    hook = ((script.get("cover") or {}).get("hook") or "").strip()
    if not hook:
        out.append('no cover.hook; the cover line is the script\'s line 1')
    elif en and _norm(hook) != _norm(en[0]):
        out.append(f"cover.hook {hook!r} does not match line 1 {en[0]!r}")
    if len(script.get("shots") or []) != SHOTS:
        out.append(f"{len(script.get('shots') or [])} shots; the reel is cut from exactly {SHOTS}")
    return out


def _fact_ok(f: dict, d: dict) -> str | None:
    """None if the fact matches the data, else the reason it does not."""
    k, s = f.get("kind"), f.get("slug")
    if k == "month":
        m = (d["months"].get(s) or {}).get(str(f["month"]))
        if not m:
            return f"{s}: no score for month {f['month']}"
        if "label" in f and m["label"] != f["label"]:
            return f"{s} month {f['month']} is {m['label']!r}, script says {f['label']!r}"
        if "score10" in f and m["score"] * 2 != f["score10"]:
            return f"{s} month {f['month']} scores {m['score'] * 2}/10, script says {f['score10']}"
        return None
    if k == "crowd":
        c = d["crowd"].get(s) or {}
        peak = f["month"] in (c.get("peak_months") or [])
        quiet = f["month"] in (c.get("quiet_months") or [])
        want = f["is"]
        if (want == "peak" and not peak) or (want == "not_peak" and peak) or (want == "quiet" and not quiet):
            return f"{s} month {f['month']}: peak={peak} quiet={quiet}, script says {want}"
        return None
    if k == "trek":
        rows = d["treks"].get(s) or []
        if not any(str(r.get(f["field"])) == str(f["value"]) for r in rows):
            return f"{s} trek {f['field']} is {[r.get(f['field']) for r in rows]}, script says {f['value']!r}"
        return None
    if k == "cost":
        c = {x["season"]: x for x in (d["costs"].get(s) or [])}
        v = (c.get(f["season"]) or {}).get(f["field"])
        if v != f["value"]:
            return f"{s} {f['season']} {f['field']} is {v}, script says {f['value']}"
        return None
    if k == "product":
        # A product capability, checked against the list of what NakshIQ really does.
        if f.get("claim") not in PRODUCT:
            return f"product claim {f.get('claim')!r} is not in the true-feature list"
        return None
    return f"unknown fact kind {k!r}"


# What the product really does (verified 2026-09-20/21; see plan rustling-dreaming-clarke).
PRODUCT = {
    "sos_offline_national_helplines",   # /sos precached by the service worker; 10 ministry-sourced national lines
    "month_scores_go_wait_skip",        # 1-10 per month per destination, go/wait/skip
    "himalayan_road_closures_feed",     # dated, sourced road updates, Himalayan states only
    "destination_fuel_network_night_cost_notes",
}


def check(script: dict, d: dict | None = None, legacy: bool = False) -> list[str]:
    """legacy=True skips the BRIEF v2 story rules (only for re-checking v1 scripts)."""
    d = d or json.loads(DATA.read_text())
    problems = []
    en = script.get("lang_en") or ""
    words = len(en.split())
    if not WORDS[0] <= words <= WORDS[1]:
        problems.append(f"English is {words} words; the reel needs {WORDS[0]}-{WORDS[1]}")
    lines = [l.strip() for l in en.splitlines() if l.strip()]
    if not lines or lines[-1].rstrip(".") != "NakshIQ":
        problems.append('English must end on the line "NakshIQ."')
    if "travel intelligence" not in en.lower():
        problems.append('English must carry the "travel intelligence" line before the sign-off')
    if len(lines) > MAX_LINES:
        problems.append(f"English has {len(lines)} lines; max {MAX_LINES} (over-chopped scripts lost the blind test)")
    long = [l for l in lines if len(l.split()) > 14]
    if long:
        problems.append(f"{len(long)} line(s) over 14 words; the house style is one idea per line: {long[0]!r}")
    for lang in ("lang_en", "lang_hi"):
        body = script.get(lang) or ""
        if not body:
            problems.append(f"{lang} missing")
            continue
        if DASHES.search(body):
            problems.append(f"{lang} has an em/en dash")
        for rx, why in ((_OVERCLAIM, "overclaim"), (_NUMBER_ASSERT, "phone-number shape"),
                        (_TERRAIN_ASSERT, "terrain assertion")):
            m = rx.search(body)
            if m:
                problems.append(f"{lang} {why}: {m.group(0)!r}")
        allowed = set(script.get("allowed_numbers") or [])
        for n in re.findall(r"[\d][\d,]*", body):
            if n not in allowed:
                problems.append(f"{lang} speaks the number {n!r}, not declared in allowed_numbers")
    if not legacy:
        problems += _story(script)
    facts = script.get("facts") or []
    if not facts:
        problems.append("no facts declared; every script must name the data it stands on")
    for f in facts:
        why = _fact_ok(f, d)
        if why:
            problems.append("FACT: " + why)
    return problems


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if a != "--v1"]
    p = Path(args[0])
    probs = check(json.loads(p.read_text()), legacy="--v1" in sys.argv)
    if probs:
        print(f"[script_gate] REFUSED {p.name}:")
        for x in probs:
            print("  - " + x)
        raise SystemExit(1)
    print(f"[script_gate] PASS {p.name}")
