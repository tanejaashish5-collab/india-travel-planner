import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { getCached, TTL } from "../lib/cache";

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  items: any[];
  cover_image: string | null;
  cover_image_url: string | null;
  tags: string[];
  content_type: string | null;
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCached(
      "collections:all",
      async () => {
        const { data } = await supabase.from("collections").select("*").order("name");
        return data ?? [];
      },
      TTL.long,
    ).then((res) => {
      if (!mounted) return;
      setCollections(((res.data as any[]) ?? []) as Collection[]);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return { collections, loading };
}

export function useCollection(id: string) {
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!id) { setLoading(false); return; }
    getCached(
      `collection:${id}`,
      async () => {
        const { data: col } = await supabase
          .from("collections")
          .select("*")
          .eq("id", id)
          .single();
        if (!col) return null;

        const items = col.items ?? [];
        const destIds = items
          .map((item: any) => item.destination_id || item.id || item)
          .filter(Boolean);

        let destinations: any[] = [];
        if (destIds.length > 0) {
          const { data } = await supabase
            .from("destinations")
            .select("id, name, tagline, difficulty, elevation_m, state:states(name), destination_months(month, score)")
            .in("id", destIds);
          destinations = data ?? [];
        }
        return { ...col, destinations };
      },
      TTL.long,
    ).then((res) => {
      if (!mounted) return;
      setCollection(res.data);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [id]);

  return { collection, loading };
}
