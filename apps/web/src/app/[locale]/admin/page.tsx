import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin",
  robots: "noindex, nofollow",
};

const SECTIONS = [
  { href: "/admin/sos", title: "SOS verification", desc: "Emergency contacts: re-verify + edit phone numbers per destination." },
  { href: "/admin/stay-picks", title: "Stay picks", desc: "Curated stay slots: publish, edit, reject." },
  { href: "/admin/reviews", title: "Reviews", desc: "User-submitted reviews: approve, reject." },
  { href: "/admin/questions", title: "Questions", desc: "User-submitted destination questions." },
  { href: "/admin/trip-reports", title: "Trip reports", desc: "User-submitted trip reports." },
  { href: "/admin/citations", title: "Citations", desc: "AI search citations log." },
  { href: "/admin/bot-traffic", title: "Bot traffic", desc: "AI bot crawl analytics." },
  { href: "/admin/newsletter", title: "Newsletter", desc: "Send the weekly digest, view subscriber stats." },
];

export default async function AdminIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Admin</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Internal tools. Each sub-page prompts for the admin key (NEWSLETTER_SEND_SECRET).
      </p>
      <ul className="space-y-3">
        {SECTIONS.map((s) => (
          <li key={s.href}>
            <Link
              href={`/${locale}${s.href}`}
              className="block rounded-lg border border-border p-4 hover:border-primary transition-colors"
            >
              <div className="text-base font-medium">{s.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
