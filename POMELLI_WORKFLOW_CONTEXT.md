# Pomelli Creative Workflow — Full Context for Claude Code

> Complete operating manual for generating NakshIQ social creatives via Google Labs Pomelli.
> Written 2026-05-06 after shipping 31 creatives across 3 waves. Every gotcha here was hit live.

---

## 1. What Pomelli is

Google Labs AI tool that generates on-brand social campaigns from a text brief. **No API — browser-only.** Drive it with Chrome MCP (`mcp__claude-in-chrome__*`).

It reads a "Business DNA" profile (already configured for NakshIQ) and generates creatives that match brand voice, palette, and typography automatically. It does NOT render the NakshIQ logo — that's added post-download by `brand_pomelli.py`.

**URL pattern:** `https://labs.google.com/u/{authuser}/pomelli/`

---

## 2. Accounts (rate limits are PER ACCOUNT)

| authuser | Account | Avatar | Status |
|---|---|---|---|
| `u/0` | default | "a" | NakshIQ — usable |
| `u/1` | S | — | NakshIQ — usable |
| `u/2` | H | "H" | NakshIQ — usable |
| `u/3` | kiddiequest | — | NakshIQ — usable (defaults to Agent/Omni-Flash, watch for it) |
| `u/6` | Starter PodSite | — | NakshIQ — usable |
| `u/4` | forgevoice | — | **OFF LIMITS — different business** |
| `u/5` | flowcommand | — | **OFF LIMITS — Sindoor Match Makers** |

**Switching accounts is free and instant** — just change the `/u/N/` segment in the URL. No password, no re-auth. This is the primary rate-limit escape hatch.

---

## 3. The workflow, step by step

### Step 1 — Open Pomelli

```
navigate → https://labs.google.com/u/0/pomelli/
wait 4-5s (page is slow to hydrate; first screenshot is often blank/dark)
```

### Step 2 — Put the brief in the textarea

**Use `form_input` with a ref, NOT the `computer` type action.** The `type` action loses focus and the text lands nowhere.

```
find → query: "Describe the campaign textarea"
   → returns ref_NN
form_input → ref: ref_NN, value: "<your brief>"
```

The ref number changes between page loads (`ref_50`, `ref_53`…). Always re-`find` after a navigate.

### Step 3 — Set the aspect ratio

**The aspect ratio RESETS to unset after every navigation. Set it every single time.**

Click the "Aspect Ratio" pill → dropdown opens with 3 options → click the one you want.

Dropdown option positions relative to the pill button (when pill is at y≈553):

| Option | Approx y |
|---|---|
| Story (9:16) | ~605 |
| Square (1:1) | ~653 |
| Feed (4:5) | ~700 |

Verify by screenshot — the pill label should now read `Feed (4:5)` or `Story (9:16)`. If it still says plain "Aspect Ratio", the click missed; re-open and retry.

**Which to use:**
- `Feed (4:5)` → 1080×1350 — carousel/feed posts. **Default for most work.**
- `Story (9:16)` → 1080×1920 — Reel cover-cards, Stories.
- `Square (1:1)` → 1080×1080 — rarely needed.

### Step 4 — Submit

Click the round send-arrow button (right side of the input box, approx x=1194, y=553).

**The first click often doesn't register.** If no skeleton placeholders appear within ~10s, click it again. Two clicks is normal, not a bug.

### Step 5 — Wait for the 3 idea suggestions

Pomelli returns **3 campaign ideas** (title + one-line description), not creatives yet. Takes **40–70 seconds.**

The ideas are Pomelli's interpretation of your brief. It's smart — it merges and sharpens. Read all 3 and pick the one closest to your intent. You can submit the same brief again to get 3 more ideas if none fit.

### Step 6 — Click into the idea you want

Clicking an idea creates a real campaign and starts generating **4 creatives**. URL becomes `.../pomelli/campaigns/{campaignId}`.

**Creative rendering takes 60–120 seconds.** They appear one at a time. Layout is a 3-across grid with the 4th below.

Approximate thumbnail click positions (at 1512×809 viewport, scrolled to top):

| Position | Coords |
|---|---|
| Creative 1 | (741, 528) |
| Creative 2 | (1043, 528) |
| Creative 3 | (1346, 528) |
| Creative 4 | scroll down 3-5, then (741, 405) |

### Step 7 — Open each creative and download

Click a thumbnail → detail view opens (URL gains `/{creativeId}`). Then run this JS:

