"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { m as motion, AnimatePresence } from "framer-motion";

interface QuizAnswers {
  travelerType: string;
  vibe: string;
  duration: string;
  month: number;
  kids: boolean;
}

const STEPS = [
  {
    question: "Who's traveling?",
    key: "travelerType" as const,
    options: [
      { id: "solo", label: "Solo", icon: "🎒", desc: "Just me and the mountains" },
      { id: "couple", label: "Couple", icon: "💑", desc: "Romantic getaway" },
      { id: "family", label: "Family", icon: "👨‍👩‍👧", desc: "Kids are coming" },
      { id: "friends", label: "Friends", icon: "🎉", desc: "Squad trip" },
      { id: "biker", label: "Biker", icon: "🏍️", desc: "Two wheels, open road" },
    ],
  },
  {
    question: "What's your vibe?",
    key: "vibe" as const,
    options: [
      { id: "adventure", label: "Adventure", icon: "⛰️", desc: "Treks, rapids, heights" },
      { id: "spiritual", label: "Spiritual", icon: "🕉️", desc: "Temples, ashrams, peace" },
      { id: "chill", label: "Relax", icon: "☕", desc: "Cafes, views, doing nothing" },
      { id: "offbeat", label: "Offbeat", icon: "🗺️", desc: "Where nobody goes" },
      { id: "culture", label: "Culture", icon: "🏛️", desc: "Forts, food, festivals" },
    ],
  },
  {
    question: "How many days?",
    key: "duration" as const,
    options: [
      { id: "weekend", label: "Weekend", icon: "📅", desc: "3-4 days" },
      { id: "week", label: "A week", icon: "🗓️", desc: "5-7 days" },
      { id: "long", label: "10+ days", icon: "✈️", desc: "Proper adventure" },
    ],
  },
];

