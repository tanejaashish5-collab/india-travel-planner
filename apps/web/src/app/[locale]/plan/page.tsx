import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PlanContent } from "@/components/plan-content";

export default function PlanTripPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <PlanContent />
      </main>
      <Footer />
    </div>
  );
}
