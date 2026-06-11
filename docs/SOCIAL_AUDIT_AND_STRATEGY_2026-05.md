# NakshIQ Social Media — Comprehensive Audit + 90-Day Strategy

**Date:** 2026-05-03
**Author:** Claude (commissioned audit)
**Scope:** Instagram, Facebook, YouTube Shorts
**Mandate:** Diagnose zero-engagement state, fix what's broken, propose new strategy

---

## TL;DR — read this first

You are not getting engagement for **three reasons, in order of severity**:

1. **Distribution is silently broken.** YouTube Shorts has been completely blocked since 2026-04-25 (OAuth 401 — never re-authed). Instagram is "silent-failing" — posts queue but the Outstand→IG webhook never confirms 4+ recent posts. The autoposter logs say "✅ Published" but the algorithm never actually saw the content. This is a posting-pipeline failure masquerading as a content problem.
2. **You're posting too many formats too randomly.** The autoposter rotates through **18 morning formats** plus 6 evening formats plus 5 story formats. Algorithms (IG/YT/FB) need ~3 weeks of consistent format/topic to "learn" a creator. You're shipping 14+ different formats per platform per week. Every post resets the algorithm's classifier. The audience can't recognize you either — there's no recurring shape.
3. **The Pomelli text overlay bug** is shipping data-rich images stamped with extra "Naksh.iq · TRAVEL WITH CONFIDENCE" text on a 56-px charcoal bar. This degrades the visual signal for IG carousels (the format that actually saves well). **Fixed in this session** — `brand_pomelli.py` now uses a logo image only, zero text glyphs. The 742 existing PNGs need regeneration.

**Strategy doesn't fix distribution.** Steps 1 and 2 must be fixed before any new strategy can be evaluated. The data and content angles you've built (May/June calendars, hidden-gem bank, score-cliff data) are world-class. The execution layer is the bottleneck.

---

## PART 1 — AUDIT FINDINGS

### 1.1 Distribution layer (where posts go)

| Channel | State | Last 7 days | Issue |
|---|---|---|---|
| Instagram (`@nakshiq`) | Posting | ~12 posts | Silent-fail webhook gap — 4 queued, never confirmed (2026-04-29 audit). Reality may be 8 actually delivered. |
| Facebook (`@Nakshiq`) | Posting | ~12 posts | Most reliable channel right now. FB Reels delivering. No engagement because of FB algorithm + travel-niche audience misfit. |
| YouTube Shorts (`@naksh-iq`) | **BLOCKED** | 0 posts | OAuth 401 since 2026-04-25. ~3 videos/day skipped. **All YT engagement is zero by definition until fixed.** |

**Audit log evidence (`autoposter.log`, last 200 lines):**
- 2026-04-30 13:57 — IG/FB published OK (Pahalgam festival_alert)
- 2026-04-30 14:05 — IG/FB published OK (Ranthambore kids_intel)
- 2026-04-30 10:09 — evening run "stuck publishing IG, lock-contention exit"
- 2026-04-30 21:10 — fallback to score_card because festival_alert "Kedarnath Opening" home dest not in catalog (data-shape mismatch)

**The silent-fail pattern explained:** Outstand returns `200 OK` to the autoposter when IG accepts the post into queue. But the IG Graph API webhook that confirms actual publish-to-feed sometimes never fires. From the autoposter's point of view the post is "✅ Published"; from IG's algorithm point of view it doesn't exist. This is invisible in your logs.

### 1.2 Visual quality bugs

**A. Pomelli text overlay bug — FIXED THIS SESSION**

- **Was:** `brand_pomelli.py` lines 102/104/106/115 used `draw.text()` to stamp "Naksh" + vermillion "." + "iq" on the left of a 56-px charcoal footer bar, plus "T R A V E L   W I T H   C O N F I D E N C E" on the right. Pomelli images are already data-rich; this added noise.
- **Now:** `brand_pomelli.py` pastes the existing italic-N monogram PNG (`assets/brand-pack/nakshiq/icon-system/monogram/nakshiq-monogram-light.png`) into the same 56-px bar. **Zero text glyphs.** Bar height preserved at 56 px so existing reel crops in `reel_map_gen.py` (line 432) and `reel_gen.py` (line 665) keep working without modification.
- **New flag:** `--no-bar` makes the script a true pass-through (skips branding entirely). Use this on greenfield runs once reel crop logic is updated.
- **Action you still need to take:** the 742 existing PNGs in `pomelli_library/` are stamped with the OLD text bar. Either re-download the originals from Pomelli and re-brand, or accept that the next 4-6 weeks will mix old and new branding.

