import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const BATCH_SIZE = 20;
const VALID_SLOTS = new Set(["experience", "value", "location", "xfactor"]);

/**
 * Nightly refresher for destination_stay_picks. Picks 20 destinations with
 * stalest refreshed_at, calls Claude Haiku, upserts rows. Auth via
 * CRON_SECRET (Vercel cron sends this as Bearer in Authorization header).
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }
  if (header !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) return NextResponse.json({ error: "Anthropic not configured" }, { status: 503 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const supabase = createClient(url, serviceKey);

  // Pick stalest 20 destinations
  const { data: allDests } = await supabase
    .from("destinations")
    .select("id, name, state:states(name)");
  const { data: existingPicks } = await supabase
    .from("destination_stay_picks")
    .select("destination_id, refreshed_at");
  const refreshMap = new Map<string, number>();
  for (const p of existingPicks ?? []) {
    const t = new Date(p.refreshed_at).getTime();
    const cur = refreshMap.get(p.destination_id);
    if (cur == null || cur > t) refreshMap.set(p.destination_id, t);
  }
  const candidates = (allDests ?? [])
    .sort((a: any, b: any) => {
      const ta = refreshMap.has(a.id) ? refreshMap.get(a.id)! : 0;
      const tb = refreshMap.has(b.id) ? refreshMap.get(b.id)! : 0;
      return ta - tb;
    })
    .slice(0, BATCH_SIZE);

  let ok = 0, fail = 0, pending = 0;

  for (const dest of candidates) {
    const stateName = Array.isArray((dest as any).state)
      ? (dest as any).state[0]?.name
      : (dest as any).state?.name;
    try {
      const result = await callClaude(anthropicKey, buildPrompt((dest as any).name, stateName));
      const picks = Array.isArray(result?.picks) ? result.picks : [];
      const rows = picks
        .filter((p: any) => VALID_SLOTS.has(p.slot) && typeof p.name === "string" && p.name.length > 0)
        .map((p: any) => ({
          destination_id: (dest as any).id,
          slot: p.slot,
          name: String(p.name).slice(0, 200),
          property_type: p.propertyType ? String(p.propertyType).slice(0, 60) : null,
          price_band: p.priceBand ? String(p.priceBand).slice(0, 40) : null,
          why_nakshiq: String(p.whyNakshiq || "").slice(0, 400),
          source: "web_search",
          source_ref: null,
          confidence: Math.max(0, Math.min(1, Number(p.confidence) || 0.5)),
          published: (Number(p.confidence) || 0.5) >= 0.6,
          refreshed_at: new Date().toISOString(),
        }));
      if (rows.length === 0) { fail++; continue; }
      const { error } = await supabase
        .from("destination_stay_picks")
        .upsert(rows, { onConflict: "destination_id,slot" });
      if (error) { fail++; continue; }
      ok++;
      if (rows.some((r: any) => !r.published)) pending++;
      await new Promise((r) => setTimeout(r, 250));
    } catch {
      fail++;
    }
  }

  await supabase.from("ops_reports").insert({
    job: "refresh-stay-picks",
    summary: { ok, fail, pending, total: candidates.length, batch_size: BATCH_SIZE },
    alerts_count: fail,
  });

  return NextResponse.json({ ok, fail, pending, total: candidates.length });
}

function buildPrompt(destName: string, stateName?: string): string {
  return `You are NakshIQ's stay-picker. Propose 4 STAY OPTIONS for travellers coming to ${destName} (${stateName || "India"}), one per slot:

  1. EXPERIENCE pick — the iconic / signature / splurge-when-warranted choice. If this destination has a famous property (e.g., Taj Udaipur, Rambagh Palace, Oberoi Amarvilas), name it. If not, name the best property that defines the destination.
  2. VALUE pick — best experience-per-rupee. Homestays, heritage guesthouses, well-rated mid-tier.
  3. LOCATION pick — the stay whose location wins (walkable to main sights, near the railway, on the best beach).
  4. X-FACTOR pick — the specific, weird, memorable one. Treehouses, farmstays, houseboats, something travellers write home about.

VOICE RULES (mandatory):
- First-person plural ("We recommend")
- NEVER use: hidden gem, breathtaking, must-visit, bucket list, curated, elevated, paradise, pristine, magical, stunning
- Be specific. Named properties. Price honest.

For each slot return ALL of:
  name (the property name)
  propertyType
  priceBand (honest rupee band)
  whyNakshiq (one specific sentence)
  confidence (0–1; <0.6 if guessing or too obscure)

If a slot genuinely has no real answer, set confidence to 0. We'll hide low-confidence slots.

Return ONLY valid JSON:
{
  "picks": [
    { "slot": "experience", "name": "...", "propertyType": "...", "priceBand": "...", "whyNakshiq": "...", "confidence": 0.9 },
    { "slot": "value", ... },
    { "slot": "location", ... },
    { "slot": "xfactor", ... }
  ]
}`;
}

async function callClaude(apiKey: string, prompt: string): Promise<any> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}`);
  const j = await res.json();
  const text = j.content?.[0]?.text ?? "";
  try { return JSON.parse(text); } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
    throw new Error("non-JSON");
  }
}
