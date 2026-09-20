# NakshIQ AI-citation weekly · 2026-09-07

Perplexity: **UNAVAILABLE this run** — see note below. Not compared to last week (no data written, no fake data used).
Google AIO: 0/17 cited (0% — Δ0 vs last week's 0/17)
Combined (AIO only, since Perplexity aborted): 0/17 (0%)

## New citations this week
- None (AIO). Perplexity not checked this run.

## Lost citations this week
- None to report on AIO (was already 0/17 last week).
- Perplexity: cannot compare — engine aborted before any query ran, so last week's 1/10 cited (`btv-hampi-may`) is neither confirmed held nor lost this week.

## Still 0 after multiple weeks of checking (AIO, confirmed via last 2 runs — 2026-08-23 and 2026-08-30 — plus this week's 2026-09-07)
- btv-tawang-when, btv-hampi-weather, btv-andaman-season, btv-rann-kutch, btv-varanasi-winter, btv-hampi-may, btv-pondicherry, btv-coorg-august, btv-mahabalipuram, btv-hornbill-festival — 0/3 on AIO across the last 3 checks I could see.
- The other 7 best-time-visit queries (spiti, ladakh, kerala, rajasthan, goa, kashmir, sikkim) show the same pattern in the visible history but I only pulled the last 60 citation rows, so I can't responsibly claim a longer streak than what's directly confirmed above.

## Engine failure — Perplexity aborted this run (not a captcha, a hard block)

Every attempt to load `perplexity.ai` in the Chrome MCP tab failed with **"Cannot attach to this target"** and screenshots/page-text calls returned **"This page cannot be scripted due to an ExtensionsSettings policy."** This is a browser-extension-policy block on the whole domain, not a per-query CAPTCHA — so unlike the CAPTCHA failure mode in the task brief, retrying or waiting won't help; it needs a policy change (likely a Chrome extension management setting blocking the Claude in Chrome extension from scripting perplexity.ai) or running this check from the built-in browser pane instead of the Chrome extension.

**No Perplexity data was written to Supabase this week** — only the 17 Google AIO rows (`query_id`, `engine: "aio"`, `cited`, `note: "weekly 2026-09-07"`) were inserted, all `cited: false`.

**Action needed:** if you want Perplexity checks to resume next Monday, either (a) allow the Claude in Chrome extension to script perplexity.ai in your Chrome extension policy settings, or (b) tell me to switch this task to the built-in browser pane (`mcp__Claude_Browser__*`) for the Perplexity leg specifically.

## Context (from prior data, last 60 rows only)
- Prior week (2026-08-31 run, timestamp 2026-08-30): Perplexity checked only 10/17 queries (consistent with the known ~10-query account throttle noted in project memory) — 1/10 cited (`btv-hampi-may`). AIO 0/17.
- Week before (2026-08-23 run): same pattern — Perplexity 1/10 cited (`btv-hampi-may` again), AIO 0/17.
- `btv-hampi-may` on Perplexity has now been cited in both of the last two runs I could verify — worth a manual Perplexity check this week once the extension block is resolved, to see if that citation held a third time.
