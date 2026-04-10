import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { supabase } from "../lib/supabase";

interface TrapAlternative {
  id: string;
  trap_name: string;
  trap_destination_id: string | null;
  alternative_name: string;
  alternative_destination_id: string | null;
  why_better: string | null;
  comparison: string | null;
  rank: number | null;
  trap_destination: { name: string } | null;
  alternative_destination: { name: string } | null;
}

function useTouristTraps() {
  const [traps, setTraps] = useState<TrapAlternative[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("tourist_trap_alternatives")
      .select(
        `id, trap_name, trap_destination_id, alternative_name, alternative_destination_id,
         why_better, comparison, rank,
         trap_destination:destinations!tourist_trap_alternatives_trap_destination_id_fkey(name),
         alternative_destination:destinations!tourist_trap_alternatives_alternative_destination_id_fkey(name)`
      )
      .order("rank");

    setTraps((data as any[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { traps, loading, refresh: fetchData };
}

export default function TouristTrapsScreen() {
  const { traps, loading, refresh } = useTouristTraps();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  if (loading && traps.length === 0) {
    return (
      <View style={s.center}>
        <Stack.Screen options={{ title: "Tourist Traps" }} />
        <ActivityIndicator size="large" color={colors.vermillion} />
      </View>
    );
  }

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: "Tourist Traps" }} />

      <FlatList
        data={traps}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: spacing.md,
          paddingBottom: spacing.xxl,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.vermillion}
          />
        }
        ListHeaderComponent={() => (
          <View style={s.header}>
            <View style={s.accentLine} />
            <View style={s.headerRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.headerTitle}>Tourist Traps Exposed</Text>
                <Text style={s.headerSub}>
                  Skip the hype. Go where it matters.
                </Text>
              </View>
              <View style={s.countBadge}>
                <Text style={s.countText}>{traps.length}</Text>
              </View>
            </View>
          </View>
        )}
        renderItem={({ item: trap }) => {
          const trapName =
            trap.trap_name ||
            (Array.isArray(trap.trap_destination)
              ? (trap.trap_destination as any)[0]?.name
              : trap.trap_destination?.name) ||
            "Unknown";

          const altName =
            trap.alternative_name ||
            (Array.isArray(trap.alternative_destination)
              ? (trap.alternative_destination as any)[0]?.name
              : trap.alternative_destination?.name) ||
            "Unknown";

          return (
            <View style={s.card}>
              {/* SKIP section */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                  trap.trap_destination_id
                    ? router.push(`/destination/${trap.trap_destination_id}`)
                    : null
                }
              >
                <View style={s.skipRow}>
                  <View style={s.skipBadge}>
                    <Text style={s.skipBadgeText}>SKIP</Text>
                  </View>
                  <Text style={s.trapName} numberOfLines={1}>
                    {trapName}
                  </Text>
                </View>
                {trap.comparison && (
                  <Text style={s.comparison} numberOfLines={2}>
                    {trap.comparison}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Arrow Divider */}
              <View style={s.divider}>
                <View style={s.dividerLine} />
                <Text style={s.dividerArrow}>↓</Text>
                <View style={s.dividerLine} />
              </View>

              {/* GO HERE INSTEAD section */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                  trap.alternative_destination_id
                    ? router.push(
                        `/destination/${trap.alternative_destination_id}`
                      )
                    : null
                }
              >
                <View style={s.goRow}>
                  <View style={s.goBadge}>
                    <Text style={s.goBadgeText}>GO HERE INSTEAD</Text>
                  </View>
                  <Text style={s.altName} numberOfLines={1}>
                    {altName}
                  </Text>
                </View>
                {trap.why_better && (
                  <Text style={s.whyBetter} numberOfLines={3}>
                    {trap.why_better}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={s.emptyWrap}>
            <Text style={s.emptyIcon}>🚫</Text>
            <Text style={s.emptyTitle}>No traps loaded</Text>
            <Text style={s.emptySub}>Pull to refresh</Text>
          </View>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  // Header
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  accentLine: {
    width: 40,
    height: 3,
    backgroundColor: colors.vermillion,
    borderRadius: 2,
    marginBottom: spacing.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: fontSize["2xl"],
    fontWeight: "800",
    color: colors.foreground,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  countBadge: {
    backgroundColor: colors.vermillion + "20",
    borderRadius: borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.vermillion + "40",
  },
  countText: {
    fontSize: fontSize.sm,
    fontWeight: "700",
    color: colors.vermillion,
  },

  // Card
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Skip (trap) section
  skipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  skipBadge: {
    backgroundColor: colors.score1 + "20",
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.score1 + "40",
  },
  skipBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.score1,
    letterSpacing: 1,
  },
  trapName: {
    fontSize: fontSize.base,
    fontWeight: "700",
    color: colors.foreground,
    flex: 1,
  },
  comparison: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: spacing.xs,
    lineHeight: 18,
    paddingLeft: spacing.xs,
  },

  // Divider
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.sm,
    gap: spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerArrow: {
    fontSize: fontSize.lg,
    color: colors.score5,
    fontWeight: "700",
  },

  // Go (alternative) section
  goRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  goBadge: {
    backgroundColor: colors.score5 + "20",
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.score5 + "40",
  },
  goBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.score5,
    letterSpacing: 0.5,
  },
  altName: {
    fontSize: fontSize.base,
    fontWeight: "700",
    color: colors.foreground,
    flex: 1,
  },
  whyBetter: {
    fontSize: fontSize.xs,
    color: colors.score5,
    marginTop: spacing.xs,
    lineHeight: 18,
    paddingLeft: spacing.xs,
  },

  // Empty
  emptyWrap: { alignItems: "center", paddingTop: spacing.xxl * 2 },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.foreground,
  },
  emptySub: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.xs,
  },
});
