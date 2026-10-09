#!/usr/bin/env python3
"""v3_daily.py — the daily steps of the v3 (keyframe) reel pipeline.

    python3 v3_daily.py topup     # queue every reel_specs/*.json marked "auto": true (dedupes)
    python3 v3_daily.py render    # cut EN + HI for every auto spec whose shots are all in

WHY (founder, 2026-09-28): the PAUSED file had held the whole daily job since
24 Sep, so after Triund the queue sat empty and a day of Flow credits went
unused. Lifting it would also have switched back on the v2 steps (text-only
queue top-up, v2 cuts) that caused the pause. This replaces those two steps and
nothing else.

A spec enters the daily loop only when it carries "auto": true, so an old or
parked spec (chikmagalur__sos_keyframe) is never re-queued by accident.
A cut lands in the ledger as "ready" and publish() posts it in the next slot
(founder, 2026-09-29: "switch the pipeline to auto-publish every reel that
passes the check"). The check is qa(): a cut missing its audio or video,
running outside 15-60s, or showing the same picture in two beats (look_alike,
added 2026-10-01 after Kodaikanal), lands as "review" instead, with the reason
in "held".
Touch HOLD_FOR_REVIEW (next to this file) to send every new cut to "review"
again; delete it to go back to auto-publish.

2026-10-09 (founder, after the Amritsar reel shipped a frozen last frame, a still
standing in for a shot, and a man falling off a bench inside a Veo clip): "ready"
alone no longer posts. publish() wants two stamps on the row, both for THIS file:
  qa_passed       written here when every check passes (qa + clip_qa people check,
                  now incl. a freeze check); `python3 v3_daily.py requalify` re-runs
                  them on every ready row (run it whenever a check is added)
  clips_eyeballed written by the daily 15:41 clip check once a person has looked
                  at every clip's frames (cron a18dd2ee; renew weekly)
A stand-in still now lands as "review", not "ready".
"""
from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import reel_v3 as R  # noqa: E402

SPECS = HERE / "reel_specs"
LEDGER = Path.home() / "Automation" / "nakshiq-veo" / "data" / "reels.json"
SURFACE = {"hi": "instagram", "en": "youtube"}
HOLD = HERE / "HOLD_FOR_REVIEW"


def qa(path: Path) -> str:
    """Return why this cut must not auto-publish, or "" when it may."""
    import subprocess
    if not path.exists() or path.stat().st_size < 500_000:
        return "file missing or under 0.5 MB"
    try:
        out = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                              "stream=codec_type:format=duration", "-of", "json", str(path)],
                             capture_output=True, text=True, timeout=60).stdout
        info = json.loads(out)
    except Exception as e:  # noqa: BLE001
        return f"ffprobe failed: {e}"
    kinds = {st.get("codec_type") for st in info.get("streams", [])}
    if not {"video", "audio"} <= kinds:
        return f"streams {sorted(kinds)}, need video + audio"
    dur = float(info.get("format", {}).get("duration") or 0)
    if not 15 <= dur <= 60:
        return f"duration {dur:.1f}s outside 15-60s"
    # The same picture twice (Kodaikanal 2026-10-01: beats 1 and 3 were one
    # desk, one pose, 15 s of the opening). Fails closed: no beat map, no publish.
    try:
        same = R.look_alike(path)
    except Exception as e:  # noqa: BLE001
        return f"repeated-shot check could not run: {e}"
    if same:
        i, j, v = same[0]
        return (f"beats {i + 1} and {j + 1} look like the same shot ({v:.2f} >= {R.SAME_SHOT}); "
                "give one a zoom/focus in the spec, or regenerate it")
    # The picture stopping dead (Amritsar 2026-10-02: 3.4 s on one frame while the
    # voice ran on; Kochi/Ahmedabad Hindi cuts 1.1-1.3 s). Catches both the cutter
    # holding a last frame and a Veo clip that froze on its own. Fails closed.
    fz = frozen(path, dur)
    if fz is None:
        return "freeze check could not run"
    if fz:
        t, d = fz[0]
        return f"picture frozen {d:.1f}s at {t:.1f}s (limit {FREEZE_HOLD}s): the shot is shorter than its line"
    return ""