const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function PersonalisationQuiz() {
  const locale = useLocale();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    month: new Date().getMonth() + 1,
    kids: false,
  });
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    // Show quiz only on first visit
    const seen = localStorage.getItem("quizSeen");
    if (!seen) {
      const timer = setTimeout(() => setShow(true), 3000); // 3s delay
      return () => clearTimeout(timer);
    }
  }, []);

  function selectOption(key: string, value: string) {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (key === "travelerType" && value === "family") {
      updated.kids = true;
    }

    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      // Generate results
      generateResults(updated as QuizAnswers);
    }
  }

  function generateResults(a: QuizAnswers) {
    // Simple matching logic — map vibes to tags
    const tagMap: Record<string, string[]> = {
      adventure: ["trek", "adventure", "biker", "offbeat"],
      spiritual: ["spiritual", "pilgrimage"],
      chill: ["scenic", "romantic", "peaceful"],
      offbeat: ["offbeat", "hidden"],
      culture: ["heritage", "food", "cultural"],
    };

    // Build explore URL with filters
    const params = new URLSearchParams();
    params.set("month", String(a.month));
    if (a.kids) params.set("kids", "true");

    const diffMap: Record<string, string> = {
      weekend: "easy",
      week: "",
      long: "",
    };
    if (diffMap[a.duration]) params.set("difficulty", diffMap[a.duration]);

    setResults([
      `/${locale}/explore?${params.toString()}`,
      `/${locale}/plan`,
    ]);

    localStorage.setItem("quizSeen", "true");
    localStorage.setItem("quizAnswers", JSON.stringify(a));
  }

  function dismiss() {
    setShow(false);
    localStorage.setItem("quizSeen", "true");
  }

  if (!show) return null;

  return (
    <AnimatePresence>
      {/* Scrim — sits below tab bar (z-30) so nav stays usable */}
      <motion.div
        key="scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-30 bg-black/40 md:hidden"
        onClick={dismiss}
      />

      {/* Bottom sheet — above scrim (z-35) but below tab bar (z-40) */}
      <motion.div
        key="sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 500) dismiss();
        }}
        className="fixed bottom-0 left-0 right-0 z-[35] rounded-t-2xl border-t border-border bg-card shadow-2xl overflow-hidden md:hidden pb-safe"
        style={{ maxHeight: "70vh" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-muted mx-4 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${((step + 1) / (STEPS.length + 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="px-5 pt-4 pb-20 overflow-y-auto" style={{ maxHeight: "calc(70vh - 3rem)" }}>
          {/* Results screen */}
          {results.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-5"
            >
              <div className="text-3xl">🎯</div>
              <h2 className="text-xl font-semibold">Your matches are ready</h2>
              <p className="text-sm text-muted-foreground">
                Filtered the best destinations for you.
              </p>
              <div className="flex flex-col gap-2.5">
                <Link
                  href={results[0]}
                  onClick={dismiss}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
                >
                  Show me my matches →
                </Link>
                <Link
                  href={results[1]}
                  onClick={dismiss}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Or build an AI itinerary
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Question screens */
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] text-primary font-medium uppercase tracking-[0.08em]">
                    Step {step + 1} of {STEPS.length}
                  </p>
                  <button
                    onClick={dismiss}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                  >
                    Skip
                  </button>
                </div>
                <h2 className="text-xl font-semibold mb-4">{STEPS[step].question}</h2>

                <div className="grid grid-cols-2 gap-2.5">
                  {STEPS[step].options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => selectOption(STEPS[step].key, opt.id)}
                      className={`text-left rounded-xl border border-border p-3 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 ${
                        answers[STEPS[step].key as keyof QuizAnswers] === opt.id
                          ? "border-primary bg-primary/10"
                          : ""
                      }`}
                    >
                      <div className="text-lg mb-0.5">{opt.icon}</div>
                      <div className="font-semibold text-xs">{opt.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{opt.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Month selector on last step */}
                {step === STEPS.length - 1 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium mb-2">When?</p>
                    <div className="grid grid-cols-6 gap-1">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <button
                          key={m}
                          onClick={() => setAnswers({ ...answers, month: m })}
                          className={`rounded-lg py-1.5 text-[10px] font-medium transition-all ${
                            answers.month === m
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {MONTH_NAMES[m]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {/* Desktop: keep centered modal */}
      <motion.div
        key="desktop-scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] hidden md:flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors text-lg"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Progress bar */}
          <div className="h-1 bg-muted">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${((step + 1) / (STEPS.length + 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-6 sm:p-8">
            {results.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <div className="text-4xl">🎯</div>
                <h2 className="text-2xl font-semibold">Your matches are ready</h2>
                <p className="text-muted-foreground">
                  Based on your preferences, we've filtered the best destinations for you.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href={results[0]}
                    onClick={dismiss}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Show me my matches →
                  </Link>
                  <Link
                    href={results[1]}
                    onClick={dismiss}
                    className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors"
                  >
                    Or build an AI itinerary
                  </Link>
                </div>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs text-primary font-medium uppercase tracking-[0.08em] mb-2">
                    Step {step + 1} of {STEPS.length}
                  </p>
                  <h2 className="text-2xl font-semibold mb-6">{STEPS[step].question}</h2>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {STEPS[step].options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => selectOption(STEPS[step].key, opt.id)}
                        className={`text-left rounded-xl border border-border p-4 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group ${
                          answers[STEPS[step].key as keyof QuizAnswers] === opt.id
                            ? "border-primary bg-primary/10"
                            : ""
                        }`}
                      >
                        <div className="text-2xl mb-1">{opt.icon}</div>
                        <div className="font-semibold text-sm">{opt.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>

                  {step === STEPS.length - 1 && (
                    <div className="mt-6">
                      <p className="text-sm font-medium mb-2">When?</p>
                      <div className="grid grid-cols-6 gap-1.5">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                          <button
                            key={m}
                            onClick={() => setAnswers({ ...answers, month: m })}
                            className={`rounded-lg py-2 text-xs font-medium transition-all ${
                              answers.month === m
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted/50 text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {MONTH_NAMES[m]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {results.length === 0 && (
            <div className="border-t border-border px-6 py-3 text-center">
              <button
                onClick={dismiss}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip — I know what I want
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
