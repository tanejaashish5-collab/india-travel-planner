# SOS backlog run: 10 sourced — first successful run after 5 consecutive blocked weeks

**Date:** 2026-09-14
**Trigger:** scheduled sos-backlog run (local environment, egress unrestricted)
**Outcome:** 10 numbers sourced across 93 rows (107 number-row pairs); 6 candidates dropped;
`data/sos-source-hosts-allow.json` updated with 3 new official non-.gov.in hosts.
Status before run: 302 `needs_source`, 267 distinct numbers, 83 shared by 2+.
The auto-reverify cron will re-scan those 93 rows on its next pass and move confirmed rows.

## What happened

Ran locally (MacBook, not the cloud sandbox whose egress policy blocked the prior 5 runs).
Egress tested live before beginning — `ahmedabad.nic.in` returned HTTP 200 immediately.

Pulled the backlog (same dedupe as prior runs): 302 `needs_source` rows, 267 distinct numbers,
83 of them shared by 2+ destinations. Selected those 83 highest-leverage numbers and split
into 3 batches of ~28 for 3 parallel Haiku discovery agents (max-3-parallel rule).

Each agent was given digits, field, state, sibling facility text, and a rep-destination for
search context, plus the NIC-template path hints from the procedure. Agents returned search-
derived source candidates. Per the non-negotiable rule ("an agent's claim is not evidence"),
every candidate URL was then independently re-fetched and verified with `numberMatchesPage`
logic before writing anything.

### Agent output quality

- **Batch 1** (numbers 1–28): 4 of 5 sampled returned URLs from forbidden sources
  (`indiacustomercare.com`, `bhatkallys.com` — not official). Required re-verification;
  official page found for only 1 of those 4 (`08322428400` on Goa Police).
- **Batch 2** (numbers 29–56): Better quality — 4 of 5 sampled found valid official URLs;
  all 4 independently confirmed.
- **Batch 3** (numbers 57–83): Good quality — all 5 sampled found valid official URLs;
  all 5 independently confirmed.

A total of 16 candidates were taken forward to independent verification.

## What was confirmed (10 entries written)

| Number | Field | Source | Destination count |
|---|---|---|---|
| 18002031111 | tourist_helpline | gujarattourism.com/contact-us.html | 31 (Gujarat tourism) |
| 01902255313 | mountain_rescue | abvimas.org/contact-abvimas/ | 5 (Manali / Kullu region) |
| 08322428400 | rescue_contact | citizen.goapolice.gov.in/web/guest/state-police-control-room | Goa |
| 1364 | tourist_helpline | goatourism.gov.in/contact-us/ | Goa |
| 01902225630 | rescue_contact | hpkullu.nic.in/disaster-management/ | Kullu |
| 04862233111 | rescue_contact | idukki.nic.in/en/helpline/ | Idukki |
| 04896262258 | tourist_helpline | lakshadweeppolice.gov.in/contactus | Lakshadweep |
| 18002337777 | tourist_helpline | mptourism.com/ | MP (multiple dests) |
| 01372251437 | rescue_contact | chamoli.nic.in/disaster-management/ | Chamoli |
| 03595250634 | rescue_contact | gyalshing.nic.in/public-utility-category/hospitals/ | Gyalshing/Sikkim |

`sos-source-map-insert.mjs` re-fetched all 10 URLs live, re-ran `numberMatchesPage`,
and wrote to `source_map`. SOURCED 10 numbers across 93 rows (107 number-row pairs).

### Allowlist additions

Three hosts are genuinely official but not on `.gov.in`/`.nic.in`. Added to
`data/sos-source-hosts-allow.json` with reasons:
- `gujarattourism.com` — Gujarat Tourism Corporation Ltd (state government enterprise)
- `www.abvimas.org` — Atal Bihari Vajpayee Institute of Mountaineering, HP Govt
- `www.mptourism.com` — MP Tourism Development Corporation Ltd (state government enterprise)

## What was dropped (6 candidates)

| Number | Reason |
|---|---|
| 03192232694 | `tourism.andamannicobar.gov.in/travel-care.php` prints "03192–232694" with **en dash (U+2013)**, not a regular hyphen — `extractPageTokens` join pattern `[\s\-()]` excludes en dash, so the string is not joined into the 11-digit form; cron would never match |
| 01374222722 | `uttarkashi.nic.in/disaster-management/` — same en-dash formatting ("01374 – 222722"); class of failure identical to above |
| 01374222126 | `uttarkashi.nic.in/disaster-management/` — same en-dash class |
| 05942235684 | `nainital.nic.in/telephone-collectorate/` — table shows only 6-digit local number "235684"; STD code "05942" not present on the page; the 6-digit corroboration path in `numberMatchesPage` requires the STD code to appear in `pageRaw` |
| 1554 | Indian Coast Guard site has SSL certificate errors; even with `--insecure`, "1554" appears only embedded in HTML UUID fragment attributes (CSS class names), not as printed phone text — `extractPageTokens` does not harvest attribute values |
| 18002671975 | Not present on `maharashtratourism.gov.in` (645 KB page, full text scanned); only found on `indiacustomercare.com` (forbidden source class) |

### Known dead ends (excluded from target list up front, per standing instruction)
`03803-222253` District Hospital Roing, `04545-240581` Government Hospital Palani,
`04172-232538` Govt HQ Hospital Walajah — no new attempts.

## Nothing to escalate on the data side

No stored number was found to be wrong on a live page. One number
(`05942235684`) was found on a live page but in a form the cron cannot
match — that is a source-format limitation, not a data error.

## Infrastructure note

This run succeeded because it ran locally. The prior 5 consecutive
runs (2026-08-16 through 2026-09-06) were all blocked by the cloud
container's egress policy. That policy block is unchanged — the `sos-backlog`
task should continue to be run locally, not from the cloud sandbox.
