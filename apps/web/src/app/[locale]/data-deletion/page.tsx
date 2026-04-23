import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Data Deletion Request — NakshIQ",
  description:
    "Request deletion of your personal data from NakshIQ. We respect your privacy and will process all requests within 30 days.",

    ...localeAlternates(locale, "/data-deletion"),
  };
}export default function DataDeletionPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-semibold mb-2">Data Deletion Request</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Your data, your choice. We take this seriously.
        </p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">What data we store</h2>
            <p className="text-muted-foreground leading-relaxed">
              NakshIQ stores minimal user data. If you have created an account
              or signed in via a third-party service (such as Facebook or
              Google), we may store:
            </p>
            <ul className="text-muted-foreground mt-3 space-y-1.5 list-disc pl-5">
              <li>Your email address</li>
              <li>Your display name (if provided)</li>
              <li>Saved destinations and trip preferences</li>
              <li>Any safety reports you submitted</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We do not sell, share, or use your data for advertising. We do not
              store payment information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              How to request deletion
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To request complete deletion of your data from NakshIQ, send an
              email to:
            </p>
            <div className="mt-4 rounded-xl border border-border bg-card p-5">
              <p className="text-foreground font-medium">
                privacy@nakshiq.com
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Subject: Data Deletion Request
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Include the email address associated with your NakshIQ account. We
              will process your request and permanently delete all associated
              data within <strong className="text-foreground">30 days</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">What happens next</h2>
            <ul className="text-muted-foreground space-y-1.5 list-disc pl-5">
              <li>
                We will confirm receipt of your request within 48 hours
              </li>
              <li>
                All personal data linked to your account will be permanently
                deleted within 30 days
              </li>
              <li>
                This includes your account, saved items, preferences, and any
                submitted reports
              </li>
              <li>
                Once deleted, this action cannot be undone
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Third-party sign-in
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you signed in via Facebook, Google, or another provider,
              deleting your NakshIQ data does not affect your account with that
              provider. To revoke NakshIQ's access to your third-party account,
              visit that provider's app permissions settings directly.
            </p>
          </section>

          <div className="border-t border-border/30 pt-6">
            <p className="text-xs text-muted-foreground/50 leading-relaxed text-center">
              NakshIQ is committed to protecting your privacy. If you have
              questions about our data practices, contact us at
              privacy@nakshiq.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
