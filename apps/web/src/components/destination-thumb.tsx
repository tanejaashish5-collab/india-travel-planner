"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * 40x40 destination thumbnail with a letter-avatar fallback when the image
 * 404s. Tiny client island so blog-article.tsx can stay a server component.
 */
export function DestinationThumb({ id, name }: { id: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
        {name.charAt(0)}
      </div>
    );
  }
  return (
    <Image
      src={`/images/destinations/${id}.jpg`}
      alt={name}
      width={40}
      height={40}
      className="rounded-lg object-cover shrink-0"
      onError={() => setFailed(true)}
    />
  );
}
