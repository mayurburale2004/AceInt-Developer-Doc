"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function colorFor(code: number) {
  if (code >= 200 && code < 300) return { color: "#15803d", background: "#f0fdf4" }; // green
  if (code >= 300 && code < 400) return { color: "#1d4ed8", background: "#eff6ff" }; // blue
  if (code >= 400 && code < 500) return { color: "#b45309", background: "#fffbeb" }; // amber
  if (code >= 500) return { color: "#b91c1c", background: "#fef2f2" }; // red
  return null;
}

export function StatusCodeEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    // Only inline code (`200 OK`), not inside fenced code blocks
    const inlineCodes = document.querySelectorAll<HTMLElement>(
      ".docs-prose code:not(pre code):not([data-status-enhanced])"
    );

    inlineCodes.forEach((el) => {
      const match = el.textContent?.trim().match(/^([1-5]\d{2})\b/);
      if (!match) return;

      const code = parseInt(match[1], 10);
      const colors = colorFor(code);
      if (!colors) return;

      el.setAttribute("data-status-enhanced", "true");
      el.style.color = colors.color;
      el.style.backgroundColor = colors.background;
      el.style.fontWeight = "600";
    });
  }, [pathname]);

  return null;
}