# SOS re-verification: from weekly treadmill to unattended

**Date:** 2026-07-27
**Trigger:** `[NakshIQ · SOS] 42 rows need re-verification` (ops@nakshiq.com, 01:30 UTC)
**Outcome:** 37 of the 42 cleared automatically; 0 real problems found; the weekly
email now stays silent unless something is genuinely wrong.

## What the alert actually was

All 42 rows were `verified = true`, carried a live official `source_url`, and were
flagged for exactly one reason: a 45-day timer had expired. Every entry read
`stale_53d` or `stale_48d`. Nothing was wrong with any of them.

Prior week's edition listed 32 rows; the week before, fewer. It was growing, and
the same rows would have reappeared every Monday indefinitely.

## Why it could never clear itself

`emergency_sos` stores **one** `source_url` per row, but a row carries numbers from
**several** pages. The district control-room line comes from the recorded
disaster-management page; the hospital line came from a different page that was
never written down.

Measured against the stored `source_url`, only **6 of 42** rows could fully confirm.
The other 36 were structurally unclearable — no amount of re-checking would ever
have satisfied them, because the evidence for half their content wasn't recorded
anywhere.

## The fix

| Piece | What it does |
|---|---|
| migration 072 | `source_map jsonb` — provenance **per number**, `{digits: {url, field, last_seen}}`, plus `auto_verify_status` / `note` / `fail_streak` |
| `apps/web/src/lib/sos-verify.ts` | one authoritative classifier + matcher (the staleness rules had been copy-pasted into two other files and drifted) |
| `/api/cron/sos-auto-reverify` | Mon 00:00 UTC — fetches each number's own source, confirms the digits are still printed, stamps the row |
| `/api/cron/sos-verify-reminder` | Mon 01:30 UTC — now reports **exceptions only** |
| `.claude/commands/sos-backlog` | the discovery pass: finds sources the fetch loop can't, so backlog drains |

**Fail-closed.** A row is stamped only when every number it carries is either a
national constant or was *literally seen* on its source page. Unreachable page,
unlocatable number, anything ambiguous — the row keeps its old date. No model is in
the confirm loop; a number is never re-affirmed because something judged it plausible.

**Silence is meaningful.** The reminder also fires if `sos-auto-reverify` hasn't run
in 8 days, so "no email" can't quietly mean "the robot is dead".

## What now reaches a human

Only two things: a number that has **vanished from the page that used to print it**,
or a source failing to load **three weeks running**. `needs_source` — provenance not
yet recorded — is backlog, handled by the discovery pass, and never emails.

## Verification

18 numbers were sourced by 4 research agents, then **every URL was re-fetched and
digit-matched independently** before anything was written. Roughly **1 in 4 agent-supplied
URLs failed that check** and was discarded — consistent with this repo's documented
history of agent false-positives on phone data.

Three matcher defects were found *because* of that check, each of which would have
produced a false `number_changed` alarm on the first live run:

1. **Adjacent numbers welded together.** `0241-2323844 0241-2356940` normalised to one
   20-digit value; `02141-222667 2` (a table row index) to a 12-digit one.
2. **Labels separated from values.** Tag-stripping left `Phone :` twenty spaces from
   its number.
3. **6-digit local parts dropped.** NIC facility pages print `Phone : 255238` for
   `01951-255238`.

The 6-digit rule needs two guards, because 6 digits is also exactly a **pincode**.
Excluding pincodes by name is not enough — the same digits reappear unlabelled in the
postal address. A bare 6-digit token now counts only when *labelled as a phone* **and**
the area code is corroborated. Verified on `budgam.nic.in`: the real hospital number
matches, a deliberately-constructed pincode-collision control is rejected, and 7
previously-confirmed numbers are unaffected.

A live dry-run then caught a fourth defect — stable row ordering meant a backlog larger
than one run's URL budget would re-fetch the same leading rows forever and never reach
the tail. Now ordered least-recently-attempted first.

## Numbers

| | |
|---|---|
| Rows in `emergency_sos` | 533 |
| Of the emailed 42, cleared | **37** |
| Rows confirmed against source | 107 |
| Rows with recorded provenance | 150 |
| Distinct numbers now sourced | 178 |
| `number_changed` | **0** |
| `source_unreachable` | **0** |
| `needs_source` (silent backlog) | 293 |
| Not yet reached by a sweep | 133 |

## Still open

**3 numbers could not be sourced** after two research passes. In each case the official
district site simply does not publish a phone for that facility. Per the no-fabrication
rule these were **left exactly as they are** — not changed, not deleted:

- `03803-222253` — District Hospital, Roing (dambuk). `roing.nic.in` lists the District
  Medical Officer as `03803-222444 / 222449`, a *different office*. Not sufficient
  grounds to call the stored number superseded, so it stands.
- `04545-240581` — Government Hospital, Palani. `dindigul.nic.in` lists only private
  facilities plus a Deputy Director (Health) line, `04545-241624`.
- `04172-232538` — Govt HQ Hospital, Walajah (tiruttani). The facility's own official
  page carries an email and pincode but no phone at all.

**Two provenance sources are not government domains** and should be upgraded when
convenient: `pragya.net` (chandratal, kaza) and `chambaonline.in` (manimahesh-kailash).

**~15% of `.gov.in` fetches fail per run** from Vercel (15–23 of 120). This is handled
safely — fail-closed, no false alarms — and transient failures resolve on later runs.
Worth watching if the rate climbs.
