import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { usePreferences } from "../../hooks/usePreferences";
import { supabase } from "../../lib/supabase";
import SearchOverlay from "../../components/SearchOverlay";

const { width } = Dimensions.get("window");
const IMG_BASE = "https://nakshiq.com/images/destinations";

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTH_FULL = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
const SCORE_COLORS: Record<number, string> = {
  5: colors.score5, 4: colors.score4, 3: colors.score3, 2: colors.score2, 1: colors.score1,
};
const DIFF_COLORS: Record<string, string> = {
  easy: colors.easy, moderate: colors.moderate, hard: colors.hard, extreme: colors.extreme,
};

const DISCOVER_ITEMS = [
  { label: "Ask NakshIQ", sub: "AI", icon: "💬", route: "/ask", color: colors.saffron },
  { label: "All States", sub: "36", icon: "🗺️", route: "/states", color: colors.topographic },
  { label: "Treks", sub: "130", icon: "🥾", route: "/treks", color: colors.score5 },
  { label: "Routes", sub: "74", icon: "🛣️", route: "/routes", color: colors.score4 },
  { label: "Where to Go", sub: "", icon: "📅", route: "/where-to-go", color: colors.topographic },
  { label: "Tourist Traps", sub: "", icon: "⚠️", route: "/tourist-traps", color: colors.score1 },
  { label: "Collections", sub: "91", icon: "📚", route: "/collections", color: "#8b5cf6" },
  { label: "Festivals", sub: "325", icon: "🎪", route: "/festivals", color: colors.saffron },
  { label: "Camping", sub: "110", icon: "⛺", route: "/camping", color: colors.score4 },
  { label: "Stays", sub: "", icon: "🏡", route: "/stays", color: colors.vermillion },
  { label: "Permits", sub: "", icon: "📋", route: "/permits", color: colors.mutedForeground },
  { label: "Roads", sub: "", icon: "🚗", route: "/road-conditions", color: colors.saffron },
  { label: "Records", sub: "", icon: "🏆", route: "/superlatives", color: colors.score3 },
  { label: "Blog", sub: "", icon: "📝", route: "/blog", color: "#8b5cf6" },
];

const TRAVELER_GREETINGS: Record<string, string> = {
  solo: "Solo explorer",
  couple: "Travel partner",
  family: "Family traveler",
  biker: "Road warrior",
  backpacker: "Backpacker",
  spiritual: "Seeker",
};

