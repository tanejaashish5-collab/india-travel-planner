#!/usr/bin/env python3
"""scenario_daily.py — the last two steps of the Veo reel pipeline: cut, then publish.

    python3 scenario_daily.py render      # after clips land (run-veo.sh, 09:20 + 14:20)
    python3 scenario_daily.py publish     # the day's slot (run-social-local.sh, ~11:35 IST)
    python3 scenario_daily.py status

WHY THIS EXISTS (founder, 2026-09-23: "just make it fully automated now that we
have formatted reels"). Generation was automatic (LaunchAgent → Cowork →
LaunchAgent) but every reel was cut by hand and none were published.

THE DAY, AS DECIDED WITH THE FOUNDER ON 2026-09-23
  - One Hindi reel and one English reel a day.
  - Hindi → Instagram (@nakshiq). The site's human audience is about half
    India, and Hinglish hooks out-perform English in tier 2/3 cities.
  - English → YouTube Shorts (@naksh-iq).
  - English is in her voice with no captions; Hindi opens on the outcome with
    English captions. Both end on the logo card with that surface's handle.
  - Posting caps stay what they were: one reel a day per surface, enforced in
    autoposter's publish layer from the shared ledger, so the GitHub slot that
    fires at 12:00 IST steps aside once this has published.

STATE lives in ~/Automation/nakshiq-veo/data/reels.json, never in the repo: one
row per reel, keyed by storyboard and language, carrying its file, status
(ready / published / failed) and the platform post id. A storyboard is cut in
ONE language only, so the same story never runs on both surfaces.
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
VEO = Path.home() / "Automation" / "nakshiq-veo"
QUEUE = VEO / "veo_queue.json"
LEDGER = VEO / "data" / "reels.json"
REELS = VEO / "reels"

# language → where it goes, and the handle its end card must name.
SURFACE = {
    "hi": {"platform": "instagram", "cta": "follow @nakshiq"},
    "en": {"platform": "youtube", "cta": "follow @naksh-iq"},
}
# Keep this many cut-but-unpublished reels per language. One outage day at
# Cowork (Mac asleep, credits gone) must not mean a day with nothing to post.
BUFFER = 2
# Formats with a six-beat script in BOTH languages. The older landscape formats
# (wrong_month, crowd_pullback, two_places) are English-only and three or four
# beats; they can still be cut in English from the backlog.
BILINGUAL = {"sos_rescue", "fuel_gap", "road_closed", "hospital_run", "food_find",
             "how_hard", "which_two", "real_cost", "quiet_month"}


def _log(msg: str) -> None:
    print(f"[scenario {datetime.now().strftime('%H:%M:%S')}] {msg}", flush=True)


def _load(path: Path, default):
    try:
        return json.loads(path.read_text())
    except Exception:
        return default


def _save_ledger(led: dict) -> None:
    LEDGER.parent.mkdir(parents=True, exist_ok=True)
    tmp = LEDGER.with_suffix(".tmp")
    tmp.write_text(json.dumps(led, indent=2, ensure_ascii=False))
    tmp.replace(LEDGER)


def complete_storyboards() -> list[dict]:
    """Storyboards whose every TAKE-ONE clip is live, oldest-queued first.

    Take two is insurance, not a requirement: a storyboard is cuttable the
    moment each beat has one clip. Six-beat storyboards (the ones with `take`
    rows) sort ahead of the older backlog, because they are the reels the
    founder signed off on.
    """
    rows = _load(QUEUE, [])
    order, groups = [], {}
    for r in rows:
        key = (r.get("slug"), r.get("format"))
        if key not in groups:
            groups[key] = []
            order.append(key)
        groups[key].append(r)
    out = []
    for i, key in enumerate(order):
        rs = groups[key]
        primary = [r for r in rs if int(r.get("take") or 1) == 1]
        if not (primary and all(r.get("status") == "live" for r in primary)):
            continue
        if not _footage_matches_script(key[0], key[1], primary):
            continue
        out.append({"slug": key[0], "format": key[1], "six": any("take" in r for r in rs),
                    "pos": i})
    out.sort(key=lambda s: (not s["six"], s["pos"]))
    return out


def _footage_matches_script(slug: str, fmt: str, rows: list) -> bool:
    """Only cut a storyboard whose clips were generated from the prompts the
    code writes TODAY, beat for beat.

    Why this is the gate and not a date or a list of slugs: the queue holds
    footage from three generations of this pipeline. The 2026-09-20 trial clips
    carry claims we withdrew (a 'local contact', a mountain road in Alibaug)
    and must never publish; the 09-21/09-23 clips are four-beat, so under the
    six-beat script the ambulance would play while she says she is opening the
    page. Comparing each clip's prompt to the current prompt for the same beat
    rejects all of that, and any future prompt change, with one rule.
    """
    try:
        sys.path.insert(0, str(HERE))
        import render_storyboard as RS
        import storyboard as SB
        m = datetime.now().month
        dest, months = RS.load_dest(slug, m)
        sb = SB.build_storyboard(fmt, dest, m, months, **_partner_kw(slug, fmt, m))
    except Exception:
        return False
    want = {b["clip"]: b.get("veo") for b in sb["beats"] if b.get("clip") and b.get("veo")}
    have = {r["clip"]: r.get("prompt") for r in rows}
    return bool(want) and set(want) == set(have) and all(have[c] == want[c] for c in want)


def _partner_kw(slug: str, fmt: str, month: int) -> dict:
    """which_two needs its /vs/ partner to rebuild; same rule render_storyboard uses."""
    if fmt != "which_two":
        return {}
    reel = _load(VEO / "data" / "reel-data.json", {})
    pack = _load(Path.home() / "Automation" / "nakshiq-ig" / "data" / "verdicts.json", [])
    named = {r["id"]: r["name"] for r in pack}
    for x, y in reel.get("vs_pairs", []):
        other = y if x == slug else x if y == slug else None
        pm = (reel.get("months", {}).get(other) or {}).get(str(month)) if other else None
        if other and other in named and pm:
            return {"dest_b": {"id": other, "name": named[other],
                               "score": pm.get("score"), "label": pm.get("label")}}
    return {}


def render(dry: bool = False) -> int:
    led = _load(LEDGER, {})
    used = {v["storyboard"] for v in led.values()}
    made = 0
    for lang, surf in SURFACE.items():
        ready = [v for v in led.values() if v["lang"] == lang and v["status"] == "ready"]
        need = BUFFER - len(ready)
        if need <= 0:
            continue
        for sb in complete_storyboards():
            if need <= 0:
                break
            key = f"{sb['slug']}__{sb['format']}"
            if key in used:
                continue
            if lang == "hi" and sb["format"] not in BILINGUAL:
                continue
            REELS.mkdir(parents=True, exist_ok=True)
            out = REELS / f"{key}__{lang}.mp4"
            _log(f"cutting {key} in {lang} for {surf['platform']}")
            if dry:
                used.add(key); need -= 1
                continue
            env = dict(os.environ, NAKSHIQ_ENDCARD_CTA=surf["cta"])
            r = subprocess.run([sys.executable, "render_storyboard.py", "--slug", sb["slug"],
                                "--format", sb["format"], "--lang", lang, "--out", str(out)],
                               cwd=str(HERE), env=env, capture_output=True, text=True)
            used.add(key)                      # a refusal is final for this storyboard
            if r.returncode != 0 or not out.exists():
                tail = (r.stdout + r.stderr).strip().splitlines()[-1:] or ["no output"]
                _log(f"  refused/failed: {tail[0][:160]}")
                led[f"{key}__{lang}"] = {"storyboard": key, "lang": lang, "status": "failed",
                                         "error": tail[0][:300],
                                         "at": datetime.now(timezone.utc).isoformat()}
                continue
            led[f"{key}__{lang}"] = {"storyboard": key, "slug": sb["slug"], "format": sb["format"],
                                     "lang": lang, "platform": surf["platform"],
                                     "file": str(out), "status": "ready", "six_beat": sb["six"],
                                     "rendered_at": datetime.now(timezone.utc).isoformat()}
            made += 1
            need -= 1
            _save_ledger(led)
    _save_ledger(led)
    _log(f"cut {made} reel(s)")
    return 0


def _dest_name(slug: str) -> str:
    pack = _load(Path.home() / "Automation" / "nakshiq-ig" / "data" / "verdicts.json", [])
    for r in pack:
        if r.get("id") == slug:
            return r.get("name") or slug
    return slug.replace("-", " ").title()


def _lines(slug: str, fmt: str, lang: str) -> list[str]:
    """The reel's own narration, so the caption can quote its first line."""
    try:
        sys.path.insert(0, str(HERE))
        import render_storyboard as RS
        import storyboard as SB
        dest, months = RS.load_dest(slug, datetime.now().month)
        sb = SB.build_storyboard(fmt, dest, datetime.now().month, months)
        return SB.spec_from_storyboard(sb, lang)["lines"]
    except Exception:
        return []


