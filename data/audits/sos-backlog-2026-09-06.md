# SOS backlog run: blocked by environment egress policy (4th consecutive week)

**Date:** 2026-09-06
**Trigger:** scheduled sos-backlog run (1h before the Monday `sos-auto-reverify` cron)
**Outcome:** no writes made, same root cause as 2026-08-16, 2026-08-23, and 2026-08-30.
`source_map` untouched. Status counts: 302 `needs_source` (up from 300 last week — the
backlog is growing, not shrinking), 122 `never_run`, 109 `confirmed`, 0 `number_changed`,
0 `source_unreachable`.

## What happened

Pulled the backlog per the procedure (`.claude/commands/sos-backlog.md`) and deduped every
phone-shaped token out of `auto_verify_note` across all 302 `needs_source` rows: **267
distinct numbers**, 83 of them shared by 2+ destinations (up to 31 destinations for the
Gujarat tourism toll-free line `1800-203-1111` alone; the top 83 by leverage cover 214 of
the 302 rows). Selected those 83 highest-leverage numbers and split them into 3 batches of
~28 for 3 parallel Haiku discovery agents, per the repo's max-3-parallel rule. Each agent
got the digits, field, state, sibling facility text, and rep-destination for search
context, plus the NIC-template path hints from the procedure.

All three agents returned promptly (74 "found" / 9 "not found" across 83, one URL + a
"quote" per found number — Gujarat/Goa/Maharashtra tourism helplines, several `.nic.in`
district disaster-management and police-control-room pages, one Indian Coast Guard page
for `1554`). Two of the three self-disclosed mid-summary that "direct page fetches were
blocked by network proxy" and that their quotes came from WebSearch snippets, not a live
fetch — closer to last week's self-disclosing agent than the fully-confident batch from
2026-08-30, but the third batch's output gave no such disclaimer and read exactly as
confident as a real fetch would.

Before writing anything, the candidate URLs were independently re-tested, exactly as the
non-negotiable rule requires ("an agent's claim is not evidence"):

| Target | Method | Result |
|---|---|---|
| `goatourism.gov.in/blog-list/...` (1364 tourist helpline) | `WebFetch` | `EGRESS_BLOCKED` |
| `ayodhya.nic.in/helpline/` (1090) | `WebFetch` | `EGRESS_BLOCKED` |
| `uttarkashi.nic.in/disaster-management/` (01374-222126) | `WebFetch` | `EGRESS_BLOCKED` |
| 9 more distinct candidate hosts (lakshadweeppolice.gov.in, girsomnath.nic.in, ahmednagar.nic.in, scbmch.odisha.gov.in, forest.goa.gov.in, tspolice.gov.in, krishna.ap.gov.in, gyalshing.nic.in) | `WebFetch` | `EGRESS_BLOCKED`, all 9 |
| `ddm.and.nic.in`, `balasore.odisha.gov.in`, `police.andaman.gov.in` | `WebFetch` | DNS failure (`ENOTFOUND`/`ETIMEOUT`) — same practical outcome, page unreachable |
| `example.com` (unrelated control) | `WebFetch` | `EGRESS_BLOCKED` |
| `en.wikipedia.org/wiki/Ayodhya` (unrelated control) | `WebFetch` | `EGRESS_BLOCKED` |
| raw `curl` with a browser User-Agent to `ahmedabad.nic.in` (bash, bypassing WebFetch entirely) | proxy status endpoint | `connect_rejected — gateway answered 403 to CONNECT (organization policy)` |

The `example.com` / `wikipedia.org` controls are the tell (same pattern as the last three
weeks' notes): neither has any relationship to any target number and there is no
per-host reason for either to be blocked. This container's egress proxy blocks
essentially all outbound web access outside a small allowlist (github.com, npm/pip/crates
registries, Anthropic API/MCP endpoints) — confirmed directly via `curl` against the proxy
status endpoint (`connect_rejected`, policy-level, not a flaky host). `WebSearch` still
works (it does not route through the blocked egress path) and is how the discovery agents
produced search-derived answers — but a search-engine snippet is not a fetched page: it
cannot be run through `extractPageTokens`/`numberMatchesPage` from
`apps/web/src/lib/sos-verify.ts`, and the procedure's own rules forbid treating "an agent
said so" or "the search engine's summary says so" as equivalent to seeing the digits on a
live page.

## Why nothing was written

Every write in this procedure is downstream of literally seeing a number on a live
official page (Step 3), which is downstream of being able to fetch that page at all
(Step 2). With outbound fetches categorically blocked in this container — confirmed
against 12 distinct candidate hosts plus 2 unrelated controls, plus a direct proxy-status
check — none of the 74 "found" candidates could reach the confirm step. Per the
fail-closed "never write a number you have not seen on a live official page" rule, all 74
were discarded rather than written on agent say-so. `source_map` was not touched on any
row; no `emergency_sos` field changed.

The three known dead ends (`03803-222253` District Hospital Roing, `04545-240581`
Government Hospital Palani, `04172-232538` Govt HQ Hospital Walajah) were excluded from
this run's target list up front, per the standing instruction not to re-burn time on them.

## Nothing to escalate on the data side

No stored number was found wrong on a live page — none could be checked at all, which is
a different condition from a confirmed discrepancy, so the "number turned out to be wrong"
escalation bar is not met.

## What needs founder attention

This is the **4th consecutive week** this scheduled run has landed in a cloud container
whose egress policy blocks the entire source class this procedure depends on
(`.gov.in`/`.nic.in`, and everything else external too). Four weeks running, zero net
progress — the backlog has not shrunk; it has grown slightly (300 → 302 `needs_source`
week over week, as new destinations get added ahead of their first source). It will not
move next week either under the same container policy: the block is categorical and at
the network layer, so no amount of retrying, different search phrasing, or a different
agent model changes the outcome.

Two ways to fix it, either is sufficient (unchanged ask, 4th time):

1. Run this scheduled task in an environment whose network policy allow-lists
   `.gov.in`/`.nic.in` (e.g. wherever the 2026-07-27 pass ran, which sourced 18 numbers
   with no egress issues).
2. Get `.gov.in`/`.nic.in` added to this cloud container's egress allowlist.

Given three prior identical asks produced no infrastructure change, it may be worth
treating this as settled: this scheduled task cannot do its job from this container ever,
and either the schedule should be moved to an environment with fetch access, or paused
until one is available, rather than continuing to spend a run every week reconfirming the
same categorical block. The non-negotiable "an agent's claim is not evidence" rule
continues to hold the line (zero unverified numbers written across 4 weeks), but that is a
safety backstop, not a substitute for the routine actually doing its job.

No code or data changed as a result of tonight's run; only this note.
