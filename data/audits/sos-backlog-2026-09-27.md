# SOS backlog run: 5 numbers sourced, egress unblocked (first write since 2026-08-09)

**Date:** 2026-09-27
**Trigger:** scheduled sos-backlog run (local environment, egress unblocked)
**Outcome:** 5 numbers sourced across 13 rows (15 number-row pairs). `source_map` updated on 13
`emergency_sos` rows. Status will advance from `needs_source` → `confirmed` on Monday's
`sos-auto-reverify` cron once it re-fetches the now-recorded sources.
Pre-run counts (from Supabase query this run): 255 `needs_source`, 4 `source_unreachable`,
remainder `confirmed`/`never_run`.

## What happened

Pulled the backlog per the procedure (`.claude/commands/sos-backlog.md`): 255 `needs_source`
rows carrying 261 distinct numbers. Identified the 83 highest-leverage numbers (shared by
2+ destinations), selected 21 for this pass, and split them into 3 parallel Haiku discovery
batches of 7, each with digits, field, state, sibling text, and NIC-template path hints.

All agent-suggested candidates were independently re-verified via `curl`/WebFetch before
inclusion in the entries file. The `sos-source-map-insert.mjs` script then re-fetched all 7
initially-submitted entries against their live pages — 5 passed its own re-verification
(same `extractPageTokens` / `numberMatchesPage` logic used by the Monday cron), 2 were
refused:

- **1926** (`mahaforest.gov.in`): `curl -sk` confirms the number is on the page and the
  quote was verified live ("हॅलो फॉरेस्‍ट: 1926"). However `mahaforest.gov.in` uses an
  SSL certificate chain that curl's `-k` skips but Node's built-in `fetch()` rejects
  (status 0, `fetch failed`). No alternative `.nic.in` or `.gov.in` URL carrying 1926 was
  found in this run. Number remains `needs_source`; carry forward to next pass.
- **02781077** (`bhavnagar.nic.in/helpline/`): Page loads cleanly (HTTP 200) and prints
  "+91 278 1077". The problem is structural: `normalisePhone` yields the 8-digit token
  `02781077`; `numberMatchesPage` requires either an exact match or the 10-digit tail
  branch (≥10 digits) — 8-digit numbers fall in neither path. The page token is `2781077`
  (7 digits after digit-group joining), which does not match `02781077` exactly. Number
  is real and the page confirms it, but the verifier cannot record it. Carry forward.

## Sourced numbers (5 confirmed, written to `source_map`)

| Number | Field | Source URL | Quote |
|---|---|---|---|
| 1090 | rescue_contact | https://ayodhya.nic.in/helpline/ | "Crime Stopper : 1090" |
| 01372252101 | mountain_rescue | https://chamoli.nic.in/disaster-management/ | "01372-252101(Camp Office)" |
| 03782222136 | rescue_contact | https://westkameng.nic.in/helpline/ | "District Control Room Phone Number – 03782-222136/222021/222036" |
| 03782222021 | rescue_contact | https://westkameng.nic.in/helpline/ | "Deputy Commissioner 03782 222021/222367" |
| 028761077 | rescue_contact | https://girsomnath.nic.in/disaster-management/ | "02876-1077" |

## Source-unreachable rows (4 rows, all back up — no writes needed)

All three distinct source pages that had been marked `source_unreachable` are loading again:
`auroville.org`, `doda.nic.in/public-utility-category/hospitals/`, and
`mysuru.nic.in/en/contact-directory/`. The stored numbers were confirmed present on the live
pages via manual fetch. Monday's cron will re-stamp those 4 rows `confirmed` automatically;
no `source_map` changes were required.

## Not confirmed this run

- **1554** — `indiancoastguard.gov.in/important-telephone-numbers` is an HQ telephone
  directory (DG/ADG office lines); 1554 MRCC emergency line is not printed there.
- **08685234020** — Yadadri Telangana district helpline/telephone-directory pages returned
  no content matching the number.
- **03782222036** — Digit-extraction analysis: the number only appears at the tail of the
  slash-sequence "03782-222136/222021/222036" on `westkameng.nic.in/helpline/`. There is no
  gap character between 222021 and 222036, so `extractPageTokens` cannot join the STD code
  to this local part. Excluded.
- **1926** — verified on page, SSL failure blocks the insert script (see above).
- **02781077** — verified on page, numberMatchesPage logic gap on 8-digit numbers (see above).
- 11 other candidates where agent-suggested URLs did not load the target number on
  personal re-verification.

## Known dead ends (excluded, per standing instruction)

`03803-222253` (District Hospital Roing), `04545-240581` (Government Hospital Palani),
`04172-232538` (Govt HQ Hospital Walajah). Each was researched twice — official sites do
not publish a phone for these facilities. Not re-attempted.

## Infrastructure notes

- This is the first run in which egress to `.gov.in`/`.nic.in` was unblocked. The prior
  five consecutive runs (2026-08-16 through 2026-09-06) all produced zero writes due to the
  cloud container's egress policy. This run ran locally.
- Two structural issues surfaced this run that will recur:
  1. Some `.gov.in` hosts (confirmed: `mahaforest.gov.in`) use SSL certificates that Node's
     strict TLS verifies as invalid. `curl -sk` reaches them; the insert script cannot. A
     `NODE_TLS_REJECT_UNAUTHORIZED=0` run mode or a node CA bundle update would fix this,
     but that is a security trade-off to weigh before changing the script.
  2. 8-digit STD+local numbers (e.g. 0278-1077 as `02781077`) fall between the exact-match
     and 10-digit tail branches of `numberMatchesPage`. If the page prints them with a
     country-code prefix ("+91 278 1077"), the extracted token is 7 digits and never matches.
     A 7-digit tail comparison could fix this without false-positive risk — worth a code change.

No code or schema changed as a result of this run; only `source_map` on 13 rows and this note.
