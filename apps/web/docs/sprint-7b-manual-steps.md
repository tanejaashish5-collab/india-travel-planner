# Sprint 7b — manual steps (user action required)

Sprint 7b shipped all the code-side AI-citability amplifications. Three steps
require user action outside the repo — none take more than 15–30 minutes each,
and they're all high-leverage for AI citation ranking.

## 1. Wikidata entry for NakshIQ — 15 min

**Why:** Per R2 §12 Tier-1 #7 and R4 §7.3 — Wikidata is the canonical
entity-linking layer for search + AI. Once NakshIQ has a Wikidata ID, the
Organization JSON-LD `sameAs` array can cite it, and AI models pulling
entity context will resolve the brand instead of confusing it with the
dozen unrelated "Naksh" brands.

**Steps:**

1. Open https://www.wikidata.org/wiki/Wikidata:Main_Page, create an account
   (real name, email verify). Use an account Ashish owns — Wikidata
   edits are public and permanent.
2. Check if an entry already exists: https://www.wikidata.org/wiki/Special:Search?search=NakshIQ. If yes, skip to step 5.
3. Click **Create a new item**. Fill:
   - **Label** (English): `NakshIQ`
   - **Label** (Hindi): `नक्शIQ`
   - **Description** (English): `Indian travel-intelligence website with monthly destination verdicts for 488 Indian destinations`
   - **Aliases**: `Nakshiq`, `nakshiq.com`
4. Add statements (click **+ add statement** for each):
   - **Instance of (P31)**: Website (Q35127)
   - **Official website (P856)**: https://www.nakshiq.com
   - **Country of origin (P495)**: India (Q668)
   - **Language of work (P407)**: English (Q1860), Hindi (Q1568)
   - **Inception (P571)**: 2026 (as precise as you're comfortable)
   - **Subject of (P921)** (optional, if you can substantiate): travel in India (Q83164)
5. Copy the Wikidata QID (e.g. `Q123456789`) from the URL.
6. Update `apps/web/src/app/[locale]/layout.tsx` Organization `sameAs` array:
   ```ts
   sameAs: [
     "https://www.wikidata.org/wiki/Q123456789", // replace with real QID
   ],
   ```
7. Commit + deploy.

**Do not yet create a Wikipedia article.** Wikipedia requires independent
press coverage (the "notability" threshold). Per Sprint 14 in the plan,
Wikipedia editing comes after the Cost Index / press-pickups land in Sprint 9–10.

## 2. Bing Webmaster Tools + IndexNow verification — 15 min

**Why:** IndexNow is the Bing/Yandex/federated "re-crawl now" API (shipped
Sprint 7a). The key file is already live at `/755b461be890c806e09c71ee7484cc35.txt`.
This step verifies domain ownership in Bing Webmaster so Bing's IndexNow
dashboard shows submissions + success rate.

**Steps:**

1. Open https://www.bing.com/webmasters/.
2. Sign in with a Microsoft account.
3. **Add a site** → `https://www.nakshiq.com`.
4. Verify via any method — meta tag, DNS TXT, or XML file. Ashish has the DNS
   at the domain registrar; DNS TXT is cleanest.
5. Once verified, submit the sitemap: `https://www.nakshiq.com/sitemap/0.xml`
   (and chunks 1–4).
6. Go to **IndexNow** tab → confirm the key at
   `https://www.nakshiq.com/755b461be890c806e09c71ee7484cc35.txt` is visible.
7. Confirm env vars are live in Vercel (see `apps/web/docs/indexnow.md`):
   - `INDEXNOW_KEY=755b461be890c806e09c71ee7484cc35`
   - `INDEXNOW_WEBHOOK_SECRET=<openssl rand -hex 32>`
8. Fire a test push:
   ```bash
   node scripts/indexnow-push.mjs \
     https://www.nakshiq.com/en \
     https://www.nakshiq.com/en/destination/kaza \
     https://www.nakshiq.com/en/destination/leh
   ```
9. Within an hour, Bing Webmaster IndexNow tab should show the 3 URLs
   submitted with a 200/202 status.

## 3. First AI-citation tracker run — 60 min

**Why:** Sprint 7b shipped `scripts/track-ai-citations.mjs` with 100 target
queries. Without a first-run baseline, you can't tell if Sprint 7a+7b
compounded into measurable citations.

**Steps:**

1. Pick 20 prompts from one category (best-time-visit is highest-leverage):
   ```bash
   node scripts/track-ai-citations.mjs --list | head -30
   ```
2. For each prompt, open in all 6 engines:
   ```bash
   node scripts/track-ai-citations.mjs --open btv-spiti-june
   ```
   This opens Perplexity, ChatGPT Search, Google AIO, Gemini, Claude.ai, Bing
   Copilot tabs. Each renders an AI answer.
3. For each engine, check if NakshIQ appears as a citation. Log:
   ```bash
   node scripts/track-ai-citations.mjs --log btv-spiti-june perplexity true "cited /destination/kaza"
   node scripts/track-ai-citations.mjs --log btv-spiti-june chatgpt false
   node scripts/track-ai-citations.mjs --log btv-spiti-june aio false "not in top-3 sources"
   ```
4. After the batch of 20, run the report:
   ```bash
   node scripts/track-ai-citations.mjs --report
   ```
   Expected: 0–5% citation rate on first run (pre-Wikipedia, pre-press). The
   number is the baseline. Sprints 9 (Cost Index), 10 (GEO distribution),
   and continued schema work should move this quarter-over-quarter.

5. Set a weekly reminder: every Monday morning, run 20 new prompts through
   all 6 engines. In 5 weeks you cover the full 100.

## 4. Add GA4 AI-referrals channel group — 5 min

Already documented at `apps/web/docs/ga4-ai-channel-group.md`. One-time
setup in the GA4 UI. Shows AI-referred traffic distinct from Organic Search.

---

## Outcome after steps 1–4

- NakshIQ has a canonical Wikidata entity with QID
- Bing Webmaster verified + IndexNow submissions working
- 20-prompt baseline AI-citation rate logged
- GA4 channel group splitting AI referrals from Organic

With these complete, Sprints 9 (Cost Index) and 10 (GEO distribution) have
measurement infrastructure to prove ROI.
