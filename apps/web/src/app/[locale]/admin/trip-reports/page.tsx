import { AdminTripReportsClient } from "@/components/admin-trip-reports-client";

export const dynamic = "force-dynamic";

export default async function AdminTripReportsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <main className="min-h-screen">
      <AdminTripReportsClient />
    </main>
  );
}
