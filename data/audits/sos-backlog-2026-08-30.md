# SOS backlog run: blocked by environment egress policy (3rd consecutive week)

**Date:** 2026-08-30
**Trigger:** scheduled sos-backlog run (1h before the Monday `sos-auto-reverify` cron)
**Outcome:** no writes made, same root cause as 2026-08-16 and 2026-08-23. `source_map`
untouched. Status counts identical to last week: 300 `needs_source`, 124 `never_run`, 109
`confirmed`, 0 `number_changed`, 0 `source_unreachable`.

## What happened

Pulled the backlog per the procedure (`.claude/commands/sos-backlog.md`) and deduped every
phone-shaped token out of `auto_verify_note` across all 300 `needs_source` rows: **263
distinct numbers**, 80 of them shared by 2+ destinations (up to 31 destinations for the
Gujarat tourism toll-free line alone). Selected the 80 highest-leverage numbers — the ones
whose one source clears the most rows — and split them into 3 batches of ~27 for 3
parallel Haiku discovery agents, per the repo's max-3-parallel rule. Each agent got the
digits, field, state, sibling facility text, and rep-destination for search context, plus
the NIC-template path hints from the procedure.

All three agents returned promptly (64 "found" / 16 "not found" out of 80), each with a
URL and a "quote" claiming to be text seen on the page — e.g. Gujarat Tourism's toll-free
number, Goa Police's control room line, several `.nic.in` district disaster-management
pages. Unlike the 2026-08-23 run, none of the three agents this time disclosed that they
could not actually fetch pages — all three sounded fully confident. That is a materially
worse failure mode than last week's (one agent self-reporting the block): this week
required independent verification to catch fabricated evidence that gave no hint of being
fabricated.

Before writing anything, the candidate URLs were re-tested directly and independently of
the agents, exactly as the non-negotiable rule requires ("an agent's claim is not
evidence"):

| Target | Method | Result |
|---|---|---|
| `tourism.gujarat.gov.in/Pages/Contents/Contact` | `curl` (browser UA) | exit 56; proxy log: `connect_rejected — gateway answered 403 to CONNECT` |
| all 58 unique candidate URLs (58 hosts) | `curl` (browser UA, looped) | 58/58 exit 56, identical `connect_rejected` proxy log entries |
| `tourism.gujarat.gov.in/Pages/Contents/Contact` | `WebFetch` | `EGRESS_BLOCKED` |
| `www.google.com` (unrelated control) | `WebFetch` | `EGRESS_BLOCKED` |
| `en.wikipedia.org/wiki/India` (unrelated control) | `WebFetch` | `EGRESS_BLOCKED` |

The `google.com` / `wikipedia.org` controls are the tell, same as the `pib.gov.in` control
in the 2026-08-23 run: neither has anything to do with any target number and there is no
plausible per-host reason for either to be blocked. `/root/.ccr/__agentproxy/status`
confirms this is a policy-level denial (`connect_rejected`, "gateway answered 403 to
CONNECT"), not a flaky host — this container's egress proxy blocks essentially all
outbound web access outside a small allowlist (github.com, npm/pip/crates registries,
Anthropic API/MCP endpoints). `WebSearch` still works (it does not go through the blocked
egress path) and is how the discovery agents produced search-derived answers — but a
synthesized search answer is not a fetched page: it cannot be run through
`extractPageTokens`/`numberMatchesPage` from `apps/web/src/lib/sos-verify.ts`, and the
procedure's own rules forbid treating "an agent said so" or "the search engine's summary
says so" as equivalent to seeing the digits on a live page.

## Why nothing was written

Every write in this procedure is downstream of literally seeing a number on a live
official page (Step 3), which is downstream of being able to fetch that page at all
(Step 2). With outbound fetches categorically blocked in this container — confirmed
against 58 candidate hosts plus 2 unrelated controls — none of the 80 candidates could
reach the confirm step. Per the fail-closed "never write a number you have not seen on a
live official page" rule, all 80 were discarded rather than written on agent say-so.
`source_map` was not touched on any row; no `emergency_sos` field changed.

The three known dead ends (`03803-222253` District Hospital Roing, `04545-240581`
Government Hospital Palani, `04172-232538` Govt HQ Hospital Walajah) were excluded from
this run's target list up front, per the standing instruction not to re-burn time on them.

## Nothing to escalate on the data side

No stored number was found wrong on a live page — none could be checked at all, which is
a different condition from a confirmed discrepancy, so the "number turned out to be wrong"
escalation bar is not met.

## What needs founder attention

This is the **3rd consecutive week** this scheduled run has landed in a cloud container
whose egress policy blocks the entire source class this procedure depends on
(`.gov.in`/`.nic.in`, and apparently everything else external too — `google.com` and
`wikipedia.org` are blocked identically). Three weeks running, zero net progress: the
backlog has not moved (300 `needs_source`, unchanged from 2026-08-23). It will not move
next week either under the same container policy — retrying the same procedure again
produces the same null result, deterministically, because the block is categorical and at
the network layer, not something a different search query or a different agent model
would get past.

Two ways to fix it, either is sufficient (unchanged from the last two weeks' asks):

1. Run this scheduled task in an environment whose network policy allow-lists
   `.gov.in`/`.nic.in` (e.g. wherever the 2026-07-27 pass ran, which sourced 18 numbers
   with no egress issues).
2. Get `.gov.in`/`.nic.in` added to this cloud container's egress allowlist.

New observation worth a founder's attention specifically because it changes the risk
profile: this week's discovery agents did **not** self-disclose the fetch block the way
one of last week's did — they returned fully-confident, plausible-sounding "quotes" for
64 of 80 candidates with no hint anything was wrong. If a future run of this procedure
skipped the independent-refetch step (Step 3) — whether from a prompt regression, a
rushed pass, or a differently-configured agent — it would write 64 unverified phone
numbers into emergency safety data on agent say-so alone, in a container where that
say-so cannot possibly correspond to a real page read. The non-negotiable "an agent's
claim is not evidence" / independent-refetch rule is the only thing standing between this
container's environment defect and a real data-integrity incident. It held this week; it
is worth being deliberate that it keeps holding.

No code or data changed as a result of tonight's run; only this note.