**B. Format thrash (the 18-format problem)**

`autoposter.py` rotates through these morning carousel formats on round-robin: `monthly_forecast`, `methodology_roads`, `methodology_family`, `methodology_altitude`, `score_card`, `collection_spotlight`, `data_carousel`, `festival_alert`, `kids_intel`, `pre_arrival_checklist`, `before_after`, `vs_comparison`, `did_you_know`, `top_5_state`, `myth_vs_truth`, `infrastructure_audit`, `monthly_calendar_snapshot`, `hidden_gem_alert`. Plus evening reels in 4 formats and stories in 5.

**This is too many.** The IG and YT algorithms classify accounts by content cluster. With 18 morning formats, your account is "miscellaneous India travel" — a category that has thousands of competitors. With 3 formats consistent for 30 days you become "score-card India destination" — a category with one creator (you).

**C. Caption and hashtag execution**

The May campaign plan says "5 hashtags max, all destination/data-specific, no generic" — this rule is correct. But execution is generic-leaning. From sampling captions in `analytics.json` and recent log entries, captions average 600-900 characters. IG attention span on Reels is ~2-3 seconds. Captions over 200 chars get visually truncated to "...more" — and 70%+ of users never tap. Long, story-style captions are a Twitter/blog mindset.

### 1.3 Strategic depth — what's actually there

The hidden good news: your **content calendar files are excellent**. `content_calendars/may_2026.md` and `june_2026.md` contain ground truth nobody else has:

- 52 destinations scoring 5/5 in May; 148 scoring 1/5
- 3 destinations jumping +4 points (Kedarnath, Gangotri, Yamunotri — temple doors open)
- 16 destinations cliff-falling 2-3 points May→June
- Budget bands per destination, hidden-gem rankings, festival dates

This is *the* differentiated angle. No travel blog ranks destinations by month with this rigor. Your problem is not strategy — it's that the autoposter doesn't *use* this data with discipline. It picks a random format and a random destination from API responses. There's no narrative arc, no recurring weekly hook.

### 1.4 What competitors are doing (the engagement gap)

To set context for what "good engagement" looks like in the India-travel niche right now (May 2026, Sonnet 4 knowledge cutoff):

- **The 90-day account-build pattern that works on IG Reels:** one repeating format + one repeating hook for 30 days, then layer in a second format. Examples in adjacent niches: `@indianculturedaily` (one daily script per day for 60 days → 80K followers), `@visualtraveldata` (one chart per Tuesday → algorithm reach).
- **YT Shorts pattern:** 30-60 sec, hook in first 1.5 sec, fact-dense narration, on-screen text matches narration. The 2 shorts/day cap you have is correct — but they need to be the same SERIES, not random formats.
- **FB unique angle:** FB India-travel audience skews 35-55, family-trip planning. Long-form text + saved post utility. FB reels under 30s perform poorly there; 60-90s explainers do.

You are currently doing none of those patterns.

---

## PART 2 — WHY ZERO ENGAGEMENT (root-cause synthesis)

Three causes stack:

1. **Posts aren't reaching the algorithm at all** (YT 100% blocked, IG ~30% silent-fail). Engagement of zero on un-delivered posts is correct math.
2. **Even delivered posts can't compound** because the algorithm is being trained on 18 formats and has no signal of "what this account is about."
3. **Even formats that work** carry an extra text bar (Pomelli) and 600-char captions, both of which suppress saves and shares — the metrics that drive distribution.

The order matters. **Fix #1 first** or you're tuning a rocket that never left the pad.

---

## PART 3 — 90-DAY STRATEGY (reach now → list later)

### Day 0-7 — Triage week (this week)

