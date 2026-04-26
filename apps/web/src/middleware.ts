import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { STATE_MAP } from "./lib/seo-maps";

const intlMiddleware = createMiddleware(routing);

// AI + search bot user-agent patterns. Matched case-insensitively against
// the incoming UA. Keep in sync with public/robots.txt allowlist. If the
// list grows, consider moving to a DB-backed table for live edits.
const BOT_PATTERNS: Array<{ name: string; pattern: RegExp }> = [
  { name: "GPTBot", pattern: /GPTBot/i },
  { name: "OAI-SearchBot", pattern: /OAI-SearchBot/i },
  { name: "ChatGPT-User", pattern: /ChatGPT-User/i },
  { name: "PerplexityBot", pattern: /PerplexityBot/i },
  { name: "ClaudeBot", pattern: /ClaudeBot/i },
  { name: "anthropic-ai", pattern: /anthropic-ai/i },
  { name: "Claude-Web", pattern: /Claude-Web/i },
  { name: "Google-Extended", pattern: /Google-Extended/i },
  { name: "Applebot-Extended", pattern: /Applebot-Extended/i },
  { name: "CCBot", pattern: /CCBot/i },
  { name: "Amazonbot", pattern: /Amazonbot/i },
  { name: "YouBot", pattern: /YouBot/i },
  { name: "PhindBot", pattern: /PhindBot/i },
  { name: "Googlebot", pattern: /Googlebot\/|Googlebot$/i },
  { name: "Bingbot", pattern: /bingbot/i },
  { name: "DuckDuckBot", pattern: /DuckDuckBot/i },
];

function matchBot(ua: string | null): string | null {
  if (!ua) return null;
  for (const b of BOT_PATTERNS) {
    if (b.pattern.test(ua)) return b.name;
  }
  return null;
}

// Fire-and-forget bot-visit logging. Non-blocking, never fails the request.
// 10% sample rate: bot crawls hammer 6k+ pages; full logging burned ~$0.30/day
// in Vercel function invocations. 1-in-10 keeps trend signal intact for the
// /admin/bot-traffic dashboard (multiply by 10 for true volume).
const BOT_LOG_SAMPLE_RATE = 0.1;
function logBotVisit(request: NextRequest, botName: string) {
  if (Math.random() >= BOT_LOG_SAMPLE_RATE) return;
  try {
    const origin = request.nextUrl.origin;
    const body = JSON.stringify({
      bot_name: botName,
      path: request.nextUrl.pathname,
      locale: request.nextUrl.pathname.split("/")[1] || null,
      user_agent: (request.headers.get("user-agent") ?? "").slice(0, 400),
    });
    const secret = process.env.BOT_LOG_SECRET ?? "";
    // Use fetch with keepalive so the request survives middleware return.
    void fetch(`${origin}/api/log-bot-visit`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret && { "x-bot-log-secret": secret }),
      },
      body,
      keepalive: true,
    }).catch(() => {
      // swallow — logging failures must never affect bot experience
    });
  } catch {
    // swallow
  }
}

// Wrap next-intl middleware to convert 307 → 301 for locale redirects
// Google treats 307 as temporary — indexes both URLs. 301 consolidates.
export default function middleware(request: NextRequest) {
  // Bot-visit logging (non-blocking). Only HTML routes — skip API/static.
  const ua = request.headers.get("user-agent");
  const bot = matchBot(ua);
  if (bot && !request.nextUrl.pathname.startsWith("/api/")) {
    logBotVisit(request, bot);
  }

  // Preserve the state-redirect previously handled inside the destination
  // page component. After switching to dynamicParams=false, the page is never
  // invoked for non-destination slugs, so the redirect has to live here.
  //
  // STATE_AND_DESTINATION: slugs that are BOTH a state and a real destination
  // row (city-states / UTs where the city == the state). For these, the
  // destination page wins — skip the redirect or the destination page never
  // renders. Caught after the Delhi eateries section silently disappeared.
  const STATE_AND_DESTINATION = new Set(["delhi"]);
  const destStateMatch = request.nextUrl.pathname.match(/^\/(en|hi)\/destination\/([^/]+)\/?$/);
  if (
    destStateMatch &&
    STATE_MAP[destStateMatch[2]] &&
    !STATE_AND_DESTINATION.has(destStateMatch[2])
  ) {
    const [, locale, stateId] = destStateMatch;
    return NextResponse.redirect(new URL(`/${locale}/state/${stateId}`, request.url), 301);
  }

  const response = intlMiddleware(request);

  // Convert temporary redirects (307) to permanent (301) for SEO
  if (response.status === 307) {
    const location = response.headers.get("location");
    if (location) {
      return NextResponse.redirect(new URL(location, request.url), 301);
    }
  }

  return response;
}

export const config = {
  // Match all pathnames except static files and API routes
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
