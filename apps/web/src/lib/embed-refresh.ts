import { createClient, SupabaseClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { formatScoreInline } from "@itp/shared";

const BATCH_SIZE = 50;
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

type Chunk = {
  content: string;
  source_type: string;
  source_id: string;
  metadata: Record<string, any>;
};

/** PostgREST caps a single .select() at 1000 rows. Every list read here MUST
 *  paginate — the pre-2026-06 version didn't, which silently dropped 661 of
 *  1,661 POIs (and most stays/eateries) from the RAG index. */
async function fetchAll<T = any>(
  supabase: SupabaseClient,
  table: string,
  select: string,
  orderCol: string,
  filter?: (q: any) => any
): Promise<T[]> {
  const all: T[] = [];
  for (let off = 0; ; off += 1000) {
    let q = supabase.from(table).select(select).order(orderCol).range(off, off + 999);
    if (filter) q = filter(q);
    const { data, error } = await q;
    if (error) throw new Error(`${table}: ${error.message}`);
    if (!data || data.length === 0) break;
    all.push(...(data as T[]));
    if (data.length < 1000) break;
  }
  return all;
}

function trunc(s: string | null | undefined, max = 500): string {
  if (!s) return "";
  return s.length <= max ? s : s.slice(0, max - 1).trimEnd() + "…";
}

function chunkText(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    let end = start + maxLen;
    if (end < text.length) {
      const lastPeriod = text.lastIndexOf(". ", end);
      if (lastPeriod > start + maxLen / 2) end = lastPeriod + 2;
    }
    chunks.push(text.slice(start, end).trim());
    start = end;
  }
  return chunks;
}

/** Rebuilds the document_embeddings table from the live DB.
 *
 *  Fail-safe swap: new rows are inserted tagged with a run_id FIRST; only
 *  after every insert succeeds are rows from previous runs deleted. A failed
 *  run therefore leaves the old index fully intact (the old version deleted
 *  first, so a mid-run failure served an empty index).
 */
