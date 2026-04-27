# NakshIQ sprint history (2026-04-23 → 2026-04-27)

Historical record of the 18-sprint roadmap from R1-R4 research reports. Trimmed
out of CLAUDE.md on 2026-04-27 to reduce per-turn context overhead. Refer here
when researching past decisions; otherwise CLAUDE.md is the live source of truth.

## Sprint map

| Sprint | Status | Where it landed |
|---|---|---|
| 1 Decision Layer | ✓ closed | TL;DR card + decision rail + LIVE/SCORED badges. Commits a7769ac, f6dc346 |
| 2 Depth Pilot | ✓ closed | Migrations 014-016 + 3-dest pilot + scenarios table |
| 3 Routes/Scenarios + Tier-1/2/3 backfill | ✓ closed | All 488 dests have full depth schema. Commit 1d14969 |
| 4 Strategic Content Library | ✓ closed | 10-persona hub + collections framing + 14 India-vs profiles. Commits 2bbc229, 3c8815b, 6d705bc, 0d0bb15 |
| 5 Planner Intelligence | ✓ closed | Risk mode + variants + iCal. Commit fa54adb |
| 6 E-E-A-T | ✓ closed | Bylines + /about/team + risk quiz + weather-advisory. Commit 2548735 |
| 7a/7b AI citability | ✓ closed | FAQ × 2700 + Dataset + bot tracker + Wikidata Q139549464 + AIO referrer attribution + Cowork scheduled tasks. Commits 109837f, 8f761a0, 72bfd0b |
| 8 Quality floor + thin content | ✓ closed | Every dest_month ≥150 chars + states/articles/treks fixed. Commits 21a6e80, 86a09be |
| 9 Cost Index + NakshIQ 100 | ✓ closed | Proprietary moat citation magnets. Commit 0fbfe55 |
| 10 | absorbed into 11 | No standalone commits — likely merged into Sprint 11 nav simplification |
| 11 Nav + perf + homepage | ✓ closed | 7→4 top items + LCP fixes + homepage simplification. Commits 07f0981, dbd743e, 0a91dd2 |
| 12 UGC + membership waitlist | ✓ closed | Trip reports + waitlist + admin moderation. Commit 19ea53a |
| 13a Offline web PWA | ✓ closed | SW v29 + /offline + indicator. Commit 5a14e62. **2026-04-27 drift fix:** SW v30, +5 routes, theme-color sync, +2 manifest shortcuts. Commit a34f208 |
| 13b Expo offline parity | ✓ closed | cache.ts + offline-queue.ts + OfflineIndicator + 8 screen wraps |
| 14 Acquisition polish | ✓ closed | /corrections + /press + masthead. Commits 915a60a, 8f7df68 |
| GSC snippet sweep (post-13a) | ✓ closed 2026-04-27 | Dest-month meta rewrite + prewarmer. Commits a34f208, 344c87b, ee45093 |
| 15-17 Monetisation | 🔒 gated | Per R2 warning: requires 100K MUV + 2K email list before opening |
| 18 | placeholder for 15-17 | No standalone scope — placeholder for the gated monetisation block |

## R-report gap closure

- **R1** (SEO/E-E-A-T): §1.1 homepage, §2.2 thin-content quality, §3.2 i18n — all ✓
- **R2** (Compass Forensic): §2/§9 quality floor, §11 acquisition multiple, §1 homepage — all ✓; §15-17 monetisation 🔒 gated
- **R3** (UX/IA): §1 homepage — ✓
- **R4** (Mobile/PWA/offline): §5 Ladakh 4G drops — ✓ (web PWA + Expo parity); §7.3 E-E-A-T — ✓

## Closed in 2026-04-24 follow-up session (do not re-flag as pending)
- Bing Webmaster verify ✓ (sitemaps 0-4 submitted, IndexNow key file live)
- GA4 AI channel-group config ✓ (Channel 1 + 2 implemented; Channel 2 via gtag event)
- Wikidata entity ✓ (Q139549464 wired into Organization sameAs in layout.tsx line 224)
- AI-citation baseline ✓ (17 btv prompts × Perplexity + Google AIO = 34 checks, all 0 cited)
