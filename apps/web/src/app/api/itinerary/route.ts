import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI itinerary generation is not configured yet. Add ANTHROPIC_API_KEY to enable." },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { month, days, travelerType, budget, origin, destinationIds } = body;

  if (!month || !days || !travelerType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Fetch destination data for context
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const supabase = createClient(url, key);

  // Get the selected destinations or top-scored ones for the month
  let destQuery = supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, budget_tier, tags,
      state:states(name),
      destination_months(month, score, note),
      kids_friendly(suitable, rating, reasons),
      confidence_cards(network, medical, transport, safety, best_tip, warning)
    `);

  if (destinationIds?.length > 0) {
    destQuery = destQuery.in("id", destinationIds);
  } else {
    destQuery = destQuery.limit(20);
  }

  const { data: destinations } = await destQuery;

  // Build destination context
  const destContext = (destinations ?? []).map((d: any) => {
    const monthData = d.destination_months?.find((m: any) => m.month === month);
    const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
    const cc = Array.isArray(d.confidence_cards) ? d.confidence_cards[0] : d.confidence_cards;
    const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;

    return {
      id: d.id,
      name: d.name,
      state: stateName,
      tagline: d.tagline,
      difficulty: d.difficulty,
      elevation: d.elevation_m,
      budget: d.budget_tier,
      monthScore: monthData?.score ?? null,
      monthNote: monthData?.note ?? null,
      kidsSuitable: kf?.suitable ?? null,
      kidsRating: kf?.rating ?? null,
      network: cc?.network ?? null,
      medical: cc?.medical ?? null,
      bestTip: cc?.best_tip ?? null,
      warning: cc?.warning ?? null,
      tags: d.tags,
    };
  }).filter((d: any) => d.monthScore === null || d.monthScore >= 3);

  const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const prompt = `You are an expert India travel planner. Create a detailed ${days}-day itinerary for a ${travelerType} traveler visiting North India in ${MONTH_NAMES[month]}.

TRAVELER PROFILE:
- Type: ${travelerType}
- Budget: ${budget || "mid-range"}
- Origin city: ${origin || "Delhi"}
- Duration: ${days} days
- Month: ${MONTH_NAMES[month]}

AVAILABLE DESTINATIONS (with current month scores and data):
${JSON.stringify(destContext, null, 2)}

RULES:
1. Only recommend destinations that score 3+ for ${MONTH_NAMES[month]} (or have no score data but are reasonable)
2. Group nearby destinations logically — don't zigzag across states
3. Include realistic driving/travel times between stops
4. For families: prioritize kids-suitable places, avoid extreme difficulty
5. For bikers: include road conditions and fuel stops
6. For budget travelers: mention budget accommodation options
7. Include specific activities for each day
8. Warn about any altitude sickness risks, permit requirements, or infrastructure limitations
9. Include one "hidden gem" or non-obvious suggestion per 3 days

Return ONLY valid JSON in this exact format (no markdown, no code fences):
{
  "title": "Trip title",
  "summary": "1-2 sentence overview",
  "totalDistance": "approximate km",
  "bestFor": ["type1", "type2"],
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "destination": "destination-id",
      "destinationName": "Display Name",
      "activities": ["activity 1", "activity 2"],
      "stayAt": "Where to stay",
      "travelTime": "X hours from previous",
      "tips": "Practical tip for this day",
      "meals": "Food suggestion"
    }
  ],
  "packingTips": ["tip1", "tip2"],
  "warnings": ["warning1"],
  "estimatedBudget": {
    "budget": "₹X-Y per person",
    "midRange": "₹X-Y per person",
    "luxury": "₹X-Y per person"
  }
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }

    const result = await response.json();
    const text = result.content?.[0]?.text ?? "";

    // Parse the JSON from the response
    try {
      const itinerary = JSON.parse(text);
      return NextResponse.json({ itinerary });
    } catch {
      // Try to extract JSON from the response if it has extra text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const itinerary = JSON.parse(jsonMatch[0]);
        return NextResponse.json({ itinerary });
      }
      return NextResponse.json({ error: "Failed to parse AI response", raw: text }, { status: 500 });
    }
  } catch (err: any) {
    console.error("Itinerary generation error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
