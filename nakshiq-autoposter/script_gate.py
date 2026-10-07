#!/usr/bin/env python3
"""script_gate.py — the automatic gate every reel script passes before a human sees it.

    python3 script_gate.py reel_scripts/<id>.json          # exit 0 = pass, 1 = refused
    python3 script_gate.py reel_scripts/<id>.json --fragments   # v1 line rules (old scripts)

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
FACTS = Path.home() / "Automation" / "nakshiq-veo" / "data" / "facts"   # scripts/reel-fact-pack.mjs, one JSON per slug
WORDS = (55, 80)            # v1 fragments: ~24-32 s at the Cs.V10 one-pass pace
MAX_LINES = 17        # founder picked 13-16-line scripts over 20-line ones 3/3 (2026-09-26)
# RHYTHM (BRIEF v3, founder 2026-10-01: "your scripts are like she said.. he said.. then I
# said go, there is no continuity"). The Kodaikanal EN track had 14 pauses in 26.5 s, 5.8 s
# of silence, one after almost every fragment. A line is now one spoken sentence.
FLOW_WORDS = (70, 105)        # ~3.6 words/s measured on Cs.V10, fewer pauses: 100 words ~ 30 s
FLOW_LINES = (7, 11)
FLOW_LINE_WORDS = (9, 24)   # every line but the sign-off
FLOW_SHORT_MAX = 0          # lines under 5 words, sign-off excluded
FLOW_JOINERS = re.compile(r"\b(and|but|so|because|which|until|when|then|while|that's when|which meant)\b", re.I)
FLOW_JOINED_MIN = 3         # at least this many lines carry a joining word
FRAGMENT_STACK = re.compile(r"\b\w+\.\s+\w+(\s\w+)?\.\s")   # "Same place. Same plan. Just" inside one line
DASHES = re.compile(r"[–—]")     # founder: no em/en dashes in anything public
# Founder 2026-10-07 (Coorg reel): viewers do not relate to scores, so a script never speaks
# one ("rated five", "scored five out of five", "3/5") and uses at most 3 numbers a person feels.
_RATING = re.compile(r"\b(rated|scored|scores|rating|out of (one|two|three|four|five|ten|\d+))\b|\b\d+\s*/\s*(5|10)\b"
                     r"|(रेटिंग|स्कोर|में से|अंक मिले|पाँच मिले|नंबर मिले)", re.I)
_NUMWORD = re.compile(r"\b(\d[\d,]*|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|"
                      r"fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|"
                      r"ninety|hundred|thousand|lakh)\b", re.I)
_RANGE = re.compile(r"\b(\w+)\s+(to|or|-)\s+(\w+)\b")
MAX_NUMBERS = 3


def _numbers_spoken(en: str) -> int:
    """English number words a listener hears, a range ("five to eight") counting once."""
    collapsed = _RANGE.sub(lambda m: m.group(1) if _NUMWORD.fullmatch(m.group(1)) and _NUMWORD.fullmatch(m.group(3)) else m.group(0), en)
    return len(_NUMWORD.findall(collapsed))
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


def _flow(script: dict) -> list[str]:
    """The v3 rhythm rules, English only (Hindi is parallel within 2 lines)."""
    out = []
    en = script.get("lang_en") or ""
    lines = [l.strip() for l in en.splitlines() if l.strip()]
    if not lines:
        return out
    words = len(en.split())
    if not FLOW_WORDS[0] <= words <= FLOW_WORDS[1]:
        out.append(f"English is {words} words; the flowing reel needs {FLOW_WORDS[0]}-{FLOW_WORDS[1]}")
    if not FLOW_LINES[0] <= len(lines) <= FLOW_LINES[1]:
        out.append(f"English has {len(lines)} lines; v3 wants {FLOW_LINES[0]}-{FLOW_LINES[1]} full sentences")
    body = lines[:-1]
    short = [l for l in body if len(l.split()) < 5]
    if len(short) > FLOW_SHORT_MAX:
        out.append(f"{len(short)} line(s) under 5 words (fragments): {short[0]!r}")
    for l in body:
        n = len(l.split())
        if n < FLOW_LINE_WORDS[0] and l not in short and "travel intelligence" not in l.lower():
            out.append(f"line of {n} words reads as a caption, not a sentence: {l!r}")
        if n > FLOW_LINE_WORDS[1]:
            out.append(f"line of {n} words is more than one breath: {l[:60]!r}")
        if FRAGMENT_STACK.search(l + " "):
            out.append(f"fragment stack inside a line: {l!r}")
    joined = sum(1 for l in body if FLOW_JOINERS.search(l))
    if joined < FLOW_JOINED_MIN:
        out.append(f"only {joined} line(s) carry a joining word (and/but/so/because/which/until/when); min {FLOW_JOINED_MIN}")
    return out


def _pack_fact_ok(f: dict, pack: dict) -> str | None:
    """Facts checked against the destination's fact pack (facts/<slug>.json)."""
    k = f.get("kind")
    def has(text, quote):
        return quote and _norm(quote) in _norm(text or "")
    if k == "persona":
        v = ((pack.get("destination") or {}).get("persona_blocks") or {}).get(f.get("key"))
        if v is None:
            return f"{pack['slug']}: no persona block {f.get('key')!r}"
        if not has(v, f.get("quote")):
            return f"{pack['slug']} persona {f['key']}: {f.get('quote')!r} is not in {v[:80]!r}"
        return None
    if k == "solo_female":
        d = pack.get("destination") or {}
        if "score" in f and d.get("solo_female_score") != f["score"]:
            return f"{pack['slug']} solo_female_score is {d.get('solo_female_score')}, script says {f['score']}"
        if f.get("quote") and not has(d.get("solo_female_note"), f["quote"]):
            return f"{pack['slug']} solo_female_note does not contain {f['quote']!r}"
        return None
    if k == "elevation":
        v = (pack.get("destination") or {}).get("elevation_m")
        if v != f.get("value"):
            return f"{pack['slug']} elevation is {v} m, script says {f.get('value')}"
        return None
    if k == "kids":
        kd = pack.get("kids") or {}
        v = kd.get(f.get("field"))
        if "value" in f and str(v) != str(f["value"]):
            return f"{pack['slug']} kids.{f['field']} is {v!r}, script says {f['value']!r}"
        if f.get("quote") and not has(str(v), f["quote"]):
            return f"{pack['slug']} kids.{f['field']} does not contain {f['quote']!r}"
        return None
    if k == "eatery":
        e = next((x for x in pack.get("eateries") or [] if _norm(x["name"]) == _norm(f.get("name", ""))), None)
        if not e:
            return f"{pack['slug']}: eatery {f.get('name')!r} is not in the pack"
        v = e.get(f.get("field"))
        if isinstance(v, list):
            v = ", ".join(map(str, v))
        if "value" in f and str(v) != str(f["value"]):
            return f"{f['name']}.{f['field']} is {v!r}, script says {f['value']!r}"
        if f.get("quote") and not has(str(v), f["quote"]):
            return f"{f['name']}.{f['field']} does not contain {f['quote']!r}"
        return None
    if k == "gem":
        g = next((x for x in pack.get("hidden_gems") or [] if _norm(x["name"]) == _norm(f.get("name", ""))), None)
        if not g:
            return f"{pack['slug']}: hidden gem {f.get('name')!r} is not in the pack"
        v = g.get(f.get("field"))
        if "value" in f and str(v) != str(f["value"]):
            return f"{f['name']}.{f['field']} is {v!r}, script says {f['value']!r}"
        if f.get("quote") and not has(str(v), f["quote"]):
            return f"{f['name']}.{f['field']} does not contain {f['quote']!r}"
        return None
    if k == "trap":
        rows = (pack.get("trap_swaps") or {}).get("as_trap", []) + (pack.get("trap_swaps") or {}).get("as_alternative", [])
        t = next((x for x in rows if x["trap_destination_id"] == f.get("trap") and x["alternative_destination_id"] == f.get("alt")), None)
        if not t:
            return f"no swap {f.get('trap')} -> {f.get('alt')} in the pack"
        if f.get("field") and not has(str(t.get(f["field"])), f.get("quote")):
            return f"swap {f['trap']}->{f['alt']}.{f['field']} does not contain {f.get('quote')!r}"
        return None
    if k == "pilgrimage":
        r = next((x for x in pack.get("pilgrimage") or [] if x["slug"] == f.get("route")), None)
        if not r:
            return f"no published pilgrimage route {f.get('route')!r} in the pack"
        v = r.get(f.get("field"))
        if isinstance(v, (list, dict)):
            v = json.dumps(v, ensure_ascii=False)
        if "value" in f and str(v) != str(f["value"]):
            return f"{f['route']}.{f['field']} is {str(v)[:60]!r}, script says {f['value']!r}"
        if f.get("quote") and not has(str(v), f["quote"]):
            return f"{f['route']}.{f['field']} does not contain {f['quote']!r}"
        return None
    if k == "month":
        m = next((x for x in pack.get("months") or [] if x["month"] == f.get("month")), None)
        if not m:
            return f"{pack['slug']}: no month {f.get('month')} in the pack"
        if "label" in f and m.get("verdict") != f["label"]:
            return f"{pack['slug']} month {f['month']} is {m.get('verdict')!r}, script says {f['label']!r}"
        if "score10" in f and (m.get("score") or 0) * 2 != f["score10"]:
            return f"{pack['slug']} month {f['month']} scores {(m.get('score') or 0) * 2}/10, script says {f['score10']}"
        return None
    if k == "crowd":
        c = (pack.get("destination") or {}).get("crowd_calendar") or {}
        peak = f.get("month") in (c.get("peak_months") or [])
        quiet = f.get("month") in (c.get("quiet_months") or [])
        want = f.get("is")
        if want == "level":
            v = (pack.get("destination") or {}).get("crowd_level")
            return None if v == f.get("value") else f"{pack['slug']} crowd_level is {v!r}, script says {f.get('value')!r}"
        if want == "note":
            return None if has(c.get("note"), f.get("quote")) else f"{pack['slug']} crowd note does not contain {f.get('quote')!r}"
        if (want == "peak" and not peak) or (want == "not_peak" and peak) or (want == "quiet" and not quiet):
            return f"{pack['slug']} month {f['month']}: peak={peak} quiet={quiet}, script says {want}"
        return None
    if k == "cost":
        c = ((pack.get("costs") or {}).get(f.get("season")) or {}).get(f.get("category") or f.get("field")) or {}
        v = c.get("typical_inr")
        if v != f.get("value"):
            return f"{pack['slug']} {f.get('season')} {f.get('category') or f.get('field')} is {v}, script says {f.get('value')}"
        return None
    return None   # not a pack fact; handled by _fact_ok


