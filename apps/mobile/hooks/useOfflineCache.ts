import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";

const CACHE_KEY = "nakshiq_offline_destinations";
const CACHE_TIMESTAMP_KEY = "nakshiq_cache_timestamp";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface CachedData {
  destinations: any[];
  timestamp: number;
}

export function useOfflineCache() {
  const [isOffline, setIsOffline] = useState(false);
  const [cachedDestinations, setCachedDestinations] = useState<any[]>([]);
  const [cacheAge, setCacheAge] = useState<string>("");

  // Check cache on mount
  useEffect(() => {
    loadCache();
  }, []);

  async function loadCache() {
    try {
      const raw = await AsyncStorage.getItem(CACHE_KEY);
      const timestamp = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);
      if (raw) {
        setCachedDestinations(JSON.parse(raw));
        if (timestamp) {
          const age = Date.now() - Number(timestamp);
          const hours = Math.floor(age / 3600000);
          setCacheAge(hours < 1 ? "Just now" : `${hours}h ago`);
        }
      }
    } catch {}
  }

  // Cache top destinations (called after successful data fetch)
  const cacheDestinations = useCallback(async (destinations: any[]) => {
    try {
      // Cache top 30 by current month score
      const currentMonth = new Date().getMonth() + 1;
      const sorted = [...destinations].sort((a, b) => {
        const aScore = a.destination_months?.find((m: any) => m.month === currentMonth)?.score ?? 0;
        const bScore = b.destination_months?.find((m: any) => m.month === currentMonth)?.score ?? 0;
        return bScore - aScore;
      });
      const top = sorted.slice(0, 30);
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(top));
      await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now()));
      setCachedDestinations(top);
      setCacheAge("Just now");
    } catch {}
  }, []);

  // Attempt fetch with offline fallback
  const fetchWithFallback = useCallback(async <T>(
    fetcher: () => Promise<T>,
    fallbackData: T
  ): Promise<{ data: T; fromCache: boolean }> => {
    try {
      const data = await fetcher();
      setIsOffline(false);
      return { data, fromCache: false };
    } catch {
      setIsOffline(true);
      return { data: fallbackData, fromCache: true };
    }
  }, []);

  return {
    isOffline,
    cachedDestinations,
    cacheAge,
    cacheDestinations,
    fetchWithFallback,
  };
}
