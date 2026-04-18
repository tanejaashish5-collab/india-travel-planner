import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildShortlistForArchetype } from "@/lib/gap-year/shortlist";
import { buildSkeletonPrompt, buildMonthPrompt } from "@/lib/gap-year/prompts";
import { validateDaySplit } from "@/lib/gap-year/day-split";
import { resolveArchetype } from "@/lib/gap-year/archetype";
import {
  MONTH_NAMES,
  THEMES,
  type Party,
  type Familiarity,
  type ExperienceTier,
  type Theme,
  type Region,
  type MonthPlan,
  type OriginRef,
  type AlternativePair,
} from "@/lib/gap-year/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const VALID_PARTIES: Party[] = ["family_kids", "solo_couple"];
const VALID_FAMILIARITY: Familiarity[] = ["first_timer", "seasoned"];
const VALID_TIERS: ExperienceTier[] = ["thrifty", "comfortable", "splurge"];

const rateLimits = new Map<string, number[]>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const calls = (rateLimits.get(ip) ?? []).filter((t) => t > windowStart);
  if (calls.length >= RATE_LIMIT_MAX) return false;
  calls.push(now);
  rateLimits.set(ip, calls);
  return true;
}

export async function POST(req: NextRequest) {
  const rawApiKey = process.env.ANTHROPIC_API_KEY;
  if (!rawApiKey) return NextResponse.json({ error: "AI not configured" }, { status: 503 });
  const apiKey: string = rawApiKey;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded — 10 plans per hour per IP" }, { status: 429 });
  }

  const body = await req.json();
  const {
    durationMonths, startMonth, party, familiarity, experienceTier,
    themes, origin, persona, budget,
  } = body;

  // Accept v1 fields as fallbacks for any old callers
  const effectiveParty: Party = party ?? persona;
  const effectiveFamiliarity: Familiarity = familiarity ?? "first_timer";
  const effectiveTier: ExperienceTier =
    experienceTier ?? (budget === "splurge" ? "splurge" : budget === "budget" ? "thrifty" : "comfortable");

  // Validation
  if (!Number.isInteger(durationMonths) || durationMonths < 3 || durationMonths > 12)
    return NextResponse.json({ error: "durationMonths must be 3-12" }, { status: 400 });
  if (!Number.isInteger(startMonth) || startMonth < 1 || startMonth > 12)
    return NextResponse.json({ error: "startMonth must be 1-12" }, { status: 400 });
  if (!VALID_PARTIES.includes(effectiveParty))
    return NextResponse.json({ error: "Invalid party" }, { status: 400 });
  if (!VALID_FAMILIARITY.includes(effectiveFamiliarity))
    return NextResponse.json({ error: "Invalid familiarity" }, { status: 400 });
  if (!VALID_TIERS.includes(effectiveTier))
    return NextResponse.json({ error: "Invalid experienceTier" }, { status: 400 });

  const cleanThemes: Theme[] = Array.isArray(themes)
    ? themes.filter((t: any) => typeof t === "string" && THEMES.includes(t as Theme)).slice(0, 3)
    : [];
  const cleanOrigin: OriginRef | null = origin && typeof origin === "object" && origin.id
    ? {
        id: String(origin.id),
        name: String(origin.name ?? origin.id),
        state: String(origin.state ?? ""),
        lat: Number(origin.lat),
        lng: Number(origin.lng),
      }
    : null;

  const archetype = resolveArchetype({ familiarity: effectiveFamiliarity, party: effectiveParty });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey)
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Build the sequence of months (month-of-year) starting at startMonth
  const months: number[] = [];
  for (let i = 0; i < durationMonths; i++) {
    months.push(((startMonth - 1 + i) % 12) + 1);
  }

  // Skeleton call: partitions months into regions when duration ≥ 5
  let monthRegions: (Region | "any")[] = months.map(() => "any");
  if (durationMonths >= 5) {
    try {
      const chain = await callClaude(
        apiKey,
        buildSkeletonPrompt({
          months,
          archetype,
          origin: cleanOrigin?.name,
          themes: cleanThemes,
        })
      );
      if (Array.isArray(chain?.chain)) {
        monthRegions = chain.chain.map((c: any) =>
          typeof c.region === "string" ? (c.region as Region) : "any"
        );
      }
    } catch (err) {
      console.warn("Skeleton call failed, falling back to 'any':", err);
    }
  }

  const alreadyPicked: { id: string; monthName: string }[] = [];
  const monthPlans: MonthPlan[] = new Array(durationMonths);
  const CONCURRENCY = 4;

  let cursor = 0;
  async function worker() {
    while (cursor < durationMonths) {
      const idx = cursor++;
      if (idx >= durationMonths) return;
      const monthIndex = months[idx];
      const region = monthRegions[idx];
      const isBookend = idx === 0 || idx === durationMonths - 1;

      try {
        const shortlist = await buildShortlistForArchetype(supabase, {
          month: monthIndex,
          archetype,
          experienceTier: effectiveTier,
          themes: cleanThemes,
          region: region !== "any" ? region : undefined,
          origin: cleanOrigin ? { lat: cleanOrigin.lat, lng: cleanOrigin.lng } : null,
          originProximityBoost: isBookend,
          excludeIds: alreadyPicked.map((p) => p.id),
          limit: 15,
        });

        if (shortlist.length === 0) {
          monthPlans[idx] = {
            monthIndex,
            monthName: MONTH_NAMES[monthIndex],
            region,
            destinations: [],
            narrative: `No shortlist matched for ${MONTH_NAMES[monthIndex]}. Try relaxing filters.`,
            estDailyCostInr: 0,
            error: "empty_shortlist",
          };
          continue;
        }

        // First pass
        let result = await callClaude(
          apiKey,
          buildMonthPrompt({
            monthIndex,
            archetype,
            experienceTier: effectiveTier,
            themes: cleanThemes,
            regionConstraint: region,
            alreadyPicked,
            shortlist,
          })
        );

        let hydrated = hydrate(result, shortlist);
        let validator = validateDaySplit(hydrated, shortlist);

        // Replay once on violation
        if (!validator.ok) {
          console.warn(`Day-cap violation month ${monthIndex}: ${validator.reason} — replaying`);
          result = await callClaude(
            apiKey,
            buildMonthPrompt({
              monthIndex,
              archetype,
              experienceTier: effectiveTier,
              themes: cleanThemes,
              regionConstraint: region,
              alreadyPicked,
              shortlist,
              enforceSplit: true,
            })
          );
          hydrated = hydrate(result, shortlist);
          validator = validateDaySplit(hydrated, shortlist);
        }

        const monthLabel = MONTH_NAMES[monthIndex] ?? String(monthIndex);
        for (const h of hydrated) alreadyPicked.push({ id: h.id, monthName: monthLabel });

        monthPlans[idx] = {
          monthIndex,
          monthName: MONTH_NAMES[monthIndex],
          region,
          destinations: hydrated,
          narrative: String(result?.narrative || ""),
          estDailyCostInr: Number(result?.estDailyCostInr) || 0,
        };
      } catch (err: any) {
        console.error(`Gap-year month ${monthIndex} failed:`, err?.message || err);
        monthPlans[idx] = {
          monthIndex,
          monthName: MONTH_NAMES[monthIndex],
          region,
          destinations: [],
          narrative: "",
          estDailyCostInr: 0,
          error: friendlyError(err),
        };
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  return NextResponse.json({
    plan: {
      version: "v2",
      title: autoTitle({ durationMonths, startMonth, party: effectiveParty }),
      input: {
        durationMonths,
        startMonth,
        party: effectiveParty,
        familiarity: effectiveFamiliarity,
        experienceTier: effectiveTier,
        themes: cleanThemes,
        origin: cleanOrigin,
        // v1 compat fields so existing public-view still renders
        persona: effectiveParty,
        budget: effectiveTier === "thrifty" ? "budget" : effectiveTier === "splurge" ? "splurge" : "mid-range",
      },
      months: monthPlans,
    },
  });
}

function hydrate(result: any, shortlist: any[]) {
  const picks = (result?.destinations ?? []).filter((p: any) =>
    shortlist.some((s: any) => s.id === p.id)
  );
  return picks.map((p: any) => {
    const src = shortlist.find((s: any) => s.id === p.id)!;
    const alsoTry: AlternativePair | null = p.alsoTryId && src.alsoTry && src.alsoTry.altId === p.alsoTryId
      ? src.alsoTry
      : null;
    return {
      id: src.id,
      name: src.name,
      state: src.state,
      days: Number(p.days) || 7,
      rationale: String(p.rationale || ""),
      budgetTier: src.budgetTier,
      dailyCostInr: src.dailyCostInr,
      image: src.image,
      alsoTry,
      isIconic: src.isIconic,
      clusterId: src.clusterId,
    };
  });
}

function autoTitle(input: { durationMonths: number; startMonth: number; party: Party }): string {
  const start = MONTH_NAMES[input.startMonth];
  const endMonth = ((input.startMonth - 1 + input.durationMonths - 1) % 12) + 1;
  const end = MONTH_NAMES[endMonth];
  const who = input.party === "family_kids" ? "with Kids" : "Gap Year";
  return `${input.durationMonths}-Month ${who}: ${start}–${end}`;
}

function friendlyError(err: any): string {
  const msg = String(err?.message || err || "");
  if (/credit balance/i.test(msg)) return "AI temporarily unavailable — please try again later.";
  if (/rate limit|429/i.test(msg)) return "Too many requests right now. Try again in a minute.";
  if (/timeout|timed out/i.test(msg)) return "Generation timed out. Please retry.";
  if (/non-JSON/i.test(msg)) return "AI returned an unexpected response. Please retry.";
  return "Could not generate this month. Please retry.";
}

async function callClaude(apiKey: string, prompt: string): Promise<any> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API: ${response.status} ${err.slice(0, 200)}`);
  }
  const result = await response.json();
  const text: string = result.content?.[0]?.text ?? "";
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Claude returned non-JSON");
  }
}
