import { redirect } from "next/navigation";
import { currentMonthSlugIST } from "@itp/shared";

export default async function WhereToGoIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/where-to-go/${currentMonthSlugIST()}`);
}
