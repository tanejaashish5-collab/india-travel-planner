import { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useWhereToGo, MonthDestination } from "../hooks/useWhereToGo";

const MONTH_SHORT = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

const SCORE_CONFIG: Record<number, { label: string; color: string }> = {
  5: { label: "Perfect", color: colors.score5 },
  4: { label: "Great", color: colors.score4 },
  3: { label: "Okay", color: colors.score3 },
  2: { label: "Poor", color: colors.score2 },
  1: { label: "Avoid", color: colors.score1 },
};

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: colors.easy,
  moderate: colors.moderate,
  hard: colors.hard,
  extreme: colors.extreme,
};

interface Section {
  title: string;
  color: string;
  data: MonthDestination[];
}

export default function WhereToGoScreen() {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const { destinations, loading, refresh } = useWhereToGo(selectedMonth);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const sections = useMemo<Section[]>(() => {
    const goNow = destinations.filter((d) => d.score === 5);
    const goodTime = destinations.filter((d) => d.score === 4);
    const avoid = destinations.filter((d) => d.score <= 2);

    const result: Section[] = [];
    if (goNow.length > 0) result.push({ title: `Go Now (5/5)`, color: colors.score5, data: goNow });
    if (goodTime.length > 0) result.push({ title: `Good Time (4/5)`, color: colors.score4, data: goodTime });
    if (avoid.length > 0) result.push({ title: `Where NOT to Go (1-2/5)`, color: colors.score1, data: avoid });
    return result;
  }, [destinations]);

  if (loading && destinations.length === 0) {
    return (
      <View style={s.center}>
        <Stack.Screen options={{ title: "Where to Go" }} />
        <ActivityIndicator size="large" color={colors.vermillion} />
      </View>
    );
  }

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: "Where to Go" }} />

      {/* Branded Header */}
      <View style={s.header}>
        <View style={s.accentLine} />
        <Text style={s.headerTitle}>Where to Go</Text>
        <Text style={s.headerSub}>
          Best destinations for {MONTH_SHORT[selectedMonth - 1]}
        </Text>
      </View>

      {/* Month Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.chipScroll}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <TouchableOpacity
            key={m}
            style={[
              s.chip,
              selectedMonth === m && s.chipActive,
              m === currentMonth && selectedMonth !== m && s.chipHighlight,
            ]}
            onPress={() => setSelectedMonth(m)}
          >
            <Text
              style={[s.chipText, selectedMonth === m && s.chipTextActive]}
            >
              {MONTH_SHORT[m - 1]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Destination List */}
      <FlatList
        data={sections}
        keyExtractor={(section) => section.title}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.xxl }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.vermillion}
          />
        }
        renderItem={({ item: section }) => (
          <View style={s.sectionWrap}>
            {/* Section Header */}
            <View style={s.sectionHeaderRow}>
              <View style={[s.sectionDot, { backgroundColor: section.color }]} />
              <Text style={[s.sectionTitle, { color: section.color }]}>
                {section.title}
              </Text>
              <Text style={s.sectionCount}>{section.data.length}</Text>
            </View>

            {/* Cards */}
            {section.data.map((item) => {
              const dest = Array.isArray(item.destinations)
                ? (item.destinations as any)[0]
                : item.destinations;
              if (!dest) return null;

              const scoreConf = SCORE_CONFIG[item.score] ?? SCORE_CONFIG[3];
              const diffColor =
                DIFFICULTY_COLOR[dest.difficulty?.toLowerCase()] ??
                colors.mutedForeground;

              return (
                <TouchableOpacity
                  key={item.destination_id}
                  style={s.card}
                  activeOpacity={0.85}
                  onPress={() =>
                    router.push(`/destination/${item.destination_id}`)
                  }
                >
                  {/* Destination Image */}
                  <Image
                    source={{
                      uri: `https://nakshiq.com/images/destinations/${item.destination_id}.jpg`,
                    }}
                    style={s.cardImage}
                  />

                  <View style={s.cardBody}>
                    <View style={s.cardTopRow}>
                      <Text style={s.cardName} numberOfLines={1}>
                        {dest.name}
                      </Text>
                      <View
                        style={[
                          s.scoreBadge,
                          { backgroundColor: scoreConf.color + "20", borderColor: scoreConf.color + "40" },
                        ]}
                      >
                        <Text style={[s.scoreText, { color: scoreConf.color }]}>
                          {item.score}/5
                        </Text>
                      </View>
                    </View>

                    {/* Meta row */}
                    <View style={s.metaRow}>
                      {dest.difficulty && (
                        <View style={[s.metaPill, { borderColor: diffColor + "40" }]}>
                          <Text style={[s.metaPillText, { color: diffColor }]}>
                            {dest.difficulty}
                          </Text>
                        </View>
                      )}
                      {dest.elevation_m != null && (
                        <Text style={s.elevation}>
                          {dest.elevation_m.toLocaleString()}m
                        </Text>
                      )}
                    </View>

                    {item.note ? (
                      <Text style={s.note} numberOfLines={2}>
                        {item.note}
                      </Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        ListEmptyComponent={
          <View style={s.emptyWrap}>
            <Text style={s.emptyIcon}>🗺️</Text>
            <Text style={s.emptyTitle}>No data for this month</Text>
            <Text style={s.emptySub}>Try selecting a different month</Text>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  accentLine: {
    width: 40,
    height: 3,
    backgroundColor: colors.vermillion,
    borderRadius: 2,
    marginBottom: spacing.sm,
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

  // Chips
  chipScroll: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.muted,
    borderWidth: 1,
    borderColor: "transparent",
    marginRight: 6,
  },
  chipActive: {
    backgroundColor: colors.vermillion + "18",
    borderColor: colors.vermillion,
  },
  chipHighlight: {
    borderWidth: 1,
    borderColor: colors.foreground + "30",
  },
  chipText: {
    fontSize: fontSize.xs,
    fontWeight: "600",
    color: colors.mutedForeground,
  },
  chipTextActive: { color: colors.vermillion },

  // Sections
  sectionWrap: { marginBottom: spacing.lg },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  sectionDot: { width: 10, height: 10, borderRadius: 5 },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    flex: 1,
  },
  sectionCount: {
    fontSize: fontSize.xs,
    fontWeight: "600",
    color: colors.mutedForeground,
    backgroundColor: colors.muted,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },

  // Card
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    overflow: "hidden",
  },
  cardImage: {
    width: 90,
    height: 100,
    backgroundColor: colors.muted,
  },
  cardBody: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "center",
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  cardName: {
    fontSize: fontSize.base,
    fontWeight: "700",
    color: colors.foreground,
    flex: 1,
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  scoreText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
  },

  // Meta
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  metaPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  metaPillText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  elevation: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    fontFamily: "monospace",
  },

  note: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: spacing.xs,
    lineHeight: 18,
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
