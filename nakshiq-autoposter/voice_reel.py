#!/usr/bin/env python3
"""
voice_reel.py — render + publish the founder-voice reel (test T1, 2026-09-13).

What this is testing: every reel we have ever shipped was machine-voiced or
silent, and reach has sat at a median of 115 (n=129). The one variable the
Chanakya teardown and our own pool both point at is a human voice over real
footage. So: the founder's own 30-45s voice note is the spine, the two
destinations' real R2 clips are the picture, and the score cards are the only
graphics. Nothing else changes, so a reach change is attributable.

    python3 voice_reel.py --dry-run     # render only, no publish
    python3 voice_reel.py               # render + publish to Instagram

Pre-registered (do not move): median reach of the first 15 voice reels >= 300
against a 115 baseline. Kill at < 150 after 15. Scored by digest_weekly.py.
"""
from __future__ import annotations

import argparse
import os
import json
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import voice_queue
from yt_shorts_gen import (  # reuse the rendering primitives, do not fork them
    _dt, _hex, _pick_background, _render_segment_auto, _pick_music, _format_score,
    FONT_INSTRUMENT, FONT_CRIMSON, FONT_JETBRAINS,
    VERMILLION_BRIGHT, BONE, SAFFRON, SAGE,
)

OUT_DIR = HERE / "data" / "voice_reels"

# Reel length. The 6M-reel Socialinsider study (Jan-Jun 2026) puts peak
# engagement at 45-60s; our old shorts ran 24-28s. The founder's note sets the
# real length — these are the bounds we will publish inside.
MIN_REEL_S = 40.0
MAX_REEL_S = 62.0

# Share of the voice track each visual beat gets. Tuned so the two score cards
# hold the middle (that is where he compares) and the CTA never eats speech.
BEATS = [("hook", 0.16), ("card_a", 0.27), ("card_b", 0.27), ("verdict", 0.20), ("cta", 0.10)]


def _log(m: str) -> None:
    print(f"[voice-reel] {m}", flush=True)


def _ff() -> str:
    import shutil
    return shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"


def _audio_dur(p: Path) -> float:
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", str(p)], capture_output=True, text=True)
    try:
        return float(r.stdout.strip())
    except ValueError:
        return 0.0


