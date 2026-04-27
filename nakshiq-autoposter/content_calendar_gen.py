#!/usr/bin/env python3
"""
NakshIQ Monthly Content Calendar Generator

Queries Supabase for destination scores, festivals, infrastructure data,
and generates an intelligent, data-driven content calendar for any month.

Usage:
    python3 content_calendar_gen.py --month 6          # June 2026
    python3 content_calendar_gen.py --month 6 --year 2026
    python3 content_calendar_gen.py --month 6 --dry-run  # Print to stdout only

Requirements:
    SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local or environment
"""

import argparse
import json
import os
import sys
import calendar
from datetime import date, datetime
from pathlib import Path

# ---------------------------------------------------------------------------
# Env loader (same pattern as autoposter.py)
# ---------------------------------------------------------------------------
ENV_FILE = Path(__file__).parent / ".env.local"
if ENV_FILE.exists():
    for line in ENV_FILE.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required.", file=sys.stderr)
    print("Set them in .env.local or environment.", file=sys.stderr)
    sys.exit(1)

# ---------------------------------------------------------------------------
# Supabase RPC helper
# ---------------------------------------------------------------------------
import urllib.request
import urllib.error

def sb_query(sql: str) -> list:
    """Execute SQL via Supabase REST RPC endpoint."""
    url = f"{SUPABASE_URL}/rest/v1/rpc/exec_sql"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }
    # Try direct PostgREST approach first — query via the rpc endpoint
    # Fallback: use the SQL endpoint if available
    # For simplicity, use the PostgREST filtered queries
    raise NotImplementedError("Direct SQL not available via REST. Use Supabase MCP or psycopg2.")


def sb_rest(table: str, params: str = "") -> list:
    """Query Supabase via PostgREST."""
    url = f"{SUPABASE_URL}/rest/v1/{table}?{params}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"ERROR: {e.code} {e.reason} for {url}", file=sys.stderr)
        return []


# ---------------------------------------------------------------------------
# Data Collection Functions
# ---------------------------------------------------------------------------

MONTH_NAMES = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

def get_month_scores(month: int) -> list:
    """Get all destination scores for a given month."""
    rows = sb_rest("destination_months", f"month=eq.{month}&select=destination_id,score,verdict")
    return rows

def get_destinations() -> dict:
    """Get all destinations keyed by id."""
    rows = sb_rest("destinations",
                   "select=id,name,state_id,elevation_m,budget_tier,cell_network,"
                   "medical_facility,hiddenness,crowd_level,solo_female_score,daily_cost,tags")
    return {r["id"]: r for r in rows}

def get_states() -> dict:
    """Get all states keyed by id."""
    rows = sb_rest("states", "select=id,name")
    return {r["id"]: r for r in rows}

def get_festivals(month: int) -> list:
    """Get festivals for a given month."""
    rows = sb_rest("festivals",
                   f"month=eq.{month}&select=name,destination_id,approximate_date,description,significance")
    return rows

def score_distribution(scores: list) -> dict:
    """Count destinations per score level."""
    dist = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0}
    for s in scores:
        dist[s.get("score", 0)] = dist.get(s.get("score", 0), 0) + 1
    return dist

def find_score_changes(current_month: int, prev_month: int, current_scores: list, prev_scores: list) -> tuple:
    """Find biggest score jumps and drops between months."""
    curr_map = {s["destination_id"]: s["score"] for s in current_scores}
    prev_map = {s["destination_id"]: s["score"] for s in prev_scores}

    changes = []
    for did in curr_map:
        if did in prev_map:
            change = curr_map[did] - prev_map[did]
            if abs(change) >= 1:
                changes.append({
                    "destination_id": did,
                    "prev_score": prev_map[did],
                    "curr_score": curr_map[did],
                    "change": change
                })

    jumps = sorted([c for c in changes if c["change"] > 0], key=lambda x: -x["change"])
    drops = sorted([c for c in changes if c["change"] < 0], key=lambda x: x["change"])
    return jumps, drops

