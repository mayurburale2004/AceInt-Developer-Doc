export function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {children}
    </div>
  );
}