def _normalise_voice(src: Path, out: Path) -> Path | None:
    """Phone voice notes arrive quiet, off-centre and with room tone. Two-pass
    loudness normalisation to broadcast-ish -16 LUFS with a high-pass to drop
    handling rumble. Without this the music bed swamps him."""
    cmd = [_ff(), "-y", "-i", str(src),
           "-af", "highpass=f=90,afftdn=nf=-24,loudnorm=I=-16:TP=-1.5:LRA=11",
           "-ar", "44100", "-ac", "2", "-c:a", "aac", "-b:a", "192k", str(out)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        _log(f"voice normalise failed: {r.stderr[-400:]}")
        return None
    return out


def _fetch_dest(dest_id: str) -> dict | None:
    from yt_shorts_gen import _fetch_destinations
    for d in _fetch_destinations():
        if d.get("id") == dest_id:
            return d
    return None


def build(entry: dict, out_path: Path) -> dict | None:
    audio_src = Path(entry["audio"])
    if not audio_src.exists():
        _log(f"audio missing: {audio_src}")
        return None

    dest_a = _fetch_dest(entry["dest_a_id"]) or {
        "id": entry["dest_a_id"], "name": entry["dest_a_name"],
        "score": entry.get("dest_a_score"), "state": entry.get("dest_a_state")}
    dest_b = _fetch_dest(entry["dest_b_id"]) or {
        "id": entry["dest_b_id"], "name": entry["dest_b_name"],
        "score": entry.get("dest_b_score"), "state": entry.get("dest_b_state")}

    name_a, name_b = dest_a.get("name") or "A", dest_b.get("name") or "B"
    score_a = int(dest_a.get("score") or 3)
    score_b = int(dest_b.get("score") or 3)
    month = entry.get("month") or datetime.now().strftime("%B")

    V, B, S, SG = _hex(VERMILLION_BRIGHT), _hex(BONE), _hex(SAFFRON), _hex(SAGE)
    G = "0x4CAF50"

    with tempfile.TemporaryDirectory(prefix="nq_voice_") as td:
        tdp = Path(td)
        voice = _normalise_voice(audio_src, tdp / "voice.m4a")
        if not voice:
            return None
        vdur = _audio_dur(voice)
        # The reel is as long as he spoke, plus a breath at each end, clamped.
        total = min(MAX_REEL_S, max(MIN_REEL_S, vdur + 1.8))
        if vdur + 1.8 > MAX_REEL_S:
            _log(f"voice is {vdur:.1f}s — reel capped at {MAX_REEL_S:.0f}s, the tail will be cut")

        bg_a, is_img_a = _pick_background(dest_a, [name_a, dest_a.get("state") or ""])
        bg_b, is_img_b = _pick_background(dest_b, [name_b, dest_b.get("state") or ""])
        sc_a = G if score_a >= 4 else S if score_a == 3 else V
        sc_b = G if score_b >= 4 else S if score_b == 3 else V

        texts = {
            "hook": [
                _dt(name_a.upper(), FONT_INSTRUMENT, 52, S, "(w-text_w)/2", "h*0.25"),
                _dt("VS", FONT_JETBRAINS, 120, V, "(w-text_w)/2", "h*0.34", "gte(t,0.4)", bw=5),
                _dt(name_b.upper(), FONT_INSTRUMENT, 52, S, "(w-text_w)/2", "h*0.48", "gte(t,0.8)"),
                _dt(f"{month}: which one?", FONT_CRIMSON, 32, B, "(w-text_w)/2", "h*0.58", "gte(t,1.2)"),
            ],
            "card_a": [
                _dt(name_a.upper(), FONT_INSTRUMENT, 68, B, "(w-text_w)/2", "h*0.22", bw=4),
                _dt(dest_a.get("state") or "", FONT_CRIMSON, 30, SG, "(w-text_w)/2", "h*0.32", "gte(t,0.3)"),
                _dt(_format_score(score_a), FONT_JETBRAINS, 100, sc_a, "(w-text_w)/2", "h*0.40", "gte(t,0.6)", 5),
                _dt(f"NakshIQ score · {month}", FONT_CRIMSON, 28, B, "(w-text_w)/2", "h*0.52", "gte(t,1.0)"),
            ],
            "card_b": [
                _dt(name_b.upper(), FONT_INSTRUMENT, 68, B, "(w-text_w)/2", "h*0.22", bw=4),
                _dt(dest_b.get("state") or "", FONT_CRIMSON, 30, SG, "(w-text_w)/2", "h*0.32", "gte(t,0.3)"),
                _dt(_format_score(score_b), FONT_JETBRAINS, 100, sc_b, "(w-text_w)/2", "h*0.40", "gte(t,0.6)", 5),
                _dt(f"NakshIQ score · {month}", FONT_CRIMSON, 28, B, "(w-text_w)/2", "h*0.52", "gte(t,1.0)"),
            ],
            # The VOICE is the verdict. These cards must never declare a winner
            # of their own: if he says "I'd pick Bhaderwah" while the card
            # crowns Sissu on score, the reel argues with itself on screen.
            # Both names render the same; the score colour is the month's
            # quality band (green = good month), not a comparison result.
            "verdict": [
                _dt(name_a.upper(), FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.26"),
                _dt(_format_score(score_a), FONT_JETBRAINS, 56, sc_a, "(w-text_w)/2", "h*0.34", "gte(t,0.3)", 4),
                _dt(name_b.upper(), FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.48", "gte(t,0.8)"),
                _dt(_format_score(score_b), FONT_JETBRAINS, 56, sc_b, "(w-text_w)/2", "h*0.56", "gte(t,1.1)", 4),
                _dt("my pick is in the audio", FONT_CRIMSON, 30, S, "(w-text_w)/2", "h*0.68", "gte(t,1.6)"),
            ],
            "cta": [
                _dt("VERIFIED MONTHLY", FONT_INSTRUMENT, 40, B, "(w-text_w)/2", "h*0.30"),
                _dt("@NAKSHIQ", FONT_INSTRUMENT, 72, V, "(w-text_w)/2", "h*0.38", "gte(t,0.3)", 4),
                _dt("nakshiq.com", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.48", "gte(t,0.6)"),
            ],
        }
        bgs = {"hook": (bg_a, is_img_a), "card_a": (bg_a, is_img_a), "card_b": (bg_b, is_img_b),
               "verdict": (bg_b if score_b >= score_a else bg_a, is_img_b if score_b >= score_a else is_img_a),
               "cta": (bg_a, is_img_a)}

        segments: list[Path] = []
        for i, (beat, share) in enumerate(BEATS):
            dur = round(total * share, 2)
            bg, is_img = bgs[beat]
            p = _render_segment_auto(bg, is_img, dur, texts[beat], tdp / f"seg_{i:02d}_{beat}.mp4",
                                     zoom_dir="in" if i % 2 == 0 else "out")
            if p:
                segments.append(p)
        if len(segments) < 3:
            _log(f"only {len(segments)} segments rendered — refusing to publish a broken reel")
            return None

        concat = tdp / "concat.txt"
        concat.write_text("\n".join(f"file '{s}'" for s in segments))
        silent = tdp / "silent.mp4"
        r = subprocess.run([_ff(), "-y", "-f", "concat", "-safe", "0", "-i", str(concat),
                            "-c", "copy", "-an", str(silent)], capture_output=True, text=True)
        if r.returncode != 0:
            _log(f"concat failed: {r.stderr[-400:]}")
            return None

        music = _pick_music({})
        out_path.parent.mkdir(parents=True, exist_ok=True)
        # Founder voice sits on top; music is a bed at 0.10 — well under the
        # 0.50 the silent shorts used, because there is speech to protect now.
        if music and Path(music).exists():
            # inputs: 0=silent video · 1=silent bed (holds the full length)
            #         2=founder voice · 3=music
            fc = (f"[2:a]adelay=900|900,volume=1.0[v];"
                  f"[3:a]aloop=loop=-1:size=2e9,atrim=0:{total},"
                  f"afade=t=in:st=0:d=0.8,afade=t=out:st={max(0.1, total - 1.6):.2f}:d=1.6,volume=0.10[m];"
                  f"[1:a][v][m]amix=inputs=3:duration=longest:dropout_transition=0:normalize=0[mx];"
                  f"[mx]alimiter=limit=0.92:level=disabled[a]")
            cmd = [_ff(), "-y", "-i", str(silent),
                   "-f", "lavfi", "-t", f"{total}", "-i", "anullsrc=r=44100:cl=stereo",
                   "-i", str(voice), "-i", str(music),
                   "-filter_complex", fc,
                   "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                   "-t", f"{total}", str(out_path)]
        else:
            cmd = [_ff(), "-y", "-i", str(silent), "-i", str(voice),
                   "-filter_complex", "[1:a]adelay=900|900[a]",
                   "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                   "-t", f"{total}", str(out_path)]
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            _log(f"mux failed: {r.stderr[-600:]}")
            return None

    final_dur = _audio_dur(out_path)
    _log(f"rendered {out_path.name} · {final_dur:.1f}s · {out_path.stat().st_size // 1024} KB")
    return {
        "video_path": str(out_path), "duration": final_dur,
        "dest_a": name_a, "dest_b": name_b, "month": month,
        "score_a": score_a, "score_b": score_b,
        "music": Path(music).name if music else None,
    }


def caption(meta: dict) -> str:
    """Caption states the scores and lets the audio carry the pick.

    Deliberately does NOT name a winner: the founder's voice is the verdict and
    a caption computed from scores can contradict him. Four hashtags, per the
    2026-09-08 reset — hashtags do not drive reach in 2026, they categorise.
    """
    a, b, month = meta["dest_a"], meta["dest_b"], meta["month"]
    sa, sb = _format_score(meta["score_a"]), _format_score(meta["score_b"])
    return (
        f"{a} or {b} in {month}? My answer is in the audio.\n\n"
        f"This month: {a} {sa}, {b} {sb}. That is our verified read on weather, "
        f"crowds and access, the same score the site publishes.\n\n"
        f"Month-by-month for both: nakshiq.com\n\n"
        f"#{a.lower().replace(' ', '')} #{b.lower().replace(' ', '')} #indiatravel #NakshIQ"
    )



# ── Publish gate (added 2026-09-13, after a test note published for real) ──
# A LaunchAgent was loaded while a TEST voice note sat in the production queue;
# it fired 25 minutes later and published a synthetic-voice reel to @nakshiq.
# The lesson is the repo's standing one: a rule that lives in a comment is a
# suggestion, a flag is a restriction. Publishing is now OFF unless the founder
# turns it on, exactly like NAKSHIQ_FB_ENABLED.
#   export NAKSHIQ_VOICE_REEL_ENABLED=1   (in nakshiq-autoposter/.env.local)
def _publish_enabled(kind: str) -> bool:
    if os.environ.get("NAKSHIQ_VOICE_REEL_ENABLED", "0") == "1":
        return True
    print(f"[{kind}] PUBLISH DISABLED — rendered only. "
          f"Set NAKSHIQ_VOICE_REEL_ENABLED=1 in nakshiq-autoposter/.env.local to go live.",
          flush=True)
    return False

def publish(meta: dict, entry: dict, dry_run: bool = False) -> bool:
    import autoposter as ap
    cap = caption(meta)
    if dry_run:
        _log("DRY RUN — not publishing. Caption would be:\n" + cap)
        return True
    if not _publish_enabled("voice-reel"):
        return False
    accounts = [a for a in ap.get_connected_accounts() if a.get("network") == "instagram"]
    if not accounts:
        _log("no Instagram account connected")
        return False
    data = Path(meta["video_path"]).read_bytes()
    media = ap.upload_media_bytes(data, Path(meta["video_path"]).name, content_type="video/mp4")
    if not media:
        _log("media upload failed")
        return False
    ok = False
    for acct in accounts:
        res = ap.publish_reel(cap, acct, media, dry_run=False)
        if res:
            ok = True
            ap._log_post_outcome(
                post_id=res.get("id"), dest_id=entry.get("dest_a_id"),
                fmt="voice_vs", media_id=media.get("id"), account=acct,
                caption=cap, cta_url="https://www.nakshiq.com", utm_content="voice_vs",
                duration_s=meta.get("duration"), audio_type="founder_voice",
                language="hi",  # the note is Hindi/Hinglish even when the caption is English
            )
    return ok


def main() -> int:
    ap_ = argparse.ArgumentParser()
    ap_.add_argument("--dry-run", action="store_true")
    ap_.add_argument("--entry", help="queue entry id (default: oldest recorded)")
    args = ap_.parse_args()

    entry = None
    if args.entry:
        entry = next((e for e in voice_queue.load_queue() if e.get("id") == args.entry), None)
    else:
        entry = voice_queue.next_recorded()
    if not entry:
        _log("nothing recorded and waiting — no reel today (this is normal)")
        return 0

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"voice_vs_{entry['dest_a_id']}_{entry['dest_b_id']}_{datetime.now().strftime('%Y-%m-%d')}.mp4"
    meta = build(entry, out)
    if not meta:
        voice_queue.mark(entry["id"], "failed", error="render failed")
        return 1
    if publish(meta, entry, dry_run=args.dry_run):
        if not args.dry_run:
            voice_queue.mark(entry["id"], "published", video=str(out),
                             duration_s=meta["duration"],
                             published_at=datetime.now(timezone.utc).isoformat())
        _log("done")
        return 0
    voice_queue.mark(entry["id"], "failed", error="publish failed")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
