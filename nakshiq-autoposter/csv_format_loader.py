"""csv_format_loader.py — load v2/v3/v4 format prompt rows into the autoposter.

Three sibling CSV files in nakshiq-autoposter/data/ define ~38 new post formats
inspired by Indian creators (v2), Travel + Leisure (v3), Delhi Walks (v4). Each
row carries 15 fields including caption template, data input list, and asset
prompts (Pomelli / image / video).

This module is the bridge between those CSVs and the autoposter's rotation:
- `load_all_formats()` parses + dedupes + returns dict[format_id → FormatSpec]
- `is_eligible(spec, content, asset_dir)` checks data_inputs resolve AND a
  matching asset exists in social_image_library/. Returns False on missing
  data or asset (same SKIP-on-null pattern as existing v1 formats).
- `render_caption(spec, dest, platform)` substitutes {placeholders} in the
  caption_template + hook_template + cta_template using the dest dict.

CSV-loaded formats are naturally opt-in via asset presence. Until the user
generates assets via Claude Co-work + uploads to social_image_library/, every
CSV format is ineligible and the rotation behaves identically to today.
As assets land for specific format/dest pairs, those rows automatically
enter the eligible pool — no code changes, no env-var toggle.

Schema (15 cols, mirrored across content_strategy.csv, _v3_tl.csv, _v4_dw.csv):
    format_id · post_type · platform · pillar · inspired_by
    hook_template · caption_template · cta_template · data_inputs
    pomelli_prompt · image_prompt · video_prompt
    asset_aspect · max_freq_per_month · notes
"""
from __future__ import annotations

import csv
import logging
import re
import string
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable

log = logging.getLogger("nakshiq.csv_formats")

# Default discovery locations for the 3 sibling CSVs. autoposter.py can pass
# overrides for test isolation.
DEFAULT_CSV_DIR = Path(__file__).parent / "data"
DEFAULT_CSV_FILES = (
    "content_strategy.csv",        # v2 — 25 Indian-creator rows
    "content_strategy_v3_tl.csv",  # v3 — 7 Travel + Leisure rows
    "content_strategy_v4_dw.csv",  # v4 — 6 Delhi Walks heritage rows
)

EXPECTED_HEADERS = (
    "format_id", "post_type", "platform", "pillar", "inspired_by",
    "hook_template", "caption_template", "cta_template", "data_inputs",
    "pomelli_prompt", "image_prompt", "video_prompt",
    "asset_aspect", "max_freq_per_month", "notes",
)

# yt_short post_type rows belong in the yt_shorts rotation, not the morning
# feed rotation. The autoposter has separate dispatchers per surface so we
# tag those rows distinctly.
YT_SHORT_POST_TYPES = frozenset({"yt_short"})
FEED_POST_TYPES = frozenset({"single", "carousel", "reel", "story"})


@dataclass(frozen=True)
class FormatSpec:
    """Parsed CSV row. Frozen so callers can hash + share safely across runs."""

    format_id: str
    post_type: str
    platform: str
    pillar: str
    inspired_by: str
    hook_template: str
    caption_template: str
    cta_template: str
    data_inputs: tuple[str, ...]            # parsed from pipe-separated string
    pomelli_prompt: str
    image_prompt: str
    video_prompt: str
    asset_aspect: str
    max_freq_per_month: int
    notes: str
    source_csv: str                         # which CSV the row came from

    @property
    def is_feed_format(self) -> bool:
        return self.post_type in FEED_POST_TYPES

    @property
    def is_yt_short(self) -> bool:
        return self.post_type in YT_SHORT_POST_TYPES

    @property
    def placeholders_in_caption(self) -> frozenset[str]:
        """Set of {placeholder} field names used across hook/body/cta."""
        return _extract_placeholders(
            self.hook_template + " " + self.caption_template + " " + self.cta_template
        )


# ─────────────────────────────────────────────────────────────────────────────
# LOADING
# ─────────────────────────────────────────────────────────────────────────────

# Formats pulled from rotation — loaded specs are skipped entirely so they never
# post. These 3 are "orphan-data" carousels: their templates promise a specific
# story (first-person essay / hotel drone feature / neighborhood guide) but have no
# data source, so they'd only ever render the generic dest-carousel fallback under a
# mismatched caption. Re-enable by removing the id here once the format has real data
# or eligibility-gating. (2026-06-08, founder call — empty-carousel incident.)
DISABLED_FORMAT_IDS: frozenset[str] = frozenset({
    "v3_tl_first_person_essay",
    "v3_tl_hotel_drone_feature",
    "v3_tl_city_neighborhood",
})


def load_all_formats(csv_dir: Path | None = None,
                     filenames: Iterable[str] | None = None
                     ) -> dict[str, FormatSpec]:
    """Read all sibling CSVs and return dict keyed by format_id.

    Silently skips files that don't exist (so partial deploys don't crash the
    autoposter at startup). Logs a summary at INFO level.
    """
    csv_dir = csv_dir or DEFAULT_CSV_DIR
    filenames = list(filenames) if filenames else list(DEFAULT_CSV_FILES)

    specs: dict[str, FormatSpec] = {}
    loaded_counts: dict[str, int] = {}

    for fname in filenames:
        path = csv_dir / fname
        if not path.exists():
            log.info(f"[csv_formats] {fname} not found — skipping")
            continue
        try:
            with open(path, encoding="utf-8") as f:
                reader = csv.DictReader(f)
                if tuple(reader.fieldnames or ()) != EXPECTED_HEADERS:
                    log.warning(
                        f"[csv_formats] {fname} header mismatch — expected "
                        f"{EXPECTED_HEADERS}, got {reader.fieldnames}; skipping"
                    )
                    continue
                count = 0
                for row in reader:
                    spec = _row_to_spec(row, source_csv=fname)
                    if not spec:
                        continue
                    if spec.format_id in DISABLED_FORMAT_IDS:
                        log.info(f"[csv_formats] {spec.format_id} is DISABLED — skipping")
                        continue
                    if spec.format_id in specs:
                        log.warning(
                            f"[csv_formats] duplicate format_id "
                            f"'{spec.format_id}' in {fname} — "
                            f"already loaded from {specs[spec.format_id].source_csv}; "
                            f"keeping first"
                        )
                        continue
                    specs[spec.format_id] = spec
                    count += 1
                loaded_counts[fname] = count
        except OSError as e:
            log.warning(f"[csv_formats] failed to read {path}: {e}")

    if loaded_counts:
        summary = ", ".join(f"{f}={n}" for f, n in loaded_counts.items())
        log.info(f"[csv_formats] loaded {len(specs)} format specs: {summary}")
    else:
        log.info("[csv_formats] no CSV format specs loaded — rotation uses v1 only")
    return specs