```javascript
(() => {
  const imgs = document.querySelectorAll('img');
  let mainImg = null;
  for (const img of imgs) {
    if (img.alt === 'Marketing image' && img.naturalWidth > 100) {
      mainImg = {src: img.src, w: img.naturalWidth, h: img.naturalHeight};
      break;
    }
  }
  if (mainImg) {
    const a = document.createElement('a');
    a.href = mainImg.src;
    a.download = 'pomelli_DESCRIPTIVE_NAME_1.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return JSON.stringify({downloaded: a.download, w: mainImg.w, h: mainImg.h});
  }
  return 'no image found';
})()
```

The `alt === 'Marketing image'` selector is the reliable one. Returns `{"downloaded": "...", "w": 1080, "h": 1350}` on success — **check the dimensions match your chosen aspect ratio.**

Filename convention: `pomelli_<snake_case_subject>_1.png`. Make it descriptive of the actual creative content (for caption-visual coherence downstream).

### Step 8 — Back to campaign, repeat

Click "Back to <Campaign Name>" (approx 432, 39) → returns to grid → click next creative.

Do NOT reuse a `ref_N` from `find` across a navigation — it silently no-ops. Use coordinates or re-`find`.

### Step 9 — Move downloads out of ~/Downloads

Files land in the user's real `~/Downloads`. Your sandbox can't see it — use osascript:

```bash
mkdir -p '/Users/ashishtaneja/Desktop/India Travel Planner/nakshiq-autoposter/pomelli_library/waveN_staging'
mv ~/Downloads/pomelli_a.png ~/Downloads/pomelli_b.png ... '<...>/waveN_staging/'
```

Verify count before proceeding.

### Step 10 — Brand with the monogram bar

`brand_pomelli.py` hardcodes `POMELLI_DIR = pomelli_library/`, so to brand ONLY the new files, call its functions directly against the staging folder:

```bash
cd "<repo>/nakshiq-autoposter"
python3 -c "
import sys, os
sys.path.insert(0, '.')
from brand_pomelli import brand_image, load_monogram
mono = load_monogram()
staging = 'pomelli_library/waveN_staging'
for f in sorted(os.listdir(staging)):
    if f.endswith('.png'):
        brand_image(os.path.join(staging, f), mono, dry_run=False, no_bar=False)
        print(f'  ✓ {f}')
"
```

**Never run bare `python3 brand_pomelli.py`** — it re-processes the whole library and double-brands existing images.

Result: 56-px charcoal bar appended at the bottom with the italic-N + vermillion-dot monogram. **Zero text glyphs** (this was a bug that got fixed 2026-05-03 — do not reintroduce `draw.text()`).

Final dimensions:
- 4:5 → 1080×1350 becomes **1080×1406**
- 9:16 → 1080×1920 becomes **1080×1976**

Do NOT change `BAR_HEIGHT` (56) without also updating the crop expressions in `reel_map_gen.py` (~line 432) and `reel_gen.py` (~line 665).

### Step 11 — Move into the library proper

```bash
cd '<...>/pomelli_library' && mv waveN_staging/*.png . && rmdir waveN_staging
```

Note: `rmdir` from the Linux sandbox mount fails with EPERM — run it via osascript instead.

### Step 12 — Update manifest.json

```python
import json
from pathlib import Path

manifest_path = Path('pomelli_library/manifest.json')
with open(manifest_path) as f:
    m = json.load(f)

new_campaigns = {
    'waveN_campaign_key': ['pomelli_a_1.png', 'pomelli_b_1.png', ...],
}

new_files = [f for files in new_campaigns.values() for f in files]
existing = set(m.get('images', []))
for f in new_files:
    if f not in existing:
        m['images'].append(f)

for camp, files in new_campaigns.items():
    if camp not in m['campaigns']:
        m['campaigns'][camp] = files
    else:
        for f in files:
            if f not in m['campaigns'][camp]:
                m['campaigns'][camp].append(f)

m['total_images'] = len(m['images'])
m['total_campaigns'] = len(m['campaigns'])

with open(manifest_path, 'w') as f:
    json.dump(m, f, indent=2)
```

### Step 13 — Commit and push

**⚠️ CRITICAL: commit on `main`, NEVER on `cinematic-rollout-*`.** See §7.

```bash
export PATH=/opt/homebrew/bin:/usr/local/bin:$PATH   # git needs gh on PATH for credentials
cd '<repo>'
git checkout main
git add nakshiq-autoposter/pomelli_library/manifest.json <each new png path>
git commit -m "pomelli waveN: ..."
git push
```

