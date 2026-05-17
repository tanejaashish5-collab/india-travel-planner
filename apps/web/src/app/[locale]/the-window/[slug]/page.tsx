import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterForm } from "../../newsletter/newsletter-form";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

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

  const sentDate = new Date(issue.sent_at as string).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const issueNumLabel = issue.issue_number
    ? `THE WINDOW · #${String(issue.issue_number).padStart(3, "0")} · ${sentDate.toUpperCase()}`
    : `THE WINDOW · ${sentDate.toUpperCase()}`;

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />
      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 820, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            {issueNumLabel}
          </p>
          <h1
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(36px, 6vw, 72px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--bone)",
              textWrap: "balance",
            }}
          >
            {issue.subject}
          </h1>
          {issue.preview_text && (
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(17px, 1.8vw, 22px)",
                lineHeight: 1.4,
                color: "var(--bone-dim)",
                margin: "24px 0 0",
                maxWidth: 640,
              }}
            >
              {issue.preview_text}
            </p>
          )}
          <div style={{ marginTop: 20 }}>
            <Link
              href={`/${locale}/the-window`}
              className="nq-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "none",
              }}
            >
              ← All issues
            </Link>
          </div>
        </header>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {/* Render the stored email HTML inside an iframe for style isolation —
              the issue HTML carries its own typography from the email template
              so we don't try to restyle it inside cinema scope. */}
          <div
            style={{
              border: "1px solid var(--hair)",
              overflow: "hidden",
            }}
          >
            <iframe
              srcDoc={issue.html as string}
              title={issue.subject as string}
              sandbox="allow-popups allow-popups-to-escape-sandbox"
              className="w-full block"
              style={{ height: "900px", border: "0", background: "#161614" }}
            />
          </div>

          <section
            style={{
              marginTop: 48,
              padding: 32,
              border: "1px solid var(--vermillion)",
              background: "rgba(229, 86, 66, 0.04)",
              textAlign: "center",
            }}
          >
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 12,
                letterSpacing: "0.22em",
                fontSize: 10,
              }}
            >
              SUBSCRIBE
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 24,
                lineHeight: 1.25,
                color: "var(--bone)",
                margin: "0 0 8px",
              }}
            >
              Get this every Sunday.
            </p>
            <p
              className="nq-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--bone-faint)",
                margin: "0 0 20px",
              }}
            >
              No spam · unsubscribe anytime · we don&apos;t sell your email
            </p>
            <NewsletterForm source={`archive-${slug}`} />
          </section>
        </div>
      </main>
      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
