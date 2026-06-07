# Dismissed findings — false positives the verify layer caught

> When an audit (M1–M7) raises an alert but the independent verifier **cannot reproduce it**, the finding lands here instead of waking you up or entering the fix queue.
> This is the layer that would have caught the 2026-06-04 "5 of 5 findings were all false positives" incident.
>
> Review weekly. If something here keeps showing up, the *audit probe itself* has a bug worth fixing (e.g. the section-K Leaflet phantom, the section-E SOS regex miss).

| Date (UTC) | Job | Finding | Why dismissed (independent check) |
|---|---|---|---|
| 2026-06-07 04:01 | audit-cache-headers | https://www.nakshiq.com/en/explore/state/himachal-pradesh | re-probe shows public + cached (HIT/STALE) across 3 passes (cache-control="public, max-age=0, must-revalidate", MISS→HIT→HIT). Edge has a cached copy — original MISS was a transient cold-start. |
