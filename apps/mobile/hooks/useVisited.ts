import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VISITED_KEY = "nakshiq_visited";

interface VisitedEntry {
  id: string;
  visitedAt: string;
}

export function useVisited() {
  const [visited, setVisited] = useState<VisitedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(VISITED_KEY).then((raw) => {
      if (raw) setVisited(JSON.parse(raw));
      setLoading(false);
    });
  }, []);

  const toggleVisited = useCallback(async (id: string) => {
    setVisited((prev) => {
      const exists = prev.find((v) => v.id === id);
      const next = exists
        ? prev.filter((v) => v.id !== id)
        : [...prev, { id, visitedAt: new Date().toISOString() }];
      AsyncStorage.setItem(VISITED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isVisited = useCallback((id: string) => visited.some((v) => v.id === id), [visited]);

  const visitedCount = visited.length;

  // Explorer Score: base 10pts per visited + difficulty bonus
  const calculateScore = useCallback((destinations: any[]) => {
    let score = 0;
    for (const v of visited) {
      const dest = destinations.find((d) => d.id === v.id);
      score += 10; // base points
      if (dest?.difficulty === "hard") score += 15;
      if (dest?.difficulty === "extreme") score += 25;
      if (dest?.difficulty === "moderate") score += 5;
      if (dest?.elevation_m && dest.elevation_m > 3000) score += 5;
      if (dest?.elevation_m && dest.elevation_m > 4000) score += 10;
    }
    return score;
  }, [visited]);

  return { visited, visitedCount, loading, toggleVisited, isVisited, calculateScore };
}
