---
name: nakshiq-road-sweep
description: Autonomous weekly re-verification of drifted road-condition claims. Reads the road_reports rows the weekly cron flags as stale, re-checks each against its own source, writes what it can confirm, and escalates only genuine judgment calls. Replaces the email that used to hand the founder a to-do list.
---

# NakshIQ Road Sweep — Skill

The `/api/cron/road-conditions-sweep` cron emails a list of drifted road claims and
tells a human to "WebFetch the source URL, then update `last_reviewed_at`". That is
work an agent can do end to end. This skill does it; the founder should only hear
about the rows that genuinely need a decision.

Runs on the Claude Max plan. **No metered API calls** — see
`apps/web/scripts/check-no-metered-ai.mjs`.

## Scope

Rows in `road_reports` where `status NOT IN ('open','good')` and
`greatest(reported_at, last_reviewed_at) < now() - interval '14 days'`, plus any row
whose `expires_at` has passed, plus any row with a NULL `source_url`.

## Procedure

1. **Pull the drifted set** via Supabase MCP. Record each row's `id`, `segment`,
   `status`, `report`, `source_url`, `source_label`, `expires_at`.

2. **Re-verify each claim against its own source first**, then broaden. Priority
   order: the cited `source_url` → the issuing authority's current notices (BRO
   Project Himank, state PWD, district DDMA / district administration, SDMA) →
   dated news from the last 3 weeks (Tribune India, ANI, Hindustan Times).

   Dispatch at most **3 parallel Haiku agents**, grouped by region, never more
   (founder rule, 2026-06-10). Give each agent the current claim text and tell it
   to return UNCHANGED / UPDATE / CANNOT VERIFY with a source URL and a dated quote.

3. **Date-check every source before you believe it.** This is the step that fails.
   On 2026-08-04 a Tribune article about an NH-5 night-closure order read as current
   and was actually from **31 August 2025** — using it would have put a year-old
   order on live pages as present fact. Confirm the publication year of every
   article, and confirm that any regulation window quoted has not expired.

4. **Write only what you verified.**
   - Claim still accurate → bump `last_reviewed_at = now()`, leave the text.
   - Facts changed → rewrite the `report`, update `source_url` / `source_label` to
     whatever you actually read, bump `last_reviewed_at`.
   - Cannot verify an operational specific (a fee, a closure day, a permit rule) →
     **hedge or drop that specific**; do not carry an unverifiable assertion
     forward. Honest scarcity beats fabrication. Say in the text that it could not
     be confirmed and where to check.
   - A source that has expired with no successor → say so explicitly ("the order
     ran X to Y and has now lapsed, no successor published"), and treat the
     regulation as *unknown*, not *lifted*.

   Never bump `last_reviewed_at` on a row you could not actually review — that
   silences the nag without doing the work.

5. **Verify the rendered pages.** After any write:
   `node scripts/verify-touched-pages.mjs --dest <slugs>` for every touched
   destination. A green check on a CACHED page proves nothing — pass
   `--revalidate` or check the AGE column.

6. **Sweep for the same claim elsewhere.** If you corrected a fact (not just a
   date), grep every table for it before closing — the same wrong claim usually
   lives in `destinations`, `confidence_cards` and `destination_months` too. The
   2026-08-04 run fixed 3 `road_reports` rows and found 18 more instances of the
   same outdated permit rule across 3 other tables.

7. **Log the run** to `ops_reports` as job `road-sweep-agent` with
   `{checked, auto_cleared, corrected, escalated}` and `ok` false only if the run
   itself failed. Then commit any repo changes with
   `bash scripts/audit-commit-guard.sh` — never a bare `git commit`.

## What to escalate

Email/message the founder **only** for:
- A route whose status should change to `closed`, or any new closure affecting travel now.
- An official source that has gone dark or whose order expired with no replacement.
- A claim you could not verify two runs in a row.

Everything else is silent. A clean run should produce no message at all — the same
exception-only contract as the SOS re-verify loop.

## Cost rules

Haiku for the research legs, Opus/Sonnet only for synthesis. Never
`curate-stays.mjs`. Never a metered provider call.
