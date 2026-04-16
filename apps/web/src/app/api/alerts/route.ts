import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const destId = req.nextUrl.searchParams.get("id");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json({ alerts: [] });

  const supabase = createClient(url, key);
  const alerts: any[] = [];

  // Check road reports for this destination
  if (destId) {
    const { data: roads } = await supabase
      .from("road_reports")
      .select("segment, status, report")
      .eq("destination_id", destId)
      .in("status", ["closed", "blocked", "risky"])
      .order("reported_at", { ascending: false })
      .limit(3);

    if (roads?.length) {
      roads.forEach((r) => {
        alerts.push({
          type: r.status === "closed" || r.status === "blocked" ? "danger" : "warning",
          title: `Road ${r.status}: ${r.segment}`,
          message: r.report,
          source: "road_report",
        });
      });
    }
  }

  // Check for seasonal alerts based on current month
  const currentMonth = new Date().getMonth() + 1;
  if (destId) {
    const { data: dest } = await supabase
      .from("destinations")
      .select("name, elevation_m, crowd_calendar, destination_months!inner(month, score)")
      .eq("id", destId)
      .single();

    if (dest) {
      // Low score warning
      const monthData = (dest as any).destination_months?.find((m: any) => m.month === currentMonth);
      if (monthData?.score <= 2) {
        alerts.push({
          type: "warning",
          title: `Low season for ${(dest as any).name}`,
          message: `This destination scores ${monthData.score}/5 in the current month. Consider visiting during a better-rated month.`,
          source: "seasonal",
        });
      }

      // Altitude warning
      if ((dest as any).elevation_m > 4000) {
        alerts.push({
          type: "info",
          title: "High altitude destination",
          message: `${(dest as any).elevation_m.toLocaleString()}m — acclimatize properly. Carry Diamox. Monitor SpO2.`,
          source: "altitude",
        });
      }
    }
  }

  return NextResponse.json({ alerts });
}
