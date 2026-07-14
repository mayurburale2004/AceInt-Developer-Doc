

// import Link from "next/link";
// import {
//   Rocket,
//   Sparkles,
//   Youtube,
//   Cloud,
//   Github,
//   BookOpen,
//   Headphones,
//   Wand2,
//   FileText,
//   Monitor,
//   Phone,
//   ScrollText,
//   RefreshCw,
//   SlidersHorizontal,
//   LayoutPanelTop,
//   ListChecks,
//   ArrowUpRight,
//   User,
//   Video,
//   ClipboardCheck,
//   BarChart3,
//   Webhook,
//   Key,
//   Gauge,
// } from "lucide-react";

// const iconMap = {
//   rocket: Rocket,
//   sparkles: Sparkles,
//   youtube: Youtube,
//   cloud: Cloud,
//   github: Github,
//   book: BookOpen,
//   headphones: Headphones,
//   wand: Wand2,
//   file: FileText,
//   monitor: Monitor,
//   phone: Phone,
//   scroll: ScrollText,
//   refresh: RefreshCw,
//   sliders: SlidersHorizontal,
//   panel: LayoutPanelTop,
//   list: ListChecks,
//   user: User,
//   video: Video,
//   "clipboard-check": ClipboardCheck,
//   "chart-bar": BarChart3,
//   webhook: Webhook,
//   key: Key,
//   gauge: Gauge,
// } as const;

// export type CardIcon = keyof typeof iconMap;

// export function Card({
//   icon,
//   title,
//   description,
//   href,
//   external = false,
// }: {
//   icon: CardIcon;
//   title: string;
//   description: string;
//   href: string;
//   external?: boolean;
// }) {
//   const Icon = iconMap[icon] ?? FileText;

//   const content = (
//     <div className="group relative flex h-full flex-col rounded-lg border border-ink-200 p-4 transition-colors hover:border-ink-300">
//       {external && (
//         <ArrowUpRight
//           size={15}
//           className="absolute right-4 top-4 text-ink-500 group-hover:text-ink-900"
//         />
//       )}
//       <Icon size={30} className="mb-3 text-blue-600" />
//       <p className="mb-1 text-[14.5px] font-semibold text-blue-600">
//         {title}
//       </p>
//       <p className="text-[14.5px] leading-relaxed text-ink-500">
//         {description}
//       </p>
//     </div>
//   );

//   if (external) {
//     return (
//       <a
//         href={href}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block !no-underline text-inherit"
//         style={{ textDecoration: "none" }}
//       >
//         {content}
//       </a>
//     );
//   }

//   return (
//     <Link
//       href={href}
//       className="block !no-underline text-inherit"
//       style={{ textDecoration: "none" }}
//     >
//       {content}
//     </Link>
//   );
// }

import Link from "next/link";
import {
  Rocket, Sparkles, Youtube, Cloud, Github, BookOpen, Headphones, Wand2,
  FileText, Monitor, Phone, ScrollText, RefreshCw, SlidersHorizontal,
  LayoutPanelTop, ListChecks, ArrowUpRight, User, Video, ClipboardCheck,
  BarChart3, Webhook, Key, Gauge, Leaf, Layers, Building2, Wrench, Plug,
  Briefcase, Braces, ShieldCheck, Code2, Mic, Terminal, Lightbulb, Brain,
  Users, Zap, Link2, Star, Clock, UserPlus, Plus, Laptop, Activity,
} from "lucide-react";

const iconMap = {
  rocket: Rocket, sparkles: Sparkles, youtube: Youtube, cloud: Cloud,
  github: Github, book: BookOpen, headphones: Headphones, wand: Wand2,
  file: FileText, monitor: Monitor, phone: Phone, scroll: ScrollText,
  refresh: RefreshCw, sliders: SlidersHorizontal, panel: LayoutPanelTop,
  list: ListChecks, user: User, video: Video, "clipboard-check": ClipboardCheck,
  "chart-bar": BarChart3, webhook: Webhook, key: Key, gauge: Gauge,
  leaf: Leaf, layers: Layers, building: Building2, wrench: Wrench, plug: Plug,
  briefcase: Briefcase, braces: Braces, "shield-check": ShieldCheck, code: Code2,
  microphone: Mic, terminal: Terminal, lightbulb: Lightbulb, brain: Brain,
  users: Users, bolt: Zap, link: Link2, star: Star, clock: Clock,
  "user-plus": UserPlus, plus: Plus, "laptop-code": Laptop,
  "waveform-lines": Activity, display: Monitor, "book-open": BookOpen,
  "arrows-rotate": RefreshCw,
} as const;

export type CardIcon = keyof typeof iconMap;

export function Card({
  icon,
  title,
  description,
  href,
  external = false,
  children,
}: {
  icon: CardIcon;
  title: string;
  description?: string;
  href: string;
  external?: boolean;
  children?: React.ReactNode;
}) {
  const Icon = iconMap[icon] ?? FileText;
  const body = description ?? children;

  const content = (
    <div className="group relative flex h-full flex-col rounded-lg border border-ink-200 p-4 transition-colors hover:border-ink-300">
      {external && (
        <ArrowUpRight
          size={15}
          className="absolute right-4 top-4 text-ink-500 group-hover:text-ink-900"
        />
      )}
      <Icon size={25} className="mb-3text-blue-600" />
      <p className="mb-1 text-[14.5px] font-semibold text-ink-900">{title}</p>
      <p className="text-[13.5px] leading-relaxed text-ink-500">{body}</p>
    </div>
  );

  if (external) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block !no-underline text-inherit"
        style={{ textDecoration: "none" }}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="block !no-underline text-inherit"
      style={{ textDecoration: "none" }}
    >
      {content}
    </Link>
  );
}