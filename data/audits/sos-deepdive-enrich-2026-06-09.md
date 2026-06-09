# SOS local_helpers enrichment from deep_dive — 2026-06-09

## Context
Follow-up to the 2026-06-09 daily-QA false alarm (NEW-2026-06-09-001, RESOLVED): the
"local_helpers 405→186 drop" was a metric-source mismatch between two different fields —
`destinations.deep_dive.local_helpers` (405 blocks / 867 entries, UNRENDERED legacy store)
and `emergency_sos.local_helpers` (186, the field the SOS section actually renders via
`emergency-sos.tsx`). No data was lost. This task asked: can the rendered SOS sub-list be
enriched from the richer `deep_dive` store?

## Gap analysis
- 219 dests have `deep_dive.local_helpers` but an empty `emergency_sos.local_helpers`.
- Those 219 hold 311 phone-bearing entries, but **235 are national short-codes**
  (100/101/108/112/1091/1073/1363…) already present in the structured SOS columns + the
  universal-112 hero → **redundant, skipped**.
- Only **76 entries** are real STD/mobile numbers, and they collapse to **7 distinct
  numbers across 43 dests** (mostly Himachal + Uttarakhand + Ladakh state/regional desks).

## Adversarial verification (7 Haiku web-research agents, one per number)
Anti-fabrication bar: write a number ONLY if confirmed against an official .gov.in/.nic.in
or the agency's own source. **Result: 5 of 7 FAILED — `deep_dive` is an unreliable source.**

| Phone | Desk | Verdict | Evidence |
|---|---|---|---|
| `0135-2559898` | Uttarakhand Tourism Helpline | ✅ **VERIFIED** | registrationandtouristcare.uk.gov.in (official) — tourist helpline, 7am–9pm |
| `01982-252010` | Leh District Administration | ✅ **VERIFIED** (label corrected) | leh.nic.in/contact-us — it is the **DC/CEO office**, NOT a 24/7 line. Written with honest "Office hours, Mon-Sat" label, not the deep_dive "24/7" claim. |
| `0177-2621100` | HP Police Control Room | ❌ REJECTED | Official primary is `0177-2621711`; this number appears in NO official source. Flagged "dangerous for emergency use." |
| `1800-180-8002` | HP Tourism Helpline | ❌ REJECTED | Not in HP .gov.in/HPTDC. Official HP tourism is `0177-2625864`; national is `1800-11-1363`. |
| `1800-180-6440` | BRO Helpline | ❌ REJECTED | No official BRO toll-free exists. Road emergencies: 1073 / 1033 / 112. |
| `1800-180-0108` | ITBP Border Post | ❌ REJECTED | No evidence. Official ITBP line is `011-20867505`. |
| `01902-224100` | Atal Tunnel Control Room | ❌ REJECTED | Unverifiable in any official/district/BRO source. |

## Write applied (in-place UPDATE, direct via MCP, 19 rows < bulk threshold)
- **16 Uttarakhand dests** ← `{Uttarakhand Tourism Helpline, 0135-2559898, "Daily 7am-9pm"}`:
  almora, bhimtal, champawat, chaukori, chopta, devprayag, dhanaulti, gopeshwar, kanatal,
  mukteshwar, mussoorie, rishikesh, roopkund, tehri, tungnath, valley-of-flowers.
- **3 Ladakh dests** ← `{Leh District Administration (DC/CEO office), 01982-252010, "Office hours, Mon-Sat"}`:
  alchi, lamayuru, zanskar.
- Provenance: `verified_by='deepdive-enrich-2026-06-09'`, `verified_date=CURRENT_DATE`,
  `last_verified_attempt_at=now()`. Guard: only filled rows whose `local_helpers` was empty.
- **24 Himachal dests left EMPTY (honest scarcity)** — every HP candidate number was refuted.
  Plus ITBP dropped from the 3 Ladakh dests, BRO from 5 Kinnaur/Spiti dests, Atal Tunnel from manali.

## Verification
- `rows_enriched_today = 19`; `emergency_sos.local_helpers` non-empty **186 → 205**.
- uk_written=16, ladakh_written=3; samples (tungnath, alchi) correct.
- Dest pages are ISR — the 19 pages refresh within their revalidate window (no forced
  revalidate run from here; `NEWSLETTER_SEND_SECRET` is Vercel-only).

## ⚠️ Key finding — `deep_dive.local_helpers` contains fabricated/stale emergency numbers
5 of 7 sampled "real" numbers could not be confirmed, and `0177-2621100` is a plausible-but-WRONG
police number. The field is currently UNRENDERED (no component reads it) so there is no live user
harm, but it is a latent landmine: **never surface `destinations.deep_dive.local_helpers` to users
without re-verifying each number.** Recommended follow-up (separate task): quarantine or re-verify
the 405 deep_dive helper blocks, or drop the field. This also reconfirms the harness rule
(`qa/SKILL.md`): measure SOS-helper coverage only against the site-rendered fields
(`emergency_sos.local_helpers` + `confidence_cards.people_who_help`).
