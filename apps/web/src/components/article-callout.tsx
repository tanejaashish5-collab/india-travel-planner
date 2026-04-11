"use client";

interface CalloutProps {
  type: "stat" | "pull_quote" | "verdict";
  text: string;
  label?: string;
}

export function ArticleCallout({ type, text, label }: CalloutProps) {
  if (type === "stat") {
    return (
      <div className="my-8 rounded-xl border-l-4 border-[#E55642] bg-[#1a1a18] p-6 sm:p-8">
        <div className="text-3xl sm:text-4xl font-bold text-[#F5F1E8] font-mono tracking-tight">
          {text}
        </div>
        {label && (
          <div className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">
            {label}
          </div>
        )}
      </div>
    );
  }

  if (type === "pull_quote") {
    return (
      <div className="my-8 rounded-xl border-l-4 border-muted-foreground/30 bg-[#1a1a18]/60 p-6 sm:p-8 relative">
        <span className="absolute top-3 left-4 text-5xl text-muted-foreground/20 font-serif leading-none select-none">
          &ldquo;
        </span>
        <blockquote className="pl-6 text-lg sm:text-xl italic text-[#F5F1E8]/80 leading-relaxed">
          {text}
        </blockquote>
        {label && (
          <div className="mt-3 pl-6 text-sm text-muted-foreground">
            &mdash; {label}
          </div>
        )}
      </div>
    );
  }

  if (type === "verdict") {
    const isPositive =
      text.toLowerCase().includes("go") ||
      text.toLowerCase().includes("yes") ||
      text.toLowerCase().includes("recommended") ||
      text.toLowerCase().includes("worth") ||
      text.toLowerCase().includes("pick") ||
      text.toLowerCase().includes("winner");
    const isNegative =
      text.toLowerCase().includes("skip") ||
      text.toLowerCase().includes("avoid") ||
      text.toLowerCase().includes("no") ||
      text.toLowerCase().includes("overrated") ||
      text.toLowerCase().includes("trap");

    const borderColor = isNegative
      ? "border-red-500/60"
      : isPositive
        ? "border-emerald-500/60"
        : "border-amber-500/60";
    const bgColor = isNegative
      ? "bg-red-500/5"
      : isPositive
        ? "bg-emerald-500/5"
        : "bg-amber-500/5";
    const iconColor = isNegative
      ? "text-red-400"
      : isPositive
        ? "text-emerald-400"
        : "text-amber-400";

    return (
      <div
        className={`my-8 rounded-xl border-l-4 ${borderColor} ${bgColor} p-6 sm:p-8`}
      >
        <div className="flex items-start gap-3">
          <span className={`text-lg font-bold ${iconColor} shrink-0 mt-0.5`}>
            {isNegative ? "SKIP" : isPositive ? "GO" : "VERDICT"}
          </span>
          <div>
            <p className="font-bold text-[#F5F1E8] leading-relaxed">{text}</p>
            {label && (
              <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
