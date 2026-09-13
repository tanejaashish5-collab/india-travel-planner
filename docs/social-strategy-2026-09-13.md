# NakshIQ social strategy, end to end (2026-09-13)

> Status: SHIPPED 2026-09-13 (commit 7e1b0e20). This file supersedes
> `docs/social-playbook.md` and `nakshiq-autoposter/SOCIAL_STRATEGY_2026-06-13.md`.
> Corrections made during implementation are in the Shipped section at the end.

## Context

Instagram: 18 followers after 675 posts. YouTube Shorts: 10 subscribers. Referral sessions to the site from all socials: 0 a week. The 09-08 reset (1 reel/day, carousels and Facebook off, 4 hashtags) is holding but reach is flat at ~100 per reel. The pre-registered gate stands: 100 real followers and median reel reach ≥500 by 2026-10-20, or Instagram stops.

This plan rests on two evidence files written today: `data/research/social-ledger-deep-dive-2026-09-13.md` (our own 989-post ledger) and `data/research/social-external-evidence-2026-09-13.md` (sourced 2025-26 platform facts). Numbers below carry their n.

## What works, what does not (from our own ledger)

| Finding | Evidence |
|---|---|
| Reels are the only format that reaches anyone | IG reels median 115 (n=129) vs carousels and single images 2 to 3 (n=84). ~35 carousel/static formats never exceeded reach 50, ever. |
| Facebook is dead | median 0 across 94 pulled posts |
| Best hooks | `this_vs_that`, `did_you_know`, `nakshiq_score`: median 117 to 128 (n=31 to 34 each). "Don't go here" negative hooks do not beat them (104, n=8). |
| Best hour is noon IST, not evening | 12:00 median 142 (n=18) vs 18:00 median 109 (n=27). The 06-13 strategy's "post at 18:30" was never executed and our data says it would have been wrong. |
| Friday best, Tuesday worst | 124 vs 103 (n=18 each); hour matters more than day |
| Reach fell for four months before the reset | monthly median 68 → 65 → 57 → 31, May to August |
| YouTube has the ceiling, Instagram has the floor | 13 of the top 15 posts ever are YouTube Shorts (980, 765, 581, 528…); YouTube median is 10 to 21 per format. Instagram never exceeded 198. |
| Best week ever was `did_you_know` heavy | 2026-W26, median 115 over 25 posts |
| We cannot yet learn from captions, language or audio | caption text, voice type, clip source and length are not stored in the ledger; only 43% of posts have any metrics pulled (45% on IG) |

## What the platforms reward now (sourced, 2025-26)

- Instagram ranks reels for non-followers by sends (DM shares) ahead of likes; hashtags do not drive reach; carousels get little non-follower distribution; faceless text-on-footage reels are not penalised. Trial Reels need 1,000 followers, so not available to us yet.
- 45 to 60 second reels had the highest engagement and median views in a 6M-reel study (Jan to Jun 2026). Ours are shorter.
- YouTube Shorts: daily posting does not help by itself; retention is the gate (~65% for sub-30s, ~50% for 30 to 60s, vendor data). India is the largest Shorts market; travel Shorts were 79% of travel video views in Q2 2025.
- Threads suppresses external links 5 to 10x; X gives non-Premium link posts near-zero reach. Both are out for a link-heavy site.
- WhatsApp Channels rank on 7-day follower velocity and reactions; a dated road-closure feed is a natural broadcast product (opinion, not sourced).
- The "Hindi voiceover lifts reach 130%" claim traces only to AI-voice vendors. Directionally plausible, not evidence. We test it, we do not assume it.
- Chanakya's teardown of a 10M-view channel: winners run 97% speech density, ours ran 57 to 60% with dead air; AI visuals were the failing variable. Human voice over real footage is the restart condition there and the same rule applies here.

## The strategy

**Job of socials until 10-20:** find one reel format that reaches 500 median. Not traffic, not followers as a vanity number. Referrals are 0 today and will stay near 0 at this scale; the site's growth lever is search and links, already in motion.

### Kill (already off or off now)
Carousels, single images, stories, Facebook, 18-tag blocks, the comment-to-DM promise (responder is a no-op), Threads and X (link penalty), YouTube at 2 to 3 a day (median 10 views, renders for nobody). Trending-audio picker: dropped, not "still pending".

