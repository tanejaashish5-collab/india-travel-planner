import { redirect } from "next/navigation";

const MONTH_SLUGS = [
  "", "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

export default async function WhereToGoIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentMonth = MONTH_SLUGS[new Date().getMonth() + 1];
  redirect(`/${locale}/where-to-go/${currentMonth}`);
}
