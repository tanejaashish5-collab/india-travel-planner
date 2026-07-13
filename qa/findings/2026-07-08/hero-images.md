# Hero image audit — 2026-07-08T02:15:46.000Z

Base: `https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev`

- OK: 533
- Missing: 0
- Errors: 0
- Total probed: 533

Method: manual curl+xargs HEAD-probe (concurrency 24), R2 pattern `${R2}/destinations/<id>.jpg` — identical target the node script (`scripts/audit-hero-images.mjs`) uses. Used because the node script (CONCURRENCY=8) again did not complete inside the 45s shell budget today (2nd consecutive day, see NEW-2026-07-07-003, still unfixed).
