---
name: nakshiq-refresh-stay-picks
description: Nightly refresh of destination_stay_picks, replacing the metered Vercel cron that was deleted 2026-08-04. Picks the stalest destinations, researches four stay slots each, writes to Supabase, and logs to ops_reports as refresh-stay-picks-agent.
---

# NakshIQ Stay Picks Refresh — Skill

Replaces `/api/cron/refresh-stay-picks`, which called the Anthropic API per
destination and was deleted when NakshIQ stopped paying per token. Same output,
same table, **zero marginal cost** — this runs on the Claude Max plan.

Why it was deleted rather than fixed: the cron failed 20/20 destinations every
night for 10 nights when the Anthropic balance ran out, and reported `ok: true`
the whole time. See `feedback_cron_ok_true_with_total_item_failure_hides_outages`
in project memory.

## Target

`destination_stay_picks` — PK `(destination_id, slot)`. Slots are exactly
`experience`, `value`, `location`, `xfactor` (CHECK constraint). `source` must be
one of `local_stays` / `web_search` / `manual` (CHECK constraint). `name`,
`why_nakshiq`, `source`, `translations` are NOT NULL.

## Procedure

1. **Pick the batch.** The 20 destinations with the stalest `refreshed_at` (a
   destination with no picks at all sorts first). Keep the batch at 20 — it is a
   deliberate rate, not a limit to raise.

2. **Research four stays per destination**, one per slot:
   - `experience` — the iconic / signature choice. Name the famous property if one exists.
   - `value` — best experience-per-rupee. Homestays, heritage guesthouses, solid mid-tier.
   - `location` — the stay whose position wins (walkable to the sights, on the best beach).
   - `xfactor` — the specific, memorable one. Treehouses, farmstays, houseboats.

   Use WebSearch/WebFetch. Dispatch at most **3 parallel Haiku agents** (founder
   rule). Real, currently-operating properties only — a plausible-sounding invented
   hotel is the worst possible output here.

3. **Voice rules** (`apps/web/docs/voice.md`): first-person plural ("We
   recommend"). Never: hidden gem, breathtaking, must-visit, bucket list, curated,
   elevated, paradise, pristine, magical, stunning. Be specific, name properties,
   be honest about price.

4. **Confidence and honesty.** Set `confidence` below 0.6 when guessing; the site
   hides anything under 0.6 via `published`. If a slot genuinely has no real
   answer for that destination, **write no row for it** rather than inventing one.
   Four weak picks are worse than two real ones.

5. **Write** with an upsert on `(destination_id, slot)`, stamping
   `refreshed_at = now()` and `source = 'web_search'`.

6. **Verify the rendered pages** for the destinations you touched:
   `node scripts/verify-touched-pages.mjs --dest <slugs>`. Cached greens prove
   nothing — use `--revalidate` or check the AGE column.

7. **Log to `ops_reports`** as job `refresh-stay-picks-agent` with
   `{ok, fail, pending, total}` and — this is the part the old cron got wrong —
   set the row's `ok` column to **false** if every destination failed. The
   watchdog only alerts on `ok: false`; a total wipeout reported as `ok: true` is
   filed as `needs_review`, which never wakes anyone. Include per-destination
   failure reasons in `summary.fail_reasons`.

## Cadence

Nightly. The watchdog expects a run every 2 days under the job name
`refresh-stay-picks-agent` and will flag the job stale past that.

## Cost rules

Haiku for research legs, Opus/Sonnet only for judgement. Never `curate-stays.mjs`
(banned 2026-04-28 — metered API). Never a metered provider call; the build guard
`apps/web/scripts/check-no-metered-ai.mjs` enforces this for the app.
