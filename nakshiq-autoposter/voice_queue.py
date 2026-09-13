#!/usr/bin/env python3
"""
voice_queue.py — the founder-voice reel queue (test T1, strategy 2026-09-13).

The problem this solves: the founder records a 30-45s voice note on his phone.
Nothing on the phone tells us which two destinations he talked about, and we
have no local speech-to-text. So we do not parse the audio at all — we ASK
FIRST. Each day the queue picks tomorrow's pair, the daily Instagram brief
prints the prompt ("Record: Manali vs Kasol, September"), and whatever audio
lands next is bound to the oldest prompt that is still waiting.

Binding is by order, not by content, which is why the brief shows one prompt at
a time and the bind step refuses when more than one prompt is outstanding by
more than a day. Order-based binding is only safe while the queue is shallow.

    python3 voice_queue.py refresh          # top the queue up (idempotent)
    python3 voice_queue.py bind             # attach dropped audio to a prompt
    python3 voice_queue.py status

Files:
    data/voice_queue.json                       the queue (this repo, gitignored data dir)
    ~/Automation/nakshiq-ig/voice-notes/        founder drops .m4a/.mp3/.wav here
    ~/Automation/nakshiq-ig/voice-prompts.json  what the daily brief reads
"""
from __future__ import annotations

import json
import os
import random
import shutil
import subprocess
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA_DIR = HERE / "data"
QUEUE_PATH = DATA_DIR / "voice_queue.json"
DROP_DIR = Path.home() / "Automation" / "nakshiq-ig" / "voice-notes"
PROMPTS_PATH = Path.home() / "Automation" / "nakshiq-ig" / "voice-prompts.json"
AUDIO_DIR = DATA_DIR / "voice_audio"
AUDIO_EXTS = {".m4a", ".mp3", ".wav", ".aac", ".caf", ".mp4"}

# A voice note shorter than this is almost certainly a misfire; longer than this
# cannot be cut to a 45-60s reel without losing the founder's point.
MIN_AUDIO_S = 20.0
MAX_AUDIO_S = 90.0
QUEUE_DEPTH = 3          # keep the queue shallow — order-based binding needs it
PAIR_COOLDOWN_DAYS = 45  # do not re-prompt the same destination this soon


def _log(msg: str) -> None:
    print(f"[voice-queue] {msg}", flush=True)


def load_queue() -> list[dict]:
    if not QUEUE_PATH.exists():
        return []
    try:
        return json.loads(QUEUE_PATH.read_text())
    except Exception as e:
        _log(f"queue unreadable ({e}) — treating as empty, not overwriting")
        raise SystemExit(1)


def save_queue(q: list[dict]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    QUEUE_PATH.write_text(json.dumps(q, indent=1, ensure_ascii=False))


def _recent_dest_ids(q: list[dict], days: int = PAIR_COOLDOWN_DAYS) -> set[str]:
    cutoff = (date.today() - timedelta(days=days)).isoformat()
    out: set[str] = set()
    for e in q:
        if (e.get("created") or "")[:10] >= cutoff:
            out.add(e.get("dest_a_id") or "")
            out.add(e.get("dest_b_id") or "")
    return {x for x in out if x}


def _fetch_pairs(exclude: set[str], n: int) -> list[tuple[dict, dict]]:
    """Pick n destination pairs for the current month.

    Rules: both scored >= 3 (we only send people where the month is decent),
    different states (a real comparison, not two villages in one valley),
    neither used recently. Falls back to any two scored destinations rather
    than returning nothing — an empty queue means no prompt and no reel.
    """
    sys.path.insert(0, str(HERE))
    from yt_shorts_gen import _fetch_destinations  # reuse the one API client

    dests = [d for d in _fetch_destinations() if (d.get("score") or 0) >= 3]
    pool = [d for d in dests if d.get("id") not in exclude] or dests
    if len(pool) < 2:
        return []
    random.shuffle(pool)
    pairs: list[tuple[dict, dict]] = []
    used: set[str] = set()
    for i, a in enumerate(pool):
        if len(pairs) >= n:
            break
        if a.get("id") in used:
            continue
        for b in pool[i + 1:]:
            if b.get("id") in used or b.get("state") == a.get("state"):
                continue
            pairs.append((a, b))
            used.add(a.get("id"))
            used.add(b.get("id"))
            break
    return pairs


def refresh(depth: int = QUEUE_DEPTH) -> list[dict]:
    q = load_queue()
    pending = [e for e in q if e.get("status") == "pending"]
    need = max(0, depth - len(pending))
    if need:
        month_name = datetime.now().strftime("%B")
        for a, b in _fetch_pairs(_recent_dest_ids(q), need):
            q.append({
                "id": f"vq-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}-{a.get('id')}",
                "created": datetime.now(timezone.utc).isoformat(),
                "status": "pending",
                "dest_a_id": a.get("id"), "dest_a_name": a.get("name"),
                "dest_a_score": a.get("score"), "dest_a_state": a.get("state"),
                "dest_b_id": b.get("id"), "dest_b_name": b.get("name"),
                "dest_b_score": b.get("score"), "dest_b_state": b.get("state"),
                "month": month_name,
            })
        save_queue(q)
        _log(f"queued {need} new prompt(s)")
    write_prompts(q)
    return q



def _disp(raw) -> str:
    """Raw 0-5 DB score -> the 0-10 string the site and the reels show."""
    try:
        return f"{min(10.0, float(raw) * 2):.1f}/10"
    except (TypeError, ValueError):
        return "n/a"


def write_prompts(q: list[dict] | None = None) -> None:
    """Write what the daily IG brief should show the founder. One prompt at a
    time: two prompts on screen and he cannot know which note binds to which."""
    q = q if q is not None else load_queue()
    pending = [e for e in q if e.get("status") == "pending"]
    ready = [e for e in q if e.get("status") == "recorded"]
    nxt = pending[0] if pending else None
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "drop_dir": str(DROP_DIR),
        "waiting_to_render": len(ready),
        "next": None if not nxt else {
            "id": nxt["id"],
            "line": (f"Record 30-45s: {nxt['dest_a_name']} vs {nxt['dest_b_name']} "
                     f"in {nxt['month']} — which one, and why, in your words."),
            "dest_a": nxt["dest_a_name"], "dest_b": nxt["dest_b_name"],
            "month": nxt["month"],
            # Always the DISPLAYED 0-10 scale, never the raw 0-5 DB value — the
            # site renders score x2 and the reel overlays do the same, so a
            # brief quoting "5/5" would not match anything he sees anywhere.
            "scores": f"{nxt['dest_a_name']} {_disp(nxt.get('dest_a_score'))} · "
                      f"{nxt['dest_b_name']} {_disp(nxt.get('dest_b_score'))}",
            "how": f"Voice Memos → record → share → save into {DROP_DIR}",
        },
        "queued": len(pending),
    }
    PROMPTS_PATH.parent.mkdir(parents=True, exist_ok=True)
    PROMPTS_PATH.write_text(json.dumps(payload, indent=1, ensure_ascii=False))


