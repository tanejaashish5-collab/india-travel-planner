import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Why we say no data",
    description:
      "When you see a dash instead of a phone number, a price, or a contact, it means we couldn't verify one. We won't fabricate it. Here's why honest gaps beat plausible fiction.",
    ...localeAlternates(locale, "/why-we-say-no-data"),
  };
}

export default function WhyWeSayNoDataPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-semibold mb-2">Why we say no data</h1>
        <p className="text-sm text-muted-foreground mb-8">
          When a field is blank, that's the signal. Not a bug.
        </p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">The rule</h2>
            <p className="text-muted-foreground leading-relaxed">
              If we can't verify a phone number, a price, an opening date, or a
              contact against a real source, we leave it blank. We don't fill
              the gap with a plausible-looking number. We don't average across
              listicles. We don't paste a hotel chain's national hotline as a
              local helper.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              The dash on the screen is a hard-won admission. Roughly one in
              three numbers we research turns out to be wrong, dead, or moved.
              The temptation to ship the wrong one instead of nothing is real.
              We don't.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              What a blank field actually means
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  We couldn't find the number on a primary source (district
                  administration page, state tourism portal, government
                  listing, or operator's own site).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  The number existed once, but every cross-check found it
                  out of service or pointing to the wrong place.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  The number we did find belonged to a different town in a
                  different state. We caught it and refused to use it.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">—</span>
                <span>
                  The place exists, but the data on it is too thin to commit
                  to. We'd rather leave room than overclaim.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Why this is the harder choice
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every comparable site fills the gap. A travel listicle never
              shows a blank. A booking aggregator never tells you the helper
              line they listed is dead. The reason is that completeness reads
              as authority, and a dash reads as failure.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We don't think a fabricated phone number is authority. We think
              it's the thing that gets a stranded family the wrong helpline at
              two in the morning. The dash is honest. The plausible number is
              not.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              What you can do with a blank field
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Treat it as a flag. If a destination's emergency helper is
              blank, plan to carry a state-level helpline instead (we always
              surface those when they're verified). If an opening date is
              blank for a high-altitude stretch, assume the road regime
              hasn't been confirmed for the year yet and ask locally before
              you commit.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Blanks tell you where to apply scepticism. They don't tell you
              not to go.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              When a blank becomes a number
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Verified data lands on a rolling basis. Each state runs through
              an audit pass, and blanks get filled when a primary source
              actually surfaces one. We publish the audit history on the{" "}
              <Link
                href="/methodology"
                className="text-primary hover:underline"
              >
                methodology page
              </Link>
              , including how often each state has been re-checked and what
              we caught the last time we did it.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              If you have a verified contact we should add, send it to{" "}
              <a
                href="mailto:hello@nakshiq.com"
                className="text-primary hover:underline"
              >
                hello@nakshiq.com
              </a>
              {" "}with a source link. We re-verify before publishing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              The short version
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Honest scarcity beats plausible fiction. Every time. A dash on
              this site is a load-bearing dash.
            </p>
          </section>

          <div className="pt-4 text-sm text-muted-foreground">
            See also:{" "}
            <Link href="/editorial-policy" className="underline underline-offset-2 hover:text-foreground">
              Editorial policy
            </Link>
            {" · "}
            <Link href="/methodology" className="underline underline-offset-2 hover:text-foreground">
              How we score
            </Link>
            {" · "}
            <Link href="/tourist-traps" className="underline underline-offset-2 hover:text-foreground">
              Tourist traps
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
