"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FadeIn, HoverCard, StaggerContainer, StaggerItem } from "./animated-hero";

export function PlanContent() {
  const locale = useLocale();
  const tn = useTranslations("nav");

  const features = [
    { icon: "📍", title: "Where from?", desc: "Delhi, Mumbai, Bangalore..." },
    { icon: "📅", title: "How many days?", desc: "3 days to 180 days" },
    { icon: "💰", title: "Budget?", desc: "Backpacker / Mid / Luxury" },
    { icon: "👶", title: "Kids with you?", desc: "Yes / No + ages" },
    { icon: "🎯", title: "Travel style?", desc: "Biker / Family / Adventure / Spiritual..." },
    { icon: "🌤️", title: "What month?", desc: "Weather-optimized destinations" },
  ];

  return (
    <>
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{tn("planTrip")}</h1>
          <p className="mt-1 text-muted-foreground">
            Tell us what you love — we'll plan the perfect trip
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="rounded-2xl border border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-8 mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">
            AI-Powered Trip Planning — Coming Soon
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Our AI trip planner will ask you:</p>
          <StaggerContainer className="grid gap-3 sm:grid-cols-2" staggerDelay={0.08}>
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{f.icon}</span>
                    <div className="font-medium text-foreground">{f.title}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 ml-8">{f.desc}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <p className="mt-6 text-sm text-muted-foreground">
            → Day-by-day itinerary with stays, costs, safety data, and packing lists.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <h2 className="text-xl font-semibold mb-4">In the meantime</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <HoverCard>
            <Link href={`/${locale}/routes`} className="block rounded-xl border border-border p-5 hover:border-primary/50 transition-colors">
              <div className="font-mono text-2xl font-bold text-primary">14</div>
              <div className="font-semibold mt-1">Curated Routes</div>
              <div className="text-sm text-muted-foreground mt-1">3-day weekends to 12-day road trips</div>
            </Link>
          </HoverCard>
          <HoverCard>
            <Link href={`/${locale}/explore`} className="block rounded-xl border border-border p-5 hover:border-primary/50 transition-colors">
              <div className="font-mono text-2xl font-bold text-primary">66</div>
              <div className="font-semibold mt-1">Destinations</div>
              <div className="text-sm text-muted-foreground mt-1">Filter by month, state, difficulty, kids</div>
            </Link>
          </HoverCard>
        </div>
      </FadeIn>
    </>
  );
}
