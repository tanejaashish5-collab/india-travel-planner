import { useState, useMemo, useCallback } from "react";
import { View, Text, SectionList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useFestivals } from "../hooks/useFestivals";

const MONTH_FULL = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const SEASON_COLOR: Record<string, string> = {
  winter: colors.score4,   // blue
  spring: colors.score5,   // green
  summer: colors.score2,   // orange
  monsoon: colors.score3,  // yellow
  autumn: colors.saffron,  // gold
};

function getSeason(month: number): string {
  if (month >= 11 || month <= 2) return "winter";
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 7) return "summer";
  if (month >= 8 && month <= 9) return "monsoon";
  return "autumn"; // 10
}

export default function FestivalsScreen() {
  const { festivals, loading } = useFestivals();
  const [monthFilter, setMonthFilter] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const currentMonth = new Date().getMonth() + 1;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const sections = useMemo(() => {
    const filtered = monthFilter === 0 ? festivals : festivals.filter((f) => f.month === monthFilter);
    const grouped: Record<number, any[]> = {};
    filtered.forEach((f) => {
      const m = f.month ?? 0;
      if (!grouped[m]) grouped[m] = [];
      grouped[m].push(f);
    });
    return Object.entries(grouped)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([month, data]) => ({ title: MONTH_FULL[Number(month)] || "Unknown", month: Number(month), data }));
  }, [festivals, monthFilter]);

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Festivals" }} /><ActivityIndicator size="large" color={colors.vermillion} /></View>;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: "Festivals" }} />

      {/* Branded Header */}
      <View style={s.header}>
        <View style={s.accentLine} />
        <View style={s.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={s.headerTitle}>Festivals & Celebrations</Text>
            <Text style={s.headerSub}>Cultural experiences across India</Text>
          </View>
          <View style={s.countBadge}>
            <Text style={s.countText}>{festivals.length}</Text>
          </View>
        </View>
      </View>

      {/* Month Chips — Horizontal Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipScroll}>
        <TouchableOpacity style={[s.chip, monthFilter === 0 && s.chipActive]} onPress={() => setMonthFilter(0)}>
          <Text style={[s.chipText, monthFilter === 0 && s.chipTextActive]}>All</Text>
        </TouchableOpacity>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <TouchableOpacity
            key={m}
            style={[
              s.chip,
              monthFilter === m && s.chipActive,
              m === currentMonth && monthFilter !== m && s.chipHighlight,
            ]}
            onPress={() => setMonthFilter(m)}
          >
            <Text style={[s.chipText, monthFilter === m && s.chipTextActive]}>{MONTH_SHORT[m]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Festival List */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.vermillion} />}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View style={s.sectionHeaderWrap}>
            <View style={[s.sectionDot, { backgroundColor: SEASON_COLOR[getSeason(section.month)] || colors.mutedForeground }]} />
            <Text style={s.sectionHeader}>{section.title}</Text>
            <Text style={s.sectionCount}>{section.data.length}</Text>
          </View>
        )}
        renderItem={({ item: f }) => {
          const destName = Array.isArray(f.destinations) ? f.destinations[0]?.name : f.destinations?.name;
          const season = getSeason(f.month ?? 0);
          const accentColor = SEASON_COLOR[season] || colors.mutedForeground;

          return (
            <TouchableOpacity
              style={[s.card, { borderLeftColor: accentColor }]}
              onPress={() => f.destination_id ? router.push(`/destination/${f.destination_id}`) : null}
              activeOpacity={0.85}
            >
              <View style={s.cardTop}>
                <Text style={s.festName} numberOfLines={1}>{f.name}</Text>
                {f.approximate_date && (
                  <View style={[s.datePill, { backgroundColor: accentColor + "20", borderColor: accentColor + "40" }]}>
                    <Text style={[s.dateText, { color: accentColor }]}>{f.approximate_date}</Text>
                  </View>
                )}
              </View>

              {destName && (
                <TouchableOpacity onPress={() => f.destination_id ? router.push(`/destination/${f.destination_id}`) : null}>
                  <Text style={s.destLink}>📍 {destName}</Text>
                </TouchableOpacity>
              )}

              {f.significance && (
                <Text style={s.significance} numberOfLines={3}>{f.significance}</Text>
              )}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={s.emptyWrap}>
            <Text style={s.emptyIcon}>🎭</Text>
            <Text style={s.emptyTitle}>No festivals this month</Text>
            <Text style={s.emptySub}>Try selecting a different month or view all</Text>
          </View>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },

  // Header
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm },
  accentLine: { width: 40, height: 3, backgroundColor: colors.vermillion, borderRadius: 2, marginBottom: spacing.sm },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { fontSize: fontSize["2xl"], fontWeight: "800", color: colors.foreground, letterSpacing: -0.5 },
  headerSub: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
  countBadge: { backgroundColor: colors.vermillion + "20", borderRadius: borderRadius.full, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: colors.vermillion + "40" },
  countText: { fontSize: fontSize.sm, fontWeight: "700", color: colors.vermillion },

  // Chips
  chipScroll: { flexDirection: "row", paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: borderRadius.full, backgroundColor: colors.muted, borderWidth: 1, borderColor: "transparent", marginRight: 6 },
  chipActive: { backgroundColor: colors.vermillion + "18", borderColor: colors.vermillion },
  chipHighlight: { borderWidth: 1, borderColor: colors.foreground + "30" },
  chipText: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground },
  chipTextActive: { color: colors.vermillion },

  // Section
  sectionHeaderWrap: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.sm, marginTop: spacing.md, gap: spacing.sm },
  sectionDot: { width: 8, height: 8, borderRadius: 4 },
  sectionHeader: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, flex: 1 },
  sectionCount: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground, backgroundColor: colors.muted, paddingHorizontal: 8, paddingVertical: 2, borderRadius: borderRadius.full },

  // Card
  card: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, borderLeftWidth: 3 },
  cardTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: spacing.sm },
  festName: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground, flex: 1 },
  datePill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: borderRadius.full, borderWidth: 1 },
  dateText: { fontSize: 11, fontWeight: "600", fontFamily: "monospace" },
  destLink: { fontSize: fontSize.xs, color: colors.score4, marginTop: spacing.xs, fontWeight: "500" },
  significance: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 22 },

  // Empty
  emptyWrap: { alignItems: "center", paddingTop: spacing.xxl * 2 },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground },
  emptySub: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs },
});
