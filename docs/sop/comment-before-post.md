# SOP — Comment-before-post organic acquisition

**One-line:** Leave verified-fact corrections in comment sections of established India-travel YouTubers and writers, signed as NakshIQ. Build the "data correction" brand association before/while paid distribution scales.

**Why this exists:** From the @MastersUnion mining (Section 4, audience-building): a student creator's substantive comments on top channels earned one comment 5K likes plus initial follower base. The same lever maps to NakshIQ — instead of generic praise, we land verifiable, source-cited fact corrections (real cab fare ranges, dial-tested helper phones, current permit windows). It reinforces the verification wedge without paid spend.

---

## Operating shape

- **Cadence:** 3–5 comments per channel per week. Never more (looks spammy, triggers throttle).
- **Tone:** Editor voice from `apps/web/docs/voice.md`. Direct, useful, no influencer language, no NakshIQ promotion in the comment body. Signature line ("— NakshIQ") at the end is the only branding.
- **Cite or stay quiet:** every correction must cite a real source — government site, gazette, official tourism board, dated screenshot. No "we heard."
- **Never argue.** If the creator pushes back, reply once with the source link, then drop it. Hostility is brand-corrosive.
- **Track with UTM:** every link goes through `?utm_source=youtube&utm_medium=comment&utm_campaign=cb-2026q2&utm_content=<channel-slug>`. Quarterly review in GA4.

---

## Voice — comment templates

Pick the closest pattern, adapt with the specific correction. Never copy-paste verbatim.

### Pattern A — fare / cost correction

> Good piece. Quick correction on the cab fare: the prepaid booth at [airport code] now charges ₹650 to [destination], not ₹450. Rate revised in the [Month YYYY] state notification: [source-link]. — NakshIQ

### Pattern B — permit / access correction

> Worth flagging — the [permit-name] for [destination] now opens on [date], not [old-date]. The [official board] portal updated this on [Month YYYY]: [source-link]. Travellers who plan around the old date end up adding two days at the last minute. — NakshIQ

### Pattern C — closure / season correction

> One detail that bites a lot of travellers: [destination/road/sanctuary] closes from [month] to [month] every year for [reason]. It's on the [official source]: [source-link]. The window in the video would actually fall on a closed-stretch year for half the route. — NakshIQ

### Pattern D — emergency / safety correction

> The helper number shown at [timestamp] is dead — that line was retired in [Year]. The current verified contact for [destination] [emergency type] is [number], from [district admin source]: [source-link]. We dial-test these quarterly. — NakshIQ

### Pattern E — recommendation gap (use sparingly)

