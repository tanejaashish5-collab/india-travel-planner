#!/usr/bin/env python3
"""
road_reel.py — the Friday "sadak ka haal" reel (test T2, strategy 2026-09-13).

Why this exists: Instagram ranks reels for non-followers mainly on SENDS (DM
shares), and nothing else we make is share-shaped. A dated road-status reel is
the one thing a viewer forwards to the person they are driving with. It is also
the only reel whose content is already verified and sourced — it reads straight
off `road_updates`, the same rows behind /road-conditions.

    python3 road_reel.py --dry-run
    python3 road_reel.py                 # render + publish (Fridays)

Pre-registered: >= 5 sends per reel (we record 0 sends anywhere today).
No rows this week = no reel. We do not invent an all-clear.
"""
from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
import tempfile
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from yt_shorts_gen import (
    _dt, _hex, _pick_background, _render_segment_auto, _pick_music, _fetch_destinations,
    FONT_INSTRUMENT, FONT_CRIMSON, FONT_JETBRAINS,
    VERMILLION_BRIGHT, BONE, SAFFRON, SAGE,
)

OUT_DIR = HERE / "data" / "road_reels"
MAX_ENTRIES = 3          # three corridors is what fits in 45s and still reads
HOOK_DUR = 4.5
ENTRY_DUR = 11.0
CTA_DUR = 5.0

STATUS_WORD = {
    "open": "OPEN", "slow": "SLOW", "risky": "RISKY",
    "restricted": "TIMED", "blocked": "BLOCKED", "closed": "CLOSED",
}
STATUS_COLOUR = {
    "open": "0x4CAF50", "slow": "0xFACC15", "risky": "0xFB923C",
    "restricted": "0xFB923C", "blocked": "0xF87171", "closed": "0xF87171",
}
# road_updates.region_id -> a destination in that region we hold footage for.
REGION_FOOTAGE = {
    "himachal-pradesh": ["manali", "spiti-valley", "kalpa", "chitkul"],
    "ladakh": ["pangong-lake", "nubra-valley", "leh", "tso-moriri"],
    "jammu-kashmir": ["sonamarg", "gulmarg", "pahalgam", "srinagar"],
    "uttarakhand": ["kedarnath", "joshimath", "rishikesh", "auli"],
    "sikkim": ["gangtok", "lachung", "yumthang-valley"],
    "arunachal-pradesh": ["tawang", "ziro-valley", "bomdila"],
    "meghalaya": ["cherrapunji", "shillong", "dawki"],
    "rajasthan": ["jaisalmer", "jaipur", "jodhpur"],
}


def _log(m: str) -> None:
    print(f"[road-reel] {m}", flush=True)


def _ff() -> str:
    import shutil
    return shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"