def _audio_dur(p: Path) -> float:
    try:
        r = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "csv=p=0", str(p)],
            capture_output=True, text=True, timeout=30)
        return float(r.stdout.strip())
    except Exception:
        return 0.0


def bind() -> dict | None:
    """Attach the oldest dropped audio file to the oldest pending prompt.

    Refuses rather than guesses when the pairing would be ambiguous: if two or
    more prompts have been outstanding and several files arrive at once, we
    cannot know which note is which, and a wrong pairing publishes the founder
    talking about Manali over footage of Coorg.
    """
    DROP_DIR.mkdir(parents=True, exist_ok=True)
    files = sorted([p for p in DROP_DIR.iterdir()
                    if p.is_file() and p.suffix.lower() in AUDIO_EXTS and not p.name.startswith(".")],
                   key=lambda p: p.stat().st_mtime)
    if not files:
        _log("no new voice notes")
        return None

    q = load_queue()
    pending = [e for e in q if e.get("status") == "pending"]
    if not pending:
        _log("audio present but no pending prompt — run refresh first; leaving the file alone")
        return None
    if len(files) > 1 and len(pending) > 1:
        _log(f"REFUSING: {len(files)} notes and {len(pending)} open prompts — "
             "order-based binding is not safe here. Leave one note in the folder "
             "and re-run, or bind by hand in data/voice_queue.json.")
        return None

    src = files[0]
    dur = _audio_dur(src)
    if dur < MIN_AUDIO_S or dur > MAX_AUDIO_S:
        bad = DROP_DIR / "rejected"
        bad.mkdir(exist_ok=True)
        shutil.move(str(src), str(bad / src.name))
        _log(f"REJECTED {src.name}: {dur:.1f}s is outside {MIN_AUDIO_S:.0f}-{MAX_AUDIO_S:.0f}s. "
             f"Moved to {bad}. Nothing was published.")
        return None

    entry = pending[0]
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    dest = AUDIO_DIR / f"{entry['id']}{src.suffix.lower()}"
    shutil.move(str(src), str(dest))
    entry["status"] = "recorded"
    entry["audio"] = str(dest)
    entry["audio_duration_s"] = round(dur, 2)
    entry["bound_at"] = datetime.now(timezone.utc).isoformat()
    save_queue(q)
    write_prompts(q)
    _log(f"bound {src.name} ({dur:.1f}s) → {entry['dest_a_name']} vs {entry['dest_b_name']}")
    return entry


def next_recorded() -> dict | None:
    for e in load_queue():
        if e.get("status") == "recorded" and Path(e.get("audio") or "").exists():
            return e
    return None


def mark(entry_id: str, status: str, **fields) -> None:
    q = load_queue()
    for e in q:
        if e.get("id") == entry_id:
            e["status"] = status
            e.update(fields)
            e[f"{status}_at"] = datetime.now(timezone.utc).isoformat()
    save_queue(q)
    write_prompts(q)


def status() -> None:
    q = load_queue()
    by = {}
    for e in q:
        by[e.get("status")] = by.get(e.get("status"), 0) + 1
    _log(f"queue: {by or 'empty'}")
    for e in q[-6:]:
        _log(f"  {e.get('status'):9} {e.get('dest_a_name')} vs {e.get('dest_b_name')} "
             f"({e.get('month')}) {e.get('audio_duration_s') or ''}")
    drops = [p.name for p in DROP_DIR.iterdir()
             if DROP_DIR.exists() and p.is_file() and p.suffix.lower() in AUDIO_EXTS] if DROP_DIR.exists() else []
    _log(f"unbound notes in drop dir: {drops or 'none'}")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "status"
    if cmd == "refresh":
        refresh()
        status()
    elif cmd == "bind":
        bind()
    elif cmd == "status":
        status()
    else:
        print(__doc__)
        raise SystemExit(2)
