import { Lightbulb } from "lucide-react";

export function Callout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 rounded-lg bg-ink-100/60 p-4">
      {title && (
        <p className="mb-1.5 flex items-center gap-2 text-[14px] font-semibold text-ink-900">
          <Lightbulb size={16} />
          {title}
        </p>
      )}
      <div className="text-[14px] leading-relaxed text-ink-700 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}