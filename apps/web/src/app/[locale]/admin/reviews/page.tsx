import { AdminReviewsClient } from "@/components/admin-reviews-client";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <main className="min-h-screen">
      <AdminReviewsClient />
    </main>
  );
}
