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
no skip month (the reel's whole point), no cost rows, or fewer than three
usable clips.
"""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
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


def facts(slug: str, d: dict | None = None) -> dict:
    """Everything the card says, derived and checked. Raises Refuse."""
    d = d or _load(DATA, {})
    m = d.get("months", {}).get(slug)
    if not m or len(m) < 12:
        raise Refuse("no 12-month scores")
    scores = [int(m[str(i)]["score"]) * 2 for i in range(1, 13)]
    labels = [m[str(i)]["label"] for i in range(1, 13)]
    skips = [i for i, l in enumerate(labels) if l == "skip"]
    if not skips:
        raise Refuse("no skip month: nothing to warn about")
    top = max(scores)
    crowd = d.get("crowd", {}).get(slug) or {}
    quiet = set(crowd.get("quiet_months") or [])
    peak_m = set(crowd.get("peak_months") or [])
    best_candidates = [i for i, s in enumerate(scores) if s == top]
    best = next((i for i in best_candidates if i + 1 in quiet), best_candidates[0])
    costs = {c["season"]: c for c in (d.get("costs", {}).get(slug) or [])}
    lo, hi = (costs.get("low") or {}).get("hotel_mid"), (costs.get("peak") or {}).get("hotel_mid")
    if not lo or not hi or lo >= hi:
        raise Refuse("no low-vs-peak hotel price")
    clips = _clips(slug)
    if len(clips) < 3:
        raise Refuse(f"only {len(clips)} usable background clip(s)")

    good = sum(1 for s in scores if s >= 8)
    low_score = min(scores)
    n_low = scores.count(low_score)
    hook = (f"{NUMBER_WORDS[good]} months here score 8 or more. "
            f"{NUMBER_WORDS[n_low]} score <b>{low_score} out of 10.</b>")
    fact_lines = [f"Scores <em>{top} out of 10</em>"]
    if best + 1 in quiet:
        fact_lines.append("And it is one of the <em>quiet months</em>")
    elif best + 1 in peak_m:
        fact_lines.append("Also a <em>peak crowd month</em>, so book early")
    ratio = lo / hi
    note = ("Same town. Less than half the price." if ratio <= 0.5
            else f"Same town. {round((1 - ratio) * 100)}% less.")
    return {"slug": slug, "name": _name(slug), "scores": scores, "labels": labels,
            "skips": skips, "best": MONTHS[best], "hook": hook, "facts": fact_lines,
            "peak": _inr(hi), "low": _inr(lo), "note": note, "clips": clips,
            "snapshot": (d.get("generated_at") or "")[:10]}


def _html(f: dict, follow: str, music_name: str) -> str:
    n = len(f["name"])
    name_px = int(min(330, max(150, 900 / (0.42 * n))))
    # SKIP tag sits over the middle skip month, above its bar (bar area: 640px
    # tall, top at 330px inside the panel; columns 12 across 864px, 14px gaps).
    col = (864 - 11 * 14) / 12
    runs, cur = [], []                     # one SKIP tag per run of skip months
    for i in f["skips"]:
        if cur and i != cur[-1] + 1:
            runs.append(cur); cur = []
        cur.append(i)
    runs.append(cur)
    tags = []
    for run in runs:
        center = 48 + (run[0] + run[-1]) / 2 * (col + 14) + col / 2
        top = int(330 + 640 * (1 - max(f["scores"][i] for i in run) / 10) - 110)
        tags.append(f'<div class="tag" style="left:{int(center - 50)}px;top:{top}px">SKIP</div>')
    dim = [f"#bar{i}" for i in range(12) if i not in f["skips"]]
    rep = {
        "{{CHART_TITLE}}": f["name"] + (", by month" if n > 12 else ", month by month"),
        "{{NAME}}": f["name"], "{{SNAPSHOT}}": f["snapshot"], "{{MUSIC}}": music_name,
        "{{NAME_PX}}": str(name_px), "{{LINE_TOP}}": str(int(300 + name_px * 0.9 + 43)),
        "{{HOOK}}": f["hook"], "{{TAGS}}": "".join(tags),
        "{{BEST}}": f["best"],
        "{{FACTS}}": "\n".join(f"          <div>{x}</div>" for x in f["facts"]),
        "{{PEAK}}": f["peak"], "{{LOW}}": f["low"], "{{NOTE}}": f["note"], "{{FOLLOW}}": follow,
        "{{SCORES}}": json.dumps(f["scores"]), "{{LABELS}}": json.dumps(f["labels"]),
        "{{DIM}}": json.dumps(dim), "{{SKIPS}}": json.dumps([f"#bar{i}" for i in f["skips"]]),
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
            facts(slug, d)
            ok.append(slug)
        except Refuse:
            pass
    return ok


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
