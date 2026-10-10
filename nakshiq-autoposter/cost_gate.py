"""cost_gate.py — no reel posts a price the cost ledger no longer says (founder 2026-10-10).

WHY: 11 guide reels and 2 data cards went out 4-9 Oct 2026 with prices from a fact pack built before the
cost research, so the video said a Manali mid hotel was ₹6,600 while the site said ₹2,900. The founder:
"ensure further reels show the correct numbers from here on always". A rule in a prompt is a suggestion;
this check runs inside scenario_daily._post, which every reel kind (story, guide, data card) goes through.

WHAT: every rupee figure in a reel's spoken lines, on-screen text and caption must match, within rounding,
a value the LIVE database holds for that destination right now:
  destination_costs (typical / range, every season and category), cost_day_tiers() for all 12 months
  (the day-cost box, trip board and "mid-range day" figures), confidence_cards.sleep.price_range_inr,
  and eateries.price_per_head_inr (the "Eat here" slide).
A figure that matches none of them is stale or invented, and the reel is held for a re-cut instead of posted.

It fails CLOSED: a reel kind that carries prices but has no record of its own on-screen text (a guide cut
before this gate existed) is held, and an unreachable database means "do not post now", never "post anyway".
"""
from __future__ import annotations

import json
import os
import re
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
SPECS = HERE / "reel_specs"

# ₹4,250 · ₹ 900 · 4,250 rupees · ४ is never used in our scripts (Arabic digits only) · 4,250 रुपये
_MONEY = [re.compile(r"₹\s?(\d[\d,]*)"),
          re.compile(r"(\d[\d,]*)\s*(?:rupees|rupee|rs\.?|inr|रुपये|रुपए|रुपया)", re.I)]
# Kinds whose cut can carry prices. A row of one of these kinds without screen_text cannot be checked.
_PRICED_GUIDE_SLIDES = {"cost", "eat"}


def figures(text: str) -> list[int]:
    out = []
    for rx in _MONEY:
        for m in rx.finditer(text or ""):
            v = int(m.group(1).replace(",", "") or 0)
            if v >= 20:                     # "₹0 entry" and stray single digits are not prices
                out.append(v)
    return out


def _rest(path: str, body: dict | None = None):
    url = (os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or "").strip().rstrip("/")
    key = (os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or "").strip()
    if not url or not key:
        raise RuntimeError("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not in the environment")
    req = urllib.request.Request(f"{url}/rest/v1/{path}", data=json.dumps(body).encode() if body is not None else None,
                                 headers={"apikey": key, "Authorization": f"Bearer {key}",
                                          "Content-Type": "application/json"}, method="POST" if body is not None else "GET")
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read())


def ledger_values(slug: str) -> set[int]:
    """Every rupee value the site can show for this destination today."""
    vals: set[int] = set()
    for r in _rest(f"destination_costs?destination_id=eq.{slug}&select=typical_inr,range_low_inr,range_high_inr"):
        vals.update(int(v) for v in r.values() if v)
    for m in range(1, 13):
        for r in _rest("rpc/cost_day_tiers", {"p_destination_ids": [slug], "p_month": m}):
            vals.update(int(v) for k, v in r.items() if v and k[:2] in ("b_", "m_", "l_"))
    for r in _rest(f"confidence_cards?destination_id=eq.{slug}&select=sleep"):
        vals.update(int(x.replace(",", "")) for x in re.findall(r"\d[\d,]*", str((r.get("sleep") or {}).get("price_range_inr") or "")))
    for r in _rest(f"local_eateries?destination_id=eq.{slug}&select=price_per_head_inr"):
        vals.update(int(x.replace(",", "")) for x in re.findall(r"\d[\d,]*", str(r.get("price_per_head_inr") or "")))
    return vals


def _matches(fig: int, vals: set[int]) -> bool:
    # Scripts round to the nearest 100 ("about 3,000 rupees"), so allow 3% or ₹50, whichever is larger.
    return any(abs(fig - v) <= max(0.03 * v, 50) for v in vals)


def _strings(x) -> list[str]:
    if isinstance(x, str):
        return [x]
    if isinstance(x, dict):
        return [s for v in x.values() for s in _strings(v)]
    if isinstance(x, list):
        return [s for v in x for s in _strings(v)]
    return []


def reel_text(row: dict) -> list[str] | None:
    """What the viewer hears and reads in this cut. None = it may carry prices but we cannot see them."""
    if row.get("screen_text") is not None:
        return _strings(row["screen_text"])
    if row.get("pipeline") == "v3":
        spec = SPECS / f"{row['storyboard']}.json"
        if not spec.exists():
            return None
        d = json.loads(spec.read_text())
        return _strings({k: d.get(k) for k in ("vo", "captions", "cover", "caption_name", "caption_hook")})
    if row.get("kind") == "data_card":
        return None
    if row.get("kind") == "guide" and _PRICED_GUIDE_SLIDES & set(row.get("kinds") or []):
        return None
    return []      # long-weekend forecast and older non-priced kinds: no rupee text is generated


def _basis_drift(row: dict) -> list[str]:
    """Strict check for a structured cost slide: each stamped {category, season, value} must still be that
    row's typical price (a loose match against all ~100 values could pass a stale figure by coincidence)."""
    out = []
    rows = _rest(f"destination_costs?destination_id=eq.{row['slug']}&select=category,season,typical_inr")
    now = {(r["category"], r["season"]): int(r["typical_inr"] or 0) for r in rows}
    for b in row.get("cost_basis") or []:
        cur = now.get((b["category"], b["season"]))
        if cur is None or abs(int(b["value"]) - cur) > max(0.01 * cur, 10):
            out.append(f"{b['category']} {b['season']} ₹{int(b['value']):,} is now "
                       + (f"₹{cur:,}" if cur is not None else "gone from the ledger"))
    return out


def check(row: dict, caption: str = "") -> tuple[bool | None, str]:
    """(True, "") post it · (False, reason) hold it for a re-cut · (None, reason) cannot check, do not post now."""
    texts = reel_text(row)
    if texts is None:
        return False, "cost: no record of this cut's on-screen text, so its prices cannot be checked; re-cut it"
    figs = sorted(set(f for t in texts + [caption or ""] for f in figures(t)))
    if not figs and not row.get("cost_basis"):
        return True, ""
    try:
        drift = _basis_drift(row)
        if drift:
            return False, "cost: " + "; ".join(drift) + "; re-cut it"
        if not figs:
            return True, ""
        vals = ledger_values(row["slug"])
    except Exception as e:                          # offline, key missing, API down
        return None, f"cost ledger unreachable ({str(e)[:120]})"
    if not vals:
        return False, f"cost: the reel quotes ₹{figs[0]:,} but the ledger has no prices for {row['slug']}"
    bad = [f for f in figs if not _matches(f, vals)]
    if bad:
        return False, ("cost: ₹" + ", ₹".join(f"{b:,}" for b in bad)
                       + f" not in today's ledger for {row['slug']} (prices changed since the cut); re-cut it")
    return True, ""


if __name__ == "__main__":
    import sys
    led = json.loads((Path.home() / "Automation/nakshiq-veo/data/reels.json").read_text())
    keys = sys.argv[1:] or [k for k, v in led.items() if v.get("status") in ("ready", "review")]
    for k in keys:
        ok, why = check(led[k])
        print(f"{'OK  ' if ok else 'HOLD' if ok is False else 'WAIT'} {k} {why}")
