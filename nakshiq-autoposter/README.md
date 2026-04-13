# Nakshiq Autoposter

Fully autonomous social media posting for Nakshiq.  
Syncs content from the Nakshiq API 3× daily. Posts **once per day per connected platform**.  
Zero manual input required after the one-time setup below.

---

## What it does

| Schedule (IST) | Action |
|---|---|
| 09:00 AM daily | Sync Nakshiq content → generate post → publish to all connected accounts |
| 02:00 PM daily | Sync content only (already posted today — no duplicate) |
| 07:00 PM daily | Sync content only |

### Format rotation (auto, by weekday)

| Day | Format |
|---|---|
| Monday | Score Card (contrarian comparison) |
| Tuesday | Tourist Trap Exposé → falls back to Reality Check if no traps |
| Wednesday | Data Carousel (ranked destinations) |
| Thursday | Score Card |
| Friday | Reality Check (expectation vs reality) |
| Saturday | Data Carousel |
| Sunday | Infrastructure Truth |
| 1st Monday of month | Monthly Forecast (overrides rotation) |

### Rules enforced automatically
- Never posts the same destination twice within 14 days
- Never duplicates copy verbatim across platforms (platform-adapted)
- Never posts twice in one day to the same account
- Always includes at least one concrete data point (score, elevation, stat)
- Attaches image from Nakshiq API on every post
- Silent day if content pool is empty rather than posting filler

---

## One-time setup (5 minutes)

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `nakshiq-autoposter` (private recommended)
3. Push these files to the repo:

```bash
git init
git add .
git commit -m "initial setup"
git remote add origin https://github.com/YOUR_USERNAME/nakshiq-autoposter.git
git push -u origin main
```

### Step 2 — Add your Outstand API key as a secret

1. Go to your repo → **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `OUTSTAND_API_KEY`
4. Value: your Outstand API key (`ost_...`)
5. Save

### Step 3 — Connect your social accounts in Outstand

Log into [outstand.so](https://outstand.so) → **Settings → Connected Accounts**  
Connect every platform you want to post to:
- Facebook Page ✅ (already connected)
- Instagram Business
- LinkedIn Page
- TikTok
- (etc.)

The script will automatically discover all active connected accounts and post to each one, once per day.

### Step 4 — Enable GitHub Actions

1. Go to your repo → **Actions** tab
2. Click **Enable GitHub Actions** (if prompted)
3. Done — the scheduler activates immediately

---

## Manual controls

From the **Actions** tab → **Nakshiq Autoposter** → **Run workflow**:

| Mode | What it does |
|---|---|
| `normal` | Post today if not already posted |
| `force` | Force-post even if already posted today |
| `sync-only` | Sync Nakshiq content, no posting |
| `dry-run` | Preview what would be posted, nothing published |

---

## Files

```
nakshiq-autoposter/
├── autoposter.py          ← main script (all logic here)
├── state.json             ← tracks what was posted + when (auto-updated)
├── autoposter.log         ← full run log (auto-updated)
├── requirements.txt       ← Python dependencies (just: requests)
└── .github/
    └── workflows/
        └── autoposter.yml ← GitHub Actions schedule
```

---

## How state persists

After every run, GitHub Actions commits `state.json` and `autoposter.log` back to the repo automatically. This is how the script knows what it posted yesterday and avoids repeats.

---

## Adding a new platform

Just connect it in Outstand — the script automatically discovers all active connected accounts via `GET /v1/social-accounts` on every run. No code changes needed.
