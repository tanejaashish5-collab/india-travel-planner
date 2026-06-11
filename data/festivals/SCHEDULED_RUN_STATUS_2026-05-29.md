# Festival video batch — 2 PM run on 2026-05-29

## Status: COMPLETE — 35/35 clips landed across all 7 accounts

## Per-account result
| acct | Email | New clips |
|---|---|---|
| 7 | ashish@forgevoice.studio | 5/5 |
| 1 | taneja.ashish5@gmail.com | 5/5 |
| 2 | wealthmythic@gmail.com | 5/5 |
| 3 | starterpodsite@gmail.com | 5/5 |
| 4 | kiddiequestmanager@gmail.com | 5/5 |
| 5 | flowcommandmanager@gmail.com | 5/5 |
| 6 | humanityunboxedmanager@gmail.com | 5/5 |

All 7 accounts drained 50 → 0 credits as expected.

## Campaign progress
- Tier A: done · Tier B: done · Tier C: **182 / 330** (147 → 182, +35)
- Tier C remaining: 148

## Files written to data/festivals/videos/ (35 new)
acct7: losar-monpa-new-year, buddha-purnima-vesak, sarnath-light-sound-show-season, urs-of-sheikh-salim-chishti, eid-ul-fitr-at-buland-darwaza
acct1: osian-camel-safari-festival, neemrana-music-festival, devprayag-ganga-dussehra, rudraprayag-kartik-purnima-mela, morni-mango-blossom-festival
acct2: kanwar-yatra, malana-village-fair, dudhwa-tharu-cultural-festival, pithoragarh-hilljatra, chaukori-tea-festival
acct3: kanatal-surkanda-devi-mela, solan-shoolini-fair, chail-cricket-festival, nako-lake-festival, champawat-nanda-devi-fair
acct4: doodhpathri-meadow-festival, kishtwar-saffron-festival, manikaran-guru-nanak-birthday, sinthan-top-snow-festival, tosamaidan-wildflower-season
acct5: yusmarg-shepherd-festival, mata-murti-ka-mela, ganga-dussehra, wildlife-week, darjeeling-tea-tourism-festival
acct6: tihar-deepawali, losar-tibetansikkimese-new-year, khajuraho-dance-festival, orchha-festival, torgya-festival

## Things that worked (worth memorizing)
1. **Flow's prompt composer is Slate.js** — JS innerText/execCommand do NOT update the model. Required pattern: `find` composer textbox ref → Chrome MCP `left_click ref` (real focus event) → Chrome MCP `type` (real keystrokes) → Chrome MCP `key Return` (submit). Memory `flow_8pm_blocked_sessions.md` had this fix; confirmed today across 35 prompts.
2. **Submit by Return**, not by clicking the Create arrow. Cleaner, no button-coord drift.
3. **Refs go stale after submission**, but `find` after each submit is cheap and reliable.
4. **Download path** = top-toolbar three-dot menu (ref_28 / ref_96 etc.) → "Download Project" menuitem. NOT the title-bar three-dot (that gives Rename/Delete).
5. **Per-account download isolation**: move `~/Downloads/download.zip` into `data/festivals/_inbox/acct<N>_<date>/` before the next account downloads, else they overwrite. Done via `mcp__Control_your_Mac__osascript`.
6. **Filename matching**: Flow names exports by first 2-3 keywords from the prompt + timestamp. Duplicate "Empty fairground" or "Alpine meadows" prompts get `_2`, `_3` suffixes in submission order — match accordingly.
7. **Account-switch sequence**: avatar → Sign out → labs.google/fx landing → "Sign in with Google" → pink "Sign in" in welcome dialog → click target row on accounts.google.com chooser. On a fresh Chrome run the FIRST acct1 attempt may CAPTCHA — needs human "I'm not a robot" once per session.
8. **Progress indicator is sticky**: `progressItems` text in DOM lingers after the card renders — trust the visible thumbnail, not the % readout.

## Caveats
- Mid-run `Downloading items…` toast can intercept subsequent clicks. Dismiss before next action.
- Chrome MCP browser_batch occasionally times out on long wait chains — break into smaller batches if needed.
- Account 1 hit CAPTCHA on initial sign-in attempt; user cleared it manually. Future runs should expect this on the first session of the day.
