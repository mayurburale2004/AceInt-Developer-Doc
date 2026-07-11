import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Slugger from "github-slugger";
import { Heading } from "@/components/TOC";

const contentRoot = path.join(process.cwd(), "content");

export function getRawSource(tabSlug: string, pageSlug: string) {
  const filePath = path.join(contentRoot, tabSlug, `${pageSlug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function extractHeadings(content: string): Heading[] {
  const slugger = new Slugger();
  const headings: Heading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    const depth = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = slugger.slug(text);
    headings.push({ id, text, depth });
  }
  return headings;
}
