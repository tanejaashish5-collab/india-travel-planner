# SOS backlog run: 11 numbers sourced across 39 rows

**Date:** 2026-09-20  
**Trigger:** manual local run (first successful run after 5 cloud-blocked weeks)  
**Outcome:** 11 numbers written, 39 destination rows updated, 47 number-row pairs.  
`sos-source-map-insert.mjs` ran to completion with exit 0.

## Status at start of run (before writes)

- `needs_source`: 288 rows  
- `source_unreachable`: 4 rows (auroville, bhaderwah, mysore, srirangapatna)  
- `number_changed`: 0  
- `confirmed`: 109  
- `never_run`: 122  
- Distinct numbers needing source: 257  

## What was done

Pulled the full backlog via REST API, extracted 257 distinct phone-shaped tokens across the 292 flagged rows, and ranked by coverage (destinations sharing the number). Split the top-leverage candidates into 3 parallel Haiku discovery agents (max-3 rule). Each agent got digits, field, district, state, sibling facility text, and NIC-template path hints. Every agent-returned URL was re-fetched and re-matched by the orchestrator using the same `extractPageTokens` / `numberMatchesPage` logic the cron uses. The dry-run caught one failing entry (`01374222126`); corrected before the live run.

## Numbers sourced (all re-verified by orchestrator live-fetch)

| Digits | Field | Source URL | Destinations |
|---|---|---|---|
| 03192232694 | tourist_helpline | tourism.andamannicobar.gov.in/travel-care.php | 12 |
| 08322794100 | rescue_contact | southgoa.nic.in/helpline/ | 4 |
| 03192262960 | rescue_contact | northmiddle.andaman.nic.in/ddm-control-room/ | 4 |
| 05942235684 | rescue_contact | nainital.nic.in/disaster-management/ | 4 |
| 01786223151 | rescue_contact | hpkinnaur.nic.in/helpline/ | 4 |
| 01374222722 | rescue_contact | uttarkashi.nic.in/disaster-management/ | 3 |
| 05964226651 | rescue_contact | pithoragarh.nic.in/helpline/ | 3 |
| 03592284416 | rescue_contact | gangtokdistrict.nic.in/divisions/sp-east-en/ | 3 |
| 04896263100 | rescue_contact | ldma.utl.gov.in/en-in/emergency/contacts.html | 4 |
| 04894242263 | rescue_contact | ldma.utl.gov.in/en-in/emergency/contacts.html | 2 |
| 9447822714 | rescue_contact | ldma.utl.gov.in/en-in/emergency/contacts.html | 2 |

## Numbers still unconfirmed (with what was tried)

**`1554` (23 dests, rescue_contact) — Indian Coast Guard distress line:**  
Tried `indiancoastguard.gov.in/important-telephone-numbers` and `cghq/contact-us-0`. The ICG website is fully JavaScript-rendered; the number does not appear in static HTML. The cron's own fetch (non-headless) would fail the same way. Leave as needs_source until a static official page is found.

**`18002671975` (15 dests, tourist_helpline) — Maharashtra Tourism helpline:**  
Tried `maharashtratourism.gov.in/directorate-of-tourism-dot/` and `/contact/`. Both pages are JS-rendered shells; no phone numbers in static HTML. Leave as needs_source.

**`1078` (7 dests, rescue_contact):**  
Agent searched Rajasthan gov/police sites; not found on any official page. Leave as needs_source.

**`08685234020` (3 dests, rescue_contact) — Yadadri Bhuvanagiri Collectorate:**  
Agent searched `yadadri.telangana.gov.in` and nic.in paths; not found. Leave as needs_source.

**`01374222126` (3 dests, mountain_rescue) — Uttarkashi DDMA:**  
Page loads fine and contains the pair `01374–222722, 222126`. The first number (`01374222722`) confirms. The second (`01374222126`) appears as a bare 6-digit local part `222126` without an adjacent phone label — `extractPageTokens` correctly excludes it (6-digit ambiguity rule). The dry-run caught this; the entry was dropped. Leave as needs_source until a page prints the full STD+local form.

**`01792223836` (3 dests, rescue_contact) — Solan Police Control Room:**  
Agent returned `solanpolice.com` which is a `.com` domain, not `.gov.in/.nic.in`, and not in the allow list. Dropped upfront without fetching. HP Police official site `hppolice.gov.in` was not checked for this number — worth trying in a future run.

**`03803-222253`, `04545-240581`, `04172-232538`:**  
Known dead ends per standing instruction. Not retried.

## Source-unreachable rows

| Destination | Source URL | Numbers | Status |
|---|---|---|---|
| auroville | auroville.org/page/emergency-numbers-and-services | 9442224680, 9443090107 | **Page is UP** — both numbers confirmed on live fetch. `auroville.org` is not in the allow list so the numbers were not re-written (source_map already recorded from July 2026 with the same URL — script would have skipped them anyway). Monday cron will re-confirm and flip status to `confirmed`. |
| bhaderwah | doda.nic.in/public-utility-category/hospitals/ | 9596606307 | **Page is DOWN** — 0 bytes on 3 fetch attempts. Remains `source_unreachable`. |
| mysore | mysuru.nic.in/en/contact-directory/ | 08212423800 | **Page is UP** — 0821-2423800 confirmed twice on page (DC Office Control Room/DEOC). source_map already recorded from July 2026 with same URL; no re-write needed. Monday cron will re-confirm. |
| srirangapatna | mysuru.nic.in/en/contact-directory/ | 08212423800 | Same as mysore — source_map recorded, page is back up. |

## Nothing to escalate

No stored emergency number was found wrong on a live page. Doda (`9596606307`) is source_unreachable because `doda.nic.in` is returning 0 bytes today — this is a page-down condition, not a number-changed condition. The number itself was confirmed on that page on 2026-07-27; there is nothing to suggest it changed.
