import { useEffect, useState } from "react";
import * as Network from "expo-network";

/**
 * Sprint 13b — single hook for network reachability.
 * Returns { isConnected: boolean | null, isInternetReachable: boolean | null }.
 * `null` while the first probe is in flight.
 *
 * expo-network's addNetworkStateListener fires when the OS connectivity flips —
 * but it doesn't always reflect captive-portal / DNS-blocked situations, so
 * call sites that issue a real Supabase fetch are still authoritative for
 * "data actually moved."
 */
export function useNetworkState() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    Network.getNetworkStateAsync()
      .then((state) => {
        if (!mounted) return;
        setIsConnected(state.isConnected ?? null);
        setIsInternetReachable(state.isInternetReachable ?? null);
      })
      .catch(() => {
        if (!mounted) return;
        // If the probe itself fails, assume offline — the indicator showing is
        // a less-bad failure mode than silently masking a real outage.
        setIsConnected(false);
        setIsInternetReachable(false);
      });

    const sub = Network.addNetworkStateListener((state) => {
      if (!mounted) return;
      setIsConnected(state.isConnected ?? null);
      setIsInternetReachable(state.isInternetReachable ?? null);
    });

    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);

  return { isConnected, isInternetReachable };
}
