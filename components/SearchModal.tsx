"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, CornerDownLeft, ArrowUp, ArrowDown } from "lucide-react";
import { useUIState } from "./UIStateProvider";

type SearchEntry = {
  title: string;
  tabTitle: string;
  href: string;
  section?: string;
  snippet: string;
};

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-sm bg-accent-soft text-accent">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useUIState();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen && index.length === 0) {
      fetch("/search-index.json")
        .then((r) => r.json())
        .then(setIndex)
        .catch(() => setIndex([]));
    }
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setQuery("");
      setActiveIndex(0);
    }
  }, [searchOpen, index.length]);

  const results = useMemo(() => {
    if (!query.trim()) return index.slice(0, 8);
    const q = query.toLowerCase();
    return index
      .map((entry) => {
        const titleMatch = entry.title.toLowerCase().includes(q);
        const snippetMatch = entry.snippet.toLowerCase().includes(q);
        const score = titleMatch ? 2 : snippetMatch ? 1 : 0;
        return { entry, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map((r) => r.entry);
  }, [query, index]);

  function navigate(href: string) {
    setSearchOpen(false);
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) navigate(item.href);
    }
  }

  if (!searchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[10vh]"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-ink-200 px-4 py-3">
          <Search size={18} className="text-ink-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search docs..."
            className="flex-1 text-[15px] outline-none placeholder:text-ink-500"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="rounded-md p-1 text-ink-500 hover:bg-ink-100"
            aria-label="Close search"
          >
            <X size={17} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-ink-500">
              No results found.
            </p>
          )}
          {results.map((entry, i) => (
            <button
              key={entry.href + entry.title}
              onClick={() => navigate(entry.href)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left ${
                i === activeIndex ? "bg-accent-soft" : ""
              }`}
            >
              <span className="text-[11px] font-medium uppercase tracking-wide text-ink-500">
                {entry.tabTitle}
                {entry.section ? ` / ${entry.section}` : ""}
              </span>
              <span className="text-[14px] font-medium text-ink-900">
                {highlight(entry.title, query)}
              </span>
              {entry.snippet && (
                <span className="line-clamp-1 text-[13px] text-ink-500">
                  {highlight(entry.snippet, query)}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-ink-200 px-4 py-2 text-[12px] text-ink-500">
          <span className="flex items-center gap-1">
            <ArrowUp size={12} /> <ArrowDown size={12} /> Navigate
          </span>
          <span className="flex items-center gap-1">
            <CornerDownLeft size={12} /> Select
          </span>
          <span className="ml-auto">Esc to close</span>
        </div>
      </div>
    </div>
  );
}
