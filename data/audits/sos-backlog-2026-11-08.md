# SOS backlog run: 12 numbers sourced

**Date:** 2026-11-08
**Trigger:** scheduled sos-backlog run (local environment — egress to .gov.in/.nic.in available)
**Outcome:** 12 numbers confirmed and written to `source_map`; 8 rows touched; 11 number-row pairs written.

## Backlog at start of run

| Status | Count |
|---|---|
| `needs_source` | 173 rows |
| `source_unreachable` | 27 rows |
| Distinct numbers needing source | 185 |

Known dead ends excluded from search (researched twice previously, no official page publishes the number):
- `03803-222253` District Hospital Roing
- `04545-240581` Government Hospital Palani
- `04172-232538` Govt HQ Hospital Walajah

## Discovery

Split the 185 numbers into 3 batches for 3 parallel Sonnet discovery agents:

- **Agent 1** — South India + Kerala (22 numbers): Tamil Nadu disaster mgmt sites, Kerala Police PS pages, Lakshadweep
- **Agent 2** — Northeast + Sikkim (30 numbers): Arunachal Pradesh, Mizoram, Assam, Nagaland, Manipur, Sikkim NIC sites
- **Agent 3** — Odisha + Karnataka + Gujarat + Telangana (32 numbers)

Agents were instructed to find pages that print the number and return `{number, found, url, quote, tried}`. Each URL a sub-agent returned was independently re-fetched and re-matched using `extractPageTokens` + `numberMatchesPage` from `apps/web/src/lib/sos-verify.ts` before being written.

## Personal verification results

71 candidate (number, url) pairs tried across all 3 batches. 18 agent-found candidates personally re-fetched and checked.

**12 confirmed:**

| Number | Destination | Source URL | Quote |
|---|---|---|---|
| 9436238317 | mechuka | shiyomi.nic.in/police/ | "Shri. Gonthombu Dajangju \| SP \| 9436238317" |
| 9402278747 | mechuka | shiyomi.nic.in/police/ | "Shri. Ege Ette \| Dy SP \| 9402278747" |
| 03595263734 | ravangla | namchi.nic.in/contact-directory-2/ | "Ms. Anupa Tamling, SCS \| District Collector \| 03595-263734" |
| 9832080790 | ravangla | namchi.nic.in/contact-directory-2/ | "Mr. Saran Das Kalikotey \| SDM Ravangla \| 9832080790" |
| 7547965002 | zuluk | pakyongdistrict.nic.in/helpline/ | "Sr. Superintendent of Police \| Tenzing Loden Lepcha \| 7547965002" |
| 9474774456 | zuluk | pakyongdistrict.nic.in/helpline/ | "District Collector/DM \| Tashi Chophel \| 9474774456" |
| 02882553404 | marine-national-park | jamnagar.nic.in/helpline/ | "Disaster Control Room \| 1077, 0288-2553404" |
| 028331077 | dwarka | devbhumidwarka.nic.in/helpline/ | "02833-1077 \| District Emergency Response Center" |
| 08262230403 | chikmagalur | chikkamagaluru.nic.in/helpline/ | "S.P Office – 08262 230403" |
| 04024745243 | ramappa-temple | mulugu.telangana.gov.in/helpline/ | "Blood Bank: 040-24745243" |
| 08546274001 | alampur | gadwal.telangana.gov.in/helpline/ | "District Call Centre- 08546 274001" |
| 08542241165 | pillalamarri | mahabubnagar.telangana.gov.in/helpline/ | "District Call Centre- 08542-241165" |

Insert script re-fetched all 12 URLs independently and confirmed every number before writing. All 12 passed. `sos-source-map-insert.mjs` output: `SOURCED 12 numbers across 8 rows (11 number-row pairs)`.

**6 agent-found candidates not confirmed (pages loaded but matching failed):**

| Number | URL | Reason |
|---|---|---|
| 04175232260 | tiruvannamalai.nic.in/disaster-management/ | Page prints "01374 &#8211; 232260" (HTML en-dash entity between STD and local part); `extractPageTokens` treats `&#8211;` as non-joining gap |
| 04652231077 | kanniyakumari.nic.in/helpline/ | Printed as "04652-1077 , 231077" — `1077` joins with `04652` to make `046521077` (9 digits); `231077` (6 digits) cannot be corroborated without phone label before it |
| 04368227704 | karaikal.gov.in/contact-disaster-management/ | Printed as "04368-228801/227704" — slash-separated pair; `227704` follows `228801` with `/` gap, not labeled as phone |
| 02811077 | rajkot.nic.in/helpline/ | 8-digit STD-prefixed 1077; page shows "+91 281 1077" producing token "2811077" (7 digits, without leading 0); exact match fails |
| 02781077 | bhavnagar.nic.in/helpline/ | Same: "+91 278 1077" → "2781077"; does not match "02781077" |
| 026721077 | panchmahals.nic.in/helpline/ | Same: "+91 2672 1077" → "26721077"; does not match "026721077" |

Note: `028331077` (Devbhumi Dwarka) succeeded because that page printed "02833-1077" with a regular ASCII hyphen, allowing the token join to produce the exact 9-digit string.

**Systematic failures not reaching confirmation step:**

- **Odisha NIC subdomains** (jajpur, puri, bargarh, koraput, angul, kendrapara, cuttack, ganjam): DNS NXDOMAIN from outside India — 19 numbers cannot be sourced remotely
- **assam.gov.in**: ECONNRESET (consistent with geofencing pattern noted in MEMORY.md) — 4 Kaziranga numbers unreachable
- **birbhumpolice.wb.gov.in**: connection reset — 2 Shantiniketan numbers
- **puripolice.nic.in**: connection reset
- **chamba.nic.in**: connection reset — Manimahesh-Kailash numbers (source_url is chambaonline.in, not official)
- Manimahesh-Kailash source_url (chambaonline.in) is not an acceptable source (.gov.in/.nic.in required); official chamba.nic.in pages were tried but timed out
- Arunachal Pradesh NIC (arunpol.nic.in): expired TLS certificate
- Kerala Police PS pages for Sabarimala, Silent Valley, Munnar, Wayanad, Athirappilly: pages loaded but specific numbers not in content (PS contact pages list control room numbers, not the ones stored in DB)
- Mizoram/Nagaland/Manipur/Mangan/Tawang/Bishnupur pages: loaded, numbers not present

## Numbers still unconfirmed

185 distinct numbers at start − 12 newly sourced = 173 unconfirmed.
3 known dead ends remain excluded.
Structural blockers for the remaining 170: ~20 require Odisha NIC subdomains (DNS NXDOMAIN from Australia); ~15 on Assam/Manipur/Arunachal sites that timeout or reset from outside India; ~6 on pages that DO show the number but in a format `extractPageTokens` cannot parse (en-dash entity, slash-separated pair, or +91-prefixed 1077 helplines).

No stored number was found to be wrong on a live page. No escalation required.
