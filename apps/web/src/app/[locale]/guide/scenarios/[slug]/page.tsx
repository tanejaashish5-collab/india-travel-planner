import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 3600;
export const dynamicParams = true;

const CATEGORY_LABEL: Record<string, string> = {
  pass_closure: "Pass Closure",
  health:       "Health",
  network:      "Network & Offline",
  logistics:    "Logistics",
  safety:       "Safety",
  money:        "Money",
  weather:      "Weather",
};

const CATEGORY_TONE: Record<string, string> = {
  pass_closure: "border-amber-500/30 bg-amber-500/5 text-amber-200",
  health:       "border-red-500/30 bg-red-500/5 text-red-200",
  network:      "border-sky-500/30 bg-sky-500/5 text-sky-200",
  logistics:    "border-purple-500/30 bg-purple-500/5 text-purple-200",
  safety:       "border-orange-500/30 bg-orange-500/5 text-orange-200",
  money:        "border-emerald-500/30 bg-emerald-500/5 text-emerald-200",
  weather:      "border-indigo-500/30 bg-indigo-500/5 text-indigo-200",
};

async function getScenario(slug: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const supabase = createClient(url, key);
  const { data } = await supabase.from("scenarios").select("*").eq("slug", slug).single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const s = await getScenario(slug);
  if (!s) return {};
  return {
    title: `${s.title} — Scenario Playbook | NakshIQ`,
    description: `${s.if_clause} — ${s.then_clause}`.slice(0, 160),
    ...localeAlternates(locale, `/guide/scenarios/${slug}`),
  };
}

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const s = await getScenario(slug);
  if (!s) notFound();

  const tone = CATEGORY_TONE[s.category] ?? "border-border bg-background/40";
  const categoryLabel = CATEGORY_LABEL[s.category] ?? s.category;

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-muted-foreground">
          <a href={`/${locale}`} className="hover:text-foreground">NakshIQ</a>
          {" → "}
          <a href={`/${locale}/guide`} className="hover:text-foreground">Guides</a>
          {" → "}
          <span className="text-foreground">Scenarios</span>
        </div>

        {/* Meta strip */}
        <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <span className={`rounded-full border px-2 py-0.5 ${tone}`}>{categoryLabel}</span>
          <span className="rounded-full border border-border bg-background/40 px-2 py-0.5">
            {s.severity}
          </span>
          {s.reviewed_at && (
            <span>Reviewed {new Date(s.reviewed_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">{s.title}</h1>

        {/* If / Then announcement card */}
        <section className={`rounded-2xl border p-6 sm:p-8 mb-8 bg-gradient-to-br from-background/80 to-background/40 ${tone}`}>
          <div className="mb-4">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-60 mb-1">If</div>
            <p className="text-base sm:text-lg leading-relaxed">{s.if_clause}</p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-60 mb-1">Then</div>
            <p className="text-base sm:text-lg leading-relaxed font-medium">{s.then_clause}</p>
          </div>
        </section>

        {/* Protocol steps */}
        {Array.isArray(s.steps) && s.steps.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Step-by-step protocol</h2>
            <ol className="space-y-3">
              {s.steps.map((step: any, i: number) => (
                <li key={i} className="flex gap-4 rounded-xl border border-border bg-background/40 p-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center font-mono text-xs font-semibold">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    {typeof step === "string" ? (
                      <p className="text-sm leading-relaxed">{step}</p>
                    ) : (
                      <>
                        {step.title && <p className="font-semibold mb-1">{step.title}</p>}
                        {step.text && <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>}
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Companion links */}
        {Array.isArray(s.companion_links) && s.companion_links.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Read before you go</h2>
            <div className="grid gap-2">
              {s.companion_links.map((link: any, i: number) => (
                <a
                  key={i}
                  href={link.href ?? link.url}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm hover:border-primary/40 transition-colors"
                >
                  <span className="font-medium">{link.title ?? link.label}</span>
                  {link.description && (
                    <span className="ml-2 text-muted-foreground">— {link.description}</span>
                  )}
                  {link.external && <span className="ml-1 text-muted-foreground/60">↗</span>}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Applies-to section */}
        {(Array.isArray(s.applies_to_destinations) && s.applies_to_destinations.length > 0) && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Affected destinations</h2>
            <div className="flex flex-wrap gap-2">
              {s.applies_to_destinations.map((destId: string) => (
                <a
                  key={destId}
                  href={`/${locale}/destination/${destId}`}
                  className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors capitalize"
                >
                  {destId.replace(/-/g, " ")}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Footer: altitude / border matching context */}
        {(s.applies_to_altitude_min || s.applies_to_border) && (
          <aside className="mt-10 rounded-xl border border-border bg-background/30 p-4 text-xs text-muted-foreground">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-2">Matching rules</div>
            {s.applies_to_altitude_min && (
              <p className="mb-1">
                Triggers at {s.applies_to_altitude_min.toLocaleString()}m
                {s.applies_to_altitude_max ? ` – ${s.applies_to_altitude_max.toLocaleString()}m` : "+"} elevation
              </p>
            )}
            {s.applies_to_border && (
              <p>Surfaces on destinations near {s.applies_to_border.toUpperCase()} border</p>
            )}
          </aside>
        )}
      </main>
      <Footer />
    </div>
  );
}