**Path-scoped `git add` only — never `git add -A`.** (Repo rule: prevents sweeping unrelated WIP into your commit.)

---

## 4. Manifest schema

```json
{
  "version": 8,
  "total_images": 757,
  "total_campaigns": 317,
  "images": ["pomelli_x_1.png", "pomelli_y_2.png", ...],
  "campaigns": {
    "campaign_key": ["pomelli_x_1.png", "pomelli_x_2.png"]
  },
  "aspect_overrides": { "pomelli_z_1.png": "9:16" },
  "campaign_aspects": { "wave3_foo": "9:16" }
}
```

- `images[]` is a **flat list of filename strings**. `autoposter.py` also accepts dicts (`{file, campaign, subject}`) and normalizes strings via a reverse lookup built from `campaigns{}`. Strings are the existing convention — stick with them.
- `aspect_overrides` / `campaign_aspects` are new keys added 2026-05-06 so future code can filter 9:16 reel covers out of 4:5 feed slots. **Existing autoposter ignores them — backward compatible.**
- Campaign keys feed `pick_oldest_unused()` rotation in `autoposter.py`. New keys not in `POMELLI_CAMPAIGN_ORDER` still get picked via the fallback path.

---

## 5. Rate limits and how to survive them

**Symptom A:** a single creative slot shows `Experiencing high demand. Try again.`
**Symptom B:** creatives never render — skeleton placeholders spin for 2+ minutes.

**Threshold:** roughly **5–6 campaigns per account per day.** Idea-suggestion generation keeps working after creative generation is throttled, which is confusing — you'll get 3 ideas back, click one, and then nothing renders.

**Fix:** switch accounts. Change `/u/0/` to `/u/2/` in the URL. Fresh quota, instant, no re-auth. Verified working 2026-05-06 — u/0 throttled mid-Wave-3, u/2 delivered 8 more creatives immediately.

**Don't** retry a throttled slot repeatedly. Skip it and move on, or rotate.

---

## 6. Brief-writing patterns that work

Pomelli's idea engine is strong. Give it **real data and let it merge** — don't over-constrain.

### Structure that produced the best results

```
<Campaign concept name>. <One-line hook with the headline number.>
NakshIQ verified data: <Dest A> (<State>, score N/5, <2-3 specific facts>),
<Dest B> (...), <Dest C> (...).
<Visual direction: series of X, one destination per card, data chips>.
<Palette: vermillion accent, dark editorial>.
Brand voice: <one line>.
```

### Real example that worked

> The Hidden Gem Atlas — India's 5/5 score, 5/5 hiddenness, empty-crowd destinations. NakshIQ verified data: Barot Valley (Himachal Pradesh, score 5, hiddenness 5/5, crowd Empty, ₹1,000/day), Tosamaidan (Jammu and Kashmir, score 5, hiddenness 5/5, crowd Empty, ₹1,150/day), Gurez Valley (J&K, score 5, hiddenness 5/5, crowd Empty), Hanle (Ladakh, score 4 in June, hiddenness 5/5, crowd Empty — accessible only after May). Series of bold reveal posters: each card names ONE destination with its data chips (score, hiddenness, crowd, budget). Editorial dark palette, vermillion accent for the data numbers. Brand voice: "5/5 score, empty crowds, you've never heard of it." NakshIQ travel intelligence, no fluff.

**Result:** 4 creatives — an Atlas cover plus individual Barot / Tosamaidan / Gurez reveals, each carrying the exact ₹ and hiddenness numbers from the brief.

### Key techniques

1. **Name 4–6 destinations with their real numbers.** Pomelli picks the strongest and builds one card per dest. Naming more than 6 dilutes it.
2. **Say "ONE destination per card"** explicitly if you want individual reveals rather than a collage.
3. **Include the specific fact that makes it interesting** ("temple doors just opened after 6-month winter closure", "Indian Astronomical Observatory at 4,500 metres", "India's last village before Tibet"). Pomelli surfaces these verbatim on the creative and finds matching photography.
4. **Bundle 2 related angles per brief.** One campaign yields 4 creatives; two angles gets both covered without burning two campaigns against the rate limit.
5. **State the palette** — "vermillion accent on dark editorial palette" reliably produces on-brand output.

### Data source

Everything comes from `nakshiq-autoposter/content_calendars/{month}_{year}.md` — auto-generated from Supabase, all claims verifiable. Regenerate monthly with:

