"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface Alternative {
  alternative_destination_id: string;
  distance_km: number;
  drive_time: string;
  why_better: string;
  comparison: string;
  rank: number;
  destination?: {
    name: string;
    tagline: string;
    difficulty: string;
    elevation_m: number;
  };
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400",
  moderate: "text-yellow-400",
  hard: "text-orange-400",
};

export function TouristTrapIntervention({
  trapName,
  alternatives,
}: {
  trapName: string;
  alternatives: Alternative[];
}) {
  const locale = useLocale();
  const [dismissed, setDismissed] = useState(false);

  if (alternatives.length === 0 || dismissed) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          className="relative mb-8 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-orange-500/5"
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-[80px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-orange-500/10 blur-[60px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />

          <div className="relative z-10 p-6 sm:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-8"
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs uppercase tracking-[0.3em] text-primary/70 mb-3"
              >
                Before you decide
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-2xl sm:text-3xl font-bold"
              >
                Everyone goes to{" "}
                <span className="text-muted-foreground line-through decoration-primary/50 decoration-2">
                  {trapName}
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl sm:text-2xl font-bold text-primary mt-1"
              >
                Here's what they miss.
              </motion.p>
            </motion.div>

            {/* Alternative cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {alternatives
                .sort((a, b) => a.rank - b.rank)
                .map((alt, idx) => {
                  const dest = alt.destination;
                  return (
                    <motion.div
                      key={alt.alternative_destination_id}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30, y: 20 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{
                        delay: 0.8 + idx * 0.15,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <Link
                        href={`/${locale}/destination/${alt.alternative_destination_id}`}
                        className="group block h-full"
                      >
                        <motion.div
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="h-full rounded-xl border border-border bg-card/80 backdrop-blur-sm p-5 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                        >
                          {/* Badge */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/30 px-2.5 py-0.5 text-xs font-medium text-primary">
                              <motion.span
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: idx * 0.5,
                                }}
                                className="h-1.5 w-1.5 rounded-full bg-primary"
                              />
                              {alt.drive_time} away
                            </span>
                            {dest?.difficulty && (
                              <span
                                className={`text-xs capitalize ${DIFFICULTY_COLORS[dest.difficulty] ?? ""}`}
                              >
                                {dest.difficulty}
                              </span>
                            )}
                          </div>

                          {/* Name */}
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                            {dest?.name ??
                              alt.alternative_destination_id
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                          </h3>

                          {/* Why better */}
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {alt.why_better}
                          </p>

                          {/* Comparison */}
                          {alt.comparison && (
                            <div className="mt-3 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground italic">
                              "{alt.comparison}"
                            </div>
                          )}

                          {/* CTA */}
                          <div className="mt-3 text-xs font-medium text-primary group-hover:underline">
                            Explore {dest?.name ?? "this"} →
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
            </div>

            {/* Dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-center mt-8"
            >
              <button
                onClick={() => setDismissed(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Still want {trapName}? No problem — scroll down ↓
              </button>
              <p className="text-[10px] text-muted-foreground/50 mt-1">
                At least now you know what's out there.
              </p>
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
