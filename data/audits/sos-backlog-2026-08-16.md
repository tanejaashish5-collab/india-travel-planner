# SOS backlog run: blocked by environment egress policy

**Date:** 2026-08-16
**Trigger:** scheduled sos-backlog run (1h before the Monday `sos-auto-reverify` cron)
**Outcome:** no writes made. The run could not reach any candidate source and stopped
before Step 2 (Discover) produced anything to confirm.

## What happened

This session is running in a remote/cloud execution container, not the environment the
2026-07-27 backlog pass used. That container's network egress proxy blocks essentially
all outbound web access except a small allowlist (github.com, npm/pip/crates registries,
Anthropic/Cloud SDK endpoints). Both `WebFetch` and plain `curl` were tested against a
progression of targets to characterize the block before concluding it was categorical,
not a single flaky host:

| Target | Method | Result |
|---|---|---|
| `mangan.nic.in/directory/` (the one source_unreachable row's own recorded source) | `curl` | connection failure (exit 56); proxy log: `connect_rejected — gateway answered 403 to CONNECT`, host `mangan.nic.in:443` |
| `mangan.nic.in/directory/` | `WebFetch` | `EGRESS_BLOCKED` |
| `www.india.gov.in` | `WebFetch` | `EGRESS_BLOCKED` |
| `www.google.com` | `WebFetch` + `curl` | `EGRESS_BLOCKED` / exit 56 |
| `www.who.int` | `WebFetch` | `EGRESS_BLOCKED` |
| `github.com` | `curl` + `WebFetch` | 200 / OK |
| `registry.npmjs.org` | `curl` | 200 |

`WebSearch` does work (it does not go through the same egress path), but a search-result
snippet is not a fetched page — it cannot be digit-matched against `extractPageTokens`,
and the run's own non-negotiable rules forbid treating "an agent reported it" or "it
looks right" as evidence. A snippet is weaker evidence than an agent's claim, so it was
not used as a substitute for Step 3's fetch-and-match.

## Why nothing was written

Every write in this procedure is downstream of literally seeing a number on a live
official page (Step 3), which is downstream of being able to fetch that page at all
(Step 2). With `.gov.in`/`.nic.in` fetches categorically blocked in this container, no
candidate could reach the confirm step, so `source_map` was not touched on any row and
no `emergency_sos` field was changed. This is the correct outcome under the "never write
a number you have not seen on a live official page" rule — there was no live page to see.

The backlog is unchanged from the last count: 296 `needs_source`, 4 `source_unreachable`
(all four are `lachen`/`lachung`/`phodong`/`yumthang-valley`, all pointing at the same
`mangan.nic.in/directory/` source), 0 `number_changed`.

## Nothing to escalate

No stored number was found wrong on a live page — none could be checked at all, which is
a different condition from a confirmed discrepancy. Per the procedure, only a confirmed
wrong-number finding warrants surfacing to Ashish; a tooling/environment blocker on an
unattended run does not fit that bar on its own, but it does mean tonight's run produced
zero net progress on the backlog ahead of the auto-reverify cron.

## For next time

This backlog-clearing pass needs to run somewhere with unrestricted (or `.gov.in`-
allowlisted) egress — e.g. the environment the 2026-07-27 pass used — not this cloud
container's current network policy. No code or data changed as a result of tonight's
run; only this note.
