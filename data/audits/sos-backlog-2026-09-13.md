# SOS backlog run: blocked by environment egress policy (5th consecutive week)

**Date:** 2026-09-13
**Trigger:** scheduled sos-backlog run (1h before the Monday `sos-auto-reverify` cron)
**Outcome:** no writes made, same root cause as 2026-08-16, 2026-08-23, 2026-08-30, and
2026-09-06. `source_map` untouched. Status counts: 302 `needs_source` (flat vs. last
week — first week without further growth), 122 `never_run`, 109 `confirmed`, 0
`number_changed`, 0 `source_unreachable`.

## What happened

Pulled the backlog per the procedure (`.claude/commands/sos-backlog.md`) and deduped every
phone-shaped token out of the row text across all 302 `needs_source` rows using the same
`extractPhones`/`NATIONAL_CONSTANTS` rules as `apps/web/src/lib/sos-verify.ts`: **256
distinct unsourced numbers** across 435 (number, row) pairs, with a long tail — the top 36
by leverage (rows a single source clears) cover 154 of the 435 pairs, topped by the Coast
Guard MRCC line `1554` (23 destinations) and Manali's ABVIMAS rescue line `01902-255313`
(18 destinations, all Himachal).

Selected the top 36 numbers and split them into 3 batches of 12 for 3 parallel Haiku
discovery agents, per the repo's max-3-parallel rule — each got the digits, states,
representative destinations, descriptive row text, and the row's existing (unverified)
`source_url` as a starting point, plus the procedure's NIC-template path hints. All three
returned promptly claiming 33 of 36 "found," each with a URL and a "quote," several
reading exactly as confident as a genuine fetch (no self-disclosed caveat about search vs.
fetch, unlike some agents in prior weeks' runs).

Before writing anything, the candidate URLs were independently re-tested, exactly as the
non-negotiable rule requires ("an agent's claim is not evidence"):

| Target | Method | Result |
|---|---|---|
| `pithoragarh.nic.in/helpline/` (05964-226651) | `WebFetch` | `EGRESS_BLOCKED` |
| `indiancoastguard.gov.in/...` (1554) | `WebFetch` | `EGRESS_BLOCKED` |
| `uppolice.gov.in/article/en/women-power-line` (1090) | `WebFetch` | `EGRESS_BLOCKED` |
| `www.google.com` (unrelated control) | `WebFetch` | `EGRESS_BLOCKED` |
| raw `curl` with a browser User-Agent, direct to the proxy, against all 20 distinct candidate hosts from the 33 "found" results (northmiddle.andaman.nic.in, nainital.nic.in, lakshadweep.gov.in, hpkinnaur.nic.in, sindhudurg.nic.in, chamoli.gov.in, uppolice.gov.in, westkameng.nic.in, bhavnagar.nic.in, mahaforest.gov.in, capitalhospital.nic.in, www.solanpolice.com, forest.kerala.gov.in, kutch.gujarat.gov.in, uttarkashi.nic.in, police.sikkim.gov.in, gangtokdistrict.nic.in, girsomnath.nic.in, leh.nic.in, chittoor.ap.gov.in) | proxy status endpoint (`__agentproxy/status`) | `connect_rejected — gateway answered 403 to CONNECT`, all 20/20 |

`www.google.com` is the tell: it has no relationship to any target number and there is no
per-host reason for it to be blocked — this container's egress proxy blocks essentially
all outbound web access outside a small allowlist (github.com, npm/pip/crates registries,
Anthropic API/MCP endpoints, per `no_proxy`/README). `WebSearch` still works (it does not
route through the blocked egress path) — a test query for the Pithoragarh number returned
a real, accurate snippet quoting `05964-226651` against the official `pithoragarh.nic.in`
page — but a search-engine snippet is not a fetched page: it cannot be run through
`extractPageTokens`/`numberMatchesPage` from `apps/web/src/lib/sos-verify.ts` against the
actual page bytes, and the procedure's own rules forbid treating "an agent said so" or "the
search engine's summary says so" as equivalent to seeing the digits on a live page.

## Why nothing was written

Every write in this procedure is downstream of literally seeing a number on a live
official page (Step 3), which is downstream of being able to fetch that page at all
(Step 2). With outbound fetches categorically blocked in this container — confirmed
against 20 distinct candidate hosts from this week's own batches plus 1 unrelated control,
plus a direct proxy-status check showing policy-level `403`, not a flaky host — none of
the 33 "found" candidates could reach the confirm step. Per the fail-closed "never write a
number you have not seen on a live official page" rule, all 33 were discarded rather than
written on agent say-so. `source_map` was not touched on any row; no `emergency_sos` field
changed. The remaining ~220 lower-leverage numbers were not even sent to discovery agents
this week, since confirmation was already known to be impossible before spending that
budget.

The three known dead ends (`03803-222253` District Hospital Roing, `04545-240581`
Government Hospital Palani, `04172-232538` Govt HQ Hospital Walajah) were excluded from
this run's target list up front, per the standing instruction not to re-burn time on them.

## Nothing to escalate on the data side

No stored number was found wrong on a live page — none could be checked at all, which is
a different condition from a confirmed discrepancy, so the "number turned out to be wrong"
escalation bar is not met.

## What needs founder attention

This is the **5th consecutive week** this scheduled run has landed in a cloud container
whose egress policy blocks the entire source class this procedure depends on
(`.gov.in`/`.nic.in`, and everything else external too). Five weeks running, effectively
zero net progress on write-throughput (0 numbers sourced in any of the 5 runs), though the
backlog itself held flat this week (302 → 302) rather than growing further. It will not
move next week either under the same container policy: the block is categorical and at
the network layer, so no amount of retrying, different search phrasing, batch size, or
agent model changes the outcome — this week re-confirmed the exact same 403 on every one
of 20 fresh hosts that had never been tested before, so it is not a stale or host-specific
finding.

Two ways to fix it, either is sufficient (unchanged ask, 5th time):

1. Run this scheduled task in an environment whose network policy allow-lists
   `.gov.in`/`.nic.in` (e.g. wherever the 2026-07-27 pass ran, which sourced 18 numbers
   with no egress issues).
2. Get `.gov.in`/`.nic.in` added to this cloud container's egress allowlist.

Four prior identical asks (08-16, 08-23, 08-30, 09-06) have produced no infrastructure
change. Repeating the same recommendation a 5th time without a new angle risks becoming
noise; the honest status is that this scheduled task cannot do its job from this
container, full stop, until one of the two fixes above lands — every week it keeps running
unmodified is a week of Haiku-agent tokens spent producing candidates that are
mechanically un-writable. The non-negotiable "an agent's claim is not evidence" rule
continues to hold the line (zero unverified numbers written across 5 weeks), but that is a
safety backstop, not a substitute for the routine actually doing its job.

No code or data changed as a result of tonight's run; only this note.
