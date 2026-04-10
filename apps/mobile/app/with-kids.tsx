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

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const SCORE_COLORS: Record<number, string> = {
  5: colors.score5, 4: colors.score4, 3: colors.score3, 2: colors.score2, 1: colors.score1,
};

function familyScore(monthScore: number, kidsRating: number): number {
  // Blend month suitability with kids rating
  return Math.round((monthScore * 0.6 + kidsRating * 0.4));
}

function familyLabel(score: number): string {
  if (score >= 4) return "Great for families";
  if (score >= 3) return "Manageable with kids";
  if (score >= 2) return "Challenging with kids";
  return "Not recommended";
}

export default function WithKidsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [dest, setDest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const { data } = await supabase
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

      setDest(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading || !dest) {
    return (
      <View style={[styles.container, styles.center]}>
        <Stack.Screen options={{ title: "Family Guide" }} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly?.[0] : dest.kids_friendly;
  const cc = Array.isArray(dest.confidence_cards) ? dest.confidence_cards?.[0] : dest.confidence_cards;
  const kidsRating = kf?.rating ?? 0;

  // Watchouts
  const watchouts: string[] = [];
  if (dest.difficulty === "hard" || dest.difficulty === "extreme") watchouts.push("Terrain is physically demanding — not suitable for toddlers or elderly");
  if (dest.elevation_m && dest.elevation_m > 3000) watchouts.push(`High altitude (${dest.elevation_m.toLocaleString()}m) — risk of altitude sickness in children under 5`);
  if (cc?.network && !cc.network.jio && !cc.network.airtel) watchouts.push("Limited mobile network — carry offline maps and emergency contacts");
  if (cc?.emergency?.nearest_hospital && cc.emergency.nearest_hospital.toLowerCase().includes("hour")) watchouts.push(`Hospital access: ${cc.emergency.nearest_hospital}`);
  if (cc?.reach?.road_condition && (cc.reach.road_condition.toLowerCase().includes("poor") || cc.reach.road_condition.toLowerCase().includes("bad"))) watchouts.push(`Road condition: ${cc.reach.road_condition}`);
  if (kf?.reasons) {
    kf.reasons.forEach((r: string) => {
      if (r.toLowerCase().includes("not") || r.toLowerCase().includes("lack") || r.toLowerCase().includes("limit")) {
        watchouts.push(r);
      }
    });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: `${dest.name} — Family Guide` }} />

      {/* Kids Rating Hero */}
      <View style={styles.hero}>
        <View style={styles.heroTag}>
          <Text style={styles.heroTagText}>FAMILY TRAVEL GUIDE</Text>
        </View>
        <Text style={styles.heroName}>{dest.name}</Text>
        <View style={styles.ratingRow}>
          <View style={[styles.ratingCircle, { borderColor: kf?.suitable ? colors.score5 : colors.score1 }]}>
            <Text style={[styles.ratingNum, { color: kf?.suitable ? colors.score5 : colors.score1 }]}>{kidsRating}</Text>
            <Text style={styles.ratingOf}>/5</Text>
          </View>
          <View style={styles.ratingInfo}>
            <Text style={[styles.ratingLabel, { color: kf?.suitable ? colors.score5 : colors.score1 }]}>
              {kf?.suitable ? "Kid Friendly" : "Not Recommended for Kids"}
            </Text>
            <Text style={styles.ratingMeta}>{dest.difficulty} · {dest.elevation_m?.toLocaleString() || "—"}m</Text>
          </View>
        </View>

        {/* Reasons */}
        {kf?.reasons?.length > 0 && (
          <View style={styles.reasonsBox}>
            {kf.reasons.map((r: string, i: number) => (
              <Text key={i} style={styles.reasonText}>• {r}</Text>
            ))}
          </View>
        )}
      </View>

      {/* Month-by-month family suitability */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Month-by-Month Family Suitability</Text>
        <View style={styles.monthGrid}>
          {Array.from({ length: 12 }, (_, i) => {
            const m = i + 1;
            const md = dest.destination_months?.find((dm: any) => dm.month === m);
            const monthScore = md?.score ?? 0;
            const combined = familyScore(monthScore, kidsRating);
            const clamped = Math.min(5, Math.max(1, combined));
            return (
              <View key={m} style={styles.monthCard}>
                <Text style={styles.monthName}>{MONTH_SHORT[m]}</Text>
                <View style={[styles.monthDot, { backgroundColor: SCORE_COLORS[clamped] || colors.muted }]}>
                  <Text style={styles.monthDotText}>{combined}</Text>
                </View>
                <Text style={styles.monthDesc}>{familyLabel(combined)}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Infrastructure for families */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Infrastructure for Families</Text>
        <View style={styles.infraCard}>
          {cc?.emergency?.nearest_hospital && (
            <View style={styles.infraRow}>
              <Text style={styles.infraIcon}>🏥</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infraLabel}>Nearest Hospital</Text>
                <Text style={styles.infraValue}>{cc.emergency.nearest_hospital}</Text>
              </View>
            </View>
          )}
          {cc?.network && (
            <View style={styles.infraRow}>
              <Text style={styles.infraIcon}>📶</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infraLabel}>Mobile Network</Text>
                <Text style={styles.infraValue}>
                  {[cc.network.jio && "Jio", cc.network.airtel && "Airtel", cc.network.bsnl && "BSNL"].filter(Boolean).join(", ") || "Limited coverage"}
                </Text>
                {cc.network.note && <Text style={styles.infraNote}>{cc.network.note}</Text>}
              </View>
            </View>
          )}
          {cc?.reach?.road_condition && (
            <View style={styles.infraRow}>
              <Text style={styles.infraIcon}>🚗</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infraLabel}>Road Condition</Text>
                <Text style={styles.infraValue}>{cc.reach.road_condition}</Text>
              </View>
            </View>
          )}
          {cc?.reach?.public_transport && (
            <View style={styles.infraRow}>
              <Text style={styles.infraIcon}>🚌</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infraLabel}>Public Transport</Text>
                <Text style={styles.infraValue}>{cc.reach.public_transport}</Text>
              </View>
            </View>
          )}
          {dest.vehicle_fit && (
            <View style={styles.infraRow}>
              <Text style={styles.infraIcon}>🚙</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infraLabel}>Vehicle Fit</Text>
                <Text style={styles.infraValue}>{dest.vehicle_fit}</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* What to watch out for */}
      {watchouts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What to Watch Out For</Text>
          <View style={styles.watchCard}>
            {watchouts.map((w, i) => (
              <View key={i} style={styles.watchRow}>
                <Text style={styles.watchIcon}>⚠️</Text>
                <Text style={styles.watchText}>{w}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Link back */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.backLink} onPress={() => router.push(`/destination/${dest.id}` as any)} activeOpacity={0.8}>
          <Text style={styles.backLinkText}>← View full {dest.name} guide</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: spacing.xxl * 2 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Hero
  hero: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md },
  heroTag: { backgroundColor: colors.saffron + "20", alignSelf: "flex-start", borderRadius: borderRadius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, marginBottom: spacing.md },
  heroTagText: { fontSize: 10, fontWeight: "700", letterSpacing: 2, color: colors.saffron },
  heroName: { fontSize: fontSize["3xl"], fontWeight: "800", color: colors.foreground, marginBottom: spacing.md },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  ratingCircle: { width: 64, height: 64, borderRadius: 32, borderWidth: 3, justifyContent: "center", alignItems: "center", flexDirection: "row" },
  ratingNum: { fontSize: fontSize["2xl"], fontWeight: "800" },
  ratingOf: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 4 },
  ratingInfo: { flex: 1 },
  ratingLabel: { fontSize: fontSize.lg, fontWeight: "700" },
  ratingMeta: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2, textTransform: "capitalize" },
  reasonsBox: { marginTop: spacing.md, backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 0.5, borderColor: colors.border },
  reasonText: { fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: 22, marginTop: 4 },

  // Section
  section: { marginTop: spacing.lg, paddingHorizontal: spacing.lg },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, marginBottom: spacing.md },

  // Month grid
  monthGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  monthCard: { width: "30%" as any, backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.sm, alignItems: "center", borderWidth: 0.5, borderColor: colors.border, flexGrow: 1, flexBasis: "30%" as any },
  monthName: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground, marginBottom: 4 },
  monthDot: { width: 28, height: 28, borderRadius: 14, justifyContent: "center", alignItems: "center", marginBottom: 4 },
  monthDotText: { fontSize: 11, fontWeight: "800", color: "#fff" },
  monthDesc: { fontSize: 9, color: colors.mutedForeground, textAlign: "center" },

  // Infra
  infraCard: { backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 0.5, borderColor: colors.border },
  infraRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm, alignItems: "flex-start" },
  infraIcon: { fontSize: 18, marginTop: 2 },
  infraLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, fontWeight: "500" },
  infraValue: { fontSize: fontSize.sm, color: colors.foreground, marginTop: 2 },
  infraNote: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2, opacity: 0.7 },

  // Watch out
  watchCard: { backgroundColor: "#1e1614", borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.saffron + "30" },
  watchRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm, alignItems: "flex-start" },
  watchIcon: { fontSize: 16, marginTop: 2 },
  watchText: { flex: 1, fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: 22 },

  // Back link
  backLink: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.lg, alignItems: "center", borderWidth: 0.5, borderColor: colors.border },
  backLinkText: { fontSize: fontSize.sm, fontWeight: "600", color: colors.saffron },
});
