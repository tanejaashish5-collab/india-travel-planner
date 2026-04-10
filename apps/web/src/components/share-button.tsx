"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ShareButton({ title, text, url }: { title: string; text: string; url?: string }) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("ui");
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  async function handleShare() {
    // Try native share (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {
        // User cancelled or error — fall through to WhatsApp
      }
    }

    // WhatsApp share
    const waText = encodeURIComponent(`${title}\n${text}\n${shareUrl}`);
    window.open(`https://wa.me/?text=${waText}`, "_blank");
  }

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16,6 12,2 8,6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        {t("share")}
      </button>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-all"
      >
        {copied ? t("copied") : t("copyLink")}
      </button>
    </div>
  );
}
