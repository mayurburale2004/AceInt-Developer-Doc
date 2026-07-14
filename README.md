# AceInt Developer Docs

Developer documentation site for **AceInt** — the AI-powered campus placement and interview platform. Built with Next.js App Router, MDX, and Tailwind CSS.

🔗 Repo: [github.com/mayurburale2004/AceInt-Developer-Doc](https://github.com/mayurburale2004/AceInt-Developer-Doc)

---

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **MDX** via `next-mdx-remote` — content lives as `.mdx` files, compiled at request time
- **Tailwind CSS** — utility-first styling, with a `.dark` class-based dark mode
- **remark-gfm** — GitHub-flavored markdown (tables, strikethrough, etc.)
- **rehype-slug** — auto-generates heading IDs for the "On this page" TOC
- **rehype-pretty-code** — syntax-highlighted code blocks
- **lucide-react** / **react-icons** — icon sets used across cards and UI

---

## Getting started

```bash
git clone https://github.com/mayurburale2004/AceInt-Developer-Doc.git
cd AceInt-Developer-Doc
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects into the docs.

### Production build

```bash
npm run build
npm run start
```

---

## Project structure

├── app/
│   ├── [tab]/[page]/       # Dynamic route — renders any content/<tab>/<page>.mdx
│   │   └── page.tsx
│   ├── layout.tsx          # Root layout — theme provider, fonts, metadata
│   ├── globals.css         # Tailwind base + CSS color variables (light/dark)
│   └── not-found.tsx
│
├── components/
│   ├── DocsShell.tsx        # Page layout: sidebar + content + TOC
│   ├── Sidebar.tsx           # Left nav, driven by lib/nav.ts
│   ├── TOC.tsx                # Right "On this page" scroll-spy
│   ├── TopNav.tsx             # Header: logo, search, tabs
│   ├── SearchModal.tsx        # Ctrl+K search
│   ├── PageToolbar.tsx        # Copy page / view markdown row
│   ├── PageFeedback.tsx       # "Is this page helpful?" thumbs
│   ├── UpNext.tsx              # Prev/next page nav
│   ├── SiteFooter.tsx
│   ├── Card.tsx / CardGrid.tsx # Reusable MDX components for "next steps" grids
│   ├── Accordion.tsx
│   ├── Callout.tsx
│   ├── CodeTabs.tsx
│   ├── ThemeProvider.tsx / ThemeToggle.tsx
│   └── UIStateProvider.tsx    # Mobile menu + search open state
│
├── content/
│   └── <tab>/
│       └── <page>.mdx         # Actual doc content, one file per page
│
├── lib/
│   ├── nav.ts                  # Tab/group/page structure — powers sidebar + routing
│   └── content.ts              # Reads raw MDX, extracts headings for TOC
│
├── public/
│   └── assets/
│       └── AceInt.ico          # Logo / favicon
│
└── tailwind.config.ts

---

## Adding a new doc page

1. Create a new `.mdx` file under `content/<tab>/<page-slug>.mdx`:

```mdx
   ---
   title: "Your Page Title"
   sidebarTitle: "Short Nav Label"
   description: "One-line summary shown under the title."
   ---

   Your content here. Standard markdown, plus these components:

   <CardGrid>
     <Card icon="rocket" title="Related page" description="..." href="/tab/other-page" />
   </CardGrid>
```

2. Register the page in **`lib/nav.ts`** — add it to the relevant tab/group so it shows up in the sidebar and in prev/next navigation.

3. That's it — no route file to create. `app/[tab]/[page]/page.tsx` picks it up automatically via `generateStaticParams()`.

### Available MDX components

| Component | Use |
|---|---|
| `<Card icon="..." title="..." description="..." href="..." />` | Single nav/link card |
| `<CardGrid>...</CardGrid>` | Grid wrapper for multiple `<Card>`s |
| `<Callout>...</Callout>` | Tip/note/warning box |
| `<Accordion title="...">...</Accordion>` | Collapsible section |
| `<CodeTabs><CodeTab label="Python">...</CodeTab></CodeTabs>` | Multi-language code block |

See `components/Card.tsx` for the full list of supported `icon` values.

---

## Notes for contributors

- **Two URL segments max.** Routes are `/tab/page` only — `/assessments/build/coding-challenges` will 404. Flatten to `/assessments/build-coding-challenges` instead.
- **Don't duplicate the H1.** `page.tsx` renders `frontmatter.title` as the page `<h1>` automatically — don't start your MDX body with a `# Heading`.
- **Dark mode** is class-based (`.dark` on `<html>`). Stick to the existing color tokens (`ink-*`, `gray-*`, `accent-*`, `blue-600`) rather than raw hex values so new content adapts automatically.

---

## License

Internal documentation for the AceInt platform. Not currently open source.