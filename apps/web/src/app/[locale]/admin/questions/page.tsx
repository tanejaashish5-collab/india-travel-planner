import { AdminQuestionsClient } from "@/components/admin-questions-client";

export const dynamic = "force-dynamic";

export default async function AdminQuestionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <main className="min-h-screen">
      <AdminQuestionsClient />
    </main>
  );
}