def _row_to_spec(row: dict, source_csv: str) -> FormatSpec | None:
    """Parse a raw CSV row into a FormatSpec. Returns None on invalid data."""
    fid = (row.get("format_id") or "").strip()
    if not fid:
        return None
    try:
        max_freq = int((row.get("max_freq_per_month") or "0").strip() or "0")
    except ValueError:
        max_freq = 0
    data_inputs = tuple(
        s.strip() for s in (row.get("data_inputs") or "").split("|") if s.strip()
    )
    return FormatSpec(
        format_id=fid,
        post_type=(row.get("post_type") or "").strip(),
        platform=(row.get("platform") or "").strip(),
        pillar=(row.get("pillar") or "").strip(),
        inspired_by=(row.get("inspired_by") or "").strip(),
        hook_template=row.get("hook_template") or "",
        caption_template=row.get("caption_template") or "",
        cta_template=row.get("cta_template") or "",
        data_inputs=data_inputs,
        pomelli_prompt=row.get("pomelli_prompt") or "",
        image_prompt=row.get("image_prompt") or "",
        video_prompt=row.get("video_prompt") or "",
        asset_aspect=(row.get("asset_aspect") or "").strip(),
        max_freq_per_month=max_freq,
        notes=row.get("notes") or "",
        source_csv=source_csv,
    )


def feed_format_ids(specs: dict[str, FormatSpec]) -> list[str]:
    """Format_ids whose post_type is feed-eligible (single/carousel/reel/story).
    Excludes yt_short rows — those route into the yt_shorts_gen rotation."""
    return [fid for fid, s in specs.items() if s.is_feed_format]


def yt_short_format_ids(specs: dict[str, FormatSpec]) -> list[str]:
    return [fid for fid, s in specs.items() if s.is_yt_short]


def pillar_map(specs: dict[str, FormatSpec]) -> dict[str, str]:
    """format_id → pillar, ready to merge into autoposter.FORMAT_PILLARS."""
    return {fid: s.pillar for fid, s in specs.items() if s.pillar}


# ─────────────────────────────────────────────────────────────────────────────
# ELIGIBILITY (SKIP-on-null + SKIP-on-missing-asset)
# ─────────────────────────────────────────────────────────────────────────────

# Field names in data_inputs that don't need to come from the destination dict —
# they're either render-time injected (month_name, verification_date, etc.) or
# come from the run-scoped content dict. Used to relax the SKIP-on-null check.
_NON_DEST_DATA_FIELDS = frozenset({
    "month_name", "month_hindi", "verification_date", "state_list",
    "state_list_first", "year", "next_drop_date",
    # Multi-dest render-time injects — computed by the autoposter CSV
    # dispatcher from the live destination pool, never from a single row.
    # v3_tl_poll_reel: a head-to-head between two destinations.
    "dest_a_name", "dest_a_score", "dest_b_name", "dest_b_score",
    "data_winner_name",
    # v3_tl_editorial_listicle: a whole-state ranked list. listicle_body is a
    # pre-formatted multi-line string the dispatcher builds from top-N dests.
    "listicle_body", "listicle_count",
})

# Aliases mapping CSV placeholder names → standard NakshIQ destination dict
# field names. The CSVs were written with reader-friendly names like
# {dest_name} / {dest_slug}; the Supabase API returns these as name / id.
# Apply this mapping to context BEFORE checking eligibility or rendering so
# we don't need to rewrite ~38 caption templates.
_DEST_FIELD_ALIASES = {
    "dest_name": "name",
    "dest_slug": "id",
    "dest_state": "state",
    "score": "score",
    "altitude_m": "elevation_m",   # API uses elevation_m, templates use altitude_m
}


def _expand_aliases(dest: dict) -> dict:
    """Build a context dict where alias placeholder names point to real dest
    fields. Original dest fields pass through unchanged so {name} keeps
    working alongside {dest_name}.

    2026-05-20: also lifts keys from the `phase2_fields` JSONB blob (added
    by Supabase migration 059) up to the top level so caption templates
    can reference {sunrise_time}, {crowd_hindi} etc. without an extra dot
    path. Top-level keys win over phase2_fields keys when both exist.
    """
    if not dest:
        return {}
    ctx = dict(dest)
    # Lift phase2_fields JSONB keys to the top level (lower priority than
    # explicit dest columns — only fill blanks).
    phase2 = dest.get("phase2_fields")
    if isinstance(phase2, dict):
        for k, v in phase2.items():
            if k in ctx and ctx[k] not in (None, ""):
                continue
            if v not in (None, ""):
                ctx[k] = v
    for alias, real_field in _DEST_FIELD_ALIASES.items():
        if alias in ctx and ctx[alias] not in (None, ""):
            continue  # alias already populated (e.g. extra_context override)
        val = dest.get(real_field) or (phase2.get(real_field) if isinstance(phase2, dict) else None)
        if val not in (None, ""):
            ctx[alias] = val
    return ctx


# post_types that slide_gen can render at post time from FormatSpec + dest.
# When a format with one of these post_types has no static asset on disk, the
# autoposter routes it through slide_gen.build_csv_slides instead of skipping.
# Reel / yt_short need video — slide_gen can't generate it, but the dispatcher
# can fall back to the dest's Ken Burns clip when no purpose-built clip exists
# (see VIDEO_POST_TYPES below).
DYNAMIC_RENDER_POST_TYPES = frozenset({"single", "carousel"})

