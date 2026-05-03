# Kumbhalgarh canonical recheck — 2026-05-04

## Context
- 2026-04-29: shipped middleware 307→301 for non-prefixed `/destination/{id}/{month}` → `/en/destination/{id}/{month}`
- 2026-04-29: GSC URL Inspection → Request Indexing fired on `/destination/kumbhalgarh/may` (last Googlebot crawl was 2026-04-14, pre-deploy)
- Today (2026-05-04): 5-day recheck

## Production curl checks

**Attempted from sandbox environment — blocked by host_not_allowed firewall.**
Manual verification required:

```
curl -sI https://www.nakshiq.com/destination/kumbhalgarh/may
# Expected: HTTP/2 301  Location: /en/destination/kumbhalgarh/may

curl -sL https://www.nakshiq.com/en/destination/kumbhalgarh/may | grep -oE '<link rel="canonical"[^>]*>'
# Expected: <link rel="canonical" href="https://www.nakshiq.com/en/destination/kumbhalgarh/may"/>
```

No code changes have touched the middleware since the 2026-04-29 deploy — regression is low-probability.

## GSC manual check

URL Inspection link:
https://search.google.com/search-console/inspect?resource_id=https%3A%2F%2Fwww.nakshiq.com%2F&id=https%3A%2F%2Fwww.nakshiq.com%2Fdestination%2Fkumbhalgarh%2Fmay

**What to look for:**
- `Google-selected canonical` → should now be `/en/destination/kumbhalgarh/may` (was non-prefixed on 2026-04-29)
- `Last crawl` → should be ≥ 2026-04-29 if Request Indexing fired

**If still lagging:**
1. Re-fire Request Indexing on the non-prefixed URL
2. Or: use GSC URL Removal tool on `/destination/kumbhalgarh/may` (temporary ~6-month removal) to force Google to drop it and pick up the 301

## Status of other 4 URLs (confirmed consolidated 2026-04-29)
- `/destination/vrindavan/may` ✓
- `/destination/yercaud/may` ✓
- `/destination/chakrata/may` ✓
- `/destination/pondicherry/may` ✓
