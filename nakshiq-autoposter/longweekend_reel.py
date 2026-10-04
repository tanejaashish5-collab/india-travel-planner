"""Long-weekend crowd forecast reel ("part 1 of 3": before, during, after).

Founder 2026-10-05, after an @theinformly jam reel: "this is what's going to happen if
you go on the long weekend ... avoid these places and go to the places that we tell you
to. That's why NakshIQ is important."

Each slide is one packed place and its quieter swap, both from our own data: the
destination's crowd_calendar note says WHY it jams, the tourist_trap_alternatives row
gives the swap with its distance and drive time. Pictures are real October photos of the
swap (Wikimedia Commons, month-matched) via guide_reel. The forecast is a seasonal
pattern, never a live count, and the caption says so.

    python3 longweekend_reel.py slides dussehra-2026
    python3 longweekend_reel.py cut dussehra-2026      # render + ledger rows (post_on gated)
"""
from __future__ import annotations

import json
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import guide_reel as G  # noqa: E402

EVENTS = HERE / "longweekends.json"


def _event(eid: str) -> dict:
    ev = json.loads(EVENTS.read_text())[eid]
    ev["id"] = eid
    return ev


def _sentence(s: str, n: int = 70, prefer: str = r"long weekend|weekend|holiday") -> str:
    """The clause of a note that says the thing we need, e.g. the weekend line of a crowd
    note ('Weekends crowded with Bangalore traffic'), else its first sentence."""
    parts = [x.strip().rstrip(".") for x in re.split(r"(?<=[.!])\s+|\s[—–]\s", G._clean(s or "")) if x.strip()]
    hit = next((x for x in parts if re.search(prefer, x, re.I)), parts[0] if parts else "")
    return G._short(hit, n)


def _state(slug: str) -> str:
    pack = G.fact_pack(slug)
    return ((pack or {}).get("destination", {}).get("state_id") or "").replace("-", " ").title()


def _name(slug: str) -> str:
    pack = G.fact_pack(slug)
    return ((pack or {}).get("destination", {}).get("name") or slug.replace("-", " ").title()).split(" (")[0]


def slides(ev: dict) -> list[dict]:
    out = []
    pairs = []
    for trap, alt in ev["pairs"]:
        pack = G.fact_pack(trap)
        if not pack:
            print(f"[longweekend] {trap}: no fact pack, skipped"); continue
        d = pack["destination"]
        cc = d.get("crowd_calendar") or {}
        if ev["month"] not in (cc.get("peak_months") or []) and not cc.get("avoid_weekends"):
            print(f"[longweekend] {trap}: our data does not mark it busy then, skipped"); continue
        sw = next((s for s in (pack.get("trap_swaps") or {}).get("as_trap") or []
                   if s["alternative_destination_id"] == alt), None)
        if not sw:
            print(f"[longweekend] {trap} -> {alt}: no swap row, skipped"); continue
        pairs.append((d, cc, sw))
    n = len(pairs)
    out.append({"kind": "hook", "eyebrow": f"{ev['title']} · {ev['dates']}".upper(),
                "title": f"{n} places that jam every long weekend. Where to go instead.",
                "body": "From NakshIQ's crowd calendar: what happens there every long weekend.",
                "photos": [tuple(q) for q in ev.get("hook_photos", [])],
                "endline": ev.get("endline", "Plan the long weekend"), "prompt": ""})
    for d, cc, sw in pairs:
        alt = _name(sw["alternative_destination_id"])
        how = ", ".join(x for x in [f"{sw['distance_km']} km" if sw.get("distance_km") else "",
                                    sw.get("drive_time") or ""] if x)
        why = _sentence(sw.get("why_better") or "", 200, prefer=re.escape(alt))
        why = re.split(r",\s|\s(?:with|but|and|minus)\s", why)[0] if len(why) > 70 else why   # a whole clause, never a cut word
        out.append({"kind": "swap", "eyebrow": f"Skip {d['name'].split(' (')[0]}".upper(),
                    "title": f"{alt} instead",
                    "body": " · ".join(x for x in [f"{d['name'].split(' (')[0]}: {_sentence(cc.get('note'), 60)}",
                                                   f"{alt}: {how}" if how else G._cap(why)] if x),
                    "trap": d["id"], "alt": sw["alternative_destination_id"], "alt_name": alt,
                    "how": how, "why": why, "trap_note": _sentence(cc.get("note"), 90),
                    "photos": [(f"{alt} {w}", G._alias(alt) or alt) for w in ("valley", "hills", "lake", "view")] + [
                               (f"{alt} {_state(sw['alternative_destination_id'])}", G._alias(alt) or alt),
                               (alt, G._alias(alt) or alt)],
                    "prompt": ""})
    return out


def photo_dir(ev: dict) -> Path:
    return G.PHOTOS / ev["id"]