export async function runEmbedRefresh() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const runId = crypto.randomUUID();

  const chunks: Chunk[] = [];

  // 1. Destinations + monthly scores + kids
  const dests = await fetchAll<any>(supabase, "destinations", "id, name, tagline, difficulty, elevation_m, tags, state_id", "id");
  const allMonths = await fetchAll<any>(supabase, "destination_months", "destination_id, month, score, note", "destination_id");
  const allKids = await fetchAll<any>(supabase, "kids_friendly", "destination_id, suitable, rating, min_recommended_age, best_age_group, family_verdict", "destination_id");

  const monthsByDest: Record<string, any[]> = {};
  for (const m of allMonths) (monthsByDest[m.destination_id] ??= []).push(m);
  const kidsByDest: Record<string, any> = {};
  for (const k of allKids) kidsByDest[k.destination_id] = k;

  for (const d of dests) {
    const months = (monthsByDest[d.id] ?? []).sort((a, b) => a.month - b.month);
    const scoreText = months
      .map((m) => `${MONTH_NAMES[m.month - 1]}: ${formatScoreInline(m.score)}${m.note ? ` (${m.note})` : ""}`)
      .join(", ");
    const kf = kidsByDest[d.id];
    const kidsText = kf
      ? `Kids: ${kf.suitable ? "suitable" : "not suitable"}${kf.rating ? `, rating ${formatScoreInline(kf.rating)}` : ""}${kf.min_recommended_age ? `, from age ${kf.min_recommended_age}` : ""}${kf.best_age_group ? ` (best for ${kf.best_age_group})` : ""}${kf.family_verdict ? `. ${kf.family_verdict}` : ""}`
      : "";
    chunks.push({
      content: `${d.name} — ${d.tagline || ""}. State: ${d.state_id}. Difficulty: ${d.difficulty}. Elevation: ${d.elevation_m || "N/A"}m. Tags: ${(d.tags ?? []).join(", ")}. Monthly scores: ${scoreText}. ${kidsText}`.trim(),
      source_type: "destination",
      source_id: d.id,
      metadata: { state: d.state_id, name: d.name, difficulty: d.difficulty },
    });
  }

  // 2. POIs
  const pois = await fetchAll<any>(supabase, "points_of_interest", "id, name, type, description, destination_id, time_needed, entry_fee, kids_suitable, tags", "id");
  for (const p of pois) {
    chunks.push({
      content: `${p.name} (${p.type}) in ${p.destination_id}. ${p.description || ""}. Time: ${p.time_needed || "N/A"}. Entry: ${p.entry_fee || "N/A"}. Kids: ${p.kids_suitable ? "yes" : "no"}. Tags: ${(p.tags ?? []).join(", ")}`.trim(),
      source_type: "poi",
      source_id: p.id,
      metadata: { destination: p.destination_id, type: p.type, name: p.name },
    });
  }

  // 3. Articles
  const articles = await fetchAll<any>(supabase, "articles", "slug, title, excerpt, content, tags, category", "slug");
  for (const a of articles) {
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
  const stays = await fetchAll<any>(supabase, "local_stays", "id, name, type, destination_id, price_range, why_special, best_for, tags", "id");
  for (const s of stays) {
    chunks.push({
      content: `${s.name} (${s.type}) stay in ${s.destination_id}. ${s.why_special || ""}. Price: ${s.price_range || "N/A"}. Best for: ${s.best_for || "N/A"}. Tags: ${(s.tags ?? []).join(", ")}`.trim(),
      source_type: "stay",
      source_id: s.id,
      metadata: { destination: s.destination_id, type: s.type, name: s.name },
    });
  }

  // 5. States
  const states = await fetchAll<any>(supabase, "states", "id, name, description, capital, region", "id");
  for (const s of states) {
    chunks.push({
      content: `${s.name} state. Capital: ${s.capital || "N/A"}. Region: ${s.region || ""}. ${s.description || ""}`.trim(),
      source_type: "state",
      source_id: s.id,
      metadata: { name: s.name, region: s.region },
    });
  }

  // 6. Regions
  const regions = await fetchAll<any>(supabase, "regions", "id, name, state_id, hero_tagline, description, tags, best_months", "id");
  for (const r of regions) {
    const bestMonths = (r.best_months ?? []).map((m: number) => MONTH_NAMES[m - 1]).join(", ");
    chunks.push({
      content: `${r.name} region (${r.state_id}). ${r.hero_tagline || ""}. ${r.description || ""}. Best months: ${bestMonths || "year-round"}. Tags: ${(r.tags ?? []).join(", ")}`.trim(),
      source_type: "region",
      source_id: r.id,
      metadata: { state: r.state_id, name: r.name },
    });
  }

  // 7. Eateries (active only)
  const eateries = await fetchAll<any>(
    supabase,
    "local_eateries",
    "id, destination_id, name, area, cuisine, category, signature_dish, must_try, price_range, price_per_head_inr, vegetarian, established_year, why_it_matters, insider_tip, is_legendary",
    "id",
    (q) => q.eq("is_active", true)
  );
  for (const e of eateries) {
    const price = e.price_per_head_inr ? `₹${e.price_per_head_inr}/head` : e.price_range || "N/A";
    chunks.push({
      content: `${e.name}${e.is_legendary ? " (legendary)" : ""} — ${e.cuisine || e.category || "eatery"} in ${e.area ? `${e.area}, ` : ""}${e.destination_id}${e.established_year ? `, since ${e.established_year}` : ""}. Signature: ${e.signature_dish || e.must_try || "N/A"}. ${trunc(e.why_it_matters, 300)} ${e.insider_tip ? `Tip: ${trunc(e.insider_tip, 200)}` : ""} Price: ${price}.${e.vegetarian ? " Vegetarian." : ""}`.trim(),
      source_type: "eatery",
      source_id: e.id,
      metadata: { destination: e.destination_id, name: e.name, legendary: !!e.is_legendary },
    });
  }

  // 8. Festivals
  const festivals = await fetchAll<any>(supabase, "festivals", "id, destination_id, name, month, approximate_date, description, significance", "id");
  for (const f of festivals) {
    const when = f.month ? `${MONTH_NAMES[f.month - 1]}${f.approximate_date ? ` (${f.approximate_date})` : ""}` : "dates vary by year";
    chunks.push({
      content: `${f.name} festival at ${f.destination_id}. When: ${when}. ${trunc(f.description, 400)} ${f.significance ? `Significance: ${trunc(f.significance, 300)}` : ""}`.trim(),
      source_type: "festival",
      source_id: String(f.id),
      metadata: { destination: f.destination_id, name: f.name, month: f.month },
    });
  }

  // 9. Safari booking guides (published only)
  const safaris = await fetchAll<any>(
    supabase,
    "park_safaris",
    "destination_id, park_full_name, booking_authority, official_booking_url, advance_booking_days, open_months, closed_months, best_months, safari_types, fees_note, pitfalls",
    "destination_id",
    (q) => q.eq("published", true)
  );
  for (const s of safaris) {
    const months = (arr: number[] | null) => (arr ?? []).map((m) => MONTH_NAMES[m - 1]).join(", ");
    chunks.push({
      content: `${s.park_full_name} safari booking (${s.destination_id}). Book via ${s.booking_authority || "official portal"}${s.official_booking_url ? ` at ${s.official_booking_url}` : ""}${s.advance_booking_days ? `, opens ${s.advance_booking_days} days ahead` : ""}. Best months: ${months(s.best_months) || "N/A"}. Closed: ${months(s.closed_months) || "check official site"}. Types: ${(s.safari_types ?? []).join(", ")}. ${trunc(s.fees_note, 200)}`.trim(),
      source_type: "safari",
      source_id: s.destination_id,
      metadata: { destination: s.destination_id, name: s.park_full_name },
    });
  }

  // 10. Pilgrimage routes (published only)
  const routes = await fetchAll<any>(
    supabase,
    "pilgrimage_routes",
    "slug, name, destination_id, kind, base_town, total_distance_km, parikrama_km, step_count, duration_days_min, duration_days_max, open_months, best_months, summary, crowd_note, cost_note",
    "slug",
    (q) => q.eq("published", true)
  );
  for (const r of routes) {
    const months = (arr: number[] | null) => (arr ?? []).map((m) => MONTH_NAMES[m - 1]).join(", ");
    const dist = r.total_distance_km ? `${r.total_distance_km} km` : r.parikrama_km ? `${r.parikrama_km} km parikrama` : r.step_count ? `${r.step_count} steps` : "";
    const days = r.duration_days_min ? `${r.duration_days_min}${r.duration_days_max && r.duration_days_max !== r.duration_days_min ? `-${r.duration_days_max}` : ""} days` : "";
    chunks.push({
      content: `${r.name} (${r.kind} pilgrimage, ${r.destination_id}). Base: ${r.base_town || "N/A"}. ${dist ? `Distance: ${dist}.` : ""} ${days ? `Duration: ${days}.` : ""} Open: ${months(r.open_months) || "N/A"}. Best: ${months(r.best_months) || "N/A"}. ${trunc(r.summary, 400)} ${r.crowd_note ? `Crowds: ${trunc(r.crowd_note, 200)}` : ""} ${r.cost_note ? `Cost: ${trunc(r.cost_note, 200)}` : ""}`.trim(),
      source_type: "pilgrimage",
      source_id: r.slug,
      metadata: { destination: r.destination_id, name: r.name, kind: r.kind },
    });
  }

  // Embed + insert in batches, tagged with this run's id.
  let embedded = 0;
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const embResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: batch.map((c) => c.content),
    });
    const rows = batch.map((chunk, idx) => ({
      content: chunk.content,
      embedding: JSON.stringify(embResponse.data[idx].embedding),
      source_type: chunk.source_type,
      source_id: chunk.source_id,
      metadata: { ...chunk.metadata, run_id: runId },
    }));
    const { error } = await supabase.from("document_embeddings").insert(rows);
    if (error) throw new Error(`insert failed after ${embedded} embeds: ${error.message}`);
    embedded += batch.length;
  }

  // All inserts succeeded — retire every row from previous runs. NOTE: a
  // plain .neq() would skip pre-run_id rows (missing key ->> NULL, and
  // NULL != x is not true in SQL), so match is-null explicitly.
  const { error: delError } = await supabase
    .from("document_embeddings")
    .delete()
    .or(`metadata->>run_id.is.null,metadata->>run_id.neq.${runId}`);
  if (delError) throw new Error(`old-row cleanup failed (new index IS live, duplicates remain): ${delError.message}`);

  const byType: Record<string, number> = {};
  for (const c of chunks) byType[c.source_type] = (byType[c.source_type] ?? 0) + 1;

  return { success: true, run_id: runId, total_chunks: chunks.length, embedded, breakdown: byType };
}
