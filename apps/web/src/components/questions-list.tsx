import Link from "next/link";

const CATEGORY_LABEL: Record<string, string> = {
  safety: "Safety",
  cost: "Cost",
  permits: "Permits",
  family: "Family",
  transport: "Transport",
  timing: "Timing",
  practical: "Practical",
  weather: "Weather",
};

type QuestionRow = {
  id: string;
  slug: string;
  question: string;
  answer: string;
  category: string;
  traveler_type: string | null;
  answered_at: string;
};

export function QuestionsList({
  questions,
  destinationId,
  locale,
}: {
  questions: QuestionRow[];
  destinationId: string;
  locale: string;
}) {
  if (!questions || questions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No questions answered yet. Be the first to ask one below.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {questions.map((q) => {
        const snippet = q.answer.length > 200 ? `${q.answer.slice(0, 200).trim()}…` : q.answer;
        return (
          <li key={q.id}>
            <Link
              href={`/${locale}/destination/${destinationId}/q/${q.slug}`}
              className="block rounded-xl border border-border bg-background/40 p-4 hover:border-primary/40 transition-colors"
            >
              <div className="mb-2 flex flex-wrap items-baseline gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary">
                  {CATEGORY_LABEL[q.category] ?? q.category}
                </span>
                {q.traveler_type && (
                  <span className="rounded-full border border-border bg-background/40 px-2 py-0.5">
                    {q.traveler_type}
                  </span>
                )}
              </div>
              <p className="text-base font-medium leading-snug mb-1">{q.question}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{snippet}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
