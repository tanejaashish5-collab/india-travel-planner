/**
 * social-dm.ts — the inbound-DM funnel engine.
 *
 * The NakshIQ autoposter captions promise an auto-DM in response to a keyword
 * (see comment_cta() in nakshiq-autoposter/autoposter.py):
 *   score    → "Comment 'kasauli' — I'll DM the 48-hour plan I'd actually do."
 *   stays    → "Comment 'kasauli' — I'll send the 3 stays I'd actually book."
 *   eateries → "Comment 'kasauli' — I'll send 5 places no listicle has."
 *   emergency→ "Comment 'safety' — I'll DM the printable contact card."
 *   anti_trap→ "Comment 'where' — I'll send the alternative that's worth it."
 *   ...
 *
 * This module turns an inbound comment/DM into (1) a resolved intent (theme +
 * destination) and (2) the templated reply text. It is intentionally PURE — no
 * DB, no network — so it unit-tests cleanly. The route layer
 * (/api/instagram/webhook) does the Supabase lookups and the Graph API sends.
 */

export type DmTheme =
  | "score"
  | "stays"
  | "eateries"
  | "emergency"
  | "festival"
  | "weekend"
  | "infra"
  | "anti_trap"
  | "month_edit";

export interface DmDestination {
  id: string; // slug, e.g. "kasauli"
  name: string; // English display name, e.g. "Kasauli"
  nameHi?: string | null;
  bestMonth?: string | null; // e.g. "October"
}

/** Fixed keywords from the captions that map to a theme rather than a destination. */
const FIXED_KEYWORDS: Record<string, DmTheme> = {
  where: "anti_trap",
  safety: "emergency",
  plan: "score",
  stay: "stays",
  stays: "stays",
  eat: "eateries",
  food: "eateries",
  // Editorial-carousel magnet (2026-07-21): "Comment MONSOON" → this month's
  // verified go/wait/skip page. The route supplies monthSlug/monthName in ctx.
  monsoon: "month_edit",
  month: "month_edit",
};

export interface ResolvedIntent {
  theme: DmTheme;
  matchedKeyword: string;
  destinationId: string | null; // resolved slug if the text named a destination
}

