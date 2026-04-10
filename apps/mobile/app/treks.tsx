import { useState, useMemo, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, Image, RefreshControl } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useTreks } from "../hooks/useTreks";

const IMG_BASE = "https://nakshiq.com/images/destinations";
const DIFF_COLOR: Record<string, string> = { easy: colors.easy, moderate: colors.moderate, hard: colors.hard, extreme: colors.extreme };
const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function TreksScreen() {
  const { treks, loading } = useTreks();
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }, []);

  const filtered = useMemo(() => {
    return treks.filter((t: any) => {
      if (diffFilter !== "all" && t.difficulty !== diffFilter) return false;
      if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [treks, search, diffFilter]);

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Treks" }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: `${treks.length} Treks` }} />

      {/* Branded Header */}
      <View style={s.header}>
        <View style={s.headerAccent} />
        <View style={s.headerRow}>
          <View>
            <Text style={s.headerTitle}>Treks & Hikes</Text>
            <Text style={s.headerSub}>Himalayan trails rated by difficulty</Text>
          </View>
          <View style={s.headerCount}><Text style={s.headerCountText}>{treks.length}</Text></View>
        </View>
      </View>

      {/* Search */}
      <View style={s.searchWrap}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput style={s.searchInput} placeholder="Search treks..." placeholderTextColor={colors.mutedForeground} value={search} onChangeText={setSearch} />
      </View>

      {/* Filters */}
      <View style={s.chipRow}>
        {["all","easy","moderate","hard","extreme"].map((d) => (
          <TouchableOpacity key={d} style={[s.chip, diffFilter === d && { borderColor: d === "all" ? colors.primary : DIFF_COLOR[d], backgroundColor: (d === "all" ? colors.primary : DIFF_COLOR[d]) + "15" }]} onPress={() => setDiffFilter(d)}>
            <Text style={[s.chipText, diffFilter === d && { color: d === "all" ? colors.primary : DIFF_COLOR[d] }]}>{d === "all" ? "All" : d}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{ padding: spacing.md, paddingTop: 0 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.vermillion} />}
        renderItem={({ item: t }: any) => {
          const destName = Array.isArray(t.destinations) ? t.destinations[0]?.name : t.destinations?.name;
          return (
            <TouchableOpacity style={s.card} onPress={() => router.push(`/trek/${t.id}`)} activeOpacity={0.85}>
              {/* Image */}
              <Image source={{ uri: `${IMG_BASE}/${t.destination_id}.jpg` }} style={s.cardImage} />
              <View style={s.cardOverlay} />

              {/* Difficulty badge */}
              <View style={[s.diffBadge, { backgroundColor: DIFF_COLOR[t.difficulty] || colors.muted }]}>
                <Text style={s.diffText}>{t.difficulty}</Text>
              </View>

              {/* Content */}
              <View style={s.cardContent}>
                <Text style={s.cardName} numberOfLines={1}>{t.name}</Text>
                {destName && <Text style={s.cardDest}>{destName}</Text>}

                <View style={s.statsRow}>
                  {t.duration_days && <View style={s.statPill}><Text style={s.statText}>{t.duration_days} days</Text></View>}
                  {t.distance_km && <View style={s.statPill}><Text style={s.statText}>{t.distance_km} km</Text></View>}
                  {t.max_altitude_m && <View style={s.statPill}><Text style={s.statText}>{t.max_altitude_m.toLocaleString()}m</Text></View>}
                  {t.fitness_level && <View style={s.statPill}><Text style={s.statText}>{t.fitness_level}</Text></View>}
                </View>

                {t.best_months?.length > 0 && (
                  <Text style={s.months}>Best: {t.best_months.map((m: number) => MONTH_SHORT[m]).join(", ")}</Text>
                )}

                {t.highlights?.length > 0 && (
                  <Text style={s.highlights} numberOfLines={1}>{t.highlights.slice(0, 3).join(" · ")}</Text>
                )}

                {t.kids_suitable && <Text style={s.kidsBadge}>👶 Kids suitable</Text>}
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
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm },
  headerAccent: { width: 32, height: 3, backgroundColor: colors.vermillion, borderRadius: 2, marginBottom: spacing.sm },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: fontSize["2xl"], fontWeight: "800", color: colors.foreground },
  headerSub: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
  headerCount: { backgroundColor: colors.vermillion + "15", paddingHorizontal: 12, paddingVertical: 6, borderRadius: borderRadius.full },
  headerCountText: { fontSize: fontSize.sm, fontWeight: "800", color: colors.vermillion },
  searchWrap: { flexDirection: "row", alignItems: "center", marginHorizontal: spacing.md, marginTop: spacing.sm, marginBottom: spacing.sm, backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md },
  searchIcon: { fontSize: 14, marginRight: spacing.sm },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: fontSize.sm, color: colors.foreground },
  chipRow: { flexDirection: "row", paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border, marginRight: 6 },
  chipText: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground, textTransform: "capitalize" },
  card: { borderRadius: borderRadius.lg, overflow: "hidden", backgroundColor: colors.card, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  cardImage: { width: "100%", height: 140 },
  cardOverlay: { position: "absolute", top: 0, left: 0, right: 0, height: 140, backgroundColor: "rgba(0,0,0,0.2)" },
  diffBadge: { position: "absolute", top: 10, right: 10, paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full },
  diffText: { fontSize: fontSize.xs, fontWeight: "700", color: "#fff", textTransform: "capitalize" },
  cardContent: { padding: spacing.md },
  cardName: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground },
  cardDest: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  statsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: spacing.sm },
  statPill: { backgroundColor: colors.muted, paddingHorizontal: 8, paddingVertical: 3, borderRadius: borderRadius.full },
  statText: { fontSize: 11, fontWeight: "600", color: colors.foreground },
  months: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.sm },
  highlights: { fontSize: fontSize.xs, color: colors.score4, marginTop: spacing.xs },
  kidsBadge: { fontSize: fontSize.xs, color: colors.score5, marginTop: spacing.xs, fontWeight: "600" },
});
