import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { supabase } from "../lib/supabase";

const { width } = Dimensions.get("window");
const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const SCORE_COLORS: Record<number, string> = {
  5: colors.score5, 4: colors.score4, 3: colors.score3, 2: colors.score2, 1: colors.score1,
};

export default function VsScreen() {
  const { pair } = useLocalSearchParams<{ pair: string }>();
  const [destA, setDestA] = useState<any>(null);
  const [destB, setDestB] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    async function fetchPair() {
      if (!pair) return;
      const [idA, idB] = pair.split("-vs-");
      if (!idA || !idB) return;

      const fetchOne = (id: string) =>
        supabase
          .from("destinations")
          .select(`
            *,
            state:states(name),
            kids_friendly(*),
            confidence_cards(*),
            destination_months(*)
          `)
          .eq("id", id)
          .single();

      const [resA, resB] = await Promise.all([fetchOne(idA), fetchOne(idB)]);
      setDestA(resA.data);
      setDestB(resB.data);
      setLoading(false);
    }
    fetchPair();
  }, [pair]);

  if (loading || !destA || !destB) {
    return (
      <View style={[styles.container, styles.center]}>
        <Stack.Screen options={{ title: "Compare" }} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const getMonthScore = (dest: any, month: number) =>
    dest.destination_months?.find((m: any) => m.month === month)?.score ?? 0;

  const kfA = Array.isArray(destA.kids_friendly) ? destA.kids_friendly?.[0] : destA.kids_friendly;
  const kfB = Array.isArray(destB.kids_friendly) ? destB.kids_friendly?.[0] : destB.kids_friendly;
  const ccA = Array.isArray(destA.confidence_cards) ? destA.confidence_cards?.[0] : destA.confidence_cards;
  const ccB = Array.isArray(destB.confidence_cards) ? destB.confidence_cards?.[0] : destB.confidence_cards;

  const scoreA = getMonthScore(destA, currentMonth);
  const scoreB = getMonthScore(destB, currentMonth);

  const comparisonRows = [
    { label: `${MONTH_SHORT[currentMonth]} Score`, a: `${scoreA}/5`, b: `${scoreB}/5`, colorA: SCORE_COLORS[scoreA], colorB: SCORE_COLORS[scoreB] },
    { label: "Difficulty", a: destA.difficulty, b: destB.difficulty },
    { label: "Elevation", a: destA.elevation_m ? `${destA.elevation_m.toLocaleString()}m` : "N/A", b: destB.elevation_m ? `${destB.elevation_m.toLocaleString()}m` : "N/A" },
    { label: "Budget", a: destA.budget_tier || "—", b: destB.budget_tier || "—" },
    { label: "Kids", a: kfA ? `${kfA.rating}/5` : "N/A", b: kfB ? `${kfB.rating}/5` : "N/A" },
    { label: "Safety", a: ccA?.safety_rating ? `${ccA.safety_rating}/5` : "N/A", b: ccB?.safety_rating ? `${ccB.safety_rating}/5` : "N/A" },
  ];

  // Generate "Choose X if" reasons
  const chooseA: string[] = [];
  const chooseB: string[] = [];
  if (scoreA > scoreB) chooseA.push(`Better in ${MONTH_SHORT[currentMonth]}`);
  if (scoreB > scoreA) chooseB.push(`Better in ${MONTH_SHORT[currentMonth]}`);
  if (destA.difficulty === "easy") chooseA.push("Easier access");
  if (destB.difficulty === "easy") chooseB.push("Easier access");
  if (kfA?.rating > (kfB?.rating ?? 0)) chooseA.push("Better for kids");
  if (kfB?.rating > (kfA?.rating ?? 0)) chooseB.push("Better for kids");
  if ((destA.elevation_m ?? 0) > (destB.elevation_m ?? 0)) chooseA.push("Higher altitude");
  if ((destB.elevation_m ?? 0) > (destA.elevation_m ?? 0)) chooseB.push("Higher altitude");
  if (destA.budget_tier === "budget") chooseA.push("More affordable");
  if (destB.budget_tier === "budget") chooseB.push("More affordable");
  if ((ccA?.safety_rating ?? 0) > (ccB?.safety_rating ?? 0)) chooseA.push("Safer infrastructure");
  if ((ccB?.safety_rating ?? 0) > (ccA?.safety_rating ?? 0)) chooseB.push("Safer infrastructure");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: `${destA.name} vs ${destB.name}` }} />

      {/* Split header */}
      <View style={styles.splitHeader}>
        <TouchableOpacity style={styles.headerSide} onPress={() => router.push(`/destination/${destA.id}` as any)} activeOpacity={0.8}>
          <View style={[styles.headerScore, { backgroundColor: SCORE_COLORS[scoreA] || colors.muted }]}>
            <Text style={styles.headerScoreText}>{scoreA}/5</Text>
          </View>
          <Text style={styles.headerName} numberOfLines={2}>{destA.name}</Text>
          <Text style={styles.headerMeta}>{destA.difficulty} · {destA.elevation_m?.toLocaleString() || "—"}m</Text>
        </TouchableOpacity>

        <View style={styles.vsCircle}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <TouchableOpacity style={styles.headerSide} onPress={() => router.push(`/destination/${destB.id}` as any)} activeOpacity={0.8}>
          <View style={[styles.headerScore, { backgroundColor: SCORE_COLORS[scoreB] || colors.muted }]}>
            <Text style={styles.headerScoreText}>{scoreB}/5</Text>
          </View>
          <Text style={styles.headerName} numberOfLines={2}>{destB.name}</Text>
          <Text style={styles.headerMeta}>{destB.difficulty} · {destB.elevation_m?.toLocaleString() || "—"}m</Text>
        </TouchableOpacity>
      </View>

      {/* Side-by-side comparison table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Head-to-Head</Text>
        <View style={styles.table}>
          {comparisonRows.map((row) => (
            <View key={row.label} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={[styles.cellValue, row.colorA ? { color: row.colorA } : null]}>{row.a}</Text>
              </View>
              <View style={styles.tableLabelCell}>
                <Text style={styles.cellLabel}>{row.label}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={[styles.cellValue, row.colorB ? { color: row.colorB } : null]}>{row.b}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 12-month score comparison */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>12-Month Comparison</Text>
        <View style={styles.monthGrid}>
          {Array.from({ length: 12 }, (_, i) => {
            const m = i + 1;
            const sA = getMonthScore(destA, m);
            const sB = getMonthScore(destB, m);
            return (
              <View key={m} style={[styles.monthCompareRow, m === currentMonth && styles.monthCompareRowCurrent]}>
                <Text style={styles.monthLabel}>{MONTH_SHORT[m]}</Text>
                <View style={styles.monthBars}>
                  <View style={styles.monthBarContainer}>
                    <View style={[styles.monthBarFill, { width: `${(sA / 5) * 100}%`, backgroundColor: SCORE_COLORS[sA] || colors.muted }]} />
                  </View>
                  <View style={styles.monthBarContainer}>
                    <View style={[styles.monthBarFill, { width: `${(sB / 5) * 100}%`, backgroundColor: SCORE_COLORS[sB] || colors.muted }]} />
                  </View>
                </View>
                <View style={styles.monthScores}>
                  <Text style={[styles.monthScoreText, { color: SCORE_COLORS[sA] || colors.mutedForeground }]}>{sA}</Text>
                  <Text style={[styles.monthScoreText, { color: SCORE_COLORS[sB] || colors.mutedForeground }]}>{sB}</Text>
                </View>
              </View>
            );
          })}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.score4 }]} />
              <Text style={styles.legendText}>{destA.name}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.score3 }]} />
              <Text style={styles.legendText}>{destB.name}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Choose X if / Choose Y if */}
      <View style={styles.chooseSection}>
        <View style={styles.chooseCard}>
          <Text style={styles.chooseTitle}>Choose {destA.name} if...</Text>
          {chooseA.length > 0 ? chooseA.map((r, i) => (
            <Text key={i} style={styles.chooseReason}>• {r}</Text>
          )) : (
            <Text style={styles.chooseReason}>• Great option either way</Text>
          )}
          <TouchableOpacity style={styles.chooseLink} onPress={() => router.push(`/destination/${destA.id}` as any)}>
            <Text style={styles.chooseLinkText}>View {destA.name} →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chooseCard}>
          <Text style={styles.chooseTitle}>Choose {destB.name} if...</Text>
          {chooseB.length > 0 ? chooseB.map((r, i) => (
            <Text key={i} style={styles.chooseReason}>• {r}</Text>
          )) : (
            <Text style={styles.chooseReason}>• Great option either way</Text>
          )}
          <TouchableOpacity style={styles.chooseLink} onPress={() => router.push(`/destination/${destB.id}` as any)}>
            <Text style={styles.chooseLinkText}>View {destB.name} →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: spacing.xxl * 2 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Split header
  splitHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  headerSide: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  headerScore: {
    borderRadius: borderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: spacing.sm,
  },
  headerScoreText: { fontSize: fontSize.sm, fontWeight: "800", color: "#fff" },
  headerName: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, textAlign: "center" },
  headerMeta: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 4, textTransform: "capitalize" },
  vsCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.vermillion,
    justifyContent: "center",
    alignItems: "center",
  },
  vsText: { fontSize: 11, fontWeight: "800", color: "#fff", letterSpacing: 1 },

  // Section
  section: { marginTop: spacing.lg, paddingHorizontal: spacing.md },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, marginBottom: spacing.md },

  // Table
  table: { backgroundColor: colors.card, borderRadius: borderRadius.lg, overflow: "hidden", borderWidth: 0.5, borderColor: colors.border },
  tableRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: colors.border },
  tableCell: { flex: 1, paddingVertical: 14, alignItems: "center" },
  tableLabelCell: { flex: 1, paddingVertical: 14, alignItems: "center", backgroundColor: "rgba(245,241,232,0.03)" },
  cellValue: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground, textTransform: "capitalize" },
  cellLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, fontWeight: "500" },

  // Month comparison
  monthGrid: { backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.md, borderWidth: 0.5, borderColor: colors.border },
  monthCompareRow: { flexDirection: "row", alignItems: "center", marginBottom: spacing.sm, gap: spacing.sm },
  monthCompareRowCurrent: { backgroundColor: "rgba(245,241,232,0.05)", borderRadius: borderRadius.sm, marginHorizontal: -spacing.xs, paddingHorizontal: spacing.xs },
  monthLabel: { width: 30, fontSize: fontSize.xs, color: colors.mutedForeground },
  monthBars: { flex: 1, gap: 3 },
  monthBarContainer: { height: 6, backgroundColor: colors.muted, borderRadius: 3, overflow: "hidden" },
  monthBarFill: { height: "100%", borderRadius: 3 },
  monthScores: { width: 36, flexDirection: "row", justifyContent: "space-between" },
  monthScoreText: { fontSize: 10, fontWeight: "700", fontVariant: ["tabular-nums"] as any },
  legendRow: { flexDirection: "row", justifyContent: "center", gap: spacing.lg, marginTop: spacing.md, paddingTop: spacing.sm, borderTopWidth: 0.5, borderTopColor: colors.border },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: fontSize.xs, color: colors.mutedForeground },

  // Choose section
  chooseSection: { paddingHorizontal: spacing.md, marginTop: spacing.lg, gap: spacing.md },
  chooseCard: { backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 0.5, borderColor: colors.border },
  chooseTitle: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground, marginBottom: spacing.sm },
  chooseReason: { fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: 22, marginTop: 4 },
  chooseLink: { marginTop: spacing.md },
  chooseLinkText: { fontSize: fontSize.sm, fontWeight: "600", color: colors.score4 },
});