def find_hidden_gems(scores: list, dests: dict, min_score: int = 4, min_hiddenness: int = 3) -> list:
    """Find high-scoring hidden destinations."""
    gems = []
    for s in scores:
        did = s["destination_id"]
        d = dests.get(did, {})
        if s["score"] >= min_score and (d.get("hiddenness") or 0) >= min_hiddenness:
            gems.append({**s, **d})
    return sorted(gems, key=lambda x: (-(x.get("hiddenness") or 0), -x["score"]))

def find_heat_traps(scores: list, prev_scores: list, dests: dict) -> list:
    """Find popular destinations that score 1 or 0."""
    curr_map = {s["destination_id"]: s["score"] for s in scores}
    prev_map = {s["destination_id"]: s["score"] for s in prev_scores}

    traps = []
    for did, score in curr_map.items():
        if score <= 1 and prev_map.get(did, 0) >= 2:
            d = dests.get(did, {})
            traps.append({
                "destination_id": did,
                "name": d.get("name", did),
                "prev_score": prev_map.get(did, 0),
                "curr_score": score,
                "elevation_m": d.get("elevation_m"),
            })
    return sorted(traps, key=lambda x: -x["prev_score"])

def find_monsoon_cliff(current_scores: list, next_scores: list, dests: dict, min_drop: int = 2) -> list:
    """Find destinations that drop significantly next month."""
    curr_map = {s["destination_id"]: s["score"] for s in current_scores}
    next_map = {s["destination_id"]: s["score"] for s in next_scores}

    cliff = []
    for did in curr_map:
        if did in next_map:
            drop = curr_map[did] - next_map[did]
            if drop >= min_drop:
                d = dests.get(did, {})
                cliff.append({
                    "destination_id": did,
                    "name": d.get("name", did),
                    "state_id": d.get("state_id"),
                    "curr_score": curr_map[did],
                    "next_score": next_map[did],
                    "drop": drop,
                })
    return sorted(cliff, key=lambda x: (-x["drop"], -x["curr_score"]))

def find_budget_gems(scores: list, dests: dict, max_score: int = 5) -> list:
    """Find cheapest high-scoring destinations."""
    gems = []
    for s in scores:
        if s["score"] >= max_score:
            d = dests.get(s["destination_id"], {})
            cost = d.get("daily_cost")
            if cost and isinstance(cost, dict):
                budget = cost.get("budget")
                if isinstance(budget, dict):
                    total = budget.get("total", 99999)
                elif isinstance(budget, (int, float)):
                    total = budget
                else:
                    continue
                gems.append({
                    **d,
                    "score": s["score"],
                    "budget_daily": total,
                })
    return sorted(gems, key=lambda x: x["budget_daily"])[:15]

def find_no_signal_destinations(scores: list, dests: dict, min_score: int = 4) -> list:
    """Find high-scoring destinations with infrastructure gaps."""
    results = []
    for s in scores:
        if s["score"] >= min_score:
            d = dests.get(s["destination_id"], {})
            cell = d.get("cell_network") or ""
            medical = d.get("medical_facility") or ""
            if (not cell or "none" in cell.lower() or "no signal" in cell.lower() or
                "limited" in cell.lower() or "no" in cell.lower()):
                results.append({
                    **d,
                    "score": s["score"],
                })
    return sorted(results, key=lambda x: -x["score"])[:15]


# ---------------------------------------------------------------------------
# Calendar Generator
# ---------------------------------------------------------------------------

