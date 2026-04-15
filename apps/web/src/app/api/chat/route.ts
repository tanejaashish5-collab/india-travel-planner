import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

const RATE_LIMIT_PER_DAY = 20;

const SYSTEM_PROMPT = `You are Ask NakshIQ — the AI travel assistant for NakshIQ, India's travel intelligence platform.

RULES:
- Answer ONLY using the provided context from NakshIQ's database and any structured data results. Never make up facts.
- If the context doesn't contain enough information, say "I don't have detailed data on this yet, but here's what I know..." and share what you can.
- Use markdown formatting with headers, bullet points, and bold for emphasis.
- Always cite specific scores (X/5), entry fees, time needed, and kids ratings when available.
- For month recommendations, always reference the actual monthly scores from the data.
- When mentioning destinations, include the state name.
- Only discuss India travel topics. For unrelated questions, politely redirect.
- Be warm but direct — like a knowledgeable Indian friend who doesn't sugarcoat. Flag honest trade-offs.
- Use ₹ for prices. Use metric units.
- If asked about bookings, say NakshIQ doesn't handle bookings yet.
- Prioritize structured query results (live data) over text context.

FOR ITINERARY / PLANNING QUESTIONS:
- Always include realistic driving/flying times between destinations. Don't hide travel days.
- Give a rough daily budget range (budget / mid / premium) in ₹.
- If combining distant states, be honest about whether it's realistic or rushed.
- Explain what you're recommending AND what you're excluding and why.
- End with a "What this costs" section with rough per-day estimates.
- If a popular destination was excluded from your plan, briefly explain why.`;

// Classify question complexity: simple (Haiku) vs complex (Sonnet)
function isComplexQuestion(question: string): boolean {
  const complexPatterns = [
    /\bplan\b.*\bitinerary\b/i,
    /\bcompare\b/i,
    /\bvs\.?\b/i,
    /\b\d+[\s-]?day\b/i,
    /\bitinerary\b/i,
    /\bbudget\b.*\bplan\b/i,
    /\bdetailed\b/i,
    /\bexplain\b.*\bdifference\b/i,
    /\bpros\b.*\bcons\b/i,
    /\bshould i\b.*\bor\b/i,
  ];
  return complexPatterns.some((p) => p.test(question));
}

// Extract entity names from question for targeted SQL lookups
function extractEntities(question: string): { destinations: string[]; months: number[]; wantsKids: boolean; wantsScores: boolean } {
  const q = question.toLowerCase();

  // Month detection
  const monthMap: Record<string, number> = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
    jan: 1, feb: 2, mar: 3, apr: 4, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  };
  const months: number[] = [];
  for (const [name, num] of Object.entries(monthMap)) {
    if (q.includes(name)) months.push(num);
  }

  const wantsKids = /\bkid|child|family|families|toddler|infant|baby\b/i.test(q);
  const wantsScores = /\bbest\b.*\btime|score|rating|when.*visit|when.*go\b/i.test(q);

  // Destination name extraction (match known patterns)
  const destinations: string[] = [];
  const destPatterns = [
    /\b(manali|shimla|kasol|dharamshala|mcleodganj|leh|ladakh|srinagar|gulmarg|pahalgam|sonamarg)\b/gi,
    /\b(jaipur|udaipur|jodhpur|jaisalmer|pushkar|bikaner|mount abu)\b/gi,
    /\b(varanasi|agra|delhi|lucknow|rishikesh|haridwar|mathura|ayodhya)\b/gi,
    /\b(nainital|mussoorie|kedarnath|badrinath|auli|chopta|corbett)\b/gi,
    /\b(gangtok|darjeeling|shillong|tawang|kaziranga|guwahati|kolkata)\b/gi,
    /\b(bhopal|khajuraho|orchha|ujjain|sanchi|amritsar|chandigarh)\b/gi,
    /\b(spiti|kinnaur|zanskar|pangong|nubra)\b/gi,
  ];
  for (const p of destPatterns) {
    const m = q.match(p);
    if (m) destinations.push(...m.map((d) => d.toLowerCase()));
  }

  return { destinations, months, wantsKids, wantsScores };
}