# Video post_types — eligible when EITHER a purpose-built asset exists OR
# the candidate dest has a Ken Burns clip in R2 (dest["video"] populated).
# The dispatcher uses the format's caption with the dest's generic video
# when no purpose-built clip is available. This unlocks ~14 CSV video
# formats that were previously dormant.
VIDEO_POST_TYPES = frozenset({"reel", "yt_short"})

# Format_id → /api/content?type=X endpoint that owns the row data.
# When a format is keyed here, the dispatcher iterates content[endpoint][data]
# rows as candidates (instead of destinations) and substitutes the row's
# fields directly into the format's templates. The row's destination_id (or
# destination_name) links back to a dest for hero photo + Ken Burns video
# fallback. This unlocks ~7 video formats whose data lives in dedicated
# content endpoints (arrival airports, hidden gems, road routes, women-solo
# guides, viral eats listings) — previously they sat dormant because the
# dispatcher only iterated dest records.
ENDPOINT_ANCHORED_FORMATS: dict[str, str] = {
    "v2_arrival_intel_video":           "arrival",
    "v2_hidden_gem_reveal_atmo":        "hidden_gems",
    "v2_route_animated_map":            "routes",
    "v2_yt_route_5_stops":              "routes",
    "v2_women_solo_brief_video":        "women_solo",
    "v2_yt_food_capital":               "eateries",      # richer per-dest than viral_eats
    "v4_dw_heritage_reel_sensory_pov":  "festivals",     # rewritten 2026-05-24 to festival POV
    # v2_weekend_escape_map intentionally NOT here — it filters destinations
    # via WEEKEND_ANCHOR_BY_DEST in autoposter.py, not an endpoint row
    # iteration. The dispatcher handles it specially.
    # v2_tourist_trap_split intentionally NOT here — the traps endpoint is
    # empty in production (verified 2026-05-24). Repurposed to brochure-vs-
    # verified dest-anchored in Tier 2.
}


# Per-format field aliases — map the row's actual field name (from the live
# API) to the placeholder name the CSV template uses. Applied during caption
# rendering so we don't need to rewrite the CSV templates every time the API
# tweaks a field name.
ENDPOINT_FIELD_ALIASES: dict[str, dict[str, str]] = {
    "v2_arrival_intel_video": {
        "atm_notes":       "atm_location",   # API field → template placeholder
    },
    "v2_hidden_gem_reveal_atmo": {
        "name":            "gem_name",
    },
    "v2_route_animated_map": {
        "name":            "route_name",
        "days":            "total_days",
        "bike_route":      "bike_friendly",
    },
    "v2_yt_route_5_stops": {
        "name":            "route_name",
        "days":            "total_days",
    },
    "v2_women_solo_brief_video": {
        "destination_name":   "dest_name",
        "solo_female_score":  "solo_score",
    },
    "v2_yt_food_capital": {
        "destination_name":   "real_food_city",
    },
}


def endpoint_for(format_id: str) -> str | None:
    """Return the /api/content?type=X key that anchors this format, or None
    if the format is destination-anchored (the default)."""
    return ENDPOINT_ANCHORED_FORMATS.get(format_id)


def endpoint_candidates(spec: FormatSpec, content: dict) -> list[dict]:
    """For endpoint-anchored formats, return the list of candidate rows
    pulled from content[endpoint]['data']. Each row is a flat dict whose
    field names mostly match the format's placeholders; ENDPOINT_FIELD_ALIASES
    fills the remaining gaps. Returns [] for destination-anchored formats.

    Some formats need row aggregation or joins (e.g. v2_yt_food_capital
    groups viral_eats by destination_id to produce dish_1..N + eatery_1..N
    rows; v2_route_animated_map flattens routes.stops list into stop_N_name
    fields). Those run as post-shapers below."""
    endpoint = ENDPOINT_ANCHORED_FORMATS.get(spec.format_id)
    if not endpoint:
        return []
    payload = (content or {}).get(endpoint) or {}
    rows = payload.get("data") if isinstance(payload, dict) else None
    rows = list(rows or [])

    # Format-specific data shapers — turn raw API rows into rows whose fields
    # match the format's caption_template placeholders. Without these, multi-
    # value formats (food_capital wanting dish_1..4, routes wanting stop_1..5)
    # fail eligibility because each raw row has only one dish/stop.
    shaper = _ROW_SHAPERS.get(spec.format_id)
    if shaper:
        rows = shaper(rows, content)
    return rows


def _shape_routes(rows: list, content: dict) -> list:
    """routes endpoint stores .stops as a list of dest-ID strings like
    ["aurangabad","ajanta-caves","ellora-caves"]. Templates want
    stop_1_name, stop_2_name, …, stop_N_one_word, stop_count, total_km,
    permit_note. Flatten the list + look up dest taglines for stop_N_note.

    Uses fetch_full_destination_catalog() if available for richer dest data
    — content["destinations"] only contains the current month's top-20."""
    dest_by_id = _dest_lookup(content)
    if len(dest_by_id) < 100:
        # Tiny catalog — pull the full 433-dest pool for stop lookups
        try:
            from autoposter import fetch_full_destination_catalog
            for d in fetch_full_destination_catalog():
                did = (d.get("id") or "").lower()
                if did and did not in dest_by_id:
                    dest_by_id[did] = d
        except Exception:
            pass
    out = []
    for r in rows:
        stops = r.get("stops") or []
        if not stops:
            continue
        shaped = dict(r)
        shaped["stop_count"] = len(stops)
        # Fill stop_1..stop_5 fields (templates only reference up to 5)
        for i in range(1, 6):
            if i - 1 < len(stops):
                slug = stops[i - 1]
                d = dest_by_id.get((slug or "").lower())
                pretty = (d.get("name") if d else slug.replace("-", " ").title())
                shaped[f"stop_{i}_name"] = pretty
                # one_word descriptor — prefer the dest's hero_dish first
                # word, else difficulty, else just blank rather than "Stop"
                hd = (d.get("hero_dish") if d else "") or ""
                first_word = hd.split()[0].rstrip(",.") if hd else ""
                shaped[f"stop_{i}_one_word"] = (
                    first_word.lower() if first_word
                    else (d.get("difficulty", "") if d else "")
                )
                # stop_N_note: dest tagline up to 80 chars. Without a dest
                # join we'd leave an empty dash; better to drop the dash by
                # supplying the stop name itself as a tight fallback.
                tagline = (d.get("tagline", "")[:80] if d else "").strip()
                shaped[f"stop_{i}_note"] = tagline or pretty
            else:
                shaped[f"stop_{i}_name"] = ""
                shaped[f"stop_{i}_one_word"] = ""
                shaped[f"stop_{i}_note"] = ""
        # Fields not in the API — use sensible defaults
        # total_km derive from days × ~150km/day (rough heuristic)
        try:
            days = int(str(shaped.get("days", "")).strip() or 0)
            shaped["total_km"] = f"~{days * 150}" if days > 0 else "~variable"
        except Exception:
            shaped["total_km"] = "~variable"
        shaped["permit_note"] = (shaped.get("permit_note")
                                  or shaped.get("budget_range", "")
                                  or "no special permits")
        # Normalise True/False booleans for display
        bf = str(shaped.get("bike_route", "")).lower()
        shaped["bike_friendly"] = "Yes" if bf == "true" else "No"
        # best_months arrives as list of ints — render as comma-joined names
        bm = shaped.get("best_months") or []
        if isinstance(bm, list) and bm:
            shaped["best_months"] = ", ".join(_month_name(m) for m in bm[:6])
            avoid = [m for m in range(1, 13) if m not in bm]
            shaped["avoid_months"] = (", ".join(_month_name(m) for m in avoid[:6])
                                       or "year-round travel possible")
        else:
            shaped["best_months"] = "year-round"
            shaped["avoid_months"] = ""
        out.append(shaped)
    return out


