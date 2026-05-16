"use client";

import { useTranslations } from "next-intl";
import {
  type HonestScarcity,
  type HonestScarcitySlot,
  getHonestScarcitySlot,
} from "@/lib/honest-scarcity";

type Props = {
  slot: HonestScarcitySlot;
  destinationName: string;
  honestScarcity: HonestScarcity | null | undefined;
};

export function HonestScarcityPanel({ slot, destinationName, honestScarcity }: Props) {
  const t = useTranslations("scarcity");
  const entry = getHonestScarcitySlot(honestScarcity, slot);
  if (!entry) return null;

  const body = t(`${slot}.${entry.category}`, {
    destination: destinationName,
    base_town: entry.specifics.base_town ?? "",
    base_distance_km: entry.specifics.base_distance_km ?? 0,
  });
  const heading = t(`heading.${slot}`, { destination: destinationName });

  return (
    <div className="space-y-3">
      <h2 className="font-serif italic text-2xl sm:text-3xl">{heading}</h2>
      <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        {body}
      </p>
      {entry.specifics.note && (
        <p className="max-w-2xl border-l-2 border-border pl-3 text-[12px] leading-relaxed text-muted-foreground/70">
          {entry.specifics.note}
        </p>
      )}
    </div>
  );
}
