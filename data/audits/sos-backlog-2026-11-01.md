# SOS backlog run: 16 numbers sourced

**Date:** 2026-11-01
**Trigger:** scheduled sos-backlog run (1h before the Monday `sos-auto-reverify` cron)
**Outcome:** 16 numbers sourced across 13 rows (15 number-row pairs). Session ran LOCALLY.

## What happened

Backlog at start: **176 `needs_source` rows + 22 `source_unreachable` rows = 198 total**.
Deduped the `needs_source` rows to 180 distinct numbers and sorted by destination-coverage.
Three batches of 20 (top 60 by coverage) were dispatched to 3 parallel Sonnet discovery agents.
Each agent received digits, field, state, sibling facility text, the rep-destination name,
and NIC-template path hints.

**Source_unreachable (22 rows):** All source pages are accessible locally. Numbers on all 22
rows were confirmed against their existing `source_map` URLs — no inserts needed. Monday's
cron will clear these rows to `confirmed` status on next run.

Discovery summary across the 3 batches:

| Batch | Numbers | Agent candidates | My confirmations |
|---|---|---|---|
| 1 (top 20) | 20 | 7 "found" | 1 confirmed |
| 2 (21–40) | 20 | 10 "found" | 9 confirmed |
| 3 (41–60) | 20 | 11 "found" | 6 confirmed |

**Total: 28 candidates reviewed; 16 confirmed; 12 dropped.**

Each candidate was confirmed with a Python script implementing the cron's own
`extractPageTokens` + `numberMatchesPage` logic from `apps/web/src/lib/sos-verify.ts`
against a live fetch of the source page. The insert script then re-fetched every URL and
re-matched all 16 before writing. All 16 passed.

## Numbers sourced

| Number | Source URL | Field | Quote |
|---|---|---|---|
| `01334223999` | haridwar.nic.in/disaster-management/ | rescue_contact | "Phone: 01334-223999,239423 City Control Room(Police)" |
| `01368221840` | pauri.nic.in/helpline/ | rescue_contact | "Disaster Control Room Pauri 01368-221840/222401" |
| `01722585000` | panchkula.nic.in/telephone-directory/ | rescue_contact | "Mini Secretariat, Sector-1, Panchkula 2585000" |
| `9140037137` | varanasi.nic.in/helpline/ | rescue_contact | "Disaster/Aapda emergenncy helpline no:- 9140037137" |
| `01752214971` | patiala.nic.in/directory/emergency-rajindra-hospital/ | rescue_contact | "0175-2214971 Emergency Rajindra Hospital" |
| `01752359999` | patiala.nic.in/helpline/ | rescue_contact | "Flood Control Room 01752359999" |
| `01832229125` | amritsar.nic.in/helpline/ | rescue_contact | "Flood Control 0183-2229125" |
| `01887232036` | rupnagar.nic.in/contact-directory/ | rescue_contact | "SDM Sri Anandpur Sahib 01887-232036" |
| `01957225278` | bandipore.nic.in/police/ | rescue_contact | "District Helpline Number Bandipore 01957-225278" |
| `01957225322` | bandipore.nic.in/helpline/ | rescue_contact | "01957-225322" |
| `01957226085` | bandipore.nic.in/contact-directory/ | rescue_contact | "bandipore[at]nic[dot]in 01957226085" (DC office) |
| `02222027990` | mumbaicity.gov.in/en/disaster-management/ | rescue_contact | "Maharashtra Control Room Telephone 022-22027990" |
| `02631220201` | dangs.nic.in/contact-us/ | rescue_contact | "Phone Number +91 02631 220201" |
| `02640224001` | narmada.nic.in/helpline/ | rescue_contact | "District Emergency Response Centre +91 2640 224001" |
| `028331077` | devbhumidwarka.nic.in/helpline/ | rescue_contact | "02833-1077 District Emergency Response Center" |
| `02882553404` | jamnagar.nic.in/helpline/ | rescue_contact | "1077, 0288-2553404 Jamnagar Disaster Control Room" |

## Dropped candidates and reasons

| Pattern | Count | Reason |
|---|---|---|
| Gujarat short EOC numbers printed as `+91 XXX 1077` | 5 | Pages print `+91 268 1077` (space-separated) → `extractPageTokens` produces `2681077` (7 digits), not `02681077` (8 digits). The `numberMatchesPage` short-code path returns false for 8-digit numbers that aren't an exact token. Same structural gap as Oct-25 run (`02781077` et al.). Affected: `02681077`, `02811077`, `02861077`, `027661077`, `026721077` (also timeout) |
| Number not on accessible page | 2 | `01374222126` (uttarkashi — tried `/disaster-management/` and `/helpline/`, page loaded both times, digits absent); `08228255210` (mysore district hospital, page loaded, digits absent) |
| Page did not load | 3 | `06712414080` (cuttack.nic.in NXDOMAIN); `04865231587` (idukki cmo.kerala.gov.in 404); `06742391983` (capitalhospital.nic.in timeout after 3 attempts) |
| Not in official domain | 1 | `18002671975` (Maharashtra tourism — agent found it on `mtdc.co` which is denied; `maharashtratourism.gov.in/contact` page is JS-rendered, no digits on live fetch) |
| `02781077` bhavnagar — same 8-digit STD+short issue | 1 | Page prints `+91 278 1077` → token `2781077` (7 digits), stored `02781077` (8 digits) can't match |

Not-found by agents (not reviewed by me): 34 numbers, including West Bengal hospital numbers
(`03322141310`, `03322143024`, `03322143230` — SSKM Kolkata, pages load but number absent or
JS-gated), Kolhapur CPR hospital (`02312662333`), Daman hospital (`02602220444`), South 24
Parganas (`03218255280`, `03324488051`), Birbhum (`03462255100`), Ahmednagar rural
(`02416132` — 7-digit local, same matching gap).

Known dead ends excluded up front (researched twice each, official sites do not publish):
`03803-222253` (District Hospital Roing), `04545-240581` (Government Hospital Palani),
`04172-232538` (Govt HQ Hospital Walajah).

## Structural observations for future runs

- **Bandipore (Bandipora) coverage:** `/helpline/`, `/police/`, and `/contact-directory/`
  together yielded 3 numbers for gurez-valley in one run — worth checking all three pages
  for any Jammu & Kashmir district with multiple `needs_source` numbers.
- **Gujarat short EOC numbers remain a structural dead end** under the current matching
  logic: `028x-1077`, `027xx-1077` etc. are printed as `+91 XXX 1077` on NIC helpline
  pages. Only sourced if the source page also prints the `0`-prefixed form (as
  devbhumidwarka does with `02833-1077`). No fix attempted here.
- **Backlog size:** 176 `needs_source` rows at start; after Monday's cron clears the 13 rows
  this run sourced, roughly 163 remain. 22 `source_unreachable` rows will clear on Monday.
  Top high-coverage stragglers (Gujarat Tourism toll-free, Puri Police, Mumbai KEM Hospital,
  SSKM Kolkata, Kolhapur CPR) remain unconfirmed — JS-rendered or digits genuinely absent.

## Nothing to escalate on the data side

No stored number was found to have changed to a different value on its source page. All
confirmed numbers matched exactly as stored in `emergency_sos`. The three known dead ends
remain unconfirmed and should not be re-researched.

RESULT sourced=16 changed=0 unconfirmed=44
