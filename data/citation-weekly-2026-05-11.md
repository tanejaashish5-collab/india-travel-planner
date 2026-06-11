# NakshIQ AI-citation weekly · 2026-05-11

Perplexity: 0/10 cited (0% — Δ0 vs last week) — *7 of 17 queries aborted mid-run, see note below*
Google AIO: 0/17 cited (0% — Δ0 vs last week)
Combined: 0/27 valid (0% — Δ0)

## New citations this week
*(none)*

## Lost citations this week
*(none — last week was also 0/34)*

## Still 0/0 after N weeks of checking

Every best-time-visit prompt has now logged 4 weekly runs with zero citations on both engines. That's the entire 17-prompt set on AIO (`btv-spiti-june`, `btv-ladakh-july`, `btv-kerala-monsoon`, `btv-rajasthan-summer`, `btv-goa-december`, `btv-kashmir-april`, `btv-sikkim-october`, `btv-tawang-when`, `btv-hampi-weather`, `btv-andaman-season`, `btv-rann-kutch`, `btv-varanasi-winter`, `btv-hampi-may`, `btv-pondicherry`, `btv-coorg-august`, `btv-mahabalipuram`, `btv-hornbill-festival`) and the first 10 on Perplexity. Recommend target-page optimization sweep on the seven worst-positioned destinations (`/destination/kaza`, `/destination/leh`, `/destination/munnar`, `/destination/jaisalmer/5`, `/destination/palolem`, `/destination/srinagar/4`, `/destination/gangtok`) before next week's run — 4 consecutive zero-citation weeks suggests the AI answer engines are routing to other sources.

## Run notes

- **Perplexity rate-limit hit after query 10.** The free-tier search quota tripped on `btv-rann-kutch`; queries 11-17 returned the "You've reached your free search limit" interstitial (~1,300 char page, no AI answer). Per the task spec, those rows were *not* written to Supabase. To get full 17/17 Perplexity coverage next Monday, upgrade the logged-in Perplexity account to Pro before the run, or rotate to an account with unused quota.
- **Google AIO ran clean.** All 17 `udm=50` URLs rendered AI-mode answers (page text 1,900-2,900 chars, no captcha). The 9s render wait was sufficient.
- **Supabase writes:** 27 rows inserted into `ai_citations` with note `weekly 2026-05-10` (UTC date when the script ran).
- **Engines not checked (user runs manually):** ChatGPT, Claude, Gemini, Copilot.

Sources: [`citation-prompts.json`](computer:///Users/ashishtaneja/Desktop/India Travel Planner/data/citation-prompts.json) · Supabase table `ai_citations` (last-week comparison pulled 34 rows from 2026-05-03 ±1 day).
