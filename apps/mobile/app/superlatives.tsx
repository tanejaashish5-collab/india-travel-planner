import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useSuperlatives } from "../hooks/useSuperlatives";

export default function SuperlativesScreen() {
  const { superlatives, loading } = useSuperlatives();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Hook doesn't expose refresh — simulate with timeout; replace when hook supports it
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  if (loading && superlatives.length === 0)
    return (
      <View style={s.center}>
        <Stack.Screen options={{ title: "Records" }} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: "India's Records" }} />
      <FlatList
        data={superlatives}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.xl }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        ListHeaderComponent={() => (
          <View style={s.header}>
            <Text style={s.headerTitle}>🏆 India's Records</Text>
            <Text style={s.headerSubtitle}>The highest, coldest, remotest destinations</Text>
            <Text style={s.headerCount}>{superlatives.length} records</Text>
          </View>
        )}
        renderItem={({ item: sup, index }) => {
          const destName = Array.isArray(sup.destinations)
            ? sup.destinations[0]?.name
            : sup.destinations?.name;

          return (
            <TouchableOpacity
              style={s.card}
              activeOpacity={0.85}
              onPress={() =>
                sup.destination_id ? router.push(`/destination/${sup.destination_id}`) : null
              }
            >
              {/* Big number badge */}
              <View style={s.numBadge}>
                <Text style={s.numText}>{index + 1}</Text>
              </View>

              <View style={s.cardBody}>
                {/* Title — what the record is */}
                <Text style={s.title}>{sup.title}</Text>

                {/* Name — which place holds it */}
                {sup.name && <Text style={s.name}>{sup.name}</Text>}

                {/* Detail */}
                {sup.detail && <Text style={s.detail}>{sup.detail}</Text>}

                {/* Destination link */}
                {destName && (
                  <View style={s.destRow}>
                    <Text style={s.destText}>📍 {destName}</Text>
                    <Text style={s.destArrow}>→</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
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
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize["3xl"],
    fontWeight: "800",
    color: colors.foreground,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.xs,
  },
  headerCount: {
    fontSize: fontSize.xs,
    color: colors.saffron,
    fontWeight: "600",
    marginTop: spacing.xs,
  },

  // Card
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  numBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.vermillion,
    justifyContent: "center",
    alignItems: "center",
  },
  numText: {
    fontSize: fontSize.xl,
    fontWeight: "900",
    color: "#fff",
  },
  cardBody: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: "700",
    color: colors.score4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: "800",
    color: colors.foreground,
    marginTop: 3,
  },
  detail: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.xs,
    lineHeight: 22,
  },
  destRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  destText: {
    fontSize: fontSize.sm,
    color: colors.foreground,
    fontWeight: "600",
  },
  destArrow: {
    fontSize: fontSize.base,
    color: colors.score4,
    fontWeight: "700",
  },
});
