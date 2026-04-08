import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Why We Built India Travel Planner",
  description: "We got tired of unreliable travel advice. So we built an encyclopedia with real data, honest scores, and no sponsored content. Here's our story.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">About</h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Why This Exists</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every year, millions of Indians plan a trip to the mountains and end up in the same 5 places:
              Manali, Shimla, Nainital, Mussoorie, Rishikesh. Not because those are the best places — but
              because they're the only ones people have enough information to feel confident visiting.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              30 kilometers from Manali's traffic jam sits Naggar — quieter, prettier, and almost empty.
              An hour past Shimla is Chail — world's highest cricket ground and zero crowds. But nobody
              goes there because nobody told them it existed, or that it was safe, or what month to visit,
              or whether their kids would be okay.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              <strong>We fix that.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">What We Do Differently</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-border p-4">
                <h3 className="font-semibold">Monthly Suitability Scores</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Every destination is scored 0-5 for every month of the year. Not "best time to visit: March-June"
                  — that's lazy. We tell you: March is 5/5 because spring flowers, clear views, 15-25°C. July is
                  1/5 because monsoon floods the approach road and leeches appear on every trail.
                </p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <h3 className="font-semibold">Kids & Family Intelligence</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Every destination has a kids rating that accounts for altitude, medical access, road safety,
                  phone signal, and infrastructure — not just "it's pretty so it must be family-friendly."
                  If there's no hospital within 4 hours, we tell you. If the altitude is risky for children, we explain why.
                </p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <h3 className="font-semibold">Honest Infrastructure Data</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  ATM availability. Phone signal carrier by carrier. Nearest hospital with travel time.
                  Fuel pump distance. Card acceptance. The practical reality that no other travel app tells you.
                </p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <h3 className="font-semibold">"Before You Decide" Alternatives</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  When you open a mainstream tourist destination, we show you what's nearby that you're missing.
                  Not to stop you going there — but so you know the options exist before you default to the same
                  place everyone else goes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">The Numbers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-border p-4 text-center">
                <div className="text-2xl font-mono font-bold text-primary">389+</div>
                <div className="text-xs text-muted-foreground mt-1">Places</div>
              </div>
              <div className="rounded-xl border border-border p-4 text-center">
                <div className="text-2xl font-mono font-bold text-primary">124</div>
                <div className="text-xs text-muted-foreground mt-1">Destinations</div>
              </div>
              <div className="rounded-xl border border-border p-4 text-center">
                <div className="text-2xl font-mono font-bold text-primary">49</div>
                <div className="text-xs text-muted-foreground mt-1">Treks</div>
              </div>
              <div className="rounded-xl border border-border p-4 text-center">
                <div className="text-2xl font-mono font-bold text-primary">19</div>
                <div className="text-xs text-muted-foreground mt-1">Routes</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">What's Coming</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> Mobile app with offline mode for zero-signal zones</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> SOS emergency system for remote travelers</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> GPS-linked route tracking</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> Family safety features with location sharing</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> AI-powered personalized itinerary generation</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> East, West, South, and Central India expansion</li>
            </ul>
          </section>

          <section className="rounded-xl border border-border p-6 text-center">
            <p className="text-muted-foreground">
              Built with obsessive detail for travelers who want to go beyond the tourist trail — with confidence.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Link href="/en/explore" className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Start exploring
              </Link>
              <Link href="/en/methodology" className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted">
                How we score
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