/** Lowercase, strip emoji/punctuation, collapse whitespace. */
export function normalizeTrigger(text: string): string {
  return (text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ") // drop punctuation/emoji, keep letters+numbers (any script)
    .replace(/\s+/g, " ")
    .trim();
}

/** Pull the first email out of a free-form DM reply, if present. */
export function extractEmail(text: string): string | null {
  const m = (text || "").match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  return m ? m[0].toLowerCase() : null;
}

export interface ResolveOptions {
  /** All known destination slugs (e.g. "kasauli", "spiti-valley"). */
  knownSlugs?: Set<string>;
  /** Map of normalized destination display-name → slug (e.g. "kasauli" → "kasauli", "spiti valley" → "spiti-valley"). */
  slugByName?: Map<string, string>;
  /** Destination the commented-on post was about, if the webhook gave us media context. */
  mediaDestinationId?: string | null;
  /** Default theme when only a destination (no theme word) is present. */
  defaultTheme?: DmTheme;
}

/**
 * Resolve an inbound comment/DM into a theme + destination.
 * Returns null only when there is no usable signal at all (handled as a generic
 * "what are you planning?" reply by the caller).
 */
export function resolveIntent(rawText: string, opts: ResolveOptions = {}): ResolvedIntent | null {
  const norm = normalizeTrigger(rawText);
  if (!norm) return null;

  const tokens = norm.split(" ");
  const { knownSlugs, slugByName, mediaDestinationId } = opts;
  const defaultTheme: DmTheme = opts.defaultTheme ?? "score";

  // 1) Theme from a fixed keyword (where / safety / plan / stays / eat …).
  let theme: DmTheme | null = null;
  let matchedKeyword = "";
  for (const tok of tokens) {
    if (FIXED_KEYWORDS[tok]) {
      theme = FIXED_KEYWORDS[tok];
      matchedKeyword = tok;
      break;
    }
  }

  // 2) Destination from the text: try multi-word names first, then single tokens.
  let destinationId: string | null = null;
  if (slugByName && slugByName.size) {
    // try the whole normalized string and shrinking suffixes/prefixes for a name hit
    for (let span = Math.min(tokens.length, 4); span >= 1 && !destinationId; span--) {
      for (let i = 0; i + span <= tokens.length; i++) {
        const candidate = tokens.slice(i, i + span).join(" ");
        const hit = slugByName.get(candidate);
        if (hit) {
          destinationId = hit;
          if (!matchedKeyword) matchedKeyword = candidate;
          break;
        }
      }
    }
  }
  if (!destinationId && knownSlugs) {
    for (const tok of tokens) {
      if (knownSlugs.has(tok)) {
        destinationId = tok;
        if (!matchedKeyword) matchedKeyword = tok;
        break;
      }
    }
  }

  // 3) Fall back to the post's own destination if we know it.
  if (!destinationId && mediaDestinationId) destinationId = mediaDestinationId;

  // Decide.
  if (theme) {
    // "where"/"safety" are theme-only; a destination is a bonus.
    return { theme, matchedKeyword, destinationId };
  }
  if (destinationId) {
    return { theme: defaultTheme, matchedKeyword, destinationId };
  }
  return null;
}

export interface DmBuildContext {
  siteUrl: string; // e.g. "https://www.nakshiq.com"
  locale?: "en" | "hi";
  /** Optional activity-affiliate deeplink, appended when present (off by default). */
  affiliate?: { label: string; url: string } | null;
  /** Current IST month, for the month_edit theme (route passes currentMonthSlugIST/LongIST). */
  monthSlug?: string | null; // e.g. "july"
  monthName?: string | null; // e.g. "July"
}

export interface DmReply {
  text: string;
  pageUrl: string;
}

/** UTM-tagged destination/feature URL for the DM. */
function pageUrlFor(theme: DmTheme, dest: DmDestination | null, ctx: DmBuildContext): string {
  const locale = ctx.locale ?? "en";
  const base = ctx.siteUrl.replace(/\/+$/, "");
  const utm = `utm_source=ig&utm_medium=dm&utm_campaign=comment_funnel`;
  if (theme === "month_edit" && ctx.monthSlug) return `${base}/${locale}/where-to-go/${ctx.monthSlug}?${utm}`;
  if (!dest) return `${base}/${locale}/explore?${utm}`;
  return `${base}/${locale}/destination/${dest.id}?${utm}`;
}

/** A short public reply to leave under the comment (the private DM does the work). */
export function buildPublicCommentReply(): string {
  return "Just slid into your DMs with it 📩";
}

const EMAIL_ASK = "Want it emailed as a printable too? Just reply here with your email. ✉️";

/**
 * Build the DM body the caption promised. Pure — `dest` is pre-fetched by the
 * caller. `dest` may be null for theme-only triggers (e.g. "where" with no post
 * context) — we still give them a useful, on-brand reply.
 */
export function buildDmReply(theme: DmTheme, dest: DmDestination | null, ctx: DmBuildContext): DmReply {
  const url = pageUrlFor(theme, dest, ctx);
  const name = dest?.name ?? "this one";
  const month = dest?.bestMonth ? ` Best window: ${dest.bestMonth}.` : "";

  let lead: string;
  switch (theme) {
    case "stays":
      lead = `The 3 ${name} stays I'd actually book — with honest price bands, not ad placements 👇\n${url}`;
      break;
    case "eateries":
      lead = `5 places to eat in ${name} that no listicle bothers with 👇\n${url}`;
      break;
    case "emergency":
      lead = `Your printable ${name} safety + emergency-contact card (verified numbers, save it offline) 👇\n${url}`;
      break;
    case "festival":
      lead = `The ${name} festival read — real timing + a crowd map so you dodge the crush 👇\n${url}`;
      break;
    case "weekend":
      lead = `The honest Fri–Sun ${name} plan, with what it actually costs 👇\n${url}`;
      break;
    case "infra":
      lead = `${name}, the practical bits: offline map, fuel stops, network reality 👇\n${url}`;
      break;
    case "month_edit": {
      const mn = ctx.monthName || "this month";
      lead = `Where India is actually at its best in ${mn} — the verified go / wait / skip list, every destination scored for THIS month 👇\n${url}`;
      break;
    }
    case "anti_trap":
      lead = dest
        ? `Skip the trap — here's the ${name} alternative that's actually worth your time 👇\n${url}`
        : `Skip the tourist trap — here's where I'd send my own family instead 👇\n${url}`;
      break;
    case "score":
    default:
      // Default trigger is the destination's own name, which can come off ANY
      // post type (stays / eateries / infra / weekend …). The destination page
      // carries all of it, so the default DM promises the full read — honest
      // regardless of which post they commented on.
      lead = `Here's the honest read on ${name}.${month} Best month, the plan I'd actually do, where to stay, and what to skip 👇\n${url}`;
      break;
  }

  const parts = [lead];
  if (ctx.affiliate && ctx.affiliate.url) {
    parts.push(`\n${ctx.affiliate.label}: ${ctx.affiliate.url}`);
  }
  parts.push(`\n${EMAIL_ASK}`);
  return { text: parts.join("\n"), pageUrl: url };
}

/** Reply when someone DMs/comments with no resolvable destination or keyword. */
export function buildGenericReply(ctx: DmBuildContext): DmReply {
  const locale = ctx.locale ?? "en";
  const base = ctx.siteUrl.replace(/\/+$/, "");
  const url = `${base}/${locale}/explore?utm_source=ig&utm_medium=dm&utm_campaign=comment_funnel`;
  return {
    text:
      "Hey! 👋 Tell me which place you're weighing up (just send the name — e.g. \"Kasauli\") and I'll send the honest NakshIQ read: best month, real costs, and what to skip.\n" +
      `Or browse them all here 👇\n${url}`,
    pageUrl: url,
  };
}

export const _internal = { FIXED_KEYWORDS };
