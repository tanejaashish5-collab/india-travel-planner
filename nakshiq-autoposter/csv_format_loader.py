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

    ctx = _expand_aliases(candidate_dest)
    placeholders = spec.placeholders_in_caption
    missing = []
    for p in placeholders:
        if p in _NON_DEST_DATA_FIELDS:
            continue
        if not ctx.get(p):
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
    slug = (dest.get("id") or dest.get("slug") or dest.get("name") or "").lower().replace(" ", "-")
    if not slug:
        return None
    state_slug = (dest.get("state_slug") or "").lower().replace(" ", "-")
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
            return p
    return None


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
        expanded = _expand_aliases(dest)
        ctx.update({k: v for k, v in expanded.items() if v not in (None, "")})
    if extra_context:
        ctx.update({k: v for k, v in extra_context.items() if v not in (None, "")})

    required = spec.placeholders_in_caption - _NON_DEST_DATA_FIELDS
    missing = [p for p in required if p not in ctx]

    # Heavy-template-collapse path: when most placeholders are unfilled, the
    # rendered output would be mostly punctuation ("Myth: . Reality: ."). For
    # video formats where the caption IS the content, substitute a
    # destination-driven fallback so we ship a coherent post instead of
    # nothing. For image formats, slide_gen handles the visual fallback.
    if missing and len(missing) > max(2, len(required) // 2):
        if spec.post_type in VIDEO_POST_TYPES:
            return _fallback_video_caption(spec, dest, extra_context or {})
        if spec.post_type not in DYNAMIC_RENDER_POST_TYPES:
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
        return ""

    # Glue them — hook on its own line, body, then CTA on a new line.
    parts = [p.strip() for p in (hook, body, cta) if p.strip()]
    return "\n\n".join(parts)


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
