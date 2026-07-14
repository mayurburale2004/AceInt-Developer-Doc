export type NavItem = {
  title: string;
  slug: string; // page slug within the tab
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type Tab = {
  title: string;
  slug: string; // top-level tab slug, used in the URL
  groups: NavGroup[];
};

export const tabs: Tab[] = [

  {
    title: "Introduction",
    slug: "introduction",
    groups: [
      {
        title: "Get started",
        items: [
          { title: "Home", slug: "index" },
          { title: "Introduction", slug: "introduction" },
          { title: "Quickstart", slug: "quickstart" },
          { title: "Concepts", slug: "concepts" },
        ],
      },
      {
        title: "introduction",
        items: [
          { title: "Dashboard", slug: "dashboard" },
          { title: "Job Roles", slug: "job-roles" },
          { title: "Candidates", slug: "candidates" },
          { title: "Interviews", slug: "interviews" },
          { title: "Assessments", slug: "assessments" },
          { title: "Reports", slug: "reports" },
        ],
      },
    ],
  },
  {
    title: "Interviews",
    slug: "interviews",
    groups: [
      {
        title: "Get started",
        items: [
          { title: "Overview", slug: "overview" },
          { title: "Quickstart", slug: "quickstart" },
          { title: "Types", slug: "types" },
        ],
      },
      {
        title: "Configure",
        items: [
          { title: "Question Bank", slug: "configure-question-bank" },
          { title: "Scoring", slug: "configure-scoring" },
          { title: "Voice Settings", slug: "configure-voice-settings" },
          { title: "Invite Flow", slug: "configure-invite-flow" },
        ],
      },
      {
        title: "Candidate Experience",
        items: [
          { title: "Joining", slug: "candidate-joining" },
          { title: "Technical Screen", slug: "candidate-technical-screen" },
          { title: "Behavioral", slug: "candidate-behavioral" },
          { title: "Completion", slug: "candidate-completion" },
        ],
      },
      {
        title: "Results",
        items: [
          { title: "Transcripts", slug: "results-transcripts" },
          { title: "Scores", slug: "results-scores" },
          { title: "Recordings", slug: "results-recordings" },
        ],
      },
    ],
  },
 
   {
    title: "Assessments",
    slug: "assessments",
    groups: [
      {
        title: "Get Started",
        items: [
          { title: "Overview", slug: "overview" },
          { title: "Quickstart", slug: "quickstart" },
          { title: "Assessment Types", slug: "types" },
        ],
      },
      {
        title: "Build Questions",
        items: [
          {
            title: "Coding Challenges",
            slug: "build-coding-challenges",
          },
          {
            title: "Multiple Choice (MCQ)",
            slug: "build-mcq",
          },
        ],
      },
      {
        title: "Results",
        items: [
          {
            title: "Scoring",
            slug: "results-scoring",
          },
          {
            title: "Leaderboard",
            slug: "results-leaderboard",
          },
          {
            title: "Export Results",
            slug: "results-export",
          },
        ],
      },
    ],
  },
  {
    title: "Integrations",
    slug: "integrations",
    groups: [
      {
        title: "Get started",
        items: [{ title: "Overview", slug: "overview" }],
      },
      {
        title: "ATS Connectors",
        items: [
          { title: "Overview", slug: "ats" },
          { title: "Greenhouse", slug: "ats-greenhouse" },
          { title: "Lever", slug: "ats-lever" },
          { title: "Workday", slug: "ats-workday" },
          { title: "Custom ATS", slug: "ats-custom" },
        ],
      },
      {
        title: "Webhooks",
        items: [
          { title: "Overview", slug: "webhooks" },
          { title: "Events", slug: "webhooks-events" },
          { title: "Payload", slug: "webhooks-payload" },
          { title: "Security", slug: "webhooks-security" },
        ],
      },
      {
        title: "REST API",
        items: [{ title: "API Authentication", slug: "api-authentication" }],
      },
    ],
  },
  
  {
    title: "API Reference",
    slug: "reference",
    groups: [
      {
        title: "Developer tools",
        items: [
          { title: "Overview", slug: "overview" },
          { title: "Authentication", slug: "authentication" },
          { title: "Rate limits", slug: "rate-limits" },
          { title: "Candidates", slug: "candidates" },
          { title: "Interviews", slug: "interviews" },
          { title: "Assessments", slug: "assessments" },
          { title: "Results", slug: "results" },
          { title: "Webhooks", slug: "webhooks" },
        ],
      },
    ],
  },
];

export function findTab(slug: string) {
  return tabs.find((t) => t.slug === slug);
}

export function findPage(tabSlug: string, pageSlug: string) {
  const tab = findTab(tabSlug);
  if (!tab) return undefined;
  for (const group of tab.groups) {
    const item = group.items.find((i) => i.slug === pageSlug);
    if (item) return { tab, item };
  }
  return undefined;
}

export function firstPageSlug(tab: Tab) {
  return tab.groups[0]?.items[0]?.slug ?? "overview";
}
export function getNextPage(tabSlug: string, pageSlug: string) {
  const tab = findTab(tabSlug);
  if (!tab) return undefined;
  const flat = tab.groups.flatMap((g) => g.items);
  const idx = flat.findIndex((i) => i.slug === pageSlug);
  if (idx === -1 || idx === flat.length - 1) return undefined;
  const next = flat[idx + 1];
  return { title: next.title, href: `/${tab.slug}/${next.slug}` };
}









