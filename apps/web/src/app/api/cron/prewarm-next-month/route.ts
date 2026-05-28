import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { currentMonthIST } from "@itp/shared";
import { BEST_PERSONA_ORDER, buildMonthPersonaSlug } from "@/lib/best-pages";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
] as const;

const TOP_N_WARM = 50;
const CONCURRENCY = 8;
const COVERAGE_THRESHOLD = 0.95;
const BASE = "https://www.nakshiq.com";

function nextMonthIST(): { name: string; num: number } {
  const m = currentMonthIST();
  const next = (m % 12) + 1;
  return { name: MONTHS[next - 1], num: next };
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const supabase = createClient(url, serviceKey);

  const { name: month, num: monthNum } = nextMonthIST();
  const startedAt = Date.now();

  // 1) Sanity: how many destination_months rows exist for the upcoming month?
  // Pages render fine with partial coverage but fewer rows = fewer "best in
  // {month}" cards. We alert if coverage drops below 95% of total destinations.
  const [{ count: dmCount, error: dmErr }, { count: destCount }, { count: festCount }] = await Promise.all([
    supabase.from("destination_months").select("*", { count: "exact", head: true }).eq("month", monthNum),
    supabase.from("destinations").select("*", { count: "exact", head: true }),
    supabase.from("festivals").select("*", { count: "exact", head: true }).contains("months", [monthNum]),
  ]);
  if (dmErr) return NextResponse.json({ error: dmErr.message }, { status: 500 });

  const totalDests = destCount ?? 0;
  const dmRows = dmCount ?? 0;
  const coverage = totalDests > 0 ? dmRows / totalDests : 0;
  const sanity = {
    destinations_total: totalDests,
    destination_months_rows: dmRows,
    coverage_pct: Math.round(coverage * 100),
    festivals_in_month: festCount ?? 0,
    threshold_met: coverage >= COVERAGE_THRESHOLD,
  };

  // 2) Pull score-ranked destination IDs for that month
  const { data: ranked } = await supabase
    .from("destination_months")
    .select("destination_id, score")
    .eq("month", monthNum)
    .order("score", { ascending: false });
  const destIds: string[] = (ranked ?? []).map((r: any) => r.destination_id);

  // 3) Drop ISR cache for every month-keyed route + aggregator pages,
  // both locales. revalidatePath is in-process and millisecond-fast — no
  // need to fan out HTTP calls. Keep this list in sync with the
  // [month] / [monthSlug] route folders under apps/web/src/app/[locale]/.
  const locales = ["en", "hi"] as const;
  let revalidated = 0;
  const revalidateErrors: string[] = [];

  // Per-destination month pages (the bulk — ~982 paths)
  for (const slug of destIds) {
    for (const loc of locales) {
      try {
        revalidatePath(`/${loc}/destination/${slug}/${month}`);
        revalidated++;
      } catch (e: any) {
        if (revalidateErrors.length < 5) revalidateErrors.push(`${slug}/${loc}: ${e?.message}`);
      }
    }
  }

  // Region × month
  const { data: regions } = await supabase.from("regions").select("id");
  for (const r of regions ?? []) {
    for (const loc of locales) {
      try { revalidatePath(`/${loc}/region/${r.id}/${month}`); revalidated++; } catch {}
    }
  }

  // State × month — explore + treks + festivals
  const { data: states } = await supabase.from("states").select("id");
  for (const s of states ?? []) {
    for (const loc of locales) {
      try { revalidatePath(`/${loc}/explore/state/${s.id}/${month}`); revalidated++; } catch {}
      try { revalidatePath(`/${loc}/treks/state/${s.id}/${month}`); revalidated++; } catch {}
      try { revalidatePath(`/${loc}/festivals/state/${s.id}/${month}`); revalidated++; } catch {}
    }
  }

  // Aggregator pages (root list views, hubs that use currentMonthIST)
  for (const loc of locales) {
    try { revalidatePath(`/${loc}/where-to-go/${month}`); revalidated++; } catch {}
    try { revalidatePath(`/${loc}/festivals/month/${month}`); revalidated++; } catch {}
    try { revalidatePath(`/${loc}`); revalidated++; } catch {}
    try { revalidatePath(`/${loc}/guide`); revalidated++; } catch {}
    try { revalidatePath(`/${loc}/where-to-go`); revalidated++; } catch {}
    try { revalidatePath(`/${loc}/states`); revalidated++; } catch {}
    // /luxury hub picks Features by current IST month (pickMonthFeatures
    // in apps/web/src/app/[locale]/luxury/page.tsx) — flush so the new
    // month's picks surface immediately on rollover, not after ISR's 1h TTL.
    try { revalidatePath(`/${loc}/luxury`); revalidated++; } catch {}
  }

  // /best/[month]-with-[persona]-in-india — Move C surface. 5 personas × 2 locales = 10 paths/month.
  for (const persona of BEST_PERSONA_ORDER) {
    const slug = buildMonthPersonaSlug(month as Parameters<typeof buildMonthPersonaSlug>[0], persona);
    for (const loc of locales) {
      try { revalidatePath(`/${loc}/best/${slug}`); revalidated++; } catch {}
    }
  }

  // 4) Actually warm top-N highest-traffic destination pages so the first
  // Googlebot / human visit on the 1st serves cached HTML, not a cold ISR
  // build. Top-50 covers the GSC-leading pages comfortably inside maxDuration.
  const topUrls = (ranked ?? []).slice(0, TOP_N_WARM).flatMap((r: any) =>
    locales.map((loc) => `${BASE}/${loc}/destination/${r.destination_id}/${month}`),
  );
  let warmOk = 0;
  let warmFail = 0;
  for (let i = 0; i < topUrls.length; i += CONCURRENCY) {
    const batch = topUrls.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map(async (u) => {
        try {
          const res = await fetch(u, {
            headers: { "user-agent": "NakshIQ-PrewarmCron/1" },
            redirect: "follow",
          });
          return res.ok;
        } catch {
          return false;
        }
      }),
    );
    warmOk += results.filter(Boolean).length;
    warmFail += results.filter((r) => !r).length;
  }

  const elapsedSec = Math.round((Date.now() - startedAt) / 1000);

  const summary = {
    month,
    month_num: monthNum,
    sanity,
    revalidated_paths: revalidated,
    revalidate_errors_sample: revalidateErrors,
    warmed_top_n: TOP_N_WARM,
    warmed_ok: warmOk,
    warmed_fail: warmFail,
    elapsed_sec: elapsedSec,
  };

  await supabase.from("ops_reports").insert({
    job: "prewarm-next-month",
    summary,
    alerts_count: sanity.threshold_met ? 0 : 1,
    ok: sanity.threshold_met,
  });

  return NextResponse.json({ ok: true, summary });
}