export async function POST(req: Request) {
  try {
    const { question, history } = await req.json();
    if (!question || typeof question !== "string" || question.length > 1000) {
      return NextResponse.json({ error: "Invalid question" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!supabaseUrl || !supabaseKey || !anthropicKey || !openaiKey) {
      return NextResponse.json({ error: "Service not configured" }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Rate limiting
    const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const ipHash = await hashString(ip);
    const today = new Date().toISOString().split("T")[0];
    const { count } = await supabase
      .from("chat_logs")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", `${today}T00:00:00Z`);

    if ((count ?? 0) >= RATE_LIMIT_PER_DAY) {
      return NextResponse.json({
        error: "Daily limit reached",
        answer: `You've reached the daily limit of ${RATE_LIMIT_PER_DAY} questions. Come back tomorrow!`,
        sources: [],
      }, { status: 429 });
    }

    // 1. Embed the question for vector search
    const openai = new OpenAI({ apiKey: openaiKey });
    const embResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: question,
    });
    const queryEmbedding = embResponse.data[0].embedding;

    // 2. HYBRID SEARCH — vector + keyword combined
    const { data: matches, error: matchError } = await supabase.rpc("hybrid_search", {
      query_text: question,
      query_embedding: JSON.stringify(queryEmbedding),
      match_count: 12,
      keyword_weight: 0.3,
      semantic_weight: 0.7,
    });

    if (matchError) {
      console.error("Hybrid search error:", matchError);
      // Fallback to pure vector search
      const { data: fallbackMatches } = await supabase.rpc("match_documents", {
        query_embedding: JSON.stringify(queryEmbedding),
        match_count: 10,
      });
      if (fallbackMatches) {
        return await generateResponse(fallbackMatches, question, history, "", supabase, anthropicKey, ipHash);
      }
      return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }

    // 3. STRUCTURED QUERIES — pull live data for specific entities
    const entities = extractEntities(question);
    let structuredData = "";

    if (entities.destinations.length > 0) {
      // Pull exact destination data with monthly scores
      for (const destName of entities.destinations.slice(0, 3)) {
        // Find destination by name match
        const { data: dest } = await supabase
          .from("destinations")
          .select("id, name, tagline, difficulty, elevation_m, state_id, tags")
          .or(`id.eq.${destName},name.ilike.%${destName}%`)
          .limit(1)
          .single();

        if (dest) {
          // Get monthly scores
          const { data: scores } = await supabase
            .from("destination_months")
            .select("month, score, note")
            .eq("destination_id", dest.id)
            .order("month");

          // Get kids data
          const { data: kids } = await supabase
            .from("kids_friendly")
            .select("suitable, rating, min_age, max_age, notes")
            .eq("destination_id", dest.id)
            .limit(1);

          // Get POIs
          const { data: pois } = await supabase
            .from("points_of_interest")
            .select("name, type, entry_fee, time_needed, kids_suitable")
            .eq("destination_id", dest.id);

          const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          const scoreStr = (scores ?? []).map((s: any) => `${monthNames[s.month-1]}: ${s.score}/5${s.note ? ` (${s.note})` : ""}`).join(", ");
          const kf = kids?.[0];
          const kidsStr = kf ? `Kids: ${kf.suitable ? "suitable" : "not suitable"}, rating ${kf.rating || "N/A"}/5${kf.notes ? `. ${kf.notes}` : ""}` : "";
          const poiStr = (pois ?? []).map((p: any) => `- ${p.name} (${p.type}): ${p.entry_fee || "Free"}, ${p.time_needed || "N/A"}, kids: ${p.kids_suitable ? "yes" : "no"}`).join("\n");

          structuredData += `\n\n=== LIVE DATA: ${dest.name} (${dest.state_id}) ===\n`;
          structuredData += `Tagline: ${dest.tagline}\nDifficulty: ${dest.difficulty}\nElevation: ${dest.elevation_m || "N/A"}m\nTags: ${(dest.tags ?? []).join(", ")}\n`;
          structuredData += `Monthly Scores: ${scoreStr}\n`;
          if (kidsStr) structuredData += `${kidsStr}\n`;
          if (poiStr) structuredData += `Places to visit:\n${poiStr}\n`;
        }
      }
    }

    // Direct POI search — extract proper nouns / place names from question
    const stopWords = new Set(["what","is","the","for","of","in","at","to","a","an","how","much","does","cost","entry","fee","price","ticket","visit","time","open","hours","where","best","near","about","can","i","do","things"]);
    const poiTerms = question.toLowerCase().replace(/[?.,!'"]/g, "").split(/\s+/).filter((w) => !stopWords.has(w) && w.length > 2);
    const poiQuery = poiTerms.join(" ");

    if (poiTerms.length > 0) {
      // Search by name similarity using multiple terms
      const searchPatterns = [
        `name.ilike.%${poiTerms.join("%")}%`,
        ...poiTerms.filter((t) => t.length > 3).map((t) => `name.ilike.%${t}%`),
      ].join(",");

      const { data: directPois } = await supabase
        .from("points_of_interest")
        .select("name, type, description, destination_id, entry_fee, time_needed, kids_suitable, tags")
        .or(searchPatterns)
        .limit(5);

      if (directPois && directPois.length > 0) {
        structuredData += `\n\n=== DIRECT POI MATCHES ===\n`;
        for (const p of directPois) {
          structuredData += `- ${p.name} (${p.type}) in ${p.destination_id}: ${p.description || ""}. Entry: ${p.entry_fee || "Free"}. Time: ${p.time_needed || "N/A"}. Kids: ${p.kids_suitable ? "yes" : "no"}. Tags: ${(p.tags ?? []).join(", ")}\n`;
        }
      }
    }

    // If asking about best destinations for a month + kids
    if (entities.wantsScores && entities.months.length > 0) {
      const month = entities.months[0];
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      let query = supabase
        .from("destination_months")
        .select("destination_id, score, note, destinations!inner(name, state_id, difficulty)")
        .eq("month", month)
        .gte("score", 3)
        .order("score", { ascending: false })
        .limit(10);

      const { data: topDests } = await query;

      if (topDests && topDests.length > 0) {
        structuredData += `\n\n=== TOP DESTINATIONS FOR ${monthNames[month-1].toUpperCase()} ===\n`;
        for (const d of topDests) {
          const dest = d.destinations as any;
          structuredData += `- ${dest.name} (${dest.state_id}): ${d.score}/5${d.note ? ` — ${d.note}` : ""}\n`;
        }
      }

      // If also wants kids-friendly
      if (entities.wantsKids) {
        const { data: kidsDests } = await supabase
          .from("kids_friendly")
          .select("destination_id, suitable, rating, notes, destinations!inner(name, state_id)")
          .eq("suitable", true)
          .gte("rating", 3)
          .order("rating", { ascending: false })
          .limit(10);

        if (kidsDests && kidsDests.length > 0) {
          structuredData += `\n\n=== TOP KIDS-FRIENDLY DESTINATIONS ===\n`;
          for (const k of kidsDests) {
            const dest = k.destinations as any;
            structuredData += `- ${dest.name} (${dest.state_id}): rating ${k.rating}/5${k.notes ? ` — ${k.notes}` : ""}\n`;
          }
        }
      }
    }

    return await generateResponse(matches ?? [], question, history, structuredData, supabase, anthropicKey, ipHash);
  } catch (err: any) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

async function generateResponse(
  matches: any[],
  question: string,
  history: any,
  structuredData: string,
  supabase: any,
  anthropicKey: string,
  ipHash: string,
) {
  // Build context from hybrid search matches
  const filteredMatches = matches.filter((m: any) => m.similarity > 0.2);
  const context = filteredMatches
    .map((m: any) => `[${m.source_type.toUpperCase()}: ${m.source_id}] ${m.content}`)
    .join("\n\n");

  const sources = filteredMatches
    .slice(0, 6)
    .map((m: any) => ({
      type: m.source_type,
      id: m.source_id,
      name: m.metadata?.name || m.metadata?.title || m.source_id,
      similarity: Math.round(m.similarity * 100),
    }));

  // Deduplicate sources by id
  const seenIds = new Set<string>();
  const dedupedSources = sources.filter((s: any) => {
    if (seenIds.has(s.id)) return false;
    seenIds.add(s.id);
    return true;
  }).slice(0, 5);

  // Smart model routing: Haiku for simple, Sonnet for complex
  const complex = isComplexQuestion(question);
  const model = complex ? "claude-sonnet-4-6" : "claude-haiku-4-5-20251001";
  const maxTokens = complex ? 4096 : 1024;

  const anthropic = new Anthropic({ apiKey: anthropicKey });

  // Build messages with extended history (8 turns)
  const messages: Anthropic.MessageParam[] = [];
  if (Array.isArray(history)) {
    for (const h of history.slice(-8)) {
      if ((h.role === "user" || h.role === "assistant") && typeof h.content === "string") {
        const safeContent = h.content.slice(0, 2000);
        messages.push({ role: h.role, content: safeContent });
      }
    }
  }

  let userContent = "";
  if (structuredData) {
    userContent += `STRUCTURED QUERY RESULTS (live database — most accurate):\n${structuredData}\n\n`;
  }
  userContent += `SEARCH CONTEXT (text matches):\n${context || "No relevant data found."}\n\n`;
  userContent += `User question: ${question}`;

  messages.push({ role: "user", content: userContent });

  const response = await anthropic.messages.create({
    model,
    max_tokens: maxTokens,
    system: SYSTEM_PROMPT,
    messages,
  });

  const answer = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.type === "text" ? b.text : "")
    .join("");

  // Log
  await supabase.from("chat_logs").insert({
    question,
    answer,
    sources: dedupedSources,
    ip_hash: ipHash,
  });

  return NextResponse.json({
    answer,
    sources: dedupedSources,
    model: complex ? "sonnet" : "haiku",
  });
}

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str + (process.env.EMBED_SECRET || "salt"));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
}
