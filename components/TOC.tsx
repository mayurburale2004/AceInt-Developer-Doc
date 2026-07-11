"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export type Heading = { id: string; text: string; depth: 2 | 3 };

export function TOC({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden shrink-0 xl:block xl:w-[240px]">
      <div className="sticky top-[113px] max-h-[calc(100vh-113px)] overflow-y-auto py-8 pl-6">
        <p className="mb-3 text-[13px] font-semibold text-ink-900">On this page</p>
        <ul className="space-y-2 border-l border-ink-200">
          {headings.map((h) => (
            <li key={h.id} style={{ paddingLeft: h.depth === 3 ? "1.5rem" : "1rem" }}>
              <a
                href={`#${h.id}`}
                className={clsx(
                  "-ml-px block border-l-2 pl-3 text-[13px] leading-6 transition-colors",
                  activeId === h.id
                    ? "border-accent font-medium text-accent"
                    : "border-transparent text-ink-500 hover:text-ink-900"
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
