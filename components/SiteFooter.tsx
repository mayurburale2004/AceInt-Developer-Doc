const columns = [
  {
    title: "Products",
    links: ["Agents", "Frontends", "Telephony", "Cloud"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Recipes", "GitHub", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <span className="text-xl font-bold tracking-tight text-ink-900">AceInt</span>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-ink-700 hover:text-ink-900">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}