import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

/**
 * Admin endpoint for reviewing/publishing stay picks. Auth-gated via the
 * same NEWSLETTER_SEND_SECRET pattern already in use for admin actions —
 * passed as a Bearer token in the Authorization header or `?key=` param.
 */
function isAuthed(req: NextRequest): boolean {
  const secret = process.env.NEWSLETTER_SEND_SECRET;
  if (!secret) return false;
  const header = req.headers.get("authorization") || "";
  if (header === `Bearer ${secret}`) return true;
  const url = new URL(req.url);
  if (url.searchParams.get("key") === secret) return true;
  return false;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || "unpublished";
  const filter = status === "all" ? {} : { published: status !== "unpublished" };

  let query = supabase
    .from("destination_stay_picks")
    .select(`
      destination_id, slot, name, property_type, price_band, why_nakshiq,
      source, confidence, refreshed_at, published,
      destination:destinations(name, state:states(name))
    `)
    .order("confidence", { ascending: true })
    .order("refreshed_at", { ascending: false })
    .limit(200);

  if ("published" in filter) query = query.eq("published", filter.published as boolean);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ picks: data ?? [] });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const body = await req.json().catch(() => ({}));
  const { destinationId, slot, action, patch } = body as {
    destinationId: string;
    slot: string;
    action: "publish" | "reject" | "edit";
    patch?: Record<string, unknown>;
  };
  if (!destinationId || !slot || !action) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  if (action === "publish") {
    const { error } = await supabase
      .from("destination_stay_picks")
      .update({ published: true })
      .eq("destination_id", destinationId)
      .eq("slot", slot);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (action === "reject") {
    const { error } = await supabase
      .from("destination_stay_picks")
      .delete()
      .eq("destination_id", destinationId)
      .eq("slot", slot);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (action === "edit" && patch) {
    const allowed = ["name", "property_type", "price_band", "why_nakshiq", "confidence", "published"];
    const update: Record<string, unknown> = {};
    for (const k of allowed) if (k in patch) update[k] = (patch as any)[k];
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "no valid fields in patch" }, { status: 400 });
    }
    const { error } = await supabase
      .from("destination_stay_picks")
      .update(update)
      .eq("destination_id", destinationId)
      .eq("slot", slot);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
