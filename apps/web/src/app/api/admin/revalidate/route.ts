import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

// On-demand ISR flush. Used after Supabase data inserts that don't trigger
// a Vercel rebuild, so pre-rendered pages (PRE_RENDER_IDS) pick up changes
// without waiting for the 24h revalidate window.
//
// Usage:
//   POST /api/admin/revalidate?path=/en/destination/delhi
//   POST /api/admin/revalidate?tag=app-stats
//   Authorization: Bearer $NEWSLETTER_SEND_SECRET
export async function POST(req: NextRequest) {
  const secret = process.env.NEWSLETTER_SEND_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "secret not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const path = req.nextUrl.searchParams.get("path");
  const tag = req.nextUrl.searchParams.get("tag");
  if (!path && !tag) {
    return NextResponse.json({ error: "path or tag query param required" }, { status: 400 });
  }
  if (path && !path.startsWith("/")) {
    return NextResponse.json({ error: "path must start with /" }, { status: 400 });
  }

  try {
    if (path) revalidatePath(path);
    if (tag) revalidateTag(tag, "max");
    return NextResponse.json({ ok: true, revalidated: { path, tag } });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "revalidate failed" }, { status: 500 });
  }
}