### Keep
One Instagram reel a day, real footage only, from the three winning hooks. The daily comment brief (the only outbound lever, human only).

### Three format tests, pre-registered, run in parallel on separate surfaces so attribution stays clean

**T1. Founder Hindi voice over real footage, "X vs Y this month".** Instagram, 5 a week. The founder records a 30 to 45 second voice note on his phone (one verdict, his words, Hindi or Hinglish); the pipeline picks the two destinations' clips from the 760, cuts to 45 to 60 s, overlays the score and the month, publishes at 12:00 IST. Hook = `this_vs_that` (our best). Success: median reach of the first 15 ≥ 300 (vs 115 baseline). Kill: median < 150 after 15.

**T2. "Sadak ka haal" road reel, weekly, Fridays.** One 45 s reel from that week's road-updates rows: three dated entries read out (founder voice if available, else the existing Hindi voice engine), each with the corridor name on screen, ending "full log, link in bio". This is the share-shaped content the sends signal rewards and it is the only content we make that a stranger would forward. Success: sends per reel ≥ 5 (we currently record 0 sends anywhere).

**T3. YouTube Shorts, 1 a day, `listicle` and `did_you_know` only, 45 to 60 s.** These formats hold the top of the all-time table (980, 581, 528). Measure audience retention through the YouTube Analytics API, not views. Success: average percentage viewed ≥ 50% on the 30 to 60 s cuts. Kill: < 35% after 15.

### Cadence

| Surface | Cadence | Time (IST) | Content |
|---|---|---|---|
| Instagram reels | 1/day, 7 days | 12:00 | Mon to Thu, Sat, Sun: T1 voice reels (5) + 1 best-hook footage reel; Fri: T2 road reel |
| YouTube Shorts | 1/day | 12:00 | T3 cuts (same footage as IG where the hook matches) |
| WhatsApp Channel "NakshIQ Sadak" | 1 post/day when the road feed has rows, else silent | after the 09:30 IST job | the day's road entries + the Sunday Window; zero production cost, needs the founder to create the channel once |
| Comments | 3 accounts/day | founder's choice | existing daily brief |

Facebook, Threads, X, Pinterest: none. Pinterest is untested rather than dead; revisit only if the data cards find a home there in a future validation.

### Instrumentation (prerequisite, or the tests cannot be read)
- Store per post: caption, hook, language, audio type (founder voice / TTS / none), clip ids, duration, hashtags.
- Pull metrics for 100% of posts (currently 45%), including sends/shares and saves; pull YouTube retention.
- Weekly digest prints the three test scorecards against their pre-registered numbers.

### Decision dates
- 2026-10-04 mid-check: any test under its kill line stops; its slot goes to the leader.
- 2026-10-20 gate, unchanged: 100 followers and median reel reach ≥ 500, or Instagram stops and YouTube continues at 1/day only if T3 retention passed.

## Implementation

Files and the pattern to follow (all in `nakshiq-autoposter/` unless stated):

