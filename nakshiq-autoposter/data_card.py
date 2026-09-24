#!/usr/bin/env python3
"""data_card.py — the "pick the month first" data reel, rendered with HyperFrames.

    python3 data_card.py --slug chail                 # render one
    python3 data_card.py --list                       # who can run today

WHY: scenario reels sell the experience; this one sells the DATA. Twelve real
month scores as an animated chart, the month to go, and what the same hotel
costs in and out of season. No voice, no Veo credits beyond three background
clips already on disk, 15 seconds. Built from the 2026-09-24 HyperFrames test
(~/Automation/hyperframes-tests/chail-reel), which is the design reference.

EVERY NUMBER ON SCREEN comes from reel-data.json (the Supabase snapshot the
scenario reels use). A destination that cannot fill a card honestly refuses:
no month scoring 8+ in the next three, no cost rows, or fewer than three
usable clips. The card is about the NEXT THREE MONTHS (see facts()).
"""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path

HERE = Path(__file__).resolve().parent
VEO = Path.home() / "Automation" / "nakshiq-veo"
DATA = VEO / "data" / "reel-data.json"
QUEUE = VEO / "veo_queue.json"
CLIPS = VEO / "clips"
WORK = VEO / "datacards"
PACK = Path.home() / "Automation" / "nakshiq-ig" / "data" / "verdicts.json"
TEMPLATE = HERE / "data_card" / "template.html"
PROJECT = HERE / "data_card"          # package.json + hyperframes.json, pinned HyperFrames
HF = "hyperframes@0.8.70"
DUR = 15.0

MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]
# Backgrounds behind a chart must be scenery, or at least not a crisis: an
# ambulance behind a price table reads as a different story.
SCENIC = ("wrong_month", "crowd_pullback", "two_places", "quiet_month")
NEUTRAL = ("real_cost", "how_hard", "which_two")
NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
                "Eight", "Nine", "Ten", "Eleven", "Twelve"]


class Refuse(Exception):
    pass


def _load(p: Path, default):
    try:
        return json.loads(p.read_text())
    except Exception:
        return default


def _name(slug: str) -> str:
    for r in _load(PACK, []):
        if r.get("id") == slug:
            return r.get("name") or slug
    return slug.replace("-", " ").title()


def _clips(slug: str) -> list[Path]:
    rows = [r for r in _load(QUEUE, []) if r.get("slug") == slug and r.get("status") == "live"]
    out = []
    for fmts in (SCENIC, NEUTRAL):
        for r in rows:
            p = CLIPS / r["clip"]
            if r.get("format") in fmts and p.exists() and p not in out:
                out.append(p)
    return out[:3]


def _inr(n: float) -> str:
    return "₹" + f"{int(round(n)):,}"


def facts(slug: str, d: dict | None = None, today: date | None = None) -> dict:
    """Everything the card says, derived and checked. Raises Refuse.

    Anchored on the NEXT THREE MONTHS, not the whole year (founder, 2026-09-24:
    a September reel saying "go in March" gives nobody a reason to care). The
    card answers "where can I go soon, and exactly when"; a place with no month
    scoring 8+ in that window refuses."""
    d = d or _load(DATA, {})
    today = today or date.today()
    m = d.get("months", {}).get(slug)
    if not m or len(m) < 12:
        raise Refuse("no 12-month scores")
    scores = [int(m[str(i)]["score"]) * 2 for i in range(1, 13)]
    labels = [m[str(i)]["label"] for i in range(1, 13)]
    window = [(today.month - 1 + k) % 12 for k in (1, 2, 3)]
    crowd = d.get("crowd", {}).get(slug) or {}
    quiet = set(crowd.get("quiet_months") or [])
    peak_m = set(crowd.get("peak_months") or [])
    best = max(window, key=lambda i: (scores[i], i + 1 in quiet, -window.index(i)))
    if scores[best] < 8:
        raise Refuse(f"nothing scores 8+ in {', '.join(MONTHS[i] for i in window)}")
    worst = min(window, key=lambda i: (scores[i], window.index(i)))
    costs = {c["season"]: c for c in (d.get("costs", {}).get(slug) or [])}
    lo, hi = (costs.get("low") or {}).get("hotel_mid"), (costs.get("peak") or {}).get("hotel_mid")
    if not lo or not hi or lo >= hi:
        raise Refuse("no low-vs-peak hotel price")
    clips = _clips(slug)
    if len(clips) < 3:
        raise Refuse(f"only {len(clips)} usable background clip(s)")

    B, W = MONTHS[best], MONTHS[worst]
    if scores[worst] <= 6 and worst != best:
        hook = f"{B} scores <em>{scores[best]} out of 10.</em> {W} scores <b>{scores[worst]}.</b>"
    else:
        tail = ("Every one of the next three months scores 10." if scores[worst] == 10
                else f"The next three months all score {scores[worst]} or more.")
        hook = f"{B} scores <em>{scores[best]} out of 10.</em> {tail}"
    fact_lines = [f"Scores <em>{scores[best]} out of 10</em>"]
    if best + 1 in quiet:
        fact_lines.append("And it is one of the <em>quiet months</em>")
    elif best + 1 in peak_m:
        fact_lines.append("Also a <em>peak crowd month</em>")
    if best + 1 in quiet:
        note = f"{B} is a quiet month here."
    elif best + 1 in peak_m:
        note = f"{B} is peak season. Book now, or wait for the low season."
    else:
        note = "Same town, peak season vs low."
    skips = [i for i, l in enumerate(labels) if l == "skip" and i in window]
    return {"slug": slug, "name": _name(slug), "scores": scores, "labels": labels,
            "skips": skips, "window": window, "best_i": best, "best": B, "hook": hook,
            "facts": fact_lines, "peak": _inr(hi), "low": _inr(lo), "note": note,
            "clips": clips, "snapshot": (d.get("generated_at") or "")[:10],
            "sub": f"NakshIQ score out of 10. {MONTHS[window[0]][:3]} to {MONTHS[window[-1]][:3]} highlighted.",
            "rank": (window.index(best), best + 1 not in quiet, -scores[best])}


