# SOS backlog run: 12 numbers sourced (first successful run since 2026-07-27)

**Date:** 2026-10-25
**Trigger:** scheduled sos-backlog run (1h before the Monday `sos-auto-reverify` cron)
**Outcome:** 12 numbers sourced across 14 rows. This is the first run with live `.gov.in` /
`.nic.in` access since the egress-blocked cloud-container streak (2026-08-16 through
2026-09-06, five consecutive blocked runs). Session ran LOCALLY, not in the cloud sandbox.

## What happened

Pulled the backlog per the procedure (`.claude/commands/sos-backlog.md`): **208
`needs_source` rows, 198 distinct numbers**. Sorted by destination-coverage (how many
rows each number serves if sourced). Three batches of 20 numbers each (top 60 by coverage)
were dispatched to 3 parallel Sonnet discovery agents. Each agent received digits, field,
state, sibling facility text, the rep-destination name, and NIC-template path hints.

Discovery summary across the 3 batches:

| Batch | Numbers | Agent candidates | My confirmations |
|---|---|---|---|
| 1 (top 20, coverage ≥ 2) | 20 | 4 "found" | 0 confirmed |
| 2 (21–40) | 20 | 7 candidates | 3 confirmed |
| 3 (41–60) | 20 | 9 candidates | 4 confirmed |
| Verification runs (try-more, batch4-verify) | — | — | 5 additional confirmed |

**Total: 33 candidates reviewed; 12 confirmed; 21 dropped.**

Each candidate was confirmed with a Node.js script implementing the cron's own
`extractPageTokens` + `numberMatchesPage` logic from `apps/web/src/lib/sos-verify.ts`
against a live fetch of the source page — not against agent say-so or search snippets.

## Numbers sourced

| Number | Source URL | Field | Quote |
|---|---|---|---|
| `9140037137` | varanasi.nic.in/helpline/ | rescue_contact | "Disaster/Aapda emergenncy helpline no:- 9140037137" |
| `15500` | eastsiang.nic.in/helpline/ | rescue_contact | "Citizen's Call Center 15500" |
| `9436229607` | changlang.nic.in/helpline/ | rescue_contact | "ADC, Miao 9436229607" |
| `01985232275` | kargil.nic.in/helpline/ | rescue_contact | "Police Control Room 01985-232275" |
| `03807222227` | changlang.nic.in/police/ | rescue_contact | "Officer-in-Charge Miao 03807-222227" |
| `01991232127` | reasi.nic.in/public-utility-category/hospitals/ | nearest_hospital | "Phone : 01991-232127" |
| `04312415031` | tiruchirappalli.nic.in/helpline/ | rescue_contact | "Collectorate Board 0431-2415031" |
| `01957225322` | bandipore.nic.in/helpline/ | rescue_contact | "01957-225322" |
| `08182221010` | shivamogga.nic.in/helpline/ | rescue_contact | "DC Office 08182-221010/1077" |
| `01772800880` | hpshimla.nic.in/helpline/ | rescue_contact | "Disaster Management Control Room 0177-2800880" |
| `02812471573` | rajkot.nic.in/helpline/ | rescue_contact | "+91 281 2471573 District EOCs Helpline" |
| `06532228828` | giridih.nic.in/helpline/ | rescue_contact | "Control Room Phone: 06532 228828" |

The insert script re-fetched every URL and re-matched all 12 with the cron's own rules
before writing. All 12 passed: "SOURCED 12 numbers across 14 rows (15 number-row pairs)."

## Dropped candidates and reasons

| Pattern | Count | Reason |
|---|---|---|
| Numbers split across HTML table cells | 4 | Gap `</td><td>` exceeds 3-char limit in `extractPageTokens` join regex; STD code in one cell, local part in another — extractPageTokens only joins adjacent digit runs separated by `[\s\-().]{0,3}`, not tag markup |
| 8-digit numbers (STD + short local code) | 3 | `numberMatchesPage` returns false for `digits.length < 10` unless exact token match; 8-digit numbers like `02781077` appear on pages as `+91 278 1077` → tokens `912781077` / `2781077`, not `02781077` |
| En-dash separating STD from local part | 2 | `–` (U+2013) not in `[\s\-().]` (which only matches ASCII hyphen U+002D), so `01374 – 222126` not joined |
| Pages AU-blocked / JS-rendered | 8 | Sites confirmed by Google search (capitalhospital.nic.in, scbmch.odisha.gov.in, balasore.odisha.gov.in, tspolice.gov.in, and others) returned nothing useful on live fetch; insert script would have rejected them anyway |
| Number absent from any accessible page | 4 | Genuinely not published on the district's accessible NIC pages |

Known dead ends excluded up front (researched twice each, official sites simply do not
publish a phone): `03803-222253` (District Hospital Roing), `04545-240581` (Government
Hospital Palani), `04172-232538` (Govt HQ Hospital Walajah).

## Structural observations for future runs

- **Most productive path: `/helpline/`** — 9 of 12 sourced numbers came from the district's
  `/helpline/` page, not `/police/`, `/public-utility-category/hospitals/`, or
  `/disaster-management/`. Start there first for any district `rescue_contact` number.
- **NIC district template uses ASCII hyphens** between STD and local parts — `extractPageTokens`
  joins these correctly because `[\s\-().]` matches ASCII `-`. En-dash or comma as separator
  → no join → match will fail.
- **Backlog size:** 208 `needs_source` rows at start of run; after this write ~194 remain
  (12 numbers cover 14 rows). Top-coverage numbers (Gujarat Tourism toll-free, Mahastourism,
  Puri Police) remain unconfirmed — those pages either NXDOMAIN or JS-rendered.

## Nothing to escalate on the data side

No stored number was found to have changed to a different value on its source page. All
confirmed numbers matched exactly as stored in `emergency_sos`. The three known dead ends
remain unconfirmed and should not be re-researched.
