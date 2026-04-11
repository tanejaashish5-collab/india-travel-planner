import { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { useDestinations, Destination } from "../../hooks/useDestinations";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - spacing.lg * 2 - spacing.sm) / 2;

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const SCORE_COLORS: Record<number, string> = {
  5: colors.score5, 4: colors.score4, 3: colors.score3, 2: colors.score2, 1: colors.score1, 0: colors.muted,
};
const DIFF_COLORS: Record<string, string> = {
  easy: colors.easy, moderate: colors.moderate, hard: colors.hard, extreme: colors.extreme,
};

export default function ExploreScreen() {
  const { destinations, loading } = useDestinations();
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const onImageError = useCallback((id: string) => {
    setFailedImages((prev) => new Set(prev).add(id));
  }, []);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const currentMonth = selectedMonth;

  const allTags = useMemo(
    () => [...new Set(destinations.flatMap((d) => d.tags || []))].sort(),
    [destinations]
  );

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      if (diffFilter && d.difficulty !== diffFilter) return false;
      if (tagFilter && !(d.tags || []).includes(tagFilter)) return false;
      if (search) {
        const q = search.toLowerCase();
        const stateName = Array.isArray(d.state) ? (d.state as any)[0]?.name : (d.state as any)?.name;
        if (
          !d.name.toLowerCase().includes(q) &&
          !d.tagline.toLowerCase().includes(q) &&
          !(stateName?.toLowerCase().includes(q))
        ) return false;
      }
      return true;
    });
  }, [destinations, search, diffFilter, tagFilter]);

  // Sort by current month score
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aScore = a.destination_months?.find((m) => m.month === currentMonth)?.score ?? -1;
      const bScore = b.destination_months?.find((m) => m.month === currentMonth)?.score ?? -1;
      return bScore - aScore;
    });
  }, [filtered, currentMonth]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations, states..."
          placeholderTextColor={colors.mutedForeground}
          value={search}
          onChangeText={setSearch}
        />
        {search ? (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Difficulty filter */}
      <View style={styles.filterRow}>
        {[
          { key: "", label: "All", color: colors.foreground },
          { key: "easy", label: "Easy", color: colors.easy },
          { key: "moderate", label: "Moderate", color: colors.moderate },
          { key: "hard", label: "Hard", color: colors.hard },
          { key: "extreme", label: "Extreme", color: colors.extreme },
        ].map((d) => (
          <TouchableOpacity
            key={d.key}
            style={[styles.filterChip, diffFilter === d.key && { borderColor: d.color, backgroundColor: d.color + "15" }]}
            onPress={() => setDiffFilter(d.key)}
          >
            <Text style={[styles.filterChipText, diffFilter === d.key && { color: d.color }]}>
              {d.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagRow}
        >
          <TouchableOpacity
            style={[
              styles.tagChip,
              !tagFilter && styles.tagChipActive,
            ]}
            onPress={() => setTagFilter("")}
          >
            <Text style={[styles.tagChipText, !tagFilter && styles.tagChipTextActive]}>All Tags</Text>
          </TouchableOpacity>
          {allTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagChip,
                tagFilter === tag && styles.tagChipActive,
              ]}
              onPress={() => setTagFilter(tagFilter === tag ? "" : tag)}
            >
              <Text style={[styles.tagChipText, tagFilter === tag && styles.tagChipTextActive]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Month selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.monthRow}>
        {MONTH_SHORT.slice(1).map((m, i) => {
          const month = i + 1;
          return (
            <TouchableOpacity
              key={month}
              style={[styles.monthChip, selectedMonth === month && styles.monthChipActive]}
              onPress={() => setSelectedMonth(month)}
            >
              <Text style={[styles.monthChipText, selectedMonth === month && styles.monthChipTextActive]}>{m}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={styles.resultCount}>{sorted.length} destinations · sorted by {MONTH_SHORT[currentMonth]} score</Text>

      {/* Grid */}
      <FlatList
        data={sorted}
        numColumns={2}
        columnWrapperStyle={{ gap: spacing.sm, paddingHorizontal: spacing.lg }}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const stateName = Array.isArray(item.state) ? (item.state as any)[0]?.name : (item.state as any)?.name;
          const monthScore = item.destination_months?.find((m) => m.month === currentMonth)?.score;
          const kf = Array.isArray(item.kids_friendly) ? item.kids_friendly[0] : item.kids_friendly;

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/destination/${item.id}` as any)}
              activeOpacity={0.8}
            >
              {!failedImages.has(item.id) ? (
                <Image
                  source={{ uri: `https://nakshiq.com/images/destinations/${item.id}.jpg` }}
                  style={styles.cardImage}
                  onError={() => onImageError(item.id)}
                />
              ) : (
                <View style={[styles.cardImage, { backgroundColor: colors.muted }]} />
              )}
              <View style={styles.cardImageOverlay} />

              {/* Score badge */}
              {monthScore !== undefined && (
                <View style={[styles.cardScore, { backgroundColor: SCORE_COLORS[monthScore] || colors.muted }]}>
                  <Text style={styles.cardScoreText}>{monthScore}/5</Text>
                </View>
              )}

              <View style={styles.cardContent}>
                <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.cardTagline} numberOfLines={2}>{item.tagline}</Text>
                <View style={styles.cardMeta}>
                  {stateName && <Text style={styles.cardMetaText}>{stateName}</Text>}
                  <Text style={[styles.cardMetaText, { color: DIFF_COLORS[item.difficulty] || colors.mutedForeground }]}>
                    {item.difficulty}
                  </Text>
                  {item.elevation_m && (
                    <Text style={styles.cardMetaText}>{item.elevation_m.toLocaleString()}m</Text>
                  )}
                </View>

                {/* 12-month score strip */}
                {item.destination_months && item.destination_months.length > 0 && (
                  <View style={styles.monthStrip}>
                    {Array.from({ length: 12 }, (_, i) => {
                      const m = i + 1;
                      const md = item.destination_months?.find((dm) => dm.month === m);
                      const s = md?.score ?? 0;
                      const dotColor = s >= 4 ? colors.score5 : s === 3 ? colors.score3 : s >= 1 ? colors.score1 : colors.muted;
                      return (
                        <View
                          key={m}
                          style={[
                            styles.monthDot,
                            { backgroundColor: dotColor },
                            m === currentMonth && styles.monthDotCurrent,
                          ]}
                        />
                      );
                    })}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { justifyContent: "center", alignItems: "center" },
  searchContainer: { flexDirection: "row", alignItems: "center", marginHorizontal: spacing.lg, marginTop: spacing.sm, marginBottom: spacing.sm, backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md },
  searchIcon: { fontSize: 16, marginRight: spacing.sm },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: fontSize.sm,
    color: colors.foreground,
  },
  clearBtn: { fontSize: fontSize.sm, color: colors.mutedForeground, padding: spacing.xs },
  filterRow: { flexDirection: "row", paddingHorizontal: spacing.lg, gap: spacing.xs, marginBottom: spacing.sm },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  filterChipActive: { borderColor: colors.primary, backgroundColor: "rgba(229,229,229,0.1)" },
  filterChipText: { fontSize: fontSize.xs, color: colors.mutedForeground, textTransform: "capitalize" },
  filterChipTextActive: { color: colors.primary },
  tagRow: { flexDirection: "row", paddingHorizontal: spacing.lg, gap: spacing.xs, marginBottom: spacing.sm },
  tagChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 0.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  tagChipActive: { borderColor: colors.topographic, backgroundColor: colors.topographic + "20" },
  tagChipText: { fontSize: fontSize.xs, color: colors.mutedForeground, textTransform: "capitalize" },
  tagChipTextActive: { color: colors.topographic },
  monthRow: { flexDirection: "row", paddingHorizontal: spacing.lg, gap: spacing.xs, marginBottom: spacing.sm },
  monthChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 0.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  monthChipActive: { borderColor: colors.saffron, backgroundColor: colors.saffron + "20" },
  monthChipText: { fontSize: 11, color: colors.mutedForeground, fontWeight: "600" },
  monthChipTextActive: { color: colors.saffron },
  resultCount: { fontSize: fontSize.xs, color: colors.mutedForeground, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  card: {
    width: CARD_WIDTH,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    backgroundColor: colors.card,
    marginBottom: spacing.sm,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  cardImage: { width: "100%", height: 120 },
  cardImageOverlay: {
    position: "absolute", top: 0, left: 0, right: 0, height: 120,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  cardScore: {
    position: "absolute", top: spacing.xs, right: spacing.xs,
    borderRadius: borderRadius.full,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  cardScoreText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  cardContent: { padding: spacing.sm },
  cardName: { fontSize: fontSize.sm, fontWeight: "700", color: colors.foreground },
  cardTagline: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2, lineHeight: 16 },
  cardMeta: { flexDirection: "row", gap: 4, marginTop: spacing.xs, flexWrap: "wrap" },
  cardMetaText: { fontSize: 10, color: colors.mutedForeground },
  monthStrip: { flexDirection: "row", gap: 2, marginTop: spacing.xs },
  monthDot: { flex: 1, height: 3, borderRadius: 2 },
  monthDotCurrent: { borderWidth: 1, borderColor: colors.primary },
});
