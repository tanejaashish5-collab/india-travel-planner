import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  content: string;
  excerpt: string | null;
  destinations: string[];
  published_at: string;
  reading_time: number;
  cover_image_url: string | null;
  tags: string[];
  featured: boolean;
}

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("articles")
      .select("id, slug, title, subtitle, category, excerpt, published_at, reading_time, cover_image_url, tags, featured")
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setArticles((data as any[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { articles, loading };
}

export function useArticlesForDestination(destinationId: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("articles")
      .select("slug, title, depth, reading_time, category")
      .contains("destinations", [destinationId])
      .order("depth", { ascending: false })
      .limit(5)
      .then(({ data }) => {
        setArticles((data as any[]) ?? []);
        setLoading(false);
      });
  }, [destinationId]);

  return { articles, loading };
}

export function useArticle(slug: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data }) => {
        setArticle(data as any);
        setLoading(false);
      });
  }, [slug]);

  return { article, loading };
}
