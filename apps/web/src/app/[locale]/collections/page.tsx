import { Nav } from "@/components/nav";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useLocale, useTranslations } from "next-intl";

async function getCollections() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("collections")
    .select("*")
    .order("name");
  return data ?? [];
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <CollectionsContent collections={collections} />
      </main>
    </div>
  );
}

function CollectionsContent({ collections }: { collections: any[] }) {
  const locale = useLocale();
  const tn = useTranslations("nav");

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{tn("collections")}</h1>
        <p className="mt-1 text-muted-foreground">
          Curated lists of India's most special places — beautiful villages,
          last villages, dangerous roads, and more
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c: any) => {
          const items = c.items ?? [];
          return (
            <Link
              key={c.id}
              href={`/${locale}/collections/${c.id}`}
              className="group block rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {c.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {c.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{items.length} places</span>
                <div className="flex gap-1">
                  {(c.tags ?? []).slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {collections.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          <p>No collections found. Check Supabase connection.</p>
        </div>
      )}
    </>
  );
}
