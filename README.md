# Ribbon Docs

A documentation site shell built with **Next.js 14 (App Router)**, **TypeScript**,
**Tailwind CSS**, and **MDX** — matching the reference layout you shared: two-row sticky
header (logo + search + tabs), grouped left sidebar, right-hand "On this page" TOC with
scroll-spy, a page toolbar (Ask / Copy page / View markdown), working `Ctrl+K` search, and
a full mobile drawer. Fully responsive from phone → tablet → desktop.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/introduction/overview`.

The `predev` / `prebuild` scripts auto-generate two things before every dev/build run:

- Any missing `content/**/*.mdx` files (placeholders) from `lib/nav.ts`
- `public/search-index.json` — the static search index used by `Ctrl+K`

## Project structure

```
app/
  layout.tsx              Root layout: TopNav, UIStateProvider, SearchModal
  page.tsx                Redirects "/" to the first docs page
  [tab]/[page]/page.tsx   Dynamic route: compiles the matching .mdx file
components/
  TopNav.tsx              Two-row sticky header (logo, search, tabs)
  Sidebar.tsx             Grouped nav — fixed on desktop, drawer on mobile
  TOC.tsx                 "On this page" with IntersectionObserver scroll-spy
  PageToolbar.tsx         Ask / Copy page / View markdown row
  PageFeedback.tsx        "Is this page helpful?" widget
  SearchModal.tsx         Ctrl+K / Cmd+K / "/" search, arrow-key navigation
  UIStateProvider.tsx     Shared state: mobile drawer + search modal
content/
  <tab-slug>/<page-slug>.mdx   One file per page, with frontmatter (title, description)
lib/
  nav.ts                  Single source of truth for tabs, sidebar groups, and URLs
  content.ts              Reads .mdx files, extracts headings for the TOC
scripts/
  generate-content.ts     Fills in placeholder .mdx files for any nav entry missing one
  build-search-index.ts   Builds public/search-index.json from content + nav
```

## Adding a new page

1. Add an entry to the right group in `lib/nav.ts`:
   ```ts
   { title: "My New Page", slug: "my-new-page" }
   ```
2. Run `npm run gen:content` to scaffold `content/<tab>/my-new-page.mdx`, or write it
   yourself with frontmatter:
   ```md
   ---
   title: "My New Page"
   description: "One-line summary."
   ---

   ## A heading

   Your content...
   ```
3. Run `npm run gen:search` (or just `npm run dev`, which does this automatically) so the
   page shows up in search.

No other wiring is needed — the sidebar, tab bar, and TOC are all generated from `nav.ts`
and the MDX headings.

## Customizing

- **Brand name / logo** — edit `components/TopNav.tsx` and `components/Sidebar.tsx`
  (currently a text wordmark; swap in an `<img>` or `<svg>` if you have a logo file).
- **Accent color** — `tailwind.config.ts` → `theme.extend.colors.accent` (currently
  `#2563eb`).
- **Tabs & sidebar taxonomy** — entirely driven by `lib/nav.ts`.
- **"Ask about this page" / "Ask AI" buttons** — currently decorative in
  `components/PageToolbar.tsx` and `components/TopNav.tsx`. Wire them to a real backend
  by replacing the `disabled` buttons with a fetch call to your AI endpoint.

## Production build

```bash
npm run build
npm run start
```

This was verified end-to-end: `next build` compiles all routes with no type errors, and
the search flow (`Ctrl+K` → type → `Enter` → navigate) was tested with Playwright.
