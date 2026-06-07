# How-to-reach / distance surface — competitive validation

**Date:** 2026-06-07 · **Trigger:** opportunity-scout new-surface find (intent "how-to-reach", 1,382 impr / 604 queries / 90d, partially served by `/arrival/[iata]`)
**Method:** 4-agent competitive-landscape workflow (real SERP searches per sub-intent) → adversarial synthesis, cross-checked against the live codebase + DB (`dudzsdzfvikjjhurxrgc`).
**Verdict:** `strengthen-existing-instead` · confidence **0.78**

> **One line:** Do NOT build a generic `/how-to-reach` or distance route family — Maps + AI Overview own it (64–83% zero-click, low decision value). The two genuinely-winnable moves are (1) enrich the thin name-only "HOW TO REACH" block already on every destination hub, and (2) a NARROW verified `/pilgrimage/[slug]` surface for 15–25 highest-demand sacred circuits.

---

## SKIP (red ocean — validated, not assumed)

1. **Standalone `/how-to-reach/[destination]` route family.** AI Overview fires on 48–83% of travel-informational queries with synthesized transport answers; Google Maps "Ask Maps" (India, Mar 2026) + distance cards + knowledge panels resolve the head in-SERP. Rome2Rio (Google-owned, 8000+ route pairs, knowledge-panel integration) and MakeMyTrip route planner give COMPLETE zero-click answers (e.g. Delhi–Jaipur: 281km / 3h53m / trains / bus / flight inline) with transaction gravity a new brand can't match. Worse: the demand is **already rendered inside the destination hub** (502/525 dests have nearest_airport, 500/525 nearest_railhead) — a parallel route just splits authority and cannibalizes the page Google already indexes.
2. **Point-to-point distance lookups** ("distance from X to Y", "nearest airport to <place>"). LOW decision value — the user wants a number, not a choice. AI Overview answers ~99% of these; distance-calculator domains (distancesto.com, calculator.net, distance.to) have 10+ yrs authority; 64.82% of all Google searches are zero-click. 2 of 4 agents independently rated this **winnable=no**. Building for it burns crawl budget on pages that never earn a click.
3. **Raw parikrama-distance-only pages** (the Sacred Yatra / mapsofindia commodity play). Bare distance numbers land in the same zero-click SERP (77% mobile / 65% desktop on "how to reach <temple>"). Only the verified + phased-itinerary + crowd/cost depth layer is defensible.

---

## WIN #1 (highest ROI) — strengthen the existing hub transport block (in-place, NOT a new route)

- **The weakness:** `destination-detail-cinematic.tsx` (~lines 1922–2010) already renders a "HOW TO REACH" block, but as **name-only** airport/railhead boxes — no km, drive duration, mode comparison, or seasonality.
- **The moat nobody else has:** month-gated access. Rome2Rio/MakeMyTrip/Maps structurally flatten seasonal variance; NakshIQ is the only one that can say "Tungnath road closed Nov–Apr", "Manali highway monsoon-risk Jun–Sep" by tying logistics to `destination_months` (6,300 rows / 6,201 verdicts / 3,054 skip_reasons already in DB).
- **Shape:** add `distance_km` + `drive_hours` columns (NEW data → anti-fabrication backfill vs govt portals, same discipline as POI/SOS/festival passes) + a per-month "access this month" caveat from `destination_months.skip_reason` where it names a road/snow/monsoon closure. Surfaces on `/destination/[id]` + `/destination/[id]/[month]` — pages Google already indexes — so it harvests the long-tail "how to reach <dest>" + Hindi "<dest> kaise jaayein" demand on **existing authority**, no cold route family.

## WIN #2 (the one genuinely-new defensible surface) — narrow verified `/pilgrimage/[slug]`

- **Why it's the ONE winnable new surface:** incumbents (Sacred Yatra, Yatra.com, tirthayatra.org) HAVE the volume but their distances are **unverified operator-copy with no source attribution** (confirmed via WebFetch). AI Overviews are currently stitching those unverified snippets — exactly the gap NakshIQ's anti-fabrication DNA exploits (cross-check every km-mark vs temple-trust/govt sources). Pilgrimage planning is sticky, repeat, high-engagement travel-DECISION intent — not a throwaway lookup.
- **Existing assets:** 167 dests already tagged pilgrimage/temple/sacred; seed migrations 047–050 exist; aligns with the 2026-06-07 Basesh-Gala scout's "/pilgrimage" top pick.
- **Shape:** mirror the proven `/cost/[slug]` + `/safari/[slug]` pattern — a `pilgrimage_routes` sidecar table holding verified leg distances, step counts, elevation, helicopter/pony/foot alternatives, stage-wise crowd + cost. **Start SMALL: 15–25 highest-demand verified circuits** (Char Dham, Vaishno Devi, the chitrakoot/shatrunjaya/parikrama queries the scout actually saw), every distance carrying a visible govt/temple-trust citation. Gate expansion on real GSC impression pickup. Bilingual. Reuse slug-allowlist + cached-data + sitemap-chunk plumbing.

---

## Risks / guardrails
- **Zero-click ceiling:** even the winnable pilgrimage long-tail faces AIO + Maps on the head distance query; clicks come from the PLANNING depth (itinerary/cost/crowd), not the distance number. Measure on engaged-page intent, not raw distance impressions.
- **New data, not just rendering:** `distance_km`/`drive_hours` and shrine-to-shrine legs don't exist yet → needs an anti-fabrication backfill (find-then-independently-verify; the project's verifiers both over-flag AND mis-correct — never write-and-trust).
- **Authority dilution:** a broad programmatic route cannibalizes the hub → strengthen-in-place for transport + a NARROW `/pilgrimage` only.
- **Scope creep:** 167 tagged dests is tempting; ship highest-demand verified circuits first, let impressions gate expansion (cost-aware fan-out rules).
- **Plumbing:** any new `/pilgrimage` slugs must refresh `known-destination-slugs.json` + bust reference caches in the SAME PR or middleware 404s them.

## Status
Validation only — **no build started.** Both wins require founder go (new schema/migration + anti-fabrication data backfill + component/route code). Awaiting decision on whether to build Win #1, Win #2, both, or neither.
