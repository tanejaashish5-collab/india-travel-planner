import { AdminSosClient } from "@/components/admin-sos-client";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "SOS verification",
  robots: "noindex, nofollow",
};

export default async function AdminSosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <main className="min-h-screen">
      <AdminSosClient />
    </main>
  );
}
