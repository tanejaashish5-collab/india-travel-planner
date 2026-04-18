import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildShortlist } from "@/lib/gap-year/shortlist";
import { buildSkeletonPrompt, buildMonthPrompt } from "@/lib/gap-year/prompts";
import {
  MONTH_NAMES,
  type Persona,
  type Budget,
  type Region,
  type MonthPlan,
} from "@/lib/gap-year/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const VALID_PERSONAS: Persona[] = ["family_kids", "solo_couple"];
const VALID_BUDGETS: Budget[] = ["budget", "mid-range", "splurge"];

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
  if (!rawApiKey) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 });
  }
  const apiKey: string = rawApiKey;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded — 10 plans per hour per IP" },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { durationMonths, startMonth, persona, budget, origin, interests } = body;

  if (!Number.isInteger(durationMonths) || durationMonths < 3 || durationMonths > 12) {
    return NextResponse.json({ error: "durationMonths must be 3-12" }, { status: 400 });
  }
  if (!Number.isInteger(startMonth) || startMonth < 1 || startMonth > 12) {
    return NextResponse.json({ error: "startMonth must be 1-12" }, { status: 400 });
  }
  if (!VALID_PERSONAS.includes(persona)) {
    return NextResponse.json({ error: "Invalid persona" }, { status: 400 });
  }
  if (budget && !VALID_BUDGETS.includes(budget)) {
    return NextResponse.json({ error: "Invalid budget" }, { status: 400 });
  }

  const cleanInterests = Array.isArray(interests)
    ? interests.filter((i) => typeof i === "string").slice(0, 8)
    : [];
  const cleanOrigin = typeof origin === "string" ? origin.slice(0, 80) : undefined;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Build the sequence of months (month-of-year) starting at startMonth
  const months: number[] = [];
  for (let i = 0; i < durationMonths; i++) {
    months.push(((startMonth - 1 + i) % 12) + 1);
  }

  // Optional: skeleton call partitions months into regions when duration >= 5
  let monthRegions: (Region | "any")[] = months.map(() => "any");
  if (durationMonths >= 5) {
    try {
      const chain = await callClaude(
        apiKey,
        buildSkeletonPrompt({ months, persona, origin: cleanOrigin, interests: cleanInterests })
      );
      if (Array.isArray(chain?.chain)) {
        monthRegions = chain.chain.map((c: any) =>
          typeof c.region === "string" ? (c.region as Region) : "any"
        );
      }
    } catch (err) {
      console.warn("Skeleton call failed, falling back to 'any' regions:", err);
    }
  }

  // Per-month work: shortlist → Claude → MonthPlan
  const alreadyPicked: { id: string; monthName: string }[] = [];

  // Can't run fully parallel because picks feed into later exclusions.
  // Compromise: run 3 concurrent workers, seeding exclusions greedily.
  const monthPlans: MonthPlan[] = new Array(durationMonths);
  const CONCURRENCY = 4;

  let cursor = 0;
  async function worker() {
    while (cursor < durationMonths) {
      const idx = cursor++;
      if (idx >= durationMonths) return;
      const monthIndex = months[idx];
      const region = monthRegions[idx];

      try {
        const shortlist = await buildShortlist(supabase, {
          month: monthIndex,
          persona,
          budget,
          region: region !== "any" ? region : undefined,
          excludeIds: alreadyPicked.map((p) => p.id),
          minScore: 4,
          limit: 15,
        });

        if (shortlist.length === 0) {
          monthPlans[idx] = {
            monthIndex,
            monthName: MONTH_NAMES[monthIndex],
            region,
            destinations: [],
            narrative: `No shortlist matched for ${MONTH_NAMES[monthIndex]}. Try relaxing the region or budget filter.`,
            estDailyCostInr: 0,
            error: "empty_shortlist",
          };
          continue;
        }

        const result = await callClaude(
          apiKey,
          buildMonthPrompt({
            monthIndex,
            persona,
            budget,
            kids: persona === "family_kids",
            interests: cleanInterests,
            regionConstraint: region,
            alreadyPicked,
            shortlist,
          })
        );

        const picks = (result?.destinations ?? []).filter((p: any) =>
          shortlist.some((s) => s.id === p.id)
        );

        const hydrated = picks.map((p: any) => {
          const src = shortlist.find((s) => s.id === p.id)!;
          return {
            id: src.id,
            name: src.name,
            state: src.state,
            days: Number(p.days) || 7,
            rationale: String(p.rationale || ""),
            budgetTier: src.budgetTier,
            dailyCostInr: src.dailyCostInr,
            image: src.image,
          };
        });

        // greedy exclusion — add to alreadyPicked for subsequent workers
        const monthLabel = MONTH_NAMES[monthIndex] ?? String(monthIndex);
        for (const h of hydrated) {
          alreadyPicked.push({ id: h.id, monthName: monthLabel });
        }

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
          error: err?.message || "generation_failed",
        };
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  return NextResponse.json({
    plan: {
      title: autoTitle({ durationMonths, startMonth, persona }),
      input: { durationMonths, startMonth, persona, budget, origin: cleanOrigin, interests: cleanInterests },
      months: monthPlans,
    },
  });
}

function autoTitle(input: { durationMonths: number; startMonth: number; persona: Persona }): string {
  const start = MONTH_NAMES[input.startMonth];
  const endMonth = ((input.startMonth - 1 + input.durationMonths - 1) % 12) + 1;
  const end = MONTH_NAMES[endMonth];
  const who = input.persona === "family_kids" ? "with Kids" : "Gap Year";
  return `${input.durationMonths}-Month ${who}: ${start}–${end}`;
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
