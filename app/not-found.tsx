import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center px-6 py-32 text-center">
      <h1 className="mb-2 text-3xl font-bold text-ink-900">Page not found</h1>
      <p className="mb-6 text-ink-500">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/introduction/overview"
        className="rounded-lg bg-ink-900 px-4 py-2 text-sm font-medium text-white hover:bg-ink-700"
      >
        Back to docs
      </Link>
    </div>
  );
}
