# Move A — Decision-query slot validation

**Date:** 2026-05-28
**Plan:** `~/.claude/plans/so-i-want-to-snoopy-valiant.md` (Move A — Week 1 gate)
**Method:** 3 Haiku research agents ran WebSearch on 30 queries across 3 buckets, captured top-10 SERPs, judged incumbent strength and content-type dominance per query, returned GREEN/YELLOW/RED verdicts.

---

## Bottom-line verdict: **YELLOW (narrow scope)**

The original Move C scope ("/best/[interest]-in-[month]" generic surface) was overly broad. The validation pushes the surface in a narrower, more honest direction. **Recommendation: proceed with Move C, but scoped to two specific patterns.** Skip the patterns the SERPs show as walled.

### Verdict per bucket

| Bucket | Verdict | Why |
|---|---|---|
| Month + persona (10 queries) | **YELLOW** | Generic month queries are listicle-dominated (Holidify, MakeMyTrip, Thrillophilia). Persona-variants (e.g., "october with kids", "january honeymoon", "couples in india") show under-served angles. |
| N-days + weekend (10 queries) | **RED** | "5 days in [region]" + "weekend getaway from [city]" are walled by listicle aggregators (Holidify, Thrillophilia) and tour-operator package pages (TravelTriangle, TravelOgy, ThomasCook, IndianHoliday). |
| Interest + state-offbeat (10 queries) | **RED at state level, YELLOW/GREEN at destination level** | State-level "best in [state]" walled by TripAdvisor + official tourism boards + Holidify + MakeMyTrip. Destination-level + activity/season depth pages are winnable. |

---

## Strategic implication (the part that actually matters)

The original Move C URL shapes proposed in the plan were:
- `/best/[interest]-in-[month]` — partial win (only persona-shaped, not generic)
- `/[city]/weekend-getaways-in-[month]` — **DROP**
- `/[N]-days-in-[region]` — **DROP**
- `/where-to-go-in-[month]-with-[persona]` — **KEEP, this is the winnable shape**

**The winnable surface is a narrower one than the plan assumed:**

### Surface 1 — Persona × month (the "where to go in [month] with [persona]" shape) — YELLOW, BUILD
- `/where-to-go-in-october-with-kids` / `/best/october-with-kids-in-india`
- `/best/january-honeymoon-india`
- `/best/december-with-family-india`
- `/best/march-couples-india`
- `/best/places-for-couples-in-india` (season-agnostic — GREEN sub-query)

**Why winnable:**
- Persona dimension is poorly differentiated in current SERPs. Family/kids angle only appears at positions 5-7 (StayVista, ClubMahindra). Honeymoon listicles are clichéd (same 8 destinations rotated). Couples queries show Quora at #5 — trust gap.
- NakshIQ has the underlying data competitors don't: kid-friendly stays, family-friendly eateries, month-verdict scores, festival overlap, road conditions.
- Estimated count: ~50 persona × month combinations (5 personas × 12 months, minus low-intent combos) + ~10 season-agnostic persona pages.

### Surface 2 — Destination × experience/season depth — GREEN, BUILD (lower priority)
- `/spiti/3-day-loop`, `/cherrapunji/monsoon-hiking`, `/ziro-tawang-itinerary`, `/kanchenjunga-base-camp-trek`
- Long-tail destination queries like "best stays in Munsiyari", "Cherrapunji monsoon hiking"
- These overlap with existing destination/month pages — partially Move D territory.

**Why winnable:**
- Destination-level pages where NakshIQ already has 505 dests + 167 treks + verified eateries/stays + month verdicts.
- Incumbents at this level are personal blogs + operator pages, not Holidify/TripAdvisor scale.

### Surfaces to NOT build (RED)
- ❌ `/[N]-days-in-[region]` (5 days in himachal, 10 days in northeast) — Travel Triangle, Holidify, ThomasCook, operator-package wall.
- ❌ `/weekend-getaways-from-[city]` — Holidify 79-counts, Thrillophilia 55-counts, MakeMyTrip trip-ideas, government tourism. Listicle volume insurmountable.
- ❌ Generic "best places to visit in india in [month]" — MakeMyTrip + Holidify own 50-count listicles.
- ❌ Generic "best [season] destinations india" (winter, summer, May, monsoon) — OTA + operator + government wall.
- ❌ "Best offbeat places in india" / "best offbeat hill stations" — Holidify, TravelTriangle, Tripoto own with 25-52 destination listicles.
- ❌ "Best [activity] in india" at national scale (wildlife, trekking) — Lonely Planet + National Geographic + specialist operators.

---

## Key incumbents to understand

