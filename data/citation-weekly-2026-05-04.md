# NakshIQ AI-citation weekly · 2026-05-04

Perplexity: 0/17 cited (0% — Δ0 vs prior run)
Google AIO: 0/17 cited (0% — Δ0 vs prior run)
Combined: 0/34 (0% — Δ0)

**Run details:** 17 best-time-visit prompts × 2 engines (perplexity + Google AIO via `udm=50`). Same Chrome tab reused throughout. 9-second render wait per page. Body-text scanned with `/nakshiq/i`. No captchas detected.

**Comparison baseline:** the prior-Monday window (Apr 27–29) returned 0 rows — no run captured for that week. Closest prior run is the 2026-04-25 baseline (also 0/34). So this week is week-2 of measurement and tracks flat at 0.

## New citations this week
None.

## Lost citations this week
None — there were no citations to lose.

## Still 0/0 after N weeks of checking
All 17 best-time-visit prompts have been zero-cited across both engines for both runs (2026-04-25 baseline + 2026-05-04 this run). Threshold for the chronic-zero callout is 4+ consecutive weekly zeros — none yet, but every prompt is on watch:

```
btv-spiti-june          btv-ladakh-july         btv-kerala-monsoon
btv-rajasthan-summer    btv-goa-december        btv-kashmir-april
btv-sikkim-october      btv-tawang-when         btv-hampi-weather
btv-andaman-season      btv-rann-kutch          btv-varanasi-winter
btv-hampi-may           btv-pondicherry         btv-coorg-august
btv-mahabalipuram       btv-hornbill-festival
```

## Notes & anomalies

- **3 Google AIO queries returned no AI overview at all** (response body < 200 chars: `btv-kashmir-april/aio` (163), `btv-sikkim-october/aio` (139), `btv-pondicherry/aio` (144)). For those queries Google chose not to render an AIO module, so a citation was structurally impossible — counted as `cited=false` since that is the literal observed state. If AIO returns to those queries next week and still doesn't cite us, the signal is meaningfully different from a query where AIO did render but cited a competitor.
- **One Perplexity result was unusually short** (`btv-hampi-weather/perplexity` = 697 chars) — answer rendered but compact. Recheck next week; if pattern persists, may need longer wait.
- **No captchas, no login walls** — clean run.

## Action items implied

Two consecutive zero-citation runs across all 17 best-time queries means the AI engines are not surfacing nakshiq.com for the highest-intent informational queries in the prompt set yet. Worth considering before next week's run:

1. Confirm the 17 target URLs are crawlable and rendering well for AI engines (server-rendered HTML, schema.org `TouristDestination` / `Article` markup, clear answer paragraphs near the top).
2. Re-check the GSC URL Inspection backlog item (top 5 non-prefixed URLs) — if Google can't even canonicalise our pages, Google AIO definitely won't cite them.
3. The Wikidata press-pickup item is also load-bearing here: AI engines treat Wikidata-linked sites differently. Worth the manual P248/P1343 statements when independent press lands.

Report file: `/Users/ashishtaneja/Desktop/India Travel Planner/data/citation-weekly-2026-05-04.md`
