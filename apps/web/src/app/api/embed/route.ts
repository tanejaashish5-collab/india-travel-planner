import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

const BATCH_SIZE = 50;

/** Trigger: POST /api/embed?key=YOUR_SECRET
 *  Reads all destinations, POIs, articles, stays → chunks → embeds → stores in document_embeddings.
 *  Idempotent: clears old embeddings first.
 */
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("key");
  if (secret !== process.env.EMBED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Clear old embeddings
  await supabase.from("document_embeddings").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  const chunks: { content: string; source_type: string; source_id: string; metadata: Record<string, any> }[] = [];

  // 1. Destinations (simple query — joins fetched separately)
  const { data: dests } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, state_id");

  const { data: allMonths } = await supabase
    .from("destination_months")
    .select("destination_id, month, score, note");

  const { data: allKids } = await supabase
    .from("kids_friendly")
    .select("destination_id, suitable, rating, min_age, max_age, notes");

  // Build lookups
  const monthsByDest: Record<string, any[]> = {};
  for (const m of allMonths ?? []) {
    if (!monthsByDest[m.destination_id]) monthsByDest[m.destination_id] = [];
    monthsByDest[m.destination_id].push(m);
  }
  const kidsByDest: Record<string, any> = {};
  for (const k of allKids ?? []) {
    kidsByDest[k.destination_id] = k;
  }

  for (const d of dests ?? []) {
    const months = (monthsByDest[d.id] ?? []).sort((a: any, b: any) => a.month - b.month);
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const scoreText = months
      .map((m: any) => `${monthNames[m.month - 1]}: ${m.score}/5${m.note ? ` (${m.note})` : ""}`)
      .join(", ");

    const kf = kidsByDest[d.id];
    const kidsText = kf
      ? `Kids: ${kf.suitable ? "suitable" : "not suitable"}${kf.rating ? `, rating ${kf.rating}/5` : ""}${kf.min_age ? `, ages ${kf.min_age}-${kf.max_age}` : ""}${kf.notes ? `. ${kf.notes}` : ""}`
      : "";

    chunks.push({
      content: `${d.name} — ${d.tagline || ""}. State: ${d.state_id}. Difficulty: ${d.difficulty}. Elevation: ${d.elevation_m || "N/A"}m. Tags: ${(d.tags ?? []).join(", ")}. Monthly scores: ${scoreText}. ${kidsText}`.trim(),
      source_type: "destination",
      source_id: d.id,
      metadata: { state: d.state_id, name: d.name, difficulty: d.difficulty },
    });
  }

  // 2. POIs
  const { data: pois } = await supabase
    .from("points_of_interest")
    .select("id, name, type, description, destination_id, time_needed, entry_fee, kids_suitable, tags");

  for (const p of pois ?? []) {
    chunks.push({
      content: `${p.name} (${p.type}) in ${p.destination_id}. ${p.description || ""}. Time: ${p.time_needed || "N/A"}. Entry: ${p.entry_fee || "N/A"}. Kids: ${p.kids_suitable ? "yes" : "no"}. Tags: ${(p.tags ?? []).join(", ")}`.trim(),
      source_type: "poi",
      source_id: p.id,
      metadata: { destination: p.destination_id, type: p.type, name: p.name },
    });
  }

  // 3. Articles
  const { data: articles } = await supabase
    .from("articles")
    .select("slug, title, excerpt, content, tags, category");

  for (const a of articles ?? []) {
    const fullText = `${a.title}. ${a.excerpt || ""}. ${a.content || ""}`;
    const articleChunks = chunkText(fullText, 1000);
    for (let i = 0; i < articleChunks.length; i++) {
      chunks.push({
        content: articleChunks[i],
        source_type: "article",
        source_id: a.slug,
        metadata: { title: a.title, category: a.category, chunk: i },
      });
    }
  }

  // 4. Stays
  const { data: stays } = await supabase
    .from("local_stays")
    .select("id, name, type, destination_id, price_range, why_special, best_for, tags");

  for (const s of stays ?? []) {
    chunks.push({
      content: `${s.name} (${s.type}) stay in ${s.destination_id}. ${s.why_special || ""}. Price: ${s.price_range || "N/A"}. Best for: ${s.best_for || "N/A"}. Tags: ${(s.tags ?? []).join(", ")}`.trim(),
      source_type: "stay",
      source_id: s.id,
      metadata: { destination: s.destination_id, type: s.type, name: s.name },
    });
  }

  // 5. States + Regions
  const { data: states } = await supabase
    .from("states")
    .select("id, name, description, capital, region");

  for (const s of states ?? []) {
    chunks.push({
      content: `${s.name} state. Capital: ${s.capital || "N/A"}. Region: ${s.region || ""}. ${s.description || ""}`.trim(),
      source_type: "state",
      source_id: s.id,
      metadata: { name: s.name, region: s.region },
    });
  }

  // 6. Regions detail
  const { data: regions } = await supabase
    .from("regions")
    .select("id, name, state_id, hero_tagline, description, tags, best_months");

  for (const r of regions ?? []) {
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const bestMonths = (r.best_months ?? []).map((m: number) => monthNames[m - 1]).join(", ");
    chunks.push({
      content: `${r.name} region (${r.state_id}). ${r.hero_tagline || ""}. ${r.description || ""}. Best months: ${bestMonths || "year-round"}. Tags: ${(r.tags ?? []).join(", ")}`.trim(),
      source_type: "region",
      source_id: r.id,
      metadata: { state: r.state_id, name: r.name },
    });
  }

  // Embed all chunks in batches
  let embedded = 0;
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map((c) => c.content);

    const embResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts,
    });

    const rows = batch.map((chunk, idx) => ({
      content: chunk.content,
      embedding: JSON.stringify(embResponse.data[idx].embedding),
      source_type: chunk.source_type,
      source_id: chunk.source_id,
      metadata: chunk.metadata,
    }));

    const { error } = await supabase.from("document_embeddings").insert(rows);
    if (error) {
      return NextResponse.json({ error: error.message, embedded }, { status: 500 });
    }
    embedded += batch.length;
  }

  return NextResponse.json({
    success: true,
    total_chunks: chunks.length,
    embedded,
    breakdown: {
      destinations: chunks.filter((c) => c.source_type === "destination").length,
      pois: chunks.filter((c) => c.source_type === "poi").length,
      articles: chunks.filter((c) => c.source_type === "article").length,
      stays: chunks.filter((c) => c.source_type === "stay").length,
      states: chunks.filter((c) => c.source_type === "state").length,
      regions: chunks.filter((c) => c.source_type === "region").length,
    },
  });
}

function chunkText(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    let end = start + maxLen;
    // Try to break at sentence boundary
    if (end < text.length) {
      const lastPeriod = text.lastIndexOf(". ", end);
      if (lastPeriod > start + maxLen / 2) end = lastPeriod + 2;
    }
    chunks.push(text.slice(start, end).trim());
    start = end;
  }
  return chunks;
}
