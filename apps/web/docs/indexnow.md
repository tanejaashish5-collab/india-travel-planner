# IndexNow — fast-refresh for Bing, Yandex, DuckDuckGo, Naver, Seznam

Shipped Sprint 7a. Replaces the "submit sitemap, wait days" loop with
"URL changed, re-crawl now" (minutes).

## One-time setup

### 1. Vercel env vars

Add two env vars in the Vercel dashboard (Production + Preview):

```
INDEXNOW_KEY=755b461be890c806e09c71ee7484cc35
INDEXNOW_WEBHOOK_SECRET=<generate with: openssl rand -hex 32>
```

- `INDEXNOW_KEY` — public domain-ownership token (matches the filename at `/755b461be890c806e09c71ee7484cc35.txt`). Safe to expose.
- `INDEXNOW_WEBHOOK_SECRET` — **keep private**. Protects our `/api/indexnow` endpoint from random callers burning the quota.

Set the same values in `apps/web/.env.local` for local testing.

### 2. Verify deployment

After deploy:

```bash
# key file must be publicly fetchable
curl -s https://www.nakshiq.com/755b461be890c806e09c71ee7484cc35.txt
# → 755b461be890c806e09c71ee7484cc35

# health check
curl -s https://www.nakshiq.com/api/indexnow | jq .
# → { "ok": true, "host": "www.nakshiq.com", "key_location": "...", ... }
```

### 3. Submit initial URL set

One-time push to announce the site to IndexNow:

```bash
# build URL list — top destinations + state pages + guide hubs
node scripts/indexnow-push.mjs \
  https://www.nakshiq.com/en \
  https://www.nakshiq.com/en/explore \
  https://www.nakshiq.com/en/destination/kaza \
  # ... more
```

Or push from a file:

```bash
node scripts/indexnow-push.mjs --file data/urls-to-refresh.txt
```

## Operational use

Wire into every surface that changes content:

- **`mark-reviewed.mjs`** — after stamping `content_reviewed_at`, push the
  reviewed URL so Bing sees the fresher timestamp.
- **Editorial publish flow** — when a new blog post ships, push its URL +
  `/en/newsletter` + the newsletter archive.
- **Database backfill** — after a batch of UPDATEs, push the affected
  destination URLs (both locales).

Example hook in any mjs script:

```js
async function pushToIndexNow(paths) {
  await fetch(`${process.env.NAKSHIQ_BASE_URL}/api/indexnow`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-indexnow-secret": process.env.INDEXNOW_WEBHOOK_SECRET,
    },
    body: JSON.stringify({
      urls: paths.map((p) => `https://www.nakshiq.com${p}`),
    }),
  });
}
```

## What IndexNow does NOT cover

- **Googlebot** — Google does not use IndexNow. Keep the existing sitemap for
  Google. Googlebot typically re-crawls high-trust sites within hours anyway.
- **GPTBot / PerplexityBot / ClaudeBot** — AI crawlers re-visit on their own
  schedule. IndexNow is search-engine-only.

## Rate limits

IndexNow partners enforce their own rate limits. Bing recommends ≤10k URLs per
batch and ≤100 batches per day. Our `/api/indexnow` endpoint enforces
10k/batch; spread bulk pushes across hours.

## Verification

Bing Webmaster Tools → **IndexNow** tab shows submitted URLs, success rate, and
any errors. Link the property after first successful push.
