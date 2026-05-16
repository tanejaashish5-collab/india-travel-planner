# NakshIQ Social Playbook
> One-page operating doc for Instagram / Facebook / YouTube Shorts / Reels.
> Built on the existing `nakshiq-autoposter/` system. Tightens voice + pillar discipline; does not replace any existing code.
> Last updated 2026-05-11.

## What this doc is (and isn't)

**Is:** the strategy layer that the autoposter's 24 formats + 8 daily cron slots are now organised under. Tells anyone (you, an intern, a contractor) what to post, in what voice, on what platform, and when to override defaults.

**Isn't:** a rebuild. The autoposter (`nakshiq-autoposter/autoposter.py`, 387KB) already has the state machine, dedup, hashtag rotation, R2 video sync, Pomelli + Nano Banana 2 visual generation. Don't touch any of that without reason.

---

## 1. The 5 content pillars

Every post must fall into exactly ONE pillar. Pillars enforce brand recall — at the end of 90 days, anyone who's seen 30+ NakshIQ posts should be able to say "they do verdicts, verification, anti-traps, discovery, and moments." Today's 24 formats are scattered; this re-buckets them.

| # | Pillar | The promise | Existing formats that roll up here | Share of week |
|---|---|---|---|---|
| **1** | **VERDICT** (Go / Wait / Skip) | "Should I go to X in Y month?" — NakshIQ's core utility | score_card, monthly_forecast, this_month_only, seasonal_shift, weekend_escape, reality_check | **35%** |
| **2** | **VERIFICATION** | "Verified, here's the source" — trust signal | confidence_intel, infrastructure_truth, emergency_intel, eateries_pick, stays_pick | **20%** |
| **3** | **ANTI-TRAP** | "Don't fall for X" — contrarian, polarising | tourist_trap, dont_go_here, contrarian, before_after | **15%** |
| **4** | **DISCOVERY** | "What you didn't know about X" — underdog | underdog_spotlight, collection_spotlight, collection_series, kids_intel, camping_intel, trek_intel, adventure_pick, viral_eats_pick | **20%** |
| **5** | **MOMENT** | "Right now, this matters" — time-sensitive | festival_alert, state_showdown, elevation_face_off, difficulty_spectrum, data_carousel, blog_promo | **10%** |

**Rotation rule:** pillar mix is enforced WEEKLY, not daily. A run of 3 verdict posts in 2 days is fine if the week balances. Use the share-of-week column to audit at the end of each week.

---

## 2. Per-platform voice matrix

Same data, different surface conventions. The captions don't need to be platform-aware today (the autoposter generates one caption per post); this matrix is the rule the next round of caption edits should bake in.

| | Instagram | Facebook | YouTube Shorts | Reels |
|---|---|---|---|---|
| **Tone** | Verified + visual + crisp | Conversational + context | Punchy + revelatory | Cinematic + data-overlaid |
| **Hook style** | Stat / number lead (`4/10 for Manali in July.`) | Question lead (`Going to Coorg this month? Read this first.`) | Surprise lead (`Everyone says go to Kashmir in April. The data says wait.`) | Visual hook + payoff |
| **Caption length** | 80-120 words | 60-100 words | 70-90 words | 50-70 words |
| **Emoji** | Sparingly — 1-2 max, never decorative | Slightly more allowed (FB audience tolerates) | 0-1 — eats screen time | 0 — overlay text carries it |
| **CTA** | `→ nakshiq.com/destination/[slug]` | `→ nakshiq.com/destination/[slug]` | `→ nakshiq.com` (channel link only — YT punishes off-platform links in description) | Sticker → bio link |
| **Best post times (IST)** | 8:47, 11:17, 13:17 | 8:47 (slight engagement edge over IG), 18:47 | 9:47 (Gen-Z window), 17:17 | 11:17 (peak engagement) |
| **Hashtag count** | 18 (per `_IG_NICHE_POOL` + brand + category) | 4-6 max (algo penalty >3 on <10K accounts) | 3-5 in description | 5-8 |
| **Banned** | #HiddenIndia #OffbeatIndia (brand guardrail) | same | same | same |