PACK_KINDS = {"persona", "solo_female", "elevation", "kids", "eatery", "gem", "trap", "pilgrimage"}


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


def check(script: dict, d: dict | None = None, legacy: bool = True, flow: bool = True) -> list[str]:
    """flow=True (default since BRIEF v3, 2026-10-01 evening) applies the rhythm rules: full
    sentences, 7-11 lines, joining words. `--fragments` restores the v1 line rules for the
    old scripts. legacy=False adds the BRIEF v2 story rules (`--v2`), opt-in since the
    founder's blind test picked v1 in 4 of 6 pairs.
    Facts of a kind in PACK_KINDS, and month/crowd/cost facts when the script names a
    slug with a fact pack, are checked against facts/<slug>.json; the rest against
    reel-data.json as before."""
    d = d or json.loads(DATA.read_text())
    problems = []
    en = script.get("lang_en") or ""
    words = len(en.split())
    lines = [l.strip() for l in en.splitlines() if l.strip()]
    if flow:
        problems += _flow(script)
    else:
        if not WORDS[0] <= words <= WORDS[1]:
            problems.append(f"English is {words} words; the reel needs {WORDS[0]}-{WORDS[1]}")
        if len(lines) > MAX_LINES:
            problems.append(f"English has {len(lines)} lines; max {MAX_LINES} (over-chopped scripts lost the blind test)")
        long = [l for l in lines if len(l.split()) > 14]
        if long:
            problems.append(f"{len(long)} line(s) over 14 words; the house style is one idea per line: {long[0]!r}")
    if not lines or lines[-1].rstrip(".") != "NakshIQ":
        problems.append('English must end on the line "NakshIQ."')
    if "travel intelligence" not in en.lower():
        problems.append('English must carry the "travel intelligence" line before the sign-off')
    hook = ((script.get("cover") or {}).get("hook") or "").strip()
    if flow and hook and lines and _norm(hook) != _norm(lines[0]):
        problems.append(f"cover.hook {hook!r} does not match line 1")
    if flow and len(script.get("shots") or []) != 6:
        problems.append(f"{len(script.get('shots') or [])} shots; the reel is cut from exactly 6")
    if "मैंने NakshIQ देखा" in (script.get("lang_hi") or "") and "checked NakshIQ" in en:
        pass  # allowed, but the critic flags a stock entry used at the same spot every time
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
        m = _RATING.search(body)
        if m:
            problems.append(f"{lang} speaks a score/rating {m.group(0)!r}: say what it means in words (founder 2026-10-07)")
        if lang == "lang_en" and _numbers_spoken(body) > MAX_NUMBERS:
            problems.append(f"lang_en speaks {_numbers_spoken(body)} numbers; keep it to {MAX_NUMBERS} a listener feels (founder 2026-10-07)")
        allowed = set(script.get("allowed_numbers") or [])
        for n in re.findall(r"[\d][\d,]*", body):
            if n not in allowed:
                problems.append(f"{lang} speaks the number {n!r}, not declared in allowed_numbers")
    if not legacy:
        problems += _story(script)
    facts = script.get("facts") or []
    if not facts:
        problems.append("no facts declared; every script must name the data it stands on")
    packs = {}
    for f in facts:
        slug = f.get("slug") or script.get("slug")
        pk = FACTS / f"{slug}.json"
        if (f.get("kind") in PACK_KINDS or (f.get("kind") in ("month", "crowd", "cost") and pk.exists())) and slug:
            if not pk.exists():
                problems.append(f"FACT: no fact pack for {slug!r} (run scripts/reel-fact-pack.mjs {slug})")
                continue
            packs.setdefault(slug, json.loads(pk.read_text()))
            why = _pack_fact_ok(f, packs[slug])
        else:
            why = _fact_ok(f, d)
        if why:
            problems.append("FACT: " + why)
    return problems


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if a not in ("--v1", "--v2", "--fragments")]
    p = Path(args[0])
    probs = check(json.loads(p.read_text()), legacy="--v2" not in sys.argv, flow="--fragments" not in sys.argv)
    if probs:
        print(f"[script_gate] REFUSED {p.name}:")
        for x in probs:
            print("  - " + x)
        raise SystemExit(1)
    print(f"[script_gate] PASS {p.name}")
