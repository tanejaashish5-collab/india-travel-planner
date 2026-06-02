import type { SupabaseClient } from "@supabase/supabase-js";
import { getPeakMonth } from "./peak-month";

// Fan a savelist subscriber's saved_destination_ids into confirmed
// `destination_alerts` rows so the EXISTING send-destination-alerts cron
// delivers the peak-month heads-up the savelist welcome email promises.
//
// Until this helper existed, saved_destination_ids were written to
// newsletter_subscribers and never read by any sender — the welcome email's
// "we'll email you ~3 weeks before each one peaks" promise was unfulfilled.
//
// Consent + safety contract:
//   - ONLY call for an email that has confirmed its newsletter subscription
//     (double opt-in already satisfied) — rows are inserted `confirmed_at`-set
//     so the cron will send them. Never call for an unconfirmed sub.
//   - Skips destinations with no genuine peak month (getPeakMonth → null), so
//     we never promise an alert for a place where no month is worth it.
//   - Dedups against existing rows; never duplicates an active alert.
//   - Honors the same 10-active-alerts-per-email cap as the direct flow.
//   - Reactivates a previously unsubscribed row rather than inserting a clone.
//   - Best-effort: never throws — alert creation must not break confirm/subscribe.
//
// Returns the count of alert rows created/reactivated (for logging only).

const MAX_ACTIVE_ALERTS_PER_EMAIL = 10;

export async function syncSavedDestinationAlerts(
  supabase: SupabaseClient,
  email: string,
  savedIds: unknown,
  source = "savelist-derived",
): Promise<number> {
  try {
    const ids = Array.from(
      new Set(
        (Array.isArray(savedIds) ? savedIds : []).filter(
          (x): x is string => typeof x === "string" && x.length > 0 && x.length <= 80,
        ),
      ),
    );
    if (ids.length === 0) return 0;

    // All existing alerts for this email (active or not) — dedup + cap source.
    const { data: existingRows } = await supabase
      .from("destination_alerts")
      .select("id, destination_id, confirmed_at, unsubscribed_at")
      .eq("email", email);

    const existing = (existingRows ?? []) as Array<{
      id: string;
      destination_id: string;
      confirmed_at: string | null;
      unsubscribed_at: string | null;
    }>;
    const byDest = new Map(existing.map((r) => [r.destination_id, r]));
    let activeCount = existing.filter((r) => !r.unsubscribed_at).length;

    let created = 0;
    const nowIso = new Date().toISOString();

    for (const destId of ids) {
      if (activeCount >= MAX_ACTIVE_ALERTS_PER_EMAIL) break;

      const row = byDest.get(destId);
      // Already actively subscribed for this destination — leave it alone.
      if (row && !row.unsubscribed_at) continue;

      const peak = await getPeakMonth(destId);
      if (!peak) continue; // no genuinely-best month → don't promise an alert

      if (row) {
        // Reactivate a previously unsubscribed alert; confirm it (consent given).
        const { error } = await supabase
          .from("destination_alerts")
          .update({
            unsubscribed_at: null,
            confirmed_at: row.confirmed_at ?? nowIso,
            target_month_num: peak.monthNum,
            source,
          })
          .eq("id", row.id);
        if (!error) {
          created++;
          activeCount++;
        }
      } else {
        const { error } = await supabase.from("destination_alerts").insert({
          email,
          destination_id: destId,
          target_month_num: peak.monthNum,
          // Double opt-in already satisfied by the newsletter confirmation —
          // insert confirmed so the cron will pick it up. Each peak-alert email
          // still carries its own one-tap unsubscribe.
          confirmed_at: nowIso,
          source,
        });
        if (!error) {
          created++;
          activeCount++;
        }
      }
    }
    return created;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[sync-saved-alerts] error:", msg);
    return 0;
  }
}
