import type { Metadata } from "next";
import "./globals.css";
import { UIStateProvider } from "@/components/UIStateProvider";
import { TopNav } from "@/components/TopNav";
import { SearchModal } from "@/components/SearchModal";

export const metadata: Metadata = {
  title: "Ribbon Docs",
  description: "Documentation for the Ribbon platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans antialiased">
        <UIStateProvider>
          <TopNav />
          {children}
          <SearchModal />
        </UIStateProvider>
      </body>
    </html>
  );
}
