import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { GapYearPublicView } from "@/components/gap-year-public-view";
import type { GapYearPlan } from "@/lib/gap-year/types";

export const revalidate = 0;
export const dynamicParams = true;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function fetchPlan(token: string): Promise<{ plan: GapYearPlan; title: string; createdAt: string } | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("gap_year_plans")
    .select("title, plan, created_at")
    .eq("share_token", token)
    .single();
  if (error || !data) return null;
  return { plan: data.plan as GapYearPlan, title: data.title, createdAt: data.created_at };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}): Promise<Metadata> {
  const { locale, token } = await params;
  const found = await fetchPlan(token);
  if (!found) return { title: "Plan not found | NakshIQ" };

  const { plan, title } = found;
  const totalDests = plan.months.reduce((s, m) => s + m.destinations.length, 0);
  const states = new Set(
    plan.months.flatMap((m) => m.destinations.map((p) => p.state).filter(Boolean))
  );
  const description = `${plan.input.durationMonths}-month India plan · ${totalDests} destinations · ${states.size} states · ${plan.input.persona === "family_kids" ? "family with kids" : "solo or couple"}.`;

  const canonicalUrl = `https://www.nakshiq.com/${locale}/gap-year/${token}`;

  return {
    title: `${title} | NakshIQ`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function GapYearShareViewPage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  const found = await fetchPlan(token);
  if (!found) notFound();

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <GapYearPublicView plan={found.plan} locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
