"""Slug normalization for autoposter asset/dest matching.

Added 2026-05-26 in Phase B of the autoposter hardening sprint. Centralises
the lowercase/strip/hyphen normalisation that was duplicated across
csv_format_loader._find_matching_asset and social_image_picker.pick_social_image
— both had subtly different normalisers that drifted apart, causing slug
mismatches (e.g. "Mathura" looking for "mathura.png" but the file was
"Mathura.png" or "mathura_OD.png").

Also exports split_dir_slug() to close the social_image_picker startswith()
prefix bug (a query for "puri" matched "puripuri-foo_XX" if such a dir
existed).
"""
from __future__ import annotations

import re

# Word-internal punctuation gets stripped (no hyphen substituted), so
# "Puri's" → "puris", not "puri-s". Then anything else non-slug becomes a hyphen.
_DROP_PUNCT_RE = re.compile(r"['\"`.,]+")
_NON_SLUG_RE = re.compile(r"[^a-z0-9-]+")
_REPEAT_HYPHEN_RE = re.compile(r"-+")


def normalize_dest_slug(s) -> str:
    """Normalize a destination name/id/slug to canonical kebab-case.

    - Lowercases
    - Strips leading/trailing whitespace
    - Drops word-internal punctuation (apostrophes, periods, commas, quotes)
    - Replaces remaining whitespace, underscores, and punctuation with hyphens
    - Collapses runs of hyphens
    - Strips leading/trailing hyphens

    Examples:
      "Mathura"                  -> "mathura"
      "  Mathura  "              -> "mathura"
      "puri OD"                  -> "puri-od"
      "Mt. Abu"                  -> "mt-abu"
      "Puri's Beach"             -> "puris-beach"
      "pondicherry / puducherry" -> "pondicherry-puducherry"
    """
    if not s:
        return ""
    out = str(s).strip().lower()
    out = _DROP_PUNCT_RE.sub("", out)
    out = _NON_SLUG_RE.sub("-", out)
    out = _REPEAT_HYPHEN_RE.sub("-", out)
    return out.strip("-")


def split_dir_slug(dirname: str) -> tuple[str, str]:
    """Split a social_image_library directory name into (dest_slug, state_code).

    Library convention: `<dest-slug>_<2-4 char state code>` (e.g. `puri_OD`,
    `agatti-island_LA`).

    Returns ("", "") when the format doesn't parse — callers should treat
    that as a non-match instead of falling back to startswith() prefix-matching
    (the Phase B bug we're closing: a query for "puri" would silently match
    any directory whose name began with "puri").
    """
    if not dirname or "_" not in dirname:
        return "", ""
    base, _, state = dirname.rpartition("_")
    # State code is 2-4 letters by convention (LA, OD, KA, MAH, etc.). Be
    # permissive on length but reject obviously-bad splits.
    if not (2 <= len(state) <= 4 and state.isalpha()):
        return "", ""
    return base.lower(), state.upper()
