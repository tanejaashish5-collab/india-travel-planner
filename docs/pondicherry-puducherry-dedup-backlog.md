# Pondicherry ↔ Puducherry duplicate destinations — editorial-merge backlog

**Status:** Parked 2026-05-25. Surfaced during the SOS verification email triage; the audit found `destination_id='pondicherry'` (state_id='tamil-nadu', wrong) running in parallel with `destination_id='puducherry'` (state_id='puducherry', correct). De-dup paused once content scan revealed conflicting prose across both sides.

**Reason parked:** Not a 30-minute SQL job. ~15–25 editorial decisions ("which Baker Street writeup wins"), plus 24 cost-row pairs that systematically diverge ~10–15%, plus 12 month-row pairs likely the same pattern. Needs a quieter editorial hour, not in-session execution.

**Visible bug right now:** ~~`destinations.state_id='tamil-nadu'` for the `pondicherry` row tags Puducherry (a Union Territory) as a Tamil Nadu destination.~~ **Fixed 2026-05-25 — `UPDATE destinations SET state_id='puducherry' WHERE id='pondicherry'`.** Both pages keep running with correct state tag. Duplicate still appears in the weekly SOS audit email until merged.

**Re-examine trigger:** Pull last-90d GSC for `/destination/pondicherry` vs `/destination/puducherry`. If both rank for the same queries (cannibalization), do the merge below. If only one ranks, leave both — nothing's bleeding.

## What's already done (DB writes already applied 2026-05-25)

- `emergency_sos.destination_id='pondicherry'` row: verified=false, source_url=NULL, source_label='Wrong-state assignment flagged — Puducherry is a Union Territory, not a Tamil Nadu destination. Canonical SOS row is on destination_id=puducherry. Resolve via destination de-dup.'
- `emergency_sos.destination_id='puducherry'` row: already verified 2026-05-04 with `puducherry-dt.gov.in/helpline/` + police.py.gov.in (the canonical SOS source for the UT).

## Blast radius — every table referencing destinations.id='pondicherry'

26 FK tables checked. The 14 with rows:

| table | FK col | pondicherry rows | puducherry rows | conflict type |
|---|---|---:|---:|---|
| destination_costs | destination_id | **24** | **24** | systematic 10–15% value divergence — independent costing passes |
| destination_months | destination_id | **12** | **12** | not sampled; likely same pattern as costs |
| sub_destinations | parent_id | **7** | **2** | 2 name-collision pairs (French Quarter / Rock Beach); 5 pondi-only entities (Auroville, Bharathi Park, Paradise Beach, Serenity Beach, Sri Aurobindo Ashram) |
| local_eateries | destination_id | **6** | **7** | 4 same-name independent writeups (Baker Street, Cafe des Arts, Coromandel Cafe, Surguru); 1 pondi-only (Tanto Trattoria); 2 puducherry-only (Cafe Xtasi, Le Cafe Promenade) — Villa Shanti exists as "Villa Shanti" (pondi) vs "Villa Shanti Restaurant" (puducherry) |
| destination_stay_picks | destination_id | **4** | **4** | same 4 slots filled with DIFFERENT properties on each side — see "Stay picks conflict" below |
| hidden_gems | near_destination_id | **3** | **4** | mixed; Paradise Beach appears as hidden_gem on puducherry side AND sub_destination on pondi side (cross-table dup) |
| local_stays | destination_id | **3** | **2** | all 5 unique by name (Accord Puducherry, Le Dupleix, Villa Shanti on pondi; Palais de Mahe, Sri Aurobindo Ashram Guest Houses on puducherry) |
| confidence_cards | destination_id | 1 | 1 | not sampled |
| emergency_sos | destination_id | 1 | 1 | resolved per "Already done" above |
| festivals | destination_id | 1 | 2 | "Bastille Day Celebration" (pondi) duplicates "Bastille Day" (puducherry); Pongal only on puducherry |
| kids_friendly | destination_id | 1 | 1 | not sampled |
| local_legends | destination_id | 1 | 1 | "French Quarter Heritage Walkers" (pondi) vs "French Quarter Heritage Guides" (puducherry) — same concept |
| tourist_trap_alternatives | trap_destination_id | 1 | 1 | not sampled |
| viral_eats | destination_id | 1 | 2 | "Cafe des Arts" on both; "Baker Street" only on puducherry |