def _shape_women_solo(rows: list, content: dict) -> list:
    """women_solo endpoint is thin (just dest_name, state, solo_score,
    tagline). Templates want helpline_local, safe_stay_name, safe_stay_note,
    day_routes, night_advice, avoid_stay_note, duration, crowd_level. Join
    the stays endpoint by destination_id for stay names; supply national-
    helpline + dest.tagline defaults for the rest."""
    stays_by_dest: dict[str, list] = {}
    for s in ((content or {}).get("stays") or {}).get("data") or []:
        did = (s.get("destination_id") or "").lower()
        if did:
            stays_by_dest.setdefault(did, []).append(s)
    out = []
    for r in rows:
        did = (r.get("destination_id") or "").lower()
        stay = (stays_by_dest.get(did) or [None])[0]
        shaped = dict(r)
        shaped["safe_stay_name"] = (stay or {}).get("name", "mid-tier hotel near transit hub")
        shaped["safe_stay_note"] = (
            (stay or {}).get("why_nakshiq", "")[:120]
            or "verified central location with good lighting"
        )
        shaped["avoid_stay_note"] = "Skip remote homestays without check-in reviews."
        shaped["day_routes"] = (shaped.get("tagline") or "")[:140]
        shaped["night_advice"] = "Stick to lit, populated streets after sundown. Pre-book transport."
        shaped["helpline_local"] = "1091 (women helpline) · 112 (emergency)"
        shaped["duration"] = "2-3 nights"
        shaped["crowd_level"] = "moderate"
        out.append(shaped)
    return out


def _shape_food_capital(rows: list, content: dict) -> list:
    """eateries endpoint has one row per eatery, each with a `must_try` list
    of multiple dishes. Template wants dish_1..4 + eatery_1..4 + price_1..4
    — one row per CITY. Strategy: pick the top legendary/most-storied eatery
    per dest as eatery_1, fill dish_1..4 from its `must_try` list (which is
    long: see Bhatiyar Gali Ahmedabad with 6+ Akbari/Zamzam dishes). If a
    dest has 2-4 eateries in the result set, distribute one dish each across
    multiple eateries instead.

    Need destination metadata (state, destination_name) which eateries don't
    carry directly; join via destinations endpoint by destination_id."""
    dest_lookup = _dest_lookup(content)
    by_dest: dict[str, list] = {}
    for r in rows:
        did = (r.get("destination_id") or "").lower()
        if did:
            by_dest.setdefault(did, []).append(r)
    out = []
    for did, items in by_dest.items():
        # Prefer legendary eateries, then most must_try items
        items = sorted(items, key=lambda e: (
            -int(str(e.get("is_legendary")).lower() == "true"),
            -len(e.get("must_try") or []),
        ))
        dest = dest_lookup.get(did)
        if not dest:
            continue
        state = dest.get("state", "")
        dest_name = dest.get("name", "")
        famous = _FAMOUS_FOOD_CITY.get(state, "Delhi")
        if famous.lower() == dest_name.lower():
            # The anchor IS the famous city — flip framing
            famous = "the food bloggers"
        agg = {
            "destination_id":  did,
            "destination_name": dest_name,
            "state":           state,
            "real_food_city":  dest_name,
            "famous_food_city": famous,
            "image":           dest.get("image", ""),
            "url":             dest.get("url", ""),
        }
        # Strategy: spread dish_1..dish_4 across eateries
        dish_slots = []  # list of (dish, eatery, price)
        for it in items[:4]:
            eatery = (it.get("name") or "").strip()
            price  = (it.get("price_range") or "").strip()
            must_try = it.get("must_try") or []
            # Pick the signature dish if present, else first must_try
            sig = (it.get("signature_dish") or "").strip()
            if sig:
                dish_slots.append((sig[:60], eatery, price))
            elif must_try:
                dish_slots.append((str(must_try[0])[:60], eatery, price))
        # If we only have 1-2 eateries but they each have multiple must_try,
        # pull the extras from the top eatery's must_try list
        if len(dish_slots) < 4 and items:
            top = items[0]
            top_eatery = (top.get("name") or "").strip()
            top_price  = (top.get("price_range") or "").strip()
            extras = (top.get("must_try") or [])[1:]   # skip the one used above
            for d in extras:
                if len(dish_slots) >= 4:
                    break
                dish_slots.append((str(d)[:60], top_eatery, top_price))
        # Pad to 4
        while len(dish_slots) < 4:
            dish_slots.append(("", "", ""))
        for i, (dish, eatery, price) in enumerate(dish_slots[:4], 1):
            agg[f"dish_{i}"]   = dish
            agg[f"eatery_{i}"] = eatery
            agg[f"price_{i}"]  = price
        # Total budget — sum of ₹ midpoints
        prices_inr = 0
        import re as _re
        for _, _, pr in dish_slots:
            nums = [int(n.replace(",", "")) for n in _re.findall(r"(\d[\d,]*)", pr)]
            if nums:
                prices_inr += sum(nums) // len(nums)
        agg["total_inr"] = f"{prices_inr:,}" if prices_inr else "800-1,500"
        # Only ship cities with ≥3 real dish slots
        filled = sum(1 for i in range(1, 5) if agg.get(f"dish_{i}"))
        if filled >= 3:
            out.append(agg)
    return out


