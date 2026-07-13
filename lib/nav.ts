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
          { title: "Overview", slug: "overview" },
          { title: "About Ribbon", slug: "about" },
          { title: "Quickstart", slug: "quickstart" },
          { title: "Community resources", slug: "community" },
        ],
      },
      {
        title: "Understanding Ribbon",
        items: [
          { title: "Core concepts", slug: "core-concepts" },
          { title: "Ribbon CLI", slug: "cli" },
          { title: "Ribbon Cloud", slug: "cloud" },
          { title: "Connecting to Ribbon", slug: "connecting" },
        ],
      },
    ],
  },
{
    title: "Build Agents",
    slug: "build-agents",
    groups: [
      {
        title: "Get started",
        items: [
          { title: "Introduction", slug: "introduction" },
          { title: "Voice AI quickstart", slug: "voice-ai-quickstart" },
          { title: "Agent Builder", slug: "agent-builder" },
          { title: "Agent Console", slug: "agent-console" },
          { title: "Agent Embed Widget", slug: "agent-embed-widget" },
          { title: "Prompting guide", slug: "prompting-guide" },
        ],
      },
      {
        title: "Multimodality",
        items: [
          { title: "Overview", slug: "multimodality-overview" },
          { title: "Speech & audio", slug: "speech-audio" },
          { title: "Text & transcriptions", slug: "text-transcriptions" },
          { title: "Modality-aware instructions", slug: "modality-aware-instructions" },
          { title: "Images & video", slug: "images-video" },
        ],
      },
      {
        title: "Logic & structure",
        items: [
          { title: "Overview", slug: "logic-overview" },
          { title: "Agent sessions", slug: "agent-sessions" },
          { title: "Chat context", slug: "chat-context" },
          { title: "Tasks & task groups", slug: "tasks-task-groups" },
          { title: "Workflows", slug: "workflows" },
        ],
      },
    ],
  },
  {
    title: "Frontends",
    slug: "frontends",
    groups: [
      {
        title: "Get started",
        items: [
          { title: "Introduction", slug: "introduction" },
          { title: "React quickstart", slug: "react-quickstart" },
          { title: "Starter apps", slug: "starter-apps" },
        ],
      },
      {
        title: "UI components",
        items: [
          { title: "Overview", slug: "overview" },
          { title: "Media controls", slug: "media-controls" },
          { title: "Chat components", slug: "chat-components" },
        ],
      },
    ],
  },
  {
    title: "Telephony",
    slug: "telephony",
    groups: [
      {
        title: "Get started",
        items: [
          { title: "Introduction", slug: "introduction" },
          { title: "Phone numbers", slug: "phone-numbers" },
          { title: "SIP trunk setup", slug: "sip-trunk-setup" },
        ],
      },
      {
        title: "Features",
        items: [
          { title: "Overview", slug: "overview" },
          { title: "DTMF", slug: "dtmf" },
          { title: "Transfers", slug: "transfers" },
        ],
      },
    ],
  },
  {
    title: "Transport",
    slug: "transport",
    groups: [
      {
        title: "Get started",
        items: [
          { title: "Introduction", slug: "introduction" },
          { title: "SDK platform quickstarts", slug: "sdk-quickstarts" },
        ],
      },
      {
        title: "Media",
        items: [
          { title: "Overview", slug: "overview" },
          { title: "Camera & microphone", slug: "camera-microphone" },
          { title: "Screen sharing", slug: "screen-sharing" },
        ],
      },
    ],
  },
  {
    title: "Deploy",
    slug: "deploy",
    groups: [
      {
        title: "Get started",
        items: [
          { title: "Introduction", slug: "introduction" },
          { title: "Deployment management", slug: "deployment-management" },
          { title: "Secrets management", slug: "secrets-management" },
        ],
      },
      {
        title: "Observability",
        items: [
          { title: "Overview", slug: "overview" },
          { title: "Logs", slug: "logs" },
          { title: "Export traces", slug: "export-traces" },
        ],
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