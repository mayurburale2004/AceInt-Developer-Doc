"use client";

import { Children, isValidElement, useState, type ReactElement } from "react";
import clsx from "clsx";

export function CodeTab({
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function CodeTabs({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{
    label: string;
    children: React.ReactNode;
  }>[];
  const [active, setActive] = useState(0);

  if (items.length === 0) return null;

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-ink-200">
      <div className="flex gap-5 overflow-x-auto border-b border-ink-200 bg-white px-4">
        {items.map((item, i) => (
          <button
            key={item.props.label}
            onClick={() => setActive(i)}
            className={clsx(
              "relative shrink-0 whitespace-nowrap py-2.5 text-[12px] font-semibold uppercase tracking-wider transition-colors",
              active === i ? "text-accent" : "text-ink-500 hover:text-ink-900"
            )}
          >
            {item.props.label}
            {active === i && (
              <span className="absolute inset-x-0 -bottom-px h-[2px] bg-accent" />
            )}
          </button>
        ))}
      </div>
      <div className="bg-ink-100/30 p-4 text-[14px] leading-relaxed text-ink-700 [&>:last-child]:mb-0 [&_pre]:mb-0">
        {items[active]}
      </div>
    </div>
  );
}