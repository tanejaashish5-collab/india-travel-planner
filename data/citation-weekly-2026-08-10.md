# NakshIQ AI-citation weekly · 2026-08-10

Perplexity: 0/5 checked cited (0% — Δ0 vs last week). 12/17 prompts skipped this week (Perplexity account-level throttle hit earlier than usual — see note).
Google AIO: 1/17 cited (5.9% — Δ+1 vs last week)
Combined: 1/22 checked (4.5% — Δ+1 vs last week)

## New citations this week

- [btv-coorg-august] aio — cited NakshIQ page `/en/destination/coorg/august` (query: "Coorg in August rain"). Google's AI Overview showed a "Coorg (Kodagu) in August - NakshIQ" source card alongside Tripadvisor and INIKA Resorts, quoting "Coorg in August holds the July monsoon pattern with marginally fewer extreme-rain days, but it is the historical peak landslide-ri...". Verified by reading the actual `<a href>` on the page (not just the body-text regex match) — it resolves to `www.nakshiq.com/en/destination/coorg/august`. **First citation ever recorded for this category, on either engine, in 14 weekly AIO runs / 254 all-time AIO checks.**

## Lost citations this week

None.

## Still 0/0 after N weeks of checking

16 of 17 best-time-visit prompts remain uncited on **both** engines across their entire history. `btv-coorg-august` is now the sole exception.

- **Google AI Overviews**: 1 citation ever, out of 254 all-time checks across 14 weekly runs since 2026-04-25 — today's `btv-coorg-august` hit is the first. The other 16 prompts are still 0-cited on every run to date.
- **Perplexity**: 0 citations ever, out of 173 all-time checks. Per-prompt coverage is uneven (5–14 checks per prompt) because of the account throttle described below, but no prompt has recorded a citation regardless of how many times it's been checked — including `btv-coorg-august` itself (0/5 on Perplexity so far).

One hit after 253 straight uncited AIO checks is a single data point, not a trend yet — AI Overview source sets are known to be volatile run-to-run (the same query can show a different set on refresh). Worth a manual spot-check next Monday to see whether `coorg-august` holds, and whether anything about that specific page (recency of `content_reviewed_at`, structured data, source formatting) differs from the other 16 target pages in a way worth replicating deliberately rather than waiting for it to happen again by chance.

## Perplexity throttle — hit earlier than usual this week

Confirmed again: the free-account Perplexity session stalls permanently on "Thinking…" (URL stuck at `/search/new?q=...`, never resolving to a `/search/<uuid>` result). Verified with an extra 8s wait past the standard 9s on both the 6th (`btv-kashmir-april`) and 8th (`btv-tawang-when`) queries submitted this run — both still stuck.

Per the rotation rule (alternate forward/reversed weekly; last week — 2026-08-03 — was reversed), this run used **forward** order (position 1 → 17). Unlike the last two confirmations (which both hit the wall at query #11), it hit at query **#6** this time. Likely cause: a transient "Claude in Chrome is not connected" error during the first 5-query batch. The tool reported failure, but the queued navigations had apparently already reached Perplexity server-side — when the batch was retried from scratch, positions 1–5 were probably submitted twice, consuming the usual ~10-query budget before query 6 was reached for the first "clean" time. Net effect: only 5/17 checked this week vs. the usual ~10/17.

- Checked this week (all `cited=false`): btv-spiti-june, btv-ladakh-july, btv-kerala-monsoon, btv-rajasthan-summer, btv-goa-december
- Skipped this week (throttled): btv-kashmir-april, btv-sikkim-october, btv-tawang-when, btv-hampi-weather, btv-andaman-season, btv-rann-kutch, btv-varanasi-winter, btv-hampi-may, btv-pondicherry, btv-coorg-august, btv-mahabalipuram, btv-hornbill-festival

Process fix for future runs: after any "not connected" error mid-batch, check the actual current tab/URL before retrying — don't assume zero progress was made. Retrying a batch from scratch can silently double-submit queries against a rate-limited target. Next week should still use **reversed** order (continuing the alternation from this week's intended-forward run) so the 12 prompts skipped this week — including `btv-coorg-august`, whose Perplexity status is now the most interesting open question given its AIO breakthrough — catch back up in coverage.