```bash
python3 content_calendar_gen.py --month N --year 2026
```

Eight data dimensions: score distribution, score jumps, score cliff, hidden gems, heat traps, budget intelligence, infrastructure reality, festival calendar.

---

## 7. Git rules — read this before committing

**NEVER commit to `cinematic-rollout-2026-05-05` (or any `cinematic-rollout-*` branch).** That branch is the founder's in-flight UI feature work. Pomelli / autoposter / content-library commits go on **`main`**.

Why it matters: the autoposter's GitHub Actions cron checks out `main`. Commits on a feature branch never reach production.

Also:
- `export PATH=/opt/homebrew/bin:/usr/local/bin:$PATH` before any git command run via osascript — git authenticates through `credential.helper = !gh auth git-credential`, so `git push` fails with a misleading "could not read Username" error if `gh` isn't on PATH.
- Path-scoped `git add` only. Never `git add -A`.
- Verify the push actually landed — check that HEAD moved and the remote advanced. A green log line is not evidence.

---

## 8. Quality bar — every creative must clear all 6

1. **Real data only.** Verifiable against Supabase / the content calendar. Zero fabricated scores, prices, phone numbers, or destination facts.
2. **Caption-visual coherence.** The destination named in the caption must be the destination shown in the visual. No "smart-pick A, render B, caption C" decoupling.
3. **No text overlay added by us.** Pomelli's own data text + the monogram bar. Nothing else. (`brand_pomelli.py` must never call `draw.text()`.)
4. **5 hashtags max, all niche.** `#NakshIQ` + `#[State]Travel` + `#[Destination]` + 2 angle tags. Banned: `#travel #india #wanderlust #explore #incredibleindia` etc.
5. **One content pillar per campaign.** Score Reveal / Hidden Gem / June Cliff. No mixed intent.
6. **Aspect ratio decided upfront.** 4:5 for carousel, 9:16 for reel covers. Don't mix within a campaign.

---

## 9. Content pillars (from the 2026-05-03 social audit)

The autoposter is moving from 22 morning formats down to 3 pillars. Every new creative should feed one:

| Pillar | Format | Cadence | Aspect |
|---|---|---|---|
| **Score Reveal** | Reel, 25–35s | Daily IG + YT + FB | 9:16 covers |
| **Hidden Gem** | 4-slide carousel | 3×/week IG | 4:5 |
| **June Cliff / Calendar** | 5-slide carousel | 2×/week IG + FB | 4:5 |

Canonical reference: `SOCIAL_AUDIT_AND_STRATEGY_2026-05.md` at repo root.

---

## 10. Current library state (as of 2026-05-06)

| Library | Count | Status |
|---|---|---|
| `pomelli_library/` | **757 images / 317 campaigns** | Active. 31 new clean creatives added today. |
| `pomelli_stories_library/` | 1,899 images / 491 dests / 36 states | Clean PIL-generated. `hidden_gem` format thin (77 vs ~480). |
| `flow_stories_library/` | 956 images | **Buggy — deprecated. Stop adding. Let it age out.** |

~742 older `pomelli_library` PNGs still carry the pre-2026-05-03 text bar. Decision: staggered transition, no bulk regen.

### Waves shipped today

| Wave | Commit (on main) | Creatives | Aspect | Campaign keys |
|---|---|---|---|---|
| 1 — June Cliff | `5e1df393` | 11 | 4:5 | `wave1_the_june_cliff_is_coming`, `wave1_june_60_percent_suitability_crash`, `wave1_60_day_danger_sequence` |
| 2 — Hidden Gems | `48ed7170` | 12 | 4:5 | `wave2_hidden_gem_atlas`, `wave2_six_5_5_june_sanctuaries`, `wave2_4500m_dark_sky_window` |
| 3 — Score Reveal | `d75ed59d` | 8 | 9:16 | `wave3_mays_perfect_5_5_destinations`, `wave3_may_2026_score_reveal` |
| aspect tags | `719e9acb` | — | — | manifest only |

---

## 11. Remaining waves (briefs ready to use)

### Wave 4 — Real-time / time-anchored (8 campaigns)

Taps `/api/weather`, `/api/weather-advisory`, `/api/alerts`, `/api/cron/road-conditions-sweep` — none of which the current 317-campaign library touches.

This Week's Heat Trap · Buddha Purnima Countdown · Char Dham Doors-Open Calendar · Hemis Festival Countdown · Manali–Leh Reality Check · Spiti Loop June Window · Pre-Monsoon Pack-List · Last Cool Hours Map