export default function HomeScreen() {
  const { preferences } = usePreferences();
  const [featured, setFeatured] = useState<any[]>([]);
  const [festivals, setFestivals] = useState<any[]>([]);
  const [stats, setStats] = useState({ destinations: 0, places: 0, treks: 0, festivals: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const onImageError = useCallback((id: string) => {
    setFailedImages((prev) => new Set(prev).add(id));
  }, []);

  async function fetchData() {
    const currentMonth = new Date().getMonth() + 1;
    const [featResult, festResult, destCount, subCount, gemCount, trekCount, festCount] = await Promise.all([
      supabase.from("destination_months").select("destination_id, score, destinations(id, name, tagline, difficulty, elevation_m, state:states(name))").eq("month", currentMonth).gte("score", 4).order("score", { ascending: false }).limit(8),
      supabase.from("festivals").select("*, destinations(name)").or(`month.eq.${currentMonth},month.eq.${(currentMonth % 12) + 1}`).order("month").limit(6),
      supabase.from("destinations").select("*", { count: "exact", head: true }),
      supabase.from("sub_destinations").select("*", { count: "exact", head: true }),
      supabase.from("hidden_gems").select("*", { count: "exact", head: true }),
      supabase.from("treks").select("*", { count: "exact", head: true }),
      supabase.from("festivals").select("*", { count: "exact", head: true }),
    ]);
    setFeatured(featResult.data ?? []);
    setFestivals(festResult.data ?? []);
    setStats({
      destinations: destCount.count ?? 403,
      places: (destCount.count ?? 0) + (subCount.count ?? 0) + (gemCount.count ?? 0),
      treks: trekCount.count ?? 96,
      festivals: festCount.count ?? 252,
    });
  }

  useEffect(() => { fetchData().then(() => setLoading(false)); }, []);

  async function onRefresh() {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const currentMonth = new Date().getMonth() + 1;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTag}>{preferences.travelerType ? `HEY, ${TRAVELER_GREETINGS[preferences.travelerType]?.toUpperCase() || "TRAVELER"}` : "TRAVEL WITH IQ"}</Text>
        <Text style={styles.heroTitle}>Naksh<Text style={{ color: colors.vermillion }}>.</Text>iq</Text>
        <Text style={styles.heroSubtitle}>Travel intelligence for India</Text>
        <Text style={styles.heroDesc}>
          {preferences.travelMonth > 0
            ? `Showing top destinations for ${MONTH_FULL[preferences.travelMonth]}. ${stats.destinations} scored.`
            : "Every destination scored by month. Real infrastructure data. Honest opinions."}
        </Text>
        <TouchableOpacity
          style={styles.searchPill}
          onPress={() => setSearchOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.searchPillIcon}>🔍</Text>
          <Text style={styles.searchPillText}>Search destinations, treks, articles…</Text>
        </TouchableOpacity>
      </View>

      {/* Stats strip */}
      <View style={styles.statsRow}>
        {[
          { num: stats.places, label: "Places" },
          { num: stats.destinations, label: "Destinations" },
          { num: stats.festivals, label: "Festivals" },
          { num: stats.treks, label: "Treks" },
        ].map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statNum}>{s.num}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* SOS floating card */}
      <TouchableOpacity style={styles.sosCard} onPress={() => router.push("/sos" as any)} activeOpacity={0.85}>
        <Text style={styles.sosIcon}>🆘</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.sosTitle}>Emergency SOS</Text>
          <Text style={styles.sosSub}>One-tap emergency calls, location sharing</Text>
        </View>
        <Text style={styles.sosArrow}>→</Text>
      </TouchableOpacity>

      {/* Best This Month */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Best in {MONTH_FULL[currentMonth]}</Text>
            <Text style={styles.sectionSub}>Top-scored destinations right now</Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: spacing.lg, paddingRight: spacing.md }}>
          {featured.map((item: any) => {
            const dest = item.destinations;
            if (!dest) return null;
            const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;
            return (
              <TouchableOpacity key={dest.id} style={styles.featCard} onPress={() => router.push(`/destination/${dest.id}` as any)} activeOpacity={0.9}>
                {!failedImages.has(dest.id) ? (
                  <Image source={{ uri: `${IMG_BASE}/${dest.id}.jpg` }} style={styles.featImage} onError={() => onImageError(dest.id)} />
                ) : (
                  <View style={[styles.featImage, { backgroundColor: colors.muted }]} />
                )}
                <View style={styles.featGradient} />
                {/* Score */}
                <View style={[styles.featScore, { backgroundColor: SCORE_COLORS[item.score] || colors.muted }]}>
                  <Text style={styles.featScoreText}>{item.score}/5</Text>
                </View>
                {/* Content */}
                <View style={styles.featContent}>
                  <Text style={styles.featName} numberOfLines={1}>{dest.name}</Text>
                  <View style={styles.featMetaRow}>
                    {stateName && <Text style={styles.featMeta}>{stateName}</Text>}
                    <Text style={[styles.featDiff, { color: DIFF_COLORS[dest.difficulty] || "#fff" }]}>{dest.difficulty}</Text>
                    {dest.elevation_m && <Text style={styles.featMeta}>{dest.elevation_m.toLocaleString()}m</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Discover */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { paddingHorizontal: spacing.lg }]}>Discover</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 10, marginTop: spacing.md }}>
          {DISCOVER_ITEMS.map((item) => (
            <TouchableOpacity key={item.label} style={styles.discoverCard} onPress={() => router.push(item.route as any)} activeOpacity={0.85}>
              <View style={[styles.discoverIconWrap, { backgroundColor: item.color + "20" }]}>
                <Text style={{ fontSize: 22 }}>{item.icon}</Text>
              </View>
              <Text style={styles.discoverLabel}>{item.label}</Text>
              {item.sub ? <Text style={styles.discoverSub}>{item.sub}</Text> : null}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Upcoming Festivals */}
      {festivals.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Upcoming Festivals</Text>
              <Text style={styles.sectionSub}>Time your trip around these</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/festivals" as any)}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          {festivals.map((f: any) => {
            const destName = Array.isArray(f.destinations) ? f.destinations[0]?.name : f.destinations?.name;
            return (
              <TouchableOpacity key={f.id} style={styles.festCard} onPress={() => router.push(`/destination/${f.destination_id}` as any)} activeOpacity={0.85}>
                <View style={[styles.festMonth, { backgroundColor: SCORE_COLORS[4] + "20" }]}>
                  <Text style={[styles.festMonthText, { color: SCORE_COLORS[4] }]}>{MONTH_SHORT[f.month]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.festName}>{f.name}</Text>
                  <View style={styles.festMetaRow}>
                    {destName && <Text style={styles.festDest}>{destName}</Text>}
                    {f.approximate_date && <Text style={styles.festDate}>{f.approximate_date}</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Quick actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { paddingHorizontal: spacing.lg }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[
            { label: "Explore All", icon: "🗺️", route: "/(tabs)/explore" },
            { label: "AI Planner", icon: "🤖", route: "/(tabs)/plan" },
            { label: "Saved", icon: "❤️", route: "/(tabs)/saved" },
            { label: "About", icon: "ℹ️", route: "/about" },
          ].map((action) => (
            <TouchableOpacity key={action.label} style={styles.actionCard} onPress={() => router.push(action.route as any)} activeOpacity={0.85}>
              <Text style={{ fontSize: 26 }}>{action.icon}</Text>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ height: spacing.xxl * 2 }} />
      <SearchOverlay visible={searchOpen} onClose={() => setSearchOpen(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Hero
  hero: { paddingHorizontal: spacing.lg, paddingTop: spacing.xxl, paddingBottom: spacing.lg },
  heroTag: { fontSize: 10, fontWeight: "700", letterSpacing: 3, color: colors.vermillion, marginBottom: spacing.sm },
  heroTitle: { fontSize: 42, fontWeight: "800", color: colors.foreground, letterSpacing: -1.5 },
  heroSubtitle: { fontSize: fontSize["2xl"], fontWeight: "600", color: colors.mutedForeground, marginTop: 2 },
  heroDesc: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.md, lineHeight: 22, maxWidth: 320 },
  searchPill: { flexDirection: "row", alignItems: "center", marginTop: spacing.lg, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 12, gap: spacing.sm },
  searchPillIcon: { fontSize: 14 },
  searchPillText: { fontSize: fontSize.sm, color: colors.mutedForeground, flex: 1 },

  // Stats
  statsRow: { flexDirection: "row", paddingHorizontal: spacing.lg, gap: spacing.sm },
  statCard: { flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.md, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  statNum: { fontSize: fontSize.lg, fontWeight: "800", color: colors.primary, fontVariant: ["tabular-nums"] },
  statLabel: { fontSize: 10, color: colors.mutedForeground, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 },

  // SOS
  sosCard: { flexDirection: "row", alignItems: "center", marginHorizontal: spacing.lg, marginTop: spacing.lg, backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.vermillion + "30", gap: spacing.md },
  sosIcon: { fontSize: 28 },
  sosTitle: { fontSize: fontSize.sm, fontWeight: "700", color: colors.vermillion },
  sosSub: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  sosArrow: { fontSize: fontSize.lg, color: colors.mutedForeground },

  // Sections
  section: { marginTop: spacing.xl },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  sectionTitle: { fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground },
  sectionSub: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  seeAll: { fontSize: fontSize.sm, color: colors.score4, fontWeight: "600" },

  // Featured cards
  featCard: { width: width * 0.72, height: 220, borderRadius: borderRadius.lg, overflow: "hidden", marginRight: spacing.sm, backgroundColor: colors.card },
  featImage: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  featGradient: { ...StyleSheet.absoluteFillObject, backgroundColor: "transparent", backgroundImage: undefined },
  featScore: { position: "absolute", top: 12, right: 12, borderRadius: borderRadius.full, paddingHorizontal: 10, paddingVertical: 5 },
  featScoreText: { fontSize: fontSize.xs, fontWeight: "800", color: "#fff" },
  featContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: spacing.md, paddingTop: spacing.xxl, backgroundColor: "rgba(0,0,0,0.55)" },
  featName: { fontSize: fontSize.lg, fontWeight: "700", color: "#fff" },
  featMetaRow: { flexDirection: "row", gap: spacing.sm, marginTop: 4 },
  featMeta: { fontSize: fontSize.xs, color: "rgba(255,255,255,0.7)" },
  featDiff: { fontSize: fontSize.xs, fontWeight: "700", textTransform: "capitalize" },

  // Discover
  discoverCard: { width: 88, alignItems: "center", gap: 6 },
  discoverIconWrap: { width: 52, height: 52, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  discoverLabel: { fontSize: 11, fontWeight: "700", color: colors.foreground },
  discoverSub: { fontSize: 10, color: colors.mutedForeground, marginTop: -2 },

  // Festivals
  festCard: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginHorizontal: spacing.lg, backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginTop: spacing.sm, borderWidth: 1, borderColor: colors.border },
  festMonth: { borderRadius: borderRadius.sm, paddingHorizontal: 10, paddingVertical: 6, alignItems: "center" },
  festMonthText: { fontSize: fontSize.xs, fontWeight: "700" },
  festName: { fontSize: fontSize.sm, fontWeight: "700", color: colors.foreground },
  festMetaRow: { flexDirection: "row", gap: spacing.sm, marginTop: 3 },
  festDest: { fontSize: fontSize.xs, color: colors.mutedForeground },
  festDate: { fontSize: fontSize.xs, color: colors.mutedForeground, opacity: 0.7 },

  // Actions
  actionsGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md, paddingHorizontal: spacing.lg },
  actionCard: { width: (width - spacing.lg * 2 - spacing.sm) / 2, backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.lg, alignItems: "center", gap: spacing.sm, borderWidth: 1, borderColor: colors.border },
  actionLabel: { fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground },
});