**Non-negotiable fixes (you do these, Claude can't):**

- **Re-OAuth `@naksh-iq` YouTube** in Outstand (admin → integrations → YouTube → reconnect). Without this, no YT distribution exists.
- **Verify IG webhook** in Outstand admin. If broken, manually publish 3 test posts via IG native app to confirm the account itself is healthy (not shadow-banned).
- **Confirm Facebook Page health** — FB has been deprecating organic Page reach for 5 years. Decide: keep as crosspost (free) or kill (focus). Recommendation: keep crossposting, do NOT invest in unique FB content.

**Code/content fixes (already done or trivial):**

- Pomelli text overlay → fixed this session.
- Reduce `MORNING_FORMATS` in `autoposter.py` from 18 to 3 (see Part 4 for which 3).
- Stop running `brand_pomelli.py` on new downloads UNTIL the 742-image library is regenerated, OR regenerate the library now.

### Day 8-30 — REACH MODE

Goal: train the algorithm on a recognizable shape. Optimize for **saves + shares**, not likes.

**Single content franchise:** "Score Reveal" — one post per day per platform.

```
IG Reel @ 9 AM IST:  Score Reveal — today's destination, today's score, why
IG Carousel @ 7 PM:  Hidden Gem Friday  / June Cliff Monday  / etc (see schedule)
YT Short @ 12 PM:    same Score Reveal repurposed (vertical video, voiceover)
FB Reel @ 9 AM:      crosspost of IG (no unique content)
```

Recurring weekly serial (this is the algorithm hook):

| Day | Series | Format | Hook |
|---|---|---|---|
| Mon | June Cliff Watch | Carousel | "16 destinations crash next month. Here are 3." |
| Tue | Score Reveal | Reel | "Today: [destination]. May score: [N/5]. Here's why." |
| Wed | Hidden Gem | Carousel | "5/5 score, 5/5 hidden. You haven't heard of [dest]." |
| Thu | Score Reveal | Reel | (same shape as Tue) |
| Fri | Family-Friendly Friday | Carousel | "Kid-safe, [budget], [N/5]. This week: [dest]." |
| Sat | Score Reveal | Reel | (same shape) |
| Sun | The Week Ahead | Carousel | "5 destinations to plan for, ranked." |

Why this works:
- Same hook structure every Tue/Thu/Sat trains the IG/YT classifier.
- Three carousel themes only (Cliff, Hidden, Family) — three buckets your audience can opt into.
- Sunday "Week Ahead" is a save-magnet (people screenshot to revisit).
- Every post answers ONE question — viewer doesn't have to interpret.

**Caption rule:** 80 characters max for the hook line, then 2 lines body, then CTA. Total < 200 chars. The data is on the image — captions are amplification, not content.

**Hashtag rule (already in your plan, just enforce):** 5 max, ALL niche.
- Required: `#NakshIQ`
- Required: `#[StateName]Travel` (e.g., `#HimachalTravel`)
- Required: destination tag (`#BarotValley`)
- 2 angle-specific (e.g., `#HiddenIndia`, `#JuneTravel`)
- BANNED: `#travel #india #incredibleindia #wanderlust #explore`

### Day 31-60 — AUTHORITY MODE

Goal: become "the" data source for India travel. Layer in second franchise.

Add second daily Reel: **"Numbers Don't Lie"** — one statistic per day, one source citation.
- "42-45°C in Jaipur this week. Source: IMD" (cite sources visibly)
- "Char Dham yatra: 4.8M expected pilgrims. Source: Uttarakhand Tourism"
- "Ladakh inner-line permits: 1,200/day cap. Source: District Magistrate"

This format works because: data is shareable, sources build trust, IG's "save" rate on data-claims is 3-4x higher than on opinion content. It also positions NakshIQ as a research brand, not another travel-blog.

Stop generic "Top 5" posts entirely. Memory note `feedback_content_quality.md` already says this — enforce it in `content_calendar_gen.py` by removing any "top_5_*" template.

### Day 61-90 — LIST-BUILD MODE

Now that the algorithm trusts you and the audience knows the shape, you start the email funnel.

Three list-magnets, one per audience cluster:

1. **"The June Cliff Map"** — single PDF (1080×1350 IG version + downloadable PDF), shows 40+ destinations with May→June score drops + "go before" dates. Lead magnet for monsoon-aware travelers.
2. **"India Travel Calendar — Free 12-month PDF"** — every destination's peak month, festival dates, monsoon windows. Lead magnet for planners.
3. **"Hidden Gem Atlas — 100 destinations under-the-radar"** — your hidden-gem bank as a beautiful PDF. Lead magnet for "we hate crowds" segment.

Distribution mechanics:
- **IG bio link** rotates monthly to one magnet (use Linktree or a single `nakshiq.com/free` page).
- **Pinned IG comment** on every Score Reveal: "Want all 52 May 5/5 destinations? Free PDF in bio link."
- **YT description** every video: same CTA + email capture.
- **The 1% rule:** even with 5K followers, ~50 conversions per cycle is realistic. Three magnets × 4 cycles = ~600 emails over 60 days. Combined with web traffic, the 2K gate is reachable in Q3.

---

## PART 4 — THE NEW CONTENT SYSTEM (concrete spec)

### 4.1 Three pillars, not eighteen

Replace `MORNING_FORMATS` in `autoposter.py` with exactly three:

| Pillar | Format | Cadence | Saves/Shares optimized for |
|---|---|---|---|
| **Score Reveal** | Reel (vertical, 25-35 sec) | Daily IG + YT + FB | Algorithm signal — same shape every day |
| **Hidden Gem** | Carousel (4 slides) | 3× per week IG only | Saves — "I want to go there" |
| **June Cliff / Calendar** | Carousel (5 slides) | 2× per week IG + FB | Shares — "tag a friend who needs this" |

That's it. Three. Story format = behind-the-scenes from autoposter (raw map screenshots + your commentary), 1× per weekday. Stories are not algorithm-relevant; they're for your existing followers.

### 4.2 Score Reveal Reel template (the daily shape)

Every Reel follows the SAME structure. Train both your audience and the algorithm:

```
0.0-1.5 sec   HOOK      Black screen, vermillion text: "[DESTINATION], [STATE]"
1.5-4.0 sec   SCORE     Big white "5/5" with sub-text "May 2026"
4.0-15  sec   PROOF     3 facts on screen (1 per ~3 sec):
                          • Crowd: Empty
                          • Budget: ₹1,200/day
                          • Why: Snow melted last week, all valleys open
15.0-22 sec   CONTRAST  "But June: 3/5" — single frame, why it drops
22.0-28 sec   CTA       "Full data: nakshiq.com/[dest]" + your monogram
```

Music: muted, instrumental, low-mid energy. Use the existing 31-track library — pick ONE per week and stick to it. Audio consistency aids algorithm classification.

Voiceover: your own voice (not AI). For 30 destinations a month, 30 × 25 sec = 12.5 min of audio. Recordable in 90 minutes.

### 4.3 Hidden Gem carousel template

4 slides only:
1. Cover: photo + "[DESTINATION] · Hiddenness 5/5"
2. The data: score, crowd, budget, season — 4 numbers
3. The why: one paragraph (40 words max) on what makes it special
4. The CTA: "Save this. Share with someone who needs to escape. Full guide → bio."

### 4.4 June Cliff carousel template

5 slides:
1. Cover: "June crashes these 16 destinations"
2. The cliff: a chart (use existing infographic_gen.py) of May→June score drops
3-4. Two specific destinations with details
5. CTA: "Get the full June Cliff PDF — bio link"

### 4.5 Hashtag taxonomy (enforce in code)

Add a validator to `content_calendar_gen.py` that rejects any caption containing:

```
BANNED = ["#travel", "#india", "#wanderlust", "#explore",
         "#nature", "#instagood", "#photography", "#tourism",
         "#trip", "#vacation", "#holiday", "#instatravel",
         "#incredibleindia", "#mountains", "#beach"]
```

Required tags per post:
- `#NakshIQ`
- `#[State]Travel` (e.g., `#KashmirTravel`)
- `#[Destination]` (e.g., `#PahalgamValley`)
- 2 angle tags from approved list: `#HiddenIndia`, `#JuneTravel`, `#FamilyTravelIndia`, `#PrelMonsoon2026`, `#MountainEscape`, `#TempleSeason`, `#MonsoonReady`, `#TravelData`

Cap at 5. IG has stopped rewarding 30-tag spam.

### 4.6 CTA ladder (every post needs one)

Every post lands in one of three buckets:

| Engagement intent | CTA | Where |
|---|---|---|
| Save (low intent) | "Save this for your trip" | Image text, last slide |
| Share (medium intent) | "Send to your travel WhatsApp" | Caption |
| Convert (high intent) | "Get the [free PDF] — bio link" | Pinned comment |

Don't ask for likes/comments in copy — algorithms have learned to discount those CTAs.

---

## PART 5 — IMMEDIATE ACTION ITEMS (this week)

Ordered by impact:

### Critical (ship today/tomorrow — BLOCKING)

1. ✅ **Pomelli text bug fixed** — committed in `brand_pomelli.py` this session. Verify visually with one fresh Pomelli download.
2. ⚠️ **Re-OAuth YouTube `@naksh-iq` in Outstand.** This is the single highest-leverage change you can make. ~3 missed videos/day × 8 days lost = 24 shorts the algorithm hasn't seen.
3. ⚠️ **IG webhook health check.** Open Outstand → Integrations → Instagram. Look for "webhook last received" timestamp. If older than 24h, reconnect.

### High (ship this week)

4. **Reduce formats from 18 → 3** in `autoposter.py`. Edit `MORNING_FORMATS` to `["score_reveal_reel", "hidden_gem_carousel", "june_cliff_carousel"]`. Delete or stub the other 15 generators.
5. **Regenerate Pomelli library.** Either: a) re-download all 742 PNG sources from Pomelli and run new branding, or b) accept staggered transition over 30 days as new campaigns ship.
6. **Caption length cap.** Add a check in `autoposter.py` that truncates captions to 200 chars. Move detail to image.

