# NakshIQ AI-citation weekly · 2026-06-22

Perplexity: 0/10 cited (0% — Δ+0 vs last week)  ⚠️ only 10/17 prompts checkable — free-search limit hit after 10 queries
Google AIO: 0/17 cited (0% — Δ+0 vs last week)
Combined: 0/27 (0% — Δ+0)

## New citations this week
- None

## Lost citations this week
- None

## Still 0 citations after 4+ weeks of checking
Every tracked best-time-visit prompt remains zero-cited across all 8 weekly runs in the 100-day window (baseline 2026-04-24, 2026-05-04, 2026-05-10, 2026-05-25, 2026-06-01, 2026-06-08, 2026-06-15, 2026-06-22). Full list (weeks checked → target page that should be earning the citation):

- [btv-spiti-june] 8 wks → /en/destination/kaza
- [btv-ladakh-july] 8 wks → /en/destination/leh
- [btv-kerala-monsoon] 8 wks → /en/destination/munnar
- [btv-rajasthan-summer] 8 wks → /en/destination/jaisalmer/5
- [btv-goa-december] 8 wks → /en/destination/palolem
- [btv-kashmir-april] 8 wks → /en/destination/srinagar/4
- [btv-sikkim-october] 8 wks → /en/destination/gangtok
- [btv-tawang-when] 8 wks → /en/destination/tawang
- [btv-hampi-weather] 8 wks → /en/destination/hampi
- [btv-andaman-season] 8 wks → /en/destination/havelock-island
- [btv-rann-kutch] 8 wks → /en/destination/rann-of-kutch
- [btv-varanasi-winter] 8 wks → /en/destination/varanasi
- [btv-hampi-may] 7 wks → /en/destination/hampi/5
- [btv-pondicherry] 8 wks → /en/destination/puducherry
- [btv-coorg-august] 8 wks → /en/destination/coorg/8
- [btv-mahabalipuram] 8 wks → /en/destination/mahabalipuram
- [btv-hornbill-festival] 8 wks → /en/destination/kohima/12

## Run notes
- Engines checked: Perplexity + Google AI Overviews (udm=50). ChatGPT/Claude/Gemini/Copilot skipped (login-walled / unstable URL) — run manually.
- Method: per query, navigate engine URL, wait 9–12s for the AI answer to render, test `/nakshiq/i` against page innerText. All AIO pages confirmed fully rendered (re-checked any that returned a pre-render shell).
- **Perplexity free-search limit:** the free account ("ashish taneja") hit "You've reached your free search limit" after 10 queries, so prompts 11–17 (rann-kutch, varanasi-winter, hampi-may, pondicherry, coorg-august, mahabalipuram, hornbill-festival) could not be read on Perplexity. No fake rows written — same 10-prompt Perplexity coverage as prior weeks. To get full 17/17 Perplexity coverage, either run from a Pro session or split the run across the daily reset.
- A Perplexity cookie-consent banner appeared mid-run and was dismissed via "Decline optional" (privacy-preserving). No captchas encountered on either engine.
- Data written to Supabase `ai_citations` (27 rows: 10 Perplexity + 17 AIO, note="weekly 2026-06-22").
