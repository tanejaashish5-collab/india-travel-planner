# SOS local_helpers fabrication audit + purge — 2026-06-09

## Trigger
Founder directive after the deep_dive→SOS enrichment surfaced fabricated numbers:
"re-verify these 405 Deep Dive Helper Blocks … make sure everything is fixed. No fake
data ever. That's our rule." Earlier in the day we assumed the SOS backfill was fully
verified; it was not.

## Scope
`local_helpers` lives in two phone-bearing fields:
- `destinations.deep_dive.local_helpers` — 405 blocks / 867 entries (UNRENDERED backing store)
- `emergency_sos.local_helpers` — 205 non-empty (the SOS section sub-list, via `emergency-sos.tsx`)
- (`confidence_cards.people_who_help` carries websites, NOT phones — not a fake-phone vector.)

Across both fields there were **108 distinct "real" numbers** (excluding national short-codes
100/108/112/1091/1073/1363, which are constants and always kept) over 462 entries.

## Verification — 108 numbers, 18 Haiku batch-agents, official-source bar
Each number checked against an official .gov.in/.nic.in or the agency's own site.

**Result: 21 verified · 33 wrong · 54 unverifiable → 87/108 (80%) NOT confirmed.**
The deep_dive backfill had fabricated emergency contacts at scale — especially hyper-local
"institutions" (Army posts, ITBP posts, temple trusts, taxi unions, pharmacies, ropeway/ski
staff) with tell-tale sequential/round numbers (…222200 / …222500 / …222600) and "ONLY reliable
contact" claims. One fabricated number — HP Police Control Room `0177-2621100` — was LIVE in the
rendered SOS section of `great-himalayan-np`.

## Keep rule (strict, defensible): verified AND source_authority=official-govt → 18 kept
0135-2559898 (UK Tourism), 01982-252010 (Leh DA), 0361-2547102 (Assam Tourism), 1800-233-7777
(MP Tourism), +91-11-23365358 & 011-23365358 (Delhi Tourism), +91-1374-222123 (NIM Rescue
Uttarkashi), +91-172-2756565 (PGIMER), 0522-2308916 (UP Tourism), 03592-221634 (Sikkim Tourism),
033-22143024 (Kolkata Police), 0612-2201977 (Patna Police Control Room), 0389-2333475 (Mizoram
Tourism), 0172-2702955 (Haryana Tourism), 0172-2749194 (Chandigarh Police), 03776-262429
(Kaziranga Range Office), 0542-2506670 (Varanasi Tourist Police), 0562-2421204 (Agra Tourist Police).

3 "verified" verdicts were dropped as too weak to keep: 1800-180-1116 / 1800-345-3006 (only
"corroborated" via our OWN production DB — circular) and 0172-2748100 (aggregator only).

## Purge applied (in-place UPDATE)
Rebuilt both arrays keeping ONLY: national short-codes, the 1363 helpline, phone-less descriptive
entries, and the 18 verified numbers. Removed the other 90 numbers everywhere.
- `destinations.deep_dive.local_helpers`: 166 blocks cleaned; **867 → 589 entries**; still 405
  non-empty blocks (each retains its national constants). `content_reviewed_at` bumped (so the
  freshness-drift cron does not re-flag these — the trigger bumps `updated_at`).
- `emergency_sos.local_helpers`: 44 rows cleaned (`verified_by='deepdive-fabrication-purge-2026-06-09'`),
  of which 34 emptied to honest `[]`; **205 → 171** non-empty.

## Verification (post-purge)
- removable_remaining = **0** (no fabricated/wrong/unverified number left in either field)
- known-5-fakes remaining = **0**
- 18 verified numbers all still present
- `great-himalayan-np` rendered SOS = `[Dial 112]` only — live fake eliminated
- No safety regression: every dest keeps its structured SOS columns + universal 112; empty
  local_helpers is valid honest scarcity (ratnagiri precedent).
- Rendered dest pages are ISR — the ~34 affected pages refresh within their revalidate window.

## Verified OFFICIAL replacements — RE-BACKFILLED 2026-06-09 (see section below)
The verification also turned up the CORRECT official number for ~20 of the removed "wrong" state
desks. These were re-added in a SEPARATE double-verified pass (see "Corrected re-backfill" below) —
not blindly trusted from the first pass. Recorded here:

| Desk | removed (fake) | correct official | source |
|---|---|---|---|
| Bhopal MP Police CR | 0755-2443500 | 0755-2555922 | bhopal.mppolice.gov.in |
| Jabalpur MP Police CR | 0761-2620680 | 0761-2676100 | jabalpur.mppolice.gov.in |
| Nagaland Tourism | 0370-2290142 / 0370-2226124 | 0370-2243124 | tourism.nagaland.gov.in |
| Mizoram Police CR | 0389-2342520 | 0389-2334327 | police.mizoram.gov.in |
| Tripura Tourism | 0381-2315930 | 0381-2325930 | tourism.tripura.gov.in |
| Tripura Police CR | 0381-2324050 | 0381-2310177 | tripurapolice.gov.in |
| Jharkhand Tourism | 0651-2400073 | 0651-2331828 | tourism.jharkhand.gov.in |
| Jharkhand Police CR | 0651-2490222 | 0651-2446607 | jhpolice.gov.in |
| Chhattisgarh Tourism | 0771-2234700 | 0771-4224600 | tourism.cgstate.gov.in |
| Chhattisgarh Police CR | 0771-2424545 | 0771-4247191 | cgpolice.gov.in |
| West Bengal Tourism | 1800-345-6677 | 1800-212-1655 | wbtourism.gov.in |
| Delhi Police PCR | 011-23490200 | 011-27491106 | delhipolice.gov.in |
| Chandigarh Tourism | 0172-2703839 | 0172-2700054 | chandigarhtourism.gov.in |
| GHNP Sairopa Office | 01903-265320 | 01902-265320 (area-code typo) | greathimalayannationalpark.org |
| Sundarbans Tiger Reserve | 03218-255880 | 03218-255280 | sundarbantigerreserve.org |
| GTA Tourist Info Darjeeling | 0354-2254102 | 0354-2254879 | darjeeling GTA tourism |
| ITBP Pithoragarh sector HQ | +91-5964-225200 | 05964-256076 | pithoragarh.nic.in |
| Landour Community Hospital | +91-135-2632042 | 0135-2632053 | eha-health.org |
| Takht Sri Damdama Sahib | 01655-230034 | 01655-220236 | takhatsridamasahib.com |
| Arunachal Tourism | 0360-2212458 | 0360-2212457 | state tourism (corroborated) |

