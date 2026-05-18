# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NakshIQ — India travel confidence engine. Monorepo with Next.js 16 web + Expo (React Native) mobile, Supabase (PostGIS) backend, bilingual (en/hi), deployed on Vercel.

## Commands

Package manager pinned to `npm@11.9.0` — do not switch to pnpm/yarn.

```bash
# Dev
npm run dev          # Both apps via Turborepo
npm run build
npm run lint
npm run type-check

# Web only
cd apps/web && npm run dev
cd apps/web && npm run build

# Mobile only
cd apps/mobile && npx expo start

# Database
npm run db:migrate   # supabase db push
npm run db:seed

# E2E (Playwright) — needs BASE_URL env
BASE_URL=http://localhost:3000 npm test
BASE_URL=http://localhost:3000 npx playwright test -g "<title>"
```

## Architecture

Monorepo (npm workspaces + Turborepo):
- `apps/web` — Next.js 16 App Router, Tailwind v4, shadcn/ui, Geist fonts
- `apps/mobile` — Expo 54, RN 0.81, expo-router
- `packages/shared` (`@itp/shared`) — types, Supabase clients, queries, i18n
- `supabase/` — migrations 001-031, seed scripts
- `scripts/` — data-maintenance utilities (run with `node scripts/<name>.mjs`)

**Routing**: web routes under `apps/web/src/app/[locale]/` via `next-intl`. Locales: `en` (default), `hi`. Middleware `src/middleware.ts` handles locale routing + 307→301 conversion.

**Components**: live flat in `apps/web/src/components/` — one file per component, no nested folders.

**Per-app overrides**: `apps/web/CLAUDE.md` loads `apps/web/AGENTS.md` (Next.js 16 docs warning + voice rules). Check for nested CLAUDE.md/AGENTS.md when working in subpaths.

## Data Conventions

- Destination data in Supabase with JSONB columns (`confidence_cards`, etc.)
- **All data must be real and verifiable** — zero fabricated phones, contacts, statistics. Honest scarcity (`[]`) preferred over fabrication.
- Verify JSONB field names against `canonical_schema.md` in memory before inserting state data
- i18n messages: `apps/web/src/messages/en.json` and `hi.json`

## Environment

See `env.example`. Key vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, `ABLY_API_KEY`, `RAZORPAY_KEY_ID/SECRET`.

## Next.js 16 Warning

This repo uses Next.js 16 — breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before writing any Next.js API code.

## Deployment

After every git push, force deploy to Vercel immediately. Web app is the primary deployment target.

## Sprint History

The 18-sprint R1-R4 roadmap is fully closed (Sprints 1-14 + GSC sweep + 13a/13b parity). Monetisation 15-17 is gated until 100K MUV + 2K email list. **For sprint detail, commits, and historical decisions see [docs/sprint-history.md](docs/sprint-history.md).** Do not re-derive from git log.

## Active work — North-to-south eateries + stays backfill

Plan: `~/.claude/plans/smooth-orbiting-music.md` (full workflow — read before dispatching agents). Strict state-by-state, north-to-south. Per-dest scope = `local_eateries` + `local_stays` + `destination_stay_picks`. Tools: `seed-eateries.mjs` (eateries → SQL/upsert) + `curate-stays.mjs --ids X` (Haiku research → Sonnet voice for picks). All research output lives at `data/research/eateries/{state}-*.json`.

