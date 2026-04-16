import { redirect } from "next/navigation";

const MONTH_SLUGS = [
  "", "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

export default function WhereToGoIndex({ params }: { params: { locale: string } }) {
  const currentMonth = MONTH_SLUGS[new Date().getMonth() + 1];
  redirect(`/${params.locale}/where-to-go/${currentMonth}`);
}
