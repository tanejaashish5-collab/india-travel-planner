import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNetworkState } from "../hooks/useNetworkState";
import { colors, spacing, fontSize } from "../lib/theme";

/**
 * Sprint 13b — mobile mirror of apps/web/src/components/offline-indicator.tsx.
 * Shows a small amber banner at the bottom of the screen when the device
 * goes offline. Saved + cached pages keep working; this surfaces the state
 * so the user knows why a fresh fetch isn't loading.
 */
export function OfflineIndicator() {
  const { isConnected } = useNetworkState();

  // null = haven't probed yet; render nothing rather than flash the banner
  if (isConnected === null || isConnected) return null;

  return (
    <SafeAreaView edges={["bottom"]} style={styles.wrap} pointerEvents="none">
      <View style={styles.banner}>
        <View style={styles.dot} />
        <Text style={styles.text}>You're offline — saved pages still work</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    zIndex: 60,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "rgba(245, 158, 11, 0.18)",
    borderColor: "rgba(245, 158, 11, 0.5)",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fbbf24",
  },
  text: {
    color: "#fcd34d",
    fontSize: fontSize.xs,
    fontWeight: "500",
  },
});
