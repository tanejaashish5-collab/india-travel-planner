"""Regenerate the 21 quarantined Phase-2 PNGs via slide_gen.

Reads the list of quarantined `{format_id}-{slug}.png` files from
social_image_library/_pending_qa/, fetches each dest's full record from the
live NakshIQ API (so phase2_fields are populated), then renders a fresh
overlay slide via slide_gen.build_csv_single (for singles) or
build_csv_carousel (writing just the cover for carousels, since
social_image_library is a single-asset-per-format-per-dest convention).

Writes the new PNGs to social_image_library/{format_id}-{slug}.png — same
filename as the quarantined original, so the existing eligibility lookup
picks them up immediately.

Usage:
    cd nakshiq-autoposter && python3 scripts/_regen_phase2_static_assets.py
    # add --dry-run to render to /tmp/regen_preview/ instead
"""
from __future__ import annotations

import argparse
import re
import sys
from datetime import date
from pathlib import Path

# Make sibling modules importable
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import csv_format_loader as L  # noqa: E402
import slide_gen               # noqa: E402
from autoposter import fetch_full_destination_catalog  # noqa: E402

HINDI_MONTHS = {
    1: "जनवरी", 2: "फ़रवरी", 3: "मार्च", 4: "अप्रैल",
    5: "मई", 6: "जून", 7: "जुलाई", 8: "अगस्त",
    9: "सितंबर", 10: "अक्टूबर", 11: "नवंबर", 12: "दिसंबर",
}

QUARANTINE = ROOT / "social_image_library" / "_pending_qa"
LIBRARY    = ROOT / "social_image_library"

# Slugs in some quarantined filenames refer to region/state names that
# aren't NakshIQ destination IDs (catalogue keys towns/villages, not
# whole regions). When the requested slug isn't in the catalog, fall back
# to the listed dest_id — preserves the original filename so the dispatcher
# can find the asset, but uses a real dest's hero photo + score for the
# render.
SLUG_FALLBACK = {
    "ladakh":       "leh",            # Ladakh UT → Leh
    "goa":          "old-goa",        # Goa state → Old Goa
    "amritsar":     "anandpur-sahib", # No Amritsar dest → another Punjab anchor
    "old-delhi":    "mathura",        # No Delhi dest → closest tier-1 cultural anchor
    "rohtang-pass": "manali",         # Rohtang is the pass above Manali
    "mehrauli":     "mathura",        # South Delhi neighborhood → cultural anchor
}


def parse_filename(name: str) -> tuple[str, str] | None:
    """{format_id}-{slug}.png → (format_id, slug). Format IDs have only
    underscores; the first hyphen is the boundary."""
    if not name.endswith(".png"):
        return None
    stem = name[:-4]
    if "-" not in stem:
        return None
    fid, slug = stem.split("-", 1)
    # Trim trailing -feed / -story variants
    slug = re.sub(r"-(feed|story)$", "", slug)
    return fid, slug


