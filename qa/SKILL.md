---
name: nakshiq-daily-qa
description: NakshIQ daily comprehensive QA — one test pass against https://www.nakshiq.com/, three persona reports (Developer, QA, Business Owner). Authored 2026-05-07 to replace the ephemeral in-session version that didn't persist across runs.
---

# NakshIQ Daily QA — Skill

This skill drives the daily nakshiq.com regression. The scheduled task `nakshiq-daily-test` invokes this skill.

## Inputs

- Live target: `https://www.nakshiq.com/`
- Prior findings: `qa/findings/*.json` (compare against most recent)
- Schema: `qa/findings.schema.json`

## Outputs

- `qa/findings/YYYY-MM-DD.json` (real-verification, schema-conformant)
- `NakshIQ_Developer_Report.docx` (workspace root)
- `NakshIQ_QA_Report.docx` (workspace root)
- `NakshIQ_Business_Report.docx` (workspace root)

Each .docx must be **≥10 KB** and pass an unzip + XML sanity check (`unzip -p file.docx word/document.xml | xmllint --noout -` exits 0).

## Test Matrix (sections A through K)

Run all sections in a single Chrome session. Sample at least 10 destinations. Test both `/en` and `/hi`. Use the regression matrix in the most recent prior `findings/*.json` to label each open defect FIXED / STILL_OPEN / PARTIAL / NOT_REPRODUCED / REPRODUCED.

| Section | Coverage | Key checks |
|---|---|---|
| **A — Soft-404 regression** | bad slugs, garbage month sub-routes, locale prefixes | NEW-2026-05-04-004 + NEW-2026-05-04-006 stay closed (HTTP 404, not 200) |
| **B — Destination availability + TTFB** | ≥10 random slugs from sitemap-1 | All 200; TTFB tracked (median + max) |
| **C — Hindi parity** | same 10 slugs in `/hi` | All 200, `<html lang="hi">`, Devanagari title |
| **D — SEO meta** | landing + 10 destinations + month sub-routes (12 URLs) | 0 title-stutter, canonical present, hreflang en/hi/x-default present, og:image present |
| **E — SOS completeness + phone format** | 10 destinations | ≥3 structured dialable SOS fields (see section-E note below); format-valid count = total found; no malformed; flag any dest with no `emergency_sos` row |
| **F — API smoke** | /api/chat, /api/itinerary, /api/weather, public reads | 0× 5xx; malformed/empty bodies → 400 (DEEP-Phase7-A1/A2 still closed) |
| **G — PWA / SW / manifest** | /sw.js, /manifest.json | SW version recorded; icons ≥3; shortcuts ≥5 |
| **H — Sitemap integrity** | sitemap index + each chunk | Each chunk loads; total destination URLs ≥1000 |
| **I — Core routes HTTP matrix** | 21 high-traffic routes (landing, explore, trip, ask, sos, blog, etc.) | 0 × 4xx/5xx (except expected redirects) |
| **J — Locale-routing redirect** | `/` and bare paths | 301/307 to `/en` |
| **K — Chrome E2E (interactive)** | plan/explore/destination map | Maps render (see map-type note below); no console errors after F5 |
| **L — Hero/cover images** | every destination's R2 hero | 0 missing — run `node scripts/audit-hero-images.mjs` (expects `missing: 0`). Now also automated daily by the `audit-hero-images` cron (03:50 UTC); a fresh miss emails ops next morning. See note below. |

### Section K map-type note (added 2026-06-04 — fixes a 19-day phantom "high")

There are **two different map implementations** on the site. Probe for the right one per surface, or you will report a real component as "missing":

