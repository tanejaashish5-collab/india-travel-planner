# SOS backlog run: 3 sourced, 15 unconfirmed

**Date:** 2026-11-08
**Trigger:** scheduled sos-backlog run (local — first run with fetch access since the 2026-09-06 egress-blocked run)
**Outcome:** 3 numbers sourced, `source_map` updated on 3 rows.
Status counts at start: 173 `needs_source`, 27 `source_unreachable`, 0 `number_changed`, 0 `number_changed`.

## Numbers sourced

| Number | URL | Field | Quote |
|---|---|---|---|
| `07727-222102` | https://balodabazar.gov.in/en/helpline/ | rescue_contact | "Police Control Room, Balodabazar: 07727-222102" |
| `1800-425-1939` | https://adilabad.telangana.gov.in/helpline/ | rescue_contact | "Control Room Collectorate : 1800-425-1939" |
| `03783-222252` | http://arunpol.nic.in/districts/westsiang.html | rescue_contact | "Police Control Room (03783) 222252" |

Note: `arunpol.nic.in` has an expired TLS cert; HTTP (port 80) was used and confirmed reachable by Node fetch.

## Source_unreachable rows now reachable (auto-verifier handles Monday)

The following 8 hosts were previously unreachable (`source_unreachable`) but responded HTTP 200 today:
`westkameng.nic.in`, `tourism.andamannicobar.gov.in`, `ratnagiri.gov.in`, `lakshadweep.gov.in`,
`gyalshing.nic.in`, `roing.nic.in`, `pakyongdistrict.nic.in`, `idukki.nic.in`.
These already have recorded `source_map` entries pointing to the right URLs; Monday's cron will re-confirm them without any insertion needed.

## Numbers found on official pages but failed script match (token-join edge cases)

Two numbers were confirmed by eye on official `.gov.in`/`.nic.in` pages but rejected by `sos-source-map-insert.mjs`:

- **`02781077`** (Bhavnagar District Helpline): printed as "+91 278 1077" on `bhavnagar.nic.in/en/disaster-management/`.
  `extractPageTokens` joins "278" + "1077" into "2781077" (7 digits). `numberMatchesPage` applies the
  7-digit-tail branch only for numbers ≥10 digits; "02781077" is 8 digits so the function returns false
  before the tail check. Need a URL that prints "0278-1077" with hyphen and without the +91 prefix.

- **`07653222214`** (Bandhavgarh Field Director): printed as "07653 – 222214" on
  `forest.mponline.gov.in/eBrochure/eBrochureDetailsV2.aspx?parkid=1`. The gap between the two digit
  runs is " – " (en-dash, U+2013), which does not match the gap regex `/^[\s\-().]{0,3}$/`
  (only ASCII hyphen is allowed). "222214" is a 6-digit token gated behind a phone-label label check;
  the 20-char prefix at that point is "No. 07653 – " which ends in " – " not a phone keyword.
  Need a URL that prints "07653-222214" with an ASCII hyphen.

## Numbers not confirmed (investigated but no reachable official source)

| Number | Reason |
|---|---|
| `1800-267-1975` (MTDC Maharashtra) | MTDC site (mtdc.co.in) is JS-rendered; phone not in server HTML or WP API; maharashtra.gov.in zero bytes |
| `1554` (Indian Coast Guard) | PIB page contains "1554" only as part of a Facebook page ID |
| `01374-222126` (Uttarkashi) | uttarkashi.nic.in page loads but shows 222722, not 222126 |
| `01792-223836` (Solan) | No .gov.in/nic.in page found with this number |
| `06752-224554` (Puri police) | puripolice.nic.in geo-fenced from AU (HTTP 000) |
| `06742-391983` (Capital Hospital Bhubaneswar) | pgimerch.odisha.gov.in HTTP 000 (geo-fenced) |
| `03592-276955` (North Sikkim) | northsikkim.nic.in geo-fenced from AU (HTTP 000) |
| `03892-334327` (Aizawl PCR) | police.mizoram.gov.in 403/134 bytes (blocked); fireservice.mizoram.gov.in 403 |
| `03762-300124` (Jorhat) | jorhat.assam.gov.in geo-fenced from AU (HTTP 000) |
| `03775-274424` (Majuli) | majuli.assam.gov.in geo-fenced from AU (HTTP 000) |
| `7462220105` / `9251466311` / `7728980366` (Ranthambore/Sariska forest) | forest.rajasthan.gov.in geo-fenced from AU (HTTP 000) |

Known dead ends (excluded, researched twice previously): `03803-222253` (District Hospital Roing),
`04545-240581` (Government Hospital Palani), `04172-232538` (Govt HQ Hospital Walajah).

## Nothing to escalate

No stored number was found to be wrong on a live official page. `number_changed` count remains 0.

## Write path

`node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON --env-file=apps/web/.env.local scripts/sos-source-map-insert.mjs /Users/ashishtaneja/.claude/sos-backlog/entries-2026-11-08.json`

Result: SOURCED 3 numbers across 3 rows (3 number-row pairs).
