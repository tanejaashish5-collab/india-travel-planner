# NakshIQ AI-citation weekly · 2026-07-20

Perplexity: 0/10 cited (0% — no prior-week baseline to diff against, see note; 7 of 17 checks skipped)
Google AIO: 0/17 cited (0% — no prior-week baseline to diff against, see note)
Combined: 0/27 valid checks (0%)

## New citations this week
None.

## Lost citations this week
None — and there's no prior-week run to compare against (see Run notes: 2026-07-13 never completed).

## Still 0/0 after N weeks of checking
All 17 best-time-visit prompts. Verified directly against Supabase: 11 recorded runs (baseline 2026-04-24 through today, spanning ~13 weeks) totaling 351 `btv-%` rows, **zero rows with `cited=true`, ever**. Candidate list for target-page optimization is unchanged from 07-06 (no new ranking signal since), highest-traffic first: btv-goa-december, btv-ladakh-july, btv-varanasi-winter, btv-sikkim-october, btv-andaman-season, btv-kerala-monsoon, btv-spiti-june, btv-kashmir-april, btv-rann-kutch, btv-pondicherry, btv-hampi-weather, btv-hampi-may, btv-rajasthan-summer, btv-tawang-when, btv-coorg-august, btv-mahabalipuram, btv-hornbill-festival.

## Run notes
- **No prior-week run exists.** The 2026-07-13 scheduled run started (session `local_358fb7b0-...`) and executed 12+ rounds of browser checks but never reached the Supabase-write or report stage — no rows landed for that week and no `citation-weekly-2026-07-13.md` was produced. Likely cause: the same Perplexity free-tier wall documented below, this time stalling the session instead of aborting gracefully. Worth checking next Monday — if it stalls again, the fix is to move the Perplexity abort-and-continue logic earlier and add a hard per-engine time budget.
- **Perplexity throttled mid-run (again).** Queries 1–10 rendered normally (1.3K–3.6K chars of real answer text). Query 11 (`btv-rann-kutch`) onward hit "You've reached your free search limit... resets in a few hours." The 7 unmeasured prompts (btv-rann-kutch, btv-varanasi-winter, btv-hampi-may, btv-pondicherry, btv-coorg-august, btv-mahabalipuram, btv-hornbill-festival) were skipped — no fake rows written. Same ~10-query wall documented on 05-25, 06-15, 06-22, and 07-06; this account has not yet been upgraded to Pro.
- **Google AIO: all 17 completed clean, no captchas.** One transient short read on btv-hampi-weather (177 chars — page hadn't finished rendering) was caught and re-verified with a longer wait; recheck returned a full 2,514-char AI Mode answer, cited=false.
- Data written to `ai_citations` with note `weekly 2026-07-20` (verified: 27 rows — 10 Perplexity + 17 AIO, all cited=false).
