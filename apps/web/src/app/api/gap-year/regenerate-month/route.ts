import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildShortlist } from "@/lib/gap-year/shortlist";
import { buildMonthPrompt } from "@/lib/gap-year/prompts";
import { MONTH_NAMES, type Persona, type Budget, type Region, type MonthPlan } from "@/lib/gap-year/types";

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
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI not configured" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json();
  const {
    monthIndex,
    persona,
    budget,
    interests,
    region,
    alreadyPickedIds,
  } = body as {
    monthIndex: number;
    persona: Persona;
    budget?: Budget;
    interests?: string[];
    region?: Region | "any";
    alreadyPickedIds?: string[];
  };

  if (!Number.isInteger(monthIndex) || monthIndex < 1 || monthIndex > 12) {
    return NextResponse.json({ error: "Invalid monthIndex" }, { status: 400 });
  }
  if (persona !== "family_kids" && persona !== "solo_couple") {
    return NextResponse.json({ error: "Invalid persona" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  const regionConstraint = (region && region !== "any") ? (region as Region) : undefined;

  const shortlist = await buildShortlist(supabase, {
    month: monthIndex,
    persona,
    budget,
    region: regionConstraint,
    excludeIds: alreadyPickedIds ?? [],
    minScore: 4,
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
    const prompt = buildMonthPrompt({
      monthIndex,
      persona,
      budget,
      kids: persona === "family_kids",
      interests: interests ?? [],
      regionConstraint: region ?? "any",
      alreadyPicked: (alreadyPickedIds ?? []).map((id) => ({ id, monthName: "other month" })),
      shortlist,
    });

    const result = await callClaude(apiKey, prompt);
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
    return NextResponse.json({ error: err?.message || "generation_failed" }, { status: 502 });
  }
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
