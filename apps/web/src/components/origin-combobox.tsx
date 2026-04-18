"use client";

import { useEffect, useRef, useState } from "react";
import { ORIGIN_CITIES, findCity, type OriginCity } from "@/lib/gap-year/origin-cities";

interface Props {
  value: OriginCity | null;
  onChange: (city: OriginCity | null) => void;
  placeholder?: string;
}

export function OriginCombobox({ value, onChange, placeholder = "Start typing your city…" }: Props) {
  const [query, setQuery] = useState(value?.name ?? "");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = query.trim() ? findCity(query) : ORIGIN_CITIES.slice(0, 8);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function select(city: OriginCity) {
    onChange(city);
    setQuery(city.name);
    setOpen(false);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[highlight]) select(results[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setHighlight(0);
          if (value && e.target.value !== value.name) onChange(null);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKey}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={open}
      />
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
          {results.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => select(c)}
                onMouseEnter={() => setHighlight(i)}
                className={`w-full text-left px-3 py-2 text-sm transition ${
                  i === highlight ? "bg-muted" : "hover:bg-muted/50"
                }`}
              >
                <div className="font-medium text-foreground">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.state}</div>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground">
          No match. Try a nearby major city.
        </div>
      )}
    </div>
  );
}
