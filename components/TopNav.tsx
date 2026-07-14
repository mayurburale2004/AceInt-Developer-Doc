"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Github, Users, Sparkles } from "lucide-react";
import clsx from "clsx";
import { tabs, firstPageSlug } from "@/lib/nav";
import { useUIState } from "./UIStateProvider";

export function TopNav() {
  const pathname = usePathname();
  const { setSidebarOpen, setSearchOpen } = useUIState();

  const activeTab = tabs.find((t) =>
    pathname.startsWith(`/${t.slug}`)
  );

  // Always resolve the logo link dynamically instead of hardcoding a slug
  // that may not exist in lib/nav.ts (this was causing the 404 flash)
  const logoHref = `/${tabs[0].slug}/${firstPageSlug(tabs[0])}`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      {/* Row 1: Logo, Search, Actions */}
      <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 pl-8 pr-4 sm:pl-10 sm:pr-6 lg:pl-12">
        <div className="flex items-center gap-3 pl-4 sm:pl-6 lg:pl-8">
          <button
            className="-ml-1 rounded-md p-2 text-ink-700 hover:bg-ink-100 lg:hidden dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <Link href={logoHref} className="flex items-center gap-2 shrink-0">
            <img src="/assets/AceInt.ico" alt="AceInt" width={24} height={24} />
            <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
              AceInt
            </span>
          </Link>
        </div>

        {/* Desktop Search */}
        <button
          onClick={() => setSearchOpen(true)}
          className="mx-auto hidden w-full min-w-0 max-w-md items-center gap-2 rounded-lg border border-ink-200 bg-ink-100/60 px-3 py-2 text-sm text-ink-500 hover:border-ink-300 sm:flex dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-700"
        >
          <Search size={16} />
          <span className="flex-1 truncate text-left">Search...</span>
          <kbd className="rounded border border-ink-300 bg-white px-1.5 py-0.5 text-[11px] font-medium text-ink-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
            Ctrl K
          </kbd>
        </button>

        <div className="flex items-center justify-end gap-1 sm:gap-3">
          {/* Mobile Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-md p-2 text-ink-700 hover:bg-ink-100 sm:hidden dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md p-2 text-ink-700 hover:bg-ink-100 md:inline-flex dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="GitHub"
          >
            <Github size={19} />
          </a>

          {/* Community */}
          <a
            href="#"
            className="hidden rounded-md p-2 text-ink-700 hover:bg-ink-100 md:inline-flex dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Community"
          >
            <Users size={19} />
          </a>

          {/* Ask AI */}
          <button className="flex items-center gap-1.5 rounded-lg bg-ink-900 px-3 py-2 text-sm font-medium text-white hover:bg-ink-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white">
            <Sparkles size={15} />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>
      </div>

      {/* Row 2: Navigation Tabs */}
      <nav className="no-scrollbar flex gap-6 overflow-x-auto border-t border-ink-100 px-4 sm:px-6 dark:border-gray-800">
        {tabs.map((tab) => {
          const isActive = tab.slug === activeTab?.slug;

          return (
            <Link
              key={tab.slug}
              href={`/${tab.slug}/${firstPageSlug(tab)}`}
              className={clsx(
                "relative shrink-0 whitespace-nowrap py-3 text-[15px] font-medium transition-colors",
                isActive
                  ? "text-accent dark:text-indigo-400"
                  : "text-ink-700 hover:text-ink-900 dark:text-gray-300 dark:hover:text-gray-100"
              )}
            >
              {tab.title}

              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-accent dark:bg-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}