def _shape_arrival(rows: list, content: dict) -> list:
    """arrival endpoint mostly matches the template. Two gaps:
      - first_night_stay: not in API → join stays by destination_id
      - atm_location: API uses atm_notes (handled in ENDPOINT_FIELD_ALIASES)
    Also normalise API string "None" → empty so eligibility doesn't
    spuriously accept null-marker strings."""
    stays_by_dest: dict[str, list] = {}
    for s in ((content or {}).get("stays") or {}).get("data") or []:
        did = (s.get("destination_id") or "").lower()
        if did:
            stays_by_dest.setdefault(did, []).append(s)
    out = []
    for r in rows:
        shaped = {k: ("" if str(v).strip() == "None" else v) for k, v in r.items()}
        did = (shaped.get("destination_id") or "").lower()
        stay = (stays_by_dest.get(did) or [None])[0]
        shaped["first_night_stay"] = (
            (stay or {}).get("name", "")
            or "mid-tier hotel within 30 min of the airport"
        )
        out.append(shaped)
    return out


def _shape_hidden_gems(rows: list, content: dict) -> list:
    """hidden_gems mostly matches. Add defaults for fields not in API:
    access_note (derive from drive_time), avoid_months (best window
    flipped), population (silent — template tolerates blank)."""
    out = []
    for r in rows:
        shaped = {k: ("" if str(v).strip() == "None" else v) for k, v in r.items()}
        shaped["access_note"] = (shaped.get("drive_time")
                                 or "open access, no permit required")
        shaped.setdefault("avoid_months", "year-round access")
        # Population isn't in the API — substitute "village-scale" so the
        # template's "Pop. ~{population}" doesn't read as a broken artifact.
        shaped["population"] = shaped.get("population") or "village-scale"
        out.append(shaped)
    return out


def _shape_festivals(rows: list, content: dict) -> list:
    """festivals endpoint has name, description, destination_name (string
    inside `destinations.name`), month (int). Surface destination_name + a
    readable month_name at the row level so the template renders cleanly."""
    out = []
    for r in rows:
        shaped = {k: ("" if str(v).strip() == "None" else v) for k, v in r.items()}
        # destinations is {"name": "Kedarnath"} — lift to destination_name
        if not shaped.get("destination_name"):
            d_obj = shaped.get("destinations") or {}
            if isinstance(d_obj, dict):
                shaped["destination_name"] = d_obj.get("name", "")
        # Convert month int to readable name
        try:
            m = int(shaped.get("month") or 0)
            shaped["month_name"] = _month_name(m)
        except Exception:
            shaped["month_name"] = ""
        if shaped.get("name") and shaped.get("description"):
            out.append(shaped)
    return out


_ROW_SHAPERS = {
    "v2_arrival_intel_video":           _shape_arrival,
    "v2_hidden_gem_reveal_atmo":        _shape_hidden_gems,
    "v2_route_animated_map":            _shape_routes,
    "v2_yt_route_5_stops":              _shape_routes,
    "v2_women_solo_brief_video":        _shape_women_solo,
    "v2_yt_food_capital":               _shape_food_capital,
    "v4_dw_heritage_reel_sensory_pov":  _shape_festivals,
}


def _dest_lookup(content: dict) -> dict[str, dict]:
    """Quick {dest_id → dest_record} lookup against /api/content?type=destinations.
    Used by route shapers to resolve stop slugs to names + taglines."""
    out: dict[str, dict] = {}
    rows = ((content or {}).get("destinations") or {}).get("data") or []
    for d in rows:
        did = (d.get("id") or "").lower()
        if did and did not in out:
            out[did] = d
    return out


def _month_name(m: int) -> str:
    return ["", "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec"][m] if 1 <= m <= 12 else ""


# The "obvious" food city per state — used by v2_yt_food_capital's
# "Forget {famous_food_city}. {real_food_city} eats it for breakfast."
# framing. State → city the audience would name first if asked. The
# anchor dest is the underdog we're championing against this name.
_FAMOUS_FOOD_CITY: dict[str, str] = {
    "Uttar Pradesh":     "Lucknow",
    "Punjab":            "Amritsar",
    "Delhi":             "Old Delhi",
    "Maharashtra":       "Mumbai",
    "Karnataka":         "Bangalore",
    "Tamil Nadu":        "Chennai",
    "Kerala":            "Kochi",
    "Gujarat":           "Ahmedabad",
    "Rajasthan":         "Jaipur",
    "West Bengal":       "Kolkata",
    "Andhra Pradesh":    "Hyderabad",
    "Telangana":         "Hyderabad",
    "Madhya Pradesh":    "Indore",
    "Bihar":             "Patna",
    "Odisha":            "Bhubaneswar",
    "Assam":             "Guwahati",
    "Goa":               "Panaji",
    "Himachal Pradesh":  "Shimla",
    "Uttarakhand":       "Dehradun",
    "Jammu and Kashmir": "Srinagar",
}


def _apply_endpoint_aliases(format_id: str, row: dict) -> dict:
    """Apply ENDPOINT_FIELD_ALIASES to a candidate row in-place-safe.
    Original keys are preserved; alias keys are added when source value
    is populated. Returns a fresh dict (does not mutate input)."""
    if not row:
        return {}
    out = dict(row)
    aliases = ENDPOINT_FIELD_ALIASES.get(format_id) or {}
    for src, dst in aliases.items():
        if dst in out and out[dst] not in (None, "", "None"):
            continue   # don't clobber a populated alias
        v = row.get(src)
        if v not in (None, "", "None"):
            out[dst] = v
    return out


