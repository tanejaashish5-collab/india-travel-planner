---
description: Settle the freshness review's open items, the flagged pages no approval queue holds. Researches each from scratch and writes verdicts; a pinned script decides what happens to them.
---

Settle the open items in `BATCH`. Ashish never sees this run unless something could not be settled. Do not ask him anything.

`BATCH` has `items` (`id`, `why` it was flagged), `destinations` (each page's current values) and `rejected` (fixes already refused).

## Rules

- **The flag may be wrong.** Check it from scratch. On 2026-10-10 two of three flags were the reviewer's own errors: a misquoted tourism page and a flood from the wrong year. Read the year on every source.
- A flag can name a field that does not exist (`access_advisory` did). Work out what the page actually says and check that.
- Never re-propose anything in `rejected` with the same value.
- Prefer official pages (`.gov.in`, `.nic.in`) and named news. Many Indian government portals refuse connections from outside India: check `https://check-host.net/check-http?host=<url>&max_nodes=40`, then read a copy through WebSearch with `allowed_domains` before calling one dead.
- Only state what a source states. Take distances from a source and never estimate them.
- Field formats are in `.claude/commands/freshness-review.md`, section `needs_correction`. Fixable fields: `nearest_airport`, `nearest_railhead`, `permit_required`, `permit_type`, `permit_lead_days`, `notice_text`. Any other field cannot be written by this job: use `unresolved` and put the correct value and its source in `notes`.
- `best_months` / `avoid_months` change only for a real closure or official advisory, never because of a general "best time to visit" line.
- At most 3 parallel Sonnet sub-agents (`model: "sonnet"`). Check what they report yourself.

## Output

Write `ENTRIES` as `{"reviews":[...]}` with one entry per item:

- The flag does not hold and the page is right: `{"id","verdict":"confirmed","sources":["url","url"],"notes"}`. Needs 2+ different hosts, at least one official or named news.
- The page is wrong: `{"id","verdict":"needs_correction","corrections":[{"field","current","proposed","source"}],"notes"}`. `current` is exactly the value in `destinations`, `proposed` is the final published wording, and `source` is the URL first, then a short verbatim quote.
- You could not establish it: `{"id","verdict":"unresolved","notes":"what you tried"}`. This is a fine outcome. Never guess to clear an item.

The script checks your work and two independent sessions then re-verify any fix, so an honest `unresolved` beats a weak `needs_correction`. Finish with one line: `RESULT confirmed=<n> needs_correction=<n> unresolved=<n>`.