| Incumbent | Appearances | What they own | How they win | NakshIQ vs them |
|---|---|---|---|---|
| Holidify | 8/30 | Generic month + state + offbeat listicles | Mega-listicles (30-79 count), domain authority, backlinks | NakshIQ has depth, they have breadth + SEO authority. Avoid head-to-head. |
| TravelTriangle | 7/30 | Generic listicles, "offbeat" state pages | Operator scale + content aggregation | Avoid. |
| Thrillophilia | 6/30 | Listicles + booking integration (weekend getaways especially) | Booking funnel + listicle depth | Avoid. |
| MakeMyTrip | 5/30 | Month queries, weekend getaways, trip-ideas tool | OTA booking authority + 56-count listicles | Avoid head-to-head on transactional queries. |
| TripAdvisor | 4/30 explicit | State-level "best places" pages | UGC + reviews + booking | Avoid at state level. |
| Tripoto | 3/30 | Community trips + offbeat lists | Social/peer reviews | Coexist — different shape. |
| Lonely Planet | 2/30 | Activity authority pages (wildlife, trekking) | Editorial authority | Avoid head-to-head. |
| Official tourism boards | 4/30 (incredibleindia.gov.in, esikkimtourism.in, uttarakhandtourism.gov.in, arunachaltourism.com) | State portals | Government authority | Coexist — they don't update much. |
| Tour operators (ThomasCook, SOTC, JustWravel, Travelogy India) | ~10/30 combined | Package pages on "5 days in [region]" + "[month] travel" | Booking authority | Avoid head-to-head. |
| Quora | 3/30 | Persona + decision queries | UGC trust gap | **Positive signal** — Quora at #4-5 means incumbent listicles don't satisfy the question. |

---

## Updated Move C scope (post-validation)

**Build (in priority order):**

1. **Persona × month landing pages** (~50-70 URLs)
   - URL pattern: `/[locale]/best/[persona]-in-[month]-india` and variants
   - Personas: kids/family, couples, honeymoon, solo, parents
   - Data joins: `destination_months` (verdict + scores), kid-friendly + couple-friendly attribute flags on destinations, family-friendly stays from `local_stays`, family-friendly eateries from `local_eateries`, festivals, road conditions.
   - Bilingual.
2. **Persona-only landing pages** (season-agnostic, GREEN sub-queries) (~5-10 URLs)
   - `/best/places-for-couples-in-india`, `/best/family-friendly-destinations-india`, `/best/solo-female-friendly-india` (already has data per memory `solo-female/`)
3. **Destination × experience depth pages** (~30-50 URLs, lower priority, partial Move D overlap)
   - URL pattern: `/[locale]/[dest-slug]/[experience-or-route]`
   - Examples: `/spiti/3-day-loop`, `/cherrapunji/monsoon-hiking`, `/ziro/apatani-cultural-tour`
   - Only for destinations where NakshIQ has rich existing data (~50-100 dests qualify).

**Drop from original Move C scope:**
- `/[city]/weekend-getaways-in-[month]`
- `/[N]-days-in-[region]`
- Generic `/best/[interest]-in-[month]` (only persona-shaped survives)

**Estimated final URL count:** ~85-130 new pages (vs. the originally implied 500+ for the broader scope) — much narrower, higher conviction.

---

## Counter-signals to watch

- **Holidify and Thrillophilia are starting to add persona angles** (e.g., "best places with family"). If they pivot in the next 6 months, our YELLOW could turn RED. Re-run this validation in 3 months on the persona+month bucket.
- **Quora + Reddit at top-10 positions** signal trust gaps — those are NakshIQ's opportunity. Build the answers Quora threads ask.
- **NakshIQ has zero top-10 presence across all 30 queries.** The bigger lever may not be new programmatic surfaces but content/CRO on existing destination pages (Move D) — incumbents on destination-level queries are weaker.

---

## What this means for the 90-day plan

The 90-day plan stays the same structurally, but Move C scope changes:

- **Move A:** ✅ DONE (this document).
- **Move B (/vs/ scale-up):** Unchanged. Proceed as planned.
- **Move C (programmatic surface):** Scope narrowed. Build persona×month + destination×experience surfaces only. Drop weekend / N-days / generic month surfaces. Smaller build, higher conviction.
- **Move D (dest/month CRO):** Promoted slightly in priority — the validation shows incumbents are weaker at destination-detail level. Verdict-block on existing dest/month pages may be higher leverage than originally thought.

**Honesty call:** With Move C narrowed to ~100 URLs (down from 500+), the 90-day MUV uplift from this surface is more modest — realistic 10-25K MUV target from the 3-move package is still correct, but Move B (/vs/ scale 447→1500-2000) is now doing more of the lifting than Move C.

---

## Raw agent output

Stored separately if needed (each agent returned a 3000-4000 word structured report). Summary above captures the load-bearing findings — full agent text available on request.
