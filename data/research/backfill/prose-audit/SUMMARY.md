# Prose fact-check — 2026-06-03

Factual audit of all 226 why_go/why_not pieces written this session. 5 Haiku reviewers,
each checking only FALSIFIABLE claims (seasonal accuracy, park/shrine closure months,
named specifics) — not style. Result: **219/226 (97%) clean.**

## Corrected (6) — DB + source prose JSON updated
- **chidambaram m7 why_not** & **kanchipuram m7 why_not** — claimed July monsoon rain
  / flooding on the Tamil Nadu plains. Wrong: inland TN is in the SW-monsoon rain
  shadow and is hot/dry in July; the real rains are the **northeast monsoon
  (Oct–Dec)**. Rewritten around heat + off-season, with correct NEM timing.
- **tiruchendur m11 why_go** — said the NE-monsoon "main rains are tapering" in Nov; in
  fact Nov–Dec is NEM peak on the south TN coast. Reframed as festival-driven (Skanda
  Sashti) + milder heat, honest about showers.
- **amboli m11 why_not** — said the SW monsoon "has only recently withdrawn" in Nov; it
  withdraws from the Ghats by early–mid Oct. Reframed around the fading waterfall draw.
- **rani-ki-vav m9 why_go** — implied the stepwell "reopens fully" after monsoon; it is
  an ASI monument that never closes. Reframed around heat easing + the shaded
  below-ground galleries.
- **lambasingi m9 why_go** — overstated the cool/misty season "beginning" in Sep; that
  frost season is Nov–Jan. Reframed around lush post-monsoon greenery + thin crowds.

## Reviewed and KEPT (verifier false positive)
- **vedanthangal m8 why_not** — flagged as "Aug is mid-monsoon wet", but the original
  ("pre-nesting dry season, wetland at its lowest") is CORRECT for the Chennai region:
  the tank fills with the NE monsoon and birds nest Nov–Mar, so August is genuinely dry
  and birdless. The flag itself made the SW-vs-NE monsoon error. Left unchanged.

Per-piece flags: `presult-0.json` … `presult-4.json` (only flagged items recorded).
Theme: the one systematic risk was conflating the all-India SW monsoon (Jun–Sep) with
Tamil Nadu's NE monsoon (Oct–Dec) — caught in both directions.
