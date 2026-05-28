import type { Metadata } from "next";
import { WeekendFromView, weekendFromMetadata } from "@/components/weekend-from-view";

export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return weekendFromMetadata({ locale, city: "pune" });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <WeekendFromView locale={locale} city="pune" />;
}
