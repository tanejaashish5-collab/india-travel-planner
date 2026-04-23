# NakshIQ editorial voice brief

Single source of truth for copy across the NakshIQ web app. Use this
when writing a new component, a new page, or rewriting existing strings.

## Who we write for

Travelers — Indian or international — who have already done the
obvious trips (Goa, Golden Triangle, Kerala) and are evaluating
something deeper. They're planners, not browsers. They come here to
decide, not to scroll.

They want: "should I go, and what should I actually know?"
They don't want: photos with captions, influencer enthusiasm, or a
travel dashboard.

## Tone

Confident but honest. "Here's what works. Here's what doesn't." Not
"Amazing!" Not "Hidden gem!" Not "Ultimate guide!"

FT Weekend India supplement, Monocle city guides, *The Gentlewoman*
travel pieces. **Not** MakeMyTrip, Lonely Planet, TripAdvisor.

## Typographic discipline

- Sentence case for headings. Not TitleCase. Never UPPERCASE.
- Short declarative overlines: 2–3 words. Not "Seasonal Intelligence"
  or "Just-in-Time Operations". Say "In season" or "On the ground."
- Natural prose beats label-bullet-label. A single sentence with
  numerics inline is better than four stat-chips in a row.
- Softer tracking on uppercase labels when they're unavoidable:
  `tracking-[0.08em]`, not `tracking-widest` or `tracking-[0.22em]`.
- Single serif (Fraunces) for display. Single sans (Geist) for
  everything else. Geist Mono reserved for tabular numerics only.

## Copy discipline

**Write:**

- Sentence-case headings
- Short overlines (2–3 words)
- First-person editorial where it lands well: "we'd send you here for…"
- Numeric prose: "45 destinations · 12 good for kids this month" (not
  a stat-row with 4 all-caps chips)
- Verbs that imply reading, not clicking: "See", "Read", nothing at all
  (the arrow conveys the action)

**Don't write:**

- Dashboard jargon: *Data-scored*, *Filters*, *Results*, *Dimensions*,
  *Metrics*
- Product verbs: *Tap to X*, *Click to X*, *Show more*, *Load more*,
  *Get started*, *View all*, *Open*, *Explore*
- Travel-influencer words: *hidden gem*, *must-visit*, *paradise*,
  *ultimate*, *unforgettable*, *breathtaking*
- SaaS section names: *Intelligence*, *Operations*, *Playbooks*,
  *Resources*, *Insights*

## Preserve meaning

Where a label maps to a specific data field, keep the concept and fix
the styling alone. Don't change what the label means.

Examples:

- `Kids Friendly` (maps to `kids_friendly_count` in DB) → `Good for kids`,
  not `Family-friendly` (which would imply the whole-family vibe, a
  different concept)
- `Best months` (maps to `region.best_months` boolean array) →
  `Best time to visit`, not `Peak season` (which drifts semantically)
- `Regions within {state}` (maps to `region.subregions`) → `By region`,
  not `Local areas` (different scope)

## Examples (before / after)

| Before | After |
|---|---|
| KNOW BEFORE YOU GO | Know before you go |
| DATA-SCORED · Tap for April deep-dive | Our take for April in detail |
| Must Visit in Uttarakhand | Don't miss |
| Show 12 destinations | See 12 fair options |
| Where NOT to Go | Where to skip |
| Just-in-Time Operations | On the ground |
| Travel Intelligence | Field guides |
| METHOD · 6 DIMENSIONS · REVIEWED | 6 dimensions · reviewed Apr 2026 |
| Tap to expand | *(drop — chevron conveys it)* |
| Click to open → | → *(arrow alone)* |

## Hindi parity

Every new user-facing string wraps in `next-intl` i18n keys with a
Hindi translation. Literal translations are fine (`"Known for"` →
`"के लिए प्रसिद्ध"`). No raw English strings in Hindi locale.

## When in doubt

Read it aloud. If it sounds like a dashboard, rewrite it. If it sounds
like a travel influencer, rewrite it. If a friend who has done Goa
twice would roll their eyes, rewrite it.

Good voice sounds like a trusted travel editor — not a recommendation
engine.