| State | Status | Date | Coverage |
|---|---|---|---|
| Ladakh | ✓ done | 2026-04-29 | 14/14 dests · 93 eateries · 42 stays (100% sourced + 100% manual, 5 honest-scarcity nulls — 4 Umlingla pass + 1 Tso Moriri dup) |
| Jammu & Kashmir | ✓ done | 2026-04-28 | 17/17 dests · 98 eateries · 34 stays (100% sourced, 4 honest-scarcity nulls — 3 Sinthan Top no-infra, 1 Yusmarg xfactor dedup) |
| Himachal Pradesh | ✓ done | 2026-05-03 | 32/34 dests · 286 eateries · 116 stays (100% sourced + 100% manual, 2 honest-scarcity nulls Bir/xfactor + Kasol/xfactor, 10 fabrications/cross-dest caught — Taragarh→Palampur, Tirthan-Grand→Banjar, Kailasha Kasol→Parvati dup, River-View-Mandi→Barot, Apple Country→Apple Valley typo, Maitreya Key→Tabo, +4) |
| Uttarakhand | ✓ done | 2026-05-03 | 38/38 dests · 316 eateries · 116 stays (100% sourced + 100% manual, 1 honest-scarcity null Pithoragarh xfactor, 11 fabrications/cross-dest caught — Hosteller Haridwar, Fern Hillside Lansdowne→Bhimtal, Sattal Eco Huts, Kafal Woodhouse Tungnath→Pantwari, Swayambhu Tungnath→Karnaprayag, Kumaon Almora/Binsar dup, +5) |
| Punjab + Haryana + Chandigarh | ✓ done | 2026-04-28 | 8/8 dests · 69 eateries · 24 stays (100% sourced, 2 honest-scarcity nulls in Anandpur Sahib) |
| Rajasthan | ✓ done | 2026-04-29 | 23/23 dests · 105 eateries · 70 stays (100% sourced + 100% manual, 4 honest-scarcity nulls — all in Deeg) |
| Uttar Pradesh | ✓ done | 2026-04-29 | 13/13 dests · 98 eateries · 44 stays (100% sourced, 4 fabrications caught — Hosteller Sarnath, Dudhwa Sarai Homestay + Teli Jungle Camp, Brijwas Dham address rewrite) |
| Bihar | ✓ done | 2026-04-28 | 6/6 dests · 36 eateries · 13 stays (100% sourced, 11 honest-scarcity nulls) |
| Jharkhand | ✓ done | 2026-04-28 | 4/4 dests · 15 eateries · 13 stays (100% sourced, 78% fabrication rate caught) |
| West Bengal | ✓ done | 2026-04-28 | 6/6 dests · 38 eateries · 20 stays (100% sourced, 4 honest-scarcity nulls) |
| Sikkim | ✓ done | 2026-04-28 | 11/11 dests · 19 eateries · 21 stays (100% sourced, 4 dests honest-scarcity `[]` for restricted high-altitude lakes/NP) |
| Arunachal Pradesh | ✓ done | 2026-04-28 | 11/11 dests · 22 eateries · 25 stays (100% sourced, 6 honest-scarcity nulls + Bhalukpong/Dambuk eateries `[]`, 61% fabrication rate caught — 7 cross-state contaminations) |
| Nagaland | ✓ done | 2026-05-03 | 6/6 dests · 31 eateries · 23 stays (100% sourced + 100% manual, 1 honest-scarcity null Pfutsero/xfactor + Dzukou eateries `[]`, **78% stays fabrication rate caught** — Dzukou Valley Resort/Tent Camp/Camps fabricated, Hotel Japfu Mon→Kohima cross-dest, Mon Travellers Lodge + Pfutsero Highland Resort + Angh Valley Homestay fabricated; eateries: Été Coffee + Bamboo Shoot + Konyak Tea Retreat anchors; Tripadvisor Pfutsero page contaminated with Kohima cafés caught) |
| Manipur | ✓ done | 2026-05-03 | 5/5 dests · 14 eateries · 12 stays (100% sourced + 100% manual, **8 honest-scarcity nulls** Loktak/location + Moreh/[v,l,x] + Tamenglong/[v,l,x] + Ukhrul/xfactor, **7 fabrications caught from my own brief** — Hotel Imperial Moreh + Le Tropicana + Magnolia + Phangrei Crest + Mount Everest Ukhrul + Shirui Inn (all listicle ghosts not on district govt accommodation pages) + The Imoinu (Imphal restaurant misclassified as stay), Karang→Thanga island address corrected. Eateries anchors: Luxmi Kitchen all-women Meitei thali · Forage Korou+Kundo 2016 · Sangai Cafe at Sendra. Tamenglong eateries `[]`) |
| Mizoram | ✓ done | 2026-05-03 | 4/4 dests · 11 eateries · 12 stays (100% sourced + 100% manual, 4 honest-scarcity nulls — Champhai/location, Lunglei/location, Phawngpui-peak/[exp,val], Phawngpui eateries `[]`. **2 web_search picks were ALREADY-IN-DB fabrications caught by audit** — Hotel Lengchhawn = full ghost (zero footprint), "Aizawl Youth Hostel & Homestays (Zona House)" = merged hallucination of two unrelated concepts. Eateries: 8 listicle ghosts ruled out — Hotel Sangchia Champhai (actually Aizawl), Zote Bakery Champhai (actually Aizawl), Blue Mountain Restaurant, L T Mizo Belly, Hmar Run cafe, David's Kitchen Lunglei, Cafe Cira, Aizawl Coffee House. Anchors: Zo Foods + David's Kitchen + Magnolia. Sunday-closure flags throughout.) |
| Tripura | ✓ done | 2026-05-03 | 3/3 dests · 9 eateries · 7 stays (100% sourced + 100% manual, 5 honest-scarcity nulls — Neermahal/[loc,xfactor], Unakoti/[exp,val,loc] + Unakoti eateries `[]`. **8 of 9 web_search picks were fabrications (89% — highest single-state rate)** — Ujjayanta Palace Heritage Hotel/Homestay (Ujjayanta is the State Museum), Hotel Oasis, Neermahal Palace Resort (Neermahal is a museum), Agartala Fort View Guest House (Neermahal slot, cross-dest 53km), Unakoti Palace Heritage Resort, Kanyasree Guest House. Misnamed: Melaghar Tourist Lodge → real is Sagar Mahal Tourist Lodge. **2 of MY brief's red-flag candidates also caught** — "Welcomhotel by ITC Pinewood Agartala" (ITC Pinewood is in Pahalgam, Kashmir!) and "Taj Pushpabanta Palace" (signed May 2025 but doesn't open until 2028). Eateries anchors: Adi Shankar Hotel + Khunti Kadai + Three 81.) |
| Assam | ✓ done | 2026-05-03 | 8/8 dests · 18 eateries · 22 stays (100% sourced + 100% manual, 10 honest-scarcity nulls — Charaideo/all-4 + Manas all filled + Majuli/[loc,xfactor] + Sivasagar/[val,xfactor] + Guwahati/xfactor + Haflong/xfactor + Charaideo eateries `[]` + Manas eateries `[]`. **Bonhomie Farm Guwahati = Davao, Philippines** — pure fabrication caught. Sivasagar Tank Resort + Assam Eco Lodge + Charaideo Heritage Farmstay (cross-dest 30km!) all fabrications, replaced with Hotel Piccolo + Hotel Brahmaputra. Majuli Island Inn + Heritage Homestay + River Camps fabricated, replaced with Ygdrasill Bamboo Cottage. Eateries listicle ghosts ruled out: Tai Singpho (closed), Cafe Hendrix (no 2024+ activity), Halangshi, Pulu Majuli, Saffron Jorhat, Grab N Go Kaziranga. Anchors: Shaikh Brothers Bakery (1885 — 2nd-oldest in India!) + Khorikaa + Paradise + Chouka.) |
| Meghalaya | ✓ done | 2026-05-03 | 9/9 dests · 15 eateries · 18 stays (100% sourced + 100% manual, 18 honest-scarcity nulls — heavy thin-tourism state: Dawki/all-4 (Shatsngi is actually in Shnongpdeng P.O. Dawki, not Dawki proper), Mawsynram/[loc,val,xfactor], Nongriat/[loc,val,xfactor], Mawphlang/[loc,xfactor] + 4 dests eateries `[]` (Dawki/Shnongpdeng/Mawphlang/Mawsynram/Nongriat). **8 cross-dest contaminations pre-flagged in brief, all caught** — Cherrapunji/loc had Shnongpdeng homestay (80km), Cherrapunji/xfactor had Mawlynnong Treehouse (75km), Mawlynnong/loc had Kynrem Falls Resort (Cherrapunji), Mawsynram had Shnongpdeng Resort + Cliff Cherrapunji + Mawlynnong homestay (all wrong-town), Shillong/xfactor had Shnongpdeng Cave Lodge (80km), Shnongpdeng/xfactor had Nongkhnum Falls Camp (100km). Mawphlang Sacred Grove Resort + Forest Eco-Camp + "MTDC Tourist Lodge" (MTDC = Maharashtra! Meghalaya tourism uses different brand) fabricated, replaced with Maple Pine Farm + Lyngdoh Homestay. Anchors: Trattoria Police Bazar + Cafe Shillong + Nat Khasi (Iewduh) + City Hut Family Dhaba + Orange Roots Sohra. **3 listicle ghosts from MY brief caught**: Cafe Cinnamon (Tokyo/Amritsar only), Kebab Box (no listing), Maa-wah Restaurant (template ghost).) |
| Gujarat | ✓ done | 2026-05-18 | 29/29 dests · 146 eateries · 85 stays (100% sourced + 100% manual, **first audit-and-replace state — DB had 147 B-tier placeholder eateries + 11 stays + 114 picks all dropped and replaced**, 4 honest-scarcity picks champaner/loc + lothal/loc + marine-np/xfactor + nalsarovar/value + 2 honest-scarcity-by-omission porbandar/somnath xfactor never picked. **~20% pick fabrication rate caught**: WelcomHeritage Laxmi Vilas (Vadodara) — Laxmi Vilas Palace is still royal Gaekwad residence not a hotel, Rajhans Hotel Dwarka (chain only in Mumbai/Haryana/Bhopal, cross-state), Hotel Surya Palace Gandhinagar→Vadodara cross-dest, Aji Residency Marine NP→Rajkot cross-dest, Rann Riders Modhera→Dasada 130km cross-dest, Toran Modhera Resort (GTDC has no Modhera property — template ghost), Porbandar Palace Heritage Hotel (Huzoor Palace is a museum), Fern Residency Kevadia + "Statue Hotel Kevadia" both template ghosts, Zarwani Riverside SoU→Chhota Udepur 65km, Taj Vivanta Surat (rebranded to Marriott Athwa Lines), Patola House Patan (Salvi family Patan Patola is a museum not a homestay), Khijadiya Eco-Lodge Marine NP (sanctuary forbids accommodation), Ambaji Resort + Shree Hari + Gayatri Guesthouse all template ghosts, Lemon Tree Junagadh ghost (closest is Rajkot), Fern Residency Patan ghost, White Rann Tent Resort (generic descriptor). **Eateries dropped**: Lothal "ASI Site Canteen" disproven (multiple sources confirm "no canteen at site"), "Bagodara Highway Dhabas" + "Ahmedabad-side Picnic Pack (Suggested)" + "Pavagadh Hill Pilgrim Stalls" + "Halol Highway Dhabas" + "Dakor Gota Stalls (cluster)" + "Bavajipura Sweet Mart" + "Velavadar Adhelai Village Dhaba Cluster" + "Vekaria Gate Tea Stalls" (Nalsarovar) all category-placeholder ghosts. Cross-dest: Hotel Apple Inn + Madhuri Mehsana→Modhera 26km, Rasoi Dining Hall Bhavnagar→Velavadar 60km, Anando Palms Saputara→Hatgad Nashik (cross-state Maharashtra), Hotel Shrinath Ambaji→Abu Road misattribution. Misnamed: "Hotel Cambay Spectrum" → real is Cambay Sapphire (Gandhinagar), "Mama Lii Vadi Kathiawadi" → Lili Vadi Kathiyavadi (Patan). **Heritage anchors locked**: House of MG 1924 (Ahmedabad), Vishalla, Manek Chowk, Agashiye, Duliram Pendawala 1864 (Vadodara), Dotivala 1850 (Surat), Shah Jamnadas Ghariwala 1899 (Surat), Lachhubhai Ganthiyawala 1951 (Porbandar), Geeta Lodge Junagadh 1938, Maganlal Vallabhdas Gotawala Dakor (100 years), Nilambag Palace Bhavnagar 1859, Vijay Vilas Palace Mandvi 1906. Seasonal flags preserved: Rann Utsav Nov-Mar, Gir lodges closed mid-Jun to mid-Oct, Velavadar harrier roost Dec-Feb.) |

