# NakshIQ AI-citation weekly · 2026-07-06

Perplexity: 0/10 cited (0% — Δ0 vs last week; 7 of 17 checks skipped, see note)
Google AIO: 0/17 cited (0% — Δ0 vs last week)
Combined: 0/27 valid checks (0% — Δ0)

## New citations this week
None.

## Lost citations this week
None.

## Still 0/0 after 4+ weeks of checking
All 17 best-time-visit prompts. Full history (baseline 2026-04-24 + 9 weekly runs through today) shows **zero citations ever recorded on either engine for any btv prompt** — 10 runs, ~10.5 weeks. This is no longer a sampling question; the target pages are not being picked up by answer engines for these queries. Candidates for target-page optimization (all 17, highest-traffic first): btv-goa-december, btv-ladakh-july, btv-varanasi-winter, btv-sikkim-october, btv-andaman-season, btv-kerala-monsoon, btv-spiti-june, btv-kashmir-april, btv-rann-kutch, btv-pondicherry, btv-hampi-weather, btv-hampi-may, btv-rajasthan-summer, btv-tawang-when, btv-coorg-august, btv-mahabalipuram, btv-hornbill-festival.

## Run notes
- **Perplexity throttled mid-run (again).** Queries 1–10 rendered normally; from query 11 onward every answer hung at "Thinking" indefinitely (~772–908 chars of shell UI, no captcha, no error banner) despite ~15 min of backoff and retries. The 7 unmeasured prompts (btv-rann-kutch, btv-varanasi-winter, btv-hampi-may, btv-pondicherry, btv-coorg-august, btv-mahabalipuram, btv-hornbill-festival) were skipped — no fake rows written.
- **This is a recurring pattern, not a one-off**: prior runs on 05-25, 06-15, and 06-22 also recorded exactly 27 rows (10 Perplexity + 17 AIO) — the throttle reliably kicks in after ~10 rapid Perplexity queries. If full Perplexity coverage matters, the task should either space Perplexity queries ~60–90 s apart from the start, or split them across two engine-interleaved passes.
- Data quality: all 27 recorded checks were fully rendered answers (1.8K–4.9K chars body text); citation test = /nakshiq/i on body text + zero nakshiq hrefs. Written to `ai_citations` with note `weekly 2026-07-06` (verified: 27 rows).
