# NakshIQ AI-citation weekly · 2026-08-03

Perplexity: 0/10 checked cited (0% — Δ0 vs last week). 7/17 prompts skipped this week (Perplexity account-level throttle — see note).
Google AIO: 0/17 cited (0% — Δ0 vs last week)
Combined: 0/27 checked (0% — Δ0 vs last week)

## New citations this week

None.

## Lost citations this week

None.

## Still 0/0 after N weeks of checking

All 17 best-time-visit prompts remain uncited on **both** engines across their entire tracking history — zero `cited=true` rows exist in `ai_citations` for this category, ever.

- **Google AI Overviews**: 0/17 cited for 14 consecutive weekly runs (since 2026-04-25).
- **Perplexity**: 0/17 cited-ever. Per-prompt check-count varies 5–14 weeks due to the account throttle (see below), but no prompt — checked once or fourteen times — has ever recorded a single citation.

Per the 2026-07-27 report, this is a real content/SEO gap rather than a sampling artifact. Fourteen straight weeks at 0% on AIO is a strong enough signal that continued passive weekly monitoring alone won't move it — worth a deliberate push on the target pages (kaza, leh, munnar, jaisalmer, palolem, srinagar, gangtok, tawang, hampi, havelock-island, rann-of-kutch, varanasi, puducherry, coorg, mahabalipuram, kohima) if AI-engine visibility is a priority.

## Perplexity throttle — rotation applied this week

Confirmed again: the free-account Perplexity session stalls permanently on "Thinking…" (URL stuck at `/search/new?q=...`, never resolving to a `/search/<uuid>` result) starting at the **11th** query submitted in a run — positional/account-level, not query-specific or time-based. Direct test: waited an extra 8s past the standard 9s on the 11th query (`btv-sikkim-october`) and it was still stuck.

To counteract the same 7 prompts being starved every week, this run processed Perplexity queries in **reversed** order (prompt-list position 17 → 1) instead of the usual forward order:

- Checked this week (all `cited=false`): btv-hornbill-festival, btv-mahabalipuram, btv-coorg-august, btv-pondicherry, btv-hampi-may, btv-varanasi-winter, btv-rann-kutch, btv-andaman-season, btv-hampi-weather, btv-tawang-when
- Skipped this week (throttled): btv-sikkim-october, btv-kashmir-april, btv-goa-december, btv-rajasthan-summer, btv-kerala-monsoon, btv-ladakh-july, btv-spiti-june

Net effect: the 7 prompts that had only 4-5 weeks of Perplexity history (rann-kutch, varanasi-winter, hampi-may, pondicherry, coorg-august, mahabalipuram, hornbill-festival) all got checked and are now at 5 weeks each; 7 of the 10 previously well-covered prompts sat out this week but retain 13 weeks of prior history apiece. Recommend continuing to alternate the processing order weekly so coverage keeps evening out across all 17 rather than any subset being permanently starved.
