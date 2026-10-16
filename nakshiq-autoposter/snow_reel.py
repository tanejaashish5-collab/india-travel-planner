#!/usr/bin/env python3
"""
snow_reel.py — the "barf aa rahi hai" reel: snow LIKELY at named places and
passes in the next few days, the moment the snow outlook first calls it.

Why: the 15 Oct 2026 Sissu snow was forecast 3 days out (IMD on 12 Oct, five of
six global models), and a forward warning is the most forwardable thing we can
make: people send it to whoever is driving up. It reads ONLY the fact pack that
scripts/snow-outlook.mjs writes for NEW "likely" outlooks
(data/snow_alerts/<date>.json), so every on-screen number is a stored number.

    python3 snow_reel.py                    # render latest pack, hold for review
    python3 snow_reel.py --pack data/snow_alerts/2026-10-16.json
    python3 snow_reel.py --publish          # render + publish (needs the gate below)
    python3 snow_reel.py --dry-run          # print caption, no render

Honesty gates, in code:
  * pack older than 24 h, or every window already over -> refuse (a stale forecast is wrong)
  * at publish time each place must STILL be "likely" in the latest run in
    snow_outlooks; places that dropped are cut, none left -> refuse
  * "likely", never "will"; IMD quoted only verbatim from the pack
  * a pass has no footage of its own, so it gets a solid data card, never
    footage of a different place
  * publishing is OFF unless NAKSHIQ_SNOW_REEL_ENABLED=1 (nakshiq-autoposter/.env.local):
    the first reels of a new format are held for the founder's review
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import tempfile
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from yt_shorts_gen import (  # noqa: E402
    _dt, _hex, _pick_background, _render_segment_auto, _pick_music, _fetch_destinations,
    FONT_INSTRUMENT, FONT_CRIMSON, FONT_JETBRAINS,
    VERMILLION_BRIGHT, BONE, SAFFRON, SAGE,
)

PACK_DIR = HERE / "data" / "snow_alerts"
OUT_DIR = HERE / "data" / "snow_reels"
# One line per place+window ever posted. Review 2026-10-16: three runs a day could
# each re-post the same call; this ledger makes a repeat impossible.
POSTED = OUT_DIR / "posted.jsonl"
MAX_ENTRIES = 3
HOOK_DUR = 4.5
ENTRY_DUR = 9.0
CTA_DUR = 5.0
ICE = "0x7DD3FC"
INK = "0x0B1220"


def _log(m: str) -> None:
    print(f"[snow-reel] {m}", flush=True)


def _ff() -> str:
    import shutil
    return shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"


def _ist_today() -> str:
    return (datetime.now(timezone.utc) + timedelta(hours=5, minutes=30)).date().isoformat()


def load_pack(path: Path | None) -> tuple[dict | None, Path | None]:
    if path is None:
        packs = sorted(PACK_DIR.glob("*.json"))
        if not packs:
            return None, None
        path = packs[-1]
    return json.loads(path.read_text()), path


def check_pack(pack: dict) -> list[dict]:
    """Drop what is stale or not 'likely'. Returns the alerts still fit to show."""
    gen = datetime.fromisoformat(pack["generated_at"].replace("Z", "+00:00"))
    age_h = (datetime.now(timezone.utc) - gen).total_seconds() / 3600
    if age_h > 24:
        _log(f"pack is {age_h:.0f} h old — refusing (a stale forecast is a wrong forecast)")
        return []
    today = _ist_today()
    keep = [a for a in pack.get("alerts", []) if a.get("confidence") == "likely" and a.get("window_end", "") >= today]
    return keep[:MAX_ENTRIES]


def _posted_keys() -> set[str]:
    if not POSTED.exists():
        return set()
    keys = set()
    for ln in POSTED.read_text().splitlines():
        try:
            r = json.loads(ln)
            keys.add(f"{r['point_id']}|{r['window_start']}|{r['window_end']}")
        except Exception:
            continue
    return keys


def _overlaps_posted(a: dict, keys: set[str]) -> bool:
    """Same place, overlapping window = the same snowfall: never post it twice."""
    for k in keys:
        pid, ws, we = k.split("|")
        if pid == a["point_id"] and not (a["window_end"] < ws or a["window_start"] > we):
            return True
    return False


def _record_posted(alerts: list[dict], post_ids: list[str]) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with POSTED.open("a") as f:
        for a in alerts:
            f.write(json.dumps({"point_id": a["point_id"], "window_start": a["window_start"], "window_end": a["window_end"],
                                "posted_at": datetime.now(timezone.utc).isoformat(), "post_ids": post_ids}) + "\n")


def still_likely(alerts: list[dict]) -> list[dict]:
    """Publish-time re-check against the latest run in snow_outlooks."""
    import requests
    url = (os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or "").strip()
    key = (os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") or os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or "").strip()
    if not url or not key:
        _log("Supabase env missing — cannot re-check, refusing to publish")
        return []
    h = {"apikey": key, "Authorization": f"Bearer {key}"}
    latest = requests.get(f"{url}/rest/v1/snow_outlooks", params={"select": "run_date", "order": "run_date.desc", "limit": "1"}, headers=h, timeout=20).json()
    if not latest:
        return []
    run_date = latest[0]["run_date"]
    ids = ",".join(a["point_id"] for a in alerts)
    rows = requests.get(f"{url}/rest/v1/snow_outlooks", params={
        "select": "point_id,confidence,window_end", "run_date": f"eq.{run_date}", "point_id": f"in.({ids})"}, headers=h, timeout=20).json()
    ok = {r["point_id"] for r in rows if r.get("confidence") == "likely" and r.get("window_end", "") >= _ist_today()}
    dropped = [a["name"] for a in alerts if a["point_id"] not in ok]
    if dropped:
        _log(f"no longer 'likely' in the {run_date} run, cut: {', '.join(dropped)}")
    return [a for a in alerts if a["point_id"] in ok]


def _wrap(text: str, width: int, max_lines: int = 3) -> list[str]:
    words, lines, cur = (text or "").split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 <= width:
            cur = f"{cur} {w}".strip()
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines[:max_lines]


def _amount(a: dict) -> str | None:
    lo, hi = a.get("snow_cm_low"), a.get("snow_cm_high")
    if lo is None or hi is None:
        return None
    if hi < 1:
        return "a dusting"
    return f"~{lo} cm" if lo == hi else f"~{lo}-{hi} cm"


def build(alerts: list[dict], out_path: Path) -> dict | None:
    if not alerts:
        return None
    dests = {d.get("id"): d for d in _fetch_destinations()}
    V, B, S, SG = _hex(VERMILLION_BRIGHT), _hex(BONE), _hex(SAFFRON), _hex(SAGE)

    def bg_for(a: dict):
        # Only a destination's OWN footage. A pass gets the solid card.
        if a.get("kind") != "destination":
            return None, False
        d = dests.get(a["point_id"])
        if not d:
            return None, False
        return _pick_background(d, [d.get("name") or "", d.get("state") or ""])

    with tempfile.TemporaryDirectory(prefix="nq_snow_") as td:
        tdp = Path(td)
        segs: list[Path] = []
        first_bg, first_img = bg_for(alerts[0])
        windows = sorted({a["window_text"] for a in alerts})
        # Say only what is true for EVERY place on screen (review 2026-10-16).
        n_models = min(a["models_total"] for a in alerts)
        imd_all = all(a.get("imd_citable") for a in alerts)
        proof = f"{n_models} weather models" + (" + IMD" if imd_all else "") + ", checked"
        hook = [
            _dt("SNOW LIKELY", FONT_INSTRUMENT, 76, ICE, "(w-text_w)/2", "h*0.25", bw=5),
            _dt(windows[0].upper() if len(windows) == 1 else "NEXT FEW DAYS", FONT_JETBRAINS, 40, B, "(w-text_w)/2", "h*0.35", "gte(t,0.4)", 4),
            _dt(f"{len(alerts)} place{'s' if len(alerts) > 1 else ''} to know before you drive up", FONT_CRIMSON, 32, B, "(w-text_w)/2", "h*0.45", "gte(t,0.9)"),
            _dt(proof, FONT_CRIMSON, 26, SG, "(w-text_w)/2", "h*0.53", "gte(t,1.5)"),
        ]
        p = _render_segment_auto(first_bg, first_img, HOOK_DUR, hook, tdp / "seg_00.mp4", solid_color=INK)
        if p:
            segs.append(p)

        for i, a in enumerate(alerts):
            bg, is_img = bg_for(a)
            t = [_dt("LIKELY", FONT_JETBRAINS, 60, ICE, "(w-text_w)/2", "h*0.18", bw=5)]
            y = 0.28
            for ln in _wrap(a["name"].upper(), 18, 2):
                t.append(_dt(ln, FONT_INSTRUMENT, 58, B, "(w-text_w)/2", f"h*{y:.2f}", "gte(t,0.3)", 4))
                y += 0.07
            t.append(_dt(f"{a['elevation_m']:,} m · {a['window_text']}", FONT_JETBRAINS, 30, S, "(w-text_w)/2", f"h*{y + 0.01:.2f}", "gte(t,0.6)", 3))
            y += 0.075
            line = f"{a['models_agree']} of {a['models_total']} forecast models agree"
            amt = _amount(a)
            t.append(_dt(line, FONT_CRIMSON, 32, B, "(w-text_w)/2", f"h*{y:.2f}", "gte(t,1.0)"))
            y += 0.055
            if amt:
                t.append(_dt(f"{amt} of fresh snow (rough estimate)", FONT_CRIMSON, 28, B, "(w-text_w)/2", f"h*{y:.2f}", "gte(t,1.3)"))
                y += 0.055
            imd = a.get("imd") or {}
            if a.get("imd_citable") and imd.get("status") == "agrees":
                t.append(_dt(f"{imd.get('centre')} also forecasts snow ({imd.get('issued')})", FONT_CRIMSON, 26, SG, "(w-text_w)/2", f"h*{y + 0.02:.2f}", "gte(t,1.7)"))
                y += 0.05
            if a.get("road"):
                for ln in _wrap(f"Road: {a['road']}", 34, 2):
                    t.append(_dt(ln, FONT_CRIMSON, 26, SG, "(w-text_w)/2", f"h*{y + 0.03:.2f}", "gte(t,2.0)"))
                    y += 0.045
            p = _render_segment_auto(bg, is_img, ENTRY_DUR, t, tdp / f"seg_{i + 1:02d}.mp4",
                                     zoom_dir="in" if i % 2 == 0 else "out", solid_color=INK)
            if p:
                segs.append(p)

        cta = [
            _dt("A FORECAST, NOT A REPORT", FONT_INSTRUMENT, 40, B, "(w-text_w)/2", "h*0.27"),
            _dt("we check afterwards and say if it fell", FONT_CRIMSON, 30, SG, "(w-text_w)/2", "h*0.34", "gte(t,0.4)"),
            _dt("nakshiq.com/road-conditions", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.44", "gte(t,0.8)"),
            _dt("SEND THIS TO", FONT_INSTRUMENT, 34, B, "(w-text_w)/2", "h*0.54", "gte(t,1.2)"),
            _dt("whoever is driving up", FONT_CRIMSON, 34, V, "(w-text_w)/2", "h*0.61", "gte(t,1.5)"),
        ]
        p = _render_segment_auto(first_bg, first_img, CTA_DUR, cta, tdp / "seg_99.mp4", solid_color=INK)
        if p:
            segs.append(p)
        if len(segs) < 3:
            _log(f"only {len(segs)} segments rendered — refusing")
            return None

        concat = tdp / "concat.txt"
        concat.write_text("\n".join(f"file '{s}'" for s in segs))
        silent = tdp / "silent.mp4"
        r = subprocess.run([_ff(), "-y", "-f", "concat", "-safe", "0", "-i", str(concat), "-c", "copy", "-an", str(silent)], capture_output=True, text=True)
        if r.returncode != 0:
            _log(f"concat failed: {r.stderr[-400:]}")
            return None
        total = HOOK_DUR + len(alerts) * ENTRY_DUR + CTA_DUR
        music = _pick_music({})
        out_path.parent.mkdir(parents=True, exist_ok=True)
        if music and Path(music).exists():
            fc = (f"[1:a]aloop=loop=-1:size=2e9,atrim=0:{total},afade=t=in:st=0:d=0.8,"
                  f"afade=t=out:st={max(0.1, total - 1.8):.2f}:d=1.8,volume=0.45[a]")
            cmd = [_ff(), "-y", "-i", str(silent), "-i", str(music), "-filter_complex", fc, "-map", "0:v", "-map", "[a]",
                   "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-t", f"{total}", str(out_path)]
        else:
            cmd = [_ff(), "-y", "-i", str(silent), "-c", "copy", str(out_path)]
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            _log(f"mux failed: {r.stderr[-400:]}")
            return None
    _log(f"rendered {out_path} · {total:.1f}s")
    return {"video_path": str(out_path), "duration": total, "alerts": alerts}


def caption(alerts: list[dict]) -> str:
    lines = []
    for a in alerts:
        amt = _amount(a)
        bits = [f"· {a['name']} ({a['elevation_m']:,} m), {a['window_text']}: {a['models_agree']} of {a['models_total']} forecast models show snow"]
        if amt:
            bits.append(f", {amt} (rough)")
        imd = a.get("imd") or {}
        if a.get("imd_citable") and imd.get("status") == "agrees" and imd.get("quote"):
            bits.append(f". {imd['centre']}, {imd['issued']}: \"{imd['quote']}\"")
        lines.append("".join(bits) + ".")
    return (
        "Snow is likely in the hills over the next few days.\n\n"
        + "\n".join(lines)
        + "\n\nThis is a forecast, not a report. We call snow likely only when at least two-thirds of the global weather models "
          "that answered (from ECMWF, NOAA, DWD, Canada, UK Met Office and Météo-France) show it at the place's own altitude. "
          "Where IMD's bulletin names the district and the dates, we quote it word for word. "
          "After the dates pass we check whether it actually fell, and publish the tally.\n\n"
          "Live outlook and road log: nakshiq.com/road-conditions\n\n"
          "Send this to whoever is driving up.\n\n"
          "#snowfall #himachal #roadtrip #NakshIQ"
    )


# Accuracy gate (founder 2026-10-16: "need to make sure it is accurate, prediction as per
# the sources"). The env flag alone is not enough: the outlook must first have a checked
# record, and every place in the reel must have IMD agreeing as well as the models.
MIN_RESOLVED = 5        # past "likely" calls scored against dated reports / IMD measurements
MIN_CONFIRMED = 0.60    # share of those that a source confirmed


def track_record() -> tuple[int, int]:
    """(resolved, confirmed) over distinct snowfalls: a place's calls with overlapping or
    touching windows count once, judged by the latest run (same rule as the website)."""
    import requests
    url = (os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or "").strip()
    key = (os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") or os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or "").strip()
    rows = requests.get(f"{url}/rest/v1/snow_outlooks", params={
        "select": "run_date,point_id,window_start,window_end,outcome", "confidence": "eq.likely", "limit": "5000"},
        headers={"apikey": key, "Authorization": f"Bearer {key}"}, timeout=20).json()
    by_point: dict[str, list] = {}
    for r in rows:
        by_point.setdefault(r["point_id"], []).append(r)
    outcomes = []
    for lst in by_point.values():
        lst.sort(key=lambda r: (r["window_start"], r["run_date"]))
        latest, end = None, ""
        for r in lst:
            nxt = (date.fromisoformat(end) + timedelta(days=1)).isoformat() if end else ""
            if latest and r["window_start"] <= nxt:
                end = max(end, r["window_end"])
                if r["run_date"] >= latest["run_date"]:
                    latest = r
                continue
            if latest:
                outcomes.append(latest["outcome"])
            latest, end = r, r["window_end"]
        if latest:
            outcomes.append(latest["outcome"])
    resolved = sum(1 for o in outcomes if o in ("confirmed", "unconfirmed"))
    return resolved, sum(1 for o in outcomes if o == "confirmed")


def accuracy_gate(alerts: list[dict]) -> bool:
    no_imd = [a["name"] for a in alerts if not a.get("imd_citable")]
    if no_imd:
        _log(f"ACCURACY GATE: IMD does not agree for {', '.join(no_imd)} (district + dates) — not posting")
        return False
    try:
        resolved, confirmed = track_record()
    except Exception as e:
        _log(f"ACCURACY GATE: could not read the track record ({e}) — not posting")
        return False
    rate = confirmed / resolved if resolved else 0.0
    if resolved < MIN_RESOLVED or rate < MIN_CONFIRMED:
        _log(f"ACCURACY GATE: track record {confirmed}/{resolved} confirmed; needs >= {MIN_RESOLVED} checked calls "
             f"and >= {MIN_CONFIRMED:.0%} confirmed — not posting")
        return False
    _log(f"accuracy gate passed: {confirmed}/{resolved} confirmed ({rate:.0%}), IMD agrees for every place")
    return True


def _publish_enabled() -> bool:
    if os.environ.get("NAKSHIQ_SNOW_REEL_ENABLED", "0") == "1":
        return True
    _log("PUBLISH DISABLED — rendered and held for review. Set NAKSHIQ_SNOW_REEL_ENABLED=1 in nakshiq-autoposter/.env.local to go live.")
    return False


def publish(meta: dict) -> bool:
    import autoposter as ap
    keys = _posted_keys()
    if any(_overlaps_posted(a, keys) for a in meta["alerts"]):
        _log("a place in this reel was already posted for an overlapping window — not posting again")
        return False
    alerts = still_likely(meta["alerts"])
    if not alerts:
        _log("nothing still 'likely' at publish time — not posting")
        return False
    if len(alerts) != len(meta["alerts"]):
        _log("the set changed since render; re-render before posting")
        return False
    cap = caption(alerts)
    names = ", ".join(a["name"] for a in alerts[:2])
    yt_title = f"Snow likely: {names} | road check"[:95]
    media = ap.upload_media_bytes(Path(meta["video_path"]).read_bytes(), Path(meta["video_path"]).name, content_type="video/mp4")
    if not media:
        _log("media upload failed")
        return False
    ok = False
    post_ids: list[str] = []
    for acct in [a for a in ap.get_connected_accounts() if a.get("network") in ("instagram", "youtube")]:
        res = ap.publish_reel(cap, acct, media, dry_run=False, yt_title=yt_title)
        if res:
            ok = True
            post_ids.append(str(res.get("id")))
            try:  # a logging failure must not lose the posted record (second review pass)
                ap._log_post_outcome(post_id=res.get("id"), dest_id=None, fmt="snow_outlook", media_id=media.get("id"),
                                 account=acct, caption=cap, cta_url="https://www.nakshiq.com/en/road-conditions",
                                     utm_content="snow_outlook", duration_s=meta.get("duration"), audio_type="music_only", language="en")
            except Exception as e:
                _log(f"post-outcome log failed (post stands, ledger still written): {e}")
    if ok:
        _record_posted(alerts, post_ids)
        _log(f"POSTED to {len(post_ids)} account(s): {', '.join(post_ids)}")
    return ok


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--pack", type=Path)
    p.add_argument("--publish", action="store_true")
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()

    pack, path = load_pack(args.pack)
    if not pack:
        _log("no snow fact pack — nothing to do (the outlook has not called a new 'likely')")
        return 0
    alerts = check_pack(pack)
    keys = _posted_keys()
    already = [a["name"] for a in alerts if _overlaps_posted(a, keys)]
    if already:
        _log(f"already posted for this snowfall, skipped: {', '.join(already)}")
    alerts = [a for a in alerts if not _overlaps_posted(a, keys)]
    if not alerts:
        _log(f"{path.name}: nothing fit to show")
        return 0
    if args.dry_run:
        _log("DRY RUN caption:\n" + caption(alerts))
        return 0
    out = OUT_DIR / f"snow_outlook_{pack['run_date']}.mp4"
    meta = build(alerts, out)
    if not meta:
        return 1
    (OUT_DIR / f"snow_outlook_{pack['run_date']}.caption.txt").write_text(caption(alerts))
    if args.publish and _publish_enabled() and accuracy_gate(alerts):
        return 0 if publish(meta) else 1
    _log(f"HELD for review: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
