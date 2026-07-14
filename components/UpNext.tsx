import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function UpNext({ title, href }: { title: string; href: string }) {
  return (
    <div className="mt-10 flex justify-end border-t border-ink-200 pt-6">
      <Link href={href} className="group text-right no-underline">
        <p className="mb-1 text-xs font-medium text-ink-500">Up Next</p>
        <p className="flex items-center gap-1 text-[15px] font-medium text-ink-900 underline decoration-ink-300 underline-offset-4 group-hover:text-accent">
          {title}
          <ChevronRight size={16} />
        </p>
      </Link>
    </div>
  );
}