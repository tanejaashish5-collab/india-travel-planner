# NakshIQ Social Media Image Library

## What This Is

A dedicated, branded image library for social media posting. Every destination gets two image formats with text overlays and NakshIQ branding — ready to drop into the autoposter without any manual design work.

## The Problem It Solves

The website images are clean destination photos with no text overlay. Social media needs something different: scroll-stopping branded visuals where someone immediately knows what place they're looking at and who posted it. This library bridges that gap.

## Output Per Destination

Each destination generates two files:

- **Feed image** (1080×1080) — Instagram/Facebook feed posts
- **Story image** (1080×1920) — Stories, Reels covers, vertical formats

Both use the same style + branding combination so there's visual consistency across formats.

## Style Rotation System

Four text overlay styles rotate by destination index (`index % 4`), preventing template fatigue in the feed:

| Style | Name | Character | When It Works Best |
|-------|------|-----------|-------------------|
| 0 | **Bold Cinematic** | Large bold italic text, bottom gradient, vermillion accent line, state label | Hero destinations, dramatic landscapes |
| 1 | **Minimal Elegant** | Frosted glass bar at bottom, clean sans-serif, state on right, nakshiq.com | Urban destinations, architectural shots |
| 2 | **Typographic Art** | Giant name fills the frame, "INDIA" eyebrow, centered dot | Short-name destinations, high-contrast photos |
| 3 | **Info Card** | "DESTINATION" eyebrow, name + score + state + elevation, hairline separator | Data-rich destinations, educational posts |

## Branding Rotation

Three branding placements rotate independently (`index % 3`):

| Variant | Name | Placement |
|---------|------|-----------|
| A | **Subtle Watermark** | Small "N." monogram, top-right corner, 70% opacity |
| B | **Branded Footer Bar** | Thin Ink Deep strip at bottom with lockup logo + "TRAVEL WITH CONFIDENCE" |
| C | **Integrated Badge** | Circular N badge top-left with vermillion dot accent |

This gives 4 × 3 = **12 unique style+branding combinations** before any repeat.

## How to Generate

```bash
# Full library — all 371 destinations
python dest_image_gen.py

# Test batch
python dest_image_gen.py --limit 10

# Single destination
python dest_image_gen.py --dest "Manali"

# Force a specific style
python dest_image_gen.py --dest "Goa" --style 2 --branding 1

# Dry run — see what would be generated
python dest_image_gen.py --dry-run

# Regenerate everything (overwrite existing)
python dest_image_gen.py --regenerate
```

## Output Structure

```
social_image_library/
├── manifest.json                          # Full index of all generated images
├── bhimtal_UT/
│   ├── bhimtal_feed_bold-cinematic_watermark.jpg
│   └── bhimtal_story_bold-cinematic_watermark.jpg
├── pahalgam_JA/
│   ├── pahalgam_feed_minimal-elegant_footer-bar.jpg
│   └── pahalgam_story_minimal-elegant_footer-bar.jpg
└── ...
```

## Autoposter Integration

The autoposter can use these images instead of raw destination photos by importing `pick_social_image()` from the library helper. See `social_image_picker.py` for the integration module.

## Fallback Behavior

Destinations without accessible photos get a branded fallback: Topo Green background with topographic-style wave lines (deterministic per destination name). This ensures every destination has a usable social image even if the photo 404s.

## Brand Compliance

All images follow the locked NakshIQ Visual Identity:

- **Colors**: Ink Deep (#161614), Bone (#F5F1E8), Vermillion Bright (#E55642), Topo Green (#2F4F3F), Saffron Gold (#C8932F)
- **Fonts**: Crimson Pro Bold Italic (display), Instrument Sans Bold (labels/tracked), JetBrains Mono Bold (data/scores)
- **Logo**: Final lockup (light variant) and N monogram from brand-pack
- **No drop shadows or bevels** — only gradient overlays for text legibility

## Maintenance

Run `python dest_image_gen.py --regenerate` when:
- New destinations are added to the database
- Brand assets or fonts are updated
- Image URLs change on the website