def fetch(ev: dict, sl: list[dict]) -> list[tuple[Path, str] | None]:
    used, imgs = set(), []
    for i, s in enumerate(sl, 1):
        dest = photo_dir(ev) / f"g{i:02d}.jpg"
        if dest.exists():
            meta = json.loads(dest.with_suffix(".json").read_text()) if dest.with_suffix(".json").exists() else {}
            used.add(meta.get("title")); imgs.append((dest, "hero" if meta.get("site_hero") else "photo")); continue
        got = None
        for q, must in s.get("photos") or []:
            # the opener shows what a jam looks like; any season without snow will do
            if G.commons_photo(q, must, dest, used, ev["month"], max_gap=4 if s["kind"] == "hook" else 1):
                got = (dest, "photo"); break
        if not got and s["kind"] == "swap" and G.hero(s["alt"]):
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy(G.hero(s["alt"]), dest)
            dest.with_suffix(".json").write_text(json.dumps({"file": str(dest), "site_hero": s["alt"]}))
            got = (dest, "hero")
        imgs.append(got)
    return imgs


def credits(ev: dict) -> list[dict]:
    d = photo_dir(ev)
    return [m for m in (json.loads(p.read_text()) for p in sorted(d.glob("g*.json"))) if m.get("title")] if d.exists() else []


def cut(eid: str) -> bool:
    ev = _event(eid)
    sl = slides(ev)
    imgs = fetch(ev, sl)
    keep = [(s, x) for s, x in zip(sl, imgs) if x]
    if not keep or keep[0][0]["kind"] != "hook" or len(keep) < 5:
        print(f"[longweekend] {eid}: {len(keep)} slides with a picture of their own, not enough"); return False
    sl, imgs = [s for s, _ in keep], [x for _, x in keep]
    same = G.look_alike_images(imgs)
    out = G.OUTDIR / f"{eid}.mp4"
    total = G.render(eid, ev["month"], out, sl, imgs)
    held = ("HOLD_FOR_REVIEW file present" if G.HOLD.exists() else G.qa(out, total)
            or (f"slides look alike: {same}" if same else ""))
    led = G._led()
    now = datetime.now(timezone.utc).isoformat()
    for plat in G.PLATFORMS:
        led[f"{eid}__{plat}"] = {
            "storyboard": eid, "slug": eid, "format": "longweekend", "kind": "guide", "angle": "longweekend",
            "month": ev["month"], "name": ev["title"], "lang": "en", "platform": plat,
            "status": "review" if held else "ready", "pipeline": "guide", "post_on": ev["post_on"],
            **({"held": held} if held else {}),
            "rendered_at": now, "file": str(out), "seconds": round(total, 1), "slides": len(sl),
            "pairs": [{"trap": s["trap"], "alt": s["alt"], "alt_name": s["alt_name"], "how": s["how"]}
                      for s in sl if s["kind"] == "swap"],
            "sources": {k: sum(1 for _, x in imgs if x == k) for k in ("photo", "hero", "ai")}}
    G._save(led)
    print(f"[longweekend] cut {out.name}: {len(sl)} slides, {total:.1f}s, posts {ev['post_on']}"
          + (f", HELD: {held}" if held else ""))
    return True


def caption(row: dict) -> tuple[str, str]:
    ev = _event(row["slug"])
    lines = "\n".join(f"{i}. Skip {_name(p['trap'])}, go to {p['alt_name']}" + (f" ({p['how']})" if p.get("how") else "")
                      for i, p in enumerate(row.get("pairs") or [], 1))
    cr = credits(ev)
    photo = "".join(f"\nPhoto: {c['title'].rsplit('.', 1)[0]}, {c['author']}, {c['licence']}, Wikimedia Commons" for c in cr)
    if any(c.get("share_alike") for c in cr):
        photo += "\nThis reel is shared under CC BY-SA 4.0, as its share-alike photos require."
    cap = (f"{ev['title']}, {ev['dates']}: {len(row.get('pairs') or [])} places that jam every long weekend, "
           f"and where to go instead.\n\n{lines}\n\n"
           f"Send this to whoever is driving.\n\n"
           f"Crowd levels come from NakshIQ's crowd calendar: what happens there every long weekend, "
           f"not a live count. Every swap has its own page at https://www.nakshiq.com"
           f"{photo}\n\n{ev.get('tags', '#longweekend #indiatravel #NakshIQ')}")
    return cap, f"{ev['title']}: skip these {len(row.get('pairs') or [])}, go here instead | NakshIQ"


if __name__ == "__main__":
    a = sys.argv[1:]
    if a and a[0] == "slides":
        for i, s in enumerate(slides(_event(a[1])), 1):
            print(f"{i}. {s['eyebrow']} | {s['title']} | {s['body']}")
    elif a and a[0] == "cut":
        sys.exit(0 if cut(a[1]) else 1)
    else:
        print(__doc__)
