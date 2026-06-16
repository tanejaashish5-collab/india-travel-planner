<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Editorial voice

Before writing or rewriting any user-facing copy, read `apps/web/docs/voice.md`. It's the single source of truth for NakshIQ's editorial voice (sentence case, no dashboard jargon, no travel-influencer language, serif for display, sans for everything else, Hindi parity required for new strings).

## "Current month" must come from `@itp/shared` — not `new Date().getMonth()`

Vercel servers run UTC, so `new Date().getMonth()` returns the wrong month for ~5.5h every month-rollover (Indian users see April content on May 1 morning). NEVER write raw month logic. Always import from `@itp/shared`:

```ts
import { currentMonthIST, currentMonthSlugIST, currentMonthLongIST } from "@itp/shared";

const month = currentMonthIST();      // 1-12
const slug  = currentMonthSlugIST();  // "may"
const name  = currentMonthLongIST();  // "May"
```

This applies to server pages, client components, API routes, blog widgets — everywhere. The pre-build guard (`npm run check:month`) fails any commit that introduces raw `new Date().getMonth()` or `.toLocaleString({month})` in `apps/web/src/`.

When adding a NEW month-keyed route (`[month]` or `[monthSlug]` segment), also append it to the `revalidatePath()` list in [apps/web/src/app/api/cron/prewarm-next-month/route.ts](src/app/api/cron/prewarm-next-month/route.ts) so the monthly cron flushes its ISR cache.

## Page `<title>` must NOT include `| NakshIQ` — the layout template adds it

The locale layout ([src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx)) sets `title.template: "%s | NakshIQ"`, so Next.js **auto-appends** the brand to every descendant page's `<title>`. A page that *also* bakes `| NakshIQ` into the `title` it returns renders a double-stamp — `… | NakshIQ | NakshIQ`. The title template does **not** apply to `openGraph.title` / `twitter.title`, so those must carry the brand inline.

Correct pattern (mirrors `destination/[id]` + `destination/[id]/[month]`):

```ts
const title = `${name} itinerary — ${days} (verified)`;   // NO brand — template adds it
const ogTitle = `${title} | NakshIQ`;                       // brand inline for social cards
return {
  title,                                                    // <title> → "… (verified) | NakshIQ"
  openGraph: { title: ogTitle, /* … */ },
  twitter:   { title: ogTitle, /* … */ },
};
```

Born 2026-06-16: seven page families (itinerary, cost, safari, pilgrimage[/index], skip-list, tourist-traps) each baked the brand into the returned `title` and rendered `… | NakshIQ | NakshIQ` on prod; daily-QA only sampled the itinerary URL so the other six went unflagged. When auditing titles, grep prod HTML for the literal `NakshIQ | NakshIQ` across one URL per page family — a single sampled page can't represent the set.