FREEZE_HOLD = 1.0   # a frozen picture this long in a story reel is a visible stop


def frozen(path: Path, dur: float) -> list[tuple[float, float]] | None:
    """(start, length) of every frozen stretch >= FREEZE_HOLD before the end card;
    None when ffmpeg could not say. freezedetect's noise floor -50 dB ignores grain."""
    import re
    import subprocess
    try:
        r = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(path), "-vf",
                            f"freezedetect=n=-50dB:d={FREEZE_HOLD}", "-an", "-f", "null", "-"],
                           capture_output=True, text=True, timeout=300)
    except Exception:  # noqa: BLE001
        return None
    if r.returncode != 0:
        return None
    starts = [float(x) for x in re.findall(r"freeze_start: ([\d.]+)", r.stderr)]
    lens = [float(x) for x in re.findall(r"freeze_duration: ([\d.]+)", r.stderr)]
    import yt_shorts_v2 as Y
    card = dur - Y.ENDCARD_DUR - 0.2   # the logo card is meant to hold still
    return [(s, d) for s, d in zip(starts, lens) if s < card]


def clip_glitches(storyboard: str) -> str:
    """People appearing, vanishing or doubling INSIDE a Veo clip (founder 2026-10-07: the Coorg
    reel shipped a ghost copy of the mother). Runs clip_qa.py in its own venv; fails closed."""
    import subprocess
    import clip_qa
    if not clip_qa.PY.exists():
        return "clip people-check could not run (no ~/Automation/nakshiq-veo/.venv-qa)"
    try:
        r = subprocess.run([str(clip_qa.PY), str(HERE / "clip_qa.py"), storyboard],
                           capture_output=True, text=True, timeout=900)
    except Exception as e:  # noqa: BLE001
        return f"clip people-check failed: {e}"
    flags = [l[5:].split("  ")[0] for l in r.stdout.splitlines() if l.startswith("FLAG ")]
    if r.returncode not in (0, 1) or (r.returncode == 1 and not flags):
        return f"clip people-check failed: {(r.stderr or r.stdout)[-200:]}"
    return "; ".join(flags)


def auto_specs():
    for p in sorted(SPECS.glob("*.json")):
        s = R.load(p)
        if s.get("auto") and not R.check(s):
            yield p, s


def topup() -> int:
    n = 0
    for p, s in auto_specs():
        k = R.enqueue(s)
        if k:
            print(f"[v3_daily] queued {k} row(s) for {s['id']}")
        n += k
    print(f"[v3_daily] topup: {n} new row(s)")
    return 0


def yt_title(s: dict) -> str | None:
    """The YouTube title: the spec's "yt_title", else the cover hook (the line
    written to open a question), never the bare "<Place> | NakshIQ" default."""
    if s.get("yt_title"):
        return s["yt_title"]
    hook = " ".join((s.get("cover") or {}).get("hook", "").replace("*", "").replace("|", " ").split())
    return f"{hook} | NakshIQ" if hook else None


