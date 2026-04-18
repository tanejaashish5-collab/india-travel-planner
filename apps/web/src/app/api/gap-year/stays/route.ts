import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { pickStays } from "@/lib/gap-year/stays";

export const dynamic = "force-dynamic";

/**
 * Lightweight read endpoint — takes a list of destination ids, returns a
 * map of id → StayPick[]. Used by the timeline to lazy-load stay blocks
 * after the main plan renders.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const ids: string[] = Array.isArray(body?.ids)
    ? body.ids.filter((x: any) => typeof x === "string").slice(0, 50)
    : [];
  if (!ids.length) return NextResponse.json({ stays: {} });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const supabase = createClient(url, key);

  const out: Record<string, Awaited<ReturnType<typeof pickStays>>> = {};
  await Promise.all(
    ids.map(async (id) => {
      out[id] = await pickStays(supabase, id);
    })
  );

  return NextResponse.json({ stays: out });
}
