# NakshIQ AI-citation weekly · 2026-06-15

Perplexity: 0/10 cited (0% — Δ0 vs last week) · 7 of 17 prompts uncheckable this run (see note)
Google AIO: 0/17 cited (0% — Δ0 vs last week)
Combined: 0/27 checked (0% — Δ0)

Last week (2026-06-07): Perplexity 0/17, Google AIO 0/17, Combined 0/34.

## New citations this week
None. NakshIQ was not cited for any best-time-visit query on either engine.

## Lost citations this week
None. There were no citations last week to lose — the corpus has been 0/34 every week.

## Still 0 after N weeks of checking
All 17 best-time-visit prompts have been zero-cited on **both** engines across **every** weekly run on record (7 runs: 2026-04-25, 05-03, 05-10, 05-24, 06-01, 06-07, and today). That is well past the 4-week threshold — across the full history (236 rows) there is not a single recorded citation of nakshiq.com.

These pages are the optimization backlog. Target URLs the engines should be citing but aren't:

- btv-spiti-june → /en/destination/kaza
- btv-ladakh-july → /en/destination/leh
- btv-kerala-monsoon → /en/destination/munnar
- btv-rajasthan-summer → /en/destination/jaisalmer/5
- btv-goa-december → /en/destination/palolem
- btv-kashmir-april → /en/destination/srinagar/4
- btv-sikkim-october → /en/destination/gangtok
- btv-tawang-when → /en/destination/tawang
- btv-hampi-weather → /en/destination/hampi
- btv-andaman-season → /en/destination/havelock-island
- btv-rann-kutch → /en/destination/rann-of-kutch
- btv-varanasi-winter → /en/destination/varanasi
- btv-hampi-may → /en/destination/hampi/5
- btv-pondicherry → /en/destination/puducherry
- btv-coorg-august → /en/destination/coorg/8
- btv-mahabalipuram → /en/destination/mahabalipuram
- btv-hornbill-festival → /en/destination/kohima/12

## Run notes / failure modes

- **Perplexity throttled URL-triggered searches mid-run.** Queries 1–10 (spiti → andaman) executed and rendered full ~3,000-char answers. From query 11 onward, navigating to `perplexity.ai/search?q=…` redirected to `/search/new` and rendered only the homepage skeleton (~1,740 chars) without running the query — no captcha, no login wall, just no execution. ~100s of cooldown (30s + 60s) and reworded queries did not recover it; this looks like a session-level rate limit after ~10 rapid searches. Per the no-fake-data rule, the 7 unrun Perplexity prompts (rann-kutch, varanasi-winter, hampi-may, pondicherry, coorg-august, mahabalipuram, hornbill-festival) were **not written** to Supabase — only the 10 verified Perplexity checks were. Worth spacing future Perplexity checks (e.g. a few seconds extra between queries, or splitting the engine across two passes).
- **Google AIO needed longer render waits.** A few AIO pages returned partial content at the 9s mark (kashmir-april 602 chars, hampi-weather 131 chars); each was re-checked at 13–14s and rendered a full answer. All 17 AIO checks are reliable. No captcha or consent wall encountered.
- **Supabase env quirk:** `apps/web/.env.local` values carry a trailing literal `\n` that breaks the service key if not stripped — handled in the write script.
- 27 rows written to `ai_citations` (10 perplexity + 17 aio), note `weekly 2026-06-15`, stamped 2026-06-14T23:33Z (UTC was still late Sunday at run time; local date is Monday 06-15).
