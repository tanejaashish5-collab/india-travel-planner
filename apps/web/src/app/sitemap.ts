import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://web-blond-zeta.vercel.app";

  // Static pages
  const staticPages = [
    "", "explore", "collections", "routes", "treks", "plan",
    "camping", "permits", "road-conditions", "superlatives",
    "saved", "about", "methodology",
    "region/himachal-pradesh", "region/uttarakhand", "region/jammu-kashmir",
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

  let destEntries: MetadataRoute.Sitemap = [];
  let collEntries: MetadataRoute.Sitemap = [];
  let routeEntries: MetadataRoute.Sitemap = [];

  if (url && key) {
    const supabase = createClient(url, key);

    const [destResult, collResult, routeResult] = await Promise.all([
      supabase.from("destinations").select("id").order("id"),
      supabase.from("collections").select("id").order("id"),
      supabase.from("routes").select("id").order("id"),
    ]);

    destEntries = (destResult.data ?? []).flatMap((d: any) =>
      ["en", "hi"].map((locale) => ({
        url: `${baseUrl}/${locale}/destination/${d.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
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
  }

  return [...staticEntries, ...destEntries, ...collEntries, ...routeEntries];
}
