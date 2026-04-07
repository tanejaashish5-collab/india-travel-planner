import { Nav } from "@/components/nav";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";

async function getCollection(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("collections")
    .select("*")
    .eq("id", id)
    .single();
  if (!data) return null;

  // Fetch destination details for each item
  const destIds = (data.items ?? []).map((i: any) => i.destination_id);
  const { data: dests } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, state:states(name)")
    .in("id", destIds);

  return { ...data, destinations: dests ?? [] };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const collection = await getCollection(id);
  if (!collection) notFound();

  const items = collection.items ?? [];
  const destMap = Object.fromEntries(
    (collection.destinations ?? []).map((d: any) => [d.id, d]),
  );

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-muted-foreground">
          <Link
            href={`/${locale}/collections`}
            className="hover:text-foreground"
          >
            Collections
          </Link>
          {" → "}
          <span className="text-foreground">{collection.name}</span>
        </div>

        <h1 className="text-3xl font-bold">{collection.name}</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          {collection.description}
        </p>

        <div className="mt-8 space-y-4">
          {items.map((item: any, idx: number) => {
            const dest = destMap[item.destination_id];
            const stateName = dest?.state
              ? Array.isArray(dest.state)
                ? dest.state[0]?.name
                : dest.state.name
              : "";

            return (
              <Link
                key={item.destination_id}
                href={`/${locale}/destination/${item.destination_id}`}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {dest?.name ?? item.destination_id}
                  </h3>
                  {stateName && (
                    <p className="text-xs text-muted-foreground">{stateName}</p>
                  )}
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.note}
                  </p>
                </div>
                {dest?.elevation_m && (
                  <span className="text-xs font-mono text-muted-foreground">
                    {dest.elevation_m}m
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
