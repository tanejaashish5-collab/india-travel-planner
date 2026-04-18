import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildShortlistForArchetype } from "@/lib/gap-year/shortlist";
import { buildMonthPrompt } from "@/lib/gap-year/prompts";
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
  type AlternativePair,
} from "@/lib/gap-year/types";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const rateLimits = new Map<string, number[]>();
const RATE_LIMIT_MAX = 20;
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
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json();
  const {
    monthIndex, party, familiarity, experienceTier, themes,
    region, alreadyPickedIds,
    // v1 compat
    persona, budget,
  } = body as any;

  const effectiveParty: Party = party ?? persona;
  const effectiveFamiliarity: Familiarity = familiarity ?? "first_timer";
  const effectiveTier: ExperienceTier =
    experienceTier ?? (budget === "splurge" ? "splurge" : budget === "budget" ? "thrifty" : "comfortable");

  if (!Number.isInteger(monthIndex) || monthIndex < 1 || monthIndex > 12)
    return NextResponse.json({ error: "Invalid monthIndex" }, { status: 400 });
  if (effectiveParty !== "family_kids" && effectiveParty !== "solo_couple")
    return NextResponse.json({ error: "Invalid party" }, { status: 400 });

  const cleanThemes: Theme[] = Array.isArray(themes)
    ? themes.filter((t: any) => typeof t === "string" && THEMES.includes(t as Theme)).slice(0, 3)
    : [];
  const archetype = resolveArchetype({ familiarity: effectiveFamiliarity, party: effectiveParty });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey)
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const supabase = createClient(supabaseUrl, supabaseKey);

  const regionConstraint = region && region !== "any" ? (region as Region) : undefined;

  const shortlist = await buildShortlistForArchetype(supabase, {
    month: monthIndex,
    archetype,
    experienceTier: effectiveTier,
    themes: cleanThemes,
    region: regionConstraint,
    excludeIds: alreadyPickedIds ?? [],
    limit: 15,
  });

  if (shortlist.length === 0) {
    return NextResponse.json({
      month: {
        monthIndex,
        monthName: MONTH_NAMES[monthIndex],
        region: region ?? "any",
        destinations: [],
        narrative: `No shortlist matched for ${MONTH_NAMES[monthIndex]}. Try relaxing filters.`,
        estDailyCostInr: 0,
        error: "empty_shortlist",
      } satisfies MonthPlan,
    });
  }

  try {
    let result = await callClaude(
      apiKey,
      buildMonthPrompt({
        monthIndex,
        archetype,
        experienceTier: effectiveTier,
        themes: cleanThemes,
        regionConstraint: region ?? "any",
        alreadyPicked: (alreadyPickedIds ?? []).map((id: string) => ({ id, monthName: "other month" })),
        shortlist,
      })
    );

    let hydrated = hydrate(result, shortlist);
    let validator = validateDaySplit(hydrated, shortlist);

    if (!validator.ok) {
      console.warn(`Regen day-cap violation month ${monthIndex}: ${validator.reason} — replaying`);
      result = await callClaude(
        apiKey,
        buildMonthPrompt({
          monthIndex,
          archetype,
          experienceTier: effectiveTier,
          themes: cleanThemes,
          regionConstraint: region ?? "any",
          alreadyPicked: (alreadyPickedIds ?? []).map((id: string) => ({ id, monthName: "other month" })),
          shortlist,
          enforceSplit: true,
        })
      );
      hydrated = hydrate(result, shortlist);
    }

    const monthPlan: MonthPlan = {
      monthIndex,
      monthName: MONTH_NAMES[monthIndex],
      region: region ?? "any",
      destinations: hydrated,
      narrative: String(result?.narrative || ""),
      estDailyCostInr: Number(result?.estDailyCostInr) || 0,
    };

    return NextResponse.json({ month: monthPlan });
  } catch (err: any) {
    console.error("regenerate-month failed:", err?.message || err);
    return NextResponse.json({ error: friendlyError(err) }, { status: 502 });
  }
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

function friendlyError(err: any): string {
  const msg = String(err?.message || err || "");
  if (/credit balance/i.test(msg)) return "AI temporarily unavailable — please try again later.";
  if (/rate limit|429/i.test(msg)) return "Too many requests right now. Try again in a minute.";
  if (/timeout|timed out/i.test(msg)) return "Generation timed out. Please retry.";
  if (/non-JSON/i.test(msg)) return "AI returned an unexpected response. Please retry.";
  return "Could not regenerate this month. Please retry.";
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
