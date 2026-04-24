import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { MembershipForm } from "@/components/membership-form";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  return {
    title: isHindi
      ? "NakshIQ सदस्यता प्रतीक्षा सूची — ₹999/वर्ष"
      : "NakshIQ Membership waitlist — ₹999/year",
    description: isHindi
      ? "विज्ञापन रहित, प्रायोजन रहित। NakshIQ सदस्यता विशेष साप्ताहिक निबंध, पहले पहुँच, बिना-विज्ञापन पढ़ाई और परिवार-निर्मित संपादकीय को समर्थन देती है।"
      : "Ad-free, sponsor-free. Members get the weekly essay series early, offline-ready trip PDFs, exclusive Cost Index deep-dives, and direct editor Q&A. Join the waitlist — launch pricing ₹999/year.",
    ...localeAlternates(locale, "/membership"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

export default async function MembershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pageUrl = `${BASE_URL}/${locale}/membership`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Membership", item: pageUrl },
    ],
  };

  const offerLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "@id": `${pageUrl}#offer`,
    name: "NakshIQ Membership — waitlist",
    description: "Early-access waitlist for the ₹999/year NakshIQ Membership tier launching in 2026.",
    price: "999",
    priceCurrency: "INR",
    availability: "https://schema.org/PreOrder",
    url: pageUrl,
    seller: { "@id": `${BASE_URL}#organization` },
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground">NakshIQ</Link>
          {" → "}
          <span className="text-foreground">Membership</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-semibold mb-4">NakshIQ Membership</h1>
        <p className="text-lg text-muted-foreground mb-2 leading-relaxed">
          Ad-free, sponsor-free. Built by the editors who write the destinations,
          for the people who actually travel.
        </p>
        <p className="text-sm font-semibold text-foreground/90 mb-10">
          Launch pricing: ₹999 / year. Join the waitlist — no card, no commitment.
        </p>

        {/* What's included */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">What Members get</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-1.5">The Window — early + archive</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Weekly editorial essay in your inbox the Saturday before non-members see it on the site.
                Full archive always accessible, searchable.
              </p>
            </div>
            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-1.5">Offline trip PDFs</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Download your saved trips as a polished PDF with maps, emergency numbers,
                and week-by-week itinerary. Critical on Ladakh / Spiti where network drops.
              </p>
            </div>
            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-1.5">Cost Index deep-dives</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Members-only quarterly deep-dives — the story behind the numbers.
                Where prices are moving, which operators changed hands, what's still worth it.
              </p>
            </div>
            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-1.5">Editor Q&A</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Direct email access to the editorial team for specific trip questions.
                Reply within 2–5 working days.
              </p>
            </div>
            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-1.5">Member concierge rates</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When Sprint 16 launches the concierge tier, Members get discounted rates on
                human-reviewed itinerary-checking + DMC-vetted specialist introductions.
              </p>
            </div>
            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold mb-1.5">No ads, ever</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                NakshIQ doesn't run ads for non-members either. Membership is how we keep
                it that way — you're paying for the editorial independence to stay editorial.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="mb-10" id="join">
          <h2 className="text-2xl font-semibold mb-4">Join the waitlist</h2>
          <MembershipForm locale={locale} />
        </section>

        {/* Trust signals */}
        <section className="rounded-2xl border border-border bg-card/40 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">What we won't do</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 pl-5 list-disc">
            <li>We will never run ads on NakshIQ, for Members or non-Members.</li>
            <li>We will never accept payment to score a destination higher.</li>
            <li>We will never share your email with partners, DMCs, or affiliates.</li>
            <li>You can unsubscribe in one click — the link is at the bottom of every email.</li>
          </ul>
          <p className="text-xs text-muted-foreground/80 mt-4">
            Read the full <Link href={`/${locale}/editorial-policy`} className="underline hover:text-primary">editorial policy</Link>{" "}
            — including how we handle corrections and why there are no sponsored posts.
          </p>
        </section>

        {/* When launching */}
        <section className="text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">When does Membership launch?</strong>{" "}
            In 2026, once the Cost Index, NakshIQ 100, and the first newsletter cadence are running
            at scale. Waitlist signups get first access + locked-in launch pricing.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