### Wave 5 — Untapped data dimensions (10 campaigns)

Eateries Pick Northeast · Eateries Pick Hill States · Stays Under ₹2K Scoring 5/5 · Heritage Stays No Markup · Solo-Female Confidence Map · Kid-Safe 5/5 Picks · Trek-Window Calendar · 74 Road Trips refresh · Budget Reality ₹1000/day · Cell-Network Reality Map

Data lives in `local_eateries`, `local_stays`, `destination_stay_picks` (2,629 verified eateries across 478 destinations — backfill complete).

### Wave 6 — Lead-magnet teasers (4 campaigns)

June Cliff Map PDF teaser · India Travel Calendar PDF teaser · Hidden Gem Atlas PDF teaser · Generic CTA cover

Aligned to the Day 61–90 list-build phase of the 90-day plan.

Full plan: `POMELLI_Q3_2026_CREATIVE_PLAN.md` at repo root.

---

## 12. Gotchas checklist

- [ ] Aspect ratio resets after every navigate — re-set it every time
- [ ] Send button often needs a second click
- [ ] Use `form_input` + ref, not `computer type` — type loses focus
- [ ] Re-`find` refs after any navigation; stale refs silently no-op
- [ ] Wait 40–70s for idea suggestions, 60–120s for creative renders
- [ ] Check returned `w`/`h` from the download JS matches your aspect ratio
- [ ] Never run bare `brand_pomelli.py` — it double-brands the whole library
- [ ] `rmdir` fails EPERM from the sandbox mount — use osascript
- [ ] `export PATH=/opt/homebrew/bin:...` before git via osascript
- [ ] Commit on `main`, never `cinematic-rollout-*`
- [ ] Path-scoped `git add`, never `-A`
- [ ] Rate limit ≈5–6 campaigns/account/day → rotate `/u/N/`
- [ ] No Vercel redeploy needed — pomelli_library is autoposter content, not web app

---

## 13. Cost-aware operating rules

From `CLAUDE.md`, applies to creative work too:

- Prefer **1 agent for 5–8 items** over parallel fan-out. A previous session burned 50% of weekly usage on 79 sub-agents in one day.
- Run research/scraping sub-agents on **Haiku**, not Opus.
- Avoid unnecessary screenshots — each is expensive base64 image data. Use `read_page` / `get_page_text` when you only need text.
- Start a **fresh session per wave** rather than `/compact`-ing a long one.
- Max ~2 Pomelli sessions per week.

---

## 14. Addendum 2026-09-02 (Claude Code, read-only probe via the flow-cdp-profile Chrome)

- **The `/u/N/` order in §2 is NOT the order in `~/Automation/flow-cdp-profile`.** There: u/0 taneja.ashish5, u/1 humanityunboxedmanager, u/2 wealthmythic, u/3 kiddiequestmanager, u/4 flowcommandmanager, u/5 starterpodsite; forgevoice is not signed in. Any script must resolve the account by **email**, never by index.
- **No Sindoor Matchmakers Business DNA exists on any of the six accounts.** flowcommand (marked "OFF LIMITS — Sindoor" in §2) currently shows NakshIQ campaigns. Create the Sindoor DNA on a dedicated account before any Sindoor run (plan: `~/Desktop/Reports/Sindoor-Social-Takeover-Plan-2026-09-02.pdf`, §4).
- Pomelli nav now shows Business DNA, Catalog, Assets, Campaigns, Photoshoot, Brand Book, Templates. Step coordinates in §3 predate this and should be re-verified before a scripted run.
- Next step agreed in principle: convert §3 into a deterministic Playwright driver (`pomelli_batch_gen.py`, same shape as chanakya `scripts/flow_batch_gen.py`) — download via the page's authenticated request, not `~/Downloads`.
- **Later on 2026-09-02: the founder created the Sindoor Matchmakers Business DNA on `u/0` taneja.ashish5@** (`/u/0/pomelli/bdna`: tagline "Where Families Find Forever", colours #faf7f2 #3e2731 #8b5e3c #7c3a4d, fonts Fraunces/Inter). **Pomelli holds ONE DNA per account — this REPLACED the NakshIQ DNA on u/0.** NakshIQ Pomelli waves must now run on u/1 humanityunboxed, u/2 wealthmythic or u/4 flowcommand, which still show NakshIQ campaigns. Treat u/0 as the Sindoor account.
