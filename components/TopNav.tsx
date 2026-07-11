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
  const activeTab = tabs.find((t) => pathname.startsWith(`/${t.slug}`));

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur">
      {/* Row 1: logo, search, actions */}
     <div className="relative flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          className="-ml-1 rounded-md p-2 text-ink-700 hover:bg-ink-100 lg:hidden"
          aria-label="Open menu"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>

        <Link href="/introduction/overview" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold tracking-tight text-ink-900">Ribbon</span>
          <span className="text-xs font-semibold tracking-widest text-ink-500">
            DOCS
          </span>
        </Link>

        {/* Search — desktop */}
       {/* Search — desktop, centered */}
        <button
          onClick={() => setSearchOpen(true)}
          className="absolute left-1/2 hidden w-full max-w-md -translate-x-1/2 items-center gap-2 rounded-lg border border-ink-200 bg-ink-100/60 px-3 py-2 text-sm text-ink-500 hover:border-ink-300 sm:flex"
        >
          <Search size={16} />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="rounded border border-ink-300 bg-white px-1.5 py-0.5 text-[11px] font-medium text-ink-500">
            Ctrl K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          {/* Search — mobile icon only */}
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-md p-2 text-ink-700 hover:bg-ink-100 sm:hidden"
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          <a
            href="#"
            className="hidden rounded-md p-2 text-ink-700 hover:bg-ink-100 md:inline-flex"
            aria-label="GitHub"
          >
            <Github size={19} />
          </a>
          <a
            href="#"
            className="hidden rounded-md p-2 text-ink-700 hover:bg-ink-100 md:inline-flex"
            aria-label="Community"
          >
            <Users size={19} />
          </a>

          <button className="flex items-center gap-1.5 rounded-lg bg-ink-900 px-3 py-2 text-sm font-medium text-white hover:bg-ink-700">
            <Sparkles size={15} />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>
      </div>

      {/* Row 2: top-level tabs */}
      <nav className="no-scrollbar flex gap-6 overflow-x-auto border-t border-ink-100 px-4 sm:px-6">
        {tabs.map((tab) => {
          const isActive = tab.slug === activeTab?.slug;
          return (
            <Link
              key={tab.slug}
              href={`/${tab.slug}/${firstPageSlug(tab)}`}
              className={clsx(
                "relative shrink-0 whitespace-nowrap py-3 text-[15px] font-medium transition-colors",
                isActive ? "text-accent" : "text-ink-700 hover:text-ink-900"
              )}
            >
              {tab.title}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-accent" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
