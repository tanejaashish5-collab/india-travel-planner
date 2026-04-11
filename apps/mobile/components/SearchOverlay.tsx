import { useEffect, useRef, useState, useCallback } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";

interface SearchOverlayProps {
  visible: boolean;
  onClose: () => void;
}

interface Destination {
  id: string;
  name: string;
  state: { name: string } | null;
  difficulty: string | null;
}
interface Trek {
  id: string;
  name: string;
  difficulty: string | null;
}
interface Route {
  id: string;
  name: string;
}
interface Collection {
  id: string;
  name: string;
}
interface Article {
  slug: string;
  title: string;
  category: string | null;
}

type ResultItem =
  | { type: "destination"; data: Destination }
  | { type: "trek"; data: Trek }
  | { type: "route"; data: Route }
  | { type: "collection"; data: Collection }
  | { type: "article"; data: Article };

const ICONS: Record<string, string> = {
  destination: "📍",
  trek: "🥾",
  route: "🛣️",
  collection: "📦",
  article: "📝",
};

function getSubtitle(item: ResultItem): string {
  switch (item.type) {
    case "destination":
      return item.data.state?.name ?? "";
    case "trek":
      return item.data.difficulty ?? "";
    case "article":
      return item.data.category ?? "";
    default:
      return "";
  }
}

function navigateToItem(item: ResultItem) {
  switch (item.type) {
    case "destination":
      router.push(`/destination/${item.data.id}` as any);
      break;
    case "trek":
      router.push(`/trek/${item.data.id}` as any);
      break;
    case "route":
      router.push(`/route/${item.data.id}` as any);
      break;
    case "collection":
      router.push(`/collection/${item.data.id}` as any);
      break;
    case "article":
      router.push(`/blog/${item.data.slug}` as any);
      break;
  }
}

export default function SearchOverlay({ visible, onClose }: SearchOverlayProps) {
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState("");

  // Cached index
  const [destinations, setDestinations] = useState<Destination[] | null>(null);
  const [treks, setTreks] = useState<Trek[] | null>(null);
  const [routes, setRoutes] = useState<Route[] | null>(null);
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch index on first open
  useEffect(() => {
    if (!visible || loaded) return;
    setLoading(true);
    Promise.all([
      supabase.from("destinations").select("id, name, state:states(name), difficulty"),
      supabase.from("treks").select("id, name, difficulty"),
      supabase.from("routes").select("id, name"),
      supabase.from("collections").select("id, name"),
    ]).then(([dRes, tRes, rRes, cRes]) => {
      setDestinations((dRes.data as Destination[]) ?? []);
      setTreks((tRes.data as Trek[]) ?? []);
      setRoutes((rRes.data as Route[]) ?? []);
      setCollections((cRes.data as Collection[]) ?? []);
      setLoaded(true);
      setLoading(false);
    });
  }, [visible, loaded]);

  // Auto-focus
  useEffect(() => {
    if (visible) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [visible]);

  // Debounced article search
  useEffect(() => {
    if (!query.trim()) {
      setArticles([]);
      return;
    }
    const timer = setTimeout(() => {
      supabase
        .from("articles")
        .select("slug, title, category")
        .ilike("title", `%${query}%`)
        .limit(5)
        .then(({ data }) => {
          setArticles((data as Article[]) ?? []);
        });
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filterByName = useCallback(
    <T extends { name: string }>(items: T[] | null, q: string, max = 5): T[] => {
      if (!items || !q.trim()) return [];
      const lower = q.toLowerCase();
      const out: T[] = [];
      for (const item of items) {
        if (item.name.toLowerCase().includes(lower)) {
          out.push(item);
          if (out.length >= max) break;
        }
      }
      return out;
    },
    []
  );

  const hasQuery = query.trim().length > 0;

  // Build sections
  const sections: { title: string; type: string; data: ResultItem[] }[] = [];

  if (hasQuery) {
    const fd = filterByName(destinations, query).map((d) => ({ type: "destination" as const, data: d }));
    if (fd.length) sections.push({ title: "Destinations", type: "destination", data: fd });

    const ft = filterByName(treks, query).map((t) => ({ type: "trek" as const, data: t }));
    if (ft.length) sections.push({ title: "Treks", type: "trek", data: ft });

    const fr = filterByName(routes, query).map((r) => ({ type: "route" as const, data: r }));
    if (fr.length) sections.push({ title: "Routes", type: "route", data: fr });

    const fc = filterByName(collections, query).map((c) => ({ type: "collection" as const, data: c }));
    if (fc.length) sections.push({ title: "Collections", type: "collection", data: fc });

    if (articles.length) {
      sections.push({
        title: "Articles",
        type: "article",
        data: articles.map((a) => ({ type: "article" as const, data: a })),
      });
    }
  }

  const hasResults = sections.length > 0;

  function handleSelect(item: ResultItem) {
    Keyboard.dismiss();
    onClose();
    navigateToItem(item);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={s.container}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.inputRow}>
            <Text style={s.searchIcon}>🔍</Text>
            <TextInput
              ref={inputRef}
              style={s.input}
              value={query}
              onChangeText={setQuery}
              placeholder="Search destinations, treks, routes..."
              placeholderTextColor={colors.mutedForeground}
              returnKeyType="search"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={onClose} style={s.closeBtn}>
              <Text style={s.closeTxt}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Body */}
        {loading && (
          <View style={s.center}>
            <ActivityIndicator color={colors.foreground} />
          </View>
        )}

        {!loading && !hasQuery && (
          <View style={s.center}>
            <Text style={s.emptyText}>
              Start typing to search {destinations?.length ?? 143} destinations, {treks?.length ?? 49} treks, and more...
            </Text>
          </View>
        )}

        {!loading && hasQuery && !hasResults && (
          <View style={s.center}>
            <Text style={s.emptyText}>No results for &apos;{query}&apos;</Text>
          </View>
        )}

        {!loading && hasResults && (
          <SectionList
            sections={sections}
            keyExtractor={(item, i) =>
              `${item.type}-${"id" in item.data ? item.data.id : (item.data as Article).slug}-${i}`
            }
            renderSectionHeader={({ section }) => (
              <View style={s.sectionHeader}>
                <Text style={s.sectionTitle}>{section.title}</Text>
              </View>
            )}
            renderItem={({ item }) => {
              const label = "name" in item.data ? item.data.name : (item.data as Article).title;
              const sub = getSubtitle(item);
              return (
                <TouchableOpacity style={s.row} activeOpacity={0.7} onPress={() => handleSelect(item)}>
                  <Text style={s.rowIcon}>{ICONS[item.type]}</Text>
                  <View style={s.rowText}>
                    <Text style={s.rowLabel} numberOfLines={1}>{label}</Text>
                    {sub ? <Text style={s.rowSub} numberOfLines={1}>{sub}</Text> : null}
                  </View>
                </TouchableOpacity>
              );
            }}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.muted,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.foreground,
    fontSize: fontSize.base,
  },
  closeBtn: {
    marginLeft: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  closeTxt: {
    color: colors.vermillion,
    fontSize: fontSize.sm,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  emptyText: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    textAlign: "center",
    lineHeight: 22,
  },
  sectionHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  sectionTitle: {
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  rowIcon: {
    fontSize: 18,
    marginRight: spacing.sm + 4,
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    color: colors.foreground,
    fontSize: fontSize.base,
  },
  rowSub: {
    color: colors.mutedForeground,
    fontSize: fontSize.xs,
    marginTop: 2,
  },
});
