import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

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

  const VALID_TYPES = ["solo", "couple", "family", "biker", "backpacker", "spiritual"];
  const VALID_BUDGETS = ["budget", "mid-range", "luxury"];

  if (!month || !days || !travelerType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!VALID_TYPES.includes(travelerType)) {
    return NextResponse.json({ error: "Invalid traveler type" }, { status: 400 });
  }

  if (budget && !VALID_BUDGETS.includes(budget)) {
    return NextResponse.json({ error: "Invalid budget" }, { status: 400 });
  }

  if (typeof days !== "number" || days < 1 || days > 30) {
    return NextResponse.json({ error: "Days must be 1-30" }, { status: 400 });
  }

  const safeOrigin = typeof origin === "string" ? origin.slice(0, 100) : "Delhi";

  // Fetch destination data for context
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const supabase = createClient(url, key);

  // Fetch destinations, tourist traps, and prose in parallel
  let destQuery = supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, budget_tier, tags,
      state:states(name),
      destination_months(month, score, note, prose_lead, who_should_go, who_should_avoid),
      kids_friendly(suitable, rating, reasons),
      confidence_cards(network, medical, transport, safety, best_tip, warning)
    `);

  if (destinationIds?.length > 0) {
    destQuery = destQuery.in("id", destinationIds);
  } else {
    destQuery = destQuery.limit(30);
  }

  const [destResult, trapResult] = await Promise.all([
    destQuery,
    supabase.from("tourist_trap_alternatives").select(`
      trap_destination_id, alternative_destination_id, why_better,
      alt_dest:destinations!alternative_destination_id(name)
    `).order("rank"),
  ]);

  const destinations = destResult.data ?? [];

  // Build tourist trap map
  const trapMap: Record<string, { altId: string; altName: string; reason: string }> = {};
  for (const t of (trapResult.data ?? [])) {
    if (!trapMap[t.trap_destination_id]) {
      const altData = Array.isArray(t.alt_dest) ? t.alt_dest[0] : t.alt_dest;
      trapMap[t.trap_destination_id] = {
        altId: t.alternative_destination_id,
        altName: altData?.name ?? t.alternative_destination_id,
        reason: t.why_better,
      };
    }
  }

  // Build destination context with prose
  const destContextFull = destinations.map((d: any) => {
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
      proseLead: monthData?.prose_lead ?? null,
      whoShouldGo: monthData?.who_should_go ?? null,
      whoShouldAvoid: monthData?.who_should_avoid ?? null,
      kidsSuitable: kf?.suitable ?? null,
      kidsRating: kf?.rating ?? null,
      network: typeof cc?.network === "object" ? JSON.stringify(cc.network) : cc?.network ?? null,
      medical: typeof cc?.medical === "object" ? JSON.stringify(cc.medical) : cc?.medical ?? null,
      bestTip: cc?.best_tip ?? null,
      warning: cc?.warning ?? null,
      tags: d.tags,
      isTouristTrap: !!trapMap[d.id],
      betterAlternative: trapMap[d.id] ?? null,
    };
  }).filter((d: any) => d.monthScore === null || d.monthScore >= 3);

  // Slim the payload sent to Anthropic. Thirty destinations × long prose each
  // was blowing the token budget on Haiku and returning 502 (BUG-101). Keep
  // the top 12 scorers for the selected month; the deterministic fallback
  // below still uses the full list.
  const destContext = [...destContextFull]
    .sort((a: any, b: any) => (b.monthScore ?? 0) - (a.monthScore ?? 0))
    .slice(0, 12);

  const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const MAINSTREAM = ["manali", "shimla", "nainital", "mussoorie", "rishikesh", "srinagar", "gulmarg", "jaipur", "udaipur", "darjeeling", "goa"];

  const prompt = `You are NakshIQ's itinerary engine. NakshIQ is India's travel confidence platform — we score destinations month-by-month, we don't sell packages. Our voice is declarative, honest, and specific.

Create a ${days}-day itinerary for a ${travelerType} traveler in ${MONTH_NAMES[month]}.

VOICE RULES (mandatory):
- First-person plural ("We recommend", "We'd skip this")
- NEVER use these words: hidden gem, breathtaking, must-visit, bucket list, curated, elevated, paradise, pristine, magical, stunning
- Be specific: name the exact viewpoint, the road condition, the chai stall before the pass
- If a place has bad roads or no ATM, say so plainly
- Use the proseLead field for each destination — your descriptions should feel like NakshIQ editorial, not generic travel writing

TRAVELER PROFILE:
- Type: ${travelerType}
- Budget: ${budget || "mid-range"}
- Origin: ${safeOrigin}
- Duration: ${days} days
- Month: ${MONTH_NAMES[month]}

TOURIST TRAP RULES (critical):
These destinations are known tourist traps. If the route would naturally include them, ALWAYS suggest the alternative instead and explain why:
${Object.entries(trapMap).map(([id, alt]) => `- ${id} → use ${alt.altName} instead (${alt.reason})`).join("\n")}

OFFBEAT RULE:
At least 60% of destinations MUST NOT be from this mainstream list: [${MAINSTREAM.join(", ")}].
For every mainstream destination included, name a specific lesser-known alternative within 2 hours drive.
NakshIQ exists to take people off the beaten path — the itinerary should reflect that.

