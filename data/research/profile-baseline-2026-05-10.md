# NakshIQ Social — Profile Baseline + Manual Actions

**Date:** 2026-05-10 · Created during Tier 4 of the social overhaul

This file is **not automated**. Every task here is something Ashish (or
whoever manages the brand accounts) has to do by hand inside the IG / FB /
YouTube apps. Once done, write the date next to each item below so we have
a record. Future weekly digests will compare follower deltas against this
baseline.

---

## 1. Account-type verification (HARD PREREQ for Tier 2 IG insights)

Outstand's `/v1/posts/{id}/analytics` returns IG-specific fields like
`saved` and `reach` only when the IG account is **Business** or
**Creator** type. Personal accounts return zeros across every IG-only
field — the digest would show fake "no engagement" even when posts are
performing.

| Account | Handle | Type expected | Verified on | Type confirmed |
|---|---|---|---|---|
| Instagram (primary) | @nakshiq        | Business or Creator | _____ | __________ |
| Instagram (alt)     | @m8EAd / PdMu0  | Business or Creator | _____ | __________ |
| Facebook Page       | Nakshiq         | Page (always)       | n/a   | yes (auto)  |
| YouTube channel     | @naksh-iq       | n/a                 | n/a   | yes (auto)  |

**How to check IG account type** (mobile app):
1. Profile → tap your name at top → "Account type and tools"
2. Should say **"Professional account"** with one of: Creator / Business
3. If it says **"Switch to professional account"** at the bottom, the
   account is Personal — switch it to Creator (free, no commitment).

Outstand may already require Business-type to publish at all, in which
case both accounts are already verified — but this is worth eyeballing
once so we know.

---

## 2. Bio updates (after Tier 4.2 page deploys)

Once `https://nakshiq.com/social` is live, point every bio at it. The page
auto-rotates with the current month (e.g., "Dhanaulti for May" becomes
"Dhanaulti for June" without code changes).

### Instagram (@nakshiq)
**Bio text** (150-char IG limit):
```
🇮🇳 India travel scored monthly. 505 destinations. Real data, no sponsorships.
```
**Bio link:**
```
nakshiq.com/social
```
**Confirmed updated on:** ____________

### Instagram (@m8EAd / PdMu0)
Same as above.

**Confirmed updated on:** ____________

### Facebook page (Nakshiq)
**About text:**
```
India travel intelligence. We score 505 destinations every month on weather, road access, crowd density, infrastructure, and safety. No sponsorships. No vibes. Just data.
```
**Website link:**
```
https://nakshiq.com/social
```
**Confirmed updated on:** ____________

### YouTube channel (@naksh-iq)
**About text:**
```
NakshIQ scores 505 Indian destinations every month on five real dimensions: weather, road access, crowd density, infrastructure, and safety. Every short here is data first, video second.

Methodology: nakshiq.com/methodology
Top 100 destinations: nakshiq.com/nakshiq-100
Plan a trip: nakshiq.com/plan
```
**Channel links section:**
- Website: nakshiq.com/social
- Methodology: nakshiq.com/methodology

**Confirmed updated on:** ____________

---

## 3. Pinned content (one-time)

Pin one high-value post on each platform so it's the first thing a new
visitor sees from the bio link.

### Instagram
Pin three posts to the top of the grid (IG allows three pins). Best
candidates from our existing library:
1. The 60-day danger sequence reel (post_id `Q5v3y`, 2026-05-07)
2. Any pomelli infographic from the monthly_scores or tourist_traps campaign
3. A flow-story carousel for the current month's top destination

**Pinned on:** ____________

### YouTube
Pin one video to the channel page — pick the highest-view Short.

**Pinned on:** ____________

---

## 4. Story highlights (Instagram, one-time)

Create persistent highlight buckets so the profile feels less like a
firehose. Suggested:

- **Methodology** → screenshot of /methodology + one bullet "How we score"
- **Top 100** → cycling Reels showing the top 5 each month
- **Trap alerts** → tourist-trap carousel summary
- **Festivals** → upcoming-festival posts
- **Routes** → road-trip reels

Don't over-engineer — start with three highlights, add more as content lands.

**Highlights created on:** ____________

---

## 5. Follower baseline

Snapshot follower counts here so the weekly digest has something to
compare against. Run engagement_pull.py first (it doesn't pull followers
directly, but Outstand's social-account endpoint returns them — TBD if
we wire it).

| Platform | Account | Followers on 2026-05-10 | Recorded on |
|---|---|---|---|
| Instagram | @nakshiq    | _____ | _____ |
| Instagram | PdMu0       | _____ | _____ |
| Facebook  | Nakshiq     | _____ | _____ |
| YouTube   | @naksh-iq   | _____ | _____ |

---

## 6. Outstand verification (sanity check)

Outstand's `/v1/social-accounts` should show all four accounts as
"connected" and with the correct account type for IG. If any one shows
disconnected or Personal, fix that before relying on the engagement
digest.

**Confirmed in Outstand dashboard on:** ____________

---

## What's already automated (no manual work needed)

- Caption-quality fixes (Tier 1, commit `c2ec37fc`)
- Posting cadence cut (Tier 3, commit `2501b69a`)
- Daily engagement pull from Outstand (Tier 2, commit `0fa26ec8`)
- Weekly digest (Tier 2.5, commit `2e111f0b`)
- Link-in-bio aggregator page at `/social` (Tier 4.2, commit `61b6d194`)

The next iteration cycle (Tier 5) starts after the first weekly digest
lands on Sunday 2026-05-17 — that's when we get the first cohort of
"new-schedule + new-captions" posts to compare against this week's
baseline.