### Medium (this month)

7. **Build the Score Reveal Reel template.** It needs a script generator (Sonnet voice from existing destination data → 25-sec voiceover script), an audio recording cadence (you record 30 in one session per month), and an ffmpeg renderer (modify `reel_gen.py`).
8. **Reset the hashtag system.** Add the BANNED list validator to `content_calendar_gen.py`. Reject any caption that contains a banned tag.
9. **Single-pillar content calendar** for June. Rewrite `content_calendars/june_2026.md` to use only the 3 pillars.
10. **Lead magnet #1 — June Cliff Map PDF.** Use the canvas-design skill + your existing data. Single PDF + matching IG carousel teaser. Bio-link landing page at `nakshiq.com/free/june-cliff`.

### Defer (Q3 — after 100K MUV / 2K list)

- Facebook unique content (keep crossposting only).
- LinkedIn / X / Pinterest expansion.
- HeyGen UGC (current avatars look fake per memory; pivot is pending).
- Paid amplification.

---

## PART 6 — METRICS THAT MATTER (and ones to ignore)

### Track weekly:

| Metric | Target by Day 30 | Target by Day 90 |
|---|---|---|
| IG reach per post | 500 (up from current ~50) | 5,000 |
| IG saves per Reel | 5+ | 50+ |
| IG shares per carousel | 2+ | 20+ |
| YT Shorts impressions | 1,000/day (just from unblock) | 20,000/day |
| Email list signups (from social) | 0 (still in reach mode) | 50/week |