- **`/destination/[slug]` (the cinematic hub) renders `CinematicStateMap` — an SVG atlas, NOT Leaflet.** It is a hand-drawn India silhouette (`<svg viewBox="0 0 1000 1100">` + `india-outline.svg` + a vermillion coordinate pin + "ATLAS" corner readouts) that *intentionally replaced* the old `@svg-maps/india` state-choropleth. There is **no Leaflet on destination pages** — `.leaflet-container` / `marker-pane` / `tile-pane` will always be 0, and that is **correct, not a defect**. To verify the dest-page map, assert the atlas SVG is present (`svg[viewBox="0 0 1000 1100"]` or an `india-outline.svg` reference in HTML) and renders without console errors.
- **`/explore` and `/treks` use real Leaflet** (`explore-map.tsx` / `explore-with-map.tsx` / `trek-trail-map.tsx`). A `.leaflet-container` + tile/marker probe is valid **only** on those surfaces.
- The **"Places to Visit in {dest}"** heading on dest pages is the **POI-list section header**, unrelated to the map. Do not treat "page says Places but no Leaflet" as copy-vs-widget drift — they are different components and both render fine.

Reconciliation: NEW-2026-05-17-001 / NEW-2026-06-04-005 ("Leaflet map widget missing on dest pages") were **harness false-positives** from probing for Leaflet on the atlas surface. Verified 2026-06-04: atlas SVG present in prod HTML for jaipur (`viewBox="0 0 1000 1100"` + `india-outline.svg`), `leaflet` string count = 0 by design. Label them NOT_REPRODUCED (harness-artifact), not STILL_OPEN.

### Section E SOS note (added 2026-06-04 — fixes a false "empty SOS" metric)

The SOS section is powered by the **`emergency_sos`** table, whose phone-bearing fields use **named columns** — `police`, `ambulance`, `fire`, `women_helpline`, `tourist_helpline`, `road_accident`, `rescue_contact`, `local_police_station`, `mountain_rescue`, `mechanic_contact`, `tow_service`, `embassy_emergency_line` — **plus** an optional `local_helpers[]` JSONB array whose objects may carry a `phone` key. **There is no generic `"phone"` column on `emergency_sos`.**

- **Do NOT measure SOS coverage by grepping the RSC payload for `\"phone\":\"...\"`.** That regex only catches the *incidental* `local_helpers[].phone` blobs (and any eatery/stay/POI phone), so it reports a **0** for a destination whose official SOS desk is fully populated but which simply has no informal "local helpers" listed — and it cannot see the structured `police`/`ambulance`/… numbers at all.
- **Correct SOS-completeness check:** count populated structured fields by their real names (`\"police\":`, `\"ambulance\":`, `\"rescue_contact\":`, etc.) in the payload, plus `local_helpers[]` length. **Guardrail: flag a destination if structured dialable count < 3, or if it has no `emergency_sos` row at all.** The universal `112` hero always renders and is not counted toward the 3.
- DB ground truth (2026-06-04, AFTER backfill): **all 525 destinations now have an `emergency_sos` row** with ≥3 structured dialable fields — 0 missing. The 45 previously-rowless dests (tirumala, katra, the Ashtavinayak circuit, etc.) were backfilled 2026-06-04 via an adversarially-verified workflow (`verified_by='sos-backfill-2026-06-04'`; 44 verified + katra honest-scarcity). See `post_run_verification.real_gap_discovered.resolution` in `findings/2026-06-04.json`. **Still surface the no-SOS-row count each run** — it should stay 0; a non-zero value means a new destination shipped without SOS (see [[feedback_destination_slug_allowlist_refresh]] sibling rule: new dests need SOS too).

Reconciliation: NEW-2026-06-04-004 ("ratnagiri publishes zero phone entries") was a **harness false-positive** — ratnagiri's `emergency_sos` is complete & verified (police 100, ambulance 108, fire 101, women 1091, road 1073, tourist 1800-599-0019, rescue_contact "Collectorate 02352-226248; Police HQ 02352-222222; Coast Guard 1554", Civil Hospital Ratnagiri). It just has `local_helpers = []`. Label NOT_REPRODUCED; do NOT backfill (would fabricate over complete, verified data).

### Section E SOS-helpers / `local_helpers` metric — pin to RENDERED fields (added 2026-06-09 after a false "405→186 data loss" alarm)

