#!/usr/bin/env python3
"""eleven_budget.py: the ElevenLabs character budget, kept in code.

    python3 eleven_budget.py status                       # remaining now, from the last dashboard reading
    python3 eleven_budget.py set <remaining> [--reserve N] # record a dashboard reading ("credits remaining")
    python3 eleven_budget.py plan reel_specs/a.json ...    # chars the specs' UNCACHED voice tracks need, EN + HI

WHY (founder 2026-10-10: "you always need to plan for 11 labs as well, properly, so that we
don't run out ... keep that calculation in mind every time"). The API key is scoped to
text-to-speech, so it cannot read the account balance (GET /v1/user/subscription -> 401).
The balance therefore comes from the founder's dashboard reading, and every synthesis
since that reading is logged here and subtracted. reel_v3.voice() calls require() before
every paid synthesis: a cut that would take the balance below the reserve is refused
(the reel lands in review, nothing is spent), never voiced on hope.

eleven_v3 bills 1 credit per character of the text sent. A cache hit (same voice, model,
stability and exact lines) costs nothing, so re-cuts are free unless the words change;
splitting a line into two DOES change them and is billed again.
"""
from __future__ import annotations

import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

DATA = Path.home() / "Automation" / "nakshiq-veo" / "data"
BUDGET = DATA / "eleven_budget.json"      # {"remaining": int, "as_of": iso, "reserve": int}
USAGE = DATA / "eleven_usage.jsonl"       # one line per paid synthesis
RESERVE = 1500                            # ~ one reel's two voice tracks, kept back for a fix


class BudgetError(SystemExit):
    pass


def _budget() -> dict | None:
    try:
        return json.loads(BUDGET.read_text())
    except (OSError, ValueError):
        return None


def _usage() -> list[dict]:
    if not USAGE.exists():
        return []
    out = []
    for line in USAGE.read_text().splitlines():
        try:
            out.append(json.loads(line))
        except ValueError:
            continue
    return out


def live() -> int | None:
    """Credits left straight from ElevenLabs, or None. Needs the key's "User: Read"
    permission; until the founder enables it the endpoint answers 401 and the last
    dashboard reading is used instead."""
    import os
    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key:
        return None
    try:
        import requests
        r = requests.get("https://api.elevenlabs.io/v1/user/subscription",
                         headers={"xi-api-key": key}, timeout=15)
        if r.status_code != 200:
            return None
        j = r.json()
        return int(j["character_limit"]) - int(j["character_count"])
    except Exception:  # noqa: BLE001
        return None


def remaining() -> tuple[int | None, int]:
    """(credits left now, or None if neither ElevenLabs nor a dashboard reading can say; reserve)."""
    b = _budget()
    reserve = int((b or {}).get("reserve", RESERVE))
    n = live()
    if n is not None:
        return n, reserve
    if not b:
        return None, RESERVE
    spent = sum(u["chars"] for u in _usage() if u["at"] > b["as_of"])
    return int(b["remaining"]) - spent, int(b.get("reserve", RESERVE))


def require(chars: int, what: str) -> None:
    """Refuse a synthesis that would cut into the reserve, or that has no reading to check against."""
    left, reserve = remaining()
    if left is None:
        raise BudgetError(f"ElevenLabs budget unknown: record the dashboard's 'credits remaining' with "
                          f"`python3 eleven_budget.py set <n>` before voicing {what} ({chars} chars)")
    if left - chars < reserve:
        raise BudgetError(f"ElevenLabs budget: {what} needs {chars} chars, {left} left, reserve {reserve}. "
                          "Not voiced. Top up or wait for the monthly reset, then record the new reading")


def record(chars: int, what: str) -> None:
    USAGE.parent.mkdir(parents=True, exist_ok=True)
    with USAGE.open("a") as f:
        f.write(json.dumps({"at": datetime.now(timezone.utc).isoformat(), "chars": chars, "what": what}) + "\n")


def voice_text(lines: list[str]) -> str:
    """Exactly what reel_v3.voice() sends."""
    return "\n\n".join(lines)


def plan(spec_paths: list[str]) -> int:
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    import os
    import reel_v3 as R
    import yt_shorts_v2 as Y
    need = 0
    for p in spec_paths:
        spec = R.load(p)
        for lang, lines in spec["vo"].items():
            vid = (spec.get("voice_id")
                   or (os.environ.get("ELEVEN_VOICE_ID_EN") if spec.get("audience") == "foreign"
                       else os.environ.get("ELEVEN_VOICE_ID_HI")))
            h = hashlib.sha1(json.dumps([vid, Y.ELEVEN_MODEL, Y.ELEVEN_STABILITY, lines]).encode()).hexdigest()[:16]
            cached = vid and (R.VOICE_CACHE / f"{h}.mp3").exists()
            n = 0 if cached else len(voice_text(lines))
            need += n
            print(f"  {spec['id']:<34} {lang}  {'cached' if cached else f'{n:>5} chars'}")
    left, reserve = remaining()
    print(f"needed {need} chars | left {left if left is not None else 'UNKNOWN (run: set <n>)'} | reserve {reserve}")
    if left is not None:
        print("OK" if left - need >= reserve else f"SHORT by {need - (left - reserve)} chars")
    return 0 if left is not None and left - need >= reserve else 1


if __name__ == "__main__":
    a = sys.argv[1:]
    if a[:1] == ["set"] and len(a) >= 2:
        res = int(a[a.index("--reserve") + 1]) if "--reserve" in a else RESERVE
        BUDGET.write_text(json.dumps({"remaining": int(a[1].replace(",", "")), "reserve": res,
                                      "as_of": datetime.now(timezone.utc).isoformat()}, indent=1))
        print(f"recorded: {a[1]} remaining, reserve {res}")
    elif a[:1] == ["plan"]:
        raise SystemExit(plan(a[1:]))
    elif a[:1] == ["status"] or not a:
        left, reserve = remaining()
        print(f"left {left if left is not None else 'UNKNOWN'} | reserve {reserve} | "
              f"{len(_usage())} syntheses logged")
    else:
        print(__doc__)
        raise SystemExit(2)
