# SOS backlog run: 4 numbers sourced, 9 rows updated

**Date:** 2026-10-18
**Trigger:** manual sos-backlog run, LOCALLY (first successful run since 2026-07-27 egress-blocked series ended)
**Outcome:** 4 numbers confirmed on live official pages and written to `source_map`. 9 destination rows updated. 0 `number_changed` rows found (no live discrepancies to escalate).

## Backlog at start of run

| status | count |
|---|---|
| `needs_source` | 221 |
| `number_changed` | 0 |
| `source_unreachable` | 0 |

216 distinct numbers extracted. Deduped by number (one sourcing clears all rows sharing that number). Top leverage: 1554 (23 dests), 18002671975 (15 dests), 1078 (7 dests), 1926 (3 dests), 1076 (3 dests).

## Discovery

3 parallel Sonnet agents dispatched per the max-3-parallel rule (model: "sonnet"):

- **Agent 1**: 1554, 18002671975, 1078, 1926, 1076, 03192-series (Andaman)
- **Agent 2**: Odisha, Sikkim, West Kameng NIC sites
- **Agent 3**: Kerala, Goa, Puducherry, Telangana, Uttarkashi numbers

Agents returned candidate URLs. Every candidate was then independently re-fetched and matched using the exact same `extractPageTokens` + `numberMatchesPage` logic from `apps/web/src/lib/sos-verify.ts`.

## Confirmed (sourced)

| number | url | field | quote | rows updated |
|---|---|---|---|---|
| 1926 | https://mahaforest.gov.in | rescue_contact | "हॅलो फॉरेस्‍ट: 1926" | 3 |
| 1076 | https://mathura.nic.in/helpline/ | rescue_contact | "CM Help Line : 1076" | 3 |
| 08685234020 | https://yadadri.telangana.gov.in/helpline/ | rescue_contact | "Collectorate \| 08685-234020" | 2 |
| 06742476789 | https://aiimsbhubaneswar.nic.in/contact-us/ | nearest_hospital | "(0674) 2476789" | 1 |

Total: **4 numbers, 9 rows**.

Script re-verified all 4 against their live pages before writing; all passed. `verified_date` not set (left for Monday's cron, as the procedure requires).

## Unconfirmed — what was tried

### High-leverage (top 3 — significant backlog impact if solved)

**1554** (Coast Guard distress, 23 destinations)
- `indiancoastguard.gov.in/content.php?id=243` → 404
- `/content.php?id=245`, `/helpline`, `/contact`, `/contact-us`, `/distress-signal`, `/information-for-fishermen` → "1554" only appears as a UUID fragment in a CSS class name (`main-menu-link-content3889f674…17a155481515`), not as a phone number on any of these pages
- `Safe Waters` PDF archive searched — PDF binary not parseable by `extractPageTokens`
- ICG site does not publish 1554 on any reachable HTML page; number confirmed real by MoS shipping releases but no OFFICIAL HTML source available

**18002671975** (Maharashtra tourism, 15 destinations)
- `maharashtratourism.gov.in/contact/` → does not list the number
- `mtdc.co.in`, `mtdc.co.in/contact-us`, `mtdc.co.in/contact` → all return 226 bytes (JS-only redirect shell, no content)
- `aai-portal.maharashtratourism.gov.in` → ENOTFOUND
- WebSearch confirms number is real (MTDC toll-free, 9:45 AM–6:15 PM) but no .gov.in/.nic.in HTML page carries it

**1078** (NDMA, 7 destinations)
- `ndma.gov.in` → connection timeout, consistent across multiple attempts. Site unreachable.

### Token-extraction failures (number on page, but matching logic can't extract it)

**03782222036** (West Kameng control room, 2 destinations)
- `westkameng.nic.in/helpline/` → page shows "03782-222136/222021/222036"
- "222036" is 6 digits, not phone-labelled in the 20-char window before it; "/" separator blocks token joining
- Token list contains "03782222136" (from "03782-222136") but not "03782222036"
- **Match: FAIL** (confirmed by Python simulation of sos-verify.ts logic)

**01374222126** (Uttarkashi DDMA, 3 destinations)
- `uttarkashi.nic.in/disaster-management/` → page shows "01374-222722/ 222126" and "01374 – 222722, 222126"
- "/" and en-dash separators block token joining; "222126" not phone-labelled
- **Match: FAIL** (confirmed by simulation; "01374222722" IS a token, "01374222126" is not)

**02781077** (Bhavnagar helpline, 3 destinations)
- `bhavnagar.nic.in/helpline/` → page shows "+91 278 1077"
- Stored number "02781077" = 8 digits → short-code branch (`digits.length < 10`) fires, exact-only
- Page token is "2781077" (7 digits, no leading 0) — not an exact match
- **Match: FAIL** (the 7-digit tail rule only applies to numbers ≥ 10 digits)

### Sites unreachable from local

- `capitalhospital.nic.in` → connection timeout (03742391983 Bhubaneswar)
- `kendrapara.nic.in` → DNS ENOTFOUND (06727232803, 06727232171, 06729242460)
- `baleswar.nic.in` → DNS ENOTFOUND (06782262011, 06782262289, 06782262014)
- `cuttack.nic.in` → DNS ENOTFOUND (06712414080)
- `puri.nic.in` → DNS ENOTFOUND (06752224554)
- Various Kerala, Goa, Puducherry, Solan numbers → pages loaded but number not present

### Known dead ends (excluded per standing instruction, not retried)

- `03803-222253` — District Hospital Roing (Arunachal Pradesh): no official page publishes this number
- `04545-240581` — Government Hospital Palani: no official page
- `04172-232538` — Govt HQ Hospital Walajah: no official page

## Nothing to escalate

No stored number was confirmed wrong on a live official page. All `number_changed` rows = 0 at start of run. The "number turned out to be wrong on a live page" escalation bar is not met.

## What would unblock the remaining backlog

The majority of unconfirmed numbers are blocked by one of three patterns:

1. **Site unreachable** (DNS failure or timeout) — NIC sites in Odisha, Arunachal Pradesh are sporadically unreachable from Australia; retry at a different time or from an Indian VPS
2. **Token-extraction mismatch** — numbers like 03782222036 and 01374222126 are genuinely on official pages but in a format (slash-separated alternates, en-dash separators) the cron's `extractPageTokens` cannot resolve; fixing requires either the DB storing the number matching the page's preferred form, or the NIC page being fetched directly
3. **JS-gated official portals** — MTDC and similar government portals serve no meaningful HTML without JavaScript; 1554 has no HTML page at all on the ICG site
