import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CollectionsCinema } from "@/components/collections-cinema";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Collections — Themed Destination Lists",
    description:
      "Themed collections: best family destinations, frozen wonders, most dangerous roads, zero-signal zones, ancient monasteries, and more. Hand-picked from 700+ places.",
    ...localeAlternates(locale, "/collections"),
  };
}

async function getCollections() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase.from("collections").select("*").order("name");
  return data ?? [];
}

export default async function CollectionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const collections = await getCollections();
  const issueNum = getIssueNumber();

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />
      <main
        id="main-content"
        className="nq-grain nq-glow-bookend"
        style={{ padding: "140px 24px 96px", position: "relative" }}
      >
        {/* Masthead */}
        <header style={{ maxWidth: 1100, margin: "0 auto 80px", textAlign: "left" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 24,
              letterSpacing: "0.22em",
            }}
          >
            COLLECTIONS · ISSUE Nº {issueNum}
          </p>
          <h1
            className="nq-display nq-balance"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(48px, 8vw, 116px)",
              lineHeight: 0.96,
              letterSpacing: "-0.028em",
              margin: 0,
            }}
          >
            {collections.length} ways<br />
            to see India.
          </h1>
          <p
            className="nq-meta"
            style={{
              color: "var(--bone-dim)",
              marginTop: 32,
              maxWidth: 720,
              fontSize: 15,
              lineHeight: 1.6,
              letterSpacing: "0.04em",
              fontFamily: "var(--cinema-ui)",
            }}
          >
            Themed reading lists for the country, hand-picked from 700+ places.
            Pilgrim circuits, dangerous roads, frozen wonders, zero-signal
            zones, ancient monasteries — each list curated for one specific
            reason to travel.
          </p>
        </header>

        <CollectionsCinema collections={collections} locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
