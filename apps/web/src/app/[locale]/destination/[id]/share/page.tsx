import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";
import { TripReportForm } from "@/components/trip-report-form";

export const revalidate = 3600;

async function getDest(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("id, name, state:states(name)")
    .eq("id", id)
    .single();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const dest = await getDest(id);
  if (!dest) return {};
  return {
    title: `Share your ${dest.name} trip — NakshIQ`,
    description: `Report back from your ${dest.name} trip. Your on-the-ground notes improve every future traveler's decision.`,
    ...localeAlternates(locale, `/destination/${id}/share`),
    robots: { index: false, follow: true }, // no-index the form page
  };
}

const BASE_URL = "https://www.nakshiq.com";

export default async function ShareTripReportPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const dest = await getDest(id);
  if (!dest) notFound();

  const stateName = Array.isArray(dest.state)
    ? (dest.state[0] as { name?: string } | undefined)?.name
    : (dest.state as { name?: string } | null)?.name;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: dest.name, item: `${BASE_URL}/${locale}/destination/${id}` },
      { "@type": "ListItem", position: 3, name: "Share your trip", item: `${BASE_URL}/${locale}/destination/${id}/share` },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}/destination/${id}`} className="hover:text-foreground">← Back to {dest.name}</Link>
        </div>

        <h1 className="text-4xl font-semibold mb-3">Share your {dest.name} trip</h1>
        <p className="text-lg text-muted-foreground mb-2 leading-relaxed">
          Your on-the-ground notes — what actually worked, what didn't, when you went — help every
          future traveler make a better call.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Reports are moderated. We'll publish with your first name (or anonymously if you prefer).
          Your email is never shown; we'll only use it if we have a follow-up question.
        </p>

        <TripReportForm
          destination_id={id}
          destination_name={dest.name}
          state_name={stateName ?? null}
          locale={locale}
        />

        <section className="mt-10 rounded-2xl border border-border bg-card/40 p-6 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-base font-semibold text-foreground mb-2">How this becomes part of the destination page</h2>
          <p>
            Once approved, your summary, month, rating, and body text land on the {dest.name} page
            under "Travelers report". Individual image uploads need to go via{" "}
            <Link href={`/${locale}/contact`} className="underline hover:text-primary">editor@nakshiq.com</Link>
            {" "}for now — direct photo upload comes in Sprint 13.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
