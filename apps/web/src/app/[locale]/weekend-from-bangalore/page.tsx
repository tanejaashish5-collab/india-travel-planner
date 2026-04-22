import type { Metadata } from "next";
import { WeekendFromView, weekendFromMetadata } from "@/components/weekend-from-view";

export const revalidate = 3600; // 1h — keeps month-rollover lag under ~1h (paired with IST-aware currentMonth in weekend-from-view)

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return weekendFromMetadata({ locale, city: "bangalore" });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <WeekendFromView locale={locale} city="bangalore" />;
}
