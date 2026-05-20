import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useDestinations, type Destination } from "../hooks/useDestinations";

// TODO: Replace banner with full implementation:
// 1. Persona grid — 2-column card layout, one card per persona (11 total).
//    Each card: icon/emoji, label, one-line tagline from PERSONA_ORDER on web.
// 2. Tap a persona card → push to /personas/[slug] detail screen that:
//    a. Shows a filtered FlatList of destinations matching that persona
//       (port matchDestinationsForPersona logic from apps/web/src/lib/personas.ts
//       or call a Supabase RPC that does the persona_blocks / best_for_segments filter)
//    b. Displays the hero stat (e.g. "142 of 478 destinations match")
//    c. Groups results by state_id with section headers
// 3. Search/filter within a persona's destination list
// 4. Tap a destination → router.push(`/destination/${id}`)
// 5. Consider reusing the web lib personas.ts by moving it to packages/shared

const PERSONAS: { slug: string; label: string; icon: string; tagline: string }[] = [
  { slug: "families",        label: "Families",          icon: "👨‍👩‍👧", tagline: "Kid-rated, altitude-safe, tantrum-minimal." },
  { slug: "bikers",          label: "Bikers",             icon: "🏍️", tagline: "High passes, permit routes, fuel stops mapped." },
  { slug: "nomads",          label: "Digital Nomads",     icon: "💻", tagline: "Connectivity scores, café culture, long-stay picks." },
  { slug: "elderly",         label: "Elderly",            icon: "🧓", tagline: "Low altitude, easy terrain, hospital access." },
  { slug: "photographers",   label: "Photographers",      icon: "📷", tagline: "Golden-hour windows, permit alerts, compositions." },
  { slug: "solo-female",     label: "Solo Female",        icon: "🚺", tagline: "Safety index per destination, verified monthly." },
  { slug: "honeymooners",    label: "Honeymooners",       icon: "💑", tagline: "Privacy, stay quality, clear seasonality." },
  { slug: "pilgrims",        label: "Pilgrims",           icon: "🛕", tagline: "Darshan timings, permit windows, access cutoffs." },
  { slug: "wellness",        label: "Wellness",           icon: "🧘", tagline: "Ayurveda retreats, altitude therapy, detox stays." },
  { slug: "culinary",        label: "Culinary",           icon: "🍛", tagline: "Heritage kitchens, GI-tag foods, market trails." },
  { slug: "nri-parents-visit", label: "NRI Parents",      icon: "✈️", tagline: "Accessibility, comfort infra, verified contacts." },
];

export default function PersonasScreen() {
  const { destinations, loading } = useDestinations();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <Stack.Screen options={{ title: "By Persona" }} />
      <ScrollView style={s.container} contentContainerStyle={s.content}>
        <View style={s.accentLine} />

        <Text style={s.heading}>Find your India.</Text>
        <Text style={s.subhead}>
          {PERSONAS.length} traveller types. {loading ? "…" : destinations.length} destinations
          matched against verified data — not editorial curation.
        </Text>

        {/* Coming soon banner */}
        <View style={s.banner}>
          <Text style={s.bannerKicker}>NATIVE PORT · IN PROGRESS</Text>
          <Text style={s.bannerTitle}>Persona browsing coming to the app.</Text>
          <Text style={s.bannerBody}>
            Tap a traveller type to see every matching destination with scores,
            grouped by state — all native, no browser.
          </Text>
          <TouchableOpacity
            style={s.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={s.backButtonText}>← Back to More</Text>
          </TouchableOpacity>
        </View>

        {/* Persona grid stub — 2 columns */}
        <View style={s.grid}>
          {PERSONAS.map((p) => (
            <TouchableOpacity
              key={p.slug}
              style={[s.card, selected === p.slug && s.cardSelected]}
              onPress={() => setSelected(selected === p.slug ? null : p.slug)}
              activeOpacity={0.75}
            >
              <Text style={s.cardIcon}>{p.icon}</Text>
              <Text style={s.cardLabel}>{p.label}</Text>
              <Text style={s.cardTagline} numberOfLines={2}>{p.tagline}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selected && (
          <View style={s.selectedNote}>
            <Text style={s.selectedNoteText}>
              Native destination list for <Text style={{ fontWeight: "700" }}>{selected}</Text> will
              load here — implementation pending.
            </Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },

  accentLine: {
    width: 40,
    height: 3,
    backgroundColor: colors.vermillion,
    borderRadius: 2,
    marginBottom: spacing.md,
  },

  heading: {
    fontSize: fontSize["3xl"],
    fontWeight: "700",
    color: colors.foreground,
    letterSpacing: -0.5,
  },
  subhead: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },

  banner: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 3,
    borderLeftColor: colors.vermillion,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  bannerKicker: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.vermillion,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: spacing.xs,
  },
  bannerTitle: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  bannerBody: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  backButton: {
    backgroundColor: colors.muted,
    borderRadius: borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.foreground,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  card: {
    width: "47%",
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  cardSelected: {
    borderColor: colors.vermillion,
    backgroundColor: colors.vermillion + "0a",
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  cardLabel: {
    fontSize: fontSize.base,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: 2,
  },
  cardTagline: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    lineHeight: 16,
  },

  selectedNote: {
    backgroundColor: colors.muted,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  selectedNoteText: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 20,
  },
});
