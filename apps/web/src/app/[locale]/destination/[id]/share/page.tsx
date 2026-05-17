import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";
import { TripReportForm } from "@/components/trip-report-form";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

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
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 820, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            {stateName ? `${stateName.toUpperCase()} · ` : ""}TRAVELER NOTES · REPORT BACK
          </p>
          <h1
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 7vw, 76px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Share your {dest.name} trip.
          </h1>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(18px, 2vw, 22px)",
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              marginTop: 24,
              maxWidth: 640,
            }}
          >
            Your on-the-ground notes — what actually worked, what didn&apos;t, when you went — help
            every future traveler make a better call.
          </p>
          <p
            className="nq-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--bone-faint)",
              marginTop: 16,
            }}
          >
            Moderated · published with first name (or anonymous) · email never shown
          </p>
          <div style={{ marginTop: 24 }}>
            <Link
              href={`/${locale}/destination/${id}`}
              className="nq-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "none",
              }}
            >
              ← Back to {dest.name}
            </Link>
          </div>
        </header>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <TripReportForm
            destination_id={id}
            destination_name={dest.name}
            state_name={stateName ?? null}
            locale={locale}
          />

          <section
            style={{
              marginTop: 40,
              padding: 24,
              border: "1px solid var(--hair)",
              background: "rgba(245, 241, 232, 0.03)",
            }}
          >
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 12,
                letterSpacing: "0.22em",
                fontSize: 10,
              }}
            >
              WHAT HAPPENS NEXT
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                lineHeight: 1.65,
                color: "var(--bone-dim)",
                margin: 0,
              }}
            >
              Once approved, your summary, month, rating, and body text land on the {dest.name} page
              under &ldquo;Travelers report&rdquo;. For now, send any photos to{" "}
              <Link
                href={`/${locale}/contact`}
                style={{ color: "var(--vermillion)", textDecoration: "underline" }}
              >
                editor@nakshiq.com
              </Link>{" "}
              — direct photo upload is coming soon.
            </p>
          </section>
        </div>
      </main>
      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
