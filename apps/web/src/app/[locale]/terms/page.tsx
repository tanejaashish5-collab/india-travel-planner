import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Terms of Service — NakshIQ",
  description:
    "Terms of Service for NakshIQ, operated by Impresa de Artiste Pty Ltd. Covers editorial content, AI itineraries, affiliate links, and user responsibilities.",

    ...localeAlternates(locale, "/terms"),
  };
}export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-semibold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: April 10, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">
              NakshIQ is operated by Impresa de Artiste Pty Ltd, an Australian
              company registered in the Australian Capital Territory. When we say
              "we", "us", or "NakshIQ" in these terms, we mean Impresa de
              Artiste Pty Ltd.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Editorial Content, Not Professional Advice
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Everything on NakshIQ is editorial content. Our destination scores,
              monthly ratings, safety assessments, and infrastructure data are
              researched and published for informational purposes only. None of
              it constitutes professional travel advice, medical guidance, or
              safety certification.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Conditions on the ground change. Roads close. Weather shifts.
              Infrastructure degrades or improves. Always verify current
              conditions with local authorities before travelling, especially to
              remote destinations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">AI Itineraries</h2>
            <p className="text-muted-foreground leading-relaxed">
              NakshIQ offers AI-generated itinerary suggestions. These are
              generated based on our destination data, seasonal scores, and
              travel patterns. They are suggestions — not guarantees of
              availability, pricing, road conditions, or experience quality.
              Treat them as a starting point for your own planning, not a
              finished plan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              No Paid Placements. No Sponsored Content. Ever.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              No destination, hotel, tour operator, or tourism board pays for
              placement on NakshIQ. No entity pays to improve their score, their
              ranking, or their prominence on any page. This is non-negotiable
              and permanent. See our{" "}
              <Link
                href="/en/editorial-policy"
                className="text-primary hover:underline"
              >
                Editorial Policy
              </Link>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Affiliate Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Some pages contain affiliate links to booking platforms such as
              Booking.com and Agoda. If you book through these links, we earn a
              small commission at no additional cost to you. Affiliate
              relationships never affect our scores, rankings, or
              recommendations. A destination can score 1/5 and still carry
              booking links. See our{" "}
              <Link
                href="/en/editorial-policy"
                className="text-primary hover:underline"
              >
                Editorial Policy
              </Link>{" "}
              for our Chinese wall policy between editorial and revenue.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              User-Generated Content
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              NakshIQ may introduce user reviews and community contributions in
              the future. When that happens: you retain ownership of your
              content, but grant us a non-exclusive, royalty-free licence to
              display it on NakshIQ. We reserve the right to remove content that
              is fraudulent, abusive, defamatory, or violates applicable law. We
              do not tolerate fake reviews or paid review manipulation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Your Use of NakshIQ</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may use NakshIQ for personal, non-commercial travel planning.
              You may not scrape, reproduce, or redistribute our content,
              scores, or data at scale without written permission. Automated
              access (bots, scrapers, crawlers beyond standard search engine
              indexing) is prohibited without prior authorisation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by Australian law, NakshIQ and
              Impresa de Artiste Pty Ltd are not liable for any direct, indirect,
              incidental, consequential, or special damages arising from your use
              of this website or reliance on its content. This includes, without
              limitation, damages arising from travel decisions made based on our
              content, scores, AI-generated itineraries, or infrastructure data.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Nothing in these terms excludes or limits liability that cannot be
              excluded or limited under Australian Consumer Law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Changes to These Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these terms from time to time. Material changes will
              be noted with a revised "last updated" date. Continued use of
              NakshIQ after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by and construed in accordance with the
              laws of the Australian Capital Territory, Australia. Any disputes
              arising from these terms or your use of NakshIQ are subject to the
              exclusive jurisdiction of the courts of the Australian Capital
              Territory.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about these terms:{" "}
              <a
                href="mailto:hello@nakshiq.com"
                className="text-primary hover:underline"
              >
                hello@nakshiq.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