"Curated local helpers" lives in **three different places that are NOT interchangeable.** Measuring coverage against the wrong one manufactures a phantom regression — this is exactly what happened 2026-06-09 (NEW-2026-06-09-001, RESOLVED false alarm): the run measured `emergency_sos.local_helpers` (186) and diffed it against a carried-forward 405 that had actually been measured from `destinations.deep_dive.local_helpers`.

| Source | Rendered by | Coverage (2026-06-09) | Use as the coverage metric? |
|---|---|---|---|
| `emergency_sos.local_helpers` (jsonb array) | `emergency-sos.tsx` — SOS-section sub-list | 178/525 non-empty (post fabrication-purge + 15-number double-verified re-backfill) | ✅ YES — site-rendered |
| `confidence_cards.people_who_help` (jsonb array) | `confidence-card.tsx` — "People who help" card | 491/525 present (websites, not phones) | ✅ YES — site-rendered |
| `destinations.deep_dive->'local_helpers'` (jsonb array) | **nothing — no component reads it** | 405 blocks / 589 entries (was 867; 278 fabricated numbers purged 2026-06-09) | ❌ NO — unrendered backing store |

> ⚠️ **`destinations.deep_dive.local_helpers` WAS fabricated at scale.** A 2026-06-09 adversarial audit of all 108 distinct "real" numbers across deep_dive + emergency_sos found **only 21 verified / 33 wrong / 54 unverifiable — 80% NOT confirmed** (hyper-local "Army post / temple trust / taxi union / pharmacy" entries with sequential …222200/222500/222600 numbers were generated; one fabricated HP-Police number was LIVE on `great-himalayan-np`). All 90 unverified numbers were PURGED from both fields (kept only the 18 official-govt-verified + national short-codes + the 1363 helpline). Verified official replacements for ~20 state desks are recorded but NOT re-added — see `data/audits/sos-fabrication-purge-2026-06-09.md`. **Rule: emergency numbers must be verified per-number against an official .gov.in/.nic.in source, or shown as honest scarcity — never pattern-generated.**

