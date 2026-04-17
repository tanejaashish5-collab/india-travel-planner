import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterForm } from "../../newsletter/newsletter-form";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;
export const dynamicParams = true;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function getIssue(slug: string) {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("newsletter_issues")
    .select("slug, subject, preview_text, html, sent_at, issue_number, recipient_count")
    .eq("slug", slug)
    .not("sent_at", "is", null)
    .maybeSingle();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const issue = await getIssue(slug);
  if (!issue) return { title: "Issue not found | The Window" };
  return {
    title: `${issue.subject} | The Window`,
    description: issue.preview_text ?? undefined,
    ...localeAlternates(locale, `/the-window/${slug}`),
  };
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const issue = await getIssue(slug);
  if (!issue) notFound();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Link href={`/${locale}/the-window`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          ← All issues
        </Link>

        <header className="mb-8">
          <div className="flex items-baseline gap-3 mb-2">
            {issue.issue_number && (
              <span className="text-xs font-mono text-muted-foreground">
                THE WINDOW · #{String(issue.issue_number).padStart(3, "0")}
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {new Date(issue.sent_at as string).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">{issue.subject}</h1>
          {issue.preview_text && (
            <p className="mt-3 text-lg text-muted-foreground">{issue.preview_text}</p>
          )}
        </header>

        {/* Render the stored email HTML inside an iframe for style isolation */}
        <div className="rounded-2xl overflow-hidden border border-border">
          <iframe
            srcDoc={issue.html as string}
            title={issue.subject as string}
            sandbox="allow-popups allow-popups-to-escape-sandbox"
            className="w-full block"
            style={{ height: "900px", border: "0", background: "#161614" }}
          />
        </div>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-lg font-bold text-center mb-2">Get this every Sunday</h2>
          <p className="text-sm text-muted-foreground text-center mb-5">
            No spam. Unsubscribe anytime. We don&apos;t sell your email.
          </p>
          <NewsletterForm source={`archive-${slug}`} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
