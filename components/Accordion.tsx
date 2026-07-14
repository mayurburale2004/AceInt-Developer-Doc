"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export function AccordionGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose mb-6 divide-y divide-ink-200 rounded-lg border border-ink-200">
      {children}
    </div>
  );
}

export function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-[14.5px] font-medium text-ink-900 hover:bg-ink-100/60"
      >
        {title}
        <ChevronDown
          size={16}
          className={clsx(
            "shrink-0 text-ink-500 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 text-[14px] leading-relaxed text-ink-700 [&>:last-child]:mb-0">
          {children}
        </div>
      )}
    </div>
  );
}