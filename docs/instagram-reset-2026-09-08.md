# NakshIQ Instagram reset (2026-09-08, option A)

## What the data said

Live profile on 2026-09-08: 18 followers, 21 following, 675 posts.
Engagement ledger (post_engagement.json, 222 IG posts, 25 May to 7 Sep):

| Format on IG | Posts | Median reach per post |
|---|---|---|
| Reels | 127 | 108 |
| Carousels | 65 | 2 |
| Score cards and editorial images | ~30 | 2 to 3 |

Lifetime: 441 likes, 0 comments, 12 saves, 4 shares. Median reach in the last 30 days: 23.

Diagnosis: 4.4 IG posts a day into 18 followers, half of them formats that reach nobody, a 20-hashtag block on every post, byte-identical Facebook mirror, and zero outbound engagement (following 21, never commented anywhere).

## What changed in the machine (shipped 2026-09-08)

1. IG capped to 1 reel per day. Enforced inside `autoposter.py` at the publish layer (`NAKSHIQ_IG_DAILY_CAP`, default 1), not just the schedule. Stories are not counted.
2. Carousel slot (12:47 IST) and evening score-card slot (19:47 IST) paused in `autoposter.yml`. Watchdog no longer force-triggers morning, reel or evening slots.
3. Hashtags cut from 18 to 4: destination, category, one rotating niche tag, #NakshIQ.
4. Facebook mirror off by default (`NAKSHIQ_FB_ENABLED=1` to restore).
5. Weekly engagement digest now prints a target check against the pre-registered numbers below.

Untouched: YouTube Shorts (2 a day), reel studio Mon/Wed/Fri (its IG copy is subject to the cap), festival greetings, DM responder.

## The 15 minutes a day that no script can do

Instagram bans engagement automation. This is the only part on Ashish. Do it from the NakshIQ account, on the phone, ideally 7 to 9 pm IST when Indian travel accounts are active.

Daily, 30 days, starting 2026-09-09:

1. Follow 20 accounts. Targets: Indian hill-station, trekking, road-trip and family-travel creators with 2K to 50K followers, plus people who comment on them. Small accounts follow back; large ones never do.
2. Leave 10 comments. Real sentences that add a fact: "Went in October, the road past Chhatru was still open" beats "Beautiful!". Comment on posts under 2 hours old, that is when the creator is reading.
3. Reply to every comment and DM on @nakshiq within the day.
4. Once a week, one story sharing a follower's or creator's post with a line of context.

What NOT to do: no follow/unfollow churn, no liking 200 posts in a minute, no third-party growth apps, no buying followers. Any of these gets the account action-blocked and resets the test.

## Pre-registered target

Baseline 2026-09-08: 18 followers, median reel reach 108 all-time and 23 last 30 days, 0 comments lifetime.

Success by 2026-10-20: 100 real followers AND median IG reel reach at or above 500.

Miss on 2026-10-20: option C. Stop Instagram posting, keep YouTube Shorts, save the compute.

Where to read it: the Sunday digest at `data/research/social-engagement-week-*.md` prints the reach half automatically. Followers are read off the profile.