def caption_for(row: dict) -> tuple[str, str]:
    """(caption, youtube_title). The first line is the reel's own hook, so the
    caption reads as the same voice as the video. Disclosure is in the text:
    the people in these scenes are AI-generated, and saying so costs nothing
    and keeps the account out of the undisclosed-AI-people class."""
    name = _dest_name(row["slug"])
    lines = _lines(row["slug"], row["format"], row["lang"])
    hook = lines[0] if lines else name
    url = f"https://www.nakshiq.com/en/destination/{row['slug']}"
    tag = row["slug"].replace("-", "")
    disclose = "Dramatised scene, AI-generated footage. The facts are NakshIQ's real data."
    if row["lang"] == "hi":
        cap = (f"{hook}\n\n{name} का पूरा हाल, महीने के हिसाब से: {url}\n\n"
               f"{disclose}\n\n#{tag} #indiatravel #NakshIQ")
        return cap, f"{name} | NakshIQ"
    cap = (f"{hook}\n\nEverything we know about {name}, month by month: {url}\n\n"
           f"{disclose}\n\n#{tag} #indiatravel #NakshIQ")
    head = hook[:80].rstrip('.')
    # A hook that already names the place would say it twice ("...Calangute-Baga... | Calangute-Baga").
    title = head if name.lower() in head.lower() else f"{head} | {name}"
    return cap, title[:100]


