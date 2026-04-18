import { AdminStayPicksClient } from "@/components/admin-stay-picks-client";

export const dynamic = "force-dynamic";

export default async function AdminStayPicksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale unused but satisfies the async signature
  return (
    <main className="min-h-screen">
      <AdminStayPicksClient />
    </main>
  );
}
