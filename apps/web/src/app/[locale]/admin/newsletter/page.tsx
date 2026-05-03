import { createClient } from "@supabase/supabase-js";
import { AdminNewsletter } from "./admin-newsletter";

export const dynamic = "force-dynamic";
export const metadata = { robots: "noindex, nofollow" };

async function getSubscriberStats(): Promise<{
  confirmed: number;
  pending: number;
  unsubscribed: number;
  refreshedAt: string;
} | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  const supabase = createClient(url, serviceKey);

  // Three counts in parallel; head:true keeps each O(1).
  const [confirmed, pending, unsubscribed] = await Promise.all([
    supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .not("confirmed_at", "is", null)
      .is("unsubscribed_at", null),
    supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .is("confirmed_at", null)
      .is("unsubscribed_at", null),
    supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .not("unsubscribed_at", "is", null),
  ]);

  return {
    confirmed: confirmed.count ?? 0,
    pending: pending.count ?? 0,
    unsubscribed: unsubscribed.count ?? 0,
    refreshedAt: new Date().toISOString(),
  };
}

export default async function AdminNewsletterPage() {
  const stats = await getSubscriberStats();
  return <AdminNewsletter subscriberStats={stats} />;
}
