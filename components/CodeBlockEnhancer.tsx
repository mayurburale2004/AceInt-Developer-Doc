"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const COPY_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

const CHECK_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

export function CodeBlockEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLPreElement>(
      ".docs-prose pre:not([data-enhanced]), .bg-ink-100\\/30 pre:not([data-enhanced])"
    );

    blocks.forEach((pre) => {
      pre.setAttribute("data-enhanced", "true");

      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", "Copy code");
      button.className =
        "absolute right-2.5 top-2.5 rounded-md p-1.5 text-ink-500 opacity-0 transition-opacity hover:bg-ink-100 hover:text-ink-900 group-hover:opacity-100 focus:opacity-100";
      button.innerHTML = COPY_ICON;
      pre.style.position = "relative";
      pre.classList.add("group");

      button.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        const text = code?.textContent ?? "";
        try {
          await navigator.clipboard.writeText(text);
          button.innerHTML = CHECK_ICON;
          setTimeout(() => {
            button.innerHTML = COPY_ICON;
          }, 1500);
        } catch {
          // clipboard unavailable — no-op
        }
      });

      pre.appendChild(button);
    });
  }, [pathname]);

  return null;
}