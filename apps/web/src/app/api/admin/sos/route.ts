import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

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

const EDITABLE_FIELDS = [
  "local_police_station",
  "police_address",
  "nearest_hospital",
  "nearest_hospital_km",
  "hospital_has_er",
  "nearest_pharmacy",
  "pharmacy_24hr",
  "mechanic_contact",
  "tow_service",
  "rescue_contact",
  "mountain_rescue",
  "nearest_guesthouse_emergency",
  "english_speaking_doctor",
  "source_url",
  "source_label",
] as const;

const SELECT_COLUMNS = [
  "destination_id",
  "verified",
  "verified_date",
  "last_verified_attempt_at",
  "source_url",
  "source_label",
  ...EDITABLE_FIELDS,
  "destinations:destination_id(name, state_id)",
].join(", ");

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || "stale";

  const { data, error } = await supabase
    .from("emergency_sos")
    .select(SELECT_COLUMNS)
    .order("verified_date", { ascending: true, nullsFirst: true })
    .limit(1000);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400_000).toISOString().slice(0, 10);
  const rows = (data ?? []).map((r: any) => ({
    ...r,
    state_id: r.destinations?.state_id ?? null,
    destination_name: r.destinations?.name ?? r.destination_id,
  }));

  const filtered = status === "all"
    ? rows
    : rows.filter((r: any) =>
        !r.verified ||
        !r.verified_date ||
        r.verified_date < thirtyDaysAgo ||
        !r.source_url
      );

  return NextResponse.json({ rows: filtered, total: rows.length });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const body = await req.json().catch(() => ({}));
  const { destinationId, action, patch } = body as {
    destinationId: string;
    action: "edit" | "verify";
    patch?: Record<string, unknown>;
  };
  if (!destinationId || !action) {
    return NextResponse.json({ error: "missing destinationId or action" }, { status: 400 });
  }

  if (action === "edit") {
    if (!patch) return NextResponse.json({ error: "patch required" }, { status: 400 });
    const update: Record<string, unknown> = {};
    for (const k of EDITABLE_FIELDS) {
      if (k in patch) {
        const v = (patch as any)[k];
        update[k] = v === "" ? null : v;
      }
    }
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "no valid fields in patch" }, { status: 400 });
    }
    update.last_verified_attempt_at = new Date().toISOString();
    const { error } = await supabase
      .from("emergency_sos")
      .update(update)
      .eq("destination_id", destinationId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (action === "verify") {
    const { data: existing, error: readErr } = await supabase
      .from("emergency_sos")
      .select("source_url")
      .eq("destination_id", destinationId)
      .single();
    if (readErr) return NextResponse.json({ error: readErr.message }, { status: 500 });
    const candidateSource = (patch as any)?.source_url ?? existing?.source_url;
    if (!candidateSource || String(candidateSource).trim() === "") {
      return NextResponse.json({ error: "source_url required to verify" }, { status: 400 });
    }

    const update: Record<string, unknown> = {
      verified: true,
      verified_date: new Date().toISOString().slice(0, 10),
      last_verified_attempt_at: new Date().toISOString(),
    };
    if (patch) {
      for (const k of EDITABLE_FIELDS) {
        if (k in patch) {
          const v = (patch as any)[k];
          update[k] = v === "" ? null : v;
        }
      }
    }
    const { error } = await supabase
      .from("emergency_sos")
      .update(update)
      .eq("destination_id", destinationId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
