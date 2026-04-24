import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { AuthorByline, personJsonLd, type AuthorRecord } from "@/components/author-byline";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Team — NakshIQ",
    description:
      "The people behind NakshIQ. Named editors and contributors who stand behind every destination score, every itinerary, every honest skip verdict on the site.",
    ...localeAlternates(locale, "/about/team"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

async function getTeam(): Promise<AuthorRecord[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("authors")
    .select("*")
    .order("role")
    .order("created_at");
  return (data ?? []) as AuthorRecord[];
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const team = await getTeam();
  const pageUrl = `${BASE_URL}/${locale}/about/team`;

  const editors = team.filter((a) => a.role === "editor");
  const family = team.filter((a) => a.role === "family");
  const contributors = team.filter((a) => a.role === "contributor");
  const experts = team.filter((a) => a.role === "expert");

  const aboutPageLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: "Team — NakshIQ",
    description: "Named editors and contributors behind NakshIQ's India travel intelligence.",
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${BASE_URL}#website` },
    mainEntity: team.map((a) => personJsonLd(a)),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/${locale}/about` },
      { "@type": "ListItem", position: 3, name: "Team", item: pageUrl },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}/about`} className="hover:text-foreground">About</Link>
          {" → "}
          <span className="text-foreground">Team</span>
        </div>

        <h1 className="text-4xl font-semibold mb-3">Team</h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Named editors and contributors behind every page on NakshIQ. Each byline is the person
          who stands behind the recommendation — not a shared account, not an AI pseudonym.
        </p>

        {editors.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Editorial</h2>
            <div className="space-y-4">
              {editors.map((a) => (
                <div key={a.slug} id={a.slug}>
                  <AuthorByline author={a} locale={locale} variant="full" />
                </div>
              ))}
            </div>
          </section>
        )}

        {family.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Family perspective</h2>
            <div className="space-y-4">
              {family.map((a) => (
                <div key={a.slug} id={a.slug}>
                  <AuthorByline author={a} locale={locale} variant="full" />
                </div>
              ))}
            </div>
          </section>
        )}

        {contributors.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Contributors</h2>
            <div className="space-y-4">
              {contributors.map((a) => (
                <div key={a.slug} id={a.slug}>
                  <AuthorByline author={a} locale={locale} variant="full" />
                </div>
              ))}
            </div>
          </section>
        )}

        {experts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Expert contributors</h2>
            <div className="space-y-4">
              {experts.map((a) => (
                <div key={a.slug} id={a.slug}>
                  <AuthorByline author={a} locale={locale} variant="full" />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-border bg-card/40 p-6 mt-8">
          <h2 className="text-lg font-semibold mb-2">The byline rule</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            NakshIQ doesn't publish anonymous scoring. Every destination page, every skip verdict, every
            "don't travel with kids under 10 to this altitude" claim traces back to a named editor who
            put their name behind it. If you disagree with a call we've made, the{" "}
            <Link href={`/${locale}/contact`} className="underline hover:text-primary">editor's email</Link>{" "}
            is public. Corrections run in the open — read our{" "}
            <Link href={`/${locale}/editorial-policy`} className="underline hover:text-primary">editorial policy</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
