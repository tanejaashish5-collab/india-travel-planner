# SOS backlog run: 17 sourced, 36 unconfirmed

**Date:** 2026-10-11
**Trigger:** scheduled sos-backlog run (local environment, egress to .gov.in/.nic.in accessible)
**Outcome:** 17 numbers sourced across 21 rows (24 number-row pairs). `source_map` updated by `sos-source-map-insert.mjs`.
Status before run: 234 `needs_source`, 0 `number_changed`, 1 `source_unreachable`.
Distinct numbers in backlog: 224. Candidates attempted this run: 53.

## What was sourced

| Number | Field | Source URL | Rows updated |
|---|---|---|---|
| 7310913129 | mountain_rescue | https://uttarkashi.nic.in/disaster-management/ | 2 |
| 06742476789 | rescue_contact | https://aiimsbhubaneswar.nic.in/contact-us/ | 1 |
| 02352226248 | rescue_contact | https://ratnagiri.gov.in/en/helpline/ | 2 |
| 02352222222 | rescue_contact | https://ratnagiri.gov.in/en/helpline/ | 2 |
| 08172268410 | rescue_contact | https://hassan.nic.in/en/contact-directory/ | 2 |
| 02852633446 | rescue_contact | https://junagadh.nic.in/helpline/ | 2 |
| 028322231733 | rescue_contact | https://kachchh.nic.in/helpline/ | 2 |
| 9411352136 | mountain_rescue | https://chamoli.gov.in/disaster-management/ | 2 |
| 08772236007 | rescue_contact | https://tirupati.ap.gov.in/helpline/ | 2 |
| 18004253077 | rescue_contact | https://tirupati.ap.gov.in/helpline/ | 2 |
| 9147889078 | mountain_rescue | https://darjeeling.gov.in/ | 2 |
| 03192238881 | rescue_contact | https://southandaman.nic.in/disaster-management/ | 2 |
| 03595263726 | rescue_contact | https://namchi.nic.in/district-administration/ | 2 |
| 9800653010 | rescue_contact | https://gangtokdistrict.nic.in/helpline/ | 2 |
| 9434211641 | rescue_contact | https://gangtokdistrict.nic.in/helpline/ | 2 |
| 03592284444 | rescue_contact | https://gangtokdistrict.nic.in/contact-us/ | 2 |
| 04023202813 | rescue_contact | https://hyderabad.telangana.gov.in/helpline/ | 2 |

Script confirmed every number on its live page before writing (`--dry` pass first, then live). `verified_date` deliberately not stamped — Monday cron handles that.

## Unconfirmed (36 numbers tried, could not confirm)

**Algorithm mismatch (number visible on page but extraction rule won't match):**
- `01374222126` — Uttarkashi control room prints "01374-222722/ 222126"; the slash separator prevents combining with the STD, the 6-digit local part has no phone label in the 20-char window, and the 7-digit rule requires a 7-char token. ✗

**JS-gated / empty body:**
- `03322143024`, `03322143230`, `03322141310` — `kolkatapolice.gov.in/contact/` returns 0 bytes (JS-rendered, blocked to non-browser clients)
- `04023286966` — `tspolice.gov.in/jsp/emergency.jsp` returns 0 bytes

**403 / access denied from outside India:**
- `08322750246`, `08322229701` — `forest.goa.gov.in` returns HTTP 403 for all paths

**Timeout / DNS failure:**
- `03192239247` — `police.andamannicobar.gov.in` timed out on 3 attempts
- `03192233077` — old domain `police.andaman.gov.in` DNS unresolvable (domain retired)
- `03702222952` — `ipr.nagaland.gov.in/kohima` confirmed by WebFetch (Kohima South 2222952/101(O)) but timed out when `sos-source-map-insert.mjs` re-verified (script's own 3-attempt fetch also failed)
- `06742391983` — `capitalhospital.nic.in` timed out on all attempts
- `slnmch.nic.in` (06852250901 family) — DNS not found

**DNS not found:**
- `06752224554`, `06752222124`, `06752222025` — `puri.nic.in` ENOTFOUND
- `cuttack.nic.in` — ENOTFOUND

**Number not on suggested page:**
- `18002671975` — Maharashtra tourist helpline 1800-267-1975 not on any reachable .gov.in/.nic.in page; Maharashtra Tourism portal pages loaded but did not list this number
- `04865231587`, `8547603199`, `8301024187` — `ps.keralapolice.gov.in/munnar-ps/contacts` returned 404
- `03592276955`, `03592234246` — `mangan.nic.in/directory/` loaded but printed only SP and DC numbers, not Chungthang PS
- `01792223836` — Solan: HP Police and hpsolan.nic.in loaded, 01792-223836 not found (page has 01792-223638, one digit different)
- `04132336025`, `04132339825` — `puducherry-dt.gov.in/helpline/` loaded but lists only national short codes, not local Puducherry numbers
- `08228255210` — `mysuru.nic.in/en/contact-directory/` did not reach H.D. Kote taluk entry (pagination not accessible via WebFetch)
- `06782262011`, `06782262289`, `06782262014` — `baleswar.nic.in` ECONNRESET on all attempts
- `03794222221`, `03794224432` — `tawang.nic.in/police/` loaded but shows 03794-222231/222235/222278, not 222221 or 224432
- `06432235718` — `deoghar.nic.in/public-utility-category/hospitals/` loaded but hospital page shows no phone numbers matching
- `20182019` — `chamoli.nic.in/disaster-management/` loaded but 20182019 not present (page has 01372-252102, 01372-252203, 9411352136)
- `9140037137` — `varanasi.nic.in/police/` loaded but number not listed
- `01722585000` — `panchkula.nic.in` loaded but hospital page shows 0172-2562199 only

**Known dead ends (excluded up front):**
- `03803222253` — District Hospital Roing (researched twice, official site does not publish a phone)
- `04545240581` — Government Hospital Palani (same)
- `04172232538` — Govt HQ Hospital Walajah (same)

## Nothing to escalate

No stored emergency number was found to be wrong on a live page. The one `source_unreachable` row is a pre-existing condition not investigated in this run. No `number_changed` rows exist.
