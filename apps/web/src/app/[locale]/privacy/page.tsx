import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Privacy Policy — NakshIQ",
  description:
    "How NakshIQ handles your data. Minimal collection, no data sales, no marketing spam, privacy-focused analytics.",

    ...localeAlternates(locale, "/privacy"),
  };
}export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: April 10, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">The Short Version</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect very little data. We don't sell any of it. We don't send
              you marketing emails unless you ask for them. We use
              privacy-focused analytics that don't track you across the web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">
              NakshIQ is operated by Impresa de Artiste Pty Ltd, registered in
              the Australian Capital Territory, Australia. For privacy matters,
              contact us at{" "}
              <a
                href="mailto:hello@nakshiq.com"
                className="text-primary hover:underline"
              >
                hello@nakshiq.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Data We Collect</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-border p-4">
                <h3 className="font-semibold">Email Address</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Only if you create an account. Used for authentication and
                  account recovery. Stored in Supabase (our database provider).
                </p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <h3 className="font-semibold">Authentication Session</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  If you sign in, Supabase maintains a session token to keep you
                  logged in. This is a functional requirement, not tracking.
                </p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <h3 className="font-semibold">Locale Preference</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your language preference (English or Hindi) is stored locally
                  via next-intl to serve you content in the right language.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Analytics</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use two Vercel-provided tools:
            </p>
            <ul className="space-y-2 text-muted-foreground mt-3">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  <strong>Vercel Analytics</strong> — Privacy-focused, cookieless
                  web analytics. No personal data collected. No cross-site
                  tracking. No advertising profiles.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  <strong>Vercel Speed Insights</strong> — Measures page load
                  performance to help us keep the site fast. No personal data
                  collected.
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We do not use Google Analytics. We do not run any advertising
              pixels or retargeting scripts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Affiliate Link Tracking
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When you click an affiliate link to Booking.com, Agoda, or other
              booking partners, those platforms set their own cookies and track
              your activity under their own privacy policies. We have no control
              over their tracking practices. We recommend reviewing their privacy
              policies before booking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              What We Do Not Do
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>We do not sell your data to third parties. Ever.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  We do not send marketing emails unless you explicitly opt in.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  We do not share your email address with booking partners or
                  advertisers.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  We do not build advertising profiles or track you across
                  websites.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Data Storage</h2>
            <p className="text-muted-foreground leading-relaxed">
              Account data is stored in Supabase (hosted infrastructure). We use
              standard security practices including encrypted connections and
              secure authentication flows. We retain your data only as long as
              your account exists. Delete your account and your data goes with
              it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can request access to, correction of, or deletion of your
              personal data at any time by emailing{" "}
              <a
                href="mailto:hello@nakshiq.com"
                className="text-primary hover:underline"
              >
                hello@nakshiq.com
              </a>
              . We respond to all requests within 30 days. If you are in the EU,
              UK, or Australia, you have additional rights under applicable data
              protection laws (GDPR, UK GDPR, Australian Privacy Act).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We update this policy when our practices change. Material changes
              will be reflected with a revised "last updated" date. We do not
              make retroactive changes that reduce your privacy protections
              without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Privacy questions:{" "}
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