**Per-state quality bar (going forward)**: Each session ships eateries (greenfield/backfill via 1-2 agents) **AND** stays (audit + replace fabricated picks via 1 agent, target 100% sourced) in the same session. Total budget ≤3 agents per state (cost-aware rule). **All research via WebFetch/WebSearch agents — NEVER curate-stays.mjs (Anthropic API/Haiku) per 2026-04-28 user instruction.**

**Eateries progress**: 19 state clusters done (eateries side), 247 dests, 1439 eateries. Per-state details in session memory files — see `MEMORY.md` index.

**Stays progress (2026-05-18)**: 19 state clusters truly 100% manual-audited (**Bihar+Jharkhand+West Bengal+Sikkim+Arunachal Pradesh+Punjab+Haryana+Chandigarh+Jammu & Kashmir+Uttar Pradesh+Rajasthan+Ladakh+Uttarakhand+Himachal Pradesh+Nagaland+Manipur+Mizoram+Tripura+Assam+Meghalaya+Gujarat** — unified workflow). **NE belt 100% closed (8 of 8 NE states + Sikkim).** **West sweep started — Gujarat done, Maharashtra + Goa pending.** **0 backlog clusters remaining**. Per user 2026-05-18: strict zone order N→NE→E→W→Central→South. Next: Maharashtra → Goa → then Central (Madhya Pradesh + Chhattisgarh + Odisha) → then South (Andhra Pradesh / Telangana / Tamil Nadu / Kerala / Karnataka / Puducherry).

## Cost-aware operating rules (added 2026-04-27)

The previous session ran 79 sub-agents in one day and burned 50% of weekly Claude usage. **Reduce sub-agent fan-out**:
- Prefer **1 agent for 5-8 dests** over 3-5 parallel agents per dest
- Use Bash + grep + jq directly when possible — sub-agent only when the task genuinely needs an LLM (research, synthesis)
- Don't `/compact` repeatedly in long sessions; **start a fresh session per state** instead
- Avoid Playwright screenshots unless visual debugging is critical (each is base64 image data, very expensive)

## Pending user-action items (Claude can't do these)

- IMD/CPCB env keys (Sprint 9)
- Kaza video upload to R2 (Sprint 9)
- Photographer brief budget (Sprint 9)
- GA4: register custom dimension `aio_referral` (User scope)
- Sprint 7b: run `node scripts/log-citation-baseline-2026-04-24.mjs`; click "Run now" on the 3 Cowork scheduled tasks
- Wikidata COI: add independent press references via P248/P1343 statements as press pickups land
- GSC URL Inspection for top 5 non-prefixed URLs (e.g., `nakshiq.com/destination/kumbhalgarh/may`) to accelerate /en/ canonical consolidation
