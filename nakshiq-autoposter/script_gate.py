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
DASHES = re.compile(r"[–—]")     # founder: no em/en dashes in anything public
DIGITS = re.compile(r"\d")


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


def check(script: dict, d: dict | None = None) -> list[str]:
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
    facts = script.get("facts") or []
    if not facts:
        problems.append("no facts declared; every script must name the data it stands on")
    for f in facts:
        why = _fact_ok(f, d)
        if why:
            problems.append("FACT: " + why)
    return problems


if __name__ == "__main__":
    p = Path(sys.argv[1])
    probs = check(json.loads(p.read_text()))
    if probs:
        print(f"[script_gate] REFUSED {p.name}:")
        for x in probs:
            print("  - " + x)
        raise SystemExit(1)
    print(f"[script_gate] PASS {p.name}")
