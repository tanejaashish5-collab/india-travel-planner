import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nakshiq.com";

  // Static pages
  const staticPages = [
    "", "explore", "collections", "routes", "treks", "plan",
    "camping", "permits", "road-conditions", "superlatives",
    "stays", "festivals", "tourist-traps",
    "saved", "about", "methodology", "blog",
    "region/himachal-pradesh", "region/uttarakhand", "region/jammu-kashmir",
    "region/ladakh", "region/rajasthan", "region/punjab",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    ["en", "hi"].map((locale) => ({
      url: `${baseUrl}/${locale}${page ? `/${page}` : ""}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "daily" as const : "weekly" as const,
      priority: page === "" ? 1.0 : page === "explore" ? 0.9 : 0.7,
    }))
  );

  // Dynamic destination pages
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const MONTH_SLUGS = ["january","february","march","april","may","june","july","august","september","october","november","december"];

  let destEntries: MetadataRoute.Sitemap = [];
  let destMonthEntries: MetadataRoute.Sitemap = [];
  let whereToGoEntries: MetadataRoute.Sitemap = [];
  let collEntries: MetadataRoute.Sitemap = [];
  let routeEntries: MetadataRoute.Sitemap = [];
  let articleEntries: MetadataRoute.Sitemap = [];

  if (url && key) {
    const supabase = createClient(url, key);

    const [destResult, collResult, routeResult, articleResult] = await Promise.all([
      supabase.from("destinations").select("id").order("id"),
      supabase.from("collections").select("id").order("id"),
      supabase.from("routes").select("id").order("id"),
      supabase.from("articles").select("slug").order("published_at", { ascending: false }),
    ]);

    destEntries = (destResult.data ?? []).flatMap((d: any) =>
      ["en", "hi"].map((locale) => ({
        url: `${baseUrl}/${locale}/destination/${d.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    );

    // Destination-month pages (142 × 12 × 2 locales = 3,408 URLs)
    destMonthEntries = (destResult.data ?? []).flatMap((d: any) =>
      MONTH_SLUGS.flatMap((month) =>
        ["en", "hi"].map((locale) => ({
          url: `${baseUrl}/${locale}/destination/${d.id}/${month}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
      )
    );

    // Where-to-go seasonal hub pages (12 × 2 locales = 24 URLs)
    whereToGoEntries = MONTH_SLUGS.flatMap((month) =>
      ["en", "hi"].map((locale) => ({
        url: `${baseUrl}/${locale}/where-to-go/${month}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }))
    );

    collEntries = (collResult.data ?? []).flatMap((c: any) =>
      ["en", "hi"].map((locale) => ({
        url: `${baseUrl}/${locale}/collections/${c.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    );

    routeEntries = (routeResult.data ?? []).flatMap((r: any) =>
      ["en", "hi"].map((locale) => ({
        url: `${baseUrl}/${locale}/routes/${r.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    );

    articleEntries = (articleResult.data ?? []).flatMap((a: any) =>
      ["en", "hi"].map((locale) => ({
        url: `${baseUrl}/${locale}/blog/${a.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    );
  }

  return [...staticEntries, ...destEntries, ...destMonthEntries, ...whereToGoEntries, ...collEntries, ...routeEntries, ...articleEntries];
}
