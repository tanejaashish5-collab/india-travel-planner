# Hero image audit — 2026-07-07

Base: `https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev`

Totals: ok=**533** · missing(404)=**0** · errors(other)=**0** · total=533

Method: direct HEAD-probe via curl+xargs (concurrency 24) against every destination id from a fresh `destinations` id/name/state_id read — the node script (scripts/audit-hero-images.mjs) hit the 45s shell budget twice today, so probing was done inline with identical URL pattern (`https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev/destinations/<id>.jpg`) and cross-checked against the same source table.