**Voice anchors (apply across all 4):**
- Never "amazing" / "stunning" / "breathtaking" — flagged words.
- Always cite a number or a source when making a claim ("4/10 score · IMD May 2025 data" not "May is hot").
- Honest scarcity: if NakshIQ doesn't have verified data, say so. Don't fabricate to fill caption.
- Indian English (programme, organise, …) not US English. Hindi-Roman variants OK in tags (#manalikamausam).

---

## 3. Cadence — what lands when (existing, documented)

| Slot (IST) | Format pool | Pillar lean | Platforms | Days |
|---|---|---|---|---|
| **08:47** Morning feed | Round-robin 24 formats | Verdict (3-4×/week) + Verification | IG + FB | Daily |
| **09:47** YT Shorts #1 | Hook formats (score_reveal, dont_go_here, contrarian, top_5) | Anti-Trap, Discovery | YT | Daily |
| **11:17** Reel #1 | Visual formats (score_reveal, seasonal_shift, trap_alert) | Verdict, Anti-Trap | IG + FB | Daily |
| **13:17** Visual | Pomelli composite / map / infographic / canva | Discovery, Moment | IG + FB | Daily |
| **15:17** Reel-Map | Map-overlay reel | Discovery | IG + FB + YT | Tue / Thu / Sat |
| **16:17** Flow Story | gen_flow_stories — Nano Banana 2 text-overlay card | Verdict (scored format) | IG + FB | Sun only |
| **17:17** YT Shorts #2 | Listicle / before_after / mini_guide formats | Discovery, Verification | YT | Daily |
| **18:47** Evening feed | Round-robin (no same-dest as morning) | Anti-Trap, Moment | IG + FB | Daily |

Total: **~50 posts/week across 3 platforms.** The :17 / :47 offsets dodge GHA silent-skip on :00/:15/:30/:45 minute marks.

---

## 4. Seasonal & event override calendar

Today the cron runs a uniform format-rotation year-round. This is the biggest gap. Same post about "Manali in July" should NOT compete with the same post about "Goa in December" — they need different cadences AND different pillar weights.

Add the override layer in code (see Section 8). The calendar:

| Window | Dates | Override |
|---|---|---|
| **SW Monsoon onset** | Jun 1 – Sep 30 | Verdict pillar share rises 35% → 50%. Surface Kerala/Goa contrarian reversals + South/NE flips. Suppress trek/camping for risky Himalayan/NE regions. |
| **Char Dham permit window** | May 5 + Oct 31 (±7 days) | Emergency_intel + verdict surges on Uttarakhand dests. Force 1 post/day on permit logistics. |
| **Festival weeks** | Diwali, Holi, Pongal, Onam, Durga Puja, Eid, Christmas, Chithirai (Madurai), Karthigai Deepam | festival_alert + state_showdown pillar share doubles. Lock destination to festival's city. |
| **Wedding season** | Nov 1 – Feb 28 | Off-season-drivers content surfaces (Rajasthan, Kerala). Stay-pick pillar rises. |
| **Summer peak** | Apr 1 – Jun 15 | Hill-station verdicts (HP, UK, Sikkim, NE) compete with summer-skip warnings (Rajasthan, MP, central India). Anti-Trap rises. |
| **Diaspora homecoming** | Nov-Dec + Mar-Apr (school holidays in AU/UK/US) | NRI-parents-visit content + ASI / UNESCO heritage spotlights. Verification pillar rises. |

**Override rule:** in any given week, no override window adjusts pillar mix by more than ±15 percentage points from the baseline. Keeps the brand recognisable.

---

## 5. Visual identity

| Layer | Tool | Rule |
|---|---|---|
| Hero photo / video | **R2** (Cloudflare bucket) | First preference. 458 destination videos + 102 collections indexed. `sync-assets.mjs --commit` syncs new ones. |
| Text-overlay scored cards | **Nano Banana 2** via `gen_flow_stories.py` | Sunday Flow Story slot. Landscape descriptor per state + mood-based fonts. |
| Static composites (no R2 hit) | **Pomelli** | Fallback. Visual-first lifestyle frames. |
| Reels / Shorts composite | **ffmpeg** | Center-cropped R2 video + animated text (drawtext) + branded audio (37-track library). |
| Maps | Reel-map generator | Tue/Thu/Sat slot. Animated route + dest pins. |
| **NEVER** | Stock photography | Killed brand recall. If no R2 asset and no Pomelli output, skip the slot — don't ship stock. |

**Brand colors (must enforce on all overlays):**
- Primary: `#E55642` (vermillion, used in /trip CTA + Flow Story selected pills)
- Secondary: bone (`#F6F2E9`) for backgrounds, charcoal (`#1C1C1C`) for text
- Accent: forest-green for "VERIFIED" markers

**Type:** Fraunces (display) + Geist Sans (body). No system fonts in overlays.

---

## 6. Hashtag strategy (codifies existing implementation)

Already wired in `_IG_NICHE_POOL` + `_IG_BRAND_POOL` + `_IG_CATEGORY_POOL`. Documented here so it survives staff turnover.

- **Tier 1 — destination-specific** (3 tags): `#manali #manalitravel #himachal` — generated per-post from dest + state.
- **Tier 2 — category niche** (3 tags): cycles through 11 categories (food, festivals, activities, …) each with 3 variants. 14-day cooldown.
- **Tier 3 — broad Indian travel** (8 tags): the `_IG_NICHE_POOL`. Always include.
- **Tier 4 — branded** (3 tags): `#NakshIQ #TravelWithIQ #DataDrivenTravel`. Always include.
- **Total IG**: 18 tags. **Total FB**: pick 4-6 from Tiers 3+4 only (FB penalises >6 on small accounts).
- **Banned**: `#HiddenIndia #OffbeatIndia` — overused, signal-dilutive.

---

## 7. Decision tree — when to override the autoposter

| Situation | Action |
|---|---|
| Big news (earthquake, festival cancel, permit window opens early) | Manual moment-marketing post. Set `--allow-local` flag, generate via gen_flow_stories.py, post immediately. Then resume cron. |
| Trending hashtag in India travel niche | Generate a verdict post for the matching destination + tag in. One-off, return to schedule. |
| GA4 weekly digest flags a dest spiking +300% sessions | Bias next 3 morning slots toward that destination across pillars. |
| Engagement on a format dies (<2% engagement for 14 days) | Remove from active pool. Don't try to fix it — kill it. |
| Pomelli / R2 / Outstand API down | Cron skips silently; backlog catches up next slot. NEVER post stock photos as fallback. |

---

## 8. Code-side gaps to wire (small, ~1 session each)

Three discrete enhancements to `nakshiq-autoposter/autoposter.py`:

1. **`CONTENT_PILLAR` field on each format dict.** Add `pillar: "verdict" | "verification" | "anti_trap" | "discovery" | "moment"` to every entry in `MORNING_FORMATS`. Modify the round-robin selector to enforce **weekly pillar share** (Section 1 table), not pure round-robin. ~50 LOC.
2. **`PLATFORM_VOICE` matrix.** Per-platform caption tweaks at the end of `build_caption()`: trim to length, swap hook style, adjust emoji count, swap CTA. ~80 LOC.
3. **`SEASONAL_OVERRIDES` calendar.** Date-keyed dict (Section 4). On run, look up today's overrides and adjust the pillar weights for the rotation pick. ~40 LOC.

Plus one known-debt item:
4. **`gen_flow_stories.py` Rs/Rs library refresh** — flagged untracked. Verify the script handles fresh data + re-run library generation. Not part of playbook itself, but blocks Sunday Flow Story slot if library staleness compounds.

LinkedIn and TikTok deferred — no demand signal yet.

---

## 9. Expected impact (honest, directional)

This is execution discipline, not new ideas. The autoposter is already shipping ~50 posts/week. This makes its output **30-50% more strategic** without raising volume. Real impact:

| Dimension | Before | After 90 days | Mechanism |
|---|---|---|---|
| **Brand recall** | "NakshIQ posts random travel stuff" | "NakshIQ does verdicts + verification + anti-traps" | 5-pillar discipline; same destination shows up across 2-3 pillars in 30 days |
| **IG → site CTR** | Tracked but unstable per format | +20-40% lift on verdict posts (clearest CTA) | Per-platform CTA discipline + voice anchors |
| **Email-list growth (200 → 2K)** | Slow drip from organic site visits | Verdict + Verification pillars push CTA to email-gated content (transparency page, methodology) | Already shipped pages now get pillar-aligned traffic |
| **YT Shorts subs** | Format-random rotation | Anti-Trap + Discovery pillars stack — these are YT-favoured emotional triggers | Algorithmic recommendation improves with consistent pillar signal |
| **Festival / moment moments** | Generic posts compete with festival news | Festival weeks ride algorithmic wave (festival_alert pillar doubles) | Section 4 calendar overrides |

**What this does NOT do:**
- Doesn't 10× audience overnight. Compounding only.
- Doesn't fix dead formats — that needs the engagement audit (gap #3 from the autoposter agent report: A/B testing harness, deferred).
- Doesn't replace the need to actually ship the 78-item Round-1 backlog (e.g. /destination/[slug]/[use-case]) — social drives traffic; that bet drives the SEO engine.

**Measurement** (cron in `digest_weekly.py` already runs):
- Weekly pillar-share audit (add post-hoc rollup)
- Weekly engagement per pillar (which pillar is winning attention?)
- Monthly: IG follower growth vs baseline · email signups attributed to social UTM · YT subs gained

---

## 10. References

- Autoposter entry: `nakshiq-autoposter/autoposter.py`
- Cron schedule: `.github/workflows/autoposter.yml`
- Format registry: `nakshiq-autoposter/autoposter.py:54-85` (`MORNING_FORMATS`)
- Flow Story (Nano Banana 2): `nakshiq-autoposter/gen_flow_stories.py`
- Visual identity tokens: `apps/web/src/lib/cinematic-destinations.ts` (color/font constants source-of-truth)
- Engagement pull: `nakshiq-autoposter/engagement_pull.py`
- Memory: `feedback_autoposter_gha_only_scheduler.md` · `session_2026_05_06_autoposter_phases_a_d.md`
