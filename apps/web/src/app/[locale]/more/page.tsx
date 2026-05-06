import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "More — every NakshIQ tool, guide, and policy in one place",
    description:
      "Trip planning tools, destination comparisons, editorial policy, press, corrections, and the rest of NakshIQ — all linked from a single hub.",
    // GSC: 14 sessions / 0 engaged in 7d. People land here from "site map"-style
    // queries, see a wall of links, bounce. Hub page useful from internal nav
    // but not a search-landing target — stop competing with destination pages.
    robots: { index: false, follow: true },
    ...localeAlternates(locale, "/more"),
  };
}

type Row = { href: string; label: string; desc: string };
type Group = { title: string; rows: Row[] };

export default async function MorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: "nav" });
  const tf = await getTranslations({ locale, namespace: "footer" });

  const p = (path: string) => `/${locale}${path}`;

  const groups: Group[] = [
    {
      title: "Plan your trip",
      rows: [
        { href: p("/build-route"), label: tf("routeBuilder"), desc: "Sequence multiple destinations into one trip." },
        { href: p("/compare"), label: "Compare destinations", desc: "Side-by-side scores, costs, and difficulty." },
        { href: p("/cost-index"), label: "Cost Index", desc: "Real per-destination travel costs by season." },
        { href: p("/risk-quiz"), label: "Risk quiz", desc: "Quick self-assessment for your trip readiness." },
        { href: p("/weekend-from"), label: "Weekend from your city", desc: "Quick getaways from Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad." },
        { href: p("/arrival"), label: "Airport arrival guides", desc: "What to do in the first 4 hours at any major airport." },
        { href: p("/permits"), label: tn("permits"), desc: "Inner-line and protected-area permits, by destination." },
        { href: p("/road-conditions"), label: tf("roadStatus"), desc: "Pass closures and seasonal road status." },
      ],
    },
    {
      title: "Discover India",
      rows: [
        { href: p("/nakshiq-100"), label: "NakshIQ 100", desc: "The 100 best destination-months in India." },
        { href: p("/explore-by-persona"), label: "By persona", desc: "Filtered for solo, family, biker, photographer, and more." },
        { href: p("/india-vs"), label: "India vs the world", desc: "How India compares to Vietnam, Morocco, Peru, Egypt." },
        { href: p("/tourist-traps"), label: tn("touristTraps"), desc: "Overhyped places with honest alternatives — what we'd skip and what we'd do instead." },
        { href: p("/the-window"), label: "The Window", desc: "Our weekly newsletter, archived." },
        { href: p("/guide"), label: tn("guides"), desc: "Visa, food safety, etiquette, packing, transport." },
      ],
    },
    {
      title: "About NakshIQ",
      rows: [
        { href: p("/about"), label: tn("about"), desc: "Why this exists and who's building it." },
        { href: p("/methodology"), label: tf("howWeScore"), desc: "How we score every destination, every month." },
        { href: p("/editorial-policy"), label: tf("editorialPolicy"), desc: "Standards we hold every page to." },
        { href: p("/press"), label: "Press & research", desc: "Citation-ready datasets and media coverage." },
        { href: p("/newsletter"), label: "Newsletter", desc: "One honest spread, every Sunday." },
      ],
    },
    {
      title: "Help & legal",
      rows: [
        { href: p("/corrections"), label: "Corrections", desc: "Suggest an edit or report a mistake." },
        { href: p("/contact"), label: "Contact", desc: "Reach the editor directly." },
        { href: p("/sos"), label: tn("sos"), desc: "Emergency contacts and helplines, offline-ready." },
        { href: p("/terms"), label: tf("terms"), desc: "Terms of service." },
        { href: p("/privacy"), label: tf("privacy"), desc: "Privacy policy." },
        { href: p("/cookies"), label: tf("cookies"), desc: "Cookie policy." },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-semibold mb-2">More</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Every NakshIQ tool, guide, and policy in one place.
        </p>

        <div className="space-y-12">
          {groups.map((group) => (
            <section key={group.title}>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">
                {group.title}
              </h2>
              <div className="divide-y divide-border/40">
                {group.rows.map((row) => (
                  <Link
                    key={row.href}
                    href={row.href}
                    className="group flex items-baseline gap-4 py-3 hover:bg-muted/30 -mx-2 px-2 rounded-md transition-colors"
                  >
                    <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                      {row.label}
                    </span>
                    <span className="flex-1 text-sm text-muted-foreground/80 truncate">
                      {row.desc}
                    </span>
                    <span className="text-muted-foreground/40 group-hover:text-primary transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