def render() -> int:
    import storyboard as SB
    led = json.loads(LEDGER.read_text()) if LEDGER.exists() else {}
    made = 0
    for p, s in auto_specs():
        stand = None
        if not R.ready(s):
            # One clip short: cut it anyway with the beat's keyframe still standing in
            # (founder 2026-10-02: a reel posts every day). The ledger row records which
            # shot, so the clip's late arrival can trigger a re-cut later.
            stand = R.stand_ins(s)
            if not stand:
                continue
            print(f"[v3_daily] {s['id']}: stand-in still for {', '.join(stand)}")
        glitch = None   # computed once per storyboard, only when a cut is actually made
        for lang, platform in SURFACE.items():
            key = f"{s['id']}__{lang}"
            if key in led:
                # A stand-in cut whose real clip has since landed, and not yet posted:
                # cut it again properly and drop the note. Anything else is final.
                if not (led[key].get("stand_in") and led[key].get("status") in ("ready", "review") and not stand):
                    continue
                print(f"[v3_daily] {key}: real clip arrived, re-cutting without the stand-in")
                led[key].pop("stand_in", None)
                led[key].pop("clips_eyeballed", None)   # new clip: a person must look again
            out = R.VEO / "reels" / f"{key}.mp4"
            try:
                R.render(s, lang, out, stand, SB.pick_music(s.get("format", ""), s["slug"]))
            except Exception as e:  # one bad cut must not stop the others
                print(f"[v3_daily] {key} failed: {e}")
                continue
            cover = None
            if s.get("cover"):
                try:
                    import reel_cover
                    cover = str(reel_cover.make(s, R.VEO / "reels" / f"{s['id']}__cover.jpg"))  # English, both cuts
                except (Exception, SystemExit) as e:   # a missing cover never blocks the reel
                    print(f"[v3_daily] {key} cover failed: {e}")
            first = [l for l in s["vo"]["en"][0].splitlines() if l.strip()]
            if glitch is None:
                glitch = clip_glitches(s["id"])
            # A stand-in still is a visible stop (founder 2026-10-09 on Amritsar: "a bit
            # of stoppage"). It is still cut, so the day is not lost, but it goes to review:
            # the founder releases it or the real clip lands and it is re-cut.
            held = "HOLD_FOR_REVIEW file present" if HOLD.exists() else (
                qa(out) or glitch or (f"{', '.join(sorted(stand))} plays as a still (clip not generated yet)" if stand else ""))
            led[key] = {"storyboard": s["id"], "slug": s["slug"], "format": s.get("format"), "angle": s.get("angle") or "month",
                        "status": "review" if held else "ready", "six_beat": True, "pipeline": "v3",
                        "rendered_at": datetime.now(timezone.utc).isoformat(),
                        "caption_hook": " ".join(first[:2]), "lang": lang, "platform": platform,
                        "file": str(out), "cover": cover}
            if held:
                led[key]["held"] = held
            else:
                # The stamp publish() requires (scenario_daily): a row is never posted on
                # "ready" alone, only with proof the checks ran on THIS file.
                led[key]["qa_passed"] = {"at": datetime.now(timezone.utc).isoformat(),
                                         "file_mtime": int(out.stat().st_mtime), "checks": QA_CHECKS}
            if stand:
                led[key]["stand_in"] = sorted(stand)
            if platform == "youtube" and yt_title(s):
                led[key]["yt_title"] = yt_title(s)
            LEDGER.write_text(json.dumps(led, ensure_ascii=False, indent=1))
            made += 1
            print(f"[v3_daily] cut {key} -> {out} (status {led[key]['status']}{': ' + held if held else ''})")
    print(f"[v3_daily] render: {made} cut(s)")
    return 0


QA_CHECKS = ["file", "streams", "duration", "look_alike", "freeze", "clip_people"]


def requalify() -> int:
    """Re-run every check on every v3 story row that is "ready" and stamp qa_passed, or
    hold it. For the day a check is added (freeze, 2026-10-09): cuts made under the old
    rules do not get to post on an old pass."""
    led = json.loads(LEDGER.read_text()) if LEDGER.exists() else {}
    glitch_cache: dict[str, str] = {}
    n_hold = 0
    for key, row in led.items():
        if row.get("pipeline") != "v3" or row.get("kind") in ("guide", "data_card"):
            continue
        if row.get("status") != "ready":
            continue
        out = Path(row["file"])
        sb = row["storyboard"]
        if sb not in glitch_cache:
            glitch_cache[sb] = clip_glitches(sb)
        held = qa(out) or glitch_cache[sb] or (
            f"{', '.join(row['stand_in'])} plays as a still (clip not generated yet)" if row.get("stand_in") else "")
        if held:
            row["status"] = "review"
            row["held"] = f"requalify {datetime.now(timezone.utc).date()}: {held}"
            row.pop("qa_passed", None)
            n_hold += 1
            print(f"[v3_daily] HOLD {key}: {held}")
        else:
            row["qa_passed"] = {"at": datetime.now(timezone.utc).isoformat(),
                                "file_mtime": int(out.stat().st_mtime), "checks": QA_CHECKS}
            print(f"[v3_daily] pass {key}")
    LEDGER.write_text(json.dumps(led, ensure_ascii=False, indent=1))
    print(f"[v3_daily] requalify: {n_hold} held")
    return 0


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    raise SystemExit({"topup": topup, "render": render, "requalify": requalify}.get(cmd, lambda: print(__doc__) or 2)())
