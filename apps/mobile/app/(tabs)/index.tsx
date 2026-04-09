import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { supabase } from "../../lib/supabase";

const { width } = Dimensions.get("window");

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const SCORE_COLORS: Record<number, string> = {
  5: colors.score5, 4: colors.score4, 3: colors.score3, 2: colors.score2, 1: colors.score1,
};

export default function HomeScreen() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [festivals, setFestivals] = useState<any[]>([]);
  const [stats, setStats] = useState({ destinations: 0, places: 0, treks: 0, festivals: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const currentMonth = new Date().getMonth() + 1;

      const [featResult, festResult, destCount, subCount, gemCount, trekCount, festCount] = await Promise.all([
        supabase
          .from("destination_months")
          .select("destination_id, score, destinations(id, name, tagline, difficulty, elevation_m, state:states(name))")
          .eq("month", currentMonth)
          .gte("score", 4)
          .order("score", { ascending: false })
          .limit(8),
        supabase
          .from("festivals")
          .select("*, destinations(name)")
          .or(`month.eq.${currentMonth},month.eq.${(currentMonth % 12) + 1}`)
          .order("month")
          .limit(6),
        supabase.from("destinations").select("*", { count: "exact", head: true }),
        supabase.from("sub_destinations").select("*", { count: "exact", head: true }),
        supabase.from("hidden_gems").select("*", { count: "exact", head: true }),
        supabase.from("treks").select("*", { count: "exact", head: true }),
        supabase.from("festivals").select("*", { count: "exact", head: true }),
      ]);

      setFeatured(featResult.data ?? []);
      setFestivals(festResult.data ?? []);
      setStats({
        destinations: destCount.count ?? 124,
        places: (destCount.count ?? 0) + (subCount.count ?? 0) + (gemCount.count ?? 0),
        treks: trekCount.count ?? 49,
        festivals: festCount.count ?? 168,
      });
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading destinations...</Text>
      </View>
    );
  }

  const currentMonth = new Date().getMonth() + 1;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Explore India</Text>
        <Text style={styles.heroSubtitle}>Beyond the Tourist Trail</Text>
        <Text style={styles.heroDescription}>
          Every destination scored by month. Kids ratings. Safety data. Honest opinions.
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {[
          { num: stats.places, label: "Places" },
          { num: stats.destinations, label: "Destinations" },
          { num: stats.festivals, label: "Festivals" },
          { num: stats.treks, label: "Treks" },
        ].map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statNum}>{s.num}+</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Featured This Month */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best in {MONTH_SHORT[currentMonth]}</Text>
        <Text style={styles.sectionSubtitle}>Top-scored destinations this month</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: spacing.md }}>
          {featured.map((item: any) => {
            const dest = item.destinations;
            if (!dest) return null;
            const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;

            return (
              <TouchableOpacity
                key={dest.id}
                style={styles.featuredCard}
                onPress={() => router.push(`/destination/${dest.id}` as any)}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: `https://web-blond-zeta.vercel.app/images/destinations/${dest.id}.jpg` }}
                  style={styles.featuredImage}
                />
                <View style={styles.featuredOverlay} />
                <View style={[styles.scoreBadge, { backgroundColor: SCORE_COLORS[item.score] || colors.muted }]}>
                  <Text style={styles.scoreBadgeText}>{item.score}/5</Text>
                </View>
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredName}>{dest.name}</Text>
                  <Text style={styles.featuredMeta} numberOfLines={1}>
                    {stateName} · {dest.difficulty}
                    {dest.elevation_m ? ` · ${dest.elevation_m.toLocaleString()}m` : ""}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Upcoming Festivals */}
      {festivals.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Festivals</Text>
          <Text style={styles.sectionSubtitle}>Time your trip around these events</Text>
          {festivals.map((f: any) => {
            const destName = Array.isArray(f.destinations) ? f.destinations[0]?.name : f.destinations?.name;
            return (
              <TouchableOpacity
                key={f.id}
                style={styles.festivalCard}
                onPress={() => router.push(`/destination/${f.destination_id}` as any)}
                activeOpacity={0.8}
              >
                <View style={styles.festivalMonth}>
                  <Text style={styles.festivalMonthText}>{MONTH_SHORT[f.month]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.festivalName}>{f.name}</Text>
                  {destName && <Text style={styles.festivalDest}>📍 {destName}</Text>}
                  <Text style={styles.festivalDate} numberOfLines={1}>{f.approximate_date}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Quick actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[
            { label: "Explore All", icon: "🗺️", route: "/(tabs)/explore" },
            { label: "AI Plan Trip", icon: "🤖", route: "/(tabs)/plan" },
            { label: "Saved", icon: "❤️", route: "/(tabs)/saved" },
            { label: "Profile", icon: "👤", route: "/(tabs)/profile" },
          ].map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.actionCard}
              onPress={() => router.push(action.route as any)}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 24 }}>{action.icon}</Text>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { justifyContent: "center", alignItems: "center" },
  loadingText: { color: colors.mutedForeground, marginTop: spacing.md, fontSize: fontSize.sm },
  hero: { padding: spacing.lg, paddingTop: spacing.xl },
  heroTitle: { fontSize: fontSize["4xl"], fontWeight: "800", color: colors.foreground, letterSpacing: -1 },
  heroSubtitle: { fontSize: fontSize["2xl"], fontWeight: "600", color: colors.mutedForeground, marginTop: spacing.xs },
  heroDescription: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: spacing.md, lineHeight: 24 },
  statsRow: { flexDirection: "row", paddingHorizontal: spacing.lg, gap: spacing.sm },
  statCard: { flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: "center", borderWidth: 0.5, borderColor: colors.border },
  statNum: { fontSize: fontSize.xl, fontWeight: "800", color: colors.primary, fontVariant: ["tabular-nums"] },
  statLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  section: { padding: spacing.lg, paddingBottom: 0 },
  sectionTitle: { fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground },
  sectionSubtitle: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
  featuredCard: { width: width * 0.7, height: 200, borderRadius: borderRadius.lg, overflow: "hidden", marginRight: spacing.md, backgroundColor: colors.card },
  featuredImage: { width: "100%", height: "100%", position: "absolute" },
  featuredOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.4)" },
  scoreBadge: { position: "absolute", top: spacing.sm, right: spacing.sm, borderRadius: borderRadius.full, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  scoreBadgeText: { color: "#fff", fontSize: fontSize.xs, fontWeight: "700" },
  featuredContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: spacing.md },
  featuredName: { fontSize: fontSize.lg, fontWeight: "700", color: "#fff" },
  featuredMeta: { fontSize: fontSize.xs, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  festivalCard: { flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginTop: spacing.sm, borderWidth: 0.5, borderColor: colors.border },
  festivalMonth: { backgroundColor: "rgba(229,229,229,0.1)", borderRadius: borderRadius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  festivalMonthText: { fontSize: fontSize.xs, fontWeight: "600", color: colors.primary },
  festivalName: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground },
  festivalDest: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  festivalDate: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2, opacity: 0.7 },
  actionsGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md },
  actionCard: { width: (width - spacing.lg * 2 - spacing.sm) / 2, backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.lg, alignItems: "center", gap: spacing.sm, borderWidth: 0.5, borderColor: colors.border },
  actionLabel: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground },
});
