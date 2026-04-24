# GA4 — AI referrals channel group

Created during Sprint 7a (AI citability foundation). Lets us see how much traffic
arrives via ChatGPT Search, Perplexity, Claude, Gemini, Copilot, and Google's
AI Overviews, broken out from generic "Referral" or "Direct" traffic.

Per R2 §12 Tier-4 #24: **AI visitors convert 23× better than organic**. If we
can't see them, we can't optimise for them.

## One-time setup (manual, GA4 UI)

1. Open GA4 → **Admin** (gear icon, bottom-left).
2. Under *Property*, click **Data display** → **Channel groups** → **Create new channel group**.
3. Name: `AI referrals (NakshIQ)`
4. Description: `Traffic from LLM answer engines — tracked separately so we can measure AI citation ROI.`
5. Add these channel rules **in order** (first match wins):

### Channel 1 — "AI search"

Rule: Match **any** of the following:

| Condition | Operator | Value |
|---|---|---|
| Session source | exactly matches | `chatgpt.com` |
| Session source | exactly matches | `chat.openai.com` |
| Session source | exactly matches | `perplexity.ai` |
| Session source | exactly matches | `www.perplexity.ai` |
| Session source | exactly matches | `copilot.microsoft.com` |
| Session source | exactly matches | `bing.com/chat` |
| Session source | exactly matches | `gemini.google.com` |
| Session source | exactly matches | `claude.ai` |
| Session source | exactly matches | `you.com` |
| Session source | exactly matches | `phind.com` |

Color suggestion: Purple (distinct from the default Referral blue).

### Channel 2 — "AI Overviews (Google SGE)"

Rule: Match **all** of the following:

| Condition | Operator | Value |
|---|---|---|
| Session source | exactly matches | `google` |
| Session campaign | exactly matches | `(organic)` |
| Page URL | contains | `udm=50` |

Color suggestion: Violet.

(Google SGE referrals contain `&udm=50` or `&srsltid=` in the URL. The `udm=50`
parameter is the reliable signal for AI Overviews.)

### Channel 3 — "LLM crawl bots (filtered)"

(Optional — only if you want to separate bot visits from humans.)

Rule: Match **any** of:
- User agent contains `GPTBot`
- User agent contains `ClaudeBot`
- User agent contains `PerplexityBot`
- User agent contains `OAI-SearchBot`
- User agent contains `Google-Extended`

Note: GA4 typically doesn't receive bot traffic (it's client-side JS). This
channel is for completeness if you later pipe server logs into GA4.

## What to monitor

After 30 days of data:

- **AI-referrals conversion rate** vs Organic — if ≥3× lift, prioritise Sprint 10 (GEO distribution).
- **Top AI-referred pages** — surfaces which content LLMs are citing. Feeds Sprint 7b amplification.
- **AI-referrals by country** — India-only vs international. Informs locale priority (R2 §3).

## Related

- `scripts/track-ai-citations.mjs` (Sprint 7b) — weekly prompt-citation tracking across 100 target queries.
- `/methodology/freshness` bot-traffic widget (Sprint 7b) — server-log view of GPTBot/OAI-SearchBot/PerplexityBot/ClaudeBot hits/day.
- `public/llms.txt` + `llms-full.txt` — the site overview those bots read.
