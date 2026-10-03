# SOS backlog run: 8 numbers sourced across 21 rows

**Date:** 2026-10-04
**Trigger:** scheduled sos-backlog run (local environment)
**Outcome:** 8 numbers sourced, 21 `emergency_sos` rows updated (23 number-row pairs). Status will
advance from `needs_source` → `confirmed` on Monday's `sos-auto-reverify` cron.
Pre-run counts: 238 `needs_source`, 1 `source_unreachable` (auroville), 0 `number_changed`.

## What happened

Pulled the backlog per the procedure. Extracted 238 distinct unsourced numbers; 21 highest-leverage
(covering 3+ destination rows each) selected as candidates and split into 3 parallel Haiku discovery
batches (7 numbers each), per the repo's max-3-parallel rule. Each agent returned JSON `{number,
found, url, quote, tried}`. All agent-suggested URLs were independently re-fetched and matched with
`extractPageTokens` / `numberMatchesPage` logic before inclusion. `sos-source-map-insert.mjs --dry`
confirmed all 8 entries against live pages before the write.

## Sourced numbers (8 confirmed, written to `source_map`)

| Number | Field | Source URL | Quote |
|---|---|---|---|
| 7310913129 | mountain_rescue | https://uttarkashi.nic.in/disaster-management/ | "Mobile 7500337269, 7252887587, 7310913129" |
| 01982258880 | rescue_contact | https://leh.nic.in/important-contact-details/ | "Police Control Room Leh 01982-258880" |
| 028321077 | rescue_contact | https://kachchh.nic.in/helpline/ | "District EOCs Helpline 02832-1077" |
| 02362228844 | rescue_contact | https://sindhudurg.nic.in/en/helpline/ | "02362-228844 Collector office Sindhudurg" |
| 18004253077 | rescue_contact | https://tirupati.ap.gov.in/helpline/ | "Collectorate 1800-425-3077" |
| 03592284444 | rescue_contact | https://gangtokdistrict.nic.in/contact-us/ | "Tele No. : 03592-284444" |
| 9147889078 | mountain_rescue | https://darjeeling.gov.in/ | "District Police Control Room - 0354-2252057 , 9147889078" |
| 03542255749 | rescue_contact | https://darjeeling.gov.in/helpline/ | "03542255749" (District Relief Control Room) |

## Source-unreachable row (auroville — no write needed)

`auroville.org/page/emergency-numbers-and-services` is back up (HTTP 200 confirmed). Existing
`source_map` entries for `9443090107` and `9442224680` are already recorded (last_seen 2026-07-27)
and both numbers are still present on the live page ("Emergency: 9443090107/ 9488752435" and
"Ambulance: 94422-24680"). No write required — Monday's cron will re-fetch the now-reachable
page and advance the row to `confirmed` automatically. `auroville.org` is not in OFFICIAL_SUFFIX
and was not added to the allow file in this run.

## Not confirmed this run

- **01374222126** (DDMA Uttarkashi, mountain_rescue) — page prints `01374 &#8211; 222722, 222126`
  using an HTML en-dash entity (`&#8211;`) as separator. `extractPageTokens` sees `#` between "01374"
  and "8211", breaking the join; `222126` is a 6-digit group without a phone-label within 20 chars
  so it is not emitted. The same structural gap that blocked `03782222036` last run. `7310913129`
  from the SAME page is a standalone 10-digit mobile — it confirms cleanly; `01374222126` does not.
- **1554** (Indian Coast Guard SAR) — not found on any `indiancoastguard.gov.in` page: contact page,
  homepage, and maritime safety page all return content without 1554. Agent claim was unfounded.
- **06752224554**, **06752222124** (Puri Police / DHH Puri) — `puri.nic.in` returned empty (0 bytes)
  on all paths tried: `/helpline/`, `/en/helpline/`, `/public-utility/`, `/disaster-management/`.
- **06712414080** (SCB Medical Cuttack) — `scbmch.odisha.gov.in/en/light/page/contact-us` and
  `cuttack.nic.in/public-utility-category/hospitals/` both return empty.
- **06742391983** (Capital Hospital Bhubaneswar) — `capitalhospital.nic.in` returns empty.
- **03592276955** (Chungthang Police Station) — not on `sikkim.gov.in` or `police.sikkim.gov.in`.
- **03892334327**, **9862899962** (Aizawl PCR) — not found on `aizawl.nic.in` (page loads but
  numbers absent on all paths tried).
- **03322143024**, **03322143230**, **03322141310** (Kolkata Police Lalbazar) — `kolkatapolice.gov.in`
  returns empty on all paths tried.
- **04865231587**, **8547603199** (Eravikulam / Idukki) — not on `idukki.nic.in`; only found on
  `keralatourism.org` which is not in OFFICIAL_SUFFIX and not in the allow file.
- **04132336025**, **04132339825** (Puducherry Police / Women Helpline) — not found on
  `puducherry-dt.gov.in` or police pages.
- **18002671975** (Maharashtra Tourism toll-free) — not found on `maharashtratourism.gov.in/contact/`.

## Known dead ends (excluded per standing instruction)

`03803-222253` (District Hospital Roing), `04545-240581` (Government Hospital Palani),
`04172-232538` (Govt HQ Hospital Walajah). Not re-attempted.

## Infrastructure notes

- This is the second run with unblocked local egress; all fetches succeeded on first or second attempt.
- Structural gap (carry forward): en-dash HTML entities (`&#8211;`) as STD-local separators in NIC
  district pages block joining by `extractPageTokens`. Affects at minimum `01374222126`; the fix
  (treat `&#8211;` and `&ndash;` as equivalent to a hyphen in the gap regex) would require a change
  to `apps/web/src/lib/sos-verify.ts`. Not changed this run.
- Three NIC / Odisha district sites returned empty bodies: `puri.nic.in`, `scbmch.odisha.gov.in`,
  `capitalhospital.nic.in`, `cuttack.nic.in`. These may be temporarily down; retry next run.

No code or schema changed; only `source_map` on 21 rows and this note.
