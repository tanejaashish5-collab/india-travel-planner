# NakshIQ AI-citation weekly · 2026-08-24

Perplexity: 1/10 checked cited (10% — up from 0/10 on the same 10 prompts last week; 7 prompts not checked, see gap note)
Google AIO: 0/17 cited (0% — Δ0 vs last week's 0/17)
Combined: 1/27 checked (3.7%) — denominator isn't 34 this week because of the Perplexity throttle gap below

## New citations this week

- **btv-hampi-may — Perplexity — first-ever Perplexity citation in this tracker's history** (0/173+ checks before today). Cites `https://www.nakshiq.com/en/destination/hampi/may` — an exact match to the prompt's target_url. Verified two ways, not just the regex hit: (1) the answer text carries an inline source pill reading "nakshiq +1" directly after the sentence on Hampi's May heat risk; (2) the pill's `data-pplx-citation-url` attribute resolves to the destination page above (a second citation chip on the same answer points to `/en/destination/hampi`, the non-month page). Treat as one data point, not a trend — recheck next Monday before concluding anything changed. The tracker's only other citation event, btv-coorg-august on Google AIO (2026-08-09), reverted to uncited the very next week, so a repeat of that pattern here is a real possibility.

## Lost citations this week

None — last week's baseline was already 0/34, so there was nothing to lose. For context, btv-coorg-august (AIO) is still uncited for the second straight week since its one-week blip.

## Perplexity gap this week

The free-account throttle reappeared this run (absent entirely on 08-17) and hit at the 11th query submitted, matching the historical ~10-query/session pattern. Processed in **reversed** order (17→1) per the alternating rule; the first 10 (positions 17→8) completed cleanly, the 11th (btv-sikkim-october) stalled at `/search/new` and stayed stalled after an extra 8s confirmation wait. No fake `cited=false` rows were written for the 7 unchecked prompts: btv-sikkim-october, btv-kashmir-april, btv-goa-december, btv-rajasthan-summer, btv-kerala-monsoon, btv-ladakh-july, btv-spiti-june.

Next week should run **forward** order (1→17) per the alternating rule — which conveniently means those exact 7 prompts (positions 1-7 forward) get checked first, self-healing this week's gap.

## Still 0 after weeks of checking

16 of 17 prompts remain uncited on both engines as of today. Google AIO has checked all 17 prompts for 16-17 consecutive weeks at 0%, with the sole exception of the coorg-august blip. Perplexity's per-prompt history ranges 7-15 weeks (uneven because of the recurring throttle) and was 0% everywhere until today's hampi-may hit. Across the tracker's full history, there have now been exactly two citation events, ever: coorg-august (AIO, one week, reverted) and hampi-may (Perplexity, today, unconfirmed). Given that pattern, the honest read is these engines cite NakshIQ rarely and unstably rather than not at all — worth another 1-2 weeks of watching hampi-may specifically before deciding whether it's worth a deliberate push on that page family.

## Data note

Last week's (08-17) baseline rows in Supabase were each duplicated (two identical rows per query_id+engine, timestamps 23s apart) — values agreed (all false) so it didn't affect this week's comparison, but flagging in case it indicates a double-write worth checking in the insert step of future runs.

Full path: `/Users/ashishtaneja/Desktop/India Travel Planner/data/citation-weekly-2026-08-24.md`
