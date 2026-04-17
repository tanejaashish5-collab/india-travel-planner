import { AdminNewsletter } from "./admin-newsletter";

export const dynamic = "force-dynamic";
export const metadata = { robots: "noindex, nofollow" };

export default function AdminNewsletterPage() {
  return <AdminNewsletter />;
}
