# NakshIQ AI-citation weekly · 2026-06-01

Perplexity: 0/10 cited (0% — Δ 0 vs last week, 7 prompts skipped: free-search rate limit)
Google AIO: 0/16 cited (0% — Δ 0 vs last week, 1 prompt skipped: render timeout)
Combined: 0/26 (0% — Δ 0)

Engine total checked this week: 26/34 — 8 prompts could not be evaluated (see Run notes).

## New citations this week
- (none)

## Lost citations this week
- (none — prior week was 0/27 across all evaluated prompts)

## Still 0/0 after 4+ weeks of checking
All 17 best-time-visit prompts are 0-cited across every weekly run on every engine where they get evaluated. Per the task spec, these need target-page optimization. Listed `[prompt-id]` × engine:

- [btv-spiti-june] perplexity, aio (→ /en/destination/kaza)
- [btv-ladakh-july] perplexity, aio (→ /en/destination/leh)
- [btv-kerala-monsoon] perplexity, aio (→ /en/destination/munnar)
- [btv-rajasthan-summer] perplexity, aio (→ /en/destination/jaisalmer/5)
- [btv-goa-december] perplexity, aio (→ /en/destination/palolem)
- [btv-kashmir-april] perplexity, aio (→ /en/destination/srinagar/4)
- [btv-sikkim-october] perplexity, aio (→ /en/destination/gangtok)
- [btv-tawang-when] perplexity, aio (→ /en/destination/tawang)
- [btv-hampi-weather] perplexity, aio (→ /en/destination/hampi)
- [btv-andaman-season] perplexity, aio (→ /en/destination/havelock-island)
- [btv-rann-kutch] aio only — perplexity slot blocked by rate limit (→ /en/destination/rann-of-kutch)
- [btv-varanasi-winter] aio only — perplexity blocked (→ /en/destination/varanasi)
- [btv-pondicherry] aio only — perplexity blocked (→ /en/destination/puducherry)
- [btv-coorg-august] aio only — perplexity blocked (→ /en/destination/coorg/8)
- [btv-mahabalipuram] aio only — perplexity blocked (→ /en/destination/mahabalipuram)
- [btv-hornbill-festival] aio only — perplexity blocked (→ /en/destination/kohima/12)
- [btv-hampi-may] no engine has produced a valid evaluation: perplexity blocked, AIO render-timed-out this week (→ /en/destination/hampi/5)

## Run notes (2026-06-01)

- **Perplexity free-search quota stopped at query 11 of 17** (btv-rann-kutch onward got "You've reached your free search limit"). Identical cutoff to last week's run — only the first 10 prompts can be evaluated on the free Perplexity tier. Either upgrade the account or rotate engines if Perplexity coverage matters.
- **Google AIO btv-hampi-may**: page sat on "Thinking a little longer" through 36 seconds of waiting; no answer ever rendered. Skipped — no row written rather than logging fake `cited:false` data.
- **Other Google AIO queries with slow renders** (btv-hampi-weather first attempt, btv-pondicherry): resolved by extending the wait to 12s. Bumping the default wait from 9s → 12s for AIO would have caught these without a retry round-trip; worth changing in the runbook.
- All 17 target NakshIQ pages are still uncited by both Perplexity and Google AIO. The story is 4+ consecutive zero-citation weeks. The AIO surface is the main lever (16/17 coverage vs Perplexity's 10/17) — target-page work should prioritize AIO indexability over Perplexity.

## Raw counts in Supabase

- 26 rows inserted into `ai_citations` with `note = 'weekly 2026-06-01'`
- Engines: 10 perplexity + 16 aio
- All `cited = false`
