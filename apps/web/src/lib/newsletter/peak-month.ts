import { createClient } from "@supabase/supabase-js";

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export type PeakMonth = {
  monthNum: number;   // 1-12
  monthName: string;  // "May"
  score: number;      // 0-5 (or 0-100 if your scoring is 0-100; see note below)
};

/**
 * Returns the highest-scored month for a destination. Ties broken by lowest
 * month_num (so an Aug/Sep tie picks Aug). Returns null if max score is below
 * the alert threshold (4) — we won't promise "we'll tell you when it's worth
 * it" for destinations where no month is genuinely worth it.
 *
 * Note on score scale: destination_months.score is 1-5 in current data
 * (per CLAUDE.md sprint history + 2026-05-17 inspect output). If the scoring
 * ever changes scale, adjust MIN_ALERT_SCORE accordingly.
 */
const MIN_ALERT_SCORE = 4;

export async function getPeakMonth(destinationId: string): Promise<PeakMonth | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("destination_months")
    .select("month, score")
    .eq("destination_id", destinationId)
    .order("score", { ascending: false })
    .order("month", { ascending: true })
    .limit(1);

  if (error || !data || data.length === 0) return null;

  const top = data[0] as { month: number; score: number };
  if (top.score < MIN_ALERT_SCORE) return null;

  return {
    monthNum: top.month,
    monthName: MONTH_NAMES[top.month] ?? "",
    score: top.score,
  };
}