def publish(dry: bool = False) -> int:
    """Publish the oldest ready reel for each surface that has not had one today.

    The caller (run-social-local.sh) pulls the shared ledger before this and
    pushes it after, so the GitHub slot and the caps see this post."""
    if os.environ.get("NAKSHIQ_SCENARIO_PUBLISH", "0") != "1" and not dry:
        _log("PUBLISH DISABLED (NAKSHIQ_SCENARIO_PUBLISH!=1) — reels stay 'ready'")
        return 0
    sys.path.insert(0, str(HERE))
    import autoposter as ap
    led = _load(LEDGER, {})
    today = datetime.now(timezone.utc).date().isoformat()
    published = 0
    accounts = {a.get("network"): a for a in ap.get_connected_accounts()}
    _settle_unconfirmed(ap, led)
    for lang, surf in SURFACE.items():
        plat = surf["platform"]
        if any(v.get("platform") == plat and v.get("status") in ("published", "unconfirmed")
               and (v.get("published_at") or "").startswith(today) for v in led.values()):
            _log(f"{plat}: already published a scenario reel today")
            continue
        ready = sorted((v for v in led.values() if v["lang"] == lang and v["status"] == "ready"
                        and Path(v["file"]).exists()),
                       key=lambda v: (not v.get("six_beat"), v["rendered_at"]))
        if not ready:
            _log(f"{plat}: nothing ready in {lang} — the GitHub slot keeps the day")
            continue
        row = ready[0]
        acct = accounts.get(plat)
        if not acct:
            _log(f"{plat}: account not connected — skipping")
            continue
        cap, title = caption_for(row)
        if dry:
            _log(f"DRY {plat} ← {Path(row['file']).name}\n  title: {title}\n{cap}")
            continue
        media = ap.upload_media_bytes(Path(row["file"]).read_bytes(), Path(row["file"]).name,
                                      content_type="video/mp4")
        if not media:
            _log(f"{plat}: upload failed")
            continue
        res = ap.publish_reel(cap, acct, media, dry_run=False, yt_title=title)
        if not res:
            _log(f"{plat}: publish refused (cap reached or Outstand error) — stays ready")
            continue
        post_id = (res.get("post") or {}).get("id") or res.get("id")
        # A YouTube upload takes minutes, and a REJECTED post used to be logged
        # the same as a slow one: 22-24 Sep every YouTube post died on a 401
        # after the Brand Account move while the ledger said "published".
        w = (ap.wait_for_publish(post_id, timeout=240, detail=True) if post_id
             else {"status": "rejected", "error": "no post id"})
        now = datetime.now(timezone.utc).isoformat()
        if w["status"] == "rejected":
            row.update(failed_post_id=post_id, last_error=str(w["error"])[:300], failed_at=now)
            _save_ledger(led)
            _alert(f"{plat} REJECTED {row['slug']}: {str(w['error'])[:160]}")
            continue                           # stays ready; not logged as a post
        status = "published" if w["status"] == "published" else "queued_unconfirmed"
        ap.append_post_log_entry({
            "timestamp": now, "date": today, "platform": plat, "post_id": post_id,
            "destination": row["slug"], "format": f"scenario_{row['format']}",
            "media_id": media.get("id"),
        })
        ap._log_post_outcome(post_id=post_id, dest_id=row["slug"],
                             fmt=f"scenario_{row['format']}", media_id=media.get("id"),
                             account=acct, caption=cap,
                             cta_url=f"https://www.nakshiq.com/en/destination/{row['slug']}",
                             utm_content=f"scenario_{row['format']}", status=status,
                             audio_type="tts", language=row["lang"])
        row.update(status="published" if status == "published" else "unconfirmed",
                   post_id=post_id, published_at=now, confirm=status)
        _save_ledger(led)
        published += 1
        _log(f"{plat}: {status} {Path(row['file']).name} (post {post_id})")
    return 0


