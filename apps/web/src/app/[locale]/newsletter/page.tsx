import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterForm } from "./newsletter-form";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "The Window — NakshIQ's Weekly Travel Intelligence",
  description:
    "Every Sunday: the best-scored destinations this week, one honest skip, one road you should know about, and what changed. No fluff. No sponsored picks. Just signal.",

    ...localeAlternates(locale, "/newsletter"),
  };
}export default function NewsletterPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-2xl px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            Weekly Newsletter
          </p>
          <h1 className="text-4xl font-bold">The Window</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Every Sunday morning: what changed, what scores shifted, and one
            destination you should know about this week.
          </p>
        </div>

        {/* What you get */}
        <div className="space-y-4 mb-12">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">
              This Week's Best Score
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              The destination that scores highest for the coming week — weather,
              crowds, and access all aligned. One clear recommendation.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">The Honest Skip</h3>
            <p className="text-sm text-muted-foreground mt-1">
              One destination trending on Instagram that you should avoid this
              week — with a real reason and a better alternative.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Road Intelligence</h3>
            <p className="text-sm text-muted-foreground mt-1">
              One road condition update that matters — a pass opening, a
              landslide closure, or a fuel stop you need to know about.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">What Changed</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Score changes, new destinations added, data corrections — total
              transparency on what we updated and why.
            </p>
          </div>
        </div>

        {/* Subscribe form */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Get The Window every Sunday</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Free. No spam. Unsubscribe anytime. We don't sell your email.
          </p>
          <NewsletterForm />
        </div>

        {/* Trust note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground/50">
            Written by the same family that builds NakshIQ. No affiliates in the
            newsletter. No sponsored recommendations. Just the week's
            intelligence, delivered honestly.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