(Police/tourism control rooms with messy or non-official_value verdicts, and all hyper-local
"institutions", were removed with no replacement — honest scarcity.)

## Corrected re-backfill — APPLIED 2026-06-09
The ~20 official replacements above were put through an INDEPENDENT second-pass confirmation
(workflow wf_33b47961-d7d, 5 agents) before any write. Result: **16 confirmed / 4 rejected**
(Jabalpur Police, Mizoram Police [site unreachable], Chandigarh Tourism, GTA Darjeeling — none
re-confirmable on the official source). Arunachal Tourism was also dropped (only an aggregator
source, below the official-govt bar). **15 numbers written** to the RENDERED `emergency_sos.local_helpers`
only (deep_dive left clean), append+dedupe, `verified_by='deepdive-recorrect-2026-06-09'`:

- State desks → all dests in state: Bhopal Police CR `0755-2555922` (MP ×13), Nagaland Tourism
  `0370-2243124` (×7), Tripura Tourism `0381-2325930` + Police PHQ `0381-2310177` (×4 each),
  Jharkhand Tourism `0651-2331828` + Police DG CR `0651-2446607` (×5 each), Chhattisgarh Tourism
  `0771-4224600` + Police CR `0771-4247191` (×5 each), West Bengal Tourism `1800-212-1655` (×6),
  Delhi Police CR `011-27491106` (×1).
- Institutions → specific dest(s): GHNP office `01902-265320` (great-himalayan-np), Sundarbans
  Tiger Reserve `03218-255280` (sundarbans), Landour Community Hospital `0135-2632053` (mussoorie),
  Takht Sri Damdama Sahib `01655-220236` (damdama-sahib), ITBP Pithoragarh HQ `05964-256076`
  (munsiyari, chaukori, pithoragarh).

Result: **47 dests updated, 67 entries added, `emergency_sos.local_helpers` non-empty 171 → 178.**
Availability stamped only where the official source stated it (no fabricated "24/7" except where
true for police control rooms / the 24/7 hospital). Every number independently confirmed twice.

## ✅ RESOLVED 2026-06-10 — confidence_cards free-text phones (see data/audits/cc-phone-fabrication-purge-2026-06-10.md)
The gap below was fully audited + cleaned on 2026-06-10. The field held ~69 distinct phones (NOT the
~12 first estimated) — fabricated at the same ~80% rate as deep_dive. Adversarial 2-pass workflow
(wf_dfe24959-27f, 17 agents) + 6 direct .gov.in fetches → 16 KEEP / 19 CORRECT / 35 DROP across 106 dests
(124 in-prose edits). Applied via MCP (committed), post-write assertion = 0 leftover of all 54 old numbers,
and a full re-extraction confirms every remaining number is in the verified keep∪correct set. confidence_cards
is now fabrication-free. "No fabricated data remains" is now true for all THREE phone-bearing surfaces.

## ⚠️ ORIGINAL OPEN GAP — confidence_cards free-text phones (found 2026-06-09 via live-page verify) [now resolved above]
Verifying the deployed great-himalayan-np page showed the SOS-field fakes gone (0177-2621100 ✓ removed,
new verified 01902-265320 present) BUT a purged number, `0177-2625348`, still in the page payload —
sourced from **`confidence_cards.people_who_help.tourist_police`** (`"HP Tourism Helpline: 0177-2625348"`),
a free-text field this audit did not cover. `confidence_cards` (491 rows) embeds phone numbers as PROSE in
`people_who_help` / `emergency` / `reach` / `network` / `fuel` — **12 rows** match just 4 sampled fakes
(0177-2621100 / 0177-2625348 / 0141-5110598 / 0755-2443500); `people_who_help` has 11 rows with embedded
phones (93 object-shape, 398 array-shape). This is the SAME fabrication source bleeding into a third surface.
**TODO (separate pass):** extract every distinct phone embedded in confidence_cards free-text, verify against
official sources (many overlap the 108 already adjudicated here), and surgically remove/correct the fakes in-prose.
Until then, "no fabricated data remains" is true ONLY for emergency_sos.local_helpers + deep_dive.local_helpers.

## Lesson
The original deep_dive backfill presented fabricated emergency numbers as verified. Re-confirmed
the rule: **emergency numbers must be verified against an official source per-number, or shown as
honest scarcity — never fabricated, never pattern-generated.** Full per-number verdicts:
`tasks/w5vta1rd2.output` (workflow wf_2e747b28-e74).
