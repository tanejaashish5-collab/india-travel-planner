import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Cookie Policy — NakshIQ",
  description:
    "NakshIQ uses minimal cookies. No advertising cookies, no third-party tracking. Only functional cookies for authentication and language preference.",

    ...localeAlternates(locale, "/cookies"),
  };
}export default function CookiesPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-semibold mb-2">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: April 10, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">The Short Version</h2>
            <p className="text-muted-foreground leading-relaxed">
              NakshIQ uses almost no cookies. The ones we do use are strictly
              functional — they keep you logged in and remember your language. We
              run zero advertising cookies, zero third-party tracking cookies,
              and zero retargeting pixels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Cookies We Use
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">Supabase Auth Session</h3>
                  <span className="text-xs rounded-full bg-muted px-2.5 py-0.5">
                    Functional
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  If you sign in, Supabase stores a session token to maintain
                  your authenticated state. Without this cookie, you would need
                  to log in on every page load. It is not used for tracking or
                  analytics.
                </p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">Locale Preference (next-intl)</h3>
                  <span className="text-xs rounded-full bg-muted px-2.5 py-0.5">
                    Functional
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Stores your language preference (English or Hindi) so we serve
                  content in the right language. This is a local preference
                  cookie — it stays on your device and is not sent to any third
                  party.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Cookies We Do Not Use
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  <strong>Advertising cookies</strong> — None. We do not run ads
                  and do not serve advertising cookies.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  <strong>Third-party tracking cookies</strong> — None. No
                  Google Analytics, no Facebook Pixel, no retargeting scripts.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">--</span>
                <span>
                  <strong>Social media cookies</strong> — None. We do not embed
                  social media widgets that set cookies.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Vercel Analytics Is Cookieless
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our analytics provider, Vercel Analytics, operates without cookies.
              It does not set any cookies on your device, does not use local
              storage for tracking, and does not collect personally identifiable
              information. The same applies to Vercel Speed Insights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Third-Party Booking Links
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When you click an affiliate link to a booking platform (such as
              Booking.com or Agoda), that platform may set its own cookies once
              you reach their site. Those cookies are governed by their privacy
              and cookie policies, not ours. We have no control over their
              behaviour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can clear or block cookies through your browser settings. Since
              we only use functional cookies, blocking them may prevent sign-in
              or language preference from working correctly. The rest of NakshIQ
              will function normally without cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about cookies:{" "}
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
