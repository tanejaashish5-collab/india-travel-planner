# SOS backlog run: 4 numbers sourced across 13 rows

**Date:** 2026-11-22
**Trigger:** scheduled sos-backlog run (local — egress unblocked for first time since 2026-09-06)
**Outcome:** 4 numbers written to `source_map` across 13 rows (18 number-row pairs). No
`number_changed` rows in backlog.

## Backlog pulled

171 rows: 21 `source_unreachable`, 150 `needs_source`, 0 `number_changed`.
Deduped to 161 distinct unsourced numbers, 32 source-unreachable numbers.

## Discovery

3 parallel Sonnet sub-agents dispatched per the procedure's max-3-parallel rule, targeting
the highest-leverage numbers by destination count.

**Agent 1** (Bhavnagar, Capital Hospital Bhubaneswar, Solan Police, Wildlife Warden Munnar,
DDMA Uttarkashi, Puri Police, North Sikkim): all rejected — `02781077` (Bhavnagar) fails
exact-match rule for 8-digit numbers; `01374222126` (Uttarkashi) printed as
`01374-222722/ 222126` on uttarkashi.nic.in — slash prevents digit-group joining, 6-digit
local part unlabelled — does not pass `extractPageTokens`; `solanpolice.com` and
`munnarwildlife.com` not in host allow-list; others not found.

**Agent 2** (Balasore DHH, Puri hospital, Cuttack/SCB, MKCG Berhampur, Bhitarkanika): all
rejected — all Odisha district .nic.in sites unreachable from AU (balasore.nic.in,
puri.nic.in, cuttack.nic.in, kendrapara.nic.in return 0 bytes); mkcgmch.nic.in times out;
scbmch.odisha.gov.in unreachable; mkcgmch.org JS-gated; wildlife.odisha.gov.in HTTP 200 but
Bhitarkanika phone tokens not present on rendered page.

**Agent 3** (Kohima Fire, Andaman Marine Police, H.D. Kote Hospital, Dirang ITBP, Rongli
PS, Hyderabad Police): 2 confirmed, rest rejected.

## Confirmed entries

Every agent-suggested URL was independently re-fetched and matched using the same
`extractPageTokens` + `numberMatchesPage` logic as the cron.

| Number | Field | URL | Quote |
|---|---|---|---|
| `01372251437` | rescue_contact | chamoli.gov.in/disaster-management/ | "Disaster Management Officer 01372-251437" |
| `01372252101` | mountain_rescue | chamoli.gov.in/disaster-management/ | "District Magistrate 01372-252101(Camp Office)" |
| `9002999639` | rescue_contact | pakyongdistrict.nic.in/police/ | "Rongli PI Umesh Pradhan (SHO) 9002999639" |
| `08228255210` | nearest_hospital | mysore.nic.in/en/public-utility-category/hospitals/page/5/ | "GENERAL HOSPITAL, H.D KOTE, MYSURU ... Phone : 08228255210" |

**Note on chamoli entries:** chamoli.nic.in (previous source URL) is now unreachable (HTTP
000); chamoli.gov.in carries the same disaster-management page and was live. These two rows
moved from `source_unreachable` to sourceable once the new URL was confirmed.

`sos-source-map-insert.mjs` re-fetched all 4 URLs and re-matched the digits itself before
writing:

```
✓ 01372251437  chamoli.gov.in
✓ 01372252101  chamoli.gov.in
✓ 9002999639   pakyongdistrict.nic.in
✓ 08228255210  mysore.nic.in
SOURCED 4 numbers across 13 rows (18 number-row pairs).
```

## Still unconfirmed — what was tried

**Odisha (all 7 numbers):** Every district .nic.in site for Odisha was unreachable from AU
(balasore, puri, cuttack, kendrapara all 0 bytes; mkcgmch.nic.in timeout). wildlife.odisha.gov.in
returned HTTP 200 but the Bhitarkanika phone tokens (06729242460, 06727232803) were absent from
the rendered page. scbmch.odisha.gov.in unreachable. mkcgmch.org is JS-gated and not .gov.in.

**Rajasthan forest numbers (6 Sariska/Ranthambhore numbers):** forest.rajasthan.gov.in
completely unreachable — all 4 URL variants returned 0 bytes.

**Known dead ends (excluded per standing instruction):**
- `03803-222253` District Hospital Roing — official sites do not publish a phone
- `04545-240581` Government Hospital Palani — official sites do not publish a phone
- `04172-232538` Govt HQ Hospital Walajah — official sites do not publish a phone

**Other unconfirmed numbers:**
- `02781077` Bhavnagar: bhavnagar.nic.in prints it as "+91 278 1077" → token "2781077"
  (7 digits); stored digits "02781077" have length 8, so `numberMatchesPage` demands exact
  match only → fails. Number is likely correct but cannot be sourced from this page format.
- `01374222126` DDMA Uttarkashi: uttarkashi.nic.in prints "01374-222722/ 222126" — the
  slash is not a join character, "222126" as standalone 6-digit is not phone-labelled →
  not in tokens.
- `03592276955` North Sikkim: mangan.nic.in helpline page accessible but number absent.
- Other numbers: sources not found on any accessible .gov.in/.nic.in page.

## Nothing to escalate

No stored emergency number was found wrong on a live official page. The 4 sourced numbers
all confirmed at the digits already in the database — no field changes needed.