**Tables with zero rows on either side:** camping_spots, destination_alerts, luxury_experiences, permits, points_of_interest, questions, reviews, road_reports, safety_reports, superlatives, tourist_trap_alternatives.alternative_destination_id, traveler_notes, treks, trip_reports.

## Stay picks conflict (worth showing because it's the cleanest illustration)

Both sides have all 4 stay-pick slots filled with DIFFERENT recommended properties:

| slot | pondicherry | puducherry |
|---|---|---|
| value | Accord Puducherry | Maison Perumal Guest House |
| location | La Villa Pondicherry | Dupleix Hotel |
| xfactor | Le Dupleix | Balkonbay Guest House |
| experience | Villa Shanti | Promenade Hotel |

Note Le Dupleix appears as both a stay-pick (pondi side, `xfactor` slot) AND a local_stay (pondi side). Internal duplication within pondi's own dataset.

## Costs conflict (illustrative — pattern is systematic across all 24 rows)

| category | season | pondi typical | puducherry typical | gap |
|---|---|---:|---:|---|
| activity-sample | low | ₹950 | ₹1,050 | +11% |
| activity-sample | peak | ₹2,050 | ₹2,400 | +17% |
| food-per-day | low | ₹490 | ₹550 | +12% |
| hotel-mid | peak | ₹5,200 | ₹6,100 | +17% |
| hotel-splurge | peak | ₹16,500 | ₹19,000 | +15% |
| transport-taxi-day | shoulder | ₹2,850 | ₹3,300 | +16% |

Two costing passes done at different times with different sourcing/inflation assumptions. Neither is obviously wrong; one must be picked or they must be averaged/re-sourced.

## Recommended path when picking this up

**Step A — decide canonical side (10 min, editorial):** Read `/destination/pondicherry` and `/destination/puducherry` on prod. Pick whichever reads better as the canonical. The duplicate `pondicherry` row has more sub-destinations (7 vs 2) and more stays (3 vs 2); `puducherry` has more eateries (7 vs 6) and more festivals (2 vs 1). Net richness is roughly tied.

**Step B — merge the obvious uniques (20 min, SQL):** For each table, UPDATE FK from the losing side → canonical side WHERE the row's `name` does NOT exist on the canonical side. Conflicts (same-name pairs) get the canonical side's version kept.

**Step C — purge losing side's remaining rows (5 min):** DELETE FROM `<each table>` WHERE destination_id='<losing slug>' AFTER step B. Then DELETE FROM destinations WHERE id='<losing slug>'.

**Step D — 301 redirect (10 min, code):**
- Add to [apps/web/src/middleware.ts](apps/web/src/middleware.ts): `/destination/<losing slug>` → `/destination/<canonical slug>` (en + hi)
- Bump `CACHE_VERSION` in [apps/web/public/sw.js](apps/web/public/sw.js) so PWA users get the new routes
- Per project rule: `/destination/*` markup changes always require the SW bump (see memory `project_sw_cache_version_bump_on_destination_changes`)

**Step E — GSC + sitemap (15 min, post-deploy):**
- Re-validate `/sitemap.xml` doesn't list the deleted slug
- GSC: submit the deleted URLs for removal, confirm the redirect resolves cleanly
- Re-check the destination_id field on the `internal_links` / `vs-pairs.generated.ts` etc. — anywhere a hand-pinned slug might break

**Step F — verify the cron stops flagging it:**
- The SOS audit email and the `destinations` queries should no longer return the duplicate
- Run [scripts/audit-emergency-numbers.mjs](scripts/audit-emergency-numbers.mjs) — duplicate row should be gone

## Pre-merge sanity check (cheap to do anytime, run before Step A)

Verify whether the duplicate slug has any external inbound links worth preserving:

```bash
# GSC: which URL has more impressions over last 90d?
node scripts/data-pull.mjs cohort --pages '/destination/pondicherry,/destination/puducherry'
```

Whichever slug has higher GSC impressions is the one to KEEP (regardless of editorial richness), because losing indexed URLs costs traffic. A 301 will preserve some equity but not all.

## Related memory

- [[session_2026_05_25_ops_emails_fix_and_sos_apply]] — the SOS audit that surfaced this
- [[project_sw_cache_version_bump_on_destination_changes]] — SW rule for destination changes
- migration 052 (no-placeholder-phones trigger) — unaffected by this merge but constrains any UPDATE on emergency_sos
