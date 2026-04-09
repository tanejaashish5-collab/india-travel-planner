import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_KEY = "savedDestinations";

export function useSavedItems() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(SAVED_KEY).then((raw) => {
      if (raw) setSavedIds(JSON.parse(raw));
      setLoading(false);
    });
  }, []);

  const toggleSaved = useCallback(async (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
      AsyncStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const removeSaved = useCallback(async (id: string) => {
    setSavedIds((prev) => {
      const next = prev.filter((s) => s !== id);
      AsyncStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { savedIds, loading, toggleSaved, isSaved, removeSaved };
}