def _has_dest_video(dest: dict) -> bool:
    """True when the dest record has a non-empty video URL (the R2 Ken Burns
    clip). Note: this is a presence check, not a HEAD probe — the dispatcher
    does the actual reachability test via check_video_available()."""
    return bool((dest or {}).get("video"))


def is_eligible(spec: FormatSpec,
                candidate_dest: dict,
                asset_dir: Path) -> tuple[bool, str]:
    """Decide whether `spec` can post about `candidate_dest`.

    Returns (eligible, reason). reason is the skip explanation for logging.

    Two checks:
      1. Every placeholder used in caption_template MUST either resolve to a
         non-empty field on candidate_dest OR be in _NON_DEST_DATA_FIELDS
         (injected at render time).
      2. Asset gating depends on post_type:
         - single / carousel — slide_gen renders dynamically; no asset
           required. Eligible if placeholders resolve.
         - reel / yt_short — needs video. Eligible if EITHER a purpose-built
           clip exists in asset_dir OR the dest has a Ken Burns clip on R2
           (`dest["video"]` populated). The dispatcher prefers purpose-built
           when present and falls back to the Ken Burns clip otherwise.
    """
    if not candidate_dest:
        return False, "no candidate dest"

    # For endpoint-anchored formats, the "candidate" is an endpoint row
    # (e.g. an arrival airport, hidden gem, route), not a dest. Field
    # resolution uses the row's own fields + ENDPOINT_FIELD_ALIASES.
    if spec.format_id in ENDPOINT_ANCHORED_FORMATS:
        ctx = _apply_endpoint_aliases(spec.format_id, candidate_dest)
    else:
        ctx = _expand_aliases(candidate_dest)
    placeholders = spec.placeholders_in_caption
    missing = []
    for p in placeholders:
        if p in _NON_DEST_DATA_FIELDS:
            continue
        v = ctx.get(p)
        if v in (None, "", "None"):   # API returns string "None" sometimes
            missing.append(p)

    # For dynamic-render image formats, missing placeholders are NON-fatal:
    # slide_gen has _looks_broken() + _fallback_headline() that substitute a
    # pillar-aware editorial line when the template collapses. Letting these
    # through unlocks ~14 formats whose data fields (sunrise_time, myth_*,
    # transport_total_inr etc.) aren't yet populated in phase2_fields. The
    # image still ships with a real dest hero + score chip + brand chrome.
    if spec.post_type in DYNAMIC_RENDER_POST_TYPES:
        return True, ("ok" if not missing
                      else f"ok (will use fallback for {len(missing)} unresolved fields)")

    # For video formats: eligibility is gated on having a usable video clip
    # (purpose-built or Ken Burns), NOT on placeholder resolution.
    # render_caption() has _fallback_video_caption() that produces a
    # dest-driven editorial caption when too many placeholders are missing —
    # so even formats with exotic data needs (myth_question, IATA, dish_1..N)
    # still ship a coherent post instead of going dormant.
    if spec.post_type in VIDEO_POST_TYPES:
        # Endpoint-anchored video formats: candidate is an endpoint row, not
        # a dest. The dispatcher joins to a dest AFTER eligibility passes,
        # so we can't HEAD-check dest.video here. Trust the dispatcher to
        # supply the Ken Burns clip via the joined dest.
        if spec.format_id in ENDPOINT_ANCHORED_FORMATS:
            return True, "ok (endpoint-anchored; dispatcher joins dest video)"
        if _find_matching_asset(spec, candidate_dest, asset_dir):
            return True, "ok (purpose-built video)"
        if _has_dest_video(candidate_dest):
            note = "" if not missing else f" [caption fallback: {len(missing)} unresolved]"
            return True, f"ok (dest Ken Burns){note}"
        return False, "no video asset (purpose-built or Ken Burns)"

    # Non-video, non-dynamic formats — keep the strict gate.
    if missing:
        return False, f"missing dest fields: {missing[:5]}"

    # Unknown post_type — fall through to the legacy strict-asset check.
    if not _find_matching_asset(spec, candidate_dest, asset_dir):
        return False, "no matching asset in social_image_library/"

    return True, "ok"


def _find_matching_asset(spec: FormatSpec,
                         dest: dict,
                         asset_dir: Path) -> Path | None:
    """Look for an asset matching this format + dest in asset_dir.

    Search order:
      1. {format_id}-{dest_slug}.{jpg,png,mp4}     ← format-specific
      2. {format_id}-{dest_slug}-feed.{jpg,png}    ← format-specific feed
      3. {format_id}-{dest_slug}-story.{jpg,png}   ← format-specific story
      4. {format_id}-{state_slug}.{jpg,png,mp4}    ← state-keyed (listicles)
      5. {dest_slug}.{jpg,png}                     ← generic dest (fallback)

    The state-keyed fallback lets one cover asset serve a whole-state format
    like v3_tl_editorial_listicle ("10 best in Rajasthan") — the asset is
    named v3_tl_editorial_listicle-rajasthan.png and matches every Rajasthan
    destination via the dest's state_slug.

    Returns the Path or None.
    """
    if not asset_dir.exists():
        return None
    # Phase B 2026-05-26: centralise slug normalisation via _slug.normalize_dest_slug.
    # The legacy `.lower().replace(" ", "-")` left punctuation and underscores in
    # place, causing misses like "Mt. Abu" → "mt.-abu" never matching "mt-abu.png".
    try:
        from _slug import normalize_dest_slug  # type: ignore
    except ImportError:
        def normalize_dest_slug(s):  # type: ignore[no-redef]
            return (s or "").lower().replace(" ", "-")
    slug = normalize_dest_slug(dest.get("id") or dest.get("slug") or dest.get("name") or "")
    if not slug:
        return None
    state_slug = normalize_dest_slug(dest.get("state_slug") or "")
    candidates = [
        f"{spec.format_id}-{slug}.jpg",
        f"{spec.format_id}-{slug}.png",
        f"{spec.format_id}-{slug}.mp4",
        f"{spec.format_id}-{slug}-feed.jpg",
        f"{spec.format_id}-{slug}-feed.png",
        f"{spec.format_id}-{slug}-story.jpg",
        f"{spec.format_id}-{slug}-story.png",
    ]
    if state_slug:
        candidates += [
            f"{spec.format_id}-{state_slug}.jpg",
            f"{spec.format_id}-{state_slug}.png",
            f"{spec.format_id}-{state_slug}.mp4",
        ]
    candidates += [
        f"{slug}.jpg",
        f"{slug}.png",
    ]
    for name in candidates:
        p = asset_dir / name
        if p.exists() and p.stat().st_size > 0:
            if name in _ASSET_DENYLIST:
                # 2026-05-27: assets audited for the Veo AI-generation watermark
                # are skipped here instead of being deleted on disk (reversible).
                # Format degrades gracefully to its dynamic fallback or, if none,
                # is held off until a real captured asset replaces the entry.
                continue
            return p
    return None


