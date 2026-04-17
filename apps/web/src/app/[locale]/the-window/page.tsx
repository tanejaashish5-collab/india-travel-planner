import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterForm } from "../newsletter/newsletter-form";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "The Window — Past Issues | NakshIQ",
    description: "Every Sunday: the best-scored destination of the week, one honest skip, road intelligence, and what changed in our data.",
    ...localeAlternates(locale, "/the-window"),
  };
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function getIssues() {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("newsletter_issues")
    .select("slug, subject, preview_text, sent_at, issue_number, recipient_count")
    .not("sent_at", "is", null)
    .order("sent_at", { ascending: false })
    .limit(60);
  return data ?? [];
}

export default async function TheWindowArchive({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const issues = await getIssues();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">The Window</p>
          <h1 className="text-4xl font-bold">Every Sunday. Signal only.</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            One best-scored destination. One honest skip. One road update. Four minutes to read.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 mb-12">
          <NewsletterForm source="archive-page" />
        </div>

        {issues.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
            First issue lands this Sunday.
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Past issues
            </h2>
            {issues.map((issue: any) => (
              <Link
                key={issue.slug}
                href={`/${locale}/the-window/${issue.slug}`}
                className="group block rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-baseline gap-3 mb-1">
                  {issue.issue_number && (
                    <span className="text-xs font-mono text-muted-foreground">
                      #{String(issue.issue_number).padStart(3, "0")}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {new Date(issue.sent_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {issue.subject}
                </h3>
                {issue.preview_text && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{issue.preview_text}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