def build_extras(spec, dest: dict, by_state: dict[str, list]) -> dict:
    """Build render-time extras for this format. Most formats just need
    month/verification_date; listicle needs items + state_name."""
    today = date.today()
    extras = {
        "month_name":        today.strftime("%B"),
        "month_hindi":       HINDI_MONTHS[today.month],
        "verification_date": today.isoformat(),
        "state_list":        dest.get("state", ""),
        "state_list_first":  dest.get("state", ""),
    }
    if spec.format_id == "v3_tl_editorial_listicle":
        state = dest.get("state", "")
        in_state = sorted(by_state.get(state, []),
                          key=lambda d: d.get("score") or 0, reverse=True)[:10]
        extras["items"] = [
            {"name": d.get("name", ""), "score": d.get("score") or 0,
             "id": d.get("id", "")}
            for d in in_state
        ]
        extras["state_name"] = state
        extras["listicle_count"] = len(in_state)
    return extras


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true",
                    help="Render to /tmp/regen_preview/ instead of overwriting")
    ap.add_argument("--limit", type=int, default=0,
                    help="Render only the first N (0 = all)")
    args = ap.parse_args()

    out_dir = Path("/tmp/regen_preview") if args.dry_run else LIBRARY
    out_dir.mkdir(parents=True, exist_ok=True)

    quarantined = sorted(QUARANTINE.glob("*.png"))
    if not quarantined:
        print(f"No PNGs in {QUARANTINE} — nothing to regenerate")
        return 0
    if args.limit:
        quarantined = quarantined[:args.limit]

    print(f"Loading CSV format specs...")
    specs = L.load_all_formats()
    print(f"  {len(specs)} specs loaded")

    print(f"Fetching full destination catalog from live API...")
    catalog = fetch_full_destination_catalog()
    by_id = {(d.get("id") or "").lower(): d for d in catalog}
    by_state: dict[str, list] = {}
    for d in catalog:
        by_state.setdefault(d.get("state", ""), []).append(d)
    print(f"  {len(catalog)} dests across {len(by_state)} states/UTs")

    ok = 0
    skipped = []
    for q in quarantined:
        parsed = parse_filename(q.name)
        if not parsed:
            skipped.append((q.name, "filename parse failed"))
            continue
        fid, slug = parsed
        spec = specs.get(fid)
        if not spec:
            skipped.append((q.name, f"unknown format_id={fid}"))
            continue
        if spec.post_type not in ("single", "carousel"):
            skipped.append((q.name, f"post_type={spec.post_type} not renderable"))
            continue
        dest = by_id.get(slug.lower())
        # State-keyed listicles use {state_slug} not a dest slug — find any
        # dest whose state_slug matches.
        if not dest and fid == "v3_tl_editorial_listicle":
            for d in catalog:
                if (d.get("state_slug") or "").lower() == slug.lower():
                    dest = d
                    break
        # Region-keyed slugs (ladakh, goa, old-delhi etc.) — fall back to a
        # nearby in-catalog dest so the render has a real hero + score.
        if not dest and slug.lower() in SLUG_FALLBACK:
            fb_slug = SLUG_FALLBACK[slug.lower()]
            dest = by_id.get(fb_slug)
            if dest:
                print(f"  ↳ {slug} not in catalog, using {fb_slug} as anchor")
        if not dest:
            skipped.append((q.name, f"dest slug not in catalog: {slug}"))
            continue

        extras = build_extras(spec, dest, by_state)
        try:
            if spec.post_type == "single":
                p = slide_gen.build_csv_single(spec, dest, extras, out_dir)
                if p:
                    print(f"  ✓ {p.name}")
                    ok += 1
                else:
                    skipped.append((q.name, "build_csv_single returned None"))
            else:  # carousel
                # Listicle is a single, data-driven slide (ranked list of 10
                # dests) — route it through build_csv_carousel which dispatches
                # to render_listicle_slide and produces the actual list, not a
                # cover. Filename keeps the state_slug for the loader's
                # state-slug fallback (one asset per state).
                if fid == "v3_tl_editorial_listicle":
                    paths = slide_gen.build_csv_carousel(spec, dest, extras, out_dir)
                    if paths:
                        # build_csv_carousel writes "<fid>-<dest.id>.png" — but
                        # for listicles we want "<fid>-<state_slug>.png" so the
                        # loader's state fallback can find it. Rename.
                        canonical = out_dir / f"{fid}-{slug}.png"
                        if paths[0].name != canonical.name:
                            paths[0].rename(canonical)
                        print(f"  ✓ {canonical.name}")
                        ok += 1
                    else:
                        skipped.append((q.name, "listicle render returned []"))
                    continue
                # Non-listicle carousels: write a single COVER image as the
                # static asset (the full N-slide carousel is rendered at post
                # time via slide_gen.build_csv_carousel — this static cover is
                # the preview/fallback). Filename uses the REAL dest.id so the
                # dispatcher can match it (a file like "...-mehrauli.png"
                # never matches because there's no mehrauli dest).
                from slide_gen import render_overlay_title_slide, _format_pillar, _safe_format, _truncate
                eyebrow = _format_pillar(spec)
                ctx = dict(dest); ctx.update(extras)
                hook = _safe_format(spec.hook_template, ctx) or dest.get("name", "")
                img = render_overlay_title_slide(
                    eyebrow, _truncate(hook, 90),
                    kicker=dest.get("name") or "", dest=dest,
                )
                real_slug = (dest.get("id") or slug).lower().replace(" ", "-")
                out_path = out_dir / f"{fid}-{real_slug}.png"
                img.save(out_path, "PNG", optimize=True)
                print(f"  ✓ {out_path.name}")
                ok += 1
        except Exception as e:
            skipped.append((q.name, f"render crashed: {e}"))

    print()
    print(f"REGENERATED: {ok}/{len(quarantined)}")
    if skipped:
        print(f"SKIPPED: {len(skipped)}")
        for name, why in skipped:
            print(f"  - {name}  ({why})")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