> Worth adding alongside [creator's mention]: [adjacent destination] for [specific reason], typically [drive time] away. Comparable [factor], much lighter on crowds in [month]. — NakshIQ

**Never use:** "Loved this!", "Such a hidden gem!", "Following you!", any praise without information, any sentence with two adjectives in a row.

---

## Target channel list (initial 30)

Pre-vetted as established India-travel voices with active comment sections and broadly aligned audience (Indian planners, solo / family / NRI, not pure influencer-aesthetic accounts).

### Tier 1 — long-form, planning audience (visit weekly)

1. **Mountain Trekker** — Himalayan trekking, planning-heavy. Audience overlaps Ladakh/HP/UK content.
2. **Visa2Explore (Harish Bali)** — episodic India travel, food + heritage. Massive volume, ideal for fare/permit corrections.
3. **Tanya Khanijow** — solo female travel, well-researched.
4. **Curly Tales (Kamiya Jani)** — food-led India travel.
5. **Tripoto** — UGC aggregator + their original videos. High volume.
6. **Anukriti Kataria** — solo / women travel, India focus.
7. **Larissa D'Sa** — India + Asia, planning-oriented.
8. **Bharat Borah Music** — Northeast India focus, includes destination context.
9. **Indian Tripper / Travel Vlogger** — generic but high-volume India dest content.
10. **Tanya Wadhwa** — Himachal-Uttarakhand focus.

### Tier 2 — established but lower volume (visit fortnightly)

11. **The Big Trip** — long-haul India routes.
12. **Pari Vlogs** — North-east + Himalayan.
13. **Travel Epic** — Tamil + Hindi India destinations.
14. **Saif Ali** — Kashmir + Ladakh planning.
15. **Yatri Doctor** — medical-traveller / wellness travel.
16. **The Hindu (travel section comments)** — newspaper, formal corrections welcomed.
17. **Outlook Traveller (YouTube)** — magazine, editorial-grade tone needed.
18. **NDTV Goodtimes** — legacy travel, lower comment moderation.
19. **Discover India (YouTube)** — long-form documentary.
20. **National Geographic India** — high-prestige, comments often used by editors.

### Tier 3 — niche but high-intent (visit monthly)

21. **Pilgrim Trails** — religious circuits.
22. **Indian Drives** — road-trip planning, Punjab/Rajasthan/Gujarat.
23. **The Frozen Mountains** — Ladakh-Spiti specialist.
24. **Northeast Travel Vibes** — NE-only.
25. **Shenaz Treasury** — established Indian travel host.
26. **Shivya Nath (Shooting Star Blog)** — sustainable + solo, planning-grade content.
27. **Anuradha Goyal** — heritage-focused, long-form blog + YouTube.
28. **Mariellen Ward (Breathedreamgo)** — Western traveller perspective, India long-form.
29. **Lakshmi Sharath** — heritage + offbeat, sourced-style.
30. **The Holiday Adviser** — destination guides, fact-heavy.

> Drop any channel that bans comments, has had a moderation purge, or where the host has personally pushed back on a NakshIQ correction.

---

## Operational steps

1. **Pre-flight** — open the source you'll cite before opening the comment box. If you can't find a primary source in 2 minutes, drop the comment.
2. **Read the video segment in context.** Don't correct out-of-context. If a creator says "this is what locals told me," respect the framing.
3. **Compose offline first.** Draft in a text file. Self-check: any influencer adjectives? any speculation? any source missing?
4. **Post + record.** Log every comment in `data/research/comment-before-post-log.csv` with columns: `posted_at, channel, video_url, comment_summary, source_url, response_status`.
5. **Follow up after 7 days.** If the comment got `>50` likes or a creator reply, mark it for inclusion in the monthly "correction wins" digest. If it got `<5` engagement, study why — usually voice off-tone or fact too niche.

---

## Anti-patterns (caught and burned)

- ❌ Linking to a NakshIQ destination page from inside the comment body. Looks promotional. The "— NakshIQ" signature is the only brand cue.
- ❌ Correcting a personal anecdote. ("I felt the cab driver was rude" is not a fact.)
- ❌ Correcting another commenter publicly. They didn't ask. DM-style is fine on platforms that allow it.
- ❌ Using "Actually..." as an opener. Reads condescending.
- ❌ Posting more than 5 comments per channel in a week.
- ❌ Engaging once a creator replies hostilely. Drop, learn, move on.

---

## Quarterly review (10 minutes, every 90 days)

- Check `data/research/comment-before-post-log.csv` — top 5 corrections by `likes + replies`, bottom 5 by engagement. Look for tone patterns in each.
- Pull GA4 query: any `utm_medium=comment` traffic in the period? What pages did they land on? Did any convert to newsletter signup?
- Refresh the target channel list — drop any that turned hostile, add any that emerged.
- Update voice patterns in this doc if a new pattern of correction has proven repeatable.

---

## Source

Mined from the @MastersUnion YouTube digest, May 2026 (`data/research/youtube-mastersunion-nakshiq-2026-05-11.md`, Section 4 — Audience building, "Comment-before-post organic acquisition" idea). Original source: PGP TBM student creator interview where one substantive comment earned 5K likes + a usable follower base, demonstrating that the lever exists for any account willing to write like an editor instead of a fan.
