import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

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
    supabase
      .from("collections")
      .select("*")
      .order("name")
      .then(({ data }) => {
        setCollections((data as any[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { collections, loading };
}

export function useCollection(id: string) {
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data: col } = await supabase
        .from("collections")
        .select("*")
        .eq("id", id)
        .single();

      if (col) {
        // Resolve destination items
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

        setCollection({ ...col, destinations });
      }
      setLoading(false);
    }
    fetch();
  }, [id]);

  return { collection, loading };
}