def fetch_updates(days: int = 7, limit: int = MAX_ENTRIES) -> list[dict]:
    """Most recent road_updates rows, newest first, one per corridor.

    Prefers rows people act on (closed/blocked/restricted/slow) over reopenings,
    because the reel's job is 'what would ruin your drive'. Reopenings still
    qualify when nothing is shut — a pass opening is news too.
    """
    import requests
    # .strip() is not cosmetic: node --env-file keeps the trailing newline on
    # the last value in the file, and requests rejects a header with \n in it
    # ("Invalid leading whitespace, reserved character(s)...") — which surfaces
    # as a confusing 401 "Invalid API key" if you paste it anywhere else.
    url = (os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL") or "").strip()
    key = (os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
           or os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") or "").strip()
    if not url or not key:
        _log("Supabase env missing (NEXT_PUBLIC_SUPABASE_URL / key)")
        return []
    since = (date.today() - timedelta(days=days)).isoformat()
    try:
        r = requests.get(
            f"{url}/rest/v1/road_updates",
            params={"select": "update_date,region_id,segment,status,headline,source_label,source_published_at",
                    "update_date": f"gte.{since}", "order": "update_date.desc"},
            headers={"apikey": key, "Authorization": f"Bearer {key}"}, timeout=20)
        rows = r.json() if r.ok else []
    except Exception as e:
        _log(f"fetch failed: {e}")
        return []
    if not isinstance(rows, list):
        return []
    rank = {"closed": 0, "blocked": 0, "restricted": 1, "slow": 1, "risky": 1, "open": 2}
    rows.sort(key=lambda r: (rank.get(r.get("status"), 3), r.get("update_date") or ""), reverse=False)
    rows.sort(key=lambda r: (rank.get(r.get("status"), 3), -(int((r.get("update_date") or "0").replace("-", "") or 0))))
    seen, out = set(), []
    for r in rows:
        seg = (r.get("segment") or "").strip()
        if not seg or seg in seen:
            continue
        seen.add(seg)
        out.append(r)
        if len(out) >= limit:
            break
    return out


def _bg_for_region(region_id: str, dests_by_id: dict) -> tuple:
    for slug in REGION_FOOTAGE.get(region_id, []):
        d = dests_by_id.get(slug)
        if d:
            bg, is_img = _pick_background(d, [d.get("name") or "", d.get("state") or ""])
            if bg:
                return bg, is_img
    return None, False


def _wrap(text: str, width: int) -> list[str]:
    words, lines, cur = (text or "").split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 <= width:
            cur = f"{cur} {w}".strip()
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines[:3]


def build(rows: list[dict], out_path: Path) -> dict | None:
    if not rows:
        return None
    dests_by_id = {d.get("id"): d for d in _fetch_destinations()}
    V, B, S, SG = _hex(VERMILLION_BRIGHT), _hex(BONE), _hex(SAFFRON), _hex(SAGE)
    today = date.today()

    with tempfile.TemporaryDirectory(prefix="nq_road_") as td:
        tdp = Path(td)
        segments: list[Path] = []

        first_bg, first_img = _bg_for_region(rows[0].get("region_id") or "", dests_by_id)
        hook = [
            _dt("SADAK KA HAAL", FONT_INSTRUMENT, 62, S, "(w-text_w)/2", "h*0.26", bw=4),
            _dt(today.strftime("%d %B").upper(), FONT_JETBRAINS, 44, V, "(w-text_w)/2", "h*0.36", "gte(t,0.4)", 4),
            _dt(f"{len(rows)} roads you should know about", FONT_CRIMSON, 32, B,
                "(w-text_w)/2", "h*0.46", "gte(t,0.9)"),
            _dt("every entry dated and sourced", FONT_CRIMSON, 26, SG, "(w-text_w)/2", "h*0.54", "gte(t,1.5)"),
        ]
        p = _render_segment_auto(first_bg, first_img, HOOK_DUR, hook, tdp / "seg_00_hook.mp4")
        if p:
            segments.append(p)

        for i, r in enumerate(rows):
            status = (r.get("status") or "open").lower()
            bg, is_img = _bg_for_region(r.get("region_id") or "", dests_by_id)
            seg_lines = _wrap(r.get("segment") or "", 26)
            texts = [
                _dt(STATUS_WORD.get(status, status.upper()), FONT_JETBRAINS, 72,
                    STATUS_COLOUR.get(status, S), "(w-text_w)/2", "h*0.20", bw=5),
            ]
            y = 0.31
            for ln in seg_lines:
                texts.append(_dt(ln.upper(), FONT_INSTRUMENT, 46, B, "(w-text_w)/2", f"h*{y:.2f}", "gte(t,0.3)", 4))
                y += 0.065
            for ln in _wrap(r.get("headline") or "", 34):
                texts.append(_dt(ln, FONT_CRIMSON, 30, B, "(w-text_w)/2", f"h*{y + 0.03:.2f}", "gte(t,0.9)"))
                y += 0.055
            # On-screen credit. Drop the "(domain.com)" the routine sometimes
            # bakes into the label, then cap — a hard [:46] cut the year in half
            # ("12 Sep 20"), which reads as a wrong date rather than a trim.
            _label = re.sub(r"\s*\([^)]*\)", "", (r.get("source_label") or "source")).strip()
            _when = r.get("source_published_at") or r.get("update_date") or ""
            src = _label if any(y in _label for y in ("202", "203")) else f"{_label} · {_when}"
            if len(src) > 44:
                src = src[:41].rstrip(" ,·") + "…"
            texts.append(_dt(src, FONT_CRIMSON, 24, SG, "(w-text_w)/2", "h*0.72", "gte(t,1.8)"))
            p = _render_segment_auto(bg, is_img, ENTRY_DUR, texts, tdp / f"seg_{i+1:02d}_entry.mp4",
                                     zoom_dir="in" if i % 2 == 0 else "out")
            if p:
                segments.append(p)

        cta = [
            _dt("FULL DATED LOG", FONT_INSTRUMENT, 44, B, "(w-text_w)/2", "h*0.28"),
            _dt("nakshiq.com/road-conditions", FONT_CRIMSON, 34, S, "(w-text_w)/2", "h*0.37", "gte(t,0.4)"),
            _dt("SEND THIS TO", FONT_INSTRUMENT, 34, B, "(w-text_w)/2", "h*0.48", "gte(t,1.0)"),
            _dt("whoever is driving", FONT_CRIMSON, 34, V, "(w-text_w)/2", "h*0.55", "gte(t,1.3)"),
        ]
        p = _render_segment_auto(first_bg, first_img, CTA_DUR, cta, tdp / "seg_99_cta.mp4")
        if p:
            segments.append(p)

        if len(segments) < 3:
            _log(f"only {len(segments)} segments — refusing to publish")
            return None

        concat = tdp / "concat.txt"
        concat.write_text("\n".join(f"file '{s}'" for s in segments))
        silent = tdp / "silent.mp4"
        r = subprocess.run([_ff(), "-y", "-f", "concat", "-safe", "0", "-i", str(concat),
                            "-c", "copy", "-an", str(silent)], capture_output=True, text=True)
        if r.returncode != 0:
            _log(f"concat failed: {r.stderr[-400:]}")
            return None

        total = HOOK_DUR + len(rows) * ENTRY_DUR + CTA_DUR
        music = _pick_music({})
        out_path.parent.mkdir(parents=True, exist_ok=True)
        if music and Path(music).exists():
            fc = (f"[1:a]aloop=loop=-1:size=2e9,atrim=0:{total},"
                  f"afade=t=in:st=0:d=0.8,afade=t=out:st={max(0.1, total - 1.8):.2f}:d=1.8,volume=0.45[a]")
            cmd = [_ff(), "-y", "-i", str(silent), "-i", str(music),
                   "-filter_complex", fc, "-map", "0:v", "-map", "[a]",
                   "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-t", f"{total}", str(out_path)]
        else:
            cmd = [_ff(), "-y", "-i", str(silent), "-c", "copy", str(out_path)]
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            _log(f"mux failed: {r.stderr[-400:]}")
            return None

    _log(f"rendered {out_path.name} · {total:.1f}s · {out_path.stat().st_size // 1024} KB")
    return {"video_path": str(out_path), "duration": total, "rows": rows}


def caption(rows: list[dict]) -> str:
    lines = []
    for r in rows:
        # The routine's source_label often already carries the date
        # ("ANI, 11 Sep 2026"). Appending update_date then reads as a stutter,
        # so only add it when the label has no year of its own.
        label = (r.get("source_label") or "source").strip()
        when = r.get("source_published_at") or r.get("update_date") or ""
        src = label if any(y in label for y in ("202", "203")) else f"{label}, {when}"
        lines.append(f"· {r.get('segment')}: {STATUS_WORD.get(r.get('status'), '')} ({src})")
    return (
        f"Road check, {date.today().strftime('%d %B')}.\n\n"
        + "\n".join(lines)
        + "\n\nEvery line above carries the authority that said it and the date they said it. "
          "We log closures and reopenings daily, and we publish nothing we cannot date.\n\n"
          "Full log, all 8 regions: nakshiq.com/road-conditions\n\n"
          "Send this to whoever is driving.\n\n"
          "#roadtrip #himachal #ladakh #NakshIQ"
    )


def publish(meta: dict, dry_run: bool = False) -> bool:
    import autoposter as ap
    cap = caption(meta["rows"])
    if dry_run:
        _log("DRY RUN — caption would be:\n" + cap)
        return True
    accounts = [a for a in ap.get_connected_accounts() if a.get("network") == "instagram"]
    if not accounts:
        _log("no Instagram account connected")
        return False
    media = ap.upload_media_bytes(Path(meta["video_path"]).read_bytes(),
                                  Path(meta["video_path"]).name, content_type="video/mp4")
    if not media:
        _log("media upload failed")
        return False
    ok = False
    for acct in accounts:
        res = ap.publish_reel(cap, acct, media, dry_run=False)
        if res:
            ok = True
            ap._log_post_outcome(post_id=res.get("id"), dest_id=None, fmt="road_status",
                                 media_id=media.get("id"), account=acct, caption=cap,
                                 cta_url="https://www.nakshiq.com/en/road-conditions",
                                 utm_content="road_status", duration_s=meta.get("duration"),
                                 audio_type="music_only", language="en")
    return ok


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--days", type=int, default=7)
    args = p.parse_args()

    rows = fetch_updates(days=args.days)
    if not rows:
        _log("no road updates in the window — no reel this week. "
             "This is the correct outcome, not a failure; we never invent an all-clear.")
        return 0
    out = OUT_DIR / f"road_status_{date.today().isoformat()}.mp4"
    meta = build(rows, out)
    if not meta:
        return 1
    return 0 if publish(meta, dry_run=args.dry_run) else 1


if __name__ == "__main__":
    raise SystemExit(main())
