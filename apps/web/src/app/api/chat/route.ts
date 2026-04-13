import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

const RATE_LIMIT_PER_DAY = 20;

const SYSTEM_PROMPT = `You are Ask NakshIQ — the AI travel assistant for NakshIQ, India's travel intelligence platform.

RULES:
- Answer ONLY using the provided context from NakshIQ's database. Never make up facts.
- If the context doesn't contain enough information, say "I don't have detailed data on this yet, but here's what I know..." and share what you can.
- Keep answers concise (2-4 paragraphs max). Use bullet points for lists.
- Always mention specific scores, ratings, and data points when available.
- For month recommendations, reference the actual monthly scores from the data.
- When mentioning destinations or places, format them so the user can find them on NakshIQ.
- Only discuss India travel topics. For unrelated questions, politely redirect.
- Be warm and helpful, like a knowledgeable Indian friend giving travel advice.
- Use ₹ for prices. Use metric units.
- If asked about bookings, say NakshIQ doesn't handle bookings yet but provides the intelligence to make informed decisions.`;

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

    // Rate limiting by IP hash
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
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
        answer: `You've reached the daily limit of ${RATE_LIMIT_PER_DAY} questions. Come back tomorrow for more travel intelligence!`,
        sources: [],
      }, { status: 429 });
    }

    // 1. Embed the question
    const openai = new OpenAI({ apiKey: openaiKey });
    const embResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: question,
    });
    const queryEmbedding = embResponse.data[0].embedding;

    // 2. Vector search — find most relevant content
    const { data: matches, error: matchError } = await supabase.rpc("match_documents", {
      query_embedding: JSON.stringify(queryEmbedding),
      match_count: 10,
    });

    if (matchError) {
      console.error("Match error:", matchError);
      return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }

    // 3. Build context from matches
    const context = (matches ?? [])
      .filter((m: any) => m.similarity > 0.3)
      .map((m: any) => `[${m.source_type.toUpperCase()}: ${m.source_id}] ${m.content}`)
      .join("\n\n");

    // Build sources list for the response
    const sources = (matches ?? [])
      .filter((m: any) => m.similarity > 0.3)
      .slice(0, 5)
      .map((m: any) => ({
        type: m.source_type,
        id: m.source_id,
        name: m.metadata?.name || m.metadata?.title || m.source_id,
        similarity: Math.round(m.similarity * 100),
      }));

    // 4. Generate answer with Claude Haiku
    const anthropic = new Anthropic({ apiKey: anthropicKey });

    const messages: Anthropic.MessageParam[] = [];

    // Add history if provided (last 4 turns max)
    if (Array.isArray(history)) {
      for (const h of history.slice(-4)) {
        if (h.role === "user") messages.push({ role: "user", content: h.content });
        if (h.role === "assistant") messages.push({ role: "assistant", content: h.content });
      }
    }

    messages.push({
      role: "user",
      content: `Context from NakshIQ database:\n${context || "No relevant data found."}\n\nUser question: ${question}`,
    });

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const answer = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.type === "text" ? b.text : "")
      .join("");

    // 5. Log the conversation
    await supabase.from("chat_logs").insert({
      question,
      answer,
      sources,
      ip_hash: ipHash,
    });

    return NextResponse.json({ answer, sources });
  } catch (err: any) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
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
