import fs from "node:fs";
import path from "node:path";
import { tabs } from "../lib/nav";

const root = path.join(__dirname, "..", "content");

function titleCase(s: string) {
  return s
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

for (const tab of tabs) {
  const tabDir = path.join(root, tab.slug);
  fs.mkdirSync(tabDir, { recursive: true });

  for (const group of tab.groups) {
    for (const item of group.items) {
      const filePath = path.join(tabDir, `${item.slug}.mdx`);
      if (fs.existsSync(filePath)) continue;

      const title = item.title === "Overview" ? `${tab.title} overview` : item.title;
      const description = `${titleCase(item.slug)} guidance for ${tab.title.toLowerCase()} in Ribbon.`;

      const body = `---
title: "${title}"
description: "${description}"
---

${description}

## Overview

This page covers **${title.toLowerCase()}** as part of the ${tab.title} section. Replace this
placeholder copy with real product documentation — the surrounding shell (header, sidebar,
table of contents, and page toolbar) will keep working exactly the same.

## Key concepts

- Understand how ${item.slug.replace(/-/g, " ")} fits into ${tab.title.toLowerCase()}.
- Every heading on this page automatically shows up in the **On this page** panel on the right.
- Sidebar entries, active states, and scroll-spy all key off the heading IDs generated at build time.

## Getting started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open the dev server and navigate to this page from the sidebar to see it live.
`;

      fs.writeFileSync(filePath, body, "utf-8");
    }
  }
}

console.log("Content generated.");
