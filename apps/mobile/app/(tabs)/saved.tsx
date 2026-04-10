import { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { useDestinations } from "../../hooks/useDestinations";
import { useSavedItems } from "../../hooks/useSavedItems";

const SCORE_COLOR: Record<number, string> = {
  5: colors.score5, 4: colors.score4, 3: colors.score3, 2: colors.score2, 1: colors.score1,
};
const DIFF_COLOR: Record<string, string> = {
  easy: colors.easy, moderate: colors.moderate, hard: colors.hard, extreme: colors.extreme,
};
const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function SavedScreen() {
  const { destinations, loading: destsLoading } = useDestinations();
  const { savedIds, loading: savedLoading, removeSaved } = useSavedItems();
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const currentMonth = new Date().getMonth() + 1;

  const savedDestinations = useMemo(() => {
    return destinations.filter((d) => savedIds.includes(d.id));
  }, [destinations, savedIds]);

  const comparedDestinations = useMemo(() => {
    return destinations.filter((d) => compareIds.includes(d.id));
  }, [destinations, compareIds]);

  function toggleCompare(id: string) {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((c) => c !== id));
    } else if (compareIds.length < 3) {
      setCompareIds([...compareIds, id]);
    }
  }

  if (destsLoading || savedLoading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  const renderSavedItem = useCallback(({ item: dest }: { item: typeof savedDestinations[0] }) => {
    const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly?.[0] : dest.kids_friendly;
    const stateName = dest.state && !Array.isArray(dest.state) ? dest.state.name : "";
    const monthScore = dest.destination_months?.find((m) => m.month === currentMonth)?.score;
    const isComparing = compareIds.includes(dest.id);

    return (
      <TouchableOpacity
        style={[styles.card, isComparing && styles.cardComparing]}
        onPress={() => compareMode ? toggleCompare(dest.id) : router.push(`/destination/${dest.id}`)}
      >
        {compareMode && (
          <View style={[styles.checkbox, isComparing && styles.checkboxActive]}>
            {isComparing && <Text style={styles.checkmark}>✓</Text>}
          </View>
        )}

        <View style={styles.cardContent}>
          <View style={styles.cardTop}>
            {monthScore !== undefined && (
              <View style={[styles.scorePill, { borderColor: SCORE_COLOR[monthScore] || colors.border }]}>
                <Text style={{ fontSize: fontSize.xs, fontWeight: "700", color: SCORE_COLOR[monthScore] || colors.mutedForeground }}>
                  {monthScore}/5 {MONTH_SHORT[currentMonth]}
                </Text>
              </View>
            )}
            {kf && (
              <Text style={styles.kidsTag}>{kf.suitable ? `👶 ${kf.rating}/5` : "Adults"}</Text>
            )}
          </View>

          <Text style={styles.cardName}>{dest.name}</Text>
          <Text style={styles.cardTagline} numberOfLines={2}>{dest.tagline}</Text>

          <View style={styles.cardMeta}>
            {stateName ? <Text style={styles.metaText}>{stateName}</Text> : null}
            <Text style={styles.metaDot}>·</Text>
            <Text style={[styles.metaText, { color: DIFF_COLOR[dest.difficulty] }]}>{dest.difficulty}</Text>
            {dest.elevation_m && (
              <>
                <Text style={styles.metaDot}>·</Text>
                <Text style={[styles.metaText, { fontFamily: "monospace" }]}>{dest.elevation_m.toLocaleString()}m</Text>
              </>
            )}
          </View>

          {!compareMode && (
            <TouchableOpacity onPress={() => removeSaved(dest.id)} style={styles.removeBtn}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }, [compareMode, compareIds, currentMonth]);

  const listHeader = useMemo(() => (
    <View>
      <Text style={styles.title}>Saved Destinations</Text>
      <Text style={styles.subtitle}>
        {savedDestinations.length} saved · {compareMode ? "Select up to 3 to compare" : "Your travel shortlist"}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.compareBtn, compareMode && styles.compareBtnActive]}
          onPress={() => { setCompareMode(!compareMode); setCompareIds([]); }}
        >
          <Text style={[styles.compareBtnText, compareMode && styles.compareBtnTextActive]}>
            {compareMode ? "Exit Compare" : "Compare"}
          </Text>
        </TouchableOpacity>
        {compareMode && compareIds.length >= 2 && (
          <Text style={styles.compareHint}>{compareIds.length} selected ↓</Text>
        )}
      </View>
    </View>
  ), [savedDestinations.length, compareMode, compareIds.length]);

  const listFooter = useMemo(() => {
    if (!compareMode || comparedDestinations.length < 2) return <View style={{ height: 40 }} />;

    return (
      <View>
        <View style={styles.compareSection}>
          <Text style={styles.compareTitle}>Side-by-Side Comparison</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={styles.compareRow}>
                <View style={styles.compareLabelCell}><Text style={styles.compareLabelText}>Attribute</Text></View>
                {comparedDestinations.map((d) => (
                  <View key={d.id} style={styles.compareValueCell}>
                    <Text style={styles.compareHeaderText}>{d.name}</Text>
                  </View>
                ))}
              </View>

              {[
                { label: `Score (${MONTH_SHORT[currentMonth]})`, key: "score" },
                { label: "Difficulty", key: "difficulty" },
                { label: "Elevation", key: "elevation" },
                { label: "Kids", key: "kids" },
                { label: "Best Months", key: "best_months" },
                { label: "State", key: "state" },
              ].map((row) => (
                <View key={row.key} style={styles.compareRow}>
                  <View style={styles.compareLabelCell}>
                    <Text style={styles.compareLabelText}>{row.label}</Text>
                  </View>
                  {comparedDestinations.map((d) => {
                    const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly?.[0] : d.kids_friendly;
                    const stateName = d.state && !Array.isArray(d.state) ? d.state.name : "N/A";
                    const ms = d.destination_months?.find((m) => m.month === currentMonth)?.score;
                    let val = "";
                    let c = colors.foreground;

                    switch (row.key) {
                      case "score":
                        val = ms !== undefined ? `${ms}/5` : "N/A";
                        c = SCORE_COLOR[ms ?? 0] || colors.mutedForeground;
                        break;
                      case "difficulty":
                        val = d.difficulty;
                        c = DIFF_COLOR[d.difficulty] || colors.foreground;
                        break;
                      case "elevation":
                        val = d.elevation_m ? `${d.elevation_m.toLocaleString()}m` : "N/A";
                        break;
                      case "kids":
                        val = kf ? (kf.suitable ? `${kf.rating}/5 ✓` : "No") : "N/A";
                        c = kf?.suitable ? colors.score5 : kf ? colors.score1 : colors.mutedForeground;
                        break;
                      case "best_months":
                        val = d.best_months?.map((m: number) => MONTH_SHORT[m]).join(", ") ?? "N/A";
                        break;
                      case "state":
                        val = stateName || "N/A";
                        break;
                    }

                    return (
                      <View key={d.id} style={styles.compareValueCell}>
                        <Text style={[styles.compareValueText, { color: c }]}>{val}</Text>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ height: 40 }} />
      </View>
    );
  }, [compareMode, comparedDestinations, currentMonth]);

  return (
    <View style={styles.container}>
      <FlatList
        data={savedDestinations}
        keyExtractor={(item) => item.id}
        renderItem={renderSavedItem}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={{ fontSize: 48 }}>♡</Text>
            <Text style={styles.emptyTitle}>No saved destinations yet</Text>
            <Text style={styles.emptyDesc}>Browse destinations and tap Save to build your shortlist.</Text>
            <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push("/(tabs)/explore")}>
              <Text style={styles.exploreBtnText}>Explore destinations →</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  title: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground },
  subtitle: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs },
  actions: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md, marginBottom: spacing.lg },
  compareBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: borderRadius.sm, borderWidth: 1, borderColor: colors.border },
  compareBtnActive: { borderColor: colors.primary, backgroundColor: "rgba(229,229,229,0.1)" },
  compareBtnText: { fontSize: fontSize.sm, fontWeight: "600", color: colors.mutedForeground },
  compareBtnTextActive: { color: colors.primary },
  compareHint: { fontSize: fontSize.sm, color: colors.primary, fontWeight: "600" },
  emptyCard: { alignItems: "center", paddingVertical: spacing.xxl, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.lg, borderStyle: "dashed" },
  emptyTitle: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, marginTop: spacing.md },
  emptyDesc: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, textAlign: "center", maxWidth: 280 },
  exploreBtn: { marginTop: spacing.lg, backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: 12, borderRadius: borderRadius.full },
  exploreBtnText: { fontSize: fontSize.sm, fontWeight: "600", color: colors.primaryForeground },
  card: { backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm, flexDirection: "row", overflow: "hidden" },
  cardComparing: { borderColor: colors.primary, borderWidth: 2 },
  checkbox: { width: 40, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.2)" },
  checkboxActive: { backgroundColor: "rgba(229,229,229,0.15)" },
  checkmark: { fontSize: fontSize.base, color: colors.primary, fontWeight: "700" },
  cardContent: { flex: 1, padding: spacing.md },
  cardTop: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm },
  scorePill: { borderWidth: 1, borderRadius: borderRadius.full, paddingHorizontal: 8, paddingVertical: 3 },
  kidsTag: { fontSize: fontSize.xs, color: colors.mutedForeground },
  cardName: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground },
  cardTagline: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 3, lineHeight: 20 },
  cardMeta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.sm },
  metaText: { fontSize: fontSize.xs, color: colors.mutedForeground },
  metaDot: { fontSize: fontSize.xs, color: colors.mutedForeground },
  removeBtn: { marginTop: spacing.sm },
  removeText: { fontSize: fontSize.xs, color: colors.destructive },
  compareSection: { marginTop: spacing.xl },
  compareTitle: { fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground, marginBottom: spacing.md },
  compareRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: colors.border },
  compareLabelCell: { width: 100, paddingVertical: 10, paddingRight: 8 },
  compareLabelText: { fontSize: fontSize.xs, color: colors.mutedForeground, fontWeight: "600" },
  compareValueCell: { width: 120, paddingVertical: 10, paddingHorizontal: 8 },
  compareHeaderText: { fontSize: fontSize.sm, fontWeight: "700", color: colors.foreground },
  compareValueText: { fontSize: fontSize.sm, fontWeight: "600" },
});
