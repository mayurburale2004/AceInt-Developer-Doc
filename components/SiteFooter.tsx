"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Products",
    links: ["Agents", "Frontends", "Telephony", "Cloud", "Security", "Terms of service"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Community", "Support", "Brand assets", "Changelog", "Status"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Open source"],
  },
];

const socials = [
  {
    label: "GitHub",
    kind: "fill",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    label: "X",
    kind: "fill",
    path: "M18.42 2H21l-6.6 7.55L22.5 22h-6.3l-4.9-6.4L5.6 22H2.98l7.1-8.1L1.5 2h6.45l4.44 5.87L18.42 2zm-1.1 18.13h1.75L7.02 3.77H5.14l12.18 16.36z",
  },
  {
    label: "Slack",
    kind: "stroke",
    path: "M12 2v6M12 16v6M4.2 6.2l4.2 4.2M15.6 13.6l4.2 4.2M2 12h6M16 12h6M4.2 17.8l4.2-4.2M15.6 10.4l4.2-4.2",
  },
  {
    label: "YouTube",
    kind: "fill",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.5v-7l6.3 3.5-6.3 3.5Z",
  },
];

const themeOptions = [
  {
    id: "light",
    label: "Light theme",
    path: "M12 4V2m0 20v-2m8-8h2M2 12h2m14.14-6.14 1.42-1.42M4.44 19.56l1.42-1.42M19.56 19.56l-1.42-1.42M4.44 4.44l1.42 1.42M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  },
  {
    id: "dark",
    label: "Dark theme",
    path: "M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a1 1 0 0 0-1.28-1.24A10 10 0 1 0 21.74 15.78 1 1 0 0 0 20.5 14.5Z",
  },
  {
    id: "system",
    label: "System theme",
    path: "M4 4h16v11H4V4Zm4 15h8m-4-4v4",
  },
];

export default function SiteFooter() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const activeTheme = theme ?? "system";

  return (
    <footer className="border-t border-gray-200 bg-white font-sans transition-colors dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-[1440px] px-6 py-14">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img
                src="/assets/AceInt.ico"
                alt="AceInt"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="text-lg font-bold tracking-tight text-blue-600 dark:text-blue-400">
                AceInt
              </span>
            </div>

            <p className="max-w-[26ch] text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              The open source framework and cloud platform for voice, video, and physical AI agents.
            </p>

            <p className="mt-8 font-mono text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Keep in touch
            </p>
            <div className="mt-3 flex items-center gap-4">
              {socials.map((s) => (
  <a
    key={s.label}
    href="#"
    aria-label={s.label}
    className="text-gray-900 transition-colors hover:text-indigo-600 dark:text-gray-100 dark:hover:text-indigo-400"
  >
    {s.kind === "stroke" ? (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d={s.path} />
      </svg>
    ) : (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        className="h-[18px] w-[18px]"
        fill="currentColor"
      >
        <path d={s.path} />
      </svg>
    )}
  </a>
))}
</div>

            <div className="mt-4 inline-flex items-center gap-1 rounded-md border border-gray-200 p-1 dark:border-gray-800">
              {themeOptions.map((t) => {
                const isActive = mounted && activeTheme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-label={t.label}
                    aria-pressed={isActive}
                    onClick={() => setTheme(t.id)}
                    className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
                        : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={t.path} />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-900 hover:text-indigo-600 dark:text-gray-100 dark:hover:text-indigo-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-5 text-xs text-gray-500 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 AceInt. Engineered and designed worldwide. All rights reserved.{" "}
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Terms of Service</a> |{" "}
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Cookie Policy</a> |{" "}
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Privacy Policy</a> |{" "}
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Security</a>
          </p>
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-green-600 dark:text-green-400">
            <span className="h-2 w-2 rounded-sm bg-green-500" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}