def _html(f: dict, follow: str, music_name: str) -> str:
    n = len(f["name"])
    name_px = int(min(330, max(150, 900 / (0.42 * n))))
    # SKIP tag sits over the middle skip month, above its bar (bar area: 640px
    # tall, top at 330px inside the panel; columns 12 across 864px, 14px gaps).
    col = (864 - 11 * 14) / 12
    def tag(i, text, colour):
        center = 48 + i * (col + 14) + col / 2
        top = int(330 + 640 * (1 - f["scores"][i] / 10) - 110)
        return (f'<div class="tag" style="left:{int(center - 50)}px;top:{top}px;'
                f'color:var(--{colour})">{text}</div>')
    tags = [tag(f["best_i"], "GO", "accent")] + [tag(i, "SKIP", "skip") for i in f["skips"]]
    dim = [f"#bar{i}" for i in range(12) if i not in f["window"]]
    rep = {
        "{{CHART_TITLE}}": f["name"] + (", by month" if n > 12 else ", month by month"),
        "{{NAME}}": f["name"], "{{SNAPSHOT}}": f["snapshot"], "{{MUSIC}}": music_name,
        "{{NAME_PX}}": str(name_px), "{{LINE_TOP}}": str(int(300 + name_px * 0.9 + 43)),
        "{{HOOK}}": f["hook"], "{{TAGS}}": "".join(tags),
        "{{BEST}}": f["best"],
        # League Gothic runs ~0.40em a capital; the card is 920px wide inside.
        "{{MONTH_PX}}": str(int(min(360, 880 / (0.40 * len(f["best"]))))),
        "{{FACTS}}": "\n".join(f"          <div>{x}</div>" for x in f["facts"]),
        "{{PEAK}}": f["peak"], "{{LOW}}": f["low"], "{{NOTE}}": f["note"], "{{FOLLOW}}": follow,
        "{{SCORES}}": json.dumps(f["scores"]), "{{LABELS}}": json.dumps(f["labels"]),
        "{{DIM}}": json.dumps(dim), "{{PULSE}}": json.dumps([f"#bar{f['best_i']}"]),
        "{{SUB}}": f["sub"],
    }
    s = TEMPLATE.read_text()
    for k, v in rep.items():
        s = s.replace(k, v)
    if "{{" in s:
        raise Refuse("template placeholder left unfilled")
    return s


def render(slug: str, out: Path, follow: str = "follow @nakshiq") -> Path:
    f = facts(slug)
    sys.path.insert(0, str(HERE))
    import storyboard as SB
    music = SB.pick_music("real_cost", slug)          # the "useful" tone
    w = WORK / slug
    if w.exists():
        shutil.rmtree(w)
    (w / "assets").mkdir(parents=True)
    for fn in ("package.json", "hyperframes.json"):
        shutil.copy(PROJECT / fn, w / fn)
    for i, c in enumerate(f["clips"], 1):
        shutil.copy(c, w / "assets" / f"bg{i}.mp4")
    if music:
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(music), "-t", str(DUR),
                        "-af", f"afade=t=in:d=0.4,afade=t=out:st={DUR - 1.5}:d=1.5,loudnorm=I=-14:TP=-1.5:LRA=11",
                        "-c:a", "aac", "-b:a", "192k", str(w / "assets" / "music.m4a")], check=True)
    else:
        raise Refuse("no music bed on disk")
    (w / "index.html").write_text(_html(f, follow, music.stem))
    out.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(["npx", "--yes", HF, "render", str(w), "-o", str(out), "--quiet",
                        "--no-best-effort"], capture_output=True, text=True)
    if r.returncode != 0 or not out.exists():
        raise RuntimeError("hyperframes render failed: " + (r.stderr or r.stdout)[-600:])
    return out


def candidates() -> list[str]:
    d = _load(DATA, {})
    ok = []
    for slug in sorted(d.get("months", {})):
        try:
            ok.append((facts(slug, d)["rank"], slug))
        except Refuse:
            pass
    return [s for _, s in sorted(ok)]          # next month + quiet first


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug")
    ap.add_argument("--out")
    ap.add_argument("--follow", default="follow @nakshiq")
    ap.add_argument("--list", action="store_true")
    a = ap.parse_args()
    if a.list:
        print("\n".join(candidates()))
        raise SystemExit(0)
    try:
        p = render(a.slug, Path(a.out) if a.out else VEO / "reels" / f"{a.slug}__data_card__en.mp4",
                   a.follow)
    except Refuse as e:
        raise SystemExit(f"[data_card] {a.slug} refused: {e}")
    print(f"[data_card] wrote {p}")