- **Measure curated-helper coverage ONLY against the two site-rendered fields.** **Never** report `destinations.deep_dive.local_helpers` as a coverage number — no user ever sees it (it's real data but invisible; it was the source of the historical "405 / 867").
- **Always compare run-over-run against the SAME field/table.** A delta is a regression only if `current` and `prior` came from the *same* column. **If you change which field you measure, RESET the baseline and say so explicitly** — do NOT diff a new field against a number carried forward from a different field. (General rule, applies beyond SOS.)
- **Canonical SQL** (small aggregate over MCP — egress-safe):
  ```sql
  SELECT
    (SELECT count(*) FROM emergency_sos
       WHERE jsonb_typeof(local_helpers)='array' AND jsonb_array_length(local_helpers)>0)        AS es_localhelpers_nonempty,   -- ~205, the SOS sub-list
    (SELECT count(*) FROM confidence_cards
       WHERE jsonb_typeof(people_who_help)='array' AND jsonb_array_length(people_who_help)>0)     AS people_who_help_nonempty;    -- ~491, the rendered card
  ```
- **`emergency_sos` has NO `updated_at` auto-trigger.** Re-verify jobs stamp `verified_date`/`verified_by` without bumping `updated_at` (it sat at 2026-06-04 while 466 rows were re-stamped 2026-06-09). So **do not use `emergency_sos.updated_at` to date content changes** — use `verified_date` + a content diff.
- OPPORTUNITY (not a defect, tracked separately): `deep_dive` holds 405 phone-bearing helper sets but only 186 reached the rendered `emergency_sos.local_helpers` — the SOS sub-section could be enriched 186 → up to 405 from `deep_dive`.

### Section L hero-image note (added 2026-06-20 after the Sikkim black-card incident)

A destination with no R2 hero (`destinations/<id>.jpg`) renders a **black card** in the landing-page Dailies reel (Act VI) and a broken full-bleed hero on its detail page. The Dailies reel orders by freshest `content_reviewed_at`, so a **newly-added** destination is the *most* likely to surface image-less — that's how the 8 Sikkim dests (added 2026-06-14, no images) showed 3 black cards on the landing page for 6 days. Root cause: a seed/backfill that adds destinations does **not** add hero images; that's a separate `node scripts/upload-images.mjs` step.

- Manual check: `node scripts/audit-hero-images.mjs` → `qa/hero-images.json` must show `missing: 0`.
- This is now also automated: the **`audit-hero-images` cron** (daily 03:50 UTC, `apps/web/src/app/api/cron/audit-hero-images/route.ts`) HEAD-probes every hero and emails ops the morning after any destination goes image-less. So a new gap no longer waits for a manual QA pass.
- Fix when flagged: source a real, **place-accurate** (visually verify it — the Mangan→Gurudongmar trap), **license-clean** (Wikimedia Commons CC) image → `apps/web/public/images/destinations/<slug>.jpg` → `node scripts/upload-images.mjs`. Record provenance like `data/destinations/hero-image-sources-sikkim-2026-06-20.json`.

## Cost-aware operating rules (per CLAUDE.md)

- Reduce sub-agent fan-out — prefer direct curl/Python over delegating to a sub-agent for HTTP probes.
- Don't run Lighthouse or full axe-core daily unless the site shipped material changes since the last deep pass (`qa/findings/2026-05-04-deep/` is the canonical perf+a11y baseline).
- Skip Playwright if the Chrome MCP isn't connected — flag the gap honestly instead of hallucinating values.

## Non-negotiables

1. **Real verification only.** No fabricated TTFB numbers, no estimated phone counts, no inferred regression statuses. Every metric in `findings.json` must be backed by a tool call output captured in `qa/findings/YYYY-MM-DD/*.csv` or equivalent artifact.
2. **Sample ≥10 destinations** in section B. Random selection from sitemap-1.
3. **Test both English and Hindi.**
4. **Compare against the BUG-001…BUG-N regression matrix** carried in the most recent prior findings.
5. **Honest scarcity over fabrication.** If a check can't be run (Chrome not connected, axe not installed, etc.), report `not_run` with a one-line reason — never invent a result.

## Workflow

1. Read most recent `qa/findings/*.json` to load the regression matrix.
2. Execute sections A through K (parallel where independent).
3. Write `qa/findings/YYYY-MM-DD.json` conforming to `qa/findings.schema.json`.
4. Run the three generators:
   ```bash
   cd /Users/ashishtaneja/Desktop/India\ Travel\ Planner/qa
   node generate_developer_report.js
   node generate_qa_report.js
   node generate_business_report.js
   ```
5. Verify: each .docx exists in workspace root, is ≥10 KB, and unzips cleanly.
6. Post end-of-run summary: new defects, prior-bug status changes, blockers.

## Personas

The three .docx outputs target different audiences:

- **Developer Report** — full technical detail, every metric, every commit hash, raw probe outputs. Owner: engineer triaging defects tomorrow morning.
- **QA Report** — pass/fail per section, regression-matrix table, evidence per finding, recommended next checks. Owner: QA reviewer confirming closures.
- **Business Owner Report** — one-page-equivalent, headline metrics + traffic-light status + risk callouts. No code, no commit hashes. Owner: Ashish.

All three reports are generated from the **same** `findings.json` — the generators select different fields and wording, never recompute or re-probe.

## Failure modes (and what to do)

- **Chrome MCP not connected** → skip section K, set `phases_skipped` entry, continue.
- **/api/* endpoint returns 5xx** → record exact body, severity = high, do NOT retry; flag as new defect.
- **A prior CLOSED bug returns to OPEN** → record as REGRESSION with severity = high.
- **Cannot reach nakshiq.com** → halt the run, write a minimal findings.json with `run.status = "aborted"` and the network error, exit non-zero.