def _alert(msg: str) -> None:
    """Loud, local, exception-only: a macOS notification plus the log line."""
    _log("ALERT " + msg)
    try:
        subprocess.run(["osascript", "-e", f'display notification {json.dumps(msg[:200])} '
                        f'with title "NakshIQ reel failed"'], timeout=10)
    except Exception:
        pass


def _settle_unconfirmed(ap, led: dict) -> None:
    """Resolve yesterday's slow posts before today's: confirmed -> published,
    rejected -> ready again (with an alert), still pending -> left alone."""
    for row in led.values():
        if row.get("status") != "unconfirmed" or not row.get("post_id"):
            continue
        w = ap.wait_for_publish(row["post_id"], timeout=10, detail=True)
        if w["status"] == "published":
            row["status"] = "published"
        elif w["status"] == "rejected":
            row.update(status="ready", failed_post_id=row.pop("post_id"),
                       last_error=str(w["error"])[:300], published_at=None)
            _alert(f"{row.get('platform')} REJECTED {row.get('slug')}: {str(w['error'])[:160]}")
    _save_ledger(led)


def status() -> int:
    from collections import Counter
    led = _load(LEDGER, {})
    for (lang, st), n in sorted(Counter((v["lang"], v["status"]) for v in led.values()).items()):
        print(f"  {lang} {st:<20} {n}")
    cut = {v["storyboard"] for v in led.values()}
    waiting = [s for s in complete_storyboards() if f"{s['slug']}__{s['format']}" not in cut]
    print(f"  complete storyboards not yet cut: {len(waiting)}")
    return 0


if __name__ == "__main__":
    ap_ = argparse.ArgumentParser()
    ap_.add_argument("cmd", choices=["render", "publish", "status"])
    ap_.add_argument("--dry", action="store_true")
    a = ap_.parse_args()
    if a.cmd == "status":
        raise SystemExit(status())
    raise SystemExit((render if a.cmd == "render" else publish)(a.dry))
