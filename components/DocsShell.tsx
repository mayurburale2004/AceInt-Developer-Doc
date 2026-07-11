import { Tab } from "@/lib/nav";
import { Sidebar } from "./Sidebar";
import { TOC, Heading } from "./TOC";

export function DocsShell({
  tab,
  headings,
  children,
}: {
  tab: Tab;
  headings: Heading[];
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] items-start px-4 sm:px-6">
      <Sidebar tab={tab} />
      <main className="min-w-0 flex-1 py-8 lg:px-8">
        <div className="mx-auto max-w-content">{children}</div>
      </main>
      <TOC headings={headings} />
    </div>
  );
}
