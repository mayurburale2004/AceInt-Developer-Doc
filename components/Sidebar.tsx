"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { X, Search } from "lucide-react";
import { Tab } from "@/lib/nav";
import { useUIState } from "./UIStateProvider";

function NavLinks({ tab, onNavigate }: { tab: Tab; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {tab.groups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const href = `/${tab.slug}/${item.slug}`;
              const isActive = pathname === href;
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={clsx(
                      "block border-l-2 py-1.5 pl-3 text-[14px] transition-colors",
                      isActive
                        ? "border-accent font-medium text-accent"
                        : "border-transparent text-ink-700 hover:border-ink-300 hover:text-ink-900"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function Sidebar({ tab }: { tab: Tab }) {
  const { sidebarOpen, setSidebarOpen, setSearchOpen } = useUIState();

  return (
    <>
      {/* Desktop: fixed column */}
      <aside className="hidden shrink-0 lg:block lg:w-[272px]">
        <div className="sticky top-[113px] max-h-[calc(100vh-113px)] overflow-y-auto py-8 pr-6">
          <NavLinks tab={tab} />
        </div>
      </aside>

      {/* Mobile: overlay + slide-in drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="h-full w-[85vw] max-w-[320px] overflow-y-auto bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-bold text-ink-900">Ribbon Docs</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-md p-2 text-ink-700 hover:bg-ink-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <button
              onClick={() => {
                setSidebarOpen(false);
                setSearchOpen(true);
              }}
              className="mb-6 flex w-full items-center gap-2 rounded-lg border border-ink-200 bg-ink-100/60 px-3 py-2 text-sm text-ink-500"
            >
              <Search size={16} />
              <span className="flex-1 text-left">Search...</span>
              <kbd className="rounded border border-ink-300 bg-white px-1.5 py-0.5 text-[11px] font-medium text-ink-500">
                /
              </kbd>
            </button>

            <NavLinks tab={tab} onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
