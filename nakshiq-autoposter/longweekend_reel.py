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
    python3 longweekend_reel.py cut dussehra-2026-recap  # part 3: what the news reported

Part 3 (an event with "reports", added 2026-10-21): one slide per place a newspaper or a
police advisory actually reported that weekend, with the outlet and date on screen and the
headline quoted in the caption. Places nobody reported are left out and named as such in the
caption; we never imply a jam we can't show. Pictures are part 1's swap photos.
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
    if ":" in hit and re.search(prefer, hit.split(":")[0], re.I):
        hit = hit.split(":")[0]                    # 'Packed on long weekends: on the ... weekend' -> the claim
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
                    "body": " · ".join(x for x in [f"{d['name'].split(' (')[0]}: {_sentence(cc.get('note'), 75)}",
                                                   f"{alt}: {how}" if how else G._cap(why)] if x),
                    "trap": d["id"], "alt": sw["alternative_destination_id"], "alt_name": alt,
                    "how": how, "why": why, "trap_note": _sentence(cc.get("note"), 90),
                    # a name another place shares (Mukteshwar in Odisha, Lansdowne in England) gets
                    # stricter queries from the event file; no match falls back to our own site photo
                    "photos": [tuple(q) for q in (ev.get("photo_queries") or {}).get(sw["alternative_destination_id"], [])] or
                              [(f"{alt} {w}", G._alias(alt) or alt) for w in ("valley", "hills", "lake", "view")] + [
                               (f"{alt} {_state(sw['alternative_destination_id'])}", G._alias(alt) or alt),
                               (alt, G._alias(alt) or alt)],
                    "prompt": ""})
    return out


def _swap(trap: str, alt: str) -> dict:
    pack = G.fact_pack(trap) or {}
    return next((x for x in (pack.get("trap_swaps") or {}).get("as_trap") or []
                 if x["alternative_destination_id"] == alt), {})


def recap_slides(ev: dict) -> list[dict]:
    src = photo_dir(_event(ev["recap_of"]))
    reps = ev["reports"]
    out = [{"kind": "hook", "eyebrow": f"{ev['title']} · {ev['dates']}".upper(),
            "title": "We said skip these. Here's what the news said.",
            "body": f"On {ev['said_on']} we flagged them. {len(reps)} made the news this weekend.",
            "photos": [tuple(q) for q in ev.get("hook_photos", [])],
            "src_photo": str(src / ev["hook_photo"]) if ev.get("hook_photo") else "",
            "endline": ev.get("endline", "Plan the next long weekend"), "prompt": ""}]
    for r in reps:
        sw, alt = _swap(r["trap"], r["alt"]), _name(r["alt"])
        how = ", ".join(x for x in [f"{sw['distance_km']} km" if sw.get("distance_km") else "",
                                    sw.get("drive_time") or ""] if x)
        out.append({"kind": "swap", "eyebrow": f"{_name(r['trap'])} · {r['outlet']}, {r['date']}".upper(),
                    "title": r["fact"],
                    "body": f"We said skip it on {ev['said_on']}. Next time: {alt}" + (f", {how}" if how else ""),
                    "trap": r["trap"], "alt": r["alt"], "alt_name": alt, "how": how,
                    "src_photo": str(src / r["photo"]), "photos": [], "prompt": ""})
    nx = ev.get("next")
    if nx:                                   # point at the next event only when its row exists
        n_ev = _event(nx)
        out.append({"kind": "swap", "eyebrow": "NEXT LONG WEEKEND",
                    "title": f"{n_ev['title']}, {n_ev['dates']}",
                    "body": f"Our skip-and-swap list goes up on {datetime.fromisoformat(n_ev['post_on']).strftime('%-d %b')}.",
                    "trap": "", "alt": "", "alt_name": "", "how": "",
                    "photos": [tuple(q) for q in ev.get("next_photos", [])], "prompt": ""})
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
        if s.get("src_photo") and Path(s["src_photo"]).exists():      # reuse an already-eyeballed picture
            sp = Path(s["src_photo"]); dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy(sp, dest)
            meta = json.loads(sp.with_suffix(".json").read_text()) if sp.with_suffix(".json").exists() else {}
            dest.with_suffix(".json").write_text(json.dumps({**meta, "file": str(dest)}))
            used.add(meta.get("title")); imgs.append((dest, "hero" if meta.get("site_hero") else "photo")); continue
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
    recap = bool(ev.get("reports"))
    sl = recap_slides(ev) if recap else slides(ev)
    imgs = fetch(ev, sl)
    keep = [(s, x) for s, x in zip(sl, imgs) if x]
    if not keep or keep[0][0]["kind"] != "hook" or len(keep) < (4 if recap else 5):
        print(f"[longweekend] {eid}: {len(keep)} slides with a picture of their own, not enough"); return False
    sl, imgs = [s for s, _ in keep], [x for _, x in keep]
    same = G.look_alike_images(imgs)
    out = G.OUTDIR / f"{eid}.mp4"
    total = G.render(eid, ev["month"], out, sl, imgs)
    cover = G.make_cover(out, imgs[0][0], "We said skip these.|*Did they jam?*" if recap
                         else f"{ev['title']}:|*{len(sl) - 1} places that jam*")
    held = ("HOLD_FOR_REVIEW file present" if G.HOLD.exists() else G.qa(out, total)
            or (f"slides look alike: {same}" if same else ""))
    led = G._led()
    now = datetime.now(timezone.utc).isoformat()
    for plat in G.PLATFORMS:
        led[f"{eid}__{plat}"] = {
            "storyboard": eid, "slug": eid, "format": "longweekend", "kind": "guide",
            "angle": "longweekend_recap" if recap else "longweekend",
            "month": ev["month"], "name": ev["title"], "lang": "en", "platform": plat,
            "status": "review" if held else "ready", "pipeline": "guide", "post_on": ev["post_on"],
            **({"held": held} if held else {}),
            "rendered_at": now, "file": str(out), "seconds": round(total, 1), "slides": len(sl), "cover": cover,
            "pairs": [{"trap": s["trap"], "alt": s["alt"], "alt_name": s["alt_name"], "how": s["how"]}
                      for s in sl if s["kind"] == "swap" and s.get("trap")],
            "sources": {k: sum(1 for _, x in imgs if x == k) for k in ("photo", "hero", "ai")}}
    G._save(led)
    print(f"[longweekend] cut {out.name}: {len(sl)} slides, {total:.1f}s, posts {ev['post_on']}"
          + (f", HELD: {held}" if held else ""))
    return True


