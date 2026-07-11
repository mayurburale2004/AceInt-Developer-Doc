import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Slugger from "github-slugger";
import { tabs } from "../lib/nav";

type SearchEntry = {
  title: string;
  tabTitle: string;
  href: string;
  section?: string;
  snippet: string;
};

const contentRoot = path.join(__dirname, "..", "content");
const entries: SearchEntry[] = [];

for (const tab of tabs) {
  for (const group of tab.groups) {
    for (const item of group.items) {
      const filePath = path.join(contentRoot, tab.slug, `${item.slug}.mdx`);
      if (!fs.existsSync(filePath)) continue;

      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const href = `/${tab.slug}/${item.slug}`;
      const slugger = new Slugger();

      // Page-level entry
      entries.push({
        title: (data.title as string) ?? item.title,
        tabTitle: tab.title,
        href,
        snippet: (data.description as string) ?? "",
      });

      // Heading-level entries so search can jump to a specific section
      const headingRegex = /^(#{2,3})\s+(.+)$/gm;
      let match: RegExpExecArray | null;
      while ((match = headingRegex.exec(content)) !== null) {
        const text = match[2].trim();
        const id = slugger.slug(text);
        entries.push({
          title: text,
          tabTitle: tab.title,
          href: `${href}#${id}`,
          section: (data.title as string) ?? item.title,
          snippet: "",
        });
      }
    }
  }
}

const outDir = path.join(__dirname, "..", "public");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "search-index.json"),
  JSON.stringify(entries, null, 2)
);

console.log(`Search index built with ${entries.length} entries.`);