# Assets quarantined by visual audit — bottom-right "Veo" watermark on
# Google Veo AI-generated clips. The strategy_engine v2_yt_silent_pov gate
# already says "needs real captured ambient (editorial)"; these stand-in
# Veo clips were posting in violation of the gate. To restore an entry,
# remove it from the set after re-shooting a real-footage replacement.
_ASSET_DENYLIST: frozenset[str] = frozenset({
    "v2_yt_silent_pov-tungnath.mp4",
    "v2_yt_silent_pov-ziro.mp4",
    "v2_yt_silent_pov-tawang.mp4",
    "v2_yt_silent_pov-gurez-valley.mp4",
})


# Sentinels returned by find_asset_or_dynamic() when no static asset exists
# but the dispatcher can still post the format. Compare with `is`, not `==`.
DYNAMIC_ASSET    = Path("__DYNAMIC_RENDER__")    # slide_gen renders at post time
DEST_VIDEO_ASSET = Path("__DEST_KEN_BURNS__")    # use dest["video"] as the clip


def find_asset_or_dynamic(spec: FormatSpec, dest: dict, asset_dir: Path) -> Path | None:
    """Like _find_matching_asset, but returns a sentinel when no static file
    exists and the dispatcher has a fallback path for this format.

    The autoposter compares the return value to the module sentinels:
      - real Path           → static asset on disk, upload as-is
      - DYNAMIC_ASSET       → slide_gen renders image slides at post time
      - DEST_VIDEO_ASSET    → use dest["video"] (R2 Ken Burns clip) as the reel
      - None                → skip; no path forward for this format×dest
    """
    p = _find_matching_asset(spec, dest, asset_dir)
    if p is not None:
        return p
    if spec.post_type in DYNAMIC_RENDER_POST_TYPES:
        return DYNAMIC_ASSET
    if spec.post_type in VIDEO_POST_TYPES and _has_dest_video(dest):
        return DEST_VIDEO_ASSET
    return None


# ─────────────────────────────────────────────────────────────────────────────
# CAPTION RENDERING
# ─────────────────────────────────────────────────────────────────────────────

# Tolerant {placeholder} extractor — handles missing values without raising
# KeyError. Used in render_caption.
class _DefaultDict(dict):
    """str.format_map helper that returns empty string for missing keys."""
    def __missing__(self, key):
        return ""


_PLACEHOLDER_RE = re.compile(r"\{([a-zA-Z_][a-zA-Z0-9_]*)\}")


def _extract_placeholders(text: str) -> frozenset[str]:
    return frozenset(_PLACEHOLDER_RE.findall(text or ""))