def generate_calendar(month: int, year: int) -> str:
    """Generate the full content calendar as markdown."""
    month_name = MONTH_NAMES[month]
    prev_month = 12 if month == 1 else month - 1
    next_month = 1 if month == 12 else month + 1
    prev_name = MONTH_NAMES[prev_month]
    next_name = MONTH_NAMES[next_month]

    print(f"Fetching data for {month_name} {year}...", file=sys.stderr)

    # Fetch all data
    print("  Loading destinations...", file=sys.stderr)
    dests = get_destinations()
    states = get_states()

    print(f"  Loading {month_name} scores...", file=sys.stderr)
    curr_scores = get_month_scores(month)

    print(f"  Loading {prev_name} scores...", file=sys.stderr)
    prev_scores = get_month_scores(prev_month)

    print(f"  Loading {next_name} scores...", file=sys.stderr)
    next_scores = get_month_scores(next_month)

    print(f"  Loading {month_name} festivals...", file=sys.stderr)
    festivals = get_festivals(month)

    # Enrich destinations with state name
    for did, d in dests.items():
        d["state_name"] = states.get(d.get("state_id"), {}).get("name", "Unknown")

    # Analyze
    print("  Analyzing...", file=sys.stderr)
    dist = score_distribution(curr_scores)
    jumps, drops_prev = find_score_changes(month, prev_month, curr_scores, prev_scores)
    monsoon_cliff = find_monsoon_cliff(curr_scores, next_scores, dests)
    hidden_gems = find_hidden_gems(curr_scores, dests)
    heat_traps = find_heat_traps(curr_scores, prev_scores, dests)
    budget_gems = find_budget_gems(curr_scores, dests)
    no_signal = find_no_signal_destinations(curr_scores, dests)

    # Enrich with names
    for item in jumps + drops_prev:
        d = dests.get(item["destination_id"], {})
        item["name"] = d.get("name", item["destination_id"])
        item["state"] = d.get("state_name", "")
        item["elevation_m"] = d.get("elevation_m")

    for item in monsoon_cliff:
        item["state"] = dests.get(item["destination_id"], {}).get("state_name", "")

    # Build markdown
    lines = []
    L = lines.append

    L(f"# {month_name} {year} Content Calendar — NakshIQ Intelligence\n")
    L(f"> Auto-generated from Supabase data on {date.today().isoformat()}.")
    L(f"> All claims are verifiable against live database.\n")
    L("---\n")

    # Score distribution
    L(f"## {month_name} Score Distribution\n")
    total = sum(dist.values())
    L(f"Total destinations: {total}\n")
    for score in [5, 4, 3, 2, 1, 0]:
        pct = (dist[score] / total * 100) if total else 0
        bar = "█" * int(pct / 2)
        L(f"- **Score {score}**: {dist[score]} destinations ({pct:.0f}%) {bar}")
    L("")

    # Biggest jumps from previous month
    big_jumps = [j for j in jumps if j["change"] >= 2]
    if big_jumps:
        L(f"## {prev_name}→{month_name}: Biggest Score Jumps\n")
        L("| Destination | State | {prev} | {curr} | Change |".format(prev=prev_name[:3], curr=month_name[:3]))
        L("|---|---|---|---|---|")
        for j in big_jumps[:15]:
            L(f"| {j['name']} | {j['state']} | {j['prev_score']} | {j['curr_score']} | +{j['change']} |")
        L(f"\n**Content angle**: \"{len(big_jumps)} destinations jump 2+ points from {prev_name} to {month_name}.\"")
        if any(j["change"] >= 4 for j in big_jumps):
            mega = [j for j in big_jumps if j["change"] >= 4]
            L(f"**Mega swing**: {', '.join(j['name'] for j in mega)} jump {mega[0]['change']} points in one month!\n")

    # Monsoon cliff (next month drops)
    big_cliff = [c for c in monsoon_cliff if c["drop"] >= 2 and c["curr_score"] >= 4]
    if big_cliff:
        L(f"## {month_name}→{next_name}: Score Cliff (Urgency Content)\n")
        L(f"| Destination | State | {month_name[:3]} | {next_name[:3]} | Drop |")
        L("|---|---|---|---|---|")
        for c in big_cliff[:20]:
            L(f"| {c['name']} | {c['state']} | {c['curr_score']} | {c['next_score']} | -{c['drop']} |")
        L(f"\n**Content angle**: \"{len(big_cliff)} destinations scoring 4+ drop sharply in {next_name}. Last chance.\"\n")

    # Hidden gems
    if hidden_gems:
        L("## Hidden Gems — High Scores, Nobody Knows\n")
        L("| Destination | State | Score | Hiddenness | Crowd Level |")
        L("|---|---|---|---|---|")
        for g in hidden_gems[:12]:
            L(f"| {g.get('name', g['destination_id'])} | {g.get('state_name', '')} | {g['score']} | {g.get('hiddenness', '?')}/5 | {g.get('crowd_level', '?')} |")
        L(f"\n**Content angle**: \"{len(hidden_gems)} destinations score 4+ with near-zero crowds. You haven't heard of most.\"\n")

    # Heat traps
    if heat_traps:
        L("## Heat Traps / Avoid List\n")
        notable = heat_traps[:10]
        L("| Destination | {prev} Score | {curr} Score |".format(prev=prev_name[:3], curr=month_name[:3]))
        L("|---|---|---|")
        for t in notable:
            L(f"| {t['name']} | {t['prev_score']} | {t['curr_score']} |")
        L(f"\n**Content angle**: \"Popular destinations scoring 1/5 in {month_name}. Stop wasting your leave.\"\n")

    # Budget gems
    if budget_gems:
        L("## Budget Intelligence — Cheapest Perfect Scores\n")
        L("| Destination | Score | Budget/Day | State |")
        L("|---|---|---|---|")
        for b in budget_gems[:10]:
            L(f"| {b.get('name', '?')} | {b['score']}/5 | ₹{b['budget_daily']:,.0f} | {b.get('state_name', '')} |")
        L(f"\n**Content angle**: \"Perfect-score destinations under ₹{budget_gems[2]['budget_daily']:,.0f}/day.\"\n")

    # Infrastructure reality
    if no_signal:
        L("## Infrastructure Reality Checks\n")
        L("| Destination | Score | Cell Network | Medical Facility |")
        L("|---|---|---|---|")
        for n in no_signal[:10]:
            cell = n.get("cell_network") or "None"
            med = n.get("medical_facility") or "None nearby"
            L(f"| {n.get('name', '?')} | {n['score']}/5 | {cell[:40]} | {med[:50]} |")
        L(f"\n**Content angle**: \"Perfect destinations with zero cell signal. Here's what that means.\"\n")

    # Festivals
    if festivals:
        L(f"## {month_name} Festival Calendar\n")
        L("| Festival | Location | When | Significance |")
        L("|---|---|---|---|")
        for f in festivals[:20]:
            d = dests.get(f["destination_id"], {})
            dest_name = d.get("name", f["destination_id"])
            state = d.get("state_name", "")
            approx = f.get("approximate_date", "")
            sig = (f.get("significance") or "")[:60]
            L(f"| {f['name']} | {dest_name}, {state} | {approx} | {sig} |")
        L("")

    # Summary stats for content ideas
    L("---\n")
    L("## Quick Stats for Captions\n")
    L(f"- Total destinations tracked: {total}")
    L(f"- Perfect scores (5/5): {dist[5]}")
    L(f"- Avoid zone (1/5 or 0/5): {dist[1] + dist[0]}")
    L(f"- Hidden gems (hiddenness 3+, score 4+): {len(hidden_gems)}")
    L(f"- Festivals this month: {len(festivals)}")
    L(f"- Destinations dropping 2+ next month: {len(big_cliff)}")
    if big_jumps:
        L(f"- Destinations jumping 2+ from last month: {len(big_jumps)}")
    L("")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Generate NakshIQ monthly content calendar")
    parser.add_argument("--month", type=int, required=True, help="Month number (1-12)")
    parser.add_argument("--year", type=int, default=date.today().year, help="Year (default: current)")
    parser.add_argument("--dry-run", action="store_true", help="Print to stdout instead of saving")
    args = parser.parse_args()

    if not 1 <= args.month <= 12:
        print("ERROR: Month must be 1-12", file=sys.stderr)
        sys.exit(1)

    md = generate_calendar(args.month, args.year)

    if args.dry_run:
        print(md)
    else:
        out_dir = Path(__file__).parent / "content_calendars"
        out_dir.mkdir(exist_ok=True)
        out_file = out_dir / f"{MONTH_NAMES[args.month].lower()}_{args.year}.md"
        out_file.write_text(md)
        print(f"Saved to {out_file}", file=sys.stderr)
        print(f"\nCalendar generated: {len(md)} chars, {md.count(chr(10))} lines", file=sys.stderr)


if __name__ == "__main__":
    main()
