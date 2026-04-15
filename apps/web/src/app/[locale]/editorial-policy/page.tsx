import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy — NakshIQ",
  description:
    "No paid placements. No sponsored content. No tourism board deals. How NakshIQ scores destinations, identifies tourist traps, and keeps editorial independent from revenue.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Editorial Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: April 10, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">The Sacred Rule</h2>
            <p className="text-muted-foreground leading-relaxed">
              No paid placements. No sponsored content. No tourism board
              promotion packages. No destination pays for better visibility,
              higher scores, or preferential treatment on any page.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              This is not a policy we adopted because it sounds good. It is the
              reason NakshIQ exists. The moment we accept money to promote a
              destination, every score on this site becomes meaningless. So we
              don't. Ever.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">How Scores Work</h2>
            <p className="text-muted-foreground leading-relaxed">
              400+ destinations. Each one scored 1 to 5 for every month of the
              year. Scores are based on five factors: weather conditions, road
              access and connectivity, crowd levels, infrastructure quality, and
              safety considerations.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              A score of 5 means conditions are excellent across all factors for
              that month. A score of 1 means we actively recommend against
              visiting — dangerous roads, extreme weather, closed routes, or
              serious infrastructure gaps.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We do not average these factors into a single number and call it a
              day. A destination can have perfect weather but deadly roads. That
              shows in the data. See our{" "}
              <Link
                href="/methodology"
                className="text-primary hover:underline"
              >
                full methodology
              </Link>{" "}
              for scoring criteria, weights, and data sources.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              How We Identify Tourist Traps
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A tourist trap is not a bad place. It is an overcrowded,
              overpriced, or under-delivering place when a better alternative
              exists within a 2-hour drive.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We identify them through data: crowd levels relative to
              infrastructure capacity, pricing relative to comparable
              destinations, and quality of experience relative to alternatives in
              the same region and season. If a destination draws 10x the crowds
              of a nearby alternative with comparable scenery and better
              infrastructure — and the only reason is brand recognition — we flag
              it.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We are not trying to stop anyone from visiting popular places. We
              are trying to make sure you know what else exists before you
              default to the same destination everyone else picks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Affiliate Disclosure
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We earn a small commission if you book through our links — at no
              cost to you. This is how we fund the site. Affiliate links appear
              on destination pages and itinerary suggestions, linking to booking
              platforms such as Booking.com and Agoda.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Affiliate revenue never affects our scores or recommendations. Not
              partially. Not indirectly. Not through "editorial partnerships" or
              "preferred listings" or any other euphemism for paid influence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">The Chinese Wall</h2>
            <p className="text-muted-foreground leading-relaxed">
              Scoring and editorial content are independent of affiliate revenue.
              A destination that generates significant booking commissions and a
              destination that generates zero commissions are scored identically
              — same criteria, same weights, same data sources.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              A destination can score 1/5 for a given month and still have
              booking links on its page. The link is there because hotels exist
              there. The score is there because conditions are poor. These are
              independent facts and we treat them independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Data Sources</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  Monthly weather data — historical temperature, precipitation,
                  and seasonal patterns for each destination
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  Road condition reports — route accessibility, closure periods,
                  surface quality, and alternative access routes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  Infrastructure surveys — ATM availability, phone signal
                  coverage by carrier, fuel stations, medical facilities, card
                  acceptance
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  Kids safety assessments — altitude risk, medical access time,
                  road safety, terrain difficulty, phone connectivity
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  Local verification — ground-truthing data against local
                  knowledge and recent traveller reports
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              How Often We Update
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Scores are reviewed seasonally. Destination pages are updated when
              conditions change materially — a new road opens, infrastructure
              improves or degrades, safety conditions shift, or we receive
              verified reports that contradict our current data.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We do not update scores for the sake of appearing fresh. If
              nothing has changed, the data stays as it is.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              If We Get Something Wrong
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We will. Conditions change faster than any editorial team can
              track. If you find data that is outdated, incorrect, or misleading,
              email{" "}
              <a
                href="mailto:hello@nakshiq.com"
                className="text-primary hover:underline"
              >
                hello@nakshiq.com
              </a>{" "}
              with specifics. We verify and correct. No defensiveness, no delay.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
