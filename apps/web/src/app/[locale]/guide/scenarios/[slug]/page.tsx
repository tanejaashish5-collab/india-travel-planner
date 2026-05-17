import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";
import { CinematicGuide } from "@/components/cinematic-guide";
import {
  guideProse,
  guideProseBold,
  GuideSteps,
} from "@/components/cinematic-guide-helpers";

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

  const categoryLabel = CATEGORY_LABEL[s.category] ?? s.category;
  const scenarioUrl = `https://www.nakshiq.com/${locale}/guide/scenarios/${slug}`;
  const steps: Array<string | { title?: string; text?: string }> = Array.isArray(s.steps) ? s.steps : [];

  const howToLd = steps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${scenarioUrl}#howto`,
    name: s.title,
    description: `${s.if_clause} — ${s.then_clause}`,
    url: scenarioUrl,
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    publisher: { "@id": "https://www.nakshiq.com#organization" },
    ...(s.reviewed_at && { dateModified: s.reviewed_at }),
    step: steps.map((step, i) => {
      const name = typeof step === "string" ? `Step ${i + 1}` : (step.title ?? `Step ${i + 1}`);
      const text = typeof step === "string" ? step : (step.text ?? step.title ?? "");
      return {
        "@type": "HowToStep",
        position: i + 1,
        name,
        text,
      };
    }),
  } : null;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${scenarioUrl}#faq`,
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    mainEntity: [
      {
        "@type": "Question",
        name: `What should I do if ${String(s.if_clause).replace(/\.$/, "").toLowerCase()}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: String(s.then_clause),
        },
      },
      ...(s.applies_to_altitude_min ? [{
        "@type": "Question",
        name: `At what altitude does this scenario apply?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `This scenario triggers at ${Number(s.applies_to_altitude_min).toLocaleString()}m${s.applies_to_altitude_max ? ` to ${Number(s.applies_to_altitude_max).toLocaleString()}m` : " and above"} elevation.`,
        },
      }] : []),
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `https://www.nakshiq.com/${locale}/guide` },
      { "@type": "ListItem", position: 3, name: "Scenarios", item: `https://www.nakshiq.com/${locale}/guide/scenarios` },
      { "@type": "ListItem", position: 4, name: s.title, item: scenarioUrl },
    ],
  };

  const reviewedLabel = s.reviewed_at
    ? new Date(s.reviewed_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" }).toUpperCase()
    : null;

  const kicker = [
    "GUIDES · SCENARIOS",
    categoryLabel.toUpperCase(),
    String(s.severity ?? "").toUpperCase(),
    reviewedLabel ? `REVIEWED ${reviewedLabel}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const normalizedSteps = steps.map((step, i) => {
    if (typeof step === "string") {
      return { name: `Step ${i + 1}`, text: step };
    }
    return {
      name: step.title ?? `Step ${i + 1}`,
      text: step.text ?? "",
    };
  });

  const sections: Array<{ id: string; title: string; body: React.ReactNode }> = [
    {
      id: "if-then",
      title: "If this happens, do this",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <p
              className="nq-kicker"
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                marginBottom: 8,
              }}
            >
              If
            </p>
            <p style={{ ...guideProse, fontSize: 18, lineHeight: 1.55, color: "var(--bone)" }}>
              {s.if_clause}
            </p>
          </div>
          <div
            style={{
              paddingTop: 20,
              borderTop: "1px solid var(--hair)",
            }}
          >
            <p
              className="nq-kicker"
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                marginBottom: 8,
              }}
            >
              Then
            </p>
            <p
              style={{
                ...guideProseBold,
                fontSize: 18,
                lineHeight: 1.55,
              }}
            >
              {s.then_clause}
            </p>
          </div>
        </div>
      ),
    },
  ];

  if (normalizedSteps.length > 0) {
    sections.push({
      id: "protocol",
      title: "Step-by-step protocol",
      body: <GuideSteps steps={normalizedSteps} />,
    });
  }

  if (Array.isArray(s.companion_links) && s.companion_links.length > 0) {
    sections.push({
      id: "read-before",
      title: "Read before you go",
      body: (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {s.companion_links.map((link: { href?: string; url?: string; title?: string; label?: string; description?: string; external?: boolean }, i: number) => (
            <li
              key={i}
              style={{
                padding: "14px 0",
                borderTop: i === 0 ? "none" : "1px solid var(--hair)",
              }}
            >
              <a
                href={link.href ?? link.url}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "var(--bone)",
                }}
              >
                <p style={{ ...guideProseBold, marginBottom: 4 }}>
                  {link.title ?? link.label}
                  {link.external && (
                    <span style={{ marginLeft: 6, color: "var(--bone-faint)" }}>↗</span>
                  )}
                </p>
                {link.description && (
                  <p style={guideProse}>{link.description}</p>
                )}
              </a>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (Array.isArray(s.applies_to_destinations) && s.applies_to_destinations.length > 0) {
    sections.push({
      id: "affected",
      title: "Affected destinations",
      body: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {s.applies_to_destinations.map((destId: string) => (
            <a
              key={destId}
              href={`/${locale}/destination/${destId}`}
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "var(--bone-dim)",
                textDecoration: "none",
                border: "1px solid var(--hair)",
                padding: "6px 12px",
                textTransform: "capitalize",
                transition: "color 200ms ease, border-color 200ms ease",
              }}
            >
              {destId.replace(/-/g, " ")}
            </a>
          ))}
        </div>
      ),
    });
  }

  if (s.applies_to_altitude_min || s.applies_to_border) {
    sections.push({
      id: "matching-rules",
      title: "Matching rules",
      body: (
        <ul style={{ ...guideProse, paddingLeft: 24, margin: 0 }}>
          {s.applies_to_altitude_min && (
            <li style={{ marginBottom: 6 }}>
              Triggers at {Number(s.applies_to_altitude_min).toLocaleString()}m
              {s.applies_to_altitude_max
                ? ` – ${Number(s.applies_to_altitude_max).toLocaleString()}m`
                : "+"}{" "}
              elevation
            </li>
          )}
          {s.applies_to_border && (
            <li>Surfaces on destinations near {String(s.applies_to_border).toUpperCase()} border</li>
          )}
        </ul>
      ),
    });
  }

  return (
    <>
      {howToLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <CinematicGuide
        kicker={kicker}
        title={`${s.title}.`}
        dek={`${s.if_clause} ${s.then_clause}`}
        sections={sections}
        nextGuide={{
          href: `/${locale}/guide`,
          title: "Back to all guides.",
        }}
      />
    </>
  );
}