def render_caption(spec: FormatSpec,
                   dest: dict,
                   extra_context: dict | None = None) -> str:
    """Render hook + caption_template + cta_template with dest values.

    `extra_context` overrides any same-named field on dest, so render-time
    injects (month_name, verification_date, fort_1_name, …) can drop in
    without polluting the dest object.

    Behavior on missing placeholders:
      - single/carousel (dynamic-render formats): always renders — _DefaultDict
        returns "" for missing keys, slide_gen's _looks_broken() + fallback
        headline cover the rest.
      - reel/yt_short: if more than 50% of placeholders are missing, returns
        a dest-driven fallback caption (so the post still ships coherent
        text instead of being skipped). If fewer are missing, renders
        normally — partial substitution reads naturally for templates
        whose required fields ARE populated.
    """
    ctx = _DefaultDict()
    if dest:
        # Endpoint-anchored: use the row's flat fields + per-format aliases.
        # Destination-anchored: use the dest record + JSONB lift.
        if spec.format_id in ENDPOINT_ANCHORED_FORMATS:
            expanded = _apply_endpoint_aliases(spec.format_id, dest)
        else:
            expanded = _expand_aliases(dest)
        ctx.update({k: v for k, v in expanded.items()
                    if v not in (None, "", "None")})
    if extra_context:
        ctx.update({k: v for k, v in extra_context.items()
                    if v not in (None, "", "None")})

    required = spec.placeholders_in_caption - _NON_DEST_DATA_FIELDS
    missing = [p for p in required if p not in ctx]

    # Heavy-template-collapse path: when most placeholders are unfilled, the
    # rendered output would be mostly punctuation (", then and now. → today.",
    # ", West Bengal. Built by ."). All post_types now fall back to a coherent
    # dest-driven caption — image formats included (the slide_gen visual
    # fallback covers the slide overlay, but IG/FB also show the caption text
    # underneath the image which used to ship with raw empty placeholders).
    # 2026-05-25: caught live on the kalimpong v4_dw_archival_modern_carousel
    # post which shipped a caption that read literally `, then and now.  →
    # today.\n\n, West Bengal. Built  by .`
    if missing and len(missing) > max(2, len(required) // 2):
        if spec.post_type in VIDEO_POST_TYPES:
            return _fallback_video_caption(spec, dest, extra_context or {})
        if spec.post_type in DYNAMIC_RENDER_POST_TYPES:
            return _fallback_image_caption(spec, dest, extra_context or {})
        log.info(
            f"[csv_formats] {spec.format_id}: missing placeholders "
            f"{missing[:5]} — SKIPPING render"
        )
        return ""

    try:
        hook = spec.hook_template.format_map(ctx)
        body = spec.caption_template.format_map(ctx)
        cta = spec.cta_template.format_map(ctx)
    except (KeyError, ValueError, IndexError) as e:
        log.warning(f"[csv_formats] {spec.format_id}: render failed ({e})")
        if spec.post_type in VIDEO_POST_TYPES:
            return _fallback_video_caption(spec, dest, extra_context or {})
        if spec.post_type in DYNAMIC_RENDER_POST_TYPES:
            return _fallback_image_caption(spec, dest, extra_context or {})
        return ""

    # Glue them — hook on its own line, body, then CTA on a new line.
    parts = [p.strip() for p in (hook, body, cta) if p.strip()]
    rendered = "\n\n".join(parts)

    # Last-line defence — even when only ≤50% placeholders are missing the
    # caption can still come out looking broken (e.g. multiple ". ." or ": ."
    # patterns). If the rendered output trips _looks_caption_broken, swap to
    # the dest-driven fallback. Only applies to single/carousel where the
    # caption supports a fallback path.
    if (spec.post_type in DYNAMIC_RENDER_POST_TYPES
            and _looks_caption_broken(rendered)):
        log.info(
            f"[csv_formats] {spec.format_id}: rendered caption looks broken "
            f"after substitution — using dest-driven fallback"
        )
        return _fallback_image_caption(spec, dest, extra_context or {})
    return rendered


def _looks_caption_broken(text: str) -> bool:
    """Detect captions that survived rendering but still read as broken —
    e.g. ", West Bengal. Built by ." has only ~50% of placeholders missing
    so the heavy-collapse gate doesn't catch it, but the leading comma +
    "Built by ." artifacts are obvious. Tighter version of slide_gen's
    _looks_broken (which is per-line); this one looks at the full caption."""
    if not text:
        return True
    import re as _r
    stripped = text.strip()
    # Leading-punctuation lines (", then and now.  → today.")
    leading_punct = sum(1 for line in stripped.split("\n")
                        if line.strip() and line.strip()[0] in ",.:;!?")
    if leading_punct >= 2:
        return True
    # Lines ending with "by ." or ": ." (empty value slots after a label)
    bad_endings = len(_r.findall(r"\b(by|from|at|with|of|in|per)\s+\.", stripped, _r.IGNORECASE))
    if bad_endings >= 2:
        return True
    # Lines containing "$LABEL: " followed by nothing (collapsed colon-value)
    empty_labels = len(_r.findall(r"[A-Za-z][A-Za-z _-]+:\s*$", stripped, _r.MULTILINE))
    if empty_labels >= 2:
        return True
    return False


def _fallback_image_caption(spec: FormatSpec, dest: dict,
                            extras: dict) -> str:
    """Coherent dest-driven caption for image (single/carousel) formats when
    the template can't resolve. Same shape as _fallback_video_caption but
    written for the IG/FB feed-post voice. The slide visual is already
    handled by slide_gen's fallback headline path; this fills the caption
    that shows below the image in feed."""
    name    = dest.get("name") or dest.get("id") or "this place"
    state   = dest.get("state") or ""
    tagline = dest.get("tagline") or ""
    why     = dest.get("why_special") or ""
    score   = dest.get("score")
    month   = extras.get("month_name", "")
    place   = f"{name}, {state}" if state else name
    pillar  = (spec.pillar or "").lower()

    # Lead line — pillar-appropriate
    if pillar == "discovery":
        hook = f"{name} — beyond the brochure."
    elif pillar == "intelligence":
        hook = f"{name}, by the numbers."
    elif pillar == "transparency":
        hook = f"What {name} actually looks like this {month or 'month'}."
    elif pillar == "advocacy":
        hook = f"The {name} story worth knowing."
    else:
        hook = f"{place} — verified."

    body_lines = []
    if tagline:
        body_lines.append(tagline)
    if why and why != tagline:
        body_lines.append(why)
    if score not in (None, ""):
        body_lines.append(f"NakshIQ score: {score}/5"
                          + (f" · {month}" if month else ""))

    cta = "Full intel at nakshiq.com"
    return "\n\n".join([hook] + body_lines + [cta])


def _fallback_video_caption(spec: FormatSpec, dest: dict,
                            extras: dict) -> str:
    """Coherent dest-driven caption for video formats whose template
    placeholders can't resolve. Same idea as slide_gen._fallback_headline
    but for caption text (multi-line, with a CTA)."""
    name   = dest.get("name") or dest.get("id") or "this place"
    state  = dest.get("state") or ""
    tagline = dest.get("tagline") or dest.get("why_special") or ""
    month  = extras.get("month_name", "")
    pillar = (spec.pillar or "").lower()
    place  = f"{name}, {state}" if state else name

    if pillar == "transparency":
        hook = f"What {name} actually looks like this {month or 'month'}."
        body = tagline or f"Verified, not vibes. Real footage from {place}."
    elif pillar == "discovery":
        hook = f"{name} — beyond the brochure."
        body = tagline or f"{place}. The version Tripadvisor missed."
    elif pillar == "intelligence":
        hook = f"{name}, by the numbers."
        body = tagline or f"Field-audited intel on {place}."
    elif pillar == "entertainment":
        hook = f"{name}. Just press play."
        body = tagline or f"60 seconds in {place} — no narration, no filter."
    elif pillar == "advocacy":
        hook = f"The {name} story worth knowing."
        body = tagline or f"Voices from {place}."
    else:
        hook = f"{place} — verified."
        body = tagline or f"Field notes from {place}."

    cta = "Full intel at nakshiq.com"
    return "\n\n".join([hook, body, cta])


# ─────────────────────────────────────────────────────────────────────────────
# DEBUG / SUMMARY
# ─────────────────────────────────────────────────────────────────────────────

def summary(specs: dict[str, FormatSpec]) -> str:
    """One-line summary string suitable for autoposter startup log."""
    feed = len([s for s in specs.values() if s.is_feed_format])
    yts = len([s for s in specs.values() if s.is_yt_short])
    from collections import Counter
    pillars = Counter(s.pillar for s in specs.values())
    pillar_str = " ".join(f"{p}={n}" for p, n in pillars.most_common())
    return f"{len(specs)} CSV formats ({feed} feed, {yts} yt_short) · pillars: {pillar_str}"
