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

## Day-one target list (verified live 2026-09-08 via public profile pages)

Why this is a list and not a bot: Meta's API only allows replying on our own posts. Following and commenting on other accounts requires a logged-in browser session, which is the exact pattern Instagram fingerprints and action-blocks, fastest on accounts under 100 followers. So the research is automated, the taps are yours.

Follow all 22 today (under 30 seconds each). Comment on the 10 marked with a star, on their newest post, one sentence with a fact.

| Handle | Niche | Followers | Comment today |
|---|---|---|---|
| @nomadsofspiti | Spiti Valley | 8,079 | ★ |
| @incredible_kinnaur | Kinnaur | 23K | ★ |
| @visit__himachal | Himachal | 12K | ★ |
| @travelmykashmir | Kashmir | 9,380 | ★ |
| @awesome_arunachal | Arunachal planner | 20K | ★ |
| @travelnortheast_ | Northeast local | 4,283 | ★ |
| @northeast.tourism | Northeast | 8,295 | ★ |
| @himalayantrekkers | Himalayan treks | 3,760 | ★ |
| @indiatreks | India trekking | 2,564 | ★ |
| @familytravelervlogs | Family travel | 15K | ★ |
| @rajasthantourplanner | Rajasthan | 3,670 | |
| @rajasthan_touring | Rajasthan | 1,088 | |
| @tourhimalayas | Himalayan family tours | 4,194 | |
| @sikkim.in | Sikkim | 30K | |
| @nthadventure | Arunachal adventure | 10K | |
| @thenortheastjournal_ | Northeast stories | 2,426 | |
| @himalyantrekking | Trekking guides | 525 | |
| @ladakh_trip_maker | Ladakh | 1,041 | |
| @himachaltravelclub | Himachal community | 1,005 | |
| @divsigupta | Offbeat India creator | 54K | |
| @aforaditii | Solo India creator | 44K | |
| @exploring_himachal_ | Himachal | 50K | |

Dead handles dropped: spitiindia, thehimachal, tristravel_meghalaya (profile unavailable).

Comment formula that works: destination plus month plus one number from nakshiq.com. Example on a Spiti post: "Went via Kaza in early October, Kunzum was still open but the score for late October drops to 5/10 for road risk."

Ask me each evening for the next day's list. I will pull 20 fresh accounts and check they are live before you see them.

## The daily brief is automated (2026-09-08)

`~/Automation/nakshiq-ig/` holds a launchd job, `com.nakshiq.ig-brief`, that fires at 17:30 and 20:10 local. Two fire times because a single daily fire drops the day on network loss. Every run:

1. Rotates the account pool least-recently-served first.
2. Re-verifies each handle against its public profile page. No login, no session, read only. Dead handles are dropped and named in the brief.
3. Drafts a comment line per starred target from a cached pack of 625 verified NakshIQ month verdicts, with em-dashes stripped and the "Go in September" verdict opener removed so ten comments do not all read like the same advert.
4. Renders the dark-theme PDF to `~/Automation/nakshiq-ig/briefs/`, mirrors it to `~/Desktop/Reports/`, and posts a clickable notification.

What it does not do, by design: log in, follow, comment, like, or DM. Instagram bans engagement automation and enforces on the account, not the script. Those taps stay human.

### Four bugs found while building it, all fixed

1. **The first version reported success while every item failed.** An Instagram description-format change made all 22 handles read as "unreadable" and the job still logged "brief ready" and wrote a PDF containing zero accounts. Total item failure now exits non-zero, posts a failure notification, and leaves the served dates untouched so tomorrow retries the same accounts.
2. **The description parser was too strict.** Instagram serves both "18 Followers, 21 Following, 675 Posts" and "8,079 followers, 259 following, 446 posts" and swaps without notice. The matcher is now case-insensitive and accepts either dash.
3. **The plist re-ran the whole job on failure.** `node script || /opt/homebrew/bin/node script` was meant as "if that binary is missing, try the other" but means "if the job fails, run it again". Interpreter selection moved into `run-brief.sh`, which picks a node and runs it exactly once.
4. **Clicking the notification opened an empty Script Editor.** A notification posted by bare `osascript` is owned by Script Editor. `NakshIQ-Brief.app` now owns them: it carries a `CFBundleIdentifier` that `osacompile` does not write, and because `--args` never reaches an applet's argv, the job hands over the path in a file. Marker file present means post the notification; absent means the user clicked, so open the brief.

### Standing maintenance

- **The pool is 22 accounts and the brief serves 20 a day, so it barely rotates.** It needs expanding to about 60 before the rotation is real. Ask me to refresh it; discovery needs judgement, so it is a session job, not a cron job.
- The verdict pack in `data/verdicts.json` covers September, October and November. Refresh it before December.
- Logs: `~/Automation/nakshiq-ig/logs/`. A failed run says FATAL and notifies.
