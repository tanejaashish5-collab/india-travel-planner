# SOS backlog run: blocked by environment egress policy (2nd consecutive week)

**Date:** 2026-08-23
**Trigger:** scheduled sos-backlog run (1h before the Monday `sos-auto-reverify` cron)
**Outcome:** no writes made, same root cause as 2026-08-16. `source_map` untouched.

## What happened

Pulled the backlog: 300 `needs_source` rows (up from 296 on 08-16), 0 `number_changed`,
0 `source_unreachable`, 109 `confirmed`, 124 `never_run`. Extracted and deduped every
phone-shaped token from `local_police_station` / `nearest_hospital` / `rescue_contact` /
`mountain_rescue` across those 300 rows via SQL regex (mirroring `extractPhones`):
**285 distinct numbers**, 77 of them shared by 2+ destinations. Dispatched the 77
highest-impact numbers (the ones that clear the most rows per source found) to 3
parallel Haiku agents, 1 batch each, per the repo's max-3-parallel rule.

All three agents came back with URLs — but every single one was on a `.nic.in` /
`.gov.in` / state-government domain, and one agent (batch 2) explicitly disclosed it
could not actually fetch any page: *"due to network proxy restrictions, I was unable to
directly fetch and view the actual pages to verify the exact digit formatting."* Its
"quotes" were paraphrased search-result summaries, not text seen on a live page — exactly
what the non-negotiable rule "an agent's claim is not evidence" exists to catch.

So before writing anything, every candidate URL was re-tested directly, independent of
the agents:

| Target | Method | Result |
|---|---|---|
| `eastsikkim.nic.in/contact-us/` | `curl` (browser UA) | exit 56; proxy log: `connect_rejected — gateway answered 403 to CONNECT` |
| `eastsikkim.nic.in/contact-us/` | `WebFetch` | `EGRESS_BLOCKED` |
| `mkcgmch.nic.in/?page_id=2914` | `WebFetch` | `EGRESS_BLOCKED` |
| `ratnagiri.gov.in/directory/…` | `WebFetch` | `EGRESS_BLOCKED` |
| `pib.gov.in` (unrelated control — Press Information Bureau, not a district site) | `WebFetch` | `EGRESS_BLOCKED` |

The `pib.gov.in` control is the tell: that domain has nothing to do with any target
number and no plausible per-host reason to be blocked. This is a categorical block on
the `.gov.in`/`.nic.in` domain class for this container's network policy, identical to
the 2026-08-16 finding — not a flaky host, not something a retry or a different search
query fixes.

## Why nothing was written

Every write in this procedure is downstream of literally seeing a number on a live
official page (Step 3), which is downstream of being able to fetch that page at all
(Step 2). With `.gov.in`/`.nic.in` fetches categorically blocked, none of the 77
candidates could reach the confirm step. Per the fail-closed, "never write a number you
have not seen on a live official page" rule, all 77 were discarded rather than written
on agent say-so. `source_map` was not touched on any row; no `emergency_sos` field
changed. The backlog is unchanged in substance (it grew by 4 rows week-over-week from
ordinary new-destination additions, not from anything this run did).

## Nothing to escalate on the data side

No stored number was found wrong on a live page — none could be checked at all, which is
a different condition from a confirmed discrepancy, so the "number turned out to be
wrong" escalation bar is not met.

## What needs founder attention

This is the **second consecutive week** this scheduled run has landed in a cloud
container whose egress policy blocks the entire source class this procedure depends on.
Running it again next week in the same container will produce the same null result. The
backlog does not shrink on its own — it only drains when this discovery pass can
actually reach a `.gov.in`/`.nic.in` page. Two ways to fix it, either is sufficient:

1. Run this scheduled task in an environment whose network policy allow-lists
   `.gov.in`/`.nic.in` (e.g. wherever the 2026-07-27 pass ran, which sourced 18 numbers
   with no egress issues).
2. Get `.gov.in`/`.nic.in` added to this cloud container's egress allowlist.

No code or data changed as a result of tonight's run; only this note.
