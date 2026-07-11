"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, FileCode2, ChevronDown } from "lucide-react";

export function PageToolbar({ raw }: { raw: string }) {
  const [copied, setCopied] = useState(false);
  const [showMarkdown, setShowMarkdown] = useState(false);

  async function copyPage() {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className="relative">
      <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-ink-200 pb-4 text-[13px] text-ink-700">
        <button className="flex items-center gap-1.5 hover:text-ink-900" disabled>
          <Sparkles size={15} />
          Ask about this page
        </button>
        <span className="text-ink-200">|</span>
        <button className="flex items-center gap-1.5 hover:text-ink-900" disabled>
          <Sparkles size={15} />
          Ask AI
          <ChevronDown size={13} />
        </button>
        <span className="text-ink-200">|</span>
        <button onClick={copyPage} className="flex items-center gap-1.5 hover:text-ink-900">
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy page"}
        </button>
        <span className="text-ink-200">|</span>
        <button
          onClick={() => setShowMarkdown((v) => !v)}
          className="flex items-center gap-1.5 hover:text-ink-900"
        >
          <FileCode2 size={15} />
          View markdown
        </button>
      </div>

      {showMarkdown && (
        <pre className="mb-8 -mt-4 max-h-[420px] overflow-auto rounded-lg border border-ink-200 bg-ink-100/60 p-4 text-[12.5px] leading-relaxed text-ink-700">
          {raw}
        </pre>
      )}
    </div>
  );
}
