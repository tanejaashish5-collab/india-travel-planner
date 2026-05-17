import type { Metadata } from "next";

const BASE = "https://www.nakshiq.com";

/** Stable @id refs into the Organization + WebSite root JSON-LD declared in
 *  [apps/web/src/app/[locale]/layout.tsx]. Page-level schemas reference these
 *  via `isPartOf` / `publisher` so search engines build one knowledge graph. */
export const ORG_ID = `${BASE}#organization`;
export const WEBSITE_ID = `${BASE}#website`;

/**
 * Generate locale-aware canonical + hreflang alternates for any page.
 * Use in generateMetadata() for pages that need proper SEO.
 */
export function localeAlternates(locale: string, path: string): Pick<Metadata, "alternates"> {
  const p = path.startsWith("/") ? path : `/${path}`;
  return {
    alternates: {
      canonical: `${BASE}/${locale}${p}`,
      languages: {
        en: `${BASE}/en${p}`,
        hi: `${BASE}/hi${p}`,
        // x-default points search engines at the language-agnostic version
        // when the user's locale doesn't match en or hi. Convention is to
        // point this at the default (English) variant.
        "x-default": `${BASE}/en${p}`,
      },
    },
  };
}

type SchemaObject = Record<string, unknown>;

type BreadcrumbCrumb = { name: string; path: string };

/**
 * BreadcrumbList — Home always position 1. Pass remaining crumbs in order.
 *
 * @example
 *   breadcrumbSchema(locale, [
 *     { name: "Compare", path: "/vs" },
 *     { name: `${a} vs ${b}`, path: `/vs/${slug}` },
 *   ])
 */
export function breadcrumbSchema(locale: string, crumbs: BreadcrumbCrumb[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/${locale}` },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `${BASE}/${locale}${c.path.startsWith("/") ? c.path : `/${c.path}`}`,
      })),
    ],
  };
}

type ItemListItem = { name: string; path: string };

/**
 * ItemList — for hub pages that list links to other pages (blog hub,
 * collections hub, explore, etc.). Use itemListOrderDescending when items are
 * ranked (default), ascending or unordered otherwise.
 *
 * @example
 *   itemListSchema(locale, "/blog", "Field notes",
 *     articles.map(a => ({ name: a.title, path: `/blog/${a.slug}` })))
 */
export function itemListSchema(
  locale: string,
  pagePath: string,
  name: string,
  items: ItemListItem[],
  order: "descending" | "ascending" | "unordered" = "unordered",
): SchemaObject {
  const orderUrl =
    order === "descending"
      ? "https://schema.org/ItemListOrderDescending"
      : order === "ascending"
        ? "https://schema.org/ItemListOrderAscending"
        : "https://schema.org/ItemListUnordered";

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE}/${locale}${pagePath}#items`,
    name,
    numberOfItems: items.length,
    itemListOrder: orderUrl,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/${locale}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
      name: item.name,
    })),
  };
}

type BlogPostingArgs = {
  locale: string;
  slug: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string | null;
  wordCount?: number;
  keywords?: string[];
};

/**
 * BlogPosting — for /blog/[slug] long-form essays. Chains to org + website
 * via @id refs so the article inherits site-level trust signals.
 */
export function blogPostingSchema(args: BlogPostingArgs): SchemaObject {
  const url = `${BASE}/${args.locale}/blog/${args.slug}`;
  const schema: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: args.headline,
    description: args.description,
    url,
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: args.authorName
      ? { "@type": "Person", name: args.authorName }
      : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: url,
    inLanguage: args.locale === "hi" ? "hi-IN" : "en-IN",
  };
  if (args.imageUrl) schema.image = args.imageUrl.startsWith("http") ? args.imageUrl : `${BASE}${args.imageUrl}`;
  if (args.wordCount) schema.wordCount = args.wordCount;
  if (args.keywords?.length) schema.keywords = args.keywords;
  return schema;
}

type ArticleArgs = {
  locale: string;
  path: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  about?: SchemaObject[];
};

/**
 * Article — generic editorial article schema for /india-travel, /nakshiq-100,
 * /press, and other long-form non-blog pages.
 */
export function articleSchema(args: ArticleArgs): SchemaObject {
  const url = `${BASE}/${args.locale}${args.path.startsWith("/") ? args.path : `/${args.path}`}`;
  const schema: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: args.headline,
    description: args.description,
    url,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: url,
    inLanguage: args.locale === "hi" ? "hi-IN" : "en-IN",
  };
  if (args.datePublished) schema.datePublished = args.datePublished;
  if (args.dateModified) schema.dateModified = args.dateModified;
  if (args.about?.length) schema.about = args.about;
  return schema;
}

type HowToStep = { name: string; text: string; url?: string };

type HowToArgs = {
  locale: string;
  path: string;
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration, eg "PT30M"
  estimatedCost?: { currency: string; value: string };
};

/**
 * HowTo — for guide pages that walk through steps (visa, sim-card, permits,
 * booking trains). Each step becomes a HowToStep with name + text.
 */
export function howToSchema(args: HowToArgs): SchemaObject {
  const url = `${BASE}/${args.locale}${args.path.startsWith("/") ? args.path : `/${args.path}`}`;
  const schema: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name: args.name,
    description: args.description,
    url,
    inLanguage: args.locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    step: args.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
    })),
  };
  if (args.totalTime) schema.totalTime = args.totalTime;
  if (args.estimatedCost) {
    schema.estimatedCost = {
      "@type": "MonetaryAmount",
      currency: args.estimatedCost.currency,
      value: args.estimatedCost.value,
    };
  }
  return schema;
}

type FaqQA = { question: string; answer: string };

/**
 * FAQPage — for pages that include a FAQ block. /permits, /road-conditions,
 * /arrival, and any persona/destination page with structured Q&A.
 */
export function faqPageSchema(args: { locale: string; path: string; qa: FaqQA[] }): SchemaObject {
  const url = `${BASE}/${args.locale}${args.path.startsWith("/") ? args.path : `/${args.path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: args.qa.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

/**
 * CollectionPage — for hub pages that index a collection (blog hub,
 * collections hub, corrections log, press). Pairs naturally with ItemList.
 */
export function collectionPageSchema(args: {
  locale: string;
  path: string;
  name: string;
  description: string;
}): SchemaObject {
  const url = `${BASE}/${args.locale}${args.path.startsWith("/") ? args.path : `/${args.path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    url,
    name: args.name,
    description: args.description,
    inLanguage: args.locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
  };
}