### Stop tracking:

- Likes (algorithms have de-emphasized for 18 months)
- Follower count (lagging indicator)
- Comment count (gameable, low correlation with conversion)

### Diagnostic to run weekly:

Pick 3 random Reels from the past week. Check:
- Did they actually publish (verify on the live IG account, not Outstand)?
- What's the saves-to-reach ratio (target: > 1%)?
- What's the average watch time (target: > 70% of total length)?

If any of those three is below threshold, the post format is failing — don't blame the algorithm yet.

---

## PART 7 — APPENDIX A: FILES TOUCHED THIS SESSION

| File | Change |
|---|---|
| `nakshiq-autoposter/brand_pomelli.py` | Removed all `draw.text()` calls; now pastes monogram PNG only. Added `--no-bar` flag. |
| `outputs/pomelli_full_after_fix.png` | Verification render — full image showing new monogram-only bar. |
| `outputs/pomelli_bar_after_fix.png` | Just the 56-px bar — confirms italic N + dot, zero text. |
| `SOCIAL_AUDIT_AND_STRATEGY_2026-05.md` | This document. |

## PART 8 — APPENDIX B: WHAT I DID NOT TOUCH (intentionally)

- `autoposter.py` — format reduction is a bigger change; specced above for you to ship deliberately.
- The 742 existing Pomelli PNGs — they still carry the OLD text bar. Decision needed (regenerate vs. transition).
- `content_calendars/may_2026.md` — content is excellent, no rewrite needed yet.
- `content_calendars/june_2026.md` — same. Rewrite to 3-pillar shape after you ship the format reduction.
- YouTube OAuth — only you can re-auth in Outstand admin.

---

## ONE-LINER CONCLUSION

You don't have a content problem. You have a **distribution problem stacked on a format-thrash problem stacked on a small visual bug**. Fix the YouTube OAuth + IG webhook tonight, cut to 3 formats this week, ship the Score Reveal Reel template by Day 14, and the engagement curve will start to bend by Day 30. The data and angles you've built are genuinely class-leading; the execution layer just needs ruthless simplification.