DESTINATIONS DATA (with ${MONTH_NAMES[month]} scores, editorial prose, and infrastructure):
${JSON.stringify(destContext, null, 2)}

PLANNING RULES:
1. Only recommend destinations scoring 3+ for ${MONTH_NAMES[month]}
2. Group nearby destinations logically — no zigzagging across states
3. Include realistic driving times between stops (Indian roads, not Google Maps optimistic estimates)
4. For families: prioritize kids-suitable places (kidsRating 3+), avoid extreme difficulty
5. For bikers: include road surface conditions and fuel stop distances
6. For budget travelers: mention specific budget stays (not generic "budget hotel")
7. Warn about altitude sickness, permits, and infrastructure gaps (no ATM, no network, etc.)
8. Include one off-the-beaten-path stop per 3 days that most tourists skip
9. Reference the monthNote and proseLead in your day descriptions — make it feel editorial, not algorithmic

Return ONLY valid JSON in this exact format (no markdown, no code fences):
{
  "title": "Trip title",
  "summary": "1-2 sentence overview in NakshIQ voice",
  "totalDistance": "approximate km",
  "bestFor": ["type1", "type2"],
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "destination": "destination-id",
      "destinationName": "Display Name",
      "nakshiqScore": 5,
      "activities": ["specific activity 1", "specific activity 2"],
      "stayAt": "Specific stay recommendation",
      "travelTime": "X hours from previous (road condition note)",
      "tips": "Practical NakshIQ-style tip",
      "meals": "Specific food recommendation"
    }
  ],
  "packingTips": ["specific tip1", "specific tip2"],
  "warnings": ["honest warning1"],
  "estimatedBudget": {
    "budget": "₹X-Y per person",
    "midRange": "₹X-Y per person",
    "luxury": "₹X-Y per person"
  }
}`;

  // Deterministic fallback builder — returns an itinerary shaped exactly
  // like the AI response when the Anthropic call fails (quota, timeout,
  // token overflow, transient 5xx). Used to keep the flagship /plan CTA
  // from ever dead-ending at a 502 (BUG-101).
  function buildFallbackItinerary() {
    const top = destContext.slice(0, Math.min(days, 8));
    const daysOut = Array.from({ length: days }, (_, i) => {
      const d = top[i % Math.max(1, top.length)];
      return {
        day: i + 1,
        title: d ? `${d.name}${d.state ? `, ${d.state}` : ""}` : `Day ${i + 1}`,
        destination: d?.id ?? "",
        destinationName: d?.name ?? "",
        nakshiqScore: d?.monthScore ?? 0,
        activities: [
          d?.monthNote ?? "Explore the area at your own pace.",
          d?.bestTip ?? "Pause for chai at a roadside stall — the locals know best.",
        ].filter(Boolean),
        stayAt: d?.budget === "budget" ? "Local homestay or guesthouse" : "Mid-range hotel with reliable hot water",
        travelTime: i === 0 ? `From ${safeOrigin}` : "3–5 hours from previous stop",
        tips: d?.warning ?? d?.bestTip ?? "Carry cash — not every town has a working ATM.",
        meals: "Local thali or dhaba dinner — ask for what's cooked fresh today.",
      };
    });

    return {
      title: `${MONTH_NAMES[month]} · ${days}-day ${travelerType} trip from ${safeOrigin}`,
      summary: `A ${days}-day route through destinations that score well in ${MONTH_NAMES[month]}. We've prioritised places with good weather, open roads, and honest infrastructure this month.`,
      totalDistance: `${Math.max(200, days * 150)}–${days * 250} km`,
      bestFor: [travelerType, budget || "mid-range"],
      days: daysOut,
      packingTips: [
        "Layered clothing — Indian weather shifts fast across elevation.",
        "Power bank and offline maps — network is unreliable past mainstream towns.",
        "Basic first-aid + altitude meds if going above 3,000m.",
      ],
      warnings: [
        "Road conditions change monthly — check our road-conditions page before you leave.",
        "Some destinations have inner-line permits or restricted access; confirm before booking.",
      ],
      estimatedBudget: {
        budget: `₹${days * 2000}–${days * 3500} per person`,
        midRange: `₹${days * 4000}–${days * 7000} per person`,
        luxury: `₹${days * 10000}–${days * 18000} per person`,
      },
      _fallback: true,
    };
  }

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
      console.error("Anthropic API error — serving deterministic fallback:", response.status, err.slice(0, 500));
      return NextResponse.json({ itinerary: buildFallbackItinerary() });
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
        try {
          const itinerary = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ itinerary });
        } catch (parseErr) {
          console.error("Failed to parse extracted JSON — serving fallback:", parseErr);
          return NextResponse.json({ itinerary: buildFallbackItinerary() });
        }
      }
      console.error("No JSON in AI response — serving fallback. First 300 chars:", text.slice(0, 300));
      return NextResponse.json({ itinerary: buildFallbackItinerary() });
    }
  } catch (err: any) {
    console.error("Itinerary generation error — serving fallback:", err?.message ?? err);
    return NextResponse.json({ itinerary: buildFallbackItinerary() });
  }
}
