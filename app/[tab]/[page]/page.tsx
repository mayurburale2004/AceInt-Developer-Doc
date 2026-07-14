import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { compileMDX } from "next-mdx-remote/rsc";
import { tabs, findTab, findPage, getNextPage } from "@/lib/nav";
import { getRawSource, extractHeadings } from "@/lib/content";
import { DocsShell } from "@/components/DocsShell";
import { PageToolbar } from "@/components/PageToolbar";
import { PageFeedback } from "@/components/PageFeedback";
import { Card } from "@/components/Card";
import { CardGrid } from "@/components/CardGrid";
import { UpNext } from "@/components/UpNext";
import { CodeTabs, CodeTab } from "@/components/CodeTabs";
import { Callout } from "@/components/Callout";
import rehypePrettyCode from "rehype-pretty-code";
import { Accordion, AccordionGroup } from "@/components/Accordion";

export function generateStaticParams() {
  const params: { tab: string; page: string }[] = [];
  for (const tab of tabs) {
    for (const group of tab.groups) {
      for (const item of group.items) {
        params.push({ tab: tab.slug, page: item.slug });
      }
    }
  }
  return params;
}

export function generateMetadata({
  params,
}: {
  params: { tab: string; page: string };
}) {
  const found = findPage(params.tab, params.page);
  if (!found) return {};
  return {
    title: `${found.item.title} · AceInt Docs`,
  };
}

export default async function DocsPage({
  params,
}: {
  params: { tab: string; page: string };
}) {
  const tab = findTab(params.tab);
  const found = findPage(params.tab, params.page);
  const raw = getRawSource(params.tab, params.page);

  if (!tab || !found || !raw) notFound();

  const headings = extractHeadings(raw);

  const { content, frontmatter } = await compileMDX<{
    title?: string;
    description?: string;
  }>({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, { theme: "github-light", keepBackground: false }],
        ],
      },
    },
    components: { Card, CardGrid, CodeTabs, CodeTab, Callout, Accordion, AccordionGroup },
  });

  const next = getNextPage(params.tab, params.page);

  return (
    <DocsShell tab={tab} headings={headings}>
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-ink-900 dark:text-gray-100">
        {frontmatter.title ?? found.item.title}
      </h1>
      {frontmatter.description && (
        <p className="mb-6 text-lg text-ink-500 dark:text-gray-400">{frontmatter.description}</p>
      )}

      <PageToolbar raw={raw} />

      <div className="docs-prose">{content}</div>

      <PageFeedback />
      {next && <UpNext title={next.title} href={next.href} />}
    </DocsShell>
  );
}