1. **Voice intake.** `voice_intake.py`: watches `assets/voice-notes/` (founder drops `.m4a` from the phone via AirDrop or iCloud), transcribes locally with Whisper (already used by the Chanakya pipeline; no metered API), parses "destination A vs destination B" and the month from the transcript, and queues a `voice_vs` job. Reuse the R2 clip picker and the `yt_short.this_vs_that` builder in `yt_shorts_gen.py`; add a `voice_track` input that replaces the TTS track, and a duration target of 45 to 60 s (currently shorter). Publish gate stays `NAKSHIQ_IG_DAILY_CAP=1`.
2. **Road reel.** `road_reel.py`: reads the last 7 days from `road_updates` (Supabase service key from env), builds the 3-entry script, uses the Hindi voice engine unless a voice note tagged `sadak` exists, renders with the existing builder, publishes Fridays. Reuse `apps/web/src/lib/road-updates.ts` field names.
3. **Crons.** `.github/workflows/autoposter.yml`: move the surviving IG slot to `30 6 * * *` UTC (12:00 IST); reduce YouTube to one slot at `30 6`; comment out the rest with the reason. `watchdog.py` `DAILY_SLOTS` to match.
4. **YouTube format filter.** `smart_format_weights("yt_short")`: zero weight for everything except `listicle` and `did_you_know` on YouTube; IG keeps `this_vs_that`, `did_you_know`, `nakshiq_score`.
5. **Ledger.** `autoposter.py` `_log_post`: add caption, hook, language, audio_type, clip_ids, duration_s, hashtags. `engagement_pull.py`: pull every post (drop the sampling), add `shares`/`sends` and `saves`; add YouTube `averageViewPercentage` via the Analytics API (already authorised for the channel).
6. **Digest.** `digest_weekly.py`: three scorecards (T1, T2, T3) with n, median, target, kill line; keep the 10-20 target block.
7. **WhatsApp Channel.** Founder creates the channel in the app (one-time, ~5 minutes) and shares the invite link; `road_channel_post.py` formats the day's rows as a plain-text post and drops it into `~/Automation/nakshiq-ig/briefs/` for the daily brief to include, because the WhatsApp Channels API for automated posting is not available to unverified businesses; posting stays human, 1 minute a day.
8. **Docs.** `docs/social-strategy-2026-09-13.md` (this plan, with the evidence tables) + PDF in `~/Desktop/Reports/`, and `docs/social-playbook.md` marked superseded. Memory update.

## Founder's part
- Five 30 to 45 s voice notes a week (one destination pair each, this month's verdict, Hindi or Hinglish, his words). Drop into the voice-notes folder. About 15 minutes a week.
- Create the WhatsApp Channel once; paste one post a day from the brief.
- Comments: the existing daily brief.

Everything else is automated.

## Verification
- After step 3: `post_log.jsonl` on `origin/autoposter-state` shows one IG post per day at 12:00 ±5 min IST and one YouTube post.
- After step 1: a test voice note produces a 45 to 60 s reel with the founder's audio (check waveform is not the TTS voice) and correct score overlay; dry-run publish.
- After step 5: 100% of posts from the last 7 days carry metrics in `post_engagement.json`; `sends` field non-null; YouTube rows carry `averageViewPercentage`.
- After step 6: Sunday digest prints three scorecards with n and targets.
- 2026-10-04 and 2026-10-20 checks written to `docs/` as dated files, numbers against the pre-registered lines above.


## Shipped, and what changed from the plan

Three corrections the code forced, each with the reason:

1. **YouTube and Instagram cannot have different format pools.** One render is
   cross-posted to both, so the rotation had to win on both surfaces. Final pool
   is `did_you_know`, `this_vs_that`, `listicle` — the three that appear in both
   top lists. Dropped `before_after`, `mini_guide`, `dont_go_here`.
2. **No local speech-to-text, so we ask first.** `voice_queue.py` picks the pair
   and the daily brief prints the prompt; the note that lands is bound to the
   oldest open prompt by order. The bind step refuses when two notes and two
   open prompts could be crossed, because a wrong pairing publishes him talking
   about one place over footage of another.
3. **The graphics must not declare a winner.** The first render crowned the
   higher-scoring destination in green. If he says "I'd pick Bhaderwah" while
   the card crowns Sissu, the reel argues with itself. Verdict card and caption
   are now neutral and say "my pick is in the audio".

Also fixed while in there: the new cron had no dispatch case (the exact drift
bug that block exists to prevent), the watchdog could still fire the visual slot
whose cron has been paused since May, the road reel's source credit truncated
mid-year ("12 Sep 20"), and the voice prompt quoted raw 0-5 scores instead of
the 0-10 scale everything else shows.

Files: `nakshiq-autoposter/voice_queue.py`, `voice_reel.py`, `road_reel.py`,
`run-social-local.sh`, `com.nakshiq.social-local.plist`; changes in
`autoposter.py` (`_log_post_outcome` instrumentation, `TEST_ARMS`),
`digest_weekly.py` (`_test_scorecards`), `yt_shorts_gen.py` (rotation pool),
`watchdog.py`, `.github/workflows/autoposter.yml`.

Not built, and why: **WhatsApp Channel** needs the founder to create the channel
in the app first (the Channels API is not open to unverified businesses), so
there is nothing to automate until that exists. **Pinterest** stays unvalidated;
it is a candidate, not a recommendation.
