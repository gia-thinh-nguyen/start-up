import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyBookButton } from "@/components/StickyBookButton";
import { site } from "@/content/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bodoni-moda",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
});

const isProduction = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // Preview and staging builds must stay out of search results.
  robots: isProduction ? undefined : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${bodoni.variable} ${hanken.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyBookButton />
      </body>
    </html>
  );
}
