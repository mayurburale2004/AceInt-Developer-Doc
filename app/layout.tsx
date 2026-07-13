import type { Metadata } from "next";
import "./globals.css";
import { UIStateProvider } from "@/components/UIStateProvider";
import { TopNav } from "@/components/TopNav";
import { SearchModal } from "@/components/SearchModal";
import { SiteFooter } from "@/components/SiteFooter";
export const metadata: Metadata = {
  title: "AceInt Docs",
  description: "Documentation for the AceInt platform.",
   icons: {
    icon: "/assets/AceInt.ico",
    shortcut: "/assets/AceInt.ico",
    apple: "/assets/AceInt.ico",
  },
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
          <SiteFooter />
          <SearchModal />
        </UIStateProvider>
      </body>
    </html>
  );
}
