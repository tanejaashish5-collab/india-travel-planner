/**
 * Generic AsyncStorage-backed cache for Supabase queries.
 * Sprint 13b — mirrors the web PWA's cache-then-network pattern (sw.js v29)
 * so the mobile app keeps working when 4G drops in Ladakh / Spiti.
 *
 * Pattern: getCached(key, fetcher, ttlMs) returns cached data immediately if
 * fresh; otherwise tries fetcher and falls back to cached data on failure.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "nakshiq:cache:";

export const TTL = {
  short:  60 * 60 * 1000,             // 1 hour — for live signals (road reports)
  medium: 24 * 60 * 60 * 1000,        // 1 day  — for destination data
  long:   7 * 24 * 60 * 60 * 1000,    // 1 week — for mostly-static editorial content
};

type CacheEntry<T> = {
  data: T;
  cachedAt: number;
};

export async function getCachedRaw<T>(key: string): Promise<CacheEntry<T> | null> {
  try {
    const raw = await AsyncStorage.getItem(PREFIX + key);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry<T>;
  } catch {
    return null;
  }
}

export async function setCached<T>(key: string, data: T): Promise<void> {
  try {
    const entry: CacheEntry<T> = { data, cachedAt: Date.now() };
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify(entry));
  } catch {}
}

export async function clearCached(key: string): Promise<void> {
  try { await AsyncStorage.removeItem(PREFIX + key); } catch {}
}

/**
 * Cache-then-network. Returns the freshest of:
 *  - network result (if reachable AND fetcher resolves), with side-effect of caching it
 *  - cached result (if cached AND within ttlMs)
 *  - cached result (if cached AND fetcher fails — graceful offline)
 *  - null (if nothing cached AND fetcher fails)
 *
 * Caller can distinguish via the returned `fromCache` + `stale` flags.
 */
export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = TTL.medium,
): Promise<{ data: T | null; fromCache: boolean; stale: boolean }> {
  const cached = await getCachedRaw<T>(key);
  const now = Date.now();
  const isFresh = cached && now - cached.cachedAt < ttlMs;

  // Fresh cache: try network in background, return cache immediately
  if (isFresh) {
    fetcher()
      .then((fresh) => setCached(key, fresh))
      .catch(() => {});
    return { data: cached.data, fromCache: true, stale: false };
  }

  // Stale or no cache: try network first, fall back to cache on error
  try {
    const fresh = await fetcher();
    await setCached(key, fresh);
    return { data: fresh, fromCache: false, stale: false };
  } catch (err) {
    if (cached) return { data: cached.data, fromCache: true, stale: true };
    return { data: null, fromCache: false, stale: false };
  }
}

/**
 * Prefetch a list of keys + fetchers in the background. Used on app launch
 * to warm up the cache so Sundarbans-area travellers don't have to load each
 * destination over a flaky 2G hotel-Wi-Fi.
 */
export async function prefetch(
  entries: Array<{ key: string; fetcher: () => Promise<unknown> }>,
): Promise<void> {
  // Run with concurrency cap of 3 to avoid hammering Supabase from a freshly-launched app
  const queue = [...entries];
  const workers = Array.from({ length: 3 }, async () => {
    while (queue.length > 0) {
      const next = queue.shift();
      if (!next) break;
      try {
        const data = await next.fetcher();
        await setCached(next.key, data);
      } catch {
        // Silent — prefetch is opportunistic
      }
    }
  });
  await Promise.all(workers);
}

/**
 * Wipe all cached entries (debug / settings option later).
 */
export async function clearAllCached(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const ours = keys.filter((k) => k.startsWith(PREFIX));
    if (ours.length > 0) await AsyncStorage.multiRemove(ours);
  } catch {}
}