def caption(row: dict) -> tuple[str, str]:
    ev = _event(row["slug"])
    if ev.get("reports"):
        return recap_caption(ev)
    lines = "\n".join(f"{i}. Skip {_name(p['trap'])}, go to {p['alt_name']}" + (f" ({p['how']})" if p.get("how") else "")
                      for i, p in enumerate(row.get("pairs") or [], 1))
    cr = credits(ev)
    import guide_reel as GR
    photo = GR.caption_credits(cr)     # one line, authors kept (founder 2026-10-07: the per-photo list looked bad)
    cap = (f"{ev['title']}, {ev['dates']}: {len(row.get('pairs') or [])} places that jam every long weekend, "
           f"and where to go instead.\n\n{lines}\n\n"
           f"Send this to whoever is driving.\n\n"
           f"Crowd levels come from NakshIQ's crowd calendar: what happens there every long weekend, "
           f"not a live count. Every swap has its own page at https://www.nakshiq.com"
           f"{photo}\n\n{ev.get('tags', '#longweekend #indiatravel #NakshIQ')}")
    return cap, f"{ev['title']}: skip these {len(row.get('pairs') or [])}, go here instead | NakshIQ"


def recap_caption(ev: dict) -> tuple[str, str]:
    import guide_reel as GR
    lines = []
    for i, r in enumerate(ev["reports"], 1):
        sw = _swap(r["trap"], r["alt"])
        how = ", ".join(x for x in [f"{sw['distance_km']} km" if sw.get("distance_km") else "", sw.get("drive_time") or ""] if x)
        en = f" ({r['headline_en']})" if r.get("headline_en") else ""
        lines.append(f"{i}. {_name(r['trap'])}: \"{r['headline']}\"{en}, {r['outlet']}, {r['date']}.\n"
                     f"Next time: {_name(r['alt'])}" + (f" ({how})" if how else ""))
    none = ev.get("no_reports") or []
    miss = (f"\n\nWe found no news reports for {', '.join(none[:-1])} or {none[-1]} this weekend, so they are not in this reel."
            if len(none) > 1 else "")
    cap = (f"{ev['title']}, {ev['dates']}. On {ev['said_on']} we said skip these. Here's what the news reported.\n\n"
           + "\n\n".join(lines) + miss +
           f"\n\nHeadlines are quoted from the outlets named. Our forecast came from NakshIQ's crowd calendar, "
           f"which shows what usually happens on a long weekend. Every swap has its own page at https://www.nakshiq.com"
           f"{GR.caption_credits(credits(ev))}\n\n{ev.get('tags', '#longweekend #indiatravel #NakshIQ')}")
    return cap, f"{ev['title']}: we said skip these. Here's what the news said | NakshIQ"


if __name__ == "__main__":
    a = sys.argv[1:]
    if a and a[0] == "slides":
        ev = _event(a[1])
        for i, s in enumerate(recap_slides(ev) if ev.get("reports") else slides(ev), 1):
            print(f"{i}. {s['eyebrow']} | {s['title']} | {s['body']}")
    elif a and a[0] == "cut":
        sys.exit(0 if cut(a[1]) else 1)
    else:
        print(__doc__)
