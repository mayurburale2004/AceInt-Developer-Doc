"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import clsx from "clsx";

export function PageFeedback() {
  const [choice, setChoice] = useState<"up" | "down" | null>(null);

  return (
    <div className="mt-12 flex items-center justify-between border-t border-ink-200 pt-6">
      <span className="text-sm font-medium text-ink-900">Is this page helpful?</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setChoice("up")}
          className={clsx(
            "rounded-md p-1.5 hover:bg-ink-100",
            choice === "up" ? "text-accent" : "text-ink-500"
          )}
          aria-label="Yes, this page was helpful"
        >
          <ThumbsUp size={16} />
        </button>
        <button
          onClick={() => setChoice("down")}
          className={clsx(
            "rounded-md p-1.5 hover:bg-ink-100",
            choice === "down" ? "text-accent" : "text-ink-500"
          )}
          aria-label="No, this page was not helpful"
        >
          <ThumbsDown size={16} />
        </button>
      </div>
    </div>
  );
}
